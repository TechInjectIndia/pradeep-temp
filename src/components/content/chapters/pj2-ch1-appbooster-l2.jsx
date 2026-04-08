"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useEffect } from "react";

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
    st.textContent = `.katex { font-size: 1.031em; } .katex-display { font-size: 1em; } .katex .mathnormal, .katex .mathit { font-family: 'Times New Roman', Times, serif !important; }`;
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
      fontSize: "16.5px", lineHeight: 2.2,
      fontFamily: "'Times New Roman', Times, serif",
      overflowX: "auto", overflowY: "hidden",
      maxWidth: "100%", WebkitOverflowScrolling: "touch",
    }}>
      {children}
    </div>
  );
}

function AppBoosterHeader() {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        background: "linear-gradient(135deg, #3a1a5a 0%, #6b0a3e 50%, #9b2060 100%)",
        padding: "22px 32px 18px", borderRadius: "4px 4px 0 0", textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'Merriweather Sans',Arial,sans-serif",
          fontWeight: 900, fontSize: 28, color: "#fff",
          letterSpacing: 1, textTransform: "uppercase", lineHeight: 1.2,
        }}>
          Application Booster <span style={{ color: "#ffd700" }}>—</span> Level 2
        </div>
        <div style={{
          fontFamily: "'Lora',serif", fontSize: 19, color: "#f0d8e8",
          marginTop: 8, letterSpacing: 0.5, fontStyle: "italic", fontWeight: 700,
        }}>
          [Challenging Solved Examples]
        </div>
      </div>
      <div style={{ height: 4, background: "linear-gradient(90deg,#6b0a3e,#c0408a,#6b0a3e)" }} />
    </div>
  );
}

const allContent = (
  <>
    <ExBox key="l2-ex-1" num="1" problem={"Two blocks of masses m₁ and m₂ are connected by a massless, inextensible, cord that is passed over a massless pulley A. The blocks slide along the smooth sides of a right angled wedge of mass m, which rests on a smooth horizontal plane. Find the distance covered by the wedge on the horizontal plane till the mass m₁ is lowered by the vertical distance h."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_9BA6FB244A1C1585AA00} caption="FIGURE 1.84" />
      <SolHd />
      <P2>In the frame of wedge, let {"$s$"} be the distance through which the blocks slide on the wedge. Then,</P2>
      <MathD>{"$$s = h/\\sin\\alpha$$"}</MathD>
      <P2>Let the motion of {"$m_1$"} be down the incline and that of {"$m_2$"} be up the incline. If the wedge slides by horizontal distance {"$x$"} towards right, then the horizontal distances through which the blocks {"$m_1$"} and {"$m_2$"} slide in the ground frame towards right are respectively</P2>
      <MathD>{"$$\\begin{aligned} & x_1 = x - s\\cos\\alpha = x - h\\cot\\alpha \\\\ & x_2 = x - s\\cos(90°-\\alpha) = x - h \\end{aligned}$$"}</MathD>
      <P2>Since no external force acts on the system in horizontal direction and the system was initially at rest, the centre of mass does not move in the horizontal direction. So,</P2>
      <MathD>{"$$\\begin{aligned} & \\sum m_i x_i = 0 \\\\ &\\Rightarrow\\; mx + m_1 x_1 + m_2 x_2 = 0 \\\\ &\\Rightarrow\\; mx + m_1(x - h\\cot\\alpha) + m_2(x - h) = 0 \\\\ &\\therefore\\; \\boxed{x = \\frac{m_1 h\\cot\\alpha + m_2 h}{m + m_1 + m_2}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-2" num="2" problem={"Two trucks of mass M each are moving in opposite directions on adjacent parallel tracks with same speed u. One is carrying potatoes and other is carrying onions. A bag of potatoes has a mass m₁ and a bag of onions has a mass m₂ (included in the mass of truck M). When trucks get close to each other while passing, the drivers exchange a bag with the other one by throwing one bag into the other truck. Find the final speeds of the trucks after exchange of the bags."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7FF1F1EE8DBB61C078D6} caption="FIGURE 1.85" />
      <SolHd />
      <P2>After the exchange of bags, let {"$v_1$"} be the speed of truck initially carrying potatoes but now carrying onions. Let {"$v_2$"} be the speed of other truck after the exchange of bags. The truck initially carrying potatoes has momentum {"$(M-m_1)u$"} after the bag of potatoes is thrown. It shall receive the bag of onions having momentum {"$m_2 u$"} in the opposite direction.</P2>
      <P2>By conservation of linear momentum,</P2>
      <MathD>{"$$\\begin{aligned} & (M-m_1)u - m_2 u = (M-m_1+m_2)v_1 \\\\ &\\therefore\\; v_1 = \\frac{(M-m_2-m_1)u}{M-m_1+m_2} \\end{aligned}$$"}</MathD>
      <P2>Similarly, {"$v_2 = \\dfrac{(M-m_1-m_2)u}{M-m_2+m_1}$"}</P2>
    </ExBox>

    <ExBox key="l2-ex-3" num="3" problem={"A rope thrown over a pulley has a ladder with a man A on one of its ends and a counter balancing mass M on its other end. The man whose mass is m, climbs upwards by Δr relative to the ladder and then stops. Ignoring the masses of the pulley and the rope, and ignoring friction in the pulley axis, find the displacement of the centre of mass of this system."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_863970D37A6C17731972} caption="FIGURE 1.86" />
      <SolHd />
      <P2>Let the displacement of mass {"$M$"} be {"$\\Delta x$"} downwards with respect to ground. Then the displacement with respect to ground of ladder is {"$\\Delta x$"} upwards and that of man is {"$\\Delta x + \\Delta r$"} upwards. The displacement of the centre of mass of the system is</P2>
      <MathD>{"$$\\frac{m(\\Delta x + \\Delta r) + (M-m)\\Delta x - M\\Delta x}{m + (M-m) + M} = \\frac{m\\,\\Delta r}{2M}\\text{ upwards}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-4" num="4" problem={"A body mass M with a small block of mass m placed on it rests on a smooth horizontal plane. The block is set in motion in the horizontal direction with velocity v. (a) Find the maximum height reached by the block relative to the initial position. (b) The maximum velocity attained by body M. The friction is assumed to be absent."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1FABAC1ABD74EC49F052} caption="FIGURE 1.87" />
      <SolHd />
      <P2>Consider the system of body {"$M$"} and block {"$m$"}. External forces act only along the vertical direction. Therefore, momentum along the horizontal direction is conserved.</P2>
      <P2>Since frictional forces are absent, mechanical energy of the system will also be conserved.</P2>
      <P2>(a) At the highest point, vertical velocity of the block is zero, while horizontal velocity of the block will be equal to the velocity of {"$M$"}. Let it be {"$V$"}.</P2>
      <P2>From conservation laws we have</P2>
      <MathD>{"$$\\begin{aligned} mv &= (M+m)V \\qquad\\text{...(1)} \\\\ \\frac{1}{2}mv^2 &= \\frac{1}{2}(M+m)V^2 + mgh \\qquad\\text{...(2)} \\end{aligned}$$"}</MathD>
      <P2>On solving eqns. (1) and (2), we get</P2>
      <MathD>{"$$\\boxed{h = \\frac{Mv^2}{2g(M+m)}}$$"}</MathD>
      <P2>(b) Let {"$N$"} be the normal reaction between {"$m$"} and {"$M$"}. As long as {"$N$"} has a component along the horizontal direction, the velocity of {"$M$"} will continue to increase. Therefore, the velocity of {"$M$"} will be maximum when block {"$m$"} comes back to the horizontal surface.</P2>
      <P2>Let {"$v'$"} and {"$V_{\\max}$"} be the velocities of {"$m$"} and {"$M$"} respectively at this instant. From conservation laws, we obtain</P2>
      <MathD>{"$$mv = mv' + MV_{\\max} \\qquad\\text{and}\\qquad \\frac{1}{2}mv^2 = \\frac{1}{2}mv'^2 + \\frac{1}{2}MV_{\\max}^2$$"}</MathD>
      <P2>On solving, we get {"$\\boxed{V_{\\max} = \\dfrac{2m}{M+m}\\,v}$"}</P2>
    </ExBox>

    <ExBox key="l2-ex-5" num="5" problem={"Two blocks each of mass m, connected by a weightless spring of stiffness k and length L₀ lie on a horizontal surface. A constant force F starts acting on one of the block. Find the maximum and the minimum distance between the blocks during the subsequent motion of the system."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_34EB9185F7D7500A3C34} caption="FIGURE 1.88" />
      <SolHd />
      <P2>Consider the system of two blocks and the spring. Force {"$F$"} is external to the system. Therefore, neither mechanical energy nor linear momentum will be conserved. Distance between the two blocks will be maximum and minimum when they have the same velocity. Let it be {"$v$"}.</P2>
      <P2>Let {"$d$"} = distance moved by the right block and {"$x_0$"} = elongation of the spring when the separation between the blocks is maximum. Consequently, distance moved by the centre of mass will be {"$\\left(d-\\dfrac{x_0}{2}\\right)$"}.</P2>
      <P2>The acceleration {"$a_{\\mathrm{cm}}$"} of the centre of mass will be constant and is given by {"$a_{\\mathrm{cm}} = \\dfrac{F}{2m}$"}</P2>
      <P2>From eqn. of constant acceleration, {"$v^2-u^2 = 2as$"}, we have</P2>
      <MathD>{"$$v^2 = 2\\left(\\frac{F}{2m}\\right)\\left(d - \\frac{x_0}{2}\\right) \\qquad\\text{...(1)}$$"}</MathD>
      <P2>and from work-energy theorem, we have</P2>
      <MathD>{"$$\\Delta KE + \\Delta PE = W_F \\qquad\\Rightarrow\\; \\frac{1}{2}mv^2 + \\frac{1}{2}mv^2 + \\frac{1}{2}kx_0^2 = Fd \\qquad\\text{...(2)}$$"}</MathD>
      <P2>Substituting the value of {"$v^2$"} from eqn. (1) in eqn. (2), we get</P2>
      <MathD>{"$$F\\left(d - \\frac{x_0}{2}\\right) + \\frac{1}{2}kx_0^2 = Fd \\qquad\\Rightarrow\\; -Fx_0 + kx_0^2 = 0$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; x_0(kx_0 - F) = 0 \\qquad\\Rightarrow\\; x_0 = 0\\text{ or }F/k$$"}</MathD>
      <P2>So, the maximum and minimum distances between the blocks are respectively {"$L_0 + F/k$"} and {"$L_0$"}.</P2>
      <GraspGripBox key="gg-l2-5">
        <P2>Wherever a constant force acts on the system, the acceleration of centre of mass is constant. In such a case, it is convenient to solve problem in the centre of mass frame after suitably applying pseudo forces.</P2>
        <P2>Here, the acceleration of centre of mass is {"$a_{\\mathrm{cm}} = F/2m$"} towards right. Therefore, pseudo forces equal to {"$ma_{\\mathrm{cm}}$"} will act on the blocks towards left as shown in figure 1.89.</P2>
        <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F73F4C8BC1575E699339} caption="FIGURE 1.89" />
        <P2>As the centre of mass is at rest in this frame, the blocks move in the opposite directions and come to instantaneous rest at the same time. The extension or compression of the spring is maximum at this instant.</P2>
        <P2>Let {"$x_1$"} = distance moved by left block towards left in centre of mass frame; {"$x_2$"} = distance moved by right block towards right in centre of mass frame. Then, the maximum extension in spring, {"$x_0 = x_1 + x_2$"}.</P2>
        <P2>The net external force in COM frame on the left block is {"$F_1 = ma_{\\mathrm{cm}} = \\dfrac{F}{2}$"} towards left and on the right block is {"$F_2 = F - ma_{\\mathrm{cm}} = \\dfrac{F}{2}$"} towards right.</P2>
        <P2>Applying work energy theorem in COM frame,</P2>
        <MathD>{"$$F_1 x_1 + F_2 x_2 = 0 + \\frac{1}{2}kx_0^2 \\qquad\\Rightarrow\\; \\frac{F}{2}(x_1+x_2) = \\frac{1}{2}kx_0^2$$"}</MathD>
        <MathD>{"$$\\Rightarrow\\; Fx_0 - kx_0^2 = 0 \\qquad\\text{or}\\qquad x_0(F-kx_0) = 0$$"}</MathD>
        <P2>Hence, {"$x_0 = 0$"} or {"$x_0 = F/k$"}. Here {"$x_0 = F/k$"} is the maximum extension and {"$x_0 = 0$"} is the maximum compression.</P2>
      </GraspGripBox>
    </ExBox>

    <ExBox key="l2-ex-6" num="6" problem={"Two blocks each of mass m, connected by an unstretched spring are kept at rest on a frictionless horizontal surface. A constant force F is applied on one of the blocks pulling it away from the other. (a) Find acceleration of the mass center. (b) Find the displacement of the centre of mass as function of time t. (c) If the extension of the spring is x₀ at an instant t, find the displacements of the two blocks relative to the ground at this instant."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A8FA2377677B57C16E25} caption="FIGURE 1.90" />
      <SolHd />
      <P2>(a) If {"$M$"} is the total mass of the system, then</P2>
      <MathD>{"$$M = 2m \\qquad\\text{and}\\qquad Ma_{cm} = \\sum F_i = F \\qquad\\therefore\\; a_{cm} = \\frac{F}{2m}\\text{ towards right}$$"}</MathD>
      <P2>(b) The center of mass moves with constant acceleration, therefore its displacement in time {"$t$"} is given by</P2>
      <MathD>{"$$x_{cm} = u_{cm}t + \\frac{1}{2}a_{cm}t^2 = 0 + \\frac{1}{2}\\left(\\frac{F}{2m}\\right)t^2 = \\frac{Ft^2}{4m} \\qquad\\text{...(1)}$$"}</MathD>
      <P2>(c) Positions {"$x_A$"} and {"$x_B$"} of particles {"$A$"} and {"$B$"} and position {"$x_{cm}$"} of center of mass are related as</P2>
      <MathD>{"$$2mx_{cm} = mx_A + mx_B \\qquad\\Rightarrow\\; x_{cm} = \\frac{x_A + x_B}{2} \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2),</P2>
      <MathD>{"$$x_A + x_B = \\frac{Ft^2}{2m} \\qquad\\text{...(3)}$$"}</MathD>
      <P2>Extension in the spring at this instant is</P2>
      <MathD>{"$$x_B - x_A = x_0 \\qquad\\text{...(4)}$$"}</MathD>
      <P2>From (3) and (4), we have</P2>
      <MathD>{"$$x_A = \\frac{1}{2}\\left(\\frac{Ft^2}{2m} - x_0\\right) \\qquad\\text{and}\\qquad x_B = \\frac{1}{2}\\left(\\frac{Ft^2}{2m} + x_0\\right)$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-7" num="7" problem={"Two particles A and B of equal masses m are tied with an inextensible string of length 2l. The initial distance between A and B is l. Particle A is given speed v as shown. Find the speed of particles A and B just after the string becomes taut."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_27A4349BF1EA0F75D0C0} caption="FIGURE 1.91" />
      <SolHd />
      <P2>Fig. 1.92 shows the velocities just before string becomes taut. Here, {"$\\sin\\theta = \\dfrac{l}{2l} = \\dfrac{1}{2}$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1BD35A116374052CB643} caption="FIGURE 1.92" />
      <P2>Now, string will apply impulse only along the string. Just after the string becomes taut,</P2>
      <ul style={{ margin: "0 0 8px 20px", lineHeight: 1.8 }}>
        <li>the component of velocity along the string of both particles is same. Let it be {"$v_1$"}.</li>
        <li>the component of velocity perpendicular to the string do not change i.e., the velocity of particle {"$A$"} remains {"$v\\sin\\theta$"} and of particle {"$B$"} remains zero.</li>
      </ul>
      <P2>The impulse provided by the string on both particles is same and is equal to</P2>
      <P2>{"$J = m(v\\cos\\theta - v_1)$"} on particle {"$A$"} and {"$J = mv_1$"} on particle {"$B$"}.</P2>
      <P2>Thus, {"$m(v\\cos\\theta - v_1) = mv_1$"} {"$\\therefore\\; v_1 = \\dfrac{v\\cos\\theta}{2}$"}</P2>
      <P2>Therefore, speed of the particles {"$A$"} and {"$B$"} are respectively</P2>
      <MathD>{"$$v_A = \\sqrt{(v\\sin\\theta)^2 + \\left(\\frac{v\\cos\\theta}{2}\\right)^2} = \\frac{v}{2}\\sqrt{1+3\\sin^2\\theta} = \\frac{\\sqrt{7}}{4}\\,v$$"}</MathD>
      <P2>and {"$v_B = \\dfrac{v\\cos\\theta}{2} = \\dfrac{\\sqrt{3}}{4}\\,v$"}</P2>
    </ExBox>

    <ExBox key="l2-ex-8" num="8" problem={"Two small discs of masses m₁ and m₂ are connected by a massless spring resting on a smooth horizontal plane. The discs are set in motion with initial velocities v₁ and v₂, whose directions are mutually perpendicular and in the same horizontal plane. Find the total energy E after time t of the system with reference to the frame fixed to the centre of mass, if the spring is initially in its natural length."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CB4BEC3774CC13B7687B} caption="FIGURE 1.93" />
      <SolHd />
      <P2>Let {"$x$"} and {"$y$"} axes be in the direction shown in the fig. 1.94. Let {"$K_{SG}$"}, {"$U_{SG}$"} and {"$E_{SG}$"} be the kinetic energy, potential energy and total energy respectively in ground frame. Let {"$K$"}, {"$U$"} and {"$E$"} be the kinetic energy, potential energy and total energy respectively in the frame of centre of mass. Let {"$K_{CM}$"} be the kinetic energy of centre of mass. Then,</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_1694D192BEE438FF335B} caption="FIGURE 1.94" />
      <MathD>{"$$\\begin{aligned} & K_{SG} = K_{CM} + K \\qquad\\text{and}\\qquad U_{SG} = U \\\\ &\\Rightarrow\\; K_{SG} + U_{SG} = K_{CM} + K + U \\\\ &\\Rightarrow\\; E_{SG} = K_{CM} + E \\qquad\\text{...(1)} \\end{aligned}$$"}</MathD>
      <P2>{"$E_{SG}$"} is constant through out and is equal to its initial value.</P2>
      <MathD>{"$$\\Rightarrow\\quad E_{SG} = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>Since, there is no external force, {"$v_{CM}$"} is also constant through out and is equal to its initial value.</P2>
      <MathD>{"$$\\begin{aligned} \\Rightarrow\\; \\vec{v}_{CM} &= \\frac{m_1 v_1\\hat{i} + m_2 v_2\\hat{j}}{m_1+m_2} \\\\ \\Rightarrow\\; K_{CM} &= \\frac{(m_1 v_1)^2 + (m_2 v_2)^2}{2(m_1+m_2)} \\qquad\\text{...(3)} \\end{aligned}$$"}</MathD>
      <P2>From (1), (2) and (3),</P2>
      <MathD>{"$$E = E_{SG} - K_{CM} = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 - \\frac{(m_1 v_1)^2 + (m_2 v_2)^2}{2(m_1+m_2)} = \\boxed{\\frac{m_1 m_2(v_1^2+v_2^2)}{2(m_1+m_2)}}$$"}</MathD>
      <P2>Its value is independent of time.</P2>
    </ExBox>

    <ExBox key="l2-ex-9" num="9" problem={"A sphere of mass m slides with velocity v on a frictionless surface towards a smooth inclined wall as shown in fig. 1.95. If the collision with the wall is elastic, find (a) the impulse imparted by the wall on the sphere, (b) the impulse imparted by the floor on the sphere."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_27D29132D40811278563} caption="FIGURE 1.95" />
      <SolHd />
      <P2>Since collision is elastic, kinetic energy is conserved. Hence, after collision, ball will move towards right with same speed {"$v$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_198AF312602DEF9A15C0} caption="FIGURE 1.96" />
      <P2>Along vertical, {"$J_2 = J_1\\cos\\theta$"}</P2>
      <P2>Along horizontal, {"$J_1\\sin\\theta = mv - (-mv)$"}</P2>
      <P2>On solving, we get</P2>
      <MathD>{"$$\\boxed{J_1 = 2mv\\operatorname{cosec}\\theta} \\qquad\\text{and}\\qquad \\boxed{J_2 = 2mv\\cot\\theta}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-10" num="10" problem={"Two particles A and B of mass 1 kg and 2 kg respectively are projected in the directions shown in fig. 1.97 with speeds uₐ = 200 m/s and uB = 50 m/s. Initially they were 90 m apart. Find the maximum height attained by the centre of mass of the particles. Assume acceleration due to gravity to be constant. (g = 10 m/s²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_558C5A64187D1ABAA443} caption="FIGURE 1.97" />
      <SolHd />
      <P2>Taking the ground as origin and {"$X$"}-axis along the upward direction, we have</P2>
      <MathD>{"$$\\begin{gathered} m_A = 1\\text{ kg},\\; m_B = 2\\text{ kg},\\; u_A = 200\\text{ m/s},\\; u_B = -50\\text{ m/s} \\\\ x_A = 0,\\; x_B = 90\\text{ m},\\; a_A = -10\\text{ m/s}^2,\\; a_B = -10\\text{ m/s}^2 \\end{gathered}$$"}</MathD>
      <MathD>{"$$\\begin{aligned} u_{\\mathrm{cm}} &= \\frac{m_A u_A + m_B u_B}{m_A + m_B} = \\frac{1\\times 200 - 2\\times 50}{1+2} = \\frac{100}{3}\\text{ m/s} \\\\ x_{\\mathrm{cm}} &= \\frac{m_A x_A + m_B x_B}{m_A + m_B} = \\frac{1\\times 0 + 2\\times 90}{1+2} = 60\\text{ m} \\\\ a_{\\mathrm{cm}} &= \\frac{m_A a_A + m_B a_B}{m_A + m_B} = -10\\text{ m/s}^2 \\end{aligned}$$"}</MathD>
      <P2>At the highest point of COM, {"$v_{\\mathrm{cm}} = 0$"}</P2>
      <P2>Now, {"$v_{\\mathrm{cm}}^2 - u_{\\mathrm{cm}}^2 = 2a_{\\mathrm{cm}} s_{\\mathrm{cm}}$"}</P2>
      <MathD>{"$$\\Rightarrow\\; 0^2 - \\left(\\frac{100}{3}\\right)^2 = 2(-10)s_{\\mathrm{cm}} \\qquad\\Rightarrow\\; s_{\\mathrm{cm}} = 55.6\\text{ m}$$"}</MathD>
      <P2>Therefore, the maximum height attained by the COM of the particles</P2>
      <MathD>{"$$= x_{\\mathrm{cm}} + s_{\\mathrm{cm}} = 60 + 55{\\cdot}6\\text{ m} = \\boxed{115{\\cdot}6\\text{ m}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-11" num="11" problem={"Two men each of mass m stand on the edge of a stationary cart of mass M. Assuming the friction to be negligible, find the velocity of the cart after both men jump off the left end with velocity v_rel relative to the cart. (a) simultaneously. (b) one after the other."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_9C1467B75B256712A547} caption="FIGURE 1.98" />
      <SolHd />
      <P2>When a man jumps off the cart, he pushes the cart with a certain force and cart pushes the man in the opposite direction with same force. Taking the system of man and the cart, linear momentum of the system along the horizontal direction will be conserved because these forces are internal forces.</P2>
      <P2>(a) Let {"$v$"} be the velocity of the cart after both the men jump off the cart simultaneously. Conserving momentum, we find</P2>
      <MathD>{"$$0 = Mv + 2m(v - v_{\\text{rel}}) \\qquad\\therefore\\quad \\boxed{v = \\frac{2m}{M+2m}\\,v_{\\text{rel}}}$$"}</MathD>
      <P2>(b) Let {"$v_1$"} and {"$v_2$"} be the velocities of the cart after the jumping of the first and the second man respectively. Conserving linear momentum in each case, we get</P2>
      <P2>After the first jump: {"$0 = (M+m)v_1 + m(v_1 - v_{\\text{rel}})$"}</P2>
      <P2>After the second jump: {"$(M+m)v_1 = Mv_2 + m(v_2 - v_{\\text{rel}})$"}</P2>
      <P2>On solving the two eqns., we get</P2>
      <MathD>{"$$\\boxed{v_2 = \\frac{m(2M+3m)}{(M+m)(M+2m)}\\,v_{\\text{rel}}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-12" num="12" problem={"A block of mass m is projected with velocity v as shown in fig. 1.99. The ground is smooth but there is friction between A and B. If collision is elastic (a) Find the final common velocity of A and B. (b) Find total energy dissipated in friction. Assume that A does not fall off B."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B526CC3ECF53A58D613E} caption="FIGURE 1.99" />
      <SolHd />
      <P2>The frictional forces will not provide any impulse. If {"$v_1$"} and {"$v_2$"} are the velocities of block of mass {"$m$"} and {"$2m$"} respectively, then by conservation of momentum, we have</P2>
      <P2>{"$mv + 0 = mv_1 + 2mv_2$"} {"$\\Rightarrow\\; v_1 + 2v_2 = v$"}</P2>
      <P2>Since, the collision is elastic, {"$e = 1$"} {"$\\Rightarrow\\; v_2 - v_1 = v$"}</P2>
      <P2>On solving, we get {"$v_2 = 2v/3$"}</P2>
      <P2>(a) If {"$v_3$"} is the common velocity of {"$A$"} and {"$B$"}, then by momentum conservation, we have</P2>
      <MathD>{"$$2mv_2 + 0 = (2m+m)v_3 \\qquad\\therefore\\quad \\boxed{v_3 = \\frac{2v_2}{3} = \\frac{4v}{9}}$$"}</MathD>
      <P2>(b) The total energy dissipated in friction = loss of Kinetic Energy</P2>
      <MathD>{"$$= \\frac{1}{2}\\cdot 2m\\,v_2^2 - \\frac{1}{2}(2m+m)v_3^2 = \\frac{1}{2}\\cdot 2m\\left(\\frac{2v}{3}\\right)^2 - \\frac{1}{2}\\cdot 3m\\left(\\frac{4v}{9}\\right)^2 = \\boxed{\\frac{4}{27}mv^2}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-13" num="13" problem={"A bullet of mass m moving with velocity u strikes a fixed wooden plate and penetrates through a distance d₀. Find the distance it will pierce through if the plate was free to move and if its mass is M."}>
      <SolHd />
      <P2>The resistance force {"$F_R$"} between the bullet and the plate is a non-conservative force and therefore, mechanical energy is lost if it pierces through the plate.</P2>
      <P2>When the plate is fixed, we have from work-energy theorem,</P2>
      <MathD>{"$$\\left(0 - \\frac{1}{2}mu^2\\right) = -F_R d_0 \\qquad\\Rightarrow\\; F_R = \\frac{mu^2}{2d_0} \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Let {"$x$"} = distance moved by plate; {"$d$"} = distance pierced by bullet in the plate; {"$v$"} = final velocity of plate and bullet.</P2>
      <P2>Then, the distance moved by the bullet is {"$x + d$"}.</P2>
      <P2>From the work-energy theorem, we have</P2>
      <MathD>{"$$\\Delta KE + \\Delta PE = \\text{Work done by internal non-conservative force on the system}$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; \\frac{1}{2}(m+M)v^2 - \\frac{1}{2}mu^2 = F_R x - F_R(x+d) \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From momentum conservation,</P2>
      <MathD>{"$$mu = (M+m)v \\qquad\\text{...(3)}$$"}</MathD>
      <P2>On solving eqns. (1), (2) and (3), we get</P2>
      <MathD>{"$$\\boxed{d = \\frac{Md_0}{M+m}}$$"}</MathD>
    </ExBox>


    <ExBox key="l2-ex-14" num="14" problem={"A projectile of mass 20 kg is fired at an angle of 45° with the horizontal with a velocity of 20√2 m/s. At the highest point of the trajectory, it explodes into two equal fragments, one of which moves vertically downwards with a velocity of 5 m/s. (Take g = 10 m/s²) (a) How much energy is released during explosion? (b) How far from the point of projection, does the other fragment strike if the ground is level?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_40D6225907A856D54658} caption="FIGURE 1.100" />
      <SolHd />
      <P2>At the highest point, the velocity of the projectile is in the horizontal direction and is equal to</P2>
      <P2>{"$u\\cos\\alpha = 20\\sqrt{2}\\cos 45° = 20$"} m/s</P2>
      <P2>During explosion, the momentum of the system in the horizontal and vertical direction will be conserved. Let {"$\\vec{v_2}$"} = velocity of second fragment after explosion.</P2>
      <P2>Then, {"$mu\\cos\\alpha\\,\\hat{i} = \\dfrac{m}{2}\\vec{v_2} + \\dfrac{m}{2}v_1(-\\hat{j})$"}</P2>
      <MathD>{"$$\\Rightarrow\\; 20\\times 20\\hat{i} = 10\\vec{v_2} - 10\\times 5\\hat{j} \\qquad\\Rightarrow\\; \\vec{v_2} = 40\\hat{i} + 5\\hat{j}$$"}</MathD>
      <P2>(a) Energy released during explosion</P2>
      <MathD>{"$$\\begin{aligned} &= \\left[\\frac{1}{2}\\times\\frac{m}{2}\\times v_1^2 + \\frac{1}{2}\\times m_2\\times v_2^2\\right] - \\frac{1}{2}\\times m\\times(u\\cos\\alpha)^2 \\\\ &= \\left[\\frac{1}{2}\\times 10\\times 5^2 + \\frac{1}{2}\\times 10\\times(40^2+5^2)\\right] - \\frac{1}{2}\\times 20\\times 20^2 = \\boxed{4250\\text{ J}} \\end{aligned}$$"}</MathD>
      <P2>(b) The explosion occurs at a height {"$H$"} given by</P2>
      <MathD>{"$$H = \\frac{u^2\\sin^2\\alpha}{2g} = \\frac{20^2}{2\\times 10} = 20\\text{ m}$$"}</MathD>
      <P2>So, the vertical displacement of the second fragment after explosion is {"$-20$"} m</P2>
      <MathD>{"$$\\Rightarrow\\; -20 = v_{2y}t - \\frac{1}{2}gt^2 \\Rightarrow\\; 5t^2 - 5t - 20 = 0 \\qquad\\therefore\\; t \\approx 2{\\cdot}6\\text{ sec}$$"}</MathD>
      <P2>The horizontal displacement will be</P2>
      <P2>{"$R' = v_{2x}\\times t = 40\\times 2{\\cdot}6 = 104$"} m</P2>
      <P2>The horizontal distance from point of projection is</P2>
      <MathD>{"$$\\frac{R}{2} + R' = \\frac{u^2\\sin 2\\alpha}{2g} + R' = \\frac{(20\\sqrt{2})^2\\sin 90°}{2\\times 10} + 104 = \\boxed{144\\text{ m}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-15" num="15" problem={"An object of mass M is projected with a velocity 30 m/s at an angle of 37° to the horizontal. At the highest point of its path, the object explodes into two pieces of masses M/4 and 3M/4 which separate horizontally after explosion. In the process of explosion, the kinetic energy gets doubled. Calculate the separation between the pieces when they reach the ground. (Take g = 10 ms⁻²)"}>
      <SolHd />
      <P2>Velocity of mass {"$M$"} at highest point is</P2>
      <MathD>{"$$v = u\\cos\\theta = 30\\times\\cos 37° = 24\\text{ m/s}$$"}</MathD>
      <P2>Time taken to reach highest point is</P2>
      <MathD>{"$$t = \\frac{u\\sin\\theta}{g} = \\frac{30\\times\\sin 37°}{10} = 1.8\\text{ sec}$$"}</MathD>
      <P2>Let the velocity of masses {"$M/4$"} and {"$3M/4$"} be {"$v_1$"} and {"$v_2$"} respectively. From momentum conservation,</P2>
      <MathD>{"$$Mv = \\frac{M}{4}v_1 + \\frac{3M}{4}v_2 \\qquad\\Rightarrow\\; v_1 + 3v_2 = 4v = 96$$"}</MathD>
      <P2>KE gets doubled in explosion.</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; \\frac{1}{2}\\left(\\frac{M}{4}\\right)v_1^2 + \\frac{1}{2}\\left(\\frac{3M}{4}\\right)v_2^2 = 2\\times\\frac{1}{2}Mv^2 \\\\ &\\Rightarrow\\; v_1^2 + 3v_2^2 = 8v^2 = 8\\times 24^2 \\\\ &\\Rightarrow\\; v_2 = 24\\pm 8\\sqrt{3}, \\qquad v_1 = 24\\mp 24\\sqrt{3} \\\\ &\\Rightarrow\\; |v_1 - v_2| = 32\\sqrt{3}\\text{ m/s} \\end{aligned}$$"}</MathD>
      <P2>The separation between them when they reach the ground is</P2>
      <MathD>{"$$d = |v_1-v_2|\\,t = 32\\sqrt{3}\\times 1{\\cdot}8 = \\boxed{100\\text{ m}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-16" num="16" problem={"A block of mass m rests on a wedge of mass M which, in turn rests on a horizontal table. All surfaces are smooth. If the system starts at rest with the block at the top point of the wedge (a) find the velocity of the wedge the instant it touches the ground. (b) the linear displacement of the wedge during this time."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_BE387035CE349DA63A84} caption="FIGURE 1.101" />
      <SolHd />
      <P2>Consider the system of block {"$m$"} and the wedge. There is no external force along the horizontal direction. Therefore, the linear momentum along the horizontal direction should be conserved. As the friction is absent, work done by internal force is zero, and hence mechanical energy of the system is also conserved.</P2>
      <P2>(a) Let {"$u$"} be the final velocity of the block with respect to wedge and {"$V$"} be the final velocity of wedge with respect to ground, towards left. Then in vector form,</P2>
      <MathD>{"$$\\vec{u} = u\\cos\\alpha\\,\\hat{i} - u\\sin\\alpha\\,\\hat{j} \\qquad\\text{and}\\qquad \\vec{V} = -V\\hat{i}$$"}</MathD>
      <P2>The velocity {"$\\vec{v}$"} of the block with respect to ground is {"$\\vec{v} = (u\\cos\\alpha - V)\\hat{i} - u\\sin\\alpha\\,\\hat{j}$"}</P2>
      <P2>Conserving momentum (along {"$X$"}-direction) and mechanical energy, we have</P2>
      <MathD>{"$$0 = m(u\\cos\\alpha - V) - MV \\qquad\\Rightarrow\\; u = \\left(\\frac{M+m}{m\\cos\\alpha}\\right)V$$"}</MathD>
      <P2>Substituting and solving, we get</P2>
      <MathD>{"$$V = \\left[\\frac{2m^2 gh\\cos^2\\alpha}{(M+m)(M+m\\sin^2\\alpha)}\\right]^{1/2}$$"}</MathD>
      <P2>(b) The {"$x$"}-coordinate of the centre of mass will not change. Let {"$X$"} be the displacement of wedge towards left and {"$x$"} be the displacement of block towards right. Then,</P2>
      <P2>{"$MX = mx$"} and {"$X + x = h\\cot\\alpha$"}</P2>
      <MathD>{"$$\\text{On solving, we get}\\quad X = \\frac{mh\\cot\\alpha}{M+m}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-17" num="17" problem={"A wedge of mass M = 3m and having a vertical slot in it is placed on a horizontal surface. Two blocks each of mass m are arranged as shown in fig. 1.102. The system is released from rest. All surface are smooth. Calculate the speed of the wedge when block 1 comes down a distance h."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5715A925C057A5B48E9A} caption="FIGURE 1.102" />
      <SolHd />
      <P2>Let {"$u$"} be the vertical velocity of block 1 when it comes down a distance {"$h$"}. Let {"$v$"} be the velocity of wedge towards right at this instant. Then, the velocity of block 2 is {"$v - u$"} towards right and of block 1 is {"$v$"} towards right. Since, there is no external force on the system in horizontal direction, momentum in the horizontal direction is conserved.</P2>
      <MathD>{"$$\\Rightarrow\\; (3m)v + mv + m(v-u) = 0 \\qquad\\Rightarrow\\; u = 5v$$"}</MathD>
      <P2>Since, all surfaces are smooth, mechanical energy is conserved. So, Gain in KE = Loss in PE</P2>
      <MathD>{"$$\\Rightarrow\\; \\frac{1}{2}(3m)v^2 + \\frac{1}{2}m(u^2+v^2) + \\frac{1}{2}m(v-u)^2 = mgh$$"}</MathD>
      <P2>On putting {"$u = 5v$"} in this equation, we get</P2>
      <MathD>{"$$\\boxed{v = \\sqrt{2gh/45}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-18" num="18" problem={"A ball is projected from the ground with speed u at an angle α with horizontal. It collides with wall at a distance a from the point of projection and returns to its original position. Find the coefficient of restitution between the ball and the wall."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_9C7F127516BB52EDF255} caption="FIGURE 1.103" />
      <SolHd />
      <P2>Since, the velocity of the ball along the vertical direction before and after collision with the wall remains the same, the time of flight {"$(T_{OAB} + T_{BCO})$"} of the ball in this case will be same as time of flight {"$(T)$"} if the ball would have not collided with the wall. So, {"$T = T_{OAB} + T_{BCO}$"}.</P2>
      <P2>Horizontal component of velocity of ball before collision with the wall is {"$u\\cos\\alpha$"} and after collision is {"$eu\\cos\\alpha$"}.</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; \\frac{2u\\sin\\alpha}{g} = \\frac{a}{u\\cos\\alpha} + \\frac{a}{eu\\cos\\alpha} \\\\ &\\Rightarrow\\; \\frac{a}{eu\\cos\\alpha} = \\frac{2u\\sin\\alpha}{g} - \\frac{a}{u\\cos\\alpha} = \\frac{2u^2\\sin\\alpha\\cos\\alpha - ag}{gu\\cos\\alpha} \\\\ &\\therefore\\; \\boxed{e = \\frac{ag}{2u^2\\sin\\alpha\\cos\\alpha - ag} = \\frac{1}{\\left(\\dfrac{u^2\\sin 2\\alpha}{ag} - 1\\right)}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-19" num="19" problem={"A small sphere of mass 1 kg is moving with a velocity $(6\\hat{i}+\\hat{j})$ m/s. It hits a fixed smooth wall and rebounds with velocity $(-4\\hat{i}+\\hat{j})$ m/s. Find the coefficient of restitution between the sphere and the wall."}>
      <SolHd />
      <P2>Impulse = Change in momentum</P2>
      <MathD>{"$$= 1\\times(-4\\hat{i}+\\hat{j}) - 1\\times(6\\hat{i}+\\hat{j}) = -10\\hat{i}$$"}</MathD>
      <P2>This is perpendicular to the wall.</P2>
      <P2>The component of initial velocity along {"$\\hat{i}$"} is {"$6$"} m/s. So, speed of approach is 6 m/s.</P2>
      <P2>Similarly, speed of separation is 4 m/s.</P2>
      <MathD>{"$$\\therefore\\; e = 4/6 = \\boxed{2/3}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-20" num="20" problem={"A ball of mass m is aligned above a ball of mass M = 3m (with small separation as shown in fig. 1.104). The two are dropped simultaneously from height h. If M rebounds elastically from the floor and then m rebounds elastically from M, find the maximum height attained by m after the rebound."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_959F10C8A8631BECBEE4} caption="FIGURE 1.104" />
      <SolHd />
      <P2>The ball of mass {"$3m$"} acquires a velocity equal to {"$\\sqrt{2gh}$"} before it strikes the ground. As collision is elastic, it rebounds with velocity {"$\\sqrt{2gh}$"} in the upward direction. At this instant, it collides with the ball of mass {"$m$"} which has acquired a velocity of {"$\\sqrt{2gh}$"} in the downward direction.</P2>
      <P2>Choosing our axis along the vertical upward direction, we have {"$u_1 = \\sqrt{2gh}$"} and {"$u_2 = -\\sqrt{2gh}$"}.</P2>
      <P2>From momentum conservation,</P2>
      <MathD>{"$$3m\\sqrt{2gh} - m\\sqrt{2gh} = 3mv_1 + mv_2 \\qquad\\Rightarrow\\; 2\\sqrt{2gh} = 3v_1 + v_2 \\qquad\\text{...(1)}$$"}</MathD>
      <P2>As the collision is elastic, we have {"$e = 1$"}</P2>
      <MathD>{"$$\\Rightarrow\\; 2\\sqrt{2gh} = v_2 - v_1 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>On solving eqns. (1) and (2), we get {"$v_1 = 0$"} and {"$v_2 = 2\\sqrt{2gh}$"}</P2>
      <P2>After the collision, mechanical energy will be conserved. Let {"$H$"} be the maximum height attained by {"$m$"}. Then,</P2>
      <MathD>{"$$\\frac{1}{2}m(2\\sqrt{2gh})^2 = mgH \\qquad\\therefore\\quad \\boxed{H = 4h}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-21" num="21" problem={"Two balls of mass m₁ = 100 g and m₂ = 300 g are suspended from point A by two equal inextensible threads, each of length l = 32/25 m. Ball of mass m₁ is drawn aside and held at the same level as A but at a distance √3l/2 from A. When ball m₁ is released, it collides elastically with the stationary ball of mass m₂. Calculate (Take g = 10 ms⁻²) (a) velocity u₁ with which the ball of mass m₁ collides with the other ball (b) maximum rise of the ball of mass m₂"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CB59553AC9BF91CC551A} caption="FIGURE 1.105" />
      <SolHd />
      <P2>Here, {"$\\sin\\theta = \\dfrac{\\sqrt{3}l/2}{l} = \\dfrac{\\sqrt{3}}{2}$"} {"$\\Rightarrow\\;\\theta = 60°$"}</P2>
      <P2>The ball of mass {"$m_1$"} will first fall vertically a distance of {"$l\\cos\\theta = l/2$"}. Its velocity on reaching point {"$C$"} is {"$v = \\sqrt{2gl/2} = \\sqrt{gl}$"}.</P2>
      <P2>Its velocity at {"$C$"} in tangential direction will not change and will be equal to {"$v\\sin\\theta = \\sqrt{3gl}/2$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_7FE02F176C9293EF5DA2} caption="FIGURE 1.106" />
      <P2>(a) On reaching lowermost point, its velocity {"$u_1$"} can be found by applying conservation of mechanical energy between {"$C$"} and lowermost position. Gain in KE = Loss in PE</P2>
      <MathD>{"$$\\Rightarrow\\; \\frac{1}{2}m\\left[u_1^2 - (v\\sin\\theta)^2\\right] = mgl(1-\\cos\\theta)$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; u_1^2 = 2gl\\times\\frac{1}{2} + \\left(\\frac{\\sqrt{3gl}}{2}\\right)^2 = \\frac{7gl}{4} = \\frac{7\\times 10\\times 32/25}{4} = 16 \\qquad\\therefore\\; u_1 = 4\\text{ m/s}$$"}</MathD>
      <P2>(b) Applying momentum conservation, we have</P2>
      <MathD>{"$$m_1 u_1 + 0 = m_1 v_1 + m_2 v_2 \\qquad\\Rightarrow\\; 0{\\cdot}1\\times 4 = 0{\\cdot}1\\,v_1 + 0{\\cdot}3\\,v_2 \\qquad\\Rightarrow\\; v_1 + 3v_2 = 4 \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Since, collision is elastic,</P2>
      <MathD>{"$$v_2 - v_1 = u_1 - u_2 = 4 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2), we get {"$v_2 = 2$"} m/s</P2>
      <P2>Therefore, maximum rise of ball of mass {"$m_2$"} is</P2>
      <MathD>{"$$h = \\frac{v_2^2}{2g} = \\frac{2^2}{2\\times 10} = \\boxed{0{\\cdot}2\\text{ m}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-22" num="22" problem={"A plate of mass M is suspended from a ceiling with the help of two springs. The spring constant for each of the springs is k. A body of mass m falls from a height h and strikes the plate. The collision is completely inelastic. Find the maximum displacement of the plate from its original position if M = m?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_B8045CF6E4CF9A12A4C1} caption="FIGURE 1.107" />
      <SolHd />
      <P2>The initial elongation of the spring before the collision is given by {"$x_i = \\dfrac{mg}{2k}$"} (Since, {"$mg = 2kx_i$"})</P2>
      <P2>The velocity of the body {"$m$"} just before collision is {"$\\sqrt{2gh}$"} in the downward direction.</P2>
      <P2><strong>During collision:</strong> Linear momentum on the system is conserved. Note that there are external forces acting on the system, namely {"$mg$"}, {"$Mg$"} and {"$kx$"}. But their effect is negligible as time of collision is very small.</P2>
      <P2>Hence, {"$m\\sqrt{2gh} = (m+M)v = 2mv$"} {"$\\Rightarrow\\; v = \\sqrt{gh/2}$"}</P2>
      <P2>Here, {"$v$"} is the velocity of the system immediately after the collision.</P2>
      <P2><strong>After collision:</strong> Mechanical energy of the system will be conserved. Let {"$d$"} be the displacement of the plate and {"$x_f$"} be the final elongation of the spring. Then, {"$x_f = x_i + d = \\dfrac{mg}{2k} + d$"}</P2>
      <P2>Conserving mechanical energy,</P2>
      <MathD>{"$$\\Delta KE + \\Delta PE = 0$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\left[0 - \\frac{1}{2}\\times 2m(\\sqrt{gh/2})^2\\right] + 2\\times\\frac{1}{2}k(x_f^2 - x_i^2) - 2mgd = 0$$"}</MathD>
      <MathD>{"$$\\Rightarrow\\; kd^2 - mgd - \\frac{mgh}{2} = 0$$"}</MathD>
      <MathD>{"$$\\therefore\\quad \\boxed{d = \\frac{mg + \\sqrt{m^2g^2 + 2mgkh}}{2k}}\\;\\text{(ignoring −ve value)}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-23" num="23" problem={"A ball is thrown along the surface of a smooth circular skating ring. The coefficient of restitution between the wall of the ring and the ball is e. The ball is rolled from a point on the circumference at an angle θ to the radial direction. What is the condition in terms of e, θ, φ and ω such that after two collisions, the ball comes back to the point of projection?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CDD85E4FEAA7A66F3BEA} caption="FIGURE 1.108" />
      <SolHd />
      <P2>Let {"$u$"} be the velocity with which the ball strikes at {"$B$"} and {"$v$"} be the velocity with which the ball rebounds. Then,</P2>
      <P2>along tangent: {"$u\\sin\\theta = v\\sin\\phi$"}</P2>
      <P2>and along normal: {"$eu\\cos\\theta = v\\cos\\phi$"}</P2>
      <MathD>{"$$\\Rightarrow\\quad \\tan\\theta = e\\tan\\phi \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Similarly, at point {"$C$"}, {"$\\tan\\phi = e\\tan\\omega$"} ...(2)</P2>
      <P2>From (1) and (2), {"$\\tan\\theta = e^2\\tan\\omega$"}.</P2>
      <P2>Sum of angles of triangle {"$ABC$"} is {"$2(\\theta+\\phi+\\omega) = 180°$"} {"$\\Rightarrow\\; \\theta = 90° - (\\phi+\\omega)$"}</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; \\tan\\theta(\\tan\\phi + \\tan\\omega) = 1 - \\tan\\phi\\tan\\omega \\\\ &\\Rightarrow\\; \\tan^2\\theta\\left(\\frac{1}{e} + \\frac{1}{e^2} + \\frac{1}{e^3}\\right) = 1 \\\\ &\\therefore\\quad \\boxed{\\cot^2\\theta = \\frac{1}{e} + \\frac{1}{e^2} + \\frac{1}{e^3}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-24" num="24" problem={"A light flexible thread passes over a small, frictionless pulley. Two blocks of mass m = 1 kg are attached with the thread as shown in fig. 1.109. Heavier block of mass M = 3 kg rests on a slab. A bullet of mass m₀ = 1 kg, moving upwards with velocity v₀ = 10 ms⁻¹, collides with the hanging block at t = 0. Calculate the maximum height ascended by M when it is jerked into motion (Take g = 10 ms⁻²) (a) if the bullet gets stuck in the hanging block (b) if the bullet collides with the hanging block elastically"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D118AAEBB7CC63163843} caption="FIGURE 1.109" />
      <SolHd />
      <P2>(a) From conservation of momentum, the speed of block of mass {"$m$"} (with bullet) after the bullet strikes is {"$v = \\dfrac{m_0 v_0}{m + m_0}$"}.</P2>
      <P2>Block of mass {"$M$"} is jerked into motion when mass {"$m$"} (with bullet) returns back to its original position with momentum {"$(m+m_0)v = m_0 v_0$"}.</P2>
      <P2>The velocity of mass {"$M$"} at this instant is</P2>
      <MathD>{"$$v_1 = \\frac{m_0 v_0}{M+m+m_0} = \\frac{1\\times 10}{3+1+1} = 2\\text{ m/s}$$"}</MathD>
      <P2>Its acceleration is {"$a_1 = \\dfrac{(m+m_0)-M}{m+m_0+M}\\,g = \\dfrac{(1+1)-3}{1+1+3}\\times 10 = -2$"} m/s²</P2>
      <P2>Maximum height {"$h_1$"} ascended is given by</P2>
      <MathD>{"$$h_1 = \\frac{0^2 - v_1^2}{2a_1} = \\frac{-2^2}{2\\times(-2)} = \\boxed{1\\text{ m}}$$"}</MathD>
      <P2>(b) When the bullet strikes elastically, velocities interchange and the velocity of block of mass {"$m$"} is {"$v_0$"}. Block of mass {"$M$"} is jerked into motion when mass {"$m$"} returns back to its original position with momentum {"$mv_0$"}.</P2>
      <P2>The velocity of mass {"$M$"} at this instant is {"$v_2 = \\dfrac{mv_0}{m+M} = \\dfrac{1\\times 10}{1+3} = 2.5$"} m/s</P2>
      <P2>Its acceleration is {"$a_2 = \\dfrac{m-M}{m+M}\\,g = \\dfrac{1-3}{1+3}\\times 10 = -5$"} m/s²</P2>
      <P2>Maximum height {"$h_2$"} ascended is given by</P2>
      <MathD>{"$$h_2 = \\frac{0^2 - v_2^2}{2a_2} = \\frac{-2.5^2}{2\\times(-5)} = \\boxed{0.625\\text{ m}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-25" num="25" problem={"A ball of mass m = 1 kg is hung vertically by thread of length l = 1.50 m. Upper end of the thread is attached to the ceiling of a trolley of mass M = 4 kg. Initially, trolley is stationary and is free to move along horizontal rails without friction. A bullet of mass m = 1 kg, moving horizontally with velocity v₀ = 6 ms⁻¹, collides with the ball and gets stuck with it. Calculate its maximum deflection with the vertical. (Take g = 10 ms⁻²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2EDB4BF6EF26BCC1A5FA} caption="FIGURE 1.110" />
      <SolHd />
      <P2>From momentum conservation, the velocity of the ball (with bullet) after the bullet collides is {"$v_0' = \\dfrac{mv_0}{2m} = \\dfrac{v_0}{2}$"}.</P2>
      <P2>At the time of maximum deflection of thread, the velocity of ball and trolley is same. Let this be {"$v$"}. From momentum conservation again, we have</P2>
      <MathD>{"$$2m\\times\\frac{v_0}{2} = (2m+M)v \\qquad\\Rightarrow\\; v = \\frac{mv_0}{2m+M} = \\frac{1\\times 6}{2\\times 1+4} = 1\\text{ m/s}$$"}</MathD>
      <P2>Applying conservation of mechanical energy, Gain in PE = Loss in KE</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; 2mgl(1-\\cos\\theta) = \\frac{1}{2}(2m)\\left(\\frac{v_0}{2}\\right)^2 - \\frac{1}{2}(2m+M)v^2 \\\\ &\\Rightarrow\\; 2\\times 1\\times 10\\times 1.5(1-\\cos\\theta) = 1\\times 3^2 - \\frac{1}{2}\\times 6\\times 1^2 \\\\ &\\Rightarrow\\; \\cos\\theta = 0.8 \\qquad\\therefore\\quad \\boxed{\\theta = 37°} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-26" num="26" problem={"Particles P and Q of mass 20 g and 40 g respectively are simultaneously projected from points A and B on the ground. The initial velocities of P and Q make 45° and 135° angles respectively with horizontal AB. Each particle has an initial speed 49 m/s. The separation AB is 245 m. Both undergo a collision. After the collision, P retraces its path. Determine the position of Q when it hits the ground. How much time after the collision does the particle Q take to reach the ground?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F593F3BF4118940D76E4} caption="FIGURE 1.111" />
      <SolHd />
      <P2>Since, horizontal speed of particles is same, they will collide at mid-point of {"$AB$"}. The time after which collision takes place</P2>
      <MathD>{"$$= \\frac{AB}{2v_H} = \\frac{245}{2\\times 49/\\sqrt{2}} = \\frac{5}{\\sqrt{2}}\\text{ sec.}$$"}</MathD>
      <P2>After time {"$t = 5/\\sqrt{2}$"} sec., vertical component of the velocity, {"$v_y = u_y - g\\times t = \\dfrac{49}{\\sqrt{2}} - 9{\\cdot}8\\times\\dfrac{5}{\\sqrt{2}} = 0$"}</P2>
      <P2>So, collision takes place at the highest point where velocities are directed horizontally in the opposite directions. Since {"$P$"} retraces its path, the direction of its velocity changes but magnitude remains constant. Hence,</P2>
      <MathD>{"$$u_P = \\frac{49}{\\sqrt{2}},\\quad u_Q = \\frac{-49}{\\sqrt{2}},\\quad v_P = \\frac{-49}{\\sqrt{2}}$$"}</MathD>
      <P2>From momentum conservation, we have {"$m_P u_P + m_Q u_Q = m_P v_P + m_Q v_Q$"}</P2>
      <P2>Substituting the values of the known quantities, we obtain {"$v_Q = 0$"}.</P2>
      <P2>Therefore, {"$Q$"} simply drops down to the ground. The time taken to go up is equal to the time taken to come down.</P2>
      <MathD>{"$$\\text{Hence, }\\; t = \\frac{5}{\\sqrt{2}}\\text{ sec} \\approx \\boxed{3.54\\text{ sec}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-27" num="27" problem={"Two smooth spheres of equal mass and equal radius r move along parallel lines with same speed in opposite directions. The distance between parallel lines is c (c < 2r). After collision, both the spheres are deviated by 90°. Prove that c²(1 + e) = 4r²e where e is the coefficient of restitution."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_CACEF2618FFD44866E13} caption="FIGURE 1.112" />
      <SolHd />
      <P2>Let the speed of spheres before and after collision be {"$u$"} and {"$v$"} respectively. Along the tangential direction, there will be no change in velocity.</P2>
      <MathD>{"$$\\Rightarrow\\quad u\\sin\\theta = v\\cos\\theta \\qquad\\text{or}\\qquad \\frac{v}{u} = \\tan\\theta$$"}</MathD>
      <P2>Along the normal direction, we have {"$v_2 - v_1 = e(u_1-u_2)$"} where {"$u_1 = u\\cos\\theta$"}, {"$u_2 = -u\\cos\\theta$"}, {"$v_1 = -v\\sin\\theta$"} and {"$v_2 = v\\sin\\theta$"}</P2>
      <MathD>{"$$\\Rightarrow\\; 2v\\sin\\theta = 2eu\\cos\\theta \\qquad\\Rightarrow\\; \\tan^2\\theta = \\frac{e}{1+e}$$"}</MathD>
      <P2>From figure, {"$\\sin\\theta = \\dfrac{c}{2r}$"}</P2>
      <MathD>{"$$\\Rightarrow\\quad \\left(\\frac{c}{2r}\\right)^2 = \\frac{e}{1+e} \\qquad\\therefore\\quad \\boxed{c^2(1+e) = 4r^2 e} \\qquad\\square$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-28" num="28" problem={"A shell flying with velocity v = 500 m/s bursts into three identical fragments so that the kinetic energy of the system increases 1.5 times. If all the fragments travel in the direction of shell before bursting, what maximum speed can one of the fragments obtain?"}>
      <SolHd />
      <P2>Let the mass of shell be {"$3m$"}. Then, the mass of each fragment is {"$m$"}. Now, let the velocity of three fragments be {"$v_1$"}, {"$v_2$"} and {"$v_3$"}. By momentum conservation,</P2>
      <MathD>{"$$3m\\times 500 = mv_1 + mv_2 + mv_3 \\qquad\\Rightarrow\\; v_1+v_2+v_3 = 1500 \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Since KE increases 1.5 times, we have</P2>
      <MathD>{"$$v_1^2 + v_2^2 + v_3^2 = \\frac{9}{2}\\times 500^2 = \\frac{1500^2}{2} \\qquad\\text{...(2)}$$"}</MathD>
      <P2>Let the maximum velocity be {"$v_1$"}. From symmetry, {"$v_2 = v_3$"}.</P2>
      <P2>From (1), {"$v_2 = \\dfrac{1500-v_1}{2}$"} and from (2):</P2>
      <MathD>{"$$v_1^2 + 2\\times\\left(\\frac{1500-v_1}{2}\\right)^2 = \\frac{1500^2}{2} \\qquad\\Rightarrow\\; 3v_1^2 - 3000v_1 = 0 \\qquad\\Rightarrow\\; v_1 = 0\\text{ or }1000\\text{ m/s}$$"}</MathD>
      <MathD>{"$$\\therefore\\; v_1 = \\boxed{1000\\text{ m/s}}\\text{ is the maximum speed.}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-29" num="29" problem={"A particle of mass m₁ collides elastically with a stationary particle of mass m₂ (m₁ > m₂). If m₂/m₁ = λ, find the maximum angle through which the striking particle may deviate as a result of collision."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6F0960922C44F33A356F} caption="FIGURE 1.113" />
      <SolHd />
      <P2>Applying conservation of momentum and KE, we get</P2>
      <MathD>{"$$\\begin{aligned} & u_1 = v_1\\cos\\theta + \\lambda v_2\\cos\\beta \\qquad\\text{...(1)} \\\\ & v_1\\sin\\theta = \\lambda v_2\\sin\\beta \\qquad\\text{...(2)} \\\\ & u_1^2 = v_1^2 + \\lambda v_2^2 \\qquad\\text{...(3)} \\end{aligned}$$"}</MathD>
      <P2>From (1) and (2): {"$v_1 = \\dfrac{u_1\\sin\\beta}{\\sin(\\theta+\\beta)}$"} and {"$v_2 = \\dfrac{u_1\\sin\\theta}{\\lambda\\sin(\\theta+\\beta)}$"}</P2>
      <P2>Putting these values in (3), we get</P2>
      <MathD>{"$$\\Rightarrow\\; \\lambda\\sin(\\theta+2\\beta)\\sin\\theta \\qquad\\text{...(4)}$$"}</MathD>
      <P2>Differentiating w.r.t. {"$\\beta$"} and setting {"$\\dfrac{d\\theta}{d\\beta} = 0$"} for maximum {"$\\theta$"}:</P2>
      <MathD>{"$$\\Rightarrow\\; \\cos(\\theta+2\\beta) = 0 \\qquad\\text{or}\\qquad \\theta + 2\\beta = 90°$$"}</MathD>
      <P2>Putting this in eqn (4), we get {"$\\sin\\theta = \\lambda = m_2/m_1$"}</P2>
    </ExBox>

    <ExBox key="l2-ex-30" num="30" problem={"A cannon of mass M starts sliding freely down a smooth inclined plane at an angle α to the horizontal. After the cannon covered the distance l, a shot was fired. The shell left the cannon in the horizontal direction with momentum p. As a consequence, the cannon stopped. Determine the duration of the shot."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_807A43769779C70AF972} caption="FIGURE 1.114" />
      <SolHd />
      <P2>The acceleration of cannon down the inclined plane is {"$a = g\\sin\\alpha$"}.</P2>
      <P2>The velocity acquired after covering distance {"$l$"} is {"$v = \\sqrt{2al} = \\sqrt{2gl\\sin\\alpha}$"}.</P2>
      <P2>Its momentum just before the shot is {"$Mv = M\\sqrt{2gl\\sin\\alpha}$"} and zero just after the shot. If {"$\\Delta t$"} is the duration of shot, then the impulses exerted on cannon during the shot are {"$p$"} towards right and {"$Mg\\sin\\alpha\\,\\Delta t$"} down the incline.</P2>
      <P2>Now, along the incline in the upward direction, Total impulse = Change in momentum</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; p\\cos\\alpha - (Mg\\sin\\alpha)\\Delta t = M\\sqrt{2gl\\sin\\alpha} \\\\ &\\therefore\\; \\boxed{\\Delta t = \\frac{p\\cos\\alpha - M\\sqrt{2gl\\sin\\alpha}}{Mg\\sin\\alpha}} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-31" num="31" problem={"A small ball of mass m is projected with a minimum horizontal velocity v₀ on a block of mass M so that it will reach the highest point P of the block. If all surfaces are smooth, find the value of v₀."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_4FB561A6A3AEA9C7AD45} caption="FIGURE 1.115" />
      <SolHd />
      <P2>For {"$v_0$"} to be minimum, the speed of ball with respect to block at the highest point {"$P$"} is {"$\\sqrt{gR}$"}. If at this instant, speed of block is {"$v$"} towards left, then the speed of ball with respect to ground is {"$v - \\sqrt{gR}$"} towards left.</P2>
      <P2>As there is no external force acting on the system in horizontal direction, the linear momentum in horizontal direction is conserved.</P2>
      <MathD>{"$$\\Rightarrow\\; mv_0 = Mv + m(v-\\sqrt{gR}) \\qquad\\Rightarrow\\; v = \\frac{m(v_0+\\sqrt{gR})}{M+m}$$"}</MathD>
      <P2>By conservation of mechanical energy, {"$\\Delta K + \\Delta U = 0$"}</P2>
      <MathD>{"$$\\Rightarrow\\; \\frac{1}{2}Mv^2 + \\frac{1}{2}m(v-\\sqrt{gR})^2 - \\frac{1}{2}mv_0^2 + mg(2R) = 0$$"}</MathD>
      <P2>After substituting and simplifying,</P2>
      <MathD>{"$$Mv_0^2 = gR(5M+4m) \\qquad\\therefore\\quad \\boxed{v_0 = \\sqrt{gR\\left(5+\\frac{4m}{M}\\right)}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-32" num="32" problem={"A bead of mass m kept at the top of a smooth hemisphere of mass M and radius R, is gently pushed towards right. As a result, the hemisphere slides towards left. When the bead makes an angle θ to the vertical, find the (a) speed of the wedge. (b) magnitude of velocity of the bead relative to the wedge."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_A43CB3FF368037BE117D} caption="FIGURE 1.116" />
      <SolHd />
      <P2>Let {"$V$"} be the velocity of hemisphere towards left and {"$v_r$"} be the velocity of bead with respect to the hemisphere. Then, with respect to ground, the velocity of bead is {"$v_r\\sin\\theta$"} downwards and {"$v_r\\cos\\theta - V$"} towards right.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_4616ED3D9370C548EFE5} caption="FIGURE 1.117" />
      <P2>As there is no external force acting on the system in horizontal direction, the linear momentum in horizontal direction is conserved.</P2>
      <MathD>{"$$MV = m(v_r\\cos\\theta - V) \\qquad\\Rightarrow\\quad V = \\frac{mv_r\\cos\\theta}{M+m}$$"}</MathD>
      <P2>By conservation of mechanical energy, {"$\\Delta K + \\Delta U = 0$"}</P2>
      <MathD>{"$$\\Rightarrow\\; v_r^2\\left(1 - \\frac{m}{M+m}\\cos^2\\theta\\right) = 2gR(1-\\cos\\theta)$$"}</MathD>
      <MathD>{"$$\\therefore\\; \\boxed{v_r = \\sqrt{\\frac{2(M+m)gR(1-\\cos\\theta)}{M+m\\sin^2\\theta}}}$$"}</MathD>
      <MathD>{"$$\\text{and}\\quad V = \\frac{mv_r\\cos\\theta}{M+m} = \\sqrt{\\frac{2m^2gR(1-\\cos\\theta)\\cos^2\\theta}{(M+m)(M+m\\sin^2\\theta)}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-33" num="33" problem={"Two equal spheres of mass m are in contact on a smooth horizontal surface. A third identical sphere strikes symmetrically on them. The collision is elastic. If the initial speed of the third sphere is u, find the final velocity of all the spheres after the collision."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_6B60B9AC8AA0C66A114E} caption="FIGURE 1.118" />
      <SolHd />
      <P2>Let {"$P$"}, {"$Q$"}, {"$R$"} be the centres of sphere 1, 2 and 3 respectively. Let their final velocities be {"$v_1$"}, {"$v_2$"} and {"$v_3$"} respectively. From symmetry, {"$v_1 = v_2 = v$"} and {"$\\theta_1 = \\theta_2 = \\theta$"}.</P2>
      <P2>Conserving momentum along {"$X$"}-axis,</P2>
      <MathD>{"$$mu = mv_3 + 2mv\\cos\\theta \\qquad\\Rightarrow\\; u = v_3 + 2v\\cos\\theta \\qquad\\text{...(1)}$$"}</MathD>
      <P2>From kinetic energy conservation,</P2>
      <MathD>{"$$u^2 = v_3^2 + 2v^2 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>To find {"$\\theta$"}: initially {"$P$"} and {"$Q$"} are stationary and will move in the direction of applied force. As the spheres are identical, triangle {"$PQR$"} is an equilateral triangle. Therefore {"$\\theta_1 = \\theta_2 = 30°$"}.</P2>
      <P2>Substituting {"$\\theta = 30°$"} in eqn. (1) and solving with (2), we get</P2>
      <MathD>{"$$\\boxed{v_1 = v_2 = \\frac{2\\sqrt{3}}{5}\\,u} \\qquad\\text{and}\\qquad \\boxed{v_3 = -\\frac{u}{5}}$$"}</MathD>
      <P2>Note that {"$v_3$"} is negative, which means that it will rebound back.</P2>
    </ExBox>

    <ExBox key="l2-ex-34" num="34" problem={"Two equal spheres of mass m are at rest and in contact on a smooth horizontal table. A third identical sphere impinges symmetrically on them with speed u and comes to rest after collision. Find the value of coefficient of restitution and loss in kinetic energy of the system."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_F44921F31A9B490FF883} caption="FIGURE 1.119" />
      <SolHd />
      <P2>Due to symmetry, the speed of both spheres is equal. Let it be {"$v$"}. By conservation of linear momentum along horizontal,</P2>
      <MathD>{"$$mu + 0 = 0 + 2mv\\cos 30° \\qquad\\Rightarrow\\; v = \\frac{u}{\\sqrt{3}}$$"}</MathD>
      <P2>The definition of coefficient of restitution {"$e = \\dfrac{v_2-v_1}{u_1-u_2}$"} is applicable independently along both lines of impact. Here, {"$u_1 = u\\cos\\theta$"}, {"$u_2 = 0$"}, {"$v_1 = 0$"}, {"$v_2 = v$"}</P2>
      <MathD>{"$$\\therefore\\quad e = \\frac{v-0}{u\\cos\\theta} = \\frac{u/\\sqrt{3}}{u\\times\\sqrt{3}/2} = \\boxed{\\frac{2}{3}}$$"}</MathD>
      <P2>Loss in K.E. {"$= K_i - K_f = \\dfrac{1}{2}mu^2 - 2\\times\\dfrac{1}{2}mv^2 = \\dfrac{1}{2}mu^2 - m\\left(\\dfrac{u}{\\sqrt{3}}\\right)^2 = \\boxed{\\dfrac{1}{6}mu^2}$"}</P2>
    </ExBox>

    <ExBox key="l2-ex-35" num="35" problem={"A smooth ball is dropped from a height h on smooth and fixed incline as shown in the fig. 1.120. After collision, the velocity of the ball is directed horizontally. (a) Find the coefficient of restitution. (b) If the collision is elastic, what is the impulse on the ball?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_FC32E7606274F7973277} caption="FIGURE 1.120" />
      <SolHd />
      <P2>The velocity of the ball along the incline will not change after the collision. Let {"$v_0$"} be the velocity of ball with which it strikes the incline and {"$v$"} be the velocity of ball with which it leaves the incline. Then,</P2>
      <MathD>{"$$v_0 = \\sqrt{2gh} \\qquad\\text{and}\\qquad v_0\\sin\\theta = v\\cos\\theta \\qquad\\Rightarrow\\; v = \\sqrt{2gh}\\tan\\theta$$"}</MathD>
      <P2>(a) Along the normal, {"$v_1 = -eu_1$"} where {"$u_1 = v_0\\cos\\theta$"} and {"$v_1 = -v\\sin\\theta$"},</P2>
      <MathD>{"$$\\Rightarrow\\; -v\\sin\\theta = -ev_0\\cos\\theta \\qquad\\therefore\\quad \\boxed{e = \\frac{v}{v_0}\\tan\\theta = \\tan^2\\theta}$$"}</MathD>
      <P2>(b) If the collision is elastic, the velocity along the normal will reverse its direction.</P2>
      <MathD>{"$$\\text{Therefore, Impulse} = 2mv_0\\cos\\theta = \\boxed{2m\\sqrt{2gh}\\cos\\theta}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-36" num="36" problem={"A small steel ball A is suspended by an inextensible thread of length l = 1.5 m from O. Another identical ball is thrown vertically downwards such that its surface remains just in contact with thread during downward motion and collides elastically with the suspended ball. If the suspended ball just completes vertical circle after collision, calculate the velocity of the falling ball just before collision. (Take g = 10 ms⁻²)"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5AC8E3079A60C1B10DFE} caption="FIGURE 1.122" />
      <SolHd />
      <P2>It can be seen that {"$\\theta = 30°$"}.</P2>
      <P2>The velocity of ball {"$B$"} along the tangent remains same.</P2>
      <MathD>{"$$\\Rightarrow\\; v_t = v_0\\sin\\theta$$"}</MathD>
      <P2>Since collision is elastic, {"$v_2 - v_1 = u_1 - u_2$"}:</P2>
      <MathD>{"$$\\Rightarrow\\; v\\sin\\theta - (-v_n) = v_0\\cos\\theta - 0 \\qquad\\Rightarrow\\; v_n = v_0\\cos\\theta - v\\sin\\theta$$"}</MathD>
      <P2>Since there is no external force in horizontal direction, the momentum of the system of two balls along horizontal is conserved.</P2>
      <MathD>{"$$\\Rightarrow\\; v = v_0\\sin\\theta\\cos\\theta + (v_0\\cos\\theta - v\\sin\\theta)\\sin\\theta \\qquad\\Rightarrow\\; v = \\frac{v_0\\sin 2\\theta}{1+\\sin^2\\theta}$$"}</MathD>
      <P2>For the ball to just complete the circle, {"$v = \\sqrt{5gl}$"}</P2>
      <MathD>{"$$\\therefore\\; v_0 = \\frac{\\sqrt{5gl}(1+\\sin^2\\theta)}{\\sin 2\\theta} = \\frac{\\sqrt{5\\times 10\\times 1{\\cdot}5}\\,(1+\\sin^2 30°)}{\\sin 60°} = \\boxed{12{\\cdot}5\\text{ m/s}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-37" num="37" problem={"A particle (a mud pallet, say) of mass m strikes with velocity v₀ on a smooth stationary wedge of mass M at an angle θ with horizontal. If the collision is perfectly inelastic, find (a) velocity of the wedge just after the collision. (b) change in KE of the system (M + m) in collision."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_17D846240ED2F4A6C63C} caption="FIGURE 1.123" />
      <SolHd />
      <P2>(a) Since, there is no external force on the system in horizontal direction, momentum in the horizontal direction is conserved.</P2>
      <MathD>{"$$\\Rightarrow\\; mv_0\\cos\\theta = (M+m)v \\qquad\\therefore\\quad \\boxed{v = \\frac{mv_0\\cos\\theta}{M+m}}$$"}</MathD>
      <P2>(b)</P2>
      <MathD>{"$$\\Delta K = \\frac{1}{2}(M+m)v^2 - \\frac{1}{2}mv_0^2 = -\\frac{1}{2}mv_0^2\\left(\\frac{M+m\\sin^2\\theta}{M+m}\\right)$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-38" num="38" problem={"A ball of mass m moving horizontally with velocity u hits a wedge of mass M. The wedge is situated on a smooth horizontal surface. After striking the wedge, the ball starts moving in vertical direction and the wedge starts moving in horizontal plane. Calculate (a) the velocity V of wedge. (b) the velocity v at which the ball moves in vertical direction. (c) the impulse imparted by the ball to the wedge. (d) the coefficient of restitution e?"}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5FCB310A02118B450154} caption="FIGURE 1.124" />
      <SolHd />
      <P2>(a) Since there is no external force in horizontal direction, momentum in the horizontal direction is conserved.</P2>
      <MathD>{"$$mu + 0 = 0 + MV \\qquad\\therefore\\quad \\boxed{V = \\frac{mu}{M}}$$"}</MathD>
      <P2>(b) The velocity of ball along the tangent does not change.</P2>
      <MathD>{"$$\\Rightarrow\\; u\\cos\\theta = v\\sin\\theta \\qquad\\therefore\\quad \\boxed{v = u\\cot\\theta}$$"}</MathD>
      <P2>(c) The impulse imparted by ball to wedge is equal in magnitude to the impulse imparted by wedge to ball. Its value is</P2>
      <MathD>{"$$mv\\cos\\theta - (-mu\\sin\\theta) = m(u\\cot\\theta)\\cos\\theta + mu\\sin\\theta = \\boxed{mu\\operatorname{cosec}\\theta}$$"}</MathD>
      <P2>(d) Along the line of impact, {"$e = \\dfrac{v_2-v_1}{u_1-u_2}$"}. Here, {"$u_1 = u\\sin\\theta$"}, {"$u_2 = 0$"}, {"$v_1 = -v\\cos\\theta$"}, {"$v_2 = V\\sin\\theta$"}</P2>
      <MathD>{"$$\\therefore\\quad e = \\frac{V\\sin\\theta + v\\cos\\theta}{u\\sin\\theta} = \\frac{m}{M} + \\cot^2\\theta$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-39" num="39" problem={"A wedge of mass M having inclined plane making an angle θ with horizontal is kept at rest on a smooth surface. If a particle of mass m hits the wedge normally on its inclined plane with speed u, find the velocity of wedge and particle just after collision. The coefficient of restitution is e."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_526FC7B4A9A8E11F134A} caption="FIGURE 1.126" />
      <SolHd />
      <P2>Along normal (line of impact), {"$u_1 = u$"}, {"$u_2 = 0$"}, {"$v_1 = -v$"}, {"$v_2 = V\\sin\\theta$"}</P2>
      <MathD>{"$$\\Rightarrow\\; e = \\frac{v_2-v_1}{u_1-u_2} = \\frac{V\\sin\\theta-(-v)}{u-0} \\qquad\\Rightarrow\\; v = eu - V\\sin\\theta \\qquad\\text{...(1)}$$"}</MathD>
      <P2>Since, there is no external force in the horizontal direction, the momentum along horizontal is conserved.</P2>
      <MathD>{"$$\\Rightarrow\\; mu\\sin\\theta + 0 = -mv\\sin\\theta + MV \\qquad\\text{...(2)}$$"}</MathD>
      <P2>From (1) and (2),</P2>
      <MathD>{"$$\\boxed{V = \\frac{(1+e)mu\\sin\\theta}{M+m\\sin^2\\theta}} \\qquad\\text{and}\\qquad \\boxed{v = \\frac{(Me-m\\sin^2\\theta)u}{M+m\\sin^2\\theta}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-40" num="40" problem={"A ball of mass m = 1 kg falling vertically with a velocity v₀ = 2 m/s strikes a wedge of mass M = 2 kg kept on a smooth, horizontal surface as shown in fig. 1.127. The coefficient of restitution between the ball and wedge is e = 0.5. Find the velocity of the wedge and the ball immediately after collision."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_96A8D4BEBDE9821E9475} caption="FIGURE 1.127" />
      <SolHd />
      <P2>Here, {"$m = 1$"} kg, {"$M = 2$"} kg, {"$v_0 = 2$"} m/s. The velocity of the ball {"$v_0\\sin 30° = 1$"} m/s along the incline will not change after the collision. Let {"$V$"} = velocity of wedge towards right, {"$v_x$"} = component of velocity of ball towards left, {"$v_y$"} = component of velocity of ball upwards.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5E6AED9E1AD2B7EC4A30} caption="FIGURE 1.128" />
      <P2>Applying Impulse = change in momentum:</P2>
      <MathD>{"$$J\\sin 30° = MV = mv_x \\qquad\\Rightarrow\\; \\frac{J}{2} = 2V = v_x \\qquad\\text{...(1)}$$"}</MathD>
      <MathD>{"$$J\\cos 30° = m(v_y+v_0) \\qquad\\Rightarrow\\; \\frac{\\sqrt{3}}{2}J = v_y+2 \\qquad\\text{...(2)}$$"}</MathD>
      <P2>Using {"$v_2 - v_1 = e(u_1-u_2)$"} along the normal where {"$u_1 = v_0\\cos 30° = \\sqrt{3}$"} m/s:</P2>
      <MathD>{"$$\\Rightarrow\\; V + v_x + \\sqrt{3}v_y = \\sqrt{3} \\qquad\\text{...(3)}$$"}</MathD>
      <P2>From (1) and (2): {"$v_x = 2V$"} and {"$v_y = 2\\sqrt{3}V - 2$"}. Substituting in (3):</P2>
      <MathD>{"$$V = \\frac{1}{\\sqrt{3}}\\text{ m/s}, \\qquad v_x = \\frac{2}{\\sqrt{3}}\\text{ m/s}, \\qquad v_y = 0$$"}</MathD>
      <P2>Therefore, immediately after collision, the velocities of wedge and ball are respectively</P2>
      <MathD>{"$$\\boxed{V = \\frac{1}{\\sqrt{3}}\\text{ m/s towards right}} \\qquad\\text{and}\\qquad \\boxed{v_x = \\frac{2}{\\sqrt{3}}\\text{ m/s towards left}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-41" num="41" problem={"A flat car of mass m₀ starts moving to the right due to a constant horizontal force F. Sand spills on the flat car from a stationary hopper. The rate of loading is constant and equal to μ kg/s. Find the time dependence of the velocity and the acceleration of the flat car in the process of loading. The friction is negligibly small."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_ED9A35275A930B249A0D} caption="FIGURE 1.130" />
      <SolHd />
      <P2>As per Newton's second law of motion,</P2>
      <MathD>{"$$F = \\frac{d}{dt}(mv) = m\\frac{dv}{dt} + v_{\\text{incr}}\\frac{dm}{dt}$$"}</MathD>
      <P2>where, {"$m$"} is the instantaneous mass of the car and {"$v_{\\text{incr}}$"} is the increase in velocity of the mass that is being added.</P2>
      <P2>Here, {"$v_{\\text{incr}} = v - 0 = v$"} and {"$m = m_0 + \\mu t$"}</P2>
      <MathD>{"$$\\begin{aligned} &\\Rightarrow\\; F = (m_0+\\mu t)\\frac{dv}{dt} + \\mu v \\\\ &\\Rightarrow\\; F - \\mu v = (m_0+\\mu t)\\frac{dv}{dt} \\qquad\\Rightarrow\\; \\int_0^v \\frac{dv}{F-\\mu v} = \\int_0^t \\frac{dt}{m_0+\\mu t} \\\\ &\\Rightarrow\\; \\frac{F}{F-\\mu v} = \\frac{m_0+\\mu t}{m_0} \\end{aligned}$$"}</MathD>
      <MathD>{"$$\\therefore\\quad \\boxed{v = \\frac{Ft}{m_0+\\mu t}} \\qquad\\text{and}\\qquad \\boxed{a = \\frac{dv}{dt} = \\frac{Fm_0}{(m_0+\\mu t)^2}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-42" num="42" problem={"A cart loaded with sand moves along a horizontal floor due to a constant force F. In the process, the sand spills through a hole in the bottom with a constant rate μ kg/s. Find the velocity and the acceleration of the cart at the moment t, if at the initial moment t = 0, the cart with loaded sand had mass m₀ and its velocity was zero. Friction is to be neglected."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_5EA80527E0FBF6283EFA} caption="FIGURE 1.131" />
      <SolHd />
      <P2>In this case, the velocity of sand immediately after spilling through the hole is same as that of the cart. So, there is no change in momentum of the outgoing mass during the process of spilling. Therefore, the increase in velocity {"$v_{\\text{incr}}$"} of the mass {"$dm/dt$"} that is being added is zero.</P2>
      <MathD>{"$$F = \\frac{d}{dt}(mv) = m\\frac{dv}{dt} + v_{\\text{incr}}\\frac{dm}{dt}$$"}</MathD>
      <P2>Here, {"$\\dfrac{dm}{dt} = -\\mu$"}, {"$v_{\\text{incr}} = 0$"} and {"$m = m_0 - \\mu t$"}</P2>
      <MathD>{"$$\\Rightarrow\\; F = (m_0-\\mu t)\\frac{dv}{dt} \\qquad\\Rightarrow\\; \\int_0^v dv = \\int_0^t \\frac{F\\,dt}{m_0-\\mu t}$$"}</MathD>
      <MathD>{"$$\\therefore\\quad \\boxed{v = \\frac{F}{\\mu}\\ln\\left(\\frac{m_0}{m_0-\\mu t}\\right)} \\qquad\\text{and}\\qquad \\boxed{a = \\frac{F}{m_0-\\mu t}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-43" num="43" problem={"A mass m₁ is connected by a massless cable passing over a frictionless pulley to a container of water, which initially (at t = 0), has a mass m₀. If the container ejects water in downward direction at a constant rate b kg/s with a velocity v₀ relative to the container, find the acceleration of m₁ as a function of time."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_579F93E016E19854E35E} caption="FIGURE 1.132" />
      <SolHd />
      <P2>Mass {"$m$"} of the container after time {"$t$"} is {"$m = m_0 - bt$"}.</P2>
      <P2>Since, the water is ejecting at the rate of {"$b$"} kg/s with a velocity {"$v_0$"} relative to the container in downward direction, an upward force on the container will act equal to {"$v_0(-dm/dt) = bv_0$"}.</P2>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_2F861E3C58E78F01B52B} caption="FIGURE 1.133" />
      <P2>From FBD, we have</P2>
      <MathD>{"$$(m_0-bt)a = T - (m_0-bt)g + bv_0 \\qquad\\text{and}\\qquad m_1 a = m_1 g - T$$"}</MathD>
      <P2>On adding the two eqns, we get</P2>
      <MathD>{"$$\\boxed{a = \\frac{(m_1-m_0+bt)g + bv_0}{m_1+m_0-bt}}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-44" num="44" problem={"A uniform chain A'B' of length 2l having mass λ per unit length is hanging from ceiling of an elevator by two light, inextensible threads AA' and BB' of equal lengths as shown in fig. 1.134. Distance AB is very small. At a certain instant, the elevator starts ascending with constant acceleration a. Two seconds after the beginning of motion, thread BB' is burnt. Calculate tension in thread AA' at time t."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_717D2EA8EE6EA5092DB1} caption="FIGURE 1.134" />
      <SolHd />
      <P2>We shall solve the problem in the frame of elevator where the effective gravity can be taken as {"$g' = g + a$"}.</P2>
      <P2>In time {"$t$"}, the end {"$B'$"} falls by {"$y = (1/2)g't^2$"}. The mass of the chain on the left side is now</P2>
      <MathD>{"$$m = \\lambda\\left(l + \\frac{y}{2}\\right) = \\lambda\\left(l + \\frac{1}{4}g't^2\\right)$$"}</MathD>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_D1C967AE7AA513927017} caption="FIGURE 1.135" />
      <P2>Rate of increase of mass on the left side is {"$\\dfrac{dm}{dt} = \\dfrac{\\lambda}{2}g't$"}.</P2>
      <P2>Change in velocity of the links that transfers from right to left is {"$v_{\\text{incr}} = g't$"}.</P2>
      <P2>Now, {"$T - mg' = m\\dfrac{dv}{dt} + v_{\\text{incr}}\\dfrac{dm}{dt} = 0 + g't\\times\\dfrac{\\lambda}{2}g't$"}</P2>
      <MathD>{"$$\\begin{aligned} \\therefore\\; T &= mg' + \\frac{\\lambda}{2}g'^2t^2 = \\lambda\\left[l+\\frac{1}{4}g't^2\\right]g' + \\frac{\\lambda}{2}g'^2t^2 \\\\ &= \\lambda l g' + \\frac{3}{4}\\lambda g'^2 t^2 = \\boxed{\\lambda l(g+a) + \\frac{3}{4}\\lambda(g+a)^2 t^2} \\end{aligned}$$"}</MathD>
    </ExBox>

    <ExBox key="l2-ex-45" num="45" problem={"The end of a chain of length L and mass ρ per unit length that is piled on a platform is lifted vertically with a constant velocity v by a variable force P. (a) Find P as a function of the height x of the end above the platform. (b) Find the energy lost during lifting of the complete chain."}>
      <Fig src={CONTENT_IMAGES.CONTENT_IMAGE_E5E7BB037178444A02B8} caption="FIGURE 1.136" />
      <SolHd />
      <P2>(a) Consider the part of chain which has been lifted by height {"$x$"}. Its mass is {"$m = \\rho x$"}. For this part of chain,</P2>
      <MathD>{"$$P - mg = m\\frac{dv}{dt} + v_{\\text{incr}}\\frac{dm}{dt} = 0 + v\\frac{d}{dt}(\\rho x) = \\rho v^2$$"}</MathD>
      <MathD>{"$$\\therefore\\quad \\boxed{P = mg + \\rho v^2 = \\rho xg + \\rho v^2 = \\rho(xg+v^2)}$$"}</MathD>
      <P2>(b) When the entire chain has been lifted, work done</P2>
      <MathD>{"$$W = \\int_0^L P\\,dx = \\int_0^L \\rho(xg+v^2)\\,dx = \\frac{\\rho g L^2}{2} + \\rho v^2 L$$"}</MathD>
      <P2>Increase in PE, {"$\\Delta U = (\\rho L)g\\dfrac{L}{2} = \\rho g\\dfrac{L^2}{2}$"}</P2>
      <P2>Increase in KE, {"$\\Delta K = \\dfrac{1}{2}(\\rho L)v^2 = \\dfrac{\\rho Lv^2}{2}$"}</P2>
      <P2>Therefore, energy lost during lifting,</P2>
      <MathD>{"$$E_{\\text{Loss}} = W - (\\Delta U + \\Delta K) = \\left(\\frac{\\rho gL^2}{2} + \\rho v^2 L\\right) - \\left(\\frac{\\rho gL^2}{2} + \\frac{\\rho Lv^2}{2}\\right) = \\boxed{\\frac{1}{2}\\rho Lv^2}$$"}</MathD>
    </ExBox>
  </>
);

// ─── EXPORT ───
export default function PhysicsChapter1AppBoosterL2() {
  useFonts();
  return (
    <div style={{
      background: "#fff", minHeight: "100vh",
      fontFamily: "'Lora',Georgia,serif",
      fontSize: 16, lineHeight: 1.58, color: "#1a1a1a",
    }}>
      <div style={{ padding: "0 clamp(14px, 4vw, 28px) 60px clamp(14px, 4vw, 28px)", overflowX: "hidden" }}>
        <AppBoosterHeader />
        {allContent}
      </div>
    </div>
  );
}
