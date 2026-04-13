"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

const P_COLOR = "#8b0a4e";
const LIGHT_P = "#f9eef4";
const chapterNumber = "2";
const chapterTitle = "ROTATION MOTION AND ANGULAR MOMENTUM";

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
    st.textContent = ".katex { font-size: 18px; } .katex-display .katex { font-size: 1em; } .katex .mathnormal, .katex .mathit { font-family: 'Times New Roman', Times, serif !important; } ol { list-style-type: decimal; padding-left: 24px; }";
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
  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", lineHeight: 1.25, margin: "0 3px", fontSize: "0.95em" }}>
    <span style={{ borderBottom: "1.5px solid #1a1a1a", padding: "0 4px 1px", textAlign: "center", whiteSpace: "nowrap" }}>{n}</span>
    <span style={{ padding: "1px 4px 0", textAlign: "center", whiteSpace: "nowrap" }}>{d}</span>
  </span>
);

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14, fontWeight: 800, color: P_COLOR, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
      {label ? `${label}. ` : ""}{title}
    </h2>
    <div style={{ borderTop: "1.5px solid #8b0a4e", marginTop: 4 }} />
  </div>
);
const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14, fontWeight: 700, color: P_COLOR, margin: "16px 0 8px" }}>
    {label ? `${label}. ` : ""}{title}
  </h3>
);
const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5, fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>
    {label ? `${label}. ` : ""}{title}
  </h4>
);
const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 11px", textAlign: "justify", ...style }}>{children}</p>
);
const DM = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {children}
  </div>
);
const DefBox = ({ children }) => (
  <div style={{ border: "1.5px solid #888", padding: "10px 16px", margin: "12px 0", fontStyle: "italic", background: "#fafafa", fontSize: "16px", lineHeight: 1.65 }}>
    {children}
  </div>
);
const GraspGripBox = ({ children }) => (
  <div style={{ border: "1.5px solid #ccc", margin: "18px 0", background: "#fdf8ee" }}>
    <div style={{ textAlign: "center", padding: "10px 16px 4px" }}>
      <span style={{ fontFamily: "'Lora',Georgia,serif", fontWeight: 700, fontStyle: "italic", fontSize: 18, color: P_COLOR, letterSpacing: 0.5 }}>Grasp &amp; Grip</span>
    </div>
    <div style={{ padding: "4px 18px 14px" }}>{children}</div>
  </div>
);
const IllustrationBox = ({ num, title, children }) => (
  <div style={{ margin: "20px 0", border: "1.5px solid #8b0a4e" }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 14px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 12, letterSpacing: 1 }}>
      ILLUSTRATION {num}{title ? ` — ${title}` : ""}
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);
const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "20px auto", textAlign: "center", maxWidth: "90%" }}>
    <img src={src} alt={caption || num || "figure"} style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd", display: "block", margin: "0 auto" }}
      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center", border: "1.5px dashed #8b0a4e", background: "#f9eef4", minHeight: 80, padding: "12px 20px", color: P_COLOR, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{ marginLeft: 6 }}>{src}</code>
    </div>
    {(num || caption) && (
      <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic", margin: "6px auto 0", maxWidth: 480, lineHeight: 1.45 }}>
        {num && <strong style={{ color: P_COLOR, fontStyle: "normal" }}>{num}. </strong>}{caption}
      </p>
    )}
  </div>
);

function HamburgerBtn({ open, setOpen }) {
  const bar = { width: 20, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.25s" };
  return (
    <button onClick={() => setOpen(o => !o)} style={{ position: "fixed", top: 14, left: 14, zIndex: 1100, background: P_COLOR, border: "none", borderRadius: 4, width: 36, height: 36, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: 0 }}>
      <span style={{ ...bar, transform: open ? "translateY(7.5px) rotate(45deg)" : "none" }} />
      <span style={{ ...bar, opacity: open ? 0 : 1 }} />
      <span style={{ ...bar, transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
    </button>
  );
}
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return <div onClick={onClick} style={{ position: "fixed", inset: 0, zIndex: 1050, background: "rgba(0,0,0,0.35)", cursor: "pointer" }} />;
}
function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1080, width: open ? 260 : 0, height: "100vh", background: "#fff", borderRight: open ? "2px solid #e8c0d8" : "none", boxShadow: open ? "3px 0 16px rgba(139,10,78,0.10)" : "none", transition: "width 0.28s ease", overflowY: open ? "auto" : "hidden", overflowX: "hidden" }}>
      <div style={{ width: 260, padding: "56px 0 20px" }}>
        <div style={{ padding: "0 16px 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 12, color: P_COLOR, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1.5px solid #e8c0d8", marginBottom: 8 }}>Contents</div>
        <nav>
          {tocItems.map(item => (
            <div key={item.id} onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}
              onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", padding: item.level === 1 ? "6px 16px" : item.level === 2 ? "4px 24px" : "3px 32px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: item.level === 1 ? 700 : 400, fontSize: item.level === 1 ? 12 : 11, color: item.level === 1 ? P_COLOR : "#444", borderLeft: item.level === 1 ? "3px solid #8b0a4e" : "none", background: hovered === item.id ? "#f9eef4" : "transparent", marginBottom: 2, lineHeight: 1.4, whiteSpace: "nowrap" }}>
              {item.label && <span style={{ marginRight: 5 }}>{item.label}.</span>}{item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
const ChapterCover = () => (
  <div style={{ marginBottom: 0 }}>
    <div style={{ background: "linear-gradient(180deg, #7a4a7a 0%, #a06090 50%, #c8a0b8 100%)", height: 90 }} />
    <div style={{ background: "linear-gradient(180deg,#f5eedc 0%,#f0e8d0 100%)", padding: "32px 48px 40px", textAlign: "center" }}>
      <div style={{ display: "inline-block", textAlign: "center", marginBottom: 10 }}>
        <div style={{ border: "2px solid #b8a060", padding: "6px 32px 12px", background: "#fff", display: "inline-block" }}>
          <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 12, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>CHAPTER</div>
          <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 64, color: "#3a3a3a", lineHeight: 1 }}>{chapterNumber}</div>
        </div>
      </div>
      <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900, fontSize: 34, color: "#6e0d3a", letterSpacing: 2, textTransform: "uppercase", margin: "16px 0 0", lineHeight: 1.2 }}>{chapterTitle}</h1>
    </div>
    <div style={{ height: 4, background: "linear-gradient(90deg,#8b0a4e,#c0408a,#8b0a4e)" }} />
  </div>
);

const th = { border: "1.5px solid #555", padding: "6px 10px", textAlign: "center", fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13, background: "#f0f0f0" };
const td = { border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5 };
const tdc = { ...td, textAlign: "center" };

function MomentOfInertiaTable() {
  return (
    <div style={{ overflowX: "auto", margin: "16px 0" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 600 }}>
        <caption style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 13, color: P_COLOR, padding: "8px 0", captionSide: "top", textAlign: "center", letterSpacing: 1 }}>
          Moment of Inertia and Radius of Gyration of some bodies
        </caption>
        <thead>
          <tr>
            <th style={th}>Body</th>
            <th style={th}>Axis</th>
            <th style={th}>Figure</th>
            <th style={th}>Moment of Inertia</th>
            <th style={th}>Radius of Gyration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>Thin rod (Mass, {"$M$"} length, {"$L$"})</td>
            <td style={td}>Perpendicular to rod and Passing through centre</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_C00B754D198BAE44CC7D} alt="thin rod centre" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{ML^{2}}{12}$"}</td>
            <td style={tdc}>{"$\\dfrac{L}{\\sqrt{12}}$"}</td>
          </tr>
          <tr>
            <td style={td}>Thin rod (Mass, {"$M$"} length, {"$L$"})</td>
            <td style={td}>Perpendicular to rod and passing through its end</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_E14B68B96911143F4166} alt="thin rod end" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{ML^{2}}{3}$"}</td>
            <td style={tdc}>{"$\\dfrac{L}{\\sqrt{3}}$"}</td>
          </tr>
          <tr>
            <td style={td}>Thin circular ring (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Perpendicular to plane and passing through its centre</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_6E8F571AB929BB32A5FF} alt="ring perp" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$MR^{2}$"}</td>
            <td style={tdc}>{"$R$"}</td>
          </tr>
          <tr>
            <td style={td}>Thin circular ring (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Diameter</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_2E63D5575E8E3417DE6A} alt="ring diameter" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{MR^{2}}{2}$"}</td>
            <td style={tdc}>{"$\\dfrac{R}{\\sqrt{2}}$"}</td>
          </tr>
          <tr>
            <td style={td}>Thin circular disc (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Perpendicular to plane and passing through its centre</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_4971DACFA2730A253384} alt="disc perp" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{MR^{2}}{2}$"}</td>
            <td style={tdc}>{"$\\dfrac{R}{\\sqrt{2}}$"}</td>
          </tr>
          <tr>
            <td style={td}>Thin circular disc (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Diameter</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_5DA700022DCB9023520A} alt="disc diameter" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{MR^{2}}{4}$"}</td>
            <td style={tdc}>{"$\\dfrac{R}{2}$"}</td>
          </tr>
          <tr>
            <td style={td}>Hollow cylinder (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Axis</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_3C1A0695A945CD5C5614} alt="hollow cylinder" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$MR^{2}$"}</td>
            <td style={tdc}>{"$R$"}</td>
          </tr>
          <tr>
            <td style={td}>Solid cylinder (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Axis</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_C862B6B1D801BAE9555E} alt="solid cylinder" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{MR^{2}}{2}$"}</td>
            <td style={tdc}>{"$\\dfrac{R}{\\sqrt{2}}$"}</td>
          </tr>
          <tr>
            <td style={td}>Solid sphere (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Diameter</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_FBF32FD80DD1472233A4} alt="solid sphere" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{2}{5}MR^{2}$"}</td>
            <td style={tdc}>{"$\\sqrt{\\dfrac{2}{5}}\\,R$"}</td>
          </tr>
          <tr>
            <td style={td}>Thin Hollow sphere (Mass, {"$M$"} Radius, {"$R$"})</td>
            <td style={td}>Diameter</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_D87450D9FCA9EFA08CD8} alt="hollow sphere" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{2}{3}MR^{2}$"}</td>
            <td style={tdc}>{"$\\sqrt{\\dfrac{2}{3}}\\,R$"}</td>
          </tr>
          <tr>
            <td style={td}>Rectangular Sheet (Mass, {"$M$"} Length, {"$a$"} Width, {"$b$"})</td>
            <td style={td}>Perpendicular to plane passing through its centre</td>
            <td style={tdc}><img src={CONTENT_IMAGES.CONTENT_IMAGE_5FEEC87646BC2187B580} alt="rectangular sheet" style={{ maxWidth: 120, height: "auto" }} /></td>
            <td style={tdc}>{"$\\dfrac{M}{12}(a^{2}+b^{2})$"}</td>
            <td style={tdc}>{"$\\dfrac{\\sqrt{a^{2}+b^{2}}}{\\sqrt{12}}$"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const TOC = [
  { id: "fe", title: "Foundation Essentials", level: 1 },
  { id: "s21", label: "2.1", title: "Introduction", level: 1 },
  { id: "s22", label: "2.2", title: "Rotation about Fixed Axis", level: 1 },
  { id: "s23", label: "2.3", title: "Moment of Inertia", level: 1 },
  { id: "s24", label: "2.4", title: "Radius of Gyration", level: 1 },
  { id: "s25", label: "2.5", title: "Moment of Inertia of Some Bodies", level: 1 },
  { id: "s26", label: "2.6", title: "Parallel Axis Theorem", level: 1 },
  { id: "s27", label: "2.7", title: "Perpendicular Axis Theorem", level: 1 },
  { id: "s28", label: "2.8", title: "Kinetic Energy of Rotation", level: 1 },
  { id: "s29", label: "2.9", title: "Torque (Moment of a Force)", level: 1 },
  { id: "s210", label: "2.10", title: "Angular Momentum", level: 1 },
  { id: "s211", label: "2.11", title: "Laws of Rotational Motion", level: 1 },
  { id: "s212", label: "2.12", title: "Conservation of Angular Momentum", level: 1 },
  { id: "s213", label: "2.13", title: "Equilibrium of Rigid Bodies", level: 1 },
  { id: "s214", label: "2.14", title: "Combined Rotation and Translation", level: 1 },
  { id: "s215", label: "2.15", title: "Rolling", level: 1 },
  { id: "s216", label: "2.16", title: "Path of a Point on Cylinder During Rolling", level: 1 },
  { id: "s217", label: "2.17", title: "Acceleration of Cylinder on Inclined Plane", level: 1 },
  { id: "s218", label: "2.18", title: "Kinetic Energy During Rolling", level: 1 },
  { id: "s219", label: "2.19", title: "Velocity of Body Rolling on Inclined Plane", level: 1 },
  { id: "s220", label: "2.20", title: "Work Done by a Torque", level: 1 },
  { id: "s221", label: "2.21", title: "Velocity Due to Rotation About CM", level: 1 },
  { id: "s222", label: "2.22", title: "Angular Momentum Not Through CM", level: 1 },
  { id: "s223", label: "2.23", title: "Instantaneous Axis of Rotation (IAOR)", level: 1 },
  { id: "s224", label: "2.24", title: "Velocity and Acceleration: Two Points", level: 1 },
  { id: "s225", label: "2.25", title: "Impulsive Force and Impulsive Torque", level: 1 },
  { id: "s226", label: "2.26", title: "Toppling", level: 1 },
];

const content_b1 = (
  <>
    <div id="fe" style={{ marginTop: 24, marginBottom: 6 }}>
      <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 16, fontWeight: 800, color: P_COLOR, textAlign: "center", margin: 0, letterSpacing: 1 }}>Foundation Essentials</h2>
      <div style={{ borderTop: "1.5px solid #8b0a4e", marginTop: 6 }} />
    </div>

    {/* 2.1 INTRODUCTION */}
    <SecHd id="s21" label="2.1" title="Introduction" />
    <P2>Up till now, we have been dealing with the translational motion of rigid bodies. A rigid body however, can also rotate about an axis. In fact a rigid body can translate as well as rotate simultaneously. To understand the dynamics of rotational motion, we shall introduce some new terms such as Moment of Inertia, Angular Momentum, Torque, etc. as we go along in the chapter.</P2>

    {/* 2.2 ROTATION ABOUT FIXED AXIS */}
    <SecHd id="s22" label="2.2" title="Rotation About Fixed Axis of Rotation" />
    <P2>Let us now consider rotational motion of a rigid body about some fixed axis. (see fig. 2.1)</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_56B7FF0E2AFB5227677E} num="FIGURE 2.1" caption="Rigid body rotating about a fixed axis; particle P at distance r traces a circular path." />
    <P2>Let {"$P$"} represent any particle in the rigid body which is at a distance {"$r$"} from the axis of rotation. As the body rotates, this particle also rotates in a circle of radius {"$r$"} shown by dotted line.</P2>
    <P2>As the particle moves along the circle, its angular position changes. Let {"$\\theta$"} be its angular displacement. Its angular velocity {"$\\omega$"}, is given by</P2>
    <DM>{"$$\\omega=\\frac{d\\theta}{dt}$$"}</DM>
    <P2>Its angular acceleration, {"$\\alpha$"} is given by</P2>
    <DM>{"$$\\alpha=\\frac{d\\omega}{dt}$$"}</DM>
    <P2>The units of angular velocity {"$\\omega$"} are {"$\\mathrm{rad\\,s}^{-1}$"} and of angular acceleration {"$\\alpha$"} are {"$\\mathrm{rad\\,s}^{-2}$"}. If the rigid body has constant angular acceleration, we can derive the following formulae in direct analogy to translation motion.</P2>
    <DM>{"$$\\begin{aligned} & \\omega=\\omega_{0}+\\alpha t, \\\\ & \\theta=\\omega_{0}t+\\tfrac{1}{2}\\alpha t^{2}, \\\\ & \\omega^{2}-\\omega_{0}^{2}=2\\alpha\\theta \\end{aligned}$$"}</DM>
    <P2>where, {"$\\omega_{0}$"} and {"$\\omega$"} correspond to the initial and final angular velocities respectively. The linear velocity {"$v$"} of the particle is along the tangential direction given by</P2>
    <DM>{"$$v=\\omega r$$"}</DM>
    <P2>Its centripetal acceleration {"$a_{r}$"} is towards the centre along the radius given by</P2>
    <DM>{"$$a_{r}=\\omega^{2}r$$"}</DM>
    <P2>It also has tangential acceleration {"$a_{t}$"} along the tangential direction given by</P2>
    <DM>{"$$a_{t}=\\alpha r$$"}</DM>
    <P2>The angular velocity and angular acceleration are actually vector quantities. By convention, if the fingers of right hand curl around the axis of rotation in the direction of rotation of the body, the extended thumb points out in the direction {"$\\vec{\\omega}$"}. In Fig. 2.1, the body is rotating in anticlockwise direction and the direction of {"$\\vec{\\omega}$"} is along the axis in the upward direction. If the body was rotating in the clockwise direction, then its direction would be along the axis but in downward direction.</P2>
    <P2>In vector form, the following relations hold good for the motion of a particle in the body.</P2>
    <DM>{"$$\\vec{v}=\\vec{\\omega}\\times\\vec{r}$$"}</DM>
    <P2>On differentiating with respect to time, we have</P2>
    <DM>{"$$\\vec{a}=\\frac{d\\vec{v}}{dt}=\\frac{d\\vec{\\omega}}{dt}\\times\\vec{r}+\\vec{\\omega}\\times\\frac{d\\vec{r}}{dt}=\\vec{\\alpha}\\times\\vec{r}+\\vec{\\omega}\\times\\vec{v}$$"}</DM>
    <P2>The first term on the RHS points along the tangent in the direction of the velocity vector and is the tangential acceleration {"$\\vec{a}_{t}$"}. The second term points towards the center and is the centripetal acceleration {"$\\vec{a}_{r}$"}. Therefore,</P2>
    <P2>Tangential acceleration {"$\\quad\\overrightarrow{a_{t}}=\\vec{\\alpha}\\times\\vec{r}$"}</P2>
    <P2>Centripetal acceleration {"$\\quad\\overrightarrow{a_{r}}=\\vec{\\omega}\\times\\vec{v}=-\\omega^{2}\\vec{r}$"}</P2>
    <P2>The total acceleration of the particle is</P2>
    <DM>{"$$\\vec{a}=\\vec{a}_{t}+\\vec{a}_{r}$$"}</DM>

    <IllustrationBox num="1">
      <P2 style={{ fontWeight: 700 }}>A wheel rotates at a rate of 100 rev/min in the clockwise direction. What is the magnitude of the constant angular acceleration if the wheel stops in 10 sec? How many revolutions will it cover before stopping?</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>Here,</P2>
      <DM>{"$$\\omega_0=\\frac{100\\text{ rev}}{\\text{min}}=\\frac{100\\times 2\\pi\\text{ rad}}{60\\text{ sec}}=\\frac{10\\pi}{3}\\text{ rad s}^{-1}$$"}</DM>
      <P2>{"$\\omega=0,\\quad t=10$ sec"}</P2>
      <DM>{"$$\\therefore\\quad\\alpha=\\frac{\\omega-\\omega_0}{t}=\\frac{0-10\\pi/3}{10}=-\\frac{\\pi}{3}\\text{ rad s}^{-2}$$"}</DM>
      <P2>Angular displacement {"$\\theta$"} is given by the eqn.</P2>
      <DM>{"$$\\omega^2-\\omega_0^2=2\\alpha\\theta\\qquad\\Rightarrow\\quad\\theta=\\frac{0-(10\\pi/3)^2}{2(-\\pi/3)}=\\frac{50\\pi}{3}\\text{ rad}$$"}</DM>
      <P2>Hence, number of revolutions {"$=\\dfrac{50\\pi/3}{2\\pi}=\\dfrac{25}{3}$"}</P2>
    </IllustrationBox>

    <IllustrationBox num="2">
      <P2 style={{ fontWeight: 700 }}>A turn table of radius 50 cm starts from rest and accelerates with constant angular acceleration of {"$1\\,\\mathrm{rad\\,s}^{-2}$"}. Compute the tangential, radial and resultant acceleration of a point on the rim after {"$t=2$"} sec.</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>Here, {"$\\alpha=1\\,\\mathrm{rad\\,s}^{-2},\\quad\\omega_{0}=0,\\quad r=0{\\cdot}5\\text{ m}$"}</P2>
      <P2>After {"$t=2$"} sec, {"$\\omega=\\omega_{0}+\\alpha t=2\\,\\mathrm{rad\\,s}^{-1}$"}.</P2>
      <P2>Tangential acceleration, {"$a_{t}=\\alpha r=1\\times 0{\\cdot}5=0{\\cdot}5\\,\\mathrm{ms}^{-2}$"}</P2>
      <P2>Radial acceleration, {"$\\quad a_{r}=\\omega^{2}r=2^{2}\\times 0{\\cdot}5=2\\,\\mathrm{ms}^{-2}$"}</P2>
      <P2>Resultant acceleration</P2>
      <DM>{"$$a=\\sqrt{a_t^2+a_r^2}=\\sqrt{0{\\cdot}5^2+2^2}=2{\\cdot}1\\text{ m/s}^2$$"}</DM>
    </IllustrationBox>

    <IllustrationBox num="3">
      <P2 style={{ fontWeight: 700 }}>A disk rotates about a fixed axis. Its angular velocity {"$\\omega$"} varies with time according to equation {"$\\omega=at+b$"}. At the instant {"$t=0$"}, its angular velocity is 1 rad/s and angular position is 2 rad. At the instant {"$t=2$"} s, angular velocity is 5 rad/s. Determine angular position {"$\\theta$"} and angular acceleration {"$\\alpha$"} when {"$t=4$"} s.</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>The given equation {"$\\omega=at+b$"} has form similar to {"$\\omega=\\omega_0+\\alpha t$"}. Hence, the motion is rotation with uniform angular acceleration in which the initial angular velocity and angular acceleration are respectively</P2>
      <DM>{"$$\\omega_0=b\\quad\\text{and}\\quad\\alpha=a$$"}</DM>
      <P2>At {"$t=0$"}, {"$\\omega=1$"} rad/s and at {"$t=2$"} s, {"$\\omega=5$"} rad/s.</P2>
      <P2>{"$\\Rightarrow\\;1=\\omega_0+\\alpha\\times 0\\quad$"} and {"$\\quad5=\\omega_0+\\alpha\\times 2$"}</P2>
      <P2>{"$\\Rightarrow\\;\\omega_0=1$"} rad/s {"$\\quad$"} and {"$\\quad\\alpha=2$"} rad/s{"$^2$"}</P2>
      <P2>Since {"$\\alpha$"} is constant, at {"$t=4$"} s, {"$\\quad\\alpha=2$"} rad/s{"$^2$"}</P2>
      <P2>At {"$t=0$"}, {"$\\theta=2$"} rad. Hence, the initial angular position {"$\\theta_0=2$"} rad.</P2>
      <P2>If {"$\\theta$"} is the angular position at time {"$t$"}, then the angular displacement is given by</P2>
      <DM>{"$$\\theta-\\theta_0=\\omega_0\\,t+\\frac{1}{2}\\alpha\\,t^2$$"}</DM>
      <P2>At {"$t=4$"} s, {"$\\quad\\theta-2=1\\times 4+\\dfrac{1}{2}\\times 2\\times 4^2\\qquad\\Rightarrow\\quad\\theta=22$"} rad</P2>
      <P2>Therefore, at {"$t=4$"} s, {"$\\quad\\theta=22$"} rad</P2>
    </IllustrationBox>

    <IllustrationBox num="4">
      <P2 style={{ fontWeight: 700 }}>A turn table is rotating in a horizontal plane about the vertical axis passing through its centre with an angular velocity 30 rad/s. It carries upon it a flywheel rotating with an angular velocity 40 rad/s about a horizontal axle mounted in bearings. Find the magnitude of angular velocity of the wheel as seen by an observer in the room.</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>As the axis of the turn table is vertical, its angular velocity {"$\\omega_{T}=30$"} rad/s is directed vertical.</P2>
      <P2>As the axis of flywheel is horizontal, its angular velocity {"$\\omega_{F}=40$"} rad/s is directed horizontal.</P2>
      <P2>The resultant angular velocity is</P2>
      <DM>{"$$\\vec{\\omega}_{R}=\\vec{\\omega}_{F}+\\vec{\\omega}_{T}$$"}</DM>
      <P2>Its magnitude is</P2>
      <DM>{"$$|\\vec{\\omega}_{R}|=\\sqrt{\\omega_T^2+\\omega_F^2}=\\sqrt{30^2+40^2}=50\\text{ rad/s}$$"}</DM>
    </IllustrationBox>

    {/* 2.3 MOMENT OF INERTIA */}
    <SecHd id="s23" label="2.3" title="Moment of Inertia" />
    <P2>In earlier chapters, we have studied the <strong>inertia of linear motion</strong>. Due to this inertia, a body cannot change its state of rest or of uniform motion in a straight line until an external force is applied on it. The measure of the inertia of linear motion of the body is its mass.</P2>
    <P2>Similarly, there is <strong>inertia of rotational motion</strong> as well. Due to this inertia, a body cannot change its state of rest or of rotational motion until an external torque is applied on it. (We shall study torque later in this chapter). The quantity that measures the inertia of rotational motion is called <strong>moment of inertia</strong>.</P2>
    <DefBox>
      <strong>The moment of inertia of a body is defined as the sum of the product of the mass of different particles and the squares of their radial distances from the axis of rotation.</strong>
    </DefBox>
    <P2>The quantity 'moment of inertia' of a body depends upon the axis about which the body rotates, i.e., the measure of moment of inertia of a body is different for different axis about which it rotates. It is generally denoted by the symbol {"$I$"}.</P2>
    <P2>Consider a point particle having mass {"$m$"} rotating about an axis whose perpendicular distance from the axis is {"$r$"}. Then the moment of inertia about this axis is given by {"$I=mr^2$"}.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_03873DAD11A8C83A1229} num="FIGURE 2.2" caption="Point mass m at distance r from axis of rotation." />
    <SubHd id="sub-mi-system" title="Moment of Inertia of a system of N particles" />
    <P2>Consider a collection of {"$N$"} particles of masses {"$m_1, m_2, m_3,\\ldots m_N$"} rotating about a common axis such that there is no relative motion between these particles.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_82DEB45B31BFC6253AF5} num="FIGURE 2.3" caption="System of N particles at distances r₁, r₂, r₃ from axis." />
    <P2>Let the mass of the {"$i$"}th particle be {"$m_i$"} and its perpendicular distance from the axis be {"$r_i$"}. Then the moment of inertia of the system of {"$N$"} particles is given by</P2>
    <DM>{"$$I=m_1r_1^2+m_2r_2^2+\\cdots+m_Nr_N^2=\\sum m_ir_i^2$$"}</DM>

    <IllustrationBox num="5">
      <P2 style={{ fontWeight: 700 }}>Three mass points {"$m_1, m_2$"} and {"$m_3$"} are located at the vertices of an equilateral triangle of length {"$a$"}. What is the moment of inertia of the system about an axis along the altitude of the triangle passing through {"$m_1$"}?</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>Here, {"$r_1=0,\\quad r_2=r_3=a/2$"}</P2>
      <DM>{"$$\\begin{aligned} I &= m_1r_1^2+m_2r_2^2+m_3r_3^2 \\\\ &= m_1\\times 0^2+m_2\\left(\\frac{a}{2}\\right)^2+m_3\\left(\\frac{a}{2}\\right)^2 = \\boxed{(m_2+m_3)\\frac{a^2}{4}} \\end{aligned}$$"}</DM>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F3398FF58E04258FC09F} num="FIGURE 2.4" caption="Equilateral triangle with masses at vertices; axis through m₁." />
    </IllustrationBox>

    {/* 2.4 RADIUS OF GYRATION */}
    <SecHd id="s24" label="2.4" title="Radius of Gyration" />
    <DefBox>
      <strong>The radius of gyration of a body about a given axis is the perpendicular distance of a point P from the axis, where if whole mass of the body were concentrated, the body shall have the same moment of inertia as it has with the actual distribution of mass.</strong>
    </DefBox>
    <P2>This distance, i.e., the radius of gyration is represented by {"$k$"}. If {"$M$"} is the mass of the body and {"$I$"} is the moment of inertia of the body about a given axis, then we can write</P2>
    <DM>{"$$I=Mk^2\\qquad\\text{or}\\qquad k=\\sqrt{\\frac{I}{M}}$$"}</DM>
    <P2>It follows that the radius of gyration of the same body is different if we consider a different axis.</P2>

    <IllustrationBox num="6">
      <P2 style={{ fontWeight: 700 }}>Find the radius of gyration of a system of three identical masses. The distance of the masses from the axis of rotation are 2 cm, 3 cm and 5 cm respectively.</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>Here, {"$m_1=m_2=m_3=m$"},</P2>
      <P2>{"$r_1=2$"} cm, {"$r_2=3$"} cm, {"$r_3=5$"} cm</P2>
      <DM>{"$$I=Mk^2\\implies m_1r_1^2+m_2r_2^2+m_3r_3^2=(m_1+m_2+m_3)k^2$$"}</DM>
      <DM>{"$$\\implies m(2^2+3^2+5^2)=(3m)k^2\\qquad\\therefore\\quad k=\\sqrt{\\frac{38}{3}}\\text{ cm}$$"}</DM>
    </IllustrationBox>

    {/* 2.5 MOMENT OF INERTIA OF SOME BODIES */}
    <SecHd id="s25" label="2.5" title="Moment of Inertia of Some Bodies" />
    <SubHd id="sub-thin-rod" title="Thin rod" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_370941634CD8791E1171} num="FIGURE 2.5" caption="Thin rod of mass M, length L, rotating about perpendicular axis through centre." />
    <P2>Let the length of the thin rod be {"$L$"} and its mass be {"$M$"} which is rotating about an axis perpendicular to the rod and passing through the centre of the rod. Consider an element of length {"$dx$"} at a distance {"$x$"} from the centre of the rod as shown in fig. 2.5. Its mass is</P2>
    <DM>{"$$dm=\\frac{M}{L}dx$$"}</DM>
    <DM>{"$$I=\\int x^2\\,dm=\\int_{-L/2}^{+L/2}x^2\\frac{M}{L}dx=\\frac{M}{L}\\left.\\frac{x^3}{3}\\right|_{-L/2}^{+L/2}=\\frac{ML^2}{12}$$"}</DM>
    <DM>{"$$\\boxed{I=\\frac{ML^2}{12}}$$"}</DM>

    <SubHd id="sub-thin-ring" title="Thin circular ring" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F43F453E64B7973AD22C} num="FIGURE 2.6" caption="Thin circular ring of mass M, radius R, rotating about perpendicular axis through centre." />
    <P2>Let the radius of the thin ring be {"$R$"} and its mass be {"$M$"} which is rotating about an axis perpendicular to the plane of the ring and passing through the centre. Consider an element of mass {"$dm$"} of the ring as shown in fig. 2.6. All the mass elements are at the same distance {"$r=R$"} from the axis.</P2>
    <DM>{"$$I=\\int r^2\\,dm=R^2\\int dm=MR^2$$"}</DM>
    <DM>{"$$\\boxed{I=MR^2}$$"}</DM>

    <SubHd id="sub-thin-disc" title="Thin circular disc" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2FB1192A84EDBE926F21} num="FIGURE 2.7" caption="Thin circular disc of mass M, radius R, rotating about perpendicular axis through centre." />
    <P2>Let the radius of the thin circular disc be {"$R$"} and its mass be {"$M$"} which is rotating about an axis perpendicular to the plane of the disc and passing through the centre. Consider an elemental ring of radius {"$r$"}, thickness {"$dr$"} and mass {"$dm$"} as shown in fig. 2.7. Its mass is</P2>
    <DM>{"$$dm=\\left(\\frac{M}{\\pi R^2}\\right)2\\pi r\\,dr=\\frac{2M}{R^2}r\\,dr$$"}</DM>
    <DM>{"$$I=\\int r^2\\,dm=\\int_0^R r^2\\frac{2M}{R^2}r\\,dr=\\frac{2M}{R^2}\\left.\\frac{r^4}{4}\\right|_0^R=\\frac{MR^2}{2}$$"}</DM>
    <DM>{"$$\\boxed{I=\\frac{MR^2}{2}}$$"}</DM>

    <SubHd id="sub-solid-sphere" title="Solid sphere" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_FD188CB7A2C59B9B9920} num="FIGURE 2.8" caption="Solid sphere of mass M, radius R; elemental disc at distance x from centre." />
    <P2>Let the radius of the solid sphere be {"$R$"} and its mass be {"$M$"} which is rotating about an axis passing through the centre. Consider an elemental disc of radius {"$r$"} and mass {"$dm$"} at a distance {"$x$"} from the centre of the sphere as shown in fig. 2.8. The radius of the elemental disc is {"$r=\\sqrt{R^2-x^2}$"} and its mass is</P2>
    <DM>{"$$dm=\\frac{M}{(4/3)\\pi R^3}\\pi r^2\\,dx=\\frac{3M}{4R^3}(R^2-x^2)dx$$"}</DM>
    <P2>Being a disc, its moment of inertia is</P2>
    <DM>{"$$dI=\\frac{1}{2}(dm)r^2=\\frac{1}{2}\\left(\\frac{3M}{4R^3}(R^2-x^2)dx\\right)(R^2-x^2)=\\frac{3M}{8R^3}(R^2-x^2)^2\\,dx$$"}</DM>
    <DM>{"$$I=\\int_{-R}^{R}\\frac{3M}{8R^3}(R^2-x^2)^2\\,dx=\\frac{3M}{8R^3}\\left[2R^2\\cdot\\frac{2R^3}{3}-\\frac{2R^5}{5}\\right]=\\frac{2}{5}MR^2$$"}</DM>
    <DM>{"$$\\boxed{I=\\frac{2}{5}MR^2}$$"}</DM>

    <SubHd id="sub-hollow-sphere" title="Thin hollow sphere" />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_3F7674522FB1408B1C22} num="FIGURE 2.9" caption="Thin hollow sphere; elemental ring at angle θ from axis." />
    <P2>Let the radius of the hollow sphere be {"$R$"} and its mass be {"$M$"} which is rotating about an axis passing through the centre. Consider an elemental ring of radius {"$r$"} and mass {"$dm$"} as shown in fig. 2.9. Its radius is {"$r=R\\sin\\theta$"} and its mass is</P2>
    <DM>{"$$dm=\\frac{M}{4\\pi R^2}\\cdot 2\\pi R\\sin\\theta\\cdot R\\,d\\theta=\\frac{M}{2}\\sin\\theta\\,d\\theta$$"}</DM>
    <P2>Being a ring, its moment of inertia is</P2>
    <DM>{"$$dI=(dm)r^2=\\frac{M}{2}\\sin\\theta\\,d\\theta\\cdot(R\\sin\\theta)^2=\\frac{MR^2}{2}\\sin^3\\theta\\,d\\theta$$"}</DM>
    <DM>{"$$I=\\int_0^{\\pi}\\frac{MR^2}{2}\\sin^3\\theta\\,d\\theta=\\frac{MR^2}{2}\\cdot\\frac{4}{3}=\\frac{2}{3}MR^2$$"}</DM>
    <DM>{"$$\\boxed{I=\\frac{2}{3}MR^2}$$"}</DM>

    <SubHd id="sub-tri-lamina" title="Thin Triangular Lamina" />
    <P2>Let the base of the triangular lamina be {"$b$"}, its altitude be {"$h$"} and its mass be {"$M$"} which is rotating about the base.</P2>
    <P2>The mass per unit area of the lamina is {"$\\sigma=\\dfrac{M}{bh/2}=\\dfrac{2M}{bh}$"}</P2>
    <P2>Consider an elemental rectangular strip parallel to the base of width {"$dy$"} at a distance {"$y$"} from the base (axis of rotation).</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5F4E547454248890B4FF} num="FIGURE 2.10" caption="Triangular lamina with elemental strip at distance y from base BC." />
    <P2>From similar triangles ADE and ABC, we have {"$\\dfrac{DE}{BC}=\\dfrac{h-y}{h}$"}, so {"$DE=\\dfrac{b(h-y)}{h}$"}.</P2>
    <P2>Area of the strip is {"$dA=\\dfrac{b(h-y)}{h}dy$"}</P2>
    <P2>Its mass is {"$dm=\\sigma\\,dA=\\dfrac{2M}{bh}\\cdot\\dfrac{b(h-y)}{h}dy=\\dfrac{2M}{h^2}(h-y)dy$"}</P2>
    <P2>Its moment of inertia about the axis of rotation BC is</P2>
    <DM>{"$$I=\\int_0^h y^2\\,dm=\\int_0^h y^2\\frac{2M}{h^2}(h-y)dy=\\frac{Mh^2}{6}$$"}</DM>
    <DM>{"$$\\boxed{I=\\frac{Mh^2}{6}}$$"}</DM>

    <SubHd id="sub-rect-lamina" title="Thin Rectangular Lamina" />
    <P2>Let the rectangular lamina PQRS have a mass {"$M$"}, length {"$L$"} and breadth {"$B$"} which is rotating about the diagonal QS.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_840D50C5E2A18ADF8B99} num="FIGURE 2.11" caption="Rectangular lamina PQRS rotating about diagonal QS; h is altitude of triangle QRS." />
    <P2>Let {"$h$"} be the altitude of the triangle QRS. Then, area (rectangle PQRS) {"$= 2\\times$"} area (QRS).</P2>
    <DM>{"$$LB=2\\times\\frac{1}{2}\\cdot\\sqrt{L^2+B^2}\\cdot h\\qquad\\therefore\\quad h=\\frac{LB}{\\sqrt{L^2+B^2}}$$"}</DM>
    <P2>The moment of inertia of the rectangular lamina PQRS about the diagonal QS is twice of the moment of inertia of triangular lamina QRS about base QS.</P2>
    <DM>{"$$I_{QS}=2\\times\\frac{(M/2)h^2}{6}=\\frac{Mh^2}{6}=\\frac{M}{6}\\cdot\\frac{L^2B^2}{L^2+B^2}=\\boxed{\\frac{ML^2B^2}{6(L^2+B^2)}}$$"}</DM>

    <IllustrationBox num="7">
      <P2 style={{ fontWeight: 700 }}>A uniform rod of mass {"$m$"} and length {"$l$"} is rotating with a constant angular speed {"$\\omega$"} about a vertical axis passing through its point of suspension. Find the moment of inertia of the rod about the axis of rotation if it makes an angle {"$\\theta$"} to the vertical (axis of rotation).</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2>Consider an element of length {"$dx$"} at distance {"$x$"} from the axis of rotation. Its mass is {"$dm=\\dfrac{m}{l}dx$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_97FB9E05EE80BF191650} num="FIGURE 2.12" caption="Inclined rod element at distance x from axis; perpendicular distance = x sin θ." />
      <P2>Its moment of inertia about axis of rotation is</P2>
      <DM>{"$$dI=(x\\sin\\theta)^2\\,dm$$"}</DM>
      <P2>The moment of inertia of complete rod is</P2>
      <DM>{"$$I=\\int(x\\sin\\theta)^2\\,dm=\\sin^2\\theta\\int_0^l x^2\\frac{m}{l}dx=\\boxed{\\frac{ml^2\\sin^2\\theta}{3}}$$"}</DM>
      <SubSubHd id="sub-alt-sol-7" title="Alternative Solution" />
      <P2>The projection of the rod along perpendicular to axis of rotation is {"$l\\sin\\theta$"}. So, the rod can be visualised as a uniform rod of length {"$L=l\\sin\\theta$"} in the direction perpendicular to the axis of rotation. Its moment of inertia is</P2>
      <DM>{"$$I=\\frac{mL^2}{3}=\\frac{m(l\\sin\\theta)^2}{3}=\\boxed{\\frac{ml^2\\sin^2\\theta}{3}}$$"}</DM>
    </IllustrationBox>

    {/* 2.6 PARALLEL AXIS THEOREM */}
    <SecHd id="s26" label="2.6" title="Parallel Axis Theorem" />
    <DefBox>
      <strong>According to parallel axis theorem, the moment of inertia of a rigid body about any axis is equal to the sum of the moment of inertia of the body about a parallel axis passing through its centre of mass and the product of its mass and square of the perpendicular distance between the two parallel axes.</strong>
    </DefBox>
    <P2>Consider a rigid body of mass {"$M$"} and an axis {"$X$"} passing through its centre of mass. Now consider another axis {"$X'$"} which is parallel to {"$X$"} but at a distance {"$a$"} from axis {"$X$"} as shown. Let</P2>
    <P2>{"$I_x$"} = Moment of inertia of the body about axis {"$X$"}.</P2>
    <P2>{"$I_{x'}$"} = Moment of inertia of the body about axis {"$X'$"}.</P2>
    <P2>Then, {"$I_x$"} and {"$I_{x'}$"} are related to each other by the following expression</P2>
    <DM>{"$$I_{x'}=I_x+Ma^2$$"}</DM>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F071FEB48BA2FCA9BE68} num="FIGURE 2.13" caption="Parallel axis theorem: axis X through CM, axis X' at distance a." />
    <P2 style={{ fontWeight: 700, color: P_COLOR }}>This equation is known as parallel axis theorem.</P2>
    <GraspGripBox>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        <li style={{ marginBottom: 6 }}>A necessary condition for parallel axis theorem to be valid is that the axis {"$X$"} must pass through the centre of mass of the body.</li>
        <li style={{ marginBottom: 6 }}>This theorem is valid for all rigid bodies whether two dimensional or three dimensional.</li>
        <li style={{ marginBottom: 6 }}>For a given set of parallel axes, the moment of inertia of a body is minimum about the axis which passes through its centre of mass.</li>
      </ol>
    </GraspGripBox>
    <P2>According to this theorem, the moment of inertia of a thin rod of mass {"$M$"} and length {"$L$"} about an axis perpendicular to the rod passing through its end is given by</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A0F7A93C9EF43DF5913B} num="FIGURE 2.14" caption="Parallel axis theorem applied to a thin rod: axis through centre vs. axis through end." />
    <DM>{"$$I_{x'}=I_x+M\\left(\\frac{L}{2}\\right)^2=\\frac{ML^2}{12}+\\frac{ML^2}{4}=\\frac{ML^2}{3}$$"}</DM>

    <IllustrationBox num="8">
      <P2 style={{ fontWeight: 700 }}>Find the moment of inertia of</P2>
      <P2>(a) disc about an axis passing through the edge and perpendicular to the plane of the disc.</P2>
      <P2>(b) solid sphere about an axis touching the sphere at its surface.</P2>
      <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
      <P2><strong>(a)</strong> {"$I=I_{cm}+MR^2=\\dfrac{MR^2}{2}+MR^2=\\boxed{\\dfrac{3}{2}MR^2}$"}</P2>
      <P2><strong>(b)</strong> {"$I=I_{cm}+MR^2=\\dfrac{2}{5}MR^2+MR^2=\\boxed{\\dfrac{7}{5}MR^2}$"}</P2>
    </IllustrationBox>

    {/* 2.7 PERPENDICULAR AXIS THEOREM */}
    <SecHd id="s27" label="2.7" title="Perpendicular Axis Theorem" />
    <DefBox>
      <strong>According to perpendicular axes theorem, the moment of inertia of a plane lamina (i.e., a two dimensional body or a thin sheet of any shape) about an axis is perpendicular to its plane is equal to the sum of the moments of inertia about any two mutually perpendicular axes in the plane of the lamina and concurrent with the perpendicular axis.</strong>
    </DefBox>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1DCFD66F20813E4D6712} num="FIGURE 2.15" caption="Perpendicular axis theorem: axes X, Y in plane of lamina; Z perpendicular to plane, meeting at O." />
    <P2>Consider a rigid plane lamina of mass {"$M$"} and two mutually perpendicular axes {"$X$"} and {"$Y$"} in the plane of the lamina such that the two axes meet at point {"$O$"}. Now consider another axis {"$Z$"} which passes through {"$O$"} and is perpendicular to the plane of the lamina as shown.</P2>
    <P2>Let {"$I_x$"} = Moment of inertia of the body about axis {"$X$"} in the plane of the lamina</P2>
    <P2>{"$I_y$"} = Moment of inertia of the body about axis {"$Y$"} in the plane of the lamina</P2>
    <P2>{"$I_z$"} = Moment of inertia of the body about axis {"$Z$"} which is perpendicular to the plane of the lamina</P2>
    <P2>Then, {"$I_x$"}, {"$I_y$"} and {"$I_z$"} are related to each other by the following expression.</P2>
    <DM>{"$$I_z=I_x+I_y$$"}</DM>
    <P2 style={{ fontWeight: 700, color: P_COLOR }}>This equation is known as perpendicular axis theorem.</P2>
    <GraspGripBox>
      <ol style={{ margin: 0, paddingLeft: 20 }}>
        <li style={{ marginBottom: 6 }}>Perpendicular axis theorem is valid even if any one or all three axes do not pass through centre of mass.</li>
        <li style={{ marginBottom: 6 }}>A necessary condition for this theorem to be valid is that the rigid body should be two dimensional, i.e., in form of a thin sheet of any shape.</li>
      </ol>
    </GraspGripBox>
    <P2>Using this theorem, we can deduce moment of inertia of a thin disc of radius {"$R$"} and mass {"$M$"} about its diameter.</P2>
    <P2>Let {"$I$"} = Moment of inertia of the disc about its diameter</P2>
    <P2>{"$I'$"} = Moment of inertia of the disc about an axis, perpendicular to the plane of the disc and passing through its centre.</P2>
    <P2>Let {"$X$"} and {"$Y$"} axes be perpendicular to each other.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1CAF5FF9ED1C43E7BDE9} num="FIGURE 2.16" caption="Disc with X, Y diameters and Z axis perpendicular to plane." />
    <P2>Then by symmetry, {"$I_x=I_y=I$"}</P2>
    <P2>By perpendicular axis theorem,</P2>
    <DM>{"$$\\begin{aligned} & I'=I_z=I_x+I_y=I+I=2I \\\\ \\therefore\\quad & I=\\frac{I'}{2}=\\frac{1}{2}\\times\\frac{MR^2}{2}=\\frac{MR^2}{4} \\end{aligned}$$"}</DM>
    <P2>Proceeding in a similar manner, we can find the moment of inertia of certain rigid bodies about various axes of rotation. The moment of inertia of several rigid bodies are listed in the table.</P2>

    <MomentOfInertiaTable />
  </>
);

const content_b2 = (bb) => {
  const { SecHd, SubHd, P2, DM, DefBox, GraspGripBox, IllustrationBox, Fig, P_COLOR } = bb;
  return (
    <>
      {/* 2.8 KINETIC ENERGY OF ROTATION */}
      <SecHd id="s28" label="2.8" title="Kinetic Energy of Rotation" />
      <P2>Kinetic energy of rotation of a body is the energy possessed by the body on account of its rotation about a given axis.</P2>
      <P2>If a body of moment of inertia {"$I$"} about a given axis rotates with an angular velocity {"$\\omega$"}, then the kinetic energy of rotation is given by</P2>
      <DM>{"$$K_R=\\frac{1}{2}I\\omega^2$$"}</DM>

      <IllustrationBox num="9">
        <P2 style={{ fontWeight: 700 }}>A rod of mass {"$m$"} and length {"$l$"} is pivoted to a fixed support at one of its ends {"$O$"}. It is rotating with constant angular velocity {"$\\omega$"}. Write expression for its kinetic energy.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_923BE8E7058B4E1BE8F7} num="FIGURE 2.17" caption="Rod pivoted at O rotating with angular velocity ω." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Since, the instantaneous axis of rotation passes through {"$O$"} and the moment of inertia about {"$O$"} is {"$I_0=ml^2/3$"}, the kinetic energy of the rod is</P2>
        <DM>{"$$K=\\frac{1}{2}I_0\\omega^2=\\frac{1}{2}\\left(\\frac{ml^2}{3}\\right)\\omega^2=\\boxed{\\frac{1}{6}ml^2\\omega^2}$$"}</DM>
      </IllustrationBox>

      {/* 2.9 TORQUE */}
      <SecHd id="s29" label="2.9" title="Torque (Moment of a Force)" />
      <P2>Consider a body acted upon by a force {"$\\vec{F}$"}. Let this force be acting at point {"$P$"} and the position vector of point {"$P$"} taking {"$O$"} as origin be {"$\\vec{r}$"}.</P2>
      <P2>Then, the torque (generally denoted by the symbol {"$\\vec{\\tau}$"}) acting on the body about an axis passing through point {"$O$"} is given by</P2>
      <DM>{"$$\\vec{\\tau}=\\vec{r}\\times\\vec{F}$$"}</DM>
      <P2>Its magnitude is equal to the product of the force and the perpendicular distance of the force from the axis as shown in the fig. 2.18. Hence,</P2>
      <DM>{"$$\\tau=rF\\sin\\theta=(r\\sin\\theta)F=r_1F$$"}</DM>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A87159F0D997A95E0525} num="FIGURE 2.18" caption="Torque: force F acting at P; r₁ = perpendicular distance from axis O." />
      <P2><strong>Torque is also known as Moment of force</strong> and in the fig. 2.18, this force tends to rotate the body clockwise.</P2>
      <P2>The force {"$\\vec{F}$"} shown in fig. 2.19 tends to rotate the body anticlockwise.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_61CD8EF76BA2F562DBE1} num="FIGURE 2.19" caption="Force F at point P causing anticlockwise rotation about O." />
      <P2>If the forces {"$F_1, F_2$"} and {"$F_3$"} act on the body as shown in fig. 2.20, then the net torque acting on the body in clockwise direction about the axis passing through point {"$O$"} is given by</P2>
      <DM>{"$$\\tau=r_1F_1-r_2F_2-r_3F_3$$"}</DM>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_FF71184DD5039A354FB5} num="FIGURE 2.20" caption="Three forces F₁, F₂, F₃ acting at distances r₁, r₂, r₃ from O." />

      {/* 2.10 ANGULAR MOMENTUM */}
      <SecHd id="s210" label="2.10" title="Angular Momentum" />
      <P2>We have so far studied linear momentum which is given by the product of mass and its linear velocity as</P2>
      <DM>{"$$\\vec{p}=m\\vec{v}$$"}</DM>
      <P2>Similarly, when a body rotates about an axis, it is said to posses angular momentum which is given by the product of its moment of inertia about the axis of rotation and its angular velocity. Angular momentum is generally denoted by the symbol {"$\\vec{L}$"} and is given by</P2>
      <DM>{"$$\\vec{L}=I\\vec{\\omega}$$"}</DM>
      <P2>Angular Momentum of a single particle (of mass {"$m$"} moving with velocity {"$\\vec{v}$"}) about an axis passing through point {"$O$"} is also given by</P2>
      <DM>{"$$\\vec{L}=\\vec{r}\\times\\vec{p}=\\vec{r}\\times m\\vec{v}$$"}</DM>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_E426DE15C7C4EFB92437} num="FIGURE 2.21" caption="Angular momentum of particle P: L = r₁mv, where r₁ is perpendicular distance from O." />
      <P2>Its magnitude is equal to the product of the linear momentum and the perpendicular distance of the line of velocity from point {"$O$"} as shown in fig. 2.21.</P2>
      <DM>{"$$\\text{Hence,}\\quad L=rp\\sin\\theta=(r\\sin\\theta)p=r_1p=r_1mv$$"}</DM>

      <IllustrationBox num="10">
        <P2 style={{ fontWeight: 700 }}>A particle of mass {"$m$"} is projected with velocity {"$v$"} at an angle {"$\\theta$"} with the horizontal. Find its angular momentum about the point of projection when it is at the highest point of its trajectory.</P2>
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Velocity at the highest point {"$=v\\cos\\theta$"}</P2>
        <P2>Therefore, angular momentum about the point of projection when the mass is at the highest point of its trajectory is</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_552DFD6ED4084F10D808} num="FIGURE 2.22" caption="Projectile at highest point H; horizontal velocity v cos θ." />
        <DM>{"$$L=H\\cdot mv\\cos\\theta=\\frac{v^2\\sin^2\\theta}{2g}\\times mv\\cos\\theta=\\boxed{\\frac{mv^3\\sin^2\\theta\\cos\\theta}{2g}}$$"}</DM>
      </IllustrationBox>

      {/* 2.11 LAWS OF ROTATIONAL MOTION */}
      <SecHd id="s211" label="2.11" title="Laws of Rotational Motion" />
      <P2>Corresponding to Newton's three laws of translational motion, we can state three laws of rotational motion.</P2>
      <SubHd id="sub-first-law" title="First Law" />
      <P2>A body continues to remain in its state of rest or of uniform rotation motion about a given axis unless an external torque is applied on it.</P2>
      <SubHd id="sub-second-law" title="Second Law" />
      <P2>This law states that the rate of change of angular momentum of a body is equal to the net external torque acting on it and takes place in the direction in which the torque acts, i.e.,</P2>
      <DM>{"$$\\vec{\\tau}=\\frac{d\\vec{L}}{dt}=\\frac{d(I\\vec{\\omega})}{dt}$$"}</DM>
      <P2>Note that it is possible that the moment of inertia {"$I$"} of a rotating body changes. However, for a rigid body,</P2>
      <DM>{"$$I=\\text{constant}\\qquad\\therefore\\quad\\vec{\\tau}=\\frac{I\\,d\\vec{\\omega}}{dt}=I\\vec{\\alpha}$$"}</DM>
      <SubHd id="sub-third-law" title="Third Law" />
      <P2>When a rigid body {"$A$"} exerts a torque on another rigid body {"$B$"} in contact with it, then the body {"$B$"} would exert an equal and opposite torque on the body {"$A$"}.</P2>

      {/* 2.12 CONSERVATION OF ANGULAR MOMENTUM */}
      <SecHd id="s212" label="2.12" title="Conservation of Angular Momentum" />
      <P2>As per above second law, {"$\\vec{\\tau}=\\dfrac{d\\vec{L}}{dt}$"}</P2>
      <P2>So, if {"$\\vec{\\tau}=0$"}, {"$\\vec{L}=\\text{constant}$"} or {"$I\\vec{\\omega}=\\text{constant}$"}</P2>
      <DefBox>
        <strong>The law of conservation of angular momentum states that when there is no net external torque acting on a system, the angular momentum of the system remains conserved.</strong>
      </DefBox>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B516F089F1D9D6065682} num="FIGURE 2.23" caption="Person on rotating platform: arms stretched (ω₁) vs. arms folded (ω₂); Iω = constant." />
      <P2>Consider a person carrying heavy weights in his hands with stretched arms and standing on a freely rotating platform as shown in fig. 2.23. When the person suddenly folds his arms, the moment of inertia decreases. Since, no external torque acts on the system in the process, angular momentum, i.e., {"$I\\omega$"} remains constant. Hence, a decrease in moment of inertia ({"$I$"}) is accompanied by an increase in angular velocity ({"$\\omega$"}).</P2>

      <IllustrationBox num="11">
        <P2 style={{ fontWeight: 700 }}>A disc of mass {"$M$"} and radius {"$r$"} is rotating with an angular velocity {"$\\omega$"}. If gently, two masses {"$m$"} are placed at a distance {"$r/2$"} on either side of the axis, what will be its new angular velocity?</P2>
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Since, no torque has been applied on the disc, its angular momentum remains conserved.</P2>
        <P2>If {"$I'$"} and {"$\\omega'$"} are the new moment of inertia and new angular velocity respectively, then</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_9C2C67A0D2CAF3F52F11} num="FIGURE 2.24" caption="Disc of mass M, radius r; two masses m placed at r/2 from axis." />
        <DM>{"$$I\\omega=I'\\omega'$$"}</DM>
        <DM>{"$$\\Rightarrow\\quad\\frac{Mr^2}{2}\\omega=\\left[\\frac{Mr^2}{2}+m\\left(\\frac{r}{2}\\right)^2+m\\left(\\frac{r}{2}\\right)^2\\right]\\omega'$$"}</DM>
        <DM>{"$$\\therefore\\quad\\boxed{\\omega'=\\frac{M}{M+m}\\omega}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="12">
        <P2 style={{ fontWeight: 700 }}>Consider the disc {"$A$"} of moment of inertia {"$I_1$"} rotating freely in horizontal plane about its axis of symmetry with angular velocity {"$\\omega_0$"}. Another disc {"$B$"} of moment of inertia {"$I_2$"} held at rest above the disc {"$A$"}. The axis of symmetry of the disc {"$B$"} coincides with that of the disc {"$A$"} as shown in fig. 2.25. The disc {"$B$"} is released to land on the disc {"$A$"}. When sliding stops, what will be the angular velocity of both the discs?</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_93A7F05A939416AE0328} num="FIGURE 2.25" caption="Disc B released onto rotating disc A; both reach common angular velocity ω." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>When the disc {"$B$"} lands on {"$A$"}, slipping starts. The force of friction provides an internal torque to system of both the discs. It slows down rotation rate of {"$A$"} and increases that of {"$B$"} till both acquire same angular velocity {"$\\omega$"}.</P2>
        <P2>Since there is no external torques on the system of both the discs about the axis of rotation, the total angular momentum of the system remains conserved.</P2>
        <DM>{"$$\\Rightarrow\\quad I_1\\omega_0+0=(I_1+I_2)\\omega\\qquad\\therefore\\quad\\boxed{\\omega=\\frac{I_1\\omega_0}{I_1+I_2}}$$"}</DM>
      </IllustrationBox>

      {/* 2.13 EQUILIBRIUM OF RIGID BODIES */}
      <SecHd id="s213" label="2.13" title="Equilibrium of Rigid Bodies" />
      <P2>A body in general can execute translational as well as rotational motion, for example, a cylinder rolling on the floor, translates as well as rotates while in motion.</P2>
      <DefBox>
        <strong>A body is said to be in equilibrium, if it is in both translational equilibrium as well as rotational equilibrium.</strong>
      </DefBox>
      <SubHd id="sub-rot-eq" title="Rotational equilibrium" />
      <P2>For a body to be in rotational equilibrium, the net external torque acting on the body must be zero.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D4FADD95288A34EE2733} num="FIGURE 2.26" caption="Rotational equilibrium: two equal parallel forces at A and B; net torque about C = 0 but net force ≠ 0." />
      <P2>An example of such a motion is shown in the fig. 2.26 in which two parallel forces both equal in magnitude and direction are applied perpendicular to a rod at the two ends {"$A$"} and {"$B$"}. The moment about centre of mass (i.e., point {"$C$"}) due to the force at {"$A$"} is {"$aF$"} in anticlockwise direction while due to force at {"$B$"} is {"$aF$"} in clockwise direction. The two moments cancel each other and the net moment on the rod is zero. In this case, the net moment (torque) acting on the rod is zero but net force is non zero. Hence, the rod is in rotational equilibrium but not in translational equilibrium.</P2>
      <SubHd id="sub-trans-eq" title="Translational equilibrium" />
      <P2>For a body to be in translational equilibrium, the net external force acting on the body must be zero.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_31E0AAB2944C1A7C6EA8} num="FIGURE 2.27" caption="Translational equilibrium: equal and opposite forces at A and B; net force = 0 but net torque = 2aF ≠ 0." />
      <P2>An example of such a motion is shown in the fig. 2.27 in which the forces acting at ends {"$A$"} and {"$B$"} are equal in magnitude but opposite in direction. The moment about centre of mass due to both forces is {"$aF$"} in anticlockwise direction resulting in a net moment of {"$2aF$"} in anticlockwise direction. In this case, the net moment (torque) acting on the rod is non zero but the net force is zero. Hence, the rod is in translational equilibrium but not in rotational equilibrium.</P2>
      <P2><strong>A pair of equal and opposite forces (acting on a body) with different lines of action is known as a couple. A Couple produces rotation without translation.</strong></P2>

      {/* Comparison Table */}
      <div style={{ overflowX: "auto", margin: "16px 0" }}>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <caption style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800, fontSize: 13, color: P_COLOR, padding: "8px 0", captionSide: "top", textAlign: "center", letterSpacing: 0.5 }}>
            Comparision of Linear (Translational) and Rotational Motions
          </caption>
          <thead>
            <tr>
              <th colSpan={2} style={{ ...thS, background: P_COLOR, color: "#fff" }}>Linear Motion</th>
              <th colSpan={2} style={{ ...thS, background: P_COLOR, color: "#fff" }}>Rotational Motion</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Displacement", "$x$", "Angular Displacement", "$\\theta$"],
              ["Velocity", "$v=\\dfrac{dx}{dt}$", "Angular Velocity", "$\\omega=\\dfrac{d\\theta}{dt}$"],
              ["Acceleration", "$a=\\dfrac{dv}{dt}$", "Angular Acceleration", "$\\alpha=\\dfrac{d\\omega}{dt}$"],
              ["Mass", "$m$", "Moment of Inertia", "$I$"],
              ["Linear Momentum", "$p=mv$", "Angular Momentum", "$L=I\\omega$"],
              ["Force", "$F=ma$", "Torque", "$\\tau=I\\alpha$"],
              ["Work", "$W=\\int F\\,ds$", "Work", "$W=\\int\\tau\\,d\\theta$"],
              ["Power", "$P=Fv$", "Power", "$P=\\tau\\omega$"],
              ["Kinetic Energy", "$K=\\dfrac{1}{2}mv^2$", "Kinetic Energy", "$K=\\dfrac{1}{2}I\\omega^2$"],
            ].map(([l1, l2, r1, r2], i) => (
              <tr key={i}>
                <td style={tdS}>{l1}</td>
                <td style={{ ...tdS, textAlign: "center" }}>{l2}</td>
                <td style={tdS}>{r1}</td>
                <td style={{ ...tdS, textAlign: "center" }}>{r2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2.14 COMBINED ROTATION AND TRANSLATION */}
      <SecHd id="s214" label="2.14" title="Combined Rotation and Translation Motion" />
      <SubHd id="sub-pure-trans" title="Pure translation motion" />
      <P2>A body is said to be having a pure translation motion if the body does not rotate, i.e., {"$\\omega=0$"} but its centre of mass is moving, i.e., {"$v_{\\rm cm}\\neq 0$"}. <strong>In this case, every point on the body moves with the same velocity as that of centre of mass.</strong></P2>
      <SubHd id="sub-pure-rot" title="Pure rotation motion" />
      <P2>A body is said to be having a pure rotation motion if the centre of mass of the body is stationary, i.e., {"$v_{\\rm cm}=0$"} but the body rotates, i.e., {"$\\omega\\neq 0$"} about an axis passing through the centre of mass.</P2>
      <SubHd id="sub-comb-rot" title="Combined rotation and translation motion" />
      <P2>A body is said to be having both translation and rotation motion simultaneously when the centre of mass is moving, i.e., {"$v_{\\rm cm}\\neq 0$"} and the body is also rotating, i.e., {"$\\omega\\neq 0$"} about an axis passing through the centre of mass.</P2>
      <GraspGripBox>
        <P2 style={{ margin: "0 0 6px" }}>In a pure translation motion{"$\\qquad v_{\\rm cm}\\neq 0,\\;\\omega=0$"}</P2>
        <P2 style={{ margin: "0 0 6px" }}>In a pure rotational motion{"$\\qquad v_{\\rm cm}=0,\\;\\omega\\neq 0$"}</P2>
        <P2 style={{ margin: 0 }}>In a combined motion{"$\\qquad\\qquad v_{\\rm cm}\\neq 0,\\;\\omega\\neq 0$"}</P2>
      </GraspGripBox>

      {/* 2.15 ROLLING */}
      <SecHd id="s215" label="2.15" title="Rolling" />
      <P2><strong>To understand the concept of rolling, we shall consider a cylinder moving on a fixed surface</strong> and having combined rotational and translational motion. We shall break up this motion as</P2>
      <P2 style={{ textAlign: "center", fontWeight: 700 }}>Combined Motion = Pure Translation + Pure Rotation</P2>
      <P2>Let {"$v$"} = velocity of centre of mass of the cylinder, {"$\\omega$"} = angular velocity of the cylinder, {"$r$"} = radius of the cylinder.</P2>
      <P2>Consider points {"$A, B, C, D$"} and {"$O$"} on the cylinder in fig. 2.28. The motion of these points can be represented as shown in the figure.</P2>
      <P2><strong>Pure rolling means no relative motion between the two bodies at the point of contact.</strong></P2>
      <P2>The cylinder is said to be rolling (without slipping) on the ground if the velocity of the point of contact with the ground is zero, i.e., the velocity of point {"$C$"} is zero.</P2>
      <DM>{"$$\\Rightarrow\\quad v-r\\omega=0\\qquad\\text{or}\\qquad v=r\\omega$$"}</DM>
      <P2><strong>Hence, the condition for rolling on a fixed surface is {"$v=r\\omega$"}. If {"$v\\neq r\\omega$"}, the body is said to be slipping on the surface.</strong></P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_4F8DA7611F70CEA1011B} num="FIGURE 2.28" caption="Rolling as combination of pure translation and pure rotation; velocities of points A, B, C, D." />
      <P2>Similarly if the centre of mass moves with an acceleration {"$a$"} and the cylinder has an angular acceleration {"$\\alpha$"}, then during rolling, {"$a=r\\alpha$"}.</P2>
      <P2><strong>During rolling, frictional force {"$f$"} acts on the cylinder. This friction {"$f$"} is static friction and is therefore less than or equal to {"$\\mu N$"}. Hence, during rolling, {"$f\\leq\\mu N$"}.</strong></P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_11DF78AEC16093412EE0} num="FIGURE 2.29" caption="Rolling cylinder on surface: forces mg, N, f; angular acceleration α; linear acceleration a." />
      <P2>During rolling, static friction acts while during slipping, kinetic friction acts. When static friction acts, there is no relative motion between two surfaces at point of contact.</P2>
      <P2><strong>Hence, work done by static friction is zero and there is no loss of mechanical energy due to static friction.</strong></P2>
      <P2><strong>Therefore, during rolling, the mechanical energy of the body is conserved.</strong></P2>
      <GraspGripBox>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 6 }}>Pure rolling means no relative motion between the two bodies at the point of contact.</li>
          <li style={{ marginBottom: 6 }}>For a body rolling on fixed surface, {"$v=r\\omega$"} and {"$a=r\\alpha$"}.</li>
          <li style={{ marginBottom: 6 }}>
            For a body rolling over a moving surface as shown in fig. 2.30, we have {"$v_P=v_Q$"} as a condition for rolling. Here, {"$v-v_P=\\omega r$"} and {"$a-a_P=\\alpha r$"}.
            <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_244C3B65EC1396ABA105} num="FIGURE 2.30" caption="Body rolling over moving surface with velocity v_Q." />
          </li>
          <li style={{ marginBottom: 6 }}>During rolling, static friction acts and during slipping, kinetic friction acts.</li>
          <li style={{ marginBottom: 0 }}>During rolling on a fixed surface, the work done by static friction is zero. Hence, the mechanical energy of the system is conserved. This point is very often used to solve problems.</li>
        </ol>
      </GraspGripBox>
      <SubHd id="sub-friction-dir" title="Direction of friction" />
      <P2>If {"$v>r\\omega$"}, then kinetic friction acts in backward direction.</P2>
      <P2>If {"$v<r\\omega$"}, then kinetic friction acts in forward direction.</P2>
      <P2>If {"$v=r\\omega$"}, then static friction acts. The direction of this friction is opposite to the direction in which the point of contact has a tendency to move if there were no friction.</P2>

      <IllustrationBox num="13">
        <P2 style={{ fontWeight: 700 }}>A cylinder is rolling down an inclined plane. Determine the direction of friction acting on the cylinder. What would be the answer if the cylinder would have been rolling up the plane.</P2>
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>In both cases, due to gravity, the tendency of the point of contact on the cylinder is to slip down the plane.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_630539C74FB339547EB4} num="FIGURE 2.31" caption="Cylinder rolling down (left) and rolling up (right) inclined plane; friction f acts up the plane in both cases." />
        <P2>Therefore, in both cases, the friction acts up the inclined plane as shown in fig. 2.31.</P2>
      </IllustrationBox>

      <IllustrationBox num="14">
        <P2 style={{ fontWeight: 700 }}>A force of magnitude {"$F$"} is acting on a rolling body of mass {"$m$"} and radius {"$R$"} as shown in fig. 2.32. What happens when it enters on a smooth surface.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_EB3D99A386F008CD4207} num="FIGURE 2.32" caption="Rolling body transitioning from rough surface to smooth surface with force F." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>When the rolling body enters on a smooth surface, the force of friction disappears, i.e., {"$f=0$"}. As a result, the angular acceleration of the body about its centre of mass becomes zero. Whatever is the angular speed attained by the body, it continues to rotate with that.</P2>
        <P2>However, the linear acceleration of the center of mass suddenly increases to {"$F/m$"}. As a result, its linear speed starts increasing and the condition {"$v_{\\rm cm}=\\omega R$"} does not hold true and the body will not roll on the smooth surface. The point of contact slips forward as {"$v>\\omega R$"}.</P2>
      </IllustrationBox>

      <IllustrationBox num="15">
        <P2 style={{ fontWeight: 700 }}>A rolling body of mass {"$m$"} and radius {"$R$"} is rolling on a rough surface without any pulling force as shown in fig. 2.33. What happens when it enters on a smooth surface.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_EB8B3A2526553A3666BB} num="FIGURE 2.33" caption="Rolling body (no pulling force) transitioning from rough to smooth surface." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>When the body enters the smooth surface, the force of friction disappears, i.e., {"$f=0$"}. As a result, both acceleration and angular acceleration of the body becomes zero. In this case, the linear speed {"$v_0$"} also remains constant. The body keeps on rolling on the smooth horizontal surface and the point of contact is stationary with respect to the surface.</P2>
      </IllustrationBox>

      <IllustrationBox num="16">
        <P2 style={{ fontWeight: 700 }}>A thin light cord is wound around a uniform cylinder placed on a rough horizontal ground. When free end of the cord is pulled by a constant force {"$F$"}, the cylinder rolls. Denote radius of the cylinder by {"$r$"} and obtain expression for work done by each of the forces acting on the cylinder when center of the cylinder shifts by distance {"$x$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2DC1BC71FBCD2BD3D101} num="FIGURE 2.34" caption="Cord wound around cylinder; force F applied at free end." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Forces acting on the cylinder are its weight {"$W=mg$"}, the normal reaction from the ground {"$N$"}, the tension {"$T=F$"} in the cord and the force of static friction {"$f_s$"}. These forces are shown in fig. 2.35.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A537E50FE0DF475A2656} num="FIGURE 2.35" caption="FBD of rolling cylinder: weight mg, normal N, tension T=F, static friction f_s." />
        <P2>In rolling, point of contact {"$P$"} is at instantaneous rest, the center {"$C$"} moves with velocity {"$v_C=\\omega r$"} and the top point moves with velocity {"$v_A=2v_C=\\omega r$"} both parallel to the surface on which body rolls. The displacement of the top point is equal to the displacement of the free end of the cord and during displacement {"$x$"} of the center, the free end of the cord shifts through a distance {"$2x$"}.</P2>
        <P2>Weight ({"$mg$"}) acts at the centre of cylinder and since the displacement {"$x$"} of the center and weight both are perpendicular to each other, the work done by weight is zero.</P2>
        <DM>{"$$\\therefore\\quad W_{mg}=0$$"}</DM>
        <P2>The normal {"$N$"} and the force of static friction {"$f_s$"} act on the particle of the body which is in contact with the ground and since the particle making contact is at instantaneous rest, work done by normal and force of static friction is zero.</P2>
        <DM>{"$$\\therefore\\quad W_N=0\\quad\\text{and}\\quad W_{f_s}=0$$"}</DM>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_E3A182DE9409BCC4A280} num="FIGURE 2.36" caption="Velocity diagram: top point A has velocity v_A = 2v_C." />
        <P2>The particle of the wheel on which the tension acts is at the top point. Though this particle is also continuously changing but it is not in instantaneous rest and has velocity {"$v_A=2v_C$"}. So in every infinitesimally small time interval {"$dt$"}, the displacement of this particle is {"$v_A\\,dt=2v_C\\,dt$"}. Thus work done {"$dW_T$"} by the tension during the time interval {"$dt$"} is</P2>
        <DM>{"$$dW_T=T(2v_C\\,dt)=2F(v_C\\,dt)$$"}</DM>
        <P2>When the center shifts by a distance {"$x$"}, the work done by the tension becomes</P2>
        <DM>{"$$\\boxed{W_T=W_F=2Fx}$$"}</DM>
      </IllustrationBox>

      {/* 2.16 PATH OF A POINT ON CYLINDER */}
      <SecHd id="s216" label="2.16" title="Path of a Point on Cylinder During Rolling on a Fixed Surface" />
      <P2>Consider a cylinder of radius {"$r$"} rolling on a fixed horizontal surface as shown in the figure. The path of a point on the circumference of the cylinder shown by the dotted line is a cycloid. Its length in one full rotation of the cylinder shown as {"$P_1P_2P_3P_4P_5P_6P_7$"} is equal to {"$8r$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_9F9F311C270BD4C4151D} num="FIGURE 2.37" caption="Cycloid path of point P on rolling cylinder; total arc length = 8r per revolution." />
      <P2>This can be proved as given below. Let</P2>
      <P2>{"$v$"} = velocity of centre of the cylinder, {"$\\omega$"} = angular velocity of the cylinder</P2>
      <P2>Then, {"$v=\\omega r$"} and in time {"$t$"}, the cylinder has rotated by angle {"$\\theta=\\omega t$"}. The speed of point {"$P$"} at this instant is</P2>
      <DM>{"$$\\frac{ds}{dt}=\\sqrt{v^2+v^2+2vv\\cos(\\pi-\\theta)}=2v\\sin\\left(\\frac{\\theta}{2}\\right)=2v\\sin\\left(\\frac{\\omega t}{2}\\right)$$"}</DM>
      <DM>{"$$\\therefore\\quad s=\\int_0^{2\\pi/\\omega}2v\\sin\\left(\\frac{\\omega t}{2}\\right)dt=\\left[-\\frac{4v}{\\omega}\\cos\\left(\\frac{\\omega t}{2}\\right)\\right]_0^{2\\pi/\\omega}=\\frac{8v}{\\omega}=8r$$"}</DM>
    </>
  );
};

// CSS helpers for comparison table
const thS = { border: "1.5px solid #555", padding: "6px 10px", textAlign: "center", fontWeight: 700, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13 };
const tdS = { border: "1px solid #888", padding: "5px 9px", verticalAlign: "top", fontSize: 13.5 };

const content_b3 = (bb) => {
  const { SecHd, SubHd, SubSubHd, P2, DM, DefBox, GraspGripBox, IllustrationBox, Fig, P_COLOR } = bb;
  return (
    <>
      {/* 2.17 ACCELERATION OF CYLINDER ON ROUGH INCLINED PLANE */}
      <SecHd id="s217" label="2.17" title="Acceleration of Cylinder During Rolling on a Rough Inclined Plane" />
      <P2>Consider a cylinder of mass {"$m$"} and radius {"$r$"} rolling down a rough plane inclined at an angle {"$\\theta$"} to the horizontal. Let us describe the motion of the cylinder when it rolls down without slipping. In this case, the centre of mass of the cylinder moves in a straight line with some acceleration.</P2>
      <P2>Let {"$a$"} = acceleration of the centre of mass, {"$\\alpha$"} = angular acceleration of the cylinder, {"$m$"} = mass of the cylinder, {"$I$"} = moment of Inertia about axis of the cylinder, {"$k$"} = radius of gyration about axis of the cylinder.</P2>
      <P2>The external forces acting on the cylinder are Weight ({"$mg$"}), Normal force ({"$N$"}) and Friction ({"$f$"}).</P2>
      <P2>The free body diagram is shown in fig. 2.38. The forces can be resolved as shown.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1F942E7E05577B8C5D48} num="FIGURE 2.38" caption="FBD of cylinder rolling on inclined plane: mg sin θ component, friction f, normal N." />
      <P2>In the direction of acceleration, we have</P2>
      <DM>{"$$\\Sigma F=ma\\qquad\\text{i.e.,}\\qquad mg\\sin\\theta-f=ma\\qquad\\ldots(1)$$"}</DM>
      <P2>Also, about the axis of cylinder, we have</P2>
      <DM>{"$$\\Sigma\\tau=I\\alpha\\qquad\\text{i.e.,}\\qquad fr=I\\alpha\\qquad\\ldots(2)$$"}</DM>
      <P2>Since the cylinder is rolling, we have {"$a=r\\alpha\\qquad\\ldots(3)$"}</P2>
      <P2>From (3), {"$\\alpha=\\dfrac{a}{r}$"} and from (2), {"$f=\\dfrac{I\\alpha}{r}=\\dfrac{Ia}{r^2}$"}</P2>
      <P2>Substituting {"$f$"} in (1), we get</P2>
      <DM>{"$$\\begin{aligned} & mg\\sin\\theta-\\frac{Ia}{r^2}=ma \\\\ & \\therefore\\quad a=\\frac{mg\\sin\\theta}{m+\\dfrac{I}{r^2}}\\quad\\text{or}\\quad\\boxed{a=\\frac{g\\sin\\theta}{1+\\dfrac{I}{mr^2}}} \\end{aligned}$$"}</DM>
      <SubSubHd id="sub-solid-cyl" title="For a solid cylinder," />
      <DM>{"$$I=\\frac{mr^2}{2}\\qquad\\Rightarrow\\quad\\frac{I}{mr^2}=\\frac{1}{2}\\qquad\\therefore\\quad a=\\frac{g\\sin\\theta}{1+\\frac{1}{2}}=\\frac{2}{3}g\\sin\\theta$$"}</DM>
      <SubSubHd id="sub-hollow-cyl" title="For a hollow cylinder," />
      <DM>{"$$I=mr^2\\qquad\\Rightarrow\\quad\\frac{I}{mr^2}=1\\qquad\\therefore\\quad a=\\frac{g\\sin\\theta}{1+1}=\\frac{1}{2}g\\sin\\theta$$"}</DM>
      <SubSubHd id="sub-solid-sphere" title="For a solid sphere," />
      <DM>{"$$I=\\frac{2}{5}mr^2\\qquad\\Rightarrow\\quad\\frac{I}{mr^2}=\\frac{2}{5}\\qquad\\therefore\\quad a=\\frac{g\\sin\\theta}{1+\\frac{2}{5}}=\\frac{5}{7}g\\sin\\theta$$"}</DM>

      {/* 2.18 KINETIC ENERGY DURING ROLLING */}
      <SecHd id="s218" label="2.18" title="Kinetic Energy During Rolling" />
      <P2>Consider a body of mass {"$m$"} and radius {"$r$"} rolling on a fixed surface such that {"$v$"} = velocity of its centre of mass, {"$I$"} = moment of inertia about axis through its centre of mass, {"$\\omega$"} = angular velocity of rotation. Such a body shall posses both translational and rotational kinetic energies.</P2>
      <P2>Its translational kinetic energy is given by</P2>
      <DM>{"$$K_T=\\frac{1}{2}mv^2$$"}</DM>
      <P2>Its rotational kinetic energy is given by</P2>
      <DM>{"$$K_R=\\frac{1}{2}I\\omega^2$$"}</DM>
      <P2>Its total kinetic energy is therefore given by</P2>
      <DM>{"$$K=K_T+K_R=\\frac{1}{2}mv^2+\\frac{1}{2}I\\omega^2=\\frac{1}{2}mv^2+\\frac{1}{2}I\\left(\\frac{v^2}{r^2}\\right)=\\frac{1}{2}mv^2\\left(1+\\frac{I}{mr^2}\\right)$$"}</DM>
      <GraspGripBox>
        <P2 style={{ margin: "0 0 8px" }}>When a body of mass {"$m$"}, radius {"$r$"} and moment of inertia {"$I$"} is rolling on a fixed surface, then the ratio of its translational to rotational kinetic energy is given by</P2>
        <DM>{"$$K_T:K_R=\\frac{1}{2}mv^2:\\frac{1}{2}I\\left(\\frac{v}{r}\\right)^2=mr^2:I$$"}</DM>
      </GraspGripBox>

      {/* 2.19 VELOCITY OF BODY ROLLING ON ROUGH INCLINED PLANE */}
      <SecHd id="s219" label="2.19" title="Velocity of a Body Rolling on a Rough Inclined Plane" />
      <P2>Consider a round body of mass {"$m$"} and radius {"$r$"} rolling down a plane inclined at an angle {"$\\theta$"} to the horizontal. Let {"$I$"} = moment of inertia about axis through its centre of mass, {"$k$"} = radius of gyration about axis through its centre of mass. Let the body roll down from rest (from height {"$h$"}) as shown in fig. 2.39.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1EBB9085C2F1C09C9CD0} num="FIGURE 2.39" caption="Body rolling down inclined plane from height h; velocity v at bottom." />
      <P2>We shall calculate by two methods the velocity ({"$v$"}) of its centre of mass when it has reached the bottom of inclined plane.</P2>
      <SubHd id="sub-method1" title="Method 1:" />
      <P2>We have seen earlier that the acceleration of its centre of mass is given by</P2>
      <DM>{"$$a=\\frac{g\\sin\\theta}{1+\\dfrac{I}{mr^2}}$$"}</DM>
      <P2>Its displacement shall be {"$s=\\dfrac{h}{\\sin\\theta}$"}</P2>
      <P2>Applying equation of motion {"$v^2-u^2=2as$"}, we get</P2>
      <DM>{"$$\\begin{aligned} & v^2-0^2=2\\times\\frac{g\\sin\\theta}{1+\\dfrac{I}{mr^2}}\\times\\frac{h}{\\sin\\theta} \\\\ \\therefore\\quad & \\boxed{v=\\sqrt{\\frac{2gh}{1+\\dfrac{I}{mr^2}}}} \\end{aligned}$$"}</DM>
      <SubHd id="sub-method2" title="Method 2:" />
      <P2>We have seen earlier that during rolling, the mechanical energy of body is conserved. Hence,</P2>
      <P2>Loss in P.E. = Gain in K.E.</P2>
      <DM>{"$$\\Rightarrow\\quad mgh=\\frac{1}{2}mv^2\\left(1+\\frac{I}{mr^2}\\right)\\qquad\\therefore\\quad\\boxed{v=\\sqrt{\\frac{2gh}{1+\\dfrac{I}{mr^2}}}}$$"}</DM>

      {/* 2.20 WORK DONE BY A TORQUE */}
      <SecHd id="s220" label="2.20" title="Work Done by a Torque" />
      <P2>When a torque {"$\\tau$"} rotates a body by angle {"$\\theta$"}, the work done by the torque is given by {"$W=\\tau\\theta$"}.</P2>
      <SubHd id="sub-work-energy" title="Work Energy Theorem" />
      <P2>The work done by a torque is equal to the change in KE of the body, i.e., {"$W=\\Delta KE$"}. If {"$\\omega_0$"} and {"$\\omega$"} are respectively the initial and final angular velocities, then</P2>
      <DM>{"$$W=\\int\\tau\\,d\\theta=\\frac{1}{2}I\\omega^2-\\frac{1}{2}I\\omega_0^2=\\frac{1}{2}I(\\omega^2-\\omega_0^2)$$"}</DM>

      <IllustrationBox num="17">
        <P2 style={{ fontWeight: 700 }}>Consider two unequal masses connected by a string which passes over a pulley of moment of inertia {"$I_0$"} and radius {"$R$"}. Let {"$m_2$"} be greater than {"$m_1$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_99ACBE61159E068F69A2} num="FIGURE 2.40" caption="Atwood machine with massive pulley of moment of inertia I₀ and radius R." />
        <P2 style={{ fontWeight: 700 }}>Find the angular acceleration of the pulley and the acceleration of masses, assuming that the string does not slip on the pulley.</P2>
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Since the string does not slip on the pulley, the linear accelerations of {"$m_1, m_2$"} and points on the rim of the pulley are same.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_096B0AB4D82008602E8A} num="FIGURE 2.41" caption="FBD: tensions T₁ and T₂ on either side; masses m₁ and m₂ with acceleration a." />
        <P2>Thus, {"$a=\\alpha R\\qquad\\ldots(1)$"}</P2>
        <P2>From F.B.Ds, we get</P2>
        <DM>{"$$\\begin{aligned} & m_2g-T_2=m_2a\\qquad\\ldots(2) \\\\ & T_1-m_1g=m_1a\\qquad\\ldots(3) \\\\ & T_2R-T_1R=I_0\\alpha\\qquad\\ldots(4) \\end{aligned}$$"}</DM>
        <P2>There are four unknown quantities, namely {"$T_1, T_2, a$"} and {"$\\alpha$"} and four equations. After solving eqns. (1), (2), (3) and (4), we obtain</P2>
        <DM>{"$$\\boxed{a=\\frac{(m_2-m_1)g}{m_1+m_2+I_0/R^2}}\\qquad\\text{and}\\qquad\\boxed{\\alpha=\\frac{(m_2-m_1)g}{R(m_1+m_2+I_0/R^2)}}$$"}</DM>
        <P2><strong>Note:</strong> If {"$I_0=0$"}, then {"$T_2=T_1$"} from eqn. (4). This explains why we have been taking the value of tension to be same on either side of the pulley for light pulleys.</P2>
        <SubSubHd id="sub-alt-17" title="Alternative Method" />
        <P2><strong>We now solve the same problem using energy consideration.</strong> Since the string does not slip on the pulley, there will be no frictional loss and mechanical energy should be conserved. Let the displacement of {"$m_2$"} be {"$s$"} in the downward direction. Consequently, {"$m_1$"} moves up by the same amount.</P2>
        <P2>The change in P.E. of the system is {"$(-m_2gs+m_1gs)$"}.</P2>
        <P2>If the velocity of the blocks is {"$v$"} at this position, the mechanical energy conservation yields.</P2>
        <DM>{"$$\\Delta KE+\\Delta PE=0$$"}</DM>
        <DM>{"$$\\Rightarrow\\quad-m_2gs+m_1gs+\\frac{1}{2}m_1v^2+\\frac{1}{2}m_2v^2+\\frac{1}{2}I_0\\omega^2=0$$"}</DM>
        <P2>Substituting {"$\\omega=v/R$"}, we obtain</P2>
        <DM>{"$$\\frac{1}{2}\\left[\\frac{I_0}{R^2}+m_1+m_2\\right]v^2=(m_2-m_1)gs\\qquad\\Rightarrow\\quad v^2=\\frac{2(m_2-m_1)gs}{[m_1+m_2+I_0/R^2]}$$"}</DM>
        <P2>Differentiating w.r.t. time, we obtain</P2>
        <DM>{"$$2va=\\frac{2(m_2-m_1)g}{(m_1+m_2+I_0/R^2)}v\\qquad\\therefore\\quad a=\\frac{(m_2-m_1)g}{m_1+m_2+I_0/R^2}$$"}</DM>
        <DM>{"$$\\alpha=\\frac{(m_2-m_1)g}{R(m_1+m_2+I_0/R^2)}$$"}</DM>
      </IllustrationBox>

      {/* 2.21 VELOCITY DUE TO ROTATION ABOUT CM */}
      <SecHd id="s221" label="2.21" title="Velocity Due to Rotation About Centre of Mass" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_C9CF5DE95EBCCBD807B9} num="FIGURE 2.42" caption="Body with translation and rotation; velocity of point P = v_CM + ω × r." />
      <P2>Consider a body that is having both translation and rotation motion.</P2>
      <P2>Let {"$\\vec{v}_{CM}$"} = velocity of its centre of mass, {"$\\vec{\\omega}$"} = its angular velocity of rotation, {"$\\vec{r}$"} = position vector of point {"$P$"} w.r.t. {"$CM$"}.</P2>
      <P2>Then the velocity of point {"$P$"} is given by</P2>
      <DM>{"$$\\vec{v}_P=\\vec{v}_{CM}+\\vec{v}_{P/CM}=\\vec{v}_{CM}+\\vec{\\omega}\\times\\vec{r}$$"}</DM>

      <IllustrationBox num="18">
        <P2 style={{ fontWeight: 700 }}>A uniform disc of radius {"$R$"} is rotating about the cylindrical axis with angular velocity {"$\\omega$"} and the cylindrical axis is moving with velocity {"$V$"} with respect to ground. (see fig. 2.43). Find the velocity of points {"$A, B, C$"} and {"$D$"} with respect to ground.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F2774DFE6067165690F3} num="FIGURE 2.43" caption="Disc with ω rotating; axis moving at V: points A (bottom), B (top), C (right), D (left)." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Let {"$X$"} and {"$Y$"} axis point in the horizontal and vertical directions respectively.</P2>
        <P2>The velocity {"$\\vec{v}_{CM}$"} is equal to {"$V\\hat{i}$"}.</P2>
        <DM>{"$$\\begin{aligned} & \\vec{v}_A=\\vec{v}_{CM}+\\vec{v}_{A/CM}=V\\hat{i}-\\omega R\\hat{i}=\\boxed{(V-\\omega R)\\hat{i}} \\\\ & \\vec{v}_B=\\vec{v}_{CM}+\\vec{v}_{B/CM}=V\\hat{i}+\\omega R\\hat{i}=\\boxed{(V+\\omega R)\\hat{i}} \\\\ & \\vec{v}_C=\\vec{v}_{CM}+\\vec{v}_{C/CM}=\\boxed{V\\hat{i}-\\omega R\\hat{j}} \\\\ & \\vec{v}_D=\\vec{v}_{CM}+\\vec{v}_{D/CM}=\\boxed{V\\hat{i}+\\omega R\\hat{j}} \\end{aligned}$$"}</DM>
      </IllustrationBox>

      {/* 2.22 ANGULAR MOMENTUM NOT THROUGH CM */}
      <SecHd id="s222" label="2.22" title="Angular Momentum of a Rotating Body About an Axis Not Passing Through Centre of Mass" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_883FE9D44789C7026C8A} num="FIGURE 2.44" caption="Body with translation and rotation; angular momentum about point O not on axis." />
      <P2>Consider a body that is having both translation and rotation motion. Let {"$O$"} be some point that does not lie on the axis of rotation.</P2>
      <P2>Let {"$\\vec{v}_{CM}$"} = velocity of its centre of mass, {"$\\vec{\\omega}$"} = its angular velocity of rotation, {"$\\vec{r}_{CM}$"} = position vector of point {"$CM$"} w.r.t. point {"$O$"}, {"$\\vec{L}_{CM}$"} = angular momentum about axis passing through {"$CM$"}, {"$I_{CM}$"} = moment of inertia about axis passing through {"$CM$"}.</P2>
      <P2>Then the angular momentum about point {"$O$"} is given by</P2>
      <DM>{"$$\\vec{L}_O=\\vec{L}_{CM}+\\vec{r}_{CM}\\times M\\vec{v}_{CM}=I_{CM}\\vec{\\omega}+\\vec{r}_{CM}\\times M\\vec{v}_{CM}$$"}</DM>
      <P2>This relation can be interpreted as the total angular momentum to be sum of angular momentum about the centre of mass and angular momentum of the motion of center of mass {"$CM$"} with respect to {"$O$"} as if all the mass were concentrated at the center of mass.</P2>
      <GraspGripBox>
        <P2 style={{ margin: "0 0 6px" }}>Consider a body that is undergoing both translation and rotation motion.</P2>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>The angular momentum of the body about some point {"$O$"} is written as <DM>{"$$\\vec{L}_O=I_{CM}\\vec{\\omega}+\\vec{r}_{CM}\\times M\\vec{v}_{CM}$$"}</DM></li>
          <li style={{ marginBottom: 8 }}>If the angular momentum is taken about centre of mass, then the second term vanishes and hence, the angular momentum about {"$CM$"} is simplified and written as <DM>{"$$\\vec{L}_{CM}=I_{CM}\\vec{\\omega}$$"}</DM></li>
          <li style={{ marginBottom: 0 }}>If the body is undergoing only translation motion, then the angular momentum of the body about point {"$O$"} is written as {"$\\vec{L}_O=\\vec{r}_{CM}\\times M\\vec{v}_{CM}$"}</li>
        </ol>
      </GraspGripBox>

      <IllustrationBox num="19">
        <P2 style={{ fontWeight: 700 }}>A cylinder of mass {"$M$"} and radius {"$R$"} is moving on a horizontal surface with angular velocity {"$\\omega$"} and its cylindrical axis is moving with velocity {"$V_0$"} (see fig. 2.45). Find the angular momentum of the cylinder w.r.t. to {"$P$"}, {"$Q$"} and {"$S$"} shown in the figure.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_EB0F044CE13B2D4766B2} num="FIGURE 2.45" caption="Cylinder moving at V₀ with angular velocity ω; points P (bottom), Q (centre-level), S (top-level)." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <DM>{"$$L_{CM}=I_{CM}\\omega=\\frac{MR^2}{2}\\omega$$"}</DM>
        <DM>{"$$\\boxed{L_P=\\frac{MR^2}{2}\\omega+MV_0R}$$"}</DM>
        <DM>{"$$\\boxed{L_Q=\\frac{MR^2}{2}\\omega+0=\\frac{MR^2}{2}\\omega}$$"}</DM>
        <DM>{"$$\\boxed{L_S=\\frac{MR^2}{2}\\omega-MV_0R}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="20">
        <P2 style={{ fontWeight: 700 }}>A uniform cylinder of mass {"$M$"} and radius {"$R$"} starts descending at a moment {"$t=0$"} due to gravity (see fig. 2.46). Find (a) tension in the thread, (b) acceleration of the centre of mass, (c) the angular acceleration.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D939622A6BC0E1473933} num="FIGURE 2.46" caption="Cylinder M unwinding from thread, descending under gravity." />
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_9A9AA742C537942A6E6A} num="FIGURE 2.47" caption="FBD of descending cylinder: tension T upward, weight Mg downward, acceleration a_CM." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>From FBD, we have</P2>
        <DM>{"$$Mg-T=Ma_{CM}\\qquad\\ldots(1)$$"}</DM>
        <DM>{"$$TR=I_{CM}\\alpha=\\frac{MR^2}{2}\\alpha\\qquad\\ldots(2)$$"}</DM>
        <DM>{"$$a_{CM}=\\alpha R\\qquad\\ldots(3)$$"}</DM>
        <P2>On solving eqns. (1), (2) and (3) we obtain</P2>
        <DM>{"$$\\boxed{a_{cm}=\\frac{2}{3}g}\\;,\\quad\\boxed{\\alpha=\\frac{2g}{3R}}\\quad\\text{and}\\quad\\boxed{T=\\frac{Mg}{3}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="21">
        <P2 style={{ fontWeight: 700 }}>A solid cylinder of mass {"$m$"} and radius {"$R$"} starts rolling on an inclined plane (see fig. 2.48). What is the minimum value of coefficient of static friction for it to roll?</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_739E248D089710333CFC} num="FIGURE 2.48" caption="Solid cylinder on inclined plane at angle θ." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>A cylinder can roll only on a rough surface. If the surface is smooth, the angular acceleration will be zero since there is no torque about the centre of mass to provide the angular acceleration.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_E67AB56371B9EC22446B} num="FIGURE 2.49" caption="FBD of cylinder on inclined plane: mg sin θ, normal N, friction f, acceleration a." />
        <P2>From FBD, we have</P2>
        <DM>{"$$mg\\sin\\theta-f=ma\\qquad\\ldots(1)$$"}</DM>
        <DM>{"$$N=mg\\cos\\theta\\qquad\\ldots(2)$$"}</DM>
        <P2>Also, about the axis of cylinder</P2>
        <DM>{"$$fr=I\\alpha\\qquad\\ldots(3)$$"}</DM>
        <P2>Since the cylinder is rolling,</P2>
        <DM>{"$$a=r\\alpha\\qquad\\ldots(4)$$"}</DM>
        <P2>From (1), (3) and (4),</P2>
        <DM>{"$$f=\\frac{mg\\sin\\theta}{3}$$"}</DM>
        <P2>Since, {"$f\\leq\\mu_s N$"}, we have {"$\\dfrac{mg\\sin\\theta}{3}\\leq\\mu_s mg\\cos\\theta$"}</P2>
        <DM>{"$$\\therefore\\quad\\boxed{\\mu_s\\geq\\frac{\\tan\\theta}{3}}$$"}</DM>
      </IllustrationBox>

      {/* 2.23 INSTANTANEOUS AXIS OF ROTATION */}
      <SecHd id="s223" label="2.23" title="Instantaneous Axis of Rotation (IAOR)" />
      <P2>Up till now, we have treated the motion of rigid bodies as a combination of translational and rotational motion. It is also possible, however to treat the same motion as one of pure rotation about a certain axis. In general, this axis of rotation will not be fixed in space. So, we shall call this axis as <strong>instantaneous axis of rotation (IAOR)</strong>.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_120ED64137707BDFC0D4} num="FIGURE 2.50" caption="Cylinder rolling on fixed surface: IAOR passes through point of contact P." />
      <P2>Consider a cylinder rolling on a fixed surface. In this case, the point of contact {"$'P'$"} is stationary. Therefore, the instantaneous axis rotation must pass through this point.</P2>
      <P2>To verify that this indeed is pure rotation about an axis passing through point {"$P$"}, let us find the velocity of points {"$A$"}, {"$B$"} and {"$C$"} by using the equations</P2>
      <DM>{"$$\\begin{gathered} \\vec{v}_A=\\vec{v}_{CM}+\\vec{v}_{A/CM} \\\\ \\vec{v}_B=\\vec{v}_{CM}+\\vec{v}_{B/CM} \\\\ \\vec{v}_C=\\vec{v}_{CM}+\\vec{v}_{C/CM} \\end{gathered}$$"}</DM>
      <DM>{"$$\\therefore\\quad v_A=v_{CM}+\\omega R=v+v=2v\\quad\\text{and}\\quad v_B=v_C=\\sqrt{v_{CM}^2+(\\omega R)^2}=\\sqrt{v^2+v^2}=\\sqrt{2}v$$"}</DM>
      <P2>in the directions indicated in the figure. The results obtained are same by considering that the instantaneous axis passes through point {"$P$"}.</P2>
      <P2>Since, {"$AP=2R$"} and {"$PC=PB=\\sqrt{2}R$"}, we get</P2>
      <DM>{"$$v_A=\\omega(2R)=2\\omega R=2v\\quad\\text{and}\\quad v_B=v_C=\\omega(\\sqrt{2}R)=\\sqrt{2}\\omega R=\\sqrt{2}v$$"}</DM>

      <SubHd id="sub-ke-iaor" title="Kinetic Energy using Instantaneous axis of rotation (IAOR)" />
      <P2>The kinetic energy of cylinder of mass {"$M$"} and radius {"$R$"} rolling on a fixed surface (Refer fig. 2.40) is</P2>
      <DM>{"$$K_{\\rm Total}=K_{\\rm Translation}+K_{\\rm Rotation}=\\frac{1}{2}Mv_{CM}^2+\\frac{1}{2}I_{CM}\\omega^2=\\frac{1}{2}(I_{CM}+MR^2)\\omega^2=\\frac{1}{2}I_P\\omega^2$$"}</DM>
      <GraspGripBox>
        <P2 style={{ margin: "0 0 6px" }}>Let {"$I$"} = Moment of inertia about {"$IAOR$"}, {"$\\vec{L}$"} = Angular momentum about {"$IAOR$"}, {"$\\vec{\\omega}$"} = Angular velocity, {"$\\vec{r}$"} = Position vector of {"$CM$"} w.r.t. {"$IAOR$"}.</P2>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>The total Kinetic energy can be written as <DM>{"$$K=\\frac{1}{2}Mv_{CM}^2+\\frac{1}{2}I_{CM}\\omega^2=\\frac{1}{2}(Mr^2+I_{CM})\\omega^2=\\frac{1}{2}I\\omega^2$$"}</DM></li>
          <li style={{ marginBottom: 0 }}>Similarly, the angular momentum about {"$IAOR$"} can be written as <P2 style={{ margin: "8px 0 0" }}>{"$\\vec{L}=I_{CM}\\vec{\\omega}+\\vec{r}_{CM}\\times M\\vec{v}_{CM}=(I_{CM}+Mr^2)\\vec{\\omega}=I\\vec{\\omega}$"}</P2></li>
        </ol>
      </GraspGripBox>

      <SubHd id="sub-rot-newton" title="Rotational Equivalent of the Newton's second Law" />
      <P2>Differentiating terms on both the sides of equation {"$\\vec{l}=I_{CM}\\vec{\\omega}+\\vec{r}_{CM}\\times M\\vec{v}_{CM}$"} with respect to time, we get</P2>
      <DM>{"$$\\frac{d\\vec{L}}{dt}=I_{CM}\\vec{\\alpha}+\\vec{v}_{CM}\\times M\\vec{v}_{CM}+\\vec{r}_{CM}\\times M\\vec{a}_{CM}$$"}</DM>
      <P2>The second term {"$\\vec{v}_{CM}\\times M\\vec{v}_{CM}$"} vanishes, so we can write</P2>
      <DM>{"$$\\vec{\\tau}=I_{CM}\\vec{\\alpha}+\\vec{r}_{CM}\\times M\\vec{a}_{CM}$$"}</DM>
      <GraspGripBox>
        <P2 style={{ margin: "0 0 6px" }}>Consider a body that is undergoing both translation and rotation motion under the action of certain forces acting on the body.</P2>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>The net torque due these forces about some point {"$O$"} is written as <DM>{"$$\\vec{\\tau}_O=I_{CM}\\vec{\\alpha}+\\vec{r}_{CM}\\times M\\vec{a}_{CM}$$"}</DM></li>
          <li style={{ marginBottom: 8 }}>If the torque is taken about centre of mass, then the second term vanishes and hence, the net torque due these forces about {"$CM$"} is simplified and written as <DM>{"$$\\vec{\\tau}_{CM}=I_{CM}\\vec{\\alpha}$$"}</DM></li>
          <li style={{ marginBottom: 0 }}>The torque equation is also simplified when written about IAOR which we shall come across later. Therefore, while solving problems, we prefer to write torque equation either about {"$CM$"} or about {"$IAOR$"}.</li>
        </ol>
      </GraspGripBox>

      <SubHd id="sub-iaor-location" title="Location of Instantaneous Axis of Rotation (IAOR)" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_71A2CAD0C8F66F4FCBB8} num="FIGURE 2.51" caption="Body in rotation: IAOR through O; velocity of A is v_A = ω × r, perpendicular to r." />
      <P2>Every particle in a plane perpendicular to {"$IAOR$"} move with different velocities and accelerations. However, they all have the same angular velocity and same angular acceleration. Such a section of a body in rotation is shown in the fig. 2.51. As the {"$IAOR$"} passes through point {"$O$"}, the velocity of particle {"$O$"} is zero.</P2>
      <P2>The velocity of particle {"$A$"} is</P2>
      <DM>{"$$\\vec{v}_A=\\vec{v}_O+\\vec{v}_{AO}=0+\\vec{\\omega}\\times\\vec{r}=\\vec{\\omega}\\times\\vec{r}$$"}</DM>
      <P2>where {"$\\vec{v}_{AO}$"} is the velocity of particle {"$A$"} with respect to particle {"$O$"}. The direction of velocity of particle {"$A$"} is perpendicular to vector {"$\\vec{r}$"} and its magnitude is {"$v_A=\\omega r$"}.</P2>
      <P2>The location of the {"$IAOR$"} is sometimes very helpful in solving problems. In a body having combined translation and rotation motion, <strong>IAOR may be determined using the fact that a line drawn from the IAOR to a point is always perpendicular to the velocity of the point.</strong> We often come across the following situations.</P2>
      <P2><strong>(a)</strong> In a plane perpendicular to IAOR, the direction of velocities of two particles of the body is known where the velocities of the two particles are neither parallel nor antiparallel. In this case, IAOR passes through the intersection of perpendiculars drawn to the velocity vectors of the two particles.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_00011F934B84ECA4A5C7} num="FIGURE 2.52" caption="IAOR at intersection of perpendiculars to non-parallel velocity vectors of A and B." />
      <P2><strong>(b)</strong> In a plane perpendicular to IAOR, the magnitude as well as the direction of velocities of two particles of the body is known where the velocities of the two particles are parallel or antiparallel. In this case, IAOR passes through the intersection of the line joining the two particles and a line joining tips of the velocity vectors.</P2>
      <P2>When the velocities of the two particles are anti parallel, IAOR lies on the line joining the two particles but between the two particles as shown in the fig. 2.53.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_70A7BF4D10A167F9A7AD} num="FIGURE 2.53" caption="Anti-parallel velocities: IAOR between A and B." />
      <P2>When the velocities of the two particles are parallel, IAOR lies on the line joining the two particles but on the side of particle whose velocity is less as shown in the fig. 2.54.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_67572B9C026BA90B8A2C} num="FIGURE 2.54" caption="Parallel velocities: IAOR beyond the particle with smaller velocity." />
      <P2><strong>(c)</strong> In a plane perpendicular to IAOR, the magnitude and direction of velocity {"$\\vec{v}$"} of one particle as well as angular velocity {"$\\vec{\\omega}$"} of the body are known. In this case, IAOR passes through the point that is at distance {"$r=v/\\omega$"} from the particle in the direction that is perpendicular to its velocity vector.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D3C04D00AE495E4E844C} num="FIGURE 2.55" caption="IAOR at distance r = v/ω from particle, perpendicular to velocity." />
      <GraspGripBox>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>In case of a rotating body, the angular velocity of first point, w.r.t., to second point is equal to the angular velocity of second point w.r.t. the first point, i.e., {"$\\vec{\\omega}_{12}=\\vec{\\omega}_{21}$"}. However, their relative linear velocities are not equal, i.e., {"$\\vec{v}_{12}\\neq\\vec{v}_{21}$"}. Here, {"$\\vec{v}_{12}=-\\vec{v}_{21}$"}. Therefore, {"$\\vec{\\omega}_{12}=\\vec{\\omega}_{21}$"} and {"$\\vec{v}_{12}=-\\vec{v}_{21}$"}.</li>
          <li style={{ marginBottom: 8 }}>The magnitude of angular velocity {"$\\omega$"} of rigid body can be expressed as {"$\\omega=\\dfrac{|\\vec{v}_A-\\vec{v}_B|}{l}$"} where, {"$\\vec{v}_A$"} and {"$\\vec{v}_B$"} are the components of velocities of particles {"$A$"} and {"$B$"} in the direction perpendicular to {"$AB$"} and the length {"$AB=l$"}.</li>
          <li style={{ marginBottom: 0 }}>The velocity of the mid point {"$C$"} (but not necessarily the centre of mass) of the line joining the points {"$A$"} and {"$B$"} have a velocity {"$\\vec{v}_C=\\dfrac{\\vec{v}_A+\\vec{v}_B}{2}$"}.</li>
        </ol>
      </GraspGripBox>
    </>
  );
};

const content_b4 = (bb) => {
  const { SecHd, SubHd, SubSubHd, P2, DM, DefBox, GraspGripBox, IllustrationBox, Fig, P_COLOR } = bb;
  return (
    <>
      {/* 2.24 VELOCITY AND ACCELERATION RELATION BETWEEN TWO POINTS */}
      <SecHd id="s224" label="2.24" title="Velocity and Acceleration Relation Between Two Points" />
      <P2>Consider two points {"$A$"} and {"$B$"} on a body undergoing both translation and rotation motions. Let {"$O$"} be the instantaneous axis of rotation.</P2>
      <P2>If the velocity {"$\\vec{v}_A$"} of point {"$A$"} and angular velocity {"$\\vec{\\omega}$"} of the body are known, then as shown in the fig. 2.63, the velocity of point {"$B$"} can be obtained as</P2>
      <P2>either {"$\\quad\\vec{v}_B=\\vec{v}_A+\\vec{\\omega}\\times\\overrightarrow{AB}=\\vec{v}_A+\\vec{\\omega}\\times\\vec{r}_{BA}$"}</P2>
      <P2>or {"$\\quad\\quad\\quad\\vec{v}_B=\\vec{\\omega}\\times\\overrightarrow{OB}=\\vec{\\omega}\\times\\vec{r}_{BO}$"}</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6E432F728222DE38D284} num="FIGURE 2.63" caption="Velocity relation between two points A and B; IAOR at O." />
      <P2>If the acceleration {"$\\vec{a}_A$"} of point {"$A$"}, angular velocity {"$\\vec{\\omega}$"} of the body and angular acceleration {"$\\vec{\\alpha}$"} of the body are known, then as shown in the fig. 2.64, the acceleration of point {"$B$"} can be obtained as either</P2>
      <DM>{"$$\\begin{aligned} \\vec{a}_B &= \\vec{a}_A+\\vec{\\alpha}\\times\\overrightarrow{AB}+\\omega^2\\overrightarrow{BA}=\\vec{a}_A+\\vec{\\alpha}\\times\\vec{r}_{BA}-\\omega^2\\vec{r}_{BA} \\\\ \\text{or }\\vec{a}_B &= \\vec{\\alpha}\\times\\overrightarrow{OB}+\\omega^2\\overrightarrow{BO}=\\vec{\\alpha}\\times\\vec{r}_{BO}-\\omega^2\\vec{r}_{BO} \\end{aligned}$$"}</DM>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6639F042442F7DA2A0B5} num="FIGURE 2.64" caption="Acceleration relation between two points A and B using superposition." />

      <SubHd id="sub-accel-disc" title="Acceleration relations by Superposition Method of a Disc Rolling on a fixed surface" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5AA1563DE40466321FA5} num="FIGURE 2.65" caption="Disc rolling on fixed surface; centre C acceleration = a, IAOR at contact point O." />
      <P2>Consider a disc of radius {"$R$"} rolling on a fixed horizontal surface. Let the acceleration of the centre {"$C$"} be {"$a$"} and the angular acceleration of the disc be {"$\\alpha$"}. Then {"$a=\\alpha R$"}. As the disc rolls on a fixed surface, the point of contact {"$O$"} does not slide on the surface. The component of its acceleration parallel to the surface is zero. However, it has an acceleration component towards the center. The acceleration in vector form of point {"$C$"} is {"$\\overrightarrow{a_C}=a\\hat{i}$"} and that of point {"$O$"} is</P2>
      <DM>{"$$\\overrightarrow{a_O}=\\overrightarrow{a_C}+\\vec{\\alpha}\\times\\overrightarrow{CO}+\\omega^2\\overrightarrow{OC}=a\\hat{i}-\\alpha R\\hat{i}+\\omega^2R\\hat{j}=\\omega^2R\\hat{j}$$"}</DM>
      <P2>Now, we will see how accelerations of other points can be calculated. Consider a disc of radius {"$R$"} whose centre {"$C$"} is moving horizontally with acceleration {"$a$"} and let the angular acceleration of the disc be {"$\\alpha$"}. Once angular velocity {"$\\omega$"} of the disc is obtained, we can use superposition method to find the acceleration of other points as shown in the fig. 2.66.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B7CDF6AAB0DF6477EC4D} num="FIGURE 2.66" caption="Superposition method for accelerations of points on rolling disc." />

      <IllustrationBox num="22">
        <P2 style={{ fontWeight: 700 }}>In fig. 2.56, a rod {"$AB$"} of length {"$L$"} slides with its end {"$A$"} on the wall and end {"$B$"} on the floor. At the instant shown in the figure, the rod makes angle {"$\\theta$"} with the horizontal and end {"$B$"} slides with velocity {"$v_B$"} towards right. Find at this instant, the instantaneous axis of rotation, angular velocity {"$\\omega$"} of the rod, velocity {"$v_A$"} of the end {"$A$"} and the velocity {"$v_C$"} of the centre {"$C$"} of the rod.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_02CC47AC30F436ED06FF} num="FIGURE 2.56" caption="Rod AB with A on wall and B on floor; IAOR at O (intersection of perpendiculars)." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>In this case, we know the direction of velocity of ends {"$A$"} and {"$B$"}. End {"$A$"} moves vertically downwards while end {"$B$"} moves along the horizontal direction. If the instantaneous axis of rotation passes through some point {"$O$"}, then line {"$OA$"} must be perpendicular to the velocity {"$v_A$"}. Similarly, then line {"$OB$"} must be perpendicular to the velocity {"$v_B$"}. Clearly, the point of intersection of lines {"$OA$"} and {"$OB$"}, i.e., point {"$O$"} shown in the fig. 2.56, is the instantaneous axis of rotation.</P2>
        <DM>{"$$\\therefore\\quad\\omega=\\frac{v_B}{OB}=\\frac{v_B}{L\\sin\\theta}$$"}</DM>
        <DM>{"$$\\therefore\\quad v_A=\\omega\\times OA=\\frac{v_B}{L\\sin\\theta}\\times L\\cos\\theta=\\boxed{v_B\\cot\\theta}$$"}</DM>
        <DM>{"$$\\therefore\\quad v_C=\\omega\\times OC=\\frac{v_B}{L\\sin\\theta}\\times\\frac{L}{2}=\\boxed{\\frac{v_B}{2\\sin\\theta}}$$"}</DM>
        <P2>The direction of {"$v_C$"} is perpendicular to {"$OC$"} as shown in the figure.</P2>
      </IllustrationBox>

      <IllustrationBox num="23">
        <P2 style={{ fontWeight: 700 }}>A 100 cm rod is moving on a horizontal surface. Its ends {"$A$"} and {"$B$"} have velocities 30 cm/s and 20 cm/s perpendicular to the rod as shown in fig. 2.57. Locate its instantaneous axis of rotation and find its angular velocity and velocity of its center.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_C663DCE11387F1A9EA1C} num="FIGURE 2.57" caption="Rod AB = 100 cm; v_A = 20 cm/s (down) and v_B = 30 cm/s (up); anti-parallel." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Clearly, the rod is rotating anticlockwise. Here velocity vectors of the particles {"$A$"} and {"$B$"} are antiparallel. Hence, IAOR passes through the intersection of the line joining ends {"$A$"} and {"$B$"} and a line joining tips of the velocity vectors. The required geometrical construction is shown in fig. 2.58.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_567371C61D1527BA765D} num="FIGURE 2.58" caption="Geometrical construction locating IAOR O for antiparallel velocities." />
        <P2>Since triangles {"$AA'O$"} and {"$BB'O$"} are similar and {"$AB=100$"} cm, we have {"$OA=40$"} cm.</P2>
        <P2>Therefore, the instantaneous axis of rotation passes through the point {"$O$"}, which is 40 cm from {"$A$"}.</P2>
        <P2>The angular velocity of the rod is given by</P2>
        <DM>{"$$\\boxed{\\omega=\\frac{v_A}{OA}=\\frac{20\\text{ cm/s}}{40\\text{ cm}}=0{\\cdot}5\\text{ rad/s}}$$"}</DM>
        <P2>The velocity of the center of the rod is</P2>
        <DM>{"$$\\boxed{v_C=\\omega\\times OC=0{\\cdot}5\\times 10\\text{ cm}=5\\text{ cm/s}}$$"}</DM>
        <SubSubHd id="sub-alt-23" title="Alternative Solution" />
        <P2>We could have also calculated {"$\\omega$"} and {"$v_C$"} directly as given below. Taking upward direction as positive, we have {"$v_B=30$"} cm/s and {"$v_A=-20$"} cm/s</P2>
        <DM>{"$$\\boxed{\\omega=\\frac{v_B-v_A}{AB}=\\frac{30-(-20)}{100}=0{\\cdot}5\\text{ rad/s}}$$"}</DM>
        <P2>Point {"$C$"} being the centre of {"$A$"} and {"$B$"},</P2>
        <DM>{"$$\\boxed{v_C=\\frac{v_B+v_A}{2}=\\frac{30+(-20)}{2}=5\\text{ cm/s}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="24">
        <P2 style={{ fontWeight: 700 }}>A 100 cm rod is moving on a horizontal surface. Its ends {"$A$"} and {"$B$"} have velocities 30 cm/s and 10 cm/s perpendicular to the rod as shown in fig. 2.59. Locate its instantaneous axis of rotation and find its angular velocity and velocity of its center.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D69DCB851254232A4EC5} num="FIGURE 2.59" caption="Rod AB = 100 cm; v_A = 10 cm/s (up) and v_B = 30 cm/s (up); parallel." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Clearly, the rod is rotating anticlockwise. Here velocity vectors of the particles {"$A$"} and {"$B$"} are parallel. Hence, IAOR passes through the intersection of the line joining ends {"$A$"} and {"$B$"} and a line joining tips of the velocity vectors. The required geometrical construction is shown in the fig. 2.60.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2FA52795547AFBCA2004} num="FIGURE 2.60" caption="Geometrical construction locating IAOR O for parallel velocities; O is beyond A." />
        <P2>Since triangles {"$AA'O$"} and {"$BB'O$"} are similar and {"$AB=100$"} cm, we have {"$OA=50$"} cm.</P2>
        <P2>Therefore, the instantaneous axis of rotation passes through the point {"$O$"}, which is 50 cm from {"$A$"}.</P2>
        <P2>The angular velocity of the rod is given by</P2>
        <DM>{"$$\\boxed{\\omega=\\frac{v_A}{OA}=\\frac{10\\text{ cm/s}}{50\\text{ cm}}=0{\\cdot}2\\text{ rad/s}}$$"}</DM>
        <P2>The velocity of the center of the rod is</P2>
        <DM>{"$$\\boxed{v_C=\\omega\\times OC=0{\\cdot}2\\times 100\\text{ cm}=20\\text{ cm/s}}$$"}</DM>
        <SubSubHd id="sub-alt-24" title="Alternative Solution" />
        <P2>We could have also calculated {"$\\omega$"} and {"$v_C$"} directly as given below. Taking upward direction as positive, we have {"$v_B=30$"} cm/s and {"$v_A=10$"} cm/s</P2>
        <DM>{"$$\\boxed{\\omega=\\frac{v_B-v_A}{AB}=\\frac{30-10}{100}=0{\\cdot}2\\text{ rad/s}}$$"}</DM>
        <P2>Point {"$C$"} being the centre of {"$A$"} and {"$B$"},</P2>
        <DM>{"$$\\boxed{v_C=\\frac{v_B+v_A}{2}=\\frac{30+10}{2}=20\\text{ cm/s}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="25">
        <P2 style={{ fontWeight: 700 }}>Find the instantaneous axis of rotation of a rod of length {"$l$"} when its end {"$A$"} moves with a velocity {"$\\vec{v}_A=v\\hat{i}$"} and the rod rotates with an angular velocity {"$\\omega=v/2l$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_BC68BE3C401105FA70E3} num="FIGURE 2.61" caption="Rod with end A moving at v î; ω = v/2l." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Let us choose point {"$O$"} as instantaneous axis of rotation (IAOR) in the extended rod. We can write</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_07E43E1BB327DE9F0DE0} num="FIGURE 2.62" caption="IAOR O is at distance r = 2l from end A." />
        <DM>{"$$\\omega=\\frac{v_A-v_O}{r}\\qquad\\Rightarrow\\quad\\frac{v}{2l}=\\frac{v-0}{r}\\qquad\\therefore\\quad\\boxed{r=2l}$$"}</DM>
        <P2>{"$IAOR$"} is at distance {"$2l$"} from {"$A$"}.</P2>
      </IllustrationBox>

      <IllustrationBox num="26">
        <P2 style={{ fontWeight: 700 }}>A uniform rod of length {"$l$"} is spinning with an angular velocity {"$\\omega=2v/l$"} while its centre of mass moves with a velocity {"$v$"}. Find the magnitude of velocity of the end {"$A$"} of the rod in the position shown in the fig. 2.67.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_3D470374AE20C8EEB31D} num="FIGURE 2.67" caption="Spinning rod; end A at 30° from horizontal; ω = 2v/l." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>The end {"$A$"} has two velocity components, one due to translation of rod which is {"$v$"} and other due to rotation of rod which is</P2>
        <DM>{"$$\\frac{\\omega l}{2}=\\frac{2v}{l}\\times\\frac{l}{2}=v$$"}</DM>
        <P2>The directions of these components are shown in fig. 2.68. The magnitude of resultant velocity of end {"$A$"} is</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_00894D64EF99F6EF5085} num="FIGURE 2.68" caption="Velocity components at end A: translational v and rotational v at 120° to each other." />
        <DM>{"$$v_A=\\sqrt{v^2+v^2+2v\\cdot v\\cos120^\\circ}=v$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="27">
        <P2 style={{ fontWeight: 700 }}>The ends {"$A$"} and {"$B$"} of a rod of length {"$l$"} have velocities of magnitudes {"$|\\vec{v}_A|=v$"} and {"$|\\vec{v}_B|=2v$"} respectively. If the inclination of {"$\\vec{v}_A$"} to the rod {"$AB$"} is {"$\\alpha$"}, find the</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B4F3F97809EE3E402940} num="FIGURE 2.69" caption="Rod AB with |v_A| = v at angle α, and |v_B| = 2v at angle β to rod." />
        <P2>(a) inclination {"$\\beta$"} of {"$\\vec{v}_B$"} to the rod AB</P2>
        <P2>(b) angular velocity of the rod.</P2>
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2><strong>(a)</strong> The component of {"$\\vec{v}_A$"} and {"$\\vec{v}_B$"} along the rod will be equal.</P2>
        <DM>{"$$\\begin{aligned} & \\Rightarrow\\quad v_A\\cos\\alpha=v_B\\cos\\beta \\\\ & \\therefore\\quad\\boxed{\\beta=\\cos^{-1}\\left(\\frac{1}{2}\\cos\\alpha\\right)} \\end{aligned}$$"}</DM>
        <P2><strong>(b)</strong> The components of {"$\\vec{v}_A$"} and {"$\\vec{v}_B$"} perpendicular to the line of rod are responsible for rotation of rod. These are {"$v_A\\sin\\alpha$"} and {"$v_B\\sin\\beta$"} respectively. The angular velocity of the rod is</P2>
        <DM>{"$$\\omega=\\frac{v_A\\sin\\alpha+v_B\\sin\\beta}{l}=\\frac{v\\sin\\alpha+2v\\sqrt{1-\\cos^2\\beta}}{l}=\\frac{v}{l}\\left[\\sin\\alpha+\\sqrt{3+\\sin^2\\alpha}\\right]\\text{ in clockwise direction.}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="28">
        <P2 style={{ fontWeight: 700 }}>A disc of radius {"$r=10$"} cm starts rolling clockwise on a horizontal stationary surface with uniform angular acceleration {"$\\alpha=2\\,\\mathrm{rad/s}^2$"}. Find expression for acceleration of the center {"$C$"} and top point {"$A$"} as function of time.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_FA665E5845CEEA42D7D9} num="FIGURE 2.70" caption="Disc rolling clockwise; r = 10 cm, angular acceleration α = 2 rad/s²." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>The acceleration of center {"$C$"} is independent of time and is given by {"$a_C=\\alpha r=2\\times 0{\\cdot}1=0{\\cdot}2\\,\\mathrm{m/s}^2$"}</P2>
        <P2>In vector form, {"$\\quad\\vec{a}_C=0{\\cdot}2\\hat{i}\\,\\mathrm{m/s}^2$"}</P2>
        <P2>The angular acceleration vector is {"$\\vec{\\alpha}=-2\\hat{k}\\,\\mathrm{rad/s}^2$"}</P2>
        <P2>After time {"$t$"}, {"$\\vec{\\omega}=\\vec{\\alpha}t=-2t\\hat{k}$"} and therefore</P2>
        <DM>{"$$\\begin{aligned} \\vec{a}_A &= \\overrightarrow{a_C}+\\vec{\\alpha}\\times\\overrightarrow{CA}+\\omega^2\\overrightarrow{AC} \\\\ &= 0{\\cdot}2\\hat{i}-2\\hat{k}\\times 0{\\cdot}1\\hat{j}+(-2t)^2(-0{\\cdot}1\\hat{j})=0{\\cdot}4\\hat{i}-0{\\cdot}4t^2\\hat{j} \\\\ \\therefore\\quad & \\boxed{\\overrightarrow{a_A}(t)=0{\\cdot}4\\hat{i}-0{\\cdot}4t^2\\hat{j}\\,\\mathrm{m/s}^2} \\end{aligned}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="29">
        <P2 style={{ fontWeight: 700 }}>Two identical discs, each of radius {"$r$"}, are connected by a cord as shown in fig. 2.71. Disc 1 rotates with constant angular acceleration {"$\\alpha$"} in anticlockwise direction. Find acceleration of the center of disc 2 and its angular acceleration.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_4354C13416E243BCD04D} num="FIGURE 2.71" caption="Disc 1 and disc 2 connected by cord; disc 1 has angular acceleration α anticlockwise." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>As disc 1 rotates, the thread unwraps from it. The tangential acceleration of a point {"$P$"} on disc 1 is {"$a_P=\\alpha r$"}. This is equal to the tangential acceleration of point {"$A$"} on disk 2. The tangential acceleration of the extreme left point {"$B$"} of the disk 2 is zero.</P2>
        <DM>{"$$\\Rightarrow\\quad a_A=a_P=\\alpha r\\qquad\\text{and}\\qquad a_B=0$$"}</DM>
        <P2>The angular acceleration {"$\\alpha_2$"} of disc 2 is in clockwise direction and its magnitude is</P2>
        <DM>{"$$\\alpha_2=\\frac{a_A-a_B}{AB}=\\frac{\\alpha r-0}{2r}=\\boxed{\\frac{\\alpha}{2}}$$"}</DM>
        <P2>The acceleration of the center of disc 2 is downwards and its magnitude is</P2>
        <DM>{"$$a_C=a_B+\\alpha_2 r=0+\\frac{\\alpha}{2}r=\\boxed{\\frac{\\alpha r}{2}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="30">
        <P2 style={{ fontWeight: 700 }}>A uniform rod {"$AB$"} of length {"$l$"} is supported with the help of two light inextensible threads as shown in fig. 2.72. The thread supporting the end {"$B$"} is cut. Immediately after the thread is cut, find the tension in the other string, angular acceleration of the rod, acceleration of centre {"$C$"} and the acceleration of its end {"$A$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_E51402D4B1912FE1A14F} num="FIGURE 2.72" caption="Rod AB supported by two threads; thread at B is cut." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Immediately after the thread is cut, all the forces acting on the rod are in vertical direction. Therefore, acceleration {"$a_C$"} of its center of mass {"$C$"} is vertically downwards. The end {"$A$"} can move on circular path of radius equal to length of thread supporting the end {"$A$"}. Therefore, immediately after the thread is cut, the acceleration {"$a_A$"} of the end {"$A$"} is in horizontal direction. Further, as {"$\\omega$"} is zero immediately after the thread is cut, in vector form, {"$\\vec{a}_A$"} is written as</P2>
        <DM>{"$$\\overrightarrow{a_A}=\\overrightarrow{a_C}+\\vec{\\alpha}\\times\\overrightarrow{CA}+\\omega^2\\overrightarrow{AC}=\\overrightarrow{a_C}+\\vec{\\alpha}\\times\\overrightarrow{CA}$$"}</DM>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D17110582366225B14CE} num="FIGURE 2.73" caption="FBD just after cutting thread at B: tension T at A, weight mg downward, acceleration a_C." />
        <P2>From FBD, {"$\\quad mg-T=ma_C\\qquad\\ldots(1)$"}</P2>
        <P2>About {"$C$"}, {"$\\quad\\dfrac{ml^2}{12}\\alpha=T\\dfrac{l}{2}\\cos\\theta\\qquad\\ldots(2)$"}</P2>
        <P2>Since net acceleration of {"$A$"} is along horizontal, the net component of acceleration in the vertical direction is zero.</P2>
        <DM>{"$$\\Rightarrow\\quad a_C=\\alpha\\frac{l}{2}\\cos\\theta\\qquad\\ldots(3)$$"}</DM>
        <P2>and {"$\\quad a_A=\\alpha\\dfrac{l}{2}\\sin\\theta\\qquad\\ldots(4)$"}</P2>
        <P2>On putting values of {"$\\alpha$"} from eqn. (3) and value of {"$T$"} from eqn. (1) in eqn. (2), we get</P2>
        <DM>{"$$\\boxed{a_C=\\frac{3g\\cos^2\\theta}{1+3\\cos^2\\theta}}$$"}</DM>
        <P2>From eqn. (3), {"$\\quad\\boxed{\\alpha=\\dfrac{2a_C}{l\\cos\\theta}=\\dfrac{6g\\cos\\theta}{l(1+3\\cos^2\\theta)}}$"}</P2>
        <P2>From eqn. (1), {"$\\quad\\boxed{T=m(g-a_C)=\\dfrac{mg}{1+3\\cos^2\\theta}}$"}</P2>
        <P2>From eqn (4), {"$\\quad\\boxed{a_A=\\alpha\\dfrac{l}{2}\\sin\\theta=\\dfrac{3g\\cos\\theta\\sin\\theta}{1+3\\cos^2\\theta}}$"}</P2>
      </IllustrationBox>

      {/* 2.25 IMPULSIVE FORCE AND IMPULSIVE TORQUE */}
      <SecHd id="s225" label="2.25" title="Impulsive Force and Impulsive Torque" />
      <P2>Associated with an impulsive force is an impulsive torque. Impulsive force (or impulse), is given by</P2>
      <DM>{"$$\\vec{J}=\\int\\vec{F}\\,dt=\\int M\\frac{d\\vec{v}_{CM}}{dt}dt=M\\Delta\\vec{v}_{CM}$$"}</DM>
      <P2>Hence, an impulsive force acting on a rigid body changes the velocity {"$\\vec{v}_{CM}$"}.</P2>
      <P2>Similarly, an impulsive torque (or angular impulse) about centre of mass is given by</P2>
      <DM>{"$$\\vec{r}\\times\\vec{J}=\\int\\vec{\\tau}\\,dt=\\int I_{CM}\\frac{d\\vec{\\omega}}{dt}dt=I_{CM}\\Delta\\vec{\\omega}$$"}</DM>
      <P2>Hence, an impulsive torque acting on a rigid body changes the angular velocity {"$\\omega$"}.</P2>

      <IllustrationBox num="31">
        <P2 style={{ fontWeight: 700 }}>An impulse {"$J$"} is applied on a rod of mass {"$M$"} and length {"$L$"} lying at rest on a horizontal surface (see fig. 2.74). Find the velocity of the centre of mass of the rod and its angular velocity {"$\\omega$"} after the application of impulse.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_3D7F1E089A42237DDF82} num="FIGURE 2.74" caption="Impulse J applied at distance d from centre of rod of mass M, length L." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <DM>{"$$J=M\\Delta v_{CM}=M(v_{CM}-0)=Mv_{CM}\\qquad\\therefore\\quad\\boxed{v_{CM}=\\frac{J}{M}}$$"}</DM>
        <DM>{"$$Jd=I_{CM}\\Delta\\omega=\\frac{ML^2}{12}(\\omega-0)=\\frac{ML^2}{12}\\omega\\qquad\\therefore\\quad\\boxed{\\omega=\\frac{12Jd}{ML^2}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="32">
        <P2 style={{ fontWeight: 700 }}>The axis of the cylinder shown in fig. 2.75 is fixed and its initial angular velocity is zero. A block of mass {"$m$"} is initially moving towards the right with velocity {"$v_1$"}. It passes over the cylinder (of radius {"$R$"} and moment of Inertia {"$I$"}) to the dotted position. Before it loses contact with the cylinder, it stops slipping on the cylinder due to friction. Calculate the final speed {"$v_2$"} in terms of {"$v_1$"}, {"$M$"}, {"$I$"} and radius {"$R$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_EC70B7832D64A9F12B22} num="FIGURE 2.75" caption="Block of mass m passing over cylinder of radius R; friction stops slipping before block loses contact." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Let friction force {"$f$"} act for time {"$\\Delta t$"}. Then we have</P2>
        <DM>{"$$f\\Delta t=mv_1-mv_2\\qquad\\ldots(1)$$"}</DM>
        <DM>{"$$Rf\\Delta t=I\\omega\\qquad\\ldots(2)$$"}</DM>
        <P2>Since the block stops slipping before it loses contact with the cylinder,</P2>
        <DM>{"$$v_2=\\omega R\\qquad\\ldots(3)$$"}</DM>
        <P2>On solving eqns. (1), (2) and (3), we obtain</P2>
        <DM>{"$$\\boxed{v_2=\\frac{mR^2}{I+mR^2}v_1}$$"}</DM>
      </IllustrationBox>

      {/* ECCENTRIC IMPACT */}
      <SubHd id="sub-eccentric" title="Eccentric Impact" />
      <P2>In eccentric impact, the line of impact which is the common normal drawn at the point of impact does not pass through the center of mass of at least one of the colliding bodies. It involves the change in state of translation as well as of rotation motion of either or both the bodies.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_3B27CE1AEF8E19BA9119} num="FIGURE 2.76" caption="Eccentric impact: line of impact does not pass through centre of mass C_B of body B." />
      <P2>Consider impact of two bodies {"$A$"} and {"$B$"} such that the center of mass {"$C_B$"} of {"$B$"} does not lie on the line of impact as shown in fig. 2.76. If we assume bodies to be frictionless, their mutual forces must act along the line of impact. The reaction force of {"$A$"} on {"$B$"} does not passes through the center of mass of {"$B$"}. As a result, the state of translation as well as of rotation motion of {"$B$"} changes during the impact.</P2>
      <P2>We can generally divide the problems on eccentric impact in the following two categories.</P2>
      <P2>1. In one category, both the bodies undergoing eccentric impact are free to move. No external force act on either of them. There mutual forces are responsible for change in their momentum and angular momentum.</P2>
      <P2>2. In the other category, either or both of the bodies are hinged/pivoted at some point.</P2>
      <SubHd id="sub-eccentric-free" title="Eccentric Impact of bodies free to move" />
      <P2>Since no external force acts on the two body system, we shall use</P2>
      <ul style={{ margin: "0 0 11px", paddingLeft: 28 }}>
        <li style={{ marginBottom: 6 }}>Principle of conservation of linear momentum</li>
        <li style={{ marginBottom: 6 }}>Principle of conservation of angular momentum about any point. This point may preferably be the centre of mass so that the term involving moment of momentum of CM vanishes.</li>
        <li style={{ marginBottom: 6 }}>The equation of coefficient of restitution. The coefficient of restitution is defined for components of velocities of points of contacts of the bodies along the line of impact. If the collision is elastic, we have two options. We may either use equation of coefficient of restitution (in which case, {"$e=1$"}) or we may use conservation of kinetic energy.</li>
      </ul>
      <SubHd id="sub-eccentric-hinged" title="Eccentric Impact of hinged bodies" />
      <P2>When either or both of the bodies are hinged, the reaction of the hinge during the impact act as external force on the two body system. Therefore linear momentum no longer remain conserved and we cannot apply principle of conservation of linear momentum. We also cannot apply conservation of angular momentum because of presence of torque due to the reaction of hinge. However, the equation of coefficient of restitution can still be applied at the point of impact.</P2>
      <P2>When one of the bodies is hinged and other one is free to move, we can apply conservation of angular momentum about the hinge as the torque due to the reaction of hinge now vanishes.</P2>
      <GraspGripBox>
        <P2 style={{ margin: "0 0 8px" }}>In case of eccentric impact,</P2>
        <ol style={{ margin: 0, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>when both bodies are free to move, we apply
            <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
              <li>conservation of linear momentum</li>
              <li>conservation of angular momentum preferably about centre of mass.</li>
              <li>the equation of coefficient of restitution along the line of impact. If the collision is elastic, we either use equation of coefficient of restitution or use conservation of kinetic energy.</li>
            </ul>
          </li>
          <li style={{ marginBottom: 8 }}>when both bodies are hinged, we apply
            <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
              <li>the equation of coefficient of restitution along the line of impact.</li>
            </ul>
          </li>
          <li style={{ marginBottom: 0 }}>when one of the bodies is hinged and other one is free to move, we apply
            <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
              <li>the equation of coefficient of restitution along the line of impact.</li>
              <li>conservation of angular momentum about the hinge.</li>
            </ul>
          </li>
        </ol>
      </GraspGripBox>

      <IllustrationBox num="33">
        <P2 style={{ fontWeight: 700 }}>A uniform rod of mass {"$M$"} and length {"$L$"} is suspended from a fixed support and can rotate freely in the vertical plane. A small ball of mass {"$m$"} moving horizontally with velocity {"$v_0$"} strikes the lower end of the rod as shown in fig. 2.77. Find the angular velocity of the rod and velocity of the ball immediately after the impact if the coefficient of restitution is {"$e$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1012176DAF1672CCAE51} num="FIGURE 2.77" caption="Rod suspended from hinge; ball m strikes lower end with velocity v₀." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>The rod is hinged and the ball is free to move. Due to the impulse of reaction of the hinge during impact, linear momentum of the system is not conserved. However, the angular impulse of the reaction of hinge about the hinge is zero. Therefore angular momentum of the system about the hinge is conserved. Let velocity of the ball after the impact be {"$v$"} and angular velocity of the rod be {"$\\omega$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_8080DF69552BACEB74C3} num="FIGURE 2.78" caption="Before and after impact: ball velocity v₀ → v; rod acquires angular velocity ω." />
        <P2>Applying conservation of angular momentum about the hinge, we have</P2>
        <DM>{"$$\\begin{aligned} & mv_0L=mvL+\\frac{ML^2}{3}\\omega \\\\ & \\Rightarrow\\quad 3mv+ML\\omega=3mv_0\\qquad\\ldots(1) \\end{aligned}$$"}</DM>
        <P2>From equation of coefficient of restitution at the point of contact, we have</P2>
        <DM>{"$$v_2-v_1=e(u_1-u_2)\\qquad\\Rightarrow\\quad\\omega L-v=ev_0\\qquad\\ldots(2)$$"}</DM>
        <P2>From eqns. (1) and (2), we get</P2>
        <DM>{"$$\\boxed{\\omega=\\frac{3(1+e)mv_0}{(3m+M)L}}\\qquad\\text{and}\\qquad\\boxed{v=\\frac{(3m-eM)v_0}{3m+M}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="34">
        <P2 style={{ fontWeight: 700 }}>A uniform rod {"$AB$"} of mass {"$M$"} and length {"$L$"} is kept at rest on a smooth horizontal plane. A small ball of mass {"$m$"} moving perpendicular to the rod with velocity {"$v_0$"} strikes the rod at one of its ends as shown in fig. 2.79. Find the velocity of the ball, velocity of centre of mass of the rod and angular velocity of the rod immediately after the impact if the coefficient of restitution is {"$e$"}.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_78E0FD2F6DDB5801BA90} num="FIGURE 2.79" caption="Rod AB on smooth plane; ball m strikes end A with velocity v₀." />
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>Both the bodies can move freely in the horizontal plane. Therefore no horizontal external force acts on the system. The linear momentum as well as angular momentum about any axis normal to the plane is conserved.</P2>
        <P2>Let the velocity of the ball, velocity of the centre of mass of the rod and angular velocity of the rod immediately after the impact be {"$v$"} towards right, {"$v_C$"} towards right and {"$\\omega$"} in clockwise direction as shown in the fig. 2.80.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A2F32F32E1B5A6594CFE} num="FIGURE 2.80" caption="Before and after impact: ball velocity v₀ → v; rod gets v_C and ω." />
        <P2>The velocity of the end {"$A$"} of the rod immediately after the impact is {"$v_A=v_C+\\omega L/2$"}.</P2>
        <P2>Applying conservation of linear momentum, we have</P2>
        <DM>{"$$mv_0=mv+Mv_C\\qquad\\ldots(1)$$"}</DM>
        <P2>Applying conservation of angular momentum about the centre {"$C$"} of the rod, we have</P2>
        <DM>{"$$mv_0\\frac{L}{2}=mv\\frac{L}{2}+\\frac{ML^2}{12}\\omega\\qquad\\Rightarrow\\quad 6mv_0=6mv+ML\\omega\\qquad\\ldots(2)$$"}</DM>
        <P2>From equation of coefficient of restitution, at the point of contact, we have</P2>
        <DM>{"$$v_2-v_1=e(u_1-u_2)\\qquad\\Rightarrow\\quad(v_C+\\omega L/2)-v=ev_0\\qquad\\ldots(3)$$"}</DM>
        <P2>From eqns. (1), (2) and (3), we get</P2>
        <DM>{"$$\\boxed{v=\\frac{(4m-eM)v_0}{4m+M}},\\quad\\boxed{v_C=\\frac{m(1+e)v_0}{4m+M}}\\quad\\text{and}\\quad\\boxed{\\omega=\\frac{6(1+e)mv_0}{(4m+M)L}}$$"}</DM>
      </IllustrationBox>

      <IllustrationBox num="35">
        <P2 style={{ fontWeight: 700 }}>A particle of mass {"$m=1$"} kg moving with velocity {"$v_0=6\\,\\mathrm{m\\,s}^{-1}$"} collides at the end of a rod of mass {"$2m$"} and length {"$l=1$"} m spinning with angular velocity {"$\\omega_0=6$"} rad/s in clockwise direction as shown in fig. 2.81. If the coefficient of restitution of collision {"$e=2/3$"}, find the</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_3ED800C2EEB95A765F05} num="FIGURE 2.81" caption="Particle m = 1 kg collides with end of spinning rod 2m; ω₀ = 6 rad/s clockwise." />
        <P2>(a) velocity of the particle and</P2>
        <P2>(b) angular velocity of the rod just after the impact.</P2>
        <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 8px" }}>SOLUTION.</p>
        <P2>As there is no external force and torque, the linear momentum and angular momentum will be conserved.</P2>
        <P2>From conservation of linear momentum,</P2>
        <DM>{"$$mv_0=mv_1+2mv_C\\qquad\\Rightarrow\\quad 6=v_1+2v_C\\qquad\\ldots(1)$$"}</DM>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7C91F3536E5395A74B56} num="FIGURE 2.82" caption="Before and after collision; rod acquires v_C and ω; particle has v₁." />
        <P2>By conservation of angular momentum about {"$C$"},</P2>
        <DM>{"$$mv_0\\frac{l}{2}-\\frac{2ml^2}{12}\\omega_0=mv_1\\frac{l}{2}+\\frac{2ml^2}{12}\\omega$$"}</DM>
        <DM>{"$$\\Rightarrow\\quad 3v_0-l\\omega_0=3v_1+l\\omega\\qquad\\Rightarrow\\quad 3\\times 6-1\\times 6=3v_1+1\\times\\omega$$"}</DM>
        <DM>{"$$\\Rightarrow\\quad 3v_1+\\omega=12\\qquad\\ldots(2)$$"}</DM>
        <P2>At end {"$A$"} (point of collision),</P2>
        <DM>{"$$v_2-v_1=e(u_1-u_2)\\qquad\\Rightarrow\\quad\\left(v_C+\\omega\\frac{l}{2}\\right)-v_1=\\frac{2}{3}\\left[v_0-\\left(-\\omega_0\\frac{l}{2}\\right)\\right]$$"}</DM>
        <DM>{"$$\\Rightarrow\\quad v_C-v_1+\\omega\\frac{l}{2}=\\frac{2}{3}v_0+\\omega_0\\frac{l}{3}\\qquad\\Rightarrow\\quad v_C-v_1+\\frac{\\omega}{2}=\\frac{2}{3}\\times 6+6\\times\\frac{1}{3}$$"}</DM>
        <DM>{"$$\\Rightarrow\\quad v_C-v_1+\\omega/2=6\\qquad\\ldots(3)$$"}</DM>
        <P2>From (1) and (3), {"$\\quad 3v_1-\\omega=-6\\qquad\\ldots(4)$"}</P2>
        <P2>From (2) and (4),</P2>
        <DM>{"$$\\boxed{v_1=1\\,\\mathrm{ms}^{-1}}\\qquad\\text{and}\\qquad\\boxed{\\omega=9\\,\\mathrm{rad\\,s}^{-1}}$$"}</DM>
      </IllustrationBox>

      {/* 2.26 TOPPLING */}
      <SecHd id="s226" label="2.26" title="Toppling" />
      <P2>It is a common observation that when a body is pushed on a horizontal ground, it either slides or topples. How do we determine whether the body will slide or topple? To understand this, let us consider a block of mass {"$m$"} and length {"$L$"} placed on a horizontal floor. Let {"$\\mu$"} be the coefficient of friction between the floor and the block and let a force {"$F$"} be applied on the block at height {"$h$"} from the base as shown in the fig. 2.83.</P2>
      <P2>The forces acting on the block are applied force {"$F$"}, normal force {"$N$"}, weight {"$mg$"} and friction {"$f$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_67B9014DD7D4DD60EC37} num="FIGURE 2.83" caption="Block of mass m on floor; force F at height h; normal N, friction f, weight mg." />
      <P2>The torque acting on the block about corner {"$B$"}:</P2>
      <P2>due to force {"$F$"} is {"$Fh$"} clockwise, due to normal {"$N$"} is {"$Na$"} clockwise, due to weight {"$mg$"} is {"$mgL/2$"} anticlockwise and due to friction {"$f$"} is zero.</P2>
      <P2>For the block to slide, a certain minimum force is required to be applied. Lets denote this by {"$F_{\\rm slide}$"} which we know in this case is given by</P2>
      <DM>{"$$F_{\\rm slide}=\\mu N=\\mu mg$$"}</DM>
      <P2>Similarly, for the block to topple, a certain minimum force is required to be applied. Lets denote this by {"$F_{\\rm topple}$"}.</P2>
      <P2>Now, suppose the force {"$F$"} is initially zero and is slowly increased till the time, the block starts sliding or toppling.</P2>
      <P2>Initially, when {"$F=0$"}, both {"$mg$"} and {"$N$"} passes through the centre of mass, {"$O$"} of the block so that the net torque on the block is zero. In this case,</P2>
      <DM>{"$$\\tau_{\\rm clockwise}=NL/2=mgL/2\\qquad\\text{and}\\qquad\\tau_{\\rm anticlockwise}=mgL/2$$"}</DM>
      <DM>{"$$\\therefore\\quad\\tau_{\\rm clockwise}=\\tau_{\\rm anticlockwise}$$"}</DM>
      <P2>When {"$F\\neq 0$"}, the force {"$F$"} provides an additional clockwise torque equal to {"$Fh$"} on the block about corner {"$B$"}. The normal force {"$N$"} therefore, shifts towards right so that its contribution to the clockwise torque decreases. We now have</P2>
      <P2>{"$\\tau_{\\rm clockwise}=Fh+Na\\qquad$"} and {"$\\quad\\tau_{\\rm anticlockwise}=mgL/2$"}</P2>
      <P2>Since the block do not rotate,</P2>
      <DM>{"$$\\tau_{\\rm clockwise}=\\tau_{\\rm anticlockwise}\\qquad\\therefore\\quad Fh+Na=mgL/2\\quad\\text{or}\\quad Fh+mga=mgL/2$$"}</DM>
      <P2>As we increase {"$F$"}, {"$N$"} further shifts to right so that its distance {"$a$"} from corner {"$B$"} of the block decreases till a stage comes when {"$N$"} passes through {"$B$"}.</P2>
      <P2>As {"$F$"} is further increased, clockwise torque becomes greater than anticlockwise torque and the block topples.</P2>
      <P2>Therefore, the minimum force {"$F_{\\rm topple}$"} required to be applied to make the block topple is given by</P2>
      <DM>{"$$F_{\\rm topple}\\cdot h=\\frac{mgL}{2}\\qquad\\text{or}\\qquad\\boxed{F_{\\rm topple}=\\frac{mgL}{2h}}$$"}</DM>
      <P2>If {"$F_{\\rm slide}<F_{\\rm topple}$"}, we have</P2>
      <DM>{"$$\\mu mg<\\frac{mgL}{2h}\\qquad\\text{or}\\qquad\\mu<\\frac{L}{2h}$$"}</DM>
      <P2>Therefore,</P2>
      <P2>if {"$\\quad\\mu<\\dfrac{L}{2h}$"}, the block will slide first</P2>
      <P2>if {"$\\quad\\mu>\\dfrac{L}{2h}$"}, the block will topple first.</P2>

      <SubHd id="sub-toppling-inclined" title="Toppling on an inclined plane" />
      <P2>Consider a block of length {"$L$"} and height {"$h$"} kept on a plane inclined at an angle {"$\\theta$"} to the horizontal as shown in fig. 2.84. The forces acting on the block are weight {"$mg$"} downwards, normal force {"$N$"} perpendicular to the inclined plane and friction {"$f$"} up the inclined plane.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6F87F5B36520FDCCBE1E} num="FIGURE 2.84" caption="Block on inclined plane; toppling about corner A when θ increases beyond critical angle." />
      <P2>If the angle {"$\\theta$"} of the inclined plane is less, the weight {"$mg$"} passes through the base {"$AB$"} of the block. It provides a clockwise torque about the corner {"$A$"} of the block. The location of normal force, {"$N$"} gets adjusted so that it provides an equal anticlockwise torque.</P2>
      <P2>If we increase the angle {"$\\theta$"}, weight {"$mg$"} gets closer to point {"$A$"} resulting in a decrease in clockwise torque. To balance this, the normal {"$N$"} also gets closer to point {"$A$"}.</P2>
      <P2>If {"$\\theta$"} is further increased, we have a situation where both {"$mg$"} and {"$N$"} passes through point {"$A$"} as shown in the figure. On further increasing angle {"$\\theta$"}, the block will topple.</P2>
      <P2>Let {"$\\theta_{\\rm topple}$"} = minimum angle of the inclined plane beyond which the block topples</P2>
      <P2>{"$\\theta_{\\rm slide}$"} = minimum angle of the inclined plane beyond which the block slides</P2>
      <P2>Then,</P2>
      <DM>{"$$\\tan\\theta_{\\rm topple}=\\frac{L/2}{h/2}=\\frac{L}{h}\\qquad\\text{or}\\qquad\\theta_{\\rm topple}=\\tan^{-1}\\frac{L}{h}$$"}</DM>
      <P2>and {"$\\tan\\theta_{\\rm slide}=\\mu\\qquad$"} or {"$\\quad\\theta_{\\rm slide}=\\tan^{-1}\\mu$"}</P2>
      <P2>If {"$\\tan\\theta_{\\rm slide}<\\tan\\theta_{\\rm topple}$"}, we have {"$\\mu<L/h$"}</P2>
      <P2>Therefore,</P2>
      <P2>if {"$\\quad\\mu<\\dfrac{L}{h}$"}, the block will slide first</P2>
      <P2>if {"$\\quad\\mu>\\dfrac{L}{h}$"}, the block will topple first</P2>
    </>
  );
};

const bb = { SecHd, SubHd, SubSubHd, P2, DM, DefBox, GraspGripBox, IllustrationBox, Fig, P_COLOR };

const allContent = (
  <>
    {content_b1}
    {content_b2(bb)}
    {content_b3(bb)}
    {content_b4(bb)}
  </>
);

export default function Chapter2() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div style={{
      background: "#fff", minHeight: "100vh",
      fontFamily: "'Lora',Georgia,serif",
      fontSize: 17, lineHeight: 1.58, color: "#1a1a1a",
    }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
      <div style={{ padding: "0 clamp(14px,4vw,28px) 60px clamp(14px,4vw,28px)", overflowX: "hidden" }}>
        <ChapterCover />
        {allContent}
      </div>
    </div>
  );
}
