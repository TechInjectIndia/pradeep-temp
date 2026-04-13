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
    st.textContent = ".katex,.katex-display{font-size:1em}.katex .mathnormal,.katex .mathit{font-family:'Times New Roman',Times,serif!important}";
    document.head.appendChild(st);
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js";
    s.onload = () => {
      const a = document.createElement("script");
      a.src = "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js";
      a.onload = () => {
        if (window.renderMathInElement) {
          window.renderMathInElement(document.body, {
            delimiters:[{left:"$$",right:"$$",display:true},{left:"$",right:"$",display:false},{left:"\\(",right:"\\)",display:false},{left:"\\[",right:"\\]",display:true}],
            throwOnError:false
          });
        }
      };
      document.head.appendChild(a);
    };
    document.head.appendChild(s);
  }, []);
}

const P2 = ({ children, style }) => (
  <p style={{ margin:"0 0 11px", textAlign:"justify", ...style }}>{children}</p>
);
const DM = ({ children }) => (
  <div style={{ textAlign:"center", margin:"14px 4px", fontSize:"15.5px", lineHeight:2.2,
    fontFamily:"'Times New Roman',Times,serif", overflowX:"auto", overflowY:"hidden",
    maxWidth:"100%", WebkitOverflowScrolling:"touch" }}>{children}</div>
);
const ExHd = ({ num, children }) => (
  <p style={{ margin:"20px 0 6px", lineHeight:1.55 }}>
    <span style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:800,
      fontSize:13.5, textTransform:"uppercase", color:"#1a1a1a", marginRight:6 }}>
      Example {num}.
    </span>
    <span style={{ fontWeight:600 }}>{children}</span>
  </p>
);
const SolHd = () => (
  <p style={{ fontWeight:700, color:P_COLOR, margin:"8px 0 4px",
    fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13.5 }}>
    Solution.
  </p>
);
const Fig = ({ src, num, caption }) => (
  <div style={{ margin:"18px auto", textAlign:"center", maxWidth:"90%" }}>
    <img src={src} alt={caption||num||"figure"}
      style={{ maxWidth:"100%", height:"auto", border:"1px solid #ddd", display:"block", margin:"0 auto" }}
      onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
    />
    <div style={{ display:"none", alignItems:"center", justifyContent:"center",
      border:"1.5px dashed #8b0a4e", background:"#f9eef4", minHeight:80,
      padding:"12px 20px", color:"#8b0a4e", fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{marginLeft:6}}>{src}</code>
    </div>
    {(num||caption) && (
      <p style={{ fontSize:12.5, color:"#444", fontStyle:"italic", margin:"6px auto 0", maxWidth:480, lineHeight:1.45 }}>
        {num && <strong style={{ color:"#8b0a4e", fontStyle:"normal" }}>{num}. </strong>}{caption}
      </p>
    )}
  </div>
);
const GraspGripBox = ({ children }) => (
  <div style={{ border:"1.5px solid #ccc", margin:"18px 0", background:"#fdf8ee" }}>
    <div style={{ textAlign:"center", padding:"10px 16px 4px" }}>
      <span style={{ fontFamily:"'Lora',Georgia,serif", fontWeight:700, fontStyle:"italic",
        fontSize:18, color:"#8b0a4e", letterSpacing:0.5 }}>
        Grasp &amp; Grip
      </span>
    </div>
    <div style={{ padding:"4px 18px 14px" }}>{children}</div>
  </div>
);

/* ── Hamburger, Backdrop, Sidebar ── */
function HamburgerBtn({ open, setOpen }) {
  const bar = { width:20, height:2.5, background:"#fff", borderRadius:2, transition:"all 0.25s" };
  return (
    <button onClick={() => setOpen(o => !o)} style={{
      position:"fixed", top:14, left:14, zIndex:1100, background:"#8b0a4e",
      border:"none", borderRadius:4, width:36, height:36, cursor:"pointer",
      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5, padding:0,
    }}>
      <span style={{...bar, transform:open?"translateY(7.5px) rotate(45deg)":"none"}}/>
      <span style={{...bar, opacity:open?0:1}}/>
      <span style={{...bar, transform:open?"translateY(-7.5px) rotate(-45deg)":"none"}}/>
    </button>
  );
}
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return <div onClick={onClick} style={{ position:"fixed", inset:0, zIndex:1050, background:"rgba(0,0,0,0.35)", cursor:"pointer" }}/>;
}
function Sidebar({ open, setOpen, tocItems }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ position:"fixed", top:0, left:0, zIndex:1080, width:open?260:0, height:"100vh",
      background:"#fff", borderRight:open?"2px solid #e8c0d8":"none",
      boxShadow:open?"3px 0 16px rgba(139,10,78,0.10)":"none",
      transition:"width 0.28s ease", overflowY:open?"auto":"hidden", overflowX:"hidden" }}>
      <div style={{ width:260, padding:"56px 0 20px" }}>
        <div style={{ padding:"0 16px 8px", fontFamily:"'Merriweather Sans',Arial,sans-serif",
          fontWeight:800, fontSize:12, color:"#8b0a4e", letterSpacing:1, textTransform:"uppercase",
          borderBottom:"1.5px solid #e8c0d8", marginBottom:8 }}>
          Contents
        </div>
        <nav>
          {tocItems.map(item => (
            <div key={item.id}
              onClick={() => { document.getElementById(item.id)?.scrollIntoView({behavior:"smooth"}); setOpen(false); }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor:"pointer", padding:item.level===1?"6px 16px":"4px 26px",
                fontFamily:"'Merriweather Sans',Arial,sans-serif",
                fontWeight:item.level===1?700:400, fontSize:item.level===1?12:11,
                color:item.level===1?"#8b0a4e":"#444", borderLeft:item.level===1?"3px solid #8b0a4e":"none",
                background:hovered===item.id?"#f9eef4":"transparent", marginBottom:2, lineHeight:1.4 }}>
              {item.title}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

const AppBoosterCover = () => (
  <div style={{ marginBottom:8 }}>
    <div style={{ background:"linear-gradient(135deg,#3a1060 0%,#6a2080 35%,#a05090 70%,#c090b0 100%)",
      padding:"28px 24px 24px", textAlign:"center" }}>
      <div style={{ display:"inline-block", borderTop:"2.5px solid rgba(255,255,255,0.5)",
        borderBottom:"2.5px solid rgba(255,255,255,0.5)", padding:"10px 0" }}>
        <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900,
          fontSize:32, color:"#fff", letterSpacing:1, lineHeight:1.2 }}>
          Application Booster{" "}
          <span style={{ fontStyle:"italic", color:"#f0d0ff" }}>– Level 2</span>
        </div>
        <div style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700,
          fontSize:15, color:"rgba(255,255,255,0.85)", letterSpacing:2,
          textTransform:"uppercase", marginTop:6 }}>
          [Challenging Solved Examples]
        </div>
      </div>
    </div>
    <div style={{ height:4, background:"linear-gradient(90deg,#8b0a4e,#c0408a,#8b0a4e)" }}/>
  </div>
);

const TOC = [
  {id:"ex-1",title:"Example 1 — Angular momentum: projectile at t=v₀/g",level:1},
  {id:"ex-2",title:"Example 2 — Almirah door on two hinges",level:1},
  {id:"ex-3",title:"Example 3 — Rod hinged at end, released from horizontal",level:1},
  {id:"ex-4",title:"Example 4 — Rod on inclined plane against wall",level:1},
  {id:"ex-5",title:"Example 5 — Ladder against smooth wall",level:1},
  {id:"ex-6",title:"Example 6 — Rod with 1/8 length on table",level:1},
  {id:"ex-7",title:"Example 7 — Rod in equilibrium with string",level:1},
  {id:"ex-8",title:"Example 8 — Min friction to lift rod from floor",level:1},
  {id:"ex-9",title:"Example 9 — Rod lean without slipping (two friction surfaces)",level:1},
  {id:"ex-10",title:"Example 10 — Billiard ball: sharp impulse at height h",level:1},
  {id:"ex-11",title:"Example 11 — Cotton reel on smooth surface",level:1},
  {id:"ex-12",title:"Example 12 — Sphere placed with spin ω₀, no initial velocity",level:1},
  {id:"ex-13",title:"Example 13 — Cylinder on rough surface with initial speed v₀",level:1},
  {id:"ex-14",title:"Example 14 — Billiards ball: show h = 4R/5",level:1},
  {id:"ex-15",title:"Example 15 — Ball impulse at 45°, parts (a)–(f)",level:1},
  {id:"ex-16",title:"Example 16 — Rod AB: end A pulled at constant v₀",level:1},
  {id:"ex-17",title:"Example 17 — Two cylinders with wound threads",level:1},
  {id:"ex-18",title:"Example 18 — Cylinder with wound cord, angular acceleration vs x",level:1},
  {id:"ex-19",title:"Example 19 — Sphere on inclined plane with dense particle at B",level:1},
  {id:"ex-20",title:"Example 20 — Descending disc-shaped pulley",level:1},
  {id:"ex-21",title:"Example 21 — Bar AB suspended from cart",level:1},
  {id:"ex-22",title:"Example 22 — Cotton reel on table, force F at free end of thread",level:1},
  {id:"ex-23",title:"Example 23 — Cylinder on accelerating wedge, min friction",level:1},
  {id:"ex-24",title:"Example 24 — Man pushes cylinder with plank",level:1},
  {id:"ex-25",title:"Example 25 — String on rolling cylinder over pulley to block",level:1},
  {id:"ex-26",title:"Example 26 — Ball bouncing off smooth wall (restitution e=0.7)",level:1},
  {id:"ex-27",title:"Example 27 — Disc on rough plank, pure rolling",level:1},
  {id:"ex-28",title:"Example 28 — Hoop with reverse spin",level:1},
  {id:"ex-29",title:"Example 29 — Cylinder on trolley at angle θ",level:1},
  {id:"ex-30",title:"Example 30 — Block on pulley with radii R and 2R",level:1},
  {id:"ex-31",title:"Example 31 — Plank and sphere: time to pure rolling",level:1},
  {id:"ex-32",title:"Example 32 — Cylinder in corner, μk friction",level:1},
  {id:"ex-33",title:"Example 33 — Large roller over small roller",level:1},
  {id:"ex-34",title:"Example 34 — Spool on incline, thread to wall",level:1},
  {id:"ex-35",title:"Example 35 — Spool on incline, thread to hanging block",level:1},
  {id:"ex-36",title:"Example 36 — Sphere rolling in circle, KE",level:1},
  {id:"ex-37",title:"Example 37 — Disc + particle rotating about chord PQ",level:1},
  {id:"ex-38",title:"Example 38 — Rod pivoted at O: optimal x for max ω",level:1},
  {id:"ex-39",title:"Example 39 — Cylinder rolling over edge onto incline",level:1},
  {id:"ex-40",title:"Example 40 — Cylinder rolling off block edge",level:1},
  {id:"ex-41",title:"Example 41 — Cylinder with tape, pulley and hanging block",level:1},
  {id:"ex-42",title:"Example 42 — Vertical rod falling: A loses contact",level:1},
  {id:"ex-43",title:"Example 43 — Bar AB from vertical, reaction at pivot",level:1},
  {id:"ex-44",title:"Example 44 — Rod slipping on smooth floor",level:1},
  {id:"ex-45",title:"Example 45 — Rod given impulse, CM translation per revolution",level:1},
  {id:"ex-46",title:"Example 46 — Ball collides elastically with rod on table",level:1},
  {id:"ex-47",title:"Example 47 — Combined rods A+B, object C sticks",level:1},
  {id:"ex-48",title:"Example 48 — Rod strikes peg P (restitution e)",level:1},
  {id:"ex-49",title:"Example 49 — Ball collides with hanging rod",level:1},
  {id:"ex-50",title:"Example 50 — Ball dropped, collides with hinged rod",level:1},
  {id:"ex-51",title:"Example 51 — Rod at angle θ dropped, elastic collision with floor",level:1},
  {id:"ex-52",title:"Example 52 — Block on incline: max h/b for sliding without toppling",level:1},
  {id:"ex-53",title:"Example 53 — Block on flat car, acceleration analysis",level:1},
  {id:"ex-54",title:"Example 54 — Cube toppling over obstacle",level:1},
  {id:"ex-55",title:"Example 55 — Solid cube: bullet embedded, topple condition",level:1},
  {id:"ex-56",title:"Example 56 — Square frame with spring and block",level:1},
];

const B = "https://cdn.mathpix.com/cropped/f3a63095-8f75-4f6b-8065-f675fcc793f2-";

const allContent = [

/* ── Ex 1 ── */
<div key="ex-1" id="ex-1">
<ExHd num={1}>A particle is projected at time {"$t=0$"} from a point {"$P$"} with a speed {"$v_0$"} at an angle of {"$45°$"} to the horizontal. Find the magnitude and the direction of the angular momentum of the particle about the point {"$P$"} at time {"$t = v_0/g$"}.</ExHd>
<SolHd/>
<P2>At time {"$t = v_0/g$"}, the position vector and velocity vector of the particle respectively are</P2>
<DM>{"$$\\begin{aligned} \\vec{r} &= \\vec{u}\\,t + \\tfrac{1}{2}\\vec{a}\\,t^2 = \\left(\\frac{v_0}{\\sqrt{2}}\\hat{i}+\\frac{v_0}{\\sqrt{2}}\\hat{j}\\right)\\frac{v_0}{g}+\\frac{1}{2}(-g\\hat{j})\\left(\\frac{v_0}{g}\\right)^{\\!2} = \\frac{v_0^2}{2g}\\left[\\sqrt{2}\\,\\hat{i}+(\\sqrt{2}-1)\\hat{j}\\right] \\\\ \\vec{v} &= \\vec{u}+\\vec{a}\\,t = \\left(\\frac{v_0}{\\sqrt{2}}\\hat{i}+\\frac{v_0}{\\sqrt{2}}\\hat{j}\\right)+(-g\\hat{j})\\frac{v_0}{g} = \\frac{v_0}{\\sqrt{2}}\\left[\\hat{i}-(\\sqrt{2}-1)\\hat{j}\\right] \\end{aligned}$$"}</DM>
<P2>The angular momentum of the particle about origin in this position is</P2>
<DM>{"$$\\begin{aligned} \\vec{L} &= \\vec{r}\\times m\\vec{v} = \\frac{v_0^2}{2g}\\left[\\sqrt{2}\\,\\hat{i}+(\\sqrt{2}-1)\\hat{j}\\right]\\times\\frac{mv_0}{\\sqrt{2}}\\left[\\hat{i}-(\\sqrt{2}-1)\\hat{j}\\right] \\\\ &= -\\frac{mv_0^3}{2\\sqrt{2}\\,g}\\left[\\sqrt{2}(\\sqrt{2}-1)+(\\sqrt{2}-1)\\right]\\hat{k} = \\boxed{-\\frac{mv_0^3}{2\\sqrt{2}\\,g}\\hat{k}} \\end{aligned}$$"}</DM>
</div>,

/* ── Ex 2 ── */
<div key="ex-2" id="ex-2">
<ExHd num={2}>The door of an almirah is 3 m high, 1 m wide and weighs 30 kg. The door is supported by two hinges situated at a distance of 0·5 m from the ends. If the magnitude of each force exerted by the hinges on the door is equal, find this magnitude.</ExHd>
<SolHd/>
<P2>From FBD along horizontal, {"$F_{AH} = F_{BH}$"} &nbsp;&nbsp; ...(1)</P2>
<P2>along vertical, {"$F_{AV} + F_{BV} = mg$"} &nbsp;&nbsp; ...(2)</P2>
<P2>The net torque about hinge {"$B$"} is zero</P2>
<Fig src={`${B}01.jpg?height=409&width=354&top_left_y=2047&top_left_x=431`} num="FIGURE 2.137"/>
<DM>{"$$\\Rightarrow \\quad mg \\times 0{\\cdot}5 = F_{AH} \\times 2 \\qquad \\therefore \\quad F_{AH} = mg/4 = 30\\times10/4 = 75\\text{ N}$$"}</DM>
<P2>Since, the magnitude of each force exerted by hinges is equal,</P2>
<DM>{"$$\\sqrt{F_{AH}^2+F_{AV}^2} = \\sqrt{F_{BH}^2+F_{BV}^2} \\qquad\\cdots(3)$$"}</DM>
<P2>From eqns. (1), (2) and (3), {"$F_{AV} = F_{BV} = mg/2 = 30\\times10/2 = 150$"} N.</P2>
<P2>The magnitude of force exerted by either hinge is</P2>
<DM>{"$$\\sqrt{F_{AH}^2+F_{AV}^2} = \\sqrt{75^2+150^2} = \\boxed{75\\sqrt{5}\\text{ N}}$$"}</DM>
</div>,

/* ── Ex 3 ── */
<div key="ex-3" id="ex-3">
<ExHd num={3}>A rod of mass {"$m$"} and length {"$l$"} is hinged about its one of the ends. The rod is released from horizontal position. When the rod becomes vertical, find</ExHd>
<P2>(<em>a</em>) angular speed of the rod &nbsp;&nbsp; (<em>b</em>) hinge reaction</P2>
<SolHd/>
<P2>In the vertical position, the reaction at the hinge is only in vertical direction. Let this be {"$T$"}.</P2>
<Fig src={`${B}01.jpg?height=435&width=460&top_left_y=1411&top_left_x=1289`} num="FIGURE 2.138"/>
<P2>(<em>a</em>) Applying conservation of mechanical energy between initial and final position, Loss in PE = Gain in KE</P2>
<DM>{"$$\\Rightarrow \\quad mg\\frac{L}{2} = \\frac{1}{2}\\left(\\frac{mL^2}{3}\\right)\\omega^2 \\qquad \\therefore \\quad \\boxed{\\omega = \\sqrt{\\frac{3g}{L}}}$$"}</DM>
<P2>(<em>b</em>) From F.B.D, we have</P2>
<DM>{"$$T - mg = m\\omega^2\\frac{L}{2} = m\\left(\\frac{3g}{L}\\right)\\frac{L}{2} \\qquad \\therefore \\boxed{T = \\frac{5}{2}mg}$$"}</DM>
</div>,

/* ── Ex 4 ── */
<div key="ex-4" id="ex-4">
<ExHd num={4}>At the bottom edge of a smooth wall, an inclined plane is kept at an angle of {"$45°$"}. A uniform rod of length {"$l$"} and mass {"$m$"} rests on the incline plane against the wall such that it is perpendicular to the incline.</ExHd>
<Fig src={`${B}02.jpg?height=319&width=257&top_left_y=234&top_left_x=476`} num="FIGURE 2.139"/>
<P2>(<em>a</em>) If the plane is also smooth, which way will the ladder slide?</P2>
<P2>(<em>b</em>) What is the minimum coefficient of friction necessary so that the ladder does not slip on the incline.</P2>
<SolHd/>
<P2>The ladder has a tendency to slip by rotating clockwise about the point {"$A$"}</P2>
<Fig src={`${B}02.jpg?height=300&width=411&top_left_y=824&top_left_x=399`} num="FIGURE 2.140"/>
<P2>(<em>a</em>) If the plane is smooth, the torque about centre of the rod is only due to {"$N_A$"} which is clockwise. So, the ladder will rotate clockwise.</P2>
<P2>(<em>b</em>) In case the plane is rough, and the ladder does not slip, from FBD:</P2>
<P2>along horizontal, {"$N_A + f\\cos 45° = N_B\\cos 45°$"} &nbsp;&nbsp; ...(1)</P2>
<P2>along vertical, {"$N_B\\sin 45° + f\\sin 45° = mg$"} &nbsp;&nbsp; ...(2)</P2>
<P2>Since the rod is in equilibrium, the net torque about {"$B$"} is zero.</P2>
<DM>{"$$\\Rightarrow \\quad N_A\\,l\\cos 45° = mg\\frac{l}{2}\\sin 45° \\qquad\\cdots(3)$$"}</DM>
<P2>From (1), (2) and (3), we have,</P2>
<DM>{"$$N_A = \\frac{mg}{2}, \\quad N_B = \\frac{3mg}{2\\sqrt{2}} \\quad \\text{and} \\quad f = \\frac{mg}{2\\sqrt{2}}$$"}</DM>
<P2>For no slipping, {"$f \\leq \\mu N_B$"}</P2>
<DM>{"$$\\Rightarrow \\frac{mg}{2\\sqrt{2}} \\leq \\frac{\\mu\\, 3mg}{2\\sqrt{2}} \\qquad \\therefore \\quad \\boxed{\\mu \\geq \\frac{1}{3}}$$"}</DM>
</div>,

/* ── Ex 5 ── */
<div key="ex-5" id="ex-5">
<ExHd num={5}>A ladder of mass {"$M$"} and length {"$L$"} is supported in equilibrium against a smooth vertical wall and a rough horizontal surface, as shown in fig. 2.141. If {"$\\theta$"} is the angle of inclination of the rod with the horizontal, then calculate</ExHd>
<Fig src={`${B}02.jpg?height=293&width=366&top_left_y=2077&top_left_x=423`} num="FIGURE 2.141"/>
<P2>(<em>a</em>) normal reaction of the wall on the ladder &nbsp; (<em>b</em>) normal reaction of the ground on the ladder</P2>
<P2>(<em>c</em>) friction force between the ground and the ladder &nbsp; (<em>d</em>) net force applied by the ground on the ladder</P2>
<SolHd/>
<P2>From FBD: along horizontal, {"$f = N_W$"} ...(1); along vertical, {"$N_G = Mg$"} ...(2)</P2>
<P2>Net torque about {"$A$"} is zero</P2>
<DM>{"$$\\Rightarrow \\quad Mg(L/2)\\cos\\theta = N_W L\\sin\\theta \\qquad\\cdots(3)$$"}</DM>
<Fig src={`${B}02.jpg?height=383&width=386&top_left_y=552&top_left_x=1325`} num="FIGURE 2.142"/>
<P2>(<em>a</em>) From (3), {"$\\boxed{N_W = \\dfrac{Mg\\cot\\theta}{2}}$"} &nbsp;&nbsp; (<em>b</em>) From (2), {"$N_G = Mg$"}</P2>
<P2>(<em>c</em>) From (1), {"$f = \\dfrac{Mg\\cot\\theta}{2}$"}</P2>
<P2>(<em>d</em>) Net force applied by ground on ladder is</P2>
<DM>{"$$\\sqrt{N_G^2+f^2}=\\sqrt{(Mg)^2+\\left(\\frac{Mg\\cot\\theta}{2}\\right)^{\\!2}}=\\frac{Mg}{2}\\sqrt{4+\\cot^2\\theta}$$"}</DM>
</div>,

/* ── Ex 6 ── */
<div key="ex-6" id="ex-6">
<ExHd num={6}>One eighth length of a uniform rod of length {"$2l$"} and mass {"$m$"} is placed on a horizontal table and the rod is held horizontal. The rod is released from rest. Find the normal reaction on the rod as soon as the rod is released.</ExHd>
<Fig src={`${B}02.jpg?height=220&width=592&top_left_y=1652&top_left_x=1224`} num="FIGURE 2.143"/>
<SolHd/>
<P2>Instantaneous axis of rotation passes through {"$O$"}. About {"$O$"},</P2>
<DM>{"$$I_0\\,\\alpha = mg(3l/4)$$"}</DM>
<Fig src={`${B}02.jpg?height=222&width=530&top_left_y=2071&top_left_x=1254`} num="FIGURE 2.144"/>
<DM>{"$$\\Rightarrow \\left[\\frac{m(2l)^2}{12}+m\\left(\\frac{3l}{4}\\right)^{\\!2}\\right]\\alpha = \\frac{3mgl}{4} \\qquad \\Rightarrow \\alpha = \\frac{36g}{43\\,l}$$"}</DM>
<DM>{"$$a_C - a_0 = \\alpha(3l/4) \\quad \\Rightarrow a - 0 = \\frac{36g}{43l}\\times\\frac{3l}{4} \\quad \\Rightarrow a = \\frac{27}{43}\\,g$$"}</DM>
<P2>From FBD, {"$ma = mg - N$"}</P2>
<DM>{"$$\\therefore \\quad N = m(g-a) = m\\left(g - \\frac{27}{43}g\\right) = \\boxed{\\frac{16}{43}\\,mg}$$"}</DM>
</div>,

/* ── Ex 7 ── */
<div key="ex-7" id="ex-7">
<ExHd num={7}>A uniform rod of mass {"$m$"} and length {"$l$"} is in equilibrium under the action of forces, gravity and tension in the string. Find the</ExHd>
<Fig src={`${B}03.jpg?height=280&width=321&top_left_y=672&top_left_x=446`} num="FIGURE 2.145"/>
<P2>(<em>a</em>) frictional force acting on the rod. &nbsp; (<em>b</em>) tension in the string. &nbsp; (<em>c</em>) normal reaction on the rod.</P2>
<P2>Now the string is cut. Find the &nbsp; (<em>d</em>) angular acceleration of the rod just after the string is cut &nbsp; (<em>e</em>) normal reaction on the rod just after the string is cut.</P2>
<SolHd/>
<P2>(<em>a</em>) Along the rod, {"$f = mg\\sin 60° = \\boxed{\\sqrt{3}\\,mg/2}$"}</P2>
<P2>(<em>b</em>) Torque about {"$P$"} is zero.</P2>
<DM>{"$$\\Rightarrow T(3l/4) = mg\\cos 60°\\,(l/4) \\qquad \\therefore \\quad \\boxed{T = mg/6}$$"}</DM>
<Fig src={`${B}03.jpg?height=376&width=372&top_left_y=1491&top_left_x=421`} num="FIGURE 2.146"/>
<P2>(<em>c</em>) Perpendicular to rod: {"$N + T = mg\\cos 60°$"}</P2>
<DM>{"$$\\Rightarrow N + mg/6 = mg/2 \\qquad \\therefore \\quad \\boxed{N = mg/3}$$"}</DM>
<P2>(<em>d</em>) Just after cutting the string, the rod does not slip. So, instantaneous axis of rotation passes through {"$P$"}. About {"$P$"},</P2>
<DM>{"$$mg\\cos 60°\\,(l/4)=\\left[\\frac{ml^2}{12}+m\\left(\\frac{l}{4}\\right)^{\\!2}\\right]\\alpha \\qquad \\therefore \\quad \\boxed{\\alpha = \\frac{6g}{7l}}$$"}</DM>
<P2>(<em>e</em>) Now, {"$N$"} will have different value. About {"$C$"},</P2>
<DM>{"$$N\\frac{l}{4} = I_C\\alpha = \\frac{ml^2}{12}\\times\\frac{6g}{7l} = \\frac{mgl}{14} \\qquad \\therefore \\quad \\boxed{N = 2mg/7}$$"}</DM>
</div>,

/* ── Ex 8 ── */
<div key="ex-8" id="ex-8">
<ExHd num={8}>Determine the minimum coefficient of friction {"$\\mu_{\\min}$"} between a thin homogeneous rod and a floor at which a person can slowly lift the rod from the floor without slippage to the vertical position, applying to it a force perpendicular to it.</ExHd>
<SolHd/>
<P2>As the rod is lifted slowly, it is in equilibrium at all instants. Let us consider an instant when the rod is inclined at an angle {"$\\alpha$"} to the horizontal.</P2>
<Fig src={`${B}03.jpg?height=321&width=388&top_left_y=550&top_left_x=1325`} num="FIGURE 2.147"/>
<P2>From FBD, {"$mg = F\\cos\\alpha + N$"} and {"$\\mu N = F\\sin\\alpha$"}</P2>
<DM>{"$$\\begin{aligned} & \\Rightarrow \\mu(mg - F\\cos\\alpha) = F\\sin\\alpha \\\\ & \\Rightarrow F = \\frac{\\mu\\,mg}{\\sin\\alpha + \\mu\\cos\\alpha} \\qquad\\text{...(1)} \\end{aligned}$$"}</DM>
<P2>Taking torque about point {"$A$"}, we have</P2>
<DM>{"$$FL = mg\\frac{L}{2}\\cos\\alpha \\quad \\Rightarrow \\quad F = \\frac{mg}{2}\\cos\\alpha \\qquad\\text{...(2)}$$"}</DM>
<P2>From (1) and (2),</P2>
<DM>{"$$\\begin{aligned} & \\Rightarrow 2\\mu = \\cos\\alpha(\\sin\\alpha + \\mu\\cos\\alpha) \\\\ & \\Rightarrow \\mu = \\frac{\\cos\\alpha\\sin\\alpha}{2-\\cos^2\\alpha} = \\frac{\\sin 2\\alpha}{3-\\cos 2\\alpha} \\end{aligned}$$"}</DM>
<P2>{"$\\mu$"} is minimum when {"$\\dfrac{d\\mu}{d\\alpha}=0$"}</P2>
<DM>{"$$\\Rightarrow \\cos 2\\alpha = 1/3 \\qquad \\Rightarrow \\sin 2\\alpha = 2\\sqrt{2}/3$$"}</DM>
<DM>{"$$\\therefore \\quad \\mu_{\\min} = \\frac{2\\sqrt{2}/3}{3-1/3} = \\boxed{\\frac{1}{2\\sqrt{2}}}$$"}</DM>
</div>,

/* ── Ex 9 ── */
<div key="ex-9" id="ex-9">
<ExHd num={9}>A uniform rod is made to lean between a rough vertical wall and the ground. Show that the least angle at which the rod can be leaned without slipping is given by {"$\\theta = \\tan^{-1}\\!\\left(\\dfrac{1-\\mu_1\\mu_2}{2\\mu_2}\\right)$"} where {"$\\mu_1$"} is the coefficient of friction between rod and wall, {"$\\mu_2$"} is the coefficient of friction between rod and ground.</ExHd>
<SolHd/>
<P2>Let {"$m$"} be the mass and {"$L$"} be the length of the rod. When the rod is about to slip, the acceleration of the rod is zero and friction forces are {"$\\mu N_1$"} and {"$\\mu N_2$"}.</P2>
<Fig src={`${B}04.jpg?height=385&width=382&top_left_y=236&top_left_x=416`} num="FIGURE 2.148"/>
<P2>Since the rod is in equilibrium: along vertical, {"$N_2 + \\mu_1 N_1 = mg$"}; along horizontal, {"$N_1 = \\mu_2 N_2$"}</P2>
<DM>{"$$\\Rightarrow \\quad N_2 = \\frac{mg}{1+\\mu_1\\mu_2} \\qquad\\text{...(1)}$$"}</DM>
<P2>The net torque about {"$A$"} is zero.</P2>
<DM>{"$$\\begin{aligned} & \\Rightarrow N_2\\,l\\cos\\theta = \\mu_2 N_2\\,l\\sin\\theta + mg\\frac{l}{2}\\cos\\theta \\\\ & \\Rightarrow N_2 = \\frac{mg\\cos\\theta}{2(\\cos\\theta - \\mu_2\\sin\\theta)} \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
<P2>From eqns. (1) and (2), we have</P2>
<DM>{"$$\\begin{aligned} & \\frac{mg}{1+\\mu_1\\mu_2} = \\frac{mg\\cos\\theta}{2(\\cos\\theta-\\mu_2\\sin\\theta)} \\\\ \\Rightarrow \\quad & 2(1-\\mu_2\\tan\\theta) = 1+\\mu_1\\mu_2 \\\\ \\Rightarrow \\quad & \\tan\\theta = \\frac{1-\\mu_1\\mu_2}{2\\mu_2} \\qquad \\therefore \\quad \\theta = \\tan^{-1}\\!\\left(\\frac{1-\\mu_1\\mu_2}{2\\mu_2}\\right) \\end{aligned}$$"}</DM>
</div>,

/* ── Ex 10 ── */
<div key="ex-10" id="ex-10">
<ExHd num={10}>A billiard ball of mass {"$m$"} and radius {"$r$"} initially at rest, is given sharp impulse by rod. The rod is held horizontally at a height {"$h$"} above the centre of the ball. The ball immediately begins to roll without slipping after the impact. Calculate the height {"$h$"} in terms of the radius of the ball.</ExHd>
<SolHd/>
<Fig src={`${B}04.jpg?height=377&width=390&top_left_y=1718&top_left_x=386`} num="FIGURE 2.149"/>
<P2>Let {"$J$"} be the impulse given to the ball. Force {"$mg$"}, {"$N$"} and {"$f$"} being finite will not provide impulse.</P2>
<P2>Now, Impulse = change in momentum</P2>
<DM>{"$$\\Rightarrow \\quad J = mv - 0 = mv \\qquad\\text{...(1)}$$"}</DM>
<P2>Angular impulse about CM = change in angular momentum about CM {"$\\Rightarrow Jh = I\\omega - 0$"}</P2>
<P2>Since, the ball begins to roll without slipping after the impact, we have {"$\\omega = v/r$"}</P2>
<DM>{"$$\\Rightarrow \\quad Jh = \\left(\\frac{2}{5}mr^2\\right)\\left(\\frac{v}{r}\\right) = \\frac{2}{5}mvr \\qquad\\text{...(2)}$$"}</DM>
<P2>From eqns. (1) and (2), we get {"$\\boxed{h = \\dfrac{2}{5}r}$"}</P2>
</div>,

/* ── Ex 11 ── */
<div key="ex-11" id="ex-11">
<ExHd num={11}>A cotton reel of mass {"$m$"} and moment of inertia {"$I$"} is kept at rest on a smooth horizontal surface. The reel has inner and outer radius {"$r$"} and {"$R$"} respectively. A horizontal force {"$F$"} starts acting as shown in fig. 2.150. Find the</ExHd>
<Fig src={`${B}04.jpg?height=239&width=344&top_left_y=640&top_left_x=1349`} num="FIGURE 2.150"/>
<P2>(<em>a</em>) acceleration of the centre of mass of reel. &nbsp; (<em>b</em>) angular acceleration of the reel &nbsp; (<em>c</em>) net acceleration of point of contact.</P2>
<SolHd/>
<P2>The only force acting in horizontal direction is {"$F$"}.</P2>
<Fig src={`${B}04.jpg?height=354&width=296&top_left_y=1138&top_left_x=1370`} num="FIGURE 2.151"/>
<P2>From FBD, {"$ma = F$"} {"$\\therefore a = F/m$"}</P2>
<P2>About {"$O$"}, {"$I\\alpha = Fr$"} {"$\\therefore \\alpha = Fr/I$"}</P2>
<DM>{"$$a_0 - a_p = R\\alpha \\quad \\Rightarrow a - a_p = R(Fr/I) \\qquad \\therefore \\quad \\boxed{a_P = a - FRr/I}$$"}</DM>
</div>,

/* ── Ex 12 ── */
<div key="ex-12" id="ex-12">
<ExHd num={12}>A solid sphere of radius {"$r$"} is gently placed on a rough horizontal ground with an initial angular speed {"$\\omega_0$"} and no linear velocity. If the coefficient of friction is {"$\\mu$"}, find the linear velocity {"$v$"} and angular velocity {"$\\omega$"} when the slipping stops.</ExHd>
<Fig src={`${B}04.jpg?height=190&width=414&top_left_y=2000&top_left_x=1312`} num="FIGURE 2.152"/>
<SolHd/>
<P2>Since the point of contact of sphere will slip backwards, the friction will act forward. This friction will accelerate the sphere and its velocity will increase. However, this friction will provide angular retardation and its angular velocity will decrease. After some time, we have a situation when {"$v = \\omega r$"} and thereafter, the sphere will stop slipping and start rolling.</P2>
<Fig src={`${B}05.jpg?height=398&width=388&top_left_y=249&top_left_x=412`} num="FIGURE 2.153"/>
<P2>From F.B.D, {"$\\mu N = ma \\Rightarrow \\mu mg = ma \\Rightarrow a = \\mu g$"}</P2>
<P2>About the centre {"$C$"} of sphere, {"$-\\mu Nr = I\\alpha$"}</P2>
<DM>{"$$\\Rightarrow -\\mu mgr = \\frac{2}{5}(mr^2)\\alpha \\quad \\Rightarrow \\quad \\alpha = -\\frac{5}{2}\\frac{\\mu g}{r}$$"}</DM>
<P2>If the sphere starts rolling after time {"$t$"}, then at this instant:</P2>
<DM>{"$$v = at = \\mu gt \\qquad\\text{...(1)}$$"}</DM>
<DM>{"$$\\omega = \\omega_0 + \\alpha t = \\omega_0 - \\frac{5}{2}\\frac{\\mu g}{r}\\,t \\quad \\Rightarrow \\quad v = \\omega r = \\omega_0 r - \\frac{5}{2}\\mu g\\,t \\qquad\\text{...(2)}$$"}</DM>
<P2>From eqns. (1) and (2): {"$v = \\omega_0 r - \\dfrac{5}{2}v$"}</P2>
<DM>{"$$\\therefore \\quad \\boxed{v = \\frac{2}{7}\\omega_0 r} \\qquad \\text{and} \\qquad \\boxed{\\omega = \\frac{2}{7}\\omega_0}$$"}</DM>
<P2 style={{fontWeight:700, color:P_COLOR}}>Alternate Solution</P2>
<P2>All forces {"$mg$"}, {"$N$"} and {"$\\mu N$"} pass through the bottom most point {"$B$"}. Hence, about this point, torque is zero and therefore, angular momentum is conserved.</P2>
<DM>{"$$L_{\\text{initial}} = I_C\\omega_0 = \\frac{2}{5}mr^2\\omega_0$$"}</DM>
<DM>{"$$L_{\\text{final}} = I_C\\omega + mvr = \\frac{2}{5}mr^2\\omega + m(\\omega r)r$$"}</DM>
<DM>{"$$\\Rightarrow \\frac{2}{5}mr^2\\omega_0 = \\frac{2}{5}mr^2\\omega + m(\\omega r)r \\qquad \\therefore \\quad \\boxed{\\omega = \\frac{2}{7}\\omega_0} \\quad v = \\omega r = \\frac{2}{7}\\omega_0 r$$"}</DM>
</div>,

/* ── Ex 13 ── */
<div key="ex-13" id="ex-13">
<ExHd num={13}>A cylinder of mass {"$m$"} and radius {"$r$"} is kept on a rough surface after giving its centre a horizontal speed {"$v_0$"}. The coefficient of kinetic friction is {"$\\mu$"}.</ExHd>
<P2>(<em>a</em>) Find the speed of the centre of the cylinder when it stops slipping.</P2>
<P2>(<em>b</em>) How much kinetic energy is lost before it starts rolling.</P2>
<SolHd/>
<Fig src={`${B}05.jpg?height=405&width=725&top_left_y=279&top_left_x=1155`} num="FIGURE 2.154"/>
<P2>(<em>a</em>) When rolling starts, {"$v = \\omega r$"}. Since, all forces pass through point {"$A$"}, torque about {"$A$"} is zero and hence, angular momentum about {"$A$"} is conserved.</P2>
<DM>{"$$\\Rightarrow L_{\\text{initial}} = L_{\\text{final}} \\quad \\Rightarrow \\quad mv_0 r = I_C\\omega + mvr = \\frac{mr^2}{2}\\cdot\\frac{v}{r}+mvr \\qquad \\therefore \\boxed{v = \\frac{2}{3}v_0}$$"}</DM>
<P2>(<em>b</em>) The loss in kinetic energy is</P2>
<DM>{"$$\\frac{1}{2}mv_0^2 - \\left[\\frac{1}{2}mv^2 + \\frac{1}{2}\\left(\\frac{mr^2}{2}\\right)\\left(\\frac{v}{r}\\right)^{\\!2}\\right] = \\frac{1}{2}mv_0^2 - \\frac{3}{4}m\\left(\\frac{2}{3}v_0\\right)^{\\!2} = \\boxed{\\frac{1}{6}mv_0^2}$$"}</DM>
</div>,

/* ── Ex 14 ── */
<div key="ex-14" id="ex-14">
<ExHd num={14}>A billiards ball, initially at rest is given a sharp impulse by a cue. The cue is held a distance {"$h$"} above centre line (see fig. 2.155). The ball leaves the cue with a speed {"$v_0$"} and acquires a final speed of {"$9v_0/7$"}. Show that {"$h = 4R/5$"} where, {"$R$"} is the radius of ball.</ExHd>
<Fig src={`${B}05.jpg?height=223&width=452&top_left_y=1516&top_left_x=1293`} num="FIGURE 2.155"/>
<SolHd/>
<P2>Let {"$J$"} be the impulse given to the ball. Then, the initial velocity and the initial angular velocity of the ball are given by</P2>
<DM>{"$$v_{cm} = v_0 = \\frac{J}{M} \\qquad \\text{and} \\qquad \\omega = \\frac{Jh}{(2/5)MR^2} \\quad \\Rightarrow \\quad \\omega = \\frac{5v_0 h}{2R^2}$$"}</DM>
<P2>After the application of impulse, angular momentum about {"$O$"} will be conserved.</P2>
<DM>{"$$\\begin{aligned} & \\Rightarrow L_{\\text{initial}} = L_{\\text{final}} \\\\ & \\Rightarrow I_{cm}\\omega + Mv_0 R = I_{cm}\\frac{v}{R}+MvR \\quad \\text{where}\\; v = \\frac{9v_0}{7} \\\\ & \\Rightarrow \\frac{2}{5}MR^2\\left(\\frac{5v_0 h}{2R^2}\\right)+Mv_0 R = \\left(\\frac{2}{5}\\frac{MR^2}{R}+MR\\right)\\frac{9v_0}{7} \\\\ & \\Rightarrow Mh + MR = \\frac{9}{5}MR \\qquad \\therefore \\quad h = \\frac{4}{5}R \\end{aligned}$$"}</DM>
</div>,

/* ── Ex 15 ── */
<div key="ex-15" id="ex-15">
<ExHd num={15}>{"$AB$"} is a horizontal diameter of a ball of mass {"$m = 0{\\cdot}4$"} kg and radius {"$R = 0{\\cdot}10$"} m. At time {"$t = 0$"}, a sharp impulse is applied at {"$B$"} at an angle of {"$45°$"} with the horizontal, as shown in fig. 2.156, so that the ball immediately starts to move with velocity {"$v_0 = 10\\text{ ms}^{-1}$"} {"$(g = 10\\text{ ms}^{-2})$"}.</ExHd>
<Fig src={`${B}06.jpg?height=236&width=409&top_left_y=446&top_left_x=401`} num="FIGURE 2.156"/>
<P2>(<em>a</em>) Calculate the impulse and angular velocity of ball just after impulse is provided. If coefficient of kinetic friction between the floor and the ball is {"$\\mu = 0{\\cdot}1$"}, calculate the</P2>
<P2>(<em>b</em>) velocity of ball when it stops sliding, &nbsp; (<em>c</em>) time {"$t$"} at that instant,</P2>
<P2>(<em>d</em>) horizontal distance travelled by the ball up to that instant,</P2>
<P2>(<em>e</em>) angular displacement of the ball about horizontal diameter perpendicular to {"$AB$"}, up to that instant, and</P2>
<P2>(<em>f</em>) energy lost due to friction</P2>
<SolHd/>
<P2>As the impulse is applied at an angle, there will also be impulse {"$J'$"} and {"$\\mu J'$"} due to floor as shown in the fig. 2.157.</P2>
<Fig src={`${B}06.jpg?height=334&width=444&top_left_y=1224&top_left_x=386`} num="FIGURE 2.157"/>
<P2>(<em>a</em>) Along vertical, {"$J' = J/\\sqrt{2}$"}</P2>
<P2>Along horizontal,</P2>
<DM>{"$$\\frac{J}{\\sqrt{2}} - \\mu J' = mv_0 \\quad \\Rightarrow \\frac{J}{\\sqrt{2}}(1-\\mu) = mv_0 \\quad \\therefore J = \\frac{\\sqrt{2}\\,mv_0}{1-\\mu} = \\frac{\\sqrt{2}\\times0{\\cdot}4\\times10}{1-0{\\cdot}2} = \\boxed{5\\sqrt{2}\\text{ Ns}}$$"}</DM>
<P2>About centre {"$C$"},</P2>
<DM>{"$$\\frac{J}{\\sqrt{2}}R - \\mu J'R = I_C\\omega_0 \\quad \\Rightarrow \\frac{J}{\\sqrt{2}}R(1-\\mu) = \\frac{2}{5}mR^2\\omega_0$$"}</DM>
<DM>{"$$\\therefore \\omega_0 = \\frac{5J(1-\\mu)}{2\\sqrt{2}\\,mR} = \\frac{5\\times5\\sqrt{2}(1-0{\\cdot}2)}{2\\sqrt{2}\\times0{\\cdot}4\\times0{\\cdot}1} = \\boxed{250\\text{ rad s}^{-1}}$$"}</DM>
<P2>(<em>b</em>) After the ball starts moving, angular momentum about point of contact {"$P$"} is conserved.</P2>
<DM>{"$$mv_0 R - I_C\\omega_0 = I_P(v/R) \\quad \\Rightarrow mv_0 R - \\frac{2}{5}mR^2\\omega_0 = \\frac{7}{5}mR^2\\cdot\\frac{v}{R}$$"}</DM>
<DM>{"$$\\Rightarrow v = \\frac{5v_0-2\\omega_0 R}{7} = \\frac{5\\times10-2\\times250\\times0{\\cdot}1}{7} \\qquad \\therefore \\quad \\boxed{v = 0}$$"}</DM>
<P2>(<em>c</em>) The acceleration of ball upto this instant is</P2>
<DM>{"$$a = \\frac{-\\mu mg}{m} = -\\mu g = -0{\\cdot}2\\times10 = -2\\text{ ms}^{-2} \\qquad \\therefore \\quad t = \\frac{v-v_0}{a} = \\frac{0-10}{-2} = \\boxed{5\\text{ s}}$$"}</DM>
<P2>(<em>d</em>) Horizontal distance travelled by ball upto this instant is</P2>
<DM>{"$$s = v_0 t + \\frac{1}{2}at^2 = 10\\times5+\\frac{1}{2}(-2)\\times5^2 = \\boxed{25\\text{ m}}$$"}</DM>
<P2>(<em>e</em>) Energy lost due to friction is</P2>
<DM>{"$$E_{\\text{Loss}} = E_i - E_f = \\frac{1}{2}mv_0^2 + \\frac{1}{2}I_c\\omega_0^2 - 0$$"}</DM>
<DM>{"$$= \\frac{1}{2}\\times0{\\cdot}4\\times10^2 + \\frac{1}{2}\\times\\left(\\frac{2}{5}\\times0{\\cdot}4\\times0{\\cdot}1^2\\right)\\times250^2 = \\boxed{70\\text{ J}}$$"}</DM>
</div>,

/* ── Ex 16 ── */
<div key="ex-16" id="ex-16">
<ExHd num={16}>The end {"$A$"} of the rod {"$AB$"} is being pulled on the floor with a constant velocity {"$v_0$"} as shown in fig. 2.158. Taking the length of the rod as {"$L$"}, calculate (at the instant when {"$\\theta = 37°$"})</ExHd>
<P2>(<em>a</em>) the velocity of end {"$B$"} &nbsp; (<em>b</em>) the angular velocity of the rod &nbsp; (<em>c</em>) the velocity of CM of the rod.</P2>
<Fig src={`${B}06.jpg?height=306&width=499&top_left_y=1370&top_left_x=1265`} num="FIGURE 2.158"/>
<SolHd/>
<P2>Let {"$OA = x$"} and {"$OB = y$"}. Then, {"$x^2 + y^2 = L^2$"}</P2>
<P2>(<em>a</em>) Differentiating w.r.t. time,</P2>
<DM>{"$$2x\\frac{dx}{dt}+2y\\frac{dy}{dt}=0 \\quad \\Rightarrow \\frac{dy}{dt}=-\\frac{x}{y}\\frac{dx}{dt}=-(\\cot\\theta)v_0 = -\\frac{4}{3}v_0$$"}</DM>
<P2>Therefore, velocity of end {"$B$"} is {"$\\boxed{\\dfrac{4}{3}v_0}$"} downwards</P2>
<P2>(<em>b</em>) Differentiating {"$x = L\\cos\\theta$"} w.r.t. time,</P2>
<DM>{"$$\\frac{dx}{dt} = -L\\sin\\theta\\frac{d\\theta}{dt} \\quad \\Rightarrow \\quad \\omega = \\frac{d\\theta}{dt} = -\\frac{v_0}{L\\sin\\theta}$$"}</DM>
<P2>(-ve sign indicates that {"$\\theta$"} is decreasing) {"$\\therefore \\quad |\\omega| = \\boxed{\\dfrac{5v_0}{3L}}$"}</P2>
<P2>(<em>c</em>) Velocity of CM is {"$\\vec{v}_{CM} = \\dfrac{v_0}{2}\\hat{i} - \\dfrac{2}{3}v_0\\hat{j}$"}</P2>
<DM>{"$$\\therefore\\; |\\vec{v}_{CM}| = \\sqrt{\\left(\\frac{v_0}{2}\\right)^{\\!2}+\\left(\\frac{2}{3}v_0\\right)^{\\!2}} = \\boxed{\\frac{5}{6}v_0}$$"}</DM>
<Fig src={`${B}07.jpg?height=296&width=496&top_left_y=476&top_left_x=360`} num="FIGURE 2.159"/>
<P2>As can be seen from fig. 2.159, the instantaneous axis of rotation passes through {"$O$"}.</P2>
<DM>{"$$|\\omega| = \\frac{v_A}{L\\sin\\theta} = \\frac{v_0}{3L/5} = \\frac{5v_0}{3L}, \\quad v_B = \\omega L\\cos\\theta = \\frac{4}{3}v_0\\text{ downwards}, \\quad v_{CM} = \\omega\\frac{L}{2} = \\frac{5}{3L}v_0$$"}</DM>
</div>,

/* ── Ex 17 ── */
<div key="ex-17" id="ex-17">
<ExHd num={17}>The arrangement shown in fig. 2.160, consists of two identical, uniform, solid cylinders, each of mass {"$m$"}, on which two light threads are wound symmetrically. Find the tensions of each thread in the process of motion. The friction in the axle of the upper cylinder is assumed to be absent.</ExHd>
<Fig src={`${B}07.jpg?height=438&width=362&top_left_y=1503&top_left_x=425`} num="FIGURE 2.160"/>
<SolHd/>
<P2>For upper pulley, {"$2Tr = \\dfrac{mr^2}{2}\\alpha_1$"}</P2>
<Fig src={`${B}07.jpg?height=373&width=216&top_left_y=2109&top_left_x=502`} num="FIGURE 2.161"/>
<DM>{"$$\\Rightarrow \\alpha_1 = 4T/mr \\quad \\Rightarrow a_A = \\alpha_1 r = 4T/m$$"}</DM>
<P2>For lower pulley, {"$a_B = a_A = 4T/m$"}</P2>
<DM>{"$$ma_C = mg - 2T \\quad \\Rightarrow a_C = g - 2T/m$$"}</DM>
<P2>Taking torque about {"$C$"},</P2>
<DM>{"$$2Tr = \\frac{mr^2}{2}\\alpha_2 \\quad \\Rightarrow \\alpha_2 = \\frac{4T}{mr}$$"}</DM>
<DM>{"$$a_C - a_B = \\alpha_2 r \\quad \\Rightarrow \\left(g-\\frac{2T}{m}\\right)-\\left(\\frac{4T}{m}\\right) = \\frac{4T}{m} \\qquad \\therefore \\quad \\boxed{T = \\frac{mg}{10}}$$"}</DM>
</div>,

/* ── Ex 18 ── */
<div key="ex-18" id="ex-18">
<ExHd num={18}>A uniform cylinder of radius {"$r$"} and mass {"$m$"} can rotate freely about a fixed horizontal axis. A thin cord of length {"$l$"} and mass {"$m_0$"} is wound on the cylinder in a single layer. Find the angular acceleration of the cylinder as a function of the length {"$x$"} of the hanging part of the cord. Assume that the wound part of the cord has its centre of gravity on the cylinder axis {"$O$"} shown in fig. 2.162.</ExHd>
<Fig src={`${B}07.jpg?height=263&width=266&top_left_y=1125&top_left_x=1387`} num="FIGURE 2.162"/>
<SolHd/>
<P2>Fig. 2.163 shows the FBD of cylinder and hanging part of the cord. For cylinder,</P2>
<Fig src={`${B}07.jpg?height=338&width=454&top_left_y=1568&top_left_x=1291`} num="FIGURE 2.163"/>
<DM>{"$$\\begin{aligned} Tr &= \\left[\\frac{mr^2}{2}+\\frac{m_0(l-x)}{l}r^2\\right]\\alpha \\\\ \\Rightarrow \\quad T &= \\left(\\frac{m}{2}+m_0-\\frac{m_0 x}{l}\\right)r\\alpha \\qquad\\text{...(1)} \\end{aligned}$$"}</DM>
<P2>For hanging part of cord,</P2>
<DM>{"$$\\frac{m_0 xg}{l} - T = \\frac{m_0 xa}{l} = \\frac{m_0 x}{l}(r\\alpha) \\qquad\\text{...(2)}$$"}</DM>
<P2>From (1) and (2),</P2>
<DM>{"$$\\boxed{\\alpha = \\frac{m_0\\,x\\,g}{r\\,l\\,(m/2+m_0)}}$$"}</DM>
</div>,

/* ── Ex 19 ── */
<div key="ex-19" id="ex-19">
<ExHd num={19}>A uniform solid sphere of mass 1 kg and radius 10 cm is kept stationary on a rough inclined plane by fixing a highly dense particle at {"$B$"}. Inclination of plane is {"$37°$"} with horizontal and {"$AB$"} is the diameter of the sphere which is parallel to the plane, as shown in fig. 2.164. Calculate</ExHd>
<Fig src={`${B}08.jpg?height=249&width=325&top_left_y=433&top_left_x=438`} num="FIGURE 2.164"/>
<P2>(<em>a</em>) mass of the particle at {"$B$"} &nbsp; (<em>b</em>) minimum required coefficient of friction between sphere and plane to keep the sphere in equilibrium.</P2>
<SolHd/>
<P2>Since the system is in equilibrium, net force and net torque is zero. Along the incline,</P2>
<DM>{"$$(M+m)g\\sin\\theta = f \\qquad\\text{...(1)}$$"}</DM>
<P2>Perpendicular to incline, {"$N = (M+m)g\\cos\\theta$"} &nbsp;&nbsp; ...(2)</P2>
<P2>Taking torque about {"$O$"}, we have</P2>
<DM>{"$$fr = mgr\\cos\\theta \\quad \\Rightarrow \\quad f = mg\\cos\\theta \\qquad\\text{...(3)}$$"}</DM>
<Fig src={`${B}08.jpg?height=330&width=388&top_left_y=1181&top_left_x=414`} num="FIGURE 2.165"/>
<P2>(<em>a</em>) From (1) and (3), {"$(M+m)g\\sin\\theta = mg\\cos\\theta$"}</P2>
<DM>{"$$\\therefore m = \\frac{M\\tan\\theta}{1-\\tan\\theta} = \\frac{1\\times0{\\cdot}75}{1-0{\\cdot}75} = \\boxed{3\\text{ kg}}$$"}</DM>
<P2>(<em>b</em>) {"$f \\leq \\mu N \\Rightarrow mg\\cos\\theta \\leq \\mu(M+m)g\\cos\\theta$"}</P2>
<DM>{"$$\\Rightarrow \\mu \\geq \\frac{m}{M+m} = \\frac{3}{3+1} \\qquad \\therefore \\quad \\boxed{\\mu \\geq 0{\\cdot}75}$$"}</DM>
</div>,

/* ── Ex 20 ── */
<div key="ex-20" id="ex-20">
<ExHd num={20}>The descending pulley (disc shaped) shown in fig. 2.166 has mass, {"$M = 3$"} kg. The fixed pulley is light and the horizontal plane is frictionless. Find the acceleration of the block if its mass is {"$m = 2$"} kg (Take {"$g = 10\\text{ m/s}^2$"})</ExHd>
<Fig src={`${B}08.jpg?height=218&width=536&top_left_y=2066&top_left_x=339`} num="FIGURE 2.166"/>
<SolHd/>
<P2>Let {"$T_1$"} and {"$T_2$"} be the tension in the string to the left and right of the pulley. Let {"$a$"} be the acceleration of the block. Then, the acceleration of the descending pulley is {"$a/2$"}.</P2>
<Fig src={`${B}08.jpg?height=394&width=594&top_left_y=247&top_left_x=1219`} num="FIGURE 2.167"/>
<DM>{"$$T_1 = ma \\qquad\\text{...(1)}$$"}</DM>
<DM>{"$$Mg - T_1 - T_2 = M\\frac{a}{2} \\qquad\\text{...(2)}$$"}</DM>
<P2>About centre {"$C$"} of pulley:</P2>
<DM>{"$$T_2 r - T_1 r = I\\alpha = \\frac{Mr^2}{2}\\alpha \\quad \\Rightarrow T_2 - T_1 = \\frac{Mr}{2}\\alpha \\qquad\\text{...(3)}$$"}</DM>
<DM>{"$$a_C - a_P = r\\alpha \\quad \\Rightarrow \\frac{a}{2} - 0 = r\\alpha \\quad \\text{or} \\quad r\\alpha = \\frac{a}{2} \\qquad\\text{...(4)}$$"}</DM>
<P2>From eqns. (2), (3) and (4):</P2>
<DM>{"$$Mg - 2T_1 = \\frac{Ma}{2}+\\frac{Ma}{4} = \\frac{3}{4}Ma \\qquad\\text{...(5)}$$"}</DM>
<P2>From eqns. (1) and (5):</P2>
<DM>{"$$a = \\frac{Mg}{\\frac{3}{4}M+2m} = \\frac{4Mg}{3M+8m} = \\frac{4\\times3\\times10}{3\\times3+8\\times2} = \\boxed{4{\\cdot}8\\text{ m/s}^2}$$"}</DM>
</div>,

/* ── Ex 21 ── */
<div key="ex-21" id="ex-21">
<ExHd num={21}>A uniform slender bar {"$AB$"} of mass {"$m$"} is suspended as shown from a small cart of the same mass {"$m$"}. Neglecting the effect of friction, determine the accelerations of points {"$A$"} and {"$B$"} immediately after a horizontal force {"$F$"} has been applied at {"$B$"}.</ExHd>
<Fig src={`${B}08.jpg?height=388&width=261&top_left_y=1804&top_left_x=1387`} num="FIGURE 2.168"/>
<SolHd/>
<P2>Let {"$F'$"} be the force exerted by bar on the cart.</P2>
<P2>For cart: {"$ma_A = F' \\Rightarrow a_A = F'/m$"} &nbsp;&nbsp; ...(1)</P2>
<P2>For bar: {"$ma_C = F + F' \\Rightarrow a_C = (F'+F)/m$"} &nbsp;&nbsp; ...(2)</P2>
<Fig src={`${B}09.jpg?height=284&width=570&top_left_y=251&top_left_x=322`} num="FIGURE 2.169"/>
<P2>About {"$C$"}, {"$\\left(\\dfrac{ml^2}{12}\\right)\\alpha = F\\dfrac{l}{2} - F'\\dfrac{l}{2} \\Rightarrow \\alpha l = \\dfrac{6(F-F')}{m}$"} &nbsp;&nbsp; ...(3)</P2>
<P2>Now, {"$\\alpha = \\dfrac{a_A + a_C}{l/2} \\Rightarrow \\dfrac{\\alpha l}{2} = a_A + a_C$"} &nbsp;&nbsp; ...(4)</P2>
<P2>From (1), (2), (3) and (4),</P2>
<DM>{"$$F' = \\frac{2F}{5} \\qquad \\therefore \\quad a_A = \\frac{F'}{m} = \\frac{2F}{5m}$$"}</DM>
<DM>{"$$a_C = \\frac{F+F'}{m} = \\frac{7F}{5m} \\qquad a_B = 2a_C + a_A = \\frac{14F}{5m}+\\frac{2F}{5m} = \\boxed{\\frac{16F}{5m}}$$"}</DM>
</div>,

/* ── Ex 22 ── */
<div key="ex-22" id="ex-22">
<ExHd num={22}>A cotton reel has inner radius {"$r$"} and outer radius {"$R$"}. Mass of the reel is {"$M$"} and moment of inertia about longitudinal rotational axis is {"$I$"}. A force {"$F$"} is applied at the free end of thread wrapped on the reel as shown in fig. 2.170. The reel moves without sliding.</ExHd>
<P2>(<em>a</em>) Determine the frictional force exerted by table on the reel and the direction in which it acts.</P2>
<P2>(<em>b</em>) In what direction does the reel begin to move?</P2>
<Fig src={`${B}09.jpg?height=218&width=274&top_left_y=1729&top_left_x=470`} num="FIGURE 2.170"/>
<SolHd/>
<P2>(<em>a</em>) About point of contact {"$P$"}, torque is provided only by {"$F$"} which is clockwise. Therefore, the reel begins to roll clockwise and moves towards right.</P2>
<P2>(<em>b</em>) Taking torque about {"$P$"}, we have</P2>
<DM>{"$$F(R-r) = (I+MR^2)\\frac{a}{R} \\quad \\Rightarrow \\quad a = \\frac{F(R-r)R}{I+MR^2}$$"}</DM>
<P2>From FBD, {"$F - f = Ma$"}</P2>
<DM>{"$$\\therefore \\quad f = F - M\\frac{F(R-r)R}{I+MR^2} = \\boxed{\\frac{F(I+MRr)}{I+MR^2}}$$"}</DM>
<Fig src={`${B}09.jpg?height=345&width=316&top_left_y=253&top_left_x=1362`} num="FIGURE 2.171"/>
<P2>Since {"$f$"} is positive, it acts in the direction shown, i.e., towards left.</P2>
</div>,

/* ── Ex 23 ── */
<div key="ex-23" id="ex-23">
<ExHd num={23}>A uniform cylinder of radius {"$r$"} and radius of gyration {"$k$"} is kept on a fixed wedge of inclination {"$\\theta$"}. When we push the wedge with a constant acceleration {"$a$"}, the cylinder rolls up the wedge. Find the minimum coefficient of friction between the cylinder and wedge.</ExHd>
<Fig src={`${B}09.jpg?height=231&width=484&top_left_y=996&top_left_x=1278`} num="FIGURE 2.172"/>
<SolHd/>
<P2>In the frame of wedge, pseudo force {"$ma$"} acts on the cylinder towards left.</P2>
<Fig src={`${B}09.jpg?height=300&width=296&top_left_y=1383&top_left_x=1370`} num="FIGURE 2.173"/>
<P2>From FBD,</P2>
<DM>{"$$\\begin{aligned} ma_r &= ma\\cos\\theta - mg\\sin\\theta - f \\qquad\\text{...(1)} \\\\ N &= mg\\cos\\theta + ma\\sin\\theta \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
<P2>Taking torque about {"$C$"},</P2>
<DM>{"$$fr = (mk^2)\\alpha = mk^2(a_r/r) \\quad \\Rightarrow ma_r = fr^2/k^2 \\qquad\\text{...(3)}$$"}</DM>
<P2>From (1) and (3),</P2>
<DM>{"$$f = \\frac{m(a\\cos\\theta - g\\sin\\theta)}{1+r^2/k^2}$$"}</DM>
<DM>{"$$f \\leq \\mu N \\quad \\Rightarrow \\quad \\frac{m(a\\cos\\theta-g\\sin\\theta)}{1+r^2/k^2} \\leq \\mu m(g\\cos\\theta+a\\sin\\theta)$$"}</DM>
<DM>{"$$\\therefore \\quad \\boxed{\\mu_{\\min} = \\frac{a\\cos\\theta - g\\sin\\theta}{(g\\cos\\theta+a\\sin\\theta)(1+r^2/k^2)}}$$"}</DM>
</div>,

/* ── Ex 24 ── */
<div key="ex-24" id="ex-24">
<ExHd num={24}>A man pushes a cylinder of mass {"$m_1$"} with the help of a plank of mass {"$m_2$"} as shown in fig. 2.174. There is no slipping at any contact. The horizontal force applied by the man is {"$F$"}. Find</ExHd>
<Fig src={`${B}10.jpg?height=201&width=486&top_left_y=397&top_left_x=363`} num="FIGURE 2.174"/>
<P2>(<em>a</em>) the acceleration of the plank and the centre of mass of the cylinder.</P2>
<P2>(<em>b</em>) the magnitudes and directions of frictional forces at contact points.</P2>
<SolHd/>
<P2>From FBD, we have {"$f_1 + f_2 = m_1 a_1$"} and {"$F - f_2 = m_2 a_2$"} ...(1)</P2>
<Fig src={`${B}10.jpg?height=289&width=761&top_left_y=906&top_left_x=223`} num="FIGURE 2.175"/>
<P2>About centre {"$C$"} of cylinder,</P2>
<DM>{"$$\\left(f_2 - f_1\\right)r = \\frac{m_1 r^2}{2}\\alpha = \\frac{m_1 r^2}{2}\\left(\\frac{a_1}{r}\\right) \\quad \\Rightarrow f_2 - f_1 = \\frac{m_1 a_1}{2} \\qquad\\text{...(3)}$$"}</DM>
<P2>As there is no slipping, {"$a_P = a_2$"}</P2>
<DM>{"$$a_2 = \\alpha(2r) = \\frac{a_1}{r}(2r) = 2a_1 \\qquad\\text{...(4)}$$"}</DM>
<P2>(<em>a</em>) From (1), (2), (3) and (4),</P2>
<DM>{"$$\\boxed{a_1 = \\frac{4F}{3m_1+8m_2}} \\qquad \\text{and} \\qquad \\boxed{a_2 = \\frac{8F}{3m_1+8m_2}}$$"}</DM>
<P2>(<em>b</em>) From eqns. (1) and (2),</P2>
<DM>{"$$\\boxed{f_1 = \\frac{m_1 F}{3m_1+8m_2}} \\qquad \\text{and} \\qquad \\boxed{f_2 = \\frac{3m_1 F}{3m_1+8m_2}}$$"}</DM>
<P2>As both {"$f_1$"} and {"$f_2$"} are positive, they act in the direction shown in the fig. 2.175.</P2>
</div>,

/* ── Ex 25 ── */
<div key="ex-25" id="ex-25">
<ExHd num={25}>Consider the arrangement shown in fig. 2.176. The string is wrapped around a uniform solid cylinder of mass {"$M$"} which rolls without slipping. The other end of the string is passed over a massless, frictionless pulley to a block of mass {"$m$"}. Determine the acceleration of the block in terms of {"$M$"}, {"$m$"} and {"$g$"}.</ExHd>
<Fig src={`${B}10.jpg?height=324&width=300&top_left_y=242&top_left_x=1224`} num="FIGURE 2.176"/>
<SolHd/>
<Fig src={`${B}10.jpg?height=304&width=158&top_left_y=236&top_left_x=1684`} num="FIGURE 2.177"/>
<P2>Let {"$a$"} = acceleration of the centre of cylinder. Then, the acceleration of topmost point of cylinder and hence of the block is {"$2a$"}.</P2>
<P2>From F.B.D, we have</P2>
<DM>{"$$T - f = Ma \\qquad\\text{...(1)}$$"}</DM>
<DM>{"$$Tr + fr = I\\alpha = \\left(\\frac{Mr^2}{2}\\right)\\left(\\frac{a}{r}\\right) \\quad \\Rightarrow \\quad T + f = \\frac{Ma}{2} \\qquad\\text{...(2)}$$"}</DM>
<DM>{"$$mg - T = m(2a) \\qquad\\text{...(3)}$$"}</DM>
<P2>From eqns. (1) and (2): {"$2T = \\dfrac{3}{2}Ma$"} &nbsp;&nbsp; ...(4)</P2>
<P2>From eqns. (3) and (4):</P2>
<DM>{"$$mg - \\frac{3}{4}Ma = 2ma \\quad \\Rightarrow \\quad a = \\frac{4mg}{8m+3M}$$"}</DM>
<P2>Therefore, acceleration of block is {"$\\boxed{2a = \\dfrac{8mg}{8m+3M}}$"}</P2>
</div>,

/* ── Ex 26 ── */
<div key="ex-26" id="ex-26">
<ExHd num={26}>A ball of radius {"$r = 20$"} cm has mass {"$m = 0{\\cdot}75$"} kg and moment of inertia (about its diameter) {"$I = 0{\\cdot}0125$"} kg m². The ball rolls without sliding over a rough horizontal floor with velocity {"$v_0 = 10$"} ms⁻¹ towards a smooth vertical wall. If coefficient of restitution between the wall and the ball is {"$e = 0{\\cdot}7$"}, calculate velocity {"$v$"} of the ball long after the collision. {"$(g = 10\\text{ ms}^{-2})$"}</ExHd>
<SolHd/>
<Fig src={`${B}10.jpg?height=177&width=665&top_left_y=1708&top_left_x=1185`} num="FIGURE 2.178"/>
<P2>{"$v_0 = 10$"} ms⁻¹ and {"$r = 0{\\cdot}2$"} m, {"$\\Rightarrow \\omega_0 = v_0/r = 50$"} rad s⁻¹</P2>
<P2>As the wall is smooth, angular velocity {"$\\omega_0$"} remains unchanged during collision. After a long time, the ball starts rolling. So, {"$v = \\omega r$"}. As the angular momentum about lowermost point is conserved, we have</P2>
<DM>{"$$m(ev_0)r - I\\omega_0 = mvr + I(v/r)$$"}</DM>
<DM>{"$$\\Rightarrow v = \\frac{mev_0 r^2 - I\\omega_0 r}{mr^2+I} = \\frac{0{\\cdot}75\\times0{\\cdot}7\\times10\\times0{\\cdot}2^2-0{\\cdot}0125\\times50\\times0{\\cdot}2}{0{\\cdot}75\\times0{\\cdot}2^2+0{\\cdot}0125} \\quad \\therefore v = \\boxed{2\\text{ ms}^{-1}}$$"}</DM>
</div>,

/* ── Ex 27 ── */
<div key="ex-27" id="ex-27">
<ExHd num={27}>A plank of mass {"$M$"}, whose top surface is rough with coefficient of friction {"$\\mu$"} is placed on a smooth ground with a disc of mass {"$m = M/2$"} and radius {"$R$"} placed on it. The disc is now given a velocity {"$v_0$"} in the horizontal direction at {"$t = 0$"}.</ExHd>
<Fig src={`${B}11.jpg?height=235&width=486&top_left_y=399&top_left_x=363`} num="FIGURE 2.179"/>
<P2>(<em>a</em>) Find the time when the disc starts rolling. &nbsp; (<em>b</em>) Find the velocity of plank, velocity of disc and angular velocity of disc at this time. &nbsp; (<em>c</em>) Find the distance travelled by the plank up to this instant. &nbsp; (<em>d</em>) Find the work done by the friction force up to this instant.</P2>
<SolHd/>
<Fig src={`${B}11.jpg?height=252&width=770&top_left_y=962&top_left_x=223`} num="FIGURE 2.180"/>
<P2>When the disc starts pure rolling, {"$v_P = v_Q$"} and {"$v_C - v_P = \\omega R$"}</P2>
<P2>From FBD: {"$A = \\mu mg/M = \\mu g/2$"}, {"$a = -\\mu mg/m = -\\mu g$"}, {"$\\alpha = \\dfrac{\\mu mg}{mR^2/2} = \\dfrac{2\\mu g}{R}$"}</P2>
<P2>(<em>a</em>) When rolling starts after time {"$t$"},</P2>
<DM>{"$$v_P = v_Q = At = \\mu gt/2, \\quad v_C = v_0 - \\mu gt, \\quad \\omega = \\alpha t = 2\\mu gt/R$$"}</DM>
<P2>As {"$v_C - v_P = \\omega R$"},</P2>
<DM>{"$$\\left(v_0-\\mu gt\\right)-\\frac{\\mu gt}{2} = \\frac{2\\mu gt}{R}\\times R \\qquad \\therefore \\boxed{t = \\frac{2v_0}{7\\mu g}}$$"}</DM>
<P2>(<em>b</em>) Velocity of plank: {"$v_Q = \\dfrac{\\mu g}{2}t = \\boxed{\\dfrac{v_0}{7}}$"}"</P2>
<P2>Velocity of disc: {"$v_C = v_0 - \\mu gt = \\boxed{\\dfrac{5}{7}v_0}$"}"</P2>
<P2>Angular velocity of disc: {"$\\omega = \\dfrac{2\\mu g}{R}t = \\boxed{\\dfrac{4v_0}{7R}}$"}"</P2>
<P2>(<em>c</em>) Distance travelled by plank:</P2>
<DM>{"$$s = \\frac{1}{2}At^2 = \\frac{1}{2}\\times\\frac{\\mu g}{2}\\times\\left(\\frac{2v_0}{7\\mu g}\\right)^{\\!2} = \\boxed{\\frac{v_0^2}{49\\mu g}}$$"}</DM>
<P2>(<em>d</em>) Work done by friction:</P2>
<DM>{"$$W = \\frac{1}{2}M\\left(\\frac{v_0}{7}\\right)^{\\!2}+\\frac{1}{2}\\cdot\\frac{M}{2}\\left(\\frac{5v_0}{7}\\right)^{\\!2}+\\frac{1}{2}\\cdot\\left(\\frac{M}{2}\\cdot\\frac{R^2}{2}\\right)\\!\\left(\\frac{4v_0}{7R}\\right)^{\\!2}-\\frac{1}{2}\\cdot\\frac{M}{2}\\,v_0^2 = \\boxed{-\\frac{1}{14}Mv_0^2}$$"}</DM>
</div>,

/* ── Ex 28 ── */
<div key="ex-28" id="ex-28">
<ExHd num={28}>A hoop of mass {"$m$"} is projected on a floor with linear velocity {"$v_0$"} and reverse spin {"$\\omega_0$"}. The coefficient of friction between the hoop and the ground is {"$\\mu$"}.</ExHd>
<P2>(<em>a</em>) Under what condition will hoop return back? &nbsp; (<em>b</em>) How long will it continue to slip after its centre of mass becomes stationary? &nbsp; (<em>c</em>) What is the velocity of return?</P2>
<SolHd/>
<Fig src={`${B}11.jpg?height=340&width=600&top_left_y=973&top_left_x=1220`} num="FIGURE 2.181"/>
<DM>{"$$a = \\mu g, \\qquad \\alpha = -\\frac{\\mu g}{r}, \\qquad v = -v_0 + \\mu gt, \\qquad \\omega = \\omega_0 - \\frac{\\mu g}{r}t$$"}</DM>
<P2>(<em>a</em>) Hoop will return back if {"$v = 0$"} but {"$\\omega > 0$"}</P2>
<DM>{"$$\\Rightarrow -v_0 + \\mu gt = 0 \\text{ and } \\omega_0 - \\frac{\\mu gt}{r} > 0 \\qquad \\therefore \\quad \\boxed{\\omega_0 > \\frac{v_0}{r}}$$"}</DM>
<P2>(<em>b</em>) Let COM becomes stationary at {"$t = t_1$"} and slipping stops at {"$t = t_2$"}. Then at {"$t = t_1$"}, {"$v = 0$"}:</P2>
<DM>{"$$\\Rightarrow -v_0 + \\mu g t_1 = 0 \\quad \\Rightarrow t_1 = v_0/\\mu g$$"}</DM>
<DM>{"$$\\text{At } t = t_2,\\; v = \\omega r \\quad \\Rightarrow t_2 = \\frac{v_0+\\omega_0 r}{2\\mu g}$$"}</DM>
<P2>Therefore, hoop will continue to slip after COM becomes stationary for time</P2>
<DM>{"$$t_2 - t_1 = \\frac{v_0+\\omega_0 r}{2\\mu g} - \\frac{v_0}{\\mu g} = \\boxed{\\frac{\\omega_0 r - v_0}{2\\mu g}}$$"}</DM>
<P2>(<em>c</em>) Velocity of return is</P2>
<DM>{"$$v = -v_0 + \\mu g t_2 = -v_0 + \\frac{v_0+\\omega_0 r}{2} = \\boxed{\\frac{\\omega_0 r - v_0}{2}}$$"}</DM>
</div>,

/* ── Ex 29 ── */
<div key="ex-29" id="ex-29">
<ExHd num={29}>A trolley is initially at rest with a solid cylinder placed on its bed such that cylinder axis makes angle {"$\\theta$"} with direction of motion of trolley as shown in the fig. 2.182. The trolley starts to move forward with constant acceleration {"$a$"}. If initial distance of midpoint of cylinder axis from rear edge of trolley bed is {"$d$"}, calculate the distance {"$s$"} which the trolley moves before the cylinder rolls off the edge of its horizontal bed. Assume dimensions of cylinder to be very small in comparison to other dimensions. Neglect slipping. Also calculate, frictional force acting on the cylinder.</ExHd>
<Fig src={`${B}12.jpg?height=276&width=450&top_left_y=623&top_left_x=382`} num="FIGURE 2.182"/>
<SolHd/>
<P2>In the frame of trolley, pseudo force acts on the cylinder whose components are {"$ma\\cos\\theta$"} along the axis of cylinder and {"$ma\\sin\\theta$"} perpendicular to the axis. Let the friction along the axis be {"$f_a$"} and along the tangent be {"$f_t$"}. Then, {"$f_a = ma\\cos\\theta$"}.</P2>
<Fig src={`${B}12.jpg?height=233&width=388&top_left_y=1164&top_left_x=414`} num="FIGURE 2.183"/>
<P2>From FBD, {"$ma_r = ma\\sin\\theta - f_t$"} &nbsp;&nbsp; ...(1)</P2>
<P2>About centre {"$C$"}, {"$\\left(\\dfrac{mr^2}{2}\\right)\\left(\\dfrac{a_r}{r}\\right) = f_t r \\Rightarrow \\dfrac{ma_r}{2} = f_t$"} &nbsp;&nbsp; ...(2)</P2>
<P2>From eqns (1) and (2):</P2>
<DM>{"$$a_r = \\frac{2}{3}a\\sin\\theta \\qquad \\text{and} \\qquad f_t = \\frac{ma\\sin\\theta}{3}$$"}</DM>
<P2>The distance w.r.t trolley, the cylinder rolls before going off the edge of trolley is {"$d\\operatorname{cosec}\\theta$"}. Time taken to roll off is</P2>
<DM>{"$$t = \\sqrt{\\frac{2d\\operatorname{cosec}\\theta}{a_r}} = \\sqrt{\\frac{3d}{a}}\\operatorname{cosec}\\theta$$"}</DM>
<P2>The distance travelled by trolley in this time is</P2>
<DM>{"$$s = \\frac{1}{2}at^2 = \\boxed{\\frac{3}{2}d\\operatorname{cosec}^2\\theta}$$"}</DM>
<P2>The frictional force acting on the cylinder is</P2>
<DM>{"$$f = \\sqrt{f_t^2 + f_a^2} = \\sqrt{\\left(\\frac{ma\\sin\\theta}{3}\\right)^{\\!2}+(ma\\cos\\theta)^2} = \\boxed{\\frac{ma}{3}\\sqrt{\\sin^2\\theta+9\\cos^2\\theta}}$$"}</DM>
</div>,

/* ── Ex 30 ── */
<div key="ex-30" id="ex-30">
<ExHd num={30}>In the arrangement shown in fig. 2.184, the mass of the block is {"$m$"}, the mass of the pulley is {"$M$"}, the moment of inertia of pulley about its axis is {"$I$"} and the radii of the pulley are {"$R$"} and {"$2R$"}. The mass of the threads is negligible. Find the acceleration of the block after the system is released from rest.</ExHd>
<Fig src={`${B}12.jpg?height=411&width=469&top_left_y=442&top_left_x=1282`} num="FIGURE 2.184"/>
<SolHd/>
<P2>Let {"$T_1$"} be the tension in string attached to ceiling and {"$T_2$"} be the tension in string attached to block</P2>
<Fig src={`${B}12.jpg?height=484&width=654&top_left_y=1014&top_left_x=1192`} num="FIGURE 2.185"/>
<P2>Let {"$A$"} = acceleration of pulley, {"$a$"} = acceleration of block. Then, {"$a_A = 0$"}, {"$a_C = A$"}, {"$a_B = a$"}.</P2>
<P2>Now, {"$a_C - a_A = \\alpha R$"} and {"$a_B - a_A = \\alpha(3R)$"}</P2>
<DM>{"$$\\Rightarrow A = \\alpha R \\qquad\\text{...(1)} \\qquad a = 3\\alpha R \\qquad\\text{...(2)}$$"}</DM>
<P2>From FBD,</P2>
<DM>{"$$mg - T_2 = ma \\qquad\\text{...(3)} \\qquad Mg + T_2 - T_1 = MA \\qquad\\text{...(4)}$$"}</DM>
<P2>About centre {"$C$"} of pulley, {"$T_2(2R) + T_1 R = I\\alpha$"} &nbsp;&nbsp; ...(5)</P2>
<P2>On solving eqns. (1) to (5), we get</P2>
<DM>{"$$\\boxed{a = \\frac{3(M+3m)g}{M+9m+I/R^2}}$$"}</DM>
</div>,

/* ── Ex 31 ── */
<div key="ex-31" id="ex-31">
<ExHd num={31}>A plank of mass {"$M$"}, whose upper surface is rough and lower surface smooth, rests on a smooth horizontal plane. A solid sphere of mass {"$m$"} is placed on the plank and the plank is suddenly given a velocity {"$v_0$"} in the direction of its length. Find the time after which the sphere begins pure rolling, if the coefficient of friction between the plank and the sphere is {"$\\mu$"}.</ExHd>
<Fig src={`${B}13.jpg?height=257&width=458&top_left_y=240&top_left_x=378`} num="FIGURE 2.186"/>
<SolHd/>
<Fig src={`${B}13.jpg?height=385&width=706&top_left_y=610&top_left_x=253`} num="FIGURE 2.187"/>
<P2>When the sphere begins pure rolling, {"$v_P = v_Q = v$"} and {"$v_P - v_C = \\omega r$"}</P2>
<P2>From FBD: {"$MA = -\\mu N = -\\mu mg \\Rightarrow A = -\\mu mg/M$"}, {"$ma = \\mu mg \\Rightarrow a = \\mu g$"}, {"$I\\alpha = \\mu mgr$"}</P2>
<DM>{"$$\\Rightarrow \\frac{2}{5}mr^2\\alpha = \\mu mgr \\quad \\Rightarrow \\alpha = \\frac{5\\mu g}{2r}$$"}</DM>
<P2>When rolling starts after time {"$t$"},</P2>
<P2>for the plank: {"$v_P = v = v_0 + At = v_0 - \\dfrac{\\mu mg}{M}t$"} &nbsp;&nbsp;&nbsp; for the sphere: {"$v_C = at = \\mu gt$"}</P2>
<DM>{"$$\\omega = \\alpha t = \\frac{5\\mu g}{2r}t, \\qquad v_P - v_C = \\omega r$$"}</DM>
<DM>{"$$\\Rightarrow \\left(v_0 - \\frac{\\mu mg}{M}t\\right) - \\mu gt = \\frac{5\\mu g}{2r}t\\cdot r \\qquad \\therefore \\quad \\boxed{t = \\frac{v_0}{\\left(\\dfrac{7}{2}+\\dfrac{m}{M}\\right)\\mu g}}$$"}</DM>
</div>,

/* ── Ex 32 ── */
<div key="ex-32" id="ex-32">
<ExHd num={32}>A uniform cylinder of radius {"$R$"} and mass {"$M$"} is spinned about its axis to angular velocity {"$\\omega_0$"} and then placed it to a corner (see fig. 2.188). The coefficient of kinetic friction between the corner walls and cylinder is {"$\\mu_k$"}. How many turns will the cylinder accomplish before it stops.</ExHd>
<Fig src={`${B}13.jpg?height=297&width=325&top_left_y=2120&top_left_x=442`} num="FIGURE 2.188"/>
<SolHd/>
<P2>As the COM of the cylinder cannot move, the forces in the horizontal and vertical directions must add upto zero.</P2>
<Fig src={`${B}13.jpg?height=373&width=405&top_left_y=343&top_left_x=1316`} num="FIGURE 2.189"/>
<P2>In horizontal direction, {"$N_2 = \\mu_k N_1$"} &nbsp;&nbsp; ...(1)</P2>
<P2>In vertical direction, {"$N_1 + \\mu_k N_2 = mg$"} &nbsp;&nbsp; ...(2)</P2>
<P2>Solving eqns. (1) and (2):</P2>
<DM>{"$$N_1 = \\frac{mg}{1+\\mu_k^2}, \\qquad N_2 = \\frac{\\mu_k mg}{1+\\mu_k^2}$$"}</DM>
<P2>Since, {"$\\tau = I_{cm}\\alpha$"}, we have</P2>
<DM>{"$$-\\mu_k(N_1+N_2)R = \\frac{mR^2}{2}\\alpha \\quad \\Rightarrow \\quad \\alpha = -\\frac{2\\mu_k(1+\\mu_k)}{(1+\\mu_k^2)R}\\,g$$"}</DM>
<P2>From {"$\\omega^2 - \\omega_0^2 = 2\\alpha\\theta$"}, we have {"$0^2 - \\omega_0^2 = 2\\alpha\\theta$"}. Therefore, the number of turns the cylinder will accomplish</P2>
<DM>{"$$n = \\frac{\\theta}{2\\pi} = -\\frac{1}{2\\pi}\\frac{\\omega_0^2}{2\\alpha} = \\boxed{\\frac{(1+\\mu_k^2)\\omega_0^2 R}{8\\pi\\mu_k(1+\\mu_k)g}}$$"}</DM>
</div>,

/* ── Ex 33 ── */
<div key="ex-33" id="ex-33">
<ExHd num={33}>Consider two heavy right circular rollers of radii {"$R$"} and {"$r$"}, respectively, that rest on a rough horizontal plane as shown in fig. 2.190. The larger roller has a string wound around it to which a horizontal force {"$P$"} can be applied as shown. Assuming that the coefficient of friction {"$\\mu$"} has the same value for all surface of contact, determine the necessary condition under which the larger roller can be pulled over the smaller one so that the smaller cylinder should neither roll nor slide.</ExHd>
<Fig src={`${B}13.jpg?height=175&width=270&top_left_y=1942&top_left_x=1383`} num="FIGURE 2.190"/>
<SolHd/>
<P2>As there is no limitation on the value of force {"$P$"}, if friction is sufficient, the larger roller will definitely get pulled over. On careful analysis, it can be seen that friction on smaller roller is maximum when the larger roller is just about to leave the ground. In this position,</P2>
<DM>{"$$\\sin\\theta = \\frac{R-r}{R+r} \\qquad \\text{and} \\qquad \\cos\\theta = \\frac{2\\sqrt{Rr}}{R+r}$$"}</DM>
<Fig src={`${B}14.jpg?height=325&width=602&top_left_y=236&top_left_x=305`} num="FIGURE 2.191"/>
<P2>From FBD along vertical and horizontal respectively,</P2>
<DM>{"$$\\begin{aligned} & N_2 = mg + N_1\\sin\\theta + \\mu N_1\\cos\\theta \\qquad\\text{...(1)} \\\\ & \\mu N_2 + \\mu N_1\\sin\\theta = N_1\\cos\\theta \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
<P2>Taking torque about {"$O$"}, we have {"$\\mu N_1 r - \\mu N_2 r = 0$"} &nbsp;&nbsp; ...(3)</P2>
<P2>From (2) and (3),</P2>
<DM>{"$$\\mu = \\frac{\\cos\\theta}{1+\\sin\\theta} = \\frac{2\\sqrt{Rr}/(R+r)}{1+(R-r)/(R+r)} = \\sqrt{\\frac{r}{R}}$$"}</DM>
<P2>The necessary condition is therefore {"$\\boxed{\\mu \\geq \\sqrt{r/R}}$"}</P2>
</div>,

/* ── Ex 34 ── */
<div key="ex-34" id="ex-34">
<ExHd num={34}>A spool with a thread wound on it is placed on a smooth inclined plane inclined at angle {"$\\theta$"} to the horizontal. The free end of the thread is attached to the wall as shown in fig. 2.192. The mass of the spool is {"$m$"} and moment of inertia relative to its own axis is {"$I_0$"} and radius of the wound thread layer is {"$r$"}. Find the acceleration of the spool axis.</ExHd>
<Fig src={`${B}14.jpg?height=372&width=373&top_left_y=1375&top_left_x=416`} num="FIGURE 2.192"/>
<SolHd/>
<Fig src={`${B}14.jpg?height=399&width=407&top_left_y=1866&top_left_x=403`} num="FIGURE 2.193"/>
<P2>From FBD, we have</P2>
<DM>{"$$\\begin{aligned} N &= mg\\cos\\theta \\qquad\\text{...(1)} \\\\ mg\\sin\\theta - T &= ma_{cm} \\qquad\\text{...(2)} \\\\ Tr &= I_0\\alpha \\qquad\\text{...(3)} \\end{aligned}$$"}</DM>
<P2>The instantaneous acceleration of point {"$A$"} is equal to the acceleration of the unwrapped thread which is zero.</P2>
<DM>{"$$\\Rightarrow \\quad a_{cm} - 0 = \\alpha r \\qquad\\text{...(4)}$$"}</DM>
<P2>Solving eqns. (2), (3) and (4), we get</P2>
<DM>{"$$\\boxed{a_{cm} = \\frac{g\\sin\\theta}{1+I_0/mr^2}}$$"}</DM>
</div>,

/* ── Ex 35 ── */
<div key="ex-35" id="ex-35">
<ExHd num={35}>If the thread in the previous problem is passed over a massless pulley and free end is attached to a block of mass {"$M$"} (see fig. 2.194), find the acceleration of the spool axis.</ExHd>
<Fig src={`${B}14.jpg?height=338&width=412&top_left_y=655&top_left_x=1314`} num="FIGURE 2.194"/>
<SolHd/>
<P2>The equations for spool will be same as in the previous problem. From FBD, we have</P2>
<DM>{"$$\\begin{aligned} N &= mg\\cos\\theta \\qquad\\text{...(1)} \\\\ mg\\sin\\theta - T &= ma_{cm} \\qquad\\text{...(2)} \\\\ Tr &= I_0\\alpha \\qquad\\text{...(3)} \\end{aligned}$$"}</DM>
<P2>For the block, we have {"$T - Mg = Ma$"} &nbsp;&nbsp; ...(4)</P2>
<P2>The acceleration of unwrapped thread will be equal to the acceleration of the block. Therefore, we have {"$a_{cm} - a = \\alpha r$"} &nbsp;&nbsp; ...(5)</P2>
<P2>Solving eqns. (2), (3), (4) and (5), we get</P2>
<DM>{"$$\\boxed{a_{cm} = \\frac{mg\\sin\\theta(I_0+Mr^2)-I_0 Mg}{MI_0+m(I_0+Mr^2)}}$$"}</DM>
</div>,

/* ── Ex 36 ── */
<div key="ex-36" id="ex-36">
<ExHd num={36}>A uniform sphere of mass {"$m$"} and radius {"$r$"} rolls without sliding over a horizontal plane, rotating about a horizontal axis {"$OA$"}. In the process, the center of the sphere moves with a velocity {"$v$"} along a circle of radius {"$R$"}. Find the kinetic energy of the sphere.</ExHd>
<Fig src={`${B}14.jpg?height=248&width=398&top_left_y=1963&top_left_x=1323`} num="FIGURE 2.195"/>
<SolHd/>
<P2>The sphere will have kinetic energy due to rotation about its horizontal axis and also due to rotation about vertical axis passing through {"$O$"}.</P2>
<DM>{"$$KE = \\frac{1}{2}I_{cm}\\omega_1^2 + \\frac{1}{2}I_0\\omega_2^2 = \\frac{1}{2}\\left(\\frac{2}{5}mr^2\\right)\\omega_1^2 + \\frac{1}{2}\\left(\\frac{2}{5}mr^2+mR^2\\right)\\omega_2^2$$"}</DM>
<P2>where, {"$\\omega_1 = v/r$"} and {"$\\omega_2 = v/R$"}. On putting these values, we get</P2>
<DM>{"$$\\boxed{KE = \\frac{7mv^2}{10}\\left(1+\\frac{2r^2}{7R^2}\\right)}$$"}</DM>
</div>,

/* ── Ex 37 ── */
<div key="ex-37" id="ex-37">
<ExHd num={37}>A uniform circular disc has radius {"$R$"} and mass {"$m$"}. A particle, also of mass {"$m$"}, is fixed at point {"$A$"} on the edge of the disc as shown in fig. 2.196. The disc can rotate freely about a fixed horizontal chord {"$PQ$"} that is at a distance {"$R/4$"} from the centre {"$C$"} of the disc. The line {"$AC$"} is perpendicular to {"$PQ$"}. Initially, the disc is held vertical with point {"$A$"} at its highest position. It is then allowed to fall so that it starts rotating about {"$PQ$"}. Find the linear speed of the particle as it reaches its lowest position.</ExHd>
<Fig src={`${B}15.jpg?height=362&width=500&top_left_y=906&top_left_x=356`} num="FIGURE 2.196"/>
<SolHd/>
<P2>From initial to final position, the distance moved by centre of mass of disc is {"$2(R/4) = R/2$"} downwards and by particle is {"$2(R+R/4) = 5R/2$"} downwards.</P2>
<P2>Moment of inertia of the system about {"$PQ$"} is</P2>
<DM>{"$$I_{PQ} = \\left[\\frac{mR^2}{4}+m\\left(\\frac{R}{4}\\right)^{\\!2}\\right]+m\\left(\\frac{5R}{4}\\right)^{\\!2} = \\frac{15mR^2}{8}$$"}</DM>
<P2>By conservation of mechanical energy, Gain in KE = Loss in PE</P2>
<DM>{"$$\\Rightarrow \\frac{1}{2}I_{PQ}\\omega^2 = mg\\frac{R}{2}+mg\\frac{5R}{2} \\quad \\Rightarrow \\frac{1}{2}\\left(\\frac{15mR^2}{8}\\right)\\omega^2 = 3mgR \\quad \\Rightarrow \\omega = 4\\sqrt{\\frac{g}{5R}}$$"}</DM>
<P2>Therefore, the linear speed of the particle is</P2>
<DM>{"$$v = \\omega\\frac{5R}{4} = 4\\sqrt{\\frac{g}{5R}}\\times\\frac{5R}{4} = \\boxed{\\sqrt{5gR}}$$"}</DM>
</div>,

/* ── Ex 38 ── */
<div key="ex-38" id="ex-38">
<ExHd num={38}>A uniform rod {"$AB$"} of mass {"$m$"} and length {"$l$"} is pivoted at a point {"$O$"} to rotate in the vertical plane. The rod is held in horizontal position and released. Find the distance {"$x$"} of the pivot from the mass center {"$C$"} of the rod, so that angular speed {"$\\omega$"} of the rod as it passes through the vertical position is maximum.</ExHd>
<Fig src={`${B}15.jpg?height=145&width=336&top_left_y=236&top_left_x=1353`} num="FIGURE 2.197"/>
<SolHd/>
<P2>When the rod passes through the vertical position, its centre of mass is lowered by {"$x$"}. By conservation of mechanical energy,</P2>
<DM>{"$$mgx = \\frac{1}{2}\\left(\\frac{ml^2}{12}+mx^2\\right)\\omega^2 \\quad \\Rightarrow \\quad \\omega^2 = \\frac{24gx}{l^2+12x^2}$$"}</DM>
<P2>For {"$\\omega$"} to be maximum, {"$d\\omega^2/dx = 0$"}</P2>
<DM>{"$$\\Rightarrow \\frac{24g\\left[(l^2+12x^2)-24x^2\\right]}{(l^2+12x^2)^2} = 0 \\qquad \\therefore \\quad \\boxed{x = \\frac{l}{\\sqrt{12}}}$$"}</DM>
</div>,

/* ── Ex 39 ── */
<div key="ex-39" id="ex-39">
<ExHd num={39}>A uniform solid cylinder of radius {"$r = 15$"} cm rolls over a horizontal plane passing into an inclined plane forming an angle {"$\\alpha = 30°$"} with the horizontal. Find the maximum value of the velocity {"$v_0$"} which still permits the cylinder to roll onto the inclined plane section without a jump. (The sliding is assumed to be absent.)</ExHd>
<Fig src={`${B}15.jpg?height=205&width=340&top_left_y=1121&top_left_x=1349`} num="FIGURE 2.198"/>
<SolHd/>
<P2>As the cylinder rotates about the edge, its COM moves in a circular arc of radius {"$r$"} centered at the edge.</P2>
<Fig src={`${B}15.jpg?height=256&width=472&top_left_y=1491&top_left_x=1284`} num="FIGURE 2.199"/>
<P2>From FBD, {"$mg\\cos\\alpha = N + m\\omega^2 r$"}. For no jumping, {"$N \\geq 0$"}:</P2>
<DM>{"$$\\Rightarrow \\quad mg\\cos\\alpha - m\\omega^2 r \\geq 0 \\qquad\\text{...(1)}$$"}</DM>
<P2>Applying conservation of mechanical energy:</P2>
<DM>{"$$\\Rightarrow mgr(1-\\cos\\alpha) = \\frac{1}{2}\\left(\\frac{3}{2}mr^2\\right)\\omega^2 - \\frac{1}{2}\\left(\\frac{3}{2}mr^2\\right)\\left(\\frac{v_0}{r}\\right)^{\\!2}$$"}</DM>
<DM>{"$$\\Rightarrow m\\omega^2 r = \\frac{4}{3}mg(1-\\cos\\alpha)+\\frac{mv_0^2}{r}$$"}</DM>
<P2>Putting this in eqn (1):</P2>
<DM>{"$$mg\\cos\\alpha - \\left[\\frac{4}{3}mg(1-\\cos\\alpha)+\\frac{mv_0^2}{r}\\right] \\geq 0$$"}</DM>
<DM>{"$$\\therefore \\quad \\boxed{(v_0)_{\\max} = \\sqrt{\\frac{rg}{3}(7\\cos\\alpha-4)}}$$"}</DM>
</div>,

/* ── Ex 40 ── */
<div key="ex-40" id="ex-40">
<ExHd num={40}>A rectangular rigid fixed block has a long horizontal edge. A solid homogeneous cylinder of radius {"$r$"} is placed horizontally at rest with its length parallel to the edge such that the axis of the cylinder and the edge of the block are in the same vertical plane as shown in fig. 2.200. There is sufficient friction present at the edge so that a very small displacement causes the cylinder to roll off the edge without slipping. Determine</ExHd>
<P2>(<em>a</em>) The speed {"$v$"} of the centre of mass of the cylinder and the angle {"$\\theta$"} through which the cylinder rotates before it leaves contact with the edge of the block.</P2>
<P2>(<em>b</em>) The ratio of translational and rotational kinetic energies of the cylinder when its centre of mass is in horizontal line with the edge of the block.</P2>
<Fig src={`${B}16.jpg?height=424&width=590&top_left_y=1018&top_left_x=311`} num="FIGURE 2.200"/>
<SolHd/>
<Fig src={`${B}16.jpg?height=310&width=714&top_left_y=1568&top_left_x=247`} num="FIGURE 2.201"/>
<P2>As the cylinder rotates about the edge of the block, its COM moves in circular arc of radius {"$r$"} centred at the edge.</P2>
<P2>From F.B.D, we have {"$mg\\cos\\theta - N = \\dfrac{mv^2}{r}$"}</P2>
<P2>(<em>a</em>) In the jump off position, {"$N = 0$"}</P2>
<DM>{"$$\\Rightarrow \\quad mg\\cos\\theta = \\frac{mv^2}{r} \\qquad\\text{...(1)}$$"}</DM>
<P2>Applying conservation of mechanical energy between initial position and jump off position:</P2>
<DM>{"$$\\Rightarrow mgr(1-\\cos\\theta) = \\frac{1}{2}mv^2+\\frac{1}{2}\\left(\\frac{mr^2}{2}\\right)\\left(\\frac{v}{r}\\right)^{\\!2}$$"}</DM>
<DM>{"$$\\Rightarrow gr(1-\\cos\\theta) = \\frac{3}{4}v^2 \\qquad\\text{...(2)}$$"}</DM>
<P2>From eqns. (1) and (2):</P2>
<DM>{"$$\\boxed{v = \\sqrt{\\frac{4}{7}rg}} \\qquad \\text{and} \\qquad \\boxed{\\theta = \\cos^{-1}\\!\\left(\\frac{4}{7}\\right)}$$"}</DM>
<P2>(<em>b</em>) After leaving contact with the edge, the rotational kinetic energy {"$(K_R)$"} will not change. Only translational kinetic energy {"$(K_T)$"} will change.</P2>
<DM>{"$$K_{\\text{Rot}} = \\frac{1}{2}\\left(\\frac{mr^2}{2}\\right)\\left(\\frac{v}{r}\\right)^{\\!2} = \\frac{1}{4}m\\left(\\frac{4}{7}gr\\right) = \\frac{mgr}{7}$$"}</DM>
<P2>Applying conservation of mechanical energy between initial position and final position:</P2>
<DM>{"$$mgr = K_{\\text{Trans}}+\\frac{mgr}{7} \\quad \\Rightarrow K_{\\text{Trans}} = \\frac{6mgr}{7} \\qquad \\therefore \\quad \\boxed{\\frac{K_{\\text{Trans}}}{K_{\\text{Rot}}} = 6}$$"}</DM>
</div>,

/* ── Ex 41 ── */
<div key="ex-41" id="ex-41">
<ExHd num={41}>A cylinder of mass {"$M$"} and radius {"$R$"} has a light thin tape wound around it. The tape passes over a light, smooth fixed pulley to a block of mass {"$m$"}. Find the linear acceleration of the cylinder's axis up the incline assuming no slipping (see fig. 2.202).</ExHd>
<Fig src={`${B}16.jpg?height=427&width=463&top_left_y=1284&top_left_x=1286`} num="FIGURE 2.202"/>
<SolHd/>
<P2>Since the cylinder is rolling on the rough surface, we can apply energy conservation. The velocity {"$v$"} of the block is equal to the velocity of the unwound tape which is equal to velocity of the top most point of the cylinder. Hence, {"$v = v_{cm} + \\omega R$"}. Also, since {"$v_{cm} = \\omega R$"}, we have {"$v = 2v_{cm}$"}. Hence, if cylinder moves a distance {"$s$"} along the incline, block will fall a distance equal to {"$2s$"}. Applying energy conservation, we get {"$\\Delta PE + \\Delta KE = 0$"}</P2>
<DM>{"$$\\Rightarrow Mgs\\sin\\theta - mg(2s) + \\frac{1}{2}Mv_{cm}^2 + \\frac{1}{2}\\frac{MR^2}{2}\\cdot\\frac{v_{cm}^2}{R^2}+\\frac{1}{2}m(2v_{cm})^2 = 0$$"}</DM>
<DM>{"$$\\Rightarrow v_{cm}^2 = \\frac{(2m-M\\sin\\theta)}{(3M/4)+2m}\\,gs$$"}</DM>
<P2>Differentiating w.r.t. time,</P2>
<DM>{"$$2v_{cm}\\,a_{cm} = \\frac{(2m-M\\sin\\theta)}{(3M/4)+2m}\\,g\\,v_{cm} \\qquad \\therefore \\quad \\boxed{a_{cm} = \\frac{4m-2M\\sin\\theta}{3M+8m}\\,g}$$"}</DM>
</div>,

/* ── Ex 42 ── */
<div key="ex-42" id="ex-42">
<ExHd num={42}>A uniform rod of length {"$L$"} and mass {"$m$"} is held vertically on a rough surface. It is slightly disturbed so that it starts falling. Assume that friction is sufficiently large so that end {"$A$"} of the rod in contact with the ground, does not slip. Find the angle the rod makes with the vertical when end {"$A$"} loses contact with the ground.</ExHd>
<Fig src={`${B}17.jpg?height=392&width=470&top_left_y=666&top_left_x=371`} num="FIGURE 2.203"/>
<SolHd/>
<P2>Since end {"$A$"} remains stationary, rod rotates about an axis passing through this point. The centre of mass moves in a circle of radius {"$L/2$"} with centre at point {"$A$"} and therefore, external forces must provide the centripetal acceleration given by</P2>
<DM>{"$$mg\\cos\\theta - N\\cos\\theta - f\\sin\\theta = \\frac{mv^2}{L/2} \\qquad\\text{...(1)}$$"}</DM>
<P2>Rod does not slip on the rough surface. Therefore, mechanical energy will be conserved.</P2>
<DM>{"$$\\begin{aligned} & \\Rightarrow mg\\frac{L}{2}(1-\\cos\\theta) = \\frac{1}{2}\\left(\\frac{mL^2}{3}\\right)\\omega^2 \\quad \\Rightarrow \\omega^2 = \\frac{3g(1-\\cos\\theta)}{L} \\\\ & \\Rightarrow v^2 = \\left(\\omega\\frac{L}{2}\\right)^{\\!2} = \\frac{3}{4}gL(1-\\cos\\theta) \\qquad\\text{...(2)} \\end{aligned}$$"}</DM>
<P2>Substituting {"$v^2$"} in eqn. (1), we get {"$mg\\cos\\theta - N\\cos\\theta - f\\sin\\theta = \\dfrac{3mg}{2}(1-\\cos\\theta)$"}</P2>
<P2>When rod looses contact with the ground, {"$N$"} and {"$f$"} become zero. Thus,</P2>
<DM>{"$$mg\\cos\\theta = \\frac{3}{2}mg(1-\\cos\\theta) \\quad \\Rightarrow \\cos\\theta = \\frac{3}{5} \\qquad \\therefore \\quad \\boxed{\\theta = \\cos^{-1}\\!\\left(\\frac{3}{5}\\right)}$$"}</DM>
</div>,

/* ── Ex 43 ── */
<div key="ex-43" id="ex-43">
<ExHd num={43}>A uniform slender bar {"$AB$"} of mass {"$m$"} and length {"$L$"} supported by a frictionless pivot at {"$A$"} is released from rest at its vertical position as shown in the fig. 2.204. Calculate the reaction at pivot when the bar just acquires the horizontal position shown in dotted line.</ExHd>
<Fig src={`${B}17.jpg?height=278&width=254&top_left_y=240&top_left_x=1394`} num="FIGURE 2.204"/>
<SolHd/>
<P2>By conservation of mechanical energy:</P2>
<DM>{"$$\\Rightarrow \\frac{1}{2}\\left(\\frac{mL^2}{3}\\right)\\omega^2 = mg\\frac{L}{2} \\quad \\Rightarrow \\quad \\omega^2 = \\frac{3g}{L}$$"}</DM>
<Fig src={`${B}17.jpg?height=171&width=526&top_left_y=798&top_left_x=1256`} num="FIGURE 2.205"/>
<P2>From FBD,</P2>
<DM>{"$$mg - N_y = ma \\qquad\\text{...(1)}$$"}</DM>
<DM>{"$$N_x = ma_r = m\\omega^2\\frac{L}{2} = m\\left(\\frac{3g}{L}\\right)\\frac{L}{2} \\quad \\Rightarrow N_x = 3mg/2 \\qquad\\text{...(2)}$$"}</DM>
<P2>About pivot {"$A$"},</P2>
<DM>{"$$mg\\frac{L}{2} = I\\alpha = \\left(\\frac{mL^2}{3}\\right)\\left(\\frac{a}{L/2}\\right) \\quad \\Rightarrow \\quad a = \\frac{3g}{4} \\qquad\\text{...(3)}$$"}</DM>
<P2>From (1) and (3), {"$N_y = mg/4$"}</P2>
<P2>Therefore, magnitude of reaction at pivot is</P2>
<DM>{"$$N = \\sqrt{N_x^2+N_y^2} = \\sqrt{(3mg/2)^2+(mg/4)^2} = \\boxed{\\frac{\\sqrt{37}\\,mg}{4}}$$"}</DM>
</div>,

/* ── Ex 44 ── */
<div key="ex-44" id="ex-44">
<ExHd num={44}>A uniform rod of length {"$L$"} and mass {"$m$"} is held vertically on smooth horizontal surface. At {"$t = 0$"}, it is slightly disturbed so that it starts slipping on the smooth surface. Find the angular velocity {"$\\omega$"} and velocity {"$v_0$"} of centre of mass when rod makes angle {"$\\theta$"} with the horizontal.</ExHd>
<SolHd/>
<Fig src={`${B}17.jpg?height=394&width=616&top_left_y=2049&top_left_x=1211`} num="FIGURE 2.206"/>
<P2>Since external force, namely, {"$mg$"} and {"$N$"} act in vertical direction only, the centre of mass will move in the vertical direction. As end {"$A$"} of the rod moves in the horizontal direction and centre {"$C$"} of the rod moves in vertical direction, the instantaneous axis of rotation will be at point {"$O$"} (as shown in the fig. 2.206).</P2>
<P2>Conserving mechanical energy, we obtain</P2>
<DM>{"$$mg\\frac{L}{2}(1-\\sin\\theta) = \\frac{1}{2}I_0\\omega^2 \\qquad\\text{...(1)}$$"}</DM>
<P2>where, {"$I_0$"} is the moment of inertia about instantaneous axis of rotation given by</P2>
<DM>{"$$I_0 = I_{cm}+m\\left(\\frac{L}{2}\\cos\\theta\\right)^{\\!2} \\Rightarrow I_0 = \\frac{mL^2}{12}+\\frac{mL^2}{4}\\cos^2\\theta \\qquad\\text{...(2)}$$"}</DM>
<P2>From eqns. (1) and (2), we get</P2>
<DM>{"$$\\omega = \\sqrt{\\left(\\frac{1-\\sin\\theta}{1+3\\cos^2\\theta}\\right)\\frac{12g}{L}}$$"}</DM>
<P2>The velocity of centre of mass {"$v_0$"} is therefore, given by</P2>
<DM>{"$$v_0 = \\omega\\left(\\frac{L}{2}\\cos\\theta\\right) = \\sqrt{\\left(\\frac{1-\\sin\\theta}{1+3\\cos^2\\theta}\\right)3gL\\cos^2\\theta}$$"}</DM>
</div>,

/* ── Ex 45 ── */
<div key="ex-45" id="ex-45">
<ExHd num={45}>A thin uniform rod of length {"$L$"} is initially kept at rest on a smooth horizontal table. The rod is given an impulse at one end perpendicular to its length. How far does the centre of mass translate while the rod completes one revolution about its centre of mass?</ExHd>
<SolHd/>
<Fig src={`${B}18.jpg?height=322&width=270&top_left_y=1460&top_left_x=472`} num="FIGURE 2.207"/>
<P2>Let {"$J$"} be the impulse given to the rod.</P2>
<P2>Impulse = change in momentum {"$\\Rightarrow J = mv - 0 = mv$"} &nbsp;&nbsp; ...(1)</P2>
<P2>Angular impulse about COM = change in angular momentum about COM</P2>
<DM>{"$$\\Rightarrow \\quad J\\frac{L}{2} = \\left(\\frac{mL^2}{12}\\right)\\omega - 0 \\qquad\\text{...(2)}$$"}</DM>
<P2>From eqns. (1) and (2), we get {"$\\omega = \\dfrac{6v}{L}$"}</P2>
<P2>Time taken to complete one revolution, {"$T = \\dfrac{2\\pi}{\\omega} = \\dfrac{\\pi L}{3v}$"}</P2>
<P2>Therefore, the distance that COM translates {"$= vT = \\boxed{\\dfrac{\\pi L}{3}}$"}</P2>
</div>,

/* ── Ex 46 ── */
<div key="ex-46" id="ex-46">
<ExHd num={46}>A rod of length {"$L$"} lies on a smooth table. It has a mass {"$M$"} and is free to move in any way on the table. A small ball of mass {"$m$"} moving with speed {"$v$"} at a distance {"$d$"} from the centre line as shown in the fig. 2.208 collides elastically with stick.</ExHd>
<Fig src={`${B}18.jpg?height=383&width=405&top_left_y=423&top_left_x=1316`} num="FIGURE 2.208"/>
<P2>(<em>a</em>) What quantities are conserved during collision.</P2>
<P2>(<em>b</em>) What must be the mass of the ball so that it remains at rest immediately after collision?</P2>
<SolHd/>
<P2>During collision, equal and opposite impulsive force act on the ball and the rod.</P2>
<P2>(<em>a</em>) If we consider the system consisting of ball and the rod, linear momentum and angular momentum of the system will be conserved. Since the collision is elastic, mechanical energy will also be conserved.</P2>
<P2>(<em>b</em>) Equating linear momentum, kinetic energy and angular momentum about {"$O$"} before and after the collision, we have</P2>
<DM>{"$$mv = Mv_{cm} \\qquad\\text{...(1)}$$"}</DM>
<DM>{"$$\\frac{1}{2}mv^2 = \\frac{1}{2}Mv_{cm}^2 + \\frac{1}{2}\\left(\\frac{ML^2}{12}\\right)\\omega^2 \\qquad\\text{...(2)}$$"}</DM>
<DM>{"$$mvd = \\left(\\frac{ML^2}{12}\\right)\\omega \\qquad\\text{...(3)}$$"}</DM>
<P2>On solving the above eqns., we obtain</P2>
<DM>{"$$\\boxed{m = \\frac{ML^2}{12d^2+L^2}}$$"}</DM>
<GraspGripBox>
  <P2>Since angular momentum is conserved about any point, we may choose any point say point {"$P$"} (see fig. 2.208) and write a equation for angular momentum about this point. Though the equation will be different, there will be no effect on the final answer.</P2>
</GraspGripBox>
</div>,

/* ── Ex 47 ── */
<div key="ex-47" id="ex-47">
<ExHd num={47}>Two uniform rods {"$A$"} and {"$B$"} of length {"$l$"} each and of masses {"$m$"} and {"$2m$"} respectively are rigidly joined end to end. The combination is pivoted at the lighter end, {"$P$"} as shown in fig. 2.209 such that it can freely rotate about point {"$P$"} in a vertical plane. A small object {"$C$"} of mass {"$5m$"}, moving horizontally, hits the lower end of the combination and sticks to it. What should be the velocity of the object, so that the system could just be raised to the horizontal position.</ExHd>
<Fig src={`${B}19.jpg?height=364&width=327&top_left_y=240&top_left_x=440`} num="FIGURE 2.209"/>
<SolHd/>
<P2>The instantaneous axis of rotation passes through the pivot {"$P$"}. Moment of Inertia of the system about pivot {"$P$"} after the body {"$C$"} gets stuck to the rod is</P2>
<DM>{"$$I = I_A + I_B + I_C = \\frac{ml^2}{3}+\\left[\\frac{(2m)l^2}{12}+2m\\left(\\frac{3l}{2}\\right)^{\\!2}\\right]+5m(2l)^2 = 25\\,ml^2$$"}</DM>
<P2>By conservation of angular momentum about {"$P$"} just before and just after the body {"$C$"} gets stuck, we have</P2>
<DM>{"$$5mv_0(2l) = I\\omega = 25\\,ml^2\\,\\omega \\quad \\Rightarrow \\omega = \\frac{2}{5}\\frac{v_0}{l}$$"}</DM>
<P2>After the body gets stuck, mechanical energy is conserved. In the horizontal position, kinetic energy of the system is zero. By conservation of mechanical energy:</P2>
<DM>{"$$\\Rightarrow \\frac{1}{2}I\\omega^2 = mg\\frac{l}{2}+(2m)g\\frac{3l}{2}+(5m)g(2l)$$"}</DM>
<DM>{"$$\\Rightarrow \\frac{1}{2}(25\\,ml)^2\\left(\\frac{2}{5}\\frac{v_0}{l}\\right)^{\\!2} = \\frac{27}{2}mgl \\qquad \\therefore v_0 = \\boxed{\\sqrt{\\frac{27}{2}\\,gl}}$$"}</DM>
</div>,

/* ── Ex 48 ── */
<div key="ex-48" id="ex-48">
<ExHd num={48}>A uniform rod of length {"$l$"} moving with a downward velocity {"$v_0$"} strikes a peg {"$P$"}. If the coefficient of restitution of impact is {"$e$"}, find the velocity of CM of the rod just after impact.</ExHd>
<Fig src={`${B}19.jpg?height=153&width=368&top_left_y=1684&top_left_x=421`} num="FIGURE 2.210"/>
<SolHd/>
<P2>Let the velocity of COM of rod after impact be {"$v$"} and its angular velocity be {"$\\omega$"}. From conservation of angular momentum about point {"$P$"} just before and after the impact, we have</P2>
<Fig src={`${B}19.jpg?height=175&width=372&top_left_y=2034&top_left_x=421`} num="FIGURE 2.211"/>
<DM>{"$$mv_0 b = mvb + \\frac{ml^2}{12}\\omega \\quad \\Rightarrow 12b(v_0-v) = \\omega l^2 \\qquad\\text{...(1)}$$"}</DM>
<P2>Now, {"$e = \\dfrac{\\text{Relative velocity of separation}}{\\text{Relative velocity of approach}}$"}</P2>
<DM>{"$$\\Rightarrow e = \\frac{b\\omega - v}{v_0} \\quad \\Rightarrow \\quad b\\omega = (ev_0+v) \\qquad\\text{...(2)}$$"}</DM>
<P2>From (1) and (2), we get</P2>
<DM>{"$$12b^2(v_0-v) = l^2(ev_0+v) \\qquad \\therefore v = \\boxed{\\left(\\frac{12b^2-el^2}{12b^2+l^2}\\right)v_0}$$"}</DM>
</div>,

/* ── Ex 49 ── */
<div key="ex-49" id="ex-49">
<ExHd num={49}>A ball of mass {"$m$"} collides elastically with a smooth hanging rod of mass {"$M$"} and length {"$l$"}.</ExHd>
<P2>(<em>a</em>) If {"$M = 3m$"}, find the value {"$b$"} for which no horizontal reaction occurs at the pivot.</P2>
<P2>(<em>b</em>) For what value of {"$m/M$"}, the ball falls dead just after the collision assuming {"$e = 1/2$"}</P2>
<Fig src={`${B}19.jpg?height=278&width=205&top_left_y=640&top_left_x=1727`} num="FIGURE 2.212"/>
<SolHd/>
<P2>(<em>a</em>) As there is no horizontal reaction at the pivot, there is no impulse on the system in horizontal direction. By conservation of linear momentum,</P2>
<Fig src={`${B}19.jpg?height=244&width=208&top_left_y=1108&top_left_x=1241`} num="Before Collision"/>
<Fig src={`${B}19.jpg?height=244&width=282&top_left_y=1108&top_left_x=1525`} num="After Collision"/>
<DM>{"$$mv_0 = mv_1 + M\\omega l/2 \\quad \\Rightarrow \\quad m(v_0-v_1) = M\\omega l/2 \\qquad\\text{...(1)}$$"}</DM>
<P2>By conservation of angular momentum about the pivot,</P2>
<DM>{"$$mv_0 b = mv_1 b + (ML^2/3)\\omega \\quad \\Rightarrow \\quad m(v_0-v_1)b = M\\omega L^2/3 \\qquad\\text{...(2)}$$"}</DM>
<P2>From (1) and (2), {"$\\boxed{b = 2l/3}$"}</P2>
<P2>(<em>b</em>) In this case, there may be horizontal reaction at the pivot. Now, linear momentum may not be conserved but angular momentum about the pivot will still be conserved. So, equation (2) is still valid. Here, {"$v_1 = 0$"} and {"$e = 1/2$"}.</P2>
<P2>At the point of collision, {"$v_2 - v_1 = e(u_1-u_2)$"}</P2>
<DM>{"$$\\Rightarrow \\omega b - 0 = \\frac{1}{2}(v_0-0) \\quad \\Rightarrow \\omega = \\frac{v_0}{2b}$$"}</DM>
<P2>Putting this and {"$v_1 = 0$"} in equation (2), we get</P2>
<DM>{"$$mv_0 b = \\frac{Ml^2}{3}\\times\\frac{v_0}{2b} \\qquad \\therefore \\quad \\boxed{\\frac{m}{M} = \\frac{l^2}{6b^2}}$$"}</DM>
</div>,

/* ── Ex 50 ── */
<div key="ex-50" id="ex-50">
<ExHd num={50}>A uniform rod of length {"$L$"} is hinged at its centre and its free to rotate about its center in the vertical plane (see fig. 2.214). A small ball of mass {"$m$"} dropped from a height {"$h$"}, collides elastically with the rod and rises to height {"$h/4$"}. Find the mass of the rod and its angular velocity {"$\\omega$"} attained.</ExHd>
<Fig src={`${B}20.jpg?height=338&width=534&top_left_y=253&top_left_x=339`} num="FIGURE 2.214"/>
<SolHd/>
<P2>Considering the system of rod and ball, we notice that there is an external impulsive force on the system at point {"$O$"}. Therefore, the linear momentum of the system will not be conserved.</P2>
<P2>However, there will be no external impulsive torque due to this force at point {"$O$"} and hence angular momentum about {"$O$"} shall be conserved during collision.</P2>
<P2>Since the collision is elastic, {"$KE$"} will also be conserved. Let {"$M$"} and {"$\\omega$"} be the mass and angular velocity of the rod respectively. The velocity of the ball just before collision will be {"$\\sqrt{2gh}$"} in the downward direction and {"$\\sqrt{gh/2}$"} just after the collision in the upward direction because it rises to a height {"$h/4$"}. So, we have</P2>
<DM>{"$$m\\sqrt{2gh}\\,d = -m\\sqrt{\\frac{gh}{2}}\\,d + \\frac{ML^2}{12}\\omega \\qquad\\text{...(1)}$$"}</DM>
<DM>{"$$\\frac{1}{2}m(\\sqrt{2gh})^2 = \\frac{1}{2}m\\left(\\sqrt{\\frac{gh}{2}}\\right)^{\\!2}+\\frac{1}{2}\\left(\\frac{ML^2}{12}\\right)\\omega^2 \\qquad\\text{...(2)}$$"}</DM>
<P2>Solving eqns. (1) and (2), we obtain</P2>
<DM>{"$$\\boxed{\\omega = \\sqrt{\\frac{gh}{2d^2}}} \\qquad \\text{and} \\qquad \\boxed{M = 36\\frac{md^2}{L^2}}$$"}</DM>
</div>,

/* ── Ex 51 ── */
<div key="ex-51" id="ex-51">
<ExHd num={51}>A uniform rod of length {"$L$"} making an angle {"$\\theta$"} with the horizontal is dropped from a height {"$h$"} (see fig. 2.215). It collides with the smooth floor elastically. Find the velocity of the centre of mass and its angular velocity {"$\\omega$"} immediately after the collision.</ExHd>
<Fig src={`${B}20.jpg?height=640&width=570&top_left_y=1808&top_left_x=320`} num="FIGURE 2.215"/>
<SolHd/>
<P2>Let {"$v_0$"} be the velocity of centre of mass of the rod immediately after the collision. Since an impulsive force act on the rod at point {"$P$"} during collision, its linear momentum will not be conserved. However, angular momentum of the rod about {"$P$"} would be conserved.</P2>
<P2>Just before collision, the velocity of centre of mass of the rod is {"$\\sqrt{2gh}$"} and angular velocity is zero. Conserving angular momentum about point {"$P$"}, we have</P2>
<DM>{"$$M\\sqrt{2gh}\\frac{L}{2}\\cos\\theta = \\frac{ML^2}{12}\\omega - Mv_0\\frac{L}{2}\\cos\\theta \\qquad\\text{...(1)}$$"}</DM>
<P2>and from energy conservation, we have</P2>
<DM>{"$$\\frac{1}{2}M(\\sqrt{2gh})^2 = \\frac{1}{2}Mv_0^2+\\frac{1}{2}\\left(\\frac{ML^2}{12}\\right)\\omega^2 \\qquad\\text{...(2)}$$"}</DM>
<P2>Solving eqns. (1) and (2), we obtain</P2>
<DM>{"$$\\boxed{\\omega = \\frac{12\\sqrt{2gh}\\cos\\theta}{L(1+3\\cos^2\\theta)}} \\qquad \\text{and} \\qquad \\boxed{v_0 = \\sqrt{2gh}\\left(\\frac{1-3\\cos^2\\theta}{1+3\\cos^2\\theta}\\right)}$$"}</DM>
</div>,

/* ── Ex 52 ── */
<div key="ex-52" id="ex-52">
<ExHd num={52}>Determine the maximum ratio {"$h/b$"} for which the homogenous block will slide without toppling under the action of force {"$F$"}. The coefficient of static friction between the block and the incline is {"$\\mu_s$"}</ExHd>
<Fig src={`${B}20.jpg?height=271&width=377&top_left_y=1289&top_left_x=1332`} num="FIGURE 2.216"/>
<SolHd/>
<P2>If {"$F_s$"} is minimum force required for sliding, then</P2>
<DM>{"$$F_s + mg\\sin\\theta = f = \\mu_s N = \\mu_s mg\\cos\\theta \\quad \\Rightarrow F_s = mg(\\mu_s\\cos\\theta - \\sin\\theta)$$"}</DM>
<P2>If {"$F_t$"} is minimum force required for toppling, then the torque about {"$A$"} is zero. (Note that in this case, normal {"$N$"} passes through {"$A$"})</P2>
<Fig src={`${B}20.jpg?height=330&width=448&top_left_y=1920&top_left_x=1295`} num="FIGURE 2.217"/>
<DM>{"$$\\Rightarrow F_t h + (mg\\sin\\theta)h/2 = (mg\\cos\\theta)b/2 \\quad \\Rightarrow F_t = \\frac{mg}{2}\\left(\\frac{b}{h}\\cos\\theta-\\sin\\theta\\right)$$"}</DM>
<P2>For sliding without toppling, {"$F_s < F_t$"}</P2>
<DM>{"$$\\Rightarrow mg(\\mu_s\\cos\\theta-\\sin\\theta) < \\frac{mg}{2}\\left(\\frac{b}{h}\\cos\\theta-\\sin\\theta\\right)$$"}</DM>
<DM>{"$$\\Rightarrow \\frac{b}{h} > 2\\mu_s - \\tan\\theta \\qquad \\therefore \\quad \\boxed{\\frac{h}{b} < \\frac{1}{2\\mu_s-\\tan\\theta}}$$"}</DM>
</div>,

/* ── Ex 53 ── */
<div key="ex-53" id="ex-53">
<ExHd num={53}>A block of mass {"$m$"}, height {"$h$"} and width {"$b$"} rests on a flat car which moves horizontally with constant acceleration {"$a$"} as shown in fig. 2.218. Determine:</ExHd>
<Fig src={`${B}21.jpg?height=304&width=364&top_left_y=764&top_left_x=425`} num="FIGURE 2.218"/>
<P2>(<em>a</em>) the value of the acceleration at which slipping of the block on the car starts, if the coefficient of friction is {"$\\mu$"}</P2>
<P2>(<em>b</em>) the value of the acceleration at which block topples about {"$A$"}, assuming sufficient friction to prevent slipping and</P2>
<P2>(<em>c</em>) the shortest distance in which it can be stopped from a speed of 20 m s⁻¹ with constant deceleration so that the block is not disturbed.</P2>
<P2>The following data are given: {"$b = 0{\\cdot}2$"} m, {"$h = 0{\\cdot}5$"} m, {"$\\mu = 0{\\cdot}5$"} and {"$g = 10\\text{ ms}^{-2}$"}</P2>
<SolHd/>
<P2>In the frame of car, pseudo force {"$ma$"} acts on the block towards left. It passes through centre {"$C$"} of the block.</P2>
<P2>(<em>a</em>) The slipping of the block starts when static friction force is maximum which is equal to {"$\\mu mg$"}</P2>
<DM>{"$$\\therefore \\quad a_{\\max} = \\frac{f_{\\max}}{m} = \\frac{\\mu mg}{m} = \\mu g = 0{\\cdot}5\\times10 = \\boxed{5\\text{ ms}^{-2}}$$"}</DM>
<P2>(<em>b</em>) When block is about to topple about point {"$P$"}, normal reaction {"$N$"} will pass through {"$P$"}.</P2>
<Fig src={`${B}21.jpg?height=369&width=347&top_left_y=1890&top_left_x=433`} num="FIGURE 2.219"/>
<P2>The block topples about {"$P$"} when torque due to {"$ma$"} exceeds the torque due to {"$mg$"}</P2>
<P2>or {"$ma(h/2) > mg(b/2)$"} or {"$a > bg/h = 0{\\cdot}2\\times10/0{\\cdot}5 = \\boxed{4\\text{ ms}^{-2}}$"}</P2>
<P2>(<em>c</em>) Now, {"$a_{\\max} = 5$"} ms⁻² for no slipping and {"$a_{\\max} = 4$"} ms⁻² for no toppling. Hence, the maximum deceleration of car so that the block is not disturbed is 4 ms⁻².</P2>
<P2>From {"$v^2 - u^2 = 2as$"}, we have {"$0^2 - 20^2 = 2(-4)s_{\\min}$"}</P2>
<DM>{"$$\\therefore \\quad \\boxed{s_{\\min} = 50\\text{ m}}$$"}</DM>
</div>,

/* ── Ex 54 ── */
<div key="ex-54" id="ex-54">
<ExHd num={54}>A cube of side {"$a$"} moves translationally on smooth horizontal surface (see fig. 2.220). At point {"$P$"}, it collides inelastically with a small obstacle. As a result, it starts rotating about it. Find the minimum velocity {"$v$"} that should be imparted to the block so that it topples over.</ExHd>
<Fig src={`${B}21.jpg?height=220&width=548&top_left_y=700&top_left_x=1246`} num="FIGURE 2.220"/>
<SolHd/>
<P2>During collision, angular momentum about {"$P$"} would be conserved. Energy will not be conserved as collision is not elastic. Let {"$\\omega_0$"} be the angular velocity of cube just after collision. Conserving angular momentum about {"$P$"}, we obtain</P2>
<DM>{"$$mv\\frac{a}{2} = I_P\\omega_0 \\quad \\text{where} \\quad I_P = I_{cm}+md^2 = m\\left(\\frac{a^2}{12}+\\frac{a^2}{12}\\right)+m\\left(\\frac{a}{\\sqrt{2}}\\right)^{\\!2} = \\frac{2}{3}ma^2$$"}</DM>
<DM>{"$$\\Rightarrow mv\\frac{a}{2} = \\frac{2}{3}ma^2\\omega_0 \\qquad \\therefore v = \\frac{4}{3}a\\omega_0 \\qquad\\text{...(1)}$$"}</DM>
<P2>The cube will topple over if it manages to rotate by {"$\\pi/4$"}. Applying energy conservation after the collision, we have</P2>
<DM>{"$$\\frac{1}{2}I_P\\omega_0^2 + mg\\frac{a}{2} = mg\\frac{a}{\\sqrt{2}}$$"}</DM>
<DM>{"$$\\Rightarrow \\omega_0^2 = \\frac{mga}{I_P}(\\sqrt{2}-1) \\quad \\Rightarrow \\omega_0 = \\sqrt{\\frac{3g}{2a}(\\sqrt{2}-1)}$$"}</DM>
<P2>Substituting it in eqn. (1), we get</P2>
<DM>{"$$\\boxed{v = \\sqrt{\\frac{8}{3}\\,ga(\\sqrt{2}-1)}}$$"}</DM>
</div>,

/* ── Ex 55 ── */
<div key="ex-55" id="ex-55">
<ExHd num={55}>A solid cube of wood of side {"$2a$"} and mass {"$M$"} is resting on a horizontal surface. The cube is constrained to rotate about an axis passing through {"$A$"} and perpendicular to face {"$ABCD$"}. A bullet of mass {"$m$"} and speed {"$v$"} is shot at a height of {"$4a/3$"} as shown in the fig. 2.221. The bullet becomes embedded in the cube. Find the minimum value of {"$v$"} required to topple the cube. Assume {"$m \\ll M$"}.</ExHd>
<Fig src={`${B}21.jpg?height=218&width=394&top_left_y=2242&top_left_x=1323`} num="FIGURE 2.221"/>
<SolHd/>
<P2>During collision, angular momentum about {"$D$"} is conserved.</P2>
<DM>{"$$\\Rightarrow mv(4a/3) = I_D\\omega$$"}</DM>
<DM>{"$$I_D = I_{cm}+M(\\sqrt{2}\\,a)^2 = \\frac{M(2a)^2}{6}+2Ma^2 = \\frac{8}{3}Ma^2$$"}</DM>
<DM>{"$$\\Rightarrow mv\\frac{4a}{3} = \\frac{8}{3}Ma^2\\omega \\quad \\Rightarrow \\omega = \\frac{mv}{2Ma}$$"}</DM>
<Fig src={`${B}22.jpg?height=598&width=776&top_left_y=274&top_left_x=215`} num="FIGURE 2.222"/>
<P2>The cube will topple if it manages to rotate by {"$\\pi/4$"}. Applying energy conservation after collision, we have</P2>
<DM>{"$$\\frac{1}{2}I_D\\omega^2 = Mg(\\sqrt{2}\\,a-a) \\quad \\Rightarrow \\frac{1}{2}\\cdot\\frac{8}{3}Ma^2\\cdot\\left(\\frac{mv}{2Ma}\\right)^{\\!2} = Mga(\\sqrt{2}-1)$$"}</DM>
<DM>{"$$\\therefore \\quad \\boxed{v = \\frac{M}{m}\\sqrt{3ga(\\sqrt{2}-1)}}$$"}</DM>
</div>,

/* ── Ex 56 ── */
<div key="ex-56" id="ex-56">
<ExHd num={56}>A square frame is formed by four rods, each of length {"$l = 60$"} cm. Mass of two rods {"$AB$"} and {"$BC$"} is {"$m_1 = 25/18$"} kg each while that of rods {"$AD$"} and {"$CD$"} is {"$m_2 = 2$"} kg each. The frame is free to rotate about a fixed horizontal axis passing through its geometric centre {"$O$"} as shown in fig. 2.223. A spring is placed on the rod {"$AB$"} at a distance {"$l/4 = 15$"} cm from {"$B$"}. The spring is held vertical and a block is placed on upper end of the spring so that rod {"$AB$"} is horizontal.</ExHd>
<P2>(<em>a</em>) Calculate mass {"$M$"} of the block</P2>
<P2>(<em>b</em>) If the spring is initially compressed by connecting a thread between its ends and energy stored in it is {"$76{\\cdot}5$"} J, calculate velocity with which block bounces up when the thread is burnt.</P2>
<Fig src={`${B}22.jpg?height=390&width=302&top_left_y=240&top_left_x=1370`} num="FIGURE 2.223"/>
<SolHd/>
<P2>(<em>a</em>) As the system is in equilibrium, the net torque about {"$O$"} is zero. There is no torque due to rods {"$AB$"} and {"$CD$"}. The clockwise torque due to {"$M$"} and rod {"$BC$"} is equal to the anticlockwise torque due to rod {"$AD$"}.</P2>
<DM>{"$$Mg\\frac{l}{4}+m_1 g\\frac{l}{2} = m_2 g\\frac{l}{2} \\quad \\therefore M = 2(m_2-m_1) = 2(2-25/18) = \\boxed{11/9\\text{ kg}}$$"}</DM>
<P2>(<em>b</em>) Moment of inertia of four rods about {"$O$"} is</P2>
<DM>{"$$I = 2\\left[\\frac{m_1 l^2}{12}+m_1\\left(\\frac{l}{12}\\right)^{\\!2}\\right]+2\\left[\\frac{m_2 l^2}{12}+m_2\\left(\\frac{l}{2}\\right)^{\\!2}\\right] = \\frac{2}{3}(m_1+m_2)l^2 = \\frac{61}{75}\\text{ kg m}^2$$"}</DM>
<P2>Let {"$v$"} be the velocity by which the block bounces up when the thread is burnt. Then, by conservation of mechanical energy,</P2>
<DM>{"$$\\frac{1}{2}Mv^2+\\frac{1}{2}I\\omega^2 = 76{\\cdot}5 \\qquad\\text{...(1)}$$"}</DM>
<P2>and by conservation of angular momentum about {"$O$"},</P2>
<DM>{"$$Mv\\frac{l}{4} = I\\omega \\quad \\Rightarrow \\omega = \\frac{Mvl}{4I}$$"}</DM>
<P2>Putting this in eqn (1), we get</P2>
<DM>{"$$Mv^2+I\\left(\\frac{Mvl}{4I}\\right)^{\\!2} = 2\\times76{\\cdot}5 \\quad \\Rightarrow Mv^2\\left(1+\\frac{Ml^2}{16I}\\right)=153$$"}</DM>
<DM>{"$$\\Rightarrow \\frac{11}{9}v^2\\left[1+\\frac{(11/9)\\cdot0{\\cdot}6^2}{16(61/75)}\\right]=153 \\qquad \\therefore \\quad \\boxed{v = 11\\text{ ms}^{-1}}$$"}</DM>
</div>,
];

export default function AppBooster2() {
  useFonts();
  const [tocOpen, setTocOpen] = useState(false);
  return (
    <div style={{ background:"#fff", minHeight:"100vh",
      fontFamily:"'Lora',Georgia,serif", fontSize:17, lineHeight:1.58, color:"#1a1a1a" }}>
      <HamburgerBtn open={tocOpen} setOpen={setTocOpen}/>
      <Backdrop open={tocOpen} onClick={() => setTocOpen(false)}/>
      <Sidebar open={tocOpen} setOpen={setTocOpen} tocItems={TOC}/>
      <div style={{ padding:"0 clamp(14px,4vw,28px) 60px clamp(14px,4vw,28px)", overflowX:"hidden" }}>
        <AppBoosterCover/>
        {allContent}
      </div>
    </div>
  );
}
