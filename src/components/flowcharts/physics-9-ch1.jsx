"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ─────────────────────────────────────────────────────── */

const DATA = [
  {
    id: "s1",
    icon: "🚀",
    page: "1/56",
    accent: "#c0126a",
    title: "Motion — Introduction",
    detail:
      "• An object is said to be in motion when its position changes continuously w.r.t. some stationary object.\n• The states of rest and motion are relative.",
    children: [],
  },
  {
    id: "s2",
    icon: "⚖️",
    page: "1/56",
    accent: "#1565c0",
    title: "Uniform vs Non-uniform Motion",
    children: [
      {
        id: "s2-uniform",
        title: "Uniform Motion",
        detail:
          "When an object travels equal distances in equal intervals of time, the motion is called uniform.",
      },
      {
        id: "s2-nonuniform",
        title: "Non-uniform Motion",
        detail:
          "When an object travels unequal distances in equal intervals of time (or vice-versa), the motion is called non-uniform.",
      },
    ],
  },
  {
    id: "s3",
    icon: "⏱️",
    page: "1/56",
    accent: "#2e7d32",
    title: "Speed vs Velocity",
    children: [
      {
        id: "s3-speed",
        title: "Speed",
        detail:
          "It is the distance travelled by the body in unit time.\nSpeed = Distance ÷ Time\nUnit: m s⁻¹\n• Speed is a scalar quantity.",
        children: [
          {
            id: "s3-speed-avg",
            title: "Average Speed",
            detail:
              "When speed is variable (non-uniform), we define average speed as:\nAverage speed = Total distance travelled ÷ Total time taken",
          },
        ],
      },
      {
        id: "s3-velocity",
        title: "Velocity",
        detail:
          "Velocity  v⃗ = Displacement ÷ Time\n• Velocity is a vector quantity.",
        children: [
          {
            id: "s3-vel-avg",
            title: "Average Velocity",
            detail:
              "When the velocity of a body changes at a uniform rate over a period of time:\nAverage velocity = (Initial v + Final v) ÷ 2",
          },
        ],
      },
      {
        id: "s3-diff",
        title: "Key Difference",
        detail:
          "• Speed is a scalar whereas velocity is a vector quantity.\n• Units of both speed and velocity are m s⁻¹.",
      },
    ],
  },
  {
    id: "s4",
    icon: "📏",
    page: "1/56",
    accent: "#c77000",
    title: "Distance vs Displacement",
    children: [
      {
        id: "s4-distance",
        title: "Distance",
        detail:
          "• Distance travelled by an object is the length of the actual path during its motion.\n• Distance is a scalar quantity having magnitude only.",
      },
      {
        id: "s4-displacement",
        title: "Displacement",
        detail:
          "• Displacement of an object in motion is the shortest distance between its initial and final position.\n• Displacement is a vector quantity having both magnitude and direction.",
      },
      {
        id: "s4-compare",
        title: "Comparison",
        detail:
          "• Distance travelled by an object can never be zero or negative.\n• Displacement can be positive, zero, or negative.",
      },
    ],
  },
  {
    id: "s5",
    icon: "🏎️",
    page: "1/56",
    accent: "#6a1b9a",
    title: "Acceleration",
    detail:
      "Acceleration is defined as the rate of change of velocity of a body.\na = (v − u) ÷ t\nUnit: m s⁻²",
    children: [
      {
        id: "s5-vector",
        title: "Properties",
        detail:
          "• Acceleration is a vector quantity.\n• When v = u, a = 0.\n• When v > u, a is positive → acceleration is in the direction of velocity.\n• When v < u, a is negative → called retardation; direction is opposite to velocity.",
      },
    ],
  },
  {
    id: "s6",
    icon: "📈",
    page: "1/56",
    accent: "#00695c",
    title: "Graphical Representation of Motion",
    children: [
      {
        id: "s6-dt",
        title: "Distance–Time Graphs",
        detail:
          "• Body at rest → straight line parallel to time axis.\n• Body in uniform motion → straight line inclined to time axis.\n• The slope (tangent of inclination) of the distance–time graph gives the speed of the body.",
      },
      {
        id: "s6-vt",
        title: "Velocity–Time Graphs",
        detail:
          "• Uniform velocity → v–t graph is a straight line parallel to the time axis.\n• Uniform acceleration → v–t graph is a straight line inclined to the time axis; slope gives acceleration.\n• Variable acceleration → v–t graph is a curved line.",
      },
    ],
  },
  {
    id: "s7",
    icon: "🔢",
    page: "1/56",
    accent: "#b71c1c",
    title: "Equations of Motion",
    detail:
      "For motion along a straight line with uniform acceleration, the following equations hold:",
    children: [
      {
        id: "s7-eq1",
        title: "First Equation",
        detail: "v = u + at",
      },
      {
        id: "s7-eq2",
        title: "Second Equation",
        detail: "s = ut + ½ at²",
      },
      {
        id: "s7-eq3",
        title: "Third Equation",
        detail: "v² = u² + 2 as",
      },
    ],
  },
  {
    id: "s8",
    icon: "🔄",
    page: "1/56",
    accent: "#4a148c",
    title: "Uniform Circular Motion",
    detail:
      "• In uniform circular motion, the speed of the body along a circular path is constant, but the direction of motion changes continuously.\n• Hence, uniform circular motion is an accelerated motion.",
  },
];

/* ── HOOKS & HELPERS ──────────────────────────────────────────── */

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

/* ── TREE NODE ────────────────────────────────────────────────── */

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
          <div style={{ position: "absolute", left: -21, top: 0,
            height: isLast ? "calc(50% + 1px)" : "100%",
            width: 2, background: `${accent}44` }} />
          <div style={{ position: "absolute", left: -21, top: "50%",
            width: 17, height: 2, marginTop: -1, background: `${accent}44` }} />
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
            <div style={{ fontSize: "0.8em", fontStyle: "italic",
              opacity: 0.72, fontWeight: 400, marginTop: 2 }}>
              {node.subtitle}
            </div>
          )}
          {node.detail && (
            <div style={{ fontSize: "0.92em", fontWeight: 400, fontStyle: "normal",
              color: depth === 0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
              marginTop: 6, lineHeight: 1.65, whiteSpace: "pre-line",
              fontFamily: "'EB Garamond',Georgia,serif", letterSpacing: "0.01em" }}>
              {node.detail}
            </div>
          )}
        </div>
      </div>

      {hasKids && open && (
        <div className="fc-kids" style={{ marginLeft: 28, marginTop: 6 }}>
          {node.children.map((child, i) => (
            <TreeNode key={child.id} node={child} depth={depth + 1}
              accent={accent} isLast={i === node.children.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── MAIN EXPORT ──────────────────────────────────────────────── */

export default function MotionFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = {
    fontFamily: "'EB Garamond',Georgia,serif",
    fontSize: 15, lineHeight: 1.58, color: "#1a1a1a",
  };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background: "#eae5e9", minHeight: "100vh", ...body }}>

        {/* HEADER */}
        <div style={{ background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding: "32px 40px 26px", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontFamily: "'Merriweather Sans',Arial,sans-serif",
            fontWeight: 800, fontSize: 10, letterSpacing: 3,
            color: "#fff", padding: "4px 16px", borderRadius: 3, marginBottom: 14,
            textTransform: "uppercase" }}>
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 22,
            fontWeight: 900, color: "#fff", margin: "0 0 8px",
            letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25 }}>
            Motion
          </h1>
          <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13,
            fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5 }}>
            Pradeep&apos;s Science : Physics 9th
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8",
          padding: "10px 24px", display: "flex", flexWrap: "wrap",
          gap: 7, justifyContent: "center", alignItems: "center" }}>
          {DATA.map((s) => (
            <button key={s.id} className="fc-pill"
              onClick={() => scrollTo(s.id)}
              style={{ display: "inline-flex", alignItems: "center", gap: 5,
                background: `${s.accent}15`, color: s.accent,
                border: `1.5px solid ${s.accent}55`, borderRadius: 30,
                padding: "4px 13px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3, cursor: "pointer",
                whiteSpace: "nowrap" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${s.accent}28`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `${s.accent}15`)}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0, 3).join(" ")}</span>
              <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 400 }}>{s.page}</span>
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
            <button className="fc-btn" onClick={expandAll}
              style={{ background: PINK, color: "#fff", border: "none", cursor: "pointer",
                borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700 }}>
              Expand All
            </button>
            <button className="fc-btn" onClick={collapseAll}
              style={{ background: "#fff", color: PINK, border: `1.5px solid ${PINK}`,
                cursor: "pointer", borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700 }}>
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 24px 56px" }}>
          {DATA.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
                  fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5,
                  color: section.accent, textTransform: "uppercase", opacity: 0.7 }}>
                  Page {section.page}
                </span>
                <div style={{ flex: 1, height: 1, background: `${section.accent}25` }} />
              </div>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", padding: "16px 20px",
          borderTop: "1px solid #e8e8e8", background: "#fff",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontSize: 11, color: "#bbb", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Pradeep&apos;s Publications
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
