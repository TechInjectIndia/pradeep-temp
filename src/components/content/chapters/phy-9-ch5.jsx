"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── DESIGN TOKENS ────────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P  = "#f9eef4";

// ── FONT LOADER ──────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ── INLINE MATH HELPERS ──────────────────────────────────────
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

// ── CHEMICAL EQUATION ────────────────────────────────────────
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

// ── HEADING HIERARCHY ────────────────────────────────────────
const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
      fontWeight: 800, color: P_COLOR, textTransform: "uppercase",
      letterSpacing: "0.5px", margin: 0 }}>
      {label}. {title}
    </h2>
    <div style={{ borderTop: "1.5px solid " + P_COLOR, marginTop: 4 }} />
  </div>
);

const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
    fontWeight: 700, color: P_COLOR, margin: "16px 0 8px" }}>{label} {title}</h3>
);

const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5,
    fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>{label} {title}</h4>
);

// ── PARAGRAPH ────────────────────────────────────────────────
const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 8px", textAlign: "justify", ...style }}>{children}</p>
);

// ── CONTENT BLOCKS ───────────────────────────────────────────
const DefBox = ({ children }) => (
  <div style={{ border: "1.5px solid #888", padding: "10px 16px", margin: "12px 0",
    fontStyle: "italic", background: "#fafafa", fontSize: "14px", lineHeight: 1.55 }}>
    {children}
  </div>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border: "1.5px solid #888", borderLeft: "5px solid " + P_COLOR, margin: "18px 0" }}>
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
  <div style={{ border: "2px solid " + P_COLOR, margin: "20px 0" }}>
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
  <div style={{ border: "2px solid " + P_COLOR, margin: "20px 0" }}>
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
      border: "1.5px dashed " + P_COLOR, background: LIGHT_P, minHeight: 80,
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
  <div style={{ margin: "20px 0", border: "1.5px solid " + P_COLOR }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 14px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900,
      fontSize: 12, letterSpacing: 1 }}>
      PROBLEMS BASED ON {topic}
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);

// ── TABLE STYLES ─────────────────────────────────────────────
const th = {
  border: "1.5px solid #555", padding: "6px 10px", textAlign: "center",
  fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif",
  fontSize: 13, background: "#f0f0f0"
};
const td = {
  border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5
};

// ── TABLE SUB-COMPONENTS ─────────────────────────────────────
const EMSpectrumTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      Electromagnetic Spectrum — Wavelength Ranges
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Name</td>
          <td style={th}>Wavelength</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["Gamma ray", "less than 10 pm"],
          ["X-ray", "10 pm – 10 nm"],
          ["Ultraviolet", "10 nm – 400 nm"],
          ["Visible", "400 nm – 700 nm"],
          ["Infrared", "700 nm – 1 mm"],
          ["Microwave", "1 mm – 1 meter"],
          ["Radio", "1 meter and more"],
        ].map(([name, wl], i) => (
          <tr key={i}>
            <td style={{ ...td, fontWeight: 700 }}>{name}</td>
            <td style={{ ...td, textAlign: "center" }}>{wl}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── HAMBURGER BUTTON ─────────────────────────────────────────
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

// ── BACKDROP ─────────────────────────────────────────────────
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.35)", cursor: "pointer"
    }} />
  );
}

// ── SIDEBAR ──────────────────────────────────────────────────
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

// ── CHAPTER COVER ─────────────────────────────────────────────
const chapterNumber = "5";
const chapterTitle = "Earth as a System : Energy, Matter and Life";

const ChapterCover = () => (
  <div style={{ background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
    padding: "60px 48px 50px", textAlign: "center", marginBottom: 0 }}>
    <div style={{ display: "inline-block", border: "3px solid #fff", padding: "8px 28px", marginBottom: 18 }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 56, color: "#fff", lineHeight: 1 }}>
        {chapterNumber}
      </span>
    </div>
    <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 32, color: "#fff", letterSpacing: 2,
      textTransform: "uppercase", margin: 0, lineHeight: 1.25 }}>
      {chapterTitle}
    </h1>
  </div>
);

// ── BATCH 1 CONTENT ──────────────────────────────────────────
const content_b1 = [
  // ── 5.1 INTRODUCTION ────────────────────────────────────────
  <SecHd key="sec-s51" id="s51" label="5.1." title="Introduction" />,
  <p key="b1-p-s51-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Earth is like a giant, dynamic system shaped by the constant interplay between <strong>solar energy</strong> and biogeochemical cycles. It is powered by solar energy from the Sun, which gives us heat and drives our weather. This energy helps move water and air around the planet. Due to the shape of the Earth, different parts at tropical and poles receive different amounts of solar energy, giving rise to regions of high and low pressure and hence governing the winds formation. At the same time, <strong>biogeochemical processes</strong> act as nature's recycling system, moving water and important nutrients like carbon, nitrogen and oxygen between plants, animals, and the soil. However, human impact through things like pollution, industrialization and deforestation has disturbed the delicate balance.
  </p>,
  <p key="b1-p-s51-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This chapter will give a detailed view on the important role played by Sun in driving entire Earth system. How, solar energy in combination with shape of the Earth governs the winds pattern on the Earth. Students will learn about <strong>heat budget of the Earth</strong> and how the temperature of entire Earth system is maintained. Students will become aware about the human made problems such as acid rain, global warming, ocean acidification. How these problems have surfaced and how we can plan for a sustained living on Earth without disturbing the eco system.
  </p>,
  <p key="b1-p-s51-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    At the end of the chapter, students will come across four important biogeochemical processes, water cycle, carbon, nitrogen and oxygen cycle. How these important life sustaining elements move through different spheres of Earth. In nut shell, students will understand the delicate balance between solar energy, Earth system (four spheres of Earth) and movement of various important life sustaining elements and problems which have surfaced due to human intervention. They will become aware of such issues and also learn how to address these challenges to lead a sustainable life on planet Earth.
  </p>,

  // ── 5.2 STRUCTURE OF THE ATMOSPHERE ─────────────────────────
  <SecHd key="sec-s52" id="s52" label="5.2." title="Structure of the Atmosphere" />,
  <p key="b1-p-s52-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The envelop of gases around the Earth surface is called atmosphere. The atmosphere consists of different layers with varying density and temperature. Density is highest near the surface of the earth and decreases with increasing altitude. <em>The column of atmosphere is divided into five different layers depending upon the temperature condition. They are: troposphere, stratosphere, mesosphere, thermosphere and exosphere and shown in Fig. 5.1.</em>
  </p>,
  <p key="b1-p-s52-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>The troposphere</em> is the lowermost layer of the atmosphere. Its average height is 13 km. At poles, it extends roughly to a height of 8 km and at equator it is extended up to 18 km.
  </p>,
  <Fig key="fig-5-1"
    src={CONTENT_IMAGES.CONTENT_IMAGE_06F7EFED46AB34F45250}
    num="Fig. 5.1" caption="Layers of the atmosphere" />,
  <p key="b1-p-s52-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    At equator, the thickness of troposphere is largest because heat is transported to great heights by strong convectional currents. This layer consists of dust particles and water vapour. All climate and weather change occur in this layer. With every 165 m height, the temperature in this layer decreases approximately by 1°C. Most of the biological activities occur in this layer. <em>In between troposphere and stratosphere there exists a zone of almost constant temperature of minus 80°C over equator and minus 45°C over the poles. Since, the temperature in these zone is nearly constant, it is called the tropopause.</em>
  </p>,
  <p key="b1-p-s52-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>The stratosphere</em> is found above the troposphere or tropopause. It extends up to a height of 50 km. The stratosphere layer contains the <em>ozone layer</em>. This layer absorbs harmful ultra-violet (UV) radiation and shields life on the earth from intense, harmful form of the energy.
  </p>,
  <p key="b1-p-s52-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>The mesosphere lies</em> above the stratosphere. It extends up to a height of 85 km. In this layer, once again, temperature starts decreasing with the increase in altitude and reaches up to minus 100°C at the height of 80 km. The upper limit of mesosphere is known as the <em>mesopause</em>.
  </p>,
  <p key="b1-p-s52-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thermosphere is the layer of very thin air above mesosphere. High-energy X-rays and ultra violet (UV) radiations from Sun are absorbed in thermosphere. Many satellites orbit Earth within the thermosphere. Thermosphere extends from 85 km to anywhere between 500–1000 km above the ground.
  </p>,
  <p key="b1-p-s52-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The uppermost layer of the atmosphere above the thermosphere is called as the <em>exosphere</em>. This is the highest layer but very little is known about it. This layer gradually merges with the outer space.
  </p>,
  <p key="b1-p-s52-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The ionosphere is not a distinct layer like the others mentioned above. Instead, the ionosphere is a series of regions in parts of the mesosphere and thermosphere. This layer contains ions which are electrically charged particles. For this reason, it is called as ionosphere. This layer reflects the radio waves transmitted from the Earth. This is helpful in communication.
  </p>,

  // ── 5.3 SOLAR ENERGY ────────────────────────────────────────
  <SecHd key="sec-s53" id="s53" label="5.3." title="Solar Energy" />,
  <p key="b1-p-s53-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We take the Sun for granted. Without fail, it rises in the morning and sets in the evening. Human believe that Sun is an object and it will last forever, continuously radiating away the energy that makes life on our planet possible. The objective of this chapter is to study how the energy is coming from the Sun and how this radiant energy from Sun, is converted into other useful forms. How does this energy influence the wind patterns on Earth. <em>The Sun consists of nearly 90% hydrogen. Inside Sun, the fusion of hydrogen occurs to form stable helium. This process is accompanied with the release of a large amount of energy which in the form of radiations reaches our planet Earth and sustains various organisms.</em>
  </p>,
  <DefBox key="def-s53-1">
    <strong>Solar energy</strong> is radiation from the Sun that is capable of producing heat, causing chemical reactions or generating electricity using photovoltaic devices.
  </DefBox>,
  <p key="b1-p-s53-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The Sun is the powerhouse of our solar system, constantly bathing Earth in energy. For most purposes we can consider the Sun as a perfect radiator, emitting at a temperature of about <strong>5800 K.</strong> The solar surface emits most of its electromagnetic radiation as visible light, or the portion of the electromagnetic spectrum we can see with our eyes. The wavelength range of 300 to 4000 × 10<sup style={{fontSize:"0.72em"}}>−9</sup> m (10<sup style={{fontSize:"0.72em"}}>−9</sup> m, nm stands for nanometer and written as 1 nm) includes most of the energy of the solar radiation (Fig. 5.2). This energy travels 93 million
  </p>,
  <Fig key="fig-5-2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_16E01C4CB3DE92354BF6}
    num="Fig. 5.2" caption="Distribution of solar energy as a function of wavelength" />,
  <p key="b1-p-s53-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    miles through space in the form of electromagnetic radiation. We call this stream of energy as solar radiation, and it's the fundamental driver of Earth's weather, climate, and life itself. <em>Solar radiation is not just one type of light. It's a whole spectrum of energy called as electromagnetic spectrum.</em> The distribution of the amount of solar energy incident on the earth as a function of wavelength is shown in Fig. 5.2. As can be seen, major (49%) portion of the solar energy lies in the visible region (400–700 nm). Before we talk about electromagnetic spectrum, let us go through some important parameters related to electromagnetic waves.
  </p>,
  <p key="b1-p-s53-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In chapter "Sound" you have learned about sound waves. Sound waves are mechanical waves also known as longitudinal waves. In these waves particles of the medium move along the direction of propagation of wave. These waves can be produced or propagated only in a material medium such as water, air and rocks.
  </p>,
  <p key="b1-p-s53-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    All types of radiations produced in solar spectra are electromagnetic in nature. In these radiations, electric and magnetic field move perpendicular to the direction of propagation of the wave. These waves are also called transverse waves, which do not require material medium for their production and propagation. In other words, they can pass through vacuum and any other material medium. All electromagnetic (em) waves travel through free space with same speed, <em>i.e.,</em> <em>c</em> = 3 × 10<Sup c="8" /> m/s, which is the speed of light in vacuum. Common examples of em waves are visible light; ultra-violet light; radio-waves; microwaves and X-ray etc.
  </p>,
  <p key="b1-p-s53-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    A transverse wave travels through a medium in the form of <em>crests</em> and <em>troughs</em>, see Fig. 5.3.
  </p>,
  <DefBox key="def-s53-2">
    <strong>A crest</strong> is a portion of the medium, which is raised temporarily above the normal undisturbed position of rest of the particles of the medium, when a transverse wave passes through it.
  </DefBox>,
  <p key="b1-p-s53-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The <strong>centre of crest</strong> is <em>the position of maximum displacement in the positive direction</em> (<em>i.e.,</em> above the normal level). In Fig. 5.3, the points <em>A, C, E</em> are the centres of successive crests. The crests are represented by thick full line curves in the same figure.
  </p>,
  <Fig key="fig-5-3"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C6E6B0F335CC7E3FCAA0}
    num="Fig. 5.3" caption="Transverse wave showing crests and troughs" />,
  <DefBox key="def-s53-3">
    <strong>A trough</strong> is a portion of the medium, which is depressed temporarily below the normal undisturbed position of rest of the particles of the medium, when a transverse wave passes through it.
  </DefBox>,
  <p key="b1-p-s53-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The <strong>centre of trough</strong> is <em>the position of maximum displacement in the negative direction</em> (<em>i.e.,</em> below the normal level). In Fig. 5.3, the points <em>B, D, F</em> are the centres of successive troughs. The troughs are represented by dotted line curves in the same figure.
  </p>,
  <p key="b1-p-s53-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The distance between two consecutive crests or two consecutive troughs is called <em>wavelength</em> of the wave. It is represented by λ.
  </p>,
  <MathBlock key="b1-math-1">AC = BD = λ</MathBlock>,

  <SubHd key="sub-s53-wp" id="s53wp" label="" title="Wave Parameters" />,
  <p key="b1-p-s53-10" style={{ marginBottom: 8 }}>
    <strong>Wavelength:</strong> The wavelength of a wave is denoted by <strong>λ</strong>. It is defined as the spatial distance between two consecutive identical points on a wave, such as from one crest (peak) to the next or from one trough to the next trough (see Fig. 5.3). It is measured in <strong>meter (m).</strong>
  </p>,
  <ul key="b1-ul-s53" style={{ paddingLeft: 28, margin: "4px 0 8px", listStyleType: "disc", fontSize: 14, lineHeight: 1.8 }}>
    <li style={{ marginBottom: 6 }}><strong>Frequency:</strong> The frequency of a wave is denoted by <em>f</em> or <em>v</em>. The number of complete wave cycles that pass a fixed point in one second. It is measured in <strong>Hertz (Hz),</strong> where 1 Hz equals 1 cycle per second.</li>
    <li style={{ marginBottom: 6 }}><strong>Time Period:</strong> The time required for one complete cycle of the wave to pass a given point. It is the reciprocal of frequency and is measured in seconds. That is
      <MathBlock key="b1-math-2">T = <Frac n="1" d="f" /> &nbsp;&nbsp; or &nbsp;&nbsp; f = <Frac n="1" d="T" /></MathBlock>
    </li>
    <li style={{ marginBottom: 6 }}><strong>Relation between frequency and wavelength:</strong> Since, T is the period during which a wave completes one cycle. The distance travelled by the wave in time T is λ. Therefore,
      <MathBlock key="b1-math-3">λ = c × T = <Frac n="c" d="f" /></MathBlock>
      <p style={{ margin: "4px 0" }}>or <em>f</em> = <Frac n="c" d="λ" />, where <em>c</em> is the speed of light in free space and equal to 3 × 10<Sup c="8" /> m/s.</p>
    </li>
  </ul>,

  // ── 5.4 ELECTROMAGNETIC SPECTRUM ────────────────────────────
  <SecHd key="sec-s54" id="s54" label="5.4." title="Electromagnetic Spectrum" />,
  <p key="b1-p-s54-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>The Sun is the primary engine which is driving Earth's systems. It constantly provides energy to the planet earth. This energy travels across space as electromagnetic radiation. The light our eyes can see is just a tiny fraction of this energy. There are various other radiations which our naked eyes cannot see. The full range of these radiations is called the electromagnetic spectrum (Fig. 5.4).</em>
  </p>,
  <DefBox key="def-s54-1">
    "The entire range of radiation according to wavelength, frequency or energy is called the <strong>electromagnetic spectrum</strong>."
  </DefBox>,
  <Fig key="fig-5-4"
    src={CONTENT_IMAGES.CONTENT_IMAGE_FC76FFDCF4D04C29F98E}
    num="Fig. 5.4" caption="The electromagnetic spectrum showing wavelength and frequency regions" />,
  <p key="b1-p-s54-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The electromagnetic spectrum can be divided into several wavelength (frequency) regions, among which only a narrow band from about 400 to 700 nm is visible to the human eyes. Note that there is no sharp boundary between these regions. The boundaries shown in the above figures are approximate and there are overlaps between two adjacent regions. All em radiations travel with the speed of light, <em>i.e.,</em> 3 × 10<Sup c="8" /> m/s.
  </p>,
  <p key="b1-p-s54-3" style={{ marginBottom: 6 }}>The main components from Sun that reach us at Earth are:</p>,
  <p key="b1-p-s54-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Ultraviolet (UV) Radiation.</strong> With shorter wavelengths than visible light, UV radiation is invisible to us but is powerful enough to cause sunburn. Their wavelength ranges from 3–400 nm. In the earth's atmosphere, these radiations are absorbed by the ozone layer (O<Sub c="3" />) which protects the living organism on earth.
  </p>,
  <p key="b1-p-s54-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Visible Light.</strong> This is the part of the spectrum which is visible to our eyes. This region extends roughly from 400 nm–700 nm. This small part of the spectrum is particularly important for our daily perception. Our eyes interpret these different wavelengths as colours, ranging from violet (≈ 400 nm) to red (≈ 700 nm). One can easily remember the name of these seven radiations (colours) which fall in the visible region of the spectrum with the acronym VIBGYOR in the increasing order of wavelength. Here, characters V, I, B, G, Y, O and R represent, respectively, violet, indigo, blue, green, yellow, orange and red colours.
  </p>,
  <p key="b1-p-s54-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Infrared (IR) Radiation.</strong> <em>It is our common experience that during summer while walking on the road, we observe a wavy pattern of radiations emanating from the hot road surface or from any other hot object such as a room heater, radiator (see Fig. 5.5) etc. These radiations are known as infrared radiation.</em> Infrared (IR) radiations (or waves) are a type of invisible electromagnetic radiation with longer wavelengths than visible light (red) but shorter than microwaves. These are detected as heat by our skin and devices. IR radiations originate from hot bodies and used in technologies like remote controls, thermal imaging (night vision IR camera), and heating. Their wavelength range from 700 nm to 1 mm.
  </p>,
  <Fig key="fig-5-5"
    src={CONTENT_IMAGES.CONTENT_IMAGE_DCA2B85DE2BC2C9202F3}
    num="Fig. 5.5" caption="Heating Radiator — an example of infrared radiation" />,
  <p key="b1-p-s54-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Gamma (γ) rays.</strong> <em>The gamma rays or radiations are most energetic radiations in the electromagnetic spectrum. Sun produces gamma rays from fusion process inside the core.</em> But they usually transform into lower-energy light before reaching us at Earth. They mainly arise from high-energy interactions such as the radioactive decay of atomic nuclei or astronomical events like solar flares. Their wavelength is usually below 10<Sup c="−12" /> m (10<Sup c="−12" /> m = 1 picometer = 1 pm). The gamma rays are used in radiotherapy to destroy cancerous tumours.
  </p>,
  <p key="b1-p-s54-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>X-Rays.</strong> The wavelength of X-rays ranges between 10 pm to 10 nm. <em>The X-rays detected from the Sun do not come from the Sun's surface, but from the solar corona, which is the upper layer of the Sun's atmosphere.</em> Within laboratory, X-rays can be produced via electronic transitions within an atom.
  </p>,
  <p key="b1-p-s54-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>Both X-rays and gamma rays are highly energetic (lower wavelength or very large frequency) and have very high penetrating power within materials with which they interact. These radiations may cause damage to tissues of living organism if used without caution.</em>
  </p>,
  <p key="b1-p-s54-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    X-rays have wide range of applications ranging from crystallography, medical such as to identify bone-fracture etc.
  </p>,
  <p key="b1-p-s54-11" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Microwaves.</strong> Sun produces microwaves as part of the broader electromagnetic spectrum, but they are a very small fraction of its total output, which is mostly visible light, infrared, and UV. These solar microwaves, along with radio waves, originate from energetic processes like <strong>solar flares.</strong>
  </p>,
  <EMSpectrumTable key="tbl-em-spectrum" />,
  <p key="b1-p-s54-12" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>Microwaves are electromagnetic radiations with frequency lying between 300 MHz to 300 GHz. Their wavelength ranges from 1 mm to around 1 m.</em> These radiations are commonly called as microwaves. They fall between infrared radiation and radio waves in the electromagnetic spectrum. These waves find applications in communications, remote sensing, radio astronomy and heating applications such as in microwave oven. Following points can be noted w.r.t. microwaves:
  </p>,
  <p key="b1-p-s54-13" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    These waves are reflected from metal surfaces. Some of the microwaves can penetrate through the atmosphere of earth and can be useful in transmitting information to and from satellites in orbit. <em>For this reason, the satellite dishes are made of metal so that they can reflect microwaves used for communication purpose.</em> Further, some of the microwaves having appropriate frequencies are absorbed by water. This property of microwaves is useful in cooking. <em>Water in the food absorbs microwaves, which causes the water to heat up, therefore cooking the food.</em> These waves can pass through glass and plastic. This is the reason why we use a plastic or glass container in a microwave oven and not metal containers, as metal reflects microwaves.
  </p>,
  <p key="b1-p-s54-14" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Radio waves.</strong> A radio basically captures radio waves that are transmitted by radio stations. Radio waves can also be emitted by gases and stars in space. Radio waves are mainly used for TV/mobile communication. The wavelength of radiowaves range from 1 meter or more.
  </p>,

  // ── SOLVED PROBLEMS — EM RADIATION ──────────────────────────
  <NumericalSection key="num-em" topic="FREQUENCY AND WAVELENGTH OF EM RADIATIONS">
    <p key="b1-p-num1-0" style={{ marginBottom: 6 }}>
      <strong>FORMULAE AND UNITS</strong>
    </p>
    <ol style={{ paddingLeft: 28, margin: "4px 0 12px", fontSize: 14, lineHeight: 1.8 }}>
      <li style={{ marginBottom: 4 }}>The radiations coming from Sun are called as electromagnetic (EM) radiations and they all travel with speed of light, <em>c</em> = 3 × 10<Sup c="8" /> m/s.</li>
      <li style={{ marginBottom: 4 }}>The frequency <em>f</em> and time period T of radiation (wave) are related as <em>f</em> = <Frac n="1" d="T" /> Hz</li>
      <li style={{ marginBottom: 4 }}>The wavelength λ of radiation can be expressed in terms of frequency <em>f</em> and speed <em>c</em> as <em>f</em> = <Frac n="c" d="λ" /></li>
    </ol>
    <p><strong>Problem 1.</strong> Calculate the frequency of an EM wave with a wavelength of 600 nm in a vacuum.</p>
    <p><strong>Solution.</strong> Here, λ = 600 nm = 600 × 10<Sup c="−9" /> m, for em wave <em>c</em> = 3 × 10<Sup c="8" /> m/s, frequency <em>f</em> is</p>
    <MathBlock key="b1-math-p1">f = <Frac n="c" d="λ" /> = <Frac n={<>3 × 10<Sup c="8" /></>} d={<>600 × 10<Sup c="−9" /></>} /> = <strong>5 × 10<Sup c="14" /> Hz.</strong></MathBlock>
    <p><strong>Problem 2.</strong> A radio station transmits at 100 MHz. Find the wavelength of these radio waves.</p>
    <p><strong>Solution.</strong> Here, <em>f</em> = 100 MHz = 100 × 10<Sup c="6" /> Hz = 10<Sup c="8" /> Hz, <em>c</em> = 3 × 10<Sup c="8" /> m/s. Therefore, wavelength is</p>
    <MathBlock key="b1-math-p2">λ = <Frac n="c" d="f" /> = <Frac n={<>3 × 10<Sup c="8" /></>} d={<>100 × 10<Sup c="6" /></>} /> = <strong>3 meters.</strong></MathBlock>
    <p><strong>Problem 3.</strong> Find the energy of a single photon with a wavelength of λ = 400 nm (<em>h</em> = 6·63 × 10<Sup c="−34" /> J·s).</p>
    <p><strong>Solution.</strong> Here, λ = 400 nm = 400 × 10<Sup c="−9" /> m, <em>c</em> = 3 × 10<Sup c="8" /> m/s</p>
    <MathBlock key="b1-math-p3">E = hf = <Frac n="hc" d="λ" /> = <Frac n={<>6·63 × 10<Sup c="−34" /> × 3 × 10<Sup c="8" /></>} d={<>400 × 10<Sup c="−9" /></>} /> ≈ <strong>4·97 × 10<Sup c="−19" /> Joules.</strong></MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s54">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A photon has a wavelength of 2·5 × 10<Sup c="−9" /> m. What is its frequency? <strong>[Ans. = 1·2 × 10<Sup c="17" /> Hz]</strong></li>
      <li style={{ marginBottom: 6 }}>An EM wave has a period of 2·0 × 10<Sup c="−10" /> s. Find its wavelength. <strong>[Ans. 0·06 m]</strong></li>
      <li style={{ marginBottom: 6 }}>Determine the energy of a photon with a frequency of 6 × 10<Sup c="20" /> Hz. <strong>[Ans. E = 3·98 × 10<Sup c="−13" /> Joules]</strong></li>
    </ol>
    <p style={{ marginTop: 10, fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13, color: "#333" }}>SOLUTIONS/EXPLANATIONS</p>
    <p><strong>1.</strong> Frequency = <Frac n="c" d="λ" /> = <Frac n={<>3 × 10<Sup c="8" /> ms<Sup c="−1" /></>} d={<>2·5 × 10<Sup c="−9" /> m</>} /> = 1·2 × 10<Sup c="17" /> Hz</p>
    <p><strong>2.</strong> <Frac n="1" d="T" /> = <Frac n="1" d={<>2 × 10<Sup c="−10" /></>} /> = 5 × 10<Sup c="9" /> Hz, &nbsp; λ = C = <Frac n={<>3 × 10<Sup c="8" /> m/s</>} d={<>5 × 10<Sup c="9" /> m</>} /> = 0·06 m</p>
    <p><strong>3.</strong> E = hf = (6·63 × 10<Sup c="−34" /> Js) × (6 × 10<Sup c="20" /> Hz) = 3·98 × 10<Sup c="−13" /> J</p>
  </ProblemsBox>,

  // ── 5.5 INTERACTION OF SOLAR ENERGY WITH EARTH'S SURFACE ────
  <SecHd key="sec-s55" id="s55" label="5.5." title="Interaction of Solar Energy with the Earth's Surface" />,
  <p key="b1-p-s55-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The earth's surface receives most of its energy in short wavelengths. The energy received by the Earth is known as incoming solar radiation which in short is termed as <em>insolation</em>.
  </p>,
  <DefBox key="def-s55-1">
    The energy received by the earth is known as <strong>in</strong>coming <strong>sol</strong>ar radi<strong>ation</strong> which in short is termed as <strong><em>insolation.</em></strong>
  </DefBox>,

  <SubHd key="sub-s55-var" id="s55var" label="" title="Variability of Insolation at the Surface of the Earth" />,
  <p key="b1-p-s55-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The amount and the intensity of insolation received on Earth depends on a large number of factors. These are: (<em>i</em>) the rotation of earth on its axis; (<em>ii</em>) the angle of inclination of the Sun's rays reaching at Earth; (<em>iii</em>) the length of the day; (<em>iv</em>) the transparency of the atmosphere etc. The Earth's axis makes an angle of 66½ with the plane of its orbit round the sun. It has a greater influence on the amount of solar radiations received at different latitudes. Solar radiations received at equator are larger than received at poles. The second important factor is the angle of inclination of the radiations reaching at the Earth surface. Angle of incidence depends on the latitude of a place. At higher latitude (towards the pole), radiations make smaller angle with the Earth surface resulting in slant Sun rays. Whereas at equator, the angle is quite large (vertical incidence) and the area covered by vertical rays is always less than the slant rays. If incident radiations cover larger area, the energy gets distributed and the net energy received per unit area decreases. Due to this reason, equator (tropical region) receives larger energy and poles receive relatively lower energy.
  </p>,

  <SubHd key="sub-s55-cross" id="s55cross" label="" title="The Crossing of Solar Radiation through the Atmosphere" />,
  <p key="b1-p-s55-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The incoming solar radiations before reaching at the Earth's surface, cross the atmosphere which is largely transparent to short wave solar radiation. In other words, radiations with shorter wavelengths easily pass through the atmosphere. The water vapor, ozone and other gas molecules in the troposphere absorb most of the near infrared radiations. In the troposphere, very small suspended particles and gas molecules, scatter the visible spectrum both towards the space as well as towards the Earth surface. This scattering affects the colour of light coming from the Sun. The colour is determined by the wavelength of the light and size of the particles or gas molecules. <em>The short-wavelength blue and violet colour are scattered by molecules in air much more than other colours of the spectrum. This is why blue and violet light reaches our eyes from all directions on a clear day. Since, our eyes are less sensitive to violet colour, the sky appears blue.</em>
  </p>,
  <SubHd key="sub-s55-sunrise" id="s55sunrise" label="" title="Why sunrise and sunset appear yellow, orange or red?" />,
  <p key="b1-p-s55-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Light scattering also explains the sunrise and sunset colour. During sunrise and sunset, Sun is low on horizon. <em>Sunlight passes through more air at sunset and sunrise than during the day, when the Sun is higher in the sky. More atmosphere (during sunrise or sunset) means more gas molecules to scatter the violet and blue light away from your eyes. Due to larger path, all blue and violet light scatters out of your line of sight. Whereas, other colours continue on their way to your eyes. This is the reason why sunsets are often yellow, orange and red. Because, red colour has longest wavelength in the visible spectrum, the Sun is red when it is on horizon. In this case, extremely long path through the atmosphere blocks all other colours and Sun appears as red.</em>
  </p>,

  // ── 5.6 HEATING AND COOLING OF ATMOSPHERE ───────────────────
  <SecHd key="sec-s56" id="s56" label="5.6." title="Heating and Cooling of Atmosphere" />,
  <p key="b1-p-s56-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Short-wave solar radiations after crossing the atmosphere, reach the earth surface and heat it. The earth after being heated by insolation transmits the heat in long-wave form to the atmospheric layers close to the earth. This way the air in closer proximity with the land gets heated slowly. The upper layers of air receive heat energy from layers in contact with land. This process is called <em>conduction</em>. It occurs when two bodies at different temperatures are in contact with one another. This results in flow of energy from the warmer to cooler body. Heat transfer continues until both the bodies attain the common temperature. As the hot air is lighter compared to cold air. The air in contact with the earth rises vertically on heating in the form of currents and further transmits the heat of the atmosphere. <em>This process of vertical heating of the atmosphere is known as convection.</em> On the other hand, the horizontal movement of air also causes heat transfer. Such energy transfer due to horizontal air movement is called <em>advection</em>. Horizontal air movement is relatively more important than the vertical movement. For instance, in middle latitudes, most of diurnal (day and night) variation in daily weather are caused by advection alone. <em>In tropical regions particularly in northern India during summer season local winds called 'loo' is the outcome of advection process.</em>
  </p>,

  <SubHd key="sub-s56-terr" id="s56terr" label="" title="Terrestrial Radiation" />,
  <p key="b1-p-s56-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The insolation received by the earth is in short-waves forms and heats up its surface. The Earth after being heated itself becomes a radiating body and it radiates energy to the atmosphere in long-wave form. This energy heats up the atmosphere from below. <em>These, long-wavelength infrared radiations emitted from the Earth's surface back into the atmosphere after it has been warmed by the Sun, are called terrestrial radiation.</em> The long wave radiation is absorbed by the atmospheric gases particularly by carbon dioxide and the other green house gases. Thus, the atmosphere is indirectly heated by the earth's radiation. The atmosphere in turn radiates and transmits heat to the space.
  </p>,
  <p key="b1-p-s56-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Finally, the amount of heat received from the Sun is returned to space, thereby maintaining constant temperature at the earth's surface and in the atmosphere.
  </p>,

  // ── 5.7 HEAT BUDGET OF EARTH ─────────────────────────────────
  <SecHd key="sec-s57" id="s57" label="5.7." title="Heat Budget of Earth" />,
  <p key="b1-p-s57-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The earth receives solar radiations from the Sun. Out of total radiations which reach the earth, 30% is reflected back into space and 70% is absorbed by Earth (47%) and atmosphere (23%). The balance of incoming and outgoing heat on Earth is referred to as its <strong>heat budget</strong> (Fig. 5.6).
  </p>,
  <DefBox key="def-s57-1">
    The balance of incoming and outgoing heat radiations on Earth is referred to as its <strong><em>heat budget.</em></strong>
  </DefBox>,
  <p key="b1-p-s57-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As with any budget, to maintain constant conditions the budget must be balanced so that the incoming heat equals the outgoing heat. The heat budget of Earth can be understood with the help of Fig. 5.6.
  </p>,
  <Fig key="fig-5-6"
    src={CONTENT_IMAGES.CONTENT_IMAGE_AB395A3E44E66BD11D4F}
    num="Fig. 5.6" caption="Heat budget of the Earth" />,
  <p key="b1-p-s57-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Of all the solar energy reaching the Earth, about 30% is reflected back into space from the atmosphere, clouds, and surface of the Earth. Another 23% of the energy is absorbed by the water vapor, clouds, and dust in the atmosphere, where it is converted into heat. Nearly 47% of the incoming solar radiation is absorbed by the land and ocean, and this energy (short wave) heats up the Earth's surface. The energy absorbed by the Earth returns to the atmosphere through three processes: conduction, radiation, and latent heat.
  </p>,
  <p key="b1-p-s57-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>i</em>) <strong>Conduction,</strong> as discussed earlier refers to the transfer of heat through direct contact between the earth surface and the atmosphere. Air is a relatively poor thermal conductor (or it is a good insulator), so conduction represents only a small part of the energy transfer between the Earth and the atmosphere. This is equal to about 7% of the incoming solar energy at Earth surface.
  </p>,
  <p key="b1-p-s57-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) The bodies with temperature above 0 K, radiate heat energy in the form of infrared radiations. After receiving the heat directly from the Sun, temperature of earth rises above 0 K and about 16% of total solar energy absorbed by the Earth is radiated back to atmosphere in the form of long wavelength IR radiations. Some of this radiated energy (10%) will dissipate into space, but a significant amount of heat will be absorbed by the atmosphere.
  </p>,
  <p key="b1-p-s57-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>iii</em>) The largest amount of heat exchange between the land or oceans and the atmosphere is latent heat transferred through phase changes. Phase refers to different states of the same substances. For instance, water exists in three different phases, solid, liquid and gas. Heat is required whenever phase change occurs. Latent heat refers to heat released or absorbed when water moves between solid, liquid, and vapor states. Heat must be added to convert liquid into vapors and when water vapor is formed, that heat is removed from the ocean and transferred to the atmosphere along with the water vapor. When water vapor condenses into rain, that heat is then returned to the oceans. The same process occurs with the formation and melting of ice. Heat is absorbed by ice when it melts, and heat is released when ice forms, and these phase changes transfer heat between the oceans and the atmosphere.
  </p>,
  <p key="b1-p-s57-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>To complete the heat budget, the heat that is absorbed by the atmosphere either directly from solar radiation or as a result of conduction, radiation and latent heat, is eventually radiated back into space. This explains, why the Earth neither warms up nor cools down despite the huge transfer of heat that takes place.</em>
  </p>,
];

// ── TABLE SUB-COMPONENTS (Batch 2) ───────────────────────────

// ── BATCH 2 CONTENT ──────────────────────────────────────────
const content_b2 = [
  // ── 5.8 THE GREENHOUSE EFFECT ───────────────────────────────
  <SecHd key="sec-s58" id="s58" label="5.8." title="The Greenhouse Effect" />,
  <p key="b2-p-s58-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In the previous section we learned about the heat budget of the earth. Out of total solar radiations received on the surface of Earth, only 47% is absorbed by the land and ocean water. This way Earth is heated and it radiates energy in the form of long wave infrared (IR) radiations. Some of this radiated energy will dissipate into space, nearly 6% of these IR radiations is absorbed by CO<Sub c="2" />, clouds, H<Sub c="2" />O, methane and ozone. This is the greenhouse effect (Fig. 5.7).
  </p>,
  <Fig key="fig-5-7"
    src={CONTENT_IMAGES.CONTENT_IMAGE_DEF6142D2D1D8A236194}
    num="Fig. 5.7" caption="The Greenhouse Effect" />,
  <DefBox key="def-s58-1">
    In the <strong>greenhouse effect,</strong> shortwave solar radiation passes through the atmosphere and reaches the Earth's surface where it gets absorbed. When the radiation is re-emitted by the Earth, it is now in the form of long wavelength, infrared radiation, which does not easily pass through the atmosphere. Instead, this infrared radiation is absorbed by the atmosphere, particularly by the greenhouse gases such as CO<Sub c="2" />, methane, and water vapor. As a result, the atmosphere heats up. Without the greenhouse effect, the average temperature on Earth would be about minus 18°C, which is too cold for liquid water, and therefore life as we know it could not exist!!
  </DefBox>,
  <SubHd key="sub-s58-gd" id="s58gd" label="" title="Greenhouse effect — good or bad?" />,
  <p key="b2-p-s58-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Greenhouse effect is beneficial as it maintains the temperature of the atmosphere and support the life on earth. Still, a great deal of concern is there across the world. This is not because of the presence of the effect itself. Because the effect is intensifying, and causing climate change or global warming. The main culprit are the greenhouse gases namely CO<Sub c="2" /> and methane. <em>Dramatic rise in industrialization has given rise to increase in the atmospheric concentrations of the major greenhouse gases, particularly CO<Sub c="2" /> and methane. Further, the burning of fossil fuels, and deforestation has elevated the problem. The CO<Sub c="2" /> concentrations in the atmosphere has increased more than 25% and global temperature has risen by 0·5°C over the past century. Therefore, production of these greenhouse gases need to be curbed. This can be achieved via sustained development strategies and afforestation, that is planting more trees.</em>
  </p>,

  // ── 5.9 DIFFERENTIAL WARMING AND WINDS FORMATION ────────────
  <SecHd key="sec-s59" id="s59" label="5.9." title="Differential Warming of the Earth and Winds Formation" />,
  <p key="b2-p-s59-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Consider a flat surface and source of radiation on top of it. In this case, each part of the flat surface will receive exactly the same amount of incoming radiation. Since the Earth is a sphere, sunlight is not equally distributed over the Earth's surface. As a result, different regions of Earth will be heated to different degrees. This is called as <strong><em>differential heating or warming of the Earth.</em></strong>
  </p>,
  <SubHd key="sub-s59-causes" id="s59causes" label="" title="Causes of differential heating of Earth" />,
  <p key="b2-p-s59-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>i</em>) First, because of curved shape of the Earth (Fig. 5.8), sunlight falls perpendicularly to the surface at the centre of the sphere (equatorial regions). At any other point on Earth, the angle between the surface and the incoming solar radiation is less than 90°. As a result, the same amount of incoming solar radiation will be concentrated in a smaller area at the equator, but it will be spread over a much larger area at the poles (see Fig. 5.8). Thus, the tropics receive more intense sunlight and a greater amount of heating per unit of area than the polar regions.
  </p>,
  <Fig key="fig-5-8"
    src={CONTENT_IMAGES.CONTENT_IMAGE_D770ED469D466799B3AA}
    num="Fig. 5.8" caption="Differential heating of Earth due to its curved shape" />,
  <p key="b2-p-s59-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) The angle at which sunlight strikes the Earth contributes to differential heating of the surface in an additional way. At the poles, because of the angle at which the solar energy strikes the surface, more of the light will glance off of the surface and the atmosphere and be reflected back into space. At the equator, the direct angle with which light reaches the surface results in more of the energy being absorbed rather than reflected.
  </p>,
  <p key="b2-p-s59-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>iii</em>) Finally, the poles reflect more solar energy than other parts of the Earth because the poles have a higher <strong>albedo</strong>. <em>The albedo refers to reflectivity of a surface.</em>
  </p>,
  <DefBox key="def-s59-1">
    <strong>Albedo</strong> is the ratio (or fraction) of solar radiation reflected to the solar radiation absorbed.
    <div style={{ textAlign: "center", margin: "10px 0 4px", fontStyle: "normal" }}>
      <strong>Albedo</strong> = <Frac n="Solar radiation reflected" d="Solar radiation absorbed or incident" />
    </div>
  </DefBox>,
  <p key="b2-p-s59-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Albedo is measured on a scale from 0 (black) to 1 (bright white). Therefore, we can conclude that:
  </p>,
  <P2 key="b2-p-s59-6">(<em>i</em>) When some object has high albedo, it is "Whiter" and more radiation reflects off. The object stays cooler.</P2>,
  <P2 key="b2-p-s59-7">(<em>ii</em>) If the object is dark, it has low albedo, it absorbs more energy and gets warmer.</P2>,
  <p key="b2-p-s59-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Note that solar radiation reflected or absorbed is measured in terms of Intensity <em>I</em> which is defined as power per unit area (W/m<Sup c="2" />) received (from Sun) or reflected, respectively.
  </p>,
  <p key="b2-p-s59-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Lighter surfaces are more reflective than darker surfaces (which absorb more energy), and therefore have a higher albedo. At the poles, the ice, snow and cloud cover create a much higher albedo, and the poles reflect more and absorb less solar energy than the lower latitudes. Through all of these mechanisms, the poles absorb much less solar radiation than equatorial regions, which is why the poles are cold and the tropics are very warm.
  </p>,

  // ── SOLVED PROBLEMS — ALBEDO ─────────────────────────────────
  <NumericalSection key="num-albedo" topic="ALBEDO">
    <p style={{ marginBottom: 6 }}><strong>FORMULAE AND UNITS</strong></p>
    <ol style={{ paddingLeft: 28, margin: "4px 0 12px", fontSize: 14, lineHeight: 1.8 }}>
      <li>Albedo is the ratio of solar radiation reflected to solar radiation absorbed.
        <div style={{ textAlign: "center", margin: "8px 0" }}>
          Albedo = <Frac n="Solar radiation reflected" d="Solar radiation absorbed or incident" />
        </div>
      </li>
    </ol>
    <p><strong>Problem 1.</strong> A patch of fresh snow receives 1000 W/m<Sup c="2" /> of solar radiation. If it reflects 850 W/m<Sup c="2" /> back into the atmosphere, what is the albedo?</p>
    <p><strong>Solution.</strong> Incident radiation = 1000 W/m<Sup c="2" />, Reflected radiation = 850 W/m<Sup c="2" /></p>
    <MathBlock key="b2-math-a1">Albedo = <Frac n="Reflected radiation" d="Incident radiation" /> = <Frac n="850" d="1000" /> = <strong>0·85 or 85%</strong></MathBlock>
    <p><strong>Problem 2.</strong> An asphalt road has an albedo of 0·10. If the Sun provides 600 W/m<Sup c="2" /> of energy, how much energy is absorbed by the road?</p>
    <p><strong>Solution.</strong> Reflected radiation = Incident radiation × Albedo = 600 × 0·10 = 60 W/m<Sup c="2" /></p>
    <MathBlock key="b2-math-a2">∴ Absorbed radiation = Incident − Reflected = 600 − 60 = <strong>540 W/m<Sup c="2" /></strong></MathBlock>
    <p><strong>Problem 3.</strong> A homeowner replaces a dark asphalt roof (albedo 0·10) with white tiles (albedo 0·60). What is the percentage change in the roof's albedo?</p>
    <p><strong>Solution.</strong> New albedo = 0·60, old albedo = 0·10</p>
    <MathBlock key="b2-math-a3">∴ Percentage change in albedo = <Frac n="new albedo − old albedo" d="old albedo" /> × 100 = <Frac n="0·60 − 0·10" d="0·10" /> × 100 = <strong>500%</strong></MathBlock>
    <p><strong>Problem 4.</strong> A region is 70% open ocean (albedo 0·06) and 30% sea ice (albedo 0·80). What is the average albedo for the entire region?</p>
    <p><strong>Solution.</strong> Open ocean 70% with albedo = 0·06, sea ice 30% with albedo = 0·80</p>
    <MathBlock key="b2-math-a4">Average albedo = (Area 1 × Albedo 1) + (Area 2 × Albedo 2)<br />= (0·70 × 0·06) + (0·30 × 0·80) = 0·042 + 0·24 = <strong>0·282 = 28·2%</strong></MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s59">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 5 }}>A sensor measures 3,500 W/m<Sup c="2" /> of incoming solar radiation hitting a field of fresh snow. If 2,975 W/m<Sup c="2" /> is reflected back into space, what is the albedo? <strong>[Ans. 0·85]</strong></li>
      <li style={{ marginBottom: 5 }}>Old melting snow receives 3,500 W/m<Sup c="2" /> of radiation but only reflects 1,750 W/m<Sup c="2" />. Calculate its albedo. <strong>[Ans. 0·5]</strong></li>
      <li style={{ marginBottom: 5 }}>If desert sand has an albedo of 0·40 and receives 800 W/m<Sup c="2" /> of sunlight, how much radiation is reflected? <strong>[Ans. 320 W/m<Sup c="2" />]</strong></li>
      <li style={{ marginBottom: 5 }}>A dense forest has an albedo of 0·15. If it receives 1000 J of solar energy, how much energy does the forest absorb? <strong>[Ans. 850]</strong></li>
      <li style={{ marginBottom: 5 }}>Surface A reflects 30% of light, while surface B reflects 10%. If both receive 600 W/m<Sup c="2" />, which surface absorbs more energy and by how much? <strong>[Ans. 120 W/m<Sup c="2" />]</strong></li>
      <li style={{ marginBottom: 5 }}>Solar intensity before atmosphere is 1400 W/m<Sup c="2" />. If Earth's average albedo is 0·30, what is the average intensity retained by the Earth atmosphere system? <strong>[Ans. 980 W/m<Sup c="2" />]</strong></li>
    </ol>
    <p style={{ marginTop: 10, fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13, color: "#333" }}>SOLUTIONS/EXPLANATIONS</p>
    <P2 key="b2-sol-a1"><strong>1.</strong> Albedo = <Frac n="2975" d="3500" /> = 0·85 = 85%</P2>
    <P2 key="b2-sol-a2"><strong>2.</strong> Albedo = <Frac n="1,750" d="3500" /> = 0·50 = 50%</P2>
    <P2 key="b2-sol-a3"><strong>3.</strong> Reflected Radiation = Incident radiation × albedo = 800 × 0·40 = 320 W/m<Sup c="2" /></P2>
    <P2 key="b2-sol-a4"><strong>4.</strong> Reflected = 1000 × 0·15 = 150; Absorbed = 1000 − 150 = 850</P2>
    <P2 key="b2-sol-a5"><strong>5.</strong> Surface A absorbed = 600 − 180 = 420 W/m<Sup c="2" />; Surface B absorbed = 600 − 60 = 540 W/m<Sup c="2" />; ∴ B absorbs 120 W/m<Sup c="2" /> more</P2>
    <P2 key="b2-sol-a6"><strong>6.</strong> Reflected = 1400 × 0·30 = 420 W/m<Sup c="2" />; Retained = 1400 − 420 = 980 W/m<Sup c="2" /></P2>
  </ProblemsBox>,

  // ── 5.10 VARIATION IN HEAT BUDGET AT SURFACE OF EARTH ────────
  <SecHd key="sec-s510" id="s510" label="5.10." title="Variation in the Heat Budget at the Surface of Earth" />,
  <p key="b2-p-s510-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As discussed in previous section, there is an imbalance in the amount of radiation received at the earth's surface. Some part of the earth receive larger amount of radiations and have surplus heat energy whereas the other part has deficit. Fig. 5.9 depicts the latitudinal variation in the net radiation balance of the earth-atmosphere system. From figure it is clear that there is a surplus of net radiation balance between 40 degrees north and south and the regions near the poles have a deficit.
  </p>,
  <Fig key="fig-5-9"
    src={CONTENT_IMAGES.CONTENT_IMAGE_EA6A84A52DD35854A15A}
    num="Fig. 5.9" caption="Latitudinal variation in net radiation balance" />,
  <p key="b2-p-s510-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Due to excess heat energy near tropics, air becomes thin (low pressure) whereas at poles due to lower heat energy, air is relatively cooler (dense and has high pressure). This pressure difference causes the air movement. <em>As a result of this movement the surplus heat energy from the tropics is redistributed towards poles and the tropics do not get progressively heated up due to the accumulation of excess heat. Similarly, the high latitudes (pole region) do not get permanently frozen due to excess deficit.</em>
  </p>,

  // ── 5.11 WINDS FORMATION ─────────────────────────────────────
  <SecHd key="sec-s511" id="s511" label="5.11." title="Winds Formation" />,
  <p key="b2-p-s511-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As discussed above, the air is set in motion due to the differences in pressure at poles and tropic regions. This difference arises due to differential heating of the Earth. <em>The air in motion is called wind.</em> The wind blows from high pressure to low pressure.
  </p>,

  <SubHd key="sub-s511-sb" id="s511sb" label="" title="Sea Breeze and Land Breeze" />,
  <p key="b2-p-s511-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Rising (hot at tropic) and falling (cold at pole) air are responsible for more localized, short-term wind patterns in coastal areas. Due to the high heat capacity of water, land heats up and cools down about five times faster than water. During the day the Sun heats up the land faster than it heats the water. Therefore, over the land the air rises giving rise to a low-pressure area, whereas the sea is relatively cool and the pressure over sea is relatively high. <em>Thus, pressure gradient from sea to land is created and the wind blows from the sea to the land as the <strong>sea breeze</strong> (Fig. 5.10).</em> The opposite occurs at night, when the land cools more quickly than the ocean. Now the ocean is warmer than the land, so air rises over the water and sinks over the land, creating a wind blowing from land towards the water. This is a <strong>land breeze</strong>, which blows at night and into the early morning.
  </p>,
  <div key="b2-fig-5-10" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, margin: "16px 0" }}>
    <div style={{ textAlign: "center", flex: "1 1 200px" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_A0038ED29EC097228C1C}
        alt="Sea breeze (day)" style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }} />
      <p style={{ fontSize: 12, color: "#666", fontStyle: "italic", marginTop: 4 }}>Day — Land is warmer than the water</p>
    </div>
    <div style={{ textAlign: "center", flex: "1 1 200px" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_D789998E05C966F5517B}
        alt="Land breeze (night)" style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }} />
      <p style={{ fontSize: 12, color: "#666", fontStyle: "italic", marginTop: 4 }}>Night — Water is warmer than the land</p>
    </div>
  </div>,
  <p style={{ textAlign: "center", fontSize: 12.5, color: "#444", fontStyle: "italic", marginBottom: 12 }} key="b2-cap-510"><strong style={{ color: "#c0126a", fontStyle: "normal" }}>Fig. 5.10. </strong>Sea breeze (day) and land breeze (night)</p>,

  <SubHd key="sub-s511-mon" id="s511mon" label="" title="Monsoons" />,
  <p key="b2-p-s511-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The same phenomenon governs the seasonal climatic changes in many areas. During the winter the lower pressure is over the warmer ocean, and the high pressure is over the colder land. As a result, the winds blow from land to sea. In contrast, during summer, the land is warmer than the ocean, causing low pressure over the land and winds to blow from the ocean towards the land. The winds blowing from the ocean contain a lot of water vapor, and as the moist air passes over land and rises, it cools and condenses causing seasonal rains, such as the summer <strong>monsoons</strong> of southeast Asia.
  </p>,

  <SubHd key="sub-s511-mv" id="s511mv" label="" title="Mountain and Valley Winds" />,
  <p key="b2-p-s511-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In mountainous regions, during the day, the sun heats mountain slopes more rapidly than the valley floor (Fig. 5.11(a)). The air in contact with these slopes becomes warm, less dense, and rises upward along the mountain sides. This creates a gentle breeze blowing from the valley up the slopes. This is called as <strong>valley breeze or anabatic wind</strong>. In contrast, during the night the slopes get cooled and the dense air descends into the valley as the mountain wind (Fig. 5.11(b)). <strong>The cool air, of the high plateaus and ice fields draining into the valley is called mountain wind or katabatic wind.</strong>
  </p>,
  <div key="b2-fig-5-11" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, margin: "16px 0" }}>
    <div style={{ textAlign: "center", flex: "1 1 200px" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_33F65B5A50C46A3633E5}
        alt="Valley Breeze" style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }} />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}><em>(a) Valley Breeze</em><br />Warm valley, cooler air overhead<br />Low pressure in valley causes winds to flow upward</p>
    </div>
    <div style={{ textAlign: "center", flex: "1 1 200px" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_1A2C75DA3CF124E5D698}
        alt="Mountain Breeze" style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }} />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}><em>(b) Mountain Breeze</em><br />Cool valley, warmer air overhead<br />High pressure in valley causes winds to flow downward</p>
    </div>
  </div>,
  <p style={{ textAlign: "center", fontSize: 12.5, color: "#444", fontStyle: "italic", marginBottom: 12 }} key="b2-cap-511"><strong style={{ color: "#c0126a", fontStyle: "normal" }}>Fig. 5.11. </strong>Valley breeze (day) and mountain breeze (night)</p>,

  // ── 5.12 EARTH'S SYSTEMS AND HUMAN IMPACT ───────────────────
  <SecHd key="sec-s512" id="s512" label="5.12." title="Earth's Systems and Human Impact" />,
  <p key="b2-p-s512-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In this section, you will learn about four different components also called as spheres of Earth system and impact of human activities on these spheres.
  </p>,
  <SubHd key="sub-s512-four" id="s512four" label="" title="Earth's Four Spheres" />,
  <p key="b2-p-s512-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Our planet is not just a big ball of rock, it is a dynamic, interconnected system of parts that work together. Scientists often talk about these parts as four major "spheres," each representing a different component of the Earth: the air, the water, the land, and all living things.
  </p>,
  <DefBox key="def-s512-1">
    "Earth is composed of a <strong>geosphere</strong> (the rocks and molten core of earth, also called lithosphere) a <strong>hydrosphere</strong> (the water and ice in the oceans, air, lakes, rivers, and underground), an <strong>atmosphere</strong> (the various gases that form the air around earth), and a <strong>biosphere</strong> (living organisms on earth)."
  </DefBox>,
  <p key="b2-p-s512-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Understanding these four systems, the atmosphere, hydrosphere, lithosphere, and biosphere is the first step to seeing how our world works (Fig. 5.12). They are not separate entities; they constantly interact, exchange energy, and cycle materials.
  </p>,
  <SubSubHd key="sub2-s512-atm" id="s512atm" label="" title="The Atmosphere" />,
  <p key="b2-p-s512-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The atmosphere is the envelope of gases surrounding our planet, held in place by gravity. Think of it as Earth's protective blanket. It's mostly nitrogen (about 78%) and oxygen (about 21%), with small amounts of other gases like argon and carbon dioxide. This mixture is crucial for life, providing the air we breathe and shielding us from the sun's harmful radiation.
  </p>,
  <SubSubHd key="sub2-s512-hyd" id="s512hyd" label="" title="The Hydrosphere" />,
  <p key="b2-p-s512-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The hydrosphere contains all of Earth's water in all its forms: liquid, solid (ice), and gas (water vapor). This includes oceans rivers, lakes, glaciers, ice caps, ground water and even the moisture in the air. Oceans contains nearly 97% of our planet's water.
  </p>,
  <SubSubHd key="sub2-s512-lit" id="s512lit" label="" title="The Lithosphere" />,
  <p key="b2-p-s512-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The lithosphere is the solid, rocky outer part of the Earth. It includes the brittle upper portion of the mantle and the crust, the outermost layer. It's the ground beneath our feet, the mountains, ocean floors, and all the rocks and minerals. This is also called as <strong>geosphere.</strong>
  </p>,
  <SubSubHd key="sub2-s512-bio" id="s512bio" label="" title="The Biosphere" />,
  <Fig key="fig-5-12"
    src={CONTENT_IMAGES.CONTENT_IMAGE_21CBDB1E83BA9C8DBFD2}
    num="Fig. 5.12" caption="Earth's four spheres" />,
  <p key="b2-p-s512-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The biosphere is the sphere of life. It contains all the living organisms on Earth, from the smallest bacteria to the largest whales. It also includes dead organic matter. Life exists in every other sphere: in the soil (lithosphere), in the oceans (hydrosphere), and in the air (atmosphere). Therefore, biosphere is the regions of the surface, atmosphere, and hydrosphere of the earth occupied by living organisms.
  </p>,
  <p key="b2-p-s512-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>These four spheres are not isolated. They are in a constant, delicately connected with each other. For instance, rain (hydrosphere) erodes rock (lithosphere). Volcanoes (lithosphere) release gases into the air (atmosphere). Plants (biosphere) take in carbon dioxide from the air (atmosphere) and release oxygen. This web of connections is what makes Earth a living, breathing planet.</em>
  </p>,

  // ── 5.13 HUMAN IMPACT ON EARTH'S PROCESSES ──────────────────
  <SecHd key="sec-s513" id="s513" label="5.13." title="Human Impact on Earth's Processes" />,
  <p key="b2-p-s513-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The Earth's systems (processes) we have discussed, constituting the atmosphere, hydrosphere, lithosphere, and biosphere, operates in a delicate balance. But human activities have introduced major changes, altering natural cycles at a pace never seen before. These are not abstract, global issues; they have specific, local consequences.
  </p>,
  <DefBox key="def-s513-1">
    "<strong>Human activities</strong> have significantly altered Earth's systems and their interactions, leading to global environmental changes such as climate change, land-use change, and biodiversity loss."
  </DefBox>,
  <SubHd key="sub-s513-cc" id="s513cc" label="" title="Cities and Climate" />,
  <p key="b2-p-s513-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Urbanization is one of the most visible ways humans reshape the lithosphere and, in turn, the atmosphere. <em>Replacing natural landscapes with concrete, asphalt, and buildings creates what's known as an "urban heat island."</em> Materials used for constructing the buildings have lower specific heat than the vegetation (trees and plants).
  </p>,
  <DefBox key="def-s513-2">
    An <strong>Urban Heat Island</strong> is a phenomenon where urban areas experience significantly higher temperatures than their surrounding rural counterparts. This temperature difference occurs because cities replace natural landscapes with surfaces or buildings that absorb and retain more heat.
  </DefBox>,
  <p key="b2-p-s513-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    These building materials absorb and retain more of the sun's heat than vegetation and soil do. This stored heat is then released, making urban areas significantly warmer than their rural surroundings. This effect is especially noticeable at night. The phenomenon is clear in cities like Delhi, where large areas of pavement and dense construction trap heat. This excess heat doesn't just make cities warmer; it alters local weather. The warm air over a city rises, and as it cools, it can form clouds and lead to increased rainfall downwind of the urban centre. So, not only do cities get hotter, but they can also change where and how much it rains nearby, impacting the local hydrosphere.
  </p>,
  <SubHd key="sub-s513-wp" id="s513wp" label="" title="Water Under Pressure" />,
  <p key="b2-p-s513-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Human impact on the hydrosphere is profound, particularly concerning water availability and quality. In India, rapid industrialization and intensive agriculture have placed enormous strain on water resources. Rivers like the Yamuna and Ganga, which are lifelines for millions, face severe pollution from untreated industrial waste and agricultural runoff.
  </p>,
  <DefBox key="def-s513-3">
    <strong>Agricultural runoff</strong> is the water from rainfall, snowmelt or irrigation that flows over farm land instead of soaking into ground.
  </DefBox>,
  <p key="b2-p-s513-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>Runoff from farms often carries excess fertilizers and pesticides. These chemicals enter rivers and lakes, leading to a process called eutrophication. The nutrients cause algae to bloom uncontrollably. When the algae die and decompose, they consume vast amounts of oxygen in the water, creating "dead zones" where fish and other aquatic life cannot survive.</em>
  </p>,
  <p key="b2-p-s513-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The atmosphere also bears the scars of human activity. In many Indian cities, air quality is a big concern. The primary sources of air pollution are small dust particles, vehicle emissions, industrial smoke stacks, construction dust and seasonal burning of crop residue in agricultural states. This creates a thick <strong>haze</strong> of pollutants, including particulate matter (small and harmful dust particles), smoke etc.
  </p>,
  <DefBox key="def-s513-4">
    <strong>Haze</strong> is the atmospheric phenomenon caused by dry particles rather than water droplets. It occurs when light reflects off these particles, reducing the clarity of the sky.
  </DefBox>,
  <p key="b2-p-s513-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Further, in polluted areas the water vapor condenses around microscopic solid (dust) particles and give rise to fog. Fog is essentially a cloud at ground level which causes a reduction in visibility to less than 1000 metres.
  </p>,
  <DefBox key="def-s513-5">
    <strong>Fog</strong> is defined as obscurity in the surface layers of the atmosphere, which is caused by suspension of water vapors in polluted air.
  </DefBox>,
  <p key="b2-p-s513-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Human activities on Earth release gases like nitrogen oxides and sulfur dioxides. These gases when combine with fog form smog.
  </p>,
  <DefBox key="def-s513-6">
    <strong>Smog</strong> is a form of severe air pollution. Smog is a combination of fog, smoke, nitrogen oxides, sulfur dioxides and particulate matter.
  </DefBox>,
  <p key="b2-p-s513-9" style={{ marginBottom: 8 }}>Smog is hazardous to human health, causing respiratory irritation and long-term lung issues.</p>,

  <SubHd key="sub-s513-la" id="s513la" label="" title="Land and Air" />,
  <p key="b2-p-s513-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The expansion of agriculture and urban areas directly transforms the lithosphere and biosphere. Deforestation, <em>i.e.,</em> clearing forests for farmland or construction, has several major consequences. It destroys habitats, leading to a loss of biodiversity. It also contributes to soil erosion, as tree roots that once held the soil in place are removed. The loose top soil can be washed away by rain or blown away by wind, degrading the land's fertility.
  </p>,
  <p key="b2-p-s513-11" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Smog not only affects human health but can also influence weather patterns and reduce the amount of sunlight reaching the Earth's surface.
  </p>,
  <p key="b2-p-s513-12" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    These impacts are not isolated. Deforestation (biosphere, lithosphere) affects the water cycle (hydrosphere) and carbon levels (atmosphere). Urban pollution (atmosphere) washes into rivers (hydrosphere). The interconnectedness of these Earth's processes means that a change in one area often triggers a cascade of effects in others.
  </p>,

  <SubHd key="sub-s513-ar" id="s513ar" label="" title="Acid Rain" />,
  <p key="b2-p-s513-13" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Rapid industrialization and excessive use of vehicles has given rise to the emission of gases such as carbon dioxide (CO<Sub c="2" />), Nitrogen oxides (NO<Sub c="x" />, which include nitrogen dioxide (NO<Sub c="2" />) and nitric oxide (NO)), sulfur dioxide (SO<Sub c="2" />) and carbon monoxide (CO) etc. When it rains, SO<Sub c="2" /> reacts with water to form sulfuric acid (H<Sub c="2" />SO<Sub c="4" />) and NO<Sub c="x" /> forms nitric acid (HNO<Sub c="3" />). These acids become a part of rain. Any form of precipitation with high levels of nitric acid and sulfuric acid is termed <strong>acid rain.</strong> Acid rain has a pH of 4.3 while pure water is perfectly balanced at 7. An increase in the number of industries and emission of different chemical components into the air changes the mix of gases in the atmosphere. Acid rain adversely affects the trees by slowing down their growth and sometimes making the tree die. The food chain also gets affected due to these harms caused by acid rain. Not only the food chain but the monuments, sculptures, and buildings are also damaged due to acid rain. The only method to prevent the acid rain is to control the emission of gases which govern acid rain. Preventive measures include reduction in gas emissions, designing cleaner power plants and reducing the number of pollutants.
  </p>,

  <SubHd key="sub-s513-gw" id="s513gw" label="" title="Global Warming" />,
  <p key="b2-p-s513-14" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Due to the industrial revolution, the emission of carbon dioxide (CO<Sub c="2" />) in the atmosphere has increased. This has given rise to two different problems. First is known as <strong>Global warming.</strong> Global warming is the long-term rise in the average temperature of Earth's climate system. This is primarily driven by human activities, specifically the burning of fossil fuels (coal, oil, gas) that release heat-trapping green house gas (CO<Sub c="2" />) into the atmosphere. This process causes severe environmental impacts, including melting of ice caps, rising sea levels and extreme weather.
  </p>,
  <p key="b2-p-s513-15" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Second problem is the <strong>ocean acidification.</strong> Increased CO<Sub c="2" /> level has also resulted in the decrease of the pH value of surface ocean water. Carbon dioxide is naturally present in the atmosphere and it gets dissolved into the seawater. Water and carbon dioxide react to form carbonic acid, a weaker acid than hydrogen ions (H<Sup c="+" />) and bicarbonate ions (HCO<Sub c="3" /><Sup c="−" />). Due to the impact of humans, the level of carbon dioxide in the atmosphere has increased and more carbon dioxide gets dissolved and reduces the pH level of the ocean water.
  </p>,
  <p key="b2-p-s513-16" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Ocean acidification becomes a major threat to aquatic animals and decreases the formation of corals. The limitation of coral growth affects the habitat of coral animals. Larger aquatic animals will also face the threat due to the increase in the acidity of water. It affects the respiratory system of aquatic animals. Marine scientists are much concerned as these impacts are changing the ocean chemistry much faster than the organisms can adapt.
  </p>,

  <SubHd key="sub-s513-pos" id="s513pos" label="" title="Creating a Positive Impact on the Environment" />,
  <p key="b2-p-s513-17" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    So far, we have learned how human activities have influenced the different spheres of earth. Although, process of industrialization and use of vehicle cannot be stopped. But there exists alternative strategies which can help to lower the threats associated with local or global issues on the environment.
  </p>,
  <ol key="b2-ol-s513" style={{ paddingLeft: 28, margin: "4px 0 8px", fontSize: 14, lineHeight: 1.8 }}>
    <li style={{ marginBottom: 5 }}>Processes like recycling, establishing wildlife preserves and parks can create a positive impact on the ecosystem.</li>
    <li style={{ marginBottom: 5 }}>Reducing the usage of automobiles and switching to public transports can help reduce the emission of harmful gases in the atmosphere.</li>
    <li style={{ marginBottom: 5 }}>Planting trees, and consuming less meat can also leave a positive impact on the ecosystem.</li>
  </ol>,
  <DefBox key="def-s513-7">
    "Human activities, such as burning fossil fuels, deforestation, and agriculture, significantly impact these natural cycles, often leading to imbalances that can affect the sustainability of ecosystems."
  </DefBox>,
];

// ── TABLE SUB-COMPONENTS (Batch 3) ───────────────────────────
const GaseousVsSedimentaryTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 5.1
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Feature</td>
          <td style={th}>Gaseous Cycles</td>
          <td style={th}>Sedimentary Cycles</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["Primary Reservoir", "Atmosphere and oceans", "Earth's crust (rock and soil)"],
          ["Speed of Cycling", "Relatively fast (days to years)", "Very slow (thousands to millions of years)"],
          ["Example Elements", "Nitrogen, Oxygen, Carbon, Water", "Phosphorus, Sulfur, Calcium"],
        ].map(([feat, gas, sed], i) => (
          <tr key={i}>
            <td style={{ ...td, fontWeight: 700 }}>{feat}</td>
            <td style={td}>{gas}</td>
            <td style={td}>{sed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HumanImpactTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Human Activity</td>
          <td style={th}>Primary Cycles Affected</td>
          <td style={th}>Key Consequence</td>
        </tr>
      </thead>
      <tbody>
        {[
          ["Fossil Fuel Combustion", "Carbon, Nitrogen", "Climate Change, Acid Rain"],
          ["Deforestation", "Carbon, Water", "Reduced CO₂ uptake, Altered Rainfall"],
          ["Industrial Agriculture", "Nitrogen, Water", "Eutrophication (Dead Zones)"],
        ].map(([act, cyc, con], i) => (
          <tr key={i}>
            <td style={{ ...td, fontWeight: 700 }}>{act}</td>
            <td style={td}>{cyc}</td>
            <td style={td}>{con}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── BATCH 3 CONTENT ──────────────────────────────────────────
const content_b3 = [
  // ── 5.14 BIOGEOCHEMICAL CYCLES ───────────────────────────────
  <SecHd key="sec-s514" id="s514" label="5.14." title="Biogeochemical Cycles" />,
  <p key="b3-p-s514-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Think about a water bottle. You drink the water, and when the bottle is empty, you might toss it into a recycling bin. From there, it's taken away, broken down, and remade into something new. Earth does something similar with the essential ingredients for life, but on a planetary scale. This process is called a <strong>biogeochemical cycle.</strong> Its meaning can be understood by splitting it as below:
  </p>,
  <ul key="b3-ul-s514-1" style={{ paddingLeft: 28, margin: "4px 0 8px", listStyleType: "none", fontSize: 14, lineHeight: 1.8 }}>
    <li><strong>Bio.</strong> Refers to life, like plants and animals.</li>
    <li><strong>Geo.</strong> Refers to the Earth, including rocks, soil, and water (lithosphere).</li>
    <li><strong>Chemical.</strong> Refers to the elements and compounds being cycled, like carbon, nitrogen and oxygen etc.</li>
  </ul>,
  <DefBox key="def-s514-1">
    <strong>Biogeochemical processes</strong> are the natural pathways through which essential chemical elements—such as water, carbon, nitrogen, oxygen, and phosphorus, circulate between living organisms (biotic) and the non-living environment (abiotic), including the atmosphere, hydrosphere, and geosphere. These cycles are fundamental to sustaining life on planet Earth by ensuring that matter is recycled and reused rather than being lost to the system.
  </DefBox>,
  <p key="b3-p-s514-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    While many elements cycle through Earth's systems, a few are especially critical for life. Below is a list of four cycles that are fundamental to sustaining life on planet earth.
  </p>,
  <ol key="b3-ol-s514" style={{ paddingLeft: 28, margin: "4px 0 8px", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 5 }}><strong>Water (H<Sub c="2" />O) cycle.</strong> It is the foundation for all life. The water cycle moves water from the oceans to the atmosphere, over land, and back again, making it available for all living things.</li>
    <li style={{ marginBottom: 5 }}><strong>Carbon (C) cycle.</strong> The primary building block of organic molecules, including carbohydrates, proteins, and fats. Carbon is found in the atmosphere, oceans, rocks, and all living organisms.</li>
    <li style={{ marginBottom: 5 }}><strong>Nitrogen (N) cycle.</strong> A crucial component of proteins and nucleic acids like DNA (Deoxyribonucleic acid). While our atmosphere is nearly 80% nitrogen gas, most organisms can not use it in that form. The nitrogen cycle converts it into usable forms.</li>
    <li style={{ marginBottom: 5 }}><strong>Oxygen (O) cycle.</strong> Essential for respiration, the process most living things use to get energy from food. It cycles between the atmosphere and living organisms.</li>
  </ol>,
  <p key="b3-p-s514-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Not all biogeochemical cycles operate at the same speed. They can be broadly categorized into two main types based on where the element's primary reservoir is located. A place where a particular element accumulates or is held for a period of time in a biogeochemical cycle is known as <strong>reservoir.</strong>
  </p>,
  <p key="b3-p-s514-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The two types are gaseous cycles and sedimentary cycles. Gaseous cycles are generally faster, while sedimentary cycles can be incredibly slow (see Table 5.1). In this chapter, we shall discuss only the movement of the elements which involve gaseous cycle.
  </p>,
  <GaseousVsSedimentaryTable key="tbl-gas-sed" />,
  <p key="b3-p-s514-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In gaseous cycles, elements can move around the globe quickly through the air. A carbon atom released from a plant in the Amazon could find its way into the atmosphere over Europe in a matter of weeks. In sedimentary cycles, elements are locked away in rocks and are released very slowly through weathering and erosion. This makes them much less mobile. The four fundamental cycles have been described in details in the next sections.
  </p>,

  // ── (A) WATER CYCLE ──────────────────────────────────────────
  <SubHd key="sub-s514-wc" id="s514wc" label="(A)" title="Water Cycle" />,
  <p key="b3-p-s514-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Water is in constant motion. It flows in rivers, sits in oceans, and hides underground (underground water reservoirs). But it also travels through the air and even through living things. <em>This endless journey is the water cycle, also known as the hydrologic cycle (see Fig. 5.13).</em>
  </p>,
  <DefBox key="def-s514-2">
    <em>This endless journey of the water involving evaporation of water bodies, cloud formation followed by condensation, precipitation (rain) and again collection on water surface (in water bodies) is the <strong>water cycle, also known as the hydrologic cycle.</strong></em>
  </DefBox>,
  <p key="b3-p-s514-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Unlike other cycles that might take thousands of years, the water cycle can be surprisingly fast. A water molecule might evaporate from the ocean, travel through the atmosphere, fall as rain, and flow back to the sea in just a matter of days. This rapid circulation is vital for life and for regulating the temperature of planet Earth.
  </p>,
  <SubSubHd key="sub2-wc-sky" id="s514sky" label="" title="From Surface to Sky" />,
  <p key="b3-p-s514-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The journey of water begins when water turns into a gas, a process called <strong>evaporation.</strong> Evaporation is the process in which water changes into a gas or water vapour. The Sun's energy heats up water in oceans, lakes, and rivers, giving some water molecules enough energy to escape into the atmosphere as water vapor.
  </p>,
  <Fig key="fig-5-13"
    src={CONTENT_IMAGES.CONTENT_IMAGE_08B5093AF7E0E83019E4}
    num="Fig. 5.13" caption="The Water Cycle (Hydrologic Cycle)" />,
  <p key="b3-p-s514-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Plants also contribute to this process through <strong>transpiration.</strong> They draw water up from the soil through their roots and release it as vapor from tiny pores in their leaves. It's like plants are breathing out water. For instance, a large oak tree can transpire 40,000 gallons of water into the atmosphere in a single year.
  </p>,
  <SubSubHd key="sub2-wc-clouds" id="s514clouds" label="" title="Forming Clouds and Falling Back" />,
  <p key="b3-p-s514-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Once the water vapours are in the atmosphere, they do not stay as a gas for long. As they rise, they cool. This cooling causes the vapor to change back into tiny liquid water droplets. <em>The cooling of water vapours is called <strong>condensation.</strong></em> It's the same thing you see when a cold can of soda "sweats" on a warm day—water vapor from the air is condensing on the cool surface. In the atmosphere, these droplets cling to microscopic dust or pollen particles, forming clouds. <em>When enough of these droplets gather, they become visible as clouds. Fog is simply a cloud that forms at ground level.</em>
  </p>,
  <p key="b3-p-s514-11" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When these droplets in the clouds bump into each other and combine, they grow larger and heavier. Eventually, they become too heavy to stay suspended in the air and fall back to Earth as precipitation. This can take many forms depending on the temperature, including rain, snow, sleet (a mix of rain and snow), or hail.
  </p>,
  <DefBox key="def-s514-3">
    <strong>Precipitation</strong> is the process in which clouds release water in the form of rain, sleet, snow, or hail.
  </DefBox>,
  <SubSubHd key="sub2-wc-return" id="s514return" label="" title="Water's Return Journey" />,
  <p key="b3-p-s514-12" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When clouds release water in the form of rain, sleet or hail, it reaches the Earth surface. It can take a few different paths. <em>Some of it soaks into the Earth in a process called <strong>infiltration</strong> (see Fig. 5.14).</em> This water seeps down through soil and rock layers, replenishing groundwater. This underground water can stay there for years or slowly make its way to lakes and rivers. <strong>Groundwater is a hidden but vast reservoir, making up over 30% of the world's freshwater.</strong> The level of groundwater is also called as <strong>water table.</strong> Water that does not soak into the ground flows over the land's surface as runoff. This happens when the ground is already saturated, like a full sponge, or when the surface is impermeable, like pavement. This runoff collects in streams, rivers, and eventually flows back into lakes and oceans, ready to start the cycle all over again.
  </p>,
  <Fig key="fig-5-14"
    src={CONTENT_IMAGES.CONTENT_IMAGE_8C4987E0CEC83C6EA290}
    num="Fig. 5.14" caption="Infiltration — water seeping into the ground" />,
  <p key="b3-p-s514-13" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Together, these processes ensure water is distributed across the planet. The water cycle acts as a giant global engine, moving heat from the equator towards the poles through the movement of air and ocean currents, which are influenced by evaporation and precipitation patterns. This helps regulate Earth's climate and makes our planet habitable.
  </p>,

  // ── (B) CARBON CYCLE ──────────────────────────────────────────
  <SubHd key="sub-s514-cc" id="s514cc" label="(B)" title="Carbon Cycle" />,
  <p key="b3-p-s514-14" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Carbon is the backbone of life on Earth. It is in the air we breathe out, the food we eat, and every living thing, from the smallest microbe to the largest whale. It is the fourth most abundant element in the universe (Hydrogen (73·97%), helium (24·02%), oxygen (1·04%) and carbon (0·46%)). Carbon plays a critical role in forming complex molecules like DNA and proteins, making life on Earth possible. Like water, carbon does not stay in one place for long. It is constantly moving, cycling through the planet's major storage areas, or reservoirs: the atmosphere (air), biosphere (living things), hydrosphere (water), and lithosphere (carbonate rocks such as lime stone and fossil fuels (coal, oil, and gas)).
  </p>,
  <DefBox key="def-s514-4">
    The <strong>carbon cycle</strong> refers to the movement of carbon between living organisms like plants, animals, and microbes, as well as the earth's minerals and the atmosphere.
  </DefBox>,
  <p key="b3-p-s514-15" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Processes involved in Carbon Cycle.</strong> The movement of carbon between organisms, the Earth, and the atmosphere is regulated by carbon cycle through various processes such as capture, consumption, and respiration etc.
  </p>,
  <Fig key="fig-5-15"
    src={CONTENT_IMAGES.CONTENT_IMAGE_6E0176FF777B5F48399A}
    num="Fig. 5.15" caption="The Carbon Cycle" />,
  <SubSubHd key="sub2-cc-land" id="s514ccland" label="" title="Carbon Cycle on Land" />,
  <p key="b3-p-s514-16" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The carbon cycle on land runs through various processes including photosynthesis, respiration, direct consumption, decomposition, and biomass combustion. Through these processes, carbon moves between the atmosphere, plants, animals, and soil.
  </p>,
  <ul key="b3-ul-cc-land" style={{ paddingLeft: 28, margin: "4px 0 8px", listStyleType: "disc", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 6 }}><strong>Photosynthesis.</strong> Photosynthesis is the vital process where plants use sunlight, water, and carbon dioxide (CO<Sub c="2" />) to create their own food and release oxygen (O<Sub c="2" />) as a byproduct. Plants take carbon dioxide (CO<Sub c="2" />) directly from the atmosphere and convert it into biomass, such as leaves and stems. Therefore, this process acts as <em>carbon capture.</em></li>
    <li style={{ marginBottom: 6 }}><strong>Respiration.</strong> In this process, plant, animals and microbes consume oxygen and release carbon to the atmosphere as CO<Sub c="2" />. In respiration, an essential biological process, cells break down nutrients like glucose to produce energy needed for survival.</li>
    <li style={{ marginBottom: 6 }}><strong>Consumption as a food.</strong> Plants contain carbon which is known as fixed carbon. This carbon moves through food chain processes. For instance, herbivores eat plants and carnivores consume herbivores. This way it moves through food chain.</li>
    <li style={{ marginBottom: 6 }}><strong>Decomposition.</strong> When organisms die, the decomposers come into the picture. Decomposers, such as bacteria and fungi, release carbon into the atmosphere through cellular respiration as they breakdown dead organic matter (plants, animals, waste) for energy (Fig. 5.16). They convert complex carbon compounds back into simpler CO<Sub c="2" /> gas which is released into atmosphere. This completes a vital part of the carbon cycle by making carbon available for plants again.</li>
    <li style={{ marginBottom: 6 }}><strong>Biomass combustion.</strong> When we burn wood, leaves or any fuel including the wildfires, a significant amount of carbon stored in plants is released back into the atmosphere.</li>
  </ul>,
  <Fig key="fig-5-16"
    src={CONTENT_IMAGES.CONTENT_IMAGE_2B3E33AE4A509442DA91}
    num="Fig. 5.16" caption="Decomposition — bacteria and fungi break down organic matter" />,
  <SubSubHd key="sub2-cc-ocean" id="s514ccoc" label="" title="Oceanic Carbon Cycle" />,
  <p key="b3-p-s514-17" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In the oceanic carbon cycle, exchange of carbon occurs between the ocean, atmosphere, Earth's interior, and seafloor. It is one of the crucial parts of the global carbon cycle. Nearly 38,000 gigatons of carbon is stored in ocean, in the form of dissolved inorganic carbon. It alone accounts for about 95% of the total active carbon pool on Earth's surface. The ocean absorbs and releases carbon dioxide (CO<Sub c="2" />) through gas exchange with the atmosphere. Phytoplankton (or microalgae) float on ocean surface. They absorb CO<Sub c="2" /> through photosynthesis and convert it into organic carbon. When their life cycle is over, some of the carbon sinks into the deep ocean, where it can be stored for long periods. Further, shell-building organisms also transport carbon to the deep ocean when they die. Undissolved shells form calcium carbonate sediments, which tectonic processes transform into limestone over millions of years, locking away massive amounts of carbon.
  </p>,
  <SubSubHd key="sub2-cc-imp" id="s514ccimp" label="" title="Importance of Carbon Cycle" />,
  <p key="b3-p-s514-18" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    One of the important functions of the carbon cycle is to regulate Earth's temperature. Carbon cycle controls the amount of carbon dioxide (CO<Sub c="2" />) in the atmosphere, which helps in regulating the Earth's temperature. By cycling carbon through the atmosphere, oceans, plants, animals, and fossil fuels, this cycle allows the ecosystems to function properly. Carbon is one of the critical components of fossil fuels. This cycle maintains the balance between natural sources and sink (such as oceans, plants, and the atmosphere). Above all, it sustains the global food chain. Plants produce their food by using carbon dioxide in photosynthesis. Plants are then consumed by animals and humans, thus, supporting the entire global food chain.
  </p>,
  <SubSubHd key="sub2-cc-dis" id="s514ccdis" label="" title="Disruption in Carbon Cycle" />,
  <p key="b3-p-s514-19" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As you learned, carbon cycle is crucial in maintaining the eco-balance. The disruption of the carbon cycle may enhance global warming and result in severe consequences for the environment. Suppose there is excess CO<Sub c="2" />. Excess carbon dioxide dissolves in seawater and form carbonic acid, which lowers ocean pH. Lower oceanic pH harms marine life (corals and shellfish), thus, threatening marine ecosystems and food sources. Excess in CO<Sub c="2" /> may also lead to global warming, thus melting ice caps and glaciers. It will contribute to rise in sea levels which will govern coastal flooding, saltwater intrusion and displacement of population from coastal areas and thus disrupting economies. Therefore, it is necessary to maintain these cycles.
  </p>,
  <SubSubHd key="sub2-cc-cat" id="s514cccat" label="" title="Different Categories of Carbon" />,
  <p key="b3-p-s514-20" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Carbon has been categorized by colours to describe its location, source, and impact on the climate cycle.
  </p>,
  <ul key="b3-ul-carbon-cat" style={{ paddingLeft: 28, margin: "4px 0 8px", listStyleType: "disc", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 6 }}><strong>Blue Carbon.</strong> Carbon stored in coastal and oceanic ecosystem is called as blue carbon. Key sinks include mangrove forests, seagrass meadows, and salt marshes. These sinks capture and store carbon in their roots and underwater sediments.</li>
    <li style={{ marginBottom: 6 }}><strong>Green Carbon.</strong> Carbon stored by land ecosystems through photosynthesis is called as green carbon. It is primarily stored in trees in forests and the soil.</li>
    <li style={{ marginBottom: 6 }}><strong>Brown Carbon.</strong> It is released during the incomplete combustion of organic matter, such as wood or any other biomass. Unlike black carbon, it primarily absorbs ultraviolet and blue light. It appears brownish in colour.</li>
    <li style={{ marginBottom: 6 }}><strong>Black Carbon.</strong> It is commonly known as <strong>soot</strong>. This is a solid particle formed by the incomplete combustion of fossil fuels, wood, and other fuels. It is a powerful warming agent because it absorbs all visible light and can accelerate ice melt when it settles on snow.</li>
  </ul>,

  // ── (C) NITROGEN CYCLE ───────────────────────────────────────
  <SubHd key="sub-s514-nc" id="s514nc" label="(C)" title="Nitrogen Cycle" />,
  <p key="b3-p-s514-21" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    While breathing, most of the air we inhale consists of nitrogen which is the most abundant atmospheric gas constituting about 78% of Earth's atmosphere. But for most living things, it is completely unusable. The two nitrogen atoms in each molecule are held together by a strong triple bond, making them very stable and reluctant to react. Yet, life depends on nitrogen.
  </p>,
  <DefBox key="def-s514-5">
    <strong>Nitrogen Cycle</strong> is a biogeochemical process in which nitrogen is converted into various forms, so that stable nitrogen moves from atmosphere to the soil to organism and back into the atmosphere.
  </DefBox>,
  <p key="b3-p-s514-22" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Nitrogen cycle can be understood with the help of Fig. 5.17. It involves various processes such as nitrogen fixation, nitrification, and denitrification. Nitrogen is available in both organic and inorganic forms. Living organisms contain organic nitrogen; when other living organisms consume these, it is passed to upper level through the food chain.
  </p>,
  <p key="b3-p-s514-23" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Inorganic forms of nitrogen is available in the atmosphere in abundance (78%). The symbiotic bacteria convert the inert nitrogen into usable form such as ammonia followed by conversion into nitrites (NO<Sub c="2" /><Sup c="−" />) and nitrates (NO<Sub c="3" /><Sup c="−" />) which can be easily absorbed by the plants. Nitrate is the form of nitrogen that most plants can easily absorb through their roots.
  </p>,
  <Fig key="fig-5-17"
    src={CONTENT_IMAGES.CONTENT_IMAGE_B9BD3E5C8B8A467FB1AD}
    num="Fig. 5.17" caption="The Nitrogen Cycle" />,
  <SubSubHd key="sub2-nc-stages" id="s514ncst" label="" title="Stages of Nitrogen Cycle" />,
  <p key="b3-p-s514-24" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The Nitrogen cycle consists of following five main steps: Nitrogen fixation; Nitrification; Assimilation; Ammonification and Denitrification.
  </p>,
  <ol key="b3-ol-nc" style={{ paddingLeft: 28, margin: "4px 0 8px", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 8 }}>
      <strong>Nitrogen Fixation Process.</strong> Nitrogen fixation is the initial step of the nitrogen cycle. In this step, the inert form of nitrogen available in atmosphere is converted into the usable form — ammonia (NH<Sub c="3" />). In this process, the inert nitrogen from the atmosphere and surface water is deposited into soils mainly through precipitation.
      <p style={{ textIndent: 28, marginTop: 6 }}>The symbiotic bacteria such as <strong>Diazotrophs</strong> and <em>Rhizobium</em> play a major role in nitrogen fixation. These bacteria consist of a nitrogenase enzyme, which has the capability to combine gaseous nitrogen with hydrogen to form ammonia.</p>
      <p style={{ textIndent: 28, marginTop: 6 }}>Further, there are three different ways of nitrogen fixation:</p>
      <ul style={{ paddingLeft: 24, margin: "4px 0", listStyleType: "disc" }}>
        <li style={{ marginBottom: 5 }}><strong>(i) Atmospheric fixation.</strong> Lightning is a natural phenomenon where the energy of lightning breaks and converts the non-absorbable form of atmospheric nitrogen into a usable form (nitrogen oxides). Though the contribution of lightning in the nitrogen fixation is very small, they save plants from the deficiency of essential elements. Nitrogen oxides, <em>e.g.</em> NO, N<Sub c="2" />O and NO<Sub c="2" /> are also produced in the atmosphere by industrial processes, automobile exhausts, power stations and forest fires.</li>
        <li style={{ marginBottom: 5 }}><strong>(ii) Industrial nitrogen fixation.</strong> It is a man-made artificial method which helps in nitrogen fixation. In this method, ammonia is produced by combining nitrogen and hydrogen directly at high temperature and pressure. Later, it is converted into various fertilisers such as urea.</li>
        <li style={{ marginBottom: 5 }}><strong>(iii) Biological nitrogen fixation.</strong> Bacteria like <em>Rhizobium</em> and blue-green algae transform the unusable form of nitrogen into other compounds that are more readily usable. A few examples of nitrogen fixing plants are <strong>Alfalfa, Chickpea</strong> and <strong>Clover.</strong> In these plants, nitrogen is fixed through a symbiotic relationship with <em>Rhizobium</em> bacteria.</li>
      </ul>
    </li>
    <li style={{ marginBottom: 8 }}>
      <strong>Nitrification.</strong> In this process, the ammonia obtained in nitrogen fixation is converted into nitrate by the <em>Nitrosomonas</em> bacteria present in the soil. These bacteria oxidise the ammonia into nitrite (NO<Sub c="2" /><Sup c="−" />) and nitrate (NO<Sub c="3" /><Sup c="−" />) in separate processes. The nitrite produced are also converted into nitrates by bacteria <em>Nitrobacter.</em> This conversion is very important as ammonia gas is toxic for plants. The reaction involved in the process of Nitrification is as follows:
      <ChemEq key="b3-ceq-1" lhs={<>2NH<Sub c="3" /> + 3O<Sub c="2" /></>} rhs={<>2NO<Sub c="2" /><Sup c="−" /> + 2H<Sup c="+" /> + 2H<Sub c="2" />O</>} arrow="forward" />
      <ChemEq key="b3-ceq-2" lhs={<>2NO<Sub c="2" /><Sup c="−" /> + O<Sub c="2" /></>} rhs={<>2NO<Sub c="3" /><Sup c="−" /></>} arrow="forward" />
    </li>
    <li style={{ marginBottom: 8 }}>
      <strong>Assimilation.</strong> Plants, the primary producers, absorb inorganic nitrogen (ammonia, nitrite ions, nitrate ions or ammonium ions) from the soil with the help of their roots. They use it in the formation of the amino acids and proteins. This way, nitrogen enters the food chain. <em>This entire process in which plants of fungi convert inorganic nitrogen into amino acids or proteins is called assimilation.</em>
    </li>
    <li style={{ marginBottom: 8 }}>
      <strong>Ammonification.</strong> What happens when plants or animals die? or when they excrete waste? The nitrogen locked in their organic matter is not lost rather it is released back into the soil. The decomposers, namely bacteria or fungi present in the soil, get to work in a process called ammonification. In this process, they convert the organic matter back into ammonium. This process of decomposition produces ammonia and ammonium (NH<Sub c="4" /><Sup c="+" />), which is further used for other biological processes. In other words, this process returns the nitrogen to the soil as ammonia, which can then be converted back into nitrites and nitrates through nitrification, ready to be taken up by plants once more.
    </li>
    <li style={{ marginBottom: 8 }}>
      <strong>Denitrification.</strong> Final step of nitrogen cycle is denitrification. It is the process in which the nitrate (NO<Sub c="3" /><Sup c="−" />) is converted into gaseous nitrogen (N) as it was earlier available in the atmosphere. This process occurs in the absence of oxygen. The denitrifying bacterial species — <em>Clostridium</em> and <em>Pseudomonas</em> perform the process of denitrification. These bacteria process nitrate to gain oxygen and release free nitrogen gas as a byproduct.
    </li>
  </ol>,
  <SubSubHd key="sub2-nc-imp" id="s514ncimp" label="" title="Importance of Nitrogen Cycle" />,
  <ol key="b3-ol-nc-imp" style={{ paddingLeft: 28, margin: "4px 0 8px", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 5 }}>As you learned, nitrogen cycle helps in converting inert atmospheric nitrogen gas into more usable form for the plants through the biochemical process. Atmospheric nitrogen is first converted into nitrate or ammonium ions which are easily absorbed by the plant roots.</li>
    <li style={{ marginBottom: 5 }}>In the process of ammonification, decomposers (bacteria) convert the organic matter back into ammonium and hence help in cleaning the environment.</li>
    <li style={{ marginBottom: 5 }}>This cycle also helps plants to synthesize chlorophyll from nitrogenous compounds.</li>
    <li style={{ marginBottom: 5 }}>During this cycle, nitrates and nitrites are released into the soil. As a result, soil is enriched with necessary nutrients which are required for growing crops.</li>
  </ol>,

  // ── (D) OXYGEN CYCLE ─────────────────────────────────────────
  <SubHd key="sub-s514-oc" id="s514oc" label="(D)" title="Oxygen Cycle" />,
  <p key="b3-p-s514-25" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    You take a breath in, and then you let it out. But in that single action, you are participating in one of the most fundamental cycles on Earth: the oxygen cycle. As we have seen, elements like carbon and nitrogen are constantly moving through the planet's systems. Oxygen is no different, and its journey is directly tied to the energy of life itself. The main engine of the oxygen cycle is photosynthesis. Plants, algae, and some bacteria take in carbon dioxide and water, and using energy from the sun, they create sugars for fuel. The byproduct of this incredible chemical factory is oxygen, which they release into the atmosphere.
  </p>,
  <p key="b3-p-s514-26" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This released oxygen does not just float around forever. It's quickly used up by organisms for <strong>respiration.</strong> This is the process you are doing right now. You breathe in oxygen, which your cells use to break down sugars and release energy, water and carbon dioxide. Notice the perfect symmetry in the nature: plants produce what we need (oxygen and sugar), and we produce what they need (carbon dioxide and water).
  </p>,
  <DefBox key="def-s514-6">
    <strong>Photosynthesis</strong> produces oxygen, <strong>Respiration</strong> consumes it and produces carbon dioxide. This beautiful partnership forms the fastest part of the <strong>oxygen cycle.</strong>
  </DefBox>,
  <p key="b3-p-s514-27" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    While we think of oxygen as being in the air, the atmosphere is actually a tiny reservoir. <em>A reservoir is a place where a large quantity of a resource, such as water or a chemical element is stored.</em> Atmosphere holds only about 21% of the air we breathe, but it is a small fraction of the planet's total oxygen. Oxygen is also dissolved in water (hydrosphere). The vast majority, over 99%, is locked up in the Earth's crust and mantle (lithosphere or so called geosphere). It's bound chemically to other elements in silicate and oxide minerals, forming the rocks right under your feet. This oxygen is part of a much, much slower cycle. It's released very gradually through chemical weathering, where rocks are broken down by wind and rain.
  </p>,
  <DefBox key="def-s514-7">
    Therefore, <strong>oxygen cycle</strong> can be defined as a biogeochemical process which helps in maintaining the oxygen level by moving through three main spheres of the earth, atmosphere, lithosphere and biosphere.
  </DefBox>,
  <Fig key="fig-5-18"
    src={CONTENT_IMAGES.CONTENT_IMAGE_7C6A61B7878D83D16828}
    num="Fig. 5.18" caption="The Oxygen Cycle" />,
  <SubSubHd key="sub2-oc-stages" id="s514ocst" label="" title="Three Stages of the Oxygen Cycle" />,
  <p key="b3-p-s514-28" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    With the help of Fig. 5.18, one can visualize three steps involved in the oxygen cycle:
  </p>,
  <ol key="b3-ol-oc" style={{ paddingLeft: 28, margin: "4px 0 8px", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 5 }}>During the process of photosynthesis, all green plants take CO<Sub c="2" /> from atmosphere and release oxygen back into the atmosphere as a byproduct.</li>
    <li style={{ marginBottom: 5 }}>All aerobic organisms use free oxygen available in atmosphere and exhale carbon dioxide. This process is known as respiration.</li>
    <li style={{ marginBottom: 5 }}>Animals exhale carbon dioxide back into the atmosphere which is again used by the plants during photosynthesis and release again oxygen. Now oxygen is balanced within the atmosphere. This completes the oxygen cycle.</li>
  </ol>,
  <p key="b3-p-s514-29" style={{ marginBottom: 6 }}>The four main processes that use atmospheric oxygen are:</p>,
  <ul key="b3-ul-oc-proc" style={{ paddingLeft: 28, margin: "4px 0 8px", listStyleType: "disc", fontSize: 14, lineHeight: 1.9 }}>
    <li style={{ marginBottom: 5 }}><strong>Breathing.</strong> In this process, all living organisms, including plants, animals and humans inhale oxygen from the atmosphere into the cells of an organism and exhale carbon dioxide back into the atmosphere.</li>
    <li style={{ marginBottom: 5 }}><strong>Combustion.</strong> The process of burning of organic matter such as fossil fuels and wood takes place in presence of oxygen. This process releases carbon dioxide into the atmosphere.</li>
    <li style={{ marginBottom: 5 }}><strong>Rusting.</strong> Metals like iron or its alloys in presence of oxygen and water form oxides and this process is called as oxidation.</li>
    <li style={{ marginBottom: 5 }}><strong>Decomposition.</strong> When an organism (dry leaves, wood or animals etc.) dies, it decomposes into the ground. The organic matter along with the carbon, oxygen, water and other components are returned into the soil and air. This process is carried out by the invertebrates, including fungi, bacteria and some insects which are collectively called as the <strong>decomposers.</strong> The entire process requires oxygen and releases carbon dioxide.</li>
  </ul>,

  // ── 5.15 INTERCONNECTIONS AMONG BIOGEOCHEMICAL PROCESSES ─────
  <SecHd key="sec-s515" id="s515" label="5.15." title="Interconnections Among Biogeochemical Processes" />,
  <p key="b3-p-s515-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The four biogeochemical cycles we have explored, do not operate in isolation rather they are deeply interconnected. A change in one cycle can profoundly affect the others. Consider a forest. Trees pull water from the soil and release it into the atmosphere through transpiration, a key part of the water cycle. They also absorb carbon dioxide for photosynthesis, locking carbon into their biomass and releasing the oxygen we breathe. When trees die and decompose, this carbon is returned to the soil, and nitrogen is made available to other plants. This single ecosystem is a hub where all four cycles intersect.
  </p>,

  // ── 5.16 HUMAN IMPACT ON FOUR FUNDAMENTAL GEOCHEMICAL PROCESSES
  <SecHd key="sec-s516" id="s516" label="5.16." title="Human Impact on Four Fundamental Geochemical Processes" />,
  <p key="b3-p-s516-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    For years, these cycles have maintained a natural balance. However, human activities over the last few centuries have begun to disrupt them on a global scale. Activities like burning fossil fuels, large-scale deforestation, and industrial agriculture are pushing these natural systems out of equilibrium.
  </p>,
  <p key="b3-p-s516-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Fossil fuels such as coal, oil, and natural gas are the remnants of ancient life. They are vast stores of carbon locked away underground for millions of years. When we burn them for energy, we release enormous quantities of carbon dioxide (CO<Sub c="2" />) into the atmosphere far faster than plants and oceans can absorb it. This is the primary driver of modern climate change.
  </p>,
  <p key="b3-p-s516-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Deforestation adversely affects the carbon and water cycles. Removing forests eliminates a vital carbon sink, meaning less CO<Sub c="2" /> is absorbed from the atmosphere. It also disrupts regional rainfall patterns by reducing transpiration, leading to drier climates and increased soil erosion, which can wash excess nutrients into waterways.
  </p>,
  <p key="b3-p-s516-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Further, industrial agriculture, particularly the heavy use of synthetic fertilizers, has dramatically altered the nitrogen cycle. These fertilizers introduce massive amounts of reactive nitrogen into ecosystems. Much of it isn't absorbed by crops and instead runs off into rivers and lakes.
  </p>,
  <SubHd key="sub-s516-cons" id="s516cons" label="" title="Consequences of Disruption" />,
  <p key="b3-p-s516-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    These disruptions have far-reaching consequences. The excess carbon in the atmosphere traps heat, warming the planet and altering climate patterns. This leads to more extreme weather events, rising sea levels, and melting glaciers. The ocean absorbs about a quarter of the CO<Sub c="2" /> we release. While this helps slow climate change, it comes at a cost. When CO<Sub c="2" /> dissolves in seawater, it forms carbonic acid, making the ocean more acidic. This process, known as <strong><em>ocean acidification</em></strong>, harms marine life, particularly organisms with shells and skeletons like corals and shellfish.
  </p>,
  <p key="b3-p-s516-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Meanwhile, the nitrogen runoff from agricultural fields fuels massive algal blooms in freshwater and coastal ecosystems. When these algae die and decompose, the process consumes large amounts of dissolved oxygen, creating hypoxic "dead zones" where fish and other aquatic life cannot survive.
  </p>,
  <HumanImpactTable key="tbl-human-impact" />,
  <SubHd key="sub-s516-restore" id="s516restore" label="" title="Restoring the Balance" />,
  <p key="b3-p-s516-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Understanding how the human beings impact these cycles is the first step toward finding solutions. Mitigating these challenges requires a concerted effort to reduce our footprint. This includes transitioning to renewable energy sources like solar and wind to cut carbon emissions, practicing sustainable agriculture to manage nitrogen use more effectively, and protecting and restoring forests to bolster our planet's natural carbon sinks. By addressing the root causes of these imbalances, we can help restore the health of Earth's interconnected systems and build a more sustainable future.
  </p>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s51",        label: "5.1.",  title: "Introduction",                                level: 1 },
  { id: "s52",        label: "5.2.",  title: "Structure of the Atmosphere",                 level: 1 },
  { id: "s53",        label: "5.3.",  title: "Solar Energy",                                level: 1 },
  { id: "s53wp",      label: "",      title: "Wave Parameters",                             level: 2 },
  { id: "s54",        label: "5.4.",  title: "Electromagnetic Spectrum",                    level: 1 },
  { id: "s55",        label: "5.5.",  title: "Interaction of Solar Energy with Earth",      level: 1 },
  { id: "s55var",     label: "",      title: "Variability of Insolation",                   level: 2 },
  { id: "s55cross",   label: "",      title: "Crossing of Solar Radiation",                 level: 2 },
  { id: "s55sunrise", label: "",      title: "Why Sunrise/Sunset appear Red?",              level: 2 },
  { id: "s56",        label: "5.6.",  title: "Heating and Cooling of Atmosphere",           level: 1 },
  { id: "s56terr",    label: "",      title: "Terrestrial Radiation",                       level: 2 },
  { id: "s57",        label: "5.7.",  title: "Heat Budget of Earth",                        level: 1 },
  { id: "s58",        label: "5.8.",  title: "The Greenhouse Effect",                       level: 1 },
  { id: "s59",        label: "5.9.",  title: "Differential Warming and Winds Formation",    level: 1 },
  { id: "s510",       label: "5.10.", title: "Variation in the Heat Budget",                level: 1 },
  { id: "s511",       label: "5.11.", title: "Winds Formation",                             level: 1 },
  { id: "s511sb",     label: "",      title: "Sea Breeze and Land Breeze",                  level: 2 },
  { id: "s511mon",    label: "",      title: "Monsoons",                                    level: 2 },
  { id: "s511mv",     label: "",      title: "Mountain and Valley Winds",                   level: 2 },
  { id: "s512",       label: "5.12.", title: "Earth's Systems and Human Impact",            level: 1 },
  { id: "s512four",   label: "",      title: "Earth's Four Spheres",                        level: 2 },
  { id: "s513",       label: "5.13.", title: "Human Impact on Earth's Processes",           level: 1 },
  { id: "s513cc",     label: "",      title: "Cities and Climate",                          level: 2 },
  { id: "s513wp",     label: "",      title: "Water Under Pressure",                        level: 2 },
  { id: "s513la",     label: "",      title: "Land and Air",                                level: 2 },
  { id: "s513ar",     label: "",      title: "Acid Rain",                                   level: 2 },
  { id: "s513gw",     label: "",      title: "Global Warming",                              level: 2 },
  { id: "s514",       label: "5.14.", title: "Biogeochemical Cycles",                       level: 1 },
  { id: "s514wc",     label: "(A)",   title: "Water Cycle",                                 level: 2 },
  { id: "s514cc",     label: "(B)",   title: "Carbon Cycle",                                level: 2 },
  { id: "s514nc",     label: "(C)",   title: "Nitrogen Cycle",                              level: 2 },
  { id: "s514oc",     label: "(D)",   title: "Oxygen Cycle",                                level: 2 },
  { id: "s515",       label: "5.15.", title: "Interconnections Among Biogeochemical Processes", level: 1 },
  { id: "s516",       label: "5.16.", title: "Human Impact on Geochemical Processes",       level: 1 },
];

// ── CONCAT ALL CONTENT ARRAYS ────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter5() {
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
