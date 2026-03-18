"use client";

import { useState, useCallback, useEffect } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import FileUploadZone from "@/components/FileUploadZone";
import DataTable, { type Column } from "@/components/DataTable";
import type { UploadRow } from "@/types";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";

const STORAGE_LOGS_KEY = "upload_review_initial_logs";

const TEMPLATE_HEADERS = ["name", "phone", "email", "school", "books"];
const TEMPLATE_EXAMPLE: UploadRow = {
  name: "Example Teacher",
  phone: "+919876543210",
  email: "teacher@school.com",
  school: "School Name",
  books: "Math 10, Science 10",
};

const previewColumns: Column<UploadRow>[] = [
  { key: "name", header: "Name" },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email" },
  { key: "school", header: "School" },
  { key: "books", header: "Books" },
];

export default function UploadPage() {
  const router = useRouter();
  const [parsedRows, setParsedRows] = useState<UploadRow[]>([]);

  useEffect(() => {
    console.log("[Upload] Page mounted");
  }, []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    console.log("[Upload] handleFileSelect called:", file.name, file.size);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (![".xlsx", ".xls", ".csv"].some((e) => ext === e.slice(1))) {
      console.warn("[Upload] Invalid file type:", ext);
      toast.error("Please upload an Excel (.xlsx, .xls) or CSV file");
      return;
    }
    setSelectedFile(file);
    setIsParsing(true);
    const logs: Array<{ step: string; stepNumber: number; timestamp: string; message: string; detail?: string }> = [
      { step: "file_selected", stepNumber: 1, timestamp: new Date().toISOString(), message: "File selected", detail: file.name },
    ];

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        setIsParsing(false);
        console.log("[Upload] FileReader onload");
        const result = e.target?.result;
        if (!result || !(result instanceof ArrayBuffer)) {
          console.error("[Upload] Invalid result:", typeof result);
          toast.error("Could not read file");
          return;
        }
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          toast.error("File has no sheets");
          return;
        }
        const worksheet = workbook.Sheets[sheetName];
        const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "" });
        const json: UploadRow[] = raw.map((row) => {
          const lower: Record<string, string> = {};
          for (const [k, v] of Object.entries(row)) {
            lower[k.trim().toLowerCase()] = String(v ?? "").trim();
          }
          return {
            name: lower.name ?? "",
            phone: lower.phone ?? "",
            email: lower.email ?? "",
            school: lower.school ?? "",
            books: lower.books ?? "",
          };
        });
        if (json.length === 0) {
          toast.error("No data rows found in file");
          return;
        }
        logs.push({ step: "file_parsed", stepNumber: 2, timestamp: new Date().toISOString(), message: "File parsed", detail: `${json.length} rows extracted` });
        sessionStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logs));
        console.log("[Upload] Parsed successfully:", json.length, "rows");
        setParsedRows(json);
        toast.success(`Parsed ${json.length} rows from ${file.name}`);
      } catch (err) {
        setIsParsing(false);
        console.error("[Upload] Parse error:", err);
        toast.error(err instanceof Error ? err.message : "Failed to parse file");
      }
    };
    reader.onerror = (e) => {
      setIsParsing(false);
      console.error("[Upload] FileReader error:", e);
      toast.error("Failed to read file");
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      TEMPLATE_HEADERS,
      TEMPLATE_HEADERS.map((h) => (TEMPLATE_EXAMPLE as unknown as Record<string, string>)[h]),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teachers");
    XLSX.writeFile(wb, "specimen_template.xlsx");
  };

  const handleReviewAndSend = () => {
    if (!selectedFile || parsedRows.length === 0) return;
    try {
      const existingLogs = sessionStorage.getItem(STORAGE_LOGS_KEY);
      let logs: Array<{ step: string; stepNumber: number; timestamp: string; message: string; detail?: string }> = [];
      if (existingLogs) {
        try {
          logs = JSON.parse(existingLogs);
        } catch {
          logs = [];
        }
      }
      const nextNum = logs.length + 1;
      logs.push({ step: "navigate_review", stepNumber: nextNum, timestamp: new Date().toISOString(), message: "Navigate to review", detail: `${parsedRows.length} teachers • ${selectedFile.name}` });
      sessionStorage.setItem(STORAGE_LOGS_KEY, JSON.stringify(logs));
      sessionStorage.setItem("upload_review_rows", JSON.stringify(parsedRows));
      sessionStorage.setItem("upload_review_filename", selectedFile.name);
      router.push("/upload/review");
    } catch (err) {
      console.error("Review navigation failed:", err);
    }
  };

  const handleCancel = useCallback(() => {
    setParsedRows([]);
    setSelectedFile(null);
  }, []);

  const estimatedOrders = parsedRows.reduce((acc, row) => {
    return acc + (row.books ? row.books.split(",").length : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Specimen</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload a specimen file to start a new distribution batch
        </p>
      </div>

      {/* Download Template */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Specimen Template</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Download the template file, fill in teacher data, and upload it below.
            </p>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50"
          >
            <Download className="h-4 w-4" />
            Download Template
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-foreground">Upload File</h2>
        {isParsing && (
          <p className="mb-4 text-sm text-muted-foreground">Parsing file...</p>
        )}
        <FileUploadZone onFileSelect={handleFileSelect} onClear={handleCancel} />
      </div>

      {/* Preview */}
      {parsedRows.length > 0 && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
              <p className="text-sm text-muted-foreground">Teachers</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {parsedRows.length}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
              <p className="text-sm text-muted-foreground">Estimated Orders</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {estimatedOrders}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
              <p className="text-sm text-muted-foreground">File</p>
              <p className="mt-1 text-sm font-medium text-foreground truncate">
                {selectedFile?.name}
              </p>
            </div>
          </div>

          {/* Preview Table */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Preview
            </h2>
            <DataTable
              columns={previewColumns}
              data={parsedRows}
              keyExtractor={(row) => `${row.phone}|${row.email}`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50"
            >
              Cancel
            </button>
            <button
              onClick={handleReviewAndSend}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-blue-700"
            >
              Review & Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
