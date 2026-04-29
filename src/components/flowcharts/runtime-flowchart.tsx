"use client";

import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";

type RuntimeFlowchartProps = {
  compiledCode: string;
  title: string;
};

type RuntimeModule = {
  default?: React.ComponentType;
  [key: string]: unknown;
};

function createRuntimeRequire() {
  return (request: string) => {
    if (request === "react") return React;
    if (
      request === "react/jsx-runtime" ||
      request === "react/jsx-dev-runtime"
    ) {
      return jsxRuntime;
    }

    throw new Error(`Unsupported runtime import: ${request}`);
  };
}

export default function RuntimeFlowchart({
  compiledCode,
  title,
}: RuntimeFlowchartProps) {
  let Component: React.ComponentType | null = null;
  let error: string | null = null;

  try {
    const module = { exports: {} as RuntimeModule };
    const executeModule = new Function(
      "require",
      "module",
      "exports",
      compiledCode,
    ) as (
      require: ReturnType<typeof createRuntimeRequire>,
      module: { exports: RuntimeModule },
      exports: RuntimeModule,
    ) => void;

    executeModule(createRuntimeRequire(), module, module.exports);

    const resolvedComponent = module.exports.default ?? module.exports;

    if (typeof resolvedComponent !== "function") {
      throw new Error("Returned flowchart did not export a React component.");
    }

    Component = resolvedComponent as React.ComponentType;
  } catch (runtimeError) {
    console.error("Failed to load flowchart component", runtimeError);
    error =
      runtimeError instanceof Error
        ? runtimeError.message
        : "Failed to render this flowchart.";
  }

  if (error) {
    return (
      <main className="w-full min-h-screen">
        <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h1 className="text-lg font-semibold">Unable to load flowchart</h1>
          <p className="mt-2 text-sm">
            {title}: {error}
          </p>
        </div>
      </main>
    );
  }

  if (!Component) {
    return null;
  }

  return (
    <main className="w-full min-h-screen">
      <Component />
    </main>
  );
}
