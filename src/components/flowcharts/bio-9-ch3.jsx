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
    id: "s1",
    accent: "#c0126a",
    title: "Reproduction",
    detail: "It is the production of new generation of individuals of the same species that are physically independent of their parents.",
    children: []
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "I. Asexual Reproduction",
    detail: "In asexual reproduction, new individuals are formed by any means other than the fusion of sex gametes, by single parent.",
    children: [
      {
        id: "s2-fission",
        title: "Fission",
        children: [
          {
            id: "s2-fission-binary",
            title: "Binary Fission",
            detail: "Division of parent cell into two small, equal sized identical daughter cells.\nE.g., Amoeba, Paramoecium, Leishmania."
          },
          {
            id: "s2-fission-multiple",
            title: "Multiple Fission",
            detail: "Division of parent cell into several, small, equal sized daughter individuals.\nE.g., Plasmodium."
          }
        ]
      },
      {
        id: "s2-frag",
        title: "Fragmentation",
        detail: "Breaking of body into several pieces, each growing into new individual.\nE.g., Spirogyra."
      },
      {
        id: "s2-regen",
        title: "Regeneration",
        detail: "Ability of organisms to regenerate its lost parts of the body removed by injury or autonomy.\nE.g., Hydra, Planaria, Sponges etc."
      },
      {
        id: "s2-budding",
        title: "Budding",
        detail: "Production of new individual from an outgrowth of the parent individual.\nE.g., Hydra, yeast."
      },
      {
        id: "s2-spore",
        title: "Spore Formation",
        detail: "Usually formed in sporangia.",
        children: [
          {
            id: "s2-spore-aplan",
            title: "Aplanospores",
            detail: "Non-motile, non-flagellated spores."
          },
          {
            id: "s2-spore-zoo",
            title: "Zoospores",
            detail: "Motile, flagellated spores.\nE.g., Rhizopus, Penicillium etc."
          }
        ]
      }
    ]
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Vegetative Propagation",
    children: [
      {
        id: "s3-natural",
        title: "Natural Methods of Vegetative Propagation",
        children: [
          {
            id: "s3-natural-buds",
            title: "By Adventitious Buds",
            detail: "E.g., Bryophyllum."
          },
          {
            id: "s3-natural-under",
            title: "Underground Rhizomes, Corms and Bulbs",
            detail: "E.g., Ginger, Banana, Onion."
          }
        ]
      },
      {
        id: "s3-artificial",
        title: "Artificial Methods of Propagation",
        children: [
          {
            id: "s3-art-cut",
            title: "Cutting",
            detail: "Stem cuttings.\nE.g., Rose, grapes, sugarcane."
          },
          {
            id: "s3-art-layer",
            title: "Layering",
            detail: "• Mound layering\n• Air layering — E.g., Jasmine."
          },
          {
            id: "s3-art-graft",
            title: "Grafting",
            detail: "Using two plants."
          },
          {
            id: "s3-art-bud",
            title: "Budding",
            detail: "A modified form of grafting."
          }
        ]
      }
    ]
  },
  {
    id: "s4",
    accent: "#c77000",
    title: "II. Sexual Reproduction",
    detail: "Production of new individuals by the fusion of two gametes (one from male parent and other from female parent) to form zygote which develops into new organism.",
    children: [
      {
        id: "s4-human",
        title: "In Human Beings",
        children: [
          {
            id: "s4-human-male",
            title: "Male Reproductive System",
            detail: "• Pair of testes in scrotum — Sperm formation.\n• Vas deferentia — Conduction of sperms.\n• Urethra — It carries urine from bladder, and sperms through penis.\n• Penis — Muscular, highly erectile organ used for reproduction and ejection of urine.\nFunctions — Testes form sperms and secrete testosterone hormone."
          },
          {
            id: "s4-human-female",
            title: "Female Reproductive System",
            detail: "• Pair of ovaries — Formation of eggs (ova).\n• Fallopian tubes — Site of fertilization.\n• Uterus — Embryo develops here.\n• Vagina — It is called birth canal.\nFunctions — Ovaries form ova. They secrete female sex hormones."
          }
        ]
      },
      {
        id: "s4-plants",
        title: "Sexual Reproduction in Flowering Plants",
        children: [
          {
            id: "s4-plants-flower",
            title: "Flower",
            detail: "Specialized reproductive organ (condensed reproductive shoot).\nParts of flower:\n• Calyx — Non-reproductive parts\n• Corolla — Non-reproductive parts\n• Stamen — Reproductive parts\n• Carpels — Reproductive parts"
          },
          {
            id: "s4-plants-prefert",
            title: "Pre-fertilization Events",
            children: [
              {
                id: "s4-plants-gameto",
                title: "Gametogenesis",
                detail: "• Formation of pollens in anthers.\n• Each pollen grain produces 2 male gametes.\n• Formation of Embryo sac in ovary.\n• Embryo sac contains egg cell and polar cells."
              },
              {
                id: "s4-plants-pollin",
                title: "Pollination",
                detail: "Involves transfer of pollens to stigma of same flower/other flower of plant/flower of same species by air, water, insects, birds, bats etc."
              }
            ]
          },
          {
            id: "s4-plants-fert",
            title: "Fertilization",
            detail: "Involves fusion of male gamete and female gamete to form zygote (2N).\nOther male gamete fuses with polar nuclei to form triploid endosperm nucleus."
          },
          {
            id: "s4-plants-postfert",
            title: "Post-fertilization Events",
            children: [
              {
                id: "s4-plants-zyg",
                title: "Zygote → Embryo → Seed",
                detail: "Zygote develops into embryo.\nOvule(s) change into seed(s).\nInteguments → seed coat."
              },
              {
                id: "s4-plants-fruit",
                title: "Ovary → Fruit",
                detail: "Ovary develops into fruit."
              },
              {
                id: "s4-plants-disp",
                title: "Seed Dispersal",
                detail: "• It is a vital process to prevent overcrowding.\n• It allows colonization of new areas for better survival, growth and genetic diversity.\n• It involves agents such as wind, water, gravity (abiotic), and animals and explosive force (biotic)."
              }
            ]
          }
        ]
      },
      {
        id: "s4-animals",
        title: "Sexual Reproduction in Animals (Human Beings)",
        children: [
          {
            id: "s4-animals-gameto",
            title: "Gametogenesis",
            children: [
              {
                id: "s4-animals-spermato",
                title: "Spermatogenesis in Males",
                detail: "• Formation of sperms in the testes.\n• Process starts at puberty stage and continues till late life."
              },
              {
                id: "s4-animals-oogen",
                title: "Oogenesis in Females",
                detail: "• Formation of ova in ovaries.\n• Starts during embryonic development but halts.\n• Ovum formation starts at the onset of menstruation around 12–13 years of age.\n• Menopause — Menstrual cycle stops around 45 to 50 years of age.\n• Ovum formation stops."
              }
            ]
          },
          {
            id: "s4-animals-sperm",
            title: "Sperm Transfer",
            detail: "Transfer of sperms to the female reproductive tract during copulation."
          },
          {
            id: "s4-animals-fert",
            title: "Fertilization",
            detail: "• It involves fusion of sperm and ovum.\n• Occurs in fallopian tubes of female genital tract."
          },
          {
            id: "s4-animals-embryo",
            title: "Embryonic Development",
            detail: "• Cleavage\n• Blastocyst stage\n• Placenta formation\n• Complete development of embryo.\nGestation — period of 9 months of pregnancy for complete development of foetus from zygote to birth of baby child."
          },
          {
            id: "s4-animals-partu",
            title: "Parturition",
            detail: "Act of expelling of full-term young baby from mother's uterus at the end of gestation."
          }
        ]
      },
      {
        id: "s4-partheno",
        title: "Parthenogenesis",
        detail: "Here, an embryo develops from an unfertilized egg. It is common in some insects (e.g., aphids, ants, and bees), reptiles (lizards and snakes) and some birds."
      }
    ]
  },
  {
    id: "s5",
    accent: "#6a1b9a",
    title: "Population Control",
    detail: "Birth control is the regulation of conception by preventive measures or devices to control the number of offsprings.",
    children: [
      {
        id: "s5-barrier",
        title: "1. Barrier Methods",
        detail: "E.g., condoms, femidom, diaphragm (cervical cap)."
      },
      {
        id: "s5-chem",
        title: "2. Chemical Methods",
        detail: "E.g., use of oral pills, vaginal pills."
      },
      {
        id: "s5-iucd",
        title: "3. Intrauterine Contraceptive Devices (IUCD)",
        detail: "E.g., Copper-T."
      },
      {
        id: "s5-natural",
        title: "4. Natural Methods",
        detail: "E.g., abstinence, rhythm method, coitus interruptus."
      },
      {
        id: "s5-surgical",
        title: "5. Surgical Methods",
        detail: "E.g., vasectomy in males, tubectomy in females."
      }
    ]
  },
  {
    id: "s6",
    accent: "#b71c1c",
    title: "Sexually Transmitted Diseases (STDs)",
    detail: "These are the infectious diseases which are spread from an infected person to a healthy person by sexual contact. Also called venereal diseases.",
    children: [
      {
        id: "s6-examples",
        title: "Examples",
        detail: "• Gonorrhea, Syphilis (Bacterial infections)\n• AIDS, Warts (Viral infections)\n• HIV/AIDS"
      }
    ]
  },
  {
    id: "s7",
    accent: "#00695c",
    title: "Government Schemes to Improve Maternal Health & Declining Sex Ratio",
    children: [
      {
        id: "s7-maternal",
        title: "I. For Improving Maternal Health",
        detail: "• Janani Suraksha Yojana\n• Janani Shishu Suraksha Karyakram\n• Pradhan Mantri Matru Vandana Yojana\n• Pradhan Mantri Surakshit Matritva Abhiyan\n• Surakshit Matritva Aashwasan\n• Poshan Abhiyan"
      },
      {
        id: "s7-sexratio",
        title: "II. For Improving Sex Ratio",
        detail: "• Beti Bachao, Beti Padhao\n• Pre-conception, and Pre-natal Diagnostic Techniques\n• Sukanya Samriddhi Yojana\n• Second girl child Incentive"
      }
    ]
  },
  {
    id: "s8",
    accent: "#4a148c",
    title: "Assisted Reproduction Technologies (ART)",
    detail: "Advanced medical techniques used to assist reproduction.",
    children: [
      {
        id: "s8-ivf",
        title: "1. The Test Tube Baby Programme"
      },
      {
        id: "s8-gift",
        title: "2. Gamete Intra Fallopian Transfer (GIFT)"
      },
      {
        id: "s8-icsi",
        title: "3. Intra Cytoplasmic Sperm Injection (ICSI)"
      },
      {
        id: "s8-ait",
        title: "4. Artificial Insemination Technique (AIT)"
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

export default function ReproductionFlowchart() {
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
            Reproduction
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

