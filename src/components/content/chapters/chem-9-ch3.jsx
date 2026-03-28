"use client";
// ── SECTION 1: FULL COMPONENT LIBRARY (batch 1 only) ────────
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

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

const Sup = ({ c }) => <sup style={{ fontSize: "0.72em", verticalAlign: "super", lineHeight: 0 }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em", verticalAlign: "sub", lineHeight: 0 }}>{c}</sub>;

const Frac = ({ n, d }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 3px", fontSize: "0.92em" }}>
    <span style={{ borderBottom: `1px solid #222`, paddingBottom: 1, lineHeight: 1.3 }}>{n}</span>
    <span style={{ lineHeight: 1.3 }}>{d}</span>
  </span>
);

const MathBlock = ({ children }) => (
  <div style={{ textAlign: "center", margin: "8px 0 8px 0", fontSize: 15, lineHeight: 1.8 }}>{children}</div>
);

const Arrow = ({ type = "right" }) => {
  if (type === "right") return <span style={{ margin: "0 6px" }}>⟶</span>;
  if (type === "eq") return <span style={{ margin: "0 6px" }}>⇌</span>;
  return <span style={{ margin: "0 6px" }}>→</span>;
};

const Eq = ({ children }) => (
  <span style={{ fontFamily: "monospace", fontSize: "0.97em" }}>{children}</span>
);

const Times = () => <span style={{ margin: "0 2px" }}>×</span>;

const ChemEq = ({ lhs, rhs, arrow = "right", topLabel, bottomLabels = [] }) => (
  <div style={{ textAlign: "center", margin: "10px 0", fontSize: 14, lineHeight: 2 }}>
    <span>{lhs}</span>
    {topLabel && (
      <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", margin: "0 8px", verticalAlign: "middle" }}>
        <span style={{ fontSize: 11, color: "#555" }}>{topLabel}</span>
        <span>⟶</span>
        {bottomLabels.length > 0 && <span style={{ fontSize: 11, color: "#555" }}>{bottomLabels[0]}</span>}
      </span>
    )}
    {!topLabel && <Arrow type={arrow} />}
    <span>{rhs}</span>
  </div>
);

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 28, marginBottom: 8 }}>
    <div style={{ borderBottom: `2px solid ${P_COLOR}`, paddingBottom: 4, marginBottom: 4 }}>
      <span style={{ color: P_COLOR, fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 0.3, textTransform: "uppercase" }}>
        {label}.&nbsp;{title}
      </span>
    </div>
  </div>
);

const SubHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 18, marginBottom: 6 }}>
    <span style={{ color: P_COLOR, fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>
      {label}.&nbsp;{title}
    </span>
  </div>
);

const SubSubHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 14, marginBottom: 4 }}>
    <span style={{ color: P_COLOR, fontFamily: "'Open Sans', sans-serif", fontWeight: 600, fontSize: 13.5 }}>
      {label}.&nbsp;{title}
    </span>
  </div>
);

const P2 = ({ children }) => (
  <p style={{ margin: "4px 0", textIndent: 0, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>{children}</p>
);

const DefBox = ({ children, key: _k }) => (
  <div style={{ border: `1px solid #ccc`, borderLeft: `4px solid ${P_COLOR}`, background: "#fff", padding: "10px 16px", margin: "12px 0", fontStyle: "italic", fontSize: 14, lineHeight: 1.75 }}>
    {children}
  </div>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border: `2px solid ${P_COLOR}`, borderRadius: 4, margin: "16px 0", overflow: "hidden" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 16px", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, textAlign: "center" }}>
      ACTIVITY {num}.
    </div>
    {sub && (
      <div style={{ background: LIGHT_P, padding: "4px 16px 6px 16px", fontStyle: "italic", color: P_COLOR, fontSize: 13, textAlign: "center", fontWeight: 600 }}>
        ({sub})
      </div>
    )}
    <div style={{ padding: "10px 16px 12px 16px", fontSize: 14, lineHeight: 1.75 }}>{children}</div>
  </div>
);

const ActHd = ({ children }) => (
  <p style={{ fontWeight: 700, color: P_COLOR, margin: "8px 0 2px 0", fontSize: 14 }}>{children}</p>
);

const KBBox = ({ children }) => (
  <div style={{ border: `2px solid ${P_COLOR}`, borderRadius: 4, margin: "16px 0", overflow: "hidden" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 16px", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 14, textAlign: "center", letterSpacing: 1 }}>
      KNOWLEDGE BOOSTER
    </div>
    <div style={{ padding: "10px 16px 12px 16px", fontSize: 14, lineHeight: 1.75 }}>{children}</div>
  </div>
);

const KBHd = ({ children }) => (
  <p style={{ fontWeight: 700, color: P_COLOR, margin: "8px 0 2px 0", fontSize: 13.5 }}>{children}</p>
);

const FeatureBox = ({ title, children }) => (
  <div style={{ border: `1.5px solid ${P_COLOR}`, borderRadius: 4, margin: "16px 0", overflow: "hidden" }}>
    <div style={{ background: LIGHT_P, padding: "6px 16px", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR }}>
      {title}
    </div>
    <div style={{ padding: "10px 16px 12px 16px", fontSize: 14, lineHeight: 1.75 }}>{children}</div>
  </div>
);

const ProblemsBox = ({ children }) => (
  <div style={{ border: `2px solid ${P_COLOR}`, borderRadius: 4, margin: "16px 0", overflow: "hidden" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "7px 16px", fontFamily: "'Open Sans', sans-serif", fontWeight: 800, fontSize: 15, textAlign: "center", letterSpacing: 1 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding: "12px 20px 14px 20px", fontSize: 14, lineHeight: 1.75 }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize: 11.5, color: "#555", verticalAlign: "super", lineHeight: 0 }}>
    *<span style={{ fontSize: 11.5, verticalAlign: "baseline", lineHeight: 1.4, fontStyle: "italic" }}>&nbsp;{children}</span>
  </span>
);

const Fig = ({ src, caption, width = "90%" }) => (
  <div style={{ textAlign: "center", margin: "14px auto", maxWidth: width }}>
    <img src={src} alt={caption || "figure"} style={{ maxWidth: "100%", display: "block", margin: "0 auto" }} />
    {caption && (
      <p style={{ fontSize: 12.5, color: "#444", marginTop: 5, fontStyle: "italic", textAlign: "center" }}>{caption}</p>
    )}
  </div>
);

const NumericalSection = ({ topic, children }) => (
  <div style={{ border: `1.5px solid ${P_COLOR}`, borderRadius: 4, margin: "16px 0", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "stretch", minHeight: 80 }}>
      <div style={{ background: P_COLOR, color: "#fff", writingMode: "vertical-rl", transform: "rotate(180deg)", padding: "12px 8px", fontFamily: "'Open Sans', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 1, textAlign: "center", minWidth: 52, flexShrink: 0, textTransform: "uppercase" }}>
        PROBLEMS BASED ON {topic}
      </div>
      <div style={{ padding: "12px 16px 14px 16px", fontSize: 14, lineHeight: 1.75, flex: 1 }}>{children}</div>
    </div>
  </div>
);

const th = (content) => (
  <th style={{ background: P_COLOR, color: "#fff", padding: "6px 10px", fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 13, textAlign: "left", border: "1px solid #ddd" }}>
    {content}
  </th>
);

const td = (content, align = "left") => (
  <td style={{ padding: "5px 10px", fontSize: 13.5, border: "1px solid #ddd", textAlign: align, verticalAlign: "top" }}>
    {content}
  </td>
);

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen((o) => !o)} style={{
      position: "fixed", top: 14, left: 14, zIndex: 1100,
      background: P_COLOR, border: "none", borderRadius: 4, cursor: "pointer",
      width: 36, height: 36, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 5, padding: 0
    }}>
      {[0, 1, 2].map((i) => (
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
            onMouseEnter={(e) => { e.currentTarget.style.background = LIGHT_P; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            {item.label && <span style={{ marginRight: 5 }}>{item.label}.</span>}
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

const ChapterCover = () => (
  <div style={{
    background: `linear-gradient(135deg, ${P_COLOR} 0%, #e8559a 50%, #f7a8cc 100%)`,
    borderRadius: 8, padding: "40px 48px 36px 48px", margin: "0 0 32px 0",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
    boxShadow: "0 4px 24px rgba(192,18,106,0.18)"
  }}>
    <div style={{
      background: "rgba(255,255,255,0.15)", border: "3px solid rgba(255,255,255,0.6)",
      borderRadius: 8, width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ color: "#fff", fontSize: 40, fontWeight: 900, fontFamily: "'Open Sans', sans-serif" }}>3</span>
    </div>
    <h1 style={{ color: "#fff", margin: 0, fontFamily: "'Open Sans', sans-serif", fontWeight: 900, fontSize: 32, letterSpacing: 2, textTransform: "uppercase", textAlign: "center", textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
      Atoms and Molecules
    </h1>
    <div style={{ width: 80, height: 3, background: "rgba(255,255,255,0.7)", borderRadius: 2 }} />
  </div>
);

// ── SECTION 2: TABLE SUB-COMPONENTS + CONTENT (batch 1) ──────

const content_b1 = [
  // 3.1 Ancient Thoughts
  <SecHd key="sec-s31" id="s31" label="3.1" title="Ancient Thoughts About Atoms and Molecules" />,
  <p key="b1-p-s31-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    In chapter 1, we have discussed what we mean by 'matter' and how the matter is classified into three states, <em>i.e.,</em> solid, liquid and gaseous (called "physical classification") or into elements, compounds and mixtures (called "chemical classification").
  </p>,
  <p key="b1-p-s31-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As already discussed in chapter 2, ancient Indian and Greek philosophers have been thinking about what matter is ultimately made up of. It was around 500 BC that an Indian philosopher, Maharishi Kanad had postulated that matter is divisible, <em>i.e.,</em> if we go on breaking matter, we will get smaller and smaller particles and ultimately, the particles obtained may be so small that they cannot be further divided. These indivisible particles were named as <strong>"parmanu"</strong>. Almost during the same period, ancient Greek philosophers, Democritus and Leucippus, also put forward the same idea. However, they called the smallest indivisible particles as "atoms" (<em>Greek</em> : means un-cutable). During the same era, it was also suggested by Indian philosopher, Pakudha Katyayama, that in some cases, the atoms may not exist in the free state but may exist in the combined state in the form of species, called molecules or compounds.
  </p>,
  <p key="b1-p-s31-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, we may conclude that <strong><em>matter is made up of small particles which may be atoms or molecules. As different kinds of matter contain different types of atoms or molecules which have different properties, therefore, different kinds of matter have different properties.</em></strong>
  </p>,
  <p key="b1-p-s31-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Upto the eighteenth century, there were no experimental methods and results available to support the above philosophical ideas. However, towards the end of the eighteenth century, the fact had been established that pure substances can be either elements or compounds. Now, the question was how and why the elements combine together to form compounds. Experimental studies were carried out to understand the laws according to which the elements combine to form compounds or substances react together to form products. These laws are called 'laws of chemical combination', as discussed in the next section.
  </p>,

  // 3.2 Laws of Chemical Combination
  <SecHd key="sec-s32" id="s32" label="3.2" title="Laws of Chemical Combination" />,
  <p key="b1-p-s32-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As mentioned above, whenever reactants react together to form the products or the elements combine together to form a compound, they do so according to certain laws. These laws are called "laws of chemical combination". By measuring accurately the masses of the substances involved, the following two laws of chemical combination were put forward :
  </p>,
  <p key="b1-p-s32-2" style={{ marginLeft: 24, fontSize: 14, lineHeight: 1.8 }}>
    <strong>(1)</strong> Law of conservation of mass<br />
    <strong>(2)</strong> Law of constant proportions.<br />
    Each of these laws is briefly described below.
  </p>,

  // 3.2.1
  <SubHd key="sub-s321" id="s321" label="3.2.1" title="Law of Conservation of Mass" />,
  <p key="b1-p-s321-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    This law deals with the masses of the reactants and products of a chemical reaction. The law was put forward by Antoine Lavoisier in 1774. It states as follows:
  </p>,
  <DefBox key="def-s321-1">
    Mass can neither be created nor destroyed during any physical change or in a chemical reaction. In other words, in any chemical reaction, the total mass of the reactants is equal to the total mass of the products.
  </DefBox>,
  <p key="b1-p-s321-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Example to illustrate the law of conservation of mass.</strong> Calcium carbonate (CaCO<Sub c="3" />) on heating decomposes to form calcium oxide (CaO) and carbon dioxide (CO<Sub c="2" />). It is found that if 100 g of calcium carbonate is heated, it gives 56 g of calcium oxide and 44 g of carbon dioxide. Thus, for the reaction,
  </p>,
  <MathBlock key="b1-mb-s321-1">
    Calcium carbonate <Arrow /> Calcium oxide + Carbon dioxide
  </MathBlock>,
  <MathBlock key="b1-mb-s321-2">
    Mass of reactant (CaCO<Sub c="3" />) = 100 g
  </MathBlock>,
  <MathBlock key="b1-mb-s321-3">
    Total mass of products = Mass of CaO + Mass of CO<Sub c="2" /> = 56 g + 44 g = 100 g
  </MathBlock>,
  <p key="b1-p-s321-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, total mass of products = total mass of reactants. This shows that no mass is created or destroyed in this chemical reaction.
  </p>,

  // Activity 3.1
  <ActivityBox key="act-3-1" num="3.1" sub="To verify that mass does not change during a physical change">
    <ActHd>Experiment 1.</ActHd>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      Take a clean beaker and wipe it dry from outside. Take a few cubes of ice in it and wipe the beaker from outside. Now weigh the beaker along with ice on a digital balance. Cover the beaker with a clock glass and leave it for some time till the ice melts to form liquid water. Wipe the beaker from outside and weigh it again. We will observe that no change in mass has taken place. As melting of ice to water is a physical change, it shows that no change in mass takes place during a physical change.
    </p>
    <Fig
      key="fig-3-1"
      src={CONTENT_IMAGES.CONTENT_IMAGE_A54D06D291511E4B3A27}
      caption="Fig. 3.1"
    />
    <ActHd>Experiment 2.</ActHd>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      Take some water in a beaker. Wipe the beaker from outside and weigh it along with water. Weigh about 10 g of sugar on a watch glass or paper. Now add this sugar into water taken in the beaker. Swirl the beaker to dissolve the sugar. Wipe the beaker from outside and weigh again along with sugar solution. We will observe that there is no change in mass. As dissolution of sugar in water is a physical change, it shows that no change in mass takes place during a physical change.
    </p>
    <Fig
      key="fig-3-2"
      src={CONTENT_IMAGES.CONTENT_IMAGE_B10DCB68F837EDD892F7}
      caption="Fig. 3.2"
    />
  </ActivityBox>,

  // Activity 3.2
  <ActivityBox key="act-3-2" num="3.2" sub="To verify that mass does not change during a chemical change">
    <ActHd>Experiment 1.</ActHd>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      Take a clean conical flask fitted with a cork. Also take a small test tube and tie a thread to its neck so that it can be suspended in the flask. Weigh the flask, cork and tube together. Prepare the following two solutions :
    </p>
    <p style={{ margin: "4px 0 4px 20px", fontSize: 14, lineHeight: 1.75 }}>
      (<em>i</em>) approximate 5% solution of barium chloride (BaCl<Sub c="2" />) by dissolving 5 g of BaCl<Sub c="2" /> in 100 mL of water.<br />
      (<em>ii</em>) approximate 5% solution of sodium sulphate (Na<Sub c="2" />SO<Sub c="4" />) by dissolving 5 g of Na<Sub c="2" />SO<Sub c="4" /> in 100 mL of water.
    </p>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      Take a small amount of barium chloride solution in the conical flask and a small amount of sodium sulphate solution in the test tube. Suspend the test tube in the flask with the thread as shown in Fig. 3.3 (<em>a</em>). Weigh the complete system. Subtract the mass of the empty apparatus. The difference will give the mass of the reactants taken.
    </p>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      Now, loosen the cork so that the thread is loosened and the test tube falls into the flask. As a result, the solution of the tube mixes into the solution of the flask. A white precipitate appears in the flask due to the following reaction taking place :
    </p>
    <MathBlock>
      <span style={{ textDecoration: "underline" }}>Barium chloride</span> + <span style={{ textDecoration: "underline" }}>Sodium sulphate</span> <Arrow /> <span style={{ textDecoration: "underline" }}>Barium sulphate</span> + <span style={{ textDecoration: "underline" }}>Sodium chloride</span>
    </MathBlock>
    <MathBlock>
      (solution) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (solution) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (white ppt.) &nbsp;&nbsp;&nbsp; (solution)
    </MathBlock>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      Weigh the complete apparatus again along with the contents. Subtract the initial mass of the empty apparatus. The difference will now give the total mass of the products (along with that of the reactant left unreacted, if any). We observe that the mass comes out to be same as it was before the reaction. This proves that no change in mass takes place during a chemical change.
    </p>
    <Fig
      key="fig-3-3"
      src={CONTENT_IMAGES.CONTENT_IMAGE_4082F9021E29A702D500}
      caption="Fig. 3.3. Experiment to verify the law of conservation of mass"
    />
    <ActHd>Experiment 2.</ActHd>
    <p style={{ margin: "4px 0", fontSize: 14, lineHeight: 1.75 }}>
      In place of BaCl<Sub c="2" /> and Na<Sub c="2" />SO<Sub c="4" />, try the experiment with the following chemicals :
    </p>
    <p style={{ margin: "4px 0 4px 20px", fontSize: 14, lineHeight: 1.75 }}>
      (<em>i</em>) Copper sulphate and Sodium carbonate&nbsp;&nbsp; (<em>ii</em>) Lead nitrate and Sodium chloride
    </p>
  </ActivityBox>,

  // Curiosity Question FeatureBox
  <FeatureBox key="feat-curiosity" title="■ CURIOSITY QUESTION">
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      <strong>Q.&nbsp; Are there any chemical changes that do not obey the Law of Constant Composition?</strong>
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      <strong>Ans.</strong> Law of Constant Composition or Law of Definite Proportions states that a given chemical compound always contains the same elements combined together in a fixed simple whole number ratio by mass. However, several exceptions are observed where this law is not obeyed. A few of these are given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>1. Non-stoichiometric compounds (Berthollides).</strong> These are those compounds where the actual masses of the elements combining together are not in the same ratio as represented by the formula. A few examples are given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>i</em>) <strong>Wustite.</strong> In case of Wustite (an ore of iron), the ideal formula is FeO. But actual samples are always deficient in iron, ranging from Fe<Sub c="0·88" />O to Fe<Sub c="0·95" />O.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>ii</em>) <strong>Palladium hydride.</strong> In this case, the ratio of palladium to hydrogen varies continuously (PdH<Sub c="x" />) depending upon the pressure and temperature during its formation.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>iii</em>) <strong>Transition metal sulphides.</strong> For example, in case of Iron Sulphide (FeS), in the crystal lattice, there are holes where Fe atoms are missing and hence Fe atoms are less. We write the formula as Fe<Sub c="1−x" />S. As the above studies were earlier made by Berthollet, these compounds are called 'Berthollides'.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>2. Isotopic variations.</strong> As atoms of the same element having same atomic number may have different atomic masses (called isotopes), consequently, the law is violated. Two examples are given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>i</em>) <strong>Heavy Water vs Normal Water.</strong> Normal water is H<Sub c="2" />O while heavy water is D<Sub c="2" />O (deuterium oxide). Hydrogen (H) has atomic mass 1 while its isotope, deuterium (D) has atomic mass 2. Thus, though both are water and chemically the same compound, they have different mass ratio of hydrogen to oxygen.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>ii</em>) <strong>Geological Sources.</strong> For example, lead (Pb) found in different mineral deposits may have slightly different average atomic masses because of its radioactive decay.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>3. Polymers.</strong> Polymers are long chain molecules. Molecules of the same polymer may have different chain lengths and hence different ratio of masses of the elements.
    </p>
  </FeatureBox>,

  // 3.2.2
  <SubHd key="sub-s322" id="s322" label="3.2.2" title="Law of Definite Proportions or Law of Constant Composition" />,
  <p key="b1-p-s322-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    This law deals with the composition of elements present in a given compound. It was put forward by J.L. Proust in 1799. It states as follows :
  </p>,
  <DefBox key="def-s322-1">
    A chemical compound is always made up of the same elements combined together in the same fixed proportion by mass.
  </DefBox>,
  <p key="b1-p-s322-2" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, margin: "10px 0 4px 0" }}>
    Examples to illustrate the law of constant proportions :
  </p>,
  <p key="b1-p-s322-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>i</em>) <strong>Water</strong> obtained from any source like river, rain or tap etc. and from any country is always made up of the same elements, <em>i.e.,</em> hydrogen and oxygen combined together in the same fixed proportion, <em>i.e.,</em> 1 : 8 by mass. This can be checked by taking 9 g of water from any source and then decomposing it by passing electricity and collecting the gases formed. We always get 1 g hydrogen and 8 g oxygen.
  </p>,
  <p key="b1-p-s322-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>ii</em>) <strong>Carbon dioxide</strong> can be prepared by any one of the following methods :
  </p>,
  <p key="b1-p-s322-5" style={{ marginLeft: 28, fontSize: 14, lineHeight: 1.9 }}>
    (<em>a</em>) By burning charcoal in air (C + O<Sub c="2" /> <Arrow /> CO<Sub c="2" />).<br />
    (<em>b</em>) By heating limestone (CaCO<Sub c="3" /> <Arrow /> CaO + CO<Sub c="2" />).<br />
    (<em>c</em>) By adding dilute hydrochloric acid on any carbonate (<em>e.g.,</em> Na<Sub c="2" />CO<Sub c="3" /> + 2 HCl <Arrow /> 2 NaCl + H<Sub c="2" />O + CO<Sub c="2" />).<br />
    (<em>d</em>) By heating sodium bicarbonate (2 NaHCO<Sub c="3" /> <Arrow /> Na<Sub c="2" />CO<Sub c="3" /> + H<Sub c="2" />O + CO<Sub c="2" />).
  </p>,
  <p key="b1-p-s322-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    It is found that in each case, carbon dioxide is found to be made up of the same elements, <em>i.e.,</em> carbon and oxygen combined together in the same fixed ratio, <em>i.e.,</em> 12 : 32 or 3 : 8 by mass.
  </p>,
  <p key="b1-p-s322-7" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As the law of constant proportions is true, it helps us to calculate the percentage of any element in the given compound, using the following expression :
  </p>,
  <MathBlock key="b1-mb-s322-1">
    <DefBox key="def-s322-2">
      <em>% of an element in the compound = </em>
      <Frac n="Mass of that element" d="Mass of the compound" /> × 100
    </DefBox>
  </MathBlock>,

  // Numerical Problems — Laws of Chemical Combination
  <NumericalSection key="num-laws" topic="LAWS OF CHEMICAL COMBINATION">
    <p key="b1-np-a1" style={{ fontWeight: 700, fontSize: 14, margin: "0 0 6px 0" }}>A. BASED ON LAW OF CONSERVATION OF MASS</p>
    <p key="b1-np-a-ex1-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 1.</strong> When 4·2 g of sodium hydrogen carbonate (NaHCO<Sub c="3" />) is added to a solution of hydrochloric acid (HCl) weighing <strong>10·0 g</strong>, it is observed that 2·2 g of carbon dioxide (CO<Sub c="2" />) is released into the atmosphere. The residue left behind is found to weigh <strong>12·0 g</strong>. Show that these observations are in agreement with the law of conservation of mass.
    </p>
    <p key="b1-np-a-ex1-s1" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> The reaction is :<br />
      Sodium hydrogen carbonate + Hydrochloric acid <Arrow /> Sodium chloride + Water + Carbon dioxide
    </p>
    <MathBlock key="b1-np-a-ex1-mb1">
      Mass of reactants = Mass of NaHCO<Sub c="3" /> + Mass of HCl solution = 4·2 g + 10·0 g = 14·2 g
    </MathBlock>
    <MathBlock key="b1-np-a-ex1-mb2">
      Mass of products = Mass of CO<Sub c="2" /> + Mass of residue (NaCl + H<Sub c="2" />O) = 2·2 g + 12·0 g = 14·2 g
    </MathBlock>
    <p key="b1-np-a-ex1-s2" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 10px 0" }}>
      As mass of products = mass of reactants, there is no loss or gain of mass during the reaction. Hence, the given observations prove the law of conservation of mass.
    </p>

    <p key="b1-np-a-ex2-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 2.</strong> What mass of silver nitrate will react with <strong>5·85 g</strong> of sodium chloride to produce <strong>14·35 g</strong> of silver chloride and <strong>8·5 g</strong> of sodium nitrate if the law of conservation of mass is true?
    </p>
    <p key="b1-np-a-ex2-s1" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> The reaction is :<br />
      Silver nitrate + Sodium chloride <Arrow /> Silver chloride + Sodium nitrate<br />
      If law of conservation of mass is true,<br />
      Total mass of reactants = Total mass of products<br />
      <em>i.e.,</em> Mass of AgNO<Sub c="3" /> + Mass of NaCl = Mass of AgCl + Mass of NaNO<Sub c="3" /><br />
      We are given :<br />
      Mass of NaCl = 5·85 g, &nbsp;Mass of AgCl = 14·35 g, &nbsp;Mass of NaNO<Sub c="3" /> = 8·5 g
    </p>
    <p key="b1-np-a-ex2-s2" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      Substituting these values in the above equation, we get
    </p>
    <MathBlock key="b1-np-a-ex2-mb1">
      Mass of AgNO<Sub c="3" /> + 5·85 g = 14·35 g + 8·5 g
    </MathBlock>
    <MathBlock key="b1-np-a-ex2-mb2">
      ∴ &nbsp; Mass of AgNO<Sub c="3" /> = (14·35 + 8·5) − 5·85 g = 22·85 − 5·85 = <strong>17·0 g.</strong>
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s322a">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>
        4·90 g of potassium chlorate (KClO<Sub c="3" />) when heated produced 1·92 g of oxygen and the residue (KCl) left behind weighed 2·96 g. Show that these results illustrate the law of conservation of mass.
      </li>
      <li style={{ marginBottom: 6 }}>
        If 6·3 g of sodium carbonate are added to 15·0 g of acetic acid solution, the residue is found to weigh 18·0 g. What is the mass of carbon dioxide released in the reaction? <strong>[Ans. 3·3 g]</strong>
      </li>
    </ol>
  </ProblemsBox>,

  <NumericalSection key="num-const-prop" topic="LAW OF CONSTANT PROPORTIONS">
    <p key="b1-np-b1-q" style={{ fontWeight: 700, fontSize: 14, margin: "0 0 6px 0" }}>B. BASED ON LAW OF CONSTANT PROPORTIONS</p>
    <p key="b1-np-b-ex1-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 1.</strong> Copper oxide was prepared by two different methods. In one case, <strong>1·75 g</strong> of the metal gave 2·19 g of oxide. In the second case, 1·14 g of the metal gave 1·43 g of the oxide. Show that the given data illustrates the law of constant proportions.
    </p>
    <p key="b1-np-b-ex1-s1" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> <span style={{ color: P_COLOR, fontWeight: 700 }}>In case I,</span> &nbsp;mass of copper = 1·75 g &nbsp;&nbsp; mass of copper oxide = 2·19 g
    </p>
    <MathBlock key="b1-np-b-ex1-mb1">
      % of copper in the oxide = <Frac n="Mass of copper" d="Mass of copper oxide" /> × 100 = <Frac n="1·75" d="2·19" /> × 100 = 79·9%
    </MathBlock>
    <MathBlock key="b1-np-b-ex1-mb2">
      ∴ &nbsp; % of oxygen = 100 − 79·9 = 20·1%
    </MathBlock>
    <p key="b1-np-b-ex1-s2" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <span style={{ color: P_COLOR, fontWeight: 700 }}>In case II,</span> &nbsp;mass of copper = 1·14 g &nbsp;&nbsp; mass of copper oxide = 1·43 g
    </p>
    <MathBlock key="b1-np-b-ex1-mb3">
      % of copper in the oxide = <Frac n="1·14" d="1·43" /> × 100 = 79·7%
    </MathBlock>
    <MathBlock key="b1-np-b-ex1-mb4">
      ∴ &nbsp; % of oxygen = 100 − 79·7 = 20·3%
    </MathBlock>
    <p key="b1-np-b-ex1-s3" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 10px 0" }}>
      Thus, copper oxide prepared by any of the given methods contains copper and oxygen in the same proportion by mass (within the experimental error). Hence, it proves the law of constant proportions.
    </p>

    <p key="b1-np-b-ex2-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 2.</strong> Calculate the mass of carbon present in <strong>2 g</strong> of carbon dioxide and hence calculate the percent of carbon present in carbon dioxide.
    </p>
    <p key="b1-np-b-ex2-s1" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> Carbon dioxide (CO<Sub c="2" />) contains C and O in the fixed proportion by mass, which is 12 : 32, <em>i.e.,</em> 3 : 8. This means that 3 g of carbon combine with 8 g of oxygen to form 11 g of CO<Sub c="2" />. In other words,
    </p>
    <MathBlock key="b1-np-b-ex2-mb1">
      11 g of CO<Sub c="2" /> contain C = 3 g
    </MathBlock>
    <MathBlock key="b1-np-b-ex2-mb2">
      ∴ &nbsp; 2 g of CO<Sub c="2" /> will contain C = <Frac n="3" d="11" /> × 2 g = <strong>0·545 g.</strong>
    </MathBlock>
    <MathBlock key="b1-np-b-ex2-mb3">
      % of C = <Frac n="Mass of C" d="Mass of CO₂" /> × 100 = <Frac n="0·545" d="2" /> × 100 = 27·25
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s322b">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>
        Calcium carbonate (CaCO<Sub c="3" />) contains 40% calcium, 12% carbon and 48% oxygen by mass. Knowing that the law of constant composition holds good, calculate the mass of the constituent elements present in 2 g of calcium carbonate. <strong>[Ans. Ca = 0·8 g, C = 0·24 g, O = 0·96 g]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        Apply the law of constant proportions to calculate the mass of oxygen that will be used up for combustion of 5 g of H<Sub c="2" /> gas. <strong>[Ans. 40 g]</strong>
      </li>
    </ol>
  </ProblemsBox>,
];


// ── TABLE SUB-COMPONENTS + CONTENT (batch 2) ─────────────────

// Table 3.1 — Symbols from English names
function TableEnglishSymbols() {
  const rows = [
    ["1. Argon","Ar","15. Iodine","I"],
    ["2. Arsenic","As","16. Lithium","Li"],
    ["3. Aluminium","Al","17. Magnesium","Mg"],
    ["4. Boron","B","18. Manganese","Mn"],
    ["5. Barium","Ba","19. Nitrogen","N"],
    ["6. Bromine","Br","20. Neon","Ne"],
    ["7. Carbon","C","21. Nickel","Ni"],
    ["8. Calcium","Ca","22. Oxygen","O"],
    ["9. Chlorine","Cl","23. Phosphorus","P"],
    ["10. Chromium","Cr","24. Platinum","Pt"],
    ["11. Cobalt","Co","25. Sulphur","S"],
    ["12. Fluorine","F","26. Uranium","U"],
    ["13. Hydrogen","H","27. Zinc","Zn"],
    ["14. Helium","He","",""],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <caption style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 6, captionSide: "top", textAlign: "center" }}>
          TABLE 3.1. Symbols of elements derived from English names.
        </caption>
        <thead>
          <tr>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>English name of the element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>English name of the element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5, fontWeight: j === 1 || j === 3 ? 700 : 400 }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 3.2 — Symbols from Latin names
function TableLatinSymbols() {
  const rows = [
    ["1. Antimony","Stibium","Sb"],
    ["2. Copper","Cuprum","Cu"],
    ["3. Gold","Aurum","Au"],
    ["4. Iron","Ferrum","Fe"],
    ["5. Lead","Plumbum","Pb"],
    ["6. Mercury","Hygrum","Hg"],
    ["7. Potassium","Kalium","K"],
    ["8. Silver","Argentum","Ag"],
    ["9. Sodium","Natrium","Na"],
    ["10. Tin","Stannum","Sn"],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <caption style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 6, captionSide: "top", textAlign: "center" }}>
          TABLE 3.2. Symbols derived from Latin names.
        </caption>
        <thead>
          <tr>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>English name of the element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>Latin name of the element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5, fontWeight: j === 2 ? 700 : 400 }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 3.3 — Atomic masses
function TableAtomicMasses() {
  const rows = [
    ["1. Hydrogen","H","1","14. Sulphur","S","32"],
    ["2. Helium","He","4","15. Chlorine","Cl","35·5"],
    ["3. Lithium","Li","7","16. Argon","Ar","40"],
    ["4. Boron","B","11","17. Potassium","K","39"],
    ["5. Carbon","C","12","18. Calcium","Ca","40"],
    ["6. Nitrogen","N","14","19. Iron","Fe","56"],
    ["7. Oxygen","O","16","20. Copper","Cu","63·5"],
    ["8. Fluorine","F","19","21. Zinc","Zn","65"],
    ["9. Neon","Ne","20","22. Silver","Ag","108"],
    ["10. Sodium","Na","23","23. Platinum","Pt","195"],
    ["11. Magnesium","Mg","24","24. Gold","Au","197"],
    ["12. Aluminium","Al","27","25. Lead","Pb","207"],
    ["13. Phosphorus","P","31","26. Uranium","U","238"],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <caption style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 6, captionSide: "top", textAlign: "center" }}>
          TABLE 3.3. Atomic masses of some common elements (in amu or <em>u</em>).
        </caption>
        <thead>
          <tr>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>Element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Atomic mass</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>Element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Atomic mass</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5, fontWeight: (j === 1 || j === 4) ? 700 : 400, textAlign: (j === 2 || j === 5) ? "center" : "left" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const content_b2 = [
  // KBBox — Measuring Physical Quantities
  <KBBox key="kb-measuring">
    <KBHd>(Measuring Physical Quantities using appropriate apparatus, instruments and devices)</KBHd>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      A physical quantity is anything that can be measured. It consists of two parts — a numerical value and a unit. For example, if a rod is 5 meters long, '5' is the magnitude and 'meter' is the unit.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      A few common physical quantities that we come across during different activities or experiments and how are they measured are briefly given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>(1) Length.</strong> It is expressed in meters (m) or centimeters (cm). A simple device to measure the length of any object is a <strong>ruler</strong>. Placing one corner of the object at the zero of the scale, length can be read directly.
    </p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_2F29733454BCA4DFC470}
      caption="Fig. 3.4"
    />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>(2) Volume.</strong> It is expressed in cm<sup>3</sup> or millilitres (mL) or m<sup>3</sup> or Litres (L). The apparatus used is a <strong>Graduated Cylinder</strong> for measuring the volume of liquids. It is a tall glass cylinder on which mL markings are etched. For irregular solids, volume is measured by displacement, <em>i.e.,</em> how much the level rises when the object is submerged.
    </p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_C215F139E655B4589667}
      caption="Fig. 3.5"
    />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>(3) Time.</strong> It is generally expressed in minutes or seconds. A <strong>Stop-watch</strong> or <strong>Stop-clock</strong> is generally used to record the duration of time.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>(4) Mass.</strong> It is expressed in kilograms (kg) or grams (g). It is generally measured using a <strong>Common Balance</strong> or <strong>Beam Balance</strong>. However, for higher accuracy, a <strong>Digital Balance (Electronic Balance)</strong> is generally used in science laboratories (Note that mass is constant whereas weight changes with gravity). It is faster also as no weights have to be added into the pan and they give the reading directly. Using a digital balance involves the following steps :
    </p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", margin: "8px 0" }}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7CDBFB7D71C06C940EFA} caption="Fig. 3.6 (Stop Watch)" width="30%" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_024DDDEF9F2F5B73FA91} caption="Fig. 3.7 (Stop Clock)" width="30%" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_235DB53A7B0D5D6AB65F} caption="Fig. 3.8 (Digital Balance)" width="30%" />
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.8, margin: "0 0 2px 0" }}>
      (<em>i</em>) <strong>Setting up of the balance.</strong> Place the balance on a flat surface and check the level with a spirit level (a small bubble indicator). Adjust the feet of the balance if required.<br />
      (<em>ii</em>) <strong>Starting of the balance.</strong> Turn the balance on and allow it to warm up for about 15-20 minutes.<br />
      (<em>iii</em>) <strong>Zeroing the balance.</strong> Ensure that the display reads 0·00 g before starting.<br />
      (<em>iv</em>) <strong>Placing the container.</strong> Place the empty beaker, watch glass or a paper on the centre of the pan. The display will show the mass of the container.<br />
      (<em>v</em>) <strong>Tare (Zeroing).</strong> Press the 'Tare' or 'Zero' button. The display will return to zero, subtracting the weight of the container.<br />
      (<em>vi</em>) <strong>Adding the sample.</strong> Add the sample carefully into the container.<br />
      (<em>vii</em>) <strong>Recording the mass.</strong> Wait till the display stops flickering. Then record the value exactly.
    </p>
  </KBBox>,

  // 3.3 Dalton's Atomic Theory
  <SecHd key="sec-s33" id="s33" label="3.3" title="Dalton's Atomic Theory" />,
  <p key="b2-p-s33-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    After the laws of chemical combination were put forward, the next task before the scientists was to give a suitable explanation of these laws. This led John Dalton (who started his career as a school teacher in England and rose to be a great scientist) to put forward a theory in 1808 about the nature of matter. The theory is based on the concept of divisibility of matter, which was put forward by the ancient philosophers. The theory is based on certain postulates called <strong>postulates of Dalton's Atomic Theory</strong>, as described below :
  </p>,

  <SubHd key="sub-s331" id="s331" label="3.3.1" title="Postulates of Dalton's Atomic Theory" />,
  <p key="b2-p-s331-1" style={{ fontSize: 14, lineHeight: 1.75 }}>The main postulates of Dalton's atomic theory are as follows :</p>,
  <p key="b2-p-s331-2" style={{ marginLeft: 16, fontSize: 14, lineHeight: 1.9 }}>
    (1) All matter, whether an element, a compound or a mixture is made up of extremely small particles called atoms (<em>i.e.,</em> same name that was used for the smallest indivisible particles by Greek philosophers).<br />
    (2) Atoms of the same element are identical in all respects, <em>i.e.,</em> size, shape, mass and properties.<br />
    (3) Atoms of different elements have different sizes and masses and also possess different properties.<br />
    (4) Atoms of the same or different elements combine together to form molecules or compounds.<br />
    (5) When atoms of different elements combine together to form compounds, they do so in a simple whole number ratio such as 1 : 1, 2 : 1, 2 : 3 etc.<br />
    (6) Atoms of two different elements may combine in different ratios to form more than one compound. For example, carbon and oxygen may combine to form carbon monoxide (CO) and carbon dioxide (CO<Sub c="2" />) in which the ratios of the combining atoms (C and O) are 1 : 1 and 1 : 2 respectively.<br />
    (7) The <strong><em>number</em></strong> and <strong><em>kind</em></strong> of atoms in a given compound is always fixed.<br />
    (8) Atom is the smallest particle that takes place in a chemical reaction. In other words, whole atoms rather than fractions of atoms take part in a chemical reaction.<br />
    (9) An atom can neither be created nor destroyed, <em>i.e.,</em> atom is indestructible.
  </p>,

  <SubHd key="sub-s332" id="s332" label="3.3.2" title="Explanation of Laws of Chemical Combination by Dalton's Atomic Theory" />,
  <p key="b2-p-s332-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(1) Explanation of Law of Conservation of Mass.</strong> According to Dalton's atomic theory, matter is made up of atoms. Further, atom can neither be created nor destroyed. Hence, matter can neither be created nor destroyed. <em>Alternatively,</em> atom is the smallest particle that takes part in a chemical reaction. Thus, a chemical reaction involves only rearrangement of atoms, <em>i.e.,</em> total number and kind of atoms remain the same. As atoms can neither be created nor destroyed and the atoms have definite masses, therefore, the total mass remains unchanged during a chemical reaction.
  </p>,
  <p key="b2-p-s332-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(2) Explanation of Law of Constant Proportions.</strong> According to one of the postulates of Dalton's atomic theory, the <em>number</em> and <em>kind</em> of atoms in a compound is fixed. As the <em>kind of</em> atoms is fixed, this implies that a compound is always <em>made up of the same elements.</em> Further, as the number of atoms of different elements in the compound is fixed, this means that the ratio of the atoms in the compound is fixed. As atoms have fixed masses, this means that in the compound, <em>the elements are combined in a fixed ratio by mass.</em> Combining both the results, we get law of constant proportions.
  </p>,

  <SubHd key="sub-s333" id="s333" label="3.3.3" title="Limitations/Drawbacks of Dalton's Atomic Theory — Postulates of Modified Dalton's Atomic Theory" />,
  <p key="b2-p-s333-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Dalton's atomic theory was not only able to explain the law of conservation of mass and law of constant proportions but it also predicted another law called <strong>"Law of Multiple Proportions"</strong> which you will study in higher classes. However, with the advancement in scientific studies, it suffered from the following drawbacks :
  </p>,
  <p key="b2-p-s333-2" style={{ marginLeft: 16, fontSize: 14, lineHeight: 1.9 }}>
    <strong>(1) Atom is no longer considered as the smallest indivisible particle.</strong> This is because recent studies have shown that atom is made up of still smaller particles called electrons, protons and neutrons (discussed in chapter 2).<br />
    <strong>(2) Atoms of the same element may have different masses.</strong> For example, there are two types of atoms of chlorine with masses 35 and 37 (on the atomic scale, called 'mass numbers' discussed later). <strong><em>Such atoms of the same element with different mass numbers are called <span style={{ color: "#c0126a" }}>isotopes.</span></em></strong><br />
    <strong>(3) Atoms of different elements may have same masses.</strong> For example, atoms of potassium and calcium are known with same mass number (40). <strong><em>Such atoms of different elements with same mass numbers are known as <span style={{ color: "#c0126a" }}>isobars.</span></em></strong><br />
    <strong>(4) Substances made up of the same kind of atoms may have different properties.</strong> For example, charcoal, graphite and diamond are all made up of carbon atoms but have different physical properties.<br />
    <strong>(5) The ratio in which the different atoms combine to form compound may be fixed and integral but may not be simple.</strong> For example, sugar molecule (C<Sub c="12" />H<Sub c="22" />O<Sub c="11" />) contains C, H and O in the ratio 12 : 22 : 11 which is integral and fixed but not simple.<br />
    <strong>(6) Atom is no longer considered as indestructible.</strong> The basis of atomic bomb is the destruction of atom to produce huge amount of energy.
  </p>,
  <p key="b2-p-s333-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The modifications, as given above, are called the postulates of <strong>"modern atomic theory"</strong>.
  </p>,

  // Appreciation of Scientific Discoveries FeatureBox
  <FeatureBox key="feat-appreciation" title="APPRECIATION OF SCIENTIFIC DISCOVERIES">
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      <strong>(1) By Antoine Lavoisier (1743-1794).</strong> Antoine Lavoisier, a French Scientist, is often called the <strong>'Father of Modern Chemistry'</strong>. His appreciation lies not just in what he discovered but in how he changed the very nature of science moving it from qualitative studies to quantitative studies. The most appreciable contribution by Lavoisier has been about the <em>Law of Conservation of Mass</em>. Before Lavoisier, it was believed that matter could simply vanish during a reaction (like wood burning into a small pile of ash). Lavoisier used precise balances to prove that in a closed system, the mass of the reactants is always equal to the mass of the products. He firmly stated that "nothing is created, nothing is lost, everything is transformed." This principle remains the backbone of stoichiometry and chemical equations today.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      <strong>(2) By Joseph Proust (1754-1826).</strong> Joseph Louis Proust was a French chemist whose main contribution was about <em>'The Law of Definite Proportions'</em> or also called <em>'The Law of Constant Composition'</em> or also called <em>'Proust's Law'</em>. It states that a chemical compound always contains the same elements combined together in a fixed ratio by mass, regardless of the source from which it was obtained or how it was prepared. His initial experiments were on copper carbonate, iron sulphides and tin oxides. He found that the samples synthesised in the laboratory had the same proportion of elements as obtained from natural resources. His discovery helped chemists to predict exactly how much of a substance would be obtained in a reaction, forming the basis for stoichiometry.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>(3) By John Dalton (1766-1844).</strong> John Dalton was a self-taught English scientist. Although he is most famous for his atomic theory, his contributions have been in Chemistry, Physics and even human biology. His theory led to an important result that in chemical reactions, there is only a rearrangement of atoms while atoms are neither created nor destroyed. This helped to explain the Law of Conservation of Mass and the Law of Definite Proportions. His discoveries also helped to calculate relative atomic weights of the atoms of different elements for the first time. He also studied about behaviour of gases which led to Dalton's law of partial pressures. It is used in many scientific studies. Further, he was the first scientist to publish a paper on <em>Colour Blindness</em> (1794). Also, it is thrilling to know that he was a self-taught scientist and he began teaching at a local school at the age of 12.
    </p>
  </FeatureBox>,

  <p key="b2-p-s33-trans" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    We have learnt above that according to Dalton's atomic theory, all matter whether an element, a compound or a mixture is made up of the smallest indivisible particles called atoms. In other words, <strong><em>atoms are considered as building blocks of all matter</em></strong> (just as bricks are the building blocks of a wall). However, in a number of cases, it is found that the smallest particles present in the matter are molecules and not atoms. Hence, it is important to understand the difference between an atom and a molecule. We will, therefore, now discuss each of these one by one.
  </p>,

  // 3.4 What is an Atom
  <SecHd key="sec-s34" id="s34" label="3.4" title="What Is an Atom?" />,
  <DefBox key="def-s34-1">
    An atom is defined as <em>the smallest particle of an element which may or may not be capable of free existence. However, it is the smallest particle that takes part in a chemical reaction.</em>
  </DefBox>,
  <p key="b2-p-s34-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, atoms of noble gases, <em>i.e.,</em> helium, neon, argon, krypton and xenon are unreactive and hence exist in the free state. However, atoms of hydrogen, oxygen, nitrogen etc. are highly reactive and do not exist in the free state. They exist in the combined state with atoms of the same element or atoms of the other elements. For example, they exist as dihydrogen (H<Sub c="2" />), dioxygen (O<Sub c="2" />), dinitrogen (N<Sub c="2" />) etc. or combined with other elements, they may exist as hydrogen chloride (HCl), water (H<Sub c="2" />O), ammonia (NH<Sub c="3" />) etc. The second part of the definition implies that whole number of atoms and not the fractions of atoms take part in a chemical reaction.
  </p>,

  <SubHd key="sub-s341" id="s341" label="3.4.1" title="How big are the atoms? Can we see them?" />,
  <p key="b2-p-s341-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Atoms are extremely small particles, so small in size that they cannot be seen even under a microscope. To imagine about their size, it is interesting to mention here that if millions of atoms are stacked one above the other, the thickness produced may not be equal to the thickness of the sheet of a paper. However, it is only recently that a highly sophisticated microscope known as <strong>Scanning Tunneling Microscope (STM)</strong>, has been devised which has made it possible to take photographs of atoms. The magnified images of the surfaces of the elements are obtained in which individual atoms can be seen. For example, the image of a clean surface of silicon is shown below in Fig. 3.9.
  </p>,
  <p key="b2-p-s341-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As atoms are considered to be spherical, their sizes are expressed in terms of their radii, called <strong>atomic radii.</strong> The atoms are so small in size that their radii are usually expressed in nanometres (nm). Their radii are of the order of 10<Sup c="−10" /> m (1 nm = 10<Sup c="−9" /> m or 1 m = 10<Sup c="9" /> nm). For example, <em>hydrogen atom, which is smallest of all the atoms, has a radius of 0·037 nm</em>.<FootNote>This is half of the bond length of H<Sub c="2" /> (H—H) molecule.</FootNote>
  </p>,
  <Fig
    key="fig-3-9"
    src={CONTENT_IMAGES.CONTENT_IMAGE_F5740867E50FB7CA157D}
    caption="Fig. 3.9. STM image of a clean surface of silicon. The cliffs (peaks) seen are only one atom high"
    width="60%"
  />,
  <p key="b2-p-s341-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    How small are the atoms can be visualized by comparing the size of hydrogen atom with the size of an apple or with that of a grain of sand. Their relative radii are of the order : hydrogen atom (10<Sup c="−10" /> m), grain of sand (10<Sup c="−4" /> m) and apple (10<Sup c="−1" /> m). Thus, size of atom is nearly 10<Sup c="9" /> times smaller than the size of an apple or nearly 10<Sup c="6" /> times smaller than the size of a grain of sand.
  </p>,

  <SubHd key="sub-s342" id="s342" label="3.4.2" title="Symbols used to represent atoms of different elements" />,
  <p key="b2-p-s342-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Symbol is a short method of representing any thing. It may be represented by a figure or a letter etc. For example, DC is symbol for Deputy Commissioner, UP is symbol for Uttar Pradesh or we have road signs or figure of danger mark on some electric poles etc.
  </p>,
  <p key="b2-p-s342-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    In case of elements, <em>symbol means a shorthand method of representing the full name of an element.</em>
  </p>,
  <p key="b2-p-s342-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Dalton's Symbols of Elements.</strong> Dalton was the first scientist to suggest specific symbols in terms of figures for different elements known at that time (which were limited in number). In fact, the symbol used by him also represented the quantity of the element, <em>i.e.,</em> one atom of the element. A few of these symbols, as proposed by Dalton, are shown in fig. 3.10 :
  </p>,
  <Fig
    key="fig-3-10"
    src={CONTENT_IMAGES.CONTENT_IMAGE_927017DF78C4C945EF78}
    caption="Fig. 3.10. Symbols of some elements as proposed by Dalton"
    width="55%"
  />,
  <p key="b2-p-s342-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    However, they are inconvenient to draw and could not become popular.
  </p>,
  <p key="b2-p-s342-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Berzelius' Suggestion for Symbols of Elements.</strong> Berzelius, a Swedish chemist, suggested a more scientific method for representing the full name of an element by using one or two letters from the name of the element. This idea has been used in giving modern symbols to the elements which we use today, as discussed below.
  </p>,
  <p key="b2-p-s342-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <span style={{ color: "#c0126a", fontWeight: 700 }}>Modern Symbols of Elements.</span> Different elements have been named either after the name of the place where they were first discovered or after the name of the scientist who discovered it or on the basis of some important property of the element. For example, the name copper came from Cyprus, Rutherfordium after Rutherford etc. Similarly, gold was so named after the English word which means yellow colour and actinium was so named due to its high radioactivity. However, as more and more elements were discovered, an International Committee was set up, called International Union of Pure and Applied Chemistry (IUPAC), which approved the names of the different elements.
  </p>,
  <p key="b2-p-s342-7" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Though the names of most of the elements have been taken from English, there are some elements which have been named from Latin, German or Greek.
  </p>,
  <p key="b2-p-s342-8" style={{ fontSize: 14, lineHeight: 1.75 }}>Some guidelines for writing the symbols of different elements are given below :</p>,
  <p key="b2-p-s342-9" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong><em>(1) The symbol of an element is the "first letter" or "first letter and another letter" of the English name or Latin name of the element. However, in all cases, the first letter is always capital and another letter (if added) is always a small letter.</em></strong>
  </p>,
  <p key="b2-p-s342-10" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, hydrogen is represented by 'H', oxygen by 'O', carbon by 'C', cobalt by Co, aluminium by Al etc.
  </p>,
  <p key="b2-p-s342-11" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong><em>(2) The necessity of adding another letter arises only in case of elements whose names start with the same letter. However, another letter added is not always the second letter of the name. Further, the another letter added may be a letter from the Latin name of the element.</em></strong>
  </p>,
  <p key="b2-p-s342-12" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, carbon, calcium, cobalt, chlorine and copper all start with the first letter 'C'. Hence, carbon is represented by the one letter symbol 'C' while others are represented by two letter symbols. Thus, calcium is represented by Ca and cobalt by Co (<em>i.e.,</em> another letter added is the second letter of their names) whereas chlorine is represented by Cl (<em>i.e.,</em> another letter added is not the second letter of the name but some other letter from the name). Similarly, the symbol used for copper is 'Cu' which has been derived from the Latin name, cuprum.
  </p>,
  <p key="b2-p-s342-13" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The symbols of some common elements derived from English names are given in Table 3.1 whereas symbols of the elements derived from Latin names are given in Table 3.2.
  </p>,
  <TableEnglishSymbols key="tbl-english-sym" />,
  <TableLatinSymbols key="tbl-latin-sym" />,

  <SubHd key="sub-s343" id="s343" label="3.4.3" title="How do atoms exist?" />,
  <p key="b2-p-s343-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As mentioned above, the atoms of most of the elements are not able to exist freely. They exist <em>in the combined state with other atoms of the same element, e.g.,</em> H<Sub c="2" />, O<Sub c="2" />, N<Sub c="2" />, etc. <em>or with atoms of other elements, e.g.,</em> HCl, H<Sub c="2" />O, etc. These are called molecules. They may also exist <em>in the aqueous solution as ions, e.g.,</em> H<Sup c="+" />, Na<Sup c="+" />, Cu<Sup c="2+" />, Cl<Sup c="−" />, etc. Atoms of only noble gases/inert gases like Helium (He), Neon (Ne), Argon (Ar) etc. exist freely.
  </p>,

  // 3.5 Atomic Mass
  <SecHd key="sec-s35" id="s35" label="3.5" title="Atomic Mass" />,
  <p key="b2-p-s35-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Atoms are extremely small particles. Hence, the actual masses of the atoms are so small that it is difficult to determine the actual masses of individual atoms. For example, actual mass of an atom of hydrogen is found to be 1·673 × 10<Sup c="−24" /> g which is extremely small. However, it was found convenient to compare the masses of atoms of different elements with some reference atom. The masses thus obtained are called <strong>relative atomic masses</strong> and the scale on which these masses are expressed is called <strong>atomic mass scale.</strong>
  </p>,
  <p key="b2-p-s35-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The reference which was chosen in the beginning was hydrogen atom because it was the lightest element. Its mass on the atomic mass scale was taken as 1. The masses of atoms of other elements were found by comparing with the mass of hydrogen atom taken as 1. However, using hydrogen as the reference, the masses of atoms of other elements came out to be fractional. Hence, the reference was changed to oxygen taken as 16. In other words, 1/16th of the mass of an atom of naturally occurring oxygen was taken as one unit. This was selected because of the following two reasons :
  </p>,
  <p key="b2-p-s35-3" style={{ marginLeft: 28, fontSize: 14, lineHeight: 1.8 }}>
    (<em>i</em>) Oxygen combined with most of the elements.<br />
    (<em>ii</em>) By comparing with oxygen taken as 16, the relative atomic masses of most of the elements were found to be whole numbers.
  </p>,
  <p key="b2-p-s35-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    However, a difficulty arose when it was found that naturally occurring oxygen is a mixture of atoms of slightly different masses (called "isotopes").
  </p>,
  <p key="b2-p-s35-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    In 1961, IUPAC recommended the use of an isotope of carbon with mass number 12 as the standard reference for measuring atomic masses. It is called carbon-twelve (C-12) and is represented as <Sup c="12" />C. The atomic mass (or earlier called as "atomic weight") is now defined as follows :
  </p>,
  <DefBox key="def-s35-1">
    <em>The atomic mass of an element is the relative mass of its atoms as compared with the mass of an atom of carbon-12 isotope taken as 12 units.</em>
  </DefBox>,
  <p key="b2-p-s35-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, <Frac n="1" d="12" />th of the mass of an atom of carbon-12 isotope represents one unit of mass on the atomic scale. This is called one atomic mass unit (represented by amu). According to the latest IUPAC recommendations, now it is represented simply by '<em>u</em>' which stands for unified mass (<em>i.e.,</em> having no ambiguity). Hence,
  </p>,
  <DefBox key="def-s35-2">
    <em>Atomic mass unit (amu) may be defined as </em><Frac n="1" d="12" /><em>th of the mass of an atom of carbon-12 isotope on the atomic scale, i.e., 1 amu = </em><Frac n="1" d="12" /><em>th of mass of C-12 isotope.</em>
  </DefBox>,
  <p key="b2-p-s35-7" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    This implies that on the atomic scale, the mass of C-12 isotope is taken as 12 amu (Actual mass of an atom of C-12 isotope is 1·992 × 10<Sup c="−23" /> g).
  </p>,
  <DefBox key="def-s35-3">
    <em>Atomic mass of an element may, therefore, also be defined as the number of times an atom of that element is heavier than </em><Frac n="1" d="12" /><em>th of the mass of an atom of C-12 isotope.</em>
  </DefBox>,
  <p key="b2-p-s35-8" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, an atom of magnesium is found to be two times heavier than an atom of C-12, <em>i.e.,</em> 24 times heavier than <Frac n="1" d="12" />th of the mass of C-12 atom. Hence, atomic mass of magnesium = 24 amu
  </p>,
  <p key="b2-p-s35-9" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Strictly speaking, no units should be written with the atomic masses because they are relative atomic masses.
  </p>,
  <p key="b2-p-s35-10" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Taking mass of C-12 as 12 on the atomic mass scale, the relative atomic mass of hydrogen comes out to be 1·008 amu.
  </p>,
  <p key="b2-p-s35-11" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Further, in a number of cases, the element is found to exist in a number of isotopes. In such cases, average value is taken. For example, chlorine exists in two isotopes with mass numbers 35 and 37 in the ratio of 3 : 1. Hence, average relative atomic mass of chlorine = <Frac n="3 × 35 + 1 × 37" d="3 + 1" /> = 35·5 amu
  </p>,
  <p key="b2-p-s35-12" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, atomic mass may be more correctly defined as follows :
  </p>,
  <DefBox key="def-s35-4">
    <em>The atomic mass of an element is the average relative mass of its atoms as compared with the mass of carbon-12 isotope taken as 12.</em>
  </DefBox>,
  <p key="b2-p-s35-13" style={{ fontSize: 14, lineHeight: 1.75 }}>
    The atomic masses of some common elements are given in Table 3.3 below.
  </p>,
  <TableAtomicMasses key="tbl-atomic-masses" />,
];


// ── TABLE SUB-COMPONENTS + CONTENT (batch 3) ─────────────────

const content_b3 = [
  // 3.6 What is a Molecule?
  <SecHd key="sec-s36" id="s36" label="3.6" title="What Is a Molecule?" />,
  <DefBox key="def-s36-1">
    <em>A molecule is a group of two or more atoms which are held together strongly by some kind of attractive forces. Such an attractive force holding the atoms together is called a </em><span style={{ color: "#c0126a", fontWeight: 700 }}>chemical bond.</span>
  </DefBox>,
  <p key="b3-p-s36-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    We may also define a molecule as follows :
  </p>,
  <DefBox key="def-s36-2">
    <span style={{ color: "#c0126a" }}>A <strong>molecule</strong></span> <em>is the smallest particle of an element or a compound which can exist freely under ordinary conditions and shows all the properties of that substance.</em>
  </DefBox>,
  <p key="b3-p-s36-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As mentioned in the definition, we may have molecules of an element or molecules of a compound. Let us explain each of these one by one.
  </p>,

  <SubHd key="sub-s361" id="s361" label="3.6.1" title="Molecules of elements" />,
  <DefBox key="def-s361-1">
    <em>Molecule of an element means one, two or more atoms of the same element existing as one species in the free state.</em>
  </DefBox>,
  <p key="b3-p-s361-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Depending upon whether the molecule contains one, two, three, four etc. atoms, they are called monoatomic, diatomic, triatomic, tetratomic etc. respectively. A few examples of molecules of different types are given below :
  </p>,
  <p key="b3-p-s361-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>i</em>) <strong>Monoatomic molecules.</strong> Noble gases like helium, neon etc. exist as single atoms, <em>i.e.,</em> He, Ne etc. Hence, their molecules are monoatomic. The symbols for their molecules and atoms are same.
  </p>,
  <Fig
    key="fig-3-11"
    src={CONTENT_IMAGES.CONTENT_IMAGE_71C1C270D81F40A5A918}
    caption="Fig. 3.11. Monoatomic molecules of some elements"
    width="50%"
  />,
  <p key="b3-p-s361-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>ii</em>) <strong>Diatomic molecules.</strong> For example, in a molecule of hydrogen, two atoms of hydrogen exist together. Its molecule is, therefore, represented by H<Sub c="2" />, <em>i.e.,</em> it is a diatomic molecule. Similarly, molecules of oxygen, chlorine, nitrogen etc. are diatomic and are represented by O<Sub c="2" />, Cl<Sub c="2" />, N<Sub c="2" /> etc. Please note that a molecule of hydrogen cannot be represented as 2 H. This will represent two atoms of hydrogen and not a molecule of hydrogen. Same applies to other molecules. For example, molecule of bromine is Br<Sub c="2" />, that of iodine is I<Sub c="2" /> and fluorine is F<Sub c="2" />. In the figures below, the intersecting circles represent overlapping of spheres of atoms when they combine to form molecules.
  </p>,
  <Fig
    key="fig-3-12"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C25925C6B8671896EF1B}
    caption="Fig. 3.12. Diatomic molecules of some elements"
  />,
  <p key="b3-p-s361-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>iii</em>) <strong>Triatomic molecules.</strong> For example, in a molecule of ozone, three atoms of oxygen exist together as one species. Hence, it is triatomic with the formula O<Sub c="3" />.
  </p>,
  <Fig
    key="fig-3-13"
    src={CONTENT_IMAGES.CONTENT_IMAGE_E66C0911179C9DD2ECB8}
    caption="Fig. 3.13. Triatomic molecule of ozone"
    width="30%"
  />,
  <p key="b3-p-s361-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>iv</em>) <strong>Tetratomic molecules.</strong> A very common example of a tetratomic molecule of an element is that of phosphorus, represented by P<Sub c="4" />.
  </p>,
  <p key="b3-p-s361-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Similarly, sulphur exists as an octatomic molecule, represented by S<Sub c="8" />.
  </p>,
  <p key="b3-p-s361-7" style={{ fontSize: 14, lineHeight: 1.75 }}>
    <em>Molecules containing more than four atoms are generally called <span style={{ color: "#c0126a", fontWeight: 700 }}>polyatomic.</span></em><br />
    <em>The number of atoms present in one molecule of the substance is called its <span style={{ color: "#c0126a", fontWeight: 700 }}>atomicity.</span></em>
  </p>,
  <p key="b3-p-s361-8" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Molecules of some elements are very big in size containing a large number of atoms linked together. For example, graphite and diamond contain an infinite number of carbon atoms linked together. These elements are simply represented by their atomic symbols. Besides, graphite and diamond, a third crystalline form of carbon discovered recently contains 60 C-atoms linked together. It is represented by C<Sub c="60" /> and is known as <strong>Buckminster fullerene</strong>. Its structure is like a football. Similarly, all metals (except mercury) also consist of 'giant molecules'. However, they are represented by their atomic symbols and are taken as monoatomic. For example, <em>sodium (Na), iron (Fe), aluminium (Al), copper (Cu) etc. are all monoatomic.</em> The properties of any such solid element are in fact, not the properties of its single atom but the properties of the cluster of atoms.
  </p>,

  <SubHd key="sub-s362" id="s362" label="3.6.2" title="Molecules of Covalent Compounds" />,
  <DefBox key="def-s362-1">
    <em>Molecule of a compound means two or more atoms of different elements combined together in a definite proportion by mass to form a species that can exist freely.</em>
  </DefBox>,
  <Fig
    key="fig-3-14"
    src={CONTENT_IMAGES.CONTENT_IMAGE_AA03BB02EFA252CC8E0A}
    caption="Fig. 3.14. The structure of C₆₀. Buckminster-fullerene : Note that molecule has the shape of a soccer ball (football)"
    width="45%"
  />,
  <p key="b3-p-s362-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, H<Sub c="2" />O represents the molecule of a compound (water) in which two atoms of hydrogen are combined with one atom of oxygen or hydrogen and oxygen are combined in the fixed proportion, <em>i.e.,</em> 1 : 8 by mass. Similarly, CO<Sub c="2" /> represents the molecule of CO<Sub c="2" /> containing C : O in the ratio of 3 : 8 by mass.
  </p>,
  <p key="b3-p-s362-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Just as in case of molecules of an element, the molecules of a compound can be diatomic, triatomic, tetratomic, pentatomic etc. A few examples are given below :
  </p>,
  <p key="b3-p-s362-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>i</em>) <strong>Diatomic molecules,</strong> <em>e.g.,</em> hydrogen chloride (HCl), carbon monoxide (CO) etc.
  </p>,
  <Fig
    key="fig-3-15"
    src={CONTENT_IMAGES.CONTENT_IMAGE_81AA6EBFCCCBFCB903A3}
    caption="Fig. 3.15. Diatomic molecules of the compounds, HCl and CO"
    width="55%"
  />,
  <p key="b3-p-s362-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>ii</em>) <strong>Triatomic molecules,</strong> e.g., water (H<Sub c="2" />O) containing two atoms of hydrogen and one atom of oxygen. Similarly, we have carbon dioxide (CO<Sub c="2" />), sulphur dioxide (SO<Sub c="2" />) etc.
  </p>,
  <Fig
    key="fig-3-16"
    src={CONTENT_IMAGES.CONTENT_IMAGE_6AE17466C27DE70F9D00}
    caption="Fig. 3.16. Triatomic molecules of the compounds, water and carbon dioxide"
    width="60%"
  />,
  <p key="b3-p-s362-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    (<em>iii</em>) <strong>Tetratomic molecule,</strong> e.g., hydrogen peroxide (H<Sub c="2" />O<Sub c="2" />), ammonia (NH<Sub c="3" />) etc.
  </p>,
  <p key="b3-p-s362-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, we may conclude that the smallest particles of which the matter is made up can be atoms or molecules. The properties of the substance are, therefore, the properties of the atoms or molecules depending upon whether the basic units from which the substance is made up of are atoms or molecules.
  </p>,
  <FootNote key="fn-covalent">What are covalent compounds and how are they formed is discussed later in section 3.11.</FootNote>,

  <SubHd key="sub-s363" id="s363" label="3.6.3" title="Naming the molecules of elements" />,
  <p key="b3-p-s363-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    In case of molecules of elements, atomicity is generally not indicated in the name. For example, H<Sub c="2" /> is called hydrogen molecule, O<Sub c="2" /> is called oxygen molecule etc. According to the latest system, they are named as dihydrogen, dioxygen etc.
  </p>,

  <SubHd key="sub-s364" id="s364" label="3.6.4" title="Naming molecules of compounds" />,
  <p key="b3-p-s364-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The compounds consisting of molecules are called <em>"molecular compounds"</em>. These compounds are formed by the combination of two or more non-metal atoms. The simplest case is that of those compounds which are made up from only two elements. <em>Such compounds made up of only two elements are called <strong>binary compounds.</strong></em> For example, hydrogen chloride (HCl), water (H<Sub c="2" />O), ammonia (NH<Sub c="3" />) etc. are binary compounds. Each is made up from two elements. Please note that a binary compound does not mean that it contains only two atoms. For example, H<Sub c="2" />O is a binary compound made up from two elements hydrogen and oxygen, though it contains two atoms of hydrogen and one atom of oxygen. To understand the naming of these compounds, we should understand the term <strong>"electronegativity."</strong>
  </p>,
  <p key="b3-p-s364-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    In a molecule, the atoms are held together by a chemical bond. This bond is nothing but a shared pair of electrons. Each atom in the molecule attracts this shared pair of electrons towards itself. <strong><em>The tendency of an atom in a molecule to attract the shared pair of electrons towards itself is called its <span style={{ color: "#c0126a" }}>electronegativity.</span></em></strong> The atom which attracts the shared pair of electrons more is called more electronegative than the other which attracts less and is called less electronegative. For example, chlorine is more electronegative than hydrogen.
  </p>,
  <p key="b3-p-s364-3" style={{ fontSize: 14, lineHeight: 1.75 }}>Now, we can explain the method of naming binary molecular compounds as follows :</p>,
  <p key="b3-p-s364-4" style={{ marginLeft: 16, fontSize: 14, lineHeight: 1.9 }}>
    (<em>i</em>) The less electronegative element is named first followed by the more electronegative element, <em>e.g.,</em> hydrogen chloride.<br />
    (<em>ii</em>) The name of the more electronegative element is changed to end in –ide, <em>e.g.,</em> hydrogen chloride (HCl), hydrogen sulphide (H<Sub c="2" />S) etc.<br />
    (<em>iii</em>) Common names are quite often used instead of scientific names. For example, H<Sub c="2" />O is called water (and not hydrogen oxide), NH<Sub c="3" /> is called ammonia (and not nitrogen trihydride), CH<Sub c="4" /> is called methane and so on.<br />
    (<em>iv</em>) The number of atoms of each element is generally indicated in the name by adding the prefix di, tri, tetra, penta etc. For example, N<Sub c="2" />O<Sub c="5" /> is called dinitrogen pentoxide; PCl<Sub c="3" /> is called phosphorus trichloride. Also note that if there is only one atom of the first element, the prefix mono is not used. Further, note that we write tetroxide, pentoxide (not tetraoxide, pentaoxide), <em>i.e.,</em> the letter 'a' is dropped.<br />
    (<em>v</em>) If the first element of the molecular compound is hydrogen, the number of its atoms is not written in the name. For example, H<Sub c="2" />S is called hydrogen sulphide and not dihydrogen sulphide.
  </p>,

  <SubHd key="sub-s365" id="s365" label="3.6.5" title="Analogies to differentiate between 'atoms' and 'molecules'" />,
  <p key="b3-p-s365-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(1) Game of building house/any structure from blocks (lego bricks).</strong> An atom is like a single block. It is the smallest individual piece you can start with. You cannot break it down further into smaller pieces. A molecule is like a structure (house etc.) built from those blocks. It is made by connecting two or more atoms (blocks/bricks) together.
  </p>,
  <p key="b3-p-s365-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(2) Alphabet analogy.</strong> Atoms are like letters (A, B, C etc). There are only 26 letters but they make up all words. Molecules are like words (CAT, BAT, CAB etc). You can combine letters to make words. It is interesting to note that just like letter 'A' can also be a word, some atoms (like Helium) can exist alone but most need to combine.
  </p>,
  <p key="b3-p-s365-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Example.</strong> Hydrogen (H) and Oxygen (O) are separate atoms but water (H<Sub c="2" />O) is the molecule formed when two H atoms bond with one O atom.
  </p>,

  // Table 3.6.6 Atoms vs Molecules
  <SubHd key="sub-s366" id="s366" label="3.6.6" title="Characteristics differentiating Atoms and Molecules" />,
  <div key="b3-tbl-atoms-mols" style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
      <thead>
        <tr>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>Characteristic</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Atom</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Molecule</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["1. Definition","It is the smallest unit of an element. It is the fundamental building block of matter.","It is a group of two or more atoms held together by chemical bonds."],
          ["2. Composition","Made of subatomic particles : protons, neutrons and electrons.","Made of atoms bonded together."],
          ["3. Existence","Most atoms cannot exist alone. They are unstable/too reactive except for atoms of noble gases like Helium, Neon etc.","Molecules can usually exist freely because they are stable."],
          ["4. Shape","They are generally spherical.","They have various shapes (linear, angular etc.) depending upon how they are linked."],
          ["5. Example","Oxygen (O) atoms, Hydrogen (H) atoms etc.","Oxygen molecule (O₂) in which two O-atoms are bonded or water (H₂O) in which one O-atom is bonded to two H-atoms."],
        ].map((r, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>{r[0]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[1]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>,

  // Table 3.6.7 Elements vs Compounds
  <SubHd key="sub-s367" id="s367" label="3.6.7" title="Characteristics differentiating Elements and Compounds" />,
  <div key="b3-tbl-elem-comp" style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
      <thead>
        <tr>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Characteristic</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Element</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Compound</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["1. Composition","It consists of only one kind of atoms.","It consists of atoms of two or more different elements chemically bonded together."],
          ["2. Breaking down","It cannot be broken down into simpler substances by chemical means.","It can be broken down into elements by suitable chemical reactions (electrolysis etc.)."],
          ["3. Properties","It retains the unique physical and chemical properties of its atoms.","Its properties are entirely different from its constituent elements."],
          ["4. Representation","It is represented by a symbol, e.g., O, Fe, Au etc.","It is represented by a formula, e.g., H₂O, NaCl etc."],
          ["5. Total number","They are limited in number (118 known so far).","Infinite combinations are possible."],
        ].map((r, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>{r[0]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[1]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>,
  <div key="b3-note-elements" style={{ border: "1.5px solid #333", background: "#f9f9f9", padding: "10px 14px", margin: "10px 0", fontSize: 13.5, lineHeight: 1.75 }}>
    <strong>NOTE &nbsp;</strong>
    1. When elements combine to form a compound, they lose their identity and form a new substance with different properties, <em>e.g.,</em> Na and Cl<Sub c="2" /> lose their identity when they combine to form <strong>NaCl</strong> (sodium chloride).<br />
    2. A compound cannot be separated into its constituents by physical methods like filtering boiling etc., but can be broken into simpler substances by chemical methods.<br />
    3. If the name of the substance appears in the Periodic table, it is an element otherwise it is a compound.
  </div>,

  // Activity 3.3
  <ActivityBox key="act-3-3" num="3.3" sub="To construct simple models of covalent molecules using eco-friendly materials to show how atoms are connected">
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      Covalent molecules contain atoms (which are considered to be spherical) linked by bonds (single, double or triple). The different steps involved in making of their models are as under :
    </p>
    <ActHd>Step 1. Choosing Atoms and Bonds.</ActHd>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      As we are aiming for eco-friendly materials, we should not use plastics. Instead, we should use biodegradable materials.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      <strong>For Atoms.</strong> As atoms are considered to be spherical, make small spherical balls using clay or salt-dough (prepared from flour, salt and water). The sizes of the spherical balls may be made according to the size of the atoms. These sizes are in the order : H &lt; F &lt; O &lt; N &lt; C &lt; B &lt; Cl. To distinguish between different types of atoms, dye these balls with different colours as follows :<br />
      Hydrogen (H) = White, Carbon (C) = Black, Oxygen (O) = Red, Nitrogen (N) = Blue, Chlorine (Cl) or Fluorine (F) = Green, Boron (B) = Pink<br />
      To get these colours, beet juice may be used to get red colour, turmeric for yellow colour, spinach juice for green colour, blue berries for blue colour.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      <strong>For Bonds.</strong> As covalent bonds are represented by straight lines, bamboo sticks (<em>e.g.,</em> from the broom) or tooth pricks may be used. To represent a single bond, one stick may be used, for double bond, two straight sticks may be used and so on.
    </p>
    <ActHd>Step 2. Step-by-Step Construction.</ActHd>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      While making the final model of any covalent molecule, we must know whether the shape of the molecule is linear or bent (V-shape) or tetrahedral etc. Remember that two atoms are always linked by a single or double or triple bond and the molecule is always linear. A few examples are given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}><strong>(<em>a</em>) Diatomic molecules</strong></p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      <strong>H<Sub c="2" />.</strong> Take two smallest size white balls and fix a stick or tooth prick between them.<br />
      <strong>O<Sub c="2" />.</strong> Take two red balls and fix two parallel and close sticks between them.<br />
      <strong>N<Sub c="2" />.</strong> Take two blue balls and fix three parallel and close sticks between them.
    </p>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_20AF693EB8DBFD8A14F6} caption="" width="80%" />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}><strong>(<em>b</em>) Triatomic molecules</strong></p>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_FB9079F506695D6EBA2D} caption="" width="80%" />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}><strong>(<em>c</em>) Tetratomic molecules</strong></p>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_C3392341C0F6B838565D} caption="" width="80%" />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}><strong>(<em>d</em>) Pentatomic molecules</strong></p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_22ACA0115A25BE55CF2A}
      caption="CH₄ (Methane) Tetrahedral — H–C–H Bond angle = 109·5°"
      width="25%"
    />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "4px 0 0 0" }}>
      <em>Alternatively,</em> a model kit is available in the market in which spherical coloured balls are provided to use as atoms and sticks/springs are provided to use as bonds. Balls have holes in which sticks/springs fit. Choose the holes to get proper angles of the molecules.
    </p>
  </ActivityBox>,

  // 3.6.8 Molecular Mass
  <SubHd key="sub-s368" id="s368" label="3.6.8" title="Molecular Mass" />,
  <p key="b3-p-s368-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Just as atomic mass of an element is the average relative mass of its atoms as compared with that of an atom of C-12 isotope taken as 12, similarly, molecular mass is defined as follows :
  </p>,
  <DefBox key="def-s368-1">
    <em>Molecular mass of a substance (element or compound) is the average relative mass of its molecules as compared with that of an atom of C-12 isotope taken as 12. In other words, molecular mass of a substance represents the number of times the molecule of that substance is heavier than 1/12th of the mass of an atom of C-12 isotope.</em>
  </DefBox>,
  <p key="b3-p-s368-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, molecular masses are also expressed in terms of atomic mass units (amu) or unified mass (<em>u</em>) on the atomic scale.
  </p>,

  // 3.6.9 Calculation of Molecular Masses
  <SubHd key="sub-s369" id="s369" label="3.6.9" title="Calculation of Molecular Masses" />,
  <p key="b3-p-s369-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As molecules are made up of two or more atoms of the same or different elements, and each atom has a definite atomic mass, therefore, molecular mass of a molecule of a substance can be calculated by adding atomic masses of all the atoms present in one molecule of the substance. For example,
  </p>,
  <p key="b3-p-s369-2" style={{ marginLeft: 16, fontSize: 14, lineHeight: 1.9 }}>
    (<em>i</em>) A molecule of hydrogen has the formula, H<Sub c="2" />. It contains 2 atoms of hydrogen. Hence, molecular mass of hydrogen = 2 × Atomic mass of hydrogen = 2 × 1·0 u = 2·0 u.<br />
    (<em>ii</em>) A molecule of oxygen has the formula O<Sub c="2" />. Hence, molecular mass of oxygen = 2 × Atomic mass of oxygen = 2 × 16 u = 32 u.<br />
    (<em>iii</em>) A molecule of ozone has the formula O<Sub c="3" />. Hence, molecular mass of ozone = 3 × Atomic mass of oxygen = 3 × 16 u = 48 u.<br />
    (<em>iv</em>) A molecule of water has the formula H<Sub c="2" />O. Hence, molecular mass of H<Sub c="2" />O = 2 × Atomic mass of hydrogen + 1 × Atomic mass of oxygen = 2 × 1·0 u + 16 u = 18 u.<br />
    (<em>v</em>) A molecule of carbon dioxide has the formula CO<Sub c="2" />. Hence, molecular mass of carbon dioxide = 1 × Atomic mass of carbon + 2 × Atomic mass of oxygen = 12·0 u + 2 × 16·0 u = 44·0 u.<br />
    (<em>vi</em>) A molecule of sulphuric acid has the formula H<Sub c="2" />SO<Sub c="4" />. Hence, molecular mass of H<Sub c="2" />SO<Sub c="4" /> = 2 × Atomic mass of H + 1 × Atomic mass of S + 4 × Atomic mass of O = 2 × 1·0 u + 1 × 32 u + 4 × 16 u = 98 u.
  </p>,
  <p key="b3-p-s369-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    A number of experimental methods are used for finding molecular masses, which you will study in higher classes.
  </p>,

  <NumericalSection key="num-mol-mass" topic="CALCULATION OF MOLECULAR MASSES">
    <p key="b3-np-mm-ex1-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 1.</strong> (<em>a</em>) Calculate the relative molecular mass of water (H<Sub c="2" />O). (<em>b</em>) Calculate the molecular mass of HNO<Sub c="3" />.
    </p>
    <p key="b3-np-mm-ex1-s" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      <strong>Solution.</strong> (<em>a</em>) Atomic mass of hydrogen (H) = 1 <em>u</em> &nbsp;&nbsp; Atomic mass of oxygen (O) = 16 <em>u</em><br />
      As water molecule (H<Sub c="2" />O) contains two atoms of hydrogen and one atom of O, molecular mass of water (H<Sub c="2" />O) = 2 × 1 + 1 × 16 = 18 <em>u</em><br />
      (<em>b</em>) Molecular mass of HNO<Sub c="3" /> = Atomic mass of H + atomic mass of N + 3 × Atomic mass of O = 1 + 14 + 3 × 16 = <strong>63 <em>u.</em></strong>
    </p>

    <p key="b3-np-mm-ex2-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 2.</strong> Calculate the molecular masses of the following :
    </p>
    <p key="b3-np-mm-ex2-q2" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>i</em>) C<Sub c="12" />H<Sub c="22" />O<Sub c="11" />&nbsp;&nbsp; (<em>ii</em>) Al<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" />&nbsp;&nbsp; (<em>iii</em>) CuSO<Sub c="4" />·5 H<Sub c="2" />O
    </p>
    <p key="b3-np-mm-ex2-given" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 16px" }}>
      Given atomic masses : C = 12·0 u, H = 1·0 u, O = 16·0 u, Al = 27·0 u, <strong>S = 32·0 u, Cu = 63·5.</strong>
    </p>
    <p key="b3-np-mm-ex2-s1" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> (<em>i</em>) Molecular mass of C<Sub c="12" />H<Sub c="22" />O<Sub c="11" />
    </p>
    <MathBlock key="b3-np-mm-ex2-mb1">
      = 12 × At. mass of C + 22 × At. mass of H + 11 × At. mass of O
    </MathBlock>
    <MathBlock key="b3-np-mm-ex2-mb2">
      = 12 × 12·0 u + 22 × 1·0 u + 11 × 16·0 u = 144 + 22 + 176 u = <strong>342 u.</strong>
    </MathBlock>
    <p key="b3-np-mm-ex2-s2" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      (<em>ii</em>) Molecular mass of Al<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" />
    </p>
    <MathBlock key="b3-np-mm-ex2-mb3">
      = 2 × At. mass of Al + 3 × [At. mass of S + 4 × At. mass of O]
    </MathBlock>
    <MathBlock key="b3-np-mm-ex2-mb4">
      = 2 × 27·0 u + 3 × (32·0 u + 4 × 16·0 u) = 54 u + 3(32 + 64) u = 54 + 3 × 96 u = 54 + 288 u = <strong>342 u.</strong>
    </MathBlock>
    <p key="b3-np-mm-ex2-s3" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      (<em>iii</em>) Molecular mass of CuSO<Sub c="4" />·5 H<Sub c="2" />O
    </p>
    <MathBlock key="b3-np-mm-ex2-mb5">
      = At. mass of Cu + At. mass of S + 4 × At. mass of O + 5 × (2 × At. mass of H + 1 × At. mass of O)
    </MathBlock>
    <MathBlock key="b3-np-mm-ex2-mb6">
      = 63·5 u + 32·0 u + 4 × 16·0 u + 5 (2 × 1·0 u + 16·0 u) = 63·5 + 32·0 + 64·0 + 90·0 u = <strong>249·5 u.</strong>
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s369">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>
        Calculate the molecular mass of potassium permanganate (KMnO<Sub c="4" />). Atomic masses : K = 39·0 u, Mn = 55·0 u, O = 16·0 u. <strong>[Ans. 158 u]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        Calculate the molecular mass of potassium dichromate (K<Sub c="2" />Cr<Sub c="2" />O<Sub c="7" />). Atomic masses : K = 39·0 u, Cr = 52·0, O = 16·0. <strong>[Ans. 294 u]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        Calculate the molecular mass of potassium ferrocyanide, K<Sub c="4" />[Fe(CN)<Sub c="6" />]. Atomic masses : K = 39·0 u, Fe = 56·0 u, C = 12·0 u, N = 14·0 u. <strong>[Ans. 368 u]</strong><br />
        [<strong>Hint.</strong> 4 × 39 u + 56 u + 6 (12 u + 14 u)]
      </li>
    </ol>
  </ProblemsBox>,

  // Beneficial Applications of Atoms and Molecules FeatureBox
  <FeatureBox key="feat-beneficial" title="BENEFICIAL APPLICATIONS OF ATOMS AND MOLECULES">
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      At the most fundamental level, everything in our world is built from atoms and molecules. By understanding and manipulating these tiny structures, scientists have unlocked powerful ways to improve human health, provide clean energy and solve global challenges. A few of these applications are explained below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong style={{ color: "#c0126a" }}>(1) In the field of Medicines.</strong> Modern medicine relies on seeing and treating the body at molecular level. This is because diseases often start with a 'broken' molecular process. Therefore, the cure must also happen at that scale. A few examples are given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>i</em>) <strong>Targeted drug design.</strong> Chemists study the specific shape of a protein or enzyme (a molecule) involved in a disease. They then design 'small molecules' to fit into that protein like a key into a lock stopping the disease without attacking healthy cells.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>ii</em>) <strong>Nuclear medicine.</strong> Doctors use radio-isotopes (unstable atoms) to diagnose and treat illness as explained below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 32px" }}>
      (<em>a</em>) <strong>Diagnosis (Imaging).</strong> A patient might swallow or be injected with a radioactive tracer that emits gamma rays allowing a scan to see internal organs and tumors.<br />
      (<em>b</em>) <strong>Treatment (Therapy).</strong> High energy radiation can be focused directly onto a cancerous tumor to destroy the DNA of harmful cells while sparing the surrounding healthy tissues.<br />
      (<em>c</em>) <strong>Sterilization.</strong> Gamma rays from atomic sources are used to sterilize surgical tools, syringes and bandages quickly and cheaply, preventing infections.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong style={{ color: "#c0126a" }}>(2) Energy (The Power of the Nucleus).</strong> Two common methods of getting energy from the atom are 'Nuclear fission' and 'Nuclear fusion' as briefly explained below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>i</em>) <strong>Nuclear fission.</strong> By splitting the nucleus of a heavy atom like Uranium – 235, a massive amount of heat is released. This heat boils water to produce steam which turns turbines to generate carbon-free electricity. It is highly efficient method as just 1 kilogram of uranium can produce the same amount of energy as produced by 2·7 million kilograms of coal.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>ii</em>) <strong>Nuclear fusion.</strong> This process occurs in the sun where hydrogen atoms keep fusing together to produce huge amount of heat. Scientists are trying to replicate it on the earth. If succeeded, this will provide virtually limitless energy without any radioactive isotope waste.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      It may be noted that in space exploration, atomic batteries (Radioisotope Thermoelectric Generators) are used to get power as solar panels do not work there.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong style={{ color: "#c0126a" }}>(3) Peaceful Use.</strong> Besides medicines and energy, atomic science is used for peaceful purposes to protect our environment and food supply. For example,
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 16px" }}>
      (<em>i</em>) <strong>In agriculture and food safety.</strong> The male pests (like fruit flies) are sterilized by suitable radiation. Consequently, they do not reproduce thereby shrinking the pest population without using the toxic pesticides. Similarly, seeds and crops are exposed to radiation so that they can survive droughts or resist diseases.<br />
      (<em>ii</em>) <strong>In getting salt from sea water (Desalination).</strong> Heat from nuclear reactors is used to remove salt from sea water thereby providing fresh drinking water.<br />
      (<em>iii</em>) <strong>In protecting ecosystem.</strong> By using isotopes as tags, flow of pollutants into the ocean can be controlled thereby protecting the ecosystem.
    </p>
  </FeatureBox>,

  // 3.7 Ions and Ionic Compounds
  <SecHd key="sec-s37" id="s37" label="3.7" title="What Are Ions and Ionic Compounds?" />,
  <p key="b3-p-s37-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The molecular compounds, discussed above, are formed by the combination of two or more non-metals. A number of compounds are known which are formed by the combination of a metal atom with a non-metal atom, <em>e.g.,</em> sodium chloride is formed by the combination of the metal atom, sodium, with the non-metal atom, chlorine. Similarly, calcium oxide is formed from the metal atom, calcium, and the non-metal atom, oxygen. However, in these compounds, the metal and the non-metal atoms are not present as such but are present as charged species. For example, in sodium chloride, sodium is present as Na<Sup c="+" /> and chlorine is present as Cl<Sup c="−" />. Similarly, in calcium oxide, calcium is present as Ca<Sup c="2+" /> and oxygen as O<Sup c="2−" />. In a number of cases, not only single atoms but groups of atoms may carry charge. For example, NH<Sub c="4" /><Sup c="+" /> (ammonium ion), SO<Sub c="4" /><Sup c="2−" /> (sulphate ion), NO<Sub c="3" /><Sup c="−" /> (nitrate ion) etc.
  </p>,
  <p key="b3-p-s37-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <em>An atom or a group of atoms which carries positive or negative charge is called an <span style={{ color: "#c0126a", fontWeight: 700 }}>ion.</span> The ion carrying positive charge is called a <span style={{ color: "#c0126a", fontWeight: 700 }}>cation</span> and the ion carrying negative charge is called an <span style={{ color: "#c0126a", fontWeight: 700 }}>anion.</span> The ions consisting of only single atoms are called <span style={{ color: "#c0126a", fontWeight: 700 }}>monoatomic ions</span> whereas an ion consisting of a group of atoms is called a <span style={{ color: "#c0126a", fontWeight: 700 }}>polyatomic ion.</span> The compounds consisting of cations and anions are called <span style={{ color: "#c0126a", fontWeight: 700 }}>ionic compounds.</span></em>
  </p>,
  <p key="b3-p-s37-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The question as to how the ions are formed has already been discussed in chapter 2. However, at this stage, it is important to know that in any ionic compound, the total positive charge carried by the cation is equal to the total negative charge carried by the anion so that as a whole, the ionic compound is electrically neutral.
  </p>,
  <p key="b3-p-s37-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Further, as discussed earlier, a compound is always made up of the same elements combined together in a fixed proportion by mass. For example, sodium chloride (NaCl) contains sodium and chlorine in the fixed ratio of 23 : 35·5 by mass. Similarly, calcium oxide (CaO) contains calcium and oxygen in the fixed ratio of 40 : 16 or 5 : 2 by mass.
  </p>,
  <p key="b3-p-s37-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Naming of ionic compounds.</strong> Cation is always named first followed by the anion. The number of cations and anions are not written in the name. For example, Al<Sub c="2" />(SO<Sub c="4" />)<Sub c="3" /> is called aluminium sulphate and not dialuminium trisulphate.
  </p>,
];


// ── TABLE SUB-COMPONENTS + CONTENT (batch 4) ─────────────────

// Table 3.4 Valencies of non-metals
function TableValenciesNonMetals() {
  const rows = [
    ["Hydrogen","H","1","Oxygen","O","2"],
    ["Fluorine","F","1","Sulphur","S","2,4,6"],
    ["Chlorine","Cl","1","Nitrogen","N","3"],
    ["Bromine","Br","1","Phosphorus","P","3,5"],
    ["Iodine","I","1","Carbon","C","4"],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <caption style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 6, captionSide: "top", textAlign: "center" }}>
          TABLE 3.4. Valencies of some common non-metal elements.
        </caption>
        <thead>
          <tr>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Valency</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Element</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Symbol</th>
            <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Valency</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5, textAlign: "center" }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 3.5 Common cations
function TableCommonCations() {
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <caption style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 6, captionSide: "top", textAlign: "center" }}>
          TABLE 3.5. Some common cations (positive ions).
        </caption>
        <thead>
          <tr>
            <th colSpan={2} style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "center" }}>Monovalent cations (Valency = 1)</th>
            <th colSpan={2} style={{ background: "#8a0c4b", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "center" }}>Divalent cations (Valency = 2)</th>
            <th colSpan={2} style={{ background: "#600936", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "center" }}>Trivalent cations (Valency = 3)</th>
          </tr>
          <tr>
            {["Name","Symbol","Name","Symbol","Name","Symbol"].map((h,i) => (
              <th key={i} style={{ background: "#f9eef4", color: "#222", padding: "5px 10px", border: "1px solid #ddd", fontSize: 13, fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Hydrogen","H⁺","Magnesium","Mg²⁺","Aluminium","Al³⁺"],
            ["Sodium","Na⁺","Calcium","Ca²⁺","Chromium","Cr³⁺"],
            ["Potassium","K⁺","Barium","Ba²⁺","Iron (III)","Fe³⁺"],
            ["Silver","Ag⁺","Copper (II)","Cu²⁺","Gold (III)","Au³⁺"],
            ["Copper (I)","Cu⁺","Iron (II)","Fe²⁺","",""],
            ["Gold (I)","Au⁺","Zinc","Zn²⁺","",""],
            ["Ammonium","NH₄⁺","Cobalt","Co²⁺","",""],
          ].map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5, fontWeight: j % 2 === 1 ? 700 : 400 }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 3.6 Common anions
function TableCommonAnions() {
  return (
    <div style={{ overflowX: "auto", margin: "12px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <caption style={{ fontWeight: 700, fontSize: 14, color: "#222", marginBottom: 6, captionSide: "top", textAlign: "center" }}>
          TABLE 3.6. Some common anions (negative ions).
        </caption>
        <thead>
          <tr>
            <th colSpan={2} style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "center" }}>Monovalent anions (Valency = 1)</th>
            <th colSpan={2} style={{ background: "#8a0c4b", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "center" }}>Divalent anions (Valency = 2)</th>
            <th colSpan={2} style={{ background: "#600936", color: "#fff", padding: "6px 10px", border: "1px solid #ddd", textAlign: "center" }}>Trivalent anions (Valency = 3)</th>
          </tr>
          <tr>
            {["Name","Symbol","Name","Symbol","Name","Symbol"].map((h,i) => (
              <th key={i} style={{ background: "#f9eef4", color: "#222", padding: "5px 10px", border: "1px solid #ddd", fontSize: 13, fontWeight: 700 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Hydride","H⁻","Carbonate","CO₃²⁻","Phosphate","PO₄³⁻"],
            ["Hydroxide","OH⁻","Sulphite","SO₃²⁻","Borate","BO₃³⁻"],
            ["Chloride","Cl⁻","Sulphate","SO₄²⁻","Arsenate","AsO₄³⁻"],
            ["Bromide","Br⁻","Sulphide","S²⁻","Nitride","N³⁻"],
            ["Iodide","I⁻","Oxide","O²⁻","Phosphide","P³⁻"],
            ["Nitrite","NO₂⁻","Manganate","MnO₄²⁻","",""],
            ["Nitrate","NO₃⁻","Oxalate","C₂O₄²⁻","",""],
            ["Bicarbonate","HCO₃⁻","Chromate","CrO₄²⁻","",""],
            ["Permanganate","MnO₄⁻","Dichromate","Cr₂O₇²⁻","",""],
            ["Cyanide","CN⁻","","","",""],
            ["Chlorate","ClO₃⁻","","","",""],
          ].map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5, fontWeight: j % 2 === 1 ? 700 : 400 }}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const content_b4 = [
  // 3.8 Writing Chemical Formulae
  <SecHd key="sec-s38" id="s38" label="3.8" title="Writing Chemical Formulae of Compounds" />,

  <SubHd key="sub-s381" id="s381" label="3.8.1" title="Concept of Valency" />,
  <p key="b4-p-s381-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <em>Chemical formula of a <strong>molecular compound</strong> represents the actual number of atoms of different elements present in one molecule of the compound,</em> e.g., chemical formula of water is H<Sub c="2" />O, that of ammonia is NH<Sub c="3" /> while that of carbon dioxide is CO<Sub c="2" /> and so on.
  </p>,
  <p key="b4-p-s381-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <em>Chemical formula of an <strong>ionic compound</strong> simply represents the ratio of the cations and anions present in the structure of the compound,</em> e.g., the formula Na<Sup c="+" />Cl<Sup c="−" /> simply represents that sodium chloride contains Na<Sup c="+" /> and Cl<Sup c="−" /> ions in the ratio of 1 : 1 (though the actual crystal of sodium chloride consists of very large but equal number of Na<Sup c="+" /> ions and Cl<Sup c="−" /> ions). Similarly, the formula Mg<Sup c="2+" />Cl<Sub c="2" /><Sup c="−" /> simply tells that it contains Mg<Sup c="2+" /> and Cl<Sup c="−" /> ions in the ratio of 1 : 2 and so on.
  </p>,
  <p key="b4-p-s381-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    However, in both cases, the writing of chemical formula is based on the concept of "valency".
  </p>,
  <p key="b4-p-s381-4" style={{ fontSize: 14, lineHeight: 1.75 }}>For writing the chemical formulae of <strong>molecular compounds</strong>,</p>,
  <DefBox key="def-s381-1">
    <span style={{ color: "#c0126a", fontWeight: 700 }}>Valency of an element</span> <em>is defined as the combining capacity of the element. It is equal to the number of hydrogen atoms or number of chlorine atoms or double the number of oxygen atoms with which one atom of the element combines.</em>
  </DefBox>,
  <p key="b4-p-s381-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, valency of oxygen is 2. This means that one atom of oxygen can combine with two atoms of hydrogen. Hence, the formula of the compound formed is H<Sub c="2" />O (water). Similarly, valency of chlorine is 1. It means that one atom of chlorine can combine with one atom of hydrogen. Hence, the formula of the compound formed is HCl (hydrogen chloride). Likewise, valency of nitrogen is 3. Therefore, its compound with hydrogen has the formula NH<Sub c="3" /> (ammonia).
  </p>,
  <p key="b4-p-s381-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As molecular compounds are formed by the combination of non-metal atoms, the valencies of some common non-metal elements are given below :
  </p>,
  <TableValenciesNonMetals key="tbl-val-nonmetal" />,
  <p key="b4-p-s381-7" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For writing the chemical formulae of ionic compounds, valency is defined as follows :
  </p>,
  <DefBox key="def-s381-2">
    <em>Valency of an ion is defined as the units of positive or negative charge present on the ion.</em>
  </DefBox>,
  <p key="b4-p-s381-8" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, Na<Sup c="+" /> ion has one unit positive charge, its valency = 1, Ca<Sup c="2+" /> has two units positive charge, its valency = 2. Similarly, Al<Sup c="3+" /> has valency = 3. Likewise, in case of negative ions, Cl<Sup c="−" /> has one unit negative charge, its valency = 1, O<Sup c="2−" /> has two units negative charge, its valency = 2 and so on.
  </p>,
  <p key="b4-p-s381-9" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Depending upon whether the valency of an ion is 1, 2, 3 or 4, they are called monovalent, divalent, trivalent or tetravalent respectively.
  </p>,
  <p key="b4-p-s381-10" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For writing the formulae of ionic compounds, it is essential to know the valencies of the cation (positive ion) and the anion (negative ion) present in the compound. We, therefore, first give a list of some common cations and anions along with their valencies in the Table 3.5 and 3.6 :
  </p>,
  <TableCommonCations key="tbl-cations" />,
  <TableCommonAnions key="tbl-anions" />,
  <p key="b4-p-s381-11" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    From the above tables, it may be seen that some elements show a number of valencies (called <strong>variable valencies</strong>). For example, copper shows a valency of 1 as well as 2, iron shows a valency of 2 as well as 3. These valencies are sometimes shown by Roman numeral in a bracket after the symbol of the element, <em>e.g.,</em> Cu (I), Cu (II), Fe (II), Fe (III) etc. Some non-metal atoms also show variable valency. For example, sulphur shows valencies of 2, 4 and 6 in H<Sub c="2" />S, SO<Sub c="2" /> and SO<Sub c="3" /> respectively. Similarly, phosphorus shows valency of 3 and 5 in PCl<Sub c="3" /> and PCl<Sub c="5" /> respectively.
  </p>,

  <SubHd key="sub-s382" id="s382" label="3.8.2" title="Rules for writing the Chemical Formulae" />,
  <p key="b4-p-s382-1" style={{ fontSize: 14, lineHeight: 1.75 }}>The following steps are followed for writing the formulae of molecular or ionic compounds :</p>,
  <p key="b4-p-s382-2" style={{ marginLeft: 16, fontSize: 14, lineHeight: 1.9 }}>
    (1) In case of simple molecular compounds, <em>i.e.,</em> those compounds which are made up of only two elements (and hence also called <strong>binary compounds</strong>), the symbols of the two elements are written side by side and their respective valencies are written below their symbols.<br />
    (2) In case of simple ionic compounds, <em>i.e.,</em> compounds made up of monoatomic ions, the symbol of the metal atom (forming the cation) is written first followed by the symbol of the non-metal atom (forming the anion) and their respective valencies are written below their symbols.<br />
    (3) In case of ionic compounds containing polyatomic ions, the formula of the polyatomic ion is written in brackets and the valencies are written below as in the above cases.<br />
    (4) In any of the above case, if there is a common factor between the valencies of the cation and the anion, the valencies are divided by the common factor.<br />
    (5) Finally, we apply <strong>criss-cross,</strong> <em>i.e.,</em> <strong>cross-over</strong> of the valencies or the charges so that they appear on the lower right hand side of the symbols. However, '1' appearing on the lower right hand side of the symbol is omitted. Similarly, + and − signs of the charges of the ions are omitted.<br />
    (6) For '1' appearing on the lower right hand side of a polyatomic ion, the brackets of the polyatomic ion are also omitted.
  </p>,

  <SubHd key="sub-s383" id="s383" label="3.8.3" title="Chemical Formulae of Simple Molecular Compounds" />,
  <p key="b4-p-s383-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Applying the above rules, the chemical formulae of some simple molecular compounds are explained below:
  </p>,
  <Fig key="b4-fig-s383-1" src={CONTENT_IMAGES.CONTENT_IMAGE_555E6A1C9C815F5CBB94} caption="" width="100%" />,
  <Fig key="b4-fig-s383-2" src={CONTENT_IMAGES.CONTENT_IMAGE_BED2687C7F4BC9E00AF9} caption="" width="100%" />,

  <SubHd key="sub-s384" id="s384" label="3.8.4" title="Chemical Formulae of Some Simple Ionic Compounds" />,
  <p key="b4-p-s384-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Applying the same rules, a few examples are given below :
  </p>,
  <Fig key="b4-fig-s384-1" src={CONTENT_IMAGES.CONTENT_IMAGE_82EC8A4F9408F7F17BD9} caption="" width="100%" />,
  <Fig key="b4-fig-s384-2" src={CONTENT_IMAGES.CONTENT_IMAGE_F46EAD5930837944465B} caption="" width="100%" />,

  <SubHd key="sub-s385" id="s385" label="3.8.5" title="Chemical Formulae of Ionic Compounds containing Polyatomic Ions" />,
  <p key="b4-p-s385-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Same rules apply except that the formula of the polyatomic ion is written in brackets. As already mentioned, if '1' appears on the lower right hand side of the polyatomic ion, the brackets are omitted. The only very common polyatomic cation is NH<Sub c="4" /><Sup c="+" /> whereas there are a number of polyatomic anions as given in Table 3.6. A few examples are given below :
  </p>,
  <Fig key="b4-fig-s385-1" src={CONTENT_IMAGES.CONTENT_IMAGE_24D541435820002DF08F} caption="" width="100%" />,
  <Fig key="b4-fig-s385-2" src={CONTENT_IMAGES.CONTENT_IMAGE_BA3B25BE9953EDB2496E} caption="" width="100%" />,

  <SubHd key="sub-s386" id="s386" label="3.8.6" title="Some General Examples" />,
  <NumericalSection key="num-formulas" topic="WRITING CHEMICAL FORMULAE">
    <p key="b4-np-f-ex1-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 1.</strong> An element <strong>E</strong> is trivalent. Write the formula of its (<em>i</em>) chloride (<em>ii</em>) oxide (<em>iii</em>) sulphide.
    </p>
    <Fig key="b4-fig-ex1" src={CONTENT_IMAGES.CONTENT_IMAGE_1D68CAE3A38069232E6B} caption="" width="100%" />

    <p key="b4-np-f-ex2-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 2.</strong> An element X shows a variable valency of 3 and 5. What are the formulae of the oxides formed by it?
    </p>
    <p key="b4-np-f-ex2-s" style={{ fontSize: 14, lineHeight: 1.9, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong><br />
      (<em>i</em>) Formula of oxide when X has valency = 3:
    </p>
    <Fig key="b4-fig-ex2-1" src={CONTENT_IMAGES.CONTENT_IMAGE_363423E07928FE178293} caption="" width="100%" />
    <p key="b4-np-f-ex2-s2" style={{ fontSize: 14, lineHeight: 1.9, margin: "0 0 8px 0" }}>
      (<em>ii</em>) Formula of oxide when X has valency = 5:
    </p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_EA85397070D3896BF2B1}
      caption="X(5), O(2) → Formula = X₂O₅"
    />

    <p key="b4-np-f-ex3-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 3.</strong> An element M forms the oxide M<Sub c="2" />O<Sub c="3" />. What will be the formula of its phosphate?
    </p>
    <p key="b4-np-f-ex3-s" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> In M<Sub c="2" />O<Sub c="3" />, total charge on three oxide ions = 3 × (−2) = −6<br />
      As the compound M<Sub c="2" />O<Sub c="3" /> is neutral, therefore total charge on two metal atoms should be = +6.<br />
      ∴ Charge on one metal atom = +6/2 = +3, <em>i.e.,</em> Valency of metal atom, M = +3.<br />
      Writing the formula of metal phosphate: M(3+, valency 3), (PO<Sub c="4" />)(3−, valency 3) → Dividing by common factor 3 → Formula = <strong>MPO<Sub c="4" /></strong>
    </p>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_C7DD9EB0A31610420123}
      caption="Criss-cross derivation for MPO₄"
    />
  </NumericalSection>,

  // Activity 3.4
  <ActivityBox key="act-3-4" num="3.4" sub="To design an educational game to write chemical formulas using symbols.">
    <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.75, margin: "0 0 6px 0", color: "#c0126a" }}>Game 1. (The Ionic Puzzle)</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      This game uses the shape of cards to represent the charge of the ions. Students must fit the pieces together to create a perfect rectangle (a neutral compound).
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Cations (+)</strong> may be made out of the cards with "tabs" bulging out. An ion with charge +1 (like Na<Sup c="+" />) has one tab, an ion with charge +2 (like Ca<Sup c="2+" />) has two tabs and so on.
    </p>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", margin: "8px 0" }}>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_E9D1E69EEE93E8ACD917} style={{ maxWidth: 120 }} alt="1 Tab" />
        <div style={{ fontSize: 13, marginTop: 4 }}>Na<Sup c="+" /> (1 Tab)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_F242852DFD72C7D3C275} style={{ maxWidth: 180 }} alt="2 Tabs" />
        <div style={{ fontSize: 13, marginTop: 4 }}>Ca<Sup c="2+" /> (2 Tabs)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_31650E0182022B6E06A5} style={{ maxWidth: 240 }} alt="3 Tabs" />
        <div style={{ fontSize: 13, marginTop: 4 }}>Al<Sup c="3+" /> (3 Tabs)</div>
      </div>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "6px 0 4px 0" }}>
      <strong>Anions (−)</strong> may be made out of the cards with "notches" cut in. An anion with charge −1 (like Cl<Sup c="−" />) has one notch. An anion with charge −2 (like O<Sup c="2−" />) has two notches and so on.
    </p>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap", margin: "8px 0" }}>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_8FD79E0C52BDDC7EE69D} style={{ maxWidth: 120 }} alt="1 Notch" />
        <div style={{ fontSize: 13, marginTop: 4 }}>Cl<Sup c="−" /> (1 Notch)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_C1938CBD0B471BD62DF4} style={{ maxWidth: 180 }} alt="2 Notches" />
        <div style={{ fontSize: 13, marginTop: 4 }}>SO<Sub c="4" /><Sup c="2−" /> (2 Notches)</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_D0C4A769F254476F1CDE} style={{ maxWidth: 240 }} alt="3 Notches" />
        <div style={{ fontSize: 13, marginTop: 4 }}>PO<Sub c="4" /><Sup c="3−" /> (3 Notches)</div>
      </div>
    </div>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "6px 0 4px 0" }}>
      Students must combine cards so that all tabs fill all notches. Thus, if they use one Na<Sup c="+" /> (one tab), they need one Cl<Sup c="−" /> (one notch) only to complete the shape. Similarly, if they use one Ca<Sup c="2+" /> (two tabs), they realize that they need 2 Cl<Sup c="−" /> (one notch each) to complete the shape, leading them to the formula CaCl<Sub c="2" />.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>The formation of NaCl and CaCl<Sub c="2" /> is represented below :</p>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_24C59EB04E66104A4176} caption="NaCl formation" width="40%" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F440AAF18481790B725C} caption="CaCl₂ formation" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_C6F60D8AC2115E3A2C87} caption="Na₂SO₄ formation" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CCE9CE8EFF62AB13843B} caption="CaO formation" />
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "6px 0 4px 0" }}>
      Similarly, building formulas of sodium sulphate and sodium phosphate are represented below in a simplified manner :
    </p>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_992B414C8E7F6B979F3C} caption="Na₂SO₄ and Na₃PO₄ simplified" />
    <div style={{ border: "1.5px solid #333", background: "#f9f9f9", padding: "8px 12px", margin: "8px 0", fontSize: 13.5, lineHeight: 1.75 }}>
      <strong>NOTE </strong>It is advisable to make cations of one colour (say black) and anions of another colour (say red). This helps to distinguish between metals and non-metals (as metals form cations whereas non-metals form anions).
    </div>

    <p style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.75, margin: "10px 0 6px 0", color: "#c0126a" }}>Game 2. Chemical Rummy (Card Game)</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      Create a deck (pack of cards) where symbols (formulas) of cations and anions along with their valencies are written on them (<em>e.g.,</em> Na<Sup c="+" />, K<Sup c="+" />, Ca<Sup c="2+" />, Al<Sup c="3+" />, Cl<Sup c="−" />, CO<Sub c="3" /><Sup c="2−" />, NO<Sub c="3" /><Sup c="−" />, SO<Sub c="4" /><Sup c="2−" />, PO<Sub c="4" /><Sup c="3−" /> etc.). One player should draw out a card from the deck and throw it on the table. Now, let other players draw card one by one. Throw it on the table if it can neutralize the charge of the first card (fully or partially). Let other players draw cards one by one and throw till the charge of the first card is completely neutralised.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example.</strong> (1) Suppose the first card thrown is with the symbol Ca<Sup c="2+" />. The next player throws a card with one Cl<Sup c="−" />. The charge is not completely neutralized till another player throws another card with symbol Cl<Sup c="−" />. Now, we have one card with Ca<Sup c="2+" /> and two cards each with Cl<Sup c="−" />. Hence, the formula is CaCl<Sub c="2" />. If the second card thrown was with symbol CO<Sub c="3" /><Sup c="2−" />, this alone will neutralize the charge. Hence, the formula will be CaCO<Sub c="3" />.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      (2) Suppose the first card thrown is with symbol SO<Sub c="4" /><Sup c="2−" />. The cards to be thrown on it should be cations. Two cards with symbol Na<Sup c="+" /> will have to be thrown to neutralize the charge. This will give the formula Na<Sub c="2" />SO<Sub c="4" />. Alternatively, one card with symbol (say Ca<Sup c="2+" />) will have to be thrown to neutralize the charge and hence, the formula will be CaSO<Sub c="4" />.
    </p>
  </ActivityBox>,

  // 3.8.7 Formula Unit Mass
  <SubHd key="sub-s387" id="s387" label="3.8.7" title="Formula Unit Mass" />,
  <p key="b4-p-s387-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Ionic compounds like sodium chloride consist of a very large but equal number of sodium ions and chloride ions arranged in a definite order in the crystal lattice (Fig. 3.17 <em>a</em>). Thus, the actual formula of sodium chloride should be written as (Na<Sup c="+" />)<Sub c="n" />(Cl<Sup c="−" />)<Sub c="n" /> or (Na<Sup c="+" />Cl<Sup c="−" />)<Sub c="n" /> where <em>n</em> is a very large number. The formula of sodium chloride, written as Na<Sup c="+" />Cl<Sup c="−" /> represents only the simplest formula and not the actual formula (Fig. 3.17 <em>b</em>). The formula Na<Sup c="+" />Cl<Sup c="−" /> is, therefore, called <strong>one formula unit.</strong> Similarly, the formula, MgCl<Sub c="2" />, represents one formula unit of magnesium chloride made up of Mg<Sup c="2+" /> and Cl<Sup c="−" /> ions in the ratio of 1 : 2.
  </p>,
  <Fig
    key="fig-3-17"
    src={CONTENT_IMAGES.CONTENT_IMAGE_A27D0AE5F5835DB037E5}
    caption="Fig. 3.17. (a) NaCl crystal consisting of a large number of Na⁺ and Cl⁻ ions arranged in a definite order, (b) One formula unit of NaCl"
    width="60%"
  />,
  <p key="b4-p-s387-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, ionic compounds do not exist in the molecular form. Hence, to speak of molecular mass of such compounds is not correct. In such cases, instead of molecular mass, the term 'formula unit mass' is used.
  </p>,
  <DefBox key="def-s387-1">
    <em>The <span style={{ color: "#c0126a", fontWeight: 700 }}>formula unit mass</span> of a substance is the sum of the atomic masses of all the atoms present in one formula unit of the compound.</em>
  </DefBox>,
  <p key="b4-p-s387-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example, formula unit mass of NaCl = Atomic mass of Na + Atomic mass of Cl = 23 + 35·5 = 58·5 u.
  </p>,
  <p key="b4-p-s387-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    As molecular mass is calculated from the formula of the compound, therefore, as a matter of fact, molecular mass of a substance is equal to its formula unit mass.
  </p>,
  <NumericalSection key="num-fum" topic="FORMULA UNIT MASS">
    <p key="b4-np-fum1-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 1.</strong> Calculate the formula unit mass of CaCl<Sub c="2" />.
    </p>
    <p key="b4-np-fum1-s" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 8px 0" }}>
      <strong>Solution.</strong> Formula unit mass of CaCl<Sub c="2" /> = Atomic mass of Ca + 2 × Atomic mass of Cl = 40 + 2 × 35·5 = 40 + 71 = <strong>111 u.</strong>
    </p>

    <p key="b4-np-fum2-q" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Example 2.</strong> Calculate the formula unit mass of Na<Sub c="2" />CO<Sub c="3" />·10 H<Sub c="2" />O.<br />
      <strong>Atomic masses :</strong> Na = 23·0 u, C = 12·0 u, O = 16·0 u, H = 1·0 u.
    </p>
    <p key="b4-np-fum2-s" style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 4px 0" }}>
      <strong>Solution.</strong> Formula unit mass of Na<Sub c="2" />CO<Sub c="3" />·10 H<Sub c="2" />O
    </p>
    <MathBlock key="b4-np-fum2-mb1">
      = 2 × At. mass of Na + At. mass of C + 3 × At. mass of O + 10 (2 × At. mass of H + At. mass of O)
    </MathBlock>
    <MathBlock key="b4-np-fum2-mb2">
      = 2 × 23·0 u + 12·0 u + 3 × 16·0 u + 10 (2 × 1·0 + 16·0) u = 46·0 + 12·0 + 48·0 + 180 u = <strong>286 u.</strong>
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s387">
    <p style={{ fontSize: 14, lineHeight: 1.75, margin: "0 0 6px 0" }}>
      Calculate the formula unit mass of Na<Sub c="2" />SO<Sub c="4" />·10 H<Sub c="2" />O<br />
      Atomic masses : Na = 23·0 u, S = 32·0 u, O = 16·0 u, H = 1·0 u. <strong>[Ans. 322 u]</strong>
    </p>
  </ProblemsBox>,

  <div key="b4-note-formula" style={{ border: "1.5px solid #333", background: "#f9f9f9", padding: "10px 14px", margin: "10px 0", fontSize: 13.5, lineHeight: 1.75 }}>
    <strong>NOTE </strong>
    (<em>i</em>) The importance of writing a polyatomic ion in brackets may be clearly understood. For example, in the formula of calcium hydroxide, if we don't write brackets, the formula will become <strong>CaOH<Sub c="2" /></strong> which means it contains 1 atom of oxygen and two atoms of hydrogen, which is wrong. The actual formula, Ca(OH)<Sub c="2" /> implies that there are two OH groups, <em>i.e.,</em> two O-atoms and two H-atoms.<br />
    (<em>ii</em>) A number before the formula multiplies the whole formula, <em>i.e.,</em> every constituent and not only the first constituent. For example, 2 H<Sub c="2" />O means two molecules of water, <em>i.e.,</em> the number 2 written before the formula multiplies hydrogen as well as oxygen and not only hydrogen. Thus, 2 H<Sub c="2" />O means 4 atoms of hydrogen and two atoms of oxygen and not 4 atoms of hydrogen and one atom of oxygen.
  </div>,

  // 3.9 Characteristics Differentiating Cations and Anions
  <SecHd key="sec-s39" id="s39" label="3.9" title="Characteristics Differentiating Cations and Anions" />,
  <div key="b4-tbl-cat-an" style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
      <thead>
        <tr>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Characteristic</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Cation</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Anion</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["1. Charge","They carry positive (+) charge.","They carry negative (−) charge."],
          ["2. Formation","They are formed by loss of electron(s).","They are formed by gain of electron(s)."],
          ["3. Electron Count","They have fewer electrons than protons.","They have more electrons than protons."],
          ["4. Element Type","Generally formed by metals.","Generally formed by non-metals."],
          ["5. Relative size","Smaller than parent atom.","Larger than parent atom."],
          ["6. Electrode Attraction","Move towards cathode (negative electrode).","Move towards anode (positive electrode)."],
          ["7. Nomenclature","Same name as that of the parent element, e.g., Sodium → Sodium ion","The suffix of the name of the element is generally changed to -ide, e.g., Chlorine → Chloride ion; Oxygen → Oxide ion"],
        ].map((r, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>{r[0]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[1]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>,

  // 3.10 Mol Mass vs Formula Unit Mass
  <SecHd key="sec-s310" id="s310" label="3.10" title="Characteristics Differentiating Molecular Mass and Formula Unit Mass" />,
  <div key="b4-tbl-molmass" style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
      <thead>
        <tr>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Characteristic</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Molecular Mass</th>
          <th style={{ background: "#c0126a", color: "#fff", padding: "6px 10px", border: "1px solid #ddd" }}>Formula Unit Mass</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["1. Type of Compound","Used for covalent (Molecular) compounds.","Used for ionic compounds."],
          ["2. Constituent Particles","Discrete molecules (atoms linked by covalent bonds).","Ions in crystal lattice form 3-dimensional (3 D) grid of ions with alternate charges."],
          ["3. Formula Used","Molecular formula which represents the actual number of atoms in one molecule.","Formula unit which represents the simplest whole number ratio of ions."],
          ["4. Examples","H₂O (Water), CO₂ (Carbon dioxide).","NaCl (Table Salt), MgCl₂ (Magnesium chloride)."],
        ].map((r, i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>{r[0]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[1]}</td>
            <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>,
  <p key="b4-p-s310-1" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, margin: "8px 0 4px 0" }}>Calculations</p>,
  <p key="b4-p-s310-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Molecular Mass</strong> is used for substances that exist as independent, individual units called molecules. For example, a glass of water contains trillions of separate H<Sub c="2" />O units.
  </p>,
  <MathBlock key="b4-mb-s310-1">
    Molecular mass of H<Sub c="2" />O = 2 × Atomic mass of H (1·0 u) + Atomic mass of O (16·0 u) = 18·0 u
  </MathBlock>,
  <p key="b4-p-s310-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Formula Unit Mass</strong> is used for ionic compounds which do not form discrete molecules. Instead they consist of giant lattice consisting of large number of cations and anions. Thus, NaCl should be represented as Na<Sub c="n" />Cl<Sub c="n" /> or (NaCl)<Sub c="n" />. Thus, there are no NaCl molecules but they are present in the ratio of 1 : 1. That is why we represent it as NaCl.
  </p>,
  <MathBlock key="b4-mb-s310-2">
    Formula Unit Mass of NaCl = 1 × Atomic mass of Na (23·0) + 1 × Atomic mass of Cl (35·5 u) = 58·5 u
  </MathBlock>,
  <div key="b4-note-s310" style={{ border: "1.5px solid #333", background: "#f9f9f9", padding: "8px 12px", margin: "8px 0", fontSize: 13.5, lineHeight: 1.75 }}>
    <strong>NOTE </strong>In many general contexts, "formula mass" is used for both but molecular mass is technically incorrect for ionic substances because they do not contain molecules.
  </div>,
];


// ── TABLE SUB-COMPONENTS + CONTENT (batch 5) ─────────────────

// Table: Noble gas configurations (3.11.1)
function TableNobleGasConfig() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: "#c0126a", color: "#fff" }}>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "left" }}></th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Noble Gas</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Atomic No.</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Electronic Configuration</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Helium", "(He)", "2", "2"],
            ["Neon", "(Ne)", "10", "2, 8"],
            ["Argon", "(Ar)", "18", "2, 8, 8 and so on"],
          ].map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 600, fontSize: 13.5 }}>{r[0]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontSize: 13.5 }}>{r[1]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontSize: 13.5 }}>{r[2]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontSize: 13.5 }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table: Electronic configurations of other elements (3.11.1)
function TableElemConfigs() {
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: "#c0126a", color: "#fff" }}>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "left" }}></th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "left" }}>Element</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Atomic No.</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Electronic configuration</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Hydrogen", "(H)", "1", "1"],
            ["Lithium", "(Li)", "3", "2, 1"],
            ["Beryllium", "(Be)", "4", "2, 2"],
            ["Carbon", "(C)", "6", "2, 4"],
            ["Nitrogen", "(N)", "7", "2, 5"],
            ["Oxygen", "(O)", "8", "2, 6"],
            ["Fluorine", "(F)", "9", "2, 7"],
            ["Sodium", "(Na)", "11", "2, 8, 1"],
            ["Magnesium", "(Mg)", "12", "2, 8, 2"],
            ["Aluminium", "(Al)", "13", "2, 8, 3 and so on"],
          ].map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 600, fontSize: 13.5 }}>{r[0]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[1]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontSize: 13.5 }}>{r[2]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontSize: 13.5 }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table 3.14: Characteristics differentiating ionic and covalent compounds
function TableIonicVsCovalent() {
  const rows = [
    ["1. Bond formation", "Formed by transfer of electrons forming cations and anions.", "Formed by sharing of electrons (no ions formed)."],
    ["2. Constituent Elements", "Metal + Non-metal", "Non-metal + Non-metal"],
    ["3. Physical State", "Crystalline solids at room temperature.", "Solids, liquids or gases."],
    ["4. Melting/Boiling Points", "High melting/boiling points due to strong electrostatic forces of attraction between ions.", "Low melting/boiling points due to weak intermolecular forces (covalent bonds/van der Waal's forces)."],
    ["5. Electrical Conductivity", "High in the molten state or aqueous solution.", "Poor/Nil, being insulators."],
    ["6. Solubility in water", "Generally soluble.", "Generally insoluble except polar ones."],
    ["7. Hardness", "Hard and brittle.", "Soft and flexible."],
    ["8. Speed of reactions", "In solution, they react fast.", "They react slowly."],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: "#c0126a", color: "#fff" }}>
            <th style={{ padding: "6px 10px", border: "1px solid #ddd", textAlign: "left", minWidth: 140 }}>Characteristic</th>
            <th style={{ padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>Ionic Compounds</th>
            <th style={{ padding: "6px 10px", border: "1px solid #ddd", textAlign: "left" }}>Covalent Compounds</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdf0f7" }}>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontWeight: 700, fontSize: 13.5 }}>{r[0]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[1]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Table: SI Prefixes (KBBox)
function TableSIPrefixes() {
  const rows = [
    ["deci", "d", "10\u207B\u00B9", "1 decimetre = 10\u207B\u00B9 m = 0\u00B71 m"],
    ["centi", "c", "10\u207B\u00B2", "1 centimetre (cm) = 10\u207B\u00B2 m = 0\u00B701 m"],
    ["milli", "m", "10\u207B\u00B3", "1 millimetre (mm) = 10\u207B\u00B3 m"],
    ["micro", "\u03BC", "10\u207B\u2076", "1 micrometre (\u03BCm) = 10\u207B\u2076 m"],
    ["nano", "n", "10\u207B\u2079", "1 nanometer (nm) = 10\u207B\u2079 m"],
    ["pico", "p", "10\u207B\u00B9\u00B2", "1 picometre (pm) = 10\u207B\u00B9\u00B2 m"],
    ["deka", "da", "10\u00B9", "1 dekametre (dam) = 10 m"],
    ["kilo", "k", "10\u00B3", "1 kilometre (km) = 10\u00B3 m = 1000 m"],
    ["mega", "M", "10\u2076", "1 megametre (Mm) = 10\u2076 m"],
  ];
  return (
    <div style={{ overflowX: "auto", margin: "10px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: "#444", color: "#fff" }}>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "left" }}>Prefix</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Symbol</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "center" }}>Multiplying factor</th>
            <th style={{ padding: "6px 12px", border: "1px solid #ddd", textAlign: "left" }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f5f5f5" }}>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[0]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontStyle: "italic", fontSize: 13.5 }}>{r[1]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", textAlign: "center", fontSize: 13.5 }}>{r[2]}</td>
              <td style={{ padding: "5px 10px", border: "1px solid #ddd", fontSize: 13.5 }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const content_b5 = [
  // ── 3.11 FORMATION OF IONIC AND COVALENT COMPOUNDS ──────────────
  <SecHd key="b5-sec-s311" id="s311" label="3.11" title="Formation of Ionic and Covalent Compounds" />,

  // 3.11.1
  <SubHd key="b5-sub-s311-1" id="s311-1" label="3.11.1" title="Why do atoms combine to form compounds?" />,
  <p key="b5-p-s311-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Let us look at the electronic configurations of noble gases.
  </p>,
  <TableNobleGasConfig key="b5-tbl-noble" />,
  <p key="b5-p-s311-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    We observe that all noble gases have 8 electrons in their outermost shell (called <em>octet</em>) except Helium, which has 2 electrons in the outermost shell (called <em>duplet</em>). Also, we know that noble gases are inactive (inert) or stable.
  </p>,
  <p key="b5-p-s311-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Now let us look at the electronic configurations of a few other elements, <em>e.g.,</em>
  </p>,
  <TableElemConfigs key="b5-tbl-elemconfigs" />,
  <p key="b5-p-s311-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    In all these cases, the outermost shell contains less than 8 electrons and they are chemically reactive. This leads to the conclusion that all elements other than noble gases have a tendency to complete their octet (outermost shell containing 8 electrons) or duplet in case of hydrogen, lithium and beryllium so that they become stable. This led to the following rule called <strong>octet rule</strong> :
  </p>,
  <DefBox key="b5-def-octet">
    The atoms of different elements combine with each other in order to complete their octet (<em>i.e.,</em> 8 electrons in the outermost shell) or duplet (outermost shell containing 2 electrons) in case of hydrogen (H), lithium (Li) and beryllium (Be) to attain stable nearest noble gas configuration.
  </DefBox>,

  // 3.11.2
  <SubHd key="b5-sub-s311-2" id="s311-2" label="3.11.2" title="How do atoms combine?" />,
  <p key="b5-p-s311-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    There are two ways by which the atoms complete their octet (or duplet) as follows :
  </p>,
  <p key="b5-p-s311-6" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (1) By complete transference of electron/s from one atom to another. The bond thus formed is called <strong>ionic bond</strong>.
  </p>,
  <p key="b5-p-s311-7" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (2) By mutual sharing of electrons between the two atoms. The bond thus formed is called <strong>covalent bond</strong>.
  </p>,

  // 3.11.3
  <SubHd key="b5-sub-s311-3" id="s311-3" label="3.11.3" title="Representing the valence electrons (Lewis Symbols/Electron Dot Symbols)" />,
  <p key="b5-p-s311-8" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The number of electrons present in the outermost shell are represented by dots around the symbol of the atom. For example,
  </p>,
  <Fig key="b5-fig-lewis-symbols"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0A58323D35402688A283}
    caption="Lewis symbols (electron dot symbols) of Li, Be, B, C, N, O, F, Ne"
    width={657}
  />,

  // 3.11.4
  <SubHd key="b5-sub-s311-4" id="s311-4" label="3.11.4" title="Formation of Ionic Bond/Ionic Compounds" />,
  <DefBox key="b5-def-ionic">
    When a bond is formed by complete transference of electrons from one atom to another so as to complete their octets (or duplets in case of H, Li, Be etc.) and hence acquire the stable nearest noble gas configuration, the bond formed is called <strong>ionic bond</strong> or <strong>electrovalent bond</strong> and the compound formed is called <strong>ionic compound</strong> or <strong>electrovalent compound</strong>. The number of electrons lost or gained is called <strong>electrovalency</strong>.
  </DefBox>,
  <p key="b5-p-s311-9" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The atom which loses electron/electrons acquires a positive charge and the ion thus formed is called <strong>cation</strong>. The amount of charge is equal to the number of electrons lost, <em>e.g.,</em>
  </p>,
  <MathBlock key="b5-mb-cation">
    Na <Arrow /> Na<Sup c="+" /> + <em>e</em><Sup c="−" />,{"  "}Ca <Arrow /> Ca<Sup c="2+" /> etc.
  </MathBlock>,
  <p key="b5-p-s311-10" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The atom which gains electron/electrons acquires a negative charge and the ion thus formed is called <strong>anion</strong>. The amount of charge is equal to the number of electrons gained, <em>e.g.,</em>
  </p>,
  <MathBlock key="b5-mb-anion">
    Cl + 1<em>e</em> <Arrow /> Cl<Sup c="−" />,{"  "}O + 2<em>e</em><Sup c="−" /> <Arrow /> O<Sup c="2−" /> etc.
  </MathBlock>,
  <p key="b5-p-s311-11" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The oppositely charged ions thus formed are held together by strong electrostatic forces of attraction. Such a bond is formed when one atom can easily lose electrons (generally metals) and the other can easily gain electrons (generally non-metals) and as a result both acquire nearest noble gas configuration.
  </p>,
  <p key="b5-p-s311-12" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, margin: "10px 0 4px 0" }}>
    Examples to illustrate the Formation of Ionic Compounds :
  </p>,
  <p key="b5-p-nacl-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(1) Formation of sodium chloride.</strong> Sodium (atomic number = 11) has electronic configuration 2, 8, 1. By losing one electron of its outermost shell, it acquires the inert gas configuration of neon and changes into sodium ion.
  </p>,
  <MathBlock key="b5-mb-na-ion">
    <span style={{ textDecoration: "underline" }}>Na·</span><sub style={{ fontSize: "0.75em" }}>2,8,1</sub>{"  "}<Arrow />{"  "}Na<Sup c="+" /><sub style={{ fontSize: "0.75em" }}>2,8</sub> + <em>e</em><Sup c="−" />
  </MathBlock>,
  <p key="b5-p-nacl-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    On the other hand, chlorine (atomic number = 17) having electronic configuration 2, 8, 7 accepts one electron released by sodium to complete its octet and acquire stable configuration of argon. In this process, chlorine is converted into chloride ion.
  </p>,
  <Fig key="b5-fig-cl-ion"
    src={CONTENT_IMAGES.CONTENT_IMAGE_81B284A5EF9D5891CF9F}
    caption="Formation of Cl⁻ ion"
    width={541}
  />,
  <p key="b5-p-nacl-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Now, we have two species, one is positively charged sodium ion and the other is negatively charged chloride ion. As they approach each other, they are held together by strong electrostatic forces of attraction. Thus, formation of sodium chloride takes place.
  </p>,
  <Fig key="b5-fig-nacl-form"
    src={CONTENT_IMAGES.CONTENT_IMAGE_EFA0F1B579E2B2135CB2}
    caption="Formation of NaCl"
    width={654}
  />,
  <p key="b5-p-caf2-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(2) Formation of calcium fluoride.</strong> Calcium (atomic No = 20, electronic configuration = 2, 8, 8, 2) loses two electrons to attain the stable noble gas configuration of argon. As a result, it is converted into calcium ion. On the other hand, fluorine (atomic No. = 9, electronic configuration = 2, 7) can gain one electron to acquire the stable configuration of neon. As a result, it is converted into fluoride ion.
  </p>,
  <p key="b5-p-caf2-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Here, calcium atom loses two electrons and forms calcium ion with two units of positive charge and the two electrons are transferred to two fluorine atoms, which are converted into fluoride ions, each with one unit negative charge. These oppositely charged ions are then held together by strong electrostatic forces of attraction.
  </p>,
  <Fig key="b5-fig-caf2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_BBC88179DD110919894B}
    caption="Formation of CaF₂"
    width={845}
  />,
  <p key="b5-p-more-ionic" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, margin: "10px 0 4px 0" }}>
    Some More Examples of Formation of Ionic Bonds :
  </p>,
  <p key="b5-p-mgo-label" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    <strong>(1) Formation of magnesium oxide from magnesium and oxygen.</strong>
  </p>,
  <Fig key="b5-fig-mgo"
    src={CONTENT_IMAGES.CONTENT_IMAGE_B6F7BFDBA321C19EFC3B}
    caption="Formation of MgO"
    width={793}
  />,
  <p key="b5-p-mgbr2-label" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    <strong>(2) Formation of magnesium bromide from magnesium and bromine.</strong>
  </p>,
  <Fig key="b5-fig-mgbr2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_7A6567B2D3D81F7424D9}
    caption="Formation of MgBr₂"
    width={879}
  />,
  <p key="b5-p-mgf2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Structure of MgF<Sub c="2" /> can be written in a similar manner.
  </p>,
  <p key="b5-p-cas-label" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    <strong>(3) Formation of calcium sulphide.</strong>
  </p>,
  <Fig key="b5-fig-cas"
    src={CONTENT_IMAGES.CONTENT_IMAGE_F75A0745360FDDBC885F}
    caption="Formation of CaS"
    width={801}
  />,
  <p key="b5-p-cao" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Structure of CaO can be written in a similar manner.
  </p>,
  <p key="b5-p-na2s-label" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    <strong>(4) Formation of sodium sulphide.</strong>
  </p>,
  <Fig key="b5-fig-na2s"
    src={CONTENT_IMAGES.CONTENT_IMAGE_83691198A75EDA43760B}
    caption="Formation of Na₂S"
    width={785}
  />,
  <p key="b5-p-lewis-dot" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The structures as represented above using electron dots are called <strong>Lewis dot structures.</strong>
  </p>,

  // 3.11.5
  <SubHd key="b5-sub-s311-5" id="s311-5" label="3.11.5" title="Formation of Covalent Molecules/Compounds" />,
  <DefBox key="b5-def-covalent">
    When a bond is formed between two atoms by mutual sharing of electrons between them so as to complete their octets or duplets in case of elements having only one shell, the bond formed is called <strong>covalent bond</strong> and the molecules formed are called <strong>covalent molecules</strong> or <strong>compounds</strong>. The number of electrons contributed by each is called its <strong>covalency</strong>.
  </DefBox>,
  <p key="b5-p-cov-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Examples to illustrate the formation of Covalent Molecules/Compounds.</strong> Let us examine the formation of chlorine molecule. In this case, two chlorine atoms combine to produce chlorine molecule. Each chlorine atom is short of one electron to attain stable configuration of argon. Each of them contributes one electron to form a common shared pair. By doing so, both of them complete their orbits and acquire argon structure. The completed octets are generally represented by enclosing the dots around the symbol by a circle or ellipse. Thus,
  </p>,
  <Fig key="b5-fig-cl2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_AC13AFF16E5FC425DF9C}
    caption="Formation of Cl₂ (chlorine molecule)"
    width={671}
  />,
  <p key="b5-p-cov-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Similarly, in the formation of HCl, H and Cl contribute one electron each which is then shared by both so as to complete duplet of hydrogen and octet of chlorine.
  </p>,
  <Fig key="b5-fig-hcl"
    src={CONTENT_IMAGES.CONTENT_IMAGE_B51B556CAD7C97349CE9}
    caption="Formation of HCl"
    width={605}
  />,
  <p key="b5-p-multi-bond" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>Multiple covalent bonds.</strong> In the examples cited above, each atom contributes one electron. Hence, the covalency of chlorine and hydrogen is 1. The bond formed is called <strong>single covalent bond</strong> and is represented by single line (–) between the two atoms. Covalent bond may also be formed by the contribution of two or three electrons by each of two atoms. The bond then formed is called <strong>double</strong> or <strong>triple bond</strong> and are represented by a double line (=) and a triple line (≡) respectively.
  </p>,
  <p key="b5-p-more-cov" style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, margin: "10px 0 4px 0" }}>
    Some More Examples of Formation of Covalent Bonds :
  </p>,
  <Fig key="b5-fig-cov-examples"
    src={CONTENT_IMAGES.CONTENT_IMAGE_41CE25D1314343FAD467}
    caption="Formation of H₂, O₂, N₂, H₂O, NH₃, CH₄ (covalent molecules)"
    width={700}
  />,
  <p key="b5-p-bond-pairs" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The electron pairs forming bonds with the central atom are called <strong>bond pairs</strong> or <strong>shared pairs</strong> of electrons whereas electron pairs present around the central atom which have not participated in bond formation are called <strong>lone pairs</strong> of electrons, <em>e.g.</em> in the examples discussed above, H<Sub c="2" />O has two bond pairs and 2 lone pairs whereas NH<Sub c="3" /> has three bond pairs and one lone pair of electrons.
  </p>,

  // ── 3.12 PROPERTIES OF IONIC COMPOUNDS ──────────────────────────
  <SecHd key="b5-sec-s312" id="s312" label="3.12" title="Properties (Characteristics) of Ionic Compounds" />,
  <p key="b5-p-ionic-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(1) Physical state.</strong> These compounds are mostly crystalline solids at room temperature.
  </p>,
  <p key="b5-p-ionic-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(2) Hardness.</strong> They are soft and flexible.
  </p>,
  <p key="b5-p-ionic-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(3) Crystal structure.</strong> These compounds exist as ions and not as molecules. These ions are arranged in a regular pattern in the three-dimensional space to form a lattice. For example, structure of NaCl is shown in Fig. 3.18 in which each Na<Sup c="+" /> ion is surrounded by 6 Cl<Sup c="−" /> ions and vice versa. The formula of an ionic compound merely indicates the ratio of the ions (<em>e.g.</em> Na<Sup c="+" /> : Cl<Sup c="−" /> = 1 : 1).
  </p>,
  <Fig key="b5-fig-nacl-crystal"
    src={CONTENT_IMAGES.CONTENT_IMAGE_87AC5A103FC579B5CC7B}
    caption="Fig. 3.18. Crystal structure of NaCl showing Na⁺ and Cl⁻ ions"
    width={489}
  />,
  <p key="b5-p-ionic-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(4) Solubility in water.</strong> They are soluble in water. In the solution, the compound dissociates into free ions.
  </p>,
  <p key="b5-p-ionic-5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(5) High melting and boiling points.</strong> In the solid state, as the oppositely charged ions are held together by strong electrostatic forces of attraction, hence they have high melting and boiling points.
  </p>,
  <p key="b5-p-ionic-6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(6) Electrical conductivity.</strong> In the molten state or in their solution in water (aqueous solution), they split into free ions. Hence, they are good conductors of electricity.
  </p>,
  <p key="b5-p-ionic-7" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(7) Fast ionic reactions.</strong> The reactions between ionic compounds in the solution are in fact the reactions between the oppositely charged ions. As they can combine quickly, their reactions are very fast, <em>e.g.,</em>
  </p>,
  <MathBlock key="b5-mb-ionic-rxn">
    Na<Sup c="+" />Cl<Sup c="−" /> (<em>aq</em>) + Ag<Sup c="+" />NO<Sub c="3" /><Sup c="−" />{"  "}<Arrow />{"  "}AgCl (<em>s</em>) + NaNO<Sub c="3" /> (<em>aq</em>)
  </MathBlock>,
  <div key="b5-rxn-labels" style={{ display: "flex", justifyContent: "space-around", fontSize: 12, color: "#555", margin: "-6px 0 10px" }}>
    <span>Sodium chloride{"   "}Silver nitrate</span>
    <span>Silver chloride{"   "}Sodium nitrate</span>
  </div>,

  // ── 3.13 PROPERTIES OF COVALENT COMPOUNDS ───────────────────────
  <SecHd key="b5-sec-s313" id="s313" label="3.13" title="Properties (Characteristics) of Covalent Compounds" />,
  <p key="b5-p-cov-p1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(1) Physical state.</strong> These compounds exist in all the three states of matter viz. solid, liquid and gaseous.
  </p>,
  <p key="b5-p-cov-p2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(2) Hardness.</strong> They are hard and brittle.
  </p>,
  <p key="b5-p-cov-p3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(3) Crystal structure.</strong> They consist of molecules and not ions.
  </p>,
  <p key="b5-p-cov-p4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(4) Solubility.</strong> They are generally soluble in organic solvents (like benzene) but insoluble in water.
  </p>,
  <p key="b5-p-cov-p5" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(5) Melting and boiling points.</strong> The molecules of the compound are held together less rigidly due to weak intermolecular forces (as there are no ions). Hence, they have low melting and boiling points.
  </p>,
  <p key="b5-p-cov-p6" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(6) Electrical conductivity.</strong> As there are no free ion to conduct electricity, they are bad conductors of electricity.
  </p>,
  <p key="b5-p-cov-p7" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    <strong>(7) Slow reactions.</strong> As covalent molecules contain covalent bonds which have to be broken during their reaction, hence their reactions are slow.
  </p>,

  // ── 3.14 CHARACTERISTICS DIFFERENTIATING IONIC AND COVALENT ─────
  <SecHd key="b5-sec-s314" id="s314" label="3.14" title="Characteristics Differentiating Ionic and Covalent Compounds" />,
  <TableIonicVsCovalent key="b5-tbl-ionic-cov" />,

  // FeatureBox: Relationship Between Atomic Bonding and Social Bonding
  <FeatureBox key="b5-feat-bonding" title="Relationship Between Atomic Bonding and Social Bonding">
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      Bonding is the process by which individual units (atoms or human beings) reduce their internal tension to form something more stable relationship than they were alone. A few comparisons of atomic bonding and social bonding are given below :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong style={{ color: "#c0126a" }}>(1) The Octet Rule : The Quest for Completeness.</strong> Just as an atom tries to fill its valence shell (octet) to reach a low energy stable state, individuals seek relationships that provide emotional security and a sense of belonging. Thus, like atoms, we try to attain stability in our lives by moving from high energy stress of isolation to a stable state (peaceful state).
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong style={{ color: "#c0126a" }}>(2) Covalent Bonding : The Power of Sharing :</strong> Just as a covalent bond between two atoms is formed by mutually sharing equal number of electrons, likewise in human relationship, for a deep friendship and healthy partnership, resources and time are shared equally between the two persons. The stability of social bond comes from mutual dependency. If one atom pulls away the shared electron more strongly, the shared structure collapses. Same happens with the social bonding.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong style={{ color: "#c0126a" }}>(3) Ionic Bonding. The Attraction of Opposites.</strong> In the formation of an ionic bond, one atom gives an electron and the other accepts the electron. As a result, two oppositely charged ions are created which are then held together by strong electrostatic forces of attraction. The elements combining are completely different in nature. Likewise, in social life, one person may have sufficient money to invest in a business and the other may have the talent. The investor transfers money to the other and the other accepts it. The two, though different in nature, become bonded strongly.
    </p>
  </FeatureBox>,

  // ── 3.15 GRAM ATOMIC MASS, GRAM MOLECULAR MASS AND GRAM FORMULA UNIT MASS ──
  <SecHd key="b5-sec-s315" id="s315" label="3.15" title="Gram Atomic Mass, Gram Molecular Mass and Gram Formula Unit Mass" />,

  // 3.15.1
  <SubHd key="b5-sub-s315-1" id="s315-1" label="3.15.1" title="Gram Atomic Mass" />,
  <p key="b5-p-gam-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Atomic mass of an element is expressed in amu or <em>u</em> or it is written without units because it is the relative mass of the atom of that element.
  </p>,
  <DefBox key="b5-def-gram-atomic">
    <em>Atomic mass expressed in grams is called gram atomic mass of that element.</em>
  </DefBox>,
  <p key="b5-p-gam-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example,{"  "}Atomic mass of hydrogen = 1·0 u
  </p>,
  <MathBlock key="b5-mb-gam">
    Gram atomic mass of hydrogen = 1·0 g<br />
    Atomic mass of oxygen = 16·0 u<br />
    Gram atomic mass of oxygen = 16·0 g
  </MathBlock>,
  <p key="b5-p-gam-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, to convert atomic mass into gram atomic mass, we have to simply replace '<em>u</em>' by '<em>g</em>'.
  </p>,
  <p key="b5-p-gam-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The amount of an element having mass equal to gram atomic mass is called one <strong>"gram atom"</strong> (or <em>g atom</em>) of the element. For example,
  </p>,
  <MathBlock key="b5-mb-gatom">
    1 g atom of hydrogen = 1·0 g<br />
    1 g atom of oxygen = 16·0 g<br />
    1 g atom of carbon = 12·0 g and so on.
  </MathBlock>,

  // 3.15.2
  <SubHd key="b5-sub-s315-2" id="s315-2" label="3.15.2" title="Gram Molecular Mass" />,
  <p key="b5-p-gmm-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Like atomic mass, molecular mass of a substance (element or compound) is also expressed in amu or u or it is written without units because it is the relative mass of one molecule of the substance.
  </p>,
  <DefBox key="b5-def-gram-mol">
    <em>Molecular mass expressed in grams is called gram molecular mass of that substance. It is also called "molar mass".</em>
  </DefBox>,
  <p key="b5-p-gmm-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example,
  </p>,
  <MathBlock key="b5-mb-gmm">
    Molecular mass of H<Sub c="2" /> = 2·0 u<br />
    Gram molecular mass of H<Sub c="2" /> = 2·0 g<br />
    Molecular mass of O<Sub c="2" /> = 32·0 u<br />
    Gram molecular mass of O<Sub c="2" /> = 32·0 g<br />
    Molecular mass of H<Sub c="2" />O = 2 × 1 + 1 × 16 = 18 u.<br />
    Gram molecular mass of H<Sub c="2" />O = 18 g<br />
    Molecular mass of CO<Sub c="2" /> = 1 × 12 + 2 × 16 = 44·0 u<br />
    Gram molecular mass of CO<Sub c="2" /> = 44·0 g
  </MathBlock>,
  <p key="b5-p-gmm-3" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Thus, to convert molecular mass into gram molecular mass, we have to simply replace '<em>u</em>' by '<em>g</em>'.
  </p>,
  <p key="b5-p-gmm-4" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    The amount of the substance having mass equal to its gram molecular mass is called one <strong>"gram molecule"</strong> (or <em>g molecule</em>) of the substance. Thus,
  </p>,
  <MathBlock key="b5-mb-gmolecule">
    1 g molecule of H<Sub c="2" /> = 2·0 g<br />
    1 g molecule of O<Sub c="2" /> = 32·0 g<br />
    1 g molecule of H<Sub c="2" />O = 18·0 g<br />
    1 g molecule of CO<Sub c="2" /> = 44·0 g
  </MathBlock>,

  // 3.15.3
  <SubHd key="b5-sub-s315-3" id="s315-3" label="3.15.3" title="Gram Formula Unit Mass" />,
  <DefBox key="b5-def-gram-fum">
    <em>Formula unit mass expressed in grams is called gram formula unit mass. This amount is called one gram formula unit.</em>
  </DefBox>,
  <p key="b5-p-gfum-1" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    For example,
  </p>,
  <MathBlock key="b5-mb-gfum">
    Formula unit mass of NaCl = 23 + 35·5 = 58·5 u<br />
    Gram formula unit mass of NaCl = 58·5 g
  </MathBlock>,
  <p key="b5-p-gfum-2" style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
    Remember that
  </p>,
  <p key="b5-p-gfum-3" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (<em>i</em>) one gram atom (atomic mass expressed in g) contains Avogadro's number of atoms (6·022 × 10<Sup c="23" /> atoms)
  </p>,
  <p key="b5-p-gfum-4" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (<em>ii</em>) one gram molecule (molecular mass expressed in g or also called 'molar mass') contains Avogadro's number of molecules (6·022 × 10<Sup c="23" /> molecules)
  </p>,
  <p key="b5-p-gfum-5" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (<em>iii</em>) one gram formula unit mass (formula mass expressed in g) contains Avogadro's number of formula units (6·022 × 10<Sup c="23" /> formula units)
  </p>,
  <p key="b5-p-gfum-6" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (<em>iv</em>) In case of gases, equal volumes of all gases under similar conditions of temperature and pressure contain equal number of molecules. This is called Avogadro's law. For example, 22·4 litres of any gas at 0°C and 1 atmospheric pressure contain 6·022 × 10<Sup c="23" /> molecules.
  </p>,
  <p key="b5-p-gfum-7" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (<em>v</em>) Avogadro's number (6·022 × 10<Sup c="23" />) is usually represented by the symbol '<em>N</em><Sub c="A" />'.
  </p>,
  <p key="b5-p-gfum-8" style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
    (<em>vi</em>) Amount of the substance containing Avogadro's number of particles is called one <strong>mole</strong> of the substance. The particles may be atoms in case of atomic substances or molecules in case of molecular substances or formula units in case of ionic compounds. For example,
  </p>,
  <MathBlock key="b5-mb-mole">
    1 mole of C-atoms contain Avogadro's number of atoms or it is equal to gram atomic mass<br />
    1 mole of CO<Sub c="2" /> molecules contain Avogadro's number of molecules or is equal to gram molecular mass<br />
    1 mole of NaCl contains Avogadro's number of formula units or is equal to gram formula unit mass
  </MathBlock>,

  // ── KNOWLEDGE BOOSTER ──────────────────────────────────────────
  <KBBox key="b5-kb-symbols">
    <KBHd>Significance of the Symbol of an Element</KBHd>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      The symbol of an element conveys the following information :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>i</em>) It tells about the name of the element.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>ii</em>) It represents one atom of the element.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>iii</em>) It represents one gram atom (<em>i.e.,</em> atomic mass expressed in grams) or <strong>6·022 × 10<Sup c="23" /></strong> atoms of the element.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      For example, symbol '<strong>C</strong>' represents
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>i</em>) Carbon element
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>ii</em>) One atom of carbon
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>iii</em>) 12 g of carbon (<em>i.e.,</em> atomic mass expressed in grams)
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>iv</em>) 6·022 × 10<Sup c="23" /> atoms of carbon present in one gram atom of carbon.
    </p>

    <KBHd>Significance of Molecular Formula of a Substance</KBHd>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      The molecular formula of a substance gives the following information :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>i</em>) It tells the name of the substance.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>ii</em>) It tells about the names of the different elements present in the substance.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>iii</em>) It represents one molecule of the substance.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>iv</em>) It tells about the number of atoms of each element present in one molecule of the substance.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>
      (<em>v</em>) It tells about atomicity of the substance.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      For example, the formula '<strong>CO<Sub c="2" /></strong>' represents
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>i</em>) Carbon dioxide.</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>ii</em>) The elements present are carbon and oxygen.</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>iii</em>) One molecule of carbon dioxide.</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>iv</em>) That one molecule of carbon dioxide contains one atom of carbon and two atoms of oxygen.</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>v</em>) That its atomicity is 3, <em>i.e.,</em> it is a triatomic molecule.</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>vi</em>) 44 g of CO<Sub c="2" /> (<em>i.e.,</em> molecular mass expressed in grams).</p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 24 }}>(<em>vii</em>) 6·022 × 10<Sup c="23" /> molecules of carbon dioxide present in one gram molecule of CO<Sub c="2" />.</p>

    <KBHd>Subsidiary units</KBHd>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      Though masses are generally expressed in g or kg, lengths in metres, volumes in litres, sometimes multiples or fractions of these units are also used by putting a prefix before the unit. The multiples are generally 10<Sup c="1" />, 10<Sup c="3" />, 10<Sup c="6" /> etc. and fractions are 10<Sup c="−1" />, 10<Sup c="−3" />, 10<Sup c="−6" /> etc. Some of the SI prefixes are given below :
    </p>
    <TableSIPrefixes key="b5-tbl-siprefixes" />
  </KBBox>,

  // ── FEATURE BOX: APPRECIATIONS ABOUT CINNABAR AND INDIAN SCIENTISTS ──
  <FeatureBox key="b5-feat-cinnabar" title="Some Important Appreciations About Cinnabar and Indian Scientists">
    <p style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, color: "#c0126a" }}>
      1. To appreciate the traditional use of the red pigment, "cinnabar" obtained from rocks and its use in ancient times for painting and colouring various objects.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      For thousands of years, humans have been attracted by the colour 'red'. It is the colour of blood, fire and passion. In the ancient world, before the invention of synthetic dyes, one of the most important source of this brilliant, lasting red pigment was the mineral <em>cinnabar</em> which is chemically mercury sulphide (HgS). This is obtained from rocks which are formed in the volcanic regions where mercury and sulphur vapours emanating during volcanic eruptions combine under high pressure and temperature to form mercury sulphide. These rocks are mostly found in Spain. When these rocks are crushed, they produce <strong>vermillion</strong> (a deep red coloured powder like <em>Sindoor</em>). This red pigment has been used in the past in the art work, rituals and many daily life items. A few of these are given below :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>(1) In Art work.</strong> The most important use has been in making wall paintings (murals), especially by Romans. The ruins of Herculaneum stand a testimony to it. This expensive pigment was a status symbol for the rich people. Wealthy people used it for painting of homes. Its price was said to be higher than silver. It was also used in the painting of ceramics. It has been a key ingredient in the manufacture of red lacquer for centuries. This lacquer, applied in dozens of thin layers, created a durable and beautiful finish to boxes, bowls and furniture.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>(2) In daily life items.</strong> Cinnabar has been a key ingredient in cosmetics. It is used to add a blush to cheeks and bold red colour to lips using lipsticks. It is used in making nail polish and many personal adornment materials.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>(3) In rituals.</strong> In ancient China, cinnabar was appreciated both for its colour and spiritual properties. It was sometimes called 'dragon's blood'. It was believed that it held a key to immortality and tried to create elixirs (magical medicines) of life using it. Ironically, this quest for eternal life led to mercury poisoning. Several Chinese emperors are believed to have died from consuming these toxic products by mistaking them as life extending medicines. In their culture, remains of noble women and kings were often completely covered in cinnabar powder to ensure their soul force accompanied them into the afterlife. But the Romans were aware of its dark side. They knew about the toxic nature of the mercury fumes.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      Note that cinnabar is the only ore of mercury from which mercury is obtained by roasting the ore in the presence of air. But it has to be carried out using all safety protocols like ventillation, use of mask etc.
    </p>

    <p style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.75, color: "#c0126a", marginTop: 12 }}>
      2. To appreciate the contributions of Indian scientists in promoting the peaceful use of Atomic Energy
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      Indian scientists have been pioneers in demonstrating how nuclear technology can be harnessed to solve critical problems of energy, healthcare and agriculture, transforming India into a global leader in the peaceful application of nuclear science. The contribution by a few scientists is given below :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>1. Homi J. Bhabha.</strong> Dr. Homi Jehangir Bhabha, known as the "Father of the Indian Nuclear Program" was one of the earliest global advocates for the peaceful use of atomic energy. In 1955, Bhabha presided over the first "United Nations Conference on the Peaceful uses of Atomic Energy" in Geneva. He argued that nuclear energy was the only way for developing nations to achieve rapid industrialization. He designed a unique three-stage nuclear power program to utilize India's vast thorium reserves aiming at long term energy independence without relying on imported uranium. Two important fields of progress are given below :
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      (<em>i</em>) <strong>In Agriculture.</strong> Indian scientists at the Bhabha Atomic Research Centre (BARC) have made significant contributions to Indian farming through mutation breeding. Two significant achievements are given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 36 }}>
      (<em>a</em>) <strong>High-Yielding Varieties.</strong> Indian scientists have developed over 71 crop varieties (including rice, wheat, pulses) using radiation-induced mutagenesis. These varieties are often more resistant to disease and have higher nutritional value.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 36 }}>
      (<em>b</em>) <strong>Food Preservation.</strong> By using gamma radiation to inhibit spouting in onions and potatoes and to delay the ripening of mangoes, scientists have significantly reduced post-harvest losses and boosted exports.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      (<em>ii</em>) <strong>In Nuclear Medicine.</strong> Scientists at the BARC have placed the country at the forefront of affordable cancer treatment and diagnostics. A brief detail of these is given below :
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 36 }}>
      (<em>a</em>) <strong>Cancer treatment (Bhabhation).</strong> BARC developed an indigenous telecobalt machine for cancer therapy, called 'Bhabhation'. It is much more cost effective than similar imported machines and has been donated to several developing countries.
    </p>
    <p style={{ fontSize: 14, lineHeight: 1.75, paddingLeft: 36 }}>
      (<em>b</em>) <strong>Diagnostics (Radio-isotopes).</strong> A wide range of radio-isotopes like iodine-131 and lutetium-177 are being produced by BARC. These are used in hospitals for diagnosis and treatment of various ailments including thyroid disorders and bone pain.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>2. Vikram Sarabhai.</strong> Though Dr. Vikram Sarabhai is more known for space program, yet his tenure as Chairman of Atomic Energy Commission emphasized the use of technology for social good. He helped to establish the Fast Breeder Reactor at Kalpakkam (Tamil Nadu). A Breeder reactor is a nuclear reactor which produces more fissionable fuel (like plutonium-239) than it consumes the fissionable material like uranium-238 or thorium-232 and the fast neutrons.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>3. Raja Ramanna.</strong> Dr. Raja Ramanna was the mastermind behind the commissioning of Apsara, the first nuclear reactor dedicated entirely to research and production of isotopes for peaceful applications.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify", fontSize: 14, lineHeight: 1.75 }}>
      <strong>4. A.P.J. Abdul Kalam.</strong> Dr. Kalam, though had greater role in defence, yet he advocated the use of nuclear power as a great source of energy to make India energy independent by 2030. Under his guidance nuclear powered desalination plants like the one at Kalpakkam were developed to provide fresh drinking water to coastal areas.
    </p>
  </FeatureBox>,
];


const tocItems = [
  { id: "s31",    label: "3.1. Ancient Thoughts About Atoms and Molecules",                    level: 1 },
  { id: "s32",    label: "3.2. Laws of Chemical Combination",                                  level: 1 },
  { id: "s321",   label: "3.2.1. Law of Conservation of Mass",                                 level: 2 },
  { id: "s322",   label: "3.2.2. Law of Definite Proportions or Law of Constant Composition",  level: 2 },
  { id: "s33",    label: "3.3. Dalton's Atomic Theory",                                        level: 1 },
  { id: "s331",   label: "3.3.1. Postulates of Dalton's Atomic Theory",                        level: 2 },
  { id: "s332",   label: "3.3.2. Explanation of Laws of Chemical Combination",                 level: 2 },
  { id: "s333",   label: "3.3.3. Limitations/Drawbacks of Dalton's Atomic Theory",             level: 2 },
  { id: "s34",    label: "3.4. What is an Atom?",                                               level: 1 },
  { id: "s341",   label: "3.4.1. How big are the atoms? Can we see them?",                     level: 2 },
  { id: "s342",   label: "3.4.2. Symbols used to represent atoms of different elements",       level: 2 },
  { id: "s343",   label: "3.4.3. How do atoms exist?",                                         level: 2 },
  { id: "s35",    label: "3.5. Atomic Mass",                                                    level: 1 },
  { id: "s36",    label: "3.6. What is a Molecule?",                                            level: 1 },
  { id: "s361",   label: "3.6.1. Molecules of elements",                                       level: 2 },
  { id: "s362",   label: "3.6.2. Molecules of Covalent Compounds",                             level: 2 },
  { id: "s363",   label: "3.6.3. Naming the molecules of elements",                            level: 2 },
  { id: "s364",   label: "3.6.4. Naming molecules of compounds",                               level: 2 },
  { id: "s365",   label: "3.6.5. Analogies to differentiate between atoms and molecules",      level: 2 },
  { id: "s366",   label: "3.6.6. Characteristics differentiating Atoms and Molecules",         level: 2 },
  { id: "s367",   label: "3.6.7. Characteristics differentiating Elements and Compounds",      level: 2 },
  { id: "s368",   label: "3.6.8. Molecular Mass",                                              level: 2 },
  { id: "s369",   label: "3.6.9. Calculation of Molecular Masses",                             level: 2 },
  { id: "s37",    label: "3.7. What are Ions and Ionic Compounds?",                             level: 1 },
  { id: "s38",    label: "3.8. Writing Chemical Formulae of Compounds",                        level: 1 },
  { id: "s381",   label: "3.8.1. Concept of Valency",                                          level: 2 },
  { id: "s382",   label: "3.8.2. Rules for writing the Chemical Formulae",                     level: 2 },
  { id: "s383",   label: "3.8.3. Chemical Formulae of Simple Molecular Compounds",             level: 2 },
  { id: "s384",   label: "3.8.4. Chemical Formulae of Some Simple Ionic Compounds",            level: 2 },
  { id: "s385",   label: "3.8.5. Chemical Formulae of Ionic Compounds containing Polyatomic Ions", level: 2 },
  { id: "s386",   label: "3.8.6. Some General Examples",                                       level: 2 },
  { id: "s387",   label: "3.8.7. Formula Unit Mass",                                           level: 2 },
  { id: "s39",    label: "3.9. Characteristics Differentiating Cations and Anions",            level: 1 },
  { id: "s310",   label: "3.10. Characteristics Differentiating Molecular Mass and Formula Unit Mass", level: 1 },
  { id: "s311",   label: "3.11. Formation of Ionic and Covalent Compounds",                    level: 1 },
  { id: "s311-1", label: "3.11.1. Why do atoms combine to form compounds?",                    level: 2 },
  { id: "s311-2", label: "3.11.2. How do atoms combine?",                                      level: 2 },
  { id: "s311-3", label: "3.11.3. Lewis Symbols/Electron Dot Symbols",                         level: 2 },
  { id: "s311-4", label: "3.11.4. Formation of Ionic Bond/Ionic Compounds",                    level: 2 },
  { id: "s311-5", label: "3.11.5. Formation of Covalent Molecules/Compounds",                  level: 2 },
  { id: "s312",   label: "3.12. Properties of Ionic Compounds",                                level: 1 },
  { id: "s313",   label: "3.13. Properties of Covalent Compounds",                             level: 1 },
  { id: "s314",   label: "3.14. Characteristics Differentiating Ionic and Covalent Compounds", level: 1 },
  { id: "s315",   label: "3.15. Gram Atomic Mass, Gram Molecular Mass and Gram Formula Unit Mass", level: 1 },
  { id: "s315-1", label: "3.15.1. Gram Atomic Mass",                                           level: 2 },
  { id: "s315-2", label: "3.15.2. Gram Molecular Mass",                                        level: 2 },
  { id: "s315-3", label: "3.15.3. Gram Formula Unit Mass",                                     level: 2 },
];


const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
  ...content_b5,
];

export default function Chapter3() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        color: "#222",
        background: "#fff",
        minHeight: "100vh",
        fontSize: 15,
        lineHeight: 1.58,
      }}
    >
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={tocItems} />
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)" }}>
        <ChapterCover />
        {allContent}
      </div>
    </div>
  );
}
