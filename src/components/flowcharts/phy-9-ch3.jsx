"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ─────────────────────────────────────────────────────── */

const DATA = [
  {
    id: "s1",
    icon: "⚡",
    page: "3/90",
    accent: "#c0126a",
    title: "Energy",
    detail: "• Capacity for doing work is called energy. It is measured by total quantity of work an object can do.\n• Energy is a scalar quantity. Its unit is same as that of work, i.e., Joule (J).",
    children: [
      {
        id: "s1-ke",
        title: "Kinetic Energy (Eₖ)",
        detail: "It is defined as energy possessed by an object by virtue of its motion.\nEₖ = ½mv²\nwhere m is mass of the object and v is the speed with which it is moving.",
        children: [
          {
            id: "s1-ke-wet",
            title: "Work–Energy Theorem",
            detail: "According to this theorem, net work done (W) by external forces on an object is equal to the change in its kinetic energy, i.e.,\nW = change in kinetic energy\nW = ½mv² − ½mu²,  v > u",
          },
        ],
      },
      {
        id: "s1-pe",
        title: "Potential Energy (Eₚ)",
        detail: "• The energy possessed by an object by virtue of its position or configuration is called its gravitational potential energy.\n• Potential energy of an object of mass m at height h is given by:  Eₚ = mgh\n• Gravitational potential energy is path independent.",
        children: [
          {
            id: "s1-pe-cons",
            title: "Conservation of Mechanical Energy",
            detail: "The sum of the kinetic energy and the potential energy of an object is called its total mechanical energy.\nDuring free fall of a body, total mechanical energy of a body throughout the free fall is conserved.\nIn other words, total energy at point A, B or C is:\nEₐ = E_B = E_C = mgh",
          },
        ],
      },
    ],
  },
  {
    id: "s2",
    icon: "🔧",
    page: "3/90",
    accent: "#1565c0",
    title: "Work",
    detail: "• Work is said to be done if (i) a force is applied on the object and (ii) the object is displaced from its original position.\n• Work done, W = F × S = Fs\nwhere F is applied force and s is displacement in the direction of force.",
    children: [
      {
        id: "s2-sign",
        title: "Sign of Work",
        detail: "W = positive, if F and s are in same direction\nW = negative, if F and s are in opposite direction\nW = 0, if F is perpendicular to s",
      },
      {
        id: "s2-unit",
        title: "Unit of Work",
        detail: "• Work is a scalar quantity.\n• Unit of work is Joule (J). Work is said to be 1 J when a force of 1 N displaces it by 1 m along the direction of force.\n1 J = 1 N × 1 m = 1 Nm\n• Further, 1 Kilo joule = 1000 J\n1 mega joule = 1 MJ = 10⁶ J = 1 MJ\n1 mega joule = 10⁶ J = 1 MJ",
      },
    ],
  },
  {
    id: "s3",
    icon: "⚡",
    page: "3/90",
    accent: "#c77000",
    title: "Law of Conservation of Energy",
    detail: "Energy can only be converted from one form to the other; it can neither be created nor destroyed. As such total energy of the universe remains constant.",
    children: [],
  },
  {
    id: "s4",
    icon: "🔋",
    page: "3/90",
    accent: "#2e7d32",
    title: "Power",
    detail: "Power (P): It is defined as the rate of doing work.\nP = W/t = Fs/t = Fv",
    children: [
      {
        id: "s4-avg",
        title: "Average Power",
        detail: "Average power = total work done / total time taken\nPower = force × velocity",
      },
      {
        id: "s4-unit",
        title: "Unit of Power",
        detail: "Unit of power is watt (W). It is also expressed in kW (kilo Watt).\n1 kW = 1000 W,   where 1 W = J/s\nAnother unit used in engineering is horse-power (hp).\n1 hp = 746 W",
      },
    ],
  },
  {
    id: "s5",
    icon: "⚙️",
    page: "3/91",
    accent: "#6a1b9a",
    title: "Simple Machines",
    detail: "A Simple Machine is a mechanical device that makes work easier by changing the magnitude or direction of force which is applied to do the work. It may or may not have moving parts.",
    children: [
      {
        id: "s5-ma",
        title: "Mechanical Advantage of a Machine",
        detail: "The ratio of load (L) or output force to Effort (E) or input force is called mechanical advantage (M.A.), i.e.,\nM.A. = Load / Effort = output force / input force",
      },
      {
        id: "s5-force",
        title: "Force Multiplier & Direction Changer",
        detail: "• When output force > input force, M.A. > 1, then machine acts like a force multiplier.\n• When output force is used to change the direction of force, M.A. < 1, such machine provides speed gain.\n• No machine can simultaneously act as force multiplier and offer speed gain.",
      },
      {
        id: "s5-vr",
        title: "Velocity Ratio (V.R.)",
        detail: "It is the ratio of the velocity of the effort to the velocity of the load, i.e.,\nV.R. = velocity of effort / velocity of load = dₑ / d_L\nwhere dₑ, d_L are distances moved by effort and load, respectively.",
      },
      {
        id: "s5-eff",
        title: "Efficiency of a Machine (η)",
        detail: "η = W_output / W_input\nη = 1 for ideal machine\nη < 1 for practical machine",
      },
    ],
  },
  {
    id: "s6",
    icon: "⚖️",
    page: "3/91",
    accent: "#00695c",
    title: "Working Principle of Machine",
    detail: "An ideal machine works on the principle of conservation of energy, i.e., W_output = W_input.",
    children: [
      {
        id: "s6-rel",
        title: "Relation between M.A., V.R. and η",
        detail: "The mechanical advantage (M.A.), velocity ratio (V.R.) and efficiency η for a simple machine are connected as:\nM.A. = η × V.R.",
      },
    ],
  },
  {
    id: "s7",
    icon: "🔩",
    page: "3/91–3/92",
    accent: "#b71c1c",
    title: "Types of Simple Machines",
    subtitle: "Six kinds of simple machines",
    detail: "(i) Lever\n(ii) Pulley\n(iii) Inclined plane\n(iv) Wheel and axle\n(v) Wedge\n(vi) Screw",
    children: [
      {
        id: "s7-lever",
        title: "Lever",
        detail: "Depending upon relative position of fulcrum, load and effort, there are 3 classes of lever.",
        children: [
          {
            id: "s7-lever-c1",
            title: "Class-1 Lever",
            detail: "In this lever, fulcrum F lies between Load and Effort.\nExamples: Scissors, seesaw, crowbar, pull tab.\nFor class-1 lever, when M.A. and V.R. > 1, it acts as force multiplier.",
          },
          {
            id: "s7-lever-c2",
            title: "Class-2 Lever",
            detail: "Load L lies between fulcrum F and effort E. It provides speed gain.\nIn this case, M.A. and V.R. > 1.\nExamples: Wheelbarrow, bottle opener, nut cracker.\nFor class-2 lever, M.A. and V.R. > 1.",
          },
          {
            id: "s7-lever-c3",
            title: "Class-3 Lever",
            detail: "In this case, Effort E lies between fulcrum F and load L.\nExamples: Shovel, tweezers etc.\nFor class-3 lever, M.A. and V.R. < 1.",
          },
        ],
      },
      {
        id: "s7-pulley",
        title: "Pulley",
        detail: "A pulley is another simple machine in the form of a disc with grooved rim around which a rope or string is passed.\nPulleys are used to raise or lower the object.",
        children: [
          {
            id: "s7-pulley-fixed",
            title: "Fixed Pulley",
            detail: "A pulley in which axis of rotation is fixed is called a fixed pulley.\n• Mechanical advantage: M.A. = Load / Effort = 1\n• Velocity Ratio: V.R. = dₑ / d_L = 1\n• Efficiency (Ideal): η = M.A. / V.R. = 1/1 = 1 or 100%\n• Efficiency Actual (friction present): η < 1, or < 100%\n• In this case, Load and Effort move same distance.",
          },
          {
            id: "s7-pulley-movable",
            title: "Movable Pulley",
            detail: "A pulley whose axis of rotation is movable is called a movable pulley.\n• Mechanical advantage: M.A. = 2T / T = 2\n• Velocity Ratio: V.R. = dₑ / d_L = 2\n• Efficiency (Ideal): M.A. / V.R. = 2/2 = 1 or 100%\n• Efficiency (Actual): η = M.A. / V.R. < 1 or 100%\n• A movable pulley reduces the effort whereas a fixed pulley changes the direction of effort.",
          },
          {
            id: "s7-pulley-combo",
            title: "Combination of Pulleys",
            detail: "If there are n movable pulleys with one fixed pulley, the mechanical advantage is: M.A. = 2ⁿ\nThe velocity ratio for the same case is: V.R. = 2ⁿ\nEfficiency (η) is: η = M.A. / V.R. = 2ⁿ / 2ⁿ = 1 or 100%",
          },
        ],
      },
      {
        id: "s7-inclined",
        title: "Inclined Plane",
        detail: "The mechanical advantage for inclined plane is:\nM.A. = Length of inclined (L) / Height (R)\n• Mechanical advantage: M.A. = Load / Effort = L / E = n\n• Velocity ratio: V.R. = dₑ / d_L = n\n• Efficiency (η) is: η = M.A. / V.R. = n / n = 1 or 100%\nHere n is the total number of pulleys.",
      },
      {
        id: "s7-block",
        title: "Block and Tackle System",
        detail: "A block and tackle system uses a combination of fixed and movable pulleys to gain mechanical advantage.",
      },
    ],
  },
];

/* ── useSetup ─────────────────────────────────────────────────── */

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

/* ── Depth styles ─────────────────────────────────────────────── */

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

/* ── TreeNode ─────────────────────────────────────────────────── */

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
              opacity: 0.72, fontWeight: 400, marginTop: 2 }}>{node.subtitle}</div>
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

/* ── Main Export ───────────────────────────────────────────────── */

export default function WorkEnergySimpleMachinesFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = {
    fontFamily: "'EB Garamond',Georgia,serif", fontSize: 15,
    lineHeight: 1.58, color: "#1a1a1a",
  };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background: "#eae5e9", minHeight: "100vh", ...body }}>

        {/* HEADER */}
        <div style={{
          background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding: "32px 40px 26px", textAlign: "center",
        }}>
          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontFamily: "'Merriweather Sans',Arial,sans-serif",
            fontWeight: 800, fontSize: 10, letterSpacing: 3,
            color: "#fff", padding: "4px 16px", borderRadius: 3, marginBottom: 14,
            textTransform: "uppercase",
          }}>
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1 style={{
            fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 22,
            fontWeight: 900, color: "#fff", margin: "0 0 8px",
            letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
          }}>
            Work, Energy and Simple Machines
          </h1>
          <div style={{
            color: "rgba(255,255,255,.75)", fontSize: 13,
            fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5,
          }}>
            Pradeep&apos;s Science : Physics 9th
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e8e8e8",
          padding: "10px 24px", display: "flex", flexWrap: "wrap",
          gap: 7, justifyContent: "center", alignItems: "center",
        }}>
          {DATA.map((s) => (
            <button key={s.id} className="fc-pill"
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
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0, 3).join(" ")}</span>
              <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 400 }}>{s.page}</span>
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
            <button className="fc-btn" onClick={expandAll}
              style={{
                background: PINK, color: "#fff", border: "none", cursor: "pointer",
                borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}>
              Expand All
            </button>
            <button className="fc-btn" onClick={collapseAll}
              style={{
                background: "#fff", color: PINK, border: `1.5px solid ${PINK}`,
                cursor: "pointer", borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}>
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 24px 56px" }}>
          {DATA.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontFamily: "'Merriweather Sans',Arial,sans-serif",
                  fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5,
                  color: section.accent, textTransform: "uppercase", opacity: 0.7,
                }}>
                  Page {section.page}
                </span>
                <div style={{ flex: 1, height: 1, background: `${section.accent}25` }} />
              </div>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: "center", padding: "16px 20px",
          borderTop: "1px solid #e8e8e8", background: "#fff",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontSize: 11, color: "#bbb", letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Pradeep&apos;s Publications
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
