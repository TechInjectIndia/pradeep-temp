# Claude skill prompt: chapter TOC sidebar + hamburger (Pradeep content JSX)

Copy the block below into a **Claude Code skill** (or custom instruction) so future client drops get consistent navigation UX.

---

## Skill / instruction text (paste below)

You are normalizing **Next.js chapter JSX** (`src/components/content/chapters/*.jsx`) that include a **table-of-contents drawer** and **hamburger control**. Apply these rules whenever merging client updates or creating new chapter files.

### Hamburger button (`HamburgerBtn`)

- **Fixed** position: `top: 14`, `left: 14`, `zIndex: 1100`.
- **Style:** **`background: P_COLOR`** (chapter accent), **`border: none`**, `borderRadius: 4`, **`36×36px`**, flex column centered, `gap: 5`, `padding: 0`.
- **Content:** **three white horizontal bars** (`width: 20`, `height: 2.5`, `borderRadius: 2`) that **animate into an X** when `open`: top bar `translateY(7.5px) rotate(45deg)`, middle `opacity: 0`, bottom `translateY(-7.5px) rotate(-45deg)`; `transition: all 0.25s`.
- **Do not** use ☰/✕ text, blue outline, or `aria-label` on the button (canonical chapters omit it).

### Backdrop (`Backdrop`)

- Render **only when** `open` is true.
- **Full viewport:** `position: fixed`, `inset: 0`, `zIndex: 1050` (below sidebar, above page).
- **Appearance:** `background: rgba(0,0,0,0.35)`, `cursor: pointer` — **no** blur / `backdrop-filter`.
- **API:** accept `open` and **`onClick`** (parent passes `() => setTocOpen(false)`). Do **not** pass `setOpen` into the backdrop; keep separation of concerns.

### Sidebar / drawer (`Sidebar`)

- **Width collapse (not slide):** outer shell `width: open ? 260 : 0`, `transition: width 0.28s ease`, `overflowY: open ? "auto" : "hidden"`, full viewport height, white background.
- **`zIndex: 1080`** (above backdrop).
- **Shadow / border when open:** `boxShadow: "3px 0 16px rgba(0,0,0,0.18)"`, `borderRight: "2px solid #f0c8dc"`; when closed, no shadow and no right border.
- **Inner padding:** top area `padding: "56px 0 20px"` so content clears the fixed hamburger.
- **Header:** small caps row — `fontFamily: "'Merriweather Sans',Arial,sans-serif"`, `fontWeight: 800`, `fontSize: 12`, `color: P_COLOR`, `letterSpacing: 1`, `textTransform: "uppercase"`, text **"Contents"** (not a full magenta bar).
- **Nav rows:** use **`<div>`** (not `<button>`) per TOC row; `onClick` scrolls then `setOpen(false)`; indent by `level` (`6px 16px` / `4px 24px` / `3px 32px`); top-level rows get `borderLeft: 3px solid P_COLOR` and `fontWeight: 700`; use **`onMouseEnter` / `onMouseLeave`** to set `background` to `LIGHT_P` vs `transparent`.
- **Labels:** `{item.label && <span style={{ marginRight: 5 }}>{item.label}.</span>}{item.title}` (period after label in the span).

### Page layout

- **Do not** add `maxWidth` + `margin: 0 auto` on the main chapter content wrapper (no `900px` cap, no `min(100%, 75rem)` center column).
- Main content wrapper padding: **`"0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)"`**.
- **Do not** add extra left padding “for” the hamburger; overlay must not squeeze the column.
- **State name:** prefer `tocOpen` / `setTocOpen`.

### Wiring in the chapter component

```jsx
const [tocOpen, setTocOpen] = useState(false);
// ...
<HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
<Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
<Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
```

### Inline electronic-configuration tables

- **Inline** `display: inline-table` configuration tables must be wrapped in **`<div>`**, not **`<p>`**. HTML forbids `<table>` inside `<p>`; React will fix the DOM and cause **hydration mismatches**. Keep the same `key` and `style` when swapping `p` → `div`.

### Key uniqueness

- All sibling elements in JSX **arrays** (content batches, lists) must have **unique `key` props** within that array. If the same semantic id would repeat (e.g. two paragraphs both keyed `b4-p7`), rename the duplicate with a suffix such as **`b4-p7b`**, **`b4-p9b`**, etc.

### Images

- After updating figure URLs, run the repo pipeline: `npm run content:extract`, `npm run content:generate`, `npm run content:apply-imports`, then `npm run content:upload-oci` as needed (see `process-jsx-pipeline.md`).

### Reference implementation

Match **`src/components/content/chapters/chem-9-ch2.jsx`** for the exact `HamburgerBtn`, `Backdrop`, `Sidebar`, and export layout.

---

*Repo: `pradeep-temp` — align with `process-jsx-pipeline.md`.*
