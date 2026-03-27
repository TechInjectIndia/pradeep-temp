"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ────────────────────────────────────────────────────────── */

const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Hydrocarbons",
    subtitle: "Compounds of only carbon and hydrogen",
    detail: "Hydrocarbons are classified as saturated (only single bonds) and unsaturated (one or more double/triple bonds).",
    children: [
      {
        id: "s1-sat",
        title: "Saturated Hydrocarbons",
        detail: "Contain only C–C single bonds between carbon atoms.",
        children: [
          {
            id: "s1-sat-alkanes",
            title: "Alkanes",
            detail: "General formula: CₙH₂ₙ₊₂\nn = 1, 2, 3, … etc.\nExamples: Methane (CH₄), Ethane (C₂H₆), Propane (C₃H₈) etc.\nOne shared pair of electrons between two carbon atoms.\nElectron dot structure of ethane shows each C–H and C–C bond as a shared pair.",
          },
        ],
      },
      {
        id: "s1-unsat",
        title: "Unsaturated Hydrocarbons",
        detail: "Contain at least one C=C double bond or C≡C triple bond.",
        children: [
          {
            id: "s1-unsat-alkenes",
            title: "Alkenes",
            detail: "Contain one C=C double bond.\nGeneral formula: CₙH₂ₙ, n = 2, 3, … etc.\nExamples: Ethene, Propene, etc.\nTwo shared pairs of electrons between two carbon atoms.\nElectron-dot structure of Ethene shows a double bond.",
          },
          {
            id: "s1-unsat-alkynes",
            title: "Alkynes",
            detail: "Contain one C≡C triple bond.\nGeneral formula: CₙH₂ₙ₋₂, n = 2, 3, … etc.\nExamples: Ethyne (Acetylene), Propyne, etc.\nThree shared pairs of electrons between two carbon atoms.\nElectron dot structure of Ethyne shows a triple bond.",
          },
        ],
      },
    ],
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Cycloalkanes & Aromatic Hydrocarbons",
    detail: "Special classes of hydrocarbons with ring structures.",
    children: [
      {
        id: "s2-cyclo",
        title: "Cycloalkanes",
        detail: "General formula: CₙH₂ₙ, n = 3, 4, 5, 6, … etc.\nExamples: Cyclopropane, Cyclopentane, Cyclohexane, etc.\nCarbon atoms are arranged in a ring (cyclic structure).",
      },
      {
        id: "s2-aromatic",
        title: "Aromatic Hydrocarbons",
        detail: "Benzene: Molecular formula C₆H₆\nHas three alternate single and double bonds in a hexagonal ring.\nStructure of benzene shows a six-membered carbon ring with alternating bonds and one H on each C.",
      },
    ],
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Isomerism",
    detail: "Compounds having the same molecular formula but different structures — and hence different properties — are called isomers. The phenomenon is called isomerism.",
    children: [
      {
        id: "s3-rule",
        title: "When Does Isomerism Occur?",
        detail: "Alkanes containing 4 or more carbon atoms show isomerism.\nExample: C₄H₁₀ has two isomers.",
      },
      {
        id: "s3-butane",
        title: "Isomers of Butane (C₄H₁₀)",
        detail: "(i) CH₃CH₂CH₂CH₃ — n-Butane (straight chain)\n(ii) CH₃–CH(CH₃)–CH₃ — 2-Methylpropane (Isobutane, branched chain)",
      },
      {
        id: "s3-higher",
        title: "Higher Alkane Isomers",
        detail: "C₅H₁₂ has three isomers.\nC₆H₁₄ has five isomers.\nRefer to pages 4/24–4/26.",
      },
    ],
  },
  {
    id: "s4",
    accent: "#6a1b9a",
    title: "Functional Groups",
    detail: "An atom or a group of atoms present in an organic molecule which largely determines its chemical properties.",
    children: [
      {
        id: "s4-homolog",
        title: "Homologous Series",
        detail: "A family of organic compounds having the same functional group — e.g., alcohols, aldehydes, ketones, carboxylic acids, etc.",
        children: [
          {
            id: "s4-homolog-char",
            title: "Characteristics",
            detail: "• Members of a homologous series differ by a –CH₂– unit.\n• Successive members differ in molecular mass by 14 u.\n• Have similar chemical properties but show gradation in physical properties.",
          },
        ],
      },
    ],
  },
  {
    id: "s5",
    accent: "#c77000",
    title: "Nomenclature of Organic Compounds",
    subtitle: "General name = Word Root + Prefix/Suffix",
    detail: "IUPAC naming uses a word root (based on carbon chain length) combined with a prefix or suffix that identifies the functional group.",
    children: [
      {
        id: "s5-alkenes",
        title: "Alkenes",
        detail: "Functional group: C=C (double bond)\nPrefix/Suffix: Suffix -ene\nExamples: CH₃CH=CH₂ (Propene)",
      },
      {
        id: "s5-alkynes",
        title: "Alkynes",
        detail: "Functional group: C≡C (triple bond)\nPrefix/Suffix: Suffix -yne\nExamples: CH₃C≡CH (Propyne)",
      },
      {
        id: "s5-haloalkanes",
        title: "Haloalkanes",
        detail: "Functional group: –Cl, –Br, etc.\nPrefix/Suffix: Prefix — Chloro, Bromo, etc.\nExamples: CH₃CH₂CH₂Cl (Chloropropane), CH₃CH₂CH₂Br (Bromopropane)",
      },
      {
        id: "s5-alcohols",
        title: "Alcohols",
        detail: "Functional group: Hydroxyl (–OH)\nPrefix/Suffix: Suffix -ol\nExamples: CH₃OH (Methanol), CH₃CH₂OH (Ethanol)",
      },
      {
        id: "s5-aldehydes",
        title: "Aldehydes",
        detail: "Functional group: Aldehydic group (–CHO)\nPrefix/Suffix: Suffix -al\nExamples: HCHO (Methanal), CH₃CHO (Ethanal)",
      },
      {
        id: "s5-ketones",
        title: "Ketones",
        detail: "Functional group: Keto group (>C=O)\nPrefix/Suffix: Suffix -one\nExamples: CH₃COCH₃ (Propanone), CH₃COCH₂CH₃ (Butanone)",
      },
      {
        id: "s5-carboxylic",
        title: "Carboxylic Acids",
        detail: "Functional group: Carboxyl group (–COOH)\nPrefix/Suffix: Suffix -oic acid\nExamples: HCOOH (Methanoic acid), CH₃COOH (Ethanoic acid)",
      },
    ],
  },
  {
    id: "s6",
    accent: "#b71c1c",
    title: "Chemical Properties of Carbon Compounds",
    children: [
      {
        id: "s6-combustion",
        title: "Combustion",
        detail: "Complete oxidation (i.e., combustion) of carbon compounds in excess of air or oxygen gives CO₂ and H₂O, along with heat and light.\nC + O₂ → CO₂ + heat + light (Coal)\nCH₄ + 2O₂ → CO₂ + 2H₂O + heat + light (Natural gas)\n\nSaturated hydrocarbons on combustion produce a non-luminous blue flame while unsaturated hydrocarbons produce a yellow flame with lots of black smoke."
      },
      {
        id: "s6-oxidation",
        title: "Oxidation",
        detail: "Partial oxidation of ethanol in presence of oxidising agents gives ethanoic acid.\nCH₃CH₂OH + 2[O] → CH₃COOH + H₂O\n(Ethanol)        Alk. KMnO₄ or     (Ethanoic acid)\n                    acidified K₂Cr₂O₇ (Heat)"
      },
      {
        id: "s6-substitution",
        title: "Substitution Reaction",
        detail: "Direct replacement of one or more hydrogen atoms of an organic compound by another atom or group of atoms without any change in the rest of the molecule.\nE.g., CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g)\n(Methane)  (Sunlight or 520–670K)  (Chloromethane)\n\nThis is a characteristic reaction of saturated hydrocarbons."
      },
      {
        id: "s6-addition",
        title: "Addition Reaction",
        detail: "Addition of dihydrogen to unsaturated hydrocarbons in presence of catalysts such as nickel, platinum or palladium to form saturated hydrocarbons. This is called catalytic hydrogenation.\n\nGeneral: C=C + H₂ → C–C (with Ni, 473 K)\n\nSimilarly, vegetable oils on hydrogenation give vegetable ghee (Vanaspati).\nVegetable oil (Liquid) + H₂ → Vanaspati ghee (Solid)\n                                     (H₂, Ni, 473 K / Hydrogenation)"
      }
    ]
  },
  {
    id: "s7",
    accent: "#00695c",
    title: "Some Important Carbon Compounds",
    children: [
      {
        id: "s7-ethanol",
        title: "Ethanol (CH₃CH₂OH)",
        detail: "Physical properties: Colourless, volatile liquid (bp 351 K) and soluble in H₂O in all proportions. It is a neutral compound since it has no effect on the litmus solution.",
        children: [
          {
            id: "s7-ethanol-uses",
            title: "Uses of Ethanol",
            detail: "Good industrial solvent for medicines, acts as anti-freeze, used in alcoholic beverages."
          },
          {
            id: "s7-ethanol-reactions",
            title: "Chemical Reactions of Ethanol",
            detail: "1. Reaction with Sodium:\n2CH₃CH₂OH + 2Na → 2CH₃CH₂ONa⁺ + H₂\n(Ethanol)                          (Sodium ethoxide)\n\n2. Combustion in air:\nCH₃CH₂OH + 3O₂ → 2CO₂ + 3H₂O\n\n3. Dehydration (with Conc. H₂SO₄ at 443 K):\nCH₃CH₂OH → CH₂=CH₂ + H₂O\n(Ethanol)         (Ethene)"
          },
          {
            id: "s7-ethanol-denatured",
            title: "Denatured & Absolute Alcohol",
            detail: "Denatured alcohol: Made unfit for drinking purposes by addition of toxic chemicals like methanol, pyridine, CuSO₄, etc.\nAbsolute alcohol: Pure (100%) ethanol.\nTincture of iodine: Solution of I₂ in alcohol; used as an antiseptic."
          }
        ]
      },
      {
        id: "s7-ethanoic",
        title: "Ethanoic Acid (CH₃COOH)",
        detail: "Physical properties: Soluble in H₂O. Pure ethanoic acid freezes at 290 K to form glacial-like crystals called glacial acetic acid.\nChemical properties: Pungent smelling liquid, weak acid, reacts with alkalis.",
        children: [
          {
            id: "s7-ethanoic-react",
            title: "Chemical Reactions of Ethanoic Acid",
            detail: "1. With NaOH:\nCH₃COOH + NaOH → CH₃COONa + H₂O\n(Ethanoic acid)         (Sod. ethanoate)\n\n2. With Na₂CO₃:\nCH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑\n∴ decomposes NaHCO₃, Na₂CO₃ etc. producing CO₂\n2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑"
          },
          {
            id: "s7-ethanoic-ester",
            title: "Esterification",
            detail: "Reaction of ethanoic acid with ethanol in presence of conc. H₂SO₄ (few drops) gives an ester.\nCH₃COOH + CH₃CH₂OH → CH₃COOCH₂CH₃ + H₂O\n(Ethanoic acid) (Ethanol)    (Ethyl ethanoate — Ester)\n\nEsters have a sweet fruity smell."
          },
          {
            id: "s7-ethanoic-sapon",
            title: "Saponification",
            detail: "Ester reacts with NaOH (base) to give back the sodium salt of carboxylic acid and alcohol.\nCH₃COOCH₂CH₃ + NaOH → CH₃COONa + CH₃CH₂OH\n(Ester)                        (Sod. ethanoate) (Ethanol)\n\nThis reaction is used in making soaps."
          }
        ]
      }
    ]
  }
];

/* ── HOOKS & HELPERS ─────────────────────────────────────────────── */

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
          <div style={{
            position: "absolute", left: -21, top: 0,
            height: isLast ? "calc(50% + 1px)" : "100%",
            width: 2, background: `${accent}44`,
          }} />
          <div style={{
            position: "absolute", left: -21, top: "50%",
            width: 17, height: 2, marginTop: -1, background: `${accent}44`,
          }} />
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
            <div style={{
              fontSize: "0.8em", fontStyle: "italic",
              opacity: 0.72, fontWeight: 400, marginTop: 2,
            }}>
              {node.subtitle}
            </div>
          )}
          {node.detail && (
            <div style={{
              fontSize: "0.92em", fontWeight: 400, fontStyle: "normal",
              color: depth === 0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
              marginTop: 6, lineHeight: 1.65, whiteSpace: "pre-line",
              fontFamily: "'EB Garamond',Georgia,serif", letterSpacing: "0.01em",
            }}>
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

export default function CarbonCompoundsFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = {
    fontFamily: "'EB Garamond',Georgia,serif",
    fontSize: 15,
    lineHeight: 1.58,
    color: "#1a1a1a",
  };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background: "#eae5e9", minHeight: "100vh", ...body }}>
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
            padding: "32px 40px 26px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.18)",
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
              fontFamily: "'Merriweather Sans',Arial,sans-serif",
              fontSize: 22, fontWeight: 900, color: "#fff",
              margin: "0 0 8px", letterSpacing: 1.5,
              textTransform: "uppercase", lineHeight: 1.25,
            }}
          >
            Carbon and Its Compounds
          </h1>
          <div
            style={{
              color: "rgba(255,255,255,.75)", fontSize: 13,
              fontFamily: "'Merriweather Sans',Arial,sans-serif",
              letterSpacing: 0.5,
            }}
          >
            Pradeep&apos;s Science : Chemistry · Class 10
          </div>
        </div>

        {/* NAV BAR */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #e8e8e8",
            padding: "10px 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
            justifyContent: "center",
            alignItems: "center",
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
                padding: "4px 13px",
                fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3,
                cursor: "pointer", whiteSpace: "nowrap",
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
