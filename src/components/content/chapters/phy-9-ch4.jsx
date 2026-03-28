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
      border: "1.5px dashed #c0126a", background: "#f9eef4", minHeight: 80,
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
      PROBLEMS BASED ON {topic}
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
    <button
      onClick={() => setOpen(o => !o)}
      aria-label={open ? "Close table of contents" : "Open table of contents"}
      style={{
        position: "fixed", top: 14, left: 14, zIndex: 1100,
        background: "#fff", color: P_COLOR, border: "2px solid #2563eb",
        borderRadius: 8, width: 40, height: 40, cursor: "pointer",
        fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
        fontFamily: "system-ui,sans-serif",
      }}>
      {open ? "✕" : "☰"}
    </button>
  );
}

function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.18)",
      backdropFilter: "blur(2px)",
      WebkitBackdropFilter: "blur(2px)",
    }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1060,
      width: 260, height: "100vh",
      background: "#fff", borderRight: "1px solid #e0e0e0",
      boxShadow: "4px 0 24px rgba(0,0,0,0.13)",
      transform: open ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
      overflowY: "auto", overflowX: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      <div style={{
        background: P_COLOR, color: "#fff", padding: "14px 16px 12px",
        fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 13, letterSpacing: 2,
        flexShrink: 0,
      }}>
        TABLE OF CONTENTS
      </div>
      <nav style={{ padding: "8px 0", flex: 1 }}>
        {tocItems.map(item => (
          <button key={item.id} onClick={() => handleClick(item.id)}
            style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              padding: item.level === 1 ? "6px 16px" : item.level === 2 ? "4px 16px 4px 28px" : "3px 16px 3px 40px",
              fontFamily: "'Merriweather Sans',Arial,sans-serif",
              fontWeight: item.level === 1 ? 700 : 400,
              fontSize: item.level === 1 ? 12 : 11,
              color: item.level === 1 ? P_COLOR : "#444",
              borderLeft: item.level === 1 ? "3px solid #c0126a" : "none",
              marginBottom: 2, lineHeight: 1.4,
            }}>
            {item.label} {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

const chapterNumber = "4";
const chapterTitle = "Sound";

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

// ── TABLE SUB-COMPONENTS ─────────────────────────────────────

const SpeedOfSoundTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontWeight: 700, fontSize: 13.5, margin: "0 0 8px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 4.1. Speeds of sound in Different Media at 25°C
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>State</td>
          <td style={th}>Substance</td>
          <td style={th}>Speed in m/s</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...td, fontWeight: 700 }} rowSpan={5}>(a) Gases</td>
          <td style={td}>1. Hydrogen</td>
          <td style={{ ...td, textAlign: "center" }}>1284</td>
        </tr>
        <tr>
          <td style={td}>2. Helium</td>
          <td style={{ ...td, textAlign: "center" }}>965</td>
        </tr>
        <tr>
          <td style={td}>3. Air</td>
          <td style={{ ...td, textAlign: "center" }}>346</td>
        </tr>
        <tr>
          <td style={td}>4. Oxygen</td>
          <td style={{ ...td, textAlign: "center" }}>316</td>
        </tr>
        <tr>
          <td style={td}>5. Sulphur dioxide</td>
          <td style={{ ...td, textAlign: "center" }}>213</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }} rowSpan={4}>(b) Liquids</td>
          <td style={td}>1. Water (sea)</td>
          <td style={{ ...td, textAlign: "center" }}>1531</td>
        </tr>
        <tr>
          <td style={td}>2. Water (distilled)</td>
          <td style={{ ...td, textAlign: "center" }}>1498</td>
        </tr>
        <tr>
          <td style={td}>3. Ethanol</td>
          <td style={{ ...td, textAlign: "center" }}>1207</td>
        </tr>
        <tr>
          <td style={td}>4. Methanol</td>
          <td style={{ ...td, textAlign: "center" }}>1103</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }} rowSpan={6}>(c) Solids</td>
          <td style={td}>1. Aluminium</td>
          <td style={{ ...td, textAlign: "center" }}>6420</td>
        </tr>
        <tr>
          <td style={td}>2. Nickel</td>
          <td style={{ ...td, textAlign: "center" }}>6040</td>
        </tr>
        <tr>
          <td style={td}>3. Steel</td>
          <td style={{ ...td, textAlign: "center" }}>5960</td>
        </tr>
        <tr>
          <td style={td}>4. Iron</td>
          <td style={{ ...td, textAlign: "center" }}>5950</td>
        </tr>
        <tr>
          <td style={td}>5. Brass</td>
          <td style={{ ...td, textAlign: "center" }}>4700</td>
        </tr>
        <tr>
          <td style={td}>6. Glass (Flint)</td>
          <td style={{ ...td, textAlign: "center" }}>3980</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ── BATCH 1 CONTENT ──────────────────────────────────────────
const content_b1 = [

  <SecHd key="sec-s41" id="s41" label="4.1" title="Introduction" />,

  <p key="b1-p-s41-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    A world without sound can be imagined only with mixed feelings of horror and fun. The beautiful songs,
    the chirping of the birds and learned discourses would have existed only in dreams. There would have been
    a lot of misunderstanding right from individuals to the nations as no one could have been able to speak to
    somebody else, what to talk of hearing each other. Two individuals engaged in an effort to talk to each other,
    might have been misunderstood as jeering at each other like monkeys, resulting possibly in a quarrel. In these
    strange circumstances, the ear would have been absolutely useless and so would be the tongue and lips to a
    large extent. We can extend this imagination to any limit of fantasy, resulting in greater and greater consolation
    that nothing really exists like this.
  </p>,

  <p key="b1-p-s41-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The study of sound is largely based on the classical contribution of <strong>Helmholtz</strong> and{" "}
    <strong>Lord Reyleigh.</strong> The Acoustical Society of America was founded in 1928 and, today, both
    universities and industrial research laboratories, such as Bell Telephone Laboratories are engaged in
    important investigations in the field of theoretical and applied sound. The significance of sound in human
    communication has grown rapidly with developments in radio, television and recorded speech and music.
  </p>,

  <p key="b1-p-s41-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In this chapter, we shall consider simple physical aspects of sound, its mode of production and propagation,
    its nature and its role in our daily life.
  </p>,

  <SecHd key="sec-s42" id="s42" label="4.2" title="What is Sound?" />,

  <p key="b1-p-s42-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We must understand at the outset that the word sound has two distinct meanings.
  </p>,

  <p key="b1-p-s42-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. <em>Subjective or psychological meaning</em></strong> which refers to auditory (hearing)
    sensation which ceases when the sound sensing organ (ear) is withdrawn from the scene.
  </p>,

  <p key="b1-p-s42-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. <em>Objective or physical meaning</em></strong> which refers to the energy reaching the ear
    from outside. The energy continues to propagate even if no ear is present to detect it.
  </p>,

  <p key="b1-p-s42-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    From our present point of view, <strong><em>sound is mechanical energy which produces sensation of hearing.</em></strong>
  </p>,

  <KBBox key="kb-s42">
    <KBHd>NOTE</KBHd>
    <p style={{ margin: "0 0 4px", fontSize: 14 }}>
      The perception of sound is largely <em>physiological</em> in nature. However, to a great extent, what we
      'hear' is the result of the way our nervous system acts in response to sound stimuli. Hence, the term{" "}
      <em>'psychology of sound'</em>. Recently, the mental or psychological aspect of sound production has been
      made a field of study known as <em>psychoacoustics.</em>
    </p>
  </KBBox>,

  <SecHd key="sec-s43" id="s43" label="4.3" title="Production of Sound" />,

  <p key="b1-p-s43-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In order to know how sound is produced, let us perform the following five simple experiments.
  </p>,

  <p key="b1-p-s43-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Experiment 1.</strong> Take a metallic wire <em>AB</em> and stretch
    it tightly between two nails fixed on a table top as shown in Fig. 4.1 (a). When we pluck the wire, a
    sound is heard. If a V-shaped small paper rider (<em>R</em>) is placed near the centre of the wire, it
    starts vibrating and in case, the rider is at the centre of the wire, it flies off. This proves that the{" "}
    <em>sound is produced due to vibrations in the wire.</em>
  </p>,

  <div key="b1-fig41" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "16px 0", flexWrap: "wrap" }}>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_706F7DB3B81E226D1F40}
        alt="Fig 4.1(a) Wire experiment"
        style={{ maxWidth: 180, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(a)</p>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_8F44CE78A1F03CB4E51B}
        alt="Fig 4.1(b) Bell experiment"
        style={{ maxWidth: 140, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(b)</p>
    </div>
  </div>,
  <p key="b1-fig41-caption" style={{ textAlign: "center", fontSize: 12.5, color: "#444", fontStyle: "italic", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR, fontStyle: "normal" }}>Fig. 4.1.</strong>
  </p>,

  <p key="b1-p-s43-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Experiment 2.</strong> Strike a bell, <em>B</em> with a hammer, it
    produces sound. On touching it with finger, we feel that the bell is in a state of vibration. A pith-ball,
    <em> P</em> suspended near the bell moves from its equilibrium position <em>P</em> to <em>P′</em> as
    shown in Fig. 4.1 (b). This again demonstrates that the{" "}
    <em>sound is produced due to vibrations in the bell.</em>
  </p>,

  <p key="b1-p-s43-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, <strong><em>sound is produced by vibrating objects.</em></strong>
  </p>,

  <p key="b1-p-s43-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Experiment 3. Vibration of a Membrane:</strong> Take a drum (dholak)
    and sprinkle some grains or small pieces of paper on its stretched membrane, Fig. 4.2. When we strike the
    membrane with a stick, we hear a sound and observe that the grains or paper pieces start jumping up and
    down. This shows that sound is produced by the vibration of the stretched membrane.
  </p>,

  <Fig key="fig-4-2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_024FA1E2317A4B52BEAE}
    num="Fig. 4.2" caption="Vibration of a membrane (drum/dholak)"
  />,

  <p key="b1-p-s43-6" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Experiment 4. Vibration of Air Column:</strong> Take an empty glass
    bottle and blow air across its mouth, Fig. 4.3. A sound is produced. The sound is produced due to the
    vibration of the air column inside the bottle. By adding water to change the length of the air column, we
    can produce sounds of different pitches. This demonstrates that vibrating air columns also produce sound.
  </p>,

  <Fig key="fig-4-3"
    src={CONTENT_IMAGES.CONTENT_IMAGE_932F304DCD1BFB262285}
    num="Fig. 4.3" caption="Vibration of Air Column"
  />,

  <p key="b1-p-s43-7" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Experiment 5. Vibration of a Tuning Fork:</strong> Strike a tuning
    fork on a rubber pad. A humming sound is heard. Touch the pronges of the vibrating tuning fork to the
    surface of water in a beaker. Fig. 4.4. Water splashes, indicating that the pronges are vibrating. This
    confirms that sound is produced by vibrating objects. Thus, sound is produced by vibrating objects. The
    vibrations can be in strings, membrane, air columns, or solid materials.
  </p>,

  <Fig key="fig-4-4"
    src={CONTENT_IMAGES.CONTENT_IMAGE_A987F9D2B6FBEF91E857}
    num="Fig. 4.4" caption="Vibration of Tuning Fork in Water"
  />,

  <SecHd key="sec-s44" id="s44" label="4.4" title="Propagation of Sound" />,

  <p key="b1-p-s44-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We have just learnt that sound is produced by vibrating objects. In order to reach the listener, it passes
    through a medium which may be a liquid, a solid or a gas. Let us now briefly discuss as to how sound
    travels from the source to the listener.
  </p>,

  <p key="b1-p-s44-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>i</em>)</strong> The vibrating object sets the particles of the medium around it into
    vibration (<em>i.e.</em>, to and fro motion).
  </p>,

  <p key="b1-p-s44-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>ii</em>)</strong> A particle (say 1), which is in contact with the vibrating object moves
    towards the right (say) as shown in Fig. 4.5(a). This particle exerts a force on a neighbouring particle
    (2) which is displaced from its equilibrium position and also starts moving towards right. After displacing
    particle (2), particle (1) comes back to its original position whereas particle (2) exerts a force on
    particle (3) in a similar fashion as shown in Fig. 4.5 (b). This process, in which each particle strikes
    its neighbour while vibrating without leaving its mean position, continues till the particle near the
    listener's ear starts vibrating. All particles of the medium between the source of sound and the listener
    are set vibrating in the similar fashion and the sound is carried to the listener.
  </p>,

  <Fig key="fig-4-5"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C8784630FA713E2BA82C}
    num="Fig. 4.5" caption="Propagation of sound through particles of the medium"
  />,

  <p key="b1-p-s44-4" style={{ textAlign: "justify", fontStyle: "italic", marginBottom: 8 }}>
    It is important to note that the particles of the medium only vibrate and do not actually move from the
    vibrating body to the listener. Once the vibrations of the source stop, the particles no longer vibrate
    and no sound reaches the listener.
  </p>,

  <p key="b1-p-s44-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, <strong><em>sound created by the source reaches the listener through the particles of the medium
    without any net transport of the medium.</em></strong>
  </p>,

  <p key="b1-p-s44-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In fact, whatever travels through the medium is a disturbance carrying sound energy. This disturbance is
    called a <strong>sound wave</strong> and the motion associated with this wave is called{" "}
    <strong>wave motion.</strong> Thus,
  </p>,

  <DefBox key="def-s44-1">
    <strong>Wave motion</strong> <em>is a form of disturbance (a mode of energy transfer) which is due to
    repeated vibrations of the particles of the medium about their mean positions and the motion is handed
    over from one particle to the other without any net transport of the medium.</em>
  </DefBox>,

  <p key="b1-p-s44-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since, sound waves are produced by the vibrations of the particles of the medium, these are called{" "}
    <strong>mechanical waves.</strong> In fact, whenever sound waves travel, it is the energy that is
    transferred from the source to the listener without the motion of the medium.
  </p>,

  <SecHd key="sec-s45" id="s45" label="4.5" title="Sound Needs a Medium to Travel" />,

  <p key="b1-p-s45-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since sound is a mechanical wave, it needs a material medium for its propagation and cannot travel through
    vacuum. This can be demonstrated by the following experiment.
  </p>,

  <p key="b1-p-s45-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Let us consider an electric bell, <em>E</em> contained in a bell-jar. The electric bell is connected to a
    battery, <em>B</em> through a key, <em>K</em> as shown in Fig. 4.6. If we insert the plug in the key{" "}
    <em>K</em>, the electric circuit is closed and a sound is heard. When we go on taking air out of the
    bell-jar, the sound produced by the bell goes on getting fainter and fainter. If the process of evacuating
    the jar is continued so that a near perfect vacuum is created within it, we shall hear practically no sound
    though the hammer <em>H</em> of the bell will be seen to strike the bell and create sound. This sound is
    not heard as there is no medium in the jar to carry the sound to the listener.
  </p>,

  <Fig key="fig-4-6"
    src={CONTENT_IMAGES.CONTENT_IMAGE_FD0A805AF7E316DEAD04}
    num="Fig. 4.6" caption="Bell-jar experiment demonstrating sound needs a medium"
  />,

  <p key="b1-p-s45-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, <strong><em>a material medium is essential for the propagation of sound.</em></strong>
  </p>,

  <p key="b1-p-s45-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We have so far learnt that: <strong>(<em>i</em>)</strong> to produce sound, we must supply energy for the
    vibration of the source and <strong>(<em>ii</em>)</strong> for the onward transmission of this energy,
    <em> i.e.</em>, sound, we must provide a material medium.
  </p>,

  <p key="b1-p-s45-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When we say that sound is travelling from a vibrating source, all that we understand is that energy
    (<em>i.e.</em>, sound) emitted by the source is being transmitted through the medium in the direction of
    sound. When this energy falls on the ear drum of a listener, it produces in him the sensation of hearing.
    Though vibrations of any frequency are able to carry energy through the medium, yet only those vibrations
    which lie in the frequency range of 20 Hz to 20 kHz produce sensation of hearing when they fall on the
    ear. By sound, we therefore, normally mean that portion of vibratory energy which produces in us the
    sensation of hearing. Thus,
  </p>,

  <DefBox key="def-s45-1">
    <strong>Sound</strong> <em>is a form of energy which is emitted by a vibrating source and transmitted
    through a material medium producing in us the sensation of hearing.</em>
  </DefBox>,

  <p key="b1-p-s45-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The waves that carry sound energy are called <strong>sound waves.</strong>
  </p>,

  <p key="b1-p-s45-7" style={{ textAlign: "justify", marginBottom: 4 }}>
    <strong>Sound Can Travel Through Different Media</strong>
  </p>,
  <p key="b1-p-s45-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Sound can travel through solids, liquids and gases. The speed of sound varies in different media.
  </p>,
  <p key="b1-p-s45-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong><em>Through Solids:</em></strong> If you place your ear on a railway track, you can hear the sound
    of an approaching train much before you can hear it through air. This is because sound travels faster
    through the solid metal track than through air.
  </p>,
  <p key="b1-p-s45-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong><em>Through Liquids:</em></strong> Dolphins and whales communicate over vast distances underwater.
    Fishermen know that loud sounds can scare fish away. This shows that sound can travel through water.
  </p>,
  <p key="b1-p-s45-11" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong><em>Through Gases:</em></strong> Our everyday experience of hearing sounds through air is evidence
    that sound travels through gases.
  </p>,

  <KBBox key="kb-s45">
    <KBHd>NOTE</KBHd>
    <p style={{ fontWeight: 700, margin: "0 0 6px", fontSize: 13.5 }}>
      Some interesting consequences of the role of medium are as follows.
    </p>
    <ol style={{ paddingLeft: 22, fontSize: 14, lineHeight: 1.75, margin: 0 }}>
      <li style={{ marginBottom: 4 }}>
        Due to the absence of atmosphere (<em>i.e.</em>, a material medium), two astronauts cannot talk to
        each other on the Moon as they do on the Earth.
      </li>
      <li style={{ marginBottom: 4 }}>
        For similar reason, one cannot hear a bomb explosion on the Moon as it has no atmosphere.
      </li>
      <li style={{ marginBottom: 4 }}>
        We can be heard in an adjoining room even when we are talking in another room with doors tightly shut.
        This is due to the reason that even though the doors of the rooms are shut, these are connected to each
        other through air, walls and the material of shut doors, <em>i.e.</em>, a material medium is there to
        carry sound from one room to the other.
      </li>
    </ol>
  </KBBox>,

  <SecHd key="sec-s46" id="s46" label="4.6" title="Production of Compressions and Rarefactions Near a Source of Sound" />,

  <p key="b1-p-s46-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As said earlier, a source of sound puts the particles of the medium into vibratory motion. Though the
    medium does not bodily move from the source to the listener, there occur changes in its density and
    pressure as sound propagates through it. Air is the most common medium through which sound travels and it
    does so with the help of intervening layers of air. Let us consider a vibrating tuning fork as a source of
    sound and confine our attention to its right hand prong only.
  </p>,

  <p key="b1-p-s46-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>i</em>)</strong> When the right hand prong moves from left extreme (<em>L</em>) towards the
    right extreme (<em>R</em>), it compresses the layer of air in front of it. As a result of this, the
    pressure (as well as density) of this layer increases.{" "}
    <strong><em>This layer (or region) of compressed air is called a{" "}
    <span style={{ color: P_COLOR }}>compression.</span></em></strong> Now, this compression compresses the
    layers next to it and thus a pulse of compression travels towards right as shown in Fig. 4.7 (a).
  </p>,

  <p key="b1-p-s46-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>ii</em>)</strong> When the prong moves from its right extreme (<em>R</em>) to the left
    extreme (<em>L</em>), the air in front of the prong expands (<em>i.e.</em>, gets rarefied). As a result
    of this, pressure (as well as density) of this layer decreases.{" "}
    <strong><em>This region of rarefied air is called a{" "}
    <span style={{ color: P_COLOR }}>rarefaction.</span></em></strong>{" "}
    <em>It follows the earlier compression, which by that time has moved forward as shown in Fig. 4.7 (b).
    Thus, in one complete vibration of the prong (i.e., from L to R and back from R to L), one compression
    and one rarefaction are formed.</em>
  </p>,

  <Fig key="fig-4-7"
    src={CONTENT_IMAGES.CONTENT_IMAGE_2532F1397B9D1FC90E37}
    num="Fig. 4.7" caption="Production of compressions and rarefactions"
  />,

  <p key="b1-p-s46-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iii</em>)</strong> As long as the prong continues to vibrate, compressions and rarefactions
    are sent out in regular succession. These compressions and rarefactions travelling towards right and
    alternating with each other, constitute a sound wave as shown in Fig. 4.7 (c).
  </p>,

  <p key="b1-p-s46-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iv</em>)</strong> The left hand prong sends a sound wave towards the left in a similar way
    in the form of compressions and rarefactions.
  </p>,

  <p key="b1-p-s46-6" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>v</em>)</strong> A compression is formed due to an increase in pressure and consequently an
    increase in density of the medium. Conversely, a rarefaction is formed due to a decrease in pressure and
    consequently a decrease in density. We know that a sound wave propagates as a series of compressions and
    rarefactions.
  </p>,

  <p key="b1-p-s46-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, <strong><em>a sound wave can be considered as propagation of pressure or density variations in
    the medium.</em></strong>
  </p>,

  <SecHd key="sec-s47" id="s47" label="4.7" title="Sound Waves are Longitudinal Waves" />,

  <p key="b1-p-s47-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In order to understand the nature of longitudinal waves, let us take a slinky <em>AB</em> (a slinky is
    a toy in the form of a long flexible spring which can be very easily extended or compressed) and arrange
    it in the horizontal position with its end <em>B</em> fixed. Initially, when the slinky is neither
    compressed nor stretched, there is a fixed distance between its loops as shown in Fig. 4.8 (a).
  </p>,

  <Fig key="fig-4-8"
    src={CONTENT_IMAGES.CONTENT_IMAGE_03E158CC99CB9E3B2839}
    num="Fig. 4.8" caption="Longitudinal wave in a slinky — compressions (C) and rarefactions (R)"
  />,

  <p key="b1-p-s47-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>i</em>)</strong> When the free end <em>A</em> of the slinky is <em>pushed forward</em>{" "}
    slightly, a few loops near it are compressed.{" "}
    <strong><em>This region where the loops of the slinky are closer to each other than the normal distance
    is called a <span style={{ color: P_COLOR }}>compression.</span></em></strong> The compression (<em>C</em>)
    so formed travels along the slinky till it reaches <em>B</em>.
  </p>,

  <p key="b1-p-s47-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>ii</em>)</strong> If the free end of slinky is <em>pulled outwards,</em> a few loops near
    it are pulled away from each other.{" "}
    <strong><em>This region where the loops of the slinky are farther apart than the normal distance is called
    a <span style={{ color: P_COLOR }}>rarefaction.</span></em></strong> The rarefaction (<em>R</em>) so formed
    also travels along the slinky and follows the compression produced earlier.
  </p>,

  <p key="b1-p-s47-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iii</em>)</strong> If the free end of the slinky is <em>pushed and pulled</em> at regular
    intervals, a series of compressions and rarefactions are set up in the slinky which follow each other at
    regular intervals as shown in Fig. 4.8 (b).
  </p>,

  <p key="b1-p-s47-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iv</em>)</strong> If a dot (<em>D</em>) is marked on the slinky, it is found to move back
    and forth.
  </p>,

  <p key="b1-p-s47-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, <strong><em>we conclude that the loops of the slinky move back and forth in the same direction in
    which a wave comprising of compressions and rarefactions travels. This type of wave is called a{" "}
    <span style={{ color: P_COLOR }}>longitudinal wave.</span></em></strong>
  </p>,

  <p key="b1-p-s47-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Hence, <strong><em>a sound wave which propagates as a series of compressions and rarefactions is a{" "}
    <span style={{ color: P_COLOR }}>longitudinal wave.</span></em></strong> In general,
  </p>,

  <DefBox key="def-s47-1">
    A wave motion is said to be <strong style={{ color: P_COLOR }}>longitudinal</strong>{" "}
    <em>if the particles of the medium through which the wave propagates vibrate in a direction parallel to
    the direction of propagation of the wave.</em>
  </DefBox>,

  <SecHd key="sec-s48" id="s48" label="4.8" title="Transverse Wave Motion" />,

  <p key="b1-p-s48-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Apart from longitudinal wave motion, there is another type of wave motion, called the transverse wave
    motion. In a transverse wave motion, the particles oscillate up and down about their mean positions along
    the direction of propagation of the wave as shown in Fig. 4.9. Thus,
  </p>,

  <DefBox key="def-s48-1">
    A wave-motion is said to be <strong style={{ color: P_COLOR }}>transverse</strong>{" "}
    <em>if the particles of the medium through which the wave propagates vibrate in a direction perpendicular
    to the direction of propagation of the wave.</em>
  </DefBox>,

  <Fig key="fig-4-9"
    src={CONTENT_IMAGES.CONTENT_IMAGE_652AB19C774B8898F202}
    num="Fig. 4.9" caption="Transverse wave — crests (C) and troughs (T)"
  />,

  <p key="b1-p-s48-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Unlike longitudinal waves, there is no pressure (or density) variation in case of transverse waves. In
    fact, transverse waves involve changes in the shape of the medium.
  </p>,
  <p key="b1-p-s48-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    A transverse wave is propagated in the form of crests (<em>C</em>) and troughs (<em>T</em>).
  </p>,
  <p key="b1-p-s48-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(a) Crest.</strong> The <em>hump</em> or <em>elevation</em> in a
    medium through which a transverse wave is passing is called a crest.
  </p>,
  <p key="b1-p-s48-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(b) Trough.</strong> The <em>hollow</em> or <em>depression</em> in a
    medium through which a transverse wave is passing is called a trough.
  </p>,
  <p key="b1-p-s48-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The distance between the centres of two consecutive crests or troughs is called the <em>wavelength</em>{" "}
    (λ).
  </p>,
  <p key="b1-p-s48-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    A few <em>examples of transverse wave motion</em> are:
  </p>,
  <p key="b1-p-s48-8" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>i</em>)</strong> Waves produced when a string stretched between two points is plucked at
    the centre. The portions of the string where the displacement is <em>positive</em> are called{" "}
    <em>crests</em> and the portions where it is negative are called <em>troughs.</em>
  </p>,
  <p key="b1-p-s48-9" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>ii</em>)</strong> Light waves, heat waves, radio waves. These waves do not need a medium
    for their propagation as these are not mechanical waves.
  </p>,
  <p key="b1-p-s48-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    You will learn in Class XII that these waves, are in fact, electromagnetic waves.
  </p>,

  <SecHd key="sec-s49" id="s49" label="4.9" title="Variation in Pressure and Density of Medium due to Sound Wave" />,

  <p key="b1-p-s49-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As said earlier, a sound wave is a longitudinal wave which travels in the form of compressions and
    rarefactions which are defined as follows.
  </p>,

  <p key="b1-p-s49-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Compression.</strong>{" "}
    <strong><em>A portion of the medium where a temporary reduction in volume and consequently an increase
    in density (and pressure) takes place when a sound wave passes through the medium is called a compression
    or a condensation.</em></strong>
  </p>,
  <p key="b1-p-s49-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In a compression, the particles of the medium lie closer to each other than they normally are.
  </p>,

  <p key="b1-p-s49-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Rarefaction.</strong>{" "}
    <strong><em>A portion of the medium where a temporary increase in volume and consequently a decrease in
    density takes place when a sound wave passes through the medium is called a rarefaction.</em></strong>
  </p>,
  <p key="b1-p-s49-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In a rarefaction, the particles of the medium lie farther apart than the normal distance between them.
  </p>,

  <p key="b1-p-s49-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The variation in pressure and density when a sound wave travels in a medium is shown in the graph of
    Fig. 4.10. A few important terms connected with a sound wave follow from this graph.
  </p>,

  <p key="b1-p-s49-7" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>a</em>)</strong> A compression is represented by a <em>peak</em> and a rarefaction by a{" "}
    <em>valley</em> (<em>i.e.</em>, the lower portion of the curve). A peak is called the <em>crest</em> and
    a valley is called the <em>trough</em> of the wave.
  </p>,

  <p key="b1-p-s49-8" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>b</em>)</strong> The <em>points</em> of maximum density (or pressure) and minimum density
    (or pressure) are also called crests and troughs respectively.
  </p>,

  <p key="b1-p-s49-9" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(<em>c</em>) Amplitude (A).</strong>{" "}
    <strong><em>The magnitude of the maximum disturbance in the medium on either side of the mean position
    is called the amplitude of the wave.</em></strong> It is usually represented by the letter <em>A.</em>
  </p>,
  <p key="b1-p-s49-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In case of sound, the <strong>unit of <em>A</em></strong> is the same as that of density or pressure.
  </p>,

  <p key="b1-p-s49-11" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(<em>d</em>) Oscillation.</strong> As is clear from the graph, the
    density (or pressure) of the medium oscillates between a maximum value and a minimum value.{" "}
    <strong><em>The change in density (or pressure) from maximum value to the minimum value and again to the
    maximum value is called an oscillation.</em></strong>
  </p>,

  <p key="b1-p-s49-12" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(<em>e</em>) Frequency (ν).</strong> Frequency enables us to know
    as to how many times does a particular event occur in a given time. If you count your pulse, you may find
    that it throbs around 72 times per minute. This is expressed by saying that the frequency of the pulse is
    72 times per minute. Similarly,{" "}
    <strong><em>the frequency of a sound wave is defined as the number of complete oscillations in density
    (or pressure of the medium) per second. It is denoted by the symbol ν (Greek letter, nu).</em></strong>
  </p>,

  <Fig key="fig-4-10"
    src={CONTENT_IMAGES.CONTENT_IMAGE_286885E114A6D2246461}
    num="Fig. 4.10" caption="Variation in pressure and density due to a sound wave"
  />,

  <p key="b1-p-s49-13" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Unit of frequency</strong> is cycle per second (cps) or s<Sup c="−1" />{" "}
    or <strong>hertz (Hz)</strong> which is named after <strong><em>Heinrich Hertz</em></strong> (1857–1894).
  </p>,
  <p key="b1-p-s49-14" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Bigger units of frequency</strong> are kilohertz (<strong>kHz,</strong> 10<Sup c="3" />Hz) and
    megahertz (<strong>MHz,</strong> 10<Sup c="6" /> Hz).
  </p>,

  <p key="b1-p-s49-15" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(<em>f</em>) Time Period (T).</strong>{" "}
    <strong><em>The time taken for one complete oscillation in density (or pressure) of the medium is called
    the time period of the wave.</em></strong>
  </p>,
  <p key="b1-p-s49-16" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>Time period of the wave is also defined as the time taken by its two consecutive compressions or
    rarefactions to cross a fixed point.</em>
  </p>,

  <p key="b1-p-s49-17" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>(<em>g</em>) Wavelength (λ).</strong>{" "}
    <strong><em>The distance between two consecutive compressions or two consecutive rarefactions is called
    the wavelength of the wave. It is denoted by the symbol λ (Greek letter, lambda).</em></strong>
  </p>,
  <p key="b1-p-s49-18" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <em>Wavelength of a sound wave is also equal to the distance travelled by it in its periodic time (T).</em>
  </p>,
  <p key="b1-p-s49-19" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Unit of wavelength</strong> is metre (m).
  </p>,

  <SecHd key="sec-s410" id="s410" label="4.10" title="Relation Between Frequency and Time Period" />,

  <p key="b1-p-s410-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    If the frequency of the wave is ν, then from the definition of frequency,
  </p>,
  <p key="b1-p-s410-2" style={{ textIndent: 28, marginBottom: 4 }}>
    time taken for completing ν oscillations = 1 second
  </p>,
  <p key="b1-p-s410-3" style={{ textIndent: 28, marginBottom: 8 }}>
    and time taken for completing 1 oscillation = <Frac n="1" d="ν" /> second
  </p>,
  <p key="b1-p-s410-4" style={{ textIndent: 28, marginBottom: 8 }}>
    But time taken for completing 1 oscillation is the time period (<em>T</em>) of the wave.
  </p>,
  <MathBlock key="b1-math-410-1">
    Thus, <em>T</em> = <Frac n="1" d="ν" /> &nbsp; or &nbsp; ν = <Frac n="1" d="T" /> &nbsp;&nbsp; or &nbsp;&nbsp;
    <strong>ν T = 1 &nbsp; ...(1)</strong>
  </MathBlock>,

  <SecHd key="sec-s411" id="s411" label="4.11" title="Relation Between Speed of Sound, Frequency and Wavelength" />,

  <DefBox key="def-s411-1">
    <strong>Speed of sound</strong> <em>is the distance travelled by the sound wave per unit time. It is
    denoted by v and is measured in metre/second (m/s).</em>
  </DefBox>,

  <p key="b1-p-s411-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    From the definition of wavelength, [Fig. 4.11],
  </p>,
  <p key="b1-p-s411-2" style={{ textIndent: 28, marginBottom: 8 }}>
    distance travelled by sound wave in a periodic time (<em>T</em>) = wavelength (λ) of the sound wave.
  </p>,
  <MathBlock key="b1-math-411-1">
    Clearly, speed of sound, <em>v</em> = <Frac n="distance (λ)" d="time taken (T)" /> or{" "}
    <em>v</em> = <Frac n="λ" d="T" /> = <span style={{ margin: "0 3px" }}>(</span><Frac n="1" d="T" /><span style={{ margin: "0 3px" }}>)</span>λ
  </MathBlock>,
  <p key="b1-p-s411-3" style={{ textIndent: 28, marginBottom: 8 }}>
    But <Frac n="1" d="T" /> = ν &nbsp; where ν is the frequency of the sound wave.
  </p>,

  <Fig key="fig-4-11"
    src={CONTENT_IMAGES.CONTENT_IMAGE_25980B9292752B7891E5}
    num="Fig. 4.11" caption="Density/Pressure vs. Time graph showing time period and wavelength"
  />,

  <MathBlock key="b1-math-411-2">
    Thus, <strong><em>v = ν λ &nbsp; ...(1)</em></strong>
  </MathBlock>,

  <p key="b1-p-s411-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    If two of the three quantities (<em>v</em>, ν and λ) are known, the third quantity can be obtained from
    eqn. (1).
  </p>,
  <p key="b1-p-s411-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, to describe a sound wave, we need to know its: (<em>i</em>) speed (<em>ii</em>) frequency (or
    wavelength) and (<em>iii</em>) amplitude. These are known as the{" "}
    <strong style={{ color: P_COLOR }}>characteristics of a sound wave.</strong>
  </p>,

  <SecHd key="sec-s412" id="s412" label="4.12" title="Speed of Sound in Different Media" />,

  <p key="b1-p-s412-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    It is a matter of common experience that when we strike an object with a hammer, the sound of hammering
    is heard a short while after the actual impact. Similarly, the sound of cracker is heard only after it has
    exploded. These simple observations reveal that{" "}
    <strong><em>sound travels with a finite speed.</em></strong> Further, the flash of lightning is seen first
    and thunder is heard later on. The lapse of time between the lightning and the thunder is sometimes a few
    tens of a second. From this, we can easily conclude that{" "}
    <strong><em>sound travels with a speed which is much less than the speed of light.</em></strong>
  </p>,

  <p key="b1-p-s412-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Thus, <strong><em>the speed of sound is finite and is much less than the speed of light.</em></strong>
  </p>,

  <p key="b1-p-s412-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    The speed of sound depends upon:
  </p>,
  <ol key="b1-ol-s412" style={{ paddingLeft: 28, fontSize: 14, lineHeight: 1.75, margin: "0 0 8px" }}>
    <li style={{ marginBottom: 4 }}>
      the properties (elasticity and density) of the medium through which it propagates, and
    </li>
    <li style={{ marginBottom: 4 }}>temperature of the medium.</li>
  </ol>,

  <p key="b1-p-s412-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Sound (<em>in general</em>) has greatest speed in case of solids and least in case of gases. For liquids,
    the speed of sound is intermediate between these two extremes as shown in Fig. 4.12.
  </p>,

  <div key="b1-fig412" style={{ overflowX: "auto", margin: "12px 0" }}>
    <table style={{ borderCollapse: "collapse", margin: "0 auto", fontSize: 13 }}>
      <tbody>
        <tr>
          <td style={{ ...td, textAlign: "center", padding: "8px 24px" }}>Gas</td>
          <td style={{ ...td, textAlign: "center", padding: "8px 24px" }}>Liquid</td>
          <td style={{ ...td, textAlign: "center", padding: "8px 24px" }}>Solid</td>
        </tr>
      </tbody>
    </table>
    <p style={{ textAlign: "center", fontSize: 12.5, fontStyle: "italic", color: "#444", marginTop: 4 }}>
      Speed of sound increases from left to right
    </p>
    <p style={{ textAlign: "center", fontSize: 12.5, color: P_COLOR, fontWeight: 700, fontStyle: "normal" }}>Fig. 4.12</p>
  </div>,

  <p key="b1-p-s412-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In general, <strong><em>speed of sound in solids &gt; speed of sound in liquids &gt; speed of sound in
    gases.</em></strong>
  </p>,

  <p key="b1-p-s412-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    However, in certain solids, the speed (<em>v</em>) of sound is much less than that even in gases as{" "}
    <em>v</em> (for vulcanised rubber) = 54 m/s and <em>v</em> (for hydrogen) = 1284 m/s. The speed of sound
    in lead (a solid) = 1332 m/s and in sea water (a liquid) = 1531 m/s. The speed of sound in methyl alcohol
    (a liquid) = 1103 m/s and in hydrogen (a gas), its value = 1284 m/s.
  </p>,

  <p key="b1-p-s412-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The <strong><em>speed of sound increases with increase in temperature</em></strong> of the medium. The
    speed of sound in air at 0°C is 331 m/s. In air, it increases roughly by 0·6 m/s with rise of 1°C in
    temperature. Thus, a good approximation of the speed of sound in air of a particular temperature is given by
  </p>,
  <MathBlock key="b1-math-412-1">
    <em>v</em> = (331 + 0·6 <em>t</em>) m/s
  </MathBlock>,
  <p key="b1-p-s412-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    where <em>t</em> is the air temperature in degree celsius.
  </p>,
  <p key="b1-p-s412-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    At 20°C, the speed of sound is 343 m/s, at 22°C its value is 344·2 m/s and at 25°C, it is 346 m/s.
  </p>,
  <p key="b1-p-s412-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The speeds of sound in some gases, liquids and solids are listed in Table 4.1.
  </p>,

  <SpeedOfSoundTable key="tbl-speed-sound" />,
];

// ── BATCH 2: SOLVED PROBLEMS + PROBLEMS FOR PRACTICE + SOLUTIONS ─────────────

const content_b2 = [

  // ── SOLVED PROBLEMS (Frequency, Time Period, Wavelength, Velocity) ──

  <NumericalSection key="num-freq-wave" topic="FREQUENCY, TIME PERIOD, WAVELENGTH AND VELOCITY OF SOUND WAVES">

    <div key="b2-formulae" style={{ border: "1px solid #c0126a", padding: "10px 14px", marginBottom: 16, background: LIGHT_P }}>
      <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13, margin: "0 0 6px", color: P_COLOR }}>
        FORMULAE AND UNITS
      </p>
      <p style={{ margin: "0 0 4px", fontSize: 13.5 }}>
        <strong>1.</strong> &nbsp; ν = <Frac n="1" d="T" /> &nbsp; or &nbsp; T = <Frac n="1" d="ν" /> &nbsp; or &nbsp; ν T = 1
      </p>
      <p style={{ margin: "0 0 4px", fontSize: 13, color: "#555" }}>
        where ν is the frequency and T is the time period. ν is measured in hertz (Hz) and T is measured in second (s).
      </p>
      <p style={{ margin: "0 0 4px", fontSize: 13.5 }}>
        <strong>2.</strong> &nbsp; v = ν λ
      </p>
      <p style={{ margin: "0", fontSize: 13, color: "#555" }}>
        where v is the speed of sound, ν is its frequency and λ is its wavelength. v is measured in m/s if ν is in Hz and λ is in metre (m).
      </p>
    </div>

    <p key="b2-prob1-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 1. Find the frequency of a wave whose time period is 0·002 second.
    </p>
    <p key="b2-prob1-s" style={{ marginBottom: 12, fontSize: 14 }}>
      <strong>Solution.</strong> Here, time period of the wave, T = 0·002 s
    </p>
    <MathBlock key="b2-math-p1">
      Frequency of the wave, ν = <Frac n="1" d="T" /> = <Frac n="1" d="0·002 s" /> = <strong>500 Hz</strong>
    </MathBlock>

    <p key="b2-prob2-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 2. Find the time period of a wave whose frequency is 400 Hz.
    </p>
    <p key="b2-prob2-s" style={{ marginBottom: 12, fontSize: 14 }}>
      <strong>Solution.</strong> Here, frequency of the wave, ν = 400 Hz
    </p>
    <MathBlock key="b2-math-p2">
      Time period of the wave, T = <Frac n="1" d="ν" /> = <Frac n="1" d="400 s⁻¹" /> = <strong>0·0025 s</strong>
    </MathBlock>

    <p key="b2-prob3-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 3. A source of wave produces 20 crests and 20 troughs in 0·2 s. Find the frequency of the wave.
    </p>
    <p key="b2-prob3-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Since a wave consists of a crest and a trough, 20 crests and 20 troughs constitute 20 waves.
    </p>
    <p key="b2-prob3-s2" style={{ marginBottom: 4, fontSize: 14 }}>
      As 20 waves are produced in 0·2 s, time period of the wave, T = <Frac n="0·2 s" d="20" /> = 0·01 s
    </p>
    <MathBlock key="b2-math-p3">
      Frequency of the wave, ν = <Frac n="1" d="T" /> = <Frac n="1" d="0·01 s" /> = <strong>100 Hz</strong>
    </MathBlock>

    <p key="b2-prob4-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 4. The wavelength of the vibrations produced on the surface of water is 2 cm. If the wave velocity is 16 m/s, calculate (a) the number of waves produced in 1 s (b) time required to produce 1 wave.
    </p>
    <p key="b2-prob4-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, wavelength of the wave, λ = 2 cm = 0·02 m
    </p>
    <p key="b2-prob4-s2" style={{ marginBottom: 4, fontSize: 14 }}>wave velocity, v = 16 m/s</p>
    <p key="b2-prob4-a" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>(a)</strong> number of waves produced in 1 s, <em>i.e.</em>,{" "}
      ν = <Frac n="v" d="λ" /> = <Frac n="16 m/s" d="0·02 m" /> = <strong>800 Hz</strong>
    </p>
    <p key="b2-prob4-b" style={{ marginBottom: 12, fontSize: 14 }}>
      <strong>(b)</strong> time required to produce 1 wave, <em>i.e.</em>,{" "}
      T = <Frac n="1" d="ν" /> = <Frac n="1" d="800" /> s = <strong>0·00125 s</strong>
    </p>

    <p key="b2-prob5-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 5. Fig. 4.13 shows a snap-shot of a wave-form of frequency 50 Hz. For this wave motion, find (a) wavelength (b) amplitude (c) velocity.
    </p>
    <p key="b2-prob5-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, ν = 50 Hz
    </p>
    <p key="b2-prob5-a" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>(a)</strong> Wavelength = distance between two consecutive crests
    </p>
    <MathBlock key="b2-math-p5a">= λ = 25 cm − 5 cm = <strong>20 cm</strong></MathBlock>
    <p key="b2-prob5-b" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>(b)</strong> Amplitude = <strong>4 cm</strong>
    </p>
    <p key="b2-prob5-c" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>(c)</strong> Wave velocity, v = νλ = (50 s<Sup c="−1" />) (20 cm)
    </p>
    <MathBlock key="b2-math-p5c">= 1000 cm/s = <strong>10 m/s</strong></MathBlock>

    <Fig key="fig-4-13"
      src={CONTENT_IMAGES.CONTENT_IMAGE_6E023ACA2A47C4B95D33}
      num="Fig. 4.13" caption="Snap-shot of a wave-form of frequency 50 Hz"
    />,

    <p key="b2-prob6-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 6. A sound wave has a frequency of 2 kHz and wavelength 35 cm. How long will it take to travel 1·5 km?
    </p>
    <p key="b2-prob6-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, frequency of the wave, ν = 2 kHz = 2000 Hz
    </p>
    <p key="b2-prob6-s2" style={{ marginBottom: 4, fontSize: 14 }}>wavelength of the wave, λ = 35 cm = 0·35 m</p>
    <MathBlock key="b2-math-p6">Speed of sound wave, v = νλ = (2000 s<Sup c="−1" />) (0·35 m) = 700 m/s</MathBlock>
    <MathBlock key="b2-math-p6b">
      Time taken by the wave to move through 1·5 km (= 1500 m), <em>i.e.</em>,{" "}
      t = distance/speed = <Frac n="1500 m" d="700 m/s" /> = <strong>2·1 s</strong>
    </MathBlock>

    <p key="b2-prob7-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 7. A tuning fork having frequency 256 Hz emits a wave which has a wavelength of 1·35 m. Find the speed of sound in air.
    </p>
    <p key="b2-prob7-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, frequency of the tuning fork, ν = 256 Hz
    </p>
    <p key="b2-prob7-s2" style={{ marginBottom: 4, fontSize: 14 }}>wavelength of the wave emitted, λ = 1·35 m</p>
    <MathBlock key="b2-math-p7">
      Speed of sound in air, v = νλ = (256 s<Sup c="−1" />) (1·35 m) = <strong>345·6 m/s</strong>
    </MathBlock>

    <p key="b2-prob8-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 8. The speed of sound in sea water is 1530 m/s. The wavelength of a wave transmitted through the sea is 0·02 m. Find its frequency.
    </p>
    <p key="b2-prob8-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, speed of sound in sea water, v = 1530 m/s
    </p>
    <p key="b2-prob8-s2" style={{ marginBottom: 4, fontSize: 14 }}>wavelength of the wave transmitted, λ = 0·02 m</p>
    <p key="b2-prob8-s3" style={{ marginBottom: 4, fontSize: 14 }}>If ν is the frequency of wave transmitted, then</p>
    <MathBlock key="b2-math-p8">
      ν = <Frac n="v" d="λ" /> = <Frac n="1530 m/s" d="0·02 m" /> = 76500 Hz = <strong>76·5 kHz</strong>
    </MathBlock>

    <p key="b2-prob9-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 9. The audible range of a human ear is 20 Hz to 20 kHz. Convert this into corresponding wavelength range. The speed of sound at ordinary temperature is 340 m/s.
    </p>
    <p key="b2-prob9-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, speed of sound in air, v = 340 m/s
    </p>
    <p key="b2-prob9-s2" style={{ marginBottom: 4, fontSize: 14 }}>lowest frequency, ν<Sub c="1" /> = 20 Hz</p>
    <p key="b2-prob9-s3" style={{ marginBottom: 4, fontSize: 14 }}>
      highest frequency, ν<Sub c="2" /> = 20 kHz = 20 × 10<Sup c="3" /> Hz
    </p>
    <MathBlock key="b2-math-p9a">
      Clearly, upper limit of wavelength, <em>i.e.</em>, λ<Sub c="1" /> = <Frac n="v" d={"ν\u2081"} /> = <Frac n="340 m/s" d="20 s⁻¹" /> = <strong>17 m</strong>
    </MathBlock>
    <MathBlock key="b2-math-p9b">
      and lower limit of wavelength, <em>i.e.</em>, λ<Sub c="2" /> = <Frac n="v" d={"ν\u2082"} /> = <Frac n="340 m/s" d="20 × 10³ s⁻¹" /> = <strong>0·017 m</strong>
    </MathBlock>
    <p key="b2-prob9-ans" style={{ fontSize: 14, marginBottom: 12 }}>
      Thus, the audible wavelength range is <strong>0·017 m to 17 m.</strong>
    </p>

    <p key="b2-prob10-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 10. A stone is dropped into a well 45 m deep. The sound of the splash is heard 3·13 s after the stone is dropped. Find the speed of sound in air. Take g = 10 m/s<Sup c="2" />.
    </p>
    <p key="b2-prob10-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, depth of the well, h = 45 m
    </p>
    <p key="b2-prob10-s2" style={{ marginBottom: 4, fontSize: 14 }}>
      initial velocity of the stone, u = 0, g = 10 m/s<Sup c="2" />
    </p>
    <p key="b2-prob10-s3" style={{ marginBottom: 4, fontSize: 14 }}>
      time taken by the sound of splash to be heard, t<Sub c="1" /> = 3·13 s
    </p>
    <p key="b2-prob10-s4" style={{ marginBottom: 4, fontSize: 14 }}>
      If t<Sub c="2" /> is the time taken by the stone to reach water level in the well, then from
    </p>
    <MathBlock key="b2-math-p10a">
      h = ut<Sub c="2" /> + <Frac n="1" d="2" />gt<Sub c="2" /><Sup c="2" /> &nbsp; or &nbsp;
      45 = <Frac n="1" d="2" /> × 10 × t<Sub c="2" /><Sup c="2" />
    </MathBlock>
    <MathBlock key="b2-math-p10b">
      t<Sub c="2" /><Sup c="2" /> = 9 &nbsp; or &nbsp; t<Sub c="2" /> = 3 s
    </MathBlock>
    <p key="b2-prob10-s5" style={{ marginBottom: 4, fontSize: 14 }}>
      Clearly, time taken by sound to reach the top of the well, <em>i.e.</em>,{" "}
      t = t<Sub c="1" /> − t<Sub c="2" /> = 3·13 − 3 s = 0·13 s
    </p>
    <MathBlock key="b2-math-p10c">
      Speed of sound = <Frac n="distance (h) travelled by sound" d="time taken (t)" />
    </MathBlock>
    <MathBlock key="b2-math-p10d">
      <em>i.e.</em>, v = <Frac n="45 m" d="0·13 s" /> = <strong>346 m/s</strong>
    </MathBlock>

  </NumericalSection>,

  // ── PROBLEMS FOR PRACTICE ──

  <ProblemsBox key="prob-s412">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside",
      fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>
        A boat anchor is rocked by waves whose consecutive crests are 100 m apart. If the wave speed of the
        moving crests is 20 m/s, calculate the frequency at which the boat rocks.{" "}
        <strong>[Ans. 0·2 Hz]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        Calculate the wavelength of a sound wave having a frequency 300 Hz and speed 330 m/s.{" "}
        <strong>[Ans. 1·1 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        The sonic boom of an aircraft has a time period of 0·00005 s. Calculate the frequency of the sound
        produced. <strong>[Ans. 20000 Hz]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A periodic longitudinal wave is sent on a slinky. The wave proceeds at a speed of 48 m/s and each
        particle oscillates at a frequency of 12 Hz. Calculate the minimum separation between the positions
        where the slinky is most compressed. <strong>[Ans. 4 cm]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A source produces 15 crests and 15 troughs in 3 seconds. When the second crest is produced, the first
        is 2 cm away from the source. Calculate (<em>a</em>) frequency (<em>b</em>) wavelength (<em>c</em>)
        speed of the wave. <strong>[Ans. (<em>a</em>) 5 Hz (<em>b</em>) 2 cm (<em>c</em>) 10 cm/s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A longitudinal wave is produced on a slinky. The frequency of the wave is 25 Hz and it travels at a
        speed of 20 cm/s. Find the separation between consecutive positions of maximum compressions.{" "}
        <strong>[Ans. 0·8 cm]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A hospital uses an ultrasonic scanner to locate tumours in a tissue. What is the wavelength of sound
        in a tissue in which the speed of sound is 1·7 km/s? The operating frequency of the scanner is 4·2 MHz.{" "}
        <strong>[Ans. 4 × 10<Sup c="−4" /> m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        An observer standing at the sea coast observes 54 waves reaching the coast per minute. If the
        wavelength of a wave is 10 m, find the wave velocity. <strong>[Ans. 9 m/s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        How far does sound travel in air when a tuning fork of frequency 560 Hz makes 30 vibrations? Speed of
        sound in air = 336 m/s. <strong>[Ans. 18 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A bat emits ultrasonic sound of frequency 100 kHz in air. If this sound meets a water surface, what is
        the wavelength of (<em>a</em>) the reflected sound wave (<em>b</em>) the transmitted sound wave?
        Given speed of sound in air = 340 m/s and in water = 1486 m/s.{" "}
        <strong>[Ans. (<em>a</em>) 3·4 × 10<Sup c="−3" /> m (<em>b</em>) 1·486 × 10<Sup c="−2" /> m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A wave of wavelength 0·60 cm is produced in air and it travels at a speed of 300 m/s. Will it be
        audible? <strong>[Ans. 5 × 10<Sup c="4" /> Hz, No]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        Radio Ceylon broadcasts at 25 m. What is the frequency of the station?{" "}
        <strong>[Ans. 1·2 × 10<Sup c="7" /> Hz]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        Chandigarh radio station broadcasts at 1200 kHz. At what metre Chandigarh station would be tuned in
        your transistor? <strong>[Ans. 250 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        The given graph, [Fig. 4.14] shows the displacement versus time relation for a disturbance travelling
        with a velocity of 1500 m/s. Calculate the: (<em>i</em>) time period (<em>ii</em>) frequency
        (<em>iii</em>) wavelength of the disturbance.
        <Fig key="fig-4-14"
          src={CONTENT_IMAGES.CONTENT_IMAGE_687DCA80D7C135C79F20}
          num="Fig. 4.14" caption="Displacement vs. time graph"
        />
        <strong>[Ans. (<em>i</em>) 2 s (<em>ii</em>) 0·5 Hz (<em>iii</em>) 3000 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        The velocity of sound in air is 340 m/s. Compute: (<em>i</em>) its wavelength when the frequency is
        250 Hz. (<em>ii</em>) its frequency when the wavelength is 85 cm.{" "}
        <strong>[Ans. (<em>i</em>) 1·36 m (<em>ii</em>) 400 Hz]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A person on a pier observes a set of incoming waves that have a sinusoidal form with a distance of
        1·6 m between the crests. If a wave laps against the pier every 4 s, what are: (<em>a</em>) the
        frequency and (<em>b</em>) the speed of the waves?{" "}
        <strong>[Ans. (<em>a</em>) 0·25 Hz (<em>b</em>) 0·4 m/s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        How much longer would it take for sound to travel 1 km through arctic air at −50°C than to travel 1 km
        through desert air at +50°C? <strong>[Ans. 0·562 s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A tuning fork vibrates at a frequency of 256 Hz.
        <br />
        (<em>a</em>) When the air temperature increases, the wavelength of the sound from the tuning fork:
        (<em>i</em>) increases, (<em>ii</em>) remains the same, (<em>iii</em>) decreases. Why?
        <br />
        (<em>b</em>) If the temperature rises from 0° to 20°C, what is the change in wavelength?{" "}
        <strong>[Ans. (<em>a</em>) increase (<em>b</em>) 0·047 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A freshwater dolphin sends ultrasonic sound to locate a prey. If the echo off the prey is received by
        dolphin 0·12 s after being sent, how far is the prey from the dolphin?{" "}
        <strong>[Ans. 90 m]</strong>
      </li>
    </ol>
  </ProblemsBox>,

  // ── SOLUTIONS/EXPLANATIONS ──

  <div key="b2-solutions-hd" style={{ marginTop: 24 }}>
    <div style={{ background: P_COLOR, color: "#fff", textAlign: "center",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 15, letterSpacing: 2, padding: "6px 0" }}>
      ■ SOLUTIONS/EXPLANATIONS ■
    </div>
  </div>,

  <div key="b2-solutions" style={{ padding: "12px 0", fontSize: 13.5, lineHeight: 1.7 }}>
    <P2 key="b2-sol1">
      <strong>1.</strong> Here, λ = 100 m, v = 20 m/s, ν = <Frac n="v" d="λ" /> = <Frac n="20 m/s" d="100 m" /> = <strong>0·2 Hz</strong>
    </P2>
    <P2 key="b2-sol2">
      <strong>2.</strong> Here, ν = 300 Hz, v = 330 m/s, λ = <Frac n="v" d="ν" /> = <Frac n="330 m/s" d="300/s" /> = <strong>1·1 m</strong>
    </P2>
    <P2 key="b2-sol3">
      <strong>3.</strong> Here, T = 0·00005 s, ν = <Frac n="1" d="T" /> = <Frac n="1" d="0·00005 s" /> = <strong>20000 Hz</strong>
    </P2>
    <P2 key="b2-sol4">
      <strong>4.</strong> Here, v = 48 cm/s, ν = 12 Hz, λ = <Frac n="v" d="ν" /> = <Frac n="48 cm/s" d="12/s" /> = <strong>4 cm</strong>
    </P2>
    <P2 key="b2-sol5">
      <strong>5.</strong> Here, ν = <Frac n="15" d="3" /> = <strong>5 Hz</strong>, λ = 2 cm, v = νλ = (5 × 2) cm/s = <strong>10 cm/s</strong>
    </P2>
    <P2 key="b2-sol6">
      <strong>6.</strong> Here, ν = 25 Hz, v = 20 cm/s, λ = <Frac n="v" d="ν" /> = <Frac n="20 cm/s" d="25/s" /> = <strong>0·8 cm</strong>
    </P2>
    <P2 key="b2-sol7">
      <strong>7.</strong> Here, v = 1·7 km/s, ν = 4·2 MHz = 4·2 × 10<Sup c="6" /> Hz
    </P2>
    <MathBlock key="b2-math-sol7">
      λ = <Frac n="v" d="ν" /> = <Frac n="1·7 km/s" d="4·2 × 10⁶/s" /> = <Frac n="1700 m/s" d="4·2 × 10⁶/s" /> = <strong>4 × 10<Sup c="−4" /> m</strong>
    </MathBlock>
    <P2 key="b2-sol8">
      <strong>8.</strong> Here, ν = <Frac n="54" d="60" /> Hz = 0·9 Hz, λ = 10 m, v = νλ = (0·9 Hz) (10 m) = <strong>9 m/s</strong>
    </P2>
    <P2 key="b2-sol9">
      <strong>9.</strong> Here, ν = 560 Hz, v = 336 m/s, λ = <Frac n="v" d="ν" /> = <Frac n="336 m/s" d="560/s" /> = 0·60 m
    </P2>
    <P2 key="b2-sol9b">
      Distance covered by sound during 30 vibrations = 30 λ = 30 (0·6 m) = <strong>18 m</strong>
    </P2>
    <P2 key="b2-sol10">
      <strong>10.</strong> Here, ν = 100 kHz = 100000 Hz, v<Sub c="air" /> = 340 m/s, v<Sub c="water" /> = 1486 m/s
    </P2>
    <P2 key="b2-sol10a">
      (<em>a</em>) Wavelength of reflected wave = <Frac n="speed of sound in air (vₐᵢᵣ)" d="ν" /> = <Frac n="340 m/s" d="100000 s⁻¹" /> = <strong>3·4 × 10<Sup c="−3" /> m</strong>
    </P2>
    <P2 key="b2-sol10b">
      (<em>b</em>) Wavelength of transmitted wave through water = <Frac n="speed of sound in water (v_water)" d="ν" /> = <Frac n="1486 m/s" d="100000 s⁻¹" /> = <strong>1·486 × 10<Sup c="−2" /> m</strong>
    </P2>
    <P2 key="b2-sol10c" style={{ color: "#555", fontStyle: "italic" }}>
      (frequency of ultrasound does not change with change of medium)
    </P2>
    <P2 key="b2-sol11">
      <strong>11.</strong> Here, λ = 0·60 cm; v = 300 m/s
    </P2>
    <MathBlock key="b2-math-sol11">
      ν = <Frac n="v" d="λ" /> = <Frac n="300 m/s" d="0·60 cm" /> = <Frac n="300 × 10² cm/s" d="0·60 cm" /> = <strong>5 × 10<Sup c="4" /> Hz</strong>
    </MathBlock>
    <P2 key="b2-sol11b">This frequency lies in the ultrasonic zone and hence is <strong>inaudible.</strong></P2>
    <P2 key="b2-sol12">
      <strong>12.</strong> Here, λ = 25 m; speed of radio waves, v = 3 × 10<Sup c="8" /> m/s (speed of light in vacuum)
    </P2>
    <MathBlock key="b2-math-sol12">
      ν = <Frac n="v" d="λ" /> = <Frac n="3 × 10⁸ m/s" d="25 m" /> = <strong>1·2 × 10<Sup c="7" /> Hz</strong>
    </MathBlock>
    <P2 key="b2-sol13">
      <strong>13.</strong> Here, ν = 1200 kHz = 12 × 10<Sup c="5" /> Hz; speed of radio waves, v = 3 × 10<Sup c="8" /> m/s
    </P2>
    <MathBlock key="b2-math-sol13">
      λ = <Frac n="v" d="ν" /> = <Frac n="3 × 10⁸ m/s" d="12 × 10⁵ s" /> = <strong>250 m</strong>
    </MathBlock>
    <P2 key="b2-sol14">
      <strong>14.</strong> (<em>i</em>) Time period (T) = 2 s (time interval between the centres of two crests or two troughs)
    </P2>
    <P2 key="b2-sol14b">
      (<em>ii</em>) Frequency, ν = <Frac n="1" d="T" /> = <Frac n="1" d="2 s" /> = <strong>0·5 Hz</strong> &nbsp;&nbsp;
      (<em>iii</em>) Wavelength, λ = <Frac n="v" d="ν" /> = <Frac n="1500 m/s" d="0·5 Hz" /> = <strong>3000 m</strong>
    </P2>
    <P2 key="b2-sol15a">
      <strong>15.</strong> (<em>i</em>) λ = <Frac n="v" d="ν" /> = <Frac n="340 m/s" d="250 Hz" /> = <strong>1·36 m</strong>
      &nbsp;&nbsp; (<em>ii</em>) ν = <Frac n="v" d="λ" /> = <Frac n="340 m/s" d="0·85 m" /> = <strong>400 Hz</strong>
    </P2>
    <P2 key="b2-sol16">
      <strong>16.</strong> (<em>a</em>) λ = 1·6 m, T = 4 s, ν = <Frac n="1" d="T" /> = <Frac n="1" d="4 s" /> = <strong>0·25 Hz</strong>
      &nbsp;&nbsp; (<em>b</em>) v = νλ = (0·25 × 1·6) m/s = <strong>0·4 m/s</strong>
    </P2>
    <P2 key="b2-sol17">
      <strong>17.</strong> Speed of sound in arctic air at −50°C = (331 − 0·6 × 50) m/s = 301 m/s
    </P2>
    <P2 key="b2-sol17b">Time taken by sound to cover 1 km in arctic air = <Frac n="1000 m" d="301 m/s" /> = 3·332 s</P2>
    <P2 key="b2-sol17c">Speed of sound in desert air at +50°C = (331 + 0·6 × 50) m/s = 361 m/s</P2>
    <P2 key="b2-sol17d">Time taken by sound to cover 1 km in desert air = <Frac n="1000 m" d="361 m/s" /> = 2·770 s</P2>
    <P2 key="b2-sol17e">Difference in two times = 3·332 s − 2·770 s = <strong>0·562 s</strong></P2>
    <P2 key="b2-sol18">
      <strong>18.</strong> (<em>a</em>) (<em>i</em>) <strong>increases</strong>, because the speed of sound increases with
      temperature. As v = νλ, so if v increases and ν remains the same, λ increases.
    </P2>
    <P2 key="b2-sol18b">
      (<em>b</em>) Since speed of sound increases by 0·6 m/s for every degree centigrade rise in temperature,
      increase in sound speed when temperature changes by 20°C = 0·6 m/s × 20 = 12 m/s.
    </P2>
    <MathBlock key="b2-math-sol18">
      Increase in wavelength = <Frac n="12 m/s" d="256 Hz" /> = <strong>0·047 m</strong>
    </MathBlock>
    <P2 key="b2-sol19">
      <strong>19.</strong> If the distance between the prey and the dolphin is s, then 2s = vt or{" "}
      s = <Frac n="vt" d="2" /> = <Frac n="(1500 × 0·12) m" d="2" /> = <strong>90 m.</strong>{" "}
      (speed of sound in water = 1500 m/s).
    </P2>
  </div>,
];

// ── BATCH 3: SECTIONS 4.13–4.22 ─────────────────────────────

// Table sub-components for this batch
const LoudnessIntensityTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <p style={{ textAlign: "center", fontStyle: "italic", fontSize: 13.5, marginBottom: 6 }}>
      The following points of difference between loudness and intensity of sound are worth noticing.
    </p>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
      <thead>
        <tr>
          <td style={th}>Loudness</td>
          <td style={th}>Intensity</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={td}>
            <strong>1.</strong> It is not an entirely physical quantity.<br />
            <strong>2.</strong> It depends upon (<em>i</em>) sensitivity of the ear and (<em>ii</em>) intensity of sound.<br />
            <strong>3.</strong> It has a subjective existence.
          </td>
          <td style={td}>
            <strong>1.</strong> It is a physical quantity which can be accurately measured.<br />
            <strong>2.</strong> It does not depend upon the sensitivity of the ear.<br />
            <strong>3.</strong> It has an objective existence.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const MusicNoiseTable = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13.5 }}>
      <thead>
        <tr>
          <td style={th}>Musical Sound</td>
          <td style={th}>Noise</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={td}>
            <strong>1.</strong> It has a <em>pleasant</em> effect on the ear.<br />
            <strong>2.</strong> It consists of a series of sound impulses which follow one another <em>regularly.</em><br />
            <strong>3.</strong> The frequency of musical sound is <em>high.</em><br />
            <strong>4.</strong> There are <em>no sudden changes in amplitude</em> (loudness) of the waves constituting a musical sound.
          </td>
          <td style={td}>
            <strong>1.</strong> It has an <em>unpleasant</em> effect on the ear.<br />
            <strong>2.</strong> The sound impulses do <em>not</em> follow one another <em>regularly.</em><br />
            <strong>3.</strong> The frequency of a noise is <em>low.</em><br />
            <strong>4.</strong> There are usually <em>sudden changes in amplitude</em> (loudness) of the waves forming a noise.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const content_b3 = [

  <SecHd key="sec-s413" id="s413" label="4.13" title="Characteristics of Sound" />,

  <p key="b3-p-s413-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When a violin and a piano are played together in an orchestra, sounds produced by both these instruments
    travel through the same medium (<em>i.e.</em>, air) and reach the ear at the same time. This implies that
    both the sounds have the same speed. But the sounds received by the ear are of different nature. Such
    sounds can be distinguished from each other by the following three characteristics.
  </p>,

  <p key="b3-p-s413-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Loudness or Intensity &nbsp;&nbsp; 2. Pitch or Frequency &nbsp;&nbsp; 3. Quality or Timbre.</strong>
  </p>,
  <p key="b3-p-s413-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    We shall discuss each one of these characteristics in the following articles.
  </p>,

  <SecHd key="sec-s414" id="s414" label="4.14" title="Loudness or Intensity" />,

  <p key="b3-p-s414-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When sound falls on the ear, it produces the sensation of hearing. Some of the sounds appear loud whereas
    others appear faint to the ear.
  </p>,

  <DefBox key="def-s414-1">
    <em>The sensation produced in the ear which enables us to distinguish between a loud and a faint sound
    is called <strong style={{ color: P_COLOR }}>loudness.</strong></em>
  </DefBox>,

  <p key="b3-p-s414-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    If we strike a tuning fork softly, we hear a faint sound. But if the same tuning fork is struck hard, we
    hear a loud sound. Since both these sounds are produced by the same tuning fork, these have the same
    frequency. The wave-forms of both these sounds are similar as shown in Fig. 4.15. The faint sound has a
    small amplitude whereas the loud sound has a large amplitude. Thus,{" "}
    <strong><em>the loudness or softness of a sound is determined basically by the amplitude of the wave.</em></strong>
  </p>,

  <Fig key="fig-4-15"
    src={CONTENT_IMAGES.CONTENT_IMAGE_41104B1DE549F0709C6B}
    num="Fig. 4.15" caption="Wave-forms of a soft (faint) sound and a loud sound"
  />,

  <p key="b3-p-s414-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In fact, loudness is directly proportional to the square of the amplitude. Apart from the amplitude, the
    loudness of a sound:
  </p>,
  <p key="b3-p-s414-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>i</em>)</strong> <strong><em>varies inversely as the square of the distance from the source
    of sound,</em></strong> <em>i.e.</em>, closer the source to the listener, louder the sound.
  </p>,
  <p key="b3-p-s414-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>ii</em>)</strong> <strong><em>depends upon the surface area of the vibrating body,</em></strong>{" "}
    <em>i.e.</em>, larger the size of the vibrating body, louder the sound.
  </p>,
  <p key="b3-p-s414-6" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iii</em>)</strong> <strong><em>depends upon the density of the medium,</em></strong>{" "}
    <em>i.e.</em>, the sound of a vibrating source is louder when it is in water than when it is in air.
  </p>,
  <p key="b3-p-s414-7" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iv</em>)</strong> <strong><em>varies directly as the square of the frequency of the
    source,</em></strong> <em>e.g.</em>, two tuning forks of different frequencies even when struck with the
    same force (so that the sound waves produced by them have the same amplitude) give different loudness, the
    one with the higher frequency gives louder sound than the one with the lower frequency.
  </p>,

  <SecHd key="sec-s415" id="s415" label="4.15" title="Intensity of Sound" />,

  <p key="b3-p-s415-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The psychological sensation of loudness in the human ear is intimately connected with another quantity,
    called intensity of sound.
  </p>,

  <DefBox key="def-s415-1">
    <em>The <strong>intensity of sound</strong> at any point in space <strong>is defined as the amount of
    energy passing per unit time per unit area in a direction perpendicular to the area.</strong></em>
  </DefBox>,

  <p key="b3-p-s415-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In other words, intensity = <Frac n="energy" d="area × time" /> = <Frac n="power" d="area" />{" "}
    &nbsp; <span style={{ fontSize: 12, color: "#555" }}>(energy/time = power)</span>
  </p>,
  <p key="b3-p-s415-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>Unit of intensity</strong> is watt/metre<Sup c="2" /> (W/m<Sup c="2" />).
  </p>,
  <p key="b3-p-s415-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Clearly, intensity is a physical quantity that can easily be measured.
  </p>,
  <p key="b3-p-s415-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong><em>Intensity and loudness, though closely related to each other, are not one and the same thing.</em></strong>{" "}
    For example, a number of persons situated at the same distance from a given source, which is emitting sound
    energy uniformly in all directions, will receive the same amount of energy from the source, <em>i.e.</em>,
    the intensity of sound for all the persons would be the same. But most probably all the persons will react
    differently to the sound received by them. As such, if the same sound is loud to one person, it may be
    faint to the other. Further, if one of them happens to be deaf, loudness will be zero for him. Thus,{" "}
    <strong><em>it is the ear which gives meaning to the term loudness.</em></strong>
  </p>,

  <SubHd key="sub-s415-diff" id="s415-diff" label="" title="Difference between Loudness and Intensity" />,

  <LoudnessIntensityTable key="tbl-loudness-intensity" />,

  <SecHd key="sec-s416" id="s416" label="4.16" title="Pitch or Frequency" />,

  <p key="b3-p-s416-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Pitch is another psychological property of sound that is related to frequency. In fact, how the brain
    interprets the frequency of sound emitted by a source is called pitch. Just like loudness, it is a
    subjective quantity and cannot be measured by means of instruments.
  </p>,

  <DefBox key="def-s416-1">
    <em><strong>Pitch</strong> is that characteristic of sound which helps in differentiating between a shrill
    sound from a grave (flat or dull) sound.</em>
  </DefBox>,

  <p key="b3-p-s416-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    High and low pitched sounds are called <strong><em>treble</em></strong> and{" "}
    <strong><em>bass</em></strong> respectively. Fig. 4.16 shows the waveforms of a low pitched sound and a
    high pitched sound. The pitch increases with the increase in frequency and vice-versa. Unless the sound is
    extremely loud, there is one-to-one correspondence between pitch and frequency. The voice of a lady is
    shriller than that of a man. It is because of the fact that the frequency of ladies' voice is usually
    higher than that of men. The frequency of a woman's ordinary voice is around 280 Hz and that of a man's
    is around 140 Hz.
  </p>,

  <Fig key="fig-4-16"
    src={CONTENT_IMAGES.CONTENT_IMAGE_92F6A9B2AE41541BD7D8}
    num="Fig. 4.16" caption="Waveforms of low pitched sound and high pitched sound"
  />,

  <KBBox key="kb-s416">
    <KBHd>NOTE</KBHd>
    <p style={{ fontSize: 14, margin: 0 }}>
      Pitch is a <em>sensation</em> and is subjective in nature. Frequency, on the other hand, is objective
      in nature and can accurately be measured like any other physical quantity. Further, pitch should not be
      confused with loudness. The buzzing of a mosquito is a sound of higher pitch though quite faint. But the
      roaring of a lion is a sound of lower pitch though of larger loudness.
    </p>
  </KBBox>,

  <SecHd key="sec-s417" id="s417" label="4.17" title="Quality or Timbre" />,

  <DefBox key="def-s417-1">
    <em>The characteristic of a sound which distinguishes it from another of the same pitch and loudness is
    called <strong style={{ color: P_COLOR }}>quality</strong> or{" "}
    <strong style={{ color: P_COLOR }}>timbre.</strong></em>
  </DefBox>,

  <p key="b3-p-s417-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The quality of sound is determined by its wave-form. Sounds of different voices and musical instruments
    have different quality and as such have different wave-forms.
  </p>,

  <p key="b3-p-s417-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Fig. 4.17 (a) represents the waveform of the sound emitted by a tuning fork which comprises of a single
    frequency. <strong><em>A sound of single frequency is called a{" "}
    <span style={{ color: P_COLOR }}>tone.</span></em></strong>
  </p>,

  <p key="b3-p-s417-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Fig. 4.17 (b) represents the wave-forms of the sounds produced by a clarinet, a piano and a violin.{" "}
    <em>These wave-forms are due to a mixture of several frequencies.</em>
  </p>,

  <p key="b3-p-s417-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong><em>A sound which is produced due to a mixture of several frequencies is called a{" "}
    <span style={{ color: P_COLOR }}>note.</span></em></strong>
  </p>,

  <p key="b3-p-s417-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since sound produced by a tuning fork is of single frequency, it is also called a{" "}
    <strong style={{ color: P_COLOR }}>pure note.</strong>
  </p>,

  <Fig key="fig-4-17"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C48B8A70B62E7E6D6EA7}
    num="Fig. 4.17" caption="Waveforms of tuning fork, clarinet, piano and violin"
  />,

  <SecHd key="sec-s418" id="s418" label="4.18" title="Music and Noise" />,

  <p key="b3-p-s418-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    What makes a man close his eyes in admiration and joy while listening to a beautiful song and his
    unimaginable anger on hearing shouts and cries? This is on account of the fact that all sounds can be
    divided into two categories: (<em>i</em>) Musical sound or Music &nbsp; (<em>ii</em>) Noise.
  </p>,

  <p key="b3-p-s418-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>1. Musical sound or Music</strong> has a pleasant effect on the
    listener. Sounds produced by playing on musical instruments, singing of songs and the note produced by a
    tuning fork are a few examples of musical sound.
  </p>,

  <p key="b3-p-s418-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>2. Noise</strong> has an unpleasant (disagreeable, boring or jarring)
    effect on the listener. Rustling of leaves, sound produced when a shot is fired from a gun, murmuring of
    students in the class and thumping of a table are some of the examples of noise.
  </p>,

  <p key="b3-p-s418-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    These definitions of musical sound and noise are based on the psychological response of the ear and brain
    to various types of sound. The pleasant or unpleasant effect of any sound depends upon the mental make-up
    and attitude of the listener towards a particular sound. To most of the foreigners and lovers of pop music,
    classical Indian music may appear to be something close to a noise, whereas lovers of classical music may
    not wish to give an ear to film or pop music. Further, the cries of a newly born baby are perhaps the most
    musical sound to the parents, whereas to an unconcerned individual, these cries may be annoying and hence
    noise. Thus, <strong><em>no clear line of demarcation can be drawn between a musical sound and a noise on
    the basis of sensation these produce on the ear of the listener.</em></strong>
  </p>,

  <p key="b3-p-s418-5" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The physical difference between a musical sound and a noise is represented in Fig. 4.18. The curve of
    Fig. 4.18 (a) is regular and has a definite amplitude. It represents a musical sound. Hence,{" "}
    <strong><em>a <span style={{ color: P_COLOR }}>musical sound</span> consists of a series of sound
    impulses following each other at regular intervals of time without sudden changes in amplitude
    (i.e., loudness). Such sounds are usually of high frequency.</em></strong>
  </p>,

  <p key="b3-p-s418-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The curve of Fig. 4.18 (b) represents a noise. The curve is irregular and has no definite amplitude.
    Therefore, <strong><em>a <span style={{ color: P_COLOR }}>noise</span> consists of a series of sound
    impulses following each other at irregular intervals of time and there are sudden changes in amplitude
    (loudness). Noise is usually of low frequency.</em></strong>
  </p>,

  <div key="b3-fig418" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "16px 0", flexWrap: "wrap" }}>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_EFD58FDDB0AF56D1B664}
        alt="Musical sound waveform"
        style={{ maxWidth: 180, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(a) Musical sound</p>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_23126E3DFD76883CAF10}
        alt="Noise waveform"
        style={{ maxWidth: 180, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(b) Noise</p>
    </div>
  </div>,
  <p key="b3-fig418-cap" style={{ textAlign: "center", fontSize: 12.5, color: P_COLOR, fontWeight: 700, marginBottom: 8 }}>Fig. 4.18</p>,

  <p key="b3-p-s418-7" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "12px 0 6px" }}>
    Difference between Musical Sound and Noise
  </p>,

  <MusicNoiseTable key="tbl-music-noise" />,

  <SecHd key="sec-s419" id="s419" label="4.19" title="Reflection of Sound" />,

  <p key="b3-p-s419-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Like light waves, sound waves also get reflected when these fall on the surface of an obstacle. But unlike
    light waves, sound waves do not necessarily require a polished surface for reflection, <em>i.e.</em>, for
    reflection of sound waves, the surface may be polished or rough. The following simple experiment
    establishes that reflection of sound follows the same laws as those for reflection of light.
  </p>,

  <p key="b3-p-s419-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>i</em>)</strong> Place a large plane board, <em>AB</em> (of a metal, cardboard or wood) in
    the vertical position (<em>i.e.</em>, perpendicular to the plane of the paper).
  </p>,
  <p key="b3-p-s419-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>ii</em>)</strong> Take two hollow metallic tubes P and Q (each about 1 m long and about 8
    to 10 cm in diameter) and place them in the plane of the paper and in positions inclined to the board as
    shown in Fig. 4.19.
  </p>,

  <Fig key="fig-4-19"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CC991AE06F20723EE63A}
    num="Fig. 4.19" caption="Experiment to demonstrate laws of reflection of sound"
  />,

  <p key="b3-p-s419-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iii</em>)</strong> Hold a watch W at the free end of the tube P and try to hear the ticking
    sound of the watch by positioning the ear at E.
  </p>,
  <p key="b3-p-s419-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>iv</em>)</strong> Put a cardboard screen S in between the two tubes so that the sound
    produced by the watch does not reach the ear directly.
  </p>,
  <p key="b3-p-s419-6" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>v</em>)</strong> Turn the tube Q till the ticking sound of the watch is the loudest. In this
    position, it is found that the tubes are inclined to S at the same angle, <em>i.e.</em>, <em>i</em>
    (angle of incidence of sound wave) = <em>r</em> (angle of reflection of the sound wave).
  </p>,
  <p key="b3-p-s419-7" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>(<em>vi</em>)</strong> If the tube Q is lifted <em>slightly vertically upwards</em>, no sound is
    heard. This implies that the reflected sound wave (<em>OE</em>) lies in the same plane (<em>i.e.</em>, the
    plane of the paper) as the incident sound wave.
  </p>,
  <p key="b3-p-s419-8" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The normal <em>OS</em> to the surface lies in the same plane as that in which the incident and reflected
    sound waves lie.
  </p>,
  <p key="b3-p-s419-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    From this experiment, we obtain the following two laws for the reflection of sound waves. These laws are
    as follows.
  </p>,

  <DefBox key="def-s419-1">
    <strong>First Law.</strong> <em>The angle of reflection (<em>r</em>) is always equal to the angle of
    incidence (<em>i</em>), i.e., ∠<em>r</em> = ∠<em>i</em> &nbsp; or &nbsp; <em>i</em> = <em>r.</em></em>
  </DefBox>,

  <DefBox key="def-s419-2">
    <strong>Second Law.</strong> <em>The incident wave, the reflected wave and the normal (at the point of
    incidence), all lie in the same plane.</em>
  </DefBox>,

  <SecHd key="sec-s420" id="s420" label="4.20" title="Echo" />,

  <p key="b3-p-s420-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    It is a matter of common experience that when we utter a few words in a high domed hall, the words are
    repeatedly heard on account of reflection from the walls of the dome. This is what we call an echo. Thus,
  </p>,

  <DefBox key="def-s420-1">
    <em>An <strong style={{ color: P_COLOR }}>echo</strong> is the phenomenon of repetition of sound of a
    source by reflection from an obstacle.</em>
  </DefBox>,

  <p key="b3-p-s420-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    To distinguish an echo from the original sound, the obstacle must be situated at a suitable distance from
    the source of sound.
  </p>,

  <p key="b3-p-s420-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The sensation of sound lasts in our brain for (1/10) of a second. This property is called{" "}
    <strong>persistence of hearing.</strong> Therefore, to hear a distinct echo of a sound, the time taken by
    this sound to reach the listener after reflection should be (1/10) of a second. Let
  </p>,

  <p key="b3-p-s420-4" style={{ textIndent: 28, marginBottom: 4 }}>
    <em>d</em> = minimum distance of the obstacle from the source (<em>S</em>), [Fig. 4.20],
  </p>,
  <p key="b3-p-s420-5" style={{ textIndent: 28, marginBottom: 4 }}>
    <em>v</em> = speed of sound in air,
  </p>,
  <p key="b3-p-s420-6" style={{ textIndent: 28, marginBottom: 8 }}>
    <em>t</em> = total time taken by the sound to reach the listener (<em>L</em>) after reflection.
  </p>,

  <Fig key="fig-4-20"
    src={CONTENT_IMAGES.CONTENT_IMAGE_9FD0DBA1F710A6CCA2E1}
    num="Fig. 4.20" caption="Echo: minimum distance of obstacle from source"
  />,

  <p key="b3-p-s420-7" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As total distance travelled by sound = speed of sound × total time,
  </p>,
  <MathBlock key="b3-math-420-1">2<em>d</em> = <em>v</em> × <em>t</em> &nbsp; ...(1)</MathBlock>,
  <p key="b3-p-s420-8" style={{ textIndent: 28, marginBottom: 8 }}>
    Substituting v = 344 m/s (speed of sound in air at 20°C) and t = <Frac n="1" d="10" /> s, we get from
    eqn. (1),
  </p>,
  <MathBlock key="b3-math-420-2">2<em>d</em> = 344 (m/s) × (1/10) s = 34·4 m</MathBlock>,
  <MathBlock key="b3-math-420-3">or &nbsp; <em>d</em> = <strong>17·2 m</strong></MathBlock>,
  <p key="b3-p-s420-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Hence, <strong><em>for hearing a distinct echo, the minimum distance of the obstacle from the source of
    sound should be 17·2 m.</em></strong> It is to be noted that this distance changes with the change of
    temperature of air.
  </p>,

  <SecHd key="sec-s421" id="s421" label="4.21" title="Multiple Echoes" />,

  <p key="b3-p-s421-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When sound is repeatedly reflected from a number of obstacles at suitable distances, many echoes are heard
    one after the other. This constitutes multiple echoes.
  </p>,
  <p key="b3-p-s421-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 4 }}>
    <strong>Examples.</strong>{" "}
    (<em>i</em>) Multiple echoes are heard when some sound is produced between two distant buildings or cliffs.
  </p>,
  <p key="b3-p-s421-3" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) The rolling sound of thunder is on account of multiple echoes due to successive reflections
    from a number of reflecting surfaces such as mountains, clouds, land, rocks and various layers of air of
    different densities.
  </p>,

  <p key="b3-p-s421-uses" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "14px 0 6px" }}>
    Uses of Multiple Reflection of Sound
  </p>,
  <p key="b3-p-s421-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    The phenomenon of multiple reflection of sound is put to many uses and some of these are as described below.
  </p>,

  <p key="b3-p-s421-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Speaking Tube or Megaphone.</strong> Sometimes we want a given sound to travel a large distance
    before it becomes inaudible. This can be done if we avoid the wastage of sound energy by its transmission
    in all directions. We, therefore, confine the sound waves with the help of a speaking tube or a megaphone
    so that they travel in a particular direction as shown in Fig. 4.21.
  </p>,

  <Fig key="fig-4-21"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0AACD36FD9D604A9EB26}
    num="Fig. 4.21" caption="Megaphone — multiple reflections direct sound in a particular direction"
  />,

  <p key="b3-p-s421-6" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Sound waves which are now confined in a particular region by their multiple reflections from the walls of
    the tube, travel larger distance than without the help of the tube. Horns, musical instruments like
    trumpets and shehnais <em>etc.</em> are based on the same principle.
  </p>,

  <p key="b3-p-s421-7" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. Ear Trumpet.</strong> It is a sort of machine used by persons who are hard of hearing. The sound
    energy received by the wide end of the trumpet is concentrated into a much smaller area at the narrow end
    by multiple reflections. The narrow end of the trumpet which is inserted in the ear delivers the entire
    amount of energy falling on the wide end which makes the otherwise inaudible sound audible to the user.
  </p>,

  <p key="b3-p-s421-8" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>3. Hearing Aid.</strong> Whereas an ear trumpet is a mechanical device helpful only to a person
    with mild hearing loss, a hearing aid is an electronic device which is battery operated and is used by
    people with severe hearing loss. A hearing aid is fitted with a microphone which converts sound waves into
    electrical signals. An electronic amplifier amplifies these signals which are then fed to a speaker in the
    hearing aid. The speaker converts the amplified electrical signals into sound which is sent to the ear for
    clear hearing.
  </p>,

  <p key="b3-p-s421-9" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>4. Stethoscope.</strong> It is a medical instrument used frequently by doctors for making a rough
    diagnosis of the diseases existing inside the body at places which are either inaccessible or accessible
    only through major operations.
  </p>,

  <p key="b3-p-s421-10" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Construction.</strong> As shown in Fig. 4.22 (a), a stethoscope consists of: (<em>i</em>) A
    metallic disc C having a very sensitive diaphragm D encased in it. (<em>ii</em>) A cone M over the
    metallic disc is connected to a rubber tubing R. (<em>iii</em>) A three way metal tube T connects R to
    the earphones E<Sub c="1" /> and E<Sub c="2" /> through metal tubes T<Sub c="1" /> and T<Sub c="2" />.
    (<em>iv</em>) A spring S helps in adjusting the distance between the earphones E<Sub c="1" /> and
    E<Sub c="2" />.
  </p>,

  <div key="b3-fig422" style={{ display: "flex", justifyContent: "center", gap: 16, margin: "16px 0", flexWrap: "wrap" }}>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_07D192372CB1380C264F}
        alt="Stethoscope (a)"
        style={{ maxWidth: 140, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(a)</p>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_AF45B99021A0C2F7DD8C}
        alt="Stethoscope (b)"
        style={{ maxWidth: 80, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(b)</p>
    </div>
  </div>,
  <p key="b3-fig422-cap" style={{ textAlign: "center", fontSize: 12.5, color: P_COLOR, fontWeight: 700, marginBottom: 8 }}>Fig. 4.22. Stethoscope</p>,

  <p key="b3-p-s421-11" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong>Working.</strong> The metal case C containing the diaphragm is gently pressed against the part of
    the body to be examined. The vibrations of this part are communicated to the diaphragm D which starts
    vibrating. As shown in Fig. 4.22 (b), these vibrations suffer multiple reflections in the tubes R, T,
    T<Sub c="1" /> and T<Sub c="2" /> and ultimately reach the earphones. The original sound produced by the
    part of the human body is exactly reproduced in the earphones and a preliminary diagnosis of the ailment
    is made.
  </p>,

  <p key="b3-p-s421-12" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>5. Design of Concert Halls, Cinema Halls and Conference Halls.</strong>
  </p>,
  <p key="b3-p-s421-13" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>i</em>) The ceilings of these halls are curved. This enables the sound to reach all corners of the
    hall after reflection from the ceiling as shown in Fig. 4.23 (a).
  </p>,

  <div key="b3-fig423" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "16px 0", flexWrap: "wrap" }}>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_B0D120BE49A5E5141AE4}
        alt="Concert hall curved ceiling (a)"
        style={{ maxWidth: 180, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(a) Curved ceiling</p>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_FA582B446C033CE32A78}
        alt="Concert hall sound board (b)"
        style={{ maxWidth: 160, height: "auto", border: "1px solid #ddd" }}
        onError={e => { e.target.style.display="none"; }}
      />
      <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(b) Sound board</p>
    </div>
  </div>,
  <p key="b3-fig423-cap" style={{ textAlign: "center", fontSize: 12.5, color: P_COLOR, fontWeight: 700, marginBottom: 8 }}>Fig. 4.23</p>,

  <p key="b3-p-s421-14" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) A sound board, which is a curved (parabolic or concave) sound reflecting surface, is placed
    behind the stage. The source of sound is located at the focus of this reflecting surface. Sound waves
    coming from the source become parallel after reflection from the sound board and spread evenly throughout
    the width of the hall as shown in Fig. 4.23 (b).
  </p>,

  <p key="b3-p-s421-15" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>6. Whispering galleries and historical buildings.</strong>
  </p>,
  <p key="b3-p-s421-16" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Some architectural designs create fascinating and unexpected acoustic effects. A whispering gallery is a
    circular or elliptical enclosure where a sound made near the wall on one side can be heard clearly on the
    opposite side, even if it is just a faint whisper.
  </p>,
  <p key="b3-p-s421-17" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    This happens because of a phenomenon called continuous reflection. When you whisper along the curved wall,
    the sound waves do not travel straight across the enclosure. Instead, they bounce along the smooth, concave
    surface, hugging the wall as they travel. They experience very little energy loss as they reflect multiple
    times, allowing them to travel a great distance.
  </p>,

  <FeatureBox key="feat-gol-gumbaz" title="The Whispering Gallery of Gol Gumbaz">
    <p style={{ textAlign: "justify", marginBottom: 8, fontSize: 14 }}>
      One of the most famous examples of a whispering gallery in India is found at the <strong>Gol Gumbaz</strong>{" "}
      in Bijapur, Karnataka, see Fig. 4.24(a). Built in the 17th century, Gol Gumbaz is the mausoleum of
      Sultan Muhammad Adil Shah. It has one of the largest domes in the world. The dome has a circular gallery
      at its base known as the "Whispering Gallery". Due to the unique acoustics of the dome: A faint whisper
      or soft sound made at one end of the gallery can be heard clearly at the other end, which is about 37
      metres away (Fig. 4.24(b)). The sound reflects multiple times along the curved surface of the dome
      before reaching the other side. Even the softest sound is said to be repeated nearly 7 times due to the
      multiple reflections.
    </p>
    <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", margin: "12px 0" }}>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_8E7C2EEBE21A62525526}
          alt="Gol Gumbaz external view"
          style={{ maxWidth: 180, height: "auto", border: "1px solid #ddd" }}
          onError={e => { e.target.style.display="none"; }}
        />
        <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(a) Gol Gumbaz (external view)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={CONTENT_IMAGES.CONTENT_IMAGE_5E5BFBC2A241D08235AD}
          alt="Cross-section of dome interior"
          style={{ maxWidth: 200, height: "auto", border: "1px solid #ddd" }}
          onError={e => { e.target.style.display="none"; }}
        />
        <p style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginTop: 4 }}>(b) Cross-section of dome interior</p>
      </div>
    </div>
    <p style={{ textAlign: "center", fontSize: 12.5, color: P_COLOR, fontWeight: 700, marginBottom: 8 }}>Fig. 4.24. Gol Gumbaz and Whispering Gallery</p>
    <p style={{ textAlign: "justify", marginBottom: 8, fontSize: 14 }}>
      This acoustic phenomenon made the Whispering Gallery of Gol Gumbaz famous worldwide. It is a remarkable
      example of how sound reflection was understood and utilised, whether intentionally or accidentally, in
      historical architecture.
    </p>
    <p style={{ fontSize: 14, marginBottom: 4 }}>Other famous examples of whispering galleries include:</p>
    <p style={{ fontSize: 14, marginBottom: 4 }}>
      (<em>i</em>) The Whispering Gallery at St. Paul's Cathedral in London
    </p>
    <p style={{ fontSize: 14, marginBottom: 4 }}>
      (<em>ii</em>) The Mapparium in Boston
    </p>
    <p style={{ textAlign: "justify", fontSize: 14, marginBottom: 0 }}>
      These spaces demonstrate the practical applications of the laws of reflection of sound in architectural
      design.
    </p>
  </FeatureBox>,

  <SecHd key="sec-s422" id="s422" label="4.22" title="Reverberation" />,

  <p key="b3-p-s422-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    When a sharp sound is made in a hall, the listener cannot hear it as such. It is found to get prolonged.
    The intensity of sound first reaches a maximum and then falls till it becomes inaudible. This happens on
    account of a number of reflections of sound from different parts of the hall. The sound energy goes on
    decreasing with successive reflections (till it is no longer audible). It is interesting to note that a
    sound wave suffers 300 reflections in a room of ordinary size before becoming inaudible.
  </p>,

  <DefBox key="def-s422-1">
    <em>The phenomenon of persistence or prolongation of audible sound after the source has stopped emitting
    sound is called <strong style={{ color: P_COLOR }}>reverberation.</strong> The time for which reverberation
    persists until it becomes inaudible is called{" "}
    <strong style={{ color: P_COLOR }}>reverberation time.</strong></em>
  </DefBox>,

  <p key="b3-p-s422-2" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    In case of sharp or short-duration sounds, reverberation time is counted from the instant of production of
    sound. In case of continuous note, reverberation time is counted from the instant the source stops
    sounding.
  </p>,

  <p key="b3-p-s422-3" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13.5, color: P_COLOR, margin: "12px 0 6px" }}>
    How is reverberation reduced?
  </p>,

  <p key="b3-p-s422-4" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    Since reverberation is due to repeated reflections of sound waves from the ceiling, floor, walls <em>etc.</em>{" "}
    of a hall or an auditorium, we can reduce it by increasing the absorption of sound energy. To achieve this:
  </p>,

  <p key="b3-p-s422-5" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>i</em>) The walls are covered with some sound absorbing material like felt, fibreboard, glass wool
    <em> etc.</em> or by heavy curtains with folds.
  </p>,
  <p key="b3-p-s422-6" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>ii</em>) The floor is carpeted.
  </p>,
  <p key="b3-p-s422-7" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>iii</em>) The furniture is upholstered.
  </p>,
  <p key="b3-p-s422-8" style={{ textAlign: "justify", marginBottom: 8 }}>
    (<em>iv</em>) False ceiling of a suitable sound absorbing material is used.
  </p>,

  <p key="b3-p-s422-9" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    <strong><em>It should be carefully understood that a certain amount of reverberation is desirable.</em></strong>{" "}
    This would enrich the music played or speech delivered and make it more pleasant. So the real job is to
    reduce reverberation to the right amount and not to completely eliminate it.
  </p>,
];

// ── BATCH 4: SOLVED PROBLEMS (ECHOES) + PRACTICE + SOLUTIONS + 4.23–4.26 ────

const content_b4 = [

  <NumericalSection key="num-echoes" topic="ECHOES">

    <div key="b4-echo-formulae" style={{ border: "1px solid #c0126a", padding: "10px 14px", marginBottom: 16, background: LIGHT_P }}>
      <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, fontSize: 13, margin: "0 0 6px", color: P_COLOR }}>
        FORMULAE AND UNITS
      </p>
      <p style={{ margin: "0 0 4px", fontSize: 13.5 }}>
        d = v t/2
      </p>
      <p style={{ margin: "0", fontSize: 13, color: "#555" }}>
        where d is the distance between the source of sound and the obstacle, t is the time taken by sound in
        going to the obstacle and coming back and v is the speed of sound. d is measured in metre, v in m/s
        and t in second.
      </p>
    </div>

    <p key="b4-ep1-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 1. A person clapped his hands near a cliff and heard the echo after 5 s. What is the distance
      of the cliff from the person if the speed of the sound, v is taken as 346 m/s?
    </p>
    <p key="b4-ep1-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, speed of sound, v = 346 m/s
    </p>
    <p key="b4-ep1-s2" style={{ marginBottom: 4, fontSize: 14 }}>time taken for hearing the echo, t = 5 s</p>
    <p key="b4-ep1-s3" style={{ marginBottom: 4, fontSize: 14 }}>
      If d is the distance between the cliff and the person, total distance travelled by the sound in going
      and coming back = 2d
    </p>
    <MathBlock key="b4-math-ep1">
      2d = vt &nbsp; or &nbsp; d = <Frac n="vt" d="2" /> = <Frac n="(346 m/s)(5s)" d="2" /> = <strong>865 m</strong>
    </MathBlock>

    <p key="b4-ep2-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 2. A boy standing in front of wall at a distance of 85 m produces 2 claps per second. He
      notices that the sound of his clapping coincides with the echo. The echo is heard only once when
      clapping is stopped. Calculate the speed of sound.
    </p>
    <p key="b4-ep2-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, distance of the boy from the wall, d = 85 m
    </p>
    <p key="b4-ep2-s2" style={{ marginBottom: 4, fontSize: 14 }}>
      time taken by the echo to be heard, t = <Frac n="1" d="2" /> s = 0·5 s
    </p>
    <MathBlock key="b4-math-ep2">
      2d = vt &nbsp; or &nbsp; v = <Frac n="2d" d="t" /> = <Frac n="2 (85 m)" d="0·5 s" /> = <strong>340 m/s</strong>
    </MathBlock>

    <p key="b4-ep3-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 3. A man stationed between two parallel cliffs fires a gun. He hears the first echo after 1·5 s
      and the next after 2·5 s. What is the distance between the cliffs and when does he hear the third echo?
      Take the speed of sound in air as 340 m/s.
    </p>
    <p key="b4-ep3-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Here, velocity of sound in air, v = 340 m/s; t<Sub c="1" /> = 1·5 s;
      t<Sub c="2" /> = 2·5 s
    </p>
    <p key="b4-ep3-s2" style={{ marginBottom: 4, fontSize: 14 }}>
      Let A and B represent two parallel cliffs and O be the position of the man as shown in Fig. 4.25.
      Let d<Sub c="1" /> and d<Sub c="2" /> be the distances of the man from these cliffs A and B respectively.
    </p>

    <Fig key="fig-4-25"
      src={CONTENT_IMAGES.CONTENT_IMAGE_D95267B427D02273F089}
      num="Fig. 4.25" caption="Man between two parallel cliffs A and B"
    />,

    <p key="b4-ep3-s3" style={{ fontStyle: "italic", marginBottom: 4, fontSize: 14 }}>Reflection from cliff A</p>
    <p key="b4-ep3-s4" style={{ marginBottom: 4, fontSize: 14 }}>
      Time (t<Sub c="1" />) after which the <strong>first echo</strong> is heard = time taken by sound to travel
      from O to A and back to O again, <em>i.e.</em>, a distance 2d<Sub c="1" />.
    </p>
    <MathBlock key="b4-math-ep3a">
      2d<Sub c="1" /> = v t<Sub c="1" /> &nbsp; or &nbsp; d<Sub c="1" /> = <Frac n="v t₁" d="2" /> = <Frac n="(340 m/s)(1·5s)" d="2" /> = <strong>255 m</strong>
    </MathBlock>
    <p key="b4-ep3-s5" style={{ fontStyle: "italic", marginBottom: 4, fontSize: 14 }}>Reflection from cliff B</p>
    <MathBlock key="b4-math-ep3b">
      d<Sub c="2" /> = <Frac n="v t₂" d="2" /> = <Frac n="(340 m/s)(2·5s)" d="2" /> = <strong>425 m</strong>
    </MathBlock>
    <MathBlock key="b4-math-ep3c">
      Distance between the two cliffs, d = d<Sub c="1" /> + d<Sub c="2" /> = 255 m + 425 m = <strong>680 m</strong>
    </MathBlock>
    <p key="b4-ep3-s6" style={{ marginBottom: 4, fontSize: 14 }}>
      The third echo is heard when sound after reflection from cliff A goes to cliff B and then after
      reflection from it reaches O.
    </p>
    <MathBlock key="b4-math-ep3d">
      Time taken for the third echo, t = t<Sub c="1" /> + t<Sub c="2" /> = 1·5 s + 2·5 s = <strong>4 s</strong>
    </MathBlock>

    <p key="b4-ep4-q" style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
      Problem 4. A man fires a shot and hears an echo from a cliff after 2 s. He walks 85 m towards the cliff
      and the echo of a second shot is now heard after 1·4 s. What is the velocity of sound and how far was
      the man from the cliff when he first heard the echo?
    </p>
    <p key="b4-ep4-s1" style={{ marginBottom: 4, fontSize: 14 }}>
      <strong>Solution.</strong> Let the man be stationed at A at a distance d from the cliff C, so AC = d as
      shown in Fig. 4.26.
    </p>

    <Fig key="fig-4-26"
      src={CONTENT_IMAGES.CONTENT_IMAGE_F970FF669758D840D6AF}
      num="Fig. 4.26" caption="Man walking towards cliff — first and second echo"
    />,

    <p key="b4-ep4-s2" style={{ marginBottom: 4, fontSize: 14 }}>
      Since a time of 2 s is taken by the <strong>first echo</strong> to be heard,
    </p>
    <MathBlock key="b4-math-ep4a">
      2d = v × 2 = 2v &nbsp; (<em>v</em> is the speed of sound) &nbsp; or &nbsp; d = v &nbsp; ...(i)
    </MathBlock>
    <p key="b4-ep4-s3" style={{ marginBottom: 4, fontSize: 14 }}>
      After walking 85 m, the man comes to B where BC = (d − 85) m. For the echo of the{" "}
      <strong>second shot</strong> to be heard, sound travels a distance 2(d − 85) m = (2d − 170) m. Since
      echo of the second shot is heard after 1·5 s,
    </p>
    <MathBlock key="b4-math-ep4b">
      (2d − 170 m) = v × 1·5 = <Frac n="3v" d="2" /> &nbsp; ...(ii)
    </MathBlock>
    <p key="b4-ep4-s4" style={{ marginBottom: 4, fontSize: 14 }}>From eqns. (i) and (ii),</p>
    <MathBlock key="b4-math-ep4c">
      2d − 170 m = <Frac n="3d" d="2" /> &nbsp; or &nbsp; d = <strong>340 m</strong>
    </MathBlock>
    <MathBlock key="b4-math-ep4d">
      Speed of sound, v = d = <strong>340 m/s</strong>
    </MathBlock>

  </NumericalSection>,

  // ── PROBLEMS FOR PRACTICE (Echoes) ──

  <ProblemsBox key="prob-echoes">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside",
      fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>
        A child hears an echo from a cliff 4 s after the sound of a powerful cracker is produced. How far
        away is the cliff from the child? (Take speed of sound in air as 340 m/s){" "}
        <strong>[Ans. 680 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        An observer standing between two cliffs fires a gun. He hears one echo after 1·5 s and another after
        3·5 s. If the speed of sound is 340 m/s, find (<em>a</em>) the distance of the observer from the
        first cliff and (<em>b</em>) distance between the cliffs.{" "}
        <strong>[Ans. (<em>a</em>) 255 m (<em>b</em>) 850 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A boy stands 60 m in front of a tall wall and claps. The boy continues to clap every time an echo is
        heard. Another boy finds that the time between the first (1st) and the fifty first (51st) clap is
        18 s. Calculate the speed of sound. <strong>[Ans. 333·3 m/s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A person standing between two vertical cliffs and 680 m away from the nearest cliff, shouted. He
        heard the first echo after 4 s and the second echo 3 s later. Calculate (<em>a</em>) the speed of
        sound in air and (<em>b</em>) distance between the two cliffs.{" "}
        <strong>[Ans. (<em>a</em>) 340 m/s (<em>b</em>) 1870 m]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A man standing at 51 m from a wall fires a gun. Calculate the time after which an echo is heard.
        The speed of sound is 340 m/s. <strong>[Ans. 0·3 s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        A man fires a gun towards a hill and hears its echo after 5 s. He then moves 340 m towards the hill
        and fires his gun again. This time he hears the echo after 3 s. Calculate the speed of sound.{" "}
        <strong>[Ans. 340 m/s]</strong>
      </li>
      <li style={{ marginBottom: 6 }}>
        An engine is approaching a hill at constant speed. When it is at a distance of 0·9 km, it blows a
        whistle, whose echo is heard by the driver after 5 s. If the speed of sound is 340 m/s, calculate
        the speed of the engine. <strong>[Ans. 20 m/s]</strong>
      </li>
    </ol>
  </ProblemsBox>,

  // ── SOLUTIONS/EXPLANATIONS (Echoes) ──

  <div key="b4-echo-solutions-hd" style={{ background: "#f0f0f0", border: "1px solid #ccc",
    padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800,
    fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,

  <p key="b4-es1" style={{ margin: "0 0 6px" }}>
    <strong>1.</strong> Here,
  </p>,
  <MathBlock key="b4-es1-math">
    t = 4 s,&nbsp; v = 340 m/s,&nbsp; d = <Frac n="vt" d="2" /> = <Frac n={<>(340 m/s)(4 s)</>} d="2" /> = <strong>680 m</strong>
  </MathBlock>,

  <p key="b4-es2" style={{ margin: "0 0 6px" }}>
    <strong>2.</strong> Here,
  </p>,
  <MathBlock key="b4-es2-math">
    t<Sub c="1" /> = 1·5 s,&nbsp; t<Sub c="2" /> = 3·5 s,&nbsp; v = 340 m/s
  </MathBlock>,
  <MathBlock key="b4-es2a-math">
    d<Sub c="1" /> = <Frac n={<>vt<Sub c="1" /></>} d="2" /> = <Frac n={<>(340 m/s)(1·5 s)</>} d="2" /> = 255 m
  </MathBlock>,
  <MathBlock key="b4-es2b-math">
    d<Sub c="2" /> = <Frac n={<>vt<Sub c="2" /></>} d="2" /> = <Frac n={<>(340 m/s)(3·5 s)</>} d="2" /> = 595 m
  </MathBlock>,
  <p key="b4-es2c" style={{ margin: "0 0 6px" }}>
    Distance between the two cliffs, d = d<Sub c="1" /> + d<Sub c="2" /> = 255 m + 595 m = <strong>850 m</strong>
  </p>,

  <p key="b4-es3" style={{ margin: "0 0 4px" }}>
    <strong>3.</strong> Here, t = <Frac n="18" d="50" /> s; d = 60 m. As d = <Frac n="vt" d="2" />,
  </p>,
  <MathBlock key="b4-es3-math">
    v = <Frac n="2d" d="t" /> = <Frac n={<>2 (60 m)</>} d={<>(18/50) s</>} /> = <strong>333·3 m/s</strong>
  </MathBlock>,

  <p key="b4-es4" style={{ margin: "0 0 4px" }}>
    <strong>4.</strong> Here, t<Sub c="1" /> = 4 s and t<Sub c="2" /> = 3 s, d<Sub c="1" /> = 680 m
  </p>,
  <MathBlock key="b4-es4a-math">
    (<em>a</em>)&nbsp; As d<Sub c="1" /> = <Frac n={<>vt<Sub c="1" /></>} d="2" />,&nbsp; v = <Frac n={<>2d<Sub c="1" /></>} d={<>t<Sub c="1" /></>} /> = <Frac n="2 (680 m)" d="4 s" /> = <strong>340 m/s</strong>
  </MathBlock>,
  <MathBlock key="b4-es4b-math">
    (<em>b</em>)&nbsp; d<Sub c="2" /> = <Frac n={<>v(t<Sub c="1" /> + t<Sub c="2" />)</>} d="2" /> = <Frac n={<>(340 m/s)(4+3) s</>} d="2" /> = 1190 m
  </MathBlock>,
  <p key="b4-es4c" style={{ margin: "0 0 6px" }}>
    Distance between two cliffs, d = d<Sub c="1" /> + d<Sub c="2" /> = 680 m + 1190 m = <strong>1870 m</strong>
  </p>,

  <p key="b4-es5" style={{ margin: "0 0 4px" }}>
    <strong>5.</strong> Here, d = 51 m, v = 340 m/s.
  </p>,
  <MathBlock key="b4-es5-math">
    d = <Frac n="vt" d="2" />,&nbsp; t = <Frac n="2d" d="v" /> = <Frac n="2 (51 m)" d="340 m/s" /> = <strong>0·3 s</strong>
  </MathBlock>,

  <p key="b4-es6" style={{ margin: "0 0 4px" }}>
    <strong>6.</strong> Here,
  </p>,
  <MathBlock key="b4-es6-math">
    t<Sub c="1" /> = 5 s,&nbsp; t<Sub c="2" /> = 3 s.
  </MathBlock>,
  <p key="b4-es6-as" style={{ margin: "0 0 2px" }}>As&nbsp; d = <Frac n="vt" d="2" />,&nbsp; v = <Frac n="2d" d="t" />.</p>,
  <p key="b4-es6a" style={{ margin: "0 0 2px" }}>In the first case,</p>,
  <MathBlock key="b4-es6a-math">
    v = <Frac n="2d" d={<>t<Sub c="1" /></>} /> = <Frac n="2d" d="5" /> &nbsp;&nbsp; ...(i)
  </MathBlock>,
  <p key="b4-es6b" style={{ margin: "0 0 2px" }}>In the second case,</p>,
  <MathBlock key="b4-es6b-math">
    v = <Frac n={<>2(d − 340)</>} d={<>t<Sub c="2" /></>} /> = <Frac n="2(d − 340)" d="3" /> &nbsp;&nbsp; ...(ii)
  </MathBlock>,
  <p key="b4-es6c" style={{ margin: "0 0 2px" }}>From eqns. (i) and (ii),</p>,
  <MathBlock key="b4-es6c-math">
    <Frac n="2d" d="5" /> = <Frac n="2(d − 340)" d="3" />&nbsp; or &nbsp;3d = 5d − 1700&nbsp; or &nbsp;d = 850 m
  </MathBlock>,
  <p key="b4-es6d" style={{ margin: "0 0 6px" }}>
    From eqn. (i),&nbsp; v = <Frac n="2 (850 m)" d="5 s" /> = <strong>340 m/s</strong>
  </p>,

  <p key="b4-es7" style={{ margin: "0 0 4px" }}>
    <strong>7.</strong> Let v<Sub c="e" /> be the speed of the engine.
  </p>,
  <p key="b4-es7a" style={{ margin: "0 0 2px" }}>
    Distance covered by the engine in 5 s = 5v<Sub c="e" />
  </p>,
  <p key="b4-es7b" style={{ margin: "0 0 4px" }}>
    Distance covered by sound in reaching the hill and coming back to the moving driver
  </p>,
  <MathBlock key="b4-es7b-math">
    = (900 × 2 − 5v<Sub c="e" />) = 1800 − 5v<Sub c="e" />&nbsp; (0·9 km = 900 m)
  </MathBlock>,
  <p key="b4-es7c" style={{ margin: "0 0 2px" }}>
    According to the given conditions, t = <Frac n={<>1800 − 5v<Sub c="e" /></>} d="v" />
  </p>,
  <p key="b4-es7d" style={{ margin: "0 0 2px" }}>
    As t = 5 s and v (speed of sound) = 340 m/s,
  </p>,
  <MathBlock key="b4-es7-math">
    5 = <Frac n={<>1800 − 5v<Sub c="e" /></>} d="340" />&nbsp; or &nbsp;1700 = 1800 − 5v<Sub c="e" />&nbsp; or &nbsp;v<Sub c="e" /> = <strong>20 m/s</strong>
  </MathBlock>,

  // ── SECTION 4.23: RANGE OF FREQUENCIES ──

  <SecHd key="sec-s423" id="s423" label="4.23" title="Range of Frequencies" />,

  <p key="b4-p-s423-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    There are three categories of longitudinal mechanical waves which cover different ranges of frequencies.
  </p>,

  <p key="b4-p-s423-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>1. Sound waves or Audible waves.</strong>{" "}
    <strong><em>These waves have frequencies which lie between 20 Hz to 20 kHz.</em></strong> It is this range
    to which human ear is sensitive. This range of frequencies is called the{" "}
    <strong>audio-frequency range (a.f. range).</strong> These waves are generated in a variety of ways such
    as musical instruments, human vocal cords, insects and loudspeakers. The frequency of sound waves emitted
    by a grown up male varies from 100 Hz to 250 Hz whereas that for children, it varies from 200 Hz to 450 Hz.
    The frequency of sound waves given by a honey bee is about 440 Hz, that of a mosquito around 500 Hz to 600
    Hz and that of an ordinary housefly is around 350 Hz.
  </p>,

  <p key="b4-p-s423-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>2. Infrasonic waves or Infrasound.</strong>{" "}
    <strong><em>Those longitudinal waves whose frequencies are below 20 Hz are called infrasonics.</em></strong>{" "}
    Earthquake waves are an example. During earthquakes, low frequency infrasound produced before the main shock
    waves, alerts the animals. Rhinoceroses communicate using infrasound of frequency as low as 5 Hz whereas
    whales and elephants also produce sound in the infrasonic range. The useful applications of infrasound are
    still in the initial process of investigation. In fact, in some instances, infrasound has proved dangerous.
    It is found that at very low frequencies of 5 Hz to 10 Hz, certain organs of the body tend to resonate,
    leading to vibration-induced illness. This resonating of one organ leads to rubbing against another, thereby
    producing noticeable ill effects.
  </p>,

  <p key="b4-p-s423-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong style={{ color: P_COLOR }}>3. Ultrasonic waves or Ultrasound.</strong>{" "}
    <strong><em>Those longitudinal waves whose frequencies lie above 20 kHz are called ultrasonic waves,
    ultrasonics or ultrasounds.</em></strong> Though human ear cannot detect these waves, certain creatures
    such as mosquito, fish, dog and bat show response to these frequencies. For example, a dog can hear sounds
    of frequency up to 38 kHz and as such responds to the dog whistle (called{" "}
    <strong>Galton Whistle</strong>) that humans cannot hear. The frequency of note produced by a bat varies
    from 30 kHz to 50 kHz. Dolphins emit ultrasound in the frequency range of 100 kHz. Porpoises
    (blunt-nosed sea-mammals like dolphins) and rats also produce ultrasound.
  </p>,

  <SecHd key="sec-s424" id="s424" label="4.24" title="Applications of Ultrasound" />,

  <p key="b4-p-s424-1" style={{ textIndent: 28, textAlign: "justify", marginBottom: 8 }}>
    As said earlier, ultrasounds have very high frequencies (greater than 20 kHz). Contrary to audible sounds
    (which have lower frequencies), ultrasound can be obtained in the form of a narrow beam which can travel
    along well-defined paths even in the presence of obstacles. Such well-defined narrow beams of ultrasonic
    waves find application in many fields. We shall, however, limit our discussion to their application in:
    (<em>i</em>) Industry &nbsp; (<em>ii</em>) Medical science &nbsp; and &nbsp; (<em>iii</em>) Communication
    (SONAR).
  </p>,

  <SecHd key="sec-s425" id="s425" label="4.25" title="Industrial Uses of Ultrasound" />,

  <p key="b4-p-s425-1" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Cleaning instruments and electronic components.</strong> The cleaning is done by the method
    called <strong>cavitation</strong> or <strong>coldboiling.</strong> An instrument that needs cleaning but
    whose parts cannot be reached directly is placed in a liquid. The ultrasonic waves passing through the
    liquid produce tiny bubbles where the rarefaction of the ultrasonic wave reaches. When the compression of
    the wave reaches these bubbles, the bubbles are compressed until they implode (explode inward). This leads
    to the creation of several small localized shock waves. These shock waves blast away any dirt or
    contamination from the unreachable portions. Usually, frequencies in the range 20 kHz to 30 kHz are used
    for this purpose.
  </p>,

  <p key="b4-p-s425-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. Plastic welding.</strong> Application of small pressures and ultrasonic vibration to two similar
    surfaces produce sufficient thermal energy to bond the surfaces together.
  </p>,

  <p key="b4-p-s425-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>3. Detecting flaws and cracks in metal blocks.</strong> To construct big structures like buildings,
    bridges, machines and scientific equipment, a large number of metallic blocks are assembled together.
    Cracks and holes within the blocks, which are invisible from outside, reduce the strength of a structure.
    To detect these flaws (cracks and holes) in a block, ultrasonic waves are passed through it. Transmitted
    waves are detected by detectors. Whereas ultrasonic waves pass through the flawless portions of the block,
    they are reflected back by even a minor defect and do not reach the detector as shown in Fig. 4.27.
  </p>,

  <Fig key="fig-4-27"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CAF082E121B5BD788A0A}
    num="Fig. 4.27" caption="Detecting flaws and cracks in metal blocks using ultrasonic waves"
  />,

  <SecHd key="sec-s426" id="s426" label="4.26" title="Medical Uses of Ultrasound" />,

  <p key="b4-p-s426-1" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>1. Echocardiography.</strong> It is used to study the heart-valve action. An image of the heart is
    obtained by getting ultrasonic waves reflected from various parts of the heart.
  </p>,

  <p key="b4-p-s426-2" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>2. Ultrasonography.</strong> It involves sending ultrasonic waves to various organs (like brain,
    liver, kidneys) in the body and looking at the reflected or transmitted waves. The observations are made
    on an oscilloscope after the ultrasonic waves have been converted into electrical signals. Using
    ultrasonography, stones in gallbladder and kidneys or tumours in different organs can be detected.
    Ultrasonography is also used in prenatal examinations. A three-dimensional image of a foetus in the womb
    is made using a sequence of ultrasound scans. Ultrasound is more sensitive than X-rays in distinguishing
    various kinds of tissues and does not have the radiation hazards associated with X-rays.
  </p>,

  <p key="b4-p-s426-3" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>3. Surgical uses.</strong> Ultrasound is used for bloodless brain surgery as well as painless
    extraction of teeth <em>etc.</em> It is also used to break small stones formed in the kidneys into fine
    particles which later on get flushed out with urine.
  </p>,

  <p key="b4-p-s426-4" style={{ textAlign: "justify", marginBottom: 8 }}>
    <strong>4. Therapeutic uses.</strong> Ultrasound is used for treatment of neuralgic and rheumatic pains.
  </p>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s41",       label: "4.1",  title: "Introduction",                                          level: 1 },
  { id: "s42",       label: "4.2",  title: "What is Sound?",                                         level: 1 },
  { id: "s43",       label: "4.3",  title: "Production of Sound",                                    level: 1 },
  { id: "s44",       label: "4.4",  title: "Propagation of Sound",                                   level: 1 },
  { id: "s45",       label: "4.5",  title: "Sound Needs a Medium to Travel",                         level: 1 },
  { id: "s46",       label: "4.6",  title: "Production of Compressions and Rarefactions",            level: 1 },
  { id: "s47",       label: "4.7",  title: "Sound Waves are Longitudinal Waves",                     level: 1 },
  { id: "s48",       label: "4.8",  title: "Transverse Wave Motion",                                 level: 1 },
  { id: "s49",       label: "4.9",  title: "Variation in Pressure and Density",                      level: 1 },
  { id: "s410",      label: "4.10", title: "Relation Between Frequency and Time Period",              level: 1 },
  { id: "s411",      label: "4.11", title: "Relation Between Speed, Frequency and Wavelength",       level: 1 },
  { id: "s412",      label: "4.12", title: "Speed of Sound in Different Media",                      level: 1 },
  { id: "s413",      label: "4.13", title: "Characteristics of Sound",                               level: 1 },
  { id: "s414",      label: "4.14", title: "Loudness or Intensity",                                  level: 1 },
  { id: "s415",      label: "4.15", title: "Intensity of Sound",                                     level: 1 },
  { id: "s415-diff", label: "",     title: "Difference: Loudness vs Intensity",                      level: 2 },
  { id: "s416",      label: "4.16", title: "Pitch or Frequency",                                     level: 1 },
  { id: "s417",      label: "4.17", title: "Quality or Timbre",                                      level: 1 },
  { id: "s418",      label: "4.18", title: "Music and Noise",                                        level: 1 },
  { id: "s419",      label: "4.19", title: "Reflection of Sound",                                    level: 1 },
  { id: "s420",      label: "4.20", title: "Echo",                                                   level: 1 },
  { id: "s421",      label: "4.21", title: "Multiple Echoes",                                        level: 1 },
  { id: "s422",      label: "4.22", title: "Reverberation",                                          level: 1 },
  { id: "s423",      label: "4.23", title: "Range of Frequencies",                                   level: 1 },
  { id: "s424",      label: "4.24", title: "Applications of Ultrasound",                             level: 1 },
  { id: "s425",      label: "4.25", title: "Industrial Uses of Ultrasound",                          level: 1 },
  { id: "s426",      label: "4.26", title: "Medical Uses of Ultrasound",                             level: 1 },
];

// ── CONCAT ALL CONTENT ARRAYS ────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
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
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)" }}>
        <ChapterCover />
        {allContent}
      </div>
    </div>
  );
}
