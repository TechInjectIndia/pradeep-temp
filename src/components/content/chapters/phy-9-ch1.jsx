"use client";
import { CONTENT_IMAGES } from "@/assets/content-images";
import { useState, useEffect } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────
const P_COLOR = "#c0126a";
const LIGHT_P  = "#f9eef4";

// ── FONT LOADER ───────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel  = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800&display=swap";
    document.head.appendChild(l);
  }, []);
}

// ── INLINE MATH HELPERS ───────────────────────────────────────
const Sup = ({ c }) => <sup style={{ fontSize: "0.72em" }}>{c}</sup>;
const Sub = ({ c }) => <sub style={{ fontSize: "0.72em" }}>{c}</sub>;

const Frac = ({ n, d }) => (
  <span style={{ display:"inline-flex", flexDirection:"column", alignItems:"center",
    verticalAlign:"middle", lineHeight:1.25, margin:"0 3px", fontSize:"0.95em" }}>
    <span style={{ borderBottom:"1.5px solid #1a1a1a", padding:"0 4px 1px",
      textAlign:"center", whiteSpace:"nowrap" }}>{n}</span>
    <span style={{ padding:"1px 4px 0", textAlign:"center", whiteSpace:"nowrap" }}>{d}</span>
  </span>
);

const MathBlock = ({ children }) => (
  <div style={{ textAlign:"center", margin:"14px 20px",
    fontStyle:"italic", fontSize:"14.5px", lineHeight:1.6 }}>{children}</div>
);

const Arrow = () => <span style={{ margin:"0 6px" }}>⟶</span>;
const Eq    = () => <span style={{ margin:"0 6px" }}>⇌</span>;
const Times = () => <span style={{ margin:"0 4px" }}>×</span>;

// ── HEADING HIERARCHY ─────────────────────────────────────────
const SecHd = ({ id, label, title }) => (
  <div id={id} style={{ marginTop:22, marginBottom:10 }}>
    <h2 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:14,
      fontWeight:800, color:P_COLOR, textTransform:"uppercase",
      letterSpacing:"0.5px", margin:0 }}>
      {label}. {title}
    </h2>
    <div style={{ borderTop:"1.5px solid "+P_COLOR, marginTop:4 }} />
  </div>
);

const SubHd = ({ id, label, title }) => (
  <h3 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:14,
    fontWeight:700, color:P_COLOR, margin:"16px 0 8px" }}>{label}. {title}</h3>
);

const SubSubHd = ({ id, label, title }) => (
  <h4 id={id} style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:13.5,
    fontWeight:700, color:P_COLOR, margin:"14px 0 7px" }}>{label}. {title}</h4>
);

// ── PARAGRAPH ─────────────────────────────────────────────────
const P2 = ({ children, style }) => (
  <p style={{ margin:"0 0 8px", textAlign:"justify", ...style }}>{children}</p>
);

// ── CONTENT BLOCKS ────────────────────────────────────────────
const DefBox = ({ children }) => (
  <div style={{ border:"1.5px solid #888", padding:"10px 16px", margin:"12px 0",
    fontStyle:"italic", background:"#fafafa", fontSize:"14px", lineHeight:1.55 }}>
    {children}
  </div>
);

const ProblemsBox = ({ children }) => (
  <div style={{ border:"2px solid "+P_COLOR, margin:"20px 0" }}>
    <div style={{ background:P_COLOR, color:"#fff", textAlign:"center",
      fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontWeight:900, fontSize:16, letterSpacing:2, padding:7 }}>
      PROBLEMS FOR PRACTICE
    </div>
    <div style={{ padding:"12px 18px" }}>{children}</div>
  </div>
);

const FootNote = ({ children }) => (
  <span style={{ fontSize:"12px", color:"#555", fontStyle:"italic", display:"block",
    marginTop:8, paddingTop:6, borderTop:"1px solid #ddd" }}>
    <sup style={{ color:P_COLOR, fontWeight:700, marginRight:1 }}>*</sup>
    {children}
  </span>
);

const Fig = ({ src, num, caption }) => (
  <div style={{ margin:"20px auto", textAlign:"center", maxWidth:"90%" }}>
    <img src={src} alt={caption || num || "figure"}
      style={{ maxWidth:"100%", height:"auto", border:"1px solid #ddd",
        display:"block", margin:"0 auto" }}
      onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
    />
    <div style={{ display:"none", alignItems:"center", justifyContent:"center",
      border:"1.5px dashed "+P_COLOR, background:LIGHT_P, minHeight:80,
      padding:"12px 20px", color:P_COLOR,
      fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:12 }}>
      📷 {num ? `[${num}] ` : ""}Image: <code style={{ marginLeft:6 }}>{src}</code>
    </div>
    {(num || caption) && (
      <p style={{ fontSize:12.5, color:"#444", fontStyle:"italic",
        margin:"6px auto 0", maxWidth:480, lineHeight:1.45 }}>
        {num && <strong style={{ color:P_COLOR, fontStyle:"normal" }}>{num}. </strong>}
        {caption}
      </p>
    )}
  </div>
);

const NumericalSection = ({ topic, children }) => (
  <div style={{ margin:"20px 0", border:"1.5px solid "+P_COLOR }}>
    <div style={{ background:P_COLOR, color:"#fff", padding:"6px 14px",
      fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:900,
      fontSize:12, letterSpacing:1 }}>
      SOLVED PROBLEMS
    </div>
    {topic && (
      <div style={{ background:LIGHT_P, padding:"4px 14px",
        fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700,
        fontSize:12, color:P_COLOR, letterSpacing:0.5 }}>
        PROBLEMS BASED ON {topic}
      </div>
    )}
    <div style={{ padding:"14px 18px" }}>{children}</div>
  </div>
);

// ── TABLE STYLES ──────────────────────────────────────────────
const th = {
  border:"1.5px solid #555", padding:"6px 10px", textAlign:"center",
  fontWeight:700, fontFamily:"'Merriweather Sans',Arial,sans-serif",
  fontSize:13, background:"#f0f0f0"
};
const td = {
  border:"1px solid #888", padding:"5px 9px", verticalAlign:"top", fontSize:13.5
};

// ── HAMBURGER BUTTON ──────────────────────────────────────────
function HamburgerBtn({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(o => !o)}
      aria-label={open ? "Close table of contents" : "Open table of contents"}
      style={{
        position:"fixed", top:14, left:14, zIndex:1100,
        background:"#fff", color:P_COLOR, border:"2px solid #2563eb",
        borderRadius:8, width:40, height:40, cursor:"pointer",
        fontSize:20, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:"0 4px 14px rgba(0,0,0,0.15)",
        fontFamily:"system-ui,sans-serif",
      }}>
      {open ? "✕" : "☰"}
    </button>
  );
}

// ── BACKDROP ──────────────────────────────────────────────────
function Backdrop({ open, onClick }) {
  if (!open) return null;
  return (
    <div onClick={onClick} style={{
      position:"fixed", inset:0, zIndex:1050,
      background:"rgba(0,0,0,0.18)",
      backdropFilter:"blur(2px)",
      WebkitBackdropFilter:"blur(2px)",
    }} />
  );
}

// ── SIDEBAR / TOC DRAWER ──────────────────────────────────────
function Sidebar({ open, setOpen, tocItems }) {
  const handleClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
    setOpen(false);
  };
  return (
    <div style={{
      position:"fixed", top:0, left:0, zIndex:1060,
      width:260, height:"100vh",
      background:"#fff", borderRight:"1px solid #e0e0e0",
      boxShadow:"4px 0 24px rgba(0,0,0,0.13)",
      transform: open ? "translateX(0)" : "translateX(-100%)",
      transition:"transform 0.25s cubic-bezier(0.4,0,0.2,1)",
      overflowY:"auto", overflowX:"hidden",
      display:"flex", flexDirection:"column",
    }}>
      <div style={{
        background:P_COLOR, color:"#fff", padding:"14px 16px 12px",
        fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:900, fontSize:13, letterSpacing:2,
        flexShrink:0,
      }}>
        TABLE OF CONTENTS
      </div>
      <nav style={{ padding:"8px 0", flex:1 }}>
        {tocItems.map(item => (
          <button key={item.id} onClick={() => handleClick(item.id)} style={{
            display:"block", width:"100%", textAlign:"left",
            background:"none", border:"none", cursor:"pointer",
            padding: item.level===1 ? "6px 16px"
              : item.level===2 ? "4px 16px 4px 28px"
              : "3px 16px 3px 40px",
            fontFamily:"'Merriweather Sans',Arial,sans-serif",
            fontWeight: item.level===1 ? 700 : 400,
            fontSize: item.level===1 ? 12 : 11,
            color: item.level===1 ? P_COLOR : "#444",
            borderLeft: item.level===1 ? "3px solid "+P_COLOR : "none",
            marginBottom:2, lineHeight:1.4,
          }}>
            {item.label} {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

// ── CHAPTER COVER ─────────────────────────────────────────────
const chapterNumber = "1";
const chapterTitle  = "MOTION";

const ChapterCover = () => (
  <div style={{ background:"linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
    padding:"60px 48px 50px", textAlign:"center", marginBottom:0 }}>
    <div style={{ display:"inline-block", border:"3px solid #fff", padding:"8px 28px", marginBottom:18 }}>
      <span style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",
        fontWeight:900, fontSize:56, color:"#fff", lineHeight:1 }}>
        {chapterNumber}
      </span>
    </div>
    <h1 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",
      fontWeight:900, fontSize:38, color:"#fff",
      letterSpacing:"4px", margin:0, textTransform:"uppercase" }}>
      {chapterTitle}
    </h1>
  </div>
);

// ── CONTENT — BATCH 1 ─────────────────────────────────────────
const content_b1 = [

  // ── 1.1 INTRODUCTION ──────────────────────────────────────
  <SecHd key="sec-s11" id="s11" label="1.1" title="Introduction" />,
  <p key="b1-p-s11-1" style={{ textIndent:28, textAlign:"justify" }}>
    As we all know, <strong>motion means movement.</strong> The motion or movement is one of the vital signs of life
    in an organism. For example, <strong>animals</strong> and <strong>humans</strong> can move their body parts or they
    can move from one place to another without any external help. <strong>The plants</strong> are fixed at a place in
    the soil. They can move parts of their body such as leaves, flowers and branches etc. Again, a bird moves when it
    flies in the air, a fish moves when it swims in water and so on.
  </p>,
  <p key="b1-p-s11-2" style={{ textIndent:28, textAlign:"justify" }}>
    <strong>Non living things</strong> cannot move on their own. We have to apply some external force to move them. For
    example, a scooter, a car, a bus and a truck move on the road when force is applied on them by their engines.
  </p>,
  <DefBox key="def-s11-1">
    <strong style={{ color:P_COLOR }}>The motion</strong> <em>of an object is perceived when its position changes continuously with respect to some stationary object.</em>
  </DefBox>,
  <p key="b1-p-s11-3" style={{ textIndent:28, textAlign:"justify" }}>
    However, there are situations where <strong><em>motion is inferred through indirect evidence</em></strong>. For example, motion
    of air is detected by movement of dust particles, leaves and branches of trees. Similarly, the phenomena of sunrise,
    sunset and changing of seasons are now understood to be due to rotation of the Earth. Atoms, molecules, planets,
    stars and galaxies are all in motion.
  </p>,
  <p key="b1-p-s11-4" style={{ textIndent:28, textAlign:"justify" }}>
    Further, <strong><em>an object may appear to be moving to one person and the same object may appear to be at rest to another person.</em></strong> For
    example, when a bus is moving on a road,
  </p>,
  <p key="b1-p-s11-5" style={{ margin:"0 0 4px 28px", textAlign:"justify" }}>
    <strong>(<em>i</em>)</strong> the roadside trees appear to be moving backwards to the passengers,
  </p>,
  <p key="b1-p-s11-6" style={{ margin:"0 0 4px 28px", textAlign:"justify" }}>
    <strong>(<em>ii</em>)</strong> A person standing on the road finds the bus and the passengers moving forward,
  </p>,
  <p key="b1-p-s11-7" style={{ margin:"0 0 8px 28px", textAlign:"justify" }}>
    <strong>(<em>iii</em>)</strong> A person inside the moving bus finds his fellow passengers at rest.
  </p>,
  <p key="b1-p-s11-8" style={{ textIndent:28, textAlign:"justify" }}>
    Thus, <strong><em>the states of rest and motion are relative only.</em></strong> For example, our house is at rest with
    respect to other houses on the Earth. But if we were to look at our house from outside the Earth, it will be seen
    to share the motion of Earth.
  </p>,
  <p key="b1-p-s11-9" style={{ textIndent:28, textAlign:"justify" }}>
    In this chapter, we shall confine ourselves to the study of motion of objects along a straight line. We shall use
    simple equations and graphs to represent such motions. Later on, we shall briefly discuss circular motion.
  </p>,

  // ── 1.2 DISTANCE AND DISPLACEMENT ─────────────────────────
  <SecHd key="sec-s12" id="s12" label="1.2" title="Describing Motion: Concept of Distance and Displacement" />,
  <p key="b1-p-s12-1" style={{ textIndent:28, textAlign:"justify" }}>
    We have learnt that the motion of an object is perceived when its position changes continuously with respect to some
    stationary object. Therefore, in describing motion, we learn first to describe the location of an object. To locate
    an object, we have to specify or choose some <strong>suitable reference point.</strong> For example, when we say that
    our house is 1 km east of the railway station, we choose the railway station as the reference point and location of
    house is specified with respect to the railway station. The reference point is called the <strong>origin</strong>.
  </p>,
  <p key="b1-p-s12-2" style={{ textIndent:28, textAlign:"justify" }}>
    It is not necessary to choose the railway station as the reference point always. We can choose anything else as the
    reference point, which would serve as the origin. Let us now understand the concept of distance and displacement.
  </p>,
  <DefBox key="def-s12-1">
    The distance travelled by an object is the length of the actual path traversed by the object during motion.
  </DefBox>,
  <Fig key="fig-1-1"
    src={CONTENT_IMAGES.CONTENT_IMAGE_9C66C74E085E8D596A8A}
    num="Fig. 1.1" caption="Object journey from O along straight line OX" />,
  <p key="b1-p-s12-3" style={{ textIndent:28, textAlign:"justify" }}>
    For example, suppose an object starts its journey from O, along a straight line OX. A, B, C are the positions of
    the object at different instants of time where OA = 25 km, OB = 40 km and OC = 100 km. Let the object go from O
    to C and come back to B along the same straight line. The total path length covered by the object = OC + CB =
    OC + (OC – OB) = 100 km + (100 – 40) km = 160 km. This is the distance travelled by the object.
  </p>,
  <p key="b1-p-s12-4" style={{ textIndent:28, textAlign:"justify" }}>
    Thus, to describe the distance, we need to specify only its numerical value and the unit. The direction of motion
    need not be specified. Therefore, <strong>distance is a scalar quantity.</strong>
  </p>,
  <p key="b1-p-s12-5" style={{ textIndent:28, textAlign:"justify" }}>
    Obviously, during motion of the object, the value of distance can never be zero or negative.
  </p>,
  <DefBox key="def-s12-2">
    The displacement of an object in motion is the shortest distance between the initial position and final position of the object.
  </DefBox>,
  <p key="b1-p-s12-6" style={{ textIndent:28, textAlign:"justify" }}>
    In the example given above, when an object goes from O to C and comes back to B, its final position is B and
    initial position, of course, is O. Therefore, displacement of the object = <em>OB</em>⃗. Obviously, displacement is
    a <strong>vector quantity</strong>, having both the magnitude as well as the direction. In this case, the magnitude
    of displacement |<em>OB</em>⃗| = 40 km and its direction is from initial position O to the final position B.
  </p>,
  <p key="b1-p-s12-7" style={{ textIndent:28, textAlign:"justify" }}>
    For example, suppose an object starts from O, travels 5 km towards east, represented by OA [Fig. 1.2]; 5 km towards
    north, represented by AB and 10 km towards west, represented by BC. The distance travelled by the object in going
    from O to C = OA + AB + BC = 5 km + 5 km + 10 km = 20 km.
  </p>,
  <p key="b1-p-s12-8" style={{ textIndent:28, textAlign:"justify" }}>
    The displacement of the object in going from O to C = <em>OC</em>⃗ where OC = |<em>OC</em>⃗| = √(5² + 5²) = 5√2 km.
  </p>,
  <Fig key="fig-1-2"
    src={CONTENT_IMAGES.CONTENT_IMAGE_F9B452D7FF63458CB78E}
    num="Fig. 1.2" caption="Object travelling east, north and west" />,

  // Distinction between distance and displacement
  <p key="b1-p-s12-9" style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:13.5, margin:"16px 0 8px" }}>
    Distinction between distance and displacement
  </p>,
  <p key="b1-p-s12-10" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>i</em>)</strong> Distance is a scalar quantity having magnitude only. Displacement is a vector quantity having both, the magnitude as well as direction.
  </p>,
  <p key="b1-p-s12-11" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>ii</em>)</strong> Both, the distance and displacement have the same units.
  </p>,
  <p key="b1-p-s12-12" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>iii</em>)</strong> The distance travelled by an object in motion can never be zero or negative. The displacement of an object can be positive, zero or negative.
  </p>,
  <p key="b1-p-s12-13" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>iv</em>)</strong> When final position of an object in motion coincides with its initial position, the displacement is zero, but the distance travelled is not zero. The reverse is not true, <em>i.e.,</em> when distance travelled is zero, the object may be at rest. Its displacement would also be zero.
  </p>,
  <p key="b1-p-s12-14" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>v</em>)</strong> Between two given positions, <em>i.e.,</em> initial position and final position, distance can have any value depending on the actual path followed, but displacement has only one value, <em>i.e.,</em> displacement is the shortest distance between the initial position and final position of the object. Displacement does not depend upon the actual path followed by the body.
  </p>,
  <p key="b1-p-s12-15" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>vi</em>)</strong> Corresponding to a given displacement (between initial position and final position), distance travelled may be larger than the displacement. However, when motion from initial position to final position is along a single straight line, distance travelled is equal to magnitude of displacement. In no case, distance travelled can be less than the displacement.
  </p>,
  <p key="b1-p-s12-16" style={{ margin:"0 0 8px 14px", textAlign:"justify" }}>
    <strong>(<em>vii</em>)</strong> Neither the distance nor the displacement gives any information about the nature of motion followed by the object.
  </p>,

  // Solved Problems — Distance and Displacement
  <NumericalSection key="num-dist-disp" topic="DISTANCE AND DISPLACEMENT">
    <div style={{ background:LIGHT_P, padding:"8px 12px", marginBottom:12, borderRadius:4 }}>
      <strong>Formulae and Units</strong>
      <ol style={{ paddingLeft:20, margin:"6px 0 0", lineHeight:1.8, fontSize:14 }}>
        <li>Distance = length of actual path traversed.</li>
        <li>Displacement = shortest distance between the initial position and final position.</li>
        <li>When final position coincides with the initial position, displacement = 0 but distance ≠ 0.</li>
        <li>Both, the distance and displacement are measured in metre or cm or km.</li>
      </ol>
    </div>
    <p key="b1-np1-q" style={{ textAlign:"justify" }}>
      <strong>Problem 1.</strong> An object is moving in a circle of radius <em>r</em>. Calculate the distance and displacement
      (<em>i</em>) when it completes half the circle. (<em>ii</em>) when it completes one full circle.
    </p>
    <p key="b1-np1-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> Let O be the centre of a circle of radius <em>r</em>, Fig. 1.3.
    </p>
    <p key="b1-np1-s2" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>(<em>i</em>)</strong> When the object completes half the circle, it moves from A to B.
    </p>
    <MathBlock key="b1-np1-m1">Distance = <Frac n="1" d="2" /> × circumference of circle = <Frac n="1" d="2" /> × 2π<em>r</em> = <strong>π<em>r</em></strong></MathBlock>
    <MathBlock key="b1-np1-m2">Displacement = <em>AB</em>⃗ = <strong>2<em>r</em></strong> (in magnitude).</MathBlock>
    <p key="b1-np1-s3" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>(<em>ii</em>)</strong> When the object completes one full circle, it starts from A and comes back to A.
    </p>
    <MathBlock key="b1-np1-m3">Distance = circumference of circle = <strong>2π<em>r</em></strong></MathBlock>
    <MathBlock key="b1-np1-m4">Displacement = <strong>zero</strong>, as final position coincides with the initial position.</MathBlock>
    <Fig key="fig-1-3"
      src={CONTENT_IMAGES.CONTENT_IMAGE_90E574033C8E06D514C1}
      num="Fig. 1.3" caption="Object moving in a circle of radius r" />
    <p key="b1-np2-q" style={{ textAlign:"justify", marginTop:12 }}>
      <strong>Problem 2.</strong> A particle moves 3 m due north, then 4 m due east and finally 6 m due south. Calculate the distance travelled and the displacement.
    </p>
    <p key="b1-np2-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> As shown in Fig. 1.4, the particle starts from O and moves 3 m north (= OA), 4 m east (= AB), and 6 m south (= BC).
    </p>
    <MathBlock key="b1-np2-m1">Distance travelled = OA + AB + BC = 3 m + 4 m + 6 m = <strong>13 m</strong></MathBlock>
    <MathBlock key="b1-np2-m2">Displacement = <em>OC</em>⃗, where OC = √(AB² + (BC – BD)²) = √(4² + (6 – 3)²) = √(16 + 9) = <strong>5 m</strong></MathBlock>
    <Fig key="fig-1-4"
      src={CONTENT_IMAGES.CONTENT_IMAGE_D1A35E4F7930F5963DD0}
      num="Fig. 1.4" caption="Particle moving north, east and south" />
  </NumericalSection>,

  // Problems for Practice — Distance/Displacement
  <ProblemsBox key="prob-s12">
    <ol style={{ paddingLeft:28, listStyleType:"decimal", listStylePosition:"outside", fontSize:14, lineHeight:1.8, margin:0 }}>
      <li style={{ marginBottom:6 }}>A body travels a distance of 15 m from A to B and then moves a distance of 20 m at right angles to AB. Calculate the total distance travelled and the displacement. <strong>[Ans. 35 m ; 25 m]</strong></li>
      <li style={{ marginBottom:6 }}>A particle is moving in a circle of diameter 5 m. Calculate the distance covered and the displacement when it completes 3 revolutions. <strong>[Ans. 15π metre ; zero]</strong></li>
      <li style={{ marginBottom:6 }}>In a long distance race, the athletes were expected to take four rounds of the track such that the line of finish was same as the line of start. Suppose the length of the track was 200 m.
        <br/>(<em>a</em>) What is the total distance to be covered by the athletes ?
        <br/>(<em>b</em>) What is the displacement of the athletes when they touch the finish line ?
        <br/>(<em>c</em>) Is the motion of the athletes uniform or non-uniform ?
        <br/>(<em>d</em>) Is the displacement of an athlete and the distance moved by him at the end of the race equal ?
        <br/><strong>[Ans. (<em>a</em>) 800 m (<em>b</em>) zero (<em>c</em>) non-uniform (<em>d</em>) No]</strong>
      </li>
    </ol>
    <div style={{ marginTop:12, borderTop:"1px solid #e0c0d8", paddingTop:10 }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:12, color:P_COLOR, margin:"0 0 8px", letterSpacing:1 }}>■ SOLUTIONS/EXPLANATIONS ■</p>
      <p style={{ fontSize:14, textAlign:"justify", margin:"0 0 6px" }}>
        <strong>1.</strong> Here, AB = 15 m ; BC = 20 m.&nbsp;
        Distance = AB + BC = 15 + 20 = <strong>35 m</strong>.&nbsp;
        Displacement = |AC⃗| = √(15² + 20²) = √625 = <strong>25 m</strong>.
      </p>
      <Fig key="fig-1-5"
        src={CONTENT_IMAGES.CONTENT_IMAGE_5F7AC8CFCDBD3FC74DCB}
        num="Fig. 1.5" caption="Right-angle path: A to B to C" />
      <p style={{ fontSize:14, textAlign:"justify", margin:"0 0 6px" }}>
        <strong>2.</strong> Here, diameter <em>d</em> = 5 m.&nbsp;
        Distance covered in 3 revolutions = 3 × 2π<em>r</em> = 3 × π<em>d</em> = <strong>15π metre</strong>.&nbsp;
        Displacement = 0, as final position coincides with the initial position.
      </p>
      <p style={{ fontSize:14, textAlign:"justify", margin:"0 0 6px" }}>
        <strong>3.</strong> (<em>a</em>) Distance covered = 4 × 200 = <strong>800 m</strong>.&nbsp;
        (<em>b</em>) Displacement = <strong>0</strong>, as athletes finish at the starting line.&nbsp;
        (<em>c</em>) Motion is <strong>non-uniform</strong> as the direction is changing.&nbsp;
        (<em>d</em>) <strong>No</strong>, displacement and distance covered are not equal.
      </p>
    </div>
  </ProblemsBox>,

  // ── 1.3 UNIFORM MOTION ────────────────────────────────────
  <SecHd key="sec-s13" id="s13" label="1.3" title="Uniform Motion" />,
  <DefBox key="def-s13-1">
    <em>When an object travels equal distances in equal intervals of time, howsoever small the interval may be, the </em><strong style={{ color:P_COLOR }}>motion of the object is said to be uniform.</strong>
  </DefBox>,
  <p key="b1-p-s13-1" style={{ textIndent:28, textAlign:"justify" }}>
    For example, suppose a car covers 60 km in first hour, another 60 km in second hour, again 60 km in the third hour
    and so on. The motion of the car is uniform motion. Let us now understand the meaning of the words, <em>'howsoever small the time interval may be'</em> used in the definition. In the above example, the car travels a distance of 60 km in
    each hour. In the stricter sense, the car should travel 30 km in each half hour; 15 km in every 15 minutes; 10 km
    in every 10 minutes, 5 km in every 5 minutes and 1 km in every one minute. Only then, the motion of the car can
    be said to be uniform. However, in broader sense, we do not mind even when time interval is big. The motion of the
    car is taken as uniform when it covers a distance of 60 km in every one hour.
  </p>,

  // ── 1.4 NON-UNIFORM MOTION ────────────────────────────────
  <SecHd key="sec-s14" id="s14" label="1.4" title="Non-Uniform Motion" />,
  <DefBox key="def-s14-1">
    <em>When an object travels unequal distances in equal intervals of time or equal distances in unequal interval of times, howsoever small the interval may be, the </em><strong style={{ color:P_COLOR }}>motion of the object is said to be non-uniform.</strong>
  </DefBox>,
  <p key="b1-p-s14-1" style={{ textIndent:28, textAlign:"justify" }}>
    For example, suppose a car covers 40 km in first hour, 50 km in second hour, 30 km in third hour, 70 km in fourth
    hour and so on, the motion of the car is non-uniform, as it covers unequal distances in equal intervals of time.
  </p>,
  <p key="b1-p-s14-2" style={{ textIndent:28, textAlign:"justify" }}>
    In the stricter sense, when a car covers 60 km in every one hour, but not 1 km in every minute, its motion may be
    taken as non-uniform. Other examples of non-uniform motion are:
  </p>,
  <p key="b1-p-s14-3" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>i</em>)</strong> A body falling freely under gravity has non-uniform motion as it covers unequal distances in each one second. The distance covered goes on increasing in every successive second, on account of acceleration due to gravity.
  </p>,
  <p key="b1-p-s14-4" style={{ margin:"0 0 8px 14px", textAlign:"justify" }}>
    <strong>(<em>ii</em>)</strong> A train starting from one station and stopping at the other has non-uniform motion. This is because when the train starts and picks up speed, the distance travelled per second goes on increasing. And when the train approaches the next station of stoppage, the distance travelled per second goes on decreasing.
  </p>,

  // ── 1.5 CONCEPT OF SPEED ──────────────────────────────────
  <SecHd key="sec-s15" id="s15" label="1.5" title="Measuring the Rate of Motion: Concept of Speed" />,
  <p key="b1-p-s15-1" style={{ textIndent:28, textAlign:"justify" }}>
    In covering a distance of 200 km from Ambala to Delhi, a driver takes about 4 hours. If another driver covers this
    distance in 3 hours, he is said to be driving faster. And if some driver covers the same distance in 5 hours, he
    is said to be slower.
  </p>,
  <p key="b1-p-s15-2" style={{ textIndent:28, textAlign:"justify" }}>
    The rate of motion of a body is usually measured by finding the distance travelled by the body in unit time. This
    quantity is referred to as the speed of the body. Thus,
  </p>,
  <DefBox key="def-s15-1">
    <strong>Speed of a body</strong> <em>is defined as the distance travelled by the body in unit time.</em>
  </DefBox>,
  <MathBlock key="b1-m-s15-1"><em>i.e.,</em>&nbsp; speed = <Frac n="distance travelled" d="time taken" />&nbsp;&nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b1-p-s15-3" style={{ textIndent:28, textAlign:"justify" }}>
    If <em>s</em> is the distance travelled by a body in time <em>t</em>, its speed <em>v</em>, from eqn. (1) is
  </p>,
  <MathBlock key="b1-m-s15-2"><strong><em>v</em> = <Frac n={<em>s</em>} d={<em>t</em>} /></strong>&nbsp;&nbsp;&nbsp;...(2)</MathBlock>,
  <p key="b1-p-s15-4" style={{ textIndent:28, textAlign:"justify" }}>
    As SI unit of distance is metre (<em>m</em>) and that of time is second (<em>s</em>), therefore, SI unit of speed is
    metre/second. It is written as m/s or m s<Sup c="–1" />. When distance is measured in cm and time in second, the
    speed is in cm/s or cm s<Sup c="–1" />. The speed of vehicles like car, bus truck, train etc. is expressed in
    kilometre/hour, written as km. p.h or km/h or km h<Sup c="–1" />.
  </p>,
  <p key="b1-p-s15-5" style={{ textIndent:28, textAlign:"justify" }}>
    Note that <strong><em>speed of a body is a scalar quantity.</em></strong> It has magnitude only. Speed of a body
    gives us no idea about the direction of motion of the body. <strong>The speed can be zero or positive. It can never be negative.</strong>
  </p>,
  <p key="b1-p-s15-6" style={{ margin:"8px 0 5px", textAlign:"justify" }}>
    <strong style={{ color:P_COLOR }}>Uniform speed.</strong> When a body travels equal distances in equal intervals of time, howsoever small the intervals may be, the speed of the body is said to be uniform.
  </p>,
  <p key="b1-p-s15-7" style={{ margin:"0 0 5px", textAlign:"justify" }}>
    <strong style={{ color:P_COLOR }}>Non-uniform speed or Variable speed.</strong> When a body covers unequal distances in equal intervals of time, howsoever small the intervals may be, the speed of the body is said to be non-uniform or variable.
  </p>,
  <p key="b1-p-s15-8" style={{ textIndent:28, textAlign:"justify" }}>
    In most of the cases, bodies move with variable speed or non-uniform speed. Therefore, we describe the rate of
    motion of such bodies in terms of their <strong>average speed.</strong>
  </p>,
  <p key="b1-p-s15-9" style={{ textIndent:28, textAlign:"justify" }}>
    The average speed of a body is obtained by dividing the total distance travelled by the total time taken, <em>i.e.,</em>
  </p>,
  <MathBlock key="b1-m-s15-3">average speed = <Frac n="total distance travelled" d="total time taken" /></MathBlock>,
  <p key="b1-p-s15-10" style={{ textIndent:28, textAlign:"justify" }}>
    For example, in going from Ambala to Delhi, total distance travelled = 200 km. If total time taken = 4 hours, then
    average speed = <Frac n="200 km" d="4 h" /> = 50 km/h.
  </p>,

  // ── 1.6 CONCEPT OF VELOCITY ───────────────────────────────
  <SecHd key="sec-s16" id="s16" label="1.6" title="Speed with Direction: Concept of Velocity" />,
  <p key="b1-p-s16-1" style={{ textIndent:28, textAlign:"justify" }}>
    The rate of motion of a body gives us the speed of the body, wherein we have no information about the direction of
    motion of the body. The rate of motion of the body will be more comprehensive if we specify the direction of motion
    alongwith its speed. The quantity that specifies both the rate of motion and the direction of rate of motion is
    called velocity of the body.
  </p>,
  <DefBox key="def-s16-1">
    <strong>Velocity of a body</strong> <em>is the distance travelled by the body in unit time in a given direction.</em>
  </DefBox>,
  <DefBox key="def-s16-2">
    <em>In other words, </em><strong>Velocity of a body</strong> <em>is the speed of the body in a particular direction.</em>
  </DefBox>,
  <MathBlock key="b1-m-s16-1">Thus,&nbsp; velocity = <Frac n="distance travelled in given direction" d="time taken" />&nbsp;&nbsp; or &nbsp;&nbsp; velocity = <Frac n="displacement" d="time" /></MathBlock>,
  <MathBlock key="b1-m-s16-2"><em>i.e.,</em>&nbsp; <strong><em>v⃗</em> = <Frac n={<em>s⃗</em>} d={<em>t</em>} /></strong>&nbsp;&nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b1-p-s16-2" style={{ textIndent:28, textAlign:"justify" }}>
    where <em>v⃗</em> is velocity and <em>s⃗</em> is displacement of the body in time <em>t</em>.
  </p>,
  <p key="b1-p-s16-3" style={{ textIndent:28, textAlign:"justify" }}>
    The unit of velocity is the same as that of speed, <em>i.e.,</em> metre/second, represented as m/s or m s<Sup c="–1" />. Other units of velocity are cm/s and km/h. Both, speed and velocity are represented by the same symbol (<em>v</em>). <strong><em>Velocity is a vector quantity whereas speed is a scalar quantity.</em></strong>
  </p>,
  <p key="b1-p-s16-4" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Uniform velocity (or constant velocity)</strong>
  </p>,
  <DefBox key="def-s16-3">
    <em>When a body is moving along a straight line, covering equal distances in equal intervals of time, howsoever small the interval may be, the </em><strong style={{ color:P_COLOR }}>velocity of the body is said to be uniform or constant.</strong>
  </DefBox>,
  <p key="b1-p-s16-5" style={{ textIndent:28, textAlign:"justify" }}>
    For example, when a train travels over a straight horizontal track covering 60 km in every hour, the train is said to have uniform velocity of 60 km/h.
  </p>,
  <p key="b1-p-s16-6" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Variable Velocity (or Non-uniform velocity)</strong>
  </p>,
  <p key="b1-p-s16-7" style={{ textIndent:28, textAlign:"justify" }}>
    The velocity of a body can be changed in any one of the following <strong>three</strong> ways:
  </p>,
  <p key="b1-p-s16-8" style={{ margin:"0 0 4px 14px" }}>
    <strong>(<em>i</em>)</strong> By changing the speed of the body,
  </p>,
  <p key="b1-p-s16-9" style={{ margin:"0 0 4px 14px" }}>
    <strong>(<em>ii</em>)</strong> By changing the direction of motion of the body,
  </p>,
  <p key="b1-p-s16-10" style={{ margin:"0 0 8px 14px" }}>
    <strong>(<em>iii</em>)</strong> By changing both, the speed and direction of motion.
  </p>,
  <DefBox key="def-s16-4">
    <strong style={{ color:P_COLOR }}>Velocity of a body is said to be variable (or non-uniform)</strong> <em>when it covers unequal distances in a particular direction in equal intervals of time or the direction of motion of the body changes even when it covers equal distances in equal intervals of time.</em>
  </DefBox>,
  <p key="b1-p-s16-11" style={{ textIndent:28, textAlign:"justify" }}>
    It should be clearly understood that even when a body covers equal distances in equal intervals of time, but its
    direction of motion changes, the velocity of the body is said to be variable. Obviously, in such a situation, speed
    of the body is constant. For example, when a car rounds a curve at constant speed, it has a variable velocity,
    because its direction of motion changes continuously over the curve.
  </p>,
  <p key="b1-p-s16-12" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Average velocity</strong>
  </p>,
  <p key="b1-p-s16-13" style={{ textIndent:28, textAlign:"justify" }}>
    When a body is moving along a straight line at a variable speed, its velocity is variable. In that case, we express
    the rate of motion of the body in terms of its average velocity.
  </p>,
  <p key="b1-p-s16-14" style={{ textIndent:28, textAlign:"justify" }}>
    <em>When velocity of a body is changing at a uniform rate over a period of time, then average velocity of the body for this period is arithmetic mean of initial velocity and final velocity of the body.</em>
  </p>,
  <MathBlock key="b1-m-s16-3"><em>i.e.,</em>&nbsp; average velocity = <Frac n="initial velocity + final velocity" d="2" />&nbsp;&nbsp; or &nbsp;&nbsp; <strong><em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> = <Frac n={<><em>u</em> + <em>v</em></>} d="2" /></strong>&nbsp;&nbsp;&nbsp;...(2)</MathBlock>,
  <p key="b1-p-s16-15" style={{ textIndent:28, textAlign:"justify" }}>
    where <em>u</em> is the initial velocity, <em>v</em> is the final velocity and <em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> is the average velocity of the body.
  </p>,

  // ── 1.7 CONCEPT OF ACCELERATION ───────────────────────────
  <SecHd key="sec-s17" id="s17" label="1.7" title="Rate of Change of Velocity: Concept of Acceleration" />,
  <p key="b1-p-s17-1" style={{ textIndent:28, textAlign:"justify" }}>
    When a body is moving uniformly along a straight line, its velocity is constant. Therefore, change in its velocity
    is zero, over any interval of time. However, when a body is in non-uniform motion, its velocity changes, <em>i.e.,</em>
    velocity of the body is different at different points of the path and at different instants of time. Thus, the
    change in velocity of the body is not zero, during any interval of time. To express the rate of change of velocity,
    we introduce another physical quantity, called acceleration.
  </p>,
  <DefBox key="def-s17-1">
    <strong style={{ color:P_COLOR }}>Acceleration of a body</strong> <em>is defined as the rate of change of velocity of the body with time. Thus, acceleration of a body is a measure of change in velocity of the body per unit time.</em>
  </DefBox>,
  <MathBlock key="b1-m-s17-1">Thus,&nbsp; acceleration = <Frac n="change in velocity" d="time taken" /></MathBlock>,
  <MathBlock key="b1-m-s17-2">As change in velocity = final velocity – initial velocity,</MathBlock>,
  <MathBlock key="b1-m-s17-3">acceleration = <Frac n="final velocity – initial velocity" d="time taken" />&nbsp;&nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b1-p-s17-2" style={{ textIndent:28, textAlign:"justify" }}>
    Suppose <em>u</em> = initial velocity of a body at time <em>t</em> = 0, <em>v</em> = final velocity of the body at time <em>t</em>, <em>a</em> = acceleration of the body.
  </p>,
  <p key="b1-p-s17-3" style={{ textIndent:28, textAlign:"justify" }}>From eqn. (1),</p>,
  <MathBlock key="b1-m-s17-4"><strong><em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} /></strong>&nbsp;&nbsp;&nbsp;...(2)</MathBlock>,
  <p key="b1-p-s17-4" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Unit of acceleration</strong>
  </p>,
  <p key="b1-p-s17-5" style={{ textIndent:28, textAlign:"justify" }}>
    As acceleration is equal to change in velocity/time taken, therefore,
  </p>,
  <MathBlock key="b1-m-s17-5">unit of acceleration = <Frac n="unit of change in velocity" d="unit of time" /> = <Frac n="metre / second" d="second" /> = <Frac n="metre" d="second²" /></MathBlock>,
  <p key="b1-p-s17-6" style={{ textIndent:28, textAlign:"justify" }}>
    <em>i.e.,</em> unit of acceleration is <em>metre per second square</em>. It is written as m/s² or m s<Sup c="–2" />. The other units of acceleration are cm/s² and km/h². Note that <strong>unit of time occurs twice in the unit of acceleration.</strong>
  </p>,
  <p key="b1-p-s17-7" style={{ textIndent:28, textAlign:"justify" }}>
    If the motion is along a straight line and the velocity of the body is increasing with time, the acceleration is
    in the direction of velocity. Thus, <strong><em>acceleration is a vector quantity.</em></strong> The value of acceleration may be zero, positive or negative as discussed below:
  </p>,
  <p key="b1-p-s17-8" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>i</em>)</strong> When a body is moving along a straight line with a uniform velocity, change in its velocity, (<em>v</em> – <em>u</em>) = 0. Therefore, acceleration, <em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} /> = 0.
  </p>,
  <p key="b1-p-s17-9" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>ii</em>)</strong> When the velocity of a body increases with time, <em>v</em> {'>'} <em>u</em>. Therefore, (<em>v</em> – <em>u</em>) is positive and as such <em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} /> = positive. The direction of acceleration is along the direction of velocity. The motion is said to be <em>accelerated motion.</em> For example, when a body is dropped, its velocity goes on increasing (due to gravity). The acceleration is positive.
  </p>,
  <p key="b1-p-s17-10" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>(<em>iii</em>)</strong> When the velocity of a body decreases with time, <em>v</em> {'<'} <em>u</em>. Therefore, (<em>v</em> – <em>u</em>) is negative and as such <em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} /> = negative. <strong>The negative acceleration is called retardation.</strong> The negative acceleration (or retardation) is in a direction opposite to the direction of velocity of the body. For example, when a body is thrown vertically upwards, its velocity goes on decreasing due to opposing gravity. The acceleration is negative. Similarly, when we apply brakes, the vehicle slows down due to negative acceleration or retardation.
  </p>,
  <p key="b1-p-s17-11" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Uniform Acceleration</strong>
  </p>,
  <DefBox key="def-s17-2">
    <em>The acceleration of a body is said to be uniform, when velocity of the body moving along a straight line changes by equal amounts in equal intervals of time, i.e., when velocity of a body changes at a uniform rate, it is said to have </em><strong style={{ color:P_COLOR }}>uniform acceleration.</strong>
  </DefBox>,
  <p key="b1-p-s17-12" style={{ textIndent:28, textAlign:"justify" }}>
    For example: (<em>i</em>) motion of a body falling freely under the action of gravity, (<em>ii</em>) motion of a ball rolling down a smooth inclined plane, (<em>iii</em>) motion of a bicycle going down the slope of a smooth road when there is no pedalling and air resistance is neglected.
  </p>,
  <p key="b1-p-s17-13" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Non-Uniform Acceleration</strong>
  </p>,
  <DefBox key="def-s17-3">
    <em>When the velocity of a body changes at a non-uniform rate, i.e., velocity changes by unequal amounts in equal intervals of time, the acceleration of the body is said to be </em><strong style={{ color:P_COLOR }}>variable or non-uniform.</strong>
  </DefBox>,

];

// ── TABLE SUB-COMPONENTS + CONTENT (batch 2) ─────────────────

const UniformMotionTable = () => (
  <div style={{ overflowX:"auto", margin:"14px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px",
      fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 1.1. Values of time and distance in uniform motion.
    </p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <tbody>
        <tr>
          <td style={th}>Time (s)</td>
          {[0,1,2,3,4,5].map(v => <td key={v} style={th}>{v}</td>)}
        </tr>
        <tr>
          <td style={th}>Distance (m)</td>
          {[0,20,40,60,80,100].map(v => <td key={v} style={{...td, textAlign:"center"}}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>
);

const AcceleratedMotionTable = () => (
  <div style={{ overflowX:"auto", margin:"14px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px",
      fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 1.2. Values of time and distance in uniformly accelerated motion.
    </p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <tbody>
        <tr>
          <td style={th}>Time (s)</td>
          {[0,1,2,3,4,5].map(v => <td key={v} style={th}>{v}</td>)}
        </tr>
        <tr>
          <td style={th}>Distance (m)</td>
          {[0,5,20,45,80,125].map(v => <td key={v} style={{...td, textAlign:"center"}}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>
);

const VelocityTable = () => (
  <div style={{ overflowX:"auto", margin:"14px 0" }}>
    <p style={{ textAlign:"center", fontWeight:700, fontSize:13.5, margin:"0 0 8px",
      fontFamily:"'Merriweather Sans',Arial,sans-serif" }}>
      TABLE 1.3. Velocity of a body at regular intervals of time.
    </p>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <tbody>
        <tr>
          <td style={th}>Time (s)</td>
          {[0,5,10,15,20,25].map(v => <td key={v} style={th}>{v}</td>)}
        </tr>
        <tr>
          <td style={th}>Velocity (m/s)</td>
          {[0,10,20,30,40,50].map(v => <td key={v} style={{...td, textAlign:"center"}}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>
);

const CarSpeedTable = () => (
  <div style={{ overflowX:"auto", margin:"14px 0" }}>
    <table style={{ borderCollapse:"collapse", width:"100%", fontSize:13 }}>
      <thead>
        <tr>
          <td style={th}>Time (s)</td>
          {[0,10,20,30,40,50].map(v => <td key={v} style={th}>{v}</td>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={th}>Speed (m/s)</td>
          {[5,10,15,20,25,30].map(v => <td key={v} style={{...td, textAlign:"center"}}>{v}</td>)}
        </tr>
      </tbody>
    </table>
  </div>
);

const content_b2 = [

  // ── SOLVED PROBLEMS — SPEED / VELOCITY / ACCELERATION ─────
  <NumericalSection key="num-speed-vel-acc" topic="SPEED, VELOCITY AND ACCELERATION">
    <div style={{ background:LIGHT_P, padding:"8px 12px", marginBottom:12, borderRadius:4 }}>
      <strong>Formulae and Units</strong>
      <ol style={{ paddingLeft:20, margin:"6px 0 0", lineHeight:1.8, fontSize:14 }}>
        <li>Speed (<em>v</em>) = <Frac n="distance travelled (s)" d="time taken (t)" />. Speed is a scalar quantity.</li>
        <li>Velocity = <Frac n="distance travelled in a given direction" d="time taken" /> = <Frac n="displacement" d="time" />. Velocity is a vector quantity. Both speed and velocity are measured in m/s or cm/s or km/h.</li>
        <li>When velocity of a body is changing at a uniform rate, average velocity, <em>i.e.,</em> <em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> = <Frac n="initial velocity (u) + final velocity (v)" d="2" /></li>
        <li>Acceleration = rate of change of velocity with time, <em>i.e.,</em> <em>a</em> = <Frac n="v – u" d="t" />. It is measured in m/s² or cm/s² or km/h². Acceleration is a vector quantity. Negative acceleration is called retardation.</li>
      </ol>
    </div>

    <p key="b2-np1-q"><strong>Problem 1.</strong> A car travels 30 km at a uniform speed of 40 km/h and the next 30 km at a uniform speed of 20 km/h. Find its average speed.</p>
    <p key="b2-np1-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> Here, distance <em>s</em><sub style={{fontSize:"0.72em"}}>1</sub> = 30 km, speed <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub> = 40 km/h; distance <em>s</em><sub style={{fontSize:"0.72em"}}>2</sub> = 30 km, speed <em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> = 20 km/h.
    </p>
    <p key="b2-np1-s2" style={{ textIndent:14 }}>
      If <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> and <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> are the respective times:
    </p>
    <MathBlock key="b2-np1-m1"><em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> = <Frac n="30" d="40" /> = 0·75 h&nbsp;&nbsp;&nbsp; and &nbsp;&nbsp;&nbsp;<em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> = <Frac n="30" d="20" /> = 1·5 h</MathBlock>
    <MathBlock key="b2-np1-m2"><em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> = <Frac n={<>30 + 30</>} d={<>0·75 + 1·5</>} /> = <Frac n="60" d="2·25" /> = <strong>26·7 km/h</strong></MathBlock>

    <p key="b2-np2-q" style={{ marginTop:12 }}><strong>Problem 2.</strong> A train travels at 60 km/h for 0·52 h; at 30 km/h for the next 0·24 h and at 70 km/h for the next 0·71 h. What is the average speed of the train?</p>
    <p key="b2-np2-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> <em>x</em><sub style={{fontSize:"0.72em"}}>1</sub> = 60 × 0·52 = 31·2 km;&nbsp; <em>x</em><sub style={{fontSize:"0.72em"}}>2</sub> = 30 × 0·24 = 7·2 km;&nbsp; <em>x</em><sub style={{fontSize:"0.72em"}}>3</sub> = 70 × 0·71 = 49·7 km.
    </p>
    <MathBlock key="b2-np2-m1"><em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> = <Frac n={<>(31·2 + 7·2 + 49·7) km</>} d={<>(0·52 + 0·24 + 0·71) h</>} /> = <Frac n="88·1 km" d="1·47 h" /> = <strong>59·9 km/h</strong></MathBlock>

    <p key="b2-np3-q" style={{ marginTop:12 }}><strong>Problem 3.</strong> On a 120 km track, a train travels the first 30 km at a uniform speed of 30 km/h. How fast must the train travel the next 90 km so as to average 60 km/h for the entire trip?</p>
    <p key="b2-np3-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> Average speed = 60 km/h. Total time <em>T</em> = <Frac n="120" d="60" /> = 2 h.
    </p>
    <p key="b2-np3-s2" style={{ textIndent:14, textAlign:"justify" }}>
      Time for 1st stretch: <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> = <Frac n="30" d="30" /> = 1 h.&nbsp; Time for 2nd stretch: <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> = 2 – 1 = 1 h.
    </p>
    <MathBlock key="b2-np3-m1">Thus, <em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> = <Frac n="90 km" d="1 h" /> = <strong>90 km/h</strong></MathBlock>

    <p key="b2-np4-q" style={{ marginTop:12 }}><strong>Problem 4.</strong> A scooter acquires a velocity of 36 km/h in 10 seconds just after the start. It takes 20 seconds to stop. Calculate the acceleration in the two cases.</p>
    <p key="b2-np4-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution. Case I.</strong> Here, initial velocity <em>u</em> = 0; final velocity <em>v</em> = <Frac n="36 × 1000 m" d="60 × 60 s" /> = 10 m/s; time taken <em>t</em> = 10 s.
    </p>
    <MathBlock key="b2-np4-m1"><em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} /> = <Frac n="10 – 0" d="10" /> = <strong>1 m/s²</strong></MathBlock>
    <p key="b2-np4-s2" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Case II.</strong> Here, <em>u</em> = 10 m/s; as the scooter stops, <em>v</em> = 0, <em>t</em> = 20 s.
    </p>
    <MathBlock key="b2-np4-m2"><em>a</em> = <Frac n="0 – 10" d="20" /> = <strong>–0·5 m/s²</strong></MathBlock>
    <p key="b2-np4-s3" style={{ textIndent:14 }}>Negative value of <em>a</em> shows that the motion is retarded in case II.</p>
  </NumericalSection>,

  // Problems for Practice — Speed/Velocity/Acceleration
  <ProblemsBox key="prob-s17">
    <ol style={{ paddingLeft:28, listStyleType:"decimal", listStylePosition:"outside", fontSize:14, lineHeight:1.8, margin:0 }}>
      <li style={{ marginBottom:6 }}>An object travels 16 m in 4 s and then another 16 m in 2 s. What is the average speed of the object? <strong>[Ans. 5·33 m/s]</strong></li>
      <li style={{ marginBottom:6 }}>The odometer of a car reads 2000 km at the start of a trip and 2400 km at the end of the trip. If the trip took 8 h, calculate the average speed of the car in km/h and m/s. <strong>[Ans. 50 km/h ; 13·9 m/s]</strong></li>
      <li style={{ marginBottom:6 }}>Usha swims in a 90 m long pool. She covers 180 m in one minute by swimming from one end to the other and back along the same straight path. Find the average speed and average velocity of Usha. <strong>[Ans. 3 ms<Sup c="–1" /> ; zero]</strong></li>
      <li style={{ marginBottom:6 }}>Starting from a stationary position, Rahul paddles his bicycle to attain a velocity of 6 m/s in 30 s. Then he applies brakes such that the velocity of bicycle comes down to 4 m/s in the next 5 s. Calculate the acceleration of the bicycle in both the cases. <strong>[Ans. 0·2 ms<Sup c="–2" /> ; – 0·4 m/s²]</strong></li>
      <li style={{ marginBottom:6 }}>A train travels some distance with a speed of 30 km/h and returns with a speed of 45 km/h. Calculate the average speed of the train. <strong>[Ans. 36 km/h]</strong></li>
      <li style={{ marginBottom:6 }}>A train 100 m long moving on a straight level track passes a pole in 5 s. Find (<em>a</em>) the speed of the train (<em>b</em>) the time it will take to cross a bridge 500 m long. <strong>[Ans. (<em>a</em>) 20 m/s (<em>b</em>) 30 s]</strong></li>
      <li style={{ marginBottom:6 }}>A car travels along a straight line for first half time with speed 40 km/h and the second half time with speed 60 km/h. Find the average speed of the car. <strong>[Ans. 50 km/h]</strong></li>
    </ol>
    <div style={{ marginTop:12, borderTop:"1px solid #e0c0d8", paddingTop:10 }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:12, color:P_COLOR, margin:"0 0 8px", letterSpacing:1 }}>■ SOLUTIONS/EXPLANATIONS ■</p>
      <p style={{ fontSize:14, margin:"0 0 4px" }}><strong>1.</strong> Here, <em>s</em><sub style={{fontSize:"0.72em"}}>1</sub> = 16 m, <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> = 4 s ; <em>s</em><sub style={{fontSize:"0.72em"}}>2</sub> = 16 m, <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> = 2 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}><em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> = <Frac n={<>(<em>s</em><sub style={{fontSize:"0.72em"}}>1</sub> + <em>s</em><sub style={{fontSize:"0.72em"}}>2</sub>)</>} d={<>(<em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> + <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub>)</>} /> = <Frac n="(16 + 16) m" d="(4 + 2) s" /> = <Frac n="32" d="6" /> = <strong>5·33 m/s</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>2.</strong> Distance travelled, <em>s</em> = final reading – initial reading = 2400 – 2000 = 400 km; time taken <em>t</em> = 8 h</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Average speed = <Frac n="400" d="8" /> = <strong>50 km/h</strong> = <Frac n="50 × 1000 m" d="60 × 60 s" /> = <strong>13·9 m/s</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>3.</strong> Here, total distance travelled <em>s</em> = 180 m, time taken <em>t</em> = 1 min = 60 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Average speed = <Frac n="180" d="60" /> = <strong>3 m/s</strong></div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>In swimming from one end to the other and back, displacement = 0. ∴ Average velocity = <strong>zero</strong>.</p>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>4.</strong> Here, in the first case, <em>u</em> = 0, <em>v</em> = 6 m/s, <em>t</em> = 30 s:</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}><em>a</em> = <Frac n="v – u" d="t" /> = <Frac n="6 – 0" d="30" /> = <strong>0·2 m/s²</strong></div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>In the second case, <em>u</em> = 6 m/s, <em>v</em> = 4 m/s, <em>t</em> = 5 s:</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}><em>a</em> = <Frac n="v – u" d="t" /> = <Frac n="4 – 6" d="5" /> = <strong>–0·4 m/s²</strong> (retardation)</div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>5.</strong> Let a distance <em>x</em> km be travelled with a speed of 30 km/h.</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Time taken <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> = <Frac n="x" d="30" /> h ; on return journey <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> = <Frac n="x" d="45" /> h</div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Total time = <em>x</em><Frac n="(3 + 2)" d="90" /> = <Frac n="x" d="18" /> ; Total distance = 2<em>x</em></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Average speed = <Frac n="2x" d="x/18" /> = <strong>36 km/h</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>6.</strong> (<em>a</em>) velocity = <Frac n="distance travelled" d="time taken" /> = <Frac n="100 m" d="5 s" /> = <strong>20 m/s</strong></p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>b</em>) Length of bridge = 500 m, length of train = 100 m. In crossing the bridge, distance moved <em>s</em> = 500 + 100 = 600 m</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}><em>t</em> = <Frac n="s" d="v" /> = <Frac n="600" d="20" /> = <strong>30 s</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>7.</strong> Here, <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub> = 40 km/h, <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> = <Frac n="1" d="2" /><em>t</em> ; <em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> = 60 km/h, <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> = <Frac n="1" d="2" /><em>t</em></p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}><em>s</em><sub style={{fontSize:"0.72em"}}>1</sub> = 40 × <Frac n="1" d="2" /><em>t</em> = 20<em>t</em> ; <em>s</em><sub style={{fontSize:"0.72em"}}>2</sub> = 60 × <Frac n="1" d="2" /><em>t</em> = 30<em>t</em></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Average speed = <Frac n={<>20<em>t</em> + 30<em>t</em></>} d={<em>t</em>} /> = <strong>50 km/h</strong></div>
    </div>
  </ProblemsBox>,

  // ── 1.8 GRAPHICAL REPRESENTATION OF MOTION ────────────────
  <SecHd key="sec-s18" id="s18" label="1.8" title="Graphical Representation of Motion" />,
  <p key="b2-p-s18-1" style={{ textIndent:28, textAlign:"justify" }}>
    A graph represents the relation between two variable quantities in pictorial form. You must have seen in the telecast of cricket matches, vertical bar graphs representing run rate of a team in each over. It is so convenient to perceive the information in visual form.
  </p>,
  <p key="b2-p-s18-2" style={{ textIndent:28, textAlign:"justify" }}>
    To describe motion of objects, we can draw distance-time graph and velocity-time graph. From the nature of the graphs, we can study the nature of motion, as detailed in the articles that follow.
  </p>,
  <p key="b2-p-s18-3" style={{ textIndent:28, textAlign:"justify" }}>
    <em>A graph is plotted between two variable quantities. The quantity that is varied at our choice is called <strong>independent variable.</strong> The other quantity, which varies as a result of this change is called the <strong>dependent variable.</strong></em> For example, in distance-time graph, time is independent variable and distance is dependent variable. Similarly, in velocity-time graph, time is independent variable and velocity is dependent variable.
  </p>,
  <p key="b2-p-s18-4" style={{ textIndent:28, textAlign:"justify" }}>
    Graphs are generally plotted on a paper ruled in millimetre squares. A horizontal line near the bottom of the paper serves as X-axis. A vertical line near the left hand edge of the paper serves as Y-axis. The point of intersection of X-axis and Y-axis serves as the origin. Usually, the independent variable is represented along X-axis and the dependent variable is represented along Y-axis, choosing convenient scales. We plot the points for various pairs of corresponding values of the two variables and join these points by a free hand curve to obtain a graph. We can then interpret the graph and study the nature of motion.
  </p>,

  // ── 1.9 DISTANCE-TIME GRAPHS ──────────────────────────────
  <SecHd key="sec-s19" id="s19" label="1.9" title="Distance-Time Graphs" />,
  <p key="b2-p-s19-1" style={{ textIndent:28, textAlign:"justify" }}>
    The distance-time graph represents the change in the position of a body with time. In this graph, we take <em>time</em> along the X-axis and the <em>distance</em> along the Y-axis. Three cases arise:
  </p>,
  <p key="b2-p-s19-c1" style={{ margin:"10px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Case 1. When the body is at rest.</strong>
  </p>,
  <p key="b2-p-s19-c1t" style={{ textIndent:28, textAlign:"justify" }}>
    Suppose the body is stationary (or at rest) at a distance of 10 m from the origin. The position of the body does
    not change with time. Its distance from the origin continues to be same (<em>i.e.,</em> 10 m) at all instants of
    time. Therefore, when we plot distance at different instants of time, and join these points, we obtain a straight
    line parallel to X-axis (time axis) as shown in Fig. 1.6.
  </p>,
  <Fig key="fig-1-6"
    src={CONTENT_IMAGES.CONTENT_IMAGE_55BE4E8D42864667BBBB}
    num="Fig. 1.6" caption="Distance-time graph for body at rest" />,
  <p key="b2-p-s19-c2" style={{ margin:"10px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Case 2. When the body is in uniform motion.</strong>
  </p>,
  <p key="b2-p-s19-c2t" style={{ textIndent:28, textAlign:"justify" }}>
    When a body moves with a uniform speed, it covers equal distances in equal intervals of time. Therefore, distance
    travelled by the body is directly proportional to time taken. This can be seen from Table 1.1.
  </p>,
  <UniformMotionTable key="tbl-1-1" />,
  <p key="b2-p-s19-c2b" style={{ textIndent:28, textAlign:"justify" }}>
    When we actually plot these points taking time along X-axis and distance along Y-axis, we obtain a straight line OR as shown in Fig. 1.7.
  </p>,
  <p key="b2-p-s19-c2c" style={{ textIndent:28, textAlign:"justify" }}>
    <em>We can use the distance-time graph to determine the speed of the body.</em> Consider a small portion AB of this
    graph. From both the points A and B, draw lines perpendicular to X-axis and Y-axis as shown in Fig. 1.7.
    Corresponding to point A, distance travelled by the body in time <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>
    is <em>s</em><sub style={{fontSize:"0.72em"}}>1</sub> and corresponding to the point B, distance travelled by the
    body in time <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> is <em>s</em><sub style={{fontSize:"0.72em"}}>2</sub>.
  </p>,
  <p key="b2-p-s19-c2d" style={{ textIndent:28, textAlign:"justify" }}>
    Thus, in time (<em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>) = CA, distance travelled (<em>s</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>s</em><sub style={{fontSize:"0.72em"}}>1</sub>) = BC.
  </p>,
  <MathBlock key="b2-m-s19-1">As speed = <Frac n="distance travelled" d="time taken" />,&nbsp;&nbsp; <em>v</em> = <Frac n={<><em>s</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>s</em><sub style={{fontSize:"0.72em"}}>1</sub></>} d={<><em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub></>} /> = <Frac n="BC" d="CA" /> = tan θ &nbsp;&nbsp;&nbsp;...(1)</MathBlock>,
  <p key="b2-p-s19-c2e" style={{ textIndent:28, textAlign:"justify" }}>
    where θ is angle, which the distance-time graph makes with the X-axis. <strong><em>tan θ is called the slope of the distance-time graph.</em></strong> Slope represents gradient of distance-time graph. Hence, we conclude that <strong>slope of distance-time graph represents speed of the body.</strong>
  </p>,
  <Fig key="fig-1-7"
    src={CONTENT_IMAGES.CONTENT_IMAGE_4958ECC727712F51109D}
    num="Fig. 1.7" caption="Distance-time graph for uniform motion (Table 1.1)" />,
  <div key="b2-note-s19" style={{ border:"2px solid #444", padding:"10px 14px", margin:"14px 0", background:"#f9f9f9", fontSize:14 }}>
    <strong>NOTE</strong>&nbsp; When a body is moving along a straight line, we can take the magnitude of displacement equal to the distance travelled by the body. We can then use the term <em>uniform velocity</em> in place of uniform speed.
    <ol style={{ paddingLeft:20, margin:"8px 0 0", lineHeight:1.8 }}>
      <li>When distance/displacement-time graph of a body is a straight line, the body is moving with uniform speed/velocity. The slope of the straight line graph represents uniform speed/velocity of the body.</li>
      <li>In Fig. 1.6, slope of distance time graph = tan θ = tan 0° = 0. Therefore, <em>v</em> = tan θ = 0, <em>i.e.,</em> speed of the body is zero or the body is at rest.</li>
      <li>In Fig. 1.8, we have shown distance-time graphs of two bodies A and B. As θ<sub style={{fontSize:"0.72em"}}>2</sub> {'>'} θ<sub style={{fontSize:"0.72em"}}>1</sub>, slope of body B is greater than that of body A. Hence, velocity of B is greater than velocity of A, <em>i.e.,</em> B moves faster than A.</li>
    </ol>
    <Fig key="fig-1-8"
      src={CONTENT_IMAGES.CONTENT_IMAGE_76C172268EED24633CCF}
      num="Fig. 1.8" caption="Distance-time graphs of two bodies A and B" />
  </div>,
  <p key="b2-p-s19-c3" style={{ margin:"10px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Case 3. When the body is in non-uniform motion or accelerated motion.</strong>
  </p>,
  <p key="b2-p-s19-c3t" style={{ textIndent:28, textAlign:"justify" }}>
    Suppose a body is dropped and it falls freely under the action of gravity. The distance travelled by the body in successive seconds goes on increasing as shown in Table 1.2.
  </p>,
  <AcceleratedMotionTable key="tbl-1-2" />,
  <p key="b2-p-s19-c3b" style={{ textIndent:28, textAlign:"justify" }}>
    When we actually plot these points taking time along X-axis and distance along Y-axis, and join these points, we obtain a curve as shown in Fig. 1.9. Note that distance-time graph in this case is a <em>curved line</em>, indicating that the motion is non-uniform or it is an accelerated motion. From Fig. 1.9, we observe that slope of distance-time graph at any point P on the curve is more than the slope of distance-time graph at any earlier point Q on the curve. It means velocity of the body at P is more than the velocity of the body at Q, <em>i.e.,</em> velocity of the body goes on increasing as the time elapses, <em>i.e.,</em> the motion of the body is accelerated motion.
  </p>,
  <Fig key="fig-1-9"
    src={CONTENT_IMAGES.CONTENT_IMAGE_55F2656B4AA8EE9FECD5}
    num="Fig. 1.9" caption="Distance-time graph for uniformly accelerated motion (Table 1.2)" />,
  <p key="b2-p-s19-c3c" style={{ textIndent:28, textAlign:"justify" }}>
    When the motion of the body is retarded, <em>i.e.,</em> the body has negative acceleration, the slope of distance-time graph is reversed as shown in Fig. 1.10. For the sake of comparison; we have redrawn distance time graph for positive acceleration. The distance time graph is a straight line when acceleration is zero. This is also shown in Fig. 1.10.
  </p>,
  <Fig key="fig-1-10"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CCD0FCCA135E8141FF82}
    num="Fig. 1.10" caption="Distance-time graphs for positive, zero and negative acceleration" />,

  // ── 1.10 VELOCITY-TIME GRAPHS ─────────────────────────────
  <SecHd key="sec-s110" id="s110" label="1.10" title="Velocity-Time Graphs" />,
  <p key="b2-p-s110-1" style={{ textIndent:28, textAlign:"justify" }}>
    For a body moving along a straight line, the variation of velocity with time is represented by a velocity-time
    graph. In this graph, we take time along the <em>X-axis</em> and velocity along the <em>Y-axis</em>. The following
    three cases arise:
  </p>,
  <p key="b2-p-s110-c1" style={{ margin:"10px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Case 1. When body is moving with a uniform velocity.</strong>
  </p>,
  <p key="b2-p-s110-c1t" style={{ textIndent:28, textAlign:"justify" }}>
    As velocity of the body is uniform, neither its magnitude nor its direction changes. Therefore, the height of its
    velocity-time graph will remain the same at all instants of time. The velocity-time graph will be a straight line
    parallel to X-axis (time axis) as shown in Fig. 1.11 for <em>v</em> = 10 m/s.
  </p>,
  <Fig key="fig-1-11"
    src={CONTENT_IMAGES.CONTENT_IMAGE_B0D95219808DFE0670F3}
    num="Fig. 1.11" caption="Velocity-time graph for uniform velocity" />,
  <p key="b2-p-s110-c1b" style={{ textIndent:28, textAlign:"justify" }}>
    From the velocity-time graph, we can calculate the displacement (or distance covered) by the body moving with
    uniform velocity in any interval of time.
  </p>,
  <p key="b2-p-s110-c1c" style={{ textIndent:28, textAlign:"justify" }}>
    At any time, OA = <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>, velocity of body = AB. At another time OC = <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub>, velocity of body = CD = AB.
    Now, area of rectangle ABDC = AB × AC = AB(OC – OA) = <em>v</em>(<em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>).
  </p>,
  <p key="b2-p-s110-c1d" style={{ textIndent:28, textAlign:"justify" }}>
    As product of velocity and time gives displacement of the body, therefore, we conclude that <strong><em>magnitude of displacement or distance moved by the body is equal to area enclosed by the velocity-time graph and the time axis.</em></strong>
  </p>,
  <p key="b2-p-s110-c2" style={{ margin:"10px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Case 2. When the body is moving with a uniform acceleration.</strong>
  </p>,
  <p key="b2-p-s110-c2t" style={{ textIndent:28, textAlign:"justify" }}>
    As the acceleration of the body moving along a straight line is uniform, therefore, velocity of the body changes by
    equal amounts in equal intervals of time. This can be seen from Table 1.3.
  </p>,
  <VelocityTable key="tbl-1-3" />,
  <p key="b2-p-s110-c2b" style={{ textIndent:28, textAlign:"justify" }}>
    When we plot these points actually, taking time along X-axis and velocity along Y-axis, we obtain a straight line
    OR, as shown in Fig. 1.12, which is inclined to the time axis. The nature of the graph shows that velocity of the
    body changes by equal amounts in equal intervals of time. Thus, <strong><em>when velocity-time graph of a body is a straight line inclined to X-axis, the motion must be uniformly accelerated motion.</em></strong>
  </p>,
  <p key="b2-p-s110-c2c" style={{ textIndent:28, textAlign:"justify" }}>
    From the velocity time graph, we can calculate (<em>i</em>) acceleration of the body, (<em>ii</em>) distance travelled by the body.
  </p>,
  <p key="b2-p-s110-c2d" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>(<em>a</em>) Acceleration of the body</strong>
  </p>,
  <p key="b2-p-s110-c2e" style={{ textIndent:28, textAlign:"justify" }}>
    In Fig. 1.12, when time <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub> = OA, velocity <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub> = AB; and when time <em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> = OC, velocity <em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> = CD. Let ∠DBE = θ.
  </p>,
  <MathBlock key="b2-m-s110-1">Slope of velocity time graph = tan θ = <Frac n="DE" d="BE" /> = <Frac n={<>CD – CE</>} d="AC" /> = <Frac n={<><em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub></>} d={<><em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub></>} /> = acceleration</MathBlock>,
  <p key="b2-p-s110-c2f" style={{ textIndent:28, textAlign:"justify" }}>
    <strong>Hence, acceleration of the body is given by slope of velocity-time graph.</strong>
  </p>,
  <Fig key="fig-1-12"
    src={CONTENT_IMAGES.CONTENT_IMAGE_D660E25F76A2493C2075}
    num="Fig. 1.12" caption="Velocity-time graph for uniform acceleration (Table 1.3)" />,
  <p key="b2-p-s110-c2g" style={{ margin:"8px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>(<em>b</em>) Distance travelled by the body</strong>
  </p>,
  <p key="b2-p-s110-c2h" style={{ textIndent:28, textAlign:"justify" }}>
    <em>The distance travelled by a uniformly accelerated body in a certain interval of time is given by the area under the velocity-time graph.</em>
  </p>,
  <p key="b2-p-s110-c2i" style={{ textIndent:28, textAlign:"justify" }}>
    Clearly, distance travelled by the body during interval AC = (<em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>), <em>i.e.</em>
  </p>,
  <MathBlock key="b2-m-s110-2"><em>s</em> = area of rectangle BACE + area of △BDE</MathBlock>,
  <MathBlock key="b2-m-s110-3"><em>s</em> = <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub>(<em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>) + <Frac n="1" d="2" />(<em>t</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>t</em><sub style={{fontSize:"0.72em"}}>1</sub>)(<em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> – <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub>)</MathBlock>,
  <div key="b2-note-s110" style={{ border:"2px solid #444", padding:"10px 14px", margin:"14px 0", background:"#f9f9f9", fontSize:14 }}>
    <strong>NOTE</strong>
    <ol style={{ paddingLeft:20, margin:"8px 0 0", lineHeight:1.8 }}>
      <li>When the velocity of the body is decreasing uniformly with time, it is undergoing uniform retardation. The velocity-time graph in this case is a straight line with negative slope as shown in Fig. 1.13.</li>
      <li>When a body is moving with a uniform acceleration, but its initial velocity is not zero (<em>i.e., u</em> ≠ 0, at <em>t</em> = 0), the velocity-time graph is a straight line that does not pass through origin, as shown in Fig. 1.14. We find that at <em>t</em> = 0, <em>u</em> = OA ≠ 0. The slope of the straight line graph is positive as acceleration is positive.</li>
    </ol>
    <div style={{ display:"flex", gap:24, justifyContent:"center", flexWrap:"wrap", margin:"12px 0" }}>
      <Fig key="fig-1-13"
        src={CONTENT_IMAGES.CONTENT_IMAGE_D827A094CCBB43D5F250}
        num="Fig. 1.13" caption="Uniform retardation" />
      <Fig key="fig-1-14"
        src={CONTENT_IMAGES.CONTENT_IMAGE_3D6B6A95483171CFBDB9}
        num="Fig. 1.14" caption="Uniform acceleration, u ≠ 0" />
    </div>
  </div>,
  <p key="b2-p-s110-c3" style={{ margin:"10px 0 5px" }}>
    <strong style={{ color:P_COLOR }}>Case 3. When the body is moving with a variable acceleration.</strong>
  </p>,
  <p key="b2-p-s110-c3t" style={{ textIndent:28, textAlign:"justify" }}>
    The velocity-time graph in that case is not a straight line. It is a curve as shown in Fig. 1.15. Slope of curve at
    P (= tan θ<sub style={{fontSize:"0.72em"}}>1</sub>) is less than the slope of curve at Q (= tan θ<sub style={{fontSize:"0.72em"}}>2</sub>). Therefore, acceleration of body at P is less than the acceleration of the body at Q.
  </p>,
  <Fig key="fig-1-15"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CEF5C367C5C9A97F3F8B}
    num="Fig. 1.15" caption="Velocity-time graph for variable acceleration" />,

  // Solved Problems — Graphs
  <NumericalSection key="num-graphs" topic="DISTANCE-TIME GRAPHS AND VELOCITY-TIME GRAPHS">
    <div style={{ background:LIGHT_P, padding:"8px 12px", marginBottom:12, borderRadius:4 }}>
      <strong>Formulae and Units</strong>
      <ol style={{ paddingLeft:20, margin:"6px 0 0", lineHeight:1.8, fontSize:14 }}>
        <li>In uniform motion, slope of distance-time graph, <em>m</em> = tan θ = velocity of the body.</li>
        <li>In uniform motion, velocity-time graph is a straight line parallel to time axis. Distance moved by the body = area enclosed by the velocity-time graph and the time axis.</li>
        <li>In uniformly accelerated motion, velocity-time graph is a straight line inclined to time axis. Acceleration of body = slope of velocity-time graph. Distance travelled by the body = area enclosed by the velocity-time graph and the time axis.</li>
        <li>Distance and displacement are measured in metre, time in second, velocity in m/s and acceleration in m/s².</li>
      </ol>
    </div>

    <p key="b2-gp1-q"><strong>Problem 1.</strong> Fig. 1.16 is the distance-time graph of an object. Do you think it represents a real situation? If so, why? If not, why not?</p>
    <p key="b2-gp1-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> In Fig. 1.16, O is the origin. The point P corresponds to (4 h, 75 km). The straight line OP indicates that the object moves from O to P with a uniform speed = <Frac n="75" d="4" /> = 18·75 km/h. <em>It represents a real situation.</em>
    </p>
    <p key="b2-gp1-s2" style={{ textIndent:14, textAlign:"justify" }}>
      The point Q corresponds to (14 h, 75 km). As straight line PQ is parallel to time axis, speed of the object is zero. It means the object is stationary for 10 hours. <em>It represents a real situation.</em>
    </p>
    <p key="b2-gp1-s3" style={{ textIndent:14, textAlign:"justify" }}>
      The point R corresponds to (10 h, 0 km). The straight line QR represents decrease in both the time and the distance. This situation is <strong>not real. Neither time nor distance can have a backward journey.</strong>
    </p>
    <Fig key="fig-1-16"
      src={CONTENT_IMAGES.CONTENT_IMAGE_9D3E9C500A69421792EB}
      num="Fig. 1.16" caption="Distance-time graph of an object" />

    <p key="b2-gp2-q" style={{ marginTop:12 }}><strong>Problem 2.</strong> The graph in Fig. 1.17 shows the positions of a body at different times. Calculate the speed of the body as it moves from (<em>i</em>) A to B (<em>ii</em>) B to C and (<em>iii</em>) C to D.</p>
    <p key="b2-gp2-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong>
      (<em>i</em>) In moving from A to B: distance = (3 – 0) = 3 cm; time = (5 – 2) = 3 s; speed <em>v</em><sub style={{fontSize:"0.72em"}}>1</sub> = <Frac n="3" d="3" /> = <strong>1 cm/s</strong>.
    </p>
    <p key="b2-gp2-s2" style={{ textIndent:14, textAlign:"justify" }}>
      (<em>ii</em>) In moving from B to C: distance = 0; speed <em>v</em><sub style={{fontSize:"0.72em"}}>2</sub> = <strong>0</strong>.
    </p>
    <p key="b2-gp2-s3" style={{ textIndent:14, textAlign:"justify" }}>
      (<em>iii</em>) In moving from C to D: distance = (7 – 3) = 4 cm; time = (9 – 7) = 2 s; speed <em>v</em><sub style={{fontSize:"0.72em"}}>3</sub> = <Frac n="4" d="2" /> = <strong>2 cm/s</strong>.
    </p>
    <Fig key="fig-1-17"
      src={CONTENT_IMAGES.CONTENT_IMAGE_6DF54A93971FB627A638}
      num="Fig. 1.17" caption="Distance-time graph showing positions at different times" />

    <p key="b2-gp3-q" style={{ marginTop:12 }}><strong>Problem 3.</strong> The velocity-time graph of an ascending passenger lift is given in Fig. 1.18. What is the acceleration of the lift: (<em>i</em>) during the first two seconds, (<em>ii</em>) between 2nd and 10th second, (<em>iii</em>) during the last two seconds?</p>
    <p key="b2-gp3-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong>
      (<em>i</em>) Change of velocity = 4·6 – 0 = 4·6 m/s; time taken = 2 s; acceleration = <Frac n="4·6" d="2" /> = <strong>2·3 m/s²</strong>.
    </p>
    <p key="b2-gp3-s2" style={{ textIndent:14, textAlign:"justify" }}>
      (<em>ii</em>) Change of velocity = 4·6 – 4·6 = zero; acceleration = <strong>zero</strong>.
    </p>
    <p key="b2-gp3-s3" style={{ textIndent:14, textAlign:"justify" }}>
      (<em>iii</em>) Change of velocity = 0 – 4·6 = –4·6 m/s; time = 2 s; acceleration = <Frac n="–4·6" d="2" /> = <strong>–2·3 m/s²</strong> (retardation).
    </p>
    <Fig key="fig-1-18"
      src={CONTENT_IMAGES.CONTENT_IMAGE_AD6ED40631E90AFEA5FC}
      num="Fig. 1.18" caption="Velocity-time graph of an ascending passenger lift" />
  </NumericalSection>,

  // Problems for Practice — Graphs
  <ProblemsBox key="prob-s110">
    <ol style={{ paddingLeft:28, listStyleType:"decimal", listStylePosition:"outside", fontSize:14, lineHeight:1.8, margin:0 }}>
      <li style={{ marginBottom:8 }}>The following is the distance-time table of a moving car.
        <div style={{ overflowX:"auto", margin:"8px 0" }}>
          <table style={{ borderCollapse:"collapse", fontSize:13, margin:"0 auto" }}>
            <tbody>
              <tr>
                {["10·05 am","10·25 am","10·40 am","10·50 am","11·00 am","11·10 am","11·25 am","11·40 am"].map(t=><td key={t} style={th}>{t}</td>)}
              </tr>
              <tr>
                {["0 km","5 km","12 km","22 km","26 km","28 km","38 km","42 km"].map(d=><td key={d} style={{...td,textAlign:"center"}}>{d}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        (<em>a</em>) Use a graph paper to plot the distance vs time.&nbsp;
        (<em>b</em>) When was the car travelling at the greatest speed?&nbsp;
        (<em>c</em>) What is the average speed of the car?&nbsp;
        (<em>d</em>) What is the speed between 11·25 am and 11·40 am?&nbsp;
        (<em>e</em>) During a part of the journey, the car was forced to slow down to 12 km/h. At what distance did this happen?
        <br/><strong>[Ans. (<em>a</em>) Graphs shown in Fig. 1.20 (<em>b</em>) Between 10·40 am to 10·50 am (<em>c</em>) 26·5 km/h (<em>d</em>) 16 km/h (<em>e</em>) From E to F]</strong>
      </li>
      <li style={{ marginBottom:8 }}>Study the speed time graph of a body shown in Fig. 1.19 and answer the following questions:
        (<em>a</em>) What type of motion is represented by OA?&nbsp;
        (<em>b</em>) What type of motion is represented by AB?&nbsp;
        (<em>c</em>) What type of motion is represented by BC?&nbsp;
        (<em>d</em>) Find out acceleration of the body.&nbsp;
        (<em>e</em>) Find out retardation of the body.&nbsp;
        (<em>f</em>) Find out the distance travelled by the body from A to B.
        <br/><strong>[Ans. (<em>a</em>) uniformly accelerated (<em>b</em>) uniform velocity (<em>c</em>) uniformly retarded (<em>d</em>) 1·5 m/s² (<em>e</em>) – 1 m/s² (<em>f</em>) 36 m]</strong>
      </li>
      <li style={{ marginBottom:8 }}>In the above question, calculate (<em>i</em>) distance travelled from O to A. (<em>ii</em>) distance travelled from B to C. (<em>iii</em>) total distance travelled by the body in 16 sec.
        <br/><strong>[Ans. (<em>i</em>) 12 m ; (<em>ii</em>) 18 m ; (<em>iii</em>) 66 m]</strong>
      </li>
      <li style={{ marginBottom:8 }}>A car is moving on a straight road with uniform acceleration. The following table gives the speed of the car at various instants of time:
        <CarSpeedTable key="tbl-car-speed" />
        Draw the speed time graph. Determine from it (<em>i</em>) the acceleration of the car (<em>ii</em>) the distance travelled by the car in 50 sec. <strong>[Ans. 0·5 m/s² ; 875 m]</strong>
      </li>
    </ol>
    <div style={{ marginTop:12, borderTop:"1px solid #e0c0d8", paddingTop:10 }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:12, color:P_COLOR, margin:"0 0 8px", letterSpacing:1 }}>■ SOLUTIONS/EXPLANATIONS ■</p>
      <p style={{ fontSize:14, margin:"0 0 4px" }}><strong>1.</strong> (<em>a</em>) Fig. 1.20 represents the distance-time graph of the car.</p>
      <p style={{ fontSize:14, margin:"0 0 4px", textIndent:14 }}>(<em>b</em>) As the slope of distance-time graph represents speed, line CD (10·40 am to 10·50 am) has the maximum slope → greatest speed.</p>
      <p style={{ fontSize:14, margin:"0 0 4px", textIndent:14 }}>(<em>c</em>) Total distance = 42 km; total time = 11·40 – 10·05 = 1 h 35 min = <Frac n="95" d="60" /> h</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Average speed = <Frac n="42 km" d="95/60 h" /> = <strong>26·5 km/h</strong></div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>d</em>) Distance travelled = 42 – 38 = 4 km; time taken = 15 min = 0·25 h</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Speed = <Frac n="4 km" d="0·25 h" /> = <strong>16 km/h</strong></div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>e</em>) Slowing down to minimum speed (12 km/h) is represented by line EF. Distance = 28 – 26 = 2 km; time = 10 min = <Frac n="1" d="6" /> h; speed = <Frac n="2" d="1/6" /> = <strong>12 km/h</strong>. So car slowed down at distance ranging from <strong>26 km to 28 km</strong>.</p>
      <Fig key="fig-1-20"
        src={CONTENT_IMAGES.CONTENT_IMAGE_BF304FE924EC63F40F24}
        num="Fig. 1.20" caption="Distance-time graph of the moving car" />
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>2.</strong> (<em>a</em>) Speed-time graph OA is a straight line with positive slope → <strong>uniformly accelerated motion</strong>.</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>b</em>) AB is parallel to time axis → slope zero → <strong>uniform velocity</strong>.</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>c</em>) BC is a straight line with negative slope → <strong>uniformly retarded motion</strong>.</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>d</em>) From O to A: change in speed = 6 – 0 = 6 m/s; time taken = 4 – 0 = 4 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>acceleration = <Frac n="6 m/s" d="4 s" /> = <strong>1·5 m/s²</strong></div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>e</em>) From B to C: change in speed = 0 – 6 = –6 m/s; time = 16 – 10 = 6 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>acceleration = <Frac n="–6 m/s" d="6 s" /> = <strong>–1 m/s²</strong> (retardation)</div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>f</em>) From A to B, velocity is uniform: distance = 6 × (10 – 4) = <strong>36 m</strong></p>
      <Fig key="fig-1-19"
        src={CONTENT_IMAGES.CONTENT_IMAGE_0EA62008D62A576FFB1F}
        num="Fig. 1.19" caption="Speed-time graph showing OA (uniform acceleration), AB (uniform velocity), BC (uniform retardation)" />
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>3.</strong> In Fig. 1.19, (<em>i</em>) Distance from O to A = area of △OAE = ½ × 4 × 6 = <strong>12 m</strong>.</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>ii</em>) Distance from B to C = area of △BCD = ½ × (16 – 10) × 6 = <strong>18 m</strong>.</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>(<em>iii</em>) Total distance = 12 + 36 + 18 = <strong>66 m</strong>.</p>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>4.</strong> Taking first two points on the graph:</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}><em>a</em> = <Frac n="10 – 5" d="10 – 0" /> = <Frac n="5" d="10" /> = <strong>0·5 m/s²</strong></div>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>Distance = area under speed-time graph = OH × OA + ½(AG × GF) = 50 × 5 + ½ × 50 × (30 – 5) = 250 + 625 = <strong>875 m</strong></p>
      <Fig key="fig-1-21"
        src={CONTENT_IMAGES.CONTENT_IMAGE_839AD632D5763CD704D7}
        num="Fig. 1.21" caption="Speed-time graph for uniformly accelerating car" />
    </div>
  </ProblemsBox>,
];

// ── TABLE SUB-COMPONENTS + CONTENT (batch 3) ─────────────────

const content_b3 = [

  // ── 1.11 DERIVATION OF EQUATIONS OF MOTION ────────────────
  <SecHd key="sec-s111" id="s111" label="1.11" title="Derivation of Equations of Motion by Graphical Method" />,
  <p key="b3-p-s111-1" style={{ textIndent:28, textAlign:"justify" }}>
    When a body is moving along a straight line with uniform acceleration, we can establish relation between
    velocity of the body, acceleration of the body and the distance travelled by the body in a particular time by
    a set of equations. These equations are called <strong>equations of motion.</strong> In all, there are three
    equations of motion represented as:
  </p>,
  <MathBlock key="b3-m-s111-1"><strong>1.&nbsp; <em>v</em> = <em>u</em> + <em>at</em></strong>&nbsp;&nbsp;&nbsp;...(1)</MathBlock>,
  <MathBlock key="b3-m-s111-2"><strong>2.&nbsp; <em>s</em> = <em>ut</em> + <Frac n="1" d="2" /><em>at</em>²</strong>&nbsp;&nbsp;&nbsp;...(2)</MathBlock>,
  <MathBlock key="b3-m-s111-3"><strong>3.&nbsp; <em>v</em>² – <em>u</em>² = 2<em>as</em></strong>&nbsp;&nbsp;&nbsp;...(3)</MathBlock>,
  <p key="b3-p-s111-2" style={{ textIndent:28, textAlign:"justify" }}>
    where <em>u</em> is initial velocity of the body (at <em>t</em> = 0); <em>a</em> is uniform acceleration of the body;
    <em>v</em> is final velocity of the body after <em>t</em> second and <em>s</em> is the distance travelled in this
    time. Equation (1) represents velocity-time relation, Equation (2) represents position-time relation, and
    Equation (3) represents position-velocity relation.
  </p>,
  <p key="b3-p-s111-3" style={{ textIndent:28, textAlign:"justify" }}>
    We can derive these three equations of motion by graphical method as detailed below.
  </p>,

  // ── 1.12 EQUATION FOR VELOCITY-TIME RELATION ──────────────
  <SecHd key="sec-s112" id="s112" label="1.12" title="Equation for Velocity-Time Relation" />,
  <p key="b3-p-s112-1" style={{ textIndent:28, textAlign:"justify" }}>
    Suppose a body is moving along a straight line with a uniform acceleration <em>a</em>. Let <em>u</em> be the
    initial velocity of the body (at <em>t</em> = 0). The velocity-time graph of such a body is represented by a
    straight line AB, shown in Fig. 1.22. At <em>t</em> = 0, velocity = OA = <em>u</em> = initial velocity. In going
    from A to B, the velocity of the body goes on increasing at a constant rate, <em>a</em> (= acceleration). At
    <em>t</em> = OC, velocity of body = CB = <em>v</em>.
  </p>,
  <Fig key="fig-1-22"
    src={CONTENT_IMAGES.CONTENT_IMAGE_CF67BC0BDF72AD0F8AC3}
    num="Fig. 1.22" caption="Velocity-time graph for uniformly accelerated body" />,
  <p key="b3-p-s112-2" style={{ textIndent:28, textAlign:"justify" }}>
    Draw AD ⊥ BC and BE ⊥ OY. Let ∠BAD = θ.
  </p>,
  <p key="b3-p-s112-3" style={{ textIndent:28, textAlign:"justify" }}>
    It is known that acceleration of the body = slope of velocity-time graph
  </p>,
  <MathBlock key="b3-m-s112-1"><em>i.e.,</em>&nbsp;&nbsp; <em>a</em> = tan θ = <Frac n="BD" d="AD" />&nbsp;&nbsp;&nbsp;...(4)</MathBlock>,
  <p key="b3-p-s112-4" style={{ textIndent:28, textAlign:"justify" }}>
    But BD = BC – CD = BC – OA (∵ CD = OA) = <em>v</em> – <em>u</em> = change in velocity
  </p>,
  <p key="b3-p-s112-5" style={{ textIndent:28, textAlign:"justify" }}>
    and AD = OC = <em>t</em>, the time.
  </p>,
  <p key="b3-p-s112-6" style={{ textIndent:28, textAlign:"justify" }}>
    From eqn. (4):
  </p>,
  <MathBlock key="b3-m-s112-2"><em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} />&nbsp;&nbsp;&nbsp; or &nbsp;&nbsp; <em>v</em> – <em>u</em> = <em>at</em> &nbsp;&nbsp;&nbsp; or &nbsp;&nbsp; <strong><em>v</em> = <em>u</em> + <em>at</em></strong></MathBlock>,
  <p key="b3-p-s112-7" style={{ textIndent:28, textAlign:"justify" }}>which is the required velocity-time relation.</p>,

  // ── 1.13 EQUATION FOR POSITION-TIME RELATION ──────────────
  <SecHd key="sec-s113" id="s113" label="1.13" title="Equation for Position-Time Relation" />,
  <p key="b3-p-s113-1" style={{ textIndent:28, textAlign:"justify" }}>
    Suppose a body is moving along a straight line with a uniform acceleration <em>a</em>. Let <em>u</em> be the
    initial velocity of the body at <em>t</em> = 0. The velocity-time graph of such a body is represented by a
    straight line AB, shown in Fig. 1.22. Let <em>s</em> be the distance travelled by the body in time <em>t</em>,
    in going from A to B. As is known, the distance travelled in such a case is given by the area of the space
    enclosed between the velocity-time graph and the time axis, <em>i.e.,</em>
  </p>,
  <MathBlock key="b3-m-s113-1">
    distance, <em>s</em> = area of figure OABC = area of rectangle OADC + area of △ABD
  </MathBlock>,
  <MathBlock key="b3-m-s113-2">
    = OA × OC + <Frac n="1" d="2" /> × BD × AD = <em>u</em> × <em>t</em> + <Frac n="1" d="2" /> × (<em>BC</em> – <em>CD</em>) × OC
  </MathBlock>,
  <MathBlock key="b3-m-s113-3">
    <em>s</em> = <em>ut</em> + <Frac n="1" d="2" />(<em>v</em> – <em>u</em>)<em>t</em>&nbsp;&nbsp;&nbsp;...(5)
  </MathBlock>,
  <p key="b3-p-s113-2" style={{ textIndent:28, textAlign:"justify" }}>
    As <em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} />, (<em>v</em> – <em>u</em>) = <em>at</em>. Putting in eqn. (5):
  </p>,
  <MathBlock key="b3-m-s113-4">
    <em>s</em> = <em>ut</em> + <Frac n="1" d="2" /> × <em>at</em> × <em>t</em>
  </MathBlock>,
  <MathBlock key="b3-m-s113-5">
    <strong><em>s</em> = <em>ut</em> + <Frac n="1" d="2" /><em>at</em>²</strong>,&nbsp;&nbsp; which is the required position-time relation.
  </MathBlock>,

  // ── 1.14 EQUATION FOR POSITION-VELOCITY RELATION ──────────
  <SecHd key="sec-s114" id="s114" label="1.14" title="Equation for Position-Velocity Relation" />,
  <p key="b3-p-s114-1" style={{ textIndent:28, textAlign:"justify" }}>
    As discussed in Art. 1.13, the distance travelled by a uniformly accelerated body in time <em>t</em> is given by
    the area of the space enclosed between the velocity-time graph and the time axis. Therefore, from Fig. 1.22,
  </p>,
  <MathBlock key="b3-m-s114-1">distance travelled, <em>s</em> = area of trapezium OABC</MathBlock>,
  <MathBlock key="b3-m-s114-2">= <Frac n="sum of parallel sides" d="2" /> × distance between parallel sides = <Frac n="(OA + CB)" d="2" /> × OC</MathBlock>,
  <MathBlock key="b3-m-s114-3"><em>s</em> = <Frac n={<>(<em>u</em> + <em>v</em>)</>} d="2" /> <em>t</em>&nbsp;&nbsp;&nbsp;...(6)</MathBlock>,
  <p key="b3-p-s114-2" style={{ textIndent:28, textAlign:"justify" }}>
    From <em>v</em> = <em>u</em> + <em>at</em>, we get <em>v</em> – <em>u</em> = <em>at</em> or <em>t</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>a</em>} />. Putting in eqn. (6):
  </p>,
  <MathBlock key="b3-m-s114-4"><em>s</em> = <Frac n={<>(<em>v</em> + <em>u</em>)</>} d="2" /> × <Frac n={<>(<em>v</em> – <em>u</em>)</>} d={<em>a</em>} /> = <Frac n={<><em>v</em>² – <em>u</em>²</>} d={<>2<em>a</em></>} /></MathBlock>,
  <MathBlock key="b3-m-s114-5">or &nbsp;&nbsp;<strong><em>v</em>² – <em>u</em>² = 2<em>as</em></strong></MathBlock>,
  <p key="b3-p-s114-3" style={{ textIndent:28 }}>which is the required equation for position-velocity relation.</p>,

  // Solved Problems — Equations of Motion
  <NumericalSection key="num-eqmotion" topic="EQUATIONS OF MOTION">
    <div style={{ background:LIGHT_P, padding:"8px 12px", marginBottom:12, borderRadius:4 }}>
      <strong>Formulae and Units</strong>
      <ol style={{ paddingLeft:20, margin:"6px 0 0", lineHeight:1.8, fontSize:14 }}>
        <li>Velocity-time relation is <strong><em>v</em> = <em>u</em> + <em>at</em></strong></li>
        <li>Position-time relation is <strong><em>s</em> = <em>ut</em> + <Frac n="1" d="2" /><em>at</em>²</strong></li>
        <li>Position-velocity relation is <strong><em>v</em>² – <em>u</em>² = 2<em>as</em></strong></li>
        <li>where <em>u</em> is initial velocity, <em>a</em> is uniform acceleration, <em>v</em> is final velocity after <em>t</em> seconds, <em>s</em> is distance. Both <em>u</em> and <em>v</em> are in m/s, <em>t</em> in second, <em>s</em> in metre.</li>
      </ol>
    </div>

    <p key="b3-ep1-q"><strong>Problem 1.</strong> A moving train is brought to rest within 20 seconds by applying brakes. Find the initial velocity, if the retardation due to brakes is 2 m/s².</p>
    <p key="b3-ep1-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> Final velocity <em>v</em> = 0, time <em>t</em> = 20 s, retardation <em>a</em> = –2 m/s².
    </p>
    <MathBlock key="b3-ep1-m1">From <em>v</em> = <em>u</em> + <em>at</em>,&nbsp;&nbsp; <em>u</em> = <em>v</em> – <em>at</em> = 0 – (–2) × 20 = <strong>40 m/s</strong></MathBlock>

    <p key="b3-ep2-q" style={{ marginTop:12 }}><strong>Problem 2.</strong> A body is accelerating at a constant rate of 10 m/s². If the body starts from rest, how much distance will it cover in 2 seconds?</p>
    <p key="b3-ep2-s1" style={{ textIndent:14 }}>
      <strong>Solution.</strong> Here <em>a</em> = 10 m/s², <em>u</em> = 0, <em>t</em> = 2 s.
    </p>
    <MathBlock key="b3-ep2-m1"><em>s</em> = <em>ut</em> + <Frac n="1" d="2" /><em>at</em>² = 0 × 2 + <Frac n="1" d="2" /> × 10 × (2)² = <strong>20 m</strong></MathBlock>

    <p key="b3-ep3-q" style={{ marginTop:12 }}><strong>Problem 3.</strong> A car acquires a velocity of 72 km/h in 10 seconds starting from rest. Find (<em>a</em>) the acceleration (<em>b</em>) the average velocity (<em>c</em>) the distance travelled in this time.</p>
    <p key="b3-ep3-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> <em>u</em> = 0, <em>t</em> = 10 s; final velocity <em>v</em> = <Frac n="72 × 1000 m" d="60 × 60 s" /> = 20 m/s.
    </p>
    <MathBlock key="b3-ep3-m1">(<em>a</em>) <em>a</em> = <Frac n={<><em>v</em> – <em>u</em></>} d={<em>t</em>} /> = <Frac n="20 – 0" d="10" /> = <strong>2 m/s²</strong></MathBlock>
    <MathBlock key="b3-ep3-m2">(<em>b</em>) <em>v<sub style={{fontSize:"0.72em"}}>av</sub></em> = <Frac n={<><em>u</em> + <em>v</em></>} d="2" /> = <Frac n="0 + 20" d="2" /> = <strong>10 m/s</strong></MathBlock>
    <MathBlock key="b3-ep3-m3">(<em>c</em>) <em>s</em> = <Frac n={<><em>v</em>² – <em>u</em>²</>} d={<>2<em>a</em></>} /> = <Frac n="(20)² – 0" d="2 × 2" /> = <strong>100 m</strong></MathBlock>
  </NumericalSection>,

  // Problems for Practice — Equations of Motion
  <ProblemsBox key="prob-s114">
    <ol style={{ paddingLeft:28, listStyleType:"decimal", listStylePosition:"outside", fontSize:14, lineHeight:1.8, margin:0 }}>
      <li style={{ marginBottom:6 }}>A body starts to slide over a horizontal surface with an initial velocity of 0·5 m/s. Due to friction, its velocity decreases at the rate of 0·05 m/s². How much time will it take for the body to stop? <strong>[Ans. 10 s]</strong></li>
      <li style={{ marginBottom:6 }}>A train starting from rest moves with a uniform acceleration of 0·2 m/s² for 5 minutes. Calculate the speed acquired and the distance travelled in this time. <strong>[Ans. 60 m/s ; 9 km]</strong></li>
      <li style={{ marginBottom:6 }}>A bus was moving with a speed of 54 km/h. On applying brakes, it stopped in 8 seconds. Calculate the acceleration and the distance travelled before stopping. <strong>[Ans. –1·87 m/s² ; 60·2 m]</strong></li>
      <li style={{ marginBottom:6 }}>A motor cycle moving with a speed of 5 m/s is subjected to an acceleration of 0·2 m/s². Calculate the speed of the motor cycle after 10 second, and the distance travelled in this time. <strong>[Ans. 7 m/s ; 60 m]</strong></li>
      <li style={{ marginBottom:6 }}>The brakes applied to a car produce an acceleration of 6 m/s² in the opposite direction to the motion. If the car takes 2 s to stop after the application of brakes, calculate the distance it travels during this time. <strong>[Ans. 12 m]</strong></li>
      <li style={{ marginBottom:6 }}>A train starting from rest attains a velocity of 72 km/h in 5 minutes. Assuming that the acceleration is uniform, find (<em>i</em>) the acceleration and (<em>ii</em>) the distance travelled by the train for attaining this velocity. <strong>[Ans. 1/15 m/s² ; 3 km]</strong></li>
      <li style={{ marginBottom:6 }}>A car accelerates uniformly from 18 km/h to 36 km/h in 5 seconds. Calculate (<em>i</em>) the acceleration and (<em>ii</em>) the distance covered by the car in that time. <strong>[Ans. 1 m/s² ; 37·5 m]</strong></li>
    </ol>
   <div style={{ marginTop:12, borderTop:"1px solid #e0c0d8", paddingTop:10 }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:12, color:P_COLOR, margin:"0 0 8px", letterSpacing:1 }}>■ SOLUTIONS/EXPLANATIONS ■</p>
      <p style={{ fontSize:14, margin:"0 0 4px" }}><strong>1.</strong> Here, <em>u</em> = 0·5 m/s, <em>a</em> = –0·05 m/s², <em>t</em> = ?, <em>v</em> = 0</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <em>u</em> + <em>at</em>,&nbsp;&nbsp; <em>t</em> = <Frac n="v – u" d="a" /> = <Frac n="0 – 0·5" d="–0·05" /> = <strong>10 s</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>2.</strong> Here, <em>u</em> = 0, <em>a</em> = 0·2 m/s², <em>t</em> = 5 min = 300 s, <em>v</em> = ?, <em>s</em> = ?</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <em>u</em> + <em>at</em>,&nbsp;&nbsp; <em>v</em> = 0 + 0·2 × 300 = <strong>60 m/s</strong></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em>² – <em>u</em>² = 2<em>as</em>,&nbsp;&nbsp; <em>s</em> = <Frac n="60² – 0²" d="2 × 0·2" /> = <strong>9000 m = 9 km</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>3.</strong> Here, <em>u</em> = 54 km/h = <Frac n="54 × 1000 m" d="60 × 60 s" /> = 15 m/s, <em>v</em> = 0, <em>t</em> = 8 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <em>u</em> + <em>at</em>,&nbsp;&nbsp; <em>a</em> = <Frac n="0 – 15" d="8" /> = <strong>–1·87 m/s²</strong></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>s</em> = <em>ut</em> + ½<em>at</em>²,&nbsp;&nbsp; <em>s</em> = 15 × 8 + ½(–1·87)(8)² = <strong>60·2 m</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>4.</strong> Here, <em>u</em> = 5 m/s, <em>a</em> = 0·2 m/s², <em>t</em> = 10 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <em>u</em> + <em>at</em>,&nbsp;&nbsp; <em>v</em> = 5 + 0·2 × 10 = <strong>7 m/s</strong></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em>² – <em>u</em>² = 2<em>as</em>,&nbsp;&nbsp; <em>s</em> = <Frac n="7² – 5²" d="2 × 0·2" /> = <strong>60 m</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>5.</strong> Here, <em>a</em> = –6 m/s², <em>v</em> = 0, <em>t</em> = 2 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <em>u</em> + <em>at</em>,&nbsp;&nbsp; 0 = <em>u</em> – 6 × 2,&nbsp;&nbsp; <em>u</em> = 12 m/s</div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em>² – <em>u</em>² = 2<em>as</em>,&nbsp;&nbsp; <em>s</em> = <Frac n="0 – 12²" d="2 × (–6)" /> = <strong>12 m</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>6.</strong> Here, <em>u</em> = 0, <em>v</em> = 72 km/h = 20 m/s, <em>t</em> = 5 min = 300 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Thus, <em>a</em> = <Frac n="20 – 0" d="300" /> = <strong>(1/15) m/s²</strong></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em>² – <em>u</em>² = 2<em>as</em>,&nbsp;&nbsp; <em>s</em> = <Frac n="20² – 0²" d="2 × 1/15" /> = <strong>3000 m = 3 km</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>7.</strong> Here, <em>u</em> = 18 km/h = 5 m/s, <em>v</em> = 36 km/h = 10 m/s, <em>t</em> = 5 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>Thus, <em>a</em> = <Frac n="10 – 5" d="5" /> = <strong>1 m/s²</strong></div>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>s</em> = <em>ut</em> + ½<em>at</em>²,&nbsp;&nbsp; <em>s</em> = 5 × 5 + ½ × 1 × 5² = <strong>37·5 m</strong></div>
    </div>
  </ProblemsBox>,

  // ── 1.15 UNIFORM CIRCULAR MOTION ──────────────────────────
  <SecHd key="sec-s115" id="s115" label="1.15" title="Uniform Circular Motion" />,
  <p key="b3-p-s115-1" style={{ textIndent:28, textAlign:"justify" }}>
    When a body travels equal distances in equal intervals of time, over a circular path, its speed is uniform. The
    motion of the body is said to be <strong>uniform circular motion.</strong> <strong><em>The direction of motion at
    any instant of time is along the tangent to the circular path at that instant.</em></strong> To understand this,
    let us consider motion of a body along a closed path.
  </p>,
  <p key="b3-p-s115-2" style={{ textIndent:28, textAlign:"justify" }}>
    Fig. 1.23 (<em>a</em>) shows the path of an athlete along a rectangular track ABCD. The athlete changes his
    direction of motion at the four corners A, B, C, D of the rectangular track, in every round. Fig. 1.23 (<em>b</em>)
    shows a hexagonal path where in every round, the direction of motion is changed at the six corners A, B, C, D,
    E and F. In Fig. 1.23 (<em>c</em>), the track is a regular octagon. In every round, the athlete has to change the
    direction of motion at eight corners A, B, C, D, E, F, G, H of the octagon; and so on. We observe that as number
    of sides of track increases, athlete has to take turn more and more number of times. If we go on increasing the
    number of sides of the track indefinitely, we find that the shape of the track approaches the shape of a circle.
    The length of each side tends to be zero. Along the circle, the athlete has to change his direction of motion at
    each point. Therefore, the effective direction of motion is along the tangent to the circular path at that point
    as shown in Fig. 1.23 (<em>d</em>).
  </p>,
  <div key="b3-fig-123-row" style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", margin:"16px 0" }}>
    <Fig key="fig-1-23a"
      src={CONTENT_IMAGES.CONTENT_IMAGE_29EA20D4897BBDAB51AE}
      num="Fig. 1.23(a)" caption="Rectangular track" />
    <Fig key="fig-1-23b"
      src={CONTENT_IMAGES.CONTENT_IMAGE_E06E3B11BF2FD264305F}
      num="Fig. 1.23(b)" caption="Hexagonal path" />
    <Fig key="fig-1-23c"
      src={CONTENT_IMAGES.CONTENT_IMAGE_F35E58E95A39058479A5}
      num="Fig. 1.23(c)" caption="Octagonal track" />
    <Fig key="fig-1-23d"
      src={CONTENT_IMAGES.CONTENT_IMAGE_13B81F37357968A7D6AF}
      num="Fig. 1.23(d)" caption="Circular path — tangential velocity" />
  </div>,
  <p key="b3-p-s115-3" style={{ textIndent:28, textAlign:"justify" }}>
    It should be clearly understood that in uniform circular motion, only the speed of the body is constant. But the
    direction of motion of the body is changing continuously. Therefore, velocity of the body in uniform circular
    motion is changing continuously. Hence <strong><em>uniform circular motion is an accelerated motion.</em></strong>
    We shall study in the next chapter that an external force is required to produce acceleration. Hence an external
    force is needed to move a body uniformly in a circle. This force is called <strong>centripetal force.</strong>
    Corresponding acceleration is called <strong>centripetal acceleration.</strong> It is directed towards centre of
    the circle (Fig. 1.23(<em>d</em>)).
  </p>,
  <p key="b3-p-s115-4" style={{ textIndent:28, textAlign:"justify" }}>
    To calculate speed of the body in uniform circular motion, suppose <em>r</em> = radius of circular path,
    <em>t</em> = time taken by the body to go once around the circle, <em>v</em> = speed of the body in uniform
    circular motion. Distance travelled by the body in one complete revolution = circumference of the circle,
    <em>i.e.,</em> <em>s</em> = 2π<em>r</em>, where π = 22/7.
  </p>,
  <MathBlock key="b3-m-s115-1">As speed = <Frac n="distance" d="time" />,&nbsp;&nbsp; <strong><em>v</em> = <Frac n={<>2π<em>r</em></>} d={<em>t</em>} /></strong></MathBlock>,

  // ── 1.16 EXAMPLES OF UNIFORM CIRCULAR MOTION ──────────────
  <SecHd key="sec-s116" id="s116" label="1.16" title="Examples of Uniform Circular Motion" />,
  <p key="b3-p-s116-intro" style={{ textIndent:28, textAlign:"justify" }}>
    Some of the examples of uniform circular motion are:
  </p>,
  <p key="b3-p-s116-1" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>1. <em>A piece of stone tied to a thread and rotated in a circle with uniform speed.</em></strong>
  </p>,
  <p key="b3-p-s116-1t" style={{ margin:"0 0 8px 28px", textAlign:"justify" }}>
    This is shown in Fig. 1.24. The necessary force F is provided by pull of the hand. When the stone is at A, its speed is along the tangent AX to the circle at A. It is towards east. Similarly, when the stone is at B, its speed is along the tangent BY to the circle at B. It is towards south as shown in Fig. 1.24. If the thread were to break at A, the stone would fly along AX. Similarly, if the thread were to break at B, the stone would fly along BY. It means the stone continues to move along the direction it has been moving at that instant when external force ceases to act on it.
  </p>,
  <Fig key="fig-1-24"
    src={CONTENT_IMAGES.CONTENT_IMAGE_EB714DA9736443F8ED9A}
    num="Fig. 1.24" caption="Stone on a string revolving in a circle" />,
  <p key="b3-p-s116-2" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>2.</strong> In a sports meet, when an athlete is to throw a hammer/discuss, he holds it in hand and gives it a circular motion by rotating his body. The moment he releases the hammer/discuss, it moves in the direction in which it was moving at the time of release.
  </p>,
  <p key="b3-p-s116-3" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>3.</strong> Moon moves around the Earth uniformly in a circular orbit. The necessary force is provided by gravitational pull of Earth on the Moon.
  </p>,
  <p key="b3-p-s116-4" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>4.</strong> The motion of all artificial satellites around the Earth is uniform circular motion, which is an accelerated motion. The necessary centripetal force is provided by gravitational pull of the Earth on the satellite.
  </p>,
  <p key="b3-p-s116-5" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>5.</strong> The motion of Earth around the Sun is also uniform circular motion, which is an accelerated motion. The necessary centripetal force is provided by gravitational pull of Sun on the Earth.
  </p>,
  <p key="b3-p-s116-6" style={{ margin:"0 0 5px 14px", textAlign:"justify" }}>
    <strong>6.</strong> The tip of second's hand; minute's hand and hour's hand of a watch displays uniform circular motion on the dial of the watch.
  </p>,
  <p key="b3-p-s116-7" style={{ margin:"0 0 8px 14px", textAlign:"justify" }}>
    <strong>7.</strong> A cyclist moving uniformly over a circular track also executes uniform circular motion.
  </p>,

  // Solved Problems — Uniform Circular Motion
  <NumericalSection key="num-circular" topic="UNIFORM CIRCULAR MOTION">
    <div style={{ background:LIGHT_P, padding:"8px 12px", marginBottom:12, borderRadius:4 }}>
      <strong>Formulae and Units</strong>
      <p style={{ margin:"6px 0 0", fontSize:14, lineHeight:1.8 }}>
        If <em>r</em> = radius of a circle, <em>t</em> = time taken by a body to go once around the circle,
        <em>v</em> = uniform speed of the body, then <strong><em>v</em> = <Frac n={<>2π<em>r</em></>} d={<em>t</em>} /></strong>.
        Here, <em>r</em> is in metre; <em>t</em> is in second and <em>v</em> is in m/s.
      </p>
    </div>

    <p key="b3-cp1-q"><strong>Problem 1.</strong> A cyclist goes once round a circular track of diameter 105 metre in 5 minutes. Calculate his speed.</p>
    <p key="b3-cp1-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> Diameter = 105 m, radius <em>r</em> = <Frac n="105" d="2" /> m; time <em>t</em> = 5 min = 300 s.
    </p>
    <MathBlock key="b3-cp1-m1"><em>v</em> = <Frac n={<>2π<em>r</em></>} d={<em>t</em>} /> = 2 × <Frac n="22" d="7" /> × <Frac n="105" d="2 × 300" /> = <strong>1·1 m/s</strong></MathBlock>

    <p key="b3-cp2-q" style={{ marginTop:12 }}><strong>Problem 2.</strong> An athlete completes two rounds of a circular track 100 m long in 20 seconds. Calculate diameter of the track and speed of the athlete, supposed to be uniform.</p>
    <p key="b3-cp2-s1" style={{ textIndent:14, textAlign:"justify" }}>
      <strong>Solution.</strong> Length of circular track = 2π<em>r</em> = 100 m.
    </p>
    <MathBlock key="b3-cp2-m1">Diameter, 2<em>r</em> = <Frac n="100" d="π" /> m = <Frac n="100" d="22" /> × 7 = <strong>31·8 m</strong></MathBlock>
    <MathBlock key="b3-cp2-m2">Distance travelled <em>s</em> = 2 × 100 = 200 m; time <em>t</em> = 20 s</MathBlock>
    <MathBlock key="b3-cp2-m3">Uniform speed <em>v</em> = <Frac n="200" d="20" /> = <strong>10 m/s</strong></MathBlock>
  </NumericalSection>,

  // Problems for Practice — Circular Motion
  <ProblemsBox key="prob-s116">
    <ol style={{ paddingLeft:28, listStyleType:"decimal", listStylePosition:"outside", fontSize:14, lineHeight:1.8, margin:0 }}>
      <li style={{ marginBottom:6 }}>Calculate the speed of the tip of second's hand of a watch of length 1·5 cm. <strong>[Ans. 0·16 cm/s]</strong></li>
      <li style={{ marginBottom:6 }}>The length of minutes hand of a clock is 5 cm. Calculate its speed. <strong>[Ans. 8·7 × 10<Sup c="–3" /> cm/s]</strong></li>
    </ol>
    <div style={{ marginTop:12, borderTop:"1px solid #e0c0d8", paddingTop:10 }}>
      <p style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700, fontSize:12, color:P_COLOR, margin:"0 0 8px", letterSpacing:1 }}>■ SOLUTIONS/EXPLANATIONS ■</p>
      <p style={{ fontSize:14, margin:"0 0 4px" }}><strong>1.</strong> Here, <em>r</em> = 1·5 cm, <em>v</em> = ?</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>Time taken by second's hand of a watch to go once around the circle, <em>t</em> = 60 second</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <Frac n="2πr" d="t" />,&nbsp;&nbsp; <em>v</em> = 2 × <Frac n="22" d="7" /> × <Frac n="1·5" d="60" /> = <strong>0·16 cm/s</strong></div>
      <p style={{ fontSize:14, margin:"4px 0 4px" }}><strong>2.</strong> Here, <em>r</em> = 5 cm, <em>v</em> = ?</p>
      <p style={{ fontSize:14, margin:"2px 0 4px", textIndent:14 }}>Time taken by minute's hand of a clock to go once around the circle, <em>t</em> = 60 min = 60 × 60 s</p>
      <div style={{ textAlign:"center", margin:"4px 20px", fontStyle:"italic", fontSize:"14.5px" }}>From <em>v</em> = <Frac n="2πr" d="t" />,&nbsp;&nbsp; <em>v</em> = 2 × <Frac n="22" d="7" /> × <Frac n="5" d="60 × 60" /> = <strong>8·7 × 10<Sup c="–3" /> cm/s</strong></div>
    </div>
  </ProblemsBox>,
];

// ── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id: "s11",  label: "1.1",  title: "Introduction",                           level: 1 },
  { id: "s12",  label: "1.2",  title: "Distance and Displacement",               level: 1 },
  { id: "s13",  label: "1.3",  title: "Uniform Motion",                          level: 1 },
  { id: "s14",  label: "1.4",  title: "Non-Uniform Motion",                      level: 1 },
  { id: "s15",  label: "1.5",  title: "Concept of Speed",                        level: 1 },
  { id: "s16",  label: "1.6",  title: "Concept of Velocity",                     level: 1 },
  { id: "s17",  label: "1.7",  title: "Concept of Acceleration",                 level: 1 },
  { id: "s18",  label: "1.8",  title: "Graphical Representation of Motion",      level: 1 },
  { id: "s19",  label: "1.9",  title: "Distance-Time Graphs",                    level: 1 },
  { id: "s110", label: "1.10", title: "Velocity-Time Graphs",                    level: 1 },
  { id: "s111", label: "1.11", title: "Derivation of Equations of Motion",       level: 1 },
  { id: "s112", label: "1.12", title: "Equation for Velocity-Time Relation",     level: 1 },
  { id: "s113", label: "1.13", title: "Equation for Position-Time Relation",     level: 1 },
  { id: "s114", label: "1.14", title: "Equation for Position-Velocity Relation", level: 1 },
  { id: "s115", label: "1.15", title: "Uniform Circular Motion",                 level: 1 },
  { id: "s116", label: "1.16", title: "Examples of Uniform Circular Motion",     level: 1 },
];

// ── CONCAT ALL CONTENT ARRAYS ────────────────────────────────
const allContent = [
  ...content_b1,
  ...content_b2,
  ...content_b3,
];

// ── MAIN EXPORT ──────────────────────────────────────────────
export default function Chapter1() {
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
