"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";

// ── SECTION 1: FULL COMPONENT LIBRARY (batch 1 only) ────────
import { useState, useEffect } from "react";

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
        <div style={{ display: "flex", justifyContent: "center", gap: 80, fontSize: 12, color: "#555", marginTop: 2 }}>
          {bottomLabels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  );
};

const Page = ({ children }) => (
  <div style={{ background: "#fff", padding: "28px clamp(14px, 4vw, 28px) 36px", marginBottom: 4,
    borderBottom: "1px solid #e0e0e0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
    {children}
  </div>
);

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ margin: "22px 0 6px" }}>
    <div style={{ borderBottom: `2px solid ${P_COLOR}`, paddingBottom: 3 }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 800, fontSize: 15.5, color: P_COLOR, letterSpacing: 0.3 }}>
        {label}. {title.toUpperCase()}
      </span>
    </div>
  </div>
);

const SubHd = ({ id, label, title }) => (
  <p id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, fontSize: 14, color: P_COLOR, margin: "16px 0 5px" }}>
    {label}. {title}
  </p>
);

const SubSubHd = ({ id, label, title }) => (
  <p id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "14px 0 4px" }}>
    {label}. {title}
  </p>
);

const P2 = ({ children }) => (
  <p style={{ margin: "5px 0 5px 18px", textAlign: "justify", lineHeight: 1.58 }}>{children}</p>
);

const DefBox = ({ children }) => (
  <div style={{ border: `1.5px solid ${P_COLOR}`, margin: "12px 0", padding: "10px 16px",
    background: LIGHT_P, fontStyle: "italic", fontSize: 14.5 }}>
    {children}
  </div>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border: "2px solid #555", margin: "18px 0" }}>
    <div style={{ background: "#fff", borderBottom: "1px solid #ccc",
      textAlign: "center", padding: "8px 12px" }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 14, letterSpacing: 1, textDecoration: "underline" }}>
        ACTIVITY {num}
      </span>
      {sub && (
        <p style={{ margin: "4px 0 0", fontStyle: "italic", fontSize: 13, fontWeight: 400,
          fontFamily: "'EB Garamond',Georgia,serif", color: P_COLOR }}>{sub}</p>
      )}
    </div>
    <div style={{ padding: "10px 16px 12px" }}>{children}</div>
  </div>
);

const ActHd = ({ children }) => (
  <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
    fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "10px 0 5px" }}>{children}</p>
);

const KBBox = ({ children }) => (
  <div style={{ border: `2px solid ${P_COLOR}`, margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", textAlign: "center",
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
  <div style={{ border: `2px solid ${P_COLOR}`, margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", textAlign: "center",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 16, letterSpacing: 2, padding: 7 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding: "12px 18px" }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize: "12px", color: "#555", fontStyle: "italic",
    display: "block", marginTop: 8, paddingTop: 6, borderTop: "1px solid #ddd" }}>
    <sup style={{ color: P_COLOR, fontWeight: 700, marginRight: 1 }}>*</sup>
    {children}
  </span>
);

const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "20px auto", textAlign: "center", maxWidth: "90%" }}>
    <img
      src={src}
      alt={caption || num || "figure"}
      style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd",
        display: "block", margin: "0 auto" }}
      onError={e => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center",
      border: "1.5px dashed #c0126a", background: "#f9eef4",
      minHeight: 80, padding: "12px 20px", color: P_COLOR,
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
  <div style={{ margin: "20px 0", border: `1.5px solid ${P_COLOR}` }}>
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

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen(o => !o)} style={{
      position: "fixed", top: 14, left: 14, zIndex: 1100,
      background: P_COLOR, border: "none", borderRadius: 4, cursor: "pointer",
      width: 36, height: 36, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 5, padding: 0
    }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ display: "block", width: 20, height: 2.5,
          background: "#fff", borderRadius: 2, transition: "all 0.25s",
          ...(open && i === 0 ? { transform: "translateY(7.5px) rotate(45deg)" } : {}),
          ...(open && i === 1 ? { opacity: 0 } : {}),
          ...(open && i === 2 ? { transform: "translateY(-7.5px) rotate(-45deg)" } : {})
        }} />
      ))}
    </button>
  );
}

function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.35)", cursor: "pointer"
    }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1080,
      width: open ? 260 : 0, height: "100vh",
      background: "#fff", boxShadow: open ? "3px 0 16px rgba(0,0,0,0.18)" : "none",
      overflowY: open ? "auto" : "hidden",
      transition: "width 0.28s ease",
      borderRight: open ? "2px solid #f0c8dc" : "none"
    }}>
      <div style={{ padding: "56px 0 20px" }}>
        <div style={{ padding: "0 16px 10px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: P_COLOR, letterSpacing: 1, textTransform: "uppercase" }}>
          Contents
        </div>
        {tocItems.map((item) => (
          <div key={item.id}
            onClick={() => {
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
              setOpen(false);
            }}
            style={{
              padding: item.level === 1 ? "6px 16px" : item.level === 2 ? "4px 24px" : "3px 32px",
              fontSize: item.level === 1 ? 13 : item.level === 2 ? 12.5 : 12,
              fontWeight: item.level === 1 ? 700 : 400,
              color: item.level === 1 ? P_COLOR : "#333",
              cursor: "pointer", lineHeight: 1.45,
              borderLeft: item.level === 1 ? `3px solid ${P_COLOR}` : "3px solid transparent",
              background: "transparent",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = LIGHT_P; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            {item.label && <span style={{ marginRight: 5 }}>{item.label}.</span>}
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Chapter Cover ────────────────────────────────────────────
const ChapterCover = () => (
  <div style={{
    background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
    padding: "60px 48px 50px", textAlign: "center", marginBottom: 4
  }}>
    <div style={{ display: "inline-block", border: "3px solid #fff",
      padding: "8px 28px", marginBottom: 18 }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 56, color: "#fff", lineHeight: 1 }}>1</span>
    </div>
    <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 32, color: "#fff", letterSpacing: 2,
      textTransform: "uppercase", margin: "0 0 8px", lineHeight: 1.25 }}>
      Exploring Mixtures
    </h1>
    <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 32, color: "#fff", letterSpacing: 2,
      textTransform: "uppercase", margin: 0, lineHeight: 1.25 }}>
      and Their Separation
    </h1>
  </div>
);

// ── SECTION 2: TABLE SUB-COMPONENTS ─────────────────────────

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
        <tr>
          <td colSpan={4} style={{ ...td, fontWeight: 700, background: "#f9f9f9" }}>Solid solutions</td>
        </tr>
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
        <tr>
          <td colSpan={4} style={{ ...td, fontWeight: 700, background: "#f9f9f9" }}>Liquid solutions</td>
        </tr>
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
        <tr>
          <td colSpan={4} style={{ ...td, fontWeight: 700, background: "#f9f9f9" }}>Gaseous solutions</td>
        </tr>
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
          <td style={th}>283</td>
          <td style={th}>293</td>
          <td style={th}>313</td>
          <td style={th}>333</td>
          <td style={th}>353</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={td}>Potassium nitrate</td>
          <td style={{ ...td, textAlign: "center" }}>21</td>
          <td style={{ ...td, textAlign: "center" }}>32</td>
          <td style={{ ...td, textAlign: "center" }}>62</td>
          <td style={{ ...td, textAlign: "center" }}>106</td>
          <td style={{ ...td, textAlign: "center" }}>167</td>
        </tr>
        <tr>
          <td style={td}>Sodium chloride</td>
          <td style={{ ...td, textAlign: "center" }}>36</td>
          <td style={{ ...td, textAlign: "center" }}>36</td>
          <td style={{ ...td, textAlign: "center" }}>36</td>
          <td style={{ ...td, textAlign: "center" }}>37</td>
          <td style={{ ...td, textAlign: "center" }}>37</td>
        </tr>
        <tr>
          <td style={td}>Potassium chloride</td>
          <td style={{ ...td, textAlign: "center" }}>35</td>
          <td style={{ ...td, textAlign: "center" }}>35</td>
          <td style={{ ...td, textAlign: "center" }}>40</td>
          <td style={{ ...td, textAlign: "center" }}>46</td>
          <td style={{ ...td, textAlign: "center" }}>54</td>
        </tr>
        <tr>
          <td style={td}>Ammonium chloride</td>
          <td style={{ ...td, textAlign: "center" }}>24</td>
          <td style={{ ...td, textAlign: "center" }}>37</td>
          <td style={{ ...td, textAlign: "center" }}>41</td>
          <td style={{ ...td, textAlign: "center" }}>55</td>
          <td style={{ ...td, textAlign: "center" }}>66</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ── SECTION 3: PAGE ARRAY ────────────────────────────────────
const pages_b1 = [

  // PAGE 1
  <Page key="p1">
    <SecHd id="s11" label="1.1" title="Introduction" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      We daily consume a number of things such as milk, ghee, iodised salt, sugar, water, soft drinks, juices, etc. How do we know that all these things are pure? For a common man, pure actually means having no adulteration. But for a scientist pure means <em>that it contains only one type of matter or particles.</em> For example, if we examine sugar under a microscope, we find that all the particles of sugar are the same. Therefore, <strong>sugar is a pure substance.</strong> On other hand, for a scientist, milk is actually a mixture of different substances such as water, fat, proteins, etc. and hence <em>not pure.</em> Similarly, ghee, iodized salt, soft drinks, juices, etc. are all mixtures of different substances and hence impure. When a scientist says something is pure, it <em>means that all the constituent particles of that substance are the same in their chemical nature.</em> Thus, a pure substance consists of a single type of matter. In other words, <em>a substance is a pure single form of matter.</em>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      If we look around, we see that most of the matter around us exists as mixtures of two or more pure components. For example, sea water, minerals, soil, etc. are all mixtures.
    </p>

    <SecHd id="s12" label="1.2" title="What is a Mixture?" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <em>Mixtures are obtained by mixing more than one kind of pure form of matter.</em> We know that sodium chloride (common salt) dissolved in water can be separated from water by the physical process of evaporation. However, sodium chloride is itself a <em>pure substance</em> and it cannot be separated by any physical process into its chemical constituents, Na<Sup c="+" /> and Cl<Sup c="−" /> ions. Similarly, <em>sugar is a pure substances since it contains only one kind of pure matter and its composition is the same throughout.</em>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Soft drink and soil are not single pure substances. Whatever may be the source of a pure substance, it will always have the same characteristic properties. Thus, in a nutshell, we can say that <em>a mixture contains more than one pure substances.</em>
    </p>

    <SecHd id="s13" label="1.3" title="Types of Mixtures" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Depending upon the nature of components which form a mixture, mixtures are classified into the following <em>two</em> types:
    </p>
    <p style={{ margin: "8px 0 8px 18px" }}>
      <strong>1. Homogeneous mixtures</strong> and <strong>2. Heterogeneous mixtures</strong>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>1. Homogeneous mixtures.</strong> A homogeneous mixture is defined as follows :
    </p>
    <DefBox>
      <strong>A mixture is said to be homogeneous if all the components of the mixture are uniformly mixed and there is no boundaries of separation between them.</strong>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Some homogeneous mixtures used in daily life are : alloys (steel, brass, bronze), a mixture of sugar or common salt in water, rain water, sea water, rectified spirit, gasoline, vinegar, carbonated soda (coca-cola, pepsi, limica), lemonade, orange juice, apple juice, honey, tea, ice tea, wine, beer, coffee, perfume, blood plasma, mouthwash, hand sanitizer, laundry detergent, dish-washer detergent, antifreeze, air, natural gas, cooking gas etc.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      In fact, all homogeneous mixtures can be called solutions.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>2. Heterogeneous mixtures.</strong> A heterogeneous mixture is defined as follows :
    </p>
    <DefBox>
      <strong>A mixture is said to be heterogeneous if all the components of the mixture are not thoroughly mixed and there are visible boundaries of separation between them.</strong>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Some heterogeneous mixtures used in daily life are :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Vegetable soup, chicken noodle soup, fruit salad, mixed nuts, milk, milk with nuts, cereals, pizza, butter, mayonnaise, salsa, blood, smoke, soil, sand, concrete, granite, orange juice with pulp, muddy water, toothpaste, shaving cream, sand and iron filings, sand and water, sand and sulphur, chalk or wheat fluor and water, gun powder, chocolate chip cookies, ice-cube in drinks, soap-water we use to wash clothes, oil in water, soil and oil, etc.
    </p>
  </Page>,

  // PAGE 2
  <Page key="p2">
    <ActivityBox num="1.1" sub="(To illustrate the concept of homogeneous and heterogeneous mixtures, carry out the following activity)">
      <ActHd>Experimental Details of Activity.</ActHd>
      <ul style={{ margin: "4px 0 8px", paddingLeft: 24, listStyleType: "disc", fontSize: 14, lineHeight: 1.7 }}>
        <li style={{ marginBottom: 4 }}>Divide the class into four groups : A, B, C and D.</li>
        <li style={{ marginBottom: 4 }}>Ask students of group A to dissolve one spatula full of copper sulphate in 50 mL of water in a beaker and students of group B to dissolve two spatula full of copper sulphate in 50 mL of water in another beaker.</li>
        <li style={{ marginBottom: 4 }}>Ask students of group C and D to take different amounts of copper sulphate and potassium permanganate or common salt and mix them thoroughly in a pestle and mortar.</li>
      </ul>
      <ActHd>Observations.</ActHd>
      <P2>(<em>i</em>) Both groups A and B have obtained homogeneous mixtures since the composition of these mixtures or solutions is uniform throughout.</P2>
      <P2>(<em>ii</em>) Although both the groups have obtained copper sulphate solutions but the intensity of blue colour is different. The intensity of blue colour obtained by group B which contains two spatula full of copper sulphate is much higher than the solution obtained by group A which contains one spatula full of copper sulphate.</P2>
      <P2>(<em>iii</em>) Both groups C and D have obtained heterogeneous mixtures since they not only have physically distinct boundaries but also their composition is not uniform.</P2>
      <ActHd>Conclusion.</ActHd>
      <P2>(<em>i</em>) Soluble substances such as copper sulphate, common salt or sugar when dissolved in water form homogeneous mixture whose composition depends upon the amount of the substance dissolved.</P2>
      <P2>(<em>ii</em>) When two or more solids which do not react chemically are mixed they always form heterogeneous mixtures.</P2>
    </ActivityBox>

    <p style={{ textIndent: 28, textAlign: "justify" }}>
      According to another classification, mixtures are of the following <strong>three types :</strong>
    </p>
    <p style={{ margin: "8px 0 8px 18px" }}>
      <strong>1.</strong> Solutions &nbsp;&nbsp; <strong>2.</strong> Suspensions and &nbsp;&nbsp; <strong>3.</strong> Colloidal solutions.
    </p>

    <SecHd id="s14" label="1.4" title="What is a Solution?" />
    <DefBox>
      <em>A solution is defined as a homogeneous mixture of two or more chemically non-reacting substances whose composition can be varied within limits.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      It may be noted that all mixtures are not solutions. If a mixture is to be called as solution, it must satisfy the following <em>two</em> conditions:
    </p>
    <p style={{ margin: "6px 0 6px 18px" }}>
      (<em>i</em>) the components of a mixture should be non-reacting and (<em>ii</em>) mixture should be homogeneous.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      For example, lemonade is a solution of sugar, salt and lemon juice in water. These four components of the solution do not react with each other since each constituent has its own taste in the lemonade. Instead the particles of sugar, salt and lemon juice mix with particles of water so thoroughly that we cannot see them even under a microscope. Thus, <em>in solutions, there is homogeneity at the particle level, i.e.,</em> lemonade tastes the same throughout.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Another example of a homogeneous mixture from our daily life is <em>vinegar</em> which is a 5–8% solution of acetic acid in water.
    </p>

    <SubHd id="s141" label="1.4.1" title="Why is a solution called a true Solution?" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The solutions of sugar, common salt, acetic acid, etc. in water are called true solutions because in these solutions, the particles of the solute (sugar, salt, acetic acid, etc.) are so thoroughly mixed with water that we cannot distinguish one from the other.
    </p>

    <SubHd id="s142" label="1.4.2" title="Aqueous and Non-aqueous Solutions" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Most of the substances are soluble in water. That is why water is sometimes called a <strong>'Universal solvent'.</strong> However, all substances do not dissolve in water. Therefore, other solvents such as ether, benzene, alcohol, carbon disulphide, carbon tetrachloride, etc. are also used to prepare solutions. <strong><em>A solution in which water acts as the solvent is called an</em> aqueous solution <em>while the one in which any other liquid acts as the solvent is called a</em> non-aqueous solution.</strong> For example, the solution of common salt or sugar in water is called an aqueous solution. However, solution of bromine in carbon tetrachloride, sulphur in carbon disulphide, iodine in alcohol (<em>tincture of iodine</em>) are called non-aqueous solutions.
    </p>
  </Page>,

  // PAGE 3
  <Page key="p3">
    <SubSubHd id="s143" label="1.4.3" title="Components of a Solution" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      In principle, any number of components or constituents may be present in a solution. For example, sea water is a solution of many components such as sodium chloride, magnesium chloride, calcium chloride, magnesium sulphate, etc. of which sodium chloride is the main component. However, for sake of convenience, we shall discuss here only <strong>binary solutions.</strong> Such solutions have only two components or constituents. These are called <strong>solute</strong> and the <strong>solvent.</strong>
    </p>
    <DefBox>
      <em><strong>In a binary solution, the component dissolved is called the</strong> solute <strong>and the medium in which it is dissolved is called the</strong> solvent. <strong>In other words, the component of the solution which is present in small amount is called the</strong> solute <strong>while the component of the solution which is present in large amount is called the</strong> solvent.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      For example, when sugar is dissolved in water to prepare sugar solution, sugar is called the solute while water is called the solvent.
    </p>

    <SubHd id="s144" label="1.4.4" title="Types of Solutions" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      We know that substances ordinarily exist in three states (phases), <em>i.e.</em>, solid, liquid and gas. In binary solutions, each one of these phases can act as a solute or as a solvent. Therefore, there are <em>nine</em> different types of binary solutions. These have been further divided into the following <strong>three</strong> categories depending upon the nature of the substance acting as the solvent. These are :
    </p>
    <p style={{ margin: "6px 0 4px 18px" }}><strong>1. Solid solutions.</strong> In these solutions, solid acts as the solvent.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>2. Liquid solutions.</strong> In these solutions, liquid acts as the solvent.</p>
    <p style={{ margin: "4px 0 10px 18px" }}><strong>3. Gaseous solutions.</strong> In these solutions, gas acts as the solvent.</p>

    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Let us now briefly discuss some examples of each of the above three types :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>1. Solid solutions.</strong> In solid solutions, a solid is the solvent while solute can be either a solid, liquid or a gas. Some examples are :
    </p>
    <P2>(<em>i</em>) Alloys are examples of solid in solid solutions. In fact, alloys are homogeneous mixtures of two or more metals or a metal and a non-metal. Although the components (<em>i.e.,</em> constituent metals) of an alloy cannot be separated by physical methods, yet an alloy is considered to be a mixture because it shows the properties of its constituents and can have variable composition. For example, amount of zinc in brass can vary from 20–35% while that of copper can vary from 65–80%.</P2>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Pure gold is 24 carat. It is very soft and is, therefore, not suitable for making jewellery. To make it hard, it is alloyed with either copper or silver. In India, generally 22 carat gold is used for making ornaments. This means 22 parts by weight of pure gold is alloyed with 2 parts by weight of either copper or silver.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      An example of an alloy of a metal and a non-metal is steel. It is an alloy of iron (metal) and a small amount (0·05%) of carbon (non-metal).
    </p>
    <P2>(<em>ii</em>) Hydrated salts, <em>i.e.,</em> salts containing water of crystallization such as hydrated copper sulphate (blue vitriol), hydrated ferrous sulphate (green vitriol), hydrated magnesium sulphate (white vitriol), etc. are examples of liquid in solid solutions.</P2>
    <P2>(<em>iii</em>) Gases adsorbed on the surface of metals such as nickel, platinum, palladium, etc. are examples of gas in solid solutions.</P2>

    <p style={{ textIndent: 28, textAlign: "justify", marginTop: 8 }}>
      <strong>2. Liquid solutions.</strong> In liquid solutions, a liquid is the solvent while the solute can be either a solid, liquid or a gas. Some examples are :
    </p>
    <P2>(<em>i</em>) A solution of sugar in water is an example of a solid in liquid solution. Here, sugar is the solute while water is the solvent. Another example is tincture of iodine. It is obtained by dissolving iodine in alcohol. Here, iodine is the solute while alcohol is the solvent. Brine (concentrated solution of common salt in water) is yet another example of solid in liquid solution.</P2>
    <P2>(<em>ii</em>) A mixture of two or more miscible liquids form liquid in liquid solutions. For example, rectified spirit which contains about 95% alcohol and about 5% water. Here, alcohol is solvent and water is the solvent. Similarly, petrol, kerosene oil and diesel are homogeneous mixtures of a number of liquid hydrocarbons.</P2>
    <P2>(<em>iii</em>) Aerated drinks like soda water, coca-cola, pepsi, limica, etc. are gas in liquid solutions. These contain carbon dioxide (gas) as solute and water (liquid) as solvent.</P2>
  </Page>,

  // PAGE 4
  <Page key="p4">
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>3. Gas solutions.</strong> In gas solutions, gas is the solvent while solute can be either a solid, liquid or a gas. Some examples are :
    </p>
    <P2>(<em>i</em>) Camphor in air or iodine in air are the examples of solid in gas solutions. Here, camphor or iodine (solid) is the solute while air (gas) is the solvent.</P2>
    <P2>(<em>ii</em>) Clouds, fog, mist, etc. are examples of liquid in gas solutions. Here, water drops (liquid solute) are dispersed in air (gas solvent).</P2>
    <P2>(<em>iii</em>) Air is a mixture of gas in gas. Air is a homogeneous mixture of many gases. Its two main gases are oxygen (21%) and nitrogen (78%). The other gases (carbon dioxide, inert gases and water vapours) are, however, present in very small quantities (1%). Here, nitrogen gas acts as the solvent while other gases act as the solute.</P2>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Similarly, natural gas is mainly a homogeneous mixture of methane along with small amounts of other hydrocarbons such as ethane, propane, butane, etc.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The nine types of binary solutions discussed above are summarised in the following table :
    </p>
    <BinarySolutionsTable />
  </Page>,

  // PAGE 5
  <Page key="p5">
    <SubSubHd id="s145" label="1.4.5" title="Properties of Solutions" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The main characteristics of a solution may be summed up as follows :
    </p>
    <p style={{ margin: "6px 0 4px 18px" }}><strong>1.</strong> <em>A solution is a homogeneous mixture.</em></p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>2.</strong> <em>The components of a solution do not chemically react with one another.</em></p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>3.</strong> <em>The particles of a solution are smaller than 1 nm (10<Sup c="−9" /> m) in diameter.</em> So, they cannot be seen by naked eyes or even under a microscope.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>4.</strong> Because of small size, <em>the solute particles do not scatter a beam</em> of light passing through the solution. Therefore, the path of light is not visible in a solution.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>5.</strong> <em>The particles of the solute in a solution pass through the filter paper</em> thereby showing that the solute particles are smaller than the pores of the filter paper.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>6.</strong> When the solution is allowed to stand undisturbed, the particles of the solute do not settle down. This shows that <em>solutions are stable.</em></p>
    <p style={{ margin: "4px 0 10px 18px" }}><strong>7.</strong> <em>A solution is always transparent in nature.</em> It may be colourless or coloured. For example, a solution of sugar in water is colourless while that of copper sulphate in water has blue colour.</p>

    <SubSubHd id="s146" label="1.4.6" title="Saturated, Unsaturated and Supersaturated Solutions" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Saturated solution.</strong> When we dissolve a solute (<em>i.e.,</em> sugar) in a solvent (<em>i.e.,</em> water) with stirring, initially the sugar will dissolve readily in water. But after a while, the process of dissolution will become slower and slower. If, however, we keep on adding sugar to the solution formed with stirring, ultimately a stage will be reached when no more sugar will dissolve. Instead, it will start settling at the bottom of the beaker. Such a solution is called a saturated solution. Thus,
    </p>
    <DefBox>
      A solution which contains the maximum amount of solute dissolved in a given quantity of the solvent at the given temperature and which cannot dissolve any more solute at that temperature is called a saturated solution.
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      If to a saturated solution, more solute is added, it will remain undissolved. Thus, in a saturated solution, there is always an equilibrium between the dissolved and the undissolved solute. In other words, the rate at which the undissolved solute dissolves is equal to the rate at which the dissolved salt separates out of the solution and gets deposited. As a result, the amount of dissolved or the undissolved solute remains constant at a particular temperature.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Unsaturated solution.</strong> If a solution contains solute less than the maximum that it can dissolve at the given temperature, the solution is said to be unsaturated. In other words, an unsaturated solution may be defined as follows :
    </p>
    <DefBox>A solution that can dissolve more solute in it at the given temperature is called an unsaturated solution.</DefBox>
  </Page>,

  // PAGE 6
  <Page key="p6">
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Thus, it is obvious that a saturated solution contains more solute than an unsaturated solution at a given temperature. For example,
    </p>
    <P2>(<em>i</em>) A maximum of 32 grams of potassium nitrate can be dissolved in 100 gram of water at 293 K. Thus, a saturated solution of potassium nitrate contains 32 grams of potassium nitrate at 293 K. Suppose we now dissolve 20 g of potassium nitrate in 100 g of water at 293 K, the solution so obtained would be unsaturated. This is because we can still dissolve 12 (32–20) gram more of potassium nitrate in the same amount (100 grams) of water at the same temperature to make a saturated solution.</P2>
    <P2>(<em>ii</em>) A maximum of 36 grams of common salt (sodium chloride) can be dissolved in 100 grams of water at 293 K. Thus, a saturated solution of common salt contains 36 grams of common salt in 100 grams of water at 293 K. Suppose, we now dissolve 25 grams of common salt at 293 K, the solution so obtained will be unsaturated. This is because we can still dissolve 11 (36–25) gram of more common salt in the same amount (100 gram) of water at the same temperature to make a saturated solution.</P2>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      A saturated solution, however becomes unsaturated either on heating or on dilution.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Supersaturated solution.</strong> Besides saturated and unsaturated, there is another kind of solution called supersaturated solution. It is defined as follows :
    </p>
    <DefBox>A solution which temporarily contains more solute than the saturation level (<em>i.e.,</em> the maximum solute) at a particular temperature is called the supersaturated solution.</DefBox>
    <p style={{ textIndent: 28, textAlign: "justify", fontWeight: 600 }}>Preparation of supersaturated solutions</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Many solid solutes are more soluble at higher temperatures than at lower temperatures. Sometimes when the solution of such a solid, prepared at higher temperature, is allowed to cool quickly, all the solute remains dissolved. This happens, even though it will not dissolve to that extent at the lower temperature. Sodium acetate and sodium thiosulphate are two such compounds which readily form supersaturated solutions. Honey is essentially a supersaturated solution of various sugars in water.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Test for saturated, unsaturated and supersaturated solutions.</strong> In order to test whether a given solution is saturated or unsaturated, add some more solute to this solution and try to dissolve by stirring with a glass rod keeping the temperature constant. If more solute does not dissolve in the given solution, then it must be a saturated solution and if more solute dissolves, it must be an unsaturated solution.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      On the other hand, supersaturated solution can be easily distinguished from the saturated solution either simply by shaking or by adding a crystal of the solute dissolved. If now a sizeable quantity of the solute quickly separates out from the solution as crystals, it is a supersaturated solution otherwise it is a saturated solution. Thus, a supersaturated solution unlike saturated solution is not stable.
    </p>
  </Page>,

  // PAGE 7
  <Page key="p7">
    <SubHd id="s147" label="1.4.7" title="Solubility" />
    <DefBox>
      <em>The maximum amount of solute in grams which can be dissolved in 100 grams of the solvent at a given temperature to form a saturated solution is called the solubility of the solute in that solvent at that particular temperature.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      In other words, concentration of solute in a saturated solution is the same as the solubility of the solute at that temperature. The solubility of the solute is expressed in grams per 100 grams of the solvent at a given temperature. For example, a maximum of 32 grams of potassium nitrate can be dissolved in 100 grams of water at 20°C (293 K). Thus, <em>the solubility of potassium nitrate at 20°C (or 293 K) is 32 grams.</em>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Similarly, a maximum of 36 grams of common salt (sodium chloride) can be dissolved in 100 grams of water at 20°C (or 293 K), therefore, <em>the solubility of common salt in water at 20°C (or 293 K) is 36 grams.</em>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      It is interesting to note that different substances have different solubilities in the same solvent at a given temperature (Table 1.1).
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <em>Alternatively,</em> the same substance may have different solubilities in different solvents. For example, sugar or common salt is more soluble in water than in alcohol.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong style={{ color: P_COLOR }}>Effect of Temperature and Pressure on Solubility.</strong> The following cases arise :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      (<em>i</em>) <strong>Solubility of solids in liquids.</strong> When a saturated solution at a particular temperature (say room temperature) is heated, it becomes unsaturated. This is because <em>the solubility of a substance generally increases with increase<FootNote>However, there are a few salts such as cerium sulphate, lithium carbonate, sodium carbonate monohydrate, etc. whose solubility decrease with increase of temperature.</FootNote> in temperature</em> (Table 1.1) <em>and hence more solute can be dissolved on increasing the temperature. If a saturated solution, at a particular temperature is cooled, then some of the dissolved solute will separate out in form of crystals. This is because solubility of solute in the solution decreases on cooling.</em>
    </p>
    <SolubilityTable />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The solubility of solids in liquids, however, remains unaffected by changes in pressure.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      (<em>ii</em>) <strong>Solubility of gases in liquids.</strong> <em>The solubility of gases in liquids increases on decreasing the temperature or decreases on increasing the temperature.</em> For example, water contains dissolved oxygen. When water is boiled, the solubility of oxygen in water decreases and the excess oxygen escapes in form of bubbles.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <em>The solubility of gases in liquids, however, increases on increasing the pressure and decreases on decreasing the pressure.</em> For example, during manufacture of cold drinks, carbon dioxide is dissolved in water under pressure. However, when a bottle of soft drink is opened, the pressure inside decreases and the solubility of carbon dioxide also decreases. So, the excess dissolved carbon dioxide escapes in form of bubbles.
    </p>
  </Page>,

  // PAGE 8
  <Page key="p8">
    <SubSubHd id="s148" label="1.4.8" title="Effect of Temperature on Solubility of Substances – Solubility Curves" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The solubility of a solute in a given solvent generally increases with temperature. The solubilities of some common inorganic compounds in water at different temperatures are given in Fig. 1.1. There curves are called <strong>solubility curves.</strong>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      It is evident from the Fig. 1.1, most of the salts (<em>e.g.,</em> KNO<Sub c="3" />, NH<Sub c="4" />Br) show <em>marked increase</em> in solubility with increase in temperature. Some of them (<em>i.e.,</em> NaCl) show only a small increase in solubility with rise in temperature. However, there are only a few substances (<em>e.g.,</em> anhydrous sodium sulphate, Na<Sub c="2" />SO<Sub c="4" /> and cerium sulphate, Ce<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" /> which show <strong>decrease</strong> in solubility with rise in temperature.
    </p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_0827B1785CF2284301FC}
      num="Fig. 1.1"
      caption="Solubility curves of various inorganic compounds"
    />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The solubility curve of sodium sulphate shows a peculiar behaviour. It <em>first increases with rise in temperature upto 305·3 K and then begins to decrease with rise in temperature.</em> Actually, the first part of curve represents the solubility of sodium sulphate decahydrate, Na<Sub c="2" />SO<Sub c="4" />·10H<Sub c="2" />O, the solubility of which <em>increases with rise in temperature.</em> The second part of the curve represents the solubility of <em>anhydrous</em> sodium sulphate, Na<Sub c="2" />SO<Sub c="4" />, the solubility of which <em>decreases</em> with increase in temperature. The temperature at which the two parts of the curve meet, <em>i.e.,</em> (305·3 K) represents the <strong>transition temperature</strong> between the decahydrate sodium sulphate and sodium sulphate anhydrous.
    </p>
    <ChemEq
      lhs={<>Na<Sub c="2" />SO<Sub c="4" />·10H<Sub c="2" />O</>}
      rhs={<>Na<Sub c="2" />SO<Sub c="4" /> + 10H<Sub c="2" />O</>}
      arrow="eq"
      topLabel="305·3 K"
      bottomLabels={["Decahydrate", "Anhydrous"]}
    />

    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 14, margin: "14px 0 5px" }}>Effect of temperature on Solubility</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The effect of temperature on solubility can be explained on the basis of <strong>Le Chatelier's principle.</strong>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Since in most cases, the solution of a solute in water is an <strong>endothermic process</strong>, <em>i.e., cooling occurs when a substance dissolves.</em>
    </p>
    <ChemEq
      lhs={<>Solute + H<Sub c="2" />O</>}
      rhs={<>Solutions : ΔH = +ve</>}
      arrow="eq"
    />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Therefore, in accordance with Le Chatelier's principle, if temperature increases, the equilibrium shifts in that direction which produces <em>cooling, i.e.,</em> in the direction in which ΔH is +ve. As a results, more of the solute dissolves as the temperature rises.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      There are only a few substances such as Na<Sub c="2" />SO<Sub c="4" />, Na<Sub c="2" />CO<Sub c="3" />·H<Sub c="2" />O, CaO, Ce<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" /> which evolve heat when they dissolve in water. Therefore, <em>in</em> accordance with Le Chatelier's principle, <em>their solubilities decrease with rise in temperature.</em>
    </p>
  </Page>,

  // PAGE 9
  <Page key="p9">
    <SecHd id="s15" label="1.5" title="What is a Suspension?" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      When an insoluble substance such as chalk powder, wheat flour or mud is added to water and the mixture stirred, we get a suspension in which the solids are dispersed in liquids. Thus,
    </p>
    <DefBox>
      <em>A <strong>suspension</strong> is a heterogeneous mixture in which the solute particles do not dissolve but remain suspended throughout the bulk of the medium.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The particles of a suspension are visible to the naked eye.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      A few more examples of suspensions are given below :
    </p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>1.</strong> Paints are suspensions of coloured substances is water or some other liquid.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>2.</strong> Milk of magnesia is a suspension of magnesium hydroxide in water.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>3.</strong> Lime water (used for white wash) is a suspension of calcium hydroxide in water.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>4.</strong> Bleaching powder in water is also a suspension since bleaching powder is insoluble in water.</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Please note that suspensions are formed by only those substances which are insoluble in water.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>These suspended particles, however, settle as a precipitate when the suspension is left undisturbed for sometime.</strong>
    </p>

    <SubHd id="s151" label="1.5.1" title="Properties of a Suspension" />
    <p style={{ margin: "6px 0 4px 18px" }}><strong>1.</strong> A suspension is a heterogeneous mixture.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>2.</strong> The solid particles of a suspension are so large in size (more than 10<Sup c="−5" /> cm or 10<Sup c="−7" /> m or 100 nm) that they are visible to the naked eye.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>3.</strong> The particles of a suspension scatter a beam of light passing through it and makes its path visible.</p>
    <p style={{ margin: "4px 0 10px 18px" }}><strong>4.</strong> The solid particles of a suspension settle down when it is allowed to stand undisturbed for sometime. In other words, <em>a suspension is unstable.</em></p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      For example, when carbon dioxide is passed through lime water taken in a test-tube, it turns milky. This is due to the reason that lime water contains calcium hydroxide which reacts with carbon dioxide to form insoluble calcium carbonate and water.
    </p>
    <ChemEq
      lhs={<>Calcium hydroxide + Carbon dioxide</>}
      rhs={<>Calcium carbonate + Water<br/><em>(Insoluble)</em></>}
      arrow="forward"
    />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The solution turns milky due to the formation of a suspension of calcium carbonate in water. When this solution is allowed to stand undisturbed for sometime, the particles of the suspension settle at the bottom of the tube as a <strong>precipitate.</strong>
    </p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>5.</strong> The particles of a suspension cannot pass through a filter paper. Thus, when a suspension is filtered, the solid particles remain as a residue on the filter paper.</p>
    <p style={{ margin: "4px 0 10px 18px" }}><strong>6.</strong> Suspensions are either opaque or translucent.</p>

    <SecHd id="s16" label="1.6" title="What is a Colloidal Solution?" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      We have discussed above that there are certain substances like common salt, sugar, copper sulphate, etc. which dissolve in water to form true solutions. The solute particles of a true solution are very small having diameters less than 1 nm (10<Sup c="−9" /> m) and hence are invisible to the naked eye or even under a microscope. On the other hand, there are certain substances like chalk powder, calcium oxide (lime), bleaching powder, etc. which are insoluble in water. These substances when stirred with water form suspensions. The solid particles of a suspension are quite large having diameters greater than 100 nm and hence are clearly visible to the naked eye. In between these two categories of substances, there is a third category of substances which dissolve in water or any other liquid to form a mixture in which the size (diameter) of the particles, (<em>i.e.,</em> 1–100 nm) lies in between those and a true solution and a suspension (Fig. 1.2). Such mixtures are called <strong>colloidal solutions.</strong> Thus colloidal solutions may be defined as follows :
    </p>
    <DefBox>
      <em>Solutions in which the size of the particles lies in between those of true solutions and suspensions are called <strong>colloidal solutions</strong> or simply <strong>colloids.</strong></em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Due to relatively smaller size of particles, these mixtures appear to be homogeneous but actually they are heterogeneous. Since the colloidal solutions are heterogeneous in nature, therefore, to distinguish them from true solutions, the term <strong>"sol"</strong> is used in place of solution. The particles of the colloidal sol are called colloidal particles.
    </p>
  </Page>,

];

// ── SECTION 1: TABLE SUB-COMPONENTS (batch-specific) ─────────

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
        <tr>
          <td style={td}><strong>1.</strong> Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid sol</td>
          <td style={td}>Coloured gemstones, milky glass</td>
        </tr>
        <tr>
          <td style={td}><strong>2.</strong> Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Sol</td>
          <td style={td}>Starch sol, gold sol, muddy water, milk of magnesia, white of an egg, paints, latex, gelatin, etc.</td>
        </tr>
        <tr>
          <td style={td}><strong>3.</strong> Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Solid aerosol</td>
          <td style={td}>Smoke, dust-storm, automobile exhaust, etc.</td>
        </tr>
        <tr>
          <td style={td}><strong>4.</strong> Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Gel</td>
          <td style={td}>Jelly, cheese, butter, curd, shoe polish, etc.</td>
        </tr>
        <tr>
          <td style={td}><strong>5.</strong> Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Emulsion</td>
          <td style={td}>Milk, face cream, cod liver oil.</td>
        </tr>
        <tr>
          <td style={td}><strong>6.</strong> Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Aerosol</td>
          <td style={td}>Fog, clouds, mist, sprays.</td>
        </tr>
        <tr>
          <td style={td}><strong>7.</strong> Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Solid</td>
          <td style={{ ...td, textAlign: "center" }}>Solid foam</td>
          <td style={td}>Pumice stone, foam, rubber, sponge, bread, etc.</td>
        </tr>
        <tr>
          <td style={td}><strong>8.</strong> Gas</td>
          <td style={{ ...td, textAlign: "center" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center" }}>Foam</td>
          <td style={td}>Froth, whipped cream, soap lather, shaving cream, etc.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const SolNamesTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Dispersion medium</td>
          <td style={th}>Name of the sol</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["Water", "Aquasol or Hydrosol"],
          ["Alcohol", "Alcosol"],
          ["Benzene", "Benzosol"],
          ["Gases", "Aerosol"],
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
          <td style={td}>Particles of suspension settle down on standing, <em>i.e.,</em> suspensions are unstable.</td>
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

// ── SECTION 2: PAGE ARRAY ────────────────────────────────────
const pages_b2 = [

  // PAGE 10
  <Page key="p10">
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_BE148CFAE49C28F5F95D}
      num="Fig. 1.2"
      caption="Particle sizes of a true solution, a colloidal solution and a suspension"
    />

    <SubHd id="s161" label="1.6.1" title="Dispersed Phase and Dispersion Medium" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      We have stated above that colloidal solutions are heterogeneous mixtures. <strong>This means that the constituents or components of a colloidal solution are not present in one single phase, but are actually present in two separate phases. These are called the dispersed phase and the dispersion medium.</strong> <em>The solute-like component which has been dispersed or distributed throughout in a solvent-like medium is called the <strong>dispersed phase</strong> or the <strong>discontinuous phase</strong> while the solvent like medium in which the dispersed phase has been distributed or dispersed is called the <strong>dispersion medium</strong> or the <strong>continuous phase.</strong> The heterogeneous system thus obtained is called the <strong>colloidal system or the colloidal dispersion.</strong></em>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      It may be noted here that the dispersed phase in a colloidal solution is comparable to solute particles in a true solution. Similarly, the dispersion medium is comparable to a solvent. However, there is one important difference between the true solution and the colloidal solution. In true solution, the solute and the solvent are present in one single phase but in colloidal solutions, they are present in two separate phases.
    </p>

    <SubHd id="s162" label="1.6.2" title="Types of Colloids/Colloidal Systems/Colloidal Dispersions" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Just as in true solutions, both the solute and solvent can exist in any one of the three states of matter (solid, liquid or gas) in the same way, in colloidal solutions also, both the dispersed phase and the dispersion medium can be a solid, liquid or a gas. Thus, <em>nine</em> different types of colloidal solutions should have been possible. But actually there are <strong>eight</strong> and not nine because gases always mix together to form homogeneous mixtures. Some common examples of colloids are given in Table 1.2.
    </p>
    <ColloidsTable />
  </Page>,

  // PAGE 11
  <Page key="p11">
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Further, depending upon the dispersion medium, the sols are given special names as follows :
    </p>
    <SolNamesTable />

    <SubHd id="s163" label="1.6.3" title="Emulsions" />
    <DefBox>
      <em>Colloidal sols in which both the dispersed phase and the dispersion medium are liquids are called <strong>emulsions.</strong></em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The two liquids which form an emulsion are immiscible with each other. One of these liquids is usually water and the other liquid which is insoluble in water is called the <strong>oil.</strong> These emulsions are of two types:
    </p>
    <P2>(<em>i</em>) <strong>Oil-in-water emulsions.</strong> In these emulsions, oil is the dispersed phase and water is the dispersion medium.</P2>
    <P2>(<em>ii</em>) <strong>Water-in-oil emulsions.</strong> In these emulsions, water is the dispersed phase and oil is the dispersion medium.</P2>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      These emulsions are usually prepared by shaking oil and water vigorously. However, these emulsions of two pure liquids are usually not stable. To make them stable, small amounts of certain other substances are added during their preparation.
    </p>
    <DefBox>
      <strong>The substances which are added to stabilize emulsions are called <em>emulsifiers</em> or <em>emulsifying agents.</em> These stabilize the sols by reducing the surface tension of water.</strong>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The substances which are commonly used as emulsifying agents are soaps, proteins, gums, etc. For example, <em>milk is oil-in-water type emulsion, in which liquid fat is dispersed in water and milk protein <strong>lactalbumin</strong> is the emulsifying agent.</em>
    </p>

    <SubHd id="s164" label="1.6.4" title="Properties of Colloids" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Some important properties of colloids are given below :
    </p>
    <p style={{ margin: "6px 0 4px 18px" }}><strong>1. Heterogeneous nature.</strong> A colloidal solution is heterogeneous in nature consisting of two phases called the dispersed phase (discontinuous phase) and the dispersion medium (continuous phase).</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>2. Size of particles.</strong> The size (diameter) of the colloidal particles lies in the range 1–100 nm (10<Sup c="−7" /> – 10<Sup c="−5" /> cm), <em>i.e.,</em> in between those of true solutions and suspensions.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>3. Filtrability.</strong> Colloidal particles pass through ordinary filter paper. Hence, the colloidal particles cannot be separated from the dispersion medium by filtration. However, colloidal particles cannot pass through semipermeable<FootNote>A <strong>semipermeable membrane</strong> allows solvent molecules and small solute particles of true solutions to pass through but not the bigger colloidal particles. It may be either natural or synthetic. The most commonly used natural semipermeable membrane is the pig's bladder.</FootNote> membranes. A special technique which is presently used to separate colloidal particles is <strong>centrifugation.</strong></p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>4. Stability.</strong> Colloidal sols are quite stable, <em>i.e.,</em> colloidal particles do not settle when left undisturbed.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>5. Visibility.</strong> Colloidal particles are not visible to the naked eye. However, in some cases, they are visible under ultramicroscope.</p>
  </Page>,

  // PAGE 12
  <Page key="p12">
    <p style={{ margin: "6px 0 4px 18px" }}><strong>6. Brownian movement.</strong> When colloidal particles are placed under an ultramicroscope, they are seen to be <em>continuously moving in a zig-zag path</em> (Fig. 1.3). Such a movement of pollen grains suspended in water was first time observed by Robert Brown, an English scientist in 1928 and hence is called Brownian movement after his name. Thus,</p>
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", margin: "10px 0 10px 18px" }}>
      <DefBox>
        <em>Brownian movement may be defined as continuous zig-zag movement of colloidal particles in a colloidal sol.</em>
      </DefBox>
      <Fig
        src={CONTENT_IMAGES.CONTENT_IMAGE_AB2D779877F9022B42E3}
        num="Fig. 1.3"
        caption="Brownian movement"
      />
    </div>
    <p style={{ margin: "6px 0 4px 18px" }}>Other examples of Brownian movement are :</p>
    <P2>(<em>i</em>) dust particles floating in air.</P2>
    <P2>(<em>ii</em>) Spread of perfume in a room.</P2>
    <p style={{ margin: "6px 0 4px 18px" }}><strong>Cause.</strong> It is believed that Brownian movement arises due to hitting of the colloidal particles by the particles of the dispersion medium from different directions with different forces.</p>

    <p style={{ margin: "10px 0 4px 18px" }}><strong>7. Tyndall effect.</strong> The colloidal particles are big enough to scatter light passing through it. As a result, the path of light becomes visible. <em>This scattering of a beam of light by colloidal particles is called the <strong>Tyndall effect</strong></em> after the name of the scientist who discovered it.</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      When the beam of light from a torch is passed through a true solution of copper sulphate, Tyndall effect is not observed, <em>i.e.,</em> the path of light is not visible (Fig. 1.4). However, when the same light is passed through a mixture of water and milk, Tyndall effect is observed and the path of light becomes visible. The reason for this observation is that the particles of a true solution are so small that they do not scatter light and hence the path of light is not visible, <em>i.e.,</em> Tyndall effect is not observed. In contrast, the particles of a colloidal solution are big enough to scatter light and hence path of light becomes visible, <em>i.e.,</em> the Tyndall effect is observed.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Thus, Tyndall effect can be used to distinguish between a true solution and a colloidal solution.
    </p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_CB5F1A63689AB385DFB9}
      num="Fig. 1.4"
      caption="(a) Solution of copper sulphate does not show Tyndall effect (b) Mixture of water and milk shows Tyndall effect"
    />
  </Page>,

  // PAGE 13
  <Page key="p13">
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Examples of Tyndall Effect.</strong> (<em>i</em>) A well known example of Tyndall effect observed in our home is when a beam of sunlight enters the dark room through some hole in the window or the ventilator. The path of light becomes visible due to scattering of light by the colloidal dust particles present in the air of the room.
    </p>
    <P2>(<em>ii</em>) Tyndall effect is observed when the sunlight passes through the canopy of a dense forest. This is due to scattering of light by the colloidal particles of the mist (<em>i.e.,</em> tiny droplets of water dispersed in air).</P2>
    <P2>(<em>iii</em>) The phenomenon of Tyndall effect is also observed when a beam of light from a projector is thrown on the screen in a cinema hall. The path of light becomes visible due to scattering of light by the colloidal dust particles present in the air of the cinema hall.</P2>
    <P2>(<em>iv</em>) Another example of Tyndall effect is that sky looks blue due to scattering of light by colloidal dust particles present in the air. Similarly, sea water looks blue due to scattering of light by the colloidal impurities present in the sea water.</P2>

    <p style={{ margin: "10px 0 4px 18px" }}><strong>8. Colloidal particles carry charge.</strong> All the colloidal particles of a particular colloidal sol carry the same charge which may be either positive or negative while the dispersion medium has an equal and opposite charge. Since like charges repel each other, therefore, when a colloidal sol is left undisturbed, the similarly charged colloidal particles do not come close and thus remain dispersed in the sol. In other words, the particles of the colloid do not settle down unlike the particles of a suspension and hence the colloidal sols are quite stable.</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The nature of charge whether positive or negative on any colloidal sol can be determined by dipping two electrodes and connecting them to a battery. Under the influence of the electrical field, the particles of the colloid move towards the oppositely charged electrodes. On reaching the electrode, they lose their charge and combine together to form big particles which ultimately settle down. This phenomenon is called <strong>coagulation.</strong>
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <em>The movement of colloidal particles towards one of the electrodes under the influence of an electric field is called <strong>electrophoresis.</strong></em> Using this technique, the charge on colloidal particles can be determined. For example,
    </p>
    <P2>(<em>i</em>) <strong>Positively charged sols.</strong> Haemoglobin and hydroxides of metals like iron, aluminium, chromium, calcium, etc.</P2>
    <P2>(<em>ii</em>) <strong>Negatively charged sols.</strong> Colloidal particles of metals like copper, silver, gold, etc.; metal sulphides like arsenic sulphide, cadmium sulphide, etc.; gelatin, starch, clay, mud, etc.</P2>

    <p style={{ margin: "10px 0 5px 18px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 14 }}>9. Coagulation</p>
    <DefBox>
      <strong><em>The process by which small colloidal particles lose their charge and combine together to form big sized particles which ultimately settle down is called coagulation.</em></strong>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The coagulation is generally carried out by addition of electrolytes<FootNote>Electrolytes are salts which when dissolved in water undergo ionization to form ions. For example, sodium chloride (NaCl) gives sodium (Na<Sup c="+" />) and chloride (Cl<Sup c="−" />) ions. Similarly, ferric chloride (FeCl<Sub c="3" />) gives ferric (Fe<Sup c="3+" />) and chloride (Cl<Sup c="−" />) ions and alum (potassium aluminium sulphate, K<Sub c="2" />SO<Sub c="4" />·Al<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" />·24H<Sub c="2" />O) gives potassium (K<Sup c="+" />), aluminium (Al<Sup c="3+" />) and sulphate (SO<Sub c="4" /><Sup c="2−" />) ions.</FootNote> like sodium chloride, barium chloride, alum, etc. When an electrolyte is added to a colloidal solution, the particles of the sol combine with oppositively charged ions and thus get neutralized. The neutral particles then start combining together to form particles of larger size which settle down. For example, bleeding from a cut can be immediately stopped by applying alum or ferric chloride. The reason being that the colloidal blood particles are negatively charged and hence get coagulated by positively charged ferric ions present in ferric chloride or positively charged aluminium ions present in alum. As a result of this coagulation, bleeding stops.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Please note that according to Hardy-Schulze law, higher the valency of the cation, higher is its coagulating power. Thus, coagulating power increases in the order : sodium chloride &lt; barium chloride &lt; alum, etc.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Similarly, muddy water can be purified by adding alum. The reason being that muddy water contains negatively charged clay particles. These are neutralized by positively charged aluminium ions and settle down. The pure water can then be obtained by decantation.
    </p>
  </Page>,

  // PAGE 14
  <Page key="p14">
    <SubHd id="s165" label="1.6.5" title="Applications of Colloids in Everyday Life" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      There are number of colloidal systems (Table 1.2) that we come across in our everyday life. For example, fog, cloud, milk, gemstone, etc. Besides these, colloids have a number of other applications.
    </p>
    <p style={{ margin: "6px 0 4px 18px" }}><strong>1. Medicines.</strong> Many medicines which are insoluble in water are given to the patients in form of colloidal dispersions. Medicines in the colloidal form are easily absorbed by the body tissues and hence are more effective.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>2. Cleansing action of soap.</strong> Soap is a colloidal solution which is used in removing greasy or oily material sticking to the clothes or utensils.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>3. Smoke precipitator.</strong> Smoke is a colloidal dispersion of carbon particles in air. Since carbon particles carry charge, they can be coagulated by applying electric field. As a result, pollution of air by the smoke coming out of the chimneys of industries can be prevented.</p>
    <p style={{ margin: "4px 0 4px 18px" }}><strong>4. Sewage disposal.</strong> Sewage water contains colloidal particles of dirt, mud, etc. Since these colloidal particles carry charge, they can be coagulated by applying electric field. Thus, sewage water can be purified and the dirt thus obtained is used as a manure.</p>
    <p style={{ margin: "4px 0 10px 18px" }}><strong>5. Production of rubber.</strong> Latex is a colloidal solution of negatively charged rubber particles in water. It is a white milky liquid obtained from rubber trees. Rubber is obtained from latex by coagulation with acetic acid which provides positively charged H<Sup c="+" /> ions to neutralize the negative charge of latex particles.</p>

    <SubHd id="s166" label="1.6.6" title="Comparison of characteristics of True Solution, Colloidal Solution and Suspension" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The main points of difference between true solution, colloidal solution and suspensions are given below :
    </p>
    <ComparisonTable />
  </Page>,

  // PAGE 15
  <Page key="p15">
    <ActivityBox num="1.2" sub="(To illustrate the difference between true solution suspension and colloidal solution, carry out the following activity)">
      <ActHd>Experimental Details of Activity.</ActHd>
      <ul style={{ margin: "4px 0 8px", paddingLeft: 24, listStyleType: "disc", fontSize: 14, lineHeight: 1.7 }}>
        <li style={{ marginBottom: 4 }}>Divide the class into four groups, A, B, C and D.</li>
        <li style={{ marginBottom: 4 }}>Distribute the following samples to each group.
          <ul style={{ paddingLeft: 20, listStyleType: "none", marginTop: 4 }}>
            <li>— Few crystals of copper sulphate to group A.</li>
            <li>— One spatula full of copper sulphate to group B.</li>
            <li>— Chalk powder or wheat flour to group C.</li>
            <li>— Few drops of milk or ink to group D.</li>
          </ul>
        </li>
        <li style={{ marginBottom: 4 }}>Now each group should add the given sample in water and stir properly using a glass rod.</li>
        <li style={{ marginBottom: 4 }}>Direct a beam of light from a torch through the beaker containing each mixture and observe from the front.</li>
        <li style={{ marginBottom: 4 }}>Leave the mixture undisturbed for a few minutes and then filter the mixture (Fig. 1.9).</li>
      </ul>

      <ActHd>Observations.</ActHd>
      <p style={{ margin: "6px 0 4px", fontWeight: 700 }}>1. Groups A and B.</p>
      <P2>(<em>i</em>) Groups A and B both have got <strong>true solutions.</strong> However, the intensity of the blue colour of the solution obtained by group A which contains only a few crystals of copper sulphate is <em>lower</em> than that of the solution obtained by group B which contains one spatula full of copper sulphate. Thus, <em>the intensity of colour depends upon the amount of substance dissolved.</em></P2>
      <P2>(<em>ii</em>) In both these solutions, particles are not visible to the naked eye.</P2>
      <P2>(<em>iii</em>) When the beam of light is passed through solution obtained by group A or group B, the path of the beam of light was not visible. Thus, <em>the particles of a true solution do not scatter light.</em></P2>
      <P2>(<em>iv</em>) When the above solution is allowed to stand, the solution is stable and the particles of the solution <em>do not settle down.</em> Further, when the above solution is allowed to filter, the whole solution passes through the pores of the filter paper without leaving any residue on the filter paper.</P2>
      <p style={{ margin: "4px 0 6px 18px" }}>Thus, <em>the particles of a true solution neither settle down on standing nor leave any residue when passed through a filter paper.</em></p>

      <p style={{ margin: "8px 0 4px", fontWeight: 700 }}>2. Group C.</p>
      <P2>(<em>i</em>) Group C has obtained a <strong>suspension.</strong></P2>
      <P2>(<em>ii</em>) The particles of a suspension scatter light and hence the particles are <em>visible to the naked eye.</em></P2>
      <P2>(<em>iii</em>) When the above suspension is allowed to stand, <em>it is not stable</em> and the particles of the suspension settle down.</P2>
      <P2>(<em>iv</em>) When the above suspension is filtered, the particles of the chalk or wheat flour being bigger in size than the pores of the filter paper remain as <em>residue</em> on the filter paper.</P2>

      <p style={{ margin: "8px 0 4px", fontWeight: 700 }}>3. Group D.</p>
      <P2>(<em>i</em>) The group D has obtained a <strong>colloidal solution.</strong></P2>
      <P2>(<em>ii</em>) When the above solution is allowed to stand, the particles of the colloidal solution like those of the true solution do not settle down.</P2>
      <P2>(<em>iii</em>) Since the particles of a colloidal solution are 100 times bigger than those of the true solution, therefore, <em>when a beam of light is passed through a colloidal solution, the particles of the colloidal solution scatter light and hence the path of the beam becomes visible.</em></P2>
      <P2>(<em>iv</em>) When the colloidal solution is passed through a filter paper, the particles of the colloidal solution like those of the true solution pass through the filter paper without leaving any residue on the filter paper.</P2>

      <ActHd>Conclusion.</ActHd>
      <P2>(<em>i</em>) The particles of a true solution are not visible even under a microscope. They do not settle down on standing and pass through the pores of the filter papers without leaving any residue.</P2>
      <P2>(<em>ii</em>) The particles of a suspension are visible to the naked eye. They settle down on standing and leave a residue on the filter paper.</P2>
      <P2>(<em>iii</em>) The particles of a colloidal solution scatter light and hence the path of light beam becomes visible when a beam of light is passed through it. The colloidal solution is stable and hence the particles of the colloidal solution do not immediately settle down on standing. They also pass through the pores of a filter paper.</P2>
    </ActivityBox>
  </Page>,

  // PAGE 16
  <Page key="p16">
    <SecHd id="s17" label="1.7" title="Various Ways to Express Concentration of Solution" />
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      To understand the meaning of concentration of a solution, let us take two beakers and label them as A and B. Place 50 mL of water in each one of them. Dissolve a few crystals of copper sulphate in beaker A and one full spatula of copper sulphate in beaker B. Stir well to obtain a clear transparent solution. Repeat the above experiment by taking 100 mL of water in each beaker. You will observe that the four beakers have different shades of blue colour. Thus, we conclude that in a solution, the relative amounts of the solute and the solvent can be varied. <em>Depending upon the amount of solute present in a solution, it can be called a dilute, concentrated, or saturated solution.</em> Dilute and concentrated are relative terms. Solution obtained in beaker A is dilute as compared to that obtained in beaker B.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      However, in scientific terms, the concentration of a solution may be defined as the amount of solute present in a given amount (mass or volume) of solution or the amount of solute dissolved in a given mass or volume of a solvent. Thus,
    </p>
    <MathBlock>
      Concentration of solution = <Frac n="Amount of solute" d="Amount of solution" />
    </MathBlock>
    <p style={{ textAlign: "center", margin: "4px 0" }}>or</p>
    <MathBlock>
      Concentration of solution = <Frac n="Amount of solute" d="Amount of solvent" />
    </MathBlock>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      There are various ways of expressing the concentration of a solution, but here, we shall discuss only some of the more common methods. Depending upon the type of solution whether solid in liquid or liquid in liquid, these methods are divided into the following two categories:
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>1. Solid in liquid solutions.</strong> If a solution is prepared by dissolving a <strong>solid solute</strong> in a <strong>liquid solvent,</strong> the concentration of the solution may be expressed either in mass by mass percentage or mass by volume percentage.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      (<em>i</em>) <strong>Mass by mass percentage or simply mass percentage.</strong> It is defined as follows :
    </p>
    <DefBox>
      <em>The mass of the solute in grams dissolved in 100 grams of the solution.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      For example, a 10 percent solution of common salt means 10 grams of common salt are present in 100 grams of the solution. Please note here that 100 grams of the solution also include 10 grams of common salt. In other words, 100 grams of common salt solution contain 100 – 10 = 90 grams of water. Thus, a 10 percent mass by mass percentage solution of common salt can be prepared by dissolving 10 grams of common salt in 90 grams of water so that the total mass of the solution becomes 100 grams. It may be further noted that concentration of a solution refers to the mass of the solute in 100 grams of the <strong>solution</strong> and not in 100 grams of the <strong>solvent.</strong> The mass by mass percentage of a solution may also be calculated by using the following formula,
    </p>
    <MathBlock>
      Mass by mass percentage or mass percentage of a solution = <Frac n="Mass of solute" d="Mass of solution" /> <Times /> 100
      <br />= <Frac n="Mass of solute" d="(Mass of solute + Mass of solvent)" /> <Times /> 100.
    </MathBlock>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      (<em>ii</em>) <strong>Mass by volume percentage.</strong> It is defined as follows :
    </p>
    <DefBox>
      <em>The mass of the solute in grams dissolved in 100 millilitres or 100 mL of the solution.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      For example, a 10 percent mass by volume solution of common salt in water means that 10 grams of common salt are present in 100 mL of the solution. In other words, a 10 percent mass by volume solution of common salt is prepared by first completely dissolving 10 grams of common salt in a small amount of water and then finally making the volume to 100 mL. The mass by volume percentage of a solution can also be calculated by using the following formula.
    </p>
    <MathBlock>
      Mass by volume percentage of a solution = <Frac n="Mass of solute" d="Volume of solution" /> <Times /> 100
    </MathBlock>
  </Page>,

  // PAGE 17
  <Page key="p17">
    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, margin: "6px 0 6px" }}>Concentration of very dilute solutions</p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      If a very small amount of a solute is dissolved in a large excess of the solvent, the values of mass by mass and mass by volume percentages will be very low. In order to increase their values, the concentration is expressed in parts per million or simply as ppm. It may be defined as follows
    </p>
    <DefBox>
      <em>The number of parts by mass (or volume) of solute per million parts by mass (or volume) of the solution.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Mathematically,
    </p>
    <MathBlock>
      ppm = <Frac n="Mass of solute" d="Mass of solution" /> <Times /> 10<Sup c="6" />
      &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;
      <Frac n="Volume of solute" d="Volume of solution" /> <Times /> 10<Sup c="6" />
    </MathBlock>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      The concentration of poisonous gases such as nitric oxide (NO), nitrogen dioxide (NO<Sub c="2" />), sulphur dioxide (SO<Sub c="2" />), etc. in the atmosphere is expressed in ppm. For example, if the concentration of sulphur dioxide (SO<Sub c="2" />) in air is 10 ppm, this means that 10 parts by volume of sulphur dioxide are present in 10<Sup c="6" /> parts by volume of air.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>2. Liquid in liquid solutions.</strong> If a solution is prepared by dissolving a <strong>liquid solute</strong> in a <strong>liquid solvent,</strong> the concentration of the solution is usually expressed in <strong>volume by volume percentage</strong> or <strong>simply volume percentage of the solution.</strong> It is defined as follows :
    </p>
    <DefBox>
      <em>The volume of the solute in millilitres dissolved in 100 millilitres or 100 mL of the solution.</em>
    </DefBox>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      For example, a 20 percent solution of alcohol in water means 20 mL of alcohol are dissolved in 100 mL of the solution, note that 100 mL of the solution also include 20 mL of alcohol. This means, 100 mL of alcohol solution contains 100–20 = 80 mL of water in it. In other words, we can prepare a 20 percent volume by volume solution of alcohol in water by mixing 20 mL of alcohol and 80 mL of water so that the total volume of the solution becomes 20 + 80 = 100 mL. It may be noted here that the concentration of the solution refers to the volume of the liquid solute in 100 mL of the <strong>solution</strong> and not the solvent.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      In general, we can calculate the volume by volume percentage of a solution by using the formula,
    </p>
    <MathBlock>
      Volume by volume percentage of a solution = <Frac n="Volume of solute in mL" d="Volume of solution in mL" /> <Times /> 100.
    </MathBlock>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      In most of the commercial products such as solutions of medicines, syrups, etc., the concentration of the liquid medicine is expressed in terms of volume by volume percentage and is denoted by the symbol <em>v/v.</em> However, the concentration of the solid medicine is expressed either in terms of weight by weight percentage (denoted by symbol <em>w/w</em>) or by weight by volume percentage (denoted by the symbol <em>w/v</em>). Please note that here the term weight has been used in place of mass. For example, a popular brand of antacid syrup, <strong>Gelusil</strong> contains about 5% <em>w/w</em> of magnesium hydroxide and 5% <em>w/w</em> of aluminium hydroxide besides other medicines.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontStyle: "italic" }}>
      Please note that if for a solution, the terms like w/w, w/v, v/v are not mentioned, it is always taken as w/w.
    </p>

    <NumericalSection topic="CONCENTRATION AND SOLUBILITY">
      <p><strong>Example 1.</strong> A solution contains 40 g of common salt in 320 g of water. Calculate the concentration in terms of mass by mass percentage of the solution.</p>
      <p><strong>Solution.</strong> Mass of common salt (solute) = 40 g<br />
      Mass of water (solvent) = 320 g</p>
      <MathBlock>
        ∴ Mass of the solution = Mass of the solute + Mass of the solvent = 40 + 320 = 360 g
      </MathBlock>
      <MathBlock>
        Thus, mass by mass percentage of the solution = <Frac n="Mass of the solute" d="Mass of solution" /> <Times /> 100 = <Frac n="40" d="360" /> <Times /> 100 = <strong>11·1%</strong>
      </MathBlock>

      <p><strong>Example 2.</strong> Calculate the mass of glucose and mass of water required to make 250 g of 25% solution of glucose.</p>
      <p><strong>Solution.</strong> Mass by mass percentage of solution = <Frac n="Mass of the solute" d="Mass of the solution" /> × 100</p>
      <p>Putting the values of the terms in the above relation, we have,</p>
      <MathBlock>
        25 = <Frac n="Mass of glucose" d="250 g" /> <Times /> 100
      </MathBlock>
      <MathBlock>
        Mass of glucose = <Frac n="25 × 250 g" d="100" /> = <strong>62·5 g</strong>
      </MathBlock>
      <MathBlock>
        ∴ Mass of water = Mass of the solution − Mass of solute = 250 − 62·5 = <strong>187·5 g</strong>
      </MathBlock>
    </NumericalSection>
  </Page>,

  // PAGE 18
  <Page key="p18">
    <NumericalSection topic="CONCENTRATION AND SOLUBILITY">
      <p><strong>Example 3.</strong> A solution contains 5 mL of alcohol in 70 mL of water. Calculate the volume by volume percentage of the solution.</p>
      <p><strong>Solution.</strong> Volume of alcohol (solute) = 5 mL</p>
      <p>Volume of water (solvent) = 70 mL</p>
      <MathBlock>
        Volume of the solution = Volume of alcohol + Volume of water = 5 + 70 = 75 mL
      </MathBlock>
      <MathBlock>
        Thus, volume by volume percentage of solution = <Frac n="Volume of solute" d="Volume of solution" /> <Times /> 100 = <Frac n="5" d="75" /> <Times /> 100 = <strong>6·66%</strong>
      </MathBlock>

      <p><strong>Example 4.</strong> Find out the mass by volume percentage of 15% solution of sulphuric acid (density = 1·02 g mL<Sup c="−1" />).</p>
      <p><strong>Solution.</strong> 15% solution of H<Sub c="2" />SO<Sub c="4" /> means 15 g of H<Sub c="2" />SO<Sub c="4" /> are present in 100 g of the solution, <em>i.e.,</em></p>
      <MathBlock>
        Mass of H<Sub c="2" />SO<Sub c="4" /> dissolved = 15 g &nbsp;&nbsp; Mass of solution = 100 g &nbsp;&nbsp; Density of the solution = 1·02 g cm<Sup c="−3" />
      </MathBlock>
      <MathBlock>
        ∴ Volume of the solution = <Frac n="Mass" d="Density" /> = <Frac n="100 g" d="1·02 g mL⁻¹" /> = 98·04 mL
      </MathBlock>
      <MathBlock>
        Thus, mass by volume percentage of the solution = <Frac n="Mass of the solute" d="Volume of the solution" /> <Times /> 100 = <Frac n="15" d="98·04" /> <Times /> 100 = <strong>15·3%</strong>
      </MathBlock>

      <p><strong>Example 5.</strong> 2·5 g of a solute are dissolved in 25 g of water to form a saturated solution at 298 K. Find out the solubility of the solute at this temperature.</p>
      <p><strong>Solution.</strong> Mass of the solute = 2·5 g &nbsp;&nbsp; Mass of the solvent = 25 g</p>
      <MathBlock>
        ∴ Solubility of the solute = <Frac n="Mass of the solute" d="Mass of the solvent" /> <Times /> 100 = <Frac n="2·5" d="25" /> <Times /> 100 = <strong>10 g</strong>
      </MathBlock>
    </NumericalSection>

    <ProblemsBox>
      <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside",
        fontSize: 14, lineHeight: 1.8, margin: 0 }}>
        <li style={{ marginBottom: 6 }}>15 g of common salt are dissolved in water. The solution was found to weigh 115 g. Calculate the mass by mass percentage of common salt in the solution. <strong>[Ans. 13·04%]</strong></li>
        <li style={{ marginBottom: 6 }}>A solution is prepared by dissolving 5 g of urea in 95 g of water. What is the mass by mass percentage of urea in the solution? <strong>[Ans. 5%]</strong></li>
        <li style={{ marginBottom: 6 }}>Calculate the masses of cane sugar and water required to prepare 200 g of 15% mass by mass solution of cane sugar in water. <strong>[Ans. Mass of canesugar = 30 g, mass of water = 170 g]</strong></li>
        <li style={{ marginBottom: 6 }}>It is desired to prepare 500 g of 10% mass by mass percentage of urea in water. How much urea should be dissolved in how much volume of water? Density of water is 1 g mL<Sup c="−1" />. <strong>[Ans. urea = 50 g, volume of water = 450 mL]</strong></li>
        <li style={{ marginBottom: 6 }}>15 mL of ethyl alcohol is mixed with 60 mL of gasoline. Calculate the volume by volume percentage of the solution. <strong>[Ans. 20%]</strong></li>
        <li style={{ marginBottom: 6 }}>What volume of alcohol and what volume of water must be mixed together to prepare 250 mL of 60% volume by volume solution of alcohol in water? <strong>[Ans. Alcohol = 150 mL, water = 100 mL]</strong></li>
        <li style={{ marginBottom: 6 }}>3 g of a solute are dissolved in 30 g of water to form a saturated solution at 298 K. Calculate the solubility of the solute at this temperature. <strong>[Ans. 10 g]</strong></li>
        <li style={{ marginBottom: 6 }}>
          (<em>a</em>) What mass of potassium chloride would be needed to form a saturated solution in 50 g of water at 313 K? Given the solubility of the salt = 40 g/100 g of water at this temperature.<br />
          (<em>b</em>) What will happen if the solution at this temperature is cooled?
          <br /><strong>[Ans. (a) 20 g, (b) excess of solute will crystallise out]</strong>
        </li>
        <li style={{ marginBottom: 6 }}>Calculate the percentage composition in terms of mass of a solution obtained by mixing 300 g of 25% and 400 g of a 40% solution by mass. <strong>[Ans. solute = 33·57%, water = 66·43%]</strong></li>
        <li style={{ marginBottom: 6 }}>
          Calculate the mass of sulphuric acid present in 100 mL of 15% mass by mass solution of sulphuric acid. (density = 1·10 g/mL) <strong>[Ans. 16·5 g]</strong>
          <p style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
            <strong>[Hint.</strong> 100/1·1 mL of solution contain sulphuric acid = 15 g ∴ 100 mL of the solution will contain sulphuric acid = <Frac n="15 × 1·1" d="100" /> × 100 g = <strong>16·5 g</strong>]
          </p>
        </li>
        <li style={{ marginBottom: 6 }}>How many litres of a 5·0% (w/v) glucose solution would you take to obtain 75 g glucose. <strong>[Ans. 1·5 L]</strong></li>
      </ol>
    </ProblemsBox>
  </Page>,

];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s11",  label: "1.1",   title: "Introduction",                          level: 1 },
  { id: "s12",  label: "1.2",   title: "What is a Mixture?",                    level: 1 },
  { id: "s13",  label: "1.3",   title: "Types of Mixtures",                     level: 1 },
  { id: "s14",  label: "1.4",   title: "What is a Solution?",                   level: 1 },
  { id: "s141", label: "1.4.1", title: "True Solution",                         level: 2 },
  { id: "s142", label: "1.4.2", title: "Aqueous and Non-aqueous Solutions",     level: 2 },
  { id: "s143", label: "1.4.3", title: "Components of a Solution",              level: 3 },
  { id: "s144", label: "1.4.4", title: "Types of Solutions",                    level: 2 },
  { id: "s145", label: "1.4.5", title: "Properties of Solutions",               level: 3 },
  { id: "s146", label: "1.4.6", title: "Saturated, Unsaturated, Supersaturated",level: 3 },
  { id: "s147", label: "1.4.7", title: "Solubility",                            level: 2 },
  { id: "s148", label: "1.4.8", title: "Solubility Curves",                     level: 3 },
  { id: "s15",  label: "1.5",   title: "What is a Suspension?",                 level: 1 },
  { id: "s151", label: "1.5.1", title: "Properties of a Suspension",            level: 2 },
  { id: "s16",  label: "1.6",   title: "What is a Colloidal Solution?",         level: 1 },
  { id: "s161", label: "1.6.1", title: "Dispersed Phase & Dispersion Medium",   level: 2 },
  { id: "s162", label: "1.6.2", title: "Types of Colloids",                     level: 2 },
  { id: "s163", label: "1.6.3", title: "Emulsions",                             level: 2 },
  { id: "s164", label: "1.6.4", title: "Properties of Colloids",                level: 2 },
  { id: "s165", label: "1.6.5", title: "Applications of Colloids",              level: 2 },
  { id: "s166", label: "1.6.6", title: "Comparison: True / Colloidal / Suspension", level: 2 },
  { id: "s17",  label: "1.7",   title: "Concentration of Solution",             level: 1 },
];

// ── CONCAT ALL PAGE ARRAYS ───────────────────────────────────
const allPages = [
  ...pages_b1,
  ...pages_b2,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter1() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  const bodyFont = {
    fontFamily: "'EB Garamond',Georgia,'Times New Roman',serif",
    fontSize: 15, lineHeight: 1.58, color: "#1a1a1a"
  };
  return (
    <div style={{ background: "#fff", minHeight: "100vh", ...bodyFont }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)" }}>
        <ChapterCover />
        {allPages}
        <div style={{ padding: "18px clamp(14px, 4vw, 28px)", background: "#fff", borderTop: "2px solid #e0e0e0",
          textAlign: "center", color: "#888", fontSize: 13, fontStyle: "italic" }}>
          Pages 1–18 · Sections 1.1–1.7 · Batches 3 &amp; 4 (Separation Techniques) coming soon
        </div>
      </div>
    </div>
  );
}
