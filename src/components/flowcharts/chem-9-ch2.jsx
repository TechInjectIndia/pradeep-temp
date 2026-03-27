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

/* ─── DATA ─── */
const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Subatomic Particles",
    children: [
      {
        id: "s1-electron",
        title: "Electron",
        detail: "Scientist: J.J. Thomson, 1897\nDiscovered by study of Cathode rays",
        children: [
          {
            id: "s1-electron-char",
            title: "Characteristics",
            detail: "Charge = 1.602 × 10⁻¹⁹ C  = −1 unit\nMass = 9.11 × 10⁻³¹ kg\n≈ (1/1837)th of H-atom\nSymbol = e⁻\nLocation = Outside the nucleus"
          }
        ]
      },
      {
        id: "s1-proton",
        title: "Proton",
        detail: "Scientist: Rutherford, 1917–1920\nGoldstein discovered presence of positively charged particles in atoms by study of canal rays.",
        children: [
          {
            id: "s1-proton-char",
            title: "Characteristics",
            detail: "Charge = 1.602 × 10⁻¹⁹ C  = +1 unit\nMass = 1.673 × 10⁻²⁷ kg\n≈ that of H-atom = 1 u\nSymbol = p⁺\nLocation = In the nucleus"
          }
        ]
      },
      {
        id: "s1-neutron",
        title: "Neutron",
        detail: "Scientist: Chadwick, 1932\nDiscovered by bombarding Be or B with fast moving α-particles.",
        children: [
          {
            id: "s1-neutron-char",
            title: "Characteristics",
            detail: "Charge = 0 (neutral particle)\nMass = 1.675 × 10⁻²⁷ kg\n≈ that of proton = 1 u\nSymbol = n⁰\nLocation = In the nucleus"
          }
        ]
      }
    ]
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Study of Cathode Rays",
    children: [
      {
        id: "s2-production",
        title: "Production",
        detail: "By passing high voltage (≈ 10,000 V) between cathode and anode of a discharge tube containing a gas at very low pressure (0.01 mm)."
      },
      {
        id: "s2-characteristics",
        title: "Main Characteristics",
        detail: "• They travel in straight lines.\n• They are made up of material particles.\n• They carry negative charge.\n• Charge and mass of the constituent particles of cathode rays is same irrespective of nature of gas."
      }
    ]
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Study of Anode Rays (Canal Rays)",
    children: [
      {
        id: "s3-production",
        title: "Production",
        detail: "By taking a perforated cathode in a discharge tube and gas at low pressure inside the discharge tube and applying high voltage (≈ 10,000 V) between the electrodes. Rays coming from anode and passing through holes (canals) of cathode are anode rays / canal rays."
      },
      {
        id: "s3-characteristics",
        title: "Main Characteristics",
        detail: "• They travel in straight lines.\n• They are made up of material particles.\n• They carry positive charge.\n• The ratio of charge/mass of the constituent particles depends upon nature of gas and voltage applied.\n• If H₂ gas is taken, the particles of anode rays are called protons."
      }
    ]
  },
  {
    id: "s4",
    accent: "#c77000",
    title: "Rutherford's Scattering Experiment",
    subtitle: "Discovery of Nucleus",
    children: [
      {
        id: "s4-how",
        title: "How Experiment Performed",
        detail: "By bombarding a thin foil of gold with fast moving α-particles and keeping a circular ZnS screen around the thin foil of gold."
      },
      {
        id: "s4-observations",
        title: "Observations",
        detail: "• Most of the α-particles passed through.\n• Some deflected through small angles.\n• Some deflected through large angles.\n• Very few deflected back."
      },
      {
        id: "s4-results",
        title: "Results",
        children: [
          {
            id: "s4-results-1",
            title: "Observation (i) — Large empty space",
            detail: "Shows large empty space within the atom."
          },
          {
            id: "s4-results-2",
            title: "Observation (ii) — Positively charged body",
            detail: "Shows presence of positively charged body in the atom."
          },
          {
            id: "s4-results-3",
            title: "Observation (iii) — Heavy, small volume",
            detail: "Shows that the body inside is heavy and occupies a very small volume called nucleus."
          }
        ]
      }
    ]
  },
  {
    id: "s5",
    accent: "#6a1b9a",
    title: "Models of Atom",
    children: [
      {
        id: "s5-thomson",
        title: "Thomson's Model (Plum Pudding Model)",
        children: [
          {
            id: "s5-thomson-features",
            title: "Main Features",
            detail: "Atom consists of a positively charged sphere in which negative electrons are embedded just like raisins in the pudding."
          },
          {
            id: "s5-thomson-drawback",
            title: "Drawback",
            detail: "It could not explain results of Rutherford's scattering experiment."
          }
        ]
      },
      {
        id: "s5-rutherford",
        title: "Rutherford's Nuclear Model",
        children: [
          {
            id: "s5-rutherford-features",
            title: "Main Features",
            detail: "Atom consists of a small, heavy positively charged body in the centre, called nucleus and the electrons were revolving around it."
          },
          {
            id: "s5-rutherford-drawback",
            title: "Drawback",
            detail: "Revolving electron will keep on losing energy. Its orbit will keep on becoming smaller and ultimately fall into the nucleus, i.e. atom is not stable."
          }
        ]
      },
      {
        id: "s5-bohr",
        title: "Bohr's Planetary Model",
        children: [
          {
            id: "s5-bohr-postulates",
            title: "Main Postulates",
            detail: "• Electrons are revolving in circular paths (orbits/shells) around the nucleus. These are numbered as 1, 2, 3, 4 or called K, L, M, N etc. Their energies are in the order K < L < M < N.\n• So long as electron is revolving in a particular orbit, it does not lose or gain energy.\n• Energy is gained only when electron jumps from inner shell to outer shell and lost when it jumps from outer shell to inner shell."
          },
          {
            id: "s5-bohr-drawback",
            title: "Drawback",
            detail: "New studies show that electron does not travel along a circular path but travels in the form of wave giving a new model called wave-mechanical model."
          }
        ]
      }
    ]
  },
  {
    id: "s6",
    accent: "#00695c",
    title: "Two Important Characteristics of Elements",
    children: [
      {
        id: "s6-atomic",
        title: "Atomic Number (Z)",
        children: [
          {
            id: "s6-atomic-def",
            title: "Definition",
            detail: "It is equal to the number of protons present in the nucleus or equal to the number of electrons present in the extranuclear part in a neutral atom (e = p = Z)."
          },
          {
            id: "s6-atomic-char",
            title: "Characteristics",
            detail: "• It is always a whole number.\n• All atoms of an element have same atomic number.\n• No two elements have the same atomic number.\n• It does not change during a chemical reaction."
          }
        ]
      },
      {
        id: "s6-mass",
        title: "Mass Number (A)",
        children: [
          {
            id: "s6-mass-def",
            title: "Definition",
            detail: "It is equal to the sum of protons and neutrons present in the nucleus of an atom (A = p + n)."
          },
          {
            id: "s6-mass-diff",
            title: "Difference from Atomic Mass",
            detail: "Atomic mass is the average relative mass of its atoms as compared with C-12 taken as 12. It is usually fractional. Mass number is always a whole number. Atomic mass is nearly equal to mass number."
          }
        ]
      },
      {
        id: "s6-symbol",
        title: "Symbolic Representation",
        detail: "ᴬ_Z X — where X = element symbol, Z = atomic number (subscript), A = mass number (superscript)."
      }
    ]
  },
  {
    id: "s7",
    accent: "#b71c1c",
    title: "Electronic Configuration & Valency",
    children: [
      {
        id: "s7-config",
        title: "Electronic Configuration of Elements (Atoms)",
        children: [
          {
            id: "s7-config-rules",
            title: "Rules for Filling Electrons (Bohr Bury Scheme)",
            detail: "1. Max. no. of e⁻ in any shell = 2n²\n   n = 1 (K): Max. e⁻ = 2\n   n = 2 (L): Max. e⁻ = 8\n   n = 3 (M): Max. e⁻ = 18\n2. The outermost shell cannot have more than 8 electrons even if rule 1 is violated.\n3. Electrons do not enter a new shell unless the inner shells are completely filled."
          },
          {
            id: "s7-config-examples",
            title: "Examples (First 18 Elements)",
            detail: "H (1): K=1 | He (2): K=2 | Li (3): 2,1 | Be (4): 2,2 | B (5): 2,3 | C (6): 2,4 | N (7): 2,5 | O (8): 2,6 | F (9): 2,7 | Ne (10): 2,8 | Na (11): 2,8,1 | Mg (12): 2,8,2 | Al (13): 2,8,3 | Si (14): 2,8,4 | P (15): 2,8,5 | S (16): 2,8,6 | Cl (17): 2,8,7 | Ar (18): 2,8,8"
          }
        ]
      },
      {
        id: "s7-valence",
        title: "Valence Electrons and Valency",
        children: [
          {
            id: "s7-valence-def",
            title: "Definitions",
            detail: "Valence electron: Electrons present in the outermost shell of an atom are called valence electrons. e.g. H, Li and Na have 1 valence electron; Be and Mg have 2, B and Al have 3 and so on.\n\nValency: It is defined as the combining capacity of an element and is equal to no. of H-atoms or Cl atoms or double the no. of O atoms with which one atom of the element combines.\ne.g. in H₂O, valency of O = 2; in NH₃, valency of N = 3."
          },
          {
            id: "s7-valence-calc",
            title: "Calculation of Valency",
            detail: "Valency of ions: Ions are formed by loss or gain of electrons. The atom which loses electron/s is converted into a positive ion (cation). The atom which gains electron/s is converted into a negative ion (anion). The charge on the ion is equal to no. of electrons lost or gained by the atom. The valency of the ion is equal to the charge on the ion (Na⁺ = 1, Ca²⁺ = 2, Cl⁻ = 1, O²⁻ = 2 etc.)\n\nValency of atoms in covalent molecules: It is equal to no. of valence electrons or 8 − No. of valence electrons.\n\nVariable valency: i.e. when an element can have more than one valency, e.g. P can have valency = 5 or 8 − 5 = 3.\n\nValency of noble gases = 8 − 8 = 0."
          }
        ]
      },
      {
        id: "s7-ions",
        title: "Electronic Configuration of Ions",
        subtitle: "Calculation of e⁻, p and n",
        children: [
          {
            id: "s7-ions-cation",
            title: "Cations (Formed by loss of electrons)",
            detail: "Protons (p) = Atomic No. (Z)\nElectrons = Z − charge on the cation\nNeutrons = A − Z"
          },
          {
            id: "s7-ions-anion",
            title: "Anions (Formed by gain of electrons)",
            detail: "Protons (p) = Atomic No. (Z)\nElectrons = Z + charge on the anion\nNeutrons = A − Z"
          }
        ]
      }
    ]
  },
  {
    id: "s8",
    accent: "#4a148c",
    title: "Isotopes, Isobars & Related Terms",
    children: [
      {
        id: "s8-isotopes",
        title: "Isotopes",
        children: [
          {
            id: "s8-isotopes-def",
            title: "Definition",
            detail: "Atoms of same element having same atomic no. but different mass numbers."
          },
          {
            id: "s8-isotopes-examples",
            title: "Examples",
            detail: "Hydrogen isotopes:\n  ¹₁H (Protium)  |  ²₁H (Deuterium)  |  ³₁H (Tritium – Radioactive)\n\nCarbon isotopes:\n  ¹²₆C  |  ¹⁴₆C (Radioactive)"
          },
          {
            id: "s8-isotopes-char",
            title: "Characteristics",
            detail: "They have same no. of protons and electrons but different no. of neutrons."
          },
          {
            id: "s8-isotopes-apps",
            title: "Applications",
            detail: "1. As nuclear fuel\n2. In medical field\n3. In carbon dating\n4. In geological dating\n5. In industry"
          }
        ]
      },
      {
        id: "s8-isobars",
        title: "Isobars",
        children: [
          {
            id: "s8-isobars-def",
            title: "Definition",
            detail: "Atoms of different elements having different atomic numbers but same mass number."
          },
          {
            id: "s8-isobars-examples",
            title: "Examples",
            detail: "⁴⁰₁₈Ar  |  ⁴⁰₁₉K  |  ⁴⁰₂₀Ca"
          },
          {
            id: "s8-isobars-char",
            title: "Characteristics",
            detail: "They have different no. of protons and electrons as well as different no. of neutrons."
          }
        ]
      },
      {
        id: "s8-isotones",
        title: "Isotones",
        detail: "Atoms of different elements with different Z and A but having same no. of neutrons (n).\ne.g. ¹⁴₆C, ¹⁵₇N, ¹⁶₈O"
      },
      {
        id: "s8-isoelectronic",
        title: "Isoelectronic",
        detail: "Species (atom or ions) having same no. of electrons.\ne.g. O²⁻, F⁻, Na⁺, Mg²⁺"
      }
    ]
  }
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

export default function StructureOfAtomFlowchart() {
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
            Structure of Atom
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Chemistry 9th
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

