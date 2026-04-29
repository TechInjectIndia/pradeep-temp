import ts from "typescript";


const FLOWCHART_FUNCTION_URL =
  "http://127.0.0.1:5005/pradeep-publications/asia-south1/getProcessedFlowchartCodeByTitle";
const FLOWCHART_RUNTIME_HEADER = "x-flowchart-app-token";

type ProcessedFlowchartResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    title: string;
    processedFileLink: string;
    code: string;
  } | null;
};

export async function fetchProcessedFlowchartCode(title: string) {
  const endpoint = FLOWCHART_FUNCTION_URL;
  const runtimeToken = FLOWCHART_RUNTIME_HEADER;

  if (!runtimeToken) {
    throw new Error("FLOWCHART_RUNTIME_APP_TOKEN is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [FLOWCHART_RUNTIME_HEADER]: runtimeToken,
    },
    body: JSON.stringify({ title }),
    cache: "no-store",
  });

  const payload = (await response.json()) as ProcessedFlowchartResponse;

  if (!response.ok || !payload.success || !payload.data?.code) {
    return null;
  }

  return payload.data;
}

export function compileFlowchartModule(sourceCode: string) {
  const normalizedSource = sourceCode.replace(
    /^\s*["']use client["'];?\s*/m,
    "",
  );

  return ts.transpileModule(normalizedSource, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
}
