"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

const P_COLOR = "#8b0a4e";
const LIGHT_P = "#f9eef4";
const chapterNumber = "3";
const chapterTitle = "GRAVITATION";

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
const Arrow = () => <span style={{ margin: "0 6px" }}>⟶</span>;

const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
      fontWeight: 800, color: P_COLOR, textTransform: "uppercase",
      letterSpacing: "0.5px", margin: 0 }}>
      {label ? `${label}. ` : ""}{title}
    </h2>
    <div style={{ borderTop: "1.5px solid " + P_COLOR, marginTop: 4 }} />
  </div>
);

const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 14,
    fontWeight: 700, color: P_COLOR, margin: "16px 0 8px" }}>
    {label ? `${label}. ` : ""}{title}
  </h3>
);

const SubSubHd = ({ id, title }) => (
  <h4 id={id} style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13.5,
    fontWeight: 700, color: P_COLOR, margin: "14px 0 7px" }}>
    {title}
  </h4>
);

const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 11px", textAlign: "justify", ...style }}>{children}</p>
);

const Mth = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 4px",
    fontSize: "15.5px", lineHeight: 2.2, fontFamily: "'Times New Roman', Times, serif",
    overflowX: "auto", overflowY: "hidden", maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>
    {children}
  </div>
);

const DefBox = ({ children }) => (
  <div style={{ border: "1.5px solid #888", padding: "10px 16px", margin: "12px 0",
    fontStyle: "italic", background: "#fafafa", fontSize: "16px", lineHeight: 1.65 }}>
    {children}
  </div>
);

const KBBox = ({ title, children }) => (
  <div style={{ border: "2px solid " + P_COLOR, margin: "20px 0" }}>
    <div style={{ background: P_COLOR, color: "#fff",
      fontFamily: "'Merriweather Sans',Arial,sans-serif",
      fontWeight: 900, fontSize: 13, letterSpacing: 2, padding: "5px 14px" }}>
      {title || "KNOWLEDGEBOOSTER"}
    </div>
    <div style={{ padding: "10px 16px 12px" }}>{children}</div>
  </div>
);

const GraspGripBox = ({ children }) => (
  <div style={{ border: "1.5px solid #ccc", margin: "18px 0", background: "#fdf8ee" }}>
    <div style={{ textAlign: "center", padding: "10px 16px 4px" }}>
      <span style={{ fontFamily: "'Lora',Georgia,serif", fontWeight: 700,
        fontStyle: "italic", fontSize: 18, color: P_COLOR, letterSpacing: 0.5 }}>
        Grasp &amp; Grip
      </span>
    </div>
    <div style={{ padding: "4px 18px 14px" }}>{children}</div>
  </div>
);

const IllustrationBox = ({ num, title, children }) => (
  <div style={{ margin: "20px 0", border: "1.5px solid " + P_COLOR }}>
    <div style={{ background: P_COLOR, color: "#fff", padding: "6px 14px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900,
      fontSize: 12, letterSpacing: 1 }}>
      ILLUSTRATION {num}{title ? ` — ${title}` : ""}
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);

const SolHd = () => (
  <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 6px", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13 }}>SOLUTION.</p>
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

function HamburgerBtn({ open, setOpen }) {
  const bar = { width: 20, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.25s" };
  return (
    <button onClick={() => setOpen(o => !o)} style={{
      position: "fixed", top: 14, left: 14, zIndex: 1100,
      background: P_COLOR, border: "none", borderRadius: 4,
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
      position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.35)", cursor: "pointer",
    }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 1080,
      width: open ? 260 : 0, height: "100vh",
      background: "#fff",
      borderRight: open ? "2px solid #e8c0d8" : "none",
      boxShadow: open ? "3px 0 16px rgba(139,10,78,0.10)" : "none",
      transition: "width 0.28s ease",
      overflowY: open ? "auto" : "hidden", overflowX: "hidden",
    }}>
      <div style={{ width: 260, padding: "56px 0 20px" }}>
        <div style={{ padding: "0 16px 8px",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: P_COLOR,
          letterSpacing: 1, textTransform: "uppercase", borderBottom: "1.5px solid #e8c0d8", marginBottom: 8 }}>
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
                padding: item.level === 1 ? "6px 16px" : item.level === 2 ? "4px 24px" : "3px 32px",
                fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: item.level === 1 ? 700 : 400,
                fontSize: item.level === 1 ? 12 : 11,
                color: item.level === 1 ? P_COLOR : "#444",
                borderLeft: item.level === 1 ? "3px solid " + P_COLOR : "none",
                background: hovered === item.id ? LIGHT_P : "transparent",
                marginBottom: 2, lineHeight: 1.4, whiteSpace: "nowrap",
              }}>
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
          <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 900,
            fontSize: 12, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>
            CHAPTER
          </div>
          <div style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
            fontWeight: 900, fontSize: 64, color: "#3a3a3a", lineHeight: 1 }}>
            {chapterNumber}
          </div>
        </div>
      </div>
      <h1 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif",
        fontWeight: 900, fontSize: 34, color: "#6e0d3a", letterSpacing: 2,
        textTransform: "uppercase", margin: "16px 0 0", lineHeight: 1.2 }}>
        {chapterTitle}
      </h1>
    </div>
    <div style={{ height: 4, background: "linear-gradient(90deg,#8b0a4e,#c0408a,#8b0a4e)" }} />
  </div>
);

const TOC = [
  { id: "sec-fe", title: "Foundation Essentials", level: 1 },
  { id: "sec-s31", label: "3.1", title: "Introduction", level: 1 },
  { id: "sec-s32", label: "3.2", title: "Kepler's Laws of Planetary Motion", level: 1 },
  { id: "sub-kl1", title: "Kepler's First Law", level: 2 },
  { id: "sub-kl2", title: "Kepler's Second Law", level: 2 },
  { id: "sub-kl3", title: "Kepler's Third Law", level: 2 },
  { id: "sec-s33", label: "3.3", title: "Newton's Law of Gravitation", level: 1 },
  { id: "sec-s34", label: "3.4", title: "Acceleration Due to Gravity of the Earth", level: 1 },
  { id: "sub-agsurf", title: "Acceleration on the Surface", level: 2 },
  { id: "sub-agsolid", title: "Acceleration Due to Gravity — Uniform Solid Sphere", level: 2 },
  { id: "sub-agheight", title: "Acceleration at Height above Earth", level: 2 },
  { id: "sub-agdepth", title: "Acceleration at Depth below Earth", level: 2 },
  { id: "sub-aglat", title: "Variation of g with Latitude", level: 2 },
  { id: "sec-s35", label: "3.5", title: "Gravitational Potential Energy", level: 1 },
  { id: "sec-s36", label: "3.6", title: "Relation Between Gravitational Field and Potential", level: 1 },
  { id: "sec-s37", label: "3.7", title: "Gravitational Field and Potential Due to Bodies of Different Shapes", level: 1 },
  { id: "sec-s38", label: "3.8", title: "Gravitational Self Energy", level: 1 },
  { id: "sec-s39", label: "3.9", title: "Escape Speed", level: 1 },
  { id: "sec-s310", label: "3.10", title: "Orbital Speed and Time Period of Satellite", level: 1 },
  { id: "sec-s311", label: "3.11", title: "Energy of an Orbiting Satellite", level: 1 },
  { id: "sec-s312", label: "3.12", title: "Geostationary Satellite", level: 1 },
  { id: "sec-s313", label: "3.13", title: "Binary Star System", level: 1 },
  { id: "sec-s314", label: "3.14", title: "Bound and Unbound Trajectories", level: 1 },
  { id: "sec-s315", label: "3.15", title: "Drag Force on Satellite Due to Earth's Atmosphere", level: 1 },
  { id: "sec-s316", label: "3.16", title: "Velocity and Energy of a Planet in an Elliptical Orbit", level: 1 },
  { id: "sec-s317", label: "3.17", title: "Time Period of a Planet in an Elliptical Orbit", level: 1 },
];

const content_b1 = [
  // Foundation Essentials heading
  <div key="sec-fe" id="sec-fe" style={{ marginTop: 22, marginBottom: 10 }}>
    <h2 style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 15,
      fontWeight: 800, color: P_COLOR, textTransform: "uppercase",
      letterSpacing: "0.5px", margin: 0, textAlign: "center" }}>
      Foundation Essentials
    </h2>
    <div style={{ borderTop: "1.5px solid " + P_COLOR, marginTop: 4 }} />
  </div>,

  // 3.1 Introduction
  <SecHd key="sec-s31" id="sec-s31" label="3.1" title="Introduction" />,
  <P2 key="b1-p-s31-1">The motion of celestial bodies such as the earth, the moon, the planets, etc. had been a subject of great interest for a long time. The stars and planets visible in the night sky were mapped about 4000 years ago by several ancient civilisations. In 5th century, the famous Indian astronomer, Aryabhata in his book Aryabhatiya mentioned that the earth rotates about its axis and moves in a circular orbit about the sun and the moon revolves in a circular orbit about the earth. About a thousand years later, Copernicus (1473-1543) stated at all planets moved in perfect circles around the sun. Later, Tyco Brahe (1546-1601) spent 20 long years making observations of the night sky with the naked eye which were used by sailors thereafter. Brahe's assistant, Johannes Kepler (1571-1630) used these observations and formulated his findings in his laws of planetary motion.</P2>,
  <P2 key="b1-p-s31-2">In 1665, Isaac Newton showed that the force that holds the moon in its orbit is the same force that makes an apple fall on the earth. Newton concluded that not only does Earth attract the apple and the Moon but every body in the universe attracts every other body. This tendency of bodies to attract each other is called <strong>gravitation</strong>.</P2>,

  // 3.2 Kepler's Laws
  <SecHd key="sec-s32" id="sec-s32" label="3.2" title="Kepler's Laws of Planetary Motion" />,
  <SubHd key="sub-kl1" id="sub-kl1" title="Kepler's first law" />,
  <P2 key="b1-p-kl1-1">Every planet revolves around the sun in an elliptical orbit with sun at one of the focii. This is also known as <strong><em>laws of orbits.</em></strong></P2>,
  <P2 key="b1-p-kl1-2">An ellipse has two focii, i.e., Focus {"$F_1$"} and Focus {"$F_2$"}.</P2>,
  <Fig key="fig-3-1"
    src={CONTENT_IMAGES.CONTENT_IMAGE_E52E9C4924C18074E794}
    num="FIGURE 3.1" caption="Elliptical orbit showing major and minor axes" />,
  <P2 key="b1-p-kl1-3">The length {"$AB = 2a$"} is known as major axis.</P2>,
  <P2 key="b1-p-kl1-4">The length {"$CD = 2b$"} is known as minor axis.</P2>,
  <P2 key="b1-p-kl1-5">The length {"$OA = OB = a$"} is known as semi major axis.</P2>,
  <P2 key="b1-p-kl1-6">For a circle, the two focii mearge into one (which is known as centre of the circle) and semi major axis becomes the radius of the circle.</P2>,

  <SubHd key="sub-kl2" id="sub-kl2" title="Kepler's second law" />,
  <P2 key="b1-p-kl2-1">A line that connects the planet to the sun sweeps out equal areas in equal intervals of time.</P2>,
  <P2 key="b1-p-kl2-2">Hence, the rate {"$dA/dt$"} at which it sweeps out area {"$A$"} is constant, i.e.,</P2>,
  <Mth key="b1-math-kl2-1">{"$$dA/dt = \\text{constant.}$$"}</Mth>,
  <P2 key="b1-p-kl2-3">This is also known as <strong>law of areas.</strong></P2>,
  <Fig key="fig-3-2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_6BDC8A1778EEE7DDE7E7}
    num="FIGURE 3.2" caption="Planet sweeping equal areas in equal times" />,

  <SubHd key="sub-kl3" id="sub-kl3" title="Kepler's third law" />,
  <P2 key="b1-p-kl3-1">The square of the time period {"$T$"} of revolution of any planet is proportional to the cube of the semi major axis {"$a$"} of the orbit, i.e., {"$\\quad T^2 \\propto a^3$"}.</P2>,
  <P2 key="b1-p-kl3-2">This is also known as <strong>law of periods.</strong> For a circular orbit, the semi major axis becomes the radius {"$r$"} of the circular orbit. We now have</P2>,
  <Mth key="b1-math-kl3-1">{"$$T^2 \\propto r^3$$"}</Mth>,

  <GraspGripBox key="gg-kl3">
    <P2>Kepler's laws are applicable not only to the solar system but also equally well to satellites, either natural or artificial, orbiting around a planet.</P2>
  </GraspGripBox>,

  // Illustrations 1 & 2
  <IllustrationBox key="ill-1" num="1" title="A satellite revolves around the earth in a circular orbit. If the orbital radius increases by 2%, what will be the percentage increase in the time period of revolution of the satellite?">
    <SolHd />
    <P2>Let {"$T$"} = time period of revolution of the satellite</P2>
    <P2>{"$r$"} = orbital radius</P2>
    <P2>Then by Kepler's third law, we have {"$T^2 \\propto r^3$"}</P2>
    <Mth key="b1-math-ill1">{"$$\\begin{aligned} & \\Rightarrow \\quad 2\\frac{\\Delta T}{T} = 3\\frac{\\Delta r}{r} \\\\ & \\therefore \\quad \\frac{\\Delta T}{T} = 1.5\\frac{\\Delta r}{r} = 1.5 \\times 2\\% = \\boxed{3\\%} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-2" num="2" title="A Saturn year is 29·5 times the Earth year. How far is the Saturn from the Sun if the Earth is 1·5 × 10⁸ km away from the Sun?">
    <SolHd />
    <P2>Let {"$\\quad T_1$"} = time period of revolution of Earth</P2>
    <P2>{"$T_2$"} = time period of revolution of Saturn</P2>
    <P2>{"$r_1$"} = orbital radius of Earth</P2>
    <P2>{"$r_2$"} = orbital radius of Saturn</P2>
    <P2>Then by Kepler's third law, we have {"$T^2 \\propto r^3$"}</P2>
    <Mth key="b1-math-ill2">{"$$\\Rightarrow \\left(\\frac{T_2}{T_1}\\right)^2 = \\left(\\frac{r_2}{r_1}\\right)^3$$"}</Mth>
    <Mth key="b1-math-ill2b">{"$$\\therefore\\; r_2 = 1.5 \\times 10^8 \\times (29{\\cdot}5)^{2/3} = \\boxed{1{\\cdot}43 \\times 10^9 \\text{ km}}$$"}</Mth>
  </IllustrationBox>,

  // 3.3 Newton's Law of Gravitation
  <SecHd key="sec-s33" id="sec-s33" label="3.3" title="Newton's Law of Gravitation (Universal Law of Gravitation)" />,
  <P2 key="b1-p-s33-1">Newton proposed a force law that we call <strong>Newton's law of gravitation</strong> or <strong>Universal law of gravitation</strong> which states that <strong>every body in the universe attracts every other body with a force which is directly proportional to the product of their masses and inversely proportional to the square of the distance between them.</strong></P2>,
  <Fig key="fig-3-3"
    src={CONTENT_IMAGES.CONTENT_IMAGE_730335390A4164B3DA8F}
    num="FIGURE 3.3" caption="Gravitational force between two masses" />,
  <P2 key="b1-p-s33-2">Mathematically, the magnitude of the force of attraction is given by</P2>,
  <Mth key="b1-math-s33-1">{"$$F = \\frac{G\\, m_1\\, m_2}{r^2}$$"}</Mth>,
  <P2 key="b1-p-s33-3">where, {"$m_1$"} and {"$m_2$"} are the masses of the two bodies and {"$r$"} is the distance between them. {"$G$"} is a universal constant and is called <strong>Universal Gravitational constant.</strong> The value of {"$G$"} in S.I. units is</P2>,
  <Mth key="b1-math-s33-2">{"$$G = 6{\\cdot}67 \\times 10^{-11}\\; \\text{Nm}^2/\\text{kg}^2.$$"}</Mth>,
  <P2 key="b1-p-s33-4">The force of gravitation exerted by mass {"$m_1$"} on {"$m_2$"} is equal in magnitude to the force exerted by mass {"$m_2$"} on {"$m_1$"}. Hence, the force exerted on both masses is same.</P2>,
  <P2 key="b1-p-s33-5">The gravitational force is <strong>independent of the intervening medium.</strong> In other words, the force between the two masses remains the same whether they are in vacuum, air, water, etc.</P2>,

  <GraspGripBox key="gg-s33">
    <ol style={{ margin: "0 0 0 18px", padding: 0, lineHeight: 1.7 }}>
      <li style={{ marginBottom: 8 }}>The law of gravitation is <strong>strictly valid for point masses.</strong> However, if the separation between the masses is much larger than their sizes, then the distance {"$r$"} to a good approximation may be taken as the distance between their centre of masses.</li>
      <li style={{ marginBottom: 8 }}>The force exerted by a spherically symmetric body (on an object outside the body) is same as the force exerted by a point mass having the mass same as of that of the body and situated at the centre of the body.</li>
      <li style={{ marginBottom: 8 }}>If we have a collection of point masses, the force on one of them is the vector sum of gravitational forces exerted by other point masses. Hence, Force {"$\\vec{F}$"} on mass {"$m_1$"} due to masses {"$m_2, m_3, \\ldots m_n$"} is given by
        <Mth key="b1-math-gg33">{"$$\\vec{F} = \\vec{F}_{12} + \\vec{F}_{13} + \\vec{F}_{14} + \\ldots + \\vec{F}_{1n}.$$"}</Mth>
        where, {"$\\vec{F}_{12}$"} is force on mass {"$m_1$"} due to {"$m_2$"}, {"$\\vec{F}_{13}$"} is force on mass {"$m_1$"} due to {"$m_3$"} and all other forces are similarly defined.
      </li>
      <li style={{ marginBottom: 8 }}><strong>The force of attraction due to a hollow spherical shell of uniform density, on a point mass situated inside it is zero.</strong>
        <Fig key="fig-3-4"
          src={CONTENT_IMAGES.CONTENT_IMAGE_CCA07C74D6031B20E0A4}
          num="FIGURE 3.4" caption="Point mass inside a hollow spherical shell" />
        The various regions of the spherical shell attract the point mass in various directions. These forces cancel each other completely.
      </li>
      <li><strong>The gravitation force is a conservative force. Hence, the Mechanical Energy (i.e., the sum of Kinetic Energy and Potential Energy) of a system of two masses during their motion under gravitational force remains conserved.</strong></li>
    </ol>
  </GraspGripBox>,

  // Illustration 3
  <IllustrationBox key="ill-3" num="3" title="A rocket is fired from the Earth towards the Sun. At what distance from the Earth's centre is the gravitational force on the rocket zero?">
    <P2><strong>Mass of the Sun {"$= 2 \\times 10^{30}$"} kg, Mass of the Earth {"$= 6 \\times 10^{24}$"} kg. Orbital radius of Earth {"$= 1{\\cdot}5 \\times 10^{11}$"} m</strong></P2>
    <SolHd />
    <Fig key="fig-3-5"
      src={CONTENT_IMAGES.CONTENT_IMAGE_DF5AE2A1AAFED38CFE66}
      num="FIGURE 3.5" caption="Rocket between Earth and Sun" />
    <P2>Let {"$m$"} be the mass of the rocket and {"$x$"} be its distance from the centre of the earth. The gravitational force on the rocket will be zero when it is pulled equally by earth and the sun.</P2>
    <Mth key="b1-math-ill3">{"$$\\begin{aligned} & \\Rightarrow \\quad \\frac{GM_E m}{x^2} = \\frac{GM_S m}{(r-x)^2} \\quad \\Rightarrow \\left(\\frac{r-x}{x}\\right)^2 = \\frac{M_S}{M_E} \\\\ & \\Rightarrow \\quad \\frac{r-x}{x} = \\sqrt{\\frac{M_S}{M_E}} = \\sqrt{\\frac{2\\times10^{30}}{6\\times10^{24}}} = \\frac{1000}{\\sqrt{3}} \\\\ & \\therefore \\quad x = \\frac{\\sqrt{3}\\,r}{1000+\\sqrt{3}} = \\frac{\\sqrt{3}\\times1{\\cdot}5\\times10^{11}}{1000+\\sqrt{3}} = \\boxed{2{\\cdot}6\\times10^8\\text{ m}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // Illustration 4
  <IllustrationBox key="ill-4" num="4" title="Two particles of masses 1 kg and 2 kg are placed at a separation of 50 cm. Assuming that the only forces acting on the particles are their mutual gravitation, find the initial acceleration of heavier particle. (G = 6·67 × 10⁻¹¹ Nm²/kg²)">
    <SolHd />
    <P2>The gravitation force between the particles,</P2>
    <Mth key="b1-math-ill4a">{"$$F = \\frac{Gm_1 m_2}{r^2}$$"}</Mth>
    <P2>Acceleration of heavier particle,</P2>
    <Mth key="b1-math-ill4b">{"$$a_2 = \\frac{F}{m_2} = \\frac{Gm_1}{r^2} = \\frac{6{\\cdot}67\\times10^{-11}\\times1}{(0{\\cdot}5)^2} = \\boxed{2{\\cdot}67\\times10^{-10}\\text{ ms}^{-2}}$$"}</Mth>
    <P2>This example shows that gravitation is very weak force but only this force binds our solar system and the universe.</P2>
  </IllustrationBox>,

  // Illustration 5
  <IllustrationBox key="ill-5" num="5" title="A mass M is split into two parts m and M − m, which are then separated by a certain distance. What ratio of m/M will maximise the gravitational force between the two parts?">
    <SolHd />
    <P2>If {"$r$"} is the distance between {"$m$"} and {"$M - m$"}, the gravitational force between them is</P2>
    <Mth key="b1-math-ill5a">{"$$F = \\frac{Gm(M-m)}{r^2} = \\frac{G}{r^2}\\left(mM - m^2\\right)$$"}</Mth>
    <P2>For {"$F$"} to be maximum, {"$dF/dm = 0$"}</P2>
    <Mth key="b1-math-ill5b">{"$$\\Rightarrow \\quad \\frac{G}{r^2}(M-2m) = 0 \\qquad \\therefore \\quad \\boxed{\\frac{m}{M} = \\frac{1}{2}}$$"}</Mth>
  </IllustrationBox>,

  // Illustration 6
  <IllustrationBox key="ill-6" num="6" title="Assuming the earth to be a uniform sphere of radius 6400 km and density 5·5 g/cc, find the value of g on its surface. G = 6·66 × 10⁻¹¹ Nm² kg⁻².">
    <SolHd />
    <P2>Here, {"$R = 6400\\times10^3\\text{ m} = 6{\\cdot}4\\times10^6\\text{ m}$"},</P2>
    <Mth key="b1-math-ill6">{"$$\\begin{aligned} & \\rho = 5{\\cdot}5\\text{ g/cc} = 5{\\cdot}5\\times10^3\\text{ kg/m}^3 \\\\ & \\therefore \\quad g = \\frac{GM}{R^2} = \\frac{G}{R^2}\\times\\frac{4}{3}\\pi R^3 \\rho = \\frac{4}{3}\\pi GR\\rho \\\\ & \\quad = \\frac{4}{3}\\times\\pi\\times6{\\cdot}66\\times10^{-11}\\times6{\\cdot}4\\times10^6\\times5{\\cdot}5\\times10^3 \\\\ & \\quad = \\boxed{9{\\cdot}82\\text{ ms}^{-2}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // 3.4 Acceleration Due to Gravity
  <SecHd key="sec-s34" id="sec-s34" label="3.4" title="Acceleration Due to Gravity of the Earth" />,
  <P2 key="b1-p-s34-1">The gravitational field intensity or acceleration due to gravity at a point due to a mass {"$M$"} may be defined as the gravitational force that a unit mass {"$m$"} would experience if placed at that point. If the distance between masses {"$M$"} and {"$m$"} is {"$r$"}, then</P2>,
  <Mth key="b1-math-s34-1">{"$$g = \\frac{F}{m} = \\frac{GMm/r^2}{m} = \\frac{GM}{r^2}$$"}</Mth>,

  <SubSubHd key="sub-agsurf" id="sub-agsurf" title="Acceleration due to gravity on the surface of earth" />,
  <P2 key="b1-p-agsurf-1">The acceleration due to gravity on the surface of the earth of mass {"$M$"} and radius {"$R$"} is given by</P2>,
  <Mth key="b1-math-agsurf">{"$$g = \\frac{GM}{R^2}$$"}</Mth>,

  <SubSubHd key="sub-agsolid" id="sub-agsolid" title="Acceleration due to gravity due to a Uniform Solid Sphere" />,
  <P2 key="b1-p-agsolid-1"><strong>Case-I:</strong> Acceleration due to gravity at an external point.</P2>,
  <P2 key="b1-p-agsolid-2">Consider a point {"$P$"} at a distance {"$r$"} from the centre of sphere such that {"$r \\geq R$"}.</P2>,
  <Fig key="fig-3-6"
    src={CONTENT_IMAGES.CONTENT_IMAGE_6B0415A140881C747A36}
    num="FIGURE 3.6" caption="Point P outside a solid sphere" />,
  <P2 key="b1-p-agsolid-3">The acceleration due to gravity at point {"$P$"} is given by</P2>,
  <Mth key="b1-math-agsolid-ext">{"$$g = \\frac{GM}{r^2}. \\quad \\text{Hence, } g \\propto \\frac{1}{r^2}$$"}</Mth>,

  <P2 key="b1-p-agsolid-4"><strong>Case-II:</strong> Acceleration due to gravity at an internal point</P2>,
  <P2 key="b1-p-agsolid-5">Consider at a point {"$P$"} at a distance {"$r$"} from the centre of the sphere such that {"$r < R$"}. We divide the sphere in two parts</P2>,
  <ul key="b1-ul-agsolid" style={{ margin: "4px 0 8px 24px", padding: 0 }}>
    <li>Part one — a solid sphere of radius {"$r$"}</li>
    <li>Part two — shell of outer radius {"$R$"} and inner radius {"$r$"}</li>
  </ul>,
  <Fig key="fig-3-7"
    src={CONTENT_IMAGES.CONTENT_IMAGE_62D980E53E190CF86D96}
    num="FIGURE 3.7" caption="Point P inside a solid sphere" />,
  <P2 key="b1-p-agsolid-6">The gravitational field at point {"$P$"} is equal to the sum of field due to part one ({"$\\overrightarrow{g_1}$"}) and field due to part two ({"$\\overrightarrow{g_2}$"}),</P2>,
  <Mth key="b1-math-agsolid-int1">{"$$\\text{i.e.,} \\quad \\vec{g} = \\vec{g}_1 + \\vec{g}_2$$"}</Mth>,
  <P2 key="b1-p-agsolid-7">We have seen earlier that the field due to the shell at a point inside the shell is zero,</P2>,
  <Mth key="b1-math-agsolid-int2">{"$$\\text{i.e.,} \\quad \\vec{g}_2 = 0$$"}</Mth>,
  <P2 key="b1-p-agsolid-8">If {"$M_s$"} is the mass of solid sphere (i.e., of part one), then,</P2>,
  <Mth key="b1-math-agsolid-int3">{"$$g_1 = \\frac{GM_s}{r^2}$$"}</Mth>,
  <P2 key="b1-p-agsolid-9">If {"$\\rho$"} = density of the sphere, then</P2>,
  <Mth key="b1-math-agsolid-int4">{"$$\\begin{aligned} & M_s = \\rho\\frac{4}{3}\\pi r^3 \\quad \\text{and} \\quad M = \\rho\\frac{4}{3}\\pi R^3 \\\\ \\Rightarrow\\; & \\frac{M_s}{M} = \\frac{r^3}{R^3} \\quad \\text{or} \\quad M_s = \\frac{r^3}{R^3}M \\\\ \\Rightarrow\\; & g_1 = \\frac{G}{r^2}\\times\\frac{r^3}{R^3}M = \\frac{GM}{R^3}r \\\\ \\therefore\\; & g = g_1 + g_2 = \\frac{GM}{R^3}r + 0 = \\frac{GM}{R^3}r \\end{aligned}$$"}</Mth>,
  <P2 key="b1-p-agsolid-10">Hence, {"$g \\propto r$"}</P2>,
  <P2 key="b1-p-agsolid-11">It can therefore be concluded that</P2>,
  <Mth key="b1-math-agsolid-summary">{"$$\\begin{aligned} g &= \\frac{GM}{R^3}r & \\text{if} && r < R \\\\ &= \\frac{GM}{r^2} & \\text{if} && r \\geq R \\end{aligned}$$"}</Mth>,
  <Fig key="fig-3-8"
    src={CONTENT_IMAGES.CONTENT_IMAGE_685C7658E077AA5068FC}
    num="FIGURE 3.8" caption="Variation of g with distance r from centre of Earth" />,

  <SubSubHd key="sub-agheight" id="sub-agheight" title="Acceleration due to gravity at a small height above the surface of Earth" />,
  <P2 key="b1-p-agh-1">Consider a point {"$P$"} at a height {"$h$"} above the earth's surface.</P2>,
  <Fig key="fig-3-9"
    src={CONTENT_IMAGES.CONTENT_IMAGE_9413BF3EA6375F9D81DF}
    num="FIGURE 3.9" caption="Point P at height h above Earth's surface" />,
  <P2 key="b1-p-agh-2">Let {"$g_0$"} = acceleration due to gravity on the surface of Earth. Then, the value of {"$g$"} at height {"$h$"} is given by</P2>,
  <Mth key="b1-math-agh">{"$$g(h) = \\frac{GM}{(R+h)^2} = \\frac{GM}{R^2}\\left(\\frac{1}{(1+h/R)^2}\\right) \\approx g_0\\left(1+\\frac{h}{R}\\right)^{-2}$$"}</Mth>,
  <P2 key="b1-p-agh-3">For {"$h \\ll R$"}, using binomial expression, we get</P2>,
  <Mth key="b1-math-agh2">{"$$g(h) = g_0\\left(1 - \\frac{2h}{R}\\right)$$"}</Mth>,

  <GraspGripBox key="gg-agh">
    <P2>In the derivation of the formula {"$g(h) = g_0\\left(1 - \\dfrac{2h}{R}\\right)$"}, we have assumed that {"$h \\ll R$"}. Therefore, this formula can be used only if the height is very small compared to the Radius of Earth. For large heights, the formula to be used is {"$g(h) = \\dfrac{GM}{(R+h)^2}$"}</P2>
  </GraspGripBox>,

  <SubSubHd key="sub-agdepth" id="sub-agdepth" title="Acceleration due to gravity at some depth below the surface of Earth" />,
  <P2 key="b1-p-agd-1">Consider a point {"$P$"} at depth {"$d$"} below the earth's surface.</P2>,
  <Fig key="fig-3-10"
    src={CONTENT_IMAGES.CONTENT_IMAGE_092A5A04F9657978A672}
    num="FIGURE 3.10" caption="Point P at depth d below Earth's surface" />,
  <P2 key="b1-p-agd-2">Let {"$g_0$"} = acceleration due to gravity on the surface of Earth. Then, the value of {"$g$"} at depth {"$d$"} is given by</P2>,
  <Mth key="b1-math-agd">{"$$g(d) = \\frac{GM}{R^3}(R-d) = \\frac{GM}{R^2}\\left(1-\\frac{d}{R}\\right) = g_0\\left(1-\\frac{d}{R}\\right)$$"}</Mth>,

  <GraspGripBox key="gg-agd">
    <P2>In the derivation of the formula {"$g(d) = g_0\\left(1 - \\dfrac{d}{R}\\right)$"}, no assumption has been taken. Hence, this formula can be used for large depths also provided {"$0 \\leq d \\leq R$"}</P2>
  </GraspGripBox>,

  <SubSubHd key="sub-aglat" id="sub-aglat" title="Variation of g with Latitude due to rotation of the earth" />,
  <P2 key="b1-p-aglat-1">The earth rotates about its axis with angular velocity {"$\\omega$"} given by {"$\\omega = \\dfrac{2\\pi}{T}$"} where, {"$\\quad T = 24$"} hrs {"$= 24 \\times 3600$"} sec.</P2>,
  <Mth key="b1-math-aglat1">{"$$\\therefore \\quad \\omega = \\frac{2\\pi}{24\\times3600} = 7{\\cdot}27\\times10^{-5}\\text{ rad s}^{-1}$$"}</Mth>,
  <P2 key="b1-p-aglat-2">Consider a point {"$P$"} on the surface of the earth at a latitude {"$\\lambda$"} as shown in fig. 3.11.</P2>,
  <Fig key="fig-3-11"
    src={CONTENT_IMAGES.CONTENT_IMAGE_0A5E495B5B250C23CAB4}
    num="FIGURE 3.11" caption="Variation of g with latitude" />,
  <P2 key="b1-p-aglat-3">The effective acceleration due to gravity, {"$g'$"} at point {"$P$"} given by</P2>,
  <Mth key="b1-math-aglat2">{"$$g' = \\frac{F}{m} = g - \\omega^2 R\\cos^2\\lambda$$"}</Mth>,
  <P2 key="b1-p-aglat-4">At equator, {"$\\lambda = 0^\\circ$"} and hence, {"$\\quad g' = g - \\omega^2 R$"}.</P2>,
  <P2 key="b1-p-aglat-5">At poles, {"$\\lambda = 90^\\circ$"} and hence, {"$g' = g$"}</P2>,

  // Illustrations 7–10
  <IllustrationBox key="ill-7" num="7" title="Find the relation between the gravitational field on the surface of two planets A and B of masses M_A, M_B and radii R_A and R_B, respectively, if (a) they have equal mass (b) they have equal (uniform) density.">
    <SolHd />
    <P2>Let {"$g_A$"} and {"$g_B$"} be the gravitational field intensities on the surface of planets {"$A$"} and {"$B$"}. Then,</P2>
    <Mth key="b1-math-ill7a">{"$$g_A = \\frac{GM_A}{R_A^2} = \\frac{G(4/3)\\pi R_A^3\\rho_A}{R_A^2} = \\frac{4\\pi}{3}G\\rho_A R_A$$"}</Mth>
    <P2>Similarly, {"$\\quad g_B = \\dfrac{GM_B}{R_B^2} = \\dfrac{4\\pi}{3}G\\rho_B R_B$"}</P2>
    <P2>(a) For {"$M_A = M_B$"}, {"$\\quad \\dfrac{g_A}{g_B} = \\dfrac{R_B^2}{R_A^2}$"}</P2>
    <P2>(b) For {"$\\rho_A = \\rho_B$"}, {"$\\quad \\dfrac{g_A}{g_B} = \\dfrac{R_A}{R_B}$"}</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-8" num="8" title="The change in the value of g at a height h above the earth is same as at a depth d below it. If h and d are small as compared to the radius of the earth, what is the ratio (h/d)?">
    <SolHd />
    <P2>It is given that {"$\\quad g_0 - g(h) = g_0 - g(d)$"}</P2>
    <Mth key="b1-math-ill8">{"$$\\Rightarrow\\; g(h) = g(d) \\quad \\Rightarrow \\quad g_0\\left(1 - \\frac{2h}{R}\\right) = g_0\\left(1 - \\frac{d}{R}\\right)$$"}</Mth>
    <Mth key="b1-math-ill8b">{"$$\\Rightarrow\\; 2h = d \\qquad \\therefore \\quad \\boxed{\\frac{h}{d} = \\frac{1}{2}}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-9" num="9" title="At what altitude above the earth's surface would the acceleration due to gravity be half of its value at the earth's surface? Radius of the earth is 6400 km.">
    <SolHd />
    <P2>It is given that {"$g(h) = g_0/2$"}</P2>
    <P2>Here, {"$h$"} will be large and hence, the formula {"$g(h) = g_0\\left(1 - \\dfrac{2h}{R}\\right)$"} cannot be used.</P2>
    <P2>We shall use the formula</P2>
    <Mth key="b1-math-ill9">{"$$\\begin{aligned} & g(h) = \\frac{GM}{(R+h)^2} \\\\ \\Rightarrow\\; & \\frac{GM}{(R+h)^2} = \\frac{1}{2}\\frac{GM}{R^2} \\\\ \\Rightarrow\\; & (R+h)^2 = 2R^2 \\quad \\Rightarrow \\quad R+h = \\sqrt{2}\\,R \\\\ \\therefore\\; & h = (\\sqrt{2}-1)R = (\\sqrt{2}-1)\\times6400 = \\boxed{2651\\text{ km}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-10" num="10" title="Assuming the Earth to be a sphere of uniform mass density, how much would a body weigh half way down to the centre of the Earth if it weighed 250 N on the surface?">
    <SolHd />
    <P2>Weight of body mass {"$m$"} at {"$r = R/2$"},</P2>
    <Mth key="b1-math-ill10">{"$$\\begin{aligned} W &= \\frac{GMm}{R^3}\\,r = \\frac{GMm}{R^3}\\left(\\frac{R}{2}\\right) \\\\ &= \\frac{1}{2}\\left(\\frac{GMm}{R^2}\\right) = \\frac{1}{2}\\times250 = \\boxed{125\\text{ N}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,
];
const content_b2 = [
  // 3.5 Gravitational Potential Energy
  <SecHd key="sec-s35" id="sec-s35" label="3.5" title="Gravitational Potential Energy" />,
  <P2 key="b2-p-s35-1">The gravitational force is a conservative force and hence there is an associated potential energy function {"$U(r)$"}.</P2>,
  <P2 key="b2-p-s35-2">The concept of Gravitational Potential Energy was discussed in the chapter 'Work, Energy and Power'. We had discussed that when a body is raised through height {"$h$"}, its potential energy increases by {"$mgh$"}. This is because the force required to raise the body slowly is {"$F = mg$"} and the work done in raising it by height {"$h$"} is {"$W = Fh = mgh$"}. This work gets stored in the system as potential energy.</P2>,
  <P2 key="b2-p-s35-3">Note that the formula {"$mgh$"} for the increase in P.E. is applicable only if {"$h \\ll R$"} (Radius of earth) since the value of {"$g$"} remains almost constant for small heights.</P2>,
  <P2 key="b2-p-s35-4">In the chapter Gravitation, we deal with large heights. The value of {"$g$"} keeps decreasing as the body is raised and the force {"$F = mg$"} required to do so also keeps changing. The formula {"$mgh$"} for the increase in P.E. is no longer applicable now.</P2>,

  <SubHd key="sub-gpe2p" id="sub-gpe2p" title="Gravitational Potential Energy of two particle system" />,
  <P2 key="b2-p-gpe2p-1">We shall derive a formula of potential energy of a two particle system of masses {"$m_1$"} and {"$m_2$"} at a separation {"$r$"}. For this, we shall choose the potential energy to be zero when the distance between them is infinity. This means that we choose {"$U(\\infty) = 0$"}.</P2>,
  <P2 key="b2-p-gpe2p-2">This is a logical assumption since, using this assumption, we shall calculate the potential energy of a body (which is situated close to earth) only due to earth. The potential energy due to the other bodies like other planets, stars, etc. because of very large distance will be zero.</P2>,
  <P2 key="b2-p-gpe2p-3">The work done by the gravitational force {"$\\vec{F}$"} in displacing two particles of masses {"$m_1$"} and {"$m_2$"} through a small distance {"$\\overrightarrow{dr}$"} is given by</P2>,
  <Mth key="b2-math-gpe2p-1">{"$$\\vec{F}\\cdot d\\vec{r} = -\\frac{Gm_1 m_2}{r^2}\\,dr$$"}</Mth>,
  <P2 key="b2-p-gpe2p-4">Note that the negative sign is due the opposite directions of vectors {"$\\vec{F}$"} and {"$\\overrightarrow{dr}$"}. The force {"$\\vec{F}$"} is directed inwards and {"$\\overrightarrow{dr}$"} is directed outwards. The work done against the gravitational force is given by</P2>,
  <Mth key="b2-math-gpe2p-2">{"$$dW = -\\vec{F}\\cdot d\\vec{r} = \\frac{Gm_1 m_2}{r^2}\\,dr$$"}</Mth>,
  <P2 key="b2-p-gpe2p-5">Hence, the work done to bring the two particles from an infinite distance to a separation {"$r$"} by external agent is given by</P2>,
  <Mth key="b2-math-gpe2p-3">{"$$\\begin{aligned} W_{\\infty\\to r} &= U(r) - U(\\infty) \\\\ &= \\int_\\infty^r \\frac{Gm_1 m_2}{r^2}\\,dr \\\\ \\Rightarrow\\quad U(r) - 0 &= Gm_1 m_2\\int_\\infty^r \\frac{1}{r^2}\\,dr \\\\ &= Gm_1 m_2\\left[-\\frac{1}{r}\\right]_\\infty^r = Gm_1 m_2\\left[\\frac{1}{\\infty}-\\frac{1}{r}\\right] \\\\ \\therefore\\quad U(r) &= -\\frac{Gm_1 m_2}{r} \\end{aligned}$$"}</Mth>,
  <P2 key="b2-p-gpe2p-6"><strong>Accordingly, the Gravitational Potential Energy of a two particle system at a separation {"$r$"} is defined as the work done by an external agent to slowly bring the two particles from an infinite distance to the separation {"$r$"}.</strong></P2>,

  <GraspGripBox key="gg-gpe2p">
    <ol style={{ margin: "0 0 0 18px", padding: 0, lineHeight: 1.7 }}>
      <li style={{ marginBottom: 8 }}>The gravitational potential energy is a joint property of the two particles taken together. If however, one of the particles is massive compared to the other particle as in case of a earth block system, we may speak of the potential energy of the lighter mass (i.e., of block) only.</li>
      <li style={{ marginBottom: 8 }}>If a body is raised through height {"$h$"} such that {"$h \\ll R$"} where, {"$R$"} is the radius of earth, then it is convenient to take the increase in potential energy of the system as {"$mgh$"}, i.e., {"$\\Delta U = mgh$"}</li>
      <li style={{ marginBottom: 8 }}>For large value of {"$h$"}, we choose the potential energy of the two particle system to be zero when the distance between them is infinity. Accordingly, the formula for potential energy of a two particle system of masses {"$m_1$"} and {"$m_2$"} at a separation {"$r$"} is
        <Mth key="b2-math-gg-gpe">{"$$U(r) = -\\frac{Gm_1 m_2}{r}$$"}</Mth>
      </li>
      <li>The potential energy of a two particle system at a finite distance is always negative. Therefore, when a body is taken above the earth's surface, its potential energy keeps increasing, (i.e., it keeps becoming less negative) and finally becomes zero when the body is taken to infinity.</li>
    </ol>
  </GraspGripBox>,

  <SubHd key="sub-gpesys" id="sub-gpesys" title="Gravitational Potential Energy of a system of particles" />,
  <P2 key="b2-p-gpesys-1">The gravitational potential energy of a system of particles of masses {"$m_1, m_2, m_3, \\ldots m_n$"} is given by</P2>,
  <Mth key="b2-math-gpesys">{"$$U = -G\\left[\\frac{m_1 m_2}{r_{12}}+\\frac{m_1 m_3}{r_{13}}+\\ldots\\frac{m_1 m_n}{r_{1n}}+\\frac{m_2 m_3}{r_{23}}+\\ldots\\right]$$"}</Mth>,
  <P2 key="b2-p-gpesys-2">where {"$r_{12}$"} is the distance between masses {"$m_1$"} and {"$m_2$"}; {"$r_{23}$"} is the distance between masses {"$m_2$"} and {"$m_3$"} and so on.</P2>,
  <P2 key="b2-p-gpesys-3">For {"$n$"} particle system, there are {"${}^nC_2 = \\dfrac{n(n-1)}{2}$"} pairs. Potential energy is calculated for each pair and then added to obtain the potential energy for the system.</P2>,

  <SubHd key="sub-gp" id="sub-gp" title="Gravitational Potential" />,
  <P2 key="b2-p-gp-1">The gravitational potential due to mass {"$M$"} at a point at a distance {"$r$"} is defined as the work done by an external agent to slowly bring a particle of unit mass {"$m$"} from infinity to the given point and is given by</P2>,
  <Mth key="b2-math-gp">{"$$V(r) = \\frac{U(r)}{m} = \\frac{-GMm/r}{m} = \\frac{-GM}{r}$$"}</Mth>,
  <P2 key="b2-p-gp-2">The gravitational potential at a point may also be defined as the gravitational potential energy possessed by a unit mass {"$m$"} when placed at that point. The S.I. unit of gravitational potential is J/kg and is a scalar.</P2>,

  // Illustrations 11–13
  <IllustrationBox key="ill-11" num="11" title="How much of work is done in shifting a mass m from the surface of a planet of mass M to a height equal to its radius R?">
    <SolHd />
    <Fig key="fig-3-12"
      src={CONTENT_IMAGES.CONTENT_IMAGE_0CDF20FBAE473A2A1BDA}
      num="FIGURE 3.12" caption="Mass shifted from surface to height R" />
    <P2>Work done = Increase in potential energy</P2>
    <Mth key="b2-math-ill11">{"$$\\begin{aligned} &= U_f - U_i \\\\ &= \\left(-\\frac{GMm}{R+R}\\right) - \\left(-\\frac{GMm}{R}\\right) = \\boxed{\\frac{GMm}{2R}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-12" num="12" title="Three equal masses m are placed at the corners of an equilateral triangle of side a. What is the work done in doing this?">
    <SolHd />
    <P2 style={{ fontStyle: "italic", color: "#555" }}>[Fig. 3.13 — Equilateral triangle with masses at corners]</P2>
    <P2>Work done = Potential energy in final position − Potential energy in initial position</P2>
    <Mth key="b2-math-ill12">{"$$= \\left(-\\frac{Gm^2}{a}-\\frac{Gm^2}{a}-\\frac{Gm^2}{a}\\right) - 0 = \\boxed{\\frac{-3Gm^2}{a}}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-13" num="13" title="Two stars each of one solar mass (= 2 × 10³⁰ kg) are approaching each other for a head on collision. When they are at a distance 10⁹ km, their speeds are negligible. What is the speed with which they collide? The radius of each star is 10⁴ km. Assume the stars to remain undistorted until they collide. (G = 6·67 × 10⁻¹¹ Nm² kg⁻²)">
    <SolHd />
    <Fig key="fig-3-14"
      src={CONTENT_IMAGES.CONTENT_IMAGE_79594D0DDCBF721AA5B8}
      num="FIGURE 3.14" caption="Two stars approaching for head-on collision" />
    <P2>When the stars collide, the distance between them will be {"$2R$"} and their speed {"$v$"} will be same since they have same mass {"$M$"}. If {"$r$"} is the initial distance between them, then applying conservation of mechanical energy, we have</P2>
    <Mth key="b2-math-ill13">{"$$\\begin{aligned} & K_i + U_i = K_f + U_f \\\\ \\Rightarrow\\quad & 0 - \\frac{GM^2}{r} = 2\\times\\frac{1}{2}Mv^2 - \\frac{GM^2}{2R} \\\\ \\therefore\\quad & v = \\sqrt{GM\\left(\\frac{1}{2R}-\\frac{1}{r}\\right)} \\\\ = & \\sqrt{6{\\cdot}67\\times10^{-11}\\times2\\times10^{30}\\left(\\frac{1}{2\\times10^7}-\\frac{1}{10^{12}}\\right)} \\\\ = & \\boxed{2{\\cdot}6\\times10^6\\text{ m/s}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-14" num="14" title="A rocket is fired vertically with a speed of 5 kms⁻¹ from the earth's surface. How far from the earth's surface does the rocket go before returning to the earth? (M = 6 × 10²⁴ kg, mean radius of earth = 6·4 × 10⁶ m, G = 6·67 × 10⁻¹¹ Nm² kg⁻²)">
    <SolHd />
    <P2>Let {"$m$"} = mass of rocket</P2>
    <Fig key="fig-3-15"
      src={CONTENT_IMAGES.CONTENT_IMAGE_E59684164D9669C6AC30}
      num="FIGURE 3.15" caption="Rocket fired vertically from Earth's surface" />
    <P2>Applying conservation of mechanical energy between the initial and final positions, we have</P2>
    <Mth key="b2-math-ill14">{"$$\\begin{aligned} & K_i + U_i = K_f + U_f \\\\ \\Rightarrow\\quad & \\frac{1}{2}mv^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{R+h} \\\\ \\Rightarrow\\quad & \\frac{1}{R+h} = \\frac{1}{R} - \\frac{v^2}{2GM} \\\\ & = \\frac{1}{6{\\cdot}4\\times10^6} - \\frac{(5\\times10^3)^2}{2\\times6{\\cdot}67\\times10^{-11}\\times6\\times10^{24}} \\\\ & = 10^{-6}\\left[\\frac{10}{64} - \\frac{0{\\cdot}25}{8}\\right] = \\frac{10^{-6}}{8} \\\\ \\therefore\\quad & h = 8\\times10^6 - 6{\\cdot}4\\times10^6 = \\boxed{1{\\cdot}6\\times10^6\\text{ m}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // 3.6 Relation Between Gravitational Field and Potential
  <SecHd key="sec-s36" id="sec-s36" label="3.6" title="Relation Between Gravitational Field and Potential" />,
  <P2 key="b2-p-s36-1">Suppose the gravitational field at a point {"$\\vec{r}$"} due to a given mass distribution is {"$\\vec{g}$"}. By definition, the force on a particle of mass {"$m$"} when located at this point by the gravitational field is {"$\\vec{F} = m\\vec{g}$"}.</P2>,
  <P2 key="b2-p-s36-2">As the particle is displaced from {"$\\vec{r}$"} to {"$\\vec{r} + d\\vec{r}$"}, the work done by gravitational force on it is {"$\\vec{F}\\cdot d\\vec{r}$"} and the work done by external agent is {"$dW = -\\vec{F}\\cdot d\\vec{r}$"}. The change in potential energy during this displacement is</P2>,
  <Mth key="b2-math-s36-1">{"$$dU = dW = -\\vec{F}\\cdot d\\vec{r} = -m\\vec{g}\\cdot d\\vec{r}$$"}</Mth>,
  <P2 key="b2-p-s36-3">The change in potential is</P2>,
  <Mth key="b2-math-s36-2">{"$$dV = \\frac{dU}{m} = -\\vec{g}\\cdot d\\vec{r}$$"}</Mth>,
  <P2 key="b2-p-s36-4">and the gravitational potential is</P2>,
  <Mth key="b2-math-s36-3">{"$$V = -\\int_\\infty^r \\vec{g}\\cdot d\\vec{r}$$"}</Mth>,
  <P2 key="b2-p-s36-5">In cartesian coordinates,</P2>,
  <Mth key="b2-math-s36-4">{"$$\\begin{aligned} & \\vec{g} = g_x\\hat{i} + g_y\\hat{j} + g_z\\hat{k} \\quad \\text{and} \\quad \\vec{r} = dx\\hat{i} + dy\\hat{j} + dz\\hat{k} \\\\ \\therefore\\; dV &= -(g_x\\hat{i}+g_y\\hat{j}+g_z\\hat{k})\\cdot(dx\\hat{i}+dy\\hat{j}+dz\\hat{k}) \\\\ &= -(g_x\\,dx + g_y\\,dy + g_z\\,dz) \\\\ \\text{or}\\quad \\vec{g} &= -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j} + \\frac{\\partial V}{\\partial z}\\hat{k}\\right) \\end{aligned}$$"}</Mth>,
  <P2 key="b2-p-s36-6">The symbol {"$\\dfrac{\\partial V}{\\partial x}$"} means partial differentiation with respect to {"$x$"} treating {"$y$"} and {"$z$"} to be constants. If the gravitational field is along {"$x$"}-direction only, then</P2>,
  <Mth key="b2-math-s36-5">{"$$g = -\\frac{dV}{dx}$$"}</Mth>,

  // Illustration 15
  <IllustrationBox key="ill-15" num="15" title="The gravitational field in a region is given by g⃗ = −(20 N kg⁻¹)(î + ĵ). Find the gravitational potential at (x, y) if it is 6 J kg⁻¹ at origin.">
    <SolHd />
    <P2>The relation between gravitational field and gravitational potential is</P2>
    <Mth key="b2-math-ill15">{"$$\\begin{aligned} & dV = -\\vec{g}\\cdot\\overrightarrow{dr} = 20(\\hat{i}+\\hat{j})\\cdot(dx\\hat{i}+dy\\hat{j}) = 20\\,dx + 20\\,dy \\\\ \\Rightarrow\\; & \\int_6^V dV = 20\\int_0^x dx + 20\\int_0^y dy \\quad \\Rightarrow\\quad V - 6 = 20x + 20y \\\\ \\therefore\\; & \\boxed{V(x,y) = 20x + 20y + 6} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // 3.7 Gravitational Field and Potential Due to Bodies of Different Shapes
  <SecHd key="sec-s37" id="sec-s37" label="3.7" title="Gravitational Field and Potential Due to Bodies of Different Shapes" />,

  <SubHd key="sub-uss" id="sub-uss" title="Uniform Solid Sphere" />,
  <P2 key="b2-p-uss-1">We have already discussed earlier that the gravitational field due to a uniform solid sphere of mass {"$M$"} and radius {"$R$"} is given by</P2>,
  <Mth key="b2-math-uss-g">{"$$\\begin{aligned} g &= \\frac{GM}{R^3}r & \\text{if} && r < R \\\\ &= \\frac{GM}{r^2} & \\text{if} && r \\geq R \\end{aligned}$$"}</Mth>,
  <P2 key="b2-p-uss-2">Accordingly, the gravitational potential if {"$r \\geq R$"} is</P2>,
  <Mth key="b2-math-uss-vext">{"$$V = -\\int_\\infty^r \\vec{g}\\cdot d\\vec{r} = -\\int_\\infty^r -\\frac{GM}{r^2}\\,dr = \\int_\\infty^r \\frac{GM}{r^2}\\,dr = -\\frac{GM}{r}$$"}</Mth>,
  <P2 key="b2-p-uss-3">and if {"$r < R$"} is</P2>,
  <Mth key="b2-math-uss-vint">{"$$\\begin{aligned} V &= -\\int_\\infty^r \\vec{g}\\cdot d\\vec{r} = \\int_\\infty^R \\frac{GM}{r^2}\\,dr + \\int_R^r \\frac{GM}{R^3}r\\,dr \\\\ &= -\\frac{GM}{R} + \\frac{GM}{2R^3}\\left(r^2 - R^2\\right) = -\\frac{GM}{2R^3}\\left(3R^2 - r^2\\right) \\end{aligned}$$"}</Mth>,
  <P2 key="b2-p-uss-4">Therefore, we have</P2>,
  <Mth key="b2-math-uss-summary">{"$$\\begin{aligned} V &= -\\frac{GM}{2R^3}\\left(3R^2 - r^2\\right) & \\text{if} && r < R \\\\ &= -\\frac{GM}{r} & \\text{if} && r \\geq R \\end{aligned}$$"}</Mth>,
  <Fig key="fig-3-16"
    src={CONTENT_IMAGES.CONTENT_IMAGE_98692FB41E9B69F00725}
    num="FIGURE 3.16" caption="g and V vs r for a uniform solid sphere" />,

  <SubHd key="sub-utss" id="sub-utss" title="Uniform Thin Spherical Shell" />,
  <P2 key="b2-p-utss-1">The gravitational field due to a uniform thin spherical shell of mass {"$M$"} and radius {"$R$"} is given by</P2>,
  <Mth key="b2-math-utss-g">{"$$\\begin{aligned} g &= 0 & \\text{if} && r < R \\\\ &= \\frac{GM}{r^2} & \\text{if} && r \\geq R \\end{aligned}$$"}</Mth>,
  <P2 key="b2-p-utss-2">The gravitational potential is given by</P2>,
  <Mth key="b2-math-utss-v">{"$$\\begin{aligned} V &= -\\frac{GM}{R} & \\text{if} && r < R \\\\ &= -\\frac{GM}{r} & \\text{if} && r \\geq R \\end{aligned}$$"}</Mth>,
  <Fig key="fig-3-17a"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CBA62CAB62E7DA5939B0}
    num="FIGURE 3.17 (a)" caption="g and V vs r for a thin spherical shell" />,
  <Fig key="fig-3-17b"
    src={CONTENT_IMAGES.CONTENT_IMAGE_F40441F4378DD06D1399}
    num="FIGURE 3.17 (b)" caption="g and V graphs — thin spherical shell" />,

  <SubHd key="sub-ur" id="sub-ur" title="Uniform Ring" />,
  <P2 key="b2-p-ur-1">The gravitational field due to a uniform ring of mass {"$M$"} and radius {"$R$"} at a distance {"$r$"} from the centre on the axis is given by</P2>,
  <Mth key="b2-math-ur-g">{"$$g = \\frac{GMr}{\\left(R^2+r^2\\right)^{3/2}}$$"}</Mth>,
  <P2 key="b2-p-ur-2">The gravitational potential is given by</P2>,
  <Mth key="b2-math-ur-v">{"$$V = -\\frac{GM}{\\left(R^2+r^2\\right)^{1/2}}$$"}</Mth>,
  <Fig key="fig-3-18"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C95E56D9793895314458}
    num="FIGURE 3.18" caption="g and V vs r for a uniform ring on the axis" />,

  // 3.8 Gravitational Self Energy
  <SecHd key="sec-s38" id="sec-s38" label="3.8" title="Gravitational Self Energy" />,
  <P2 key="b2-p-s38-1"><strong>Gravitational self energy of a body is the potential energy stored within the body as the body is assembled from free individual particles.</strong> It is the energy required to accumulate small masses each of mass {"$dm$"} initially at infinite separation from each other, and form the desired shape.</P2>,

  <SubHd key="sub-gseuss" id="sub-gseuss" title="Gravitational Self Energy of Uniform Solid Sphere" />,
  <P2 key="b2-p-gseuss-1">We shall find the gravitational self energy of a sphere of radius {"$R$"} and mass {"$M$"} having a uniform mass density. Let's assume, we have accumulated some mass initially and have made sphere of radius {"$r$"}. Let its instantaneous mass be {"$m$"}. The potential at the surface of this sphere is</P2>,
  <Fig key="fig-3-19"
    src={CONTENT_IMAGES.CONTENT_IMAGE_14A40A9768896CFC76E5}
    num="FIGURE 3.19" caption="Building up a sphere shell by shell" />,
  <Mth key="b2-math-gseuss-1">{"$$V = -\\frac{Gm}{r} = -\\frac{G}{r}\\rho\\times\\frac{4}{3}\\pi r^3 = -\\frac{4}{3}\\pi\\rho G r^2$$"}</Mth>,
  <P2 key="b2-p-gseuss-2">Now, consider that a spherical shell of radius {"$r$"} and thickness {"$dr$"} is brought from infinity and assembled on it. Its mass is</P2>,
  <Mth key="b2-math-gseuss-2">{"$$dm = \\rho\\times4\\pi r^2\\,dr$$"}</Mth>,
  <P2 key="b2-p-gseuss-3">The work done to assemble this shell on the sphere is</P2>,
  <Mth key="b2-math-gseuss-3">{"$$dW = V\\,dm = -\\frac{4}{3}\\pi\\rho G r^2\\times4\\pi\\rho r^2\\,dr$$"}</Mth>,
  <P2 key="b2-p-gseuss-4">The work done to assemble the entire mass is</P2>,
  <Mth key="b2-math-gseuss-4">{"$$W = -\\left(\\rho\\frac{4}{3}\\pi\\right)^2\\times3G\\int_0^R r^4\\,dr = -\\left(\\rho\\frac{4}{3}\\pi R^3\\right)^2\\times\\frac{3}{5}\\frac{G}{R} = -\\frac{3}{5}\\frac{GM^2}{R}$$"}</Mth>,
  <P2 key="b2-p-gseuss-5">Therefore, the self gravitational potential energy of uniform solid sphere is</P2>,
  <Mth key="b2-math-gseuss-result">{"$$\\boxed{-\\frac{3}{5}\\frac{GM^2}{R}}$$"}</Mth>,

  <SubHd key="sub-gseutss" id="sub-gseutss" title="Gravitational Self Energy of Uniform Thin Spherical Shell" />,
  <P2 key="b2-p-gseutss-1">We shall now find the gravitational self energy of a thin spherical shell of radius {"$R$"} and mass {"$M$"} having a uniform mass density. We shall form a shell by adding each time a very thin shell of mass {"$dm$"} and radius {"$R$"} to the already accumulated mass in the form of shell of instantaneous mass {"$m$"} and radius {"$R$"}. The potential at the surface of already accumulated mass is</P2>,
  <Mth key="b2-math-gseutss-1">{"$$V = -\\frac{Gm}{R}$$"}</Mth>,
  <P2 key="b2-p-gseutss-2">and the work done to assemble shell of mass {"$dm$"} is</P2>,
  <Mth key="b2-math-gseutss-2">{"$$dW = V\\,dm = -\\frac{Gm}{R}\\,dm$$"}</Mth>,
  <P2 key="b2-p-gseutss-3">The work done to assemble the entire mass is</P2>,
  <Mth key="b2-math-gseutss-3">{"$$W = -\\int_0^M \\frac{Gm\\,dm}{R} = -\\frac{GM^2}{2R}$$"}</Mth>,
  <P2 key="b2-p-gseutss-4">Therefore, the self gravitational potential energy of uniform thin spherical shell is</P2>,
  <Mth key="b2-math-gseutss-result">{"$$\\boxed{-\\frac{GM^2}{2R}}$$"}</Mth>,
];
const content_b3 = [
  // 3.9 Escape Speed
  <SecHd key="sec-s39" id="sec-s39" label="3.9" title="Escape Speed" />,
  <P2 key="b3-p-s39-1">The gravitational force is a conservative force and hence the total mechanical energy (i.e., the sum of kinetic and potential energies) of a system of particles moving under the influence of gravitational force is conserved.</P2>,
  <P2 key="b3-p-s39-2">When a body is projected vertically upwards (from the surface of earth) with a certain speed, its kinetic energy keeps decreasing and potential energy keeps increasing. The body rises upto a certain height till its kinetic energy becomes zero and then falls back to the earth. As the speed of projection is increased, the body attains a greater height before falling. As the speed of projection is increased beyond a certain value, the body never returns back to the earth. The body is said to have escaped. This certain value is the escape speed and is denoted by {"$v_e$"}.</P2>,
  <DefBox key="b3-def-es"><strong>The escape speed is therefore defined as the minimum speed with which a body has to be projected upwards from the surface of a planet so that the body crosses the gravitational field of the planet and never returns back on its own.</strong></DefBox>,
  <P2 key="b3-p-s39-3">We shall estimate this speed neglecting the resistance of the body by the planet's atmosphere. Consider a body of mass {"$m$"} projected with escape speed {"$v_e$"} from the surface of a planet of mass {"$M$"} and radius {"$R$"}. The initial mechanical energy of the body on the surface of planet is given by</P2>,
  <Mth key="b3-math-s39-1">{"$$E_i = K_i + P_i = \\frac{1}{2}mv_e^2 - \\frac{GMm}{R}$$"}</Mth>,
  <P2 key="b3-p-s39-4">Since, the body has been projected with escape speed, it will just be able to reach infinity and hence, its speed after reaching infinitely will be zero. The final mechanical energy of the body at infinity is</P2>,
  <Mth key="b3-math-s39-2">{"$$E_f = K_f + P_f = 0 + 0 = 0$$"}</Mth>,
  <P2 key="b3-p-s39-5">By conservation of mechanical energy, {"$E_i = E_f$"}</P2>,
  <Mth key="b3-math-s39-3">{"$$\\text{i.e.,}\\quad \\frac{1}{2}mv_e^2 - \\frac{GMm}{R} = 0 \\quad \\text{or} \\quad v_e = \\sqrt{\\frac{2GM}{R}}$$"}</Mth>,
  <P2 key="b3-p-s39-6">Since, {"$\\quad g = \\dfrac{GM}{R^2}$"}, we have {"$\\dfrac{GM}{R} = gR$"}</P2>,
  <Mth key="b3-math-s39-4">{"$$\\therefore\\quad v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$$"}</Mth>,
  <P2 key="b3-p-s39-7">This works out to {"$11{\\cdot}2$"} km/s for Earth, {"$2{\\cdot}3$"} km/s for Moon, {"$60$"} km/s for Jupiter, {"$618$"} km/s for Sun.</P2>,
  <P2 key="b3-p-s39-8">Note that the escape speed at a planet is independent of the mass of the body.</P2>,

  <GraspGripBox key="gg-s39">
    <ol style={{ margin: "0 0 0 18px", padding: 0, lineHeight: 1.7 }}>
      <li style={{ marginBottom: 8 }}>To calculate escape speed, it is always convenient to use the following concept. Escape speed is the speed with which a body has to be projected so that its mechanical energy, i.e., sum of its kinetic energy and potential energy is zero.</li>
      <li style={{ marginBottom: 8 }}>The escape speed is independent of the angle of projection. The only requirement for the body to escape is that its mechanical energy should be greater or equal to zero and it should have not suffered any collision during its motion which would have resulted in loss of energy.</li>
      <li style={{ marginBottom: 8 }}>If the body is projected with escape speed, the body will lose its entire kinetic energy while escaping and its speed will be zero after escaping.</li>
      <li>If the body is projected with speed greater than escape speed, the body will lose a part of its kinetic energy while escaping and its speed will be non zero after escaping.</li>
    </ol>
  </GraspGripBox>,

  // Illustrations 16–19
  <IllustrationBox key="ill-16" num="16" title="Calculate the escape velocity from the surface of moon. The mass of the moon is 7·4 × 10²² kg and radius is 1·74 × 10⁶ m. (G = 6·67 × 10⁻¹¹ Nm² kg⁻²)">
    <SolHd />
    <Mth key="b3-math-ill16">{"$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{\\frac{2\\times6{\\cdot}67\\times10^{-11}\\times7{\\cdot}4\\times10^{22}}{1{\\cdot}74\\times10^6}}$$"}</Mth>
    <Mth key="b3-math-ill16b">{"$$= \\boxed{2{\\cdot}38\\times10^3\\text{ m/s} = 2{\\cdot}38\\text{ km/s}}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-17" num="17" title="Does the escape speed of a body from the Earth depend on (a) the mass of the body. (b) the location on earth from where it is projected (c) the direction of projection (d) the height of the location from where the body is launched?">
    <SolHd />
    <P2>The escape speed is independent of mass of the body and the direction of projection. It depends upon the gravitational potential at the point from where the body is launched. Since this potential depends on the height and slightly on the latitude of the point, the escape speed depends on these factors.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-18" num="18" title="The escape speed of a projectile on the Earth's surface is 11·2 km s⁻¹. A body is projected out with thrice this speed. What is the speed of the body far away from the Earth? Ignore the presence of the Sun and other planets.">
    <SolHd />
    <P2>Applying conservation of mechanical energy between the initial point (when the body is projected) and the final point (when the body is far away from earth), we have</P2>
    <Mth key="b3-math-ill18">{"$$\\begin{aligned} & K_i + U_i = K_f + U_f \\\\ \\Rightarrow\\; & \\frac{1}{2}m(3v_e)^2 - \\frac{GMm}{R} = \\frac{1}{2}mv^2 + 0 \\\\ & \\left(\\text{Since, } v_e = \\sqrt{\\frac{2GM}{R}},\\text{ we write } \\frac{GM}{R} = \\frac{v_e^2}{2}\\right) \\\\ \\Rightarrow\\; & \\frac{9}{2}mv_e^2 - \\frac{1}{2}mv_e^2 = \\frac{1}{2}mv^2 \\\\ \\therefore\\quad & v = \\sqrt{8}\\,v_e = \\sqrt{8}\\times11{\\cdot}2 = \\boxed{31{\\cdot}7\\text{ km/s}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-19" num="19" title="A body is projected upwards with a velocity half of the escape velocity. If the radius of the earth is R, to what height h (in terms of R), the body can go above the earth's surface?">
    <SolHd />
    <P2>Let {"$m$"} be the mass of the body.</P2>
    <Fig key="fig-3-20"
      src={CONTENT_IMAGES.CONTENT_IMAGE_DE1FA736563577B6F832}
      num="FIGURE 3.20" caption="Body projected with half escape velocity" />
    <P2>Applying conservation of mechanical energy between the initial and final positions, we have</P2>
    <Mth key="b3-math-ill19">{"$$\\begin{aligned} K_i + U_i &= K_f + U_f \\\\ \\Rightarrow\\quad & \\frac{1}{2}m\\left(\\frac{v_e}{2}\\right)^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{R+h} \\\\ \\Rightarrow\\quad & \\frac{1}{8}m\\frac{2GM}{R} - \\frac{GMm}{R} = -\\frac{GMm}{R+h} \\\\ \\Rightarrow\\quad & \\frac{1}{R+h} = \\frac{3}{4R} \\qquad \\therefore\\quad \\boxed{h = R/3} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // 3.10 Orbital Speed and Time Period of Satellite
  <SecHd key="sec-s310" id="sec-s310" label="3.10" title="Orbital Speed and Time Period of Satellite" />,
  <P2 key="b3-p-s310-1">Planets move around the sun in elliptical orbits. However, if the difference in major and minor axes is not large, the orbits can be treated as nearly circular for simplified calculations. The motion of satellite around the planet is similar to the motion of planet around the sun.</P2>,

  <SubHd key="sub-oss" id="sub-oss" title="Orbital Speed of Satellite" />,
  <P2 key="b3-p-oss-1">For a circular orbit of a given radius, the speed of the satellite is fixed which is known as the orbital speed of the satellite. Consider a satellite of mass {"$m$"} moving with the speed {"$v_0$"} around the planet of mass {"$M$"} in a circular orbit of radius {"$r$"}.</P2>,
  <Fig key="fig-3-21"
    src={CONTENT_IMAGES.CONTENT_IMAGE_DB6074384D40D789CD3D}
    num="FIGURE 3.21" caption="Satellite in circular orbit around a planet" />,
  <P2 key="b3-p-oss-2">The force acting on the satellite is the gravitational pull of the planet given by {"$F = \\dfrac{GMm}{r^2}$"}. This force provides the necessary centripetal acceleration, {"$a = v_0^2/r$"} to keep the satellite in orbit. Hence, we have</P2>,
  <Mth key="b3-math-oss-1">{"$$\\frac{GMm}{r^2} = \\frac{mv_0^2}{r}$$"}</Mth>,
  <P2 key="b3-p-oss-3">Therefore, the orbital speed,</P2>,
  <Mth key="b3-math-oss-2">{"$$v_0 = \\sqrt{\\frac{GM}{r}}$$"}</Mth>,

  <SubHd key="sub-tps" id="sub-tps" title="Time period of satellite" />,
  <P2 key="b3-p-tps-1">It is the time taken by satellite (denoted by {"$T$"}) to complete one revolution around the earth. The above equation can be written as</P2>,
  <Mth key="b3-math-tps">{"$$\\begin{aligned} & \\frac{GMm}{r^2} = m\\omega^2 r = m\\left(\\frac{2\\pi}{T}\\right)^2 r \\\\ \\therefore\\quad & T^2 = \\frac{4\\pi^2}{GM}r^3 \\quad \\text{or} \\quad T = \\sqrt{\\frac{4\\pi^2 r^3}{GM}} \\end{aligned}$$"}</Mth>,
  <P2 key="b3-p-tps-2">The time period of the orbiting satellite therefore, increases as its distance from the earth increases.</P2>,
  <P2 key="b3-p-tps-3">For a satellite orbiting close to the earth's surface, we take {"$r = R$"} (Radius of the earth). By substituting this value in the above formula, we get {"$T = 5{\\cdot}08\\times10^3$"} sec {"$= 84{\\cdot}6$"} min. Kepler's third law of planetary motion can be extended to a satellite revolving around a planet in circular orbit. According to the law, the square of time period of revolution of a satellite is proportional to the cube of the radius of its orbit. The above equation confirms this statement.</P2>,

  // Illustrations 20–22
  <IllustrationBox key="ill-20" num="20" title="Calculate the orbital velocity of satellite revolving at a height h above the earth's surface if h = R. Also calculate the time period of this satellite. (g = 9·8 m/s², R = 6400 km)">
    <SolHd />
    <P2>Here, {"$r = R + h = R + R = 2R$"}</P2>
    <P2>Orbital velocity, {"$v_0 = \\sqrt{\\dfrac{GM}{r}} = \\sqrt{\\dfrac{GM}{2R}}$"}</P2>
    <Mth key="b3-math-ill20a">{"$$\\left(\\text{Since, }g = \\frac{GM}{R^2},\\text{ we write }\\frac{GM}{R} = gR\\right)$$"}</Mth>
    <Mth key="b3-math-ill20b">{"$$\\therefore\\quad v_0 = \\sqrt{\\frac{gR}{2}} = \\sqrt{\\frac{9{\\cdot}8\\times6{\\cdot}4\\times10^6}{2}} = \\boxed{5{\\cdot}6\\times10^3\\text{ m/s} = 5{\\cdot}6\\text{ km/s}}$$"}</Mth>
    <P2>Time period, {"$T = \\sqrt{\\dfrac{4\\pi^2 r^3}{GM}} = \\sqrt{\\dfrac{4\\pi^2(2R)^3}{GM}}$"}</P2>
    <Mth key="b3-math-ill20c">{"$$= \\sqrt{\\frac{32\\pi^2 R}{g}} = \\sqrt{\\frac{32\\pi^2\\times6{\\cdot}4\\times10^6}{9{\\cdot}8}} = \\boxed{14{\\cdot}36\\times10^3\\text{ sec} \\approx 4\\text{ hrs.}}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-21" num="21" title="A spaceship is launched into a circular orbit very close to the earth's surface. What additional speed should now be imparted to the space ship so that it overcomes the gravitational pull of the earth. The mass of earth is M and its radius is R.">
    <SolHd />
    <P2>The orbital speed and escape speed of the space ship are respectively</P2>
    <Mth key="b3-math-ill21a">{"$$v_0 = \\sqrt{\\frac{GM}{R}} \\quad \\text{and} \\quad v_e = \\sqrt{\\frac{2GM}{R}}$$"}</Mth>
    <P2>The additional speed that should be imparted to spaceship is</P2>
    <Mth key="b3-math-ill21b">{"$$v_e - v_0 = \\sqrt{\\frac{2GM}{R}} - \\sqrt{\\frac{GM}{R}} = \\boxed{(\\sqrt{2}-1)\\sqrt{\\frac{GM}{R}}}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-22" num="22" title="The fastest possible rate of rotation of a planet is that for which the gravitational force on material at the equator barely provides the centripetal force needed for the rotation. (Why?) Show that the corresponding shortest period of rotation is given by T = √(3π/Gρ) where ρ is the density of the planet, assumed to be homogeneous.">
    <SolHd />
    <P2>If the planet rotates faster than a particular angular velocity, then the centrifugal outward force on the objects on its surface will be more than the gravitational inward force. The objects including the mountains, rocks and land of the planet would then fly off resulting in disintegration of the planet. The shortest time period {"$T$"} of the planet corresponds to its maximum angular velocity so that the objects on its surface do not fly off. If the planet rotates with shortest time period {"$T$"}, then the net force on the object (in the frame of planet) lying on its equator must be zero. If {"$R$"} is the radius of planet, {"$m$"} is the mass of object lying on the equator, and {"$M$"} is the mass of the planet, then</P2>
    <Mth key="b3-math-ill22">{"$$\\begin{aligned} & m\\left(\\frac{2\\pi}{T}\\right)^2 R = \\frac{GMm}{R^2} = \\frac{Gm}{R^2}\\times\\rho\\times\\frac{4}{3}\\pi R^3 = \\frac{4\\pi\\rho GRm}{3} \\\\ & \\therefore\\quad \\boxed{T = \\sqrt{\\frac{3\\pi}{G\\rho}}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // 3.11 Energy of an Orbiting Satellite
  <SecHd key="sec-s311" id="sec-s311" label="3.11" title="Energy of an Orbiting Satellite" />,
  <P2 key="b3-p-s311-1">Consider a satellite of mass {"$m$"} moving in a circular orbit of radius {"$r$"} with speed {"$v_0$"} around the planet of mass {"$M$"}. The mechanical energy ({"$E$"}) associated with the satellite is equal to the sum of its kinetic energy ({"$K$"}) and the potential energy ({"$U$"})</P2>,
  <Mth key="b3-math-s311-1">{"$$\\begin{aligned} \\text{i.e.,} \\quad & E = K + U \\\\ \\text{where,} \\quad & K = \\frac{1}{2}mv_0^2 = \\frac{1}{2}m\\left(\\frac{GM}{r}\\right) = \\frac{GMm}{2r} \\end{aligned}$$"}</Mth>,
  <P2 key="b3-p-s311-2">and {"$U = -\\dfrac{GMm}{r}$"}</P2>,
  <Mth key="b3-math-s311-2">{"$$\\therefore\\quad E = \\frac{GMm}{2r} - \\frac{GMm}{r} = -\\frac{GMm}{2r}$$"}</Mth>,

  <GraspGripBox key="gg-s311">
    <ol style={{ margin: "0 0 0 18px", padding: 0, lineHeight: 1.7 }}>
      <li style={{ marginBottom: 8 }}>The kinetic energy and the mechanical energy of a satellite orbiting in a circular orbit are equal in magnitude. The mechanical energy is equal to half the potential energy.
        <Mth key="b3-math-gg311">{"$$\\therefore\\quad |E| = |K| = |U/2|$$"}</Mth>
      </li>
      <li>The mechanical energy of satellite is negative. If the mechanical energy were positive or zero, the satellite would have escaped to infinity.</li>
    </ol>
  </GraspGripBox>,

  <SubHd key="sub-gbe" id="sub-gbe" title="Gravitational Binding Energy" />,
  <P2 key="b3-p-gbe-1">Mechanical Energy, i.e., the sum of kinetic energy and potential energy of a closed system is negative.</P2>,
  <DefBox key="b3-def-gbe"><strong>The gravitational binding energy of a system of particles is the amount of energy required to pull all the particles apart, to infinity.</strong> It is equal to the negative of the mechanical energy of the system.</DefBox>,
  <P2 key="b3-p-gbe-2">For an object of mass {"$m$"} placed at rest on the surface of earth of mass {"$M$"} and radius {"$R$"}, the mechanical energy is</P2>,
  <Mth key="b3-math-gbe-1">{"$$\\begin{aligned} & E = U + K = -\\frac{GMm}{R} + 0 = -\\frac{GMm}{R} \\\\ \\therefore\\; & \\text{Binding Energy} = -E = \\frac{GMm}{R} \\end{aligned}$$"}</Mth>,
  <P2 key="b3-p-gbe-3">For a satellite of mass {"$m$"} revolving around the earth in a circular orbit of radius {"$r$"}, the mechanical energy is</P2>,
  <Mth key="b3-math-gbe-2">{"$$\\begin{aligned} & E = U + K = -\\frac{GMm}{R} + \\frac{GMm}{2R} = -\\frac{GMm}{2R} \\\\ \\therefore\\; & \\text{Binding Energy} = -E = \\frac{GMm}{2R} \\end{aligned}$$"}</Mth>,
  <P2 key="b3-p-gbe-4">It is due to this energy that the satellite is attached to the earth. If this energy is supplied to the satellite, the satellite no longer remains bound to the earth. It goes out of the gravitational field of the earth.</P2>,

  // Illustrations 23–24
  <IllustrationBox key="ill-23" num="23" title="A satellite orbits the earth at a height of 400 km above the surface. How much energy must be expended to rocket the satellite out of the Earth's gravitational influence? Mass of the satellite, m = 200 kg, Mass of the Earth, M = 6·0 × 10²⁴ kg, Radius of the Earth, R = 6·4 × 10⁶ m, G = 6·67 × 10⁻¹¹ Nm² kg⁻²">
    <SolHd />
    <P2>The mechanical energy of satellite is</P2>
    <Mth key="b3-math-ill23">{"$$E = -\\frac{GMm}{2(R+h)} = -\\frac{6{\\cdot}67\\times10^{-11}\\times6\\times10^{24}\\times200}{2\\left(6{\\cdot}4\\times10^6+0{\\cdot}4\\times10^6\\right)} = \\boxed{-5{\\cdot}88\\times10^9\\text{ J}}$$"}</Mth>
    <P2>Therefore, energy required to rocket the satellite out of the Earth's gravitational influence is {"$5{\\cdot}88\\times10^9$"} J.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-24" num="24" title="What should be the percentage increase in velocity of the moon for moon to escape from the gravitational pull of the earth?">
    <SolHd />
    <P2>The escape velocity and orbital velocity of moon are respectively given by</P2>
    <Mth key="b3-math-ill24a">{"$$v_e = \\sqrt{\\frac{2GM}{r}} \\quad \\text{and} \\quad v_0 = \\sqrt{\\frac{GM}{r}}$$"}</Mth>
    <Mth key="b3-math-ill24b">{"$$\\Rightarrow\\quad v_e = \\sqrt{2}\\,v_0$$"}</Mth>
    <P2>Therefore, percentage increase in velocity for the moon to escape is</P2>
    <Mth key="b3-math-ill24c">{"$$\\frac{v_e - v_0}{v_0}\\times100 = (\\sqrt{2}-1)\\times100 = \\boxed{41{\\cdot}4\\%}$$"}</Mth>
  </IllustrationBox>,

  // 3.12 Geostationary Satellite
  <SecHd key="sec-s312" id="sec-s312" label="3.12" title="Geostationary Satellite" />,
  <DefBox key="b3-def-gs">A satellite which orbits in the plane of equator at a distance such that its orbital period coincides with the rotational period of earth (i.e., one day) appears to be stationary to an observer on the earth and is called <strong>geostationary satellite.</strong> The orbit in which the geostationary satellite orbits is known as <strong>geostationary</strong> or <strong>geosynchronous orbit.</strong></DefBox>,
  <Fig key="fig-3-22"
    src={CONTENT_IMAGES.CONTENT_IMAGE_C766C8DA139EB9DC8226}
    num="FIGURE 3.22" caption="Geostationary orbit around Earth" />,
  <P2 key="b3-p-s312-1">It is necessary that such a satellite must orbit in the plane of equator, i.e., its axis of revolution around the earth and of rotation of the earth must coincide. Also, its sense of direction should be same as that of the earth, i.e., from west to east.</P2>,
  <P2 key="b3-p-s312-2">In the equation, {"$T^2 = \\dfrac{4\\pi^2}{GM}r^3$"}, discussed earlier, we substitute {"$r = R + h$"} where, {"$h$"} = height of the satellite above the earth's surface. Then, we have</P2>,
  <Mth key="b3-math-s312">{"$$\\begin{aligned} & T^2 = \\frac{4\\pi^2}{GM}(R+h)^3 \\quad \\text{or} \\quad R+h = \\left(\\frac{GMT^2}{4\\pi^2}\\right)^{1/3} \\\\ \\therefore\\; & h = \\left(\\frac{GMT^2}{4\\pi^2}\\right)^{1/3} - R \\end{aligned}$$"}</Mth>,
  <P2 key="b3-p-s312-3">Substituting the value of {"$T = 1$"} day {"$= 24\\times3600$"} sec., we get</P2>,
  <Mth key="b3-math-s312b">{"$$h = 3{\\cdot}6\\times10^7\\text{ m} = 36000\\text{ km}$$"}</Mth>,
  <P2 key="b3-p-s312-4">Hence, <strong>a geostationary satellite orbits at a height 36000 km above the earth's surface.</strong></P2>,
  <Fig key="fig-3-23"
    src={CONTENT_IMAGES.CONTENT_IMAGE_4DAC38C710D4B10B8D3F}
    num="FIGURE 3.23" caption="Satellite at height h above Earth's surface" />,
  <P2 key="b3-p-s312-5">Fig. 3.23 shows three uniformly spaced satellites in geostationary orbit. This configuration of satellites can provide line of sight global communication between any two points on the earth.</P2>,

  // 3.13 Binary Star System
  <SecHd key="sec-s313" id="sec-s313" label="3.13" title="Binary Star System" />,
  <P2 key="b3-p-s313-1">A binary star is a star system consisting of two stars orbiting around their common centre of mass.</P2>,
  <P2 key="b3-p-s313-2">Consider two stars of mass {"$M_1$"} and {"$M_2$"} having distance {"$r$"} between their centres and moving in circular orbits of radius {"$r_1$"} and {"$r_2$"} respectively due to their mutual gravitational force of attraction {"$F$"}. Then, we have</P2>,
  <Mth key="b3-math-s313-1">{"$$M_1 r_1 = M_2 r_2 \\quad \\text{and} \\quad r_1 + r_2 = r$$"}</Mth>,
  <Fig key="fig-3-24"
    src={CONTENT_IMAGES.CONTENT_IMAGE_17A0DEFEE220885FFABB}
    num="FIGURE 3.24" caption="Binary star system orbiting common centre of mass" />,
  <Mth key="b3-math-s313-2">{"$$\\Rightarrow\\quad r_1 = \\frac{M_2 r}{M_1+M_2} \\quad \\text{and} \\quad r_2 = \\frac{M_1 r}{M_1+M_2}$$"}</Mth>,
  <Mth key="b3-math-s313-3">{"$$F = \\frac{GM_1 M_2}{r^2} = \\frac{M_1 v_1^2}{r_1} = \\frac{M_2 v_2^2}{r_2}$$"}</Mth>,
  <P2 key="b3-p-s313-3">On solving, we get</P2>,
  <Mth key="b3-math-s313-4">{"$$v_1 = M_2\\sqrt{\\frac{G}{(M_1+M_2)r}} \\quad \\text{and} \\quad v_2 = M_1\\sqrt{\\frac{G}{(M_1+M_2)r}}$$"}</Mth>,
  <P2 key="b3-p-s313-4">If {"$\\quad M_1 = M_2 = M$"}, then {"$r_1 = r_2 = \\dfrac{r}{2}$"} and {"$v_1 = v_2 = \\sqrt{\\dfrac{GM}{2r}}$"}</P2>,
  <P2 key="b3-p-s313-5">Many stars are part of either binary star systems or star systems with more than two stars, called multiple star systems. In a multiple star system, all stars revolve about their common centre of mass.</P2>,

  <SubHd key="sub-tpbss" id="sub-tpbss" title="Time Period of revolution in a Binary Star System" />,
  <P2 key="b3-p-tpbss-1">If in a binary star system, {"$T$"} is the time period of revolution of say star of mass {"$M_1$"} about the centre of mass, then we have</P2>,
  <Mth key="b3-math-tpbss">{"$$\\begin{aligned} & \\frac{GM_1 M_2}{r^2} = M_1\\left(\\frac{2\\pi}{T}\\right)^2 r_1 \\\\ \\Rightarrow\\; & \\frac{GM_1 M_2}{r^2} = M_1\\left(\\frac{2\\pi}{T}\\right)^2 \\frac{M_2 r}{M_1+M_2} \\\\ \\Rightarrow\\; & T^2 = \\frac{4\\pi^2}{G(M_1+M_2)}r^3 \\qquad \\therefore\\quad T = \\sqrt{\\frac{4\\pi^2 r^3}{G(M_1+M_2)}} \\end{aligned}$$"}</Mth>,

  <GraspGripBox key="gg-s313">
    <ol style={{ margin: "0 0 0 18px", padding: 0, lineHeight: 1.7 }}>
      <li style={{ marginBottom: 8 }}>In a binary star system, the time period of revolution of both stars about their common centre of mass is same.</li>
      <li>If {"$T$"} is the time period of revolution of stars about their centre of mass and {"$r$"} is the distance between them, then {"$T^2 \\propto r^3$"}</li>
    </ol>
  </GraspGripBox>,

  // Illustrations 25–26
  <IllustrationBox key="ill-25" num="25" title="Two particles each of mass m, move in a circle of radius r under the action of their mutual gravitational attraction. Find the speed of each particle.">
    <Fig key="fig-3-25"
      src={CONTENT_IMAGES.CONTENT_IMAGE_F91361478025EE42B962}
      num="FIGURE 3.25" caption="Two equal masses in circular orbit" />
    <SolHd />
    <P2>Consider one of the two particles. For its motion in circle,</P2>
    <P2>Outward centrigugal force = Inward gravitational force</P2>
    <Mth key="b3-math-ill25">{"$$\\Rightarrow\\; \\frac{mv^2}{r} = \\frac{Gmm}{(2r)^2} \\qquad \\therefore\\quad \\boxed{v = \\frac{1}{2}\\sqrt{\\frac{Gm}{r}}}$$"}</Mth>
  </IllustrationBox>,

  <IllustrationBox key="ill-26" num="26" title="In a double star, two stars, (one of mass M₁ and the other of mass M₂) having distance d between their centers, rotate about their common center of mass. Show that the ratio of their angular moments about the center of mass is the same as the ratio of their kinetic energies.">
    <SolHd />
    <P2>Both stars orbit around their common center of mass with same time period and hence same angular velocity {"$\\omega$"}.</P2>
    <P2>Let {"$I_1$"} and {"$I_2$"} respectively be the moment of inertia of the two stars about their common center of mass (COM). The ratio of their angular moments about COM is</P2>
    <Mth key="b3-math-ill26a">{"$$\\frac{L_1}{L_2} = \\frac{I_1\\omega}{I_2\\omega} = \\frac{I_1}{I_2}$$"}</Mth>
    <P2>The ratio of their kinetic energies is</P2>
    <Mth key="b3-math-ill26b">{"$$\\frac{K_1}{K_2} = \\frac{(1/2)I_1\\omega^2}{(1/2)I_2\\omega^2} = \\frac{I_1}{I_2} \\qquad \\therefore\\quad \\boxed{\\frac{L_1}{L_2} = \\frac{K_1}{K_2}}$$"}</Mth>
  </IllustrationBox>,

  // 3.14 Bound and Unbound Trajectories
  <SecHd key="sec-s314" id="sec-s314" label="3.14" title="Bound and Unbound Trajectories" />,
  <P2 key="b3-p-s314-1">Suppose that a cannon ball is fired from a point {"$P$"} that is at a distance {"$r$"} from the centre of earth with speed {"$v$"} as shown in the fig. 3.26. The speed required for the ball to escape from the earth's gravitation from this point is given by</P2>,
  <Mth key="b3-math-s314-1">{"$$v_e = \\sqrt{\\frac{2GM}{r}}.$$"}</Mth>,
  <P2 key="b3-p-s314-2">For a circular orbit to radius {"$r$"}, the orbital speed is given by</P2>,
  <Mth key="b3-math-s314-2">{"$$v_0 = \\sqrt{\\frac{GM}{r}}$$"}</Mth>,
  <P2 key="b3-p-s314-3">Let us consider the locus of paths for various values of {"$v$"}.</P2>,
  <Fig key="fig-3-26"
    src={CONTENT_IMAGES.CONTENT_IMAGE_115E9D637C289E4D0EA8}
    num="FIGURE 3.26" caption="Trajectories for different projection speeds" />,

  <div key="b3-traj-table" style={{ margin: "12px 0 16px", overflowX: "auto" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 15 }}>
      <tbody>
        {[
          ["When $v = 0$,", "the path is a straight line and the ball will strike the earth at point $A$."],
          ["When $v$ is too small,", "the projectile will strike the earth at a point other than $A$."],
          ["When $v < v_0$,", "the path is elliptical, with the point $P$ as the apogee (the farthest point from earth)."],
          ["When $v = v_0$,", "the path is circular."],
          ["When $v_0 < v < v_e$,", "the path is again an ellipse, but now the point $P$ is the perigee (the closest point to earth)."],
          ["When $v = v_e$,", "the path is parabolic and is not a closed path. The ball is not bound."],
          ["When $v > v_e$,", "the path is hyperbola and not closed. The ball is not bound."],
        ].map(([cond, result], i) => (
          <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "6px 12px 6px 4px", whiteSpace: "nowrap", verticalAlign: "top", width: "30%", fontStyle: "italic" }}>{cond}</td>
            <td style={{ padding: "6px 4px" }}>{result}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>,

  // 3.15 Drag Force on Satellite
  <SecHd key="sec-s315" id="sec-s315" label="3.15" title="Drag Force on Satellite Due to Earth's Atmosphere" />,
  <P2 key="b3-p-s315-1">If a satellite in low orbit experiences a small drag force from the earth's atmosphere, then due to air drag, there will be a loss of kinetic energy of the satellite. Some mechanical energy of the satellite will be converted into heat energy.</P2>,
  <P2 key="b3-p-s315-2">The inward gravitational force, {"$F_g = \\dfrac{GMm}{r^2}$"} on the satellite will become greater than the outwards centrifugal force {"$F_c = \\dfrac{mv^2}{r}$"} due to which the satellite will follow a spiral path towards the earth as shown in fig. 3.27.</P2>,
  <Fig key="fig-3-27"
    src={CONTENT_IMAGES.CONTENT_IMAGE_8258C0CBB646DAF34A86}
    num="FIGURE 3.27" caption="Satellite spiralling towards Earth due to air drag" />,

  // Illustrations 27–28
  <IllustrationBox key="ill-27" num="27" title="If the earth's satellite is put into an orbit at a height where resistance due to atmosphere, cannot be neglected, how will motion of satellite be affected?">
    <SolHd />
    <P2>Air resistance will reduce the mechanical energy of satellite. Hence, the satellite will ultimately fall back to the earth. Air resistance may also produce a lot of heat and the satellite may even burn.</P2>
  </IllustrationBox>,

  <IllustrationBox key="ill-28" num="28" title="If an earth satellite moves to a lower orbit, there is some dissipation of energy, yet its speed increases. Explain.">
    <SolHd />
    <P2>The orbiting satellite loses kinetic energy due to atmospheric friction. Therefore, the gravitational attraction on the satellite becomes greater than the force required to keep the satellite in that orbit due to which, the satellite moves down towards the earth into a lower orbit. In the lower orbit, the loss in potential energy is greater than the loss of energy due to atmospheric friction. As a result, the kinetic energy increases. That is why, the satellite describes a smaller orbit with increased speed. Due to atmospheric friction, the satellite spirals down towards the earth with increasing speed and ultimately burns out in the lower denser atmosphere.</P2>
  </IllustrationBox>,

  // 3.16 Velocity and Energy of a Planet in an Elliptical Orbit
  <SecHd key="sec-s316" id="sec-s316" label="3.16" title="Velocity and Energy of a Planet in an Elliptical Orbit" />,
  <P2 key="b3-p-s316-1">Most of the problems of gravitation are solved by the following two conservation laws</P2>,
  <ul key="b3-ul-s316" style={{ margin: "4px 0 8px 24px", padding: 0, lineHeight: 1.8 }}>
    <li>Conservation of angular momentum about sun</li>
    <li>Conservation of mechanical energy</li>
  </ul>,
  <Fig key="fig-3-28"
    src={CONTENT_IMAGES.CONTENT_IMAGE_22E9BB8275DFDF4A59A7}
    num="FIGURE 3.28" caption="Planet in elliptical orbit showing perigee and apogee" />,
  <P2 key="b3-p-s316-2">Hence, the following two equations are used in most cases</P2>,
  <Mth key="b3-math-s316-1">{"$$mv\\,r\\sin\\theta = \\text{constant}$$"}</Mth>,
  <P2 key="b3-p-s316-3">and</P2>,
  <Mth key="b3-math-s316-2">{"$$\\frac{1}{2}mv^2 - \\frac{GMm}{r} = \\text{constant}$$"}</Mth>,
  <P2 key="b3-p-s316-4">Now consider the planet to be passing through Perigee and Apogee where the speed of the planet is {"$v_P$"} and {"$v_A$"} respectively. Then, we have</P2>,
  <Mth key="b3-math-s316-3">{"$$mv_p r_p = mv_A r_A \\qquad\\text{...(1)}$$"}</Mth>,
  <Mth key="b3-math-s316-4">{"$$E = \\frac{1}{2}mv_P^2 - \\frac{GMm}{r_P} = \\frac{1}{2}mv_A^2 - \\frac{GMm}{r_A} \\qquad\\text{...(2)}$$"}</Mth>,
  <P2 key="b3-p-s316-5">Also, we have</P2>,
  <Mth key="b3-math-s316-5">{"$$r_A = a + ae = a(1+e) \\qquad\\text{...(3)}$$"}</Mth>,
  <Mth key="b3-math-s316-6">{"$$r_P = a - ae = a(1-e) \\qquad\\text{...(4)}$$"}</Mth>,
  <Mth key="b3-math-s316-7">{"$$\\Rightarrow \\quad r_P + r_A = 2a \\qquad\\text{...(5)}$$"}</Mth>,
  <P2 key="b3-p-s316-6">From eqn. (2), we have</P2>,
  <Mth key="b3-math-s316-8">{"$$\\begin{aligned} & v_P^2 - v_A^2 = 2GM\\left(\\frac{1}{r_P} - \\frac{1}{r_A}\\right) \\\\ \\Rightarrow\\; & v_P^2 - \\left(v_P\\frac{r_P}{r_A}\\right)^2 = 2GM\\left(\\frac{1}{r_P} - \\frac{1}{r_A}\\right) \\\\ \\Rightarrow\\; & v_P^2\\left(\\frac{r_A^2 - r_P^2}{r_A^2}\\right) = 2GM\\left(\\frac{r_A - r_P}{r_P r_A}\\right) \\\\ \\Rightarrow\\quad & v_P = \\sqrt{\\frac{2GMr_A}{r_P(r_A+r_P)}} = \\sqrt{\\frac{GMr_A}{ar_P}} \\\\ & = \\sqrt{\\frac{GMa(1+e)}{a\\times a(1-e)}} = \\sqrt{\\frac{GM}{a}\\left(\\frac{1+e}{1-e}\\right)} \\\\ & v_A = \\frac{v_P r_P}{r_A} = \\frac{v_P a(1-e)}{a(1+e)} = \\sqrt{\\frac{GM}{a}\\left(\\frac{1-e}{1+e}\\right)} \\\\ E &= \\frac{1}{2}mv_P^2 - \\frac{GMm}{r_P} = \\frac{1}{2}m\\left(\\frac{GMr_A}{ar_P}\\right) - \\frac{GMm}{r_P} \\\\ &= -\\frac{GMm}{2ar_P}\\left(2a - r_A\\right) = -\\frac{GMm}{2a} \\end{aligned}$$"}</Mth>,
  <P2 key="b3-p-s316-7">Therefore,</P2>,
  <Mth key="b3-math-s316-final">{"$$\\begin{aligned} & v_A = \\sqrt{\\frac{GM}{a}\\left(\\frac{1-e}{1+e}\\right)} \\\\ & v_P = \\sqrt{\\frac{GM}{a}\\left(\\frac{1+e}{1-e}\\right)} \\\\ & E = -\\frac{GMm}{2a} \\end{aligned}$$"}</Mth>,

  // Illustration 29
  <IllustrationBox key="ill-29" num="29" title="For a particle projected in a transverse direction from a height h above earth's surface, find the minimum initial velocity so that it just grazes the surface of earth such that path of this particle would be an ellipse with centre of earth as the farther focus.">
    <SolHd />
    <P2>Let the mass of earth be {"$M$"} and that of particle be {"$m$"}. From conservation of angular momentum about an axis passing through centre of earth, we have</P2>
    <Fig key="fig-3-29"
      src={CONTENT_IMAGES.CONTENT_IMAGE_D3CB05926685FF68416E}
      num="FIGURE 3.29" caption="Particle projected from height h grazing Earth's surface" />
    <Mth key="b3-math-ill29-mom">{"$$mv(h+R) = mv_1 R \\quad \\Rightarrow \\quad v_1 = \\frac{v(h+R)}{R}$$"}</Mth>
    <P2>From conservation of mechanical energy, we have</P2>
    <Mth key="b3-math-ill29">{"$$\\begin{aligned} & \\frac{-GMm}{R+h} + \\frac{1}{2}mv^2 = \\frac{-GMm}{R} + \\frac{1}{2}mv_1^2 \\\\ \\Rightarrow\\; & \\frac{-GMm}{R+h} + \\frac{1}{2}mv^2 = \\frac{-GMm}{R} + \\frac{1}{2}m\\frac{v^2(h+R)^2}{R^2} \\\\ \\Rightarrow\\; & GMm\\left(\\frac{1}{R}-\\frac{1}{R+h}\\right) = \\frac{1}{2}mv^2\\left[\\left(\\frac{h+R}{R}\\right)^2-1\\right] \\\\ \\Rightarrow\\; & \\frac{GMh}{R(R+h)} = \\frac{v^2 h(h+2R)}{2R^2} \\\\ \\therefore\\; & \\boxed{v = \\sqrt{\\frac{2GMR}{(R+h)(2R+h)}}} \\end{aligned}$$"}</Mth>
  </IllustrationBox>,

  // 3.17 Time Period of a Planet in an Elliptical Orbit
  <SecHd key="sec-s317" id="sec-s317" label="3.17" title="Time Period of a Planet in an Elliptical Orbit" />,
  <P2 key="b3-p-s317-1">From Kepler's second law, we have</P2>,
  <Mth key="b3-math-s317-1">{"$$\\frac{dA}{dt} = \\text{constant}$$"}</Mth>,
  <P2 key="b3-p-s317-2">Now, {"$\\dfrac{dA}{dt} = \\dfrac{d}{dt}\\left(\\dfrac{1}{2}r^2\\phi\\right) = \\dfrac{1}{2}r^2\\omega$"}</P2>,
  <P2 key="b3-p-s317-3">and angular momentum, {"$L = mr^2\\omega \\Rightarrow \\dfrac{dA}{dt} = \\dfrac{L}{2m}$"}</P2>,
  <P2 key="b3-p-s317-4">If {"$T$"} is the time taken to complete one revolution, and {"$a$"} and {"$b$"} are respectively the semi major and semi minor axes, then we have</P2>,
  <Mth key="b3-math-s317-2">{"$$\\int_0^T dt = \\frac{2m}{L}\\int_0^{\\pi ab} dA \\quad \\Rightarrow \\quad T = \\frac{2m}{L}\\pi ab$$"}</Mth>,
  <P2 key="b3-p-s317-5">where, {"$b = a\\sqrt{1-e^2}$"}</P2>,
  <P2 key="b3-p-s317-6">and {"$L = mv_A r_A = m\\sqrt{\\dfrac{GM}{a}\\left(\\dfrac{1-e}{1+e}\\right)}\\,a(1+e)$"}</P2>,
  <Mth key="b3-math-s317-3">{"$$= m\\sqrt{GMa\\left(1-e^2\\right)}$$"}</Mth>,
  <Mth key="b3-math-s317-4">{"$$\\Rightarrow \\quad T = \\frac{2m}{m\\sqrt{GMa(1-e^2)}}\\pi a\\left(a\\sqrt{1-e^2}\\right)$$"}</Mth>,
  <P2 key="b3-p-s317-7">Therefore,</P2>,
  <Mth key="b3-math-s317-final">{"$$\\boxed{T = \\sqrt{\\frac{4\\pi^2 a^3}{GM}}} \\quad \\text{and} \\quad T^2 \\propto a^3$$"}</Mth>,
];

export default function Chapter3() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  const allContent = [...content_b1, ...content_b2, ...content_b3];
  return (
    <div style={{
      background: "#fff", minHeight: "100vh",
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
