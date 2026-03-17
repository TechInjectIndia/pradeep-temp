"use client";

import { useState, useCallback } from "react";
import { Download, Loader2 } from "lucide-react";
import FileUploadZone from "@/components/FileUploadZone";
import DataTable, { type Column } from "@/components/DataTable";
import type { UploadRow } from "@/types";
// import { uploadSpecimen, createOrders } from "@/services/api";

// Mock parsed data for preview
const mockParsedRows: UploadRow[] = [
  { name: "Priya Sharma", phone: "+919876543210", email: "priya@school.com", school: "Delhi Public School", books: "Math 10, Science 10" },
  { name: "Rajesh Kumar", phone: "+919876543211", email: "rajesh@school.com", school: "Kendriya Vidyalaya", books: "English 9, Hindi 9, Math 9" },
  { name: "Meena Patel", phone: "+919876543212", email: "meena@school.com", school: "St. Xavier's School", books: "Science 8" },
  { name: "Amit Singh", phone: "+919876543213", email: "amit@school.com", school: "Army Public School", books: "Math 10, Science 10, English 10" },
  { name: "Sunita Devi", phone: "+919876543214", email: "sunita@school.com", school: "Government School", books: "Hindi 6, Math 6" },
];

const previewColumns: Column<UploadRow>[] = [
  { key: "name", header: "Name" },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email" },
  { key: "school", header: "School" },
  { key: "books", header: "Books" },
];

export default function UploadPage() {
  const [parsedRows, setParsedRows] = useState<UploadRow[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    // TODO: Parse Excel file using xlsx library
    // For now, show mock data
    setParsedRows(mockParsedRows);
  }, []);

  const handleDownloadTemplate = () => {
    // TODO: Generate and download Excel template
    alert("Download template - would generate a .xlsx file with required columns");
  };

  const handleStartDistribution = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      // TODO: Upload file and start distribution
      // const result = await uploadSpecimen(selectedFile);
      // await createOrders(result.batchId);
      // router.push(`/batches/${result.batchId}`);
      alert("Distribution started! (mock)");
    } catch (err) {
      alert("Failed to start distribution");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setParsedRows([]);
    setSelectedFile(null);
  };

  const estimatedOrders = parsedRows.reduce((acc, row) => {
    return acc + (row.books ? row.books.split(",").length : 0);
  }, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Specimen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload a specimen file to start a new distribution batch
        </p>
      </div>

      {/* Download Template */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Specimen Template</h2>
            <p className="mt-1 text-sm text-gray-500">
              Download the template file, fill in teacher data, and upload it below.
            </p>
          </div>
          <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            Download Template
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-gray-900">Upload File</h2>
        <FileUploadZone onFileSelect={handleFileSelect} />
      </div>

      {/* Preview */}
      {parsedRows.length > 0 && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-gray-500">Teachers</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {parsedRows.length}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-gray-500">Estimated Orders</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {estimatedOrders}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
              <p className="text-sm text-gray-500">File</p>
              <p className="mt-1 text-sm font-medium text-gray-900 truncate">
                {selectedFile?.name}
              </p>
            </div>
          </div>

          {/* Preview Table */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Preview
            </h2>
            <DataTable
              columns={previewColumns}
              data={parsedRows}
              keyExtractor={(row) => row.phone}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleStartDistribution}
              disabled={isUploading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
              Start Distribution
            </button>
          </div>
        </>
      )}
    </div>
  );
}
