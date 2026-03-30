# Staging folder: `new/`

Drop **new or updated chapter JSX** here first. This folder is **not** wired into Next.js—nothing here is imported by `/content/*` or other routes.

**Full procedure:** [process-jsx-pipeline.md](../process-jsx-pipeline.md) (env vars, OCI upload, verify, troubleshooting).

---

## Quick path

1. **Add** `your-chapter.jsx` under `new/` (any name is fine for review).
2. **Review** content, `"use client"`, and raw figure `https://…` URLs (they will be migrated to OCI).
3. **Move** the file to  
   `src/components/content/chapters/<slug>.jsx`  
   where `<slug>` matches the URL: `/content/<slug>` (e.g. `bio-9-ch5.jsx` → `/content/bio-9-ch5`).
4. **Register** a new slug in `src/app/content/[chapter]/page.tsx` (imports + `CHAPTER_NAMES` + `CHAPTER_CONTENT`).
5. From repo root run **`npm run content:migrate`** (or the individual `content:*` steps in the pipeline doc).
6. **Clear** `new/` after the move so staging does not drift.

Scripts **do not scan `new/`**—they only read `src/components/content/chapters/*.jsx` (and `src/components/chem-9-ch1.jsx`). You must complete step 3 before extract/upload/apply-imports.

---

## Naming

- Prefer **kebab-case** filenames matching the route: `chem-9-ch2.jsx`, `phy-9-ch1.jsx`.
- The default export should be the chapter React component expected by `page.tsx`.
