import type React from "react";
import { notFound } from "next/navigation";

import Bio9Ch1Content from "@/components/content/chapters/bio-9-ch1";
import Bio9Ch1PreviewContent from "@/components/content/preview-chapters/bio-9-ch1";
import Bio9Ch2Content from "@/components/content/chapters/bio-9-ch2";
import Bio9Ch3Content from "@/components/content/chapters/bio-9-ch3";
import Bio9Ch4Content from "@/components/content/chapters/bio-9-ch4";
import Chem9Ch1Content from "@/components/content/chapters/chem-9-ch1";
import Chem9Ch1PreviewContent from "@/components/content/preview-chapters/chem-9-ch1";
import Chem9Ch2Content from "@/components/content/chapters/chem-9-ch2";
import Chem9Ch3Content from "@/components/content/chapters/chem-9-ch3";
import Phy9Ch1Content from "@/components/content/chapters/phy-9-ch1";
import Phy9Ch1PreviewContent from "@/components/content/preview-chapters/phy-9-ch1";
import Phy9Ch2Content from "@/components/content/chapters/phy-9-ch2";
import Phy9Ch3Content from "@/components/content/chapters/phy-9-ch3";
import Phy9Ch4Content from "@/components/content/chapters/phy-9-ch4";
import Phy9Ch5Content from "@/components/content/chapters/phy-9-ch5";
import Pj2Ch1Content from "@/components/content/chapters/pj2-ch1";
import Pj2Ch1TheoryContent from "@/components/content/chapters/pj2-ch1-theory";
import Phys12Ch1AppboosterL1Content from "@/components/content/chapters/phys12-ch1-appbooster-l1";
import Phys12Ch1AppboosterL2Content from "@/components/content/chapters/phys12-ch1-appbooster-l2";
import Pj2Ch1AppboosterL1Content from "@/components/content/chapters/pj2-ch1-appbooster-l1";
import Pj2Ch1AppboosterL2Content from "@/components/content/chapters/pj2-ch1-appbooster-l2";
import Phys12Ch2TheoryContent from "@/components/content/chapters/phys12-ch2-theory";
import Phys12Ch2AppboosterL1Content from "@/components/content/chapters/phys12-ch2-appbooster-l1";
import Phys12Ch2AppboosterL2Content from "@/components/content/chapters/phys12-ch2-appbooster-l2";
import Phys12Ch3TheoryContent from "@/components/content/chapters/phys12-ch3-theory";
import Phys12Ch3AppboosterL1Content from "@/components/content/chapters/phys12-ch3-appbooster-l1";
import Phys12Ch3AppboosterL2Content from "@/components/content/chapters/phys12-ch3-appbooster-l2";

const CHAPTER_NAMES = [
  "bio-9-ch1",
  "bio-9-ch2",
  "bio-9-ch3",
  "bio-9-ch4",
  "chem-9-ch1",
  "chem-9-ch2",
  "chem-9-ch3",
  "phy-9-ch1",
  "phy-9-ch2",
  "phy-9-ch3",
  "phy-9-ch4",
  "phy-9-ch5",
  "pj2-ch1-theory",
  "pj2-ch1-appbooster-l1",
  "pj2-ch1-appbooster-l2",
  "phys12-ch1-appbooster-l1",
  "phys12-ch1-appbooster-l2",
  "phys12-ch2-theory",
  "phys12-ch2-appbooster-l1",
  "phys12-ch2-appbooster-l2",
  "phys12-ch3-theory",
  "phys12-ch3-appbooster-l1",
  "phys12-ch3-appbooster-l2",
] as const;

type Chapter = (typeof CHAPTER_NAMES)[number];

export const CHAPTER_CONTENT: Record<Chapter, React.ComponentType> = {
  "bio-9-ch1": Bio9Ch1Content,
  "bio-9-ch2": Bio9Ch2Content,
  "bio-9-ch3": Bio9Ch3Content,
  "bio-9-ch4": Bio9Ch4Content,
  "chem-9-ch1": Chem9Ch1Content,
  "chem-9-ch2": Chem9Ch2Content,
  "chem-9-ch3": Chem9Ch3Content,
  "phy-9-ch1": Phy9Ch1Content,
  "phy-9-ch2": Phy9Ch2Content,
  "phy-9-ch3": Phy9Ch3Content,
  "phy-9-ch4": Phy9Ch4Content,
  "phy-9-ch5": Phy9Ch5Content,
  "pj2-ch1-theory": Pj2Ch1TheoryContent,
  "pj2-ch1-appbooster-l1": Pj2Ch1AppboosterL1Content,
  "pj2-ch1-appbooster-l2": Pj2Ch1AppboosterL2Content,
  "phys12-ch1-appbooster-l1": Phys12Ch1AppboosterL1Content,
  "phys12-ch1-appbooster-l2": Phys12Ch1AppboosterL2Content,
  "phys12-ch2-theory": Phys12Ch2TheoryContent,
  "phys12-ch2-appbooster-l1": Phys12Ch2AppboosterL1Content,
  "phys12-ch2-appbooster-l2": Phys12Ch2AppboosterL2Content,
  "phys12-ch3-theory": Phys12Ch3TheoryContent,
  "phys12-ch3-appbooster-l1": Phys12Ch3AppboosterL1Content,
  "phys12-ch3-appbooster-l2": Phys12Ch3AppboosterL2Content,
};

export const PREVIEW_CHAPTER_CONTENT: Partial<
  Record<Chapter, React.ComponentType>
> = {
  "bio-9-ch1": Bio9Ch1PreviewContent,
  "chem-9-ch1": Chem9Ch1PreviewContent,
  "phy-9-ch1": Phy9Ch1PreviewContent,
};

export function generateStaticParams() {
  return CHAPTER_NAMES.map((chapter) => ({ chapter }));
}

type ContentPageProps = {
  params: Promise<{ chapter: Chapter }>;
};

export default async function ContentChapterPage({ params }: ContentPageProps) {
  const { chapter } = await params;
  const Component = CHAPTER_CONTENT[chapter];
  if (!Component) notFound();
  return <Component />;
}
