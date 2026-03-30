"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ─── Design tokens ───────────────────────────────────────────────────────────
const P   = "#c0126a";
const BG  = "#e8e8e8";

// ─── Font loader ─────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ─── Inline Math Helpers ─────────────────────────────────────────────────────
const Sup = ({ c }) => <sup style={{ fontSize: "0.72em" }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em" }}>{c}</sub>;
const Frac = ({ n, d }) => (
  <span style={{ display:"inline-flex",flexDirection:"column",alignItems:"center",
    verticalAlign:"middle",lineHeight:1.25,margin:"0 3px",fontSize:"0.95em" }}>
    <span style={{ borderBottom:"1.5px solid #1a1a1a",padding:"0 4px 1px",textAlign:"center",whiteSpace:"nowrap" }}>{n}</span>
    <span style={{ padding:"1px 4px 0",textAlign:"center",whiteSpace:"nowrap" }}>{d}</span>
  </span>
);
const MathBlock = ({ children }) => (
  <div style={{ textAlign:"center",margin:"14px 20px",fontStyle:"italic",fontSize:"14.5px",lineHeight:1.6 }}>{children}</div>
);
const Arrow = () => <span style={{ margin:"0 6px" }}>⟶</span>;
const Eq   = () => <span style={{ margin:"0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin:"0 4px" }}>×</span>;

// ─── Page wrapper ────────────────────────────────────────────────────────────
const Page = ({ children }) => (
  <div style={{ background:"#fff",padding:"28px 48px 36px" }}>
    {children}
  </div>
);

// ─── Heading Hierarchy ───────────────────────────────────────────────────────
const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop:22,marginBottom:10 }}>
    <h2 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:14,
      fontWeight:800,color:P,textTransform:"uppercase",letterSpacing:"0.5px",margin:0 }}>
      {label}. {title}
    </h2>
    <div style={{ borderTop:"1.5px solid #c0126a",marginTop:4 }} />
  </div>
);
const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:14,
    fontWeight:700,color:P,margin:"16px 0 8px" }}>{label}. {title}</h3>
);
const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:13.5,
    fontWeight:700,color:P,margin:"14px 0 7px" }}>{label}. {title}</h4>
);
const MiniHd = ({ children }) => (
  <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:13,
    fontWeight:700,color:"#1a1a1a",margin:"12px 0 6px" }}>{children}</div>
);

// ─── Paragraph ───────────────────────────────────────────────────────────────
const P2 = ({ indent, children, style }) => (
  <p style={{ margin:"0 0 8px",textAlign:"justify",textIndent:indent?28:0,...style }}>{children}</p>
);

// ─── Content Blocks ──────────────────────────────────────────────────────────
const DefBox = ({ children }) => (
  <div style={{ border:"1.5px solid #888",padding:"10px 16px",margin:"12px 0",
    fontStyle:"italic",background:"#fafafa",fontSize:"14px",lineHeight:1.55 }}>
    {children}
  </div>
);

const ActivityBox = ({ title, children }) => (
  <div style={{ borderLeft:`4px solid ${P}`,background:"#fdf5f9",padding:"12px 16px",
    margin:"16px 0",fontSize:"14px",lineHeight:1.55 }}>
    <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontWeight:800,
      color:P,fontSize:12,textTransform:"uppercase",letterSpacing:1,marginBottom:8 }}>
      {title}
    </div>
    {children}
  </div>
);

const KBBox = ({ children }) => (
  <div style={{ border:`2px solid ${P}`,background:"#fff8fc",padding:"14px 18px",
    margin:"18px 0",fontSize:"14px",lineHeight:1.55 }}>
    <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontWeight:900,
      color:"#fff",background:P,fontSize:11,textTransform:"uppercase",letterSpacing:2,
      padding:"4px 12px",marginBottom:10,display:"inline-block" }}>
      KNOWLEDGE BOOSTER
    </div>
    {children}
  </div>
);
const KBHd = ({ children }) => (
  <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontWeight:700,
    color:P,fontSize:12.5,margin:"10px 0 6px" }}>{children}</div>
);

const FeatureBox = ({ title, children }) => (
  <div style={{ border:"1.5px solid #c0126a",background:"#fdf5f9",padding:"12px 16px",
    margin:"16px 0",fontSize:"14px",lineHeight:1.55 }}>
    <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontWeight:800,
      color:P,fontSize:12,marginBottom:8 }}>{title}</div>
    {children}
  </div>
);

const ProblemsBox = ({ children }) => (
  <div style={{ border:`2px solid ${P}`,margin:"18px 0",fontSize:"14px",lineHeight:1.55 }}>
    <div style={{ background:P,color:"#fff",fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontWeight:900,fontSize:12,textTransform:"uppercase",letterSpacing:2,
      padding:"7px 16px" }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding:"12px 16px" }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize:"0.8em",color:"#555",fontStyle:"italic",marginLeft:4 }}>
    [*{children}]
  </span>
);

// ─── Figure / Image Block ─────────────────────────────────────────────────────
const Figure = ({ src, alt, caption, width = "60%" }) => (
  <div style={{ textAlign:"center",margin:"16px 0" }}>
    <img src={src} alt={alt}
      style={{ maxWidth:width,width:"100%",height:"auto",border:"1px solid #e0e0e0" }} />
    {caption && (
      <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:12,
        fontStyle:"italic",color:"#444",marginTop:6,textAlign:"center" }}>
        {caption}
      </div>
    )}
  </div>
);

// ─── Numerical badge ─────────────────────────────────────────────────────────
const NumericalBadge = ({ topic1 = "NUMERICAL", topic2 = "PROBLEMS" }) => (
  <div style={{ background:P,color:"#fff",
    fontFamily:"'Merriweather Sans',Arial,sans-serif",fontWeight:900,
    fontSize:12,textAlign:"center",padding:"14px 8px",lineHeight:1.5,
    minWidth:110,flexShrink:0,letterSpacing:1 }}>
    {topic1}<br />{topic2}
  </div>
);

// ─── Table style constants ────────────────────────────────────────────────────
const th = {
  border:"1.5px solid #555",padding:"6px 10px",textAlign:"center",
  fontWeight:700,fontFamily:"'Merriweather Sans',Arial,sans-serif",
  fontSize:13,background:"#f0f0f0"
};
const td = {
  border:"1px solid #888",padding:"5px 9px",verticalAlign:"top",fontSize:13.5
};

// ─── Tables ──────────────────────────────────────────────────────────────────
const BinarySolutionsTable = () => (
  <div style={{ overflowX:"auto",margin:"14px 0" }}>
    <table style={{ borderCollapse:"collapse",width:"100%",fontSize:13 }}>
      <tbody>
        <tr>
          <th style={th}>Name of the solution</th>
          <th style={th}>Solute</th>
          <th style={th}>Solvent</th>
          <th style={th}>Examples</th>
        </tr>
        <tr><td style={{ ...td,...{background:"#f5f5f5",fontWeight:700,fontFamily:"'Merriweather Sans',Arial,sans-serif"} }} colSpan={4}>Solid solutions</td></tr>
        <tr>
          <td style={td}>1. Solid in solid</td>
          <td style={td}>Solid</td>
          <td style={td}>Solid</td>
          <td style={td}>Alloys like stainless steel (iron = 74% + chromium = 18% + nickel = 8%), steel (iron = 99.95% + carbon = 0.05%) brass (copper = 70% + zinc = 30%), bronze (copper = 90% + tin = 10%), German silver (copper = 60% + zinc = 20% + nickel = 20%), solder (lead 50% + tin = 50%), etc.</td>
        </tr>
        <tr>
          <td style={td}>2. Liquid in solid</td>
          <td style={td}>Liquid</td>
          <td style={td}>Solid</td>
          <td style={td}>Hydrated crystals such as blue vitriol (hydrated copper sulphate), dental amalgam (mercury liquid and silver solid)</td>
        </tr>
        <tr>
          <td style={td}>3. Gas in solid</td>
          <td style={td}>Gas</td>
          <td style={td}>Solid</td>
          <td style={td}>Gases adsorbed over the surface of metals (such as nickel, palladium, platinum, etc.) under pressure</td>
        </tr>
        <tr><td style={{ ...td,...{background:"#f5f5f5",fontWeight:700,fontFamily:"'Merriweather Sans',Arial,sans-serif"} }} colSpan={4}>Liquid solutions</td></tr>
        <tr>
          <td style={td}>4. Solid in liquid</td>
          <td style={td}>Solid</td>
          <td style={td}>Liquid</td>
          <td style={td}>Sugar, common salt or other salts dissolved in water, tincture of iodine.</td>
        </tr>
        <tr>
          <td style={td}>5. Liquid in liquid</td>
          <td style={td}>Liquid</td>
          <td style={td}>Liquid</td>
          <td style={td}>Mixture of two miscible liquids such as acetone and water, alcohol and water, vinegar (acetic acid and water), etc.</td>
        </tr>
        <tr>
          <td style={td}>6. Gas in liquid</td>
          <td style={td}>Gas</td>
          <td style={td}>Liquid</td>
          <td style={td}>Aerated drinks. Here, carbon dioxide is dissolved in water under pressure.</td>
        </tr>
        <tr><td style={{ ...td,...{background:"#f5f5f5",fontWeight:700,fontFamily:"'Merriweather Sans',Arial,sans-serif"} }} colSpan={4}>Gaseous solutions</td></tr>
        <tr>
          <td style={td}>7. Solid in gas</td>
          <td style={td}>Solid</td>
          <td style={td}>Gas</td>
          <td style={td}>Camphor in air or iodine in air.</td>
        </tr>
        <tr>
          <td style={td}>8. Liquid in gas</td>
          <td style={td}>Liquid</td>
          <td style={td}>Gas</td>
          <td style={td}>Clouds and fog. Here, water drops (liquid) are dispersed in gas (air).</td>
        </tr>
        <tr>
          <td style={td}>9. Gas in gas</td>
          <td style={td}>Gas</td>
          <td style={td}>Gas</td>
          <td style={td}>Air is a mixture of gases like nitrogen, oxygen, carbon dioxide, inert gases, etc.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const SolubilityTable = () => (
  <div style={{ overflowX:"auto",margin:"14px 0" }}>
    <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:12.5,fontWeight:700,
      textAlign:"center",margin:"0 0 6px",textTransform:"uppercase",letterSpacing:0.5 }}>
      TABLE 1.1. Solubility at different temperatures.
    </div>
    <table style={{ borderCollapse:"collapse",width:"100%",fontSize:13 }}>
      <tbody>
        <tr>
          <th style={th}>Substance dissolved</th>
          <th style={th} colSpan={5}>Solubility in grams/100 gram of water at different temperatures (K)</th>
        </tr>
        <tr>
          <th style={th}></th>
          <th style={th}>283</th>
          <th style={th}>293</th>
          <th style={th}>313</th>
          <th style={th}>333</th>
          <th style={th}>353</th>
        </tr>
        <tr>
          <td style={td}>Potassium nitrate</td>
          <td style={{ ...td,textAlign:"center" }}>21</td>
          <td style={{ ...td,textAlign:"center" }}>32</td>
          <td style={{ ...td,textAlign:"center" }}>62</td>
          <td style={{ ...td,textAlign:"center" }}>106</td>
          <td style={{ ...td,textAlign:"center" }}>167</td>
        </tr>
        <tr>
          <td style={td}>Sodium chloride</td>
          <td style={{ ...td,textAlign:"center" }}>36</td>
          <td style={{ ...td,textAlign:"center" }}>36</td>
          <td style={{ ...td,textAlign:"center" }}>36</td>
          <td style={{ ...td,textAlign:"center" }}>37</td>
          <td style={{ ...td,textAlign:"center" }}>37</td>
        </tr>
        <tr>
          <td style={td}>Potassium chloride</td>
          <td style={{ ...td,textAlign:"center" }}>35</td>
          <td style={{ ...td,textAlign:"center" }}>35</td>
          <td style={{ ...td,textAlign:"center" }}>40</td>
          <td style={{ ...td,textAlign:"center" }}>46</td>
          <td style={{ ...td,textAlign:"center" }}>54</td>
        </tr>
        <tr>
          <td style={td}>Ammonium chloride</td>
          <td style={{ ...td,textAlign:"center" }}>24</td>
          <td style={{ ...td,textAlign:"center" }}>37</td>
          <td style={{ ...td,textAlign:"center" }}>41</td>
          <td style={{ ...td,textAlign:"center" }}>55</td>
          <td style={{ ...td,textAlign:"center" }}>66</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const ColloidTypesTable = () => (
  <div style={{ overflowX:"auto",margin:"14px 0" }}>
    <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:12.5,fontWeight:700,
      textAlign:"center",margin:"0 0 6px",textTransform:"uppercase",letterSpacing:0.5 }}>
      TABLE 1.2. Common Examples of Colloids
    </div>
    <table style={{ borderCollapse:"collapse",width:"100%",fontSize:13 }}>
      <tbody>
        <tr>
          <th style={th}>Dispersed phase</th>
          <th style={th}>Dispersion medium</th>
          <th style={th}>Type</th>
          <th style={th}>Examples</th>
        </tr>
        <tr><td style={td}>1. Solid</td><td style={td}>Solid</td><td style={td}>Solid sol</td><td style={td}>Coloured gemstones, milky glass</td></tr>
        <tr><td style={td}>2. Solid</td><td style={td}>Liquid</td><td style={td}>Sol</td><td style={td}>Starch sol, gold sol, muddy water, milk of magnesia, white of an egg, paints, latex, gelatin, etc.</td></tr>
        <tr><td style={td}>3. Solid</td><td style={td}>Gas</td><td style={td}>Solid aerosol</td><td style={td}>Smoke, dust-storm, automobile exhaust, etc.</td></tr>
        <tr><td style={td}>4. Liquid</td><td style={td}>Solid</td><td style={td}>Gel</td><td style={td}>Jelly, cheese, butter, curd, shoe polish, etc.</td></tr>
        <tr><td style={td}>5. Liquid</td><td style={td}>Liquid</td><td style={td}>Emulsion</td><td style={td}>Milk, face cream, cod liver oil.</td></tr>
        <tr><td style={td}>6. Liquid</td><td style={td}>Gas</td><td style={td}>Aerosol</td><td style={td}>Fog, clouds, mist, sprays.</td></tr>
        <tr><td style={td}>7. Gas</td><td style={td}>Solid</td><td style={td}>Solid foam</td><td style={td}>Pumice stone, foam, rubber, sponge, bread, etc.</td></tr>
        <tr><td style={td}>8. Gas</td><td style={td}>Liquid</td><td style={td}>Foam</td><td style={td}>Froth, whipped cream, soap lather, shaving cream, etc.</td></tr>
      </tbody>
    </table>
    <table style={{ borderCollapse:"collapse",width:"100%",fontSize:13,marginTop:10 }}>
      <tbody>
        <tr>
          <td style={{ ...td,fontStyle:"italic" }} colSpan={2}>Further, depending upon the dispersion medium, the sols are given special names as follows:</td>
        </tr>
        <tr><th style={th}>Dispersion medium</th><th style={th}>Name of the sol</th></tr>
        <tr><td style={{ ...td,textAlign:"center" }}>Water</td><td style={{ ...td,textAlign:"center" }}>Aquasol or Hydrosol</td></tr>
        <tr><td style={{ ...td,textAlign:"center" }}>Alcohol</td><td style={{ ...td,textAlign:"center" }}>Alcosol</td></tr>
        <tr><td style={{ ...td,textAlign:"center" }}>Benzene</td><td style={{ ...td,textAlign:"center" }}>Benzosol</td></tr>
        <tr><td style={{ ...td,textAlign:"center" }}>Gases</td><td style={{ ...td,textAlign:"center" }}>Aerosol</td></tr>
      </tbody>
    </table>
  </div>
);

const ComparisonTable = () => (
  <div style={{ overflowX:"auto",margin:"14px 0" }}>
    <table style={{ borderCollapse:"collapse",width:"100%",fontSize:13 }}>
      <tbody>
        <tr>
          <th style={th}>Property</th>
          <th style={th}>True Solution</th>
          <th style={th}>Colloidal Solution</th>
          <th style={th}>Suspension</th>
        </tr>
        <tr>
          <td style={td}>1. Particle size (Diameter)</td>
          <td style={td}>&lt; 10<Sup c="-7" /> cm (or 10<Sup c="-9" /> m or 1 nm)</td>
          <td style={td}>Between 10<Sup c="-7" />–10<Sup c="-5" /> cm (10<Sup c="-9" /> to 10<Sup c="-7" /> m or 1 nm–100 nm)</td>
          <td style={td}>&gt; 10<Sup c="-5" /> cm (or 10<Sup c="-7" /> m or 100 nm)</td>
        </tr>
        <tr>
          <td style={td}>2. Appearance</td>
          <td style={td}>Clear and transparent</td>
          <td style={td}>Translucent</td>
          <td style={td}>Opaque</td>
        </tr>
        <tr>
          <td style={td}>3. Nature</td>
          <td style={td}>Homogeneous</td>
          <td style={td}>Heterogeneous</td>
          <td style={td}>Heterogeneous</td>
        </tr>
        <tr>
          <td style={td}>4. Filtrability</td>
          <td style={td}>Pass through ordinary filter paper as well as animal membranes (having pores smaller than filter paper)</td>
          <td style={td}>Pass through ordinary filter paper but not through semipermeable membranes.</td>
          <td style={td}>Neither pass through filter paper nor through semi-permeable membranes.</td>
        </tr>
        <tr>
          <td style={td}>5. Settling of particles</td>
          <td style={td}>Particles do not settle down on standing, i.e., true solutions are stable.</td>
          <td style={td}>Colloidal particles also do not settle on keeping, i.e., colloids are also stable. However, they can be made to settle by centrifugation.</td>
          <td style={td}>Particles of suspension settle down on standing, i.e., suspensions are unstable</td>
        </tr>
        <tr>
          <td style={td}>6. Visibility</td>
          <td style={td}>Solute particles are not visible even under a microscope.</td>
          <td style={td}>Particles themselves are invisible but their presence can be detected under an ultramicroscope.</td>
          <td style={td}>Particles are generally visible to the naked eye.</td>
        </tr>
        <tr>
          <td style={td}>7. Tyndall effect</td>
          <td style={td}>Does not scatter light and hence does not show Tyndall effect.</td>
          <td style={td}>Shows Tyndall effect due to scattering of light.</td>
          <td style={td}>Shows Tyndall effect</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ─── TOC data ────────────────────────────────────────────────────────────────
const TOC = [
  { id:"s11", label:"1.1", title:"Introduction" },
  { id:"s12", label:"1.2", title:"What is a Mixture?" },
  { id:"s13", label:"1.3", title:"Types of Mixtures" },
  { id:"s14", label:"1.4", title:"What is a Solution?", children:[
    { id:"s141", label:"1.4.1", title:"True Solution" },
    { id:"s142", label:"1.4.2", title:"Aqueous & Non-aqueous" },
    { id:"s143", label:"1.4.3", title:"Components of a Solution" },
    { id:"s144", label:"1.4.4", title:"Types of Solutions" },
    { id:"s145", label:"1.4.5", title:"Properties of Solutions" },
    { id:"s146", label:"1.4.6", title:"Saturated/Unsaturated/Supersaturated" },
    { id:"s147", label:"1.4.7", title:"Solubility" },
    { id:"s148", label:"1.4.8", title:"Solubility Curves" },
  ]},
  { id:"s15", label:"1.5", title:"What is a Suspension?", children:[
    { id:"s151", label:"1.5.1", title:"Properties of a Suspension" },
  ]},
  { id:"s16", label:"1.6", title:"What is a Colloidal Solution?", children:[
    { id:"s161", label:"1.6.1", title:"Dispersed Phase & Dispersion Medium" },
    { id:"s162", label:"1.6.2", title:"Types of Colloids" },
    { id:"s163", label:"1.6.3", title:"Emulsions" },
    { id:"s164", label:"1.6.4", title:"Properties of Colloids" },
    { id:"s165", label:"1.6.5", title:"Applications of Colloids" },
    { id:"s166", label:"1.6.6", title:"Comparison Table" },
  ]},
  { id:"s17", label:"1.7", title:"Concentration of Solution" },
  { id:"s18", label:"1.8", title:"Separation Techniques", children:[
    { id:"s181", label:"1.8.1", title:"Separating Funnel" },
    { id:"s182", label:"1.8.2", title:"Sublimation" },
    { id:"s183", label:"1.8.3", title:"Crystallisation" },
    { id:"s184", label:"1.8.4", title:"Centrifugation" },
    { id:"s185", label:"1.8.5", title:"Coagulation" },
    { id:"s186", label:"1.8.6", title:"Distillation" },
    { id:"s187", label:"1.8.7", title:"Fractional Distillation" },
    { id:"s188", label:"1.8.8", title:"Chromatography" },
  ]},
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ open, setOpen }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth",block:"start" });
  };
  return (
    <div style={{ width:open?220:36,flexShrink:0,transition:"width 0.25s",
      background:"#fff",borderRight:"1px solid #ddd",height:"100vh",
      position:"sticky",top:0,overflow:"hidden",
      boxShadow:"2px 0 8px rgba(0,0,0,0.07)" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width:"100%",background:"#c0126a",color:"#fff",border:"none",
          cursor:"pointer",padding:"10px 0",
          fontFamily:"'Merriweather Sans',Arial,sans-serif",
          fontWeight:800,fontSize:12,letterSpacing:1,
          display:"flex",alignItems:"center",
          justifyContent:open?"flex-end":"center",paddingRight:open?12:0 }}>
        {open?"◀ TOC":"▶"}
      </button>
      {open && (
        <div style={{ padding:"8px 0",overflowY:"auto",maxHeight:"calc(100vh - 40px)" }}>
          {TOC.map(sec => (
            <div key={sec.id}>
              <button onClick={() => scrollTo(sec.id)}
                style={{ display:"block",width:"100%",textAlign:"left",
                  background:"none",border:"none",cursor:"pointer",
                  padding:"5px 12px",
                  fontFamily:"'Merriweather Sans',Arial,sans-serif",
                  fontWeight:700,fontSize:11.5,color:"#c0126a",
                  borderLeft:"3px solid #c0126a",marginBottom:1,lineHeight:1.3 }}>
                {sec.label} {sec.title}
              </button>
              {sec.children?.map(ch => (
                <button key={ch.id} onClick={() => scrollTo(ch.id)}
                  style={{ display:"block",width:"100%",textAlign:"left",
                    background:"none",border:"none",cursor:"pointer",
                    padding:"3px 12px 3px 22px",fontSize:11,
                    color:"#555",lineHeight:1.3 }}>
                  {ch.label} {ch.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Export
// ═══════════════════════════════════════════════════════════════════════════════
export default function Chapter1() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(true);
  const bodyFont = {
    fontFamily:"'EB Garamond',Georgia,'Times New Roman',serif",
    fontSize:15,lineHeight:1.58,color:"#1a1a1a"
  };

  return (
    <div style={{ display:"flex",background:BG,minHeight:"100vh",...bodyFont }}>
      <Sidebar open={tocOpen} setOpen={setTocOpen} />
      <div style={{ flex:1,overflowY:"auto",maxHeight:"100vh" }}>

        {/* ── Chapter Cover ── */}
        <div style={{ background:"linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding:"40px 50px 32px",textAlign:"center" }}>
          <div style={{ display:"inline-block",background:"#fff",
            border:"3px solid #c0126a",width:68,height:68,lineHeight:"68px",
            fontSize:40,fontWeight:900,color:"#c0126a",marginBottom:20,
            boxShadow:"0 2px 8px rgba(0,0,0,0.2)",
            fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>
            1
          </div>
          <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",fontSize:26,
            fontWeight:900,letterSpacing:2,color:"#1a1a1a",textTransform:"uppercase" }}>
            Exploring Mixtures and Their Separation
          </div>
        </div>

        {/* ══════════════════ PAGE 1 ══════════════════ */}
        <Page>
          {/* 1.1 Introduction */}
          <SecHd id="s11" label="1.1" title="Introduction" />
          <P2 indent>We daily consume a number of things such as milk, ghee, iodised salt, sugar, water, soft drinks, juices, etc. How do we know that all these things are pure? For a common man, pure actually means having no adulteration. But for a scientist pure means that it contains only one type of matter or particles. For example, if we examine sugar under a microscope, we find that all the particles of sugar are the same. Therefore, sugar is a pure substance. On other hand, for a scientist, milk is actually a mixture of different substances such as water, fat, proteins, etc. and hence not pure. Similarly, ghee, iodized salt, soft drinks, juices, etc. are all mixtures of different substances and hence impure. When a scientist says something is pure, it means that all the constituent particles of that substance are the same in their chemical nature. Thus, a pure substance consists of a single type of matter. In other words, a substance is a pure single form of matter.</P2>
          <P2 indent>If we look around, we see that most of the matter around us exists as mixtures of two or more pure components. For example, sea water, minerals, soil, etc. are all mixtures.</P2>

          {/* 1.2 What is a Mixture */}
          <SecHd id="s12" label="1.2" title="What is a Mixture?" />
          <P2 indent>Mixtures are obtained by mixing more than one kind of pure form of matter. We know that sodium chloride (common salt) dissolved in water can be separated from water by the physical process of evaporation. However, sodium chloride is itself a pure substance and it cannot be separated by any physical process into its chemical constituents, Na<Sup c="+" /> and Cl<Sup c="−" /> ions. Similarly, sugar is a pure substances since it contains only one kind of pure matter and its composition is the same throughout.</P2>
          <P2 indent>Soft drink and soil are not single pure substances. Whatever may be the source of a pure substance, it will always have the same characteristic properties. Thus, in a nutshell, we can say that a mixture contains more than one pure substances.</P2>

          {/* 1.3 Types of Mixtures */}
          <SecHd id="s13" label="1.3" title="Types of Mixtures" />
          <P2 indent>Depending upon the nature of components which form a mixture, mixtures are classified into the following two types:</P2>
          <P2>1. Homogeneous mixtures and 2. Heterogeneous mixtures</P2>
          <P2><strong>1. Homogeneous mixtures.</strong> A homogeneous mixture is defined as follows :</P2>
          <DefBox>A mixture is said to be homogeneous if all the components of the mixture are uniformly mixed and there is no boundaries of separation between them.</DefBox>
          <P2 indent>Some homogeneous mixtures used in daily life are : alloys (steel, brass, bronze), a mixture of sugar or common salt in water, rain water, sea water, rectified spirit, gasoline, vinegar, carbonated soda (coca-cola, pepsi, limica), lemonade, orange juice, apple juice, honey, tea, ice tea, wine, beer, coffee, perfume, blood plasma, mouthwash, hand sanitizer, laundry detergent, dish-washer detergent, antifreeze, air, natural gas, cooking gas etc.</P2>
          <P2 indent>In fact, all homogeneous mixtures can be called solutions.</P2>
          <P2><strong>2. Heterogeneous mixtures.</strong> A heterogeneous mixture is defined as follows :</P2>
          <DefBox>A mixture is said to be heterogeneous if all the components of the mixture are not thoroughly mixed and there are visible boundaries of separation between them.</DefBox>
          <P2 indent>Some heterogeneous mixtures used in daily life are :</P2>
          <P2 indent>Vegetable soup, chicken noodle soup, fruit salad, mixed nuts, milk, milk with nuts, cereals, pizza, butter, mayonnaise, salsa, blood, smoke, soil, sand, concrete, granite, orange juice with pulp, muddy water, toothpaste, shaving cream, sand and iron filings, sand and water, sand and sulphur, chalk or wheat fluor and water, gun powder, chocolate chip cookies, ice-cube in drinks, soap-water we use to wash clothes, oil in water, soil and oil, etc.</P2>

          {/* Activity 1.1 */}
          <ActivityBox title="ACTIVITY 1.1">
            <P2><em>(To illustrate the concept of homogeneous and heterogeneous mixtures, carry out the following activity)</em></P2>
            <MiniHd>Experimental Details of Activity</MiniHd>
            <ul style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Divide the class into four groups: A, B, C and D.</li>
              <li>Ask students of group A to dissolve one spatula full of copper sulphate in 50 mL of water in a beaker and students of group B to dissolve two spatula full of copper sulphate in 50 mL of water in another weaker.</li>
              <li>Ask students of group C and D to take different amounts of copper sulphate and potassium permanganate or common salt and mix them through in a pestle and mortar.</li>
            </ul>
            <MiniHd>Observations.</MiniHd>
            <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Both groups A and B have obtained homogeneous mixtures since the composition of these mixtures or solutions is uniform throughout.</li>
              <li>Although both the groups have obtained copper sulphate solutions but the intensity of blue colour is different. The intensity of blue colour obtained by group B which contains two spatula full of copper sulphate is much higher than the solution obtained by group A which contains one spatula full of copper sulphate.</li>
              <li>Both groups C and D have obtained heterogeneous mixtures since they not only have physically distinct boundaries but also their composition is not uniform.</li>
            </ol>
            <MiniHd>Conclusion.</MiniHd>
            <ol style={{ margin:"6px 0 6px 20px",lineHeight:1.65 }}>
              <li>Soluble substances such as copper sulphate, common salt or sugar when dissolved in water form homogeneous mixture whose composition depends upon the amount of the substance dissolved.</li>
              <li>When two or more solids which do not react chemically are mixed they always form heterogeneous mixtures.</li>
            </ol>
          </ActivityBox>

          <P2 indent>According to another classification, mixtures are of the following three types:</P2>
          <P2>1. Solutions &nbsp; 2. Suspensions and &nbsp; 3. Colloidal solutions.</P2>
        </Page>

        {/* ══════════════════ PAGE 2 ══════════════════ */}
        <Page>
          {/* 1.4 What is a Solution */}
          <SecHd id="s14" label="1.4" title="What is a Solution?" />
          <DefBox>A solution is defined as a homogeneous mixture of two or more chemically non-reacting substances whose composition can be varied within limits.</DefBox>
          <P2 indent>It may be noted that all mixtures are not solutions. If a mixture is to be called as solution, it must satisfy the following two conditions:</P2>
          <P2>(i) the components of a mixture should be non-reacting and (ii) mixture should be homogeneous.</P2>
          <P2 indent>For example, lemonade is a solution of sugar, salt and lemon juice in water. These four components of the solution do not react with each other since each constituent has its own taste in the lemonade. Instead the particles of sugar, salt and lemon juice mix with particles of water so thoroughly that we cannot see them even under a microscope. Thus, in solutions, there is homogeneity at the particle level, i.e., lemonade tastes the same throughout.</P2>
          <P2 indent>Another example of a homogeneous mixture from our daily life is vinegar which is a 5–8% solution of acetic acid in water.</P2>

          <SubHd id="s141" label="1.4.1" title="Why is a solution called a true Solution?" />
          <P2 indent>The solutions of sugar, common salt, acetic acid, etc. in water are called true solutions because in these solutions, the particles of the solute (sugar, salt, acetic acid, etc.) are so thoroughly mixed with water that we cannot distinguish one from the other.</P2>

          <SubHd id="s142" label="1.4.2" title="Aqueous and Non-aqueous Solutions" />
          <P2 indent>Most of the substances are soluble in water. That is why water is sometimes called a 'Universal solvent'. However, all substances do not dissolve in water. Therefore, other solvents such as ether, benzene, alcohol, carbon disulphide, carbon tetrachloride, etc. are also used to prepare solutions. A solution in which water acts as the solvent is called an aqueous solution while the one in which any other liquid acts as the solvent is called a non-aqueous solution. For example, the solution of common salt or sugar in water is called an aqueous solution. However, solution of bromine in carbon tetrachloride, sulphur in carbon disulphide, iodine in alcohol (tincture of iodine) are called non-aqueous solutions.</P2>

          <SubSubHd id="s143" label="1.4.3" title="Components of a Solution" />
          <P2 indent>In principle, any number of components or constituents may be present in a solution. For example, sea water is a solution of many components such as sodium chloride, magnesium chloride, calcium chloride, magnesium sulphate, etc. of which sodium chloride is the main component. However, for sake of convenience, we shall discuss here only binary solutions. Such solutions have only two components or constituents. These are called solute and the solvent.</P2>
          <P2 indent>In a binary solution, the component dissolved is called the solute and the medium in which it is dissolved is called the solvent. In other words, the component of the solution which is present in small amount is called the solute while the component of the solution which is present in large amount is called the solvent. For example, when sugar is dissolved in water to prepare sugar solution, sugar is called the solute while water is called the solvent.</P2>

          <SubSubHd id="s144" label="1.4.4" title="Types of Solutions" />
          <P2 indent>We know that substances ordinarily exist in three states (phases), i.e., solid, liquid and gas. In binary solutions, each one of these phases can act as a solute or as a solvent. Therefore, there are nine different types of binary solutions. These have been further divided into the following three categories depending upon the nature of the substance acting as the solvent. These are :</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li><strong>Solid solutions.</strong> In these solutions, solid acts as the solvent.</li>
            <li><strong>Liquid solutions.</strong> In these solutions, liquid acts as the solvent.</li>
            <li><strong>Gaseous solutions.</strong> In these solutions, gas acts as the solvent.</li>
          </ol>
          <P2 indent>Let us now briefly discuss some examples of each of the above three types :</P2>
          <P2><strong>1. Solid solutions.</strong> In solid solutions, a solid is the solvent while solute can be either a solid, liquid or a gas. Some examples are :</P2>
          <P2 indent>(i) Alloys are examples of solid in solid solutions. In fact, alloys are homogeneous mixtures of two or more metals or a metal and a non-metal. Although the components (i.e., constituent metals) of an alloy cannot be separated by physical methods, yet an alloy is considered to be a mixture because it shows the properties of its constituents and can have variable composition. For example, amount of zinc in brass can vary from 20–35% while that of copper can vary from 65–80%.</P2>
          <P2 indent>Pure gold is 24 carat. It is very soft and is, therefore, not suitable for making jewellery. To make it hard, it is alloyed with either copper or silver. In India, generally 22 carat gold is used for making ornaments. This means 22 parts by weight of pure gold is alloyed with 2 parts by weight of either copper or silver.</P2>
          <P2 indent>An example of an alloy of a metal and a non-metal is steel. It is an alloy of iron (metal) and a small amount (0·05%) of carbon (non-metal).</P2>
          <P2 indent>(ii) Hydrated salts, i.e., salts containing water of crystallization such as hydrated copper sulphate (blue vitriol), hydrated ferrous sulphate (green vitriol), hydrated magnesium sulphate (white vitriol), etc. are examples of liquid in solid solutions.</P2>
          <P2 indent>(iii) Gases adsorbed on the surface of metals such as nickel, platinum, palladium, etc. are examples of gas in solid solutions.</P2>
          <P2><strong>2. Liquid solutions.</strong> In liquid solutions, a liquid is the solvent while the solute can be either a solid, liquid or a gas. Some examples are :</P2>
          <P2 indent>(i) A solution of sugar in water is an example of a solid in liquid solution. Here, sugar is the solute while water is the solvent. Another example is tincture of iodine. It is obtained by dissolving iodine in alcohol. Here, iodine is the solute while alcohol is the solvent. Brine (concentrated solution of common salt in water) is yet another example of solid in liquid solution.</P2>
          <P2 indent>(ii) A mixture of two or more miscible liquids from liquid in liquid solutions. For example, rectified spirit which contains about 95% alcohol and about 5% water. Here, alcohol is solvent and water is the solvent. Similarly, petrol, kerosene oil and diesel are homogeneous mixtures of a number of liquid hydrocarbons.</P2>
          <P2 indent>(iii) Aerated drinks like soda water, coca-cola, pepsi, limica, etc. are gas in liquid solutions. These contain carbon dioxide (gas) as solute and water (liquid) as solvent.</P2>
          <P2><strong>3. Gas solutions.</strong> In gas solutions, gas is the solvent while solute can be either a solid, liquid or a gas. Some examples are :</P2>
          <P2 indent>(i) Camphor in air or iodine in air are the examples of solid in gas solutions. Here, camphor or iodine (solid) is the solute while air (gas) is the solvent.</P2>
          <P2 indent>(ii) Clouds, fog, mist, etc. are examples of liquid in gas solutions. Here, water drops (liquid solute) are dispersed in air (gas solvent).</P2>
          <P2 indent>(iii) Air is a mixture of gas in gas. Air is a homogeneous mixture of many gases. Its two main gases are oxygen (21%) and nitrogen (78%). The other gases (carbon dioxide, inert gases and water vapours) are, however, present in very small quantities (1%). Here, nitrogen gas acts as the solvent while other gases act as the solute.</P2>
          <P2 indent>Similarly, natural gas is mainly a homogeneous mixture of methane along with small amounts of other hydrocarbons such as ethane, propane, butane, etc.</P2>
          <P2 indent>The nine types of binary solutions discussed above are summarised in the following table :</P2>
          <BinarySolutionsTable />
        </Page>

        {/* ══════════════════ PAGE 3 ══════════════════ */}
        <Page>
          <SubSubHd id="s145" label="1.4.5" title="Properties of Solutions" />
          <P2 indent>The main characteristics of a solution may be summed up as follows :</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>A solution is a homogeneous mixture.</li>
            <li>The components of a solution do not chemically react with one another.</li>
            <li>The particles of a solution are smaller than 1 nm (10<Sup c="−9" /> m) in diameter. So, they cannot be seen by naked eyes or even under a microscope.</li>
            <li>Because of small size, the solute particles do not scatter a beam of light passing through the solution. Therefore, the path of light is not visible in a solution.</li>
            <li>The particles of the solute in a solution pass through the filter paper thereby showing that the solute particles are smaller than the pores of the filter paper.</li>
            <li>When the solution is allowed to stand undisturbed, the particles of the solute do not settle down. This shows that solutions are stable.</li>
            <li>A solution is always transparent in nature. It may be colourless or coloured. For example, a solution of sugar in water is colourless while that of copper sulphate in water has blue colour.</li>
          </ol>

          <SubSubHd id="s146" label="1.4.6" title="Saturated, Unsaturated and Supersaturated Solutions" />
          <P2><strong>Saturated solution.</strong> When we dissolve a solute (i.e., sugar) in a solvent (i.e., water) with stirring, initially the sugar will dissolve readily in water. But after a while, the process of dissolution will become slower and slower. If, however, we keep on adding sugar to the solution formed with stirring, ultimately a stage will be reached when no more sugar will dissolve. Instead, it will start settling at the bottom of the beaker. Such a solution is called a saturated solution. Thus,</P2>
          <DefBox>A solution which contains the maximum amount of solute dissolved in a given quantity of the solvent at the given temperature and which cannot dissolve any more solute at that temperature is called a saturated solution.</DefBox>
          <P2 indent>If to a saturated solution, more solute is added, it will remain undissolved. Thus, in a saturated solution, there is always an equilibrium between the dissolved and the undissolved solute. In other words, the rate at which the undissolved solute dissolves is equal to the rate at which the dissolved salt separates out of the solution and gets deposited. As a result, the amount of dissolved or the undissolved solute remains constant at a particular temperature.</P2>
          <P2><strong>Unsaturated solution.</strong> If a solution contains solute less than the maximum that it can dissolve at the given temperature, the solution is said to be unsaturated. In other words, an unsaturated solution may be defined as follows :</P2>
          <DefBox>A solution that can dissolve more solute in it at the given temperature is called an unsaturated solution.</DefBox>
          <P2 indent>Thus, it is obvious that a saturated solution contains more solute than an unsaturated solution at a given temperature. For example,</P2>
          <P2 indent>(i) A maximum of 32 grams of potassium nitrate can be dissolved in 100 gram of water at 293 K. Thus, a saturated solution of potassium nitrate contains 32 grams of potassium nitrate at 293 K. Suppose we now dissolve 20 g of potassium nitrate in 100 g of water at 293 K, the solution so obtained would be unsaturated. This is because we can still dissolve 12 (32–20) gram more of potassium nitrate in the same amount (100 grams) of water at the same temperature to make a saturated solution.</P2>
          <P2 indent>(ii) A maximum of 36 grams of common salt (sodium chloride) can be dissolved in 100 grams of water at 293 K. Thus, a saturated solution of common salt contains 36 grams of common salt in 100 grams of water at 293 K. Suppose, we now dissolve 25 grams of common salt at 293 K, the solution so obtained will be unsaturated. This is because we can still dissolve 11 (36–25) gram of more common salt in the same amount (100 gram) of water at the same temperature to make a saturated solution.</P2>
          <P2 indent>A saturated solution, however becomes unsaturated either on heating or on dilution.</P2>
          <P2><strong>Supersaturated solution.</strong> Besides saturated and unsaturated, there is another kind of solution called supersaturated solution. It is defined as follows :</P2>
          <DefBox>A solution which temporarily contains more solute than the saturation level (i.e., the maximum solute) at a particular temperature is called the supersaturated solution.</DefBox>
          <MiniHd>Preparation of supersaturated solutions</MiniHd>
          <P2 indent>Many solid solutes are more soluble at higher temperatures than at lower temperatures. Sometimes when the solution of such a solid, prepared at higher temperature, is allowed to cool quickly, all the solute remains dissolved. This happens, even though it will not dissolve to that extent at the lower temperature. Sodium acetate and sodium thiosulphate are two such compounds which readily form supersaturated solutions. Honey is essentially a supersaturated solution of various sugars in water.</P2>
          <P2><strong>Test for saturated, unsaturated and supersaturated solutions.</strong> In order to test whether a given solution is saturated or unsaturated, add some more solute to this solution and try to dissolve by stirring with a glass rod keeping the temperature constant. If more solute does not dissolve in the given solution, then it must be a saturated solution and if more solute dissolves, it must be an unsaturated solution.</P2>
          <P2 indent>On the other hand, supersaturated solution can be easily distinguished from the saturated solution either simply by shaking or by adding a crystal of the solute dissolved. If now a sizeable quantity of the solute quickly separates out from the solution as crystals, it is a supersaturated solution otherwise it is a saturated solution. Thus, a supersaturated solution unlike saturated solution is not stable.</P2>

          <SubHd id="s147" label="1.4.7" title="Solubility" />
          <DefBox>The maximum amount of solute in grams which can be dissolved in 100 grams of the solvent at a given temperature to form a saturated solution is called the solubility of the solute in that solvent at that particular temperature.</DefBox>
          <P2 indent>In other words, concentration of solute in a saturated solution is the same as the solubility of the solute at that temperature. The solubility of the solute is expressed in grams per 100 grams of the solvent at a given temperature. For example, a maximum of 32 grams of potassium nitrate can be dissolved in 100 grams of water at 20°C (293 K). Thus, the solubility of potassium nitrate at 20°C (or 293 K) is 32 grams.</P2>
          <P2 indent>Similarly, a maximum of 36 grams of common salt (sodium chloride) can be dissolved in 100 grams of water at 20°C (or 293 K), therefore, the solubility of common salt in water at 20°C (or 293 K) is 36 grams.</P2>
          <P2 indent>It is interesting to note that different substances have different solubilities in the same solvent at a given temperature (Table 1.1).</P2>
          <P2 indent>Alternatively, the same substance may have different solubilities in different solvents. For example, sugar or common salt is more soluble in water than in alcohol.</P2>
          <P2><strong>Effect of Temperature and Pressure on Solubility.</strong> The following cases arise :</P2>
          <P2>(i) <strong>Solubility of solids in liquids.</strong> When a saturated solution at a particular temperature (say room temperature) is heated, it becomes unsaturated. This is because the solubility of a substance generally increases with increase<FootNote>Solubility of solids in liquids generally increases with temperature; however, a few exceptions exist such as Na₂SO₄ and Ce₂(SO₄)₃ whose solubilities decrease.</FootNote> in temperature (Table 1.1) and hence more solute can be dissolved on increasing the temperature. If a saturated solution, at a particular temperature is cooled, then some of the dissolved solute will separate out in form of crystals. This is because solubility of solute in the solution decreases on cooling.</P2>
          <SolubilityTable />
          <P2 indent>The solubility of solids in liquids, however, remains unaffected by changes in pressure.</P2>
          <P2>(ii) <strong>Solubility of gases in liquids.</strong> The solubility of gases in liquids increases on decreasing the temperature or decreases on increasing the temperature. For example, water contains dissolved oxygen. When water is boiled, the solubility of oxygen in water decreases and the excess oxygen escapes in form of bubbles.</P2>
          <P2 indent>The solubility of gases in liquids, however, increases on increasing the pressure and decreases on decreasing the pressure. For example, during manufacture of cold drinks, carbon dioxide is dissolved in water under pressure. However, when a bottle of soft drink is opened, the pressure inside decreases and the solubility of carbon dioxide also decreases. So, the excess dissolved carbon dioxide escapes in form of bubbles.</P2>
        </Page>

        {/* ══════════════════ PAGE 4 ══════════════════ */}
        <Page>
          <SubSubHd id="s148" label="1.4.8" title="Effect of Temperature on Solubility of Substances – Solubility Curves" />
          <P2 indent>The solubility of a solute in a given solvent generally increases with temperature. The solubilities of some common inorganic compounds in water at different temperatures are given in Fig. 1.1. There curves are called solubility curves.</P2>
          <P2 indent>It is evident from the Fig. 1.1, most of the salts (e.g., KNO₃, NH₄Br) show marked increase in solubility with increase in temperature. Some of them (i.e., NaCl) show only a small increase in solubility with rise in temperature. However, there are only a few substances (e.g., anhydrous sodium sulphate, Na<Sub c="2" />SO<Sub c="4" /> and cerium sulphate, Ce<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" /> which show decrease in solubility with rise in temperature.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_0827B1785CF2284301FC}
            alt="Solubility curves of various inorganic compounds"
            caption="Fig. 1.1. Solubility curves of various inorganic compounds"
            width="40%"
          />

          <P2 indent>The solubility curve of sodium sulphate shows a peculiar behaviour. It first increases with rise in temperature up to 305·3 K and then begins to decrease with rise in temperature. Actually, the first part of curve represents the solubility of sodium sulphate decahydrate, Na<Sub c="2" />SO<Sub c="4" />·10H<Sub c="2" />O, the solubility of which increases with rise in temperature. The second part of the curve represents the solubility of anhydrous sodium sulphate, Na<Sub c="2" />SO<Sub c="4" />, the solubility of which decreases with increase in temperature. The temperature at which the two parts of the curve meet, i.e., (305·3 K) represents the transition temperature between the decahydrate sodium sulphate and sodium sulphate anhydrous.</P2>
          <MathBlock>Na<Sub c="2" />SO<Sub c="4" />·10H<Sub c="2" />O <Eq /> Na<Sub c="2" />SO<Sub c="4" /> + 10H<Sub c="2" />O (at 305·3 K) &nbsp;&nbsp; [Decahydrate ⇌ Anhydrous]</MathBlock>
          <MiniHd>Effect of temperature on Solubility</MiniHd>
          <P2 indent>The effect of temperature on solubility can be explained on the basis of Le Chatelier's principle.</P2>
          <P2 indent>Since in most cases, the solution of a solute in water is an endothermic process, i.e., cooling occurs when a substance dissolves.</P2>
          <MathBlock>Solute + H<Sub c="2" />O <Eq /> Solution; ΔH = +ve</MathBlock>
          <P2 indent>Therefore, in accordance with Le Chatelier's principle, if temperature increases, the equilibrium shifts in that direction which produces cooling, i.e., in the direction in which ΔH is +ve. As a result, more of the solute dissolves as the temperature rises.</P2>
          <P2 indent>There are only a few substances such as Na<Sub c="2" />SO<Sub c="4" />, Na<Sub c="2" />CO<Sub c="3" />·H<Sub c="2" />O, CaO, Ce<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" /> which evolve heat when they dissolve in water. Therefore, in accordance with Le Chatelier's principle, their solubilities decrease with rise in temperature.</P2>

          {/* 1.5 Suspension */}
          <SecHd id="s15" label="1.5" title="What is a Suspension?" />
          <P2 indent>When an insoluble substance such as chalk powder, wheat flour or mud is added to water and the mixture stirred, we get a suspension in which the solids are dispersed in liquids. Thus,</P2>
          <DefBox>A suspension is a heterogeneous mixture in which the solute particles do not dissolve but remain suspended throughout the bulk of the medium</DefBox>
          <P2 indent>The particles of a suspension are visible to the naked eye.</P2>
          <P2 indent>A few more examples of suspensions are given below :</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>Paints are suspensions of coloured substances is water or some other liquid.</li>
            <li>Milk of magnesia is a suspension of magnesium hydroxide in water.</li>
            <li>Lime water (used for white wash) is a suspension of calcium hydroxide in water.</li>
            <li>Bleaching powder in water is also a suspension since bleaching powder is insoluble in water.</li>
          </ol>
          <P2 indent>Please note that suspensions are formed by only those substances which are insoluble in water.</P2>
          <P2 indent>These suspended particles, however, settle as a precipitate when the suspension is left undisturbed for sometime.</P2>

          <SubHd id="s151" label="1.5.1" title="Properties of a Suspension" />
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>A suspension is a heterogeneous mixture.</li>
            <li>The solid particles of a suspension are so large in size (more than 10<Sup c="−5" /> cm or 10<Sup c="−7" /> m or 100 nm) that they are visible to the naked eye.</li>
            <li>The particles of a suspension scatter a beam of light passing through it and makes its path visible.</li>
            <li>The solid particles of a suspension settle down when it is allowed to stand undisturbed for sometime. In other words, a suspension is unstable.
              <br/><br/>For example, when carbon dioxide is passed through lime water taken in a test-tube, it turns milky. This is due to the reason that lime water contains calcium hydroxide which reacts with carbon dioxide to form insoluble calcium carbonate and water.
              <MathBlock>Ca(OH)<Sub c="2" /> + CO<Sub c="2" /> <Arrow /> CaCO<Sub c="3" />↓ + H<Sub c="2" />O</MathBlock>
              The solution turns milky due to the formation of a suspension of calcium carbonate in water. When this solution is allowed to stand undisturbed for sometime, the particles of the suspension settle at the bottom of the tube as a precipitate.
            </li>
            <li>The particles of a suspension cannot pass through a filter paper. Thus, when a suspension is filtered, the solid particles remain as a residue on the filter paper.</li>
            <li>Suspensions are either opaque or translucent.</li>
          </ol>
        </Page>

        {/* ══════════════════ PAGE 5 ══════════════════ */}
        <Page>
          {/* 1.6 Colloidal Solutions */}
          <SecHd id="s16" label="1.6" title="What is a Colloidal Solution?" />
          <P2 indent>We have discussed above that there are certain substances like common salt, sugar, copper sulphate, etc. which dissolve in water to form true solutions. The solute particles of a true solution are very small having diameters less than 1 nm (10<Sup c="−9" /> m) and hence are invisible to the naked eye or even under a microscope. On the other hand, there are certain substances like chalk powder, calcium oxide (lime), bleaching powder, etc. which are insoluble in water. These substances when stirred with water form suspensions. The solid particles of a suspension are quite large having diameters greater than 100 nm and hence are clearly visible to the naked eye. In between these two categories of substances, there is a third category of substances which dissolve in water or any other liquid to form a mixture in which the size (diameter) of the particles, (i.e., 1–100 nm) lies in between those and a true solution and a suspension (Fig. 1.2). Such mixtures are called colloidal solutions. Thus colloidal solutions may be defined as follows :</P2>
          <DefBox>Solutions in which the size of the particles lies in between those of true solutions and suspensions are called colloidal solutions or simply colloids</DefBox>
          <P2 indent>Due to relatively smaller size of particles, these mixtures appear to be homogeneous but actually they are heterogeneous. Since the colloidal solutions are heterogeneous in nature, therefore, to distinguish them from true solutions, the term "sol" is used in place of solution. The particles of the colloidal sol are called colloidal particles.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_BE148CFAE49C28F5F95D}
            alt="Particle sizes of a true solution, a colloidal solution and a suspension"
            caption="Fig. 1.2. Particle sizes of a true solution, a colloidal solution and a suspension"
            width="70%"
          />

          <SubHd id="s161" label="1.6.1" title="Dispersed Phase and Dispersion Medium" />
          <P2 indent>We have stated above that colloidal solutions are heterogeneous mixtures. This means that the constituents or components of a colloidal solution are not present in one single phase, but are actually present in two separate phases. These are called the dispersed phase and the dispersion medium. The solute-like component which has been dispersed or distributed throughout in a solvent-like medium is called the dispersed phase or the discontinuous phase while the solvent like medium in which the dispersed phase has been distributed or dispersed is called the dispersion medium or the continuous phase. The heterogeneous system thus obtained is called the colloidal system or the colloidal dispersion.</P2>
          <P2 indent>It may be noted here that the dispersed phase in a colloidal solution is comparable to solute particles in a true solution. Similarly, the dispersion medium is comparable to a solvent. However, there is one important difference between the true solution and the colloidal solution. In true solution, the solute and the solvent are present in one single phase but in colloidal solutions, they are present in two separate phases.</P2>

          <SubHd id="s162" label="1.6.2" title="Types of Colloids/Colloidal Systems/Colloidal Dispersions" />
          <P2 indent>Just as in true solutions, both the solute and solvent can exist in any one of the three states of matter (solid, liquid or gas) in the same way, in colloidal solutions also, both the dispersed phase and the dispersion medium can be a solid, liquid or a gas. Thus, nine different types of colloidal solutions should have been possible. But actually there are eight and not nine because gases always mix together to form homogeneous mixtures. Some common examples of colloids are given in Table 1.2.</P2>
          <ColloidTypesTable />

          <SubHd id="s163" label="1.6.3" title="Emulsions" />
          <P2 indent>Colloidal sols in which both the dispersed phase and the dispersion medium are liquids are called emulsions.</P2>
          <P2 indent>The two liquids which form an emulsion are immiscible with each other. One of these liquids is usually water and the other liquid which is insoluble in water is called the oil. These emulsions are of two types:</P2>
          <P2>(i) <strong>Oil-in-water emulsions.</strong> In these emulsions, oil is the dispersed phase and water is the dispersion medium.</P2>
          <P2>(ii) <strong>Water-in-oil emulsions.</strong> In these emulsions, water is the dispersed phase and oil is the dispersion medium.</P2>
          <P2 indent>These emulsions are usually prepared by shaking oil and water vigorously. However, these emulsions of two pure liquids are usually not stable. To make them stable, small amounts of certain other substances are added during their preparation.</P2>
          <P2 indent>The substances which are added to stabilize emulsions are called emulsifiers or emulsifying agents. These stabilize the sols by reducing the surface tension of water.</P2>
          <P2 indent>The substances which are commonly used as emulsifying agents are soaps, proteins, gums, etc. For example, milk is oil-in-water type emulsion, in which liquid fat is dispersed in water and milk protein lactalbumin is the emulsifying agent.</P2>
        </Page>

        {/* ══════════════════ PAGE 6 ══════════════════ */}
        <Page>
          <SubHd id="s164" label="1.6.4" title="Properties of Colloids" />
          <P2 indent>Some important properties of colloids are given below :</P2>
          <P2><strong>1. Heterogeneous nature.</strong> A colloidal solution is heterogeneous in nature consisting of two phases called the dispersed phase (discontinuous phase) and the dispersion medium (continuous phase).</P2>
          <P2><strong>2. Size of particles.</strong> The size (diameter) of the colloidal particles lies in the range 1–100 nm (10<Sup c="−7" />–10<Sup c="−5" /> cm), i.e., in between those of true solutions and suspensions.</P2>
          <P2><strong>3. Filtrability.</strong> Colloidal particles pass through ordinary filter paper. Hence, the colloidal particles cannot be separated from the dispersion medium by filtration. However, colloidal particles cannot pass through semipermeable<FootNote>A semipermeable membrane is a membrane which allows the passage of small particles of a true solution but does not allow the passage of bigger colloidal particles.</FootNote> membranes. A special technique which is presently used to separate colloidal particles is centrifugation.</P2>
          <P2><strong>4. Stability.</strong> Colloidal sols are quite stable, i.e., colloidal particles do not settle when left undisturbed.</P2>
          <P2><strong>5. Visibility.</strong> Colloidal particles are not visible to the naked eye. However, in some cases, they are visible under ultramicroscope.</P2>
          <P2><strong>6. Brownian movement.</strong> When colloidal particles are placed under an ultramicroscope, they are seen to be continuously moving in a zig-zag path (Fig. 1.3). Such a movement of pollen grains suspended in water was first time observed by Robert Brown, an English scientist in 1928 and hence is called Brownian movement after his name. Thus,</P2>
          <DefBox>Brownian movement may be defined as continuous zig-zag movement of colloidal particles in a colloidal sol.</DefBox>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_AB2D779877F9022B42E3}
            alt="Brownian movement"
            caption="Fig. 1.3. Brownian movement"
            width="30%"
          />

          <P2 indent>Other examples of Brownian movement are : (i) dust particles floating in air. (ii) Spread of perfume in a room.</P2>
          <P2><strong>Cause.</strong> It is believed that Brownian movement arises due to hitting of the colloidal particles by the particles of the dispersion medium from different directions with different forces.</P2>
          <P2><strong>7. Tyndall effect.</strong> The colloidal particles are big enough to scatter light passing through it. As a result, the path of light becomes visible. This scattering of a beam of light by colloidal particles is called the Tyndall effect after the name of the scientist who discovered it.</P2>
          <P2 indent>When the beam of light from a torch is passed through a true solution of copper sulphate, Tyndall effect is not observed, i.e., the path of light is not visible (Fig. 1.4). However, when the same light is passed through a mixture of water and milk, Tyndall effect is observed and the path of light becomes visible. The reason for this observation is that the particles of a true solution are so small that they do not scatter light and hence the path of light is not visible, i.e., Tyndall effect is not observed. In contrast, the particles of a colloidal solution are big enough to scatter light and hence path of light becomes visible, i.e., the Tyndall effect is observed.</P2>
          <P2 indent>Thus, Tyndall effect can be used to distinguish between a true solution and a colloidal solution.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_CB5F1A63689AB385DFB9}
            alt="Tyndall effect"
            caption="Fig. 1.4. (a) Solution of copper sulphate does not show Tyndall effect (b) Mixture of water and milk shows Tyndall effect"
            width="75%"
          />

          <MiniHd>Examples of Tyndall Effect.</MiniHd>
          <P2>(i) A well known example of Tyndall effect observed in our home is when a beam of sunlight enters the dark room through some hole in the window or the ventilator. The path of light becomes visible due to scattering of light by the colloidal dust particles present in the air of the room.</P2>
          <P2>(ii) Tyndall effect is observed when the sunlight passes through the canopy of a dense forest. This is due to scattering of light by the colloidal particles of the mist (i.e., tiny droplets of water dispersed in air).</P2>
          <P2>(iii) The phenomenon of Tyndall effect is also observed when a beam of light from a projector is thrown on the screen in a cinema hall. The path of light becomes visible due to scattering of light by the colloidal dust particles present in the air of the cinema hall.</P2>
          <P2>(iv) Another example of Tyndall effect is that sky looks blue due to scattering of light by colloidal dust particles present in the air. Similarly, sea water looks blue due to scattering of light by the colloidal impurities present in the sea water.</P2>
          <P2><strong>8. Colloidal particles carry charge.</strong> All the colloidal particles of a particular colloidal sol carry the same charge which may be either positive or negative while the dispersion medium has an equal and opposite charge. Since like charges repel each other, therefore, when a colloidal sol is left undisturbed, the similarly charged colloidal particles do not come close and thus remain dispersed in the sol. In other words, the particles of the colloidal do not settle down unlike the particles of a suspension and hence the colloidal sols are quite stable.</P2>
          <P2 indent>The nature of charge whether positive or negative on any colloidal sol can be determined by dipping two electrodes and connecting them to a battery. Under the influence of the electrical field, the particles of the colloid move towards the oppositely charged electrodes. On reaching the electrode, they lose their charge and combine together to form big particles which ultimately settle down. This phenomenon is called coagulation.</P2>
          <P2 indent>The movement of colloidal particles towards one of the electrodes under the influence of an electric field is called electrophoresis. Using this technique, the charge on colloidal particles can be determined. For example,</P2>
          <P2>(i) <strong>Positively charged sols.</strong> Haemoglobin and hydroxides of metals like iron, aluminium, chromium, calcium, etc.</P2>
          <P2>(ii) <strong>Negatively charged sols.</strong> Colloidal particles of metals like copper, silver, gold, etc.; metal sulphides like arsenic sulphide, cadmium sulphide, etc.; gelatin, starch, clay, mud, etc.</P2>
          <P2><strong>9. Coagulation</strong></P2>
          <DefBox>The process by which small colloidal particles lose their charge and combine together to form big sized particles which ultimately settle down is called coagulation.</DefBox>
          <P2 indent>The coagulation is generally carried out by addition of electrolytes<FootNote>An electrolyte is a substance which on dissolving in water produces ions.</FootNote> like sodium chloride, barium chloride, alum, etc. When an electrolyte<FootNote>Electrolytes provide ions of opposite charge that neutralize colloidal particles and cause them to aggregate.</FootNote> is added to a colloidal solution, the particles of the sol combine with oppositively charged ions and thus get neutralized. The neutral particles then start combining together to form particles of larger size which settle down. For example, bleeding from a cut can be immediately stopped by applying alum or ferric chloride. The reason being that the colloidal blood particles are negatively charged and hence get coagulated by positively charged ferric ions present in ferric chloride or positively charged aluminium ions present in alum. As a result of this coagulation, bleeding stops.</P2>
          <P2 indent>Please note that according to Hardy-Schulze law, higher the valency of the cation, higher is its coagulating power. Thus, coagulating power increases in the order : sodium chloride &lt; barium chloride &lt; alum, etc.</P2>
          <P2 indent>Similarly, muddy water can be purified by adding alum. The reason being that muddy water contains negatively charged clay particles. These are neutralized by positively charged aluminium ions and settle down. The pure water can then be obtained by decantation.</P2>
        </Page>

        {/* ══════════════════ PAGE 7 ══════════════════ */}
        <Page>
          <SubHd id="s165" label="1.6.5" title="Applications of Colloids in Everyday Life" />
          <P2 indent>There are number of colloidal systems (Table 1.2) that we come across in our everyday life. For example, fog, cloud, milk, gemstone, etc. Besides these, colloids have a number of other applications.</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li><strong>Medicines.</strong> Many medicines which are insoluble in water are given to the patients in form of colloidal dispersions. Medicines in the colloidal form are easily absorbed by the body tissues and hence are more effective.</li>
            <li><strong>Cleansing action of soap.</strong> Soap is a colloidal solution which is used in removing greasy or oily material sticking to the clothes or utensils.</li>
            <li><strong>Smoke precipitator.</strong> Smoke is a colloidal dispersion of carbon particles in air. Since carbon particles carry charge, they can be coagulated by applying electric field. As a result, pollution of air by the smoke coming out of the chimneys of industries can be prevented.</li>
            <li><strong>Sewage disposal.</strong> Sewage water contains colloidal particles of dirt, mud, etc. Since these colloidal particles carry charge, they can be coagulated by applying electric field. Thus, sewage water can be purified and the dirt thus obtained is used as a manure.</li>
            <li><strong>Production of rubber.</strong> Latex is a colloidal solution of negatively charged rubber particles in water. It is a white milky liquid obtained from rubber trees. Rubber is obtained from latex by coagulation with acetic acid which provides positively charged H<Sup c="+" /> ions to neutralize the negative charge of latex particles.</li>
          </ol>

          <SubHd id="s166" label="1.6.6" title="Comparison of characteristics of True Solution, Colloidal Solution and Suspension" />
          <P2 indent>The main points of difference between true solution, colloidal solution and suspensions are given below :</P2>
          <ComparisonTable />

          {/* Activity 1.2 */}
          <ActivityBox title="ACTIVITY 1.2">
            <P2><em>(To illustrate the difference between true solution suspension and colloidal solution, carry out the following activity)</em></P2>
            <MiniHd>Experimental Details of Activity.</MiniHd>
            <ul style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Divide the class into four groups, A, B, C and D.</li>
              <li>Distribute the following samples to each group:
                <ul style={{ margin:"4px 0 4px 20px" }}>
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
            <MiniHd>Observations.</MiniHd>
            <P2><strong>1. Groups A and B</strong></P2>
            <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Groups A and B both have got true solutions. However, the intensity of the blue colour of the solution obtained by group A which contains only a few crystals of copper sulphate is lower than that of the solution obtained by group B which contains one spatula full of copper sulphate. Thus, the intensity of colour depends upon the amount of substance dissolved.</li>
              <li>In both these solutions, particles are not visible to the naked eye.</li>
              <li>When the beam of light is passed through solution obtained by group A or group B, the path of the beam of light was not visible. Thus, the particles of a true solution do not scatter light.</li>
              <li>When the above solution is allowed to stand, the solution is stable and the particles of the solution do not settle down. Further, when the above solution is allowed to filter, the whole solution passes through the pores of the filter paper without leaving any residue on the filter paper.</li>
            </ol>
            <P2><em>Thus, the particles of a true solution neither settle down on standing nor leave any residue when passed through a filter paper.</em></P2>
            <P2><strong>2. Group C.</strong></P2>
            <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Group C has obtained a suspension.</li>
              <li>The particles of a suspension scatter light and hence the particles are visible to the naked eye.</li>
              <li>When the above suspension is allowed to stand, it is not stable and the particles of the suspension settle down.</li>
              <li>When the above suspension is filtered, the particles of the chalk or wheat flour being bigger in size than the pores of the filter paper remain as residue on the filter paper.</li>
            </ol>
            <P2><strong>3. Group D</strong></P2>
            <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>The group D has obtained a colloidal solution.</li>
              <li>When the above solution is allowed to stand, the particles of the colloidal solution like those of the true solution do not settle down.</li>
              <li>Since the particles of a colloidal solution are 100 times bigger than those of the true solution, therefore, when a beam of light is passed through a colloidal solution, the particles of the colloidal solution scatter light and hence the path of the beam becomes visible.</li>
              <li>When the colloidal solution is passed through a filter paper, the particles of the colloidal solution like those of the true solution pass through the filter paper without leaving any residue on the filter paper.</li>
            </ol>
            <MiniHd>Conclusion.</MiniHd>
            <ol style={{ margin:"6px 0 6px 20px",lineHeight:1.65 }}>
              <li>The particles of a true solution are not visible even under a microscope. They do not settle down on standing and pass through the pores of the filter papers without leaving any residue.</li>
              <li>The particles of a suspension are visible to the naked eye. They settle down on standing and leave a residue on the filter paper.</li>
              <li>The particles of a colloidal solution scatter light and hence the path of light beam becomes visible when a beam of light is passed through it. The colloidal solution is stable and hence the particles of the colloidal solution do not immediately settle down on standing. They also pass through the pores of a filter paper.</li>
            </ol>
          </ActivityBox>
        </Page>

        {/* ══════════════════ PAGE 8 – Concentration ══════════════════ */}
        <Page>
          <SecHd id="s17" label="1.7" title="Various Ways to Express Concentration of Solution" />
          <P2 indent>To understand the meaning of concentration of a solution, let us take two beakers and label them as A and B. Place 50 mL of water in each one of them. Dissolve a few crystals of copper sulphate in beaker A and one full spatula of copper sulphate in beaker B. Stir well to obtain a clear transparent solution. Repeat the above experiment by taking 100 mL of water in each beaker. You will observe that the four beakers have different shades of blue colour. Thus, we conclude that in a solution, the relative amounts of the solute and the solvent can be varied. Depending upon the amount of solute present in a solution, it can be called a dilute, concentrated, or saturated solution. Dilute and concentrated are relative terms. Solution obtained in beaker A is dilute as compared to that obtained in beaker B.</P2>
          <P2 indent>However, in scientific terms, the concentration of a solution may be defined as the amount of solute present in a given amount (mass or volume) of solution or the amount of solute dissolved in a given mass or volume of a solvent. Thus,</P2>
          <MathBlock>Concentration of solution = <Frac n="Amount of solute" d="Amount of solution" /></MathBlock>
          <P2>or</P2>
          <MathBlock>Concentration of solution = <Frac n="Amount of solute" d="Amount of solvent" /></MathBlock>
          <P2 indent>There are various ways of expressing the concentration of a solution, but here, we shall discuss only some of the more common methods. Depending upon the type of solution whether solid in liquid or liquid in liquid, these methods are divided into the following two categories:</P2>
          <P2><strong>1. Solid in liquid solutions.</strong> If a solution is prepared by dissolving a solid solute in a liquid solvent, the concentration of the solution may be expressed either in mass by mass percentage or mass by volume percentage.</P2>
          <P2>(i) <strong>Mass by mass percentage</strong> or simply mass percentage. It is defined as follows :</P2>
          <DefBox>The mass of the solute in grams dissolved in 100 grams of the solution.</DefBox>
          <P2 indent>For example, a 10 percent solution of common salt means 10 grams of common salt are present in 100 grams of the solution. Please note here that 100 grams of the solution also include 10 grams of common salt. In other words, 100 grams of common salt solution contain 100 – 10 = 90 grams of water. Thus, a 10 percent mass by mass percentage solution of common salt can be prepared by dissolving 10 grams of common salt in 90 grams of water so that the total mass of the solution becomes 100 grams. It may be further noted that concentration of a solution refers to the mass of the solute in 100 grams of the solution and not in 100 grams of the solvent. The mass by mass percentage of a solution may also be calculated by using the following formula,</P2>
          <MathBlock>Mass by mass percentage = <Frac n="Mass of solute" d="Mass of solution" /> × 100 = <Frac n="Mass of solute" d="(Mass of solute + Mass of solvent)" /> × 100.</MathBlock>
          <P2>(ii) <strong>Mass by volume percentage.</strong> It is defined as follows :</P2>
          <DefBox>The mass of the solute in grams dissolved in 100 millilitres or 100 mL of the solution.</DefBox>
          <P2 indent>For example, a 10 percent mass by volume solution of common salt in water means that 10 grams of common salt are present in 100 mL of the solution. In other words, a 10 percent mass by volume solution of common salt is prepared by first completely dissolving 10 grams of common salt in a small amount of water and then finally making the volume to 100 mL. The mass by volume percentage of a solution can also be calculated by using the following formula.</P2>
          <MathBlock>Mass by volume percentage = <Frac n="Mass of solute" d="Volume of solution" /> × 100</MathBlock>
          <MiniHd>Concentration of very dilute solutions</MiniHd>
          <P2 indent>If a very small amount of a solute is dissolved in a large excess of the solvent, the values of mass by mass and mass by volume percentages will be very low. In order to increase their values, the concentration is expressed in parts per million or simply as ppm. It may be defined as follows</P2>
          <DefBox>The number of parts by mass (or volume) of solute per million parts by mass (or volume) of the solution.</DefBox>
          <MathBlock>ppm = <Frac n="Mass of solute" d="Mass of solution" /> × 10<Sup c="6" /> &nbsp;&nbsp; or &nbsp;&nbsp; <Frac n="Volume of solute" d="Volume of solution" /> × 10<Sup c="6" /></MathBlock>
          <P2 indent>The concentration of poisonous gases such as nitric oxide (NO), nitrogen dioxide (NO<Sub c="2" />), sulphur dioxide (SO<Sub c="2" />), etc. in the atmosphere is expressed in ppm. For example, if the concentration of sulphur dioxide (SO<Sub c="2" />) in air is 10 ppm, this means that 10 parts by volume of sulphur dioxide are present in 10<Sup c="6" /> parts by volume of air.</P2>
          <P2><strong>2. Liquid in liquid solutions.</strong> If a solution is prepared by dissolving a liquid solute in a liquid solvent, the concentration of the solution is usually expressed in volume by volume percentage or simply volume percentage of the solution. It is defined as follows :</P2>
          <DefBox>The volume of the solute in millions dissolved in 100 millions or 100 mL of the solution.</DefBox>
          <P2 indent>For example, a 20 percent solution of alcohol in water means 20 mL of alcohol are dissolved in 100 mL of the solution, note that 100 mL of the solution also include 20 mL of alcohol. This means, 100 mL of alcohol solution contains 100–20 = 80 mL of water in it. In other words, we can prepare a 20 percent volume by volume solution of alcohol in water by mixing 20 mL of alcohol and 80 mL of water so that the total volume of the solution becomes 20 + 80 = 100 mL. It may be noted here that the concentration of the solution refers to the volume of the liquid solute in 100 mL of the solution and not the solvent.</P2>
          <MathBlock>Volume by volume percentage = <Frac n="Volume of solute in mL" d="Volume of solution in mL" /> × 100.</MathBlock>
          <P2 indent>In most of the commercial products such as solutions of medicines, syrups, etc., the concentration of the liquid medicine is expressed in terms of volume by volume percentage and is denoted by the symbol v/v. However, the concentration of the solid medicine is expressed either in terms of weight by weight percentage (denoted by symbol w/v) or by weight by volume percentage (denoted by the symbol w/v). Please note that here the term weight has been used in place of mass. For example, a popular brand of antacid syrup, Gelusil contains about 5% w/w of magnesium hydroxide and 5% w/w of aluminium hydroxide besides other medicines.</P2>
          <P2 indent>Please note that if for a solution, the terms like w/w, w/v, v/v are not mentioned, it is always taken as w/w.</P2>

          {/* Numerical Problems */}
          <div style={{ display:"flex",gap:16,alignItems:"flex-start",margin:"20px 0" }}>
            <NumericalBadge topic1="NUMERICAL" topic2="PROBLEMS" />
            <div style={{ flex:1 }}>
              <P2><strong>Example 1.</strong> A solution contains 40 g of common salt in 320 g of water. Calculate the concentration in terms of mass by mass percentage of the solution.</P2>
              <P2><em>Solution.</em> Mass of common salt (solute) = 40 g; Mass of water (solvent) = 320 g</P2>
              <MathBlock>∴ Mass of the solution = Mass of the solute + Mass of the solvent = 40 + 320 = 360 g</MathBlock>
              <MathBlock>Thus, mass by mass percentage = <Frac n="40" d="360" /> × 100 = <strong>11·1%</strong></MathBlock>

              <P2><strong>Example 2.</strong> Calculate the mass of glucose and mass of water required to make 250 g of 25% solution of glucose.</P2>
              <P2><em>Solution.</em></P2>
              <MathBlock>25 = <Frac n="Mass of glucose" d="250 g" /> × 100 &nbsp;&nbsp;⟹&nbsp;&nbsp; Mass of glucose = <Frac n="25 × 250 g" d="100" /> = <strong>62·5 g</strong></MathBlock>
              <MathBlock>Mass of water = 250 − 62·5 = <strong>187·5 g</strong></MathBlock>

              <P2><strong>Example 3.</strong> A solution contains 5 mL of alcohol in 70 mL of water. Calculate the volume by volume percentage of the solution.</P2>
              <P2><em>Solution.</em> Volume of alcohol = 5 mL; Volume of water = 70 mL; Volume of solution = 5 + 70 = 75 mL</P2>
              <MathBlock>Volume by volume percentage = <Frac n="5" d="75" /> × 100 = <strong>6·66%</strong></MathBlock>

              <P2><strong>Example 4.</strong> Find out the mass by volume percentage of 15% solution of sulphuric acid (density = 1·02 g mL<Sup c="−1" />).</P2>
              <P2><em>Solution.</em> 15% solution of H<Sub c="2" />SO<Sub c="4" /> means 15 g of H<Sub c="2" />SO<Sub c="4" /> are present in 100 g of the solution.</P2>
              <MathBlock>Volume of the solution = <Frac n="Mass" d="Density" /> = <Frac n="100 g" d="1·02 g mL⁻¹" /> = 98·04 mL</MathBlock>
              <MathBlock>Mass by volume percentage = <Frac n="15" d="98·04" /> × 100 = <strong>15·3%</strong></MathBlock>

              <P2><strong>Example 5.</strong> 2·5 g of a solute are dissolved in 25 g of water to form a saturated solution at 298 K. Find out the solubility of the solute at this temperature.</P2>
              <MathBlock>Solubility = <Frac n="Mass of the solute" d="Mass of the solvent" /> × 100 = <Frac n="2·5" d="25" /> × 100 = <strong>10 g</strong></MathBlock>
            </div>
          </div>

          <ProblemsBox>
            <ol style={{ margin:"4px 0",lineHeight:1.65,paddingLeft:20 }}>
              <li>15 g of common salt are dissolved in water. The solution was found to weigh 115 g. Calculate the mass by mass percentage of common salt in the solution. <strong>[Ans. 13·04%]</strong></li>
              <li>A solution is prepared by dissolving 5 g of urea in 95 g of water. What is the mass by mass percentage of urea in the solution? <strong>[Ans. 5%]</strong></li>
              <li>Calculate the masses of cane sugar and water required to prepare 200 g of 15% mass by mass solution of cane sugar in water. <strong>[Ans. Mass of cane sugar = 30 g, mass of water = 170 g]</strong></li>
              <li>It is desired to prepare 500 g of 10% mass by mass percentage of urea in water. How much urea should be dissolved in how much volume of water? Density of water is 1 g mL<Sup c="−1" />. <strong>[Ans. urea = 50 g, volume of water = 450 mL]</strong></li>
              <li>15 mL of ethyl alcohol is mixed with 60 mL of gasoline. Calculate the volume by volume percentage of the solution. <strong>[Ans. 20%]</strong></li>
              <li>What volume of alcohol and what volume of water must be mixed together to prepare 250 mL of 60% volume by volume solution of alcohol in water? <strong>[Ans. Alcohol = 150 mL, water = 100 mL]</strong></li>
              <li>3 g of a solute are dissolved in 30 g of water to form a saturated solution at 298 K. Calculate the solubility of the solute at this temperature. <strong>[Ans. 10 g]</strong></li>
              <li>(a) What mass of potassium chloride would be needed to form a saturated solution in 50 g of water at 313 K? Given the solubility of the salt = 40 g/100 g of water at this temperature. (b) What will happen if the solution at this temperature is cooled? <strong>[Ans. (a) 20 g, (b) excess of solute will crystallise out]</strong></li>
              <li>Calculate the percentage composition in terms of mass of a solution obtained by mixing 300 g of 25% and 400 g of a 40% solution by mass. <strong>[Ans. solute = 33·57%, water = 66·43%]</strong></li>
              <li>Calculate the mass of sulphuric acid present in 100 mL of 15% mass by mass solution of sulphuric acid. (density = 1·10 g/mL) <strong>[Ans. 16·5 g]</strong><br/>
                [Hint. 100/1·1 mL of solution contain sulphuric acid = 15 g<br/>
                ∴ 100 mL of the solution will contain sulphuric acid = <Frac n="15 × 1·1" d="100" /> × 100 g = 16·5 g]</li>
              <li>How many litres of a 5·0% (w/v) glucose solution would you take to obtain 75 g glucose. <strong>[Ans. 1·5 L]</strong></li>
            </ol>
          </ProblemsBox>
        </Page>

        {/* ══════════════════ PAGE 9 – Separation Techniques ══════════════════ */}
        <Page>
          <SecHd id="s18" label="1.8" title="Separation Techniques" />
          <P2><strong>I. Separation Techniques with practices observed in the Local Environment</strong></P2>
          <P2 indent>Some of the common methods of separating substances or mixtures used in local environment are :</P2>
          <P2><strong>1. Hand Picking.</strong> This method involves simply picking out all the unwanted substances from useful ones. If the mixture consists of particles having different shapes then hand picking can be carried out with a microscope. This method was used by great French scientist Louis Pasteur who separated the crystals of enantiomers of sodium ammonium tartrate laying the formation of chirality and optical isomerism in organic chemistry.</P2>
          <P2><strong>2. Threshing.</strong> This method is mostly used to separate grains from straw or chaff. The dried wheat stalks (bundles) are beaten on a large wooden log when grains fall apart from the straw or chaff.</P2>
          <P2><strong>3. Winnowing.</strong> When the grains are collected from threshing. It needs to be separates from husk or chaff before it is converted into flour. Normally the separation is carried out with the help of wind or blowing air.</P2>
          <P2 indent>The technological development have resulted in development of threshing machines called threshers. These machines are used for separating grains from the stalks and husk. They perform both the talks of Threshing and Winnowing simultaneously.</P2>
          <P2><strong>4. Sieving.</strong> This method is used to separate mixtures that contain substances mostly of different sizes. The mixtures is passed through the pores of the sieve. All the smaller substances pass through easily while the larger components of the mixture are retained.</P2>
          <P2 indent>For example, when wheat is converted into fluor, it contains some bran. The mixture is passed through a sieve when flour particles being smaller pass through the sieve while bran remains in the sieve.</P2>
          <P2><strong>5. Evaporation.</strong> This method is used to separate non-volatile components (solutes) dissolved in volatile solvent. For example, blue (or black) ink is a homogeneous mixture of blue or black dye (solute) in water (solvent). The components of this mixture can be separated by the process of evaporation.</P2>
          <P2 indent>Put a few drops of blue (or black) ink on a watch glass and place it on a beaker half full of water as shown in Fig. 1.5. The water in the beaker is heated and the steam thus formed will, in turn, heat up the ink. The water present in the ink will evaporate and ultimately a blue (or black) residue will be left on the watch glass.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_A3A0EA2809855A6AC4BA}
            alt="Evaporation setup"
            caption="Fig. 1.5. Evaporation"
            width="35%"
          />

          <P2 indent>It may be noted here that direct heating of ink is avoided because the blue (or black) dye may decompose on direct heating.</P2>
          <P2 indent>This method has also been used on a commercial scale in India to obtain common salt from sea water (Kutch region in Gujarat) or lake (Sambhar lake in Rajasthan) containing common salt. Sea water is collected in open shallow beds during high tide and allowed to evaporate in the hot sun. The salt left behind is collected, purified in the factories and sold in the maket.</P2>
          <P2><strong>6. Filtration or Sedimentation.</strong> The most common method of separating an insoluble solid from a liquid in filtration.</P2>
          <P2 indent>For example, a mixture of sand and water can be separated by this method. The mixture is passed through a filter paper held in a funnel (Fig. 1.8) when water passes through the pores of the filter paper and sand remains on the filter paper.</P2>
          <P2 indent>Sedimentation is a process by which heavier/suspended impurities present in a liquid namely water settles down at the bottom of the container. This is actually the first step in the purification of water. The water from a reservoir (river or lake) is allowed to stand in a tank for sometime when heavier/suspended impurities settle down.</P2>
          <P2><strong>7. Decantation</strong> is a simple separation method that separates mixtures of an insoluble solid from a liquid or two immiscible liquids, by allowing the denser liquid to settle down at the bottom and then carefully pouring off the lighter liquid layer from the top into another container. This method often results in incomplete separation leaving some impurities behind.</P2>
          <MiniHd>Common Special Techniques used in Laboratory and Industry</MiniHd>
          <P2 indent>Compounds isolated from natural sources are seldom pure. They are generally mixed with other substances which also occur along with them. Similarly, the compounds prepared in the laboratory are also not pure since they are generally contaminated with other products that result from the side reactions.</P2>
          <P2 indent>In order to study the properties of individual substances, we need each component of the mixture in the pure state.</P2>
          <P2 indent>Some of the techniques, which are extensively used in laboratory and industry to separate the components of a mixture whether homogeneous or heterogeneous are described below :</P2>

          <SubHd id="s181" label="1.8.1" title="Separating Funnel" />
          <P2 indent>This is a better method than decantation for separating two immiscible liquids. For examples, kerosene oil and water do not mix. When these liquids are mixed, they form two separate layers. Such pairs of liquids which do not mix with each other are called immiscible liquids. These liquids form heterogeneous mixtures. The individual components of such heterogeneous mixtures can be separated by using a separating funnel. The technique is based upon the principle that when a mixture of two immiscible liquids is allowed to stand they separate out in two separate layers depending upon their densities. Let us separate a mixture of kerosene oil and water. Pour the mixture of kerosene oil and water in a separating funnel (Fig. 1.6).</P2>
          <P2 indent>The separating funnel is then allowed to stand for sometime when kerosene oil and water form two separate layers. The kerosene oil being lighter than water forms the upper layer while</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_D419880FDCF479FAE42A}
            alt="Separation of two immiscible liquids using separating funnel"
            caption="Fig. 1.6. Separation of two immiscible liquids"
            width="30%"
          />

          <P2 indent>water being heavier forms the lower layer. The boundary of separation of the two liquids is clearly visible. Now place a beaker below the funnel and open the stopcock. The lower layer of water is run out carefully. Close the stopcock of the separating funnel as soon as the oil layer reaches the stopcock. Now remove the beaker containing water and replace it by another beaker. Once again open the stock and pour out the upper kerosene oil layer.</P2>
          <P2><strong>I. Applications of solvent extraction.</strong></P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>This technique is used to separate a mixture of oil and water or mixtures of any two immiscible liquids like benzene and water, chloroform and water, ether and water, carbon tetrachloride and water, etc.</li>
            <li>To extract organic compounds present in aqueous solutions using a water immiscible organic solvent like chloroform, benzene, ether, carbon tetrachloride, petroleum ether, etc.</li>
            <li>In the blast furnace, during extraction of iron, two separate layers are formed. The upper layer consists of the molten slag (calcium silicate) while the lower layer consists of molten iron. The lighter slag is removed from the upper hole while the molten iron is removed from the bottom hole of the furnace.</li>
          </ol>
        </Page>

        {/* ══════════════════ PAGE 10 ══════════════════ */}
        <Page>
          <SubHd id="s182" label="1.8.2" title="Sublimation" />
          <P2 indent>We have discussed above that most of the substances around us change their state first from solid to liquid and then from liquid to gaseous state by absorption of heat. However, there are some substances known which on heating directly change their state from solid to gaseous and vice-versa on cooling without passing through the intervening liquid state. This process is called sublimation. Thus,</P2>
          <DefBox>Sublimation involves direct conversion of a solid into the gaseous state on heating and vice-versa on cooling without passing through the intervening liquid state.</DefBox>
          <P2 indent>Sublimation can be represented as</P2>
          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_B8125D21D4C16F2ED1FA}
            alt="Sublimation equation"
            caption=""
            width="25%"
          />
          <P2><strong>Theory.</strong> Only those substances whose vapour pressures become equal to the atmospheric pressure much before their respective melting points are capable of undergoing sublimation. For example, dry ice (solid carbon dioxide) sublimes at −78°C (195 K).</P2>
          <P2 indent>Examples of some other substances which undergo sublimation on heating are : ammonium chloride, camphor, naphthalene, anthracene, benzoic acid, iodine, etc.</P2>
          <P2 indent>Let us now demonstrate the process of sublimation by taking the example of ammonium chloride. Take some ammonium chloride. Powder it in a pestle and mortar and place it in a clean and dry china dish. Cover the china dish with a perforated filter paper. Place an inverted funnel on the filter paper as shown in Fig. 1.7. Close the stem of the funnel with a cotton plug.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_32F852B5DDA2172F50A1}
            alt="Sublimation of ammonium chloride"
            caption="Fig. 1.7. Sublimation of ammonium chloride"
            width="45%"
          />

          <P2 indent>On heating the china dish, the vapours of ammonium chloride rise up, pass through the holes in the filter paper, get cooled in the upper portion of the funnel and change into the solid form. The solid thus formed gets deposited on the inner walls of the funnel. When the experiment is over, the pure solid is scrapped from the inverted funnel with a spatula or a knife on a clean watch glass.</P2>
          <P2><strong>Applications of sublimation.</strong> (i) The process of sublimation is very useful in the purification of such solids which sublime on heating and contain non-volatile impurities. For example, when an impure sample of naphthalene containing non-volatile impurities is heated; naphthalene will form vapours which will get deposited on the upper cooler portion of the funnel while the non-volatile impurities remain in the dish.</P2>
          <P2>(ii) Separation of ammonium chloride or iodine from sodium chloride or sand.</P2>
          <P2>(iii) Purification of camphor or naphthalene.</P2>

          <SubHd id="s183" label="1.8.3" title="How can we obtain pure Copper Sulphate from an Impure sample? – Crystallisation" />
          <DefBox>Crystals are the purest form of a substance having definite geometrical shapes. The process by which an impure compound is converted into its crystals is known as crystallisation.</DefBox>
          <P2><strong>Theory.</strong> This is one of the most commonly used techniques for purification of inorganic/organic solids. This is based upon the principle that when a crystal is formed, it tends to exclude the impurities which remain in the solution. Let us explain the process of crystallization by taking the example of purification of impure copper sulphate.</P2>
          <P2 indent>Take about 5 g of impure copper sulphate and dissolve it in minimum amount of water in a china dish. The solution is then filtered to remove insoluble and suspended impurities. Thereafter, the filtrate is evaporated in a china dish so as to get a saturated solution. The hot saturated solution thus obtained is allowed to stand undisturbed for a few hours when crystals of pure copper sulphate separate out<FootNote>Sometimes crystals do not appear even after a long time in spite of the fact that solubility of the solute decreases as the temperature is reduced. This happens when the solution becomes supersaturated. Since supersaturated solutions are unstable, crystallization can be induced either by scratching the sides of the test-tube with a glass rod or by adding a small crystal of the pure substance (seeding) to the solution.</FootNote>. These crystals are separated by filtration through an ordinary funnel as shown in Fig. 1.8 and the filtrate left after the separation of crystals is called the mother liquor.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_89ADD791FC329F3A6768}
            alt="Filtration setup"
            caption="Fig. 1.8. Filtration — (a)(b) folding filter paper (c) forming cone (d) filtration"
            width="70%"
          />

          <P2 indent>A round filter paper is folded as shown in Fig. 1.8 (a) and (b) and then converted into a cone as shown in Fig. 1.8 (c). The filter paper cone is then fixed in the funnel and filtration is carried out as shown in Fig. 1.8 (d).</P2>
          <P2 indent>Sometimes the filtration process is very slow and takes a lot of time. In such cases, filtration is carried out under reduced pressure using a Buchner funnel and water suction pump as shown in Fig. 1.9.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_F5842D86436DFF0758F8}
            alt="Quick filtration using Buchner funnel"
            caption="Fig. 1.9. Quick filtration process using a Buchner funnel and a water suction pump"
            width="60%"
          />

          <MiniHd>Advantages of crystallisation over evaporation.</MiniHd>
          <P2 indent>Crystallisation is a better technique than evaporation to purify a solid because of the following reasons :</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>During evaporation, the solution is heated to dryness. During this heat treatment, some solids may decompose or some solids, like sugar, may get charred.</li>
            <li>Both for evaporation or crystallisation the solution of the impure solid is prepared in water or any other suitable solvent. This solution is then filtered to remove insoluble and suspended impurities. However, some soluble impurities may still be present even after filtration. Therefore, when such a solution is evaporated, the impurities get deposited along with the solid and thus contaminate the solid. In contrast, when the solution is allowed to stand for crystallization, crystals of the pure solid separate out leaving the impurities in the solution.</li>
          </ol>
          <MiniHd>Applications of crystallisation</MiniHd>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>The salt that we get from sea water contains a number of impurities. To remove these impurities, the process of crystallisation is used.</li>
            <li>Crystallisation can also be used to obtain pure alum (phitkari), nitre (potassium nitrate), etc. from impure samples.</li>
          </ol>
          <P2 indent>Some other examples are :</P2>
          <P2>(i) <strong>Crystallization of sugar.</strong> Suppose we have a sample of sugar containing an impurity of common salt (sodium chloride). This can be purified by shaking the impure solid with hot ethanol at 348 K. The sugar will dissolve whereas common salt remains insoluble. The hot solution is filtered, concentrated and then allowed to cool when crystals of sugar will separate out. Had water been used as a solvent, the purification of sugar would not have been possible since both sugar and common salt are readily soluble in water?</P2>
          <P2>(ii) <strong>Crystallization of benzoic acid.</strong> Suppose we have a mixture of benzoic acid and naphthalene. This mixture can be purified by treating the impure solid with hot water. Benzoic acid will dissolve while naphthalene remains insoluble. The crystals are separated by filtration and dried. Had benzene been used as a solvent, instead of water in this case, the purification of benzoic acid would not have been possible since both benzoic acid and naphthalene are quite soluble in benzene.</P2>
        </Page>

        {/* ══════════════════ PAGE 11 ══════════════════ */}
        <Page>
          <SubHd id="s184" label="1.8.4" title="How can we separate Cream from Milk? – Centrifugation" />
          <P2 indent>Sometimes, the solid particles in a liquid mixture are very small and thus easily pass through a filter paper. Therefore, such particles cannot be separated by filtration technique. However, such mixtures can be easily separated by the technique of centrifugation.</P2>
          <P2><strong>Theory.</strong> This technique is based upon the principle that when a mixture is rotated at a high speed, the lighter particles stay on the surface of the liquid while the heavier particles are forced to the bottom of the liquid.</P2>
          <P2 indent>For example, when milk is rotated at a high speed in a centrifugation machine. The lighter fat particles collide with each other to form cream which stays on the surface while the heavier particles of the milk are forced to come to the bottom. As a result, separation occurs and the cream is collected from the outlet provided near the top of the centrifugation machine while the milk is collected through an outlet provided near the bottom of the machine. By using the technique of centrifugation, different varieties of milk containing different amounts of cream such as full cream, toned and double toned varieties of milk are prepared. These are packed in polypacks or tetrapacks and then sold in the market.</P2>
          <P2 indent>Although a variety of electric centrifugation machines are available but for clarity and better understanding of the 9th grade students, a hand driven centrifugation technique is shown in Fig. 1.10.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_5836A191822623037FBA}
            alt="Hand driven centrifugation machine"
            caption="Fig. 1.10. Hand driven centrifugation machine"
            width="20%"
          />

          <P2 indent>The most important precaution while operating centrifugation machine is that each centrifugation tube containing the sample is balanced by an opposite centrifugation tube containing an equal amount of either the sample or water. This is needed to maintain stability during high speed rotation.</P2>

          <FeatureBox title="Making and Working of Paperfuge">
            <P2><strong>Introduction.</strong> It is a human powered centrifuge made from paper and string. It is capable of spinning at speeds up to 125,000 RPM. It was developed by research group of Manu Prakash, an Indian scientist, at Stanford University, USA. It is a 'frugal Science' tool for diagnosing diseases like malaria in areas without electricity.</P2>
            <P2><strong>Materials Needed.</strong> (i) Adhesive (Tape or glue), twine or strong string. (ii) Cardboard or thick paper and a strong string (about 3 feet long). (iii) A four whole shirt botton. (iv) Handles (PVC pipe). (v) Small tubes or vials for samples.</P2>
            <P2><strong>Step by step Assembly.</strong></P2>
            <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Cut two identical discs out of cardboard (approx. 2-4 inches in diameter).</li>
              <li>Tape and glue them together for thickness.</li>
              <li>Glue a 4-hole button in the centre of your paper disc.</li>
              <li>Ensure the button's holes align with the disc's centre.</li>
              <li>Pass your long string through two opposite holes in the button and repeat the process with the other string.</li>
              <li>Tie the ends of the string together to form a continuous loop with the paper disc in the middle.</li>
              <li>Take two sample tubes fill them with sample, seal them and fix them securely with tapes on the opposite sides of the disc. Ensure they are balanced on opposite sides to maintain stability during high-speed rotation. To make pulling easier, tie wooden handles to the ends of the string loops.</li>
            </ol>
            <P2><strong>How to operate?</strong></P2>
            <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Wind it up. Hold one end of the string loop in each hand. Give the disc a few initial spins to twist the string.</li>
              <li>Pull your hands apart quickly to unwind the string and spin the disc for 2-4 minutes.</li>
              <li>As the string finishes unwinding, it will automatically start rewinding in the opposite direction due to disc's momentum.</li>
              <li>Maintain speed. Move your hands in and out rhythmically – similar to playing with a whirligig toy to keep the disc spinning at high speeds.</li>
              <li>After the operation, detach the sample tubes carefully. You will see two layers. Carefully separate the two layers using a dropper.</li>
            </ol>
            <P2><strong>Precaution.</strong> (i) Ensure the two sample tubes are securely fixed in either face to maintain stability during high speed rotation. (ii) Attach wooden handles on either side of the string to make pulling easier and avoid hurting your fingers. (iii) Always use shatterproof eye protection while spinning the centrifuge, as components can detach at high speeds.</P2>
          </FeatureBox>

          <MiniHd>Applications of centrifugation.</MiniHd>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>The technique of centrifugation is used in diagonistic laboratories for blood and urine samples.</li>
            <li>It is used in dairies and homes to separate cream from milk.</li>
            <li>Centrifugation technique is also used in washing machines to squeeze out water from wet clothes.</li>
            <li>It is used in laboratories for DNA/protein extraction, for clarifying wines/juices, for waste water treatment and for separating solids from oils.</li>
            <li>Centrifugation can be used to separate the four components of blood based upon density. The heavier red blood cells (RBCs) stay at the bottom, followed by a thin 'buffy coat' of white blood cells (WBCs) and platelets in the middle and lighter plasma at the top.</li>
            <li>One of the most interesting and useful applications is in nuclear technology. Gas centrifuges machines are used to separate U-235 and U-238. For this purpose, uranium is first converted into UF<Sub c="6" />. The slight difference in mass of <Sup c="235" />UF<Sub c="6" /> and <Sup c="238" />UF<Sub c="6" /> is then separated by gas centrifuge machine when the lighter <Sup c="235" />UF<Sub c="6" /> (0·852%) lighter than <Sup c="238" />UF<Sub c="6" />. A series of identical stages produces successively higher concentration of <Sup c="235" />U. Each stage passes a slightly more concentrated product to the next stage and returns a slightly less concentrated residue to previous stage. This is how enrichment of U-235 is carried out.</li>
          </ol>

          <SubHd id="s185" label="1.8.5" title="Coagulation" />
          <P2 indent>Definition, theory and some examples of coagulation by addition of some chemical substances like alum and ferric chloride have already been discussed under article 1.6.4.</P2>
          <P2 indent>Besides this, coagulation can also be achieved either by acids or by heat as discussion below :</P2>
          <MiniHd>Coagulation by addition of Acids</MiniHd>
          <P2>(i) <strong>Formation of Yoghurt (curd).</strong> Milk is warmed to about 305-315 K, a little Yoghurt is then added and left it undisturbed for few hours. During this period, bacteria grows and produces lactic acid. Lactic acid thus produced decreases the pH and breaks the bond between calcium and the milk protein casein. The free casein particles then undergo coagulation to form Yoghurt.</P2>
          <P2>(ii) <strong>Formation of cheese.</strong> When milk is heated with an acid (lemon juice or tartaric acid), the milk protein lactalbumin gets coagulated to form cheese. During this coagulation, the soluble globular protein becomes insoluble fibrous protein.</P2>
          <P2>(iii) <strong>Coagulation by heat.</strong> When egg is boiled hard, coagulation occurs due to conversion of soluble egg protein albumin to insoluble fibrous protein.</P2>
        </Page>

        {/* ══════════════════ PAGE 12 ══════════════════ */}
        <Page>
          <SubHd id="s186" label="1.8.6" title="How can we separate a mixture of two Miscible Liquids – Distillation" />
          <DefBox>Distillation involves conversion of a liquid into vapours by heating followed by condensation of the vapours thus produced by cooling.</DefBox>
          <P2 indent>Distillation is used for the separation of components of a mixture containing two miscible liquids which boil without decomposition and have sufficient difference (30–50 K) in their boiling points.</P2>
          <P2 indent>Let us illustrate the process of distillation for separating a mixture of acetone (b.p. 329 K) and water (b.p. 373 K). The apparatus used is shown in Fig. 1.11.</P2>
          <P2><strong>Principle.</strong> The separation is based upon the principle that at the boiling point (b.p.) of the more volatile (low boiling) liquid of the mixture, the vapours almost exclusively consist of the more volatile liquid. Likewise, at the b.p. of the less volatile (high boiling) liquid, vapours almost entirely consist of the less volatile liquid since the more volatile liquid has already distilled over. Thus, the separation of the liquid mixture into individual components can be achieved at their respective boiling points; the more volatile component distils over first while the less volatile component distils over afterwards.</P2>
          <P2><strong>Procedure.</strong> As the flask is heated, the vapours of the low boiling liquid, (i.e., acetone) start forming. As these vapours travel upwards, the temperature on the thermometer starts rising. When the vapour pressure of acetone becomes equal to that of the atmosphere, acetone starts boiling (329 K). These vapours on passing through the condenser get condensed to form liquid acetone which gets collected in the beaker. When whole of acetone has distilled, the temperature on the thermometer falls. As heating is continued further, the vapours of the high boiling component of the mixture (i.e., water), start forming. As these vapours travel upwards, the temperature again starts rising. When the vapour pressure of water becomes equal to that of the atmosphere, it starts boiling. The vapours of water move upwards, and on passing through the condenser they get condensed.</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_738CC21228FFCD6603B4}
            alt="Distillation apparatus"
            caption="Fig. 1.11. Separation of two miscible liquids by distillation"
            width="75%"
          />

          <P2 indent>to form liquid water which is collected in another beaker. The non-volatile impurities and impurities of liquids having boiling points much higher than those of the two liquids separated above are, however, left in the distillation flask.</P2>
          <P2><strong>Applications of distillation.</strong> The technique of distillation can be used to separate :</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>a mixture of ether (b.p. 308 K) and toluene (b.p. 384 K).</li>
            <li>a mixture of hexane (b.p. 342 K) and toluene (b.p. 384 K).</li>
            <li>a mixture of benzene (b.p. 353 K) and aniline (b.p. 457 K) or nitrobenzene (b.p. 483 K).</li>
          </ol>

          <KBBox>
            <KBHd>• Traditional Method of Manufacturing Attar</KBHd>
            <P2 indent>Attars (perfumes) using Hydrodistillation (Deg and Bhapka) method has been used in Kannauj (small city in Uttar Pradesh) since ancient times is similar to modern distillation apparatus (Fig. 1.12).</P2>
            <Figure
              src={CONTENT_IMAGES.CONTENT_IMAGE_B018613156C3F19242B3}
              alt="Deg and Baphka method"
              caption="Fig. 1.12. Deg and Baphka method of manufacture of Attar (Perfume)"
              width="75%"
            />
            <ul style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Here flask called DEG is made up of copper metal and connected to Bamboo receiver called (CHONGA) is placed in cooling water tank called GACHCHI.</li>
              <li>After putting a mixture of rose petals (whose attar to be extracted) and water in Deg, it is sealed with clay and cotton.</li>
              <li>Deg is heated for few hours and the first distillate is collected in the receiver.</li>
              <li>The liquid is transferred to an empty copper pot and distilled again.</li>
              <li>In the 2nd distillation the true attar is extracted.</li>
            </ul>
          </KBBox>

          <SubHd id="s187" label="1.8.7" title="Fractional Distillation" />
          <P2 indent>If the boiling points of the two miscible liquids of the mixture are very close to one another, i.e., less than 25 K or so, the separation cannot be achieved by the simple distillation method as described above. This is due to the reason that at the b.p. of the more volatile liquid of the mixture there will be sufficient vapours of the less volatile liquid as well. As a result, both the liquids of the mixture will distil together and the separation cannot be achieved.</P2>
          <P2 indent>The separation of such a liquid mixture into individual components can, however, be achieved by fractional distillation, which involves repeated distillations and condensations. Fractional distillation is carried out using a fractionating column. It usually consists of a long glass tube with a wide bore packed with glass beads or small stones or porcelain pieces. The actual purpose of the fractionating column is to increase the cooling surface area and to provide hurdles or obstructions to the ascending vapours and descending liquid.</P2>
          <P2><strong>Procedure.</strong> The apparatus used for fractional distillation is shown in Fig. 1.13.</P2>
          <P2 indent>Suppose we have a mixture of two liquids chloroform and benzene of which chloroform is more volatile (b.p. 334 K) than benzene (b.p. 353 K). When such a liquid mixture is heated, the temperature rises slowly and the mixture starts boiling. The vapours formed mainly consist of the more volatile liquid. i.e., chloroform</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_881362FDB37AC9214AD9}
            alt="Fractional distillation apparatus"
            caption="Fig. 1.13. Fractional distillation"
            width="65%"
          />

          <P2 indent>with little of the less volatile liquid, i.e., benzene. As these vapours travel up the fractionating column, the vapours of the less volatile liquid (i.e., benzene) condense more readily than those of the more volatile liquid, i.e., chloroform. Therefore, the vapours rising above become richer in chloroform and the liquid flowing down becomes richer in benzene. This process of distillation and condensation is repeated at every point in the fractionating column. As a result of series of successive distillations, by the time the vapours reach the top of the column and escape into the condenser, they consist entirely of the more volatile component, i.e., chloroform. It is collected in a flask. When the more volatile component has completely distilled over, the temperature will again start rising and when the boiling point of the less volatile component is reached, benzene starts distilling which is collected in another flask. In this way, separation of two miscible liquids whose boiling points differ by less than 25 K can be achieved.</P2>
          <P2><strong>Applications of fractional distillation.</strong></P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>The process of fractional distillation has been used to separate crude oil in petroleum industry into various useful fractions such as gasoline, kerosene oil, diesel oil, lubricating oil, etc.</li>
            <li>Fractional distillation of liquid air is used to separate gases of the air.</li>
            <li>Fractional distillation has been used to separate a mixture of acetone (b.p. 329 K) and methyl alcohol (b.p. 338 K) from pyroligneous acid obtained by destructive distillation of wood.</li>
          </ol>
          <P2><strong>Limitations of fractional distillation.</strong> The components of constant boiling mixtures called azeotropes cannot be separated by fractional distillation. For example, rectified spirit consists of 95% alcohol (b.p. 78°C or 351 K) and 5% water (b.p. 100°C or 373 K). Its components cannot be separated by fractional distillation because they form a constant boiling mixture (azeotrope) even though their boiling points differ by 22°C.</P2>
        </Page>

        {/* ══════════════════ PAGE 13 ══════════════════ */}
        <Page>
          <SubHd id="s188" label="1.8.8" title="Is the Dye in Black Ink a Single Colour? – Chromatography" />
          <P2 indent>Chromatography is the most modern and versatile method used for the separation, purification and testing the purity of inorganic and organic compounds. This method was first discovered by Tswett, a Russian botanist, in 1906. This technique was first used for separation of coloured substances (plant pigments) and hence the name chromatography was given. <em>Kroma</em> in Greek means colour and <em>graphy</em> means writing. However, now this method is widely used for separation, purification, identification and characterization of both colourless and coloured components of a mixture.</P2>
          <P2><strong>Types of chromatography.</strong> With the advancement in technology, many types of chromatography such as column chromatography, thin layer chromatography (TLC), gas-liquid chromatography (GLC), high performance liquid chromatography (HPLC), etc. have been developed but the simplest form of chromatography is paper chromatography. Therefore, we will discuss paper chromatography here while other types of chromatographies you will learn in higher classes.</P2>
          <P2 indent>Usually the ink that we use is a solution of two or more different coloured dyes in water. With the help of paper chromatography, we can easily identify the different coloured dyes present in ink.</P2>
          <P2><strong>Theory.</strong> We know that two or more different substances may be soluble in the same solvent but their solubilities are usually different. Thus, when a solvent (say water) is allowed to pass over a mixture of such substances, the substance which is more soluble in the solvent moves faster and thus gets separated from the other substances in the mixture which moves slowly. Thus, separation/identification of different components of a mixture by paper chromatography is based upon their different solubilities in the same solvent.</P2>
          <P2><strong>Procedure.</strong> To carry out the experiment, take a thin strip of a special type of filter paper called the chromatographic filter paper. Using a pencil, draw a line across the width of the filter paper at about 3 cm from the bottom (Fig. 1.14 a). Put a small drop of ink from a sketch pen or a fountain pen at the centre of this line and let it dry. Suspend the paper in a glass jar containing water so that the spot of ink on the paper is just above the water level as shown in Fig. 1.14 (b).</P2>

          <Figure
            src={CONTENT_IMAGES.CONTENT_IMAGE_C9B339FC08BB14A548DE}
            alt="Separation of dyes in black ink using chromatography"
            caption="Fig. 1.14. Separation of dyes in black ink using chromatography"
            width="75%"
          />

          <P2 indent>As water rises up the paper by capillary action and flows over the spot, it takes along with it dye particles. Usually, ink is a mixture of two or more coloured dyes. The coloured component which is more soluble in water, rises faster and produces a coloured spot on the paper at a higher position. The less soluble components rise slower and produce coloured spots at lower heights. In this way, all the dyes present in the black ink get separated as shown in Fig. 1.14 (c).</P2>
          <P2 indent>When the water reaches near the top end of the filter paper strip, the paper strip is removed from the jar and dried. This paper with coloured spots at different heights is called the chromatogram (Fig. 1.14 d).</P2>
          <P2><strong>Applications of chromatography.</strong> Chromatography is an important and powerful tool for chemical analysis. It is used :</P2>
          <ol style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
            <li>to separate coloured substances present in dyes and natural pigments</li>
            <li>to separate and identify the amino acids obtained by hydrolysis of proteins.</li>
            <li>to detect and identify drugs present in the blood of criminals in forensic science.</li>
            <li>to separate small amounts of different products of a chemical reaction.</li>
            <li>to monitor the progress of a reaction.</li>
          </ol>
          <P2 indent>The position of each spot in the chromatograph is usually expressed in terms of R<Sub c="f" /> (Rate of flow) value, i.e.,</P2>
          <MathBlock>R<Sub c="f" /> = <Frac n="Distance moved by any spot" d="Distance moved by the solvent" /></MathBlock>
          <P2 indent>Since solvent moves faster than compound, therefore, R<Sub c="f" /> values are always less than 1.</P2>

          {/* Knowledge Booster */}
          <KBBox>
            <KBHd>1. Handling of Common Laboratory Chemicals and Apparatus Safely</KBHd>
            <ul style={{ margin:"6px 0 10px 20px",lineHeight:1.65 }}>
              <li>Lab coat to be worn all the time.</li>
              <li>Safety goggles must be worn all the time while working in the laboratory.</li>
              <li>Wear gloves while handling chemicals. Always we fresh gloves.</li>
              <li>Be sure to wash your hands after you are finished working in the labs.</li>
              <li>Dispose off waste properly. Do not pour down the drain.</li>
              <li>Never inhale fumes or vapours.</li>
              <li>Always waft odours towards your nose with your hand.</li>
              <li>Use fume hoods for dangerous or irritating chemicals.</li>
            </ul>
            <KBHd>2. Societal Impact of Chemistry in making life healthier, cleaner and sustainable</KBHd>
            <P2 indent>Chemistry contributes virtually to every aspect of our modern life as briefly described below :</P2>
            <P2>(i) <strong>Medicine and Healthcare.</strong> Use of knowledge of chemistry is involved in every drug you take whether it is a painkiller or a life-saving antibiotic. Chemists have been able to make such molecules which interact in the body in separate ways. For example, during COVID-19, chemists developed vaccines and booster shots to fight corona virus. Chemistry has also been useful in numerous other ways such as providing super foods, clean water to drink and clean air to breathe. They have also made several antibacterials such as soaps, shampoos, toothpaste, mouthwash and hand sanitizers for our personal hygiene.</P2>
            <P2>(ii) <strong>Fuel and power generations.</strong> Chemistry has also provided mankind better ways to produce pollution free fuel. For example, fossil energy has been converted into electricity and have developed lithium ion batteries which have high charge density, longer life span and have deep cycle while maintaining.</P2>
            <P2 indent>Similarly, there are two types of rocket fuels namely, solid and liquid fuel. The components of liquid fuel are liquid hydrogen and liquid oxygen and the components of solid fuel are aluminium and ammonium perchlorate. However, both liquid and solid fuels are required to launch a rocket into space.</P2>
            <P2>(iii) <strong>Clean environment.</strong> Chemistry plays a critical role in the development of sustainable products. These products are obtained from natural renewable sources and hence reduce air pollution, remove harmful substances from water supply. In homes and vehicles, now CNG or PNG is used instead of petrol, diesel and LPG.</P2>
            <P2>(iv) <strong>Clothes.</strong> As an alternative to natural sources such as cotton, wool and silk, chemistry has provided mankind another cheap and more durable clothing fibres like nylon, terylene, orlon, etc. Since these fibres are not degraded over a period of time and hence cause pollution.</P2>
          </KBBox>
        </Page>

        {/* ══════════════════ PAGE 14 – Indian Scientist & Scientific Project ══════════════════ */}
        <Page>
          <FeatureBox title="■ Contribution of Indian Scientist – Dilip Mahalanabis (ORS)">
            <P2 indent>Dilip Mahalanabis (1934-2022) was an Indian paediatrician known for pioneering the use of ORT (Oral Rehydration Therapy) to treat diarrhoeal diseases. He started researching oral rehydration therapy in 1966 as a research investigator for the Johns Hopkins University International Centre at Calcutta. During the Bangladesh war for independence, he demonstrated the life saving effectiveness of oral rehydration therapy when cholera broke out in 1971 among refugees from east Bengal (now Bangladesh) who had sought asylum in West Bengal. The simple inexpensive Oral Rehydration Solution (ORS) gained acceptance and was later hailed as one of the most important medical advances of 20th century.</P2>
            <P2 indent>In 2002, he co-received the Pollin Prize – a prestigious international award for Pediatrics research for his contribution w.r.t. ORS. He also received Prince Mahidol award, the highest civilian award of Thailand, in 2006 he was awarded PADMA VIBHUSHAN (Posthumous) in 2023.</P2>
          </FeatureBox>

          <FeatureBox title="■ Can we Create Artificial Blood that works just as well as Real Blood?">
            <P2 indent>Natural blood is a remarkable substance. It is not just a simple red liquid; it is a complex living tissue. It consists of four major components: (i) red blood cells called haemoglobin, (ii) white blood cells which fight infections, (iii) platelets which cause blood clotting and (iv) yellow liquid called plasma, which carry nutrients, hormones, and waste products.</P2>
            <P2 indent>The main job which a blood substance is to carry oxygen. When a person loses lot of blood in an accident or during surgery, the immediate danger is that their tissues won't get enough oxygen. A substance that can handle this critical task would save life. A true artificial replacement would need to do every thing blood does, from fighting infections to clotting without being rejected by the body's immune system.</P2>
            <P2 indent>Storing donated blood is also tricky. It has a short shelf-life and must be refrigerated and matches to recipient's blood type. An ideal artificial blood substance must be universal, storable for long periods at room temperature.</P2>
            <P2 indent>Scientists have focussed on creating something simple, an oxygen carrier. These are not true blood replacements but substitutes that can perform the most critical function of red blood cells. The most promising candidates are called : Haemoglobin-based oxygen carriers (HBOCs) and perfluorocarbons (PFC) emulsions. The early attempts were not successful. The problem is that, when you mix haemoglobin into solution, the haemoglobin molecules will quickly breakdown or clump together and get filtered out.</P2>
            <P2 indent>by kidneys, causing damage. The particles were too unstable just like sand settling in water. Thus, the key problem is to convert unstable suspensions of oxygen carriers into a stable colloid where the particles remain evenly dispersed and don't settle out. To achieve this, scientists have used stabilizers to make particles larger and more stable allowing them to circulate into the blood stream for longer times without causing harm. No success so far, but efforts are continuing.</P2>
            <P2 indent>For PFCs (commonly perfluorodecalin) which are synthetic chemicals which can dissolve large amounts of oxygen but PFCs do not mix with blood, much like oil and water. To make them work, they must be whipped into a stable emulsion.</P2>
            <P2 indent>Creating stable colloid is only half the battle. The resulting substance must also be biocompatible, i.e., it must not produce toxic effect on the body. For example, if the particles in blood substitute start aggregating, they can form blockages in small blood vessels, leading to stroke or heart attack. If they breakdown too quickly, they might release toxic components or fail to deliver oxygen where it is needed.</P2>
            <P2 indent>Thus, the challenge is to design particles that are stable enough to circulate for hours or even days, but that will also be safety cleared from the body once their job is done.</P2>
            <P2 indent>Researches are still continuing to evolve fine methods of creating colloids which have right particle size and chemical composition to improve both stability and biocompatibility. Thus, in nutshell, a true all purpose artificial blood substitute remains a goal for future.</P2>
          </FeatureBox>

          <FeatureBox title="■ Formulating and investigating a Scientific Project">
            <P2><strong>Observations.</strong> (i) When we spill a bottle of ammonia in one room, we get its smell in the other corner. How?</P2>
            <P2>(ii) When we light an incense stick in one corner of a room, we get its smell in the other corner of the room. How?</P2>
            <P2><strong>Hypothesis.</strong> (i) Do gases diffuse into one another?</P2>
            <P2>(ii) What is the relationship between the molecular mass and rate of diffusion?</P2>
            <P2><strong>Experiment 1. Procedure.</strong> (i) Invert a gas jar containing hydrogen (colourless) and other gas jar containing nitrogen dioxide (reddish brown). Separate the two jars by a lid (Fig. 1.15).</P2>

            <Figure
              src={CONTENT_IMAGES.CONTENT_IMAGE_DE687984BB16AE573072}
              alt="Diffusion of gases"
              caption="Fig. 1.15. Diffusion of gases occurs against the law of gravitation"
              width="55%"
            />

            <P2>(ii) Now remove the lid. After sometime, you will find that both the gas jars have the same colour, i.e., light brown. This suggests that lighter hydrogen gas has moved downwards and the heavier nitrogen dioxide gas has moved upwards. Ultimately the two gas jars contain the same uniform mixture of two gases and thus acquire the same light brown colour. This intermixing of gases is called diffusion.</P2>
            <P2 indent>A familiar example of diffusion in our homes is that we come to know what is being cooked in the kitchen without even entering there, by the smell that reaches us. This is due to diffusion. The particles of the aroma (pleasant smell) of food mix with the particles of air and due to high speeds of these particles, the smell quickly reaches us. Since the rate of diffusion increases with temperature, therefore, the smell of hot cooked food travels faster than that of the cold food.</P2>
            <P2><strong>Experiment 2.</strong> To find out the relationship between molecular mass and rate of diffusion of a gas, let us set up another experiment.</P2>
            <P2><strong>Procedure.</strong> (i) Take a 1 meter long glass tube. (ii) Introduce ammonia gas from left end and hydrochloric acid gas from right end at equal pressure. (iii) Note the point on the tube where white vapours of ammonium chloride are first formed. (iv) Measure the distance of this point from either end and record your observations. (Fig. 1.16).</P2>
            <P2><strong>Observations :</strong></P2>

            <Figure
              src={CONTENT_IMAGES.CONTENT_IMAGE_866A8BC7CE77E1C05954}
              alt="Distance travelled by NH3 and HCl gases"
              caption="Fig. 1.16. Distance travelled by NH₃ and HCl gases"
              width="55%"
            />

            <P2>Mol. mass of NH<Sub c="3" /> = 17 g mol<Sup c="−1" /> and Mol. mass of HCl = 36.5 g mol<Sup c="−1" /></P2>
            <P2>Distance travelled by NH<Sub c="3" /> = 59·4 cm</P2>
            <P2>Distance travelled by HCl = 40·6 cm</P2>
            <P2><strong>Conclusion.</strong> Lighter gases (i.e. NH<Sub c="3" />) diffuse faster than heavier gases (i.e. HCl).</P2>
            <P2><strong>Derivation of relation between Rates of Diffusion and Molecular Masses</strong></P2>
            <P2>Let r<Sub c="NH₃" /> and r<Sub c="HCl" /> be the rates of diffusion of NH<Sub c="3" /> and HCl respectively.</P2>
            <MathBlock>
              <Frac n="r(NH₃)" d="r(HCl)" /> = <Frac n="Distance travelled by NH₃" d="Distance travelled by HCl" /> = <Frac n="59·4" d="40·6" /> = 1·46 &nbsp;&nbsp; ...(i)
            </MathBlock>
            <P2>Square root of the ratio of molecular mass of HCl and NH<Sub c="3" /></P2>
            <MathBlock>
              = √(<Frac n="Mol. mass of HCl" d="Mol. mass of NH₃" />) = √(<Frac n="36·5" d="17" />) = 1·46 &nbsp;&nbsp; ...(ii)
            </MathBlock>
            <P2 indent>From Eqs. (i) and (ii), we conclude that rates of diffusion of NH<Sub c="3" /> and HCl are inversely proportional to the square root of their molecular masses, i.e.,</P2>
            <MathBlock>
              <Frac n="r(NH₃)" d="r(HCl)" /> = √(<Frac n="36·5" d="17" />) = 1·46
            </MathBlock>
            <P2><strong>Conclusion.</strong> Both the experiments prove that gases diffuse into one another and the rate of diffusion is inversely proportional to square root of their molecular masses.</P2>
            <P2><strong>Law.</strong> The conclusions stated above are now called Graham's Law of Diffusion.</P2>
          </FeatureBox>
        </Page>

      </div>
    </div>
  );
}
