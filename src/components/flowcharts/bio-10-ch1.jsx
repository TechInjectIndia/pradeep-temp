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

const DATA = [
  {
    id: "s0",
    accent: "#6a1b9a",
    title: "I  Nutrition — Modes of Nutrition",
    subtitle: "How organisms obtain their food",
    children: [
      {
        id: "s0-auto",
        title: "Autotrophic Nutrition",
        detail: "Green plants synthesize their own food from simple substances like CO₂, H₂O, sunlight, and chlorophyll.\nThe process is called photosynthesis.\nEquation: 6CO₂ + 12H₂O → C₆H₁₂O₆ + 6O₂ + 6H₂O",
        children: [
          {
            id: "s0-auto-raw",
            title: "Raw Materials for Photosynthesis",
            detail: "1. Sunlight\n2. Chlorophyll (sunlight absorbed by chlorophyll)\n3. CO₂ — enters through stomata and oxygen is released as by-product through stomata of leaves\n4. Water — Water + dissolved minerals like nitrogen, phosphorus etc. are taken up by the roots from soil."
          },
          {
            id: "s0-auto-pigments",
            title: "Pigments in Chloroplasts",
            detail: "1. Chlorophyll a\n2. Chlorophyll b\n3. Xanthophylls\n4. Carotenoids\n\nSite of Photosynthesis: Chloroplasts in the leaf."
          }
        ]
      },
      {
        id: "s0-hetero",
        title: "Heterotrophic Nutrition",
        detail: "Organisms derive their energy from the intake and digestion of the organic substances prepared by autotrophs.",
        children: [
          {
            id: "s0-hetero-sapro",
            title: "Saprophytic",
            detail: "Organisms derive their energy/nutrients from dead and decaying organic matter.\nE.g., Fungi (yeast, mucor), Bacteria."
          },
          {
            id: "s0-hetero-para",
            title: "Parasitic",
            detail: "Organisms derive their energy from other living organisms.\nE.g., Cuscuta, tapeworm, lice etc."
          },
          {
            id: "s0-hetero-holo",
            title: "Holozoic",
            detail: "Complex type of nutrition. Organisms derive their nutrients from ingestion of complex organic matter.\n1. Herbivores\n2. Carnivores\n3. Omnivores\n\nSteps of Holozoic Nutrition: Ingestion → Digestion → Absorption → Assimilation → Egestion"
          }
        ]
      }
    ]
  },
  {
    id: "s1",
    accent: "#c0126a",
    title: "I  Nutrition — Alimentary Canal : Digestive System",
    subtitle: "Parts and functions of the human digestive tract",
    children: [
      {
        id: "s1-mouth",
        title: "Mouth",
        detail: "• Teeth — Mastication (chewing) of food.\n• Tongue — Rolling, tasting and swallowing of food.\n• Saliva — Produced by salivary glands; contains salivary amylase which converts starch into sugar.",
      },
      {
        id: "s1-oeso",
        title: "Oesophagus (Food Pipe)",
        detail: "Produces peristaltic movements — wave-like muscular contractions that push food from the buccal cavity down to the stomach.",
      },
      {
        id: "s1-stomach",
        title: "Stomach",
        detail: "Produces gastric juice by gastric glands. The gastric juice contains:\n• Pepsin — Breaks down proteins.\n• HCl — Creates acidic medium; kills bacteria.\n• Lipase — Breaks fats partially.\n• Mucus — Protects the inner lining of the stomach from acid damage.",
      },
      {
        id: "s1-small",
        title: "Small Intestine",
        detail: "Receives secretions from:\n• Liver — secretes bile juice (bile salts emulsify fats).\n• Pancreas — secretes pancreatic juice (contains Amylase, Trypsin, Lipase to digest carbohydrates, proteins and fats).\n• Intestinal glands — secrete intestinal juices with a variety of enzymes to complete digestion of food.\n\nAbsorption of digested food occurs through the villi of the small intestine.",
      },
      {
        id: "s1-large",
        title: "Large Intestine",
        detail: "Main function is the absorption of water from the undigested food material.",
      },
      {
        id: "s1-rectum",
        title: "Rectum",
        detail: "Serves as temporary collection and storage site for waste material (faeces) before egestion.",
      },
      {
        id: "s1-anus",
        title: "Anus",
        detail: "The terminal opening of the alimentary canal. Helps in egestion — the removal of undigested waste from the body.",
      },
    ],
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "II  Respiration",
    subtitle: "Breakdown of food to release energy in cells and tissues",
    detail: "Respiration: The process which results in the breakdown of food to release energy in the cells and tissues.\nBreathing: Exchange of gases in our body — brought up by this process.",
    children: [
      {
        id: "s2-types",
        title: "Types of Respiration",
        children: [
          {
            id: "s2-aerobic",
            title: "Aerobic Respiration",
            detail: "This process occurs in the presence of oxygen.\n• Pyruvic acid is converted into carbon dioxide and water.\n• Energy is released and stored as ATP.",
          },
          {
            id: "s2-anaerobic",
            title: "Anaerobic Respiration",
            detail: "This type of respiration occurs in the absence of oxygen.\n• Pyruvic acid is either converted into ethyl alcohol or lactic acid.\n• Ethyl alcohol is usually formed in microbes like yeast or bacteria (fermentation).\n• Lactic acid is formed in some microbes as well as in the muscle cells of humans (during vigorous exercise).",
          },
        ],
      },
      {
        id: "s2-parts",
        title: "Parts of Respiratory System",
        detail: "Nostrils → Nasal cavity → Pharynx → Trachea → Bronchi → Bronchioles → Alveolar ducts → Alveoli",
      },
      {
        id: "s2-humans",
        title: "Respiration in Humans",
        detail: "• Air is taken in through the nostrils — fine hairs filter the air.\n• Air moves into the trachea. It has rings of cartilage to ensure the air passage does not collapse.\n• From trachea, air moves to the lungs — has bronchi leading to each lung.\n• Bronchi further divided into bronchioles — end of bronchioles have alveoli (air sacs).\n• Gaseous exchange takes place in the alveoli due to the large surface area.\n• Blood flowing in capillaries surrounding the alveoli takes the O₂ to various parts of body and brings CO₂ back to the lungs.",
      },
    ],
  },
  {
    id: "s2b",
    accent: "#c77000",
    title: "III  Transportation",
    subtitle: "Movement of substances in plants and animals",
    children: [
      {
        id: "s2b-plants",
        title: "A. Transportation in Plants",
        children: [
          {
            id: "s2b-plants-water",
            title: "Transport of Water and Minerals",
            detail: "• Absorption of water and minerals — By land plants from soil in solution form through xylem elements by root hairs.\n• Ascent of sap (upward movement of water and minerals) — From roots to stems and leaves.\n(i) Root pressure theory.\n(ii) Transpiration pull and cohesion-tension theory.\n(iii) Transpiration — Loss of water as vapours from stomata of leaves mainly."
          },
          {
            id: "s2b-plants-food",
            title: "Translocation of Food and Other Substances",
            detail: "Synthesis of sugars and other metabolites occurs in leaves. These are transported to other parts of plant by upward, downward or lateral movements through phloem elements.\n• Movement occurs in aqueous form and is called translocation."
          }
        ]
      },
      {
        id: "s2b-animals",
        title: "B. Human Circulatory System",
        detail: "Consists of a network of arteries, veins, and capillaries. Heart pumps blood through them.\nIt is responsible for collecting metabolic wastes and toxins from the cells and tissues to be purified, expelled from the body as well as distribution of O₂ and digested food to various cells of the body.",
        children: [
          {
            id: "s2b-heart",
            title: "Heart",
            detail: "1. Muscular organ.\n2. Located in chest cavity between lungs.\n3. Enveloped by pericardium.\n4. Consists of 4 chambers — (a) 2 atria, (b) 2 ventricles.\n5. Rhythmically beats throughout life.\n6. Cardiac cycle involves — (i) Joint diastole, (ii) Atrial systole, (iii) Ventricular systole."
          },
          {
            id: "s2b-blood",
            title: "Blood",
            children: [
              {
                id: "s2b-blood-plasma",
                title: "Plasma",
                detail: "1. Yellow colour.\n2. Contains about 10% organic substances.\n3. About 90% water."
              },
              {
                id: "s2b-blood-corpus",
                title: "Blood Corpuscles",
                detail: "RBCs (Red Blood Cells) — Carry oxygen.\nWBCs (White Blood Cells) — Fight infections. Types: Granulocytes, Agranulocytes.\nPlatelets — Help in blood clotting."
              }
            ]
          },
          {
            id: "s2b-vessels",
            title: "Blood Vessels",
            detail: "1. Arteries — Carry oxygenated blood from heart to body.\n2. Veins — Carry deoxygenated blood from body to heart.\n3. Capillaries — Thin-walled vessels for exchange of materials."
          },
          {
            id: "s2b-lymph",
            title: "Lymphatic System",
            detail: "(i) Lymph — Similar to blood but lacks RBCs. It is a colourless fluid.\n(ii) Lymph capillaries — Tissue fluid drains into these capillaries.\n(iii) Lymph vessels — Formed by joining lymph capillaries. These join venous system.\n(iv) Lymph nodes — Act as parts of body's immune system."
          }
        ]
      }
    ]
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "IV  Excretion",
    subtitle: "Removal of harmful waste products from the body",
    children: [
      {
        id: "s3-plants",
        title: "Excretion in Plants",
        detail: "• Major waste substances are produced by metabolic activities.\n• Oxygen, Carbon dioxide and Water are the main wastes.\n• CO₂ and water are used in photosynthesis.\n• Oxygen escapes into environment by diffusion through stomata of leaves.\n• Some excretory products such as latex, gums, essential oils etc. are stored in special tissues. Resin ducts store resins.\n• Excess salt is removed through hydrathodes in some herbaceous plants.",
      },
      {
        id: "s3-animals",
        title: "Excretion in Animals",
        detail: "• Animals have definite organs to eliminate waste products and water (Excretion).\n• They maintain a proper amount of water and ionic balance (Osmoregulation).\n• Major excretory products are: Ammonia, Urea, and Uric acid.",
        children: [
          {
            id: "s3-animals-proto",
            title: "Protozoa",
            detail: "Excretion and osmoregulation occur by contractile vacuoles.",
          },
          {
            id: "s3-animals-earth",
            title: "Earthworms",
            detail: "Excretion and osmoregulation occur through nephridia.",
          },
          {
            id: "s3-animals-insects",
            title: "Insects, Centipedes, Arachnids",
            detail: "Have malpighian tubules for excretion.",
          },
          {
            id: "s3-animals-molluscs",
            title: "Molluscs and Vertebrates",
            detail: "Have kidneys for excretion and osmoregulation.",
          },
        ],
      },
      {
        id: "s3-humans",
        title: "Excretion in Human Beings",
        detail: "The human excretory system consists of:",
        children: [
          {
            id: "s3-humans-organs",
            title: "Excretory Organs",
            detail: "• Pair of Kidneys — Form urine in nephrons; maintain osmoregulation.\n• Pair of Ureters — Conduct urine from kidneys to the urinary bladder.\n• Urinary Bladder — For temporary storage of urine.\n• Urethra — Passage for passing urine from urinary bladder to outside the body.",
          },
          {
            id: "s3-humans-nephron",
            title: "Nephron",
            detail: "Nephrons are the structural and functional components of kidneys.\n• Each kidney has about a million nephrons.\n• Structure of Nephron — Each nephron consists of:\n  (i) Bowman's capsule having a glomerulus.\n  (ii) Convoluted, twisted tubule.",
          },
          {
            id: "s3-humans-urine",
            title: "Process of Urine Formation",
            detail: "(i) Ultra Filtration — filtration of blood in Bowman's capsule.\n(ii) Selective Reabsorption — useful substances reabsorbed back into blood.\n(iii) Secretion — additional waste substances secreted into the tubule.",
          },
        ],
      },
      {
        id: "s3-kidney-fail",
        title: "Kidney Failure & Dialysis",
        detail: "In case of failure of kidneys, an artificial kidney machine is employed to get rid of metabolic wastes from the blood. This procedure is called dialysis.",
      },
      {
        id: "s3-urine",
        title: "Urine — Composition",
        detail: "• Human urine contains 95% water and 5% nitrogenous wastes (urea, uric acid etc.).\n• It is yellow coloured due to the presence of urochrome pigment.",
      },
    ],
  },
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

export default function LifeProcessesFlowchart() {
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
            Life Processes
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Biology 10th
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
              <span>{s.title.split("—")[0].trim().split(" ").slice(0,3).join(" ")}</span>
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
