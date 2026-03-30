/**
 * Shared rules for detecting remote chapter image URLs (same as extract-image-urls.mjs).
 */
import fs from "node:fs";
import path from "node:path";

export const SKIP_HOSTS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
];

export const IMAGE_EXT_RE = /\.(jpe?g|png|gif|webp)(\?|#|$)/i;

export function isImageUrl(url) {
  try {
    const u = new URL(url);
    if (
      SKIP_HOSTS.some((h) => u.hostname === h || u.hostname.endsWith(`.${h}`))
    ) {
      return false;
    }
    return (
      IMAGE_EXT_RE.test(u.pathname + u.search) || /\/imgs\//i.test(u.pathname)
    );
  } catch {
    return false;
  }
}

export function collectUrlsFromSource(source) {
  const found = new Set();
  const re = /https?:\/\/[^\s"'`\)]+/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    let url = m[0];
    url = url.replace(/[,;]+$/, "");
    if (isImageUrl(url)) found.add(url);
  }
  return found;
}

export function forEachChapterJsxFile(root, onFile) {
  const chapterDir = path.join(root, "src/components/content/chapters");
  const extra = [path.join(root, "src/components/chem-9-ch1.jsx")];
  for (const f of fs.readdirSync(chapterDir).filter((x) => x.endsWith(".jsx"))) {
    onFile(path.join(chapterDir, f));
  }
  for (const fp of extra) {
    if (fs.existsSync(fp)) onFile(fp);
  }
}

export function collectAllStrayImageUrls(root) {
  const all = new Set();
  forEachChapterJsxFile(root, (fp) => {
    const src = fs.readFileSync(fp, "utf8");
    for (const u of collectUrlsFromSource(src)) all.add(u);
  });
  return [...all].sort();
}
