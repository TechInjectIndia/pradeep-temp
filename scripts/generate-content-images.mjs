#!/usr/bin/env node
/**
 * Reads scripts/data/image-manifest.json and writes src/assets/content-images.ts
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(__dirname, "data", "image-manifest.json");
const OUT = path.join(ROOT, "src", "assets", "content-images.ts");

function esc(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r?\n/g, "\\n");
}

function main() {
  const { entries } = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const lines = [];
  lines.push("/**");
  lines.push(" * Chapter figure images for `/content/*` routes.");
  lines.push(" *");
  lines.push(" * Set `NEXT_PUBLIC_OCI_IMAGE_BASE` to your public Object Storage path prefix (no trailing slash):");
  lines.push(" *   https://objectstorage.<region>.oraclecloud.com/n/<namespace>/b/<bucket>/o");
  lines.push(" *");
  lines.push(" * Upload objects with: `node scripts/upload-content-images-to-oci.mjs`");
  lines.push(" * Regenerate this file after changing URLs: `node scripts/generate-content-images.mjs`");
  lines.push(" */");
  lines.push("");
  lines.push(`export function buildChapterImageUrl(objectPath: string, legacyUrl: string): string {`);
  lines.push(`  const raw =`);
  lines.push(`    typeof process !== "undefined" &&`);
  lines.push(`    typeof process.env !== "undefined" &&`);
  lines.push(`    process.env.NEXT_PUBLIC_OCI_IMAGE_BASE`);
  lines.push(`      ? String(process.env.NEXT_PUBLIC_OCI_IMAGE_BASE).replace(/\\/$/, "")`);
  lines.push(`      : "";`);
  lines.push(`  if (!raw) return legacyUrl;`);
  lines.push(`  return \`\${raw}/\${encodeURIComponent(objectPath)}\`;`);
  lines.push(`}`);
  lines.push("");
  lines.push("export const CONTENT_IMAGES = {");

  for (const e of entries) {
    lines.push(
      `  ${e.exportName}: buildChapterImageUrl("${esc(e.objectName)}", "${esc(e.legacyUrl)}"),`
    );
  }

  lines.push("} as const;");
  lines.push("");
  lines.push("export type ContentImageKey = keyof typeof CONTENT_IMAGES;");
  lines.push("");
  lines.push("/** Map legacy remote URL → asset key (for migrations / debugging) */");
  lines.push("export const LEGACY_IMAGE_URL_TO_KEY: Record<string, ContentImageKey> = {");
  for (const e of entries) {
    lines.push(`  "${esc(e.legacyUrl)}": "${e.exportName}",`);
  }
  lines.push("};");
  lines.push("");

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, lines.join("\n"), "utf8");
  console.log(`Wrote ${OUT} (${entries.length} entries)`);
}

main();
