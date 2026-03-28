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
const Eq = () => <span style={{ margin: "0 6px" }}>⇌</span>;
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

const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 8px", textAlign: "justify", ...style }}>{children}</p>
);

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

const KBBox = ({ children, title }) => (
  <div style={{ border: "2px solid #c0126a", margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 13, letterSpacing: 2, padding: "5px 14px" }}>
      {title || "KNOWLEDGEBOOSTER"}
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
  <div style={{ borderTop: "1px solid #bbb", marginTop: 10, paddingTop: 6,
    fontSize: 12.5, color: "#444", lineHeight: 1.5 }}>
    {children}
  </div>
);

const Fig = ({ src, caption, width = "90%" }) => (
  <div style={{ textAlign: "center", margin: "16px auto", maxWidth: width }}>
    {src && <img src={src} alt={caption || ""} style={{ maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }} />}
    {caption && (
      <p style={{ fontSize: 13, fontStyle: "italic", color: "#333", marginTop: 6, textAlign: "center" }}>
        {caption}
      </p>
    )}
  </div>
);

const NumericalSection = ({ topic, children }) => (
  <div style={{ border: "1px solid #ddd", margin: "18px 0" }}>
    <div style={{ display: "flex", alignItems: "stretch" }}>
      <div style={{ background: P_COLOR, color: "#fff", writingMode: "vertical-lr",
        transform: "rotate(180deg)", padding: "12px 8px",
        fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 11, letterSpacing: 1.5, textAlign: "center",
        whiteSpace: "nowrap", minWidth: 36 }}>
        PROBLEMS BASED ON {topic}
      </div>
      <div style={{ padding: "12px 16px", flex: 1 }}>{children}</div>
    </div>
  </div>
);

const th = (content) => (
  <th style={{ border: "1px solid #aaa", padding: "6px 10px", background: LIGHT_P,
    fontWeight: 700, fontSize: 13, textAlign: "center" }}>{content}</th>
);
const td = (content, align = "left") => (
  <td style={{ border: "1px solid #aaa", padding: "5px 10px", fontSize: 13,
    textAlign: align, verticalAlign: "top" }}>{content}</td>
);

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen(o => !o)} style={{
      position: "fixed", top: 14, left: 14, zIndex: 1100,
      background: P_COLOR, border: "none", borderRadius: 4, cursor: "pointer",
      width: 36, height: 36, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 5, padding: 0
    }}>
      {[0,1,2].map(i => (
        <span key={i} style={{ display: "block", width: 20, height: 2.5,
          background: "#fff", borderRadius: 2,
          transition: "all 0.25s",
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
            onMouseEnter={e => e.currentTarget.style.background = LIGHT_P}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
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
  <div style={{ background: "linear-gradient(135deg, #f9eef4 0%, #fce4f0 50%, #f0c8dc 100%)",
    borderBottom: `4px solid ${P_COLOR}`, marginBottom: 28, padding: "36px 0 28px", textAlign: "center" }}>
    <div style={{ display: "inline-block", background: P_COLOR, color: "#fff",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 52, width: 80, height: 80,
      lineHeight: "80px", borderRadius: 4, marginBottom: 18 }}>
      2
    </div>
    <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 32,
      fontWeight: 900, color: "#1a1a1a", letterSpacing: 3,
      textTransform: "uppercase", margin: 0 }}>
      Structure of Atom
    </h1>
  </div>
);

// ── CONTENT BATCH 1 ──────────────────────────────────────────
const content_b1 = [
  <SecHd key="sec-s21" id="s21" label="2.1" title="Introduction : Atoms as the Basic Units of Elements" />,
  <p key="b1-p1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Dalton in 1808 suggested that atom is the smallest indivisible particle of matter. He further elaborated this idea by putting forward a theory known after him as Dalton's atomic theory. This theory was able to explain the laws of chemical combination which were put forward on the basis of experimental studies. The concept of relative atomic masses was also developed. It was further found that whereas atom is the smallest particle of an element, in many other forms of matter (called compounds), molecule is the smallest particle. All these details are discussed in the next chapter. However, Dalton's concept of atom could not explain the following facts :
  </p>,
  <ol key="b1-ol1" style={{ paddingLeft: 32, margin: "6px 0 12px", fontSize: 14, lineHeight: 1.8 }}>
    <li style={{ marginBottom: 4 }}><strong>1.</strong> Why do atoms of different elements differ from each other in masses and properties ?</li>
    <li><strong>2.</strong> Why do atoms combine to form molecules ?</li>
  </ol>,

  <FeatureBox key="feat-kanad" title="Contributions of Ancient Indian Philosopher – Acharya Kanad's idea of indivisible particles (Parmanu)">
    <p style={{ marginBottom: 7, textAlign: "justify" }}>
      Acharya Kanad (6th–2nd century B.C.) was a visionary sage. He was the founder of the school of Indian philosophy (named <strong>Vaisheshika</strong>). It was much before the western scientists put forward atomic theories, he had proposed the concept of atom (called in Hindi as <strong>Paramanu,</strong> where <em>Param</em> means <em>smallest</em> and <em>anu</em> means <em>particle</em>). The main features of the theory of <em>matter</em> (called <em>padarth</em> in Hindi) were as follows :
    </p>
    <p style={{ marginBottom: 6, textAlign: "justify" }}>
      <strong>1. Indivisibility.</strong> Kanad postulated that if you keep on dividing matter, ultimately you will reach a stage when further division is impossible. The ultimate indivisible particle thus obtained is called Paramanu.
    </p>
    <p style={{ marginBottom: 6, textAlign: "justify" }}>
      <strong>2. Indestructibility.</strong> He postulated that whereas all objects that we see around us are temporary and can be destroyed, atoms are eternal and can be neither created not destroyed (which ultimately was the basis of Law of conservation of mass, put forward later).
    </p>
    <p style={{ marginBottom: 6, textAlign: "justify" }}>
      <strong>3. Combination of atoms.</strong> He suggested that atoms can combine to form stable species. If two atoms combine, the species obtained is called <em>diad</em> and if three atoms combine, the species is called <em>triad</em> and so on. These species were later called as <em>molecules</em>.
    </p>
    <p style={{ marginBottom: 6, textAlign: "justify" }}>
      <strong>4. Classification.</strong> Based on the four classical elements of nature viz. <strong>Earth</strong>, <strong>Water</strong>, <strong>Fire</strong> and <strong>Air,</strong> he classified all atoms into four types. Each type possessed specific qualities (called <em>Gunas</em> in Hindi) like colour, taste, touch etc. This was the basis for different properties of the bigger species formed from atoms.
    </p>
    <p style={{ textAlign: "justify" }}>
      It is interesting to mention that Kanad conceived the idea of indivisibility while he was nibbling the food. He realized that he could not divide a grain of rice indefinitely.
    </p>
    <p style={{ marginTop: 6, textAlign: "justify" }}>
      It was based on the basic ideas of Kanad that Dalton (in 1808) was able to put forward his theory called Dalton's atomic theory in a more refined way.
    </p>
    <p style={{ marginBottom: 6, textAlign: "justify" }}>
      Kanad's work is also considered to be the foundation of Indian sciences like <strong>Ayruveda</strong> (a branch of medicine) and <strong>Rasayana</strong> (chemistry, a branch of science).
    </p>
    <p style={{ textAlign: "justify" }}>
      His work laid a foundation of the fact that great scientific truths can be achieved through the power of pure logic and observation.
    </p>
  </FeatureBox>,

  <SecHd key="sec-s22" id="s22" label="2.2" title="Existence of Subatomic Particles in Atom" />,
  <p key="b1-p2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    To look for an answer to the above questions (given at the end of sec. 2.1), further studies were carried out to know whether the atom is really indivisible. Let us try to study the following simple experiments :
  </p>,
  <p key="b1-p3" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) If we comb dry hair and then bring the comb near small pieces of paper, the comb is found to attract the pieces of paper.
  </p>,
  <p key="b1-p4" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) If we rub a glass rod with a silk cloth and then bring the glass rod near an inflated balloon, it is attracted towards the glass rod.
  </p>,
  <p key="b1-p5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As electrically charged objects can attract the uncharged objects (by inducing opposite charge in them), this shows that in the first case, comb acquires electric charge and in the second case, glass rod acquires electric charge. The question arises – where does this electric charge come from ? Now, as comb, glass rod etc. constitute matter and matter is made up of atoms, there must be some charged particles present in the matter and hence in the atoms. In other words, atom is divisible.
  </p>,
  <p key="b1-p6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Further, experiments were performed during the years 1895–1905 which showed that atom is not the smallest particle but is made up of still smaller particles called <strong>sub-atomic particles.</strong> The three main sub-atomic particles were <em>electrons, protons</em> and <em>neutrons.</em> In other words, an atom has an internal structure of its own.
  </p>,

  <ActivityBox key="act-2-1" num="2.1" sub="(To show the existence of charged particles in matter)">
    <ActHd>Experiments.</ActHd>
    <p key="b1-act1-exp" style={{ marginBottom: 6 }}><strong>A.</strong> Comb dry hair. Does the comb then attract the small pieces of paper ?</p>
    <p key="b1-act1-expb" style={{ marginBottom: 8 }}><strong>B.</strong> Rub the glass rod with a silk cloth and bring the rod near an inflated balloon. Observe what happens.</p>
    <ActHd>Observations.</ActHd>
    <p key="b1-act1-obsa" style={{ marginBottom: 6 }}><strong>A.</strong> The small pieces of paper will be attracted towards the comb.</p>
    <p key="b1-act1-obsb" style={{ marginBottom: 8 }}><strong>B.</strong> The inflated balloon will be attracted towards the rod.</p>
    <ActHd>Conclusion.</ActHd>
    <p key="b1-act1-conc" style={{ textAlign: "justify" }}>From the above observations, we conclude that on rubbing two objects together, they become electrically charged. Now, the question arises where does the charge come from when two objects are rubbed together ? Obviously, the charge produced shows that atom is divisible and consists of charged particles.</p>
  </ActivityBox>,

  <p key="b1-p7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The aim of this chapter will be to discuss how these sub-atomic particles (<em>i.e.,</em> electrons, protons and neutrons) were discovered and how they are arranged within the atom, <em>i.e.,</em> to study the "model of atom."
  </p>,

  <SecHd key="sec-s23" id="s23" label="2.3" title="Discovery of Electron — Study of Cathode Rays : Discharge Tube Experiments" />,
  <p key="b1-p8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The existence of electron in an atom was shown by <strong>J.J. Thomson</strong> in 1897 on the basis of a detailed study of cathode rays. The discovery of cathode rays was made on the basis of discharge tube experiments using air or some other gas inside the discharge tube. Let us now briefly explain these studies which eventually led to the discovery of electron.
  </p>,

  <SubHd key="sub-s231" id="s231" label="2.3.1" title="What is Discharge Tube ?" />,
  <p key="b1-p9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    A discharge tube is a long glass tube G closed at both ends as shown in Fig. 2.1. Two circular metal plates A and B are sealed at the two ends of the tube. These plates are called electrodes. A side tube S is also fused to the tube which can be connected to a vacuum pump to suck out the air or gas present inside the tube to reduce the pressure inside the tube. The two plates A and B can be connected to a source of electrical power such as an induction coil which can supply very high voltage. The plate A which is connected to the negative terminal of the source is called <strong>cathode</strong> whereas the plate B which is connected to the positive terminal of the source is called <strong>anode.</strong>
  </p>,
  <Fig key="fig-2-1" src={CONTENT_IMAGES.CONTENT_IMAGE_091B40EA9C3AB3D98FF0} caption="Fig. 2.1. Production of cathode rays in a discharge tube" />,

  <SubHd key="sub-s232" id="s232" label="2.3.2" title="Production of Cathode Rays" />,
  <p key="b1-p10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    On applying high voltage (about 10,000 volts) between the electrodes, the results observed at different pressures of the air or gas inside the tube are as follows:
  </p>,
  <p key="b1-p11" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>i</em>) <strong>No flow of current at ordinary pressure.</strong> When the air inside the discharge tube is taken at normal atmospheric pressure and a voltage of about 10,000 volts is applied between the electrodes, no current flows through the air between the electrodes. This is because air or any gas at normal pressure is a poor conductor of electricity.
  </p>,
  <p key="b1-p12" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>ii</em>) <strong>Glow in the entire tube at 1 mm pressure.</strong> If the air inside the tube is sucked out by connecting the side tube 'S' to the vacuum pump so that the pressure falls to about 1 mm of mercury and now a voltage of about 10,000 volts is applied, the current begins to flow between the electrodes through the air inside and hence the entire discharge tube begins to glow uniformly with magenta-red colour. (The colour emitted depends upon the nature of the gas taken in the tube. If neon gas is taken, the light emitted is reddish orange).
  </p>,
  <FootNote key="fn-b1-1">*The study with different gases was made by Crookes. That is why these discharge tubes are also called Crookes tubes. As they give different colours with different gases, they are used for advertisement.</FootNote>,
  <p key="b1-p13" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>iii</em>) <strong>Glow intercepted by dark bands at lower pressures.</strong> If the air inside the tube is sucked out further so that pressure inside the tube further falls and high voltage is applied as before, the glow is intercepted by dark bands at right angle to the axis of the tube.
  </p>,
  <p key="b1-p14" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>iv</em>) <strong>Production of cathode rays at 0·001 mm pressure.</strong> When the pressure of the air or the gas inside the tube falls to about 0·001 mm, the discharge inside the tube completely disappears, <em>i.e.,</em> there is no light emitted by the air. The tube appears completely dark. However, the glass wall of the tube exactly opposite to the cathode glows with a greenish-yellow light, called fluorescence.* This observation clearly shows that some invisible rays are coming from the cathode which travel in straight line and strike the glass wall opposite to the cathode. Since these rays were coming from the cathode, these are called <strong>cathode rays.</strong>
  </p>,
  <FootNote key="fn-b1-2">*Television picture tube is a cathode ray tube in which picture is produced on the television screen coated with suitable material. Similarly, fluorescent light tubes are also cathode ray tubes coated inside with suitable material (called phosphor) which produce visible light when hit by cathode rays.</FootNote>,

  <SubHd key="sub-s233" id="s233" label="2.3.3" title="Properties of Cathode Rays" />,
  <p key="b1-p15" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Some important properties of cathode rays and the experiments by which they have been observed are given below :
  </p>,
  <p key="b1-p16" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>1. Cathode rays travel in straight lines.</strong> This is shown by the fact that if an object such as a metal cross is placed in the path of the cathode rays, they cast a sharp shadow of the object at the back.
  </p>,
  <Fig key="fig-2-2" src={CONTENT_IMAGES.CONTENT_IMAGE_816217AF0C744F5915F3} caption="Fig. 2.2. Production of shadow of the object placed in the path of cathode rays" />,
  <p key="b1-p17" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>2. Cathode rays are made up of material particles.</strong> This is shown by the fact that if a light paddle wheel (<em>e.g.,</em> that of mica) is placed in the path of the cathode rays such that cathode rays strike the blades of upper half, it begins to rotate.
  </p>,
  <Fig key="fig-2-3" src={CONTENT_IMAGES.CONTENT_IMAGE_85398A736D6DE0DECAEE} caption="Fig. 2.3. Rotation of light paddle wheel by cathode rays" />,
  <p key="b1-p18" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>3. Cathode rays carry negative charge.</strong> This is shown by the fact that when an electric field is applied on the cathode rays, they are deflected towards the positive plate of the electric field.
  </p>,
  <p key="b1-p19" style={{ textAlign: "justify", marginBottom: 7 }}>
    Similarly, when a magnetic field is applied on the cathode rays, they are deflected in a direction which shows that they carry negative charge.
  </p>,
  <Fig key="fig-2-4" src={CONTENT_IMAGES.CONTENT_IMAGE_7960427CE2EDDFDE99A2} caption="Fig. 2.4. Deflection of cathode rays towards positive plate of the electric field" />,
  <p key="b1-p20" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>4. They produce green fluorescence</strong> on the glass walls of the discharge tube as well as on certain substances such as zinc sulphide.
  </p>,
  <p key="b1-p21" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>5. Cathode rays produce heating effect.</strong> Thus, when cathode rays strike a metal foil, it becomes hot.
  </p>,
  <p key="b1-p22" style={{ textAlign: "justify", marginBottom: 10 }}>
    <strong>6. They produce X-rays</strong> when they strike against the surface of hard metals like tungsten, molybdenum etc.
  </p>,

  <SubHd key="sub-s234" id="s234" label="2.3.4" title="What are Electrons ?" />,
  <p key="b1-p23" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    From the study of the various properties, as explained above, the two most important results observed are as follows :
  </p>,
  <p key="b1-p24" style={{ marginBottom: 4 }}>(<em>i</em>) Cathode rays are made up of material particles.</p>,
  <p key="b1-p25" style={{ marginBottom: 8 }}>(<em>ii</em>) Cathode rays carry negative charge.</p>,
  <DefBox key="def-electron">
    <em>The negatively charged material particles constituting the cathode rays are called <strong>electrons.</strong></em>
  </DefBox>,

  <SubHd key="sub-s235" id="s235" label="2.3.5" title="Charge and Mass of the Electron" />,
  <p key="b1-p26" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    To determine the exact charge and mass of the electrons, the following experiments were carried out :
  </p>,
  <p key="b1-p27" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>i</em>) <strong>For determination of the ratio charge/mass (i.e., e/m) of the electrons.</strong> Using a special type of discharge tube (similar to the one shown in Fig. 2.4), <strong>J. J. Thomson</strong> in 1897, studied the extent of deflection of cathode rays under the influence of electric fields and magnetic fields of different strengths. From these results, he determined the ratio of charge/mass of the particles constituting the cathode rays (<em>i.e.,</em> of the electrons). This is usually represented by <em>e/m</em>, where '<em>e</em>' represents the charge on the electron and '<em>m</em>' represents the mass of the electron. The value of <em>e/m</em> is found to be :
  </p>,
  <MathBlock key="b1-em"><em>e/m</em> = 1·76 <Times /> 10<Sup c="11" /> coulombs per kg (<em>i.e.,</em> C kg<Sup c="–1" />).</MathBlock>,
  <p key="b1-p28" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>ii</em>) <strong>For determination of charge on the electron.</strong> The charge on the electron was found by <strong>R.A. Milliken</strong> (1917) with the help of his oil drop experiments. In these experiments, oil droplets were charged by capture of electrons. The charge on the droplets was found by noting the speed at which they moved between the two plates of an electric field of a particular strength. It was found that charge on the droplets was always multiple of an elementary charge of 1·60 <Times /> 10<Sup c="–19" /> coulombs. Hence, it was concluded that the charge on the electron, <em>i.e.,</em> <em>e</em> = 1·60 <Times /> 10<Sup c="–19" /> C
  </p>,
  <p key="b1-p29" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This is the smallest quantity of charge that could be measured. Hence, it is called as <strong>one unit</strong> charge. As electron is a negatively charged particle, we can say that electron carries <strong>one unit negative charge.</strong>
  </p>,
  <p key="b1-p30" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    Using the values of <em>e/m</em> and <em>e</em>, the mass of the electron will be
  </p>,
  <MathBlock key="b1-mass">
    <em>m</em> = <Frac n={<><em>e</em></>} d={<><em>e/m</em></>} /> = <Frac n={<>1·60 <Times /> 10<Sup c="–19" /> C</>} d={<>1·76 <Times /> 10<Sup c="11" /> C kg<Sup c="–1" /></>} /> = 9·1 <Times /> 10<Sup c="–31" /> kg
  </MathBlock>,
  <p key="b1-p31" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This mass is nearly 1/1840th of the mass of an atom of hydrogen.
  </p>,
  <p key="b1-p32" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We can, therefore, now define electron as follows :
  </p>,
  <DefBox key="def-electron2">
    An <strong>electron</strong> is that sub-atomic or fundamental particle which carries one unit negative charge and has a mass nearly 1/1840th of that of an atom of hydrogen.
  </DefBox>,
  <p key="b1-p33" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As charge on the electron is –1 unit and mass is negligible, it is represented by the symbol <Sup c="0" /><sub style={{ fontSize: "0.72em" }}>–1</sub><em>e</em>.
  </p>,

  <SubHd key="sub-s236" id="s236" label="2.3.6" title="Origin of Cathode Rays (How are Cathode Rays formed ?)" />,
  <p key="b1-p34" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The cathode rays are first produced from the material of the cathode. These then hit the gas atoms present in the discharge tube and knock out electrons (from the gas atoms). These electrons travel towards the oppositely charged anode in the form of cathode rays.
  </p>,

  <SubHd key="sub-s237" id="s237" label="2.3.7" title="To Conclude that Electrons are Constituents of All Atoms" />,
  <p key="b1-p35" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In the discharge tube experiments, it is found that we may take electrodes of any material and we may take any gas inside the discharge tube at low pressure, the particles constituting the cathode rays (<em>i.e.,</em> electrons) have the same charge/mass ratio as well as charge, <em>i.e.,</em> they carry the same charge and same mass. As these particles are first produced from the material of the cathode and then from the gas taken in the discharge tube, this shows that all materials used as cathode as well as all gases contain electrons. Hence, we conclude that electrons are constituents of all atoms.
  </p>,
  <p key="b1-p36" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    This is further supported by the following experiments in which the electrons emitted are found to have the same charge and mass :
  </p>,
  <p key="b1-p37" style={{ marginBottom: 4 }}>(<em>i</em>) By strongly heating certain metals.</p>,
  <p key="b1-p38" style={{ marginBottom: 4 }}>(<em>ii</em>) By exposing active metals like sodium, potassium etc. to ultraviolet rays.</p>,
  <p key="b1-p39" style={{ marginBottom: 4 }}>(<em>iii</em>) By exposing any form of matter to X-rays.</p>,
  <p key="b1-p40" style={{ marginBottom: 12 }}>(<em>iv</em>) From radioactive substances in the form of β-rays.</p>,

  <SecHd key="sec-s24" id="s24" label="2.4" title="Discovery of Proton — Study of Anode Rays or Canal Rays" />,
  <SubHd key="sub-s241" id="s241" label="2.4.1" title="Production of Anode Rays" />,
  <p key="b1-p41" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since the atom as a whole is electrically neutral and the presence of negatively charged electrons in it has been confirmed beyond doubt, therefore, it was thought that some positively charged particles must also be present in the atom. The existence of positively charged particles in an atom was shown by <strong>Goldstein</strong> in 1886 by study of anode rays (canal rays). He took a discharge tube with a perforated cathode as shown in Fig. 2.5 and a gas at low pressure was taken inside the discharge tube.
  </p>,
  <p key="b1-p42" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    On applying high voltage (about 10,000 volts) between the anode and the cathode, it is observed that just as fluorescence was observed on the glass wall of the tube at E due to cathode rays coming from the cathode, and hitting the wall at E, a fluorescence is also observed on the glass wall of the tube at F. This shows that some rays are coming from the side of the anode which passed through the holes in the cathode and then strike the glass wall of the tube at F. Since these rays are coming from the side of the anode, therefore, they are called <strong>"anode rays".</strong> They are also named as <strong>"canal rays"</strong> because they passed through the holes or canals in the cathode. Further, their deflection in an electric field shows that they carry positive charge. Hence, they are also called <strong>"positive rays".</strong>
  </p>,
  <Fig key="fig-2-5" src={CONTENT_IMAGES.CONTENT_IMAGE_810E00B8974BFD66216F} caption="Fig. 2.5. Production of anode rays or positive rays or canal rays" />,

  <SubHd key="sub-s242" id="s242" label="2.4.2" title="Origin of Anode Rays" />,
  <p key="b1-p43" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Anode rays do not originate from the anode. They are produced in the space between the anode and the cathode. It is believed that the high electrical energy supplied between the electrodes splits the molecules of the gas present in the tube into atoms. The electrons present in these atoms further absorb electrical energy and are knocked out. The electrons thus knocked out travel towards anode and form a part of cathode rays. The remaining part of the atom becomes a positively charged particle. These positively charged particles travel in the form of a stream towards the cathode (because it is a negatively charged electrode) and constitute anode rays.
  </p>,

  <SubHd key="sub-s243" id="s243" label="2.4.3" title="Properties of Anode Rays" />,
  <p key="b1-p44" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The properties of anode rays have been studied by experiments similar to those of cathode rays. The main properties of anode rays are given below :
  </p>,
  <p key="b1-p45" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>1. They travel in straight lines.</strong> This is shown by the fact that if an object is placed in their path, a shadow is produced at the back. (However, their speed is much less than that of cathode rays).
  </p>,
  <p key="b1-p46" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>2. They are made up of material particles.</strong> This is shown by the fact that if a light paddle wheel mounted on an axle is placed in their path, it begins to rotate.
  </p>,
  <p key="b1-p47" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>3. They carry positive charge.</strong> For studying deflection in an electric field, a cathode with a single, small circular hole was used so that a fine beam of anode rays is obtained which travelled straight and produced a fluorescent spot at the point F (Fig. 2.6). To observe a measurable deflection, a strong electric field (of about 2000 volts) was applied between the plates P<sub style={{ fontSize: "0.72em" }}>1</sub> and P<sub style={{ fontSize: "0.72em" }}>2</sub>.
  </p>,
  <p key="b1-p48" style={{ textIndent: 28, textAlign: "justify", marginBottom: 7 }}>
    It is observed that the anode rays are deflected towards the negative plate of the electric field and produce fluorescence at F'. This shows that they carry positive charge.
  </p>,
  <Fig key="fig-2-6" src={CONTENT_IMAGES.CONTENT_IMAGE_533DD37FE4BA851A6A92} caption="Fig. 2.6. Deflection of anode rays towards negative plate of the electric field" />,
  <p key="b1-p49" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>4. Determination of charge/mass ratio of the positively charged particles present in anode rays.</strong> By applying method similar to that of J. J. Thomson, <em>i.e.,</em> by studying the extent of deflection of the anode rays by applying electric field and magnetic field of definite strengths, the charge/mass ratio (<em>i.e., e/m</em>) of the positively charged particles constituting the anode rays was determined. It was found that the ratio <em>e/m</em> is not constant but depends upon the nature of the gas taken in the discharge tube.
  </p>,
  <p key="b1-p50" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>5. Mass of the positively charged particles</strong> constituting the anode rays also depends upon the nature of the gas. The mass is found to be nearly equal to the mass of the atom of the gas.
  </p>,
  <p key="b1-p51" style={{ textAlign: "justify", marginBottom: 12 }}>
    <strong>6. Charge on the positively charged particles</strong> constituting the anode rays is also found to depend upon the nature of the gas and the voltage applied. However, the charge is found to be a whole number multiple of the charge present on the electron. It may be + 1, + 2 or + 3 units depending upon the number of electrons knocked out of the gaseous atom.
  </p>,

  <SubHd key="sub-s244" id="s244" label="2.4.4" title="What is a Proton ?" />,
  <p key="b1-p52" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When hydrogen gas is taken inside the discharge tube, it is found that the particles present in the anode rays have minimum mass, <em>i.e.,</em> lightest positively charged particles are produced. The charge on these particles is found to be same as that on the electron, <em>i.e.,</em>
  </p>,
  <MathBlock key="b1-echarge"><em>e</em> = + 1·60 <Times /> 10<Sup c="–19" /> C (<em>i.e.,</em> one unit)</MathBlock>,
  <p key="b1-p53" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    The ratio of charge/mass (<em>i.e., e/m</em>) for each of these particles is found to be
  </p>,
  <MathBlock key="b1-em2"><em>e/m</em> = 9·58 <Times /> 10<Sup c="8" /> C kg<Sup c="–1" /></MathBlock>,
  <p key="b1-p54" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    As '<em>m</em>' is minimum for these particles, <em>e/m</em> is maximum. The value of the mass '<em>m</em>' will be
  </p>,
  <MathBlock key="b1-pmass">
    <em>m</em> = <Frac n={<><em>e</em></>} d={<><em>e/m</em></>} /> = <Frac n={<>1·60 <Times /> 10<Sup c="–19" /> C</>} d={<>9·58 <Times /> 10<Sup c="8" /> C kg<Sup c="–1" /></>} /> = 1·67 <Times /> 10<Sup c="–27" /> kg
  </MathBlock>,
  <p key="b1-p55" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This mass is nearly same as that of hydrogen atom, <em>i.e.,</em> it is equal to 1 amu or 1 u.
  </p>,
  <p key="b1-p56" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When hydrogen gas is taken in the discharge tube, the particles constituting the anode rays are called 'protons'. Hence, a proton may be defined as follows :
  </p>,
  <DefBox key="def-proton">
    A <strong>proton</strong> is defined as that sub-atomic or fundamental particle which carries one unit positive charge and has mass nearly equal to that of hydrogen atom.
  </DefBox>,
  <p key="b1-p57" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As charge on proton = +1 and mass = 1u, it is represented by the symbol <Sup c="1" /><sub style={{ fontSize: "0.72em" }}>1</sub><em>p</em> or <em>p</em><Sup c="+" />.
  </p>,
  <p key="b1-p58" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In fact, a proton is nothing but an ionized hydrogen atom, <em>i.e.,</em> it is obtained by the removal or loss of the only electron present in hydrogen atom.
  </p>,
  <p key="b1-p59" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The studies leading to the discovery of proton were carried out by Rutherford (1917–1920).
  </p>,
  <p key="b1-p60" style={{ textIndent: 28, textAlign: "justify", marginBottom: 12 }}>
    <strong>Note that</strong> Goldstein (1886) discovered the presence of positively charged particles in the atoms but proton was discovered by Rutherford (1917–1920).
  </p>,

  <SubHd key="sub-s245" id="s245" label="2.4.5" title="To Conclude that Protons are Constituents of All Atoms" />,
  <p key="b1-p61" style={{ textIndent: 28, textAlign: "justify", marginBottom: 12 }}>
    It is found that in case of any other gas (other than hydrogen) taken in the discharge tube, the mass of the positively charged particles is found to be nearly a whole number multiple of the mass of proton. This implies that all atoms contain whole number of protons. Hence, we conclude that protons must be fundamental particles present in all atoms.
  </p>,
];

// ── CONTENT BATCH 2 ──────────────────────────────────────────
const content_b2 = [
  // ── 2.5 Thomson's Model ──
  <SecHd key="sec-s25" id="s25" label="2.5" title="Thomson's Model of Atom" />,
  <p key="b2-p1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Now, it had been well established that atom contains negatively charged particles (<em>i.e.,</em> electrons) and to maintain electrical neutrality of the atom, positive charges were also present within the atom. The question arises how these negative and positive charges are distributed within the atom. J. J. Thomson, in 1904, proposed that an atom was a sphere of positive electricity in which were embedded number of electrons sufficient to neutralize the positive charge (Fig. 2.7). This may be compared with a water melon in which seeds were embedded or with a pudding containing currants (dry fruits). This model of atom is called Thomson's model.
  </p>,
  <p key="b2-p2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    However, it could not explain the results of the scattering experiments carried out by Rutherford in 1911 and hence was rejected.
  </p>,
  <Fig key="fig-2-7" src={CONTENT_IMAGES.CONTENT_IMAGE_D307B71E88C13C0CD0CB} caption="Fig. 2.7. Thomson's model of atom" />,

  // ── 2.6 Rutherford's Model ──
  <SecHd key="sec-s26" id="s26" label="2.6" title="Rutherford's Model of Atom" />,
  <SubHd key="sub-s261" id="s261" label="2.6.1" title="Discovery of Nucleus — Rutherford's Scattering Experiments" />,
  <p key="b2-p3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Rutherford, in 1911, performed some experiments in which he bombarded a thin foil of a heavy metal like gold with a beam of fast moving alpha (α)-particles which are doubly charged helium ions (He<Sup c="2+" />) each having 2 units of positive charge and 4 units of mass (4 u). These were obtained from radium placed in the cavity of a block of lead and made into a fine beam with a slit. He observed the scattering of the α-rays after hitting the foil by placing a circular zinc sulphide screen around the metal foil (Fig. 2.8). Wherever α-particle strikes the screen, a flash of light is produced at that point on the screen.
  </p>,
  <p key="b2-p4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    From these experiments, Rutherford made the following observations :
  </p>,
  <p key="b2-p5" style={{ marginBottom: 4 }}>
    (<em>i</em>) Most of the α-particles (99·9%) passed through the foil without undergoing any deflection.
  </p>,
  <p key="b2-p6" style={{ marginBottom: 4 }}>
    (<em>ii</em>) Some α-particles were deflected through small angles and a few were deflected through large angles.
  </p>,
  <p key="b2-p7" style={{ marginBottom: 10 }}>
    (<em>iii</em>) Very few (only one in 12,000) were deflected back, <em>i.e.,</em> through an angle greater than 90º.
  </p>,
  <Fig key="fig-2-8" src={CONTENT_IMAGES.CONTENT_IMAGE_3D736539604478314F5B} caption="Fig. 2.8. Rutherford's scattering experiments" />,
  <p key="b2-p8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    From these observations, Rutherford drew the following conclusions :
  </p>,
  <p key="b2-p9" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) Since most of the α-particles passed through the foil without undergoing any deflection, there must be sufficient empty space within the atom.
  </p>,
  <p key="b2-p10" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>ii</em>) Since some α-particles were deflected through small angle or a few through large angle and α-particles are positively charged particles, these could be deflected only by some positively charged body present within the atom. The α-particles deflected through small angles were those which passed close to this positive body. The α-particles deflected through large angles were those which passed very close to the positive body.
  </p>,
  <p key="b2-p11" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>iii</em>) Since some α-particles are deflected back and α-particles are heavy particles, these could be deflected back only when they strike heavier body inside the atom.
  </p>,
  <p key="b2-p12" style={{ textAlign: "justify", marginBottom: 10 }}>
    (<em>iv</em>) Since number of α-particles deflected back is very very small, this shows that the heavy body present in the atom must be occupying a very very small volume.*
  </p>,
  <DefBox key="def-nucleus">
    <em>The small heavy positively charged body present within the atom was called <strong>nucleus.</strong></em>
  </DefBox>,
  <div key="fig-2-9" style={{textAlign:"center",margin:"14px 0"}}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:20,flexWrap:"wrap"}}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_AA6097B9692FC33161EF} alt="(a) single atom" style={{maxWidth:"30%",height:"auto"}} />
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_99D723664B01F57E05EC} alt="(b) group of atoms" style={{maxWidth:"55%",height:"auto"}} />
    </div>
    <p style={{fontSize:13,color:"#444",marginTop:6,fontStyle:"italic"}}>Fig. 2.9. Scattering of α-particles by (<em>a</em>) a single atom (<em>b</em>) a group of atoms</p>
  </div>,
  <FootNote key="fn-b2-1">*It has been found that the radius of the atom is of the order of 10<Sup c="–10" /> m or 1 Å while the radius of the nucleus is of the order of 10<Sup c="–15" /> m or 10<Sup c="–5" /> Å. Thus, nucleus is 10<Sup c="–15" />/10<Sup c="–10" /> = 10<Sup c="–5" /> or 1/1,00,000th of the total size of the atom. The difference in size can be visualized by suggesting that if the nucleus were of the size of a cricket ball, atom would have a radius of about 5 km.</FootNote>,

  <SubHd key="sub-s262" id="s262" label="2.6.2" title="Rutherford's Nuclear Model of Atom" />,
  <p key="b2-p13" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    On the basis of scattering experiments, Rutherford put forward a model of atom known as 'Rutherford's nuclear model'. The main points of this model are as follows :
  </p>,
  <p key="b2-p14" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) An atom consists of two parts (<em>a</em>) nucleus (<em>b</em>) extranuclear part.
  </p>,
  <p key="b2-p15" style={{ marginBottom: 4 }}>
    <strong>Nucleus</strong> is a small heavy positively charged body present in the centre of the atom.
  </p>,
  <p key="b2-p16" style={{ marginBottom: 8 }}>
    <strong>Extranuclear part</strong> means the space around the nucleus in which the electrons are distributed.
  </p>,
  <p key="b2-p17" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) The entire mass of the atom is concentrated in the nucleus. Since the electrons have negligible mass, the mass of the atom is mainly due to protons. Hence, protons must be present in the nucleus. The presence of positively charged protons in the nucleus also accounts for the positive charge on the nucleus. (After the discovery of neutron, it was suggested that mass of the atom is due to protons and neutrons. Hence, nucleus contains protons and neutrons).
  </p>,
  <p key="b2-p18" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>iii</em>) To explain that the electrons do not fall into the nucleus as a result of attraction, Rutherford suggested that electrons were not stationary but were revolving around the nucleus in certain circular orbits. As a result, centrifugal force comes into play which balances the force of attraction.
  </p>,
  <p key="b2-p19" style={{ textIndent: 28, textAlign: "justify", marginBottom: 12 }}>
    Thus, this model is similar to our solar system where the nucleus is like the sun and the electrons are like the planets. That is why these electrons are also called <strong>planetary electrons.</strong>
  </p>,

  <SubHd key="sub-s263" id="s263" label="2.6.3" title="Drawback of Rutherford's Model of Atom" />,
  <p key="b2-p20" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Rutherford's model could not explain the stability of the atom. This is because according to Rutherford's model, an atom consists of a small heavy positively charged nucleus in the centre and the electrons were revolving around it. However, whenever a charged particle like electron is revolving around a central force like that of nucleus, it loses energy continuously in the form of radiations. Thus, the orbit of the revolving electron will keep on becoming smaller and smaller, following a spiral path as shown in Fig. 2.10 and ultimately the electron should fall into the nucleus. In other words, the atom should collapse. However, this actually does not happen and the atom is quite stable.
  </p>,
  <Fig key="fig-2-10" src={CONTENT_IMAGES.CONTENT_IMAGE_2D2936A9F68F3F127D7A} caption="Fig. 2.10. Continuous loss of energy by a revolving electron" />,

  // ── 2.7 Bohr's Model ──
  <SecHd key="sec-s27" id="s27" label="2.7" title="Bohr's Model of Atom" />,
  <p key="b2-p21" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    To explain the stability of atom, Neils Bohr, a Danish physicist in 1913, proposed a new model of atom. The most important concept of this model of atom was that electrons revolve only in certain fixed orbits around the nucleus without losing energy in the form of radiations.
  </p>,
  <p key="b2-p22" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The main points of this model of atom (called <strong>postulates of Bohr's model of atom</strong>) are as follows :
  </p>,
  <p key="b2-p23" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(1)</strong> An atom consists of a small heavy positively charged nucleus in the centre and the electrons revolve around it in circular paths called <strong>orbits.</strong>
  </p>,
  <p key="b2-p24" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(2)</strong> In a particular atom, the orbits in which the electrons revolve are the discrete orbits having fixed radii and energy. These discrete orbits are, therefore, also called <strong>energy levels</strong> or <strong>shells.</strong> The term shell is used to indicate that atom is three-dimensional, <em>i.e.,</em> it is not like a plate but is like a ball. As energy of the orbits is fixed, these are also called <strong>stationary states.</strong> These are numbered as 1, 2, 3, 4 etc. as we move outwards from the nucleus or they are represented by the letters K, L, M, N etc. as shown in Fig. 2.11. The energy of these shells increases as we move outwards from the nucleus. Thus, representing the energies of 1st, 2nd, 3rd, 4th shell etc. by E<sub style={{ fontSize: "0.72em" }}>1</sub>, E<sub style={{ fontSize: "0.72em" }}>2</sub>, E<sub style={{ fontSize: "0.72em" }}>3</sub>, E<sub style={{ fontSize: "0.72em" }}>4</sub> etc., we have :
  </p>,
  <MathBlock key="b2-energy">E<sub style={{ fontSize: "0.72em" }}>1</sub> &lt; E<sub style={{ fontSize: "0.72em" }}>2</sub> &lt; E<sub style={{ fontSize: "0.72em" }}>3</sub> &lt; E<sub style={{ fontSize: "0.72em" }}>4</sub></MathBlock>,
  <p key="b2-p25" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    However, the gaps between the successive energy shells decrease as we move outwards from the nucleus.*
  </p>,
  <FootNote key="fn-b2-2">*It may be remembered that when the electron is at infinite distance from the nucleus, there is no force of attraction or repulsion on it by the nucleus. Hence, its energy at infinite distance from nucleus is taken as zero. However, as the electron from infinite distance comes closer to the nucleus, attraction takes place, energy is released. Hence, <strong>electronic energy is negative</strong> (as it was zero at infinite distance).</FootNote>,
  <p key="b2-p26" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(3)</strong> So long as an electron is revolving in a particular orbit, it can neither lose energy nor gain energy. Thus, the atom is stable and does not collapse. This state of the atom with lowest energy is called <strong>ground state</strong> of the atom.
  </p>,
  <Fig key="fig-2-11" src={CONTENT_IMAGES.CONTENT_IMAGE_A36122F68AF1E5017D1A} caption="Fig. 2.11. Circular orbits or energy levels or shells around the nucleus" />,
  <p key="b2-p27" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(4)</strong> Energy is lost or gained by an electron only when it jumps from one orbit to the other. The energy gained or lost is equal to the difference of energy of the two energy levels involved. Thus, if energy falls on an electron and it absorbs this energy, it will jump to some outer shell. The atom is then said to be in the <strong>excited state.</strong> In the excited state, the atom is not stable. It loses or emits energy and jumps back to some inner energy level. In other words, an electron jumps from inner shell to outer shell by absorbing energy whereas energy is emitted when an electron jumps from an outer shell to an inner shell, as shown in Fig. 2.12.
  </p>,
  <div key="fig-2-12" style={{textAlign:"center",margin:"14px 0"}}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:20,flexWrap:"wrap"}}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_08FA4789F453DA2F497F} alt="(a) energy absorbed" style={{maxWidth:"32%",height:"auto"}} />
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_5B9048B6FB019C31384B} alt="(b) energy emitted" style={{maxWidth:"45%",height:"auto"}} />
    </div>
    <p style={{fontSize:13,color:"#444",marginTop:6,fontStyle:"italic"}}>Fig. 2.12. (<em>a</em>) Energy absorbed by electron results in the jump from inner shell to outer shell (<em>b</em>) Jump from outer shell to inner shell results in release of energy</p>
  </div>,
  <p key="b2-p28" style={{ textIndent: 28, textAlign: "justify", marginBottom: 12 }}>
    <strong>Usefulness of Bohr's Model of Atom.</strong> According to Bohr's model, as electrons cannot radiate energy while revolving in discrete orbits, therefore, it explains the stability of the atom, <em>i.e.,</em> it explains drawback of Rutherford's model of atom.
  </p>,

  // ── 2.8 Discovery of Neutron ──
  <SecHd key="sec-s28" id="s28" label="2.8" title="Discovery of Neutron" />,
  <SubHd key="sub-s281" id="s281" label="2.8.1" title="Reason for the presence of neutrons in an atom" />,
  <p key="b2-p29" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Experiments were carried out to determine the units of positive charge present on the nuclei of atoms of different elements. Since one unit positive charge corresponds to one proton, therefore, the number of units of positive charge on the nucleus of an atom is equal to the number of protons present in the nucleus. This number is called <strong>"atomic number"</strong> of that element.
  </p>,
  <p key="b2-p30" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Now, since each proton has one unit mass (1 amu) on the atomic scale, therefore, mass of the atom was calculated from the number of protons present in the nucleus (because electrons have negligible mass). However, for any element (except hydrogen), this mass was found to be less than the actual mass of the atom. For example, helium atom is found to have two protons in the nucleus (charge on nucleus = + 2). Hence, its mass should be 2 amu on the atomic scale. But actually an atom of helium is found to be nearly four times heavier than a proton, <em>i.e.,</em> its mass on the atomic scale is 4 amu. Hence, it was suggested by Rutherford in 1920 that there must be some neutral particles with definite mass present in the nucleus (because the entire mass of the atom is present in the nucleus).
  </p>,

  <SubHd key="sub-s282" id="s282" label="2.8.2" title="Experiments leading to the discovery of neutron" />,
  <p key="b2-p31" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The existence of neutron/neutrons in the nucleus of an atom was confirmed by <strong>Chadwick</strong> in 1932. He bombarded the nuclei of some light elements like beryllium and boron with fast moving α-particles. He found that some neutral particles were ejected from the nucleus. Each of these particles carried no charge but had a mass nearly equal to that of proton. (1 amu or 1·67 <Times /> 10<Sup c="–27" /> kg). This particle was named as neutron. Hence,
  </p>,
  <Fig key="fig-chadwick" src={CONTENT_IMAGES.CONTENT_IMAGE_40F3FEF9CB1EDD2E1E2B} caption="Chadwick's experiment: α-particle + Be/B → New atom (C/N) + Neutron" width="40%" />,
  <DefBox key="def-neutron">
    <strong>Neutron</strong> may be defined as that sub-atomic or fundamental particle which carries no charge, <em>i.e.,</em> it is neutral particle but has a mass nearly equal to that of proton (<em>i.e.,</em> 1 amu).
  </DefBox>,
  <p key="b2-p32" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As charge on neutron = 0 and mass = 1 u, therefore, it is represented by the symbol, <Sup c="1" /><sub style={{ fontSize: "0.72em" }}>0</sub><em>n</em>.
  </p>,

  <SubHd key="sub-s283" id="s283" label="2.8.3" title="Structure/Composition of the nucleus after the discovery of neutron" />,
  <p key="b2-p33" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Now, it is believed that the nucleus of an atom contains not only protons but it also contains neutrons. This solved the problem of explaining the relative masses of atoms.
  </p>,
  <p key="b2-p34" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    For example, in case of helium, its nucleus contains two protons and two neutrons. Hence, its relative mass of 4 amu is justified.
  </p>,
  <p key="b2-p35" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    It may be noted that relative mass of hydrogen atom is 1 u. It contains only one proton in the nucleus and no neutron. Atoms of all other elements contain protons as well as neutrons in the nucleus.
  </p>,
  <p key="b2-p36" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>To sum-up,</strong> the main characteristics of the three fundamental particles, <em>i.e.,</em> electron, proton and neutron are given in the Table below :
  </p>,

  // Table 2.1
  <div key="tbl-21" style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
      fontSize: 13.5, textAlign: "center", marginBottom: 8 }}>
      TABLE 2.1. Comparison of the characteristics of electron, proton and neutron.
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          {th("Particle")}{th("Charge on the particle")}{th("Mass of the particle")}{th("Symbol")}{th("Location in the atom")}
        </tr>
      </thead>
      <tbody>
        <tr>
          {td("1. Electron")}{td(<>– 1 unit<br/>(– 1·602 <Times /> 10<Sup c="–19" /> coulomb)</>,"center")}
          {td(<>9·11 <Times /> 10<Sup c="–31" /> kg<br/>(<Frac n="1" d="1840" /> u)</>, "center")}
          {td(<><Sup c="0" /><sub style={{ fontSize: "0.72em" }}>–1</sub><em>e</em></>, "center")}
          {td("Outside the nucleus (Extranuclear part)")}
        </tr>
        <tr>
          {td("2. Proton")}{td(<>+ 1 unit<br/>(+ 1·602 <Times /> 10<Sup c="–19" /> C)</>,"center")}
          {td(<>1·673 <Times /> 10<Sup c="–27" /> kg<br/>(1 u)</>, "center")}
          {td(<><Sup c="1" /><sub style={{ fontSize: "0.72em" }}>1</sub><em>p</em></>, "center")}
          {td("In the nucleus")}
        </tr>
        <tr>
          {td("3. Neutron")}{td("No charge","center")}
          {td(<>1·675 <Times /> 10<Sup c="–27" /> kg<br/>(1 u)</>, "center")}
          {td(<><Sup c="0" /><sub style={{ fontSize: "0.72em" }}>1</sub><em>n</em></>, "center")}
          {td("In the nucleus")}
        </tr>
      </tbody>
    </table>
  </div>,

  // Summing Up Journey Inside the Atom
  <FeatureBox key="feat-journey" title='SUMMING UP "JOURNEY INSIDE THE ATOM"'>
    <p style={{ textAlign: "justify", marginBottom: 8 }}>For centuries, the atom was considered to be a simple, solid and unbreakable sphere. It took nearly 150 years by various scientists to understand the complex nature of the atom inside. These studies are summed up below :</p>
    <p style={{ textAlign: "justify", marginBottom: 7 }}><strong>(1) John Dalton (1803) (Billiard Ball Model).</strong> Before Dalton, the "atom" was only a philosophical idea. Dalton provided the first scientific theory. He imagined atoms as tiny solid, indivisible spheres, much like billiard ball.</p>
    <p style={{ marginBottom: 4 }}><strong>Main Idea.</strong> Atoms are the smallest unit of matter and cannot be divided, created or destroyed.</p>
    <p style={{ marginBottom: 8 }}><strong>Shortcoming/Drawback.</strong> He believed that atom has no internal parts. We now know that it is made up of even smaller subatomic particles.</p>
    <p style={{ textAlign: "justify", marginBottom: 7 }}><strong>(2) J. J. Thomson (1897) (Plum Pudding or Watermelon Model).</strong> Thomson used a cathode ray tube to discover the first subatomic particle, the electron. This proved that Dalton was wrong – the atom could be subdivided.</p>
    <p style={{ marginBottom: 4 }}><strong>Main Idea.</strong> He suggested that atom is a sphere of positive charge (the pudding) with tiny negative electrons (the plums) embedded in it or like seeds embedded into watermelon. This also justified that atom as a whole is electrically neutral.</p>
    <p style={{ marginBottom: 8 }}><strong>Shortcoming/Drawback.</strong> It could not explain the scattering experiments carried out by Rutherford in 1911.</p>
    <p style={{ textAlign: "justify", marginBottom: 7 }}><strong>(3) Ernest Rutherford (1911) (Nuclear Model).</strong> Rutherford performed scattering experiments in which he bombarded thin foil of gold with high speed α-particles. He observed that most of the α-particles passed through the foil but some were reflected back.</p>
    <p style={{ marginBottom: 4 }}><strong>Main Ideas.</strong> On the basis of his experiments, he proved that atom is mostly empty space and that there was tiny, dense positively charged sphere in the centre called nucleus and the electrons revolve around the nucleus like planets around the sun. That is why this model is called 'Nuclear Model'. The positive charge on the nucleus was due to presence of positively charged particles called 'protons'.</p>
    <p style={{ marginBottom: 8 }}><strong>Shortcoming/Drawback.</strong> It could not explain the stability of the atom because revolving electrons will keep on losing energy. They will follow a spiral path and should fall into the nucleus.</p>
    <p style={{ textAlign: "justify", marginBottom: 7 }}><strong>(4) Niels Bohr (1913) (Planetary Model).</strong> To overcome the drawback of Rutherford's model, Bohr used Mathematics and Physics and suggested a new model, named after his name.</p>
    <p style={{ marginBottom: 4 }}><strong>Main Ideas.</strong> He proposed that electrons move in fixed orbits (or shells) around the nucleus. Each shell has a fixed value of energy and hence called energy levels named as K, L, M, N etc. As long as electron resolves in a particular orbit, it does not lose energy.</p>
    <p style={{ marginBottom: 8 }}><strong>Shortcoming/Drawback.</strong> Further ideas were put forward that electron does not travel in a circular path but travels in the form of waves and hence new model called 'wave mechanical model' has been put forward which you will study in higher classes.</p>
    <p style={{ textAlign: "justify", marginBottom: 7 }}><strong>(5) James Chadwick (1932).</strong> As protons are present in the nucleus and the whole mass of the atom is the nucleus, the mass of the nucleus should be equal to the mass of protons. But actually, nucleus is found to much heavier than the mass of protons present in the nucleus. Chadwick performed experiments and discovered the presence of particles in the nucleus which had mass equal to the mass of proton but had no charge. These particles were called neutrons.</p>
    <p><strong>Main Idea.</strong> The nucleus contains not only protons but also contains neutrons. This helped to complete the basic picture of atomic nucleus.</p>
  </FeatureBox>,

  // ── 2.9 Atomic Number and Mass Number ──
  <SecHd key="sec-s29" id="s29" label="2.9" title="Atomic Number and Mass Number" />,
  <SubHd key="sub-s291" id="s291" label="2.9.1" title="Atomic Number" />,
  <DefBox key="def-atomicnum">
    <em>Atomic number of an element is equal to the number of protons present in the nucleus of the atom of that element.</em>
  </DefBox>,
  <p key="b2-p37" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>For example,</p>,
  <p key="b2-p38" style={{ marginBottom: 3 }}>(<em>i</em>) Nucleus of hydrogen atom contains only one proton, its atomic number = 1.</p>,
  <p key="b2-p39" style={{ marginBottom: 3 }}>(<em>ii</em>) Nucleus of helium atom contains 2 protons, its atomic number = 2.</p>,
  <p key="b2-p40" style={{ marginBottom: 3 }}>(<em>iii</em>) Nucleus of carbon atom contains 6 protons, its atomic number = 6.</p>,
  <p key="b2-p41" style={{ marginBottom: 3 }}>(<em>iv</em>) Nucleus of oxygen atom contains 8 protons, its atomic number = 8.</p>,
  <p key="b2-p42" style={{ marginBottom: 3 }}>(<em>v</em>) Nucleus of sodium atom contains 11 protons, its atomic number = 11.</p>,
  <p key="b2-p43" style={{ marginBottom: 10 }}>(<em>vi</em>) Nucleus of chlorine atom contains 17 protons, its atomic number = 17, and so on.</p>,
  <p key="b2-p44" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since a normal atom as a whole is electrically neutral, and each proton carries one unit positive charge and each electron carries one unit negative charge, therefore, number of protons present in the nucleus must be equal to the number of electrons present in the extranuclear part. Hence, we can say that <em>in a neutral atom, the atomic number is equal to the number of electrons in the extranuclear part.</em> For example, a normal atom of sodium contains 11 protons and 11 electrons. A normal atom of chlorine contains 17 protons and 17 electrons and so on. Thus,
  </p>,
  <div key="b2-atomicnum-box" style={{ background: LIGHT_P, border: "1.5px solid #c0126a",
    padding: "10px 18px", margin: "10px 0", textAlign: "center", fontSize: 14 }}>
    <strong>Atomic number of an element = Number of protons in the nucleus</strong><br/>
    <strong>= Number of electrons in the extranuclear part (in neutral atom)</strong>
  </div>,
  <p key="b2-p45" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    It is important to remember that the number of electrons is equal to the number of protons only in the neutral atom. However, in case of ions, the number of electrons may be less or more than the number of protons. As positive ion is formed by the loss of electrons, therefore, number of electrons in a positive ion is less than the number of protons. For example, a normal sodium atom (Na) contains 11 protons and 11 electrons but sodium ion (Na<Sup c="+" />) contains 11 protons but 10 electrons. Similarly, as negative ion is formed by gain of electrons, a negative ion has greater number of electrons than protons. For example, a normal chlorine atom (Cl) contains 17 protons and 17 electrons but chloride ion (Cl<Sup c="–" />) contains 17 protons and 18 electrons. Hence, <em>atomic number should always be calculated from number of protons in the nucleus.</em>
  </p>,
  <p key="b2-p46" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    <strong>Some Important Characteristics of Atomic Number.</strong> Atomic number has the following important characteristics :
  </p>,
  <p key="b2-p47" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) <em>Atomic number is always a whole number.</em> This is because an atom always contains whole number of protons.
  </p>,
  <p key="b2-p48" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>ii</em>) <em>All atoms of the same element have same number of protons in the nucleus and hence have the same atomic number.</em>
  </p>,
  <p key="b2-p49" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>iii</em>) <em>No two elements have the same atomic number.</em> For example, atomic number of carbon is 6. No other element can have atomic number equal to 6. Thus, <em>atomic number is the characteristic property of an element, i.e., each element has fixed value of atomic number.</em> It is just like Aadhar card or social security number. No two persons can have the same Aadhar card number or social security number.
  </p>,
  <p key="b2-p50" style={{ textAlign: "justify", marginBottom: 10 }}>
    (<em>iv</em>) <em>Atomic number of an element does not change during a chemical reaction.</em> This is because during a chemical reaction, there is a rearrangement of electrons between atoms (loss, gain or sharing of electrons). Thus, number of electrons may change but as nucleus does not take part in the reaction, therefore, number of protons does not change.
  </p>,
  <p key="b2-p51" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Atomic number of an element is usually denoted by the symbol 'Z'. It is represented along with the symbol on the left lower side. Thus, we have
  </p>,
  <div key="b2-zsymbols" style={{ textAlign: "center", fontSize: 14, margin: "10px 0 14px",
    letterSpacing: 2, lineHeight: 2 }}>
    <sub style={{ fontSize: "0.72em" }}>1</sub>H &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>2</sub>He &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>3</sub>Li &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>4</sub>Be &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>5</sub>B &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>6</sub>C &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>7</sub>N &nbsp;&nbsp; <sub style={{ fontSize: "0.72em" }}>8</sub>O<br/>
    (Z=1) &nbsp; (Z=2) &nbsp; (Z=3) &nbsp; (Z=4) &nbsp; (Z=5) &nbsp; (Z=6) &nbsp; (Z=7) &nbsp; (Z=8)
  </div>,

  <SubHd key="sub-s292" id="s292" label="2.9.2" title="Mass Number" />,
  <p key="b2-p52" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The atom of an element contains electrons, protons and neutrons. Since the electrons have negligible mass, the mass of the atom is mainly due to protons and neutrons. Further, since each of these particles has one unit mass (1 amu) on the atomic scale, therefore, the sum of number of protons and neutrons will be nearly equal to the mass of the atom. This sum is called mass number. Thus,
  </p>,
  <DefBox key="def-massnumber">
    <em>Mass number of an element is the sum of the number of protons and neutrons present in the atom of the element, i.e.,</em><br/>
    <div style={{ textAlign: "center", marginTop: 6, fontStyle: "normal" }}>
      <strong>Mass number of an element = Number of protons + Number of neutrons</strong>
    </div>
  </DefBox>,
  <p key="b2-p53" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since protons and neutrons are present in the nucleus, these particles are collectively called <strong>nucleons.</strong> Thus, <em>mass number of an element is equal to the number of nucleons present in the atom of that element.</em>
  </p>,

  <SubHd key="sub-s293" id="s293" label="2.9.3" title="Difference between Mass Number and Atomic Mass" />,
  <p key="b2-p54" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The mass number of an element is nearly equal to the atomic mass (or atomic weight) of the element. The main difference between the two is that mass number is always a whole number (because protons and neutrons are always present in whole numbers) whereas atomic mass is usually not a whole number (because it is the relative mass as compared with mass of C-12 atom taken as 12). However, for most of the purposes, atomic mass is taken as equal to mass number.
  </p>,

  <SubHd key="sub-s294" id="s294" label="2.9.4" title="Representation of Atomic Number and Mass Number with the Symbol of the Element" />,
  <p key="b2-p55" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Atomic number of an element is usually denoted by 'Z' whereas mass number (atomic mass) is represented by 'A'. They are represented along with the symbol of the element (say X) as follows :
  </p>,
  <Fig key="fig-x-symbol" src={CONTENT_IMAGES.CONTENT_IMAGE_9853038088EEB194E989} caption="Representation of atomic number (Z) and mass number (A) with element symbol X" width="45%" />,

  <p key="b2-p56" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    For example, carbon has atomic number (Z) = 6 and mass number (A) = 12. Hence, we represent it as <Sup c="12" /><sub style={{ fontSize: "0.72em" }}>6</sub>C. Similarly, we have
  </p>,
  <div key="b2-examples-symbols" style={{ textAlign: "center", fontSize: 13.5, margin: "10px 0 14px", lineHeight: 2, letterSpacing: 1 }}>
    <Sup c="1" /><sub style={{ fontSize: "0.72em" }}>1</sub>H, &nbsp; <Sup c="14" /><sub style={{ fontSize: "0.72em" }}>7</sub>N, &nbsp; <Sup c="16" /><sub style={{ fontSize: "0.72em" }}>8</sub>O, &nbsp; <Sup c="19" /><sub style={{ fontSize: "0.72em" }}>9</sub>F, &nbsp; <Sup c="23" /><sub style={{ fontSize: "0.72em" }}>11</sub>Na, &nbsp; <Sup c="24" /><sub style={{ fontSize: "0.72em" }}>12</sub>Mg, &nbsp; <Sup c="27" /><sub style={{ fontSize: "0.72em" }}>13</sub>Al, &nbsp; <Sup c="31" /><sub style={{ fontSize: "0.72em" }}>15</sub>P, &nbsp; <Sup c="35" /><sub style={{ fontSize: "0.72em" }}>17</sub>Cl, &nbsp; <Sup c="39" /><sub style={{ fontSize: "0.72em" }}>19</sub>K, &nbsp; <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>20</sub>Ca etc.
  </div>,

  <SubHd key="sub-s295" id="s295" label="2.9.5" title="Calculation of Number of Electrons, Protons and Neutrons from Atomic Number (Z) and Mass Number or Atomic Mass (A)" />,
  <p key="b2-p57" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>By definition</p>,
  <div key="b2-zpe-box" style={{ background: LIGHT_P, border: "1.5px solid #c0126a",
    padding: "10px 18px", margin: "10px 0", textAlign: "center", fontSize: 14 }}>
    <strong>Atomic Number (Z) = Number of Protons (<em>p</em>) = Number of electrons (<em>e</em>) in a neutral atom</strong>
  </div>,
  <p key="b2-p58" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, knowing atomic number of the element, number of protons as well as number of electrons in the normal atom (neutral atom) can be calculated.
  </p>,
  <p key="b2-p59" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>Further, by definition,</p>,
  <MathBlock key="b2-math1">Mass Number or Atomic Mass (A) = Number of protons (<em>p</em>) + Number of neutrons (<em>n</em>)</MathBlock>,
  <MathBlock key="b2-math2">But Number of protons (<em>p</em>) = Atomic number (Z)</MathBlock>,
  <MathBlock key="b2-math3">∴ &nbsp; A = Z + <em>n</em> &nbsp;&nbsp; or &nbsp;&nbsp; <em>n</em> = A – Z</MathBlock>,
  <div key="b2-neutron-formula" style={{ background: LIGHT_P, border: "1.5px solid #c0126a",
    padding: "8px 18px", margin: "8px 0", textAlign: "center", fontSize: 14 }}>
    <em>i.e.,</em> &nbsp; <strong>Number of neutrons = Mass Number – Atomic Number</strong>
  </div>,
  <p key="b2-p60" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    It may be seen that for a number of elements with low atomic number, mass number is double of the atomic number, <em>e.g.,</em> for carbon, Z = 6, A = 12; for oxygen Z = 8, A = 16 etc. However, in a number of cases, it is not so and mass number is greater than double of the atomic number. For example, for chromium, Z = 24, A = 52. The difference is much higher for elements with higher atomic number. For example, in case of uranium, Z = 92, A = 238. Thus, the number of neutrons in the nucleus is much more than the number of protons. This makes the nucleus unstable. This is the cause of radioactivity (<em>i.e.,</em> a phenomenon in which the nucleus of the atom disintegrates to emit α, β and γ-rays).
  </p>,
  <div key="b2-sumup" style={{ background: "#fff8e1", border: "1.5px solid #e6b800",
    padding: "8px 18px", margin: "10px 0", fontSize: 14, textAlign: "center" }}>
    <strong>To sum up : Z = <em>p</em> = <em>e</em> (in neutral atom) &nbsp;&nbsp; and &nbsp;&nbsp; A = <em>p</em> + <em>n</em> = Z + <em>n</em> &nbsp;&nbsp; or &nbsp;&nbsp; <em>n</em> = A – Z</strong>
  </div>,

  <NumericalSection key="num-protonelectron" topic="CALCULATION OF NUMBER OF ELECTRONS, PROTONS AND NEUTRONS">
    <p key="b2-ex1"><strong>Example 1.</strong> Calculate the number of electrons, protons and neutrons in sodium atom. Given that atomic number of sodium is 11 and mass number (atomic mass) is 23.</p>
    <p key="b2-ex1s"><strong>Solution.</strong> Atomic number (Z) = 11 &nbsp;&nbsp;&nbsp; Mass number (A) = 23</p>
    <p key="b2-ex1a">∴ &nbsp; Number of protons = Atomic number = <strong>11</strong></p>
    <p key="b2-ex1b">Since the atom is neutral, Number of electrons = Number of protons = <strong>11</strong></p>
    <p key="b2-ex1c">By definition, Mass number (A) = No. of protons (<em>p</em>) + No. of neutrons (<em>n</em>)</p>
    <p key="b2-ex1d">∴ &nbsp; Number of neutrons = A – Z = 23 – 11 = <strong>12.</strong></p>
    <br/>
    <p key="b2-ex2"><strong>Example 2.</strong> The nucleus of the atom of an element contains 17 protons and 18 neutrons. Calculate the atomic number and mass number of the element and represent them along with the symbol of the element.</p>
    <p key="b2-ex2s"><strong>Solution.</strong> Atomic number (Z) = Number of protons = <strong>17</strong></p>
    <p key="b2-ex2a">Mass number (A) = No. of protons + No. of neutrons = 17 + 18 = <strong>35</strong></p>
    <p key="b2-ex2b">Element with atomic number 17 is chlorine. Hence, we represent it as <Sup c="35" /><sub style={{ fontSize: "0.72em" }}>17</sub>Cl</p>
    <br/>
    <p key="b2-ex3"><strong>Example 3.</strong> What will be the composition of the nucleus of the atom of an element with atomic number 19 and mass number 39 ?</p>
    <p key="b2-ex3s"><strong>Solution.</strong> Atomic number of the element (Z) = 19 &nbsp;&nbsp; Mass number of the element (A) = 39</p>
    <p key="b2-ex3a">∴ &nbsp; Number of protons in the nucleus = Atomic Number = <strong>19</strong></p>
    <p key="b2-ex3b">∴ &nbsp; Number of neutrons in the nucleus = A – Z = 39 – 19 = <strong>20.</strong></p>
  </NumericalSection>,
];

// ── CONTENT BATCH 3 ──────────────────────────────────────────

// Table 2.2 sub-component
function Table22() {
  const rows = [
    ["Hydrogen","H",1,[1,"","",""],"1"],
    ["Helium","He",2,[2,"","",""],"2"],
    ["Lithium","Li",3,[2,1,"",""],"2, 1"],
    ["Beryllium","Be",4,[2,2,"",""],"2, 2"],
    ["Boron","B",5,[2,3,"",""],"2, 3"],
    ["Carbon","C",6,[2,4,"",""],"2, 4"],
    ["Nitrogen","N",7,[2,5,"",""],"2, 5"],
    ["Oxygen","O",8,[2,6,"",""],"2, 6"],
    ["Fluorine","F",9,[2,7,"",""],"2, 7"],
    ["Neon","Ne",10,[2,8,"",""],"2, 8"],
    ["Sodium","Na",11,[2,8,1,""],"2, 8, 1"],
    ["Magnesium","Mg",12,[2,8,2,""],"2, 8, 2"],
    ["Aluminium","Al",13,[2,8,3,""],"2, 8, 3"],
    ["Silicon","Si",14,[2,8,4,""],"2, 8, 4"],
    ["Phosphorus","P",15,[2,8,5,""],"2, 8, 5"],
    ["Sulphur","S",16,[2,8,6,""],"2, 8, 6"],
    ["Chlorine","Cl",17,[2,8,7,""],"2, 8, 7"],
    ["Argon","Ar",18,[2,8,8,""],"2, 8, 8"],
    ["Potassium","K",19,[2,8,8,1],"2, 8, 8, 1"],
    ["Calcium","Ca",20,[2,8,8,2],"2, 8, 8, 2"],
  ];
  const noble = new Set(["He","Ne","Ar"]);
  return (
    <div style={{ overflowX: "auto", margin: "16px 0" }}>
      <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
        fontSize: 13.5, textAlign: "center", marginBottom: 8 }}>
        TABLE 2.2. Electronic configuration of first 20 elements.
      </p>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
        <thead>
          <tr>
            <th rowSpan={2} style={{ border: "1px solid #aaa", padding: "6px 10px",
              background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>Element</th>
            <th rowSpan={2} style={{ border: "1px solid #aaa", padding: "6px 10px",
              background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>Symbol</th>
            <th rowSpan={2} style={{ border: "1px solid #aaa", padding: "6px 10px",
              background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>Atomic No. (No. of electrons)</th>
            <th colSpan={4} style={{ border: "1px solid #aaa", padding: "6px 10px",
              background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>Distribution of electrons in different shells</th>
            <th rowSpan={2} style={{ border: "1px solid #aaa", padding: "6px 10px",
              background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>Short representation of electronic configuration</th>
          </tr>
          <tr>
            {["K","L","M","N"].map(s => (
              <th key={s} style={{ border: "1px solid #aaa", padding: "5px 8px",
                background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, sym, z, shells, ec]) => (
            <tr key={sym} style={{ fontWeight: noble.has(sym) ? 700 : 400 }}>
              <td style={{ border: "1px solid #aaa", padding: "4px 8px" }}>{name}</td>
              <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{sym}</td>
              <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{z}</td>
              {shells.map((v, i) => (
                <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>
                  {v !== "" ? v : ""}
                </td>
              ))}
              <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{ec}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const content_b3 = [
  // ── 2.10 Electronic Configuration ──
  <SecHd key="sec-s210" id="s210" label="2.10" title="Distribution (Arrangement) of Electrons in Different Shells — Electronic Configuration of Elements" />,
  <p key="b3-p1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We know that there are a number of shells present in an atom. These are called 1st shell, 2nd shell, 3rd shell, 4th shell etc. or K-shell, L-shell, M-shell, N-shell etc. respectively as we move outwards from the nucleus. Also, we know that the electrons of the atom are present in these shells.
  </p>,
  <DefBox key="def-econfiguration">
    <em>The distribution or arrangement of the electrons in the different shells of the atom is called the <strong>electronic configuration</strong> of the element.</em>
  </DefBox>,
  <p key="b3-p2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Obviously, the arrangement of electrons in the different shells should be such that it should have maximum stability. We know that lower the energy, greater is the stability. Now, as K-shell is closest to the nucleus, it has minimum energy. Hence, the electrons will first enter into the lowest energy K-shell. When it is filled up, the shell next in order of energy, <em>i.e.,</em> L-shell will be filled, then M and then N-shell and so on. Thus, to write the electronic configuration of an element, we should know the following :
  </p>,
  <p key="b3-p3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Total number of electrons present in the atom.</strong> This is equal to the number of protons (<em>i.e.,</em> atomic number) for a neutral atom.
  </p>,
  <p key="b3-p4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. Maximum number of electrons that can be present in each shell of atom.</strong> This is given by <strong>Bohr-Bury scheme</strong> as follows:
  </p>,
  <p key="b3-p5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    (<em>i</em>) <em>The maximum number of electrons that can be present in the nth shell is equal to 2n<Sup c="2" />.</em> Thus, we have
  </p>,
  <div key="b3-shells-table" style={{ overflowX: "auto", margin: "10px 0 14px" }}>
    <table style={{ borderCollapse: "collapse", margin: "0 auto", fontSize: 13.5 }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #aaa", padding: "6px 14px", background: "#f9eef4", fontWeight: 700 }}>Shell</th>
          <th style={{ border: "1px solid #aaa", padding: "6px 14px", background: "#f9eef4", fontWeight: 700 }}>Maximum number of electrons present</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["1st shell or K-shell (n = 1)", <span>2 <Times /> 1<Sup c="2" /> = 2</span>],
          ["2nd shell or L-shell (n = 2)", <span>2 <Times /> 2<Sup c="2" /> = 8</span>],
          ["3rd shell or M-shell (n = 3)", <span>2 <Times /> 3<Sup c="2" /> = 18</span>],
          ["4th shell or N-shell (n = 4)", <span>2 <Times /> 4<Sup c="2" /> = 32</span>],
        ].map(([s, v], i) => (
          <tr key={i}>
            <td style={{ border: "1px solid #aaa", padding: "5px 14px" }}>{s}</td>
            <td style={{ border: "1px solid #aaa", padding: "5px 14px", textAlign: "center" }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>,
  <Fig key="fig-2-13" src={CONTENT_IMAGES.CONTENT_IMAGE_07275105A69077C7514F} caption="Fig. 2.13. Maximum number of electrons present in different shells" />,
  <p key="b3-p6" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>ii</em>) <em>The outermost shell cannot have more than 8 electrons even if the first rule is violated.</em> For example, 3rd shell (M-shell) can accommodate upto 18 electrons but as soon as it has acquired 8 electrons, the filling of the 4th shell (N-shell) starts.
  </p>,
  <p key="b3-p7" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>iii</em>) <em>Electrons do not enter into a new shell unless the inner shells are completely filled.</em> In other words, the shells are filled in a step-wise manner.
  </p>,
  <KBBox key="kb-s210" title="NOTE">
    <p style={{ margin: 0, textAlign: "justify" }}>
      As mentioned above, as soon as 3rd shell (M-shell) acquires 8 electrons, filling of 4th shell (N-shell) starts. However, when 4th shell has acquired 2 electrons, further exceptions start (<em>i.e.,</em> filling starts again in the 3rd shell till it has got 18 electrons). Such exceptions you will study in higher classes. <strong>Hence, in the present class, we will discuss the electronic configurations of only the first 20 elements.</strong>
    </p>
  </KBBox>,
  <p key="b3-p8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Keeping the above rules in view, the electronic configurations of the first 20 elements are given in the Table 2.2 below :
  </p>,
  <Table22 key="tbl-22" />,

  <p key="b3-p9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Diagrammatically, the nuclear structure (composition of the nucleus) and the distribution of electrons for some elements are represented below :
  </p>,
  <div key="fig-2-19" style={{textAlign:"center",margin:"16px 0"}}>
    <div style={{display:"flex",justifyContent:"center",alignItems:"flex-start",gap:18,flexWrap:"wrap"}}>
      <div style={{textAlign:"center"}}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_93419FB5E298E81D79D5} alt="Hydrogen (¹₁H)" style={{maxHeight:120,width:"auto",display:"block",margin:"0 auto"}} />
        <p style={{fontSize:12,marginTop:4,color:"#333"}}>Hydrogen (¹₁H)</p>
        <table style={{margin:"2px auto 0",borderCollapse:"collapse",fontSize:11}}><thead><tr><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>K</th></tr></thead><tbody><tr><td style={{padding:"1px 10px",textAlign:"center"}}>1</td></tr></tbody></table>
      </div>
      <div style={{textAlign:"center"}}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_28D0DD89E66EFE66DDCF} alt="Helium (⁴₂He)" style={{maxHeight:120,width:"auto",display:"block",margin:"0 auto"}} />
        <p style={{fontSize:12,marginTop:4,color:"#333"}}>Helium (⁴₂He)</p>
        <table style={{margin:"2px auto 0",borderCollapse:"collapse",fontSize:11}}><thead><tr><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>K</th></tr></thead><tbody><tr><td style={{padding:"1px 10px",textAlign:"center"}}>2</td></tr></tbody></table>
      </div>
      <div style={{textAlign:"center"}}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_E720C50DEF330E51791E} alt="Carbon (¹²₆C)" style={{maxHeight:120,width:"auto",display:"block",margin:"0 auto"}} />
        <p style={{fontSize:12,marginTop:4,color:"#333"}}>Carbon (¹²₆C)</p>
        <table style={{margin:"2px auto 0",borderCollapse:"collapse",fontSize:11}}><thead><tr><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>K</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>L</th></tr></thead><tbody><tr><td style={{padding:"1px 10px",textAlign:"center"}}>2</td><td style={{padding:"1px 10px",textAlign:"center"}}>4</td></tr></tbody></table>
      </div>
      <div style={{textAlign:"center"}}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_22355B24EED11B927FD0} alt="Sodium (²³₁₁Na)" style={{maxHeight:120,width:"auto",display:"block",margin:"0 auto"}} />
        <p style={{fontSize:12,marginTop:4,color:"#333"}}>Sodium (²³₁₁Na)</p>
        <table style={{margin:"2px auto 0",borderCollapse:"collapse",fontSize:11}}><thead><tr><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>K</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>L</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 10px",textAlign:"center"}}>2</td><td style={{padding:"1px 10px",textAlign:"center"}}>8</td><td style={{padding:"1px 10px",textAlign:"center"}}>1</td></tr></tbody></table>
      </div>
      <div style={{textAlign:"center"}}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_02425C53A7E1307687D0} alt="Chlorine (³⁵₁₇Cl)" style={{maxHeight:120,width:"auto",display:"block",margin:"0 auto"}} />
        <p style={{fontSize:12,marginTop:4,color:"#333"}}>Chlorine (³⁵₁₇Cl)</p>
        <table style={{margin:"2px auto 0",borderCollapse:"collapse",fontSize:11}}><thead><tr><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>K</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>L</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 10px",textAlign:"center"}}>2</td><td style={{padding:"1px 10px",textAlign:"center"}}>8</td><td style={{padding:"1px 10px",textAlign:"center"}}>7</td></tr></tbody></table>
      </div>
      <div style={{textAlign:"center"}}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_DF0FE8DDD2D431661064} alt="Potassium (³⁹₁₉K)" style={{maxHeight:120,width:"auto",display:"block",margin:"0 auto"}} />
        <p style={{fontSize:12,marginTop:4,color:"#333"}}>Potassium (³⁹₁₉K)</p>
        <table style={{margin:"2px auto 0",borderCollapse:"collapse",fontSize:11}}><thead><tr><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>K</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>L</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>M</th><th style={{padding:"1px 10px",fontWeight:600,color:"#555"}}>N</th></tr></thead><tbody><tr><td style={{padding:"1px 10px",textAlign:"center"}}>2</td><td style={{padding:"1px 10px",textAlign:"center"}}>8</td><td style={{padding:"1px 10px",textAlign:"center"}}>8</td><td style={{padding:"1px 10px",textAlign:"center"}}>1</td></tr></tbody></table>
      </div>
    </div>
  </div>,

  <p key="b3-p10" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
    color: P_COLOR, fontSize: 13.5, margin: "14px 0 7px" }}>Explanation of Electronic Configurations Given in Table 2.2.</p>,
  <p key="b3-p11" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>1.</strong> Filling of electrons starts into K-shell because it has lowest energy. K-shell can accommodate a maximum of two electrons. As hydrogen has only one electron, it enters into K-shell. Helium has two electrons. Both enter into K-shell.
  </p>,
  <p key="b3-p12" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>2.</strong> Lithium has 3 electrons. Two electrons enter into lowest energy K-shell. The 3rd electron enters into the next shell, <em>i.e.,</em> L-shell. As L-shell can accommodate a maximum of 8 electrons, filling of L-shell continues till it has acquired 8 electrons, <em>i.e.,</em> in neon.
  </p>,
  <p key="b3-p13" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>3.</strong> After L-shell is filled up, next in energy is M-shell. Sodium has 11 electrons. 2 electrons enter into K-shell, 8 electrons into M-shell and the remaining 1 electron enters into L-shell.
  </p>,
  <p key="b3-p14" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>4.</strong> Though L-shell can accommodate upto 18 electrons but according to Bohr-Bury scheme, when it acquires 8 electrons (as in argon), the filling of M-shell starts at potassium, <em>i.e.,</em> electronic configuration of <strong>potassium</strong> is
  </p>,
  <div key="b3-k-config" style={{ textAlign: "center", margin: "8px 0", fontFamily: "monospace", fontSize: 13.5 }}>
    <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
      <thead><tr>{["K","L","M","N"].map(s => <th key={s} style={{ padding: "3px 18px", borderBottom: "1px solid #aaa" }}>{s}</th>)}</tr></thead>
      <tbody><tr>{[2,8,8,1].map((v,i) => <td key={i} style={{ padding: "3px 18px", textAlign: "center" }}>{v}</td>)}</tr></tbody>
    </table>
  </div>,
  <p key="b3-p15" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>5.</strong> The next electron, (<em>i.e.,</em> in calcium) enters again into N-shell so that electronic configuration of <strong>calcium</strong> is
  </p>,
  <div key="b3-ca-config" style={{ textAlign: "center", margin: "8px 0 14px", fontFamily: "monospace", fontSize: 13.5 }}>
    <table style={{ margin: "0 auto", borderCollapse: "collapse" }}>
      <thead><tr>{["K","L","M","N"].map(s => <th key={s} style={{ padding: "3px 18px", borderBottom: "1px solid #aaa" }}>{s}</th>)}</tr></thead>
      <tbody><tr>{[2,8,8,2].map((v,i) => <td key={i} style={{ padding: "3px 18px", textAlign: "center" }}>{v}</td>)}</tr></tbody>
    </table>
  </div>,

  <p key="b3-p16" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The reason why in potassium and calcium, the filling of electrons in the N-shell starts after M-shell has acquired 8 electrons (though it can accommodate upto 18 electrons) is as follows : With increase in atomic number, the difference of energy between the successive shells decreases. Thus, the M and N energy shells come so close together that they overlap. When M-shell has acquired 8 electrons, it shifts to higher energy than N-shell. Hence, filling of N-shell starts. When N-shell acquires 2 electrons, it shifts higher in energy than M-shell. Hence, filling again starts in the M-shell (<em>e.g.,</em> for Scandium, Z = 21, E.C. = 2, 8, 9, 2). Hence, we confine our study only upto the electronic configuration of calcium in the present class.
  </p>,

  <NumericalSection key="num-econfig" topic="ELECTRONIC CONFIGURATION">
    <p key="b3-econfig-ex1"><strong>Example 1.</strong> Write the electronic configuration of (i) Sodium atom (Atomic No. = 11) (ii) Chlorine atom (Atomic No. = 17)</p>
    <p key="b3-econfig-s1"><strong>Solution.</strong> (<em>i</em>) Atomic number of sodium (Na) = 11. Thus, it has 11 electrons.</p>
    <p key="b3-econfig-a">1st shell (K-shell) can accommodate maximum 2 electrons</p>
    <p key="b3-econfig-b">2nd shell (L-shell) can accommodate maximum 8 electrons</p>
    <p key="b3-econfig-c">The remaining one electron will enter into 3rd shell (M-shell).</p>
    <p key="b3-econfig-d">Hence, the electronic configuration of sodium atom will be</p>
    <div key="b3-econfig-d-tbl" style={{textAlign:"center",margin:"6px 0 4px"}}>
      <table style={{margin:"0 auto",borderCollapse:"collapse",fontSize:13.5}}>
        <thead><tr>{["K","L","M"].map(s=><th key={s} style={{padding:"2px 16px",fontWeight:600}}>{s}</th>)}</tr></thead>
        <tbody><tr>{[2,8,1].map((v,i)=><td key={i} style={{padding:"2px 16px",textAlign:"center"}}>{v}</td>)}</tr></tbody>
      </table>
    </div>
    <p key="b3-econfig-d2" style={{textAlign:"center",marginBottom:6}}>or &nbsp;<strong>2, 8, 1.</strong></p>
    <br/>
    <p key="b3-econfig-e">(<em>ii</em>) Atomic number of chlorine (Cl) = 17. Thus, it has 17 electrons.</p>
    <p key="b3-econfig-f">1st shell (K-shell) can accommodate maximum 2 electrons</p>
    <p key="b3-econfig-g">2nd shell (L-shell) can accommodate maximum 8 electrons.</p>
    <p key="b3-econfig-h">The remaining 7 electrons will enter into 3rd shell (M-shell).</p>
    <p key="b3-econfig-i">Hence, the electronic configuration of chlorine atom will be</p>
    <div key="b3-econfig-i-tbl" style={{textAlign:"center",margin:"6px 0 4px"}}>
      <table style={{margin:"0 auto",borderCollapse:"collapse",fontSize:13.5}}>
        <thead><tr>{["K","L","M"].map(s=><th key={s} style={{padding:"2px 16px",fontWeight:600}}>{s}</th>)}</tr></thead>
        <tbody><tr>{[2,8,7].map((v,i)=><td key={i} style={{padding:"2px 16px",textAlign:"center"}}>{v}</td>)}</tr></tbody>
      </table>
    </div>
    <p key="b3-econfig-i2" style={{textAlign:"center",marginBottom:6}}>or &nbsp;<strong>2, 8, 7.</strong></p>
    <br/>
    <p key="b3-econfig-ex2"><strong>Example 2.</strong> The atom of an element has 2 electrons in the M-shell. What will be the atomic number of the element ? Name the element.</p>
    <p key="b3-econfig-s2"><strong>Solution.</strong> As the atom has 2 electrons in the M-shell, this means that K and L shells are completely filled.</p>
    <p key="b3-econfig-j">As completely filled K-shell has 2 electrons and completely filled L-shell has 8 electrons, therefore, complete electronic configuration of the atom of the element will be</p>
    <div key="b3-econfig-j-tbl" style={{textAlign:"center",margin:"6px 0 4px"}}>
      <table style={{margin:"0 auto",borderCollapse:"collapse",fontSize:13.5}}>
        <thead><tr>{["K","L","M"].map(s=><th key={s} style={{padding:"2px 16px",fontWeight:600}}>{s}</th>)}</tr></thead>
        <tbody><tr>{[2,8,2].map((v,i)=><td key={i} style={{padding:"2px 16px",textAlign:"center"}}>{v}</td>)}</tr></tbody>
      </table>
    </div>
    <p key="b3-econfig-k">Total number of electrons = 2 + 8 + 2 = 12</p>
    <p key="b3-econfig-l">As the atom is neutral, total number of protons = total number of electrons = Atomic number = <strong>12</strong>. Hence, the element is <strong>magnesium.</strong></p>
  </NumericalSection>,

  // ── Activity 2.2 ──
  <ActivityBox key="act-2-2" num="2.2" sub="MODEL MAKING OF ATOMIC STRUCTURE (To represent the nucleus and electron shells of atoms using eco-friendly materials such as paper and clay)">
    <p style={{ marginBottom: 8 }}>It involves four steps as explained below :</p>
    <p style={{ marginBottom: 7 }}><strong>1. Representing the Nucleus.</strong> Nucleus contains protons and neutrons. As they are heavy particles, clay is the best material to represent them. Two different coloured clay, <em>e.g.,</em> terracota for protons and white for neutrons may be used. Roll the clay into small, uniform spheres. Depending upon the number of protons and neutrons, press equal number of spherical balls into a tight cluster.</p>
    <p style={{ marginBottom: 7 }}><strong>2. Representing electron shells/orbits.</strong> As electron shells represent circular path of electrons around the nucleus, take craft paper and cut out concentric circles of different sizes out of the paper (K shell = smallest onwards for L, M shells etc.). Thus, we will get thin rings of different sizes. Label them as K, L, M etc.</p>
    <p style={{ marginBottom: 7 }}><strong>3. Representing the electrons.</strong> As electrons are significantly smaller than protons and neutrons, very small tiny clay beads of a third colour may be made or seed beads may be used. The number of beads required will be equal to number of electrons to be filled (maximum 2 in K, 8 in L etc.).</p>
    <p style={{ marginBottom: 6 }}><strong>4. Assembling the components.</strong></p>
    <p style={{ marginBottom: 6 }}>(<em>i</em>) <strong>Making three-dimensional (3 D) model.</strong> For this purpose, we use <strong>Suspension Method</strong> which requires cotton thread for suspension. It does not require any glue and makes a sturdy model. This is done in the following steps :</p>
    <p style={{ marginLeft: 20, marginBottom: 4 }}>(<em>a</em>) Cut out small holes in the paper rings as many as required (maximum 2 in the smallest ring for K shell, 8 in the next ring for M-shell and so on).</p>
    <p style={{ marginLeft: 20, marginBottom: 4 }}>(<em>b</em>) Fit the small beads into the holes of paper rings as many as required by pressing the beads slightly.</p>
    <p style={{ marginLeft: 20, marginBottom: 4 }}>(<em>c</em>) Tie thread to each paper ring and suspend them on a hook on a wall or any stand so that the rings are concentric.</p>
    <p style={{ marginLeft: 20, marginBottom: 8 }}>(<em>d</em>) Tie thread to the clay nucleus and hang from the same hook so that nucleus is in the centre of the smallest paper ring (Fig. 2.14 <em>a</em>).</p>
    <p style={{ marginBottom: 8 }}>(<em>ii</em>) <strong>Making two-dimensional (2D) model.</strong> For this purpose, we use <strong>Flat-Layer Method.</strong> To make 2D model, glue the paper rings onto large piece of cardboard and place the clay nucleus in the centre. (Fig. 2.14 <em>b</em>).</p>
    <div key="fig-2-14" style={{textAlign:"center",margin:"14px 0"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:24,flexWrap:"wrap"}}>
          <div>
            <img src={CONTENT_IMAGES.CONTENT_IMAGE_9EAB982712C8BC59EE41} alt="3D Model of Carbon Atom" style={{maxWidth:200,height:"auto"}} />
            <p style={{fontSize:12,marginTop:4,color:"#444",fontStyle:"italic"}}>(<em>a</em>) 3D Model of Carbon Atom</p>
          </div>
          <div>
            <img src={CONTENT_IMAGES.CONTENT_IMAGE_BCBAFF4ECD847BEB7B2D} alt="2D Model of Carbon Atom" style={{maxWidth:200,height:"auto"}} />
            <p style={{fontSize:12,marginTop:4,color:"#444",fontStyle:"italic"}}>(<em>b</em>) 2D Model of Carbon Atom</p>
          </div>
        </div>
        <p style={{fontSize:13,color:"#444",marginTop:4,fontStyle:"italic"}}>Fig. 2.14</p>
      </div>
    <p style={{ textAlign: "justify" }}><strong>Alternatively,</strong> model making may be carried out in a simpler way as follows : Take one small red size ball to represent the nucleus. Take white or blue balls (smaller in size) equal to the atomic number of the element to represent electrons. Take wires of different lengths so that they can be bent into circular shapes to form circles of different radii. Put the white/blue balls in the wire equal to the number of electrons in that shell, keeping in mind that first circle is small, second is larger, third is still larger and so on. Further, keep in mind that 1st shell can have maximum 2 electrons, 2nd shell can have maximum 8 electrons, 3rd can also have upto 8 electrons if it is the outermost shell. Fix each model on a card-board, by fixing the rubber balls with araldite, as shown below for the first eighteen elements.</p>
    <div key="fig-2-22" style={{textAlign:"center",margin:"14px 0",padding:"10px 0",background:"#fdf7fb",borderRadius:6}}>
      <div style={{display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap",marginBottom:8}}>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_57A2F1A20C2C95E0BCAA} alt="H (Z=1)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>H (Z=1)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 1</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_4173B9FA873C9BD11980} alt="He (Z=2)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>He (Z=2)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2</p></div>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:4,flexWrap:"wrap",marginBottom:8}}>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_522A4B75E8ABDC766004} alt="Li (Z=3)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Li (Z=3)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,1</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_447FA2AD77115F02C082} alt="Be (Z=4)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Be (Z=4)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,2</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_D4CBACCA45E39A7DA65C} alt="B (Z=5)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>B (Z=5)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,3</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_C03E6ED898E29A0D33E3} alt="C (Z=6)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>C (Z=6)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,4</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_053355CCC602901765B5} alt="N (Z=7)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>N (Z=7)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,5</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_63370F697B4EB8CC2EB7} alt="O (Z=8)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>O (Z=8)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,6</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_4E2C6E0246B8007D3C12} alt="F (Z=9)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>F (Z=9)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,7</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_394B900577CD3618DA34} alt="Ne (Z=10)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Ne (Z=10)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8</p></div>
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:4,flexWrap:"wrap"}}>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_0DB1EFECBFBB52CAD598} alt="Na (Z=11)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Na (Z=11)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,1</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_6240917FDAB461474B5A} alt="Mg (Z=12)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Mg (Z=12)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,2</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_AA67B8832DED3BC71035} alt="Al (Z=13)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Al (Z=13)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,3</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_6B97B8347A23C36CE882} alt="Si (Z=14)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Si (Z=14)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,4</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_A6B083C516668C11CF02} alt="P (Z=15)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>P (Z=15)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,5</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_3F8DD32A91DCE8D7F4AE} alt="S (Z=16)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>S (Z=16)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,6</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_75BDB85BD91E0E278EDC} alt="Cl (Z=17)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Cl (Z=17)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,7</p></div>
        <div style={{textAlign:"center",padding:"0 4px"}}><img src={CONTENT_IMAGES.CONTENT_IMAGE_0BD4B81B5AEB1E91846A} alt="Ar (Z=18)" style={{maxHeight:72,width:"auto",display:"block",margin:"0 auto"}} /><p style={{fontSize:10.5,marginTop:3,color:"#333",fontWeight:600}}>Ar (Z=18)</p><p style={{fontSize:9.5,color:"#666",marginTop:0}}>E.C. = 2,8,8</p></div>
      </div>
    </div>
  </ActivityBox>,

  // ── 2.11 Valence Electrons and Valency ──
  <SecHd key="sec-s211" id="s211" label="2.11" title="Valence Electrons and Valency" />,
  <SubHd key="sub-s2111" id="s2111" label="2.11.1" title="Valence Electrons" />,
  <p key="b3-p17" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In any chemical reaction, the electrons present in the outermost shell of the atom take part in the reaction. This is because the electrons present in the outermost shell are farthest from the nucleus. Hence, the force of attraction on these electrons by the nucleus is minimum (remembering that electrons are negatively charged whereas nucleus is positively charged).
  </p>,
  <DefBox key="def-valence">
    <em>The electrons present in the outermost shell of the atom of an element are called <strong>valence electrons.</strong> The outermost shell is called the <strong>valence shell.</strong></em>
  </DefBox>,
  <p key="b3-p18" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    These are called valence electrons because they decide the valency of the element (as discussed later). For the same reason, outermost shell is called the valence shell.
  </p>,
  <p key="b3-p19" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>A few examples are given below :</p>,
  <p key="b3-p20" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) Hydrogen (Z = 1) has one electron in the K-shell. This is the only shell containing the electron. Hence, K-shell is the valence shell and number of valence electrons = 1.
  </p>,
  <div key="b3-p21" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>ii</em>) Carbon (Z = 6) has the electronic configuration <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>4</td></tr></tbody></table>. Thus, L-shell is the outermost shell or the valence shell. The number of electrons present in this shell (<em>i.e.,</em> valence electrons) = 4.
  </div>,
  <div key="b3-p22" style={{ textAlign: "justify", marginBottom: 6 }}>
    (<em>iii</em>) Sodium (Z = 11) has the electronic configuration <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>1</td></tr></tbody></table>. Thus, the outermost shell M is the valence shell and number of valence electrons = 1.
  </div>,
  <div key="b3-p23" style={{ textAlign: "justify", marginBottom: 12 }}>
    (<em>iv</em>) Chlorine (Z = 17) has the electronic configuration <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>7</td></tr></tbody></table>. Hence, the outermost shell M is the valence shell and number of valence electrons = 7.
  </div>,

  <SubHd key="sub-s2112" id="s2112" label="2.11.2" title="Valency" />,
  <p key="b3-p24" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The concept of valency arises from the study of noble gases. Noble gases are stable, <em>i.e.,</em> chemically inert and have 8 electrons in the valence shell, called <strong>octet</strong> (except helium which has 2 electrons in the valence shell called <strong>duplet</strong>). Look at the electronic configuration of He, Ne and Ar in Table 2.2. All other elements have less than 8 electrons in the valence shell (as shown in Table 2.2). Hence, to attain stability, atoms of these elements lose, gain or share electrons with other atoms so as to complete their octet (<em>i.e.,</em> 8 electrons in the outermost shell).
  </p>,
  <DefBox key="def-valency">
    <em>The number of electrons gained, lost or shared by the atom of an element so as to complete its octet (or duplet in case of elements having only K shell) is called the <strong>valency</strong> of the element.</em>
  </DefBox>,

  <SubHd key="sub-s2113" id="s2113" label="2.11.3" title="Calculation of Valency" />,
  <p key="b3-p25" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    To calculate the valency of an element, the electronic configuration of the element is first written. Then the valency of the element is calculated as follows :
  </p>,
  <p key="b3-p26" style={{ textAlign: "justify", marginBottom: 7 }}>
    (<em>i</em>) <strong>For elements having valence electrons 1, 2 or 3, valency is equal to the number of valence electrons.</strong> For example, from electronic configurations given in Table 2.2, we observe that Li, Na, K have one valence electron, each of them has a valency of 1. Mg and Ca have 2 valence electrons, their valency is 2. Aluminium has 3 valence electrons, its valency is 3. The only exception is helium which has two valence electrons but it is a noble gas. Hence, its valency is zero.
  </p>,
  <p key="b3-p27" style={{ textAlign: "justify", marginBottom: 4 }}>
    (<em>ii</em>) <strong>For elements having valence electrons 4, 5, 6 or 7, valency is equal to the number of electrons to be added so that the valence shell has 8 electrons.</strong> In other words,
  </p>,
  <MathBlock key="b3-valency-formula"><strong>Valency = 8 – Number of valence electrons.</strong></MathBlock>,
  <p key="b3-p28" style={{ marginBottom: 4 }}>For example,</p>,
  <p key="b3-p29" style={{ textAlign: "justify", marginBottom: 5 }}>
    (<em>a</em>) Fluorine (Z = 9, E.C. = 2, 7) and chlorine (Z = 17, E.C. = 2, 8, 7) have 7 valence electrons. Hence, their valency = 8 – 7 = 1.
  </p>,
  <p key="b3-p30" style={{ textAlign: "justify", marginBottom: 5 }}>
    (<em>b</em>) Oxygen (Z = 8, E.C. = 2, 6) and sulphur (Z = 16, E.C. = 2, 8, 6) have 6 valence electrons. Their valency = 8 – 6 = 2.
  </p>,
  <p key="b3-p31" style={{ textAlign: "justify", marginBottom: 5 }}>
    (<em>c</em>) Nitrogen (Z = 7, E.C. = 2, 5) and phosphorus (Z = 15, E.C. = 2, 8, 5) have 5 valence electrons, their valency = 8 – 5 = 3.
  </p>,
  <p key="b3-p32" style={{ textAlign: "justify", marginBottom: 5 }}>
    (<em>d</em>) Carbon (Z = 6, E.C. = 2, 4) and silicon (Z = 14, E.C. = 2, 8, 4) have 4 valence electrons, their valency = 8 – 4 = 4.
  </p>,
  <p key="b3-p33" style={{ textAlign: "justify", marginBottom: 10 }}>
    (<em>iii</em>) <strong>For noble gases, valency is zero.</strong> This is because they are chemically inert, <em>i.e.,</em> they do not take part in the reaction. Otherwise too, noble gases have 8 valence electrons, their valency = 8 – 8 = 0.
  </p>,
  <KBBox key="kb-valency" title="NOTE">
    <p style={{ marginBottom: 6 }}>1. Atoms of noble gas (He, Ne, Ar etc.) have complete octets (or duplet in case of helium), therefore, they are stable and do not combine with each other or with any other element. Hence, they exist as free atoms, <em>i.e.,</em> as single atoms. In other words, they are monoatomic molecules.</p>
    <p style={{ marginBottom: 6 }}>2. Duplet (2 electrons in the outermost shell) is considered as a stable arrangement only when the atom has K-shell only and no other shells containing electrons are present.</p>
    <p style={{ marginBottom: 6 }}>3. <strong>Types of valency.</strong> There are two types of valency called 'electrovalency' and 'covalency'. Examples of electrovalency are discussed in sec. 2.11.5.</p>
    <p>4. <strong>Variable valency.</strong> Some elements show more than one valency, called <em>variable valency,</em> as the valency may be equal to the number of electrons in the valence shell or 8 – Number of valence electrons. For example, phosphorus (Z = 15) has the electronic configuration 2, 8, 5. It shows a valency of 5 as well as 8 – 5 = 3.</p>
  </KBBox>,

  <SubHd key="sub-s2114" id="s2114" label="2.11.4" title="Valencies of the First 20 Elements" />,
  <p key="b3-p34" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Knowing the distribution of electrons as given in Table 2.2 and applying the above method, the valencies of first 20 elements are given below :
  </p>,
  <div key="b3-valency-table" style={{ overflowX: "auto", margin: "12px 0 16px" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "5px 8px", fontWeight: 700, background: "#f9eef4" }}>Element</td>
          {[["₁H","1"],["₂He","2"],["₃Li","3"],["₄Be","4"],["₅B","5"],["₆C","6"],["₇N","7"],["₈O","8"],["₉F","9"],["₁₀Ne","10"]]
            .map(([e,z]) => <td key={z} style={{ border: "1px solid #aaa", padding: "5px 8px", textAlign: "center" }}>{e}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "5px 8px", fontWeight: 700, background: "#f9eef4" }}>Distribution</td>
          {["1","2","2, 1","2, 2","2, 3","2, 4","2, 5","2, 6","2, 7","2, 8"]
            .map((e,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", textAlign: "center", fontSize: 12 }}>{e}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "5px 8px", fontWeight: 700, background: "#f9eef4" }}>Valency</td>
          {["1","0","1","2","3","4","8–5=3","8–6=2","8–7=1","8–8=0"]
            .map((e,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", textAlign: "center", fontSize: 12 }}>{e}</td>)}
        </tr>
      </tbody>
    </table>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, marginTop: 6 }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "5px 8px", fontWeight: 700, background: "#f9eef4" }}>Element</td>
          {[["₁₁Na"],["₁₂Mg"],["₁₃Al"],["₁₄Si"],["₁₅P"],["₁₆S"],["₁₇Cl"],["₁₈Ar"],["₁₉K"],["₂₀Ca"]]
            .map(([e],i) => <td key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", textAlign: "center" }}>{e}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "5px 8px", fontWeight: 700, background: "#f9eef4" }}>Distribution</td>
          {["2,8,1","2,8,2","2,8,3","2,8,4","2,8,5","2,8,6","2,8,7","2,8,8","2,8,8,1","2,8,8,2"]
            .map((e,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", textAlign: "center", fontSize: 12 }}>{e}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "5px 8px", fontWeight: 700, background: "#f9eef4" }}>Valency</td>
          {["1","2","3","4","5, 8–5=3","8–6=2","8–7=1","8–8=0","1","2"]
            .map((e,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", textAlign: "center", fontSize: 12 }}>{e}</td>)}
        </tr>
      </tbody>
    </table>
  </div>,

  <SubHd key="sub-s2115" id="s2115" label="2.11.5" title="Formation of Ions and Calculation of their Number of Electrons, Protons, Neutrons and Valency" />,
  <p key="b3-p35" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As already explained, except noble gases, all other elements have less than 8 electrons in their outermost shell. These elements try to complete their octet by gaining or losing electrons. As a result, the number of electrons is no longer equal to the number of protons. The new species thus formed will, therefore, carry charge. <em>Such species carrying charge are called <strong>ions.</strong> The charge on the ion is equal to the number of electrons lost or gained by the atom and represents the <strong>valency</strong> of the element.</em> We have two types of ions as explained below :
  </p>,
  <p key="b3-p36" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Positive ions (Cations).</strong> When an atom loses electrons, the number of electrons becomes less than the number of protons. As a result, the new species formed carries positive charge. Such positively charged species are called positive ions or cations. A few examples are given below :
  </p>,
  <div key="b3-p37" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) Atomic number of sodium (Na) is 11. Hence, it has 11 protons and 11 electrons. The distribution of electrons is <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>1</td></tr></tbody></table>. It easily loses one electron to complete its octet. The new species formed will have 10 electrons but number of protons remains the same (<em>i.e.,</em> 11). Hence, the species formed will have one unit positive charge. It is represented by Na<Sup c="+" /> and is called sodium ion. We say that the valency of sodium is one.
  </div>,
  <p key="b3-p38" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    (<em>ii</em>) Atomic number of magnesium (Mg) is 12. Hence, it has 12 protons and 12 electrons. The distribution of electrons is 2, 8, 2. It loses 2 electrons to complete its octet. The new species formed will have 10 electrons and 12 protons. Hence, the ion formed will have two units positive charge. We represent it as Mg<Sup c="2+" />, <em>i.e.,</em> its valency is 2.
  </p>,
  <p key="b3-p39" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. Negative ions (Anions).</strong> When an atom gains electrons, the number of electrons becomes greater than the number of protons. As a result, the new species formed carries negative charge. Such negatively charged species are called negative ions or anions. A few examples are given below :
  </p>,
  <div key="b3-p40" style={{ textIndent: 28, textAlign: "justify", marginBottom: 6 }}>
    (<em>i</em>) Atomic number of chlorine is 17. Hence, it has 17 protons and 17 electrons. The distribution of electrons is <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>7</td></tr></tbody></table>. It easily gains one electron to complete its octet. The new species formed will have 18 electrons but number of protons remains the same (<em>i.e.,</em> 17). Hence, the species formed will have one unit negative charge. It is represented by Cl<Sup c="–" /> and is called <strong>chloride ion.</strong> We say that the valency of chlorine is one.
  </div>,
  <p key="b3-p41" style={{ textIndent: 28, textAlign: "justify", marginBottom: 10 }}>
    (<em>ii</em>) Atomic number of oxygen is 8. Hence, it has 8 protons and 8 electrons. The distribution of electrons is 2, 6. It gains two electrons to complete its octet. The new species formed will have 10 electrons and 8 protons. Hence, the ion formed will have two units negative charge. We represent it as O<Sup c="2–" /> and call it <strong>oxide ion.</strong> Its valency is 2.
  </p>,
  <KBBox key="kb-ions" title="NOTE">
    <p style={{ marginBottom: 6 }}>1. When a cation or anion is formed from the neutral atom, only the number of electrons changes. There is no change in the number of protons and mass number. As number of neutrons is equal to mass number minus the number of protons, the number of neutrons remains the same as that in the neutral atom.</p>
    <p style={{ marginBottom: 8 }}>2. Positive and negative ions are formed by loss and gain of electrons. Hence, the valencies of these ions as calculated above are 'electrovalencies'. In case of formation of H<Sub c="2" />, Cl<Sub c="2" />, O<Sub c="2" /> and N<Sub c="2" /> molecules, the octet of each atom (or duplet in case of hydrogen) is completed by mutual sharing of electrons as follows : (valence electrons of one atom are represented by dots while that of the other by crosses).</p>
    <p style={{ fontStyle: "italic", marginBottom: 10 }}>The number of electrons contributed by the atom for sharing so as to complete its octet (or duplet in case of hydrogen) is called its <strong style={{ color: "#c0126a" }}>covalency.</strong> This will be discussed in more details in chapter 3.</p>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 14, flexWrap: "wrap", marginBottom: 10 }}>
      <div style={{ textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_A84236544F0C87E605F8} alt="H₂ bonding" style={{ maxHeight: 90, width: "auto" }} /></div>
      <div style={{ textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_82AF117FD420C05A9B17} alt="Cl₂ bonding" style={{ maxHeight: 90, width: "auto" }} /></div>
      <div style={{ textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_29E9E304E890A93649E7} alt="O₂ bonding" style={{ maxHeight: 90, width: "auto" }} /></div>
      <div style={{ textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_3A55E8B42323C2BAD57C} alt="N₂ bonding" style={{ maxHeight: 90, width: "auto" }} /></div>
      <div style={{ textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_310CE0A3D18AF15B14EF} alt="CH₄ bonding" style={{ maxHeight: 110, width: "auto" }} /></div>
    </div>
        <p style={{ marginBottom: 4, fontSize: 13 }}>For example, hydrogen and chlorine contribute one electron each, their covalency is one. Oxygen atom contributes 2 electrons for mutual sharing, its covalency is two. For similar reasons, covalency of nitrogen is 3. Similarly, in case of methane (CH<Sub c="4" />), carbon shares its all the 4 valence electrons with 4 H atoms to complete its octet. Hence, covalency of carbon is 4.</p>
  </KBBox>,

  <NumericalSection key="num-valency" topic="VALENCY OF ELEMENTS AND STRUCTURE OF IONS">
    <p><strong>Example 1.</strong> Atomic number of sodium is 11 and mass number is 23. What type of ion will be formed by it and how will you represent it ? Calculate the number of electrons, protons and neutrons in the ion formed. What will be the valency of sodium ?</p>
    <div><strong>Solution.</strong> Atomic number of Na = 11 &nbsp;&nbsp; Electronic configuration of Na atom = <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>1</td></tr></tbody></table> or 2, 8, 1</div>
    <p>It can easily lose one electron to complete its octet. Hence, it forms positive ion with the symbol Na<Sup c="+" />.</p>
    <p>Number of electrons in Na<Sup c="+" /> = 11 – 1 = <strong>10</strong> &nbsp;&nbsp;&nbsp; Number of protons = Atomic number = <strong>11</strong></p>
    <p>Number of neutrons = Mass number – Atomic number = 23 – 11 = <strong>12</strong></p>
    <p>As the element loses one electron to form Na<Sup c="+" /> ion, valency of the element = <strong>1.</strong></p>
    <br/>
    <p><strong>Example 2.</strong> Atomic number of aluminium is 13 and mass number is 27. Calculate number of electrons, protons and neutrons in the ion formed. Represent the ion. What will be its valency ?</p>
    <div><strong>Solution.</strong> Atomic number of Al = 13 &nbsp;&nbsp; Electronic configuration of Al = <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>3</td></tr></tbody></table> or 2, 8, 3</div>
    <p>It loses 3 electrons to complete its octet. Hence, the ion formed will be Al<Sup c="3+" />.</p>
    <p>Number of electrons in Al<Sup c="3+" /> = 13 – 3 = <strong>10</strong> &nbsp;&nbsp;&nbsp; Number of protons = Atomic number = <strong>13</strong></p>
    <p>Number of neutrons = Mass number – Atomic number = 27 – 13 = <strong>14</strong></p>
    <p>As Al atom loses 3 electrons to complete its octet and form Al<Sup c="3+" /> ion, its valency = <strong>3.</strong></p>
    <br/>
    <p><strong>Example 3.</strong> Atomic number of fluorine is 9 and mass number is 19. Calculate the number of electrons, protons and neutrons in the neutral atom and in the ion formed by it. Represent the ion and give its electronic configuration.</p>
    <p><strong>Solution.</strong> Neutral atom : Number of electrons = Number of protons = Atomic number = <strong>9</strong></p>
    <p>Number of neutrons = Mass number – Atomic number = 19 – 9 = <strong>10</strong></p>
    <div>Atomic number of fluorine = 9, Electronic configuration of F atom = <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>7</td></tr></tbody></table> or 2, 7</div>
    <p>It can easily gain one electron to complete its octet. Hence, the ion formed will be F<Sup c="–" />.</p>
    <div>Electronic configuration of F<Sup c="–" /> ion = <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td></tr></tbody></table> or 2, 8 &nbsp;&nbsp;&nbsp; Number of electrons in F<Sup c="–" /> ion = 9 + 1 = <strong>10</strong></div>
    <p>Number of protons = Atomic number = <strong>9</strong> &nbsp;&nbsp;&nbsp; Number of neutrons = 19 – 9 = <strong>10.</strong></p>
    <br/>
    <p><strong>Example 4.</strong> An element has atomic number 15. What will be the valency/valencies shown by it ?</p>
    <div><strong>Solution.</strong> Atomic number = 15 → 15 electrons. Electronic configuration = <table style={{display:"inline-table",borderCollapse:"collapse",verticalAlign:"middle",fontSize:"0.92em",margin:"0 4px"}}><thead><tr><th style={{padding:"1px 12px",fontWeight:600}}>K</th><th style={{padding:"1px 12px",fontWeight:600}}>L</th><th style={{padding:"1px 12px",fontWeight:600}}>M</th></tr></thead><tbody><tr><td style={{padding:"1px 12px",textAlign:"center"}}>2</td><td style={{padding:"1px 12px",textAlign:"center"}}>8</td><td style={{padding:"1px 12px",textAlign:"center"}}>5</td></tr></tbody></table> or 2, 8, 5.</div>
    <p>Valency = 5 and 8 – 5 = <strong>3</strong> (The element is phosphorus which forms PCl<Sub c="3" /> and PCl<Sub c="5" />).</p>
    <br/>
    <p><strong>Example 5.</strong> An ion M<Sup c="3+" /> contains 10 electrons and 14 neutrons. What are the atomic number and mass number of the element M ? Name the element.</p>
    <p><strong>Solution.</strong> Number of electrons in M<Sup c="3+" /> = 10. M<Sup c="3+" /> is formed by loss of 3 electrons.</p>
    <p>Number of electrons in neutral atom = 10 + 3 = <strong>13</strong> = Atomic number = <strong>13</strong></p>
    <p>Mass number = No. of protons + No. of neutrons = 13 + 14 = <strong>27</strong></p>
    <p>The element with atomic number 13 is <strong>Aluminium.</strong></p>
    <br/>
    <p><strong>Example 6.</strong> An ion X<Sup c="2–" /> contains 10 electrons and 8 neutrons. What are the atomic number and mass number of the element X ? Name the element.</p>
    <p><strong>Solution.</strong> Number of electrons in X<Sup c="2–" /> = 10. X<Sup c="2–" /> is formed by gain of 2 electrons.</p>
    <p>Number of electrons in neutral atom = 10 – 2 = <strong>8</strong> = Atomic number = <strong>8</strong></p>
    <p>Mass number = No. of protons + No. of neutrons = 8 + 8 = <strong>16</strong></p>
    <p>The element with atomic number 8 is <strong>oxygen.</strong></p>
  </NumericalSection>,
];

// ── CONTENT BATCH 4 ──────────────────────────────────────────

const content_b4 = [
  // ── 2.12 Isotopes ──
  <SecHd key="sec-s212" id="s212" label="2.12" title="Isotopes" />,
  <SubHd key="sub-s2121" id="s2121" label="2.12.1" title="Definition and Examples" />,
  <p key="b4-p1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In nature, in a number of cases, atoms of the same element are found which have same atomic number but different mass number. Such atoms are called isotopes.
  </p>,
  <DefBox key="def-isotopes">
    <em><strong>Isotopes</strong> are the atoms of the same element which have same atomic number but different mass numbers.</em>
  </DefBox>,
  <p key="b4-p2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As atomic number of the element is equal to number of protons in the nucleus or number of electrons in the extranuclear part, this implies that they contain the same number of protons as well as electrons. As mass number is the sum of protons and neutrons but protons in them are equal, the difference in mass number implies that they contain different number of neutrons. Thus, we conclude that <em>isotopes of an element differ only in the number of neutrons present in the nucleus.</em> A few examples are given below :
  </p>,
  <p key="b4-p3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Isotopes of Hydrogen.</strong> There are three isotopes of hydrogen represented as <Sup c="1" /><sub style={{ fontSize: "0.72em" }}>1</sub>H, <Sup c="2" /><sub style={{ fontSize: "0.72em" }}>1</sub>H and <Sup c="3" /><sub style={{ fontSize: "0.72em" }}>1</sub>H. These are called <strong>protium, deuterium</strong> (heavy hydrogen) and <strong>tritium</strong> (radioactive) respectively. As each of them has atomic number 1, each of them contains 1 proton in the nucleus (and 1 electron in the extranuclear part). However, as number of neutrons = Mass number – Atomic number, they differ in the number of neutrons. Protium has 1 – 1 = 0, <em>i.e.,</em> no neutron, deuterium has 2 – 1 = 1 neutron while tritium has 3 – 1 = 2 neutrons in the nucleus.
  </p>,
  <Fig key="fig-2-27" src={CONTENT_IMAGES.CONTENT_IMAGE_D61464BA6E1EDA7C35B0} caption="Isotopes of Hydrogen: Protium (ordinary hydrogen), Deuterium (heavy hydrogen), Tritium (radioactive isotope)" />,
  <p key="b4-p4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. Isotopes of Carbon.</strong> Carbon has mainly two isotopes represented as <Sup c="12" /><sub style={{ fontSize: "0.72em" }}>6</sub>C and <Sup c="14" /><sub style={{ fontSize: "0.72em" }}>6</sub>C. Both have same atomic number, <em>i.e.,</em> 6 but different mass numbers, <em>i.e.,</em> 12 and 14. The isotope <Sup c="12" /><sub style={{ fontSize: "0.72em" }}>6</sub>C has 6 protons and 12 – 6 = 6 neutrons in the nucleus while <Sup c="14" /><sub style={{ fontSize: "0.72em" }}>6</sub>C has 6 protons and 14 – 6 = 8 neutrons in the nucleus. Both have the same number of electrons, <em>i.e.,</em> 6 in the extranuclear part.
  </p>,
  <p key="b4-p5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The distribution of 6 electrons is same in each case, <em>i.e.,</em> 2, 4.
  </p>,
  <Fig key="fig-2-28" src={CONTENT_IMAGES.CONTENT_IMAGE_23825D09EE886F362BF5} caption="Isotopes of Carbon: C-12 and C-14 showing nuclear composition" />,
  <p key="b4-p6" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>3. Isotopes of Oxygen.</strong> There are three isotopes of oxygen as follows :
  </p>,
  <div key="b4-oxygen-table" style={{ overflowX: "auto", margin: "10px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          {["Isotope","Atomic No.","Mass No.","No. of protons","No. of neutrons","No. of electrons"]
            .map((h,i) => <th key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="16" /><sub style={{ fontSize: "0.72em" }}>8</sub>O</td>
          {[8,16,8,"16–8=8",8].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="17" /><sub style={{ fontSize: "0.72em" }}>8</sub>O</td>
          {[8,17,8,"17–8=9",8].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="18" /><sub style={{ fontSize: "0.72em" }}>8</sub>O</td>
          {[8,18,8,"18–8=10",8].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>,
  <p key="b4-p7" style={{ textIndent: 28, marginBottom: 6 }}>
    These may be represented as follows :
  </p>,
  <div key="b4-oxygen-diagrams" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "10px 0 6px", flexWrap: "wrap" }}>
    {/* O-16 */}
    <div style={{ textAlign: "center" }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="48" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="55" cy="55" r="30" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="55" cy="55" r="14" fill="#f9d0e6" stroke="#c0126a" strokeWidth="1.5"/>
        <text x="47" y="53" fontSize="8.5" fontWeight="700" fill="#c0126a">8 p</text>
        <text x="47" y="64" fontSize="8.5" fontWeight="700" fill="#c0126a">8 n</text>
        {/* K shell: 2 electrons */}
        <circle cx="55" cy="25" r="3" fill="#333"/>
        <circle cx="55" cy="85" r="3" fill="#333"/>
        {/* L shell: 6 electrons */}
        <circle cx="55" cy="7" r="3" fill="#333"/>
        <circle cx="103" cy="55" r="3" fill="#333"/>
        <circle cx="7" cy="55" r="3" fill="#333"/>
        <circle cx="84" cy="22" r="3" fill="#333"/>
        <circle cx="26" cy="22" r="3" fill="#333"/>
        <circle cx="84" cy="88" r="3" fill="#333"/>
      </svg>
      <div style={{ fontSize: 11 }}>O–16 (<sup style={{fontSize:"0.75em"}}>16</sup><sub style={{fontSize:"0.75em"}}>8</sub>O)</div>
    </div>
    {/* O-17 */}
    <div style={{ textAlign: "center" }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="48" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="55" cy="55" r="30" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="55" cy="55" r="14" fill="#f9d0e6" stroke="#c0126a" strokeWidth="1.5"/>
        <text x="47" y="53" fontSize="8.5" fontWeight="700" fill="#c0126a">8 p</text>
        <text x="47" y="64" fontSize="8.5" fontWeight="700" fill="#c0126a">9 n</text>
        <circle cx="55" cy="25" r="3" fill="#333"/>
        <circle cx="55" cy="85" r="3" fill="#333"/>
        <circle cx="55" cy="7" r="3" fill="#333"/>
        <circle cx="103" cy="55" r="3" fill="#333"/>
        <circle cx="7" cy="55" r="3" fill="#333"/>
        <circle cx="84" cy="22" r="3" fill="#333"/>
        <circle cx="26" cy="22" r="3" fill="#333"/>
        <circle cx="84" cy="88" r="3" fill="#333"/>
      </svg>
      <div style={{ fontSize: 11 }}>O–17 (<sup style={{fontSize:"0.75em"}}>17</sup><sub style={{fontSize:"0.75em"}}>8</sub>O)</div>
    </div>
    {/* O-18 */}
    <div style={{ textAlign: "center" }}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="48" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="55" cy="55" r="30" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="55" cy="55" r="14" fill="#f9d0e6" stroke="#c0126a" strokeWidth="1.5"/>
        <text x="45" y="53" fontSize="8.5" fontWeight="700" fill="#c0126a">8 p</text>
        <text x="44" y="64" fontSize="8.5" fontWeight="700" fill="#c0126a">10 n</text>
        <circle cx="55" cy="25" r="3" fill="#333"/>
        <circle cx="55" cy="85" r="3" fill="#333"/>
        <circle cx="55" cy="7" r="3" fill="#333"/>
        <circle cx="103" cy="55" r="3" fill="#333"/>
        <circle cx="7" cy="55" r="3" fill="#333"/>
        <circle cx="84" cy="22" r="3" fill="#333"/>
        <circle cx="26" cy="22" r="3" fill="#333"/>
        <circle cx="84" cy="88" r="3" fill="#333"/>
      </svg>
      <div style={{ fontSize: 11 }}>O–18 (<sup style={{fontSize:"0.75em"}}>18</sup><sub style={{fontSize:"0.75em"}}>8</sub>O)</div>
    </div>
  </div>,
  <p key="b4-p7b" style={{ textIndent: 28, marginBottom: 8 }}>
    The distribution of 8 electrons is same in each case, <em>i.e.,</em> 2, 6.
  </p>,
  <p key="b4-p8" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>4. Isotopes of Chlorine.</strong> There are two isotopes of chlorine as follows :
  </p>,
  <div key="b4-chlorine-table" style={{ overflowX: "auto", margin: "10px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          {["Isotope","Atomic No.","Mass No.","No. of protons","No. of neutrons","No. of electrons"]
            .map((h,i) => <th key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="35" /><sub style={{ fontSize: "0.72em" }}>17</sub>Cl</td>
          {[17,35,17,"35–17=18",17].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="37" /><sub style={{ fontSize: "0.72em" }}>17</sub>Cl</td>
          {[17,37,17,"37–17=20",17].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>,
  <p key="b4-p9" style={{ textIndent: 28, marginBottom: 6 }}>
    These may be represented as follows :
  </p>,
  <div key="b4-chlorine-diagrams" style={{ display: "flex", justifyContent: "center", gap: 40, margin: "10px 0 6px", flexWrap: "wrap" }}>
    {/* Cl-35 */}
    <div style={{ textAlign: "center" }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r="58" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="65" cy="65" r="40" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="65" cy="65" r="22" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="65" cy="65" r="11" fill="#f9d0e6" stroke="#c0126a" strokeWidth="1.5"/>
        <text x="55" y="63" fontSize="8" fontWeight="700" fill="#c0126a">17 p</text>
        <text x="55" y="74" fontSize="8" fontWeight="700" fill="#c0126a">18 n</text>
        {/* K shell: 2 electrons */}
        <circle cx="65" cy="43" r="3" fill="#333"/>
        <circle cx="65" cy="87" r="3" fill="#333"/>
        {/* L shell: 8 electrons */}
        <circle cx="65" cy="25" r="3" fill="#333"/>
        <circle cx="90" cy="33" r="3" fill="#333"/>
        <circle cx="105" cy="55" r="3" fill="#333"/>
        <circle cx="105" cy="75" r="3" fill="#333"/>
        <circle cx="90" cy="97" r="3" fill="#333"/>
        <circle cx="40" cy="33" r="3" fill="#333"/>
        <circle cx="25" cy="55" r="3" fill="#333"/>
        <circle cx="25" cy="75" r="3" fill="#333"/>
        {/* M shell: 7 electrons */}
        <circle cx="65" cy="7" r="3" fill="#333"/>
        <circle cx="102" cy="18" r="3" fill="#333"/>
        <circle cx="123" cy="50" r="3" fill="#333"/>
        <circle cx="114" cy="95" r="3" fill="#333"/>
        <circle cx="28" cy="18" r="3" fill="#333"/>
        <circle cx="7" cy="50" r="3" fill="#333"/>
        <circle cx="16" cy="95" r="3" fill="#333"/>
      </svg>
      <div style={{ fontSize: 11 }}>Cl–35 (<sup style={{fontSize:"0.75em"}}>35</sup><sub style={{fontSize:"0.75em"}}>17</sub>Cl)</div>
    </div>
    {/* Cl-37 */}
    <div style={{ textAlign: "center" }}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r="58" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="65" cy="65" r="40" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="65" cy="65" r="22" fill="none" stroke="#555" strokeWidth="1.2"/>
        <circle cx="65" cy="65" r="11" fill="#f9d0e6" stroke="#c0126a" strokeWidth="1.5"/>
        <text x="55" y="63" fontSize="8" fontWeight="700" fill="#c0126a">17 p</text>
        <text x="55" y="74" fontSize="8" fontWeight="700" fill="#c0126a">20 n</text>
        {/* K shell: 2 electrons */}
        <circle cx="65" cy="43" r="3" fill="#333"/>
        <circle cx="65" cy="87" r="3" fill="#333"/>
        {/* L shell: 8 electrons */}
        <circle cx="65" cy="25" r="3" fill="#333"/>
        <circle cx="90" cy="33" r="3" fill="#333"/>
        <circle cx="105" cy="55" r="3" fill="#333"/>
        <circle cx="105" cy="75" r="3" fill="#333"/>
        <circle cx="90" cy="97" r="3" fill="#333"/>
        <circle cx="40" cy="33" r="3" fill="#333"/>
        <circle cx="25" cy="55" r="3" fill="#333"/>
        <circle cx="25" cy="75" r="3" fill="#333"/>
        {/* M shell: 7 electrons */}
        <circle cx="65" cy="7" r="3" fill="#333"/>
        <circle cx="102" cy="18" r="3" fill="#333"/>
        <circle cx="123" cy="50" r="3" fill="#333"/>
        <circle cx="114" cy="95" r="3" fill="#333"/>
        <circle cx="28" cy="18" r="3" fill="#333"/>
        <circle cx="7" cy="50" r="3" fill="#333"/>
        <circle cx="16" cy="95" r="3" fill="#333"/>
      </svg>
      <div style={{ fontSize: 11 }}>Cl–37 (<sup style={{fontSize:"0.75em"}}>37</sup><sub style={{fontSize:"0.75em"}}>17</sub>Cl)</div>
    </div>
  </div>,
  <p key="b4-p9b" style={{ textIndent: 28, marginBottom: 12 }}>
    The distribution of 17 electrons is same in each case, <em>i.e.,</em> 2, 8, 7.
  </p>,

  <SubHd key="sub-s2122" id="s2122" label="2.12.2" title="General Characteristics of Isotopes" />,
  <p key="b4-p10" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>1. Same atomic number, Number of protons/Number of electrons.</strong> The isotopes of an element have same atomic number and hence have same number of protons in the nucleus and same number of electrons in the extranuclear part.
  </p>,
  <p key="b4-p11" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>2. Different mass numbers/Number of neutrons.</strong> The isotopes of an element have different mass numbers and hence differ in the number of neutrons present in the nucleus.
  </p>,
  <p key="b4-p12" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>3. Same chemical properties.</strong> Since isotopes of an element have same number of electrons, they have same electronic configuration and hence same number of valence electrons. Since chemical properties depend upon the number of valence electrons, therefore, they have same chemical properties.
  </p>,
  <p key="b4-p13" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>4. Different physical properties.</strong> Since the isotopes of an element have different masses, they have different physical properties like melting point, boiling point, density etc.
  </p>,
  <p key="b4-p14" style={{ textAlign: "justify", marginBottom: 12 }}>
    <strong>5. Different nuclear properties.</strong> Due to difference in the nuclear structure (<em>i.e.,</em> number of neutrons), they have different nuclear properties, <em>e.g.,</em> C-14 isotope is radioactive whereas C-12 isotope is non-radioactive. The radioactive isotopes are called <strong>radioisotopes.</strong>
  </p>,

  <SubHd key="sub-s2123" id="s2123" label="2.12.3" title="Reason for Fractional Atomic Masses and Calculation of Average Atomic Masses" />,
  <p key="b4-p15" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Atomic masses of a large number of elements are fractional and not whole numbers. For example, atomic mass of chlorine is 35·5 while that of copper is 63·5. <em>The reason for the fractional atomic masses is that for an element existing in different isotopes, i.e., atoms with different mass numbers, the atomic mass of the element is the average value which comes out to be fractional.</em> The calculation of average value of the atomic mass may be illustrated with the help of the following example :
  </p>,
  <p key="b4-p16" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    In nature, chlorine is found to exist in two isotopes with mass numbers 35 and 37 respectively. These are found in the ratio of 3 : 1, <em>i.e.,</em> 75% chlorine-35 and 25% chlorine-37 isotope. Hence,
  </p>,
  <MathBlock key="b4-avgmass">
    Average atomic mass = <Frac n={<>3 <Times /> 35 + 1 <Times /> 37</>} d={<>3 + 1</>} /> = 35·5 amu
  </MathBlock>,
  <MathBlock key="b4-avgmass2">
    or &nbsp;&nbsp; <Frac n={<>75 <Times /> 35 + 25 <Times /> 37</>} d={<>100</>} /> = 35·5 amu
  </MathBlock>,

  <SubHd key="sub-s2124" id="s2124" label="2.12.4" title="Applications of Isotopes" />,
  <p key="b4-p17" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As already explained, isotopes of an element have same atomic number and hence have same chemical properties. They differ in the number of neutrons in the nucleus. The isotope having larger number of neutrons is generally unstable. It emits α, β and γ-radiations spontaneously. Such isotopes are called <strong>radioisotopes.</strong> These radioisotopes possess some special properties which make them very useful in a number of fields. Some applications of the isotopes are given below :
  </p>,
  <p key="b4-p18" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>1. As nuclear fuel.</strong> In the nuclear reactor, an isotope of uranium (U-235) is used as a nuclear fuel.
  </p>,
  <p key="b4-p19" style={{ textAlign: "justify", marginBottom: 4 }}>
    <strong>2. In medical field.</strong> Some radioisotopes are widely used for treatment as well as diagnosis of fatal diseases like cancer, tumour etc. A few examples are given below :
  </p>,
  <p key="b4-p20" style={{ textAlign: "justify", marginLeft: 20, marginBottom: 5 }}>
    (<em>i</em>) Cobalt with mass number 60 (Cobalt-60 isotope) is used in the treatment of cancer. The high energy γ-rays emitted by Co-60 destroy the malignant cells of the cancer.
  </p>,
  <p key="b4-p21" style={{ marginLeft: 20, marginBottom: 5 }}>
    (<em>ii</em>) Phosphorus-32 isotope is used in the treatment of leukaemia (blood cancer).
  </p>,
  <p key="b4-p22" style={{ marginLeft: 20, marginBottom: 5 }}>
    (<em>iii</em>) Iodine-131 isotope is used in the diagnosis and treatment of thyroid disorders (<em>i.e.,</em> disease called goitre).
  </p>,
  <p key="b4-p23" style={{ textAlign: "justify", marginLeft: 20, marginBottom: 8 }}>
    (<em>iv</em>) Some radioisotopes are used as <strong>tracers</strong> to detect the presence of tumours, blood-clots etc. in the human body. This is based on the fact that if a radioisotope, called tracer, is injected into the body, it accumulates at the tumour, blood clot etc and emits larger amount of radiation. Hence, its exact position can be detected. For example, sodium-24 is used to detect the blood clot and arsenic-74 is used to detect the tumour.
  </p>,
  <p key="b4-p24" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    It is important to know that a very appropriate dose of the radiation has to be given to the patient as otherwise these radiations are very harmful to the human beings. It is for this reason that the radiologist, <em>i.e.,</em> person working with these radioisotopes has to take a number of precautions to protect himself from these radiations, <em>e.g.,</em> use of lead apron etc.
  </p>,
  <p key="b4-p25" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>3. In carbon dating.</strong> This is a technique of finding the age of fossils, <em>i.e.,</em> old samples of wood or dead animals. It is based on the presence carbon-14 radioisotope in the atmosphere.
  </p>,
  <p key="b4-p26" style={{ textAlign: "justify", marginBottom: 7 }}>
    <strong>4. In geological dating.</strong> This is a technique of finding the age of a rock or earth. This is generally based on finding the amount of lead present along with uranium in the sample of a rock or the earth.
  </p>,
  <p key="b4-p27" style={{ textAlign: "justify", marginBottom: 12 }}>
    <strong>5. In industry.</strong> For example, radioisotopes are used to detect the leakage in the underground oil pipes, gas pipes or water pipes. The solution of a radioisotope is allowed to flow through the pipe. At the point of leakage, a large amount of radiation will be emitted. Their presence can be detected with the help of an instrument called Geiger-Muller counter.
  </p>,

  // ── 2.13 Isobars ──
  <SecHd key="sec-s213" id="s213" label="2.13" title="Isobars" />,
  <p key="b4-p28" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Just as isotopes are atoms of the same element with same atomic number but different mass numbers, we also have atoms of different elements which have different atomic numbers but same mass number.
  </p>,
  <DefBox key="def-isobars">
    <em>Such atoms of different elements which have different atomic numbers but same mass number are called <strong>isobars.</strong></em>
  </DefBox>,
  <p key="b4-p29" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As they have different atomic number, they contain different number of protons as well as electrons. Further, as they have same mass number but different number of protons, number of neutrons present in them is also different.
  </p>,
  <p key="b4-p30" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Example.</strong> Atomic number of Argon is 18 while that of Calcium is 20. However, their atoms are known which have mass number 40. Thus, we may represent them as <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>18</sub>Ar, <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>20</sub>Ca. This constitutes a pair of isobars.
  </p>,
  <div key="b4-isobar-table" style={{ overflowX: "auto", margin: "10px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          {["Atom","Protons present","Electrons present","Neutrons present"]
            .map((h,i) => <th key={i} style={{ border: "1px solid #aaa", padding: "5px 8px", background: "#f9eef4", fontWeight: 700, textAlign: "center" }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="40" /><sub style={{ fontSize: "0.72em" }}>18</sub>Ar</td>
          {[18, 18, "40 – 18 = 22"].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
        <tr>
          <td style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}><Sup c="40" /><sub style={{ fontSize: "0.72em" }}>20</sub>Ca</td>
          {[20, 20, "40 – 20 = 20"].map((v,i) => <td key={i} style={{ border: "1px solid #aaa", padding: "4px 8px", textAlign: "center" }}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>,
  <p key="b4-p31" style={{ textAlign: "justify", marginBottom: 4 }}>
    <strong>Some Important Characteristics of Isobars</strong>
  </p>,
  <ol key="b4-isobar-chars" style={{ paddingLeft: 28, margin: "0 0 12px", fontSize: 14, lineHeight: 1.9 }}>
    <li>(1) They are atoms of different elements.</li>
    <li>(2) They have different atomic number.</li>
    <li>(3) They have same mass number.</li>
    <li>(4) They possess different physical and chemical properties.</li>
    <li>(5) They have different number of protons, electrons and neutrons.</li>
  </ol>,

  <NumericalSection key="num-isotopes-isobars" topic="ISOTOPES AND ISOBARS">
    <KBBox key="kb-isobar-principles" title="Some Basic Principles Used">
      <p style={{ marginBottom: 5 }}>(<em>i</em>) <strong>Isotopes</strong> are the atoms of the <strong>same element</strong> with same atomic number but different mass numbers. They contain the same number of protons and same number of electrons but have different number of neutrons.</p>
      <p>(<em>ii</em>) <strong>Isobars</strong> are atoms of <strong>different elements</strong> having different atomic numbers but same mass number. They contain different number of protons, electrons and neutrons.</p>
    </KBBox>
    <p><strong>Example 1.</strong> Which of the following pairs represent isotopes and which represent isobars ?</p>
    <p>(<em>i</em>) <Sup c="235" /><sub style={{ fontSize: "0.72em" }}>92</sub>U, <Sup c="238" /><sub style={{ fontSize: "0.72em" }}>92</sub>U &nbsp;&nbsp; (<em>ii</em>) <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>19</sub>K, <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>20</sub>Ca &nbsp;&nbsp; (<em>iii</em>) <Sup c="3" /><sub style={{ fontSize: "0.72em" }}>1</sub>H, <Sup c="3" /><sub style={{ fontSize: "0.72em" }}>2</sub>He &nbsp;&nbsp; (<em>iv</em>) <Sup c="16" /><sub style={{ fontSize: "0.72em" }}>8</sub>X, <Sup c="18" /><sub style={{ fontSize: "0.72em" }}>8</sub>X</p>
    <p>Calculate the difference in the number of neutrons in the isotopic pairs.</p>
    <p><strong>Solution.</strong> (<em>i</em>) <Sup c="235" /><sub style={{ fontSize: "0.72em" }}>92</sub>U and <Sup c="238" /><sub style={{ fontSize: "0.72em" }}>92</sub>U are <strong>isotopes</strong> because they have same atomic number, <em>i.e.,</em> 92 but different mass numbers, <em>i.e.,</em> 235 and 238.</p>
    <p>No. of neutrons in <Sup c="235" /><sub style={{ fontSize: "0.72em" }}>92</sub>U = A – Z = 235 – 92 = 143</p>
    <p>No. of neutrons in <Sup c="238" /><sub style={{ fontSize: "0.72em" }}>92</sub>U = A – Z = 238 – 92 = 146</p>
    <p>Difference in the number of neutrons = 146 – 143 = <strong>3</strong></p>
    <p>(<em>ii</em>) <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>19</sub>K, <Sup c="40" /><sub style={{ fontSize: "0.72em" }}>20</sub>Ca are <strong>isobars</strong> because they are atoms of different elements with different atomic numbers (19 and 20) but same mass number (40).</p>
    <p>(<em>iii</em>) <Sup c="3" /><sub style={{ fontSize: "0.72em" }}>1</sub>H, <Sup c="3" /><sub style={{ fontSize: "0.72em" }}>2</sub>He are <strong>isobars</strong> because they are atoms of different elements with different atomic numbers (1 and 2) but same mass number (3).</p>
    <p>(<em>iv</em>) <Sup c="16" /><sub style={{ fontSize: "0.72em" }}>8</sub>X and <Sup c="18" /><sub style={{ fontSize: "0.72em" }}>8</sub>X are <strong>isotopes</strong> because they have same atomic number, <em>i.e.,</em> 8 and different mass numbers, <em>i.e.,</em> 16 and 18.</p>
    <p>No. of neutrons in <Sup c="16" /><sub style={{ fontSize: "0.72em" }}>8</sub>X = 16 – 8 = 8 &nbsp;&nbsp; No. of neutrons in <Sup c="18" /><sub style={{ fontSize: "0.72em" }}>8</sub>X = 18 – 8 = 10</p>
    <p>Difference in the number of neutrons = 10 – 8 = <strong>2.</strong></p>
    <br/>
    <p><strong>Example 2.</strong> Number of protons, neutrons and electrons in four species A, B, X and Y are respectively 6, 6, 6; 7, 7, 7; 6, 8, 6 and 9, 10, 10. Give symbolic representation of each species and tell which of them are isotopes and which are isobars ?</p>
    <p><strong>Solution.</strong> (<em>i</em>) Species A: p = 6, n = 6, e = 6. Atomic no. = 6, mass no. = 12. → <Sup c="12" /><sub style={{ fontSize: "0.72em" }}>6</sub>C</p>
    <p>(<em>ii</em>) Species B: p = 7, n = 7, e = 7. Atomic no. = 7, mass no. = 14. → <Sup c="14" /><sub style={{ fontSize: "0.72em" }}>7</sub>N</p>
    <p>(<em>iii</em>) Species X: p = 6, n = 8, e = 6. Atomic no. = 6, mass no. = 14. → <Sup c="14" /><sub style={{ fontSize: "0.72em" }}>6</sub>C</p>
    <p>(<em>iv</em>) Species Y: p = 9, n = 10, e = 10. Atomic no. = 9, mass no. = 19. → <Sup c="19" /><sub style={{ fontSize: "0.72em" }}>9</sub>F. But as the given species has one electron more than the number of protons, it is a negative ion (F<Sup c="–" />).</p>
    <p>A (<Sup c="12" /><sub style={{ fontSize: "0.72em" }}>6</sub>C) and X (<Sup c="14" /><sub style={{ fontSize: "0.72em" }}>6</sub>C) have same atomic number but different mass numbers. Hence, <strong>A and X are isotopes</strong> of carbon.</p>
    <p>B (<Sup c="14" /><sub style={{ fontSize: "0.72em" }}>7</sub>N) and X (<Sup c="14" /><sub style={{ fontSize: "0.72em" }}>6</sub>C) have different atomic numbers but same mass number. Hence, <strong>B and X are isobars.</strong></p>
    <br/>
    <p><strong>Example 3.</strong> Two atoms have the following nuclear composition: Atom A — 17 protons, 18 neutrons; Atom B — 17 protons, 20 neutrons. What are their mass numbers ? What is the relation between the two species ? Which element do they represent ?</p>
    <p><strong>Solution.</strong> (<em>i</em>) Mass number of atom A = 17 + 18 = <strong>35</strong> &nbsp;&nbsp; Mass number of atom B = 17 + 20 = <strong>37.</strong></p>
    <p>(<em>ii</em>) Since atoms A and B have same number of protons (same atomic number) but different number of neutrons (different mass numbers), they represent <strong>isotopes.</strong></p>
    <p>(<em>iii</em>) Both A and B have 17 protons, <em>i.e.,</em> each of them has atomic number 17. Hence, they represent <strong>chlorine.</strong></p>
  </NumericalSection>,

  // ── Curiosity Questions ──
  <div key="b4-curiosity" style={{ border: "1.5px solid #c0126a", margin: "20px 0", padding: "14px 18px" }}>
    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800,
      color: P_COLOR, textAlign: "center", fontSize: 14, marginBottom: 10 }}>
      ■ CURIOSITY QUESTIONS ■
    </p>
    <p style={{ fontWeight: 700, marginBottom: 4 }}>Q. 1. Is it possible to completely understand everything that happens inside the atom ?</p>
    <p style={{ textAlign: "justify", marginBottom: 12 }}>
      <strong>Ans.</strong> No, it is not possible to understand everything that happens inside the atom. It is just like the fact that we cannot know everything at once about any physical quantity. To quote a simple example, if a person is walking, we cannot look at his face and also at his feet accurately at the same time. At one time, we can accurately see only one out of the two. Scientifically, when electron is moving around the nucleus, we cannot know both its exact position and exact velocity (or momentum) at the same time (a principle, called <em>Heisenberg's uncertainty principle,</em> which you will study in your higher classes). It is not a failure of science or microscope but it is a fundamental property of nature.
    </p>
    <p style={{ fontWeight: 700, marginBottom: 4 }}>Q. 2. Do atoms live for ever ?</p>
    <p style={{ textAlign: "justify", marginBottom: 6 }}>
      <strong>Ans.</strong> Some atoms might live for ever but most of them do not. Whether an atom lives for ever or not depends upon two things, namely, <strong>Radioactive decay</strong> and <strong>Proton decay.</strong>
    </p>
    <p style={{ textAlign: "justify", marginBottom: 6 }}>
      <strong>Unstable Atoms (Radioactive Atoms).</strong> Radioactive atoms like uranium and carbon-14 decay by themselves, <em>i.e.,</em> break apart into different elements. Hence, they do not live for ever.
    </p>
    <p style={{ textAlign: "justify" }}>
      <strong>Stable Atoms (Non-radioactive Atoms).</strong> Atoms of most of the elements which are non-radioactive are perfectly stable and do not break down into other elements by themselves. However, now scientists believe that even these stable atoms die through a process called <strong>"Proton Decay".</strong> However, it is believed that protons have a very long life span, of the order of 10<Sup c="34" /> years. Comparing with the life of universe, viz. 1·3 <Times /> 10<Sup c="10" /> years old, even if atoms die, they will live trillions of years more than the universe.
    </p>
  </div>,

  <KBBox key="kb-isotones">
    <KBHd>Isotones.</KBHd>
    <p style={{ marginBottom: 8 }}>Some atoms of different elements have different atomic numbers and different mass numbers but they have same number of neutrons. Such atoms are called <strong>isotones.</strong> For example, <Sup c="14" /><sub style={{ fontSize: "0.72em" }}>6</sub>C, <Sup c="15" /><sub style={{ fontSize: "0.72em" }}>7</sub>N, <Sup c="16" /><sub style={{ fontSize: "0.72em" }}>8</sub>O. Each of them has 8 neutrons (<em>n</em> = A – Z).</p>
    <KBHd>Isoelectronics.</KBHd>
    <p>The species (atoms or ions) containing the same number of electrons are called <strong>isoelectronic.</strong> For example, O<Sup c="2–" />, F<Sup c="–" />, Na<Sup c="+" />, Mg<Sup c="2+" />, Al<Sup c="3+" />, Ne. Each of them contains 10 electrons.</p>
  </KBBox>,

  // ── Activity 2.3 ──
  <ActivityBox key="act-2-3" num="2.3" sub="(To design and develop games that utilize atomic number, mass number and subatomic particles clues to accurately predict and identify elements)">
    <p style={{ marginBottom: 8 }}>Before we start playing the game, we must remember the following fundamental definitions and concepts :</p>
    <p style={{ marginBottom: 6 }}><strong>1. Protons (p<Sup c="+" />).</strong> This is equal to the Atomic number (Z). It is the "social security number" of the element which never changes for a particular element. Each proton carries a charge = + 1 unit and has mass = 1 amu (or 1 u).</p>
    <p style={{ marginBottom: 6 }}><strong>2. Neutrons (n<sup style={{ fontSize: "0.72em" }}>º</sup>).</strong> These contribute to the mass of the atom. Neutron has no charge but has mass = 1 amu (or 1 u).</p>
    <p style={{ marginBottom: 6 }}><strong>3. Electrons (e<Sup c="–" />).</strong> In a neutral atom, these are equal to the number of protons. If they differ, the element is an ion. If number of electrons is greater than the number of protons, the species is a negative ion. If number of electrons is less than the number of protons, the species is a positive ion.</p>
    <p style={{ marginBottom: 6 }}><strong>4. Mass Number (A).</strong> It is equal to the sum of protons and neutrons, <em>i.e.,</em> A = p<Sup c="+" /> + n<sup style={{ fontSize: "0.72em" }}>º</sup> = Z + n<sup style={{ fontSize: "0.72em" }}>º</sup>.</p>
    <p style={{ marginBottom: 10 }}><strong>5. Isotope.</strong> If mass number is different from normal mass number, it is an isotope.</p>
    <p style={{ marginBottom: 8 }}><strong>How to Start the Game ?</strong> Make a number of cards to write the clues by one student (called <strong>"mystery card"</strong>) and a number of other cards (called <strong>"Response cards"</strong>) to write the reply by different students. A few different possible cases are described below :</p>
    <p style={{ marginBottom: 4, color: P_COLOR, fontWeight: 700 }}>I. Clues Given.</p>
    <p style={{ marginBottom: 2 }}>Only atomic number or number of protons.</p>
    <p style={{ marginBottom: 8, color: P_COLOR, fontWeight: 700 }}>Action Required. To identify the element.</p>
    <p style={{ marginBottom: 4 }}><strong>Example 1.</strong> <em>You are given mystery card on which it is written that atomic number of the element is 6. You have to identify the element.</em></p>
    <p style={{ marginBottom: 8 }}><strong>Ans.</strong> As Z = 6, it is carbon.</p>
    <p style={{ marginBottom: 4 }}><strong>Example 2.</strong> <em>You are given a mystery card on which it is written that an element contains 12 protons. You have to identify the element.</em></p>
    <p style={{ marginBottom: 12 }}><strong>Ans.</strong> As p<Sup c="+" /> = 12. Hence, Z = 12. Therefore, the element is Magnesium.</p>
    <p style={{ marginBottom: 4, color: P_COLOR, fontWeight: 700 }}>II. Clues Given. Number of protons and neutrons.</p>
    <p style={{ marginBottom: 4 }}><strong>Example 1.</strong> <em>You are given a mystery card on which it is written that atom contains 17 protons and 18 neutrons. You have to identify the element and tell whether it is an isotope or not.</em></p>
    <p style={{ marginBottom: 8 }}><strong>Ans.</strong> As p<Sup c="+" /> = 17, Z = 17. The element is Chlorine (Cl). Mass number = 17 + 18 = 35. As atomic mass of Cl is 35·5 but here mass number is different, the given atom is an isotope of chlorine.</p>
    <p style={{ marginBottom: 4 }}><strong>Example 2.</strong> <em>You are given a mystery card on which it is written that the element contains 11 protons and 12 neutrons.</em></p>
    <p style={{ marginBottom: 12 }}><strong>Ans.</strong> Z = 11. The element is Sodium (Na). Mass number, A = 11 + 12 = 23. This is normal atomic mass. Hence, it is not an isotope.</p>
    <p style={{ marginBottom: 4, color: P_COLOR, fontWeight: 700 }}>III. Clues Given. Mass number and number of electrons of neutral atoms.</p>
    <p style={{ marginBottom: 4 }}><strong>Example.</strong> <em>A neutral atom has mass number 39 and has 19 electrons. Identify the element.</em></p>
    <p style={{ marginBottom: 12 }}><strong>Ans.</strong> Given A = 39, e<Sup c="–" /> = 19. As atom is neutral, number of protons = 19. Z = 19. The element is Potassium (K). Number of neutrons = 39 – 19 = 20. The atom will be represented as <Sup c="39" /><sub style={{ fontSize: "0.72em" }}>19</sub>K.</p>
    <p style={{ marginBottom: 4, color: P_COLOR, fontWeight: 700 }}>IV. Clues Given. Mass number and electrons in an ion.</p>
    <p style={{ marginBottom: 4 }}><strong>Example 1.</strong> <em>The ion of an atom (M<Sup c="+" />) has mass number equal to 23 and has 10 electrons present in it.</em></p>
    <p style={{ marginBottom: 8 }}><strong>Ans.</strong> A = 23, e<Sup c="–" /> = 10. M<Sup c="+" /> is formed by loss of one electron. Electrons in neutral atom = 10 + 1 = 11. Z = 11. The element is Sodium (Na). This ion is Na<Sup c="+" />.</p>
    <p style={{ marginBottom: 4 }}><strong>Example 2.</strong> <em>An ion (X<Sup c="2–" />) of an element has 10 electrons and its mass number is 16.</em></p>
    <p><strong>Ans.</strong> X<Sup c="2–" /> is formed by gain of 2 electrons. Electrons in neutral atom = 10 – 2 = 8. Z = 8. The element is Oxygen and its ion will be O<Sup c="2–" /> and protons = 8.</p>
  </ActivityBox>,

  // ── Indian Scientists Section ──
  <FeatureBox key="feat-indian" title="Contribution of Indian scientists to atomic science for peaceful purposes and influence of their work on India's scientific development">
    <p style={{ textAlign: "justify", marginBottom: 8 }}>
      Indian scientists have played a very important role in using atomic science for peaceful purposes. As a result, India became a scientific leader from a newly independent nation. The main credit goes to Dr. Homi J. Bhabha who initiated the efforts to make India self independent in energy and technology.
    </p>
    <p style={{ fontWeight: 700, color: P_COLOR, marginBottom: 6 }}>I. Main Contributors and Their Roles</p>
    <p style={{ marginBottom: 7 }}>
      <strong>(1) Homi J. Bhabha.</strong> He is known as the "Father of the Indian Nuclear Programme". He established Tata Institute of Fundamental Research (TIFR) in 1945. He was a strong supporter of the application of 'Atom for Peace'. He chaired the first UN conference on the Peaceful Uses of Atomic Energy in 1955.
    </p>
    <p style={{ marginBottom: 7 }}>
      <strong>(2) Vikram Sarabhai.</strong> Though he is primarily known for space science, he succeeded Bhabha, yet he equally continued his interest in the field of nuclear research to make sure that it is used for peaceful purposes, <em>e.g.,</em> in the field of satellite communication and remote sensing.
    </p>
    <p style={{ marginBottom: 10 }}>
      <strong>(3) Raja Ramanna and H.N. Sethna.</strong> They played an important role at a time when foreign countries had imposed sanctions on India to get foreign technology. They are credited with the development of India's first research reactor, Apsara, which was Asia's first reactor.
    </p>
    <p style={{ fontWeight: 700, color: P_COLOR, marginBottom: 6 }}>II. Contributions to Peaceful Sectors.</p>
    <p style={{ marginBottom: 6 }}><strong>(1) Power Generation.</strong> To become independent in the field of power generation, three types of reactors were set up : (i) Pressurized Heavy Water Reactors (ii) Fast Breeder Reactors (iii) Thorium Based Reactors.</p>
    <p style={{ marginBottom: 6 }}><strong>(2) Agriculture.</strong> By using radiation induced breeding, Bhabha Atomic Research Centre (BARC) has developed more than 50 varieties of crops like groundnut, pulses and mustard which give higher yields and are more disease-resistant.</p>
    <p style={{ marginBottom: 6 }}><strong>(3) Food Preservation.</strong> By using gamma radiation technology, the life time of many crops such as spices, onions and potatoes has been increased. Consequently, the losses have been reduced.</p>
    <p><strong>(4) Medicine.</strong> India has earned a great name in the field of 'Nuclear Medicine'. A number of radioisotopes are being produced by the Board of Radiation and Isotope Technology (BRIT) for diagnosing and treating cancer, a technology known as 'Radiotherapy'.</p>
  </FeatureBox>,

  <FeatureBox key="feat-social" title="Useful Impact of Science on Social Life">
    <p style={{ textAlign: "justify", marginBottom: 8 }}>Science has been used in making life healthier in a number of ways. A few of these are described below :</p>
    <p style={{ color: P_COLOR, fontWeight: 700, marginBottom: 4 }}>(1) By use of isotopes in medicines.</p>
    <p style={{ textAlign: "justify", marginBottom: 5 }}>(<em>i</em>) <strong>In Non-invasive Diagnosis.</strong> By use of radioisotopes such as Technetium – 99 called tracers, millions of procedures are performed annually by means of which doctors are able to see how organs like heart and brain are actually functioning without affecting the other parts of the body.</p>
    <p style={{ textAlign: "justify", marginBottom: 5 }}>(<em>ii</em>) <strong>In cancer therapy.</strong> Earlier chemotherapy was used in the treatment of cancer which affected the whole body. But now radioisotopes such as Iodine – 131 is used to target and destroy specific cancer cells (like thyroid cancer). These have less side effects and recovery is faster.</p>
    <p style={{ textAlign: "justify", marginBottom: 8 }}>(<em>iii</em>) <strong>In sterilization.</strong> Gamma radiation emitted from the radioisotope Cobalt – 60 are used to sterilize medical devices from syringes to heart valve to make sure that they are free from bacteria and viruses. Earlier, toxic chemicals were used which could damage these devices.</p>
    <p style={{ color: P_COLOR, fontWeight: 700, marginBottom: 4 }}>(2) By getting power from Atomic Energy.</p>
    <p style={{ textAlign: "justify", marginBottom: 8 }}>Earlier fossil fuels were used in producing electricity. These were accompanied by the evolution of a large number of pollutants such as sulphur dioxide, nitrogen oxides or particulate matter. This resulted in millions of deaths every year. Science has replaced fossil fuels by atomic energy (nuclear energy) which has zero emission.</p>
    <p style={{ color: P_COLOR, fontWeight: 700, marginBottom: 4 }}>(3) By water desalination.</p>
    <p style={{ textAlign: "justify" }}>Small modular reactors (SMRs) are being designed which are used for desalination of water (removing salt from water) thereby providing clean drinking water to the areas facing acute scarcity of water.</p>
  </FeatureBox>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s21", label: "2.1", title: "Introduction : Atoms as the Basic Units of Elements", level: 1 },
  { id: "s22", label: "2.2", title: "Existence of Subatomic Particles in Atom", level: 1 },
  { id: "s23", label: "2.3", title: "Discovery of Electron — Study of Cathode Rays", level: 1 },
  { id: "s231", label: "2.3.1", title: "What is Discharge Tube ?", level: 2 },
  { id: "s232", label: "2.3.2", title: "Production of Cathode Rays", level: 2 },
  { id: "s233", label: "2.3.3", title: "Properties of Cathode Rays", level: 2 },
  { id: "s234", label: "2.3.4", title: "What are Electrons ?", level: 2 },
  { id: "s235", label: "2.3.5", title: "Charge and Mass of the Electron", level: 2 },
  { id: "s236", label: "2.3.6", title: "Origin of Cathode Rays", level: 2 },
  { id: "s237", label: "2.3.7", title: "Electrons are Constituents of All Atoms", level: 2 },
  { id: "s24", label: "2.4", title: "Discovery of Proton — Study of Anode Rays", level: 1 },
  { id: "s241", label: "2.4.1", title: "Production of Anode Rays", level: 2 },
  { id: "s242", label: "2.4.2", title: "Origin of Anode Rays", level: 2 },
  { id: "s243", label: "2.4.3", title: "Properties of Anode Rays", level: 2 },
  { id: "s244", label: "2.4.4", title: "What is a Proton ?", level: 2 },
  { id: "s245", label: "2.4.5", title: "Protons are Constituents of All Atoms", level: 2 },
  { id: "s25", label: "2.5", title: "Thomson's Model of Atom", level: 1 },
  { id: "s26", label: "2.6", title: "Rutherford's Model of Atom", level: 1 },
  { id: "s261", label: "2.6.1", title: "Discovery of Nucleus — Scattering Experiments", level: 2 },
  { id: "s262", label: "2.6.2", title: "Rutherford's Nuclear Model of Atom", level: 2 },
  { id: "s263", label: "2.6.3", title: "Drawback of Rutherford's Model", level: 2 },
  { id: "s27", label: "2.7", title: "Bohr's Model of Atom", level: 1 },
  { id: "s28", label: "2.8", title: "Discovery of Neutron", level: 1 },
  { id: "s281", label: "2.8.1", title: "Reason for the presence of neutrons", level: 2 },
  { id: "s282", label: "2.8.2", title: "Experiments leading to the discovery of neutron", level: 2 },
  { id: "s283", label: "2.8.3", title: "Structure/Composition of the nucleus", level: 2 },
  { id: "s29", label: "2.9", title: "Atomic Number and Mass Number", level: 1 },
  { id: "s291", label: "2.9.1", title: "Atomic Number", level: 2 },
  { id: "s292", label: "2.9.2", title: "Mass Number", level: 2 },
  { id: "s293", label: "2.9.3", title: "Difference between Mass Number and Atomic Mass", level: 2 },
  { id: "s294", label: "2.9.4", title: "Representation of Atomic and Mass Number", level: 2 },
  { id: "s295", label: "2.9.5", title: "Calculation of Electrons, Protons and Neutrons", level: 2 },
  { id: "s210", label: "2.10", title: "Electronic Configuration of Elements", level: 1 },
  { id: "s211", label: "2.11", title: "Valence Electrons and Valency", level: 1 },
  { id: "s2111", label: "2.11.1", title: "Valence Electrons", level: 2 },
  { id: "s2112", label: "2.11.2", title: "Valency", level: 2 },
  { id: "s2113", label: "2.11.3", title: "Calculation of Valency", level: 2 },
  { id: "s2114", label: "2.11.4", title: "Valencies of the First 20 Elements", level: 2 },
  { id: "s2115", label: "2.11.5", title: "Formation of Ions", level: 2 },
  { id: "s212", label: "2.12", title: "Isotopes", level: 1 },
  { id: "s2121", label: "2.12.1", title: "Definition and Examples", level: 2 },
  { id: "s2122", label: "2.12.2", title: "General Characteristics of Isotopes", level: 2 },
  { id: "s2123", label: "2.12.3", title: "Reason for Fractional Atomic Masses", level: 2 },
  { id: "s2124", label: "2.12.4", title: "Applications of Isotopes", level: 2 },
  { id: "s213", label: "2.13", title: "Isobars", level: 1 },
];

// ── CONCAT ALL CONTENT ARRAYS ────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter2() {
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
