#!/usr/bin/env node
/**
 * Scan chapter components for remote image URLs (excluding fonts).
 * Writes scripts/data/image-manifest.json for upload + codegen.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  collectUrlsFromSource,
  forEachChapterJsxFile,
} from "./lib/content-image-url-scan.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(__dirname, "data", "image-manifest.json");

function extFromUrl(url) {
  try {
    const p = new URL(url).pathname;
    const match = p.match(/\.(jpe?g|png|gif|webp)$/i);
    return match ? `.${match[1].toLowerCase().replace("jpeg", "jpg")}` : ".jpg";
  } catch {
    return ".jpg";
  }
}

function main() {
  const all = new Set();
  // Preserve URLs already in manifest (after JSX is migrated to CONTENT_IMAGES.*)
  if (fs.existsSync(OUT)) {
    try {
      const prev = JSON.parse(fs.readFileSync(OUT, "utf8"));
      for (const e of prev.entries || []) {
        if (e.legacyUrl) all.add(e.legacyUrl);
      }
    } catch {
      /* ignore */
    }
  }
  let fileCount = 0;
  forEachChapterJsxFile(ROOT, (fp) => {
    fileCount++;
    const src = fs.readFileSync(fp, "utf8");
    for (const u of collectUrlsFromSource(src)) all.add(u);
  });

  const entries = [...all]
    .sort()
    .map((legacyUrl) => {
      const hash = crypto.createHash("sha256").update(legacyUrl).digest("hex");
      const ext = extFromUrl(legacyUrl);
      const objectName = `content/${hash.slice(0, 8)}/${hash.slice(8, 16)}${ext}`;
      const exportName = `CONTENT_IMAGE_${hash.slice(0, 20).toUpperCase()}`;
      return { legacyUrl, objectName, exportName };
    });

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(
    OUT,
    JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), count: entries.length, entries }, null, 2),
    "utf8"
  );
  console.log(`Wrote ${OUT} (${entries.length} unique image URLs from ${fileCount} files)`);
}

main();
