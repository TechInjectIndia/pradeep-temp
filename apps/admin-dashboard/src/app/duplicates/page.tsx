"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { DuplicateRecord, DuplicateResolution, TeacherRecord } from "@/types";
// import { useDuplicates, useResolveDuplicate } from "@/hooks/useDuplicates";

// TODO: Replace with useDuplicates(params) hook
const mockDuplicates: DuplicateRecord[] = [
  {
    id: "dup-001",
    batchId: "BATCH-2024-001",
    incomingRecord: {
      name: "Priya Sharma",
      phone: "+919876543210",
      email: "priya@dps.edu",
      school: "Delhi Public School, Vasant Kunj",
      city: "New Delhi",
    },
    existingRecord: {
      name: "Priya S. Sharma",
      phone: "+919876543210",
      email: "priya.sharma@dps.edu",
      school: "Delhi Public School",
      city: "New Delhi",
    },
    confidenceScore: 0.92,
    matchReasons: ["Phone number exact match", "Name similarity: 89%", "Same city"],
    resolution: "PENDING",
    createdAt: "2024-01-15T10:32:00Z",
  },
  {
    id: "dup-002",
    batchId: "BATCH-2024-001",
    incomingRecord: {
      name: "Rajesh Kumar",
      phone: "+919876543211",
      email: "rajesh@kv.edu",
      school: "Kendriya Vidyalaya, Sector 22",
      city: "Chandigarh",
    },
    existingRecord: {
      name: "Rajesh Kumar",
      phone: "+919876543299",
      email: "rajesh@kv.edu",
      school: "Kendriya Vidyalaya",
      city: "Chandigarh",
    },
    confidenceScore: 0.85,
    matchReasons: ["Email exact match", "Name exact match", "Same city"],
    resolution: "PENDING",
    createdAt: "2024-01-15T10:32:15Z",
  },
  {
    id: "dup-003",
    batchId: "BATCH-2024-002",
    incomingRecord: {
      name: "Meena Patel",
      phone: "+919876543212",
      email: "meena@stxaviers.edu",
      school: "St. Xavier's School",
      city: "Mumbai",
    },
    existingRecord: {
      name: "Meena M. Patel",
      phone: "+919876543212",
      email: "meena.patel@xavier.edu",
      school: "St. Xavier's High School",
      city: "Mumbai",
    },
    confidenceScore: 0.88,
    matchReasons: ["Phone number exact match", "Name similarity: 85%"],
    resolution: "MERGED",
    createdAt: "2024-01-14T09:18:00Z",
  },
];

const resolutionOptions: DuplicateResolution[] = ["PENDING", "MERGED", "KEPT_SEPARATE"];

function RecordCard({ label, record, highlight }: { label: string; record: TeacherRecord; highlight?: boolean }) {
  return (
    <div
      className={clsx(
        "flex-1 rounded-lg border p-4",
        highlight ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
      )}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-500">Name: </span>
          <span className="font-medium">{record.name}</span>
        </div>
        <div>
          <span className="text-gray-500">Phone: </span>
          <span className="font-mono">{record.phone}</span>
        </div>
        <div>
          <span className="text-gray-500">Email: </span>
          <span>{record.email}</span>
        </div>
        <div>
          <span className="text-gray-500">School: </span>
          <span>{record.school}</span>
        </div>
        <div>
          <span className="text-gray-500">City: </span>
          <span>{record.city}</span>
        </div>
      </div>
    </div>
  );
}

export default function DuplicatesPage() {
  const [batchFilter, setBatchFilter] = useState("");
  const [resolutionFilter, setResolutionFilter] = useState<DuplicateResolution | "">("");

  let filtered = mockDuplicates;
  if (batchFilter) {
    filtered = filtered.filter((d) => d.batchId === batchFilter);
  }
  if (resolutionFilter) {
    filtered = filtered.filter((d) => d.resolution === resolutionFilter);
  }

  const batches = [...new Set(mockDuplicates.map((d) => d.batchId))];

  const handleMerge = (id: string) => {
    // TODO: resolveDuplicate.mutate({ duplicateId: id, action: "merge" })
    alert(`Merging duplicate ${id}`);
  };

  const handleKeepSeparate = (id: string) => {
    // TODO: resolveDuplicate.mutate({ duplicateId: id, action: "keep_separate" })
    alert(`Keeping separate: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Duplicate Review</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and resolve potential duplicate teacher records
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={resolutionFilter}
          onChange={(e) => setResolutionFilter(e.target.value as DuplicateResolution | "")}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Resolutions</option>
          {resolutionOptions.map((r) => (
            <option key={r} value={r}>
              {r.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-500">
          {filtered.length} duplicate{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Duplicate Cards */}
      <div className="space-y-6">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">No duplicates found.</p>
          </div>
        )}

        {filtered.map((dup) => (
          <div
            key={dup.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-gray-500">{dup.id}</span>
                <span className="text-xs text-gray-400">|</span>
                <span className="font-mono text-sm text-gray-500">{dup.batchId}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-500">Confidence:</span>
                  <span
                    className={clsx(
                      "text-sm font-bold",
                      dup.confidenceScore >= 0.9
                        ? "text-red-600"
                        : dup.confidenceScore >= 0.8
                        ? "text-orange-600"
                        : "text-yellow-600"
                    )}
                  >
                    {(dup.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <span
                  className={clsx(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    dup.resolution === "PENDING" && "bg-yellow-100 text-yellow-700",
                    dup.resolution === "MERGED" && "bg-green-100 text-green-700",
                    dup.resolution === "KEPT_SEPARATE" && "bg-blue-100 text-blue-700"
                  )}
                >
                  {dup.resolution.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Match Reasons */}
            <div className="mb-4 flex flex-wrap gap-2">
              {dup.matchReasons.map((reason, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
                >
                  {reason}
                </span>
              ))}
            </div>

            {/* Records Comparison */}
            <div className="mb-4 flex gap-4">
              <RecordCard label="Incoming Record" record={dup.incomingRecord} highlight />
              <RecordCard label="Existing Record" record={dup.existingRecord} />
            </div>

            {/* Actions */}
            {dup.resolution === "PENDING" && (
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  onClick={() => handleKeepSeparate(dup.id)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Keep Separate
                </button>
                <button
                  onClick={() => handleMerge(dup.id)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Merge Records
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
