"use client";
import { useState, useEffect } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P  = "#f9eef4";

// ── FONTS ─────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ── INLINE MATH ───────────────────────────────────────────────
const Sup = ({ c }) => <sup style={{ fontSize: "0.72em" }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em" }}>{c}</sub>;

const Frac = ({ n, d }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center",
    verticalAlign: "middle", lineHeight: 1.25, margin: "0 3px", fontSize: "0.95em" }}>
    <span style={{ borderBottom: "1.5px solid #1a1a1a", padding: "0 4px 1px",
      textAlign: "center", whiteSpace: "nowrap" }}>{n}</span>
    <span style={{ padding: "1px 4px 0", textAlign: "center", whiteSpace: "nowrap" }}>{d}</span>
  </span>
);

const MathBlock = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 20px",
    fontStyle: "italic", fontSize: "14.5px", lineHeight: 1.6 }}>{children}</div>
);

const Arrow = () => <span style={{ margin: "0 6px" }}>⟶</span>;
const Eq   = () => <span style={{ margin: "0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin: "0 4px" }}>×</span>;

const ChemEq = ({ lhs, rhs, arrow = "forward", topLabel, bottomLabels }) => {
  const arrowChar = arrow === "eq" ? "⇌" : arrow === "reverse" ? "⟵" : "⟶";
  return (
    <div style={{ textAlign: "center", margin: "16px 20px", fontSize: 14.5, lineHeight: 1.7 }}>
      <span>{lhs}</span>
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center",
        verticalAlign: "middle", margin: "0 10px", fontSize: "0.85em" }}>
        {topLabel && <span style={{ fontSize: 11, color: "#555" }}>{topLabel}</span>}
        <span style={{ fontSize: 18 }}>{arrowChar}</span>
      </span>
      <span>{rhs}</span>
      {bottomLabels && (
        <div style={{ display: "flex", justifyContent: "center", gap: 80,
          fontSize: 12, color: "#555", marginTop: 2 }}>
          {bottomLabels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  );
};

// ── HEADING HIERARCHY ─────────────────────────────────────────
const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
      fontWeight: 800, color: P_COLOR, textTransform: "uppercase",
      letterSpacing: "0.5px", margin: 0 }}>
      {label}. {title}
    </h2>
    <div style={{ borderTop: "1.5px solid #c0126a", marginTop: 4 }} />
  </div>
);

const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
    fontWeight: 700, color: P_COLOR, margin: "16px 0 8px" }}>{label}. {title}</h3>
);

const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5,
    fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>{label}. {title}</h4>
);

// ── PARAGRAPH ─────────────────────────────────────────────────
const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 8px", textAlign: "justify", ...style }}>{children}</p>
);

// ── CONTENT BLOCKS ────────────────────────────────────────────
const DefBox = ({ children }) => (
  <div style={{ border: "1.5px solid #888", padding: "10px 16px", margin: "12px 0",
    fontStyle: "italic", background: "#fafafa", fontSize: "14px", lineHeight: 1.55 }}>
    {children}
  </div>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border: "1.5px solid #888", borderLeft: "5px solid #c0126a", margin: "18px 0" }}>
    <div style={{ textAlign: "center", fontWeight: 800,
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontSize: 13.5, textDecoration: "underline", padding: "8px 12px 2px" }}>
      ACTIVITY {num}.
    </div>
    {sub && <div style={{ textAlign: "center", color: P_COLOR, fontStyle: "italic",
      fontSize: 13, padding: "2px 16px 8px" }}>{sub}</div>}
    <div style={{ padding: "8px 16px 12px" }}>{children}</div>
  </div>
);

const ActHd = ({ children }) => (
  <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
    color: P_COLOR, fontSize: 13.5, margin: "8px 0 5px" }}>{children}</p>
);

const KBBox = ({ children }) => (
  <div style={{ border: "2px solid #c0126a", margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 13, letterSpacing: 2, padding: "5px 14px" }}>
      KNOWLEDGEBOOSTER
    </div>
    <div style={{ padding: "10px 16px 12px" }}>{children}</div>
  </div>
);

const KBHd = ({ children }) => (
  <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
    color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>{children}</p>
);

const FeatureBox = ({ title, children }) => (
  <div style={{ border: "2px solid #888", margin: "18px 0", padding: "12px 16px" }}>
    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800,
      color: P_COLOR, fontSize: 14, margin: "0 0 8px" }}>{title}</p>
    {children}
  </div>
);

const ProblemsBox = ({ children }) => (
  <div style={{ border: "2px solid #c0126a", margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", textAlign: "center",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 16, letterSpacing: 2, padding: 7 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding: "12px 18px" }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize: "12px", color: "#555", fontStyle: "italic", display: "block",
    marginTop: 8, paddingTop: 6, borderTop: "1px solid #ddd" }}>
    <sup style={{ color: P_COLOR, fontWeight: 700, marginRight: 1 }}>*</sup>
    {children}
  </span>
);

const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "20px auto", textAlign: "center", maxWidth: "90%" }}>
    <img src={src} alt={caption || num || "figure"}
      style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd",
        display: "block", margin: "0 auto" }}
      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
    />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center",
      border: "1.5px dashed #c0126a", background: LIGHT_P, minHeight: 80,
      padding: "12px 20px", color: P_COLOR,
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{ marginLeft: 6 }}>{src}</code>
    </div>
    {(num || caption) && (
      <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic",
        margin: "6px auto 0", maxWidth: 480, lineHeight: 1.45 }}>
        {num && <strong style={{ color: P_COLOR, fontStyle: "normal" }}>{num}. </strong>}
        {caption}
      </p>
    )}
  </div>
);

const NumericalSection = ({ topic, children }) => (
  <div style={{ margin: "20px 0", border: "1.5px solid #c0126a" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 14px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900,
      fontSize: 12, letterSpacing: 1 }}>
      NUMERICAL PROBLEMS BASED ON {topic}
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);

const th = {
  border: "1.5px solid #555", padding: "6px 10px", textAlign: "center",
  fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif",
  fontSize: 13, background: "#f0f0f0"
};
const td = {
  border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5
};

// ── HAMBURGER / BACKDROP / SIDEBAR ────────────────────────────
function HamburgerBtn({ open, setOpen }) {
  const bar = { width: 20, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.25s" };
  return (
    <button
      onClick={() => setOpen(o => !o)}
      style={{
        position: "fixed", top: 14, left: 14, zIndex: 1100,
        background: P_COLOR, border: "none",
        borderRadius: 4, width: 36, height: 36, cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 5, padding: 0,
      }}>
      <span style={{ ...bar, transform: open ? "translateY(7.5px) rotate(45deg)" : "none" }} />
      <span style={{ ...bar, opacity: open ? 0 : 1 }} />
      <span style={{ ...bar, transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
    </button>
  );
}

function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.35)", cursor: "pointer",
    }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1080,
      width: open ? 260 : 0, height: "100vh",
      background: "#fff",
      borderRight: open ? "2px solid #f0c8dc" : "none",
      boxShadow: open ? "3px 0 16px rgba(0,0,0,0.18)" : "none",
      transition: "width 0.28s ease",
      overflowY: open ? "auto" : "hidden", overflowX: "hidden",
    }}>
      <div style={{ padding: "56px 0 20px", minWidth: 260 }}>
        <div style={{
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: P_COLOR,
          letterSpacing: 1, textTransform: "uppercase",
          padding: "0 16px 10px",
        }}>Contents</div>
        <nav>
          {tocItems.map((item, i) => (
            <div key={item.id} onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                padding: item.level === 1 ? "6px 16px" : item.level === 2 ? "4px 24px" : "3px 32px",
                fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: item.level === 1 ? 700 : 400,
                fontSize: item.level === 1 ? 12 : 11,
                color: item.level === 1 ? P_COLOR : "#444",
                borderLeft: item.level === 1 ? `3px solid ${P_COLOR}` : "none",
                background: hovered === i ? LIGHT_P : "transparent",
                lineHeight: 1.4, whiteSpace: "nowrap",
              }}>
              {item.label && <span style={{ marginRight: 5 }}>{item.label}.</span>}{item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ── CHAPTER COVER ─────────────────────────────────────────────
const ChapterCover = () => (
  <div style={{
    textAlign: "center",
    background: "linear-gradient(135deg, #c0126a 0%, #e87aaf 50%, #f2a7c8 100%)",
    padding: "48px 24px 52px",
    marginBottom: 10,
  }}>
    <div style={{
      display: "inline-block", border: "3px solid #fff",
      width: 64, height: 64, lineHeight: "58px", textAlign: "center",
      fontSize: 32, fontWeight: 900, fontFamily: "'Merriweather Sans',Arial,sans-serif",
      color: "#fff", marginBottom: 22,
    }}>1</div>
    <h1 style={{
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 24, color: "#fff",
      letterSpacing: "1.5px", textTransform: "uppercase", margin: 0, lineHeight: 1.35,
    }}>EXPLORING MIXTURES<br/>AND THEIR SEPARATION</h1>
  </div>
);

// ── TABLE SUB-COMPONENTS (Batch 1) ────────────────────────────
const BinarySolutionsTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Name of the solution</td>
          <td style={th}>Solute</td>
          <td style={th}>Solvent</td>
          <td style={th}>Examples</td>
        </tr>
      </thead>
      <tbody>
        <tr><td colSpan={4} style={{ ...td, fontWeight: 700, background: "#f9f9f9", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>Solid solutions</td></tr>
        <tr>
          <td style={td}><strong>1.</strong> Solid in solid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={td}>Alloys like stainless steel (iron = 74% + chromium = 18% + nickel = 8%), steel (iron = 99·95% + carbon = 0·05%) brass (copper = 70% + zinc = 30%), bronze (copper = 90% + tin = 10%), German silver (copper = 60% + zinc = 20% + nickel = 20%), solder (lead 50% + tin = 50%), etc.</td>
        </tr>
        <tr>
          <td style={td}><strong>2.</strong> Liquid in solid</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={td}>Hydrated crystals such as blue vitriol (hydrated copper sulphate), dental amalgam (mercury liquid and silver solid)</td>
        </tr>
        <tr>
          <td style={td}><strong>3.</strong> Gas in solid</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={td}>Gases adsorbed over the surface of metals (such as nickel, palladium, platinum, etc.) under pressure</td>
        </tr>
        <tr><td colSpan={4} style={{ ...td, fontWeight: 700, background: "#f9f9f9", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>Liquid solutions</td></tr>
        <tr>
          <td style={td}><strong>4.</strong> Solid in liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={td}>Sugar, common salt or other salts dissolved in water, tincture of iodine.</td>
        </tr>
        <tr>
          <td style={td}><strong>5.</strong> Liquid in liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={td}>Mixture of two miscible liquids such as acetone and water, alcohol and water, vinegar (acetic acid and water), etc.</td>
        </tr>
        <tr>
          <td style={td}><strong>6.</strong> Gas in liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={td}>Aerated drinks. Here, carbon dioxide is dissolved in water under pressure.</td>
        </tr>
        <tr><td colSpan={4} style={{ ...td, fontWeight: 700, background: "#f9f9f9", fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>Gaseous solutions</td></tr>
        <tr>
          <td style={td}><strong>7.</strong> Solid in gas</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={td}>Camphor in air or iodine in air.</td>
        </tr>
        <tr>
          <td style={td}><strong>8.</strong> Liquid in gas</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={td}>Clouds and fog. Here, water drops (liquid) are dispersed in gas (air).</td>
        </tr>
        <tr>
          <td style={td}><strong>9.</strong> Gas in gas</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={td}>Air is a mixture of gases like nitrogen, oxygen, carbon dioxide, inert gases, etc.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const SolubilityTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 1.1. Solubility at different temperatures.
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th} rowSpan={2}>Substance dissolved</td>
          <td style={th} colSpan={5}>Solubility in grams/100 gram of water at different temperatures (K)</td>
        </tr>
        <tr>
          <td style={th}>283</td><td style={th}>293</td><td style={th}>313</td><td style={th}>333</td><td style={th}>353</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["Potassium nitrate", 21, 32, 62, 106, 167],
          ["Sodium chloride",   36, 36, 36, 37,  37],
          ["Potassium chloride",35, 35, 40, 46,  54],
          ["Ammonium chloride", 24, 37, 41, 55,  66],
        ].map(([name, ...vals]) => (
          <tr key={name}>
            <td style={td}>{name}</td>
            {vals.map((v, i) => <td key={i} style={{ ...td, textAlign: "center" }}>{v}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── CONTENT ARRAY — BATCH 1 ───────────────────────────────────
const content_b1 = [
  <ChapterCover key="cover" />,
  // 1.1 Introduction
  <SecHd key="sec-s11" id="s11" label="1.1" title="Introduction" />,
  <p key="b1-p-s11-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We daily consume a number of things such as milk, ghee, iodised salt, sugar, water, soft drinks, juices,
    etc. How do we know that all these things are pure? For a common man, pure actually means having no
    adulteration. But for a scientist pure means <em>that it contains only one type of matter or particles.</em> For
    example, if we examine sugar under a microscope, we find that all the particles of sugar are the same.
    Therefore, <strong>sugar is a pure substance.</strong> On other hand, for a scientist, milk is actually a mixture of
    different substances such as water, fat, proteins, etc. and hence <em>not pure.</em> Similarly, ghee, iodized salt,
    soft drinks, juices, etc. are all mixtures of different substances and hence impure. When a scientist says
    something is pure, it <em>means that all the constituent particles of that substance are the same in their
    chemical nature.</em> Thus, a pure substance consists of a single type of matter. In other words,{" "}
    <em>a substance is a pure single form of matter.</em>
  </p>,
  <p key="b1-p-s11-2" style={{ textIndent: 28, textAlign: "justify" }}>
    If we look around, we see that most of the matter around us exists as mixtures of two or more pure
    components. For example, sea water, minerals, soil, etc. are all mixtures.
  </p>,

  // 1.2 What is a Mixture?
  <SecHd key="sec-s12" id="s12" label="1.2" title="What is a Mixture?" />,
  <p key="b1-p-s12-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <em>Mixtures are obtained by mixing more than one kind of pure form of matter.</em> We know that sodium
    chloride (common salt) dissolved in water can be separated from water by the physical process of
    evaporation. However, sodium chloride is itself a <em>pure substance</em> and it cannot be separated by any
    physical process into its chemical constituents, Na<Sup c="+" /> and Cl<Sup c="−" /> ions. Similarly,{" "}
    <em>sugar is a pure substance since it contains only one kind of pure matter and its composition is the same throughout.</em>
  </p>,
  <p key="b1-p-s12-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Soft drink and soil are not single pure substances. Whatever may be the source of a pure substance, it
    will always have the same characteristic properties. Thus, in a nutshell, we can say{" "}
    <em>that a mixture contains more than one pure substances.</em>
  </p>,

  // 1.3 Types of Mixtures
  <SecHd key="sec-s13" id="s13" label="1.3" title="Types of Mixtures" />,
  <p key="b1-p-s13-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Depending upon the nature of components which form a mixture, mixtures are classified into the following
    <em>two</em> types:
  </p>,
  <p key="b1-p-s13-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. Homogeneous mixtures</strong> and <strong>2. Heterogeneous mixtures</strong>
  </p>,
  <p key="b1-p-s13-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. Homogeneous mixtures.</strong> A homogeneous mixture is defined as follows:
  </p>,
  <DefBox key="def-s13-homo">
    A mixture is said to be <strong>homogeneous</strong> if all the components of the mixture are uniformly mixed and
    there is no boundaries of separation between them.
  </DefBox>,
  <p key="b1-p-s13-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Some homogeneous mixtures used in daily life are: alloys (steel, brass, bronze), a mixture of sugar or
    common salt in water, rain water, sea water, rectified spirit, gasoline, vinegar, carbonated soda (coca-cola,
    pepsi, limica), lemonade, orange juice, apple juice, honey, tea, ice tea, wine, beer, coffee, perfume, blood
    plasma, mouthwash, hand sanitizer, laundry detergent, dish-washer detergent, antifreeze, air, natural gas,
    cooking gas etc.
  </p>,
  <p key="b1-p-s13-5" style={{ textIndent: 28, textAlign: "justify" }}>
    In fact, all homogeneous mixtures can be called solutions.
  </p>,
  <p key="b1-p-s13-6" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2. Heterogeneous mixtures.</strong> A heterogeneous mixture is defined as follows:
  </p>,
  <DefBox key="def-s13-hetero">
    A mixture is said to be <strong>heterogeneous</strong> if all the components of the mixture are not thoroughly
    mixed and there are visible boundaries of separation between them.
  </DefBox>,
  <p key="b1-p-s13-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Some heterogeneous mixtures used in daily life are:
  </p>,
  <p key="b1-p-s13-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Vegetable soup, chicken noodle soup, fruit salad, mixed nuts, milk, milk with nuts, cereals, pizza, butter,
    mayonnaise, salsa, blood, smoke, soil, sand, concrete, granite, orange juice with pulp, muddy water,
    toothpaste, shaving cream, sand and iron filings, sand and water, sand and sulphur, chalk or wheat flour
    and water, gun powder, chocolate chip cookies, ice-cube in drinks, soap-water we use to wash clothes,
    oil in water, soil and oil, etc.
  </p>,

  // Activity 1.1
  <ActivityBox key="act-1-1" num="1.1"
    sub="(To illustrate the concept of homogeneous and heterogeneous mixtures, carry out the following activity)">
    <ActHd>Experimental Details of Activity.</ActHd>
    <ul style={{ paddingLeft: 22, margin: "6px 0 8px", listStyleType: "disc", fontSize: 14, lineHeight: 1.7 }}>
      <li>Divide the class into four groups: A, B, C and D.</li>
      <li>Ask students of group A to dissolve one spatula full of copper sulphate in 50 mL of water in a beaker
        and students of group B to dissolve two spatula full of copper sulphate in 50 mL of water in another beaker.</li>
      <li>Ask students of group C and D to take different amounts of copper sulphate and potassium
        permanganate or common salt and mix them thoroughly in a pestle and mortar.</li>
    </ul>
    <ActHd>Observations.</ActHd>
    <P2>(<em>i</em>) Both groups A and B have obtained homogeneous mixtures since the composition of these
      mixtures or solutions is uniform throughout.</P2>
    <P2>(<em>ii</em>) Although both the groups have obtained copper sulphate solutions but the intensity of blue colour
      is different. The intensity of blue colour obtained by group B which contains two spatula full of copper
      sulphate is much higher than the solution obtained by group A which contains one spatula full of copper sulphate.</P2>
    <P2>(<em>iii</em>) Both groups C and D have obtained heterogeneous mixtures since they not only have physically
      distinct boundaries but also their composition is not uniform.</P2>
    <ActHd>Conclusion.</ActHd>
    <P2>(<em>i</em>) Soluble substances such as copper sulphate, common salt or sugar when dissolved in water form
      homogeneous mixture whose composition depends upon the amount of the substance dissolved.</P2>
    <P2>(<em>ii</em>) When two or more solids which do not react chemically are mixed they always form heterogeneous
      mixtures.</P2>
  </ActivityBox>,

  <p key="b1-p-s13-9" style={{ textIndent: 28, textAlign: "justify" }}>
    According to another classification, mixtures are of the following <strong>three types:</strong>
  </p>,
  <p key="b1-p-s13-10" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. Solutions</strong>&nbsp;&nbsp;<strong>2. Suspensions</strong> and&nbsp;&nbsp;<strong>3. Colloidal solutions.</strong>
  </p>,

  // 1.4 What is a Solution?
  <SubHd key="sub-s14" id="s14" label="1.4" title="What is a Solution?" />,
  <DefBox key="def-s14-1">
    <em>A solution is defined as a homogeneous mixture of two or more chemically non-reacting
    substances whose composition can be varied within limits.</em>
  </DefBox>,
  <p key="b1-p-s14-1" style={{ textIndent: 28, textAlign: "justify" }}>
    It may be noted that all mixtures are not solutions. If a mixture is to be called as solution, it must satisfy
    the following <em>two</em> conditions:
  </p>,
  <p key="b1-p-s14-2" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) the components of a mixture should be non-reacting and (<em>ii</em>) mixture should be homogeneous.
  </p>,
  <p key="b1-p-s14-3" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, lemonade is a solution of sugar, salt and lemon juice in water. These four components of
    the solution do not react with each other since each constituent has its own taste in the lemonade. Instead
    the particles of sugar, salt and lemon juice mix with particles of water so thoroughly that we cannot see
    them even under a microscope. Thus, <em>in solutions, there is homogeneity at the particle level, i.e.,</em>{" "}
    lemonade tastes the same throughout.
  </p>,
  <p key="b1-p-s14-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Another example of a homogeneous mixture from our daily life is <em>vinegar</em> which is a 5–8% solution of
    acetic acid in water.
  </p>,

  // 1.4.1
  <SubHd key="sub-s141" id="s141" label="1.4.1" title="Why is a solution called a true Solution?" />,
  <p key="b1-p-s141-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The solutions of sugar, common salt, acetic acid, etc. in water are called true solutions because in these
    solutions, the particles of the solute (sugar, salt, acetic acid, etc.) are so thoroughly mixed with water
    that we cannot distinguish one from the other.
  </p>,

  // 1.4.2
  <SubHd key="sub-s142" id="s142" label="1.4.2" title="Aqueous and Non-aqueous Solutions" />,
  <p key="b1-p-s142-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Most of the substances are soluble in water. That is why water is sometimes called a{" "}
    <strong>'Universal solvent'.</strong> However, all substances do not dissolve in water. Therefore, other solvents
    such as ether, benzene, alcohol, carbon disulphide, carbon tetrachloride, etc. are also used to prepare
    solutions. <em>A solution in which water acts as the solvent is called an </em><strong>aqueous solution</strong>
    <em> while the one in which any other liquid acts as the solvent is called a </em><strong>non-aqueous solution.</strong>{" "}
    For example, the solution of common salt or sugar in water is called an aqueous solution. However,
    solution of bromine in carbon tetrachloride, sulphur in carbon disulphide, iodine in alcohol (
    <em>tincture of iodine</em>) are called non-aqueous solutions.
  </p>,

  // 1.4.3
  <SubSubHd key="sub-s143" id="s143" label="1.4.3" title="Components of a Solution" />,
  <p key="b1-p-s143-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In principle, any number of components or constituents may be present in a solution. For example, sea
    water is a solution of many components such as sodium chloride, magnesium chloride, calcium chloride,
    magnesium sulphate, etc. of which sodium chloride is the main component. However, for sake of
    convenience, we shall discuss here only <strong>binary solutions.</strong> Such solutions have only two components
    or constituents. These are called <strong>solute</strong> and the <strong>solvent.</strong>
  </p>,
  <p key="b1-p-s143-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <em>In a binary solution, the component dissolved is called the </em><strong>solute</strong>
    <em> and the medium in which it is dissolved is called the </em><strong>solvent. </strong>
    In other words, <em>the component of the solution which is present in small amount is called the </em>
    <strong>solute</strong><em> while the component of the solution which is present in large amount is called the </em>
    <strong>solvent.</strong> For example, when sugar is dissolved in water to prepare sugar solution, sugar is called
    the solute while water is called the solvent.
  </p>,

  // 1.4.4
  <SubHd key="sub-s144" id="s144" label="1.4.4" title="Types of Solutions" />,
  <p key="b1-p-s144-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We know that substances ordinarily exist in three states (phases), <em>i.e.,</em> solid, liquid and gas. In binary
    solutions, each one of these phases can act as a solute or as a solvent. Therefore, there are <em>nine</em> different
    types of binary solutions. These have been further divided into the following <strong>three</strong> categories depending
    upon the nature of the substance acting as the solvent. These are:
  </p>,
  <p key="b1-p-s144-2" style={{ margin: "4px 0 4px 28px" }}>
    <strong>1. Solid solutions.</strong> In these solutions, solid acts as the solvent.
  </p>,
  <p key="b1-p-s144-3" style={{ margin: "4px 0 4px 28px" }}>
    <strong>2. Liquid solutions.</strong> In these solutions, liquid acts as the solvent.
  </p>,
  <p key="b1-p-s144-4" style={{ margin: "4px 0 10px 28px" }}>
    <strong>3. Gaseous solutions.</strong> In these solutions, gas acts as the solvent.
  </p>,
  <p key="b1-p-s144-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us now briefly discuss some examples of each of the above three types:
  </p>,
  <p key="b1-p-s144-6" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. Solid solutions.</strong> In solid solutions, a solid is the solvent while solute can be either a solid,
    liquid or a gas. Some examples are:
  </p>,
  <p key="b1-p-s144-7" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) Alloys are examples of solid in solid solutions. In fact, alloys are homogeneous mixtures of two or
    more metals or a metal and a non-metal. Although the components (<em>i.e.,</em> constituent metals) of an alloy
    cannot be separated by physical methods, yet an alloy is considered to be a mixture because it shows the
    properties of its constituents and can have variable composition. For example, amount of zinc in brass
    can vary from 20–35% while that of copper can vary from 65–80%.
  </p>,
  <p key="b1-p-s144-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Pure gold is 24 carat. It is very soft and is, therefore, not suitable for making jewellery. To make it hard,
    it is alloyed with either copper or silver. In India, generally 22 carat gold is used for making ornaments.
    This means 22 parts by weight of pure gold is alloyed with 2 parts by weight of either copper or silver.
  </p>,
  <p key="b1-p-s144-9" style={{ textIndent: 28, textAlign: "justify" }}>
    An example of an alloy of a metal and a non-metal is steel. It is an alloy of iron (metal) and a small
    amount (0·05%) of carbon (non-metal).
  </p>,
  <p key="b1-p-s144-10" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) Hydrated salts, <em>i.e.,</em> salts containing water of crystallization such as hydrated copper sulphate
    (blue vitriol), hydrated ferrous sulphate (green vitriol), hydrated magnesium sulphate (white vitriol),
    etc. are examples of liquid in solid solutions.
  </p>,
  <p key="b1-p-s144-11" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iii</em>) Gases adsorbed on the surface of metals such as nickel, platinum, palladium, etc. are examples of
    gas in solid solutions.
  </p>,
  <p key="b1-p-s144-12" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2. Liquid solutions.</strong> In liquid solutions, a liquid is the solvent while the solute can be either a solid,
    liquid or a gas. Some examples are:
  </p>,
  <p key="b1-p-s144-13" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) A solution of sugar in water is an example of a solid in liquid solution. Here, sugar is the solute while
    water is the solvent. Another example is tincture of iodine. It is obtained by dissolving iodine in alcohol.
    Here, iodine is the solute while alcohol is the solvent. Brine (concentrated solution of common salt in
    water) is yet another example of solid in liquid solution.
  </p>,
  <p key="b1-p-s144-14" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) A mixture of two or more miscible liquids form liquid in liquid solutions. For example, rectified spirit
    which contains about 95% alcohol and about 5% water. Here, alcohol is solvent and water is the solvent.
    Similarly, petrol, kerosene oil and diesel are homogeneous mixtures of a number of liquid hydrocarbons.
  </p>,
  <p key="b1-p-s144-15" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iii</em>) Aerated drinks like soda water, coca-cola, pepsi, limica, etc. are gas in liquid solutions. These contain
    carbon dioxide (gas) as solute and water (liquid) as solvent.
  </p>,
  <p key="b1-p-s144-16" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>3. Gas solutions.</strong> In gas solutions, gas is the solvent while solute can be either a solid, liquid or a gas.
    Some examples are:
  </p>,
  <p key="b1-p-s144-17" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) Camphor in air or iodine in air are the examples of solid in gas solutions. Here, camphor or iodine
    (solid) is the solute while air (gas) is the solvent.
  </p>,
  <p key="b1-p-s144-18" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) Clouds, fog, mist, etc. are examples of liquid in gas solutions. Here, water drops (liquid solute) are
    dispersed in air (gas solvent).
  </p>,
  <p key="b1-p-s144-19" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iii</em>) Air is a mixture of gas in gas. Air is a homogeneous mixture of many gases. Its two main gases are
    oxygen (21%) and nitrogen (78%). The other gases (carbon dioxide, inert gases and water vapours) are,
    however, present in very small quantities (1%). Here, nitrogen gas acts as the solvent while other gases
    act as the solute.
  </p>,
  <p key="b1-p-s144-20" style={{ textIndent: 28, textAlign: "justify" }}>
    Similarly, natural gas is mainly a homogeneous mixture of methane along with small amounts of other
    hydrocarbons such as ethane, propane, butane, etc.
  </p>,
  <p key="b1-p-s144-21" style={{ textIndent: 28, textAlign: "justify" }}>
    The nine types of binary solutions discussed above are summarised in the following table:
  </p>,
  <BinarySolutionsTable key="tbl-binary" />,

  // 1.4.5
  <SubSubHd key="sub-s145" id="s145" label="1.4.5" title="Properties of Solutions" />,
  <p key="b1-p-s145-0" style={{ textIndent: 28, textAlign: "justify" }}>
    The main characteristics of a solution may be summed up as follows:
  </p>,
  <p key="b1-p-s145-1" style={{ margin: "4px 0 4px 0" }}>
    <strong>1.</strong> <em>A solution is a homogeneous mixture.</em>
  </p>,
  <p key="b1-p-s145-2" style={{ margin: "4px 0 4px 0" }}>
    <strong>2.</strong> <em>The components of a solution do not chemically react with one another.</em>
  </p>,
  <p key="b1-p-s145-3" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>3.</strong> <em>The particles of a solution are smaller than 1 nm (10<Sup c="−9" /> m) in diameter.</em> So, they
    cannot be seen by naked eyes or even under a microscope.
  </p>,
  <p key="b1-p-s145-4" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>4.</strong> Because of small size, <em>the solute particles do not scatter a beam</em> of light passing through
    the solution. Therefore, the path of light is not visible in a solution.
  </p>,
  <p key="b1-p-s145-5" style={{ margin: "4px 0 4px 0", textAlign: "justify" }}>
    <strong>5.</strong> <em>The particles of the solute in a solution pass through the filter paper</em> thereby showing that
    the solute particles are smaller than the pores of the filter paper.
  </p>,
  <p key="b1-p-s145-6" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>6.</strong> When the solution is allowed to stand undisturbed, the particles of the solute do not settle down.
    This shows that <em>solutions are stable.</em>
  </p>,
  <p key="b1-p-s145-7" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>7.</strong> <em>A solution is always transparent in nature.</em> It may be colourless or coloured. For example, a
    solution of sugar in water is colourless while that of copper sulphate in water has blue colour.
  </p>,

  // 1.4.6
  <SubSubHd key="sub-s146" id="s146" label="1.4.6" title="Saturated, Unsaturated and Supersaturated Solutions" />,
  <p key="b1-p-s146-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Saturated solution.</strong> When we dissolve a solute (<em>i.e.,</em> sugar) in a solvent (<em>i.e.,</em> water) with stirring,
    initially the sugar will dissolve readily in water. But after a while, the process of dissolution will become
    slower and slower. If, however, we keep on adding sugar to the solution formed with stirring, ultimately
    a stage will be reached when no more sugar will dissolve. Instead, it will start settling at the bottom of
    the beaker. Such a solution is called a saturated solution. Thus,
  </p>,
  <DefBox key="def-s146-sat">
    A solution which contains the maximum amount of solute dissolved in a given quantity of the
    solvent at the given temperature and which cannot dissolve any more solute at that temperature
    is called a <strong>saturated solution.</strong>
  </DefBox>,
  <p key="b1-p-s146-2" style={{ textIndent: 28, textAlign: "justify" }}>
    If to a saturated solution, more solute is added, it will remain undissolved. Thus, in a saturated solution,
    there is always an equilibrium between the dissolved and the undissolved solute. In other words, the rate
    at which the undissolved solute dissolves is equal to the rate at which the dissolved salt separates out of
    the solution and gets deposited. As a result, the amount of dissolved or the undissolved solute remains
    constant at a particular temperature.
  </p>,
  <p key="b1-p-s146-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Unsaturated solution.</strong> If a solution contains solute less than the maximum that it can dissolve at
    the given temperature, the solution is said to be unsaturated. In other words, an unsaturated solution may
    be defined as follows:
  </p>,
  <DefBox key="def-s146-unsat">
    A solution that can dissolve more solute in it at the given temperature is called an <strong>unsaturated solution.</strong>
  </DefBox>,
  <p key="b1-p-s146-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Thus, it is obvious that a saturated solution contains more solute than an unsaturated solution at a given
    temperature. For example,
  </p>,
  <p key="b1-p-s146-5" style={{ margin: "4px 0 8px 28px", textAlign: "justify" }}>
    (<em>i</em>) A maximum of 32 grams of potassium nitrate can be dissolved in 100 gram of water at 293 K.
    Thus, a saturated solution of potassium nitrate contains 32 grams of potassium nitrate at 293 K. Suppose
    we now dissolve 20 g of potassium nitrate in 100 g of water at 293 K, the solution so obtained would be
    unsaturated. This is because we can still dissolve 12 (32–20) gram more of potassium nitrate in the same
    amount (100 grams) of water at the same temperature to make a saturated solution.
  </p>,
  <p key="b1-p-s146-6" style={{ margin: "4px 0 8px 28px", textAlign: "justify" }}>
    (<em>ii</em>) A maximum of 36 grams of common salt (sodium chloride) can be dissolved in 100 grams of water
    at 293 K. Thus, a saturated solution of common salt contains 36 grams of common salt in 100 grams of
    water at 293 K. Suppose, we now dissolve 25 grams of common salt at 293 K, the solution so obtained
    will be unsaturated. This is because we can still dissolve 11 (36–25) gram of more common salt in the
    same amount (100 gram) of water at the same temperature to make a saturated solution.
  </p>,
  <p key="b1-p-s146-7" style={{ textIndent: 28, textAlign: "justify" }}>
    A saturated solution, however becomes unsaturated either on heating or on dilution.
  </p>,
  <p key="b1-p-s146-8" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Supersaturated solution.</strong> Besides saturated and unsaturated, there is another kind of solution called
    supersaturated solution. It is defined as follows:
  </p>,
  <DefBox key="def-s146-supersat">
    A solution which temporarily contains more solute than the saturation level (<em>i.e.,</em> the maximum
    solute) at a particular temperature is called the <strong>supersaturated solution.</strong>
  </DefBox>,
  <p key="b1-p-s146-9" style={{ fontWeight: 700, margin: "10px 0 5px" }}>Preparation of supersaturated solutions</p>,
  <p key="b1-p-s146-10" style={{ textIndent: 28, textAlign: "justify" }}>
    Many solid solutes are more soluble at higher temperatures than at lower temperatures. Sometimes when
    the solution of such a solid, prepared at higher temperature, is allowed to cool quickly, all the solute
    remains dissolved. This happens, even though it will not dissolve to that extent at the lower temperature.
    Sodium acetate and sodium thiosulphate are two such compounds which readily form supersaturated
    solutions. Honey is essentially a supersaturated solution of various sugars in water.
  </p>,
  <p key="b1-p-s146-11" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Test for saturated, unsaturated and supersaturated solutions.</strong> In order to test whether a given
    solution is saturated or unsaturated, add some more solute to this solution and try to dissolve by stirring
    with a glass rod keeping the temperature constant. If more solute does not dissolve in the given solution,
    then it must be a saturated solution and if more solute dissolves, it must be an unsaturated solution.
  </p>,
  <p key="b1-p-s146-12" style={{ textIndent: 28, textAlign: "justify" }}>
    On the other hand, supersaturated solution can be easily distinguished from the saturated solution either
    simply by shaking or by adding a crystal of the solute dissolved. If now a sizeable quantity of the solute
    quickly separates out from the solution as crystals, it is a supersaturated solution otherwise it is a
    saturated solution. Thus, a supersaturated solution unlike saturated solution is not stable.
  </p>,

  // 1.4.7 Solubility
  <SubHd key="sub-s147" id="s147" label="1.4.7" title="Solubility" />,
  <DefBox key="def-s147-sol">
    <em>The maximum amount of solute in grams which can be dissolved in 100 grams of the solvent at
    a given temperature to form a saturated solution is called the solubility of the solute in that
    solvent at that particular temperature.</em>
  </DefBox>,
  <p key="b1-p-s147-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In other words, concentration of solute in a saturated solution is the same as the solubility of the solute
    at that temperature. The solubility of the solute is expressed in grams per 100 grams of the solvent at a
    given temperature. For example, a maximum of 32 grams of potassium nitrate can be dissolved in 100
    grams of water at 20°C (293 K). Thus, <em>the solubility of potassium nitrate at 20°C (or 293 K) is 32 grams.</em>
  </p>,
  <p key="b1-p-s147-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Similarly, a maximum of 36 grams of common salt (sodium chloride) can be dissolved in 100 grams of
    water at 20°C (or 293 K), therefore, <em>the solubility of common salt in water at 20°C (or 293 K) is 36 grams.</em>
  </p>,
  <p key="b1-p-s147-3" style={{ textIndent: 28, textAlign: "justify" }}>
    It is interesting to note that different substances have different solubilities in the same solvent at a given
    temperature (Table 1.1).
  </p>,
  <p key="b1-p-s147-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <em>Alternatively,</em> the same substance may have different solubilities in different solvents. For example,
    sugar or common salt is more soluble in water than in alcohol.
  </p>,
  <p key="b1-p-s147-5" style={{ margin: "8px 0 4px" }}>
    <strong style={{ color: P_COLOR }}>Effect of Temperature and Pressure on Solubility.</strong> The following cases arise:
  </p>,
  <p key="b1-p-s147-6" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) <strong>Solubility of solids in liquids.</strong> When a saturated solution at a particular temperature (say room
    temperature) is heated, it becomes unsaturated. This is because <em>the solubility of a substance generally
    increases with increase* in temperature</em> (Table 1.1) <em>and hence more solute can be dissolved on increasing
    the temperature. If a saturated solution, at a particular temperature is cooled, then some of the dissolved
    solute will separate out in form of crystals. This is because solubility of solute in the solution decreases
    on cooling.</em>
  </p>,
  <SolubilityTable key="tbl-solubility" />,
  <p key="b1-p-s147-7" style={{ textIndent: 28, textAlign: "justify" }}>
    The solubility of solids in liquids, however, remains unaffected by changes in pressure.
  </p>,
  <p key="b1-p-s147-8" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) <strong>Solubility of gases in liquids.</strong> <em>The solubility of gases in liquids increases on decreasing the
    temperature or decreases on increasing the temperature.</em> For example, water contains dissolved oxygen.
    When water is boiled, the solubility of oxygen in water decreases and the excess oxygen escapes in form
    of bubbles.
  </p>,
  <p key="b1-p-s147-9" style={{ textIndent: 28, textAlign: "justify" }}>
    <em>The solubility of gases in liquids, however, increases on increasing the pressure and decreases on
    decreasing the pressure.</em> For example, during manufacture of cold drinks, carbon dioxide is dissolved in
    water under pressure. However, when a bottle of soft drink is opened, the pressure inside decreases and
    the solubility of carbon dioxide also decreases. So, the excess dissolved carbon dioxide escapes in form
    of bubbles.
  </p>,
  <FootNote key="fn-s147">However, there are a few salts such as cerium sulphate, lithium carbonate, sodium carbonate
    monohydrate, etc. whose solubility decrease with increase of temperature.</FootNote>,

  // 1.4.8
  <SubSubHd key="sub-s148" id="s148" label="1.4.8" title="Effect of Temperature on Solubility of Substances – Solubility Curves" />,
  <p key="b1-p-s148-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The solubility of a solute in a given solvent generally increases with temperature. The solubilities of
    some common inorganic compounds in water at different temperatures are given in Fig. 1.1. These curves
    are called <strong>solubility curves.</strong>
  </p>,
  <p key="b1-p-s148-2" style={{ textIndent: 28, textAlign: "justify" }}>
    It is evident from the Fig. 1.1, most of the salts (<em>e.g.,</em> KNO<Sub c="3" />, NH<Sub c="4" />Br) show{" "}
    <em>marked increase</em> in solubility with increase in temperature. Some of them (<em>i.e.,</em> NaCl) show only a
    small increase in solubility with rise in temperature. However, there are only a few substances (<em>e.g.,</em>{" "}
    anhydrous sodium sulphate, Na<Sub c="2" />SO<Sub c="4" /> and cerium sulphate, Ce<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" />{" "}
    which show <strong>decrease</strong> in solubility with rise in temperature.
  </p>,
  <Fig key="fig-1-1"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//adf428ad-487a-4277-99d6-8efe28c9a91d/markdown_2/imgs/img_in_chart_box_420_263_799_722.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A45Z%2F-1%2F%2F7bf05f7278e54ccd0a97f20091c13dd7d4f7fb1dc2478c702ae8bdcb16ed4fc3"
    num="Fig. 1.1"
    caption="Solubility curves of various inorganic compounds"
  />,
  <p key="b1-p-s148-3" style={{ textIndent: 28, textAlign: "justify" }}>
    The solubility curve of sodium sulphate shows a peculiar behaviour. It <em>first increases with rise in
    temperature upto 305·3 K and then begins to decrease with rise in temperature.</em> Actually, the first part of
    curve represents the solubility of sodium sulphate decahydrate, Na<Sub c="2" />SO<Sub c="4" />·10H<Sub c="2" />O, the
    solubility of which <em>increases with rise in temperature.</em> The second part of the curve represents the
    solubility of <em>anhydrous</em> sodium sulphate, Na<Sub c="2" />SO<Sub c="4" />, the solubility of which{" "}
    <em>decreases</em> with increase in temperature. The temperature at which the two parts of the curve meet,{" "}
    <em>i.e.,</em> (305·3 K) represents the <strong>transition temperature</strong> between the decahydrate sodium sulphate and
    sodium sulphate anhydrous.
  </p>,
  <ChemEq key="cheq-s148"
    lhs={<>Na<Sub c="2" />SO<Sub c="4" />·10H<Sub c="2" />O</>}
    rhs={<>Na<Sub c="2" />SO<Sub c="4" /> + 10H<Sub c="2" />O</>}
    arrow="eq"
    topLabel="305·3 K"
    bottomLabels={["Decahydrate", "Anhydrous"]}
  />,
  <p key="b1-p-s148-4" style={{ fontWeight: 700, margin: "10px 0 5px" }}>Effect of temperature on Solubility</p>,
  <p key="b1-p-s148-5" style={{ textIndent: 28, textAlign: "justify" }}>
    The effect of temperature on solubility can be explained on the basis of <strong>Le Chatelier's principle.</strong>
  </p>,
  <p key="b1-p-s148-6" style={{ textIndent: 28, textAlign: "justify" }}>
    Since in most cases, the solution of a solute in water is an <strong>endothermic process,</strong>{" "}
    <em>i.e., cooling occurs when a substance dissolves.</em>
  </p>,
  <ChemEq key="cheq-s148-2"
    lhs={<>Solute + H<Sub c="2" />O</>}
    rhs={<>Solutions : ΔH = +ve</>}
    arrow="eq"
  />,
  <p key="b1-p-s148-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, in accordance with Le Chatelier's principle, if temperature increases, the equilibrium shifts
    in that direction which produces <em>cooling,</em> <em>i.e.,</em> in the direction in which ΔH is +ve. As a result, more
    of the solute dissolves as the temperature rises.
  </p>,
  <p key="b1-p-s148-8" style={{ textIndent: 28, textAlign: "justify" }}>
    There are only a few substances such as Na<Sub c="2" />SO<Sub c="4" />, Na<Sub c="2" />CO<Sub c="3" />·H<Sub c="2" />O,
    CaO, Ce<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" /> which evolve heat when they dissolve in water. Therefore,{" "}
    <em>in accordance with Le Chatelier's principle, their solubilities decrease with rise in temperature.</em>
  </p>,
];


// ── TABLE SUB-COMPONENTS (Batch 2) ───────────────────────────
const ColloidsTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 1.2. Common Examples of Colloids
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Dispersed phase</td>
          <td style={th}>Dispersion medium</td>
          <td style={th}>Type</td>
          <td style={th}>Examples</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["1. Solid",  "Solid",  "Solid sol",    "Coloured gemstones, milky glass"],
          ["2. Solid",  "Liquid", "Sol",           "Starch sol, gold sol, muddy water, milk of magnesia, white of an egg, paints, latex, gelatin, etc."],
          ["3. Solid",  "Gas",    "Solid aerosol", "Smoke, dust-storm, automobile exhaust, etc."],
          ["4. Liquid", "Solid",  "Gel",           "Jelly, cheese, butter, curd, shoe polish, etc."],
          ["5. Liquid", "Liquid", "Emulsion",      "Milk, face cream, cod liver oil."],
          ["6. Liquid", "Gas",    "Aerosol",       "Fog, clouds, mist, sprays."],
          ["7. Gas",    "Solid",  "Solid foam",    "Pumice stone, foam, rubber, sponge, bread, etc."],
          ["8. Gas",    "Liquid", "Foam",          "Froth, whipped cream, soap lather, shaving cream, etc."],
        ].map(([dp, dm, type, ex]) => (
          <tr key={dp + dm}>
            <td style={td}>{dp}</td>
            <td style={{ ...td, textAlign: "center" }}>{dm}</td>
            <td style={{ ...td, textAlign: "center" }}>{type}</td>
            <td style={td}>{ex}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SolNameTable = () => (
  <div style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
      <tbody>
        <tr>
          <td style={th}>Dispersion medium</td>
          <td style={th}>Name of the sol</td>
        </tr>
        {[
          ["Water",   "Aquasol or Hydrosol"],
          ["Alcohol", "Alcosol"],
          ["Benzene", "Benzosol"],
          ["Gases",   "Aerosol"],
        ].map(([med, name]) => (
          <tr key={med}>
            <td style={{ ...td, textAlign: "center" }}>{med}</td>
            <td style={{ ...td, textAlign: "center" }}>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ComparisonTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Property</td>
          <td style={th}>True Solution</td>
          <td style={th}>Colloidal Solution</td>
          <td style={th}>Suspension</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>1. Particle size (Diameter)</td>
          <td style={td}>&lt; 10<Sup c="−7" /> cm (or 10<Sup c="−9" /> m or 1 nm)</td>
          <td style={td}>Between 10<Sup c="−7" /> – 10<Sup c="−5" /> cm (10<Sup c="−9" /> to 10<Sup c="−7" /> m or 1 nm – 100 nm)</td>
          <td style={td}>&gt; 10<Sup c="−5" /> cm (or 10<Sup c="−7" /> m or 100 nm)</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>2. Appearance</td>
          <td style={td}>Clear and transparent</td>
          <td style={td}>Translucent</td>
          <td style={td}>Opaque</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>3. Nature</td>
          <td style={td}>Homogeneous</td>
          <td style={td}>Heterogeneous</td>
          <td style={td}>Heterogeneous</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>4. Filtrability</td>
          <td style={td}>Pass through ordinary filter paper as well as animal membranes (having pores smaller than filter paper)</td>
          <td style={td}>Pass through ordinary filter paper but not through semipermeable membranes.</td>
          <td style={td}>Neither pass through filter paper nor through semi-permeable membranes.</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>5. Settling of particles</td>
          <td style={td}>Particles do not settle down on standing, <em>i.e.,</em> true solutions are stable.</td>
          <td style={td}>Colloidal particles also do not settle on keeping, <em>i.e.,</em> colloids are also stable. However, they can be made to settle by centrifugation.</td>
          <td style={td}>Particles of suspension settle down on standing, <em>i.e.,</em> suspensions are unstable</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>6. Visibility</td>
          <td style={td}>Solute particles are not visible even under a microscope.</td>
          <td style={td}>Particles themselves are invisible but their presence can be detected under an ultramicroscope.</td>
          <td style={td}>Particles are generally visible to the naked eye.</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>7. Tyndall effect</td>
          <td style={td}>Does not scatter light and hence does not show Tyndall effect.</td>
          <td style={td}>Shows Tyndall effect due to scattering of light.</td>
          <td style={td}>Shows Tyndall effect</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ── CONTENT ARRAY — BATCH 2 ───────────────────────────────────
const content_b2 = [
  // 1.5 What is a Suspension?
  <SecHd key="sec-s15" id="s15" label="1.5" title="What is a Suspension?" />,
  <p key="b2-p-s15-1" style={{ textIndent: 28, textAlign: "justify" }}>
    When an insoluble substance such as chalk powder, wheat flour or mud is added to water and the mixture
    stirred, we get a suspension in which the solids are dispersed in liquids. Thus,
  </p>,
  <DefBox key="def-s15-susp">
    A <strong>suspension</strong> is a heterogeneous mixture in which the solute particles do not dissolve but remain
    suspended throughout the bulk of the medium.
  </DefBox>,
  <p key="b2-p-s15-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The particles of a suspension are visible to the naked eye.
  </p>,
  <p key="b2-p-s15-3" style={{ textIndent: 28, textAlign: "justify" }}>
    A few more examples of suspensions are given below:
  </p>,
  <p key="b2-p-s15-4" style={{ margin: "3px 0 3px 0" }}>
    <strong>1.</strong> Paints are suspensions of coloured substances is water or some other liquid.
  </p>,
  <p key="b2-p-s15-5" style={{ margin: "3px 0 3px 0" }}>
    <strong>2.</strong> Milk of magnesia is a suspension of magnesium hydroxide in water.
  </p>,
  <p key="b2-p-s15-6" style={{ margin: "3px 0 3px 0" }}>
    <strong>3.</strong> Lime water (used for white wash) is a suspension of calcium hydroxide in water.
  </p>,
  <p key="b2-p-s15-7" style={{ margin: "3px 0 8px 0" }}>
    <strong>4.</strong> Bleaching powder in water is also a suspension since bleaching powder is insoluble in water.
  </p>,
  <p key="b2-p-s15-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Please note that suspensions are formed by only those substances which are insoluble in water.
  </p>,
  <p key="b2-p-s15-9" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>These suspended particles, however, settle as a precipitate when the suspension is left undisturbed
    for sometime.</strong>
  </p>,

  // 1.5.1
  <SubSubHd key="sub-s151" id="s151" label="1.5.1" title="Properties of a Suspension" />,
  <p key="b2-p-s151-1" style={{ margin: "4px 0 4px 0" }}>
    <strong>1.</strong> A suspension is a heterogeneous mixture.
  </p>,
  <p key="b2-p-s151-2" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>2.</strong> The solid particles of a suspension are so large in size (more than 10<Sup c="−5" /> cm
    or 10<Sup c="−7" /> m or 100 nm) that they are visible to the naked eye.
  </p>,
  <p key="b2-p-s151-3" style={{ margin: "4px 0 4px 0" }}>
    <strong>3.</strong> The particles of a suspension scatter a beam of light passing through it and makes its path visible.
  </p>,
  <p key="b2-p-s151-4" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>4.</strong> The solid particles of a suspension settle down when it is allowed to stand undisturbed for sometime.
    In other words, <em>a suspension is unstable.</em>
  </p>,
  <p key="b2-p-s151-5" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, when carbon dioxide is passed through lime water taken in a test-tube, it turns milky. This
    is due to the reason that lime water contains calcium hydroxide which reacts with carbon dioxide to form
    insoluble calcium carbonate and water.
  </p>,
  <ChemEq key="cheq-s151"
    lhs={<>Calcium hydroxide + Carbon dioxide</>}
    rhs={<>Calcium carbonate + Water</>}
    arrow="forward"
    bottomLabels={["(Lime water)", "(Insoluble)"]}
  />,
  <p key="b2-p-s151-6" style={{ textIndent: 28, textAlign: "justify" }}>
    The solution turns milky due to the formation of a suspension of calcium carbonate in water. When this
    solution is allowed to stand undisturbed for sometime, the particles of the suspension settle at the bottom
    of the tube as a <strong>precipitate.</strong>
  </p>,
  <p key="b2-p-s151-7" style={{ margin: "4px 0 4px 0", textAlign: "justify" }}>
    <strong>5.</strong> The particles of a suspension cannot pass through a filter paper. Thus, when a suspension is filtered,
    the solid particles remain as a residue on the filter paper.
  </p>,
  <p key="b2-p-s151-8" style={{ margin: "4px 0 8px 0" }}>
    <strong>6.</strong> Suspensions are either opaque or translucent.
  </p>,

  // 1.6 What is a Colloidal Solution?
  <SecHd key="sec-s16" id="s16" label="1.6" title="What is a Colloidal Solution?" />,
  <p key="b2-p-s16-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We have discussed above that there are certain substances like common salt, sugar, copper sulphate, etc.
    which dissolve in water to form true solutions. The solute particles of a true solution are very small
    having diameters less than 1 nm (10<Sup c="−9" /> m) and hence are invisible to the naked eye or even
    under a microscope. On the other hand, there are certain substances like chalk powder, calcium oxide
    (lime), bleaching powder, etc. which are insoluble in water. These substances when stirred with water
    form suspensions. The solid particles of a suspension are quite large having diameters greater than 100
    nm and hence are clearly visible to the naked eye. In between these two categories of substances, there is
    a third category of substances which dissolve in water or any other liquid to form a mixture in which the
    size (diameter) of the particles, (<em>i.e.,</em> 1–100 nm) lies in between those and a true solution and a suspension
    (Fig. 1.2). Such mixtures are called <strong>colloidal solutions.</strong> Thus colloidal solutions may be defined as follows:
  </p>,
  <DefBox key="def-s16-coll">
    <em>Solutions in which the size of the particles lies in between those of true solutions and suspensions
    are called </em><strong>colloidal solutions</strong><em> or simply </em><strong>colloids.</strong>
  </DefBox>,
  <p key="b2-p-s16-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Due to relatively smaller size of particles, these mixtures appear to be homogeneous but actually they
    are heterogeneous. Since the colloidal solutions are heterogeneous in nature, therefore, to distinguish
    them from true solutions, the term <strong>"sol"</strong> is used in place of solution. The particles of the colloidal sol
    are called colloidal particles.
  </p>,
  <Fig key="fig-1-2"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//adf428ad-487a-4277-99d6-8efe28c9a91d/markdown_4/imgs/img_in_image_box_264_198_941_413.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A47Z%2F-1%2F%2F249f83d7647241c9462af720f3f7371d059c5b2ecc054c9e5d5cd9057d823793"
    num="Fig. 1.2"
    caption="Particle sizes of a true solution, a colloidal solution and a suspension"
  />,

  // 1.6.1
  <SubSubHd key="sub-s161" id="s161" label="1.6.1" title="Dispersed Phase and Dispersion Medium" />,
  <p key="b2-p-s161-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We have stated above that colloidal solutions are heterogeneous mixtures. <strong>This means that the
    constituents or components of a colloidal solution are not present in one single phase, but are actually
    present in two separate phases. These are called the dispersed phase and the dispersion medium.</strong>{" "}
    <em>The solute-like component which has been dispersed or distributed throughout in a solvent-like medium
    is called the </em><strong>dispersed phase</strong><em> or the </em><strong>discontinuous phase</strong><em> while the solvent like medium in which the
    dispersed phase has been distributed or dispersed is called the </em><strong>dispersion medium</strong><em> or the </em>
    <strong>continuous phase.</strong><em> The heterogeneous system thus obtained is called the </em><strong>colloidal system or the
    colloidal dispersion.</strong>
  </p>,
  <p key="b2-p-s161-2" style={{ textIndent: 28, textAlign: "justify" }}>
    It may be noted here that the dispersed phase in a colloidal solution is comparable to solute particles in
    a true solution. Similarly, the dispersion medium is comparable to a solvent. However, there is one
    important difference between the true solution and the colloidal solution. In true solution, the solute and
    the solvent are present in one single phase but in colloidal solutions, they are present in two separate
    phases.
  </p>,

  // 1.6.2
  <SubHd key="sub-s162" id="s162" label="1.6.2" title="Types of Colloids/Colloidal Systems/Colloidal Dispersions" />,
  <p key="b2-p-s162-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Just as in true solutions, both the solute and solvent can exist in any one of the three states of matter
    (solid, liquid or gas) in the same way, in colloidal solutions also, both the dispersed phase and the
    dispersion medium can be a solid, liquid or a gas. Thus, <em>nine</em> different types of colloidal solutions should
    have been possible. But actually there are <strong>eight</strong> and not nine because gases always mix together to form
    homogeneous mixtures. Some common examples of colloids are given in Table 1.2.
  </p>,
  <ColloidsTable key="tbl-colloids" />,
  <p key="b2-p-s162-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Further, depending upon the dispersion medium, the sols are given special names as follows:
  </p>,
  <SolNameTable key="tbl-solname" />,

  // 1.6.3
  <SubSubHd key="sub-s163" id="s163" label="1.6.3" title="Emulsions" />,
  <DefBox key="def-s163-emul">
    <em>Colloidal sols in which both the dispersed phase and the dispersion medium are liquids are
    called </em><strong>emulsions.</strong>
  </DefBox>,
  <p key="b2-p-s163-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The two liquids which form an emulsion are immiscible with each other. One of these liquids is usually
    water and the other liquid which is insoluble in water is called the <strong>oil.</strong> These emulsions are of two types:
  </p>,
  <p key="b2-p-s163-2" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    (<em>i</em>) <strong>Oil-in-water emulsions.</strong> In these emulsions, oil is the dispersed phase and water is the dispersion
    medium.
  </p>,
  <p key="b2-p-s163-3" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    (<em>ii</em>) <strong>Water-in-oil emulsions.</strong> In these emulsions, water is the dispersed phase and oil is the dispersion
    medium.
  </p>,
  <p key="b2-p-s163-4" style={{ textIndent: 28, textAlign: "justify" }}>
    These emulsions are usually prepared by shaking oil and water vigorously. However, these emulsions of
    two pure liquids are usually not stable. To make them stable, small amounts of certain other substances
    are added during their preparation.
  </p>,
  <DefBox key="def-s163-emulsifier">
    <em>The substances which are added to stabilize emulsions are called </em><strong>emulsifiers</strong><em> or </em>
    <strong>emulsifying agents. These stabilize the sols by reducing the surface tension of water.</strong>
  </DefBox>,
  <p key="b2-p-s163-5" style={{ textIndent: 28, textAlign: "justify" }}>
    The substances which are commonly used as emulsifying agents are soaps, proteins, gums, etc. For
    example, <em>milk is oil-in-water type emulsion, in which liquid fat is dispersed in water and milk protein{" "}
    <strong>lactalbumin</strong> is the emulsifying agent.</em>
  </p>,

  // 1.6.4
  <SubHd key="sub-s164" id="s164" label="1.6.4" title="Properties of Colloids" />,
  <p key="b2-p-s164-0" style={{ textIndent: 28, textAlign: "justify" }}>
    Some important properties of colloids are given below:
  </p>,
  <p key="b2-p-s164-1" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>1. Heterogeneous nature.</strong> A colloidal solution is heterogeneous in nature consisting of two phases
    called the dispersed phase (discontinuous phase) and the dispersion medium (continuous phase).
  </p>,
  <p key="b2-p-s164-2" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>2. Size of particles.</strong> The size (diameter) of the colloidal particles lies in the range 1–100 nm
    (10<Sup c="−7" /> – 10<Sup c="−5" /> cm), <em>i.e.,</em> in between those of true solutions and suspensions.
  </p>,
  <p key="b2-p-s164-3" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>3. Filtrability.</strong> Colloidal particles pass through ordinary filter paper. Hence, the colloidal particles
    cannot be separated from the dispersion medium by filtration. However, colloidal particles cannot pass
    through semipermeable* membranes. A special technique which is presently used to separate colloidal
    particles is <strong>centrifugation.</strong>
  </p>,
  <p key="b2-p-s164-4" style={{ margin: "4px 0 4px 0" }}>
    <strong>4. Stability.</strong> Colloidal sols are quite stable, <em>i.e.,</em> colloidal particles do not settle when left undisturbed.
  </p>,
  <p key="b2-p-s164-5" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>5. Visibility.</strong> Colloidal particles are not visible to the naked eye. However, in some cases, they are
    visible under ultramicroscope.
  </p>,
  <p key="b2-p-s164-6" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>6. Brownian movement.</strong> When colloidal particles are placed under an ultramicroscope, they are seen
    to be <em>continuously moving in a zig-zag path</em> (Fig. 1.3). Such a movement of pollen grains suspended in
    water was first time observed by Robert Brown, an English scientist in 1928 and hence is called Brownian
    movement after his name. Thus,
  </p>,
  <DefBox key="def-s164-brownian">
    <em>Brownian movement may be defined as continuous zig-zag movement of colloidal particles in
    a colloidal sol.</em>
  </DefBox>,
  <Fig key="fig-1-3"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//1476daae-83c5-4944-8b47-00ea113a938f/markdown_1/imgs/img_in_image_box_749_200_1030_407.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A32Z%2F-1%2F%2Fd9106878ebe3084ee1c99a51195fce3953ffc1ee8eb216331037ed188becb56f"
    num="Fig. 1.3"
    caption="Brownian movement"
  />,
  <p key="b2-p-s164-7" style={{ margin: "4px 0 4px 0" }}>
    Other examples of Brownian movement are:
  </p>,
  <p key="b2-p-s164-8" style={{ margin: "3px 0 3px 20px" }}>(<em>i</em>) dust particles floating in air.</p>,
  <p key="b2-p-s164-9" style={{ margin: "3px 0 8px 20px" }}>(<em>ii</em>) Spread of perfume in a room.</p>,
  <p key="b2-p-s164-10" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Cause.</strong> It is believed that Brownian movement arises due to hitting of the colloidal particles by the
    particles of the dispersion medium from different directions with different forces.
  </p>,
  <p key="b2-p-s164-11" style={{ margin: "8px 0 8px 0", textAlign: "justify" }}>
    <strong>7. Tyndall effect.</strong> The colloidal particles are big enough to scatter light passing through it. As a result,
    the path of light becomes visible. <em>This scattering of a beam of light by colloidal particles is called the </em>
    <strong>Tyndall effect</strong> after the name of the scientist who discovered it.
  </p>,
  <p key="b2-p-s164-12" style={{ textIndent: 28, textAlign: "justify" }}>
    When the beam of light from a torch is passed through a true solution of copper sulphate, Tyndall effect
    is not observed, <em>i.e.,</em> the path of light is not visible (Fig. 1.4). However, when the same light is passed
    through a mixture of water and milk, Tyndall effect is observed and the path of light becomes visible.
    The reason for this observation is that the particles of a true solution are so small that they do not scatter
    light and hence the path of light is not visible, <em>i.e.,</em> Tyndall effect is not observed. In contrast, the
    particles of a colloidal solution are big enough to scatter light and hence path of light becomes visible,{" "}
    <em>i.e.,</em> the Tyndall effect is observed.
  </p>,
  <p key="b2-p-s164-13" style={{ textIndent: 28, textAlign: "justify" }}>
    Thus, Tyndall effect can be used to distinguish between a true solution and a colloidal solution.
  </p>,
  <Fig key="fig-1-4"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//1476daae-83c5-4944-8b47-00ea113a938f/markdown_1/imgs/img_in_image_box_228_877_980_1166.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A32Z%2F-1%2F%2F558e0af6a0bf02366513cae364573e4a0f284e613858c1fb820c893f6da82473"
    num="Fig. 1.4"
    caption="(a) Solution of copper sulphate does not show Tyndall effect (b) Mixture of water and milk shows Tyndall effect"
  />,
  <p key="b2-p-s164-14" style={{ margin: "4px 0 4px 0" }}>
    <strong>Examples of Tyndall Effect.</strong> (<em>i</em>) A well known example of Tyndall effect observed in our home is when
    a beam of sunlight enters the dark room through some hole in the window or the ventilator. The path of
    light becomes visible due to scattering of light by the colloidal dust particles present in the air of the room.
  </p>,
  <p key="b2-p-s164-15" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    (<em>ii</em>) Tyndall effect is observed when the sunlight passes through the canopy of a dense forest. This is due
    to scattering of light by the colloidal particles of the mist (<em>i.e.,</em> tiny droplets of water dispersed in air).
  </p>,
  <p key="b2-p-s164-16" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    (<em>iii</em>) The phenomenon of Tyndall effect is also observed when a beam of light from a projector is thrown
    on the screen in a cinema hall. The path of light becomes visible due to scattering of light by the colloidal
    dust particles present in the air of the cinema hall.
  </p>,
  <p key="b2-p-s164-17" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>iv</em>) Another example of Tyndall effect is that sky looks blue due to scattering of light by colloidal dust
    particles present in the air. Similarly, sea water looks blue due to scattering of light by the colloidal
    impurities present in the sea water.
  </p>,
  <p key="b2-p-s164-18" style={{ margin: "8px 0 8px 0", textAlign: "justify" }}>
    <strong>8. Colloidal particles carry charge.</strong> All the colloidal particles of a particular colloidal sol carry the
    same charge which may be either positive or negative while the dispersion medium has an equal and
    opposite charge. Since like charges repel each other, therefore, when a colloidal sol is left undisturbed,
    the similarly charged colloidal particles do not come close and thus remain dispersed in the sol. In other
    words, the particles of the colloid do not settle down unlike the particles of a suspension and hence the
    colloidal sols are quite stable.
  </p>,
  <p key="b2-p-s164-19" style={{ textIndent: 28, textAlign: "justify" }}>
    The nature of charge whether positive or negative on any colloidal sol can be determined by dipping two
    electrodes and connecting them to a battery. Under the influence of the electrical field, the particles of
    the colloid move towards the oppositely charged electrodes. On reaching the electrode, they lose their
    charge and combine together to form big particles which ultimately settle down. This phenomenon is
    called <strong>coagulation.</strong>
  </p>,
  <p key="b2-p-s164-20" style={{ textIndent: 28, textAlign: "justify" }}>
    <em>The movement of colloidal particles towards one of the electrodes under the influence of an electric
    field is called </em><strong>electrophoresis.</strong> Using this technique, the charge on colloidal particles can be
    determined. For example,
  </p>,
  <p key="b2-p-s164-21" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    (<em>i</em>) <strong>Positively charged sols.</strong> Haemoglobin and hydroxides of metals like iron, aluminium, chromium,
    calcium, etc.
  </p>,
  <p key="b2-p-s164-22" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>ii</em>) <strong>Negatively charged sols.</strong> Colloidal particles of metals like copper, silver, gold, etc.; metal sulphides
    like arsenic sulphide, cadmium sulphide, etc.; gelatin, starch, clay, mud, etc.
  </p>,
  <p key="b2-p-s164-23" style={{ margin: "8px 0 4px 0" }}><strong>9. Coagulation</strong></p>,
  <DefBox key="def-s164-coag">
    <em>The process by which small colloidal particles lose their charge and combine together to form
    big sized particles which ultimately settle down is called </em><strong>coagulation.</strong>
  </DefBox>,
  <p key="b2-p-s164-24" style={{ textIndent: 28, textAlign: "justify" }}>
    The coagulation is generally carried out by addition of electrolytes* like sodium chloride, barium
    chloride, alum, etc. When an electrolyte* is added to a colloidal solution, the particles of the sol combine
    with oppositely charged ions and thus get neutralized. The neutral particles then start combining together
    to form particles of larger size which settle down. For example, bleeding from a cut can be immediately
    stopped by applying alum or ferric chloride. The reason being that the colloidal blood particles are
    negatively charged and hence get coagulated by positively charged ferric ions present in ferric chloride
    or positively charged aluminium ions present in alum. As a result of this coagulation, bleeding stops.
  </p>,
  <p key="b2-p-s164-25" style={{ textIndent: 28, textAlign: "justify" }}>
    Please note that according to Hardy-Schulze law, higher the valency of the cation, higher is its coagulating
    power. Thus, coagulating power increases in the order: sodium chloride &lt; barium chloride &lt; alum, etc.
  </p>,
  <p key="b2-p-s164-26" style={{ textIndent: 28, textAlign: "justify" }}>
    Similarly, muddy water can be purified by adding alum. The reason being that muddy water contains
    negatively charged clay particles. These are neutralized by positively charged aluminium ions and settle
    down. The pure water can then be obtained by decantation.
  </p>,
  <FootNote key="fn-s164">
    <strong>Electrolytes</strong> are salts which when dissolved in water undergo ionization to form ions. For example,
    sodium chloride (NaCl) gives sodium (Na<Sup c="+" />) and chloride (Cl<Sup c="−" />) ions. Similarly, ferric chloride
    (FeCl<Sub c="3" />) gives ferric (Fe<Sup c="3+" />) and chloride (Cl<Sup c="−" />) ions and alum (potassium aluminium
    sulphate, K<Sub c="2" />SO<Sub c="4" />·Al<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" />·24H<Sub c="2" />O) gives
    potassium (K<Sup c="+" />), aluminium (Al<Sup c="3+" />) and sulphate (SO<Sub c="4" /><Sup c="2−" />) ions.
  </FootNote>,

  // 1.6.5
  <SubSubHd key="sub-s165" id="s165" label="1.6.5" title="Applications of Colloids in Everyday Life" />,
  <p key="b2-p-s165-0" style={{ textIndent: 28, textAlign: "justify" }}>
    There are number of colloidal systems (Table 1.2) that we come across in our everyday life. For example,
    fog, cloud, milk, gemstone, etc. Besides these, colloids have a number of other applications.
  </p>,
  <p key="b2-p-s165-1" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>1. Medicines.</strong> Many medicines which are insoluble in water are given to the patients in form of colloidal
    dispersions. Medicines in the colloidal form are easily absorbed by the body tissues and hence are more
    effective.
  </p>,
  <p key="b2-p-s165-2" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>2. Cleansing action of soap.</strong> Soap is a colloidal solution which is used in removing greasy or oily
    material sticking to the clothes or utensils.
  </p>,
  <p key="b2-p-s165-3" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>3. Smoke precipitator.</strong> Smoke is a colloidal dispersion of carbon particles in air. Since carbon particles
    carry charge, they can be coagulated by applying electric field. As a result, pollution of air by the smoke
    coming out of the chimneys of industries can be prevented.
  </p>,
  <p key="b2-p-s165-4" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>4. Sewage disposal.</strong> Sewage water contains colloidal particles of dirt, mud, etc. Since these colloidal
    particles carry charge, they can be coagulated by applying electric field. Thus, sewage water can be
    purified and the dirt thus obtained is used as a manure.
  </p>,
  <p key="b2-p-s165-5" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    <strong>5. Production of rubber.</strong> Latex is a colloidal solution of negatively charged rubber particles in water.
    It is a white milky liquid obtained from rubber trees. Rubber is obtained from latex by coagulation with
    acetic acid which provides positively charged H<Sup c="+" /> ions to neutralize the negative charge of latex
    particles.
  </p>,

  // 1.6.6
  <SubHd key="sub-s166" id="s166" label="1.6.6" title="Comparison of characteristics of True Solution, Colloidal Solution and Suspension" />,
  <p key="b2-p-s166-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The main points of difference between true solution, colloidal solution and suspensions are given below:
  </p>,
  <ComparisonTable key="tbl-comparison" />,

  // Activity 1.2
  <ActivityBox key="act-1-2" num="1.2"
    sub="(To illustrate the difference between true solution suspension and colloidal solution, carry out the following activity)">
    <ActHd>Experimental Details of Activity.</ActHd>
    <ul style={{ paddingLeft: 22, margin: "6px 0 8px", listStyleType: "disc", fontSize: 14, lineHeight: 1.7 }}>
      <li>Divide the class into four groups, A, B, C and D.</li>
      <li>Distribute the following samples to each group:
        <ul style={{ paddingLeft: 20, listStyleType: "circle" }}>
          <li>Few crystals of copper sulphate to group A.</li>
          <li>One spatula full of copper sulphate to group B.</li>
          <li>Chalk powder or wheat flour to group C.</li>
          <li>Few drops of milk or ink to group D.</li>
        </ul>
      </li>
      <li>Now each group should add the given sample in water and stir properly using a glass rod.</li>
      <li>Direct a beam of light from a torch through the beaker containing each mixture and observe from the front.</li>
      <li>Leave the mixture undisturbed for a few minutes and then filter the mixture (Fig. 1.9).</li>
    </ul>
    <ActHd>Observations.</ActHd>
    <p style={{ fontWeight: 700, margin: "6px 0 4px" }}>1. Groups A and B.</p>
    <P2>(<em>i</em>) Groups A and B both have got <strong>true solutions.</strong> However, the intensity of the blue colour of
      the solution obtained by group A which contains only a few crystals of copper sulphate is <em>lower</em> than
      that of the solution obtained by group B which contains one spatula full of copper sulphate. Thus,{" "}
      <em>the intensity of colour depends upon the amount of substance dissolved.</em></P2>
    <P2>(<em>ii</em>) In both these solutions, particles are not visible to the naked eye.</P2>
    <P2>(<em>iii</em>) When the beam of light is passed through solution obtained by group A or group B, the path
      of the beam of light was not visible. Thus, <em>the particles of a true solution do not scatter light.</em></P2>
    <P2>(<em>iv</em>) When the above solution is allowed to stand, the solution is stable and the particles of the
      solution <em>do not settle down.</em> Further, when the above solution is allowed to filter, the whole solution
      passes through the pores of the filter paper without leaving any residue on the filter paper.</P2>
    <P2><em>Thus, the particles of a true solution neither settle down on standing nor leave any residue when
      passed through a filter paper.</em></P2>
    <p style={{ fontWeight: 700, margin: "6px 0 4px" }}>2. Group C.</p>
    <P2>(<em>i</em>) Group C has obtained a <strong>suspension.</strong></P2>
    <P2>(<em>ii</em>) The particles of a suspension scatter light and hence the particles are <em>visible to the naked eye.</em></P2>
    <P2>(<em>iii</em>) When the above suspension is allowed to stand, <em>it is not stable</em> and the particles of the
      suspension settle down.</P2>
    <P2>(<em>iv</em>) When the above suspension is filtered, the particles of the chalk or wheat flour being bigger in
      size than the pores of the filter paper remain as <em>residue</em> on the filter paper.</P2>
    <p style={{ fontWeight: 700, margin: "6px 0 4px" }}>3. Group D.</p>
    <P2>(<em>i</em>) The group D has obtained a <strong>colloidal solution.</strong></P2>
    <P2>(<em>ii</em>) When the above solution is allowed to stand, the particles of the colloidal solution like those
      of the true solution do not settle down.</P2>
    <P2>(<em>iii</em>) Since the particles of a colloidal solution are 100 times bigger than those of the true solution,
      therefore, <em>when a beam of light is passed through a colloidal solution, the particles of the colloidal
      solution scatter light and hence the path of the beam becomes visible.</em></P2>
    <P2>(<em>iv</em>) When the colloidal solution is passed through a filter paper, the particles of the colloidal
      solution like those of the true solution pass through the filter paper without leaving any residue on
      the filter paper.</P2>
    <ActHd>Conclusion.</ActHd>
    <P2>(<em>i</em>) The particles of a true solution are not visible even under a microscope. They do not settle down
      on standing and pass through the pores of the filter papers without leaving any residue.</P2>
    <P2>(<em>ii</em>) The particles of a suspension are visible to the naked eye. They settle down on standing and
      leave a residue on the filter paper.</P2>
    <P2>(<em>iii</em>) The particles of a colloidal solution scatter light and hence the path of light beam becomes
      visible when a beam of light is passed through it. The colloidal solution is stable and hence the particles
      of the colloidal solution do not immediately settle down on standing. They also pass through the pores
      of a filter paper.</P2>
  </ActivityBox>,
];


// ── CONTENT ARRAY — BATCH 3 ───────────────────────────────────
const content_b3 = [
  // 1.7 Various Ways to Express Concentration
  <SecHd key="sec-s17" id="s17" label="1.7" title="Various Ways to Express Concentration of Solution" />,
  <p key="b3-p-s17-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To understand the meaning of concentration of a solution, let us take two beakers and label them as A
    and B. Place 50 mL of water in each one of them. Dissolve a few crystals of copper sulphate in beaker A
    and one full spatula of copper sulphate in beaker B. Stir well to obtain a clear transparent solution.
    Repeat the above experiment by taking 100 mL of water in each beaker. You will observe that the four
    beakers have different shades of blue colour. Thus, we conclude that in a solution, the relative amounts
    of the solute and the solvent can be varied. <em>Depending upon the amount of solute present in a solution, it
    can be called a dilute, concentrated, or saturated solution.</em> Dilute and concentrated are relative terms.
    Solution obtained in beaker A is dilute as compared to that obtained in beaker B.
  </p>,
  <p key="b3-p-s17-2" style={{ textIndent: 28, textAlign: "justify" }}>
    However, in scientific terms, the concentration of a solution may be defined as the amount of solute
    present in a given amount (mass or volume) of solution or the amount of solute dissolved in a given mass
    or volume of a solvent. Thus,
  </p>,
  <MathBlock key="b3-math-s17-1">
    Concentration of solution = <Frac n="Amount of solute" d="Amount of solution" />
  </MathBlock>,
  <p key="b3-p-s17-3" style={{ textAlign: "center", margin: "2px 0" }}>or</p>,
  <MathBlock key="b3-math-s17-2">
    Concentration of solution = <Frac n="Amount of solute" d="Amount of solvent" />
  </MathBlock>,
  <p key="b3-p-s17-4" style={{ textIndent: 28, textAlign: "justify" }}>
    There are various ways of expressing the concentration of a solution, but here, we shall discuss only
    some of the more common methods. Depending upon the type of solution whether solid in liquid or liquid
    in liquid, these methods are divided into the following two categories:
  </p>,
  <p key="b3-p-s17-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. Solid in liquid solutions.</strong> If a solution is prepared by dissolving a <strong>solid solute</strong> in a{" "}
    <strong>liquid solvent,</strong> the concentration of the solution may be expressed either in mass by mass percentage
    or mass by volume percentage.
  </p>,
  <p key="b3-p-s17-6" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) <strong>Mass by mass percentage</strong> or simply <strong>mass percentage.</strong> It is defined as follows:
  </p>,
  <DefBox key="def-s17-ww">
    <em>The mass of the solute in grams dissolved in 100 grams of the solution.</em>
  </DefBox>,
  <p key="b3-p-s17-7" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, a 10 percent solution of common salt means 10 grams of common salt are present in 100
    grams of the solution. Please note here that 100 grams of the solution also include 10 grams of common
    salt. In other words, 100 grams of common salt solution contain 100 – 10 = 90 grams of water. Thus, a
    10 percent mass by mass percentage solution of common salt can be prepared by dissolving 10 grams of
    common salt in 90 grams of water so that the total mass of the solution becomes 100 grams. It may be
    further noted that concentration of a solution refers to the mass of the solute in 100 grams of the{" "}
    <strong>solution</strong> and not in 100 grams of the <strong>solvent.</strong> The mass by mass percentage of a solution may also
    be calculated by using the following formula,
  </p>,
  <MathBlock key="b3-math-s17-3">
    Mass by mass percentage or mass percentage of a solution = <Frac n="Mass of solute" d="Mass of solution" /><Times />100
    {" "}={" "}
    <Frac n="Mass of solute" d="(Mass of solute + Mass of solvent)" /><Times />100.
  </MathBlock>,
  <p key="b3-p-s17-8" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) <strong>Mass by volume percentage.</strong> It is defined as follows:
  </p>,
  <DefBox key="def-s17-wv">
    <em>The mass of the solute in grams dissolved in 100 millilitres or 100 mL of the solution.</em>
  </DefBox>,
  <p key="b3-p-s17-9" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, a 10 percent mass by volume solution of common salt in water means that 10 grams of
    common salt are present in 100 mL of the solution. In other words, a 10 percent mass by volume solution
    of common salt is prepared by first completely dissolving 10 grams of common salt in a small amount of
    water and then finally making the volume to 100 mL. The mass by volume percentage of a solution can
    also be calculated by using the following formula.
  </p>,
  <MathBlock key="b3-math-s17-4">
    Mass by volume percentage of a solution = <Frac n="Mass of solute" d="Volume of solution" /><Times />100
  </MathBlock>,
  <p key="b3-p-s17-10" style={{ fontWeight: 700, margin: "10px 0 5px" }}>Concentration of very dilute solutions</p>,
  <p key="b3-p-s17-11" style={{ textIndent: 28, textAlign: "justify" }}>
    If a very small amount of a solute is dissolved in a large excess of the solvent, the values of mass by
    mass and mass by volume percentages will be very low. In order to increase their values, the concentration
    is expressed in parts per million or simply as <strong>ppm.</strong> It may be defined as follows
  </p>,
  <DefBox key="def-s17-ppm">
    <em>The number of parts by mass (or volume) of solute per million parts by mass (or volume) of the
    solution.</em>
  </DefBox>,
  <MathBlock key="b3-math-s17-5">
    Mathematically,&nbsp;&nbsp;
    ppm = <Frac n="Mass of solute" d="Mass of solution" /><Times />10<Sup c="6" />
    &nbsp;&nbsp;or&nbsp;&nbsp;
    <Frac n="Volume of solute" d="Volume of solution" /><Times />10<Sup c="6" />
  </MathBlock>,
  <p key="b3-p-s17-12" style={{ textIndent: 28, textAlign: "justify" }}>
    The concentration of poisonous gases such as nitric oxide (NO), nitrogen dioxide (NO<Sub c="2" />),
    sulphur dioxide (SO<Sub c="2" />), etc. in the atmosphere is expressed in ppm. For example, if the
    concentration of sulphur dioxide (SO<Sub c="2" />) in air is 10 ppm, this means that 10 parts by volume of
    sulphur dioxide are present in 10<Sup c="6" /> parts by volume of air.
  </p>,
  <p key="b3-p-s17-13" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2. Liquid in liquid solutions.</strong> If a solution is prepared by dissolving a <strong>liquid solute</strong> in a{" "}
    <strong>liquid solvent,</strong> the concentration of the solution is usually expressed in <strong>volume by volume percentage</strong>{" "}
    or simply <strong>volume percentage of the solution.</strong> It is defined as follows:
  </p>,
  <DefBox key="def-s17-vv">
    <em>The volume of the solute in millilitres dissolved in 100 millilitres or 100 mL of the solution.</em>
  </DefBox>,
  <p key="b3-p-s17-14" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, a 20 percent solution of alcohol in water means 20 mL of alcohol are dissolved in 100 mL
    of the solution, note that 100 mL of the solution also include 20 mL of alcohol. This means, 100 mL of
    alcohol solution contains 100–20 = 80 mL of water in it. In other words, we can prepare a 20 percent
    volume by volume solution of alcohol in water by mixing 20 mL of alcohol and 80 mL of water so that the
    total volume of the solution becomes 20 + 80 = 100 mL. It may be noted here that the concentration of
    the solution refers to the volume of the liquid solute in 100 mL of the <strong>solution</strong> and not the solvent.
  </p>,
  <p key="b3-p-s17-15" style={{ textIndent: 28, textAlign: "justify" }}>
    In general, we can calculate the volume by volume percentage of a solution by using the formula,
  </p>,
  <MathBlock key="b3-math-s17-6">
    Volume by volume percentage of a solution = <Frac n="Volume of solute in mL" d="Volume of solution in mL" /><Times />100.
  </MathBlock>,
  <p key="b3-p-s17-16" style={{ textIndent: 28, textAlign: "justify" }}>
    In most of the commercial products such as solutions of medicines, syrups, etc., the concentration of the
    liquid medicine is expressed in terms of volume by volume percentage and is denoted by the symbol{" "}
    <em>v/v.</em> However, the concentration of the solid medicine is expressed either in terms of weight by weight
    percentage (denoted by symbol <em>w/w</em>) or by weight by volume percentage (denoted by the symbol{" "}
    <em>w/v</em>). Please note that here the term weight has been used in place of mass. For example, a popular
    brand of antacid syrup, <strong>Gelusil</strong> contains about 5% <em>w/w</em> of magnesium hydroxide and 5% <em>w/w</em> of
    aluminium hydroxide besides other medicines.
  </p>,
  <p key="b3-p-s17-17" style={{ textIndent: 28, textAlign: "justify" }}>
    <em>Please note that if for a solution, the terms like w/w, w/v, v/v are not mentioned, it is always taken
    as w/w.</em>
  </p>,

  // Numerical Section
  <NumericalSection key="num-concentration" topic="CONCENTRATION AND SOLUBILITY">
    <p key="b3-p-num-1" style={{ margin: "6px 0 4px" }}>
      <strong>Example 1.</strong> A solution contains 40 g of common salt in 320 g of water. Calculate the concentration
      in terms of mass by mass percentage of the solution.
    </p>
    <p key="b3-p-num-1s" style={{ margin: "4px 0 4px 20px" }}>
      <strong>Solution.</strong> Mass of common salt (solute) = 40 g<br />
      Mass of water (solvent) = 320 g
    </p>
    <MathBlock key="b3-math-num-1a">
      ∴ &nbsp;Mass of solution = Mass of solute + Mass of solvent = 40 + 320 = 360 g
    </MathBlock>
    <MathBlock key="b3-math-num-1b">
      Mass by mass % = <Frac n="Mass of solute" d="Mass of solution" /><Times />100 = <Frac n="40" d="360" /><Times />100 = <strong>11·1%</strong>
    </MathBlock>

    <p key="b3-p-num-2" style={{ margin: "10px 0 4px" }}>
      <strong>Example 2.</strong> Calculate the mass of glucose and mass of water required to make 250 g of 25%
      solution of glucose.
    </p>
    <p key="b3-p-num-2s" style={{ margin: "4px 0 4px 20px" }}>
      <strong>Solution.</strong> Mass by mass percentage of solution = <Frac n="Mass of solute" d="Mass of solution" /><Times />100
    </p>
    <p key="b3-p-num-2s2" style={{ margin: "4px 0 4px 20px" }}>Putting the values of the terms in the above relation, we have,</p>
    <MathBlock key="b3-math-num-2a">
      25 = <Frac n="Mass of glucose" d="250 g" /><Times />100
    </MathBlock>
    <MathBlock key="b3-math-num-2b">
      or &nbsp;&nbsp;Mass of glucose = <Frac n="25 × 250 g" d="100" /> = <strong>62·5 g</strong>
    </MathBlock>
    <MathBlock key="b3-math-num-2c">
      ∴ &nbsp;Mass of water = 250 – 62·5 = <strong>187·5 g</strong>
    </MathBlock>

    <p key="b3-p-num-3" style={{ margin: "10px 0 4px" }}>
      <strong>Example 3.</strong> A solution contains 5 mL of alcohol in 70 mL of water. Calculate the volume by
      volume percentage of the solution.
    </p>
    <p key="b3-p-num-3s" style={{ margin: "4px 0 4px 20px" }}>
      <strong>Solution.</strong> Volume of alcohol (solute) = 5 mL<br />
      Volume of water (solvent) = 70 mL
    </p>
    <MathBlock key="b3-math-num-3a">
      Volume of the solution = 5 + 70 = 75 mL
    </MathBlock>
    <MathBlock key="b3-math-num-3b">
      Volume by volume % = <Frac n="Volume of solute" d="Volume of solution" /><Times />100
      = <Frac n="5" d="75" /><Times />100 = <strong>6·66%</strong>
    </MathBlock>

    <p key="b3-p-num-4" style={{ margin: "10px 0 4px" }}>
      <strong>Example 4.</strong> Find out the mass by volume percentage of 15% solution of sulphuric acid
      (density = 1·02 g mL<Sup c="−1" />).
    </p>
    <p key="b3-p-num-4s" style={{ margin: "4px 0 4px 20px" }}>
      <strong>Solution.</strong> 15% solution of H<Sub c="2" />SO<Sub c="4" /> means 15 g of H<Sub c="2" />SO<Sub c="4" />{" "}
      are present in 100 g of the solution, <em>i.e.,</em><br />
      Mass of H<Sub c="2" />SO<Sub c="4" /> dissolved = 15 g<br />
      Mass of solution = 100 g<br />
      Density of the solution = 1·02 g cm<Sup c="−3" />
    </p>
    <MathBlock key="b3-math-num-4a">
      ∴ &nbsp;Volume of the solution = <Frac n="Mass" d="Density" /> = <Frac n="100 g" d="1·02 g mL−1" /> = 98·04 mL
    </MathBlock>
    <MathBlock key="b3-math-num-4b">
      Mass by volume % = <Frac n="Mass of solute" d="Volume of solution" /><Times />100
      = <Frac n="15" d="98·04" /><Times />100 = <strong>15·3%</strong>
    </MathBlock>

    <p key="b3-p-num-5" style={{ margin: "10px 0 4px" }}>
      <strong>Example 5.</strong> 2·5 g of a solute are dissolved in 25 g of water to form a saturated solution at 298 K.
      Find out the solubility of the solute at this temperature.
    </p>
    <p key="b3-p-num-5s" style={{ margin: "4px 0 4px 20px" }}>
      Mass of the solute = 2·5 g &nbsp;&nbsp; Mass of the solvent = 25 g
    </p>
    <MathBlock key="b3-math-num-5">
      ∴ &nbsp;Solubility = <Frac n="Mass of solute" d="Mass of solvent" /><Times />100 = <Frac n="2·5" d="25" /><Times />100 = <strong>10 g</strong>
    </MathBlock>
  </NumericalSection>,

  // Problems for Practice
  <ProblemsBox key="prob-s17">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside",
      fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>15 g of common salt are dissolved in water. The solution was found to weigh 115 g. Calculate the mass by mass percentage of common salt in the solution. <strong>[Ans. 13·04%]</strong></li>
      <li style={{ marginBottom: 6 }}>A solution is prepared by dissolving 5 g of urea in 95 g of water. What is the mass by mass percentage of urea in the solution? <strong>[Ans. 5%]</strong></li>
      <li style={{ marginBottom: 6 }}>Calculate the masses of cane sugar and water required to prepare 200 g of 15% mass by mass solution of cane sugar in water. <strong>[Ans. Mass of cane sugar = 30 g, mass of water = 170 g]</strong></li>
      <li style={{ marginBottom: 6 }}>It is desired to prepare 500 g of 10% mass by mass percentage of urea in water. How much urea should be dissolved in how much volume of water? Density of water is 1 g mL<Sup c="−1" />. <strong>[Ans. urea = 50 g, volume of water = 450 mL]</strong></li>
      <li style={{ marginBottom: 6 }}>15 mL of ethyl alcohol is mixed with 60 mL of gasoline. Calculate the volume by volume percentage of the solution. <strong>[Ans. 20%]</strong></li>
      <li style={{ marginBottom: 6 }}>What volume of alcohol and what volume of water must be mixed together to prepare 250 mL of 60% volume by volume solution of alcohol in water? <strong>[Ans. Alcohol = 150 mL, water = 100 mL]</strong></li>
      <li style={{ marginBottom: 6 }}>3 g of a solute are dissolved in 30 g of water to form a saturated solution at 298 K. Calculate the solubility of the solute at this temperature. <strong>[Ans. 10 g]</strong></li>
      <li style={{ marginBottom: 6 }}>(<em>a</em>) What mass of potassium chloride would be needed to form a saturated solution in 50 g of water at 313 K? Given the solubility of the salt = 40 g/100 g of water at this temperature.<br />(<em>b</em>) What will happen if the solution at this temperature is cooled?<br /><strong>[Ans. (a) 20 g, (b) excess of solute will crystallise out]</strong></li>
      <li style={{ marginBottom: 6 }}>Calculate the percentage composition in terms of mass of a solution obtained by mixing 300 g of 25% and 400 g of a 40% solution by mass. <strong>[Ans. solute = 33·57%, water = 66·43%]</strong></li>
      <li style={{ marginBottom: 6 }}>Calculate the mass of sulphuric acid present in 100 mL of 15% mass by mass solution of sulphuric acid. (density = 1·10 g/mL) <strong>[Ans. 16·5 g]</strong>
        <p style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
          <strong>[Hint.</strong> 100/1·1 mL of solution contain sulphuric acid = 15 g<br />
          ∴ 100 mL of the solution will contain sulphuric acid = <Frac n="15 × 1·1" d="100" /> × 100 g = <strong>16·5 g</strong>]
        </p>
      </li>
      <li style={{ marginBottom: 6 }}>How many litres of a 5·0% (<em>w/v</em>) glucose solution would you take to obtain 75 g glucose. <strong>[Ans. 1·5 L]</strong></li>
    </ol>
  </ProblemsBox>,

  // 1.8 Separation Techniques
  <SecHd key="sec-s18" id="s18" label="1.8" title="Separation Techniques" />,
  <p key="b3-p-s18-hd" style={{ margin: "8px 0 6px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, color: P_COLOR, fontSize: 13.5 }}>
    I. Separation Techniques with practices observed in the Local Environment
  </p>,
  <p key="b3-p-s18-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Some of the common methods of separating substances or mixtures used in local environment are:
  </p>,
  <p key="b3-p-s18-2" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>1. Hand Picking.</strong> This method involves simply picking out all the unwanted substances from useful
    ones. If the mixture consists of particles having difference shapes then hand picking can be carried out
    with a microscope. This method was used by great French scientist <em>Louis Pasteur</em> who separated the
    crystals of enantiomers of sodium ammonium tartrate laying the formation of{" "}
    <strong>chirality and optical isomerism in organic chemistry.</strong>
  </p>,
  <p key="b3-p-s18-3" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>2. Threshing.</strong> This method is mostly used to separate grains from straw or chaff. The dried wheat
    stalks (bundles) are beaten on a large wooden log when grains fall apart from the straw or chaff.
  </p>,
  <p key="b3-p-s18-4" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>3. Winnowing.</strong> When the grains are collected from threshing. It needs to be separated from husk or
    chaff before it is converted into flour. Normally the separation is carried out with the help of wind or
    blowing air.
  </p>,
  <p key="b3-p-s18-5" style={{ textIndent: 28, textAlign: "justify" }}>
    The technological development have resulted in development of threshing machines called threshers.
    These machines are used for separating grains from the stalks and husk. They perform both the tasks of
    Threshing and Winnowing simultaneously.
  </p>,
  <p key="b3-p-s18-6" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>4. Sieving.</strong> This method is used to separate mixtures that contain substances mostly of different sizes.
    The mixture is passed through the pores of the sieve. All the smaller substances pass through easily while
    the larger components of the mixture are retained.
  </p>,
  <p key="b3-p-s18-7" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, when wheat is converted into flour, it contains some bran. The mixture is passed through a
    sieve when flour particles being smaller pass through the sieve while bran remains in the sieve.
  </p>,
  <p key="b3-p-s18-8" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>5. Evaporation.</strong> This method is used to separate non-volatile components (solutes) dissolved in volatile
    solvent. For example, blue (or black) ink is a homogeneous mixture of blue or black dye (solute) in water
    (solvent). The components of this mixture can be separated by the process of evaporation.
  </p>,
  <p key="b3-p-s18-9" style={{ textIndent: 28, textAlign: "justify" }}>
    Put a few drops of blue (or black) ink on a watch glass and place it on a beaker half full of water as
    shown in Fig. 1.5. The water in the beaker is heated and the steam thus formed will, in turn, heat up the
    ink. The water present in the ink will evaporate and ultimately a blue (or black) residue will be left on
    the watch glass.
  </p>,
  <Fig key="fig-1-5"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_0/imgs/img_in_image_box_684_350_1045_802.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A30Z%2F-1%2F%2F94521113f9f78f44e94d061281032b92f0fba6770541e7d9101e5fef687855f6"
    num="Fig. 1.5"
    caption="Evaporation"
  />,
  <p key="b3-p-s18-10" style={{ textIndent: 28, textAlign: "justify" }}>
    It may be noted here that direct heating of ink is avoided because the blue (or black) dye may decompose
    on direct heating.
  </p>,
  <p key="b3-p-s18-11" style={{ textIndent: 28, textAlign: "justify" }}>
    This method has also been used on a commercial scale in India to obtain common salt from sea water
    (Kutch region in Gujarat) or lake (Sambhar lake in Rajasthan) containing common salt. Sea water is
    collected in open shallow beds during high tide and allowed to evaporate in the hot sun. The salt left
    behind is collected, purified in the factories and sold in the market.
  </p>,
  <p key="b3-p-s18-12" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>6. Filtration or Sedimentation.</strong> The most common method of separating an insoluble solid from a
    liquid is filtration.
  </p>,
  <p key="b3-p-s18-13" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, a mixture of sand and water can be separated by this method. The mixture is passed through
    a filter paper held in a funnel (Fig. 1.8) when water passes through the pores of the filter paper and sand
    remains on the filter paper.
  </p>,
  <p key="b3-p-s18-14" style={{ textIndent: 28, textAlign: "justify" }}>
    Sedimentation is a process by which heavier/suspended impurities present in a liquid namely water
    settles down at the bottom of the container. This is actually the first step in the purification of water.
    The water from a reservoir (river or lake) is allowed to stand in a tank for sometime when
    heavier/suspended impurities settle down.
  </p>,
  <p key="b3-p-s18-15" style={{ margin: "5px 0 8px 0", textAlign: "justify" }}>
    <strong>7. Decantation</strong> is a simple separation method that separates mixtures of an insoluble solid from a
    liquid or two immiscible liquids, by allowing the denser liquid to settle down at the bottom and then
    carefully pouring off the lighter liquid layer from the top into another container. This method often results
    in incomplete separation leaving some impurities behind.
  </p>,
  <p key="b3-p-s18-lab-hd" style={{ margin: "10px 0 6px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, color: P_COLOR, fontSize: 13.5 }}>
    Common Special Techniques used in Laboratory and Industry
  </p>,
  <p key="b3-p-s18-lab1" style={{ textIndent: 28, textAlign: "justify" }}>
    Compounds isolated from natural sources are seldom pure. They are generally mixed with other substances
    which also occur along with them. Similarly, the compounds prepared in the laboratory are also not pure
    since they are generally contaminated with other products that result from the side reactions.
  </p>,
  <p key="b3-p-s18-lab2" style={{ textIndent: 28, textAlign: "justify" }}>
    In order to study the properties of individual substances, we need each component of the mixture in the
    pure state.
  </p>,
  <p key="b3-p-s18-lab3" style={{ textIndent: 28, textAlign: "justify" }}>
    Some of the techniques, which are extensively used in laboratory and industry to separate the components
    of a mixture whether homogeneous or heterogeneous are described below:
  </p>,

  // 1.8.1
  <SubHd key="sub-s181" id="s181" label="1.8.1" title="Separating Funnel" />,
  <p key="b3-p-s181-1" style={{ textIndent: 28, textAlign: "justify" }}>
    This is a better method than decantation for separating two immiscible liquids. For examples, kerosene
    oil and water do not mix. When these liquids are mixed, they form two separate layers.{" "}
    <em>Such pairs of liquids which do not mix with each other are called </em><strong>immiscible liquids.</strong> These liquids
    form heterogeneous mixtures. The individual components of such heterogeneous mixtures can be separated
    by using a separating funnel. <em>The technique is based upon the principle that when a mixture of two
    immiscible liquids is allowed to stand they separate out in two separate layers depending upon their
    densities.</em> Let us separate a mixture of kerosene oil and water. Pour the mixture of kerosene oil and
    water in a separating funnel (Fig. 1.6).
  </p>,
  <Fig key="fig-1-6"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_1/imgs/img_in_image_box_674_341_946_783.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A30Z%2F-1%2F%2F8ba791c79952589822ab6470436789ba62489e5f0dbb994bf1330bc3a7d4bf3e"
    num="Fig. 1.6"
    caption="Separation of two immiscible liquids"
  />,
  <p key="b3-p-s181-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The separating funnel is then allowed to stand for sometime when kerosene oil and water form two
    separate layers. The kerosene oil being lighter than water forms the upper layer while water being heavier
    forms the lower layer. The boundary of separation of the two liquids is clearly visible. Now place a
    beaker below the funnel and open the stopcock. The lower layer of water is run out carefully. Close the
    stopcock of the separating funnel as soon as the oil layer reaches the stopcock. Now remove the beaker
    containing water and replace it by another beaker. Once again open the stopcock and pour out the upper
    kerosene oil layer.
  </p>,
  <p key="b3-p-s181-3" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, fontSize: 13.5, margin: "8px 0 5px" }}>
    I. Applications of solvent extraction.
  </p>,
  <p key="b3-p-s181-4" style={{ margin: "4px 0 4px 0", textAlign: "justify" }}>
    (<em>i</em>) This technique is used to separate a mixture of oil and water or mixtures of any two immiscible
    liquids like benzene and water, chloroform and water, ether and water, carbon tetrachloride and water, etc.
  </p>,
  <p key="b3-p-s181-5" style={{ margin: "4px 0 4px 0", textAlign: "justify" }}>
    (<em>ii</em>) To extract organic compounds present in aqueous solutions using a water immiscible organic solvent
    like chloroform, benzene, ether, carbon tetrachloride, petroleum ether, etc.
  </p>,
  <p key="b3-p-s181-6" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    (<em>iii</em>) In the <strong>blast furnace,</strong> during extraction of iron, two separate layers are formed. The upper layer
    consists of the <strong>molten slag</strong> (calcium silicate) while the lower layer consists of <strong>molten iron.</strong> The lighter
    slag is removed from the upper hole while the molten iron is removed from the bottom hole of the furnace.
  </p>,

  // 1.8.2 Sublimation
  <SubHd key="sub-s182" id="s182" label="1.8.2" title="Sublimation" />,
  <p key="b3-p-s182-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We have discussed above that most of the substances around us change their state first from solid to liquid
    and then from liquid to gaseous state by absorption of heat. However, there are some substances known
    which on heating directly change their state from solid to gaseous and <em>vice-versa</em> on cooling without
    passing through the intervening liquid state. This process is called sublimation. Thus,
  </p>,
  <DefBox key="def-s182-sub">
    <strong>Sublimation</strong><em> involves direct conversion of a solid into the gaseous state on heating and
    vice-versa on cooling without passing through the intervening liquid state.</em>
  </DefBox>,
  <p key="b3-p-s182-2" style={{ textIndent: 28 }}>
    Sublimation can be represented as
  </p>,
  <Fig key="fig-sub-eq"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_2/imgs/img_in_image_box_247_234_487_294.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2F59b0feced866bc1c257d4852ad58b2157ba14d2be7f963da2b90205fbcee9c4a"
    caption="Solid ⇌ Vapours (Heating/Cooling)"
  />,
  <p key="b3-p-s182-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Theory.</strong> Only those substances whose vapour pressures become equal to the atmospheric pressure much
    before their respective melting points are capable of undergoing sublimation. For example, dry ice (solid
    carbon dioxide) sublimes at −78°C (195 K).
  </p>,
  <p key="b3-p-s182-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Examples of some other substances which undergo sublimation on heating are: ammonium chloride,
    camphor, naphthalene, anthracene, benzoic acid, iodine, etc.
  </p>,
  <p key="b3-p-s182-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us now demonstrate the process of sublimation by taking the example of ammonium chloride. Take
    some ammonium chloride. Powder it in a pestle and mortar and place it in a clean and dry china dish.
    Cover the china dish with a perforated filter paper. Place an inverted funnel on the filter paper as shown
    in Fig. 1.7. Close the stem of the funnel with a cotton plug.
  </p>,
  <Fig key="fig-1-7"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_2/imgs/img_in_image_box_604_210_1040_699.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2Fe106ca9f17d68eb45bec80ffa688f43b35056bb1a3d86271a8e3ab84960d8039"
    num="Fig. 1.7"
    caption="Sublimation of ammonium chloride"
  />,
  <p key="b3-p-s182-6" style={{ textIndent: 28, textAlign: "justify" }}>
    On heating the china dish, the vapours of ammonium chloride rise up, pass through the holes in the
    filter paper, get cooled in the upper portion of the funnel and change into the solid form. The solid thus
    formed gets deposited on the inner walls of the funnel. When the experiment is over, the pure solid is
    scrapped from the inverted funnel with a spatula or a knife on a clean watch glass.
  </p>,
  <p key="b3-p-s182-7" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Applications of sublimation.</strong> (<em>i</em>) The process of sublimation is very useful in the purification of such
    solids which sublime on heating and contain non-volatile impurities. For example, when an impure sample
    of naphthalene containing non-volatile impurities is heated; naphthalene will form vapours which will
    get deposited on the upper cooler portion of the funnel while the non-volatile impurities remain in the dish.
  </p>,
  <p key="b3-p-s182-8" style={{ margin: "3px 0 3px 20px" }}>
    (<em>ii</em>) Separation of ammonium chloride or iodine from sodium chloride or sand.
  </p>,
  <p key="b3-p-s182-9" style={{ margin: "3px 0 8px 20px" }}>
    (<em>iii</em>) Purification of camphor or naphthalene.
  </p>,

  // 1.8.3 Crystallisation
  <SubHd key="sub-s183" id="s183" label="1.8.3" title="How can we obtain pure Copper Sulphate from an Impure sample? – Crystallisation" />,
  <DefBox key="def-s183-crys">
    <em>Crystals are the purest form of a substance having definite geometrical shapes. The process by
    which an impure compound is converted into its crystals is known as </em><strong>crystallisation.</strong>
  </DefBox>,
  <p key="b3-p-s183-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Theory.</strong> This is one of the most commonly used techniques for purification of inorganic/organic solids.
    This is based upon the principle that <em>when a crystal is formed, it tends to exclude the impurities which
    remain in the solution.</em> Let us explain the process of crystallization by taking the example of purification
    of impure copper sulphate.
  </p>,
  <p key="b3-p-s183-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Take about 5 g of impure copper sulphate and dissolve it in minimum amount of water in a china dish.
    The solution is then filtered to remove insoluble and suspended impurities. Thereafter, the filtrate is
    evaporated in a china dish so as to get a saturated solution. The hot saturated solution thus obtained is
    allowed to stand undisturbed for a few hours when crystals of pure copper sulphate separate out*. These
    crystals are separated by filtration through an ordinary funnel as shown in Fig. 1.8 and the{" "}
    <em>filtrate left after the separation of crystals is called the </em><strong>mother liquor.</strong>
  </p>,
  <Fig key="fig-1-8"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_3/imgs/img_in_image_box_247_289_965_665.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2F937377f2d43222d69bb87c408fccf5a6acefef62b163a952f03fe0f1293537f3"
    num="Fig. 1.8"
    caption="Filtration"
  />,
  <p key="b3-p-s183-3" style={{ textIndent: 28, textAlign: "justify" }}>
    A round filter paper is folded as shown in Fig. 1.8 (<em>a</em>) and (<em>b</em>) and then converted into a cone as shown
    in Fig. 1.8 (<em>c</em>). The filter paper cone is then fixed in the funnel and filtration is carried out as shown in
    Fig. 1.8 (<em>d</em>).
  </p>,
  <p key="b3-p-s183-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Sometimes the filtration process is very slow and takes a lot of time. In such cases, filtration is carried
    out under reduced pressure using a Buchner funnel and water suction pump as shown in Fig. 1.9.
  </p>,
  <Fig key="fig-1-9"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_3/imgs/img_in_image_box_324_834_924_1185.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2F80745a5467f6447cd6b0136a269423d17bd3873129368fe7c64c07549d6b208b"
    num="Fig. 1.9"
    caption="Quick filtration process using a Buchner funnel and a water suction pump"
  />,
  <FootNote key="fn-s183">
    Sometimes crystals do not appear even after a long time in spite of the fact that solubility of the solute decreases as the temperature is reduced. This happens when the solution becomes supersaturated, <em>i.e.,</em> the concentration of the solute is much higher than the equilibrium concentration. Since supersaturated solutions are unstable, crystallization can be induced either by scratching the sides of the test-tube with a glass rod or by adding a small crystal of the pure substance to the solution. This provides tiny fragments of glass or some particles of the pure substance as nuclei for crystallization. <em>This process of inducing crystallization by adding a crystal of the pure substance into the saturated solution is called </em><strong>seeding</strong><em> and the crystal of the pure substance is called the </em><strong>seed crystal.</strong>
  </FootNote>,
  <p key="b3-p-s183-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Advantages of crystallisation over evaporation.</strong> Crystallisation is a better technique than evaporation
    to purify a solid because of the following reasons:
  </p>,
  <p key="b3-p-s183-6" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>i</em>) During evaporation, the solution is heated to dryness. During this heat treatment, some solids may
    decompose or some solids, like sugar, may get charred.
  </p>,
  <p key="b3-p-s183-7" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>ii</em>) Both for evaporation or crystallisation the solution of the impure solid is prepared in water or any
    other suitable solvent. This solution is then filtered to remove insoluble and suspended impurities.
    However, some soluble impurities may still be present even after filtration. Therefore, when such a
    solution is evaporated, the impurities get deposited along with the solid and thus contaminate the solid.
    In contrast, when the solution is allowed to stand for crystallization, crystals of the pure solid separate
    out leaving the impurities in the solution.
  </p>,
  <p key="b3-p-s183-8" style={{ fontWeight: 700, margin: "8px 0 5px" }}>Applications of crystallisation.</p>,
  <p key="b3-p-s183-9" style={{ margin: "4px 0 4px 20px", textAlign: "justify" }}>
    (<em>i</em>) The salt that we get from sea water contains a number of impurities. To remove these impurities, the
    process of crystallisation is used.
  </p>,
  <p key="b3-p-s183-10" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>ii</em>) Crystallisation can also be used to obtain pure alum (<em>phitkari</em>), nitre (potassium nitrate), etc. from
    impure samples.
  </p>,
  <p key="b3-p-s183-11" style={{ textIndent: 28, textAlign: "justify" }}>
    Some other examples are:
  </p>,
  <p key="b3-p-s183-12" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>i</em>) <strong>Crystallization of sugar.</strong> Suppose we have a sample of sugar containing an impurity of common
    salt (sodium chloride). This can be purified by shaking the impure solid with hot ethanol at 348 K. The
    sugar will dissolve whereas common salt remains insoluble. The hot solution is filtered, concentrated and
    then allowed to cool when crystals of sugar will separate out. Had water been used as a solvent, the
    purification of sugar would not have been possible since both sugar and common salt are readily soluble
    in water.
  </p>,
  <p key="b3-p-s183-13" style={{ margin: "4px 0 8px 20px", textAlign: "justify" }}>
    (<em>ii</em>) <strong>Crystallization of benzoic acid.</strong> Suppose we have a mixture of benzoic acid and naphthalene.
    This mixture can be purified by treating the impure solid with hot water. Benzoic acid will dissolve while
    naphthalene remains insoluble. The crystals are separated by filtration and dried. Had benzene been used
    as a solvent, instead of water in this case, the purification of benzoic acid would not have been possible
    since both benzoic acid and naphthalene are quite soluble in benzene.
  </p>,

  // 1.8.4 Centrifugation
  <SubSubHd key="sub-s184" id="s184" label="1.8.4" title="How can we separate Cream from Milk? – Centrifugation" />,
  <p key="b3-p-s184-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Sometimes, the solid particles in a liquid mixture are very small and thus easily pass through a filter
    paper. Therefore, such particles cannot be separated by filtration technique. However, such mixtures can
    be easily separated by the technique of centrifugation.
  </p>,
  <p key="b3-p-s184-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Theory.</strong> <em>This technique is based upon the principle that when a mixture is rotated at a high speed,
    the lighter particles stay on the surface of the liquid while the heavier particles are forced to the bottom
    of the liquid.</em>
  </p>,
  <p key="b3-p-s184-3" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, when milk is rotated at a high speed in a centrifugation machine. The lighter fat particles
    collide with each other to form cream which stays on the surface while the heavier particles of the milk
    are forced to come to the bottom. As a result, separation occurs and the cream is collected from the outlet
    provided near the top of the centrifugation machine while the milk is collected through an outlet provided
    near the bottom of the machine. By using the technique of centrifugation, different varieties of milk
    containing different amounts of cream such as full cream, toned and double toned varieties of milk are
    prepared. These are packed in polypacks or tetrapacks and then sold in the market.
  </p>,
  <p key="b3-p-s184-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Although a variety of electric centrifugation machines are available but for clarity and better
    understanding of the 9th grade students, a hand driven centrifugation technique is shown in Fig. 1.10.
  </p>,
  <Fig key="fig-1-10"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//57c79c8e-7fbd-45c6-b9e3-b8ccdb0d07da/markdown_4/imgs/img_in_image_box_843_1083_1002_1275.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A32Z%2F-1%2F%2Fc854201e1e7d098a62ac10bf27b557ec00ccf54294fe6c359a9168c7d860b83a"
    num="Fig. 1.10"
    caption="Hand driven centrifugation machine"
  />,
  <p key="b3-p-s184-5" style={{ textIndent: 28, textAlign: "justify" }}>
    The most important precaution while operating centrifugation machine is that each centrifugation tube
    containing the sample is balanced by an opposite centrifugation tube containing an equal amount of
    either the sample or water. This is needed to maintain stability during high speed rotation.
  </p>,
];


// ── CONTENT ARRAY — BATCH 4 ───────────────────────────────────
const content_b4 = [
  // Making and Working of Paperfuge (FeatureBox inside 1.8.4)
  <FeatureBox key="feat-paperfuge" title="Making and Working of Paperfuge">
    <p style={{ margin: "0 0 6px" }}>
      <strong>Introduction.</strong> It is a human powered centrifuge made from paper and string. It is capable of spinning
      at speeds upto 125,000 RPM. It was developed by research group of <strong>Manu Prakash,</strong> an Indian scientist,
      at Stanford University, USA. It is a 'frugal Science' tool for diagnosing diseases like malaria in areas
      without electricity.
    </p>
    <p style={{ margin: "0 0 5px" }}><strong>Materials Needed.</strong></p>
    <p style={{ margin: "2px 0" }}>(<em>i</em>) Adhesive (Tape or glue), twine or strong string.</p>
    <p style={{ margin: "2px 0" }}>(<em>ii</em>) Cardboard or thick paper and a strong string (about 3 feet long).</p>
    <p style={{ margin: "2px 0" }}>(<em>iii</em>) A four whole shirt button.</p>
    <p style={{ margin: "2px 0" }}>(<em>iv</em>) Handles (PVC pipe).</p>
    <p style={{ margin: "2px 0 8px" }}>(<em>v</em>) Small tubes or vials for samples.</p>
    <p style={{ margin: "0 0 5px" }}><strong>Step by step Assembly.</strong></p>
    <p style={{ margin: "2px 0" }}>(<em>i</em>) Cut two identical discs out of cardboard (approx. 2-4 inches in diameter).</p>
    <p style={{ margin: "2px 0" }}>(<em>ii</em>) Tape and glue them together for thickness.</p>
    <p style={{ margin: "2px 0" }}>(<em>iii</em>) Glue a 4-hole button in the centre of your paper disc.</p>
    <p style={{ margin: "2px 0" }}>(<em>iv</em>) Ensure the button's holes align with the disc's centre.</p>
    <p style={{ margin: "2px 0" }}>(<em>v</em>) Pass your long string through two opposite holes in the button and repeat the process with the other string.</p>
    <p style={{ margin: "2px 0" }}>(<em>vi</em>) Tie the ends of the string together to form a continuous loop with the paper disc in the middle.</p>
    <p style={{ margin: "2px 0 8px" }}>(<em>vii</em>) Take two sample tubes fill them with sample, seal them and fix them securely with tapes on the opposite sides of the disc. Ensure they are balanced on opposite sides to maintain stability during high-speed rotation. To make pulling easier, tie wooden handles to the ends of the string loops.</p>
    <p style={{ margin: "0 0 5px" }}><strong>How to operate?</strong></p>
    <p style={{ margin: "2px 0" }}>(<em>i</em>) <strong>Wind it up.</strong> Hold one end of the string loop in each hand. Give the disc a few initial spins to twist the string.</p>
    <p style={{ margin: "2px 0" }}>(<em>ii</em>) Pull your hands apart quickly to unwind the string and spin the disc for 2-4 minutes.</p>
    <p style={{ margin: "2px 0" }}>(<em>iii</em>) As the string finishes unwinding, it will automatically start rewinding in the opposite direction due to disc's momentum.</p>
    <p style={{ margin: "2px 0" }}>(<em>iv</em>) <strong>Maintain speed.</strong> Move your hands in and out rhythmically – similar to playing with a whirligig toy to keep the disc spinning at high speeds.</p>
    <p style={{ margin: "2px 0 8px" }}>(<em>v</em>) After the operation, detach the sample tubes carefully. You will see two layers. Carefully separate the two layers using a dropper.</p>
    <p style={{ margin: "0 0 5px" }}><strong>Precaution.</strong></p>
    <p style={{ margin: "2px 0" }}>(<em>i</em>) Ensure the two sample tubes are securely fixed in either face to maintain stability during high speed rotation.</p>
    <p style={{ margin: "2px 0" }}>(<em>ii</em>) Attach wooden handles on either side of the string to make pulling easier and avoid hurting your fingers.</p>
    <p style={{ margin: "2px 0 8px" }}>(<em>iii</em>) Always use shatterproof eye protection while spinning the centrifuge, as components can detach at high speeds.</p>
    <p style={{ margin: "0 0 5px" }}><strong>Applications of centrifugation.</strong></p>
    <p style={{ margin: "2px 0" }}>(<em>i</em>) The technique of centrifugation is used in diagnostic laboratories for blood and urine samples.</p>
    <p style={{ margin: "2px 0" }}>(<em>ii</em>) It is used in dairies and homes to separate cream from milk.</p>
    <p style={{ margin: "2px 0" }}>(<em>iii</em>) Centrifugation technique is also used in washing machines to squeeze out water from wet clothes.</p>
    <p style={{ margin: "2px 0" }}>(<em>iv</em>) It is used in laboratories for DNA/protein extraction, for clarifying wines/juices, for waste water treatment and for separating solids from oils.</p>
    <p style={{ margin: "2px 0" }}>(<em>v</em>) Centrifugation can be used to separate the four components of blood based upon density. The heavier red blood cells (RBCs) stay at the bottom, followed by a thin 'buffy coat' of white blood cells (WBCs) and platelets in the middle and lighter plasma at the top.</p>
    <p style={{ margin: "2px 0" }}>(<em>vi</em>) One of the most interesting and useful applications is in nuclear technology. Gas centrifuges machines are used to separate U-235 and U-238. For this purpose, uranium is first converted into UF<Sub c="6" />. The sight difference in mass of <Sup c="235" />UF<Sub c="6" /> and <Sup c="238" />UF<Sub c="6" /> is then separated by gas centrifuge machine when the lighter <Sup c="235" />UF<Sub c="6" /> (0·852%) lighter than <Sup c="238" />UF<Sub c="6" />. A series of identical stages produces successively higher concentration of <Sup c="235" />U. Each stage passes a slightly more concentrated product to the next stage and returns a slightly less concentrated residue to previous stage. This is how enrichment of U-235 is carried out.</p>
  </FeatureBox>,

  // 1.8.5 Coagulation
  <SubSubHd key="sub-s185" id="s185" label="1.8.5" title="Coagulation" />,
  <p key="b4-p-s185-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Definition, theory and some examples of coagulation <em>by addition of some chemical substances</em> like alum
    and ferric chloride have already been discussed under article 1.6.4.
  </p>,
  <p key="b4-p-s185-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Besides this, coagulation can also be achieved either by acids or by heat as discussion below:
  </p>,
  <p key="b4-p-s185-3" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, fontSize: 13.5, margin: "8px 0 5px" }}>
    Coagulation by addition of Acids
  </p>,
  <p key="b4-p-s185-4" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    (<em>i</em>) <strong>Formation of Yoghurt (curd).</strong> Milk is warmed to about 305-315 K, a little Yoghurt is then added
    and left it undisturbed for few hours. During this period, bacteria grows and produces lactic acid. Lactic
    acid thus produced decreases the <em>p</em>H and breaks the bond between calcium and the milk protein casein.
    The free casein particles then undergo coagulation to form Yoghurt.
  </p>,
  <p key="b4-p-s185-5" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    (<em>ii</em>) <strong>Formation of cheese.</strong> When milk is heated with an acid (lemon juice or tartaric acid), the milk
    protein <em>lactalbumin</em> gets coagulated to form cheese. During this coagulation, the soluble globular protein
    becomes insoluble fibrous protein.
  </p>,
  <p key="b4-p-s185-6" style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
    (<em>iii</em>) <strong>Coagulation by heat.</strong> When egg is boiled hard, coagulation occurs due to conversion of soluble
    egg protein <em>albumin</em> to insoluble fibrous protein.
  </p>,

  // 1.8.6 Distillation
  <SubHd key="sub-s186" id="s186" label="1.8.6" title="How can we separate a mixture of two Miscible Liquids – Distillation" />,
  <DefBox key="def-s186-dist">
    <em>Distillation involves conversion of a liquid into vapours by heating followed by condensation of
    the vapours thus produced by cooling.</em>
  </DefBox>,
  <p key="b4-p-s186-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Distillation is used for the separation of components of a mixture containing two miscible liquids which
    boil without decomposition and have sufficient difference (30–50 K) in their boiling points.
  </p>,
  <p key="b4-p-s186-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us illustrate the process of distillation for separating a mixture of acetone (b.p. 329 K) and water
    (b.p. 373 K). The apparatus used is shown in Fig. 1.11.
  </p>,
  <p key="b4-p-s186-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Principle.</strong> The separation is based upon the principle that at the boiling point (b.p.) of the more volatile
    (low boiling) liquid of the mixture, the vapours almost exclusively consist of the more volatile liquid.
    Likewise, at the b.p. of the less volatile (high boiling) liquid, vapours almost entirely consist of the less
    volatile liquid since the more volatile liquid has already distilled over. <em>Thus, the separation of the liquid
    mixture into individual components can be achieved at their respective boiling points; the more volatile
    component distils over first while the less volatile component distils over afterwards.</em>
  </p>,
  <p key="b4-p-s186-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Procedure.</strong> As the flask is heated, the vapours of the low boiling liquid, (<em>i.e.,</em> acetone) start forming.
    As these vapours travel upwards, the temperature on the thermometer starts rising. When the vapour
    pressure of acetone becomes equal to that of the atmosphere, acetone starts boiling (329 K). These
    vapours on passing through the condenser get condensed to form liquid acetone which gets collected in
    the beaker. When whole of acetone has distilled, the temperature on the thermometer falls. As heating is
    continued further, the vapours of the high boiling component of the mixture (<em>i.e.,</em> water), start forming.
    As these vapours travel upwards, the temperature again starts rising. When the vapour pressure of water
    becomes equal to that of the atmosphere, it starts boiling. The vapours of water move upwards, and on
    passing through the condenser they get condensed to form liquid water which is collected in another
    beaker. The non-volatile impurities and impurities of liquids having boiling points much higher than
    those of the two liquids separated above are, however, left in the distillation flask.
  </p>,
  <Fig key="fig-1-11"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//b20d0647-a7f3-46e2-8844-4f37e2a48511/markdown_2/imgs/img_in_image_box_219_202_1011_688.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2F5982e3e7ea99d01a576270dbbe371cecba2b294000c72704a73f609e7a9cd0f7"
    num="Fig. 1.11"
    caption="Separation of two miscible liquids by distillation"
  />,
  <p key="b4-p-s186-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Applications of distillation.</strong> The technique of distillation can be used to separate:
  </p>,
  <p key="b4-p-s186-6" style={{ margin: "3px 0 3px 20px" }}>(<em>i</em>) a mixture of ether (b.p. 308 K) and toluene (b.p. 384 K).</p>,
  <p key="b4-p-s186-7" style={{ margin: "3px 0 3px 20px" }}>(<em>ii</em>) a mixture of hexane (b.p. 342 K) and toluene (b.p. 384 K).</p>,
  <p key="b4-p-s186-8" style={{ margin: "3px 0 8px 20px" }}>(<em>iii</em>) a mixture of benzene (b.p. 353 K) and aniline (b.p. 457 K) or nitrobenzene (b.p. 483 K).</p>,

  // Knowledge Booster — Traditional Method of Manufacturing Attar
  <KBBox key="kb-attar">
    <KBHd>• Traditional Method of Manufacturing Attar</KBHd>
    <p style={{ textIndent: 28, textAlign: "justify", margin: "0 0 8px" }}>
      Attars (perfumes) using Hydrodistillation (Deg and Bhapka) method has been used in Kannauj (small
      city in Uttar Pradesh) since ancient times is similar to modern distillation apparatus (Fig. 1.12).
    </p>
    <Fig key="fig-1-12"
      src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//b20d0647-a7f3-46e2-8844-4f37e2a48511/markdown_2/imgs/img_in_image_box_230_1108_1040_1330.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2Fe22996dd901b8427a28038586b6c1aba5ca5e2f06e6417ef06e83141dda6edc3"
      num="Fig. 1.12"
      caption="Deg and Baphka method of manufacture of Attar (Perfume)"
    />
    <ul style={{ margin: "6px 0 4px", paddingLeft: 24, listStyleType: "disc", fontSize: 14, lineHeight: 1.7 }}>
      <li>Here flask called <strong>DEG</strong> is made up of copper metal and connected to Bamboo receiver called <strong>(CHONGA)</strong> is placed in cooling water tank called <strong>GACHCHI.</strong></li>
      <li>After putting a mixture of rose petals (whose attar to be extracted) and water in Deg, it is sealed with clay and cotton.</li>
      <li>Deg is heated for few hours and the first distillate is collected in the receiver.</li>
      <li>The liquid is transferred to an empty copper pot and distilled again.</li>
      <li>In the 2nd distillation the true attar is extracted.</li>
    </ul>
  </KBBox>,

  // 1.8.7 Fractional Distillation
  <SubHd key="sub-s187" id="s187" label="1.8.7" title="Fractional Distillation" />,
  <p key="b4-p-s187-1" style={{ textIndent: 28, textAlign: "justify" }}>
    If the boiling points of the two miscible liquids of the mixture are very close to one another, <em>i.e.,</em> less
    than 25 K or so, the separation cannot be achieved by the simple distillation method as described above.
    <em> This is due to the reason that at the b.p. of the more volatile liquid of the mixture there will be sufficient
    vapours of the less volatile liquid as well. As a result, both the liquids of the mixture will distil together
    and the separation cannot be achieved.</em>
  </p>,
  <p key="b4-p-s187-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The separation of such a liquid mixture into individual components can, however, be achieved by
    <strong> fractional distillation,</strong> <em>which involves repeated distillations and condensations.</em> Fractional
    distillation is carried out using a <strong>fractionating column.</strong> It usually consists of a long glass tube with a
    wide bore packed with glass beads or small stones or porcelain pieces. <em>The actual purpose of the
    fractionating column is to increase the cooling surface area and to provide hurdles or obstructions to
    the ascending vapours and descending liquid.</em>
  </p>,
  <p key="b4-p-s187-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Procedure.</strong> The apparatus used for fractional distillation is shown in Fig. 1.13.
  </p>,
  <p key="b4-p-s187-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Suppose we have a mixture of two liquids chloroform and benzene of which chloroform is more volatile
    (b.p. 334 K) than benzene (b.p. 353 K). When such a liquid mixture is heated, the temperature rises
    slowly and the mixture starts boiling. <em>The vapours formed mainly consist of the more volatile liquid,
    i.e., chloroform</em> with little of the less volatile liquid, <em>i.e., benzene.</em> As these vapours travel up the
    fractionating column, the vapours of the less volatile liquid (<em>i.e.,</em> benzene) condense more readily than
    those of the more volatile liquid, <em>i.e.,</em> chloroform. Therefore, the vapours rising above become richer in
    chloroform and the liquid flowing down becomes richer in benzene. This process of distillation and
    condensation is repeated at every point in the fractionating column. As a result of series of successive
    distillations, by the time the vapours reach the top of the column and escape into the condenser, they
    consist entirely of the more volatile component, <em>i.e.,</em> chloroform. It is collected in a flask. When the
    more volatile component has completely distilled over, the temperature will again start rising and when
    the boiling point of the less volatile component is reached, benzene starts distilling which is collected
    in another flask. In this way, separation of two miscible liquids whose boiling points differ by less than
    25 K can be achieved.
  </p>,
  <Fig key="fig-1-13"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//b20d0647-a7f3-46e2-8844-4f37e2a48511/markdown_3/imgs/img_in_image_box_256_839_962_1336.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A32Z%2F-1%2F%2Fea0988df0c9bd259eccc76b2ece68a967d36db93ea5de90b328c551375d28039"
    num="Fig. 1.13"
    caption="Fractional distillation"
  />,
  <p key="b4-p-s187-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Applications of fractional distillation.</strong> (<em>i</em>) The process of fractional distillation has been used to
    separate crude oil in petroleum industry into various useful fractions such as gasoline, kerosene oil,
    diesel oil, lubricating oil, etc.
  </p>,
  <p key="b4-p-s187-6" style={{ margin: "3px 0 3px 20px" }}>(<em>ii</em>) Fractional distillation of liquid air is used to separate gases of the air.</p>,
  <p key="b4-p-s187-7" style={{ margin: "3px 0 8px 20px", textAlign: "justify" }}>
    (<em>iii</em>) Fractional distillation has been used to separate a mixture of acetone (b.p. 329 K) and methyl
    alcohol (b.p. 338 K) from <strong>pyroligneous acid</strong> obtained by destructive distillation of wood.
  </p>,
  <p key="b4-p-s187-8" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Limitations of fractional distillation.</strong> The components of constant boiling mixtures called{" "}
    <strong>azeotropes</strong> cannot be separated by fractional distillation. For example, <strong>rectified spirit</strong> consists of 95%
    alcohol (b.p. 78°C or 351 K) and 5% water (b.p. 100°C or 373 K). Its components cannot be separated
    by fractional distillation because they form a constant boiling mixture (<em>azeotrope</em>) even though their
    boiling points differ by 22°C.
  </p>,

  // 1.8.8 Chromatography
  <SubHd key="sub-s188" id="s188" label="1.8.8" title="Is the Dye in Black Ink a Single Colour? – Chromatography" />,
  <p key="b4-p-s188-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Chromatography is the most modern and versatile method used for the separation, purification and
    testing the purity of inorganic and organic compounds. This method was first discovered by{" "}
    <strong>Tswett,</strong> a Russian botanist, in 1906. This technique was first used for separation of coloured substances
    (plant pigments) and hence the name chromatography was given. <strong>Kroma</strong> in Greek means{" "}
    <em>colour</em> and <strong>graphy</strong> means <em>writing.</em> However, now this method is widely used for separation,
    purification, identification and characterization of both colourless and coloured components of a mixture.
  </p>,
  <p key="b4-p-s188-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Types of chromatography.</strong> With the advancement in technology, many types of chromatography such
    as column chromatography, thin layer chromatography (TLC), gas-liquid chromatography (GLC), high
    performance liquid chromatography (HPLC), etc. have been developed but the simplest form of
    chromatography is <strong>paper chromatography.</strong> Therefore, we will discuss paper chromatography here while
    other types of chromatographies you will learn in higher classes.
  </p>,
  <p key="b4-p-s188-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Usually the ink that we use is a solution of two or more different coloured dyes in water. With the help
    of paper chromatography, we can easily identify the different coloured dyes present in ink.
  </p>,
  <p key="b4-p-s188-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Theory.</strong> We know that two or more different substances may be soluble in the same solvent but their
    solubilities are usually different. Thus, when a solvent (say water) is allowed to pass over a mixture of
    such substances, the substance which is more soluble in the solvent moves faster and thus gets separated
    from the other substances in the mixture which moves slowly. Thus,{" "}
    <em><strong>separation/identification of different components of a mixture by paper chromatography is
    based upon their different solubilities in the same solvent.</strong></em>
  </p>,
  <p key="b4-p-s188-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Procedure.</strong> To carry out the experiment, take a thin strip of a special type of filter paper called the{" "}
    <strong>chromatographic filter paper.</strong> Using a pencil, draw a line across the width of the filter paper at about
    3 cm from the bottom (Fig. 1.14 <em>a</em>). Put a small drop of ink from a sketch pen or a fountain pen at the
    centre of this line and let it dry. Suspend the paper in a glass jar containing water so that the spot of ink
    on the paper is just above the water level as shown in Fig. 1.14 (<em>b</em>).
  </p>,
  <Fig key="fig-1-14"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//73aa8711-939c-4ac7-986c-ef71f6652fa3/markdown_0/imgs/img_in_image_box_229_201_990_459.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A30Z%2F-1%2F%2F4bae36ea02c8d7950ed26dd77f4046d791bb876e1915dee72038848ed40797df"
    num="Fig. 1.14"
    caption="Separation of dyes in black ink using chromatography"
  />,
  <p key="b4-p-s188-6" style={{ textIndent: 28, textAlign: "justify" }}>
    As water rises up the paper by capillary action and flows over the spot, it takes along with it dye
    particles. Usually, ink is a mixture of two or more coloured dyes. The coloured component which is more
    soluble in water, rises faster and produces a coloured spot on the paper at a higher position. The less
    soluble components rise slower and produce coloured spots at lower heights. In this way, all the dyes
    present in the black ink get separated as shown in Fig. 1.14 (<em>c</em>).
  </p>,
  <p key="b4-p-s188-7" style={{ textIndent: 28, textAlign: "justify" }}>
    When the water reaches near the top end of the filter paper strip, the paper strip is removed from the
    jar and dried. This paper with coloured spots at different heights is called the <strong>chromatogram</strong> (Fig. 1.14 <em>d</em>).
  </p>,
  <p key="b4-p-s188-8" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Applications of chromatography.</strong> Chromatography is an important and powerful tool for chemical
    analysis. It is used:
  </p>,
  <p key="b4-p-s188-9" style={{ margin: "3px 0 3px 20px" }}>(<em>i</em>) to separate coloured substances present in dyes and natural pigments</p>,
  <p key="b4-p-s188-10" style={{ margin: "3px 0 3px 20px" }}>(<em>ii</em>) to separate and identify the amino acids obtained by hydrolysis of proteins.</p>,
  <p key="b4-p-s188-11" style={{ margin: "3px 0 3px 20px" }}>(<em>iii</em>) to detect and identify drugs present in the blood of criminals in forensic science.</p>,
  <p key="b4-p-s188-12" style={{ margin: "3px 0 3px 20px" }}>(<em>iv</em>) to separate small amounts of different products of a chemical reaction.</p>,
  <p key="b4-p-s188-13" style={{ margin: "3px 0 8px 20px" }}>(<em>v</em>) to monitor the progress of a reaction.</p>,
  <p key="b4-p-s188-14" style={{ textIndent: 28, textAlign: "justify" }}>
    The position of each spot in the chromatograph is usually expressed in terms of R<Sub c="f" /> (Rate of
    flow) value, <em>i.e.,</em>
  </p>,
  <MathBlock key="b4-math-rf">
    R<Sub c="f" /> = <Frac n="Distance moved by any spot" d="Distance moved by the solvent" />
  </MathBlock>,
  <p key="b4-p-s188-15" style={{ textIndent: 28, textAlign: "justify" }}>
    Since solvent moves faster than compound, therefore, R<Sub c="f" /> values are always less than 1.
  </p>,

  // Knowledge Booster 2 — Lab Safety + Societal Impact
  <KBBox key="kb-lab">
    <KBHd>1. Handling of Common Laboratory Chemicals and Apparatus Safely</KBHd>
    <ul style={{ margin: "4px 0 8px", paddingLeft: 24, listStyleType: "disc", fontSize: 14, lineHeight: 1.7 }}>
      <li>Lab coat to be worn all the time.</li>
      <li>Safety goggles must be worn all the time while working in the laboratory.</li>
      <li>Wear gloves while handling chemicals. Always use fresh gloves.</li>
      <li>Be sure to wash your hands after you are finished working in the labs.</li>
      <li>Dispose off waste properly. Do not pour down the drain.</li>
      <li>Never inhale fumes or vapours.</li>
      <li>Always waft odours towards your nose with your hand.</li>
      <li>Use fume hoods for dangerous or irritating chemicals.</li>
    </ul>
    <KBHd>2. Societal Impact of Chemistry in making life healthier, cleaner and sustainable</KBHd>
    <p style={{ textIndent: 28, textAlign: "justify", margin: "4px 0 8px" }}>
      Chemistry contributes virtually to every aspect of our modern life as briefly described below:
    </p>
    <p style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
      (<em>i</em>) <strong>Medicine and Healthcare.</strong> Use of knowledge of chemistry is involved in every drug you take
      whether it is a painkiller or a life-saving antibiotic. Chemists have been able to make such molecules
      which interact in the body in separate ways. For example, during COVID-19, chemists developed vaccines
      and booster shots to fight <strong>corona virus.</strong> Chemistry has also been useful in numerous other ways such as
      providing super foods, clean water to drink and clean air to breathe. They have also made several
      antibacterials such as soaps, shampoos, toothpaste, mouthwash and hand sanitizers for our personal hygiene.
    </p>
    <p style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
      (<em>ii</em>) <strong>Fuel and power generations.</strong> Chemistry has also provided mankind better ways to produce
      pollution free fuel. For example, fossil energy has been converted into electricity and have developed{" "}
      <strong>lathium ion batteries</strong> which have high charge density, longer life span and have deep cycle while
      maintaining. Similarly, there are two types of rocket fuels namely, solid and liquid fuel. The components
      of liquid fuel are liquid hydrogen and liquid oxygen and the components of solid fuel are aluminium and
      ammonium perchlorate. However, both liquid and solid fuels are required to launch a rocket into space.
    </p>
    <p style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
      (<em>iii</em>) <strong>Clean environment.</strong> Chemistry plays a critical role in the development of sustainable products.
      These products are obtained from natural renewable sources and hence reduce air pollution, remove harmful
      substances from water supply. In homes and vehicles, now CNG or PNG is used instead of petrol, diesel
      and LPG.
    </p>
    <p style={{ margin: "4px 0 8px 0", textAlign: "justify" }}>
      (<em>iv</em>) <strong>Clothes.</strong> As an alternative to natural sources such as cotton, wool and silk, chemistry has provided
      mankind another cheap and more durable clothing fibres like nylon, terylene, orlon, etc. Since these
      fibres are not degraded over a period of time and hence cause pollution.
    </p>
    <FeatureBox key="feat-dilip" title="■ Contribution of Indian Scientist – Dilip Mahalanabis (ORS)">
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        <strong>Dilip Mahalanabis (1934–2022)</strong> was an Indian paediatrician known for pioneering the use of ORT
        (Oral Rehydration Therapy) to treat diarrhoeal diseases. He started researching oral rehydration therapy
        in 1966 as a research investigator for the Johns Hopkins University International Centre at Calcutta.
        During the Bangladesh war for independence, he demonstrated the life saving effectiveness of oral
        rehydration therapy when cholera broke out in 1971 among refugees from east Bengal (now Bangladesh)
        who had sought asylum in West Bengal. The simple inexpensive Oral Rehydration Solution (ORS) gained
        acceptance and was later hailed as one of the most important medical advances of 20th century.
      </p>
      <p style={{ margin: "0", textAlign: "justify" }}>
        In 2002, he co-received the Pollin Prize – a prestigious international award for Pediatrics research
        for his contribution w.r.t. ORS. He also received Prince Mahidol award, the highest civilian award of
        Thailand. In 2006 he was awarded <strong>PADMA VIBHUSHAN</strong> (Posthumous) in 2023.
      </p>
    </FeatureBox>
    <FeatureBox key="feat-blood" title="■ Can we Create Artificial Blood that works just as well as Real Blood?">
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        Natural blood is a remarkable substance. It is not just a simple red liquid; it is a complex living tissue.
        It consists of <strong>four major components:</strong> (<em>i</em>) red blood cells called <strong>haemoglobin,</strong>{" "}
        (<em>ii</em>) <strong>white blood cells</strong> which fight infections, (<em>iii</em>) <strong>platelets</strong> which cause blood clotting and
        (<em>iv</em>) yellow liquid called <strong>plasma,</strong> which carry nutrients, hormones, and waste products.
      </p>
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        <em>The main job which a blood substance is to carry oxygen.</em> When a person loses lot of blood in an
        accident or during surgery, the immediate danger is that their tissues won't get enough oxygen. A
        substance that can handle this critical task would save life. A true artificial replacement would need
        to do every thing blood does, from fighting infections to clotting without being rejected by the body's
        immune system.
      </p>
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        <em>Storing donated blood is also tricky.</em> It has a short self-life and must be refrigerated and matches
        to recipient's blood type. An ideal artificial blood substance must be universal, storable for long periods
        at room temperature.
      </p>
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        Scientists have focussed on creating something simple, an oxygen carrier. These are not{" "}
        <em>true blood replacements but substitutes that can perform the most critical function of red blood cells.</em>{" "}
        The most promising candidates are called: <em>Haemoglobin-based oxygen carriers (HBOCs) and
        perfluorocarbons (PFC) emulsions.</em> The early attempts were not successful. The problem is that,
        when you mix haemoglobin into solution, the haemoglobin molecules will quickly breakdown or clump
        together and get filtered out by kidneys, causing damage. The particles were too unstable just like sand
        settling in water. Thus, the key problem is to convert unstable suspensions of oxygen carriers into a
        stable colloid where the particles remain evenly dispersed and don't settle out. To achieve this,
        scientists have used stabilizers to make particles larger and more stable allowing them to circulate into
        the blood stream for longer times without causing harm. No success so far, but efforts are continuing.
      </p>
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        For PFCs (commonly perfluorodecalin) which are synthetic chemicals which can dissolve large amounts
        of oxygen but PFCs do not mix with blood, much like oil and water. To make them work, they must be
        whipped into a stable emulsion.
      </p>
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        Creating stable colloid is only half the battle. The resulting substance must also be biocompatible,{" "}
        <em>i.e.,</em> it must not produce toxic effect on the body. For example, if the particles in blood substitute
        start aggregating, they can form blockages in small blood vessels, leading to stroke or heart attack.
        If they breakdown too quickly, they might release toxic components or fail to deliver oxygen where it
        is needed.
      </p>
      <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
        Thus, the challenge is to design particles that are stable enough to circulate for hours or even days,
        but that will also be safety cleared from the body once their job is done.
      </p>
      <p style={{ margin: "0", textAlign: "justify" }}>
        Researches are still continuing to evolve fine methods of creating colloids which have right particle
        size and chemical composition to improve both stability and biocompatibility. Thus, in nutshell, a true
        all purpose artificial blood substitute remains a goal for future.
      </p>
    </FeatureBox>
  </KBBox>,

  // Formulating and Investigating a Scientific Project
  <SubHd key="sub-sciproj" id="sciproj" label="■" title="Formulating and investigating a Scientific Project" />,
  <p key="b4-p-sc-1" style={{ margin: "6px 0 4px" }}>
    <strong>Observations.</strong>
  </p>,
  <p key="b4-p-sc-2" style={{ margin: "3px 0 3px 20px" }}>(<em>i</em>) When we spill a bottle of ammonia in one room, we get its smell in the other corner. How?</p>,
  <p key="b4-p-sc-3" style={{ margin: "3px 0 8px 20px" }}>(<em>ii</em>) When we light an incense stick in one corner of a room, we get its smell in the other corner of the room. How?</p>,
  <p key="b4-p-sc-4" style={{ margin: "6px 0 4px" }}>
    <strong>Hypothesis.</strong>
  </p>,
  <p key="b4-p-sc-5" style={{ margin: "3px 0 3px 20px" }}>(<em>i</em>) Do gases diffuse into one another?</p>,
  <p key="b4-p-sc-6" style={{ margin: "3px 0 8px 20px" }}>(<em>ii</em>) What is the relationship between the molecular mass and rate of diffusion?</p>,
  <p key="b4-p-sc-7" style={{ margin: "6px 0 4px" }}>
    <strong>Experiment 1.</strong>
  </p>,
  <p key="b4-p-sc-8" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Procedure.</strong> (<em>i</em>) Invert a gas jar containing hydrogen (colourless) and other gas jar containing nitrogen
    dioxide (reddish brown). Separate the two jars by a lid (Fig. 1.15).
  </p>,
  <Fig key="fig-1-15"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//73aa8711-939c-4ac7-986c-ef71f6652fa3/markdown_2/imgs/img_in_image_box_320_897_907_1215.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2F0edcd6d44824aeda15299e39f58849762a6451c0dc8c503548fe7e35b3e627cc"
    num="Fig. 1.15"
    caption="Diffusion of gases occurs against the law of gravitation"
  />,
  <p key="b4-p-sc-9" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) Now remove the lid. After sometime, you will find that both the gas jars have the same colour,{" "}
    <em>i.e.,</em> light brown. This suggests that lighter hydrogen gas has moved downwards and the heavier nitrogen
    dioxide gas has moved upwards. Ultimately the two gas jars contain the same uniform mixture of two gases
    and thus acquire the same light brown colour. This intermixing of gases is called <strong>diffusion.</strong>
  </p>,
  <p key="b4-p-sc-10" style={{ textIndent: 28, textAlign: "justify" }}>
    A familiar example of diffusion in our homes is that we come to know what is being cooked in the kitchen
    without even entering there, by the smell that reaches us. This is due to diffusion. The particles of the
    aroma (pleasant smell) of food mix with the particles of air and due to high speeds of these particles,
    the smell quickly reaches us. Since the rate of diffusion increases with temperature, therefore, the smell
    of hot cooked food travels faster than that of the cold food.
  </p>,
  <p key="b4-p-sc-11" style={{ margin: "8px 0 4px" }}>
    <strong>Experiment 2.</strong> To find out the relationship between molecular mass and rate of diffusion of a gas,
    let us set up another experiment.
  </p>,
  <p key="b4-p-sc-12" style={{ margin: "4px 0 4px" }}>
    <strong>Procedure.</strong> (<em>i</em>) Take a 1 meter long glass tube.
  </p>,
  <p key="b4-p-sc-13" style={{ margin: "3px 0 3px 20px" }}>(<em>ii</em>) Introduce ammonia gas from left end and hydrochloric acid gas from right end at equal pressure.</p>,
  <p key="b4-p-sc-14" style={{ margin: "3px 0 3px 20px" }}>(<em>iii</em>) Note the point on the tube where white vapours of ammonium chloride are first formed.</p>,
  <p key="b4-p-sc-15" style={{ margin: "3px 0 8px 20px" }}>(<em>iv</em>) Measure the distance of this point from either end and record your observations. (Fig. 1.16).</p>,
  <p key="b4-p-sc-16" style={{ margin: "4px 0 4px" }}><strong>Observations:</strong></p>,
  <Fig key="fig-1-16"
    src="https://pplines-online.bj.bcebos.com/deploy/official/paddleocr/pp-ocr-vl-15//73aa8711-939c-4ac7-986c-ef71f6652fa3/markdown_3/imgs/img_in_image_box_326_526_892_656.jpg?authorization=bce-auth-v1%2FALTAKzReLNvew3ySINYJ0fuAMN%2F2026-03-15T23%3A01%3A31Z%2F-1%2F%2Fa780440b91f39bbe78edcab5f8ab8720d7503d01788e7b052eb3b2748fc8dcf6"
    num="Fig. 1.16"
    caption="Distance travelled by NH₃ and HCl gases"
  />,
  <p key="b4-p-sc-17" style={{ margin: "4px 0 4px" }}>
    Mol. mass of NH<Sub c="3" /> = 17 g mol<Sup c="−1" /> and Mol. mass of HCl = 36·5 g mol<Sup c="−1" />
  </p>,
  <p key="b4-p-sc-18" style={{ margin: "3px 0 3px" }}>Distance travelled by NH<Sub c="3" /> = 59·4 cm</p>,
  <p key="b4-p-sc-19" style={{ margin: "3px 0 8px" }}>Distance travelled by HCl = 40·6 cm</p>,
  <p key="b4-p-sc-20" style={{ margin: "4px 0 4px", textAlign: "justify" }}>
    <strong>Conclusion.</strong> Lighter gases (<em>i.e.</em> NH<Sub c="3" />) diffuse faster than heavier gases (<em>i.e.</em> HCl).
  </p>,
  <p key="b4-p-sc-21" style={{ margin: "8px 0 5px" }}>
    <strong>Derivation of relation between Rates of Diffusion and Molecular Masses</strong>
  </p>,
  <p key="b4-p-sc-22" style={{ margin: "4px 0 4px" }}>
    Let <em>r</em><Sub c="NH₃" /> and <em>r</em><Sub c="HCl" /> be the rates of diffusion of NH<Sub c="3" /> and HCl respectively.
  </p>,
  <MathBlock key="b4-math-sc-1">
    ∴ &nbsp;&nbsp;
    <Frac n={<><em>r</em><Sub c="NH₃" /></>} d={<><em>r</em><Sub c="HCl" /></>} />
    = <Frac n={<>Distance travelled by NH<Sub c="3" /></>} d={<>Distance travelled by HCl</>} />
    = <Frac n="59·4" d="40·6" /> = 1·46 &nbsp;&nbsp;...(i)
  </MathBlock>,
  <p key="b4-p-sc-23" style={{ margin: "4px 0 4px" }}>
    Square root of the ratio of molecular mass of HCl and NH<Sub c="3" />
  </p>,
  <MathBlock key="b4-math-sc-2">
    = √(<Frac n={<>Mol. mass of HCl</>} d={<>Mol. mass of NH<Sub c="3" /></>} />)
    = √(<Frac n="36·5" d="17" />) = 1·46 &nbsp;&nbsp;...(ii)
  </MathBlock>,
  <p key="b4-p-sc-24" style={{ textIndent: 28, textAlign: "justify" }}>
    From Eqs. (<em>i</em>) and (<em>ii</em>), we conclude that <em>rates of diffusion of NH<Sub c="3" /> and HCl are inversely proportional to
    the square root of their molecular masses, i.e.,</em>
  </p>,
  <MathBlock key="b4-math-sc-3">
    <Frac n={<><em>r</em><Sub c="NH₃" /></>} d={<><em>r</em><Sub c="HCl" /></>} />
    = √(<Frac n="36·5" d="17" />) = 1·46
  </MathBlock>,
  <p key="b4-p-sc-25" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Conclusion.</strong> Both the experiments prove that gases diffuse into one another and the rate of diffusion is
    inversely proportional to square root of their molecular masses.
  </p>,
  <p key="b4-p-sc-26" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Law.</strong> The conclusions stated above are now called <strong>Graham's Law of Diffusion.</strong>
  </p>,
];


// ── TABLE OF CONTENTS ─────────────────────────────────────────
const TOC = [
  { id: "s11",    label: "1.1",   title: "Introduction",                                                                  level: 1 },
  { id: "s12",    label: "1.2",   title: "What is a Mixture?",                                                            level: 1 },
  { id: "s13",    label: "1.3",   title: "Types of Mixtures",                                                             level: 1 },
  { id: "s14",    label: "1.4",   title: "What is a Solution?",                                                           level: 2 },
  { id: "s141",   label: "1.4.1", title: "Why is a solution called a true Solution?",                                     level: 2 },
  { id: "s142",   label: "1.4.2", title: "Aqueous and Non-aqueous Solutions",                                             level: 2 },
  { id: "s143",   label: "1.4.3", title: "Components of a Solution",                                                      level: 3 },
  { id: "s144",   label: "1.4.4", title: "Types of Solutions",                                                            level: 2 },
  { id: "s145",   label: "1.4.5", title: "Properties of Solutions",                                                       level: 3 },
  { id: "s146",   label: "1.4.6", title: "Saturated, Unsaturated and Supersaturated Solutions",                           level: 3 },
  { id: "s147",   label: "1.4.7", title: "Solubility",                                                                    level: 2 },
  { id: "s148",   label: "1.4.8", title: "Effect of Temperature on Solubility – Solubility Curves",                      level: 3 },
  { id: "s15",    label: "1.5",   title: "What is a Suspension?",                                                         level: 1 },
  { id: "s151",   label: "1.5.1", title: "Properties of a Suspension",                                                    level: 3 },
  { id: "s16",    label: "1.6",   title: "What is a Colloidal Solution?",                                                 level: 1 },
  { id: "s161",   label: "1.6.1", title: "Dispersed Phase and Dispersion Medium",                                         level: 3 },
  { id: "s162",   label: "1.6.2", title: "Types of Colloids/Colloidal Systems",                                           level: 2 },
  { id: "s163",   label: "1.6.3", title: "Emulsions",                                                                     level: 3 },
  { id: "s164",   label: "1.6.4", title: "Properties of Colloids",                                                        level: 2 },
  { id: "s165",   label: "1.6.5", title: "Applications of Colloids in Everyday Life",                                     level: 3 },
  { id: "s166",   label: "1.6.6", title: "Comparison: True Solution, Colloidal Solution and Suspension",                  level: 2 },
  { id: "s17",    label: "1.7",   title: "Various Ways to Express Concentration of Solution",                              level: 1 },
  { id: "s18",    label: "1.8",   title: "Separation Techniques",                                                         level: 1 },
  { id: "s181",   label: "1.8.1", title: "Separating Funnel",                                                             level: 2 },
  { id: "s182",   label: "1.8.2", title: "Sublimation",                                                                   level: 2 },
  { id: "s183",   label: "1.8.3", title: "Crystallisation",                                                               level: 2 },
  { id: "s184",   label: "1.8.4", title: "Centrifugation",                                                                level: 3 },
  { id: "s185",   label: "1.8.5", title: "Coagulation",                                                                   level: 3 },
  { id: "s186",   label: "1.8.6", title: "Distillation",                                                                  level: 2 },
  { id: "s187",   label: "1.8.7", title: "Fractional Distillation",                                                       level: 2 },
  { id: "s188",   label: "1.8.8", title: "Chromatography",                                                                level: 2 },
  { id: "sciproj",label: "■",     title: "Formulating and investigating a Scientific Project",                             level: 2 },
];

// ── COMBINED CONTENT ─────────────────────────────────────────
const allContent = [...content_b1, ...content_b2, ...content_b3, ...content_b4];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter1() {
  const [tocOpen, setTocOpen] = useState(false);
  useFonts();

  return (
    <div style={{ fontFamily: "'Merriweather',Georgia,serif", fontSize: 14,
      lineHeight: 1.7, color: "#111", background: "#fff",
      padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)" }}>

      {/* ── TOC HAMBURGER BUTTON ── */}
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />

      {/* ── BACKDROP ── */}
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />

      {/* ── SIDEBAR ── */}
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />

      {/* ── CHAPTER CONTENT ── */}
      {allContent}
    </div>
  );
}
