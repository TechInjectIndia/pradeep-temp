"use client";

import { useState } from "react";
import { clsx } from "clsx";
import type { DuplicateRecord, DuplicateResolution, TeacherRecord } from "@/types";
import { useDuplicates, useResolveDuplicate } from "@/hooks/useDuplicates";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listBatches } from "@/services/api";

const resolutionOptions: DuplicateResolution[] = ["PENDING", "MERGED", "KEPT_SEPARATE"];

function RecordCard({ label, record, highlight }: { label: string; record: TeacherRecord; highlight?: boolean }) {
  return (
    <div
      className={clsx(
        "flex-1 rounded-lg border p-4",
        highlight ? "border-blue-200 bg-blue-50" : "border-border bg-muted/50"
      )}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-muted-foreground">Name: </span>
          <span className="font-medium">{record.name}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Phone: </span>
          <span className="font-mono">{record.phone}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Email: </span>
          <span>{record.email}</span>
        </div>
        <div>
          <span className="text-muted-foreground">School: </span>
          <span>{record.school}</span>
        </div>
        <div>
          <span className="text-muted-foreground">City: </span>
          <span>{record.city}</span>
        </div>
      </div>
    </div>
  );
}

export default function DuplicatesPage() {
  const [batchFilter, setBatchFilter] = useState("");
  const [resolutionFilter, setResolutionFilter] = useState<DuplicateResolution | "">("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: response, isLoading } = useDuplicates({
    batchId: batchFilter || undefined,
    resolution: resolutionFilter || undefined,
    page,
    pageSize,
  });

  const { data: batchesRes } = useQuery({
    queryKey: ["batches-list-full"],
    queryFn: () => listBatches({ pageSize: 100 }),
  });

  const resolveMutation = useResolveDuplicate();

  const duplicates = response?.data || [];
  const totalCount = response?.total || 0;
  const batches = batchesRes?.data.map((b) => b.batchId) || [];

  const handleMerge = (id: string) => {
    resolveMutation.mutate({ duplicateId: id, action: "merge" });
  };

  const handleKeepSeparate = (id: string) => {
    resolveMutation.mutate({ duplicateId: id, action: "keep_separate" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Duplicate Review</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review and resolve potential duplicate teacher records
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select
          value={batchFilter}
          onChange={(e) => { setBatchFilter(e.target.value); setPage(1); }}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Resolutions</option>
          {resolutionOptions.map((r) => (
            <option key={r} value={r}>
              {r.replace(/_/g, " ")}
            </option>
          ))}
        </select>

        <span className="text-sm text-muted-foreground">
          {totalCount} duplicate{totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Duplicate Cards */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-6">
          {duplicates.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">No duplicates found.</p>
            </div>
          )}

          {duplicates.map((dup) => (
          <div
            key={dup.id}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-muted-foreground">{dup.id}</span>
                <span className="text-xs text-muted-foreground/70">|</span>
                <span className="font-mono text-sm text-muted-foreground">{dup.batchId}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-muted-foreground">Confidence:</span>
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
                  disabled={resolveMutation.isPending}
                  className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-50"
                >
                  Keep Separate
                </button>
                <button
                  onClick={() => handleMerge(dup.id)}
                  disabled={resolveMutation.isPending}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-blue-700 disabled:opacity-50"
                >
                  {resolveMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Merge Records
                </button>
              </div>
            )}
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
