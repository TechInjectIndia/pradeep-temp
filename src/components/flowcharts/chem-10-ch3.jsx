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

const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Metals — Definition & Importance",
    detail: "Metals are elements having lustre when freshly cut, are malleable and ductile, and good conductors of heat and electricity. They lose electrons to form positive ions.\ne.g., Na → Na⁺ + e⁻; Mg etc.\n\nImportance: Used in making utensils, construction of buildings and bridges, automobile parts, jewellery etc.",
    children: [
      {
        id: "s1-phys",
        title: "Physical Properties",
        detail: "They possess lustre. They are generally hard, malleable and ductile, good conductors of heat and electricity."
      },
      {
        id: "s1-chem",
        title: "Chemical Properties",
        detail: "1. With O₂: They combine to form metal oxides. Different metals react at different temperatures.\ne.g., 4Na + O₂ → 2Na₂O (Room temp.)\n2Mg + O₂ → 2MgO (Room temp.)\n4Al + 3O₂ → 2Al₂O₃ (Slow, at room temp.)\n3Fe + 2O₂ → Fe₃O₄ (High temp.)\nAg, Au, Pt + O₂ → No reaction\n\nMost metal oxides are basic and hence react with acids. e.g., Na₂O, K₂O, MgO, CuO etc.\nSome are amphoteric, i.e., react both with acids as well as bases, e.g., Al₂O₃ and ZnO.\n\n2. With H₂O: They react to form oxides or hydroxides with evolution of H₂. Different metals react at different temperatures.\n3. With dilute acids: More reactive metals react to form salt and H₂ gas. Less reactive metals like Cu, Ag and Hg do not react to produce H₂ gas.\n4. With Cl₂: They react to form chlorides. More reactive metals react at room temperature. Less reactive metals react on heating.\n5. With H₂: They form hydrides, e.g., NaH.\n6. Reducing nature: As they lose electrons, they act as reducing agents."
      }
    ]
  },
  {
    id: "s2",
    accent: "#6a1b9a",
    title: "Non-Metals — Definition & Importance",
    detail: "Non-metals are elements which have no lustre, are not malleable and ductile, are not good conductors of heat and electricity.\nThey are elements which gain electrons to form negative ions (e.g., Cl + e⁻ → Cl⁻).\nSome elements show properties of both metals and non-metals — these are called metalloids, e.g., Si, Ge, As, Sb and Te.\n\nImportance:\n1. Carbon in the form of its compounds like carbohydrates, protein etc.\n2. Hydrogen is also present in most of the organic compounds.\n3. Oxygen in the existence of life etc.",
    children: [
      {
        id: "s2-phys",
        title: "Physical Properties",
        detail: "No lustre, soft and brittle, not malleable and ductile, bad conductor of heat and electricity etc."
      },
      {
        id: "s2-chem",
        title: "Chemical Properties",
        detail: "1. With O₂: They form oxides which may be acidic or neutral.\ne.g., CO₂, SO₂, P₂O₅ etc. are acidic while CO, H₂O, NO are neutral.\n\n2. With H₂O: Only highly reactive non-metals react to form O₂ or ozone (O₃).\n2F₂ + 2H₂O → 4HF + O₂\n3F₂ + 3H₂O → 6HF + O₃\n\n3. With acids: No reaction.\n4. With Cl₂: They form chlorides, e.g., HCl, PCl₃ etc.\n5. With H₂: They form hydrides, e.g., H₂S, NH₃.\n6. With salts: More reactive non-metal displaces less reactive non-metal from its salt solution.\ne.g., Cl₂ + 2NaBr → 2NaCl + Br₂\n\n7. Oxidizing nature: As they gain electrons, they act as oxidizing agents."
      }
    ]
  },
  {
    id: "s3",
    accent: "#1565c0",
    title: "Combination Between Metals & Non-Metals",
    subtitle: "Formation of Ionic Compounds",
    children: [
      {
        id: "s3-why",
        title: "Why Do Metals & Non-Metals React?",
        detail: "In case of noble gases, helium has 2 electrons in the outermost shell while all others have 8 electrons in the outermost shell. Thus, cause of their stability is duplet in case of helium and octet in case of all other noble gases.\nAll other elements have less than 8 electrons in the outermost shell. To attain stability, they tend to complete their octet (or duplet) by loss or gain or by sharing of electrons. This is the cause of their chemical combination."
      },
      {
        id: "s3-how",
        title: "How Do Atoms Combine?",
        children: [
          {
            id: "s3-how-ionic",
            title: "(i) By Transference of Electrons — Ionic Bond",
            detail: "Transfer of electrons from metal atom to non-metal atom forming ionic bond.\ne.g., Na (2,8,1) + Cl (2,8,7) → Na⁺Cl⁻ or NaCl\nMg (2,8,2) + O (2,6) → (Mg)²⁺(O)²⁻ or Mg²⁺O²⁻"
          },
          {
            id: "s3-how-cov",
            title: "(ii) By Mutual Sharing of Electrons — Covalent Bond",
            detail: "Mutual sharing of electrons between two non-metal atoms.\ne.g., Cl₂: :Cl· + ·Cl: → :Cl–Cl: or Cl–Cl"
          }
        ]
      }
    ]
  },
  {
    id: "s4",
    accent: "#2e7d32",
    title: "Occurrence of Metals",
    children: [
      {
        id: "s4-activity",
        title: "Activity Series of Metals",
        detail: "More active metal displaces a less active metal from its salt solution. Thus, metals have been arranged according to their reactivity as:\nK > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H > Cu > Hg > Ag > Au > Pt\nThis is called activity series of metals. Metals more reactive than H react with acids to displace H and produce H₂ gas."
      },
      {
        id: "s4-minerals",
        title: "Minerals and Ores",
        detail: "The elementary state or compounds in the form of which metals occur in nature are called minerals. The earthy, sandy and rocky impurities associated with the mineral from which the metal can be extracted conveniently and economically is called gangue or matrix.\nThe mineral from which the metal can be extracted conveniently and economically is called an ore.\nThus, all ores are minerals but all minerals are not ores."
      },
      {
        id: "s4-common",
        title: "Ores of Some Common Metals",
        detail: "Na – Rock salt (NaCl)\nAl – Bauxite (Al₂O₃·2H₂O)\nCu – Copper glance (Cu₂S), Copper pyrites (CuFeS₂)\nFe – Iron pyrites (FeS₂), Haematite (Fe₂O₃)\nHg – Cinnabar (HgS)\nZn – Zinc blende (ZnS)\nPb – Galena (PbS)"
      }
    ]
  },
  {
    id: "s5",
    accent: "#c77000",
    title: "Extraction of Metals (Metallurgy)",
    detail: "The various steps involved in the extraction of the metal from its ores followed by refining of the metal is called metallurgy.",
    children: [
      {
        id: "s5-conc",
        title: "1. Concentration of the Ore",
        detail: "Method depends on the nature of the ore and the nature of impurities.\n(i) Gravity separation / Hydraulic washing – used for oxide ores of heavy metals (Pb, Sn, Fe etc.)\n(ii) Froth flotation process – used for sulphide ores of Cu, Zn and Pb.\n(iii) Electromagnetic separation – used when ore is magnetic and impurities are non-magnetic or vice-versa.\n(iv) Chemical separation – used when reactivity of the ore and the gangue is different towards a particular reagent, e.g., for bauxite (ore of Al)."
      },
      {
        id: "s5-extract",
        title: "2. Extraction of Metal from Concentrated Ore",
        children: [
          {
            id: "s5-extract-roast",
            title: "(i) Roasting and Calcination",
            detail: "For metals low in activity series (Cu, Hg): by roasting, i.e., heating strongly in presence of excess air.\n2Cu₂S + 3O₂ → 2Cu₂O + 2SO₂\n2Cu₂O + Cu₂S → 6Cu + SO₂\nor: 2HgS + 3O₂ → 2HgO + 2SO₂\n2HgO → 2Hg + O₂"
          },
          {
            id: "s5-extract-mid",
            title: "(ii) For Metals in Middle of Activity Series (Fe, Zn, Pb)",
            detail: "For carbonate ore, calcination is done, i.e., heated strongly in the absence of air to get oxide.\ne.g., ZnCO₃ → ZnO + CO₂\nFor sulphide ore, roasting is done to get oxide.\ne.g., 2ZnS + 3O₂ → 2ZnO + 2SO₂\n\nMetal oxide is then reduced to metal by heating with carbon.\nFe₂O₃ or ZnO and with Al in case of MnO₂ or Cr₂O₃ or Fe₂O₃:\nFe₂O₃ + 3C → 2Fe + 3CO\nZnO + C → Zn + CO\n3MnO₂ + 4Al → 3Mn + 2Al₂O₃\nCr₂O₃ + 2Al → 2Cr + Al₂O₃\nFe₂O₃ + 2Al → 2Fe + Al₂O₃ + Heat\nThe last reaction is called thermite reaction or alumino thermy."
          },
          {
            id: "s5-extract-high",
            title: "(iii) For Metals High in Activity Series (Na, K, Ca, Mg, Al)",
            detail: "By electrolysis of their molten salts (chlorides or oxides).\ne.g., 2NaCl (Molten) → 2Na + Cl₂\n2Al₂O₃ (Molten) → 4Al + 3O₂"
          }
        ]
      },
      {
        id: "s5-refine",
        title: "3. Refining of Impure Metal",
        detail: "Purifying the impure metal, i.e., obtained above by electrolytic refining, e.g., in case of Cu."
      }
    ]
  },
  {
    id: "s6",
    accent: "#00695c",
    title: "Ionic Compounds — Properties & Characteristics",
    detail: "1. Most of them are crystalline solids.\n2. They are soluble in water but insoluble in organic solvents.\n3. They have high melting and boiling points.\n4. They impart characteristic colour to the flame.\n5. They conduct electricity in molten state or aqueous solution but not in the solid state.\n6. The reaction between ionic compounds is the reaction between their ions.\ne.g., Ag⁺NO₃⁻(aq) + Na⁺Cl⁻(aq) → AgCl(s) + Na⁺NO₃⁻(aq)"
  },
  {
    id: "s7",
    accent: "#b71c1c",
    title: "Corrosion of Metals",
    detail: "The attack of moisture and atmospheric gases on the surface of metals forming oxides, carbonates, sulphides etc. is called corrosion. In case of iron, it is called rusting.",
    children: [
      {
        id: "s7-rust",
        title: "Rusting of Iron",
        detail: "2Fe + 3/2 O₂ + xH₂O → Fe₂O₃·xH₂O (Rust)\n\n2Cu + CO₂ + O₂ + H₂O → CuCO₃·Cu(OH)₂ (Basic copper carbonate)\n\n2Ag + H₂S → Ag₂S + H₂ (Silver sulphide)"
      },
      {
        id: "s7-cond",
        title: "Conditions Necessary for Rusting of Iron",
        detail: "(i) Presence of air (O₂)\n(ii) Presence of H₂O vapour (moisture)"
      },
      {
        id: "s7-prevent",
        title: "Prevention of Rusting",
        detail: "(i) By painting\n(ii) By greasing\n(iii) By galvanisation (coating a layer of zinc on iron)\n(iv) By coating with tin, Cr or Ni\n(v) By alloying with Ni or Cr"
      }
    ]
  },
  {
    id: "s8",
    accent: "#4a148c",
    title: "Alloys",
    subtitle: "Definition, Objectives & Examples",
    detail: "An alloy is a homogeneous mixture of two or more metals or a metal and a non-metal.",
    children: [
      {
        id: "s8-obj",
        title: "Objective of Making Alloys",
        detail: "To increase hardness, tensile strength, resistance to corrosion, to lower melting point etc."
      },
      {
        id: "s8-gold",
        title: "Alloying of Gold",
        detail: "Pure gold is 24 carat. It is very soft, not suitable for making jewellery. It is alloyed with Cu or Ag. Generally, 22 carat gold is used which is (22/24) × 100 = 91.67% gold."
      },
      {
        id: "s8-common",
        title: "Some Common Alloys",
        detail: "Brass (Cu 80%, Zn 20%)\nBronze (Cu 90%, Sn 10%)\nSteel (Fe 99.95%, C 0.05%)\nStainless steel (Fe 74%, Cr 18%, Ni 8%)"
      }
    ]
  }
];

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

export default function MetalsNonMetalsFlowchart() {
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
            Metals and Non-Metals
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
