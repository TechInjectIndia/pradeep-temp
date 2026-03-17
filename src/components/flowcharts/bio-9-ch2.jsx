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

/* ═══════════════════════════════════════════════════════════
   DATA — every box from the 5-page Bird&apos;s-Eye View flowchart
   ═══════════════════════════════════════════════════════════ */

const DATA = [
  /* ── S1: TISSUES — Introduction ── */
  {
    id: "s1",
    icon: "🧬",
    page: "2/61",
    accent: "#c0126a",
    title: "Tissues — Introduction",
    detail: "A group or collection of similar or dissimilar cells that perform a common function and have a common origin.",
    children: [
      {
        id: "s1-levels",
        title: "Levels of Organisation",
        detail: "Several intermediate levels of organisation exist from atoms to ecosystem and biomes in biology.\n• Hierarchy means any graded organisation of persons, principles or things ranked one above the other in ascending or descending order.",
        children: [
          { id: "s1-levels-phys", title: "Physical Hierarchy" },
          { id: "s1-levels-bio", title: "Biological Hierarchy" },
          { id: "s1-levels-eco", title: "Ecological Hierarchy" },
        ]
      },
    ]
  },

  /* ── S2: MERISTEMATIC TISSUES ── */
  {
    id: "s2",
    icon: "🌱",
    page: "2/61",
    accent: "#2e7d32",
    title: "Meristematic Tissues",
    detail: "• Located at specific locations.\n• These remain in continuous state of division.\n• These help to increase the length and the girth of the plant.",
    children: [
      {
        id: "s2-apical",
        title: "Apical Meristem",
        detail: "• Located at the growing apices of main and lateral shoots and roots.\n• Responsible for linear growth of organ.\n• Examples — Root apical meristem and shoot apical meristem."
      },
      {
        id: "s2-intercalary",
        title: "Intercalary Meristem",
        detail: "• Located in between the regions of permanent tissues.\n• Usually present at the base of node, base of internode or at the base of the leaf.\n• These are responsible for growth of leaves and internodes."
      },
      {
        id: "s2-lateral",
        title: "Lateral Meristem",
        detail: "• Located usually on the sides, both in stem and root.\n• Consist of initials which divide in one plane and cause the organ to increase in diameter and girth.\n• Types — These are of two types:\n  – Cork cambium\n  – Vascular cambium in vascular bundles of dicots.\n• These result in secondary growth."
      },
    ]
  },

  /* ── S3: PERMANENT TISSUES (Plant) ── */
  {
    id: "s3",
    icon: "🌿",
    page: "2/61–2/62",
    accent: "#1565c0",
    title: "Permanent Tissues",
    detail: "• Originate from meristems and become permanent at fixed positions in plant body.\n• The cells have lost the power of division.\n• They may be living or dead.",
    children: [
      {
        id: "s3-simple",
        title: "Simple Permanent Tissues",
        detail: "• Composed of similar types of cells which have common origin and function.\n• These are of three types.",
        children: [
          {
            id: "s3-simple-par",
            title: "Parenchyma",
            detail: "• Most simple and unspecialised primitive tissue.\n• It has thin-walled cells with intercellular spaces between them.\n• It forms the packing tissue of plant body.\n• Cell wall is made of cellulose or calcium pectate."
          },
          {
            id: "s3-simple-col",
            title: "Collenchyma",
            detail: "• Living tissue having thin-walled cells but possess thickenings of cellulose and pectic substances at the corners where cells join together.\n• It provides flexibility to soft aerial parts (e.g., leaves, young stems) of plant, helping them to bend.\n• Cells are compact and without intercellular spaces."
          },
          {
            id: "s3-simple-scl",
            title: "Sclerenchyma",
            detail: "• It consists of thick-walled, dead cells.\n• Cells have hard, thick secondary walls due to deposition of lignin. These cells become strong, rigid and impermeable to water.\n• Cells are closely packed without intercellular spaces. They are cemented with middle lamella.\n• The cells are grouped as fibres and sclereids.\n• These provide mechanical support to plant parts."
          },
        ]
      },
      {
        id: "s3-complex",
        title: "Complex Permanent Tissues",
        detail: "• These possess different kinds of cells functioning in a coordinated manner.\n• These are called vascular tissues.",
        children: [
          {
            id: "s3-complex-xyl",
            title: "Xylem",
            detail: "• Chief conductive tissue responsible for conduction of water and inorganic solutes.\n• Types — It consists of 4 kinds of cells:\n  – Tracheids\n  – Vessels\n  – Xylem parenchyma\n  – Xylem fibres"
          },
          {
            id: "s3-complex-phl",
            title: "Phloem",
            detail: "• Chief food conducting tissue of vascular plants.\n• It is composed of 4 elements:\n  – Sieve tubes\n  – Companion cells\n  – Phloem parenchyma\n  – Phloem fibres"
          },
        ]
      },
    ]
  },

  /* ── S4: ANIMAL TISSUES ── */
  {
    id: "s4",
    icon: "🔬",
    page: "2/63–2/65",
    accent: "#6a1b9a",
    title: "Animal Tissues",
    detail: "• These perform specific functions.\n• Types — Four types of tissues.",
    children: [
      /* Epithelial */
      {
        id: "s4-epi",
        title: "Epithelial Tissue",
        detail: "• Simplest kind of tissue that occurs as a protective covering.\n• Consists of one or more layers of tightly, cohesive sheets of cells.\n• Cells are held together by intercellular junctions.\n• Based on the cell layers and shape of cells, it is classified as:\n  – Squamous Epithelium\n  – Cuboidal Epithelium\n  – Columnar Epithelium\n  – Ciliated Epithelium\n  – Glandular Epithelium"
      },

      /* Muscle Tissue */
      {
        id: "s4-muscle",
        title: "Muscle Tissue",
        detail: "It consists of long, narrow muscle cells (muscle fibres).",
        children: [
          {
            id: "s4-muscle-str",
            title: "Striated (Voluntary) Muscles",
            detail: "• These are attached to the bones by tendons.\n• They help in the movement of external body parts, and hence called skeletal muscles.\n• The contraction and relaxation of these muscles are under control of animal, and hence called voluntary muscles.\n• The muscle fibres show alternate dark and light bands. Hence, these are also called striated muscles.\n• These are found in the body wall, limbs, tongue, pharynx."
          },
          {
            id: "s4-muscle-unstr",
            title: "Unstriated (Smooth) Muscles",
            detail: "• These do not show any stripes, and do not work according to our will.\n• These occur within the walls of visceral organs (except heart), in the iris, ciliary body of eye and dermis of skin.\n• Each muscle fibre is long, narrow, spindle shaped with pointed ends with only one central nucleus."
          },
          {
            id: "s4-muscle-card",
            title: "Cardiac Muscles",
            detail: "• It has short, cylindrical fibres, which are branched and joined end to end to form a network.\n• Each fibre has one or two nuclei in the centre.\n• These are confined to the walls of the heart.\n• Generally, intercalated discs occur between ends of fibres.\n• The cells show faint cross striations.\n• These contract and relax continuously and never get fatigued."
          },
        ]
      },

      /* Connective Tissues */
      {
        id: "s4-conn",
        title: "Connective Tissues",
        detail: "• It serves the function of binding and joining one tissue to another; forms protective sheath and packing material around various organs.\n• Its cells are living and space between them is filled with gel-like matrix.",
        children: [
          /* Fluid Tissue */
          {
            id: "s4-conn-fluid",
            title: "Fluid Tissue",
            subtitle: "Also called vascular tissue — consists of fluid matrix with suspended free-floating cells.",
            children: [
              {
                id: "s4-conn-fluid-blood",
                title: "Blood",
                detail: "• Most important fluid connective tissue, consisting of an aqueous mixture of substances in blood plasma with suspended different types of free-floating blood corpuscles.\n• Blood Plasma — pale straw-coloured fluid matrix consisting of 90% water and 10% mixture of soluble proteins (albumins, globulins, fibrinogen), glucose, amino acids, vitamins, urea, uric acid, enzymes and hormones.\n• Blood corpuscles — These include RBCs, WBCs, and Platelets.\n• RBCs (Red blood cells) — circular, biconcave and lack nuclei when mature. They contain iron-rich, oxygen-carrying haemoglobin pigment. These also regulate CO₂ transport.\n• WBCs (White blood cells) — large-sized nucleated cells. They play important role in the body's defence mechanism. Two types: Agranulocytes and Granulocytes.\n• Agranulocytes — non-granular cytoplasm. Include Monocytes (engulf bacteria and cellular debris at injury site) and Lymphocytes (secrete antibodies to destroy microbes).\n• Granulocytes — have cytoplasmic granules. Include Neutrophils (engulf and digest disease-causing microbes), Eosinophils (show antihistamine properties), and Basophils (release histamine and heparin).\n• Platelets — irregularly shaped, non-nucleated fragments of giant cells. They play a role in blood clotting."
              },
              {
                id: "s4-conn-fluid-lymph",
                title: "Lymph",
                detail: "• It is colourless fluid tissue that acts as a middle man for the transport of materials between blood and tissue cells.\n• Parts — It has 2 parts:\n  (i) Plasma\n  (ii) White corpuscles. These are floating monocytes and cells.\n• It protects the body against infections by destroying invading microbes."
              },
            ]
          },

          /* Loose Connective */
          {
            id: "s4-conn-loose",
            title: "Loose Connective Tissue",
            children: [
              {
                id: "s4-conn-loose-are",
                title: "Areolar Tissue",
                detail: "• Most widely distributed tissue in animal body.\n• It has jelly-like matrix and white collagen fibres and yellow elastic fibres.\n• It is commonly called Packaging Tissue."
              },
              {
                id: "s4-conn-loose-dense",
                title: "Dense Regular Connective Tissue",
                detail: "• Consists of densely packed fibres and cells.\n• It forms tendons and ligaments.\n• Tendons connect skeletal muscles to bones.\n• Ligaments bind the bones together."
              },
            ]
          },

          /* Skeletal Tissues */
          {
            id: "s4-conn-skel",
            title: "Skeletal Tissues",
            detail: "• It forms rigid skeleton to support the body.\n• It is of two types:",
            children: [
              {
                id: "s4-conn-skel-adip",
                title: "Adipose Tissue",
                detail: "• It is primarily fat-storing tissue.\n• Matrix is packed with adipocytes.\n• It is found beneath the skin, in the covering of heart, around blood vessels, kidneys and in yellow bone marrow.\n• Blubber in whales and hump in camels is rich in this tissue."
              },
              {
                id: "s4-conn-skel-cart",
                title: "Cartilage",
                detail: "• It is hard but flexible having living cells embedded in matrix.\n• Found in few parts of body e.g., pinna of ears, end of nose."
              },
              {
                id: "s4-conn-skel-bone",
                title: "Bone",
                detail: "• It is very strong and non-flexible. The living bone cells are embedded in firm, calcified matrix.\n• Bones form endoskeleton of vertebrates."
              },
            ]
          },
        ]
      },

      /* Nervous Tissue */
      {
        id: "s4-nerve",
        title: "Nervous Tissue",
        detail: "• It consists of neurons.\n• It is present in the brain, spinal cord and sense organs.\n• The are the structural and functional units of nervous system.\n• Specialised for the conduction of nerve impulses.\n• Each neuron consists of:\n  – Cell body\n  – Dendrons\n  – Axon"
      },
    ]
  },

  /* ── S5: BLOOD COUNTS & MUSCULOSKELETAL SYSTEM ── */
  {
    id: "s5",
    icon: "🩸",
    page: "2/65",
    accent: "#00695c",
    title: "Blood Counts & Musculoskeletal System",
    children: [
      {
        id: "s5-blood",
        title: "Blood Counts as Indicators for Diagnosis of Infections",
        detail: "• R.B.C count, W.B.C count and Platelet count are used by medical professionals to diagnose especially anaemia, infections and dengue.\n• Anaemia is characterised by lower than normal number of RBCs or a reduced amount of haemoglobin in blood.\n• Infections result in increased WBC count than normal.\n• Dengue causes significant drop in platelet count."
      },
      {
        id: "s5-musculo",
        title: "Musculoskeletal System",
        detail: "• It is the body's framework, comprising bones, muscles, cartilage, tendons, ligaments and connective tissues.\n• It provides support, stability, and movement, allowing us to stand, walk, and perform activities.\n• It also provides protection to our vital internal organs.\n• Stores calcium and phosphorous minerals.\n• Red bone marrow produces blood cells (RBCs, WBCs and platelets)."
      },
      {
        id: "s5-care",
        title: "Care of Musculoskeletal System",
        detail: "It involves:\n• Regular exercise\n• Yoga exercises\n• A balanced diet rich in calcium, vitamin D, protein etc.\n• Maintaining a healthy weight."
      },
    ]
  },
];

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function TissuesFlowchart() {
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
            Tissues
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Biology 9th
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
              <span style={{ fontSize:14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0,3).join(" ")}</span>
              <span style={{ fontSize:10, opacity:.6, fontWeight:400 }}>{s.page}</span>
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

        {/* FOOTER */}
        <div style={{ textAlign:"center", padding:"16px 20px",
          borderTop:"1px solid #e8e8e8", background:"#fff",
          fontFamily:"'Merriweather Sans',Arial,sans-serif",
          fontSize:11, color:"#bbb", letterSpacing:1.5, textTransform:"uppercase" }}>
          Pradeep&apos;s Publications
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
