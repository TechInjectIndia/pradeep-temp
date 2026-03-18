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
    title: "Human Eye",
    subtitle: "Defects of Vision",
    detail: "The human eye is one of the most valuable sense organs. Various defects of vision can impair the eye's ability to focus light correctly on the retina.",
    children: [
      {
        id: "s1-myopia",
        title: "Myopia (Short-sightedness)",
        detail: "A defect of the eye where distant objects appear blurred while nearby objects are seen clearly.",
        children: [
          {
            id: "s1-myopia-1",
            title: "Symptoms",
            detail: "Eye can see clearly the objects lying at short distances but far off objects cannot be seen clearly."
          },
          {
            id: "s1-myopia-2",
            title: "Cause",
            detail: "It is due to an increase in length of the eye ball or decrease in focal length of the eye lens."
          },
          {
            id: "s1-myopia-3",
            title: "Correction",
            detail: "Concave lens of suitable focal length is used to correct a myopic eye."
          }
        ]
      },
      {
        id: "s1-hyper",
        title: "Hypermetropia (Long-sightedness)",
        detail: "A defect of the eye where nearby objects appear blurred while distant objects are seen clearly.",
        children: [
          {
            id: "s1-hyper-1",
            title: "Symptoms",
            detail: "Eye can see clearly the objects lying at large distances but the nearby objects cannot be seen clearly."
          },
          {
            id: "s1-hyper-2",
            title: "Cause",
            detail: "It is due to a decrease in length of the eye ball or increase in focal length of the eye lens."
          },
          {
            id: "s1-hyper-3",
            title: "Correction",
            detail: "Convex lens of suitable focal length is used to correct a hypermetropic eye."
          }
        ]
      },
      {
        id: "s1-other",
        title: "Other Defects of the Eye",
        children: [
          {
            id: "s1-other-1",
            title: "Presbyopia",
            detail: "An age-related defect where the eye lens loses its ability to change shape (power of accommodation decreases)."
          },
          {
            id: "s1-other-2",
            title: "Astigmatism",
            detail: "Caused by a deformed cornea that results in distorted images."
          },
          {
            id: "s1-other-3",
            title: "Cataract",
            detail: "The eye lens becomes opaque, leading to loss of vision. It can be corrected by surgery."
          },
          {
            id: "s1-other-4",
            title: "Colour Blindness",
            detail: "Reduced ability to distinguish between certain colours."
          },
          {
            id: "s1-other-5",
            title: "Squint",
            detail: "Misaligned eyes causing them to point in different directions."
          }
        ]
      }
    ]
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Colourful World",
    subtitle: "Scattering of Light & Tyndall Effect",
    children: [
      {
        id: "s2-rayleigh",
        title: "Scattering of Light (Rayleigh Scattering)",
        detail: "Bouncing of electromagnetic radiation by atoms/molecules of the medium through which it travels.\nIntensity of scattered light (Iₛ) varies inversely as the fourth power of the wavelength (λ) of the incident light, i.e., Iₛ ∝ 1/λ⁴.",
        children: [
          {
            id: "s2-rayleigh-def",
            title: "What is Rayleigh Scattering?",
            detail: "A type of scattering that occurs when electromagnetic radiation is dispersed by particles that are smaller than the radiation's wavelength.\n• For x << λ → Rayleigh scattering is valid.\n• For x >> λ → Rayleigh scattering is not valid.\nHere, x is the size of the scattering particle."
          },
          {
            id: "s2-rayleigh-sky",
            title: "Blue Colour of Sky",
            detail: "Blue colour of the sky is due to Rayleigh scattering. Blue light (shorter wavelength) is scattered much more than red light by atmospheric molecules."
          },
          {
            id: "s2-rayleigh-danger",
            title: "Danger Signals Are Red",
            detail: "Danger signals are red because red light is scattered the least (longest wavelength in visible spectrum) and as such can be seen from maximum distance."
          }
        ]
      },
      {
        id: "s2-tyndall",
        title: "Tyndall Effect",
        detail: "Scattering of light by colloidal particles. It occurs when particles are roughly the same size as the wavelength of light.",
        children: [
          {
            id: "s2-tyndall-1",
            title: "Example: Light Beam in a Room",
            detail: "A light beam becomes visible due to smoke or dust particles in a room on entering a window."
          },
          {
            id: "s2-tyndall-2",
            title: "Example: Sunlight in a Forest",
            detail: "Sunlight can be seen passing through the canopy of a dense forest due to scattering by tiny water droplets and dust particles."
          },
          {
            id: "s2-tyndall-3",
            title: "Example: Blue Colour of Water",
            detail: "Blue colour of water is due to scattering of light by fine suspended particles in it."
          }
        ]
      }
    ]
  }
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

export default function HumanEyeFlowchart() {
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
            The Human Eye and the Colourful World
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



