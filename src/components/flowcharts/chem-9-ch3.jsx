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

/* ─────────────────────── DATA ─────────────────────── */

const DATA = [
  {
    id: "s1",
    icon: "🧱",
    page: "3/65",
    accent: "#c0126a",
    title: "Matter — Classification",
    detail: "All matter is made up of extremely small particles called atoms.",
    children: [
      {
        id: "s1-elements",
        title: "Elements",
        detail: "Smallest particle of free existence → Atom",
      },
      {
        id: "s1-compounds",
        title: "Compounds",
        detail: "Smallest particle of free existence → Molecule",
      },
      {
        id: "s1-mixtures",
        title: "Mixtures",
        detail: "Two or more elements or components in any ratio.",
      },
    ],
  },
  {
    id: "s2",
    icon: "⚖️",
    page: "3/65",
    accent: "#1565c0",
    title: "Laws of Chemical Combination",
    children: [
      {
        id: "s2-mass",
        title: "Law of Conservation of Mass",
        detail: "Mass can neither be created nor destroyed during any physical change or a chemical reaction.",
        children: [
          {
            id: "s2-mass-phys",
            title: "In Physical Change",
            detail: "Ice (s) → Water (l)\nWater + Sugar → Sugar sol.\nNo change in mass during the above physical changes.",
          },
          {
            id: "s2-mass-chem",
            title: "In Chemical Reaction",
            detail: "BaCl₂ (aq) + Na₂SO₄ (aq) → BaSO₄ (s) + 2 NaCl (aq)\nMass of products = Mass of reactants",
          },
        ],
      },
      {
        id: "s2-definite",
        title: "Law of Constant Composition (Law of Definite Proportion)",
        detail: "A chemical compound is always made up of the same elements combined together in a fixed proportion by mass.",
        children: [
          {
            id: "s2-definite-ex1",
            title: "Example: Water (H₂O)",
            detail: "H₂O from any source is made up of H and O in a fixed ratio 1 : 8 by mass.",
          },
          {
            id: "s2-definite-ex2",
            title: "Example: Carbon Dioxide (CO₂)",
            detail: "CO₂ obtained from any source is made up of C and H in a fixed ratio 12 : 32 or 3 : 8 by mass.",
          },
        ],
      },
    ],
  },
  {
    id: "s3",
    icon: "⚛️",
    page: "3/65",
    accent: "#2e7d32",
    title: "Dalton's Atomic Theory",
    children: [
      {
        id: "s3-laws",
        title: "Explanation of Laws of Chemical Combination",
        detail: "1. Law of conservation of mass — follows from postulates 1 and 2.\n2. Law of constant composition — follows from postulates 2, 5 and 7.",
      },
      {
        id: "s3-postulates",
        title: "Postulates",
        detail: "1. All matter is made up of extremely small particles called atoms.\n2. Atoms of the same element are identical in all respects (shape, mass, properties etc.)\n3. Atoms of different elements have different sizes and masses.\n4. Atoms of same or different elements combine to form molecules or compounds.\n5. When atoms combine, they do so in simple whole no. ratio.\n6. When two different elements combine to form two or more compounds, in each case ratio of combining atoms is simple whole no.\n7. Number and kind of atoms in a given compound is fixed.\n8. Atom is the smallest particle that takes part in a chemical reaction.\n9. An atom can neither be created nor destroyed.",
      },
      {
        id: "s3-limitations",
        title: "Limitations of Dalton's Atomic Theory (Modified)",
        detail: "1. Atom is no longer considered as smallest indivisible particle.\n2. Atoms of same element may have different masses (called isotopes).\n3. Atoms of different elements may have same masses (called isobars).\n4. Substances of same element may have different properties (like charcoal, graphite, diamond).\n5. The ratio in which atoms combine may not be simple.\n6. Atom is no longer considered indestructible.",
      },
    ],
  },
  {
    id: "s4",
    icon: "🔬",
    page: "3/66",
    accent: "#c77000",
    title: "Atoms",
    children: [
      {
        id: "s4-def",
        title: "Definition",
        detail: "An atom is the smallest particle of an element which may or may not be capable of free existence.\n\nAtoms of only noble gases (He, Ne, Ar etc.) exist freely while atoms of other elements exist in the combined state with same atom (e.g., H₂, Cl₂, O₂ etc.) or with other atoms, e.g., HCl, H₂O, NH₃ etc.",
      },
      {
        id: "s4-size",
        title: "Size",
        detail: "Extremely small in size. Their radii are of the order of 10⁻¹⁰ m, e.g., atomic radius of H atom = 0.037 nm\n(1 nm = 10⁻⁹ m)",
      },
      {
        id: "s4-symbol",
        title: "Symbol",
        subtitle: "Rules for writing symbols",
        detail: "Symbol of an element is a short hand method of representing full name of an element.",
        children: [
          {
            id: "s4-symbol-rules",
            title: "Rules for Writing Symbols",
            detail: "1. First letter in capital or 1st letter + another small letter from English/Latin name (where more than one element starts with the same letter like C, Cl, Cr, etc.)\n2. Second small letter added may not be the second letter of the name, e.g., chlorine (Cl).\n3. Both 1st and 2nd letter may be from Latin name, e.g., silver (Argentum), Ag",
          },
          {
            id: "s4-symbol-eng",
            title: "From English Names",
            detail: "Argon = Ar, Arsenic = As, Aluminium = Al\nBoron = B, Barium = Ba, Bromine = Br\nCarbon = C, Calcium = Ca, Chlorine = Cl, Chromium = Cr, Cobalt = Co\nFluorine = F, Hydrogen = H, Helium = He",
          },
          {
            id: "s4-symbol-latin",
            title: "From Latin Names",
            detail: "Antimony (Stibium) = Sb, Copper (Cuprum) = Cu, Gold (Aurum) = Au\nIron (Ferrum) = Fe, Lead (Plumbum) = Pb, Mercury (Hygrm) = Hg\nPotassium (Kalium) = K, Silver (Argentum) = Ag, Sodium (Natrium) = Na",
          },
        ],
      },
    ],
  },
  {
    id: "s5",
    icon: "🧪",
    page: "3/66",
    accent: "#6a1b9a",
    title: "Molecules",
    children: [
      {
        id: "s5-def",
        title: "Definition",
        detail: "A molecule is a group of atoms which are held together strongly by a chemical bond.\nOR\nA molecule is the smallest particle of an element or a compound which can exist freely.",
      },
      {
        id: "s5-elements",
        title: "Molecules of Elements",
        detail: "No. of atoms present in a molecule is called atomicity.",
        children: [
          {
            id: "s5-el-mono",
            title: "Monoatomic",
            detail: "He, Ne, Ar etc.",
          },
          {
            id: "s5-el-di",
            title: "Diatomic",
            detail: "H₂, O₂, N₂, Cl₂ etc.",
          },
          {
            id: "s5-el-tri",
            title: "Triatomic",
            detail: "O₃",
          },
          {
            id: "s5-el-more",
            title: "Polyatomic",
            detail: "Phosphorus = P₄, Sulphur = S₈\nBuckminster fullerene = C₆₀",
          },
        ],
      },
      {
        id: "s5-covalent",
        title: "Molecules of Covalent Compounds",
        detail: "Containing 2 or more atoms of different elements, e.g., HCl, CO, H₂O, CO₂, NH₃",
      },
      {
        id: "s5-naming",
        title: "Naming of Molecular Compounds",
        detail: "1. Less electronegative element is named first, e.g., HCl = Hydrogen chloride\n2. Name of more electronegative element is changed to end in -ide, e.g., HCl = Hydrogen chloride, H₂S = Hydrogen sulphide\n3. Some are named by their common names, e.g., H₂O = Water, NH₃ = Ammonia\n4. No. of atoms is indicated by prefixes di, tri etc., e.g., N₂O₅ = Dinitrogen pentoxide\n5. If 1st element is H, di etc. is not used, e.g., H₂S = Hydrogen sulphide",
      },
    ],
  },
  {
    id: "s6",
    icon: "⚗️",
    page: "3/67",
    accent: "#00695c",
    title: "Atomic Mass, Molecular Mass & Formula Unit Mass",
    children: [
      {
        id: "s6-atomic",
        title: "Atomic Mass of Element",
        detail: "It is the average relative mass of its atoms compared with mass of C-12 taken as 12.",
        children: [
          {
            id: "s6-atomic-gram",
            title: "Gram Atomic Mass",
            detail: "It is atomic mass expressed in grams.\ne.g., Gram atomic mass of C = 12 g\nIt contains Avogadro's no. of atoms (6.022 × 10²³).",
          },
        ],
      },
      {
        id: "s6-molecular",
        title: "Molecular Mass of Covalent Molecules/Compounds",
        detail: "It is the average relative mass of its molecules as compared with that of C-12 taken as 12.",
        children: [
          {
            id: "s6-molecular-calc",
            title: "Calculation",
            detail: "Obtained by adding atomic mass of each element multiplied with the no. of atoms of that element present in one molecule.\ne.g., molecular mass of H₂SO₄\n= 1 × 2 + 32 × 1 + 16 × 4\n= 2 + 32 + 64 = 98 u",
          },
          {
            id: "s6-molecular-gram",
            title: "Gram Molecular Mass",
            detail: "It is molecular mass expressed in grams.\ne.g., Gram molecular mass of H₂O = 18 g\nIt contains Avogadro's no. of molecules (6.022 × 10²³).",
          },
        ],
      },
      {
        id: "s6-formula",
        title: "Formula Unit Mass of Ionic Compounds",
        detail: "For ionic compounds only because their formula represents only the ratio of ions and there are no molecules, e.g., Na⁺ Cl⁻ = 1 : 1, MgCl₂ = 1 : 2\nNaCl, MgCl₂ are not molecules but ionic compounds.",
        children: [
          {
            id: "s6-formula-gram",
            title: "Gram Formula Unit Mass",
            detail: "It is formula unit mass expressed in grams.\ne.g., Gram formula unit mass of NaCl = 58.5 g\nIt contains Avogadro's no. of formula units.",
          },
        ],
      },
    ],
  },
  {
    id: "s7",
    icon: "📝",
    page: "3/68",
    accent: "#b71c1c",
    title: "Formulae of Compounds",
    subtitle: "Shorthand method of representing full name of a compound",
    children: [
      {
        id: "s7-molecular",
        title: "Molecular Compounds",
        detail: "Chemical formula of a molecular compound represents the actual no. of atoms of different elements present in one molecule of the compound, e.g., H₂O, NH₃, H₂SO₄ etc.",
        children: [
          {
            id: "s7-molecular-rules",
            title: "Rules for Writing Chemical Formulae",
            detail: "1. For binary compounds write symbol of less electronegative element on LHS and that of more electronegative element on RHS.\n2. Write their valencies below their symbols.\n3. Divide by common factor if any.\n4. Apply criss-cross.\n5. 1 not to be written.",
          },
          {
            id: "s7-molecular-ex",
            title: "Examples",
            detail: "HCl — H(1+) × Cl(1−) → HCl\nH₂O — H(1+) × O(2−) → H₂O\nCaO — Ca(2+) × O(2−), after dividing by 2 → CaO",
          },
        ],
      },
      {
        id: "s7-ionic",
        title: "Ionic Compounds",
        detail: "Chemical formula of an ionic compound simply represents the ratio of the cations and anions present in the structure of the compound.\ne.g., Na⁺ Cl⁻, Ratio = 1 : 1\nMg²⁺ Cl₂⁻, Ratio = 2 : 1",
        children: [
          {
            id: "s7-ionic-rules",
            title: "Rules for Writing Chemical Formulae",
            detail: "1. Write symbol of cation on LHS and that of anion on RHS.\n2. Write formulae of polyatomic ions in brackets.\n3. Write their valencies below their symbols.\n4. Divide by common factor if any.\n5. Apply criss-cross.\n6. 1 not to be written.",
          },
          {
            id: "s7-ionic-ex",
            title: "Examples",
            detail: "NaCl — Na(1+) × Cl(1−) → NaCl\nMgCl₂ — Mg(2+) × Cl(1−) → MgCl₂\nCaO — Ca(2+) × O(2−), after dividing by 2 → CaO\nKNO₃ — K(1+) × NO₃(1−) → KNO₃\nCa(NO₃)₂ — Ca(2+) × NO₃(1−) → Ca(NO₃)₂",
          },
        ],
      },
    ],
  },
  {
    id: "s8",
    icon: "🔗",
    page: "3/69",
    accent: "#4a148c",
    title: "Formation of Ionic and Covalent Bonds/Compounds",
    children: [
      {
        id: "s8-ionic",
        title: "Ionic Bond / Compounds",
        detail: "When a bond is formed by transference of electrons from one atom to another so as to complete their octets, the bond formed is called ionic bond and the compound formed is called ionic compound.",
        children: [
          {
            id: "s8-ionic-ex1",
            title: "Example 1: NaCl",
            detail: "Na (Z=11, E.C. 2,8,1) → Na⁺ + e⁻\nCl (Z=17, E.C. 2,8,7) + e⁻ → Cl⁻\nNa⁺ + Cl⁻ → NaCl",
          },
          {
            id: "s8-ionic-ex2",
            title: "Example 2: CaF₂",
            detail: "Ca (Z=20, E.C. 2,8,8,2) → Ca²⁺ + 2e⁻\nF (Z=9, E.C. 2,7) + e⁻ → F⁻\nCa²⁺ + 2F⁻ → CaF₂",
          },
          {
            id: "s8-ionic-ex3",
            title: "Example 3: MgO",
            detail: "Mg (Z=12, E.C. 2,8,2) → Mg²⁺ + 2e⁻\nO (Z=8, E.C. 2,6) + 2e⁻ → O²⁻\nMg²⁺ + O²⁻ → MgO",
          },
        ],
      },
      {
        id: "s8-covalent",
        title: "Covalent Bond / Compounds",
        detail: "When a bond is formed by mutual sharing of electrons between two atoms so as to complete their octets (duplets in case of H, Li, Be) the bond formed is called covalent bond and the compound formed is called covalent compound.",
        children: [
          {
            id: "s8-cov-single",
            title: "Single Bond (H—H)",
            detail: "H· + ·H → H:H (H—H)\nOne shared pair of electrons.",
          },
          {
            id: "s8-cov-double",
            title: "Double Bond (O=O)",
            detail: "·Ö· (E.C. 2,6) + ·Ö· (E.C. 2,6) → O::O (O=O)\nTwo shared pairs of electrons.",
          },
          {
            id: "s8-cov-triple",
            title: "Triple Bond (N≡N)",
            detail: ":Ṅ: (E.C. 2,5) + :Ṅ: (E.C. 2,5) → N:::N (N≡N)\nThree shared pairs of electrons.",
          },
          {
            id: "s8-cov-water",
            title: "Water (H₂O)",
            detail: "H· + ·Ö· + ·H → H:Ö:H (H—O—H)\nTwo O—H single bonds.",
          },
        ],
      },
      {
        id: "s8-compare",
        title: "Characteristics: Ionic vs Covalent Compounds",
        children: [
          {
            id: "s8-cmp-bond",
            title: "Bond Formation",
            detail: "Ionic: By transfer of electrons forming cations and anions.\nCovalent: By sharing of electrons (no ions formed).",
          },
          {
            id: "s8-cmp-elements",
            title: "Constituent Elements",
            detail: "Ionic: Metal + Non-metal\nCovalent: Non-metal + Non-metal",
          },
          {
            id: "s8-cmp-state",
            title: "Physical State",
            detail: "Ionic: Crystalline solids at room temperature.\nCovalent: Solids, liquids or gases.",
          },
          {
            id: "s8-cmp-mp",
            title: "Melting / Boiling Points",
            detail: "Ionic: High due to strong electrostatic forces of attraction between ions.\nCovalent: Low due to weak intermolecular forces (covalent bonds/van der Waal's forces).",
          },
          {
            id: "s8-cmp-cond",
            title: "Electrical Conductivity",
            detail: "Ionic: High in the molten state or aqueous solution.\nCovalent: Poor/Nil, being insulators.",
          },
          {
            id: "s8-cmp-sol",
            title: "Solubility in Water",
            detail: "Ionic: Generally soluble.\nCovalent: Generally insoluble except polar ones.",
          },
          {
            id: "s8-cmp-hard",
            title: "Hardness",
            detail: "Ionic: Hard and brittle.\nCovalent: Soft and flexible.",
          },
          {
            id: "s8-cmp-speed",
            title: "Speed of Reactions",
            detail: "Ionic: In solution, they react fast.\nCovalent: They react slowly.",
          },
        ],
      },
    ],
  },
];

/* ─────────────────────── TreeNode ─────────────────────── */

function TreeNode({ node, depth = 0, accent, isLast = false }) {
  const { mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const open =
    mode === "expand" ? true : mode === "collapse" ? false : localOpen;

  const ds = (DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)])(accent);

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
      {depth > 0 && <>
        <div style={{ position: "absolute", left: -21, top: 0,
          height: isLast ? "calc(50% + 1px)" : "100%",
          width: 2, background: `${accent}44` }} />
        <div style={{ position: "absolute", left: -21, top: "50%",
          width: 17, height: 2, marginTop: -1, background: `${accent}44` }} />
      </>}

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
              opacity: .72, fontWeight: 400, marginTop: 2 }}>{node.subtitle}</div>
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

/* ─────────────────────── Main Export ─────────────────────── */

export default function AtomsAndMoleculesFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal(v => ({ version: v.version + 1, mode: "expand" }));
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
            Atoms and Molecules
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
