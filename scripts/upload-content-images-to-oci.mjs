#!/usr/bin/env node
/**
 * Download each legacy URL from scripts/data/image-manifest.json and upload to OCI Object Storage.
 *
 * Auth: API key from environment only (no ~/.oci/config, no .oci profile file).
 * Required:
 *   - OCI_TENANCY_OCID, OCI_USER_OCID, OCI_FINGERPRINT, OCI_REGION (e.g. ap-hyderabad-1)
 *   - Private key: OCI_PRIVATE_KEY (PEM; use literal \n for newlines in .env), or
 *     OCI_PRIVATE_KEY_BASE64 (base64 of PEM), or OCI_PRIVATE_KEY_PATH (path to a .pem file)
 *   - OCI_BUCKET — target bucket name (must exist; script does not create bucket)
 *
 * Optional:
 *   - OCI_PRIVATE_KEY_PASSPHRASE — if the key is encrypted
 *   - OCI_NAMESPACE — if set, skips getNamespace() (faster)
 *   - CONTENT_UPLOAD_LIMIT — if set to a positive integer, only process the first N manifest entries (debug / smoke test)
 *   - CONTENT_UPLOAD_CONCURRENCY — parallel uploads per batch (default: 20)
 *   - Local cache: scripts/data/oci-uploaded-legacy-urls.json stores legacy URLs already uploaded or
 *     confirmed via HeadObject; they are skipped on later runs (no Head, no GET).
 *   - CONTENT_UPLOAD_RESET_CACHE=1 — delete the cache file and start fresh this run
 *   - CONTENT_UPLOAD_NO_CACHE=1 — do not read or write the cache file this run
 *
 * After upload, set NEXT_PUBLIC_OCI_IMAGE_BASE in .env.local to the printed URL
 * (no trailing slash), then run: npm run content:generate
 *
 * Uses Oracle oci-common + oci-objectstorage (see /oracle/oci-typescript-sdk).
 *
 * Loads env from project root `.env` then `.env.local` (later overrides) so OCI_* and
 * NEXT_PUBLIC_* can live in those files (see .env.example).
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
  getOciRegionIdOptional,
} from "./oci-env-auth.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env") });
dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

const require = createRequire(import.meta.url);
const os = require("oci-objectstorage");

const MANIFEST = path.join(__dirname, "data", "image-manifest.json");
const UPLOAD_CACHE = path.join(__dirname, "data", "oci-uploaded-legacy-urls.json");

const bucketName = getOciBucketName();
if (!bucketName) {
  console.error(
    "Set OCI_BUCKET (or ORACLE_BUCKET_NAME) to your Object Storage bucket name."
  );
  process.exit(1);
}

function isNotFoundError(err) {
  const code = err?.statusCode ?? err?.status ?? err?.response?.status;
  if (code === 404) return true;
  const msg = String(err?.message || err || "");
  return /404|Not Found|not found/i.test(msg);
}

/** OCI SDK throws OciError with statusCode, serviceCode, opcRequestId */
function formatError(err) {
  const bits = [String(err?.message || err)];
  if (err?.statusCode != null) bits.push(`HTTP ${err.statusCode}`);
  if (err?.serviceCode) bits.push(`code=${err.serviceCode}`);
  if (err?.opcRequestId) bits.push(`opc-request-id=${err.opcRequestId}`);
  return bits.join(" | ");
}

function parseUploadLimit() {
  const raw = process.env.CONTENT_UPLOAD_LIMIT?.trim();
  if (!raw) return null;
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) {
    console.error(
      "CONTENT_UPLOAD_LIMIT must be a positive integer (e.g. 1 for a single-image test)."
    );
    process.exit(1);
  }
  return n;
}

function parseConcurrency() {
  const raw = process.env.CONTENT_UPLOAD_CONCURRENCY?.trim() || "20";
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return 20;
  return Math.min(n, 50);
}

function loadUploadCacheSet() {
  const reset =
    process.env.CONTENT_UPLOAD_RESET_CACHE === "1" ||
    process.env.OCI_UPLOAD_RESET_CACHE === "1";
  if (reset && fs.existsSync(UPLOAD_CACHE)) {
    fs.unlinkSync(UPLOAD_CACHE);
    console.log("CONTENT_UPLOAD_RESET_CACHE=1: cleared", UPLOAD_CACHE);
  }
  if (process.env.CONTENT_UPLOAD_NO_CACHE === "1") {
    console.log("CONTENT_UPLOAD_NO_CACHE=1: not using local URL cache this run.");
    return new Set();
  }
  try {
    const j = JSON.parse(fs.readFileSync(UPLOAD_CACHE, "utf8"));
    const urls = j.urls;
    if (!Array.isArray(urls)) return new Set();
    return new Set(urls);
  } catch {
    return new Set();
  }
}

function saveUploadCacheSet(urlSet) {
  if (process.env.CONTENT_UPLOAD_NO_CACHE === "1") return;
  fs.mkdirSync(path.dirname(UPLOAD_CACHE), { recursive: true });
  fs.writeFileSync(
    UPLOAD_CACHE,
    JSON.stringify(
      {
        version: 1,
        updatedAt: new Date().toISOString(),
        count: urlSet.size,
        urls: [...urlSet].sort(),
      },
      null,
      2
    ),
    "utf8"
  );
}

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    throw new Error(`GET ${url.slice(0, 80)}… → ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType =
    res.headers.get("content-type")?.split(";")[0]?.trim() || "application/octet-stream";
  return { buf, contentType };
}

async function processOne(client, namespace, e, uploadedUrls) {
  const { legacyUrl, objectName } = e;

  if (uploadedUrls.has(legacyUrl)) {
    return { kind: "skipCache", objectName, legacyUrl };
  }

  try {
    try {
      await client.headObject({
        namespaceName: namespace,
        bucketName,
        objectName,
      });
      uploadedUrls.add(legacyUrl);
      return { kind: "skipHead", objectName, legacyUrl };
    } catch (err) {
      if (!isNotFoundError(err)) {
        return {
          kind: "fail",
          objectName,
          legacyUrl,
          error: formatError(err),
        };
      }
    }

    const { buf, contentType } = await fetchBuffer(legacyUrl);
    await client.putObject({
      namespaceName: namespace,
      bucketName,
      objectName,
      putObjectBody: buf,
      contentLength: buf.length,
      contentType,
    });
    uploadedUrls.add(legacyUrl);
    return { kind: "upload", objectName, legacyUrl };
  } catch (err) {
    return {
      kind: "fail",
      objectName,
      legacyUrl,
      error: formatError(err),
    };
  }
}

async function main() {
  const { entries } = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const limit = parseUploadLimit();
  const batch = limit != null ? entries.slice(0, limit) : entries;
  const concurrency = parseConcurrency();

  if (limit != null) {
    console.log(
      `CONTENT_UPLOAD_LIMIT=${limit}: processing ${batch.length} of ${entries.length} manifest entries`
    );
  }
  console.log(`CONTENT_UPLOAD_CONCURRENCY=${concurrency} (parallel uploads per batch)`);

  const uploadedUrls = loadUploadCacheSet();
  console.log(`Local URL cache: ${uploadedUrls.size} legacy URL(s) in ${path.basename(UPLOAD_CACHE)}`);

  const client = new os.ObjectStorageClient({
    authenticationDetailsProvider: createOciAuthenticationProvider(ROOT),
  });

  let namespace = getOciNamespaceOptional() || undefined;
  if (!namespace) {
    const nsRes = await client.getNamespace({});
    namespace = nsRes.value;
    console.log("Namespace:", namespace);
  }

  let ok = 0;
  let skipHead = 0;
  let skipCache = 0;
  let fail = 0;
  /** @type {{ objectName: string, legacyUrl: string, error: string }[]} */
  const failures = [];

  const totalBatches = Math.ceil(batch.length / concurrency) || 1;
  for (let b = 0; b < batch.length; b += concurrency) {
    const slice = batch.slice(b, b + concurrency);
    const batchNum = Math.floor(b / concurrency) + 1;
    process.stdout.write(
      `\rBatch ${batchNum}/${totalBatches} (${slice.length} parallel) ${slice[0]?.objectName?.slice(0, 40) || ""}…   `
    );

    const results = await Promise.all(
      slice.map((e) => processOne(client, namespace, e, uploadedUrls))
    );

    for (const r of results) {
      if (r.kind === "skipCache") skipCache++;
      else if (r.kind === "skipHead") skipHead++;
      else if (r.kind === "upload") ok++;
      else if (r.kind === "fail") {
        fail++;
        failures.push({
          objectName: r.objectName,
          legacyUrl: r.legacyUrl,
          error: r.error,
        });
        console.error(`\nFAIL ${r.objectName}:`, r.error);
        console.error("  legacyUrl:", r.legacyUrl.slice(0, 120));
      }
    }

    saveUploadCacheSet(uploadedUrls);
  }

  console.log(
    `\nDone. uploaded=${ok} skipped(local cache)=${skipCache} skipped(head already in bucket)=${skipHead} failed=${fail}`
  );
  console.log(`Cache saved: ${UPLOAD_CACHE} (${uploadedUrls.size} URL(s))`);

  const uploadReportPath = path.join(__dirname, "data", "content-migration-upload.json");
  fs.mkdirSync(path.dirname(uploadReportPath), { recursive: true });
  fs.writeFileSync(
    uploadReportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        manifestTotal: entries.length,
        processed: batch.length,
        contentUploadLimit: limit,
        contentUploadConcurrency: concurrency,
        uploaded: ok,
        skippedFromLocalCache: skipCache,
        skippedAlreadyPresent: skipHead,
        failed: fail,
        failures,
        localCachePath: "scripts/data/oci-uploaded-legacy-urls.json",
        localCacheUrlCount: uploadedUrls.size,
        namespace,
        bucket: bucketName,
        regionId: getOciRegionIdOptional() || null,
      },
      null,
      2
    ),
    "utf8"
  );
  console.log(`Upload report: ${uploadReportPath}`);

  if (fail > 0) {
    console.error("\nExiting with code 1 because one or more uploads failed.");
    client.close();
    process.exit(1);
  }
  const regionId = getOciRegionIdOptional();
  const imageBase = regionId
    ? `https://objectstorage.${regionId}.oraclecloud.com/n/${namespace}/b/${bucketName}/o`
    : `https://objectstorage.<OCI_REGION>.oraclecloud.com/n/${namespace}/b/${bucketName}/o`;
  console.log(
    "\nSet NEXT_PUBLIC_OCI_IMAGE_BASE to (no trailing slash):\n" +
      `  ${imageBase}\n` +
      (regionId
        ? ""
        : "  (Set OCI_REGION or ORACLE_REGION in .env to print the exact hostname.)\n") +
      "then run: npm run content:generate"
  );

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
