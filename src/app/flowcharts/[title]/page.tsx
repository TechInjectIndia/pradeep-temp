import { notFound } from "next/navigation";
import RuntimeFlowchart from "@/components/flowcharts/runtime-flowchart";
import {
  compileFlowchartModule,
  fetchProcessedFlowchartCode,
} from "@/lib/flowcharts/runtime";

export const dynamic = "force-dynamic";

type FlowchartPageProps = {
  params: Promise<{ title: string }>;
  searchParams: Promise<{ updatedAt?: string }>;
};

export default async function FlowchartTitlePage({
  params,
  searchParams,
}: FlowchartPageProps) {
  const { title } = await params;
  const { updatedAt } = await searchParams;
  const flowchart = await fetchProcessedFlowchartCode(title);

  if (!flowchart) {
    notFound();
  }

  const compiledCode = compileFlowchartModule(flowchart.code);

  return (
    <RuntimeFlowchart
      key={updatedAt ?? title}
      compiledCode={compiledCode}
      title={title}
    />
  );
}
