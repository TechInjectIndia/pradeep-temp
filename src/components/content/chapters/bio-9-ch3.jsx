"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── COMPONENT LIBRARY ─────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P  = "#f9eef4";

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
  <span style={{ display:"inline-flex", flexDirection:"column", alignItems:"center",
    verticalAlign:"middle", lineHeight:1.25, margin:"0 3px", fontSize:"0.95em" }}>
    <span style={{ borderBottom:"1.5px solid #1a1a1a", padding:"0 4px 1px", textAlign:"center", whiteSpace:"nowrap" }}>{n}</span>
    <span style={{ padding:"1px 4px 0", textAlign:"center", whiteSpace:"nowrap" }}>{d}</span>
  </span>
);

const MathBlock = ({ children }) => (
  <div style={{ textAlign:"center", margin:"14px 20px", fontStyle:"italic", fontSize:"14.5px", lineHeight:1.6 }}>{children}</div>
);

const Arrow = () => <span style={{ margin:"0 6px" }}>⟶</span>;
const Eq    = () => <span style={{ margin:"0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin:"0 4px" }}>×</span>;

const ChemEq = ({ lhs, rhs, arrow="forward", topLabel, bottomLabels }) => {
  const arrowChar = arrow==="eq" ? "⇌" : arrow==="reverse" ? "⟵" : "⟶";
  return (
    <div style={{ textAlign:"center", margin:"16px 20px", fontSize:14.5, lineHeight:1.7 }}>
      <span>{lhs}</span>
      <span style={{ display:"inline-flex", flexDirection:"column", alignItems:"center",
        verticalAlign:"middle", margin:"0 10px", fontSize:"0.85em" }}>
        {topLabel && <span style={{ fontSize:11, color:"#555" }}>{topLabel}</span>}
        <span style={{ fontSize:18 }}>{arrowChar}</span>
      </span>
      <span>{rhs}</span>
      {bottomLabels && (
        <div style={{ display:"flex", justifyContent:"center", gap:80,
          fontSize:12, color:"#555", marginTop:2 }}>
          {bottomLabels.map((l,i)=><span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  );
};

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop:22, marginBottom:10 }}>
    <h2 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:14,
      fontWeight:800, color:P_COLOR, textTransform:"uppercase",
      letterSpacing:"0.5px", margin:0 }}>
      {label}. {title}
    </h2>
    <div style={{ borderTop:"1.5px solid "+P_COLOR, marginTop:4 }} />
  </div>
);

const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:14,
    fontWeight:700, color:P_COLOR, margin:"16px 0 8px" }}>{label}. {title}</h3>
);

const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13.5,
    fontWeight:700, color:P_COLOR, margin:"14px 0 7px" }}>{label}. {title}</h4>
);

const P2 = ({ children, style }) => (
  <p style={{ margin:"0 0 8px", textAlign:"justify", ...style }}>{children}</p>
);

const DefBox = ({ children }) => (
  <div style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0",
    fontStyle:"italic", background:"#fafafa", fontSize:"14px", lineHeight:1.55 }}>
    {children}
  </div>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border:"1.5px solid #888", borderLeft:"5px solid "+P_COLOR, margin:"18px 0" }}>
    <div style={{ textAlign:"center", fontWeight:800,
      fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontSize:13.5, textDecoration:"underline", padding:"8px 12px 2px" }}>
      ACTIVITY {num}.
    </div>
    {sub && <div style={{ textAlign:"center", color:P_COLOR, fontStyle:"italic",
      fontSize:13, padding:"2px 16px 8px" }}>{sub}</div>}
    <div style={{ padding:"8px 16px 12px" }}>{children}</div>
  </div>
);

const ActHd = ({ children }) => (
  <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700,
    color:P_COLOR, fontSize:13.5, margin:"8px 0 5px" }}>{children}</p>
);

const KBBox = ({ children }) => (
  <div style={{ border:"2px solid "+P_COLOR, margin:"20px 0" }}>
    <div style={{ background:P_COLOR, color:"#fff",
      fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontWeight:900, fontSize:13, letterSpacing:2, padding:"5px 14px" }}>
      KNOWLEDGEBOOSTER
    </div>
    <div style={{ padding:"10px 16px 12px" }}>{children}</div>
  </div>
);

const KBHd = ({ children }) => (
  <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700,
    color:P_COLOR, fontSize:13.5, margin:"10px 0 5px" }}>{children}</p>
);

const FeatureBox = ({ title, children }) => (
  <div style={{ border:"2px solid #888", margin:"18px 0", padding:"12px 16px" }}>
    <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:800,
      color:P_COLOR, fontSize:14, margin:"0 0 8px" }}>{title}</p>
    {children}
  </div>
);

const ProblemsBox = ({ children }) => (
  <div style={{ border:"2px solid "+P_COLOR, margin:"20px 0" }}>
    <div style={{ background:P_COLOR, color:"#fff", textAlign:"center",
      fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontWeight:900, fontSize:16, letterSpacing:2, padding:7 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding:"12px 18px" }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize:12, color:"#555", fontStyle:"italic" }}> [{children}]</span>
);

const Fig = ({ src, caption, width="60%" }) => (
  <div style={{ textAlign:"center", margin:"16px 0" }}>
    <img src={src} alt={caption} style={{ maxWidth:width, height:"auto", display:"inline-block" }} />
    {caption && <div style={{ fontSize:13, color:"#333", marginTop:6, fontStyle:"italic" }}>{caption}</div>}
  </div>
);

const NumericalSection = ({ topic, children }) => (
  <div style={{ border:"2px solid #c0126a", margin:"20px 0" }}>
    <div style={{ background:"#c0126a", color:"#fff", textAlign:"center",
      fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontWeight:900, fontSize:13, letterSpacing:2, padding:"5px 14px" }}>
      NUMERICAL PROBLEMS BASED ON {topic}
    </div>
    <div style={{ padding:"12px 18px" }}>{children}</div>
  </div>
);

const th = (txt) => (
  <th style={{ background:LIGHT_P, color:"#1a1a1a", fontWeight:700,
    fontFamily:"'Merriweather Sans',Arial,sans-serif",
    fontSize:13, padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{txt}</th>
);
const td = (txt, align="left") => (
  <td style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
    verticalAlign:"top", textAlign:align }}>{txt}</td>
);

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen(o=>!o)}
      aria-label={open ? "Close table of contents" : "Open table of contents"}
      style={{ position:"fixed", top:14, left:14, zIndex:1100,
        background:"#fff", color:P_COLOR, border:"2px solid #2563eb", borderRadius:8,
        width:40, height:40, padding:0, cursor:"pointer", fontSize:20, fontWeight:800,
        display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 14px rgba(0,0,0,0.15)", fontFamily:"system-ui,sans-serif" }}>
      {open ? "✕" : "☰"}
    </button>
  );
}

function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.18)", zIndex:1050 }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  return (
    <div style={{ position:"fixed", top:0, left:0, height:"100vh", width:open?240:0,
      overflow:"hidden", background:"#fff", zIndex:1060, boxShadow:open?"2px 0 16px rgba(0,0,0,0.13)":"none",
      transition:"width 0.22s ease", borderRight:open?"1.5px solid #eee":"none" }}>
      <div style={{ width:240, height:"100%", overflowY:"auto", padding:"54px 0 20px" }}>
        <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:800,
          fontSize:11, color:P_COLOR, letterSpacing:2, padding:"0 16px 10px",
          borderBottom:"1.5px solid "+P_COLOR, marginBottom:8 }}>
          CONTENTS
        </div>
        {tocItems.map(item => (
          <div key={item.id}
            style={{ padding: item.level===1 ? "5px 16px" : item.level===2 ? "4px 24px" : "3px 32px",
              fontSize: item.level===1 ? 13 : item.level===2 ? 12.5 : 12,
              fontWeight: item.level===1 ? 700 : 400,
              color: item.level===1 ? P_COLOR : "#333",
              cursor:"pointer", lineHeight:1.4 }}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior:"smooth" });
              setOpen(false);
            }}>
            {item.label} {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

const ChapterCover = () => (
  <div style={{ background:"linear-gradient(135deg,#f9d6eb 0%,#fce4f1 60%,#fff 100%)",
    padding:"40px 0 32px", textAlign:"center", marginBottom:24, borderRadius:"0 0 12px 12px" }}>
    <div style={{ display:"inline-block", background:"#fff", border:"3px solid "+P_COLOR,
      borderRadius:8, padding:"8px 24px", marginBottom:16 }}>
      <span style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontSize:52, fontWeight:800, color:P_COLOR }}>3</span>
    </div>
    <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontSize:32, fontWeight:800, color:"#2a1a2e", letterSpacing:4, textTransform:"uppercase" }}>
      REPRODUCTION
    </div>
  </div>
);

// ── TABLE SUB-COMPONENTS (Batch 1) ────────────────────────────

function TableAsexSex() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {[["Feature"],["Asexual Reproduction"],["Sexual Reproduction"]].map(([h],i)=>(
              <th key={i} style={{ background:LIGHT_P, color:"#1a1a1a", fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Genetic variation","Very low (clones)","High (unique variations between offspring)"],
            ["Number of parents","One","Two"],
            ["Gametes formation and fusion","No gamete formation and fusion","Male and female gametes formation and fusion"],
            ["Reproductive speed","Fast","Slow"],
            ["Energy investment","Low","High"],
            ["Adaptability","Good for stable environments","Good for changing environments"],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top", textAlign: j===0?"left":"center" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableBinaryMultiple() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.1. Differences between Binary Fission and Multiple Fission
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            <th style={{ background:LIGHT_P, color:"#1a1a1a", fontWeight:700,
              fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
              padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>Binary Fission</th>
            <th style={{ background:LIGHT_P, color:"#1a1a1a", fontWeight:700,
              fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
              padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>Multiple Fission</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["1. It results in the production of two individuals.","1. It results in the production of several individuals."],
            ["2. It occurs under favourable conditions.","2. It occurs both under favourable and unfavourable conditions."],
            ["3. Nucleus of the parent cell divides only once to form two nuclei.","3. Nucleus of the parent cell undergoes repeated divisions to form a number of daughter nuclei."],
            ["4. Cytoplasm divides after nuclear division.","4. Cytoplasm does not divide after each nuclear division."],
            ["5. No part of parent body is left unused.","5. A part of the body (covering and residual cytoplasm) is left unused."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableScionStock() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.2. Differences between Scion and Stock.
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["Scion","Stock"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P, color:"#1a1a1a", fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["1. It is the upper part of the composite grafted plant.","1. It is the basal part on which grafting is done."],
            ["2. It has a shoot system with desired traits.","2. It has an extensive and strong root system."],
            ["3. It generally is taken from high yielding exotic variety of plant.","3. It generally is taken from local variety of plant which is suitable for growth under local conditions."],
            ["4. Scion provides high and better quality yield of flowers and fruits.","4. Stock provides good anchorage, and adequate water and minerals to composite plant."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT (Batch 1) ─────────────────────────────────────────
const content_b1 = [
  <SecHd key="sec-s31" id="s31" label="3.1" title="Introduction and Definition" />,

  <p key="b1-p1" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Every living thing, from the smallest bacterium to the largest blue whale, has a way to make more of its own kind. Reproduction is a special biological process related with the production of a new generation of individuals of the same species. Though, it is not an essential process for the survival of an individual, it is essential for multiplication and perpetuation of the species.</p>,

  <DefBox key="def-s31-1"><strong>Reproduction</strong> may be defined as the production of new generation of individuals of the same species that are physically independent of their parents.</DefBox>,

  <SubHd key="sub-s311" id="s311" label="3.1.1" title="Why do organisms reproduce?" />,

  <p key="b1-p2" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Reproduction is an energy spending process which is not at all essential to maintain the life of an individual organism. Even then, the organisms reproduce. They reproduce to increase in number. All the members produced from the parents look like parents as well as they look very much like themselves. Thus, reproduction results in the increase of members which look alike. The organisms which look similar to each other belong to the same species. Moreover, reproduction provides group immortality by replacing the dead individuals with new ones for the survival of the species on this earth.</p>,

  <SubHd key="sub-s312" id="s312" label="3.1.2" title="Why do the organisms belonging to same species look similar to each other?" />,

  <p key="b1-p3" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The reproducing organisms create new individuals which are similar to each other and look exactly similar to their parents. Do you know why? They look similar because their body designs are similar. To produce similar body designs, they produce similar blue prints. This is possible only when a mechanism of production of similar copies of blue print is involved in the process of reproduction. That is true, the reproduction involves a mechanism, called <strong>DNA copying</strong> or <strong>DNA replication</strong> which is capable of producing similar multiples of blue prints. We have earlier learnt that nucleus contains chromosomes which carry information for inheritance of features from parent to the next generation in the form of DNA (Deoxyribonucleic acid) molecules. DNA copying is an essential phenomenon of reproduction through which the organisms pass on their body features to their offsprings. Similar copies of DNA molecules carry similar molecular composition and, in other words, similar <strong>genes</strong> for production of similar features. The molecule of DNA in the cell nucleus possesses information in the form of genes to synthesize specific kind of proteins. If this information is changed, consequently the production of the kind of proteins will also be changed. The proteins act as enzymes to carry out specific functions. Thus, a change in the structure of DNA may cause a change in the information that ultimately lead to change in the kind of protein formed from this DNA sequence. Change in the structure of protein may result in the formation of a different kind of enzyme that leads to the production of a different kind of feature.</p>,

  <p key="b1-p4" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>We have learnt from the above paragraph that creation of a DNA copy is the basic event in the process of reproduction. Cells usually employ chemicals to build copies of their DNA. This process results in the production of two similar copies of DNA in a reproducing cell. The two copies of the DNA molecule, which are similar with each other, come to two small daughter cells. Therefore, DNA copying is always accompanied by the creation of another cellular apparatus. Finally, the DNA copies are separated into two similar cells, each with its own cellular apparatus. Finally, a cell divides to give rise to two daughter cells.</p>,

  <p key="b1-p5" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>These two daughter cells, thus formed, are exactly similar with each other due to their similar genetic make up. There are, however, chances that they may not be exactly similar. They may be identical or may be slightly different with each other. It all depends on how accurately the process of DNA copying has occurred. In fact, no biochemical reaction is absolutely reliable. Therefore, it is always expected that process of copying of DNA is not truly identical each time. It may cause a slight difference during each DNA copying. As a result, the two copies of DNA may be similar, but not identical to the original. Some of these copies of DNA may possess such drastic variation from the original that their survival becomes difficult. Such individuals having distinct variations fail to survive and simply die. On the other hand, some variations in the DNA copies may create such individuals which can survive but with a slight variation in its feature. This variation in DNA copying may lead to the evolution of species.</p>,

  <SubHd key="sub-s313" id="s313" label="3.1.3" title="The Importance of Variation" />,

  <p key="b1-p6" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>We all know that a particular kind of vegetation grows in a particular kind of habitat or a particular niche. For example, xerophytes have specific adaptations and survive in a particular kind of ecological niche (<em>i.e.,</em> desert). We also know that the ecological niches keep on changing with time. Usually the DNA copying, which is an essential feature of reproduction, remains consistent generations after generations. This helps the offsprings to adapt the particular kind of niche in the ecosystem. Both niches and the populations of the organisms inhabiting in them are in perfect harmony so that they continue to survive as long as both remain unchanged. Thus, stability of populations of species in particular niches are maintained by the process of reproduction.</p>,

  <p key="b1-p7" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>However, there are chances that niches can change due to reasons beyond the control of the organisms. The changes may be in the form of increased temperature on earth, varying water levels, meteorite hits, or any other ecological disbalances. Under such conditions, any alteration in the particular kind of niche is surely going to hit the consistent population. The population of species may be wiped out due to sudden alteration of niche. However, a few individuals of the population of a species may survive the changed niches which have undergone variation in their features due to variations in DNA copying mechanism. If a population of reproducing organisms achieves such inheritable changes which help them to survive under changed niches then the organisms have chances to survive. In case, if the organism has not changed and the niche has altered drastically then the organism is surely going to be wiped out. For example, if a population of bacteria is growing in temperate water and has developed an environmental harmony. Suppose the temperature of water is somehow increased due to global warming, then the bacteria will definitely die. However, only those will survive which have developed resistance to heat. Variations are, thus, useful for the survival of species over time.</p>,

  <SecHd key="sec-s32" id="s32" label="3.2" title="Types of Reproduction" />,

  <p key="b1-p8" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Organisms have evolved two main strategies for reproducing : <strong>Asexual</strong> and <strong>sexual</strong>.</p>,

  <p key="b1-p9" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In <strong>asexual reproduction</strong>, the new individuals are produced by any means other than the fusion of sex gametes. The <strong>sexual reproduction</strong>, on the other hand, involves fusion of two sex gametes, one arising from male sex and the other from female sex. These two distinct methods are the foundation for the incredible diversity of life we see on earth. Each strategy has its own set of advantages and is suited to different organisms and environments.</p>,

  <p key="b1-t1-lbl" style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
    fontWeight:700, fontSize:13, margin:"12px 0 4px" }}>Differences between Asexual and Sexual Reproduction</p>,
  <TableAsexSex key="b1-t1" />,

  <SubHd key="sub-s321" id="s321" label="3.2.1" title="Asexual Reproduction" />,

  <p key="b1-p10" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Asexual reproduction involves the participation of single individual parent and occurs without the formation of sex organs or gametes. Thus,</p>,

  <DefBox key="def-s321-1"><strong>Asexual reproduction</strong> may be defined as the production of offsprings by a single parent without meiosis, formation of gametes, fertilisation and transfer of genetic materials between individuals.</DefBox>,

  <p key="b1-p11" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>This method is a common means of rapidly increasing offsprings under favourable conditions and occurs as a result of repeated mitotic divisions in certain body cells. Asexual reproduction mostly occurs in unicellular organisms (like bacteria, protozoans, etc.), some plants (like algae, fungi, bryophytes, etc.) and certain multicellular animals (like sponges and <em>Hydra</em>). In this method of reproduction, the young one receives all its genes from one parent. Asexual reproduction occurs in the following ways:</p>,

  <p key="b1-p12" style={{ textAlign:"justify", margin:"0 0 8px" }}><strong>1. Fission, 2. Fragmentation, 3. Regeneration, 4. Budding, 5. Spore formation, 6. Vegetative propagation in plants, 7. Propagation by tissue culture.</strong></p>,

  <p key="b1-p13" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3.2.1.1. Fission :</strong> Fission is the common method of asexual reproduction in unicellular organisms, such as bacteria, yeasts, diatoms, mycoplasmas and protozoans (<em>e.g., Amoeba, Paramecium,</em> etc.). It involves the splitting of a parent cell into two or more than two separate daughter cells. Thus,</p>,

  <DefBox key="def-s321-fiss"><strong>Fission</strong> may be defined as the splitting of a unicellular organism into two or more than two separate daughter cells.</DefBox>,

  <p key="b1-p14" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Asexual reproduction by fission may further be divided into two types: (<strong>a</strong>) binary fission and (<strong>b</strong>) multiple fission.</p>,

  <p key="b1-p15" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>(a) Binary fission</strong> (Fig. 3.1 and 3.2). This is the division of parent cell into two small, nearly equal sized identical daughter cells. The two daughter cells then grow into adult organisms. So, fission of single parent cell results in the formation of two new unicellular organisms. Hence, it is called <strong>binary fission</strong> (binary = two). Fission usually occurs in unicellular organisms, such as <em>Amoeba</em> (Fig. 3.1), <em>Paramecium</em> (Fig. 3.2).</p>,

  <Fig key="fig-3-1"
    src={CONTENT_IMAGES.CONTENT_IMAGE_168394DA2F17AA187307}
    caption="Fig. 3.1. Asexual reproduction by binary fission in Amoeba"
    width="61%" />,

  <Fig key="fig-3-2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_291EE9D8D9C286DD1ADB}
    caption="Fig. 3.2. Asexual reproduction by binary fission in Paramecium"
    width="44%" />,

  <p key="b1-p16" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>and <em>Leishmania</em> (which causes kala-azar). In these organisms, binary fission occurs in a definite orientation. The cells of <em>Leishmania</em> have a whip-like structure at one end of the cell. During the binary fission the nuclear division is followed by the appearance of a constriction in the cell membrane. The membrane then grows transversely inwards (<em>i.e.,</em> centripetally) from near the middle of dividing cell which separates the cytoplasm into two equal parts, each with one nucleus. The two daughter cells may separate from each other and behave as two independent organisms.</p>,

  <ActivityBox key="act-3-1" num="3.1" sub="To study binary fission in Amoeba">
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Observe a permanent slide of <em>Amoeba</em> first under low power and then under high power of microscope. Similarly, observe a permanent slide of <em>Amoeba</em> showing binary fission. First slide shows presence of unicellular and uninucleate organisms showing irregular outline. The second slide shows dividing cells of <em>Amoeba</em>.</p>
  </ActivityBox>,

  <p key="b1-p17" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>(b) Multiple fission</strong> (Fig. 3.3). This is the division of parent cell into several small, nearly equal sized daughter individuals. During multiple fission, the nucleus of parent cell divides several times into many daughter nuclei. Then the daughter nuclei get arranged along the periphery of the parent cell. Later, the cytoplasm divides into as many pieces as the number of nuclei. Each uninucleate piece develops an outer membrane. Finally, the parent cell divides into several uninucleate daughter individuals which behave as independent organisms. This type of fission occurs in malarial parasite – <em>Plasmodium</em>, in which about 1000 daughter cells are produced from one parent cell, each capable of invading a red blood cell.</p>,

  <Fig key="fig-3-3"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CE4DC6F7FF5675783B4C}
    caption="Fig. 3.3. Reproduction by multiple fission"
    width="70%" />,

  <TableBinaryMultiple key="b1-t2" />,

  <p key="b1-p18" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3.2.1.2. Fragmentation:</strong> Some multicellular organisms have simple body organisation. These organisms are comprised of a random collection of cells without differentiation of specialised tissues and organs. Such organisms reproduce by breaking of their bodies into small pieces. Each of these pieces is called a fragment. These fragments grow into new individuals and the mode of reproduction is called <strong>fragmentation</strong>. For example, the green filamentous alga-<em>Spirogyra</em> has a multicellular body with similar cells. Each cell of <em>Spirogyra</em> may divide and growth of the filament occurs simply by cell division. The filament of <em>Spirogyra</em> may break into small fragments (pieces) and each fragment may grow into a new plant.</p>,

  <p key="b1-p19" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Fragmentation is the method of reproduction in many filamentous algae, mycelial fungi and thalloid bryophytes. However, there are many other multicellular organisms which possess different cell types in their complex bodies to perform different specialised functions. The reproduction in such organisms is carried by specific cells of the body.</p>,

  <p key="b1-p20" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3.2.1.3. Regeneration:</strong> In certain organisms (<em>e.g.,</em> planarians), new individuals can be regenerated from small body fragments. This method is applied by certain organisms for asexual reproduction and multiplication.</p>,

  <DefBox key="def-regen"><strong>Regeneration</strong> may be defined as the ability of an organism to regenerate its lost parts of the body which have been removed, as by injury or autotomy (self-amputation of body parts, <em>e.g.,</em> some lizards can break off part of the tail).</DefBox>,

  <p key="b1-p21" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Regeneration is common in lower plants (<em>e.g.,</em> Algae, fungi, etc.) and animals (<em>Hydra, Planaria</em> and <em>Sponges</em>). A mature filament of <em>Spirogyra</em> (an alga) or hypha of <em>Mucor</em> (a fungi) breaks into two or more pieces and each piece grows into a new individual. This method of reproduction in plants is called <strong>fragmentation</strong>. Similarly, if the body of <em>Hydra</em> is cut into small pieces, even a fragment measuring 1/6 mm can regenerate into an entire individual. Regeneration in <em>Planaria</em> is shown in figure 3.4.</p>,

  <p key="b1-p22" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Complex multicellular organisms such as mammals cannot reveal regeneration, <em>i.e.,</em> they can not give rise to complete individuals from their cut body parts. It is so because in these multicellular organisms, most of the body cells have become specialized to form tissues; tissues make up organs; organs together form organ systems; and finally organ systems come together to function as organisms. For instance, dog is a complex multicellular organism. If it accidentally cuts its tail, new organism cannot be regenerated from the cut part.</p>,

  <p key="b1-p23" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3.2.1.4. Budding :</strong> Formation of a daughter individual from a small projection, the <strong>bud</strong>, arising on the parent body is called <strong>budding</strong>. Thus,</p>,

  <Fig key="fig-3-4"
    src={CONTENT_IMAGES.CONTENT_IMAGE_6B0AB2683E01222E0C46}
    caption="Fig. 3.4. Regeneration in Planaria"
    width="43%" />,

  <DefBox key="def-budding"><strong>Budding</strong> may be defined as the production of new individual from an outgrowth of the parent individual.</DefBox>,

  <p key="b1-p24" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Budding occurs in yeast, some protozoans and certain lower animals (<em>e.g., Hydra, Scypha, Syllis, Salpa,</em> etc.) In multicellular organisms, such as <em>Hydra</em> (Fig. 3.5), a bulging on the body appears as a result of repeated mitotic divisions in the cells. It results in the formation of a lateral outgrowth, called bud. The bud enlarges in size by further divisions of the cells and attains the shape of parent to which it is attached. Finally, it separates from the parent body and starts behaving as new <em>Hydra</em>.</p>,

  <Fig key="fig-3-5"
    src={CONTENT_IMAGES.CONTENT_IMAGE_59656AA0F8C75EA4B6FD}
    caption="Fig. 3.5. Hydra reproducing asexually by budding"
    width="56%" />,

  <p key="b1-p25" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Budding is the most common method of asexual reproduction in <strong>budding yeast</strong> (a fungus : <em>Saccharomyces</em>) that takes place under favourable conditions (<em>i.e.,</em> when it grows in sugar solution). During this process a small bud-like outgrowth appears at one end of the parent cell which gradually enlarges in size (Fig. 3.6). The nucleus enlarges and divides into two daughter nuclei. One daughter nucleus goes into the bud and the other remains in the parent cell. Gradually the bud becomes almost of the same size as the parent cell. Then a constriction appears at the base of bud and a separating wall is laid down. Sometimes a bud may produce another bud over it which is still attached to parent cell forming a false mycelium or pseudomycelium.</p>,

  <Fig key="fig-3-6"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C018C3FA9BB54BDD4736}
    caption="Fig. 3.6. Budding in yeast"
    width="59%" />,

  <ActivityBox key="act-3-2" num="3.2" sub="To examine asexual reproduction in yeast by budding.">
    <ActHd>Requirements.</ActHd>
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Conical flask, test tube, cotton plug, water, sugar, yeast granules, slide, coverslip, microscope.</p>
    <ActHd>Method.</ActHd>
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Pour 100 ml of water in a conical flask and dissolve 10 grams of sugar in it. Take 20 ml of this solution in a test tube and add a small amount of yeast granules to it. Shake well and then close the mouth of tube with the help of a cotton plug. Keep the test tube containing sugar solution and yeast in a warm place for 1 to 5 hours till a froth is observed. Now take out a small quantity of yeast culture from the test tube with the help of a dropper and put a drop on a clean and dry glass slide. Cover the drop with a coverslip and observe under a microscope.</p>
    <ActHd>Observation and Conclusion.</ActHd>
    <p style={{ margin:"0", textAlign:"justify" }}>Transparent and oval cells of yeast are seen under high power of microscope. These cells show budding that appear on the outside of the cell wall.</p>
  </ActivityBox>,

  <p key="b1-p26" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3.2.1.5. Spore formation :</strong> Spores are usually produced in sporangia (sing. sporangium). The non-flagellated and non-motile (those which can not swim) spores are called aplanospores. The flagellated and motile spores are called zoospores. Thus,</p>,

  <DefBox key="def-spore"><strong>A spore</strong> is a single or several celled reproductive structure that detaches from the parent and gives rise, directly or indirectly, to a new individual.</DefBox>,

  <p key="b1-p27" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Reproduction by the formation of spores is a common method of asexual reproduction in some bacteria and most of the fungi. During the formation of spores (aplanospores or zoospores) the fungal hypha develops an enlarged <strong>sporangium</strong>. The nucleus of developing sporangium divides several times. Each nucleus, within the developing sporangium, gets surrounded by a bit of cytoplasm and develops into a spore (Fig. 3.7). The spores mature inside the sporangium. They are liberated by rupturing of sporangial walls and dispersed to grow on new substratum. Each spore grows into a new hypha after germinating in new habitat, ground or substratum. Examples, <em>Rhizopus, Mucor, Aspergillus, Penicillium,</em> etc.</p>,

  <Fig key="fig-3-7"
    src={CONTENT_IMAGES.CONTENT_IMAGE_257D39D863E0A180F126}
    caption="Fig. 3.7. Formation of sporangia and spores in a fungus (Rhizopus)"
    width="36%" />,

  <ActivityBox key="act-3-3" num="3.3" sub="To examine growth of bread mould fungus (Rhizopus) on the moist slice of bread.">
    <ActHd>Requirement.</ActHd>
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Moist slice of bread, Petridish, magnifying glass.</p>
    <ActHd>Method.</ActHd>
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Wet a slice of bread in water and place it in a petridish or watch glass. Keep the moist slice of bread in a cool and dark place for 1–2 days. Observe the slice with the help of a magnifying glass.</p>
    <ActHd>Observations and Conclusion.</ActHd>
    <p style={{ margin:"0", textAlign:"justify" }}>A white cottony mass appears on the surface of moist bread which turns black within few days. The white cottony mass is due to growth of bread mould (<em>Rhizopus</em>). The spores of fungus are present in the air. They settle on the moist bread and germinate to form white cottony mass of vegetative mycelium. The vegetative mycelium develops asexual sporangia which are black in colour. Each sporangium contains hundreds of minute black-coloured spores. These spores are dispersed in air to germinate on suitable substratum.</p>
  </ActivityBox>,

  <p key="b1-p28" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3.2.1.6. Parthenogenesis :</strong> It means "virgin birth". It occurs when an embryo develops from an unfertilized egg. This is surprisingly common in some insects (<em>e.g.,</em> aphids, ants and bees), reptiles (some lizards and snakes), and even some birds. In some species, it is the only method of reproduction, while in others, they can switch between sexual reproduction and parthenogenesis depending on environmental conditions.</p>,

  <SubSubHd key="sub-s3217" id="s3217" label="3.2.1.7" title="Vegetative Propagation in Plants" />,

  <p key="b1-p29" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Vegetative propagation in plants is a method of asexual reproduction in which the parts other than seeds are used as propagules (<em>i.e.,</em> the structural unit that is employed in place of seed). In fact, it is a method of propagation in those plants which have lost their capacity to produce seeds or produce non-viable seeds (<em>e.g.,</em> Banana, seedless Grapes, Rose, Pineapple, etc.) Among flowering plants, every part of the body, such as root, stem, leaf or bud takes part in vegetative propagation.</p>,

  <p key="b1-p30" style={{ margin:"0 0 6px", textAlign:"justify" }}>Some most common <strong>natural methods of vegetative propagation</strong> in plants are :</p>,
  <p key="b1-p31" style={{ margin:"0 0 5px", textAlign:"justify" }}>(<em>i</em>) Modified tuberous roots can be propagated vegetatively when planted in soil (<em>e.g.,</em> Sweet potato).</p>,
  <p key="b1-p32" style={{ margin:"0 0 5px", textAlign:"justify" }}>(<em>ii</em>) The buds present on the roots can grow into leafy shoots (<em>e.g.,</em> Guava).</p>,
  <p key="b1-p33" style={{ margin:"0 0 5px", textAlign:"justify" }}>(<em>iii</em>) Underground modified stems such as rhizomes (<em>e.g.,</em> Ginger, <em>Eichhornia</em> or water hyacinth, etc.), corms (<em>e.g.,</em> Colocasia, Banana, etc.), bulbs (<em>e.g.,</em> Garlic, Onion, etc.), etc.</p>,
  <p key="b1-p34" style={{ margin:"0 0 8px", textAlign:"justify" }}>(<em>iv</em>) Some plants develop adventitious buds on their leaves which develop into new plants (<em>e.g., Bryophyllum</em>). (Fig. 3.8)</p>,

  <Fig key="fig-3-8"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0E35C0556A3F29469CBB}
    caption="Fig. 3.8. A Bryophyllum leaf showing adventitious buds."
    width="20%" />,

  <ActivityBox key="act-3-4" num="3.4" sub="To study the vegetative propagation of potato.">
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Take an average size potato tuber and observe its surface. Note down that the surface shows presence of notches (or buds). Cut it into small pieces in such a way that some pieces contain a notch or bud and some do not. Sprinkle these pieces over a wet cotton placed on a tray. Mark those pieces which have buds in them. Keep the tray aside for a few days (Make sure that the cotton is kept moistened). Observe the changes taking place in these potato pieces.</p>
    <p style={{ margin:"0", textAlign:"justify" }}>Within few days, fresh green shoots and roots begin to come out from the sites of notches (or buds). The pieces having no notches fail to give rise shoots and roots. This shows that new shoots arise from buds present inside the notches.</p>
  </ActivityBox>,

  <ActivityBox key="act-3-5" num="3.5" sub="To demonstrate that money plant propagates vegetatively if the stem cuttings have nodes.">
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Cut stem of a money plant in such a way that one piece of stem possess a leaf. Name it as (A). Cut another piece of stem in such a way that it has no leaf, <em>i.e.,</em> the portion between two leaves. Call it as (B). The leaves arise from nodal portion of stem which possesses an axial bud in between the leaf and the stem, <em>i.e.,</em> at the node. Dip one end of stem (A) in water and keep the other end free in atmosphere. Similarly, dip one end of stem (B) in water and keep the other end free. Observe over the next few days.</p>
    <p style={{ margin:"0", textAlign:"justify" }}>It will be observed that a young shoot arises from the node of stem (A) whereas no shoot arises from stem (B). This observation concludes that the presence of a node in stem cutting is needed for appearance of roots and young shoot. The young shoot never arises from internodal region in stem cuttings.</p>
  </ActivityBox>,

  <p key="b1-p35" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Artificial methods of vegetative propagation</strong> are man-made and developed by plant growers and Horticulturists for commercial production of crops. Some common artificial methods are : (<em>i</em>) Cutting, (<em>ii</em>) Layering, (<em>iii</em>) Grafting.</p>,

  <p key="b1-p36" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>(<em>i</em>) Cutting.</strong> The small piece of any plant organ (stem, root or leaf) used for propagation is called cutting. Stem cuttings are most commonly employed for propagation of many horticultural plants such as grape, phalsa, rose, sugar cane, etc. In this method, about 20–30 cm long pieces of stem are planted in natural position in the wet soil. It gives off roots from the lower end and shoot buds from the aerial nodes. A cutting develops a new plant, similar to the parent plant. The plants such as rose, grapes, sugarcane, banana, cactus, <em>Bougainvillea, Chrysanthemum</em> etc. can be grown by means of cuttings.</p>,

  <p key="b1-p37" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>(<em>ii</em>) Layering</strong> (Fig. 3.9). In layering, the roots are artificially induced on the stem branches before they are detached from the parent plant for propagation. Layering is done by two common methods: (<em>a</em>) Mound layering and (<em>b</em>) Air layering. Jasmine plant is generally propagated by layering.</p>,

  <Fig key="fig-3-9a"
    src={CONTENT_IMAGES.CONTENT_IMAGE_6E9C23906520142C78E5}
    caption=""
    width="37%" />,

  <Fig key="fig-3-9b"
    src={CONTENT_IMAGES.CONTENT_IMAGE_2F8F25573EDA6073AA93}
    caption="Fig. 3.9. A–B Vegetative propagation by layering"
    width="32%" />,

  <p key="b1-p38" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>(<em>iii</em>) Grafting</strong> (Fig. 3.10). Grafting is a method in which parts of two plants are joined in such a way that they grow as one plant. Grafting is done between the two closely related dicotyledonous plants having vascular cambia. The rooted plant in which grafting is performed is called the <strong>stock</strong>. The portion of other plant (bud, branch, etc.) that is grafted on to the stock is called <strong>scion</strong>. During grafting, about 4–12 inches long scion, with all the buds intact, is placed on the cut end of the stock and tied in such a way that the cambium of the two come in contact with each other. The joint is covered with a layer of wax or clay to prevent the evaporation of water or entry of pathogen. All the buds of stock must be removed.</p>,

  <Fig key="fig-3-10"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0857C5FE3F454AD9FA0D}
    caption="Fig. 3.10. Different stages in grafting"
    width="42%" />,

  <TableScionStock key="b1-t3" />,

  <p key="b1-p39" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Generally, the stock belongs to a wild variety which possesses an efficient root system. A very young scion can be made to flower if grafted on a mature stock. Similarly, single stock can support many scions belonging to different varieties. For example, a mature stock of citrus can support the grafting of sweet orange, lemon, lime and grape fruit. Apple, pear, peach and apricot trees are often propagated by grafting.</p>,

  <p key="b1-p40" style={{ margin:"0 0 5px" }}><strong>Advantages of grafting method.</strong> Following are some of the advantages of grafting method of artificial propagation :</p>,
  <p key="b1-p41" style={{ margin:"0 0 4px" }}>(<em>i</em>) Grafting enables us to combine desirable characteristics of two plants.</p>,
  <p key="b1-p42" style={{ margin:"0 0 4px" }}>(<em>ii</em>) It enables a young scion (shoot of one plant) to grow quickly to produce flowers and fruits when grafted to the stock of a mature plant.</p>,
  <p key="b1-p43" style={{ margin:"0 0 8px" }}>(<em>iii</em>) It can be used to produce varieties of seedless fruits.</p>,

  <p key="b1-p44" style={{ margin:"0 0 5px" }}><strong>Advantages of Vegetative Propagation.</strong> Artificial vegetative propagation has the following advantages :</p>,
  <ol key="b1-ol1" style={{ paddingLeft:28, listStyleType:"decimal", fontSize:14, lineHeight:1.8, margin:"0 0 8px" }}>
    <li>It is a quick method of propagation.</li>
    <li>The new plants produced by artificial propagation are exactly like the parent plants.</li>
    <li>Many plants can be grown from one plant by vegetative propagation.</li>
    <li>Seedless plants can also be produced by vegetative propagation.</li>
    <li>Different parts of plants, <em>e.g.,</em> roots, stems, leaves or buds can be used to produce new plants in such cases which can not produce seeds or produce non-viable seeds.</li>
  </ol>,

  <p key="b1-p45" style={{ margin:"0 0 5px" }}><strong>Disadvantages of vegetative propagation.</strong></p>,
  <p key="b1-p46" style={{ margin:"0 0 4px" }}>(<em>i</em>) These methods can be used only in plants which can not produce seeds or produce non-viable seeds.</p>,
  <p key="b1-p47" style={{ margin:"0 0 4px" }}>(<em>ii</em>) The new plants look exactly like their parent plant and reveal no variations.</p>,
  <p key="b1-p48" style={{ margin:"0 0 8px" }}>(<em>iii</em>) Seeds of desired quality may not be formed in asexually propagating plants.</p>,
];

// ── TABLE SUB-COMPONENTS (Batch 2) ─────────────────────────────

const LIGHT_P2 = "#f9eef4";
const P_COLOR2 = "#c0126a";

function TableExtIntFert() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.3. Differences between External Fertilization and Internal Fertilization
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["External Fertilization","Internal Fertilization"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P2, fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["1. It occurs outside the body of the female organism.","1. It occurs inside the body of the female organism."],
            ["2. Both male and the female discharge their gametes outside their body.","2. Male discharges the gametes into the reproductive tract of the female. The female releases the gametes inside its reproductive tract."],
            ["3. It is not a sure method of fertilization.","3. It is a sure method of fertilization."],
            ["4. Embryo develops unprotected, outside the body of the female.","4. Embryo is well protected but may develop outside or inside the body of the female."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableSelfCross() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.4. Differences between Self Pollination and Cross Pollination
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["Self Pollination","Cross Pollination"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P2, fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["1. It is the transfer of pollen grains from anther to the stigma of the same flower.","1. It is the transfer of pollen grains from the anther of one flower to the stigma of another flower."],
            ["2. It does not require an external agency for the transfer of pollen grains.","2. It requires an external agency for the transfer of pollen grains from one flower to another."],
            ["3. Such bisexual flowers produce small number of pollen grains.","3. Such flowers produce large number of pollen grains."],
            ["4. It does not bring variations.","4. It brings about large number of variations."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableOvuleSeed() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.5. Differences between Ovule and Seed.
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["Ovule","Seed"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P2, fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["1. Ovule is immature, i.e., \"pre-seed\" structure before fertilization.","1. Seed is mature, developed ovule after fertilization."],
            ["2. Ovule is found inside the ovary of a flower.","2. Seed is found inside the fruit."],
            ["3. Ovule is designed to receive pollen and develop into a seed.","3. Seed is designed for reproduction, dispersal, and germination."],
            ["4. Ovule consists of integuments, nucellus, and the embryo sac.","4. Seed consists of a seed coat (testa), cotyledon(s), and an embryo."],
            ["5. In an ovule, the micropyle is the entry point for the pollen tube.","5. In a seed, the micropyle allows the entry of water and air during germination."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableOvaryFruit() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.6. Differences between Ovary and Fruit.
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["Ovary","Fruit"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P2, fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["1. Ovary is the part of carpel (female reproductive organ) of the flower before fertilization.","1. Fruit is the developed ovary after fertilization."],
            ["2. Ovary contains ovule(s).","2. Fruits contain seeds."],
            ["3. Ovary serves the functions of (i) receiving pollen at the stigma, (ii) development of pollen tube in style, and (iii) double fertilization in the ovule.","3. Fruit serves as food for many animals, and also plays a role in seed dispersal."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT (Batch 2) ─────────────────────────────────────────
const content_b2 = [
  <SubSubHd key="sub-s3218" id="s3218" label="3.2.1.8" title="Propagation by Plant Tissue Culture" />,

  <p key="b2-p1" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>This method includes propagation of plants by culturing the cells, tissues and organs. In this method, the plant cells or tissues are cultured on a sterilized (free from microorganisms) medium containing necessary nutrients and hormones. A proper medium is important in plant tissue culture technique. The culturing of cells or tissues results in the formation of an undifferentiated mass of cells, called <strong>callus</strong>. Callus is a fast growing cellular mass, which is then transferred to another medium for differentiation of plantlets. The plantlets are then transplanted to separate pots or nursery beds and allowed to grow for a definite period of time. The mature plants are then transplanted in the fields. This technique is employed for quick multiplication of commercially important plants, such as Orchids, Dahlia, Gladiolus, Chrysanthemum, Carnation, etc.</p>,

  <p key="b2-p2" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Figure 3.11 shows a summarised account of the different types of asexual reproduction.</p>,

  <FeatureBox key="feat-maheshwari" title="● Contributions of Prof. Panchanan Maheshwari">
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Prof. Panchanan Maheshwari was an eminent Indian botanist who revolutionized our understanding of <strong>plant embryology</strong>, the study of how plant embryos develop from a fertilized egg. He is known for his discovery of the technique of test tube fertilization (<em>in-vitro</em> fertilization) of flowering plants (angiosperms). He successfully fertilized ovules (which contain the female egg cell) with the pollen in a test tube. It led to the foundation of plant cell and tissue culture research in India. His work was especially important for agriculture and horticulture.</p>
    <p style={{ margin:"0", textAlign:"justify" }}>Test tube fertilization or <em>in-vitro</em> fertilization is a technique involving fertilization where the egg is fused with the sperm outside, <em>i.e.,</em> in a glass or test tube. The whole process is monitored under controlled conditions as the fertilized egg is developed into an embryo. With the invent of this technique, it becomes easier to develop the plant varieties that earlier cannot be produced by natural crossbred technique.</p>
  </FeatureBox>,

  <Fig key="fig-3-11"
    src={CONTENT_IMAGES.CONTENT_IMAGE_5884821EB083CEA7D9B6}
    caption="Fig. 3.11. A summarised account of the different modes of asexual reproduction"
    width="34%" />,

  <SubHd key="sub-s322" id="s322" label="3.2.2" title="Sexual Reproduction" />,

  <DefBox key="def-sexrep"><strong>Sexual reproduction</strong> may be defined as the production of offsprings (new individuals) by the fusion of two gametes (usually one from male parent and the other from female parent) to form a diploid zygote which develops into a mature organism.</DefBox>,

  <p key="b2-p3" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The act of fusion of gametes is called <strong>fertilisation</strong>, which may be defined as <strong>"fusion of two gametes to form a single cell (zygote)."</strong></p>,

  <p key="b2-p4" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>As stated earlier, the sexual mode of reproduction involves two individuals – one acting as <strong>male</strong> and the other acting as <strong>female</strong>. Sometimes, the individual is one but the sex organs are separate (as in many plants) which produce different gametes. In any case, the two gametes, belonging to different sex, fuse with each other to form a zygote leading to the development of a new generation. In most of the cases, formation of gametes involves meiosis so that the chromosome number becomes half in gametes. For example, if an organism is diploid, <em>i.e.,</em> the somatic cells of the organism have 2<em>n</em> number of chromosomes, the meiosis in gamete formation results in the production of haploid (<em>n</em>) gametes. Fertilisation brings about fusion of nuclei of gametes. The two nuclei (belonging to two gametes) each having single set of chromosomes (haploid), fuse to form zygote having a double set of chromosomes, <em>i.e.,</em> diploid (one set paternal and the other set maternal). The zygote develops into an adult body of the organism.</p>,

  <p key="b2-p5" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In majority of animals, including human beings, male and female individuals are separate, <em>i.e.,</em> an individual may be either male or female. Such organisms are called <strong>unisexual</strong>, <em>i.e.,</em> they have only one sex in one individual. Some plants are also unisexual <em>e.g.,</em> Papaya, Cucurbits, etc. But majority of flowering plants and a few animals (like tapeworm, earthworm, garden snail, star fish, etc.) are <strong>bisexual</strong> or <strong>hermaphrodite</strong>, <em>i.e.,</em> each individual has both male and female sex organs.</p>,

  <p key="b2-p6" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Higher animals possess gonads, the primary sex organs. The gonads produce haploid gametes by meiotic (reduction) division. The testis, which are male gonads, produce sperms after meiosis in primary spermatocytes. The ovaries (sing. ovary), which are female gonads, produce eggs or ova after meiosis in primary oocytes. Meiosis is an essential feature of sexual life cycle which provides mechanism for reducing the chromosomes by half. This ensures production of diploid number of chromosomes in zygote, when the gametes fuse.</p>,

  <p key="b2-p7" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>External and Internal Fertilisation.</strong> In certain aquatic animals (such as fishes and amphibians), the gametes are shed outside the body and fertilisation takes place outside. It is called <strong>external fertilisation</strong>. In terrestrial animals, fertilisation is internal. In case of reptiles, birds and mammals, including human beings, the male gametes are inserted into the female's reproductive tract where fertilisation takes place. Transfer of male gametes from testis into the female reproductive tract occurs at the time of mating or copulation. The organs involved in the process of mating are called copulatory organs or accessory sex organs.</p>,

  <TableExtIntFert key="b2-t1" />,

  <p key="b2-p8" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Advantages of sexual reproduction over asexual reproduction.</strong> Sexual reproduction has several advantages over asexual reproduction because it involves: (<em>i</em>) Fusion of male and female gametes coming from male and female organisms. Since the fusing gametes come from two different and sexually distinct individuals, the offsprings exhibit <strong>diversity of characters</strong>, and (<em>ii</em>) Meiosis during gametogenesis provides opportunities for <strong>new combination of genes</strong>. It plays a prominent role in the <strong>origin of new species</strong> and leads to variation required for evolution.</p>,

  <p key="b2-p9" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Gamete formation, inside the gonads of diploid organisms, involves <strong>meiosis</strong> or reduction division. The gamete mother cell is diploid (2<em>n</em>), <em>i.e.,</em> it has two sets of chromosomes. This single diploid cell divides by <strong>meiosis</strong> to form 4 haploid daughter cells. Each daughter cell becomes a gamete, either male or female. Each gamete possesses single set of chromosomes. That means this division involves copying of the DNA as well as the cellular apparatus. There is a stage in such nuclear division where <strong>crossing over</strong> of chromosomes takes place. This is very important step which results in a slight different composition of chromosomes in gametes. Fusion of these gametes results in the formation of a slightly different individuals which show <strong>variations</strong>. The variations which lead to the appearance of such characters which fit to the changing environment result in the survival of the species. Chances of variation, therefore, are much more in sexual mode of reproduction as compared to asexual reproduction. Moreover, chances of the production of compatible generations are also more in sexual reproduction.</p>,

  <p key="b2-p10" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The variation generated due to DNA copying during gamete formation moves on to the next generation. This happens by the process of combination of DNA belonging to two different individuals. Again a new variation appears during DNA copying at the time of gamete formation in this generation that has already variations accumulated from previous generations. Thus, two different individuals in a population would have distinct patterns of accumulated variations. Since all the different variations occur in living organisms, it is assumed that these do not have any bad effects. Combining the distinct variations from two or more individuals during sexual reproduction would thus create new combinations of variants.</p>,

  <Fig key="fig-dna-meiosis"
    src={CONTENT_IMAGES.CONTENT_IMAGE_E009DCB727285E30B0C3}
    caption="Diagram showing DNA content change with and without meiosis across generations"
    width="40%" />,

  <p key="b2-p11" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>As stated above, the <strong>meiosis</strong> plays very important role in the life cycle of an organism. We are now aware of the fact that each sexual fusion results in the combination of DNA copies from two individuals doubling the DNA content in the next generation. If there is no meiosis, each new generation will result in having twice the amount of DNA that the previous generation had. If this process continues for few generations, very soon a situation will arise when the amount of DNA will not be accommodated inside the cell and there will be no other cellular contents except DNA. Furthermore, a time will come when there will be only DNA on earth and there will be no room for anything else.</p>,

  <p key="b2-p12" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>To avoid the situation shown above, Nature has solved the problem by creating a special kind of cell division during the formation of gametes. This cell division is called <strong>meiosis</strong> or reduction division. During meiosis, the chromosome number or DNA content of parents becomes half in their gametes. Again the number becomes same in the next generation when the two gametes carrying half chromosome number fuse with each other.</p>,

  <SecHd key="sec-s33" id="s33" label="3.3" title="Sexual Reproduction in Plants" />,

  <p key="b2-p13" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In flowering plants, all the steps of sexual reproduction occur within specialised reproductive organs, called the <strong>flowers</strong>. Thus, a flower may be defined as a <strong>specialized condensed reproductive shoot of flowering plants on which are inserted the essential reproductive parts.</strong></p>,

  <SubHd key="sub-s331" id="s331" label="3.3.1" title="The parts of a flower (Fig. 3.12)" />,

  <p key="b2-p14" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>A typical angiospermous flower consists of four whorls of floral appendages attached on the receptacle. The receptacle is the top of the flower stalk (pedicel). The four whorls of floral appendages are:</p>,

  <p key="b2-p15" style={{ margin:"0 0 4px" }}><strong>1. Calyx or sepals &nbsp;&nbsp;&nbsp;&nbsp; 2. Corolla or petals</strong></p>,
  <p key="b2-p16" style={{ margin:"0 0 8px" }}><strong>3. Androecium or stamen &nbsp;&nbsp;&nbsp;&nbsp; 4. Gynoecium (Pistil) or carpels</strong></p>,

  <p key="b2-p17" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>1. Calyx.</strong> It is the outermost whorl of floral leaves, called <strong>sepals.</strong> Sepals are generally green in colour and protective in function. Occasionally they are brightly coloured.</p>,

  <p key="b2-p18" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>2. Corolla.</strong> It is the collection of <strong>petals.</strong> Petals are generally large, showy and brightly coloured to attract the insect pollinators. Calyx and Corolla are non-essential parts of the flower because they are not directly involved in reproduction.</p>,

  <Fig key="fig-3-12"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C1ECB95439514CD7FE58}
    caption="Fig. 3.12. A typical flower showing floral parts"
    width="57%" />,

  <p key="b2-p19" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3. Androecium.</strong> It is the collection of <strong>stamens, the male reproductive organs of the flower.</strong> Each stamen consists of <strong>anther</strong> and <strong>filament.</strong> The filament is a long stalk that bears an anther at the top. Usually anthers are bilobed and contain four <strong>pollen sacs</strong> (microsporangia). The pollen grains are made inside the pollen sacs. Pollen grains are haploid microspores formed inside the pollen sacs by meiosis (reduction division) in diploid microspore mother cells. Initially, each microspore is uninucleate, but soon it becomes 2–3 nucleate. The two male nuclei along with a little cytoplasm differentiate into two gametes. Thus, each pollen grain produces two male gametes, when germinates to produce pollen tube.</p>,

  <p key="b2-p20" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>4. Gynoecium (or Pistil).</strong> It is the collection of <strong>carpels, the female reproductive organs of the flower.</strong> Each carpel has a swollen <em>ovary</em>, long <em>style</em> and a terminal <em>stigma</em>. If a flower has only one carpel, it is called monocarpellary. Generally, the flowers have more than one carpels, either free or fused. The fused carpels form a single unit consisting of a common ovary, style and stigma. The stigma receives pollen grains during pollination and support their growth. The style bears stigma in a suitable position to receive pollen and also provides passage for the entry of pollen tube. The ovary is the swollen and hollow basal-part that contains ovules. Each ovule has an embryosac that bears a haploid egg–the female gamete.</p>,

  <p key="b2-p21" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In plants, the fusion of male gamete and female gamete (egg) takes place inside the embryosac, which is located inside the ovule. Fusion occurs only when the pollen grains are transferred to the stigma of same or another flower.</p>,

  <SubHd key="sub-s332" id="s332" label="3.3.2" title="Pollination" />,

  <DefBox key="def-pollination"><strong>The transfer of pollen grains from the opened anther of the stamen to the receptive stigma of the carpel is called <span style={{color:P_COLOR2}}>pollination</span>.</strong></DefBox>,

  <p key="b2-p22" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Pollination is an important mechanism by which the pollen grains, produced inside the pollen sacs of anthers, are transported by various agencies to the stigma of female reproductive organ. It is an essential process that facilitates successful fertilisation in plants. The pollen grains protect male gametes from drying out. The common agents responsible for successful pollination are – wind, water, insects, birds, bats and many other living organisms.</p>,

  <p key="b2-p23" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Pollinating Agents.</strong> Whether a plant self-pollinates or cross-pollinates, the pollen does not move on its own. It needs help from an outside force, known as a pollination agent.</p>,

  <p key="b2-p24" style={{ margin:"0 0 6px", textAlign:"justify" }}><strong>• Wind Pollination.</strong> Some plants, like grasses, corn, and many trees such as oaks and pines, simply cast their pollen to the wind. This strategy, called <strong>anemophily</strong>, is a numbers game. These plants produce enormous quantities of lightweight pollen that can travel for miles. Their flowers are usually small and inconspicuous, without the bright colours or sweet nectar needed to attract animals.</p>,

  <p key="b2-p25" style={{ margin:"0 0 6px", textAlign:"justify" }}><strong>• Water Pollination.</strong> For aquatic plants like seagrass, water does the job. This method, called <strong>hydrophily</strong>, is relatively rare. Pollen is released into the water and drifts on currents to other plants.</p>,

  <p key="b2-p26" style={{ margin:"0 0 6px", textAlign:"justify" }}><strong>• Animal Pollination.</strong> Most flowering plants rely on animals to act as couriers. This method is known as <strong>zoophily</strong>. Insects, birds, bats, and even some mammals are lured to flowers by the promise of a reward, usually a sweet liquid called nectar. <em>Nearly 90% of the world's flowering plants require animal pollination, so the whole functioning of the planet is linked to pollinators.</em></p>,

  <p key="b2-p27" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>As an animal feeds, pollen dusts its body. When it moves to the next flower for another meal, it unknowingly transfers some of that pollen. It's an efficient system that benefits both the plant and the pollinator.</p>,

  <p key="b2-p28" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}><strong>Pollination Syndromes.</strong> Plants have developed specific traits to attract their ideal pollinators. This is called a pollination syndrome. For example:</p>,
  <ul key="b2-ul1" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li>Flowers that attract <strong>bees</strong> are often blue or yellow and have a sweet scent.</li>
    <li>Flowers that rely on <strong>hummingbirds</strong> are typically red or orange, tubular in shape, and have no scent (since birds have a poor sense of smell).</li>
    <li>Night-blooming flowers that attract <strong>bats or moths</strong> are often pale and emit a strong, musky odor.</li>
  </ul>,
  <p key="b2-p29" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>This intricate relationship between plants and their pollinators is a beautiful example of coevolution, where two or more species influence each other's evolution.</p>,

  <p key="b2-p30" style={{ margin:"0 0 6px" }}><strong>Types of pollination.</strong> Pollination is of two types: 1. Self pollination &nbsp; 2. Cross pollination</p>,

  <TableSelfCross key="b2-t2" />,

  <p key="b2-p31" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>1. Self Pollination.</strong> Self pollination involves the transfer of pollen grains from the anther of a flower to the stigma of the same flower or to the stigma of another flower borne on the same plant.</p>,

  <p key="b2-p32" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>2. Cross Pollination.</strong> Cross pollination involves the transfer of pollen grains from the flower of one plant to the stigma of the flower of another plant of the same species. This process introduces genetic diversity, which can help a plant species to adapt to changing environments.</p>,

  <SubHd key="sub-s333" id="s333" label="3.3.3" title="Fertilization in Plants (Fig. 3.13)" />,

  <Fig key="fig-3-13"
    src={CONTENT_IMAGES.CONTENT_IMAGE_F4432DB248EF5219925F}
    caption="Fig. 3.13. Fertilization in a flowering plant"
    width="39%" />,

  <p key="b2-p33" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Pollination results in the deposition of related pollen grains over the receptive stigma of the carpel. They absorb water, swell and then germinate to produce pollen tubes. One pollen tube grows into the stigma, passes through the style and then moves towards the ovarian cavity. Two non-motile male gametes are formed inside the tube during its growth through the style. After reaching the ovary, pollen tube enters the ovule through the micropyle. The tip of the tube finally pierces the egg apparatus end of the embryosac. After penetration, the tip of pollen tube ruptures releasing two male gametes into the embryosac. The mature embryosac consists of an egg apparatus (one haploid egg and two synergids), two polar nuclei and three antipodal cells.</p>,

  <p key="b2-p34" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>During the act of fertilization, one male gamete fuses with the egg to form the diploid <strong>zygote</strong>. The process is called <strong>syngamy</strong> (or generative fertilisation). The diploid zygote finally develops into <strong>embryo</strong>. The other male gamete fuses with the two polar nuclei to form the triploid (3N) primary endosperm nucleus. The process is called <strong>triple fusion</strong> (or vegetative fertilisation). This mechanism involving two acts of fertilisation in an embryosac is called <strong>double fertilisation</strong>.</p>,

  <p key="b2-p35" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Seed and Fruit Formation.</strong> Once fertilization is complete, a remarkable transformation begins. The flower, having served its purpose of attracting pollinators and enabling fertilization, starts to change. Its vibrant petals may wither and fall away. The ovary, which housed the ovules, begins to swell and mature. It becomes the fruit. At the same time, each fertilized ovule inside the ovary develops into a seed. Inside every seed is a dormant embryo, complete with stored food and a protective outer layer. After fertilization, the ovule's outer layers, called integuments, harden to become the tough <strong>seed coat</strong>. This seed coat protects the delicate contents from drying out, physical damage, and pests.</p>,

  <TableOvuleSeed key="b2-t3" />,
  <TableOvaryFruit key="b2-t4" />,

  <ActivityBox key="act-3-6" num="3.6" sub="To observe the different parts of a seed.">
    <p style={{ margin:"0 0 6px", textAlign:"justify" }}>Soak a few seeds of Bengal gram (<em>Chana</em>) in a beaker and keep them overnight. Decant excess water and keep the seeds in a wet cloth. Leave them for a day. Now the seeds get germinated by giving out a few mm of radicle. Cut open the seeds carefully to observe the different parts.</p>
    <p style={{ margin:"0", textAlign:"justify" }}>Observe the brown coloured testa that encloses two cotyledons laden with stored food material. A small embryo consisting of radicle and plumule lies in between the two cotyledons.</p>
  </ActivityBox>,

  <Fig key="fig-3-14"
    src={CONTENT_IMAGES.CONTENT_IMAGE_46904199CADD38A0429D}
    caption="Fig. 3.14. Seed of Bengal gram (chana) dissected to show the structure"
    width="47%" />,

  <p key="b2-p36" style={{ textAlign:"center", fontStyle:"italic", fontSize:13, margin:"6px 0 4px" }}>A summarised account of sexual reproduction in plants is diagrammatically represented in Figure 3.15.</p>,

  <Fig key="fig-3-15"
    src={CONTENT_IMAGES.CONTENT_IMAGE_E4B3B56FD63092BC8AEB}
    caption="Fig. 3.15. A summarised account of sexual reproduction in flowering plants"
    width="51%" />,

  <FeatureBox key="feat-seed-dispersal" title="● Seed Dispersal">
    <p style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Once the seed is formed, it has to grow into a new plant. If it simply falls to the ground beneath its parent, it will have to compete for sunlight, water and soil nutrients. This intense competition can stunt its growth or even prevent it from sprouting at all. Therefore,</p>
    <DefBox key="def-seeddis"><strong>Seed dispersal,</strong> is a vital process where plants spread their seeds away from the parent plant to prevent overcrowding, and allowing colonization of new areas for better survival, growth, and genetic diversity.</DefBox>
    <p style={{ margin:"0 0 6px" }}><strong>Methods of Seed Dispersal.</strong> Seed dispersal involves many agents, both <strong>abiotic</strong> and <strong>biotic</strong>. Wind, water and gravity are abiotic agents of seed dispersal. On the other hand, animals and explosive/force are biotic agents of seed dispersal.</p>
    <ul style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 6px", fontSize:14, lineHeight:1.8 }}>
      <li><strong>Wind (Anemochory).</strong> Light seeds with wings (<em>e.g.,</em> maples) or fluffy parachutes (<em>e.g.,</em> dandelions) are carried by wind to far off places.</li>
      <li><strong>Water (Hydrochory).</strong> Seeds or fruits, like coconuts, float on water to new locations.</li>
      <li><strong>Gravity (Barochory).</strong> Heavy fruits simply fall and roll away from the parent plant (<em>e.g.,</em> acorns).</li>
      <li><strong>Animals (Zoochory).</strong>
        <ul style={{ paddingLeft:20, listStyleType:"circle", marginTop:4, lineHeight:1.7 }}>
          <li><strong>Ingestion.</strong> Animals eat fruits, and seeds pass through their digestive system, are deposited in droppings to places away.</li>
          <li><strong>Hitching a Ride.</strong> Seeds with hooks or barbs (<em>e.g.,</em> burrs, burdock) get attached to fur of animals or feathers of birds to reach to new locations.</li>
          <li><strong>Caching.</strong> Squirrels bury nuts away from the collection sites, forgetting some, allowing them to sprout later.</li>
        </ul>
      </li>
      <li><strong>Explosive/Force.</strong> In some plants, seed pods dry and burst open, forcefully ejecting seeds away from the parent plant (<em>e.g.,</em> touch-me-not plant, sandbox tree).</li>
    </ul>
    <p style={{ margin:"0 0 4px" }}><strong>Importance :</strong></p>
    <ul style={{ paddingLeft:28, listStyleType:"disc", margin:"0", fontSize:14, lineHeight:1.8 }}>
      <li><strong>Reduces competition.</strong> Seed dispersal prevents seedling from competing with the parent plant for light, water, and nutrients.</li>
      <li><strong>Colonization.</strong> It allows plants to spread to new, potentially more favourable habitats.</li>
      <li><strong>Genetic diversity.</strong> It promotes cross-pollination and maintains healthy gene pools.</li>
      <li><strong>Ecosystem health.</strong> Seed dispersal is essential for forest regeneration and maintaining biodiversity.</li>
    </ul>
  </FeatureBox>,

  <SecHd key="sec-s34" id="s34" label="3.4" title="Reproduction in Human Beings" />,

  <p key="b2-p37" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Human beings are <strong>unisexual</strong> and the human reproduction is highly evolved. There is a distinct sexual dimorphism, <em>i.e.,</em> males are visibly different from females in physical buildup, external genital organs and accessory (external) sex characters. Thus, the structures associated with reproduction are different in males and females. The structures associated with male reproduction constitute the <strong>male reproductive system</strong>. Similarly, the structures associated with female reproduction constitute the <strong>female reproductive system</strong>. The reproductive systems of males and females consist of many organs which are distinguishable into primary and secondary sex organs.</p>,

  <SubHd key="sub-s341" id="s341" label="3.4.1" title="Primary and Secondary Sex Organs" />,

  <p key="b2-p38" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The primary sex organs are <strong>gonads</strong>, which produce <strong>gametes</strong> (or sex cells) and secrete sex hormones. The gonads of the male are called <strong>testes</strong> which produce male gametes – <strong>sperms</strong> and the male hormone – <strong>testosterone.</strong> The gonads of the female are <strong>ovaries</strong> which produce female gametes – <strong>ova</strong> and female hormones – <strong>estrogen</strong> and <strong>progesterone.</strong></p>,

  <p key="b2-p39" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The secondary sex organs include the genital ducts and glands which help in transportation of gametes and reproductive process. They do not produce gametes or secrete hormones.</p>,

  <SubHd key="sub-s342" id="s342" label="3.4.2" title="Primary and Secondary Sexual Characters" />,

  <p key="b2-p40" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Primary sexual characters are those present at birth, whereas secondary sexual characters are those that develop at puberty.</p>,

  <DefBox key="def-puberty"><strong>Puberty</strong> is the age of human males and females at which the reproductive organs become functional, gonads start producing gametes and sex hormones, and the boys and the girls become sexually mature.</DefBox>,

  <p key="b2-p41" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>It is attained between the age of 13 to 14 years in males and between 10 to 12 years in females.</p>,

  <p key="b2-p42" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In males, puberty is triggered by the secretion of the hormone – <strong>testosterone</strong> from the testes. The hormone brings about the development of secondary sexual characters during puberty and maintains these throughout adult life.</p>,

  <p key="b2-p43" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In females, puberty is triggered by the production of the hormone – <strong>estrogen</strong> from the ovaries. This hormone brings about the growth and maturation of the reproductive tract and the development of secondary sexual characters. Puberty changes a girl child into a women fit to bear children.</p>,

  <p key="b2-p44" style={{ margin:"0 0 5px" }}><strong>(<em>i</em>) Secondary sexual characters in human males.</strong> The secondary sexual characters in human males include:</p>,
  <ol key="b2-ol1" style={{ paddingLeft:28, listStyleType:"decimal", fontSize:14, lineHeight:1.8, margin:"0 0 8px" }}>
    <li>Enlargement of penis and scrotum.</li>
    <li>Broadening of the shoulders and increased muscle development.</li>
    <li>Enlargement of larynx and thickening of vocal cords producing deepening of the voice.</li>
    <li>Growth of pubic hair and extra hair on the face, in the armpits and on the chest.</li>
    <li>Changes in behaviour associated with courtship and mating.</li>
    <li>Increase in height.</li>
  </ol>,

  <p key="b2-p45" style={{ margin:"0 0 5px" }}><strong>(<em>ii</em>) Secondary sexual characters in human females.</strong> The secondary sexual characters in human females include:</p>,
  <ol key="b2-ol2" style={{ paddingLeft:28, listStyleType:"decimal", fontSize:14, lineHeight:1.8, margin:"0 0 8px" }}>
    <li>Growth of breasts and external genitalia (vulva).</li>
    <li>Growth of pubic hair and extra hair in the armpits.</li>
    <li>Hair on beard, moustache and chest are lacking.</li>
    <li>Broadening of pelvis.</li>
    <li>Initiation of menstruation and ovulation.</li>
    <li>Increase in the subcutaneous fat, particularly in thighs, shoulders, buttocks and face.</li>
  </ol>,
];

// ── TABLE SUB-COMPONENTS (Batch 3) ─────────────────────────────
const LIGHT_P3 = "#f9eef4";
const P_COLOR3 = "#c0126a";

function TableMenstrualCycle() {
  const rows = [
    ["1st to 5th\n(Menstruation period)","1. In case the fertilization does not occur, the thickened inner lining of the uterus breaks down along with blood vessels. The degenerated part of uterus along with the blood moves out of the vagina in the form of bleeding, called menstruation (the 'period')."],
    ["1st to 13th\n(Proliferative phase)","2. Follicle stimulating hormone (FSH), secreted from pituitary gland, stimulates the development of primary oocyte in primary ovarian follicle.\n3. The developing follicle releases the hormone – estrogen. This hormone stimulates repair and development of the lining of the uterus and fallopian tube. It also regulates maturation of only one follicle so that only one ovum is released at a time."],
    ["14th day","4. The hormone – estrogen builds up conditions so that a mature ovum is released from the ovary into the body cavity which passes into the fallopian tube.\n5. Release of ovum from the ovary is called ovulation."],
    ["15th to 28th\n(Secretory phase)","6. At the same time, another hormone – progesterone is released from the ovary. This hormone stimulates the uterus to maintain its thickening, as well as, glandular activity in uterus and vagina.\n7. Release of progesterone is associated with the increase in body temperature of the female.\n8. In case the fertilisation occurs in the fallopian tube, the two hormones continue to cause thickening of the inner lining of uterus and fallopian tube. They also help in proper implantation of the foetus in the uterine wall.\n(Fertilisation takes place inside the fallopian tube, but the embryo development occurs in the uterus.)\n(The normal functioning of ovaries and uterus stop during pregnancy. Ovulation is stopped and consequently menstruation also stops till the birth of the offspring.)\n9. If no fertilization occurs, then menstruation starts marking the beginning of next cycle."],
  ];
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            <th style={{ background:LIGHT_P3, fontWeight:700,
              fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
              padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center", width:"28%" }}>
              Example of dates (given for understanding)
            </th>
            <th style={{ background:LIGHT_P3, fontWeight:700,
              fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
              padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>
              Events of oogenesis and menstrual cycle
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([date, events], i) => (
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8", verticalAlign:"top" }}>
              <td style={{ fontSize:13, padding:"6px 10px", border:"1px solid #d0b0c0",
                textAlign:"center", whiteSpace:"pre-line", fontWeight:600 }}>{date}</td>
              <td style={{ fontSize:13.5, padding:"6px 10px", border:"1px solid #d0b0c0",
                whiteSpace:"pre-line" }}>{events}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableMenarcMenopause() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        TABLE 3.7. Differences between Menarche and Menopause.
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["Menarche","Menopause"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P3, fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["1. It is the stage of initiation of menstruation in the life of female (girl).","1. It is the stage at which menstruation stops in the life of a woman."],
            ["2. It generally occurs at an age of 11–13 years.","2. It occurs in women at an age between 45–50 years."],
            ["3. It refers to the beginning of the reproductive phase in girls.","3. It refers to the end of the reproductive phase in the women."],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableGameteFormation() {
  return (
    <div style={{ margin:"14px 0", overflowX:"auto" }}>
      <p style={{ textAlign:"center", fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:700, fontSize:13, margin:"0 0 6px" }}>
        Comparison of Gamete Formation in Male and Female Human Beings
      </p>
      <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13.5 }}>
        <thead>
          <tr>
            {["Feature","Spermatogenesis (Male)","Oogenesis (Female)"].map((h,i)=>(
              <th key={i} style={{ background:LIGHT_P3, fontWeight:700,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13,
                padding:"6px 10px", border:"1px solid #c8a0b8", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Timing","Begins at puberty; continuous","Begins before birth; monthly cycles from puberty to menopause"],
            ["Meiosis","Uninterrupted process","Arrests at two stages (Prophase-I, Metaphase II)"],
            ["Cytokinesis","Equal division of cytoplasm","Unequal division of cytoplasm"],
            ["Gametes Produced","Four functional sperms per primary cell","One functional egg per primary cell"],
            ["Total Output","Hundreds of millions per day","About 400–500 mature eggs over a lifetime"],
          ].map((row,i)=>(
            <tr key={i} style={{ background: i%2===0?"#fff":"#fdf3f8" }}>
              {row.map((c,j)=>(
                <td key={j} style={{ fontSize:13.5, padding:"5px 10px", border:"1px solid #d0b0c0",
                  verticalAlign:"top", textAlign: j===0?"center":"left" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── CONTENT (Batch 3) ─────────────────────────────────────────
const content_b3 = [
  <SubHd key="sub-s343" id="s343" label="3.4.3" title="Male Reproductive System (Fig. 3.16)" />,

  <p key="b3-p1" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The male reproductive system is designed for one primary function, <em>i.e.,</em> to produce and deliver sperms (male gametes) for fertilization. It is a complex network of external and internal organs, each with a specific job.</p>,

  <p key="b3-p2" style={{ margin:"0 0 5px" }}>It consists of the following organs: <strong>1. Testes &nbsp; 2. Scrotum &nbsp; 3. Vas Deferens &nbsp; 4. Urethra &nbsp; 5. Penis</strong></p>,

  <Fig key="fig-3-16"
    src={CONTENT_IMAGES.CONTENT_IMAGE_FEE8207ACB929A2F9D30}
    caption="Fig. 3.16. Human male's reproductive system (side view)"
    width="39%" />,

  <p key="b3-p3" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>1. Testes</strong> (sing. Testis). The human male (Man) possesses two testes, which are the <strong>primary reproductive organs</strong>, lying outside the abdominal cavity. The two testes are the <strong>male gonads</strong>, which are the sites where male gametes, <em>i.e.,</em> sperms, are made by the process called <strong>spermatogenesis</strong>. The testes also produce the male sex hormone – <strong>testosterone</strong>. The testes of man produce sperms from puberty onwards, throughout his life.</p>,

  <p key="b3-p4" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>2. Scrotum.</strong> The scrotum is a pouch of skin that hangs between the legs. It is divided internally into right and left scrotal sacs by a muscular partition. The two testes lie in respective scrotal sacs. The scrotum acts as a <strong>thermoregulator</strong> and provides an optimal temperature for the formation of sperms. The sperms develop at a temperature 1–3°C lower than the normal body temperature. The life of sperms is greatly reduced if the temperature is higher. During winters, when temperature falls, the scrotum shrinks to bring the testes close to body to get warmth. During summers, when temperature rises, the scrotum becomes relaxed to lose heat.</p>,

  <p key="b3-p5" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3. Vas deferens</strong> (plural vasa deferentia). This is a straight tube, about 40 cm long, which carries the sperms to the seminal vesicles. The sperms are stored temporarily in the seminal vesicle, where mucus and a watery alkaline fluid containing the sugar-fructose, mix with the sperms.</p>,

  <p key="b3-p6" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>4. Urethra.</strong> It is about 20 cm long tube that arises from the urinary bladder to carry urine. It runs through the penis and opens to the outside through male genital pore. The contents of two seminal vesicles, <em>i.e.,</em> sperms from vas deferens also join the urethra. Thus urethra carries urine from the bladder, as well as sperms from the, vasa deferentia, through the penis.</p>,

  <p key="b3-p7" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>5. Penis.</strong> Penis is a long and thick muscular organ made up of mostly erectile tissue. The tip of penis consists of a soft and highly sensitive glans penis, which is covered by a loose, retractable fold of skin, called foreskin. At the time of sexual excitement, the erectile tissue gets filled with blood causing the penis to become erect. It is inserted into the vagina of the female where sperms are ejaculated for the purpose of reproduction.</p>,

  <p key="b3-p8" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In human males, there is only one opening for the urine and sperms to pass out of body. A flow chart showing path of sperms, role of different glands and path of urine is shown in figure 3.17.</p>,

  <Fig key="fig-3-17"
    src={CONTENT_IMAGES.CONTENT_IMAGE_D6A4DFF50B1F51641095}
    caption="Fig. 3.17. A flow chart showing path of sperm and role of different glands in human male reproductive system"
    width="60%" />,

  <SubHd key="sub-s344" id="s344" label="3.4.4" title="Female Reproductive System (Fig. 3.18)" />,

  <p key="b3-p9" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Female reproductive system is more complex as compared to that of males. The complexity of sexual structures in females is due to the fact that it is designed to produce egg cells, to accept sperms from male and to support their movement up to egg, fertilisation and subsequent post fertilisation changes for nurturing the developing foetus. Female reproductive system consists of the following organs: 1. Ovaries &nbsp; 2. Fallopian tubes (Oviducts) &nbsp; 3. Uterus &nbsp; 4. Vagina</p>,

  <Fig key="fig-3-18"
    src={CONTENT_IMAGES.CONTENT_IMAGE_2D47CB85B089D82FF6AE}
    caption="Fig. 3.18. Human female reproductive system (front view)"
    width="34%" />,

  <p key="b3-p10" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>1. Ovaries.</strong> Each human female contains two almond shaped ovaries located in the lower part of abdominal cavity near the kidney. Each ovary is connected by a ligament to the uterus. The ovaries are primary sex organs (or female gonads), which perform the dual function – (<em>a</em>) production of female gametes (eggs or ova) by <strong>oogenesis</strong>, and (<em>b</em>) Secretion of female sex hormones (estrogen and progesterone). Each ovary is composed of <strong>ovarian follicles</strong>, at various stages of development. Each follicle contains a large ovum surrounded by many layers of follicle cells. The production of ova starts at the age of puberty. Usually, one ovum is produced every month during the fertile years of a woman. After menopause, the ovaries become small and lose follicle.</p>,

  <p key="b3-p11" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>2. Fallopian tubes (Oviducts).</strong> A fallopian tube is about 10–12 cm long muscular tube which carries egg from the ovary to the uterus and also provides the appropriate environment for its fertilisation. The funnel-shaped opening end of each fallopian tube lies near the posterior ends of each ovary. The other ends of the long convoluted tubes open into the uterus (Fig. 3.18).</p>,

  <p key="b3-p12" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3. Uterus.</strong> The uterus is a large, inverted pear-shaped, muscular structure that lies behind the bladder. If fertilisation takes place, the embryo gets attached to the wall of uterus and grows there until birth.</p>,

  <p key="b3-p13" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>4. Vagina.</strong> This is a muscular tube about 7–10 cm long whose walls contain elastic tissue. It is well adapted to receive the male's penis during copulation. The vagina is also called <strong>"birth canal"</strong>, as it allows passage of the baby at the time of child birth.</p>,

  <p key="b3-p14" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>In human females, the urinary opening (<em>i.e.,</em> external opening of urethra) and vaginal openings are separate.</p>,

  <SubHd key="sub-s345" id="s345" label="3.4.5" title="Sexual Cycle in Females (Fig. 3.19)" />,

  <p key="b3-p15" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The fertility period of human female begins at the age of puberty (about 10–12 years of age), when one of the two ovaries starts releasing <strong>ovum (female gamete)</strong>. The two ovaries do not release their ova at one time. They alternatively release their ova one after the other and the period between the release of ova is generally 28–30 days. For example, if one ovum is released from left ovary on 1st October, the next ovum is released from the right ovary on 28th to 30th October. The release of ova is controlled by a female hormone (estrogen), which is not secreted constantly but in cycles. Each cycle lasts about 28–30 days, <em>i.e.,</em> one ovum is released per cycle.</p>,

  <p key="b3-p16" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The control centres for production of gametes (ova) are the hypothalamus and the pituitary gland. The hypothalamus stimulates release of follicle stimulating hormone (FSH) and luteinising hormone (LH) from the pituitary gland. These are referred to as gonadotrophic hormones because they control the ovary and other reproductive organs.</p>,

  <DefBox key="def-menstrual"><strong>The cycle of events taking place in female reproductive organs, <em>i.e.,</em> in ovaries and uterus, under the control of sex hormones, in every 28 days and marked by bleeding or menstrual flow, is called <span style={{color:P_COLOR3}}>menstrual cycle</span> (Sexual cycle in Human females).</strong></DefBox>,

  <p key="b3-p17" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}>As stated above, the ovaries and the uterus start exhibiting certain events in cyclic manner at the age of puberty. These events include:</p>,

  <TableMenstrualCycle key="b3-t1" />,

  <p key="b3-p18" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Menarche and Menopause :</strong> At puberty, <strong>the commencement of menstruation is termed menarche.</strong> It marks the beginning of the reproductive life of human female. The reproductive cycles continue to occur till the age of 50 (45 to 55 in Indian women). After this age, the menstruation stops. <strong>Cessation of cycle of events in ovary and uterus around the age of 50 years and stoppage of menstrual flow is termed menopause.</strong> Thus, the normal reproductive life of human female is the period between menarche and menopause.</p>,

  <TableMenarcMenopause key="b3-t2" />,
  <TableGameteFormation key="b3-t3" />,

  <SubHd key="sub-s346" id="s346" label="3.4.6" title="Fertilization (Fig. 3.19)" />,

  <p key="b3-p19" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Internal fertilization is an essential part of reproduction in human beings. This is achieved by <strong>copulation</strong> (or mating). During copulation, the human male inserts his penis into the vagina of the female and releases gametes (sperms) inside the genital tract. This is called <strong>ejaculation</strong>. At a time, approximately 3 cm<sup style={{fontSize:"0.72em"}}>3</sup> of semen (sperm-bearing fluid produced by testes and accessory glands) is discharged during ejaculation, of which about 10% are sperms. They are millions in number. The sperms are deposited at the top of the vagina close to the cervix of uterus. The sperms are highly active and mobile. They travel from here upward through the uterus to the top of fallopian tube within five minutes. There, they spend several hours and undergo many chemical changes. Finally, only one sperm fertilises the ovum in the fallopian tube. <strong>The fusion of sperm nucleus with the egg nucleus to form a diploid zygote is called fertilization.</strong> Fertilisation occurs only when copulation occurs during ovulation period (<em>i.e.,</em> middle of the menstrual cycle). It is marked by the stoppage of menstrual flow. Thus, <strong>stoppage of menstruation (the 'period') is the earliest sign of pregnancy.</strong></p>,

  <SubHd key="sub-s347" id="s347" label="3.4.7" title="Post fertilization changes" />,

  <p key="b3-p20" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Immediately after <strong>conception</strong> (<em>i.e.,</em> fusion of male and female gametes to form a zygote), the embryonic development begins in the fallopian tube. This stage marks the beginning of pregnancy. As the zygote moves from the fallopian tube down towards the uterus, it starts dividing by successive nuclear and cell divisions resulting in the formation of a small multicellular ball of cells by the process, called <strong>cleavage</strong>. The young multicellular embryo, formed as a result of cleavage, is now called <strong>blastocyst</strong>. The blastocyst gets embedded into the thickened inner wall of the uterus. The close attachment of the blastocyst to the uterine wall is called <strong>implantation</strong>. It takes place about seven days after fertilisation.</p>,

  <p key="b3-p21" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Implantation is followed by a number of developmental changes in the blastula, as well as, in the wall of uterus. These changes include the formation of different embryonic layers (ectoderm, mesoderm and endoderm) [No research is allowed on human embryo beyond this stage] and successive development of young <strong>foetus</strong> (embryo). The first organs, formed in developing foetus, are neural tube and spinal cord. These organs begin to develop in the third week. Subsequently, a special umbilical cord develops in the fourth week which establishes an intimate connection between the foetal membrane and the uterine wall, called <strong>placenta</strong>. In the placenta, the foetal blood comes very close to the maternal blood. Here, the exchange of materials between the mother's blood and the blood of foetus take place. The foetus gets nutrients, water, oxygen, minerals, vitamins, etc. from the maternal blood and gives off wastes, carbon dioxide, urea, etc. Thus, <strong>the placenta serves as the nutritive, respiratory and excretory organ of the foetus.</strong></p>,

  <Fig key="fig-3-19"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C4306D196E60A088DD88}
    caption="Fig. 3.19. Flow chart showing path of sperms and ova in female reproductive system in human"
    width="65%" />,

  <p key="b3-p22" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>The complete development of foetus, from the initial stage of conception till the birth of the young one, is called gestation.</strong> It is also termed <strong>pregnancy.</strong> Gestation is completed in about 280 days or 40 weeks from the first day of the last menstruation. Gestation is followed by parturition. <strong>Parturition is the act of expelling the full-term young one from the mother's uterus at the end of gestation.</strong> The new born child, after 280 days of gestation, weighs about 3·5 kg and measures about 240 mm from head to bottom.</p>,

  <SecHd key="sec-s35" id="s35" label="3.5" title="Population Control" />,

  <p key="b3-p23" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Having pregnancies too frequently and giving child birth at quick succession reduce mother's health and vitality and cause mental strain. Large families are also a cause of tension. They also add to our already exploding human population. Thus, there is an urgent need to have a general awareness in our society regarding advantages of small families, keeping sufficient spacing between successive birth and prevention of unwanted pregnancies.</p>,

  <DefBox key="def-birthcontrol"><strong>The regulation of conception by preventive measures or devices to control the number of offsprings is called birth control.</strong></DefBox>,

  <p key="b3-p24" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>A number of preventive methods or devices have been developed for birth control. The methods or devices of birth control which deliberately prevent fertilisation (<em>i.e.,</em> fusion of male gamete with the female gamete) are referred to as <strong>contraception</strong>. These methods help woman to avoid unwanted pregnancies. These methods are broadly categorised as follows:</p>,

  <p key="b3-p25" style={{ margin:"0 0 5px" }}>1. Barrier methods &nbsp; 2. Chemical methods &nbsp; 3. Intrauterine Contraceptive Device (IUCD) &nbsp; 4. Natural methods &nbsp; 5. Surgical methods</p>,

  <p key="b3-p26" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}><strong>1. Barrier methods.</strong> These are physical devices to prevent the entry of sperm in the female genital tract during copulation. They also protect against sexually transmitted diseases. Some common barrier methods are:</p>,
  <p key="b3-p27" style={{ textIndent:28, textAlign:"justify", margin:"0 0 5px" }}>(<em>i</em>) <strong>Condoms.</strong> These are thin, strong rubber sheaths used by man to cover the erect penis. It is simple but effective and widely used contraceptive that has no side effects. It checks pregnancy by preventing deposition of semen in the vagina. This method gives best results when used regularly and put on before starting coital activities.</p>,
  <p key="b3-p28" style={{ textIndent:28, textAlign:"justify", margin:"0 0 5px" }}>(<em>ii</em>) <strong>Femidom.</strong> It is not a common contraceptive method. A femidom is a thin rubber or polyurethane tube which fits inside vagina. It is used by female just before starting coital activities.</p>,
  <p key="b3-p29" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>(<em>iii</em>) <strong>Diaphragm (Cervical cap).</strong> It is a flexible rubber/plastic cover that is fitted over the cervix in the female's vagina. It checks the entry of sperms into the uterus. These are smeared with a spermicidal jelly or cream and must be kept fitted for at least six hours after sexual intercourse.</p>,

  <p key="b3-p30" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>2. Chemical methods.</strong> Foam tablets, jellies, pastes, creams and spermicides are some common chemicals used by females. These are placed in vagina. These chemicals adhere to the mucous membrane and immobilise and kill the sperms. Oral pills are also used to check ovulation. These are mainly hormonal preparations and contain estrogen and progesterone. These prevent development of egg and ovulation by inhibiting secretion of FSH. The oral pills act on hypothalamus, pituitary and the ovaries. They are called oral contraceptives (OCs). Vaginal pills are drug preparations which contain spermicides. They are used before copulation by women.</p>,

  <p key="b3-p31" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3. Intrauterine Contraceptive Device (IUCD).</strong> These are contraceptive devices made of copper, plastic or stainless steel. A copper-T is inserted into uterus by a practising doctor or a skilled nurse and left in place. It prevents implantation in the uterus. The other intrauterine contraceptive devices are loop, spiral ring, bow and shield. These can be placed for long periods (up to 5 years). The drawbacks with these devices are bleeding and discomfort. IUCD may come out even without the women's knowledge.</p>,

  <p key="b3-p32" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>4. Natural methods.</strong> These methods include abstinence (avoid copulation), rhythm method (avoid copulation around the time of ovulation) and coitus interruptus (withdrawal of penis before ejaculation).</p>,

  <p key="b3-p33" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>5. Surgical methods.</strong> Surgical methods are safe in the long run but they may cause infections and other problems if not done properly. These methods include – (<em>i</em>) Vasectomy and (<em>ii</em>) Tubectomy.</p>,

  <p key="b3-p34" style={{ textIndent:28, textAlign:"justify", margin:"0 0 5px" }}>(<em>i</em>) <strong>Vasectomy.</strong> This is a small surgical operation performed in males. It involves removal of a small portion of the sperm duct (or vas deferens) by surgical operation. The two cut ends are then ligated (tied) with threads. This prevents the sperms from coming out.</p>,

  <p key="b3-p35" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>(<em>ii</em>) <strong>Tubectomy.</strong> This is a surgical operation performed in females. It involves removal of a small portion of the fallopian tubes (or oviducts) by surgical operation. The cut ends are then ligated (tied) with threads. It prevents the egg (ovum) to enter the fallopian tube.</p>,

  <p key="b3-p36" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Both vasectomy and tubectomy are also known as methods of sterilization. These do not affect the normal sexual life. Surgery can also be used for abortion. <strong>Abortion</strong> is the medical termination of pregnancy (MTP) before the foetus becomes viable. However, this method is widely misused by people who do not want a female child. It is illegal (the prenatal sex determination has been prohibited by law). Moreover, the female-male sex ratio must be maintained to have a healthy society.</p>,

  <DefBox key="def-contraceptive-warn"><strong>Before using contraceptives, particularly oral pills, vaginal pills and copper-T etc., one must be aware of their side effects and take regular medical advice.</strong></DefBox>,

  <SecHd key="sec-s36" id="s36" label="3.6" title="Reproductive Health and Sexually Transmitted Diseases (STDs)" />,

  <p key="b3-p37" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Reproduction is an important biological process, like nutrition, respiration, transportation, excretion, etc. The reproductive life of human begins at puberty and continues throughout life in males and upto menopause in females. Like physical fitness, mental fitness and social fitness, the human beings need fitness of reproductive life. This is called <strong>reproductive health</strong>. It includes such aspects that ensure a responsible, safe and satisfying reproductive life. It is our responsibility and the responsibility of the Nation to provide necessary information and general awareness regarding reproductive health to each and every individual. Every one must know that (<em>i</em>) Marriage and child bearing during more mature stages of life, are important for reproductive health of a society, (<em>ii</em>) Secondary school education, which is lagging behind in many parts, must be enhanced, (<em>iii</em>) Complications during pregnancy and child birth and unsafe abortion are the causes of death of women, and (<em>iv</em>) Sexually transmitted diseases are spread by unsafe sex.</p>,

  <DefBox key="def-std"><strong>The infectious (communicable) diseases, which are spread from an infected person to a healthy person by sexual contact, are called <span style={{color:P_COLOR3}}>sexually transmitted diseases</span>.</strong></DefBox>,

  <p key="b3-p38" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Human beings suffer from over 30 different kinds of sexually transmitted diseases (STDs). They are usually caused by bacteria, protozoa and viruses. The common among them are:</p>,

  <p key="b3-p39" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>1. Gonorrhea.</strong> Gonorrhea is caused by a bacterium <em>Nisseria gonorrhoeae</em>. The victim feels burning sensation and pain during urination. The disease causes inflammation of the mucous membrane of the urinogenital tract, rectum, throat and eye. There may be pus from the penis and excessive secretion of vagina. It spreads by sexual contact and through infested clothes. The disease is easily curable with antibiotics.</p>,

  <p key="b3-p40" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>2. Syphilis.</strong> Syphilis is caused by spirochaete bacterium, <em>Treponema pallidum</em>. The disease is a chronic illness which affects the mucous membrane in genital, rectal and oral regions, and causes lesions. Infection occurs by sexual intercourse, and occasionally by kissing or close body contact. Syphilis is easily cured with antibiotics.</p>,

  <p key="b3-p41" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>3. HIV (Human Immunodeficiency Virus)/AIDS (Acquired Immunodeficiency Syndrome).</strong> The disease AIDS is caused by a virus, called HIV. It is a fast spreading incurable disease which weaken the body's immune system. The virus (HIV) was discovered in 1984 by an American Scientist, named Robert Gallo and a French Scientist – Luc Montagnier, independently.</p>,

  <p key="b3-p42" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>It now seems that the disease – AIDS may have passed into humans from chimpanzees by eating butchered chimps. The first case of AIDS was noticed in U.S.A. in 1981. In India, the first case of AIDS was reported in Chennai in 1986.</p>,

  <p key="b3-p43" style={{ textIndent:28, textAlign:"justify", margin:"0 0 5px" }}>The disease can manifest in two major ways: (<em>i</em>) malignant tumours in connective tissue, and (<em>ii</em>) viral, bacterial, protozoan and fungal infections of any system of the body. The main symptoms of the disease are damage to brain, unexplained fever, unexplained loss of appetite, unexplained loss of weight over a short time, chronic diarrhoea, cough, night sweats, shortness of breath and severe weakness. In people with AIDS, infections diseases neurologic damage and physiological wasting lead to death.</p>,

  <p key="b3-p44" style={{ textIndent:28, textAlign:"justify", margin:"0 0 5px" }}><strong>Spread of disease :</strong> AIDS is transmitted only by a contact of infected cells-containing blood of a patient with the blood of a healthy person as in — (<em>i</em>) Unprotected (without condom) sex with an infected partner if there is tissue injury to permit blood contact; (<em>ii</em>) Use of contaminated needles and syringes to inject drugs or vaccines; (<em>iii</em>) Use of contaminated razors for shaving; (<em>iv</em>) Transfusion of infected blood or blood products.</p>,

  <p key="b3-p45" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Prevention (control) :</strong> People, particularly those in high-risk group, should be educated about AIDS transmission, advantage of using condom, danger of sharing needles and virtue of monogamy.</p>,

  <p key="b3-p46" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>4. Warts.</strong> It is another sexually transmitted disease caused by a virus.</p>,

  <DefBox key="def-aids-day"><strong>December 1 is celebrated every year as the <span style={{color:P_COLOR3}}>World AIDS Day</span> to spread information about AIDS among the public.</strong></DefBox>,

  <p key="b3-p47" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Sexually transmitted diseases (STDs) are a major threat to a healthy society. Government of India has initiated special reproductive health care programmes to prevent the occurrence, early detection and cure of these diseases. Under such programmes, adolescents are specially targeted to follow some principles given below:</p>,
  <ul key="b3-ul1" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li>Avoid sex with unknown partner/multiple partners.</li>
    <li>Always use condoms during coitus.</li>
    <li>If you have doubt of infection, go to a qualified doctor for early detection and complete cure.</li>
  </ul>,

  <SecHd key="sec-s37" id="s37" label="3.7" title="Child Bearing and Women's Health" />,

  <p key="b3-p48" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Quality life is a fundamental right of every citizen. It is our prime duty and the duty of every responsible person to ensure good health to every one, without any specific consideration, particularly to ensure good health to women in different stages of life. Therefore, it is very important to be healthy and make people health conscious.</p>,

  <p key="b3-p49" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The women's health is the back bone of every family, society and the nation. If women are healthy, the family, the society and the entire nation will progress. One of the common reasons for deterioration of women's health is frequent conception and child-bearing. Controlled child birth is the most likely alternative to maintain women health and higher standard of living. Birth control includes contraception, morning-after pill and abortion. Early marriage, specifically before the age of 21 years, is also one of the major causes for the frequent child-bearing. Moreover, this brings in abnormalities in the proper development of the brain as the mother herself is not mature enough to conceive. However, the average age for bearing a first child has considerably risen in our country and this is the best sign for the health of future generation.</p>,

  <p key="b3-p50" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Women's health during child bearing.</strong> Malnutrition (lack of proper nutrition) and stress during pregnancy are the major causes of ill health of child bearing women. She is the most important member of our family and all care must be taken to provide her highly nutritious and easily digestible food. She must be kept free from any stress on account of family dispute or financial problems. It is, therefore, advisable that:</p>,
  <ol key="b3-ol1" style={{ paddingLeft:28, listStyleType:"decimal", fontSize:14, lineHeight:1.8, margin:"0 0 8px" }}>
    <li>Would-be-mothers should not take heavy doses of such medicines which are probably not allowed during pregnancy.</li>
    <li>Cigarette smoking, LSD and marijuana cause harmful effects on the foetus.</li>
    <li>A very high level of drinking alcohol during pregnancy can cause fetal alcohol syndrome including mental retardation.</li>
  </ol>,

  <SecHd key="sec-s38" id="s38" label="3.8" title="Contributions of Ancient Indian Scholars in the Field of Human Anatomy and Physiology" />,

  <p key="b3-p51" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Ancient Indian scholars, primarily through the Ayurvedic texts <strong>Sushruta Samhita</strong> and <strong>Charaka Samhita</strong>, made profound and pioneering contributions to the understanding of human anatomy and physiology. These contributions were built upon systematic observations, cadaveric dissections, and a holistic framework of health and disease that predate many similar western developments.</p>,

  <p key="b3-p52" style={{ margin:"0 0 5px" }}><strong>● Anatomical contributions.</strong></p>,

  <p key="b3-p53" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}><strong>● Human Dissection.</strong> Sushruta pioneered a systematic method for human cadaver dissection. It allowed detailed study of the body's components:</p>,
  <ul key="b3-ul2" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 6px", fontSize:14, lineHeight:1.8 }}>
    <li><strong>Bones, Joints and Muscles.</strong> Sushruta's school counted 300 bones, while Charaka's counted 360 (including teeth and cartilages). Both provided extensive knowledge of joints, ligaments and muscles.</li>
    <li><strong>Vessels and Channels.</strong> They described a complex network of channels (<em>srotas, siras, dhamanis</em>) responsible for transporting fluids, nutrients, and waste products throughout the body. Charaka described the heart (hridaya) as a "Controlling Centre" connected to the entire body via 13 main channels. It was an early conception of the circulatory system.</li>
    <li><strong>Organs.</strong> Description of various internal organs such as the heart, liver, spleen, lungs, intestines, bladder, and rectum were made by them.</li>
    <li><strong>Nervous System.</strong> Sushruta described four pairs of cranial nerves and their physiological importance. He noted that injury to specific nerves could result in blindness or deafness.</li>
  </ul>,

  <p key="b3-p54" style={{ margin:"0 0 5px" }}><strong>● Physiological Contributions</strong></p>,

  <p key="b3-p55" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}><strong>● Tridosha Theory.</strong> It is the central tenet of Ayurvedic physiology. It posits that the body functions due to the balance of three fundamental biological energies:</p>,
  <p key="b3-p56" style={{ margin:"0 0 4px" }}>(<em>i</em>) <strong>Vata (air and space)</strong> governs movement, nervous action, and cellular transport.</p>,
  <p key="b3-p57" style={{ margin:"0 0 4px" }}>(<em>ii</em>) <strong>Pitta (fire and water)</strong> manages digestion, metabolism, body temperature, and endocrine function.</p>,
  <p key="b3-p58" style={{ margin:"0 0 8px" }}>(<em>iii</em>) <strong>Kapha (earth and water)</strong> provides lubrication, structure, stability, and immunity.</p>,

  <p key="b3-p59" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Illness was believed to be caused by imbalance in these three doshas, and treatment was aimed to restore their equilibrium through diet, lifestyle, and herbal remedies.</p>,

  <p key="b3-p60" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>● Saptadhatus and Tri Malas.</strong> It was mentioned that the body was comprised of seven fundamental tissues (saptadhatus — tissue fluids, blood, muscle, fat, bone, marrow, and reproductive tissue) and three waste products (tri malas – urine, faeces, and sweat). All these were need to be in balance for health.</p>,

  <p key="b3-p61" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>● Metabolism and Digestion (Agni).</strong> Ayurveda placed greater emphasis on <em>Agni</em> (digestive fire). The biological fire was responsible for all metabolic and digestive functions. Impaired <em>Agni</em> was considered a precursor to many chronic diseases.</p>,

  <p key="b3-p62" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>● Circulation and the Heart.</strong> Physicians like Charaka and Sushruta had a sophisticated understanding of the circulatory system. The heart (hridaya) was described as the "controlling centre" connected to the entire body through a network of major and minor channels (<em>srotas, siras, dhamanis</em>). They described the continuous contraction and relaxation of the heart and the unidirectional flow of fluids (including <em>rasa</em> or plasma, and <em>rakta</em> or blood).</p>,
];

// ── CONTENT (Batch 4) ─────────────────────────────────────────
const P_COLOR4 = "#c0126a";

const content_b4 = [
  <SecHd key="sec-s39" id="s39" label="3.9" title="Government Schemes to Improve Maternal Health and Declining Sex Ratio" />,

  <p key="b4-p1" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The Government of India has implemented several schemes to improve <strong>maternal health</strong> and address the <strong>declining sex ratio</strong> through a combination of healthcare provisions, financial incentives, and social awareness campaigns.</p>,

  <p key="b4-p2" style={{ margin:"0 0 5px" }}><strong>I. Government Schemes for Improving Maternal Health</strong></p>,

  <p key="b4-p3" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}>Under the National Health Mission (NHM) several schemes are operational with an aim to provide quality and accessible care to pregnant women and newborns. These include:</p>,

  <ul key="b4-ul1" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.9 }}>
    <li><strong>Janani Suraksha Yojana (JSY).</strong> This conditional cash transfer scheme encourages institutional deliveries among poor pregnant women to reduce maternal and infant mortality. It provides cash assistance to mothers and incentives to ASHA (Accredited Social Health Activists) workers.</li>
    <li><strong>Janani Shishu Suraksha Karyakram (JSSK).</strong> This scheme provides free and cashless services to all pregnant women delivering in public health institutions, including delivery, drugs, diagnostics, and transport. Similar benefits are available for sick infants up to one year old.</li>
    <li><strong>Pradhan Mantri Matru Vandana Yojana (PMMVY).</strong> This maternity benefit programme provides a cash incentive of ₹5,000 in three installments to eligible pregnant and lactating women for their first living child. PMMVY 2.0 adds an incentive for a second girl child.</li>
    <li><strong>Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA).</strong> This provides pregnant women with a fixed-day, free antenatal check-up by a specialist/medical officer to detect and manage high-risk pregnancies.</li>
    <li><strong>Surakshit Matritva Aashwasan (SUMAN).</strong> This ensures zero-cost, high-quality healthcare for pregnant women, sick newborns, and mothers up to six months post-delivery.</li>
    <li><strong>POSHAN Abhiyaan (National Nutrition Mission).</strong> This addresses malnutrition in various groups, including pregnant women and lactating mothers.</li>
  </ul>,

  <p key="b4-p4" style={{ margin:"0 0 5px" }}><strong>II. Government Schemes for Improving Sex Ratio</strong></p>,

  <p key="b4-p5" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}>Initiatives to address the declining Child Sex Ratio (CSR) and combat gender discrimination involve a multi-sectoral approach focused on awareness and welfare. Following schemes are operational:</p>,

  <ul key="b4-ul2" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.9 }}>
    <li><strong>Beti Bachao, Beti Padhao (BBBP).</strong> This scheme tackles the declining CSR and promotes the education and empowerment of girls. Its objectives include preventing gender-biased sex-selective elimination, ensuring girl child survival and protection, and promoting their education and participation. Activities include awareness campaigns and community engagement.</li>
    <li><strong>Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994.</strong> This regulatory framework prohibits sex selection and regulates diagnostic techniques to prevent female foeticide.</li>
    <li><strong>Sukanya Samriddhi Yojana.</strong> This savings scheme promotes the financial security and welfare of the girl child by encouraging savings for her future.</li>
    <li><strong>PMMVY 2.0 (Second girl Child Incentive).</strong> As mentioned, the revamped PMMVY provides an additional incentive for the birth of a second girl child.</li>
  </ul>,

  <p key="b4-p6" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>These schemes, through a combination of health support and measures promoting gender equality, have contributed to an improvement in the national sex ratio at birth and the overall sex ratio of the population.</p>,

  <SecHd key="sec-s310" id="s310" label="3.10" title="Infertility" />,

  <DefBox key="def-infertility"><strong>All over the world including India, a large number of couples are infertile, <em>i.e.,</em> they are unable to produce children inspite of unprotected sexual cohabitation. Such a phenomenon is termed <span style={{color:P_COLOR4}}>infertility</span>.</strong></DefBox>,

  <p key="b4-p7" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Reasons.</strong> There can be many reasons of infertility in males and females. These can be categorized as physical, congenital, diseases, drugs, immunological and psychological. Either male or female or both partners can suffer from infertility disorders.</p>,

  <p key="b4-p8" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The infertility disorders can be diagnosed by specialists working in specialized health care units, <em>e.g.,</em> <strong>infertility clinics</strong>. Some of these infertility disorders can be cured through corrective treatment under the supervision of the specialists and enable the infertile couples to have children. However, there are some disorders where such corrective treatment is not possible. In such cases, couples are assisted to have children through certain special techniques commonly known as <strong>Assisted Reproduction Technologies (ART)</strong>.</p>,

  <SecHd key="sec-s311" id="s311" label="3.11" title="Assisted Reproduction Technologies (ART)" />,

  <p key="b4-p9" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>These include a number of special techniques which assist infertile couples to have children. Some prominent techniques are: 1. 'Test tube baby' programme. &nbsp; 2. Gamete intra fallopian transfer (GIFT). &nbsp; 3. Intra cytoplasmic sperm injection (ICSI). &nbsp; 4. Artificial insemination technique (AIT).</p>,

  <SubHd key="sub-art1" id="art1" label="1." title="'Test Tube Baby' Programme" />,

  <DefBox key="def-ivf"><strong>This method involves <em>in vitro</em> fertilization (IVF), <em>i.e.,</em> fertilization of male gamete (spermatozoon) and female gamete (ovum) outside the body in almost similar conditions as that in the body followed by zygote or embryo transfer (ET).</strong></DefBox>,

  <p key="b4-p10" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>What is a Test Tube Baby?</strong> In some women, normal conception is not possible because of blocked oviducts or spermicidal secretions in the vagina or low sperm count of the husband. There are also cases wherein women cannot produce ova or men can not produce sperms. In all such cases, ovum from the wife/donor female is removed surgically after hormonal stimulation of the follicles. It is then fertilized by her husband's/donor male's sperm in a laboratory dish containing a nutrient broth. The zygote or early embryo (upto 8 blastomeres stage) is then transferred into the fallopian tube (popularly called <strong>zygote intra fallopian transfer</strong> or <strong>ZIFT</strong>) or embryo with more than 8 blastomeres is transferred into the uterus (popularly called <strong>intra uterine transfer</strong> or <strong>IUT</strong>) to complete further development of zygote or embryo. The entire operation is carried out under sterilized conditions. With proper medical care, the mother will give birth to a normal child on the completion of gestation.</p>,

  <p key="b4-p11" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>The baby produced by conceiving in a culture dish and nursing in the uterus is called a <strong>test tube baby</strong>. The baby is not reared in the test tube. A scientific term for this procedure is <em>in vitro</em> ("in glass") fertilization. Embryos formed by <em>in vivo</em> fertilization (fusion of male and female gametes within the female) can also be used for ZIFT or IUT to assist those females who cannot conceive. The success rate of this programme is less than 20%. Test tube babies are a wonderful medical achievement.</p>,

  <SubHd key="sub-art2" id="art2" label="2." title="Gamete Intra Fallopian Transfer (GIFT)" />,

  <p key="b4-p12" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>This method is used in females who cannot produce ova but can provide suitable environment for fertilization and further development of embryo in the oviducts. In such cases, ovum from the donor female is surgically removed and is then introduced into the fallopian tube of such females. Such women then accept sperms from her husband during copulation.</p>,

  <SubHd key="sub-art3" id="art3" label="3." title="Intra Cytoplasmic Sperm Injection (ICSI)" />,

  <p key="b4-p13" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Intra cytoplasmic sperm injection is another specialized technique to form an embryo in the laboratory in which a sperm is directly injected into the ovum placed in a nutrient broth. The zygote or early embryo is later transferred by ZIFT in woman.</p>,

  <SubHd key="sub-art4" id="art4" label="4." title="Artificial Insemination Technique (AIT)" />,

  <p key="b4-p14" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>This technique is used in those females where the husband either is unable to inseminate the female or has very low sperm counts in the ejaculates. In such cases, the semen of the husband/donor male is first collected and then is artificially introduced either into the vagina or into the uterus (intra-uterine insemination or IUI) of the female.</p>,

  <p key="b4-p15" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>All above mentioned techniques require extremely high precision handling by specialized professionals and expensive instrumentation. Such facilities are presently available only in few centres in the country and are available to only limited number of people. Emotional, religious and social factors provide hurdles in the adoption of these methods in our country. These may lead to complications such as pelvic inflammatory diseases (PID), abortions, still births ectopic pregnancies, infertility or even cancer of the reproductive tract.</p>,

  <p key="b4-p16" style={{ textIndent:28, textAlign:"justify", margin:"0 0 6px" }}>Improvements in the medical field for assisted reproductive technologies (ART) are vital for addressing infertility, offering hope and options to millions of people globally. The importance of these advancements can be recognized in several key areas:</p>,

  <ul key="b4-ul3" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li><strong>Increased Success Rates.</strong> Continuous research and better clinical practices have led to higher success rates for procedures like <strong>in vitro fertilization</strong> (IVF), making the dream of parenthood more attainable for many couples.</li>
    <li><strong>Wider Accessibility.</strong> Technological improvements have made treatments more efficient and sometimes more affordable, broadening access to a more diverse population, including same-sex couples, single individuals, and those undergoing cancer treatments who wish to preserve their fertility.</li>
    <li><strong>Reduced Risks.</strong> Innovations in genetic screening and embryo selection have helped decrease the risk of transmitting genetic diseases to offspring, leading to healthier babies.</li>
    <li><strong>Enhanced Quality of Life.</strong> By providing solutions to infertility challenges, these technologies significantly improve the emotional and psychological well-being of intended parents, positively impacting their overall quality of life.</li>
    <li><strong>Advancements in Related Fields.</strong> Progress in ART often drives innovation in other medical areas, such as genetics, embryology, and general reproductive medicine, contributing to a broader understanding of human biology.</li>
  </ul>,

  <SecHd key="sec-s312" id="s312b" label="3.12" title="Effect of Heavy Metals and Heat on Reproductive Health and Fertility" />,

  <SubHd key="sub-s312i" id="s312i" label="I." title="Heavy Metals" />,

  <p key="b4-p17" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}>Heavy metals such as lead (Pb), mercury (Hg), cadmium (Cd), and arsenic (As) harm reproductive organs in both males and females primarily through <strong>oxidative stress, hormonal disruption, and DNA damage</strong>.</p>,

  <p key="b4-p18" style={{ margin:"0 0 5px" }}><strong>(A) In Males.</strong> Heavy metals lead to a decline in semen quality by reducing sperm count, motility, and normal morphology. They can:</p>,
  <ul key="b4-ul4" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li>induce <strong>oxidative stress</strong>, generating reactive oxygen species (ROS) that damage sperm DNA and membranes.</li>
    <li>disrupt the <strong>blood-testis barrier</strong>, a protective layer in the testes, making germ cells vulnerable to damage.</li>
    <li>interfere with the production of hormones like <strong>testosterone</strong>, impacting sperm development (spermatogenesis).</li>
    <li>mimic essential ions like zinc (Zn) and calcium (Ca), displacing them in crucial biological processes and enzyme functions.</li>
  </ul>,

  <p key="b4-p19" style={{ margin:"0 0 5px" }}><strong>(B) In Females.</strong> Heavy metals can interfere with ovarian function and hormonal balance. They can:</p>,
  <ul key="b4-ul5" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li>cause <strong>ovarian dysfunction</strong> and disrupt the menstrual cycle, leading to irregular periods and anovulation (absence of ovulation).</li>
    <li>accumulate in ovarian tissue and follicular fluid, reducing the number of mature oocytes (eggs) and their quality.</li>
    <li>act as <strong>metalloestrogens</strong>, binding to estrogen receptors and interfering with the normal function of endogenous hormones.</li>
    <li>increase the risk of adverse pregnancy outcomes, including infertility, spontaneous abortion (miscarriage), stillbirth, and low birth weight, by compromising endometrial receptivity and placental development.</li>
  </ul>,

  <SubHd key="sub-s312ii" id="s312ii" label="II." title="Can Extreme Heat Affect Fertility?" />,

  <p key="b4-p20" style={{ textIndent:28, textAlign:"justify", margin:"0 0 8px" }}><strong>Yes, extreme heat can significantly affect fertility in both men and women.</strong></p>,

  <p key="b4-p21" style={{ margin:"0 0 5px" }}><strong>(A) In Males.</strong> The testes are located outside the body specifically to maintain a temperature a few degrees lower than the core body temperature, which is essential for healthy sperm production.</p>,
  <ul key="b4-ul6" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li>Exposure to excessive heat (<em>e.g.,</em> from hot tubs, saunas, tight clothing, or prolonged laptop use on the lap) can disrupt this temperature balance.</li>
    <li>This results in <strong>reduced sperm count</strong>, decreased motility (ability to swim), abnormal morphology (shape), and DNA damage.</li>
    <li>The good news is that these effects are often temporary; sperm quality typically improves within 2–3 months after the heat source is avoided.</li>
  </ul>,

  <p key="b4-p22" style={{ margin:"0 0 5px" }}><strong>(B) In Females.</strong> While the impact on female fertility has been less studied than in males, research indicates negative effects.</p>,
  <ul key="b4-ul7" style={{ paddingLeft:28, listStyleType:"disc", margin:"0 0 8px", fontSize:14, lineHeight:1.8 }}>
    <li>Extreme heat can disrupt the hormonal balance needed for ovulation and regular menstrual cycles.</li>
    <li>It may negatively affect egg quality and interfere with the implantation of a fertilized egg in the uterus.</li>
    <li>Heat stress during pregnancy, especially, can increase the risk of complications such as dehydration, preterm labour, preeclampsia, and birth defects.</li>
  </ul>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id:"s31",   label:"3.1",      title:"Introduction and Definition",             level:1 },
  { id:"s311",  label:"3.1.1",    title:"Why do organisms reproduce?",             level:2 },
  { id:"s312",  label:"3.1.2",    title:"Why do organisms of same species look similar?", level:2 },
  { id:"s313",  label:"3.1.3",    title:"The Importance of Variation",             level:2 },
  { id:"s32",   label:"3.2",      title:"Types of Reproduction",                   level:1 },
  { id:"s321",  label:"3.2.1",    title:"Asexual Reproduction",                    level:2 },
  { id:"s3217", label:"3.2.1.7",  title:"Vegetative Propagation in Plants",        level:3 },
  { id:"s3218", label:"3.2.1.8",  title:"Propagation by Plant Tissue Culture",     level:3 },
  { id:"s322",  label:"3.2.2",    title:"Sexual Reproduction",                     level:2 },
  { id:"s33",   label:"3.3",      title:"Sexual Reproduction in Plants",           level:1 },
  { id:"s331",  label:"3.3.1",    title:"The parts of a flower",                   level:2 },
  { id:"s332",  label:"3.3.2",    title:"Pollination",                             level:2 },
  { id:"s333",  label:"3.3.3",    title:"Fertilization in Plants",                 level:2 },
  { id:"s34",   label:"3.4",      title:"Reproduction in Human Beings",            level:1 },
  { id:"s341",  label:"3.4.1",    title:"Primary and Secondary Sex Organs",        level:2 },
  { id:"s342",  label:"3.4.2",    title:"Primary and Secondary Sexual Characters", level:2 },
  { id:"s343",  label:"3.4.3",    title:"Male Reproductive System",                level:2 },
  { id:"s344",  label:"3.4.4",    title:"Female Reproductive System",              level:2 },
  { id:"s345",  label:"3.4.5",    title:"Sexual Cycle in Females",                 level:2 },
  { id:"s346",  label:"3.4.6",    title:"Fertilization",                           level:2 },
  { id:"s347",  label:"3.4.7",    title:"Post fertilization changes",              level:2 },
  { id:"s35",   label:"3.5",      title:"Population Control",                      level:1 },
  { id:"s36",   label:"3.6",      title:"Reproductive Health and STDs",            level:1 },
  { id:"s37",   label:"3.7",      title:"Child Bearing and Women's Health",        level:1 },
  { id:"s38",   label:"3.8",      title:"Contributions of Ancient Indian Scholars",level:1 },
  { id:"s39",   label:"3.9",      title:"Government Schemes – Maternal Health",    level:1 },
  { id:"s310",  label:"3.10",     title:"Infertility",                             level:1 },
  { id:"s311",  label:"3.11",     title:"Assisted Reproduction Technologies (ART)",level:1 },
  { id:"s312b", label:"3.12",     title:"Effect of Heavy Metals and Heat",         level:1 },
];

// ── CONCAT ALL CONTENT ARRAYS ────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter3() {
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
        {allContent}
      </div>
    </div>
  );
}
