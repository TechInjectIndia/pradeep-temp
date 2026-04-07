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
    st.textContent = `.katex, .katex-display { font-size: 1em; } .katex .mathnormal, .katex .mathit { font-family: 'Times New Roman', Times, serif !important; }`;
    document.head.appendChild(st);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
    s.onload = () => {
      const ar = document.createElement("script");
      ar.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js";
      ar.onload = () => {
        if (window.renderMathInElement) {
          window.renderMathInElement(document.body, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
            ],
            throwOnError: false,
          });
        }
      };
      document.head.appendChild(ar);
    };
    document.head.appendChild(s);
  }, []);
}

const P2 = ({ children, style }) => (
  <p style={{ marginBottom: 11, textAlign: "justify", ...style }}>{children}</p>
);

function Fig({ src, caption }) {
  return (
    <div style={{ textAlign: "center", margin: "14px auto 10px", maxWidth: 540 }}>
      <img src={src} alt={caption || ""} style={{ maxWidth: "100%", height: "auto", borderRadius: 2 }} />
      {caption && (
        <div style={{ fontSize: 13.5, color: "#555", fontStyle: "italic", marginTop: 5, fontFamily: "'Lora',serif" }}>
          {caption}
        </div>
      )}
    </div>
  );
}

function SecHd({ id, label, title, children }) {
  return (
    <div key={id} id={id} style={{ marginTop: 32, marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 15, color: "#fff",
          background: P_COLOR, padding: "3px 14px 3px 10px",
          borderRadius: "2px 0 0 2px", letterSpacing: 0.5,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {label ? `${label}  ${title}` : title}
        </span>
      </div>
      <div style={{ height: 2, background: `linear-gradient(90deg,${P_COLOR},#e8a0c8,transparent)`, marginTop: 4 }} />
      {children}
    </div>
  );
}

function ExBox({ num, problem, children }) {
  return (
    <div style={{
      margin: "22px 0",
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
      border: "1px solid #e0b8d0",
    }}>
      <div style={{
        background: P_COLOR,
        padding: "5px 16px",
      }}>
        <span style={{
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 12, color: "#fff",
          letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Example {num}
        </span>
      </div>
      <div style={{
        background: "#fdf6f0",
        padding: "14px 18px 12px",
        borderBottom: "1px solid #e8c8d8",
      }}>
        <p style={{
          margin: 0,
          fontFamily: "'Lora',serif",
          fontWeight: 600,
          fontSize: 16,
          lineHeight: 1.75,
          color: "#1a1a1a",
          textAlign: "justify",
        }}>
          {problem}
        </p>
      </div>
      <div style={{ padding: "14px 18px 12px", background: "#fff" }}>
        {children}
      </div>
    </div>
  );
}

function SolHd() {
  return (
    <p style={{ fontWeight: 700, color: P_COLOR, marginBottom: 6, marginTop: 2, fontSize: 15.5 }}>
      Solution.
    </p>
  );
}

function GraspGripBox({ children }) {
  return (
    <div style={{
      margin: "18px 0",
      background: "#fffbf4",
      border: `1px solid #d4a820`,
      borderRadius: 4,
      padding: "14px 18px",
    }}>
      <div style={{
        fontFamily: "'Lora',serif",
        fontWeight: 700, fontStyle: "italic",
        color: P_COLOR, fontSize: 18,
        marginBottom: 10,
      }}>
        Grasp &amp; Grip
      </div>
      {children}
    </div>
  );
}

function MathD({ children }) {
  return (
    <div style={{
      textAlign: "center", margin: "10px 4px",
      fontSize: "15.5px", lineHeight: 2.2,
      fontFamily: "'Times New Roman', Times, serif",
      overflowX: "auto", overflowY: "hidden",
      maxWidth: "100%", WebkitOverflowScrolling: "touch",
    }}>
      {children}
    </div>
  );
}

function HamburgerBtn({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      style={{
        position: "fixed", top: 14, left: 14, zIndex: 1100,
        width: 42, height: 42, borderRadius: 8,
        background: P_COLOR, border: "none", cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 5,
      }}
    >
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          display: "block", width: 20, height: 2,
          background: "#fff", borderRadius: 2,
          transition: "all 0.25s",
          transform: open
            ? i === 0 ? "rotate(45deg) translate(5px,5px)"
            : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
            : "scaleX(0)"
            : "none",
        }} />
      ))}
    </button>
  );
}

function Backdrop({ open, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed", inset: 0, zIndex: 1050,
        background: "rgba(0,0,0,0.35)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.25s",
      }}
    />
  );
}

function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, bottom: 0,
      width: open ? 270 : 0, zIndex: 1080,
      background: "#fff",
      borderRight: `3px solid ${P_COLOR}`,
      overflowY: "auto", overflowX: "hidden",
      transition: "width 0.28s cubic-bezier(.4,0,.2,1)",
      boxShadow: open ? "4px 0 24px rgba(0,0,0,0.18)" : "none",
    }}>
      <div style={{ padding: "20px 16px 16px", minWidth: 270 }}>
        <div style={{
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 800, fontSize: 13, color: P_COLOR,
          letterSpacing: 1, textTransform: "uppercase",
          marginBottom: 14, paddingBottom: 8,
          borderBottom: `2px solid ${P_COLOR}`,
        }}>
          Contents
        </div>
        <nav>
          {tocItems.map(item => (
            <div
              key={item.id}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                setOpen(false);
              }}
              style={{
                cursor: "pointer", padding: "6px 8px", borderRadius: 4,
                fontSize: 13.5, color: "#2a2a2a",
                fontFamily: "'Lora',serif",
                background: hovered === item.id ? LIGHT_P : "transparent",
                marginBottom: 2, lineHeight: 1.4,
              }}>
              {item.label && <span style={{ color: P_COLOR, fontWeight: 700, marginRight: 6 }}>{item.label}.</span>}
              {item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

function AppBoosterHeader() {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        background: "linear-gradient(135deg, #5a1a7a 0%, #8b0a4e 50%, #c0408a 100%)",
        padding: "22px 32px 18px", borderRadius: "4px 4px 0 0", textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 900, fontSize: 28, color: "#fff",
          letterSpacing: 1, textTransform: "uppercase", lineHeight: 1.2,
        }}>
          Application Booster <span style={{ color: "#ffd700" }}>—</span> Level 1
        </div>
        <div style={{
          fontFamily: "'Lora',serif", fontSize: 19, color: "#f0d8e8",
          marginTop: 8, letterSpacing: 0.5, fontStyle: "italic", fontWeight: 700,
        }}>
          [Topicwise Solved Examples]
        </div>
      </div>
      <div style={{ height: 4, background: "linear-gradient(90deg,#8b0a4e,#c0408a,#8b0a4e)" }} />
    </div>
  );
}

const TOC = [
  { id: "sec-com",    label: "I",   title: "Centre of Mass" },
  { id: "sec-motcom", label: "II",  title: "Motion of Centre of Mass" },
  { id: "sec-lin",    label: "III", title: "Conservation of Linear Momentum" },
  { id: "sec-imp",    label: "IV",  title: "Impulse" },
  { id: "sec-col1d",  label: "V",   title: "Collisions in One Dimension" },
  { id: "sec-col2d",  label: "VI",  title: "Collisions in Two Dimension" },
];

// ─── CONTENT ───

const allContent = (
  <>
    <SecHd id="sec-com" label="I." title="Centre of Mass" />

    <ExBox key="ex-1" num="1" problem="A uniform square plate and a disc having same mass per unit area are kept in contact as shown in fig. 1.45. The side of square and diameter of circle are both equal to L. Locate the position of the centre of mass of the system w.r.t. centre of the square.">
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_FF7F0496D661EE4D1B01} caption="FIGURE 1.45" />
      <SolHd />
      <P2>Let {"$\\sigma$"} = mass per unit area.</P2>
      <P2>Then, mass of square plate, {"$m_1 = \\sigma L^2$"} and mass of circular plate, {"$m_2 = \\sigma\\pi L^2/4$"}.</P2>
      <P2>Taking, centre of the square as origin and {"$X$"}-axis along centre of circular plate, we have {"$x_1 = 0$"} and {"$x_2 = L$"}</P2>
      <MathD>{"$$\\Rightarrow\\quad x_{\\mathrm{cm}} = \\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2} = \\frac{\\sigma L^2\\times 0 + (\\sigma\\pi L^2/4)L}{\\sigma L^2 + \\sigma\\pi L^2/4} = \\boxed{\\dfrac{\\pi L}{\\pi+4}}$$"}</MathD>
      <P2>Therefore, the centre of mass is at a distance {"$\\left(\\dfrac{\\pi L}{\\pi+4}\\right)$"} from the centre of square on the line joining the centres of the two objects.</P2>
    </ExBox>

    <ExBox key="ex-2" num="2" problem={"In the arrangement shown in fig. 1.46, $m_A = 2$ kg and $m_B = 1$ kg. String is light and inextensible. Find the acceleration of centre of mass of both the blocks. Neglect friction everywhere."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B073FC1537F04699AB74} caption="FIGURE 1.46" />
      <SolHd />
      <P2>Acceleration of the system,</P2>
      <MathD>{"$$a = \\frac{m_A - m_B}{m_A + m_B}\\,g = \\frac{2-1}{2+1}\\,g = \\frac{g}{3}$$"}</MathD>
      <P2>{"$\\Rightarrow\\; a_A = \\dfrac{g}{3}$"} downwards and {"$a_B = \\dfrac{g}{3}$"} upwards.</P2>
      <MathD>{"$$\\therefore\\quad a_{\\mathrm{cm}} = \\frac{m_A a_A - m_B a_B}{m_A + m_B} = \\frac{2\\times g/3 - 1\\times g/3}{2+1} = \\boxed{\\dfrac{g}{9}\\text{ downwards}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-3" num="3" problem={"Find the centre of mass of a uniform semi-circular ring of radius $R$."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_071E7DD2589DA26D3AF9} caption="FIGURE 1.47" />
      <SolHd />
      <P2>Let us choose {"$X$–$Y$"} axis (with the origin at {"$O$"}) as shown in fig. 1.48. By symmetry, centre of mass must lie on {"$Y$"}-axis.</P2>
      <P2>Thus {"$x_{\\mathrm{cm}} = 0$"} and {"$y_{\\mathrm{cm}} = \\dfrac{1}{M}\\displaystyle\\int y\\,dm$"}</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_0A8FF36CCD3822892447} caption="FIGURE 1.48" />
      <P2>If {"$M$"} is the mass of the semicircular ring, then its mass per unit length is</P2>
      <MathD>{"$$\\begin{aligned} \\sigma &= \\frac{M}{\\pi R} \\qquad\\text{and}\\qquad dm = \\sigma R\\,d\\theta = \\frac{M}{\\pi}\\,d\\theta \\\\ \\therefore\\; y_{\\mathrm{cm}} &= \\frac{1}{M}\\int y\\,dm = \\frac{1}{M}\\int_0^\\pi (R\\sin\\theta)\\frac{M}{\\pi}\\,d\\theta = \\left[-\\frac{R}{\\pi}\\cos\\theta\\right]_0^\\pi = \\boxed{\\dfrac{2R}{\\pi}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-4" num="4" problem={"Find the location of centre of mass of a uniform semicircular plate of radius $R$."}>
      <SolHd />
      <P2>Let us choose {"$X$–$Y$"} axis (with the origin at {"$O$"}) as shown in fig. 1.49. By symmetry, centre of mass must lie on {"$Y$"}-axis.</P2>
      <P2>Thus {"$x_{\\mathrm{cm}} = 0$"} and {"$y_{\\mathrm{cm}} = \\dfrac{1}{M}\\displaystyle\\int y\\,dm$"}</P2>
      <P2>If, {"$\\sigma$"} is the mass per unit area, then {"$\\sigma = \\dfrac{2M}{\\pi R^2}$"}</P2>
      <P2>and {"$dm = \\sigma\\times 2\\sqrt{R^2 - y^2}\\,dy$"}</P2>
      <MathD>{"$$\\therefore\\quad y_{\\mathrm{cm}} = \\frac{1}{M}\\int y\\,dm = \\frac{2\\sigma}{M}\\int_0^R y\\sqrt{R^2-y^2}\\,dy$$"}</MathD>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_37C6817607B74F198D79} caption="FIGURE 1.49" />
      <P2>Substituting {"$t = R^2 - y^2$"} and integrating, we get {"$\\boxed{y_{\\mathrm{cm}} = \\dfrac{4R}{3\\pi}}$"}</P2>
    </ExBox>

    <ExBox key="ex-5" num="5" problem={"Find the location of centre of mass of a uniform solid hemisphere of radius $R$."}>
      <SolHd />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_DE087737E3CD43F9D655} caption="FIGURE 1.50" />
      <P2>Let us choose {"$X$–$Y$"} axis (with the origin at {"$O$"}) as shown in fig. 1.50. By symmetry, centre of mass must lie on {"$Y$"}-axis.</P2>
      <P2>Thus, {"$x_{\\mathrm{cm}} = 0$"} and {"$y_{\\mathrm{cm}} = \\dfrac{1}{M}\\displaystyle\\int y\\,dm$"}</P2>
      <P2>If, {"$\\rho$"} is the mass per unit volume, then</P2>
      <MathD>{"$$\\rho = \\frac{2M}{(4/3)\\pi R^3} = \\frac{3M}{2\\pi R^3} \\qquad\\text{and}\\qquad dm = \\rho\\times\\pi(R^2 - y^2)\\,dy$$"}</MathD>
      <MathD>{"$$\\therefore\\quad y_{\\mathrm{cm}} = \\frac{1}{M}\\int y\\,dm = \\frac{\\pi\\rho}{M}\\int_0^R y(R^2-y^2)\\,dy$$"}</MathD>
      <P2>On solving, we get {"$\\boxed{y_{\\mathrm{cm}} = \\dfrac{3R}{8}}$"}</P2>
    </ExBox>

    <ExBox key="ex-6" num="6" problem={"A rod of length $L$ having negligible thickness, has a linear mass density that varies linearly with distance from the ends from $\\lambda_1$ at one end to $\\lambda_2$ at the other. Locate the centre of mass."}>
      <SolHd />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_212A07CE87F4CD4645E6} caption="FIGURE 1.51" />
      <P2>Consider a small element of length {"$dx$"}, at a distance {"$x$"} from the left end. Let its linear mass density be {"$\\lambda$"}.</P2>
      <P2>Since the linear mass density varies linearly with distance, we have</P2>
      <MathD>{"$$\\frac{\\lambda - \\lambda_1}{x} = \\frac{\\lambda_2 - \\lambda_1}{L} \\qquad\\Rightarrow\\qquad \\lambda = \\frac{\\lambda_1 L + (\\lambda_2 - \\lambda_1)x}{L}$$"}</MathD>
      <P2>The mass of this element,</P2>
      <MathD>{"$$dm = \\lambda\\,dx = \\frac{\\lambda_1 L + (\\lambda_2-\\lambda_1)x}{L}\\,dx$$"}</MathD>
      <P2>The distance of centre of mass from the left end,</P2>
      <MathD>{"$$\\begin{aligned} y_{\\mathrm{cm}} &= \\frac{1}{M}\\int x\\,dm = \\frac{\\displaystyle\\int_0^L x\\,\\frac{\\lambda_1 L+(\\lambda_2-\\lambda_1)x}{L}\\,dx}{\\displaystyle\\int_0^L \\frac{\\lambda_1 L+(\\lambda_2-\\lambda_1)x}{L}\\,dx} \\\\ &= \\frac{\\lambda_1 L^3/2 + (\\lambda_2-\\lambda_1)L^3/3}{\\lambda_1 L^2 + (\\lambda_2-\\lambda_1)L^2/2} \\\\ \\therefore\\quad x_{\\mathrm{cm}} &= \\boxed{\\left(\\frac{\\lambda_1+2\\lambda_2}{\\lambda_1+\\lambda_2}\\right)\\frac{L}{3}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <SecHd id="sec-motcom" label="II." title="Motion of Centre of Mass" />

    <ExBox key="ex-7" num="7" problem={"A 1000 kg car is at rest at a traffic signal. At the instant the light turns green, the car starts to move with a constant acceleration of 4 m/s². At the same instant, a 2000 kg truck travelling at a constant speed of 8 m/s, overtakes and passes the car. (a) How far is the centre of mass of the automobile-truck system from the traffic light at t = 3 s? (b) What is the speed of the centre of mass of the automobile-truck system then?"}>
      <SolHd />
      <P2>Let {"$m_1 = 1000$"} kg be the mass of car and {"$m_2 = 2000$"} kg be the mass of truck.</P2>
      <P2>Initial velocity of COM, {"$u_{\\mathrm{cm}} = \\dfrac{0+2000\\times 8}{1000+2000} = \\dfrac{16}{3}$"} m/s</P2>
      <P2>Acceleration of COM, {"$a_{\\mathrm{cm}} = \\dfrac{1000\\times 4+0}{1000+2000} = \\dfrac{4}{3}$"} m/s²</P2>
      <P2>(a) {"$s_{\\mathrm{cm}} = u_{\\mathrm{cm}}t + \\dfrac{1}{2}a_{\\mathrm{cm}}t^2 = \\dfrac{16}{3}\\times 3 + \\dfrac{1}{2}\\times\\dfrac{4}{3}\\times 3^3 = \\boxed{22\\text{ m}}$"}</P2>
      <P2>(b) {"$v_{\\mathrm{cm}} = u_{\\mathrm{cm}} + a_{\\mathrm{cm}}t = \\dfrac{16}{3} + \\dfrac{4}{3}\\times 3 = \\boxed{9{\\cdot}3\\text{ m/s}}$"}</P2>
    </ExBox>

    <ExBox key="ex-8" num="8" problem={"A 4 kg fish is swimming at 1 m/s to the right. It swallows a 1/8 kg fish swimming toward it at 3 m/s to the left. What is the velocity of the larger fish immediately after its meal?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_59AB51C28441CAAD9CED} caption="FIGURE 1.52" />
      <SolHd />
      <P2>If {"$v$"} is the velocity of larger fish immediately after its meal, then by momentum conservation, we have</P2>
      <MathD>{"$$4\\times 1 - \\frac{1}{8}\\times 3 = \\left(4+\\frac{1}{8}\\right)v$$"}</MathD>
      <MathD>{"$$\\boxed{v = \\dfrac{29}{33}\\text{ m/s}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-9" num="9" problem={"A diwali cracker of mass 60 g at rest, explodes into three pieces A, B and C of mass 10 g, 20 g and 30 g respectively. After explosion, velocities of A and B are 30 m/s along east and 20 m/s along north respectively. Find the instantaneous velocity of C."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_BC0CB397D312771ECFDC} caption="FIGURE 1.53" />
      <SolHd />
      <P2>Consider {"$X$"} and {"$Y$"} axes as shown in fig. 1.53.</P2>
      <P2>Here, {"$m_A = 0.01$"} kg, {"$m_B = 0.02$"} kg, {"$m_C = 0.03$"} kg</P2>
      <P2>{"$\\vec{v}_A = 30\\hat{i}$"} m/s, {"$\\vec{v}_B = 20\\hat{j}$"} m/s</P2>
      <P2>From momentum conservation, we have</P2>
      <MathD>{"$$\\begin{aligned} & m_A\\vec{v}_A + m_B\\vec{v}_B + m_C\\vec{v}_C = 0 \\\\ &\\Rightarrow\\; 0.01\\times 30\\hat{i} + 0.02\\times 20\\hat{j} + 0.03\\,\\vec{v}_C = 0 \\\\ &\\Rightarrow\\; \\vec{v}_C = \\left(-10\\hat{i} - \\frac{40}{3}\\hat{j}\\right)\\text{ m/s} \\\\ &\\Rightarrow\\; |\\vec{v}_C| = \\sqrt{10^2+(40/3)^2} = \\frac{50}{3}\\text{ m/s} \\end{aligned}$$"}</MathD>
      <P2>and {"$\\tan\\theta = \\dfrac{40/3}{10} = \\dfrac{4}{3}\\;\\Rightarrow\\;\\theta = 53°$"}</P2>
      <MathD>{"$$\\therefore\\quad \\vec{v}_C = \\frac{50}{3}\\text{ m/s},\\; 53°\\text{ south of west}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-10" num="10" problem={"A shell fired vertically up, when reaches its highest point, explodes into three fragments A, B and C of masses $m_A = 4$ kg, $m_B = 2$ kg and $m_C = 3$ kg. Immediately after the explosion, A is observed moving with velocity $v_A = 3$ m/s towards north and B with a velocity $v_B = 4.5$ m/s towards east as shown in the fig. 1.54. Find the velocity $v_C$ of the fragment C."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_4D6DF04278AD0097F3BA} caption="FIGURE 1.54" />
      <SolHd />
      <P2>Explosion takes negligible duration; therefore, impulse of gravity, which is a finite external force, can be neglected. Assume the east as positive {"$x$"}-direction and the north as positive {"$y$"}-direction.</P2>
      <P2>Before the explosion, momentum of the shell was zero, therefore from the principle of conservation of momentum, the total momentum of the fragments also remain zero, i.e.,</P2>
      <MathD>{"$$\\begin{aligned} & m_A\\vec{v}_A + m_B\\vec{v}_B + m_C\\vec{v}_C = 0 \\\\ &\\Rightarrow\\; 4\\times 3\\hat{j} + 2\\times 4{\\cdot}5\\hat{i} + 3\\,\\vec{v}_C = 0 \\\\ &\\therefore\\; \\vec{v}_C = (-3\\hat{i}-4\\hat{j})\\text{ ms}^{-1} \\end{aligned}$$"}</MathD>
      <P2>Its magnitude is 5 ms⁻¹ and direction is 53° south of west.</P2>
    </ExBox>

    <ExBox key="ex-11" num="11" problem={"A platform scale is calibrated to indicate the mass in kilograms of an object placed on it. Particles fall from a height of 5 m and collide with a platform of the scale. The collisions are elastic and the particles rebound upward with the same speed they had before hitting the pan. If each particle has a mass of 100 g and collisions occur at the rate of 40 s⁻¹, what is the average scale reading? (Take g = 10 ms⁻²)"}>
      <SolHd />
      <P2>Change in momentum of each particle,</P2>
      <MathD>{"$$\\Delta p = 2m\\sqrt{2gh}$$"}</MathD>
      <P2>Total change in momentum per second is the force exerted on the platform given by</P2>
      <MathD>{"$$F = n\\,\\Delta p$$"}</MathD>
      <P2>Therefore scale reading is</P2>
      <MathD>{"$$\\begin{aligned} \\frac{F}{g} &= \\frac{n\\,\\Delta p}{g} = \\frac{n}{g}\\times 2m\\sqrt{2gh} = 2mn\\sqrt{\\frac{2h}{g}} \\\\ &= 2\\times 0.1\\times 40\\times\\sqrt{\\frac{2\\times 5}{10}} = \\boxed{8\\text{ kg}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-12" num="12" problem={"Two blocks of masses $m_1$ and $m_2$ connected by a weightless spring of stiffness $k$ rest on a horizontal smooth plane. Block 2 is shifted a small distance $x$ to the left and then released. Find the velocity of the centre of mass of the system after block 1 breaks off the wall."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B256990AE34357135C70} caption="FIGURE 1.55" />
      <SolHd />
      <P2>Block 1 will break off the wall when it is pulled by the spring. For this to just happen, the spring must come in its natural length position.</P2>
      <P2>Applying conservation of mechanical energy between the initial compressed and this position, we have</P2>
      <MathD>{"$$\\frac{1}{2}kx^2 = \\frac{1}{2}m_2 v_2^2 \\qquad\\Rightarrow\\qquad v_2 = \\sqrt{\\frac{k}{m_2}}\\,x$$"}</MathD>
      <P2>Velocity of block 1 in this position, {"$v_1 = 0$"}</P2>
      <MathD>{"$$\\therefore\\quad v_{cm} = \\frac{m_1 v_1 + m_2 v_2}{m_1+m_2} = \\frac{x\\sqrt{km_2}}{m_1+m_2}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-13" num="13" problem={"Two ladders are hanging from ends of a light rope passing over a light and smooth pulley. A man of mass 2m hangs near the bottom of one ladder whose mass is M − 2m. Another man of mass m hangs near the bottom of the other ladder whose mass is M − m. The man of mass 2m moves up a distance l with respect to the ladder. The man of mass m moves up a distance l/2 with respect the ladder. Does the centre of mass of the system change, if so, then calculate its value."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_844204AD7E93F7802F7B} caption="FIGURE 1.56" />
      <SolHd />
      <P2>Distance moved up by man of mass {"$2m$"} is {"$l$"}</P2>
      <P2>Distance moved up by man of mass {"$m$"} is {"$l/2$"}</P2>
      <P2>So, COM moves up by</P2>
      <MathD>{"$$\\frac{2m\\cdot l + m\\cdot l/2}{2M} = \\frac{5ml}{4M}$$"}</MathD>
    </ExBox>

    <SecHd id="sec-lin" label="III." title="Conservation of Linear Momentum" />

    <ExBox key="ex-14" num="14" problem={"A 20 g bullet pierces through a plate of mass M₁ = 1 kg and then comes to rest inside a second plate of mass M₂ = 2.98 kg as shown in the fig. 1.57. It is found that two plates initially at rest, now move with equal velocities. Find the percentage loss in the initial velocity of the bullet when it is between M₁ and M₂. (Neglect any loss of material of the plates, due to the action of the bullet)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2E8E2C29D34134C3742F} caption="FIGURE 1.57" />
      <SolHd />
      <P2>For the first impact, we consider the system of bullet and first plate. Since no external forces act during impact, momentum conservation leads to</P2>
      <MathD>{"$$mu = M_1 v + mv' \\qquad\\Rightarrow\\; 0.02\\,u = v + 0.02\\,v' \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Similarly for the second impact, we have</P2>
      <MathD>{"$$mv' = (M_2+m)v \\qquad\\Rightarrow\\; 0.02\\,v' = 3v \\qquad\\text{...(2)}$$"}</MathD>
      <P2>On solving eqn. (1) and (2), we get {"$v' = \\dfrac{3u}{4}$"}</P2>
      <P2>Hence, the percentage loss {"$= \\dfrac{u-v'}{u}\\times 100 = \\boxed{25\\%}$"}</P2>
    </ExBox>

    <ExBox key="ex-15" num="15" problem={"A light spring of spring constant k is kept compressed between two blocks of masses m and M on a smooth horizontal surface. When released, the blocks acquire velocities in opposite directions. The spring loses contact with the blocks when it acquires natural length. If the spring was initially compressed through a distance x, find the final speeds of the two blocks."}>
      <SolHd />
      <P2>Since, surface is smooth, mechanical energy is conserved. Since, there is no net external force on the system, linear momentum of the system is also conserved. Therefore,</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_63A6AD46B03350951B6D} caption="FIGURE 1.58" />
      <MathD>{"$$\\frac{1}{2}kx^2 = \\frac{1}{2}mv_1^2 + \\frac{1}{2}Mv_2^2 \\qquad\\text{...(1)}$$"}</MathD>
      <MathD>{"$$0 = -mv_1 + Mv_2 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>Solving (1) and (2), we get</P2>
      <MathD>{"$$v_1 = \\left(\\frac{kM}{m(M+m)}\\right)^{1/2}x, \\qquad v_2 = \\left(\\frac{km}{M(M+m)}\\right)^{1/2}x$$"}</MathD>
    </ExBox>

    <ExBox key="ex-16" num="16" problem={"Two blocks of mass $m_1$ and $m_2$ are connected by a spring of spring constant k. The system is placed on a smooth horizontal surface and $m_2$ is given a velocity $v_0$ towards right. Initially, the spring is at its natural length. If $m_1 = m_2 = m$, find the maximum elongation of the spring."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_8F276C2A142392743CD7} caption="FIGURE 1.59" />
      <SolHd />
      <P2>Consider the system of block {"$m_1$"}, block {"$m_2$"} and spring. Since there is no external force along the horizontal direction, linear momentum will be conserved.</P2>
      <P2>The mechanical energy of the system will also be conserved because friction is absent.</P2>
      <P2>As long as {"$v_2 > v_1$"}, distance between {"$m_1$"} and {"$m_2$"} will increase. At the maximum elongation, {"$v_2 = v_1 = v$"}.</P2>
      <P2>Conserving mechanical energy and linear momentum, we get</P2>
      <MathD>{"$$\\begin{aligned} \\frac{1}{2}m_2 v_0^2 &= \\frac{1}{2}m_1 v^2 + \\frac{1}{2}m_2 v^2 + \\frac{1}{2}kx_0^2 \\qquad\\text{...(1)} \\\\ m_2 v_0 &= m_1 v + m_2 v \\qquad\\text{...(2)} \\end{aligned}$$"}</MathD>
      <P2>in which {"$x_0$"} is the maximum elongation of the spring.</P2>
      <P2>Setting {"$m_1 = m_2 = m$"} and solving eqns. (1) and (2), we get</P2>
      <MathD>{"$$x_0 = \\sqrt{\\frac{m}{2k}}\\,v_0$$"}</MathD>
    </ExBox>

    <GraspGripBox key="gg-1">
      <P2>The maximum and minimum distance between two bodies which are moving along a straight line occurs when their velocities become equal (both in magnitude and direction)</P2>
      <P2><strong>Proof.</strong> Let {"$x_1(t)$"} and {"$x_2(t)$"} be the coordinate of the two particles. Then, the distance between them is</P2>
      <P2>{"$x(t) = x_2(t) - x_1(t)$"}</P2>
      <P2>It is maximum or minimum when {"$\\dfrac{dx}{dt} = 0$"}</P2>
      <MathD>{"$$\\Rightarrow\\quad \\frac{dx_2}{dt} - \\frac{dx_1}{dt} = 0 \\qquad\\therefore\\; v_2 = v_1$$"}</MathD>
    </GraspGripBox>

    <ExBox key="ex-17" num="17" problem={"A block of mass M is placed on a smooth horizontal floor. The block has a massless rod of length l pivoted on it at point O. The rod has a point mass m attached to its end. The whole system is released from the position shown. Find the velocity of M when the rod becomes vertical."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_249DF026F08FF1DB1275} caption="FIGURE 1.60" />
      <SolHd />
      <P2>Since there is no external force in horizontal direction, velocity of COM in horizontal direction will be zero.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_BCF17054A43F23C9A27C} caption="FIGURE 1.61" />
      <MathD>{"$$\\Rightarrow\\quad MV = mv \\qquad\\text{...(1)}$$"}</MathD>
      <P2>From energy conservation,</P2>
      <MathD>{"$$mgl = \\frac{1}{2}MV^2 + \\frac{1}{2}mv^2 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From eqns (1) and (2), we have</P2>
      <MathD>{"$$mgl = \\frac{1}{2}MV^2 + \\frac{1}{2}m\\left(\\frac{MV}{m}\\right)^2 \\qquad\\therefore\\quad \\boxed{V = \\sqrt{\\frac{2Mgl}{M+m}}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-18" num="18" problem={"A long plank of mass M with a block of mass m placed on it, rests on a smooth horizontal surface. The block m is set in motion in the horizontal direction with velocity v. Due to friction between the plank and the block, the block slows down and moves in one piece with the plank. Find the work performed by frictional forces."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2847E4BB869201DE1B5C} caption="FIGURE 1.62" />
      <SolHd />
      <P2>We choose the block and the plank as our system. Since friction is absent between the plank and the horizontal surface, there is no external force in the horizontal direction. Hence, the linear momentum in the horizontal direction will be conserved. But since there is friction between the plank and block, mechanical energy of the system will not be conserved.</P2>
      <P2>Let the final velocity of the block and plank be {"$v'$"}.</P2>
      <P2>By conservation of linear momentum, we get</P2>
      <MathD>{"$$mv = (m+M)v' \\qquad\\Rightarrow\\; v' = \\frac{m}{M+m}\\,v$$"}</MathD>
      <P2>Also, {"$W_{\\text{friction}} = \\Delta\\mathrm{KE}$"}</P2>
      <MathD>{"$$\\therefore\\; W_{\\text{friction}} = \\frac{1}{2}(m+M)v'^2 - \\frac{1}{2}mv^2 = \\boxed{-\\frac{1}{2}\\frac{mM}{M+m}v^2}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-19" num="19" problem={"A block of mass m is pushed with a velocity $v_0$ along the surface of a plank of mass M. If the horizontal ground is smooth and the coefficient of kinetic friction between the block and plank is μ, find the minimum distance of relative sliding between the block and plank."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_46B573378607EC673F94} caption="FIGURE 1.63" />
      <SolHd />
      <P2>Let {"$v$"} be the velocity of system when sliding between {"$m$"} and {"$M$"} stops. Then by conservation of linear momentum</P2>
      <MathD>{"$$mv_0 + 0 = (m+M)v \\qquad\\Rightarrow\\; v = \\frac{mv_0}{m+M}$$"}</MathD>
      <P2>Let {"$x$"} be the relative sliding. By work energy theorem, Work done by friction = Change in K.E.</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; -\\mu mgx = \\frac{1}{2}(M+m)v^2 - \\frac{1}{2}mv_0^2 \\\\ &\\therefore\\; \\boxed{x = \\frac{Mv_0^2}{2\\mu g(M+m)}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <SecHd id="sec-imp" label="IV." title="Impulse" />

    <ExBox key="ex-20" num="20" problem={"A cricket ball of mass 150 g collides with a bat with velocity 20 m/s and returns with velocity 30 m/s. If the time of contact with the bat is 0.01 sec, find the average force with which the bat hits the ball?"}>
      <SolHd />
      <P2>Impulse = change in momentum = force × time</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; (0{\\cdot}15\\times 30) - (-0{\\cdot}15\\times 20) = F_{\\text{average}}\\times 0{\\cdot}01 \\\\ &\\therefore\\; \\boxed{F_{\\text{average}} = 750\\text{ N}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-21" num="21" problem={"A bullet is fired from a gun. The force on the bullet is given by F = 800 − 4 × 10⁵t where F is in N and t in sec. The force on bullet becomes zero as soon as it leaves barrel. What is impulse imparted to bullet?"}>
      <SolHd />
      <P2>{"$F = 800 - 4\\times 10^5 t$"}</P2>
      <P2>Force becomes zero at {"$t_0 = \\dfrac{800}{4\\times 10^5} = 2\\times 10^{-3}$"} sec</P2>
      <P2>Impulse imparted to bullet</P2>
      <MathD>{"$$\\begin{aligned} &= \\int_0^{t_0} F\\,dt = \\int_0^{t_0}(800 - 4\\times 10^5 t)\\,dt = 800t_0 - 2\\times 10^5 t_0^2 \\\\ &= 800\\times 2\\times 10^{-3} - 2\\times 10^5\\times(2\\times 10^{-3})^2 = \\boxed{0{\\cdot}8\\text{ Ns}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-22" num="22" problem={"Two particles of a masses 2m and m are tied to an inextensible string. The particle of mass m is given a speed v as shown in fig. 1.64. Find the speed with which the particles start moving after the string becomes taut."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_19436EA0895275F4E5B9} caption="FIGURE 1.64" />
      <SolHd />
      <P2>After the string becomes taut, both particles will have the same speed say {"$v_1$"}.</P2>
      <P2>The impulse provided by the string on both the particles will be equal and opposite and given by</P2>
      <P2>{"$J = 2mv_1$"} on the particle of mass {"$2m$"} towards right and</P2>
      <P2>{"$J = m(v - v_1)$"} on the particle of mass {"$m$"} towards left.</P2>
      <P2>Thus, we have {"$2mv_1 = m(v-v_1)$"}</P2>
      <MathD>{"$$\\therefore\\quad \\boxed{v_1 = \\frac{v}{3}}$$"}</MathD>
    </ExBox>

    <SecHd id="sec-col1d" label="V." title="Collisions in One Dimension" />

    <ExBox key="ex-23" num="23" problem={"A bullet of mass 20 g travelling horizontally with a speed of 500 m/s passes through a wooden block of mass 10 kg initially at rest on a level surface. The bullet emerges with a speed of 100 m/s and the block slides 20 cm on the surface before coming to rest. Find the coefficient of friction between the block and the surface. (Take g = 10 ms⁻²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_BEB7784EEE972BF7AD48} caption="FIGURE 1.65" />
      <SolHd />
      <P2>If {"$v$"} is the velocity of block just after the bullet emerges out, then by momentum conservation,</P2>
      <MathD>{"$$0{\\cdot}02\\times 500 + 0 = 0{\\cdot}02\\times 100 + 10v \\qquad\\Rightarrow\\quad v = 0{\\cdot}8\\text{ m/s}$$"}</MathD>
      <P2>Acceleration of block, {"$a = -\\mu g = -10\\mu$"}</P2>
      <P2>From {"$0^2 - v^2 = 2as$"}, we have</P2>
      <MathD>{"$$0^2 - (0{\\cdot}8)^2 = 2(-10\\mu)\\times 0{\\cdot}2 \\qquad\\therefore\\quad \\boxed{\\mu = 0{\\cdot}16}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-24" num="24" problem={"A body of mass 500 g is suspended from the ceiling by a massless, inextensible and flexible string. A bullet of mass 10 g moving with velocity 300 m/s strikes the body horizontally and comes out horizontally with 200 m/s. Find the height to which the body will rise. (Take g = 10 m/s²)"}>
      <SolHd />
      <P2>Let {"$v$"} = velocity acquired by the body after the bullet strikes.</P2>
      <P2>Conserving momentum before and after bullet strikes, we have {"$mu_1 + 0 = mv_1 + Mv$"}</P2>
      <P2>{"$\\Rightarrow\\; m(u_1 - v_1) = Mv = M\\sqrt{2gh}$"}</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D53D8A64EA5978BD9608} caption="FIGURE 1.66" />
      <MathD>{"$$\\begin{aligned} \\therefore\\quad h &= \\frac{1}{2g}\\left[\\frac{m(u_1-v_1)}{M}\\right]^2 \\\\ &= \\frac{1}{2\\times 10}\\left[\\frac{0.01(300-200)}{0.5}\\right]^2 = \\boxed{0{\\cdot}2\\text{ m}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-25" num="25" problem={"Two particles of mass m and 2m moving in opposite directions collide elastically with velocities v and 2v. Find their velocities after collision."}>
      <SolHd />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A6F1FB72A2BF766B197E} caption="FIGURE 1.67" />
      <P2>Let the velocity after collision be {"$v_1$"} and {"$v_2$"} as shown in fig. 1.67. Applying cons. of momentum, we have</P2>
      <P2>{"$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$"}</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; mv + 2m(-2v) = mv_1 + 2mv_2 \\\\ &\\Rightarrow\\; v_1 + 2v_2 = -3v \\qquad\\text{...(1)} \\end{aligned}$$"}</MathD>
      <P2>Since, the collision is elastic, {"$e = 1$"}</P2>
      <MathD>{"$$\\Rightarrow\\; v_2 - v_1 = u_1 - u_2 = v - (-2v) = 3v \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2), we get {"$\\boxed{v_1 = -3v}$"} and {"$\\boxed{v_2 = 0}$"}</P2>
      <P2>Therefore, particle of mass m rebounds back with velocity {"$3v$"} and the particle of mass 2m comes to rest after collision.</P2>
    </ExBox>

    <ExBox key="ex-26" num="26" problem={"A ball is moving with velocity 2 m/s toward a heavy wall moving towards the ball with speed 1 m/s as shown in fig. 1.68. Assuming collision to be elastic, find the velocity of ball immediately after the collision."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_26AF0C645186E0F10840} caption="" />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5D753F4D2E6D830E6E28} caption="FIGURE 1.68" />
      <SolHd />
      <P2>Here, {"$u_1 = 2$"} m/s, {"$u_2 = -1$"} m/s, {"$e = 1$"}</P2>
      <P2>Since, the wall is heavy, its speed will not change.</P2>
      <P2>{"$\\Rightarrow\\; v_2 = u_2 = -1$"} m/s</P2>
      <P2>Now, {"$v_2 - v_1 = e(u_1 - u_2)$"}</P2>
      <MathD>{"$$\\Rightarrow\\; (-1) - v_1 = 1\\times[2-(-1)] \\qquad\\Rightarrow\\quad v_1 = -4\\text{ m/s}$$"}</MathD>
      <P2>Therefore, the ball rebounds back with the speed of 4 m/s.</P2>
    </ExBox>

    <ExBox key="ex-27" num="27" problem={"Two masses m and 2m are placed in fixed horizontal circular smooth hollow tube of radius r as shown. The mass m is moving with speed u and the mass 2m is stationary. After their first collision, find the time elapsed for next collision. (coefficient of restitution e = 1/2)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_92B5BE3C6066D99D58D5} caption="FIGURE 1.69" />
      <SolHd />
      <P2>The relative velocity of approach before collision is {"$u$"}</P2>
      <P2>The relative velocity of separation after collision is {"$eu = u/2$"}</P2>
      <P2>Therefore, the time elapsed between first and second collision is</P2>
      <MathD>{"$$t = \\frac{2\\pi r}{u/2} = \\frac{4\\pi r}{u}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-28" num="28" problem={"Two identical blocks each of mass M = 9 kg are placed on a rough horizontal surface of frictional coefficient μ = 0·1. The two blocks are joined by a light spring and block B is in contact with a vertical fixed wall as shown in fig. 1.70. A bullet of mass m = 1 kg and v₀ = 10 m/s hits block A and gets embedded in it. Find the maximum compression of spring. (Spring constant = 240 N/m, g = 10 m/s²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_35DEDD2E086D4AA7C3C7} caption="FIGURE 1.70" />
      <SolHd />
      <P2>If {"$v$"} is the velocity of block after the bullet gets embedded in it, then we have</P2>
      <MathD>{"$$\\begin{aligned} & mv_0 + 0 = (M+m)v \\\\ \\Rightarrow\\quad & v = \\frac{mv_0}{M+m} = \\frac{1\\times 10}{9+1} = 1\\text{ m/s} \\end{aligned}$$"}</MathD>
      <P2>At the time of maximum compression ({"$x$"}) of spring, the velocity of blocks is zero. Applying work energy theorem, we have</P2>
      <MathD>{"$$\\begin{aligned} & W_{\\text{friction}} = \\Delta U_{\\text{spring}} + \\Delta K \\\\ \\Rightarrow\\;& -\\mu(M+m)gx = \\frac{1}{2}kx^2 - \\frac{1}{2}(M+m)v^2 \\\\ \\Rightarrow\\;& -0{\\cdot}1(9+1)\\times 10\\,x = \\frac{1}{2}\\times 240\\,x^2 - \\frac{1}{2}(9+1)\\times 1^2 \\\\ \\Rightarrow\\;& 24x^2 + 2x - 1 = 0 \\qquad\\therefore\\quad x = \\boxed{\\tfrac{1}{6}\\text{ m}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-29" num="29" problem={"A block of mass 340 g moving on a frictionless surface at an initial speed of 1.2 m/s strikes a second block of unknown mass at rest. The collision between the blocks is elastic. After the collision, the first block continues to move in original direction with a speed of 0.66 m/s. What is the mass of the second block and what is its speed after the impact?"}>
      <SolHd />
      <P2>Here {"$m_1 = 0.34$"} kg, {"$u_1 = 1.2$"} m/s, {"$u_2 = 0$"}, {"$v_1 = 0.66$"} m/s, {"$e = 1$"}</P2>
      <P2>From momentum conservation, we have</P2>
      <MathD>{"$$\\begin{aligned} & m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2 \\\\ \\Rightarrow\\;& 0.34\\times 1.2 + 0 = 0.34\\times 0.66 + m_2 v_2 \\\\ \\Rightarrow\\;& m_2 v_2 = 0.1836 \\qquad\\text{...(1)} \\end{aligned}$$"}</MathD>
      <MathD>{"$$v_2 - v_1 = e(u_1 - u_2) \\Rightarrow v_2 - 0.66 = 1\\times(1.2 - 0) \\qquad\\therefore\\; v_2 = 1.86\\text{ m/s}$$"}</MathD>
      <P2>On substituting {"$v_2$"} in eqn. (1), we get {"$m_2 = 0.099$"} kg {"$= 99$"} g</P2>
    </ExBox>

    <ExBox key="ex-30" num="30" problem={"A ball of mass 2 kg dropped from a height H above a horizontal surface rebounds to a height h after one bounce. The graph that relates H to h is shown in fig. 1.71. If the ball was dropped from an initial height of 81 m, find the kinetic energy of the ball immediately after the second impact with the surface. (Take g = 10 ms⁻²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_8BECF2B397564D6E65CA} caption="FIGURE 1.71" />
      <SolHd />
      <P2>We know that {"$h = He^2$"}</P2>
      <P2>From graph,</P2>
      <MathD>{"$$e = \\sqrt{\\frac{h}{H}} = \\sqrt{\\frac{40}{90}} = \\frac{2}{3}$$"}</MathD>
      <P2>Height attained after second impact is</P2>
      <MathD>{"$$h_2 = He^4 = 81\\times(2/3)^4 = 16\\text{ m}$$"}</MathD>
      <P2>Therefore, kinetic energy of the ball just after second bounce is</P2>
      <MathD>{"$$mgh_2 = 2\\times 10\\times 16 = \\boxed{320\\text{ J}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-31" num="31" problem={"A ball moving vertically downward with a speed of 10 m/s collides with a heavy platform. The platform moves with a velocity of 5 m/s in downward direction. If e = 0·8, find the speed of the ball just after collision."}>
      <SolHd />
      <P2>Here, {"$u_1 = 10$"} m/s, {"$u_2 = 5$"} m/s.</P2>
      <P2>Since, the platform is heavy, its velocity remains same.</P2>
      <MathD>{"$$\\Rightarrow\\; v_2 = 5\\text{ m/s}$$"}</MathD>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_53C6C476975BA564F85D} caption="FIGURE 1.72" />
      <P2>By definition of {"$e$"}, {"$v_2 - v_1 = e(u_1 - u_2)$"}</P2>
      <MathD>{"$$\\Rightarrow\\; 5 + v = 0{\\cdot}8(10-5) \\qquad\\Rightarrow\\; v = -1\\text{ m/s}$$"}</MathD>
      <P2>Therefore, the speed of the ball just after collision is 1 m/s in the downward direction.</P2>
    </ExBox>

    <ExBox key="ex-32" num="32" problem={"In fig. 1.73, a series of n identical balls lie on a smooth horizontal surface. If number 1 moves horizontally with speed v and collides into number 2 which in turn collides with number 3, etc. and if the coefficient of restitution for each impact is e, determine the speed of the nth ball."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_005F2ACC230AC5052766} caption="FIGURE 1.73" />
      <SolHd />
      <P2>Consider the collision between ball no. 1 and ball no. 2. From momentum conservation,</P2>
      <MathD>{"$$mv + 0 = mv_1 + mv_2 \\qquad\\Rightarrow\\; v_1 + v_2 = v \\qquad\\text{...(1)}$$"}</MathD>
      <MathD>{"$$v_2 - v_1 = e(v-0) \\qquad\\Rightarrow\\; v_2 - v_1 = ev \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2), we have {"$v_2 = \\dfrac{1+e}{2}\\,v$"}</P2>
      <P2>Similarly, velocity of ball no. 3 after collision,</P2>
      <MathD>{"$$v_3 = \\frac{1+e}{2}\\,v_2 = \\left(\\frac{1+e}{2}\\right)^2 v$$"}</MathD>
      <P2>Calculating in similar manner, the velocity of {"$n$"}th ball,</P2>
      <MathD>{"$$\\boxed{v_n = \\left(\\frac{1+e}{2}\\right)^{n-1} v}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-33" num="33" problem={"A ball of mass m moving at a speed v makes a head on collision with an identical ball at rest. The kinetic energy of the balls after the collision is 3/4th of the original. Find the coefficient of restitution."}>
      <SolHd />
      <P2>Here, {"$u_1 = v$"} and {"$u_2 = 0$"}</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_01A32567228536EB5D3F} caption="FIGURE 1.74" />
      <P2>Using the equations {"$mu_1 + mu_2 = mv_1 + mv_2$"} and {"$v_2 - v_1 = e(u_1-u_2)$"}, we have</P2>
      <MathD>{"$$v_1 + v_2 = v \\qquad\\text{and}\\qquad v_2 - v_1 = ev$$"}</MathD>
      <P2>On solving, we get</P2>
      <MathD>{"$$v_1 = \\frac{1-e}{2}\\,v \\qquad\\text{and}\\qquad v_2 = \\frac{1+e}{2}\\,v$$"}</MathD>
      <P2>Now, {"$K_f = \\dfrac{3}{4}K_i$"}</P2>
      <MathD>{"$$\\Rightarrow\\; \\frac{1}{2}mv_1^2 + \\frac{1}{2}mv_2^2 = \\frac{3}{4}\\left(\\frac{1}{2}mv^2\\right) \\qquad\\Rightarrow\\; \\left(\\frac{1-e}{2}\\right)^2 + \\left(\\frac{1+e}{2}\\right)^2 = \\frac{3}{4}$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; 2(1+e^2) = 3 \\qquad\\therefore\\quad \\boxed{e = 1/\\sqrt{2}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-34" num="34" problem={"The friction coefficient between the horizontal surface and each of the blocks shown in the fig. 1.75 is 0·2. The collision between the blocks is elastic. Find the separation between them when they come to rest. (Take g = 10 m/s²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6BEF2C620BB4B1D79F82} caption="FIGURE 1.75" />
      <SolHd />
      <P2>Here, {"$m_1 = 2$"} kg, {"$m_2 = 4$"} kg, {"$e = 1$"}, {"$u_2 = 0$"}</P2>
      <P2>The acceleration of the blocks on the rough surface,</P2>
      <P2>{"$a = -\\mu g = -0{\\cdot}2\\times 10 = -2$"} m/s²</P2>
      <P2>The block of mass 2 kg moves by 0·16 m before colliding. Its velocity before collision is given by</P2>
      <MathD>{"$$u_1^2 - 1^2 = 2(-2)\\times 0.16 \\qquad\\Rightarrow\\; u_1 = 0.6\\text{ m/s}$$"}</MathD>
      <P2>Using the equations, {"$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$"} and {"$v_2 - v_1 = e(u_1-u_2)$"}, we have</P2>
      <MathD>{"$$2\\times 0{\\cdot}6 + 0 = 2v_1 + 4v_2 \\qquad\\text{and}\\qquad v_2 - v_1 = 1\\times(0{\\cdot}6-0)$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; v_1 + 2v_2 = 0.6 \\qquad\\text{and}\\qquad v_2 - v_1 = 0.6$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; v_1 = -0.2\\text{ m/s} \\qquad\\text{and}\\qquad v_2 = 0.4\\text{ m/s}$$"}</MathD>
      <P2>The distance moved by the blocks after collision before coming to rest are</P2>
      <MathD>{"$$s_1 = \\frac{0.2^2}{2\\times 2} = 0.01\\text{ m} \\qquad\\text{and}\\qquad s_2 = \\frac{0.4^2}{2\\times 2} = 0.04\\text{ m}$$"}</MathD>
      <P2>Therefore, separation between the blocks when they come to rest,</P2>
      <MathD>{"$$s = s_1 + s_2 = 0.05\\text{ m} = \\boxed{5\\text{ cm}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-35" num="35" problem={"The 60 g bullet is fired at the two blocks resting on a surface where the coefficient of kinetic friction is 0.50. The bullet passes through the 8 kg block and lodges in the 6 kg block. The blocks slide the distances shown. Compute the initial velocity v of the bullet. (Take g = 10 ms⁻²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_8639D45A6AD2E2476C79} caption="FIGURE 1.76" />
      <SolHd />
      <P2>Acceleration of blocks on the rough surface,</P2>
      <MathD>{"$$a = -\\mu g = -0{\\cdot}5\\times 10 = -5\\text{ m/s}^2$$"}</MathD>
      <P2>Block of 8 kg moves a distance of {"$s_1 = 0.8$"} m. Its velocity after collision is</P2>
      <MathD>{"$$v_1 = \\sqrt{-2as_1} = \\sqrt{2\\times 5\\times 0{\\cdot}8} = 2\\sqrt{2}\\text{ m/s}$$"}</MathD>
      <P2>Block of 6 kg moves a distance of {"$s_2 = 1.2$"} m. Its velocity after collision is</P2>
      <MathD>{"$$v_2 = \\sqrt{-2as_2} = \\sqrt{2\\times 5\\times 1{\\cdot}2} = 2\\sqrt{3}\\text{ m/s}$$"}</MathD>
      <P2>By momentum conservation for the system,</P2>
      <MathD>{"$$\\begin{aligned} & 0.06\\,v = 8v_1 + (6+0.06)v_2 \\\\ &\\Rightarrow\\; v = \\frac{800}{6}\\times 2\\sqrt{2} + \\frac{606}{6}\\times 2\\sqrt{3} \\\\ &\\therefore\\; v = \\boxed{727\\text{ m/s}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-36" num="36" problem={"A block of mass 2 kg moving at 2 m/s collides head on with another block of equal mass kept at rest. (a) Find the maximum possible loss in kinetic energy due to the collision. (b) If the actual loss in kinetic energy is half of this maximum, find the coefficient of restitution."}>
      <SolHd />
      <P2>(a) Maximum loss of KE will occur when the collision is perfectly inelastic. In this case, the final velocity {"$v$"} is given by momentum conservation. So,</P2>
      <P2>{"$2\\times 2 + 0 = (2+2)v$"} or {"$v = 1$"} m/s.</P2>
      <P2>Loss in KE = KE{"$_{\\text{initial}}$"} − KE{"$_{\\text{final}}$"}</P2>
      <MathD>{"$$= \\frac{1}{2}\\times 2\\times 2^2 - \\frac{1}{2}\\times(2+2)\\times 1^2 = \\boxed{2\\text{ J}}$$"}</MathD>
      <P2>(b) Here, KE{"$_{\\text{initial}}$"} = 4 J, KE{"$_{\\text{loss}}$"} = 1 J</P2>
      <P2>{"$\\therefore$"} KE{"$_{\\text{final}}$"} = 3 J</P2>
      <P2>If {"$v_1$"} and {"$v_2$"} are the velocites after collision of the two masses, then we have</P2>
      <P2>{"$2\\times 2 + 0 = 2v_1 + 2v_2$"} or {"$v_1 + v_2 = 2$"} ...(1)</P2>
      <P2>Also, {"$v_2 - v_1 = e(2-0)$"} or {"$v_2 - v_1 = 2e$"} ...(2)</P2>
      <MathD>{"$$\\text{KE}_{\\text{final}} = \\frac{1}{2}\\times 2\\times v_1^2 + \\frac{1}{2}\\times 2\\times v_2^2 = 3 \\qquad\\Rightarrow\\; v_1^2+v_2^2 = 3 \\qquad\\text{...(3)}$$"}</MathD>
      <P2>From (1) and (2), {"$v_1 = 1-e$"} and {"$v_2 = 1+e$"}</P2>
      <P2>Putting this in (3), we get</P2>
      <MathD>{"$$(1-e)^2 + (1+e)^2 = 3 \\qquad\\therefore\\quad \\boxed{e = 1/\\sqrt{2}}$$"}</MathD>
    </ExBox>

    <ExBox key="ex-37" num="37" problem={"A simple pendulum is suspended from a peg on a vertical wall. The pendulum is pulled away from the wall to a horizontal position and released. The ball hits the wall, the coefficient of restitution being e = 2⁻¹/⁸. What is the minimum number of collisions n after which the amplitude of oscillation becomes less than or equal to 60°?"}>
      <SolHd />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_83A1C90FA085D76BA7AA} caption="FIGURE 1.77" />
      <P2>From energy conservation, the velocity of ball when it hits the wall for the first time, {"$v_0 = \\sqrt{2gl}$"}</P2>
      <P2>Velocity of ball after first and {"$n^{\\text{th}}$"} collision are respectively,</P2>
      <MathD>{"$$v_n = e^n v_1 = ev_0, \\quad\\text{and}\\quad v_0 = 2^{-n/8}\\sqrt{2gl}$$"}</MathD>
      <P2>To have an amplitude of 60°, the velocity {"$(v_C)$"} of ball at point {"$C$"} is given by</P2>
      <MathD>{"$$\\frac{1}{2}mv_C^2 = mgl(1-\\cos 60^\\circ) \\qquad\\text{or}\\qquad v_C = \\sqrt{gl}$$"}</MathD>
      <P2>Now, {"$v_n \\leq v_C$"}</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; 2^{-n/8}\\sqrt{2gl} \\leq \\sqrt{gl} \\qquad\\text{or}\\qquad 2^{(1/2-n/8)} \\leq 2^0 \\\\ &\\Rightarrow\\; \\frac{1}{2} - \\frac{n}{8} \\leq 0 \\qquad\\therefore\\quad n \\geq 4 \\end{aligned}$$"}</MathD>
      <P2>The minimum number of collisions is <strong>4</strong>.</P2>
    </ExBox>

    <ExBox key="ex-38" num="38" problem={"A ball of mass M = 0·2 kg rests on a vertical pillar of height 5 m. A bullet of mass m = 0.01 kg travelling horizontally with a velocity of 500 m/s passes through the centre of the ball and hits the ground at a distance 20 m from the pillar. At what horizontal distance does the bullet hit the ground? (Take g = 10 ms⁻²)"}>
      <SolHd />
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2F226F3796407A9291D6} caption="FIGURE 1.78" />
      <P2>Let {"$v_1$"} and {"$v_2$"} be the velocities of mass {"$M$"} and bullet respectively after the bullet passes through {"$M$"}.</P2>
      <MathD>{"$$R_1 = v_1\\sqrt{\\frac{2h}{g}} \\qquad\\Rightarrow\\; 20 = v_1\\sqrt{\\frac{2\\times 5}{10}} \\qquad\\Rightarrow\\; v_1 = 20\\text{ m/s}$$"}</MathD>
      <P2>From momentum conservation, we have</P2>
      <MathD>{"$$\\begin{aligned} & mu = Mv_1 + mv_2 \\\\ &\\Rightarrow\\; 0.01\\times 500 = 0.2\\times 20 + 0.01\\,v_2 \\\\ &\\Rightarrow\\; v_2 = 100\\text{ m/s} \\\\ &\\therefore\\; R_2 = v_2\\sqrt{\\frac{2h}{g}} = 100\\sqrt{\\frac{2\\times 5}{10}} = \\boxed{100\\text{ m}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <SecHd id="sec-col2d" label="VI." title="Collisions in Two Dimension" />

    <ExBox key="ex-39" num="39" problem={"A small ball is thrown between two vertical walls such that in the absence of the wall, its range would have been 5d. The angle of projection is α. Given that all the collisions are perfectly elastic, find the (a) maximum height attained by the ball (b) total number of collisions before the ball comes back to the ground, and (c) point at which the ball falls finally. The walls are very tall."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2C6842B0DAFF872E14A1} caption="FIGURE 1.79" />
      <SolHd />
      <P2>(a) In the absence of wall, Range, {"$R = 5d$"}</P2>
      <MathD>{"$$\\Rightarrow\\quad 5d = \\frac{u^2\\sin 2\\alpha}{g} \\qquad\\text{...(1)}$$"}</MathD>
      <P2>There will be no change in the vertical component of velocity due to collision. So maximum height attained by the ball will be same as in the absence of walls.</P2>
      <MathD>{"$$\\Rightarrow\\quad H_{\\max} = \\frac{u^2\\sin^2\\alpha}{2g} \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2), {"$\\dfrac{H_{\\max}}{5d} = \\dfrac{\\tan\\alpha}{4}$"}</P2>
      <MathD>{"$$\\therefore\\quad H_{\\max} = \\frac{5d}{4}\\tan\\alpha$$"}</MathD>
      <P2>(b) Since, the collision is elastic, there also will be no change in horizontal component of velocity</P2>
      <P2>Therefore, number of collisions {"$= \\dfrac{5d}{d/2} - 1 = \\boxed{9}$"}</P2>
      <P2>(c) The ball will finally reach point {"$O$"} from where it was projected.</P2>
    </ExBox>

    <ExBox key="ex-40" num="40" problem={"Fig. 1.80 shows the results of a collision of two objects of unequal masses. (a) Find the speed v₂ of the larger mass after the collision and the angle θ₂. (b) Show that this collision is perfectly elastic."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6D9716CEEBE8C617F0A4} caption="FIGURE 1.80" />
      <SolHd />
      <P2>(a) Conserving momentum along horizontal and vertical directions, we have</P2>
      <P2>{"$m(3v_0)+0 = m\\sqrt{5}v_0\\cos\\theta_1 + 2mv_2\\cos\\theta_2$"}</P2>
      <P2>and {"$0 = m\\sqrt{5}v_0\\sin\\theta_1 - 2mv_2\\sin\\theta_2$"}</P2>
      <P2>Since, {"$\\tan\\theta_1 = 2$"}, we have</P2>
      <MathD>{"$$\\cos\\theta_1 = 1/\\sqrt{5} \\qquad\\text{and}\\qquad \\sin\\theta_1 = 2/\\sqrt{5}$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\quad v_2\\cos\\theta_2 = v_0 \\qquad\\text{and}\\qquad v_2\\sin\\theta_2 = v_0$$"}</MathD>
      <P2>On solving, we get {"$\\boxed{v_2 = \\sqrt{2}\\,v_0}$"} and {"$\\theta_2 = 45°$"}</P2>
      <P2>(b) Initial K.E., {"$K_i = \\dfrac{1}{2}m(3v_0)^2 = \\dfrac{9}{2}mv_0^2$"}</P2>
      <P2>Final K.E.,</P2>
      <MathD>{"$$K_f = \\frac{1}{2}m(\\sqrt{5}\\,v_0)^2 + \\frac{1}{2}(2m)(\\sqrt{2}\\,v_0)^2 = \\frac{9}{2}mv_0^2$$"}</MathD>
      <P2>Since, {"$K_i = K_f$"}, the collision is perfectly elastic.</P2>
    </ExBox>

    <ExBox key="ex-41" num="41" problem={"A particle of mass m having collided with a stationary particle of mass M deviated by an angle π/2 whereas particle M moves at an angle θ = 30° to the direction of initial motion of particle m. How much and in what way has the kinetic energy changed after the collision if M = 5m."}>
      <SolHd />
      <P2>From conservation of momentum in {"$X$"} and {"$Y$"} direction, we have</P2>
      <P2>{"$mu = Mv_2\\cos 30°$"} and {"$0 = mv_1 - Mv_2\\sin 30°$"}</P2>
      <P2>On solving these eqns., we get {"$v_1 = \\dfrac{u}{\\sqrt{3}}$"} and {"$v_2 = \\dfrac{2u}{5\\sqrt{3}}$"}</P2>
      <P2>Initial K.E., {"$K_1 = \\dfrac{1}{2}mu^2$"}</P2>
      <P2>Final K.E., {"$K_2 = \\dfrac{1}{2}mv_1^2 + \\dfrac{1}{2}Mv_2^2$"}</P2>
      <MathD>{"$$= \\frac{m}{2}\\times\\frac{u^2}{3} + \\frac{5m}{2}\\times\\frac{4u^2}{75} = \\frac{1}{2}mu^2\\times\\frac{3}{5}$$"}</MathD>
      <P2>The percentage loss in K.E. is {"$\\dfrac{K_1-K_2}{K_1}\\times 100 = \\boxed{40\\%}$"}</P2>
    </ExBox>

    <ExBox key="ex-42" num="42" problem={"Particle 1 experiences a perfectly elastic collision with a stationary particle 2. Determine their mass ratio, if (a) after a head-on collision, the particles fly apart in the opposite directions with equal velocities (b) the particles fly apart symmetrically relative to the initial direction of motion of particle 1 with the angle of divergence θ = 60°."}>
      <SolHd />
      <P2>(a)</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_AF7C57A9C4F581E27589} caption="FIGURE 1.81 (Before Collision → After Collision)" />
      <P2>From momentum conservation,</P2>
      <MathD>{"$$m_1 u_1 = m_1(-x) + m_2 x \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Since collision is elastic, {"$v_2 - v_1 = u_1 - u_2$"}</P2>
      <MathD>{"$$\\Rightarrow\\; x - (-x) = u_1 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2), {"$m_1 u_1 = (m_2-m_1)\\dfrac{u_1}{2}$"}</P2>
      <MathD>{"$$\\therefore\\quad \\frac{m_1}{m_2} = \\frac{1}{3}$$"}</MathD>
      <P2>(b) From momentum conservation, we have</P2>
      <P2>{"$m_1 u_1 = m_1 v_1\\cos 30° + m_2 v_2\\cos 30°$"}</P2>
      <P2>and {"$0 = m_1 v_1\\sin 30° - m_2 v_2\\sin 30°$"}</P2>
      <MathD>{"$$\\Rightarrow\\quad v_1 = \\frac{u_1}{\\sqrt{3}} \\qquad\\text{and}\\qquad v_2 = \\frac{m_1 u_1}{m_2\\sqrt{3}}$$"}</MathD>
      <P2>From KE conservation, we have</P2>
      <MathD>{"$$\\frac{1}{2}m_1 u_1^2 = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; m_1 u_1^2 = m_1\\left(\\frac{u_1}{\\sqrt{3}}\\right)^2 + m_2\\left(\\frac{m_1}{m_2}\\cdot\\frac{u_1}{\\sqrt{3}}\\right)^2 \\qquad\\therefore\\quad \\frac{m_1}{m_2} = 2$$"}</MathD>
    </ExBox>

    <ExBox key="ex-43" num="43" problem={"A particle of mass m₁ experienced a perfectly elastic collision with a stationary particle of mass m₂. What fraction of the kinetic energy does the striking particle lose, if (a) the collision is head on (b) it recoils at right angles to its original direction of motion"}>
      <SolHd />
      <P2>(a) From momentum conservation,</P2>
      <MathD>{"$$m_1 u_1 + 0 = m_1 v_1 + m_2 v_2 \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Since collision is elastic,</P2>
      <MathD>{"$$v_2 - v_1 = u_1 - 0 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2), {"$(m_1+m_2)v_1 = (m_1-m_2)u_1$"}</P2>
      <P2>Fraction of KE lost by striking particle,</P2>
      <MathD>{"$$\\eta = \\frac{\\frac{1}{2}m_1 u_1^2 - \\frac{1}{2}m_1 v_1^2}{\\frac{1}{2}m_1 u_1^2} = 1 - \\left(\\frac{v_1}{u_1}\\right)^2 = 1 - \\left(\\frac{m_1-m_2}{m_1+m_2}\\right)^2 = \\frac{4m_1 m_2}{(m_1+m_2)^2}$$"}</MathD>
      <P2>(b) From momentum conservation,</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_09673FE7368C99E32D2D} caption="FIGURE 1.83" />
      <P2>{"$v_1 = u_1\\tan\\theta$"} and {"$v_2 = \\dfrac{m_1}{m_2}u_1\\sec\\theta$"}</P2>
      <P2>From conservation of KE, we have</P2>
      <MathD>{"$$\\begin{aligned} & \\frac{1}{2}m_1 u_1^2 = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 \\\\ &\\Rightarrow\\; m_2(1-\\tan^2\\theta) = m_1(1+\\tan^2\\theta) \\\\ &\\Rightarrow\\; \\tan^2\\theta = \\frac{m_2-m_1}{m_1+m_2} \\\\ &\\therefore\\; \\eta = 1 - \\left(\\frac{v_1}{u_1}\\right)^2 = 1 - \\tan^2\\theta = \\frac{2m_1}{m_1+m_2} \\end{aligned}$$"}</MathD>
    </ExBox>
  </>
);

// ─── EXPORT ───
export default function PhysicsChapter1AppBoosterL1() {
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
        <AppBoosterHeader />
        {allContent}
      </div>
    </div>
  );
}
