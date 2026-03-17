"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable, { type Column } from "@/components/DataTable";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import type { Batch, BatchStatus } from "@/types";
// import { useBatches } from "@/hooks/useBatches";

// TODO: Replace with useBatches() hook
const mockBatches: Batch[] = [
  {
    batchId: "BATCH-2024-001",
    status: "DISPATCHING",
    teacherCount: 450,
    orderCount: 1230,
    messageCount: 450,
    errorCount: 3,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
  },
  {
    batchId: "BATCH-2024-002",
    status: "COMPLETE",
    teacherCount: 320,
    orderCount: 890,
    messageCount: 320,
    errorCount: 0,
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T10:45:00Z",
  },
  {
    batchId: "BATCH-2024-003",
    status: "PAUSED",
    teacherCount: 200,
    orderCount: 560,
    messageCount: 120,
    errorCount: 12,
    createdAt: "2024-01-14T08:00:00Z",
    updatedAt: "2024-01-14T08:30:00Z",
  },
  {
    batchId: "BATCH-2024-004",
    status: "RESOLVING",
    teacherCount: 180,
    orderCount: 0,
    messageCount: 0,
    errorCount: 0,
    createdAt: "2024-01-15T11:45:00Z",
    updatedAt: "2024-01-15T11:45:00Z",
  },
  {
    batchId: "BATCH-2024-005",
    status: "FAILED",
    teacherCount: 50,
    orderCount: 120,
    messageCount: 0,
    errorCount: 50,
    createdAt: "2024-01-13T14:00:00Z",
    updatedAt: "2024-01-13T14:20:00Z",
  },
  {
    batchId: "BATCH-2024-006",
    status: "CANCELLED",
    teacherCount: 100,
    orderCount: 0,
    messageCount: 0,
    errorCount: 0,
    createdAt: "2024-01-12T16:00:00Z",
    updatedAt: "2024-01-12T16:05:00Z",
  },
  {
    batchId: "BATCH-2024-007",
    status: "CREATING_ORDERS",
    teacherCount: 275,
    orderCount: 410,
    messageCount: 0,
    errorCount: 2,
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T12:10:00Z",
  },
  {
    batchId: "BATCH-2024-008",
    status: "AGGREGATING",
    teacherCount: 310,
    orderCount: 880,
    messageCount: 0,
    errorCount: 0,
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

const statuses: BatchStatus[] = [
  "PENDING",
  "RESOLVING",
  "CREATING_ORDERS",
  "AGGREGATING",
  "DISPATCHING",
  "PAUSED",
  "COMPLETE",
  "CANCELLED",
  "FAILED",
];

export default function BatchesPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<BatchStatus | "">("");
  const [page, setPage] = useState(1);

  const filtered = statusFilter
    ? mockBatches.filter((b) => b.status === statusFilter)
    : mockBatches;

  const columns: Column<Batch>[] = [
    {
      key: "batchId",
      header: "Batch ID",
      render: (row) => (
        <span className="font-mono text-sm font-medium text-blue-600">
          {row.batchId}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <BatchStateIndicator status={row.status} />,
    },
    { key: "teacherCount", header: "Teachers" },
    { key: "orderCount", header: "Orders" },
    { key: "messageCount", header: "Messages" },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Batches</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and monitor distribution batches
        </p>
      </div>

      <div className="flex items-center gap-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as BatchStatus | "");
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">
          {filtered.length} batch{filtered.length !== 1 ? "es" : ""}
        </span>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(row) => row.batchId}
        onRowClick={(row) => router.push(`/batches/${row.batchId}`)}
        pagination={{
          page,
          pageSize: 20,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / 20),
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
