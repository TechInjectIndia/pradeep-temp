"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import React, { useState, useEffect } from "react";

// ── COMPONENT LIBRARY ─────────────────────────────────────────
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

const Sup = ({ c }) => <sup style={{ fontSize: "0.72em" }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em" }}>{c}</sub>;
const Frac = ({ n, d }) => (
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center",
    verticalAlign: "middle", lineHeight: 1.25, margin: "0 3px", fontSize: "0.95em" }}>
    <span style={{ borderBottom: "1.5px solid #1a1a1a", padding: "0 4px 1px", textAlign: "center", whiteSpace: "nowrap" }}>{n}</span>
    <span style={{ padding: "1px 4px 0", textAlign: "center", whiteSpace: "nowrap" }}>{d}</span>
  </span>
);
const Arrow = () => <span style={{ margin: "0 6px" }}>⟶</span>;
const Eq = () => <span style={{ margin: "0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin: "0 4px" }}>×</span>;

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
      fontWeight: 800, color: P_COLOR, textTransform: "uppercase",
      letterSpacing: "0.5px", margin: 0 }}>
      {label ? `${label}. ` : ""}{title}
    </h2>
    <div style={{ borderTop: "1.5px solid #8b0a4e", marginTop: 4 }} />
  </div>
);

const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
    fontWeight: 700, color: P_COLOR, margin: "16px 0 8px" }}>{label ? `${label}. ` : ""}{title}</h3>
);

const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5,
    fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>{label ? `${label}. ` : ""}{title}</h4>
);

const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 11px", textAlign: "justify", ...style }}>{children}</p>
);

const DefBox = ({ children }) => (
  <div style={{ border: "1.5px solid #888", padding: "10px 16px", margin: "12px 0",
    fontStyle: "italic", background: "#fafafa", fontSize: "16px", lineHeight: 1.65 }}>
    {children}
  </div>
);

const ActivityBox = ({ num, sub, children }) => (
  <div style={{ border: "1.5px solid #888", borderLeft: "5px solid #8b0a4e", margin: "18px 0" }}>
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

const KBBox = ({ title, children }) => (
  <div style={{ border: "2px solid #8b0a4e", margin: "20px 0" }}>
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
  <div style={{ border: "2px solid #8b0a4e", margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff", textAlign: "center",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 16, letterSpacing: 2, padding: 7 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding: "12px 18px" }}>{children}</div>
  </div>
);

const GraspGripBox = ({ children }) => (
  <div style={{ border: "1.5px solid #ccc", margin: "18px 0", background: "#fdf8ee" }}>
    <div style={{ textAlign: "center", padding: "10px 16px 4px" }}>
      <span style={{ fontFamily: "'Lora',Georgia,serif", fontWeight: 700, fontStyle: "italic", fontSize: 18, color: "#6e0d3a", letterSpacing: 0.5 }}>Grasp &amp; Grip</span>
    </div>
    <div style={{ padding: "4px 18px 14px" }}>{children}</div>
  </div>
);

const IllustrationBox = ({ num, title, children }) => (
  <div style={{ margin: "20px 0", border: "1.5px solid #8b0a4e" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 14px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900,
      fontSize: 12, letterSpacing: 1 }}>
      ILLUSTRATION {num}{title ? ` — ${title}` : ""}
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
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
      border: "1.5px dashed #8b0a4e", background: "#f9eef4", minHeight: 80,
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
  <div style={{ margin: "20px 0", border: "1.5px solid #8b0a4e" }}>
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
const td = { border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5 };

function HamburgerBtn({ open, setOpen }) {
  return (
    <button onClick={() => setOpen(o => !o)} style={{
      position: "fixed", top: 16, left: 16, zIndex: 1100,
      background: P_COLOR, border: "none", borderRadius: 4,
      width: 40, height: 40, cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
    }}>
      {open ? (
        <>
          <span style={{ width: 22, height: 2.5, background: "#fff", transform: "rotate(45deg) translate(5px,5px)", transition: "all 0.2s" }} />
          <span style={{ width: 22, height: 2.5, background: "#fff", opacity: 0, transition: "all 0.2s" }} />
          <span style={{ width: 22, height: 2.5, background: "#fff", transform: "rotate(-45deg) translate(5px,-5px)", transition: "all 0.2s" }} />
        </>
      ) : (
        <>
          <span style={{ width: 22, height: 2.5, background: "#fff" }} />
          <span style={{ width: 22, height: 2.5, background: "#fff" }} />
          <span style={{ width: 22, height: 2.5, background: "#fff" }} />
        </>
      )}
    </button>
  );
}

function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.35)",
    }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, height: "100vh",
      width: open ? 260 : 0,
      overflow: "hidden",
      background: "#fff",
      borderRight: open ? "2px solid #e8c0d8" : "none",
      zIndex: 1080,
      transition: "width 0.25s ease",
      boxShadow: open ? "2px 0 12px rgba(139,10,78,0.10)" : "none",
    }}>
      <div style={{ width: 260, padding: "60px 0 20px", overflowY: "auto", height: "100%" }}>
        <div style={{ padding: "0 16px 12px",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 900, fontSize: 11, color: P_COLOR, letterSpacing: 2,
          textTransform: "uppercase", borderBottom: "1.5px solid #e8c0d8", marginBottom: 8 }}>
          Contents
        </div>
        <nav>
          {tocItems.map(item => (
            <div key={item.id}
              onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}
              style={{
                padding: item.level === 1 ? "7px 16px" : item.level === 2 ? "5px 24px" : "4px 32px",
                cursor: "pointer", fontSize: item.level === 1 ? 13 : 12,
                fontWeight: item.level === 1 ? 700 : 400,
                color: item.level === 1 ? P_COLOR : "#333",
                fontFamily: item.level === 1 ? "'Merriweather Sans',Arial,sans-serif" : "inherit",
                borderBottom: "1px solid #f0e0eb",
                lineHeight: 1.4,
              }}>
              {item.label ? `${item.label}. ` : ""}{item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

const chapterNumber = "1";
const chapterTitle = "CENTRE OF MASS AND COLLISIONS";

const ChapterCover = () => (
  <div style={{ marginBottom: 0 }}>
    {/* Purple gradient top bar */}
    <div style={{ background: "linear-gradient(180deg, #7a4a7a 0%, #a06090 50%, #c8a0b8 100%)", height: 90 }} />
    {/* Cream/beige body */}
    <div style={{ background: "linear-gradient(180deg,#f5eedc 0%,#f0e8d0 100%)", padding: "32px 48px 40px", textAlign: "center" }}>
      {/* CHAPTER box */}
      <div style={{ display: "inline-block", textAlign: "center", marginBottom: 10 }}>
        <div style={{ border: "2px solid #b8a060", padding: "6px 32px 12px", background: "#fff", display: "inline-block" }}>
          <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 12, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>CHAPTER</div>
          <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 64, color: "#3a3a3a", lineHeight: 1 }}>{chapterNumber}</div>
        </div>
      </div>
      {/* Title */}
      <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 34, color: "#6e0d3a", letterSpacing: 2, textTransform: "uppercase", margin: "16px 0 0", lineHeight: 1.2 }}>{chapterTitle}</h1>
    </div>
    {/* Pink rule */}
    <div style={{ height: 4, background: "linear-gradient(90deg,#8b0a4e,#c0408a,#8b0a4e)" }} />
  </div>
);

// ── TABLE SUB-COMPONENTS ──────────────────────────────────────

const TableIll1 = () => (
  <div style={{ overflowX: "auto", margin: "14px 0" }}>
    <table style={{ borderCollapse: "collapse", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}>Mass</td>
          <td style={th}>{"$\\boldsymbol{X}$"}-coordinate</td>
          <td style={th}>{"$\\boldsymbol{Y}$"}-coordinate</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...td, textAlign: "center" }}>1 kg</td>
          <td style={{ ...td, textAlign: "center" }}>0</td>
          <td style={{ ...td, textAlign: "center" }}>0</td>
        </tr>
        <tr>
          <td style={{ ...td, textAlign: "center" }}>2 kg</td>
          <td style={{ ...td, textAlign: "center" }}>12</td>
          <td style={{ ...td, textAlign: "center" }}>0</td>
        </tr>
        <tr>
          <td style={{ ...td, textAlign: "center" }}>3 kg</td>
          <td style={{ ...td, textAlign: "center" }}>0</td>
          <td style={{ ...td, textAlign: "center" }}>9</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ── BATCH 1 CONTENT ───────────────────────────────────────────

const content_b1 = [
  <SecHd key="sec-fe" id="fe" title="Foundation Essentials" />,

  <SecHd key="sec-s10" id="s10" label="1.0" title="System of Particles" />,
  <p key="b1-p-s10-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The term system of particles means a well defined collection of several or large number of particles, which may or may not interact or be connected to each other. If some of them interact with each other, the forces of mutual interaction between a pair of particles of the system are <em>internal forces</em> of the system. These internal forces always exist in pairs and are forces of equal magnitudes and opposite directions. Other than internal forces, external forces may also act on all or some of the particles.
  </p>,
  <p key="b1-p-s10-2" style={{ textIndent: 28, textAlign: "justify" }}>
    So far, the focus had been more on a single particle or a point particle to which various theorems and principles had been applied. Now we will inquire into possibilities of applying these principles to a system of particles which may either be finite number of discrete particles or may be infinitely large in number having infinitely small separations between them (or large bodies having a continuous mass distribution).
  </p>,

  <SecHd key="sec-s11" id="s11" label="1.1" title="Centre of Mass" />,
  <p key="b1-p-s11-1" style={{ textIndent: 28, textAlign: "justify" }}>
    For an extended body or a system of particles, we can define a special point called the <em>centre of mass</em> where the entire mass of the system is assumed to be concentrated.
  </p>,
  <p key="b1-p-s11-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Under the application of forces, a body may have a translation motion, rotational motion or the combination of both translational and rotational motions. The path of most of the particles of the body is complicated. However, the motion of centre of mass of the body will be just like the motion of a single particle when subjected to the same forces.
  </p>,
  <p key="b1-p-s11-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Examples.</strong> Consider a uniform rod thrown at an angle such that it rotates while in motion. The centre of the rod (which is the centre of mass in this case), shall follow parabolic path while the path of all other points on the rod shall be complicated.
  </p>,
  <Fig key="fig-1-1" src={CONTENT_IMAGES.CONTENT_IMAGE_5738C7E89DC2C6DC6FD4} num="Fig. 1.1" />,
  <p key="b1-p-s11-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Another example is of a bomb thrown at an angle and moving along a parabola. It explodes in mid air and splits in two parts (as shown in fig. 1.2) so that each part after explosion follows its own parabolic path.
  </p>,
  <Fig key="fig-1-2" src={CONTENT_IMAGES.CONTENT_IMAGE_5A7F8213EADE1F87CE04} num="Fig. 1.2" />,
  <p key="b1-p-s11-5" style={{ textIndent: 28, textAlign: "justify" }}>
    However, the centre of mass of the two parts at any given instant shall be at the same position as the bomb if the explosion would not have been there, i.e., the centre of mass continue to move along the original parabola.
  </p>,

  <SubHd key="sub-com2p" id="com2p" title="Position of centre of mass of two particle system" />,
  <p key="b1-p-com2p-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider a system of two particles of masses {"$m_{1}$"} and {"$m_{2}$"} separated by distance {"$d$"}. We may set up the coordinate axes such that {"$X$"}-axis passes through the two particles.
  </p>,
  <Fig key="fig-1-3" src={CONTENT_IMAGES.CONTENT_IMAGE_AF0C3ED2CF7F462574BD} num="Fig. 1.3" />,
  <p key="b1-p-com2p-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Let origin be at {"$O$"} such that distance of {"$m_{1}$"} and {"$m_{2}$"} from origin are {"$x_{1}$"} and {"$x_{2}$"} respectively. We say that coordinates of {"$m_{1}$"} and {"$m_{2}$"} are {"$x_{1}$"} and {"$x_{2}$"} respectively. If {"$C$"} is the location of centre of mass whose coordinate is {"$x_{\\mathrm{cm}}$"}, then {"$x_{\\mathrm{cm}}$"} is given by
  </p>,
  <div key="b1-math-1" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$x_{\\mathrm{cm}}=\\frac{m_{1} x_{1}+m_{2} x_{2}}{m_{1}+m_{2}}$$"}
  </div>,
  <p key="b1-p-com2p-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Using above, we can compute distance {"$AC$"}, i.e., distance of centre of mass from {"$m_{1}$"}
  </p>,
  <div key="b1-math-2" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & x_{\\mathrm{cm}}=\\frac{m_{1} x_{1}+m_{2} x_{2}}{m_{1}+m_{2}}=\\frac{m_{1} x_{1}+m_{2}\\left(x_{1}+d\\right)}{m_{1}+m_{2}} \\\\ & \\quad=\\frac{\\left(m_{1}+m_{2}\\right) x_{1}+m_{2} d}{m_{1}+m_{2}}=x_{1}+\\frac{m_{2} d}{m_{1}+m_{2}} \\\\ & \\therefore AC=x_{\\mathrm{cm}}-x_{1}=\\frac{m_{2} d}{m_{1}+m_{2}} \\end{aligned}$$"}
  </div>,
  <p key="b1-p-com2p-4" style={{ textIndent: 28, textAlign: "justify" }}>
    For convenience, we may choose the origin at {"$m_{1}$"} so that the coordinates of {"$m_{1}$"} and {"$m_{2}$"} are {"$x_{1}=0$"} and {"$x_{2}=d$"} respectively.
  </p>,
  <Fig key="fig-1-4" src={CONTENT_IMAGES.CONTENT_IMAGE_B9C9AF9AA0EB4E2E0679} num="Fig. 1.4" />,
  <p key="b1-p-com2p-5" style={{ textAlign: "justify" }}>
    Now, {"$\\quad r_{1}=x_{\\mathrm{cm}}=\\dfrac{m_{1} x_{1}+m_{2} x_{2}}{m_{1}+m_{2}}=\\dfrac{m_{1} \\times 0+m_{2} \\times d}{m_{1}+m_{2}}$"}
  </p>,
  <p key="b1-p-com2p-6" style={{ textAlign: "justify" }}>
    {"$\\therefore r_{1}=\\left(\\dfrac{m_{2}}{m_{1}+m_{2}}\\right) d$"} and {"$r_{2}=d-r_{1}=\\left(\\dfrac{m_{1}}{m_{1}+m_{2}}\\right) d$"}
  </p>,

  <GraspGripBox key="gg-s11-1">
    <P2>1. The location of centre of mass, i.e., distance {"$AC$"} is independent of location of origin since it depends only on the masses {"$m_{1}$"} and {"$m_{2}$"} and the distance {"$d$"} between them.</P2>
    <P2>2. The distances of the masses from centre of mass can also be calculated using the fact that the distances {"$r_{1}$"} and {"$r_{2}$"} are inversely proportional to their masses {"$m_{1}$"} and {"$m_{2}$"}.</P2>
    <P2>i.e., {"$\\dfrac{r_{1}}{r_{2}}=\\dfrac{m_{2}}{m_{1}}$"} where, {"$r_{1}+r_{2}=d$"}.</P2>
  </GraspGripBox>,

  <SubHd key="sub-comnp" id="comnp" title="Position of centre of mass of n particle system" />,
  <p key="b1-p-comnp-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The position vector {"$\\vec{r}_{\\mathrm{cm}}$"} of the centre of mass of {"$n$"} particles having masses {"$m_{1}, m_{2}, m_{3}, \\ldots m_{n}$"} and position vectors {"$\\overrightarrow{r_{1}}, \\overrightarrow{r_{2}}, \\overrightarrow{r_{3}}, \\ldots \\ldots \\overrightarrow{r_{n}}$"} respectively is defined as
  </p>,
  <div key="b1-math-3" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\overrightarrow{r_{\\mathrm{cm}}}=\\frac{m_{1} \\overrightarrow{r_{1}}+m_{2} \\overrightarrow{r_{2}}+\\ldots \\ldots+m_{n} \\overrightarrow{r_{n}}}{m_{1}+m_{2}+\\ldots \\ldots+m_{n}}$$"}
  </div>,
  <p key="b1-p-comnp-2" style={{ textIndent: 28, textAlign: "justify" }}>
    If the coordinates of centre of mass are {"$x_{\\mathrm{cm}}, y_{\\mathrm{cm}}, z_{\\mathrm{cm}}$"}, then,
  </p>,
  <div key="b1-math-4" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & x_{\\mathrm{cm}}=\\frac{m_{1} x_{1}+m_{2} x_{2}+\\ldots \\ldots m_{n} x_{n}}{m_{1}+m_{2}+\\ldots \\ldots m_{n}}=\\frac{\\Sigma m_{i} x_{i}}{M} \\\\ & y_{\\mathrm{cm}}=\\frac{m_{1} y_{1}+m_{2} y_{2}+\\ldots \\ldots m_{n} y_{n}}{m_{1}+m_{2}+\\ldots \\ldots m_{n}}=\\frac{\\Sigma m_{i} y_{i}}{M} \\\\ & z_{\\mathrm{cm}}=\\frac{m_{1} z_{1}+m_{2} z_{2}+\\ldots \\ldots m_{n} z_{n}}{m_{1}+m_{2}+\\ldots \\ldots m_{n}}=\\frac{\\Sigma m_{i} z_{i}}{M} \\end{aligned}$$"}
  </div>,
  <p key="b1-p-comnp-3" style={{ textAlign: "justify" }}>where,</p>,
  <div key="b1-math-5" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$M=m_{1}+m_{2}+\\ldots \\ldots m_{n}=\\Sigma m_{i}=\\text{ Total mass of the system.}$$"}
  </div>,
  <p key="b1-p-comnp-4" style={{ textIndent: 28, textAlign: "justify" }}>
    For a continuous body, these equations take the form
  </p>,
  <div key="b1-math-6" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$x_{\\mathrm{cm}}=\\frac{1}{M} \\int x\\, dm, \\quad y_{\\mathrm{cm}}=\\frac{1}{M} \\int y\\, dm, \\quad z_{\\mathrm{cm}}=\\frac{1}{M} \\int z\\, dm$$"}
  </div>,
  <p key="b1-p-comnp-5" style={{ textAlign: "justify" }}>
    where {"$dm$"} is the mass of small element situated at point {"$(x, y, z)$"}.
  </p>,

  <IllustrationBox key="ill-1" num="1">
    <P2>Three particles of masses {"$1$"} kg, {"$2$"} kg and {"$3$"} kg are placed at the three corners of a right angled triangle of sides {"$9$"} cm, {"$12$"} cm and {"$15$"} cm as shown in the figure. Locate the position of centre of mass of the system.</P2>
    <Fig key="fig-1-5" src={CONTENT_IMAGES.CONTENT_IMAGE_4105F8FB4295F8C2EE21} num="Fig. 1.5" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Take the axes as shown in the fig. 1.5. The coordinates of three particles are as follows:</P2>
    <TableIll1 />
    <P2>Hence, the coordinates of centre of mass of the system are</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & x_{\\mathrm{cm}}=\\frac{1 \\times 0+2 \\times 12+3 \\times 0}{1+2+3}=4 \\text{ cm} \\\\ & y_{\\mathrm{cm}}=\\frac{1 \\times 0+2 \\times 0+3 \\times 9}{1+2+3}=4.5 \\text{ cm} \\end{aligned}$$"}
    </div>
    <P2>Thus, the centre of mass is 4 cm to the right and {"$4 \\cdot 5$"} cm above the 1 kg particle.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-2" num="2">
    <P2>Two identical uniform rods of length {"$l$"} are joined to form a L shaped frame as shown in fig. 1.6. Locate the centre of mass of the frame.</P2>
    <Fig key="fig-1-6" src={CONTENT_IMAGES.CONTENT_IMAGE_ED86DFE644E3035F1747} num="Fig. 1.6" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let the mass of each rod be {"$m$"}. Take {"$B$"} as the origin with {"$X$"} and {"$Y$"} axes as shown in the figure. Since the rods are uniform, their individual centre of mass will lie at the respective centres.</P2>
    <P2>For the calculation of centre of mass of the {"$L$"}-frame, rod {"$BC$"} can be replaced by a point particle of mass {"$m$"} placed at its centre {"$P$"}. Similarly rod {"$AB$"} can be replaced by a point particle of mass {"$m$"} placed at {"$Q$"}. Thus the system is equivalent to a system of two point masses, each of mass {"$m$"}, placed at points {"$P$"} and {"$Q$"}.</P2>
    <P2>The coordinate of point {"$P$"} and {"$Q$"} are {"$(l/2, 0)$"} and {"$(0, l/2)$"} respectively.</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} \\therefore \\quad & x_{\\mathrm{cm}}=\\frac{m l / 2+m \\times 0}{m+m}=l / 4 \\quad \\text{and} \\\\ & y_{\\mathrm{cm}}=\\frac{m \\times 0+m l / 2}{m+m}=l / 4 \\end{aligned}$$"}
    </div>
    <P2>The coordinates of centre of mass of the system are therefore, {"$l/4, l/4$"}.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>Alternate Method.</p>
    <P2>Consider each rod as point mass located at its centre of mass. So, we have two equal masses located at points {"$P$"} and {"$Q$"} shown in Fig. 1.6. Their centre of mass is at midpoint of {"$P$"} and {"$Q$"}. The coordinates of centre of mass of the system are therefore, {"$l/4, l/4$"}.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-3" num="3">
    <P2>Fig. 1.7 shows circular plate of radius {"$\\boldsymbol{R}$"} from which a disc of radius {"$\\boldsymbol{R}/\\mathbf{2}$"} has been removed. Find the position of centre of mass of this object.</P2>
    <Fig key="fig-1-7" src={CONTENT_IMAGES.CONTENT_IMAGE_8284527C1D9132E96520} num="Fig. 1.7" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let us choose {"$X$–$Y$"} axis as shown in the figure. From symmetry, centre of mass of the object must lie on {"$X$"}-axis. Therefore, {"$y_{\\mathrm{cm}}=0$"}.</P2>
    <P2>Let the mass per unit area of the object be {"$(\\sigma)$"}.</P2>
    <P2>This object can be visualized as a superposition of circular plate of radius {"$R$"} and density {"$\\sigma$"} and a uniform disc of radius {"$R/2$"} and density {"$(-\\sigma)$"} placed at the position of removed disc, whose centre of mass is at {"$x=R/2$"}.</P2>
    <P2>For the circular plate of radius {"$R$"},<br />{"$m_{1}=\\pi R^{2} \\sigma$"} and {"$x_{1}=0$"}</P2>
    <P2>For the disc of radius {"$R/2$"},<br />{"$m_{2}=\\pi\\left(\\dfrac{R}{2}\\right)^{2}(-\\sigma)=\\dfrac{-\\pi R^{2}}{4} \\sigma$"} and {"$x_{2}=\\dfrac{R}{2}$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\therefore\\, x_{\\mathrm{cm}}=\\frac{m_{1} x_{1}+m_{2} x_{2}}{m_{1}+m_{2}}=\\frac{\\pi R^{2} \\sigma \\times 0+\\left(\\frac{-\\pi R^{2}}{4} \\sigma\\right) \\times \\frac{R}{2}}{\\left(\\pi R^{2} \\sigma\\right)+\\left(\\frac{-\\pi R^{2}}{4} \\sigma\\right)}=-\\frac{R}{6}$$"}
    </div>
    <P2>Hence, the coordinates of the centre of mass are {"$(-R/6, 0)$"}.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>Alternate Method.</p>
    <P2>Consider two point masses. One is the disc of radius {"$R/2$"} and mass {"$m_{1}$"} located at its centre of mass {"$C_{1}$"}. The other is the circular plate of radius {"$R$"} (after removal of disc) of mass {"$m_{2}$"} located at its centre of mass {"$C_{2}$"}. If {"$m_{1}=m$"}, then {"$m_{2}=4m-m=3m$"}. Their combined centre of mass is at {"$O$"} as shown in fig. 1.7. The distances of {"$C_{1}$"} and {"$C_{2}$"} from {"$O$"}, i.e., {"$r_{1}$"} and {"$r_{2}$"} must be in the inverse ratio of their masses, i.e.,</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\frac{r_{2}}{r_{1}}=\\frac{m_{1}}{m_{2}}=\\frac{m}{3m}=\\frac{1}{3} \\quad \\therefore \\quad r_{2}=\\frac{r_{1}}{3}=\\frac{R/2}{3}=\\frac{R}{6}$$"}
    </div>
    <P2>Hence, the coordinates of the centre of mass of the required object are {"$(-R/6, 0)$"}.</P2>
  </IllustrationBox>,

  <SubHd key="sub-vcm" id="vcm" title="Velocity of centre of mass" />,
  <p key="b1-p-vcm-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The velocity of centre of mass is obtained by differentiating its position vector with respect to time
  </p>,
  <div key="b1-math-7" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & \\quad \\frac{d \\vec{r}_{\\mathrm{cm}}}{dt}=\\frac{1}{M}\\left(m_{1} \\frac{d \\vec{r}_{1}}{dt}+m_{1} \\frac{d \\vec{r}_{2}}{dt}+\\ldots.+m_{n} \\frac{d \\overrightarrow{r_{n}}}{dt}\\right) \\\\ & \\text{or } \\vec{v}_{\\mathrm{cm}}=\\frac{m_{1} \\vec{v}_{1}+m_{2} \\vec{v}_{2}+\\ldots \\ldots+m_{n} \\vec{v}_{n}}{m_{1}+m_{2}+\\ldots \\ldots+m_{n}}=\\frac{\\Sigma m_{i} \\vec{v}_{i}}{M} \\\\ & \\text{or } M \\vec{v}_{\\mathrm{cm}}=m_{1} \\vec{v}_{1}+m_{2} \\vec{v}_{2}+\\ldots \\ldots+m_{n} \\vec{v}_{n}=\\Sigma m_{i} \\vec{v}_{i} \\end{aligned}$$"}
  </div>,
  <p key="b1-p-vcm-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The quantity {"$m_{i} \\vec{v}_{i}$"} is the momentum of {"$i$"}th particle. The right hand side of the equation is therefore the total momentum of the system. We thus have the important result that the total momentum of a system of particles equals the product of the total mass {"$M$"} and the velocity of centre of mass {"$\\vec{v}_{\\mathbf{cm}}$"} i.e., {"$\\vec{p}=\\Sigma m_{i} \\vec{v}_{i}=M \\vec{v}_{\\mathrm{cm}}$"}
  </p>,

  <SubHd key="sub-acm" id="acm" title="Acceleration of centre of mass" />,
  <p key="b1-p-acm-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The acceleration of the centre of mass can be obtained by differentiating its velocity with respect to time.
  </p>,
  <div key="b1-math-8" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & \\qquad \\frac{d \\vec{v}_{\\mathrm{cm}}}{dt}=\\frac{1}{M}\\left(m_{1} \\frac{d \\vec{v}_{1}}{dt}+m_{1} \\frac{d \\vec{v}_{2}}{dt}+\\ldots.+m_{n} \\frac{d \\vec{v}_{n}}{dt}\\right) \\\\ & \\text{or } \\vec{a}_{\\mathrm{cm}}=\\frac{m_{1} \\vec{a}_{1}+m_{2} \\vec{a}_{2}+\\ldots \\ldots+m_{n} \\vec{a}_{n}}{m_{1}+m_{2}+\\ldots \\ldots+m_{n}}=\\frac{\\Sigma m_{i} \\vec{a}_{i}}{M} \\\\ & \\text{or } M \\vec{a}_{\\mathrm{cm}}=m_{1} \\vec{a}_{1}+m_{2} \\vec{a}_{2}+\\ldots \\ldots+m_{n} \\vec{a}_{n} \\\\ & \\quad=\\overrightarrow{F_{1}}+\\overrightarrow{F_{2}}+\\ldots \\ldots. \\vec{F}_{n}=\\Sigma \\vec{F}_{i} \\end{aligned}$$"}
  </div>,
  <p key="b1-p-acm-2" style={{ textIndent: 28, textAlign: "justify" }}>
    where, {"$\\vec{F}_{i}$"} is the net force acting on the {"$i$"}th particle.
  </p>,

  <GraspGripBox key="gg-s11-2">
    <P2>1. If external forces acting on a system add up to zero, then {"$\\vec{a}_{\\mathrm{cm}}=0$"} and hence, velocity of centre of mass will remain constant.</P2>
    <P2>2. If the centre of mass of an isolated system is at rest, it will continue to be at rest even if the particles of the system move.</P2>
  </GraspGripBox>,

  <IllustrationBox key="ill-4" num="4">
    <P2>Three bodies 1, 2 and 3 having masses {"$10$"} kg, {"$5$"} kg and {"$15$"} kg respectively are projected from top of a tower with <strong>1</strong> vertically upwards with {"$10$"} m/s, <strong>2</strong> with {"$20$"} m/s at an angle of {"$53^{\\circ}$"} above horizontal towards east and <strong>3</strong> with {"$15$"} m/s horizontally towards south. Find the</P2>
    <P2>(a) velocity of centre of mass of the system.</P2>
    <P2>(b) acceleration of centre of mass of the system.</P2>
    <Fig key="fig-1-8" src={CONTENT_IMAGES.CONTENT_IMAGE_61915A1C25FD7390D06B} num="Fig. 1.8" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let us take {"$X$"}-axis towards South, {"$Y$"}-axis towards east and {"$Z$"}-axis upwards as shown in the figure.</P2>
    <P2>The velocities of the three particles in vector form can be written as</P2>
    <P2>{"$\\overrightarrow{v_{1}}=10 \\hat{k}$"} m/s</P2>
    <P2>{"$\\overrightarrow{v_{2}}=20\\left(\\cos 53^{\\circ} \\hat{j}+\\sin 53^{\\circ} \\hat{k}\\right)=(12 \\hat{j}+16 \\hat{k})$"} m/s</P2>
    <P2>{"$\\overrightarrow{v_{3}}=15 \\hat{i}$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} (a)\\; \\vec{v}_{\\mathrm{cm}} & =\\frac{m_{1} \\overrightarrow{v_{1}}+m_{2} \\overrightarrow{v_{2}}+m_{3} \\overrightarrow{v_{3}}}{m_{1}+m_{2}+m_{3}} \\\\ & =\\frac{10(10 \\hat{k})+5(12 \\hat{j}+16 \\hat{k})+15(15 \\hat{i})}{10+5+15} \\\\ & =(7 \\cdot 5 \\hat{i}+2 \\hat{j}+6 \\hat{k})\\text{ m/s} \\\\ (b)\\; \\vec{a}_{\\mathrm{cm}} & =\\frac{m_{1} \\vec{a}_{1}+m_{2} \\vec{a}_{2}+m_{3} \\vec{a}_{3}}{m_{1}+m_{2}+m_{3}} \\\\ & =\\frac{10(-9 \\cdot 8 \\hat{k})+5(-9 \\cdot 8 \\hat{k})+15(-9 \\cdot 8 \\hat{k})}{10+5+15} \\\\ & =(-9 \\cdot 8 \\hat{k})\\text{ m/s}^{2} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <SecHd key="sec-s12" id="s12" label="1.2" title="Center of Mass of an Extended Body or Continuous Distribution of Mass" />,
  <p key="b1-p-s12-1" style={{ textIndent: 28, textAlign: "justify" }}>
    An extended body is collection of infinitely large number of particles so closely located that we neglect separation between them and assume the body as a continuous distribution of mass. A rigid body is an extended body in which relative locations of all the particles remain unchanged. Therefore a rigid body does not get deformed under any situation.
  </p>,
  <p key="b1-p-s12-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Let an extended body be shown as a continuous distribution of mass in the fig. 1.9. Consider an infinitely small portion of mass {"$dm$"} of the extended body. It is called a mass element and let the position vector of this element be {"$\\vec{r}$"}. The total mass {"$M$"} of the body is {"$M=\\int dm$"} and the position vector {"$\\overrightarrow{r_{C}}$"} of center of mass {"$C$"} is given by
  </p>,
  <div key="b1-math-9" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\overrightarrow{r_{C}}=\\frac{\\int \\vec{r}\\, dm}{M}$$"}
  </div>,
  <Fig key="fig-1-9" src={CONTENT_IMAGES.CONTENT_IMAGE_E0CAC8DD48728A35B3CA} num="Fig. 1.9" />,
  <p key="b1-p-s12-3" style={{ textIndent: 28, textAlign: "justify" }}>
    If {"$(x, y, z)$"} are the cartesian coordinates of the element of mass {"$dm$"}, then the coordinates {"$(x_{cm}, y_{cm}, z_{cm})$"} of center of mass are given by
  </p>,
  <div key="b1-math-10" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$x_{cm}=\\frac{1}{M} \\int x\\, dm,\\quad y_{cm}=\\frac{1}{M} \\int y\\, dm,\\quad z_{cm}=\\frac{1}{M} \\int z\\, dm$$"}
  </div>,

  <IllustrationBox key="ill-5" num="5">
    <P2>Find coordinates of centre of mass of a non-uniform rod of length {"$L$"} whose linear mass density {"$\\lambda$"} varies as {"$\\lambda=a+bx$"}, where {"$x$"} is the distance from the lighter end.</P2>
    <Fig key="fig-1-10" src={CONTENT_IMAGES.CONTENT_IMAGE_D604D3ACDF7AA3433ED6} num="Fig. 1.10" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let the rod lie on {"$x$"}-axis with its lighter end on the origin. Consider a small element of length {"$dx$"} at a distance {"$x$"} from the origin. Its mass is {"$dm=\\lambda\\, dx=(a+bx)\\,dx$"}.</P2>
    <P2>The distance of center of mass from origin is</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} x_{\\mathrm{cm}} & =\\frac{1}{M} \\int x\\, dm=\\frac{\\int_{0}^{L} x(a+bx)\\, dx}{\\int_{0}^{L}(a+bx)\\, dx}=\\frac{aL^{2}/2+bL^{3}/3}{aL+bL^{2}/2} \\\\ & =\\frac{(3a+2bL)L}{3(2a+bL)} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <SubHd key="sub-arcrod" id="arcrod" title="Center of mass of a segment of a uniform circular rod (arc)" />,
  <p key="b1-p-arcrod-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider a thin rod of mass per unit length {"$\\lambda$"} and radius {"$r$"} subtending angle {"$2\\theta$"} on its center {"$O$"}. Let us choose the angle bisector as {"$x$"}-axis (with origin at {"$O$"}) as shown in fig. 1.11.
  </p>,
  <p key="b1-p-arcrod-2" style={{ textIndent: 28, textAlign: "justify" }}>
    By symmetry, centre of mass must lie on {"$x$"}-axis.
  </p>,
  <Fig key="fig-1-11" src={CONTENT_IMAGES.CONTENT_IMAGE_F4969A6309E32B0725E8} num="Fig. 1.11" />,
  <p key="b1-p-arcrod-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us consider an element of length {"$dl=r\\,d\\alpha$"} at angular inclination of {"$\\alpha$"} to {"$x$"}-axis. Its mass is {"$dm=\\lambda r\\,d\\alpha$"} and its {"$x$"} coordinate is {"$x=r\\cos\\alpha$"}. Hence,
  </p>,
  <div key="b1-math-11" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & x_{cm}=\\frac{1}{M} \\int x\\, dm=\\frac{1}{\\lambda r(2\\theta)R^{2}} \\int_{-\\theta}^{\\theta}(r\\cos\\alpha)\\lambda r\\, d\\alpha \\\\ & \\therefore\\; x_{cm}=\\frac{r\\sin\\theta}{\\theta} \\qquad\\text{...(1)} \\end{aligned}$$"}
  </div>,

  <IllustrationBox key="ill-6" num="6">
    <P2>Find coordinates of center of mass of a quarter ring of radius {"$r$"} placed in the first quadrant of a cartesian coordinate system, with centre at origin.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>We make use of the result obtained in equation (1) above. Distance {"$OC$"} of center of mass from the center is</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} OC & =\\frac{r\\sin(\\pi/4)}{\\pi/4}=\\frac{2\\sqrt{2}\\,r}{\\pi} \\\\ \\Rightarrow \\quad x_{cm} & =OC\\cos(\\pi/4)=2r/\\pi \\\\ y_{cm} & =OC\\sin(\\pi/4)=2r/\\pi \\end{aligned}$$"}
    </div>
    <Fig key="fig-1-12" src={CONTENT_IMAGES.CONTENT_IMAGE_483F758543A981CCFA04} num="Fig. 1.12" />
    <P2>Therefore, the coordinates of the center of mass are {"$\\left(\\dfrac{2r}{\\pi}, \\dfrac{2r}{\\pi}\\right)$"}.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-7" num="7">
    <P2>Find coordinates of center of mass of a semicircular ring of radius {"$\\boldsymbol{r}$"} placed symmetric to the {"$\\boldsymbol{y}$"}-axis of a Cartesian coordinate system.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, {"$y$"}-axis is the line of symmetry. Hence, center of mass of the ring lies on it. Distance {"$OC$"} of center of mass from centre is</P2>
    <Fig key="fig-1-13" src={CONTENT_IMAGES.CONTENT_IMAGE_B5412C9432BDF404F03C} num="Fig. 1.13" />
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$y_{cm}=OC=\\frac{r\\sin(\\pi/2)}{\\pi/2}=\\frac{2r}{\\pi}$$"}
    </div>
  </IllustrationBox>,

  <SubHd key="sub-sectordisc" id="sectordisc" title="Center of mass of a sector of a uniform circular plate" />,
  <p key="b1-p-sectordisc-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider a sector of a thin uniform plate of mass per unit area {"$\\sigma$"} and radius {"$R$"} subtending angle {"$2\\theta$"} on its center {"$O$"}. Let us choose the angle bisector as {"$x$"}-axis (with origin at {"$O$"}) as shown in fig. 1.14.
  </p>,
  <Fig key="fig-1-14" src={CONTENT_IMAGES.CONTENT_IMAGE_B9FAA215AAF42565DC98} num="Fig. 1.14" />,
  <p key="b1-p-sectordisc-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Let us consider an element of radius {"$r$"} and width {"$dr$"} as shown in the figure. Its mass is
  </p>,
  <div key="b1-math-12" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$dm=\\sigma(2r\\theta\\,dr)=2\\sigma r\\theta\\,dr$$"}
  </div>,
  <p key="b1-p-sectordisc-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Due to symmetry, center of mass of this element must be on the angle bisector, i.e., on {"$x$"}-axis at distance {"$(r\\sin\\theta)/\\theta$"}. Hence,
  </p>,
  <div key="b1-math-13" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$x_{cm}=\\frac{1}{M} \\int x\\, dm=\\frac{1}{\\sigma\\theta R^{2}} \\int_{0}^{R} \\frac{r\\sin\\theta}{\\theta} \\times 2\\sigma r\\theta\\, dr$$"}
  </div>,
  <div key="b1-math-14" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\therefore \\quad x_{cm}=\\frac{2R\\sin\\theta}{3\\theta} \\tag{2}$$"}
  </div>,

  <IllustrationBox key="ill-8" num="8">
    <P2>Find coordinates of centre of mass of a quarter sector of a uniform disc of radius {"$\\boldsymbol{r}$"} placed in the first quadrant of a cartesian coordinate system with centre at origin.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>We make use of the result obtained in equation (2) above. Distance {"$OC$"} of the center of mass from the center is</P2>
    <Fig key="fig-1-15" src={CONTENT_IMAGES.CONTENT_IMAGE_BA2FE324DC3FC49050F2} num="Fig. 1.15" />
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} OC & =\\frac{2r\\sin(\\pi/4)}{3\\pi/4}=\\frac{4\\sqrt{2}\\,r}{3\\pi} \\\\ \\Rightarrow \\quad x_{cm} & =OC\\cos(\\pi/4)=4r/3\\pi \\\\ \\text{and} \\quad y_{cm} & =OC\\sin(\\pi/4)=4r/3\\pi \\end{aligned}$$"}
    </div>
    <P2>Therefore, the coordinates of centre of mass are {"$\\left(\\dfrac{4r}{3\\pi}, \\dfrac{4r}{3\\pi}\\right)$"}.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-9" num="9">
    <P2>Find coordinates of centre of mass of a uniform semicircular plate of radius {"$\\boldsymbol{r}$"} placed symmetric to the {"$\\mathbf{y}$"}-axis of a cartesian coordinate system, with centre at origin.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, the {"$y$"}-axis is the line of symmetry. Hence, centre of mass of the plate lies on it. Distance {"$OC$"} of center of mass from center is</P2>
    <Fig key="fig-1-16" src={CONTENT_IMAGES.CONTENT_IMAGE_7437CF670574FFDBBA76} num="Fig. 1.16" />
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$y_{cm}=OC=\\frac{2r\\sin(\\pi/2)}{3\\pi/2}=\\frac{4r}{3\\pi}$$"}
    </div>
  </IllustrationBox>,

  <SecHd key="sec-s13" id="s13" label="1.3" title="Linear Momentum and its Conservation Principle" />,
  <p key="b1-p-s13-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The linear momentum of a single particle is defined as {"$\\vec{p}=m\\vec{v}$"}. The momentum of a system of {"$n$"}-particles is the vector sum of linear momentum of the particles of the system,
  </p>,
  <p key="b1-p-s13-2" style={{ textAlign: "justify" }}>
    i.e., {"$\\quad \\vec{p}=\\Sigma \\overrightarrow{p_{i}}=\\Sigma m_{i} \\overrightarrow{v_{i}}=M \\overrightarrow{v_{\\mathrm{cm}}}$"}
  </p>,
  <p key="b1-p-s13-3" style={{ textAlign: "justify" }}>
    where, {"$M$"} is the total mass of the system.
  </p>,
  <p key="b1-p-s13-4" style={{ textIndent: 28, textAlign: "justify" }}>
    The rate of change of total momentum is
  </p>,
  <div key="b1-math-15" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\frac{d\\vec{p}}{dt}=M\\vec{a}_{\\mathrm{cm}}=\\vec{F}_{\\mathrm{ext}}$$"}
  </div>,
  <p key="b1-p-s13-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, if the resultant external force on a system is zero, the velocity of centre of mass and total momentum of system remains constant.
  </p>,

  <GraspGripBox key="gg-s13">
    <P2>The equation given above is a vector equation. For some problems, it might happen that components of external forces along a certain direction add up to zero. In that case, component of linear momentum in that direction will remain constant.</P2>
    <P2>For example, consider a body of mass {"$m$"} kept on a wedge of mass {"$M$"} as shown in the fig. 1.17 and all surfaces being frictionless. The whole system is at rest initially.</P2>
    <Fig key="fig-1-17" src={CONTENT_IMAGES.CONTENT_IMAGE_7BD22C32CBDF55E4607B} num="Fig. 1.17" />
    <P2>When the body of mass {"$m$"} slides down, there is no external force acting on the system in horizontal direction. We therefore conclude that the momentum of the system in horizontal direction remains constant, i.e., zero. As a result, as the mass slides down, the wedge moves towards left and the centre of mass of the system moves vertically down without having any horizontal component.</P2>
  </GraspGripBox>,

  <IllustrationBox key="ill-10" num="10">
    <P2>A man of mass {"$\\boldsymbol{m}_{1}$"} is standing on a platform of mass {"$m_{2}$"} kept on a smooth surface. If the man moves a distance {"$\\boldsymbol{d}$"} with respect to the platform, find the displacement of the platform with respect to ground.</P2>
    <Fig key="fig-1-18" src={CONTENT_IMAGES.CONTENT_IMAGE_63E5C26C0A5332B6D9A3} num="Fig. 1.18" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>We shall choose {"$m_{1}$"} and {"$m_{2}$"} as the system. As the surface is smooth, there is no external force acting along the horizontal direction.</P2>
    <P2>Since, {"$\\vec{F}_{\\mathrm{ext}}=0,\\; \\vec{a}_{\\mathrm{cm}}=0, \\quad \\Rightarrow \\vec{v}_{\\mathrm{cm}}=\\text{constant}$"}</P2>
    <P2>As {"$\\vec{v}_{\\mathrm{cm}}$"} was zero initially, it will remain zero even after the man moves and therefore the {"$x$"}-coordinate of the centre of mass will not change.</P2>
    <P2>Let {"$x_{1}=$"} displacement of man towards right</P2>
    <P2>{"$x_{2}=$"} displacement of platform towards left</P2>
    <P2>Then, {"$m_{1}x_{1}=m_{2}x_{2}$"} and {"$x_{1}+x_{2}=d$"}</P2>
    <P2>On solving the two eqns., we get {"$x_{2}=\\dfrac{m_{1}d}{m_{1}+m_{2}}$"}</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-11" num="11">
    <P2>Two blocks of masses {"$\\boldsymbol{m}$"} and {"$\\boldsymbol{M}$"} are held against a compressed spring on a frictionless horizontal floor with the help of a light thread. When the thread is cut, the smaller block leaves the spring with a velocity {"$u$"} relative to the larger block. Find the recoil velocity of the larger block at that instant.</P2>
    <Fig key="fig-1-19" src={CONTENT_IMAGES.CONTENT_IMAGE_C80F4434D569CD1D038F} num="Fig. 1.19" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>When the thread is cut, the spring pushes both the blocks, and imparts momentum to them. The smaller block leaves the spring with a velocity {"$u$"} relative to the larger block. So, if the velocity of {"$M$"} is {"$v$"} towards left, then the velocity of {"$m$"} is {"$u-v$"} towards right.</P2>
    <P2>As the net external force acting on the system is zero, the total momentum of the system is conserved.</P2>
    <Fig key="fig-1-20" src={CONTENT_IMAGES.CONTENT_IMAGE_A6B91C58FEDCD98B5B47} num="Fig. 1.20" />
    <P2>By conservation of linear momentum,</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$-Mv+m(u-v)=0 \\quad \\therefore\\; v=\\frac{mu}{M+m}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-12" num="12">
    <P2>In free space, three identical particles moving with velocities {"$6v_{0} \\hat{i}$"}, {"$-3v_{0} \\hat{j}$"} and {"$9v_{0} \\hat{k}$"} collide with each other to form a single particle. Find velocity vector of the particle formed.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let {"$m$"} be the mass of each particle before collision. The mass of particle formed after collision is {"$3m$"}. In free space, no external forces act on the particles. Hence, their total momentum is conserved.</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & \\Rightarrow 6mv_{0} \\hat{i}-3mv_{0} \\hat{j}+9mv_{0} \\hat{k}=3m\\vec{v} \\\\ & \\therefore\\; \\vec{v}=v_{0}(2\\hat{i}-\\hat{j}+3\\hat{k})\\text{ ms}^{-1} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <SecHd key="sec-s14" id="s14" label="1.4" title="Kinetic Energy of a System" />,
  <p key="b1-p-s14-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The kinetic energy of a system of particles is the sum of kinetic energies of the individual particles, i.e.,
  </p>,
  <div key="b1-math-16" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$K=\\sum \\frac{1}{2} m_{i} v_{i}^{2}$$"}
  </div>,
  <p key="b1-p-s14-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The kinetic energy can be written as the sum of two terms:
  </p>,
  <p key="b1-p-s14-3" style={{ textAlign: "justify" }}>
    (a) the kinetic energy associated with the centre of mass equal to {"$\\frac{1}{2}Mv_{\\mathrm{cm}}^{2}$"}.
  </p>,
  <p key="b1-p-s14-4" style={{ textAlign: "justify" }}>
    (b) the kinetic energy relative to the centre of mass equal to {"$\\frac{1}{2}\\sum m_{i}v_{i}^{\\prime 2}$"} where {"$v_{i}^{\\prime}$"} is the velocity of the {"$i$"}th particle relative to the centre of mass.
  </p>,
  <p key="b1-p-s14-5" style={{ textIndent: 28, textAlign: "justify" }}>
    Therefore, the kinetic energy of the system of particles,
  </p>,
  <div key="b1-math-17" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$K=\\sum \\frac{1}{2} m_{i} v_{i}^{2}=\\frac{1}{2} Mv_{\\mathrm{cm}}^{2}+\\frac{1}{2} \\sum m_{i} v_{i}^{\\prime 2}$$"}
  </div>,
  <p key="b1-p-s14-6" style={{ textIndent: 28, textAlign: "justify" }}>
    For an isolated system, velocity of centre of mass is constant and therefore first term does not change. However, the second term may increase or decrease even for an isolated system.
  </p>,

  <GraspGripBox key="gg-s14">
    <P2>The internal forces acting within a system cannot change the total momentum of the system but they can change the kinetic energy of the system due to the influence of internal forces.</P2>
    <P2>For example, when a bomb of mass {"$m$"} moving with some velocity {"$v$"} explodes in mid air in two fragments of masses {"$m_{1}$"} and {"$m_{2}$"} which after explosion, moves with velocities {"$v_{1}$"} and {"$v_{2}$"} respectively, then the total momentum of the system remains conserved,</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\text{i.e.,}\\quad mv=m_{1}v_{1}+m_{2}v_{2}$$"}
    </div>
    <P2>However, the kinetic energy of the system increases,</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\text{i.e.,}\\quad \\frac{1}{2}mv^{2}<\\frac{1}{2}m_{1}v_{1}^{2}+\\frac{1}{2}m_{2}v_{2}^{2}$$"}
    </div>
  </GraspGripBox>,

  <IllustrationBox key="ill-13" num="13">
    <P2>An object with mass {"$m$"} and speed {"$v$"} explodes into two pieces, one three times as massive as the other. The explosion takes in a gravity free space. The less massive piece comes to rest. How much kinetic energy was added to the system in the explosion?</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>The masses of the two pieces after explosion will be {"$m/4$"} and {"$3m/4$"}.</P2>
    <Fig key="fig-1-21" src={CONTENT_IMAGES.CONTENT_IMAGE_268206CD6F99AADA3418} num="Fig. 1.21" />
    <P2>Let the speed of the heavier piece after explosion be {"$v'$"}. Then by conservation of linear momentum, we have {"$mv=0+(3m/4)v' \\quad \\Rightarrow v'=4v/3$"}</P2>
    <P2>Therefore, kinetic energy added to the system in the explosion {"$=K_{\\text{final}}-K_{\\text{initial}}$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & =\\frac{1}{2}\\left(\\frac{3m}{4}\\right)v^{\\prime 2}-\\frac{1}{2}mv^{2} \\\\ & =\\frac{1}{2}\\left(\\frac{3m}{4}\\right)\\left(\\frac{4v}{3}\\right)^{2}-\\frac{1}{2}mv^{2}=\\frac{1}{6}mv^{2} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <SecHd key="sec-s15" id="s15" label="1.5" title="Impulse" />,
  <p key="b1-p-s15-1" style={{ textIndent: 28, textAlign: "justify" }}>
    When two bodies come close together and exert large forces on each other for a short duration of time, a collision is said to have taken place between them. We must be able to distinguish times before, during and after a collision. In before and after stages interaction forces are negligible. But during collision, interaction forces are very large and usually the dominating forces that determine the motion of the two bodies.
  </p>,

  <SubHd key="sub-impulsechange" id="impulsechange" title="Impulse and change in momentum" />,
  <p key="b1-p-imp-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The forces of interaction of bodies during collision are usually very large and act for short duration of time. What is important is not the force alone or its duration alone but a combination called the <em>impulse</em> of the force.
  </p>,
  <p key="b1-p-imp-2" style={{ textIndent: 28, textAlign: "justify" }}>
    If one body exerts on the other body, a force {"$\\vec{F}(t)$"} for a time interval from {"$t_{i}$"} to {"$t_{f}$"}, the impulse of the force is given by the integral.
  </p>,
  <div key="b1-math-18" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\vec{J}=\\int_{t_{i}}^{t_{f}} \\vec{F}(t)\\, dt=\\vec{F}_{av}\\Delta t$$"}
  </div>,
  <p key="b1-p-imp-3" style={{ textIndent: 28, textAlign: "justify" }}>
    where, {"$F_{av}$"} is the average force during collision and {"$\\Delta t$"} is the duration of the collision.
  </p>,
  <p key="b1-p-imp-4" style={{ textIndent: 28, textAlign: "justify" }}>
    According to Newton's second law,
  </p>,
  <div key="b1-math-19" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & \\vec{F}=m\\frac{d\\vec{v}}{dt} \\\\ \\therefore \\quad \\vec{J} & =\\int \\vec{F}\\, dt=\\int m\\frac{d\\vec{v}}{dt}\\, dt=\\int m\\, d\\vec{v} \\\\ \\text{or} \\quad \\vec{J} & =m\\vec{v}_{f}-m\\vec{v}_{i}=\\overrightarrow{\\Delta p} \\end{aligned}$$"}
  </div>,
  <p key="b1-p-imp-5" style={{ textAlign: "justify" }}>
    (Impulse-momentum theorem)
  </p>,
  <p key="b1-p-imp-6" style={{ textIndent: 28, textAlign: "justify" }}>
    For one-dimensional force, impulse is also equal to area under force-time graph. In the given figure, the impulse of force {"$F$"} in time interval {"$t_{i}$"} to {"$t_{f}$"} equals to area of the shaded portion.
  </p>,
  <Fig key="fig-1-22" src={CONTENT_IMAGES.CONTENT_IMAGE_8BF838A9342AA82AEEA0} num="Fig. 1.22" />,
  <p key="b1-p-imp-7" style={{ textIndent: 28, textAlign: "justify" }}>
    If several forces {"$\\overrightarrow{F_{1}}, \\overrightarrow{F_{2}}, \\overrightarrow{F_{3}}, \\ldots. \\overrightarrow{F_{n}}$"} act on a body in a time interval, then the total impulse {"$\\vec{J}$"} of all these forces is equal to impulse of the net force given by
  </p>,
  <div key="b1-math-20" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} \\vec{J} & =\\int_{t_{i}}^{t_{f}} \\overrightarrow{F_{1}}\\, dt+\\int_{t_{i}}^{t_{f}} \\overrightarrow{F_{2}}\\, dt+\\ldots..+\\int_{t_{i}}^{t_{f}} \\overrightarrow{F_{n}}\\, dt \\\\ & =\\int_{t_{i}}^{t_{f}}\\left(\\overrightarrow{F_{1}}+\\overrightarrow{F_{2}}+\\ldots.+\\overrightarrow{F_{n}}\\right)dt \\end{aligned}$$"}
  </div>,

  <IllustrationBox key="ill-14" num="14">
    <P2>A golf player hits a golf ball of mass 100 g and imparts it a speed of {"$50$"} m/s. If golf stick remains in contact with the ball for 0.01 s, what is the impulse imparted to the ball and what is the average force exerted by the stick on the ball.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>The impulse imparted to the ball,</P2>
    <P2>{"$J=\\Delta p=mv-mu=0 \\cdot 1 \\times 50-0=5 \\cdot 0$"} kg m/s</P2>
    <P2>{"$F_{av}t=J \\quad \\therefore \\quad F_{av}=\\dfrac{J}{t}=\\dfrac{5 \\cdot 0}{0 \\cdot 01}=500$"} N</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-15" num="15">
    <P2>A particle of mass 2 kg is initially at rest. A force starts acting on it in one direction whose magnitude changes with time. The force time graph is shown in fig. 1.23. Find the velocity of the particle at the end of 10 s.</P2>
    <Fig key="fig-1-23" src={CONTENT_IMAGES.CONTENT_IMAGE_C2AC82D8BD5539B13DAC} num="Fig. 1.23" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>The impulse on the particle {"$=$"} Area under {"$F-t$"} curve {"$=$"} change in momentum.</P2>
    <P2>{"$\\Rightarrow 10+20+30+40=2 \\times (v-0) \\quad \\therefore \\quad v=50$"} m/s</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-16" num="16">
    <P2>Calculate impulse over the time interval from {"$\\boldsymbol{t}=\\mathbf{1}$"} s to {"$\\boldsymbol{t}=\\mathbf{4}$"} s of force</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\vec{F}=\\left(3t^{2} \\hat{i}+2t \\hat{j}+4 \\hat{k}\\right)\\text{ N}$$"}
    </div>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\vec{J}=\\int_{1}^{4} \\vec{F}\\, dt=\\int_{1}^{4}\\left(3t^{2} \\hat{i}+2t \\hat{j}+4 \\hat{k}\\right)dt$$"}
    </div>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$=\\left[t^{3} \\hat{i}+t^{2} \\hat{j}+4t \\hat{k}\\right]_{1}^{4}=(63 \\hat{i}+15 \\hat{j}+12 \\hat{k})\\text{ Ns}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-17" num="17">
    <P2>A particle of mass 2 kg is moving with velocity {"$\\vec{v}=(2\\hat{i}-3\\hat{j})$"} ms{"$^{-1}$"} in free space. Find its velocity 3 s after constant force {"$\\vec{F}=(3\\hat{i}+4\\hat{j})$"} N starts acting on it.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>{"$\\vec{J}=\\vec{F}\\,t=m(\\vec{v}_{f}-\\vec{v}_{i})$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & \\Rightarrow(3\\hat{i}+4\\hat{j})\\times 3=2\\times \\vec{v}_{f}-2\\times(2\\hat{i}-3\\hat{j}) \\\\ & \\Rightarrow 9\\hat{i}+12\\hat{j}=2\\vec{v}_{f}-(4\\hat{i}-6\\hat{j}) \\\\ & \\Rightarrow 2\\vec{v}_{f}=(9\\hat{i}+12\\hat{j})+(4\\hat{i}-6\\hat{j})=13\\hat{i}+6\\hat{j} \\\\ & \\therefore\\; \\vec{v}_{f}=(6 \\cdot 5\\hat{i}+3\\hat{j})\\text{ ms}^{-1} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,
];

// ── TABLE SUB-COMPONENTS (batch 2) ──────────────────────────

const TableCorPhases = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <tbody>
        <tr>
          <td style={{ ...td, fontWeight: 700, width: "35%" }}>Before collision</td>
          <td style={{ ...td, textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_54C8CACBEB1B555D5FEC} alt="before collision" style={{ maxWidth: "100%", height: "auto" }} /></td>
          <td style={{ ...td }}>{"$u_{1}>u_{2}$"}</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>During collision (Deformation phase)</td>
          <td style={{ ...td, textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_36A00E6849BE4A77260C} alt="deformation phase" style={{ maxWidth: "100%", height: "auto" }} /></td>
          <td style={{ ...td }}>Velocity of {"$m_{1}$"} is decreasing, velocity of {"$m_{2}$"} is increasing</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>During collision (Maximum deformation)</td>
          <td style={{ ...td, textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_EA0EFDA9D38D52A8F70D} alt="maximum deformation" style={{ maxWidth: "100%", height: "auto" }} /></td>
          <td style={{ ...td }}>Velocity of {"$m_{1}$"} is equal to velocity of {"$m_{2}$"}</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>During collision (Restitution phase)</td>
          <td style={{ ...td, textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_7CA48258B00C4282D050} alt="restitution phase" style={{ maxWidth: "100%", height: "auto" }} /></td>
          <td style={{ ...td }}>Velocity of {"$m_{1}$"} is decreasing, velocity of {"$m_{2}$"} is increasing</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>After collision</td>
          <td style={{ ...td, textAlign: "center" }}><img src={CONTENT_IMAGES.CONTENT_IMAGE_6CE94B05F6FEBEEC23C5} alt="after collision" style={{ maxWidth: "100%", height: "auto" }} /></td>
          <td style={{ ...td }}>{"$v_{1}<v_{2}$"}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TableCollisionSummary = () => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
      <thead>
        <tr>
          <td style={th}></td>
          <td style={th}>Elastic</td>
          <td style={th}>Inelastic</td>
          <td style={th}>Perfectly Inelastic</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Linear momentum is conserved</td>
          <td style={{ ...td, textAlign: "center" }}>yes</td>
          <td style={{ ...td, textAlign: "center" }}>yes</td>
          <td style={{ ...td, textAlign: "center" }}>yes</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>K.E. is conserved</td>
          <td style={{ ...td, textAlign: "center" }}>yes</td>
          <td style={{ ...td, textAlign: "center" }}>no</td>
          <td style={{ ...td, textAlign: "center" }}>no</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Coefficient of restitution (e)</td>
          <td style={{ ...td, textAlign: "center" }}>{"$e=1$"}</td>
          <td style={{ ...td, textAlign: "center" }}>{"$0<e<1$"}</td>
          <td style={{ ...td, textAlign: "center" }}>{"$e=0$"}</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Deformation during collision is relieved</td>
          <td style={{ ...td, textAlign: "center" }}>completely</td>
          <td style={{ ...td, textAlign: "center" }}>partly</td>
          <td style={{ ...td, textAlign: "center" }}>not at all</td>
        </tr>
        <tr>
          <td style={{ ...td, fontWeight: 700 }}>Particles stick together after collision</td>
          <td style={{ ...td, textAlign: "center" }}>no</td>
          <td style={{ ...td, textAlign: "center" }}>no</td>
          <td style={{ ...td, textAlign: "center" }}>yes</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// ── BATCH 2 CONTENT ───────────────────────────────────────────

const content_b2 = [
  <SecHd key="sec-s16" id="s16" label="1.6" title="Collisions" />,
  <p key="b2-p-s16-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We define collision as an event in which two or more colliding bodies exert relatively strong forces on each other but for a relatively short time.
  </p>,
  <p key="b2-p-s16-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider two particles moving on a horizontal surface collide. Then an equal and opposite impulse act on both bodies. The impulse on first body towards left is equal to the impulse on the second body towards right. This means that the decrease in momentum of the first body is equal to the increase in momentum of the second body. Hence, the total momentum of the system before collision is equal to the total momentum of the system after collision. In all collisions, the total linear momentum is conserved.
  </p>,
  <p key="b2-p-s16-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider two particles of mass {"$m_{1}$"} and {"$m_{2}$"} collide. Let their velocities be {"$u_{1}$"} and {"$u_{2}$"} before collision and {"$v_{1}$"} and {"$v_{2}$"} after collision respectively.
  </p>,
  <Fig key="fig-1-24" src={CONTENT_IMAGES.CONTENT_IMAGE_7E3885D539306E885F54} num="Fig. 1.24" />,
  <p key="b2-p-s16-4" style={{ textIndent: 28, textAlign: "justify" }}>
    The total linear momentum before collision {"$=m_{1}u_{1}+m_{2}u_{2}$"}. The total linear momentum after collision {"$=m_{1}v_{1}+m_{2}v_{2}$"}. Then, {"$\\quad m_{1}u_{1}+m_{2}u_{2}=m_{1}v_{1}+m_{2}v_{2}$"}. We can write
  </p>,
  <div key="b2-math-1" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & \\frac{m_{1}u_{1}+m_{2}u_{2}}{m_{1}+m_{2}}=\\frac{m_{1}v_{1}+m_{2}v_{2}}{m_{1}+m_{2}} \\\\ & \\therefore\\; u_{\\mathrm{cm}}=v_{\\mathrm{cm}} \\end{aligned}$$"}
  </div>,

  <GraspGripBox key="gg-s16">
    <P2>The velocity of centre of mass before collision is equal to velocity of centre of mass after collision. In fact, for any collision, the velocity of centre of mass before, during and after collision remains the same.</P2>
    <P2>The total kinetic energy of the system, however may or may not be conserved. The impact of particles during collision may generate heat, sound and permanent deformation which consumes a part of the initial kinetic energy which results in a decreased final kinetic energy.</P2>
    <P2>The collisions between particles are broadly divided into two types: Elastic collisions and Inelastic collisions.</P2>
  </GraspGripBox>,

  <SubHd key="sub-elastic" id="elastic" title="Elastic Collisions" />,
  <p key="b2-p-elastic-1" style={{ textIndent: 28, textAlign: "justify" }}>
    An elastic collision is one in which in addition to total linear momentum, the total kinetic energy is also conserved.
  </p>,
  <SubSubHd key="subsub-elasticchar" id="elasticchar" title="The basic characteristics of an elastic collision are" />,
  <p key="b2-p-elasticchar-1" style={{ textAlign: "justify" }}>
    (i) The total linear momentum of the system is conserved
  </p>,
  <p key="b2-p-elasticchar-2" style={{ textAlign: "justify" }}>
    (ii) The total kinetic energy of the system is conserved.
  </p>,
  <p key="b2-p-elasticchar-3" style={{ textIndent: 28, textAlign: "justify" }}>
    A body is said to be elastic if on application of deforming forces, the body deforms and subsequently on removal of these forces, the body reforms back to its original shape and size like in case of a spring. As the name suggests, in elastic collision, the deformation of particles that occur during collision is relieved and hence a part of initial kinetic energy that is consumed in deformation gets released. This results in no loss of kinetic energy.
  </p>,

  <SubHd key="sub-inelastic" id="inelastic" title="Inelastic Collisions" />,
  <p key="b2-p-inelastic-1" style={{ textIndent: 28, textAlign: "justify" }}>
    An inelastic collision is one in which the linear momentum is conserved but the total kinetic energy is not conserved. The basic characteristics of an inelastic collision are
  </p>,
  <p key="b2-p-inelastic-2" style={{ textAlign: "justify" }}>
    (i) The total linear momentum of the system is conserved.
  </p>,
  <p key="b2-p-inelastic-3" style={{ textAlign: "justify" }}>
    (ii) The total kinetic energy of the system is not conserved.
  </p>,
  <p key="b2-p-inelastic-4" style={{ textIndent: 28, textAlign: "justify" }}>
    In an inelastic collision, the deformation of particles that occur during collision is not completely relieved and hence a part of initial kinetic energy is permanently consumed in permanent deformation resulting in a loss of kinetic energy. In most of the cases, the deformation is partly relieved. However, if there is absolutely no relieving of deformation, the collision is called <em>perfectly inelastic collision</em>. In the case of perfectly inelastic collision,
  </p>,
  <p key="b2-p-inelastic-5" style={{ textAlign: "justify" }}>
    (i) the colliding particles stick together and move together with same velocity after collision.
  </p>,
  <p key="b2-p-inelastic-6" style={{ textAlign: "justify" }}>
    (ii) the loss of kinetic energy is maximum.
  </p>,

  <SecHd key="sec-s17" id="s17" label="1.7" title="Coefficient of Restitution or Coefficient of Resilience" />,
  <p key="b2-p-s17-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In real practice, the collisions between all real objects are neither perfectly elastic nor they are perfectly inelastic. To quantitatively measure the degree of elasticity of a collision, we introduce a term called <em>coefficient of restitution</em>. It is also called <em>coefficient of resilience</em> and is denoted by letter {"'$e$'"}.
  </p>,
  <p key="b2-p-s17-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Restitution means restoration or recovery of shape and size of the body that has undergone deformation during collision. To understand what happens in a head-on collision, let us consider two balls of masses {"$m_{1}$"} and {"$m_{2}$"} moving with velocities {"$u_{1}$"} and {"$u_{2}$"} in the same direction. Velocity {"$u_{1}$"} is larger than {"$u_{2}$"} so that the balls collide. During impact, both balls apply force on each other and they get deformed till the deformation reaches a maximum value. At this stage, the velocity {"$v$"} of both balls is same. Then, they try to regain their original shape due to elastic behaviors of the materials forming the balls.
  </p>,
  <p key="b2-p-s17-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Usually the force {"$D$"} applied by the balls on each other during deformation phase differs from the force {"$R$"} applied by the balls on each other during restitution phase. Therefore, it is not necessary that magnitude of impulse {"$\\int D\\, dt$"} during deformation phase equals the magnitude of impulse {"$\\int R\\, dt$"} during restitution phase.
  </p>,
  <p key="b2-p-s17-4" style={{ textIndent: 28, textAlign: "justify" }}>
    The ratio of magnitudes of impulse of restitution to that of deformation is called the coefficient of restitution and is denoted by {"$e$"}.
  </p>,
  <div key="b2-math-2" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$e=\\frac{\\int R\\, dt}{\\int D\\, dt}$$"}
  </div>,
  <p key="b2-p-s17-5" style={{ textIndent: 28, textAlign: "justify" }}>
    During deformation phase, the impulse on balls {"$m_{1}$"} and {"$m_{2}$"} are respectively
  </p>,
  <div key="b2-math-3" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} \\int D\\, dt & =m_{1}\\left(u_{1}-v\\right) \\text{ and } \\int D\\, dt=m_{2}\\left(v-u_{2}\\right) \\\\ \\Rightarrow \\int D\\, dt & =\\frac{m_{1}m_{2}}{m_{1}+m_{2}}\\left(u_{1}-u_{2}\\right) \\qquad\\text{...(1)} \\end{aligned}$$"}
  </div>,
  <p key="b2-p-s17-6" style={{ textIndent: 28, textAlign: "justify" }}>
    During restitution phase, the impulse on balls {"$m_{1}$"} and {"$m_{2}$"} are respectively
  </p>,
  <div key="b2-math-4" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & \\int R\\, dt=m_{1}\\left(v-v_{1}\\right) \\quad \\text{and} \\quad \\int R\\, dt=m_{2}\\left(v_{2}-v\\right) \\\\ \\Rightarrow & \\int R\\, dt=\\frac{m_{1}m_{2}}{m_{1}+m_{2}}\\left(v_{2}-v_{1}\\right) \\qquad\\text{...(2)} \\end{aligned}$$"}
  </div>,
  <p key="b2-p-s17-7" style={{ textIndent: 28, textAlign: "justify" }}>
    From (1) and (2),
  </p>,
  <div key="b2-math-5" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$e=\\frac{\\int R\\, dt}{\\int D\\, dt}=\\frac{v_{2}-v_{1}}{u_{1}-u_{2}}$$"}
  </div>,
  <p key="b2-p-s17-8" style={{ textIndent: 28, textAlign: "justify" }}>
    In general, its value ranges from zero to one but in collision where kinetic energy is generated, its value may exceed one.
  </p>,
  <TableCorPhases key="tbl-corphases" />,
  <p key="b2-p-s17-9" style={{ textIndent: 28, textAlign: "justify" }}>
    Coefficient of restitution is also defined as the ratio of relative velocity of separation of particles after collision to the relative velocity of approach before collision.
  </p>,
  <p key="b2-p-s17-10" style={{ textAlign: "justify" }}>
    {"$e=\\dfrac{\\text{relative velocity of separation (after collision)}}{\\text{relative velocity of approach (before collision)}}$"}
  </p>,
  <div key="b2-math-6" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\text{i.e., } e=\\frac{v_{2}-v_{1}}{u_{1}-u_{2}}$$"}
  </div>,
  <p key="b2-p-s17-11" style={{ textAlign: "justify" }}>
    {"$e=1$"} &nbsp;&nbsp; for perfectly elastic collision<br />
    {"$e=0$"} &nbsp;&nbsp; for perfectly inelastic collision<br />
    {"$0<e<1$"} &nbsp;&nbsp; for all other inelastic collisions
  </p>,

  <SubHd key="sub-collsummary" id="collsummary" title="Summary of collisions" />,
  <TableCollisionSummary key="tbl-collsummary" />,

  <SecHd key="sec-s18" id="s18" label="1.8" title="Elastic Collision in One Dimension" />,
  <p key="b2-p-s18-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Collision in one dimension involves the collision of two particles when their motion is along a straight line joining the centres of the two particles. In such case, the motion of the particles both before and after collision is in a straight line and hence is called collision in one dimension. This is also known as <em>head on collision</em>.
  </p>,
  <p key="b2-p-s18-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider two particles as shown in Fig. 1.25.
  </p>,
  <Fig key="fig-1-25" src={CONTENT_IMAGES.CONTENT_IMAGE_71258C7C3745CC03E4AD} num="Fig. 1.25" />,
  <p key="b2-p-s18-3" style={{ textIndent: 28, textAlign: "justify" }}>
    Let this be an elastic collision in one dimension. Then we can write
  </p>,
  <div key="b2-math-7" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$m_{1}u_{1}+m_{2}u_{2}=m_{1}v_{1}+m_{2}v_{2} \\tag{1}$$"}
  </div>,
  <p key="b2-p-s18-4" style={{ textAlign: "center", fontStyle: "italic" }}>
    (By conservation of linear momentum)
  </p>,
  <div key="b2-math-8" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\frac{1}{2}m_{1}u_{1}^{2}+\\frac{1}{2}m_{2}u_{2}^{2}=\\frac{1}{2}m_{1}v_{1}^{2}+\\frac{1}{2}m_{2}v_{2}^{2} \\tag{2}$$"}
  </div>,
  <p key="b2-p-s18-5" style={{ textAlign: "center", fontStyle: "italic" }}>
    (By conservation of Kinetic Energy)
  </p>,
  <p key="b2-p-s18-6" style={{ textIndent: 28, textAlign: "justify" }}>
    If {"$m_{1}, m_{2}, u_{1}$"} and {"$u_{2}$"} are known, using the above two equations, we can determine the two unknown variables {"$v_{1}$"} and {"$v_{2}$"}. On solving equations (1) and (2), we get
  </p>,
  <div key="b2-math-9" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & v_{1}=\\frac{m_{1}-m_{2}}{m_{1}+m_{2}}u_{1}+\\frac{2m_{2}u_{2}}{m_{1}+m_{2}} \\\\ & v_{2}=\\frac{2m_{1}u_{1}}{m_{1}+m_{2}}+\\frac{m_{2}-m_{1}}{m_{1}+m_{2}}u_{2} \\end{aligned}$$"}
  </div>,
  <p key="b2-p-s18-7" style={{ textIndent: 28, textAlign: "justify" }}>
    Also, from equations (1) and (2), we get
  </p>,
  <div key="b2-math-10" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & m_{1}\\left(u_{1}-v_{1}\\right)=m_{2}\\left(v_{2}-u_{2}\\right) \\qquad \\text{...(3)} \\\\ & m_{1}\\left(u_{1}^{2}-v_{1}^{2}\\right)=m_{2}\\left(v_{2}^{2}-u_{2}^{2}\\right) \\qquad \\text{...(4)} \\end{aligned}$$"}
  </div>,
  <p key="b2-p-s18-8" style={{ textIndent: 28, textAlign: "justify" }}>
    On dividing equation (4) by equation (3), we get
  </p>,
  <div key="b2-math-11" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & u_{1}+v_{1}=v_{2}+u_{2} \\quad \\Rightarrow v_{2}-v_{1}=u_{1}-u_{2} \\\\ & \\therefore \\quad e=\\frac{v_{2}-v_{1}}{u_{1}-u_{2}}=1 \\end{aligned}$$"}
  </div>,

  <SecHd key="sec-s19" id="s19" label="1.9" title="Perfectly Inelastic Collision in One Dimension" />,
  <p key="b2-p-s19-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In this case, the two particles stick together after collision and move together with same velocity say {"'$v$'"}. Consider the two particles as shown.
  </p>,
  <Fig key="fig-1-26" src={CONTENT_IMAGES.CONTENT_IMAGE_FD737BA1ACC8D73D595B} num="Fig. 1.26" />,
  <p key="b2-p-s19-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Since, the collision is perfectly inelastic, {"$\\quad v_{1}=v_{2}=v$"}. Then, by conservation of linear momentum, we can write
  </p>,
  <div key="b2-math-12" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$m_{1}u_{1}+m_{2}u_{2}=\\left(m_{1}+m_{2}\\right)v$$"}
  </div>,
  <p key="b2-p-s19-3" style={{ textIndent: 28, textAlign: "justify" }}>
    If {"$m_{1}, m_{2}, u_{1}$"} and {"$u_{2}$"} are known, we have only one unknown variable {"$v$"}. Hence,
  </p>,
  <div key="b2-math-13" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$v=\\frac{m_{1}u_{1}+m_{2}u_{2}}{m_{1}+m_{2}}$$"}
  </div>,
  <p key="b2-p-s19-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Clearly since, {"$v_{1}=v_{2}=v$"}, we have
  </p>,
  <div key="b2-math-14" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$e=\\frac{v_{2}-v_{1}}{u_{1}-u_{2}}=0$$"}
  </div>,

  <GraspGripBox key="gg-s19">
    <P2>In case of collision between two bodies, out of the six variables, i.e., {"$m_{1}, m_{2}, u_{1}, u_{2}, v_{1}$"} and {"$v_{2}$"}, the value of four variables would generally be known and we would need to compute the value of the balance two variables. For this, we shall use the following two equations.</P2>
    <P2>(a) {"$m_{1}u_{1}+m_{2}u_{2}=m_{1}v_{1}+m_{2}v_{2}$"}</P2>
    <P2>(b) {"$e=\\dfrac{v_{2}-v_{1}}{u_{1}-u_{2}}$"} &nbsp;&nbsp; or &nbsp;&nbsp; {"$v_{2}-v_{1}=e(u_{1}-u_{2})$"}</P2>
  </GraspGripBox>,

  <IllustrationBox key="ill-18" num="18">
    <P2>A ball of mass {"$\\boldsymbol{m}=2$"} kg moving at 10 m/s collides head on with a 3 kg ball moving in the same direction at 5 m/s. Find the velocity of each ball after the collision</P2>
    <P2>(a) if the collision is elastic</P2>
    <P2>(b) if the collision is perfectly inelastic</P2>
    <P2>(c) if the collision is inelastic and {"$\\boldsymbol{e}=\\mathbf{0.5}$"}</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, {"$m_{1}=2$"} kg, {"$m_{2}=3$"} kg, {"$u_{1}=10$"} m/s, {"$u_{2}=5$"} m/s. Let {"$v_{1}$"} and {"$v_{2}$"} be the final velocities of the two balls.</P2>
    <P2>From conservation of linear momentum, we have</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & m_{1}u_{1}+m_{2}u_{2}=m_{1}v_{1}+m_{2}v_{2} \\\\ \\Rightarrow & 2 \\times 10+3 \\times 5=2v_{1}+3v_{2} \\\\ \\Rightarrow & 2v_{1}+3v_{2}=35 \\qquad\\text{...(1)} \\\\ & v_{2}-v_{1}=e(u_{1}-u_{2}) \\\\ \\Rightarrow & v_{2}-v_{1}=e(10-5)=5e \\end{aligned}$$"}
    </div>
    <P2>(a) For elastic collision, {"$e=1$"}</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow\\; v_{2}-v_{1}=5 \\tag{2}$$"}
    </div>
    <P2>On solving eqn. (1) and eqn. (2), we get</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1}=4\\text{ m/s} \\quad \\text{and} \\quad v_{2}=9\\text{ m/s}$$"}
    </div>
    <P2>(b) For perfectly inelastic collision, {"$e=0$"}</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow\\; v_{2}-v_{1}=0 \\tag{3}$$"}
    </div>
    <P2>On solving eqn. (1) and eqn. (3), we get</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1}=v_{2}=7\\text{ m/s}$$"}
    </div>
    <P2>(c) If {"$e=0 \\cdot 5$"}, we have</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{2}-v_{1}=2 \\cdot 5 \\tag{4}$$"}
    </div>
    <P2>On solving eqn. (1) and eqn. (4), we get</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1}=5 \\cdot 5\\text{ m/s} \\quad \\text{and} \\quad v_{2}=8\\text{ m/s}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-19" num="19">
    <P2>A ball of mass {"$m=2$"} kg moving at 10 m/s collides head on with a 4 kg ball moving in the opposite direction at 20 m/s. If the collision is elastic, find the velocity of each ball after the collision.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, {"$m_{1}=2$"} kg, {"$m_{2}=4$"} kg, {"$u_{1}=10$"} m/s, {"$u_{2}=-20$"} m/s. Let {"$v_{1}$"} and {"$v_{2}$"} be the final velocities of the two balls.</P2>
    <P2>From conservation of linear momentum, we have</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & m_{1}u_{1}+m_{2}u_{2}=m_{1}v_{1}+m_{2}v_{2} \\\\ \\Rightarrow & 2 \\times 10-4 \\times 20=2v_{1}+4v_{2} \\\\ \\Rightarrow & v_{1}+2v_{2}=-30 \\qquad\\text{...(1)} \\end{aligned}$$"}
    </div>
    <P2>For elastic collision, {"$e=1$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & \\Rightarrow \\quad v_{2}-v_{1}=u_{1}-u_{2} \\\\ & \\Rightarrow \\quad v_{2}-v_{1}=30 \\qquad\\text{...(2)} \\end{aligned}$$"}
    </div>
    <P2>On solving eqn. (1) and eqn. (2), we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1}=-30\\text{ m/s} \\quad \\text{and} \\quad v_{2}=0$$"}
    </div>
    <P2>Hence, {"$m_{2}$"} comes to rest while {"$m_{1}$"} rebounds back with a speed of 30 m/s.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-20" num="20">
    <P2>A large block of wood of mass {"$\\boldsymbol{M}$"} is suspended from a ceiling by a cord of length {"$L$"}. A bullet of mass {"$m$"} is fired into the block, comes quickly to rest in the block. As a result of this, the block swings through an angle {"$\\theta_{0}$"}. Find the velocity with which the bullet was fired.</P2>
    <Fig key="fig-1-27" src={CONTENT_IMAGES.CONTENT_IMAGE_35F61F50A2D7CCEC40E8} num="Fig. 1.27" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>During collision, momentum of the system is conserved. Hence, {"$mu=(M+m)v$"}, where, {"$v$"} is the velocity of system immediately after the collision.</P2>
    <P2>After the collision, mechanical energy will be conserved. If the block swings by an angle {"$\\theta_{0}$"}, the centre of mass of the system rises by</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & h=L-L\\cos\\theta_{0}=L\\left(1-\\cos\\theta_{0}\\right) \\\\ \\Rightarrow \\quad & \\frac{1}{2}(M+m)v^{2}=(M+m)gL\\left(1-\\cos\\theta_{0}\\right) \\\\ \\Rightarrow \\quad & v=\\sqrt{2gL\\left(1-\\cos\\theta_{0}\\right)} \\end{aligned}$$"}
    </div>
    <P2>Substituting this value in eqn. (1), we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$u=\\frac{M+m}{m}\\sqrt{2gL\\left(1-\\cos\\theta_{0}\\right)}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-21" num="21">
    <P2>Two identical balls moving with velocities {"$u_{1}$"} and {"$u_{2}$"} in the same direction collide. Coefficient of restitution is {"$e$"}.</P2>
    <P2>(a) Deduce expression for velocities of the balls after the collision.</P2>
    <P2>(b) If collision is perfectly elastic, what do you observe?</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>As the balls are identical, their mass is same. Let it be {"$m$"}. Let the velocities of the balls after collision be {"$v_{1}$"} and {"$v_{2}$"}.</P2>
    <P2>Equation of momentum conservation is</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & mu_{1}+mu_{2}=mv_{1}+mv_{2} \\\\ & \\Rightarrow u_{1}+u_{2}=v_{1}+v_{2} \\qquad\\text{...(1)} \\end{aligned}$$"}
    </div>
    <P2>Equation of coefficient of restitution is</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{2}-v_{1}=e\\left(u_{1}-u_{2}\\right) \\tag{2}$$"}
    </div>
    <P2>(a) On solving equations (1) and (2), we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1}=\\left(\\frac{1-e}{2}\\right)u_{1}+\\left(\\frac{1+e}{2}\\right)u_{2} \\quad \\text{and} \\quad v_{2}=\\left(\\frac{1+e}{2}\\right)u_{1}+\\left(\\frac{1-e}{2}\\right)u_{2}$$"}
    </div>
    <P2>(b) For perfectly elastic collision, {"$e=1$"}.</P2>
    <P2>On putting {"$e=1$"} in above equations, we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1}=u_{2} \\quad \\text{and} \\quad v_{2}=u_{1}$$"}
    </div>
    <P2>We conclude that identical bodies exchange their velocities after perfectly elastic collision.</P2>
  </IllustrationBox>,

  <SecHd key="sec-s110" id="s110" label="1.10" title="Some Special Cases of Collision in One Dimension" />,
  <p key="b2-p-s110-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The two equations that we shall be using are
  </p>,
  <p key="b2-p-s110-2" style={{ textAlign: "justify" }}>
    {"$m_{1}u_{1}+m_{2}u_{2}=m_{1}v_{1}+m_{2}v_{2}$"}
  </p>,
  <p key="b2-p-s110-3" style={{ textAlign: "justify" }}>
    and {"$v_{2}-v_{1}=e(u_{1}-u_{2})$"}
  </p>,
  <p key="b2-p-s110-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>(i) Case-I:</strong> The collision is elastic and the mass of both particles is same. Here, {"$m_{1}=m_{2}$"}. Substituting this in above equations, we get
  </p>,
  <p key="b2-p-s110-5" style={{ textAlign: "justify" }}>
    {"$v_{1}=u_{2}$"} &nbsp;&nbsp; and &nbsp;&nbsp; {"$v_{2}=u_{1}$"}
  </p>,
  <p key="b2-p-s110-6" style={{ textIndent: 28, textAlign: "justify" }}>
    Hence, we conclude that if collision is elastic in one dimension and the mass of both particles is same, the velocities of the particles after collision interchange.
  </p>,
  <p key="b2-p-s110-7" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>(ii) Case-II:</strong> The collision is elastic, the second particle has initial velocity zero and also has large mass, i.e., {"$u_{2}=0$"} and {"$m_{2} \\gg m_{1}$"}. Substituting this in above equations, we get
  </p>,
  <p key="b2-p-s110-8" style={{ textAlign: "justify" }}>
    {"$v_{1}=-u_{1}$"} &nbsp;&nbsp; and &nbsp;&nbsp; {"$v_{2}=0$"}
  </p>,
  <p key="b2-p-s110-9" style={{ textIndent: 28, textAlign: "justify" }}>
    Hence, we conclude that when a particle makes an elastic collision in one dimension with a large mass at rest, the colliding particle moves with the same speed and reverses its direction.
  </p>,
  <p key="b2-p-s110-10" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>(iii) Case-III:</strong> The collision is inelastic, the second particle has initial velocity zero and also has large mass, i.e., {"$u_{2}=0$"} and {"$m_{2} \\gg m_{1}$"}. Substituting this in above equations, we get
  </p>,
  <p key="b2-p-s110-11" style={{ textAlign: "justify" }}>
    {"$v_{1}=-eu_{1}$"} &nbsp;&nbsp; and &nbsp;&nbsp; {"$v_{2}=0$"}
  </p>,
  <p key="b2-p-s110-12" style={{ textIndent: 28, textAlign: "justify" }}>
    Hence, we conclude that when a particle makes an inelastic collision in one dimension with a large mass at rest, the colliding particle reverses its direction and moves with a speed equal to {"$\\boldsymbol{e}$"} times its initial speed.
  </p>,
  <p key="b2-p-s110-13" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>(iv) Case-IV: A body is dropped from height {"$\\boldsymbol{h}$"}</strong>
  </p>,
  <p key="b2-p-s110-14" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider a body dropped from a height {"$h_{0}$"} which rises to a height {"$h_{1}$"} after collision with ground. Let {"$u$"} be the speed with which the ball strikes the ground and {"$v$"} be the speed with which it rebounds back.
  </p>,
  <Fig key="fig-1-28" src={CONTENT_IMAGES.CONTENT_IMAGE_4A1C86BCB0B44D8A3D9E} num="Fig. 1.28" />,
  <p key="b2-p-s110-15" style={{ textIndent: 28, textAlign: "justify" }}>
    Then, we have {"$u=\\sqrt{2gh_{0}}$"} and {"$v=\\sqrt{2gh_{1}}$"}. Since, the ground is at rest and has a large mass, we have {"$v=eu$"}
  </p>,
  <div key="b2-math-15" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\Rightarrow \\frac{v}{u}=\\frac{\\sqrt{2gh_{1}}}{\\sqrt{2gh_{0}}} \\quad \\therefore\\; h_{1}=h_{0}e^{2}$$"}
  </div>,
  <p key="b2-p-s110-16" style={{ textIndent: 28, textAlign: "justify" }}>
    If after {"$n$"} collisions, the body rises to a height {"$h_{n}$"}, then {"$h_{n}=h_{0}e^{2n}$"}.
  </p>,

  <IllustrationBox key="ill-22" num="22">
    <P2>A ball is dropped from height {"$h$"} on the ground. If after third rebound, it rises to a height {"$h/2$"}, what is the value of coefficient of restitution?</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, {"$\\dfrac{h}{2}=h\\,e^{2\\times 3}\\quad \\therefore\\; e=\\left(\\dfrac{1}{2}\\right)^{1/6}$"}</P2>
  </IllustrationBox>,

  <SubHd key="sub-smallforces" id="smallforces" title="Impulse due to small forces" />,
  <p key="b2-p-smallf-1" style={{ textIndent: 28, textAlign: "justify" }}>
    The conservation of momentum is also valid if two bodies falling under gravity collide. This is because the time duration of collision is very small and the impulse due to relatively small forces such as gravitational force is negligible and therefore can be ignored.
  </p>,

  <GraspGripBox key="gg-s110">
    <P2>During collision, the force exerted by the two colliding bodies on each other is very large. Therefore, the impulse of one colliding body on the other is usually much greater than any impulse exerted by the forces such as gravitation force, friction force, etc. The time duration of collision being very small, the impulse due to such relatively small forces are ignored while solving problems.</P2>
  </GraspGripBox>,

  <IllustrationBox key="ill-23" num="23">
    <P2>A <strong>100 g</strong> ball moving horizontally with 20 m/s is struck by a bat, as a result of which, it starts moving with a speed of 35 m/s at an angle of {"$37^{\\circ}$"} above the horizontal in the same vertical plane as shown in the fig. 1.29.</P2>
    <P2>(a) Find the average force exerted by the bat if duration of impact is 0.30 s.</P2>
    <P2>(b) Find the average force exerted by the bat if duration of impact is 0.03 s.</P2>
    <P2>(c) Find the average force exerted by the bat if duration of impact is 0.003 s.</P2>
    <Fig key="fig-1-29" src={CONTENT_IMAGES.CONTENT_IMAGE_5F324E7D3092267A0FEB} num="Fig. 1.29" />
    <P2>(d) What do you conclude for impulse of weight of the ball as duration of contact decreases?</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Consider axes {"$X$"} and {"$Y$"} in the direction shown in the fig. 1.29. The impulse on ball is</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} \\vec{J} & =\\Delta\\vec{p}=m\\left(\\vec{v}_{f}-\\vec{v}_{i}\\right) \\\\ & =0 \\cdot 1 \\times\\left[\\left(35\\cos37^{\\circ} \\hat{i}+35\\sin37^{\\circ} \\hat{j}\\right)-(-20\\hat{i})\\right] \\\\ \\Rightarrow \\vec{F}_{av}\\Delta t & =0 \\cdot 1 \\times[(28\\hat{i}+21\\hat{j})+20\\hat{i})] \\\\ & =(4 \\cdot 8\\hat{i}+2 \\cdot 1\\hat{j})\\text{ Ns} \\end{aligned}$$"}
    </div>
    <P2>(a) For {"$\\Delta t=0 \\cdot 3$"} s, {"$\\quad \\vec{F}_{av}=(16\\hat{i}+7\\hat{j})$"} N</P2>
    <P2>(b) For {"$\\Delta t=0.03$"} s, {"$\\quad \\vec{F}_{av}=(160\\hat{i}+70\\hat{j})$"} N</P2>
    <P2>(c) For {"$\\Delta t=0.003$"} s, {"$\\vec{F}_{av}=(1600\\hat{i}+700\\hat{j})$"} N</P2>
    <P2>(d) Weight of the ball is {"$W=mg=0 \\cdot 1 \\times 10=1$"} N</P2>
    <P2>The magnitude of impulse of weight is {"$W\\Delta t$"}. It is</P2>
    <P2>{"$0 \\cdot 3$"} Ns for {"$\\Delta t=0 \\cdot 3$"} s,</P2>
    <P2>{"$0.03$"} Ns for {"$\\Delta t=0.03$"} s, and</P2>
    <P2>{"$0.003$"} Ns for {"$\\Delta t=0.003$"} s.</P2>
    <P2>As duration of contact between ball and bat decreases, the impulse due to weight also decreases. We conclude that impulse due to such finite (small / medium) forces in short interval of time is small and therefore can be neglected.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-24" num="24">
    <P2>A bullet of mass 50 g moving with velocity 600 m/s hits a block of mass 2.0 kg placed on a rough horizontal ground and comes out of the block with a velocity of 200 m/s. The coefficient of friction between the block and the ground is {"$0 \\cdot 25$"}. Neglect loss of mass of the block as the bullet pierces through it and take {"$g=10$"} m/s{"$^{2}$"}.</P2>
    <Fig key="fig-1-30" src={CONTENT_IMAGES.CONTENT_IMAGE_D1CC7D8FBD7E1694D28C} num="Fig. 1.30" />
    <P2>(a) In spite of the fact that friction acts as an external force, can you apply principle of conservation of momentum during interaction of the bullet with the block?</P2>
    <P2>(b) Find velocity of the block immediately after the bullet pierces through it.</P2>
    <P2>(c) Find the distance the block will travel before it stops.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>(a) The time interval {"$\\Delta t$"} of interaction of the bullet with the block is very small. Friction {"$f$"} is a finite force. The impulse due to friction {"$J=f\\Delta t$"} is negligible and is therefore neglected. Hence, principle of conservation of momentum can be applied during the interaction of bullet with block.</P2>
    <P2>(b) If {"$v$"} is the velocity of block immediately after the bullet pierces through it, then by principle of conservation of momentum,</P2>
    <P2>{"$0.05 \\times 600=0.05 \\times 200+2 \\times v \\quad \\therefore \\quad v=10$"} m/s</P2>
    <P2>(c) Friction, {"$\\quad f=\\mu mg$"}</P2>
    <P2>To calculate distance {"$s$"} traveled by the block, we apply work energy theorem, {"$W=\\Delta K$"}.</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & \\Rightarrow -fs=0-\\frac{1}{2}mv^{2} \\quad \\Rightarrow \\mu mgs=\\frac{1}{2}mv^{2} \\\\ & \\therefore\\; s=\\frac{v^{2}}{2\\mu g}=\\frac{10^{2}}{2 \\times 0 \\cdot 25 \\times 10}=20\\text{ m} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-25" num="25">
    <P2>A wooden block of mass 10 g is dropped from the top of a cliff <strong>100 m</strong> high. Simultaneously, a bullet of mass <strong>10 g</strong> is fired from the bottom of the cliff vertically upwards with a velocity of 100 m/s.</P2>
    <P2>(Take {"$\\boldsymbol{g}=\\mathbf{10}$"} ms{"$^{-\\mathbf{2}}$"})</P2>
    <P2>(a) Where and after what time will they meet?</P2>
    <P2>(b) If the bullet after striking the block gets embedded in it, how high will it rise above the cliff before it starts falling.</P2>
    <Fig key="fig-1-31" src={CONTENT_IMAGES.CONTENT_IMAGE_7E7380E383BD1707CC74} num="Fig. 1.31" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>(a) Let {"$h$"} be the height at which they collide after time {"$t$"}.</P2>
    <P2>For the block, {"$100-h=\\dfrac{1}{2}gt^{2}$"} &nbsp;&nbsp; ...(1)</P2>
    <P2>For the bullet, {"$h=100t-\\dfrac{1}{2}gt^{2}$"} &nbsp;&nbsp; ...(2)</P2>
    <P2>On solving eqn. (1) and eqn. (2), we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$t=1\\text{ sec} \\quad \\text{and} \\quad h=95\\text{ m}$$"}
    </div>
    <P2>(b) Take upward direction as positive,</P2>
    <P2>Let {"$u_{1}=$"} velocity of block before collision</P2>
    <P2>{"$u_{2}=$"} velocity of bullet before collision</P2>
    <P2>{"$v=$"} velocity of block and bullet after collision</P2>
    <P2>{"$m=$"} mass of block; {"$m=$"} mass of bullet</P2>
    <P2>Then, {"$u_{1}=0-10 \\times 1=-10$"} m/s</P2>
    <P2>and {"$\\quad u_{2}=100-10 \\times 1=90$"} m/s</P2>
    <P2>Conserving linear momentum during collision, we get</P2>
    <P2>{"$mu_{1}+mu_{2}=2mv$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow v=\\frac{u_{1}+u_{2}}{2}=\\frac{-10+90}{2}=40\\text{ m/s}$$"}
    </div>
    <P2>If the system rises to height {"$H$"} above this point, then</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & 0^{2}-v^{2}=-2gH \\\\ \\Rightarrow & H=\\frac{v^{2}}{2g}=\\frac{40^{2}}{2 \\times 10}=80\\text{ m} \\end{aligned}$$"}
    </div>
    <P2>Hence, height above the cliff is equal to</P2>
    <P2>{"$h+H-100=95+80-100=75$"} m</P2>
  </IllustrationBox>,
];

const content_b3 = [
  <SecHd key="sec-s111" id="s111" label="1.11" title="Elastic Collision in Two Dimensions" />,
  <p key="b3-p-s111-1" style={{ textIndent: 28, textAlign: "justify" }}>
    When the motion of particles before collision is not along the line joining their centres, the two masses after collision seemingly move in random directions as shown in fig. 1.32.
  </p>,
  <Fig key="fig-1-32" src={CONTENT_IMAGES.CONTENT_IMAGE_58EFC361B19664103882} num="Fig. 1.32" />,
  <p key="b3-p-s111-2" style={{ textIndent: 28, textAlign: "justify" }}>
    This kind of collision is collision in two dimension and is also called <em>oblique collision</em>. However, not all is random. There are relationships which connect these masses, velocities and angles. By conservation of linear momentum along {"$X$"} and {"$Y$"} axis, we get the following equations
  </p>,
  <div key="b3-math-1" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\begin{aligned} & m_{1}u_{1}=m_{1}v_{1}\\cos\\theta_{1}+m_{2}v_{2}\\cos\\theta_{2} \\\\ & 0=m_{1}v_{1}\\sin\\theta_{1}-m_{2}v_{2}\\sin\\theta_{2} \\end{aligned}$$"}
  </div>,
  <p key="b3-p-s111-3" style={{ textIndent: 28, textAlign: "justify" }}>
    By conservation of kinetic energy, we get
  </p>,
  <div key="b3-math-2" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\frac{1}{2}m_{1}u_{1}^{2}=\\frac{1}{2}m_{1}v_{1}^{2}+\\frac{1}{2}m_{2}v_{2}^{2}$$"}
  </div>,
  <p key="b3-p-s111-4" style={{ textIndent: 28, textAlign: "justify" }}>
    Here, we have four unknown variables i.e., {"$v_{1}, v_{2}, \\theta_{1}$"} and {"$\\theta_{2}$"}. However, we have only three equations. Therefore, at least one of the four unknowns say {"$\\theta_{1}$"} must be made known to solve the problem.
  </p>,

  <GraspGripBox key="gg-s111">
    <P2>If the target particle has a certain velocity, we can always change our frame and solve the problem in frame in which the target particle is at rest.</P2>
  </GraspGripBox>,

  <IllustrationBox key="ill-26" num="26">
    <P2>A disc sliding with velocity {"$u$"} on a smooth horizontal plane strikes another identical disc kept at rest as shown in the fig. 1.33. If the impact between the discs is elastic, find velocities of the discs after the impact.</P2>
    <Fig key="fig-1-33" src={CONTENT_IMAGES.CONTENT_IMAGE_5D0571C8248475EE70CB} num="Fig. 1.33" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <Fig key="fig-1-34" src={CONTENT_IMAGES.CONTENT_IMAGE_E3434AF32A0403C2D1D2} num="Fig. 1.34" />
    <P2>If {"$r$"} is the radius of discs, then</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\sin\\theta=r/2r=1/2 \\quad \\Rightarrow \\theta=30^{\\circ}$$"}
    </div>
    <P2>Before collision, the components of velocity of {"$A$"} are</P2>
    <P2>{"$u\\cos\\theta$"} &nbsp;&nbsp; along normal &nbsp;&nbsp; and &nbsp;&nbsp; {"$u\\sin\\theta$"} &nbsp;&nbsp; along tangent.</P2>
    <P2>Along tangent, there is no impulse and therefore there is no change in velocities of both balls.</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow v_{1t}=u\\sin\\theta \\quad \\text{and} \\quad v_{2t}=0$$"}
    </div>
    <P2>Since, the discs are identical and collision is elastic, along normal, the velocities interchange.</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} \\Rightarrow & v_{1n}=0 \\quad \\text{and} \\quad v_{2n}=u\\cos\\theta \\\\ \\therefore & v_{1}=\\sqrt{v_{1t}^{2}+v_{1n}^{2}}=u\\sin\\theta=u\\sin30^{\\circ}=u/2 \\\\ & v_{2}=\\sqrt{v_{2t}^{2}+v_{2n}^{2}}=u\\cos\\theta=u\\cos30^{\\circ}=\\sqrt{3}\\,u/2 \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-27" num="27">
    <P2>In the previous illustration, if disc {"$A$"} is moving with velocity {"$u_{1}$"} towards right and disc {"$B$"} is moving with velocity {"$u_{2}$"} towards right such that {"$u_{1}>u_{2}$"}, find velocities of the discs after the impact if all other things remain the same.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>It is convenient to solve the problem in the frame of disc {"$B$"} so that in this frame, disc {"$B$"} is at rest before collision. The problem now becomes the same as the previous one. In the frame of disc {"$B$"}, disc {"$A$"} strikes it with velocity</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$u=u_{1}-u_{2}$$"}
    </div>
    <P2>In this frame,</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & v_{1}=u/2=(u_{1}-u_{2})/2 \\text{ along the tangent and} \\\\ & v_{2}=\\sqrt{3}\\,u/2=\\sqrt{3}(u_{1}-u_{2})/2 \\text{ along the normal.} \\end{aligned}$$"}
    </div>
    <P2>In ground frame, we add {"$u_{2}$"} towards right to the above velocities to obtain final velocities {"$v_{A}$"} and {"$v_{B}$"}.</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} v_{A} & =\\sqrt{v_{1}^{2}+u_{2}^{2}+2v_{1}u_{2}\\cos60^{\\circ}} \\\\ & =\\sqrt{\\left(\\frac{u_{1}-u_{2}}{2}\\right)^{2}+u_{2}^{2}+2\\times\\frac{u_{1}-u_{2}}{2}\\times u_{2}\\times\\frac{1}{2}} \\\\ \\therefore & \\; v_{A}=\\frac{1}{2}\\sqrt{u_{1}^{2}+3u_{2}^{2}} \\\\ & v_{B}=\\sqrt{v_{2}^{2}+u_{2}^{2}+2v_{2}u_{2}\\cos30^{\\circ}} \\\\ & =\\sqrt{\\left(\\frac{\\sqrt{3}(u_{1}-u_{2})}{2}\\right)^{2}+u_{2}^{2}+2\\times\\frac{\\sqrt{3}(u_{1}-u_{2})}{2}\\times u_{2}\\times\\frac{\\sqrt{3}}{2}} \\\\ \\therefore & \\; v_{B}=\\frac{1}{2}\\sqrt{3u_{1}^{2}+u_{2}^{2}} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <SubHd key="sub-elastic2dspecial" id="elastic2dspecial" title="Special case of elastic collision in two dimension" />,
  <p key="b3-p-e2ds-1" style={{ textIndent: 28, textAlign: "justify" }}>
    If two bodies of equal masses suffer an oblique collision with one of the bodies initially at rest, the two bodies after collision move perpendicular to each other.
  </p>,

  <IllustrationBox key="ill-28" num="28">
    <P2>A ball moving with a velocity of 50 cm/s on a frictionless horizontal plane hits an identical ball at rest. If the collision is elastic, calculate the speed imparted to the target ball, if the speed of the incident ball is 30 cm/s after the collision. Show that the two balls move at right angles to each other after the collision.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>From momentum conservation, we have</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$m\\vec{u}=m\\overrightarrow{v_{1}}+m\\overrightarrow{v_{2}} \\quad \\Rightarrow \\vec{u}=\\overrightarrow{v_{1}}+\\overrightarrow{v_{2}} \\tag{1}$$"}
    </div>
    <P2>From energy conservation, we have</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\frac{1}{2}mu^{2}=\\frac{1}{2}mv_{1}^{2}+\\frac{1}{2}mv_{2}^{2} \\Rightarrow u^{2}=v_{1}^{2}+v_{2}^{2} \\tag{2}$$"}
    </div>
    <P2>Squaring each side of eqn. (1), leads to</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$u^{2}=v_{1}^{2}+v_{2}^{2}+2\\overrightarrow{v_{1}}\\cdot\\overrightarrow{v_{2}} \\tag{3}$$"}
    </div>
    <P2>From eqn. (2) and eqn. (3), we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\overrightarrow{v_{1}}\\cdot\\overrightarrow{v_{2}}=0$$"}
    </div>
    <P2>which means that their velocities are perpendicular.</P2>
    <P2>The speed {"$v_{2}$"} of the target ball from eqn. (2) is</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{2}=\\sqrt{u^{2}-v_{1}^{2}}=\\sqrt{50^{2}-30^{2}}=40\\text{ cm/s}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-29" num="29">
    <P2>A ball moving with a speed of 9 m/s strikes an identical ball (at rest) such that after the collision, the direction of each ball makes an angle of {"$30^{\\circ}$"} with the original line of motion.</P2>
    <P2>(a) Find the speed of the balls after the collision.</P2>
    <P2>(b) Is kinetic energy conserved in the collision?</P2>
    <Fig key="fig-1-35" src={CONTENT_IMAGES.CONTENT_IMAGE_31EE9DCF20A35621A9E5} num="Fig. 1.35" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Choose {"$X$"}-axis along the direction of {"$\\vec{u}$"} and {"$Y$"}-axis perpendicular to its direction.</P2>
    <P2>(a) Applying conservation of linear momentum along {"$X$"} and {"$Y$"}-axis, we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$mu=mv_{1}\\cos30^{\\circ}+mv_{2}\\cos30^{\\circ} \\tag{1}$$"}
    </div>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\text{and} \\quad 0=mv_{1}\\sin30^{\\circ}-mv_{2}\\sin30^{\\circ} \\tag{2}$$"}
    </div>
    <P2>On putting {"$u=9$"} m/s and solving eqn. (1) and eqn. (2), we get {"$\\quad v_{1}=v_{2}=3\\sqrt{3}$"} m/s</P2>
    <P2>(b) Let {"$K_{1}$"} and {"$K_{2}$"} be the kinetic energy before and after the collision.</P2>
    <P2>Then, {"$K_{1}=\\frac{1}{2}mu^{2}+0=\\frac{1}{2}m\\times9^{2}=40 \\cdot 5\\,m$"}</P2>
    <P2>and {"$K_{2}=\\frac{1}{2}mv_{1}^{2}+\\frac{1}{2}mv_{2}^{2}=\\frac{1}{2}m(3\\sqrt{3})^{2}\\times2=27\\,m$"}</P2>
    <P2>Since, {"$K_{2}<K_{1}$"}, kinetic energy of the system is not conserved.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-30" num="30">
    <P2>A ball moving translationally collides elastically with another stationary ball of same mass. At the moment of impact, the angle between the straight line passing through the centres of balls and direction of initial velocity of the striking ball is equal to {"$\\alpha=45^{\\circ}$"}. Assuming the balls to be smooth, find the fraction {"$\\eta$"} of the kinetic energy of the striking ball that turned into potential energy at the moment of maximum deformation.</P2>
    <Fig key="fig-1-36" src={CONTENT_IMAGES.CONTENT_IMAGE_8BB98708DF5B138C3789} num="Fig. 1.36" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Choose {"$X$–$Y$"} axis as shown in the figure. At the moment of maximum deformation, the distance between the centres of the ball will be minimum and the velocities of the two balls along {"$X$"}-axis will be same.</P2>
    <P2>{"$\\therefore\\; v_{1x}=v_{2x}$"}</P2>
    <P2>Applying momentum conservation along {"$X$"}-axis, we get {"$\\;mu\\cos\\alpha=mv_{1x}+mv_{2x}$"}</P2>
    <P2>{"$\\Rightarrow u\\cos\\alpha=2v_{1x}$"} &nbsp;&nbsp; or &nbsp;&nbsp; {"$v_{1x}=v_{2x}=\\dfrac{u\\cos\\alpha}{2}$"}</P2>
    <P2>Since, impulsive force between the two balls do not act along {"$Y$"}-axis,</P2>
    <P2>{"$v_{1y}=u_{1y}=u\\sin\\alpha$"} &nbsp;&nbsp; and &nbsp;&nbsp; {"$v_{2y}=u_{2y}=0$"}</P2>
    <P2>Initial kinetic energy {"$=\\frac{1}{2}mu^{2}$"}</P2>
    <P2>Final kinetic energy</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$=\\frac{1}{2}mv_{1x}^{2}+\\frac{1}{2}mv_{1y}^{2}+\\frac{1}{2}mv_{2x}^{2}+\\frac{1}{2}mv_{2y}^{2}=\\frac{mu^{2}\\cos^{2}\\alpha}{8}+\\frac{mu^{2}\\sin^{2}\\alpha}{2}+\\frac{mu^{2}\\cos^{2}\\alpha}{8}+0=\\frac{3}{8}mu^{2}$$"}
    </div>
    <P2>Loss in kinetic energy</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$=\\frac{1}{2}mu^{2}-\\frac{3}{8}mu^{2}=\\frac{1}{4}\\times\\frac{1}{2}mu^{2}=\\text{gain in potential energy.}$$"}
    </div>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\therefore \\quad \\eta=\\frac{\\text{Loss in kinetic energy}}{\\text{initial kinetic energy}}=\\frac{1}{4}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-31" num="31">
    <P2>A body of mass {"$m$"} moving with velocity {"$\\boldsymbol{v}_{\\mathbf{1}}$"} in the {"$\\boldsymbol{X}$"}-direction collides with another body of mass {"$M$"} moving in {"$Y$"}-direction with velocity {"$v_{2}$"}. They coalesce into one body during collision. Calculate</P2>
    <P2>(a) the direction and magnitude of the momentum of the final body.</P2>
    <P2>(b) the fraction of initial KE transformed into heat during collision in terms of two masses.</P2>
    <Fig key="fig-1-37" src={CONTENT_IMAGES.CONTENT_IMAGE_3F055EC0F351D2DD0DD1} num="Fig. 1.37" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>(a) Conserving momentum before and after collision, we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} & mv_{1}\\hat{i}+Mv_{2}\\hat{j}=(M+m)\\vec{v} \\qquad\\text{...(1)} \\\\ & \\therefore\\;|\\vec{p}|=\\sqrt{(mv_{1})^{2}+(Mv_{2})^{2}} \\end{aligned}$$"}
    </div>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\tan\\theta=\\frac{Mv_{2}}{mv_{1}} \\quad \\therefore \\quad \\theta=\\tan^{-1}\\!\\left(\\frac{Mv_{2}}{mv_{1}}\\right)$$"}
    </div>
    <P2>From eqn. (1), {"$\\vec{v}=\\dfrac{mv_{1}}{M+m}\\hat{i}+\\dfrac{Mv_{2}}{M+m}\\hat{j}$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow|\\vec{v}|=\\sqrt{\\left(\\frac{mv_{1}}{M+m}\\right)^{2}+\\left(\\frac{Mv_{2}}{M+m}\\right)^{2}}=\\frac{\\sqrt{(mv_{1})^{2}+(Mv_{2})^{2}}}{M+m}$$"}
    </div>
    <P2>(b) Initial kinetic energy {"$=K_{i}=\\frac{1}{2}mv_{1}^{2}+\\frac{1}{2}Mv_{2}^{2}$"}</P2>
    <P2>Loss in kinetic energy</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$=K_{i}-K_{f}=\\left[\\frac{1}{2}mv_{1}^{2}+\\frac{1}{2}Mv_{2}^{2}\\right]-\\frac{1}{2}(M+m)\\frac{(mv_{1})^{2}+(Mv_{2})^{2}}{(M+m)^{2}}=\\frac{Mm(v_{1}^{2}+v_{2}^{2})}{2(M+m)}$$"}
    </div>
    <P2>Fraction of energy changed into heat</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$=\\frac{\\text{Loss in KE}}{\\text{Initial KE}}=\\frac{Mm}{M+m}\\left(\\frac{v_{1}^{2}+v_{2}^{2}}{mv_{1}^{2}+Mv_{2}^{2}}\\right)$$"}
    </div>
  </IllustrationBox>,

  <SecHd key="sec-s112" id="s112" label="1.12" title="Coefficient of Restitution (e) in Oblique Collision" />,
  <p key="b3-p-s112-1" style={{ textIndent: 28, textAlign: "justify" }}>
    Consider two particles of masses {"$m_{1}$"} and {"$m_{2}$"} moving with velocities {"$u_{1}$"} and {"$u_{2}$"} respectively collide such that the line of contact is along {"$X$"}-axis. Then the impulsive forces of deformation and restitution act only in the {"$X$"}-direction.
  </p>,
  <Fig key="fig-1-38" src={CONTENT_IMAGES.CONTENT_IMAGE_48DA9FD0AC5D0EDB829F} num="Fig. 1.38" />,
  <p key="b3-p-s112-2" style={{ textIndent: 28, textAlign: "justify" }}>
    Let {"$v_{1}$"} and {"$v_{2}$"} be respectively the velocities of these particles after collision and the components of these four velocity vectors be {"$u_{1x}, u_{2x}, v_{1x}$"} and {"$v_{2x}$"}. The coefficient of restitution is given by
  </p>,
  <div key="b3-math-3" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$e=\\frac{v_{2x}-v_{1x}}{u_{1x}-u_{2x}}$$"}
  </div>,

  <SubHd key="sub-obliqueconstrained" id="obliqueconstrained" title="Oblique Collision when one or both colliding bodies are constrained in motion" />,
  <p key="b3-p-oc-1" style={{ textIndent: 28, textAlign: "justify" }}>
    In oblique collision, we have discussed how to analyze impact of bodies that were free to move before as well as after the impact. Now we will see what happens if one or both the bodies undergoing oblique collision are constrained in motion. In such a situation, we observe/analyze the following.
  </p>,
  <p key="b3-p-oc-2" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Component of velocity along tangent.</strong> If surfaces of the bodies undergoing collision are smooth, the component of velocity along the tangent of the body that is free to move before and after the collision remain conserved. So, if body 1 is free to move before and after the collision, then
  </p>,
  <div key="b3-math-4" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$v_{1t}=u_{1t}$$"}
  </div>,
  <p key="b3-p-oc-3" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Component of velocity along normal (line of impact).</strong> The concept of coefficient of restitution {"$e$"} is applicable to the component of velocity along the normal even if one or both bodies are constrained to move in some particular direction only. So we have
  </p>,
  <div key="b3-math-5" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$v_{2n}-v_{1n}=e(u_{1n}-u_{2n})$$"}
  </div>,
  <p key="b3-p-oc-4" style={{ textIndent: 28, textAlign: "justify" }}>
    <strong>Momentum Conservation.</strong> We may find a direction in which no external force acts on both the bodies. The component of total momentum of both the bodies along this direction remains conserved.
  </p>,

  <IllustrationBox key="ill-32" num="32">
    <P2>A 250 g ball moving horizontally with velocity 10.0 m/s strikes inclined surface of a 720 g smooth wedge as shown in the fig. 1.39. The wedge is placed at rest on a frictionless horizontal ground. If the coefficient of restitution is {"$0 \\cdot 8$"}, calculate the velocity of the wedge after the impact.</P2>
    <Fig key="fig-1-39" src={CONTENT_IMAGES.CONTENT_IMAGE_6BE44EE8971EB9122816} num="Fig. 1.39" />
    <Fig key="fig-1-40" src={CONTENT_IMAGES.CONTENT_IMAGE_05B4CE1064EFDE1B2F0B} num="Fig. 1.40" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>As the wedge is smooth and the ball is free to move, the velocity of ball along the tangent does not change.</P2>
    <P2>{"$\\Rightarrow v_{t}=u\\cos\\theta=10\\cos37^{\\circ}=8$"} ms{"$^{-1}$"}</P2>
    <P2>As there is no external force on the system in horizontal direction, the momentum in this direction is conserved.</P2>
    <P2>{"$\\Rightarrow \\quad mu=mv_{t}\\cos\\theta+mv_{n}\\sin\\theta+Mv$"}</P2>
    <P2>{"$\\Rightarrow 0.25 \\times 10=0.25 \\times 8\\cos37^{\\circ}+0.25v_{n}\\sin37^{\\circ}+0.72v$"}</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow\\; 5v_{n}+24v=30 \\tag{1}$$"}
    </div>
    <P2>Along normal, {"$v_{2}-v_{1}=e(u_{1}-u_{2})$"}</P2>
    <P2>{"$\\Rightarrow v\\sin\\theta-v_{n}=0.8(u\\sin\\theta-0)$"}</P2>
    <P2>{"$\\Rightarrow v\\sin37^{\\circ}-v_{n}=0.8 \\times 10 \\times \\sin37^{\\circ}$"}</P2>
    <div style={{ textAlign: "center", margin: "10px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow\\; 3v-5v_{n}=24 \\tag{2}$$"}
    </div>
    <P2>From (1) and (2), {"$v=2$"} ms{"$^{-1}$"}</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-33" num="33">
    <P2>A ball of mass {"$m$"} hits a floor with a speed {"$u$"} making an angle of incidence {"$\\alpha$"} with the normal. The coefficient of restitution is {"$e$"}. Find the speed of the reflected ball and the angle of reflection of the ball.</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, {"$u_{1x}=u\\sin\\alpha$"} and {"$u_{1y}=-u\\cos\\alpha$"}. Since, there is no impulse along {"$X$"}-axis,</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1x}=u_{1x} \\quad \\Rightarrow v\\sin\\beta=u\\sin\\alpha \\tag{1}$$"}
    </div>
    <Fig key="fig-1-41" src={CONTENT_IMAGES.CONTENT_IMAGE_E4A00626D7D1407454EE} num="Fig. 1.41" />
    <P2>Since, the floor is at rest and has a large mass,</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v_{1y}=-eu_{1y} \\quad \\Rightarrow v\\cos\\beta=eu\\cos\\alpha \\tag{2}$$"}
    </div>
    <P2>From equations (1) and (2),</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$v=\\sqrt{(u\\sin\\alpha)^{2}+(eu\\cos\\alpha)^{2}} \\quad \\text{and} \\quad \\tan\\beta=\\frac{\\tan\\alpha}{e}$$"}
    </div>
  </IllustrationBox>,

  <SecHd key="sec-s113" id="s113" label="1.13" title="Explosion" />,
  <p key="b3-p-s113-1" style={{ textIndent: 28, textAlign: "justify" }}>
    When explosion takes, the total momentum of the system under consideration remains constant. The reason for this is that impulsive forces of explosion are internal forces. The momentum can change only when external forces act.
  </p>,
  <p key="b3-p-s113-2" style={{ textIndent: 28, textAlign: "justify" }}>
    The internal chemical energy stored in the system is converted to kinetic energy. In a way, explosion is the reverse process of completely inelastic collision. In this case, mechanical energy of the system increases.
  </p>,

  <IllustrationBox key="ill-34" num="34">
    <P2>A body of mass 1 kg initially at rest explodes and breaks into three fragments of masses in the ratio {"$1:1:3$"}. The two pieces of equal mass fly off perpendicular to each other with a speed of 30 m/s. What is the magnitude of velocity of the heavier fragment?</P2>
    <Fig key="fig-1-42" src={CONTENT_IMAGES.CONTENT_IMAGE_90E6D3BFE5CC78AE32F7} num="Fig. 1.42" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let the masses of the three fragments be {"$m$"}, {"$m$"} and {"$3m$"} and their velocities be {"$\\vec{v}_{1}, \\vec{v}_{2}$"} and {"$\\vec{v}_{3}$"} respectively. Let {"$X$"} and {"$Y$"} axis point in the directions of {"$\\overrightarrow{v_{1}}$"} and {"$\\overrightarrow{v_{2}}$"}.</P2>
    <P2>Here, {"$\\vec{v}_{1}=30\\hat{i}$"} m/s and {"$\\vec{v}_{2}=30\\hat{j}$"} m/s</P2>
    <P2>Conserving momentum before and after explosion, we get</P2>
    <P2>{"$m \\times 30\\hat{i}+m \\times 30\\hat{j}+3m \\times \\vec{v}_{3}=0$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow \\overrightarrow{v_{3}}=-10\\hat{i}-10\\hat{j} \\quad \\therefore \\quad |\\overrightarrow{v_{3}}|=10\\sqrt{2}\\text{ m/s}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-35" num="35">
    <P2>A projectile of mass 50 kg is shot vertically upwards with an initial velocity of <strong>100 m/s</strong>. After 5 seconds, it explodes into two fragments, one of which having mass of 20 kg travel vertically up with velocity of 150 m/s.</P2>
    <P2>(Take {"$\\boldsymbol{g}=\\mathbf{10}$"} ms{"$^{\\mathbf{-2}}$"})</P2>
    <P2>(a) What is the velocity of the other fragment?</P2>
    <P2>(b) Calculate the momenta of the two fragments, 3 seconds after the explosion.</P2>
    <P2>(c) What would have been momentum of the projectile, if there had been no explosion?</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let us choose the vertical upward direction as the positive direction.</P2>
    <P2>(a) The velocity of the projectile after 5 sec,</P2>
    <P2>{"$v=u-gt=100-10 \\times 5=50$"} m/s</P2>
    <P2>Let {"$v_{0}=$"} Velocity of other fragment. Conserving momentum during explosion, we get</P2>
    <P2>{"$50 \\times 50=20 \\times 150+30v_{0}$"}</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\Rightarrow \\quad v_{0}=\\frac{2500-3000}{30}=-16 \\cdot 7\\text{ m/s}$$"}
    </div>
    <P2>The negative sign indicates that it moves vertically downward.</P2>
    <P2>(b) Let {"$v_{1}$"} and {"$v_{2}$"} be the velocities of the fragments after 3 seconds.</P2>
    <P2>Then, {"$v_{1}=150-10 \\times 3=120$"} m/s</P2>
    <P2>and {"$v_{2}=-16 \\cdot 7-10 \\times 3=-46 \\cdot 7$"} m/s</P2>
    <P2>Total momentum of the fragments 3 seconds after the explosion</P2>
    <P2>{"$=20 \\times 120-30 \\times 46 \\cdot 7=1000$"} kg m/s</P2>
    <P2>(c) Had there been no explosion, the velocity of projectile after 3 seconds will be</P2>
    <P2>{"$v=50-10 \\times 3=20$"} m/s</P2>
    <P2>and momentum {"$=50 \\times 20=1000$"} kg m/s</P2>
    <P2><strong>Note.</strong> Both the answers are equal, since the external force on the system in both cases will be {"$(m_{1}+m_{2})g$"}.</P2>
  </IllustrationBox>,

  <SecHd key="sec-s114" id="s114" label="1.14" title="System of Variable Mass" />,
  <p key="b3-p-s114-1" style={{ textIndent: 28, textAlign: "justify" }}>
    We have so far dealt with the system whose mass remains constant. We shall now consider systems whose mass is variable. Some of the examples of variable mass system are
  </p>,
  <p key="b3-p-s114-2" style={{ textAlign: "justify" }}>
    (i) A rocket ejecting out fuel gases with constant velocity.
  </p>,
  <p key="b3-p-s114-3" style={{ textAlign: "justify" }}>
    (ii) A chain falling under gravity on a horizontal floor in which mass of the chain on the floor keeps on increasing.
  </p>,
  <p key="b3-p-s114-4" style={{ textAlign: "justify" }}>
    (iii) Sand from a stationary hopper falling on a moving trolley.
  </p>,
  <p key="b3-p-s114-5" style={{ textAlign: "justify" }}>
    (iv) Sand leaking out of a trolley moving with constant velocity.
  </p>,
  <p key="b3-p-s114-6" style={{ textIndent: 28, textAlign: "justify" }}>
    As per Newton's second law of motion, the net external force acting on the system is equal to the rate of change in its momentum, i.e.,
  </p>,
  <div key="b3-math-6" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\vec{F}_{\\mathrm{ext}}=\\frac{d\\vec{p}}{dt}=\\frac{d(m\\vec{v})}{dt}=m\\frac{d\\vec{v}}{dt}+\\vec{v}\\frac{dm}{dt}=m\\vec{a}+\\vec{v}\\frac{dm}{dt}$$"}
  </div>,
  <p key="b3-p-s114-7" style={{ textIndent: 28, textAlign: "justify" }}>
    We write this expression as
  </p>,
  <div key="b3-math-7" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\vec{F}_{\\mathrm{ext}}=m\\vec{a}+\\vec{v}_{\\mathrm{incr}}\\frac{dm}{dt}$$"}
  </div>,
  <p key="b3-p-s114-8" style={{ textIndent: 28, textAlign: "justify" }}>
    In variable mass problems, we need to consider the term {"$\\vec{v}_{\\text{incr}}\\dfrac{dm}{dt}$"} in addition to the term {"$m\\vec{a}$"} that we used to consider so far. Here, {"$\\dfrac{dm}{dt}$"} is the rate at which mass is being added to the system and {"$\\vec{v}_{\\text{incr}}$"} is the increase in velocity of the mass that is being added.
  </p>,
  <p key="b3-p-s114-9" style={{ textIndent: 28, textAlign: "justify" }}>
    If {"$\\quad \\vec{v}=$"} velocity of system, {"$\\quad \\overrightarrow{v'}=$"} velocity of incoming mass
  </p>,
  <p key="b3-p-s114-10" style={{ textAlign: "justify" }}>
    Then, {"$\\quad \\vec{v}_{\\text{incr}}=\\vec{v}-\\vec{v}'$"}
  </p>,
  <p key="b3-p-s114-11" style={{ textIndent: 28, textAlign: "justify" }}>
    If we define a term {"$\\vec{v}_{\\text{rel}}$"} as the relative velocity of incoming mass with respect to the velocity of the system given by {"$\\vec{v}_{\\text{rel}}=\\vec{v}'-\\vec{v}$"}, then {"$\\vec{v}_{\\text{rel}}=-\\vec{v}_{\\text{incr}}$"} and the equation written above can be written as
  </p>,
  <div key="b3-math-8" style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {"$$\\vec{F}_{\\mathrm{ext}}=m\\vec{a}-\\vec{v}_{\\mathrm{rel}}\\frac{dm}{dt} \\quad \\text{or} \\quad \\vec{F}_{\\mathrm{ext}}+\\vec{v}_{\\mathrm{rel}}\\frac{dm}{dt}=m\\vec{a}$$"}
  </div>,
  <p key="b3-p-s114-12" style={{ textAlign: "justify" }}>
    or {"$\\vec{F}_{\\text{ext}}+\\vec{F}_{\\text{th}}=m\\vec{a}$"}
  </p>,
  <p key="b3-p-s114-13" style={{ textIndent: 28, textAlign: "justify" }}>
    where, {"$\\vec{F}_{\\mathrm{th}}=v_{\\text{rel}}\\dfrac{dm}{dt}$"} is the thrust force exerted on the system by the incoming mass.
  </p>,
  <p key="b3-p-s114-14" style={{ textIndent: 28, textAlign: "justify" }}>
    Note that {"$\\dfrac{dm}{dt}>0$"} if mass enters the system and {"$\\quad \\dfrac{dm}{dt}<0$"} if mass leaves the system.
  </p>,

  <IllustrationBox key="ill-36" num="36">
    <P2>A rocket of initial mass {"$\\boldsymbol{m}_{\\mathbf{0}}$"}, burns fuel at a rate of {"$\\boldsymbol{\\mu}$"} kg/s and exhausts gas at a relative speed of {"$\\boldsymbol{v}_{\\boldsymbol{ex}}$"} in free space. Find the thrust of the rocket and its speed when its mass reduces to {"$\\boldsymbol{m}_{\\mathbf{0}}/\\mathbf{2}$"}. (Assuming its initial velocity to be zero)</P2>
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Here, {"$\\dfrac{dm}{dt}=-\\mu$"} and {"$v_{\\text{rel}}=-v_{ex}$"}</P2>
    <P2>{"$\\therefore \\quad F_{\\text{th}}=\\dfrac{dm}{dt}\\,v_{\\text{rel}}=-\\dfrac{dm}{dt}\\,v_{\\text{ex}}=\\mu v_{\\text{ex}}$"}</P2>
    <Fig key="fig-1-43" src={CONTENT_IMAGES.CONTENT_IMAGE_A24E68702D5B182A18C7} num="Fig. 1.43" />
    <P2>Since, {"$F_{\\mathrm{th}}>0$"}, it accelerated the rocket forward.</P2>
    <P2>In free space, {"$F_{\\text{ext}}=0$"} and from Newton's second law, we get</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} m\\frac{dv}{dt} & =-\\frac{dm}{dt}\\,v_{\\mathrm{ex}} \\quad \\text{or} \\quad \\int_{0}^{v}dv=-v_{\\mathrm{ex}}\\int_{m_{0}}^{m_{0}/2}\\frac{dm}{m} \\\\ \\therefore \\quad v & =-v_{\\mathrm{ex}}\\left[\\ln(m_{0}/2)-\\ln(m_{0})\\right] \\\\ & =-v_{\\mathrm{ex}}\\ln\\left(\\frac{1}{2}\\right)=v_{\\mathrm{ex}}\\ln2=0.693\\,v_{\\mathrm{ex}} \\end{aligned}$$"}
    </div>
  </IllustrationBox>,

  <IllustrationBox key="ill-37" num="37">
    <P2>A chain of mass {"$M$"} and length {"$L$"} touches the surface of a table by its lower end. When released, it starts piling on the table. Find the force exerted on the table by the falling part of the chain when upper end of the chain has fallen through distance {"$x$"} (see fig. 1.44).</P2>
    <Fig key="fig-1-44" src={CONTENT_IMAGES.CONTENT_IMAGE_F52A8B853760DF299767} num="Fig. 1.44" />
    <p style={{ fontWeight: 700, color: P_COLOR, margin: "10px 0 6px" }}>SOLUTION.</p>
    <P2>Let {"$v$"} be the velocity of chain when it has fallen through a distance {"$x$"}.</P2>
    <P2>Then its velocity, {"$v=\\sqrt{2gx}$"}</P2>
    <P2>Taking the system as the part of chain that has already fallen, its mass,</P2>
    <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
      {"$$\\begin{aligned} m & =\\frac{M}{L}x \\quad \\text{and} \\quad v_{\\text{rel}}=(v-0)=v \\\\ \\Rightarrow \\frac{dm}{dt} & =\\frac{d}{dt}\\!\\left(\\frac{M}{L}x\\right)=\\frac{M}{L}\\frac{dx}{dt}=\\frac{M}{L}v \\\\ \\therefore & \\; F_{\\text{th}}=v_{\\text{rel}}\\frac{dm}{dt}=\\frac{M}{L}v^{2}=\\frac{M}{L}(2gx)=2\\left(\\frac{Mx}{L}\\right)g \\end{aligned}$$"}
    </div>
    <P2>Note that this is twice the weight of the part already resting on the table.</P2>
  </IllustrationBox>,
];

// ── TOC ─────────────────────────────────────────────────────
const TOC = [
  { id: "fe", title: "Foundation Essentials", level: 1 },
  { id: "s10", title: "System of Particles", level: 1, label: "1.0" },
  { id: "s11", title: "Centre of Mass", level: 1, label: "1.1" },
  { id: "com2p", title: "Position of CoM — Two Particle System", level: 2 },
  { id: "comnp", title: "Position of CoM — n Particle System", level: 2 },
  { id: "vcm", title: "Velocity of Centre of Mass", level: 2 },
  { id: "acm", title: "Acceleration of Centre of Mass", level: 2 },
  { id: "s12", title: "CoM of Extended Body", level: 1, label: "1.2" },
  { id: "s13", title: "Linear Momentum and Conservation", level: 1, label: "1.3" },
  { id: "s14", title: "Kinetic Energy of a System", level: 1, label: "1.4" },
  { id: "s15", title: "Impulse", level: 1, label: "1.5" },
  { id: "s16", title: "Collisions", level: 1, label: "1.6" },
  { id: "s17", title: "Coefficient of Restitution", level: 1, label: "1.7" },
  { id: "collsummary", title: "Summary of Collisions", level: 2 },
  { id: "s18", title: "Elastic Collision in One Dimension", level: 1, label: "1.8" },
  { id: "s19", title: "Perfectly Inelastic Collision", level: 1, label: "1.9" },
  { id: "s110", title: "Special Cases", level: 1, label: "1.10" },
  { id: "s111", title: "Elastic Collision in Two Dimensions", level: 1, label: "1.11" },
  { id: "elastic2dspecial", title: "Special Case — Equal Mass Oblique", level: 2 },
  { id: "s112", title: "Coefficient of Restitution in Oblique Collision", level: 1, label: "1.12" },
  { id: "obliqueconstrained", title: "Oblique Collision — Constrained Bodies", level: 2 },
  { id: "s113", title: "Explosion", level: 1, label: "1.13" },
  { id: "s114", title: "System of Variable Mass", level: 1, label: "1.14" },
];

const allContent = [...content_b1, ...content_b2, ...content_b3];

export default function Chapter1() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div style={{
      background: "#fff", minHeight: "100vh", overflowX: "hidden",
      fontFamily: "'Lora',Georgia,serif",
      fontSize: 17, lineHeight: 1.58, color: "#1a1a1a",
    }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)", overflowX: "hidden" }}>
        <ChapterCover />
        {allContent}
      </div>
    </div>
  );
}
