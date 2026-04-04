import { redirect } from "next/navigation";

import { PREVIEW_CHAPTER_CONTENT } from "../../[chapter]/page";

/** Legacy / guessed URL shape → canonical `/content/[chapter]/preview`. */
export function generateStaticParams() {
  return Object.keys(PREVIEW_CHAPTER_CONTENT).map((chapter) => ({ chapter }));
}

type Props = {
  params: Promise<{ chapter: string }>;
};

export default async function ContentPreviewChaptersAlias({ params }: Props) {
  const { chapter } = await params;
  if (chapter in PREVIEW_CHAPTER_CONTENT) {
    redirect(`/content/${chapter}/preview`);
  }
  redirect(`/content/${chapter}`);
}
