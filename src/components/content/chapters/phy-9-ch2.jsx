"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── DESIGN TOKENS ────────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P = "#f9eef4";

// ── FONTS ────────────────────────────────────────────────────
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
    <span style={{ borderBottom: "1.5px solid #1a1a1a", padding: "0 4px 1px", textAlign: "center", whiteSpace: "nowrap" }}>{n}</span>
    <span style={{ padding: "1px 4px 0", textAlign: "center", whiteSpace: "nowrap" }}>{d}</span>
  </span>
);

const MathBlock = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 20px", fontStyle: "italic", fontSize: "14.5px", lineHeight: 1.6 }}>{children}</div>
);

const Arrow = () => <span style={{ margin: "0 6px" }}>⟶</span>;
const Eq   = () => <span style={{ margin: "0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin: "0 4px" }}>×</span>;

// ── HEADING HIERARCHY ────────────────────────────────────────
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

// ── HAMBURGER BUTTON ─────────────────────────────────────────
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
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)", fontFamily: "system-ui,sans-serif",
      }}>
      {open ? "✕" : "☰"}
    </button>
  );
}

// ── OVERLAY BACKDROP ─────────────────────────────────────────
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.18)",
      backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)",
    }} />
  );
}

// ── TOC DRAWER ───────────────────────────────────────────────
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
        fontWeight: 900, fontSize: 13, letterSpacing: 2, flexShrink: 0,
      }}>
        TABLE OF CONTENTS
      </div>
      <nav style={{ padding: "8px 0", flex: 1 }}>
        {tocItems.map(item => (
          <button key={item.id} onClick={() => handleClick(item.id)} style={{
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

// ── CHAPTER COVER ────────────────────────────────────────────
const ChapterCover = () => (
  <div style={{ background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
    padding: "60px 48px 50px", textAlign: "center", marginBottom: 0 }}>
    <div style={{ display: "inline-block", border: "3px solid #fff", padding: "8px 28px", marginBottom: 18 }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 56, color: "#fff", lineHeight: 1 }}>
        2
      </span>
    </div>
    <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 32, color: "#fff", letterSpacing: 2,
      textTransform: "uppercase", margin: 0, lineHeight: 1.25 }}>
      Forces and Laws of Motion
    </h1>
  </div>
);

// ── IMAGE URLS ───────────────────────────────────────────────
const IMG = {
  fig21a: CONTENT_IMAGES.CONTENT_IMAGE_02924AEFB998D9E20B1B,
  fig21b: CONTENT_IMAGES.CONTENT_IMAGE_75C481EDFFDF957C195E,
  fig22:  CONTENT_IMAGES.CONTENT_IMAGE_B349F6387F61DC8253C7,
  fig23:  CONTENT_IMAGES.CONTENT_IMAGE_5FE48C29CA09051278CF,
  fig24:  CONTENT_IMAGES.CONTENT_IMAGE_4D1DECFC1067D5A7FAE0,
  fig25:  CONTENT_IMAGES.CONTENT_IMAGE_26BA4ED52AE9334D133F,
  fig26:  CONTENT_IMAGES.CONTENT_IMAGE_BC6409C39A2741D02A4F,
  fig27:  CONTENT_IMAGES.CONTENT_IMAGE_FD35AEA29E7C3111B908,
  fig28:  CONTENT_IMAGES.CONTENT_IMAGE_14E3FC367B1E222EAD74,
  fig29:  CONTENT_IMAGES.CONTENT_IMAGE_088369A3BB428464B7CF,
  fig210: CONTENT_IMAGES.CONTENT_IMAGE_DBA0BE5FED1DDFF190C3,
  badge3: CONTENT_IMAGES.CONTENT_IMAGE_D1666369FB3B27267540,
};

// ── BATCH 1 CONTENT ──────────────────────────────────────────
const content_b1 = [
  // 2.1 Introduction
  <SecHd key="sec-s21" id="s21" label="2.1" title="Introduction" />,
  <p key="b1-p-s21-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In the last chapter, we studied motion of a body along a straight line in terms of its velocity, acceleration and distance travelled by the body in a particular time. We know that motion can be uniform or non-uniform. In the present chapter, we shall try to understand the causes of motion. Do all motions require a cause? If so, what is the nature of this cause? Why does the speed of an object change (increase or decrease) with time? How can the direction of motion of a body be changed? And so on.
  </p>,
  <p key="b1-p-s21-2" style={{ textIndent: 28, textAlign: "justify" }}>
    We observe that when a ball on ground is given a small hit, the ball does not move for ever. It does come to rest after some time. This observation suggests that <em>the state of rest is the natural state of an object. And state of motion is not the natural state of the object.</em> This belief persisted till Galileo Galilei and Sir Isaac Newton developed their theories to understand all about motion.
  </p>,

  // 2.2 What is Force?
  <SecHd key="sec-s22" id="s22" label="2.2" title="What is Force?" />,
  <p key="b1-p-s22-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In our day-to-day life, we find that an effort is required to move a body at rest or to stop a moving body. Often, this effort is in the form of a muscular effort applied on the body to change its state of rest or motion. The concept of force is based on this. In fact, <em>no one has seen force or tasted force. However, we see or feel the effect of a force. Therefore, concept of force can be explained by describing what happens when some force is applied on an object. Some of the common effects of force are:</em>
  </p>,
  <p key="b1-p-s22-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. <em>A force may move a body at rest.</em></strong> For example, when we kick a football kept on the ground with our foot, the football moves. The force applied by our foot moves the ball. Again, when we push a wall, it does not move. The force applied by us has only tried to move the wall, but it has not succeeded.
  </p>,
  <p key="b1-p-s22-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2. <em>A force may stop a moving body.</em></strong> For example, when a player catches a moving cricket ball, the force applied by player's hands stops the moving ball. Again, when a bullet pierces through a target, the target exerts force on the bullet, but fails to stop it.
  </p>,
  <p key="b1-p-s22-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>3. <em>A force can change the speed of a body.</em></strong> For example, when a ball is dropped from a certain height, the speed of the ball goes on increasing due to gravitational pull of the Earth on the ball, in the downward direction. Thus force applied by the Earth in the direction of motion of the ball increases the speed of the ball. On the contrary, when a ball is thrown vertically upwards, gravitational pull of the Earth on the ball goes on decreasing the speed of the ball. Thus force applied by the Earth in a direction opposite to the direction of motion of the ball, decreases the speed of the ball.
  </p>,
  <p key="b1-p-s22-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>4. <em>A force may change the direction of a moving body.</em></strong> For example, when a moving cricket ball is hit by a bat, the cricket ball moves in a different direction. The force applied by the bat changes the direction of the moving cricket ball. Similarly, when a moving tennis ball is hit by a racket, it goes in a different direction. The force applied by the racket changes the direction of the moving tennis ball. Again, when we blow air from our mouth on the smoke from a burning incense stick (<em>agarbatti</em>), the direction of motion of smoke changes due to force exerted by the blowing air.
  </p>,
  <p key="b1-p-s22-6" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>5. <em>A force may change the size and shape of a body.</em></strong> For example, when we press a rubber ball or a balloon between our two hands, the shape of the rubber ball or balloon changes from spherical to oblong as shown in Fig. 2.1. The forces applied by our hands change the shape of the rubber ball/balloon.
  </p>,
  <div key="b1-fig21" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "16px 0", flexWrap: "wrap", alignItems: "center" }}>
    <img src={IMG.fig21a} alt="Rubber ball before squeezing" style={{ maxWidth: 90, height: "auto", border: "1px solid #ddd" }} onError={e => e.target.style.display = "none"} />
    <img src={IMG.fig21b} alt="Rubber ball after squeezing" style={{ maxWidth: 180, height: "auto", border: "1px solid #ddd" }} onError={e => e.target.style.display = "none"} />
    <p style={{ width: "100%", textAlign: "center", fontSize: 12.5, color: "#444", fontStyle: "italic", margin: "4px 0 0" }}>
      <strong style={{ color: P_COLOR, fontStyle: "normal" }}>Fig. 2.1. </strong>Shape of rubber ball/balloon changes on pressing.
    </p>
  </div>,
  <p key="b1-p-s22-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Again, Fig. 2.2(a) shows the original shape and size of a light spring. When we stretch the spring by applying outward forces on the two ends of the spring, the length of the spring increases and its shape also changes, as shown in Fig. 2.2(b). When the spring is compressed by applying inward forces on the two ends of the spring, the length of the spring decreases and its shape also changes, as shown in Fig. 2.2(c).
  </p>,
  <Fig key="fig-22" src={IMG.fig22} num="Fig. 2.2" caption="Original shape (a), spring under stretching forces (b), spring under compressing forces (c)." />,
  <p key="b1-p-s22-8" style={{ textIndent: 28, textAlign: "justify" }}>
    At home, we find that the size and shape of dough (kneaded flour) changes on pressing it with a rolling pin (<em>belan</em>) while making <em>chapatis.</em> The shape of a tooth paste tube and an ointment tube changes when we squeeze the tube by applying force on it.
  </p>,
  <p key="b1-p-s22-9" style={{ textIndent: 28, textAlign: "justify" }}>
    Similarly, the shape and size of kneaded wet clay (<em>gilli mitti</em>) change when a potter makes different pots out of it.
  </p>,
  <p key="b1-p-s22-10" style={{ textIndent: 28, textAlign: "justify" }}>From the foregoing examples, we conclude that:</p>,
  <DefBox key="def-s22-1">
    <strong style={{ color: P_COLOR, fontStyle: "normal" }}>Force</strong> is an external effort in the form of pushing, pulling, stretching, compressing etc., which may move a body at rest or stop a moving body or change the speed of a body or change the direction of a moving body or change the size and shape of a body.
  </DefBox>,

  // 2.3 Balanced and Unbalanced Forces
  <SecHd key="sec-s23" id="s23" label="2.3" title="Balanced and Unbalanced Forces" />,
  <p key="b1-p-s23-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The forces that we come across in day to day life can be divided broadly into two types: (<em>i</em>) Balanced Forces, (<em>ii</em>) Unbalanced Forces.
  </p>,
  <h4 key="b1-subhd-s23-bal" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>1. Balanced Forces</h4>,
  <DefBox key="def-s23-bal">
    If the resultant of all the forces acting on a body is zero, the forces are called <strong style={{ fontStyle: "normal" }}>balanced forces.</strong>
  </DefBox>,
  <p key="b1-p-s23-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The balanced forces cannot change the state of rest or state of uniform motion or the direction of motion of the body. It means that a body at rest will continue to be at rest under the action of balanced forces. Similarly, a body moving uniformly along a straight line will continue to move along the same straight line with the same speed even when balanced forces are applied on the body. This is as if no force is acting on the body.
  </p>,
  <h4 key="b1-subhd-s23-unbal" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>2. Unbalanced Forces</h4>,
  <DefBox key="def-s23-unbal">
    If the resultant of all the forces acting on a body is not zero, the forces are called <strong style={{ fontStyle: "normal" }}>unbalanced forces.</strong>
  </DefBox>,
  <p key="b1-p-s23-3" style={{ textIndent: 28, textAlign: "justify" }}>
    The unbalanced forces can change the state of rest or the state of uniform motion or the direction of motion of the body.
  </p>,
  <p key="b1-p-s23-4" style={{ textIndent: 28, textAlign: "justify" }}>
    It should be clearly understood that when we talk of a force acting on a body, we usually mean an unbalanced force capable of changing the state of the body.
  </p>,
  <p key="b1-p-s23-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Further, note that balanced forces cannot change the state of rest or state of uniform motion or the direction of motion of the body. However, <strong>balanced forces can change the shape and size of the body.</strong> For example, when we press a rubber ball between our two hands by applying equal and opposite forces on the ball, the shape of the ball changes from spherical to oblong.
  </p>,

  <p key="b1-p-s23-eg-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13.5, margin: "14px 0 8px" }}>
    Examples of balanced and unbalanced forces
  </p>,
  <p key="b1-p-s23-eg1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1. </strong>Let us consider a <strong>wooden block placed on a horizontal table.</strong> A string X is attached to the right face of the block as shown in Fig. 2.3.
  </p>,
  <p key="b1-p-s23-eg1a" style={{ textIndent: 28, textAlign: "justify" }}>
    When we apply a small force P to the string X, the block does not move. This is because two pairs of balanced forces are acting on the block:
  </p>,
  <Fig key="fig-23" src={IMG.fig23} num="Fig. 2.3" caption="Forces on a wooden block on a horizontal table (R = normal reaction, mg = weight, P = applied force, F = friction)." />,
  <p key="b1-p-s23-eg1b" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) weight <em>mg</em> of the block acting vertically downwards on the table.<br />
    (<em>ii</em>) force of reaction <em>R</em> of the horizontal table acting on the block vertically upwards.
  </p>,
  <p key="b1-p-s23-eg1c" style={{ textIndent: 28, textAlign: "justify" }}>
    As R = mg, therefore, this is one pair of balanced forces, which fails to move the block in the vertical direction. The other pair of forces is: (<em>i</em>) applied force P tending to move the block to the right, (<em>ii</em>) force of friction F between the rough table top and rough bottom surface of the block, acting to the left and opposing the motion.
  </p>,
  <p key="b1-p-s23-eg1d" style={{ textIndent: 28, textAlign: "justify" }}>
    As F = P, therefore, this is the second pair of balanced forces which fails to move the block in the horizontal direction.
  </p>,
  <p key="b1-p-s23-eg1e" style={{ textIndent: 28, textAlign: "justify" }}>
    If we go on increasing the applied force to the string X, a stage reaches when the block begins to move on the table. At this stage, the applied force P becomes greater than the maximum value of opposing force of friction F. Thus the second pair of forces becomes unbalanced. That is why motion is produced in the block.
  </p>,
  <p key="b1-p-s23-eg2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2. </strong>When we <strong>hold a suitcase steady</strong> at some height, the suitcase is under the action of two forces: (<em>i</em>) weight <em>mg</em> of the suitcase due to gravitational pull of Earth, acting vertically downwards, (<em>ii</em>) force applied P by our hand in the vertically upward direction. As mg = P, therefore, the forces are balanced, and the suitcase is steady.
  </p>,
  <p key="b1-p-s23-eg2b" style={{ textIndent: 28, textAlign: "justify" }}>
    If we were to drop the suitcase, applied force P becomes zero. The suitcase would move vertically downwards under the action of unbalanced force <em>mg.</em>
  </p>,
  <p key="b1-p-s23-eg3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>3. </strong>In a <strong>tug of war,</strong> <em>i.e.,</em> rope-pulling by two teams, the rope does not move in any direction, because the forces applied by the two teams are equal and opposite, <em>i.e.,</em> the forces applied are balanced forces. However, when one team releases the rope, an unbalanced force acts on the other team due to which the other team falls backwards.
  </p>,
  <p key="b1-p-s23-eg4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>4. </strong>When we <strong>stop pedalling a bicycle</strong> we are riding, the bicycle begins to slow down. This is because of unbalanced force of friction between the tyres and the road, which opposes the motion. To keep the bicycle moving, we have to start pedalling again. It appears as if an object maintains its motion under the continuous application of an unbalanced force. However, this conclusion is wrong. In fact, an unbalanced force is needed only for starting motion in a body at rest or for changing the speed or for changing the direction of motion. These changes in speed or direction will continue so long as the unbalanced force is acting. The moment the unbalanced force is removed, the object would continue to move with the velocity it has acquired till then. There will be no further change in velocity in the absence of an unbalanced force. It should be clearly understood that <em>an unbalanced force is needed to move a body from state of rest. But no such force is required to maintain uniform motion of the body.</em> An unbalanced force is also required for changing speed of the body or for changing direction of motion of the body.
  </p>,
  <p key="b1-p-s23-eg5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>5. </strong>A <strong>ball set rolling on the ground</strong> <em>stops after sometime.</em> This is due to unbalanced force of friction between the ball and the ground.
  </p>,

  // 2.4 Galileo's Observations
  <SecHd key="sec-s24" id="s24" label="2.4" title="Galileo's Observations" />,
  <p key="b1-p-s24-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Galileo arrived at some important conclusion about motion of objects by observing their motion on an inclined plane.
  </p>,
  <p key="b1-p-s24-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Galileo observed that when a small marble ball rolls down an ideal, frictionless plane inclined on both sides, [Fig. 2.4],
  </p>,
  <p key="b1-p-s24-3" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) velocity of the ball goes on increasing due to unbalanced force of helping gravity. On reaching the bottom of the incline after covering a distance <em>s</em> in falling through a height <em>h</em>, the ball has acquired a definite velocity.
  </p>,
  <p key="b1-p-s24-4" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) the ball then climbs up the inclined plane on the right. The velocity of the ball goes on decreasing due to unbalanced force of opposing gravity.
  </p>,
  <p key="b1-p-s24-5" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iii</em>) when the inclination θ<sub style={{ fontSize: "0.72em" }}>1</sub> of right side plane is same as the inclination θ of left side plane, distance covered by the ball before stopping is the same, <em>i.e.,</em> s<sub style={{ fontSize: "0.72em" }}>1</sub> = s if θ<sub style={{ fontSize: "0.72em" }}>1</sub> = θ.
  </p>,
  <p key="b1-p-s24-6" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iv</em>) when angle of inclination of right side plane is reduced to θ<sub style={{ fontSize: "0.72em" }}>2</sub>, distance covered by the ball before stopping increases, <em>i.e.</em> s<sub style={{ fontSize: "0.72em" }}>2</sub> &gt; s<sub style={{ fontSize: "0.72em" }}>1</sub>, when θ<sub style={{ fontSize: "0.72em" }}>2</sub> &lt; θ<sub style={{ fontSize: "0.72em" }}>1</sub> (= θ).
  </p>,
  <p key="b1-p-s24-7" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>v</em>) when angle of inclination of right side plane is reduced further to θ<sub style={{ fontSize: "0.72em" }}>3</sub>, the distance covered by the ball before stopping increases further, <em>i.e.,</em> s<sub style={{ fontSize: "0.72em" }}>3</sub> &gt; s<sub style={{ fontSize: "0.72em" }}>2</sub> &gt; s<sub style={{ fontSize: "0.72em" }}>1</sub> when θ<sub style={{ fontSize: "0.72em" }}>3</sub> &lt; θ<sub style={{ fontSize: "0.72em" }}>2</sub> &lt; θ<sub style={{ fontSize: "0.72em" }}>1</sub> (= θ).
  </p>,
  <p key="b1-p-s24-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Note that in all the three cases, height attained by the ball before stopping is exactly the same (= <em>h</em>) through which the ball had descended over the left side plane.
  </p>,
  <p key="b1-p-s24-9" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>vi</em>) If right side plane were made horizontal, the marble ball would continue to travel for ever, trying to reach the same height from which it was released. This is as if the unbalanced force on the marble ball is zero.
  </p>,
  <Fig key="fig-24" src={IMG.fig24} num="Fig. 2.4" caption="Galileo's inclined plane experiment showing ball rolling on planes of different inclinations." />,
  <DefBox key="def-s24-galileo">
    From these observations, Galileo concluded that <strong style={{ fontStyle: "normal" }}>an unbalanced external force is required to initiate the motion (from state of rest), but no unbalanced net force is needed to sustain the uniform motion, <em>i.e.,</em> objects move with a constant speed along a straight line when no force acts on them.</strong>
  </DefBox>,
  <p key="b1-p-s24-10" style={{ textIndent: 28, textAlign: "justify" }}>
    In actual practice, it is difficult to achieve the state of zero unbalanced force, because of the presence of frictional forces which oppose the motion. Therefore, <em>in the presence of frictional forces, some external force is required to move objects with constant speed along a straight line.</em>
  </p>,

  // 2.5 Newton's Laws of Motion
  <SecHd key="sec-s25" id="s25" label="2.5" title="Newton's Laws of Motion" />,
  <p key="b1-p-s25-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Newton investigated further the ideas put forth by Galileo regarding motion of objects. He formulated three fundamental laws that govern the motion of objects. These three laws are known as <strong>Newton's Laws of Motion.</strong> We shall discuss these laws of motion one by one, and learn some of their important applications.
  </p>,

  // 2.6 Newton's First Law of Motion
  <SecHd key="sec-s26" id="s26" label="2.6" title="Newton's First Law of Motion" />,
  <DefBox key="def-s26-nfl">
    <em>According to</em> <strong style={{ fontStyle: "normal", color: P_COLOR }}>Newton's first law of motion,</strong> <em>a body continues to be in a state of rest or in a state of uniform motion along a straight line, unless some external unbalanced force is applied on the body to change that state.</em>
  </DefBox>,
  <p key="b1-p-s26-1" style={{ textIndent: 28, textAlign: "justify" }}>The law consists of <strong>three parts:</strong></p>,
  <p key="b1-p-s26-2" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) <strong><em>A body at rest continues to remain at rest until some external unbalanced force is applied on the body to move it.</em></strong> This is what we find in daily life. A book lying on a table continues to lie there only till someone removes it. A table, chair, sofa set, bed etc. continue to lie where they are unless we apply a force to move them.
  </p>,
  <p key="b1-p-s26-3" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) <strong><em>A body in uniform motion continues to move uniformly unless an external force is applied to change its speed.</em></strong> This part of the law is difficult to realise as we find that a ball rolling on the ground does stop after some time. Similarly, when the engine of a moving car is switched off, it stops after travelling some distance. In fact, motion of everybody is being opposed by the invisible forces like <strong>air resistance</strong> and <strong>friction</strong> between the body and the ground. If these opposing forces were removed, a body in uniform motion will continue to move uniformly, and never stop on its own.
  </p>,
  <p key="b1-p-s26-4" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iii</em>) <strong><em>A body moving along a straight line will continue to move along the same straight line unless an external force is applied on the body to change its direction of motion.</em></strong> For example, to turn a car moving over a straight road, we have to apply force on the steering wheel of the car. Similarly, a bike cannot change its straight line path on its own. We have to turn its handle.
  </p>,

  // 2.7 Newton's First Law Defines Force
  <SecHd key="sec-s27" id="s27" label="2.7" title="Newton's First Law Defines Force" />,
  <p key="b1-p-s27-1" style={{ textIndent: 28, textAlign: "justify" }}>
    According to Newton's first law of motion, a body continues to be in a state of rest or in a state of uniform motion along a straight line, unless an external force is applied on the body to change the state.
  </p>,
  <p key="b1-p-s27-2" style={{ textIndent: 28, textAlign: "justify" }}>
    This means that force applied on a body alone can change its state of rest or state of uniform motion along a straight line. Hence, we may define force as an external effort in the form of a push or pull which (<em>i</em>) actually moves or tries to move a body at rest, (<em>ii</em>) actually stops or tries to stop a moving body, (<em>iii</em>) actually changes or tries to change the direction of motion of the body.
  </p>,
  <p key="b1-p-s27-3" style={{ textIndent: 28, textAlign: "justify" }}>
    This is how Newton's first law defines force.
  </p>,

  // 2.8 Inertia and Mass
  <SecHd key="sec-s28" id="s28" label="2.8" title="Inertia and Mass" />,
  <p key="b1-p-s28-1" style={{ textIndent: 28, textAlign: "justify" }}>
    According to Newton's first law of motion, a body continues to be in a state of rest or in a state of uniform motion along a straight line, unless an external force is applied on the body to change its state.
  </p>,
  <p key="b1-p-s28-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The law means that <em>a body, on its own, cannot change its state of rest or state of uniform motion along a straight line. In other words, all objects resist a change in their state or the objects oppose the forces that try to change their state. This property is called <strong style={{ fontStyle: "normal" }}>Inertia.</strong></em> Hence,
  </p>,
  <DefBox key="def-s28-inertia">
    <strong style={{ fontStyle: "normal", color: P_COLOR }}>Inertia of a body</strong> <em>is the inability of the body to change by itself its state of rest or state of uniform motion along a straight line. Thus, Newton's first law of motion defines inertia and is rightly called the <strong style={{ fontStyle: "normal" }}>Law of Inertia.</strong></em>
  </DefBox>,
  <p key="b1-p-s28-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Quantitatively, inertia of a body is measured by the magnitude of force required to change the state of the body. Larger the force required to change the state of the body, greater is its inertia. It is well known that when a body is heavy, force required to change its state is large and, therefore, the inertia of the body is also large. The reverse is also true. <strong><em>Hence, we conclude that mass of a body is a measure of inertia of the body.</em></strong> Larger the mass, greater is inertia. For example:
  </p>,
  <p key="b1-p-s28-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1.</strong> It is easier to push an empty box than to push a box full of books. The box full of books has larger mass and hence greater inertia as compared to the empty box.
  </p>,
  <p key="b1-p-s28-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2.</strong> When we kick a football, it flies away. Instead, when a stone of same size is kicked with an equal force, the stone hardly moves. The stone being heavier than football has larger inertia.
  </p>,

  // 2.9 Three Types of Inertia
  <SecHd key="sec-s29" id="s29" label="2.9" title="Three Types of Inertia" />,
  <p key="b1-p-s29-0" style={{ textIndent: 28, textAlign: "justify" }}>
    Inertia of a body is of three types: (<em>i</em>) Inertia of rest &nbsp; (<em>ii</em>) Inertia of motion &nbsp; (<em>iii</em>) Inertia of direction
  </p>,

  <h4 key="b1-subhd-s29-rest" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>(<em>i</em>) Inertia of rest</h4>,
  <DefBox key="def-s29-rest">
    <em>It is the inability of a body to change by itself, its state of rest. This means a body at rest remains at rest and cannot start moving on its own. Rather, a body at rest opposes the forces which try to move it.</em>
  </DefBox>,
  <p key="b1-p-s29-rest-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13, margin: "10px 0 5px" }}>
    Examples of inertia of rest
  </p>,
  <p key="b1-p-s29-rest-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1.</strong> When a bus or train starts suddenly, the person sitting inside tends to fall backwards. This is because lower part of his body starts moving with the bus or train, but the upper part of the body tries to remain at rest, due to inertia of rest.
  </p>,
  <p key="b1-p-s29-rest-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2.</strong> When we shake vigorously a branch of a mango tree, the mangoes fall down. This is because on shaking, the branch comes in motion and the mangoes tend to remain at rest, due to inertia of rest. Therefore, the mangoes get detached and fall.
  </p>,

  <h4 key="b1-subhd-s29-mot" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>(<em>ii</em>) Inertia of motion</h4>,
  <DefBox key="def-s29-motion">
    <em>It is the inability of a body to change by itself, its state of motion. This means a body in motion remains in motion and cannot stop on its own. Rather, a body in motion opposes the forces which try to stop it.</em>
  </DefBox>,
  <p key="b1-p-s29-mot-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13, margin: "10px 0 5px" }}>
    Examples of inertia of motion
  </p>,
  <p key="b1-p-s29-mot-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1.</strong> When a bus or train stops suddenly, a person sitting inside tends to fall forward. This is because lower part of his body comes to rest with the bus or train, but the upper part of his body tends to continue its motion, due to inertia of motion.
  </p>,
  <p key="b1-p-s29-mot-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2.</strong> A person jumping out of a speeding train may fall forward. This is because on jumping, his feet come to rest as they touch the ground. But his remaining body continues to move forward due to inertia of motion.
  </p>,

  <h4 key="b1-subhd-s29-dir" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>(<em>iii</em>) Inertia of direction</h4>,
  <DefBox key="def-s29-direction">
    <em>It is the inability of a body to change by itself its direction of motion, i.e., a body moving along a straight line will continue to move along the same direction unless some external force compels it to change the direction of motion. Rather, a body opposes the forces that try to change its direction of motion.</em>
  </DefBox>,
  <p key="b1-p-s29-dir-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: P_COLOR, fontSize: 13, margin: "10px 0 5px" }}>
    Examples of inertia of direction
  </p>,
  <p key="b1-p-s29-dir-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1.</strong> When a car rounds a curve suddenly, a person sitting inside is thrown outwards. This is because while the car turns, the person tries to maintain his original direction of motion due to inertia of direction.
  </p>,
  <p key="b1-p-s29-dir-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2.</strong> When a vehicle passes through mud, the rotating wheels of the vehicle throw out mud tangentially due to directional inertia. The mud guards over the wheels stop this mud protecting the clothes of the driver of the bike/motor bike.
  </p>,
];

// ── BATCH 2: SECTIONS 2.10–2.14 + SOLVED PROBLEMS ──────────

const content_b2 = [
  // 2.10 Linear Momentum
  <SecHd key="sec-s210" id="s210" label="2.10" title="Linear Momentum" />,
  <p key="b2-p-s210-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To understand this term, let us review some common observations:
  </p>,
  <p key="b2-p-s210-2" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>i</em>) In the game of table tennis, if the ball hits a player, he is not hurt. But when a cricket ball moving at the same speed as the table tennis ball hits a spectator, he is hurt. This is because cricket ball is much heavier than the table tennis ball.
  </p>,
  <p key="b2-p-s210-3" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>ii</em>) A truck moving at speeds as low as 5 metre per second may kill a person coming its way. This is again because of heavy mass of the truck.
  </p>,
  <p key="b2-p-s210-4" style={{ textIndent: 28, textAlign: "justify" }}>
    (<em>iii</em>) A bullet of small mass fired from a gun may kill a person. This is because of large velocity of the bullet.
  </p>,
  <p key="b2-p-s210-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong><em>We observe that impact of motion produced by objects depends on their mass and velocity.</em></strong> Therefore, there must be some quantity of importance that combines mass of a body and velocity of the body. Newton identified this quantity and named it as linear momentum of the body. We define:
  </p>,
  <DefBox key="def-s210-momentum">
    <strong style={{ fontStyle: "normal", color: "#c0126a" }}>Linear momentum</strong> of a body as the product of mass of the body and velocity of the body.
  </DefBox>,
  <p key="b2-p-s210-6" style={{ textIndent: 28, textAlign: "justify" }}>
    If <em>m</em> = mass of a body, <em>v</em> = velocity of the body, and <em>p</em> = linear momentum of the body, then
  </p>,
  <MathBlock key="b2-math-1">
    linear momentum = mass × velocity
  </MathBlock>,
  <MathBlock key="b2-math-2">
    <strong>p = m<em>v</em></strong> &nbsp;&nbsp;&nbsp; ...(1)
  </MathBlock>,
  <p key="b2-p-s210-7" style={{ textIndent: 28, textAlign: "justify" }}>
    If a body is at rest, its velocity, <em>v</em> = 0, <em>p</em> = 0, <em>i.e.,</em> linear momentum of a body at rest is zero or a body at rest possesses no linear momentum.
  </p>,
  <p key="b2-p-s210-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Linear momentum is a <strong>vector quantity,</strong> possessing both, the magnitude as well as direction. The direction of linear momentum is the same as the direction of velocity.
  </p>,
  <p key="b2-p-s210-9" style={{ textIndent: 28, textAlign: "justify" }}>
    As SI unit of mass is kilogram and SI unit of velocity is metre/second; therefore, SI unit of linear momentum is kilogram metre per second, which is written as kg m/s or kg ms<Sup c="−1" />.
  </p>,
  <p key="b2-p-s210-10" style={{ textIndent: 28, textAlign: "justify" }}>
    From eqn. (1), we find that when mass of a body is made twice, keeping its velocity unchanged, the linear momentum of the body becomes twice. Similarly, when velocity of a body of given mass is made twice, its linear momentum becomes twice again. If both, mass and velocity were made twice, the linear momentum would become four times.
  </p>,
  <p key="b2-p-s210-11" style={{ textIndent: 28, textAlign: "justify" }}>
    From Newton's first law of motion, we have learnt that a force is required to change the velocity of a body. When velocity of the body changes, its linear momentum also changes. Therefore, an external force is required to change the linear momentum of the body.
  </p>,

  // 2.11 Newton's Second Law of Motion
  <SecHd key="sec-s211" id="s211" label="2.11" title="Newton's Second Law of Motion" />,
  <p key="b2-p-s211-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To understand Newton's second law of motion, let us imagine a situation in which a car with a dead battery is to be started. We know that a speed of 1 m/s given to the car may be sufficient to start its engine. Now, if one or two persons give a sudden push to the car, it hardly starts. But when the car is pushed continuously for some time over a straight road, it might start. This is because speed of the car increases gradually from zero to 1 m/s, over this time.
  </p>,
  <p key="b2-p-s211-2" style={{ textIndent: 28, textAlign: "justify" }}>
    From this situation, we learn that change in linear momentum of the car is brought about by suitable magnitude of force, and the suitable time during which the force is exerted. Newton concluded from his studies that force necessary to change linear momentum of a body would depend upon the time rate of change of linear momentum of the body. This led to second law of motion.
  </p>,
  <DefBox key="def-s211-2ndlaw">
    <em>According to</em> <strong style={{ fontStyle: "normal", color: "#c0126a" }}>Newton's second law of motion,</strong> <em>the rate of change of linear momentum of a body is directly proportional to the external force applied on the body, and this change takes place always in the direction of the applied force.</em>
  </DefBox>,
  <p key="b2-p-s211-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Now, the rate of change of linear momentum of a body can be obtained by dividing 'change in linear momentum' of the body by the 'time taken' for this change. Thus, according to Newton's second law of motion,
  </p>,
  <MathBlock key="b2-math-s211-1">
    <Frac n="change in linear momentum" d="time taken" /> &nbsp;∝ force applied
  </MathBlock>,
  <p key="b2-p-s211-4" style={{ textIndent: 28, textAlign: "justify" }}>
    It means that when a bigger force is applied on a body, its linear momentum changes at a faster rate (taking less time) and vice-versa. Further, the momentum will change always in the direction of the applied force.
  </p>,

  // 2.12 Mathematical Formulation of Newton's Second Law
  <SecHd key="sec-s212" id="s212" label="2.12" title="Mathematical Formulation of Newton's Second Law of Motion" />,
  <p key="b2-p-s212-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Suppose <em>m</em> = mass of a body, <em>u</em> = initial velocity of the body along a straight line, <em>F</em> = an external force applied on the body, which is constant in magnitude, <em>t</em> = time for which the force is applied, <em>v</em> = final velocity of the body along the same straight line, after <em>t</em> second.
  </p>,
  <MathBlock key="b2-math-s212-1">
    Initial linear momentum of the body, &nbsp;<em>p</em><sub style={{ fontSize: "0.72em" }}>1</sub> = <em>mu</em>
  </MathBlock>,
  <MathBlock key="b2-math-s212-2">
    Final linear momentum of the body, &nbsp;<em>p</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <em>mv</em>
  </MathBlock>,
  <MathBlock key="b2-math-s212-3">
    Change in linear momentum of the body = <em>p</em><sub style={{ fontSize: "0.72em" }}>2</sub> − <em>p</em><sub style={{ fontSize: "0.72em" }}>1</sub> = <em>mv</em> − <em>mu</em> = <em>m</em>(<em>v</em> − <em>u</em>)
  </MathBlock>,
  <MathBlock key="b2-math-s212-4">
    Rate of change of linear momentum = <Frac n="change in linear momentum" d="time taken" /> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> &nbsp;&nbsp; ...(1)
  </MathBlock>,
  <p key="b2-p-s212-2" style={{ textIndent: 28, textAlign: "justify" }}>
    But &nbsp;<Frac n={<>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> = <Frac n="change in velocity" d="time taken" /> = rate of change of velocity = acceleration of the body = <em>a</em>
  </p>,
  <p key="b2-p-s212-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, from eqn. (1), rate of change of linear momentum = <em>ma</em>
  </p>,
  <p key="b2-p-s212-4" style={{ textIndent: 28, textAlign: "justify" }}>
    According to Newton's second law of motion, rate of change of linear momentum ∝ force applied
  </p>,
  <MathBlock key="b2-math-s212-5">
    <em>i.e.,</em> &nbsp;<em>ma</em> ∝ <em>F</em> &nbsp;&nbsp; or &nbsp;&nbsp; <em>F</em> ∝ <em>ma</em> &nbsp;&nbsp; or &nbsp;&nbsp; <strong><em>F</em> = <em>kma</em></strong> &nbsp;&nbsp; ...(2)
  </MathBlock>,
  <p key="b2-p-s212-5" style={{ textIndent: 28, textAlign: "justify" }}>
    where <em>k</em> is a constant of proportionality. The value of <em>k</em> depends on the units adopted for measuring the force.
  </p>,
  <p key="b2-p-s212-6" style={{ textIndent: 28, textAlign: "justify" }}>
    If we define <em>F</em> = 1, when <em>m</em> = 1 and <em>a</em> = 1, <em>i.e.,</em> <strong><em>unit force is that much force which produces unit acceleration in a body of unit mass,</em></strong> then from eqn. (2): &nbsp; 1 = <em>k</em> × 1 × 1 &nbsp; or &nbsp; <em>k</em> = 1
  </p>,
  <p key="b2-p-s212-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Putting this value of <em>k</em> in eqn. (2), we get
  </p>,
  <MathBlock key="b2-math-s212-6">
    <strong><em>F</em> = <em>ma</em></strong> &nbsp;&nbsp; ...(3)
  </MathBlock>,
  <DefBox key="def-s212-fma">
    <strong style={{ fontStyle: "normal" }}>Force acting on a body is the product of mass of the body and acceleration of the body.</strong>
  </DefBox>,
  <p key="b2-p-s212-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Note that force is a vector quantity, whose direction is same as that of acceleration of the body.
  </p>,
  <p key="b2-p-s212-9" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Unit of force.</strong> In SI, there are two different units of force.
  </p>,
  <p key="b2-p-s212-10" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "10px 0 5px" }}>
    Absolute unit of force.
  </p>,
  <p key="b2-p-s212-11" style={{ textIndent: 28, textAlign: "justify" }}>
    In SI, the absolute unit of force is newton and it is represented by <em>N.</em>
  </p>,
  <DefBox key="def-s212-newton">
    <strong style={{ fontStyle: "normal", color: "#c0126a" }}>One newton</strong> force is that much force which produces an acceleration of 1 m/s<Sup c="2" /> in a body of mass 1 kg.
  </DefBox>,
  <MathBlock key="b2-math-s212-7">
    ∴ when <em>m</em> = 1 kg and <em>a</em> = 1 m/s<Sup c="2" />, then from <em>F</em> = <em>ma</em>:<br />
    <strong>1 N = 1 kg × 1 m/s<Sup c="2" /> = 1 kg m/s<Sup c="2" /></strong> &nbsp;&nbsp; ...(4)
  </MathBlock>,
  <p key="b2-p-s212-12" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "10px 0 5px" }}>
    Gravitational unit of force.
  </p>,
  <p key="b2-p-s212-13" style={{ textIndent: 28, textAlign: "justify" }}>
    In SI, the gravitational unit of force is kilogram weight or kilogram force. It is represented by kg wt or kgf, respectively.
  </p>,
  <DefBox key="def-s212-kgwt">
    <strong style={{ fontStyle: "normal", color: "#c0126a" }}>1 kg wt or 1 kgf</strong> is that much force which produces an acceleration of 9·8 m/s<Sup c="2" /> in a body of mass 1 kg.
  </DefBox>,
  <MathBlock key="b2-math-s212-8">
    ∴ when <em>m</em> = 1 kg and <em>a</em> = <em>g</em> = 9·8 m/s<Sup c="2" />, then from <em>F</em> = <em>ma</em>:<br />
    <strong>1 kg wt = 1 kgf = 1 kg × 9·8 m/s<Sup c="2" /> = 9·8 kg m/s<Sup c="2" /> = 9·8 N</strong> &nbsp;&nbsp; ...(5)
  </MathBlock>,
  <div key="b2-note-s212" style={{ border: "1.5px solid #555", background: "#f9f9f9", padding: "10px 16px", margin: "14px 0" }}>
    <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 13, margin: "0 0 6px" }}>NOTE &nbsp; From Newton's second law of motion, we learn that</p>
    <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
      <strong>1. <em>No force is required to move a body uniformly along a straight line.</em></strong><br />
      When a body is moving uniformly along a straight line and there is no force of friction, acceleration/retardation of the body, <em>a</em> = 0. According to Newton's second law of motion, <em>F = ma = m × 0 = 0</em>
    </p>
    <p style={{ margin: "0 0 6px", textAlign: "justify" }}>
      <strong>2. <em>Accelerated motion is always due to some external force acting on the body.</em></strong>
    </p>
    <p style={{ margin: 0, textAlign: "justify" }}>
      <strong>3. <em>The magnitude of force acting on a body is the product of mass of the body and acceleration of the body.</em></strong> Thus, Newton's second law of motion gives us a measure of force, <em>i.e.,</em> quantitative definition of force. Recollect that Newton's first law of motion gave us the qualitative definition of force.
    </p>
  </div>,

  // 2.13 Applications of Newton's Second Law
  <SecHd key="sec-s213" id="s213" label="2.13" title="Some Applications of Newton's Second Law of Motion" />,
  <p key="b2-p-s213-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Some of our day-to-day observations can be explained in terms of Newton's second law of motion. As <em>F = ma =</em> <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} />, therefore, force <em>F</em> can be reduced by increasing time taken <em>t</em> for the change in linear momentum of the body. For example:
  </p>,
  <p key="b2-p-s213-cball-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    1. Catching a cricket ball
  </p>,
  <p key="b2-p-s213-cball-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To catch a fast cricket ball, a player pulls his hands backwards to prevent injury to his hands. By doing so, the player increases the time during which high velocity of the cricket ball reduces to zero. Thus, the acceleration of the ball <em>a</em> = (<em>v</em> − <em>u</em>)/<em>t</em> is decreased, and therefore, the impact of catching the fast ball (<em>i.e., F = ma</em>) is reduced, <em>i.e.,</em> the player has to apply a smaller force against the ball in order to stop it. The ball, in turn, exerts a smaller force on his hands and the hands are not injured.
  </p>,
  <p key="b2-p-s213-cball-2" style={{ textIndent: 28, textAlign: "justify" }}>
    If the ball were stopped suddenly, the high velocity of the ball would be reduced to zero in a very short interval of time, <em>t</em>. Therefore, rate of change of linear momentum of the ball would be large, and therefore, a large force would have to be applied for holding the catch. The hands of the player would be hurt.
  </p>,
  <p key="b2-p-s213-hj-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    2. High jump
  </p>,
  <p key="b2-p-s213-hj-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In the athletic event 'High Jump', the athletes are made to fall either on a cushioned bed or on a sand bed. This is done to avoid injury to the athlete. Falling on a cushioned bed or on a sand bed will increase the time during which high velocity of the athlete would be reduced to zero. This would decrease the rate of change of momentum of the athlete and hence the force on the athlete. The injury to the athlete is thus avoided.
  </p>,
  <p key="b2-p-s213-sb-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    3. Use of seat belts in cars
  </p>,
  <p key="b2-p-s213-sb-1" style={{ textIndent: 28, textAlign: "justify" }}>
    All the cars, these days are provided with seat belts for the passengers, which are rightly called <em>safety belts.</em> The purpose of seat belts is to prevent injuries to the passengers in case of an accident or in case of sudden application of brakes. In both the cases, the large momentum of the car reduces to zero in a very short interval of time resulting in the development of a large force causing injuries. The stretchable safety belts worn by the passengers of the car exert a force on their body and make the forward motion slower. The time taken by the passengers to fall forward increases. Therefore, rate of change of momentum of passengers is reduced. Hence, the stopping force acting on the passengers is reduced. They may not get injuries at all or they may get away with minor injuries.
  </p>,

  // 2.14 Newton's First Law as Special Case of Second Law
  <SecHd key="sec-s214" id="s214" label="2.14" title="Newton's First Law of Motion is a Special Case of Newton's Second Law" />,
  <p key="b2-p-s214-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Newton's first law of motion can be deduced from Newton's second law of motion.
  </p>,
  <p key="b2-p-s214-2" style={{ textIndent: 28, textAlign: "justify" }}>
    According to Newton's second law of motion,
  </p>,
  <MathBlock key="b2-math-s214-1">
    <em>F</em> = <em>ma</em> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} />
  </MathBlock>,
  <MathBlock key="b2-math-s214-2">
    or &nbsp;&nbsp; <em>F</em> × <em>t</em> = <em>mv</em> − <em>mu</em> &nbsp;&nbsp; ...(1)
  </MathBlock>,
  <p key="b2-p-s214-3" style={{ textIndent: 28, textAlign: "justify" }}>
    When no external force is applied, <em>F</em> = 0
  </p>,
  <MathBlock key="b2-math-s214-3">
    From eqn. (1): &nbsp; <em>mv</em> − <em>mu</em> = 0 &nbsp;&nbsp; or &nbsp;&nbsp; <em>mv</em> = <em>mu</em> &nbsp;&nbsp; or &nbsp;&nbsp; <em>v</em> = <em>u</em>
  </MathBlock>,
  <p key="b2-p-s214-4" style={{ textIndent: 28, textAlign: "justify" }}>
    It means <strong><em>the body will continue to move with the same uniform velocity, u throughout the time t, when no external force is applied on the body.</em></strong> Further, if <em>u</em> = 0, then <em>v</em> will also be zero. It means <strong><em>if the body is initially at rest, it will continue to be at rest, when no external force is applied on the body.</em></strong>
  </p>,
  <p key="b2-p-s214-5" style={{ textIndent: 28, textAlign: "justify" }}>
    This is Newton's first law of motion.
  </p>,

  // Solved Problems — Newton's Second Law
  <div key="b2-solved-hd" style={{ textAlign: "center", margin: "24px 0 8px" }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 18,
      color: "#c0126a", letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>
      Solved Problems
    </h2>
    <div style={{ borderTop: "2px solid #c0126a", marginTop: 6 }} />
  </div>,

  <NumericalSection key="num-s2nd" topic="NEWTON'S SECOND LAW OF MOTION">
    <div style={{ border: "1.5px solid #ccc", padding: "10px 14px", margin: "0 0 16px", background: "#f9f9f9" }}>
      <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 12.5, margin: "0 0 6px", letterSpacing: 1 }}>FORMULAE AND UNITS</p>
      <p style={{ margin: "0 0 4px" }}><strong>1.</strong> The linear momentum of a body (<em>p</em>) is the product of mass of the body (<em>m</em>) and velocity of the body (<em>v</em>), <em>i.e.,</em> <strong>p = mv</strong></p>
      <p style={{ margin: "0 0 4px" }}>When <em>m</em> is in kg; <em>v</em> is in ms<Sup c="−1" />, p is in kg m/s. The linear momentum is a vector whose direction is same as that of velocity.</p>
      <p style={{ margin: "0 0 4px" }}><strong>2.</strong> Rate of change of linear momentum = <Frac n="change in linear momentum" d="time taken" /></p>
      <p style={{ margin: 0 }}><strong>3.</strong> <em>F = ma,</em> where <em>F</em> is the force acting on a body of mass <em>m,</em> moving with an acceleration <em>a.</em> When <em>m</em> is in kg; <em>a</em> is in m/s<Sup c="2" />, force <em>F</em> is in newton (N). &nbsp; 1 N = 1 kg × 1 m/s<Sup c="2" /> = 1 kg m/s<Sup c="2" /></p>
    </div>

    <p key="b2-p-s2nd-prob1" style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Problem 1.</strong> A motorcycle is moving with a velocity of 90 km/h and it takes 5 second to stop after the brakes are applied. Calculate the force exerted by the brakes on the motorcycle if its mass along with the rider is 200 kg.
    </p>
    <p key="b2-p-s2nd-sol1a" style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Solution.</strong> Here, initial velocity, <em>u</em> = 90 km/h = <Frac n="90 × 1000 m" d="60 × 60 s" /> = 25 m/s; time taken, <em>t</em> = 5 s; final velocity, <em>v</em> = 0; force, <em>F</em> = ?; total mass, <em>m</em> = 200 kg
    </p>
    <MathBlock key="b2-math-sol1">
      As &nbsp; <em>F</em> = <em>ma</em> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> = <Frac n="200(0 − 25)" d="5" /> = <strong>−1000 N</strong>
    </MathBlock>
    <p key="b2-p-sol1-note" style={{ textIndent: 28, textAlign: "justify" }}>
      Negative sign is for opposing force.
    </p>

    <p key="b2-p-s2nd-prob2" style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Problem 2.</strong> Calculate the force required to impart a car, a velocity of 30 m/s in 10 seconds. The mass of the car is 1500 kg.
    </p>
    <p key="b2-p-s2nd-sol2a" style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Solution.</strong> Here, force required, <em>F</em> = ?; final velocity, <em>v</em> = 30 m/s; time taken, <em>t</em> = 10 s; initial velocity, <em>u</em> = 0; mass of car, <em>m</em> = 1500 kg
    </p>
    <MathBlock key="b2-math-sol2">
      As &nbsp; <em>F</em> = <em>ma</em> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> = <Frac n="1500(30 − 0)" d="10" /> = <strong>4500 N</strong>
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s2nd">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A certain force exerted for 1·2 s raises the speed of an object from 1·8 m/s to 4·2 m/s. Later, the same force is applied for 2 second. How much does the speed change in 2 s? <strong>[Ans. 4 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>A constant force acts on an object of mass 5 kg for a duration of 2 s. It increases the object's velocity from 3 m/s to 7 m/s. Find the magnitude of the applied force. Now if the force were applied for a duration of 5 s, what would be the final velocity of the object? <strong>[Ans. 10 N; 13 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>Which would require a greater force: accelerating a 2 kg mass at 5 m/s<Sup c="2" /> or a 4 kg mass at 2 m/s<Sup c="2" />? <strong>[Ans. 2 kg mass at 5 m/s<Sup c="2" />]</strong></li>
      <li style={{ marginBottom: 6 }}>A motorcar is moving with a velocity of 108 km/h and it takes 4 second to stop after the brakes are applied. Calculate the force exerted by the brakes on the motorcar if its mass along with the passengers is 1000 kg. <strong>[Ans. −7500 N]</strong></li>
      <li style={{ marginBottom: 6 }}>A force of 5 N gives a mass <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub>, an acceleration of 10 m/s<Sup c="2" />, and a mass <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub>, an acceleration of 20 m/s<Sup c="2" />. What acceleration would it give if both the masses were tied together? <strong>[Ans. 6·67 m/s<Sup c="2" />]</strong></li>
      <li style={{ marginBottom: 6 }}>The speed time graph of a ball of mass 20 g moving along a straight line on a long table is given in Fig. 2.5. How much force does the table exert on the ball to bring it to rest? <strong>[Ans. −4 × 10<Sup c="−4" /> N]</strong></li>
    </ol>
    <Fig key="fig-25" src={CONTENT_IMAGES.CONTENT_IMAGE_26BA4ED52AE9334D133F} num="Fig. 2.5" caption="Speed-time graph of ball moving on table." />
    <ol start={7} style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A force of 4 N acts on a body of mass 2 kg for 4 s. Assuming the body to be initially at rest, find (<em>a</em>) its velocity when the force stops acting (<em>b</em>) the distance covered in 10 s after the force starts acting. <strong>[Ans. (<em>a</em>) 8 m/s (<em>b</em>) 64 m]</strong></li>
    </ol>
  </ProblemsBox>,

  <div key="b2-sol-hd" style={{ textAlign: "center", margin: "20px 0 10px" }}>
    <h3 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 14,
      letterSpacing: 2, margin: 0 }}>■ SOLUTIONS/EXPLANATIONS ■</h3>
    <div style={{ borderTop: "1.5px solid #555", marginTop: 6 }} />
  </div>,
  <p key="b2-sol-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1.</strong> Here, <em>t</em> = 1·2 s; <em>u</em> = 1·8 m/s, <em>v</em> = 4·2 m/s<br />
    acceleration, <em>a</em> = <Frac n={<><em>v</em> − <em>u</em></>} d={<><em>t</em></>} /> = <Frac n="4·2 − 1·8" d="1·2" /> = <Frac n="2·4" d="1·2" /> = 2 m/s<Sup c="2" /><br />
    Now, as force applied is the same, it will produce the same acceleration.<br />
    Change in speed = acceleration × time for which force is applied = 2 × 2 = <strong>4 m/s</strong>
  </p>,
  <p key="b2-sol-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2.</strong> Here, <em>m</em> = 5 kg, <em>t</em> = 2 s, <em>u</em> = 3 ms<Sup c="−1" />, <em>v</em> = 7 ms<Sup c="−1" />, <em>F</em> = ?<br />
    <em>F</em> = <em>ma</em> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> = <Frac n="5(7 − 3)" d="2" /> = <strong>10 N</strong><br />
    In the second case, <em>F</em> = 10 N, <em>t</em> = 5 s, <em>v</em> = ?, <em>u</em> = 3 m/s<br />
    <em>a</em> = <Frac n={<><em>F</em></>} d={<><em>m</em></>} /> = <Frac n="10" d="5" /> = 2 m/s<Sup c="2" /><br />
    From <em>v</em> = <em>u</em> + <em>at</em>, &nbsp; <em>v</em> = 3 + 2 × 5 = <strong>13 m/s</strong>
  </p>,
  <p key="b2-sol-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>3.</strong> <em>F</em><sub style={{ fontSize: "0.72em" }}>1</sub> = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> <em>a</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 2 × 5 = 10 N, &nbsp;<em>F</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> <em>a</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 4 × 2 = 8 N<br />
    Clearly, <em>F</em><sub style={{ fontSize: "0.72em" }}>1</sub> &gt; <em>F</em><sub style={{ fontSize: "0.72em" }}>2</sub>, <em>i.e.,</em> greater force would be required in accelerating a <strong>2 kg mass at 5 m/s<Sup c="2" /></strong>
  </p>,
  <p key="b2-sol-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>4.</strong> Here, <em>u</em> = 108 km/h = <Frac n="108 × 1000 m" d="60 × 60 s" /> = 30 m/s, <em>t</em> = 4 s, <em>v</em> = 0, <em>F</em> = ?, <em>m</em> = 1000 kg<br />
    <em>F</em> = <em>ma</em> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> = <Frac n="1000(0 − 30)" d="4" /> = <strong>−7500 N</strong><br />
    Negative sign indicates that the force is opposing or braking.
  </p>,
  <p key="b2-sol-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>5.</strong> Here, <em>F</em> = 5 N, <em>a</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 10 ms<Sup c="−2" />; <em>F</em> = 5 N, <em>a</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 20 ms<Sup c="−2" /><br />
    <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = <Frac n="F" d={<><em>a</em><sub style={{ fontSize: "0.72em" }}>1</sub></>} /> = <Frac n="5" d="10" /> = 0·5 kg, &nbsp;<em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <Frac n="F" d={<><em>a</em><sub style={{ fontSize: "0.72em" }}>2</sub></>} /> = <Frac n="5" d="20" /> = 0·25 kg<br />
    Total mass = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0·5 + 0·25 = 0·75 kg<br />
    Acceleration, <em>a</em> = <Frac n="F" d={<><em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub></>} /> = <Frac n="5" d="0·75" /> = <strong>6·67 m/s<Sup c="2" /></strong>
  </p>,
  <p key="b2-sol-6" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>6.</strong> Here, <em>m</em> = 20 g = 20 × 10<Sup c="−3" /> kg, <em>F</em> = ?<br />
    From the graph, Fig. 2.5, initial speed, <em>u</em> = 20 cm/s = 0·2 m/s, final speed, <em>v</em> = 0, time taken, <em>t</em> = 10 s<br />
    <em>F</em> = <em>ma</em> = <Frac n={<><em>m</em>(<em>v</em> − <em>u</em>)</>} d={<><em>t</em></>} /> = <Frac n={<>20 × 10<Sup c="−3" />(0 − 0·2)</>} d="10" /> = <strong>−4 × 10<Sup c="−4" /> N</strong>
  </p>,
  <p key="b2-sol-7" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>7.</strong> (<em>a</em>) Here, <em>F</em> = 4 N, <em>m</em> = 2 kg, <em>t</em> = 4 s, <em>u</em> = 0, <em>v</em> = ?<br />
    From <em>F</em> = <em>ma</em>, &nbsp;<em>a</em> = <Frac n="F" d="m" /> = <Frac n="4" d="2" /> = 2 m/s<Sup c="2" /><br />
    From <em>v</em> = <em>u</em> + <em>at</em>, &nbsp;<em>v</em> = 0 + 2 × 4 = <strong>8 m/s</strong>
    <br /><br />
    (<em>b</em>) Distance travelled in first 4 s when force is acting: <em>s</em><sub style={{ fontSize: "0.72em" }}>1</sub> = <em>ut</em> + ½<em>at</em><Sup c="2" /> = 0 + ½ × 2 × 4<Sup c="2" /> = <strong>16 m</strong><br />
    When force stops acting, velocity of body is constant, <em>v</em> = 8 m/s<br />
    Distance in last 6 second: <em>s</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <em>v</em> × <em>t</em> = 8 × 6 = <strong>48 m</strong><br />
    Distance covered in 10 s = <em>s</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>s</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 16 + 48 = <strong>64 m</strong>
  </p>,
];

// ── BATCH 3: SECTIONS 2.15–2.18 + SOLVED PROBLEMS ──────────

const content_b3 = [
  // 2.15 Newton's Third Law of Motion
  <SecHd key="sec-s215" id="s215" label="2.15" title="Newton's Third Law of Motion" />,
  <p key="b3-p-s215-1" style={{ textIndent: 28, textAlign: "justify" }}>
    From Newton's first law, we learnt what force is. The second law gave us a measure of force. It established that force acting on a body is the product of mass of the body and acceleration of the body. Newton's third law of motion tells us about the nature of the force.
  </p>,
  <p key="b3-p-s215-2" style={{ textIndent: 28, textAlign: "justify" }}>
    According to this law, when an object A exerts a force on another object B, the second object B exerts a force back on the first object A, at the same instant. These two forces are always equal in magnitude, but opposite in direction. The two opposing forces are also known as the forces of action and reaction. The forces of action and reaction act on two different objects A and B. They never act on the same object. Thus, the third law of motion tells us that when two objects interact with each other, there occurs a pair of equal and opposite forces, and not just one force. Hence,
  </p>,
  <DefBox key="def-s215-3rdlaw">
    <strong style={{ fontStyle: "normal", color: "#c0126a" }}>Newton's third law of motion</strong> <em>states that to every action, there is always an equal and opposite reaction, i.e., the forces of action and reaction are always equal and opposite. These forces act on two different objects and never cancel each other. Each force produces its own effect.</em>
  </DefBox>,
  <p key="b3-p-s215-3" style={{ textIndent: 28, textAlign: "justify" }}>
    To prove this law, we can perform a <em>simple experiment</em> as detailed here:
  </p>,
  <p key="b3-p-s215-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Fig. 2.6 shows two spring balances A and B connected together. The fixed end of spring balance A is attached to a rigid support like a wall. When a force is applied by pulling the fixed end of spring balance B to the right, <em>both the spring balances show the same readings on their scales.</em> It means force exerted by spring balance B on A is equal in magnitude, but opposite in direction to the force exerted by spring balance A on B.
  </p>,
  <Fig key="fig-26" src={CONTENT_IMAGES.CONTENT_IMAGE_BC6409C39A2741D02A4F} num="Fig. 2.6" caption="Two spring balances A and B connected together, showing equal readings." />,
  <p key="b3-p-s215-5" style={{ textIndent: 28, textAlign: "justify" }}>
    If force exerted by spring balance B on spring balance A is called <strong>Action,</strong> then force exerted by spring balance A on B is called <strong>Reaction.</strong> As the readings on the scales of two spring balances are equal, therefore, the forces of action and reaction are <strong><em>always equal.</em></strong> The force of action on spring balance A is to the <em>right,</em> and the force of reaction on spring balance B is to the <em>left.</em> Thus, the forces of action and reaction are <strong><em>opposing forces.</em></strong> Obviously, these <strong><em>forces of action and reaction are acting on different objects,</em></strong> if action is on A, the reaction is on B.
  </p>,
  <p key="b3-p-s215-6" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong><em>Further, although the action and reaction forces are always equal in magnitude, yet these forces may not produce accelerations of equal magnitude. This is because each force acts on a different object which may have different mass.</em></strong> The force acting on lighter body will produce greater acceleration and vice-versa.
  </p>,

  // 2.16 Some Examples of Newton's Third Law
  <SecHd key="sec-s216" id="s216" label="2.16" title="Some Examples of Newton's Third Law of Motion" />,
  <p key="b3-p-s216-0" style={{ textIndent: 28, textAlign: "justify" }}>
    Some of our day-to-day observations can be explained in terms of Newton's third law of motion as follows:
  </p>,
  <p key="b3-p-s216-w-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    1. Walking
  </p>,
  <p key="b3-p-s216-w-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To walk on the ground, we push the ground backwards with our foot, along OA [Fig. 2.7]. As a reaction, the ground pushes our foot forward with the same force, along OB. It is this forward reaction force of the ground that enables us to walk forward.
  </p>,
  <p key="b3-p-s216-w-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Walking becomes difficult when the ground is slippery or it is covered with snow or sand. This is because we can exert much smaller force in the form of backward action on the ground. The forward reaction of the ground will reduce accordingly.
  </p>,
  <Fig key="fig-27" src={CONTENT_IMAGES.CONTENT_IMAGE_FD35AEA29E7C3111B908} num="Fig. 2.7" caption="Action of foot on ground (along OA) and reaction of ground on foot (along OB)." />,
  <p key="b3-p-s216-sw-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    2. Swimming
  </p>,
  <p key="b3-p-s216-sw-1" style={{ textIndent: 28, textAlign: "justify" }}>
    While trying to swim, a swimmer pushes the water backwards with her hands and feet. This is the force of action. The water pushes the swimmer forward with the same force (of reaction).
  </p>,
  <p key="b3-p-s216-gun-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    3. Recoiling of gun
  </p>,
  <p key="b3-p-s216-gun-1" style={{ textIndent: 28, textAlign: "justify" }}>
    When a bullet is fired from a gun, the gun recoils, <em>i.e.,</em> the gun moves backwards through a small distance, giving jerk to the shoulder of the gunman. This is because on firing, the gun exerts some force on the bullet (<em>i.e.,</em> action) in forward direction. In turn, the bullet exerts an equal force on the gun (<em>i.e.,</em> reaction) in the backward direction. The distance moved by the gun is smaller because gun is much heavier than the bullet, [Fig. 2.8].
  </p>,
  <Fig key="fig-28" src={CONTENT_IMAGES.CONTENT_IMAGE_14E3FC367B1E222EAD74} num="Fig. 2.8" caption="Force on bullet (action) in forward direction; force on gun (reaction) in backward direction." />,
  <p key="b3-p-s216-boat-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    4. Man and boat
  </p>,
  <p key="b3-p-s216-boat-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Suppose a sailor is in a boat at rest near a river bank. As the sailor jumps from the boat to the river bank, the boat is pushed away from the bank. This happens due to equal forces of action and reaction.
  </p>,
  <p key="b3-p-s216-rocket-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    5. The flying of rockets and jet planes
  </p>,
  <p key="b3-p-s216-rocket-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In a rocket, the fuel burnt appears in the form of hot and highly compressed gases. These are made to escape through a nozzle in the downward direction. As a reaction, the rocket moves upwards with the same force. The forces of action and reaction are shown in Fig. 2.9.
  </p>,
  <p key="b3-p-s216-rocket-2" style={{ textIndent: 28, textAlign: "justify" }}>
    In a jet plane, the burnt gases rush out of a jet at the rear end (back end) of the aircraft. As a reaction, the jet plane moves forward with an equal force.
  </p>,
  <Fig key="fig-29" src={CONTENT_IMAGES.CONTENT_IMAGE_088369A3BB428464B7CF} num="Fig. 2.9" caption="Force on rocket (reaction, upward) and force with which gases escape (action, downward)." />,
  <p key="b3-p-s216-hose-hd" style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700, color: "#c0126a", fontSize: 13.5, margin: "12px 0 6px" }}>
    6. The case of hose pipe
  </p>,
  <p key="b3-p-s216-hose-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To put out fire, the firemen direct a powerful stream of water on fire, from a hose pipe. While doing so, the <em>hose pipe</em> is to be held strongly because of its tendency to move backwards. As the water rushes out at a great speed from the <em>hose pipe</em> in the forward direction (action), the <em>hose pipe</em> tends to move backwards, due to an equal force of reaction.
  </p>,

  // 2.17 Law of Conservation of Linear Momentum
  <SecHd key="sec-s217" id="s217" label="2.17" title="Law of Conservation of Linear Momentum" />,
  <p key="b3-p-s217-1" style={{ textIndent: 28, textAlign: "justify" }}>
    It is a very important law, which has been deduced from Newton's third law of motion. According to this law:
  </p>,
  <DefBox key="def-s217-conservation">
    <em>When two or more bodies interact with one another, the vector sum of their linear momenta remains constant (i.e., conserved), and is not affected due to their mutual action and reaction. The only condition is that no external unbalanced forces should be acting on the system of bodies.</em>
  </DefBox>,
  <p key="b3-p-s217-2" style={{ textIndent: 28, textAlign: "justify" }}>
    We can prove this law by considering an <strong><em>ideal collision experiment</em></strong> between two bodies.
  </p>,
  <p key="b3-p-s217-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Suppose two balls A and B are moving in the same direction along a straight line with different velocities. Let <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub> = mass of ball A, <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub> = mass of ball B; <em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub> = initial velocity of A, <em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub> = initial velocity of B.
  </p>,
  <p key="b3-p-s217-4" style={{ textIndent: 28, textAlign: "justify" }}>
    If <em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub> &gt; <em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub>, the two balls collide with each other as shown in Fig. 2.10. Let this collision last for a short time <em>t</em>. During collision, suppose <em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub> = force exerted by A on B, and <em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub> = force exerted by B on A. We shall assume that no other external unbalanced forces are acting on the balls.
  </p>,
  <p key="b3-p-s217-5" style={{ textIndent: 28, textAlign: "justify" }}>
    After collision for <em>t</em> seconds, the balls move separately. Let <em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> = velocity of A after collision, <em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub> = velocity of B after collision.
  </p>,
  <Fig key="fig-210" src={CONTENT_IMAGES.CONTENT_IMAGE_DBA0BE5FED1DDFF190C3} num="Fig. 2.10" caption="Before collision (a), during collision (b) and after collision (c) of balls A and B." />,
  <p key="b3-p-s217-6" style={{ textIndent: 28, textAlign: "justify" }}>
    Change in momentum of A = momentum of A after collision − momentum of A before collision = <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub>
  </p>,
  <MathBlock key="b3-math-s217-1">
    Rate of change of momentum of A = <Frac n={<>change in momentum of A</>} d="time taken" /> = <Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub></>} d={<><em>t</em></>} />
  </MathBlock>,
  <p key="b3-p-s217-7" style={{ textIndent: 28, textAlign: "justify" }}>
    This is equal to force exerted by B on A, <em>i.e.,</em> <em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub> (as per Newton's second law of motion),
  </p>,
  <MathBlock key="b3-math-s217-2">
    ∴ &nbsp;<em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub> = <Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub></>} d={<><em>t</em></>} /> &nbsp;&nbsp; ...(1)
  </MathBlock>,
  <p key="b3-p-s217-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Similarly, rate of change of momentum of B = <Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub></>} d={<><em>t</em></>} />. This must be equal to force exerted by A on B, <em>i.e.,</em> <em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub>,
  </p>,
  <MathBlock key="b3-math-s217-3">
    ∴ &nbsp;<em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub> = <Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub></>} d={<><em>t</em></>} /> &nbsp;&nbsp; ...(2)
  </MathBlock>,
  <p key="b3-p-s217-9" style={{ textIndent: 28, textAlign: "justify" }}>
    According to Newton's third law of motion, the force <em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub> exerted by ball A on ball B (say, action) and the force <em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub> exerted by ball B on ball A, (the reaction) must be equal and opposite to each other. Therefore,
  </p>,
  <MathBlock key="b3-math-s217-4">
    <em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub> = −<em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub>
  </MathBlock>,
  <p key="b3-p-s217-10" style={{ textIndent: 28, textAlign: "justify" }}>
    Using eqns. (1) and (2), we get:
  </p>,
  <MathBlock key="b3-math-s217-5">
    <Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub></>} d={<><em>t</em></>} /> = −<Frac n={<>(<em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub>)</>} d={<><em>t</em></>} />
  </MathBlock>,
  <MathBlock key="b3-math-s217-6">
    or &nbsp; <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub> − <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub> = −<em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub>
  </MathBlock>,
  <MathBlock key="b3-math-s217-7">
    <strong><em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> = <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub></strong> &nbsp;&nbsp; ...(3)
  </MathBlock>,
  <p key="b3-p-s217-11" style={{ textIndent: 28, textAlign: "justify" }}>
    Now, (<em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>A</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>B</sub>) = total momentum of the two balls after collision, and (<em>m</em><sub style={{ fontSize: "0.72em" }}>B</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>B</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>A</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>A</sub>) = total momentum of the two balls before collision.
  </p>,
  <p key="b3-p-s217-12" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, eqn. (3) shows that total momentum of the two balls remains unchanged on collision, <em>i.e.,</em> total linear momentum is conserved and is not affected by the mutual action and reaction of the balls, provided no other external unbalanced forces act. This is the law of conservation of linear momentum.
  </p>,

  // 2.18 Applications of Law of Conservation of Momentum
  <SecHd key="sec-s218" id="s218" label="2.18" title="Applications of the Law of Conservation of Linear Momentum" />,
  <p key="b3-p-s218-1" style={{ textIndent: 28, textAlign: "justify" }}>
    As the law of conservation of linear momentum has been deduced from Newton's third law of motion, therefore, all the applications/examples of Newton's third law of motion can be explained in terms of the law of conservation of linear momentum.
  </p>,
  <p key="b3-p-s218-2" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, <strong><em>flight of jet planes and rockets</em></strong> can be understood in terms of the law of conservation of linear momentum. Before firing, the momentum of the rocket is zero. On firing, the burnt gases rush out through the nozzle in the downward direction. The rocket moves such that
  </p>,
  <MathBlock key="b3-math-s218-1">
    momentum of rocket + momentum of escaping gases = 0.<br />
    ∴ &nbsp; momentum of rocket = − momentum of escaping gases.
  </MathBlock>,
  <p key="b3-p-s218-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Negative sign shows that <strong><em>rocket moves upwards (in a direction opposite to the direction of escaping gases), with momentum equal to the momentum of the escaping gases.</em></strong>
  </p>,
  <p key="b3-p-s218-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Similarly, <strong><em>recoiling of a gun</em></strong> can be understood in terms of the law of conservation of linear momentum. Let <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = mass of bullet, <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = mass of gun; <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> = velocity of bullet, <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = velocity of gun.
  </p>,
  <p key="b3-p-s218-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Total linear momentum of bullet and gun on firing = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub>
  </p>,
  <p key="b3-p-s218-6" style={{ textIndent: 28, textAlign: "justify" }}>
    Before firing, both the gun and the bullet are at rest, therefore total linear momentum of bullet and gun = 0. As no external forces are involved in the process, therefore, applying the law of conservation of linear momentum,
  </p>,
  <MathBlock key="b3-math-s218-2">
    <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0 &nbsp; or &nbsp; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −<em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> &nbsp; or &nbsp;
    <strong><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −<Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub></>} d={<><em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub></>} /></strong> &nbsp;&nbsp; ...(1)
  </MathBlock>,
  <p key="b3-p-s218-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Negative sign in eqn. (1) shows that <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> is in a direction opposite to <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub>, <em>i.e.,</em> the gun recoils or moves backwards when the bullet moves forward. Further, as <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> ≫ <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub>, therefore, <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> ≪ <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub>, <em>i.e.,</em> as the gun is much heavier than the bullet, <strong><em>the recoil velocity of the gun is much smaller than the velocity of the bullet.</em></strong>
  </p>,

  // Solved Problems — Newton's Third Law & Conservation of Momentum
  <div key="b3-solved-hd" style={{ textAlign: "center", margin: "24px 0 8px" }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 18,
      color: "#c0126a", letterSpacing: 2, textTransform: "uppercase", margin: 0 }}>
      Solved Problems
    </h2>
    <div style={{ borderTop: "2px solid #c0126a", marginTop: 6 }} />
  </div>,

  <NumericalSection key="num-s3rd-cons" topic="NEWTON'S THIRD LAW OF MOTION AND LAW OF CONSERVATION OF LINEAR MOMENTUM">
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, margin: "0 0 14px" }}>
      <img src={CONTENT_IMAGES.CONTENT_IMAGE_D1666369FB3B27267540}
        alt="Problems Based On badge"
        style={{ width: 80, height: "auto", flexShrink: 0, border: "1px solid #ddd" }}
        onError={e => e.target.style.display = "none"} />
      <div>
        <p style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 12.5, margin: "0 0 6px", letterSpacing: 1 }}>FORMULAE AND UNITS</p>
        <p style={{ margin: "0 0 4px" }}><strong>1.</strong> When two bodies A and B interact with each other, force exerted by A on B (<em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub>) is equal and opposite to the force exerted by B on A (<em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub>), <em>i.e.,</em> <em>F</em><sub style={{ fontSize: "0.72em" }}>AB</sub> = −<em>F</em><sub style={{ fontSize: "0.72em" }}>BA</sub>.</p>
        <p style={{ margin: "0 0 4px" }}><strong>2.</strong> According to the law of conservation of linear momentum, total momentum after collision = total momentum before collision: &nbsp;<em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub></p>
        <p style={{ margin: 0 }}><strong>3.</strong> If the two bodies are initially at rest (as in case of firing a bullet from a gun), <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 0, <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0. Thus, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0 &nbsp; or &nbsp; <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −<Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub></>} d={<><em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub></>} /></p>
      </div>
    </div>

    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Problem 1.</strong> A 10 g bullet is shot from a 5 kg gun with a velocity of 400 m/s. What is the speed of recoil of the gun?
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Solution.</strong> Here, mass of bullet, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 10 g = 10 × 10<Sup c="−3" /> kg = 10<Sup c="−2" /> kg; mass of gun, <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 5 kg; velocity of bullet, <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 400 m/s; speed of recoil of gun, <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = ?
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      As total momentum of bullet and gun after firing = total momentum before firing, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0
    </p>
    <MathBlock key="b3-math-prob1">
      <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −<Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub></>} d={<><em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub></>} /> = −<Frac n={<>10<Sup c="−2" /> × 400</>} d="5" /> = <strong>−0·8 m/s</strong>
    </MathBlock>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      Negative sign shows that the gun moves in a direction opposite to that of the bullet.
    </p>

    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Problem 2.</strong> The car A of mass 1500 kg, travelling at 25 m/s collides with another car B of mass 1000 kg travelling at 15 m/s in the same direction. After collision, the velocity of car A becomes 20 m/s. Calculate the velocity of car B after collision.
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      <strong>Solution.</strong> Here, mass of car A, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 1500 kg; initial velocity of car A, <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 25 m/s; mass of car B, <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 1000 kg; initial velocity of car B, <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 15 m/s; after collision, velocity of car A, <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 20 m/s; velocity of car B, <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = ?
    </p>
    <p style={{ textIndent: 28, textAlign: "justify" }}>
      As total momentum after collision = total momentum before collision,
    </p>
    <MathBlock key="b3-math-prob2-1">
      <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub>
    </MathBlock>
    <MathBlock key="b3-math-prob2-2">
      1500 × 20 + 1000 × <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 1500 × 25 + 1000 × 15
    </MathBlock>
    <MathBlock key="b3-math-prob2-3">
      30000 + 1000<em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 52500 &nbsp; or &nbsp; 1000<em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 22500 &nbsp; or &nbsp; <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = <Frac n="22500" d="1000" /> = <strong>22·5 m/s</strong>
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s3rd">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A bullet of mass 50 g is fired from a gun of mass 6 kg with a velocity of 400 m/s. Calculate the recoil velocity of the gun. <strong>[Ans. −3·3 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>A bullet of mass 20 gram moving with a velocity of 300 m/s gets embedded in a freely suspended wooden block of mass 880 gram. What is the velocity acquired by the block? <strong>[Ans. 6·67 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>A truck of mass 2500 kg moving at 15 m/s collides with a car of mass 1000 kg moving at 5 m/s in the opposite direction. With what velocity would the two move together? <strong>[Ans. 9·3 m/s in the direction of the truck]</strong></li>
      <li style={{ marginBottom: 6 }}>A boy of mass 60 kg running at 3 m/s jumps on to a trolley of mass 140 kg moving with a velocity of 1·5 m/s in the same direction. What is their common velocity? <strong>[Ans. 1·95 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>A bullet of mass 20 g is fired horizontally with a velocity of 150 ms<Sup c="−1" /> from a pistol of mass 2 kg. What is the recoil velocity of the pistol? <strong>[Ans. −1·5 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>A girl of mass 40 kg jumps with a horizontal velocity of 5 m/s onto a stationary cart with frictionless wheels. The mass of the cart is 3 kg. What is her velocity as the cart starts moving? Assume that there is no external unbalanced force working in the horizontal direction. <strong>[Ans. 4·65 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>Two hockey players of opposite teams, while trying to hit a hockey ball on the ground collide and immediately become entangled. One has a mass of 60 kg, and was moving with a velocity 5·0 m/s, while the other has a mass of 55 kg and was moving faster with a velocity of 6·0 m/s towards the first player. In which direction and with what velocity will they move after they become entangled? Assume that the frictional force acting between the feet of the two players and ground is negligible. <strong>[Ans. 0·26 ms<Sup c="−1" /> in the direction of second player]</strong></li>
    </ol>
  </ProblemsBox>,

  <div key="b3-sol-hd" style={{ textAlign: "center", margin: "20px 0 10px" }}>
    <h3 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: 2, margin: 0 }}>■ SOLUTIONS/EXPLANATIONS ■</h3>
    <div style={{ borderTop: "1.5px solid #555", marginTop: 6 }} />
  </div>,
  <p key="b3-sol-1" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>1.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 50 g = <Frac n="50" d="1000" /> kg = <Frac n="1" d="20" /> kg; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 6 kg; <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 400 m/s; <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = ?<br />
    As <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0, &nbsp; <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −<Frac n={<><em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub></>} d={<><em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub></>} /> = −<Frac n="1 × 400" d="20 × 6" /> = <strong>−3·3 m/s.</strong>
  </p>,
  <p key="b3-sol-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>2.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 20 g = <Frac n="1" d="50" /> kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 300 m/s; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 880 g; <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0 (block is initially at rest); <em>v</em> = ?<br />
    Applying principle of conservation of linear momentum, (<em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub>)<em>v</em> = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub><br />
    (20 + 880) × 10<Sup c="−3" /> × <em>v</em> = <Frac n="1" d="50" /> × 300 + 0 = 6 &nbsp; or &nbsp; <Frac n="900" d="1000" /><em>v</em> = 6 &nbsp; or &nbsp; <em>v</em> = <Frac n="6 × 1000" d="900" /> = <strong>6·67 m/s</strong>
  </p>,
  <p key="b3-sol-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>3.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 2500 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 15 m/s; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 1000 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −5 m/s (opposite direction).<br />
    <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = (<em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub>)<em>v</em> &nbsp; or &nbsp; 2500 × 15 + 1000(−5) = 3500<em>v</em><br />
    37500 − 5000 = 3500<em>v</em> &nbsp; or &nbsp; <em>v</em> = <Frac n="32500" d="3500" /> = <Frac n="65" d="7" /> = <strong>9·3 m/s</strong> (in the direction of the truck)
  </p>,
  <p key="b3-sol-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>4.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 60 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 3 m/s; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 140 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 1·5 m/s<br />
    60 × 3 + 140 × 1·5 = (60 + 140)<em>v</em> &nbsp; or &nbsp; 180 + 210 = 200<em>v</em> &nbsp; or &nbsp; <em>v</em> = <Frac n="390" d="200" /> = <strong>1·95 m/s</strong>
  </p>,
  <p key="b3-sol-5" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>5.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = <Frac n="1" d="50" /> kg; <em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 150 ms<Sup c="−1" />; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 2 kg; <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = ?<br />
    <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0, &nbsp; <em>v</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −<Frac n="1" d="50" /> × <Frac n="150" d="2" /> = <strong>−1·5 m/s</strong>
  </p>,
  <p key="b3-sol-6" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>6.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 40 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 5 m/s; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 3 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 0<br />
    (<em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub>)<em>v</em> = <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> + <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub><em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> &nbsp; or &nbsp; 43<em>v</em> = 200 &nbsp; or &nbsp; <em>v</em> = <Frac n="200" d="43" /> = <strong>4·65 m/s</strong>
  </p>,
  <p key="b3-sol-7" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>7.</strong> Here, <em>m</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 60 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>1</sub> = 5·0 m/s; <em>m</em><sub style={{ fontSize: "0.72em" }}>2</sub> = 55 kg; <em>u</em><sub style={{ fontSize: "0.72em" }}>2</sub> = −6·0 m/s (opposite direction)<br />
    (60 + 55)<em>v</em> = 60 × 5·0 + 55 × (−6·0) = 300 − 330 = −30<br />
    115<em>v</em> = −30 &nbsp; or &nbsp; <em>v</em> = <Frac n="−30" d="115" /> = <strong>−0·26 m/s</strong><br />
    Negative sign shows that the combined velocity of the two players is <strong>in the direction of the second player.</strong>
  </p>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s21",  label: "2.1",  title: "Introduction",                      level: 1 },
  { id: "s22",  label: "2.2",  title: "What is Force?",                    level: 1 },
  { id: "s23",  label: "2.3",  title: "Balanced and Unbalanced Forces",    level: 1 },
  { id: "s24",  label: "2.4",  title: "Galileo's Observations",            level: 1 },
  { id: "s25",  label: "2.5",  title: "Newton's Laws of Motion",           level: 1 },
  { id: "s26",  label: "2.6",  title: "Newton's First Law",                level: 1 },
  { id: "s27",  label: "2.7",  title: "First Law Defines Force",           level: 1 },
  { id: "s28",  label: "2.8",  title: "Inertia and Mass",                  level: 1 },
  { id: "s29",  label: "2.9",  title: "Three Types of Inertia",            level: 1 },
  { id: "s210", label: "2.10", title: "Linear Momentum",                   level: 1 },
  { id: "s211", label: "2.11", title: "Newton's Second Law",               level: 1 },
  { id: "s212", label: "2.12", title: "Mathematical Formulation",          level: 1 },
  { id: "s213", label: "2.13", title: "Applications of Second Law",        level: 1 },
  { id: "s214", label: "2.14", title: "First Law as Special Case",         level: 1 },
  { id: "s215", label: "2.15", title: "Newton's Third Law",                level: 1 },
  { id: "s216", label: "2.16", title: "Examples of Third Law",             level: 1 },
  { id: "s217", label: "2.17", title: "Conservation of Momentum",         level: 1 },
  { id: "s218", label: "2.18", title: "Applications of Conservation",      level: 1 },
];

// ── CONCAT ALL CONTENT ────────────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
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
