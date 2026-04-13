"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

const P_COLOR = "#8b0a4e";
const LIGHT_P = "#f9eef4";

function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800&display=swap";
    document.head.appendChild(l);
    const k = document.createElement("link");
    k.rel = "stylesheet";
    k.href = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css";
    document.head.appendChild(k);
    const st = document.createElement("style");
    st.textContent = ".katex, .katex-display { font-size: 1em; } .katex .mathnormal, .katex .mathit { font-family: 'Times New Roman', Times, serif !important; }";
    document.head.appendChild(st);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
    s.onload = () => {
      const a = document.createElement("script");
      a.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js";
      a.onload = () => {
        if (window.renderMathInElement) {
          window.renderMathInElement(document.body, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true },
            ],
            throwOnError: false,
          });
        }
      };
      document.head.appendChild(a);
    };
    document.head.appendChild(s);
  }, []);
}

/* ── Math helpers ── */
const Sup = ({ c }) => <sup style={{ fontSize: "0.72em" }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em" }}>{c}</sub>;

/* ── Paragraph ── */
const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 11px", textAlign: "justify", ...style }}>{children}</p>
);

/* ── Display math block ── */
const DM = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px",
    lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif",
    overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {children}
  </div>
);

/* ── Section heading (Application Booster style) ── */
const ABSecHd = ({ id, num, title }) => (
  <div id={id} style={{ margin: "28px 0 18px" }}>
    <div style={{ display: "inline-block", border: "1.5px solid #8b0a4e",
      background: "#f9eef4", padding: "6px 18px" }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 800, fontSize: 13, color: "#8b0a4e", letterSpacing: 0.3 }}>
        {num}. {title}
      </span>
    </div>
  </div>
);

/* ── Example header ── */
const ExHd = ({ num, children }) => (
  <p style={{ margin: "20px 0 6px", lineHeight: 1.55 }}>
    <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 800, fontSize: 13.5, textTransform: "uppercase",
      color: "#1a1a1a", marginRight: 6 }}>
      Example {num}.
    </span>
    <span style={{ fontWeight: 600 }}>{children}</span>
  </p>
);

/* ── Solution header ── */
const SolHd = () => (
  <p style={{ fontWeight: 700, color: P_COLOR, margin: "8px 0 4px",
    fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5 }}>
    Solution.
  </p>
);

/* ── Figure ── */
const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "18px auto", textAlign: "center", maxWidth: "90%" }}>
    <img src={src} alt={caption || num || "figure"}
      style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd", display: "block", margin: "0 auto" }}
      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
    />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center",
      border: "1.5px dashed #8b0a4e", background: "#f9eef4", minHeight: 80,
      padding: "12px 20px", color: "#8b0a4e",
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{ marginLeft: 6 }}>{src}</code>
    </div>
    {(num || caption) && (
      <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic",
        margin: "6px auto 0", maxWidth: 480, lineHeight: 1.45 }}>
        {num && <strong style={{ color: "#8b0a4e", fontStyle: "normal" }}>{num}. </strong>}
        {caption}
      </p>
    )}
  </div>
);

/* ── Table styles ── */
const th = { border: "1.5px solid #555", padding: "6px 10px", textAlign: "center",
  fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif",
  fontSize: 13, background: "#f0f0f0" };
const td = { border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5 };

/* ── Hamburger, Backdrop, Sidebar ── */
function HamburgerBtn({ open, setOpen }) {
  const bar = { width: 20, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.25s" };
  return (
    <button onClick={() => setOpen(o => !o)} style={{
      position: "fixed", top: 14, left: 14, zIndex: 1100,
      background: "#8b0a4e", border: "none", borderRadius: 4,
      width: 36, height: 36, cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 5, padding: 0,
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
      position: "fixed", inset: 0, zIndex: 1050, background: "rgba(0,0,0,0.35)", cursor: "pointer",
    }} />
  );
}
function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1080,
      width: open ? 260 : 0, height: "100vh", background: "#fff",
      borderRight: open ? "2px solid #e8c0d8" : "none",
      boxShadow: open ? "3px 0 16px rgba(139,10,78,0.10)" : "none",
      transition: "width 0.28s ease",
      overflowY: open ? "auto" : "hidden", overflowX: "hidden",
    }}>
      <div style={{ width: 260, padding: "56px 0 20px" }}>
        <div style={{ padding: "0 16px 8px",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: "#8b0a4e",
          letterSpacing: 1, textTransform: "uppercase",
          borderBottom: "1.5px solid #e8c0d8", marginBottom: 8 }}>
          Contents
        </div>
        <nav>
          {tocItems.map(item => (
            <div key={item.id}
              onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                padding: item.level === 1 ? "6px 16px" : "4px 26px",
                fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: item.level === 1 ? 700 : 400,
                fontSize: item.level === 1 ? 12 : 11,
                color: item.level === 1 ? "#8b0a4e" : "#444",
                borderLeft: item.level === 1 ? "3px solid #8b0a4e" : "none",
                background: hovered === item.id ? "#f9eef4" : "transparent",
                marginBottom: 2, lineHeight: 1.4,
              }}>
              {item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

/* ── Application Booster Cover ── */
const AppBoosterCover = () => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ background: "linear-gradient(135deg, #4a1a5a 0%, #7a2a7a 35%, #b06090 70%, #c890a8 100%)",
      padding: "28px 24px 24px", textAlign: "center" }}>
      <div style={{ display: "inline-block", borderTop: "2.5px solid rgba(255,255,255,0.5)",
        borderBottom: "2.5px solid rgba(255,255,255,0.5)", padding: "10px 0" }}>
        <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900,
          fontSize: 32, color: "#fff", letterSpacing: 1, lineHeight: 1.2 }}>
          Application Booster{" "}
          <span style={{ fontStyle: "italic", color: "#ffe0f0" }}>– Level 1</span>
        </div>
        <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
          fontSize: 15, color: "rgba(255,255,255,0.85)", letterSpacing: 2,
          textTransform: "uppercase", marginTop: 6 }}>
          [Topicwise Solved Examples]
        </div>
      </div>
    </div>
    <div style={{ height: 4, background: "linear-gradient(90deg,#8b0a4e,#c0408a,#8b0a4e)" }} />
  </div>
);

/* ══════════════════════════════════════════════
   TOC
══════════════════════════════════════════════ */
const TOC = [
  { id: "sec-i", title: "I. Equations of Rotational Motion", level: 1 },
  { id: "ex-1", title: "Example 1 — Angular velocity/angle", level: 2 },
  { id: "ex-2", title: "Example 2 — Tangential force on sphere", level: 2 },
  { id: "sec-ii", title: "II. Moment of Inertia (MOI)", level: 1 },
  { id: "ex-3", title: "Example 3 — Equilateral triangle particles", level: 2 },
  { id: "ex-4", title: "Example 4 — Circular disc axes", level: 2 },
  { id: "ex-5", title: "Example 5 — Radius of gyration", level: 2 },
  { id: "ex-6", title: "Example 6 — Two masses, COM axis", level: 2 },
  { id: "ex-7", title: "Example 7 — Disc with hole", level: 2 },
  { id: "ex-8", title: "Example 8 — Bobbin MOI", level: 2 },
  { id: "ex-9", title: "Example 9 — Triangular frame", level: 2 },
  { id: "ex-10", title: "Example 10 — Disc about secant", level: 2 },
  { id: "ex-11", title: "Example 11 — Hollow sphere diameter", level: 2 },
  { id: "sec-iii", title: "III. Angular Momentum & Conservation", level: 1 },
  { id: "ex-12", title: "Example 12 — Earth radius contracts", level: 2 },
  { id: "ex-13", title: "Example 13 — Wheel picks up particle", level: 2 },
  { id: "ex-14", title: "Example 14 — Child on turntable", level: 2 },
  { id: "ex-15", title: "Example 15 — Man on disc platform", level: 2 },
  { id: "ex-16", title: "Example 16 — Particle on line y=x+2", level: 2 },
  { id: "ex-17", title: "Example 17 — Rolling sphere, point of contact", level: 2 },
  { id: "ex-18", title: "Example 18 — Disc angular momentum", level: 2 },
  { id: "sec-iv", title: "IV. Torque & Equilibrium of Rigid Bodies", level: 1 },
  { id: "ex-19", title: "Example 19 — Bar on two supports", level: 2 },
  { id: "ex-20", title: "Example 20 — Seesaw balance", level: 2 },
  { id: "ex-21", title: "Example 21 — Rod with threads", level: 2 },
  { id: "ex-22", title: "Example 22 — Rod on wall with cable", level: 2 },
  { id: "sec-v", title: "V. Kinetic Energy (Translational & Rotational)", level: 1 },
  { id: "ex-23", title: "Example 23 — Rod with opposite-velocity ends", level: 2 },
  { id: "ex-24", title: "Example 24 — Disc rolling over planks", level: 2 },
  { id: "ex-25", title: "Example 25 — Cylinder between planks", level: 2 },
  { id: "ex-26", title: "Example 26 — Composite rod rotation", level: 2 },
  { id: "ex-27", title: "Example 27 — Rolling body, IAOR", level: 2 },
  { id: "sec-vi", title: "VI. Conservation of Mechanical Energy", level: 1 },
  { id: "ex-28", title: "Example 28 — Pivoted rod, CM velocity", level: 2 },
  { id: "ex-29", title: "Example 29 — Light rod with three masses", level: 2 },
  { id: "ex-30", title: "Example 30 — Cylinder on inclined plane", level: 2 },
  { id: "ex-31", title: "Example 31 — Ball on parabolic path", level: 2 },
  { id: "sec-vii", title: "VII. Pure Rolling (No Slipping)", level: 1 },
  { id: "ex-32", title: "Example 32 — Cylinder with hanging masses", level: 2 },
  { id: "ex-33", title: "Example 33 — Cylinder on accelerating platform", level: 2 },
  { id: "ex-34", title: "Example 34 — Force at disc centre", level: 2 },
  { id: "ex-35", title: "Example 35 — Horizontal force on sphere", level: 2 },
  { id: "ex-36", title: "Example 36 — Force at top of shell", level: 2 },
  { id: "ex-37", title: "Example 37 — Disc on rough plank", level: 2 },
  { id: "sec-viii", title: "VIII. Miscellaneous Applications", level: 1 },
  { id: "ex-38", title: "Example 38 — Disc bottommost point coordinates", level: 2 },
  { id: "ex-39", title: "Example 39 — Pivoted rod angular acceleration", level: 2 },
  { id: "ex-40", title: "Example 40 — Horizontal rod, perpendicular force", level: 2 },
  { id: "ex-41", title: "Example 41 — Rod pivoted at O, horizontal force", level: 2 },
  { id: "ex-42", title: "Example 42 — Two pressed discs", level: 2 },
  { id: "ex-43", title: "Example 43 — Rod with antiparallel forces", level: 2 },
  { id: "ex-44", title: "Example 44 — Disc friction torque", level: 2 },
  { id: "ex-45", title: "Example 45 — Disc spinning to stop", level: 2 },
];

/* ══════════════════════════════════════════════
   CONTENT
══════════════════════════════════════════════ */
const allContent = [

  /* ─── Section I ─── */
  <ABSecHd key="sec-i" id="sec-i" num="I" title="Equations of Rotational Motion" />,

  /* Example 1 */
  <div key="ex-1" id="ex-1">
    <ExHd num={1}>
      A wheel rotates with an angular acceleration {"$\\alpha$"} given by {"$\\alpha = 4at^3 - 3bt^2$"}. Here {"$t$"} is the time and {"$a, b$"} are constants. If the wheel has an initial angular velocity {"$\\omega_0$"}, write the equations for
    </ExHd>
    <P2>(<em>a</em>) the angular velocity and</P2>
    <P2>(<em>b</em>) the angle turned as function of time.</P2>
    <SolHd />
    <P2>{"$\\alpha = \\dfrac{d\\omega}{dt} = 4at^3 - 3bt^2$"}</P2>
    <DM>{"$$\\begin{aligned} & \\Rightarrow \\int_{\\omega_0}^{\\omega} d\\omega = \\int_0^t (4at^3 - 3bt^2)\\,dt \\qquad \\therefore\\ \\boxed{\\omega = at^4 - bt^3 + \\omega_0} \\\\ & \\Rightarrow \\int_0^{\\theta} d\\theta = \\int_0^t (at^4 - bt^3 + \\omega_0)\\,dt \\qquad \\therefore\\ \\boxed{\\theta = \\frac{at^5}{5} - \\frac{bt^4}{4} + \\omega_0 t} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 2 */
  <div key="ex-2" id="ex-2">
    <ExHd num={2}>
      A solid sphere of mass 2 kg and radius 1 m is free to rotate about an axis passing through its centre. Find a constant tangential force {"$F$"} required to rotate the sphere with 10 rad/s in 2 s starting from rest. Also find the number of rotations made by the sphere in that time interval.
    </ExHd>
    <SolHd />
    <P2>Here, {"$m = 2\\text{ kg},\\quad r = 1\\text{ m},\\quad \\omega_0 = 0,\\quad \\omega = 10\\text{ rad/s},\\quad t = 2\\text{ s}$"}</P2>
    <DM>{"$$\\begin{aligned} & \\Rightarrow \\quad \\alpha = \\frac{\\omega - \\omega_0}{t} = 5\\text{ rad/s}^2 \\\\ & \\text{and} \\quad \\theta = \\omega_0 t + \\tfrac{1}{2}\\alpha t^2 = 0 + \\tfrac{1}{2} \\times 5 \\times 2^2 = 10\\text{ rad} \\end{aligned}$$"}</DM>
    <P2>Now, {"$\\tau = Fr = I\\alpha = \\dfrac{2}{5}mr^2\\alpha$"}</P2>
    <DM>{"$$\\therefore\\quad F = \\frac{2}{5}mr\\alpha = \\frac{2}{5} \\times 2 \\times 1 \\times 5 = \\boxed{4\\text{ N}}$$"}</DM>
    <P2>Number of revolutions, {"$n = \\dfrac{\\theta}{2\\pi} = \\dfrac{10}{2\\pi} = \\dfrac{5}{\\pi}$"}</P2>
  </div>,

  /* ─── Section II ─── */
  <ABSecHd key="sec-ii" id="sec-ii" num="II" title="Moment of Inertia (MOI)" />,

  /* Example 3 */
  <div key="ex-3" id="ex-3">
    <ExHd num={3}>
      Three particles, each of mass 200 g, are kept at the corners of an equilateral triangle of side <strong>10 cm</strong>. Find the moment of inertia of the system about an axis
    </ExHd>
    <P2>(<em>a</em>) joining two of the particles</P2>
    <P2>(<em>b</em>) passing through one of the particles and perpendicular to the plane of the particles.</P2>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_6AAFCF0F84A93230BB84}
      num="FIGURE 2.85"
    />
    <P2>{"$I = m_1 r_1^2 + m_2 r_2^2 + m_3 r_3^2$"}</P2>
    <P2>Here, {"$m_1 = m_2 = m_3 = m = 0{\\cdot}2\\text{ kg},\\quad a = 0{\\cdot}1\\text{ m}$"}</P2>
    <P2>(<em>a</em>){" "}{"$I_1 = m_1\\!\\left(\\dfrac{\\sqrt{3}}{2}a\\right)^{\\!2} + m_2 \\times 0^2 + m_3 \\times 0^2 = \\dfrac{3}{4}ma^2$"}</P2>
    <DM>{"$$= \\boxed{1{\\cdot}5 \\times 10^{-3}\\text{ kg m}^2}$$"}</DM>
    <P2>(<em>b</em>){" "}{"$I_2 = m_1 \\times 0^2 + m_2 a^2 + m_3 a^2 = 2ma^2 = \\boxed{4{\\cdot}0 \\times 10^{-3}\\text{ kg m}^2}$"}</P2>
  </div>,

  /* Example 4 */
  <div key="ex-4" id="ex-4">
    <ExHd num={4}>
      Write an expression for the moment of inertia of a circular disc of mass {"$M$"} and radius {"$R$"}
    </ExHd>
    <P2>(<em>a</em>) About an axis passing through its centre, and perpendicular to its plane</P2>
    <P2>(<em>b</em>) about its diameter</P2>
    <P2>(<em>c</em>) about a tangent in its own plane</P2>
    <P2>(<em>d</em>) about a tangent perpendicular to the plane of the disc.</P2>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_25099A67628F1240EEE2}
      num="FIGURE 2.86"
    />
    <P2>(<em>a</em>){" "}{"$\\boxed{I_1 = \\dfrac{1}{2}MR^2}$"}</P2>
    <P2>(<em>b</em>) By perpendicular axis theorem,</P2>
    <DM>{"$$I_2 + I_2 = I_1 \\qquad \\therefore \\boxed{I_2 = \\frac{I_1}{2} = \\frac{1}{4}MR^2}$$"}</DM>
    <P2>(<em>c</em>) By parallel axis theorem, {"$\\boxed{I_3 = I_2 + MR^2 = \\dfrac{5}{4}MR^2}$"}</P2>
    <P2>(<em>d</em>) By parallel axis theorem, {"$\\boxed{I_4 = I_1 + MR^2 = \\dfrac{3}{2}MR^2}$"}</P2>
  </div>,

  /* Example 5 */
  <div key="ex-5" id="ex-5">
    <ExHd num={5}>
      The radius of gyration of a uniform disc about a line perpendicular to the plane of the disc equals its radius. Find the distance of the line from the centre.
    </ExHd>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_11A379D141AAC332C4C4}
      num="FIGURE 2.87"
    />
    <DM>{"$$I_1 = \\frac{Mr^2}{2}$$"}</DM>
    <P2>By parallel axis theorem, {"$I_2 = I_1 + Ma^2 = \\dfrac{Mr^2}{2} + Ma^2$"}</P2>
    <P2>Also, since radius of gyration about axis {"$X'$"} is {"$r$"}, we have</P2>
    <DM>{"$$I_2 = Mr^2 \\quad \\Rightarrow \\frac{Mr^2}{2} + Ma^2 = Mr^2 \\qquad \\therefore \\quad \\boxed{a = \\frac{r}{\\sqrt{2}}}$$"}</DM>
  </div>,

  /* Example 6 */
  <div key="ex-6" id="ex-6">
    <ExHd num={6}>
      Two masses {"$M_1$"} and {"$M_2$"} are separated by a distance {"$r$"}. Find the moment of inertia of this arrangement about an axis passing through the centre of mass and perpendicular to the line joining them.
    </ExHd>
    <SolHd />
    <P2>Since, axis {"$X$"} passes through COM, we have</P2>
    <DM>{"$$\\begin{aligned} & r_1 = \\frac{M_2\\, r}{M_1 + M_2} \\\\ & r_2 = \\frac{M_1\\, r}{M_1 + M_2} \\end{aligned}$$"}</DM>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_540C7FC7A911FCD6C748}
      num="FIGURE 2.88"
    />
    <DM>{"$$\\begin{aligned} \\therefore\\; I &= M_1 r_1^2 + M_2 r_2^2 = M_1\\!\\left(\\frac{M_2 r}{M_1+M_2}\\right)^{\\!2} + M_2\\!\\left(\\frac{M_1 r}{M_1+M_2}\\right)^{\\!2} \\\\ &= M_1 M_2 r^2 \\frac{(M_1+M_2)}{(M_1+M_2)^2} = \\boxed{\\frac{M_1 M_2 r^2}{M_1+M_2}} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 7 */
  <div key="ex-7" id="ex-7">
    <ExHd num={7}>
      A flat thin circular disc has a radius {"$R$"} and a circular hole of radius {"$R/2$"} is made in it as shown in fig. 2.89. Calculate the moment of inertia of the system about an axis passing through the centre of disc and perpendicular to the plane of the disc. The mass of the remaining portion of the disc is {"$M$"}.
    </ExHd>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_B58879BF1788B98103D4}
      num="FIGURE 2.89"
    />
    <P2>Let {"$O$"} be the center of the disc. The mass per unit area {"$\\sigma$"} is given by</P2>
    <DM>{"$$\\sigma = \\frac{M}{\\pi R^2 - \\pi(R/2)^2} = \\frac{4M}{3\\pi R^2}$$"}</DM>
    <P2>Let {"$M'$"} = mass of the whole disc (without the hole) and {"$m$"} = mass of removed portion,</P2>
    <DM>{"$$M' = \\sigma\\pi R^2 = \\frac{4}{3}M \\qquad \\text{and} \\qquad m = \\sigma\\pi\\!\\left(\\frac{R}{2}\\right)^{\\!2} = \\frac{M}{3}$$"}</DM>
    <P2>Moment of inertia of the whole disc about {"$O$"} is</P2>
    <DM>{"$$\\frac{1}{2}M'R^2 = \\frac{1}{2}\\cdot\\frac{4M}{3}R^2 = \\frac{2}{3}MR^2$$"}</DM>
    <P2>Moment of inertia of the removed portion about {"$O$"} from parallel axis theorem is</P2>
    <DM>{"$$\\frac{1}{2}m\\!\\left(\\frac{R}{2}\\right)^{\\!2} + m\\!\\left(\\frac{R}{2}\\right)^{\\!2} = \\frac{3}{8}mR^2 = \\frac{3}{8}\\cdot\\frac{M}{3}R^2 = \\frac{1}{8}MR^2$$"}</DM>
    <P2>Therefore, moment of inertia of the remaining portion is</P2>
    <DM>{"$$I = \\frac{2}{3}MR^2 - \\frac{1}{8}MR^2 = \\boxed{\\frac{13}{24}MR^2}$$"}</DM>
  </div>,

  /* Example 8 */
  <div key="ex-8" id="ex-8">
    <ExHd num={8}>
      Find moment of inertia about axis of a bobbin, which is constructed by joining coaxially two identical discs each of mass {"$m$"} and radius {"$2r$"} to a cylinder of mass {"$m$"} and radius {"$r$"} as shown in the fig. 2.90.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_D0A98B138DC3A79E08B9}
      num="FIGURE 2.90"
    />
    <SolHd />
    <P2>The moment of inertia {"$I$"} of the bobbin is equal to the sum of moment of inertias of the two discs and moment of inertia of the cylinder about their axes.</P2>
    <DM>{"$$\\begin{aligned} & I = 2I_{\\text{disc}} + I_{\\text{cylinder}} \\\\ \\therefore\\quad & I = 2\\!\\left[\\frac{1}{2}m(2r)^2\\right] + \\frac{1}{2}mr^2 = \\boxed{\\frac{9}{2}mr^2} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 9 */
  <div key="ex-9" id="ex-9">
    <ExHd num={9}>
      Three identical thin rods, each of mass {"$m$"} and length {"$l$"}, are joined to form an equilateral triangular frame. Find the moment of inertia of the frame about an axis parallel to its one side and passing through the opposite vertex. Also find its radius of gyration about the given axis.
    </ExHd>
    <SolHd />
    <P2>
      The projection of rods {"$AC$"} and {"$BC$"} along perpendicular to axis of rotation {"$OO'$"} is {"$l\\sin 60°$"}. So, each rod can be considered to be a rod of mass {"$m$"} and length {"$l\\sin 60°$"} rotating about axis {"$OO'$"}. Hence, the moment of inertia of each of rod {"$AC$"} and {"$BC$"} about the given axis {"$OO'$"} is
    </P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_A4F18D089C91B27975AB}
      num="FIGURE 2.91"
    />
    <DM>{"$$I_{AC} = I_{BC} = \\frac{m(l\\sin 60°)^2}{3} = \\frac{ml^2}{4}$$"}</DM>
    <P2>and MOI of rod {"$AB$"} about the given axis {"$OO'$"} is</P2>
    <DM>{"$$I_{AB} = m\\!\\left(\\frac{l\\sqrt{3}}{2}\\right)^{\\!2} = \\frac{3}{4}ml^2$$"}</DM>
    <P2>Hence,</P2>
    <DM>{"$$I = I_{AC} + I_{BC} + I_{AB} = \\frac{ml^2}{4} + \\frac{ml^2}{4} + \\frac{3}{4}ml^2 = \\frac{5}{4}ml^2$$"}</DM>
    <DM>{"$$\\text{Now,}\\quad I = Mk^2 \\quad \\Rightarrow k = \\sqrt{\\frac{I}{M}} = \\sqrt{\\frac{(5/4)ml^2}{3m}} = \\boxed{l\\sqrt{\\frac{5}{12}}}$$"}</DM>
  </div>,

  /* Example 10 */
  <div key="ex-10" id="ex-10">
    <ExHd num={10}>
      Find expression for moment of inertia of a uniform disc of mass {"$m$"}, radius {"$r$"} about one of its secant making an angle {"$\\theta$"} with one of its diameter.
    </ExHd>
    <SolHd />
    <P2>Disc, secant {"$DE$"} and diameter {"$DG$"} are shown in fig. 2.92. Moment of Inertia about diameter {"$AB$"} parallel to {"$DE$"} is</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_DD5B4180C9294D9E3F3D}
      num="FIGURE 2.92"
    />
    <DM>{"$$I_{AB} = mr^2/4$$"}</DM>
    <P2>By parallel axis theorem, moment of inertia about secant {"$DE$"} is</P2>
    <DM>{"$$I_{DE} = I_{AB} + m(CF)^2 = \\frac{mr^2}{4} + m(r\\sin\\theta)^2 = \\boxed{mr^2\\!\\left(\\frac{1}{4} + \\sin^2\\theta\\right)}$$"}</DM>
  </div>,

  /* Example 11 */
  <div key="ex-11" id="ex-11">
    <ExHd num={11}>
      Find moment of inertia about a diameter of a hollow sphere of mass {"$m$"}, inner radius {"$r$"} and outer radius {"$R$"}.
    </ExHd>
    <SolHd />
    <P2>The moment of inertia of the hollow sphere about any axis can be obtained by subtracting moment of inertia of the smaller sphere from that of the larger sphere.</P2>
    <P2>The mass of the hollow sphere is {"$m$"}. Density of the material used is {"$\\rho = \\dfrac{m}{(4/3)\\pi(R^3-r^3)}$"}</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_2EA855F599197ABC2232}
      num="FIGURE 2.93"
    />
    <P2>Masses {"$m_1$"} and {"$m_2$"} of the smaller and larger spheres respectively are</P2>
    <DM>{"$$\\begin{aligned} m_1 &= \\rho\\!\\left(\\frac{4}{3}\\pi R^3\\right) = \\frac{mR^3}{R^3-r^3} \\qquad \\text{and} \\qquad m_2 = \\rho\\!\\left(\\frac{4}{3}\\pi r^3\\right) = \\frac{mr^3}{R^3-r^3} \\\\ \\therefore\\quad I &= I_1 - I_2 = \\frac{2m_1 R^2}{5} - \\frac{2m_2 r^2}{5} = \\boxed{\\frac{2m(R^5-r^5)}{5(R^3-r^3)}} \\end{aligned}$$"}</DM>
  </div>,

  /* ─── Section III ─── */
  <ABSecHd key="sec-iii" id="sec-iii" num="III" title="Angular Momentum and its Conservation" />,

  /* Example 12 */
  <div key="ex-12" id="ex-12">
    <ExHd num={12}>
      If the radius of the earth contracts to half of its present value without change in its mass, what will be the new duration of the day?
    </ExHd>
    <SolHd />
    <P2>Angular momentum, {"$L = I\\omega = \\dfrac{2}{5}MR^2\\omega = \\dfrac{2}{5}MR^2\\dfrac{2\\pi}{T}$"}</P2>
    <P2>Since, the angular momentum remains constant, we have {"$T \\propto R^2$"}. Therefore, if radius {"$R$"} becomes half, the time period {"$T$"} becomes one fourth, i.e., <strong>6 hours</strong>.</P2>
  </div>,

  /* Example 13 */
  <div key="ex-13" id="ex-13">
    <ExHd num={13}>
      A wheel of moment of inertia {"$I$"} and radius {"$R$"} is rotating about its axis at an angular speed {"$\\omega_0$"}. It picks up a stationary particle of mass {"$m$"} at its edge. Find the new angular speed of the wheel.
    </ExHd>
    <SolHd />
    <P2>Since, angular momentum remains constant, we have</P2>
    <DM>{"$$I\\omega_0 = I'\\omega' \\qquad \\therefore \\quad \\omega' = \\frac{I\\omega_0}{I'} = \\boxed{\\frac{I\\omega_0}{I + mR^2}}$$"}</DM>
  </div>,

  /* Example 14 */
  <div key="ex-14" id="ex-14">
    <ExHd num={14}>
      A child stands at the centre of a turntable with his two arms outstretched. The turntable is set rotating without friction with an angular speed of 40 rev/min.
    </ExHd>
    <P2>(<em>a</em>) How much is the angular speed of the child if he folds his hands back and thereby reduces his moment of inertia to {"$2/5$"} times the initial value?</P2>
    <P2>(<em>b</em>) What is the ratio of new kinetic energy to the initial kinetic energy of rotation? If the rotational kinetic energy increases, where does it come from?</P2>
    <SolHd />
    <P2>(<em>a</em>) As angular momentum remains conserved, we have</P2>
    <DM>{"$$\\begin{aligned} & I\\omega = I'\\omega' \\quad \\Rightarrow \\quad I\\omega = \\left(\\frac{2}{5}I\\right)\\omega' \\\\ & \\therefore\\; \\omega' = \\frac{5}{2}\\omega = \\frac{5}{2} \\times 40 = \\boxed{100\\text{ rev/min}} \\end{aligned}$$"}</DM>
    <P2>(<em>b</em>)</P2>
    <DM>{"$$\\frac{K'}{K} = \\frac{\\frac{1}{2}I'\\omega'^2}{\\frac{1}{2}I\\omega^2} = \\frac{I'}{I} \\times \\left(\\frac{\\omega'}{\\omega}\\right)^{\\!2} = \\frac{2}{5} \\times \\left(\\frac{5}{2}\\right)^{\\!2} = \\boxed{\\frac{5}{2}}$$"}</DM>
    <P2>The child uses his internal energy to increase his rotational kinetic energy.</P2>
  </div>,

  /* Example 15 */
  <div key="ex-15" id="ex-15">
    <ExHd num={15}>
      A man of mass {"$m$"} stands on a horizontal platform in the shape of a disc of mass {"$M$"} and radius {"$R$"}, pivoted on a vertical axis through its center about which it can freely rotate. The man starts to move around the centre of the disc in a circle of radius {"$r$"} with a velocity {"$v$"} relative to the disc. Calculate the angular velocity of the disc.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_815872CF30C484DAE6B2}
      num="FIGURE 2.94"
    />
    <SolHd />
    <P2>Since, there is no external torque on the system, angular momentum is conserved. Its initial value is zero. When the man starts moving with speed {"$v$"} (relative to the disc), the disc starts rotating in opposite direction with angular velocity {"$\\omega$"}. In ground frame, the speed of man is {"$v - \\omega r$"}. By conservation of angular momentum, we have</P2>
    <DM>{"$$\\begin{aligned} & L_{\\text{man}} + L_{\\text{disc}} = 0 \\quad \\Rightarrow \\quad m(v-\\omega r)r - \\frac{MR^2}{2}\\omega = 0 \\\\ & \\therefore \\quad \\boxed{\\omega = \\frac{mvr}{mr^2 + MR^2/2}} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 16 */
  <div key="ex-16" id="ex-16">
    <ExHd num={16}>
      A particle of mass 1 kg is moving along the line {"$y = x + 2$"} (here, {"$x$"} and {"$y$"} are in meters) with speed 2 m/s. Find the magnitude of angular momentum of particle about origin.
    </ExHd>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_DF7B5DA1B5544574EBBB}
      num="FIGURE 2.95"
    />
    <P2>The magnitude of angular momentum about origin is</P2>
    <DM>{"$$(OA)\\,mv = \\sqrt{2} \\times 1 \\times 2 = \\boxed{2\\sqrt{2}\\text{ kg m}^2\\text{/s}}$$"}</DM>
  </div>,

  /* Example 17 */
  <div key="ex-17" id="ex-17">
    <ExHd num={17}>
      A sphere of mass {"$M$"} and radius {"$R$"} rolls without slipping on a rough surface with centre of mass having constant speed {"$v_0$"}. Find the angular momentum of the sphere about the point of contact.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_B12185BDA89E770FCA93}
      num="FIGURE 2.96"
    />
    <SolHd />
    <P2>{"$\\vec{L}_P = I_{cm}\\vec{\\omega} + \\vec{r} \\times \\vec{p}_{cm} = I_{cm}\\omega_0(-\\hat{k}) + Mv_0 R(-\\hat{k})$"}</P2>
    <P2>Since the sphere is in pure rolling motion, {"$\\omega_0 = v_0/R$"}</P2>
    <DM>{"$$\\therefore \\quad \\overrightarrow{L_P} = \\left[\\frac{2}{5}MR^2\\left(\\frac{v_0}{R}\\right) + Mv_0 R\\right](-\\hat{k}) = \\boxed{\\frac{7}{5}Mv_0 R\\,(-\\hat{k})}$$"}</DM>
  </div>,

  /* Example 18 */
  <div key="ex-18" id="ex-18">
    <ExHd num={18}>
      A circular disc of mass {"$m$"} and radius {"$R$"} is set into motion on a horizontal floor with a linear speed {"$v$"} in the forward direction and an angular speed {"$\\omega = v/R$"} in clockwise direction as shown in fig. 2.97. Find the magnitude of the total angular momentum of the disc about bottommost point {"$P$"} of the disc.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_C5F8F8DD02DC3CA99616}
      num="FIGURE 2.97"
    />
    <SolHd />
    <P2>{"$\\vec{L}_P = I_{cm}\\vec{\\omega} + \\vec{r} \\times m\\vec{v}_{cm}$"}</P2>
    <DM>{"$$\\therefore \\quad |\\vec{L}| = I_{cm}\\omega + Rmv = \\frac{mR^2}{2}\\cdot\\frac{v}{R} + mvR = \\boxed{\\frac{3}{2}mvR}$$"}</DM>
  </div>,

  /* ─── Section IV ─── */
  <ABSecHd key="sec-iv" id="sec-iv" num="IV" title="Torque and Equilibrium of Rigid Bodies" />,

  /* Example 19 */
  <div key="ex-19" id="ex-19">
    <ExHd num={19}>
      A uniform bar of length {"$L$"} is resting at two supports whose distances from the centre of gravity of the bar are {"$l_1$"} and {"$l_2$"} as shown in fig. 2.98. Taking the mass of the bar as {"$M$"}, determine the contact forces acting between the supports and the bar.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_ADC621C2F230A4BE54B5}
      num="FIGURE 2.98"
    />
    <SolHd />
    <P2>Since, the bar does not rotate, the net torque about any point is zero.</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_A0CE2403D2AEEC995D8D}
      num="FIGURE 2.99"
    />
    <P2>About {"$A$"}, clockwise torque = anticlockwise torque</P2>
    <DM>{"$$\\Rightarrow Mg\\,l_1 = F_B(l_1+l_2) \\qquad \\therefore \\boxed{F_B = \\frac{Mgl_1}{l_1+l_2}}$$"}</DM>
    <P2>Similarly, about {"$B$"},</P2>
    <DM>{"$$Mg\\,l_2 = F_A(l_1+l_2) \\qquad \\therefore \\boxed{F_A = \\frac{Mgl_2}{l_1+l_2}}$$"}</DM>
  </div>,

  /* Example 20 */
  <div key="ex-20" id="ex-20">
    <ExHd num={20}>
      Two small kids weighing 20 kg and 25 kg respectively, are trying to balance a seesaw of total length 5.0 m, with the fulcrum at the centre. If one of the kids is sitting at an end, where should the other sit?
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_82E0B7BA3BD77B0E92C1}
      num="FIGURE 2.100"
    />
    <SolHd />
    <P2>If the child of mass 25 kg sits at one end, then the seesaw will always be disbalanced. Therefore, the 20 kg child must sit at one end. Let 25 kg child sits at distance {"$x$"} from centre on the opposite side. The torque about centre {"$O$"} is zero.</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_03F224185BD079000FDC}
      num="FIGURE 2.101"
    />
    <DM>{"$$\\Rightarrow 20g \\times 2{\\cdot}5 = 25g \\times x \\qquad \\therefore \\boxed{x = 2\\text{ m}}$$"}</DM>
  </div>,

  /* Example 21 */
  <div key="ex-21" id="ex-21">
    <ExHd num={21}>
      A uniform rod of mass 20 kg is hanging in horizontal position with the help of two threads. It also supports a 40 kg mass as shown in the fig. 2.102. Find the tension developed in each thread. (Take {"$g = 10\\text{ ms}^{-2}$"})
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_2BA335BE41D5C1F2DB63}
      num="FIGURE 2.102"
    />
    <SolHd />
    <P2>The rod is in translational and rotational equilibrium.</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_727444E9F4BBEEF1F261}
      num="FIGURE 2.103"
    />
    <P2>From FBD, {"$T_A + T_B = 400 + 200 = 600\\text{ N}$"} &nbsp;&nbsp;&nbsp; ...(1)</P2>
    <P2>Taking torque about {"$A$"}, we have</P2>
    <DM>{"$$400 \\times \\frac{l}{4} + 200 \\times \\frac{l}{2} - T_B\\,l = 0 \\qquad\\cdots(2)$$"}</DM>
    <P2>From eqns. (1) and (2), we get {"$\\boxed{T_A = 400\\text{ N}}$"} and {"$\\boxed{T_B = 200\\text{ N}}$"}</P2>
  </div>,

  /* Example 22 */
  <div key="ex-22" id="ex-22">
    <ExHd num={22}>
      A uniform rod {"$OA$"} of mass {"$m$"} is pivoted at {"$O$"} on a vertical wall with the help of a cable {"$AB$"}. Find the tension {"$T$"} in the cable and reaction force {"$R$"} applied by the pivot.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_E250C9C4AE8FC91129F2}
      num="FIGURE 2.104"
    />
    <SolHd />
    <P2>The rod is in translational and rotational equilibrium.</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_10A6B60555E5097E8759}
      num="FIGURE 2.105"
    />
    <P2>About {"$O$"}, net torque is zero</P2>
    <DM>{"$$\\Rightarrow (mg)\\,l/2 - (T\\sin 30°)\\,l = 0 \\qquad \\therefore \\quad \\boxed{T = mg}$$"}</DM>
    <P2>From FBD,</P2>
    <DM>{"$$\\begin{aligned} & R_X = T\\cos 30° = \\sqrt{3}\\,mg/2 \\\\ & R_Y = mg - T\\sin 30° = mg - mg/2 = mg/2 \\end{aligned}$$"}</DM>
    <DM>{"$$R = \\sqrt{R_X^2 + R_Y^2} = \\sqrt{\\left(\\frac{\\sqrt{3}\\,mg}{2}\\right)^{\\!2} + \\left(\\frac{mg}{2}\\right)^{\\!2}} \\qquad \\therefore \\boxed{R = mg}$$"}</DM>
  </div>,

  /* ─── Section V ─── */
  <ABSecHd key="sec-v" id="sec-v" num="V" title="Kinetic Energy (Translational and Rotational)" />,

  /* Example 23 */
  <div key="ex-23" id="ex-23">
    <ExHd num={23}>
      A uniform rod of mass {"$m$"} and length {"$l$"} is kept on a smooth horizontal plane. If the ends {"$A$"} and {"$B$"} of the rod move with speeds {"$v$"} and {"$2v$"} respectively perpendicular to the rod and in opposite directions, find the
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_78234F981F6297D59639}
      num="FIGURE 2.106"
    />
    <P2>(<em>a</em>) angular velocity of the rod and linear velocity of CM of the rod.</P2>
    <P2>(<em>b</em>) kinetic energy of rod (in Joule).</P2>
    <SolHd />
    <P2>(<em>a</em>) From the figure,</P2>
    <DM>{"$$\\begin{aligned} & \\omega = \\frac{2v-(-v)}{l} = \\frac{3v}{l} \\\\ & 2v - v_{\\text{cm}} = \\frac{\\omega l}{2} \\qquad \\therefore \\quad v_{\\text{cm}} = 2v - \\frac{3v}{l}\\times\\frac{l}{2} = \\boxed{\\frac{v}{2}} \\end{aligned}$$"}</DM>
    <P2>(<em>b</em>) {"$K = K_T + K_R = \\dfrac{1}{2}mv_{\\text{cm}}^2 + \\dfrac{1}{2}I_{\\text{cm}}\\omega^2$"}</P2>
    <DM>{"$$= \\frac{1}{2}m\\!\\left(\\frac{v}{2}\\right)^{\\!2} + \\frac{1}{2}\\!\\left(\\frac{ml^2}{12}\\right)\\!\\left(\\frac{3v}{l}\\right)^{\\!2} = \\boxed{\\frac{1}{2}mv^2}$$"}</DM>
  </div>,

  /* Example 24 */
  <div key="ex-24" id="ex-24">
    <ExHd num={24}>
      A uniform disc of radius {"$R$"} rolls perfectly over two horizontal planks {"$A$"} and {"$B$"} moving with velocities {"$v$"} and {"$2v$"}, respectively. Find the
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_6EEB501C8F74BCB90268}
      num="FIGURE 2.107"
    />
    <P2>(<em>a</em>) velocity of CM of the disc</P2>
    <P2>(<em>b</em>) angular velocity of the disc</P2>
    <SolHd />
    <P2>(<em>a</em>) Angular velocity of the disc is</P2>
    <DM>{"$$\\omega = \\frac{2v-(-v)}{2R} = \\frac{3v}{2R} \\text{ clockwise}$$"}</DM>
    <P2>(<em>b</em>) Let {"$v_C$"} be the velocity of centre of mass of the disc. Then,</P2>
    <DM>{"$$\\begin{aligned} & 2v - v_C = \\omega R \\\\ \\therefore\\quad & v_C = 2v - \\omega R = 2v - \\left(\\frac{3v}{2R}\\right)R = \\boxed{\\frac{v}{2} \\text{ towards left}} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 25 */
  <div key="ex-25" id="ex-25">
    <ExHd num={25}>
      A cylinder of radius {"$r = 10$"} cm is placed between two planks. If mass of cylinder = 2 kg, find the kinetic energy of cylinder assuming that there is no slipping at any point.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_EE2A7A982F22D7335306}
      num="FIGURE 2.108"
    />
    <SolHd />
    <P2>Since, there is no slipping, the velocities of points {"$A$"} and {"$B$"} of the cylinder are equal to the velocities of planks.</P2>
    <DM>{"$$\\begin{aligned} & v_C = \\frac{v_A + v_B}{2} = \\frac{10+4}{2} = 7\\text{ m/s} \\\\ & \\omega = \\frac{v_A - v_B}{2r} = \\frac{10-4}{2 \\times 0{\\cdot}1} = 30\\text{ rad/s} \\end{aligned}$$"}</DM>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_11B300655D74E49EC684}
      num="FIGURE 2.109"
    />
    <P2>{"$\\therefore\\; KE$"} of cylinder</P2>
    <DM>{"$$\\begin{aligned} &= \\frac{1}{2}mv_C^2 + \\frac{1}{2}I_C\\omega^2 = \\frac{1}{2}mv_C^2 + \\frac{1}{2}\\!\\left(\\frac{mr^2}{2}\\right)\\omega^2 \\\\ &= \\frac{1}{2}\\times 2\\times 7^2 + \\frac{1}{4}\\times 2\\times 0{\\cdot}1^2 \\times 30^2 = \\boxed{53{\\cdot}5\\text{ J}} \\end{aligned}$$"}</DM>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_9D353FC159FB95017968}
      num="FIGURE 2.111"
    />
  </div>,

  /* Example 26 */
  <div key="ex-26" id="ex-26">
    <ExHd num={26}>
      A rod of mass {"$m$"} and length {"$l$"} is connected with a light rod of length {"$l$"}. The composite rod is made to rotate with angular velocity {"$\\omega$"} as shown in the fig. 2.110. Find the
    </ExHd>
    <P2>(<em>a</em>) translational kinetic energy</P2>
    <P2>(<em>b</em>) rotational kinetic energy</P2>
    <P2>(<em>c</em>) total kinetic energy of rod.</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_9466EDE23ED866A71F3F}
      num="FIGURE 2.110"
    />
    <SolHd />
    <P2>(<em>a</em>) The velocity of centre of mass of rod of mass {"$m$"} is {"$v_{\\text{cm}} = \\omega(3l/2)$"}</P2>
    <DM>{"$$\\therefore \\quad K_T = \\frac{1}{2}mv_{\\text{cm}}^2 = \\frac{1}{2}m\\!\\left(\\frac{3}{2}\\omega l\\right)^{\\!2} = \\boxed{\\frac{9}{8}m\\omega^2 l^2}$$"}</DM>
    <P2>(<em>b</em>)</P2>
    <DM>{"$$K_R = \\frac{1}{2}I_{\\text{cm}}\\omega^2 = \\frac{1}{2}\\!\\left(\\frac{ml^2}{12}\\right)\\omega^2 = \\boxed{\\frac{1}{24}m\\omega^2 l^2}$$"}</DM>
    <P2>(<em>c</em>)</P2>
    <DM>{"$$K_{\\text{Total}} = K_T + K_R = \\frac{9}{8}m\\omega^2 l^2 + \\frac{1}{24}m\\omega^2 l^2 = \\boxed{\\frac{7}{6}m\\omega^2 l^2}$$"}</DM>
  </div>,

  /* Example 27 */
  <div key="ex-27" id="ex-27">
    <ExHd num={27}>
      A uniform rigid body of mass {"$m$"} and round section of radius {"$r$"} is rolling on horizontal ground with angular velocity {"$\\omega$"}. Its radius of gyration about the centroidal axis is {"$k$"}.
    </ExHd>
    <P2>(<em>a</em>) Write expression of its kinetic energy using moment of inertia about instantaneous axis of rotation.</P2>
    <P2>(<em>b</em>) Also express the kinetic energy as sum of kinetic energy due to translation of center of mass and kinetic energy due to rotation.</P2>
    <SolHd />
    <P2>(<em>a</em>) The point of contact with ground of a body rolling on the ground is its <em>IAOR</em>. The moment of inertia {"$I_P$"} of the body about this point is</P2>
    <DM>{"$$\\begin{aligned} & I_P = I_C + m(PC)^2 = mk^2 + mr^2 = m(k^2+r^2) \\\\ & \\therefore \\quad K = \\frac{1}{2}I_P\\omega^2 = \\boxed{\\frac{1}{2}m(k^2+r^2)\\omega^2} \\end{aligned}$$"}</DM>
    <P2>(<em>b</em>) Kinetic energy of the body due to translation of its center of mass and kinetic energy due to rotation are respectively</P2>
    <DM>{"$$K_T = \\frac{1}{2}mv^2 = \\frac{1}{2}mr^2\\omega^2 \\qquad \\text{and} \\qquad K_R = \\frac{1}{2}I\\omega^2 = \\frac{1}{2}mk^2\\omega^2$$"}</DM>
    <DM>{"$$\\therefore \\quad K = K_R + K_T = \\frac{1}{2}m(k^2+r^2)\\omega^2$$"}</DM>
  </div>,

  /* ─── Section VI ─── */
  <ABSecHd key="sec-vi" id="sec-vi" num="VI" title="Conservation of Mechanical Energy" />,

  /* Example 28 */
  <div key="ex-28" id="ex-28">
    <ExHd num={28}>
      A rod of length {"$l$"} is pivoted about a horizontal, frictionless pin through one end. The rod is released from rest in a vertical position. Find the velocity of CM of the rod when the rod is inclined at an angle {"$\\theta$"} from the vertical.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_A89E4E79D30AE18114CE}
      num="FIGURE 2.112"
    />
    <SolHd />
    <P2>From initial vertical position to the inclined position as shown in fig. 2.112, the centre of mass {"$CM$"} has moved down by distance</P2>
    <DM>{"$$h = \\frac{l}{2}(1-\\cos\\theta)$$"}</DM>
    <P2>Applying conservation of mechanical energy, we have Loss in PE = Gain in KE</P2>
    <DM>{"$$\\begin{aligned} & \\Rightarrow mgh = \\frac{1}{2}I\\omega^2 \\quad \\Rightarrow \\quad mg\\frac{l}{2}(1-\\cos\\theta) = \\frac{1}{2}\\left(\\frac{ml^2}{3}\\right)\\omega^2 \\\\ & \\Rightarrow \\omega = \\sqrt{\\frac{3g}{l}(1-\\cos\\theta)} \\\\ & \\therefore \\quad v_{CM} = \\omega\\frac{l}{2} = \\boxed{\\sqrt{\\frac{3gl(1-\\cos\\theta)}{4}}} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 29 */
  <div key="ex-29" id="ex-29">
    <ExHd num={29}>
      A light rod carries three equal masses {"$A$"}, {"$B$"} and {"$C$"} as shown in fig. 2.113. What will be velocity of {"$B$"} in vertical position of rod, if it is released from horizontal position as shown in fig. 2.113?
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_B07B0703143ABB3D7444}
      num="FIGURE 2.113"
    />
    <SolHd />
    <P2>The loss in gravitational potential energy will be equal to the gain in rotational kinetic energy.</P2>
    <DM>{"$$\\begin{aligned} & \\Rightarrow \\quad mg\\!\\left(\\frac{l}{3}\\right) + mg\\!\\left(\\frac{2l}{3}\\right) + mg\\!\\left(\\frac{3l}{3}\\right) \\\\ & \\quad = \\frac{1}{2}\\!\\left[m\\!\\left(\\frac{l}{3}\\right)^{\\!2} + m\\!\\left(\\frac{2l}{3}\\right)^{\\!2} + m\\!\\left(\\frac{3l}{3}\\right)^{\\!2}\\right]\\omega^2 \\\\ & \\Rightarrow \\quad 2mgl = \\frac{1}{2}ml^2\\omega^2 \\times \\frac{14}{9} \\qquad \\Rightarrow \\omega = \\sqrt{\\frac{18g}{7l}} \\end{aligned}$$"}</DM>
    <P2>Therefore, velocity of point {"$B$"} at lowest position is</P2>
    <DM>{"$$v_B = \\frac{2l}{3} \\times \\omega = \\boxed{\\sqrt{\\frac{8gl}{7}}}$$"}</DM>
  </div>,

  /* Example 30 */
  <div key="ex-30" id="ex-30">
    <ExHd num={30}>
      A solid cylinder of mass {"$m$"} and radius {"$r$"} starts rolling down an inclined plane of inclination {"$\\theta$"}. Friction is enough to prevent slipping. Find the speed of its centre of mass when its centre of mass has fallen a height {"$h$"}.
    </ExHd>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_AC9B73D5BD0EA77D18F4}
      num="FIGURE 2.114"
    />
    <P2>Applying conservation of mechanical energy, we have Loss in PE = Gain in KE</P2>
    <DM>{"$$\\begin{aligned} \\Rightarrow \\quad mgh &= \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2 = \\frac{1}{2}mv^2 + \\frac{1}{2}\\!\\left(\\frac{mr^2}{2}\\right)\\!\\left(\\frac{v}{r}\\right)^{\\!2} = \\frac{3}{4}mv^2 \\\\ \\therefore \\quad & \\boxed{v = \\sqrt{\\frac{4}{3}gh}} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 31 */
  <div key="ex-31" id="ex-31">
    <ExHd num={31}>
      A solid ball rolls down parabolic path {"$ABC$"} from a height {"$h$"} as shown in fig. 2.115. Portion {"$AB$"} of the path is rough while {"$BC$"} is smooth. How high will ball climb in {"$BC$"}?
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_55D4867AC485831FC65E}
      num="FIGURE 2.115"
    />
    <SolHd />
    <P2>Let {"$h'$"} be the height to which the ball will climb.</P2>
    <P2>Since, {"$AB$"} is rough, the ball will have both translational and rotational {"$KE$"} at point {"$B$"}. Since, {"$BC$"} is smooth, at {"$C$"}, there will be no change in rotational {"$KE$"} but translational {"$KE$"} will become zero.</P2>
    <P2>Applying cons. of mechanical energy between {"$A$"} and {"$B$"}, we have Loss in PE = Gain in KE</P2>
    <DM>{"$$\\Rightarrow \\quad mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}\\!\\left(\\frac{2}{5}mr^2\\right)\\!\\left(\\frac{v}{r}\\right)^{\\!2} = \\frac{7}{10}mv^2$$"}</DM>
    <P2>Therefore at {"$B$"}, {"$v = \\sqrt{\\dfrac{10}{7}gh}$"}</P2>
    <P2>Applying cons. of mechanical energy between {"$B$"} and {"$C$"}, we have Gain in PE = Loss in KE</P2>
    <DM>{"$$\\Rightarrow \\quad mgh' = \\frac{1}{2}mv^2 = \\frac{1}{2}m\\!\\left(\\frac{10}{7}gh\\right) \\qquad \\therefore \\quad \\boxed{h' = \\frac{5}{7}h}$$"}</DM>
  </div>,

  /* ─── Section VII ─── */
  <ABSecHd key="sec-vii" id="sec-vii" num="VII" title="Pure Rolling (Rolling without Slipping)" />,

  /* Example 32 */
  <div key="ex-32" id="ex-32">
    <ExHd num={32}>
      In the arrangement shown in fig. 2.116, the mass of the uniform solid cylinder of radius {"$R$"} is equal to {"$m$"} and the masses of two bodies are equal to {"$m_1$"} and {"$m_2$"}. Assume that the thread does not slip and the friction in the axle of the cylinder is absent. Find the ratio of tensions {"$T_1/T_2$"} of the vertical sections of the thread during motion of the masses.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_940D319DA61A91405FDA}
      num="FIGURE 2.116"
    />
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_7057778DF3F8A7DC26AC}
      num="FIGURE 2.117"
    />
    <P2>Since, the thread does not slip on the cylinder, the linear accelerations of {"$m_1$"}, {"$m_2$"} and points on the circumference of the cylinder are same</P2>
    <DM>{"$$\\Rightarrow \\quad a = \\alpha R \\qquad\\cdots(1)$$"}</DM>
    <P2>From F.B.D, we get {"$m_2 g - T_2 = m_2 a$"}</P2>
    <DM>{"$$T_1 - m_1 g = m_1 a \\qquad\\cdots(2)$$"}</DM>
    <DM>{"$$T_2 R - T_1 R = I\\alpha = \\frac{mR^2}{2}\\times\\frac{a}{R} = \\frac{mR}{2}\\,a \\qquad\\cdots(3)$$"}</DM>
    <P2>or {"$T_2 - T_1 = \\dfrac{m}{2}a$"} &nbsp;&nbsp;&nbsp; ...(4)</P2>
    <P2>From eqns. (2), (3) and (4), we get</P2>
    <DM>{"$$a = \\frac{m_2 - m_1}{m_1+m_2+m/2}\\,g, \\quad T_1 = \\frac{m_1(2m_2+m/2)}{m_1+m_2+m/2}\\,g, \\quad T_2 = \\frac{m_2(2m_1+m/2)}{m_1+m_2+m/2}\\,g$$"}</DM>
    <DM>{"$$\\therefore \\quad \\boxed{\\frac{T_1}{T_2} = \\frac{m_1(4m_2+m)}{m_2(4m_1+m)}}$$"}</DM>
  </div>,

  /* Example 33 */
  <div key="ex-33" id="ex-33">
    <ExHd num={33}>
      A uniform cylinder of mass {"$M$"} and radius {"$R$"} is kept on an accelerating platform of mass {"$M$"} as shown in fig. 2.118. If the cylinder rolls without slipping on the platform, determine the magnitude of acceleration of the centre of mass of the cylinder. If the coefficient of friction {"$\\mu = 0{\\cdot}40$"}, determine the maximum acceleration the platform may have so that there is no slipping between the cylinder and the platform.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_B76C7701EB3BCB91B584}
      num="FIGURE 2.118"
    />
    <SolHd />
    <P2>From FBD, {"$f = Ma_C \\quad \\Rightarrow a_C = f/M$"}</P2>
    <DM>{"$$fR = I_C\\alpha = \\frac{MR^2}{2}\\alpha \\qquad \\Rightarrow \\alpha = \\frac{2f}{MR}$$"}</DM>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_81B9AA53B16E57698BF7}
      num="FIGURE 2.119"
    />
    <P2>For no slipping at point {"$P$"},</P2>
    <DM>{"$$\\begin{aligned} & a_P - a_C = \\alpha R \\\\ \\Rightarrow\\quad & a - \\frac{f}{M} = \\frac{2f}{MR}\\times R \\qquad \\Rightarrow f = \\frac{Ma}{3} \\\\ \\therefore\\quad & \\boxed{a_C = \\frac{f}{M} = \\frac{a}{3}} \\\\ & f \\leq \\mu N \\qquad \\Rightarrow \\frac{Ma}{3} \\leq \\mu Mg \\\\ \\therefore\\quad & \\boxed{a_{\\max} = 3\\mu g} \\end{aligned}$$"}</DM>
  </div>,

  /* Example 34 */
  <div key="ex-34" id="ex-34">
    <ExHd num={34}>
      A force {"$F$"} is applied on a disc (of mass {"$m$"} and radius {"$r$"}) at its centre. Find acceleration of centre of mass in the case of pure rolling and also find minimum coefficient of friction required for pure rolling.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_6C5044161B6274C2ABE6}
      num="FIGURE 2.120"
    />
    <SolHd />
    <P2>From FBD, we have</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_8CCEF194941832D7295C}
      num="FIGURE 2.121"
    />
    <DM>{"$$\\begin{aligned} & N = mg \\qquad\\text{...(1)} \\\\ & F - f = ma \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
    <P2>About {"$CM$"},</P2>
    <DM>{"$$\\Rightarrow \\quad fr = \\left(\\frac{mr^2}{2}\\right)\\!\\left(\\frac{a}{r}\\right) \\qquad\\text{...(3)}$$"}</DM>
    <DM>{"$$\\Rightarrow \\quad f = \\frac{ma}{2}$$"}</DM>
    <P2>From eqns. (2) and (3), {"$a = \\dfrac{2F}{3m}$"} and {"$f = \\dfrac{F}{3}$"}</P2>
    <P2>Since, {"$f \\leq \\mu N$"}, we have {"$\\dfrac{F}{3} \\leq \\mu mg \\qquad \\therefore \\quad \\boxed{\\mu \\geq \\dfrac{F}{3mg}}$"}</P2>
  </div>,

  /* Example 35 */
  <div key="ex-35" id="ex-35">
    <ExHd num={35}>
      A horizontal force {"$F$"} acts on the sphere (of mass {"$m$"} and radius {"$r$"}) at its centre as shown. Coefficient of friction between ground and sphere is {"$\\mu$"}. What is maximum value of {"$F$"}, for which there is no slipping?
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_5D67C6A6CDAFAA4C07F2}
      num="FIGURE 2.122"
    />
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_A855A8A6313222F60E38}
      num="FIGURE 2.123"
    />
    <P2>From FBD, we have</P2>
    <DM>{"$$\\begin{aligned} & N = mg \\qquad\\text{...(1)} \\\\ & F - f = ma \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
    <P2>About {"$CM$"},</P2>
    <DM>{"$$fr = I\\alpha = \\left(\\frac{2}{5}mr^2\\right)\\!\\left(\\frac{a}{r}\\right) \\quad \\Rightarrow \\quad f = \\frac{2}{5}ma \\qquad\\text{...(3)}$$"}</DM>
    <P2>From eqns. (2) and (3), we have {"$f = \\dfrac{2}{7}F$"}</P2>
    <P2>Since, {"$f \\leq \\mu N$"}, we have {"$\\dfrac{2}{7}F \\leq \\mu mg$"}</P2>
    <DM>{"$$\\therefore \\quad \\boxed{F \\leq \\frac{7}{2}\\mu mg}$$"}</DM>
  </div>,

  /* Example 36 */
  <div key="ex-36" id="ex-36">
    <ExHd num={36}>
      A tangential force {"$F$"} acts at the top of a thin spherical shell of mass {"$m$"} and radius {"$R$"}. Find the acceleration of the shell if it rolls without slipping.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_DC4C93426B51B22B5AF8}
      num="FIGURE 2.124"
    />
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_FCD536706DBE58530A80}
      num="FIGURE 2.125"
    />
    <P2>From FBD, we have</P2>
    <DM>{"$$\\begin{aligned} & F - f = ma \\qquad\\text{...(1)} \\\\ & (F+f)R = I\\alpha = \\left(\\frac{2}{3}mR^2\\right)\\!\\left(\\frac{a}{R}\\right) \\\\ \\Rightarrow\\quad & F + f = \\frac{2}{3}ma \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
    <P2>From eqns. (1) and (2), we have {"$2F = \\dfrac{5}{3}ma$"}</P2>
    <DM>{"$$\\therefore \\quad \\boxed{a = \\frac{6F}{5m}}$$"}</DM>
  </div>,

  /* Example 37 */
  <div key="ex-37" id="ex-37">
    <ExHd num={37}>
      Consider a disc of mass {"$m$"} and radius {"$R$"} placed on a rough plank of mass {"$M$"} which in turn is placed on a smooth horizontal surface. Now plank is pulled by force {"$F$"} and disc starts to roll on the plank. Find the
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_77B0DECC4F8018A23F7E}
      num="FIGURE 2.126"
    />
    <P2>(<em>a</em>) friction force acting on the disc</P2>
    <P2>(<em>b</em>) angular acceleration of the disc</P2>
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_0E8922A1717CEC154F49}
      num="FIGURE 2.127"
    />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_65F99CBE6C303590B195}
      num="FIGURE 2.127"
    />
    <P2>From FBD of plank, {"$F - f = MA$"} &nbsp;&nbsp;&nbsp; ...(1)</P2>
    <P2>Since, the disc rolls on the plank, the acceleration of point of contact of disc and plank are same (equal to {"$A$"}).</P2>
    <DM>{"$$\\Rightarrow \\quad A - a = R\\alpha \\qquad\\cdots(2)$$"}</DM>
    <P2>From FBD of disc, {"$f = ma$"} &nbsp;&nbsp;&nbsp; ...(3)</P2>
    <P2>About the centre of disc, {"$fR = I\\alpha$"}</P2>
    <DM>{"$$\\Rightarrow fR = \\left(\\frac{mR^2}{2}\\right)\\!\\left(\\frac{A-a}{R}\\right) \\quad \\Rightarrow f = \\frac{m}{2}(A-a) \\qquad\\cdots(4)$$"}</DM>
    <P2>(<em>a</em>) From eqns. (1) and (3), {"$A = \\dfrac{F-f}{M}$"} and {"$a = \\dfrac{f}{m}$"}</P2>
    <P2>Putting these in eqn. (4), we get</P2>
    <DM>{"$$\\frac{2f}{m} = \\frac{F-f}{M} - \\frac{f}{m} \\qquad \\therefore \\quad \\boxed{f = \\frac{Fm}{m+3M}}$$"}</DM>
    <P2>(<em>b</em>)</P2>
    <DM>{"$$A = \\frac{F-f}{M} = \\frac{3F}{m+3M} \\qquad \\text{and} \\qquad a = \\frac{f}{m} = \\frac{F}{m+3M}$$"}</DM>
    <DM>{"$$\\therefore \\quad \\alpha = \\frac{A-a}{R} = \\boxed{\\frac{2F}{(m+3M)R}}$$"}</DM>
  </div>,

  /* ─── Section VIII ─── */
  <ABSecHd key="sec-viii" id="sec-viii" num="VIII" title="Miscellaneous Applications" />,

  /* Example 38 */
  <div key="ex-38" id="ex-38">
    <ExHd num={38}>
      A disc of radius {"$R$"} at time {"$t = 0$"} starts moving along the positive {"$x$"} axis with linear speed {"$v$"} and angular speed {"$\\omega$"}. Find the {"$x$"} and {"$y$"} coordinates of the bottommost point at any time {"$t$"}.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_CE1A1F09FDCD944B8634}
      num="FIGURE 2.128"
    />
    <SolHd />
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_1839CB59E5D1CFABDAB0}
      num="FIGURE 2.129"
    />
    <P2>After time {"$t$"}, the centre {"$C$"} moves by a horizontal distance, {"$s = vt$"}, and bottommost point {"$O$"} rotates by angle {"$\\theta = \\omega t$"} w.r.t. the disc.</P2>
    <P2>Its new coordinate w.r.t. disc is {"$(-R\\sin\\theta,\\; R - R\\cos\\theta)$"}</P2>
    <P2>Therefore, its coordinate w.r.t. ground is</P2>
    <DM>{"$$(s - R\\sin\\theta,\\; R - R\\cos\\theta) \\quad \\text{or} \\quad \\boxed{(vt - R\\sin\\omega t,\\; R - R\\cos\\omega t)}$$"}</DM>
  </div>,

  /* Example 39 */
  <div key="ex-39" id="ex-39">
    <ExHd num={39}>
      A uniform rod of length {"$L$"} and mass {"$M$"} is pivoted freely at one end placed in vertical position.
    </ExHd>
    <P2>(<em>a</em>) What is the angular acceleration of the rod when it is at an angle {"$\\theta$"} with the vertical?</P2>
    <P2>(<em>b</em>) What is the tangential linear acceleration of the free end when the rod is horizontal?</P2>
    <SolHd />
    <P2>The instantaneous axis of rotation passes through {"$O$"}.</P2>
    <P2>(<em>a</em>) Taking torque about {"$O$"}, we have</P2>
    <DM>{"$$\\frac{ML^2}{3}\\alpha = Mg\\frac{L}{2}\\sin\\theta \\qquad \\therefore \\quad \\boxed{\\alpha = \\frac{3Mg\\sin\\theta}{2L}}$$"}</DM>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_F3A690C0A26EC56073D3}
      num="FIGURE 2.130"
    />
    <P2>(<em>b</em>) When the rod is horizontal, {"$\\theta = 90°$"} and {"$\\alpha = 3g/2L$"}</P2>
    <P2>The acceleration of free end is {"$a = \\alpha L = \\boxed{3g/2}$"}</P2>
  </div>,

  /* Example 40 */
  <div key="ex-40" id="ex-40">
    <ExHd num={40}>
      A thin horizontal uniform rod {"$AB$"} of mass {"$m$"} and length {"$l$"} can rotate freely about a vertical axis passing through its end {"$A$"}. The end {"$B$"} starts experiencing a constant force {"$F$"} which is always perpendicular to the original position of the stationary rod and directed in a horizontal plane. Find the angular velocity of the rod as a function of its rotation angle {"$\\theta$"} measured relative to the initial position.
    </ExHd>
    <SolHd />
    <P2>The displacement of end {"$B$"} in the direction of force {"$F$"} is {"$l\\sin\\theta$"}. Therefore, work done by force {"$F$"} in rotating the rod by angle {"$\\theta$"} is {"$W = Fl\\sin\\theta$"}.</P2>
    <P2>By work energy theorem, {"$W = \\Delta K$"}</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_BE1623BBB142F3E79D2A}
      num="FIGURE 2.131"
    />
    <DM>{"$$\\Rightarrow \\quad Fl\\sin\\theta = \\frac{1}{2}\\!\\left(\\frac{ml^2}{3}\\right)\\omega^2 - 0 \\qquad \\therefore \\quad \\boxed{\\omega = \\sqrt{\\frac{6F\\sin\\theta}{ml}}}$$"}</DM>
  </div>,

  /* Example 41 */
  <div key="ex-41" id="ex-41">
    <ExHd num={41}>
      A uniform rod of mass {"$m$"} and length {"$l$"} is pivoted smoothly at {"$O$"}. A horizontal force acts at the bottom of the rod.
    </ExHd>
    <P2>(<em>a</em>) Find the angular velocity of the rod as the function of angle of rotation {"$\\theta$"}.</P2>
    <P2>(<em>b</em>) What is the maximum angular displacement of the rod.</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_1CF16C6563D2D9CCE613}
      num="FIGURE 2.132"
    />
    <SolHd />
    <P2>(<em>a</em>) By work energy theorem, {"$W_F + W_{mg} = \\Delta K$"}</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_59258492C7063D40038E}
      num="FIGURE 2.133"
    />
    <DM>{"$$\\begin{aligned} & \\Rightarrow Fl\\sin\\theta - mg\\!\\left[\\frac{l}{2}(1-\\cos\\theta)\\right] = \\frac{1}{2}\\frac{ml^2}{3}\\omega^2 - 0 \\\\ & \\therefore \\quad \\boxed{\\omega = \\sqrt{\\frac{6F\\sin\\theta}{ml} - \\frac{3g(1-\\cos\\theta)}{l}}} \\end{aligned}$$"}</DM>
    <P2>(<em>b</em>) At maximum angular displacement, {"$\\omega = 0$"}</P2>
    <DM>{"$$\\begin{aligned} & \\Rightarrow \\quad \\frac{6F\\sin\\theta}{ml} = \\frac{3g(1-\\sin\\theta)}{l} \\\\ & \\Rightarrow \\quad \\frac{2F}{mg} = \\frac{1-\\sin\\theta}{\\sin\\theta} = \\frac{2\\sin^2\\theta/2}{2\\sin\\theta/2\\cos\\theta/2} \\\\ & \\Rightarrow \\quad \\tan\\theta/2 = 2F/mg \\end{aligned}$$"}</DM>
    <DM>{"$$\\therefore \\quad \\boxed{\\theta = 2\\tan^{-1}(2F/mg)}$$"}</DM>
  </div>,

  /* Example 42 */
  <div key="ex-42" id="ex-42">
    <ExHd num={42}>
      Two discs of radii {"$R$"} and {"$2R$"} are pressed against each other. Initially disc with radius {"$R$"} is rotating with angular velocity {"$\\omega_0$"} and other disc was stationary. Both discs are hinged at their respective centres and free to rotate about them. Moment of inertia of smaller disc is {"$I$"} and of bigger disc is {"$2I$"} about their respective axis of rotation. Find the angular velocity of the bigger disc after long time.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_82CB1B7BA68A0C5ACF58}
      num="FIGURE 2.134"
    />
    <SolHd />
    <P2>An equal and opposite frictional force will act on both the discs till the time rolling starts and hence the linear speed of the circumference of the two discs become the same.</P2>
    <P2>Let {"$\\omega_s$"} = angular velocity of smaller disc after long time; {"$\\omega_b$"} = angular velocity of bigger disc after long time; {"$f$"} = frictional force on the two discs.</P2>
    <P2>Then, {"$\\omega_s R = \\omega_b(2R)\\quad$"} or {"$\\quad\\omega_s = 2\\omega_b$"} &nbsp;&nbsp;&nbsp; ...(1)</P2>
    <P2>For smaller disc, {"$fR = I\\left(\\dfrac{\\omega_0 - \\omega_s}{t}\\right)$"}</P2>
    <P2>and for bigger disc, {"$f(2R) = (2I)\\left(\\dfrac{\\omega_b - 0}{t}\\right)$"}</P2>
    <DM>{"$$\\Rightarrow \\quad \\omega_0 - \\omega_s = \\omega_b \\qquad\\cdots(2)$$"}</DM>
    <P2>From eqns. (1) and (2), we get {"$\\boxed{\\omega_b = \\omega_0/3}$"}</P2>
  </div>,

  /* Example 43 */
  <div key="ex-43" id="ex-43">
    <ExHd num={43}>
      A uniform rod {"$AB$"} of mass {"$m = 1$"} kg moves translationally with acceleration {"$2\\text{ m/s}^2$"} due to two antiparallel forces {"$F_1$"} and {"$F_2$"} (see fig. 2.135). The distance between the points at which these forces act is equal to {"$d = 20$"} cm. If it is known that {"$F_2 = 5$"} N, find the length of the rod.
    </ExHd>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_FE1060110A64BC623C13}
      num="FIGURE 2.135"
    />
    <SolHd />
    <P2>Since, the rod moves translationally, the angular acceleration {"$\\alpha$"} is zero. From FBD, we have</P2>
    <DM>{"$$F_2 - F_1 = ma_{cm} \\qquad\\cdots(1)$$"}</DM>
    <P2>Since, {"$\\alpha = 0$"}, the torque about {"$CM$"} is zero, i.e.,</P2>
    <DM>{"$$F_2\\!\\left(\\frac{L}{2} - d\\right) - F_1\\frac{L}{2} = 0 \\qquad\\cdots(2)$$"}</DM>
    <P2>Solving eqns. (1) and (2), we get</P2>
    <DM>{"$$L = \\frac{2F_2 d}{ma_{cm}} = \\frac{2 \\times 5 \\times 0{\\cdot}2}{1 \\times 2} = \\boxed{1\\text{ m}}$$"}</DM>
  </div>,

  /* Example 44 */
  <div key="ex-44" id="ex-44">
    <ExHd num={44}>
      A uniform disc of mass {"$M$"} and radius {"$R$"} rotating about a vertical axis passing through its center and perpendicular to its plane is placed gently on a rough horizontal ground, where coefficient of friction is {"$\\mu$"}. Calculate the torque on the disc due to frictional forces.
    </ExHd>
    <SolHd />
    <P2>When the disc rotates on the ground, kinetic friction acts at every contact point. Since the gravity acts uniformly everywhere and the disc is also uniform, the normal reaction from the ground is uniformly distributed over the entire contact area. Consider an element of the disc in form of a ring of radius {"$r$"} and width {"$dr$"} shown by dashed lines. Its mass is</P2>
    <Fig
      src={CONTENT_IMAGES.CONTENT_IMAGE_75809B7830C9C1CF1F5F}
      num="FIGURE 2.136"
    />
    <DM>{"$$dm = \\frac{M}{\\pi R^2}(2\\pi r\\,dr) = \\frac{2M}{R^2}\\,r\\,dr$$"}</DM>
    <P2>The friction force on it is</P2>
    <DM>{"$$df = \\mu\\,(dm)\\,g = \\frac{2\\mu Mg}{R^2}\\,r\\,dr$$"}</DM>
    <P2>The torque due to friction on this ring is</P2>
    <DM>{"$$d\\tau = r\\,df = \\frac{2\\mu Mg}{R^2}\\,r^2\\,dr$$"}</DM>
    <P2>The total torque due to friction on the disc is</P2>
    <DM>{"$$\\tau = \\int d\\tau = \\frac{2\\mu Mg}{R^2}\\int_0^R r^2\\,dr = \\boxed{\\frac{2}{3}\\mu MgR}$$"}</DM>
  </div>,

  /* Example 45 */
  <div key="ex-45" id="ex-45">
    <ExHd num={45}>
      A uniform disc of mass {"$M$"} and radius {"$R$"} rotating with angular velocity {"$\\omega_0$"} about a vertical axis passing through its center and perpendicular to its plane is placed gently on a rough horizontal ground, where coefficient of friction is {"$\\mu$"}. How long it will take to stop.
    </ExHd>
    <SolHd />
    <P2>The torque of friction forces on the disc is</P2>
    <DM>{"$$\\tau = \\frac{2}{3}\\mu MgR$$"}</DM>
    <P2>The angular impulse of the torque of friction is responsible to stop the disc. Applying angular impulse momentum principle, we have</P2>
    <DM>{"$$\\begin{aligned} & \\tau\\,t = I\\omega_0 - 0 \\\\ \\Rightarrow\\quad & \\frac{2}{3}\\mu MgR\\,t = \\frac{MR^2}{2}\\omega_0 \\qquad \\therefore \\quad \\boxed{t = \\frac{3R\\omega_0}{4\\mu g}} \\end{aligned}$$"}</DM>
  </div>,
];

/* ══════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════ */
export default function AppBooster1() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div style={{
      background: "#fff", minHeight: "100vh",
      fontFamily: "'Lora', Georgia, serif",
      fontSize: 17, lineHeight: 1.58, color: "#1a1a1a",
    }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
      <div style={{ padding: "0 clamp(14px,4vw,28px) 60px clamp(14px,4vw,28px)", overflowX: "hidden" }}>
        <AppBoosterCover />
        {allContent}
      </div>
    </div>
  );
}
