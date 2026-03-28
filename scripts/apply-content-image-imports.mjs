#!/usr/bin/env node
/**
 * Replace legacy image URLs in chapter JSX with CONTENT_IMAGES.<exportName>
 * and add: import { CONTENT_IMAGES } from "@/assets/content-images";
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(__dirname, "data", "image-manifest.json");
const CHAPTERS = path.join(ROOT, "src/components/content/chapters");
const EXTRA_FILES = [
  path.join(ROOT, "src/components/chem-9-ch1.jsx"),
];
const IMPORT_LINE = 'import { CONTENT_IMAGES } from "@/assets/content-images";';

function processFile(fp, { sorted }) {
  let content = fs.readFileSync(fp, "utf8");
  const original = content;

  for (const e of sorted) {
    const { legacyUrl, exportName } = e;
    const ref = `CONTENT_IMAGES.${exportName}`;
    content = content.split(`src="${legacyUrl}"`).join(`src={${ref}}`);
    content = content.split(`src='${legacyUrl}'`).join(`src={${ref}}`);
    content = content.split(`"${legacyUrl}"`).join(ref);
    content = content.split(`'${legacyUrl}'`).join(ref);
  }

  if (content === original) return false;

  if (!content.includes("CONTENT_IMAGES.")) {
    console.warn(`No CONTENT_IMAGES refs in ${fp}`);
    return false;
  }

  if (!content.includes(IMPORT_LINE)) {
    if (content.startsWith('"use client";')) {
      content = content.replace(
        '"use client";\n',
        `"use client";\n${IMPORT_LINE}\n`
      );
    } else if (content.startsWith("'use client';")) {
      content = content.replace(
        "'use client';\n",
        `'use client';\n${IMPORT_LINE}\n`
      );
    } else {
      content = `${IMPORT_LINE}\n${content}`;
    }
  }

  fs.writeFileSync(fp, content, "utf8");
  return true;
}

function main() {
  const { entries } = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  const sorted = [...entries].sort((a, b) => b.legacyUrl.length - a.legacyUrl.length);
  const files = fs.readdirSync(CHAPTERS).filter((f) => f.endsWith(".jsx"));

  for (const f of files) {
    const fp = path.join(CHAPTERS, f);
    if (processFile(fp, { sorted })) console.log(`Updated ${f}`);
  }

  for (const fp of EXTRA_FILES) {
    if (!fs.existsSync(fp)) continue;
    if (processFile(fp, { sorted })) console.log(`Updated ${path.relative(ROOT, fp)}`);
  }
}

main();
