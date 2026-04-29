import { notFound } from "next/navigation";
import RuntimeFlowchart from "@/components/flowcharts/runtime-flowchart";
import {
  compileFlowchartModule,
  fetchProcessedFlowchartCode,
} from "@/lib/flowcharts/runtime";

export const dynamic = "force-dynamic";

type FlowchartPageProps = {
  params: Promise<{ title: string }>;
};

export default async function FlowchartTitlePage({
  params,
}: FlowchartPageProps) {
  const { title } = await params;
  const flowchart = await fetchProcessedFlowchartCode(title);

  if (!flowchart) {
    notFound();
  }

  const compiledCode = compileFlowchartModule(flowchart.code);

  return <RuntimeFlowchart compiledCode={compiledCode} title={title} />;
}
