"use client";

import { Users, MessageSquare, Layers, ListOrdered, AlertTriangle } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import DataTable, { type Column } from "@/components/DataTable";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import type { Batch, DashboardStats } from "@/types";

// TODO: Replace with API call: getDashboardStats()
const mockStats: DashboardStats = {
  totalTeachers: 12_847,
  messagesSentToday: 3_214,
  activeBatches: 4,
  queueSize: 1_287,
  dlqSize: 23,
};

// TODO: Replace with API call: listBatches({ pageSize: 5 })
const mockRecentBatches: Batch[] = [
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
];

const batchColumns: Column<Batch>[] = [
  { key: "batchId", header: "Batch ID", render: (row) => <span className="font-mono text-sm font-medium">{row.batchId}</span> },
  { key: "teacherCount", header: "Teachers" },
  {
    key: "status",
    header: "Status",
    render: (row) => <BatchStateIndicator status={row.status} />,
  },
  {
    key: "createdAt",
    header: "Created",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    key: "errorCount",
    header: "Errors",
    render: (row) =>
      row.errorCount > 0 ? (
        <span className="text-red-600 font-medium">{row.errorCount}</span>
      ) : (
        <span className="text-gray-400">0</span>
      ),
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of the Vendor Specimen Distribution System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Teachers"
          value={mockStats.totalTeachers.toLocaleString()}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Messages Today"
          value={mockStats.messagesSentToday.toLocaleString()}
          icon={MessageSquare}
          color="green"
        />
        <StatsCard
          title="Active Batches"
          value={mockStats.activeBatches}
          icon={Layers}
          color="purple"
        />
        <StatsCard
          title="Queue Size"
          value={mockStats.queueSize.toLocaleString()}
          icon={ListOrdered}
          color="orange"
        />
        <StatsCard
          title="DLQ Size"
          value={mockStats.dlqSize}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Recent Batches */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Batches
          </h2>
          <a
            href="/batches"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all
          </a>
        </div>
        <DataTable
          columns={batchColumns}
          data={mockRecentBatches}
          keyExtractor={(row) => row.batchId}
          onRowClick={(row) => {
            window.location.href = `/batches/${row.batchId}`;
          }}
        />
      </div>
    </div>
  );
}
