import Bio9Ch1 from "@/components/flowcharts/bio-9-ch1";
import Bio9Ch2 from "@/components/flowcharts/bio-9-ch2";
import Bio9Ch3 from "@/components/flowcharts/bio-9-ch3";
import Bio9Ch4 from "@/components/flowcharts/bio-9-ch4";

import Bio10Ch1 from "@/components/flowcharts/bio-10-ch1";
import Bio10Ch2 from "@/components/flowcharts/bio-10-ch2";
import Bio10Ch3 from "@/components/flowcharts/bio-10-ch3";
import Bio10Ch4 from "@/components/flowcharts/bio-10-ch4";
import Bio10Ch5 from "@/components/flowcharts/bio-10-ch5";

import Chem9Ch1 from "@/components/flowcharts/chem-9-ch1";
import Chem9Ch2 from "@/components/flowcharts/chem-9-ch2";
import Chem9Ch3 from "@/components/flowcharts/chem-9-ch3";

import Chem10Ch1 from "@/components/flowcharts/chem-10-ch1";
import Chem10Ch2 from "@/components/flowcharts/chem-10-ch2";
import Chem10Ch3 from "@/components/flowcharts/chem-10-ch3";
import Chem10Ch4 from "@/components/flowcharts/chem-10-ch4";

import Phy9Ch2 from "@/components/flowcharts/phy-9-ch2";
import Phy9Ch3 from "@/components/flowcharts/phy-9-ch3";
import Phy9Ch4 from "@/components/flowcharts/phy-9-ch4";
import Phy9Ch5 from "@/components/flowcharts/phy-9-ch5";

import Physics9Ch1 from "@/components/flowcharts/physics-9-ch1";
import Physics10Ch1 from "@/components/flowcharts/physics-10-ch1";
import Physics10Ch2 from "@/components/flowcharts/physics-10-ch2";
import Physics10Ch3 from "@/components/flowcharts/physics-10-ch3";
import Physics10Ch4 from "@/components/flowcharts/physics-10-ch4";

const CHAPTER_TO_COMPONENT = {
  "bio-9-ch1": Bio9Ch1,
  "bio-9-ch2": Bio9Ch2,
  "bio-9-ch3": Bio9Ch3,
  "bio-9-ch4": Bio9Ch4,

  "bio-10-ch1": Bio10Ch1,
  "bio-10-ch2": Bio10Ch2,
  "bio-10-ch3": Bio10Ch3,
  "bio-10-ch4": Bio10Ch4,
  "bio-10-ch5": Bio10Ch5,

  "chem-9-ch1": Chem9Ch1,
  "chem-9-ch2": Chem9Ch2,
  "chem-9-ch3": Chem9Ch3,

  "chem-10-ch1": Chem10Ch1,
  "chem-10-ch2": Chem10Ch2,
  "chem-10-ch3": Chem10Ch3,
  "chem-10-ch4": Chem10Ch4,

  "phy-9-ch2": Phy9Ch2,
  "phy-9-ch3": Phy9Ch3,
  "phy-9-ch4": Phy9Ch4,
  "phy-9-ch5": Phy9Ch5,

  "physics-9-ch1": Physics9Ch1,
  "physics-10-ch1": Physics10Ch1,
  "physics-10-ch2": Physics10Ch2,
  "physics-10-ch3": Physics10Ch3,
  "physics-10-ch4": Physics10Ch4,
} as const;

export default async function ChapterPage({
  params,
}: {
  // Next.js may provide `params` as a Promise in this setup.
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;

  const ChapterComponent = (CHAPTER_TO_COMPONENT as Record<string, unknown>)[
    chapter
  ] as React.ComponentType | undefined;

  if (!ChapterComponent) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Invalid content</h1>
        <p>
          Unknown chapter: <code>{chapter}</code>
        </p>
      </div>
    );
  }

  // ChapterComponent is a client component, but it's safe to render from a server page.
  return <ChapterComponent />;
}

