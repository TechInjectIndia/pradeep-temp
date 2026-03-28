"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── COMPONENT LIBRARY ────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P = "#f9eef4";

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
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", lineHeight: 1.25, margin: "0 3px", fontSize: "0.95em" }}>
    <span style={{ borderBottom: "1.5px solid #1a1a1a", padding: "0 4px 1px", textAlign: "center", whiteSpace: "nowrap" }}>{n}</span>
    <span style={{ padding: "1px 4px 0", textAlign: "center", whiteSpace: "nowrap" }}>{d}</span>
  </span>
);
const MathBlock = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 20px", fontStyle: "italic", fontSize: "14.5px", lineHeight: 1.6 }}>{children}</div>
);
const Arrow = () => <span style={{ margin: "0 6px" }}>⟶</span>;
const Eq = () => <span style={{ margin: "0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin: "0 4px" }}>×</span>;

const ChemEq = ({ lhs, rhs, arrow = "forward", topLabel, bottomLabels }) => {
  const arrowChar = arrow === "eq" ? "⇌" : arrow === "reverse" ? "⟵" : "⟶";
  return (
    <div style={{ textAlign: "center", margin: "16px 20px", fontSize: 14.5, lineHeight: 1.7 }}>
      <span>{lhs}</span>
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 10px", fontSize: "0.85em" }}>
        {topLabel && <span style={{ fontSize: 11, color: "#555" }}>{topLabel}</span>}
        <span style={{ fontSize: 18 }}>{arrowChar}</span>
      </span>
      <span>{rhs}</span>
      {bottomLabels && (
        <div style={{ display: "flex", justifyContent: "center", gap: 80, fontSize: 12, color: "#555", marginTop: 2 }}>
          {bottomLabels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  );
};

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14, fontWeight: 800, color: P_COLOR, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
      {label}. {title}
    </h2>
    <div style={{ borderTop: "1.5px solid #c0126a", marginTop: 4 }} />
  </div>
);
const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14, fontWeight: 700, color: P_COLOR, margin: "16px 0 8px" }}>{label}. {title}</h3>
);
const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>{label}. {title}</h4>
);
const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 8px", textAlign: "justify", ...style }}>{children}</p>
);
const DefBox = ({ children }) => (
  <div style={{ border: "1.5px solid #888", padding: "10px 16px", margin: "12px 0", fontStyle: "italic", background: "#fafafa", fontSize: "14px", lineHeight: 1.55 }}>
    {children}
  </div>
);
const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border: "1.5px solid #888", borderLeft: "5px solid #c0126a", margin: "18px 0" }}>
    <div style={{ textAlign: "center", fontWeight: 800, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, textDecoration: "underline", padding: "8px 12px 2px" }}>
      ACTIVITY {num}.
    </div>
    {sub && <div style={{ textAlign: "center", color: P_COLOR, fontStyle: "italic", fontSize: 13, padding: "2px 16px 8px" }}>{sub}</div>}
    <div style={{ padding: "8px 16px 12px" }}>{children}</div>
  </div>
);
const ActHd = ({ children }) => (
  <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "8px 0 5px" }}>{children}</p>
);
const KBBox = ({ children }) => (
  <div style={{ border: "2px solid #c0126a", margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 2, padding: "5px 14px" }}>
      KNOWLEDGEBOOSTER
    </div>
    <div style={{ padding: "10px 16px 12px" }}>{children}</div>
  </div>
);
const KBHd = ({ children }) => (
  <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>{children}</p>
);
const FeatureBox = ({ title, children }) => (
  <div style={{ border: "2px solid #888", margin: "18px 0", padding: "12px 16px" }}>
    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, color: P_COLOR, fontSize: 14, margin: "0 0 8px" }}>{title}</p>
    {children}
  </div>
);
const ProblemsBox = ({ children }) => (
  <div style={{ border: "2px solid #c0126a", margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", textAlign: "center", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 16, letterSpacing: 2, padding: 7 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding: "12px 18px" }}>{children}</div>
  </div>
);
const FootNote = ({ children }) => (
  <span style={{ fontSize: "12px", color: "#555", fontStyle: "italic", display: "block", marginTop: 8, paddingTop: 6, borderTop: "1px solid #ddd" }}>
    <sup style={{ color: P_COLOR, fontWeight: 700, marginRight: 1 }}>*</sup>
    {children}
  </span>
);
const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "20px auto", textAlign: "center", maxWidth: "90%" }}>
    <img src={src} alt={caption || num || "figure"}
      style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd", display: "block", margin: "0 auto" }}
      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
    />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center", border: "1.5px dashed #c0126a", background: "#f9eef4", minHeight: 80, padding: "12px 20px", color: P_COLOR, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{ marginLeft: 6 }}>{src}</code>
    </div>
    {(num || caption) && (
      <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic", margin: "6px auto 0", maxWidth: 480, lineHeight: 1.45 }}>
        {num && <strong style={{ color: P_COLOR, fontStyle: "normal" }}>{num}. </strong>}
        {caption}
      </p>
    )}
  </div>
);
const NumericalSection = ({ topic, children }) => (
  <div style={{ margin: "20px 0", border: "1.5px solid #c0126a" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 14px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>
      NUMERICAL PROBLEMS BASED ON {topic}
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);
const th = { border: "1.5px solid #555", padding: "6px 10px", textAlign: "center", fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13, background: "#f0f0f0" };
const td = { border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5 };

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen(o => !o)} aria-label={open ? "Close table of contents" : "Open table of contents"}
      style={{ position: "fixed", top: 14, left: 14, zIndex: 1100, background: "#fff", color: P_COLOR, border: "2px solid #2563eb", borderRadius: 8, width: 40, height: 40, cursor: "pointer", fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", fontFamily: "system-ui,sans-serif" }}>
      {open ? "✕" : "☰"}
    </button>
  );
}
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return <div onClick={onClick} style={{ position: "fixed", inset: 0, zIndex: 1050, background: "rgba(0,0,0,0.18)", backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }} />;
}
function Sidebar({ open, setOpen, tocItems }) {
  const handleClick = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setOpen(false); };
  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1060, width: 260, height: "100vh", background: "#fff", borderRight: "1px solid #e0e0e0", boxShadow: "4px 0 24px rgba(0,0,0,0.13)", transform: open ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)", overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ background: P_COLOR, color: "#fff", padding: "14px 16px 12px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 13, letterSpacing: 2, flexShrink: 0 }}>TABLE OF CONTENTS</div>
      <nav style={{ padding: "8px 0", flex: 1 }}>
        {tocItems.map(item => (
          <button key={item.id} onClick={() => handleClick(item.id)}
            style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: item.level === 1 ? "6px 16px" : item.level === 2 ? "4px 16px 4px 28px" : "3px 16px 3px 40px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: item.level === 1 ? 700 : 400, fontSize: item.level === 1 ? 12 : 11, color: item.level === 1 ? P_COLOR : "#444", borderLeft: item.level === 1 ? "3px solid #c0126a" : "none", marginBottom: 2, lineHeight: 1.4 }}>
            {item.label} {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

const chapterNumber = "4";
const chapterTitle = "Biodiversity and Classification";
const ChapterCover = () => (
  <div style={{ background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)", padding: "60px 48px 50px", textAlign: "center", marginBottom: 0 }}>
    <div style={{ display: "inline-block", border: "3px solid #fff", padding: "8px 28px", marginBottom: 18 }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 56, color: "#fff", lineHeight: 1 }}>{chapterNumber}</span>
    </div>
    <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 32, color: "#fff", letterSpacing: 2, textTransform: "uppercase", margin: 0, lineHeight: 1.25 }}>{chapterTitle}</h1>
  </div>
);

// ── TABLE COMPONENTS (Batch 1) ────────────────────────────────
const Table41 = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>TABLE 4.1. Comparative Account of Monera, Protista, Fungi, Plantae and Animalia</p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Kingdoms</td>
          <td style={th}>Body organisation</td>
          <td style={th}>Prokaryotic/Eukaryotic</td>
          <td style={th}>Cell Wall</td>
          <td style={th}>Mode of Nutrition</td>
        </tr>
      </thead>
      <tbody>
        <tr><td style={{...td, fontWeight:700}}>Monera</td><td style={td}>Unicellular</td><td style={td}>Prokaryotic</td><td style={td}>Some have cell wall while some do not</td><td style={td}>Autotrophic as well as heterotrophic</td></tr>
        <tr><td style={{...td, fontWeight:700}}>Protista</td><td style={td}>Unicellular</td><td style={td}>Eukaryotic</td><td style={td}>Some have cell wall while some do not</td><td style={td}>Autotrophic as well as heterotrophic</td></tr>
        <tr><td style={{...td, fontWeight:700}}>Fungi</td><td style={td}>Multicellular</td><td style={td}>Eukaryotic</td><td style={td}>With cell wall made up of chitin</td><td style={td}>Heterotrophic</td></tr>
        <tr><td style={{...td, fontWeight:700}}>Plantae</td><td style={td}>Multicellular</td><td style={td}>Eukaryotic</td><td style={td}>With cellulose cell wall</td><td style={td}>Autotrophic</td></tr>
        <tr><td style={{...td, fontWeight:700}}>Animalia</td><td style={td}>Multicellular</td><td style={td}>Eukaryotic</td><td style={td}>Without cell wall</td><td style={td}>Heterotrophic</td></tr>
      </tbody>
    </table>
  </div>
);

// ── CONTENT BATCH 1 ──────────────────────────────────────────
const content_b1 = [
  <SecHd key="sec-s41" id="s41" label="4.1" title="Diversity in Living Organisms (Biodiversity) : A General Idea" />,

  <p key="b1-p-s41-1" style={{ textIndent: 28, textAlign: "justify" }}>Life on earth is incredibly varied. Every organism of this world, whether a microorganism (cyanobacteria, true bacteria, protozoans etc.) or a plant or an animal is unique in itself. The uniqueness (or the special diagnostic features) of each organism, whether living in the soil, air or water, forms the basis of the <strong>diversity</strong> in life forms. This rich tapestry of life is what we call <strong>biodiversity</strong>. Thus,</p>,

  <DefBox key="def-s41-1">Biodiversity means different forms of living organisms or a variety of life forms found in a particular region.</DefBox>,

  <p key="b1-p-s41-2" style={{ textIndent: 28, textAlign: "justify" }}>For example, compare yourself with your friend. Both of you have different looks, different heights and different qualities. Both are identified on the basis of certain features. Now compare ourselves and our friends with a monkey. The monkey is quite different from us because we and our friends have close similarities. The distinction becomes more sharp if we compare ourselves and a monkey with a cow. Naturally, we and the monkey have more similarities in comparison to a cow. That means each and every living organism possesses a distinct form that distinguishes it from others. In other words, we can very easily observe that each organism has its own identifying characters that make it to identify and differentiate from others.</p>,

  <p key="b1-p-s41-3" style={{ textIndent: 28, textAlign: "justify" }}>If we go and visit some other places like hills, forests or sea sides, we may find some entirely different types of animals (<em>i.e.,</em> fauna) and plants (<em>i.e.,</em> flora). Different places in different parts of the world have their own distinct types of organisms. They vary in their shapes, sizes, colours, external appearance, longevity and behaviour. For example, some microscopic bacteria measure only a few micrometers in size whereas blue whales are more than 30 metres long and red wood trees of California are more than 100 metres tall. Some pine trees live for thousands of years, whereas, mosquitoes die within a few days. Some organisms are colourless or hyaline, whereas, others have beautiful colours. This clearly indicates that the <strong>extent of biodiversity is endless.</strong></p>,

  <p key="b1-p-s41-4" style={{ textIndent: 28, textAlign: "justify" }}>In fact, we are familiar with the common and easily available animals and plants. At present, approximately 1.7 to 1.8 million types of living organisms are known to us. The flora and fauna of the remote areas of deep forests, high mountains, deserts, depths of oceans are still unexplored. You will be surprised that we know only one out of six plants growing in tropical forests and, therefore, more than 80 per cent plants are hidden in the unknown places without proper identification. If we include all the living organisms of the world, about 92% of them are still unexplored.</p>,

  <SubHd key="sub-s41-ways" id="s41ways" label="" title="Different ways of expressing or measuring biodiversity" />,

  <p key="b1-p-s41-5" style={{ textIndent: 28, textAlign: "justify" }}>Biodiversity is not just about the number of different microorganisms, animals and plants. It exists on three distinct levels, each nested within the next.</p>,

  <p key="b1-p-s41-6" style={{ textAlign: "justify" }}><strong>1. Genetic Diversity.</strong> It is related to the variations of genes within a species. It includes the differences in body characters such as body size, colour of flower etc., expressed due to genetic differences. This genetic variability is crucial for a species to adapt to changes such as a shifting climate, new diseases etc.</p>,

  <p key="b1-p-s41-7" style={{ textAlign: "justify" }}><strong>2. Species Diversity.</strong> This level includes the variety in the number of different species of microorganisms, plants and animals in a given region, like the variety of fishes, corals, and crabs on a reef, or variety of plants (herbs, shrubs and trees), birds, insects, and other animals in a forest.</p>,

  <p key="b1-p-s41-8" style={{ textAlign: "justify" }}><strong>3. Ecosystem Diversity.</strong> This is the highest level and is related to the variety of community and ecosystem (deserts, forests, wetlands and oceans). Each ecosystem provides a unique home for specific varieties of species and performs different functions for the planet earth. This level has three perspectives:</p>,

  <p key="b1-p-s41-9" style={{ textAlign: "justify", marginLeft: 24 }}><em>(i)</em> <strong>Alpha diversity :</strong> It refers to the diversity of organisms sharing the same habitat.</p>,
  <p key="b1-p-s41-10" style={{ textAlign: "justify", marginLeft: 24 }}><em>(ii)</em> <strong>Beta diversity :</strong> It refers to the rate of turnover or replacement of species while moving from one habitat to another within a given geographical area.</p>,
  <p key="b1-p-s41-11" style={{ textAlign: "justify", marginLeft: 24 }}><em>(iii)</em> <strong>Gamma diversity :</strong> It refers to the rate of turnover or replacement of species between similar habitats in different geographical areas.</p>,

  <SubHd key="sub-s411" id="s411" label="4.1.1" title="Why Biodiversity Matters" />,

  <p key="b1-p-s411-1" style={{ textIndent: 28, textAlign: "justify" }}>A rich variety of life in the biosphere is essential for a healthy planet and for our own survival. Healthy ecosystems provide services that we often take for granted.</p>,
  <p key="b1-p-s411-2" style={{ textIndent: 28, textAlign: "justify" }}>Species maintain ecosystem balance through specialized roles like predation (controlling populations), pollination (plant reproduction), decomposition (nutrient recycling), and habitat provision, with diverse species ensuring resilience against disturbances, making ecosystems more productive and stable.</p>,
  <p key="b1-p-s411-3" style={{ textIndent: 28, textAlign: "justify" }}>Species present in an ecosystem include producers (plants), consumers (animals), decomposers (fungi/bacteria), and keystone species (like wolves or sea stars) that exert disproportionate control, preventing collapse and supporting essential ecosystem services.</p>,

  <p key="b1-p-s411-4" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>I. Key Ecological Roles :</p>,

  <p key="b1-p-s411-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Producers (Autotrophs).</strong> Plants and algae form the base, converting sunlight into energy, providing food and oxygen.</p>,
  <p key="b1-p-s411-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Consumers (Heterotrophs).</strong> Herbivores eat plants, carnivores eat other animals, thereby, keeping prey populations in check and transferring energy up the food web.</p>,
  <p key="b1-p-s411-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Decomposers.</strong> Bacteria and fungi break down dead organic matter, returning vital nutrients to the soil for their reuse by the producers.</p>,
  <p key="b1-p-s411-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Pollinators and Seed Dispersers.</strong> Insects, birds, and bats help pollination in plants, helping them to reproduce and spread, thereby, maintaining plant diversity.</p>,
  <p key="b1-p-s411-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Engineers.</strong> Species such as beavers or elephants modify habitats, creating homes for other organisms (<em>e.g.,</em> Peepal tree provides canopy for woodpeckers).</p>,

  <p key="b1-p-s411-10" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>II. Significance of Ecosystem Balance :</p>,

  <p key="b1-p-s411-11" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Productivity and Stability.</strong> Diverse species use resources efficiently, increasing overall biomass and buffering ecosystems from changes.</p>,
  <p key="b1-p-s411-12" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Nutrient Cycling.</strong> They ensure continuous recycling of essential elements like carbon, nitrogen, and phosphorus, thus, maintaining soil fertility.</p>,
  <p key="b1-p-s411-13" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Population Control.</strong> Predators and herbivores prevent any single species from dominating and depleting resources.</p>,
  <p key="b1-p-s411-14" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Resilience.</strong> High biodiversity allows ecosystems to recover better from disasters, diseases, or climate shifts.</p>,
  <p key="b1-p-s411-15" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Ecosystem Services.</strong> Diverse species provide ecosystem services such as clean water by aquatic plants and microorganisms in wetlands (streams, rivers etc.), oxygen (by the plants) for breathing by most organisms, pollination, climate regulation, and providing resources for humans (<em>e.g.,</em> medicine, food from diverse variety of plants and animals).</p>,
  <p key="b1-p-s411-16" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Keystone Species.</strong> These are the organisms (<em>e.g.,</em> wolves, sea stars, or elephants) that have a disproportionately large effect on their ecosystem's structure and function. Their removal often triggers a catastrophic chain reaction, leading to ecosystem collapse because other species rely heavily on them to maintain balance.</p>,

  <p key="b1-p-s411-17" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>III. Threat to Biodiversity</p>,

  <p key="b1-p-s411-18" style={{ textIndent: 28, textAlign: "justify" }}>A loss of biodiversity means losing potential new foods, medicines, and solutions to our biggest challenges. Unfortunately, human activities are putting immense pressure on the world's biodiversity. The variety of life is declining at an alarming rate due to several key factors (<em>e.g.,</em> fragmentation and destruction of habitats, pollution, hunting, climatic change etc.).</p>,

  <p key="b1-p-s411-19" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Fragmentation and Destruction of Habitats.</strong> It is one of the biggest threat to biodiversity. When forests are cleared for agriculture/habitation, or cities expand into wild areas, organisms lose their homes. This not only affects the species living there but also disrupts the services those ecosystems used to provide.</p>,
  <p key="b1-p-s411-20" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Pollution</strong> is another major threat. For instance, plastic waste and oil spills harm marine life. Similarly, chemicals that runoff from farms and factories can poison rivers and soil, making them uninhabitable for many species.</p>,
  <p key="b1-p-s411-21" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Hunting.</strong> Continuous hunting of animals for food and fun has put immense pressure on biodiversity. As a result, number of species are facing threat of extinction.</p>,
  <p key="b1-p-s411-22" style={{ textAlign: "justify", marginBottom: 6 }}><strong>• Climatic Change.</strong> It is a powerful force reshaping our planet earth. As temperature rises due to global warming and weather patterns shift, many species are not able to adapt enough to survive. Coral reefs bleaching in warmer oceans is a stark and devastating example of effect of climatic change on decline in biodiversity.</p>,

  <p key="b1-p-s411-23" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>IV. Conservation of Biodiversity</p>,

  <p key="b1-p-s411-24" style={{ textIndent: 28, textAlign: "justify" }}>Conservation is an effort to protect species and ecosystems from extinction. It includes <strong><em>in situ</em> conservation</strong> and <strong>ex-situ conservation.</strong></p>,
  <p key="b1-p-s411-25" style={{ textAlign: "justify", marginBottom: 6 }}><strong>A. <em>In-situ</em> conservation.</strong> This approach includes protection of total ecosystems through a network of <strong>protected areas</strong>. These are the natural areas where biological diversity along with natural/cultural resources are protected, maintained and managed. The common natural habitats (protected areas) for conservation of animals and plants include (<em>i</em>) <strong>national parks,</strong> (<em>ii</em>) <strong>wild life sanctuaries,</strong> (<em>iii</em>) <strong>biosphere reserves,</strong> (<em>iv</em>) <strong><em>several wetlands, mangrooves</em></strong> and <strong><em>coral reefs,</em></strong> and (<em>v</em>) <strong><em>sacred grooves and lakes.</em></strong></p>,
  <p key="b1-p-s411-26" style={{ textAlign: "justify", marginBottom: 6 }}><strong>B. <em>Ex-situ</em> conservation.</strong> Here animals, plants and their propagules are maintained in artificial conditions under human supervision away from their natural habitats. <em>Ex situ</em> conservation includes:</p>,
  <ul key="b1-ul-exsitu" style={{ paddingLeft: 32, margin: "4px 0 8px", lineHeight: 1.7, fontSize: 14 }}>
    <li>(<em>i</em>) Sacred plants and home gardens</li>
    <li>(<em>ii</em>) Seed banks, field gene banks</li>
    <li>(<em>iii</em>) Cryopreservation</li>
    <li>(<em>iv</em>) Botanical gardens, zoological parks, Arborata and Aquaria.</li>
  </ul>,
  <p key="b1-p-s411-27" style={{ textAlign: "justify" }}>In addition, laws have been passed to prevent pollution and to protect endangered species.</p>,

  <FeatureBox key="feat-sacred-grooves" title="• Sacred Grooves and Lakes">
    <p style={{ textAlign: "justify", marginBottom: 6 }}>Sacred grooves are the sacred forest patches around places of worship. These are held in high esteem by tribal communities/state or central government. These most undisturbed forest patches (<em>e.g.,</em> island of pristine forest) are often surrounded by degraded landscape. Such sacred grooves are found in several regions in India such as Khasi and Jantia hills of Meghalaya, Sarguja, Chanda and Bustar areas of earstwhile Madhya Pradesh, Western Ghat regions of Maharashtra and Karnataka, Aravalli hills of Rajasthan etc. Tribals have built temples in such patches (<em>e.g.,</em> Deodar forests in Kumaon region, Jantias and Khasias in Meghalaya). Tribals do not allow to cut even a single branch of tree in these sacred grooves. This is the reason why many endemic species are seen to flourish in these sacred grooves. Similarly, many tribes (<em>e.g.,</em> Bishnois of Rajasthan) protect Khejari tree and black buck religiously.</p>
    <p style={{ textAlign: "justify" }}>Similarly, many water bodies (<em>e.g.,</em> Khecheopalri in Sikkim, Sarovars in Haryana) are held sacred in many places. Their flora and fauna are, thus, naturally preserved.</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>Tribal communities conserve ecosystems through deep spiritual connections, traditional knowledge and sustainable practices. They do so by sacred grooves, rotational farming and selective harvesting, by viewing nature as integral to their culture and not just a resource to exploit. They ensure biodiversity conservation through methods such as seed saving, respecting totemic species (taboos against hunting certain animals <em>e.g.,</em> black buck), and cutting specific trees (<em>e.g.,</em> Peepal, Banyan, Khejari).</p>
  </FeatureBox>,

  <SecHd key="sec-s42" id="s42" label="4.2" title="Classification of Living Organisms" />,

  <SubHd key="sub-s421" id="s421" label="4.2.1" title="Basis of Classification" />,

  <p key="b1-p-s421-1" style={{ textIndent: 28, textAlign: "justify" }}>The diverse forms of living organisms that we see today are in fact the product of past 3·5 billion years (or 3500 million years) of organic evolution. In addition, during the same duration, a countless number of species appeared and many more were lost unnoticed (<em>i.e.,</em> became extinct). These findings are based on palaeontological studies which provided valuable information regarding the ancient geography, past ecology and definite lines of ancestry for many living organisms. According to a rough calculation, the number of extinct species (those which are lost and do not exist) is at least fifty times more than the present existing species. Thus, to find out an organism of known characters from such a vast number of organisms is simply impossible. Moreover, it is also practically not possible to examine and study every living organism separately at individual level. It is, therefore, advisable to study the diversity of organisms by placing them in different groups and arranging them in an orderly manner (or systematic manner). Arrangement of organisms is called classification.</p>,

  <DefBox key="def-s421-1">Classification of organisms may be defined as a system of arrangement of organisms into different groups and sub-groups on the basis of their similarities, differences and relationship.</DefBox>,

  <p key="b1-p-s421-2" style={{ textIndent: 28, textAlign: "justify" }}>Attempts at classifying living organisms have been made since time immemorial. Early attempts of classifying the organisms were made by Greek thinkers <strong>Aristotle</strong> (384-322 B.C.), <strong>Theophrastus</strong> (372-287 B.C.) and <strong>Pliny the Elder</strong> (28-79 A.D.).</p>,

  <p key="b1-p-s421-3" style={{ textIndent: 28, textAlign: "justify" }}><strong>• Artificial Classification.</strong> Earlier biologists used habitats and major habits of the organisms as the basis of classification. Aristotle classified animals according to whether they lived on land, in water or in the air.</p>,

  <DefBox key="def-s421-2">The system of classification which is based on one or few arbitrarily chosen criteria such as habitat or one or more major habits of organisms is called <span style={{ color: P_COLOR }}>artificial classification.</span></DefBox>,

  <p key="b1-p-s421-4" style={{ textIndent: 28, textAlign: "justify" }}>Such a classification, based on one or a few criteria, although was simple, but misleading. The major drawback of artificial classification was that it did not reflect natural relationships of organisms. As a result, different types of organisms were grouped together (<em>e.g.,</em> flying animals—insects, birds and bats) while related organisms such as bat (flying mammal), whale (aquatic mammal) and rat (land mammal) were separated. The fact is that if we examine the animals living in the sea they cannot be categorized under a single group. The animals living in sea are fishes, whales, sharks, octopuses, starfish, corals, etc. which are very different from each other. In fact, their habitat is the only character which is common whereas all other characters are different. So all these animals cannot be grouped together.</p>,

  <p key="b1-p-s421-5" style={{ textIndent: 28, textAlign: "justify" }}>To create a more accurate system of classification, scientists needed clear set of <strong>rules</strong> for sorting organisms. In the 20th century, the key criteria came into focus building directly on cell structure, modes of nutrition, ecological roles etc.</p>,
  <p key="b1-p-s421-6" style={{ textAlign: "justify" }}>Such characters, used in grouping and sub-grouping of organisms, are as follows:</p>,

  <p key="b1-p-s421-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1. Cells are prokaryotic or eukaryotic.</strong> Organisms may be grouped into two broad categories on the basis whether they possess prokaryotic cells or eukaryotic cells. In case of prokaryotic cells the nuclei and other organelles are not clearly demarcated. The eukaryotic cells, on the other hand, have membrane-bound organelles, including a nucleus.</p>,
  <p key="b1-p-s421-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2. Cells occur singly or in clusters.</strong> Many organisms are unicellular, <em>i.e.,</em> made up of only one cell, <em>e.g., Amoeba.</em> Others are multicellular, <em>i.e.,</em> cells group together to form single organism (<em>e.g.,</em> insect). In case of multicellular organisms the different groups of cells carry out specialised functions.</p>,
  <p key="b1-p-s421-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3. Organism is photosynthetic or takes food from outside.</strong> Green plants perform photosynthesis and synthesise their own food. Animals cannot perform photosynthesis. They get food from outside.</p>,
  <p key="b1-p-s421-10" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4. Organisation of different body parts.</strong> Grouping of organisms may be done on the basis of body organisation. For example, plants possess stem, root and leaves. Similarly, the animals possess specialised organs to perform different functions. The characteristics based on body design used for classification of plants is quite different when used for classifying animals.</p>,
  <p key="b1-p-s421-11" style={{ textAlign: "justify" }}>There are so many other characters which are used for classification of living organisms. These include presence or absence of flagella ; type of nutrition ; type of pigments present in the cells, presence or absence of cell walls, composition of cell-walls, etc.</p>,

  <p key="b1-p-s421-12" style={{ textIndent: 28, textAlign: "justify" }}><strong>• Natural Classification.</strong> This system of classification involves categorization of the living organisms into broad groups (or divisions) on the basis of large number of their characters (both similarities and dissimilarities).</p>,
  <p key="b1-p-s421-13" style={{ textIndent: 28, textAlign: "justify" }}>This process of classification, based on certain characters to divide into broad groups and then on the basis of some other characters into sub-groups and so on, should continue till the smallest unit of classification is achieved.</p>,

  <SubSubHd key="sub-s422" id="s422" label="4.2.2" title="Importance of Classification" />,

  <p key="b1-p-s422-1" style={{ textAlign: "justify" }}>Classification has the following advantages:</p>,
  <p key="b1-p-s422-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> Classification makes the study of a wide variety of organisms convenient and easy.</p>,
  <p key="b1-p-s422-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> It is not possible for man to know about all the organisms but the study of a few representatives from each taxonomic group gives a general idea of all life forms at a glance.</p>,
  <p key="b1-p-s422-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Classification also reveals the interrelationship among different groups of organisms.</p>,
  <p key="b1-p-s422-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Correct identification of an organism and its placement in a definite taxonomic group is the basic requirement of various branches of biological sciences. Thus, classification of organisms provides a base for the development of other biological sciences. For example, geographical distribution of plants and animals, <em>i.e.,</em> <strong>biogeography,</strong> is totally based on the information regarding the organisms supplied by classification. Likewise, the progress in the fields of ecology, forestry and behavioural science is also not possible without correct identification and classification of the organisms.</p>,
  <p key="b1-p-s422-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Studies concerned with the identification, nomenclature and classification are needed in various fields of applied biology (such as agriculture, horticulture, floriculture, pisciculture, pharmacognocy, public health and environmental biology). For example, exact identification and classification of an agricultural pest, a disease vector and a pathogen is needed for its proper control and cure. Taxonomic knowledge of a component of an ecosystem is required to study the food chain and energy flow.</p>,
  <p key="b1-p-s422-7" style={{ textIndent: 28, textAlign: "justify" }}>All the above mentioned applications of classification indicate the importance of this branch of science in advancing knowledge in most of the other branches of biology.</p>,

  <SubSubHd key="sub-s423" id="s423" label="4.2.3" title="Classification and Evolution" />,

  <p key="b1-p-s423-1" style={{ textIndent: 28, textAlign: "justify" }}>We have learnt that the organisms are identified and classified on the basis of their body design in form and function. The body design, however, is not a constant feature. If we keep a watch on the form and function of a particular organism for several generations, there is a possibility of a slight variation in one or the other character in some generation. There is a chance that some generation may acquire a specific character which was not present in earlier generations. This may be due to mutation or any other reason. Once a specific character appears in an organism, it will affect the form and function of the organism and lead to the diversification. This is the major theme of <strong>evolution.</strong> Thus,</p>,

  <DefBox key="def-s423-1">Changes in living organisms with time is called organic or biological evolution.</DefBox>,

  <p key="b1-p-s423-2" style={{ textIndent: 28, textAlign: "justify" }}>The theory of organic evolution states that the present-day complex organisms (<em>i.e.,</em> the life forms that we see today) have originated during the course of ages from the earlier simple forms of life by an accumulation of changes in body design that allow the organism possessing them to survive better. These changes acquired in sequential manner are in accordance with the environmental requirements.</p>,

  <p key="b1-p-s423-3" style={{ textIndent: 28, textAlign: "justify" }}><strong>• Phylogenetic Classification.</strong> The concept of organic evolution has also shown that the species are capable of changing. Some groups of organisms, having ancient body designs, have not changed very much but others have acquired their body designs relatively recently. Thus, the organisms belonging to first group are considered as <strong>'primitive'</strong> or <strong>'lower organisms'</strong>, while those belonging to second group are called <strong>'advanced'</strong> or <strong>'higher organisms'.</strong> The primitive groups are relatively simple whereas advanced groups are more complex. Thus, the evidences suggest that the existing complex organisms have evolved by modifications of the earlier simpler ones over the ages.</p>,

  <p key="b1-p-s423-4" style={{ textIndent: 28, textAlign: "justify" }}>Today, we regard that the living species, having complex form and structure, are more recent and advanced whereas older organisms, having simple form and structure, are primitive. Thus, the evolutionary history of a species (<em>i.e.,</em> <strong>phylogeny</strong>) is considered as the main criteria in <strong>phylogenetic classification</strong> of organisms.</p>,

  <DefBox key="def-s423-2">The system of classification of organisms which is based on large number of characteristics and also reflects their evolutionary relationships is called phylogenetic classification.</DefBox>,

  <SubHd key="sub-s424" id="s424" label="4.2.4" title="Kingdoms of the Living Organisms" />,

  <p key="b1-p-s424-1" style={{ textIndent: 28, textAlign: "justify" }}><strong>● Two Kingdom Classification.</strong> Carolus Linnaeus (1758), often referred to as the <strong>"Father of taxonomy"</strong>, divided the living organisms into two separate kingdoms: <strong>Plantae (Plant Kingdom)</strong> and <strong>Animalia (Animal Kingdom)</strong> because the familiar plants and animals looked clearly different. In this system, the bacteria and fungi were classified in plant kingdom because they showed close similarity with plants rather than animals.</p>,

  <p key="b1-p-s424-2" style={{ textAlign: "justify" }}><strong>Drawbacks.</strong> Two kingdom classification had following drawbacks:</p>,
  <p key="b1-p-s424-3" style={{ textIndent: 28, textAlign: "justify" }}>With the passage of time, certain unicellular organisms were identified which did not strictly fit either into Plant or Animal Kingdom. For example (<em>i</em>) <em>Euglena</em> had some characteristics of both plants and animals. (<em>ii</em>) <strong>Viruses</strong> belong to neither plant kingdom nor animal kingdom. Based on this discovery, a German Zoologist Ernst Haeckel (1894) established a third <strong>Kingdom-Protista</strong> to include all unicellular organisms. Later, taxonomic as well as morphological and physiological studies indicated significant differences among the protists which led Copeland (1956) to create the <strong>kingdom Monera</strong> for prokaryotic organisms.</p>,

  <p key="b1-p-s424-4" style={{ textIndent: 28, textAlign: "justify" }}><strong>• Five Kingdom Classification.</strong> Robert H. Whittaker (1969), an American ecologist, gave five kingdom classification. These kingdoms are:</p>,
  <ol key="b1-ol-5kingdoms" style={{ paddingLeft: 28, lineHeight: 1.8, fontSize: 14, margin: "8px 0" }}>
    <li><strong>Kingdom : Monera</strong> (Includes prokaryotic bacteria, cyanobacteria, Actinomycetes, Archaeobacteria, etc.)</li>
    <li><strong>Kingdom : Protista</strong> (Includes unicellular eukaryotic organisms such as unicellular algae, slime moulds and protozoans)</li>
    <li><strong>Kingdom : Fungi</strong> (All fungi)</li>
    <li><strong>Kingdom : Plantae</strong> (Multicellular green plants)</li>
    <li><strong>Kingdom : Animalia</strong> (Multicellular animals)</li>
  </ol>,

  <p key="b1-p-s424-5" style={{ textAlign: "justify" }}>Whittaker has based his scheme of classification on <em>four</em> factors: (1) Complexity of cell structure; (2) Body organization; (3) Mode and source of nutrition; (4) Phylogenetic relationship.</p>,
  <p key="b1-p-s424-6" style={{ textIndent: 28, textAlign: "justify" }}>Whittaker's basis of classifying organisms into 5 kingdoms is listed below:</p>,

  <Fig key="fig-5kingdoms" src={CONTENT_IMAGES.CONTENT_IMAGE_1399FFEA4A4DC19ED164} num="" caption="Whittaker's Five Kingdom Classification scheme" />,

  <Table41 key="tbl-4-1" />,
];

// ── TABLE SUB-COMPONENTS + CONTENT (batch 2) ─────────────────

const content_b2 = [
  // ── 4.3 Kingdom Monera ──────────────────────────────────────
  <SecHd key="sec-s43" id="s43" label="4.3" title="Kingdom : Monera (Gk. Monos – Single)" />,

  <p key="b2-p-s43-1" style={{ textIndent: 28, textAlign: "justify" }}>Kingdom Monera includes the most ancient, the smallest, the simplest and the most plentiful <strong>prokaryotes.</strong> These organisms are most primitive. They were the first inhabitants of the earth, and they still continue to flourish. <strong>Carl Woese</strong> (1994) has divided kingdom Monera into Archaebacteria and Eubacteria. Monerans are characterized by the following:</p>,

  <p key="b2-p-s43-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The organisms are mostly unicellular. The cyanobacteria are, however, filamentous.</p>,
  <p key="b2-p-s43-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> They do not have a definite nucleus. The genetic material is a circular, double-stranded, helical DNA (Deoxyribonucleic acid) not enclosed by a nuclear envelope. Such organisms which do not have a definite nucleus are called prokaryotic or simply prokaryotes.</p>,
  <p key="b2-p-s43-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The cytoplasm of organisms is devoid of membrane bound organelles, <em>i.e.,</em> mitochondria, plastids, Golgi apparatus, lysosomes, endoplasmic reticulum, centrosome, etc. are lacking. However, the ribosomes are present.</p>,
  <p key="b2-p-s43-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Cell wall is generally present. Some of prokaryotes do not have cell wall.</p>,
  <p key="b2-p-s43-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> The mode of nutrition of organisms in this group can be either: (<em>i</em>) <strong>Autotrophic</strong> (<em>i.e.,</em> synthesize their own food by photosynthesis). Such monerans form the base of many food chains. (<em>ii</em>) <strong>Heterotrophic</strong> (<em>i.e.,</em> get their organic food from the environment). These monerans act as decomposers. They breakdown dead organic matter and recycle nutrients back into the ecosystem. Thus, ecologically, monerans are vital.</p>,
  <p key="b2-p-s43-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Single stranded flagella are present in many monerans.</p>,

  <p key="b2-p-s43-8" style={{ textIndent: 28, textAlign: "justify" }}>Kingdom Monera includes true bacteria, actinomycetes, cyanobacteria or blue green algae, mycoplasma and archaebacteria.</p>,

  <p key="b2-p-s43-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1. True bacteria.</strong> They are basically unicellular and morphologically least complex. They rarely exceed 2 microns in diameter and 10 microns in length. The cell wall is composed of peptidoglycan. The cells vary in shape. They may be — spherical (cocci), rod-shaped (bacilli), cork-screw shaped (spirillum) or filamentous.</p>,

  <p key="b2-p-s43-10" style={{ textIndent: 28, textAlign: "justify" }}>Figure 4.1 shows the structure of a bacterial cell and figure 4.2 shows the various shapes of different kinds of bacteria.</p>,

  <Fig key="fig-4-1" src={CONTENT_IMAGES.CONTENT_IMAGE_4B929338556D1295B2CD} num="Fig. 4.1" caption="Structure of a typical bacterium" />,

  <Fig key="fig-4-2" src={CONTENT_IMAGES.CONTENT_IMAGE_02D78604AD8B9669E3F8} num="Fig. 4.2" caption="Different forms of bacteria." />,

  <KBBox key="kb-prokaryotes">
    <KBHd>PROKARYOTES/EUKARYOTES</KBHd>
    <p style={{ textAlign: "justify" }}>Prokaryotes are unicellular or filamentous organisms which do not possess organized nuclei <em>i.e.,</em> the genetic material is not enclosed within a nuclear membrane. Eukaryotes are unicellular or multicellular organisms which possess true nuclei, <em>i.e.,</em> the genetic material is enclosed within a nuclear membrane.</p>
  </KBBox>,

  <p key="b2-p-s43-11" style={{ textIndent: 28, textAlign: "justify" }}>Some bacterial cells possess long thread-like flagella (Sing. flagellum). The flagella are made up of flagellin (a protein). Some bacterial cells contain extremely minute, non-flagellar but straight hair-like appendages, called <strong>pili (Fimbriae).</strong></p>,

  <p key="b2-p-s43-12" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2. Actinomycetes.</strong> It is a group of unicellular branched, filamentous bacteria which occur most commonly in soil, fresh-water, manure, food products, etc. Examples, <em>Streptomyces, Mycobacterium, Actinomyces,</em> etc.</p>,

  <p key="b2-p-s43-13" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3. Cyanobacteria (Blue-green bacteria).</strong> Cyanobacteria are photosynthetic, prokaryotic organisms that occupy a wide range of habitats and grow almost every where. They contain chlorophyll <em>a</em> and other photosynthetic pigments and therefore, synthesize carbohydrate food in presence of light by the process called oxygenic photosynthesis. Some cyanobacteria (<em>e.g., Nostoc, Anabaena</em>) fix atmospheric nitrogen and improve the fertility of the soil (Fig. 4.3).</p>,

  <Fig key="fig-4-3" src={CONTENT_IMAGES.CONTENT_IMAGE_F24E658A88A7D1176ADB} num="Fig. 4.3" caption="Cyanobacteria." />,

  <p key="b2-p-s43-14" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4. Mycoplasma.</strong> Mycoplasma are unicellular, non-motile prokaryotes which lack a distinct cell wall. They occur in soil, sewage water and in decaying organic matter. Some Mycoplasma occur parasitically in plants and animals and in human beings. They cause diseases (<em>e.g.,</em> Pneumonia in human beings is caused by <em>Mycoplasma pneumoniae</em>).</p>,

  <p key="b2-p-s43-15" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5. Archaebacteria.</strong> Archaebacteria are unique type of prokaryotic microorganisms living in most extreme of environments. They represent the oldest form of life that has survived almost all the geological changes on earth. They are the first organisms who experimented with the absorption of solar radiation to get their energy, survived under extreme anaerobic conditions and then developed the novel method of oxidizing chemical substances with the availability of oxygen.</p>,

  // ── 4.4 Kingdom Protista ─────────────────────────────────────
  <SecHd key="sec-s44" id="s44" label="4.4" title="Kingdom : Protista (Gk. Protistos – First of All)" />,

  <p key="b2-p-s44-1" style={{ textIndent: 28, textAlign: "justify" }}>Kingdom Protista includes unicellular eukaryotic organisms. They are characterized by the following:</p>,

  <p key="b2-p-s44-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> Protists are mostly aquatic and live wherever there is water.</p>,
  <p key="b2-p-s44-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The cell structure is typically eukaryotic. The protoplasm is surrounded by a distinct plasma membrane. In addition, some protists have an outer covering of pellicle, cuticle, shell or cellulose wall.</p>,
  <p key="b2-p-s44-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The genetic material is the linear, double-stranded, helical DNA, complexed with proteins, organized into distinct chromosomes. The chromosomes are enclosed by nuclear envelope. Nucleolus is present.</p>,
  <p key="b2-p-s44-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The cytoplasm contains membrane bound organelles such as mitochondria, plastids, Golgi bodies, endoplasmic reticulum, ribosomes, etc.</p>,
  <p key="b2-p-s44-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Their mode of nutrition can be autotrophic or heterotrophic. As primary producers, phytoplankton are the foundation of aquatic food webs, feeding every organism from tiny zooplankton to giant whales. Protists are also important decomposers.</p>,
  <p key="b2-p-s44-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Motile protists move from one place to another with the help of pseudopodia, flagella or cilia.</p>,

  <p key="b2-p-s44-8" style={{ textIndent: 28, textAlign: "justify" }}>Unicellular protists have been broadly divided into three major groups: (1) The protistan algae, (2) Slime moulds, (3) Protozoan protists.</p>,

  <p key="b2-p-s44-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1. The protistan algae (Fig. 4.4):</strong> These are mainly unicellular eukaryotic algae which live in water bodies. They usually grow and cover the surface of water body and move on the mercy of water currents. They are the major producers of aquatic ecosystem. Examples of protistan algae are — Dinoflagellates, Diatoms and Euglena.</p>,

  <Fig key="fig-4-4" src={CONTENT_IMAGES.CONTENT_IMAGE_CDD796B84C152B6C6695} num="Fig. 4.4" caption="Protistan algae A. Dinoflagellate ; B. Diatom ; C. Euglena" />,

  <p key="b2-p-s44-10" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2. Slime moulds:</strong> Slime moulds include very interesting and peculiar organisms which share the characters of both animals and fungi. The vegetative parts do not possess cell walls. They either occur as free living multinucleate mass of protoplasm (the plasmodium) or aggregates of amoebae (the pseudoplasmodium). Mode of nutrition is holozoic (absorb dissolved organic substances). Examples – <em>Physarum.</em></p>,

  <p key="b2-p-s44-11" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3. Protozoa (Fig. 4.5):</strong> These are unicellular, eukaryotic organisms which mostly occur in aquatic habitats (fresh-water or marine). They vary in forms, shapes (<em>i.e.,</em> spherical, oval, bell-shaped, spindle-shaped, slipper-like or irregular) and symmetry. The cells may be uninucleate, binucleate or multinucleate. Cell walls are absent. Sometimes naked cells are covered by pellicle or hard shells. Mode of nutrition is mainly holozoic (heterotrophic). Examples: <em>Trypanosoma, Giardia, Amoeba, Entamoeba, Paramecium</em> etc.</p>,

  <Fig key="fig-4-5" src={CONTENT_IMAGES.CONTENT_IMAGE_51289436AB8E044E5062} num="Fig. 4.5" caption="Protozoans A. Amoeba proteus ; B. Trypanosoma gambiense ; C. Paramecium caudatum ; D. Entamoeba histolytica." />,

  // ── 4.5 Kingdom Fungi ────────────────────────────────────────
  <SecHd key="sec-s45" id="s45" label="4.5" title="Kingdom : Fungi" />,

  <p key="b2-p-s45-1" style={{ textIndent: 28, textAlign: "justify" }}>Fungi is a group of those organisms whose form is a thallus (<em>i.e.,</em> not differentiated into root, stem and leaves), build up of single cell or cells (unicellular or multicellular) that possess definite cell wall (containing cellulose or chitin or both) and true nucleus (eukaryotic) but lack chlorophyll and differentiation of vascular tissues. Thus, the kingdom is characterized by the following:</p>,

  <p key="b2-p-s45-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> Fungi are thalloid (Plant body is not differentiated into root, stem and leaves), unicellular or multicellular, filamentous or mycelial. Single filament is called <strong>hypha</strong> and the cluster of filaments is called <strong>mycelium.</strong></p>,
  <p key="b2-p-s45-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> Fungi possess a definite cell wall containing cellulose or chitin (chitin is a tough complex sugar) or both (<em>i.e.,</em> fungal cellulose).</p>,
  <p key="b2-p-s45-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Fungi lack chlorophyll (non-green) and are unable to synthesize their own food by the process of photosynthesis. They are, therefore, heterotrophic and obtain their food either from dead organic matter (saprophytic) or from other living organisms (parasitic).</p>,
  <p key="b2-p-s45-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The reserve food material is in the form of glycogen and oil globules.</p>,
  <p key="b2-p-s45-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Fungi have two distinct phases — the vegetative phase and the reproductive phase. The vegetative phase is concerned mainly with assimilation of food. The mycelium absorbs soluble food material from the surrounding. Thus, nutrition is mainly absorptive.</p>,
  <p key="b2-p-s45-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Reproductive phase is mainly concerned with reproduction. Asexual reproduction mainly occurs by the formation of spores. Sexual reproduction occurs by the formation of sex organs and fusion of gametes. During reproduction the fungus starts producing aerial fructifications and reproductive bodies. These bodies are sometimes coloured and are visible with naked eyes.</p>,

  <p key="b2-p-s45-8" style={{ textIndent: 28, textAlign: "justify" }}>Examples of fungi are yeast (Fig. 4.6A), mushrooms (Fig. 4.6D), <em>Rhizopus, Penicillium, Aspergillus,</em> etc. There are several kinds of mushrooms. Some are edible and others are poisonous. The common edible mushroom is gilled or button mushroom (<em>Agaricus campestris</em>).</p>,

  <p key="b2-p-s45-9" style={{ textIndent: 28, textAlign: "justify" }}>Some fungal species live in close symbiotic association with blue green algae (or cyanobacteria). They are so much associated with each other that they form an independent group called <strong>lichens.</strong> Thus, lichens are made up of fungi and algae which live in mutually dependent association. The algal partner synthesizes food material and the fungal partner provides protection to alga. Such an association when two organisms live together and benefit each other is called <strong>symbiotic association.</strong> The growth of lichens is very slow. They form coloured patches on the bark of trees, barren rocks and wet walls. They usually grow in pollution free areas.</p>,

  <Fig key="fig-4-6" src={CONTENT_IMAGES.CONTENT_IMAGE_766981F23CFA0371EBB6} num="Fig. 4.6" caption="Fungi A. Rhizopus ; B. Aspergillus ; C. Yeast ; D. Agaricus ; E. Penicillium." />,
];

// ── TABLE SUB-COMPONENTS + CONTENT (batch 3) ─────────────────

// Table 4.2 - Differences between Algae and Fungi
const Table42 = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>TABLE 4.2. Differences between Algae and Fungi</p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr><td style={th}>Algae</td><td style={th}>Fungi</td></tr>
      </thead>
      <tbody>
        <tr><td style={td}>1. These are autotrophic in nature.</td><td style={td}>1. These are heterotrophic in nature.</td></tr>
        <tr><td style={td}>2. Photosynthetic pigments are present.</td><td style={td}>2. Photosynthetic pigments are absent.</td></tr>
        <tr><td style={td}>3. Cell wall is made of cellulose.</td><td style={td}>3. Cell wall is made of chitin.</td></tr>
        <tr><td style={td}>4. Algae are mostly aquatic.</td><td style={td}>4. Fungi are mostly terrestrial.</td></tr>
        <tr><td style={td}>5. These contain starch as stored food material.</td><td style={td}>5. These contain glycogen and oil as stored food material.</td></tr>
      </tbody>
    </table>
  </div>
);

// Table 4.3 - Differences between Bryophytes and Pteridophytes
const Table43 = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>TABLE 4.3. Differences between Bryophytes and Pteridophytes</p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr><td style={th}>Bryophytes</td><td style={th}>Pteridophytes</td></tr>
      </thead>
      <tbody>
        <tr><td style={td}>1. Plant body is gametophyte (Haploid).</td><td style={td}>1. Plant body is sporophyte (Diploid).</td></tr>
        <tr><td style={td}>2. Plant body is either thallus or foliose. However, true stem, leaves and roots are absent.</td><td style={td}>2. Plant body is differentiated into true roots, stem and leaves.</td></tr>
        <tr><td style={td}>3. Plant is fixed to the substratum by rhizoids.</td><td style={td}>3. Plant is fixed to the substratum by roots.</td></tr>
        <tr><td style={td}>4. Sporophyte is parasitic over gametophytic plant body throughout life.</td><td style={td}>4. It has small, independent gametophyte.</td></tr>
        <tr><td style={td}>5. These are non-vascular plants.</td><td style={td}>5. These are vascular plants.</td></tr>
      </tbody>
    </table>
  </div>
);

// Table 4.4 - Cryptogamae vs Phanerogamae
const Table44 = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>TABLE 4.4. Differences between Cryptogamae and Phanerogamae</p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr><td style={th}>Cryptogamae</td><td style={th}>Phanerogamae</td></tr>
      </thead>
      <tbody>
        <tr><td style={td}>1. It includes seedless plants.</td><td style={td}>1. It includes plants having seeds.</td></tr>
        <tr><td style={td}>2. It has both non-vascular and vascular plants.</td><td style={td}>2. It has only vascular plants.</td></tr>
        <tr><td style={td}>3. Plant body may or may not be differentiated into true roots, stem and leaves.</td><td style={td}>3. Plant body is differentiated into true roots, stem and leaves.</td></tr>
        <tr><td style={td}>4. Water is required for fertilization.</td><td style={td}>4. Water is not required for fertilization.</td></tr>
      </tbody>
    </table>
  </div>
);

// Table 4.5 - Gymnosperms vs Angiosperms
const Table45 = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>TABLE 4.5. Differences between Gymnosperms and Angiosperms</p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr><td style={th}>Gymnosperms</td><td style={th}>Angiosperms</td></tr>
      </thead>
      <tbody>
        <tr><td style={td}>1. Vessels are absent in xylem and companion cells are absent in phloem.</td><td style={td}>1. Vessels and companion cells are present.</td></tr>
        <tr><td style={td}>2. The ovules are naked.</td><td style={td}>2. The ovules are protected within the ovaries or carpels.</td></tr>
        <tr><td style={td}>3. Fruits are not formed and seeds are naked.</td><td style={td}>3. Fruits are formed and seeds are protected.</td></tr>
      </tbody>
    </table>
  </div>
);

// Activity 4.1 table - Observations of different Plants
const Activity41Table = () => (
  <div style={{ overflowX: "auto", margin: "12px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13, margin: "0 0 6px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>Observations of different Plants</p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5 }}>
      <thead>
        <tr>
          <td style={th}>Sr. No.</td>
          <td style={th}>Plant Name</td>
          <td style={th}>Stem</td>
          <td style={th}>Leaves (Shape/mode of arrangement/Type)</td>
          <td style={th}>Flowers</td>
          <td style={th}>Other Observation</td>
        </tr>
      </thead>
      <tbody>
        <tr><td style={{...td, textAlign:"center"}}>1.</td><td style={td}>Mango</td><td style={td}>Tall and thick</td><td style={td}>Simple, leathery leaves/alternate/spiral</td><td style={td}>Inflorescence of small flowers</td><td style={td}>Bear fruits (food)</td></tr>
        <tr><td style={{...td, textAlign:"center"}}>2.</td><td style={td}>Neem</td><td style={td}>Tall, hard and thick</td><td style={td}>Pinnate compound/alternate</td><td style={td}>Small, white flowers</td><td style={td}>Used in medicine</td></tr>
        <tr><td style={{...td, textAlign:"center"}}>3.</td><td style={td}>Hibiscus</td><td style={td}>Hard, multiple branches</td><td style={td}>Dark green simple leaves/alternate</td><td style={td}>Red or pink or yellow flowers</td><td style={td}>Used for decoration</td></tr>
        <tr><td style={{...td, textAlign:"center"}}>4.</td><td style={td}>Rose</td><td style={td}>Thin, green, multiple branches</td><td style={td}>Pinnate compound/alternate</td><td style={td}>Red or pink flowers</td><td style={td}>Used for decoration</td></tr>
        <tr><td style={{...td, textAlign:"center"}}>5.</td><td style={td}>Tulsi</td><td style={td}>Thin and hard</td><td style={td}>Pair of simple leaves/opposite</td><td style={td}>Pinkish-purple flowers</td><td style={td}>Used in medicine</td></tr>
        <tr><td style={{...td, textAlign:"center"}}>6.</td><td style={td}>Common grass</td><td style={td}>Soft and thin</td><td style={td}>Single leaf grows alternately from stem</td><td style={td}>—</td><td style={td}>Grows in patches in lawns</td></tr>
      </tbody>
    </table>
  </div>
);

const content_b3 = [
  // ── 4.6 Kingdom Plantae ──────────────────────────────────────
  <SecHd key="sec-s46" id="s46" label="4.6" title="Kingdom : Plantae" />,

  <SubSubHd key="sub-s461" id="s461" label="4.6.1" title="Characters of Plantae" />,

  <p key="b3-p-s461-1" style={{ textIndent: 28, textAlign: "justify" }}>The kingdom Plantae includes all multicellular, eukaryotic, autotrophic plants which use chlorophyll for photosynthesis. Some of important characters of kingdom plantae are as follows —</p>,
  <p key="b3-p-s461-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> They are multicellular eukaryotes having chlorophyll to synthesize their own food by the process of photosynthesis.</p>,
  <p key="b3-p-s461-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> Cells have a large central vacuole and a rigid cell wall composed of cellulose.</p>,
  <p key="b3-p-s461-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Mode of nutrition is autotrophic. The reserve food material is starch and fat.</p>,
  <p key="b3-p-s461-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The plants are mostly non-mobile, being anchored to the substratum. A few forms are free-floating in fresh or sea water.</p>,
  <p key="b3-p-s461-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Growth of plants is indefinite and new organs are continuously added throughout life.</p>,
  <p key="b3-p-s461-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Plants are producers of food in the biosphere.</p>,

  <SubSubHd key="sub-s462" id="s462" label="4.6.2" title="Classification of Kingdom Plantae" />,

  <p key="b3-p-s462-1" style={{ textIndent: 28, textAlign: "justify" }}>Kingdom plantae is further classified into different divisions on the basis of— (1) Whether the plant body has well differentiated distinct components; (2) Whether the differentiated plant body has special tissues for transportation of water, minerals and food; (3) Ability of plants to bear seeds; (4) Whether the seeds are enclosed within fruits.</p>,
  <p key="b3-p-s462-2" style={{ textIndent: 28, textAlign: "justify" }}>On the above mentioned basis, the classification of kingdom Plantae is as follows. Thus, the kingdom Plantae includes the following 5 divisions: <strong>1.</strong> Thallophyta (Algae) &nbsp; <strong>2.</strong> Bryophyta &nbsp; <strong>3.</strong> Pteridophyta &nbsp; <strong>4.</strong> Gymnosperms &nbsp; <strong>5.</strong> Angiosperms.</p>,

  <Fig key="fig-plantae-classification" src={CONTENT_IMAGES.CONTENT_IMAGE_B493E0512CCC12D98707} num="" caption="Classification of Kingdom Plantae" />,

  <SubSubHd key="sub-s463" id="s463" label="4.6.3" title="Division : Thallophyta (Algae)" />,

  <p key="b3-p-s463-1" style={{ textIndent: 28, textAlign: "justify" }}>The plants in this division are commonly called <strong>algae.</strong> The term "Algae" was coined by C. Linnaeus which means 'sea weeds'. The division is characterized by the following:</p>,
  <p key="b3-p-s463-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The division comprises of most primitive and simple plants not differentiated into true roots, true stem and true leaves. Therefore, they are <strong>thalloid</strong> (thallus-like) and placed under the division-<strong>thallophyta.</strong></p>,
  <p key="b3-p-s463-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> They are predominantly aquatic, occur both in marine (sea water) as well as fresh water habitats. However, some are terrestrial and grow in moist places.</p>,
  <p key="b3-p-s463-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Algal cells possess photosynthetic green pigment chlorophyll which helps them to synthesize their own food by the process of photosynthesis. Thus, the algae are <strong>photoautotrophs.</strong></p>,
  <p key="b3-p-s463-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Some algae have additional accessory pigments of other colours (such as red, brown, yellow, etc.) and accordingly they have been classified into different groups, such as green algae, red algae, brown algae, etc.).</p>,
  <p key="b3-p-s463-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> The plants are thalloid (Fig. 4.7). The plant body may be unicellular (<em>Chlamydomonas, Chlorella</em>), colonial (<em>Volvox, Hydrodictyon</em>), filamentous unbranched (<em>Spirogyra, Ulothrix</em>), filamentous branched (<em>Chara, Cladophora</em>), heterotrichous (<em>Ectocarpus</em>) or foliaceous (<em>Laminaria, Ulva, Fucus, Sargassum</em>).</p>,

  <Fig key="fig-4-7" src={CONTENT_IMAGES.CONTENT_IMAGE_D56CE3C59980BD7B4CE8} num="Fig. 4.7" caption="Algae A. Chlamydomonas ; B. Chlorella ; C. Volvox ; D. Hydrodictyon ; E. Ulothrix ; F. Spirogyra ; G. Zygnema ; H. Coleochaete scutata ; I. Coleochaete pulvinata ; J. Ulva." />,

  <p key="b3-p-s463-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> The reproductive organs are unicellular non-jacketed gametangia. The contents of reproductive structures are completely converted into spores or gametes.</p>,
  <p key="b3-p-s463-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> After fertilization, embryo is not formed.</p>,

  <Table42 key="tbl-4-2" />,

  <SubSubHd key="sub-s464" id="s464" label="4.6.4" title="Division : Bryophyta" />,

  <p key="b3-p-s464-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The division <strong>Bryophyta</strong> (Greek word <em>Bryon</em> = moss ; <em>phyton</em> = plant) includes the simplest and most primitive non-vascular land plants having an embryo stage in their life cycle.</p>,
  <p key="b3-p-s464-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The plants are essentially terrestrial but require water at every step in the life cycle. They usually grow in moist and shady places — on the sides of ditches, ponds, pools, lakes; on the banks of streams; damp soil; wet hills and many other similar habitats. They are called <strong>amphibians of the plant kingdom.</strong></p>,
  <p key="b3-p-s464-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The main plant body is <strong>gametophyte</strong> (haploid body responsible to produce gametes). It is flat, green thallus and lacks true leaves and roots. Plants are fixed by means of hair-like <strong>rhizoids.</strong></p>,
  <p key="b3-p-s464-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The vascular tissues (xylem and phloem) are completely absent.</p>,
  <p key="b3-p-s464-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Sex organs are multicellular. The male sex organs are <strong>antheridia</strong> and female sex organs are <strong>archegonia.</strong></p>,
  <p key="b3-p-s464-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> An <strong>embryo</strong> is formed upon fertilization. Sporophyte lives as a parasite over gametophyte.</p>,
  <p key="b3-p-s464-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Examples (Fig. 4.8): Liverworts (<em>Riccia, Marchantia</em>), hornworts (<em>Anthoceros</em>) and Mosses (<em>Funaria, Polytrichum</em>).</p>,

  <SubSubHd key="sub-s465" id="s465" label="4.6.5" title="Division : Pteridophyta" />,

  <p key="b3-p-s465-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The division Pteridophyta (Gr. <em>pteris - idos</em> = fern) includes first vascular land plants.</p>,
  <p key="b3-p-s465-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The plants are sporophytes (diploid) and made up of true roots, true stem and true leaves.</p>,
  <p key="b3-p-s465-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> All the plant parts possess vascular tissues (<em>i.e.,</em> xylem and phloem) organized in definite steles.</p>,
  <p key="b3-p-s465-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Reproduction occurs by spores produced inside the sporangia. Plants may be <strong>homosporous,</strong> <em>i.e.,</em> produce only one type of spores (<em>e.g., Lycopodium, Pteridium,</em> etc.) or <strong>heterosporous,</strong> <em>i.e.,</em> produce two different types of spores — smaller microspores and larger — megaspores in separate sporangia (<em>e.g., Selaginella, Marsilea</em>).</p>,
  <p key="b3-p-s465-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Sex organs are multicellular and jacketed. The male sex organs are <strong>antheridia</strong> and female sex organs are <strong>archegonia.</strong> Flowers and seeds are not produced. A thin film of water is required for swimming of male gametes to reach to archegonia.</p>,
  <p key="b3-p-s465-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> The fertilized egg develops into embryo.</p>,
  <p key="b3-p-s465-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Examples, <em>Lycopodium, Selaginella, Equisetum, Marsilea, Azolla, Adiantum, Nephrolepis, Pteridium.</em></p>,

  <Fig key="fig-4-8" src={CONTENT_IMAGES.CONTENT_IMAGE_4B22304BCF01D99F282A} num="Fig. 4.8" caption="Bryophytes A-B Riccia ; C. Marchantia ; D. Pellia ; E. Anthoceros ; F. Funaria ; G. Polytrichum ; H. Pogonatum." />,

<div key="fig-4-9" style={{ margin: "20px auto", textAlign: "center", maxWidth: "90%" }}>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
      {[
        { src: CONTENT_IMAGES.CONTENT_IMAGE_18FE4BE0704BA148D481, alt: "Lycopodium", w: "28%" },
        { src: CONTENT_IMAGES.CONTENT_IMAGE_A261DFC7BB5AA77AECBC, alt: "Selaginella", w: "33%" },
        { src: CONTENT_IMAGES.CONTENT_IMAGE_8B3092D8A3BA53256524, alt: "Adiantum", w: "25%" },
        { src: CONTENT_IMAGES.CONTENT_IMAGE_13CE36EE788E7BA346DA, alt: "Pteridium", w: "34%" },
      ].map(({ src, alt, w }) => (
        <div key={alt} style={{ maxWidth: w }}>
          <img src={src} alt={alt}
            style={{ width: "100%", height: "auto", border: "1px solid #ddd", display: "block" }}
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
          <div style={{ display: "none", alignItems: "center", justifyContent: "center", border: "1.5px dashed #c0126a", background: "#f9eef4", minHeight: 60, padding: "8px", color: "#c0126a", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 11 }}>
            📷 {alt}
          </div>
        </div>
      ))}
    </div>
    <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic", margin: "6px auto 0", maxWidth: 520, lineHeight: 1.45 }}>
      <strong style={{ color: "#c0126a", fontStyle: "normal" }}>Fig. 4.9. </strong>
      Pteridophytes A. <em>Lycopodium</em> ; B. <em>Selaginella</em> ; C. <em>Adiantum</em> ; D. <em>Pteridium.</em>
    </p>
  </div>,

  <Table43 key="tbl-4-3" />,

  <FeatureBox key="feat-cryptogamae" title="CONCEPT OF CRYPTOGAMAE AND PHANEROGAMAE">
    <p style={{ textAlign: "justify", marginBottom: 8 }}>The plant kingdom, according to Eichler (1883), includes all those organisms which possess clearly defined cell walls. The kingdom is sub-divided into two sub-kingdoms: Cryptogamae and Phanerogamae.</p>
    <p style={{ textAlign: "justify", marginBottom: 6 }}><strong>(1) Subkingdom : CRYPTOGAMAE</strong> (Gr. <em>crypto</em> = hidden ; <em>gamous</em> = marriage): This subkingdom includes those plants which do not produce external flowers or seeds. Thus, they are considered to bear hidden reproductive organs. The common means of reproduction is by spores. The cryptogams are, therefore, also known as flowerless plants, seedless plants or lower plants. The subkingdom Cryptogamae is further divided into three divisions: (<em>i</em>) Thallophyta, (<em>ii</em>) Bryophyta, and (<em>iii</em>) Pteridophyta.</p>
    <p style={{ textAlign: "justify", marginBottom: 6 }}><strong>(2) Subkingdom : PHANEROGAMAE:</strong> Subkingdom Phanerogamae includes those plants which produce external flowers and seeds. The plant body is sporophytic (diploid) and differentiated into true stem, leaves and roots. Vascular tissues (xylem and phloem) are present which form a vascular system. Sex organs are well developed and multicellular. After fertilization, an embryo develops from fertilized egg. On the basis of naked or protected (covered) ovules and absence or presence of fruits, the subkingdom phanerogamae is further divided into two sub-divisions: Gymnospermae and Angiospermae (Both sub-divisions belong to division spermatophyta).</p>
    <Fig key="fig-phanerogamae" src={CONTENT_IMAGES.CONTENT_IMAGE_6A889803A1C6FF1B7C53} num="" caption="Sub-division structure: Gymnospermae and Angiospermae" />
  </FeatureBox>,

  <Table44 key="tbl-4-4" />,

  <SubSubHd key="sub-s466" id="s466" label="4.6.6" title="Gymnosperms (Gr. Gymno = naked ; Sperma = Seed)" />,

  <p key="b3-p-s466-1" style={{ textIndent: 28, textAlign: "justify" }}>Gymnosperms is the sub-division of spermatophyta (seed plants) in which the seeds are naked and the sporophylls are aggregated to form cones.</p>,
  <p key="b3-p-s466-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The group gymnosperms includes those vascular plants which are usually perennial, evergreen and woody.</p>,
  <p key="b3-p-s466-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> Sporophylls are aggregated to form cones. There are separate male and female cones. The male spores are called microspores or pollen grains. They are produced inside the microsporangia.</p>,
  <p key="b3-p-s466-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The female egg is formed inside the ovule. In gymnosperms, the ovules are not enclosed within the ovaries so that they are naked. Pollination occurs by wind. After fertilization, the ovules become seeds. Thus, the seeds are naked and not enclosed inside the fruits.</p>,
  <p key="b3-p-s466-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> True vessels are absent in the xylem of gymnospermous plants. Phloem is devoid of companion cells. Sieve cells are present.</p>,
  <p key="b3-p-s466-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Examples (Fig. 4.10): <em>Cycas, Pinus, Ephedra, Thuja, Araucaria,</em> etc.</p>,

  <SubSubHd key="sub-s467" id="s467" label="4.6.7" title="Angiosperms (Gr. angeion = case ; sperma = seed)" />,

  <p key="b3-p-s467-1" style={{ textIndent: 28, textAlign: "justify" }}>The group Angiosperms is the sub-division of spermatophyta (seed plants) which includes flowering plants in which the seeds are enclosed in fruits.</p>,
  <p key="b3-p-s467-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> It includes those vascular plants which produce flowers. The flowers bear stamens and carpels. The plants are also called flowering plants.</p>,
  <p key="b3-p-s467-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The stamens are male reproductive organs which produce pollen grains. The carpels are female reproductive organs which bear ovules. After fertilization, the ovules develop into seeds and ovary develop into fruit. Thus, the seeds are protected and enclosed within the fruits.</p>,
  <p key="b3-p-s467-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The seeds enclose embryo, the miniature of plant body. The embryo has plumule (future shoot), radicle (future root) and cotyledons (seed leaves). The cotyledons represent embryonic leaves which expand and become green when the seed germinates. On the basis of the number of cotyledons in the embryo, the angiosperms are distinguished into two groups: dicotyledons and monocotyledons.</p>,

  <p key="b3-p-s467-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1. Dicotyledons:</strong> The group Dicotyledons includes those flowering plants in which the embryos possess two cotyledons (embryonic leaves). The plants bear a prominent tap root system. Leaves usually show reticulate venation. Vascular bundles are arranged in a ring. Examples (Fig. 4.11): Pea (<em>Pisum sativum</em>), Gram (<em>Cicer aeritinum</em>), Mustard (<em>Brassica campestris</em>), etc.</p>,

  <Table45 key="tbl-4-5" />,

  <Fig key="fig-4-10" src={CONTENT_IMAGES.CONTENT_IMAGE_725FD03452E8576535E3} num="Fig. 4.10" caption="Gymnosperms A. Cycas ; B. Ginkgo ; C. Pinus." />,

  <p key="b3-p-s467-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2. Monocotyledons:</strong> The group Monocotyledons includes those flowering plants in which the embryo possess single cotyledon. The plants bear fibrous root system. Leaves usually show parallel venation and vascular bundles are scattered. Examples (Fig. 4.11): Wheat (<em>Triticum vulgare</em>), Rice (<em>Oryza sativa</em>), Maize (<em>Zea mays</em>), etc.</p>,

  <p key="b3-p-s467-7" style={{ textAlign: "justify" }}>The main differences between Dicotyledons and monocotyledons are given in tabular form in Fig. 4.11.</p>,

  <Fig key="fig-4-11" src={CONTENT_IMAGES.CONTENT_IMAGE_1CABA27C3D55B754739B} num="Fig. 4.11" caption="Differences between dicots and monocots" />,

  // ── Activity 4.1 ─────────────────────────────────────────────
  <ActivityBox key="act-4-1" num="4.1" sub="To demonstrate plant diversity.">
    <ActHd>Requirements.</ActHd>
    <p style={{ textAlign: "justify" }}>Old magazines, newspapers, educational/wall charts and picture books, scissor, fevi-stick, charts etc.</p>
    <ActHd>Procedure.</ActHd>
    <p style={{ textAlign: "justify" }}>Ask students of your class to collect pictures of various plants from educational/wall charts, picture books, old magazines, newspapers and other sources. Ask them to cut the pictures of plants and paste them on separate charts based on their peculiar characteristics. Now, divide the students in groups of 5 each and examine their charts.</p>
    <ActHd>Observations.</ActHd>
    <p style={{ textAlign: "justify" }}>You will be surprised to find that different students have chosen different common features for the grouping of plants. For example:</p>
    <P2>(<em>i</em>) Plants having different types of stem (Soft/Hard, Tall/Short).</P2>
    <P2>(<em>ii</em>) Leaves of plants vary in shape, incision, mode of arrangement on stem.</P2>
    <P2>(<em>iii</em>) Variations in colour, shape and scent of flowers etc.</P2>
    <Activity41Table />
    <ActHd>Conclusion.</ActHd>
    <P2>• Trees have tall, thick and hard stems (<em>e.g.,</em> mango, neem).</P2>
    <P2>• Shrubs have multiple branches close to ground (<em>e.g.,</em> Rose, Hibiscus).</P2>
    <P2>• Herbs have soft, small, green stems (<em>e.g.,</em> common grass).</P2>
  </ActivityBox>,
];

// ── TABLE SUB-COMPONENTS + CONTENT (batch 4) ─────────────────

const content_b4 = [
  // ── 4.7 Kingdom Animalia ─────────────────────────────────────
  <SecHd key="sec-s47" id="s47" label="4.7" title="Kingdom : Animalia" />,

  <SubHd key="sub-s471" id="s471" label="4.7.1" title="Characters of the Kingdom : Animalia" />,

  <p key="b4-p-s471-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> These organisms are multicellular, eukaryotic and without chlorophyll.</p>,
  <p key="b4-p-s471-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The cells possess no cell walls and plastids.</p>,
  <p key="b4-p-s471-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Central vacuoles are absent but small vacuoles may occur.</p>,
  <p key="b4-p-s471-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Most of them are free moving (except sponges and some coelenterates).</p>,
  <p key="b4-p-s471-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Nutrition is primarily ingestive.</p>,
  <p key="b4-p-s471-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Reproduction is generally sexual and the haploid stage is represented only by gametes.</p>,
  <p key="b4-p-s471-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Growth of organisms stops when the adult stage is reached.</p>,

  <p key="b4-p-s471-8" style={{ textIndent: 28, textAlign: "justify" }}>The animal kingdom is classified into several phyla (sing. Phylum) mainly on the basis of certain criteria such as structural organisation of animal body, body symmetry, presence or absence of notochord, presence or absence of body cavity or coelom, the number of germ layers present in the embryo, mode of origin of mouth and so on.</p>,

  <p key="b4-p-s471-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1. The structural organization of animal body:</strong> There are three distinct levels — (a) Cellular levels; (b) Tissue level; and (c) Organ system level.</p>,
  <p key="b4-p-s471-10" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2. Body Symmetry:</strong> Animals having their parts arranged in such a manner that their body can be divided into two similar halves by one or more planes, are called symmetrical. Those which cannot be divided into equal parts by any plane are called asymmetrical.</p>,
  <p key="b4-p-s471-11" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3. Presence or absence of notochord.</strong> Some animals possess a skeletal rod, called notochord, at some stage of their life. All those animals which possess notochord are grouped under the phylum chordata (vertebrates) and those which lack notochord are grouped together as non-chordates (invertebrates).</p>,
  <p key="b4-p-s471-12" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4. Presence or absence of body cavity.</strong> Depending on the presence or absence of body cavity or coelom, the animals are grouped into three categories — (<em>i</em>) Animals having no cavity in the body except in digestive tract are called <strong>acoelomate;</strong> (<em>ii</em>) Those having body cavity that does not arise from the mesoderm are called <strong>pseudocoelomate;</strong> and (<em>iii</em>) The animals having true body cavity are called <strong>coelomate.</strong></p>,
  <p key="b4-p-s471-13" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5. Germ Layers.</strong> In Eumetazoa of subkingdom Metazoa includes some animals which have two germ layers in the early embryo. Such animals are called <strong>diploblastic.</strong> The outer layer is called ectoderm and the inner layer is called endoderm, e.g., coelenterata. All other Eumetazoa have three germ layers: ectoderm, mesoderm and endoderm. Such animals are called <strong>triploblastic.</strong></p>,
  <p key="b4-p-s471-14" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6. Mode of origin of mouth.</strong> Animals belong to two categories — (<em>i</em>) Mouth arising from or near the blastopore of gastrula (<em>i.e.,</em> Protostomia); and (<em>ii</em>) Mouth arising anteriorly and anus develops from the blastopore (<em>i.e.,</em> Deuterostomia).</p>,

  <SubHd key="sub-s472" id="s472" label="4.7.2" title="Classification of Animalia" />,

  <p key="b4-p-s472-1" style={{ textAlign: "justify" }}>An outline classification of kingdom Animalia: <strong>Phylum 1.</strong> Porifera &nbsp; <strong>Phylum 2.</strong> Coelenterata or Cnidaria &nbsp; <strong>Phylum 3.</strong> Platyhelminthes &nbsp; <strong>Phylum 4.</strong> Nematoda or Aschelminthes &nbsp; <strong>Phylum 5.</strong> Annelida &nbsp; <strong>Phylum 6.</strong> Arthropoda &nbsp; <strong>Phylum 7.</strong> Mollusca &nbsp; <strong>Phylum 8.</strong> Echinodermata &nbsp; <strong>Phylum 9.</strong> Chordata.</p>,

  <SubHd key="sub-s473" id="s473" label="4.7.3" title="Phylum : PORIFERA (Gr., porus = pore ; ferre = to bear ; sponges)" />,

  <p key="b4-p-s473-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The porifera includes plant-like creatures commonly called the sponges. They are mostly marine but one group lives in fresh water.</p>,
  <p key="b4-p-s473-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> Some sponges are vase-like or cylindrical and have radial symmetry. Others form flat, globular or irregular, branching masses. They are asymmetrical.</p>,

  <Fig key="fig-4-12-sponge-body" src={CONTENT_IMAGES.CONTENT_IMAGE_256F8D0405520D18F4AB} num="" caption="Body structure of Porifera" />,

  <p key="b4-p-s473-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> They are mostly sessile (stalk-less) and attached to the substratum.</p>,
  <p key="b4-p-s473-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Sponges are simplest multicellular animals. There are no tissues, organs and organ-systems. Thus, they have cellular level of organization. The cells are loosely held together and perform life functions more or less independently.</p>,
  <p key="b4-p-s473-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Body is perforated by numerous pores (Ostia), with a single large opening called osculum on the top. The ostia open into a canal system consisting of intercommunicating canals and chambers.</p>,
  <p key="b4-p-s473-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> The current of water enters through dermal ostia and after passing through various canals enters the spongocoel and finally leaves through osculum. The water brings food and oxygen. The sponges lack mouth, digestive cavity and anus.</p>,
  <p key="b4-p-s473-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Sponges are covered with a hard outside layer or skeleton called spicules.</p>,
  <p key="b4-p-s473-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>8.</strong> Reproduction is asexual as well as sexual. Asexual reproduction occurs by budding or by special cell masses, termed gemmules. Sexual reproduction involves the formation of ova and spermatozoa. The sperms leave one sponge and enter another with water current to fertilize the egg in situ (internal fertilization).</p>,
  <p key="b4-p-s473-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>9.</strong> Examples: <em>Euplectelia</em> (Fig. 4.12A), <em>Sycon</em> (Fig. 4.12B) and <em>Euspongia</em> (Fig. 4.12C).</p>,

  <Fig key="fig-4-12" src={CONTENT_IMAGES.CONTENT_IMAGE_71530E55E7693CAF4C7F} num="Fig. 4.12" caption="Porifera A. Euplectella ; B. Sycon ; C. Euspongia" />,

  <SubHd key="sub-s474" id="s474" label="4.7.4" title="Phylum COELENTERATA OR CNIDARIA (Gr., Koilos = hollow ; enteron = gut)" />,

  <p key="b4-p-s474-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> Phylum Coelenterata (or Cnidaria) includes Hydra, Jelly fish, Sea-anemones and corals. They may be solitary or colonial. They are all aquatic (both fresh water and marine). Hydra occurs in fresh water.</p>,
  <p key="b4-p-s474-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The body of animals is made of two layers of cells. The animals are multicellular with tissue level of organization. However, they lack organs and organ-systems.</p>,
  <p key="b4-p-s474-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Symmetry is usually radial (the anthozoans have biradial symmetry).</p>,
  <p key="b4-p-s474-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The body encloses a single cavity. It has a single aperture, the mouth. There is no anus. The mouth serves both for taking food and for throwing out faeces. The mouth often bears slender, flexible processes, the tentacles.</p>,
  <p key="b4-p-s474-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> The body wall of cnidarians is supplied with special stinging cells, called <strong>cnidoblasts,</strong> for offence and defence purposes. These cells, when discharged, give out from a cnidocyst a long thread-tube that may coil round the prey, or attach to it, or inject a toxin, called <strong>hypnotoxin,</strong> into it to paralyse it.</p>,
  <p key="b4-p-s474-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Reproduction is usually asexual (budding) in the polyp form and sexual in the medusa form. Fertilization may be external or internal. Gonads are simple without gonoducts.</p>,
  <p key="b4-p-s474-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> The soft body may be supported by horny or calcareous (made of lime) skeleton. Hard skeleton occurs in corals.</p>,
  <p key="b4-p-s474-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>8.</strong> Examples (Fig. 4.13): <em>Hydra</em> (fresh water polyp), <em>Obelia</em> (the sea fur), <em>Adamsia</em> (the sea anemone), <em>Aurelia</em> (the jelly fish).</p>,

  <Fig key="fig-4-13" src={CONTENT_IMAGES.CONTENT_IMAGE_D4FA3A25E95D287A3536} num="Fig. 4.13" caption="Coelenterata A. Hydra ; B. Adamsia (sea-anemone)" />,

  <SubHd key="sub-s475" id="s475" label="4.7.5" title="Phylum : PLATYHELMINTHES (Gr., platys = flat ; helmins = worm ; Flat worms)" />,

  <p key="b4-p-s475-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The phylum Platyhelminthes is most primitive. It includes bilaterally symmetrical flat worms.</p>,
  <p key="b4-p-s475-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The animal body is soft and leaf-like or ribbon-like dorsiventrally flattened without segmentation.</p>,
  <p key="b4-p-s475-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> Most of the animals belonging to Platyhelminthes are parasites. A few of them are, however, free-living. The parasitic forms attach to the host by suckers and hooks.</p>,
  <p key="b4-p-s475-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> They are the first animals where third primary germ layer, the <strong>mesoderm,</strong> has appeared between the ectoderm and the endoderm. This makes the flatworms triploblastic animals. This allows some degree of tissue differentiation leading to organ formation.</p>,
  <p key="b4-p-s475-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> There is no body cavity or coelom. The digestive tract, if present, is still incomplete. The indigestible remains of food are passed out through the mouth.</p>,
  <p key="b4-p-s475-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> The excretory system includes characteristic <strong>flame-cells</strong> (protonephridia) leading into tubules that open out by one or more excretory pores.</p>,
  <p key="b4-p-s475-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> These animals are mostly hermaphrodite (bisexual), <em>i.e.,</em> both male and female sex organs are present in the same animal.</p>,
  <p key="b4-p-s475-8" style={{ textAlign: "justify" }}><strong>8.</strong> Examples: Class I. Turbellaria – <em>Dugesia</em> (Planaria) (Fig. 4.14 A). Class II. Trematoda – <em>Fasciola</em> (Liver fluke) (Fig. 4.14 B), <em>Schistosoma</em> (Blood fluke). Class III. Cestoda – <em>Taenia solium</em> (Tape worm) (Fig. 4.14 C).</p>,

  <SubHd key="sub-s476" id="s476" label="4.7.6" title="Phylum : NEMATODA or ASCHELMINTHES (Gr., ascus = a bladder ; helmins = worm ; Round worm)" />,

  <p key="b4-p-s476-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The animal body is cylindrical or flattened, bilaterally symmetrical, triploblastic and unsegmented.</p>,
  <p key="b4-p-s476-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> Size of body varies from microscopic to several centimeters in length.</p>,
  <p key="b4-p-s476-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The body wall is covered with a tough and resistant cuticle. Cilia are absent.</p>,
  <p key="b4-p-s476-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The cavity present between the body wall and the digestive tract is not a true coelom. It is called the <strong>pseudocoelom.</strong></p>,
  <p key="b4-p-s476-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> There is a straight, one way alimentary canal with mouth as well as anus. Such a digestive tract is said to be complete.</p>,
  <p key="b4-p-s476-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Sexes are generally separate.</p>,

  <Fig key="fig-4-14" src={CONTENT_IMAGES.CONTENT_IMAGE_37A32EBAB37179A37AA2} num="Fig. 4.14" caption="Platyhelminthes A. Planaria ; B. Fasciola (Liver fluke) ; C. Tape worm" />,

  <p key="b4-p-s476-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Animals included in this phylum are generally parasitic and cause diseases. A few are, however, free living in soil or water.</p>,
  <p key="b4-p-s476-8" style={{ textAlign: "justify" }}><strong>8.</strong> Examples: <em>Ascaris</em> (the giant intestinal round worm) (Fig. 4.15 A-B), <em>Enterobium</em> (the pinworm), <em>Ancylostoma</em> (the hookworm), <em>Wuchereria</em> (the filarial worm) (Fig. 4.15 C-D).</p>,

  <Fig key="fig-4-15" src={CONTENT_IMAGES.CONTENT_IMAGE_87A863E0043F01F574A5} num="Fig. 4.15" caption="Nematodes A. Male Ascaris ; B. Female Ascaris ; C-D. Wuchereria (The filarial worm)" />,

  <SubHd key="sub-s477" id="s477" label="4.7.7" title="Phylum : ANNELIDA (L., annelus = a ring ; segmented worms)" />,

  <p key="b4-p-s477-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The phylum Annelida includes the segmented worms such as earthworms, leeches, Nereis, etc. which occur in moist soil, fresh water and sea.</p>,
  <p key="b4-p-s477-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> Animal body is soft, elongated, bilaterally symmetrical, verimform and cylindrical or dorsiventrally flattened.</p>,
  <p key="b4-p-s477-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The body is divided into segments or metameres by ring-like grooves, the annuli.</p>,
  <p key="b4-p-s477-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Some of the anterior body segments concentrate to form head.</p>,
  <p key="b4-p-s477-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Body bears lateral locomotory appendages in the form of segmentally arranged paired parapodia, chitinous setae or chaete.</p>,
  <p key="b4-p-s477-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> The body cavity is a true coelom (first animals with true body cavity). It is divided by transverse septa into compartments.</p>,
  <p key="b4-p-s477-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> The alimentary canal is complete, straight and extends through the entire body from mouth to anus.</p>,
  <p key="b4-p-s477-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>8.</strong> The excretory system consists of coiled tubules, the metanephridia which remove wastes from coelom and blood stream directly to the exterior in the form of urea and ammonia.</p>,
  <p key="b4-p-s477-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>9.</strong> A closed circulatory system has appeared.</p>,
  <p key="b4-p-s477-10" style={{ textAlign: "justify", marginBottom: 6 }}><strong>10.</strong> The nervous system includes a circumenteric nerve ring and a solid, double, mid-ventral, nerve cord with ganglia.</p>,
  <p key="b4-p-s477-11" style={{ textAlign: "justify", marginBottom: 6 }}><strong>11.</strong> The reproduction occurs by sexual means. The sexes may be separate (unisexual) or united (hermaphrodite).</p>,
  <p key="b4-p-s477-12" style={{ textAlign: "justify" }}><strong>12.</strong> Examples (Fig. 4.16): <em>Nereis</em> (the sandworm), <em>Aphrodite</em> (the sea mouse), <em>Pheretima</em> (earth worm), <em>Tubiflex</em> (blood worm), <em>Hirudinaria</em> (the cattle leech), etc.</p>,

  <Fig key="fig-4-16" src={CONTENT_IMAGES.CONTENT_IMAGE_D6CAB27EF6C5F43BB236} num="Fig. 4.16" caption="Annelida A. Nereis ; B. Pheretima (Earthworm) ; C. Hirudinaria (Leech)" />,

  <SubHd key="sub-s478" id="s478" label="4.7.8" title="Phylum : ARTHROPODA (Gr., arthros = jointed ; podos = foot ; Animals with jointed feet)" />,

  <p key="b4-p-s478-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> Phylum Arthropoda is a largest phylum (includes about 900,000 species), which includes prawns, crabs, insects, spiders, shrimps, scorpions, ticks, mites, centipedes and millipedes.</p>,
  <p key="b4-p-s478-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> They occur on land, in the soil, in fresh water, in sea water and as parasites on and in the bodies of animals as well as plants.</p>,
  <p key="b4-p-s478-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The body is segmented externally, but not separated internally by septa. The segments are grouped into two regions — cephalothorax (head and thorax together) and abdomen, or three regions — head, thorax and abdomen.</p>,
  <p key="b4-p-s478-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> Anterior part of the body forms a distinct head. It consists of many fused segments. It bears well developed sense organs and brain.</p>,
  <p key="b4-p-s478-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> Some or all the body segments bear jointed appendages (legs).</p>,
  <p key="b4-p-s478-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Exoskeleton is made of a thick chitinous cuticle. The hard cuticle restricts growth and is periodically changed during growth. The process is called <strong>moulting</strong> or <strong>ecdysis.</strong></p>,
  <p key="b4-p-s478-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> The body cavity is reduced and contains blood and is called the haemocoel.</p>,
  <p key="b4-p-s478-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>8.</strong> The alimentary canal is complete. Mouth is provided with movable appendages. Anus lies at the opposite end of the body.</p>,
  <p key="b4-p-s478-9" style={{ textAlign: "justify", marginBottom: 6 }}><strong>9.</strong> Respiration generally takes place by special structures such as gills, tracheae, book-lungs, book gills, etc.</p>,
  <p key="b4-p-s478-10" style={{ textAlign: "justify", marginBottom: 6 }}><strong>10.</strong> Sexes are separate.</p>,
  <p key="b4-p-s478-11" style={{ textAlign: "justify" }}><strong>11.</strong> Some familiar examples (Fig. 4.17 and 4.18): <em>Palaemon</em> (Prawn), <em>Palinurus</em> (the lobster), <em>Scolopendra</em> (centipede), <em>Palamnaeus</em> (scorpion), House fly, Butterfly, Spider, Crabs, Cockroach, Dragon fly, Stick insect, etc.</p>,

  <Fig key="fig-4-17" src={CONTENT_IMAGES.CONTENT_IMAGE_06A476AC355569A101C9} num="Fig. 4.17" caption="Arthropoda A. Palaemon (Prawn); B. Palamnaeus (scorpion); C. Musca (House fly), D. Butterfly; E. Aranea (spider)" />,

  <Fig key="fig-4-18" src={CONTENT_IMAGES.CONTENT_IMAGE_2E79DF3F77135FB628F9} num="Fig. 4.18" caption="Arthropoda A. Periplaneta (Cockroach); B. Dragon fly; C. Carausius (Stick insect)" />,

  <SubHd key="sub-s479" id="s479" label="4.7.9" title="Phylum : MOLLUSCA (L., molluscus = soft)" />,

  <p key="b4-p-s479-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> Phylum Mollusca includes aquatic forms like mussels, oysters, snails, slugs, squids, conches, cuttle fishes, octopus, etc. The animals vary in size from microscopic to giant forms like Octopus of size up to 50 feet.</p>,
  <p key="b4-p-s479-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The animal body is soft and unsegmented without external appendages.</p>,
  <p key="b4-p-s479-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> The body is usually differentiated into three regions — anterior head with sense organs, dorsal visceral mass containing organ-systems and ventral foot for locomotion.</p>,
  <p key="b4-p-s479-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> A thin, fleshy fold (or outgrowth of dorsal body wall) covers the body. This fold is called the <strong>mantle.</strong> It encloses a cavity, called mantle cavity. The anal, excretory and genital apertures are situated in this cavity.</p>,
  <p key="b4-p-s479-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> In most cases, a calcareous shell is secreted from the mantle which covers the body.</p>,
  <p key="b4-p-s479-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> Alimentary canal is complete.</p>,
  <p key="b4-p-s479-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Respiration usually takes place by gills, called the ctenidia.</p>,
  <p key="b4-p-s479-8" style={{ textAlign: "justify", marginBottom: 6 }}><strong>8.</strong> Sexes are usually separate.</p>,
  <p key="b4-p-s479-9" style={{ textAlign: "justify" }}>Examples: <em>Chiton</em> (Fig. 4.19 C), <em>Pila</em> (the apple snail) (Fig. 4.19 A), <em>Limax, Turbinella</em> (the Shankh), <em>Unio</em> (fresh water mussel) (Fig. 4.19 B), <em>Logio, Sepia, Octopus</em> (Fig. 4.19 D), etc.</p>,

  <Fig key="fig-4-19" src={CONTENT_IMAGES.CONTENT_IMAGE_1CB9F5A2CF9FE6D1EDC9} num="Fig. 4.19" caption="Mollusca A. Pila ; B. Unio ; C. Chiton ; D. Octopus" />,

  <SubHd key="sub-s4710" id="s4710" label="4.7.10" title="Phylum : ECHINODERMATA (Gr., echinos = spiny ; derma = skin ; spiny skinned animals)" />,

  <p key="b4-p-s4710-1" style={{ textAlign: "justify", marginBottom: 6 }}><strong>1.</strong> The phylum Echinodermata includes marine, gregarious (live at the bottom in groups), slow moving and free living animals commonly called star fishes, brittle stars, sea dollars, sea urchins, sea cucumbers and sea lilies.</p>,
  <p key="b4-p-s4710-2" style={{ textAlign: "justify", marginBottom: 6 }}><strong>2.</strong> The shape of animals may be star-like, cylindrical, melon-like, disc-like or flower-like.</p>,
  <p key="b4-p-s4710-3" style={{ textAlign: "justify", marginBottom: 6 }}><strong>3.</strong> They are unsegmented animals having radial (usually pentamerous) symmetry in the adults and bilateral in the larvae.</p>,
  <p key="b4-p-s4710-4" style={{ textAlign: "justify", marginBottom: 6 }}><strong>4.</strong> The body surface is covered all over by mesodermal endoskeleton of calcareous spines.</p>,
  <p key="b4-p-s4710-5" style={{ textAlign: "justify", marginBottom: 6 }}><strong>5.</strong> All echinoderms lack head.</p>,
  <p key="b4-p-s4710-6" style={{ textAlign: "justify", marginBottom: 6 }}><strong>6.</strong> A true coelom is present. Peculiar tube feet (podia) are developed for locomotion. A part of the larval coelom is modified into a unique water-filled <strong>water-vascular system</strong> with tube feet extended out to help in locomotion.</p>,
  <p key="b4-p-s4710-7" style={{ textAlign: "justify", marginBottom: 6 }}><strong>7.</strong> Sexes are separate.</p>,
  <p key="b4-p-s4710-8" style={{ textAlign: "justify" }}>Examples: <em>Asterias</em> (Star fish) (Fig. 4.20 B), <em>Ophiothrix</em> (brittle star), <em>Astropecten</em> (basket star), <em>Echinus</em> (sea urchin) (Fig. 4.20 D), <em>Echinarachinus</em> (sand dollar), <em>Holothuria</em> (sea cucumber) (Fig. 4.20 C), <em>Antedon</em> (feather star) (Fig. 4.20 A).</p>,

  <Fig key="b5-fig420"
    src={CONTENT_IMAGES.CONTENT_IMAGE_1CDC72D7A89A2CF2BD6D}
    num="Fig. 4.20"
    caption="Echinodermata A. Antedon (the feather star); B. Asterias (star fish); C. Cucumaria (Sea cucumber); D. Echinus (sea urchin)"
  />,
];

// ── TOC ──────────────────────────────────────────────────────
const Table46 = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 4.6. Comparative Account of the Special Features of Fishes, Amphibians, Reptiles, Birds and Mammals
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Class</td>
          <td style={th}>Fertilization</td>
          <td style={th}>Lay eggs / give birth of young ones</td>
          <td style={th}>Organs for Breathing</td>
          <td style={th}>Cold blooded / Warm blooded</td>
          <td style={th}>Heart</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{...td, fontWeight:700}}>Fishes</td>
          <td style={td}>External</td>
          <td style={td}>Eggs</td>
          <td style={td}>Gills</td>
          <td style={td}>Cold blooded</td>
          <td style={td}>Two-chambered</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>Amphibians</td>
          <td style={td}>External</td>
          <td style={td}>Eggs</td>
          <td style={td}>Moist skin, Gills and lungs</td>
          <td style={td}>Cold blooded</td>
          <td style={td}>Three chambered</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>Reptiles</td>
          <td style={td}>Internal</td>
          <td style={td}>Eggs</td>
          <td style={td}>Lungs</td>
          <td style={td}>Cold blooded</td>
          <td style={td}>Three chambered</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>Birds</td>
          <td style={td}>Internal</td>
          <td style={td}>Eggs</td>
          <td style={td}>Lungs</td>
          <td style={td}>Warm blooded</td>
          <td style={td}>Four chambered</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>Mammals</td>
          <td style={td}>Internal</td>
          <td style={td}>Young ones (Viviparous)</td>
          <td style={td}>Lungs</td>
          <td style={td}>Warm blooded</td>
          <td style={td}>Four chambered</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TableAct42Vert = () => (
  <div style={{ overflowX: "auto", margin: "12px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      Vertebrates (Animals with a backbone)
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Class</td>
          <td style={th}>Peculiar Characteristics</td>
          <td style={th}>Examples</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{...td, fontWeight:700}}>1. Pisces (Fishes)</td>
          <td style={td}>
            1. Cold-blood aquatic animals. Skin covered with scales.<br/>
            2. Presence of fins and tail for swimming in water.<br/>
            3. They breathe through gills.
          </td>
          <td style={td}>Shark, Seahorse, Sting ray, Flying fish.</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>2. Amphibia (Amphibians)</td>
          <td style={td}>
            1. Cold-blooded animals that live in damp places and reproduce in water.<br/>
            2. Skin is moist, rich in mucous and poison glands.<br/>
            3. Body has 2 pairs of pentadactyl limbs.<br/>
            4. Respiration by gills, lungs, skin and lining of buccopharyngeal cavity.
          </td>
          <td style={td}>Frog, Toad, Salamander.</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>3. Reptilia (Reptiles)</td>
          <td style={td}>
            1. Mostly terrestrial, cold-blooded animals.<br/>
            2. Have epidermal scales on the body.<br/>
            3. Lay hard eggs.<br/>
            4. Body has 2 pairs of pentadactyl limbs.
          </td>
          <td style={td}>Lizard, Cobra, Python snake, Crocodile, gharial.</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>4. Aves (Birds)</td>
          <td style={td}>
            1. Warm blooded animals having feathers.<br/>
            2. Beak present for feeding.<br/>
            3. Most of them fly.<br/>
            4. They have hollow bones.<br/>
            5. Lay shelled eggs.
          </td>
          <td style={td}>Crow, Peacock, Sparrow, Myna, Parakeet, Pigeon, Kingfisher.</td>
        </tr>
        <tr>
          <td style={{...td, fontWeight:700}}>5. Mammalia (Mammals)</td>
          <td style={td}>
            1. Warm blooded animals, having hair or fur on the body.<br/>
            2. Possess mammary glands to feed the young ones.<br/>
            3. They give birth to young ones.
          </td>
          <td style={td}>Human being, Monkey, Gorilla, Rat, Rabbit, Cow, Buffalo, Goat, Sheep, Whale.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TableAct42Invert = () => (
  <div style={{ overflowX: "auto", margin: "12px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      Invertebrates (Animals without a backbone)
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Phylum</td>
          <td style={th}>Peculiar Characteristics</td>
          <td style={th}>Examples</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={4}>1. Porifera (Sponges)</td>
          <td style={td}>1. Mostly sessile, marine animals (Exception: one group).</td>
          <td style={td} rowSpan={4}>Bath sponge, <em>Sycon</em>, <em>Euplectella</em></td>
        </tr>
        <tr><td style={td}>2. Body bears numerous pores.</td></tr>
        <tr><td style={td}>3. Canal system is present.</td></tr>
        <tr><td style={td}>4. Skeleton made of spicules.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={3}>2. Coelenterata (Cnidaria)</td>
          <td style={td}>1. Body encloses single cavity having mouth with tentacles.</td>
          <td style={td} rowSpan={3}><em>Hydra</em>, Jelly fish, Corals</td>
        </tr>
        <tr><td style={td}>2. Stinging cells as organs of offence and defence.</td></tr>
        <tr><td style={td}>3. Show polymorphism.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={3}>3. Platyhelminthes (Flat worms)</td>
          <td style={td}>1. Soft, leaf-like, ribbon-like body without segments.</td>
          <td style={td} rowSpan={3}>Liver fluke, Tape worm, <em>Planaria</em></td>
        </tr>
        <tr><td style={td}>2. Mostly parasites.</td></tr>
        <tr><td style={td}>3. Coelom absent.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={3}>4. Nematoda (Round worms)</td>
          <td style={td}>1. Body covered with tough cuticle.</td>
          <td style={td} rowSpan={3}>The giant intestinal worm, Filarial worm</td>
        </tr>
        <tr><td style={td}>2. It has pseudocoelom.</td></tr>
        <tr><td style={td}>3. Mostly parasites.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={3}>5. Annelida (Segmented worms)</td>
          <td style={td}>1. Body has metameric segmentation.</td>
          <td style={td} rowSpan={3}>Sand worm, Earthworm, Cattle leech.</td>
        </tr>
        <tr><td style={td}>2. Segmentally arranged setae/parapodia for locomotion.</td></tr>
        <tr><td style={td}>3. True coelom present.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={3}>6. Arthropoda (Animals with Jointed legs)</td>
          <td style={td}>1. Body divided into cephalothorax and abdomen or into head, thorax and abdomen.</td>
          <td style={td} rowSpan={3}>Prawn, Crab, Centipede, Mosquito, Housefly, Cockroach, Butterfly, Spider, Scorpion.</td>
        </tr>
        <tr><td style={td}>2. Chitinous cuticle as exoskeleton.</td></tr>
        <tr><td style={td}>3. Jointed legs present.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={3}>7. Mollusca (Soft-bodied Animals)</td>
          <td style={td}>1. Body soft and unsegmented.</td>
          <td style={td} rowSpan={3}>Apple snail, <em>Sepia</em>, <em>Octopus</em></td>
        </tr>
        <tr><td style={td}>2. Body divided into head, visceral mass and foot.</td></tr>
        <tr><td style={td}>3. Body covered with calcareous shell.</td></tr>

        <tr>
          <td style={{...td, fontWeight:700}} rowSpan={4}>8. Echinodermata (Spiny skinned animals)</td>
          <td style={td}>1. Marine, unsegmented animals.</td>
          <td style={td} rowSpan={4}>Star fish, Sea urchin, Sea cucumber, Feather star.</td>
        </tr>
        <tr><td style={td}>2. Body all over covered with spines.</td></tr>
        <tr><td style={td}>3. Water vascular system is present.</td></tr>
        <tr><td style={td}>4. Locomotion by tube feet.</td></tr>
      </tbody>
    </table>
  </div>
);

// ── CONTENT (Batch 5) ─────────────────────────────────────────
const content_b5 = [

  // 4.7.11 Phylum Chordata
  <SubSubHd key="b5-sub-s4711" id="s4711" label="4.7.11" title="Phylum : CHORDATA (Gr., chorda = string)" />,

  <p key="b5-p-s4711-intro" style={{ textAlign: "justify", marginBottom: 8 }}>
    Chordata is the most advanced animal phylum. The main distinctive characters of this phylum are:
  </p>,
  <p key="b5-p-s4711-a" style={{ textIndent: 0, marginBottom: 6 }}>
    (<em>a</em>) <strong>Notochord,</strong> a solid unjointed rod, is present in chordates at some stage of life. In lower chordates, it persists throughout life, but in the higher ones, it is present in the embryo and is surrounded or replaced by vertebral column.
  </p>,
  <p key="b5-p-s4711-b" style={{ textIndent: 0, marginBottom: 6 }}>
    (<em>b</em>) A <strong>dorsal hollow nerve cord</strong> develops in embryo which usually persists throughout life in most chordates.
  </p>,
  <p key="b5-p-s4711-c" style={{ textIndent: 0, marginBottom: 6 }}>
    (<em>c</em>) <strong>Gill slits</strong> are present at some stage of life.
  </p>,
  <p key="b5-p-s4711-d" style={{ textIndent: 0, marginBottom: 6 }}>
    (<em>d</em>) A <strong>tail</strong> is present behind the cloacal or anal opening at some stage of life. It is reduced or absent in the adults of some chordates.
  </p>,

  // 4.8 Classification of Phylum Chordata
  <SecHd key="b5-sec-s48" id="s48" label="4.8" title="Classification of Phylum : Chordata (upto Class level)" />,

  <p key="b5-p-s48-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    The phylum chordata is divided into two subphyla: <strong>Protochordata</strong> (lower chordates) and <strong>Vertebrata</strong> (Craniata). The vertebrates are commonly called higher chordates or euchordates.
  </p>,

  <Fig key="b5-fig-chordata-chart"
    src={CONTENT_IMAGES.CONTENT_IMAGE_736D0087A5561FF54B76}
    caption="Classification of Phylum Chordata — showing Sub-Phylum Protochordata and Vertebrata (five classes)"
  />,

  // 4.8.1 Protochordata
  <SubHd key="b5-sub-s481" id="s481" label="4.8.1" title="Sub-phylum : PROTOCHORDATA" />,

  <p key="b5-p-s481-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> The sub-phylum protochordata includes animals which are bilaterally symmetrical, unsegmented, triploblastic and have a body cavity or coelom.
  </p>,
  <p key="b5-p-s481-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The animals belonging to protochordata possess a <strong>notochord</strong> at some stage in the life history. This is a flexible rod that lies between the dorsal nerve tube and the gut.
  </p>,
  <p key="b5-p-s481-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> The notochord provides a place for muscles to attach. It increases internal support and locomotory power.
  </p>,
  <p key="b5-p-s481-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> Protochordates are usually marine, soft, have worm-like or vase-like forms.
  </p>,
  <p key="b5-p-s481-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    <strong>5.</strong> Examples: <em>Balanoglossus</em> (a corn worm or tongue worm), <em>Herdmania</em> and <em>Amphioxus</em>, etc.
  </p>,

  <Fig key="b5-fig421"
    src={CONTENT_IMAGES.CONTENT_IMAGE_4488E1CF2C6B5367A6F0}
    num="Fig. 4.21"
    caption="Balanoglossus (a corn worm or tongue worm)"
  />,

  // 4.8.2 Vertebrata
  <SubHd key="b5-sub-s482" id="s482" label="4.8.2" title="Sub-phylum : VERTEBRATA" />,

  <p key="b5-p-s482-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> The sub-phylum vertebrata includes animals which are bilaterally symmetrical, triploblastic, coelomic and segmented.
  </p>,
  <p key="b5-p-s482-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The animal body typically consists of four regions: head, neck, trunk and tail.
  </p>,

  <p key="b5-p-s482-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> The notochord is replaced partly or fully by a jointed vertebral column (back bone) in the adult. The body of vertebrates is characterised by the presence of a well developed skeletal system that allows a special distribution of muscle attachment points to be used for movement.
  </p>,
  <p key="b5-p-s482-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> Besides vertebral column and internal skeleton, the vertebrates have a well developed nervous system (brain) and sense organs (eyes, ears and nose).
  </p>,
  <p key="b5-p-s482-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5.</strong> The vertebrates have a complex differentiation of body tissues or organs.
  </p>,
  <p key="b5-p-s482-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>6.</strong> There are two pairs of appendages (fins or limbs).
  </p>,
  <p key="b5-p-s482-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>7.</strong> Respiration is by gills in lower aquatic vertebrates. Higher land forms have lungs for gaseous exchange.
  </p>,
  <p key="b5-p-s482-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>8.</strong> Sexes are separate.
  </p>,

  <p key="b5-p-s482-classes" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    Subphylum Vertebrata is divided into five classes:
  </p>,
  <div key="b5-classes-list" style={{ paddingLeft: 36, marginBottom: 12, lineHeight: 2 }}>
    (<em>i</em>) Class : Pisces<br/>
    (<em>ii</em>) Class : Amphibia<br/>
    (<em>iii</em>) Class : Reptilia<br/>
    (<em>iv</em>) Class : Aves<br/>
    (<em>v</em>) Class : Mammalia
  </div>,

  // 4.8.2.1 Pisces
  <SubSubHd key="b5-sub-s4821" id="s4821" label="4.8.2.1" title="Class : PISCES" />,

  <p key="b5-p-s4821-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> The animals belonging to class-Pisces are commonly called <strong>fishes.</strong> They exclusively live in water.
  </p>,
  <p key="b5-p-s4821-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The skin of fishes is covered with scales/plates, which help these animals to live in water.
  </p>,
  <p key="b5-p-s4821-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> The body may be long, laterally compressed and spindle shaped or dorsiventrally flattened and disc shaped. It usually consists of head, trunk and a muscular tail.
  </p>,
  <p key="b5-p-s4821-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> The muscular tail and fins help them to swim in water and move from one place to another.
  </p>,
  <p key="b5-p-s4821-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5.</strong> Fishes are cold-blooded animals and their hearts have only two chambers – one auricle and one ventricle.
  </p>,
  <p key="b5-p-s4821-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>6.</strong> Fishes obtain oxygen dissolved in water and breathe through gills.
  </p>,
  <p key="b5-p-s4821-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>7.</strong> They are egg laying animals. Fertilization is external.
  </p>,
  <p key="b5-p-s4821-cats" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    There are many kinds of fishes. They have been broadly grouped under three categories:
  </p>,
  <div key="b5-pisces-cats" style={{ paddingLeft: 36, marginBottom: 10, fontSize: 14, lineHeight: 1.8 }}>
    <p key="b5-pisces-1" style={{ margin: "4px 0" }}><strong>1. Cyclostomata:</strong> The round mouthed fishes. Examples, The hag fish, the lamprey.</p>
    <p key="b5-pisces-2" style={{ margin: "4px 0" }}><strong>2. Chondrichthyes:</strong> The cartilaginous fishes. Examples: <em>Scoliodon</em> (dog fish or the Indian Shark), sting ray, electric ray (<em>Torpedo</em>) (Fig. 4.22).</p>
    <p key="b5-pisces-3" style={{ margin: "4px 0" }}><strong>3. Osteichthyes:</strong> The bony fishes. Examples, <em>Labeo rohita</em> (Rohu), <em>Hippocampus</em> (Sea horse), Tuna, etc. (Fig. 4.23).</p>
  </div>,

  <Fig key="b5-fig422"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0480293AD61ABC585819}
    num="Fig. 4.22"
    caption="Some cartilaginous fishes A. Scoliodon (dog fish or the Indian shark); B. Sphyrna (Hammer headed shark); C. Pristis (Saw-fish); D. Torpedo (the electric ray); E. Sting ray"
  />,

  <Fig key="b5-fig423"
    src={CONTENT_IMAGES.CONTENT_IMAGE_9A670CAF57C2FB92636E}
    num="Fig. 4.23"
    caption="Some bony fishes : A. Synchiropus splendidus (Mandarin fish); B. Hippocampus (Sea horse); C. Caulophyrna jordani (Angler fish); D. Exocoetus (Flying fish); E. Labeo rohita (Rohu); F. Anabas (Climbing perch); G. Pterois volitans (Lion fish)"
  />,

  // 4.8.2.2 Amphibia
  <SubSubHd key="b5-sub-s4822" id="s4822" label="4.8.2.2" title="Class AMPHIBIA (Gr., amphi = double; bios = life; vertebrates live both on land and in water)" />,

  <p key="b5-p-s4822-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> The animals included in class Amphibia are commonly called <strong>amphibians.</strong> They were the first vertebrates to invade land. They inhabit damp places and breed in fresh water.
  </p>,
  <p key="b5-p-s4822-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The body varies in form. The skin is smooth, moist, rich in mucous and poison glands. Scales are mostly absent.
  </p>,
  <p key="b5-p-s4822-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> There are two pairs of pentadactyl limbs, each with 4–5 or fewer digits. One pair or both the pairs of limbs are absent in some cases.
  </p>,
  <p key="b5-p-s4822-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> Respiration takes place by gills, lungs, lining of buccopharyngeal cavity and skin.
  </p>,
  <p key="b5-p-s4822-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5.</strong> The heart is three-chambered: two auricles and one ventricle.
  </p>,
  <p key="b5-p-s4822-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>6.</strong> Amphibians occur in fresh water and moist land. There are <strong>no marine forms.</strong> Some frogs live on trees (<em>e.g., Hyla</em>).
  </p>,
  <p key="b5-p-s4822-ex" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    <strong>Examples:</strong> <em>Rana tigerina</em> (The common Indian frog), <em>Bufo</em> (toad), <em>Hyla</em> (tree frog), <em>Necturus</em> (mud puppy), <em>Salamandra</em> (spotted salamander), <em>Triturus</em> (Himalayan Salamander).
  </p>,

  <Fig key="b5-fig424"
    src={CONTENT_IMAGES.CONTENT_IMAGE_2B2477BB6C71166EB072}
    num="Fig. 4.24"
    caption="Amphibia A. Salamander; B. Toad; C. Rana tigrina (Common frog); D. Hyla (Tree frog)"
  />,

  // 4.8.2.3 Reptilia
  <SubSubHd key="b5-sub-s4823" id="s4823" label="4.8.2.3" title="Class REPTILIA (L., repre = to crawl; creeping vertebrates)" />,

  <p key="b5-p-s4823-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> The class Reptilia includes lizards, snakes, tortoises, turtles, alligators and crocodiles. They were the first vertebrates fully adapted for life on dry land. These are cold-blooded animals.
  </p>,
  <p key="b5-p-s4823-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The reptiles are mostly terrestrial animals and live in warmer regions. Some are aquatic and live in water, but they too return to land for breeding.
  </p>,
  <p key="b5-p-s4823-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> The body varies in form. It is covered by horny epidermal scales (the scales contain a waterproof protein, keratin).
  </p>,
  <p key="b5-p-s4823-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> There are two pairs of pentadactyl limbs, each with 5 digits bearing horny claws. Limbs are absent in snakes and some lizards.
  </p>,
  <p key="b5-p-s4823-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5.</strong> Teeth are usually present in all reptiles except in tortoises and turtles.
  </p>,
  <p key="b5-p-s4823-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>6.</strong> Respiration occurs by lungs only.
  </p>,
  <p key="b5-p-s4823-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>7.</strong> The heart is three chambered, having two auricles and a partly divided ventricle.
  </p>,
  <p key="b5-p-s4823-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>8.</strong> Most reptiles are carnivorous or insectivorous (Tortoises are herbivorous).
  </p>,
  <p key="b5-p-s4823-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>9.</strong> Reptiles lay eggs outside the water and the eggs have a tough covering.
  </p>,
  <p key="b5-p-s4823-ex" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    <strong>Examples:</strong> <em>Hemidactylus</em> (wall lizard), <em>Chamaeleon</em>, <em>Varanus</em> (the monitor or goya), <em>Calotes</em> (garden lizard), <em>Draco</em> (flying lizard), <em>Python</em> (ajgar), <em>Naja</em> (Cobra), <em>Testudo</em> (tortoise), <em>Chelone</em> (turtle), <em>Crocodilus</em> (crocodile), <em>Gavialis</em> (gharial).
  </p>,

  <Fig key="b5-fig425"
    src={CONTENT_IMAGES.CONTENT_IMAGE_EA4C47A039C4AB334543}
    num="Fig. 4.25"
    caption="Reptilia A. Hemidactylus (House wall lizard); B. Turtle; C. Draco (Flying lizard); D. King Cobra; E. Chameleon"
  />,

  // 4.8.2.4 Aves
  <SubSubHd key="b5-sub-s4824" id="s4824" label="4.8.2.4" title="Class AVES (birds)" />,

  <p key="b5-p-s4824-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> The class Aves includes the birds which are found in all continents, seas and most islands.
  </p>,
  <p key="b5-p-s4824-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The birds are the most beautiful animals. They range in size from smallest humming bird to largest ostrich.
  </p>,
  <p key="b5-p-s4824-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> There are two pairs of limbs. The forelimbs are modified into wings for flight. The hindlimbs alone support the body.
  </p>,
  <p key="b5-p-s4824-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> The body is covered by an epidermal horny exoskeleton of feathers.
  </p>,
  <p key="b5-p-s4824-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5.</strong> Endoskeleton is bony, but delicate and light.
  </p>,
  <p key="b5-p-s4824-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>6.</strong> Mouth is surrounded by horny beak adapted to various purposes. There are no teeth.
  </p>,
  <p key="b5-p-s4824-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>7.</strong> Respiration takes place only by lungs.
  </p>,
  <p key="b5-p-s4824-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>8.</strong> The heart is relatively large. It is four chambered having two auricles and two ventricles.
  </p>,
  <p key="b5-p-s4824-ex" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    <strong>Examples:</strong> <em>Columbo</em> (pigeon), <em>Struthio</em> (Ostrich), <em>Milvus</em> (kite), <em>Pavo</em> (pea fowl), <em>Passer</em> (sparrow), <em>Gallus</em> (fowl), <em>Corvus splendens</em> (crow); Kiwi, Penguin and Ostrich are examples of flightless birds.
  </p>,

  // 4.8.2.5 Mammalia
  <SubSubHd key="b5-sub-s4825" id="s4825" label="4.8.2.5" title="Class MAMMALIA (Mammals)" />,

  <Fig key="b5-fig426"
    src={CONTENT_IMAGES.CONTENT_IMAGE_25E82A173D9F52192BCC}
    num="Fig. 4.26"
    caption="Aves A. Struthio (the Ostrich); B. Columbo (the pigeon); C. Tyto alba (the owl); D. Anas (the duck); E. Ciconia ciconia (white stork); F. Corvus splendens (the house crow); G. Pavo cristatus (the peacock)"
  />,

  <p key="b5-p-s4825-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1.</strong> Mammals are primarily terrestrial vertebrates. They occur in all sorts of habitats from the polar regions to the tropics.
  </p>,
  <p key="b5-p-s4825-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2.</strong> The body is variously shaped and generally divisible into head, neck, trunk and tail.
  </p>,
  <p key="b5-p-s4825-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3.</strong> The skin is glandular and mostly covered by a horny epidermal exoskeleton of hair.
  </p>,
  <p key="b5-p-s4825-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4.</strong> There are two pairs of pentadactyl limbs. These are variously adapted for various purposes.
  </p>,
  <p key="b5-p-s4825-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5.</strong> Respiration occurs only by lungs.
  </p>,
  <p key="b5-p-s4825-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>6.</strong> The heart is four chambered, having two auricles and two ventricles.
  </p>,
  <p key="b5-p-s4825-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>7.</strong> Sexes are usually distinguishable externally.
  </p>,
  <p key="b5-p-s4825-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>8.</strong> Mammals are mostly <strong>viviparous</strong> (alive-bearing). However, some are oviparous and lay eggs (<em>e.g.,</em> platypus and echidna. Kangaroos give birth to very poorly developed young ones). They are characterized by having milk-secreting <strong>mammary glands</strong> in the females for sucking the young for some time after birth.
  </p>,
  <p key="b5-p-s4825-ex" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    <strong>Examples:</strong> <em>Macropus</em> (Kangaroo), Bat, <em>Rattus</em> (rat), <em>Oryctolagus</em> (rabbit), <em>Felis</em> (cat), <em>Panthera</em> (lion, tiger, leopard), <em>Canis</em> (dog), <em>Elephas</em> (elephant), <em>Balaena</em> (whale), <em>Macaca</em> (monkey), <em>Homo</em> (man), <em>Pan</em> (chimpanzee).
  </p>,

  <Fig key="b5-fig427"
    src={CONTENT_IMAGES.CONTENT_IMAGE_81C9F1A41C2472E5C9A0}
    num="Fig. 4.27"
    caption="Mammalia A. Ornithorhynchus (Duck-billed platypus); B. Balaenoptera (the whale); C. Platanista gangetica (the dolphin); D. Odobenus (the walrus); E. Scotophilus (the bat); F. Rhinoceros; G. Equus cabalus (Horse); H. Pan (Chimpanzee)"
  />,

  // Table 4.6
  <Table46 key="b5-tbl46" />,

  // Activity 4.2
  <ActivityBox key="b5-act42" num="4.2" sub="Sorting of animals on the basis of presence/absence of a backbone and then grouping them into various invertebrate phyla and vertebrate classes.">
    <ActHd key="b5-act42-req">Requirements.</ActHd>
    <p key="b5-act42-req-txt" style={{ textAlign: "justify", marginBottom: 8 }}>Educational/wall charts, picture books, photocopies of class books, scissor, fevi-stick, charts.</p>

    <ActHd key="b5-act42-proc">Procedure.</ActHd>
    <p key="b5-act42-proc-txt" style={{ textAlign: "justify", marginBottom: 8 }}>
      Divide the students of your class in groups of 10 each. Ask them to collect large number of animals having a backbone and those not having a backbone, using educational/wall charts, picture books, photocopies of biology class book or any other source. Ask them to cut the animal pictures and paste them on separate charts on the basis of presence/absence of backbone in them, and sorting of vertebrates into different classes, and invertebrates into different phyla on the basis of their peculiar characteristics.
    </p>

    <ActHd key="b5-act42-obs">Observations and Conclusions.</ActHd>
    <p key="b5-act42-obs-txt" style={{ textAlign: "justify", marginBottom: 12 }}>
      You will find that students first sorted the animals into two groups, <em>i.e.,</em> one possessing a backbone (labelled as vertebrates) and the other without a backbone (labelled as invertebrates). On the basis of peculiar characteristics of collected animals, they further sorted vertebrates into 5 classes, namely, Pisces, Amphibia, Reptilia, Aves and Mammalia. Similarly, they sorted collected animals without the backbone into different invertebrate phyla on the basis of their typical features.
    </p>

    <TableAct42Vert key="b5-tbl-vert" />
    <TableAct42Invert key="b5-tbl-invert" />
  </ActivityBox>,
];
const TaxonomyHierarchy = () => (
  <div style={{ margin: "16px auto", maxWidth: 260, textAlign: "center", lineHeight: 2, fontSize: 14 }}>
    {[
      { label: "Kingdom", indent: 0 },
      { label: "Phylum / Division", indent: 1 },
      { label: "(for animals) / (for plants)", indent: 1, small: true },
      { label: "Class", indent: 2 },
      { label: "Order", indent: 3 },
      { label: "Family", indent: 4 },
      { label: "Genus", indent: 5 },
      { label: "Species", indent: 6 },
    ].map((row, i) => (
      <div key={i} style={{ paddingLeft: row.indent * 12, fontWeight: row.small ? 400 : 700, fontSize: row.small ? 12 : 14, color: row.small ? "#666" : "#1a1a1a" }}>
        {row.label}
      </div>
    ))}
  </div>
);

const TableNomenclature = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      List of Scientific Nomenclature of Some Common Species of Animals and Plants
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Common Name</td>
          <td style={th}>Genus</td>
          <td style={th}>Specific Epithet</td>
          <td style={th}>Scientific Name</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["Human", "Homo", "sapiens", "Homo sapiens"],
          ["Domestic cat", "Felis", "catus", "Felis catus"],
          ["Lion", "Panthera", "leo", "Panthera leo"],
          ["Tiger", "Panthera", "tigris", "Panthera tigris"],
          ["Leopard", "Panthera", "pardus", "Panthera pardus"],
          ["Peacock", "Pavo", "cristatus", "Pavo cristatus"],
          ["House crow", "Corvus", "splendens", "Corvus splendens"],
          ["Common frog", "Rana", "tigrina", "Rana tigrina"],
          ["European Honey bee", "Apis", "mellifera", "Apis mellifera"],
          ["Rose plant", "Rosa", "indica", "Rosa indica"],
          ["Common Dandelion", "Taraxacum", "officinale", "Taraxacum officinale"],
        ].map(([common, genus, epithet, sci], i) => (
          <tr key={i}>
            <td style={td}>{common}</td>
            <td style={{ ...td, fontStyle: "italic" }}>{genus}</td>
            <td style={{ ...td, fontStyle: "italic" }}>{epithet}</td>
            <td style={{ ...td, fontStyle: "italic", fontWeight: 600 }}>{sci}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TableVirusClassification = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Genetic Material</td>
          <td style={th}>Description</td>
          <td style={th}>Example Virus</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Double-Stranded DNA (dsDNA)</td>
          <td style={td}>The virus's genetic code is in the form of a DNA double helix, just like in cellular organisms.</td>
          <td style={td}>Herpesviruses</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Single-Stranded DNA (ssDNA)</td>
          <td style={td}>The genome is a single strand of DNA.</td>
          <td style={td}>Parvoviruses</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Double-Stranded RNA (dsRNA)</td>
          <td style={td}>An unusual form where the genetic material is a double helix made of RNA.</td>
          <td style={td}>Rotavirus</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Single-Stranded RNA (ssRNA)</td>
          <td style={td}>The genome is a single strand of RNA. This group can be further divided based on how the RNA is used.</td>
          <td style={td}>Influenza, COVID-19</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ── CONTENT (Batch 6) ─────────────────────────────────────────
const content_b6 = [

  // 4.9 Taxonomy
  <SecHd key="b6-sec-s49" id="s49" label="4.9" title="Taxonomy" />,

  <p key="b6-p-s49-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The world has incredible diversity of life, from the smallest bacteria to the largest blue whales. To make sense of all these living organisms, biologists use a system, called taxonomy.
  </p>,

  <DefBox key="b6-def-taxonomy">
    <strong>Taxonomy</strong> is an important branch of science dealing with identification, nomenclature and classification of organisms following certain rules or principles.
  </DefBox>,

  <p key="b6-p-s49-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The main goal of taxonomy is to create a universal framework for organized life. This allows scientists from every corner of the world and speaking different languages, to communicate about the same organisms. By grouping organisms based on their similarities, taxonomy reveals patterns of evolution and helps us piece together the family tree of life.
  </p>,
  <p key="b6-p-s49-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Taxonomy uses a hierarchical system, <em>i.e.,</em> it has different levels of classification. In the 18th century, Carolus Linnaeus (1707–1778), a Swedish scientist, introduced the hierarchy of classification-groups. He is called <strong>father of taxonomy.</strong>
  </p>,

  // 4.9.1 Hierarchy
  <SubHd key="b6-sub-s491" id="s491" label="4.9.1" title="The Hierarchy of Classification-groups" />,

  <p key="b6-p-s491-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In classification, the organisms that closely resemble one another are placed in a group. These groups are further placed in larger groups on the basis of close similarities. The larger groups are again placed in still larger groups. The various grouping levels or ranks in classification are known as <strong>categories.</strong> Each category has its specific name. There are seven major categories:
  </p>,

  <div key="b6-cats-list" style={{ paddingLeft: 36, marginBottom: 10, lineHeight: 2, fontSize: 14 }}>
    <strong>1.</strong> Species &nbsp;&nbsp;
    <strong>2.</strong> Genus &nbsp;&nbsp;
    <strong>3.</strong> Family &nbsp;&nbsp;
    <strong>4.</strong> Order &nbsp;&nbsp;
    <strong>5.</strong> Class &nbsp;&nbsp;
    <strong>6.</strong> Phylum (for animals)/Division (for plants) &nbsp;&nbsp;
    <strong>7.</strong> Kingdom
  </div>,

  <p key="b6-p-s491-species" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1. Species.</strong> Species is the lowest category regarded as <strong>basic unit of classification.</strong> It is a group of similar individuals which resemble with each other in morphology, breed among themselves but not with others and probably descended from a common ancestor.
  </p>,
  <p key="b6-p-s491-genus" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2. Genus.</strong> A genus is a group of closely resembling species having a common ancestry. All the species in a genus show similarities in broad features of their organization but differ in minor details.
  </p>,
  <p key="b6-p-s491-family" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3. Family.</strong> A family represents a larger group of closely related genera. It is composed of one or more genera. For example, the genus <em>Felis</em> of cats and the genus <em>Panthera</em> of lion, tiger and leopard are placed in the family Felidae because all these animals have retractile claws.
  </p>,
  <p key="b6-p-s491-order" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>4. Order.</strong> An order is a group of closely related families. For example, the family Felidae (that includes cats) and the family Canidae (that includes dogs) are assigned to the order Carnivora because both cats and dogs have large canine teeth and are flesh eaters.
  </p>,
  <p key="b6-p-s491-class" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>5. Class.</strong> A class is a group of related orders.
  </p>,
  <p key="b6-p-s491-phylum" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>6. Phylum/Division.</strong> Phylum (in case of animals) or Division (in case of plants) is a group of related classes.
  </p>,
  <p key="b6-p-s491-kingdom" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>7. Kingdom.</strong> Kingdom is the highest category in biological classification. It is a group of Phyla (in case of animals) or divisions (in case of plants).
  </p>,
  <p key="b6-p-s491-linnaean" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    The various categories used in biological classification can be arranged in a hierarchy (<em>i.e.,</em> ranked one above the other). It was introduced by Linnaeus and is, therefore, called <strong>Linnaean hierarchy.</strong> The hierarchy indicates the various levels of Kinship (<em>i.e.,</em> relationship by blood). Nearer the categories in hierarchy the greater is the similarity between their organisms. The hierarchy of major categories is given below:
  </p>,

  <TaxonomyHierarchy key="b6-tax-hierarchy" />,

  // 4.10 Nomenclature
  <SecHd key="b6-sec-s410" id="s410" label="4.10" title="Nomenclature" />,

  <p key="b6-p-s410-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The organisms around us are identified by their own distinct names. The names are, therefore, essential for identification of a particular organism as well as to distinguish one organism from the others. In Biology, the organisms are categorised into different <strong>taxa</strong> (sing. <strong>taxon,</strong> taxon is a taxonomic group such as species, genus, family, order, class, phyta, etc.). <strong>Species</strong> is a smaller taxon which includes the individuals sharing the common characters, able to breed together and produce fertile offsprings. For example, man, lion, elephant, cat, mango, fig, etc. form distinct species. A number of species are grouped into a <strong>genus</strong> (pl. <strong>genera</strong>). Several genera are grouped into a <strong>family</strong> and several families are grouped in an <strong>order.</strong> Similarly, several orders are placed under a <strong>class</strong> and several classes are grouped into a <strong>phyla/division.</strong> The phyla or divisions are grouped into other higher categories.
  </p>,

  // 4.10.1
  <SubHd key="b6-sub-s4101" id="s4101" label="4.10.1" title="What is nomenclature?" />,

  <p key="b6-p-s4101" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Naming a correct scientific name to an organism or a taxon is called <strong>nomenclature.</strong> It involves the principles governed by set rules formulated by International bodies so that a particular organism or taxon is known by its specific name throughout the world.
  </p>,

  // 4.10.2
  <SubSubHd key="b6-sub-s4102" id="s4102" label="4.10.2" title="Common vernacular names and Scientific names" />,

  <p key="b6-p-s4102" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    There are two categories of names: common vernacular names and scientific names. The naming of the organisms started with the human civilization. The common names of the organisms have been handed down from generation to generation. They are mostly made up of words from regional or native language of the country. For example, a dog is named <em>Kutta</em> in Hindi, <em>Kukur</em> in Bengla, <em>Kutra</em> in Marathi and <em>naai</em> in Tamil. English people call it a <strong>dog.</strong> A dog may be known by some other names in some other countries. A common name serves its purpose satisfactorily in the community or region where it is used, but is likely to prove useless in different localities. The scientific names, on the other hand, are mainly based on Latin language and preferred over common vernacular names in the scientific world.
  </p>,

  // 4.10.3
  <SubHd key="b6-sub-s4103" id="s4103" label="4.10.3" title="Binomial nomenclature" />,

  <p key="b6-p-s4103-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Binomial nomenclature was proposed and established by <strong>Carolus Linnaeus</strong> in 1753 and he is considered to be the <strong>Father of Taxonomy.</strong> According to the binomial system of nomenclature, the scientific name of an organism consists of two separate components — first one designates the <strong>genus</strong> (generic name) and the second one designates the <strong>species</strong> (specific name). For example, the scientific binomial name of human species is <em>Homo sapiens,</em> where first name <em>Homo</em> is generic and the second name <em>sapiens</em> is a specific. <em>Homo sapiens</em> are understood to mean humans all over the world. Since this system of naming organisms gives two names to an organism, it is known as a <strong>binomial nomenclature.</strong>
  </p>,
  <p key="b6-p-s4103-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    This system is accepted Internationally and guided by a set of rules stated in the <strong>International code of Nomenclature.</strong> However, there are separate codes for naming plants, animals and microorganisms. They are — International code of Botanical Nomenclature (for naming plants), International code of Zoological Nomenclature (for naming animals), and International code of Bacteriological Nomenclature (for naming bacteria).
  </p>,

  <TableNomenclature key="b6-tbl-nomen" />,

  // 4.11 Viruses
  <SecHd key="b6-sec-s411" id="s411" label="4.11" title="Acellular Entities – Viruses" />,

  <p key="b6-p-s411-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Viruses are a group of ultramicroscopic, non-cellular, highly infectious agents that multiply only intracellularly inside the host cells without involving growth and division. Outside the host cells, they are inert particles.
  </p>,

  <KBBox key="b6-kb-viruses">
    <p key="b6-kb-virus-def" style={{ margin: 0, textAlign: "justify", fontSize: 14 }}>
      Viruses are nucleoproteins, having nucleic acid molecule (DNA or RNA, depending on the type of virus) enveloped in a protective protein coat (capsid). These are considered a <strong>"link between living and non-living"</strong> because they are inert outside a host but use host cell machinery to replicate inside.
    </p>
  </KBBox>,

  <p key="b6-p-s411-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    They lack ribosomes and other organelles. Viruses are perfect obligate parasites.
  </p>,

  <p key="b6-p-s411-keychar" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, margin: "12px 0 6px" }}>Key characteristics</p>,
  <p key="b6-p-s411-kc1" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    • <strong>Acellular structure.</strong> They do not possess cells, ribosomes and other organelles.
  </p>,
  <p key="b6-p-s411-kc2" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    • <strong>Genetic material.</strong> These contain DNA or RNA, but not both as genetic material.
  </p>,
  <p key="b6-p-s411-kc3" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    • <strong>Reproduction.</strong> They are inert outside a host but they must infect a living cell to reproduce by using host cell machinery.
  </p>,
  <p key="b6-p-s411-kc4" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    • <strong>Components.</strong> They possess nucleic acid core, either DNA or RNA, encased in protein coat (capsid) or sometimes lipoprotein envelope.
  </p>,
  <p key="b6-p-s411-kc5" style={{ margin: "4px 0 12px 20px", textAlign: "justify" }}>
    • <strong>Host cells.</strong> Viruses infect all life forms, <em>e.g.,</em> bacteria, plants and animals. Accordingly, these are termed as bacterial viruses (bacteriophages), plant viruses, and animal viruses.
  </p>,

  <p key="b6-p-s411-viroids" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>Viroids.</strong> These are small, circular RNA molecules that infect plants. These lack a protein coat.
  </p>,
  <p key="b6-p-s411-prions" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>Prions.</strong> These are infectious proteins (misfolded) that cause neurodegenerative diseases. These do not contain nucleic acid.
  </p>,
  <p key="b6-p-s411-virions" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    <strong>Virions.</strong> These are the complete, infectious virus particle found outside a host. Virion consists of nucleic acid (DNA or RNA) enclosed in a protective protein coat (capsid), sometimes with an additional outer lipid envelope, designed to deliver its genetic material into a new host cell for replication.
  </p>,

  <p key="b6-p-s411-classhd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "12px 0 6px" }}>
    • Classification Scheme of Viruses
  </p>,
  <p key="b6-p-s411-class-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The most fundamental classification scheme sorts viruses by their genome. This system considers both the type of nucleic acid (DNA or RNA) and its form (single-stranded or double-stranded).
  </p>,

  <TableVirusClassification key="b6-tbl-virus" />,

  <p key="b6-p-s411-evohd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "16px 0 6px" }}>
    • Origin and Evolution of Viruses
  </p>,
  <p key="b6-p-s411-evo1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Viruses are ancient and incredibly abundant, but their exact origin is one of the biggest mysteries of biology. Since they leave no fossils, scientists piece together their history by studying the genetics of modern viruses and their hosts.
  </p>,
  <p key="b6-p-s411-evo2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    At present, there are three main ideas about how viruses first came into existence. Each hypothesis offers a different explanation for the existence of viruses. It is possible that different groups of viruses arose in different ways, meaning all three theories could hold some truth.
  </p>,

  <p key="b6-p-s411-h1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>1. The Regressive Hypothesis</strong> argues that viruses were once more complex organisms that degenerated into their current simple form.
  </p>,
  <p key="b6-p-s411-h1txt" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This idea suggests that viruses started as small, free-living cells that became parasites of larger cells. Over an extremely long period of time, as they grew more dependent on their hosts, they shed the genes needed for an independent life. They kept only the essentials: their genetic material and the instructions for making a protective shell.
  </p>,

  <p key="b6-p-s411-h2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>2. The Cellular Origin Hypothesis</strong> proposes that viruses are bits of genetic material that escaped from a cell.
  </p>,
  <p key="b6-p-s411-h2txt" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    According to this theory, viruses began as pieces of DNA or RNA that broke free from the genome of a larger organism. These rogue genetic fragments, sometimes called "jumping genes" or transposons, already had the ability to move around within a genome. The next evolutionary step was to escape one cell and enter another. By packaging themselves in a protein coat, they became the viruses we know today.
  </p>,

  <p key="b6-p-s411-h3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    <strong>3. The Co-evolution Hypothesis</strong> suggests that viruses evolved alongside the first cells.
  </p>,
  <p key="b6-p-s411-h3txt" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This theory, also called the "virus-first" hypothesis, posits that viruses are as old as cellular life itself, if not older. In the planet's primordial soup, complex molecules of protein and nucleic acid were forming. Viruses may have started as self-replicating molecules that established a parasitic relationship with the very first cells. From that point on, cells and viruses evolved together, constantly influencing each other's development.
  </p>,
  <p key="b6-p-s411-h3conc" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    Thus, viruses and cells are like two siblings who grew up together from the very beginning, locked in a perpetual dance of interaction and adaptation.
  </p>,

  // 4.12 Three-Domain Classification
  <SecHd key="b6-sec-s412" id="s412" label="4.12" title="Three-Kingdom Classification of Organisms based on Molecular Basis" />,

  <p key="b6-p-s412-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The classification system that organizes organisms into three groups based on a molecular basis is the <strong>Three-Domain System</strong> proposed by Carl Woese, Otto Kandler, and Mark Wheelis in 1990. This system uses differences in ribosomal RNA (rRNA) sequences, cell membrane lipid structure, and sensitivity to antibiotics to divide all cellular life into three primary evolutionary lineages, or domains.
  </p>,

  <p key="b6-p-s412-intro2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>The three domains are:</p>,

  <p key="b6-p-s412-archaea" style={{ margin: "6px 0 6px 20px", textAlign: "justify" }}>
    • <strong>Archaea.</strong> These are single-celled prokaryotic organisms that lack a membrane-bound nucleus. They are distinct from bacteria in their molecular characteristics, such as unique membrane lipids (ether linkages vs. ester linkages) and different rRNA sequences. Many are <strong>"extremophiles,"</strong> found in harsh environments like hot springs and high-salt areas.
  </p>,
  <p key="b6-p-s412-bacteria" style={{ margin: "6px 0 6px 20px", textAlign: "justify" }}>
    • <strong>Bacteria.</strong> These are also single-celled prokaryotic organisms. They are distinguished from archaea by differences in their cell wall composition (containing peptidoglycan) and unique rRNA sequences. This domain includes most of the common bacteria and cyanobacteria found in everyday environments.
  </p>,
  <p key="b6-p-s412-eukarya" style={{ margin: "6px 0 12px 20px", textAlign: "justify" }}>
    • <strong>Eukarya.</strong> This domain includes all organisms whose cells contain a membrane-bound nucleus and other membrane-bound organelles. Eukarya encompasses all complex, multicellular life forms, as well as many single-celled eukaryotes. The Eukarya domain is further subdivided into four kingdoms: Protista, Fungi, Plantae, and Animalia. This molecular-based three-domain system replaced earlier classification models (such as the two-, three-, and five-kingdom systems which were based more on morphological features or mode of nutrition) to better reflect true evolutionary relationships (phylogeny).
  </p>,

  // 4.13 Mutualism
  <SecHd key="b6-sec-s413" id="s413" label="4.13" title="Classical Examples of Mutualism" />,

  <p key="b6-p-s413-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    The interactions between members of different groups of organisms, such as lichens and pollinators, are classic examples of <strong>mutualism,</strong> where both interacting species benefit from the relationship.
  </p>,

  <SubHd key="b6-sub-s413-1" id="s413-lichens" label="I." title="Interactions within Lichens" />,

  <p key="b6-p-s413-lichen-def" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    A lichen is a single, stable, composite life form resulting from an intimate symbiotic association between two or more organisms: a fungus (mycobiont) and a photosynthetic partner (photobiont), which is either a green alga or a cyanobacterium.
  </p>,

  <p key="b6-p-s413-fungus" style={{ margin: "6px 0 6px 20px", textAlign: "justify" }}>
    • <strong>Fungus's Role.</strong> The fungus forms the structural body (thallus) of the lichen, providing a protective, stable environment and anchor to a substrate (like rock or bark). Its filaments absorb water and essential minerals from the environment (air, rain, surface), which are then made available to the alga.
  </p>,
  <p key="b6-p-s413-alga" style={{ margin: "6px 0 6px 20px", textAlign: "justify" }}>
    • <strong>Alga/Cyanobacterium's Role.</strong> The photosynthetic partner produces carbohydrates (food/sugars) through photosynthesis, providing a constant carbon source for both organisms. If the partner is a cyanobacterium, it can also fix atmospheric nitrogen, providing an additional crucial nutrient to the association.
  </p>,
  <p key="b6-p-s413-lichen-dyn" style={{ margin: "6px 0 12px 20px", textAlign: "justify" }}>
    • <strong>Overall Dynamic.</strong> This obligate mutualism allows lichens to survive in harsh, resource-poor environments (<em>e.g.,</em> bare rock, arctic tundra) where neither partner could survive on its own.
  </p>,

  <SubHd key="b6-sub-s413-2" id="s413-pollinators" label="II." title="Interactions with Pollinators" />,

  <p key="b6-p-s413-poll-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Pollinators (insects, <em>e.g.,</em> bees, butterflies, beetles, and vertebrates such as birds and bats) interact with flowering plants in a vital mutualistic relationship that is often the result of millions of years of coevolution.
  </p>,
  <p key="b6-p-s413-poll-role" style={{ margin: "6px 0 6px 20px", textAlign: "justify" }}>
    • <strong>Pollinator's Role.</strong> Pollinators visit flowers to obtain resources, primarily energy-rich <strong>nectar</strong> and protein-rich <strong>pollen.</strong> As they forage for these rewards, pollen inadvertently stick to their bodies.
  </p>,
  <p key="b6-p-s413-plant-role" style={{ margin: "6px 0 6px 20px", textAlign: "justify" }}>
    • <strong>Plant's Role.</strong> The plant uses the pollinator as a vector to transfer pollen from the male reproductive organ (anther) of one flower to the female reproductive organ (stigma) of the same or another flower of the same species. This process enables fertilization, leading to the production of seeds and fruits, which ensures the plant's reproductive success and genetic diversity.
  </p>,
  <p key="b6-p-s413-poll-dyn" style={{ margin: "6px 0 12px 20px", textAlign: "justify" }}>
    • <strong>Overall Dynamic.</strong> Plants have evolved diverse floral traits (bright colours, specific shapes, scents, nectar guides) to attract specific, efficient pollinators, while pollinators have evolved specialized behaviors and morphologies (<em>e.g.,</em> long proboscises, branched hairs for pollen collection) to efficiently access floral rewards and transfer pollen. This interaction is critical to global biodiversity and food production.
  </p>,

  // 4.14 Ecological Role
  <SecHd key="b6-sec-s414" id="s414" label="4.14" title="Ecological Role of Diverse Organisms" />,

  <p key="b6-p-s414-intro" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Diverse organisms are crucial for healthy ecosystems, performing vital functions like nutrient cycling (bacteria, worms), energy flow (producers, consumers, decomposers), gas exchange (plants), pollination (insects), water purification (plants), soil formation, and providing natural resilience against stresses like disease or drought, ultimately ensuring ecosystem stability, productivity, and the survival of all life, including humans. Each species, from microbes to large animals, occupies a unique niche, contributing essential services that support the entire web of life.
  </p>,

  <p key="b6-p-s414-keyhd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, margin: "12px 0 6px" }}>Key Ecological Roles</p>,

  <p key="b6-p-s414-kr1" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Energy and Nutrient Cycling.</strong> Producers (plants) convert sunlight to energy; consumers eat them; decomposers (fungi, bacteria) breakdown dead matter, returning nutrients to the soil, essential for plant growth.
  </p>,
  <p key="b6-p-s414-kr2" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Gas Regulation.</strong> Plants perform photosynthesis, producing oxygen, while also absorbing atmospheric gases, helping regulate climate.
  </p>,
  <p key="b6-p-s414-kr3" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Water Purification.</strong> Aquatic plants filter water, making it cleaner for other organisms and human use.
  </p>,
  <p key="b6-p-s414-kr4" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Soil Health and Formation.</strong> Earthworms and microbes enrich soil with organic matter, improving structure, aeration, and fertility, preventing erosion.
  </p>,
  <p key="b6-p-s414-kr5" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Pollination and Seed Dispersal.</strong> Bees, birds, and other animals move pollen and seeds, crucial for plant reproduction and food webs.
  </p>,
  <p key="b6-p-s414-kr6" style={{ margin: "5px 0 12px 20px", textAlign: "justify" }}>
    • <strong>Pest Control.</strong> Predators (like ladybugs) keep pest populations in check, reducing reliance on chemical controls.
  </p>,

  <p key="b6-p-s414-importhd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "12px 0 6px" }}>
    • Importance of Diversity
  </p>,

  <p key="b6-p-s414-imp1" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Stability and Resilience.</strong> Diverse ecosystems are better equipped to withstand disturbances (drought, pests, disease) and recover more effectively.
  </p>,
  <p key="b6-p-s414-imp2" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Productivity.</strong> More species often means more efficient use of resources, leading to greater overall ecosystem productivity.
  </p>,
  <p key="b6-p-s414-imp3" style={{ margin: "5px 0 5px 20px", textAlign: "justify" }}>
    • <strong>Ecosystem Services.</strong> Biodiversity provides humans with clean air, fresh water, medicines, food, and raw materials.
  </p>,
  <p key="b6-p-s414-imp4" style={{ margin: "5px 0 20px 20px", textAlign: "justify" }}>
    • <strong>Interconnectedness.</strong> The loss of one species can disrupt food webs and essential functions, creating a negative ripple effect throughout the ecosystem.
  </p>,
];

// ── COMBINED TOC ──────────────────────────────────────────────
const TOC = [
  { id: "s41", label: "4.1", title: "Diversity in Living Organisms (Biodiversity)", level: 1 },
  { id: "s41ways", label: "", title: "Ways of expressing Biodiversity", level: 2 },
  { id: "s411", label: "4.1.1", title: "Why Biodiversity Matters", level: 2 },
  { id: "s42", label: "4.2", title: "Classification of Living Organisms", level: 1 },
  { id: "s421", label: "4.2.1", title: "Basis of Classification", level: 2 },
  { id: "s422", label: "4.2.2", title: "Importance of Classification", level: 3 },
  { id: "s423", label: "4.2.3", title: "Classification and Evolution", level: 3 },
  { id: "s424", label: "4.2.4", title: "Kingdoms of the Living Organisms", level: 2 },
  { id: "s43", label: "4.3", title: "Kingdom : Monera", level: 1 },
  { id: "s44", label: "4.4", title: "Kingdom : Protista", level: 1 },
  { id: "s45", label: "4.5", title: "Kingdom : Fungi", level: 1 },
  { id: "s46", label: "4.6", title: "Kingdom : Plantae", level: 1 },
  { id: "s461", label: "4.6.1", title: "Characters of Plantae", level: 2 },
  { id: "s462", label: "4.6.2", title: "Classification of Kingdom Plantae", level: 2 },
  { id: "s463", label: "4.6.3", title: "Division : Thallophyta (Algae)", level: 2 },
  { id: "s464", label: "4.6.4", title: "Division : Bryophyta", level: 2 },
  { id: "s465", label: "4.6.5", title: "Division : Pteridophyta", level: 2 },
  { id: "s466", label: "4.6.6", title: "Gymnosperms", level: 2 },
  { id: "s467", label: "4.6.7", title: "Angiosperms", level: 2 },
  { id: "s47", label: "4.7", title: "Kingdom : Animalia", level: 1 },
  { id: "s471", label: "4.7.1", title: "Characters of Animalia", level: 2 },
  { id: "s472", label: "4.7.2", title: "Classification of Animalia", level: 2 },
  { id: "s473", label: "4.7.3", title: "Phylum : Porifera", level: 2 },
  { id: "s474", label: "4.7.4", title: "Phylum : Coelenterata/Cnidaria", level: 2 },
  { id: "s475", label: "4.7.5", title: "Phylum : Platyhelminthes", level: 2 },
  { id: "s476", label: "4.7.6", title: "Phylum : Nematoda/Aschelminthes", level: 2 },
  { id: "s477", label: "4.7.7", title: "Phylum : Annelida", level: 2 },
  { id: "s478", label: "4.7.8", title: "Phylum : Arthropoda", level: 2 },
  { id: "s479", label: "4.7.9", title: "Phylum : Mollusca", level: 2 },
  { id: "s4710", label: "4.7.10", title: "Phylum : Echinodermata", level: 2 },
  { id: "s4711", label: "4.7.11", title: "Phylum : Chordata", level: 2 },
  { id: "s48",   label: "4.8",    title: "Classification of Phylum Chordata", level: 1 },
  { id: "s481",  label: "4.8.1",  title: "Sub-phylum : Protochordata", level: 2 },
  { id: "s482",  label: "4.8.2",  title: "Sub-phylum : Vertebrata", level: 2 },
  { id: "s4821", label: "4.8.2.1", title: "Class : Pisces", level: 3 },
  { id: "s4822", label: "4.8.2.2", title: "Class Amphibia", level: 3 },
  { id: "s4823", label: "4.8.2.3", title: "Class Reptilia", level: 3 },
  { id: "s4824", label: "4.8.2.4", title: "Class Aves", level: 3 },
  { id: "s4825", label: "4.8.2.5", title: "Class Mammalia", level: 3 },
  { id: "s49",   label: "4.9",    title: "Taxonomy", level: 1 },
  { id: "s491",  label: "4.9.1",  title: "Hierarchy of Classification-groups", level: 2 },
  { id: "s410",  label: "4.10",   title: "Nomenclature", level: 1 },
  { id: "s4101", label: "4.10.1", title: "What is nomenclature?", level: 2 },
  { id: "s4102", label: "4.10.2", title: "Common vernacular and Scientific names", level: 3 },
  { id: "s4103", label: "4.10.3", title: "Binomial nomenclature", level: 2 },
  { id: "s411",  label: "4.11",   title: "Acellular Entities – Viruses", level: 1 },
  { id: "s412",  label: "4.12",   title: "Three-Domain Classification", level: 1 },
  { id: "s413",  label: "4.13",   title: "Classical Examples of Mutualism", level: 1 },
  { id: "s413-lichens",     label: "I.",  title: "Interactions within Lichens", level: 2 },
  { id: "s413-pollinators", label: "II.", title: "Interactions with Pollinators", level: 2 },
  { id: "s414",  label: "4.14",   title: "Ecological Role of Diverse Organisms", level: 1 },
];

const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
  ...content_b5,
  ...content_b6,
];

export default function Chapter4() {
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
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)", maxWidth: "min(100%, 75rem)", margin: "0 auto" }}>
        <ChapterCover />
        {allContent}
      </div>
    </div>
  );
}
