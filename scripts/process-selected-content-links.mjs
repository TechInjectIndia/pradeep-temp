#!/usr/bin/env node
/**
 * Interactive single-run pipeline for selected component files.
 *
 * What it does:
 * 1) Lists files under src/components/*
 * 2) Asks which files to process
 * 3) Extracts remote image URLs from selected files
 * 4) Uploads missing images to OCI in parallel batches (default concurrency: 20)
 * 5) Rewrites selected files to CONTENT_IMAGES.<KEY>
 * 6) Updates scripts/data/image-manifest.json + regenerates src/assets/content-images.ts
 * 7) Validates selected files contain no remaining processable legacy image URLs
+ * Cache:
 * - Uses scripts/data/oci-uploaded-legacy-urls.json
 * - Skips URLs already cached in future runs
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import dotenv from "dotenv";
import {
  collectUrlsFromSource,
} from "./lib/content-image-url-scan.mjs";
import {
  createOciAuthenticationProvider,
  getOciBucketName,
  getOciNamespaceOptional,
} from "./oci-env-auth.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
dotenv.config({ path: path.join(ROOT, ".env") });
dotenv.config({ path: path.join(ROOT, ".env.local"), override: true });

const require = createRequire(import.meta.url);
const os = require("oci-objectstorage");

const COMPONENTS_DIR = path.join(ROOT, "src", "components");
const MANIFEST_PATH = path.join(__dirname, "data", "image-manifest.json");
const CACHE_PATH = path.join(__dirname, "data", "oci-uploaded-legacy-urls.json");
const CONTENT_IMAGES_TS = path.join(ROOT, "src", "assets", "content-images.ts");
const IMPORT_LINE = 'import { CONTENT_IMAGES } from "@/assets/content-images";';

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, out);
    else if (/\.(jsx|tsx|js|ts)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function extFromUrl(url) {
  try {
    const p = new URL(url).pathname;
    const m = p.match(/\.(jpe?g|png|gif|webp)$/i);
    return m ? `.${m[1].toLowerCase().replace("jpeg", "jpg")}` : ".jpg";
  } catch {
    return ".jpg";
  }
}

function toEntry(legacyUrl) {
  const hash = crypto.createHash("sha256").update(legacyUrl).digest("hex");
  const ext = extFromUrl(legacyUrl);
  return {
    legacyUrl,
    objectName: `content/${hash.slice(0, 8)}/${hash.slice(8, 16)}${ext}`,
    exportName: `CONTENT_IMAGE_${hash.slice(0, 20).toUpperCase()}`,
  };
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) return { version: 1, generatedAt: "", count: 0, entries: [] };
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
}

function saveManifest(entries) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  const payload = {
    version: 1,
    generatedAt: new Date().toISOString(),
    count: entries.length,
    entries,
  };
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(payload, null, 2), "utf8");
}

function regenerateContentImagesTs(entries) {
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n");
  const lines = [];
  lines.push("/**");
  lines.push(" * Chapter figure images for `/content/*` routes.");
  lines.push(" */");
  lines.push("");
  lines.push("export function buildChapterImageUrl(objectPath: string, legacyUrl: string): string {");
  lines.push("  const raw =");
  lines.push('    typeof process !== "undefined" &&');
  lines.push('    typeof process.env !== "undefined" &&');
  lines.push("    process.env.NEXT_PUBLIC_OCI_IMAGE_BASE");
  lines.push("      ? String(process.env.NEXT_PUBLIC_OCI_IMAGE_BASE).replace(/\\/$/, \"\")");
  lines.push('      : "";');
  lines.push("  if (!raw) return legacyUrl;");
  lines.push("  return `${raw}/${encodeURIComponent(objectPath)}`;");
  lines.push("}");
  lines.push("");
  lines.push("export const CONTENT_IMAGES = {");
  for (const e of entries) {
    lines.push(`  ${e.exportName}: buildChapterImageUrl("${esc(e.objectName)}", "${esc(e.legacyUrl)}"),`);
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("export type ContentImageKey = keyof typeof CONTENT_IMAGES;");
  lines.push("");
  fs.mkdirSync(path.dirname(CONTENT_IMAGES_TS), { recursive: true });
  fs.writeFileSync(CONTENT_IMAGES_TS, lines.join("\n"), "utf8");
}

function loadCacheSet() {
  if (!fs.existsSync(CACHE_PATH)) return new Set();
  try {
    const j = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
    return new Set(Array.isArray(j.urls) ? j.urls : []);
  } catch {
    return new Set();
  }
}

function saveCacheSet(set) {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify(
      { version: 1, updatedAt: new Date().toISOString(), count: set.size, urls: [...set].sort() },
      null,
      2
    ),
    "utf8"
  );
}

function parseConcurrency() {
  const n = parseInt(process.env.CONTENT_UPLOAD_CONCURRENCY || "20", 10);
  if (!Number.isFinite(n) || n < 1) return 20;
  return Math.min(n, 50);
}

function isNotFoundError(err) {
  const code = err?.statusCode ?? err?.status ?? err?.response?.status;
  if (code === 404) return true;
  return /404|not found/i.test(String(err?.message || err || ""));
}

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`GET failed ${res.status} ${res.statusText}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type")?.split(";")[0]?.trim() || "application/octet-stream";
  return { buf, contentType };
}

async function uploadEntries(entries) {
  if (entries.length === 0) return { uploaded: 0, skippedCache: 0, skippedHead: 0, failed: 0 };

  const bucketName = getOciBucketName();
  if (!bucketName) throw new Error("Missing OCI_BUCKET (or ORACLE_BUCKET_NAME).");

  const client = new os.ObjectStorageClient({
    authenticationDetailsProvider: createOciAuthenticationProvider(ROOT),
  });

  let namespace = getOciNamespaceOptional() || undefined;
  if (!namespace) {
    const nsRes = await client.getNamespace({});
    namespace = nsRes.value;
  }

  const cache = loadCacheSet();
  const concurrency = parseConcurrency();
  let uploaded = 0;
  let skippedCache = 0;
  let skippedHead = 0;
  let failed = 0;

  async function processOne(e) {
    if (cache.has(e.legacyUrl)) {
      skippedCache++;
      return;
    }
    try {
      try {
        await client.headObject({ namespaceName: namespace, bucketName, objectName: e.objectName });
        cache.add(e.legacyUrl);
        skippedHead++;
        return;
      } catch (err) {
        if (!isNotFoundError(err)) throw err;
      }

      const { buf, contentType } = await fetchBuffer(e.legacyUrl);
      await client.putObject({
        namespaceName: namespace,
        bucketName,
        objectName: e.objectName,
        putObjectBody: buf,
        contentLength: buf.length,
        contentType,
      });
      cache.add(e.legacyUrl);
      uploaded++;
    } catch (err) {
      failed++;
      console.error(`Upload failed for ${e.objectName}\n  ${String(err?.message || err)}`);
    }
  }

  for (let i = 0; i < entries.length; i += concurrency) {
    const slice = entries.slice(i, i + concurrency);
    await Promise.all(slice.map(processOne));
    saveCacheSet(cache);
  }

  client.close();
  return { uploaded, skippedCache, skippedHead, failed };
}

function replaceUrlsInFile(filePath, entries) {
  const original = fs.readFileSync(filePath, "utf8");
  let content = original;
  const sorted = [...entries].sort((a, b) => b.legacyUrl.length - a.legacyUrl.length);
  for (const e of sorted) {
    const ref = `CONTENT_IMAGES.${e.exportName}`;
    content = content.split(`src="${e.legacyUrl}"`).join(`src={${ref}}`);
    content = content.split(`src='${e.legacyUrl}'`).join(`src={${ref}}`);
    content = content.split(`"${e.legacyUrl}"`).join(ref);
    content = content.split(`'${e.legacyUrl}'`).join(ref);
  }

  if (content.includes("CONTENT_IMAGES.") && !content.includes(IMPORT_LINE)) {
    if (content.startsWith('"use client";\n')) {
      content = content.replace('"use client";\n', `"use client";\n${IMPORT_LINE}\n`);
    } else if (content.startsWith("'use client';\n")) {
      content = content.replace("'use client';\n", `'use client';\n${IMPORT_LINE}\n`);
    } else {
      content = `${IMPORT_LINE}\n${content}`;
    }
  }

  if (content !== original) fs.writeFileSync(filePath, content, "utf8");
  return content !== original;
}

function validateNoLegacyUrls(selectedFiles) {
  const problems = [];
  for (const fp of selectedFiles) {
    const src = fs.readFileSync(fp, "utf8");
    const leftovers = [...collectUrlsFromSource(src)];
    if (leftovers.length > 0) problems.push({ file: fp, leftovers });
  }
  return problems;
}

function createPrompt() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return {
    ask(q) {
      return new Promise((resolve) => rl.question(q, resolve));
    },
    close() {
      rl.close();
    },
  };
}

function parseSelection(input, max) {
  const raw = input.trim().toLowerCase();
  if (raw === "all" || raw === "*") return [...Array(max)].map((_, i) => i);
  const out = new Set();
  for (const part of raw.split(",").map((x) => x.trim()).filter(Boolean)) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map((n) => parseInt(n, 10));
      if (Number.isFinite(a) && Number.isFinite(b)) {
        const start = Math.max(1, Math.min(a, b));
        const end = Math.min(max, Math.max(a, b));
        for (let i = start; i <= end; i++) out.add(i - 1);
      }
    } else {
      const n = parseInt(part, 10);
      if (Number.isFinite(n) && n >= 1 && n <= max) out.add(n - 1);
    }
  }
  return [...out].sort((a, b) => a - b);
}

async function main() {
  const files = walkFiles(COMPONENTS_DIR).sort((a, b) => a.localeCompare(b));
  const rel = (fp) => path.relative(ROOT, fp).replace(/\\/g, "/");

  if (files.length === 0) {
    console.log("No files found under src/components/*");
    return;
  }

  console.log("\nSelect files to process from src/components/*:\n");
  files.forEach((fp, i) => console.log(`${String(i + 1).padStart(3, " ")}. ${rel(fp)}`));
  console.log('\nEnter indices (e.g. "1,3,8-12") or "all".');

  const prompt = createPrompt();
  const answer = await prompt.ask("> ");
  prompt.close();

  const selectedIndexes = parseSelection(answer, files.length);
  if (selectedIndexes.length === 0) {
    console.error("No valid selection. Aborting.");
    process.exit(1);
  }

  const selectedFiles = selectedIndexes.map((i) => files[i]);
  console.log(`\nSelected ${selectedFiles.length} file(s):`);
  for (const fp of selectedFiles) console.log(`- ${rel(fp)}`);

  const selectedUrlSet = new Set();
  for (const fp of selectedFiles) {
    const src = fs.readFileSync(fp, "utf8");
    for (const u of collectUrlsFromSource(src)) selectedUrlSet.add(u);
  }
  const selectedUrls = [...selectedUrlSet].sort();
  console.log(`\nFound ${selectedUrls.length} image URL(s) in selected files.`);
  if (selectedUrls.length === 0) {
    console.log("Nothing to process.");
    return;
  }

  const selectedEntries = selectedUrls.map(toEntry);

  const manifest = loadManifest();
  const byLegacy = new Map((manifest.entries || []).map((e) => [e.legacyUrl, e]));
  for (const e of selectedEntries) byLegacy.set(e.legacyUrl, e);
  const mergedEntries = [...byLegacy.values()].sort((a, b) => a.legacyUrl.localeCompare(b.legacyUrl));
  saveManifest(mergedEntries);
  regenerateContentImagesTs(mergedEntries);
  console.log(`Updated manifest (${mergedEntries.length}) and regenerated ${path.relative(ROOT, CONTENT_IMAGES_TS)}.`);

  const uploadRes = await uploadEntries(selectedEntries);
  console.log(
    `Upload summary: uploaded=${uploadRes.uploaded}, skipped(cache)=${uploadRes.skippedCache}, skipped(existing)=${uploadRes.skippedHead}, failed=${uploadRes.failed}`
  );
  if (uploadRes.failed > 0) {
    console.error("Upload failures detected. Fix them and re-run.");
    process.exit(1);
  }

  let changed = 0;
  for (const fp of selectedFiles) {
    if (replaceUrlsInFile(fp, selectedEntries)) changed++;
  }
  console.log(`Updated ${changed} selected file(s).`);

  const problems = validateNoLegacyUrls(selectedFiles);
  if (problems.length > 0) {
    console.error("\nValidation failed: some selected files still contain legacy image URLs:");
    for (const p of problems) {
      console.error(`- ${rel(p.file)}`);
      for (const url of p.leftovers.slice(0, 10)) console.error(`  - ${url}`);
      if (p.leftovers.length > 10) console.error(`  ... and ${p.leftovers.length - 10} more`);
    }
    process.exit(1);
  }

  console.log("\nValidation passed: no remaining processable legacy image URLs in selected files.");
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
