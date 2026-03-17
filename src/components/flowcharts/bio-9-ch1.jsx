"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ──────────────────────────────────────────────────────── */
const DATA = [
  {
    id: "s1",
    icon: "🔬",
    page: "1/67",
    accent: "#c0126a",
    title: "Discovery and History of the Cell",
    detail:
      "• Term cell introduced by Robert Hooke in his book Micrographia in 1665 by examining thin slice of cork under primitive microscope.\n• He saw dead cells of plants which looked like empty rooms and termed them cellulae.\n• Anton von Leeuwenhoek (1632–1723) designed improved microscope and studied free living bacterial cells in 1674.\n• In 1831, Robert Brown discovered nucleus.\n• In 1840, J.E. Purkinje noted protoplasm in plant cells.\n• M.J. Schleiden (1838) announced that all plants were composed of cells.\n• In 1839, T. Schwann stated that all animals were formed of cells.\n• Rudolph Virchow in 1858 gave idea that all living cells arise from pre-existing cells.\n• Haeckel in 1866, reported that nucleus stores and transmits hereditary information.",
    children: [],
  },
  {
    id: "s2",
    icon: "🧪",
    page: "1/67",
    accent: "#1565c0",
    title: "Instruments for Studying Cells",
    detail:
      "• Cells, being microscopic in structure, are studied under microscopes.\n• Light microscope is used in laboratory and uses glass lens and visible light. It includes Simple microscope and Compound microscope.\n• Electron microscope is a large instrument for observing sub-cellular structures. It uses very high voltage electricity.",
    children: [],
  },
  {
    id: "s3",
    icon: "🦠",
    page: "1/67",
    accent: "#2e7d32",
    title: "Unicellular and Multicellular Organisms",
    detail:
      "• Unicellular organisms are made of single cell only. E.g., Amoeba, Paramecium, bacteria (prokaryotes) and yeasts (fungi). These are capable of performing all the life processes.\n• Multicellular organisms are formed of many cells. Number of cells group together and acquire different functions to form various body parts in these organisms. E.g., fungi, plants and animals.\n• Multicellular organisms have come into existence from a single cell. They show division of labour.",
    children: [],
  },
  {
    id: "s4",
    icon: "📏",
    page: "1/67",
    accent: "#c77000",
    title: "Shape, Size and Number of Cells",
    detail:
      "• Cells vary in shape, size and number.\n• Unicellular organisms are identified on the basis of their shape (exception is Amoeba).\n• In multicellular organisms, shape of the cell depends upon their position in the body and specific function they perform.\n• Cells also vary in their size.\n• Majority of multicellular organisms are composed of numerous cells. In these organisms, number of cells is correlated to the size of the body.",
    children: [],
  },
  {
    id: "s5",
    icon: "🧬",
    page: "1/67",
    accent: "#6a1b9a",
    title: "Prokaryotic and Eukaryotic Cells",
    detail:
      "• Prokaryotic cells lack nuclear membrane around the genetic material. E.g., bacteria and blue-green algae (cyanobacteria).\n• In these cells, the genetic material (nucleoid) lies in direct contact with the cytoplasm.\n• These do not contain membrane-bound organelles in the cytoplasm.\n• Ribosomes are present in prokaryotes.\n• Eukaryotic cells possess true nucleus bounded by nuclear membrane.\n• These may be unicellular or multicellular organisms. E.g., Protists, fungi, plants and animals.\n• Every eukaryotic cell contains a plasma membrane and membrane bound sub-cellular organelles.",
    children: [],
  },
  {
    id: "s6",
    icon: "🏗️",
    page: "1/68",
    accent: "#00695c",
    title: "Detailed Structure of Eukaryotic Cell",
    children: [
      {
        id: "s6-pm",
        title: "Plasma Membrane or Cell Membrane",
        detail:
          "• It is living, ultra-thin structure made of lipid and proteins.\n• It is selectively permeable.",
        children: [
          {
            id: "s6-pm-transport",
            title: "Transport of Materials Across Cell Membrane",
            detail:
              "• All cells take up and turn out materials through cell membrane.\n• Selectively permeable cell membrane enables the cell to maintain homeostasis.",
            children: [
              {
                id: "s6-pm-passive",
                title: "Passive Transport",
                detail:
                  "• It is slow.\n• It does not expend energy.\n• It occurs down the concentration gradient.\n• It does not use carrier proteins.\n• Two Types — Diffusion and Osmosis.",
              },
              {
                id: "s6-pm-active",
                title: "Active Transport",
                detail:
                  "• It is rapid.\n• It requires use of energy in the form of ATP.\n• It occurs against concentration gradient and involves use of carrier proteins.",
              },
              {
                id: "s6-pm-bulk",
                title: "Bulk Transport",
                detail:
                  "• It involves transport of large amount of substances by utilizing energy.\n• Endocytosis: It is used to engulf food and other materials.\n• Exocytosis: It is used to extrude contents to the surrounding medium.",
              },
            ],
          },
          {
            id: "s6-pm-mol",
            title: "Molecular Structure",
            detail:
              "• Fine structure appeared to be three-layered.\n• Lamellar Model proposed by Danielli and Davson (1935) and Robertson (1959). Accordingly, it is 3-layered, central light lipid bilayer is sandwiched between two protein layers.\n• Fluid Mosaic Model: It was proposed by Singer and Nicolson (1972). Most accepted model providing satisfactory explanation of its structure and functions.",
          },
        ],
      },
      {
        id: "s6-cyto",
        title: "Cytoplasm",
        detail:
          "• It is the fluid and semi-fluid matrix filled in between the nucleus and the plasma membrane. It contains cell organelles and cell inclusions.",
      },
      {
        id: "s6-org",
        title: "Cell Organelles",
        detail:
          "• Each cell organelle performs a specific function for the cell.\n• Cell organelles are — Endoplasmic reticulum, Ribosomes, Golgi apparatus, Lysosomes, Mitochondria, Plastids.",
      },
      {
        id: "s6-incl",
        title: "Cell Inclusions",
        detail:
          "• These are non-living materials present in the cytoplasm, e.g., stored organic food materials, secretions, excretions, and inorganic crystals.",
      },
      {
        id: "s6-nuc",
        title: "Nucleus",
        detail:
          "• Deeply stained rounded structure.\n• It is located centrally in animal cells but pushed to one side in plant cells due to large vacuole.\n• It contains genetic material.",
      },
      {
        id: "s6-cw",
        title: "Cell Wall",
        detail:
          "• It is present in plant cells, cells of bacteria and in fungi but is absent in animal cells.\n• It is non-living, rigid and completely permeable.\n• It is secreted by the cell itself.",
      },
      {
        id: "s6-div",
        title: "Cell Division",
        detail:
          "• It is the process by which new cells are formed.\n• It is of two types –\n• Mitosis: Common method of cell division which occurs in somatic cells and undifferentiated germ cells in animals. In plants, it occurs in meristemmatic tissues. It is also called equational division.\n• Meiosis: It is confined to reproductive organs. It involves two divisions, called meiosis-I and meiosis-II.\n• Cancer: It is a malignant growth or enlargement of a tissue that occurs due to unlimited and uncontrolled mitotic divisions of certain cells and invades surrounding tissues.",
      },
    ],
  },
  {
    id: "s7",
    icon: "🚀",
    page: "1/70",
    accent: "#b71c1c",
    title: "Recent Advances in Cell Biology",
    detail:
      "Cell biology is the study of cells, focusing on their structure, functions, growth and behaviour.",
    children: [
      {
        id: "s7-adv",
        title: "Recent Advancements Focus On",
        detail:
          "– Precise gene editing\n– Organoid technology\n– Stem cell therapies\n– Proteomics\n– AI-driven modelling of cell fate\n– Super resolution microscopy techniques",
      },
      {
        id: "s7-india",
        title: "Indian Contributions to Cell Biology",
        detail:
          "• G.N. Ramachandran and coworkers in 1950s unraveled triple-helix structure of collagen, and 'Ramachandran Plot' to check if the proposed structure of protein was physically plausible.\n• M.S. Swaminathan applied principles of genetics to develop high-yield varieties of wheat and rice.\n• Dr. Hargobind Khorana gave the interpretation of the genetic code and its function in protein synthesis.\n• Prof. Arun Kumar Sharma revolutionized plant cytogenetics by developing novel techniques for studying chromosome structure, chemistry and behaviour in angiosperms.",
      },
      {
        id: "s7-leigh",
        title: "Case Study: Leigh Syndrome",
        detail:
          "Leigh syndrome is a severe neurological disorder in children, typically appearing during the first year of life. It is caused by failure in functioning of mitochondria.\n• Mutation in any of the genes related to mitochondrial energy production can cause Leigh syndrome.\n• Symptoms reflect the brain's struggle for energy. The infant suddenly starts losing motor skills.\n• Diagnosis is a multi-step process. Doctors look for clinical symptoms and family history. They diagnose it through MRI.\n• Treatment: Currently, there is no cure for Leigh syndrome. Treatment is focused on managing symptoms and providing supportive care.",
      },
    ],
  },
];

/* ── SETUP ─────────────────────────────────────────────────────── */
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

/* ── DEPTH STYLES ──────────────────────────────────────────────── */
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

/* ── TREE NODE ─────────────────────────────────────────────────── */
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
          <div style={{ position: "absolute", left: -21, top: 0,
            height: isLast ? "calc(50% + 1px)" : "100%",
            width: 2, background: `${accent}44` }} />
          <div style={{ position: "absolute", left: -21, top: "50%",
            width: 17, height: 2, marginTop: -1, background: `${accent}44` }} />
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
            <TreeNode key={child.id} node={child} depth={depth + 1}
              accent={accent} isLast={i === node.children.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── MAIN EXPORT ───────────────────────────────────────────────── */
export default function CellFlowchart() {
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
        <div style={{
          background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding: "32px 40px 26px", textAlign: "center",
        }}>
          <div style={{
            display: "inline-block", background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.4)",
            fontFamily: "'Merriweather Sans',Arial,sans-serif",
            fontWeight: 800, fontSize: 10, letterSpacing: 3,
            color: "#fff", padding: "4px 16px", borderRadius: 3, marginBottom: 14,
            textTransform: "uppercase",
          }}>
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1 style={{
            fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 22,
            fontWeight: 900, color: "#fff", margin: "0 0 8px",
            letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
          }}>
            CELL
          </h1>
          <div style={{
            color: "rgba(255,255,255,.75)", fontSize: 13,
            fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5,
          }}>
            Pradeep&apos;s Science : Biology 9th
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e8e8e8",
          padding: "10px 24px", display: "flex", flexWrap: "wrap",
          gap: 7, justifyContent: "center", alignItems: "center",
        }}>
          {DATA.map((s) => (
            <button key={s.id} className="fc-pill"
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
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0, 3).join(" ")}</span>
              <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 400 }}>{s.page}</span>
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
            <button className="fc-btn" onClick={expandAll}
              style={{
                background: PINK, color: "#fff", border: "none", cursor: "pointer",
                borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}>
              Expand All
            </button>
            <button className="fc-btn" onClick={collapseAll}
              style={{
                background: "#fff", color: PINK, border: `1.5px solid ${PINK}`,
                cursor: "pointer", borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}>
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 24px 56px" }}>
          {DATA.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{
                  fontFamily: "'Merriweather Sans',Arial,sans-serif",
                  fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5,
                  color: section.accent, textTransform: "uppercase", opacity: 0.7,
                }}>
                  Page {section.page}
                </span>
                <div style={{ flex: 1, height: 1, background: `${section.accent}25` }} />
              </div>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: "center", padding: "16px 20px",
          borderTop: "1px solid #e8e8e8", background: "#fff",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontSize: 11, color: "#bbb", letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Pradeep&apos;s Publications
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
