"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ────────────────────────────────────────────────────────── */
const DATA = [
  {
    id: "s0",
    accent: "#4a148c",
    title: "Reproduction — Overview",
    detail: "It is the production of new individuals of the same species that are physically independent of their parents.",
    children: [
      {
        id: "s0-asexual",
        title: "I. Asexual Reproduction",
        detail: "New individuals are formed by any means other than the fusion of sex gametes, by a single parent.\nNo gametes are formed. No fertilization. Meiosis does not occur at any stage.",
        children: [
          {
            id: "s0-fission",
            title: "Fission",
            detail: "Binary fission — Division of parent cell into two small, equal-sized identical daughter cells.\nE.g., Amoeba, Paramecium, Leishmania.\n\nMultiple fission — Division of parent cell into several small, equal-sized daughter individuals.\nE.g., Plasmodium."
          },
          {
            id: "s0-fragment",
            title: "Fragmentation",
            detail: "Breaking of body into several pieces, each growing into new individual.\nE.g., Spirogyra."
          },
          {
            id: "s0-regen",
            title: "Regeneration",
            detail: "Ability of organisms to regenerate its lost parts of the body removed by injury or autotomy.\nE.g., Hydra, Planaria, Sponges etc."
          }
        ]
      },
      {
        id: "s0-sexual",
        title: "II. Sexual Reproduction",
        detail: "Production of new individuals by the fusion of two gametes (one from male parent and other from female parent) to form a zygote which develops into a new organism."
      },
      {
        id: "s0-diff",
        title: "Differences: Sexual vs Asexual",
        detail: "Sexual:\n1. Involves two parents.\n2. Gametes are formed.\n3. Fertilization and zygote formation occurs.\n4. Involves meiosis at the time of gamete formation.\n\nAsexual:\n1. Involves only single parent.\n2. Gametes are not formed.\n3. No fertilization and zygote formation.\n4. Meiosis does not occur at any stage."
      }
    ]
  },
  {
    id: "s1",
    accent: "#c0126a",
    title: "Budding",
    detail:
      "Production of new individual from an outgrowth of the parent individual.\nE.g., Hydra, yeast.",
    children: [],
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Spore Formation",
    detail: "Usually formed in sporangia.",
    children: [
      {
        id: "s2-aplano",
        title: "Aplanospores",
        detail: "Non-motile, non-flagellated spores.",
      },
      {
        id: "s2-zoo",
        title: "Zoospores",
        detail:
          "Motile, flagellated spores.\nE.g., Rhizopus, Penicillium etc.",
      },
    ],
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
            detail: "E.g., Bryophyllum.",
          },
          {
            id: "s3-natural-underground",
            title: "Underground Rhizomes, Corms and Bulbs",
            detail: "E.g., Ginger, Banana, Onion.",
          },
        ],
      },
      {
        id: "s3-artificial",
        title: "Artificial Methods of Propagation",
        children: [
          {
            id: "s3-art-cutting",
            title: "Cutting",
            detail: "Stem cuttings.\nE.g., Rose, grapes, sugarcane.",
          },
          {
            id: "s3-art-layering",
            title: "Layering",
            detail: "• Mound layering\n• Air layering — E.g., Jasmine.",
          },
          {
            id: "s3-art-grafting",
            title: "Grafting",
            detail: "Using two plants.",
          },
        ],
      },
    ],
  },
  {
    id: "s4",
    accent: "#6a1b9a",
    title: "Sexual Reproduction in Flowering Plants",
    children: [
      {
        id: "s4-flower",
        title: "Flower",
        detail:
          "Specialized reproductive organ (condensed reproductive shoot).",
        children: [
          {
            id: "s4-flower-parts",
            title: "Parts of Flower",
            children: [
              {
                id: "s4-calyx",
                title: "Calyx → Non-reproductive part",
              },
              {
                id: "s4-corolla",
                title: "Corolla → Non-reproductive part",
              },
              {
                id: "s4-stamen",
                title: "Stamen → Reproductive part",
              },
              {
                id: "s4-carpels",
                title: "Carpels → Reproductive part",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "s5",
    accent: "#00695c",
    title: "Sexual Reproduction in Animals (Human Beings)",
    children: [
      {
        id: "s5-male",
        title: "Male Reproductive System",
        detail: "• Pair of testes in scrotum — Sperm formation.\n• Vas deferentia — Conduction of sperms.\n• Urethra — It carries urine from bladder and sperms through penis.\n• Penis — Muscular, highly erectile organ used for reproduction and ejection of urine.\n\nFunctions: Testes form sperms and secrete testosterone hormone."
      },
      {
        id: "s5-female",
        title: "Female Reproductive System",
        detail: "• Pair of ovaries — Formation of eggs (ova).\n• Fallopian tubes — Site of fertilization.\n• Uterus — Embryo develops here. It is called birth canal.\n• Vagina — It is called birth canal.\n\nFunctions: Ovaries form ova. They secrete female sex hormones (estrogen, progesterone)."
      },
      {
        id: "s5-prefert",
        title: "Pre-fertilization Events",
        children: [
          {
            id: "s5-prefert-gameto",
            title: "Gametogenesis",
            children: [
              {
                id: "s5-prefert-spermato",
                title: "Spermatogenesis (in Males)",
                detail: "Formation of sperms in the testes.\n• Process starts at puberty stage and continues till late life."
              },
              {
                id: "s5-prefert-oogenesis",
                title: "Oogenesis (in Females)",
                detail: "Formation of ova in ovaries.\n• Starts during embryonic development but halts.\n• Ovum formation starts at the onset of menstruation around 12–13 years of age.\n• Menopause — Menstrual cycle stops around 45 to 50 years of age. Ovum formation stops."
              }
            ]
          },
          {
            id: "s5-prefert-sperm",
            title: "Sperm Transfer",
            detail: "Transfer of sperms to the female reproductive tract during copulation."
          }
        ]
      },
      {
        id: "s5-fert",
        title: "Fertilization",
        detail: "• It involves fusion of sperm and ovum.\n• Occurs in fallopian tubes of female genital tract."
      },
      {
        id: "s5-postfert",
        title: "Post-fertilization Events",
        children: [
          {
            id: "s5-postfert-embryo",
            title: "Embryonic Development",
            detail: "• Cleavage — Rapid cell divisions of zygote.\n• Blastocyst stage — Hollow ball of cells.\n• Placenta formation — Connects embryo to mother's uterine wall for nutrition and gas exchange.\n• Complete development of embryo occurs in the uterus."
          },
          {
            id: "s5-postfert-gestation",
            title: "Gestation & Parturition",
            detail: "Gestation — Period of 9 months of pregnancy for complete development of foetus from zygote to baby child.\nParturition — Act of expelling of full-term young baby from mother's uterus at the end of gestation."
          }
        ]
      },
    ],
  },
  {
    id: "s6",
    accent: "#c77000",
    title: "Contraceptive Methods for Population Control",
    children: [
      {
        id: "s6-barrier",
        title: "Barrier Methods",
        detail:
          "• Use of condoms in males.\n• Use of diaphragm in females.",
      },
      {
        id: "s6-chemical",
        title: "Chemical Methods — In Females",
        detail:
          "(i) Oral pills to check ovulation.\n(ii) Use of IUCD — E.g., Copper-T.",
      },
      {
        id: "s6-natural",
        title: "Natural Methods",
        detail: "• Abstinence\n• Rhythm method\n• Coitus interruptus",
      },
      {
        id: "s6-surgical",
        title: "Surgical Methods",
        detail:
          "(i) Vasectomy in males.\n(ii) Tubectomy in females.",
      },
    ],
  },
  {
    id: "s7",
    accent: "#b71c1c",
    title: "Sexually Transmitted Diseases (STDs)",
    detail:
      "STDs are the diseases which are transmitted through sexual intercourse. These are spread from infected person to healthy person. These are also called venereal diseases.\nE.g., Gonorrhea, Syphilis, HIV/AIDS, Warts.",
    children: [],
  },
];

/* ── FONT LOADING ────────────────────────────────────────────────── */
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

/* ── DEPTH STYLES ────────────────────────────────────────────────── */
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
          <div
            style={{
              position: "absolute", left: -21, top: 0,
              height: isLast ? "calc(50% + 1px)" : "100%",
              width: 2, background: `${accent}44`,
            }}
          />
          <div
            style={{
              position: "absolute", left: -21, top: "50%",
              width: 17, height: 2, marginTop: -1, background: `${accent}44`,
            }}
          />
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
            <div style={{ fontSize: "0.8em", fontStyle: "italic", opacity: 0.72, fontWeight: 400, marginTop: 2 }}>
              {node.subtitle}
            </div>
          )}
          {node.detail && (
            <div
              style={{
                fontSize: "0.92em", fontWeight: 400, fontStyle: "normal",
                color: depth === 0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
                marginTop: 6, lineHeight: 1.65, whiteSpace: "pre-line",
                fontFamily: "'EB Garamond',Georgia,serif", letterSpacing: "0.01em",
              }}
            >
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
export default function ReproductionFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = { fontFamily: "'EB Garamond',Georgia,serif", fontSize: 15, lineHeight: 1.58, color: "#1a1a1a" };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background: "#eae5e9", minHeight: "100vh", ...body }}>
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
            padding: "32px 40px 26px", textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block", background: "rgba(255,255,255,0.18)",
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
              fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 22,
              fontWeight: 900, color: "#fff", margin: "0 0 8px",
              letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
            }}
          >
            HOW DO ORGANISMS REPRODUCE? (Continued)
          </h1>
          <div
            style={{
              color: "rgba(255,255,255,.75)", fontSize: 13,
              fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5,
            }}
          >
            Pradeep&apos;s Science : Biology 10th
          </div>
        </div>

        {/* NAV BAR */}
        <div
          style={{
            background: "#fff", borderBottom: "1px solid #e8e8e8",
            padding: "10px 24px", display: "flex", flexWrap: "wrap",
            gap: 7, justifyContent: "center", alignItems: "center",
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
                padding: "4px 13px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3, cursor: "pointer",
                whiteSpace: "nowrap",
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
