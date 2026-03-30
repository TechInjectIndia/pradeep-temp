import type React from "react";
import { redirect } from "next/navigation";

import { PREVIEW_FLOWCHARTS } from "../page";

export { generateStaticParams } from "../page";

type PreviewPageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function FlowchartChapterPreviewPage({
  params,
}: PreviewPageProps) {
  const { chapter } = await params;

  const Component =
    (PREVIEW_FLOWCHARTS as Partial<Record<string, React.ComponentType>>)[chapter];

  if (!Component) redirect(`/flowchart/${chapter}`);
  return <Component />;
}

