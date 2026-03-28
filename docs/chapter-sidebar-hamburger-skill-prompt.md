# Claude skill prompt: chapter TOC sidebar + hamburger (Pradeep content JSX)

Copy the block below into a **Claude Code skill** (or custom instruction) so future client drops get consistent navigation UX.

---

## Skill / instruction text (paste below)

You are normalizing **Next.js chapter JSX** (`src/components/content/chapters/*.jsx`) that include a **table-of-contents drawer** and **hamburger control**. Apply these rules whenever merging client updates or creating new chapter files.

### Hamburger button (`HamburgerBtn`)

- **Fixed** position: `top: 14`, `left: 14`, `zIndex: 1100`.
- **Style:** white background, chapter accent color (`P_COLOR`) for glyph, **`border: 2px solid #2563eb`**, `borderRadius: 8`, `40×40px`, strong shadow (`0 4px 14px rgba(0,0,0,0.15)`).
- **Content:** show **☰** when closed and **✕** when open (not three white bars on solid magenta).
- **Accessibility:** `aria-label` toggles between `"Open table of contents"` and `"Close table of contents"` based on `open`.

### Backdrop (`Backdrop`)

- Render **only when** `open` is true.
- **Full viewport:** `position: fixed`, `inset: 0`, `zIndex: 1050` (below drawer, above page).
- **Appearance:** `background: rgba(0,0,0,0.18)` plus **`backdrop-filter: blur(2px)`** (and `-webkit-backdrop-filter`).
- **API:** accept `open` and **`onClick`** (parent passes `() => setTocOpen(false)`). Do **not** pass `setOpen` into the backdrop; keep separation of concerns.

### Sidebar / drawer (`Sidebar`)

- **Slide from left:** `transform: translateX(-100%)` when closed, `translateX(0)` when open; transition ~`0.25s cubic-bezier(0.4,0,0.2,1)`.
- **Width:** ~`260–280px`, full viewport height, `overflow-y: auto`, white background, subtle right border + shadow (`4px 0 24px rgba(0,0,0,0.13)`).
- **`zIndex: 1060`** (above backdrop).
- **Header:** full-width bar using `P_COLOR`, white text, “TABLE OF CONTENTS”.
- **Nav items:** use **`<button type="button">`** (not bare `<div>`) for each TOC row for accessibility; `width: 100%`, left-aligned text, indent by `level` (1 vs 2 vs 3), magenta left border for top-level rows.
- **Click:** `document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })` then **`setOpen(false)`**.
- **Labels:** support both `{ label, title }` (render `label + " " + title`) and **`{ label }` only** (client sometimes puts the full line in `label`).

### Page layout

- **Do not** add large left padding (e.g. `68px`) to “make room” for the hamburger; the overlay drawer must **not squeeze** the main column.
- Use horizontal padding like **`clamp(14px, 4vw, 28px)`** for the main content wrapper.
- **State name:** prefer `tocOpen` / `setTocOpen` for clarity.

### Wiring in the chapter component

```jsx
const [tocOpen, setTocOpen] = useState(false);
// ...
<HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
<Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
<Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
```

### Images

- After updating figure URLs, run the repo pipeline: `npm run content:extract`, `npm run content:generate`, `npm run content:apply-imports`, then `npm run content:upload-oci` as needed (see `process-jsx-pipeline.md`).

### Reference implementation

Match **`src/components/content/chapters/chem-9-ch3.jsx`** (or `phy-9-ch*.jsx`) for the exact patterns above after a merge.

---

*Repo: `pradeep-temp` — align with `process-jsx-pipeline.md`.*
