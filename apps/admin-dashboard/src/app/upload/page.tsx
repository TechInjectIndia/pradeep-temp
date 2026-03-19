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

const TEMPLATE_HEADERS = [
  "Record Id", "Books Assigned", "Teacher Owner.id", "Teacher Owner",
  "First Name", "Last Name", "Teacher Name", "Institution Name.id", "Institution Name",
  "Email", "Phone", "Salutation",
];
const TEMPLATE_EXAMPLE: Record<string, string> = {
  "Record Id": "REC001",
  "Books Assigned": "Math 10, Science 10",
  "Teacher Owner.id": "owner-1",
  "Teacher Owner": "John Doe",
  "First Name": "Example",
  "Last Name": "Teacher",
  "Teacher Name": "Example Teacher",
  "Institution Name.id": "inst-1",
  "Institution Name": "School Name",
  "Email": "teacher@school.com",
  "Phone": "+919876543210",
  "Salutation": "Mr",
};

/** Converts Excel numeric/scientific-notation values to proper string (e.g. phone numbers). */
function toNumericString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") {
    if (Number.isInteger(value)) return String(value);
    return String(Math.floor(value));
  }
  const s = String(value ?? "").trim();
  if (!s) return "";
  if (/^\d*\.?\d+[eE][+-]?\d+$/.test(s)) {
    const num = parseFloat(s);
    if (!Number.isNaN(num)) return String(Math.floor(num));
  }
  return s;
}

/** Map Excel row to UploadRow using column aliases (Record Id, Teacher Name, Institution Name, etc.) */
function mapRowToUploadRow(row: Record<string, unknown>): UploadRow {
  const lower: Record<string, string> = {};
  for (const [k, v] of Object.entries(row)) {
    lower[k.trim().toLowerCase().replace(/\s+/g, " ")] = toNumericString(v ?? "").trim();
  }
  const get = (keys: string[]) => {
    for (const k of keys) {
      const v = lower[k];
      if (v) return v;
    }
    return "";
  };
  const firstName = get(["first name", "firstname"]);
  const lastName = get(["last name", "lastname"]);
  const name = get(["name", "teacher name", "teachername"]) || [firstName, lastName].filter(Boolean).join(" ").trim();
  const school = get(["school", "institution name", "institutionname", "instituition name"]);
  const books = get(["books", "books assigned", "booksassigned"]);
  return {
    name: name || "",
    phone: get(["phone"]) || "",
    email: get(["email"]) || "",
    school: school || "",
    books: books || "",
    recordId: get(["record id", "recordid"]) || undefined,
    booksAssigned: get(["books assigned", "booksassigned"]) || undefined,
    teacherOwnerId: get(["teacher owner.id", "teacher owner id", "teacherownerid"]) || undefined,
    teacherOwner: get(["teacher owner", "teacherowner"]) || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    institutionId: get(["institution name.id", "institution name id", "institutionid"]) || undefined,
    institutionName: get(["institution name", "institutionname"]) || undefined,
    salutation: get(["salutation"]) || undefined,
  };
}

const previewColumns: Column<UploadRow>[] = [
  { key: "recordId", header: "Record Id" },
  { key: "name", header: "Teacher Name" },
  { key: "salutation", header: "Salutation" },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email" },
  { key: "school", header: "Institution" },
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
    if (!["xlsx", "csv"].includes(ext ?? "")) {
      console.warn("[Upload] Invalid file type:", ext);
      toast.error("Please upload an Excel (.xlsx) or CSV (.csv) file");
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
        const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
          defval: "",
          raw: true, // Use raw numbers to avoid scientific notation (e.g. 9997016578 instead of "9.99702E+09")
        });
        const json: UploadRow[] = raw.map((row) => mapRowToUploadRow(row));
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
      TEMPLATE_HEADERS.map((h) => TEMPLATE_EXAMPLE[h] ?? ""),
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
          <div className="min-w-0 w-full">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Preview
            </h2>
            <div className="w-full overflow-x-auto">
              <DataTable
                columns={previewColumns}
                data={parsedRows}
                keyExtractor={(row) => `${row.phone}|${row.email}`}
              />
            </div>
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
