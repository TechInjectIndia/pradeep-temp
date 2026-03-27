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
    accent: "#b71c1c",
    title: "Coordination & Stimulus",
    detail: "Coordination: The working together of various organs (parts) of the body of the organism in a proper manner to produce proper reaction to a stimulus is called coordination.",
    children: [
      {
        id: "s0-stimulus",
        title: "Stimulus",
        detail: "The change in the environment (or environmental factors) to which the organisms respond are called stimuli (singular: stimulus)."
      },
      {
        id: "s0-plants",
        title: "Coordination in Plants",
        detail: "Plants do not have a nervous system. Coordination in plants occurs through hormones (Chemical Coordination).",
        children: [
          {
            id: "s0-tropic",
            title: "Tropic Movements",
            detail: "Movements of plant or plant parts in the direction of stimulus (positive) or away from it (negative).\nE.g., Phototropism, Geotropism, Chemotropism."
          },
          {
            id: "s0-nastic",
            title: "Nastic Movements",
            detail: "Non-directional movements that occur due to turgor changes.\nE.g., 'Touch me not' plant responds to touch."
          }
        ]
      },
      {
        id: "s0-animals",
        title: "Control and Coordination in Animals",
        detail: "Occurs through:\n(i) Nervous System — Fast, precise responses.\n(ii) Endocrine System — Slower, longer-lasting chemical responses via hormones.",
        children: [
          {
            id: "s0-animals-synapse",
            title: "Synapse",
            detail: "A minute gap between two neurons. Impulse travels through it with the help of neurotransmitters.\nIt ensures impulses travel in one direction only."
          }
        ]
      }
    ]
  },
  {
    id: "s1",
    accent: "#2e7d32",
    title: "Plant Hormones",
    detail: "Chemical substances produced naturally in plants that regulate growth, development and responses to stimuli. Also called phytohormones.",
    children: [
      {
        id: "s1-auxins",
        title: "Auxins",
        detail: "Promote growth of shoots and roots.\nResponsible for phototropism and geotropism.\nSynthesised at the tips of shoots and roots."
      },
      {
        id: "s1-gibberellins",
        title: "Gibberellins",
        detail: "Promote cell enlargement and cell differentiation.\nHelp in breaking seed dormancy and promote fruit growth."
      },
      {
        id: "s1-cytokinins",
        title: "Cytokinins",
        detail: "Promote cell division (cytokinesis).\nPresent in areas of rapid cell division such as fruits and seeds."
      },
      {
        id: "s1-aba",
        title: "Abscisic Acid",
        detail: "Inhibits growth.\nPromotes wilting and falling of leaves (abscission).\nAlso known as the 'stress hormone' as it helps plants respond to adverse conditions."
      }
    ]
  },
  {
    id: "s2",
    accent: "#c0126a",
    title: "Neuron",
    subtitle: "Structural & Functional Unit of Nervous System",
    detail: "The neuron (nerve cell) is the structural and functional unit of the nervous system. It transmits nerve impulses from one part of the body to another.",
    children: [
      {
        id: "s2-cellbody",
        title: "Cell Body (Cyton)",
        detail: "Contains the nucleus and cytoplasm.\nThe main part of the neuron that carries out metabolic functions."
      },
      {
        id: "s2-axon",
        title: "Axon",
        detail: "A long, thin fibre that transmits impulses away from the cell body.\nCovered by a myelin sheath for faster transmission."
      },
      {
        id: "s2-dendrites",
        title: "Dendrites",
        detail: "Short, branched extensions that receive impulses from adjacent neurons or receptors and carry them towards the cell body."
      }
    ]
  },
  {
    id: "s3",
    accent: "#1565c0",
    title: "Reflex Arc",
    detail: "The pathway of the reflex action is called a reflex arc. It is the quickest response mechanism of the nervous system, not involving the brain for decision-making.",
    children: [
      {
        id: "s3-pathway",
        title: "Pathway of Reflex Arc",
        detail: "Stimulus → Receptor → Sensory nerve → Relay neuron (in spinal cord) → Motor nerve → Effector organ → Response",
        children: [
          {
            id: "s3-pathway-stimulus",
            title: "Stimulus",
            detail: "Any change in the environment that triggers a response (e.g. touching a hot object)."
          },
          {
            id: "s3-pathway-receptor",
            title: "Receptor",
            detail: "Specialised cells or nerve endings that detect the stimulus (e.g. pain receptors in skin)."
          },
          {
            id: "s3-pathway-sensory",
            title: "Sensory Nerve",
            detail: "Carries the nerve impulse from the receptor to the spinal cord (CNS)."
          },
          {
            id: "s3-pathway-relay",
            title: "Relay Neuron",
            detail: "Present in the spinal cord. Connects the sensory nerve to the motor nerve and processes the impulse."
          },
          {
            id: "s3-pathway-motor",
            title: "Motor Nerve",
            detail: "Carries the impulse from the spinal cord to the effector organ."
          },
          {
            id: "s3-pathway-effector",
            title: "Effector Organ → Response",
            detail: "A muscle or gland that carries out the response (e.g. pulling the hand away from the hot object)."
          }
        ]
      }
    ]
  },
  {
    id: "s4",
    accent: "#6a1b9a",
    title: "Brain",
    subtitle: "Central Nervous System (CNS)",
    detail: "The brain is the main coordinating centre of the body. It is protected by the cranium (skull) and cerebrospinal fluid.",
    children: [
      {
        id: "s4-forebrain",
        title: "Fore Brain",
        detail: "The largest part of the brain. Each part controls specific functions.",
        children: [
          {
            id: "s4-forebrain-cerebrum",
            title: "Cerebrum",
            detail: "Largest part of brain. Centre for speech, hearing, sight, touch, taste, smell, thinking etc."
          },
          {
            id: "s4-forebrain-diencephalon",
            title: "Diencephalon",
            detail: "Its floor is called hypothalamus which is the control centre of hunger, thirst, sleep etc."
          }
        ]
      },
      {
        id: "s4-midbrain",
        title: "Mid Brain",
        detail: "Contains crura cerebri which connect the hind brain with the fore brain.\nActs as a relay centre for visual and auditory reflexes."
      },
      {
        id: "s4-hindbrain",
        title: "Hind Brain",
        detail: "Located at the back and base of the brain. Controls involuntary actions and balance.",
        children: [
          {
            id: "s4-hindbrain-cerebellum",
            title: "Cerebellum",
            detail: "Controls muscular movements, maintains posture and balance of the body."
          },
          {
            id: "s4-hindbrain-pons",
            title: "Pons Varolii",
            detail: "Acts as a bridge between different parts of the brain. Relays signals between the cerebellum and cerebrum."
          },
          {
            id: "s4-hindbrain-medulla",
            title: "Medulla Oblongata",
            detail: "Controls involuntary actions such as blood pressure (B.P.), vomiting, salivation, heartbeat, breathing, etc."
          }
        ]
      }
    ]
  },
  {
    id: "s5",
    accent: "#00695c",
    title: "Spinal Cord",
    detail: "A cylindrical structure extending from the medulla oblongata to the end of the vertebral column.\nIt is enclosed within the vertebral column (backbone) and protected by cerebrospinal fluid.",
    children: [
      {
        id: "s5-function",
        title: "Functions",
        detail: "• Controls reflex actions (involuntary, rapid responses).\n• Acts as a pathway for nerve impulses travelling to and from the brain.\n• Coordinates simple reflexes without involving the brain."
      }
    ]
  },
  {
    id: "s6",
    accent: "#c77000",
    title: "Peripheral Nervous System (PNS)",
    detail: "Consists of all the nerves that connect the central nervous system (brain and spinal cord) to the rest of the body.",
    children: [
      {
        id: "s6-cranial",
        title: "Cranial Nerves",
        detail: "Nerves that arise directly from the brain.\n12 pairs of cranial nerves connect the brain to various parts of the head, neck and trunk."
      },
      {
        id: "s6-spinal",
        title: "Spinal Nerves",
        detail: "Nerves that arise from the spinal cord.\n31 pairs of spinal nerves connect the spinal cord to different parts of the body."
      },
      {
        id: "s6-visceral",
        title: "Visceral Nerves (Autonomic Nervous System)",
        detail: "Control involuntary functions of internal organs such as heartbeat, digestion, and breathing.\nFurther divided into sympathetic and parasympathetic nervous systems."
      }
    ]
  },
  {
    id: "s7",
    accent: "#4a148c",
    title: "Endocrine System (Chemical Coordination)",
    detail: "Hormones are chemical messengers secreted by endocrine glands. Secreted in small amounts in blood and may act at nearby/distant places to bring physiological actions.\nHormones help to maintain homeostasis by negative feedback mechanism (mostly) and positive feedback mechanism (rarely).",
    children: [
      {
        id: "s7-pituitary",
        title: "1. Pituitary Gland",
        detail: "Anterior lobe: FSH, LH, TSH, ACTH, GH, Prolactin.\nIntermediate lobe: Melanocyte stimulating hormone.\nPosterior lobe: Oxytocin, Vasopressin (ADH)."
      },
      {
        id: "s7-thyroid",
        title: "2. Thyroid Gland",
        detail: "Secretes: Thyroxine, Triiodothyronine, Calcitonin.\nThyroxine regulates metabolism. Iodine is necessary for its synthesis."
      },
      {
        id: "s7-parathyroid",
        title: "3. Parathyroid Glands",
        detail: "Secretes: Parathormone (Collip's hormone).\nRegulates calcium and phosphate levels in blood."
      },
      {
        id: "s7-adrenal",
        title: "4. Adrenal Glands",
        detail: "Adrenal cortex: Aldosterone, Cortisol, Sex corticoids.\nAdrenal medulla: Adrenaline, Nor-adrenaline.\nAdrenaline is also called 'fight or flight' hormone."
      },
      {
        id: "s7-pancreas",
        title: "5. Pancreas",
        detail: "Secretes: Insulin and Glucagon.\nInsulin lowers blood sugar. Glucagon raises blood sugar.\nDeficiency of insulin causes diabetes."
      },
      {
        id: "s7-testes",
        title: "6. Testes",
        detail: "Secretes: Testosterone (by Leydig cells).\nResponsible for male secondary sexual characters."
      },
      {
        id: "s7-ovaries",
        title: "7. Ovaries",
        detail: "Secretes: Estrogens, Progesterone, Relaxin.\nResponsible for female secondary sexual characters and regulation of menstrual cycle."
      },
      {
        id: "s7-pineal",
        title: "8. Pineal Gland",
        detail: "Secretes: Melatonin hormone.\nRegulates sleep-wake cycle."
      },
      {
        id: "s7-thymus",
        title: "9. Thymus Gland",
        detail: "Secretes: Thymosin hormone.\nImportant for development of immune system, especially in early life."
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

export default function ControlCoordinationFlowchart() {
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
            Control and Coordination
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
