"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ─── DATA ─── */
const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Mendel's Monohybrid Cross",
    subtitle: "Inheritance of a single trait — seed shape",
    children: [
      {
        id: "s1-parents",
        title: "Parents (P Generation)",
        detail: "Male pea plant with Round seeds (RR)\n×\nFemale pea plant with Wrinkled seeds (rr)",
      },
      {
        id: "s1-gametes1",
        title: "Gametes",
        detail: "Male gamete: R\nFemale gamete: r",
      },
      {
        id: "s1-f1",
        title: "F₁ Generation",
        detail: "All plants with Round seeds (Rr)\nRound is dominant over Wrinkled.",
      },
      {
        id: "s1-selfcross",
        title: "F₁ Self-Cross (Rr × Rr)",
        detail: "Gametes from each parent: R and r",
        children: [
          {
            id: "s1-selfcross-punnett",
            title: "Punnett Square",
            detail: "       R       r\nR    RR      Rr\nr     Rr      rr",
          },
        ],
      },
      {
        id: "s1-f2",
        title: "F₂ Generation",
        detail: "RR — Round seeds\nRr — Round seeds\nRr — Round seeds\nrr — Wrinkled seeds",
        children: [
          {
            id: "s1-f2-pheno",
            title: "Phenotypic Ratio — 3 : 1",
            detail: "Plants with Round seeds : 3\nPlants with Wrinkled seeds : 1",
          },
          {
            id: "s1-f2-geno",
            title: "Genotypic Ratio — 1 : 2 : 1",
            detail: "RR (Homozygous Round) : 1\nRr (Heterozygous Round) : 2\nrr (Homozygous Wrinkled) : 1",
          },
        ],
      },
    ],
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Mendel's Dihybrid Cross",
    subtitle: "Inheritance of two traits — seed shape & seed colour",
    children: [
      {
        id: "s2-parents",
        title: "Parents (P Generation)",
        detail: "Male pea plant with Round and Yellow coloured seeds\n×\nFemale pea plant with Wrinkled and Green coloured seeds",
      },
      {
        id: "s2-cross",
        title: "Cross Pollination",
        detail: "The two pure-breeding parents are cross-pollinated.",
      },
      {
        id: "s2-f1",
        title: "F₁ Generation",
        detail: "All plants with Round and Yellow coloured seeds.\nRound is dominant over Wrinkled.\nYellow is dominant over Green.",
      },
      {
        id: "s2-self",
        title: "Self Pollination of F₁",
        detail: "F₁ plants are allowed to self-pollinate to produce the F₂ generation.",
      },
      {
        id: "s2-f2",
        title: "F₂ Generation",
        detail: "Four phenotypic classes appear in the offspring.",
        children: [
          {
            id: "s2-f2-ryellow",
            title: "Round, Yellow seeds — 9",
            detail: "Both dominant traits expressed.",
          },
          {
            id: "s2-f2-rgreen",
            title: "Round, Green seeds — 3",
            detail: "Dominant seed shape + recessive seed colour.",
          },
          {
            id: "s2-f2-wyellow",
            title: "Wrinkled, Yellow seeds — 3",
            detail: "Recessive seed shape + dominant seed colour.",
          },
          {
            id: "s2-f2-wgreen",
            title: "Wrinkled, Green seeds — 1",
            detail: "Both recessive traits expressed.",
          },
        ],
      },
      {
        id: "s2-ratio",
        title: "Phenotypic Ratio — 9 : 3 : 3 : 1",
        detail: "This ratio demonstrates the Law of Independent Assortment — the two traits (seed shape and seed colour) are inherited independently of each other.",
      },
    ],
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Sex Determination",
    subtitle: "The mechanism by which the sex of an individual is determined",
    children: [
      {
        id: "s3-chromo",
        title: "1. Chromosomal Determination of Sex",
        detail: "Sex is determined by the combination of sex chromosomes inherited from parents.",
        children: [
          {
            id: "s3-chromo-xx-xy",
            title: "XX–XY Mechanism",
            detail: "Found in Human beings and Drosophila (fruit fly).\n\nFemales: XX (two X chromosomes)\nMales: XY (one X + one Y chromosome)\n\nThe father's sperm determines the sex of the child — X-bearing sperm → girl, Y-bearing sperm → boy.",
          },
        ],
      },
      {
        id: "s3-env",
        title: "2. Environmental Basis of Sex Determination",
        detail: "In some organisms, sex is not determined by chromosomes but by environmental factors such as temperature.",
        children: [
          {
            id: "s3-env-turtle",
            title: "Turtles",
            detail: "Gender is determined by the incubation temperature of eggs.",
          },
          {
            id: "s3-env-lizard",
            title: "Lizards",
            detail: "High incubation temperature → male progeny.\nTemperature below 28°C → produces only females.",
          },
        ],
      },
    ],
  },
];

/* ─── HOOKS ─── */
function useSetup() {
  useEffect(() => {
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800;900&display=swap";
    document.head.appendChild(font);
    const css = document.createElement("style");
    css.textContent = `
      @keyframes fcSlide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      .fc-kids { animation: fcSlide .18s ease-out; }
      .fc-node { transition: filter .12s; }
      .fc-node:hover { filter: brightness(.97); }
      .fc-pill { transition: background .15s; }
      .fc-btn { transition: opacity .12s; }
      .fc-btn:hover { opacity: .82; }
    `;
    document.head.appendChild(css);
    return () => {
      document.head.removeChild(font);
      document.head.removeChild(css);
    };
  }, []);
}

/* ─── DEPTH STYLES ─── */
const DEPTH_STYLES = [
  (a) => ({
    bg: a, fg: "#fff", fw: 800, fs: 16, radius: 10,
    px: "14px 20px", shadow: `0 4px 16px ${a}44`,
    ff: "'Merriweather Sans',Arial,sans-serif",
  }),
  (a) => ({
    bg: "#fff", fg: a, fw: 700, fs: 14.5, radius: 8,
    px: "10px 16px", border: `2px solid ${a}`, shadow: "0 1px 6px rgba(0,0,0,.07)",
    ff: "'Merriweather Sans',Arial,sans-serif",
  }),
  (a) => ({
    bg: "#fdf3f8", fg: "#111", fw: 600, fs: 14, radius: 7,
    px: "9px 14px", border: `1.5px solid ${a}55`,
    ff: "'EB Garamond',Georgia,serif",
  }),
  () => ({
    bg: "#fff", fg: "#222", fw: 400, fs: 14, radius: 5,
    px: "8px 13px", border: "1px solid #ddd",
    ff: "'EB Garamond',Georgia,serif",
  }),
];

/* ─── TREE NODE ─── */
function TreeNode({ node, depth = 0, accent, isLast = false }) {
  const { mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const open =
    mode === "expand" ? true : mode === "collapse" ? false : localOpen;

  const ds = DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)](accent);

  const arrowStyle = {
    fontSize: 10, minWidth: 14, textAlign: "center", flexShrink: 0,
    color: depth === 0 ? "rgba(255,255,255,.8)" : accent,
    display: "inline-block",
    transform: hasKids && open ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform .2s",
    marginTop: depth === 0 ? 3 : 2,
    opacity: hasKids ? 1 : 0,
  };

  return (
    <div style={{ position: "relative", marginBottom: depth === 0 ? 22 : depth === 1 ? 8 : 5 }}>
      {depth > 0 && (
        <>
          <div
            style={{
              position: "absolute", left: -21, top: 0,
              height: isLast ? "calc(50% + 1px)" : "100%",
              width: 2, background: `${accent}44`,
            }}
          />
          <div
            style={{
              position: "absolute", left: -21, top: "50%",
              width: 17, height: 2, marginTop: -1, background: `${accent}44`,
            }}
          />
        </>
      )}

      <div
        className="fc-node"
        onClick={() => hasKids && setLocalOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 8,
          background: ds.bg, color: ds.fg,
          fontWeight: ds.fw, fontSize: ds.fs, fontFamily: ds.ff,
          borderRadius: ds.radius, padding: ds.px,
          border: ds.border ?? "none",
          boxShadow: ds.shadow ?? "none",
          cursor: hasKids ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        <span style={arrowStyle}>▶</span>
        <div style={{ flex: 1 }}>
          <div style={{ lineHeight: 1.35 }}>{node.title}</div>
          {node.subtitle && (
            <div style={{ fontSize: "0.8em", fontStyle: "italic", opacity: 0.72, fontWeight: 400, marginTop: 2 }}>
              {node.subtitle}
            </div>
          )}
          {node.detail && (
            <div
              style={{
                fontSize: "0.92em", fontWeight: 400, fontStyle: "normal",
                color: depth === 0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
                marginTop: 6, lineHeight: 1.65, whiteSpace: "pre-line",
                fontFamily: "'EB Garamond',Georgia,serif", letterSpacing: "0.01em",
              }}
            >
              {node.detail}
            </div>
          )}
        </div>
      </div>

      {hasKids && open && (
        <div className="fc-kids" style={{ marginLeft: 28, marginTop: 6 }}>
          {node.children.map((child, i) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              accent={accent}
              isLast={i === node.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function HeredityFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = { fontFamily: "'EB Garamond',Georgia,serif", fontSize: 15, lineHeight: 1.58, color: "#1a1a1a" };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background: "#eae5e9", minHeight: "100vh", ...body }}>
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
            padding: "32px 40px 26px", textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block", background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.4)",
              fontFamily: "'Merriweather Sans',Arial,sans-serif",
              fontWeight: 800, fontSize: 10, letterSpacing: 3,
              color: "#fff", padding: "4px 16px", borderRadius: 3, marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1
            style={{
              fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 22,
              fontWeight: 900, color: "#fff", margin: "0 0 8px",
              letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
            }}
          >
            HEREDITY
          </h1>
          <div
            style={{
              color: "rgba(255,255,255,.75)", fontSize: 13,
              fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5,
            }}
          >
            Pradeep&apos;s Science : Biology 10th &nbsp;·&nbsp; Chapter 4
          </div>
        </div>

        {/* NAV BAR */}
        <div
          style={{
            background: "#fff", borderBottom: "1px solid #e8e8e8",
            padding: "10px 24px", display: "flex", flexWrap: "wrap",
            gap: 7, justifyContent: "center", alignItems: "center",
          }}
        >
          {DATA.map((s) => (
            <button
              key={s.id}
              className="fc-pill"
              onClick={() => scrollTo(s.id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: `${s.accent}15`, color: s.accent,
                border: `1.5px solid ${s.accent}55`, borderRadius: 30,
                padding: "4px 13px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3, cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${s.accent}28`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `${s.accent}15`)}
            >
              <span>{s.title.split(" ").slice(0, 3).join(" ")}</span>
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
            <button
              className="fc-btn"
              onClick={expandAll}
              style={{
                background: PINK, color: "#fff", border: "none", cursor: "pointer",
                borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}
            >
              Expand All
            </button>
            <button
              className="fc-btn"
              onClick={collapseAll}
              style={{
                background: "#fff", color: PINK, border: `1.5px solid ${PINK}`,
                cursor: "pointer", borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 24px 56px" }}>
          {DATA.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: 6 }}>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
