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

function TreeNode({ node, depth=0, accent, isLast=false }) {
  const { mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const open =
    mode === "expand" ? true : mode === "collapse" ? false : localOpen;

  const ds = (DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)])(accent);

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

// ─── DATA ────────────────────────────────────────────────────────────────────

const DATA = [
  {
    id: "s1", icon: "🧪", page: "1/58", accent: "#c0126a",
    title: "Classification of Matter",
    detail: "Everything around us is matter. Matter can be classified into Pure Substances and Mixtures.",
    children: [
      {
        id: "s1-pure", title: "Pure Substances",
        detail: "Contain one kind of particles.",
        children: [
          {
            id: "s1-pure-elem", title: "Elements",
            detail: "Basic form of matter; cannot be broken into nor made up of simpler substances.\n• Examples: carbon, sulphur, sodium, iron, silver, etc."
          },
          {
            id: "s1-pure-comp", title: "Compounds",
            detail: "Made up of two or more elements, have fixed composition, can be broken into elements by chemical or electrochemical methods.\n• Examples: water, sugar, salt, etc."
          }
        ]
      },
      {
        id: "s1-mix", title: "Mixtures",
        detail: "Obtained by mixing more than one kind of pure substances; have no fixed composition.",
        children: [
          {
            id: "s1-mix-homo", title: "Homogeneous Mixtures",
            detail: "Uniform composition; no visible boundary of separation.\n• Examples: salt in water, sugar in water, sulphur in carbon disulphide, tincture-iodine, etc."
          },
          {
            id: "s1-mix-hetero", title: "Heterogeneous Mixtures",
            detail: "Non-uniform composition; have visible boundary of separation.\n• Examples: sand and iron filings, sugar and sand, oil and water, oil and sand, wood, blood, etc."
          }
        ]
      }
    ]
  },

  {
    id: "s2", icon: "💧", page: "1/58–1/59", accent: "#1565c0",
    title: "Solutions — Types & Classification",
    detail: "Solutions are homogeneous mixtures — particle size of both solute and solvent is less than 1 nm. There are nine types of solutions.",
    children: [
      {
        id: "s2-solid", title: "Solid Solutions",
        subtitle: "Here, solid is the solvent",
        children: [
          {
            id: "s2-solid-sis", title: "Solid in Solid",
            detail: "Solute is solid, solvent is solid.\n• Examples: alloys — steel, brass, bronze; 22-carat gold."
          },
          {
            id: "s2-solid-lis", title: "Liquid in Solid",
            detail: "Solute is liquid, solvent is solid.\n• Examples: hydrated salts — copper sulphate, magnesium sulphate, iron sulphate."
          },
          {
            id: "s2-solid-gis", title: "Gas in Solid",
            detail: "Solute is gas; gas is adsorbed on the surface of solid metals.\n• Examples: gases adsorbed on Ni, Pt, or Pd."
          }
        ]
      },
      {
        id: "s2-liquid", title: "Liquid Solutions",
        subtitle: "Here, liquid is the solvent",
        children: [
          {
            id: "s2-liquid-sil", title: "Solid in Liquid",
            detail: "Solute is solid, solvent is liquid.\n• Examples: sugar in water, salt in water (brine), tincture of iodine (I₂ dissolved in alcohol)."
          },
          {
            id: "s2-liquid-lil", title: "Liquid in Liquid",
            detail: "Solute is liquid, solvent is liquid.\n• Examples: miscible liquids — alcohol–water, gasoline (5–7 carbon atoms), vinegar, etc."
          },
          {
            id: "s2-liquid-gil", title: "Gas in Liquid",
            detail: "Solute is gas, solvent is liquid.\n• Examples: CO₂ (gas) in aerated drinks — coca-cola, pepsi, limca, etc."
          },
          {
            id: "s2-liquid-types", title: "Aqueous vs Non-aqueous Solutions",
            children: [
              {
                id: "s2-liquid-aq", title: "Aqueous Solutions",
                detail: "Water is the solvent; solute may be solid, liquid, or gas.\n• Examples: common salt or sugar in water, vinegar, alcohol in water, coca cola, pepsi, limca, etc."
              },
              {
                id: "s2-liquid-nonaq", title: "Non-aqueous Solutions",
                detail: "Any liquid other than water is the solvent.\n• Examples: tincture of iodine (I₂ dissolved in alcohol), sulphur in carbon disulphide."
              }
            ]
          },
          {
            id: "s2-liquid-sat", title: "Saturated, Unsaturated & Supersaturated",
            children: [
              {
                id: "s2-sat", title: "Unsaturated",
                detail: "Can dissolve more solute at the given temperature."
              },
              {
                id: "s2-unsat", title: "Saturated",
                detail: "Contains maximum amount of solute dissolved in a given quantity of solvent at that temperature; cannot dissolve any more solute.\n• If more solute is added, equilibrium exists between dissolved and undissolved solute.\n• A saturated solution becomes unsaturated on heating or on dilution."
              },
              {
                id: "s2-supsat", title: "Supersaturated",
                detail: "Temporarily contains more solute than the saturation level (the maximum solute) at a particular temperature."
              }
            ]
          }
        ]
      },
      {
        id: "s2-gas", title: "Gas Solutions",
        subtitle: "Here, gas is the solvent",
        children: [
          {
            id: "s2-gas-sig", title: "Solid in Gas",
            detail: "Solute is solid, dispersed in gaseous medium.\n• Examples: camphor or I₂ is air."
          },
          {
            id: "s2-gas-lig", title: "Liquid in Gas",
            detail: "Solute is liquid; liquid droplets dispersed in gas.\n• Examples: mist, fog, clouds — water droplets dispersed in air."
          },
          {
            id: "s2-gas-gig", title: "Gas in Gas",
            detail: "Solute is gas, solvent is gas.\n• Example: air — O₂ (21%) is the solute, N₂ (79%) is the solvent."
          }
        ]
      }
    ]
  },

  {
    id: "s3", icon: "⚖️", page: "1/60", accent: "#2e7d32",
    title: "Solubility & Concentration",
    detail: "Solubility: maximum amount of solute in grams which can be dissolved in 100 grams of the solvent at a given temperature to form a saturated solution.",
    children: [
      {
        id: "s3-factors", title: "Factors Affecting Solubility",
        children: [
          {
            id: "s3-solid-sol", title: "Solubility of Solids in Liquids",
            detail: "Generally increases with temperature.\n• Exception: solubility of cerium sulphate, lithium carbonate, calcium oxide, sodium carbonate monohydrate decreases with temperature."
          },
          {
            id: "s3-gas-sol", title: "Solubility of Gases in Liquids",
            detail: "Decreases with increasing temperature and increases on increasing pressure.\n• CO₂ is dissolved under pressure in cold drinks. When bottle is opened, pressure decreases → solubility of CO₂ decreases → CO₂ escapes as bubbles."
          }
        ]
      },
      {
        id: "s3-conc", title: "Methods of Expressing Concentration",
        children: [
          {
            id: "s3-ww", title: "Mass by Mass Percentage (w/w)",
            detail: "= (Mass of solute ÷ Mass of solution) × 100"
          },
          {
            id: "s3-wv", title: "Mass by Volume Percentage (w/v)",
            detail: "= (Mass of solute ÷ Volume of solution) × 100"
          },
          {
            id: "s3-ppm-mass", title: "Parts Per Million — Mass (ppm)",
            detail: "For very dilute solutions.\nppm = (Mass of solute ÷ Mass of solution) × 10⁶"
          },
          {
            id: "s3-ppm-vol", title: "Parts Per Million — Volume (ppm)",
            detail: "ppm = (Volume of solute ÷ Volume of solution) × 10⁶"
          },
          {
            id: "s3-vv", title: "Volume by Volume Percentage (v/v)",
            detail: "Concentration of liquid in liquid solutions.\n= (Volume of solute in mL ÷ Volume of solution in mL) × 100"
          }
        ]
      }
    ]
  },

  {
    id: "s4", icon: "🔬", page: "1/61", accent: "#c77000",
    title: "Classification of Mixtures by Particle Size",
    detail: "On the basis of particle size of the solute and the solvent, mixtures are of three types.",
    children: [
      {
        id: "s4-sol", title: "Solutions (True Solutions)",
        detail: "Always homogeneous mixtures; solute and solvent may be solid, liquid, or gas.\n• Particle size: less than 1 nm.\n• Nine types of solutions exist.",
      },
      {
        id: "s4-susp", title: "Suspensions",
        detail: "Always heterogeneous mixtures; particles do not dissolve (> 100 nm) but remain suspended throughout the bulk of the medium.",
        children: [
          {
            id: "s4-susp-ex", title: "Examples of Suspensions",
            detail: "• Paints — coloured substances in water or other solvents.\n• Milk of magnesia — suspension of magnesium hydroxide in water.\n• Lime water — suspension of calcium hydroxide in water.\n• Bleaching powder — suspension of bleaching powder in water."
          }
        ]
      },
      {
        id: "s4-coll", title: "Colloidal Solutions",
        detail: "Always heterogeneous; solute called the dispersed phase, solvent called the dispersion medium.\n• Particle size: 1–100 nm.\n• Solution is always homogeneous in appearance.\n• Only eight types of colloidal solutions exist (gas in gas is not possible).",
      }
    ]
  },

  {
    id: "s5", icon: "🌫️", page: "1/62", accent: "#6a1b9a",
    title: "Properties & Applications of Colloidal Solutions",
    children: [
      {
        id: "s5-props", title: "Properties of Colloidal Solutions",
        children: [
          {
            id: "s5-size", title: "Particle Size",
            detail: "1–100 nm."
          },
          {
            id: "s5-hetero", title: "Heterogeneous Nature",
            detail: "Two phases: dispersed phase and dispersion medium."
          },
          {
            id: "s5-stable", title: "Stability",
            detail: "Quite stable; do not settle down on standing."
          },
          {
            id: "s5-vis", title: "Visibility",
            detail: "Not seen by naked eye. Visible only under an ultramicroscope."
          },
          {
            id: "s5-brown", title: "Brownian Movement",
            detail: "Colloidal particles move continuously in a zig-zag path — seen under an ultramicroscope. This is called Brownian movement."
          },
          {
            id: "s5-tyndall", title: "Tyndall Effect",
            detail: "Colloidal particles scatter light; the zig-zag path of light beam becomes visible. This is called the Tyndall effect."
          },
          {
            id: "s5-charge", title: "Charge",
            detail: "All colloidal particles carry the same charge — either positive or negative. The dispersion medium carries the opposite charge."
          },
          {
            id: "s5-coag", title: "Coagulation",
            detail: "On addition of electrolyte (NaCl, BaCl₂, or FeCl₃), particles lose charge, combine to form big-sized particles which settle down.\n• Hardy-Schulze Law: coagulation power increases as the valency of the cation increases: Na⁺ < Ba²⁺ < Al³⁺"
          }
        ]
      },
      {
        id: "s5-apps", title: "Applications of Colloidal Solutions",
        children: [
          {
            id: "s5-med", title: "Medicine",
            detail: "Due to smaller size, colloidal medicines are more effective."
          },
          {
            id: "s5-soap", title: "Cleaning Action of Soap",
            detail: "Soap is a colloidal solution in water; used in removing greasy or oily material sticking to clothes or utensils."
          },
          {
            id: "s5-sewage", title: "Sewage Disposal",
            detail: "Sewage water contains colloidal particles of dirt, mud, etc. Since they carry charge, they can be coagulated by applying an electric field."
          },
          {
            id: "s5-smoke", title: "Smoke Precipitator",
            detail: "Smoke is a colloidal dispersion of carbon particles in air. Since particles carry charge, they can be coagulated by applying electric field — pollution from chimneys can be prevented."
          },
          {
            id: "s5-rubber", title: "Production of Rubber",
            detail: "Latex is a colloidal solution of negatively charged rubber particles in water. Rubber is obtained from latex by coagulation on adding acetic acid."
          }
        ]
      }
    ]
  },

  {
    id: "s6", icon: "🔧", page: "1/63", accent: "#00695c",
    title: "Separation of Mixtures",
    detail: "Different methods are used depending on the nature of the mixture and the physical/chemical properties of its components.",
    children: [
      {
        id: "s6-evap", title: "Evaporation",
        detail: "Used to separate a dissolved solid from a liquid.\n• Example: coloured component (dye) from blue or black ink is obtained by evaporation."
      },
      {
        id: "s6-subl", title: "Sublimation",
        detail: "Used to purify substances which sublime on heating from volatile impurities.\n• Examples:\n  – Separation of ammonium chloride from sodium chloride.\n  – Separation of iodine or camphor from sodium chloride.\n  – Purification of naphthalene or camphor from non-volatile impurities."
      },
      {
        id: "s6-filt", title: "Filtration",
        detail: "Separates solid particles in a liquid; particles in a liquid may be separated by filtration.\n• Example: crystals of CuSO₄ from mother liquor can be separated by filtration."
      },
      {
        id: "s6-cent", title: "Centrifugation",
        detail: "Substances which differ in density or mass can be separated by centrifugation.\n• Examples:\n  – Two isotopes of uranium: ²³⁵U and ²³⁸U separated by gas centrifuge.\n  – Blood components (blood cells, plasma, proteins, nutrients) separated by centrifugation.\n  – Cream from milk can be separated by centrifugation in dairies."
      },
      {
        id: "s6-funnel", title: "Using a Separating Funnel",
        detail: "Separates two immiscible liquids.\n• Examples: kerosene–water, carbon tetrachloride–water, chloroform–water, chloroform–water, form–water, etc.",
      },
      {
        id: "s6-dist", title: "Distillation",
        detail: "Separates a mixture of two miscible liquids whose boiling points differ by more than 30 K.",
        children: [
          {
            id: "s6-dist-simple", title: "Simple Distillation",
            detail: "For liquids differing by > 30 K in b.p.\n• Example: mixture of hexane (b.p. 342 K), toluene (b.p. 384 K), benzene (b.p. 353 K), aniline (b.p. 457 K)."
          },
          {
            id: "s6-dist-frac", title: "Fractional Distillation",
            detail: "For mixtures of miscible liquids whose b.p. differs by 30 K or less.\n• Example: acetone (b.p. 329 K) and methanol (b.p. 338 K)."
          },
          {
            id: "s6-dist-azeo", title: "⚠️ Note — Azeotropic Distillation",
            detail: "Rectified spirit contains 95% ethanol and 5% water — forms a constant boiling mixture called azeotrope. Both components cannot be separated by normal distillation; a special technique called azeotropic distillation is used."
          }
        ]
      },
      {
        id: "s6-chrom", title: "Paper Chromatography",
        detail: "Separates a mixture of coloured or even colourless substances which have different solubility in a solvent.",
        children: [
          {
            id: "s6-chrom-uses", title: "Uses of Paper Chromatography",
            detail: "• Separate blue and black components of black ink.\n• Separate and identify amino acids from acidic protein hydrolysate.\n• Detect and identify drugs in the blood of criminals (forensic science).\n• Identify banned drug in the blood of an athlete.\n• Monitor the progress of a reaction."
          }
        ]
      }
    ]
  }
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Chem9Ch1Flowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll   = () => setCtxVal(v => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal(v => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = { fontFamily: "'EB Garamond',Georgia,serif", fontSize: 15, lineHeight: 1.58, color: "#1a1a1a" };

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
            Exploring Mixtures and Their Separation
          </h1>
          <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13,
            fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: .5 }}>
            Pradeep&apos;s Science : Chemistry 9th
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8",
          padding: "10px 24px", display: "flex", flexWrap: "wrap",
          gap: 7, justifyContent: "center", alignItems: "center" }}>
          {DATA.map(s => (
            <button key={s.id} className="fc-pill"
              onClick={() => scrollTo(s.id)}
              style={{ display: "inline-flex", alignItems: "center", gap: 5,
                background: `${s.accent}15`, color: s.accent,
                border: `1.5px solid ${s.accent}55`, borderRadius: 30,
                padding: "4px 13px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: 700, fontSize: 11.5, letterSpacing: .3, cursor: "pointer",
                whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background = `${s.accent}28`}
              onMouseLeave={e => e.currentTarget.style.background = `${s.accent}15`}>
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0, 3).join(" ")}</span>
              <span style={{ fontSize: 10, opacity: .6, fontWeight: 400 }}>{s.page}</span>
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

        {/* LEGEND */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center",
          margin: "16px auto", maxWidth: 880, padding: "12px 18px", background: "#fff",
          borderRadius: 10, border: "1px solid #e0e0e0", fontSize: 12.5 }}>
          <span style={{ fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif",
            fontSize: 12, color: "#666", marginRight: 4 }}>Particle Size:</span>
          {[
            { label: "Solutions", desc: "< 1 nm", color: "#1565c0" },
            { label: "Colloids", desc: "1–100 nm", color: "#6a1b9a" },
            { label: "Suspensions", desc: "> 100 nm", color: "#c77000" },
          ].map(p => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.color }} />
              <span style={{ fontWeight: 600, color: p.color }}>{p.label}</span>
              <span style={{ color: "#888" }}>{p.desc}</span>
            </div>
          ))}
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 24px 56px" }}>
          {DATA.map(section => (
            <div key={section.id} id={section.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
                  fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5,
                  color: section.accent, textTransform: "uppercase", opacity: .7 }}>
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
