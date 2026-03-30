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

const chapterNumber = "3";
const chapterTitle = "WORK, ENERGY AND SIMPLE MACHINES";

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

// ── CONTENT BATCH 1 ──────────────────────────────────────────
const content_b1 = [
  <SecHd key="sec-s31" id="s31" label="3.1" title="Introduction" />,
  <p key="b1-p-s31-1" style={{ textIndent: 28, textAlign: "justify" }}>
    So far we have described the motion of an object when the force acting on it is constant. This has been done by applying <strong>Newton's second law of motion.</strong> But in most physical phenomena, the forces acting on objects are not constant and, in fact, depend on their positions. Such forces include gravitational force or the force exerted by an object attached to a spring. To deal with such situations, we shall develop general methods by introducing the concept of <strong>work</strong> done by a force as the object on which it acts moves from one place to the other. The concept of work is closely related to the concept of <strong>energy.</strong> In fact, <strong><em>the concept of work provides a link between force and energy.</em></strong> Although this approach gives the same results as are given by Newton's laws, the general ideas of <strong>work-energy</strong> can be applied to a wide range of phenomena in different fields of physics. Apart from this, the work-energy approach can provide a simpler analysis than the direct application of <em>F = ma</em>. However, it is to be noted that the work-energy approach is based on Newton's laws and as such does not involve any new principles. Further, from the practical point of view, it is important to know not only the work done on an object but also the rate at which it is being done. This involves the concept of <strong>power.</strong> We shall be discussing these concepts in this chapter in greater details.
  </p>,
  <p key="b1-p-s31-2" style={{ textIndent: 28, textAlign: "justify" }}>
    At the end of the chapter, simple machines are introduced. Here, students will learn how simple tools such as lever, pulley, inclined plane, wheel and axle, wedge and screw etc., are helpful in doing routine tasks. They will learn about the concept of mechanical advantage, velocity ratio and efficiency of these simple tools. This will enable them to apply these concepts to daily solve problems.
  </p>,

  <SecHd key="sec-s32" id="s32" label="3.2" title="Work" />,
  <p key="b1-p-s32-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The <strong><em>intuitive meaning</em></strong> of work is quite different from the <strong><em>scientific definition</em></strong> of work. In everyday activity, the term 'work' is used equally for mental work and for physical work (involving muscular force) as is clear from the following examples.
  </p>,
  <p key="b1-p-s32-2" style={{ marginLeft: 20 }}>
    <strong>(<em>i</em>)</strong> You may read a book or exert yourself mentally in thinking about a simple or difficult problem.<br />
    <strong>(<em>ii</em>)</strong> You might be holding a weight without moving.<br />
    <strong>(<em>iii</em>)</strong> You may be carrying a load and moving horizontally with uniform velocity on a frictionless road.<br />
    <strong>(<em>iv</em>)</strong> You may be trying hard to move a huge rock which does not move despite your best efforts, though you may get completely exhausted in the process.
  </p>,
  <p key="b1-p-s32-3" style={{ textAlign: "justify", fontStyle: "italic" }}>
    In all these cases, according to scientific definition, you are not doing any work.
  </p>,
  <p key="b1-p-s32-4" style={{ textAlign: "justify", fontStyle: "italic" }}>
    In other words : <em>not much work in spite of working hard :</em>
  </p>,
  <SubHd key="sub-s32-sci" id="s32-sci" label="" title="Scientific Conception of Work" />,
  <p key="b1-p-s32-5" style={{ textIndent: 28, textAlign: "justify" }}>
    In physics, the term work is used in a special technical sense and has a much more precise definition which follows from the following examples.
  </p>,
  <p key="b1-p-s32-6" style={{ marginLeft: 20, textAlign: "justify" }}>
    <strong>(<em>i</em>)</strong> When a box is <em>pushed</em> by a man on a floor by applying a <em>force</em> and it moves through some <em>distance,</em> work is said to be done. In this case, the applied force displaces the box.<br />
    <strong>(<em>ii</em>)</strong> When a man <em>pulls</em> a trolley by applying a <em>force</em> and it moves through some <em>distance,</em> work is again said to be done.<br />
    <strong>(<em>iii</em>)</strong> When a man lifts a box through a <em>height</em>, he has to apply a <em>force</em>. In this case, the applied force does work in lifting the box.
  </p>,
  <p key="b1-p-s32-7" style={{ textAlign: "justify" }}>
    From all the examples given above, it follows that work is done if :<br />
    <strong>(a)</strong> a force is applied on the object and<br />
    <strong>(b)</strong> the object is displaced from its original position.<br />
    No work is said to be done if any of the two conditions is not satisfied.
  </p>,

  <SecHd key="sec-s33" id="s33" label="3.3" title="Work Done by a Constant Force" />,
  <p key="b1-p-s33-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The direction of the displacement of an object and the direction of the force can have different relations with each other. The directions of the force and the displacement may be :
  </p>,
  <p key="b1-p-s33-dirs" style={{ margin: "4px 0 8px", paddingLeft: 20 }}>
    <strong>(<em>i</em>)</strong> same &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>(<em>ii</em>)</strong> opposite<br />
    <strong>(<em>iii</em>)</strong> perpendicular to each other. Further, <strong>(<em>iv</em>)</strong> there may not be a displacement at all.
  </p>,
  <p key="b1-p-s33-2" style={{ textAlign: "justify" }}>Let us find the work done by the force in each of these cases.</p>,
  <p key="b1-p-s33-3" style={{ textAlign: "justify" }}>
    <strong>(<em>i</em>) Force is acting in the direction of displacement.</strong> Consider a block placed at a point P and acted upon by a constant force F as shown in Fig. 3.1 (a). The block is displaced through a distance <em>s</em> to a new position Q.
  </p>,
  <p key="b1-p-s33-4" style={{ fontStyle: "italic", textAlign: "justify" }}>
    The work done (W) by the force (F) is equal to the product of the force and the displacement (s), i.e.,
  </p>,
  <MathBlock key="b1-math-1"><em>W = Fs</em> &nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b1-p-s33-5" style={{ textAlign: "justify" }}>
    <strong>(<em>ii</em>) Force is acting in a direction opposite to the displacement.</strong> In case, the force F is acting opposite to the displacement <em>s</em> of a body in motion as shown in Fig. 3.1 (b), the work done is <em>negative, i.e.,</em>
  </p>,
  <MathBlock key="b1-math-2"><em>W = −Fs</em> &nbsp;&nbsp;...(2)</MathBlock>,
  <p key="b1-p-s33-6" style={{ textAlign: "justify" }}>
    This happens when the object is moving in one direction while the force is acting in the opposite direction, <em>i.e.,</em> the force is retarding the motion. A typical example is the <strong>work done by the frictional force</strong> (which usually acts in a direction opposite to that of the displacement) <strong><em>is negative</em></strong>. Further, if an object is thrown up, its displacement is in the upward direction, whereas the force acting on it due to Earth's gravity is in the downward direction. <strong>The work done by gravity on an object thrown upwards is negative.</strong>
  </p>,
  <div key="fig-3-1" style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", margin: "16px 0" }}>
    <div style={{ textAlign: "center" }}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_4402EEE648899ECCAE4C} num="" caption="(a)" />
    </div>
    <div style={{ textAlign: "center" }}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_ADB140D18938FB8A2941} num="" caption="(b)" />
    </div>
    <div style={{ textAlign: "center" }}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_29B4F8776A9681926CD1} num="Fig. 3.1" caption="(c)" />
    </div>
  </div>,
  <p key="b1-p-s33-7" style={{ textAlign: "justify" }}>
    <strong>(<em>iii</em>) Force is acting perpendicular to the displacement.</strong> In this case, the force F applied is perpendicular to the displacement as shown in Fig. 3.1 (c). Obviously, there is no displacement in the direction (or parallel) to the force. Work done in this case is <em>zero, i.e.,</em>
  </p>,
  <MathBlock key="b1-math-3"><em>W = F</em> × 0 = 0 &nbsp;&nbsp;(<em>s</em> = 0 in the direction of <em>F</em>)</MathBlock>,
  <p key="b1-p-s33-8" style={{ textAlign: "justify" }}>
    <strong>(<em>iv</em>) Force is causing no displacement.</strong> In this case, <em>s</em> = 0 and as such
  </p>,
  <MathBlock key="b1-math-4"><em>W = F</em> × <em>s</em> = 0</MathBlock>,
  <p key="b1-p-s33-9" style={{ textAlign: "justify" }}>
    This happens when one may be holding a heavy weight. In this case, there is simply a force but no displacement. Further, no work is done when one may be pushing a rock and is unable to move it. Thus, we conclude that
  </p>,
  <p key="b1-p-s33-10" style={{ marginLeft: 20 }}>
    <strong>(a)</strong> Work done by a force is <strong>positive,</strong> when the force acts in the <strong>same direction</strong> as that of displacement.<br />
    <strong>(b)</strong> Work done by a force is <strong>negative,</strong> when the force acts <strong>opposite to the direction</strong> of the displacement.<br />
    <strong>(c)</strong> Work done by a force is <em>zero</em>, if there is <strong>no displacement in the direction of the force, <em>i.e., force is perpendicular to displacement.</em></strong><br />
    <strong>(d)</strong> Work done by a force is <em>zero</em> if there is <strong>no displacement</strong> at all.
  </p>,
  <p key="b1-p-s33-11" style={{ textAlign: "justify" }}>From the above discussion, it follows that</p>,
  <DefBox key="def-s33-1">
    <strong>The work done by a force</strong> acting on an object is equal to the product of the force (F) and the displacement (s) of the object in the direction of the force, <em>i.e.,</em>
    <MathBlock key="b1-math-5"><strong>W = F × s = Fs</strong></MathBlock>
  </DefBox>,
  <p key="b1-p-s33-12" style={{ textIndent: 28, textAlign: "justify" }}>
    It should be carefully noted that work has only magnitude and no direction and such is a <strong>scalar</strong>. However, it may be positive or negative.
  </p>,

  <SubHd key="sub-s33-unit" id="s33-unit" label="" title="Unit of work" />,
  <p key="b1-p-s33-13" style={{ textIndent: 28, textAlign: "justify" }}>
    Work done is the product of force and displacement. If force is measured in <strong>newton (N)</strong> and displacement is in <strong>metre (m),</strong> the unit of work is <strong>newton-metre (Nm),</strong> which is given a separate name, called <strong>joule (J),</strong> in honour of the British scientist <strong><em>James Prescott Joule</em></strong> (1818–1889).
  </p>,
  <p key="b1-p-s33-14" style={{ textAlign: "justify" }}>
    Joule is, in fact, the SI unit of work
  </p>,
  <p key="b1-p-s33-15" style={{ textAlign: "justify" }}>
    As &nbsp; <em>W = F × s</em>, when <em>F</em> = 1 N, <em>s</em> = 1 m, <em>W</em> = 1 N × 1 m = 1 Nm = 1 J
  </p>,
  <DefBox key="def-s33-2">
    <strong>One joule</strong> work is said to be done on an object when a force of one newton displaces it by one metre along the line of action of the force.
  </DefBox>,
  <p key="b1-p-s33-16">Further, 1 kilo joule (1 kJ) = 1000 J &nbsp; and &nbsp; 1 mega joule (1 MJ) = 10<Sup c="6" /> J</p>,

  <NumericalSection key="num-workdone" topic="WORK DONE">
    <p key="b1-num-wk-form" style={{ marginBottom: 8 }}>
      <strong>1.</strong> <em>W = F × s</em><br />
      where <em>W</em> is the work done by the force <em>F</em> and <em>s</em> is the displacement of the object in the direction of force.<br />
      If <em>F</em> is newton (N), <em>s</em> is in metre (m); <em>W</em> is in joule (J).<br />
      <strong>2.</strong> Acceleration due to gravity, <em>g</em> = 10 m/s<Sup c="2" />.
    </p>
    <p key="b1-num-wk-p1"><strong>Problem 1.</strong> A force of 5 N is acting on an object. The object is displaced through 2 m in the direction of the force, [Fig. 3.2]. If the force acts all through the displacement, find the work done by the force.</p>
    <Fig key="fig-3-2" src={CONTENT_IMAGES.CONTENT_IMAGE_371B403A1DD0A3AF49DB} num="Fig. 3.2" caption="" />
    <p key="b1-num-wk-s1"><strong>Solution.</strong> Work done, <em>W = Fs</em> = (5 N) × (2 m) = <strong>10 J</strong></p>

    <p key="b1-num-wk-p2" style={{ marginTop: 10 }}><strong>Problem 2.</strong> A ball of mass 1 kg thrown upwards, reaches a maximum height of 4 m. Calculate the work done by the force of gravity during the vertical displacement. (<em>g</em> = 10 m/s<Sup c="2" />).</p>
    <p key="b1-num-wk-s2">
      <strong>Solution.</strong> Here, force of gravity on the ball, <em>F = mg</em> = (1 kg)(10 m/s<Sup c="2" />) = 10 N<br />
      vertical displacement of the ball, <em>s</em> = 4 m<br />
      Since the force and the displacement of the ball are in opposite directions, work done by the force of gravity, <em>i.e.,</em>
    </p>
    <MathBlock key="b1-math-wk2"><em>W = −F × s</em> = −(10 N)(4 m) = <strong>−40 J</strong></MathBlock>
    <p key="b1-num-wk-s2b">Obviously, work done <em>against</em> the force of gravity = <strong>40 J</strong></p>

    <p key="b1-num-wk-p3" style={{ marginTop: 10 }}><strong>Problem 3.</strong> A porter lifts a luggage of 15 kg from the ground and puts it on his head 1·5 m above the ground. Calculate the work done by him on the luggage.</p>
    <p key="b1-num-wk-s3">
      <strong>Solution.</strong> Here, force exerted by the porter in lifting the luggage,
    </p>
    <MathBlock key="b1-math-wk3"><em>F</em> = 15 kg wt = (15 × 10) N = 150 N</MathBlock>
    <p key="b1-num-wk-s3b">vertical displacement, <em>s</em> = 1·5 m</p>
    <p key="b1-num-wk-s3c">Work done by the porter on the luggage, <em>i.e., W = Fs</em> = (150 N)(1·5 m) = <strong>225 J</strong></p>

    <p key="b1-num-wk-p4" style={{ marginTop: 10 }}><strong>Problem 4.</strong> An engine pulls a train 1 km over a level track. Calculate the work done by the train given that the frictional resistance is 5 × 10<Sup c="5" /> N.</p>
    <p key="b1-num-wk-s4">
      <strong>Solution.</strong> Here, frictional resistance, <em>F</em> = 5 × 10<Sup c="5" /> N<br />
      distance through which the train moves, <em>s</em> = 1 km = 1000 m
    </p>
    <MathBlock key="b1-math-wk4">Work done by the frictional force, <em>W = −Fs</em> = −(5 × 10<Sup c="5" /> N)(1000 m) = <strong>−5 × 10<Sup c="8" /> J</strong></MathBlock>
    <p key="b1-num-wk-s4b">(<em>F</em> and <em>s</em> are in opposite directions)<br />Obviously, work done by the train is <strong>5 × 10<Sup c="8" /> J</strong></p>

    <p key="b1-num-wk-p5" style={{ marginTop: 10 }}><strong>Problem 5.</strong> A man weighing 70 kg carries a weight of 10 kg on the top of a tower 100 m high. Calculate the work done by the man. (<em>g</em> = 10 m/s<Sup c="2" />).</p>
    <p key="b1-num-wk-s5">
      <strong>Solution.</strong> Here, force exerted by the man, <em>F</em> = (70 + 10) kg wt = 80 kg wt
    </p>
    <MathBlock key="b1-math-wk5">= 80 × 10 N = 800 N &nbsp;&nbsp;(1 kg wt = 10 N)</MathBlock>
    <p key="b1-num-wk-s5b">vertical displacement, <em>s</em> = 100 m</p>
    <p key="b1-num-wk-s5c">Work done by the man, <em>i.e., W = F × s</em> = (800 N)(100 m) = <strong>80000 J</strong></p>
  </NumericalSection>,

  <ProblemsBox key="prob-s33">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>Calculate the work done by a student in lifting 0·5 kg book from the ground and keeping it on a shelf 1·5 m high. <strong>[Ans. 7·5 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A coolie carries a load of 50 kg on his head and walks on a level road upto 100 m. What is the work done by him? <strong>[Ans. zero]</strong></li>
      <li style={{ marginBottom: 6 }}>A crane pulls up a car of mass 500 kg to a vertical height of 4 m. Calculate the work done by the crane. <strong>[Ans. 20000 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A boy of mass 55 kg runs up a flight of 40 stairs, each measuring 0·15 m. Calculate the work done by the boy. <strong>[Ans. 3300 J]</strong></li>
    </ol>
  </ProblemsBox>,

  <div key="b1-solhd-wk" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b1-soln-wk-1" style={{ margin: "0 0 6px" }}><strong>1.</strong> <em>W = Fs</em> = (5 N) × (1·5 m) = <strong>7·5 J</strong> &nbsp;&nbsp;(<em>F</em> = 0·5 kg wt = 0·5 × 10 = 5 N)</p>,
  <p key="b1-soln-wk-2" style={{ margin: "0 0 6px" }}><strong>2.</strong> Work done is <strong>zero</strong> as <em>F</em> (load of 50 kg) and <em>s</em> are perpendicular to each other.</p>,
  <p key="b1-soln-wk-3" style={{ margin: "0 0 6px" }}><strong>3.</strong> <em>W = Fs</em> = (5000 N) × (4 m) = <strong>20000 J</strong> &nbsp;&nbsp;(<em>F</em> = 500 kg wt = 500 × 10 = 5000 N)</p>,
  <p key="b1-soln-wk-4" style={{ margin: "0 0 18px" }}><strong>4.</strong> <em>W = Fs</em> = (550 N)(6 m) = <strong>3300 J</strong> &nbsp;&nbsp;(<em>F</em> = 55 kg wt = 550 N, <em>s</em> = 40 × 0·15 m = 6 m)</p>,

  <SecHd key="sec-s34" id="s34" label="3.4" title="Energy" />,
  <p key="b1-p-s34-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We shall be repeatedly dealing with the term <strong><em>energy.</em></strong> It is undoubtedly one of the most important physical concepts. It is important because it represents a physical entity common to all forms of matter in all parts of the known physical world. In fact, life is impossible without energy. We use energy to do work and make all movements. When we eat, our bodies transform the food into energy to do work. When we run or walk or do some physical work, we use energy. Cars, planes, trains and various machines transform energy into work. Energy lights our cities, moves our vehicles and runs the wheels of industry. It also warms and cools our homes and places of work, cooks our food, plays our music and entertains us through television. Where do we get all this energy from? In fact, most of our energy needs are met by the Sun. We also derive energy from the Earth (geothermal energy), from wind (wind energy), from tides in the oceans (ocean energy), from water (hydro-energy), from biomass (biomass energy), from nuclei of atoms (nuclear energy) etc.
  </p>,
  <SubHd key="sub-s34-sci" id="s34-sci" label="" title="Scientific Conception of Energy" />,
  <p key="b1-p-s34-2" style={{ textIndent: 28, textAlign: "justify" }}>
    In science, the term energy has a much more precise and definite meaning as is clear from the following examples.
  </p>,
  <p key="b1-p-s34-3" style={{ marginLeft: 20 }}>
    <strong>(<em>i</em>)</strong> A man or a horse does work when they pull a load.<br />
    <strong>(<em>ii</em>)</strong> A moving body can set other bodies into motion when it collides with them.<br />
    <strong>(<em>iii</em>)</strong> Compressed air in a cylinder causes the motion of the piston in it and thus performs work.<br />
    <strong>(<em>iv</em>)</strong> The main spring of a watch when wound, drives the hands of a watch and as such does work.<br />
    <strong>(<em>v</em>)</strong> A raised hammer drives the nail into a piece of wood when it strikes the head of the nail and in the process performs work.<br />
    <strong>(<em>vi</em>)</strong> A fast wind does work by setting the blades of the windmill into motion.
  </p>,
  <p key="b1-p-s34-4" style={{ textIndent: 28, textAlign: "justify" }}>
    We can cite many such examples where we find that an object acquires the capacity to perform work by different means. In general, <strong><em>anybody, whether animate or inanimate, which is able to perform work, is said to possess energy.</em></strong> Thus,
  </p>,
  <DefBox key="def-s34-1">
    <strong>Energy</strong> of an object is defined as its capacity for doing work and it is measured by the total quantity of work it can do.
  </DefBox>,
  <p key="b1-p-s34-5" style={{ textAlign: "justify" }}>
    In short, energy is the <strong>ability</strong> to do work or energy is <strong>stored work.</strong>
  </p>,
  <p key="b1-p-s34-6" style={{ textIndent: 28, textAlign: "justify" }}>
    When an object does work, its energy decreases. On the other hand, if work is done on the object, its energy increases. This means that <strong><em>there is always a transfer of energy whenever work is done.</em></strong> Thus, work and energy are related to each other.
  </p>,
  <SubHd key="sub-s34-how" id="s34-how" label="" title="How does an object possessing energy perform work?" />,
  <p key="b1-p-s34-7" style={{ textIndent: 28, textAlign: "justify" }}>
    An object (A) that possesses energy can exert a force on another object (B) and transfer its energy to B. As a result of this, the object (B) may move and do some work. Thus, the object (A) which made the object (B) move and perform some work, had a capacity to do work. Thus, <strong><em>any object that possesses energy is capable of doing work.</em></strong>
  </p>,
  <SubHd key="sub-s34-units" id="s34-units" label="" title="Units of energy" />,
  <p key="b1-p-s34-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Since the energy possessed by a body is measured in terms of its capacity of doing work, the unit of energy is, therefore, the same as that of work, <em>i.e.,</em> <strong>joule (J).</strong>
  </p>,
  <p key="b1-p-s34-9">
    <em>One</em> <strong>joule</strong> <em>(1 J) is the energy required to perform 1J of work.</em><br />
    <strong>Bigger units of energy</strong> are: 1 kJ = 1000 J, &nbsp; 1 MJ = 10<Sup c="6" /> J
  </p>,

  <SecHd key="sec-s35" id="s35" label="3.5" title="Kinetic Energy" />,
  <p key="b1-p-s35-1" style={{ textIndent: 28, textAlign: "justify" }}>
    A moving object is capable of doing work because of its motion. Hence, we say that the object has kinetic energy. <strong>"Kinetikos"</strong> in Greek means <strong>"to move".</strong> Hence, <strong><em>kinetic energy means energy due to motion.</em></strong> The energy is stored in the object when work is done to change its velocity from a lower value to a higher value, or from rest to certain velocity.
  </p>,
  <DefBox key="def-s35-1">
    <strong>Kinetic energy of an object</strong> is defined as the energy which it possesses by virtue of its motion, and is measured by the amount of work that the object can do against an opposing force before it comes to rest.
  </DefBox>,
  <p key="b1-p-s35-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Kinetic energy of an object moving with a certain velocity is equal to the work done on it to enable it to acquire that velocity.
  </p>,
  <SubHd key="sub-s35-ex" id="s35-ex" label="" title="Examples of bodies possessing kinetic energy" />,
  <p key="b1-p-s35-3" style={{ marginLeft: 10 }}>
    <strong>1.</strong> <em>A ball rolling on a surface</em> because it can set another ball into motion by striking it.<br />
    <strong>2.</strong> <em>A bullet fired from a gun</em> as it is able to penetrate some distance into a target which it strikes.<br />
    <strong>3.</strong> <em>A torpedo in motion</em> as it can do work by penetrating into the side of a ship.<br />
    <strong>4.</strong> <em>Water in motion</em> as it can turn a wheel or a turbine.<br />
    <strong>5.</strong> <em>A fast wind</em> as it can set a boat in motion when striking against its sail.<br />
    <strong>6.</strong> <em>A moving hammer</em> as it drives a nail into a wall against the resistance offered to it by the wall.<br />
    <strong>7.</strong> <em>A falling body</em> as it can break something on which it falls.
  </p>,

  <SecHd key="sec-s36" id="s36" label="3.6" title="Expression for Kinetic Energy" />,
  <p key="b1-p-s36-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider an object of mass <em>m</em> which is moving with an initial velocity <em>u</em> on a <em>perfectly frictionless surface.</em> Let a <em>constant external force F</em> act on it and produce an acceleration <em>a</em> in it as shown in Fig. 3.3
  </p>,
  <Fig key="fig-3-3"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CDCC4F7BDBB1CEDC3431}
    num="Fig. 3.3" caption="" />,
  <p key="b1-p-s36-2" style={{ textAlign: "justify" }}>
    If <em>v</em> is the final velocity of the object after having undergone a displacement <em>s</em>, then from
  </p>,
  <MathBlock key="b1-math-s36-1">
    <em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" /> = 2<em>as</em>, &nbsp;&nbsp;&nbsp;&nbsp; <em>s</em> = <Frac n={<><em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" /></>} d="2a" /> &nbsp;&nbsp;...(1)
  </MathBlock>,
  <p key="b1-p-s36-3">Work done by the force in displacing the body through <em>s</em>, <em>i.e.,</em></p>,
  <MathBlock key="b1-math-s36-2"><em>W = F × s</em> &nbsp;&nbsp;...(2)</MathBlock>,
  <p key="b1-p-s36-4">We know from <strong>Newton's Second Law of Motion,</strong></p>,
  <MathBlock key="b1-math-s36-3"><em>F = ma</em> &nbsp;&nbsp;...(3)</MathBlock>,
  <p key="b1-p-s36-5">From eqns. (1), (2) and (3), we get</p>,
  <MathBlock key="b1-math-s36-4">
    <em>W</em> = (<em>ma</em>) × <Frac n={<>(<em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" />)</>} d="2a" /> = <Frac n={<><em>m</em>(<em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" />)</>} d="2" />
  </MathBlock>,
  <p key="b1-p-s36-6">or</p>,
  <MathBlock key="b1-math-s36-5">
    <strong><em>W</em> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> − <Frac n="1" d="2" /><em>mu</em><Sup c="2" /></strong> &nbsp;&nbsp;...(4)
  </MathBlock>,
  <p key="b1-p-s36-7" style={{ textAlign: "justify" }}>
    If the object is initially at rest, <em>u</em> = 0 and as such from eqn. (4),
  </p>,
  <MathBlock key="b1-math-s36-6">
    <em>W</em> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> &nbsp;&nbsp;...(5)
  </MathBlock>,
  <p key="b1-p-s36-8" style={{ textIndent: 28, textAlign: "justify" }}>
    This work done (W) in enabling the object to acquire a velocity <em>v</em> after starting from rest has not gone waste and is, in fact, stored in the object as its kinetic energy.
  </p>,
  <p key="b1-p-s36-9" style={{ textAlign: "justify", fontStyle: "italic" }}>
    Work stored up in a moving object is called the kinetic energy of the object.
  </p>,
  <p key="b1-p-s36-10">If kinetic energy of an object is denoted by <em>E</em><Sub c="k" />, then</p>,
  <DefBox key="def-s36-1">
    <MathBlock key="b1-math-s36-7">
      <strong><em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /></strong> &nbsp;&nbsp;...(6)
    </MathBlock>
  </DefBox>,
  <p key="b1-p-s36-11" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong><em>Kinetic energy of a moving object</em></strong> is defined as half the product of the mass of the object and the square of the speed of the object.
  </p>,
  <KBBox key="kb-s36">
    <KBHd>NOTE</KBHd>
    <p key="b1-kb-s36-1">
      <strong>1.</strong> Eqn. (4), <em>i.e.,</em> <strong><em>W</em> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> − <Frac n="1" d="2" /><em>mu</em><Sup c="2" /></strong> is called <strong>work-energy theorem.</strong>
    </p>
    <p key="b1-kb-s36-2" style={{ textAlign: "justify" }}>
      Since <em>W</em> is the work done on the object and (<Frac n="1" d="2" /><em>mv</em><Sup c="2" /> − <Frac n="1" d="2" /><em>mu</em><Sup c="2" />) represents the change in its kinetic energy on account of this work done, work-energy theorem states that :
    </p>
    <p key="b1-kb-s36-3" style={{ fontStyle: "italic", textAlign: "justify" }}>
      Net work done by external forces acting on an object is equal to the change in the kinetic energy of the object. It is a very useful theorem for solving numerical problems.
    </p>
    <p key="b1-kb-s36-4" style={{ marginTop: 8 }}>
      <strong>2.</strong> It is clear from eqn. (6), <em>i.e.,</em> <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> that :
    </p>
    <p key="b1-kb-s36-5">
      <strong>(a)</strong> <em>E</em><Sub c="k" /> ∝ <em>m</em>, <em>i.e.,</em> more the mass of an object, more is its kinetic energy, <em>e.g., a railway engine has more kinetic energy than a car when both of them are moving with the same velocity.</em>
    </p>
    <p key="b1-kb-s36-6">
      <strong>(b)</strong> <em>E</em><Sub c="k" /> ∝ <em>v</em><Sup c="2" />, <em>i.e.,</em> more the velocity of an object, more is its kinetic energy, <em>e.g., if the speed of a car is doubled, its kinetic energy becomes</em> (2)<Sup c="2" /> = <strong>4 times its previous value</strong> <em>and the impact caused in case of a collision is more serious.</em>
    </p>
  </KBBox>,

  <NumericalSection key="num-ke" topic="KINETIC ENERGY">
    <p key="b1-num-ke-form" style={{ marginBottom: 8 }}>
      <strong>1.</strong> <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /><br />
      where <em>E</em><Sub c="k" /> is the kinetic energy of a body of mass <em>m</em>, moving with a velocity <em>v</em>.<br />
      If <em>m</em> is in kilogram (kg), <em>v</em> is in metre/second (m/s); <em>E</em><Sub c="k" /> is in joule (J).<br />
      <strong>2.</strong> Work done (<em>W</em>) = change in kinetic energy (<em>E</em><Sub c="k" />) &nbsp;&nbsp;(work-energy theorem)
    </p>
    <MathBlock key="b1-math-ke-form">
      <em>W</em> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> − <Frac n="1" d="2" /><em>mu</em><Sup c="2" /> &nbsp;(when <em>v</em> &gt; <em>u</em>) &nbsp;&nbsp; or &nbsp;&nbsp; <em>W</em> = <Frac n="1" d="2" /><em>mu</em><Sup c="2" /> − <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> &nbsp;(when <em>u</em> &gt; <em>v</em>)
    </MathBlock>

    <p key="b1-num-ke-p1" style={{ marginTop: 10 }}><strong>Problem 1.</strong> How fast should a man of mass 60 kg run so that his kinetic energy is 750 J?</p>
    <p key="b1-num-ke-s1"><strong>Solution.</strong> Here, mass of the man, <em>m</em> = 60 kg; kinetic energy of the man, <em>E</em><Sub c="k" /> = 750 J</p>
    <p key="b1-num-ke-s1b">If <em>v</em> is the velocity of the man, then <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /></p>
    <MathBlock key="b1-math-ke-1">
      or &nbsp; <em>v</em> = <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle" }}>√</span><Frac n={<>2<em>E</em><Sub c="k" /></>} d="m" /> = <span style={{ display: "inline-flex", alignItems: "center", verticalAlign: "middle" }}>√</span><Frac n="2 × 750 J" d="60 kg" /> = <strong>5 m/s</strong>
    </MathBlock>

    <p key="b1-num-ke-p2" style={{ marginTop: 10 }}><strong>Problem 2.</strong> Find the mass of the body which has 5 J of kinetic energy while moving at a speed of 2 m/s.</p>
    <p key="b1-num-ke-s2"><strong>Solution.</strong> Here, kinetic energy of the body, <em>E</em><Sub c="k" /> = 5 J; speed of the body, <em>v</em> = 2 m/s</p>
    <p key="b1-num-ke-s2b">If <em>m</em> is the mass of the body, then <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /></p>
    <MathBlock key="b1-math-ke-2">
      or &nbsp; <em>m</em> = <Frac n={<>2<em>E</em><Sub c="k" /></>} d={<><em>v</em><Sup c="2" /></>} /> = <Frac n="2 × 5 J" d="(2 m/s)²" /> = <strong>2·5 kg</strong>
    </MathBlock>

    <p key="b1-num-ke-p3" style={{ marginTop: 10 }}><strong>Problem 3.</strong> An object of mass 15 kg is moving with a uniform velocity of 4 m/s. What is the kinetic energy possessed by the object?</p>
    <p key="b1-num-ke-s3"><strong>Solution.</strong> Here, mass of the object, <em>m</em> = 15 kg; velocity of the object, <em>v</em> = 4 m/s</p>
    <MathBlock key="b1-math-ke-3">
      Kinetic energy: <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> = <Frac n="1" d="2" />(15 kg)(4 m/s)<Sup c="2" /> = <strong>120 J</strong>
    </MathBlock>

    <p key="b1-num-ke-p4" style={{ marginTop: 10 }}><strong>Problem 4.</strong> A body of mass 5 kg, initially at rest, is subjected to a force of 20 N. What is the kinetic energy acquired by the body at the end of 10 s?</p>
    <p key="b1-num-ke-s4"><strong>Solution.</strong> Here, mass of the body, <em>m</em> = 5 kg; initial velocity <em>u</em> = 0; force <em>F</em> = 20 N; time <em>t</em> = 10 s</p>
    <MathBlock key="b1-math-ke-4a">
      <em>a</em> = <Frac n="F" d="m" /> = <Frac n="20 N" d="5 kg" /> = 4 m/s<Sup c="2" />
    </MathBlock>
    <p key="b1-num-ke-s4b">Let <em>v</em> be the velocity of the body after 10 s.</p>
    <MathBlock key="b1-math-ke-4b"><em>v</em> = <em>u</em> + <em>at</em> = 0 + (4 m/s<Sup c="2" />)(10 s) = 40 m/s</MathBlock>
    <MathBlock key="b1-math-ke-4c">
      <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> = <Frac n="1" d="2" />(5 kg)(40 m/s)<Sup c="2" /> = <strong>4000 J</strong>
    </MathBlock>

    <p key="b1-num-ke-p5" style={{ marginTop: 10 }}><strong>Problem 5.</strong> What is the work done to increase the velocity of a car from 30 km/h to 60 km/h if the mass of the car is 1500 kg?</p>
    <p key="b1-num-ke-s5"><strong>Solution.</strong> Here,</p>
    <MathBlock key="b1-math-ke-5a">
      <em>u</em> = 30 km/h = <Frac n="25" d="3" /> m/s, &nbsp;&nbsp; <em>v</em> = 60 km/h = <Frac n="50" d="3" /> m/s, &nbsp;&nbsp; <em>m</em> = 1500 kg
    </MathBlock>
    <p key="b1-num-ke-s5b">According to work-energy theorem,</p>
    <MathBlock key="b1-math-ke-5b">
      <em>W</em> = <Frac n="1" d="2" /><em>m</em>(<em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" />) = <Frac n="1" d="2" /> × 1500 kg [(<Frac n="50" d="3" /> m/s)<Sup c="2" /> − (<Frac n="25" d="3" /> m/s)<Sup c="2" />]
    </MathBlock>
    <MathBlock key="b1-math-ke-5c">
      = 750 kg × [(<Frac n="2500" d="9" /> − <Frac n="625" d="9" />) (m/s)<Sup c="2" />] = 750 kg × 208·33 (m/s)<Sup c="2" /> = <strong>156250 J</strong>
    </MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s36">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A bullet of mass 0·03 kg moving with a speed of 400 m/s penetrates 12 cm into fixed block of wood. Calculate the average force exerted by the wood on the bullet. <strong>[Ans. 2 × 10<Sup c="4" /> N]</strong></li>
      <li style={{ marginBottom: 6 }}>A bullet of mass 5 g travels with a speed of 500 m/s. If it penetrates a fixed target which offers a constant resistive force of 1000 N to the motion of the bullet, find (a) the initial kinetic energy of the bullet (b) the distance through which the bullet has penetrated. <strong>[Ans. (a) 625 J (b) 0·625 m]</strong></li>
      <li style={{ marginBottom: 6 }}>Two bodies of equal masses move with uniform velocities <em>v</em> and 3<em>v</em> respectively. Find the ratio of their kinetic energies. <strong>[Ans. 9 : 1]</strong></li>
      <li style={{ marginBottom: 6 }}>The mass of a ball A is double the mass of another ball B. The ball A moves at half the speed of the ball B. Calculate the ratio of the kinetic energy of A to the kinetic energy of B. <strong>[Ans. 1 : 2]</strong></li>
      <li style={{ marginBottom: 6 }}>A truck weighing 5000 kg f and a cart weighing 500 kg f are moving with the same speed. Compare their kinetic energies. <strong>[Ans. 10 : 1]</strong></li>
      <li style={{ marginBottom: 6 }}>A bullet of mass 20 g is found to pass two points 30 m apart in 4 s? Assuming the speed to be constant, find its kinetic energy. <strong>[Ans. 0·5625 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A person pushes a 72 kg patient on a 15 kg trolley, producing an acceleration of 0·60 m/s<Sup c="2" />. (a) How much work does the person do by pushing the patient and the trolley through a distance of 2·5 m? Assume the trolley moves without friction. (b) How far must the person push the trolley to do 140 J of work. (c) Does the work done by the person depend on the speed of the trolley? <strong>[Ans. (a) 130 J (b) 2·7 m]</strong></li>
      <li style={{ marginBottom: 6 }}>A truck moving at 15 m/s has a KE of 4·2 × 10<Sup c="5" /> J. (a) What is the mass of the truck? (b) By what multiplicative factor does the kinetic energy of the truck increase if its speed is doubled? <strong>[Ans. 3733 kg]</strong></li>
      <li style={{ marginBottom: 6 }}>How much work is required for a 74 kg sprinter to accelerate from rest to 2·2 m/s? <strong>[Ans. 179 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A woman lifts a box weighing 40 N from the floor to a shelf 1·5 m above. (a) Find the work done by the force (F) the woman exerts on the box. (b) Find the work done on the box by its own weight (w). (c) Find the net work done on the box. <strong>[Ans. (a) 60 J (b) −60 J (c) 0]</strong></li>
      <li style={{ marginBottom: 6 }}>The force exerted by a certain bow on an arrow decreases linearly after the arrow is released, starting with F = 275 N when the bow is fully drawn and decreasing to F = 0 as the arrow leaves the bow string. The tail of the arrow moves a distance of 0·5 m as the arrow is shot. Find the final speed of the arrow, which has a mass of 3 × 10<Sup c="−2" /> kg. <strong>[Ans. 67·7 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>Tarzan, who weighs 875 N, swings from a vine through the jungle. How much work is done by the vine as he drops through a vertical distance of 4 m? <strong>[Ans. 0]</strong></li>
    </ol>
  </ProblemsBox>,

  <div key="b1-solhd-ke" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b1-soln-ke-1" style={{ margin: "0 0 6px" }}><strong>1.</strong> <em>m</em> = 0·03 kg, <em>u</em> = 400 m/s, <em>v</em> = 0, <em>s</em> = 12 cm = 0·12 m<br />
    <em>W</em> = <Frac n="1" d="2" /><em>mu</em><Sup c="2" /> = <Frac n="1" d="2" />(0·03 kg)(400 m/s)<Sup c="2" /> = 2400 J<br />
    As <em>W = Fs</em>, <em>F</em> = <Frac n="2400 J" d="0·12 m" /> = 20000 N = <strong>2 × 10<Sup c="4" /> N</strong></p>,
  <p key="b1-soln-ke-2" style={{ margin: "0 0 6px" }}><strong>2.</strong> (a) <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> = <Frac n="1" d="2" />(0·005 kg)(500 m/s)<Sup c="2" /> = <strong>625 J</strong><br />
    (b) As <em>W = E</em><Sub c="k" /> = <em>Fs</em>, <em>s</em> = <Frac n="625 J" d="1000 N" /> = <strong>0·625 m</strong></p>,
  <p key="b1-soln-ke-3" style={{ margin: "0 0 6px" }}><strong>3.</strong> <em>E</em><Sub c="k1" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" />, <em>E</em><Sub c="k2" /> = <Frac n="1" d="2" /><em>m</em>(3<em>v</em>)<Sup c="2" /> = 9(<Frac n="1" d="2" /><em>mv</em><Sup c="2" />), thus ratio = <strong>9 : 1</strong></p>,
  <p key="b1-soln-ke-4" style={{ margin: "0 0 6px" }}><strong>4.</strong> KE ratio = <Frac n={<><Frac n="1" d="2" />(2<em>m</em>)<em>v</em><Sup c="2" /></>} d={<><Frac n="1" d="2" /><em>m</em>(2<em>v</em>)<Sup c="2" /></>} /> = <Frac n={<><em>mv</em><Sup c="2" /></>} d={<>2<em>mv</em><Sup c="2" /></>} /> = <Frac n="1" d="2" /> = <strong>1 : 2</strong></p>,
  <p key="b1-soln-ke-5" style={{ margin: "0 0 6px" }}><strong>5.</strong> <Frac n="KE of truck" d="KE of cart" /> = <Frac n="m₁" d="m₂" /> = <Frac n="5000 kg f" d="500 kg f" /> = 10 = <strong>10 : 1</strong></p>,
  <p key="b1-soln-ke-6" style={{ margin: "0 0 6px" }}><strong>6.</strong> <em>v</em> = 30 m ÷ 4 s = 7·5 m/s; KE = <Frac n="1" d="2" />(0·02 kg)(7·5 m/s)<Sup c="2" /> = <strong>0·5625 J</strong></p>,
  <p key="b1-soln-ke-7" style={{ margin: "0 0 6px" }}><strong>7.</strong> (a) <em>F = ma</em> = (72 + 15)(0·60) = 52 N; <em>W = Fs</em> = (52)(2·5) = <strong>130 J</strong><br />
    (b) <em>s</em> = 140 J ÷ 52 N = <strong>2·7 m</strong><br />
    (c) No, the work done does not depend on whether the object moves quickly or slowly.</p>,
  <p key="b1-soln-ke-8" style={{ margin: "0 0 6px" }}><strong>8.</strong> (a) <em>m</em> = 2K ÷ v<Sup c="2" /> = 2(4·2 × 10<Sup c="5" /> J) ÷ (15 m/s)<Sup c="2" /> = <strong>3733 kg</strong><br />
    (b) Kinetic energy is proportional to speed squared; doubling speed increases KE by factor of <strong>four</strong>.</p>,
  <p key="b1-soln-ke-9" style={{ margin: "0 0 6px" }}><strong>9.</strong> <em>W</em> = <Frac n="1" d="2" />(74 kg)(2·2 m/s)<Sup c="2" /> = <strong>179 J</strong></p>,
  <p key="b1-soln-ke-10" style={{ margin: "0 0 6px" }}><strong>10.</strong> (a) <em>W</em><Sub c="f" /> = (40 N)(1·5 m) = <strong>60 J</strong>; (b) <em>W</em><Sub c="w" /> = −(40 N)(1·5 m) = <strong>−60 J</strong>; (c) Net = <strong>0</strong></p>,
  <p key="b1-soln-ke-11" style={{ margin: "0 0 6px" }}><strong>11.</strong> Average <em>F</em> = (275 + 0) ÷ 2 = 137·5 N; <em>W</em> = (137·5)(0·5) = 68·75 J;<br />
    <em>v</em> = √(2 × 68·75 ÷ 3 × 10<Sup c="−2" />) = <strong>67·7 m/s</strong></p>,
  <p key="b1-soln-ke-12" style={{ margin: "0 0 18px" }}><strong>12.</strong> When Tarzan drops from vine, tension F = 0. Therefore <em>W = F × s</em> = 0 × 4 m = <strong>0</strong>.<br />
    <em>Note:</em> Work is done by the weight of Tarzan.</p>,
];

// ── TABLE SUB-COMPONENTS + CONTENT (batch 2) ─────────────────
const content_b2 = [
  <SecHd key="sec-s37" id="s37" label="3.7" title="Potential Energy" />,
  <p key="b2-p-s37-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The effects of applying a force on an object are many. As discussed earlier, if the force changes the velocity of the object, the work done in doing so is stored up in the object in the form of its kinetic energy. But in case the applied force does not change the velocity of the object but instead changes its position or configuration (shape), the work done by the force gets stored up in the object in another form of energy, called <strong>potential energy.</strong>
  </p>,
  <DefBox key="def-s37-1">
    <em>The energy possessed by an object by virtue of its position or configuration is called its</em> <strong>potential energy.</strong> <em>It is measured by the work that the object can do in passing from its present position or configuration to some standard position or configuration (known as zero position or zero configuration).</em>
  </DefBox>,
  <p key="b2-p-s37-2">Potential energy is also termed as <strong>configuration energy</strong> or <strong>mutual energy.</strong></p>,
  <SubHd key="sub-s37-ex" id="s37-ex" label="" title="Examples of bodies possessing potential energy" />,
  <p key="b2-p-s37-3"><strong>(<em>a</em>) Potential energy due to position</strong></p>,
  <p key="b2-p-s37-4" style={{ marginLeft: 20 }}>
    <strong>(<em>i</em>)</strong> <em>A lifted weight</em> as it can do work when it falls down under gravity.<br />
    <strong>(<em>ii</em>)</strong> <em>Water stored in reservoirs.</em> In Gobind Sagar Lake (Bhakra Dam), huge quantities of water is stored in it. It is the potential energy of this water, which generates electricity for us.
  </p>,
  <p key="b2-p-s37-5"><strong>(<em>b</em>) Potential energy due to configuration</strong></p>,
  <p key="b2-p-s37-6" style={{ marginLeft: 20, textAlign: "justify" }}>
    <strong>(<em>i</em>)</strong> <em>A coiled spring</em> in case of a watch, a toy or a gramophone. When the coiled spring, [Fig. 3.4 (a)] uncoils, [Fig. 3.4 (b)], it does work by rotating the hands of the watch, setting the toy in motion or rotating the gramophone disc.
  </p>,
  <div key="fig-3-4" style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", margin: "12px 0" }}>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6020172254B5196FA2A9} num="" caption="Coiled Spring (a)" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_34FD2265FA092E421CAC} num="Fig. 3.4" caption="Uncoiled Spring (b)" />
  </div>,
  <p key="b2-p-s37-7" style={{ marginLeft: 20 }}>
    <strong>(<em>ii</em>)</strong> <em>Compressed gas in a cylinder.</em> When the compressed gas changes its configuration (<em>i.e.,</em> it expands), it does work.<br />
    <strong>(<em>iii</em>)</strong> <em>A stretched bow.</em> When the bow is released, it is able to shoot the arrow with a large velocity.
  </p>,
  <KBBox key="kb-s37-types">
    <KBHd>NOTE</KBHd>
    <p key="b2-kb-s37">Potential energy is of many types, <em>i.e.,</em></p>
    <p key="b2-kb-s37-2">(<em>i</em>) gravitational potential energy (<em>i.e.,</em> of a lifted weight).</p>
    <p key="b2-kb-s37-3">(<em>ii</em>) elastic potential energy (<em>i.e.,</em> of a coiled spring).</p>
    <p key="b2-kb-s37-4">(<em>iii</em>) electrostatic potential energy (due to charged particles).</p>
  </KBBox>,

  <SecHd key="sec-s38" id="s38" label="3.8" title="Potential Energy of an Object at a Height" />,
  <p key="b2-p-s38-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We know that every object on the surface of the Earth is attracted by the Earth. If an object has a mass <em>m</em>, it will experience a force that is called the <strong>weight</strong> (<em>W = mg</em>) of the object which acts vertically downwards. <em>For all practical purposes, we assume that the value of g remains constant near the surface of the Earth, so that the weight of the object remains constant.</em>
  </p>,
  <p key="b2-p-s38-2" style={{ textAlign: "justify" }}>
    To move this object upwards from A to B through a distance <em>h</em>, we must apply a force F upwards where <em>F = mg</em> as shown in Fig. 3.5.
  </p>,
  <Fig key="fig-3-5"
    src={CONTENT_IMAGES.CONTENT_IMAGE_665C094C73C61D706782}
    num="Fig. 3.5" caption="" />,
  <p key="b2-p-s38-3">Work done by the force F, <em>i.e., W = F h</em></p>,
  <p key="b2-p-s38-4">But as <em>F = mg</em>,</p>,
  <MathBlock key="b2-math-s38-1"><em>W = mgh</em> &nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b2-p-s38-5" style={{ textIndent: 28, textAlign: "justify" }}>
    This work done on the object which changes its position is called the <strong>gravitational potential energy.</strong> Further, <em>this work does not go waste and instead is stored in the object in the form of its potential energy.</em> If the potential energy of the body is denoted by <em>E</em><Sub c="p" />, then
  </p>,
  <MathBlock key="b2-math-s38-2"><em>E</em><Sub c="p" /> = <em>W</em> &nbsp;&nbsp;...(2)</MathBlock>,
  <p key="b2-p-s38-6">From eqns. (1) and (2), we get</p>,
  <DefBox key="def-s38-1">
    <MathBlock key="b2-math-s38-3"><strong><em>E</em><Sub c="p" /> = <em>mgh</em></strong> &nbsp;&nbsp;...(3)</MathBlock>
  </DefBox>,
  <KBBox key="kb-s38-notes">
    <p key="b2-kb-s38-1"><strong>1.</strong> Eqn. (3) is true only if the velocity of the body is constant when work is being done on it so that there is no change in its kinetic energy. In such a case, all the work done will be stored up in the body as gravitational potential energy.</p>
    <p key="b2-kb-s38-2"><strong>2.</strong> In fact, <em>E</em><Sub c="p" /> is not the gravitational potential energy of the body only but of the body-Earth system.</p>
    <p key="b2-kb-s38-3"><strong>3.</strong> <em>E</em><Sub c="p" /> = <em>mgh</em> is valid only if <em>g</em> is constant. This is true near the Earth's surface.</p>
    <p key="b2-kb-s38-4"><strong>4.</strong> The term gravitational potential energy implies that the body has the potential or capacity of gaining kinetic energy when released from some point under gravity.</p>
    <p key="b2-kb-s38-5"><strong>5.</strong> <em>E</em><Sub c="p" /> depends on the ground level (or the zero level) we choose. For example, <em>E</em><Sub c="p" /> of an object lying on the top of a multi-storeyed building is different for different floors.</p>
    <p key="b2-kb-s38-6" style={{ textAlign: "justify" }}><strong>6.</strong> <em>E</em><Sub c="p" /> of an object (<em>i.e.,</em> work done to move it against gravity) <strong>depends on the difference in vertical heights of the initial and final positions of the object and not on the path along which the object is moved.</strong> In Fig. 3.6, an object is raised from A to B through two different paths 1 and 2. In both the cases, the path lengths are different but the height through which the object rises is the same and as such for both the cases, <em>E</em><Sub c="p" /> = <em>mgh</em>. It is due to this reason that gravitational force is called a <em>conservative force.</em></p>
    <Fig key="fig-3-6"
      src={CONTENT_IMAGES.CONTENT_IMAGE_9CA22589C8B70743AAEC}
      num="Fig. 3.6" caption="" />
  </KBBox>,

  <NumericalSection key="num-pe" topic="POTENTIAL ENERGY">
    <p key="b2-num-pe-form" style={{ marginBottom: 8 }}>
      <strong>1.</strong> <em>E</em><Sub c="p" /> = <em>mgh</em><br />
      where <em>E</em><Sub c="p" /> is gravitational potential energy of a body of mass <em>m</em>, at a height <em>h</em> from the zero level.<br />
      If <em>m</em> is in kilogram (kg), <em>g</em> is in metre/second<Sup c="2" /> (m/s<Sup c="2" />), <em>h</em> is metre (m), <em>E</em><Sub c="p" /> is in joule (J).<br />
      <strong>2.</strong> Acceleration due to gravity, <em>g</em> = 10 m/s<Sup c="2" />.
    </p>
    <p key="b2-num-pe-p1"><strong>Problem 1.</strong> Find the energy possessed by an object of mass 10 kg when it is at a height of 6 m above the ground. Given, <em>g</em> = 9·8 m/s<Sup c="2" />.</p>
    <p key="b2-num-pe-s1"><strong>Solution.</strong> Here, mass of the object, <em>m</em> = 10 kg; height above the ground, <em>h</em> = 6 m</p>
    <MathBlock key="b2-math-pe-1"><em>E</em><Sub c="p" /> = <em>mgh</em> = (10 kg)(9·8 m/s<Sup c="2" />)(6 m) = <strong>588 J</strong></MathBlock>

    <p key="b2-num-pe-p2" style={{ marginTop: 10 }}><strong>Problem 2.</strong> A body of mass 4 kg is taken from a height of 5 m to a height 10 m. Find the increase in potential energy.</p>
    <p key="b2-num-pe-s2"><strong>Solution.</strong> Here, mass of the body, <em>m</em> = 4 kg; increase in height <em>h</em> = (10 − 5) m = 5 m</p>
    <MathBlock key="b2-math-pe-2">Increase in <em>E</em><Sub c="p" /> = <em>mgh</em> = (4 kg)(10 m/s<Sup c="2" />)(5 m) = <strong>200 J</strong></MathBlock>
    <p key="b2-num-pe-s2b"><em>Aliter.</em> Initial <em>E</em><Sub c="pi" /> = (4)(10)(5) = 200 J; Final <em>E</em><Sub c="pf" /> = (4)(10)(10) = 400 J; Increase = 400 − 200 = <strong>200 J</strong></p>

    <p key="b2-num-pe-p3" style={{ marginTop: 10 }}><strong>Problem 3.</strong> An object of mass 12 kg is at a certain height above the ground. If the potential energy of the object is 480 J, find the height at which the object is with respect to the ground. Given, <em>g</em> = 10 m/s<Sup c="2" />.</p>
    <p key="b2-num-pe-s3"><strong>Solution.</strong> Here, <em>m</em> = 12 kg, <em>E</em><Sub c="p" /> = 480 J</p>
    <MathBlock key="b2-math-pe-3">As <em>E</em><Sub c="p" /> = <em>mgh</em>, &nbsp; <em>h</em> = <Frac n={<><em>E</em><Sub c="p" /></>} d="mg" /> = <Frac n="480 J" d="(12 kg)(10 m/s²)" /> = <strong>4 m</strong></MathBlock>

    <p key="b2-num-pe-p4" style={{ marginTop: 10 }}><strong>Problem 4.</strong> A 5 kg ball is thrown upwards with a speed of 10 m/s. (a) Find the potential energy when it reaches the highest point. (b) Calculate the maximum height attained by it.</p>
    <p key="b2-num-pe-s4a"><strong>Solution.</strong> (a) Here, <em>m</em> = 5 kg, <em>v</em> = 10 m/s</p>
    <MathBlock key="b2-math-pe-4a"><em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> = <Frac n="1" d="2" />(5 kg)(10 m/s)<Sup c="2" /> = 250 J</MathBlock>
    <p key="b2-num-pe-s4b">When the ball reaches the highest point, its kinetic energy becomes zero as the entire KE is converted into PE, <em>i.e.,</em></p>
    <MathBlock key="b2-math-pe-4b"><em>E</em><Sub c="p" /> = <strong>250 J</strong> &nbsp;&nbsp;...(i)</MathBlock>
    <p key="b2-num-pe-s4c">(b) If <em>h</em> is the maximum height, <em>E</em><Sub c="p" /> = <em>mgh</em> &nbsp;...(ii)</p>
    <MathBlock key="b2-math-pe-4c">From (i) and (ii): <em>mgh</em> = 250 J &nbsp; or &nbsp; <em>h</em> = <Frac n="250 J" d="mg" /> = <Frac n="250 J" d="(5 kg)(10 m/s²)" /> = <strong>5 m</strong></MathBlock>

    <p key="b2-num-pe-p5" style={{ marginTop: 10 }}><strong>Problem 5.</strong> A 5 kg ball is dropped from a height of 10 m. (a) Find the initial potential energy of the ball. (b) Find the kinetic energy just before it reaches the ground and (c) Calculate the velocity before it reaches the ground.</p>
    <p key="b2-num-pe-s5"><strong>Solution.</strong> Here, <em>m</em> = 5 kg, <em>h</em> = 10 m</p>
    <p key="b2-num-pe-s5a">(a) Initial PE of the ball:</p>
    <MathBlock key="b2-math-pe-5a"><em>E</em><Sub c="p" /> = <em>mgh</em> = (5 kg)(10 m/s<Sup c="2" />)(10 m) = <strong>500 J</strong></MathBlock>
    <p key="b2-num-pe-s5b">(b) When the ball reaches the ground, its PE becomes zero as it is entirely converted into KE, <em>i.e., E</em><Sub c="k" /> = <strong>500 J</strong></p>
    <p key="b2-num-pe-s5c">(c) If <em>v</em> is the velocity attained by the ball before reaching the ground,</p>
    <MathBlock key="b2-math-pe-5c">
      <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> &nbsp; or &nbsp; <em>v</em> = <span style={{ verticalAlign: "middle" }}>√</span><Frac n={<>2<em>E</em><Sub c="k" /></>} d="m" /> = <span style={{ verticalAlign: "middle" }}>√</span><Frac n="2 × 500 J" d="5 kg" /> = <strong>14·14 m/s</strong>
    </MathBlock>

    <p key="b2-num-pe-p6" style={{ marginTop: 10 }}><strong>Problem 6.</strong> A body is thrown up with a kinetic energy of 10 J. If it attains a maximum height of 5 m, find the mass of the body.</p>
    <p key="b2-num-pe-s6"><strong>Solution.</strong> <em>E</em><Sub c="k" /> = 10 J, <em>h</em> = 5 m. At maximum height, <em>E</em><Sub c="p" /> = <em>E</em><Sub c="k" /></p>
    <MathBlock key="b2-math-pe-6"><em>mgh</em> = 10 J &nbsp; or &nbsp; <em>m</em> = <Frac n="10 J" d="gh" /> = <Frac n="10 J" d="(10 m/s²)(5 m)" /> = <strong>0·2 kg</strong></MathBlock>

    <p key="b2-num-pe-p7" style={{ marginTop: 10 }}><strong>Problem 7.</strong> A rocket of mass 3 × 10<Sup c="6" /> kg takes off from a launching pad and acquires a vertical velocity of 1 km/s and an altitude of 25 km. Calculate its (a) potential energy (b) kinetic energy.</p>
    <p key="b2-num-pe-s7"><strong>Solution.</strong> <em>m</em> = 3 × 10<Sup c="6" /> kg, <em>v</em> = 1 km/s = 1000 m/s, <em>h</em> = 25 km = 25000 m</p>
    <p key="b2-num-pe-s7a">(a) Potential energy: <em>E</em><Sub c="p" /> = <em>mgh</em> = (3 × 10<Sup c="6" />)(10)(25000) = <strong>7·5 × 10<Sup c="11" /> J</strong></p>
    <p key="b2-num-pe-s7b">(b) Kinetic energy: <em>E</em><Sub c="k" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> = <Frac n="1" d="2" />(3 × 10<Sup c="6" />)(1000)<Sup c="2" /> = <strong>1·5 × 10<Sup c="12" /> J</strong></p>
  </NumericalSection>,

  <ProblemsBox key="prob-s38">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A block of mass 30 kg is pulled up by a rope as shown in Fig. 3.7 with a constant speed by applying a force of 200 N parallel to the slope. A and B are the initial and the final positions of the block. Calculate: (a) the work done by the force in moving the block from A to B, (b) the potential energy gained by the block, (c) account for the difference in work done by the force and the increase in potential energy of the block.
        <Fig key="fig-3-7" src={CONTENT_IMAGES.CONTENT_IMAGE_02A022E8BC1715AE41DF} num="Fig. 3.7" caption="" />
        <strong>[Ans. (a) 600 J (b) 450 J (c) the difference in work done is converted into heat]</strong></li>
      <li style={{ marginBottom: 6 }}>Fig. 3.8 shows a ski-jump. A skier of mass 60 kg stands at A at the top of the ski-jump. He moves from A to B and takes off for his jump at B. (a) Calculate the change in the gravitational potential energy of the skier between A and B. (b) If 75% of the energy in part (a) becomes the kinetic energy at B, calculate the speed at which the skier arrives at B.
        <Fig key="fig-3-8" src={CONTENT_IMAGES.CONTENT_IMAGE_BD979875AD788BAA4236} num="Fig. 3.8" caption="" />
        <strong>[Ans. (a) 36 × 10<Sup c="3" /> J (b) 30 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>Calculate the increase in potential energy as a block of 2 kg is lifted through 2 m. <strong>[Ans. 40 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A ball of mass 1 kg is dropped from a height of 5 m. (a) Find the kinetic energy of the ball just before it reaches the ground (b) What is the speed at this instant? <strong>[Ans. (a) 50 J (b) 10 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>A body of mass 5 kg falls from a height of 5 m. How much energy does it possess at any instant? <strong>[Ans. 250 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A spring is compressed by a toy cart of mass 150 g. On releasing the cart, it moves with a speed of 0·2 m/s. Calculate the elastic potential energy of the spring. <strong>[Ans. 3 × 10<Sup c="−3" /> J]</strong></li>
    </ol>
  </ProblemsBox>,

  <div key="b2-solhd-pe" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b2-soln-pe-1" style={{ margin: "0 0 6px" }}><strong>1.</strong> (a) <em>W = Fs</em> = (200 N)(3 m) = <strong>600 J</strong><br />
    (b) <em>E</em><Sub c="p" /> = <em>mgh</em> = (30)(10)(1·5) = <strong>450 J</strong><br />
    (c) The difference (600 − 450 = 150 J) is used in doing work against friction; this energy is converted into heat.</p>,
  <p key="b2-soln-pe-2" style={{ margin: "0 0 6px" }}><strong>2.</strong> <em>m</em> = 60 kg, <em>h</em> = 75 − 15 = 60 m<br />
    (a) <em>E</em><Sub c="p" /> = (60)(10)(60) = <strong>36 × 10<Sup c="3" /> J</strong><br />
    (b) <em>E</em><Sub c="k" /> = 75% × 36 × 10<Sup c="3" /> = 27 × 10<Sup c="3" /> J; <em>v</em> = √(2 × 27 × 10<Sup c="3" /> ÷ 60) = <strong>30 m/s</strong></p>,
  <p key="b2-soln-pe-3" style={{ margin: "0 0 6px" }}><strong>3.</strong> <em>E</em><Sub c="p" /> = (2)(10)(2) = <strong>40 J</strong></p>,
  <p key="b2-soln-pe-4" style={{ margin: "0 0 6px" }}><strong>4.</strong> (a) <em>E</em><Sub c="k" /> = <em>mgh</em> = (1)(10)(5) = <strong>50 J</strong>; (b) <em>v</em> = √(2 × 50 ÷ 1) = <strong>10 m/s</strong></p>,
  <p key="b2-soln-pe-5" style={{ margin: "0 0 6px" }}><strong>5.</strong> Energy at any instant = <em>E</em><Sub c="p" /> = (5)(10)(5) = <strong>250 J</strong></p>,
  <p key="b2-soln-pe-6" style={{ margin: "0 0 18px" }}><strong>6.</strong> Elastic PE = KE = <Frac n="1" d="2" />(0·150)(0·2)<Sup c="2" /> = <strong>3 × 10<Sup c="−3" /> J</strong></p>,

  <SecHd key="sec-s39" id="s39" label="3.9" title="Forms of Energy" />,
  <p key="b2-p-s39-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Nature has been very kind to us in providing us energy in various forms. These forms of energy are as follows.
  </p>,
  <p key="b2-p-s39-list" style={{ marginLeft: 10 }}>
    <strong>1. Solar energy.</strong> The energy radiated by the Sun is called solar energy. Plants collect and store this energy to make food through photosynthesis.<br /><br />
    <strong>2. Heat energy.</strong> It is the energy released when coal, oil, gas or wood burn and it produces in us the sensation of warmth.<br /><br />
    <strong>3. Light energy.</strong> It is the form of energy which produces in us the sensation of sight. Sun is the natural source of light.<br /><br />
    <strong>4. Chemical energy.</strong> It is the energy possessed by fossil fuels (coal, petroleum and natural gas) and is also called the <strong><em>fuel energy.</em></strong> The food that we eat has chemical energy stored in it.<br /><br />
    <strong>5. Hydro energy.</strong> The energy possessed by water flowing in rivers and streams is called hydro energy. This energy is used to generate electricity in hydroelectric power plants.<br /><br />
    <strong>6. Wind energy.</strong> The energy possessed by moving air is called wind energy.<br /><br />
    <strong>7. Ocean thermal energy (OTE).</strong> Solar energy stored in the oceans in the form of heat is called ocean thermal energy.<br /><br />
    <strong>8. Geothermal energy.</strong> It is the heat energy of the Earth and is found within rock formations and the fluids held within those formations.<br /><br />
    <strong>9. Biomass energy.</strong> It is the energy obtained from biomass (<em>i.e.,</em> living matter or its residues).<br /><br />
    <strong>10. Tidal energy.</strong> It is the energy derived from the rising and falling ocean tides.<br /><br />
    <strong>11. Sound energy.</strong> It is the energy possessed by vibrating objects and it produces in us the sensation of hearing.<br /><br />
    <strong>12. Mechanical energy.</strong> It is the energy possessed by a body due to its position (or configuration) or motion. The energy possessed due to position or configuration is called potential energy and that due to motion is called kinetic energy. The sum of these two energies is called the mechanical energy.<br /><br />
    <strong>13. Electric energy.</strong> The energy possessed by charges (either at rest or in motion) is called electric energy.<br /><br />
    <strong>14. Magnetic energy.</strong> It is the energy possessed by magnetised bodies <em>e.g.</em> a magnet.<br /><br />
    <strong>15. Electromagnetic energy.</strong> It is the general name for electric and magnetic energies.<br /><br />
    <strong>16. Nuclear energy.</strong> The energy produced in the processes of fission and fusion is called nuclear energy.
  </p>,

  <SecHd key="sec-s310" id="s310" label="3.10" title="Energy Transformations" />,
  <p key="b2-p-s310-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We have discussed various forms of energy available to us. Can we convert energy from one form to another? The answer is in the affirmative as is clear from the following examples.
  </p>,
  <p key="b2-p-s310-list" style={{ marginLeft: 10 }}>
    <strong>1. Conversion of mechanical energy into electrical energy.</strong> The potential energy of water stored in a dam is changed to kinetic energy when it falls from a height. This kinetic energy rotates a turbine to produce electric energy.<br /><br />
    <strong>2. Conversion of electrical energy into mechanical energy.</strong> An electric motor uses electrical energy to run various electrical appliances, <em>e.g.,</em> a train, a fan, washing machine, mixer, grinder etc.<br /><br />
    <strong>3. Conversion of electrical energy into heat energy.</strong> In an electric heater, a geyser, a toaster, an oven etc., electric energy is changed to heat energy.<br /><br />
    <strong>4. Conversion of heat energy into mechanical energy.</strong> In heat engines (<em>e.g.,</em> a steam engine), heat energy changes to mechanical energy.<br /><br />
    <strong>5. Conversion of electrical energy into light energy.</strong> In an electric bulb, a fluorescent tube, a flood light etc., electrical energy is changed to light energy.<br /><br />
    <strong>6. Conversion of electric energy into sound energy.</strong> An electric bell, a stereo, a loudspeaker etc., change electric energy into sound energy.<br /><br />
    <strong>7. Conversion of chemical energy into heat energy.</strong> When fuels are burnt, chemical energy gets converted into heat energy.<br /><br />
    <strong>8. Conversion of electrical energy into chemical energy.</strong> When a battery is charged, electrical energy changes into chemical energy. An inverter in our home does the same thing.<br /><br />
    <strong>9. Conversion of sound energy to electrical energy.</strong> A microphone converts sound energy into electrical energy.<br /><br />
    <strong>10. Conversion of chemical energy to electrical energy.</strong> An electric cell converts chemical energy into electrical energy.<br /><br />
    <strong>11. Conversion of light energy into electric energy.</strong> A solar cell converts light energy into electrical energy.<br /><br />
    <strong>12. Conversion of chemical energy into mechanical energy.</strong> In automobiles, chemical energy of petrol, diesel or CNG (compressed natural gas) is converted into mechanical energy.<br /><br />
    <strong>13. Conversion of light energy into chemical energy.</strong> In photosynthesis, light energy from the Sun is absorbed by green plants and is converted to chemical energy.<br /><br />
    <strong>14. Conversion of nuclear energy into electrical energy.</strong> Nuclear power plants are used to generate electrical energy from nuclear energy.
  </p>,
  <KBBox key="kb-s310">
    <KBHd>NOTE</KBHd>
    <p key="b2-kb-s310-1"><strong>1.</strong> Whenever mechanical energy changes to other forms, it is always in the form of kinetic energy and not in the form of potential energy, <em>i.e.,</em> potential energy first changes into kinetic energy and then kinetic energy changes into other forms.</p>
    <p key="b2-kb-s310-2"><strong>2.</strong> <em>What would have happened if nature had not allowed the transformation of energy?</em> Obviously, life would not have been possible. To run life we need energy in its various forms to enable us to walk, talk, hear, see, think, to travel different places etc.</p>
  </KBBox>,

  <SecHd key="sec-s311" id="s311" label="3.11" title="Law of Conservation of Energy" />,
  <p key="b2-p-s311-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We have just discussed various examples of transformation of energy from one form to another. In all such cases, energy in one form disappears and reappears in another form. But in no case energy is destroyed or any form of energy appears of its own without the loss of some other form. Wherever measurement is possible, we have been able to prove that the loss of energy of one system is exactly equal to the gain in energy of the other system. Thus, we conclude that energy is conserved. This conclusion is called the law of conservation of energy and may be stated as follows.
  </p>,
  <DefBox key="def-s311-1">
    <em>Energy can only be converted from one form to the other; it can neither be created nor destroyed and as such the total energy in this Universe remains constant.</em>
  </DefBox>,
  <p key="b2-p-s311-2" style={{ textIndent: 28, textAlign: "justify" }}>
    This law is true for all situations and for all kinds of transformations. There is no general proof of this law but it has been verified in many cases and as such is accepted as true. This law was first stated by <strong>Robert Mayor,</strong> a German physicist in 1842 and was firmly established by <strong><em>Helmholtz.</em></strong>
  </p>,
  <KBBox key="kb-s311">
    <KBHd>NOTE</KBHd>
    <p key="b2-kb-s311" style={{ textAlign: "justify" }}>
      <em>Lavoisier</em> in 1774 stated that matter can neither be created nor destroyed. This was called the <em>law of conservation of mass.</em> But according to <strong>Albert Einstein,</strong> mass can be converted into energy and vice versa. Thus, the law of conservation of mass and the law of conservation of energy have become one, which is now referred to as the <strong><em>law of conservation of mass-energy.</em></strong> Einstein has written:<br /><br />
      "Pre-relativity physics contains two conservation laws of fundamental importance, namely the law of conservation of mass and the law of conservation of energy, these two appear there as completely independent of each other. Through relativity theory, they melt together into one principle."
    </p>
  </KBBox>,

  <SecHd key="sec-s312" id="s312" label="3.12" title="Law of Conservation of Mechanical Energy in Case of a Freely Falling Body" />,
  <DefBox key="def-s312-1">
    The sum of the kinetic energy and the potential energy of an object is called its <strong>total mechanical energy.</strong>
  </DefBox>,
  <p key="b2-p-s312-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us consider a body of mass <em>m</em> placed at A as shown in Fig. 3.9.
  </p>,
  <p key="b2-p-s312-2" style={{ marginLeft: 20 }}>
    Let <em>h = AB</em> = height of the body above the ground<br />
    <em>s</em> = distance of any point C from A<br />
    <em>g</em> = acceleration due to gravity at the place<br />
    <em>v</em><Sub c="1" /> = velocity of the body at C<br />
    <em>v</em> = velocity of the body at B, a point just above the ground.<br />
    The velocity at the point A is zero, <em>i.e., u</em> = 0.
  </p>,
  <Fig key="fig-3-9"
    src={CONTENT_IMAGES.CONTENT_IMAGE_36A8161C8890B00E4B93}
    num="Fig. 3.9" caption="" />,
  <p key="b2-p-s312-3"><strong>(<em>i</em>) At the point A.</strong></p>,
  <p key="b2-p-s312-4" style={{ marginLeft: 20 }}>
    Potential energy at A, <em>i.e., E</em><Sub c="pA" /> = <em>mgh</em><br />
    Kinetic energy at A, <em>i.e., E</em><Sub c="kA" /> = 0<br />
    Total mechanical energy at A, <em>i.e., E</em><Sub c="A" /> = <em>E</em><Sub c="pA" /> + <em>E</em><Sub c="kA" /> = <em>mgh</em> + 0 = <em>mgh</em> &nbsp;&nbsp;...(1)
  </p>,
  <p key="b2-p-s312-5"><strong>(<em>ii</em>) At the point C.</strong> When the body moves from A to C, it covers a distance <em>s</em>. If <em>v</em><Sub c="1" /> is the velocity at C, then from</p>,
  <MathBlock key="b2-math-s312-1">
    <em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" /> = 2<em>as</em>, &nbsp; we get &nbsp; <em>v</em><Sub c="1" /><Sup c="2" /> − 0 = 2<em>gs</em> &nbsp; (<em>v</em> = <em>v</em><Sub c="1" />, <em>u</em> = 0, <em>a</em> = <em>g</em>)
  </MathBlock>,
  <MathBlock key="b2-math-s312-2">or &nbsp; <em>v</em><Sub c="1" /><Sup c="2" /> = 2<em>gs</em></MathBlock>,
  <MathBlock key="b2-math-s312-3">
    Kinetic energy at C: <em>E</em><Sub c="kC" /> = <Frac n="1" d="2" /><em>mv</em><Sub c="1" /><Sup c="2" /> = <Frac n="1" d="2" /><em>m</em>(2<em>gs</em>) = <em>mgs</em>
  </MathBlock>,
  <MathBlock key="b2-math-s312-4">Potential energy at C: <em>E</em><Sub c="pC" /> = <em>mg</em>(<em>h</em> − <em>s</em>)</MathBlock>,
  <MathBlock key="b2-math-s312-5">
    Total mechanical energy at C: <em>E</em><Sub c="C" /> = <em>E</em><Sub c="pC" /> + <em>E</em><Sub c="kC" /> = <em>mg</em>(<em>h</em> − <em>s</em>) + <em>mgs</em> = <em>mgh</em> &nbsp;&nbsp;...(2)
  </MathBlock>,
  <p key="b2-p-s312-6"><strong>(<em>iii</em>) At the point B.</strong></p>,
  <MathBlock key="b2-math-s312-6">
    From <em>v</em><Sup c="2" /> − <em>u</em><Sup c="2" /> = 2<em>as</em>: &nbsp; <em>v</em><Sup c="2" /> − 0 = 2<em>gh</em> &nbsp; or &nbsp; <em>v</em><Sup c="2" /> = 2<em>gh</em>
  </MathBlock>,
  <MathBlock key="b2-math-s312-7">
    Kinetic energy at B: <em>E</em><Sub c="kB" /> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" /> = <Frac n="1" d="2" /><em>m</em>(2<em>gh</em>) = <em>mgh</em>
  </MathBlock>,
  <MathBlock key="b2-math-s312-8">
    Potential energy at B: <em>E</em><Sub c="pB" /> = 0
  </MathBlock>,
  <MathBlock key="b2-math-s312-9">
    Total mechanical energy at B: <em>E</em><Sub c="B" /> = <em>E</em><Sub c="kB" /> + <em>E</em><Sub c="pB" /> = <em>mgh</em> + 0 = <em>mgh</em> &nbsp;&nbsp;...(3)
  </MathBlock>,
  <MathBlock key="b2-math-s312-10">From eqns. (1), (2) and (3): &nbsp; <strong><em>E</em><Sub c="A" /> = <em>E</em><Sub c="B" /> = <em>E</em><Sub c="C" /></strong></MathBlock>,
  <p key="b2-p-s312-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Clearly, the total mechanical energy of the body at A, B and C (also at any other point in the path AB) is the same. Thus, we find that <strong><em>the total mechanical energy of the body throughout the free fall is conserved.</em></strong> As the body falls down, the potential energy goes on decreasing whereas the kinetic energy goes on increasing. We have neglected the effect of air resistance on the motion of the body.
  </p>,
  <KBBox key="kb-s312">
    <KBHd>NOTE</KBHd>
    <p key="b2-kb-s312-1" style={{ textAlign: "justify" }}><strong>1.</strong> When the body strikes the ground, it may come to rest or rebound. If it comes to rest instantaneously, the whole of its kinetic energy is transformed into (<em>i</em>) heat (<em>ii</em>) sound and (<em>iii</em>) potential energy of configuration of the body and the ground (the shape of body and the ground may change). In case, the body begins to rebound, the height to which it rises after each rebound, goes on decreasing. Ultimately, the body comes to rest. The kinetic energy of the body is transformed in the same way as discussed earlier, though over a longer period of time.<br /><br />
    The heat and sound so produced diffuse into the surrounding space and the energy of the body is transformed from a useful form to a useless form. This phenomenon of transformation of energy from the useful form to the useless (unproductive) form is called <strong>dissipation of energy.</strong></p>
    <p key="b2-kb-s312-2"><strong>2.</strong> The variation of kinetic energy (<em>E</em><Sub c="k" />) and potential energy (<em>E</em><Sub c="p" />) and the constancy of the mechanical energy (<em>E</em>) have been represented in Fig. 3.10. Note that for <em>h</em> = <em>h</em>/2, <em>E</em><Sub c="p" /> = <em>E</em><Sub c="k" />.</p>
    <Fig key="fig-3-10" src={CONTENT_IMAGES.CONTENT_IMAGE_6115B02E259077EFE884} num="Fig. 3.10" caption="Variation of KE and PE with height during free fall" />
    <p key="b2-kb-s312-3"><strong>3.</strong> It is to be noted that the law of conservation of mechanical energy also holds good in case of a body projected vertically upwards.</p>
  </KBBox>,

  <SecHd key="sec-s313" id="s313" label="3.13" title="Rate of Doing Work : Power" />,
  <p key="b2-p-s313-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Besides knowing the total amount of work done, it is important to know the time taken to do this work, whether it takes a year, a month or a day, or an hour. Suppose a 1000 litres tank is to be filled by drawing water out of a well. If this work is done by manual labour, a strong man can finish it quicker than a weak man. The strong man does more work in a unit time than the weak man. If a motor-driven pump is employed, a more powerful motor will complete the job in a shorter time. Here, the more powerful motor does more work in a unit time than the less powerful one. Thus, in many cases, when work is done, we are not interested only in the amount of work done but also in the time in which it is done. In such cases, we use the term <strong>power,</strong> <em>which measures the speed at which work is done.</em> Thus,
  </p>,
  <DefBox key="def-s313-1">
    <strong>Power of an agent</strong> <em>is defined as its rate of doing work. Power is, in fact, rate of transfer of energy.</em>
  </DefBox>,
  <p key="b2-p-s313-2">If an agent does a work <em>W</em> in a time <em>t</em>, then its power <em>P</em> is given by</p>,
  <MathBlock key="b2-math-s313-1">
    <strong><em>P</em> = <Frac n="W" d="t" /></strong> &nbsp;&nbsp;...(1)
  </MathBlock>,
  <p key="b2-p-s313-3">We know that, <em>W = F × s</em> &nbsp;&nbsp;...(2)</p>,
  <p key="b2-p-s313-4">From eqns. (1) and (2),</p>,
  <MathBlock key="b2-math-s313-2">
    <em>P</em> = <Frac n="F × s" d="t" /> = F × (s/t) &nbsp;&nbsp;...(3)
  </MathBlock>,
  <p key="b2-p-s313-5">As <em>s/t = v</em> (velocity), from eqn. (3)</p>,
  <MathBlock key="b2-math-s313-3"><strong><em>P = Fv</em></strong> &nbsp;&nbsp;...(4)</MathBlock>,
  <DefBox key="def-s313-2">
    <MathBlock key="b2-math-s313-4"><strong>Power = <Frac n="work" d="time" /> = force × velocity</strong></MathBlock>
  </DefBox>,
  <p key="b2-p-s313-6">Power is also called <strong>activity.</strong></p>,
  <p key="b2-p-s313-7" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Average Power.</strong> If an agent or a machine, operates <em>steadily,</em> performing the same amount of work every second, the power it delivers is constant. But if it works <em>irregularly,</em> its power fluctuates from moment to moment. In such a case, we talk of the average power of the agent which is defined as follows.
  </p>,
  <MathBlock key="b2-math-s313-5">
    Average Power = <Frac n="total work done" d="total time taken" />
  </MathBlock>,
  <p key="b2-p-s313-8"><strong>Unit of Power.</strong> The unit of power is watt (W) and is named in honour of <strong><em>James Watt</em></strong> (1736–1819).</p>,
  <DefBox key="def-s313-3">
    <em>The power of an agent is said to be one</em> <strong>watt (W)</strong> <em>if it can work at the rate of one joule (J) in one second (s).</em>
    <MathBlock key="b2-math-s313-6">1 watt (W) = <Frac n="1 joule (J)" d="1 second (s)" /></MathBlock>
  </DefBox>,
  <p key="b2-p-s313-9">
    A <strong>bigger unit,</strong> which is used by electrical engineers, is called a <strong>kilowatt (kW)</strong> where 1 kW = 1000 W<br />
    A unit which is exclusively used in engineering is called a <strong>horse power (hp)</strong> where 1 hp = 746 W
  </p>,
  <SubHd key="sub-s313-dist" id="s313-dist" label="" title="Distinction between Energy and Power" />,
  <p key="b2-p-s313-10" style={{ textIndent: 28, textAlign: "justify" }}>
    The energy of an object tells us the total amount of work it can perform without any reference to the time in which this work has been performed. Power, on the other hand, is the rate at which work is done and not the total amount of work done.
  </p>,
  <KBBox key="kb-s313">
    <KBHd>NOTE</KBHd>
    <p key="b2-kb-s313-1" style={{ textAlign: "justify" }}><strong>1.</strong> When a person does work, his sense of fatigue is determined more by the rate at which he does work than by the total work done by him. If a man ascends a flight of steps in 20 seconds, he feels little fatigue. But when he completes the same ascent in 4 seconds, he feels much more fatigued. In the latter case, his rate of doing work, <em>i.e.,</em> power, is 5 times greater than in the former case.</p>
    <p key="b2-kb-s313-2" style={{ textAlign: "justify" }}><strong>2.</strong> Two railway trains (A and B) of the same weight run at 60 km/h and 80 km/h respectively. If the friction of the rails and the resistance due to air are the same for both the trains, the train B does more work than the train A, because train B moves a greater distance than that covered by train A in the same time. So, the rate of doing work, <em>i.e.,</em> power of the train B is higher than that of the train A.</p>
  </KBBox>,

  <SecHd key="sec-s314" id="s314" label="3.14" title="Commercial Unit of Energy : Kilowatt Hour (kWh)" />,
  <p key="b2-p-s314-1" style={{ textIndent: 28, textAlign: "justify" }}>
    To express large quantities of energy, a joule is found to be very small and as such an inconvenient unit. For this purpose, a bigger unit of energy, called a <strong>kilowatt hour (kWh)</strong> is used.
  </p>,
  <DefBox key="def-s314-1">
    <em>One</em> <strong>kilowatt hour</strong> <em>is the amount of energy consumed (or work done) by an agent in one hour working at a constant rate of one kilowatt.</em> Clearly,
  </DefBox>,
  <MathBlock key="b2-math-s314-1">
    1 kWh = 1 kWh × 1 h = 1000 W × h = 1000 (J/s) × 3600 s = 3600000 J = <strong>3·6 × 10<Sup c="6" /> J = 3·6 MJ</strong>
  </MathBlock>,
  <p key="b2-p-s314-2" style={{ textIndent: 28, textAlign: "justify" }}>
    A kWh, also called <strong>BOTU (Board Of Trade Unit)</strong> or simply a <strong>unit,</strong> is used in households, industries and commercial establishments for measuring electric energy consumption. For example, if an electric heater of 1 kW power is used for 2 hours, it consumes 2 kWh or 2 units of electric energy.
  </p>,
];

// ── CONTENT (batch 3) ─────────────────────────────────────────
const content_b3 = [
  <NumericalSection key="num-power" topic="POWER">
    <p key="b3-num-pow-form" style={{ marginBottom: 8 }}>
      <strong>1.</strong> <em>P</em> = <Frac n="W" d="t" /> &nbsp; where <em>P</em> is the power, <em>W</em> is work in joule (J), <em>t</em> is time in second (s), <em>P</em> is in watt (W).<br />
      <strong>2.</strong> <em>P = Fv</em> &nbsp; where <em>F</em> is in newton (N), <em>v</em> is in m/s, <em>P</em> is in watt.<br />
      <strong>3.</strong> 1 W = 1 J/s; 1 kW = 1000 J/s.<br />
      <strong>4.</strong> 1 kilowatt hour (kWh) = 1000 W × 1 h = 3·6 × 10<Sup c="6" /> J = 3·6 MJ. A kilowatt hour is also called <strong>unit</strong> of electric energy.
    </p>
    <p key="b3-num-pow-p1"><strong>Problem 1.</strong> A boy of mass 50 kg runs up a staircase of 45 steps in 9 s. If the height of each step is 15 cm, find his power. Take <em>g</em> = 10 m/s<Sup c="2" />.</p>
    <p key="b3-num-pow-s1"><strong>Solution.</strong> Here, <em>m</em> = 50 kg; total height, <em>h</em> = 45 × 15 cm = 675 cm = 6·75 m; <em>t</em> = 9 s</p>
    <MathBlock key="b3-math-pow-1"><em>W = mgh</em> = (50 kg)(10 m/s<Sup c="2" />)(6·75 m) = 3375 J</MathBlock>
    <MathBlock key="b3-math-pow-1b"><em>P</em> = <Frac n="W" d="t" /> = <Frac n="3375 J" d="9 s" /> = <strong>375 W</strong></MathBlock>

    <p key="b3-num-pow-p2" style={{ marginTop: 10 }}><strong>Problem 2.</strong> Two girls, each of weight 400 N, climb up a rope through a height of 8 m. Girl A takes 20 s while B takes 50 s. What is the power expended by each girl?</p>
    <MathBlock key="b3-math-pow-2"><em>P</em><Sub c="1" /> = <Frac n="mgh" d="t₁" /> = <Frac n="(400 N)(8 m)" d="20 s" /> = <strong>160 W</strong>; &nbsp; <em>P</em><Sub c="2" /> = <Frac n="(400 N)(8 m)" d="50 s" /> = <strong>64 W</strong></MathBlock>

    <p key="b3-num-pow-p3" style={{ marginTop: 10 }}><strong>Problem 3.</strong> A car of mass 2000 kg is lifted up a distance of 30 m by a crane in 1 min. A second crane does the same job in 2 min. What is the power applied by each crane? Do the cranes consume the same or different amounts of fuel? Neglect power dissipation against friction.</p>
    <p key="b3-num-pow-s3"><strong>Solution.</strong> <em>W = mgh</em> = (2000)(10)(30) = 6 × 10<Sup c="5" /> J</p>
    <MathBlock key="b3-math-pow-3"><em>P</em><Sub c="1" /> = <Frac n="6 × 10⁵ J" d="60 s" /> = 10000 W = <strong>10 kW</strong>; &nbsp; <em>P</em><Sub c="2" /> = <Frac n="6 × 10⁵ J" d="120 s" /> = <strong>5 kW</strong></MathBlock>
    <p key="b3-num-pow-s3b">The two cranes would consume the <strong>same amount of fuel</strong> as they perform the same amount of work (<em>i.e.,</em> 6 × 10<Sup c="5" /> J).</p>

    <p key="b3-num-pow-p4" style={{ marginTop: 10 }}><strong>Problem 4.</strong> What should be the power of an engine required to lift 90 metric tonnes of coal per hour from a mine whose depth is 200 m?</p>
    <p key="b3-num-pow-s4"><strong>Solution.</strong> <em>m</em> = 90 × 1000 kg = 9 × 10<Sup c="4" /> kg; <em>h</em> = 200 m; <em>t</em> = 3600 s</p>
    <MathBlock key="b3-math-pow-4"><em>W = mgh</em> = (9 × 10<Sup c="4" />)(10)(200) = 18 × 10<Sup c="7" /> J</MathBlock>
    <MathBlock key="b3-math-pow-4b"><em>P</em> = <Frac n="18 × 10⁷ J" d="3600 s" /> = 50000 W = <strong>50 kW</strong></MathBlock>

    <p key="b3-num-pow-p5" style={{ marginTop: 10 }}><strong>Problem 5.</strong> How much time does it take to perform 500 J of work at a rate of 10 W?</p>
    <MathBlock key="b3-math-pow-5">As <em>P</em> = <Frac n="W" d="t" />, &nbsp; <em>t</em> = <Frac n="W" d="P" /> = <Frac n="500 J" d="10 W" /> = <strong>50 s</strong></MathBlock>

    <p key="b3-num-pow-p6" style={{ marginTop: 10 }}><strong>Problem 6.</strong> An electric bulb of 60 W is used for 6 h per day. Calculate the 'units' of energy consumed in one day by the bulb.</p>
    <p key="b3-num-pow-s6"><strong>Solution.</strong> <em>P</em> = 60 W = 0·06 kW; <em>t</em> = 6 h</p>
    <MathBlock key="b3-math-pow-6"><em>W = Pt</em> = (0·06 kW)(6 h) = <strong>0·36 kWh = 0·36 units</strong></MathBlock>

    <p key="b3-num-pow-p7" style={{ marginTop: 10 }}><strong>Problem 7.</strong> A lift is designed to carry a load of 4000 kg through 10 floors of a building, averaging 6 m per floor, in 10 s. Calculate the power of the lift.</p>
    <p key="b3-num-pow-s7"><strong>Solution.</strong> Total distance, <em>s</em> = 10 × 6 m = 60 m; <em>t</em> = 10 s; <em>F</em> = 4000 × 10 N = 4 × 10<Sup c="4" /> N</p>
    <MathBlock key="b3-math-pow-7"><em>v</em> = <Frac n="s" d="t" /> = <Frac n="60 m" d="10 s" /> = 6 m/s; &nbsp; <em>P = Fv</em> = (4 × 10<Sup c="4" /> N)(6 m/s) = 24 × 10<Sup c="4" /> W = <strong>240 kW</strong></MathBlock>
  </NumericalSection>,

  <ProblemsBox key="prob-s313">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A 60 kg person climbs stairs of total height 20 m in 2 min. Calculate the power delivered. <strong>[Ans. 100 W]</strong></li>
      <li style={{ marginBottom: 6 }}>The work done by the heart is 1 J per beat. Calculate the power of the heart if it beats 72 times/min. <strong>[Ans. 1·2 W]</strong></li>
      <li style={{ marginBottom: 6 }}>A man exerts a force of 200 N in pulling a cart at a constant speed of 16 m/s. Calculate the power spent by the man. <strong>[Ans. 3·2 kW]</strong></li>
      <li style={{ marginBottom: 6 }}>Calculate the power of an engine required to lift 10<Sup c="5" /> kg of coal per hour from a mine 360 m deep. <strong>[Ans. 100 kW]</strong></li>
      <li style={{ marginBottom: 6 }}>A man does 200 J of work in 10 s and a boy does 100 J of work in 4 s. (a) Who is delivering more power? (b) Find the ratio of the power delivered by the man to that delivered by the boy. <strong>[Ans. (a) The boy delivers more power (b) 4/5]</strong></li>
      <li style={{ marginBottom: 6 }}>Compute the mechanical power provided by the internal forces within the body of a person of mass 80 kg who runs up a flight of stairs rising a vertical distance of 3 m in 3 s. <strong>[Ans. 784 W]</strong></li>
      <li style={{ marginBottom: 6 }}>What quantity does the area of the graph, [Fig. 3.11] represent? What is the magnitude of this quantity?
        <Fig key="fig-3-11" src={CONTENT_IMAGES.CONTENT_IMAGE_80BBC53D91C0C5CE1D24} num="Fig. 3.11" caption="F-s graph for arrow problem" />
        <strong>[Ans. 68·8 J]</strong></li>
      <li style={{ marginBottom: 6 }}>What is the change in gravitational potential energy of a 50 kg person who climbs a flight of stairs with a height of 3 m and a horizontal extent of 5 m? <strong>[Ans. 1500 J]</strong></li>
      <li style={{ marginBottom: 6 }}>A compact car travelling at 27 m/s on a level highway experiences a frictional force of 300 N. What is the horse power of the engine of the car? <strong>[Ans. ≈ 11 hp]</strong></li>
      <li style={{ marginBottom: 6 }}>A skier starts from rest at the top of a ski slope and skis downhill. Find the skier's speed after her elevation decreases by 10 m, assuming no work is done by friction or air resistance. <strong>[Ans. 14 m/s]</strong></li>
      <li style={{ marginBottom: 6 }}>Water is pumped out of a well 10 m deep by means of a pump rated at 10 kW. Find the efficiency of the motor if 4200 kg of water is pumped out every minute. Take <em>g</em> = 10 m/s<Sup c="2" />. <strong>[Ans. 70%]</strong></li>
    </ol>
  </ProblemsBox>,

  <div key="b3-solhd-power" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b3-soln-pow-1" style={{ margin: "0 0 6px" }}><strong>1.</strong> <em>P</em> = <Frac n="mgh" d="t" /> = <Frac n="(60)(10)(20)" d="2 × 60 s" /> = <strong>100 W</strong></p>,
  <p key="b3-soln-pow-2" style={{ margin: "0 0 6px" }}><strong>2.</strong> <em>P</em> = 72 × 1 J ÷ 60 s = <strong>1·2 W</strong></p>,
  <p key="b3-soln-pow-3" style={{ margin: "0 0 6px" }}><strong>3.</strong> <em>P = Fv</em> = (200 N)(16 m/s) = 3200 W = <strong>3·2 kW</strong></p>,
  <p key="b3-soln-pow-4" style={{ margin: "0 0 6px" }}><strong>4.</strong> <em>P</em> = (10<Sup c="5" />)(10)(360) ÷ (60 × 60) = 10<Sup c="5" /> W = <strong>100 kW</strong></p>,
  <p key="b3-soln-pow-5" style={{ margin: "0 0 6px" }}><strong>5.</strong> (a) <em>P</em><Sub c="1" /> = 200 ÷ 10 = 20 W; <em>P</em><Sub c="2" /> = 100 ÷ 4 = 25 W; <strong>The boy delivers more power.</strong><br />
    (b) <em>P</em><Sub c="1" /> / <em>P</em><Sub c="2" /> = 20/25 = <strong>4/5</strong></p>,
  <p key="b3-soln-pow-6" style={{ margin: "0 0 6px" }}><strong>6.</strong> <em>mgh</em> = (80 × 9·8 × 3) = 2352 J; Power = 2352 ÷ 3 = <strong>784 W</strong></p>,
  <p key="b3-soln-pow-7" style={{ margin: "0 0 6px" }}><strong>7.</strong> The area of the graph (<em>F × s</em>) represents work done. <em>W</em> = <Frac n="1" d="2" />(base × height) = <Frac n="1" d="2" />(0·5 m)(275 N) = <strong>68·8 J</strong></p>,
  <p key="b3-soln-pow-8" style={{ margin: "0 0 6px" }}><strong>8.</strong> <em>mgh</em> = 50 × 10 × 3 = <strong>1500 J</strong>. The horizontal extent has no effect on the answer.</p>,
  <p key="b3-soln-pow-9" style={{ margin: "0 0 6px" }}><strong>9.</strong> <em>P = Fv</em> = (300 N)(27 m/s) = 8100 W = 8100 ÷ 746 ≈ <strong>11 hp</strong></p>,
  <p key="b3-soln-pow-10" style={{ margin: "0 0 6px" }}><strong>10.</strong> <em>E</em><Sub c="p" /> converted to KE: <em>mgh</em> = <Frac n="1" d="2" /><em>mv</em><Sup c="2" />; <em>v</em> = √(2 × 9·8 × 10) = <strong>14 m/s</strong></p>,
  <p key="b3-soln-pow-11" style={{ margin: "0 0 18px" }}><strong>11.</strong> Output power = (4200)(10)(10) ÷ 60 = 7 kW; Efficiency = 7 ÷ 10 = 0·7 = <strong>70%</strong></p>,

  <SecHd key="sec-s315" id="s315" label="3.15" title="Simple Machine" />,
  <p key="b3-p-s315-1" style={{ textIndent: 28, textAlign: "justify" }}>
    It is a common experience that one can easily pull up a bucket of water from a well with the help of a rope-pulley system rather than directly pulling it up with a rope. A nut can be easily open with the help of a nut cracker. There are numerous such examples where the use of simple tools (such as lever, pulley, inclined plane, wrench, crowbar etc.) make the job easier.
  </p>,
  <p key="b3-p-s315-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Since the beginning of civilization, humans have developed devices and tools to make work easier. It is a common experience to see a person lifting a chunk of bricks with the help of a chain-pulley system, moving a heavy object with the help of a rod, cycling, cutting logs, moving objects over an inclined plane or driving a screw into wood etc. The use of these simple tools to perform desired work becomes very easy. All such simple tools or their combinations are called a machine. Therefore, we can define a simple machine as below:
  </p>,
  <DefBox key="def-s315-1">
    <strong>A simple machine</strong> <em>is a mechanical device that makes work easier by changing the force you apply to do the work. It may have few or no moving parts that are used to modify the motion, magnitude and direction of the force to perform the desired work.</em>
  </DefBox>,
  <SubHd key="sub-s315-terms" id="s315-terms" label="" title="Technical Terms related to simple machine" />,
  <p key="b3-p-s315-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Below, we discuss various technical terms used in the discussion of simple machines.
  </p>,
  <p key="b3-p-s315-4" style={{ textAlign: "justify" }}>
    <strong>(<em>i</em>) Load.</strong> The object to be moved is called as load. In other words, <em>resistive or opposing force to be overcome by the machine is called the load (L) or output force.</em> Input force is also called effort.
  </p>,
  <p key="b3-p-s315-5" style={{ textAlign: "justify" }}>
    <strong>(<em>ii</em>) Effort.</strong> <em>The force applied on the machine to overcome the load is called as effort (E) or input force.</em>
  </p>,
  <p key="b3-p-s315-6" style={{ textAlign: "justify" }}>
    <strong>(<em>iii</em>) Mechanical advantage (M.A.).</strong> <em>The ratio of the load to the effort or output force to the input force is called as</em> <strong>mechanical advantage</strong> <em>of the machine, i.e.,</em>
  </p>,
  <DefBox key="def-s315-2">
    <MathBlock key="b3-math-ma">
      <strong>Mechanical Advantage (M.A.) = <Frac n="Load (L)" d="Effort (E)" /> = <Frac n="Output force" d="Input force" /></strong>
    </MathBlock>
  </DefBox>,
  <p key="b3-p-s315-7" style={{ textIndent: 28, textAlign: "justify" }}>
    When simple machines are used to overcome certain load, if the effort required is less than the load, the mechanical advantage of the machine is greater than one, while if machine requires effort larger than the load, its mechanical advantage is less than 1. The mechanical advantage of a machine is 1 if the effort required is equal to the load. A machine with mechanical advantage greater than 1 acts as <strong>force multiplier,</strong> whereas a machine with mechanical advantage less than 1 provides a <strong>speed gain.</strong> The machine with mechanical advantage equal to 1, <strong><em>is generally employed to change the direction of the effort</em></strong> as such a machine does not provide any gain in force or speed. It is to be noted that mechanical advantage is the ratio of two similar quantities, and hence does not have any unit.
  </p>,
  <p key="b3-p-s315-8" style={{ textAlign: "justify" }}>
    <strong>(<em>iv</em>) Velocity Ratio (V.R.) of a machine.</strong> It is the ratio of the velocity of the effort to the velocity of the load, <em>i.e.,</em>
  </p>,
  <DefBox key="def-s315-3">
    <MathBlock key="b3-math-vr">
      <strong>Velocity Ratio (V.R.) = <Frac n={<>Velocity of effort (V<Sub c="E" />)</>} d={<>Velocity of load (V<Sub c="L" />)</>} /></strong>
    </MathBlock>
  </DefBox>,
  <p key="b3-p-s315-9" style={{ textAlign: "justify" }}>
    Let <em>d</em><Sub c="L" /> and <em>d</em><Sub c="E" /> be the distances moved by the load and effort, respectively in time <em>t</em>. Then,
  </p>,
  <MathBlock key="b3-math-vr2">
    V.R. = <Frac n={<>V<Sub c="E" /></>} d={<>V<Sub c="L" /></>} /> = <Frac n={<><em>d</em><Sub c="E" />/t</>} d={<><em>d</em><Sub c="L" />/t</>} /> &nbsp; or &nbsp; <strong>V.R. = <Frac n={<><em>d</em><Sub c="E" /></>} d={<><em>d</em><Sub c="L" /></>} /></strong> &nbsp;&nbsp;...(1)
  </MathBlock>,
  <p key="b3-p-s315-10" style={{ textIndent: 28, textAlign: "justify" }}>
    Hence, the velocity ratio can also be defined as the ratio of the displacement of effort to the displacement of the load.
  </p>,
  <p key="b3-p-s315-11" style={{ textIndent: 28, textAlign: "justify" }}>
    From this relation, we can conclude that, if for a machine displacement of the load is greater than displacement of the effort, the velocity ratio will be less than 1. Such a machine provides <strong>gain in speed.</strong> On the other hand, if V.R. &gt; 1, the machine acts as a <strong>force multiplier.</strong> The machine with V.R. equal to 1 in general <strong>changes the direction of effort.</strong>
  </p>,
  <p key="b3-p-s315-12">
    <strong>(<em>v</em>) Work input (W<Sub c="input" />).</strong> Work input is defined as the work done on the machine by the effort.
  </p>,
  <p key="b3-p-s315-13">
    <strong>(<em>vi</em>) Work output (W<Sub c="output" />).</strong> It is defined as the work done by the machine on the load.
  </p>,
  <p key="b3-p-s315-14" style={{ textAlign: "justify" }}>
    <strong>(<em>vii</em>) Efficiency (η):</strong> The efficiency η of the machine is defined as ratio of the work done on the load by the machine to the work done on the machine by the effort.
  </p>,
  <DefBox key="def-s315-4">
    <MathBlock key="b3-math-eta">
      <strong>η = <Frac n={<>Work output (W<Sub c="output" />)</>} d={<>Work input (W<Sub c="input" />)</>} /></strong>
    </MathBlock>
    <MathBlock key="b3-math-eta2">
      <strong>η(%) = <Frac n={<>W<Sub c="output" /></>} d={<>W<Sub c="input" /></>} /> × 100%</strong>
    </MathBlock>
  </DefBox>,
  <p key="b3-p-s315-15">Unit. Efficiency is the ratio of two similar quantities. It has no unit.</p>,

  <SecHd key="sec-s316" id="s316" label="3.16" title="Working Principle of a Machine" />,
  <p key="b3-p-s316-1" style={{ textIndent: 28, textAlign: "justify" }}>
    A machine can perform work when energy is supplied by the effort. The effort (or input force) overcomes the load by doing some useful work on it.
  </p>,
  <p key="b3-p-s316-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The point where the energy is supplied to the machine by the effort is called the <strong>effort point</strong> and the point from where the energy is transferred to overcome the load, is called as <strong>load point.</strong> For example in case of a lever (see Fig. 3.12), the load point is where the output force (resistance) acts and the effort point is where the input force is applied. Here, in the figure, <strong>fulcrum</strong> is the pivot.
  </p>,
  <Fig key="fig-3-12"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C6B688FD5AFDD9719DA1}
    num="Fig. 3.12" caption="A lever showing load point, fulcrum and effort point" />,
  <p key="b3-p-s316-3">From here, one can define input energy and output energy as below:</p>,
  <p key="b3-p-s316-4" style={{ marginLeft: 20 }}>
    Input energy = work done at the effort point = effort × displacement of the point of application of effort.<br />
    Output energy = work obtained at the load point = load × displacement of the point of application of load.
  </p>,
  <p key="b3-p-s316-5" style={{ textIndent: 28, textAlign: "justify" }}>
    According to principle of conservation of energy, output energy can never be greater than the input energy. Therefore, <em>a machine can never have efficiency greater than 1 or more than 100%.</em>
  </p>,
  <SubHd key="sub-s316-ideal" id="s316-ideal" label="" title="Ideal machine" />,
  <p key="b3-p-s316-6" style={{ textIndent: 28, textAlign: "justify" }}>
    When there is no loss of energy (<em>i.e.,</em> frictional forces are absent and weight of the moving parts of a machine is negligible), in that case, work output is equal to input energy. In other words, for an ideal machine, efficiency is
  </p>,
  <DefBox key="def-s316-1">
    <MathBlock key="b3-math-ideal">
      η<Sub c="ideal" /> (%) = <Frac n={<>W<Sub c="output" /></>} d={<>W<Sub c="input" /></>} /> × 100% = <strong>100%</strong>
    </MathBlock>
  </DefBox>,
  <SubHd key="sub-s316-actual" id="s316-actual" label="" title="Actual machine" />,
  <p key="b3-p-s316-7" style={{ textIndent: 28, textAlign: "justify" }}>
    In a real machine, frictional forces are unavoidable and even mass of moving parts cannot be neglected. This causes energy losses. As a result, output energy is always lower than the input energy. <strong>The energy losses in a machine are mainly due to following three reasons:</strong>
  </p>,
  <p key="b3-p-s316-8" style={{ marginLeft: 20 }}>
    (<em>i</em>) In a machine, the moving parts are neither weightless nor completely smooth (or frictionless).<br />
    (<em>ii</em>) The string (for <em>e.g.,</em> in case of chain-pulley system) is neither perfectly elastic nor weightless.<br />
    (<em>iii</em>) Its different parts are not perfectly rigid.
  </p>,
  <p key="b3-p-s316-9" style={{ textIndent: 28, textAlign: "justify" }}>
    It is to be noted that, majority of energy loss is associated with overcoming the force of friction between various moving parts of the machine. <em>Therefore, in real machines, work output is smaller than work input and efficiency is less than 1 (or &lt; 100%).</em>
  </p>,
  <p key="b3-p-s316-10" style={{ textIndent: 28, textAlign: "justify" }}>
    If a machine is say 90% efficient, it means only 90% of the input energy to the machine has been obtained as useful energy at the load point. Remaining 10% of the input energy is lost in overcoming the frictional force. The loss associated with frictional force appears as heat energy in various parts of the machine.
  </p>,
  <SubHd key="sub-s316-rel" id="s316-rel" label="" title="Relationship between efficiency (η), mechanical advantage (M.A.) and velocity ratio (V.R.)" />,
  <p key="b3-p-s316-11" style={{ textAlign: "justify" }}>
    Let an effort E is applied to a machine to overcome a load L in time t. Let the displacements of effort and load points be <em>d</em><Sub c="E" /> and <em>d</em><Sub c="L" />, respectively. Therefore,
  </p>,
  <MathBlock key="b3-math-rel1">Work input = <em>E</em> × <em>d</em><Sub c="E" />; &nbsp; Work output = <em>L</em> × <em>d</em><Sub c="L" /></MathBlock>,
  <MathBlock key="b3-math-rel2">
    Efficiency η = <Frac n={<><em>L</em> × <em>d</em><Sub c="L" /></>} d={<><em>E</em> × <em>d</em><Sub c="E" /></>} /> = <Frac n="L" d="E" /> × <Frac n="1" d={<><em>d</em><Sub c="E" />/<em>d</em><Sub c="L" /></>} /> = <Frac n="M.A." d="V.R." />
  </MathBlock>,
  <DefBox key="def-s316-2">
    <MathBlock key="b3-math-rel3"><strong>M.A. = η × V.R.</strong> &nbsp;&nbsp;...(3)</MathBlock>
    <p key="b3-p-rel3">Hence, <strong>mechanical advantage of a machine is the product of its efficiency and velocity ratio.</strong></p>
  </DefBox>,
  <p key="b3-p-s316-12" style={{ textAlign: "justify" }}>
    For an ideal machine with η = 1, M.A. = V.R., <em>i.e.,</em> mechanical advantage is numerically equal to the velocity ratio. On the other hand, for a real or practical machine, η &lt; 1, so that M.A. &lt; V.R.
  </p>,

  <SecHd key="sec-s317" id="s317" label="3.17" title="Six Simple Machines" />,
  <p key="b3-p-s317-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Ancient engineers identified six fundamental types of simple machines. Each one of these manipulates force in a slightly different way, but they all share the same goal of making tasks more manageable. These six kinds of simple machines are: <strong>lever, pulley, an inclined plane, wheel and axle, wedge and screw.</strong> Look at Fig. 3.13 where six simple machines are shown. <strong><em>It is important to understand that simple machines make work easier, but they don't change the amount of work you have to do.</em></strong> These simple machines change the effort we have to apply to do the desired work.
  </p>,
  <Fig key="fig-3-13"
    src={CONTENT_IMAGES.CONTENT_IMAGE_61E1D472D716C562AD47}
    num="Fig. 3.13" caption="Six simple machines: lever, pulley, inclined plane, wheel and axle, wedge, screw" />,

  <SecHd key="sec-s318" id="s318" label="3.18" title="Levers" />,
  <p key="b3-p-s318-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Levers are the simple kind of machines that are used in our daily life.
  </p>,
  <DefBox key="def-s318-1">
    <em>A lever is a rigid, straight or bent rod which is capable of turning about a fixed axis.</em>
  </DefBox>,
  <p key="b3-p-s318-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The axis about which the lever turns, passes through a point on the lever which is known as <strong>fulcrum</strong> (see Fig. 3.14). This point is usually denoted by letter F. When the lever is in use, this point does not move rather it stays fixed.
  </p>,
  <Fig key="fig-3-14"
    src={CONTENT_IMAGES.CONTENT_IMAGE_AAD1FD6F7032E766AFDD}
    num="Fig. 3.14" caption="A lever showing fulcrum, load point and effort point" />,
  <SubHd key="sub-s318-wp" id="s318-wp" label="" title="Working Principle of a Lever" />,
  <p key="b3-p-s318-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider a lever AB with fulcrum F as in Fig. 3.15 (a). An effort E applied at effort point A of the lever, overcomes a load L at load point B. From the fulcrum F, the distance <em>FA = l</em><Sub c="2" /> to the effort point A is called the <strong>effort arm.</strong> Distance <em>FB = l</em><Sub c="1" /> of point B at which load acts, is called the <strong>load arm.</strong> Here, we are assuming that lever is ideal, <em>i.e.,</em> rod is weightless and frictional forces are absent.
  </p>,
  <p key="b3-p-s318-4" style={{ textIndent: 28, textAlign: "justify" }}>
    A lever operates on the <strong>principle of moments.</strong> According to this, when lever is in equilibrium position, moment of load about the fulcrum must be equal to the moment of effort about the fulcrum and these moments are always in opposite direction. Therefore,
  </p>,
  <p key="b3-p-s318-5" style={{ textAlign: "center", fontStyle: "italic" }}>
    Anticlockwise moment of load about fulcrum = clockwise moment of effort about fulcrum
  </p>,
  <p key="b3-p-s318-6" style={{ textAlign: "center", fontStyle: "italic" }}>
    <em>i.e.,</em> &nbsp; Load × load arm = Effort × effort arm
  </p>,
  <MathBlock key="b3-math-s318-1">
    <em>L</em> × <em>l</em><Sub c="1" /> = <em>E</em> × <em>l</em><Sub c="2" /> &nbsp; or &nbsp; <Frac n="L" d="E" /> = <Frac n={<><em>l</em><Sub c="2" /></>} d={<><em>l</em><Sub c="1" /></>} /> &nbsp;&nbsp;...(1)
  </MathBlock>,
  <p key="b3-p-s318-7">Since, mechanical advantage = <Frac n="L" d="E" /></p>,
  <DefBox key="def-s318-2">
    <MathBlock key="b3-math-s318-2">
      <strong>M.A. = <Frac n="effort arm" d="load arm" /> = <Frac n={<><em>l</em><Sub c="2" /></>} d={<><em>l</em><Sub c="1" /></>} /></strong> &nbsp;&nbsp;...(2)
    </MathBlock>
    <p key="b3-p-s318-def">This relation is known as <strong>law of levers.</strong> Therefore, <em>The mechanical advantage of a lever is equal to the ratio of the length of its effort arm (l<sub>2</sub>) to the length of its load arm (l<sub>1</sub>).</em></p>
  </DefBox>,
  <div key="fig-s318-classes" style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", margin: "12px 0" }}>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CFE78126727F8EC430BE} num="" caption="(a) Class-1" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1BBBC35D39FF98E2FD68} num="" caption="(b) Class-2" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7C3D95DAF054EEFB6A55} num="Fig. 3.15" caption="(c) Class-3 — Different classes of lever" />
  </div>,
  <SubHd key="sub-s318-leverage" id="s318-leverage" label="" title="Leverage" />,
  <DefBox key="def-s318-3">
    <em>The ratio of the effort arm to the load arm, i.e. l<sub>2</sub>/l<sub>1</sub> is called as</em> <strong>leverage.</strong>
  </DefBox>,
  <p key="b3-p-s318-8" style={{ textIndent: 28, textAlign: "justify" }}>
    From Eqn. (2), if a large load has to be lifted by small effort, then effort arm (<em>l</em><Sub c="2" />) should be much greater than the load arm (<em>l</em><Sub c="1" />). Further,
  </p>,
  <p key="b3-p-s318-9" style={{ marginLeft: 20 }}>
    (<em>i</em>) if effort arm = load arm, <em>i.e., l</em><Sub c="2" /> = <em>l</em><Sub c="1" />, M.A. = 1<br />
    (<em>ii</em>) if <em>l</em><Sub c="2" /> &gt; <em>l</em><Sub c="1" />, M.A. &gt; 1<br />
    (<em>iii</em>) if <em>l</em><Sub c="2" /> &lt; <em>l</em><Sub c="1" />, M.A. &lt; 1
  </p>,
  <p key="b3-p-s318-10" style={{ fontStyle: "italic" }}>
    Therefore, mechanical advantage of a lever can be increased either by increasing its effort arm or by decreasing its load arm.
  </p>,
  <SubHd key="sub-s318-classes" id="s318-classes" label="" title="Three Classes of Lever" />,
  <p key="b3-p-s318-11" style={{ textIndent: 28, textAlign: "justify" }}>
    Depending upon the arrangement of load, effort and fulcrum, there are three distinct classes of levers: (<em>i</em>) Class-1 lever; (<em>ii</em>) Class-2 lever and (<em>iii</em>) Class-3 lever.
  </p>,
  <p key="b3-p-s318-12" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Class-1 levers.</strong> They have the fulcrum positioned between the effort and the load (Fig. 3.16 (a)). Note that fulcrum need not to be exactly at the mid-point of L and E.
  </p>,
  <SubSubHd key="sub-s318-class1" id="s318-class1" label="" title="Examples of first class" />,
  <p key="b3-p-s318-13" style={{ textIndent: 28, textAlign: "justify" }}>
    A seesaw, pliers, crowbar, handle of pump, beam of a physical balance, claw hammer, little pull tab used to open a can of soft drink are perfect examples of class 1 lever. Scissors are another, with the pivot screw acting as the fulcrum between your fingers (the effort) and the paper being cut (the load). These levers offer great advantage for changing the direction of a force and can be used to multiply force also.
  </p>,
  <p key="b3-p-s318-14" style={{ fontStyle: "italic" }}>
    <em>For class-1 levers, mechanical advantage and velocity ratio can have any value either greater than 1, equal to 1 or less than 1.</em>
  </p>,
  <p key="b3-p-s318-15" style={{ textIndent: 28, textAlign: "justify" }}>
    Further, when length of the effort arm is larger than the load arm, both M.A. and V.R. of class-1 levers are greater than 1. Such type of lever serves as a <strong>force multiplier.</strong> When lengths of effort arm and load arm are same, M.A. = V.R. = 1 (e.g., physical balance). When length of the effort arm is smaller than the load arm, M.A. and V.R. are less than 1 — such levers are used to <strong>gain in speed (speed multiplier).</strong>
  </p>,
  <p key="b3-p-s318-16" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Class-2 levers.</strong> In class 2 levers, the load lies between the fulcrum and the effort (Fig. 3.16 (b)). Load and efforts act in opposite directions and effort arm is always longer than the load arm. Therefore, from Eqn. 2, the M.A. and V.R. are greater than 1.
  </p>,
  <p key="b3-p-s318-17" style={{ fontStyle: "italic" }}>
    <em>The mechanical advantage and velocity ratio for a class-2 lever is always greater than 1. Hence, a class-2 lever is used as a force multiplier, i.e., a less effort is required to overcome a large load.</em>
  </p>,
  <p key="b3-p-s318-18" style={{ textIndent: 28, textAlign: "justify" }}>
    For example, in case of a wheelbarrow, the wheel is the fulcrum, the load is the material inside, and person provides the effort by lifting the handles. A bottle opener and a nutcracker work in the same way.
  </p>,
  <p key="b3-p-s318-19" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Class-3 levers.</strong> In these levers, the effort is applied between the fulcrum and the load (Fig. 3.16 (c)). Effort and load are in opposite directions and effort arm is smaller than the load arm. Hence, mechanical advantage is less than 1.
  </p>,
  <p key="b3-p-s318-20" style={{ fontStyle: "italic" }}>
    <em>The mechanical advantage and velocity ratio for an ideal class-3 lever is always less than 1. Hence, with a class-3 lever, we do not gain in force rather we gain in speed. In other words, a larger displacement of load is obtained by smaller displacement of the effort.</em>
  </p>,
  <p key="b3-p-s318-21" style={{ textIndent: 28, textAlign: "justify" }}>
    A pair of tweezers is a good example of class-3 lever. Your elbow joint is the fulcrum, you squeeze in the middle (the effort), and the tips pinch the object (the load). Fishing rods and baseball bats are also examples of class 3 levers.
  </p>,
  <p key="b3-p-s318-22" style={{ textIndent: 28 }}>
    Note that a wheelbarrow can also be called as <strong>compound machine.</strong> In a wheelbarrow, the functionality of a wheel and axle is combined with that of a lever.
  </p>,
];

// ── BATCH 4: Fig 3.16 + Lever Problems + §3.19 Pulley ────────

const FIG_16 = CONTENT_IMAGES.CONTENT_IMAGE_96EE19FE7950AB60A905;
const FIG_17 = CONTENT_IMAGES.CONTENT_IMAGE_629F406A4FA643AF7E6D;
const FIG_18A = CONTENT_IMAGES.CONTENT_IMAGE_2E7D3B58380B32E73943;
const FIG_19 = CONTENT_IMAGES.CONTENT_IMAGE_4603628042D9DC5B7C4D;
const FIG_20 = CONTENT_IMAGES.CONTENT_IMAGE_B6EFE4124B156AD10FBE;
const FIG_21A = CONTENT_IMAGES.CONTENT_IMAGE_133C4DA223D01AC3DD1E;
const FIG_21B = CONTENT_IMAGES.CONTENT_IMAGE_19F4744C36A13A223CA9;
const FIG_22A = CONTENT_IMAGES.CONTENT_IMAGE_19AAB754EE483C08772B;
const FIG_22B = CONTENT_IMAGES.CONTENT_IMAGE_084396B094E009DC2D45;
const FIG_22C = CONTENT_IMAGES.CONTENT_IMAGE_7C145364AF0B909D5982;

// Comparison table for fixed vs movable pulley
function PulleyComparisonTable() {
  const rows = [
    ["It is fixed to a rigid support.", "It is not fixed to a rigid support."],
    ["Its ideal mechanical advantage is 1.", "Its ideal mechanical advantage is 2."],
    ["Its velocity ratio is 1.", "Its velocity ratio is 2."],
    ["The weight of pulley itself does not affect its mechanical advantage.", "The weight of pulley itself reduces its mechanical advantage."],
    ["It is used to change the direction of effort from upwards to downwards.", "It is used as a force multiplier."],
    ["The load moves in a direction opposite to that of the effort.", "The load moves in the direction of the effort."],
  ];
  const cellStyle = { padding: "7px 12px", fontSize: 13.5, lineHeight: 1.55, verticalAlign: "top", border: "1px solid #bbb" };
  const hdStyle = { ...cellStyle, background: "#f0f0f0", fontWeight: 700, textAlign: "center" };
  return (
    <table key="tbl-pulley-compare" style={{ width: "100%", borderCollapse: "collapse", margin: "14px 0 18px", fontSize: 13.5 }}>
      <thead>
        <tr>
          <th style={hdStyle}>Single Fixed Pulley</th>
          <th style={hdStyle}>Single Movable Pulley</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={cellStyle}><strong>{i + 1}.</strong> {row[0]}</td>
            <td style={cellStyle}><strong>{i + 1}.</strong> {row[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const content_b4 = [
  // Fig 3.16 - three classes of levers diagram
  <div key="b4-fig316" style={{ textAlign: "center", margin: "18px 0 6px" }}>
    <img src={FIG_16} alt="Fig. 3.16. Classes of levers" style={{ maxWidth: "90%", height: "auto" }} />
    <div style={{ fontSize: 13, color: "#555", marginTop: 4, fontStyle: "italic" }}>
      Fig. 3.16. (<em>a</em>) Class-1 ; (<em>b</em>) Class-2 ; (<em>c</em>) Class-3 levers
    </div>
  </div>,

  // Lever Solved Problems
  <NumericalSection key="num-lever" topic="LEVER">
    <p key="b4-lever-form-hd" style={{ fontWeight: 700, textDecoration: "underline", marginBottom: 6 }}>FORMULAE AND UNITS</p>
    <p key="b4-lever-f1">
      1. Mechanical advantage (M.A.) = <Frac n="load (L)" d="effort (E)" />
    </p>
    <p key="b4-lever-f2">
      2. Velocity ratio (V.R.) = <Frac n="velocity of effort" d="velocity of load" /> = <Frac n={<>V<Sub c="E" /></>} d={<>V<Sub c="L" /></>} /> = <Frac n={<>d<Sub c="E" /></>} d={<>d<Sub c="L" /></>} />
      <br/>where, <em>d<Sub c="E" /></em> and <em>d<Sub c="L" /></em> are the distances moved by the effort and load, respectively.
    </p>
    <p key="b4-lever-f3">
      3. Efficiency of a machine, η = <Frac n={<>W<Sub c="output" /></>} d={<>W<Sub c="input" /></>} />
    </p>
    <p key="b4-lever-f4">
      4. Relation between efficiency (η), mechanical advantage (M.A.) and velocity ratio (V.R.)
    </p>
    <MathBlock key="b4-lever-m1"><strong>M.A. = η V.R.</strong></MathBlock>
    <p key="b4-lever-f5">5. Mechanical advantage in terms of leverage</p>
    <MathBlock key="b4-lever-m2">Leverage = <Frac n={<>l<Sub c="2" /></>} d={<>l<Sub c="1" /></>} /></MathBlock>
    <MathBlock key="b4-lever-m3">
      Mechanical Advantage (M.A.) = <Frac n="L" d="E" /> = <Frac n={<>l<Sub c="2" /></>} d={<>l<Sub c="1" /></>} />
    </MathBlock>
    <p key="b4-lever-f5b" style={{ fontSize: 13.5, color: "#444" }}>
      where, <em>l<Sub c="2" /></em> is length of effort arm and <em>l<Sub c="1" /></em> is length of load arm.
    </p>

    <p key="b4-lp1"><strong>Problem 1.</strong> A mechanic applies an input force of 30 N on a lever and it produces an output force of 90 N. What is the mechanical advantage of the lever?</p>
    <p key="b4-lp1s"><strong>Solution.</strong> Mechanical advantage (M.A.) = <Frac n="output force" d="input force" /></p>
    <p key="b4-lp1s2">Here, input force = 30 N, output force = 90 N</p>
    <MathBlock key="b4-lp1m">Hence, M.A. = <Frac n="90" d="30" /> = <strong>3</strong></MathBlock>

    <p key="b4-lp2"><strong>Problem 2.</strong> How much force needs to be applied to a lever with a mechanical advantage of 5 to lift a 1500 N object?</p>
    <p key="b4-lp2s"><strong>Solution.</strong> Given: mechanical advantage = 5, Output force = 1500 N, Input force = ?</p>
    <MathBlock key="b4-lp2m">Input force = <Frac n="Output force" d="Mechanical advantage" /> = <Frac n="1500 N" d="5" /> = <strong>300 N</strong></MathBlock>
    <div key="b4-fig17" style={{ textAlign: "center", margin: "8px 0" }}>
      <img src={FIG_17} alt="Fig. 3.17" style={{ maxWidth: "28%", height: "auto" }} />
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.17</div>
    </div>

    <p key="b4-lp3"><strong>Problem 3.</strong> What is the mechanical advantage of a lever arm with an effort arm of 180 cm and a load arm of 60 cm?</p>
    <p key="b4-lp3s"><strong>Solution.</strong> Here, effort arm, <em>l<Sub c="2" /></em> = 180 cm, load arm, <em>l<Sub c="1" /></em> = 60 cm</p>
    <MathBlock key="b4-lp3m">mechanical advantage = <Frac n={<>l<Sub c="2" /></>} d={<>l<Sub c="1" /></>} /> = <Frac n="180" d="60" /> = <strong>3</strong></MathBlock>

    <p key="b4-lp4"><strong>Problem 4.</strong> Calculate the ideal mechanical advantage of a lever in which the effort arm is 75 cm and the load arm is 5 cm.</p>
    <p key="b4-lp4s"><strong>Solution.</strong> Given, effort arm (<em>l<Sub c="2" /></em>) = 75 cm, load arm (<em>l<Sub c="1" /></em>) = 5 cm</p>
    <MathBlock key="b4-lp4m">Ideal mechanical advantage = <Frac n="75" d="5" /> = <strong>15</strong></MathBlock>

    <p key="b4-lp5"><strong>Problem 5.</strong> Draw a simple diagram for a fire tongs and mark on it the fulcrum F and the points of application of load L and effort E. (<em>i</em>) Name the class of lever. (<em>ii</em>) If load arm is 25 cm and effort arm is 5 cm, what is the mechanical advantage?</p>
    <p key="b4-lp5s"><strong>Solution.</strong> (<em>i</em>) Fig. 3.18 shows a fire tongs in which effort E is positioned between fulcrum F and load L. Therefore it is a <strong>class-3 lever.</strong></p>
    <p key="b4-lp5s2">(<em>ii</em>) Given, load arm (<em>l<Sub c="1" /></em>) = 25 cm, effort arm (<em>l<Sub c="2" /></em>) = 5 cm</p>
    <div key="b4-fig18a" style={{ textAlign: "center", margin: "8px 0" }}>
      <img src={FIG_18A} alt="Fig. 3.18 Coal tongs" style={{ maxWidth: "28%", height: "auto" }} />
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.18. Coal tongs</div>
    </div>
    <MathBlock key="b4-lp5m">∴ mechanical advantage = <Frac n={<>l<Sub c="2" /></>} d={<>l<Sub c="1" /></>} /> = <Frac n="5" d="25" /> = <Frac n="1" d="5" /> = 0·2</MathBlock>

    <p key="b4-lp6"><strong>Problem 6.</strong> A cook uses the fire tongs of length 28 cm to lift a piece of burning coal of mass 250 g. If he applies the effort at a distance of 7 cm from the fulcrum, find the effort. Take <em>g</em> = 10 ms<Sup c="–2" />.</p>
    <p key="b4-lp6s"><strong>Solution.</strong> A fire tongs is a class-3 lever which has effort at the centre. Given,</p>
    <MathBlock key="b4-lp6m1">Load <em>L</em> = 250 gf = 0·25 kgf = 0·25 <Times /> 10 N = 2·5 N</MathBlock>
    <p key="b4-lp6s2">load arm (<em>l<Sub c="1" /></em>) = 28 cm, effort arm (<em>l<Sub c="2" /></em>) = 7 cm</p>
    <p key="b4-lp6s3">By principle of moments,  load <Times /> load arm = effort <Times /> effort arm</p>
    <MathBlock key="b4-lp6m2">
      ∴ effort = load <Times /> <Frac n="load arm" d="effort arm" /> = 2·5 <Times /> <Frac n="2·8" d="7" /> = <strong>10 N</strong>
    </MathBlock>

    <p key="b4-lp7"><strong>Problem 7.</strong> A nut which can be broken by applying a force of 40 kgf, is broken by using a nut cracker having its handle 20 cm long, by placing it at a distance 2 cm from the hinge. Calculate the minimum force required to break the nut.</p>
    <p key="b4-lp7s"><strong>Solution.</strong> Given, load = 40 kgf, effort = ?</p>
    <MathBlock key="b4-lp7m1">Load arm (<em>l<Sub c="1" /></em>) = 2 cm,  effort arm (<em>l<Sub c="2" /></em>) = 20 cm</MathBlock>
    <p key="b4-lp7s2">According to principle of moments:  load <Times /> load arm = effort <Times /> effort arm</p>
    <p key="b4-lp7s3">or  40 kgf × 2 cm = E × 20 cm</p>
    <MathBlock key="b4-lp7m2">E = <Frac n="40 × 2" d="20" /> kgf = <strong>4 kgf</strong></MathBlock>

    <p key="b4-lp8"><strong>Problem 8.</strong> The diagram below shows a lever in use.</p>
    <div key="b4-fig19" style={{ textAlign: "center", margin: "8px 0" }}>
      <img src={FIG_19} alt="Fig. 3.19" style={{ maxWidth: "38%", height: "auto" }} />
      <div style={{ fontSize: 13.5, marginTop: 4 }}>Load = 27 kgf</div>
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.19</div>
    </div>
    <p key="b4-lp8q">(<em>a</em>) What is the class of this lever? Give one example also.<br/>
    (<em>b</em>) (<em>i</em>) State the principle of moments applied to this lever and<br/>
    (<em>ii</em>) calculate its mechanical advantage if AB = 2 m and FA = 0·2 m.<br/>
    (<em>c</em>) Calculate the effort needed to lift the load.</p>
    <p key="b4-lp8sa"><strong>Solution.</strong> (<em>a</em>) Since the fulcrum is in between load and effort, it is a <strong>class-1 lever.</strong> A seesaw is an example of this case.</p>
    <p key="b4-lp8sb">(<em>b</em>) (<em>i</em>) According to principle of moments:  Load <Times /> FA = Effort <Times /> FB</p>
    <p key="b4-lp8sc">(<em>ii</em>) Here, AB = 2 m, FA = 0·2 m, FB = AB – FA = 2 – 0·2 = 1·8 m</p>
    <MathBlock key="b4-lp8m1">∴ mechanical advantage = <Frac n="effort arm" d="load arm" /> = <Frac n="FB" d="FA" /> = <Frac n="1·8" d="0·2" /> = <strong>9</strong></MathBlock>
    <p key="b4-lp8sd">(<em>iii</em>) Given: load = 27 kgf, M.A. = 9</p>
    <MathBlock key="b4-lp8m2">Since, M.A. = <Frac n="load" d="effort" /> ⟹ effort = <Frac n="load" d="M.A." /> = <Frac n="27" d="9" /> = <strong>3 kgf</strong></MathBlock>

    <p key="b4-lp9"><strong>Problem 9.</strong> A man opens a nut by applying a force of 150 N by using a lever handle of length 0·2 m. What should be the length of the handle if he wants to open it by applying a force of 30 N?</p>
    <p key="b4-lp9s"><strong>Solution.</strong> Given, effort = 150 N, effort arm = 0·2 m.  When effort = 30 N, effort arm = ?</p>
    <p key="b4-lp9s2">In both cases, load and load arms remain same. Hence,  150 × 0·2 = 30 × effort arm</p>
    <MathBlock key="b4-lp9m">Effort arm (length of handle) = <Frac n="150 × 0·2" d="30" /> = <strong>1 m</strong></MathBlock>
  </NumericalSection>,

  // Problems for Practice
  <ProblemsBox key="prob-s318">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>How much force do you need to lift a 20 N object with a lever of mechanical advantage of 2? <strong>[Ans. 10 N]</strong></li>
      <li style={{ marginBottom: 6 }}>Calculate the mechanical advantage of a lever having effort arm of 1·2 m and load arm of 3·6 m. <strong>[Ans. <Frac n="1" d="3" />]</strong></li>
      <li style={{ marginBottom: 6 }}>The length of a lever is 2 m. Calculate the mechanical advantage if the fulcrum is situated at a distance of 40 cm from the effort. <strong>[Ans. 0·25]</strong></li>
      <li style={{ marginBottom: 6 }}>A force of 50 N is applied to the end of a lever to lift a rock that is 250 N. What is the mechanical advantage? <strong>[Ans. 5]</strong></li>
    </ol>
  </ProblemsBox>,

  // Solutions/Explanations
  <div key="b4-solhd-lever" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b4-sol1" style={{ margin: "0 0 6px" }}>
    <strong>1.</strong> Here, M.A. = 2, output force = 20 N<br/>
    input force = <Frac n="output force" d="M.A." /> = <Frac n="20" d="2" /> = <strong>10 N</strong>
  </p>,
  <p key="b4-sol2" style={{ margin: "0 0 6px" }}>
    <strong>2.</strong> Here, <em>l<Sub c="2" /></em> = 1·2 m, <em>l<Sub c="1" /></em> = 3·6 m<br/>
    M.A. = <Frac n={<>l<Sub c="2" /></>} d={<>l<Sub c="1" /></>} /> = <Frac n="1·2" d="3·6" /> = <strong><Frac n="1" d="3" /></strong>
  </p>,
  <p key="b4-sol3" style={{ margin: "0 0 6px" }}>
    <strong>3.</strong> Length of lever = 2 m = 200 cm, <em>l<Sub c="2" /></em> = 40 cm, <em>l<Sub c="1" /></em> = 160 cm<br/>
    M.A. = <Frac n="40" d="160" /> = <strong>0·25</strong>
  </p>,
  <p key="b4-sol4" style={{ margin: "0 0 18px" }}>
    <strong>4.</strong> output force = 250 N, input force = 50 N<br/>
    M.A. = <Frac n="250" d="50" /> = <strong>5</strong>
  </p>,

  // ── Section 3.19 PULLEY ──
  <SecHd key="sec-s319" id="s319" label="3.19" title="Pulley" />,
  <p key="b4-p319-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Fig. 3.20 shows a picture of <strong>simple pulley.</strong> It could be a metallic or wooden disc with a grooved rim around which a rope or string is passed. The disc rotates about an axle which passes through its centre. The axle is fixed rigidly to a frame by means of a nail. Most of the times either single pulley or combinations of pulleys are used. These pulleys are fixed in a frame called as <strong>block.</strong> A rope or chain (string) which winds around the grooved rim of the pulley is known as <strong>tackle.</strong>
  </p>,
  <p key="b4-p319-2" style={{ textIndent: 28 }}>
    A single pulley can be used in two ways: (<em>i</em>) As a fixed pulley by keeping the axis of rotation fixed in position, (<em>ii</em>) as a moving pulley by not fixing the axis of rotation, <em>i.e.,</em> by allowing the whole frame to move.
  </p>,
  <div key="b4-fig320" style={{ textAlign: "center", margin: "10px 0" }}>
    <img src={FIG_20} alt="Fig. 3.20 A simple pulley" style={{ maxWidth: "28%", height: "auto" }} />
    <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.20. A simple pulley and its various parts</div>
  </div>,

  <SubHd key="sub-s319-types" id="s319-types" label="" title="Type of Pulleys" />,
  <p key="b4-p319-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Pulleys are used to raise or lower objects. This can be achieved by tying the object with one end of the rope and applying an external force to the other end of the rope which runs over the pulley (Fig. 3.21). The object which has to be raised or lowered is called a <strong>load.</strong> The external force is called as <strong>effort.</strong> Depending upon the tasks or situations, different types of pulleys are used.
  </p>,

  <SubSubHd key="sub-s319-fixed" id="s319-fixed" label="" title="(A) Fixed Pulley" />,
  <p key="b4-p319-4" style={{ textIndent: 28, textAlign: "justify" }}>
    In this type of pulley system, the pulley is attached to a rigid support and the rope is attached to the object (load). The wheel and axle of the fixed pulley are designed to stay in one place — the axis of rotation of the pulley is held fixed.
  </p>,
  <DefBox key="def-s319-fixed">
    A pulley in which axis of rotation is fixed is called a <strong>fixed pulley.</strong>
  </DefBox>,
  <p key="b4-p319-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Fig. 3.21(<em>a</em>) shows a fixed pulley in which axle is fixed to a rigid support. An inextensible string of negligible mass passes around the grooved rim of the pulley. One end of the string is connected to the load L, whereas the effort E is applied to the other free end. Both, load L and effort E acts downward. Tension T in the string is upwards and same throughout. Tension T is a force which acts along the length of the string and supports the load, <em>i.e.,</em> L = T. Its unit in SI is Newton (N). Fixed pulley is used for lifting small objects such as a water bucket from a deep well.
  </p>,
  <p key="b4-p319-6" style={{ textIndent: 28, textAlign: "justify" }}>
    In this case, the objective is to move the load upwards. Without the pulley, an upward force is required to move the load upward. By using the fixed pulley system, you pull one side of the rope downwards (effort) and the other side (load) upwards. <em>The pulley only changes the direction of effort; it does not reduce the effort.</em> Therefore, fixed pulley system simplifies the work by aligning the effort with the force of gravity. It makes it easier to move the object upward but without reducing the effort. In this case, effort and load move the same distance. A very common example of a fixed pulley system is a flag pole, where a fixed pulley is used to raise the flag upward by applying a downward force (Fig. 3.21(<em>b</em>)).
  </p>,
  <div key="b4-fig321" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "10px 0" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_21A} alt="Fig. 3.21(a) Fixed pulley" style={{ maxWidth: 90, height: "auto" }} />
      <div style={{ fontSize: 12.5, color: "#555" }}>(<em>a</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_21B} alt="Fig. 3.21(b) Flag pole" style={{ maxWidth: 100, height: "auto" }} />
      <div style={{ fontSize: 12.5, color: "#555" }}>(<em>b</em>)</div>
    </div>
  </div>,
  <div key="b4-fig321-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 10 }}>Fig. 3.21. Fixed pulley</div>,

  <SubHd key="sub-s319-mavr" id="s319-mavr" label="" title="M.A., V.R. and Efficiency of a Single Fixed Pulley" />,
  <p key="b4-p319-7" style={{ textIndent: 28, textAlign: "justify" }}>
    If we consider an ideal situation, <em>i.e.,</em> when (<em>i</em>) we neglect the mass of the string and (<em>ii</em>) friction at the axle and in pulley bearings, then in a state of equilibrium, we can write
  </p>,
  <MathBlock key="b4-319m1">L = T &nbsp;&nbsp;&nbsp;&nbsp; E = T &nbsp;&nbsp;&nbsp;&nbsp; ∴ L = E</MathBlock>,
  <p key="b4-p319-8" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, in case of a single pulley, the effort required to lift a load is equal to the load itself. In real situations, there is always friction at the axle or in the pulley bearings, so that the effort required is slightly larger than the load. In ideal situation,
  </p>,
  <MathBlock key="b4-319m2">M.A. = <Frac n="Load" d="Effort" /> = <Frac n="L" d="E" /> = <strong>1</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b4-p319-9" style={{ textIndent: 28, textAlign: "justify" }}>
    This means that a <strong>fixed pulley does not give any mechanical advantage.</strong> If the point of application of effort E moves by a distance <em>d<Sub c="E" /></em> downward, then the load will move a distance <em>d<Sub c="L" /></em> upward such that <em>d<Sub c="L" /></em> = <em>d<Sub c="E" /></em> = <em>d</em>. Therefore,
  </p>,
  <MathBlock key="b4-319m3">Velocity ratio = <Frac n={<>d<Sub c="E" /></>} d={<>d<Sub c="L" /></>} /> = <Frac n="d" d="d" /> = <strong>1</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...(2)</MathBlock>,
  <MathBlock key="b4-319m4">Efficiency η = <Frac n="M.A." d="V.R." /> = <strong>1  or  100%</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...(3)</MathBlock>,
  <p key="b4-p319-10" style={{ textIndent: 28, textAlign: "justify" }}>
    In actual situations, due to the presence of force of friction the efficiency is always less than 100%. A fixed pulley is only used to <em>change the direction of effort applied,</em> <em>i.e.,</em> with a fixed pulley effort can be applied conveniently in any desired direction. Note that load and effort move the same distance but in opposite directions.
  </p>,

  <SubSubHd key="sub-s319-movable" id="s319-movable" label="" title="(B) A Single Movable Pulley" />,
  <p key="b4-p319-11" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us consider a slightly different situation where the pulley is flipped upside down and attached to a load instead of the ceiling (Fig. 3.22 (<em>a</em>)). A rope is attached to the fixed point in the ceiling, it goes over the pulley and the other end of the rope is left free. Effort E is applied to the free end of the rope. This arrangement is called a <strong>movable pulley.</strong>
  </p>,
  <DefBox key="def-s319-movable">
    A pulley whose axis of rotation is movable (<em>i.e.,</em> not fixed) is called a <strong>movable pulley.</strong>
  </DefBox>,
  <p key="b4-p319-12" style={{ textIndent: 28, textAlign: "justify" }}>
    This simple modification completely changes the working of the system. When you pull the rope, it moves and the pulley lifts the object. The effort and the movement of the load are in the same direction. This system is perfect for raising the object below you to a higher level.
  </p>,
  <p key="b4-p319-13" style={{ textIndent: 28, textAlign: "justify" }}>
    In the present case, the load is supported by two segments of the rope instead of one (as in case of fixed pulley). There is one downward force of 100 N (Load L) and two upward forces (each equal T = 50 N) caused by two same parts of the rope which are supporting the pulley. The force of tension in the rope is constant along the length.
  </p>,
  <div key="b4-fig322" style={{ display: "flex", justifyContent: "center", gap: 30, margin: "12px 0" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_22A} alt="Fig. 3.22(a)" style={{ maxWidth: 80, height: "auto" }} />
      <div style={{ fontSize: 12.5, color: "#555" }}>(<em>a</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_22B} alt="Fig. 3.22(b)" style={{ maxWidth: 60, height: "auto" }} />
      <div style={{ fontSize: 12.5, color: "#555" }}>(<em>b</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_22C} alt="Fig. 3.22(c)" style={{ maxWidth: 140, height: "auto" }} />
      <div style={{ fontSize: 12.5, color: "#555" }}>(<em>c</em>)</div>
    </div>
  </div>,
  <div key="b4-fig322-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 10 }}>Fig. 3.22</div>,

  <SubHd key="sub-s319-movmavr" id="s319-movmavr" label="" title="M.A., V.R. and Efficiency of a Single Movable Pulley" />,
  <p key="b4-p319-14" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider Fig. 3.22 (<em>b</em>), again. If we neglect the force of friction and axle and pulley bearings, the load L is balanced by the tension T in two segments of the string and the effort E is balanced by the tension T at the free end. Therefore, we can write in equilibrium condition:
  </p>,
  <MathBlock key="b4-319m5">L = T + T = 2T &nbsp;&nbsp; and &nbsp;&nbsp; E = T &nbsp;&nbsp; ∴ E = <Frac n="L" d="2" /></MathBlock>,
  <p key="b4-p319-15" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, using a single movable pulley, the load can be moved by applying an effort which is half the load. Thus, a single movable pulley acts like a <strong>force multiplier.</strong>
  </p>,
  <MathBlock key="b4-319m6">Mechanical advantage = <Frac n="Load" d="Effort" /> = <Frac n="L" d="E" /> = <Frac n="2T" d="T" /> = <strong>2</strong> &nbsp;&nbsp;&nbsp;&nbsp;...(4)</MathBlock>,
  <p key="b4-p319-16" style={{ textIndent: 28, textAlign: "justify" }}>
    Further, from Fig. 3.22 (<em>c</em>), when the free end of the rope is pulled downward by the effort by a distance 2<em>d</em>, the load moves upward by <em>d</em>. This is because the segments of the rope on both sides of the pulley move upward by a distance <em>d</em>. In other words, <em>d<Sub c="E" /></em> = 2<em>d</em> and <em>d<Sub c="L" /></em> = <em>d</em>. Therefore,
  </p>,
  <MathBlock key="b4-319m7">Velocity ratio = <Frac n="distance moved by effort" d="distance moved by load" /> = <Frac n="2d" d="d" /> = <strong>2</strong> &nbsp;&nbsp;&nbsp;&nbsp;...(5)</MathBlock>,
  <MathBlock key="b4-319m8">Efficiency η = <Frac n="M.A." d="V.R." /> = <Frac n="2" d="2" /> = <strong>1  or  100%</strong> &nbsp;&nbsp;&nbsp;&nbsp;...(6)</MathBlock>,
  <p key="b4-p319-17" style={{ textIndent: 28, textAlign: "justify" }}>
    However, for an actual pulley, the effort required to pull up a load will be slightly larger than L/2 and mechanical advantage will be less than 2. In this case the velocity ratio will not change, hence, efficiency will be less than 100%.
  </p>,

  <SubHd key="sub-s319-dirchange" id="s319-dirchange" label="" title="Method to Change the Direction of Effort Using a Single Pulley" />,
  <p key="b4-p319-18" style={{ textIndent: 28, textAlign: "justify" }}>
    In a single movable pulley, effort has to be applied in upward direction, which is inconvenient. Therefore, as shown in Fig. 3.22 (<em>c</em>), a movable pulley in combination with a fixed pulley can be used to change the direction of effort from upward to downward direction. Instead of pulling up on the free end of the rope, we can now pull it downward. Again, in this case two upward forces (50 N each) and one downward force 100 N act on the pulley 1. The mechanical advantage in this case is again 2. Because, pulley 2 is again a fixed pulley, it has M.A. = 1. For pulley 1, M.A. = 2 as discussed earlier.
  </p>,
  <DefBox key="def-s319-note">
    <em>Mechanical advantage and velocity ratio of the movable pulley arrangement shown in Fig. 3.22 (c) is same as that of a single movable pulley.</em>
  </DefBox>,

  <p key="b4-p319-tab-intro" style={{ marginTop: 12 }}>
    The table below summarises the differences between a single fixed pulley and a single movable pulley.
  </p>,
  <p key="b4-p319-tabcap" style={{ fontWeight: 700, textAlign: "center", marginBottom: 8 }}>
    Comparison between a single fixed pulley and a single movable pulley
  </p>,
  <PulleyComparisonTable key="tbl-b4-pulley" />,
];


// ── BATCH 5: §3.20 Combination of Pulleys + Pulley Problems + §3.21 Inclined Plane + §3.22 start ──

const FIG_23 = CONTENT_IMAGES.CONTENT_IMAGE_D6BB9FAAFB0CF52C53A5;
const FIG_24A = CONTENT_IMAGES.CONTENT_IMAGE_94307ECA2AEA39575AFD;
const FIG_24B = CONTENT_IMAGES.CONTENT_IMAGE_09EEF6CA839B5DC86468;
const FIG_24C = CONTENT_IMAGES.CONTENT_IMAGE_E333FA463BB8009CE8CA;
const FIG_25A = CONTENT_IMAGES.CONTENT_IMAGE_56422FB650917AA854D2;
const FIG_25B = CONTENT_IMAGES.CONTENT_IMAGE_18A6EC38C48D4F04C517;
const FIG_26 = CONTENT_IMAGES.CONTENT_IMAGE_78E0E5BD1F12FFE5824F;
const FIG_27A = CONTENT_IMAGES.CONTENT_IMAGE_41E3AB1FAE97220D2C28;
const FIG_27B = CONTENT_IMAGES.CONTENT_IMAGE_832BF0960299C6D597E6;
const FIG_28 = CONTENT_IMAGES.CONTENT_IMAGE_81F198409C4C0AED0644;
const FIG_29 = CONTENT_IMAGES.CONTENT_IMAGE_FD7A62BCA2510C1D4FE9;
const FIG_30A = CONTENT_IMAGES.CONTENT_IMAGE_C8964C0CB776BEB86ABD;
const FIG_30B = CONTENT_IMAGES.CONTENT_IMAGE_77DE1032BF0144B70831;
const FIG_31 = CONTENT_IMAGES.CONTENT_IMAGE_488E47F6E00712D22AE6;

const content_b5 = [
  // ── 3.20 COMBINATION OF PULLEYS ──
  <SecHd key="sec-s320" id="s320" label="3.20" title="Combination of Pulleys" />,
  <p key="b5-p320-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In our daily life, we encounter situations where a heavy load is required to be shifted from one place to another. In such circumstances, pulleys with mechanical advantage more than 2 are required. Hence, a single movable pulley is not enough. To achieve the M.A. &gt; 2, a combination of several pulleys with one strong rope is used. The combination of pulleys can be achieved in two ways discussed below.
  </p>,

  <SubHd key="sub-s320-type1" id="s320-type1" label="" title="(i) Use of One Fixed Pulley and Other Movable Pulleys" />,
  <p key="b5-p320-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Fig. 3.23 displays a system of 3 movable pulleys A, B and C used with a fixed pulley D. Each movable pulley is attached with a separate string. As noted earlier, the tension T is same in an individual string, but different strings have different tensions. Tension will be maximum in the string of the pulley to which load is attached. Hence, in Fig. 3.23, T<Sub c="1" /> is the largest among all tensions in the strings used.
  </p>,

  <SubSubHd key="sub-s320-ma" id="s320-ma" label="" title="Mechanical Advantage" />,
  <p key="b5-p320-3">In equilibrium condition, effort E will be balanced by the tension T<Sub c="3" />, <em>i.e.,</em></p>,
  <div key="b5-fig323" style={{ display: "flex", justifyContent: "center", gap: 30, margin: "10px 0", alignItems: "flex-start" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_23} alt="Fig. 3.23" style={{ maxWidth: 120, height: "auto" }} />
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.23</div>
    </div>
    <div style={{ fontSize: 14, lineHeight: 2, marginTop: 10 }}>
      <MathBlock>E = T<Sub c="3" /> &nbsp;&nbsp;&nbsp;&nbsp; ...(1)</MathBlock>
    </div>
  </div>,
  <p key="b5-p320-4" style={{ textIndent: 28 }}>
    For pulley A, supporting load L, two segments of same string pass over it and each has a tension T<Sub c="1" />. Therefore,
  </p>,
  <MathBlock key="b5-320m1">L = T<Sub c="1" /> + T<Sub c="1" /> = 2T<Sub c="1" /> &nbsp;&nbsp; or &nbsp;&nbsp; T<Sub c="1" /> = <Frac n="L" d="2" /> &nbsp;&nbsp;&nbsp;&nbsp; ...(2)</MathBlock>,
  <p key="b5-p320-5">Similarly, tension T<Sub c="2" /> in the string passing over pulley B:</p>,
  <MathBlock key="b5-320m2">T<Sub c="1" /> = 2T<Sub c="2" /> &nbsp;&nbsp; ∴ &nbsp;&nbsp; T<Sub c="2" /> = <Frac n={<>T<Sub c="1" /></>} d="2" /> = <Frac n="L" d={<>2<Sup c="2" /></>} /> &nbsp;&nbsp;&nbsp;&nbsp; ...(4)</MathBlock>,
  <p key="b5-p320-6">Similarly, tension T<Sub c="3" /> in the string passing over pulley C:</p>,
  <MathBlock key="b5-320m3">T<Sub c="2" /> = 2T<Sub c="3" /> &nbsp;&nbsp; ∴ &nbsp;&nbsp; T<Sub c="3" /> = <Frac n={<>T<Sub c="2" /></>} d="2" /> = <Frac n="L" d={<>2<Sup c="3" /></>} /> &nbsp;&nbsp;&nbsp;&nbsp; ...(5)</MathBlock>,
  <MathBlock key="b5-320m4">∴ &nbsp; E = <Frac n="L" d={<>2<Sup c="3" /></>} /> &nbsp;&nbsp; and &nbsp;&nbsp; M.A. = <Frac n="load" d="effort" /> = <Frac n="L" d="E" /> = <Frac n={<>2<Sup c="3" /> × T<Sub c="3" /></>} d={<>T<Sub c="3" /></>} /> = <strong>2<Sup c="3" /></strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(8)</MathBlock>,
  <p key="b5-p320-7">We can generalise this result for <em>n</em> movable pulleys with 1 fixed pulley:</p>,
  <MathBlock key="b5-320m5"><strong>M.A. = 2<Sup c="n" /></strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(9)</MathBlock>,

  <SubSubHd key="sub-s320-vr" id="s320-vr" label="" title="Velocity Ratio" />,
  <p key="b5-p320-8" style={{ textIndent: 28, textAlign: "justify" }}>
    As shown in Fig. 3.23, one end of each string which passes over a movable pulley is fixed, therefore, the other end of the string moves up double the distance moved by the axle of the movable pulley. When the load L moves up a distance x (<em>i.e.,</em> d<Sub c="L" /> = x), the string connected to the axle of pulley B moves up by 2x. Similarly, string connected to pulley C moves up by 2² x. Following the same logic, effort E moves down by distance d<Sub c="E" /> = 2³ x. Hence,
  </p>,
  <MathBlock key="b5-320m6">V.R. = <Frac n="distance moved by effort" d="distance moved by load" /> = <Frac n={<>2<Sup c="3" />x</>} d="x" /> = <strong>2<Sup c="3" /></strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(10)</MathBlock>,
  <p key="b5-p320-9">Generalising to <em>n</em> movable pulleys:</p>,
  <MathBlock key="b5-320m7"><strong>V.R. = 2<Sup c="n" /></strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(11)</MathBlock>,
  <MathBlock key="b5-320m8">Efficiency η = <Frac n="M.A." d="V.R." /> = <Frac n={<>2<Sup c="n" /></>} d={<>2<Sup c="n" /></>} /> = <strong>1  or  100%</strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(12)</MathBlock>,

  <SubHd key="sub-s320-bt" id="s320-bt" label="" title="(ii) Block and Tackle System" />,
  <p key="b5-p320-10" style={{ textIndent: 28, textAlign: "justify" }}>
    Greater mechanical advantage can be achieved by adding more pulleys. In Fig. 3.24, the same load of 100 N is now supported by two movable pulleys, 1 and 2, which are in turn supported by two fixed pulleys 3 and 4. The load 100 N is supported equally (25 N each) by four strings (Fig. 3.24 (<em>b</em>)). Hence, in this case,
  </p>,
  <MathBlock key="b5-320m9">M.A. = <Frac n="Load" d="Effort" /> = <Frac n="100 N" d="25 N" /> = <strong>4</strong></MathBlock>,
  <div key="b5-fig324" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "12px 0" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_24A} alt="Fig. 3.24(a)" style={{ maxWidth: 90, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>a</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_24B} alt="Fig. 3.24(b)" style={{ maxWidth: 80, height: "auto" }} />
      <div style={{ fontSize: 12.5, color: "#333" }}>100 N</div>
      <div style={{ fontSize: 12, color: "#555" }}>(<em>b</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_24C} alt="Fig. 3.24(c)" style={{ maxWidth: 110, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>c</em>)</div>
    </div>
  </div>,
  <div key="b5-fig324-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 10 }}>Fig. 3.24</div>,
  <p key="b5-p320-11" style={{ textIndent: 28, textAlign: "justify" }}>
    Using such a pulley system occupies large space. Therefore, this system can be equivalently modified (without altering the M.A.) to the one shown in Fig. 3.24 (<em>c</em>). Here, individual pulleys are combined into two blocks. Pulleys 1 and 2 constitute one moveable block attached to the load and pulleys 3 and 4 constitute another fixed block attached to the ceiling. Such a system of two blocks (of which the lower block is movable and upper block is fixed) is known as <strong>block and tackle system.</strong> Fixed pulleys change the direction of effort whereas movable pulleys reduce the efforts. To determine the mechanical advantage, we simply need to count the rope sections which support the moving pulleys.
  </p>,
  <p key="b5-p320-12" style={{ textIndent: 28, textAlign: "justify" }}>
    This system of pulleys uses two blocks of pulleys. One of the blocks (upper) is attached to a fixed support and the other (lower) block having several pulleys is movable. A strong inextensible string of negligible mass passes over these pulleys. One end of the string is attached to the hook of the upper block (when number of pulleys in both blocks is equal) or it is attached to the hook of the lower block (when the upper block has more pulleys than the lower). This allows effort to be applied in the downward direction.
  </p>,
  <div key="b5-fig325" style={{ display: "flex", justifyContent: "center", gap: 40, margin: "10px 0" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_25A} alt="Fig. 3.25(a) Block and tackle 4 pulleys" style={{ maxWidth: 70, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>a</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_25B} alt="Fig. 3.25(b) Block and tackle 5 pulleys" style={{ maxWidth: 70, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>b</em>)</div>
    </div>
  </div>,
  <div key="b5-fig325-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 10 }}>Fig. 3.25. (<em>a</em>) Block and tackle for 4 pulleys; (<em>b</em>) for 5 pulleys</div>,

  <SubSubHd key="sub-s320-btma" id="s320-btma" label="" title="Mechanical Advantage" />,
  <p key="b5-p320-13">In Fig. 3.25 (<em>a</em>), the tension T in four strands of the same string supports the load L. Hence,</p>,
  <MathBlock key="b5-320m10">L = T + T + T + T = 4T &nbsp;&nbsp; and &nbsp;&nbsp; E = T &nbsp;&nbsp; ∴ &nbsp;&nbsp; E = <Frac n="L" d="4" /></MathBlock>,
  <MathBlock key="b5-320m11">M.A. = <Frac n="L" d="E" /> = <Frac n="4T" d="T" /> = <strong>4</strong></MathBlock>,
  <p key="b5-p320-14">In Fig. 3.25 (<em>b</em>), the tension T in five strands supports the load L. Hence, L = 5T and E = T:</p>,
  <MathBlock key="b5-320m12">M.A. = <Frac n="L" d="E" /> = <Frac n="5T" d="T" /> = <strong>5</strong></MathBlock>,
  <p key="b5-p320-15">In general, if there are <em>n</em> total number of pulleys in both blocks:</p>,
  <MathBlock key="b5-320m13">E = <Frac n="L" d="n" /> = <Frac n="Load" d="number of pulleys" /> &nbsp;&nbsp;&nbsp;&nbsp; ...(13)</MathBlock>,
  <MathBlock key="b5-320m14"><strong>M.A. = <Frac n="Load" d="Effort" /> = <Frac n="nT" d="T" /> = n</strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(14)</MathBlock>,
  <p key="b5-p320-16" style={{ fontStyle: "italic" }}>Therefore, mechanical advantage is equal to total number of pulleys in both blocks.</p>,

  <SubSubHd key="sub-s320-btvr" id="s320-btvr" label="" title="Velocity Ratio" />,
  <p key="b5-p320-17" style={{ textIndent: 28, textAlign: "justify" }}>
    For a system having <em>n</em> pulleys, if the load L moves upward a distance d, each segment of the string supporting the load will be loosened by a length d. Hence, the effort end of the string will move a distance <em>nd</em> downward, <em>i.e.,</em> if d<Sub c="L" /> = d, then d<Sub c="E" /> = <em>nd</em>. Therefore,
  </p>,
  <MathBlock key="b5-320m15">V.R. = <Frac n={<>d<Sub c="E" /></>} d={<>d<Sub c="L" /></>} /> = <Frac n="nd" d="d" /> = <strong><em>n</em></strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(15)</MathBlock>,
  <p key="b5-p320-18" style={{ fontStyle: "italic" }}>In other words, the velocity ratio is equal to the number of strands or sections of the string which support the load.</p>,
  <MathBlock key="b5-320m16">Efficiency η = <Frac n="M.A." d="V.R." /> = <Frac n="n" d="n" /> = <strong>1  or  100%</strong> &nbsp;&nbsp;&nbsp;&nbsp; ...(16)</MathBlock>,
  <p key="b5-p320-19" style={{ textIndent: 28 }}>
    Note that only for ideal situation, efficiency is 100%. In actual situations, due to force of friction in the bearings, and mass of string and blocks, energy loss is always there. As a result efficiency is always less than 100%.
  </p>,

  // ── Pulley Solved Problems ──
  <NumericalSection key="num-pulley" topic="PULLEY">
    <p key="b5-pf-hd" style={{ fontWeight: 700, textDecoration: "underline", marginBottom: 6 }}>FORMULAE AND UNITS</p>
    <p key="b5-pf1">1. Mechanical advantage for fixed pulley, M.A. = <Frac n="load" d="effort" /> = 1</p>
    <p key="b5-pf2">2. Velocity ratio of fixed pulley, V.R. = <Frac n={<>d<Sub c="E" /></>} d={<>d<Sub c="L" /></>} /> = 1</p>
    <p key="b5-pf3">3. For ideal fixed pulley, η = <Frac n="M.A." d="V.R." /> = 1 or 100%</p>
    <p key="b5-pf4">4. For single movable pulley: M.A. = V.R. = 2;  Efficiency η = <Frac n="2" d="2" /> = 1 or 100%</p>
    <p key="b5-pf5">5. For a system of <em>n</em> movable pulleys with 1 fixed pulley:  M.A. = 2<Sup c="n" />,  V.R. = 2<Sup c="n" /></p>
    <p key="b5-pf6">6. Block and tackle system having <em>n</em> total pulleys:  M.A. = V.R. = <em>n</em>,  η = 1 or 100%</p>

    <p key="b5-pp1"><strong>Problem 1.</strong> The adjacent Fig. 3.26 shows a fixed pulley used by a boy to lift a load of 400 N through a vertical height of 5 m in 10 s. The effort applied by the boy on the other end of the rope is 480 N.</p>
    <p key="b5-pp1q">
      (<em>a</em>) What is the velocity ratio of the pulley? &nbsp;
      (<em>b</em>) What is the mechanical advantage? &nbsp;
      (<em>c</em>) Calculate the efficiency of the pulley. &nbsp;
      (<em>d</em>) Why is the efficiency of the pulley not 100%? &nbsp;
      (<em>e</em>) What is the energy gained by the load in 10 s? &nbsp;
      (<em>f</em>) How much power was developed by the boy in raising the load? &nbsp;
      (<em>g</em>) The boy has to apply an effort which is greater than the load he is lifting. What is the justification for using the pulley?
    </p>
    <div key="b5-fig326" style={{ textAlign: "center", margin: "8px 0" }}>
      <img src={FIG_26} alt="Fig. 3.26" style={{ maxWidth: 100, height: "auto" }} />
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.26</div>
    </div>
    <p key="b5-pp1sa"><strong>Solution.</strong> (<em>a</em>) This is a fixed pulley system. When the effort moves a distance d downwards, the load moves a distance d upwards. Hence,</p>
    <MathBlock key="b5-pp1m1">Velocity ratio = <Frac n="displacement of effort" d="displacement of load" /> = <Frac n="d" d="d" /> = <strong>1</strong></MathBlock>
    <MathBlock key="b5-pp1m2">(<em>b</em>) Mechanical advantage = <Frac n="load" d="effort" /> = <Frac n="400" d="480" /> = <Frac n="5" d="6" /> = <strong>0·83</strong></MathBlock>
    <MathBlock key="b5-pp1m3">(<em>c</em>) Efficiency, η = <Frac n="M.A." d="V.R." /> = <Frac n="0·83" d="1" /> = <strong>0·83 or 83%</strong></MathBlock>
    <p key="b5-pp1sd">(<em>d</em>) Efficiency is less than 100% because some amount of input energy is wasted in overcoming the force of friction of the pulley bearing.</p>
    <p key="b5-pp1se">(<em>e</em>) Energy gained by the load = work done = load × displacement of load = 400 × 5 = <strong>2000 J</strong></p>
    <MathBlock key="b5-pp1m4">(<em>f</em>) Power developed by the boy = <Frac n="effort × displacement" d="time" /> = <Frac n="480 × 5" d="10" /> = <strong>240 W</strong></MathBlock>
    <p key="b5-pp1sg">(<em>g</em>) Use of fixed pulley helps in changing the direction of applied force to a desired direction. Here, instead of applying an upward force, effort is in the downward direction. Hence, one may also use his/her own weight as effort.</p>

    <p key="b5-pp2"><strong>Problem 2.</strong> Calculate the mechanical advantage for the pulley system shown in Fig. 3.27.</p>
    <div key="b5-fig327" style={{ display: "flex", justifyContent: "center", gap: 30, margin: "8px 0" }}>
      <div style={{ textAlign: "center" }}>
        <img src={FIG_27A} alt="Fig. 3.27(a)" style={{ maxWidth: 100, height: "auto" }} />
      </div>
      <div style={{ textAlign: "center" }}>
        <img src={FIG_27B} alt="Fig. 3.27(b)" style={{ maxWidth: 100, height: "auto" }} />
      </div>
    </div>
    <div key="b5-fig327-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 6 }}>Fig. 3.27</div>
    <p key="b5-pp2sa"><strong>Solution.</strong> (<em>a</em>) Number of rope sections supporting movable pulleys = 3</p>
    <MathBlock key="b5-pp2m1">M.A. = <strong>3</strong>  (Efforts will be reduced to 1/3 of original value.)</MathBlock>
    <p key="b5-pp2sb">(<em>b</em>) Number of rope sections supporting movable pulleys = 4</p>
    <MathBlock key="b5-pp2m2">M.A. = <strong>4</strong>  (Efforts will be reduced to 1/4 of original value.)</MathBlock>

    <p key="b5-pp3"><strong>Problem 3.</strong> The diagram in Fig. 3.28 shows the combination of two pulleys P<Sub c="1" /> and P<Sub c="2" /> used to lift up a load W.</p>
    <p key="b5-pp3q">
      (<em>a</em>) State the kind of pulleys P<Sub c="1" /> and P<Sub c="2" />.<br/>
      (<em>b</em>) State the function of the pulley P<Sub c="2" />.<br/>
      (<em>c</em>) If the free end C of the string moves through a distance x, by what distance is the load W raised?<br/>
      (<em>d</em>) What effort E has to be applied at C to just raise the load W = 20 kgf? Neglect both the weight of the pulley P<Sub c="1" /> and the friction.
    </p>
    <div key="b5-fig328" style={{ textAlign: "center", margin: "8px 0" }}>
      <img src={FIG_28} alt="Fig. 3.28" style={{ maxWidth: 110, height: "auto" }} />
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.28</div>
    </div>
    <p key="b5-pp3sa"><strong>Solution.</strong> (<em>a</em>) Here, P<Sub c="1" /> is movable and P<Sub c="2" /> is a fixed pulley.</p>
    <p key="b5-pp3sb">(<em>b</em>) As P<Sub c="2" /> is a fixed pulley, its function is to change the direction of effort to be applied from upward direction to downward direction.</p>
    <p key="b5-pp3sc">(<em>c</em>) When the free end C of the string moves by a distance x, the load will rise by a distance x/2. This is because pulley P<Sub c="1" /> is connected via two ropes.</p>
    <p key="b5-pp3sd">(<em>d</em>) When W = 20 kgf, E = ?  Under equilibrium condition, W = 2T and E = T</p>
    <MathBlock key="b5-pp3m1">∴ Effort required is E = T = <Frac n="W" d="2" /> = <Frac n="20 kgf" d="2" /> = <strong>10 kgf</strong></MathBlock>
  </NumericalSection>,

  // Problems for Practice - Pulley
  <ProblemsBox key="prob-s320">
    <ol style={{ paddingLeft: 28, listStyleType: "decimal", listStylePosition: "outside", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
      <li style={{ marginBottom: 6 }}>A fixed pulley is driven by a 100 kg mass falling at a rate of 8·0 m in 4·0 s. It lifts a load of 75·0 kgf. Calculate: (<em>a</em>) The power input to the pulley taking the force of gravity on 1 kg as 10 N. (<em>b</em>) the efficiency of the pulley, and (<em>c</em>) the height to which the load is raised in 4·0 s. <strong>[Ans. (<em>a</em>) P<Sub c="in" /> = 2000 W; (<em>b</em>) Efficiency = 75%; (<em>c</em>) 8 m]</strong></li>
      <li style={{ marginBottom: 6 }}>A woman draws water from a well using a fixed pulley. The mass of the bucket and water together is 6 kg. The force applied by the women is 70 N. Calculate the mechanical advantage. (Take <em>g</em> = 10 m s<Sup c="–2" />). <strong>[Ans. 0·867]</strong></li>
      <li style={{ marginBottom: 6 }}>A boy lifts 40 kgf through a height of 2 m in 15 s using a single fixed pulley by applying 48 kgf effort. Find its efficiency. (1 kgf = 10 N) <strong>[Ans. 83·3%]</strong></li>
      <li style={{ marginBottom: 6 }}>A pulley system has four pulleys in all and is 60% efficient. Calculate the effort required to lift a load of 1200 N. <strong>[Ans. 500 N]</strong></li>
      <li style={{ marginBottom: 6 }}>A block and tackle system has 5 pulleys. If an effort of 2000 N is needed in the downward direction to raise a load of 9000 N, calculate: (<em>a</em>) The mechanical advantage, (<em>b</em>) The velocity ratio and, (<em>c</em>) The efficiency of the system. <strong>[Ans. (<em>a</em>) M.A. = 4·5; (<em>b</em>) V.R. = <em>n</em> = 5; Efficiency = 90%]</strong></li>
      <li style={{ marginBottom: 6 }}>A pulley system has a velocity ratio 3. It lifts a load of 150 N by an effort of 60 N. Calculate its mechanical advantage. Is the pulley system ideal? Give reason. <strong>[Ans. M.A. = 2·5, No it is not ideal]</strong></li>
    </ol>
  </ProblemsBox>,

  // Solutions/Explanations - Pulley
  <div key="b5-solhd-pulley" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b5-psol1" style={{ margin: "0 0 6px" }}>
    <strong>1.</strong> (<em>a</em>) Effort used: E = mg = 100 × 10 = 1000 N; Rate: 8 m in 4 s = 2 ms<Sup c="–1" /><br/>
    Input power = 1000 N × 2 m/s = <strong>P<Sub c="in" /> = 2000 W</strong><br/>
    (<em>b</em>) Load lifted = 75 kgf = 750 N; M.A. = <Frac n="750" d="1000" /> = 0·75; V.R. = 1<br/>
    Efficiency η = <Frac n="M.A." d="V.R." /> = <strong>0·75 = 75%</strong><br/>
    (<em>c</em>) Distance moved by load = distance moved by effort = 8 m (since V.R. = 1)
  </p>,
  <p key="b5-psol2" style={{ margin: "0 0 6px" }}>
    <strong>2.</strong> Input force = 70 N; Load = 6 × 10 = 60 N<br/>
    M.A. = <Frac n="60" d="70" /> = <strong>0·857</strong>
  </p>,
  <p key="b5-psol3" style={{ margin: "0 0 6px" }}>
    <strong>3.</strong> Effort = 480 N; Load = 400 N; M.A. = <Frac n="400" d="480" /> = 0·833; V.R. = 1<br/>
    η = <Frac n="0·833" d="1" /> = <strong>83·3%</strong>
  </p>,
  <p key="b5-psol4" style={{ margin: "0 0 6px" }}>
    <strong>4.</strong> V.R. = 4; M.A. = η × V.R. = <Frac n="60" d="100" /> × 4 = 2·4; Effort = <Frac n="1200" d="2·4" /> = <strong>500 N</strong>
  </p>,
  <p key="b5-psol5" style={{ margin: "0 0 6px" }}>
    <strong>5.</strong> n = 5, E = 2000 N, L = 9000 N<br/>
    (<em>a</em>) M.A. = <Frac n="9000" d="2000" /> = <strong>4·5</strong> (actual); Ideal M.A. = n = 5<br/>
    (<em>b</em>) V.R. = n = <strong>5</strong><br/>
    (<em>c</em>) η = <Frac n="4·5" d="5" /> = <strong>0·9 = 90%</strong>
  </p>,
  <p key="b5-psol6" style={{ margin: "0 0 18px" }}>
    <strong>6.</strong> Load = 150 N, Effort = 60 N<br/>
    M.A. = <Frac n="150" d="60" /> = <strong>2·5</strong><br/>
    Pulley is not ideal, because M.A. &lt; 3 (ideal V.R.).
    <div style={{ textAlign: "center", marginTop: 8 }}>
      <img src={FIG_29} alt="Fig. 3.29" style={{ maxWidth: 110, height: "auto" }} />
      <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.29</div>
    </div>
  </p>,

  // ── 3.21 INCLINED PLANE ──
  <SecHd key="sec-s321" id="s321" label="3.21" title="Inclined Plane" />,
  <p key="b5-p321-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Imagine, you need to lift a heavy box onto a truck. There are two different ways of doing this. You could try to lift it straight up, which would require a lot of force. Or, you could use a ramp. The ramp is an example of an <strong>inclined plane,</strong> a simple machine which is just a flat, sloping surface. It allows you to move an object to a higher elevation with less effort.
  </p>,
  <p key="b5-p321-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The trade-off is that you have to move the box over a longer distance. You are doing the same amount of work (in physics, work is force multiplied by distance), but you are spreading it out. This makes the force you need to apply at any given moment much smaller. Total work done will be same in both cases. Therefore, <em>an inclined plane is another simple machine designed to make work easier.</em> We often see inclined planes as an alternative to stairs near building entrances. Inclined planes make work easier without reducing the amount of work done. This is because they offer a mechanical advantage.
  </p>,
  <p key="b5-p321-3" style={{ textIndent: 28, textAlign: "justify" }}>
    For an ideal inclined plane (one without any friction), the mechanical advantage is simply the ratio of the length of the slope to its vertical height.
  </p>,
  <DefBox key="def-s321">
    The ideal mechanical advantage for an inclined plane is defined as:<br/>
    Mechanical advantage = <Frac n="length of incline" d="height of elevation" /> = <Frac n="l" d="h" /> &nbsp;&nbsp;&nbsp;&nbsp; ...(1)
  </DefBox>,
  <div key="b5-fig330" style={{ display: "flex", justifyContent: "center", gap: 24, margin: "12px 0" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_30A} alt="Fig. 3.30(a) Ramp 15m" style={{ maxWidth: 150, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>a</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_30B} alt="Fig. 3.30(b) Ramp 30m" style={{ maxWidth: 190, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>b</em>)</div>
    </div>
  </div>,
  <div key="b5-fig330-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 10 }}>Fig. 3.30</div>,
  <p key="b5-p321-4">For a ramp of 15 m long and elevation 10 m:</p>,
  <MathBlock key="b5-321m1">M.A. = <Frac n="15" d="10" /> = 1·5</MathBlock>,
  <p key="b5-p321-5">For a ramp of 30 m long and elevation 10 m:</p>,
  <MathBlock key="b5-321m2">M.A. = <Frac n="30" d="10" /> = 3</MathBlock>,
  <p key="b5-p321-6" style={{ textIndent: 28, textAlign: "justify" }}>
    Mechanical advantage of 3 means that the ramp ideally multiplies your effort three times. You need to apply only 1/3 of the force required to lift the object directly upward. It is clear that mechanical advantage is large for an incline with longer length or lower angle of inclination.
  </p>,

  <SubHd key="sub-s321-friction" id="s321-friction" label="" title="Mechanical Advantage and Friction" />,
  <p key="b5-p321-7" style={{ textIndent: 28, textAlign: "justify" }}>
    While calculating the mechanical advantage above, we considered that friction is absent. In the real world, friction always plays a role as an opposing force for the motion. When a box is pushed up along the ramp, friction between the box and the surface pushes back, working against the desired movement. This means one must apply more force than the ideal calculation suggests. The actual mechanical advantage (AMA) will always be less than the ideal mechanical advantage (IMA). The rougher the surface, the greater the friction, and the lower the AMA.
  </p>,
  <DefBox key="def-s321-ama">
    <em>Because of friction, the actual mechanical advantage of any real inclined plane is always less than its ideal mechanical advantage (AMA &lt; IMA).</em>
  </DefBox>,
  <p key="b5-p321-8" style={{ textIndent: 28, textAlign: "justify" }}>
    This leads to the concept of efficiency. Efficiency measures how much of the work you put in is converted into useful work moving the load. It's calculated as the ratio of the actual mechanical advantage to the ideal mechanical advantage:
  </p>,
  <MathBlock key="b5-321m3">Efficiency = <Frac n="AMA" d="IMA" /> × 100%</MathBlock>,
  <p key="b5-p321-9" style={{ textIndent: 28 }}>
    No machine is 100% efficient because some energy is always lost to friction, usually as heat. Adding wheels to the box or smoothing the ramp's surface can reduce friction and increase the efficiency of the inclined plane.
  </p>,

  // ── 3.22 WHEEL AND AXLE ──
  <SecHd key="sec-s322" id="s322" label="3.22" title="Wheel and Axle" />,
  <p key="b5-p322-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The simple machine shown in Fig. 3.31 is called a <strong>wheel and axle.</strong> It is actually a form of lever. The difference is that the effort arm can rotate in a complete circle around the fulcrum, which is the centre of the axle. Force applied to the outside of the wheel causes a greater force to be applied to the rope that is wrapped around the axle.
  </p>,
  <div key="b5-fig331" style={{ textAlign: "center", margin: "10px 0" }}>
    <img src={FIG_31} alt="Fig. 3.31 Wheel and axle" style={{ maxWidth: "44%", height: "auto" }} />
    <div style={{ fontSize: 13, color: "#555", fontStyle: "italic" }}>Fig. 3.31</div>
  </div>,
  <SubHd key="sub-s322-ma" id="s322-ma" label="" title="Mechanical Advantage" />,
  <p key="b5-p322-2">In a simple machine, when the effort (E) balances a Load (L), the ratio of the load to the effort is called M.A.</p>,
  <MathBlock key="b5-322m1">M.A. = <Frac n="Load" d="Effort" /> = <Frac n="L" d="E" /></MathBlock>,
];


// ── BATCH 6: §3.22 Wheel & Axle (continued) + §3.23 Wedge + Solved Problems + Solutions ──

const FIG_32A = CONTENT_IMAGES.CONTENT_IMAGE_137DB2092E61C9B84207;
const FIG_32B = CONTENT_IMAGES.CONTENT_IMAGE_82356F9B23BD384C746A;
const FIG_32C = CONTENT_IMAGES.CONTENT_IMAGE_ADEC9835E823D271954C;

const content_b6 = [
  // §3.22 Wheel and Axle — continued (velocity ratio, efficiency)
  <SubHd key="sub-s322-vr" id="s322-vr" label="" title="Velocity Ratio" />,
  <p key="b6-p322-1" style={{ textIndent: 28, textAlign: "justify" }}>
    It is the ratio between the distance moved by the effort to the distance moved by the load.
  </p>,
  <MathBlock key="b6-322m1">V.R. = <Frac n="distance moved by the effort" d="distance moved by the load" /> = <Frac n={<>d<Sub c="E" /></>} d={<>d<Sub c="L" /></>} /></MathBlock>,
  <p key="b6-p322-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Effort "E" is applied on the rim of the wheel and load is lifted by a string wound around the axle. Hence, for one rotation, effort E acts along a distance 2πR and the load "L" raises through a distance 2πr. Therefore,
  </p>,
  <MathBlock key="b6-322m2">V.R. = <Frac n="distance moved by the effort" d="distance moved by the load" /> = <Frac n="2πR" d="2πr" /> = <Frac n="R" d="r" /></MathBlock>,

  <SubHd key="sub-s322-eff" id="s322-eff" label="" title="Efficiency" />,
  <p key="b6-p322-3">It is the ratio of output to input. In a simple mechanism, it is also defined as the ratio of mechanical advantage to the velocity ratio.</p>,
  <MathBlock key="b6-322m3">η = <Frac n="Output" d="Input" /> = <Frac n="M.A." d="V.R." /></MathBlock>,

  // ── 3.23 WEDGE ──
  <SecHd key="sec-s323" id="s323" label="3.23" title="Wedge" />,
  <p key="b6-p323-1" style={{ textIndent: 28, textAlign: "justify" }}>
    A <strong>wedge</strong> is an inclined plane that is thick at one end and tapers to a point on the other, <strong>often used to separate things</strong> (see Fig. 3.32). Pushing the wedge in one direction creates a force in a sidewise direction. Examples: axe, knife, chisel, nail etc.
  </p>,
  <p key="b6-p323-2">In an ideal case, the ideal mechanical advantage is given by:</p>,
  <MathBlock key="b6-323m1">IMA = <Frac n="Length of Wedge (l)" d="Width of Wedge (w)" /> &nbsp;&nbsp;&nbsp;&nbsp; ...(2)</MathBlock>,
  <p key="b6-p323-3"><strong>Length (<em>l</em>).</strong> The distance from the tip to the flat end.</p>,
  <p key="b6-p323-4"><strong>Width (<em>w</em>).</strong> The thickness of the blunt end that pushes material apart.</p>,
  <div key="b6-fig332" style={{ display: "flex", justifyContent: "center", gap: 20, margin: "12px 0", alignItems: "flex-start" }}>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_32A} alt="Fig. 3.32(a) Wedge diagram" style={{ maxWidth: 110, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>a</em>) Wedge</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_32B} alt="Fig. 3.32(b) wedge dimensions" style={{ maxWidth: 70, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>b</em>)</div>
    </div>
    <div style={{ textAlign: "center" }}>
      <img src={FIG_32C} alt="Fig. 3.32(c) axe, knife, chisel" style={{ maxWidth: 280, height: "auto" }} />
      <div style={{ fontSize: 12, color: "#555" }}>(<em>c</em>) Axe · Knife · Chisel</div>
    </div>
  </div>,
  <div key="b6-fig332-cap" style={{ textAlign: "center", fontSize: 13, color: "#555", fontStyle: "italic", marginBottom: 14 }}>Fig. 3.32</div>,

  // ── Solved Problems: Inclined Plane, Wheel & Axle, Wedge ──
  <NumericalSection key="num-inclined" topic="INCLINED PLANE, WHEEL AND AXLE AND WEDGE">
    <p key="b6-pf-hd" style={{ fontWeight: 700, textDecoration: "underline", marginBottom: 6 }}>FORMULAE AND UNITS</p>
    <p key="b6-pf1">1. Ideal mechanical advantage for an inclined plane: M.A. = <Frac n="length of incline" d="height of elevation" /> = <Frac n="L" d="H" /></p>
    <p key="b6-pf2">2. Mechanical advantage for wheel and axle: M.A. = <Frac n="Load" d="Effort" /> = <Frac n="L" d="E" /></p>
    <p key="b6-pf2b">Velocity ratio: V.R. = <Frac n="distance moved by effort" d="distance moved by load" /> = <Frac n={<>d<Sub c="E" /></>} d={<>d<Sub c="L" /></>} /> = <Frac n="R" d="r" />  (R = radius of wheel, r = radius of axle)</p>
    <p key="b6-pf3">3. Ideal mechanical advantage of a wedge: IMA = <Frac n="length of wedge" d="width of wedge" /> = <Frac n="l" d="w" /></p>

    <p key="b6-ip1"><strong>Problem 1.</strong> A wooden crate weighing 500 N is pushed up a ramp that is 10 metres long and reaches a height of 2 metres. Neglecting friction, calculate the Mechanical Advantage (M.A.) and the effort force required to move the crate.</p>
    <p key="b6-ip1s"><strong>Solution.</strong> For an ideal inclined plane,</p>
    <MathBlock key="b6-ip1m1">M.A. = <Frac n="Length of Incline" d="Height of Incline" /> = <Frac n="10 m" d="2 m" /> = <strong>5</strong></MathBlock>
    <p key="b6-ip1s2">Since M.A. = <Frac n="Load" d="Effort" />, the effort is <Frac n="Load" d="M.A." />:</p>
    <MathBlock key="b6-ip1m2">Effort = <Frac n="500 N" d="5" /> = <strong>100 N</strong></MathBlock>

    <p key="b6-ip2"><strong>Problem 2.</strong> A ramp is 4 metres long and rises 1 metre height. A worker pushes a box weighing 200 N up the ramp at a constant speed (neglecting friction). What is the ideal Mechanical Advantage (M.A.) and the minimum effort needed?</p>
    <p key="b6-ip2s"><strong>Solution.</strong></p>
    <MathBlock key="b6-ip2m1">M.A. = <Frac n="Length" d="Height" /> = <Frac n="4" d="1" /> = <strong>4</strong></MathBlock>
    <MathBlock key="b6-ip2m2">Effort = <Frac n="Load" d="M.A." /> = <Frac n="200 N" d="4" /> = <strong>50 N</strong></MathBlock>

    <p key="b6-wa3"><strong>Problem 3.</strong> A wheel and axle are used to raise a weight of 240 kg. The radius of the wheel is 50 cm and axle is 10 cm. When a force of 75 kg is applied on the wheel, the weight is raised with a uniform velocity. Find the mechanical advantage and velocity ratio.</p>
    <p key="b6-wa3s"><strong>Solution.</strong> Load W = 240 kg, Effort P = 75 kg, R = 50 cm, r = 10 cm</p>
    <MathBlock key="b6-wa3m1">M.A. = <Frac n="load" d="effort" /> = <Frac n="240" d="75" /> = <strong>3·2</strong></MathBlock>
    <MathBlock key="b6-wa3m2">V.R. = <Frac n="R" d="r" /> = <Frac n="50" d="10" /> = <strong>5</strong></MathBlock>

    <p key="b6-wa4"><strong>Problem 4.</strong> In a simple wheel and axle, the diameter of the wheel is 150 mm and the diameter of the axle is 30 mm. If the efficiency of the machine is 60%, determine the effort required to lift a load of 50 N.</p>
    <p key="b6-wa4s"><strong>Solution.</strong> Given: Diameter of Wheel D = 150 mm; Diameter of Axle d = 30 mm; η = 60% (or 0·60); Load L = 50 N.</p>
    <MathBlock key="b6-wa4m1">V.R. = <Frac n="Diameter of Wheel" d="Diameter of Axle" /> = <Frac n="150" d="30" /> = 5</MathBlock>
    <MathBlock key="b6-wa4m2">M.A. = η × V.R. = 0·60 × 5 = 3</MathBlock>
    <MathBlock key="b6-wa4m3">Effort E = <Frac n="Load" d="M.A." /> = <Frac n="50" d="3" /> = <strong>16·67 N</strong></MathBlock>

    <p key="b6-wa5"><strong>Problem 5.</strong> A wheel and axle system has a mechanical advantage of 20 and the diameter of the axle is 5 cm. Assuming it is an ideal machine (100% efficiency), what size wheel radius is required?</p>
    <p key="b6-wa5s"><strong>Solution.</strong> Given: M.A. = 20; Diameter of Axle d = 5 cm; Radius of Axle r = 2·5 cm.</p>
    <p key="b6-wa5s2">For an ideal machine, M.A. = V.R. &nbsp; and &nbsp; V.R. = R/r. Therefore:</p>
    <MathBlock key="b6-wa5m">20 = <Frac n="R" d="2·5" /> &nbsp;&nbsp; ⟹ &nbsp;&nbsp; Radius of Wheel R = 20 × 2·5 = <strong>50 cm</strong></MathBlock>

    <p key="b6-wd6"><strong>Problem 6.</strong> A woodcutter uses a wedge to split a log. The wedge has a length of 10 cm and a thickness of 2 cm. Calculate its ideal mechanical advantage.</p>
    <p key="b6-wd6s"><strong>Solution.</strong> Length L = 10 cm, Thickness t = 2 cm.</p>
    <MathBlock key="b6-wd6m">I.M.A. = <Frac n="L" d="t" /> = <Frac n="10 cm" d="2 cm" /> = <strong>5</strong></MathBlock>
  </NumericalSection>,

  // Solutions/Explanations — Inclined Plane, Wheel & Axle, Wedge
  <div key="b6-solhd" style={{ background: "#f0f0f0", border: "1px solid #ccc", padding: "6px 16px", margin: "14px 0 8px", textAlign: "center", fontWeight: 800, fontSize: 14, fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 1 }}>
    ■ SOLUTIONS/EXPLANATIONS ■
  </div>,
  <p key="b6-sol1" style={{ margin: "0 0 6px" }}>
    <strong>1.</strong> M.A. = <Frac n="L" d="h" /> = <Frac n="8" d="2" /> = 4; &nbsp; Effort = <Frac n="Load" d="M.A." /> = <Frac n="400" d="4" /> = <strong>100 N</strong>
  </p>,
  <p key="b6-sol2" style={{ margin: "0 0 6px" }}>
    <strong>2.</strong> Load = 900 N, h = 3 m, Effort = 300 N; M.A. = <Frac n="900" d="300" /> = 3; &nbsp; M.A. = <Frac n="l" d="h" /> ⟹ 3 = <Frac n="l" d="3 m" /> ⟹ <em>l</em> = <strong>9 m</strong>
  </p>,
  <p key="b6-sol3" style={{ margin: "0 0 6px" }}>
    <strong>3.</strong> I.M.A. = <Frac n="l" d="h" /> = <Frac n="10 m" d="2·5 m" /> = <strong>4</strong>
  </p>,
  <p key="b6-sol4" style={{ margin: "0 0 6px" }}>
    <strong>4.</strong> R = 75 cm, r = 10 cm; M.A. = η V.R. = V.R. = <Frac n="R" d="r" /> = <Frac n="75" d="10" /> = <strong>7·5</strong> &nbsp;(since η = 1 ideally)
  </p>,
  <p key="b6-sol5" style={{ margin: "0 0 6px" }}>
    <strong>5.</strong> V.R. = <Frac n="150" d="30" /> = 5; η = 0·6; M.A. = η V.R. = 0·6 × 5 = 3; &nbsp; Effort = <Frac n="50" d="3" /> = <strong>16·67 N</strong>
  </p>,
  <p key="b6-sol6" style={{ margin: "0 0 32px" }}>
    <strong>6.</strong> I.M.A. = <Frac n="L" d="W" /> = <Frac n="10" d="2" /> = <strong>5</strong>
  </p>,
];


// ── TOC (complete all sections 3.1–3.23) ─────────────────────
const TOC = [
  { id: "s31", label: "3.1", title: "Introduction", level: 1 },
  { id: "s32", label: "3.2", title: "Work", level: 1 },
  { id: "s32-sci", label: "", title: "Scientific Conception of Work", level: 2 },
  { id: "s33", label: "3.3", title: "Work Done by a Constant Force", level: 1 },
  { id: "s33-unit", label: "", title: "Unit of Work", level: 2 },
  { id: "s34", label: "3.4", title: "Energy", level: 1 },
  { id: "s34-sci", label: "", title: "Scientific Conception of Energy", level: 2 },
  { id: "s34-units", label: "", title: "Units of Energy", level: 2 },
  { id: "s35", label: "3.5", title: "Kinetic Energy", level: 1 },
  { id: "s36", label: "3.6", title: "Expression for Kinetic Energy", level: 1 },
  { id: "s37", label: "3.7", title: "Potential Energy", level: 1 },
  { id: "s38", label: "3.8", title: "Potential Energy at a Height", level: 1 },
  { id: "s39", label: "3.9", title: "Forms of Energy", level: 1 },
  { id: "s310", label: "3.10", title: "Energy Transformations", level: 1 },
  { id: "s311", label: "3.11", title: "Law of Conservation of Energy", level: 1 },
  { id: "s312", label: "3.12", title: "Conservation of Mechanical Energy", level: 1 },
  { id: "s313", label: "3.13", title: "Rate of Doing Work : Power", level: 1 },
  { id: "s313-dist", label: "", title: "Distinction: Energy and Power", level: 2 },
  { id: "s314", label: "3.14", title: "Commercial Unit : kWh", level: 1 },
  { id: "s315", label: "3.15", title: "Simple Machine", level: 1 },
  { id: "s315-terms", label: "", title: "Technical Terms", level: 2 },
  { id: "s316", label: "3.16", title: "Working Principle of a Machine", level: 1 },
  { id: "s316-rel", label: "", title: "Efficiency, M.A. and V.R.", level: 2 },
  { id: "s317", label: "3.17", title: "Six Simple Machines", level: 1 },
  { id: "s318", label: "3.18", title: "Levers", level: 1 },
  { id: "s318-classes", label: "", title: "Three Classes of Lever", level: 2 },
  { id: "s319", label: "3.19", title: "Pulley", level: 1 },
  { id: "s319-types", label: "", title: "Type of Pulleys", level: 2 },
  { id: "s319-fixed", label: "", title: "(A) Fixed Pulley", level: 3 },
  { id: "s319-movable", label: "", title: "(B) Movable Pulley", level: 3 },
  { id: "s319-mavr", label: "", title: "M.A., V.R. — Fixed Pulley", level: 3 },
  { id: "s319-movmavr", label: "", title: "M.A., V.R. — Movable Pulley", level: 3 },
  { id: "s320", label: "3.20", title: "Combination of Pulleys", level: 1 },
  { id: "s320-bt", label: "", title: "Block and Tackle System", level: 2 },
  { id: "s321", label: "3.21", title: "Inclined Plane", level: 1 },
  { id: "s321-friction", label: "", title: "M.A. and Friction", level: 2 },
  { id: "s322", label: "3.22", title: "Wheel and Axle", level: 1 },
  { id: "s323", label: "3.23", title: "Wedge", level: 1 },
];


// ── CONCAT ALL BATCHES ────────────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
  ...content_b4,
  ...content_b5,
  ...content_b6,
];

// ── MAIN EXPORT ───────────────────────────────────────────────
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
