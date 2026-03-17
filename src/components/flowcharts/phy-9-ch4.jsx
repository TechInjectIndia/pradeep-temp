"use client";

import { useState, useEffect, createContext, useContext } from "react";

const PINK = "#c0126a";
const ExpandCtx = createContext({ version: 0, mode: "default" });

/* ── DATA ──────────────────────────────────────────────── */
const DATA = [
  {
    id: "s1",
    icon: "🔊",
    page: "4/53–4/54",
    accent: "#c0126a",
    title: "Properties of Sound Waves",
    detail: "Sound is a form of mechanical energy that produces the sensation of hearing. It requires a material medium for propagation.",
    children: [
      {
        id: "s1-nature",
        title: "Nature of Sound",
        detail: "• Sound is produced due to vibration of different objects.\n• Sound requires medium for propagation.\n• Sound waves are longitudinal whereas light waves are transverse waves.\n• As sound propagates, it is the sound energy which travels in the medium and not the medium itself.",
      },
      {
        id: "s1-comp",
        title: "Compression & Rarefaction",
        detail: "• A region of compressed air is called a compression and that of rarefied air is called rarefaction.\n• Portion of medium having larger density than the average value is called a compression or crest.\n• Portion of medium with smaller density than the average value is called rarefaction or trough.",
      },
      {
        id: "s1-amp",
        title: "Amplitude & Oscillation",
        detail: "• Magnitude of maximum disturbance in medium on either side of the mean position is called amplitude.\n• The change in density from maximum to minimum and again maximum value is called an oscillation.",
      },
      {
        id: "s1-freq",
        title: "Frequency (ν) & Wavelength (λ)",
        detail: "• Number of complete oscillations per second is called frequency (ν).\n• Distance between two successive crests or troughs is called wavelength (λ).\n• Relations: ν = 1/T,  v = νλ",
      },
    ],
  },
  {
    id: "s2",
    icon: "🎵",
    page: "4/53",
    accent: "#1565c0",
    title: "Characteristics of Sound",
    subtitle: "Loudness, Pitch & Quality",
    children: [
      {
        id: "s2-loud",
        title: "Loudness or Intensity",
        detail: "• The intensity of sound at any point is defined as the amount of energy passing per unit time per unit area perpendicular to the area. Its unit is W/m².\n• The physiological response of the ear to the intensity of sound is called loudness.\n• It is determined by amplitude of the wave.",
      },
      {
        id: "s2-pitch",
        title: "Pitch",
        detail: "• The physiological sensation which helps in distinguishing between a shrill sound from a dull sound is called pitch.\n• Pitch of sound is determined by its frequency.",
      },
      {
        id: "s2-quality",
        title: "Quality or Timbre",
        detail: "• It is the characteristic of a sound which distinguishes it from other sound of the same pitch and loudness.\n• It is determined by the wave-form of the sound.\n• Loudness, Pitch and Quality are three characteristics of sound.",
        children: [
          {
            id: "s2-quality-tone",
            title: "Tone vs Note",
            detail: "• Sound of single frequency (as in tuning fork) is called a tone.\n• A sound produced due to mixture of sounds is called a note.\n• As the sound produced by tuning fork is of single frequency, it is called a pure note.",
          },
        ],
      },
    ],
  },
  {
    id: "s3",
    icon: "🪞",
    page: "4/53",
    accent: "#2e7d32",
    title: "Reflection of Sound",
    detail: "Like light waves, sound waves are also reflected from a surface on which these fall.",
    children: [
      {
        id: "s3-laws",
        title: "Laws of Reflection of Sound",
        children: [
          {
            id: "s3-laws-1",
            title: "First Law",
            detail: "The angle of reflection (r) is always equal to angle of incidence (i), i.e., r = i.",
          },
          {
            id: "s3-laws-2",
            title: "Second Law",
            detail: "The incident wave, reflected wave and the normal at the point of incidence, all lie in the same plane.",
          },
        ],
      },
    ],
  },
  {
    id: "s4",
    icon: "🏔️",
    page: "4/53",
    accent: "#6a1b9a",
    title: "Echo",
    detail: "The phenomenon of repetition of sound of a source by reflection from an obstacle is called echo.",
    children: [
      {
        id: "s4-persist",
        title: "Persistence of Hearing",
        detail: "The sensation of sound lasts in our brain for 0·1 s. This property is called persistence of hearing.",
      },
      {
        id: "s4-dist",
        title: "Minimum Distance for Echo",
        detail: "For hearing a distinct echo, the minimum distance of the obstacle from the source of sound should be 17·2 m.",
      },
      {
        id: "s4-multi",
        title: "Multiple Echoes",
        detail: "Multiple echoes are heard when sound is repeatedly reflected from a number of obstacles.",
      },
      {
        id: "s4-reverb",
        title: "Reverberation",
        detail: "Reverberation is the phenomenon of persistence or prolongation of sound after the source has stopped emitting the sound.",
      },
    ],
  },
  {
    id: "s5",
    icon: "⚡",
    page: "4/54",
    accent: "#c77000",
    title: "Speed of Sound",
    detail: "Speed of sound varies with the medium:\nv_solid > v_liquid > v_gas\nHowever this is not always valid.",
    children: [
      {
        id: "s5-audible",
        title: "Audible Range",
        detail: "The audible range for human hearing is 20 Hz to 20 kHz.",
      },
      {
        id: "s5-infra",
        title: "Infrasonics",
        detail: "The longitudinal waves of frequency below 20 Hz are called infrasonics.",
      },
      {
        id: "s5-ultra",
        title: "Ultrasonic Waves",
        detail: "The longitudinal waves of frequency greater than 20 kHz are called ultrasonic waves or ultrasounds.",
      },
      {
        id: "s5-apps",
        title: "Applications of Ultrasound",
        detail: "Ultrasound finds applications in:\n(i) Industry\n(ii) Medical science and communication (SONAR)",
      },
    ],
  },
];

/* ── HOOKS ─────────────────────────────────────────────── */
function useSetup() {
  useEffect(() => {
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Merriweather+Sans:wght@700;800;900&display=swap";
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
    return () => {
      document.head.removeChild(font);
      document.head.removeChild(css);
    };
  }, []);
}

/* ── DEPTH STYLES ──────────────────────────────────────── */
const DEPTH_STYLES = [
  (a) => ({
    bg: a, fg: "#fff", fw: 800, fs: 16, radius: 10,
    px: "14px 20px", shadow: `0 4px 16px ${a}44`,
    ff: "'Merriweather Sans',Arial,sans-serif",
  }),
  (a) => ({
    bg: "#fff", fg: a, fw: 700, fs: 14.5, radius: 8,
    px: "10px 16px", border: `2px solid ${a}`, shadow: "0 1px 6px rgba(0,0,0,.07)",
    ff: "'Merriweather Sans',Arial,sans-serif",
  }),
  (a) => ({
    bg: "#fdf3f8", fg: "#111", fw: 600, fs: 14, radius: 7,
    px: "9px 14px", border: `1.5px solid ${a}55`,
    ff: "'EB Garamond',Georgia,serif",
  }),
  () => ({
    bg: "#fff", fg: "#222", fw: 400, fs: 14, radius: 5,
    px: "8px 13px", border: "1px solid #ddd",
    ff: "'EB Garamond',Georgia,serif",
  }),
];

/* ── TREE NODE ─────────────────────────────────────────── */
function TreeNode({ node, depth = 0, accent, isLast = false }) {
  const { mode } = useContext(ExpandCtx);
  const hasKids = !!node.children?.length;
  const [localOpen, setLocalOpen] = useState(depth === 0);
  const open =
    mode === "expand" ? true : mode === "collapse" ? false : localOpen;

  const ds = DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)](accent);

  const arrowStyle = {
    fontSize: 10, minWidth: 14, textAlign: "center", flexShrink: 0,
    color: depth === 0 ? "rgba(255,255,255,.8)" : accent,
    display: "inline-block",
    transform: hasKids && open ? "rotate(90deg)" : "rotate(0deg)",
    transition: "transform .2s",
    marginTop: depth === 0 ? 3 : 2,
    opacity: hasKids ? 1 : 0,
  };

  return (
    <div style={{ position: "relative", marginBottom: depth === 0 ? 22 : depth === 1 ? 8 : 5 }}>
      {depth > 0 && (
        <>
          <div
            style={{
              position: "absolute", left: -21, top: 0,
              height: isLast ? "calc(50% + 1px)" : "100%",
              width: 2, background: `${accent}44`,
            }}
          />
          <div
            style={{
              position: "absolute", left: -21, top: "50%",
              width: 17, height: 2, marginTop: -1, background: `${accent}44`,
            }}
          />
        </>
      )}

      <div
        className="fc-node"
        onClick={() => hasKids && setLocalOpen((o) => !o)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 8,
          background: ds.bg, color: ds.fg,
          fontWeight: ds.fw, fontSize: ds.fs, fontFamily: ds.ff,
          borderRadius: ds.radius, padding: ds.px,
          border: ds.border ?? "none",
          boxShadow: ds.shadow ?? "none",
          cursor: hasKids ? "pointer" : "default",
          userSelect: "none",
        }}
      >
        <span style={arrowStyle}>▶</span>
        <div style={{ flex: 1 }}>
          <div style={{ lineHeight: 1.35 }}>{node.title}</div>
          {node.subtitle && (
            <div
              style={{
                fontSize: "0.8em", fontStyle: "italic",
                opacity: 0.72, fontWeight: 400, marginTop: 2,
              }}
            >
              {node.subtitle}
            </div>
          )}
          {node.detail && (
            <div
              style={{
                fontSize: "0.92em", fontWeight: 400, fontStyle: "normal",
                color: depth === 0 ? "rgba(255,255,255,.92)" : "#1a1a1a",
                marginTop: 6, lineHeight: 1.65, whiteSpace: "pre-line",
                fontFamily: "'EB Garamond',Georgia,serif", letterSpacing: "0.01em",
              }}
            >
              {node.detail}
            </div>
          )}
        </div>
      </div>

      {hasKids && open && (
        <div className="fc-kids" style={{ marginLeft: 28, marginTop: 6 }}>
          {node.children.map((child, i) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              accent={accent}
              isLast={i === node.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── MAIN EXPORT ───────────────────────────────────────── */
export default function SoundFlowchart() {
  useSetup();
  const [ctxVal, setCtxVal] = useState({ version: 0, mode: "default" });

  const expandAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "expand" }));
  const collapseAll = () => setCtxVal((v) => ({ version: v.version + 1, mode: "collapse" }));

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const body = {
    fontFamily: "'EB Garamond',Georgia,serif",
    fontSize: 15, lineHeight: 1.58, color: "#1a1a1a",
  };

  return (
    <ExpandCtx.Provider value={ctxVal}>
      <div style={{ background: "#eae5e9", minHeight: "100vh", ...body }}>
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg,#e8c0d8 0%,#d680b0 40%,#c0126a 100%)",
            padding: "32px 40px 26px", textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block", background: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.4)",
              fontFamily: "'Merriweather Sans',Arial,sans-serif",
              fontWeight: 800, fontSize: 10, letterSpacing: 3,
              color: "#fff", padding: "4px 16px", borderRadius: 3, marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Bird&apos;s-Eye View &nbsp;·&nbsp; Concept Flowchart
          </div>
          <h1
            style={{
              fontFamily: "'Merriweather Sans',Arial,sans-serif", fontSize: 22,
              fontWeight: 900, color: "#fff", margin: "0 0 8px",
              letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.25,
            }}
          >
            SOUND
          </h1>
          <div
            style={{
              color: "rgba(255,255,255,.75)", fontSize: 13,
              fontFamily: "'Merriweather Sans',Arial,sans-serif", letterSpacing: 0.5,
            }}
          >
            Pradeep&apos;s Science : Physics 9th
          </div>
        </div>

        {/* NAV BAR */}
        <div
          style={{
            background: "#fff", borderBottom: "1px solid #e8e8e8",
            padding: "10px 24px", display: "flex", flexWrap: "wrap",
            gap: 7, justifyContent: "center", alignItems: "center",
          }}
        >
          {DATA.map((s) => (
            <button
              key={s.id}
              className="fc-pill"
              onClick={() => scrollTo(s.id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                background: `${s.accent}15`, color: s.accent,
                border: `1.5px solid ${s.accent}55`, borderRadius: 30,
                padding: "4px 13px", fontFamily: "'Merriweather Sans',Arial,sans-serif",
                fontWeight: 700, fontSize: 11.5, letterSpacing: 0.3, cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${s.accent}28`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `${s.accent}15`)}
            >
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <span>{s.title.split(" ").slice(0, 3).join(" ")}</span>
              <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 400 }}>{s.page}</span>
            </button>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
            <button
              className="fc-btn"
              onClick={expandAll}
              style={{
                background: PINK, color: "#fff", border: "none", cursor: "pointer",
                borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}
            >
              Expand All
            </button>
            <button
              className="fc-btn"
              onClick={collapseAll}
              style={{
                background: "#fff", color: PINK, border: `1.5px solid ${PINK}`,
                cursor: "pointer", borderRadius: 6, padding: "5px 13px", fontSize: 12,
                fontFamily: "'Merriweather Sans',Arial,sans-serif", fontWeight: 700,
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* FLOWCHART TREE */}
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "28px 24px 56px" }}>
          {DATA.map((section) => (
            <div key={section.id} id={section.id} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span
                  style={{
                    fontFamily: "'Merriweather Sans',Arial,sans-serif",
                    fontSize: 10.5, fontWeight: 700, letterSpacing: 1.5,
                    color: section.accent, textTransform: "uppercase", opacity: 0.7,
                  }}
                >
                  Page {section.page}
                </span>
                <div style={{ flex: 1, height: 1, background: `${section.accent}25` }} />
              </div>
              <TreeNode node={section} depth={0} accent={section.accent} />
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div
          style={{
            textAlign: "center", padding: "16px 20px",
            borderTop: "1px solid #e8e8e8", background: "#fff",
            fontFamily: "'Merriweather Sans',Arial,sans-serif",
            fontSize: 11, color: "#bbb", letterSpacing: 1.5, textTransform: "uppercase",
          }}
        >
          Pradeep&apos;s Publications
        </div>
      </div>
    </ExpandCtx.Provider>
  );
}
