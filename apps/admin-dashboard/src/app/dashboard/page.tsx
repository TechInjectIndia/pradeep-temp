"use client";

import { useRouter } from "next/navigation";
import StatsCard from "@/components/StatsCard";
import DataTable, { type Column } from "@/components/DataTable";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Users, MessageSquare, Layers, ListOrdered, AlertTriangle } from "lucide-react";
import type { Batch, DashboardStats } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, listBatches } from "@/services/api";
import { formatDate } from "@/utils/date";

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
    render: (row) => formatDate(row.createdAt),
  },
  {
    key: "errorCount",
    header: "Errors",
    render: (row) =>
      row.errorCount > 0 ? (
        <span className="text-red-600 font-medium">{row.errorCount}</span>
      ) : (
        <span className="text-muted-foreground/70">0</span>
      ),
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  const { data: recentBatchesData, isLoading: batchesLoading } = useQuery({
    queryKey: ["recent-batches"],
    queryFn: () => listBatches({ pageSize: 5 }),
  });

  const recentBatches = recentBatchesData?.data || [];

  if (statsLoading || batchesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of the Vendor Specimen Distribution System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-5">
        <StatsCard
          title="Total Teachers"
          value={stats?.totalTeachers.toLocaleString() || "0"}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Messages Sent"
          value={stats?.totalMessagesSent.toLocaleString() || "0"}
          icon={MessageSquare}
          color="green"
        />
        <StatsCard
          title="Active Batches"
          value={stats?.activeBatches || 0}
          icon={Layers}
          color="purple"
        />
        <StatsCard
          title="Queue Size"
          value={stats?.queueSize.toLocaleString() || "0"}
          icon={ListOrdered}
          color="orange"
        />
        <StatsCard
          title="DLQ Size"
          value={stats?.dlqSize.toLocaleString() || "0"}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Recent Batches */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
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
          data={recentBatches}
          keyExtractor={(row) => row.batchId}
          onRowClick={(row) => router.push(`/batches/${row.batchId}`)}
        />
      </div>
    </div>
  );
}
