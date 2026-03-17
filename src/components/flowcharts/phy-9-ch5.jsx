"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

const DATA = [
  {
    id: "s1",
    icon: "☀️",
    page: "5/51",
    accent: "#c0126a",
    title: "Atmosphere and Solar Energy",
    detail: "The envelope of gases surrounding the Earth and the energy it receives from the Sun govern weather, climate, and life itself.",
    children: [
      {
        id: "s1-structure",
        title: "Structure of Atmosphere",
        detail: "Earth's atmosphere is divided into five distinct layers based on temperature variation with altitude.",
        children: [
          {
            id: "s1-tropo",
            title: "Troposphere",
            detail: "The lowest and most dense layer, extending from the Earth's surface to about 13 km upwards. This is where all weather phenomena occur."
          },
          {
            id: "s1-strato",
            title: "Stratosphere",
            detail: "Extended from 13 km to 50 km. It contains the ozone layer which absorbs harmful UV radiation, protecting life on Earth."
          },
          {
            id: "s1-meso",
            title: "Mesosphere",
            detail: "Extended from 50 km to 85 km above the Earth's surface."
          },
          {
            id: "s1-thermo",
            title: "Thermosphere",
            detail: "Extended from 85 km to 500–1000 km. High energy X-rays and UV rays are absorbed in this layer."
          },
          {
            id: "s1-exo",
            title: "Exosphere",
            detail: "The outermost layer, lies above the thermosphere. Very little is known about the exosphere."
          }
        ]
      },
      {
        id: "s1-solar",
        title: "Solar Energy",
        detail: "Energy received from the Sun in the form of radiations is called Solar energy.",
        children: [
          {
            id: "s1-emspec",
            title: "Electromagnetic Spectrum",
            detail: "The entire range of radiation according to wavelength, frequency, or energy is called the electromagnetic spectrum."
          },
          {
            id: "s1-uv",
            title: "UV Radiation and Ozone",
            detail: "In the Earth's atmosphere, UV radiations are absorbed by the ozone layer which protects living organisms on Earth."
          },
          {
            id: "s1-insol",
            title: "Insolation",
            detail: "The energy received by the Earth is known as insolation. The incoming solar radiation which in short is termed as insolation."
          }
        ]
      },
      {
        id: "s1-blue",
        title: "Blue Colour of Sky",
        detail: "Short-waves (blue and violet) are scattered by molecules in the atmosphere much more than other colours of the spectrum. This is why blue and violet light reaches our eyes from all directions on a clear day. Since our eyes are less sensitive to violet colour, the sky appears blue."
      }
    ]
  },
  {
    id: "s2",
    icon: "🌍",
    page: "5/51",
    accent: "#1565c0",
    title: "Earth as a System: Energy, Matter and Life",
    detail: "The Earth functions as an integrated system where energy transfer, matter cycling, and living organisms interact continuously.",
    children: [
      {
        id: "s2-heating",
        title: "Heating of the Atmosphere",
        detail: "The process of vertical heating of the atmosphere is known as convection.\nHorizontal movement of air also causes heat transfer. Such energy transfer due to horizontal air movement is called advection.",
        children: [
          {
            id: "s2-terrestrial",
            title: "Terrestrial Radiation",
            detail: "The long-wavelength infrared radiation emitted from the Earth's surface back into the atmosphere (short-wave) after it has been warmed by the Sun is called terrestrial radiation."
          },
          {
            id: "s2-budget",
            title: "Heat Budget",
            detail: "The balance of incoming and outgoing heat radiations on Earth is referred to as its heat budget."
          }
        ]
      },
      {
        id: "s2-breeze",
        title: "Sea Breeze and Land Breeze",
        children: [
          {
            id: "s2-sea",
            title: "Sea Breeze (Daytime)",
            detail: "During the day, the Sun heats up the land faster than it heats the water. Therefore, over the land the air rises giving rise to a low-pressure area, whereas the pressure over sea is relatively cool and high. The pressure gradient from sea to land is created — this is called a sea breeze."
          },
          {
            id: "s2-land",
            title: "Land Breeze (Night)",
            detail: "The opposite occurs at night, when the land cools more quickly than the ocean. Now the ocean is warmer than the land, so air rises over the water and sinks over the land, creating a wind blowing from land towards the water. This is a land breeze, which blows at night and into the early morning."
          }
        ]
      },
      {
        id: "s2-spheres",
        title: "Four Spheres of Earth",
        detail: "Earth is composed of four interconnected spheres. These four spheres are not isolated — they are in a complex, delicately connected web of interactions with each other.",
        children: [
          {
            id: "s2-geo",
            title: "Geosphere",
            detail: "The rocks and molten core of Earth, also called lithosphere."
          },
          {
            id: "s2-hydro",
            title: "Hydrosphere",
            detail: "The water as found in the oceans, air, lakes, rivers, and underground."
          },
          {
            id: "s2-atmo",
            title: "Atmosphere",
            detail: "The various gases that form the air around Earth."
          },
          {
            id: "s2-bio",
            title: "Biosphere",
            detail: "All living organisms on Earth. Plants (biosphere) take in CO₂ from the air (atmosphere) and release oxygen. This web of connections is what makes Earth a living, breathing planet."
          }
        ]
      }
    ]
  },
  {
    id: "s3",
    icon: "🏠",
    page: "5/51",
    accent: "#2e7d32",
    title: "Green House Effect",
    detail: "In the greenhouse effect, short-wave solar radiation passes through the atmosphere and reaches the Earth's surface where it gets absorbed. When the radiation is re-emitted by the Earth, it is now in the form of long wavelength infrared radiation, which does not easily pass through the atmosphere. Instead, this infrared radiation is absorbed by atmospheric gases such as CO₂, methane, and water vapour. As a result, the atmosphere heats up.",
    children: [
      {
        id: "s3-diff",
        title: "Differential Warming of Earth",
        detail: "Consider a flat surface — each part of the flat surface on top of it will receive exactly same amount of incoming radiation. Since the Earth is a sphere, sunlight is not equally distributed over the Earth's surface. As a result, different regions of Earth will be heated to different degrees. This is called as differential heating or warming of the Earth."
      },
      {
        id: "s3-albedo",
        title: "Albedo",
        detail: "The albedo refers to reflectivity of a surface.\n\nAlbedo = Solar radiation reflected ÷ Solar radiation absorbed or incident"
      }
    ]
  },
  {
    id: "s4",
    icon: "🔄",
    page: "5/52",
    accent: "#c77000",
    title: "Biogeochemical Processes",
    detail: "Biogeochemical processes are the natural pathways through which essential chemical elements — such as water, carbon, nitrogen, oxygen, and phosphorus — circulate between living organisms (biotic) and the non-living environment (abiotic), including the atmosphere, hydrosphere, and geosphere. These are fundamental cycles in sustaining life on planet Earth by ensuring that matter is recycled and reused rather than being lost to the system.",
    children: [
      {
        id: "s4-water",
        title: "Water (H₂O) Cycle",
        detail: "It is the foundation for all life. The water cycle moves water from the surface to the atmosphere, over land, and back to oceans, making it available for all living things."
      },
      {
        id: "s4-carbon",
        title: "Carbon (C) Cycle",
        detail: "The primary building block of organic molecules, including carbohydrates, proteins, and fats. Carbon is found in the atmosphere, oceans, rocks, and all living organisms."
      },
      {
        id: "s4-nitrogen",
        title: "Nitrogen (N) Cycle",
        detail: "A crucial component of DNA, proteins, and nucleic acids (Deoxyribonucleic acid). While our atmosphere is nearly 80% nitrogen gas, most organisms cannot use it in that form. The nitrogen cycle converts it into usable forms."
      },
      {
        id: "s4-oxygen",
        title: "Oxygen (O) Cycle",
        detail: "Essential for respiration, the process most living things use to get energy from food. It cycles between the atmosphere and living organisms."
      }
    ]
  },
  {
    id: "s5",
    icon: "🌧️",
    page: "5/52",
    accent: "#6a1b9a",
    title: "Acid Rain",
    detail: "Rapid industrialization and excessive use of vehicles has given rise to the emission of gases such as carbon dioxide (CO₂), nitrogen dioxide (NO₂), nitric oxide (NO), sulfur dioxide (SO₂), and carbon monoxide (CO) etc.",
    children: [
      {
        id: "s5-form",
        title: "Formation of Acid Rain",
        detail: "When SO₂ reacts with water to form sulfuric acid (H₂SO₄) and NOₓ form nitric acid (HNO₃), these acids become a part of rain. Any form of precipitation with high levels of nitric acid and sulfuric acid is termed acid rain."
      },
      {
        id: "s5-effects",
        title: "Effects of Acid Rain",
        detail: "Acid rain damages buildings, corrodes metal structures, harms aquatic ecosystems, and degrades soils and vegetation."
      }
    ]
  },
  {
    id: "s6",
    icon: "🌡️",
    page: "5/52",
    accent: "#00695c",
    title: "Global Warming",
    detail: "Global warming is the long-term rise in the average temperature of Earth's climate system. Human activities, such as the burning of fossil fuels (coal, oil, gas) release CO₂ into the atmosphere. This process causes severe environmental impacts, including melting of ice caps, rising sea levels, and extreme weather."
  },
  {
    id: "s7",
    icon: "🏭",
    page: "5/52",
    accent: "#b71c1c",
    title: "Human Impact on Earth",
    detail: "Human activities have altered Earth's systems and their interactions, leading to global environmental changes such as climate change, land-use change, and biodiversity loss.",
    children: [
      {
        id: "s7-uhi",
        title: "Urban Heat Island",
        detail: "An Urban Heat Island is a phenomenon where urban areas experience higher temperature than their surrounding rural counter parts. This temperature difference occurs because cities replace natural landscapes with surfaces or buildings that absorb and retain more heat."
      },
      {
        id: "s7-runoff",
        title: "Agricultural Runoff",
        detail: "Agricultural runoff is the water from rainfall that absorbs and retains more heat, and flows over land (snowmelt or irrigation) instead of soaking into the ground."
      },
      {
        id: "s7-haze",
        title: "Haze, Fog and Smog",
        children: [
          {
            id: "s7-haze-def",
            title: "Haze",
            detail: "The atmospheric phenomenon caused by dry particles rather than water droplets. It occurs when light reflects from these particles, reducing the clarity of the sky."
          },
          {
            id: "s7-fog-def",
            title: "Fog",
            detail: "Fog is defined as obscurity in the surface layers of the atmosphere, which is caused by suspension of water vapors in polluted air."
          },
          {
            id: "s7-smog-def",
            title: "Smog",
            detail: "Smog is a form of severe air pollution. It is a combination of fog, smoke, nitrogen oxides, sulfur dioxides, and particulate matter."
          }
        ]
      }
    ]
  },
  {
    id: "s8",
    icon: "🌱",
    page: "5/52",
    accent: "#4a148c",
    title: "Creating a Positive Impact on the Environment",
    detail: "We can make choices that benefit the planet and help sustain Earth's ecosystems for future generations.",
    children: [
      {
        id: "s8-recycle",
        title: "Recycling and Conservation",
        detail: "Processes like recycling, establishing wildlife preserves, and parks can create a positive impact on the ecosystem."
      },
      {
        id: "s8-transport",
        title: "Reducing Emissions",
        detail: "Reducing the usage of automobiles, switching to public transports can help reduce the emission of harmful gases in the atmosphere."
      },
      {
        id: "s8-plant",
        title: "Planting Trees and Sustainable Living",
        detail: "Planting trees, and consuming less meat can also leave a positive impact on the ecosystem."
      }
    ]
  }
];

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

export default function EarthAsASystemFlowchart() {
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
            Earth as a System : Energy, Matter and Life
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Physics 9th
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
              <span style={{ fontSize:14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0,3).join(" ")}</span>
              <span style={{ fontSize:10, opacity:.6, fontWeight:400 }}>{s.page}</span>
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
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontFamily:"'Merriweather Sans',Arial,sans-serif",
                  fontSize:10.5, fontWeight:700, letterSpacing:1.5,
                  color:section.accent, textTransform:"uppercase", opacity:.7 }}>
                  Page {section.page}
                </span>
                <div style={{ flex:1, height:1, background:`${section.accent}25` }} />
              </div>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ textAlign:"center", padding:"16px 20px",
          borderTop:"1px solid #e8e8e8", background:"#fff",
          fontFamily:"'Merriweather Sans',Arial,sans-serif",
          fontSize:11, color:"#bbb", letterSpacing:1.5, textTransform:"uppercase" }}>
          Pradeep&apos;s Publications
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
