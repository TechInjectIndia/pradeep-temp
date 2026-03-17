"use client";

import { useState } from "react";
import DataTable, { type Column } from "./DataTable";
import DeliveryStatusBadge from "./DeliveryStatusBadge";
import type { DLQEntry, MessageChannel } from "@/types";
import { clsx } from "clsx";

interface Props {
  entries: DLQEntry[];
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRetrySelected: (ids: string[]) => void;
  onRetryAll: () => void;
  isLoading?: boolean;
}

export default function DLQTable({
  entries,
  total,
  page,
  totalPages,
  onPageChange,
  onRetrySelected,
  onRetryAll,
  isLoading,
}: Props) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === entries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(entries.map((e) => e.id)));
    }
  };

  const columns: Column<DLQEntry>[] = [
    {
      key: "select",
      header: "",
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.has(row.id)}
          onChange={() => toggleSelect(row.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      className: "w-10",
    },
    {
      key: "teacherPhone",
      header: "Teacher",
      render: (row) => (
        <div>
          <p className="font-medium">{row.teacherName}</p>
          <p className="text-xs text-gray-400">{row.teacherPhone}</p>
        </div>
      ),
    },
    {
      key: "channel",
      header: "Channel",
      render: (row) => (
        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {row.channel}
        </span>
      ),
    },
    { key: "attempts", header: "Attempts" },
    {
      key: "lastError",
      header: "Last Error",
      render: (row) => (
        <span className="max-w-xs truncate block text-red-600" title={row.lastError}>
          {row.lastError}
        </span>
      ),
    },
    {
      key: "retryable",
      header: "Retryable",
      render: (row) => (
        <span
          className={clsx(
            "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
            row.retryable
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          )}
        >
          {row.retryable ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          className={clsx(
            "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
            row.status === "RESOLVED" && "bg-green-100 text-green-700",
            row.status === "PENDING" && "bg-yellow-100 text-yellow-700",
            row.status === "RETRYING" && "bg-blue-100 text-blue-700",
            row.status === "ABANDONED" && "bg-gray-100 text-gray-500"
          )}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const retryableCount = entries.filter((e) => e.retryable).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={selectedIds.size === entries.length && entries.length > 0}
            onChange={toggleAll}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Select All
        </label>

        <div className="flex-1" />

        <button
          onClick={() => onRetrySelected(Array.from(selectedIds))}
          disabled={selectedIds.size === 0}
          className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Retry Selected ({selectedIds.size})
        </button>

        <button
          onClick={onRetryAll}
          disabled={retryableCount === 0}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Retry All Retryable ({retryableCount})
        </button>
      </div>

      <DataTable
        columns={columns}
        data={entries}
        keyExtractor={(row) => row.id}
        isLoading={isLoading}
        emptyMessage="No dead letter queue entries."
        pagination={{
          page,
          pageSize: 20,
          total,
          totalPages,
          onPageChange,
        }}
      />
    </div>
  );
}
