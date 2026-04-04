"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── COMPONENT LIBRARY ────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P = "#f9eef4";
const chapterNumber = "1";
const chapterTitle = "CELL";

function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800&display=swap";
    document.head.appendChild(l);
  }, []);
}

const Sup = ({ c }) => <sup style={{ fontSize: "0.72em" }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em" }}>{c}</sub>;
const Frac = ({ n, d }) => (
  <span style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", verticalAlign:"middle", lineHeight:1.25, margin:"0 3px", fontSize:"0.95em" }}>
    <span style={{ borderBottom:"1.5px solid #1a1a1a", padding:"0 4px 1px", textAlign:"center", whiteSpace:"nowrap" }}>{n}</span>
    <span style={{ padding:"1px 4px 0", textAlign:"center", whiteSpace:"nowrap" }}>{d}</span>
  </span>
);
const MathBlock = ({ children }) => (
  <div style={{ textAlign:"center", margin:"14px 20px", fontStyle:"italic", fontSize:"14.5px", lineHeight:1.6 }}>{children}</div>
);
const Arrow = () => <span style={{ margin:"0 6px" }}>⟶</span>;
const Eq = () => <span style={{ margin:"0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin:"0 4px" }}>×</span>;

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop:22, marginBottom:10 }}>
    <h2 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:14, fontWeight:800, color:P_COLOR, textTransform:"uppercase", letterSpacing:"0.5px", margin:0 }}>{label}. {title}</h2>
    <div style={{ borderTop:"1.5px solid #c0126a", marginTop:4 }} />
  </div>
);
const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:14, fontWeight:700, color:P_COLOR, margin:"16px 0 8px" }}>{label}. {title}</h3>
);
const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13.5, fontWeight:700, color:P_COLOR, margin:"14px 0 7px" }}>{label}. {title}</h4>
);
const P2 = ({ children, style }) => (
  <p style={{ margin:"0 0 8px", textAlign:"justify", ...style }}>{children}</p>
);
const DefBox = ({ children }) => (
  <div style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0", fontStyle:"italic", background:"#fafafa", fontSize:"14px", lineHeight:1.55 }}>{children}</div>
);
const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border:"1.5px solid #888", borderLeft:"5px solid #c0126a", margin:"18px 0" }}>
    <div style={{ textAlign:"center", fontWeight:800, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13.5, textDecoration:"underline", padding:"8px 12px 2px" }}>ACTIVITY {num}.</div>
    {sub && <div style={{ textAlign:"center", color:P_COLOR, fontStyle:"italic", fontSize:13, padding:"2px 16px 8px" }}>{sub}</div>}
    <div style={{ padding:"8px 16px 12px" }}>{children}</div>
  </div>
);
const ActHd = ({ children }) => (
  <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>{children}</p>
);
const KBBox = ({ children }) => (
  <div style={{ border:"2px solid #c0126a", margin:"20px 0" }}>
    <div style={{ background:P_COLOR, color:"#fff", fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900, fontSize:13, letterSpacing:2, padding:"5px 14px" }}>KNOWLEDGEBOOSTER</div>
    <div style={{ padding:"10px 16px 12px" }}>{children}</div>
  </div>
);
const KBHd = ({ children }) => (
  <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"10px 0 5px" }}>{children}</p>
);
const FeatureBox = ({ title, children }) => (
  <div style={{ border:"2px solid #888", margin:"18px 0", padding:"12px 16px" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:800, color:P_COLOR, fontSize:14, margin:"0 0 8px" }}>{title}</p>
    {children}
  </div>
);
const ProblemsBox = ({ children }) => (
  <div style={{ border:"2px solid #c0126a", margin:"20px 0" }}>
    <div style={{ background:P_COLOR, color:"#fff", textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900, fontSize:16, letterSpacing:2, padding:7 }}>PROBLEMS FOR PRACTICE</div>
    <div style={{ padding:"12px 18px" }}>{children}</div>
  </div>
);
const FootNote = ({ children }) => (
  <span style={{ fontSize:"12px", color:"#555", fontStyle:"italic", display:"block", marginTop:8, paddingTop:6, borderTop:"1px solid #ddd" }}>
    <sup style={{ color:P_COLOR, fontWeight:700, marginRight:1 }}>*</sup>{children}
  </span>
);
const Fig = ({ src, num, caption }) => (
  <div style={{ margin:"20px auto", textAlign:"center", maxWidth:"90%" }}>
    <img src={src} alt={caption || num || "figure"}
      style={{ maxWidth:"100%", height:"auto", border:"1px solid #ddd", display:"block", margin:"0 auto" }}
      onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
    />
    <div style={{ display:"none", alignItems:"center", justifyContent:"center", border:"1.5px dashed #c0126a", background:LIGHT_P, minHeight:80, padding:"12px 20px", color:P_COLOR, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{ marginLeft:6 }}>{src}</code>
    </div>
    {(num || caption) && (
      <p style={{ fontSize:12.5, color:"#444", fontStyle:"italic", margin:"6px auto 0", maxWidth:480, lineHeight:1.45 }}>
        {num && <strong style={{ color:P_COLOR, fontStyle:"normal" }}>{num}. </strong>}{caption}
      </p>
    )}
  </div>
);
const NumericalSection = ({ topic, children }) => (
  <div style={{ margin:"20px 0", border:"1.5px solid #c0126a" }}>
    <div style={{ background:P_COLOR, color:"#fff", padding:"6px 14px", fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900, fontSize:12, letterSpacing:1 }}>NUMERICAL PROBLEMS BASED ON {topic}</div>
    <div style={{ padding:"14px 18px" }}>{children}</div>
  </div>
);
const th = { border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" };
const td = { border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 };

function HamburgerBtn({ open, setOpen }) {
  const bar = { width:20, height:2.5, borderRadius:2, background:"#fff", transition:"all 0.25s" };
  return (
    <button onClick={() => setOpen(o => !o)}
      style={{ position:"fixed", top:14, left:14, zIndex:1100, background:P_COLOR, border:"none", borderRadius:4, width:36, height:36, cursor:"pointer", padding:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5 }}>
      <span style={{ ...bar, transform: open ? "translateY(7.5px) rotate(45deg)" : "none" }} />
      <span style={{ ...bar, opacity: open ? 0 : 1 }} />
      <span style={{ ...bar, transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
    </button>
  );
}
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return <div onClick={onClick} style={{ position:"fixed", inset:0, zIndex:1050, background:"rgba(0,0,0,0.35)", cursor:"pointer" }} />;
}
function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
    setOpen(false);
  };
  return (
    <div style={{ position:"fixed", top:0, left:0, zIndex:1080, width: open ? 260 : 0, height:"100vh", background:"#fff", borderRight: open ? "2px solid #f0c8dc" : "none", boxShadow: open ? "3px 0 16px rgba(0,0,0,0.18)" : "none", transition:"width 0.28s ease", overflowY: open ? "auto" : "hidden", overflowX:"hidden" }}>
      <div style={{ padding:"56px 0 20px" }}>
        <div style={{ padding:"0 16px 10px", fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:800, fontSize:12, color:P_COLOR, letterSpacing:1, textTransform:"uppercase" }}>Contents</div>
        <nav>
          {tocItems.map(item => (
            <div key={item.id} onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
              style={{ cursor:"pointer", padding: item.level===1 ? "6px 16px" : item.level===2 ? "4px 24px" : "3px 32px", fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight: item.level===1 ? 700 : 400, fontSize: item.level===1 ? 12 : 11, color: item.level===1 ? P_COLOR : "#444", borderLeft: item.level===1 ? `3px solid ${P_COLOR}` : "none", marginBottom:2, lineHeight:1.4, whiteSpace:"nowrap", background: hovered===item.id ? LIGHT_P : "transparent" }}>
              {item.label && <span style={{ marginRight:5 }}>{item.label}.</span>}{item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
const PaywallGate = ({ children }) => (
  <div style={{ position: "relative", marginTop: 30 }}>
    <div style={{
      filter: "blur(6px)", WebkitFilter: "blur(6px)",
      pointerEvents: "none", userSelect: "none",
      maxHeight: 500, overflow: "hidden",
    }}>
      {children}
    </div>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.85) 60%, #fff 90%)",
      zIndex: 5,
    }} />
    <div style={{
      position: "absolute", left: "50%", top: "50%",
      transform: "translate(-50%, -50%)", zIndex: 10,
      textAlign: "center", padding: "36px 48px",
      background: "#fff", borderRadius: 16,
      boxShadow: "0 8px 40px rgba(192,18,106,0.18), 0 2px 12px rgba(0,0,0,0.08)",
      border: "2px solid #f0c8dc",
      maxWidth: 400, width: "90%",
    }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
      <h3 style={{
        fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 800, fontSize: 18, color: "#c0126a",
        margin: "0 0 8px", letterSpacing: 0.5,
      }}>
        Chapter Continues...
      </h3>
      <p style={{
        fontSize: 14, color: "#555", lineHeight: 1.5, margin: "0 0 20px",
        fontFamily: "'EB Garamond',Georgia,serif",
      }}>
        Sections 1.7–1.17 including Plasma Membrane, Cell Wall, Nucleus, Cytoplasm, Cell Organelles, Cell Inclusions, Biomolecules, Cell Division and more.
      </p>
      <button style={{
        background: "linear-gradient(135deg, #e8457a 0%, #c0126a 100%)",
        color: "#fff", border: "none", borderRadius: 28,
        padding: "12px 36px", fontSize: 14, fontWeight: 700,
        fontFamily: "'Merriweather Sans',Arial,sans-serif",
        letterSpacing: 0.8, cursor: "pointer",
        boxShadow: "0 4px 16px rgba(192,18,106,0.35)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
        onMouseEnter={e => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 22px rgba(192,18,106,0.45)"; }}
        onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 16px rgba(192,18,106,0.35)"; }}
      >
        UNLOCK FULL ACCESS
      </button>
    </div>
  </div>
);

const ChapterCover = () => (
  <div style={{ background:"linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)", padding:"60px 48px 50px", textAlign:"center", marginBottom:0 }}>
    <div style={{ display:"inline-block", border:"3px solid #fff", padding:"8px 28px", marginBottom:18 }}>
      <span style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900, fontSize:56, color:"#fff", lineHeight:1 }}>{chapterNumber}</span>
    </div>
    <h1 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900, fontSize:32, color:"#fff", letterSpacing:2, textTransform:"uppercase", margin:0, lineHeight:1.25 }}>{chapterTitle}</h1>
  </div>
);

// ── IMAGE URLs ────────────────────────────────────────────────
const IMG11 = CONTENT_IMAGES.CONTENT_IMAGE_92F5D7AFF79875E47FA9;
const IMG12 = CONTENT_IMAGES.CONTENT_IMAGE_511B1BB848450F8CB671;
const IMG13 = CONTENT_IMAGES.CONTENT_IMAGE_044E688697528F7A42A1;
const IMG14 = CONTENT_IMAGES.CONTENT_IMAGE_FCE79EB4E68BC76AE6CC;
const IMG15 = CONTENT_IMAGES.CONTENT_IMAGE_C5B41135B1D1B1F49A4C;
const IMG16 = CONTENT_IMAGES.CONTENT_IMAGE_CB817BCCC4375DB2B44B;
const IMG17 = CONTENT_IMAGES.CONTENT_IMAGE_B3533F02AF0A81E6EA54;
const IMG18 = CONTENT_IMAGES.CONTENT_IMAGE_AA239ECFB99F0D37FE44;
const IMG19 = CONTENT_IMAGES.CONTENT_IMAGE_21FFFB9B5C1907527DAB;
const IMG110A = CONTENT_IMAGES.CONTENT_IMAGE_95517EB887971A02E593;
const IMG110B = CONTENT_IMAGES.CONTENT_IMAGE_7DE1D666E54B0513B122;

// ── TABLE COMPONENTS ─────────────────────────────────────────
const Table11 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.1. Differences between Unicellular and Multicellular Organisms</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={th}>Unicellular Organisms</td><td style={th}>Multicellular Organisms</td></tr></thead>
      <tbody>
        <tr><td style={td}>1. It consists of a single cell.</td><td style={td}>1. It consists of a large number of cells.</td></tr>
        <tr><td style={td}>2. The single cell performs all the life activities.</td><td style={td}>2. A single cell performs one or a few activities.</td></tr>
        <tr><td style={td}>3. There is no division of labour as the single cell performs all the activities.</td><td style={td}>3. There is division of labour as cells are specialized to perform different functions of the body.</td></tr>
        <tr><td style={td}>4. Single cell is involved in the production of new organisms during reproduction.</td><td style={td}>4. Only germ cells take part in reproduction.</td></tr>
      </tbody>
    </table>
  </div>
);

// ── BATCH 1 CONTENT ──────────────────────────────────────────
const content_b1 = [
  <SecHd key="sec-s11" id="s11" label="1.1" title="Introduction" />,
  <p key="b1-p-s11-1" style={{ textIndent:28, textAlign:"justify" }}>Earlier, there was only one way to visually capture the natural world, <em>i.e.,</em> by hand. For centuries, scientists were also artists. They relied on pen, ink, and watercolor to record their discoveries. These illustrations were far more than simple sketches. They were vital tools for understanding and communication.</p>,
  <p key="b1-p-s11-2" style={{ textIndent:28, textAlign:"justify" }}>The act of drawing forces a unique kind of focus. To illustrate a plant, an insect, or a star system, a scientist could not just glance at it. They had to observe every detail such as the curve of a petal, the segments of an antenna, the precise arrangement of stars etc. These deep observations often led to new insights and questions and the drawing became a record of discovery.</p>,
  <p key="b1-p-s11-3" style={{ textIndent:28, textAlign:"justify" }}>Scientific illustrations also solved a major problem, <em>i.e.,</em> communication. For instance, a detailed drawing of a cell's structure can be understood by researchers in any country, regardless of the language they speak. It creates a common ground for discussion and debate. These visuals made it possible to share complex findings clearly and accurately across the scientific community. These historical works are not just art; they are foundational documents of scientific progress.</p>,
  <p key="b1-p-s11-4" style={{ textIndent:28, textAlign:"justify" }}>Innumerable kinds of organisms live on our planet earth. All these organisms look different from each other and are broadly classified as bacteria, protists, fungi, plants and animals. However, all of them are made up of microscopic units, called <strong>cells.</strong> In some cases, single cell functions as an entire organism. Such organisms are called <strong>unicellular organisms</strong> (<em>e.g.,</em> bacteria, <em>Amoeba, Paramecium</em>). In others, many cells group together and acquire different functions to form various body parts. Such organisms are termed <strong>multicellular organisms</strong> (<em>e.g.,</em> some fungi, plants and animals). Now the question arises why do all these organisms have cells? The answer is that all living organisms perform various metabolic reactions in a delicately balanced environment to sustain life. Cell(s), in living organisms, act as life supporting chambers and provide them such a special balanced environment. In other words, every living cell keeps its chemical composition steady within its boundary and, thus, is capable of performing the activities in a desired manner. Therefore, <strong><em>cell is regarded as the structural and functional unit of living organisms.</em></strong></p>,
  <p key="b1-p-s11-5" style={{ textAlign:"justify" }}>In the following account, we shall study about:</p>,
  <ol key="b1-ol-s11" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li>Discovery and history of the cell.</li>
    <li>Unicellular vs multicellular organisms.</li>
    <li>Prokaryotic vs eukaryotic cells.</li>
    <li>Structure of typical eukaryotic cell.</li>
    <li>Plasma membrane (molecular structure, functions; passive transport, active transport and bulk transport of materials across plasma membrane).</li>
    <li>Cell wall.</li>
    <li>Nucleus.</li>
    <li>Cytoplasm (cytosol, cell organelles and cell inclusions).</li>
    <li>Biomolecules.</li>
    <li>Cell division.</li>
  </ol>,

  <SecHd key="sec-s12" id="s12" label="1.2" title="Discovery and History of the Cell" />,
  <p key="b1-p-s12-1" style={{ textIndent:28, textAlign:"justify" }}>The term 'cell' was introduced by an English scientist, <strong>Robert Hooke</strong> in his book <strong>Micrographia,</strong> published in the year 1665 by Royal Society of London. The book showcased the power of the invented microscope. He examined thin slices of cork under his self-designed primitive microscope (Fig. 1.1). The cork is a substance obtained from the bark of a Spanish Oak tree, <em>Quercus.</em> He was surprised to note that the cork resembled the structure of a honey comb and consisted of many tiny compartments (Fig. 1.2). In fact, he saw the dead cells of plants (only cell walls) which looked like empty rooms. These dead cells had lost their living contents. He called these small rooms as <em>cellulae</em> (sing <em>cellula</em>), now termed as cells. <em>Cellula</em> is a Latin word which means '<em>a little room</em>'.</p>,
  <p key="b1-p-s12-2" style={{ textIndent:28, textAlign:"justify" }}>This simple observation, which appears to be a very small and insignificant, was an extremely important discovery in the history of biological sciences. It was the first observation which showed that organisms were made up of small units, called cells. Robert Hooke subsequently used his primitive microscope to observe many other plant cells. He laid the first, essential stone for the entire field of cell biology. By observing and naming the cell, he gave future scientists a crucial piece of vocabulary and a foundation to build upon.</p>,
  <p key="b1-p-s12-3" style={{ textIndent:28, textAlign:"justify" }}><strong>Anton von Leeuwenhoek</strong> (1632-1723) designed improved microscope and described, for the first time, free living cells (<em>e.g.,</em> bacteria) in 1674. Later, he also described protozoans, red blood corpuscles and human sperm cells.</p>,
  <p key="b1-p-s12-4" style={{ textIndent:28, textAlign:"justify" }}>With the advent of more sophisticated tools and techniques, cell study developed rapidly in the nineteenth century. Few important invensions are mentioned below:</p>,
  <ul key="b1-ul-s12" style={{ margin:"8px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:6 }}>A Scotch botanist <strong>Robert Brown</strong> (1773-1858) in the year 1831, discovered the <strong>nucleus</strong> in an orchid root cell. By this time, it had also been found that the cells were surrounded by some sort of limiting structure, the <strong>cell membrane.</strong></li>
    <li style={{ marginBottom:6 }}>In 1835, a French zoologist <strong>Dujardin</strong> discovered a semifluid living material in certain protozoans and he named it as <strong>sarcode.</strong></li>
    <li style={{ marginBottom:6 }}><strong>Johannes E. Purkinje</strong> in 1840 noted similar material in the plant cells and named it <strong>protoplasm,</strong> 'the first substance.'</li>
  </ul>,
  <div key="b1-figs-12" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
    <Fig key="fig-1-1" src={IMG11} num="Fig. 1.1" caption="A primitive microscope assembled and used by Robert Hooke. Its magnification power was 14-42 times." />
    <Fig key="fig-1-2" src={IMG12} num="Fig. 1.2" caption="Drawing by Robert Hooke (1635-1703) of the microscopic structure of a thin slice of cork tissue, showing tiny cells. From his book Micrographia published in 1665 in London." />
  </div>,
  <ul key="b1-ul-s12b" style={{ margin:"8px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:6 }}>In 1838, a German botanist <strong>M.J. Schleiden</strong> announced that all plants were composed of cells. A year later, in 1839, a German zoologist <strong>T. Schwann</strong> stated that all animals were also formed of cells. Schwann found that, except for the cell wall, the animal cells more or less resembled the plant cells in having a nucleus located in a clear substance bounded by a cell membrane. These findings formed the basis of <strong>cell theory.</strong></li>
    <li style={{ marginBottom:6 }}>In 1858, another German biologist <strong>Rudolph Virchow</strong> presented the idea '<em>Omnis Cellula e Cellula</em>' which means that <strong>all living cells arise from the pre-existing cells.</strong> This led to the modification of the cell theory.</li>
    <li style={{ marginBottom:6 }}><strong>Haeckel,</strong> in 1866, reported that the nucleus stores and transmits hereditary information.</li>
    <li style={{ marginBottom:6 }}><strong>Electron microscope</strong> was discovered by Knoll and Ruska in 1940. Discovery of electron microscope made it possible for us to observe and understand the complex structure of the cell and its various cell organelles, <em>i.e.,</em> its <strong>ultrastructure.</strong></li>
  </ul>,
  <p key="b1-p-s12-5" style={{ textIndent:28, textAlign:"justify" }}>We now know that the really important parts of the cell are its contents and the cell may or may not have a cell wall. Thus, the term cell is a <strong>misnomer.</strong> However, the word 'cell' is still used to describe the structural and functional unit of life.</p>,
  <KBBox key="kb-celltheory">
    <p style={{ margin:"0 0 6px", fontSize:14, fontWeight:700 }}>Cell theory was presented by Schleiden (1838) and Schwann (1839). Accordingly, all plants and animals are composed of cells and the cell is the basic unit of life.</p>
    <p style={{ margin:"0 0 6px", fontSize:14 }}>Later discoveries led to the modification of cell theory. Modified cell theory is termed as <strong>cell principle</strong> or <strong>modern cell theory.</strong></p>
    <p style={{ margin:"0 0 6px", fontSize:14, fontWeight:700 }}>Modern cell theory postulates that —</p>
    <ol style={{ paddingLeft:24, fontSize:14, lineHeight:1.8, margin:0, fontWeight:700 }}>
      <li>All living beings are composed of minute units, the cells;</li>
      <li>A cell is a mass of protoplasm containing a nucleus and bounded by a cell membrane, and in many cases by a cell wall also;</li>
      <li>All cells are basically alike in structure and metabolic activities;</li>
      <li>The functions of an organism as a whole is the result of the activities and interactions of the constituent cells; and</li>
      <li>All living cells arise from the pre-existing cells.</li>
    </ol>
  </KBBox>,

  <SubHd key="sub-s121" id="s121" label="1.2.1" title="Instruments for Studying Cells" />,
  <p key="b1-p-s121-1" style={{ textIndent:28, textAlign:"justify" }}>Cells are microscopic in structure and cannot be seen with a naked eye. They are studied with the help of instruments, called <strong>microscopes.</strong> These provide enlarged images of cells and the structures they contain.</p>,
  <p key="b1-p-s121-2" style={{ textAlign:"center", fontWeight:700, fontSize:14 }}>Microscope is the most common optical instrument used to observe cellular organisation of living organisms.</p>,
  <p key="b1-p-s121-3" style={{ textAlign:"justify" }}>There are many different kinds of microscopes which can be broadly divided into two categories — <strong>(i) Light microscope</strong> and <strong>(ii) Electron microscope.</strong></p>,
  <p key="b1-p-s121-4" style={{ textIndent:28, textAlign:"justify" }}><strong>Light microscope.</strong> It is commonly used in the laboratory. It uses glass lenses and visible light that illuminates and passes through a specimen. Two kinds of light microscopes used frequently in the laboratory are — (<em>a</em>) <strong>simple microscope</strong> and (<em>b</em>) <strong>compound microscope.</strong></p>,
  <p key="b1-p-s121-5" style={{ textIndent:28, textAlign:"justify" }}><strong>Simple microscope</strong> is just magnifying glass. In fact, human eye works as an optical instrument and the eye lens acts as a simple lens. The resolving power of a healthy young human eye is approximately 0·1 mm at 25 cm viewing distance. Any object smaller than this cannot be viewed by naked eyes. A microscope, is therefore, used for enlargement and magnifying the smaller object so that it becomes visible to human eye.</p>,
  <p key="b1-p-s121-6" style={{ textIndent:28, textAlign:"justify" }}>A <strong>compound microscope</strong> (Fig. 1.3) is one in which the magnification takes place in two stages. It consists of two lens units—the first, called 'objective', produces a primary magnified image and the second lens unit, called 'eye piece' or 'ocular' magnifies the first image. Such microscopes employing two lens units in working position at one time are called monocular monoobjective microscopes.</p>,
  <p key="b1-p-s121-7" style={{ textIndent:28, textAlign:"justify" }}><strong>Electron microscope</strong> (Fig. 1.4): It is a very large instrument that helps in observing sub-cellular structures which cannot be seen with light microscope. It uses very high voltage electricity. For its working, internal vacuum is essential. It uses electromagnets instead of glass lenses and beam of electrons instead of light. Ultra-thin and dry section of material (under study) is impregnated with some metal to enhance the contrast and the image is obtained on a photographic plate or florescent screen. Magnification is 1,00,000 to 5,00,000 times.</p>,
  <div key="b1-figs-micro" style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
    <Fig key="fig-1-3" src={IMG13} num="Fig. 1.3" caption="Light microscope." />
    <Fig key="fig-1-4" src={IMG14} num="Fig. 1.4" caption="Electron microscope. It uses a beam of electrons for illumination. Magnification of over 1,00,000 times may be obtained." />
  </div>,
  <div key="feat-compound-micro" style={{ border:"1.5px solid #888", margin:"18px 0", padding:"12px 16px" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:800, textAlign:"center", textDecoration:"underline", fontSize:14, margin:"0 0 8px" }}>STUDY OF LIGHT OR COMPOUND MICROSCOPE</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>The simple student's microscope, generally used in the biological laboratory to observe tiny cells, is called compound microscope (Fig. 1.3). Such a microscope uses light (generally sunlight) to illuminate the object or specimen under study, and hence it is also called light microscope. It has a magnification of 100-1500. To magnify the object, power of objective (10X, 40X, 100X) and eye piece (10X, 15X) is used.</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>The light or compound microscope is a strong, heavy metal instrument. It comprises a U-shaped base having two vertical pillars. A curved arm is movably joined to the pillars to hold the microscope. The arm can be bent over the pillars at inclination joint to suit the viewer. The upper part of the arm holds the movable body tube. The other parts of the microscope are reflector, condenser lens, stage, objective lens, ocular lens (eye piece) and adjustment screws (coarse and fine).</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:0 }}>A glass slide, containing the object or specimen under study, is kept on a stage under an objective lens. Light is then passed through the object/specimen with the help of a mirror (reflector) and the condenser from below the stage. A magnified, sharp image of the object/specimen can thus be seen through the <strong>ocular lens</strong> (eye piece) by focussing the <strong>coarse adjustment</strong> and <strong>fine adjustment knobs</strong> properly. We can increase or decrease the magnification of the image by changing the objective lens of high or low power.</p>
  </div>,

  <SecHd key="sec-s13" id="s13" label="1.3" title="Unicellular and Multicellular Organisms" />,
  <p key="b1-p-s13-1" style={{ textIndent:28, textAlign:"justify" }}>All living organisms are composed of one or more cells. Accordingly, they are grouped into two categories: <strong>1. Unicellular organisms &nbsp;&nbsp; 2. Multicellular organisms</strong></p>,
  <p key="b1-p-s13-2" style={{ textIndent:28, textAlign:"justify" }}><strong>1. Unicellular organisms.</strong> These are the organisms wherein a single cell constitutes the whole organism. <em>Amoeba, Paramecium, Chlamydomonas</em> (all protists), bacteria (prokaryotes) and yeasts (fungi) are few examples of such organisms. These single celled organisms live independently in nature and their single cells are capable of performing all the life processes such as obtaining food, respiration, metabolism, excretion, growth and reproduction.</p>,
  <p key="b1-p-s13-3" style={{ textIndent:28, textAlign:"justify" }}><strong>2. Multicellular organisms.</strong> These organisms are formed of many cells. In fact, number of cells group together and acquire different functions to form various body parts in multicellular organisms. Examples of multicellular organisms are fungi, plants and animals including human beings. In fact, the multicellular organism has come into existence from a single cell. For example, fertilization of egg with sperm results in the formation of a single celled zygote. This single cell divides and redivides in various planes to produce a multicellular body. The cells further divide to produce different organs of a multicellular organism. Thus, all cells arise from pre-existing cells and confirm the <strong>theory of cell lineage</strong> proposed by <strong>R. Virchow</strong> (1858). According to this theory, "all cells arise from pre-existing cells."</p>,
  <p key="b1-p-s13-4" style={{ textIndent:28, textAlign:"justify" }}>All cells, whether they exist as independent unicellular organisms or as part of a multicellular organism, have certain structures in common to carry out basic functions essential for the survival of the cells.</p>,
  <p key="b1-p-s13-5" style={{ textIndent:28, textAlign:"justify" }}>Every living cell has the capacity to perform certain basic functions that are characteristic of all living organisms. All multicellular organisms including human beings, show <strong>division of labour.</strong> It means that different parts of a multicellular organism perform different functions. In the same way, every living cell has got division of labour. In fact, each cell possesses specific components within it known as <strong>cell organelles.</strong> Each kind of cell organelle performs a special function. For instance, (<em>i</em>) making of new material in the cell such as protein synthesis by <strong>ribosomes</strong> and food synthesis (carbohydrate) by <strong>chloroplasts,</strong> (<em>ii</em>) energy generation in the form of ATP (adenosine triphosphate) by <strong>mitochondria,</strong> (<em>iii</em>) clearing up the waste substances from the cell by <strong>lysosomes</strong> etc.</p>,
  <p key="b1-p-s13-6" style={{ textAlign:"center", fontWeight:700, fontSize:14 }}>Interestingly, all cells are organised to have the same basic structure, no matter what their function is or what organism they are found in.</p>,
  <Table11 key="tbl-1-1" />,

  <SecHd key="sec-s14" id="s14" label="1.4" title="Shape, Size and Number of Cells" />,
  <p key="b1-p-s14-1" style={{ textIndent:28, textAlign:"justify" }}>Cells vary in shape, size and number. Unicellular organisms are identified on the basis of their shape. However, some unicellular organisms (<em>e.g., Amoeba</em>) are irregular in shape. In multicellular organisms, the shape of cells depends upon their position in the body, specific function which they perform and their interaction with neighbouring cells. For instance, the distinct shapes of <strong>neurons</strong> and <strong>macrophages</strong> in human body are directly related to their specialized functions. <strong>Neurons</strong> are the structural and functional units of nervous system. They are specialized for intercellular communication over potentially long distances. Each neuron has a long, fibre-like structure designed for rapid signal transmission. The long structure of neuron ensures minimal loss of signal strength and speed over distance, thereby, maximizing the efficiency of information flow between parts of the body. <strong>Macrophages</strong> are a type of white blood cells, essentially a "Clean-up crew" of the immune system of the body. They are irregular, often amoeboid, in shape. Their irregular shape allows for flexible movement and engulfing debris.</p>,
  <Fig key="fig-1-5" src={IMG15} num="Fig. 1.5" caption="Various cells from the human body" />,
  <p key="b1-p-s14-2" style={{ textIndent:28, textAlign:"justify" }}>Cells also vary in their size. Their dimensions are usually expressed in microns or micrometer (μm) and Angstrom (Å). Most human cells typically range in diameter from 8-25 μm. They are observed under the microscope. The small objects (cells) which can be seen only with the help of microscope are called microscopic in size. However, there are some cells which are either extremely small or extremely large in size.</p>,
  <KBBox key="kb-units">
    <KBHd>Units of Measurement used in Cell Biology</KBHd>
    <MathBlock key="b1-math-1">1 μm (micrometer) = 1/1000 nm or 10<Sup c="−3" /> mm</MathBlock>
    <MathBlock key="b1-math-2">1 nm = 10<Sup c="−3" /> μm or 10<Sup c="−6" /> mm</MathBlock>
    <MathBlock key="b1-math-3">1 Å (Angstrom) = 10<Sup c="−1" /> nm or 10<Sup c="−7" /> mm or 10<Sup c="−10" /> m</MathBlock>
  </KBBox>,
  <p key="b1-p-s14-3" style={{ textIndent:28, textAlign:"justify" }}>For instance, among protozoans, a sporozoite of malarial parasite, <em>Plasmodium vivax,</em> is just 2 μm long. On the other hand, a single-celled marine alga, <em>Acetabularia</em> is about 10 cm long.</p>,
  <p key="b1-p-s14-4" style={{ textIndent:28, textAlign:"justify" }}>Majority of the multicellular organisms have a large body composed of numerous cells. The number of cells in such organisms is correlated to the size of the body. For instance, a human being weighing about 60 kg has about 60 × 10<Sup c="15" /> cells, and the blood (vascular tissue) in human contains about 30 × 10<Sup c="15" /> corpuscles.</p>,

  <SecHd key="sec-s15" id="s15" label="1.5" title="Prokaryotic and Eukaryotic Cells" />,
  <p key="b1-p-s15-1" style={{ textIndent:28, textAlign:"justify" }}>Based on complexity of organisation, cells can be divided into two types: <strong>(i) Prokaryotic cells</strong> and <strong>(ii) Eukaryotic cells.</strong></p>,
  <p key="b1-p-s15-2" style={{ textIndent:28, textAlign:"justify" }}><strong>(i) Prokaryotic cells.</strong> These are simpler and smaller. The cells of some most primitive organisms (<em>e.g.,</em> bacteria and blue-green algae, <em>i.e.,</em> cyanobacteria) lack nuclear membrane around their genetic material and hence are called <strong>prokaryotic cells</strong> or simply <strong>prokaryotes</strong> (G. <em>Pro</em> = before, <em>karyon</em> = nucleus). The genetic material in these cells lies in direct contact with the cytoplasm and is called <strong>nucleoid.</strong> Prokaryotes also do not contain membrane-bound organelles in the cytoplasm. Ribosomes are, however, present. Almost all prokaryotes have a cell wall outside their plasma membrane. This rigid layer provides structural support and protects the cell from bursting if it takes on too much water. It is like an external skeleton. In bacteria, the cell wall is primarily made of <strong>peptidoglycan,</strong> a mesh-like polymer of sugars and amino acids. It acts as a protective covering against antibiotics which otherwise can kill the bacteria. Archaea also have a cell wall but it is made from different materials. A prokaryotic cell is depicted in Fig. 1.6.</p>,
  <Fig key="fig-1-6" src={IMG16} num="Fig. 1.6" caption="A prokaryotic cell." />,
  <p key="b1-p-s15-3" style={{ margin:"8px 0 4px" }}>Prokaryotic cells come in a variety of shapes and sizes:</p>,
  <div key="b1-tbl-prokshapes" style={{ overflowX:"auto", margin:"8px 0 16px" }}>
    <table style={{ borderCollapse:"collapse", width:"70%", fontSize:13, margin:"0 auto" }}>
      <thead><tr><td style={th}>Shape</td><td style={th}>Description</td><td style={th}>Example</td></tr></thead>
      <tbody>
        <tr><td style={td}>Coccus</td><td style={td}>Spherical or ovoid</td><td style={td}><em>Staphylococcus aureus</em></td></tr>
        <tr><td style={td}>Bacillus</td><td style={td}>Rod shaped</td><td style={td}><em>Escherichia coli</em></td></tr>
        <tr><td style={td}>Spirillum</td><td style={td}>Spiral or corkscrew</td><td style={td}><em>Treponema pallidum</em></td></tr>
      </tbody>
    </table>
  </div>,
  <p key="b1-p-s15-4" style={{ textIndent:28, textAlign:"justify" }}><strong>(ii) Eukaryotic cells.</strong> These are larger and more complex cells. The cells of these organisms possess true nucleus bounded by nuclear membrane. Such organisms are called <strong>eukaryotes.</strong> The eukaryotes may be unicellular organisms or multicellular organisms. Examples include protists, fungi, plants and animals. Every eukaryotic cell contains a <strong>plasma membrane, membrane-bound nucleus</strong> containing the genetic material and other membrane-bound <strong>sub-cellular organelles</strong> in the cytoplasm. The organelles divide the cytoplasm into compartments to facilitate specific metabolic functions.</p>,
  <div key="kb-viruses" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0" }}>
    <p style={{ fontSize:14, margin:0, fontWeight:700 }}>Viruses are non-cellular structures. They possess genetic material (DNA or RNA) enclosed in a protein coat. They do not show characteristics of life until they enter a living body. These can be crystallized. Once inside the living organism, they use host's cell machinery to reproduce. Viruses are, therefore, called 'living chemicals'.</p>
  </div>,

  <div key="b1-tbl-prokeukaryo" style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.2. Differences between a Prokaryotic Cell and Eukaryotic Cell.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={th}>Prokaryotic Cell</td><td style={th}>Eukaryotic Cell</td></tr></thead>
      <tbody>
        <tr><td style={td}>1. Generally smaller in size (0·1-5·0 μm).</td><td style={td}>1. Generally larger in size (5-100 μm).</td></tr>
        <tr><td style={td}>2. Nucleoid (genetic material) is not surrounded by a nuclear membrane and is in direct contact with cytoplasm.</td><td style={td}>2. Distinct nucleus is present. Nuclear material is surrounded by a nuclear membrane and is not in direct contact with cytoplasm.</td></tr>
        <tr><td style={td}>3. Contains single chromosome.</td><td style={td}>3. Contains more than one chromosome.</td></tr>
        <tr><td style={td}>4. Nucleolus is absent.</td><td style={td}>4. Nucleolus is present.</td></tr>
        <tr><td style={td}>5. Membrane-bound cell organelles are absent.</td><td style={td}>5. Membrane-bound cell organelles (<em>e.g.,</em> mitochondria, plastids, endoplasmic reticulum, Golgi apparatus, lysosomes etc.) are present.</td></tr>
      </tbody>
    </table>
  </div>,
  <SecHd key="sec-s16" id="s16" label="1.6" title="Detailed Structure of a Eukaryotic Cell (Figs. 1.7 and 1.8)" />,
  <p key="b1-p-s16-1" style={{ textIndent:28, textAlign:"justify" }}>No cell is completely unspecialized so as to be considered a typical cell. Most of the cells have certain common subcellular structures. Therefore, a generalized eukaryotic cell with the common components is described here. A eukaryotic cell has <strong>three</strong> main components:</p>,
  <Fig key="fig-1-7" src={IMG17} num="Fig. 1.7" caption="An animal cell as shown by an electron microscope. This microscope magnifies the objects 600,000 times." />,
  <ol key="b1-ol-s16" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:4 }}>Plasma membrane or cell membrane</li>
    <li style={{ marginBottom:4 }}>Nucleus</li>
    <li style={{ marginBottom:4 }}>Cytoplasm.</li>
  </ol>,
  <p key="b1-p-s16-2" style={{ textIndent:28, textAlign:"justify" }}><strong>1. Plasma membrane</strong> or <strong>cell membrane.</strong> Every cell is enclosed on all sides by a distinct covering, called <strong>plasma membrane</strong> or <strong>cell membrane.</strong> It is living, ultra-thin structure made of lipid and proteins. It keeps the cell contents separated from the external environment. The plasma membrane allows or permits the entry and exit of only selected materials and, hence, is called a <strong>selectively permeable membrane.</strong></p>,
  <Fig key="fig-1-8" src={IMG18} num="Fig. 1.8" caption="A plant cell as shown by an electron microscope." />,
  <p key="b1-p-s16-3" style={{ textIndent:28, textAlign:"justify" }}><strong>2. Nucleus.</strong> Each eukaryotic cell has a deeply stained rounded structure, called <strong>nucleus.</strong> It is located centrally in animal cells but pushed to one side due to large vacuole in plant cells. It is the most conspicuous and the largest organelle of an eukaryotic cell. Nucleus contains genetic material.</p>,
  <p key="b1-p-s16-4" style={{ textIndent:28, textAlign:"justify" }}><strong>3. Cytoplasm.</strong> The fluid and semifluid matrix filled in between the nucleus and the plasma membrane is called the <strong>cytoplasm.</strong> It contains various specialized <strong>cell organelles.</strong> Each cell organelle performs a specific function for the cell. All the components of a cell taken together keep it living. No part can survive if separated from the cell. Important cellular components in a plant cell and animal cell are listed in Table 1.3.</p>,
 <div key="kb-protoplasm" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0" }}>
    <p style={{ fontWeight:700, fontSize:14, margin:"0 0 4px" }}>Protoplasm refers to the contents of the living cell (substances such as water, ions, inorganic and organic compounds) bounded by a plasma membrane.</p>
    <p style={{ fontWeight:700, fontSize:14, margin:0 }}>Protoplasm is usually differentiated into the nucleus and cytoplasm.</p>
  </div>,
  <div key="b1-tbl-cellular" style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.3. Cellular Components of a Plant Cell and Animal Cell.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={th}>Cellular Components</td><td style={th}>Plant Cell</td><td style={th}>Animal Cell</td></tr></thead>
      <tbody>
        <tr><td style={td}>● Cell wall</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center",fontWeight:700}}>Absent</td></tr>
        <tr><td style={td}>● Plasma membrane</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,fontWeight:700}}>● Cytoplasm and cell organelles</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Mitochondria</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Plastids</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center",fontWeight:700}}>Absent</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Endoplasmic reticulum</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Golgi apparatus</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Ribosomes</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Centrioles</td><td style={{...td,textAlign:"center",fontWeight:700}}>Absent</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={{...td,paddingLeft:20}}>Lysosomes</td><td style={{...td,textAlign:"center",fontWeight:700}}>Uncommon</td><td style={{...td,textAlign:"center",fontWeight:700}}>Common</td></tr>
        <tr><td style={td}>● Nucleus</td><td style={{...td,textAlign:"center"}}>Present</td><td style={{...td,textAlign:"center"}}>Present</td></tr>
        <tr><td style={td}>● Vacuole</td><td style={{...td,textAlign:"center",fontWeight:700}}>Large</td><td style={{...td,textAlign:"center",fontWeight:700}}>Small</td></tr>
      </tbody>
    </table>
  </div>,

  <ActivityBox key="act-1-1" num="1.1" sub="To make a temporary stained mount of onion peel and study it under the microscope.">
    <ActHd>Requirements.</ActHd>
    <P2>Onion, glass slides, coverslips, watch glass, forceps, needle, camel hair paint brush, iodine solution, blotting paper.</P2>
    <ActHd>Procedure.</ActHd>
    <P2>Take a small piece from an onion bulb. Carefully, peel off the skin (epidermis) from the concave side (inner layer) of the onion with the help of a forcep. Keep this peel in water in a watch glass to prevent it from getting folded or getting dry. Take a clean glass slide and put a drop of water on it. Now, transfer a small piece of the peel from watch glass to the slide using a camel hair paint brush. Ensure that the peel is perfectly flat on the glass slide. Add few drops of iodine solution on the piece of peel to stain it. Cover the stained peel carefully with coverslip and remove extra stain and water using blotting paper. Be sure that there are no air bubbles under the coverslip. Observe the temporary mount of onion peel under low power and then under high power of light microscope.</P2>
    <Fig key="fig-1-9" src={IMG19} num="Fig 1.9" caption="Technique to mount a sample of onion peel on a microscopic slide." />
    <ActHd>Observations and Conclusion.</ActHd>
    <P2>You will observe large number of cells lying side by side under low power of microscope (Fig. 1.10 A). Under high power, you will notice that each cell has a cell wall, a distinct nucleus and vacuoles in the cytoplasm (Fig. 1.10 B). Thus, temporary stained mount of onion peel has large number of similar, small structures called cells.</P2>
    <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
      <Fig key="fig-1-10A" src={IMG110A} num="Fig. 1.10A" caption="Cells of onion peel (under low power of microscope)." />
      <Fig key="fig-1-10B" src={IMG110B} num="Fig. 1.10B" caption="Cell of onion peel (under high power of microscope)." />
    </div>
    <P2 style={{ textAlign:"center", fontStyle:"italic", marginTop:4 }}>Fig. 1.10. Structure of an onion peel.</P2>
    <P2>Not only onion but all organisms that we see around us are made up of basic building units, called cells. Unicellular organisms, however, live on their own.</P2>
  </ActivityBox>,

  <ActivityBox key="act-1-2" num="1.2" sub="To make temporary stained mounts of leaf peels of maize, mustard, tradescantia (Rheo discolor) and tips of roots of onion and study them under the microscope.">
    <P2>As done in Activity 1.1., you can also prepare temporary mounts of leaf peels of maize, mustard or tradescantia (<em>Rheo discolor</em>) and tip of roots of onion. For instance, you take a red coloured tradescantia leaf (<em>Rheo discolor</em>). Peel off a small segment from the lower surface of the leaf with a sudden jerk and prepare a temporary mount of this peel as done in Activity 1.1. Observe the temporary preparation under the microscope. After performing above activities, answer the following questions:</P2>
    <ol style={{ paddingLeft:24, fontSize:14, lineHeight:1.8 }}>
      <li>Do all cells look alike in terms of shape and size?</li>
      <li>Do all cells look alike in structure?</li>
      <li>Do you find differences among cells from different parts of a plant body? What similarities could you find?</li>
    </ol>
    <ActHd>Observations and Conclusion.</ActHd>
    <P2>You will observe that there are large number of similar, small structures called cells filled with red coloured cell sap. After observing temporary mounts of leaf peels of maize, mustard, tradescantia, tips of roots of onion and even peels of onions of different sizes, you will find that small structures or cells do not look alike in terms of shape and size. However, in terms of structure, all cells look alike, <em>i.e.,</em> all of them are bounded by outer cell wall and inner plasma membrane, possess cell sap and nucleus. Also, cells of different parts of a plant body look different though they are similar in fundamental characteristics.</P2>
  </ActivityBox>,

];

// ── BATCH 2: §1.7 Plasma Membrane + Transport ────────────────

const IMG111 = CONTENT_IMAGES.CONTENT_IMAGE_416D05D92539F1CE0425;
const IMG112 = CONTENT_IMAGES.CONTENT_IMAGE_854C60806F4626A16A48;
const IMG113 = CONTENT_IMAGES.CONTENT_IMAGE_A9C88BD3D422346945A0;
const IMG114 = CONTENT_IMAGES.CONTENT_IMAGE_4D9F70468D99CAF63E56;
const IMG115 = CONTENT_IMAGES.CONTENT_IMAGE_A7D9E60428911B828CB4;
const IMG116 = CONTENT_IMAGES.CONTENT_IMAGE_987DE3DCE4CE73AB1E03;

const Table15 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.5. Differences between Active Transport and Diffusion.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={{ border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" }}>Active Transport</td><td style={{ border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" }}>Diffusion</td></tr></thead>
      <tbody>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>1. It is a rapid process.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>1. It is a slow process.</td></tr>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>2. It can move materials through a biomembrane against the concentration gradient.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>2. It can move materials across a biomembrane down the concentration gradient.</td></tr>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>3. It takes place in one direction only.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>3. It takes place in both directions.</td></tr>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>4. It needs carrier proteins to occur.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>4. It occurs without carrier proteins.</td></tr>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>5. It uses energy of ATP.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>5. It does not use energy.</td></tr>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>6. It brings about selective uptake of materials.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>6. It allows all transmissible molecules to pass through membranes.</td></tr>
        <tr><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>7. It leads to accumulation of materials in the cells.</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>7. It does not accumulate materials in the cells.</td></tr>
      </tbody>
    </table>
  </div>
);

const Table14 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.4. Differences between Diffusion and Osmosis.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={{ border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" }}>Diffusion</td><td style={{ border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" }}>Osmosis</td></tr></thead>
      <tbody>
        {[
          ["1. Diffusion can occur both in air and liquid (water) medium.","1. Osmosis occurs only in liquid medium."],
          ["2. It involves movement of molecules (solids, liquids or gases) from the region of their higher concentration to the region of their lower concentration.","2. It involves movement of solvent molecules only from the region of their higher concentration to the region of their lower concentration."],
          ["3. It can occur without or through a semipermeable membrane.","3. It always takes place through a semipermeable membrane."],
          ["4. It equalizes the concentration of diffusable molecules throughout the medium.","4. It does not equalize the concentration of solvent molecules in the medium involved."],
          ["5. It is dependent upon the kinetic energy of the molecules of diffusing substance only.","5. Though it is the diffusion of solvent molecules only, yet it is influenced by the presence of solutes in the system."],
        ].map(([a,b],i) => (
          <tr key={i}><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>{a}</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>{b}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Table16 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.6. Differences between Pinocytosis and Phagocytosis.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={{ border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" }}>Pinocytosis</td><td style={{ border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" }}>Phagocytosis</td></tr></thead>
      <tbody>
        {[
          ["1. It is the intake of extracellular fluid droplets.","1. It is the intake of extracellular particles."],
          ["2. Cell membrane invaginates to take up the material.","2. Cell membrane grows around the particle as pseudopodia."],
          ["3. Microfilaments play no role in endocytosis.","3. Microfilaments play an important role in phagocytosis."],
          ["4. It is a nutritive process.","4. It is a nutritive and defensive process."],
          ["5. Pinocytotic vesicles are only 0·1 μm wide.","5. Phagocytotic vesicles are 1 to 2 μm or more wide."],
        ].map(([a,b],i) => (
          <tr key={i}><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>{a}</td><td style={{ border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 }}>{b}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

const content_b2 = [
  <SecHd key="sec-s17" id="s17" label="1.7" title="Plasma Membrane or Cell Membrane" />,
  <p key="b2-p-s17-1" style={{ textIndent:28, textAlign:"justify" }}>Each cell (prokaryotic as well as eukaryotic) is surrounded by a covering called <strong>plasma membrane</strong> or <strong>plasmalemma</strong> or <strong>cell membrane.</strong> Also, most cell organelles in eukaryotic cells (<em>e.g.,</em> mitochondria, plastids, Golgi apparatus, lysosomes, endoplasmic reticulum, peroxisomes, vacuoles etc.) are enclosed by subcellular unit membranes. These membranes, thus, compartmentalise the cell. However, neither the cell nor the compartments in it are totally isolated from the surrounding medium. The membranes, in fact, allow continuous flow of selected materials across them as required from time to time.</p>,
  <div key="kb-permeability" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"16px 0" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, textAlign:"center", textDecoration:"underline", fontSize:13.5, margin:"0 0 8px" }}>KINDS OF PERMEABILITY</p>
    <p style={{ fontSize:14, margin:"0 0 6px" }}><strong>1. Impermeable.</strong> If a membrane does not allow both solvent and solute molecules to pass through it, it is called impermeable membrane, <em>e.g.,</em> cuticle layer.</p>
    <p style={{ fontSize:14, margin:"0 0 6px" }}><strong>2. Permeable.</strong> If a membrane allows both solvent and solute molecules to pass through it freely, the membrane is called permeable, <em>e.g.,</em> primary cell wall.</p>
    <p style={{ fontSize:14, margin:"0 0 6px" }}><strong>3. Semi-permeable.</strong> If a membrane allows penetration of only solvent molecules but not the solute particles, it is called semipermeable, <em>e.g.,</em> artificial vapour membrane.</p>
    <p style={{ fontSize:14, margin:0 }}><strong>4. Selectively-permeable.</strong> If a membrane allows penetration of solvent freely but selects the passage of specific solute particles, it is called selectively-permeable membrane, <em>e.g.,</em> plasma membrane or cell membrane.</p>
  </div>,

  <SubHd key="sub-s171" id="s171" label="1.7.1" title="Molecular Structure" />,
  <p key="b2-p-s171-1" style={{ textIndent:28, textAlign:"justify" }}>Plasma membrane is a living, ultra-thin, elastic, selectively permeable membrane that appears as a mere line under the light microscope. However, its detailed molecular structure can be studied under an electron microscope. Basically all the plasma membranes are composed of proteins, lipids and small fractions of carbohydrates. Fine structure of plasma membrane, as revealed by electron microscopic studies, appeared to be three layered (trilaminar membrane).</p>,
  <p key="b2-p-s171-2" style={{ textIndent:28, textAlign:"justify" }}><strong>• Lamellar Model.</strong> This model was proposed by Danielli and Davson in 1935 and J.D. Robertson in 1959 to explain the structural organization of plasma membrane. According to these scientists, the plasma membrane has 3-layers (dark-light-dark). A central light lipid bilayer is sandwiched between two protein monolayers (P-L-L-P).</p>,
  <p key="b2-p-s171-3" style={{ textIndent:28, textAlign:"justify" }}><strong>• Fluid Mosaic Model.</strong> This model is the most recent and accepted model proposed by Singer and Nicolson in 1972. According to this model, the cell membrane is made up of a lipid bilayer and two types of protein molecules. The lipid bilayer forms highly viscous fluid in which the two types of protein molecules (<strong>intrinsic proteins</strong> and <strong>extrinsic proteins</strong>) are organized in a mosaic manner. <strong>Intrinsic proteins</strong> are embedded in the lipid bilayer incompletely or completely, and the <strong>extrinsic proteins</strong> occur superficially (Fig. 1.11).</p>,
  <Fig key="fig-1-11" src={IMG111} num="Fig. 1.11" caption="Structural detail of plasma membrane according to Fluid Mosaic Model" />,
  <p key="b2-p-s171-4" style={{ textAlign:"center", fontWeight:700, fontSize:14 }}>Fluid mosaic model provides satisfactory explanation of the structure and functions of plasma membrane.</p>,

  <SubSubHd key="sub-s172" id="s172" label="1.7.2" title="Functions" />,
  <ol key="b2-ol-s172" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li>It gives form to the cell.</li>
    <li>It maintains individuality of the cell.</li>
    <li>It keeps the cell contents in place and prevents their mixing with the extracellular materials.</li>
    <li>It protects the cell from injury.</li>
    <li>It is <strong>selectively permeable,</strong> <em>i.e.,</em> it regulates the flow of selected materials into and out of the cell.</li>
    <li>It forms organelles within the cytoplasm.</li>
    <li>Its junctions keep the cells together.</li>
  </ol>,

  <SubHd key="sub-s173" id="s173" label="1.7.3" title="Transport of Materials Across Cell Membrane" />,
  <p key="b2-p-s173-1" style={{ textIndent:28, textAlign:"justify" }}>In order to perform various life activities, all cells must take up and turn out materials through the cell membrane. The plasma membranes act as physical barriers between the cell and its surrounding environment and between the cell organelles and the surrounding cytoplasm.</p>,
  <p key="b2-p-s173-2" style={{ textIndent:28, textAlign:"justify" }}>The cell membranes are not freely permeable, <em>i.e.,</em> they do not allow movement of all kinds of substances across them. Instead, these are <strong>selectively permeable,</strong> <em>i.e.,</em> they allow the entry or exit of only selected materials. Thus, <strong>selective permeability of plasma membrane enables the cell to maintain homeostasis, <em>i.e.,</em> a constant internal environment inspite of the changes outside it.</strong></p>,
  <div key="kb-selective-perm" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"16px 0" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, textAlign:"center", textDecoration:"underline", fontSize:13.5, margin:"0 0 8px" }}>ADVANTAGES OF SELECTIVE PERMEABILITY</p>
    <p style={{ fontSize:14, margin:"0 0 4px", fontWeight:700 }}>Selective permeability of plasma membrane ensures that</p>
    <ol style={{ paddingLeft:24, fontSize:14, lineHeight:1.8, margin:"0 0 8px", fontWeight:700, listStyleType:"decimal" }}>
      <li>useful molecules enter the cell,</li>
      <li>metabolic intermediates remain within the cell, and</li>
      <li>secretions and wastes leave the cell.</li>
    </ol>
    <p style={{ fontSize:14, margin:"0 0 4px", fontWeight:700 }}>• The substances generally drawn in the cell include:</p>
    <p style={{ fontSize:14, margin:"0 0 4px", paddingLeft:12 }}>(<em>i</em>) raw materials for metabolism, viz., food stuffs, water, salts and oxygen; and</p>
    <p style={{ fontSize:14, margin:"0 0 8px", paddingLeft:12 }}>(<em>ii</em>) regulatory substances, <em>e.g.,</em> vitamins and hormones.</p>
    <p style={{ fontSize:14, margin:"0 0 4px", fontWeight:700 }}>• The substances generally turned out of the cells include:</p>
    <p style={{ fontSize:14, margin:0, paddingLeft:12 }}>(<em>i</em>) the products of metabolism, namely, nitrogenous wastes and carbon dioxide; and (<em>ii</em>) secretions.</p>
  </div>,
  <p key="b2-p-s173-3" style={{ textIndent:28, textAlign:"justify" }}>Cell membranes allow the movement of different materials across them differently. Following mechanisms are involved in the entry or exit of various materials: <strong>I. Passive Transport. &nbsp;&nbsp; II. Active Transport. &nbsp;&nbsp; III. Bulk Transport.</strong></p>,

  <p key="b2-p-passivet" style={{ textIndent:28, textAlign:"justify" }}><strong>I. Passive Transport of Materials.</strong> Passive transport of materials is slow and does not expend energy. It occurs down the concentration gradient and does not use carrier proteins. Only small molecules (<em>e.g.,</em> water, gases, ions) pass through the plasma membrane by passive transport. It is of two types: <strong>1. Diffusion.</strong> and <strong>2. Osmosis.</strong></p>,

  <p key="b2-p-diffusion-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:14, color:"#c0126a", margin:"12px 0 6px" }}>1. Diffusion.</p>,
  <p key="b2-p-diff-1" style={{ textIndent:28, textAlign:"justify" }}>Very small-sized substances such as molecules and ions, water, gases (<em>e.g.,</em> oxygen, carbon dioxide) etc. generally move across the plasma membrane by a process called diffusion.</p>,
  <DefBox key="def-diffusion">The process by which a substance uniformly spreads into another substance by random movement of its particles from a region of higher concentration to a region of its lower concentration due to their kinetic energy is called <strong>diffusion.</strong></DefBox>,
  <p key="b2-p-diff-2" style={{ textIndent:28, textAlign:"justify" }}>It is faster in gaseous phase than in liquid phase or solid phase.</p>,
  <div key="kb-diffusion-demo" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0" }}>
    <p style={{ fontSize:14, margin:0, fontWeight:700 }}>Diffusion can easily be demonstrated in classroom by performing a simple activity. Take a glass beaker or a glass tumbler more than half filled with clear water. Now put few crystals of copper sulphate or few drops of ink in water and observe. You would find that crystals of copper sulphate or ink molecules diffuse into water slowly until these molecules get uniformly spread in water turning it into a coloured solution (Fig. 1.12).</p>
  </div>,
  <Fig key="fig-1-12" src={IMG112} num="Fig. 1.12" caption="Diagram showing diffusion. Copper sulphate crystals placed in beaker (A); These progressively diffuse through water in beakers (B) and (C)." />,
  <p key="b2-p-diff-3" style={{ textIndent:28, textAlign:"justify" }}>Similar phenomena, as depicted in above activity, occur in our body cells. For instance, carbon dioxide (CO<Sub c="2" />) is produced as an end product of metabolism in cells and its concentration inside the cells becomes high. However, the concentration of CO<Sub c="2" /> in the external environment of cells is low. Due to difference in the concentration of CO<Sub c="2" /> between the inside and outside of the cells, CO<Sub c="2" /> moves out from the region of its higher concentration to the region of its low concentration through plasma membrane by diffusion. Similarly, oxygen enters into the cells by diffusion.</p>,
  <p key="b2-hd-sig-diff" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Significance of diffusion</p>,
  <ol key="b2-ol-sig-diff" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li style={{ marginBottom:4 }}>Diffusion helps in the distribution of various substances throughout the cytoplasm of the cell without much delay.</li>
    <li style={{ marginBottom:4 }}>It helps in the exchange of respiratory gases (oxygen and carbon dioxide) between the body cells and their environment.</li>
    <li style={{ marginBottom:4 }}>Various materials such as gases, liquids and solids dissolve in the medium, <em>i.e.,</em> air or liquid by diffusion.</li>
    <li style={{ marginBottom:4 }}>Loss of water in vapours form from the aerial parts of the plants (transpiration) occurs through diffusion.</li>
    <li>Flowers of plants spread aroma through diffusion. It attracts insects and other animals for pollination.</li>
  </ol>,

  <p key="b2-p-osmosis-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:14, color:"#c0126a", margin:"16px 0 6px" }}>2. Osmosis</p>,
  <p key="b2-p-osm-1" style={{ textIndent:28, textAlign:"justify" }}>If two solutions having different concentrations of a solute are separated by a semipermeable or selectively permeable membrane, <em>i.e.,</em> a membrane which is permeable to the small molecules (<em>e.g.,</em> water molecules) and not permeable to large molecules of dissolved substances (<em>e.g.,</em> sugar molecules), then a different type of diffusion occurs. In such a case, one would observe movement of solvent from the region of its higher concentration to the region of its lower concentration across the semipermeable membrane. Such a phenomenon is called osmosis.</p>,
  <DefBox key="def-osmosis">The diffusion of water or solvent through a semipermeable membrane from a solution of lower concentration of solutes to a solution of higher concentration of solutes to which the membrane is relatively impermeable, is called <strong>osmosis.</strong></DefBox>,
  <p key="b2-p-osm-2" style={{ margin:"8px 0 4px" }}><strong>• Forms of osmosis.</strong> Osmosis is of two types:</p>,
  <p key="b2-p-osm-endo" style={{ textIndent:28, textAlign:"justify" }}><strong>Endosmosis.</strong> It is the entry of water molecules into the cells through semipermeable plasma membrane when surrounded by hypotonic solution.</p>,
  <p key="b2-p-osm-exo" style={{ textIndent:28, textAlign:"justify" }}><strong>Exosmosis.</strong> It is the exit of water molecules from the cells through semipermeable plasma membrane when surrounded by hypertonic solution.</p>,

  <div key="act-osm-demo" style={{ border:"1.5px solid #888", margin:"18px 0", padding:"0" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, textAlign:"center", textDecoration:"underline", fontSize:13.5, padding:"8px 12px 4px", margin:0 }}>• To demonstrate osmosis in the laboratory.</p>
    <div style={{ padding:"4px 16px 12px" }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Requirements.</p>
      <p style={{ margin:"0 0 8px", fontSize:14 }}>Funnel fitted with a semi-permeable membrane, beaker, sugar solution, water.</p>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Procedure.</p>
      <p style={{ margin:"0 0 8px", fontSize:14 }}>Take sugar solution in a funnel fitted with a semipermeable membrane (fish bladder or egg membrane) up to mark 'A' and place it in an inverted position in a beaker filled with clean water as shown in Fig. 1.13. After some time, observe the level of sugar solution in the funnel.</p>
      <Fig key="fig-1-13" src={IMG113} num="Fig. 1.13" caption="Experiment to explain the process of osmosis." />
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Result.</p>
      <p style={{ margin:"0 0 8px", fontSize:14 }}>You would find that the sugar solution has risen from level 'A' to a new level 'B'.</p>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Explanation and Conclusion.</p>
      <p style={{ margin:"0 0 8px", fontSize:14 }}>Sugar solution in the funnel and water in the beaker are separated by a semipermeable membrane. The fitted membrane is permeable to small water molecules but is relatively impermeable to large sugar molecules dissolved in water. Due to difference in the concentration of solute on the two sides of semipermeable membrane, water molecules have moved from the solution having lower concentration of solutes (<em>e.g.,</em> water) to the solution having higher concentration of solutes (<em>e.g.,</em> sugar solution) due to osmosis. As a result, sugar solution has risen to new level 'B'.</p>
    </div>
  </div>,

  <p key="b2-p-osm-rbcs" style={{ textIndent:28, textAlign:"justify" }}>Let us now study the response of animal cells (<em>e.g.,</em> red blood cells or R.B.Cs) when they are put in a salt solution or glucose solution. We can use three different concentrations of salt or glucose solutions with reference to solute concentration in red blood cells. These solutions are termed as:</p>,
  <p key="b2-p-isotonic" style={{ textIndent:28, textAlign:"justify" }}><strong>1. Isotonic solution.</strong> Isotonic solution is one in which the concentration of water and solutes is the same as in the cytoplasm of the red blood cells. 0·9% salt solution and 5% glucose solution are isotonic for red blood cells.</p>,
  <p key="b2-p-hypotonic" style={{ textIndent:28, textAlign:"justify" }}><strong>2. Hypotonic solution.</strong> Hypotonic solution is one in which the concentration of solutes is less and concentration of water is more as compared to inside the red blood cells. 0·66% salt solution and 0·2% glucose solution are hypotonic for red blood cells.</p>,
  <p key="b2-p-hypertonic" style={{ textIndent:28, textAlign:"justify" }}><strong>3. Hypertonic solution.</strong> Hypertonic solution is one in which the concentration of solutes is more and the concentration of water is less as compared to in the cytoplasm of the red blood cells. 1·25% salt solution and 10% glucose solution are hypertonic for red blood cells.</p>,

  <div key="act-rbc-osm" style={{ border:"1.5px solid #888", margin:"18px 0", padding:"0" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, textAlign:"center", textDecoration:"underline", fontSize:13.5, padding:"8px 12px 4px", margin:0 }}>• Demonstration of osmosis with human R.B.Cs (red blood cells)</p>
    <div style={{ padding:"4px 16px 12px" }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Requirements.</p>
      <p style={{ margin:"0 0 8px", fontSize:14 }}>Glass slides, disposable needle, Ringer's solution, water, concentrated salt solution (hypertonic solution), cotton, rectified spirit.</p>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Procedure.</p>
      <p style={{ margin:"0 0 8px", fontSize:14 }}>As directed by your class teacher, clean ring finger of your left hand with rectified spirit and then prick it with a disposable needle. Press the finger slightly and take one drop of blood each on the three clean glass slides marked A, B and C. Now, add (<em>i</em>) a drop of Ringer's solution (isotonic solution) on drop of blood on slide A; (<em>ii</em>) a drop of water (hypotonic solution) on drop of blood on slide B; and (<em>iii</em>) a drop of concentrated salt solution (hypertonic solution) on drop of blood on slide C. Observe all the three slides under the light microscope.</p>
      <Fig key="fig-1-14" src={IMG114} num="Fig. 1.14" caption="Demonstration of osmosis with human R.B.Cs (red blood cells) when placed in isotonic, hypotonic and hypertonic solutions." />
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Observations.</p>
      <P2>(<em>i</em>) On slide A, you will notice normal circular, biconcave, non-nucleated red blood cells.</P2>
      <P2>(<em>ii</em>) On slide B, you will observe swollen or bursted (haemolysed) red blood cells.</P2>
      <P2>(<em>iii</em>) On slide C, you will find shrunken (crenated) red blood cells.</P2>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>Explanation and Conclusion.</p>
      <P2>(<em>i</em>) On slide A, red blood cells are placed in isotonic Ringer's solution, which has the same concentration of water and solutes as is present in the cytoplasm of the red blood cells. Therefore, the small water molecules leave or enter the red blood cells at the same rate and there is no net movement of water across the plasma membranes. Therefore, the red blood cells appear normal circular, biconcave and non-nucleated.</P2>
      <P2>(<em>ii</em>) On slide B, red blood cells are placed in water (hypotonic solution) which has lesser concentration of solutes and greater concentration of water than in the cytoplasm of the red blood cells. Therefore, due to osmosis, more water molecules go inside the red blood cells. Consequently, red blood cells swell up and burst (haemolysed).</P2>
      <P2>(<em>iii</em>) On slide C, red blood cells are placed in hypertonic solution (concentrated salt solution) which has greater salt-concentration and less water concentration than in the cytoplasm of the red blood cells. Therefore, red blood cells lose more water into the surrounding medium. Consequently, they shrink and appear wrinkled (crenated).</P2>
    </div>
  </div>,

  <p key="b2-p-oex-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Other Examples of Osmosis</p>,
  <ol key="b2-ol-osmex" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li style={{ marginBottom:4 }}>Fresh water unicellular organisms (<em>e.g., Amoeba, Paramecium</em>) continuously gain water in their bodies due to osmosis. These organisms have mechanisms (<em>e.g.,</em> contractile vacuoles) to throw out excess of water from their bodies.</li>
    <li style={{ marginBottom:4 }}>Most plant cells have the tendency to gain water due to osmosis.</li>
    <li style={{ marginBottom:4 }}>Absorption of water by the plant roots from the soil through root hairs is also an example of osmosis.</li>
    <li style={{ marginBottom:4 }}>Certain plant movements (<em>e.g.,</em> seismonastic movements in 'touch-me-not' plant) occur due to loss or gain of water.</li>
    <li style={{ marginBottom:4 }}>Stomata are present in the leaves. They open and close at different times of the day due to osmotic movements of water.</li>
    <li>In plants, cells, tissues and soft organs (leaves, young shoots, flowers) maintain turgidity or stretched form due to osmotic absorption of water.</li>
  </ol>,

  <Table14 key="tbl-1-4" />,

  <ActivityBox key="act-1-3" num="1.3" sub="Demonstration of osmosis with hen's egg.">
    <ActHd>Requirements.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Two hen's eggs, two beakers, dilute HCl, water and concentrated salt solution.</p>
    <ActHd>Procedure.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Take two hen's eggs and remove their egg shells by putting them in dilute hydrochloric acid (HCl). These two processed eggs are now enclosed by thick outer skin called <strong>shell membrane.</strong> (<em>i</em>) Put one processed egg in pure water in a beaker and observe for 3-5 minutes. (<em>ii</em>) Put other processed egg in concentrated salt solution in other beaker and observe for 5 minutes.</p>
    <ActHd>Observations.</ActHd>
    <P2>(<em>i</em>) First egg, placed in pure water, swells up.</P2>
    <P2>(<em>ii</em>) Second egg, placed in concentrated salt-solution, shrinks.</P2>
    <ActHd>Explanation and Conclusion.</ActHd>
    <P2>(<em>i</em>) In the first case, the processed egg is kept in hypotonic solution (pure water). Due to osmosis, more water molecules move into the egg through semipermeable shell membrane. Consequently, the processed egg swells up.</P2>
    <P2>(<em>ii</em>) In the second case, the processed egg is kept in hypertonic solution (concentrated salt solution). Due to osmosis, the egg contents lose water to the surrounding hypertonic solution. Consequently, the processed egg shrinks.</P2>
  </ActivityBox>,

  <ActivityBox key="act-1-4" num="1.4" sub="Demonstration of osmosis with raisins and apricots.">
    <ActHd>Requirements.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Dried raisins and apricots, beakers, pure water, concentrated salt or sugar solution.</p>
    <ActHd>Procedure.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Take few dried raisins and apricots. Put them in pure water in a beaker and leave them for some time. Observe any change that occurs in dipped raisins and apricots. Now take these raisins and apricots out of water and put them in concentrated sugar solution (or salt solution) in another beaker. Observe them after sometime.</p>
    <ActHd>Observations.</ActHd>
    <P2>Dried raisins and apricots, when put in pure water for sometime, swell up. When these swollen raisins and apricots are put in concentrated sugar solution (or salt-solution), they again shrink after sometime.</P2>
    <ActHd>Explanation and Conclusion.</ActHd>
    <P2>Pure water has lesser concentration of solutes and greater concentration of water than inside the dried raisins and apricots. Therefore, due to endosmosis, more water molecules move inside the dried raisins and apricots. Consequently, dried raisins and apricots swell up. Concentrated sugar or salt solution is a hypertonic solution which has higher concentration of solutes and lesser concentration of water than inside the swollen raisins and apricots. Therefore, when swollen raisins and apricots are put in concentrated sugar or salt solution, they quickly lose water to the surrounding medium. Consequently, due to exosmosis, swollen raisins and apricots again shrink.</P2>
  </ActivityBox>,

   <p key="b2-p-activet" style={{ textIndent:28, textAlign:"justify" }}><strong>II. Active Transport of Materials.</strong> This type of transport across plasma membrane is rapid and requires the use of energy in the form of ATP. It usually occurs against the concentration gradient and involves the use of carrier proteins. Glucose, amino acids and some ions (<em>e.g.,</em> Na<Sup c="+" /> and K<Sup c="+" />) pass through the plasma membrane by active transport or cotransport.</p>,
  <Table15 key="tbl-1-5" />,

  <p key="b2-p-bulkt" style={{ textIndent:28, textAlign:"justify" }}><strong>III. Bulk Transport of Materials.</strong> It involves transport of large amount of substances (macromolecules, lipid droplets and solid food particles) across the plasma membrane by utilizing energy. Special processes are involved in the transport of such large quantities of materials. These include: <strong>1. Endocytosis</strong> (Pinocytosis and Phagocytosis). <strong>2. Exocytosis.</strong></p>,

  <p key="b2-p-endocytosis-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:14, color:"#c0126a", margin:"14px 0 6px" }}>1. Endocytosis</p>,
  <p key="b2-p-endo-1" style={{ textIndent:28, textAlign:"justify" }}>Endocytosis is the process by which animals engulf food and other substances from external medium by plasma membrane. In simple way, the term 'endocytosis' refers to invagination of a small region of plasma membrane, and ultimately forming an intracellular membrane-bound vesicle. For instance, a unicellular <em>Amoeba</em> acquires its food through this process. Depending upon the intake of fluid droplet or solid particles, endocytosis is of two types: <strong>(i) Pinocytosis</strong> and <strong>(ii) Phagocytosis.</strong></p>,
  <p key="b2-p-pino-1" style={{ textIndent:28, textAlign:"justify" }}><strong>(i) Pinocytosis.</strong> It is the non-specific intake of a tiny droplet of extracellular fluid by a cell through the cell membrane which cannot otherwise pass through it. It is also, therefore, termed as <strong>cell drinking.</strong> It was first observed in <em>Amoeba.</em> In this process, a small region of plasma membrane invaginates and the fluid droplet passes into the pocket so formed. This pocket is called <strong>caveola.</strong> The pocket deepens and finally nips off as a fluid-filled vacuole called <strong>pinosome</strong> or <strong>pinocytotic vesicle.</strong> Pinocytosis may be important in the movement of the substances (<em>e.g.,</em> hormones or growth factors, some vitamins) from one side of a cell to the other (Fig. 1.15 A).</p>,
  <Fig key="fig-1-15" src={IMG115} num="Fig. 1.15" caption="A. Pinocytosis, B. Phagocytosis." />,
  <KBBox key="kb-endo-plantcell">
    <p style={{ fontWeight:700, fontSize:14, margin:0 }}>Only animal cells show endocytosis where plasma membrane is in direct contact with external medium. Endocytosis is not shown by plant cells because of their rigid cell wall and internal turgor pressure.</p>
  </KBBox>,
  <p key="b2-p-phago-1" style={{ textIndent:28, textAlign:"justify" }}><strong>(ii) Phagocytosis</strong> (Fig. 1.15 B). Phagocytosis is the intake of solid particles by a cell through cell membrane. It is also called <strong>cell eating.</strong> Phagocytosis is the major feeding method in many unicellular organisms (<em>e.g., Amoeba</em>) and simple metazoa (<em>e.g.,</em> sponges). It is also the means by which leucocytes of blood engulf uninvited microbes (<em>e.g.,</em> viruses, bacteria), cellular debris etc. in the blood. Such cells are called <strong>phagocytes.</strong></p>,
  <p key="b2-p-phago-2" style={{ textIndent:28, textAlign:"justify" }}>An area of the plasma membrane comes in contact with the food particle(s). The contact induces the cell membrane to put out tiny protoplasmic processes, the <strong>pseudopodia,</strong> around the food particle(s). The pseudopodia meet on the other side of the food particle(s) and fuse. In this way, an internal vacuole, called <strong>phagosome,</strong> containing food particle(s) in a droplet of water is acquired.</p>,
  <p key="b2-p-pinopha" style={{ textIndent:28, textAlign:"justify" }}>Thus, both pinocytosis and phagocytosis processes are important to: (<em>a</em>) bring materials into the cell by invagination and subsequently formation of a vesicle, and (<em>b</em>) carry segments of cell membrane (<em>i.e.,</em> membrane of the vesicle) into the cytoplasm.</p>,

  <p key="b2-p-exo-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:14, color:"#c0126a", margin:"14px 0 6px" }}>2. Exocytosis (Fig. 1.16)</p>,
  <DefBox key="def-exocytosis">Exocytosis is the process that involves fusion of membrane of the exocytotic vesicle with the plasma membrane to extrude its contents to the surrounding medium.</DefBox>,
  <p key="b2-p-exo-1" style={{ textIndent:28, textAlign:"justify" }}>This process is also called <strong>cellular vomiting</strong> or <strong>ephagy</strong> and the vesicles that turn out the materials are termed <strong>exocytotic vesicles.</strong></p>,
  <Fig key="fig-1-16" src={IMG116} num="Fig. 1.16" caption="Exocytosis by a cell." />,
  <p key="b2-p-exo-resp" style={{ margin:"8px 0 4px" }}>Exocytosis process is responsible for:</p>,
  <p key="b2-p-exo-resp1" style={{ textIndent:28, textAlign:"justify" }}>(<em>i</em>) removal of undigested food left in the food vacuoles in the cells,</p>,
  <p key="b2-p-exo-resp2" style={{ textIndent:28, textAlign:"justify" }}>(<em>ii</em>) secretion of substances such as hormones, enzymes, and</p>,
  <p key="b2-p-exo-resp3" style={{ textIndent:28, textAlign:"justify" }}>(<em>iii</em>) replacement of internalized membrane by the fusion of exocytotic vesicles with the cell membrane.</p>,
  <Table16 key="tbl-1-6" />,
];

// ── BATCH 3: §1.8 Cell Wall through §1.11.4 Lysosomes ────────

const IMG117 = CONTENT_IMAGES.CONTENT_IMAGE_F85B2266A36B3AA474BD;
const IMG118 = CONTENT_IMAGES.CONTENT_IMAGE_987245A038A1E7683F01;
const IMG119 = CONTENT_IMAGES.CONTENT_IMAGE_AA9927F2F50D8CEDC061;
const IMG120 = CONTENT_IMAGES.CONTENT_IMAGE_B4487598854B072B7E45;
const IMG121 = CONTENT_IMAGES.CONTENT_IMAGE_7CE42B04885CF386EFFD;
const IMG122 = CONTENT_IMAGES.CONTENT_IMAGE_AAD1A0D523BD096DA85E;
const IMG_GOLGI_PHOTO = CONTENT_IMAGES.CONTENT_IMAGE_944A89EEB412456C7970;
const IMG123 = CONTENT_IMAGES.CONTENT_IMAGE_596B62BF660374D93E68;

const tds = { border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 };
const ths = { border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" };

const Table17 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.7. Differences between RER and SER.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={ths}>RER</td><td style={ths}>SER</td></tr></thead>
      <tbody>
        {[
          ["1. It mainly consists of cisternae.","1. It consists mainly of tubules and vesicles."],
          ["2. It has ribosomes attached on its cytoplasmic surface.","2. It is free of ribosomes."],
          ["3. It is well developed in cells specialized to synthesize proteins.","3. It is well developed in cells specialized to synthesize lipids and steroids."],
          ["4. The products pass into the lumen of endoplasmic reticulum for transport to other places.","4. The products do not pass into the lumen of endoplasmic reticulum."],
        ].map(([a,b],i) => <tr key={i}><td style={tds}>{a}</td><td style={tds}>{b}</td></tr>)}
      </tbody>
    </table>
  </div>
);

const content_b3 = [
  <SecHd key="sec-s18" id="s18" label="1.8" title="Cell Wall" />,
  <p key="b3-p-s18-1" style={{ textIndent:28, textAlign:"justify" }}>The plant cells as well as cells of bacteria and fungi possess an additional layer outside the plasma membrane, called the <strong>cell wall.</strong> It is non-living, rigid, completely permeable and is secreted by the cell itself to protect its contents. Plant cell wall was first observed by Robert Hooke in 1665 in a thin slice of cork under his primitive microscope.</p>,

  <SubHd key="sub-s181" id="s181" label="1.8.1" title="Physical Structure" />,
  <p key="b3-p-s181-1" style={{ textIndent:28, textAlign:"justify" }}>Young growing cells, meristematic cells, photosynthesizing cells, some storage cells, all parenchymatous cells and some other plant cells possess only a <strong>primary cell wall</strong> made up of <strong>cellulose.</strong> The primary cell walls of adjacent cells are cemented through <strong>middle lamella.</strong> However, many mature plant cells especially dead cells of xylem, cork and sclerenchyma possess an additional <strong>secondary wall</strong> (in some cases <strong>tertiary wall</strong> also) inner to the primary wall. The cell wall has narrow <strong>pits</strong> or <strong>pores</strong> through which fine cytoplasmic strands, called <strong>plasmodesmata,</strong> pass. The plasmodesmata form intercellular connections that allow exchange of materials between adjacent living cell contents.</p>,

  <SubHd key="sub-s182" id="s182" label="1.8.2" title="Chemical Composition" />,
  <p key="b3-p-s182-1" style={{ textIndent:28, textAlign:"justify" }}>The <strong>primary cell wall</strong> is chiefly composed of insoluble fibrous polysaccharide, <strong>cellulose</strong> (a carbohydrate present in plant cells). A cellulose molecule is a long unbranched chain of thousands of glucose units. The primary cell wall provides mechanical strength and protection to the protoplast. It is porous and considered permeable membrane. The <strong>secondary wall,</strong> deposited on the inner face of the primary wall, is composed of <strong>lignin</strong> and <strong>suberin</strong> substances. Due to presence of lignin and suberin, the secondary wall becomes impermeable to the substances and the cell becomes dead. <strong>Middle lamella</strong> is chiefly composed of <strong>calcium</strong> and <strong>magnesium pectate.</strong></p>,
  <div key="kb-cell-wall-life" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0" }}>
    <p style={{ fontWeight:700, fontSize:14, margin:0 }}>Plant cell is living when it has only primary cell wall and becomes dead when secondary wall is deposited on the inner face of the primary wall. Thus, plant cells (having only primary cell walls) are able to absorb water by osmosis.</p>
  </div>,

  <SubHd key="sub-s183" id="s183" label="1.8.3" title="Functions" />,
  <p key="b3-p-s183-intro" style={{ margin:"0 0 6px" }}>The plant cell wall has the following functions:</p>,
 <ol key="b3-ol-s183" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li style={{ marginBottom:4 }}>It maintains the shape of the cells.</li>
    <li style={{ marginBottom:4 }}>It protects the cells from mechanical injury and prevents their desiccation.</li>
    <li style={{ marginBottom:4 }}>It provides mechanical support against gravity. It is due to the rigid cell walls that the aerial parts of the plants are able to keep erect and expose their leaves to sunlight.</li>
    <li style={{ marginBottom:4 }}>Being freely permeable, it allows the materials to pass in and out of the cells.</li>
    <li>The plasmodesmata form intercellular connections that allow exchange of materials between adjacent living cell contents.</li>
  </ol>,

  <SubHd key="sub-s184" id="s184" label="1.8.4" title="Plasmolysis" />,
  <p key="b3-p-s184-1" style={{ textIndent:28, textAlign:"justify" }}>A plant cell placed in a hypotonic solution receives water by osmosis. It does not burst because it is surrounded by a rigid cell wall which can withstand the <strong>hydrostatic</strong> or <strong>turgor pressure</strong> of the turgid (distended) cell contents. The cell wall counters the turgor pressure by exerting <strong>wall pressure.</strong> This pressure stops the gain of water by a plant cell beyond a certain limit, <em>i.e.,</em> when the cell contents become completely turgid (distended).</p>,
  <p key="b3-p-s184-2" style={{ textIndent:28, textAlign:"justify" }}>If a plant cell is placed in a hypertonic solution, the cytoplasm along with the plasma membrane shrinks and separates from the cell wall as water flows out from the vacuole of the cell. The vacuole shrinks but remains enclosed by the cytoplasm. This process of shrinkage of protoplast from the cell wall due to exosmosis caused by a hypertonic solution is called <strong>plasmolysis</strong> (Fig. 1.17).</p>,
  <DefBox key="def-plasmolysis">The phenomenon of shrinkage of protoplast from the cell wall due to exosmosis in a plant cell when placed in a hypertonic solution is called <strong>plasmolysis.</strong></DefBox>,
  <Fig key="fig-1-17" src={IMG117} num="Fig. 1.17" caption="Plasmolysis. A. A turgid or normal plant cell of Rheo; B-D. Successive stages in the shrinkage of cell content (protoplasm) from the cell wall." />,
  <p key="b3-p-s184-3" style={{ margin:"8px 0 4px" }}><strong>• Stages of Plasmolysis.</strong></p>,
  <p key="b3-p-s184-lim" style={{ textIndent:28, textAlign:"justify" }}>(<em>i</em>) Gradual loss of water from the plant cell causes the protoplast to stop exerting pressure on the cell wall. This is the beginning of plasmolysis. It is called <strong>limiting plasmolysis.</strong></p>,
  <p key="b3-p-s184-inc" style={{ textIndent:28, textAlign:"justify" }}>(<em>ii</em>) Plasmolysis starts at the corners of the cell wall. As water flows out from the vacuole, the cytoplasm along with plasma membrane shrinks and starts separating from the cell wall from the corners. This stage of plasmolysis is called <strong>incipient plasmolysis.</strong></p>,
  <p key="b3-p-s184-ev" style={{ textIndent:28, textAlign:"justify" }}>(<em>iii</em>) Continuous loss of water from the vacuole of plant cell results in maximum shrinking of the protoplast. As a result, the cytoplasm along with plasma membrane loses contact from most of the cell wall and comes to lie on one side of the cell wall. This stage of plasmolysis is called <strong>evident plasmolysis.</strong></p>,
  <p key="b3-p-s184-dep" style={{ textIndent:28, textAlign:"justify" }}><strong>• Deplasmolysis.</strong> If a plasmolysed plant cell is immediately placed in a hypotonic solution, water enters the cell and plasmolysed cytoplasm swells up and comes in contact with the cell wall. This process is called <strong>deplasmolysis.</strong></p>,
  <p key="b3-p-s184-ter" style={{ textIndent:28, textAlign:"justify" }}>In some plants, tertiary wall is also laid inner to secondary wall. Due to the presence of cell wall, plant cells can withstand much greater changes in the external medium than the animal cells.</p>,

  <ActivityBox key="act-1-5" num="1.5" sub="To demonstrate plasmolysis in Rheo leaf cells.">
    <ActHd>Requirements.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Compound microscope, glass slides, complete Rheo leaves, concentrated salt/sugar solution, water etc.</p>
    <ActHd>Procedure.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Take a clean glass slide and put few drops of water on it. Now place a complete Rheo leaf in water and examine the cells of leaf under the high power of compound microscope. Put a few drops of concentrated salt/sugar solution on the mounted Rheo leaf on the glass slide. Wait for a minute and again observe the leaf under the high power of microscope.</p>
    <ActHd>Observations and Conclusion.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>In the first instance, you will locate cells having small green granules, <em>i.e.,</em> the chloroplasts containing chlorophyll pigments. These cells are turgid, <em>i.e.,</em> the plasma membrane is in complete contact with the cell wall in these cells. When you observe <em>Rheo</em> leaf again after putting few drops of concentrated salt/sugar solution, you will observe that the cell contents are separated from the cell wall, <em>i.e.,</em> the cytoplasm along with plasma membrane has come to lie on one side of cell wall in the leaf cells and a clear space is seen between the cell wall and chloroplast containing protoplast of the cells (Fig. 1.17). The observed change in the condition of <em>Rheo</em> cells is due to plasmolysis phenomenon. In fact, plasmolysis has occurred due to exosmosis, <em>i.e.,</em> loss of water from the vacuoles of leaf cells to the surrounding hypertonic medium.</p>
  </ActivityBox>,

  <SecHd key="sec-s19" id="s19" label="1.9" title="Nucleus" />,
  <p key="b3-p-s19-1" style={{ textIndent:28, textAlign:"justify" }}>The nucleus is the most conspicuous and the largest organelle of a eukaryotic cell. It is visible under light microscope and its fine structure has been revealed by electron microscope. We can observe deeply stained rounded nucleus in a properly stained preparation (with safranin or methylene blue solution) of cheek squamous epithelial cells of human beings or epidermal peel of onion bulb under a microscope. In animal cells, it is generally centrally located. However, in plant cells, it is pushed to the side due to the presence of large cell vacuole. Nucleus contains the hereditary material for regulating cell activities as well as for transfer to the next generation.</p>,
  <p key="b3-p-s19-2" style={{ textIndent:28, textAlign:"justify" }}>Prokaryotic cells do not have an organized nucleus with a nuclear envelope. They have a <strong>nucleoid</strong> which is a highly folded circular DNA molecule without a membrane.</p>,
  <p key="b3-p-s19-3" style={{ textIndent:28, textAlign:"justify" }}>Generally, there is a single nucleus in each cell. Such cells are termed as <strong>uninucleate.</strong> Some cells possess two nuclei. These are termed <strong>binucleate</strong> (<em>e.g.,</em> protozoan, <em>Paramecium caudatum</em>). Some cells possess more than two nuclei. They are termed <strong>multinucleate.</strong> The shape of resting nucleus is usually spherical, but it may vary in shape under special conditions.</p>,
  <p key="b3-p-s19-4" style={{ textIndent:28, textAlign:"justify" }}>Chemically, the nucleus is composed of about 80% protein, 12% DNA (Deoxyribose nucleic acid), 5% RNA (Ribonucleic acid) and 3% lipids.</p>,

  <SubSubHd key="sub-s191" id="s191" label="1.9.1" title="Structure (Fig. 1.18)" />,
  <p key="b3-p-s191-1" style={{ margin:"0 0 6px" }}>The nucleus typically consists of following components:</p>,
  <p key="b3-p-s191-comps" style={{ margin:"0 0 8px", fontSize:14 }}>(<em>i</em>) <strong>Nuclear envelope</strong> or karyotheca &nbsp;&nbsp; (<em>ii</em>) <strong>Nuclear sap</strong> or karyolymph &nbsp;&nbsp; (<em>iii</em>) <strong>Chromatin material</strong> &nbsp;&nbsp; (<em>iv</em>) <strong>Nucleolus,</strong> and (<em>v</em>) <strong>Nuclear matrix.</strong></p>,
  <Fig key="fig-1-18" src={IMG118} num="Fig. 1.18" caption="Structure of nucleus." />,
  <p key="b3-p-s191-env" style={{ textIndent:28, textAlign:"justify" }}>(<em>i</em>) <strong>Nuclear envelope.</strong> Nucleus is bounded by two nuclear membranes, together referred to as <strong>nuclear envelope.</strong> The two nuclear membranes are designated as <strong>outer membrane</strong> and <strong>inner membrane.</strong> These enclose a fluid filled space in between, called <strong>intermembrane space</strong> or <strong>perinuclear space.</strong> Each membrane resembles the cell membrane in structure. The nuclear envelope separates the nuclear contents from the cytoplasm. It is perforated by numerous minute, circular <strong>nuclear pores</strong> for movement of materials in and out of the nucleus.</p>,
  <p key="b3-p-s191-outer" style={{ textIndent:28, textAlign:"justify" }}>The outer membrane bears ribosomes on the cytoplasmic side and at places is also connected with a system of membranes called endoplasmic reticulum (ER). The inner membrane is, however, smooth.</p>,
  <p key="b3-p-s191-sap" style={{ textIndent:28, textAlign:"justify" }}>(<em>ii</em>) <strong>Nuclear sap.</strong> It is a clear, non-staining, fluid material present in the nucleus, also termed <strong>nucleoplasm.</strong> It contains raw materials, enzymes, proteins and metal ions for the synthesis of nucleic acids (DNA and RNAs) and ribosomal sub-units.</p>,
  <p key="b3-p-s191-chromatin" style={{ textIndent:28, textAlign:"justify" }}>(<em>iii</em>) <strong>Chromatin material.</strong> It occurs in a non-dividing nucleus as fine filaments termed as <strong>chromatin fibres.</strong> These fibres lie criss cross and give the appearance of a diffuse network. Chromatin fibres are, in fact, greatly extended <strong>chromosomes.</strong> Two or more thick, ribbon-like chromosomes appear at the time of cell division due to condensation of chromatin material. These are made up of DNA and proteins. The DNA possesses all the necessary information for the cell to function, grow and divide properly. The specific segments of DNA are termed <strong>genes.</strong> These are the hereditary units.</p>,
  <p key="b3-p-s191-nuc" style={{ textIndent:28, textAlign:"justify" }}>(<em>iv</em>) <strong>Nucleolus.</strong> Generally, one or more rounded bodies called nucleoli (singular nucleolus) are present in the nucleoplasm. Nucleolus is a dense, dark-staining granular structure without a limiting membrane. It is rich in RNAs and proteins.</p>,
  <p key="b3-p-s191-mat" style={{ textIndent:28, textAlign:"justify" }}>(<em>v</em>) <strong>Nuclear matrix.</strong> It is a network of fine, criss crossing, protein-containing fibrils which are joined to the nuclear envelope by their ends. These maintain the shape of nucleus.</p>,

  <SubSubHd key="sub-s192" id="s192" label="1.9.2" title="Functions" />,
  <p key="b3-p-s192-intro" style={{ margin:"0 0 6px" }}>The nucleus performs following functions:</p>,
  <ol key="b3-ol-s192" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:4 }}>It controls all the metabolic activities of the cell.</li>
    <li style={{ marginBottom:4 }}>It brings about growth of the cell by directing the synthesis of structural proteins.</li>
    <li style={{ marginBottom:4 }}>It takes part in the formation of ribosomes.</li>
    <li style={{ marginBottom:4 }}>It regulates cell cycle.</li>
    <li>It contains genetic information in the form of genes located in the chromosomes and is concerned with the transmission of hereditary traits from one generation to another.</li>
  </ol>,

  <ActivityBox key="act-1-6" num="1.6" sub="To prepare stained temporary mount of human cheek cells.">
    <ActHd>Requirements.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Compound microscope, glass slides, cover slips, tooth pick/ice cream spoon, needle, methylene blue solution/stain, water etc.</p>
    <ActHd>Procedure.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>Take a clean glass slide and put a drop of water on it. Now, scrap the inside of your cheek with the help of tooth pick or an ice-cream spoon and transfer this material with a needle on the glass slide and spread it evenly. Stain this material by putting a drop of methylene blue solution/stain on it. Put a coverslip on the stained material and observe this temporary mount under high power of microscope.</p>
    <Fig key="fig-1-19" src={IMG119} num="Fig. 1.19" caption="Microscopic view of cheek cells." />
    <ActHd>Observations and Conclusion.</ActHd>
    <p style={{ margin:"0 0 8px", fontSize:14 }}>You will notice coloured spherical or oval dot-like structure near the centre of each cheek cell (Fig. 1.19). It is the <strong>nucleus.</strong> In fact, these cheek cells are part of the squamous epithelium that lines the buccal cavity.</p>
  </ActivityBox>,

  <SubSubHd key="sub-s193" id="s193" label="1.9.3" title="Structure of Chromosome" />,
  <div key="kb-chromosome" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0" }}>
    <p style={{ fontWeight:700, fontSize:14, margin:0, fontStyle:"italic" }}>Chromosomes are thread-like structures usually present in the nucleus and become visible only during cell division. These contain hereditary information of the cell.</p>
  </div>,
  <p key="b3-p-s193-1" style={{ textIndent:28, textAlign:"justify" }}>Each chromosome is made up of two components: <strong>1. DNA</strong> (deoxyribonucleic acid), and <strong>2. proteins.</strong></p>,
  <p key="b3-p-s193-2" style={{ textIndent:28, textAlign:"justify" }}>DNA is the most important component of a chromosome. In eukaryotes, chromosomes can only be seen during cell division (mitosis or meiosis). These look like rods during the metaphase stage of the cell division. Each chromosome consists of two arms called <strong>chromatids</strong> which lie side-by-side along their length (Fig. 1.20). The two chromatids of a chromosome are attached at a point called primary constriction of <strong>centromere.</strong> The detailed structure of a chromosome, however, will be dealt in higher classes only.</p>,
  <Fig key="fig-1-20" src={IMG120} num="Fig. 1.20" caption="A chromosome" />,

  <SubSubHd key="sub-s194" id="s194" label="1.9.4" title="Diploid and Haploid Number of Chromosomes" />,
  <p key="b3-p-s194-1" style={{ textIndent:28, textAlign:"justify" }}>Every eukaryotic species has a fixed number of chromosomes in its cells. The number of chromosomes varies from minimum two (in round worm, <em>Ascaris megalocephala</em>) to a few hundred in different species. However, in majority of the species, the number usually ranges between 8 and 50. In human beings, there are 46 chromosomes in each body cell. There is always a pair of chromosomes of each kind. The paired condition of chromosomes is known as <strong>diploid</strong> and <strong>a cell which has the full number of chromosomes (<em>i.e.,</em> two of each kind) is called a diploid cell. Body cells in human beings are diploid.</strong></p>,
  <p key="b3-p-s194-2" style={{ textIndent:28, textAlign:"justify", fontWeight:700 }}>A set comprising of unpaired chromosomes of each kind is said to be haploid and a cell which has half the number of chromosomes (<em>i.e.,</em> one of each kind) is called a haploid cell. The gametes in human beings are haploid.</p>,
  <p key="b3-p-s194-3" style={{ textIndent:28, textAlign:"justify" }}>Thus, 46 chromosomes (<em>i.e.,</em> two of each kind or 23 pairs) in each body cell in human beings represent <strong>diploid number</strong> and 23 chromosomes (<em>i.e.,</em> one of each kind) in gametes (sperm or ovum) in human beings represent <strong>haploid number.</strong></p>,

  <SecHd key="sec-s110" id="s110" label="1.10" title="Cytoplasm" />,
  <p key="b3-p-s110-1" style={{ textIndent:28, textAlign:"justify" }}>The fluid and semi-fluid matrix of a cell between the nucleus and the plasma membrane containing various organelles and inclusions is called <strong>cytoplasm.</strong> Often under the free surface of the cell, the cytoplasm is more viscous and called <strong>ectoplasm.</strong> The internal cytoplasm is, however, more non-viscous and is termed <strong>endoplasm.</strong></p>,

  <SubHd key="sub-s1101" id="s1101" label="1.10.1" title="Composition" />,
  <p key="b3-p-s1101-1" style={{ margin:"0 0 6px" }}>The cytoplasm is a semifluid, jelly-like material having following components: <strong>• Cytosol, • Cell organelles,</strong> and <strong>• Cell inclusions.</strong></p>,

  <SubHd key="sub-s1102" id="s1102" label="1.10.2" title="Cytosol" />,
  <p key="b3-p-s1102-1" style={{ textIndent:28, textAlign:"justify" }}>The liquid or fluid part of cytoplasm is nearly transparent and is called <strong>cytosol</strong> or <strong>cytoplasmic matrix</strong> or <strong>hyaloplasm.</strong> It contains about 90% of water, various cell organelles and inclusions in it. Cytosol also contains ions and biomolecules such as minerals, sugars, amino acids, nucleotides, enzymes, vitamins dissolved gases etc. necessary for the biosynthetic processes of the cell. The cytosol contains waste materials too. All these materials may be present either as <strong>true solutions</strong> or as <strong>colloids.</strong></p>,

  <SubHd key="sub-s1103" id="s1103" label="1.10.3" title="Functions" />,
  <p key="b3-p-s1103-intro" style={{ margin:"0 0 4px" }}>Cytosol (cytoplasm) has <strong>five</strong> main functions:—</p>,
  <ol key="b3-ol-s1103" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:4 }}>It is the seat of metabolic processes of the cell.</li>
    <li style={{ marginBottom:4 }}>It is a storehouse for the raw materials needed for metabolism in both the cytoplasm and the nucleus.</li>
    <li style={{ marginBottom:4 }}>It distributes the nutrients, metabolites and enzymes in the cell.</li>
    <li style={{ marginBottom:4 }}>It brings about exchange of materials between the cell organelles. It also exchanges materials with the extracellular fluid or with the external environment.</li>
    <li>Streaming of cytoplasmic matrix (<strong>cyclosis</strong>) serves many functions in the cells.</li>
  </ol>,

  <SecHd key="sec-s111" id="s111" label="1.11" title="Cell Organelles" />,
  <p key="b3-p-s111-1" style={{ textIndent:28, textAlign:"justify" }}>Every living cell has a plasma membrane around it to keep the cell contents separated from the external environment. Various cellular activities occurring inside the cell involve a number of biochemical reactions, interaction of biomolecules and exchange of materials. Such cells have developed various membrane-bound cell organelles within themselves to keep different kinds of metabolic activities separate from each other. These membrane bound sub-cellular components are called <strong>cell organelles</strong> (<em>i.e.,</em> small organs). Except plasma membrane and cell wall, all other cell organelles are found embedded in the cytosol. Each cell organelle has a definite shape, structure and function. These include plasma membrane, cell wall, nucleus, endoplasmic reticulum, ribosomes, Golgi apparatus, lysosomes, mitochondria, plastids, centrioles, cilia and flagella, vacuoles, peroxisomes etc. Presence of cell organelles is one of the features of the eukaryotic cells which distinguishes them from prokaryotic cells.</p>,

  <SubHd key="sub-s1111" id="s1111" label="1.11.1" title="Endoplasmic Reticulum (ER)" />,
  <p key="b3-p-s1111-1" style={{ textIndent:28, textAlign:"justify" }}>The endoplasmic reticulum (ER) is noticeable only with an electron microscope.</p>,
  <p key="b3-p-s1111-2" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure.</strong> The ER is an extensive network of intracellular membrane-bound tubes and vesicles that occupies most of the cytoplasm in almost all eukaryotic cells. The membranes of this system are lipo-proteinic in nature similar in structure to the plasma membrane. The ER is more prominent in young and dividing cells as compared to older cells. It is absent in prokaryotic cells.</p>,
  <p key="b3-p-s1111-types" style={{ margin:"8px 0 4px" }}><strong>• Types.</strong> The ER is of two types: <strong>1. Rough endoplasmic reticulum (RER)</strong> and <strong>2. Smooth endoplasmic reticulum (SER).</strong></p>,
  <p key="b3-p-rer" style={{ textIndent:28, textAlign:"justify" }}><strong>1. Rough Endoplasmic Reticulum (RER).</strong> These appear rough under a microscope because of the attachment of a large number of grain-like ribosomes over their cytoplasmic surface. The ribosomes are the sites of protein synthesis. Thus, RER is engaged in the synthesis and transport of proteins. Generally, RER is more abundant in the deeper part of cytoplasm near the nucleus where it is connected with the outer membrane of the nuclear envelope. RER is well developed in the cells that synthesize and secrete proteins.</p>,
  <p key="b3-p-ser" style={{ textIndent:28, textAlign:"justify" }}><strong>2. Smooth Endoplasmic Reticulum (SER).</strong> It consists mainly of tubules and vesicles. It is free of ribosomes and is more abundant near the peripheral part of the cytoplasm where it may be attached to the plasma membrane. The SER helps in the synthesis of fat or lipid molecules. It is, therefore, well developed in the cells that secrete lipids. It forms the transport vesicles in which the large molecules of proteins and lipids are transported from one cell to another (via plasmodesmata in plant cells) or within the cells.</p>,
  <p key="b3-p-membio" style={{ textIndent:28, textAlign:"justify" }}>Some of proteins and lipids, which are synthesized in the cell with the help of ER, are utilized in building the cell membrane. This process is called <strong>membrane biogenesis.</strong> Other proteins and lipids function as enzymes, hormones and many other kinds of biomolecules required for life activities.</p>,
  <Table17 key="tbl-1-7" />,
  <p key="b3-p-er-fns-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Functions</p>,
<ol key="b3-ol-er-fns" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li style={{ marginBottom:4 }}><strong>Support.</strong> The ER acts as supporting skeletal framework of the cell and also maintains its form.</li>
    <li style={{ marginBottom:4 }}><strong>Transport of materials.</strong> The ER facilitates transport of materials from one part of the cell to another.</li>
    <li style={{ marginBottom:4 }}><strong>Exchange of materials.</strong> The ER helps in the exchange of materials between the cytoplasm and the nucleus.</li>
    <li style={{ marginBottom:4 }}><strong>Localization of organelles.</strong> It keeps the cell organelles properly stationed and distributed in relation to one another.</li>
    <li style={{ marginBottom:4 }}><strong>Surface for protein synthesis.</strong> The RER offers extensive surface on which ribosomes carry protein synthesis.</li>
    <li style={{ marginBottom:4 }}><strong>Surface for synthesis of other substances.</strong> The SER provides surface for the synthesis of lipids including phospholipids, cholesterol and steroid hormones.</li>
    <li style={{ marginBottom:4 }}><strong>Packaging.</strong> The proteins formed on ribosomes pass into ER lumen where they are modified. Then, the modified proteins move into the transitional area where the ER buds off <strong>transport vesicles</strong> carrying the proteins to the Golgi apparatus. Here, they are further processed and packaged into <strong>secretory vesicles</strong> for export by exocytosis at the plasma membrane. Examples of secretory proteins include mucus, digestive enzymes and hormones.</li>
    <li style={{ marginBottom:4 }}><strong>Detoxification.</strong> The SER brings about detoxification in the liver, <em>i.e.,</em> it converts harmful materials (drugs, insecticides, pollutants and poisons) into harmless substances for excretion by the cell.</li>
    <li style={{ marginBottom:4 }}><strong>Formation of organelles.</strong> The SER produces Golgi apparatus, lysosomes and vacuoles.</li>
    <li><strong>Membrane formation.</strong> Plasma membrane and other cellular membranes are formed by ER.</li>
  </ol>,

  <SubHd key="sub-s1112" id="s1112" label="1.11.2" title="Ribosomes" />,
  <p key="b3-p-s1112-1" style={{ textIndent:28, textAlign:"justify" }}>Ribosomes are dense, spherical, granule-like particles about 150-250 Å in diameter. These were first discovered by <strong>George Palade</strong> in 1955 under electron microscope. Hence, these are also called <strong>Palade particles.</strong> Their size is determined by the speed with which they sediment in the centrifugal field. The <strong>Svedberg (S)</strong> is the unit to measure sedimentation coefficient.</p>,
  <p key="b3-p-s1112-occ" style={{ textIndent:28, textAlign:"justify" }}><strong>• Occurrence.</strong> Ribosomes are found in all prokaryotic and eukaryotic cells. In prokaryotic cells, they float freely in the cytoplasm. In eukaryotic cells, they occur free in the cytoplasmic matrix and are also attached to the cytoplasmic surface of the rough endoplasmic reticulum and nuclear envelope. Ribosomes are also found in the matrix of mitochondria and the stroma of plastids in eukaryotic cells.</p>,
  <p key="b3-p-s1112-types" style={{ margin:"8px 0 4px" }}><strong>• Types.</strong> On the basis of their size and sedimentation coefficient, the ribosomes are of two types: <strong>(<em>i</em>) 70 S-ribosomes</strong> and <strong>(<em>ii</em>) 80 S-ribosomes.</strong></p>,
  <p key="b3-p-70s" style={{ textIndent:28, textAlign:"justify" }}>(<em>i</em>) <strong>70 S-ribosomes.</strong> These are found in prokaryotic cells and in the mitochondria and plastids of eukaryotic cells. Each 70 S ribosome consists of a large <strong>50 S subunit</strong> and a small <strong>30 S subunit</strong> (Fig. 1.21).</p>,
  <p key="b3-p-80s" style={{ textIndent:28, textAlign:"justify" }}>(<em>ii</em>) <strong>80 S-ribosomes.</strong> These occur in eukaryotic cells. Each 80 S ribosome consists of a large <strong>60 S subunit</strong> and a small <strong>40 S subunit</strong> (Fig. 1.21).</p>,
  <p key="b3-p-ribo-struct" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure.</strong> Both types of ribosomes are similar in structure. They are minute, organelles without a membrane around them. Chemically, both the ribosomal subunits consist of a <strong>rRNA</strong> (ribonucleic acid) and proteins.</p>,
  <Fig key="fig-1-21" src={IMG121} num="Fig. 1.21" caption="Structure of ribosome, prokaryotic (right) and eukaryotic (left). Ribosomal subunits are usually shown symmetrical, actually they are irregular." />,
  <p key="b3-p-ribo-fn" style={{ textIndent:28, textAlign:"justify" }}><strong>• Functions.</strong> The ribosomes provide space for the synthesis of proteins in the cell. Hence, they are known as the <strong>'protein factories'</strong> of the cell.</p>,

  <SubHd key="sub-s1113" id="s1113" label="1.11.3" title="Golgi Apparatus" />,
  <p key="b3-p-s1113-1" style={{ textIndent:28, textAlign:"justify" }}>Golgi apparatus, also called <strong>Golgi complex,</strong> was discovered by Camillo Golgi in 1898. It is present in all eukaryotic cells except mature red blood cells and sperms of mammals. It is altogether absent in prokaryotes, <em>e.g.,</em> bacteria, blue green algae.</p>,
  <p key="b3-p-s1113-2" style={{ textIndent:28, textAlign:"justify" }}>In animal cells, Golgi apparatus is usually located at a specific site close to the nuclear envelope. However, plant cells have many small Golgi complexes called <strong>dictyosomes</strong> scattered throughout the cytoplasm.</p>,
  <p key="b3-p-s1113-origin" style={{ textIndent:28, textAlign:"justify" }}><strong>• Origin.</strong> Golgi apparatus originates from the rough endoplasmic reticulum (RER) that has lost its ribosomes. From this RER, arise transport vesicles which fuse with the saccule on the cis face of the Golgi apparatus. This is why cis face is also called the 'forming face'.</p>,
  <p key="b3-p-s1113-struct" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure.</strong> The Golgi apparatus is a disc-shaped organelle consisting of a system of membrane-bound vesicles arranged approximately parallel to each other in flattened sac-like saccule, called <strong>cisternae.</strong> Short tubules arise from the periphery of the cisternae. Some of these enlarge at their ends to form vesicles which lie near the ends and the concave surface of the Golgi apparatus (Fig. 1.22).</p>,
  <Fig key="fig-1-22" src={IMG122} num="Fig. 1.22" caption="Golgi apparatus in section." />,
  <p key="b3-p-s1113-faces" style={{ textIndent:28, textAlign:"justify" }}>The two poles of a Golgi complex are called <strong>cis face</strong> and <strong>trans face</strong> which act as the receiving and shipping departments respectively. The cis face is usually near the ER. Secretary materials reach the Golgi apparatus from the SER by way of transport vesicles which bud off from the SER and fuse with the Golgi cisternae on the cis face. The secretary materials are processed in the Golgi apparatus. These then arise as secretary vesicles from the trans face of the Golgi complex that carry them to their destination (<em>i.e.,</em> inside and outside the cell).</p>,
  <FeatureBox key="feat-camillo-golgi" title="CAMILLO GOLGI">
    <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
      <img src={IMG_GOLGI_PHOTO} alt="Camillo Golgi" style={{ width:70, height:"auto", border:"1px solid #ddd", flexShrink:0 }} />
      <p style={{ fontSize:14, margin:0, textAlign:"justify" }}>Camillo Golgi was born in 1843 at Corteno near Brescia. He graduated in medicine in 1865 at the University of Pavia. In 1872, he accepted the post of Chief Medical Officer at the hospital for the Chronically sick at Abbiategrasso. He started working in the field of nervous system in a little kitchen of the hospital which was converted into a laboratory by him. He carried out a revolutionary method of staining individual nerve and cell structures, commonly referred to as the 'black reaction'. This method uses a weak solution of silver nitrate and is particularly valuable in tracing the processes and very delicate ramifications of cells. Golgi shared Nobel Prize in 1906 with Santiago Ramony Cajal for their work on the structure of the nervous system.</p>
    </div>
  </FeatureBox>,
  <p key="b3-p-golgi-fns-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Functions.</p>,
  <p key="b3-p-golgi-fn-intro" style={{ textIndent:28, textAlign:"justify" }}>Golgi apparatus is metabolically very active and many functions have been assigned to it.</p>,
<ol key="b3-ol-golgi-fns" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8, listStyleType:"decimal" }}>
    <li style={{ marginBottom:4 }}><strong>Packaging of materials.</strong> The Golgi complex modifies, sorts and packages the materials coming from the ER or synthesized in the Golgi itself. Packaging involves wrapping the material by a membrane, forming <strong>transport vesicles.</strong> The materials meant for export (to be sent out of the cell) are enclosed in <strong>secretory vesicles.</strong> The latter release their secretions by exocytosis. The materials so packaged include enzymes, mucus, proteins, lactoprotein of milk, pigment granules in pigment cells, hormones etc.</li>
    <li style={{ marginBottom:4 }}><strong>Synthesis of organelles.</strong> Golgi apparatus is also involved in the synthesis of cell wall, plasma membrane and lysosomes.</li>
    <li style={{ marginBottom:4 }}><strong>Acrosome formation.</strong> Golgi complex gives rise to the acrosome in an animal sperm.</li>
    <li><strong>Formation of yolk.</strong> It produces yolk in the eggs.</li>
  </ol>,

  <SubHd key="sub-s1114" id="s1114" label="1.11.4" title="Lysosomes" />,
  <p key="b3-p-s1114-1" style={{ textIndent:28, textAlign:"justify" }}>Lysosomes are membrane-bound vacuolar organelles responsible for the intra-cellular digestion in the eukaryotic cells. These were discovered by C. de Duve in 1949, who named them <strong>lysosomes</strong> (Greek, <em>Lysis</em> = dissolution; <em>soma</em> = body) in 1955. The lysosomes are noticeable with electron microscope only.</p>,
  <p key="b3-p-s1114-occ" style={{ textIndent:28, textAlign:"justify" }}><strong>• Occurrence.</strong> The lysosomes practically occur in all animal cells, protozoans, fungi and certain plant cells. Prokaryotes and mature mammalian red blood cells, however, lack lysosomes. In general, they are less prevalent in plant cells than in animal cells.</p>,
  <p key="b3-p-s1114-origin" style={{ textIndent:28, textAlign:"justify" }}><strong>• Origin.</strong> Lysosomes arise from the Golgi complex (Fig. 1.23). Their membrane and hydrolytic enzymes are synthesized on the RER and are transported in transport vesicles to the Golgi complex for modification and packaging. Secretory vesicles (filled with lysosomal enzymes) bud off from the trans face of the Golgi complex as primary lysosomes.</p>,
  <Fig key="fig-1-23" src={IMG123} num="Fig. 1.23" caption="Formation of lysosomes and intracellular digestion in them." />,
  <p key="b3-p-s1114-struct" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure.</strong> Lysosomes are tiny, spherical structures evenly distributed in the cytoplasm. Each lysosome is bounded by a single unit membrane of lipoprotein. It contains a dense, finely granular fluid. The latter consists of <strong>hydrolytic (digestive) enzymes.</strong> These hydrolytic enzymes are capable of digesting all organic materials. There are different sets of enzymes in different lysosomes. Their membrane prevents the enzymes from escaping into the cytoplasm and destroying it. Therefore, lysosomes are also called <strong>'suicidal bags'.</strong></p>,
  <p key="b3-p-s1114-fns-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Functions.</p>,
  <p key="b3-p-s1114-fns-intro" style={{ margin:"0 0 6px" }}>Lysosomes serve following important functions:</p>,
  <p key="b3-p-lyso-1" style={{ textIndent:28, textAlign:"justify" }}>(<em>i</em>) <strong>Digestion of useful materials.</strong> The organic substances (food particles) taken up by the cells in vacuoles (pinosomes and phagosomes) from the environment are digested in the lysosomes. This is called <strong>intracellular digestion.</strong> It is a regular feature in protozoans, sponges and coelenterates.</p>,
  <p key="b3-p-lyso-2" style={{ textIndent:28, textAlign:"justify" }}>(<em>ii</em>) <strong>Digestion of harmful materials.</strong> The lysosomes dispose off the foreign particles (<em>e.g.,</em> viruses, bacteria, toxic molecules) by hydrolyzing them in certain leucocytes and macrophages. This is called <strong>natural defence</strong> of the body, a characteristic of higher animals.</p>,
  <p key="b3-p-lyso-3" style={{ textIndent:28, textAlign:"justify" }}>(<em>iii</em>) <strong>Digestion of unwanted materials.</strong> Lysosomes also remove the dead cells and debris that accumulate at the sites of injury by digesting them and thus make a way for their replacements. Thus, they are also called <strong>natural scavengers</strong> and <strong>cellular housekeepers.</strong></p>,
  <p key="b3-p-lyso-4" style={{ textIndent:28, textAlign:"justify" }}>(<em>iv</em>) During starvation, the lysosomes digest stored food contents (proteins, lipids, glycogen) and provide the necessary energy to the cells. This is called <strong>autophagy.</strong></p>,
  
  <div key="kb-lyso-specific" style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"16px 0" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, textAlign:"center", textDecoration:"underline", fontSize:13.5, margin:"0 0 8px" }}>Other specific functions of lysosomes</p>
    <ul style={{ margin:"4px 0 8px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.7 }}>
      <li style={{ marginBottom:6 }}>Lysosomes play important role during metamorphosis in frog. During transformation of tadpole into adult frog, the embryonic tissues such as tail, gills are digested by the lysosomal enzymes.</li>
      <li>Lysosomes also play important role at the time of fertilization. The lysosomal enzymes present in the acrosome region of sperm cell digest the limiting membrane of the ovum (egg) to facilitate the entry of sperm into ovum.</li>
    </ul>
  </div>,
];

// ── BATCH 4: §1.11.5 Mitochondria through §1.17 ─────────────

const IMG124 = CONTENT_IMAGES.CONTENT_IMAGE_C7D88305DC2A21ECF76E;
const IMG125 = CONTENT_IMAGES.CONTENT_IMAGE_4B86354E6B8F56442694;
const IMG126 = CONTENT_IMAGES.CONTENT_IMAGE_E91B6A20D1986069A912;
const IMG127 = CONTENT_IMAGES.CONTENT_IMAGE_162D4024A8D95CD49D1D;

const tdb4 = { border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5 };
const thb4 = { border:"1.5px solid #555", padding:"6px 10px", textAlign:"center", fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13, background:"#f0f0f0" };

const Table18 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.8. Differences between Animal and Plant Cells.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={thb4}>Animal Cell</td><td style={thb4}>Plant Cell</td></tr></thead>
      <tbody>
        {[
          ["1. Animal cells are generally small in size.","1. Plant cells are generally larger than animal cells."],
          ["2. It is enclosed by a thin, flexible, living plasma membrane only. Cell wall is absent.","2. It is enclosed by a thick, rigid, dead cell wall in addition to plasma membrane."],
          ["3. Plastids are absent in animal cells.","3. Plastids are present in plant cells."],
          ["4. Animal cells have single Golgi apparatus generally near the nuclear envelope.","4. Plant cells have many Golgi complexes scattered in the cytoplasm."],
          ["5. Animal cells have a centrosome containing centrioles.","5. Centrosome and centrioles are absent in plant cells."],
          ["6. Vacuoles are many but small-sized.","6. Vacuoles are fewer but large-sized."],
          ["7. Nucleus is generally near the centre of the cell.","7. Nucleus is often pushed to one side in the peripheral cytoplasm by the central vacuole containing cell sap."],
        ].map(([a,b],i) => <tr key={i}><td style={tdb4}>{a}</td><td style={tdb4}>{b}</td></tr>)}
      </tbody>
    </table>
  </div>
);

const Table19 = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>TABLE 1.9. Differences between Mitosis and Meiosis.</p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={thb4}>Mitosis</td><td style={thb4}>Meiosis</td></tr></thead>
      <tbody>
        {[
          ["1. It occurs in all kinds of cells and may continue throughout life.","1. It occurs only in specific cells (meiocytes) and at specific time."],
          ["2. It involves a single division, resulting in two daughter cells.","2. It involves two consecutive divisions, resulting in four daughter cells."],
          ["3. Each daughter cell has same amount of DNA, and same number and kind of chromosomes as the parent cell. It is, therefore, called equational division.","3. Each daughter cell has half the amount of DNA, and half the number and kind of chromosomes as the mother cell. It is, therefore, called the reduction division."],
          ["4. It brings about growth, repair and healing.","4. Meiosis forms gametes or spores for reproduction."],
          ["5. It is much shorter process than meiosis in the same species.","5. It is much longer process than mitosis in the same species."],
        ].map(([a,b],i) => <tr key={i}><td style={tdb4}>{a}</td><td style={tdb4}>{b}</td></tr>)}
      </tbody>
    </table>
  </div>
);

const TableLeigh = () => (
  <div style={{ overflowX:"auto", margin:"16px 0" }}>
    <table style={{ borderCollapse:"collapse", width:"80%", fontSize:13, margin:"0 auto" }}>
      <thead><tr><td style={thb4}>Component</td><td style={thb4}>Role</td></tr></thead>
      <tbody>
        {[
          ["Vit. B₁ (Thiamine)","A crucial cofactor for an enzyme often deficient in Leigh syndrome."],
          ["Coenzyme Q 10","An essential part of electron transport chain."],
          ["L-Carnitine","Helps transport fatty acids into the mitochondria for energy."],
          ["Vit. B₂ (Riboflavin)","A building block for molecules involved in energy metabolism."],
        ].map(([a,b],i) => <tr key={i}><td style={{...tdb4, fontWeight:700}}>{a}</td><td style={tdb4}>{b}</td></tr>)}
      </tbody>
    </table>
  </div>
);

const content_b4 = [
  <SubHd key="sub-s1115" id="s1115" label="1.11.5" title="Mitochondria" />,
  <p key="b4-p-s1115-1" style={{ textIndent:28, textAlign:"justify" }}>The mitochondria (singular mitochondrion) are visible under a light microscope as small spheres or short rods distributed in the cytoplasm. However, their detailed structure has been revealed by electron microscope.</p>,
  <p key="b4-p-s1115-occ" style={{ textIndent:28, textAlign:"justify" }}><strong>• Occurrence.</strong> The mitochondria are found in all aerobic eukaryotic cells. They are lacking in anaerobic protozoans, mature mammalian red blood cells and in prokaryotes.</p>,
  <p key="b4-p-s1115-struct" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure.</strong> The mitochondria are usually sausage-shaped, but may be spherical, oval, cylindrical, filamentous or even branched. Each mitochondrion is bounded by a <strong>double membrane envelope</strong> (Fig. 1.24). The <strong>outer membrane</strong> is smooth and freely permeable to small molecules and medium sized molecules and ions. The <strong>inner membrane</strong> is selectively permeable and is thrown into numerous folds to increase its area several times. The folds are called <strong>cristae</strong> (singular crista). The cristae are arranged in characteristic patterns in different cells and bear ATP-generating assemblies called <strong>oxysomes</strong> or <strong>elementary particles.</strong> The two membranes of each mitochondrion are separated by a narrow space called <strong>inter-membrane space</strong> or <strong>outer chamber.</strong> It contains a clear, homogeneous fluid. The space between the cristae is called <strong>inner chamber.</strong> It is filled with a dense fluid called <strong>mitochondrial matrix.</strong> The matrix contains respiratory enzymes, lipids, some ribosomes, RNA, a circular DNA and certain ions.</p>,
  <Fig key="fig-1-24" src={IMG124} num="Fig. 1.24" caption="Diagram of a mitochondrion in section." />,
  <p key="b4-p-s1115-fns-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Functions.</p>,
  <p key="b4-p-s1115-fn1" style={{ textIndent:28, textAlign:"justify" }}>(<em>i</em>) Mitochondria are the main seat of cell respiration. They use molecular oxygen and bring about stepwise oxidation of food stuffs (carbohydrates, fats) present in the cells to carbon dioxide and water. Oxidation of food releases energy which is temporarily stored to form high-energy <strong>ATP</strong> (adenosine triphosphate) molecules. ATP is used to bring about energy-requiring activities of the cell. On this account, the mitochondria are often described as the <strong>'power houses'</strong> or <strong>'storage batteries'</strong> of the cell and ATP is known as <strong>energy currency</strong> of the cell.</p>,
  <KBBox key="kb-energy-activities">
    <p style={{ fontWeight:700, fontSize:14, margin:0 }}>Some important energy requiring activities of the cell include synthesis of chemical compounds (<em>e.g.,</em> carbohydrates, proteins, lipids, DNA replication, transcription of RNAs), active transport of materials against concentration gradient across the plasma membrane, mechanical work (<em>e.g.,</em> muscle contraction for movements and locomotion, movement of cilia and flagella), conduction of nerve impulse, production of heat, etc.</p>
  </KBBox>,
  <p key="b4-p-s1115-semiaut" style={{ textIndent:28, textAlign:"justify" }}>Mitochondria are capable of self duplication (replication). They have DNA, RNA, ribosomes and enzymes. They are able to synthesize some of their own proteins. Hence, they are regarded as <strong>semiautonomous organelles.</strong></p>,

  <SubHd key="sub-s1116" id="s1116" label="1.11.6" title="Plastids" />,
  <p key="b4-p-s1116-loc" style={{ textIndent:28, textAlign:"justify" }}>Plastids are the cytoplasmic organelles visible under the light microscope. However, their detailed structure can be seen under electron microscope.</p>,
  <p key="b4-p-s1116-locat" style={{ textIndent:28, textAlign:"justify" }}><strong>• Location.</strong> These organelles are found in the plant cells and in certain protists but are absent in animal cells.</p>,
  <p key="b4-p-s1116-types" style={{ textIndent:28, textAlign:"justify" }}><strong>• Types.</strong> The plastids of higher plants exist in a variety of forms and have wide range of structure and function. Basically, they can be categorized into two broad categories: (<em>a</em>) <strong>Leucoplasts</strong> (colourless plastids) and (<em>b</em>) <strong>Chromoplasts</strong> (coloured plastids).</p>,
  <p key="b4-p-leuco" style={{ textIndent:28, textAlign:"justify" }}>(<em>a</em>) <strong>Leucoplasts.</strong> The leucoplasts are colourless plastids which occur in the cells that are not exposed to sunlight. Leucoplasts are of three types depending upon the products they store: (<em>i</em>) <strong>Amyloplasts</strong> store starch. (<em>ii</em>) <strong>Aleuroplasts</strong> store protein, and (<em>iii</em>) <strong>elaioplasts</strong> store oil. These are mostly present in the storage cells of roots and underground stems.</p>,
  <p key="b4-p-chromo" style={{ textIndent:28, textAlign:"justify" }}>(<em>b</em>) <strong>Chromoplasts.</strong> The chromoplasts are coloured plastids which occur in the cells that are exposed to sunlight. These are of two sub-types: <strong>nongreen chromoplasts</strong> and <strong>green chromoplasts.</strong> The chromoplasts having light-absorbing green pigment chlorophyll, are known as <strong>chloroplasts</strong> or <strong>green plastids.</strong> These are commonly present in leaf cells of most higher plants and certain green algae. The nongreen chromoplasts containing other coloured pigments (red, orange, yellow etc.) due to presence of carotenoids, are found in certain algae and in the flowers, fruits and roots of higher plants.</p>,
  <p key="b4-p-chloro-struct" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure of chloroplasts.</strong> The chloroplasts of higher plants are usually spherical, ovoid, discoidal or lens shaped. Each chloroplast is a vesicle bounded by double membrane envelope and filled with a fluid matrix like the mitochondrion (Fig. 1.25). The <strong>outer membrane</strong> is smooth and freely permeable to small molecules. <strong>Inner membrane</strong> is, however, selectively permeable. It has carrier proteins that control the passage of molecules. It is greatly infolded but the infolds become free in the mature chloroplast to lie as <strong>lamellae</strong> in the matrix.</p>,
  <Fig key="fig-1-25" src={IMG125} num="Fig. 1.25" caption="Diagrammatic representation of sectional view of chloroplast" />,
  <p key="b4-p-lamellae" style={{ textIndent:28, textAlign:"justify" }}><strong>Lamellae.</strong> These are closed, flattened, membrane-bound ovoid sacs called <strong>thylakoids</strong> which lie closely packed in piles, the <strong>grana</strong> (singular granum). These contain green chlorophyll pigment molecules.</p>,
  <p key="b4-p-matrix" style={{ textIndent:28, textAlign:"justify" }}><strong>Matrix.</strong> It is a colourless, granular, colloidal ground substance called <strong>stroma.</strong> It contains proteins, lipids, ribosomes, circular DNA, RNA molecules, enzymes, lipid droplets, and certain metal ions.</p>,
  <p key="b4-p-chloro-photosyn" style={{ textIndent:28, textAlign:"justify" }}>Granum is the site of <strong>light reaction</strong> during photosynthesis whereas stroma is the site of <strong>dark reaction</strong> during photosynthesis. Chloroplasts trap the solar energy which is used for manufacturing the food. They are, therefore, the sites of photosynthesis and are commonly called <strong>'kitchen of the cells'.</strong></p>,
  <p key="b4-p-plastid-semi" style={{ textIndent:28, textAlign:"justify" }}>Like mitochondria, the plastids are self-duplicating organelles. They can manufacture some of their proteins with the help of their DNA, RNAs, enzymes and ribosomes and, hence, are called <strong>semi-autonomous organelles.</strong></p>,
  <p key="b4-p-plastid-fns-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Functions.</p>,
  <ol key="b4-ol-plastid-fns" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:4 }}>The chloroplasts trap the radiant energy of sunlight and transform it into the chemical energy of carbohydrates using water and CO<Sub c="2" /> (carbon dioxide). The process is called <strong>photosynthesis.</strong></li>
    <li style={{ marginBottom:4 }}>The chromoplasts impart various colours to flowers to attract insects for pollination and to the fruits for alluring certain animals for seed dispersal.</li>
    <li>Leucoplasts store food in the form of starch (carbohydrates), fats and proteins.</li>
  </ol>,

  <SubHd key="sub-s1117" id="s1117" label="1.11.7" title="Vacuoles" />,
  <p key="b4-p-s1117-loc" style={{ textIndent:28, textAlign:"justify" }}><strong>• Location.</strong> The vacuoles occur in most cells. They are small in size but more in number in animal cells. Fungi and plant cells have large-sized but fewer vacuoles.</p>,
  <p key="b4-p-s1117-struct" style={{ textIndent:28, textAlign:"justify" }}><strong>• Structure.</strong> Vacuoles are storage sacs for solid or liquid contents bounded by a unit membrane. In animal cells, large number of small-sized vacuoles are present. In single-celled organisms such as <em>Amoeba</em> or <em>Paramecium,</em> the food vacuole contains the food item that the animal has ingested and subsequently consumed. Many unicellular organisms, in addition, possess specialized vacuoles that serve as <strong>osmoregulatory organelles,</strong> <em>i.e.,</em> they are associated with the maintenance of water balance of the body.</p>,
  <p key="b4-p-s1117-plant" style={{ textIndent:28, textAlign:"justify" }}>In plant cells, generally vacuoles arise from endoplasmic reticulum and Golgi apparatus which fuse at maturity of the cells to form large vacuoles. These vacuoles are bubble-like sacs bounded by a unit membrane called the <strong>tonoplast.</strong> They are filled with a fluid called <strong>cell sap.</strong> The latter consists of free water and a variety of compounds (<em>e.g.,</em> minerals, sugars, oxygen, carbon dioxide, soluble pigments, amino acids, proteins and organic acids) in solution or suspension. The tonoplast, like the plasma membrane, is selectively permeable. The cell sap provides turgidity and rigidity to the cell. The central vacuole of some plant cells may occupy 50-90% of the cell volume. Because of central position of the vacuole, the nucleus and other cell organelles are pushed to the sides in plant cells.</p>,
  <p key="b4-p-s1117-fns-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>• Functions.</p>,
  <ol key="b4-ol-vac-fns" style={{ paddingLeft:28, fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:4 }}>They are storage sacs of the cell. The stored material may be solid or liquid food or toxic metabolic by-products or end products of cells.</li>
    <li style={{ marginBottom:4 }}>In some unicellular organisms, specialized vacuoles maintain water balance of the body (osmoregulation).</li>
    <li>In plants, they provide turgidity and rigidity to the cells.</li>
  </ol>,

  <SecHd key="sec-s112" id="s112" label="1.12" title="Cell Inclusions" />,
  <p key="b4-p-s112-1" style={{ textIndent:28, textAlign:"justify" }}>The <strong>cell inclusions</strong> are non-living materials present in the cytoplasm. They are often called <strong>deutoplasmic substances.</strong> They may be organic or inorganic compounds, or both. The common cell inclusions are stored organic food materials, secretions and excretions, and inorganic crystals.</p>,
  <p key="b4-p-s112-2" style={{ textIndent:28, textAlign:"justify" }}>Thus, a cell acquires distinct structure and function due to the organization of its membrane and cytoplasmic organelles in specific ways. Such an organization enables the cells to perform basic functions such as respiration, nutrition, forming new proteins, clearing of waste material etc. The cell, therefore, is the fundamental <strong>structural unit</strong> and basic <strong>functional unit</strong> of living organisms.</p>,
  <Table18 key="tbl-1-8" />,

  <SecHd key="sec-s113" id="s113" label="1.13" title="Biomolecules" />,
  <p key="b4-p-s113-1" style={{ textIndent:28, textAlign:"justify" }}>Large organic molecules, called <strong>biomolecules</strong> are fundamental building blocks and energy sources of all living cells. They are categorized in four main types: nucleic acids, proteins, carbohydrates and lipids.</p>,
  <p key="b4-p-s113-nucleic" style={{ textIndent:28, textAlign:"justify" }}><strong>1. Nucleic acids.</strong> These are the information managers of the cell. Their primary role is to store and transmit genetic instructions needed to build and operate a cell. There are two types of nucleic acids: <strong>DNA</strong> (deoxyribonucleic acid) and <strong>RNA</strong> (ribonucleic acid). Each nucleic acid molecule is composed of a large number of <strong>nucleotide</strong> molecules joined into a linear unbranched chain. These are, thus, <strong>nucleotide polymers</strong> or <strong>polynucleotides.</strong> Each nucleotide has three components, namely, <strong>phosphate,</strong> a <strong>pentose sugar</strong> (deoxyribose sugar in DNA and ribose sugar in RNA) and a <strong>nitrogenous base.</strong> The nitrogenous base may be <strong>purine</strong> (adenine or guanine) or <strong>pyrimidine</strong> (thymine or cytosine).</p>,
  <ul key="b4-ul-nucleic" style={{ margin:"8px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:6 }}><strong>DNA</strong> (deoxyribonucleic acid) is a long molecule, shaped like a twisted ladder (called <strong>double helix</strong>). It contains the complete set of genes, which are the instructions for making every protein needed by the cell. Being vital, DNA is carefully protected inside the nucleus of all eukaryotic cells.</li>
    <li><strong>RNA</strong> (ribonucleic acid). It is typically a single-stranded molecule. Its main job is to act as a temporary copy of gene from the DNA. This RNA message travels out of the nucleus to the cytoplasm, where it directs the synthesis of a specific protein.</li>
  </ul>,
  <p key="b4-p-s113-proteins" style={{ textIndent:28, textAlign:"justify" }}><strong>2. Proteins.</strong> These are the most versatile of the biomolecules and play a very significant role in the structure and functions of the cell. Proteins are built from smaller units called <strong>amino acids,</strong> linked together in long chains (polypeptides). In a protein molecule, amino acid units are linked together by <strong>peptide bonds.</strong> There are 20 common types of amino acids.</p>,
  <p key="b4-p-s113-proteins2" style={{ textIndent:28, textAlign:"justify" }}>The sequence of these amino acids determines how the polypeptide chain folds into a unique three-dimensional shape. This shape is crucial because a protein's function depends entirely on its structure. Some proteins provide structural support, like the filaments of the cytoskeleton. Others are embedded in the cell membrane to transport materials in and out. A special class of proteins called <strong>enzymes</strong> are essential for life. Enzymes act as catalysts by speeding up chemical reactions in the cell without being consumed in the process. Enzymes have <strong>substrate specificity.</strong></p>,
  <p key="b4-p-s113-carbs" style={{ textIndent:28, textAlign:"justify" }}><strong>3. Carbohydrates.</strong> These are the primary molecules for energy management and structure in the cell. Carbohydrates include sugars and starches which serve as main sources of quick energy. Glucose is the simple sugar which acts as a fuel and is broken down in cytoplasm and mitochondria to produce ATP (the cell's energy currency). Cells can also link sugar molecules together to form large polymers for storage. In animals, the storage form is <strong>glycogen,</strong> while in plants, it is <strong>starch.</strong> Some carbohydrates such as <strong>cellulose</strong> have structural roles. It forms the rigid cell wall of plant cells.</p>,
  <p key="b4-p-s113-lipids" style={{ textIndent:28, textAlign:"justify" }}><strong>4. Lipids.</strong> Like carbohydrates, lipids are also the primary molecules for energy management and structure in the cell. Lipids are diverse group of molecules that include fats, oils and waxes. They are <strong>hydrophobic,</strong> <em>i.e.,</em> they do not mix with water. This property makes them perfect for forming cellular barriers.</p>,
  <p key="b4-p-s113-phospho" style={{ textIndent:28, textAlign:"justify" }}><strong>Phospholipids</strong> are the most important lipids in the cell. These molecules form the main fabric of the plasma membrane. They have hydrophilic (water-loving) head and a hydrophobic (water-fearing) tail. It helps them to arrange into a double layer (bilayer), creating an effective barrier between the cell's interior and the outside environment. Lipids (natural fats) also serve as food reserves in both plants and animals and act as efficient means to store energy for the long term.</p>,

  <SecHd key="sec-s114" id="s114" label="1.14" title="Cell Division" />,
  <p key="b4-p-s114-1" style={{ textIndent:28, textAlign:"justify" }}>Cells also have a life cycle. They are born, grow and perform their functions, and eventually divide to create new cells. This orderly sequence of events is called the <strong>cell cycle.</strong></p>,
  <DefBox key="def-cell-cycle">In simple words, the cell cycle refers to the sequence of events involving growth and division of a cell from the time of its formation to its own divisions into daughter cells.</DefBox>,
  <p key="b4-p-s114-phases" style={{ textIndent:28, textAlign:"justify" }}>A typical eukaryotic somatic cell has two main stages: a long undividing state called <strong>interphase</strong> (I phase), and a shorter phase of nuclear division termed <strong>mitotic</strong> or <strong>M phase.</strong> These phases are followed by a still shorter phase of cytoplasmic division known as <strong>cytokinesis</strong> or <strong>C phase.</strong></p>,
  <p key="b4-p-s114-interphase" style={{ textIndent:28, textAlign:"justify" }}>Interphase is not a resting period. It is, in fact, divided into three steps:</p>,
  <ul key="b4-ul-interphase" style={{ margin:"8px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:6 }}><strong>G1 (First Gap).</strong> During this step, the newly formed daughter cell grows in size, makes new proteins, and produces more organelles (<em>e.g.,</em> mitochondria and ribosomes).</li>
    <li style={{ marginBottom:6 }}><strong>S (Synthesis).</strong> This step is the critical part of interphase. The cell makes a complete copy of its DNA. Before this step, each chromosome is single structure. After this step, each chromosome now consists of two identical sister chromatids joined together. This ensures that when the cell eventually divides, each new cell gets a full set of genetic instructions.</li>
    <li><strong>G2 (Second Gap).</strong> In this step, the cell continues to grow and produces the proteins and structures needed for division.</li>
  </ul>,
  <p key="b4-p-checkpoints" style={{ textIndent:28, textAlign:"justify" }}>The cell cycle has its own quality control system in the form of <em>check points.</em> These are crucial stopping points where the cell pauses to check if everything is okay before proceeding to the next phase.</p>,
  <div key="b4-tbl-checkpoints" style={{ overflowX:"auto", margin:"16px 0" }}>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead><tr><td style={thb4}>Checkpoint</td><td style={thb4}>What it checks</td><td style={thb4}>Why it is Important</td></tr></thead>
      <tbody>
        <tr>
          <td style={{...tdb4, fontWeight:700}}>G1 Checkpoint</td>
          <td style={tdb4}>• Is the cell large enough?<br />• Does it have enough resources?<br />• Is the DNA undamaged?</td>
          <td style={tdb4}>This is the primary decision point. If the conditions are not right, the cell will not enter S phase to copy its DNA.</td>
        </tr>
        <tr>
          <td style={{...tdb4, fontWeight:700}}>G2 Checkpoint</td>
          <td style={tdb4}>• Is the DNA replicated correctly?<br />• Is the cell large enough to divide?</td>
          <td style={tdb4}>This prevents the cell from entering the division phase with damaged or incomplete DNA.</td>
        </tr>
        <tr>
          <td style={{...tdb4, fontWeight:700}}>M (Spindle) Checkpoint</td>
          <td style={tdb4}>• Are all the chromosomes properly attached to the mitotic spindle?</td>
          <td style={tdb4}>This ensures that sister chromatids separate evenly into the two new (daughter) cells.</td>
        </tr>
      </tbody>
    </table>
  </div>,
  <p key="b4-p-apoptosis" style={{ textIndent:28, textAlign:"justify" }}>If the cell detects a problem at a checkpoint, it can pause to make repairs. If the damage is too severe to be fixed, the cell will trigger a process called <strong>apoptosis</strong> or programmed cell death. This is a vital self-destruct mechanism that prevents damaged cell from multiplying.</p>,
  <p key="b4-p-cell-div-types" style={{ textIndent:28, textAlign:"justify" }}>Literally speaking, cell division is the process by which new cells are formed. In unicellular organisms, it is a means of multiplication to form new cells. In multicellular organisms, cell division forms new cells to bring about embryonic development and growth, to replace old, worn out dead and injured cells, and also to form gametes for reproduction. Cell division occurs in two main ways: <strong>• mitosis,</strong> and <strong>• meiosis.</strong></p>,
  <p key="b4-p-mitosis-def" style={{ textIndent:28, textAlign:"justify" }}><strong>• Mitosis.</strong> In the animals, it is a common method of cell division. It takes place in the somatic (body) cells. Hence, it is also known as the <em>somatic division.</em> It also occurs in gonads for the multiplication of undifferentiated germ cells. In plants, mitosis occurs in the meristematic tissues and also during the growth of leaves, flowers and fruits.</p>,
  <DefBox key="def-mitosis">The division of a parent cell into two identical daughter cells, each with a nucleus having the same amount of DNA, the same number and kind of chromosomes as the parent cell is called <strong><em>mitosis.</em></strong></DefBox>,
  <p key="b4-p-mitosis-desc" style={{ textIndent:28, textAlign:"justify" }}>In mitosis, each mother cell divides to form two identical daughter cells (Fig. 1.26). The two daughter cells have the same number and kind of chromosomes as the mother cell. Hence, mitosis is also known as the <strong><em>equational division.</em></strong> Mitosis helps in growth and repair of tissues by replacing old, worn out dead cells or injured cells in organisms.</p>,
  <Fig key="fig-1-26" src={IMG126} num="Fig. 1.26" caption="Mitosis" />,
  <p key="b4-p-meiosis-def" style={{ textIndent:28, textAlign:"justify" }}><strong>• Meiosis.</strong> Unlike mitosis, meiosis is only confined to specific cells (called <strong><em>meiocytes</em></strong>) of reproductive organs or tissues in animals, plants, various protists and fungi, and takes place at a particular time. The specific cells divide to form gametes. The male and female gametes, by the process of fertilization, form zygote which develops to give rise to offspring.</p>,
  <p key="b4-p-meiocytes" style={{ textIndent:28, textAlign:"justify" }}>The meiocytes are of 3 types: oocytes, spermatocytes and sporocytes. The oocytes give rise to female gametes called <strong><em>ova</em></strong> or <strong><em>eggs</em></strong>; spermatocytes form male gametes termed <strong><em>spermatozoa</em></strong> or <strong><em>sperms</em></strong>; and sporocytes produce special cells known as <strong><em>spores</em></strong> (asexual structures). Oocytes and spermatocytes are found in the sex organs or gonads. Sporocytes are found in the organs called sporogonia.</p>,
  <DefBox key="def-meiosis">The division of a meiocyte, by two consecutive divisions, to form four daughter cells, each having half the amount of DNA and half the number and kind of chromosomes as the mother meiocyte cell is called <strong>meiosis.</strong></DefBox>,
  <p key="b4-p-meiosis-desc" style={{ textIndent:28, textAlign:"justify" }}>Meiosis involves two consecutive divisions, called meiosis-I and meiosis-II. The mother cell (meiocyte) divides twice to form four daughter cells (Fig. 1.27). The new daughter cells have half the number of chromosomes and half of the nuclear DNA amount than that of the mother cell. Hence, meiosis is also known as the <strong><em>reduction division.</em></strong> Meiosis helps in forming gametes or spores for reproduction in organisms.</p>,
  <Fig key="fig-1-27" src={IMG127} num="Fig. 1.27" caption="Meiosis" />,
  <p key="b4-p-variation" style={{ textIndent:28, textAlign:"justify" }}><strong>• Role of Cell Division in Creating Similarities and Differences (Variations):</strong> In mitosis, each mother cell divides to form two identical daughter cells. The two daughter cells have the same number and kind of chromosomes as the mother cell. As the cell, during S (Synthesis) step of Interphase, makes a complete copy of its DNA, therefore, mitosis brings similarities. Meiosis, on the other hand, provides a chance for the formation of new combinations of chromosomes during meiosis-I. Hence, it brings about variations.</p>,
  <Table19 key="tbl-1-9" />,
  <FeatureBox key="feat-cancer" title="■ Cancer">
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>Cancer may be defined as a malignant growth or enlargement of a tissue that occurs due to unlimited and uncontrolled mitotic divisions of certain cells and invades surrounding tissues.</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>It is a dreadful disease. It is most common in people between 40 to 60 years of age, but may occur at a younger age also. It commonly originates in the tissues in which the cells are regularly replaced by mitosis. These tissues include skin, lining of digestive tract, reproductive organs, lungs and liver.</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:0 }}>The cell cycle is a masterpiece of biological regulation. Normally, the cells of a given tissue divide at a certain fixed rate and in a controlled manner. Sometimes, for reasons not clear yet, when the checkpoint mechanisms are broken, mitosis in these tissues occurs at rates far above the normal and in an uncontrolled fashion. Cancer cells essentially ignore the stop signals of the cell cycle and multiply relentlessly. This results in an abnormal growth called <strong>tumour.</strong> In the cancer of white blood cells (leukemia), however, no tumour is formed. Certain radiations, heavy smoking, toxic chemicals, chewing tobacco, some viruses etc., are known to cause cancer. It has been found that specific genes (<strong>oncogenes</strong>) are associated with cancer.</p>
  </FeatureBox>,

  <SecHd key="sec-s115" id="s115" label="1.15" title="Recent Advancements in Cell Biology" />,
  <p key="b4-p-s115-1" style={{ textIndent:28, textAlign:"justify" }}><strong>Cell biology</strong> is the study of cells, the fundamental units of life, focusing on their structure, functions, growth, and behaviour. It investigates everything from basic components of cells like membranes and organelles to processes like metabolism, communication, and reproduction by using recent tools and techniques.</p>,
  <p key="b4-p-s115-advances" style={{ margin:"8px 0 4px" }}>Recent cell biology advancements focus on:</p>,
  <ul key="b4-ul-advances" style={{ margin:"4px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:4 }}>Precise gene editing (CRISPR-Cas9, a gene-editing tool being used to cure genetic disorders).</li>
    <li style={{ marginBottom:4 }}>Organoid technology (creating miniature organs from stem cells for drug testing for the treatment of cancer and genetic disorders).</li>
    <li style={{ marginBottom:4 }}>Stem cell therapies (induced pluripotent stem cells for regeneration)</li>
    <li style={{ marginBottom:4 }}>Proteomics (deep protein analysis)</li>
    <li style={{ marginBottom:4 }}>AI-driven modelling for cell fate.</li>
    <li>Super-resolution microscopy techniques (to watch interaction of individual proteins in real time).</li>
  </ul>,
  <p key="b4-p-advances-end" style={{ textIndent:28, textAlign:"justify" }}>All these advancements enhance disease understanding, modelling, and potential cures.</p>,

  <SubHd key="sub-s1151" id="s1151" label="1.15.1" title="Indian Contributions to Cell Biology" />,
  <p key="b4-p-s1151-intro" style={{ textIndent:28, textAlign:"justify" }}>Many Indian researchers have made foundational contributions that have shaped our understanding of the cell. Their contributions have made a lasting impact on fundamental science as well as practical applications in medicine and agriculture. Some significant contributions are –</p>,
  <FeatureBox key="feat-ramachandran" title="■ G.N. Ramachandran">
    <p style={{ textAlign:"justify", fontSize:14, margin:0 }}>In 1950s, G.N. Ramachandran and Coworkers unraveled the triple-helix structure of collagen (the most abundant protein in animals). It is the main component of connective tissues like skin, tendons, and bones, giving them strength and structure. Ramachandran and his team also created 'the Ramachandran plot' which provided a clear and simple map to check if a proposed protein structure was physically plausible. This tool became essential for designing new drugs, and understanding diseases caused by misfolded proteins.</p>
  </FeatureBox>,
  <FeatureBox key="feat-obaid" title="■ Obaid Siddigui">
    <p style={{ textAlign:"justify", fontSize:14, margin:0 }}>Obaid Siddigui worked on the fruit fly (<em>Drosophila melanogaster</em>). He used genetic techniques to dissect the nervous system. His lab identified genes that control how neurons sense smells and tastes, and how these signals are processed to produce behaviour.</p>
  </FeatureBox>,
  <FeatureBox key="feat-swaminathan" title="■ M.S. Swaminathan">
    <p style={{ textAlign:"justify", fontSize:14, margin:0 }}>M.S. Swaminathan applied principles of genetics and plant cell biology to develop high-yield varieties of wheat and rice.</p>
  </FeatureBox>,
  <FeatureBox key="feat-khorana" title="■ Dr. Hargobind Khorana — Cracking the Genetic Code">
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>Dr. Hargobind Khorana made significant contributions in the fields of Genetics and Molecular Biology. His major contribution was cracking the genetic code and establishing how three consecutive nucleotide units (codons) code for 20 amino acids in protein synthesis in the cells. Dr. Khorana's brilliant approach was to synthesize artificial RNA strands with specific, repeating base sequences. By adding these strands to a cell-free system that could produce proteins, he could see which amino acids were created.</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>For instance, he created an RNA strand with a repeating UCUCUC... sequence. The resulting protein was made of two alternating amino acids, serine and leucine. He now knew that UCU must code for one amino acid, and CUC must code for the other amino acid. By creating different patterns, he and his team systematically deciphered the genetic code. This work confirmed that the genetic code is read in non-overlapping groups of three bases.</p>
    <DefBox key="def-codon">Codon – A sequence of three consecutive nucleotides in a DNA or RNA molecule that codes for a specific amino acid.</DefBox>
    <p style={{ textAlign:"justify", fontSize:14, margin:0 }}>Dr. Khorana's work was a cornerstone of modern molecular biology and genetics. For his research on the interpretation of the genetic code and its function in protein synthesis, he was awarded Nobel Prize in Physiology or Medicine in 1968, sharing it with Robert W. Holley and Marshall W. Nirenberg.</p>
  </FeatureBox>,
  <FeatureBox key="feat-sharma" title="■ Contributions of Professor Arun Kumar Sharma">
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>Professor Arun Kumar Sharma (1924-2017) revolutionized plant cytogenetics by developing novel techniques for studying chromosome structure, chemistry, and behaviour, particularly in monocotyledons and dicotyledons. His contributions advanced our understanding of plant evolution and the practical applications in modern biology.</p>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:13.5, margin:"8px 0 4px" }}>Chromosome Techniques</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>For a long time, scientists studying plant chromosomes focused almost exclusively on meristematic tissues such as the rapidly dividing cells in an onion root tip. Professor Arun Kumar Sharma recognized this problem. He pioneered methods to study chromosomes from almost any part of the plant, including leaves, stems, and even flower buds. Professor Sharma perfected the critical pretreatment step. He also developed a technique, called "Orcein Banding" for identifying repeated DNA sequences. This banding technique revealed a reproducible pattern of dark and light bands along the length of chromosomes.</p>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:13.5, margin:"8px 0 4px" }}>Evolutionary Cytogenetics Concepts</p>
    <p style={{ textAlign:"justify", fontSize:14, margin:"0 0 8px" }}>By using his advanced staining techniques, Professor Sharma analysed somatic cell chromosomes in asexually reproducing plants. He observed that even within a single plant, not all the cells had the same number of chromosomes. He found a mixture or mosaic of cells with varying chromosome counts. This 'chromosome dynamism' phenomenon meant that plant was not a single genetic entity but a collection of genetically different cell lines. Professor Sharma's group also focused on B-chromosomes (extra or accessory chromosomes found in some individuals within a species). His work helped to establish evolutionary trends in the plant kingdom. For his revolutionary findings, Professor Sharma was awarded Shanti Swarup Bhatnagar Prize in 1967 and Padam Bhushan in 1983.</p>
  </FeatureBox>,
  <KBBox key="kb-research-centres">
    <KBHd>Research Centres in Cell Biology</KBHd>
    <p style={{ fontSize:14, margin:"0 0 8px" }}><strong>• Centre for Cellular and Molecular Biology (CCMB).</strong> It is a premier research organisation of CSIR in frontier areas of modern biology. It is located in Hyderabad, Telangana (India). It was set up initially as a semi-autonomous Centre on April 1, 1997 at Regional Research Laboratory, Hyderabad with Dr. P.M. Bhargava its head. CCMB moved to its present campus on November 26, 1987. The objectives of the centre are to conduct high quality basic research and training in frontier areas of modern biology (<em>e.g.,</em> stem cell biology, regenerative medicine, proteomics) and to promote centralised national facilities for new and modern techniques in the interdisciplinary areas of biology.</p>
    <p style={{ fontSize:14, margin:0 }}><strong>• National Centre for Cell Science (NCCS).</strong> It is an autonomous organisation aided by the Department of Biotechnology, Government of India. It is located within the academically-enriched campus of the Savitribai Phule Pune University (SPPU), Pune, Maharashtra (India). It was established in 1986 to facilitate research on cell culture, cell repository, immunology, cancer biology, genomics, chromatin-remodelling etc. Its primary role is to act as a <strong>national repository for animal cell cultures.</strong> Researchers from all over the country can request these cell lines for their experiments.</p>
  </KBBox>,

  <SecHd key="sec-s116" id="s116" label="1.16" title="Case Study Related to Leigh Syndrome and Mitochondrial Dysfunction" />,
  <p key="b4-p-s116-1" style={{ textIndent:28, textAlign:"justify" }}><strong>Leigh syndrome</strong> is a severe neurological disorder in the children, typically appearing during the first year of life after a common illness such as fever or cold. It is caused by a failure in the functioning of mitochondria (the power houses inside the cells). When mitochondria cannot produce enough energy, the brain and nervous system, in particular, begin to malfunction.</p>,
  <p key="b4-p-s116-faulty-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>Faulty Blue Print</p>,
  <p key="b4-p-s116-2" style={{ textIndent:28, textAlign:"justify" }}>Mitochondria have their own small set of DNA, called mitochondrial DNA (<em>mt</em>DNA), but most of the DNA of the cell is stored in the nucleus (<em>n</em>DNA). A mutation in any of the genes related to mitochondrial energy production can cause Leigh syndrome.</p>,
  <p key="b4-p-s116-3" style={{ textIndent:28, textAlign:"justify" }}>This disease can be inherited in different ways. Mutations in nuclear DNA (<em>n</em>DNA) follow typical inheritance patterns from both parents. However, since we inherit our mitochondrial DNA (<em>mt</em>DNA) exclusively from our mother, mutations in mitochondrial DNA (<em>mt</em>DNA) are passed down maternally. Over 75 different genes have been linked to Leigh syndrome. All of these disrupt the final, crucial stages of energy production, <em>i.e.,</em> electron transport chain.</p>,
  <p key="b4-p-s116-signs-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>Signs and Diagnosis</p>,
  <p key="b4-p-s116-4" style={{ textIndent:28, textAlign:"justify" }}>The symptoms of Leigh syndrome reflect the brain's struggle for energy. A normal developing infant suddenly starts losing motor skills, a condition called <strong>psychomotor regression.</strong> Such child may lose the ability to sit up, smile, or suck. Other common signs include poor muscle tone (hypotonia), difficulty in swallowing, vomiting, irritability and seizures.</p>,
  <p key="b4-p-s116-5" style={{ textIndent:28, textAlign:"justify" }}>Diagnosing Leigh syndrome is a multi-step process. Doctors look at the clinical symptoms and family history. They diagnose it through Magnetic Resonance Imaging (MRI) of the brain. The scans often reveal characteristic patterns of damage or lesions in specific brain regions (basal ganglia and brainstem). These areas are vital for motor control. Blood tests may also reveal high levels of lactate, a byproduct that builds up when cellular energy production is impaired. Ultimately, genetic testing is used to confirm the diagnosis by identifying the specific mutation responsible for the disease.</p>,
  <p key="b4-p-s116-treatment-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>Treatment</p>,
  <p key="b4-p-s116-6" style={{ textIndent:28, textAlign:"justify" }}>Currently, there is no cure for Leigh syndrome. Treatment is focused on managing symptoms and providing supportive care involving a combination of vitamins and cofactors to support the struggling energy production pathway.</p>,
  <TableLeigh key="tbl-leigh" />,

  <SecHd key="sec-s117" id="s117" label="1.17" title="Learning of Structure of Muscle Cells in Their Function in Dance Form and Sports" />,
  <p key="b4-p-s117-1" style={{ textIndent:28, textAlign:"justify" }}>Muscles are composed of long bundles of myocytes (muscle fibres) which contain thousands of myofibrils. Each myofibril, in turn, is composed of numerous sarcomeres, the functional contractile regions of striated muscles. Therefore, muscle fibres (myocytes) are the building blocks of all types of movements.</p>,
  <p key="b4-p-s117-2" style={{ textIndent:28, textAlign:"justify" }}>The structure of a muscle cell, primarily the skeletal (voluntary) muscle fibre, directly determines its function in dance and sports by utilizing different types of fibres: <strong>slow-twitch (Type I)</strong> for endurance and <strong>fast-twitch (Type II)</strong> for power and speed.</p>,
  <p key="b4-p-slow" style={{ textIndent:28, textAlign:"justify" }}><strong>Slow-twitch (Type I) fibres.</strong> These are rich in myoglobin and mitochondria. These use aerobic metabolism to produce sustained, low-force contractions over long periods and are highly fatigue-resistant.</p>,
  <p key="b4-p-fast" style={{ textIndent:28, textAlign:"justify" }}><strong>Fast-twitch (Type II) fibres.</strong> These use anaerobic metabolism to generate short, powerful bursts of force and speed, but fatigue quickly.</p>,
  <p key="b4-p-dance-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, color:"#c0126a", fontSize:14, margin:"12px 0 6px" }}>Function in dance forms and sports</p>,
  <p key="b4-p-s117-dance" style={{ textIndent:28, textAlign:"justify" }}>Dance forms and sports require physical activities. Specific demands of different physical activities lead to distinct structural and functional adaptations in muscle cells.</p>,
  <p key="b4-p-dance-forms-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:13.5, margin:"10px 0 4px" }}>1. Dance forms</p>,
  <ul key="b4-ul-dance" style={{ margin:"4px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:6 }}><strong>Classical Ballet.</strong> It is characterized by sustained postures (<em>e.g., en pointe</em>), balance, and controlled elegant movements. Dancers often have a higher proportion of slow-twitch fibres to maintain form and endurance through long rehearsals and performances.</li>
    <li style={{ marginBottom:6 }}><strong>Contemporary dance.</strong> It involves a greater variety of movements, including dynamic, powerful bursts like leaps and jumps. This dance form involves more fast-twitch fibres for explosive power.</li>
    <li>Strong core muscles are vital for stability, balance during turns, and executing precise movements across all dance forms.</li>
  </ul>,
  <p key="b4-p-sports-hd" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:13.5, margin:"10px 0 4px" }}>2. Sports</p>,
  <ul key="b4-ul-sports" style={{ margin:"4px 0 12px", paddingLeft:24, listStyleType:"disc", fontSize:14, lineHeight:1.8 }}>
    <li style={{ marginBottom:6 }}><strong>Endurance sports</strong> (<em>e.g.,</em> marathon running, long-distance cycling): Athletes, in these sports fields, typically possess a naturally high percentage of slow-twitch fibres. Their training further increases the number of mitochondria and capillary networks within these fibres, enhancing oxygen delivery and sustained energy production.</li>
    <li><strong>Power/Sprint sports</strong> (<em>e.g.,</em> sprinting, weightlifting, jumping). These sports activities require maximum force production in short bursts. Elite athletes often possess genetic pre-disposition for a higher percentage of fast-twitch fibres, which undergo hypertrophy in response to resistance training, leading to greater strength and power.</li>
  </ul>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s11",   label: "1.1",   title: "Introduction",                         level: 1 },
  { id: "s12",   label: "1.2",   title: "Discovery and History of the Cell",    level: 1 },
  { id: "s121",  label: "1.2.1", title: "Instruments for Studying Cells",       level: 2 },
  { id: "s13",   label: "1.3",   title: "Unicellular and Multicellular Organisms", level: 1 },
  { id: "s14",   label: "1.4",   title: "Shape, Size and Number of Cells",      level: 1 },
  { id: "s15",   label: "1.5",   title: "Prokaryotic and Eukaryotic Cells",     level: 1 },
  { id: "s16",   label: "1.6",   title: "Detailed Structure of a Eukaryotic Cell", level: 1 },
  { id: "s17",   label: "1.7",   title: "Plasma Membrane or Cell Membrane",     level: 1 },
  { id: "s171",  label: "1.7.1", title: "Molecular Structure",                  level: 2 },
  { id: "s172",  label: "1.7.2", title: "Functions",                            level: 2 },
  { id: "s173",  label: "1.7.3", title: "Transport of Materials Across Cell Membrane", level: 2 },
  { id: "s18",   label: "1.8",   title: "Cell Wall",                            level: 1 },
  { id: "s181",  label: "1.8.1", title: "Physical Structure",                   level: 2 },
  { id: "s182",  label: "1.8.2", title: "Chemical Composition",                 level: 2 },
  { id: "s183",  label: "1.8.3", title: "Functions",                            level: 2 },
  { id: "s184",  label: "1.8.4", title: "Plasmolysis",                          level: 2 },
  { id: "s19",   label: "1.9",   title: "Nucleus",                              level: 1 },
  { id: "s191",  label: "1.9.1", title: "Structure",                            level: 2 },
  { id: "s192",  label: "1.9.2", title: "Functions",                            level: 2 },
  { id: "s193",  label: "1.9.3", title: "Structure of Chromosome",              level: 2 },
  { id: "s194",  label: "1.9.4", title: "Diploid and Haploid Number of Chromosomes", level: 2 },
  { id: "s110",  label: "1.10",  title: "Cytoplasm",                            level: 1 },
  { id: "s1101", label: "1.10.1","title": "Composition",                        level: 2 },
  { id: "s1102", label: "1.10.2","title": "Cytosol",                            level: 2 },
  { id: "s1103", label: "1.10.3","title": "Functions",                          level: 2 },
  { id: "s111",  label: "1.11",  title: "Cell Organelles",                      level: 1 },
  { id: "s1111", label: "1.11.1","title": "Endoplasmic Reticulum (ER)",         level: 2 },
  { id: "s1112", label: "1.11.2","title": "Ribosomes",                          level: 2 },
  { id: "s1113", label: "1.11.3","title": "Golgi Apparatus",                    level: 2 },
  { id: "s1114", label: "1.11.4","title": "Lysosomes",                          level: 2 },
  { id: "s1115", label: "1.11.5","title": "Mitochondria",                       level: 2 },
  { id: "s1116", label: "1.11.6","title": "Plastids",                           level: 2 },
  { id: "s1117", label: "1.11.7","title": "Vacuoles",                           level: 2 },
  { id: "s112",  label: "1.12",  title: "Cell Inclusions",                      level: 1 },
  { id: "s113",  label: "1.13",  title: "Biomolecules",                         level: 1 },
  { id: "s114",  label: "1.14",  title: "Cell Division",                        level: 1 },
  { id: "s115",  label: "1.15",  title: "Recent Advancements in Cell Biology",  level: 1 },
  { id: "s1151", label: "1.15.1","title": "Indian Contributions to Cell Biology", level: 2 },
  { id: "s116",  label: "1.16",  title: "Case Study: Leigh Syndrome",           level: 1 },
  { id: "s117",  label: "1.17",  title: "Muscle Cells in Dance and Sports",     level: 1 },
];

// ── CONCAT ALL CONTENT ARRAYS ────────────────────────────────
const freeContent = [
  ...content_b1,
];

const lockedContent = [
  ...content_b2,
  ...content_b3,
  ...content_b4,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter1() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div style={{
      background: "#fff", minHeight: "100vh",
      fontFamily: "'EB Garamond',Georgia,'Times New Roman',serif",
      fontSize: 15, lineHeight: 1.58, color: "#1a1a1a",
    }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)" }}>
        <ChapterCover />
        {freeContent}
        <PaywallGate>{lockedContent}</PaywallGate>
      </div>
    </div>
  );
}
