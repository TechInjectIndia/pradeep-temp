#!/usr/bin/env node
/**
 * After upload + apply-imports: verify every manifest object exists in OCI and
 * no remote image URLs remain in chapter JSX (except skipped hosts like Google Fonts).
 *
 * Writes:
 *   scripts/data/content-migration-verify.json
 *   scripts/data/CONTENT_MIGRATION_REPORT.md
 *
 * Exits 1 if any object is missing or any stray URL is found.
 */
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import {
  createOciAuthenticationProvider,
  getOciBucketName,
  getOciNamespaceOptional,
} from "./oci-env-auth.mjs";
import { collectAllStrayImageUrls } from "./lib/content-image-url-scan.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env") });
dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

const require = createRequire(import.meta.url);
const os = require("oci-objectstorage");

const MANIFEST = path.join(__dirname, "data", "image-manifest.json");
const UPLOAD_REPORT = path.join(__dirname, "data", "content-migration-upload.json");
const VERIFY_JSON = path.join(__dirname, "data", "content-migration-verify.json");
const REPORT_MD = path.join(__dirname, "data", "CONTENT_MIGRATION_REPORT.md");

function isNotFoundError(err) {
  const code = err?.statusCode ?? err?.status ?? err?.response?.status;
  if (code === 404) return true;
  const msg = String(err?.message || err || "");
  return /404|Not Found|not found/i.test(msg);
}

async function main() {
  const bucketName = getOciBucketName();
  if (!bucketName) {
    console.error("Set OCI_BUCKET (or ORACLE_BUCKET_NAME).");
    process.exit(1);
  }

  const { entries } = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const client = new os.ObjectStorageClient({
    authenticationDetailsProvider: createOciAuthenticationProvider(ROOT),
  });

  let namespace = getOciNamespaceOptional() || undefined;
  if (!namespace) {
    const nsRes = await client.getNamespace({});
    namespace = nsRes.value;
  }

  const missing = [];
  let i = 0;
  for (const e of entries) {
    i++;
    process.stdout.write(`\rHeadObject ${i}/${entries.length}…`);
    try {
      await client.headObject({
        namespaceName: namespace,
        bucketName,
        objectName: e.objectName,
      });
    } catch (err) {
      if (isNotFoundError(err)) {
        missing.push({
          objectName: e.objectName,
          legacyUrl: e.legacyUrl,
        });
      } else {
        missing.push({
          objectName: e.objectName,
          legacyUrl: e.legacyUrl,
          error: String(err?.message || err),
        });
      }
    }
  }
  console.log("");

  const strayUrls = collectAllStrayImageUrls(ROOT);
  const strayDetail = strayUrls.map((url) => ({ url }));

  let lastUpload = null;
  if (fs.existsSync(UPLOAD_REPORT)) {
    try {
      lastUpload = JSON.parse(fs.readFileSync(UPLOAD_REPORT, "utf8"));
    } catch {
      /* ignore */
    }
  }

  let passed = missing.length === 0 && strayUrls.length === 0;
  if (lastUpload?.contentUploadLimit != null) {
    passed = false;
  }
  if ((lastUpload?.failed ?? 0) > 0) {
    passed = false;
  }

  const verifyPayload = {
    generatedAt: new Date().toISOString(),
    manifestEntryCount: entries.length,
    ociNamespace: namespace,
    ociBucket: bucketName,
    objectsMissingOrError: missing,
    strayRemoteImageUrlsInJsx: strayDetail,
    lastUploadReport: lastUpload
      ? {
          generatedAt: lastUpload.generatedAt,
          uploaded: lastUpload.uploaded,
          skippedAlreadyPresent: lastUpload.skippedAlreadyPresent,
          failed: lastUpload.failed,
          contentUploadLimit: lastUpload.contentUploadLimit,
        }
      : null,
    passed,
  };

  if (lastUpload?.contentUploadLimit != null) {
    verifyPayload.partialUploadWarning =
      "Last upload used CONTENT_UPLOAD_LIMIT; run a full upload before treating migration as complete.";
  }

  fs.mkdirSync(path.dirname(VERIFY_JSON), { recursive: true });
  fs.writeFileSync(VERIFY_JSON, JSON.stringify(verifyPayload, null, 2), "utf8");

  const lines = [];
  lines.push("# Content image migration report");
  lines.push("");
  lines.push(`Generated: ${verifyPayload.generatedAt}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`| Check | Result |`);
  lines.push(`| --- | --- |`);
  lines.push(
    `| Manifest entries | ${entries.length} |`
  );
  lines.push(
    `| OCI objects present (HeadObject) | ${entries.length - missing.length} / ${entries.length} |`
  );
  lines.push(
    `| Stray remote image URLs in chapter JSX | ${strayUrls.length} (want 0) |`
  );
  if (lastUpload) {
    lines.push(
      `| Last upload: uploaded / skipped / failed | ${lastUpload.uploaded} / ${lastUpload.skippedAlreadyPresent} / ${lastUpload.failed} |`
    );
    if (lastUpload.contentUploadLimit != null) {
      lines.push(
        `| Partial upload | **yes** (CONTENT_UPLOAD_LIMIT=${lastUpload.contentUploadLimit}) — run full \`npm run content:upload-oci\` |`
      );
    }
  } else {
    lines.push("| Last upload report | (no content-migration-upload.json) |");
  }
  lines.push("");
  lines.push(
    `**Overall: ${verifyPayload.passed ? "PASSED" : "FAILED"}**`
  );
  lines.push("");
  if (missing.length) {
    lines.push("## Missing or errored objects");
    lines.push("");
    for (const m of missing) {
      lines.push(`- \`${m.objectName}\``);
      if (m.error) lines.push(`  - Error: ${m.error}`);
      lines.push(`  - Legacy: ${m.legacyUrl.slice(0, 100)}…`);
    }
    lines.push("");
  }
  if (strayUrls.length) {
    lines.push("## Stray URLs still referenced in JSX");
    lines.push("");
    for (const u of strayUrls) {
      lines.push(`- ${u.slice(0, 120)}${u.length > 120 ? "…" : ""}`);
    }
    lines.push("");
  }
  lines.push("## Files");
  lines.push("");
  lines.push(`- Machine-readable: \`scripts/data/content-migration-verify.json\``);
  lines.push(`- Upload log: \`scripts/data/content-migration-upload.json\``);
  lines.push("");

  fs.writeFileSync(REPORT_MD, lines.join("\n"), "utf8");
  console.log(`Verify JSON: ${VERIFY_JSON}`);
  console.log(`Report:      ${REPORT_MD}`);

  client.close();

  if (!verifyPayload.passed) {
    console.error("\nVerification failed. See report above.");
    process.exit(1);
  }
  console.log("\nVerification passed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
