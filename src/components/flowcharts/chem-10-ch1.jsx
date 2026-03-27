"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

function useSetup() {
  useEffect(() => {
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800;900&display=swap";
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
    return () => { document.head.removeChild(font); document.head.removeChild(css); };
  }, []);
}

const DEPTH_STYLES = [
  (a) => ({ bg: a, fg:"#fff", fw:800, fs:16, radius:10,
    px:"14px 20px", shadow:`0 4px 16px ${a}44`,
    ff:"'Merriweather Sans',Arial,sans-serif" }),
  (a) => ({ bg:"#fff", fg:a, fw:700, fs:14.5, radius:8,
    px:"10px 16px", border:`2px solid ${a}`, shadow:"0 1px 6px rgba(0,0,0,.07)",
    ff:"'Merriweather Sans',Arial,sans-serif" }),
  (a) => ({ bg:"#fdf3f8", fg:"#111", fw:600, fs:14, radius:7,
    px:"9px 14px", border:`1.5px solid ${a}55`,
    ff:"'EB Garamond',Georgia,serif" }),
  () => ({ bg:"#fff", fg:"#222", fw:400, fs:14, radius:5,
    px:"8px 13px", border:"1px solid #ddd",
    ff:"'EB Garamond',Georgia,serif" }),
];

/* ─────────────────── DATA ─────────────────── */

const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Chemical Reactions — General Information",
    detail: "When original substances lose their identity and form new chemical substances with different properties, a chemical reaction is said to have occurred.",
    children: [
      {
        id: "s1-def",
        title: "Definition",
        detail: "When original substances lose their identity and form new chemical substances with different properties.\ne.g., 2 Mg(s) + O₂(g) → 2 MgO(s)"
      },
      {
        id: "s1-changes",
        title: "Physical and Chemical Changes",
        detail: "Physical change: A process in which no new chemical substances are formed, e.g., melting of ice.\nChemical change: A process in which new chemical substances are formed."
      },
      {
        id: "s1-rp",
        title: "Reactants and Products",
        detail: "Chemical substances taken originally are called reactants and the new chemical substances formed are called products."
      }
    ]
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Characteristics of Chemical Reactions",
    children: [
      {
        id: "s2-ppt",
        title: "1. Formation of a Precipitate",
        detail: "e.g., AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)\n         ppt."
      },
      {
        id: "s2-gas",
        title: "2. Evolution of a Gas",
        detail: "e.g., CaCO₃(s) → CaO(s) + CO₂(g)↑"
      },
      {
        id: "s2-colour",
        title: "3. Change in Colour",
        detail: "e.g., Fe(s)  ──rusting──▸  Rust (Fe₂O₃·xH₂O(s))\n         Grey/black → Brown"
      },
      {
        id: "s2-state",
        title: "4. Change in State",
        detail: "e.g., Petrol(l)  ──burn──▸  H₂O(g) + CO₂(g)"
      },
      {
        id: "s2-temp",
        title: "5. Change in Temperature",
        detail: "e.g., CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat\n       Quick lime → Slaked lime\nTemperature rises or falls depending on whether the reaction is exothermic or endothermic."
      }
    ]
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Types of Chemical Reactions",
    children: [
      {
        id: "s3-comb",
        title: "1. Combination Reactions",
        detail: "When 2 or more reactants (elements or compounds) combine to form a single compound.\ne.g., 2H₂(g) + O₂(g) → 2H₂O(l)\nor CaO(s) + H₂O(l) → Ca(OH)₂(aq)\nor CO₂(g) + C(s) → 2CO(g)"
      },
      {
        id: "s3-thermal",
        title: "2. Thermal Decomposition Reactions",
        detail: "When a compound on heating breaks to form 2 or more simpler substances.\ne.g., 2Pb(NO₃)₂  ──Δ──▸  2PbO(s) + 4NO₂(g) + O₂(g)"
      },
      {
        id: "s3-elec",
        title: "3. Electrolytic Decomposition Reactions",
        detail: "When a compound decomposes on passing electricity.\ne.g., 2H₂O(l)  ──electricity──▸  2H₂(g) + O₂(g)"
      },
      {
        id: "s3-photo",
        title: "4. Photo Decomposition Reactions",
        detail: "When a compound decomposes on exposure to sunlight.\ne.g., 2AgBr(s)  ──sunlight──▸  2Ag(s) + Br₂(g)"
      },
      {
        id: "s3-disp",
        title: "5. Displacement (Single Displacement) Reactions",
        detail: "When a more active metal or element displaces a less active metal or element from its salt solution.\ne.g., Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)\n       Cl₂(g) + 2NaBr(aq) → 2NaCl(aq) + Br₂(g)"
      },
      {
        id: "s3-double",
        title: "6. Double Displacement Reactions",
        detail: "When exchange of ions takes place between two salt solutions.\ne.g., AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)"
      },
      {
        id: "s3-precip",
        title: "7. Precipitation Reactions",
        detail: "When aqueous solutions of two compounds react to form an insoluble solid (ppt.).\ne.g., BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq)"
      },
      {
        id: "s3-neut",
        title: "8. Neutralisation Reactions",
        detail: "When an acid reacts with a base to form salt and water.\ne.g., NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)"
      },
      {
        id: "s3-exoendo",
        title: "9. Exothermic and Endothermic Reactions",
        detail: "Exothermic: A reaction in which heat is evolved.\nEndothermic: A reaction in which heat is absorbed."
      },
      {
        id: "s3-redox",
        title: "10. Redox Reactions",
        detail: "A reaction which involves both oxidation and reduction simultaneously.\ne.g., CuO(s) + H₂(g)  ──Heat──▸  Cu(s) + H₂O(g)\nHere, CuO has been reduced to Cu whereas H₂ has been oxidized to H₂O."
      }
    ]
  },
  {
    id: "s4",
    accent: "#6a1b9a",
    title: "Terms Used in Redox Reactions",
    children: [
      {
        id: "s4-oxi",
        title: "(i) Oxidation",
        detail: "A process which involves gain of oxygen or loss of hydrogen."
      },
      {
        id: "s4-red",
        title: "(ii) Reduction",
        detail: "A process which involves gain of hydrogen or loss of oxygen."
      },
      {
        id: "s4-oxagent",
        title: "(iii) Oxidizing Agent",
        detail: "A substance which oxidizes the other substance and itself gets reduced."
      },
      {
        id: "s4-redagent",
        title: "(iv) Reducing Agent",
        detail: "A substance which reduces the other substance and itself gets oxidized."
      }
    ]
  },
  {
    id: "s5",
    accent: "#b71c1c",
    title: "Effects of Oxidation Reactions",
    children: [
      {
        id: "s5-corr",
        title: "(i) Corrosion",
        detail: "Eating up of the surface of a metal due to attack of atmospheric gases, e.g., rusting of iron.\n2Fe(s) + ³⁄₂ O₂(g) + xH₂O(l) → Fe₂O₃·xH₂O(s) (Rust)\nPrevention: Galvanisation (coating with zinc), painting, oiling, etc."
      },
      {
        id: "s5-ranc",
        title: "(ii) Rancidity",
        detail: "Oxidation of oils and fats present in a food resulting into a bad smell and taste.\nPrevention: Adding antioxidants, vacuum packing, replacing air by N₂ in food packets, or refrigeration."
      }
    ]
  },
  {
    id: "s6",
    accent: "#c77000",
    title: "Chemical Equations — General Information",
    children: [
      {
        id: "s6-def",
        title: "Definition",
        detail: "A short hand method of representing a chemical reaction in terms of symbols and formulae of different reactants and products.\ne.g., Zn + H₂SO₄ → ZnSO₄ + H₂\n       Zinc   Zinc sulphate   Hydrogen"
      },
      {
        id: "s6-write",
        title: "Writing of a Chemical Equation",
        detail: "Write the formulae of reactants on LHS and those of products on RHS and put an arrow between them pointing from reactants to products."
      }
    ]
  },
  {
    id: "s7",
    accent: "#00695c",
    title: "Balancing Chemical Equations",
    children: [
      {
        id: "s7-types",
        title: "Balanced and Unbalanced (Skeletal) Equations",
        detail: "Balanced equation: An equation in which the number of atoms of each element are equal on both sides.\nUnbalanced (skeletal) equation: An equation where the atom counts are NOT equal on both sides.\ne.g., KClO₃ → KCl + O₂ is unbalanced or skeletal\n       2KClO₃ → 2KCl + 3O₂ is balanced"
      },
      {
        id: "s7-methods",
        title: "Methods of Balancing",
        children: [
          {
            id: "s7-hit",
            title: "(i) Hit and Trial Method",
            detail: "Start with the biggest formula and start balancing.\ne.g., Fe + H₂O → Fe₃O₄ + H₂\nWe start balancing with Fe₃O₄."
          },
          {
            id: "s7-partial",
            title: "(ii) Partial Equation Method",
            detail: "(Excluded at this level)"
          }
        ]
      },
      {
        id: "s7-law",
        title: "Why Balancing is Required",
        detail: "Balancing of chemical equation is required because by law of conservation of mass, total mass of reactants must be equal to total mass of products."
      }
    ]
  },
  {
    id: "s8",
    accent: "#4a148c",
    title: "Information, Limitations & Ionic Equations",
    children: [
      {
        id: "s8-info",
        title: "Information Conveyed by a Balanced Equation",
        detail: "It helps to calculate the amounts of reactants reacted and the amounts of products formed by knowing the atomic masses of the elements involved.\ne.g., CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂\n1 mole          2 moles        1 mole     1 mole    1 mole\n40+12+48=100g  40+35.5×2=111g  40+71=111g  18g  12+32=44g\n                                                 or 22.4 L at STP"
      },
      {
        id: "s8-limit",
        title: "Limitations & Their Removal",
        detail: "Simply writing the formulae of reactants and products does not tell their physical state. Hence, we write in brackets:\n• aq for aqueous, s for solid, l for liquid, g for gas\n• dil for dilute and conc. for concentrated solutions\n• For solid products we put an arrow downwards (↓)\n• For gaseous products we put an arrow upwards (↑)\n• We also write conditions like heat, light, catalyst name etc. on the arrow between reactants and products."
      },
      {
        id: "s8-ionic",
        title: "Ionic Equations",
        detail: "As ionic compounds in aqueous solution split into ions, common ions on both sides (called spectator ions) are cancelled out and we get ionic equation.\ne.g., Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)\ncan be written as:\nZn + Cu²⁺ + SO₄²⁻ → Zn²⁺ + SO₄²⁻ + Cu\nCancelling out SO₄²⁻ ions on both sides:\nZn + Cu²⁺ → Zn²⁺ + Cu"
      },
      {
        id: "s8-bal-ionic",
        title: "Balancing of Ionic Equations",
        detail: "In such equations, we have to balance both atoms as well as charge on both sides.\ne.g., Cu + 2Ag⁺ → Cu²⁺ + 2Ag\n       2Al + 6H⁺ → 2Al³⁺ + 3H₂\nGenerally, first we balance charge and then atoms (mass) on both sides."
      }
    ]
  }
];

/* ─────────────────── TreeNode ─────────────────── */

function TreeNode({ node, depth=0, accent, isLast=false }) {
  const { mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const open =
    mode === "expand" ? true : mode === "collapse" ? false : localOpen;

  const ds = (DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length-1)])(accent);

  const arrowStyle = {
    fontSize:10, minWidth:14, textAlign:"center", flexShrink:0,
    color: depth===0 ? "rgba(255,255,255,.8)" : accent,
    display:"inline-block",
    transform: hasKids && open ? "rotate(90deg)" : "rotate(0deg)",
    transition:"transform .2s",
    marginTop: depth===0 ? 3 : 2,
    opacity: hasKids ? 1 : 0,
  };

  return (
    <div style={{ position:"relative", marginBottom: depth===0?22:depth===1?8:5 }}>
      {depth > 0 && <>
        <div style={{ position:"absolute", left:-21, top:0,
          height: isLast ? "calc(50% + 1px)" : "100%",
          width:2, background:`${accent}44` }} />
        <div style={{ position:"absolute", left:-21, top:"50%",
          width:17, height:2, marginTop:-1, background:`${accent}44` }} />
      </>}

      <div
        className="fc-node"
        onClick={() => hasKids && setLocalOpen((o) => !o)}
        style={{
          display:"flex", alignItems:"flex-start", gap:8,
          background:ds.bg, color:ds.fg,
          fontWeight:ds.fw, fontSize:ds.fs, fontFamily:ds.ff,
          borderRadius:ds.radius, padding:ds.px,
          border:ds.border ?? "none",
          boxShadow:ds.shadow ?? "none",
          cursor:hasKids ? "pointer" : "default",
          userSelect:"none",
        }}
      >
        <span style={arrowStyle}>▶</span>
        <div style={{ flex:1 }}>
          <div style={{ lineHeight:1.35 }}>{node.title}</div>
          {node.subtitle && (
            <div style={{ fontSize:"0.8em", fontStyle:"italic",
              opacity:.72, fontWeight:400, marginTop:2 }}>{node.subtitle}</div>
          )}
          {node.detail && (
            <div style={{ fontSize:"0.92em", fontWeight:400, fontStyle:"normal",
              color: depth===0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
              marginTop:6, lineHeight:1.65, whiteSpace:"pre-line",
              fontFamily:"'EB Garamond',Georgia,serif", letterSpacing:"0.01em" }}>
              {node.detail}
            </div>
          )}
        </div>
      </div>

      {hasKids && open && (
        <div className="fc-kids" style={{ marginLeft:28, marginTop:6 }}>
          {node.children.map((child, i) => (
            <TreeNode key={child.id} node={child} depth={depth+1}
              accent={accent} isLast={i===node.children.length-1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────── Main Export ─────────────────── */

export default function ChemicalReactionsFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version:0, mode:"default" });

  const expandAll   = () => setCtxVal(v => ({ version:v.version+1, mode:"expand" }));
  const collapseAll = () => setCtxVal(v => ({ version:v.version+1, mode:"collapse" }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });

  const body = { fontFamily:"'EB Garamond',Georgia,serif", fontSize:15, lineHeight:1.58, color:"#1a1a1a" };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background:"#eae5e9", minHeight:"100vh", ...body }}>

        {/* HEADER */}
        <div style={{ background:"linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding:"32px 40px 26px", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.18)",
            border:"1px solid rgba(255,255,255,0.4)",
            fontFamily:"'Merriweather Sans',Arial,sans-serif",
            fontWeight:800, fontSize:10, letterSpacing:3,
            color:"#fff", padding:"4px 16px", borderRadius:3, marginBottom:14,
            textTransform:"uppercase" }}>
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:22,
            fontWeight:900, color:"#fff", margin:"0 0 8px",
            letterSpacing:1.5, textTransform:"uppercase", lineHeight:1.25 }}>
            Chemical Reactions and Equations
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Chemistry 10th
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{ background:"#fff", borderBottom:"1px solid #e8e8e8",
          padding:"10px 24px", display:"flex", flexWrap:"wrap",
          gap:7, justifyContent:"center", alignItems:"center" }}>
          {DATA.map(s => (
            <button key={s.id} className="fc-pill"
              onClick={() => scrollTo(s.id)}
              style={{ display:"inline-flex", alignItems:"center", gap:5,
                background:`${s.accent}15`, color:s.accent,
                border:`1.5px solid ${s.accent}55`, borderRadius:30,
                padding:"4px 13px", fontFamily:"'Merriweather Sans',Arial,sans-serif",
                fontWeight:700, fontSize:11.5, letterSpacing:.3, cursor:"pointer",
                whiteSpace:"nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background=`${s.accent}28`}
              onMouseLeave={e => e.currentTarget.style.background=`${s.accent}15`}>
              <span>{s.title.split(" ").slice(0,3).join(" ")}</span>
            </button>
          ))}
          <div style={{ marginLeft:"auto", display:"flex", gap:7 }}>
            <button className="fc-btn" onClick={expandAll}
              style={{ background:PINK, color:"#fff", border:"none", cursor:"pointer",
                borderRadius:6, padding:"5px 13px", fontSize:12,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700 }}>
              Expand All
            </button>
            <button className="fc-btn" onClick={collapseAll}
              style={{ background:"#fff", color:PINK, border:`1.5px solid ${PINK}`,
                cursor:"pointer", borderRadius:6, padding:"5px 13px", fontSize:12,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700 }}>
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth:880, margin:"0 auto", padding:"28px 24px 56px" }}>
          {DATA.map(section => (
            <div key={section.id} id={section.id} style={{ marginBottom:6 }}>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
