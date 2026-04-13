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

const P2 = ({ children, style }) => (
  <p style={{ margin: "0 0 11px", textAlign: "justify", ...style }}>{children}</p>
);
const Mth = ({ children }) => (
  <div style={{ textAlign: "center", margin: "14px 4px", fontSize: "15.5px", lineHeight: 2.2,
    fontFamily: "'Times New Roman', Times, serif", overflowX: "auto", overflowY: "hidden",
    maxWidth: "100%", WebkitOverflowScrolling: "touch" }}>{children}</div>
);
const SolHd = () => (
  <p style={{ fontWeight: 700, color: P_COLOR, margin: "0 0 6px",
    fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 13 }}>Solution.</p>
);
const Fig = ({ src, num, caption }) => (
  <div style={{ margin: "16px auto", textAlign: "center", maxWidth: "88%" }}>
    <img src={src} alt={caption || num || "figure"}
      style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd", display: "block", margin: "0 auto" }}
      onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
    <div style={{ display: "none", alignItems: "center", justifyContent: "center",
      border: "1.5px dashed " + P_COLOR, background: LIGHT_P, minHeight: 60,
      padding: "10px 16px", color: P_COLOR, fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 12 }}>
      📷 {num} — image not loaded
    </div>
    {(num || caption) && (
      <p style={{ fontSize: 12.5, color: "#444", fontStyle: "italic", margin: "5px auto 0", lineHeight: 1.45 }}>
        {num && <strong style={{ color: P_COLOR, fontStyle: "normal" }}>{num}. </strong>}{caption}
      </p>
    )}
  </div>
);

const AppBoosterBanner = () => (
  <div style={{ margin: "0 0 4px", textAlign: "center" }}>
    <div style={{ background: "linear-gradient(135deg, #6a1a5a 0%, #9b2d7a 50%, #6a1a5a 100%)",
      padding: "18px 32px 14px", borderRadius: 4 }}>
      <div style={{ fontFamily: "'Lora',Georgia,serif", fontWeight: 700, fontStyle: "italic",
        fontSize: 30, color: "#fff", letterSpacing: 1, textShadow: "1px 1px 3px rgba(0,0,0,0.4)" }}>
        Application Booster — Level 2
      </div>
    </div>
    <div style={{ background: P_COLOR, padding: "8px 0" }}>
      <span style={{ fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 800,
        fontSize: 13, color: "#fff", letterSpacing: 2 }}>
        [Challenging Solved Examples]
      </span>
    </div>
  </div>
);

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
      position: "fixed", top: 14, left: 14, zIndex: 1100, background: P_COLOR,
      border: "none", borderRadius: 4, width: 36, height: 36, cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: 0 }}>
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
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1080, width: open ? 260 : 0, height: "100vh",
      background: "#fff", borderRight: open ? "2px solid #e8c0d8" : "none",
      boxShadow: open ? "3px 0 16px rgba(139,10,78,0.10)" : "none",
      transition: "width 0.28s ease", overflowY: open ? "auto" : "hidden", overflowX: "hidden" }}>
      <div style={{ width: 260, padding: "56px 0 20px" }}>
        <div style={{ padding: "0 16px 8px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: P_COLOR, letterSpacing: 1, textTransform: "uppercase",
          borderBottom: "1.5px solid #e8c0d8", marginBottom: 8 }}>Contents</div>
        <nav>
          {tocItems.map(item => (
            <div key={item.id}
              onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}
              onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", padding: "5px 16px",
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 400, fontSize: 11.5,
                color: "#444", background: hovered === item.id ? LIGHT_P : "transparent",
                marginBottom: 1, lineHeight: 1.4 }}>
              Example {item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

const TOC = Array.from({ length: 25 }, (_, i) => ({ id: `ex-${i + 1}`, title: `${i + 1}` }));

const allContent = [
  <AppBoosterBanner key="banner" />,

  // ── Example 1 ──
  <ExBox key="ex-1" num="1" title="Find the field strength at a point along the axis of a thin rod of length L and mass M, at a distance d from one end.">
    <SolHd />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_49BC57D39AFCA7327A8D} num="FIGURE 3.43" caption="Thin rod of length L; point at distance d from one end" />
    <P2>First we need to find the field due to an element of length {"$dx$"}. The mass of this element and the gravitational field due to this element are respectively</P2>
    <Mth key="m1a">{"$$dm = \\left(\\frac{M}{L}\\right)dx \\quad \\text{and} \\quad dg = \\frac{G\\,dm}{x^2} = \\frac{GM}{L}\\frac{dx}{x^2}$$"}</Mth>
    <P2>The total field strength is</P2>
    <Mth key="m1b">{"$$g = \\frac{GM}{L}\\int_d^{L+d}\\frac{dx}{x^2} = \\frac{GM}{L}\\left[\\frac{1}{d}-\\frac{1}{L+d}\\right] = \\boxed{\\frac{GM}{d(L+d)}}$$"}</Mth>
    <P2>Note that when {"$d \\gg L$"}, we find {"$g \\rightarrow GM/d^2$"}, which is the result for gravitational field due to a point particle.</P2>
  </ExBox>,

  // ── Example 2 ──
  <ExBox key="ex-2" num="2" title="A thin rod of mass M and length L is bent in a semicircle. (a) What is the magnitude of gravitational force on a particle of mass m located at O, the center of curvature? (b) What would be the force on m if the rod is, in the form of a complete circle?">
    <SolHd />
    <P2><strong>(a)</strong> Consider a small element of rod of length {"$dl$"} as shown in fig. 3.44. The gravitational force due to this element on the particle is</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6ABD30ABCCB792421AB5} num="FIGURE 3.44" caption="Semicircular rod; mass m at centre of curvature O" />
    <Mth key="m2a">{"$$dF = \\frac{GmdM}{R^2} = \\frac{Gm}{R^2}\\frac{M}{L}Rd\\theta = \\frac{GmM}{RL}d\\theta \\quad \\text{along }OP.$$"}</Mth>
    <P2>The component of this force along {"$x$"} and {"$y$"}-axis are</P2>
    <Mth key="m2b">{"$$\\begin{aligned} & dF_x = dF\\cos\\theta = \\frac{GmM\\cos\\theta\\,d\\theta}{LR} \\\\ & dF_y = dF\\sin\\theta = \\frac{GmM\\sin\\theta\\,d\\theta}{LR} \\\\ \\Rightarrow\\; & F_x = \\frac{GmM}{LR}\\int_0^\\pi\\cos\\theta\\,d\\theta = \\left.\\frac{GmM}{LR}\\sin\\theta\\right|_0^\\pi = 0 \\\\ & F_y = \\frac{GmM}{LR}\\int_0^\\pi\\sin\\theta\\,d\\theta = -\\left.\\frac{GmM}{LR}\\cos\\theta\\right|_0^\\pi \\\\ & \\quad\\; = \\frac{2GmM}{L(L/\\pi)} = \\frac{2\\pi GmM}{L^2} \\\\ \\therefore\\; & F = \\sqrt{F_x^2+F_y^2} = F_y = \\boxed{\\frac{2\\pi GmM}{L^2}} \\end{aligned}$$"}</Mth>
    <P2>{"$F_x = 0$"} can also be obtained from symmetry without solving.</P2>
    <P2><strong>(b)</strong> If the rod was bent into a complete circle, {"$L = 2\\pi R$"}.</P2>
    <Mth key="m2c">{"$$F_x = \\frac{GmM}{LR}\\int_0^{2\\pi}\\cos\\theta\\,d\\theta = 0 \\quad \\text{and} \\quad F_y = \\frac{GmM}{LR}\\int_0^{2\\pi}\\sin\\theta\\,d\\theta = 0$$"}</Mth>
    <Mth key="m2d">{"$$\\therefore\\quad F = \\sqrt{F_x^2+F_y^2} = \\boxed{0}$$"}</Mth>
    <P2>This can also be obtained from symmetry without solving.</P2>
  </ExBox>,

  // ── Example 3 ──
  <ExBox key="ex-3" num="3" title="Calculate the gravitational field intensity at the centre of the base of a hollow hemispherical shell of mass M and radius R. (Assume the base of hemisphere to be open)">
    <SolHd />
    <P2>Consider the shaded elemental ring of the hemisphere. Its area is</P2>
    <Mth key="m3a">{"$$dA = 2\\pi(R\\sin\\theta)(Rd\\theta) = 2\\pi R^2\\sin\\theta\\,d\\theta$$"}</Mth>
    <P2>and its mass is</P2>
    <Mth key="m3b">{"$$dM = \\frac{M}{2\\pi R^2}\\,dA = \\frac{M}{2\\pi R^2}\\times2\\pi R^2\\sin\\theta\\,d\\theta = M\\sin\\theta\\,d\\theta$$"}</Mth>
    <P2>The gravitational field due to this ring at {"$O$"} along the axis is</P2>
    <Mth key="m3c">{"$$dg = \\frac{G\\,dM}{R^2}\\cos\\theta = \\frac{GM}{R^2}\\sin\\theta\\cos\\theta\\,d\\theta$$"}</Mth>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7E0BF0E27D866AEA0FD3} num="FIGURE 3.45" caption="Elemental ring on hemispherical shell at angle θ" />
    <P2>The net gravitational field at {"$O$"} is</P2>
    <Mth key="m3d">{"$$g = \\int_0^{\\pi/2}\\frac{GM}{R^2}\\sin\\theta\\cos\\theta\\,d\\theta = \\boxed{\\frac{GM}{2R^2}}$$"}</Mth>
  </ExBox>,

  // ── Example 4 ──
  <ExBox key="ex-4" num="4" title="Calculate the gravitational field intensity and potential at the centre of the base of a solid hemisphere of mass M and radius R.">
    <SolHd />
    <P2>Consider a hemispherical shell of radius {"$r$"} and thickness {"$dr$"}. Its volume is {"$dV = 2\\pi r^2\\,dr$"} and its mass is</P2>
    <Mth key="m4a">{"$$dM = \\frac{M}{(2/3)\\pi R^3}\\,dV = \\frac{3M}{2\\pi R^3}\\times2\\pi r^2\\,dr = \\frac{3M}{R^3}r^2\\,dr$$"}</Mth>
    <P2>The gravitational field due to this shell at the centre of base is</P2>
    <Mth key="m4b">{"$$dg = \\frac{G\\,dM}{2r^2} = \\frac{G}{2r^2}\\times\\frac{3M}{R^3}r^2\\,dr = \\frac{3GM}{2R^3}\\,dr$$"}</Mth>
    <P2>The net gravitational field at the centre is</P2>
    <Mth key="m4c">{"$$g = \\int_0^R\\frac{3GM}{2R^3}\\,dr = \\boxed{\\frac{3GM}{2R^2}}$$"}</Mth>
    <P2>The gravitational potential being scalar can be calculated by simply considering complete solid sphere of mass {"$2M$"} and radius {"$R$"}. The gravitational potential due to this complete sphere at the centre is</P2>
    <Mth key="m4d">{"$$-\\frac{3}{2}\\times\\frac{G(2M)}{R} = -\\frac{3GM}{R}$$"}</Mth>
    <P2>The gravitational potential due to solid hemisphere of mass {"$M$"} and radius {"$R$"} is half of the value obtained above and is given by</P2>
    <Mth key="m4e">{"$$\\boxed{V = -\\frac{3GM}{2R}}$$"}</Mth>
  </ExBox>,

  // ── Example 5 ──
  <ExBox key="ex-5" num="5" title="Two point objects, each of mass m, are connected by a massless rope of length l. The objects are held near the surface of Earth, so that the rope is vertical and one object is hanging below the other. Now the objects are released. If l ≪ R, show that the tension in the rope is T = GMml/R³ where M is the mass of the Earth and R is its radius.">
    <SolHd />
    <P2>Let {"$h$"} be the height of lower mass from the surface of earth. Then the height of upper mass is {"$h+l$"}. Let {"$g_0$"} be the acceleration due to gravity on the surface of earth, and let {"$g_1$"} and {"$g_2$"} be acceleration due to gravity at the site of lower and upper masses respectively.</P2>
    <Mth key="m5a">{"$$g_1 = g_0\\left(1-\\frac{2h}{R}\\right) \\quad \\text{and} \\quad g_2 = g_0\\left(1-\\frac{2(h+l)}{R}\\right)$$"}</Mth>
    <Mth key="m5b">{"$$\\Rightarrow\\quad g_1 - g_2 = 2g_0 l/R.$$"}</Mth>
    <div style={{ display: "flex", gap: 16, justifyContent: "center", margin: "12px 0" }}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A31C15D17E7C0C88DC59} num="FIGURE 3.46 (a)" caption="" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D2579FF05B7CCCEF19A0} num="FIGURE 3.46 (b)" caption="" />
    </div>
    <P2>From FBD, {"$\\quad ma = mg_1 - T$"} and {"$ma = T + mg_2$"}</P2>
    <Mth key="m5c">{"$$\\begin{aligned} & \\Rightarrow\\quad mg_1 - T = T + mg_2 \\\\ & \\therefore\\quad T = \\frac{m}{2}(g_1-g_2) = \\frac{m}{2}\\times\\frac{2l}{R}g_0 = \\frac{ml}{R}\\times\\frac{GM}{R^2} = \\boxed{\\frac{GMml}{R^3}} \\end{aligned}$$"}</Mth>
  </ExBox>,

  // ── Example 6 ──
  <ExBox key="ex-6" num="6" title="A rocket with a payload of mass m is at rest at the surface of the earth. Calculate the work needed to raise the payload to the following states: (a) at rest at an altitude equal to radius of earth (R); (b) in circular orbit at an altitude R.">
    <SolHd />
    <P2>In both cases, the initial energy of the payload is purely potential energy.</P2>
    <Mth key="m6a">{"$$E_1 = K_1 + U_1 = 0 - \\frac{GMm}{R} = -\\frac{GMm}{R}$$"}</Mth>
    <P2><strong>(a)</strong> At the given altitude equal to {"$R$"},</P2>
    <Mth key="m6b">{"$$E_2 = K_2 + U_2 = 0 - \\frac{GMm}{R+R} = -\\frac{GMm}{2R}$$"}</Mth>
    <Mth key="m6c">{"$$\\text{The work needed is }\\quad E_2-E_1 = \\boxed{\\frac{GMm}{2R}}$$"}</Mth>
    <P2><strong>(b)</strong> The energy in orbit at altitude {"$R$"} is {"$E_3 = -\\dfrac{GMm}{2(R+R)} = -\\dfrac{GMm}{4R}$"}</P2>
    <Mth key="m6d">{"$$\\text{The work needed is }\\quad E_3-E_1 = \\boxed{\\frac{3GMm}{4R}}$$"}</Mth>
    <P2>Note that it takes more work to put the satellite into orbit than to merely raise it to the same altitude.</P2>
  </ExBox>,

  // ── Example 7 ──
  <ExBox key="ex-7" num="7" title="Distance between centres of two planets is 10a. The masses of these planets are M and 16M and their radii are a and 2a respectively. A body of mass m is fired straight from the surface of the larger planet towards the smaller planet. What should be its minimum initial speed to reach the surface of the smaller planet? Obtain the expression in terms of G, M and a.">
    <SolHd />
    <P2>For the particle to reach the surface of smaller planet, it must be able to reach point {"$P$"} where the net force due to the two planets is zero, i.e., the force of attraction due to the two planets is equal and opposite.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7B01636AD28D0CC38676} num="FIGURE 3.47" caption="Larger planet (16M) and smaller planet (M); neutral point P at x=8a" />
    <Mth key="m7a">{"$$\\Rightarrow\\quad \\frac{G(16M)}{x^2} = \\frac{GMm}{(10a-x)^2} \\qquad \\Rightarrow\\quad 16(10a-x)^2 = x^2$$"}</Mth>
    <Mth key="m7b">{"$$\\Rightarrow\\quad 40(10a-x) = x \\quad \\text{or} \\quad x = 8a$$"}</Mth>
    <P2>If {"$v$"} is the minimum speed of particle at point {"$A$"}, the speed of particle at point {"$P$"} is zero. Applying conservation of mechanical energy between points {"$A$"} and {"$P$"}, we have</P2>
    <Mth key="m7c">{"$$\\begin{aligned} & K_A + U_A = K_P + U_P \\\\ \\Rightarrow\\; & \\frac{1}{2}mv^2 + \\left(-\\frac{G(16M)m}{2a}-\\frac{GMm}{8a}\\right) = 0 + \\left(-\\frac{G(16M)m}{8a}-\\frac{GMm}{2a}\\right) \\\\ \\therefore\\; & \\boxed{v = \\frac{3}{2}\\sqrt{\\frac{5GM}{a}}} \\end{aligned}$$"}</Mth>
  </ExBox>,

  // ── Example 8 ──
  <ExBox key="ex-8" num="8" title="Two equal fixed masses of 6·4 kg are separated by a distance of 0·16 m. A small body of mass M = 0·1 kg is released from a point P equidistant from the two masses and at a distance 0·06 m from the line joining them as shown in fig. 3.48. (a) Calculate the velocity of this body when it passes through point Q. (b) Compute the acceleration of this body at P and Q.">
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_18981DDE6E1FA607D63A} num="FIGURE 3.48" caption="Body released from P; Q is the midpoint between the two fixed masses" />
    <SolHd />
    <P2><strong>(a)</strong> Applying conservation of mechanical energy between points {"$P$"} and {"$Q$"}, we have</P2>
    <Mth key="m8a">{"$$K_P + U_P = K_Q + U_Q$$"}</Mth>
    <Mth key="m8b">{"$$\\Rightarrow\\quad 0+\\left(-\\frac{GMm}{r}-\\frac{GMm}{r}\\right) = \\frac{1}{2}Mv^2+\\left(-\\frac{GMm}{0{\\cdot}08}-\\frac{GMm}{0{\\cdot}08}\\right)$$"}</Mth>
    <P2>where, {"$r = \\sqrt{(0{\\cdot}06)^2+(0{\\cdot}08)^2} = 0{\\cdot}1\\text{ m}$"} and {"$v$"} is the velocity of mass {"$M$"} at point {"$Q$"}.</P2>
    <Mth key="m8c">{"$$\\Rightarrow\\quad \\frac{v^2}{2} = 2Gm\\left(\\frac{1}{0{\\cdot}08}-\\frac{1}{0{\\cdot}1}\\right)$$"}</Mth>
    <P2>Substituting the values of {"$G$"} and {"$m$"}, we get</P2>
    <Mth key="m8d">{"$$\\boxed{v = 6{\\cdot}53\\times10^{-5}\\text{ m/s}}$$"}</Mth>
    <P2><strong>(b)</strong> At point {"$Q$"}, there is no acceleration of the body because the net gravitational force due to two masses is zero.</P2>
    <P2>When the body is at point {"$P$"}, then there are two forces of equal magnitude along {"$PA$"} and {"$PB$"}. The magnitude of either force is {"$\\dfrac{GMm}{r^2} = f$"} (say)</P2>
    <P2>The resultant force {"$F$"} is along {"$PQ$"} is given by</P2>
    <Mth key="m8e">{"$$F = f\\cos\\alpha + f\\cos\\alpha = 2f\\cos\\alpha$$"}</Mth>
    <P2>where, {"$\\cos\\alpha = \\dfrac{0{\\cdot}06}{r} = \\dfrac{0{\\cdot}06}{0{\\cdot}1} = 0{\\cdot}6$"}</P2>
    <Mth key="m8f">{"$$\\Rightarrow\\; F = 1{\\cdot}2f = \\frac{1{\\cdot}2GMm}{r^2} = \\frac{1{\\cdot}2\\times6{\\cdot}67\\times10^{-11}\\times0{\\cdot}1\\times6{\\cdot}4}{(0{\\cdot}1)^2} = 5{\\cdot}12\\times10^{-9}\\text{ N}$$"}</Mth>
    <Mth key="m8g">{"$$\\text{Hence, acceleration} = 5{\\cdot}12\\times10^{-9}/0{\\cdot}1 = \\boxed{5{\\cdot}12\\times10^{-8}\\text{ m/s}^2}$$"}</Mth>
  </ExBox>,

  // ── Example 9 ──
  <ExBox key="ex-9" num="9" title="Three particles, each of mass m are situated at the vertices of an equilateral triangle of side length a. The only forces acting on the particles are their mutual gravitational forces. It is desired that each particle moves in a circle while maintaining the original mutual separation a. Find the initial velocity that should be given to each particle and also the time period of the circular motion.">
    <SolHd />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6F6B04411BE97520DAFA} num="FIGURE 3.49" caption="Three equal masses at vertices of equilateral triangle; circumcentre O" />
    <P2>Consider the forces on mass {"$A$"}. The forces are {"$F_{AB}$"} towards {"$B$"} and {"$F_{AC}$"} towards {"$C$"}. These forces have equal magnitudes. Their resultant is along {"$AO$"} and is equal to</P2>
    <Mth key="m9a">{"$$2(F_{AB})\\cos30^\\circ = 2\\cdot\\frac{Gm^2}{a^2}\\cdot\\frac{\\sqrt{3}}{2} = \\sqrt{3}\\frac{Gm^2}{a^2}$$"}</Mth>
    <P2>This force is directed towards circumcentre {"$O$"} and provides necessary centripetal force. If {"$v$"} is the speed with which {"$A$"} revolves then,</P2>
    <Mth key="m9b">{"$$\\frac{mv^2}{r} = \\sqrt{3}\\frac{Gm^2}{a^2} \\quad \\text{where, } r = AO = a/\\sqrt{3}$$"}</Mth>
    <Mth key="m9c">{"$$\\Rightarrow\\quad v^2 = \\sqrt{3}\\frac{Gm}{a^2}\\cdot\\frac{a}{\\sqrt{3}} = \\frac{Gm}{a} \\qquad \\therefore\\quad \\boxed{v = \\sqrt{\\frac{Gm}{a}}}$$"}</Mth>
    <Mth key="m9d">{"$$\\text{Time period,}\\quad T = \\frac{2\\pi r}{v} = \\frac{2\\pi(a/\\sqrt{3})}{\\sqrt{GM/a}} = \\boxed{\\frac{2\\pi a^{3/2}}{\\sqrt{3Gm}}}$$"}</Mth>
  </ExBox>,

  // ── Example 10 ──
  <ExBox key="ex-10" num="10" title="Four particles each of mass m placed at the four corners of square of edge a, move with speed v, along a circle, which circumscribes the square, under the influence of their mutual gravitational force. Find the speed v.">
    <SolHd />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B385E7B594085BB7F770} num="FIGURE 3.50" caption="Four masses at corners of square; circumscribed circle" />
    <P2>Here, {"$r = a/\\sqrt{2}$"}. Consider forces on mass {"$A$"}.</P2>
    <P2>The forces are {"$F_{AB} = F_{AD} = \\dfrac{Gm^2}{a^2}$"} and {"$F_{AC} = \\dfrac{Gm^2}{(\\sqrt{2}\\,a)^2}$"} in the directions shown in fig. 3.50.</P2>
    <P2>Their resultant is along {"$AO$"} equal to</P2>
    <Mth key="m10a">{"$$F_{AB}\\cos45^\\circ + F_{AD}\\cos45^\\circ + F_{AC} = \\frac{Gm^2}{a^2}\\times\\frac{1}{\\sqrt{2}}+\\frac{Gm^2}{a^2}\\times\\frac{1}{\\sqrt{2}}+\\frac{Gm^2}{2a^2} = \\frac{Gm^2}{2a^2}(1+2\\sqrt{2})$$"}</Mth>
    <P2>This force provides the necessary centripetal force</P2>
    <Mth key="m10b">{"$$\\Rightarrow\\quad \\frac{mv^2}{a/\\sqrt{2}} = \\frac{Gm^2}{2a^2}(1+2\\sqrt{2}) \\qquad \\therefore\\quad \\boxed{v = \\sqrt{\\frac{Gm}{a}\\left(\\frac{1+2\\sqrt{2}}{2\\sqrt{2}}\\right)}}$$"}</Mth>
  </ExBox>,

  // ── Example 11 ──
  <ExBox key="ex-11" num="11" title="A planet of mass m₁ revolves round the sun of mass m₂. The distance between the sun and the planet is r. Considering the motion of the sun, find the total energy of the system assuming the orbits to be circular.">
    <SolHd />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_96BB6DBD6E3DAC177845} num="FIGURE 3.51" caption="Planet and sun orbiting their common centre of mass" />
    <P2>Here, {"$\\quad r_1 = \\dfrac{m_2 r}{m_1+m_2} \\quad$"} and {"$\\quad r_2 = \\dfrac{m_1 r}{m_1+m_2}$"}</P2>
    <P2>The gravitational force on {"$m_1$"} provides the necessary centripetal force</P2>
    <Mth key="m11a">{"$$\\Rightarrow\\quad m_1\\omega^2 r_1 = \\frac{Gm_1 m_2}{r^2} \\qquad \\Rightarrow\\quad \\omega^2 = \\frac{G(m_1+m_2)}{r^3}$$"}</Mth>
    <P2>The kinetic energy of the planet and sun is</P2>
    <Mth key="m11b">{"$$K = \\frac{1}{2}m_1(\\omega r_1)^2+\\frac{1}{2}m_2(\\omega r_2)^2 = \\frac{1}{2}(m_1 r_1^2+m_2 r_2^2)\\omega^2 = \\frac{Gm_1 m_2}{2r}$$"}</Mth>
    <P2>Therefore, total energy of system is</P2>
    <Mth key="m11c">{"$$E = K+U = \\frac{Gm_1 m_2}{2r}-\\frac{Gm_1 m_2}{r} = \\boxed{-\\frac{Gm_1 m_2}{2r}}$$"}</Mth>
  </ExBox>,

  // ── Example 12 ──
  <ExBox key="ex-12" num="12" title="A double star is a system of two stars moving around the centre of mass of the system due to gravitation. Find the distance between the components of the double star if the total mass equals M and time period is T.">
    <SolHd />
    <P2>Let {"$d$"} be the distance between stars and {"$d_1$"} and {"$d_2$"} be the distances of stars from centre of mass.</P2>
    <Mth key="m12a">{"$$d_1 = \\frac{dm_2}{m_1+m_2} \\quad \\text{and} \\quad d_2 = \\frac{dm_1}{m_1+m_2}$$"}</Mth>
    <P2>We have, {"$\\dfrac{Gm_1 m_2}{d^2} = m_1\\omega^2 d_1 = m_2\\omega^2 d_2$"}. Also, {"$m_1+m_2 = M$"} (Given)</P2>
    <Mth key="m12b">{"$$\\Rightarrow\\quad \\frac{Gm_1(M-m_1)}{d^2} = m_1\\omega^2\\left[\\frac{d}{M}(M-m_1)\\right] \\qquad \\Rightarrow\\quad GM = \\omega^2 d^3$$"}</Mth>
    <Mth key="m12c">{"$$\\Rightarrow\\quad d^3 = \\frac{GMT^2}{4\\pi^2} \\qquad \\therefore\\quad \\boxed{d = \\left[\\frac{GMT^2}{4\\pi^2}\\right]^{1/3}}$$"}</Mth>
  </ExBox>,

  // ── Example 13 ──
  <ExBox key="ex-13" num="13" title="A planet of mass m revolves in an elliptical orbit around the sun of mass M so that its maximum and minimum distances from the sun are equal to rₐ and r_p respectively. Find the angular momentum of this planet relative to the sun.">
    <SolHd />
    <P2>Let the velocity of the planet at the point of maximum and minimum distances be {"$v_a$"} and {"$v_b$"} respectively. Then by conservation of angular momentum, we have</P2>
    <Mth key="m13a">{"$$mv_P r_P = mv_a r_a$$"}</Mth>
    <P2>By conservation of mechanical energy, we have</P2>
    <Mth key="m13b">{"$$-\\frac{GMm}{r_P}+\\frac{1}{2}mv_P^2 = -\\frac{GMm}{r_a}+\\frac{1}{2}mv_a^2$$"}</Mth>
    <P2>On solving the above two equations, we get</P2>
    <Mth key="m13c">{"$$v_P = \\sqrt{\\frac{2GMr_a}{r_P(r_P+r_a)}}$$"}</Mth>
    <P2>Therefore, angular momentum,</P2>
    <Mth key="m13d">{"$$L = mv_P r_P = \\boxed{m\\sqrt{\\frac{2GMr_P r_a}{r_P+r_a}}}$$"}</Mth>
  </ExBox>,

  // ── Example 14 ──
  <ExBox key="ex-14" num="14" title="Calculate the time period of revolution and orbital speed of a satellite describing an equatorial orbit at 1400 km above the earth's surface. If the satellite is travelling in the same direction as the rotation of the earth, calculate the interval between two successive appearances of the satellite for an observer on a fixed point on the earth just below the satellite. (Radius of earth is 6400 km).">
    <SolHd />
    <P2>Radius of orbit, {"$r = R+h = 6400+1400 = 7800$"} km</P2>
    <P2>Time period of satellite,</P2>
    <Mth key="m14a">{"$$T_S = \\sqrt{\\frac{4\\pi^2}{GM}r^3} = \\sqrt{\\frac{4\\pi^2 r^3}{gR^2}} = \\sqrt{\\frac{4\\pi^2\\times(7{\\cdot}8\\times10^6)^3}{9{\\cdot}8\\times(6{\\cdot}4\\times10^6)^2}} = \\boxed{6830\\text{ sec}}$$"}</Mth>
    <Mth key="m14b">{"$$\\omega_S = \\frac{2\\pi}{T_S} \\quad \\text{and} \\quad \\omega_E = \\frac{2\\pi}{T_E} \\quad \\text{where, } T_E = 24\\text{ hrs}$$"}</Mth>
    <Mth key="m14c">{"$$\\omega_{SE} = \\omega_S-\\omega_E \\quad \\Rightarrow \\quad \\frac{2\\pi}{T_{SE}} = \\frac{2\\pi}{T_S}-\\frac{2\\pi}{T_E}$$"}</Mth>
    <Mth key="m14d">{"$$\\therefore\\quad T_{SE} = \\frac{T_S T_E}{T_E-T_S} = \\frac{6830\\times(24\\times3600)}{(24\\times3600)-6830} = \\boxed{7416\\text{ sec}}$$"}</Mth>
  </ExBox>,

  // ── Example 15 ──
  <ExBox key="ex-15" num="15" title="A satellite is revolving in a circular equatorial orbit of radius r = 2 × 10⁴ km from east to west. Calculate the interval after which it will appear at the same equatorial town. Given R = 6400 km and g = 10 ms⁻².">
    <SolHd />
    <P2>The time period of satellite is</P2>
    <Mth key="m15a">{"$$T_S = \\sqrt{\\frac{4\\pi^2}{GM}r^3} = \\sqrt{\\frac{4\\pi^2 r^3}{gR^2}} = \\sqrt{\\frac{4\\pi^2\\times(2\\times10^7)^3}{10\\times(6{\\cdot}4\\times10^6)^2}} = 2{\\cdot}78\\times10^4\\text{ s}$$"}</Mth>
    <P2>The time period of rotation of earth is {"$T_E = 24\\text{ hrs} = 86400\\text{ s}$"}</P2>
    <P2>Since the direction of rotation of satellite and earth are in opposite directions, the relative angular velocity {"$\\omega_{SE}$"} of satellite with respect to earth is {"$\\omega_{SE} = \\omega_S+\\omega_E$"}</P2>
    <Mth key="m15b">{"$$\\frac{2\\pi}{T_{SE}} = \\frac{2\\pi}{T_S}+\\frac{2\\pi}{T_E}$$"}</Mth>
    <Mth key="m15c">{"$$\\therefore\\quad T_{SE} = \\frac{T_S T_E}{T_S+T_E} = \\frac{(2{\\cdot}78\\times10^4)\\times(8{\\cdot}64\\times10^4)}{(2{\\cdot}78\\times10^4)+(8{\\cdot}64\\times10^4)} = \\boxed{2{\\cdot}1\\times10^4\\text{ s} = 5\\text{ hr }50\\text{ min}}$$"}</Mth>
  </ExBox>,

  // ── Example 16 ──
  <ExBox key="ex-16" num="16" title="A satellite P is revolving around the Earth of mass M at a height h equal to radius of Earth R above equator. Another satellite Q is at a height 2h revolving in opposite direction. At an instant, the two are at same vertical line passing through centre of sphere. Find the least time after which again they are in this situation.">
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CAEB69778E19DA607D3C} num="FIGURE 3.52" caption="Satellites P and Q orbiting Earth in opposite directions" />
    <SolHd />
    <P2>If {"$r$"} is the orbital radius of the satellite, then {"$\\dfrac{GMm}{r^2} = m\\omega^2 r \\Rightarrow \\omega = \\sqrt{\\dfrac{GM}{r^3}}$"}</P2>
    <Mth key="m16a">{"$$\\omega_P = \\sqrt{\\frac{GM}{(2R)^3}} \\quad \\text{and} \\quad \\omega_Q = \\sqrt{\\frac{GM}{(3R)^3}}$$"}</Mth>
    <P2>As the satellites are moving in opposite directions, the required time {"$T$"} is given by</P2>
    <Mth key="m16b">{"$$\\frac{2\\pi}{T} = \\omega_P+\\omega_Q$$"}</Mth>
    <Mth key="m16c">{"$$\\therefore\\quad T = \\frac{2\\pi}{\\omega_P+\\omega_Q} = \\frac{2\\pi}{\\sqrt{GM/8R^3}+\\sqrt{GM/27R^3}} = \\boxed{\\frac{12\\pi\\sqrt{6}\\,R^{3/2}}{\\sqrt{GM}(2\\sqrt{2}+3\\sqrt{3})}}$$"}</Mth>
  </ExBox>,

  // ── Example 17 ──
  <ExBox key="ex-17" num="17" title="Two satellites S₁ and S₂ revolve around a planet in coplanar circular orbits in the same sense. Their period of revolutions are 1 hr and 8 hrs respectively. The radius of the orbit of S₁ is 10⁴ km. When S₂ is closest to S₁, find (a) the instantaneous speed of S₂ relative to S₁ (b) the instantaneous angular speed of S₂ actually observed by an astronaut in S₁.">
    <SolHd />
    <P2>Let {"$r_1$"} and {"$r_2$"} be the radii of orbits and {"$T_1$"} and {"$T_2$"} be the time periods of revolution.</P2>
    <P2>Since, {"$T^2 \\propto r^3$"}, we have</P2>
    <Mth key="m17a">{"$$\\frac{r_2}{r_1} = \\left(\\frac{T_2}{T_1}\\right)^{2/3} = \\left(\\frac{8}{1}\\right)^{2/3} = 4 \\qquad \\Rightarrow\\quad r_2 = 4\\times10^4\\text{ km}$$"}</Mth>
    <Mth key="m17b">{"$$v_1 = \\frac{2\\pi r_1}{T_1} = \\frac{2\\pi\\times10^4}{1} = 2\\pi\\times10^4\\text{ km/hr}$$"}</Mth>
    <Mth key="m17c">{"$$v_2 = \\frac{2\\pi r_2}{T_2} = \\frac{2\\pi\\times4\\times10^4}{8} = \\pi\\times10^4\\text{ km/hr}$$"}</Mth>
    <P2><strong>(a)</strong> Instantaneous speed of {"$S_2$"} relative to {"$S_1$"} is</P2>
    <Mth key="m17d">{"$$|v_2-v_1| = \\pi\\times10^4 = \\boxed{3{\\cdot}14\\times10^4\\text{ km/hr}}$$"}</Mth>
    <P2><strong>(b)</strong> Instantaneous angular speed of {"$S_2$"} w.r.t. {"$S_1$"} is</P2>
    <Mth key="m17e">{"$$\\frac{|v_2-v_1|}{r_2-r_1} = \\frac{3{\\cdot}14\\times10^4}{3\\times10^4}\\times\\frac{1}{3600} = \\boxed{2{\\cdot}91\\times10^{-4}\\text{ rad/s}}$$"}</Mth>
  </ExBox>,

  // ── Example 18 ──
  <ExBox key="ex-18" num="18" title="A satellite of mass Mₛ is orbiting the Earth in a circular orbit of radius Rₛ. It starts losing energy slowly at a constant rate C due to friction. If Mₑ and Rₑ denote the mass and radius of the Earth respectively, show that the satellite falls on the Earth in time t = GMₛMₑ/(2C) × (1/Rₑ − 1/Rₛ).">
    <SolHd />
    <P2>Energy of satellite in orbit of radius {"$r$"} is {"$E = \\dfrac{-GM_s M_e}{2r}$"} and {"$\\dfrac{dE}{dt} = -C$"}</P2>
    <Mth key="m18a">{"$$\\Rightarrow\\quad \\frac{dE}{dr}\\times\\frac{dr}{dt} = -C \\qquad \\Rightarrow\\quad \\frac{d}{dr}\\left(\\frac{-GM_e M_s}{2r}\\right)\\times\\frac{dr}{dt} = -C$$"}</Mth>
    <Mth key="m18b">{"$$\\Rightarrow\\quad \\frac{GM_e M_s}{2r^2}\\times\\frac{dr}{dt} = -C \\qquad \\Rightarrow\\quad -\\int_{R_s}^{R_e}\\frac{dr}{r^2} = \\frac{2C}{GM_e M_s}\\int_0^t dt$$"}</Mth>
    <Mth key="m18c">{"$$\\Rightarrow\\quad \\left(\\frac{1}{R_e}-\\frac{1}{R_s}\\right) = \\frac{2Ct}{GM_e M_s} \\qquad \\therefore\\quad \\boxed{t = \\frac{GM_e M_s}{2C}\\left(\\frac{1}{R_e}-\\frac{1}{R_s}\\right)}$$"}</Mth>
  </ExBox>,

  // ── Example 19 ──
  <ExBox key="ex-19" num="19" title="If a planet at a large distance moving in circular orbit is suddenly stopped, show that it will fall on to the sun in a time √2/8 times the period of the planet's revolution.">
    <SolHd />
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_60395E0D9915A3D06CAF} num="FIGURE 3.53" caption="Degenerate ellipse formed when planet stops; semi-major axis a' = a/2" />
    <P2>Assume that the planet is revolving in an elliptical orbit that is extremely flat whose eccentricity approaches 1. The extreme positions of the major axis of this ellipse are located at sun and the planet. The semi major axis {"$a'$"} of this assumed ellipse will be {"$a' = a/2$"} where {"$a$"} is the radius of the circular orbit of the planet.</P2>
    <P2>By Kepler's third law, we have</P2>
    <Mth key="m19a">{"$$\\frac{T'}{T} = \\left(\\frac{a'}{a}\\right)^{3/2} = \\left(\\frac{1}{2}\\right)^{3/2} \\quad \\text{or} \\quad T' = T\\left(\\frac{1}{2}\\right)^{3/2}$$"}</Mth>
    <P2>Therefore, the time taken by the planet to fall onto the sun is</P2>
    <Mth key="m19b">{"$$t = \\frac{T'}{2} = \\frac{T}{2}\\left(\\frac{1}{2}\\right)^{3/2} = \\boxed{\\frac{\\sqrt{2}\\,T}{8}}$$"}</Mth>
  </ExBox>,

  // ── Example 20 ──
  <ExBox key="ex-20" num="20" title="A small satellite revolves around a heavy planet in a circular orbit. At certain point in its orbit, a sharp impulse acts on it and instantaneously increases its kinetic energy to k (< 2) times without change in its direction of motion. Show that in its subsequent motion, the ratio of its maximum and minimum distances from the planet is k/(2−k).">
    <SolHd />
    <P2>Let the satellite of mass {"$m$"} revolves around the planet of mass {"$M$"} in an orbit of radius {"$r$"}. Then, orbital velocity is {"$v_0 = \\sqrt{GM/r}$"}</P2>
    <P2>As its kinetic energy is increased {"$k(<2)$"} times, it goes into an elliptical orbit. The present distance is now the minimum distance {"$r_1$"} of the satellite from the planet. Let the maximum distance be {"$r_2$"}. Then,</P2>
    <Mth key="m20a">{"$$v_1 = \\sqrt{k}\\,v_0 = \\sqrt{\\frac{kGM}{r_1}} \\qquad\\text{...(1)}$$"}</Mth>
    <P2>From conservation of angular momentum and conservation of mechanical energy, we have</P2>
    <Mth key="m20b">{"$$\\begin{aligned} & mv_1 r_1 = mv_2 r_2 \\quad \\text{and} \\quad \\frac{1}{2}mv_1^2-\\frac{GMm}{r_1} = \\frac{1}{2}mv_2^2-\\frac{GMm}{r_2} \\\\ \\Rightarrow\\; & v_2 = \\frac{r_1}{r_2}v_1 \\quad \\text{and} \\quad v_1^2\\left(1-\\frac{r_1^2}{r_2^2}\\right) = 2GM\\left(\\frac{1}{r_1}-\\frac{1}{r_2}\\right) \\end{aligned}$$"}</Mth>
    <P2>On putting the value of {"$v_1$"} from (1), we get</P2>
    <Mth key="m20c">{"$$\\frac{kGM}{r_1}\\left(\\frac{r_2^2-r_1^2}{r_2^2}\\right) = 2GM\\left(\\frac{r_2-r_1}{r_1 r_2}\\right) \\qquad \\Rightarrow\\quad k\\left(\\frac{r_2+r_1}{r_2}\\right) = 2$$"}</Mth>
    <Mth key="m20d">{"$$\\Rightarrow\\quad kr_2+kr_1 = 2r_2 \\qquad \\therefore\\quad \\boxed{\\frac{r_2}{r_1} = \\frac{k}{2-k}}$$"}</Mth>
  </ExBox>,

  // ── Example 21 ──
  <ExBox key="ex-21" num="21" title="The minimum and maximum distances of a satellite of mass m from the centre of the earth are 2R and 4R respectively, where R is the radius of earth and M is the mass of the earth. Find (a) its minimum and maximum speeds (b) radius of curvature at the point of minimum distance.">
    <SolHd />
    <P2>Let {"$r_1$"} and {"$r_2$"} be the minimum and maximum distances and {"$v_1$"} and {"$v_2$"} be the respective speeds of satellite at these positions. Then, {"$r_1 = 2R$"} and {"$r_2 = 4R$"}.</P2>
    <P2><strong>(a)</strong> By conservation of angular momentum and conservation of mechanical energy, we have</P2>
    <Mth key="m21a">{"$$mv_1 r_1 = mv_2 r_2 \\quad \\text{and} \\quad \\frac{1}{2}mv_1^2-\\frac{GMm}{r_1} = \\frac{1}{2}mv_2^2-\\frac{GMm}{r_2}$$"}</Mth>
    <P2>On solving the two equations, we get</P2>
    <Mth key="m21b">{"$$v_1 = \\sqrt{\\frac{2GMr_2}{r_1(r_1+r_2)}} \\quad \\text{and} \\quad v_2 = \\sqrt{\\frac{2GMr_1}{r_2(r_1+r_2)}}$$"}</Mth>
    <P2>On putting {"$r_1 = 2R$"} and {"$r_2 = 4R$"}, we get</P2>
    <Mth key="m21c">{"$$v_1 = \\sqrt{\\frac{2GM}{3R}} \\quad \\text{and} \\quad v_2 = \\sqrt{\\frac{GM}{6R}}$$"}</Mth>
    <P2>These are the maximum and minimum speeds.</P2>
    <P2><strong>(b)</strong> At the point of minimum distance ({"$r_1$"}), let {"$r$"} = radius of curvature</P2>
    <Mth key="m21d">{"$$\\frac{mv_1^2}{r} = \\frac{GMm}{r_1^2} \\qquad \\therefore\\quad r = \\frac{r_1^2 v_1^2}{GM} = \\frac{(2R)^2(2GM/3R)}{GM} = \\boxed{\\frac{8R}{3}}$$"}</Mth>
  </ExBox>,

  // ── Example 22 ──
  <ExBox key="ex-22" num="22" title="A satellite is revolving around the earth in a circular orbit of radius r and velocity v₀. A particle is projected from the satellite in forward direction with relative velocity vᵣ = (√(5/4) − 1)v₀. Calculate its minimum and maximum distances from earth's centre during subsequent motion of the particle.">
    <SolHd />
    <P2>Let {"$M$"} = mass of the earth. The orbital speed of satellite, {"$v_0 = \\sqrt{GM/r}$"}</P2>
    <P2>Velocity of particle would be</P2>
    <Mth key="m22a">{"$$v = v_r+v_0 = \\left(\\sqrt{\\frac{5}{4}}-1\\right)v_0+v_0 = \\sqrt{\\frac{5}{4}}\\,v_0 = \\sqrt{\\frac{5GM}{4r}} \\qquad\\text{...(1)}$$"}</Mth>
    <P2>Since {"$v_0 < v < v_e$"}, the path of the particle will be an ellipse with {"$r$"} being the minimum distance of particle from the earth. Let {"$r'$"} = maximum distance and {"$v'$"} = velocity of particle at maximum distance.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_8183395FEC0C681B5E37} num="FIGURE 3.54" caption="Elliptical orbit of particle; r = min distance, r' = max distance" />
    <P2>By conservation of angular momentum and conservation of mechanical energy, we have</P2>
    <Mth key="m22b">{"$$mvr = mv'r' \\qquad\\text{...(2)}$$"}</Mth>
    <Mth key="m22c">{"$$\\frac{1}{2}mv^2-\\frac{GMm}{r} = \\frac{1}{2}mv'^2-\\frac{GMm}{r'} \\qquad\\text{...(3)}$$"}</Mth>
    <P2>From eqns. (1), (2) and (3), we get {"$r' = 5r/3$"}</P2>
    <P2>Therefore, the minimum and maximum distances respectively are {"$\\boxed{r \\text{ and } 5r/3}$"}.</P2>
  </ExBox>,

  // ── Example 23 ──
  <ExBox key="ex-23" num="23" title="A planet moves around the sun in an elliptical orbit of semi-major axis a and eccentricity e. If the mass of sun is M, find the velocity at the perigee and apogee.">
    <SolHd />
    <P2>Let {"$m$"} be the mass of the planet.</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_30958FAA8022C45ECE87} num="FIGURE 3.55" caption="Elliptical orbit; perigee (rₚ = a−c) and apogee (rₐ = a+c)" />
    <P2>Applying the conservation of angular momentum at the perigee and apogee, we get</P2>
    <Mth key="m23a">{"$$mv_p r_p = mv_a r_a \\quad \\text{or} \\quad \\frac{v_p}{v_a} = \\frac{r_a}{r_p} = \\frac{a+c}{a-c} \\qquad\\text{...(1)}$$"}</Mth>
    <P2>Using conservation of mechanical energy, we get</P2>
    <Mth key="m23b">{"$$v_p^2-v_a^2 = 2GM\\left[\\frac{1}{r_p}-\\frac{1}{r_a}\\right] \\qquad\\text{...(2)}$$"}</Mth>
    <P2>Substituting the value of {"$v_p = v_a r_a/r_p$"}, we get</P2>
    <Mth key="m23c">{"$$v_a^2 = \\frac{2GM}{2a}\\left[\\frac{a-c}{a+c}\\right]$$"}</Mth>
    <P2>Since, {"$e = c/a$"}, we get</P2>
    <Mth key="m23d">{"$$\\boxed{v_a = \\sqrt{\\frac{GM}{a}\\left(\\frac{1-e}{1+e}\\right)}}$$"}</Mth>
    <P2>Putting the value in (1), we get</P2>
    <Mth key="m23e">{"$$\\boxed{v_p = \\sqrt{\\frac{GM}{a}\\left(\\frac{1+e}{1-e}\\right)}}$$"}</Mth>
  </ExBox>,

  // ── Example 24 ──
  <ExBox key="ex-24" num="24" title="A body is launched from the Earth's surface at an angle α = 30° to the horizontal at a speed v₀ = √(3GM/2R). Neglecting air resistance and Earth's rotation, find (a) the height to which the body will rise. (b) the radius of curvature of trajectory at its top point.">
    <SolHd />
    <P2><strong>(a)</strong> Let {"$h$"} be the height from the earth's surface to which the body will rise. The angle of projection to the radius vector of Earth is {"$60^\\circ$"}. From conservation of angular momentum, we have</P2>
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_51DF053F2620D9EA59AD} num="FIGURE 3.56" caption="Body launched at 30° to horizontal; top point at height h" />
    <Mth key="m24a">{"$$mv_0 R\\sin60^\\circ = mv(h+R) \\qquad \\Rightarrow\\quad v = \\frac{\\sqrt{3}\\,v_0 R}{2(h+R)} = \\sqrt{\\frac{9}{8}\\frac{GMR}{(h+R)^2}}$$"}</Mth>
    <P2>Also, from conservation of mechanical energy, we have</P2>
    <Mth key="m24b">{"$$\\frac{-GMm}{R}+\\frac{1}{2}m\\left(\\frac{3GM}{2R}\\right) = \\frac{-GMm}{R+h}+\\frac{1}{2}m\\left(\\frac{9}{8}\\frac{GMR}{(h+R)^2}\\right)$$"}</Mth>
    <Mth key="m24c">{"$$\\Rightarrow\\quad \\frac{-1}{4R} = \\frac{-1}{R+h}+\\frac{9R}{16(h+R)^2}$$"}</Mth>
    <Mth key="m24d">{"$$\\Rightarrow\\quad 4(h+R)^2-16(h+R)R+9R^2 = 0$$"}</Mth>
    <Mth key="m24e">{"$$\\Rightarrow\\quad \\frac{h+R}{R} = \\frac{16\\pm\\sqrt{16^2-4\\times4\\times9}}{8} \\qquad \\Rightarrow\\quad \\frac{h}{R}+1 = 2\\pm\\frac{\\sqrt{7}}{2}$$"}</Mth>
    <P2>Ignoring negative value, we get</P2>
    <Mth key="m24f">{"$$\\boxed{h = \\left(1+\\frac{\\sqrt{7}}{2}\\right)R}$$"}</Mth>
    <P2><strong>(b)</strong> The acceleration of body at the top point is {"$a = \\dfrac{GM}{(R+h)^2}$"}</P2>
    <P2>If {"$r$"} is the radius of curvature of trajectory at its top point, then {"$a = v^2/r$"}</P2>
    <Mth key="m24g">{"$$\\therefore\\quad r = \\frac{v^2}{a} = \\frac{9}{8}\\frac{GMR}{(R+h)^2}\\bigg/\\frac{GM}{(R+h)^2} = \\boxed{\\frac{9}{8}R}$$"}</Mth>
  </ExBox>,

  // ── Example 25 ──
  <ExBox key="ex-25" num="25" title="A cosmic body A coming from infinity with a velocity v₀ is approaching the Sun of mass M, with its line of motion at a distance l from the Sun, as shown in fig. 3.57. When it gets closest to the Sun, i.e., at P, what will be its distance from the Sun?">
    <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_24D695021919B255419F} num="FIGURE 3.57" caption="Cosmic body approaching Sun with impact parameter l; closest approach at P" />
    <SolHd />
    <P2>Applying energy conservation principle at infinity and at {"$P$"}, we have</P2>
    <Mth key="m25a">{"$$0+\\frac{1}{2}mv_0^2 = -\\frac{GMm}{r}+\\frac{1}{2}mv^2 \\qquad\\text{...(1)}$$"}</Mth>
    <P2>where, {"$M$"} is mass of the sun, {"$m$"} is mass of the body, {"$r$"} is distance of closest approach and {"$v$"} is velocity at {"$P$"}.</P2>
    <P2>Since the angular momentum of the body about the sun will remain conserved, therefore,</P2>
    <Mth key="m25b">{"$$(mv_0)l = mvr \\qquad \\Rightarrow\\quad v_0 l = vr \\qquad\\text{...(2)}$$"}</Mth>
    <P2>From eqns. (1) and (2), we get</P2>
    <Mth key="m25c">{"$$\\frac{1}{2}mv_0^2 = -\\frac{GMm}{r}+\\frac{1}{2}m\\left(\\frac{v_0 l}{r}\\right)^2 \\qquad \\Rightarrow\\quad v_0^2 = -\\frac{2GM}{r}+\\frac{v_0^2 l^2}{r^2}$$"}</Mth>
    <Mth key="m25d">{"$$\\Rightarrow\\quad v_0^2 r^2+2GMr-v_0^2 l^2 = 0$$"}</Mth>
    <Mth key="m25e">{"$$\\Rightarrow\\quad r = \\frac{-2GM+\\sqrt{4G^2M^2+4v_0^4 l^2}}{2v_0^2}$$"}</Mth>
    <Mth key="m25f">{"$$\\therefore\\quad \\boxed{r = \\frac{GM}{v_0^2}\\left[\\sqrt{1+\\left(\\frac{v_0^2 l}{GM}\\right)^2}-1\\right]}$$"}</Mth>
  </ExBox>,
];

export default function AppBoosterLevel2() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div style={{ background: "#fff", minHeight: "100vh",
      fontFamily: "'Lora',Georgia,serif", fontSize: 17, lineHeight: 1.58, color: "#1a1a1a" }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen} />
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)} />
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC} />
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)", overflowX: "hidden" }}>
        {allContent}
      </div>
    </div>
  );
}
