"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

function useSetup() {
  useEffect(() => {
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800;900&display=swap";
    document.head.appendChild(font);
    const css = document.createElement("style");
    css.textContent = `
      @keyframes fcSlide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
      .fc-kids { animation: fcSlide .18s ease-out; }
      .fc-node { transition: filter .12s; }
      .fc-node:hover { filter: brightness(.97); }
      .fc-pill { transition: background .15s; }
      .fc-btn { transition: opacity .12s; }
      .fc-btn:hover { opacity: .82; }
    `;
    document.head.appendChild(css);
    return () => { document.head.removeChild(font); document.head.removeChild(css); };
  }, []);
}

const DEPTH_STYLES = [
  (a) => ({ bg: a, fg:"#fff", fw:800, fs:16, radius:10,
    px:"14px 20px", shadow:`0 4px 16px ${a}44`,
    ff:"'Merriweather Sans',Arial,sans-serif" }),
  (a) => ({ bg:"#fff", fg:a, fw:700, fs:14.5, radius:8,
    px:"10px 16px", border:`2px solid ${a}`, shadow:"0 1px 6px rgba(0,0,0,.07)",
    ff:"'Merriweather Sans',Arial,sans-serif" }),
  (a) => ({ bg:"#fdf3f8", fg:"#111", fw:600, fs:14, radius:7,
    px:"9px 14px", border:`1.5px solid ${a}55`,
    ff:"'EB Garamond',Georgia,serif" }),
  () => ({ bg:"#fff", fg:"#222", fw:400, fs:14, radius:5,
    px:"8px 13px", border:"1px solid #ddd",
    ff:"'EB Garamond',Georgia,serif" }),
];

const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Reflection of Light",
    subtitle: "Spherical mirrors — concave and convex",
    children: [
      {
        id: "s1-concave",
        title: "Concave Mirror",
        detail: "A spherical mirror whose reflecting surface is curved inwards (towards the centre of the sphere).\n\nKey parts: Pole (P), Centre of curvature (C), Principal axis, Focus (F), Aperture (A).\nThe focus lies between P and C on the same side as the reflecting surface.",
        children: [
          {
            id: "s1-concave-sign",
            title: "Sign Convention (Concave)",
            detail: "(i) R (radius of curvature) is negative.\n(ii) f (focal length) is negative.\n(iii) Mirror formula:  1/f = 1/v + 1/u",
          },
        ],
      },
      {
        id: "s1-convex",
        title: "Convex Mirror",
        detail: "A spherical mirror whose reflecting surface is curved outwards (away from the centre of the sphere).\n\nKey parts: Pole (P), Centre of curvature (C), Principal axis, Focus (F), Aperture (A).\nThe focus and centre of curvature lie behind the mirror.",
        children: [
          {
            id: "s1-convex-sign",
            title: "Sign Convention (Convex)",
            detail: "(i) R (radius of curvature) is positive.\n(ii) f (focal length) is positive.\n(iii) Mirror formula:  1/f = 1/v + 1/u",
          },
        ],
      },
      {
        id: "s1-signconv",
        title: "New Cartesian Sign Convention",
        detail: "All distances are measured from the pole (P) of the mirror along the principal axis.\n• Distances in the direction of incident light are positive.\n• Distances opposite to the direction of incident light are negative.\n• Heights above the principal axis are positive; below are negative.",
      },
      {
        id: "s1-props",
        title: "Key Properties of Spherical Mirrors",
        children: [
          {
            id: "s1-props-uv",
            title: "u and v Sign Rules",
            detail: "u and v are positive for virtual objects and virtual images respectively, and negative for real objects and real images — applies to both concave and convex mirrors.",
          },
          {
            id: "s1-props-focal",
            title: "Focal Length & Radius",
            detail: "Focal length (f) of a spherical mirror is half its radius of curvature (R):\nf = R / 2",
          },
          {
            id: "s1-props-mag",
            title: "Linear Magnification",
            detail: "Linear magnification (m) of a spherical mirror:\nm = h₂ / h₁ = −v / u\n\nwhere h₁ is the height of the object and h₂ is the height of its image.",
          },
        ],
      },
    ],
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Refraction of Light",
    subtitle: "Spherical lenses — convex and concave",
    children: [
      {
        id: "s2-convex",
        title: "Convex Lens (Converging)",
        detail: "A lens that is thicker at the centre than at the edges. It converges parallel rays of light to a real focus on the other side.",
        children: [
          {
            id: "s2-convex-sign",
            title: "Sign Convention (Convex Lens)",
            detail: "(i) f (focal length) is positive.\n(ii) Power (P) = 100 / f (in cm) — is positive.\n(iii) Lens formula:  1/f = 1/v − 1/u",
          },
        ],
      },
      {
        id: "s2-concave",
        title: "Concave Lens (Diverging)",
        detail: "A lens that is thinner at the centre than at the edges. It diverges parallel rays of light; the virtual focus lies on the same side as the incident light.",
        children: [
          {
            id: "s2-concave-sign",
            title: "Sign Convention (Concave Lens)",
            detail: "(i) f (focal length) is negative.\n(ii) Power (P) = 100 / f (in cm) — is negative.\n(iii) Lens formula:  1/f = 1/v − 1/u",
          },
        ],
      },
      {
        id: "s2-signconv",
        title: "New Cartesian Sign Convention (Lenses)",
        detail: "All distances are measured from the optical centre (O) of the lens.\n• Distances in the direction of incident light are positive.\n• Distances opposite to the direction of incident light are negative.\n• Heights above the principal axis are positive; below are negative.",
      },
      {
        id: "s2-mag",
        title: "Linear Magnification (Lens)",
        detail: "Linear magnification (m) of a lens:\nm = h₂ / h₁ = v / u\n\nwhere h₁ is the height of the object and h₂ is the height of the image.",
      },
      {
        id: "s2-power",
        title: "Power of a Lens",
        detail: "The power of a lens is its ability to bend (converge or diverge) light rays that fall on it. It is represented by the letter P and is the reciprocal of focal length in metres.\n\nP = 1 / f\n\nSI unit: dioptre (D), where 1 D = 1 m⁻¹.\nIf f is in cm → P = 100 / f (in cm).",
        children: [
          {
            id: "s2-power-combo",
            title: "Power of a Combination of Lenses",
            detail: "When lenses are placed in contact, the net power is the algebraic sum of individual powers:\n\nP = P₁ + P₂ + P₃ + …\n\nThis principle is used in optical instruments like cameras, microscopes, and telescopes.",
          },
        ],
      },
    ],
  },
];

function TreeNode({ node, depth=0, accent, isLast=false }) {
  const { mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const open =
    mode === "expand" ? true : mode === "collapse" ? false : localOpen;

  const ds = (DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length-1)])(accent);

  const arrowStyle = {
    fontSize:10, minWidth:14, textAlign:"center", flexShrink:0,
    color: depth===0 ? "rgba(255,255,255,.8)" : accent,
    display:"inline-block",
    transform: hasKids && open ? "rotate(90deg)" : "rotate(0deg)",
    transition:"transform .2s",
    marginTop: depth===0 ? 3 : 2,
    opacity: hasKids ? 1 : 0,
  };

  return (
    <div style={{ position:"relative", marginBottom: depth===0?22:depth===1?8:5 }}>
      {depth > 0 && <>
        <div style={{ position:"absolute", left:-21, top:0,
          height: isLast ? "calc(50% + 1px)" : "100%",
          width:2, background:`${accent}44` }} />
        <div style={{ position:"absolute", left:-21, top:"50%",
          width:17, height:2, marginTop:-1, background:`${accent}44` }} />
      </>}

      <div
        className="fc-node"
        onClick={() => hasKids && setLocalOpen((o) => !o)}
        style={{
          display:"flex", alignItems:"flex-start", gap:8,
          background:ds.bg, color:ds.fg,
          fontWeight:ds.fw, fontSize:ds.fs, fontFamily:ds.ff,
          borderRadius:ds.radius, padding:ds.px,
          border:ds.border ?? "none",
          boxShadow:ds.shadow ?? "none",
          cursor:hasKids ? "pointer" : "default",
          userSelect:"none",
        }}
      >
        <span style={arrowStyle}>▶</span>
        <div style={{ flex:1 }}>
          <div style={{ lineHeight:1.35 }}>{node.title}</div>
          {node.subtitle && (
            <div style={{ fontSize:"0.8em", fontStyle:"italic",
              opacity:.72, fontWeight:400, marginTop:2 }}>{node.subtitle}</div>
          )}
          {node.detail && (
            <div style={{ fontSize:"0.92em", fontWeight:400, fontStyle:"normal",
              color: depth===0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
              marginTop:6, lineHeight:1.65, whiteSpace:"pre-line",
              fontFamily:"'EB Garamond',Georgia,serif", letterSpacing:"0.01em" }}>
              {node.detail}
            </div>
          )}
        </div>
      </div>

      {hasKids && open && (
        <div className="fc-kids" style={{ marginLeft:28, marginTop:6 }}>
          {node.children.map((child, i) => (
            <TreeNode key={child.id} node={child} depth={depth+1}
              accent={accent} isLast={i===node.children.length-1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LightReflectionRefractionFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version:0, mode:"default" });

  const expandAll   = () => setCtxVal(v => ({ version:v.version+1, mode:"expand" }));
  const collapseAll = () => setCtxVal(v => ({ version:v.version+1, mode:"collapse" }));

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });

  const body = { fontFamily:"'EB Garamond',Georgia,serif", fontSize:15, lineHeight:1.58, color:"#1a1a1a" };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background:"#eae5e9", minHeight:"100vh", ...body }}>

        {/* HEADER */}
        <div style={{ background:"linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
          padding:"32px 40px 26px", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.18)",
            border:"1px solid rgba(255,255,255,0.4)",
            fontFamily:"'Merriweather Sans',Arial,sans-serif",
            fontWeight:800, fontSize:10, letterSpacing:3,
            color:"#fff", padding:"4px 16px", borderRadius:3, marginBottom:14,
            textTransform:"uppercase" }}>
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1 style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif", fontSize:22,
            fontWeight:900, color:"#fff", margin:"0 0 8px",
            letterSpacing:1.5, textTransform:"uppercase", lineHeight:1.25 }}>
            Light : Reflection and Refraction
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Physics 10th
          </div>
        </div>

        {/* NAV BAR */}
        <div style={{ background:"#fff", borderBottom:"1px solid #e8e8e8",
          padding:"10px 24px", display:"flex", flexWrap:"wrap",
          gap:7, justifyContent:"center", alignItems:"center" }}>
          {DATA.map(s => (
            <button key={s.id} className="fc-pill"
              onClick={() => scrollTo(s.id)}
              style={{ display:"inline-flex", alignItems:"center", gap:5,
                background:`${s.accent}15`, color:s.accent,
                border:`1.5px solid ${s.accent}55`, borderRadius:30,
                padding:"4px 13px", fontFamily:"'Merriweather Sans',Arial,sans-serif",
                fontWeight:700, fontSize:11.5, letterSpacing:.3, cursor:"pointer",
                whiteSpace:"nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background=`${s.accent}28`}
              onMouseLeave={e => e.currentTarget.style.background=`${s.accent}15`}>
              <span>{s.title.split(" ").slice(0,3).join(" ")}</span>
            </button>
          ))}
          <div style={{ marginLeft:"auto", display:"flex", gap:7 }}>
            <button className="fc-btn" onClick={expandAll}
              style={{ background:PINK, color:"#fff", border:"none", cursor:"pointer",
                borderRadius:6, padding:"5px 13px", fontSize:12,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700 }}>
              Expand All
            </button>
            <button className="fc-btn" onClick={collapseAll}
              style={{ background:"#fff", color:PINK, border:`1.5px solid ${PINK}`,
                cursor:"pointer", borderRadius:6, padding:"5px 13px", fontSize:12,
                fontFamily:"'Merriweather Sans',Arial,sans-serif", fontWeight:700 }}>
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth:880, margin:"0 auto", padding:"28px 24px 56px" }}>
          {DATA.map(section => (
            <div key={section.id} id={section.id} style={{ marginBottom:6 }}>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
