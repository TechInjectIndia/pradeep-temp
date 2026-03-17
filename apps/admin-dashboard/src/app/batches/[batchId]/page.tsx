"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pause, Play, XCircle } from "lucide-react";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import StageProgressComponent from "@/components/StageProgress";
import StatusTimeline from "@/components/StatusTimeline";
import type { BatchDetail } from "@/types";
// import { useBatch, usePauseBatch, useResumeBatch, useCancelBatch } from "@/hooks/useBatches";

// TODO: Replace with useBatch(batchId) hook
const mockBatch: BatchDetail = {
  batchId: "BATCH-2024-001",
  status: "DISPATCHING",
  teacherCount: 450,
  orderCount: 1230,
  messageCount: 380,
  errorCount: 3,
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T11:00:00Z",
  stages: [
    { stage: "RESOLUTION", total: 450, completed: 450, failed: 0 },
    { stage: "ORDERS", total: 450, completed: 445, failed: 2 },
    { stage: "AGGREGATION", total: 445, completed: 440, failed: 1 },
    { stage: "MESSAGES", total: 440, completed: 380, failed: 0 },
  ],
  deliveryStatus: {
    sent: 380,
    delivered: 320,
    read: 210,
    failed: 5,
    pending: 55,
  },
  statusHistory: [
    { status: "PENDING", timestamp: "2024-01-15T10:30:00Z" },
    { status: "RESOLVING", timestamp: "2024-01-15T10:30:15Z" },
    { status: "CREATING_ORDERS", timestamp: "2024-01-15T10:35:00Z" },
    { status: "AGGREGATING", timestamp: "2024-01-15T10:42:00Z" },
    { status: "DISPATCHING", timestamp: "2024-01-15T10:48:00Z" },
  ],
};

export default function BatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.batchId as string;

  // TODO: Replace with useBatch(batchId)
  const batch = { ...mockBatch, batchId };

  const canPause = ["RESOLVING", "CREATING_ORDERS", "AGGREGATING", "DISPATCHING"].includes(batch.status);
  const canResume = batch.status === "PAUSED";
  const canCancel = !["COMPLETE", "CANCELLED", "FAILED"].includes(batch.status);

  const totalDelivery =
    batch.deliveryStatus.sent +
    batch.deliveryStatus.delivered +
    batch.deliveryStatus.read +
    batch.deliveryStatus.failed +
    batch.deliveryStatus.pending;

  const deliveryItems = [
    { label: "Pending", count: batch.deliveryStatus.pending, color: "bg-gray-400" },
    { label: "Sent", count: batch.deliveryStatus.sent, color: "bg-blue-500" },
    { label: "Delivered", count: batch.deliveryStatus.delivered, color: "bg-green-500" },
    { label: "Read", count: batch.deliveryStatus.read, color: "bg-emerald-500" },
    { label: "Failed", count: batch.deliveryStatus.failed, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/batches")}
            className="mb-2 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Batches
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 font-mono">
              {batch.batchId}
            </h1>
            <BatchStateIndicator status={batch.status} size="md" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Created {new Date(batch.createdAt).toLocaleString()} |{" "}
            {batch.teacherCount} teachers | {batch.orderCount} orders
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {canPause && (
            <button
              onClick={() => {
                /* TODO: pauseBatch.mutate(batchId) */
              }}
              className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>
          )}
          {canResume && (
            <button
              onClick={() => {
                /* TODO: resumeBatch.mutate(batchId) */
              }}
              className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
            >
              <Play className="h-4 w-4" />
              Resume
            </button>
          )}
          {canCancel && (
            <button
              onClick={() => {
                const reason = prompt("Cancel reason:");
                if (reason) {
                  /* TODO: cancelBatch.mutate({ batchId, reason }) */
                }
              }}
              className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
            >
              <XCircle className="h-4 w-4" />
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column: Progress & Delivery */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stage Progress */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Stage Progress
            </h2>
            <div className="space-y-6">
              {batch.stages.map((stage) => (
                <StageProgressComponent
                  key={stage.stage}
                  stage={stage}
                  batchId={batch.batchId}
                />
              ))}
            </div>
          </div>

          {/* Delivery Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Delivery Status
            </h2>

            {/* Stacked bar */}
            <div className="mb-4 flex h-4 overflow-hidden rounded-full bg-gray-200">
              {deliveryItems.map((item) => {
                const pct = totalDelivery > 0 ? (item.count / totalDelivery) * 100 : 0;
                return pct > 0 ? (
                  <div
                    key={item.label}
                    className={`${item.color} transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                    title={`${item.label}: ${item.count}`}
                  />
                ) : null;
              })}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-5 gap-4">
              {deliveryItems.map((item) => (
                <div key={item.label} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Errors Summary */}
          {batch.errorCount > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-800">
                    {batch.errorCount} Error{batch.errorCount !== 1 ? "s" : ""}
                  </h3>
                  <p className="mt-1 text-sm text-red-600">
                    Some items in this batch encountered errors during processing.
                  </p>
                </div>
                <Link
                  href={`/batches/${batch.batchId}/errors`}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  View Errors
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Timeline */}
        <div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Status History
            </h2>
            <StatusTimeline history={batch.statusHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
