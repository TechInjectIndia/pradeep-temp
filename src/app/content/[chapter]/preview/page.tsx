import type React from "react";
import { notFound } from "next/navigation";

import { PREVIEW_CHAPTER_CONTENT } from "../page";

export { generateStaticParams } from "../page";

type PreviewPageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function ContentChapterPreviewPage({
  params,
}: PreviewPageProps) {
  const { chapter } = await params;

  const Component =
    (PREVIEW_CHAPTER_CONTENT as Partial<Record<string, React.ComponentType>>)[chapter];

  if (!Component) notFound();
  return <Component />;
}

