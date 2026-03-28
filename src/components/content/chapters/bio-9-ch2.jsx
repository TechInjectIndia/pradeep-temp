"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── COMPONENT LIBRARY ────────────────────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P = "#f9eef4";

function useFonts() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

const Sup = ({ c }) => <sup style={{ fontSize: "0.72em", lineHeight: 0 }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em", lineHeight: 0 }}>{c}</sub>;
const Frac = ({ n, d }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 2px" }}>
    <span style={{ borderBottom: "1px solid #000", padding: "0 2px", fontSize: "0.88em" }}>{n}</span>
    <span style={{ padding: "0 2px", fontSize: "0.88em" }}>{d}</span>
  </span>
);
const MathBlock = ({ children }) => (
  <div style={{ margin: "6px 0 6px 28px", fontFamily: "'Merriweather', serif", fontSize: 14 }}>{children}</div>
);

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 32, marginBottom: 8 }}>
    <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 16, fontWeight: 700, color: P_COLOR, textTransform: "uppercase", letterSpacing: 0.5, margin: 0, paddingBottom: 4, borderBottom: `2px solid ${P_COLOR}` }}>
      {label && <span style={{ marginRight: 6 }}>{label}.</span>}{title}
    </h2>
  </div>
);

const SubHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 24, marginBottom: 6 }}>
    <h3 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, fontWeight: 700, color: P_COLOR, margin: 0 }}>
      {label && <span style={{ marginRight: 5 }}>{label}.</span>}{title}
    </h3>
  </div>
);

const SubSubHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: P_COLOR, margin: 0 }}>
      {label && <span style={{ marginRight: 5 }}>{label}.</span>}{title}
    </h4>
  </div>
);

const P2 = ({ children, style }) => (
  <p style={{ margin: "4px 0", fontSize: 14, fontFamily: "'Merriweather', serif", lineHeight: 1.8, textAlign: "justify", ...style }}>{children}</p>
);

const DefBox = ({ children, keyId }) => (
  <div style={{ background: "#fff", border: `1px solid #ccc`, borderLeft: `4px solid ${P_COLOR}`, borderRadius: 3, padding: "10px 14px", margin: "12px 0", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, fontStyle: "italic", fontWeight: 600 }}>
    {children}
  </div>
);

const ActHd = ({ children }) => (
  <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: "8px 0 4px" }}>{children}</p>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ background: LIGHT_P, border: `2px solid ${P_COLOR}`, borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ background: P_COLOR, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "3px 12px", borderRadius: 3 }}>ACTIVITY {num}</span>
      {sub && <span style={{ fontFamily: "'Merriweather', serif", fontSize: 13, fontStyle: "italic", fontWeight: 700 }}>{sub}</span>}
    </div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>{children}</div>
  </div>
);

const KBHd = ({ children }) => (
  <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700, color: P_COLOR, textTransform: "uppercase", marginBottom: 4 }}>{children}</p>
);

const KBBox = ({ children }) => (
  <div style={{ background: "#fff8fd", border: `1px solid ${P_COLOR}`, borderRadius: 6, padding: "12px 16px", margin: "14px 0", fontSize: 14, fontFamily: "'Merriweather', serif", lineHeight: 1.8 }}>
    {children}
  </div>
);

const FeatureBox = ({ title, children }) => (
  <div style={{ background: LIGHT_P, border: `1px solid #e0a0c8`, borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: P_COLOR, marginBottom: 8 }}>{title}</div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>{children}</div>
  </div>
);

const ProblemsBox = ({ children }) => (
  <div style={{ background: LIGHT_P, border: `2px solid ${P_COLOR}`, borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "4px 12px", marginBottom: 10, borderRadius: 3, display: "inline-block" }}>PROBLEMS FOR PRACTICE</div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize: 11, color: "#555", fontStyle: "italic" }}> [{children}]</span>
);

const Fig = ({ src, caption, width = "70%" }) => (
  <div style={{ textAlign: "center", margin: "16px 0" }}>
    <img src={src} alt={caption} style={{ maxWidth: width, width: "100%", borderRadius: 4 }} />
    {caption && (
      <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>{caption}</p>
    )}
  </div>
);

const NumericalSection = ({ topic, children }) => (
  <div style={{ background: "#fff8fd", border: `1px solid ${P_COLOR}`, borderRadius: 6, padding: "14px 18px", margin: "16px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 12, padding: "3px 10px", borderRadius: 3, display: "inline-block", marginBottom: 10 }}>NUMERICAL PROBLEMS — {topic}</div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>{children}</div>
  </div>
);

const th = (content) => (
  <th style={{ background: P_COLOR, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", textAlign: "center" }}>{content}</th>
);
const td = (content) => (
  <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{content}</td>
);

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen(!open)} style={{ position: "fixed", top: 14, left: 14, zIndex: 1100, background: P_COLOR, border: "none", borderRadius: 6, width: 40, height: 40, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, boxShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
      {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all 0.2s" }} />)}
    </button>
  );
}

function Backdrop({ open, setOpen }) {
  if (!open) return null;
  return <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1050 }} />;
}

function Sidebar({ open, setOpen, tocItems }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, height: "100vh", width: 280, background: "#fff", zIndex: 1200, boxShadow: "2px 0 16px rgba(0,0,0,0.15)", transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s ease", overflowY: "auto", paddingTop: 60 }}>
      <div style={{ padding: "10px 18px 6px", borderBottom: `2px solid ${P_COLOR}`, marginBottom: 8 }}>
        <span style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: P_COLOR }}>CONTENTS</span>
      </div>
      {tocItems.map(item => (
        <div key={item.id} style={{ padding: `${item.level === 1 ? 8 : item.level === 2 ? 6 : 5}px ${item.level === 1 ? 16 : item.level === 2 ? 24 : 32}px`, cursor: "pointer", borderBottom: "1px solid #f0e0ec" }}
          onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}>
          <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: item.level === 1 ? 13 : 12, fontWeight: item.level === 1 ? 700 : 400, color: item.level === 1 ? P_COLOR : "#333" }}>
            {item.label && <span style={{ marginRight: 5 }}>{item.label}</span>}{item.title}
          </span>
        </div>
      ))}
    </div>
  );
}

const ChapterCover = () => (
  <div style={{ background: "linear-gradient(135deg, #f7c5de 0%, #e8709a 50%, #c0126a 100%)", borderRadius: 8, padding: "40px 32px 32px", marginBottom: 32, textAlign: "center", boxShadow: "0 4px 20px rgba(192,18,106,0.3)" }}>
    <div style={{ display: "inline-block", background: "#fff", borderRadius: 4, padding: "6px 20px", marginBottom: 16 }}>
      <span style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 32, color: P_COLOR }}>2</span>
    </div>
    <h1 style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 28, color: "#fff", margin: 0, letterSpacing: 3, textTransform: "uppercase" }}>Tissues</h1>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 10 }}>Pradeep's Science: Biology Class 9</p>
  </div>
);

// ── TABLE SUB-COMPONENTS ──────────────────────────────────────────────────────

function Table21() {
  return (
    <div style={{ overflowX: "auto", margin: "14px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead>
          <tr>{th("Plant Tissues")}{th("Animal Tissues")}</tr>
        </thead>
        <tbody>
          <tr>
            {td("1. Most of the plants are stationary and remain fixed at one place, i.e., they do not move from place to place. They need comparatively less energy. Therefore, most of the tissues of plants are supportive in function and provide mechanical strength. These tissues are thick-walled, lignified and dead, i.e., they do not contain living protoplasm. Examples, sclerenchyma, xylem tracheids and vessels, cork, etc.")}
            {td("1. Animals are not stationary and move from one place to another in search of food, mates and shelter. They need more energy as compared to plants. Therefore, animal tissues are made up of living cells. Examples, nervous tissues, muscular tissues, connective tissues, etc.")}
          </tr>
          <tr>
            {td("2. Growth of plants is indefinite. Plants grow throughout their life with the help of certain tissues located in certain regions in the body. For example, they possess meristematic tissues in root apex and shoot apex which divide throughout the life and add new cells to the body. These cells differentiate to become permanent tissues which stop dividing. Thus, there are dividing and non-dividing tissues in plants located at specific regions.")}
            {td("2. Growth of animals is definite. It is not confined to certain regions in the body. The animal organs grow more or less uniform. Thus, the animals do not possess dividing and non-dividing regions in the body. In other words, they do not possess specific regions of dividing and non-dividing tissues.")}
          </tr>
          <tr>
            {td("3. The structural organisation of plants is not complex as compared to that of animals. Plant tissues are also not much complicated.")}
            {td("3. The structural organisation of organs and organ systems of animals is much more complicated as compared to that of plants.")}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableAct21() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead>
          <tr>
            <th style={{ background: P_COLOR, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "7px 10px", border: "1px solid #bbb" }} rowSpan={2}>Length of root</th>
            <th style={{ background: P_COLOR, color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "7px 10px", border: "1px solid #bbb", textAlign: "center" }} colSpan={8}>Days</th>
          </tr>
          <tr>
            {["1","2","3","4","5","6","7","8"].map(d => (
              <th key={d} style={{ background: "#f0d0e8", fontFamily: "'Open Sans', sans-serif", fontSize: 12, fontWeight: 700, padding: "5px 8px", border: "1px solid #ccc", textAlign: "center" }}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {["Jar A", "Jar B"].map(jar => (
            <tr key={jar}>
              <td style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "7px 10px", border: "1px solid #ccc", background: "#fdf5fb" }}>{jar}</td>
              {Array(8).fill("").map((_, i) => (
                <td key={i} style={{ padding: "7px 10px", border: "1px solid #ccc", minWidth: 40 }}>&nbsp;</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT: BATCH 1 ─────────────────────────────────────────────────────────
const content_b1 = [
  <ChapterCover key="cover" />,

  // Intro paragraph
  <p key="b1-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    In biology, we study from atoms and molecules to the ecosystems and biomes with several intermediate levels of organization.
  </p>,

  // 2.1 HIERARCHY IN NATURE
  <SubHd key="hd-s21" id="s21" label="2.1" title="Hierarchy in Nature" />,

  <p key="b1-p-s21-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The word '<strong><em>hierarchy</em></strong>' means any graded organization of persons, principles or things ranked one above the other in ascending or descending order.
  </p>,
  <p key="b1-p-s21-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Three kinds of hierarchy may be recognized in nature : physical, biological and ecological.
  </p>,
  <p key="b1-p-s21-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>I. Physical Hierarchy.</strong> Every organism consists of parts that can be arranged in progressively increasing levels of organizational complexity (Fig. 2.1). Each higher level is more complex than the one below it because it builds on all the preceding ones. The smallest structural units of matter, both non-living and living, are <strong>protons, neutrons</strong> and <strong>electrons.</strong> These particles combine in a specific manner to form <strong>atoms</strong>. The atoms, in turn, combine to form the next larger units called <strong>molecules</strong> or <strong>chemical compounds.</strong> The latter join together in various ways to form still larger units termed <strong>complexes of compounds</strong>. In the living matter, the complexes of compounds form microscopic or submicroscopic bodies known as <strong>organelles.</strong> The organelles individually do not qualify as living units. A specific combination of organelles, however, forms a living unit called the <strong>cell.</strong> Biological hierarchy begins from the cell.
  </p>,

  <Fig key="b1-fig21"
    src={CONTENT_IMAGES.CONTENT_IMAGE_A2C48F8EE36D50AB7BE1}
    caption="Fig. 2.1. Hierarchy of levels in the organization of living organisms and non-living matter"
    width="50%"
  />,

  <p key="b1-p-s21-4" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>II. Biological Hierarchy.</strong> In the story of life, a cell is the smallest living unit containing all the necessary apparatus for carrying on the life functions. Thus, a living organism must consist of at least one cell. In multicellular organisms, however, cells combine to form higher units, the <strong>tissues</strong>, which, in turn, come together and constitute next higher units, the <strong>organs.</strong> The organs occur in groups, the <strong>organ-systems.</strong> All the organ-systems together form a multicellular <strong>organism.</strong> At each level, there is exchange of materials between the unit and its environment (surroundings).
  </p>,
  <p key="b1-p-s21-5" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>III. Ecological Hierarchy.</strong> Ecological hierarchy begins at the level of organism (unicellular or multicellular) and proceeds to levels of greater complexity, namely, population, biotic community, ecosystem and biomes.
  </p>,

  // 2.2 INTRODUCTION AND DEFINITION OF TISSUES
  <SubHd key="hd-s22" id="s22" label="2.2" title="Introduction and Definition of Tissues" />,

  <p key="b1-p-s22-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    It is a well known fact that all living organisms are made up of cells. They are either unicellular (<em>e.g.</em>, Bacteria, Diatoms, Yeasts, Protozoans, etc.) or multicellular (<em>e.g.</em>, Man, Lion, Dog, Cockroach, Neem, Peepal, Fig, etc.). Each unicellular organism (<em>e.g.</em>, <em>Amoeba</em>) is made up of single cell, which acts as a site for diverse life activities such as intake of food (digestion), intake of oxygen (respiration), excretion, reproduction, etc. That means, all the activities of the organism are performed by the single cell. The multicellular organism, on the other hand, is composed of a millions of different types of cells. These cells cluster together in order to perform specific functions of the body. Since a group of cells is required to carry out a particular function, the cells perform the function very efficiently. For example, in human beings, muscle cells cluster together to perform contraction and relaxation to cause movements ; nerve cells coordinate to carry messages ; blood cells and plasma flow to transport oxygen, food, hormones and waste materials. Similarly in plants, cells cluster to perform specific functions such as transportation of food and water from one part to the other ; synthesis of food materials, storage of reserve foods, etc. Thus, a kind of division of labour exists in the cells of multicellular organisms to perform specific functions.
  </p>,

  <DefBox key="b1-def-divlabour">Division of labour refers to the distribution of different functions among different parts of the organism's body which get specialized for the particular function.</DefBox>,

  <p key="b1-p-s22-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The multicellular organisms usually develop from single 'initial cell' (<em>i.e.</em>, zygote, spore or any other cell). This initial cell divides by the process of cell division. The cell division continues and a large number of cells are formed. These cells then undergo cellular differentiation.
  </p>,

  <DefBox key="b1-def-diff">Differentiation is the process of qualitative changes in the cells to perform different functions in the living organisms.</DefBox>,

  <p key="b1-p-s22-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The processes of cell division and cell differentiation are necessary for growth and development of the organisms. These processes lead to the development of specific organs (such as roots, stem, leaves, etc. in plants and hand, legs, eyes, etc. in animals) consisting of specific groups of cells to perform specific functions in the body. Moreover, the organs are also made up of different groups of cells on the basis of their functions. A particular function, inside an organ, is performed by group of specialised cells located at a definite place in the body. The cluster of cells (or group of cells) specially positioned and designed to perform a particular function efficiently is called a tissue.
  </p>,

  <DefBox key="b1-def-tissue">A tissue may be defined as a group or collection of similar or dissimilar cells that perform or help to perform a common function and have a common origin.</DefBox>,

  // 2.2.1 Plant and Animal Tissues are Different
  <SubSubHd key="hd-s221" id="s221" label="2.2.1" title="Plant and Animal Tissues are Different" />,

  <p key="b1-p-s221-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Plants and animals lead vastly different lives and have different structures and functions. Thus, the tissues which they possess, are also built for different purposes. A comparison between the structure, function and composition of tissues in plants and tissues in animals is given in table 2.1.
  </p>,
  <p key="b1-tbl21-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center", color: P_COLOR, margin: "10px 0 4px" }}>TABLE 2.1. Differences between the Tissues of Plants and Animals.</p>,
  <Table21 key="b1-tbl21" />,

  // 2.3 PLANT TISSUES
  <SecHd key="hd-s23" id="s23" label="2.3" title="Plant Tissues" />,

  <p key="b1-p-s23-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    As stated earlier, the higher plants have multicellular bodies made up of various kinds of cells. These cells cluster together to perform specific functions. These groups of cells are called <strong>tissues</strong>. The plant tissues may primarily be classified into two groups:
  </p>,
  <p key="b1-p-s23-2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 4px 28px" }}><strong>1.</strong> Meristematic tissues.</p>,
  <p key="b1-p-s23-3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px 28px" }}><strong>2.</strong> Permanent tissues.</p>,

  // 2.3.1 Meristematic Tissues
  <SubSubHd key="hd-s231" id="s231" label="2.3.1" title="Meristematic Tissues (Meristems)" />,

  <p key="b1-p-s231-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The plants grow constantly, reaching for sunlight and their roots pushing deeper into the soil. It happens in specific areas called meristems. The meristematic tissues include group or cluster of cells which remain in continuous state of division or retain their power of division. The cells of meristematic tissues divide continuously and help in increasing the length and the girth of the plant. These tissues differentiate to give rise to the permanent tissues.
  </p>,

  <DefBox key="b1-def-meristem">Meristematic tissues may be defined as a group or collection of living cells which are located at specific locations and divide continuously to add new cells to the plant body.</DefBox>,

  <p key="b1-p-s231-2" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "12px 0 6px" }}>Characteristics of meristematic tissues :</p>,
  <P2 key="b1-p-s231-c1">(<em>i</em>) The cells of meristematic tissues are similar in structure and have thin and elastic primary cell walls made up of cellulose.</P2>,
  <P2 key="b1-p-s231-c2">(<em>ii</em>) The meristematic cells may be rounded, oval, polygonal or rectangular in shape.</P2>,
  <P2 key="b1-p-s231-c3">(<em>iii</em>) They are compactly arranged without intercellular spaces between them.</P2>,
  <P2 key="b1-p-s231-c4">(<em>iv</em>) Each cell contains dense or abundant cytoplasm and a large prominent nucleus.</P2>,
  <P2 key="b1-p-s231-c5">(<em>v</em>) The dense protoplasm of meristematic cell contains few small vacuoles or no vacuoles at all.</P2>,

  <Fig key="b1-fig-classif"
    src={CONTENT_IMAGES.CONTENT_IMAGE_41F8696DB044403F80B6}
    caption="Classification of Plant Tissues"
    width="75%"
  />,

  <p key="b1-p-s231-occ" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Occurrence.</strong> The meristematic cells are restricted to certain specific regions which continuously add new cells to the plant body. Depending upon the occurrence and position in the plant body, meristems are apical, lateral and intercalary (Fig. 2.2).
  </p>,

  <p key="b1-p-s231-apical" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(a) Apical meristem (Fig. 2.3 and 2.4).</strong> This meristem is located at the growing apices of main and lateral shoots and roots. These cells are responsible for linear growth, <em>i.e.</em>, increase in length of an organ. This is how plant gets taller and its roots grow deeper. Examples – root apical meristem and shoot apical meristem.
  </p>,

  <div key="b1-figs22-23" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, margin: "12px 0" }}>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_F8450990CCCAFF635590}
      caption="Fig. 2.2. Schematic representation of longitudinal section of stem tip showing location of meristematic tissue in plant body."
      width="90%"
    />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_9826360906CF892923DD}
      caption="Fig. 2.3. Diagrammatic longitudinal section through shoot apex."
      width="90%"
    />
  </div>,

  <Fig key="b1-fig24"
    src={CONTENT_IMAGES.CONTENT_IMAGE_EFD93A5F53EE128B481A}
    caption="Fig. 2.4. Median longitudinal section of root apex."
    width="45%"
  />,

  <p key="b1-p-s231-lat" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(b) Lateral meristem (Fig. 2.2).</strong> This meristem consists of initials which divide mainly in one plane and cause the organ to increase in diameter and girth. The lateral meristem usually occurs on the sides both in stem and root in woody plants. Lateral meristem is of two types, <em>i.e.</em>, in the form of cork cambium, and in vascular bundles of dicots in the form of vascular cambium. The activity of this cambium results in the formation of secondary growth.
  </p>,

  <Fig key="b1-fig-planttissues"
    src={CONTENT_IMAGES.CONTENT_IMAGE_4A8218B6F7B25B3F74CA}
    caption="Plant Tissues — differentiation pathway from Meristematic Tissue"
    width="40%"
  />,

  <p key="b1-p-s231-int" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(c) Intercalary meristem (Fig. 2.2).</strong> This meristem is located in between the regions of permanent tissues. The intercalary meristems are usually present at the base of node (the points where leaves attach to the stem), and at the base of the leaf. They are responsible for growth of leaves and internodes. This type is common in grasses.
  </p>,

  // Activity 2.1
  <ActivityBox key="b1-act21" num="2.1" sub="To study the tissues responsible for growth in plants.">
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_EB3BDB0D54756563ED86}
      caption="Fig. 2.5. Demonstration of growth of roots in onion bulb"
      width="25%"
    />
    <ActHd>Procedure.</ActHd>
    <P2>(<em>i</em>) Take two wide mouth glass jars and fill them with tap water. The mouth of jars should be such that they can hold the onion bulbs.</P2>
    <P2>(<em>ii</em>) Place one onion bulb at the mouth of one jar and another onion bulb at the mouth of another jar. Place the onion bulbs in such a way that stem and root parts of each bulb remain in contact with water (Fig. 2.5).</P2>
    <P2>(<em>iii</em>) Allow the roots to emerge out and grow in water. Observe the growth of roots in both the onion bulbs for three days. Measure and record the growth of roots on day 1, 2 and 3 on your record book.</P2>
    <P2>(<em>iv</em>) On 4th day, cut the tips of roots (upto 1 cm) in jar B. Again place the onion of jar B with roots hanging in water.</P2>
    <P2>(<em>v</em>) Observe the growth of roots in both the jars for a few more days.</P2>
    <P2>(<em>vi</em>) Measure and record the growth of roots in both the jars for five more days. Record your observations.</P2>
    <ActHd>Observations:</ActHd>
    <TableAct21 />
    <ActHd>Discussion and Conclusion</ActHd>
    <P2>(<em>i</em>) The roots of onion bulb in jar A kept on growing and, thus, were longer than the roots of onion bulb in jar B.</P2>
    <P2>(<em>ii</em>) In jar B, the roots stopped growing when the tips of growing roots were cut on day 4th.</P2>
    <P2>(<em>iii</em>) The root tips stopped growing in jar B because the meristemmatic cells (apical meristem), which keep on dividing, were removed on day 4th.</P2>
    <P2 style={{ marginTop: 8 }}>From the above discussion, we can conclude that growth of roots occurs due to the activity of dividing cells present at the root apex (<em>apical meristem</em>). The cells of meristemmatic tissue have the ability to divide continuously and add new cells to the plant body. The daughter cells derived from dividing meristemmatic tissue may differentiate to become permanent tissue and stop dividing further.</P2>
  </ActivityBox>,
];


// ── TABLE SUB-COMPONENTS (batch 2) ───────────────────────────────────────────

function Table22() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>Parenchyma</th>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>Collenchyma</th>
        </tr></thead>
        <tbody>
          {[
            ["1. The tissue consists of thin-walled living cells.", "1. The tissue consists of cells having localized thickenings in their cell walls. The cells are living."],
            ["2. It is distributed in almost all the parts of the plant body.", "2. It occurs mostly in the aerial parts of the plants restricted to the outer layers."],
            ["3. The living cells of parenchyma assimilate and store food. They also store waste products.", "3. Collenchyma is the chief mechanical tissue of the young parts of the plants particularly in the young dicotyledonous stems."]
          ].map(([a, b], i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{a}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Table23() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>Collenchyma</th>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>Sclerenchyma</th>
        </tr></thead>
        <tbody>
          {[
            ["1. Cells of collenchyma are living.", "1. Cells of sclerenchyma are dead."],
            ["2. Cells have soft primary walls.", "2. Cells have hard secondary walls."],
            ["3. Cell walls show localized thickenings in the corners.", "3. Cell walls show uniform thickening of secondary wall due to deposition of lignin."],
            ["4. Cells are filled with protoplasm.", "4. Cells are empty and have narrow lumen."],
            ["5. The tissue provides mechanical strength and elasticity in young dicotyledonous stem.", "5. The tissue provides mechanical support in plants."]
          ].map(([a, b], i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{a}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Table24() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb" }}>#</th>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "44%" }}>Xylem</th>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "44%" }}>Phloem</th>
        </tr></thead>
        <tbody>
          {[
            ["1.", "It conducts water and inorganic solutes in vascular plants.", "It conducts organic solutes in vascular plants."],
            ["2.", "Conduction mostly occurs in one direction (i.e., upward).", "Conduction may occur in both directions, i.e., upward or downward."],
            ["3.", "Conducting channels (tracheary elements) are tracheids and vessels.", "Conducting channels are sieve tubes."],
            ["4.", "Its components include tracheids, vessels, xylem parenchyma and xylem fibres.", "Its components include sieve tubes, companion cells, phloem parenchyma and phloem fibres."],
            ["5.", "Tracheids, vessels and xylem fibres are dead and only xylem parenchyma is living.", "Sieve tubes, companion cells and phloem parenchyma are living and only phloem fibres are dead."],
            ["6.", "Xylem provides mechanical strength also.", "Phloem does not provide mechanical strength."]
          ].map(([n, a, b], i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "7px 10px", border: "1px solid #ccc", textAlign: "center", background: "#fdf5fb" }}>{n}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{a}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT: BATCH 2 ─────────────────────────────────────────────────────────
const content_b2 = [
  // 2.3.2 Permanent Tissues
  <SubSubHd key="b2-hd-s232" id="s232" label="2.3.2" title="Permanent Tissues" />,

  <p key="b2-p-s232-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Permanent tissues originate from meristematic tissues and become permanent at fixed positions in the plant body. They are made up of mature cells that have undergone growth and differentiation. Permanent cells possess definite shape, size and function. They have lost their power of division. They may be living or dead. The living permanent cells are large and usually possess thin walls enclosing vacuolated cytoplasm. The dead permanent cells are usually thick walled without cytoplasm.
  </p>,

  <div key="b2-def-perm" style={{ background: "#fff", border: "1px solid #ccc", borderLeft: "4px solid #c0126a", borderRadius: 3, padding: "10px 14px", margin: "12px 0", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, fontStyle: "italic", fontWeight: 600 }}>
    Permanent tissue may be defined as a group or collection of living or dead cells formed by meristematic tissue and have lost their ability to divide and have permanently placed at fixed positions in the plant body.
  </div>,

  <p key="b2-p-s232-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The permanent tissues are classified into two groups: simple and complex.
  </p>,

  // 2.3.2(a) Simple Permanent Tissues
  <SubHd key="b2-hd-s232a" id="s232a" label="2.3.2.(a)" title="Simple Permanent Tissues" />,

  <p key="b2-p-simple-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    These permanent tissues are called simple because they are composed of similar type of cells which have common origin and function. They are further grouped under three categories — parenchyma, collenchyma and sclerenchyma.
  </p>,

  <p key="b2-p-para-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, margin: "14px 0 6px" }}>(<em>i</em>) Parenchyma (Fig. 2.6 A-B):</p>,

  <p key="b2-p-para-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>General characters.</strong> Parenchyma (Greek, <em>para</em> = beside ; <em>en-chein</em> = to pour) is most simple and unspecialized primitive tissue. It mainly consists of thin-walled cells which have intercellular spaces between them. Parenchyma forms the basic packing tissue of plant body that lies in between specialized tissues. It is the most abundant tissue of plants.
  </p>,
  <p key="b2-p-para-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The cell wall is made up of cellulose or calcium pectate. Each cell has a prominent nucleus and vacuolate cytoplasm. The cells are living and perform metabolic processes. There is a large central vacuole in each cell.
  </p>,

  <Fig key="b2-fig26"
    src={CONTENT_IMAGES.CONTENT_IMAGE_DA9F7A39A8A0A04F1406}
    caption="Fig. 2.6. Parenchyma ; A-transverse section ; B-Longitudinal section"
    width="55%"
  />,

  <p key="b2-p-para-shape" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Shape.</strong> Each individual parenchymatous cell may be isodiametric, spherical, oval, cylindrical, rectangular, stellate or long spindle like.
  </p>,
  <p key="b2-p-para-dist" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Distribution.</strong> Parenchyma is widely distributed in various plant organs, <em>viz.</em>, root, stem, leaves, flowers and fruits. They constitute the major vegetative ground tissue. They occur in epidermis, cortex, pith, pericycle, mesophyll of leaves, pulp of fruits and endosperm of seeds. Parenchymatous cells are also found in xylem and phloem.
  </p>,
  <p key="b2-p-para-types" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Types.</strong> There are some special types of parenchyma. In storage tissues, the parenchymatous cells enlarge to store nutrients and water. These are called <strong>storage parenchyma</strong>. In aquatic plants, large air cavities are present in the ground tissue. These cavities store gases and provide buoyancy to aquatic plants to help them float. Such parenchyma are called <strong>aerenchyma</strong>. The parenchymatous cells containing chloroplasts perform the process of photosynthesis. Such parenchyma is called <strong>chlorenchyma</strong>, <em>e.g.</em>, the mesophyll of leaves.
  </p>,

  <p key="b2-p-para-funhd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Functions :</p>,
  <p key="b2-p-para-f1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>1. The main function of parenchymatous tissue is assimilation and storage of reserve food materials (<em>i.e.</em>, starch, fats, proteins, etc.).</p>,
  <p key="b2-p-para-f2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>2. They also store waste products such as tannin, gum, crystals, resins and inorganic wastes, etc.</p>,
  <p key="b2-p-para-f3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>3. Parenchymatous cells provide rigidity to plant body due to turgidity and help to maintain shape and firmness of the body.</p>,
  <p key="b2-p-para-f4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>4. In succulents (plants having fleshy parts), they act as water storage tissues and in water plants they help in buoyancy (floating) and gaseous exchange.</p>,
  <p key="b2-p-para-f5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>5. Some parenchymatous cells contain chloroplasts and perform photosynthesis. Such a tissue is called chlorenchyma.</p>,
  <p key="b2-p-para-f6" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>6. Parenchymatous cells perform all vital (or metabolic) activities of plants.</p>,
  <p key="b2-p-para-f7" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>7. They serve as packing tissues in between the other tissues (such as xylem and phloem) constituting the vegetative ground tissue.</p>,
  <p key="b2-p-para-f8" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}>8. Parenchyma tissue provides mechanical strength due to its high osmotic pressure and compact arrangement.</p>,

  // Collenchyma
  <p key="b2-p-coll-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, margin: "14px 0 6px" }}>(<em>ii</em>) Collenchyma (Fig. 2.7 A-B):</p>,
  <p key="b2-p-coll-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>General characters.</strong> Collenchyma (Greek, <em>Colla</em> = glue ; <em>enchyma</em> = an infusion) is a living tissue of primary body, like parenchyma. The cells are thin-walled but possess thickenings of cellulose and pectic substances at the corners where number of cells join together. The tissue provides flexibility to soft aerial parts (<em>e.g.</em>, leaves, young stems) of plant so that they can bend without breaking. The cells are compact and the intercellular spaces are absent. The collenchymatous cells are generally elongated with oblique end walls. In transverse section, they appear circular, oval or polygonal.
  </p>,

  <Fig key="b2-fig27"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0A570AECAD596B567724}
    caption="Fig. 2.7. Collenchyma ; A-Transverse section ; B-Longitudinal section"
    width="50%"
  />,

  <p key="b2-p-coll-dist" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Distribution.</strong> Collenchyma occurs chiefly below the epidermis in leaf stalks, leaf mid ribs and herbaceous dicotyledonous stems. They are usually absent in monocots and in roots.
  </p>,
  <p key="b2-p-coll-funhd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Functions :</p>,
  <p key="b2-p-coll-f1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>1. Collenchyma is the chief supporting tissue in young dicotyledonous stems. It provides mechanical support, elasticity and tensile strength to the body.</p>,
  <p key="b2-p-coll-f2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>2. Collenchymatous cells manufacture sugar and may store it as starch (when they contain chloroplasts).</p>,
  <p key="b2-p-coll-f3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}>3. The collenchyma is present at the margins of some leaves and resists tearing effect of the wind.</p>,

  // Sclerenchyma
  <p key="b2-p-scler-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, margin: "14px 0 6px" }}>(<em>iii</em>) Sclerenchyma (Fig. 2.8 A, B, C, D):</p>,
  <p key="b2-p-scler-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>General characters.</strong> Sclerenchyma (Greek, <em>Sclerous</em> = hard ; <em>enchyma</em> = an infusion) consists of thick-walled dead cells. These cells have hard and extremely thick secondary walls due to uniform deposition of <strong>lignin</strong> (a complex polymeric molecule composed of phenylpropanoid units associated with cellulose). Lignin deposition is so thick that the cell walls become strong, rigid and impermeable to water. The cell lumen becomes very narrow or nearly absent. Sometimes oblique thin areas are found in thick cell walls which are called <strong>pits</strong>. The sclerenchymatous cells are closely packed without intercellular spaces. Thus, they appear as hexagonal net in transverse section. The cells are cemented with the help of a conspicuous middle lamella. The middle lamella is a wall that lies between the adjacent cells. It is made up of pectin, lignin and protein.
  </p>,

  <Fig key="b2-fig28"
    src={CONTENT_IMAGES.CONTENT_IMAGE_21099930EB36D01CFC09}
    caption="Fig. 2.8. Sclerenchyma. A. transverse section ; B. Longitudinal section ; C. Single cell in t.s. D. Single cell in l.s."
    width="55%"
  />,

  <p key="b2-p-scler-types" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The cells of sclerenchyma can be broadly grouped under two main types : <strong>fibres</strong> and <strong>sclereids.</strong> (<em>a</em>) <strong>Fibres.</strong> These are long elongated sclerenchymatous cells with pointed ends. These cells vary in length from 1 mm to 550 mm in different plants. The fibres are usually clustered into strands and look polygonal in transverse section. (<em>b</em>) <strong>Sclereids.</strong> The sclerenchymatous cells, which are short and possess extremely thick lamellated lignified walls with long tubular simple pits, are called sclereids. They are short and vary greatly in their shape and size. They may be spherical, oval, cylindrical, T-shaped, dumbbell-shaped or stellate.
  </p>,
  <p key="b2-p-scler-dist" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Distribution.</strong> Sclerenchymatous fibres mostly occur in hypodermis, pericycle, secondary xylem and secondary phloem. The fibres usually occur in clusters. The sclereids, on the other hand, occur singly scattered in cortex, pith, phloem, etc. They also occur in hard seed coats, hard endocarp of almond and coconut (husk of coconut), grit of apple, pear and guava.
  </p>,
  <p key="b2-p-scler-fun" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    <strong>Functions.</strong> The main function of sclerenchyma is to give mechanical support to plant parts. It provides a protective covering around seeds and nuts. Sclerenchyma fibres of some plants (<em>e.g.</em>, flax, hemp, jute, coconut) are commercially exploited.
  </p>,

  <p key="b2-tbl22-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center", color: "#c0126a", margin: "14px 0 4px" }}>TABLE 2.2. Differences between Parenchyma and Collenchyma.</p>,
  <Table22 key="b2-tbl22" />,

  <p key="b2-tbl23-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center", color: "#c0126a", margin: "14px 0 4px" }}>TABLE 2.3. Differences between Collenchyma and Sclerenchyma.</p>,
  <Table23 key="b2-tbl23" />,

  // 2.3.2(b) Complex Permanent Tissues
  <SubHd key="b2-hd-s232b" id="s232b" label="2.3.2.(b)" title="Complex Permanent Tissues" />,

  <p key="b2-p-cx-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Until now, we have studied simple permanent tissues (parenchyma, collenchyma and sclerenchyma) which are characterised by having only one type of cells. Plants possess yet another type of permanent tissue, called complex tissue, which is characterised by having different kinds of cells functioning in a coordinated manner.
  </p>,

  <div key="b2-def-complex" style={{ background: "#fff", border: "1px solid #ccc", borderLeft: "4px solid #c0126a", borderRadius: 3, padding: "10px 14px", margin: "12px 0", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, fontStyle: "italic", fontWeight: 600 }}>
    A complex permanent tissue may be defined as a group of more than one type of cells having a common origin and working together as a unit to perform a common function.
  </div>,

  <p key="b2-p-cx-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The complex tissues are mainly concerned with the transportation of water, mineral nutrients and organic solutes (food materials). The important complex tissues in vascular plants are :<br />
    <strong>1. <em>Xylem</em> (or wood) &nbsp;&nbsp;&nbsp; 2. <em>Phloem</em> (or bast).</strong>
  </p>,
  <p key="b2-p-cx-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Both xylem and phloem are together called <strong>vascular tissues</strong> (conducting tissues) which constitute a vascular bundle.
  </p>,

  // Xylem
  <p key="b2-p-xylem-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, margin: "14px 0 6px" }}>(1) Xylem (Fig. 2.9):</p>,
  <p key="b2-p-xylem-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Xylem (Greek, <em>xylos</em> = wood) is the chief conducting tissue of vascular plants responsible for conduction of water and inorganic solutes from the roots upto the rest of the plant. The tissue is composed of four kinds of cells : <strong>1. Tracheids &nbsp; 2. Vessels (or tracheae) &nbsp; 3. Xylem parenchyma &nbsp; 4. Xylem fibres.</strong>
  </p>,

  <Fig key="b2-fig29"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0EFF20045E256967D51D}
    caption="Fig. 2.9. Component cells of xylem tissue"
    width="65%"
  />,

  <p key="b2-p-xylem-t1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>1. Tracheids.</strong> Tracheids are elongated tube-like dead cells with oblique end walls. The end walls remain intact and possess bordered pits. In transverse section, they usually appear angular or polygonal. The walls are hard and lignified.</p>,
  <p key="b2-p-xylem-t2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>2. Vessels (or tracheae).</strong> The cells of vessels are placed one upon the other and their end walls are either absent or possess perforations. They form long tubes or channels for conduction of water and minerals. Vessels are found mainly in angiosperms. Tracheids and vessels are together called <strong>tracheary elements</strong>.</p>,
  <p key="b2-p-xylem-t3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>3. Xylem parenchyma.</strong> These are living parenchymatous cells present in the xylem. They help in lateral conduction of organic solutes and storage of food reserves.</p>,
  <p key="b2-p-xylem-t4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 14px" }}><strong>4. Xylem fibres.</strong> These are lignified fibres present in the xylem which provide mechanical strength to the plant body.</p>,

  <p key="b2-p-xylem-funhd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Functions of xylem :</p>,
  <p key="b2-p-xylem-f1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>1. Xylem is major conducting tissue in vascular plants. It serves in the upward movement of water and mineral salts from root to different aerial parts of the plant.</p>,
  <p key="b2-p-xylem-f2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}>2. Xylem gives mechanical strength to the plant body.</p>,

  // Phloem
  <p key="b2-p-phloem-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, margin: "14px 0 6px" }}>(2) Phloem (Fig. 2.10):</p>,
  <p key="b2-p-phloem-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Phloem is the chief food-conducting tissue of vascular plants. It is regarded as living conducting tissue responsible for translocation of organic solutes. The phloem is composed of four elements — <strong>1. Sieve tubes, 2. Companion cells, 3. Phloem parenchyma, 4. Phloem fibres.</strong>
  </p>,
  <p key="b2-p-phloem-2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>1. Sieve tubes.</strong> Sieve tubes are long tubular structures composed of elongated sieve tube elements placed one above the other forming a continuous tube. The end walls of sieve tube elements are called <strong>sieve plates</strong>. The sieve plates are perforated by numerous pores. Each mature sieve tube element has thin or thick cellulose wall surrounding a highly albuminous and viscous contents. Cytoplasm occurs in the form of thin lining enclosing a big central vacuole. The nucleus, plastids, mitochondria, endoplasmic reticulum and dictyosomes are absent.</p>,
  <p key="b2-p-phloem-3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>2. Companion cells.</strong> These are living cells usually always associated with the sieve tubes. The sieve tube elements and companion cells arise from the same initial cell and therefore, form a single functional unit. Each companion cell is living cell with thin cellulose wall and active protoplast. It possesses all the important cellular contents such as nucleus, mitochondria, endoplasmic reticulum, etc. The common wall between sieve tube and companion cell shows presence of fine pits which are traversed by plasmodesmata.</p>,

  <Fig key="b2-fig210"
    src={CONTENT_IMAGES.CONTENT_IMAGE_211708FF110ECFB44F20}
    caption="Fig. 2.10. A. Component cells of phloem tissue (in T.S.) B. Longitudinal section of phloem showing sieve tube and companion cell"
    width="65%"
  />,

  <p key="b2-p-phloem-4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>3. Phloem parenchyma.</strong> The living parenchymatous cells present in phloem are called phloem parenchyma.</p>,
  <p key="b2-p-phloem-5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 14px" }}><strong>4. Phloem fibres.</strong> Dead sclerenchymatous fibres present in the phloem are called phloem fibres.</p>,

  <p key="b2-p-phloem-fun" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    <strong>Functions of phloem.</strong> The main function of phloem is translocation of organic solutes from leaves to the storage organs and later from storage organs to growing regions. This is achieved by their special anatomical features. The sieve tubes allow free diffusion of soluble organic substances across the sieve plates due to presence of a large number of sieve pores.
  </p>,

  <p key="b2-tbl24-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center", color: "#c0126a", margin: "14px 0 4px" }}>TABLE 2.4. Differences between Xylem and Phloem.</p>,
  <Table24 key="b2-tbl24" />,
];


// ── CONTENT: BATCH 3 ─────────────────────────────────────────────────────────

const content_b3 = [
  // Activity 2.2
  <div key="b3-act22" style={{ background: "#f9eef4", border: "2px solid #c0126a", borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "3px 12px", borderRadius: 3 }}>ACTIVITY 2.2</span>
      <span style={{ fontFamily: "'Merriweather', serif", fontSize: 13, fontStyle: "italic", fontWeight: 700 }}>To study the structure and function of various types of permanent plant tissues.</span>
    </div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>
      <p style={{ margin: "4px 0" }}><strong>Requirements.</strong> Piece of freshly plucked dicotyledonous stem, sharp razor, glass slide, cover glass, safranin stain, glycerine, microscope.</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Method.</strong> Cut a very thin transverse section of a dicotyledonous stem with the help of a sharp razor (Take the help of your teacher for cutting sections, as it is not so easy to cut thin and uniform sections). Stain the section with safranin and wash extra stain with the help of water. Now mount the stained section using a drop of glycerine on a glass slide and observe under the microscope.</p>
      <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", margin: "10px 0 4px" }}>Method of section cutting, staining and mounting</p>
      <p style={{ margin: "4px 0" }}>A detailed study of the internal structure of plants requires certain preparations. These include :</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Section cutting (Fig. 2.11 A-B):</strong></p>
      <p style={{ margin: "3px 0 3px 14px" }}>1. Select a piece of plant material (<em>i.e.</em>, stem, root, leaf, etc.) for section cutting. For example, take about one inch long young stem of sunflower and keep it in water in a watch glass.</p>
      <p style={{ margin: "3px 0 3px 14px" }}>2. Now take a fresh potato tuber or fleshy root of carrot or raddish for using it as <strong><u>pith</u></strong> (a support for section cutting). Cut a cylindrical piece of pith and make a vertical split in this piece to insert the piece of stem (or any other plant material).</p>
      <p style={{ margin: "3px 0 3px 14px" }}>3. Hold the pith in your left hand and hold the razor in your right hand in a horizontal position in such a way that blade and handle form a right angle.</p>
      <p style={{ margin: "3px 0 3px 14px" }}>4. Now start cutting thin and uniform sections of stem inserted in the pith by sliding the razor blade from outside towards your side.</p>
      <p style={{ margin: "3px 0 3px 14px" }}>5. Collect the sections of stem in a watch glass filled with water and select a thin section for staining.</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Staining:</strong></p>
      <p style={{ margin: "3px 0 3px 14px" }}>6. Take few drops of safranin in a watch glass and dip the section into it with the help of a brush. Wait for 1-2 minutes and then wash the section with 50% ethyl alcohol. Finally wash the section with tap water and mount on a glass slide.</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Mounting (Fig. 2.11 C):</strong></p>
      <p style={{ margin: "3px 0 3px 14px" }}>7. Put a drop of glycerine on a clean glass slide. Float the stained section with the help of a brush and cover the section with a cover slip.</p>
      <div style={{ textAlign: "center", margin: "14px 0" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_3083527B455A3D601FF8} alt="Fig. 2.11" style={{ maxWidth: "70%", borderRadius: 4 }} />
        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.11. Method of section cutting (A-B) and mounting (C)</p>
      </div>
      <p style={{ margin: "8px 0 4px" }}><strong>Observations.</strong> Place the slide under a compound microscope and observe the various types of cells and their arrangement in the section of stem.</p>
      <p style={{ margin: "6px 0 4px" }}>Now answer the following questions on the basis of your observations :</p>
      <p style={{ margin: "3px 0 3px 14px" }}>1. Are all cells similar in structure?</p>
      <p style={{ margin: "3px 0 3px 14px" }}>2. How many types of cells can be seen?</p>
      <p style={{ margin: "3px 0 3px 14px" }}>3. Can we think of reasons why there would be so many types of cells?</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Conclusion.</strong> On the basis of microscopic examination and observations of a sunflower stem, we can answer the above questions as follows :</p>
      <p style={{ margin: "4px 0" }}>1. All the cells are not similar in structure.</p>
      <p style={{ margin: "4px 0" }}>2. In all, 9 types of cells can be seen. They are —</p>
      <div style={{ textAlign: "center", margin: "12px 0" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_F80F4920EBC10E01B217} alt="Fig. 2.12" style={{ maxWidth: "70%", borderRadius: 4 }} />
        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.12. Transverse section of sunflower stem showing different types of tissues</p>
      </div>
      <p style={{ margin: "3px 0 3px 28px" }}>(<em>i</em>) Epidermal cells (Parenchyma) &nbsp; (<em>ii</em>) Hypodermal cells (Collenchyma) &nbsp; (<em>iii</em>) Cortex (Parenchyma)</p>
      <p style={{ margin: "3px 0 3px 28px" }}>(<em>iv</em>) Endodermis (Parenchyma) &nbsp; (<em>v</em>) Pericycle (Sclerenchyma) &nbsp; (<em>vi</em>) Phloem</p>
      <p style={{ margin: "3px 0 3px 28px" }}>(<em>vii</em>) Cambium (lateral meristem) &nbsp; (<em>viii</em>) Xylem &nbsp; (<em>ix</em>) Pith (Parenchyma).</p>
      <p style={{ margin: "8px 0 4px" }}>Thus, the types of tissues present in the section are: 1. Meristematic tissue, 2. Parenchyma, 3. Collenchyma, 4. Sclerenchyma, 5. Xylem and 6. Phloem.</p>
      <p style={{ margin: "8px 0 4px" }}>3. There are so many types of cells to perform different functions. Such as —</p>
      <p style={{ margin: "2px 0 2px 28px" }}>(<em>i</em>) Protection (epidermal cells) &nbsp; (<em>ii</em>) Mechanical support (Collenchyma)</p>
      <p style={{ margin: "2px 0 2px 28px" }}>(<em>iii</em>) Storage of food (Cortex and pith) &nbsp; (<em>iv</em>) Transport of water and minerals (Xylem)</p>
      <p style={{ margin: "2px 0 2px 28px" }}>(<em>v</em>) Translocation of organic food (Phloem) &nbsp; (<em>vi</em>) Growth (Cambium).</p>
      <p style={{ margin: "8px 0" }}>Thus, the different types of cells and tissues perform different functions.</p>
    </div>
  </div>,

  // Activity 2.3
  <div key="b3-act23" style={{ background: "#f9eef4", border: "2px solid #c0126a", borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "3px 12px", borderRadius: 3 }}>ACTIVITY 2.3</span>
      <span style={{ fontFamily: "'Merriweather', serif", fontSize: 13, fontStyle: "italic", fontWeight: 700 }}>To study the structure and function of epidermis and other protective tissues.</span>
    </div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>
      <p style={{ margin: "4px 0" }}><strong>Requirements.</strong> Leaf of <em>Rhoeo discolor</em>, Petri dish, glass slide, cover slip, microscope, safranin, water.</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Method.</strong> Take a freshly plucked leaf of <em>Rhoeo discolor</em>. It has a coloured lower surface. Using your own skill, peel out the lower skin of leaf. (You can gently fold the leaf towards the upper side and try to break it by applying a mild pressure. While breaking it, stretch gently so that the coloured epidermal peel projects out.) Cut the epidermal peel and place it in a Petridish containing water. You can stain the peel with the help of a few drops of safranin. Transfer the peel on a glass slide and cover it gently by placing a coverslip over it. Observe it under the microscope.</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Observation.</strong> Under the microscope, a sheet of cells is seen. These are epidermal cells. The layer of epidermal cells is called <strong>epidermis</strong>. Other types of structures, seen under the microscope, are — <strong>Stomata</strong> (<em>sing.</em> stoma) and <strong>trichomes</strong> (hairs). The epidermis provides protection to the underlying cells and forms the <strong>protective tissue</strong>.</p>
      <p style={{ margin: "8px 0 4px" }}><strong>Conclusion.</strong> From the above observation it can be concluded that all the plant parts have a protective covering, called <strong>protective tissue</strong>. The protective tissue forms the outer covering of various plant organs – roots, stem, leaves, flowers and fruits. This layer remains in direct contact with the environment. Any substance, whether solid, liquid or gas, can enter into the plant or move outside only after passing through this layer. The protective tissue provides protection to various plant organs and helps in absorption, secretion, excretion, gaseous exchange and transpiration.</p>
    </div>
  </div>,

  // Epidermis
  <p key="b3-p-epid-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The major components of <strong>protective tissue</strong> are as follows :
  </p>,
  <p key="b3-p-epid-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>1. Epidermis.</strong> The epidermis (Greek, <em>Epi</em> = upon, <em>Derma</em> = skin) of most of the plant organs is single layered consisting of compactly arranged epidermal cells without intercellular spaces. They are interrupted only by <strong>stomata</strong>. The cells are parenchymatous and living. The outer tangential walls of epidermal cells are usually thicker as compared to inner tangential walls. Each cell has a large central vacuole and a peripheral thin cytoplasm. The epidermis is covered by a water proof layer of fatty substance, called <strong>cuticle</strong>. The epidermal tissue forms a covering of all the plant parts and therefore, provides protection to the underlying tissues. It helps in the reduction of surface evaporation of water due to presence of cuticle. All the gaseous exchange occurs through stomata and lenticels present in the epidermis. The epidermis also provides protection against mechanical injury and invasion by parasitic pathogens (fungi, bacteria, etc.).
  </p>,
  <p key="b3-p-epid-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The epidermis of leaves and green stems is interrupted by small pores, called <strong>stomata</strong> (Fig. 2.13). Singular of stomata is stoma (Greek, <em>stoma</em> = mouth). A typical stoma is microscopic and usually consists of two kidney-shaped guard cells surrounding an elliptical pore. The guard cells are generally much smaller in size as compared to epidermal cells. The guard cells generally have thick walls towards pore and thin walls on opposite side. This property helps in the opening and closing of stomatal pore.
  </p>,
  <p key="b3-p-epid-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The epidermis of leaves and stem possess long unicellular or multicellular hairs. The seeds of cotton possess numerous, long unicellular hairs which form the husk of cotton. The epidermis of young roots possess long unicellular root hairs to increase the total absorptive surface area.
  </p>,

  <div key="b3-fig213" style={{ textAlign: "center", margin: "16px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_F36E40363EB7162AC987} alt="Fig. 2.13" style={{ maxWidth: "72%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.13. Structure of epidermis. A. Epidermis in cross section; B. Epidermis of a dicot leaf in surface view; C. Epidermis of a monocot leaf (grass leaf) in surface view</p>
  </div>,

  // Cork
  <p key="b3-p-cork-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>2. Cork:</strong> Continuous secondary growth of vascular cylinder in many older roots and stems exert a pressure which results in the stretching and rupturing of epidermis and cortex. To avoid such damage of external tissues, the plant organs develop a protective covering, called <strong>periderm</strong>. The outer zone of periderm is <strong>cork</strong>. The cork cells are dead and do not have any intercellular spaces. They are compactly arranged with their cell walls coated with waxy substance – <strong>suberin</strong>. The cells are filled with air, tannins and resins. It is light in weight, resistant to pressure, possesses thermal insulating qualities, absorbs sounds and vibrations and is resistant to acids and other chemicals. The cork prevents desiccation (<em>i.e.</em>, loss of water from plant body), mechanical injury and entry of pathogens. Due to above mentioned unique properties, cork is used for insulation, shock-absorbers, linoleum (used as flooring) and sports goods (in manufacture of shuttle cocks, cricket balls, wooden paddles of table tennis, etc.).
  </p>,

  <div key="b3-fig214" style={{ textAlign: "center", margin: "16px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_465ABF065F902467AB94} alt="Fig. 2.14" style={{ maxWidth: "65%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.14. A cross section of periderm showing cork cells</p>
  </div>,

  // Feature box: Guha-Mukherjee
  <div key="b3-feat-guha" style={{ background: "#f9eef4", border: "1px solid #e0a0c8", borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 8 }}>● Contributions of Professor Sipra Guha-Mukherjee and Professor S.C. Maheshwari</div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>
      <p style={{ margin: "0 0 8px" }}>Farmers and plant breeders need plants with consistent, predictable traits such as high yield or resistance to disease. Traditionally to achieve this goal, years of careful cross-breeding and selection is needed. In 1964, Professor Sipra Guha-Mukherjee and her mentor Professor S.C. Maheshwari were looking for a shortcut method. They got the breakthrough by working on the pollen grains inside the anther of a <em>Datura</em> plant. Anther is the part of stamen (male reproductive organ) of the flower that produces pollen grains. These pollen (male gametes) are haploid, <em>i.e.</em>, they have only one set of chromosomes.</p>
      <p style={{ margin: "0 0 8px" }}>Professor Mukherjee and Professor Maheshwari developed <strong>'anther culture' method</strong>. They placed the anthers of the <em>Datura</em> plant onto a sterile nutrient medium in a petri dish. To their astonishment, instead of just dying, the pollen grains began to divide and grew into tiny embryos. The latter developed into complete living plants. The new plants were also haploid. This process of generating a plant from a male gamete is called <strong>androgenesis</strong>.</p>
      <p style={{ margin: "0 0 8px" }}>A haploid plant contains only one copy of every gene. This means that every trait, whether good or bad, is immediately visible. There are no dominant or recessive genes to mask the effects. Scientists could now treat the haploid plant with a chemical that doubles its chromosomes, thereby, creating a diploid plant that is genetically pure (homozygous) for all its traits.</p>
      <p style={{ margin: "0 0 8px" }}>Prof. Sipra Guha-Mukherjee and Prof. S.C. Maheshwari were pioneering Indian botanists who revolutionized plant tissue culture by developing <em>the first successful technique</em> for producing haploid plants from pollen grains (<em>anther culture</em>) in <em>Datura innoxia</em> in 1964. This breakthrough enabled the rapid creation of homozygous pure lines for crop improvement and revolutionized plant breeding.</p>
      <p style={{ margin: "0 0 8px" }}>Plant breeders around the world adopted above technique to develop crops with higher yields, better nutritional value, and greater resistant to pests and drought.</p>
      <p style={{ margin: 0 }}>Their work established India in the emerging field of <strong>plant biotechnology</strong>.</p>
    </div>
  </div>,

  // 2.4 Animal Tissues
  <SecHd key="b3-hd-s24" id="s24" label="2.4" title="Animal Tissues" />,

  <p key="b3-p-s24-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Like plants, the body of animals is also made up of different types of tissues which perform specific functions. For example, contraction and relaxation of muscle cells result in the movement of body parts, blood and lymph carry substances (such as food materials, waste materials, oxygen, carbon dioxide, etc.) from one part to another, nerve cells respond to external and internal stimuli, etc. Thus, muscles, blood, lymph, nerves, etc. are the examples of tissues found in our body.
  </p>,
  <p key="b3-p-s24-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    On the basis of the functions they perform, the animal tissues can be broadly classified into following four types: <strong>1. Epithelial tissue &nbsp; 2. Muscular tissue &nbsp; 3. Connective tissue &nbsp; 4. Nervous tissue</strong>
  </p>,
  <p key="b3-p-s24-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>These tissues are further classified as shown in the following chart :</p>,

  <div key="b3-fig-animalchart" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_A948A2FF119B7EAA9997} alt="Animal Tissues Classification" style={{ maxWidth: "80%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Classification of Animal Tissues</p>
  </div>,

  // 2.4.1 Epithelial Tissue
  <SubHd key="b3-hd-s241" id="s241" label="2.4.1" title="Epithelial Tissue (or Epithelium)" />,

  <p key="b3-p-epit-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Characteristics.</strong> Epithelial tissue or epithelium (Greek, <em>epi</em> = upon ; <em>thele</em> = nipple) is a simplest kind of animal tissue that occurs as a protective covering. It consists of one or more layers of tightly cohesive sheets of cells which cover the external surface of the body and viscera (internal organs) or lining the cavities and the body and viscera. For example, the skin, surface layer of mouth, alimentary canal, lungs, etc. are all made of epithelial tissue. The cells are closely packed and there is little intercellular material between them. The cells are held together by intercellular junctions. The epithelial tissue rests on a thin non-cellular basement membrane (consisting of glycoprotein and collagen fibres). The epithelium is not traversed by blood vessels. The blood vessels lie in the connective tissue across the basement membrane.
  </p>,

  <p key="b3-p-epit-funhd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Functions :</p>,
  <p key="b3-p-epit-f1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>i</em>) Epithelia cover the body surface as an outer layer of skin and provide protection to the underlying tissues from mechanical injury, drying up, entry of germs (viral or bacterial pathogens), and harmful chemicals.</p>,
  <p key="b3-p-epit-f2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>ii</em>) Epithelia forms inner lining of mouth, alimentary canal and other internal organs inside the body and protect these organs.</p>,
  <p key="b3-p-epit-f3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>iii</em>) Epithelial lining of the intestine absorbs water and digested food.</p>,
  <p key="b3-p-epit-f4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>iv</em>) Epithelial tissues help in the elimination of nitrogenous and other waste products.</p>,
  <p key="b3-p-epit-f5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 14px" }}>(<em>v</em>) Epithelial lining of the cavities give rise to glands that provide valuable secretions such as mucus, gastric juice, etc.</p>,

  <p key="b3-p-epit-types" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Types of epithelial tissue.</strong> Based on the cell layers and shape of cells, the epithelial tissues are classified as follows : (<em>i</em>) Squamous epithelium (<em>ii</em>) Cuboidal epithelium (<em>iii</em>) Columnar epithelium (<em>iv</em>) Ciliated epithelium (<em>v</em>) Glandular epithelium.
  </p>,

  // Squamous epithelium
  <SubSubHd key="b3-hd-squa" id="s241i" label="2.4.1.(i)" title="Squamous Epithelium (Fig. 2.15)" />,

  <div key="b3-fig215" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_4EC95C9C382DC39A2CBE} alt="Fig. 2.15" style={{ maxWidth: "55%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.15. Squamous epithelium. A. Surface view ; B. Vertical section</p>
  </div>,

  <p key="b3-p-squa-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Structure.</strong> This epithelium consists of thin, flat, irregular-shaped cells which fit together closely like the tiles in the floor. Therefore, it is also commonly called <strong>pavement epithelium.</strong> Squamous epithelium is called simple when the thin and flat cells form a delicate lining. Example, lining of oesophagus and mouth. Squamous epithelial cells of skin are arranged in many layers to prevent wear and tear. Such an epithelium is called <strong>stratified squamous epithelium</strong> or <strong>multilayered epithelium.</strong> (Fig. 2.16).
  </p>,

  <div key="b3-fig216" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_8A42EE7DB01EEFB7A511} alt="Fig. 2.16" style={{ maxWidth: "50%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.16. Stratified squamous epithelium</p>
  </div>,

  <p key="b3-p-squa-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> Simple single-layered squamous epithelium lines the blood vessels, the coelom, urinary tubules and alveoli of the lungs. Stratified multilayered squamous epithelium forms epidermis of the skin. This epithelium also lines the buccal cavity, pharynx, oesophagus, anal canal, vagina and lower part of urethra.
  </p>,
  <p key="b3-p-squa-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    <strong>Function.</strong> It provides protection to the underlying parts against abrasion (mechanical injury) and entry of germs or chemicals. It also helps in excretion, gas exchange and secretion of coelomic fluid.
  </p>,

  // Cuboidal epithelium
  <SubSubHd key="b3-hd-cubo" id="s241ii" label="2.4.1.(ii)" title="Cuboidal Epithelium (Fig. 2.17)" />,
  <p key="b3-p-cubo-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Structure.</strong> This epithelium consists of cube-like cells which are about as tall as wide. The outline of cells is polygonal in surface view and square in section.
  </p>,
  <p key="b3-p-cubo-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> The cuboidal epithelium lines the small salivary ducts, pancreatic ducts, sweat glands, salivary glands and thyroid glands. It also covers the ovaries and lines the sperm-producing tubules.
  </p>,
  <p key="b3-p-cubo-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Function.</strong> It helps in protection, secretion, absorption, excretion and gamete formation.
  </p>,

  <div key="b3-fig217" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_163C715C892CA86405C1} alt="Fig. 2.17" style={{ maxWidth: "55%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.17. Cuboidal epithelium</p>
  </div>,

  // Columnar
  <SubSubHd key="b3-hd-col" id="s241iii" label="2.4.1.(iii)" title="Columnar Epithelium (Fig. 2.18)" />,
  <p key="b3-p-col-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Structure.</strong> This epithelium consists of tall or pillar-like cells that are much taller than wide. The nuclei are generally elongated along the long axis of cells.
  </p>,
  <p key="b3-p-col-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> The columnar epithelium lines the stomach, intestine and gall bladder. It also lines mammary gland ducts and parts of urethra.
  </p>,

  <div key="b3-fig218" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_5290C6C488AE876C686A} alt="Fig. 2.18" style={{ maxWidth: "52%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.18. Columnar epithelium</p>
  </div>,

  <p key="b3-p-col-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    <strong>Function.</strong> It helps in protection, absorption and secretion. Columnar epithelium of intestine is specialized for the absorption of water and digested food.
  </p>,
];


// ── TABLE SUB-COMPONENTS (batch 4) ───────────────────────────────────────────

function TableAct24() {
  const rows = [
    {
      feature: "Shape",
      striated: "It has long, narrow, cylindrical unbranched muscle fibres with blunt ends. These show alternate dark and slight stripes.",
      smooth: "Each cell (of fibre) is long, narrow spindle shaped with pointed ends.",
      cardiac: "It consists of short, cylindrical fibres which are branched and joined end to end to form a network."
    },
    {
      feature: "Number of nuclei",
      striated: "Each fibre has many, elongated, flattened nuclei.",
      smooth: "It has only one nucleus.",
      cardiac: "Each cell (or fibre) has one or two nuclei."
    },
    {
      feature: "Position of nuclei",
      striated: "Towards the periphery near the sarcolemma.",
      smooth: "In the centre of the cell (or fibre).",
      cardiac: "In the centre of the cell (or fibre)."
    }
  ];
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead>
          <tr>
            {["Features", "Striated Muscle(s)", "Smooth Muscle(s)", "Cardiac Muscle(s)"].map(h => (
              <th key={h} style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", textAlign: "center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "7px 10px", border: "1px solid #ccc", background: "#fdf5fb", verticalAlign: "middle" }}>● {row.feature}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{row.striated}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{row.smooth}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{row.cardiac}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Table25() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>Tendons</th>
          <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>Ligaments</th>
        </tr></thead>
        <tbody>
          {[
            ["1. Tendons are very tough and inelastic.", "1. Ligaments are elastic."],
            ["2. They connect the skeletal muscles with the bones.", "2. Ligaments connect bones to other bones at joints."],
            ["3. Tendons are made up of white fibrous tissue. Yellow elastic fibres are, however, absent.", "3. Ligaments are made up of yellow elastic fibres. The white fibres also occur but they are very fine."],
            ["4. Fibroblasts occur in rows.", "4. Fibroblasts lie scattered."]
          ].map(([a, b], i) => (
            <tr key={i}>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{a}</td>
              <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT: BATCH 4 ─────────────────────────────────────────────────────────
const content_b4 = [
  // Ciliated epithelium
  <div key="b4-hd-cil" id="s241iv" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.1.(iv) Ciliated Epithelium (Fig. 2.19)</h4>
  </div>,
  <p key="b4-p-cil-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Structure.</strong> This epithelium consists of cuboidal or columnar cells that bear cilia on their free surfaces. A cilium is fine, vibratile cytoplasmic outgrowth that arises from a minute basal granule.
  </p>,
  <p key="b4-p-cil-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> Cuboidal ciliated epithelium lines certain parts of urinary tubules of the kidney and sperm ducts. Columnar ciliated epithelium lines the nasal passages, oviducts (fallopian tubes), terminal bronchioles and ventricles of the brain.
  </p>,

  <div key="b4-fig219" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_587D236EBCF9721B05A1} alt="Fig. 2.19" style={{ maxWidth: "58%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.19. Ciliated columnar epithelium.</p>
  </div>,

  <p key="b4-p-cil-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    <strong>Function.</strong> This epithelium helps in the movement of mucus, urine, eggs, sperms and cerebrospinal fluid in a particular direction.
  </p>,

  // Glandular epithelium
  <div key="b4-hd-gland" id="s241v" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.1.(v) Glandular Epithelium (Fig. 2.20)</h4>
  </div>,
  <p key="b4-p-gland-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    This epithelium consists of columnar cells modified to secrete chemicals. It lines the glands such as gastric glands, pancreatic lobules, intestinal glands, etc.
  </p>,

  <div key="b4-fig220" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_C53FBC53EF7CB99590DB} alt="Fig. 2.20" style={{ maxWidth: "50%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.20. Goblet cells in columnar epithelium</p>
  </div>,

  // 2.4.2 Muscle Tissues
  <div key="b4-hd-s242" id="s242" style={{ marginTop: 24, marginBottom: 6 }}>
    <h3 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.2. Muscle Tissues</h3>
  </div>,

  <p key="b4-p-mus-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Muscles or muscle tissues of the body consists of long, narrow muscle cells. These cells are elongated in structure and therefore, called <strong>muscle fibres</strong>. A muscle fibre may contain one or more nuclei. The muscle cells are typically arranged in parallel manner and contract in a definite direction which cause movement of body parts or limbs and locomotion of organism. These movements are brought about by contraction and relaxation of contractile proteins present in the muscle cells. Muscles play a role in almost every activity of an organism including the movements of the body or limbs, the movement of heart, flow of blood and lymph through the vessels, passage of food through the alimentary canal, flow of air through respiratory tract, etc.
  </p>,
  <p key="b4-p-mus-2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}>There are three types of muscle fibres :</p>,
  <p key="b4-p-mus-t1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>(<em>i</em>) Striated muscle (skeletal muscle or voluntary muscle).</p>,
  <p key="b4-p-mus-t2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>(<em>ii</em>) Unstriated muscle (smooth muscle or involuntary muscle).</p>,
  <p key="b4-p-mus-t3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 28px" }}>(<em>iii</em>) Cardiac muscle.</p>,

  // Striated muscle
  <div key="b4-hd-stri" id="s242i" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.2.(i) Striated Muscle or Skeletal Muscle (Fig. 2.21)</h4>
  </div>,
  <p key="b4-p-stri-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Characteristics.</strong> The striated muscles form more than 80% of the mass of soft tissues in a vertebrate body. They are attached to the bones by tendons and help in the movement of external body parts. Therefore, they are also called <strong>skeletal muscles</strong>. The contraction and relaxation of these muscles are under the control of the animal. They are, therefore, also called the <strong>voluntary muscles</strong>. The muscle fibres show alternate dark and light stripes (striations or bands), hence they are called <strong>striated muscles</strong>.
  </p>,
  <p key="b4-p-stri-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The striated muscle consists of long, narrow, cylindrical, unbranched fibres (cells) with blunt ends (non-tapering ends). Each fibre is enclosed in a thin but distinct plasma membrane, called <strong>sarcolemma.</strong> The cell contains many elongated, flattened nuclei characteristically located towards the periphery near the sarcolemma. The multinucleate condition of the fibre results from cell fusion.
  </p>,
  <p key="b4-p-stri-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> The striated muscles are found in the body wall and the limbs (<em>i.e.</em>, biceps and triceps of the arms). They also occur in tongue, pharynx and beginning of oesophagus.
  </p>,

  <div key="b4-fig221" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_529C026A433FCA9E2908} alt="Fig. 2.21" style={{ maxWidth: "50%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.21. Striated muscles</p>
  </div>,

  <p key="b4-p-stri-fun" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 12px" }}>
    <strong>Functions.</strong> The striated muscles help in the movement of body parts and locomotion. They also help in several voluntary movements of the body.
  </p>,

  // Unstriated muscle
  <div key="b4-hd-smooth" id="s242ii" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.2.(ii) Unstriated Muscle (Smooth Muscle) (Fig. 2.22)</h4>
  </div>,
  <p key="b4-p-smooth-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Characteristics.</strong> These are called smooth or unstriated muscles because they do not show any stripes or striations across the muscle fibre. Each cell (or fibre) is long, narrow spindle shaped with pointed ends and has only one nucleus (uninucleate) situated in the centre. These fibres are generally shorter than the striated muscle fibres.
  </p>,
  <p key="b4-p-smooth-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> The smooth muscle tissue occurs within the walls of hollow (tubular) visceral organs (except heart). Thus, they occur in the walls of alimentary canal, genital tract, ducts, blood vessels, urinary bladder, etc. They also occur in the iris and ciliary body of the eye and dermis of the skin.
  </p>,
  <p key="b4-p-smooth-funhd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Functions :</p>,
  <p key="b4-p-smooth-f1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>1. Smooth muscles are called <strong>involuntary muscles</strong> because they do not work according to our will.</p>,
  <p key="b4-p-smooth-f2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>2. Smooth muscle contractions are rhythmic. These muscles contract slowly but can remain contracted for long period of time. Rhythmic contractions of smooth muscle in walls of tubular organs (peristaltic contractions) result in the rhythmic progressive wave of muscular contraction and relaxation. These movements occur in gastrointestinal tract and male genital tract.</p>,
  <p key="b4-p-smooth-f3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 14px" }}>3. In some organs, the smooth muscles make the organs short and thick by its contraction or long and thin by its relaxation. They contract throughout the organ as a single unit and produce extrusive movements as in urinary bladder, gall bladder, ureters and uterus.</p>,

  <div key="b4-fig222" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_5FBD4E9C34D589740549} alt="Fig. 2.22" style={{ maxWidth: "68%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.22. Nonstriated (smooth) muscle fibres</p>
  </div>,

  // Cardiac
  <div key="b4-hd-card" id="s242iii" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.2.(iii) Cardiac Muscle (Fig. 2.23)</h4>
  </div>,
  <p key="b4-p-card-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Characteristics.</strong> The cardiac muscle consists of short, cylindrical fibres which are branched and joined end to end to form a network. Each fibre or cell contains one or two nuclei situated in the centre. Generally, intercalated discs occur between the ends of fibres. The cells show faint cross striations. The cardiac muscle is an example of <strong>involuntary muscles.</strong>
  </p>,
  <p key="b4-p-card-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>Occurrence.</strong> Cardiac muscles are confined to the wall of the heart, pulmonary veins and superior vena cava.
  </p>,
  <p key="b4-p-card-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Functions.</strong> Cardiac muscle contracts and relaxes rapidly and continuously with a rhythm, but it never gets fatigued. Contraction and relaxation of cardiac muscles cause pumping of blood out of the heart and into the heart regularly.
  </p>,

  <div key="b4-fig223" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_4B2748427AD8A33DDC52} alt="Fig. 2.23" style={{ maxWidth: "52%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.23. Cardiac muscles</p>
  </div>,

  // Activity 2.4
  <div key="b4-act24" style={{ background: "#f9eef4", border: "2px solid #c0126a", borderRadius: 6, padding: "14px 18px", margin: "18px 0" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, padding: "3px 12px", borderRadius: 3 }}>ACTIVITY 2.4</span>
      <span style={{ fontFamily: "'Merriweather', serif", fontSize: 13, fontStyle: "italic", fontWeight: 700 }}>To Compare the structures of different types of muscular tissues.</span>
    </div>
    <div style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>
      <p style={{ margin: "4px 0" }}>Compare the structures of striated, smooth and cardiac muscles under the microscope. Note down their shape, number of nuclei and position of nuclei within the cell and record your observations in the given table.</p>
      <p style={{ margin: "8px 0 4px", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a" }}>Observations:</p>
      <TableAct24 />
      <p style={{ margin: "8px 0", color: "#c0126a", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13 }}>Conclusions.</p>
      <p style={{ margin: "4px 0" }}>Based on above observations, it is apparent that all the three types of muscles have specific shaped cells (or fibres) with nucleus/nuclei at specific positions. These form the basis of their differentiation into different types of muscles.</p>
    </div>
  </div>,

  // 2.4.3 Connective Tissues
  <div key="b4-hd-s243" id="s243" style={{ marginTop: 24, marginBottom: 6 }}>
    <h3 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.3. Connective Tissues</h3>
  </div>,

  <p key="b4-p-conn-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Connective tissues of animals serve the functions of binding and joining one tissue to another (<em>i.e.</em>, connecting bones to each other, muscles to bones, etc.), forming protective sheath and packing material around the various organs separating them so that they do not interfere with each other's activities, carrying materials from one part to another in the body, forming a supporting framework of cartilage and bones for the body, etc. Thus, the major functions of connective tissue are binding, supporting and packing together different organs of the body.
  </p>,
  <p key="b4-p-conn-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The cells of connective tissue are living and remain separated from each other. The space between the cells is filled with non-living soft gel-like matrix (or medium) which may be fibrous in nature and composed of complex carbohydrates linked to proteins. The matrix may be solid as in case of bones or cartilages and fluid as in case of blood. The major functions of connecting tissue are — binding, supporting and packing.
  </p>,

  <p key="b4-p-conn-types-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Types of connective tissue :</p>,
  <p key="b4-p-conn-types" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>The connective tissues are of <strong>five</strong> major types :—</p>,
  <p key="b4-ct1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>i</em>) Areolar tissue (Loose connective tissue)</p>,
  <p key="b4-ct2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>ii</em>) Dense Regular connective tissue</p>,
  <p key="b4-ct3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>iii</em>) Adipose tissue</p>,
  <p key="b4-ct4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>iv</em>) Skeletal tissue</p>,
  <p key="b4-ct5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 28px" }}>(<em>v</em>) Vascular tissue (Fluid).</p>,

  // Areolar tissue
  <div key="b4-hd-areol" id="s243i" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.3.(i) Areolar Tissue (Fig. 2.24)</h4>
  </div>,
  <p key="b4-p-areol-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The areolar tissue is also known as <strong>loose connective tissue.</strong> It is most widely distributed connective tissue in the animal body. It consists of a transparent, jelly-like sticky matrix containing numerous fibres and cells and abundant mucin. The fibres are mostly of two types : (<em>a</em>) <strong>White collagen fibres.</strong> They are made up of a protein called collagen, which on boiling with water changes to gelatin, and (<em>b</em>) <strong>Yellow elastic fibres.</strong> They are formed of a protein called elastin. Collagen fibres provide flexibility and strength whereas elastic fibres provide elasticity.
  </p>,
  <p key="b4-p-areol-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The areolar tissue is connective in function. It fixes the skin with the muscles, fills the spaces inside the organs, attaches the blood vessels and nerves with the surrounding tissues, fastens the peritoneum to the body wall and viscera. It is commonly called <strong>'Packaging tissue'</strong> of the body. Examples, bone periosteum, muscle perimysium, nerve perineurium, etc.
  </p>,

  <div key="b4-fig224" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_FB6719C068EF8C4F86F3} alt="Fig. 2.24" style={{ maxWidth: "60%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.24. Areolar connective tissue</p>
  </div>,

  // Dense regular connective tissue
  <div key="b4-hd-dense" id="s243ii" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.3.(ii) Dense Regular Connective Tissue (Fig. 2.25)</h4>
  </div>,
  <p key="b4-p-dense-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Dense regular connective tissue consists of ordered and densely packed fibres and cells. The fibres are loose and very elastic in nature. They are secreted by the surrounding connective tissue cells. This tissue is the principal component of tendons and ligaments.
  </p>,

  <div key="b4-fig225" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_AF344948216C6B65F7F8} alt="Fig. 2.25" style={{ maxWidth: "55%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.25. Dense regular connective tissue</p>
  </div>,

  <p key="b4-p-dense-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    <strong>(<em>a</em>) Tendon (Fig. 2.26):</strong> Tendons are cord-like, very tough, inelastic bundles of white collagen fibres bound together by areolar tissue. The cells present in the tendons are elongated fibroblasts which lie in almost continuous rows here and there. The tendons connect the skeletal muscles with the bones.
  </p>,
  <p key="b4-p-dense-3" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>b</em>) Ligaments (Fig. 2.26):</strong> Ligaments are cords formed by yellow elastic tissue in which many collagen fibres are bound together by areolar tissue. The fibroblasts are irregularly scattered. This tissue combines strength with great flexibility. The ligaments serve to bind the bones together.
  </p>,

  <div key="b4-fig226" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_7FE231BED64F67E25653} alt="Fig. 2.26" style={{ maxWidth: "40%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.26. Attachment of tendons and ligaments</p>
  </div>,

  <p key="b4-tbl25-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center", color: "#c0126a", margin: "14px 0 4px" }}>TABLE 2.5. Differences between Tendon and Ligament.</p>,
  <Table25 key="b4-tbl25" />,

  // Adipose tissue
  <div key="b4-hd-adip" id="s243iii" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.3.(iii) Adipose Tissue (Fig. 2.27)</h4>
  </div>,
  <p key="b4-p-adip-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Adipose is primarily a fat storing tissue in which the matrix is packed with large, spherical or oval fat cells (or <strong>adipocytes</strong>). Each fat cell contains a large fat globule. The matrix also contains fibroblasts, macrophages, collagen fibres and elastic fibres. The adipose tissue is arranged in lobules encased in areolar tissue.
  </p>,
  <p key="b4-p-adip-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The adipose tissue is found beneath the skin, in the covering of the heart, around the blood vessels and kidneys and in yellow bone marrow. This tissue stores fat and insulates the body against heat loss. It forms a shock absorbing cushion around the kidneys and the eyeballs. <strong>Blubber</strong> in whales is, in fact, an insulating fat body. Similarly, <strong>hump</strong> in camel is also rich in adipose tissue.
  </p>,

  <div key="b4-fig227" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_094C1CE7E0C662EAA10B} alt="Fig. 2.27" style={{ maxWidth: "55%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.27. Adipose tissue</p>
  </div>,
];



// ── TABLE SUB-COMPONENTS (batch 5) ───────────────────────────────────────────

function Table26() {
  const tdS = (c) => <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7 }}>{c}</td>;
  const thS = (c) => <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", width: "50%" }}>{c}</th>;
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>{thS("Cartilage")}{thS("Bone")}</tr></thead>
        <tbody>
          {[
            ["1. Cartilage is soft, elastic and flexible.", "1. Bone is hard, tough and inelastic."],
            ["2. Matrix of cartilage consists of entirely organic matter.", "2. Matrix of bone is both organic and inorganic."],
            ["3. Cartilage do not have blood supply (except in perichondrium).", "3. Bones have rich blood supply."],
            ["4. Growth of cartilage is unidirectional.", "4. Growth of bone is bidirectional."],
          ].map((row, i) => (
            <tr key={i}>
              {tdS(row[0])}{tdS(row[1])}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableBloodRanges() {
  const tdS = (c, center) => <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7, textAlign: center ? "center" : "left" }}>{c}</td>;
  const thS = (c) => <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb", textAlign: "center" }}>{c}</th>;
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>{thS("Component")}{thS("Primary Function")}{thS("Normal Range (per mcL)")}</tr></thead>
        <tbody>
          <tr>
            {tdS("Red Blood Cells", true)}
            {tdS("Oxygen Transport")}
            {tdS("Men: 4.7–6.1 million; Women: 4.2–5.4 million")}
          </tr>
          <tr>
            {tdS("White Blood Cells", true)}
            {tdS("Immune Defense")}
            {tdS("4,500–11,000")}
          </tr>
          <tr>
            {tdS("Platelets", true)}
            {tdS("Blood Clotting")}
            {tdS("150,000–450,000")}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableWBCTypes() {
  const tdS = (c, bold) => <td style={{ fontFamily: "'Merriweather', serif", fontSize: 13, padding: "7px 10px", border: "1px solid #ccc", verticalAlign: "top", lineHeight: 1.7, fontWeight: bold ? 700 : 400 }}>{c}</td>;
  const thS = (c) => <th style={{ background: "#c0126a", color: "#fff", fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, padding: "8px 10px", border: "1px solid #bbb" }}>{c}</th>;
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "'Merriweather', serif" }}>
        <thead><tr>{thS("Cell Type")}{thS("Primary Function")}</tr></thead>
        <tbody>
          {[
            ["Neutrophils", "The most abundant WBCs. They are the first responders, especially to bacterial infections, engulfing and destroying pathogens."],
            ["Lymphocytes", "These cells are crucial for viral infections. B-lymphocytes make antibodies, while T-lymphocytes kill infected cells directly."],
            ["Monocytes", "The largest WBCs. They act as cleanup crews, turning into macrophages that consume dead cells and invaders."],
            ["Eosinophils", "Specialize in fighting parasitic infections and are also involved in allergic reactions."],
            ["Basophils", "The least common type, they release chemicals like histamine during allergic reactions and asthma attacks."],
          ].map((row, i) => (
            <tr key={i}>{tdS(row[0], true)}{tdS(row[1])}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT (batch 5) ─────────────────────────────────────────────────────────

const content_b5 = [

  // Activity 2.4 — Compare muscle structures
  <ActivityBox key="b5-act24" num="2.4" sub="To Compare the structures of different types of muscular tissues.">
    <p key="b5-act24-p" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px" }}>
      Compare the structures of striated, smooth and cardiac muscles under the microscope. Note down their shape, number of nuclei and position of nuclei within the cell and record your observations in the given table.
    </p>
    <ActHd>Observations:</ActHd>
    <TableAct24 />
    <ActHd>Conclusions.</ActHd>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "4px 0 0" }}>
      Based on above observations, it is apparent that all the three types of muscles have specific shaped cells (or fibres) with nucleus/nuclei at specific positions. These form the basis of their differentiation into different types of muscles.
    </p>
  </ActivityBox>,

  // 2.4.3(iv) Skeletal tissue
  <div key="b5-hd-skel" id="s243iv" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.3.(iv) Skeletal Tissue</h4>
  </div>,
  <p key="b5-p-skel-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Skeletal tissue forms the rigid skeleton which supports the vertebrate body, helps in locomotion and provides protection to many vital organs. There are <strong>two</strong> types of skeletal tissues :— (<em>a</em>) Cartilage, and (<em>b</em>) Bone.
  </p>,

  // Cartilage
  <p key="b5-hd-cart" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 4px" }}>(<em>a</em>) Cartilage (Fig. 2.28)</p>,
  <p key="b5-p-cart-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Characteristics.</strong> Cartilage is a hard but flexible skeletal tissue consisting of living cells embedded in a matrix. The cells (<strong>chondroblasts</strong>) become <strong>chondrocytes</strong> when get surrounded within special fluid-filled chambers, called <strong>lacunae</strong> (sing, lacuna). The lacunae (containing chondrocytes) are separated by the amorphous matrix (chondrin) that contains glycoproteins, collagen and elastic fibres. The surface of cartilage is surrounded by irregular connective tissue forming the <strong>perichondrium</strong>. Growth of cartilage occurs continuously due to multiplication of chondrocytes by mitosis, deposition of matrix within existing cartilage and from activity of the deeper cells of the perichondrium. Blood vessels and nerves are absent in the matrix.
  </p>,

  <div key="b5-fig228" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_69E8E79771F21A9F0346} alt="Fig. 2.28 Cartilage" style={{ maxWidth: "40%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.28. Cartilage</p>
  </div>,

  <p key="b5-p-cart-occ" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Occurrence.</strong> This tissue occurs in very few parts of the body. In humans, the cartilage occurs at the ends of long bones, the pinnae of ears, the ends of nose, in the walls of respiratory ducts, within intervertebral discs, etc. In sharks and rays, the entire skeleton is cartilage.
  </p>,
  <p key="b5-p-cart-fn" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Functions.</strong> Cartilage is more compressible than bone. It absorbs stresses and provides flexibility to the body parts.
  </p>,

  // Bone
  <p key="b5-hd-bone" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 4px" }}>(<em>b</em>) Bone (Fig. 2.29)</p>,
  <p key="b5-p-bone-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Characteristics.</strong> Bone is a very strong and non-flexible vertebrate connective tissue. A compact bone consists of living bone cells, called <strong>osteoblasts</strong>, embedded in a firm, calcified matrix. The osteoblasts are contained in lacunae (spaces) which are arranged in concentric circles present throughout the matrix. The lacunae are also traversed by nerves and blood vessels. The blood vessels passing through them provide nutrients to osteoblasts and help exchange of materials. The matrix is composed of about 30% organic materials (chiefly collagen fibres and glycoproteins) and 70% inorganic bone salts (mainly phosphates and carbonates of calcium and magnesium, hydroxyapatite, etc.). These inorganic salts are responsible for hardness of the bone.
  </p>,
  <p key="b5-p-bone-fn" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Functions.</strong> Bones form endoskeleton of vertebrates. They provide levers for movement and support for soft parts of the body. Bones also protect many delicate tissues and organs.
  </p>,

  <div key="b5-fig229" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_02BFC4AB98D964641545} alt="Fig. 2.29 Bone" style={{ maxWidth: "65%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.29. Bone (compact bone structure showing Haversian system)</p>
  </div>,

  <p key="b5-tbl26-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "center", color: "#c0126a", margin: "14px 0 4px" }}>TABLE 2.6. Differences between Cartilage and Bone.</p>,
  <Table26 key="b5-tbl26" />,

  // 2.4.3(v) Fluid tissue
  <div key="b5-hd-fluid" id="s243v" style={{ marginTop: 18, marginBottom: 4 }}>
    <h4 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 700, color: "#c0126a", margin: 0 }}>2.4.3.(v) Fluid Tissue (Blood and Lymph)</h4>
  </div>,
  <p key="b5-p-fluid-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Fluid tissue is also known as <strong>vascular tissue.</strong> It consists of fluid matrix in which are suspended free floating cells. The matrix is devoid of fibres, flows freely and is not secreted by the cells it contains. Fluid tissue includes blood and lymph.
  </p>,

  // Blood
  <p key="b5-hd-blood" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "12px 0 4px" }}>(<em>a</em>) Blood (Fig. 2.30)</p>,
  <p key="b5-p-blood-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Characteristics.</strong> Blood is the most important liquid connective tissue which consists of an aquous (watery) mixture of substances in solution (<strong>blood plasma</strong>) in which are suspended different types of free floating cells (blood corpuscles). The <strong>blood plasma</strong> is a pale straw-coloured fluid matrix or medium consisting of about 90% water and 10% mixture of different types of molecules that enter the blood at various locations. These substances include — proteins (soluble proteins such as <strong>albumins, globulins</strong> and <strong>fibrinogen</strong>), glucose, amino acids, lipids, vitamins, urea, uric acids, enzymes and hormones. They belong to the category of nutrients, wastes, hormones and osmoregulators.
  </p>,
  <p key="b5-p-blood-2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>
    In vertebrates, the blood corpuscles are —
  </p>,
  <p key="b5-p-blood-c1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>i</em>) Red blood corpuscles (RBC) or erythrocytes ;</p>,
  <p key="b5-p-blood-c2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>ii</em>) White blood corpuscles (WBC) or leucocytes ; and</p>,
  <p key="b5-p-blood-c3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 28px" }}>(<em>iii</em>) Platelets.</p>,

  <p key="b5-p-rbc" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The <strong>red blood corpuscles</strong> of mammals are small, circular, biconcave discs and lack nuclei when mature. There are about five million red blood cells per mm<sup style={{ fontSize: "0.72em", lineHeight: 0 }}>3</sup> of blood. They are packed with iron-rich, red-coloured, oxygen-carrying protein pigment, the <strong>haemoglobin.</strong> Haemoglobin combines reversibly with oxygen to form oxyhaemoglobin (blood-red in colour). Red blood corpuscles also contain the enzyme carbonic anhydrase which regulates carbon dioxide transport.
  </p>,
  <p key="b5-p-wbc" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The <strong>white blood corpuscles</strong> are large-sized, nucleated cells present in much smaller number (about 7000 per mm<sup style={{ fontSize: "0.72em", lineHeight: 0 }}>3</sup> of blood). They are capable of <strong>amoeboid movement</strong> and play an important role in the body's defence mechanism. The white blood corpuscles belong to two main categories — <strong>phagocytes</strong> (carry out the function of body defence by engulfing pathogen) and <strong>immunocytes</strong> (they are responsible for immunity and carry out immune responses by producing antibodies). Phagocytes are further divided into two types — <strong>granulocytes</strong> (having cytoplasmic granules) and <strong>agranulocytes</strong> (having non-granular cytoplasm). Granulocytes include — <strong>Neutrophils</strong> (They engulf and digest disease causing pathogens) ; <strong>Eosinophils</strong> (They show allergic responses and antihistamine properties) ; and <strong>Basophils</strong> (They release histamine and heparin). Agranulocytes include — <strong>Monocytes</strong> (They engulf bacteria and cellular debris at injured site). Immunocytes include — <strong>Lymphocytes</strong> (They secrete antibodies to destroy microbes and also help in healing of injuries).
  </p>,
  <p key="b5-p-plat" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The <strong>platelets</strong> are irregularly shaped, non-nucleated fragments of giant cells. They play a role in blood clotting.
  </p>,

  <div key="b5-fig230" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_708C8124F1E91F96225A} alt="Fig. 2.30" style={{ maxWidth: "65%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.30. Human blood corpuscles A. Erythrocytes (Red blood corpuscles) ; B. Leucocytes (White blood corpuscles) ; C. Platelets</p>
  </div>,

  <p key="b5-blood-fn-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "12px 0 6px" }}>Functions :</p>,
  <p key="b5-blood-fn-1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>1</em>) Blood plasma serves the function of transport of nutrients, carbon dioxide, waste products, hormones and metabolic intermediates. It also regulates water balance, pH and body temperature.</p>,
  <p key="b5-blood-fn-2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>2</em>) Red blood corpuscles help in the transport of oxygen.</p>,
  <p key="b5-blood-fn-3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}>(<em>3</em>) White blood corpuscles act as soldiers, scavengers and builders of the body.</p>,
  <p key="b5-blood-fn-4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 14px" }}>(<em>4</em>) The platelets help in blood clotting.</p>,

  // Lymph
  <p key="b5-hd-lymph" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 4px" }}>(<em>b</em>) Lymph</p>,
  <p key="b5-p-lymph" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The lymph is a colourless fluid tissue that acts as a middle man for transport of materials between blood and tissue cells. It consists of two parts — (<em>i</em>) Plasma (A clear and colourless fluid matrix), and (<em>ii</em>) White corpuscles (The floating amoeboid cells). The lymph is filtered out of the blood capillaries but differs from blood in lacking red corpuscles, platelets and some blood proteins. The lymph carries materials (glucose, oxygen, etc.) from the tissues into the blood stream and vice-versa. The lymph also protects the body against infection by destroying the invading microorganisms.
  </p>,

  // Activity 2.5
  <ActivityBox key="b5-act25" num="2.5" sub="To Study different types of cells present in the blood of human being.">
    <ActHd>Requirements.</ActHd>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px" }}>Glass slides, microscope, disposable sterile lancet (or 24 G needle), alcohol, dry guaze, Leishman stain, buffer solution.</p>
    <ActHd>Procedure.</ActHd>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px" }}>
      Select the fingertip suitable for puncture. Clean it by using a cotton piece or guaze piece touched with alcohol. Allow the area to dry. Prick the fingertip with disposable sterile lancet (or 24 G needle). Press the finger slightly so that blood oozes out. Take a drop of blood on the already cleaned slide 1–2 cm from one end. With the help of another slide, spread evenly the blood on the slide so that thin smear is formed. Allow the thin smear to dry. Put few drops of leishman stain on the thin smear. Leave it for 2 minutes. Then add equal amount of buffer solution over the stain. Mix the solution with stain evenly by gently blowing the air. Leave it for 10 minutes. Then, pour off the stain by keeping slide in stanting position under water. Dry it and then examine it under the high power microscope.
    </p>
    <ActHd>Results and Conclusions.</ActHd>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px" }}>
      You will observe three types of cells viz., abundant, small, circular, biconcave discs that lack nuclei (red blood corpuscles or RBCs), large-sized, nucleated cells present in much smaller number (White blood corpuscles or WBCs) and irregularly shaped, non-nucleated fragments of giant cells (blood platelets). White blood cells are of two categories — agranulocytes (monocytes and lymphocytes) and granulocytes (neutrophils, eosinophils and basophils). See Fig. 2.30 for structural details of blood cells.
    </p>
  </ActivityBox>,

  // Blood Counts & Health Feature Box
  <FeatureBox key="b5-feat-blood" title="Blood Counts and Health">
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 6 }}>The Components of Blood.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
      Blood might look like a simple red fluid, but is a complex, living tissue. It is composed of several types of cells and cell fragments, all floating in a yellowish liquid called plasma. These components work together to transport oxygen, fight infection, and stop bleeding.
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 4 }}>Red Blood Cells.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
      Red blood cells (erythrocytes) are the most numerous cells in human blood, giving it its characteristic colour. A mature red blood cell is a biconcave disc. This shape increases the cell's surface area, which is crucial for its job. Most remarkably, mature red blood cells do not have a nucleus. This frees up internal space to be packed full of a protein called hemoglobin, which binds to oxygen in the lungs, allowing red blood cells to carry it to every other cell in the body. The typical lifespan of a red blood cell is about 120 days. Human body constantly produces new ones in the bone marrow to replace those that wear out.
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 4 }}>White Blood Cells.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
      White blood cells (leucocytes) are the cornerstone of our immune system. Unlike red blood cells, they are much fewer in number, have a nucleus, and come in various shapes and sizes. They are body's mobile defense force, actively seeking out and destroying invading pathogens like bacteria, viruses, and fungi. The leucocytes include neutrophils, lymphocytes, monocytes, eosinophils, and basophils.
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 4 }}>Platelets.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>
      Platelets (thrombocytes) are not actually complete cells. They are small, irregular-shaped fragments of very large cells made in the bone marrow. Despite their small size, they have a critical job — blood clotting. When one gets a cut and a blood vessel is damaged, platelets are the first responders. They rush to the site, become sticky, and clump together to form a temporary plug, leading to the formation of a solid blood clot that seals the wound and allows it to heal.
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 6 }}>Normal Blood Cell Ranges</p>
    <TableBloodRanges />
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "10px 0 8px" }}>
      Medical professionals use RBC count, WBC count and Platelet count as key indicators to diagnose and monitor conditions such as anaemia, infections and dengue.
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 4 }}>1. Anaemia.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
      It is a condition where patient's blood has lower than normal number of red blood cells to carry adequate oxygen to body tissues or a reduced amount of haemoglobin in the blood. This results in symptoms of anaemia, <em>i.e.,</em> fatigue, weakness, shortness of breath, pale skin, and dizziness. <strong>There are three main causes of anaemia</strong> — blood loss, decreased or faulty RBC production (Iron deficiency anaemia), and destruction of RBCs (<em>e.g.,</em> sickle cell anaemia). Anaemia is diagnosed using the CBC test measuring (<em>i</em>) RBC Count, (<em>ii</em>) Amount of haemoglobin, and (<em>iii</em>) <strong>Hematocrit</strong> — the percentage of blood volume that is made of red blood cells.
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", marginBottom: 4 }}>2. Infections.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 10 }}>
      When the human body gets infected with a bacteria or a virus, the number of white blood cells can change dramatically. When a body detects a threat, it produces and releases more white blood cells into the blood stream to fight the invader. WBC army is not just one type of soldier — it is a specialized team, and each member has a specific role.
    </p>
    <TableWBCTypes />
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "10px 0 4px" }}>
      <strong>W.B.C Count.</strong> Production of WBCs is increased in the body to fight off bacterial, viral or other pathogenic infections. Therefore, a high WBC count (leukocytosis) is often a strong indicator of an ongoing infection in the body. Certain specific infections such as typhoid fever might cause a low WBC count (leucopenia).
    </p>
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", margin: "10px 0 4px" }}>3. Dengue Fever.</p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 6 }}>
      It is a viral infection transmitted by mosquitoes, mainly in tropical and subtropical regions. When an infected mosquito bites a person, the virus enters his bloodstream and begins to replicate, triggering a response from the immune system.
    </p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>
      <strong>Platelet Count.</strong> Dengue fever causes a significant drop in platelet count (thrombocytopenia), which can lead to severe bleeding in critical cases. Monitoring the platelet count, therefore, is crucial for managing dengue patients.
    </p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>
      <strong>W.B.C Count.</strong> Patients with dengue infection typically experience a low WBC count (leucopenia).
    </p>
    <p style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8 }}>
      <strong>R.B.C Count.</strong> The RBC count usually remains normal in uncomplicated dengue infection, but if severe plasma leakage or significant bleeding occurs, the RBC count (specifically the hematocrit level) will increase due to concentration, or decrease due to blood loss, respectively.
    </p>
  </FeatureBox>,

  // Musculoskeletal System
  <SecHd key="b5-sec-musculo" id="s-musculo" label="" title="Musculoskeletal System" />,
  <p key="b5-p-musculo-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    In human beings, musculoskeletal system is the body's framework, comprising bones, muscles, cartilage, tendons, ligaments, and connective tissues. It provides support, stability, and movement, allowing us to stand, walk, and perform activities. It also protects our vital organs and stores minerals such as calcium. It is essential for posture, motion, and even blood cell production. This system works dynamically as muscles contract to pull the bones via tendons and ligaments at joints.
  </p>,

  <p key="b5-musculo-comp-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "12px 0 6px" }}>Key components of musculoskeletal system</p>,
  <p key="b5-musculo-c1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Bones.</strong> These are the rigid framework of our body. These provide structure, protect vital internal organs, store minerals, and produce blood cells in marrow.</p>,
  <p key="b5-musculo-c2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Muscles.</strong> These contract to move bones and also generate heat.</p>,
  <p key="b5-musculo-c3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Cartilage.</strong> These cushion the ends of bones at joints, allowing smooth movement. It acts as a shock absorber and allows bones to glide past each other with very little friction. This is why our joints do not grind together when we move.</p>,
  <p key="b5-musculo-c4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Tendons.</strong> Tendons are tough, flexible bands of fibrous tissue that connect muscles to bones. When a muscle contracts, the tendons transmit that pulling force to the bone, making it move.</p>,
  <p key="b5-musculo-c5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Ligaments.</strong> These connect bones to other bones. Their job is to hold your skeleton together and keep your joints stable. They act like strong straps to prevent bones from moving too far in the wrong direction.</p>,
  <p key="b5-musculo-c6" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 14px" }}><strong>Joints.</strong> These are the places where bones meet, enabling motion.</p>,

  <div key="b5-fig231" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_540358668D0E72441305} alt="Fig. 2.31 Musculoskeletal system" style={{ maxWidth: "60%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.31. Human musculoskeletal system showing major bones and muscles</p>
  </div>,

  <p key="b5-musculo-fn-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "12px 0 6px" }}>Main functions</p>,
  <p key="b5-musculo-f1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Support and structure.</strong> It gives the body its shape and holds it upright.</p>,
  <p key="b5-musculo-f2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Movement.</strong> It is brought about by muscles. They pull on bones to create motion.</p>,
  <p key="b5-musculo-f3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Protection.</strong> Musculoskeletal system safeguards our vital internal organs.</p>,
  <p key="b5-musculo-f4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Mineral storage.</strong> Bones store calcium and phosphorus.</p>,
  <p key="b5-musculo-f5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 14px 14px" }}><strong>Blood cell production.</strong> Red bone marrow produces red blood cells, white blood cells, and platelets.</p>,

  // JOINTS
  <SecHd key="b5-sec-joints" id="s-joints" label="" title="Joints" />,
  <DefBox key="b5-def-joint">The structural arrangement of tissues which connect two or more bones together at their place of meeting is called a joint. Movement of bones occur only at the joints.</DefBox>,

  <p key="b5-joints-types-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Types of Joints.</p>,
  <p key="b5-joints-types-p" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}>In the human body, there are three main types of joints :</p>,
  <p key="b5-joints-t1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>i</em>) Fibrous or immovable joints.</p>,
  <p key="b5-joints-t2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 28px" }}>(<em>ii</em>) Cartilaginous or slightly movable joints, and</p>,
  <p key="b5-joints-t3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 28px" }}>(<em>iii</em>) Synovial or freely movable joints.</p>,

  <p key="b5-joints-fib" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>i</em>) Fibrous (Immovable) Joints.</strong> These joints are essentially fixed. The bones are locked together by dense connective tissue. Examples include sutures in the skull (bones of the cranium), and the gomphoses holding teeth in the jaw.
  </p>,
  <p key="b5-joints-cart" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>ii</em>) Cartilaginous (Slightly Movable) Joints.</strong> In these joints, the bones are joined by cartilage and allow limited movement. Examples include the joints between vertebrae in the spine, pubic symphysis and those between the ribs and sternum.
  </p>,
  <p key="b5-joints-syn" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>iii</em>) Synovial (Freely Movable) Joints.</strong> These joints mostly exist between the limb bones and permit great deal of movement. Such a joint has a synovial cavity filled with fluid, surrounded by an articular capsule. These joints are, thus, designed for smooth, wide-ranging motion like a well-oiled machine (Fig. 2.32). Examples include :
  </p>,

  <div key="b5-fig232" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_5403B97F90BB19CD0FAB} alt="Fig. 2.32 Synovial joints" style={{ maxWidth: "70%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.32. Depicting synovial joints</p>
  </div>,

  <p key="b5-syn-j1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>Ball-and-socket joint (shoulder joint and hip joint).</p>,
  <p key="b5-syn-j2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>Hinge joint (knee joint, elbow joint, ankle joint).</p>,
  <p key="b5-syn-j3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>Angular or Condyloid joint (wrist joint).</p>,
  <p key="b5-syn-j4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>Gliding joint (between carpals in wrist, tarsals in ankle).</p>,
  <p key="b5-syn-j5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 28px" }}>Pivot joint (between atlas and axis vertebrae in the neck of man).</p>,
  <p key="b5-syn-j6" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px 28px" }}>Saddle joint (between metacarpals of thumb and corresponding carpal in the hand of man).</p>,

  <p key="b5-joints-fn-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, margin: "10px 0 6px" }}>Functions of joints.</p>,
  <p key="b5-joints-fn1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 14px" }}>1. The joints make the body flexible.</p>,
  <p key="b5-joints-fn2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 14px" }}>2. Some joints allow the growth of the structures they connect.</p>,
  <p key="b5-joints-fn3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}>3. Many joints permit movement between the opposed surfaces of the bones they connect.</p>,

  // Care of Musculoskeletal System
  <p key="b5-care-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "18px 0 6px" }}>Care of Musculoskeletal System</p>,
  <p key="b5-p-care" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 14px" }}>
    The health of one's musculoskeletal system is fundamental to his quality of life. A strong and healthy system gives you the freedom to move without pain or limitation. Care of musculoskeletal system involves regular exercise (strength, cardio, flexibility), a balanced diet rich in calcium, vitamin D, protein etc. maintaining a healthy weight, good posture, proper lifting, adequate sleep, hydration, stress management, and avoiding tobacco to keep bones, muscles, and joints strong and flexible, preventing injuries and long-term issues.
  </p>,

  // Relationship between Fitness and tissues
  <p key="b5-fitness-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 6px" }}>Relationship between Fitness of different Tissues for Movement and Sports</p>,
  <p key="b5-p-fitness" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The correlation between different tissues for fitness is a highly integrated and interdependent relationship, crucial for movement and sports. Muscles, cartilage, and bones do not function in isolation ; instead, they form a coordinated system known as the musculoskeletal system. The efficiency of movement and athletic performance depends entirely on how these tissues interact.
  </p>,

  <p key="b5-interplay-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 6px" }}>The Interplay of Tissues in Movement and Fitness.</p>,
  <p key="b5-p-interplay-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Movement in fitness and sports relies on the seamless cooperation of these specialized tissues :
  </p>,
  <p key="b5-interplay-bones" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Bones (Skeletal System).</strong> Bones provide the framework of the body and protect vital internal organs. They act as levers. When muscles contract, they pull on the bones, generating force and motion around the joints. This is fundamental for actions such as running, jumping, and weight lifting. Bones also serve as attachment points for muscles via tendons and store essential minerals, <em>e.g.,</em> calcium which is essential for muscle contraction.
  </p>,
  <p key="b5-interplay-muscles" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Muscles.</strong> These are the primary source of power and force. They contract and relax to move bones at the joints. Their role in fitness is extensive. Building muscle strength and endurance directly enhances the performance in nearly all sports. Muscle health is also intrinsically linked to bone health. Physical stress from muscle contractions stimulates bone growth and density, thereby, reinforcing the skeletal structure.
  </p>,
  <p key="b5-interplay-cart" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Cartilage.</strong> It is specialized, semi-rigid connective tissue that covers the ends of bones within a joint. It acts as a cushion and shock absorber. Its smooth, lubricated surface (aided by synovial fluid) reduces friction, allowing bones to glide past each other easily during movement. Without healthy cartilage, the friction of bone-on-bone contact would cause pain and damage (osteoarthritis).
  </p>,
  <p key="b5-interplay-lig" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>Ligaments.</strong> These are strong tissue bands which connect bones to other bones. These stabilize the joint and prevent excessive or abnormal movement that can lead to injury.
  </p>,

  // Yoga exercises
  <p key="b5-yoga-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 6px" }}>Importance of Yoga Exercises</p>,
  <p key="b5-p-yoga-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Yoga exercises are important for physical agility and maintaining correct posture due to their focus on flexibility, strength, balance, and body awareness.
  </p>,

  <p key="b5-yoga-agility-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", margin: "10px 0 4px" }}>1. Physical Agility.</p>,
  <p key="b5-p-agility-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    It is the ability to move quickly and easily, and yoga enhances this through :
  </p>,
  <p key="b5-yoga-a1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}><strong>Improved Flexibility and Range of Motion.</strong> Yoga postures (asanas) involve stretching muscles and connective tissues to increase flexibility. Such wide range of motions allow more fluid and efficient movement, reducing stiffness and the risk of injury during physical activity.</p>,
  <p key="b5-yoga-a2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}><strong>Enhanced Balance and Coordination.</strong> Many yoga poses (<em>e.g.,</em> tree pose or Eagle pose) challenge one's balance. Continuous practice of these poses strengthen the muscles in one's core and lower body necessary for quick changes in overall coordination.</p>,
  <p key="b5-yoga-a3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}><strong>Increased Muscle Strength and Endurance.</strong> Yoga uses body weight as resistance, building lean muscle mass. This results in functional strength in the core, legs, and back to improve one's power and stability.</p>,
  <p key="b5-yoga-a4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}><strong>Mind-Body Connection.</strong> Yoga emphasizes present-moment awareness and controlled breathing which improves the connection between one's mind and body. It helps the person to react faster and control one's movements with greater precision.</p>,

  <p key="b5-yoga-posture-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", margin: "10px 0 4px" }}>2. Maintaining Correct Posture.</p>,
  <p key="b5-p-posture-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    Good posture involves training the body to stand, walk, sit, and lie in positions where the least strain is put on supporting muscles and ligaments during movement or weight-bearing activity. Yoga helps maintain correct posture by :
  </p>,
  <p key="b5-yoga-p1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}><strong>Strengthening core muscles.</strong> Abdominals, obliques, and lower back muscles are the core muscles. These are the foundation of good posture. Yoga poses like Plank pose and Boat pose build a strong, supportive core that helps to keep the spine correctly aligned.</p>,
  <p key="b5-yoga-p2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}><strong>Spinal Alignment and Awareness.</strong> Postures often require specific spinal alignment. Mountain pose (Tadasana) explicitly teaches us the sensation of a naturally aligned spine. It helps the yoga practioners to maintain this alignment in daily life.</p>,
  <p key="b5-yoga-p3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 6px 14px" }}><strong>Stretching Tight Muscles.</strong> Present day living often leads to tightness in the chest, hip flexors, and hamstrings, which pull the body out of alignment. Yoga postures effectively stretch these areas, thereby, allowing muscles to relax into a natural balanced state.</p>,
  <p key="b5-yoga-p4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}><strong>Addressing Muscular Imbalances.</strong> Yoga exercises help to balance strength and flexibility across the entire body.</p>,

  // Latest techniques
  <p key="b5-latest-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "18px 0 6px" }}>Latest Techniques and Medical Recommendations in Maintaining Muscle Tone and Recovery from Injuries.</p>,
  <p key="b5-p-latest-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Maintaining muscle tone and recovery from injuries involves a multimodal approach centered on early, progressive mobilization, personalized nutrition, advanced physical therapy techniques, and emerging regenerative medicine.
  </p>,

  <p key="b5-latest-key-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#c0126a", margin: "10px 0 4px" }}>Key Medical Recommendations.</p>,
  <p key="b5-latest-police" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>Optimal Loading (POLICE Principle).</strong> It emphasizes a balanced, progressive rehabilitation programme that introduces controlled mechanical stress (pain-free movement) to promote healing, instead of complete rest which can lead to muscle atrophy and excess scar tissue.</p>,
  <p key="b5-latest-prog" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>Progressive Rehabilitation.</strong> It involves a structural physiotherapy programme after an initial short period of protection (3–7 days). Progressive rehabilitation progresses from isometric exercise (muscle contracts but does not change length) to isotonic exercise (muscle changes length against constant tension) and finally to isokinetic exercise (muscle moves at a constant speed). Recently, progressive agility and trunk stabilization exercises are incorporated as they yield better outcomes than programmes solely on isolated muscle strengthening and stretching.</p>,
  <p key="b5-latest-nutr-hd" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 4px 14px" }}><strong>Personalized Nutrition.</strong> Nutrition is vital for muscle repair. It includes intake of protein, carbohydrates, micronutrients and supplements :</p>,
  <p key="b5-latest-prot" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 36px" }}><strong>Protein.</strong> During immobilization or rehabilitation, daily high protein intake is required (around 1·6 to 3·0 g/kg of body wt. per day). Leucine-rich proteins (<em>e.g.,</em> whey) are especially effective for stimulating muscle protein synthesis.</p>,
  <p key="b5-latest-carb" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 3px 36px" }}><strong>Carbohydrates.</strong> During rehabilitation, carbohydrates are needed as primary energy source (around 3 to 5 g/kg).</p>,
  <p key="b5-latest-micro" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 36px" }}><strong>Micronutrients and Supplements.</strong> Use of omega-3 fatty acids, vitamin D, and creatine are recommended for their protective and muscle-growth modulating roles.</p>,
  <p key="b5-latest-sleep" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>Prioritize Sleep.</strong> Adequate rest and 7–9 hours of quality sleep are essential for repair and build muscle tissue.</p>,
  <p key="b5-latest-mental" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px 14px" }}><strong>Mental Health.</strong> Stress management techniques, to build mental resilience, are recognized as a key for recovery and injury prevention.</p>,
  <p key="b5-latest-regen" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px 14px" }}><strong>Regeneration Therapies.</strong> This area includes the use of patient's own platelet-rich plasma (PRP) and stem cell therapy to promote faster and near complete functional recovery for severe injuries.</p>,

  <p key="b5-apt-hd" style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, color: "#c0126a", margin: "14px 0 6px" }}>Advanced Physical Therapy Modalities</p>,
  <p key="b5-apt-intro" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 8px" }}>
    In addition to manual therapy and specific exercise programmes, physical therapists use following technologies :
  </p>,
  <p key="b5-apt-1" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 5px 14px" }}><strong>Laser Therapy</strong> — It involves use of focused light energy to reduce inflammation and accelerate tissue healing.</p>,
  <p key="b5-apt-2" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 5px 14px" }}><strong>Shockwave Therapy</strong> — It involves use of targeted acoustic waves to stimulate blood flow and tissue repair.</p>,
  <p key="b5-apt-3" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 5px 14px" }}><strong>Neuromuscular Electric Stimulation</strong> — It involves use of mild electric currents to work muscles during periods of inactivity, helping to prevent atrophy.</p>,
  <p key="b5-apt-4" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 5px 14px" }}><strong>Wearable Technology</strong> — It includes devices that monitor real-time biometrics such as heart rate variability, sleep patterns, and movement analysis. The information is used to tailor recovery protocols and prevent overuse injuries.</p>,
  <p key="b5-apt-5" style={{ fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.8, margin: "0 0 14px 14px" }}><strong>Far Infrared Technology</strong> — This technology is believed to boost microcirculation and support cellular healing.</p>,

  // 2.4.4 Nervous Tissue
  <SubHd key="b5-sub-244" id="s244" label="2.4.4" title="Nervous Tissue" />,
  <p key="b5-p-nerve-1" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The nervous tissue, which contains densely packed nerve cells, called <strong>neurons</strong> (Gk. <em>neuro</em> = nerve), is present in the brain, spinal cord and sense organs. It also forms the network of nerves that run throughout the entire body. The neurons are specialised for conduction of nerve impulses. They receive stimuli from within or outside the body and conduct impulses (signals) which travel from one neuron to another neuron over long distances. Hence, nervous tissue acts as body's command centre and is responsible for coordinating and controlling many body activities. It also plays a major role in emotions, memory and reasoning.
  </p>,

  <p key="b5-p-nerve-2" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    Each neuron (Fig. 2.33) is composed of the following three parts :
  </p>,

  <div key="b5-fig233" style={{ textAlign: "center", margin: "12px 0" }}>
    <img src={CONTENT_IMAGES.CONTENT_IMAGE_C0FE710F91148217A579} alt="Fig. 2.33 A neuron" style={{ maxWidth: "38%", borderRadius: 4 }} />
    <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 12, color: "#444", marginTop: 6, fontStyle: "italic" }}>Fig. 2.33. A neuron (Nerve cell and nerve fibres)</p>
  </div>,

  <p key="b5-neuron-cyton" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>i</em>) Cyton or cell body.</strong> The cell body contains the major concentration of the cytoplasm and the central nucleus of the neuron. The cell body also contains <strong>Nissl's granules,</strong> which are groups of ribosomes and rough endoplasmic reticulum.
  </p>,
  <p key="b5-neuron-dendron" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>ii</em>) Dendrons.</strong> These are short, much-branched and tapering projections arising from the cell body. The dendrons are further branched into <strong>dendrites.</strong> They provide a large surface area for synaptic connections with other neurons. They conduct nerve impulses towards the cell body.
  </p>,
  <p key="b5-neuron-axon" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    <strong>(<em>iii</em>) Axon (Nerve fibre).</strong> The axon is a long cylindrical process of uniform diameter that arises from the axon hillock of the cyton. It shows fine branching at the terminal end. Each branch ends in a swollen structure, called <strong>synaptic knob</strong> or button. The axons carry impulses away from the cell body to other neurons.
  </p>,
  <p key="b5-neuron-synapse" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 10px" }}>
    The synaptic knobs of terminal branches of neuron are connected with dendrite branches of an adjacent neuron. Each such junction, in fact, has minute gap called <strong>synapse.</strong> It is meant for the transmission of nerve impulse from one neuron to the other.
  </p>,
  <p key="b5-neuron-glial" style={{ textIndent: 28, textAlign: "justify", fontFamily: "'Merriweather', serif", fontSize: 14, lineHeight: 1.9, margin: "0 0 20px" }}>
    Nervous system also includes <strong>glial cells,</strong> which are non-neuronal cells that support, insulate and nourish the neurons.
  </p>,
];

const tocItems = [
  { id: "s21", label: "2.1", title: "Hierarchy in Nature", level: 1 },
  { id: "s22", label: "2.2", title: "Introduction and Definition of Tissues", level: 1 },
  { id: "s221", label: "2.2.1", title: "Plant and Animal Tissues are Different", level: 2 },
  { id: "s23", label: "2.3", title: "Plant Tissues", level: 1 },
  { id: "s231", label: "2.3.1", title: "Meristematic Tissues", level: 2 },
  { id: "s232", label: "2.3.2", title: "Permanent Tissues", level: 2 },
  { id: "s232a", label: "2.3.2.(a)", title: "Simple Permanent Tissues", level: 3 },
  { id: "s232b", label: "2.3.2.(b)", title: "Complex Permanent Tissues", level: 3 },
  { id: "s24", label: "2.4", title: "Animal Tissues", level: 1 },
  { id: "s241", label: "2.4.1", title: "Epithelial Tissue", level: 2 },
  { id: "s241i", label: "2.4.1.(i)", title: "Squamous Epithelium", level: 3 },
  { id: "s241ii", label: "2.4.1.(ii)", title: "Cuboidal Epithelium", level: 3 },
  { id: "s241iii", label: "2.4.1.(iii)", title: "Columnar Epithelium", level: 3 },
  { id: "s241iv", label: "2.4.1.(iv)", title: "Ciliated Epithelium", level: 3 },
  { id: "s241v", label: "2.4.1.(v)", title: "Glandular Epithelium", level: 3 },
  { id: "s242", label: "2.4.2", title: "Muscle Tissues", level: 2 },
  { id: "s242i", label: "2.4.2.(i)", title: "Striated Muscle", level: 3 },
  { id: "s242ii", label: "2.4.2.(ii)", title: "Unstriated Muscle", level: 3 },
  { id: "s242iii", label: "2.4.2.(iii)", title: "Cardiac Muscle", level: 3 },
  { id: "s243", label: "2.4.3", title: "Connective Tissues", level: 2 },
  { id: "s243i", label: "2.4.3.(i)", title: "Areolar Tissue", level: 3 },
  { id: "s243ii", label: "2.4.3.(ii)", title: "Dense Regular Connective Tissue", level: 3 },
  { id: "s243iii", label: "2.4.3.(iii)", title: "Adipose Tissue", level: 3 },
  { id: "s243iv", label: "2.4.3.(iv)", title: "Skeletal Tissue", level: 3 },
  { id: "s243v", label: "2.4.3.(v)", title: "Fluid Tissue (Blood and Lymph)", level: 3 },
  { id: "s-musculo", label: "", title: "Musculoskeletal System", level: 1 },
  { id: "s-joints", label: "", title: "Joints", level: 1 },
  { id: "s244", label: "2.4.4", title: "Nervous Tissue", level: 2 },
];

const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
  ...content_b5,
];

export default function Chapter2() {
  useFonts();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Merriweather', serif", background: "#fff", minHeight: "100vh" }}>
      <HamburgerBtn open={open} setOpen={setOpen} />
      <Backdrop open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} tocItems={tocItems} />
      <div style={{ maxWidth: "min(100%, 75rem)", margin: "0 auto", padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)" }}>
        {allContent}
      </div>
    </div>
  );
}
