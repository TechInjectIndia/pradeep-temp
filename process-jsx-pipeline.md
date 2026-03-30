# Process JSX pipeline: from `new/` to published content

This document describes how to take **new or updated chapter JSX** dropped into the **`new/`** staging folder, merge it into the app, **migrate figure images to Oracle Cloud Object Storage (OCI)**, and verify nothing is left on legacy CDNs.

**Related:** [`new/README.md`](new/README.md) — short quick path and naming rules for the staging folder.

The tooling lives under `scripts/` and is wired through **`npm run content:*`** scripts in `package.json`.

### Flow (high level)

```text
new/*.jsx  →  review  →  src/components/content/chapters/<slug>.jsx
                              ↓
              (new slug?)  src/app/content/[chapter]/page.tsx
                              ↓
              npm run content:migrate
                              ↓
    extract → upload-oci → generate → apply-imports → verify-migration → npm run build
```

---

## 1. What `new/` is for

- **`new/`** is a **staging area only**. Nothing under `new/` is imported by Next.js routes.
- After review, files are **moved** (not copied long-term) into  
  **`src/components/content/chapters/`** using the same naming pattern as existing chapters (e.g. `bio-9-ch5.jsx`, `phy-9-ch1.jsx`).
- Details and a compact checklist: **[`new/README.md`](new/README.md)**.

**Important:** Image extraction, OCI upload, import rewriting, and verification scripts **do not scan `new/`**. They only scan:

- `src/components/content/chapters/*.jsx`
- `src/components/chem-9-ch1.jsx` (legacy extra file)

So you **must** move (or temporarily copy) chapter JSX into those paths **before** running the content pipeline.

---

## 2. Prerequisites

### 2.1 Environment files

- Copy `.env.example` → `.env` and/or `.env.local` (never commit secrets).
- For **local uploads** to OCI, set API key variables. The project supports either prefix:

  | Purpose | `OCI_*` | `ORACLE_*` alias |
  |--------|---------|------------------|
  | Tenancy | `OCI_TENANCY_OCID` | `ORACLE_TENANCY_ID` |
  | User | `OCI_USER_OCID` | `ORACLE_USER_ID` |
  | Fingerprint | `OCI_FINGERPRINT` | `ORACLE_FINGERPRINT` |
  | Region (e.g. `ap-mumbai-1`) | `OCI_REGION` | `ORACLE_REGION` |
  | Private key | `OCI_PRIVATE_KEY` / `_BASE64` / `_PATH` | `ORACLE_PRIVATE_KEY` / equivalents |
  | Bucket | `OCI_BUCKET` | `ORACLE_BUCKET_NAME` |
  | Namespace (optional) | `OCI_NAMESPACE` | `ORACLE_NAMESPACE` |

- For the **site to load images from OCI**, set:

  ```bash
  NEXT_PUBLIC_OCI_IMAGE_BASE=https://objectstorage.<region>.oraclecloud.com/n/<namespace>/b/<bucket>/o
  ```

  No trailing slash. This must match the bucket where objects were uploaded.

### 2.2 Dependencies

From the repo root:

```bash
npm install
```

OCI upload uses `oci-common` and `oci-objectstorage` (already in `devDependencies`).

---

## 3. End-to-end workflow (new JSX → live chapter)

### Step A — Stage and review

1. Place the new or updated `.jsx` file(s) under **`new/`**.
2. Open a PR or review locally: `"use client"` if needed, imports, layout, and **raw figure URLs** (usually `https://…` pointing at a CDN) are expected **before** migration.

### Step B — Move into the chapters tree

1. Move the file to:

   ```text
   src/components/content/chapters/<slug>.jsx
   ```

   Use a **slug** that matches the URL segment under `/content/[chapter]` (e.g. `chem-9-ch2.jsx` → `/content/chem-9-ch2`).

2. If the file is an alternate location for chemistry chapter 1 (rare), you may instead use  
   **`src/components/chem-9-ch1.jsx`** and ensure the extract/apply scripts still cover it (they include this path as an “extra” file).

3. Remove or clear the copy from **`new/`** after the move so staging does not drift.

### Step C — Register the route (new chapter slug only)

If this is a **new** chapter, edit:

**`src/app/content/[chapter]/page.tsx`**

1. Add the slug string to **`CHAPTER_NAMES`** (e.g. `"bio-9-ch5"`).
2. Import the default export from the new module:

   ```ts
   import Bio9Ch5Content from "@/components/content/chapters/bio-9-ch5";
   ```

3. Add the entry to **`CHAPTER_CONTENT`**.

Existing slugs only need **Step B** if you are replacing the file in place.

### Step D — Image and import pipeline

Run from the **repository root**.

| Order | Command | What it does |
|------|---------|----------------|
| 1 | `npm run content:extract` | Scans chapter JSX (+ `chem-9-ch1.jsx`) for remote **image** URLs (skips Google Fonts). Merges with existing `scripts/data/image-manifest.json` so previously seen URLs are not dropped. Writes updated manifest. |
| 2 | `npm run content:upload-oci` | Uploads in **parallel batches** (default **20** concurrent; `CONTENT_UPLOAD_CONCURRENCY`). Skips legacy URLs listed in **`scripts/data/oci-uploaded-legacy-urls.json`** (updated after each batch). Still **HeadObject**s uncached URLs to detect objects already in the bucket (then records the URL). Writes **`scripts/data/content-migration-upload.json`**. **Exits with code 1** if any upload fails. Reset cache: `CONTENT_UPLOAD_RESET_CACHE=1`. |
| 3 | `npm run content:generate` | Regenerates **`src/assets/content-images.ts`** from the manifest (`CONTENT_IMAGES`, `LEGACY_IMAGE_URL_TO_KEY`, `buildChapterImageUrl`). |
| 4 | `npm run content:apply-imports` | Replaces raw URL strings in chapter JSX with `CONTENT_IMAGES.<KEY>` and ensures `import { CONTENT_IMAGES } from "@/assets/content-images";` exists. |

**One-shot full migration (recommended after moving files from `new/`):**

```bash
npm run content:migrate
```

This runs, in order: **extract → upload-oci → generate → apply-imports → verify-migration** (see below).

### Step E — Verify

```bash
npm run content:verify-migration
```

This:

- **HeadObject** for **every** manifest key in the configured bucket (confirms objects exist).
- Scans the same JSX paths for **stray** remote image URLs (again excluding fonts).

Outputs:

- `scripts/data/content-migration-verify.json`
- `scripts/data/CONTENT_MIGRATION_REPORT.md`

Exits **1** if anything is missing, stray URLs exist, the last upload report shows failures, or the last upload used **`CONTENT_UPLOAD_LIMIT`** (partial run).

### Step F — Build check

```bash
npm run build
```

Fix any TypeScript/ESLint issues in the new chapter component.

---

## 4. Optional: smoke-test uploads

Before uploading hundreds of objects:

```bash
npm run content:upload-oci:one
```

Equivalent to `CONTENT_UPLOAD_LIMIT=1` for a single manifest row.  
**Note:** `content:verify-migration` will **fail** until you run a **full** `npm run content:upload-oci` without a limit (it detects partial uploads via `content-migration-upload.json`).

---

## 5. OCI connectivity check

```bash
npm run content:test-oci
```

Confirms API key auth, **GetNamespace**, and optional **HeadBucket** when `OCI_BUCKET` / `ORACLE_BUCKET_NAME` is set.

---

## 6. JSX conventions that affect migration

### 6.1 URLs the extractor finds

- Typical figure URLs: `https://…` with image extensions (`.jpg`, `.png`, etc.) or paths containing `/imgs/`.
- **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) are **ignored** for the image manifest.

### 6.2 What `apply-imports` rewrites

The script replaces exact string matches for each `legacyUrl` from the manifest in common patterns (`src="…"`, `src='…'`, quoted URL in JSX). If a new file uses an unusual pattern (e.g. URL built from concatenation), you may need to **manually** switch to `CONTENT_IMAGES.*` and re-run **generate** if you add keys.

### 6.3 Flowchart components

Files under **`src/components/flowcharts/`** are **not** part of the chapter image pipeline. They are expected to use **fonts only** for remote URLs, not chapter figure CDNs. If you add raster images to a flowchart, extend the scan list in **`scripts/lib/content-image-url-scan.mjs`** and **`scripts/extract-image-urls.mjs`** / **`scripts/apply-content-image-imports.mjs`** consistently (or keep figures in chapter JSX only).

---

## 7. Artifacts and reports

| Path | Description |
|------|-------------|
| `scripts/data/image-manifest.json` | Canonical list of legacy URLs → object names / export names |
| `scripts/data/content-migration-upload.json` | Last upload run: counts, failures, bucket/namespace (gitignored by default) |
| `scripts/data/oci-uploaded-legacy-urls.json` | Local cache of legacy URLs already uploaded or confirmed in bucket (gitignored; speeds reruns) |
| `scripts/data/content-migration-verify.json` | Last verification: missing objects, stray URLs (gitignored by default) |
| `scripts/data/CONTENT_MIGRATION_REPORT.md` | Human-readable verification summary (gitignored by default) |
| `src/assets/content-images.ts` | Generated; do not hand-edit except when regenerating |

---

## 8. Troubleshooting

| Symptom | What to check |
|--------|----------------|
| `content:extract` shows fewer URLs than expected | File not under `src/components/content/chapters/` (or `chem-9-ch1.jsx`). URL pattern not matched (extension or `/imgs/`). |
| Upload fails with 401/403 | IAM policy for Object Storage; correct user/key; bucket in same tenancy. |
| Upload fails on GET legacy URL | CDN link expired or 404; update source URL or replace image. |
| Verify reports stray URLs | Re-run `content:apply-imports` or fix non-standard JSX that still embeds `https://` image URLs. |
| Images work in dev but not prod | `NEXT_PUBLIC_OCI_IMAGE_BASE` must be set in the **deployment** environment. |
| Verify fails after `content:upload-oci:one` | Run **full** `npm run content:upload-oci` (unset `CONTENT_UPLOAD_LIMIT`). |

---

## 9. Quick checklist (copy/paste)

- [ ] JSX reviewed in `new/`
- [ ] Moved to `src/components/content/chapters/<slug>.jsx` (and/or `chem-9-ch1.jsx` if applicable)
- [ ] New slug added to `src/app/content/[chapter]/page.tsx` if needed
- [ ] `.env` / hosting env has OCI credentials (upload) and `NEXT_PUBLIC_OCI_IMAGE_BASE` (runtime)
- [ ] `npm run content:migrate` (or steps D + E separately)
- [ ] `npm run build` succeeds
- [ ] Spot-check `/content/<slug>` in the browser

---

## 10. Command reference

```bash
npm run content:extract            # Refresh image-manifest.json
npm run content:upload-oci         # Upload missing objects to OCI
npm run content:upload-oci:one     # Upload only first manifest row (debug)
npm run content:generate           # Regenerate src/assets/content-images.ts
npm run content:apply-imports      # Rewrite JSX to CONTENT_IMAGES.*
npm run content:verify-migration   # Verify bucket + JSX
npm run content:test-oci           # Auth + namespace/bucket smoke test
npm run content:migrate            # Full pipeline: extract → upload → generate → apply → verify
```

---

*Last aligned with repo scripts and paths as of the migration tooling in this project; if you change scan directories or routes, update this document in the same change.*
