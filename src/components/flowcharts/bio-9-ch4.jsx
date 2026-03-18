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

/* ─────────────── DATA ─────────────── */

const DATA = [
  {
    id: "s1",
    accent: "#c0126a",
    title: "Biodiversity and Classification",
    detail: "• Diversity means a variety of life forms found in a particular region.\n• At present, approximately 1.7 to 1.8 million types of living organisms are known to us.",
    children: [
      {
        id: "s1-classif",
        title: "Classification of Living Organisms",
        detail: "It is a system of arrangement of organisms into different groups and sub-groups on the basis of their similarities, differences and relationship.",
        children: [
          {
            id: "s1-artificial",
            title: "Artificial Classification",
            detail: "It is based on one or few arbitrarily chosen criteria such as habitat or major habits of organisms."
          },
          {
            id: "s1-natural",
            title: "Natural Classification",
            detail: "It involves categorization of living organisms into broad groups on the basis of larger number of their characters (similarities and dissimilarities)."
          },
          {
            id: "s1-phylogenetic",
            title: "Phylogenetic Classification",
            detail: "It is based on larger number of characteristics and also their evolutionary relationships."
          }
        ]
      },
      {
        id: "s1-hierarchy",
        title: "Hierarchy of Classification Groups",
        detail: "In classification, closely resembling organisms are placed in a group. These groups are further placed in larger groups on the basis of close similarities. The larger groups are again placed in still larger groups.\n• The various grouping levels are called categories.\n• There are 7 major categories.",
        children: [
          {
            id: "s1-h-species",
            title: "1. Species",
            detail: "Lowest category and regarded as basic unit of classification."
          },
          {
            id: "s1-h-genus",
            title: "2. Genus",
            detail: "It is a group of closely resembling species having a common ancestry."
          },
          {
            id: "s1-h-family",
            title: "3. Family",
            detail: "It represents a larger group of closely related genera."
          },
          {
            id: "s1-h-order",
            title: "4. Order",
            detail: "It is a group of closely related families."
          },
          {
            id: "s1-h-class",
            title: "5. Class",
            detail: "It is a group of related orders."
          },
          {
            id: "s1-h-phylum",
            title: "6. Phylum / Division",
            detail: "Phylum (in animals) and Division (in plants) is a group of related classes."
          },
          {
            id: "s1-h-kingdom",
            title: "7. Kingdom",
            detail: "It is the highest category in biological classification. It is a group of Phyla or Divisions.\n• Various categories can be arranged in a hierarchy.\n• It was introduced by Linnaeus as below:\nKingdom → Phylum/Division → Class → Order → Family → Genus → Species"
          }
        ]
      }
    ]
  },
  {
    id: "s2",
    accent: "#1565c0",
    title: "Different Ways of Expressing Biodiversity",
    detail: "Biodiversity can be expressed in four different ways:",
    children: [
      {
        id: "s2-genetic",
        title: "1. Genetic Variability within a Species",
        detail: "It includes differences in body size, colour etc., expressed due to genetic differences."
      },
      {
        id: "s2-population",
        title: "2. Diversity of Population of a Species",
        detail: "It is measured in terms of number of individuals within a local group and distribution of species in geographic range."
      },
      {
        id: "s2-species",
        title: "3. Diversity of Species within a Natural Community",
        detail: "It includes variety of different species in a particular habitat."
      },
      {
        id: "s2-ecosystem",
        title: "4. Ecosystem Diversity",
        detail: "Diversity of organisms at the level of community and ecosystem has three perspectives:"
      },
      {
        id: "s2-abg",
        title: "Alpha, Beta, and Gamma Diversity",
        children: [
          {
            id: "s2-alpha",
            title: "Alpha Diversity",
            detail: "Refers to the diversity of organisms sharing the same habitat."
          },
          {
            id: "s2-beta",
            title: "Beta Diversity",
            detail: "Refers to rate of turnover while moving from one habitat to another within a given geographical area."
          },
          {
            id: "s2-gamma",
            title: "Gamma Diversity",
            detail: "Refers to the rate of turnover between similar habitats in different geographical areas."
          }
        ]
      }
    ]
  },
  {
    id: "s3",
    accent: "#2e7d32",
    title: "Classification Systems of Living Organisms",
    children: [
      {
        id: "s3-two",
        title: "Two-Kingdom Classification",
        detail: "Given by Carolus Linnaeus (1758).\n• Living organisms were divided into two separate kingdoms:",
        children: [
          {
            id: "s3-two-plantae",
            title: "1. Plantae (Plant Kingdom)",
            detail: "It included all plants, bacteria and fungi."
          },
          {
            id: "s3-two-animalia",
            title: "2. Animalia (Animal Kingdom)",
            detail: "It included all animals."
          }
        ]
      },
      {
        id: "s3-five",
        title: "Five-Kingdom Classification",
        detail: "R.H. Whittaker (1969) gave this classification based on 4 factors:\n1. Complexity of cell structure\n2. Body organization\n3. Mode and Source of Nutrition\n4. Phylogenetic Relationship",
        children: [
          {
            id: "s3-five-monera",
            title: "Kingdom Monera (Prokaryotes)",
            detail: "These include true bacteria, actinomycetes, cyanobacteria, mycoplasma, Archaebacteria."
          },
          {
            id: "s3-five-protista",
            title: "Kingdom Protista (Unicellular Eukaryotes)",
            detail: "These include the Protistan Algae, Slime moulds, and Protozoa."
          },
          {
            id: "s3-five-fungi",
            title: "Kingdom Fungi",
            detail: "Non-Green and do not perform photosynthesis.\n• These include yeast, Rhizopus, Penicillium, Agaricus, and Aspergillus."
          },
          {
            id: "s3-five-plantae",
            title: "Kingdom Plantae",
            detail: "Green and perform Photosynthesis.\n• These include 5 divisions."
          },
          {
            id: "s3-five-animalia",
            title: "Kingdom Animalia",
            detail: "Multicellular organisms without cell wall."
          }
        ]
      },
      {
        id: "s3-three",
        title: "Three-Kingdom Classification (Three-Domain System)",
        subtitle: "Based on Molecular basis",
        detail: "Proposed by Carl Woese, Otto Kandler and Mark Wheelis in 1990.\n• It uses differences in ribosomal RNA sequences, cell membrane lipid structure, and sensitivity to antibiotics to divide all cellular life into 3 primary evolutionary domains.",
        children: [
          {
            id: "s3-three-archaea",
            title: "1. Archaea",
            detail: "Single-celled prokaryotes."
          },
          {
            id: "s3-three-bacteria",
            title: "2. Bacteria",
            detail: "Single-celled prokaryotes."
          },
          {
            id: "s3-three-eukarya",
            title: "3. Eukarya",
            detail: "These contain eukaryotes.\nIt is further divided into:\n• Protista\n• Fungi\n• Plantae\n• Animalia"
          }
        ]
      }
    ]
  },
  {
    id: "s4",
    accent: "#00695c",
    title: "Plant Kingdom",
    children: [
      {
        id: "s4-thallo",
        title: "Thallophyta",
        detail: "• Plants are commonly called algae (sea weeds).\n• Includes primitive simple plants which are not differentiated into true roots, true stems and true leaves.\n• They have thallus.\n• Occur both in marine and freshwater habitats.\n• Examples: Unicellular (Chlamydomonas, Chlorella), filamentous unbranched (Spirogyra, Ulothrix), filamentous branched (Chara), and foliaceous (Laminaria, Ulva)."
      },
      {
        id: "s4-bryo",
        title: "Bryophyta",
        detail: "• It includes the simplest and most primitive non-vascular land plants.\n• These require water at every step in the life cycle, and thus are called amphibians of the plant kingdom.\n• Main body is gametophyte (haploid body).\n• Plants are fixed by means of Rhizoids.\n• Sex organs are multicellular — antheridia (male) and archegonia (female). Embryo is formed upon fertilization.\n• Examples: Liverworts and mosses."
      },
      {
        id: "s4-pterido",
        title: "Pteridophyta",
        detail: "• These include first vascular plants.\n• Plants are sporophytes (diploid) and are made up of true roots, true stem and true leaves.\n• All plants possess vascular tissues (xylem and phloem).\n• Reproduction occurs by spores (homosporous or heterosporous).\n• Sex organs are multicellular and jacketed.\n• Fertilized egg develops into embryo.\n• Examples: Lycopodium, Adiantum, Selaginella."
      },
      {
        id: "s4-gymno",
        title: "Gymnosperms",
        detail: "• These are called seed plants having naked seeds and the sporophylls are aggregated to form cones.\n• Plants are vascular, usually perennial, evergreen and woody.\n• Male and female cones are separate.\n• Male spores are called microspores formed in microsporangia.\n• Female egg is formed inside the ovule. The ovules are not enclosed in ovaries.\n• Examples: Cycas, Pinus, Araucaria."
      },
      {
        id: "s4-angio",
        title: "Angiosperms",
        detail: "• These include flowering plants in which seeds are enclosed in fruits.\n• The flowers bear stamen and carpels.\n• Stamen are male reproductive organs which form pollen grains. The carpels are female reproductive organs which bear ovules.\n• After fertilization, ovules develop into seeds and ovary develops into fruit.\n• Seeds enclose embryo. The embryo has plumule (future shoot), radicle (future root) and cotyledons (seed leaves).",
        children: [
          {
            id: "s4-angio-mono",
            title: "Monocots",
            detail: "Examples: wheat, rice, maize."
          },
          {
            id: "s4-angio-dicot",
            title: "Dicots",
            detail: "Examples: pea, gram."
          }
        ]
      }
    ]
  },
  {
    id: "s5",
    accent: "#c77000",
    title: "Animal Kingdom",
    children: [
      {
        id: "s5-porifera",
        title: "Phylum Porifera",
        detail: "• It includes sponges.\n• Mostly marine, only one group lives in freshwater.\n• Mostly sessile and attached to substratum.\n• Body bears pores (Ostia).\n• Canal system is present.\n• Skeleton has spicules.\n• Examples: Euplectella, Sycon, Euspongia."
      },
      {
        id: "s5-coelenterata",
        title: "Phylum Coelenterata",
        detail: "• It includes aquatic animals (both fresh water and marine).\n• Animals have usually radial symmetry.\n• Body encloses single cavity with single aperture, the mouth. It bears tentacles.\n• Body wall has special cnidoblasts for offence and defence.\n• Reproduction is usually asexual or sexual.\n• Body supported by horny or calcareous skeleton. Hard skeleton occur in corals.\n• Examples: Hydra, Obelia, Sea Anemone, Corals, Jelly fish."
      },
      {
        id: "s5-platy",
        title: "Phylum Platyhelminthes",
        detail: "• It includes bilaterally symmetrical flat worms.\n• Body is soft, leaf-like or ribbon-like without segmentation.\n• Most animals are parasites. Few are free-living.\n• Parasitic forms attach to the host by suckers and hooks.\n• These are triploblastic.\n• No body cavity or coelom.\n• Excretory organs called flame cells.\n• Examples: Planaria, Liver fluke, Tapeworm."
      },
      {
        id: "s5-nematoda",
        title: "Phylum Nematoda",
        detail: "• Body is cylindrical or flattened, bilaterally symmetrical and unsegmented.\n• Triploblastic and body wall is covered with tough cuticle.\n• Cilia are absent.\n• Pseudocoelom is present.\n• Straight alimentary canal with mouth and anus.\n• Animals are generally parasitic.\n• Examples: Ascaris, pinworm, hookworm, filarial worm."
      },
      {
        id: "s5-annelida",
        title: "Phylum Annelida",
        detail: "• It includes segmented worms. Body is soft, bilaterally symmetrical and has metameric segmentation.\n• Body is externally divided into segment by annuli.\n• Body bears lateral paired parapodia, chitinous setae.\n• True coelom is present.\n• Excretory system has metanephridia.\n• Nervous system includes nerve ring and a double nerve cord with ganglia.\n• Sexual reproduction occurs.\n• Examples: Earthworm, sandworm, cattle leech."
      },
      {
        id: "s5-arthropoda",
        title: "Phylum Arthropoda",
        subtitle: "Largest phylum in Animal Kingdom",
        detail: "• Includes marine, gregarious, slow moving, free-living animals.\n• Shape may be star-like, disc-like, cylindrical, flower-like, melon-like.\n• Unsegmented animals having radial symmetry in adults and bilateral in larvae.\n• Head is lacking.\n• True coelom is present.\n• Tube-feet have developed for locomotion.\n• Water filled vascular system with tube feet is characteristic feature of these animals.\n• Sexes are separate.\n• Examples: Starfish, brittle star, sea urchin, sand dollar, sea cucumber etc."
      },
      {
        id: "s5-mollusca",
        title: "Phylum Mollusca",
        detail: "Second largest phylum. Contd…"
      },
      {
        id: "s5-echino",
        title: "Phylum Echinodermata",
        detail: "• Includes marine, gregarious, slow moving, free-living animals.\n• Shape may be star-like, disc-like, cylindrical, flower-like, melon-like.\n• Unsegmented animals having radial symmetry in adults and bilateral in larvae.\n• Head is lacking.\n• True coelom is present.\n• Tube-feet have developed for locomotion.\n• Water filled vascular system with tube feet is characteristic feature.\n• Sexes are separate.\n• Examples: Starfish, brittle star, sea urchin, sand dollar, sea cucumber etc."
      },
      {
        id: "s5-chordata",
        title: "Phylum Chordata",
        detail: "Animals with notochord (a flexible rod-like structure).",
        children: [
          {
            id: "s5-chordata-notochord",
            title: "Notochord Classification",
            children: [
              {
                id: "s5-ch-absent",
                title: "Notochord Absent → Echinodermata"
              },
              {
                id: "s5-ch-present",
                title: "Notochord Present → Chordata"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "s6",
    accent: "#6a1b9a",
    title: "Sub-Phylum Vertebrata — Five Classes",
    children: [
      {
        id: "s6-pisces",
        title: "Class: Pisces",
        detail: "• Animals are commonly called fishes and exclusively live in water.\n• Skin is covered with scales.\n• Body has head, trunk and a muscular tail.\n• Tail and fins help them to swim in water.\n• Fishes are cold-blooded animals having 2-chambered heart (auricle and ventricle).\n• They breathe through gills.\n• They are egg-laying animals.",
        children: [
          {
            id: "s6-pisces-cyclo",
            title: "1. Cyclostomata",
            detail: "These are round-mouthed fishes (e.g., hag fish and lampreys)."
          },
          {
            id: "s6-pisces-chondri",
            title: "2. Chondrichthyes",
            detail: "These include cartilaginous fishes (e.g., Indian shark, sting ray, electric ray)."
          },
          {
            id: "s6-pisces-ostei",
            title: "3. Osteichthyes",
            detail: "These include bony fishes (e.g., Rohu, Sea horse, Catla, Tuna etc.)."
          }
        ]
      },
      {
        id: "s6-amphibia",
        title: "Class: Amphibia",
        detail: "• These animals live both on land and in water (called amphibians).\n• Body varies in form.\n• Skin is smooth, moist, rich in mucous and poison glands.\n• Scales are mostly absent.\n• Two pairs of pentadactyle limbs are present, each has 4–5 or fewer digits.\n• Respiration takes place by gills, lungs, lining of bucco-pharyngeal cavity and skin.\n• Heart is 3-chambered (two auricles and a ventricle).\n• Examples: Common Indian frog, toad, tree frog, mud puppy, spotted salamander, Himalayan salamander."
      },
      {
        id: "s6-reptilia",
        title: "Class: Reptilia",
        detail: "• These are the first vertebrates fully adapted for life on dry land.\n• These are cold-blooded animals.\n• Mostly terrestrial, some are aquatic but return to land for breeding.\n• Body varies in form, covered by horny epidermal scales.\n• Two pairs of pentadactyle limbs are present, each with 5 digits bearing horny claws (Limbs are absent in snakes and some lizards).\n• Teeth are present in all reptiles (except tortoises and turtles).\n• Respiration by lungs.\n• Heart is 3-chambered (two atricles and partly divided ventricle).\n• These lay eggs.\n• Examples: Wall lizard, garden lizard, cobra, tortoise, turtle, crocodile, gharial etc."
      },
      {
        id: "s6-aves",
        title: "Class: Aves",
        detail: "• It includes birds, range in size from the smallest humming bird to the largest ostrich.\n• Pair of fore-limbs modified into wings for flight. Pair of hind limbs alone support the body.\n• Body is covered with feathers.\n• Endoskeleton is bony but light.\n• Mouth is surrounded by beak.\n• Respiration by lungs.\n• Heart is 4-chambered (two auricles and two ventricles).\n• These are warm-blooded animals.\n• Lay shelled eggs.\n• Examples: Pigeon, Crow, Mynah, Kite, Peacock, Sparrow, Ostrich etc."
      },
      {
        id: "s6-mammalia",
        title: "Class: Mammalia",
        detail: "• These are primarily terrestrial, warm-blooded animals.\n• Body divided into head, neck, trunk and tail.\n• Two pairs of pentadactyle limbs present.\n• Skin covered with hairs or fur.\n• Respiration by lungs.\n• Heart is 4-chambered (two auricles and two ventricles).\n• Mostly viviparous (exception: egg-laying mammals — Platypus, Echidna).\n• Mammary glands present to feed young ones.\n• Examples: Kangaroo, humans, monkeys, Gorilla, Bat, Rat, Rabbit, Cow, Goat, Pig etc."
      }
    ]
  },
  {
    id: "s7",
    accent: "#b71c1c",
    title: "Nomenclature",
    detail: "Naming a correct scientific name to an organism or a taxon is called nomenclature.",
    children: [
      {
        id: "s7-binomial",
        title: "Binomial Nomenclature",
        detail: "• It was proposed and established by Carolus Linnaeus in 1753.\n• He is considered as father of taxonomy.\n• According to binomial nomenclature, scientific name of an organism has two components — first one designates the genus and the second one designates the species.\n• For example, human is designated as Homo sapiens.\n• It is internationally accepted and is guided by set of rules stated in the International Code of Nomenclature."
      }
    ]
  },
  {
    id: "s8",
    accent: "#4a148c",
    title: "Viruses",
    detail: "• Viruses are nucleoproteins, having nucleic acid molecule (DNA or RNA) enveloped in a protective protein coat.\n• These are considered a \"link between living and non-living\" because they are inert outside a host but use host cell machinery to replicate inside.",
    children: [
      {
        id: "s8-origin",
        title: "Origin and Evolution of Viruses",
        detail: "Three main hypotheses are proposed:\n1. The regressive hypothesis\n2. The cellular origin hypothesis\n3. The co-evolution hypothesis"
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

export default function BiodiversityClassificationFlowchart() {
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
            Biodiversity and Classification
          </h1>
          <div style={{ color:"rgba(255,255,255,.75)", fontSize:13,
            fontFamily:"'Merriweather Sans',Arial,sans-serif", letterSpacing:.5 }}>
            Pradeep&apos;s Science : Biology 9th — Chapter 4
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

