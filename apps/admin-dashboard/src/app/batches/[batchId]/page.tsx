"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/utils/date";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pause, Play, XCircle, RefreshCw, FileText, ChevronLeft, ChevronRight, X } from "lucide-react";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import StageProgressComponent from "@/components/StageProgress";
import StatusTimeline from "@/components/StatusTimeline";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Loader2 } from "lucide-react";
import type { BatchDetail, MessageSendLogEntry } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useBatch, usePauseBatch, useResumeBatch, useCancelBatch, useCheckAdvanceBatch } from "@/hooks/useBatches";
import { getBatchLogs, listMessageLogs } from "@/services/api";

function MessageDetailModal({
  log,
  currentIndex,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  log: MessageSendLogEntry;
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const to = log.channel === "whatsapp" ? log.teacherPhone : log.teacherEmail;
  const channelLabel = log.channel === "whatsapp" ? "WhatsApp" : "Email";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-card shadow-xl border border-border max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-lg font-semibold text-foreground">Message details</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">From</p>
            <p className="mt-0.5 text-sm font-medium text-foreground">System (Specimen Distribution)</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">To</p>
            <p className="mt-0.5 font-mono text-sm text-foreground break-all">{to || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Channel</p>
            <p className="mt-0.5">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                  log.channel === "whatsapp"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {channelLabel}
              </span>
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sent at</p>
            <p className="mt-0.5 text-sm text-foreground">{formatDateTime(log.sentAt)}</p>
          </div>
          {log.subject && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject</p>
              <p className="mt-0.5 text-sm text-foreground">{log.subject}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message</p>
            <div className="mt-0.5 rounded-lg bg-muted/50 px-3 py-2 text-sm text-foreground whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
              {log.messageBody || log.subject || "—"}
            </div>
          </div>
          {log.error && (
            <div>
              <p className="text-xs font-medium text-red-600 uppercase tracking-wide">Error</p>
              <p className="mt-0.5 text-sm text-red-600">{log.error}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 gap-4">
          <button
            onClick={onPrev}
            disabled={currentIndex <= 0}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} of {total}
          </span>
          <button
            onClick={onNext}
            disabled={currentIndex >= total - 1}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.batchId as string;

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [messageModalIndex, setMessageModalIndex] = useState<number | null>(null);

  const { data: response, isLoading, error } = useBatch(batchId);
  const { data: logsData } = useQuery({
    queryKey: ["batchLogs", batchId],
    queryFn: () => getBatchLogs(batchId, { limit: 200 }),
    enabled: !!batchId,
    refetchInterval: 4000,
  });
  const { data: messageLogsData } = useQuery({
    queryKey: ["messageLogs", batchId],
    queryFn: () => listMessageLogs({ batchId, limit: 500 }),
    enabled: !!batchId,
    refetchInterval: 4000,
  });
  const batchLogs = logsData?.data ?? [];
  const messageLogs = messageLogsData?.data ?? [];
  const pauseMutation = usePauseBatch();
  const resumeMutation = useResumeBatch();
  const cancelMutation = useCancelBatch();
  const checkAdvanceMutation = useCheckAdvanceBatch();

  const batch = response;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !batch) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-lg font-semibold text-red-800">Error loading batch</h2>
        <p className="mt-2 text-red-600">
          {(error as Error)?.message || "The batch could not be found."}
        </p>
        <button
          onClick={() => router.push("/batches")}
          className="mt-4 text-sm font-medium text-blue-600 hover:underline"
        >
          Return to Batches
        </button>
      </div>
    );
  }

  const canPause = ["RESOLVING", "CREATING_ORDERS", "AGGREGATING", "DISPATCHING", "ORDERING", "MESSAGING"].includes(batch.status);
  const canResume = batch.status === "PAUSED";
  const canCancel = !["COMPLETE", "CANCELLED", "FAILED"].includes(batch.status);
  const canRefreshStatus = !["COMPLETE", "CANCELLED", "FAILED"].includes(batch.status);

  const ds = batch.deliveryStatus ?? { sent: 0, delivered: 0, read: 0, failed: 0, pending: 0 };
  const totalDelivery = ds.sent + ds.delivered + ds.read + ds.failed + ds.pending;

  const deliveryItems = [
    { label: "Pending", count: ds.pending, color: "bg-muted-foreground/40" },
    { label: "Sent", count: ds.sent, color: "bg-blue-500" },
    { label: "Delivered", count: ds.delivered, color: "bg-green-500" },
    { label: "Read", count: ds.read, color: "bg-emerald-500" },
    { label: "Failed", count: ds.failed, color: "bg-red-500" },
  ];

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) return;
    cancelMutation.mutate({ batchId, reason: cancelReason.trim() });
    setShowCancelDialog(false);
    setCancelReason("");
  };

  return (
    <div className="space-y-8">
      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-xl bg-card p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground">Cancel Batch</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Please provide a reason for cancelling this batch.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Cancellation reason..."
              rows={3}
              className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => { setShowCancelDialog(false); setCancelReason(""); }}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50"
              >
                Back
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={!cancelReason.trim() || cancelMutation.isPending}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-red-700 disabled:opacity-50"
              >
                {cancelMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/batches")}
            className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Batches
          </button>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground font-mono">
              {batch.batchId}
            </h1>
            <BatchStateIndicator status={batch.status} size="md" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Created {formatDateTime(batch.createdAt)} |{" "}
            {batch.teacherCount} teachers | {batch.orderCount} orders
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canRefreshStatus && (
            <button
              onClick={() => checkAdvanceMutation.mutate(batchId)}
              disabled={checkAdvanceMutation.isPending}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-50"
              title="Refresh status (advance to Complete if all steps are done)"
            >
              {checkAdvanceMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Refresh status
            </button>
          )}
          {canPause && (
            <button
              onClick={() => pauseMutation.mutate(batchId)}
              disabled={pauseMutation.isPending}
              className="flex items-center gap-2 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-100 disabled:opacity-50"
            >
              {pauseMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pause className="h-4 w-4" />}
              Pause
            </button>
          )}
          {canResume && (
            <button
              onClick={() => resumeMutation.mutate(batchId)}
              disabled={resumeMutation.isPending}
              className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100 disabled:opacity-50"
            >
              {resumeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Resume
            </button>
          )}
          {canCancel && (
            <button
              onClick={() => setShowCancelDialog(true)}
              disabled={cancelMutation.isPending}
              className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
            >
              {cancelMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column: Progress & Delivery */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stage Progress */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Stage Progress
            </h2>
            <div className="space-y-6">
              {(batch.stages ?? []).map((stage) => (
                <StageProgressComponent
                  key={stage.stage}
                  stage={stage}
                  batchId={batch.batchId}
                />
              ))}
            </div>
          </div>

          {/* Delivery Status */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Delivery Status
            </h2>

            {/* Stacked bar */}
            <div className="mb-4 flex h-4 overflow-hidden rounded-full bg-muted-foreground/20">
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
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message logs by teacher */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                Message logs by teacher
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Live
              </span>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Per-teacher message sends and delivery status — auto-refreshes every 4s
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Teacher</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Contact</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Channel</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Sent at</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {messageLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                        No message logs yet
                      </td>
                    </tr>
                  ) : (
                    messageLogs.map((log, idx) => (
                      <tr
                        key={log.id}
                        className="cursor-pointer hover:bg-muted/30 transition-colors"
                        onClick={() => setMessageModalIndex(idx)}
                      >
                        <td className="whitespace-nowrap px-4 py-2 text-sm font-medium text-foreground">
                          {log.teacherName || "—"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 font-mono text-sm text-foreground">
                          {log.channel === "whatsapp" ? log.teacherPhone || "—" : log.teacherEmail || "—"}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              log.channel === "whatsapp"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {log.channel}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              log.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : log.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-sm text-muted-foreground">
                          {formatDateTime(log.sentAt)}
                        </td>
                        <td className="max-w-xs truncate px-4 py-2 text-sm text-muted-foreground">
                          <span className="text-blue-600 hover:underline">View message</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Message detail modal */}
          {messageModalIndex !== null && messageLogs.length > 0 && (
            <MessageDetailModal
              log={messageLogs[messageModalIndex] as MessageSendLogEntry}
              currentIndex={messageModalIndex}
              total={messageLogs.length}
              onPrev={() => setMessageModalIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
              onNext={() =>
                setMessageModalIndex((i) =>
                  i !== null && i < messageLogs.length - 1 ? i + 1 : i
                )
              }
              onClose={() => setMessageModalIndex(null)}
            />
          )}

          {/* Batch Logs */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <FileText className="h-5 w-5" />
              Batch logs — every step
            </h2>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {batchLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No logs yet</p>
              ) : (
                batchLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      log.step === "message_failed" || log.step === "error"
                        ? "border-red-200 bg-red-50"
                        : "border-gray-100 bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground">{log.message}</p>
                        {log.detail && (
                          <p className="mt-0.5 text-xs text-muted-foreground">{log.detail}</p>
                        )}
                        {log.teacherName && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Teacher: {log.teacherName}
                            {log.teacherPhone && ` | ${log.teacherPhone}`}
                            {log.teacherEmail && ` | ${log.teacherEmail}`}
                            {log.channel && ` | ${log.channel}`}
                          </p>
                        )}
                        {log.messageBody && (
                          <p className="mt-1 rounded bg-card px-2 py-1 text-xs font-mono text-foreground break-all">
                            Body: {log.messageBody}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-muted-foreground/70">{log.timestamp}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-muted-foreground/20 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {log.step}
                      </span>
                    </div>
                  </div>
                ))
              )}
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
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-red-700"
                >
                  View Errors
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Timeline */}
        <div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-foreground">
              Status History
            </h2>
            <StatusTimeline history={batch.statusHistory ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
