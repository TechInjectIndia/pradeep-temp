"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ────────────────────────────────────────────────────────── */
const DATA = [
  {
    id: "s0",
    accent: "#4a148c",
    title: "Electricity — Definition",
    detail: "Electricity is one of the forms of energy and it can be produced from other sources of energy such as the energy of a chemical reaction or of mechanical rotation of a dynamo.",
  },
  {
    id: "s1",
    accent: "#c0126a",
    title: "Electric Current and Potential",
    children: [
      {
        id: "s1-current",
        title: "(i) Electric Current (I)",
        detail: "It is defined as the rate of flow of electric charge (Q), i.e.,\nI = Q/t\n\nUnit of I: The SI unit of I is called an ampere (A).\n1 ampere = 1 coulomb/second\nwhere coulomb is the unit of charge.\nFurther, 1 milliampere (1 mA) = 10⁻³ A and\n1 microampere (1 μA) = 10⁻⁶ A",
      },
      {
        id: "s1-potential",
        title: "(ii) Electric Potential (V)",
        detail: "It is defined as V = W/Q\n\nwhere W is the work done to move a charge Q from one point to another.\n\nUnit of V: The unit of potential difference is called a volt (V) where\n1 V = 1 joule (J) / 1 coulomb (C)",
      },
    ],
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Ohm's Law",
    children: [
      {
        id: "s2-law",
        title: "(i) Ohm's Law",
        detail: "It states that I ∝ V or I = V/R\nor V = RI\n\nwhere R is a constant of proportionality and is called the electric resistance or resistance.\n\nUnit of resistance: The SI unit of resistance is called an ohm (Ω) where\n1 Ω = 1 V / 1 A",
      },
      {
        id: "s2-resistivity",
        title: "(ii) Resistivity",
        detail: "The resistance of a conductor of length l, and cross-sectional area A is given by\nR = ρl/A\n\nwhere ρ is the resistivity of the material.\nIts unit is ohm metre (Ω·m).",
      },
    ],
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Combination of Resistors",
    children: [
      {
        id: "s3-series",
        title: "Resistors in Series",
        detail: "(i) V₁ = IR₁, V₂ = IR₂, V₃ = IR₃\n(ii) V = V₁ + V₂ + V₃ = I(R₁ + R₂ + R₃)\n(iii) Rₛ (equivalent or resultant resistance) is given by\nRₛ = R₁ + R₂ + R₃\n(iv) In case, there are n resistors (each of resistance R) in series,\nRₛ = nR\n(v) The current flowing through each resistor is the same (i.e. the total current) but the p.d. across any one resistor is directly proportional to its resistance.",
      },
      {
        id: "s3-parallel",
        title: "Resistors in Parallel",
        detail: "(i) I = I₁ + I₂ + I₃\n(ii) I₁ = V/R₁, I₂ = V/R₂, I₃ = V/R₃\n(iii) Rₚ (equivalent or resultant resistance) is given by\n1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃\n(iv) In this case, there are n resistors (each of resistance R) in parallel,\nRₚ = R/n\n(v) The p.d. across each resistor is the same (i.e. the total p.d.) but the current flowing in any one resistor is inversely proportional to its resistance.",
      },
    ],
  },
  {
    id: "s4",
    accent: "#b71c1c",
    title: "Joule Heating : Heating Effect of Electric Current",
    children: [
      {
        id: "s4-energy",
        title: "Electric Energy and Joule's Law of Heating",
        detail: "Electric energy: It is the work done (W) by a current in an electric circuit.\n\nW = VIt = I²Rt = (V²/R) × t\n\n(W is in joule, V is in volt, I is in ampere, R is in ohm and t is in second.)",
        children: [
          {
            id: "s4-energy-joule",
            title: "Joule's Law of Heating",
            detail: "According to Joule's Law of heating:\nH ∝ I²Rt\n\nThe heat produced in a resistor is directly proportional to the square of current, the resistance, and the time for which current flows.",
          },
        ],
      },
    ],
  },
  {
    id: "s5",
    accent: "#c77000",
    title: "Electric Power (P) and kWh (Kilowatt Hour)",
    children: [
      {
        id: "s5-def",
        title: "Definition of Electric Power",
        detail: "Electric power: It is the rate at which work is done by an electric current.\n\nP = W/t = VIt/t = VI",
      },
      {
        id: "s5-unit",
        title: "Unit of Electric Power",
        detail: "P (in watt) = V (volt) × I (ampere)",
      },
      {
        id: "s5-formulas",
        title: "Alternate Formulas for Power",
        detail: "Also note:\n• P = I²R = V²/R\n• Obviously, P ∝ 1/R\n\nThus, more the power of an appliance, less is its resistance.\nFurther, as I = V/R, an appliance of greater power (having less resistance), consumes more current.",
      },
      {
        id: "s5-kwh",
        title: "kWh — Commercial Unit of Energy",
        detail: "1 kWh = 1 kW × 1 h = 3.6 × 10⁶ J\n\nW (in kWh) = V (volt) × I (ampere) × t (hour) ÷ 1000",
      },
    ],
  },
  {
    id: "s6",
    accent: "#00695c",
    title: "Power Rating",
    detail: "It indicates the voltage at which an electrical appliance is designed to operate at and also the amount of power it consumes at that voltage.",
    children: [
      {
        id: "s6-max",
        title: "Maximum Power Capacity",
        detail: "(i) It also refers to the maximum amount of power that a system can handle or the highest power input that can pass through it.",
      },
      {
        id: "s6-unit",
        title: "Common Units",
        detail: "(ii) The most common unit of power is watt (W), but in larger devices and systems, it is kilowatt (kW).",
      },
      {
        id: "s6-importance",
        title: "Importance of Power Rating",
        detail: "(iii) Understanding power rating is important to ensure safe operation and efficient performance.",
      },
    ],
  },
];

/* ── FONT LOADING ────────────────────────────────────────────────── */
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

/* ── DEPTH STYLES ────────────────────────────────────────────────── */
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

/* ── TREE NODE ───────────────────────────────────────────────────── */
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

/* ── MAIN EXPORT ─────────────────────────────────────────────────── */
export default function ElectricityFlowchart() {
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
            ELECTRICITY
          </h1>
          <div
            style={{
              color: "rgba(255,255,255,.75)", fontSize: 13,
              fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5,
            }}
          >
            Pradeep&apos;s Science : Physics 10th &nbsp;·&nbsp; Chapter 3
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

        {/* KEY FORMULAS LEGEND */}
        <div
          style={{
            display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center",
            margin: "16px auto", maxWidth: 880, padding: "12px 18px", background: "#fff",
            borderRadius: 10, border: "1px solid #e0e0e0", fontSize: 12.5,
          }}
        >
          <span
            style={{
              fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif",
              fontSize: 12, color: "#666", marginRight: 4,
            }}
          >
            Key Formulas:
          </span>
          {[
            { label: "I = Q/t", desc: "Current", color: "#c0126a" },
            { label: "V = IR", desc: "Ohm's Law", color: "#1565c0" },
            { label: "R = ρl/A", desc: "Resistivity", color: "#1565c0" },
            { label: "H ∝ I²Rt", desc: "Joule's Law", color: "#b71c1c" },
            { label: "P = VI", desc: "Electric Power", color: "#c77000" },
            { label: "1 kWh = 3.6×10⁶ J", desc: "Energy Unit", color: "#00695c" },
          ].map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
              <span style={{ fontWeight: 600, color: p.color }}>{p.label}</span>
              <span style={{ color: "#888" }}>{p.desc}</span>
            </div>
          ))}
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
