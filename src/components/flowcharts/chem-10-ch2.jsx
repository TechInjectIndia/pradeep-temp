"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ───────────── DATA ───────────── */
const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Acids",
    detail: "Substances that dissociate in aqueous solution to produce H⁺ ions.",
    children: [
      {
        id: "s1-types",
        title: "Types of Acids",
        children: [
          {
            id: "s1-types-org",
            title: "Organic Acids",
            detail: "Acids obtained from animals and plants.\nExamples: acetic acid, citric acid, lactic acid, oxalic acid etc."
          },
          {
            id: "s1-types-inorg",
            title: "Inorganic (Mineral) Acids",
            detail: "Acids obtained from minerals.\ne.g. HCl, HNO₃, H₂SO₄ etc."
          }
        ]
      },
      {
        id: "s1-natural",
        title: "Some Naturally Occurring Acids",
        detail: "• Oranges / Lemons → Citric acid\n• Apples → Malic acid\n• Tomatoes → Oxalic acid\n• Vinegar → Acetic acid"
      },
      {
        id: "s1-strength",
        title: "Strong & Weak Acids",
        children: [
          {
            id: "s1-strong",
            title: "Strong Acids",
            detail: "Acids which dissociate completely in aqueous solution to give H⁺ ions.\ne.g. H₂SO₄, HCl and HNO₃"
          },
          {
            id: "s1-weak",
            title: "Weak Acids",
            detail: "Those which do not dissociate completely.\ne.g. acetic acid (CH₃COOH), carbonic acid (H₂CO₃) etc."
          }
        ]
      },
      {
        id: "s1-uses",
        title: "Uses of Mineral Acids in Industry",
        detail: "• H₂SO₄ — called king of chemicals; used in fertilizer, petroleum, paints, dye, drug industries.\n• HNO₃ — in fertilizer, making explosives (TNT), plastic industry etc.\n• HCl — cleaning surface of metals (electroplating), textile, food, leather industry etc."
      },
      {
        id: "s1-water",
        title: "Role of Water in Dissociation",
        detail: "Acids dissociate to give H⁺ ions only in presence of water.\ne.g. dry HCl gas is not acidic.\nHCl(g) + water → H⁺(aq) + Cl⁻(aq) is acidic.\nSimilarly, HCl gas is not acidic in benzene/toluene etc."
      },
      {
        id: "s1-dilution",
        title: "Dilution of Concentrated Acids",
        detail: "It is exothermic — the beaker becomes hot.\nHow to dilute: Acid is added slowly to water taken in a beaker, as otherwise the heat evolved may break the beaker."
      }
    ]
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Bases",
    detail: "Substances that dissociate in aqueous solution to produce OH⁻ ions.",
    children: [
      {
        id: "s2-class",
        title: "Classification of Bases",
        children: [
          {
            id: "s2-strong",
            title: "Strong Bases",
            detail: "Bases which dissociate completely in aqueous solution to give OH⁻ ions.\ne.g. NaOH, KOH etc."
          },
          {
            id: "s2-weak",
            title: "Weak Bases",
            detail: "Those which do not dissociate completely.\ne.g. NH₄OH, Ca(OH)₂ etc."
          }
        ]
      },
      {
        id: "s2-nature",
        title: "Nature of Bases",
        detail: "Bases are oxides and hydroxides of metals (exception NH₄OH).\ne.g. CaO, MgO, CuO, NaOH, KOH, Ca(OH)₂ etc."
      },
      {
        id: "s2-alkali",
        title: "Alkalis",
        detail: "Bases which are soluble in water and give OH⁻ ions in solution are called alkalis.\nAll alkalis are bases, but not all bases are alkalis."
      }
    ]
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Neutralisation",
    detail: "A reaction between an acid and a base to form salt and water.\nIt is an exothermic reaction.",
    children: [
      {
        id: "s3-reaction",
        title: "General Reaction",
        detail: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)"
      },
      {
        id: "s3-ionic",
        title: "Ionic Form",
        detail: "Na⁺ + OH⁻ + H⁺ + Cl⁻ → Na⁺ + Cl⁻ + H₂O\nNet ionic equation: OH⁻ + H⁺ → H₂O\nThus, it is a reaction between H⁺ ions (from acid) and OH⁻ ions (from base)."
      }
    ]
  },
  {
    id: "s4",
    accent: "#6a1b9a",
    title: "pH & pH Scale",
    detail: "A method of expressing the strength of acidic/basic nature of a solution.",
    children: [
      {
        id: "s4-formula",
        title: "pH Formula",
        detail: "If [H⁺] = 10⁻ˣ, then pH = x\ni.e. pH = −log[H⁺]\nGreater the [H⁺], less is the value of x → stronger the acid, lower the pH."
      },
      {
        id: "s4-kw",
        title: "Ionic Product of Water (Kw)",
        detail: "[H⁺] × [OH⁻] = Kw (called ionic product of water)\nKw = 10⁻¹⁴ at 25°C\nKnowing [H⁺], [OH⁻] can be calculated."
      },
      {
        id: "s4-scale",
        title: "pH Scale Range",
        detail: "pH can vary from 0 to 14.\n• pH < 7 → Acidic solution\n• pH = 7 → Neutral solution\n• pH > 7 → Basic solution"
      }
    ]
  },
  {
    id: "s5",
    accent: "#c77000",
    title: "Salts — pH of Salt Solutions",
    detail: "When a salt reacts with water to form acid and base (reverse of neutralisation), it is called salt hydrolysis.",
    children: [
      {
        id: "s5-neutral",
        title: "Neutral Salt (pH = 7)",
        detail: "If acid and base produced are equally strong, solution is neutral.\ne.g. NaCl + H₂O → NaOH + HCl"
      },
      {
        id: "s5-acidic",
        title: "Acidic Salt (pH < 7)",
        detail: "If acid produced is stronger than base, solution is acidic.\ne.g. CuSO₄ + 2H₂O → Cu(OH)₂ + H₂SO₄"
      },
      {
        id: "s5-basic",
        title: "Basic Salt (pH > 7)",
        detail: "If base produced is stronger than acid, solution is basic.\ne.g. Na₂CO₃ + 2H₂O → 2NaOH + H₂CO₃"
      },
      {
        id: "s5-weakweak",
        title: "Almost Neutral (pH ≈ 7)",
        detail: "If both acid and base produced are equally weak, solution is almost neutral.\ne.g. CH₃COONH₄ + H₂O → CH₃COOH + NH₄OH"
      }
    ]
  },
  {
    id: "s6",
    accent: "#00695c",
    title: "Some Commonly Used Compounds",
    children: [
      {
        id: "s6-nacl",
        title: "1. Common Salt — NaCl",
        detail: "Table salt is iodized salt used to prevent thyroid disorders.\nSource: Sea water, salt rocks, inland lakes.\nProperties: Hygroscopic in nature. With H₂SO₄ on heating → gives HCl fumes.\nNaCl + Conc. H₂SO₄ → NaHSO₄ + HCl↑\nWith AgNO₃ → white ppt of AgCl.\nUses: In diet, packed meat, fish, making freezing mixture with ice, manufacture of soap."
      },
      {
        id: "s6-naoh",
        title: "2. Caustic Soda — NaOH",
        detail: "Manufacture: By electrolysis of aqueous NaCl solution (called brine). Method is called chloro-alkali process. Apparatus: Castner and Kellner cell.\n2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + Cl₂(g) + H₂(g)\nUses: Manufacture of soaps and detergents, paper industry, dye industry etc."
      },
      {
        id: "s6-caocl2",
        title: "3. Bleaching Powder — CaOCl₂",
        detail: "Manufacture: By passing Cl₂ through slaked lime.\nCa(OH)₂ + Cl₂ → CaOCl₂ + H₂O\nProperties: Exposed to air, reacts with CO₂ to give Cl₂ (typical smell).\nCaOCl₂ + CO₂ → CaCO₃ + Cl₂\nReacts with dil. HCl and dil. H₂SO₄ giving out Cl₂.\nCl₂ thus liberated is called available Cl₂.\nUses: In textile and paper industry."
      },
      {
        id: "s6-nahco3",
        title: "4. Baking Soda — NaHCO₃",
        detail: "Manufacture: By saturating brine solution with NH₃ and then passing CO₂ through it.\nNaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃\nProperties: On heating, it decomposes:\n2NaHCO₃ → Na₂CO₃ + H₂O + CO₂\nReacts with HCl, H₂SO₄ etc. to give CO₂.\nUses: As antacid, in food and drinks, in fire-extinguishers. In making baking powder (mixed with tartaric acid) used in bakery."
      },
      {
        id: "s6-na2co3",
        title: "5. Washing Soda — Na₂CO₃·10H₂O",
        detail: "Manufacture: By thermal decomposition of NaHCO₃ followed by recrystallisation.\n2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g) + H₂O(g)\nNa₂CO₃(s) + 10H₂O(l) → Na₂CO₃·10H₂O(s)\nProperties: On exposure to air → Na₂CO₃·H₂O(s) + 9H₂O(g) (sodium carbonate monohydrate).\nNa₂CO₃ + 2H₂O → 2NaOH + H₂CO₃\nNa₂CO₃·10H₂O → (Heat) → Na₂CO₃ + 10H₂O\nNa₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂\nUses: In laundry, for cleaning clothes."
      },
      {
        id: "s6-caso4",
        title: "6. Plaster of Paris — CaSO₄·½H₂O",
        detail: "Preparation: CaSO₄·2H₂O → (100°C) → CaSO₄·½H₂O + 1½H₂O\n(Gypsum)\nProperties: Mixing with H₂O and leaving for half an hour, it sets to a hard mass.\nCaSO₄·½H₂O + 1½H₂O → CaSO₄·2H₂O (Gypsum hard mass)\nUses: Setting of fractured bones, making toys, decorative designs on ceilings, chalk for writing on blackboard etc."
      }
    ]
  }
];

/* ───────────── Font + animation setup ───────────── */
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

/* ───────────── Depth styles ───────────── */
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

/* ───────────── TreeNode ───────────── */
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

/* ───────────── Main Component ───────────── */
export default function AcidsBasesAndSaltsFlowchart() {
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
            Acids, Bases and Salts
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Chemistry — Class 10
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
