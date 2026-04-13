"use client";
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

const SolHd = () => (
  <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 6px",
    fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13 }}>Solution.</p>
);

const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "16px auto", textAlign: "center", maxWidth: "88%" }}>
    {src ? (
      <>
        <img src={src} alt={caption || num || "figure"}
          style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd", display: "block", margin: "0 auto" }}
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div style={{ display: "none", alignItems: "center", justifyContent: "center",
          border: "1.5px dashed " + P_COLOR, background: LIGHT_P, minHeight: 60,
          padding: "10px 16px", color: P_COLOR, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12 }}>
          📷 {num} — image not loaded
        </div>
      </>
    ) : (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
        border: "1.5px dashed #aaa", background: "#f7f7f7", minHeight: 60,
        padding: "10px 16px", color: "#777", fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12,
        fontStyle: "italic" }}>
        [{num || "Figure"}{caption ? ` — ${caption}` : ""}]
      </div>
    )}
    {(num || caption) && (
      <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic",
        margin: "5px auto 0", lineHeight: 1.45 }}>
        {num && <strong style={{ color: P_COLOR, fontStyle: "normal" }}>{num}. </strong>}
        {caption}
      </p>
    )}
  </div>
);

// Application Booster banner
const AppBoosterBanner = () => (
  <div style={{ margin: "0 0 4px", textAlign: "center" }}>
    <div style={{ background: "linear-gradient(135deg, #6a1a5a 0%, #9b2d7a 50%, #6a1a5a 100%)",
      padding: "18px 32px 14px", borderRadius: 4 }}>
      <div style={{ fontFamily: "'Lora',Georgia,serif", fontWeight: 700, fontStyle: "italic",
        fontSize: 30, color: "#fff", letterSpacing: 1, textShadow: "1px 1px 3px rgba(0,0,0,0.4)" }}>
        Application Booster — Level 1
      </div>
    </div>
    <div style={{ background: P_COLOR, padding: "8px 0" }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800,
        fontSize: 13, color: "#fff", letterSpacing: 2 }}>
        [Topicwise Solved Examples]
      </span>
    </div>
  </div>
);

// Topic section header (boxed)
const TopicHd = ({ id, num, title }) => (
  <div id={id} style={{ border: "1.5px solid " + P_COLOR, margin: "24px 0 14px",
    background: "#fdf3f9", padding: "7px 16px", borderLeft: "5px solid " + P_COLOR }}>
    <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800,
      fontSize: 13, color: P_COLOR }}>
      {num}. {title}
    </span>
  </div>
);

// Example box
const ExBox = ({ num, title, children }) => (
  <div style={{ margin: "18px 0", border: "1px solid #c8a0b8" }}>
    <div style={{ background: "#f5e8f2", padding: "6px 14px",
      fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800,
      fontSize: 12.5, color: P_COLOR, letterSpacing: 0.5 }}>
      <span style={{ fontVariant: "small-caps", textTransform: "uppercase", marginRight: 4 }}>Example</span>
      {num}.{title ? <span style={{ fontWeight: 400, marginLeft: 6, fontStyle: "italic" }}>{title}</span> : ""}
    </div>
    <div style={{ padding: "10px 16px 12px" }}>{children}</div>
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
      justifyContent: "center", gap: 5, padding: 0 }}>
      <span style={{ ...bar, transform: open ? "translateY(7.5px) rotate(45deg)" : "none" }} />
      <span style={{ ...bar, opacity: open ? 0 : 1 }} />
      <span style={{ ...bar, transform: open ? "translateY(-7.5px) rotate(-45deg)" : "none" }} />
    </button>
  );
}

function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{ position: "fixed", inset: 0, zIndex: 1050,
      background: "rgba(0,0,0,0.35)", cursor: "pointer" }} />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1080,
      width: open ? 260 : 0, height: "100vh", background: "#fff",
      borderRight: open ? "2px solid #e8c0d8" : "none",
      boxShadow: open ? "3px 0 16px rgba(139,10,78,0.10)" : "none",
      transition: "width 0.28s ease",
      overflowY: open ? "auto" : "hidden", overflowX: "hidden" }}>
      <div style={{ width: 260, padding: "56px 0 20px" }}>
        <div style={{ padding: "0 16px 8px",
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: P_COLOR,
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
              style={{ cursor: "pointer",
                padding: item.level === 1 ? "6px 16px" : "4px 24px",
                fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: item.level === 1 ? 700 : 400,
                fontSize: item.level === 1 ? 12 : 11,
                color: item.level === 1 ? P_COLOR : "#444",
                borderLeft: item.level === 1 ? "3px solid " + P_COLOR : "none",
                background: hovered === item.id ? LIGHT_P : "transparent",
                marginBottom: 2, lineHeight: 1.4 }}>
              {item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

const TOC = [
  { id: "top-i", title: "I. Kepler's Laws & Newton's Law of Gravitation", level: 1 },
  { id: "top-ii", title: "II. Acceleration due to Gravity & Its Variation", level: 1 },
  { id: "top-iii", title: "III. Gravitational Field, Potential & Potential Energy", level: 1 },
  { id: "top-iv", title: "IV. Conservation of Energy & Escape Speed", level: 1 },
  { id: "top-v", title: "V. Satellite Motion, Orbital Velocity & Period", level: 1 },
];

const allContent = [
  <AppBoosterBanner key="banner" />,

  // ── I. Kepler's Laws ──
  <TopicHd key="top-i" id="top-i" num="I" title="Kepler's Laws and Newton's Law of Gravitation" />,

  <ExBox key="ex-1" num="1" title="Earth's mass is 80 times that of the moon and their diameters are 12800 and 3200 kms respectively. What is the value of g at the moon? (g on earth = 9·8 m/s²)">
    <SolHd />
    <P2>Let the mass of the moon be {"$m$"}. Then the mass of the earth, {"$M = 80\\,m$"}</P2>
    <P2>If {"$g_e$"} and {"$g_m$"} be the acceleration due to gravity on the earth and moon respectively, then,</P2>
    <Mth key="m1a">{"$$g_e = \\frac{G(80\\,m)}{R_e^2} \\quad \\text{and} \\quad g_m = \\frac{G\\,m}{R_m^2}$$"}</Mth>
    <Mth key="m1b">{"$$\\Rightarrow \\quad \\frac{g_m}{g_e} = \\frac{G\\,m}{R_m^2}\\times\\frac{R_e^2}{G(80\\,m)} = \\frac{(6400)^2}{(1600)^2\\times80} = \\frac{1}{5}$$"}</Mth>
    <Mth key="m1c">{"$$\\therefore\\quad g_m = \\frac{1}{5}\\times9{\\cdot}8 = \\boxed{1{\\cdot}96\\text{ m/s}^2}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-2" num="2" title="If the earth is at one-half its present distance from the sun, then how many days will be there in one year?">
    <SolHd />
    <P2>Let the radius of the earth's orbit round the sun be {"$R$"}. When it is reduced to half, the new distance becomes {"$R/2$"}.</P2>
    <P2>From Kepler's third law, {"$T^2 \\propto R^3$"}</P2>
    <P2>Let {"$T_1$"} and {"$T_2$"} be the time period of revolution of earth round the sun when the distance between the two is {"$R$"} and {"$R/2$"} respectively. Then,</P2>
    <Mth key="m2a">{"$$\\left(\\frac{T_1}{T_2}\\right)^2 = \\left(\\frac{R}{R/2}\\right)^3 = 8 \\qquad \\Rightarrow\\quad T_2 = \\frac{T_1}{2\\sqrt{2}} = \\frac{365}{2\\sqrt{2}}$$"}</Mth>
    <Mth key="m2b">{"$$\\therefore\\quad \\boxed{T_2 = 129\\text{ days}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-3" num="3" title="Two masses m and 4m are placed respectively at (0, 0) and (3a, 0). Locate a point in the space around them, where a third massive object, does not experience a net gravitational force.">
    <SolHd />
    <P2>Let the third object of mass {"$M$"} be placed at point {"$(x, 0)$"}</P2>
    <Fig num="FIGURE 3.30" caption="Three masses on x-axis" />
    <P2>Since the net gravitational force on it is zero, the force of attraction on it due to masses {"$m$"} and {"$4m$"} must be equal.</P2>
    <Mth key="m3a">{"$$\\Rightarrow\\quad \\frac{GM\\,m}{x^2} = \\frac{GM(4m)}{(3a-x)^2} \\qquad \\Rightarrow\\quad (3a-x)^2 = 4x^2$$"}</Mth>
    <Mth key="m3b">{"$$\\Rightarrow\\quad 3a-x = 2x \\qquad \\Rightarrow\\quad \\boxed{x = a}$$"}</Mth>
    <P2>Therefore, the required point is {"$(a,\\,0)$"}.</P2>
  </ExBox>,

  <ExBox key="ex-4" num="4" title="Two stationary particles of masses M₁ and M₂ are at a distance d apart. A third particle lying on the line joining the particles, experiences no resultant gravitational force. What is the distance of this particle from M₁.">
    <SolHd />
    <P2>The resultant gravitational force on the third particle (of say mass {"$m$"}) is zero when it is pulled equally by masses {"$M_1$"} and {"$M_2$"}.</P2>
    <Fig num="FIGURE 3.31" caption="Neutral point between M₁ and M₂" />
    <Mth key="m4a">{"$$\\Rightarrow\\quad \\frac{GM_1 m}{r^2} = \\frac{GM_2 m}{(d-r)^2} \\qquad \\Rightarrow\\quad \\left(\\frac{d-r}{r}\\right)^2 = \\frac{M_2}{M_1}$$"}</Mth>
    <Mth key="m4b">{"$$\\Rightarrow\\quad \\frac{d}{r}-1 = \\sqrt{\\frac{M_2}{M_1}} \\qquad \\therefore\\quad \\boxed{r = \\left(\\frac{\\sqrt{M_1}}{\\sqrt{M_1}+\\sqrt{M_2}}\\right)d}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-5" num="5" title="Two solid spheres of same size of same metal are placed in contact by touching each other. Prove that the gravitational force acting between them is directly proportional to the fourth power of their radius.">
    <SolHd />
    <P2>Let {"$R$"} be the radius of each sphere. When the two spheres touch each other, the distance between their centers is {"$2R$"}. The gravitational force between them is</P2>
    <Mth key="m5a">{"$$F = \\frac{G\\left[(4/3)\\pi R^3\\rho\\right]\\times\\left[(4/3)\\pi R^3\\rho\\right]}{(2R)^2} = \\frac{4}{9}\\left(G\\pi^2\\rho^2\\right)R^4$$"}</Mth>
    <Mth key="m5b">{"$$\\therefore\\quad \\boxed{F \\propto R^4}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-6" num="6" title="A spherical hollow is made in a lead sphere of radius R, such that its surface touches the outside surface of the lead sphere and passes through its centre. The mass of the sphere before hollowing was M. With what force will the hollowed sphere attract a small sphere of mass m, which lies at a distance d from the centre of the lead sphere on the straight line connecting the centres of the sphere and of the hollow?">
    <SolHd />
    <Fig num="FIGURE 3.32" caption="Lead sphere with hollow; mass m at distance d" />
    <P2>It is clear that the mass removed while creating the hollow is {"$M/8$"}. The gravitational force due to the hollow sphere is equal to the force due to the original sphere minus the force due to the mass that would fill up the hollow.</P2>
    <Mth key="m6a">{"$$\\therefore\\quad F = \\frac{GMm}{d^2} - \\frac{G(M/8)\\,m}{\\left(d-\\dfrac{R}{2}\\right)^2}$$"}</Mth>
    <Mth key="m6b">{"$$= \\boxed{\\frac{GMm}{d^2}\\left[1 - \\frac{d^2}{2(2d-R)^2}\\right]}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-7" num="7" title="Two balls of mass m each are hung side by side by two long threads of equal length l. If the distance between upper ends is r, show that the distance r′ between the centres of the ball is given by gr′²(r − r′) = 2lGm.">
    <SolHd />
    <P2>The situation is shown in the fig. 3.33.</P2>
    <Fig num="FIGURE 3.33" caption="Two balls hung by threads; gravitational attraction between them" />
    <P2>Following forces act on each ball: (a) Weight of the ball {"$mg$"}, (b) Tension in thread {"$T$"}, (c) Force of Gravitational attraction {"$F = G\\dfrac{mm}{r'^2}$"}</P2>
    <P2>Equating the forces in horizontal and vertical directions, we get</P2>
    <Mth key="m7a">{"$$T\\sin\\theta = F \\quad \\text{and} \\quad T\\cos\\theta = mg$$"}</Mth>
    <Mth key="m7b">{"$$\\Rightarrow\\quad \\tan\\theta = \\frac{(r-r')/2}{l} = \\frac{F}{mg} = \\frac{Gm^2/r'^2}{mg}$$"}</Mth>
    <Mth key="m7c">{"$$\\Rightarrow\\quad \\frac{r-r'}{2l} = \\frac{Gm}{gr'^2} \\qquad \\therefore\\quad \\boxed{gr'^2\\,(r-r') = 2\\,l\\,G\\,m}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-8" num="8" title="Three point particles with masses m₁ = 4 kg, m₂ = 2 kg and m₃ = 3 kg are at the corners of an equilateral triangle of side L = 2 m. Find the net force on m₂. (G = 6·67 × 10⁻¹¹ Nm² kg⁻²)">
    <SolHd />
    <Fig num="FIGURE 3.34" caption="Three masses at corners of equilateral triangle, forces on m₂ shown" />
    <P2>The magnitudes of forces are</P2>
    <Mth key="m8a">{"$$F_{21} = \\frac{Gm_2 m_1}{L^2} = \\frac{6{\\cdot}67\\times10^{-11}\\times2\\times4}{2^2} = 1{\\cdot}33\\times10^{-10}\\text{ N}$$"}</Mth>
    <Mth key="m8b">{"$$F_{23} = \\frac{Gm_2 m_3}{L^2} = \\frac{6{\\cdot}67\\times10^{-11}\\times2\\times3}{2^2} = 1{\\cdot}01\\times10^{-10}\\text{ N}$$"}</Mth>
    <P2>The net force on {"$m_2$"} is {"$\\vec{F}_2 = \\vec{F}_{21} + \\vec{F}_{23}$"}. Its components are</P2>
    <Mth key="m8c">{"$$F_{2x} = -F_{21}\\cos60^\\circ + F_{23}\\cos60^\\circ = -1{\\cdot}65\\times10^{-11}\\text{ N}$$"}</Mth>
    <Mth key="m8d">{"$$F_{2y} = -F_{21}\\sin60^\\circ - F_{23}\\sin60^\\circ = -20{\\cdot}2\\times10^{-11}\\text{ N}$$"}</Mth>
    <Mth key="m8e">{"$$\\therefore\\quad \\boxed{\\vec{F}_2 = -(1{\\cdot}65\\,\\hat{i}+20{\\cdot}2\\,\\hat{j})\\times10^{-11}\\text{ N}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-9" num="9" title="Two concentric shells of mass M₁ and M₂ are shown. Calculate the gravitational force on m due to M₁ and M₂ at points P, Q and R.">
    <SolHd />
    <Fig num="FIGURE 3.35" caption="Two concentric shells; P inside both, Q between, R outside both" />
    <P2>At point {"$P$"}, gravitational force due to both {"$M_1$"} and {"$M_2$"} is zero.</P2>
    <Mth key="m9a">{"$$\\therefore\\quad \\boxed{F_P = 0}$$"}</Mth>
    <P2>At point {"$Q$"}, gravitational force due to {"$M_1$"} is {"$GM_1 m/b^2$"} and due to {"$M_2$"} is zero.</P2>
    <Mth key="m9b">{"$$\\therefore\\quad \\boxed{F_Q = \\frac{GM_1}{b^2}}$$"}</Mth>
    <P2>At point {"$R$"}, gravitational force due to {"$M_1$"} is {"$GM_1 m/c^2$"} and due to {"$M_2$"} is {"$GM_2 m/c^2$"}</P2>
    <Mth key="m9c">{"$$\\therefore\\quad F_R = \\frac{GM_1 m}{c^2} + \\frac{GM_2 m}{c^2} = \\boxed{\\frac{G(M_1+M_2)\\,m}{c^2}}$$"}</Mth>
  </ExBox>,

  // ── II. Acceleration due to Gravity ──
  <TopicHd key="top-ii" id="top-ii" num="II" title="Acceleration due to Gravity and Its Variation (Height, Depth & Rotation)" />,

  <ExBox key="ex-10" num="10" title="A body weighs 63 N on the surface of the earth. What is the earth's gravitational force on it at a (a) Height equal to half the radius of the earth (b) Depth equal to half the radius of the earth.">
    <SolHd />
    <P2>Force on the earth's surface {"$F_0 = mg_0 = \\dfrac{GMm}{R^2} = 63\\text{ N}$"}</P2>
    <P2><strong>(a)</strong> Force at a height {"$h$"},</P2>
    <Mth key="m10a">{"$$F(h) = mg(h) = \\frac{GMm}{(R+h)^2}$$"}</Mth>
    <Mth key="m10b">{"$$\\Rightarrow\\quad \\frac{F(h)}{F_0} = \\frac{g(h)}{g_0} = \\left(\\frac{R}{R+h}\\right)^2$$"}</Mth>
    <P2>Here, {"$h = R/2$"} {"$\\Rightarrow \\dfrac{F(h)}{F_0} = \\dfrac{4}{9}$"}</P2>
    <Mth key="m10c">{"$$\\therefore\\quad F(h) = \\frac{4}{9}F_0 = \\frac{4}{9}\\times63 = \\boxed{28\\text{ N}}$$"}</Mth>
    <P2><strong>(b)</strong> Force at a depth {"$d$"},</P2>
    <Mth key="m10d">{"$$F(d) = mg(d) = mg_0\\left(1-\\frac{d}{R}\\right)$$"}</Mth>
    <P2>Here, {"$d = R/2$"} {"$\\Rightarrow F(d) = \\dfrac{1}{2}F_0 = \\dfrac{63}{2} = \\boxed{31{\\cdot}5\\text{ N}}$"}</P2>
  </ExBox>,

  <ExBox key="ex-11" num="11" title="On a planet whose size is the same and mass four times as that of our earth, find the amount of work done to lift 3 kg mass vertically upwards through 3 m distance on the planet. The value of g on the surface of earth is 10 ms⁻².">
    <SolHd />
    <P2>If {"$M$"} is the mass of planet and {"$R$"} is its radius, then the acceleration due to gravity on its surface is {"$g = GM/R^2$"}. If {"$P$"} and {"$E$"} subscripts denote planet and earth respectively, then</P2>
    <Mth key="m11a">{"$$\\frac{g_P}{g_E} = \\frac{M_P}{M_E} = 4 \\qquad \\Rightarrow\\quad g_P = 4\\,g_E = 4\\times10 = 40\\text{ ms}^{-2}$$"}</Mth>
    <P2>The work done to lift {"$m = 3$"} kg mass upwards through {"$h = 3$"} m distance on the planet is</P2>
    <Mth key="m11b">{"$$W = mg_P h = 3\\times40\\times3 = \\boxed{360\\text{ J}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-12" num="12" title="At what depth from Earth surface, acceleration due to gravity is decreased by 1%. (Radius of earth is R = 6400 km)">
    <SolHd />
    <P2>Acceleration due to gravity at depth {"$d$"} is {"$g(d) = g_0\\left(1-\\dfrac{d}{R}\\right)$"}</P2>
    <Mth key="m12a">{"$$\\Rightarrow\\quad \\frac{d}{R} = \\frac{g_0-g(d)}{g_0} = \\frac{1}{100}$$"}</Mth>
    <Mth key="m12b">{"$$\\therefore\\quad d = R/100 = \\boxed{64\\text{ km}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-13" num="13" title="At what height from the surface of earth, will the value of g be reduced by 36% of that at its surface? Radius of earth is 6400 km.">
    <SolHd />
    <P2>Gravity on the surface of earth, {"$g_0 = \\dfrac{GM}{R^2}$"}</P2>
    <P2>Gravity at height {"$h$"} from the surface of earth, {"$g(h) = \\dfrac{GM}{(R+h)^2}$"}</P2>
    <P2>Since, {"$g(h)$"} is reduced by 36%, we have</P2>
    <Mth key="m13a">{"$$g(h) = 0{\\cdot}64\\,g_0 \\qquad \\Rightarrow\\quad \\frac{GM}{(R+h)^2} = 0{\\cdot}64\\,\\frac{GM}{R^2}$$"}</Mth>
    <Mth key="m13b">{"$$\\Rightarrow\\quad 0{\\cdot}64\\,(R+h)^2 = R^2 \\qquad \\Rightarrow\\quad 0{\\cdot}8\\,(R+h) = R$$"}</Mth>
    <Mth key="m13c">{"$$\\therefore\\quad h = \\frac{R}{4} = \\frac{6400}{4} = \\boxed{1600\\text{ km}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-14" num="14" title="Find the percentage change in the acceleration due to gravity when a small body is taken (a) at a height of R/100 (b) at a depth of R/100">
    <SolHd />
    <P2><strong>(a)</strong> Gravity at height is {"$g(h) = g_0\\left(1-\\dfrac{2h}{R}\\right)$"}</P2>
    <Mth key="m14a">{"$$\\text{Percentage change} = \\frac{g(h)-g_0}{g_0}\\times100 = -\\frac{2h}{R}\\times100 = -\\frac{2}{R}\\times\\frac{R}{100}\\times100 = \\boxed{-2\\%}$$"}</Mth>
    <P2><strong>(b)</strong> Gravity at depth {"$d$"} is {"$g(d) = g_0\\left(1-\\dfrac{d}{R}\\right)$"}</P2>
    <Mth key="m14b">{"$$\\text{Percentage change} = \\frac{g(d)-g_0}{g_0}\\times100 = -\\frac{d}{R}\\times100 = -\\frac{R/100}{R}\\times100 = \\boxed{-1\\%}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-15" num="15" title="Two particles each of mass m are hung from a balance whose scale pans differ in vertical and small height by h. Determine the difference in measurements of their weights in terms of density ρ of the earth if both particles are very close to the earth's surface.">
    <SolHd />
    <P2>If {"$R$"} is the radius of earth and {"$g$"} is the acceleration due to gravity on the surface of earth, then the acceleration due to gravity at small heights {"$h_1$"} and {"$h_2$"} from surface of earth are, respectively</P2>
    <Mth key="m15a">{"$$g_1 = g\\left(1-\\frac{2h_1}{R}\\right) \\quad \\text{and} \\quad g_2 = g\\left(1-\\frac{2h_2}{R}\\right)$$"}</Mth>
    <P2>The difference in measurements of their weights</P2>
    <Mth key="m15b">{"$$= m(g_2-g_1) = mg\\times\\frac{2}{R}(h_1-h_2) = m\\frac{GM}{R^2}\\times\\frac{2h}{R}$$"}</Mth>
    <Mth key="m15c">{"$$= 2mG\\left(\\frac{4}{3}\\pi R^3\\rho\\right)\\frac{h}{R^3} = \\boxed{\\frac{8\\pi}{3}\\,Gm\\rho h}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-16" num="16" title="What should be the time period of rotation of earth so that the bodies at the equator would weigh 40% of their actual weight?">
    <SolHd />
    <P2>Since, the bodies weigh 40% of their actual weight, the effective gravity, {"$g' = 0{\\cdot}4\\,g$"}</P2>
    <Mth key="m16a">{"$$\\Rightarrow\\quad g - \\left(\\frac{2\\pi}{T}\\right)^2 R = 0{\\cdot}4\\,g$$"}</Mth>
    <Mth key="m16b">{"$$\\Rightarrow\\quad \\left(\\frac{2\\pi}{T}\\right)^2 R = 0{\\cdot}6\\,g$$"}</Mth>
    <Mth key="m16c">{"$$\\therefore\\quad T = 2\\pi\\sqrt{\\frac{R}{0{\\cdot}6\\,g}} = 2\\pi\\sqrt{\\frac{6{\\cdot}4\\times10^6}{0{\\cdot}6\\times10}} = 6489\\text{ sec} = \\boxed{1{\\cdot}8\\text{ hrs.}}$$"}</Mth>
  </ExBox>,

  // ── III. Gravitational Field, Potential and Potential Energy ──
  <TopicHd key="top-iii" id="top-iii" num="III" title="Gravitational Field, Potential and Potential Energy" />,

  <ExBox key="ex-17" num="17" title="The gravitational potential due to a mass distribution is given by V = 8x/(x² + p²). Find gravitational field at x = p.">
    <SolHd />
    <Mth key="m17a">{"$$V = \\frac{8x}{x^2+p^2}$$"}</Mth>
    <Mth key="m17b">{"$$\\Rightarrow\\quad g = -\\frac{dV}{dx} = -\\frac{8(x^2+p^2)-8x(2x)}{(x^2+p^2)^2} = \\frac{8(x^2-p^2)}{(x^2+p^2)^2}$$"}</Mth>
    <P2>Therefore, at {"$x = p$"},</P2>
    <Mth key="m17c">{"$$\\boxed{g = 0}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-18" num="18" title="The gravitational field due to a mass distribution is given by g = kx⁻³/² in x-direction, where k is a positive constant. Taking gravitational potential to be zero at infinity, find its value at a distance x.">
    <SolHd />
    <P2>In vector form, {"$\\vec{g} = -kx^{-3/2}\\,\\hat{i}$"}</P2>
    <Mth key="m18a">{"$$\\Rightarrow\\quad \\int_0^V dV = -\\int_\\infty^x \\vec{g}\\cdot(dx\\,\\hat{i}) = \\int_\\infty^x kx^{-3/2}\\,dx$$"}</Mth>
    <Mth key="m18b">{"$$\\therefore\\quad V = -2k\\left[\\frac{1}{\\sqrt{x}}\\right]_\\infty^x = \\boxed{-\\frac{2k}{\\sqrt{x}}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-19" num="19" title="Find the gravitational potential energy of a system of four particles each of mass 'm' placed at the vertices of a square of side 'a'. Also find the gravitational potential at the centre of the square.">
    <SolHd />
    <Fig num="FIGURE 3.36" caption="Four masses at vertices of square; O is centre" />
    <P2>Gravitational potential energy {"$= U_{AB}+U_{BC}+U_{CD}+U_{DA}+U_{BD}+U_{AC} = 4U_{AB}+2U_{BD}$"}</P2>
    <Mth key="m19a">{"$$= -\\frac{4Gm^2}{a} - \\frac{2Gm^2}{\\sqrt{2}\\,a} = \\boxed{-\\left(4+\\sqrt{2}\\right)\\frac{Gm^2}{a}}$$"}</Mth>
    <P2>Gravitational potential at centre {"$= V_A+V_B+V_C+V_D = 4V_A$"}</P2>
    <Mth key="m19b">{"$$= \\frac{-4Gm}{a/\\sqrt{2}} = \\boxed{\\frac{-4\\sqrt{2}\\,Gm}{a}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-20" num="20" title="Find the potential energy of a system of eight particles placed at the vertices of a cube of side L. Neglect the self energy of the particles.">
    <SolHd />
    <Fig num="FIGURE 3.37" caption="Eight masses at vertices of a cube of side L" />
    <P2>There are total {"${}^8C_2 = 28$"} pairs, out of which 12 pairs are {"$L$"} distance apart, 12 pairs are {"$L\\sqrt{2}$"} distance apart and 4 pairs are {"$L\\sqrt{3}$"} distance apart from each other.</P2>
    <P2>Hence, potential energy of system is</P2>
    <Mth key="m20a">{"$$U = -\\frac{12Gm^2}{L} - \\frac{12Gm^2}{L\\sqrt{2}} - \\frac{4Gm^2}{L\\sqrt{3}}$$"}</Mth>
    <Mth key="m20b">{"$$= \\boxed{-\\frac{4GM^2}{L}\\left(3+\\frac{3}{\\sqrt{2}}+\\frac{1}{\\sqrt{3}}\\right)}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-21" num="21" title="A satellite of mass m is revolving around the earth of mass M in a circular orbit of radius 3R. What extra energy should be given to this satellite if it is to be lifted into an orbit of radius 4R.">
    <SolHd />
    <P2>The energy of satellite of mass {"$m$"} in a circular orbit of radius {"$r$"} is {"$-GMm/2r$"}</P2>
    <P2>Therefore, extra energy to be given to satellite is</P2>
    <Mth key="m21a">{"$$E = E_f - E_i = \\left(-\\frac{GMm}{2(4R)}\\right) - \\left(-\\frac{GMm}{2(3R)}\\right) = \\boxed{\\frac{GMm}{24R}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-22" num="22" title="A particle of mass 1 kg is placed at a distance of 4 m from the centre and on the axis of a uniform ring of mass 5 kg and radius 3 m. Calculate the work done to increase the distance of the particle from 4 m to 3√3 m.">
    <SolHd />
    <Fig num="FIGURE 3.38" caption="Ring of mass M with particle moving from A (4m) to B (3√3 m)" />
    <P2>G.P.E. of the system at point {"$A$"} is</P2>
    <Mth key="m22a">{"$$U_A = \\frac{-GMm}{\\sqrt{3^2+4^2}} = \\frac{-GMm}{5}$$"}</Mth>
    <P2>G.P.E. of the system at point {"$B$"} is</P2>
    <Mth key="m22b">{"$$U_B = \\frac{-GMm}{\\sqrt{3^2+(3\\sqrt{3})^2}} = \\frac{-GMm}{6}$$"}</Mth>
    <P2>Hence, Work done,</P2>
    <Mth key="m22c">{"$$W_{AB} = U_B - U_A = \\left(\\frac{-GMm}{6}\\right)-\\left(\\frac{-GMm}{5}\\right) = \\frac{GMm}{30}$$"}</Mth>
    <Mth key="m22d">{"$$= \\frac{6{\\cdot}6\\times10^{-11}\\times5\\times1}{30} = \\boxed{1{\\cdot}1\\times10^{-11}\\text{ J}}$$"}</Mth>
  </ExBox>,

  // ── IV. Conservation of Energy and Escape Speed ──
  <TopicHd key="top-iv" id="top-iv" num="IV" title="Conservation of Energy and Escape Speed" />,

  <ExBox key="ex-23" num="23" title="A particle of mass 1 kg is released from rest at point A where gravitational potential is − 5 J/kg. After some time, it passes through a point B with a speed of 1 m/s. What is the gravitational potential at B?">
    <SolHd />
    <P2>Applying conservation of mechanical energy, we have</P2>
    <P2>Gain in KE = Loss in PE {"$\\Rightarrow \\dfrac{1}{2}mv^2 = m(V_A-V_B)$"}</P2>
    <Mth key="m23a">{"$$\\therefore\\quad V_B = V_A - \\frac{v^2}{2} = -5 - \\frac{1^2}{2} = \\boxed{-5{\\cdot}5\\text{ J/kg}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-24" num="24" title="A particle is fired vertically upward with a speed v₀ = 9·8 km/s. Find the maximum height attained by the particle. Consider only earth's gravitation. Radius of the earth is 6400 km and g at the surface is 9·8 m/s².">
    <SolHd />
    <P2>According to law of conservation of energy,</P2>
    <Mth key="m24a">{"$$-\\frac{GMm}{R}+\\frac{1}{2}mv_0^2 = -\\frac{GMm}{R+H}$$"}</Mth>
    <P2>{"$(\\text{Since }g = GM/R^2, \\text{ we have } GM = gR^2)$"}</P2>
    <Mth key="m24b">{"$$\\Rightarrow\\quad R+H = \\frac{R^2}{R-v_0^2/2g} = \\frac{(6{\\cdot}4\\times10^6)^2}{6{\\cdot}4\\times10^6-(9{\\cdot}8\\times10^3)^2/(2\\times9{\\cdot}8)}$$"}</Mth>
    <Mth key="m24c">{"$$= 2{\\cdot}73\\times10^7\\text{ m} = 27300\\text{ km}$$"}</Mth>
    <Mth key="m24d">{"$$\\therefore\\quad H = 27300 - 6400 = \\boxed{20900\\text{ km}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-25" num="25" title="Calculate the velocity with which a body must be thrown vertically upward from the surface of the earth so that it may reach a height of 10R, where R = 6·4 × 10⁶ m is the radius of the earth. (Earth's mass, M = 6 × 10²⁴ kg, G = 6·7 × 10⁻¹¹ Nm² kg⁻²)">
    <SolHd />
    <Fig num="FIGURE 3.39" caption="Body projected from Earth's surface to height 10R" />
    <P2>At the farthest point (point 2), velocity of the body is zero. By conservation of mechanical energy, {"$K_1+U_1 = K_2+U_2$"}</P2>
    <Mth key="m25a">{"$$\\Rightarrow\\quad \\frac{1}{2}mv^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{11R}$$"}</Mth>
    <Mth key="m25b">{"$$\\therefore\\quad v = \\sqrt{\\frac{20}{11}\\frac{GM}{R}} = \\sqrt{\\frac{20}{11}\\times\\frac{6{\\cdot}7\\times10^{-11}\\times6\\times10^{24}}{6{\\cdot}4\\times10^6}} = \\boxed{1{\\cdot}07\\times10^4\\text{ ms}^{-1}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-26" num="26" title="Two particles of masses m and M are initially at rest an infinite distance apart. Show that at any instant, their relative velocity of approach attributable to gravitational attraction is √(2G(M+m)/d), where d is their separation at that instant.">
    <SolHd />
    <Fig num="FIGURE 3.40" caption="m and M approaching each other; velocities v and V" />
    <P2>If {"$v$"} and {"$V$"} are the velocities of {"$m$"} and {"$M$"} at separation {"$d$"}, then by conservation of momentum, {"$mv = MV$"}</P2>
    <P2>and by conservation of mechanical energy,</P2>
    <Mth key="m26a">{"$$\\frac{1}{2}mv^2+\\frac{1}{2}MV^2-\\frac{GMm}{d} = 0$$"}</Mth>
    <P2>Solving these, we get</P2>
    <Mth key="m26b">{"$$v = M\\sqrt{\\frac{2G}{d(M+m)}} \\quad \\text{and} \\quad V = m\\sqrt{\\frac{2G}{d(M+m)}}$$"}</Mth>
    <Mth key="m26c">{"$$\\therefore\\quad \\text{Relative velocity of approach} = v+V = \\boxed{\\sqrt{\\frac{2G(M+m)}{d}}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-27" num="27" title="Two particles of masses m and 2m are placed at a distance of r₀ apart. Initially 2m is given a velocity v₀ away from m and m is at rest (but free to move). Find the maximum separation between the particles.">
    <SolHd />
    <Fig num="FIGURE 3.41" caption="m at rest; 2m moving away with v₀" />
    <P2>Due to mutual force of gravitational attraction, the velocity of mass {"$m$"} will increase and that of mass {"$2m$"} will decrease. The maximum separation (say {"$r$"}) will be at the instant when the velocity (say {"$v$"}) of both masses will be same.</P2>
    <P2>Applying conservation of linear momentum and conservation of mechanical energy, we have</P2>
    <Mth key="m27a">{"$$2mv_0 = mv+2mv$$"}</Mth>
    <Mth key="m27b">{"$$\\frac{1}{2}(2m)v_0^2-\\frac{Gm(2m)}{r_0} = \\frac{1}{2}mv^2+\\frac{1}{2}(2m)v^2-\\frac{Gm(2m)}{r}$$"}</Mth>
    <P2>On solving, we get {"$v = 2v_0/3$"} and</P2>
    <Mth key="m27c">{"$$mv_0^2-\\frac{2Gm^2}{r_0} = \\frac{3}{2}m\\left(\\frac{2v_0}{3}\\right)^2-\\frac{2Gm^2}{r}$$"}</Mth>
    <Mth key="m27d">{"$$\\Rightarrow\\quad \\frac{2Gm}{r} = \\frac{2Gm}{r_0}-\\frac{v_0^2}{3} \\qquad \\therefore\\quad \\boxed{r = \\frac{1}{1/r_0-v_0^2/6GM}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-28" num="28" title="A thin spherical shell of total mass M and radius R is held fixed. There is a small hole in the shell. A mass m is released from rest at distance R from the hole along a line that passes through the hole and centre of the shell. How long does the mass take to travel from the hole to the point diametrically opposite?">
    <SolHd />
    <Fig num="FIGURE 3.42" caption="Spherical shell with hole at A; mass m released from distance R outside" />
    <P2>From conservation of mechanical energy between points {"$A$"} and {"$B$"}, we get</P2>
    <Mth key="m28a">{"$$0+\\frac{-GMm}{2R} = \\frac{-GMm}{R}+\\frac{1}{2}mv_B^2 \\qquad \\Rightarrow\\quad v_B = \\sqrt{\\frac{GM}{R}}$$"}</Mth>
    <P2>Now, inside the shell, since gravitational field is zero, the velocity of mass {"$m$"} will remain constant. Hence, required time</P2>
    <Mth key="m28b">{"$$t = \\frac{2R}{v_B} = \\boxed{2\\sqrt{\\frac{R^3}{GM}}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-29" num="29" title="The radius of the earth is reduced by 4%. The mass of the earth remains unchanged. What will be the change in escape velocity?">
    <SolHd />
    <Mth key="m29a">{"$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2GM}\\cdot R^{-1/2}$$"}</Mth>
    <Mth key="m29b">{"$$\\therefore\\quad \\frac{\\Delta v_e}{v_e} = -\\frac{1}{2}\\frac{\\Delta R}{R} = -\\frac{1}{2}(-4\\%) = \\boxed{2\\%}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-30" num="30" title="The escape velocity of a body on the surface of the earth is vₑ. A body is projected away with twice this speed. What is the speed of the body at infinity? Ignore the presence of other heavenly bodies. Also ignore the presence of earth's atmosphere.">
    <SolHd />
    <P2>If {"$v$"} is the velocity at infinity, then by energy conservation principle,</P2>
    <Mth key="m30a">{"$$\\frac{1}{2}m(2v_e)^2 - \\frac{GMm}{R} = \\frac{1}{2}mv^2+0$$"}</Mth>
    <Mth key="m30b">{"$$\\left(\\text{Since }v_e = \\sqrt{\\frac{2GM}{R}},\\text{ we write }\\frac{GM}{R} = \\frac{v_e^2}{2}\\right)$$"}</Mth>
    <Mth key="m30c">{"$$\\Rightarrow\\quad 2mv_e^2-\\frac{1}{2}mv_e^2 = \\frac{1}{2}mv^2 \\qquad \\therefore\\quad \\boxed{v = \\sqrt{3}\\,v_e}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-31" num="31" title="A very small groove is made in earth, of mass M and radius R and a particle of mass m is placed at the centre of earth. Find the escape speed of the particle from that place.">
    <SolHd />
    <P2>The gravitational potential energy of mass {"$m$"} at the center of earth is</P2>
    <Mth key="m31a">{"$$U = -\\frac{3GMm}{2R}$$"}</Mth>
    <P2>If {"$v_e$"} is the escape speed of the particle from that place, then applying conservation of energy, we have {"$K_i+U_i = K_f+U_f$"}</P2>
    <Mth key="m31b">{"$$\\Rightarrow\\quad \\frac{1}{2}mv_e^2 - \\frac{3GMm}{2R} = 0+0 \\qquad \\therefore\\quad \\boxed{v_e = \\sqrt{\\frac{3GM}{R}}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-32" num="32" title="A very small groove is made in earth, and a particle of mass m₀ is placed at distance R/2 from the centre. Find the escape speed of the particle from that place. The mass of earth is M and its radius is R.">
    <SolHd />
    <P2>The gravitational potential energy of mass {"$m_0$"} at distance {"$r = R/2$"} from the centre of earth is</P2>
    <Mth key="m32a">{"$$U_i = -\\frac{GMm_0}{2R^3}\\left(3R^2-r^2\\right) = -\\frac{GMm_0}{2R^3}\\left[3R^2-\\left(\\frac{R}{2}\\right)^2\\right] = -\\frac{11\\,GMm_0}{8R}$$"}</Mth>
    <P2>If {"$v_e$"} is the escape speed of the particle from that place, then applying conservation of energy, {"$K_i+U_i = K_f+U_f$"}</P2>
    <Mth key="m32b">{"$$\\Rightarrow\\quad \\frac{1}{2}mv_e^2 - \\frac{11\\,GMm_0}{8R} = 0+0 \\qquad \\therefore\\quad \\boxed{v_e = \\sqrt{\\frac{11\\,GM}{4R}}}$$"}</Mth>
  </ExBox>,

  // ── V. Satellite Motion ──
  <TopicHd key="top-v" id="top-v" num="V" title="Satellite Motion, Orbital Velocity and Period" />,

  <ExBox key="ex-33" num="33" title="A space-ship into a circular orbit is close to the earth's surface. What additional velocity must be imparted to the ship so that it is able to escape the gravitational pull of the earth? (R = 6400 km, g = 9·8 m/s²)">
    <SolHd />
    <P2>The escape velocity and orbital velocity of space ship are respectively given by</P2>
    <Mth key="m33a">{"$$v_e = \\sqrt{\\frac{2GM}{R}} \\quad \\text{and} \\quad v_0 = \\sqrt{\\frac{GM}{R}}$$"}</Mth>
    <P2>Therefore, additional velocity to be imparted is</P2>
    <Mth key="m33b">{"$$v_e-v_0 = \\sqrt{\\frac{GM}{R}}(\\sqrt{2}-1) = \\sqrt{gR}\\,(\\sqrt{2}-1)$$"}</Mth>
    <Mth key="m33c">{"$$= \\sqrt{9{\\cdot}8\\times6{\\cdot}4\\times10^6}\\,(\\sqrt{2}-1) = 3{\\cdot}28\\times10^3\\text{ m/s} = \\boxed{3{\\cdot}28\\text{ km/s}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-34" num="34" title="By what percent, the magnitude of energy of a satellite has to be increased to shift it from an orbit of radius r to 3r?">
    <SolHd />
    <P2>Energy of satellite in orbit {"$r$"}, {"$E_i = -\\dfrac{GMm}{2r}$"}</P2>
    <P2>Energy in orbit {"$3r$"}, {"$E_f = -\\dfrac{GMm}{2\\times3r} = \\dfrac{E_i}{3}$"}</P2>
    <Mth key="m34a">{"$$\\therefore\\quad \\text{Percentage energy to be increased} = \\left|\\frac{E_i/3-E_i}{E_i}\\right|\\times100 = \\frac{2}{3}\\times100 = \\boxed{66{\\cdot}7\\%}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-35" num="35" title="A satellite is revolving around the earth with orbital speed v₀. If it stops suddenly and vₑ is the escape velocity of a particle on earth's surface, then what will be the speed with which it will strike the surface of earth?">
    <SolHd />
    <P2>Let {"$r$"} be the distance of satellite from centre of the earth where it stops suddenly and {"$v$"} be the speed with which it strikes the surface of earth.</P2>
    <P2>Applying conservation of mechanical energy, we get {"$K_i+U_i = K_f+U_f$"}</P2>
    <Mth key="m35a">{"$$\\Rightarrow\\quad 0-\\frac{GMm}{r} = \\frac{1}{2}mv^2-\\frac{GMm}{R}$$"}</Mth>
    <Mth key="m35b">{"$$\\Rightarrow\\quad -mv_0^2 = \\frac{1}{2}mv^2-\\frac{mv_e^2}{2} \\qquad \\left(\\text{Since }v_0 = \\sqrt{\\frac{GM}{r}},\\;v_e = \\sqrt{\\frac{2GM}{R}}\\right)$$"}</Mth>
    <Mth key="m35c">{"$$\\therefore\\quad \\boxed{v = \\sqrt{v_e^2-2v_0^2}}$$"}</Mth>
  </ExBox>,

  <ExBox key="ex-36" num="36" title="A satellite moves eastwards very near to the surface of earth in equatorial plane with speed v₀. Another satellite moves at the same height with the same speed in the equatorial plane but westwards. If R is radius of the earth and ω is the angular speed of the earth about its own axis, find the approximate difference in the time periods of two satellites as observed on the earth.">
    <SolHd />
    <P2>The time periods with respect to earth of the satellites moving westwards and eastwards are respectively</P2>
    <Mth key="m36a">{"$$T_{\\text{west}} = \\frac{2\\pi R}{v_0+R\\omega} \\quad \\text{and} \\quad T_{\\text{east}} = \\frac{2\\pi R}{v_0-R\\omega}$$"}</Mth>
    <P2>The difference in time periods as observed on the earth is</P2>
    <Mth key="m36b">{"$$\\Delta T = T_{\\text{east}}-T_{\\text{west}} = \\boxed{\\frac{4\\pi\\omega R^2}{v_0^2-R^2\\omega^2}}$$"}</Mth>
  </ExBox>,
];

export default function AppBoosterLevel1() {
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
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)", overflowX: "hidden" }}>
        {allContent}
      </div>
    </div>
  );
}
