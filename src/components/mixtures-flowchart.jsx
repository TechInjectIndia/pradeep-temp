"use client";
import { useState, useEffect, useRef, createContext, useContext } from "react";

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const PINK = "#c0126a";

// Context for global expand/collapse
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

// ── CHART DATA ───────────────────────────────────────────────────────────────
const DATA = [
  {
    id:"s1", icon:"⚗️", page:"1/58", accent:"#c0126a",
    title:"Classification of Matter",
    children:[
      { id:"s1-pure", title:"Pure Substances", detail:"Contain one kind of particles",
        children:[
          { id:"s1-el", title:"Elements",
            detail:"Basic form of matter — can neither be broken into nor made up of simpler substances. Examples: carbon, sulphur, sodium, iron, silver, etc." },
          { id:"s1-comp", title:"Compounds",
            detail:"Made up of two or more elements. Have fixed composition. Can be broken into elements by chemical or electrochemical methods. Examples: water, sugar, salt, etc." }
        ]
      },
      { id:"s1-mix", title:"Mixtures", detail:"Obtained by mixing more than one kind of pure substances. Have no fixed composition.",
        children:[
          { id:"s1-homo", title:"Homogeneous",
            detail:"Uniform composition, no boundary of separation between components. Examples: salt in water, sugar in water, sulphur in carbon disulphide, tincture-iodine, etc." },
          { id:"s1-het", title:"Heterogeneous",
            detail:"Non-uniform composition, have visible boundary of separation. Examples: sand and sulphur, sand and iron filings, sugar and sand, oil and sand, wood, blood, etc." }
        ]
      }
    ]
  },
  {
    id:"s2", icon:"💧", page:"1/58–1/59", accent:"#1565c0",
    title:"Solutions",
    subtitle:"Homogeneous mixtures",
    children:[
      { id:"s2-sol", title:"SOLID SOLUTIONS", detail:"Here, solid is the solvent",
        children:[
          { id:"s2-s1", title:"Solid in Solid", detail:"Solute is solid. Examples: alloys — steel, brass, bronze, 22 carat gold (22 parts pure gold + 2 parts copper/silver)" },
          { id:"s2-s2", title:"Liquid in Solid", detail:"Solute is liquid. Examples: hydrated salts — copper sulphate, magnesium sulphate, iron sulphate" },
          { id:"s2-s3", title:"Gas in Solid", detail:"Solute is gas. Examples: gases adsorbed on the surface of metals like Ni, Pt or Pd" }
        ]
      },
      { id:"s2-liq", title:"LIQUID SOLUTIONS", detail:"Here, liquid is the solvent",
        children:[
          { id:"s2-l1", title:"Solid in Liquid", detail:"Examples: sugar in water, salt in water (brine), tincture of iodine (I₂ dissolved in alcohol)" },
          { id:"s2-l2", title:"Liquid in Liquid", detail:"Examples: miscible liquids — alcohol-water, gasoline (mix of hydrocarbons, 5–7 carbon atoms), vinegar" },
          { id:"s2-l3", title:"Gas in Liquid", detail:"Solute is gas (CO₂). Examples: aerated drinks — coca-cola, pepsi, limica, etc." },
          { id:"s2-l4", title:"Aqueous Solutions", detail:"Water is the solvent. Solute may be solid, liquid or gas. Examples: common salt or sugar in water, vinegar, coca-cola" },
          { id:"s2-l5", title:"Non-aqueous Solutions", detail:"Any liquid other than water is the solvent. Examples: tincture of iodine (I₂ in alcohol), sulphur in carbon disulphide (CS₂ is the solvent)" }
        ]
      },
      { id:"s2-gas", title:"GAS SOLUTIONS", detail:"Here, gas is the solvent",
        children:[
          { id:"s2-g1", title:"Solid in Gas", detail:"Solute is solid. Examples: camphor or I₂ in air (air is solvent)" },
          { id:"s2-g2", title:"Liquid in Gas", detail:"Solute is liquid. Examples: clouds, mist, fog — water droplets dispersed in air" },
          { id:"s2-g3", title:"Gas in Gas", detail:"Solute is gas. Example: air — O₂ (21%) is solute, N₂ (79%) is solvent" }
        ]
      },
      { id:"s2-sat", title:"Types by Saturation",
        children:[
          { id:"s2-sa1", title:"Saturated",
            detail:"Contains maximum amount of solute dissolved in given quantity of solvent at that temperature. Always in equilibrium between dissolved and undissolved solute. Becomes unsaturated on heating or on dilution." },
          { id:"s2-sa2", title:"Unsaturated", detail:"Can dissolve more solute at the given temperature." },
          { id:"s2-sa3", title:"Supersaturated",
            detail:"Temporarily contains more solute than the maximum saturation level at a particular temperature." }
        ]
      }
    ]
  },
  {
    id:"s3", icon:"📊", page:"1/60", accent:"#2e7d32",
    title:"Solubility",
    children:[
      { id:"s3-def", title:"Definition",
        detail:"Maximum amount of solute in grams which can be dissolved in 100 grams of solvent at a given temperature to form a saturated solution." },
      { id:"s3-conc", title:"Methods of Expressing Concentration",
        children:[
          { id:"s3-c1", title:"Mass by Mass % (w/w)", detail:"= (Mass of solute ÷ Mass of solution) × 100" },
          { id:"s3-c2", title:"Mass by Volume % (w/v)", detail:"= (Mass of solute ÷ Volume of solution) × 100" },
          { id:"s3-c3", title:"Parts Per Million (ppm)",
            detail:"For very dilute solutions.\nppm = (Mass of solute ÷ Mass of solution) × 10⁶\n  or = (Volume of solute ÷ Volume of solution) × 10⁶" },
          { id:"s3-c4", title:"Volume by Volume % (v/v)",
            detail:"= (Volume of solute in mL ÷ Volume of solution in mL) × 100" }
        ]
      },
      { id:"s3-eff", title:"Effect of Temperature & Pressure",
        children:[
          { id:"s3-e1", title:"Solids in Liquids",
            detail:"Solubility generally increases with temperature. However, solubility of cerium sulphate, calcium oxide, sodium carbonate monohydrate, lithium carbonate decreases with increasing temperature." },
          { id:"s3-e2", title:"Gases in Liquids",
            detail:"Solubility decreases with increasing temperature; increases with increasing pressure. Example: CO₂ is dissolved under pressure in cold drinks. When bottle is opened, pressure drops and CO₂ escapes as bubbles." }
        ]
      }
    ]
  },
  {
    id:"s4", icon:"🔭", page:"1/61", accent:"#c77000",
    title:"Classification of Mixtures",
    subtitle:"Based on particle size of solute and solvent",
    children:[
      { id:"s4-sol", title:"Solutions",
        detail:"Always homogeneous mixtures. Particle size < 1 nm for both solute and solvent. Solute may be solid, liquid or gas. Nine types of solutions." },
      { id:"s4-sus", title:"Suspensions",
        detail:"Always heterogeneous mixtures. Particle size > 100 nm. Do not dissolve — remain suspended throughout the bulk of the medium.",
        children:[
          { id:"s4-s1", title:"Examples",
            detail:"• Paints — coloured substances suspended in water or other solvent\n• Milk of magnesia — Mg(OH)₂ in water\n• Lime water — Ca(OH)₂ in water\n• Bleaching powder in water" }
        ]
      },
      { id:"s4-col", title:"Colloidal Solutions",
        detail:"Always heterogeneous. Dispersed phase and dispersion medium can each be solid, liquid or gas. Since gas-in-gas is always homogeneous → only 8 types of colloids. Particle size: 1–100 nm." }
    ]
  },
  {
    id:"s5", icon:"🧪", page:"1/62", accent:"#6a1b9a",
    title:"Properties of Colloidal Solutions",
    children:[
      { id:"s5-pr", title:"Properties",
        children:[
          { id:"s5-p1", title:"Particle Size", detail:"1–100 nm" },
          { id:"s5-p2", title:"Heterogeneous Nature", detail:"Two phases — dispersed phase and dispersion medium" },
          { id:"s5-p3", title:"Stability", detail:"Quite stable — do not settle down on standing" },
          { id:"s5-p4", title:"Visibility", detail:"Not seen by naked eye. Can only be seen under an ultramicroscope." },
          { id:"s5-p5", title:"Brownian Movement",
            detail:"Colloidal particles continuously move in a zig-zag path under ultramicroscope. Caused by uneven bombardment by dispersion medium particles." },
          { id:"s5-p6", title:"Tyndall Effect",
            detail:"Colloidal particles scatter light — the path of a beam of light becomes visible when passed through a colloidal solution (e.g. milk + water)." },
          { id:"s5-p7", title:"Charge",
            detail:"All colloidal particles carry same charge (positive or negative). Dispersion medium carries the opposite charge." },
          { id:"s5-p8", title:"Coagulation",
            detail:"Addition of electrolytes (NaCl, BaCl₂, FeCl₃) causes particles to lose charge, combine together and settle. Hardy-Schulze law: coagulation power increases with cation valency: Na⁺ < Ba²⁺ < Al³⁺" }
        ]
      },
      { id:"s5-ap", title:"Applications",
        children:[
          { id:"s5-a1", title:"Medicine",
            detail:"Colloidal medicines are more effective — smaller size allows easy absorption by body tissues." },
          { id:"s5-a2", title:"Cleaning Action of Soap",
            detail:"Soap is a colloidal solution in water — removes greasy or oily material from clothes and utensils." },
          { id:"s5-a3", title:"Sewage Disposal",
            detail:"Colloidal particles of dirt and mud in sewage carry charge — coagulated by applying electric field for purification." },
          { id:"s5-a4", title:"Smoke Precipitator",
            detail:"Colloidal carbon particles in smoke are coagulated by electric field — prevents air pollution from industrial chimneys." },
          { id:"s5-a5", title:"Production of Rubber",
            detail:"Latex = colloidal solution of negatively charged rubber particles in water. Rubber obtained by coagulation on adding acetic acid." }
        ]
      }
    ]
  },
  {
    id:"s6", icon:"⚙️", page:"1/63", accent:"#00695c",
    title:"Separation of Mixtures",
    children:[
      { id:"s6-1", title:"Evaporation",
        detail:"Coloured dye from blue/black ink separated by evaporation. Used commercially to obtain common salt from sea water (Kutch, Gujarat) or lake (Sambhar, Rajasthan)." },
      { id:"s6-2", title:"Sublimation",
        detail:"Purification of substances that sublime on heating, separating them from non-volatile impurities.",
        children:[
          { id:"s6-2x", title:"Examples",
            detail:"• Ammonium chloride from sodium chloride\n• Iodine or camphor from sodium chloride\n• Purification of naphthalene or camphor from volatile impurities" }
        ]
      },
      { id:"s6-3", title:"Filtration",
        detail:"Solid particles in a liquid separated by filtration. Example: CuSO₄ crystals from mother liquor separated by filtration." },
      { id:"s6-4", title:"Centrifugation",
        detail:"Substances differing in density or mass are separated by high-speed rotation.",
        children:[
          { id:"s6-4x", title:"Examples",
            detail:"• ²³⁵U and ²³⁸U isotopes separated by gas centrifuge\n• Blood components: RBCs, WBCs, nutrients, plasma separated in layers\n• Cream from milk in dairies and homes" }
        ]
      },
      { id:"s6-5", title:"Using a Separating Funnel",
        detail:"Two immiscible liquids separated based on density difference. Examples: kerosene oil–water, CCl₄–water, chloroform–water, ether–water." },
      { id:"s6-6", title:"Distillation",
        detail:"Two miscible liquids whose b.p. differ by > 30 K. Examples: hexane (342 K), toluene (384 K), aniline (457 K), nitrobenzene (487 K).",
        children:[
          { id:"s6-6a", title:"Fractional Distillation",
            detail:"Two miscible liquids whose b.p. differ by ≤ 30 K. Uses a fractionating column. Example: acetone (b.p. 329 K) and methanol (b.p. 338 K)." },
          { id:"s6-6b", title:"⚠️ Azeotropes — Limitation",
            detail:"Rectified spirit (95% ethanol + 5% water) cannot be separated by fractional distillation because it forms a constant boiling mixture (azeotrope) even though their b.p. differ by 22°C." }
        ]
      },
      { id:"s6-7", title:"Paper Chromatography",
        detail:"Substances with different solubility in a solvent are separated by differential movement on chromatographic paper.",
        children:[
          { id:"s6-7x", title:"Applications",
            detail:"• Separate blue and black components of blue-black ink\n• Identify amino acids from protein hydrolysate\n• Detect and identify drugs in athletes' blood (forensic science)\n• Monitor progress of a reaction" }
        ]
      }
    ]
  }
];

// ── TREE NODE ─────────────────────────────────────────────────────────────────
const DEPTH_STYLES = [
  // depth 0 — section header
  (a) => ({ bg: a, fg:"#fff", fw:800, fs:15, radius:10,
    px:"12px 18px", shadow:`0 4px 14px ${a}44`,
    ff:"'Merriweather Sans',Arial,sans-serif" }),
  // depth 1 — subsection
  (a) => ({ bg:"#fff", fg:a, fw:700, fs:13.5, radius:8,
    px:"8px 14px", border:`2px solid ${a}`, shadow:"0 1px 5px rgba(0,0,0,.08)",
    ff:"'Merriweather Sans',Arial,sans-serif" }),
  // depth 2 — item
  (a) => ({ bg:"#fdf3f8", fg:"#1a1a1a", fw:600, fs:13.5, radius:7,
    px:"7px 12px", border:`1.5px solid ${a}55`,
    ff:"'EB Garamond',Georgia,serif" }),
  // depth 3+ — leaf
  () => ({ bg:"#fff", fg:"#333", fw:400, fs:13, radius:5,
    px:"6px 11px", border:"1px solid #ddd",
    ff:"'EB Garamond',Georgia,serif" }),
];

function TreeNode({ node, depth=0, accent, isLast=false }) {
  const { version, mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [open, setOpen] = useState(depth === 0);
  const lastVer = useRef(-1);

  useEffect(() => {
    if (version !== lastVer.current && version > 0) {
      lastVer.current = version;
      if (mode === "expand") setOpen(true);
      else if (mode === "collapse") setOpen(false);
    }
  }, [version, mode]);

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
      {/* L-shaped connector lines */}
      {depth > 0 && <>
        <div style={{ position:"absolute", left:-21, top:0,
          height: isLast ? "calc(50% + 1px)" : "100%",
          width:2, background:`${accent}44` }} />
        <div style={{ position:"absolute", left:-21, top:"50%",
          width:17, height:2, marginTop:-1, background:`${accent}44` }} />
      </>}

      {/* Node box */}
      <div
        className="fc-node"
        onClick={() => hasKids && setOpen(o => !o)}
        style={{
          display:"flex", alignItems:"flex-start", gap:8,
          background:ds.bg, color:ds.fg,
          fontWeight:ds.fw, fontSize:ds.fs,
          fontFamily:ds.ff,
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
            <div style={{ fontSize:"0.87em", fontWeight:400, fontStyle:"italic",
              opacity:.82, marginTop:5, lineHeight:1.5, whiteSpace:"pre-line",
              fontFamily:"'EB Garamond',Georgia,serif" }}>
              {node.detail}
            </div>
          )}
        </div>
      </div>

      {/* Children */}
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

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default function MixturesFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version:0, mode:"default" });

  const expandAll  = () => setCtxVal(v => ({ version:v.version+1, mode:"expand" }));
  const collapseAll = () => setCtxVal(v => ({ version:v.version+1, mode:"collapse" }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });

  const body = { fontFamily:"'EB Garamond',Georgia,serif", fontSize:15, lineHeight:1.58, color:"#1a1a1a" };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background:"#eae5e9", minHeight:"100vh", ...body }}>

        {/* ── HEADER ── */}
        <div style={{ background:"linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding:"28px 40px 22px", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:"#fff", color:PINK,
            fontFamily:"'Merriweather Sans',Arial,sans-serif",
            fontWeight:900, fontSize:10.5, letterSpacing:2.5,
            padding:"3px 14px", borderRadius:3, marginBottom:10,
            textTransform:"uppercase" }}>
            Bird's-Eye View · Concept Flowchart · Pages 1/58–1/63
          </div>
          <h1 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:21,
            fontWeight:900, color:"#fff", margin:"0 0 5px",
            letterSpacing:1, textTransform:"uppercase" }}>
            Exploring Mixtures and Their Separation
          </h1>
          <div style={{ color:"rgba(255,255,255,.8)", fontSize:13.5 }}>
            Pradeep's Science : Chemistry 9<sup>th</sup>
          </div>
        </div>

        {/* ── NAV BAR ── */}
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
              <span style={{ fontSize:14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0,3).join(" ")}</span>
              <span style={{ fontSize:10, opacity:.6, fontWeight:400 }}>{s.page}</span>
            </button>
          ))}
          {/* Controls */}
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

        {/* ── FLOWCHART TREE ── */}
        <div style={{ maxWidth:880, margin:"0 auto", padding:"28px 24px 56px" }}>

          {/* Particle Size Legend */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center",
            marginBottom:28, padding:"12px 18px", background:"#fff",
            borderRadius:10, border:"1px solid #e0e0e0", fontSize:12.5 }}>
            <span style={{ fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif",
              fontSize:12, color:"#666", marginRight:4 }}>Particle Size:</span>
            {[
              { label:"True Solution", size:"< 1 nm", color:"#1565c0" },
              { label:"Colloid",       size:"1–100 nm", color:"#6a1b9a" },
              { label:"Suspension",    size:"> 100 nm", color:"#c77000" },
            ].map(p => (
              <div key={p.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:p.color }} />
                <span style={{ fontWeight:600, color:p.color }}>{p.label}</span>
                <span style={{ color:"#888" }}>{p.size}</span>
              </div>
            ))}
          </div>

          {/* Sections */}
          {DATA.map(section => (
            <div key={section.id} id={section.id} style={{ marginBottom:6 }}>
              {/* Section page label */}
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",
                  fontSize:10.5, fontWeight:700, letterSpacing:1.5,
                  color:section.accent, textTransform:"uppercase", opacity:.7 }}>
                  Page {section.page}
                </span>
                <div style={{ flex:1, height:1, background:`${section.accent}25` }} />
              </div>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div style={{ textAlign:"center", padding:"14px 20px",
          borderTop:"1px solid #ddd", background:"#fff",
          fontFamily:"'Merriweather Sans',Arial,sans-serif",
          fontSize:11.5, color:"#aaa", letterSpacing:.5 }}>
          PRADEEP'S PUBLICATIONS · SCIENCE: CHEMISTRY 9TH · BIRD'S EYE VIEW FLOWCHART
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
