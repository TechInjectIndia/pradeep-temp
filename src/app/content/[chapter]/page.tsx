import type React from "react";
import { notFound } from "next/navigation";

import Chem9Ch1Content from "../../../../new/chem-9-ch1.jsx";

const CHAPTER_NAMES = ["chem-9-ch1"] as const;

type Chapter = (typeof CHAPTER_NAMES)[number];

const CHAPTER_CONTENT: Record<Chapter, React.ComponentType> = {
  "chem-9-ch1": Chem9Ch1Content,
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

