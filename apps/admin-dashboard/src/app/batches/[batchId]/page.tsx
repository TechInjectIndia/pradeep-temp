"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/utils/date";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pause, Play, XCircle, RefreshCw, FileText, ChevronLeft, ChevronRight, X, Users, Package, MessageSquare, AlertTriangle, ExternalLink, Copy, Check } from "lucide-react";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import BatchTimeline from "@/components/BatchTimeline";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import type { BatchDetail, MessageSendLogEntry } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useBatch, usePauseBatch, useResumeBatch, useCancelBatch, useCheckAdvanceBatch, useRetryResolution, useRetryOrderCreation, useRetryDispatching } from "@/hooks/useBatches";
import { getBatchLogs, listMessageLogs, getBatchTeachers } from "@/services/api";

function CopyLinkButton({ url, label }: { url: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
      title={url}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : label}
    </button>
  );
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-card shadow-2xl border border-border max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
          <h3 className="text-lg font-semibold text-foreground">Message details</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">From</p>
              <p className="mt-1 text-sm font-medium text-foreground">Specimen Distribution</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">To</p>
              <p className="mt-1 font-mono text-sm text-foreground break-all">{to || "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                "inline-flex rounded-lg px-3 py-1.5 text-sm font-medium",
                log.channel === "whatsapp"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-primary/15 text-primary"
              )}
            >
              {channelLabel}
            </span>
            <span className="text-sm text-muted-foreground">{formatDateTime(log.sentAt)}</span>
          </div>
          {log.subject && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</p>
              <p className="mt-1 text-sm text-foreground">{log.subject}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Message</p>
            <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm text-foreground whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
              {log.messageBody || log.subject || "—"}
            </div>
          </div>
          {log.error && (
            <div className="rounded-xl bg-destructive/10 border border-destructive/20 p-4">
              <p className="text-xs font-medium text-destructive uppercase tracking-wider">Error</p>
              <p className="mt-1 text-sm text-destructive">{log.error}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border/60 gap-4 bg-muted/20">
          <button
            onClick={onPrev}
            disabled={currentIndex <= 0}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} of {total}
          </span>
          <button
            onClick={onNext}
            disabled={currentIndex >= total - 1}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
  const [activeTab, setActiveTab] = useState<"messages" | "logs">("messages");

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
  const { data: teachersData } = useQuery({
    queryKey: ["batchTeachers", batchId],
    queryFn: () => getBatchTeachers(batchId),
    enabled: !!batchId,
  });
  const batchLogs = logsData?.data ?? [];
  const messageLogs = messageLogsData?.data ?? [];
  const batchTeachers = teachersData?.data ?? [];
  const pauseMutation = usePauseBatch();
  const resumeMutation = useResumeBatch();
  const cancelMutation = useCancelBatch();
  const checkAdvanceMutation = useCheckAdvanceBatch();
  const retryResolutionMutation = useRetryResolution();
  const retryOrderCreationMutation = useRetryOrderCreation();
  const retryDispatchingMutation = useRetryDispatching();

  const batch = response;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !batch) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground">Error loading batch</h2>
        <p className="mt-2 text-muted-foreground">
          {(error as Error)?.message || "The batch could not be found."}
        </p>
        <button
          onClick={() => router.push("/batches")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Return to Batches
        </button>
      </div>
    );
  }

  const canPause = ["RESOLVING", "ORDERING", "MESSAGING"].includes(batch.status);
  const canResume = batch.status === "PAUSED";
  const canCancel = !["COMPLETE", "CANCELLED", "FAILED"].includes(batch.status);
  const canRefreshStatus = !["COMPLETE", "CANCELLED", "FAILED"].includes(batch.status);
  const canRetryResolution = batch.status === "RESOLVING";
  const canRetryOrderCreation = batch.status === "ORDERING";
  const canRetryDispatching = batch.status === "MESSAGING";

  const ds = batch.deliveryStatus ?? { delivered: 0, failed: 0, pending: 0 };

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) return;
    cancelMutation.mutate({ batchId, reason: cancelReason.trim() });
    setShowCancelDialog(false);
    setCancelReason("");
  };

  return (
    <div className="min-h-screen">
      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border">
            <h3 className="text-lg font-semibold text-foreground">Cancel Batch</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Please provide a reason for cancelling this batch.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Cancellation reason..."
              rows={3}
              className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 transition-all"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => { setShowCancelDialog(false); setCancelReason(""); }}
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={!cancelReason.trim() || cancelMutation.isPending}
                className="flex items-center gap-2 rounded-xl bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 transition-colors"
              >
                {cancelMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 py-3 sm:px-5 sm:py-4 mb-4">
        <div className="relative">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
              <button
                onClick={() => router.push("/batches")}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0 -ml-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight font-mono truncate">
                {batch.batchId}
              </h1>
              <BatchStateIndicator status={batch.status} size="sm" />
              <span className="text-xs text-muted-foreground">
                · {formatDateTime(batch.createdAt)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          {canRetryResolution && (
            <button
              onClick={() => retryResolutionMutation.mutate(batchId)}
              disabled={retryResolutionMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors"
              title="Run teacher resolution (use when stuck)"
            >
              {retryResolutionMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Retry resolution
            </button>
          )}
          {canRetryOrderCreation && (
            <button
              onClick={() => retryOrderCreationMutation.mutate(batchId)}
              disabled={retryOrderCreationMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors"
              title="Enqueue order creation tasks"
            >
              {retryOrderCreationMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Create orders
            </button>
          )}
          {canRetryDispatching && (
            <button
              onClick={() => retryDispatchingMutation.mutate(batchId)}
              disabled={retryDispatchingMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors"
              title="Enqueue messaging tasks"
            >
              {retryDispatchingMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Dispatch messages
            </button>
          )}
          {canRefreshStatus && (
            <button
              onClick={() => checkAdvanceMutation.mutate(batchId)}
              disabled={checkAdvanceMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted/50 disabled:opacity-50 transition-colors"
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
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 disabled:opacity-50 transition-colors"
            >
              {pauseMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pause className="h-4 w-4" />}
              Pause
            </button>
          )}
          {canResume && (
            <button
              onClick={() => resumeMutation.mutate(batchId)}
              disabled={resumeMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors"
            >
              {resumeMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Resume
            </button>
          )}
          {canCancel && (
            <button
              onClick={() => setShowCancelDialog(true)}
              disabled={cancelMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50 transition-colors"
            >
              {cancelMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
              Cancel
            </button>
          )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats — compact one-line */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 mb-4 rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-bold text-foreground">{batch.teacherCount}</span>
          <span className="text-xs text-muted-foreground">Teachers</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-bold text-foreground">{batch.orderCount}</span>
          <span className="text-xs text-muted-foreground">Orders</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-bold text-foreground">{ds.delivered || 0}</span>
          <span className="text-xs text-muted-foreground">Delivered</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className={clsx("h-3.5 w-3.5", batch.errorCount > 0 ? "text-destructive" : "text-muted-foreground")} />
          <span className="text-sm font-bold text-foreground">{batch.errorCount}</span>
          <span className="text-xs text-muted-foreground">Errors</span>
        </div>
      </div>

      {/* Main content: Timeline + Teachers side by side on large screens */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-6">
        {/* Timeline — left column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Pipeline Timeline */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm min-w-0">
            <div className="px-4 py-3 border-b border-border/60 bg-gradient-to-r from-primary/5 to-transparent">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Batch pipeline
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Resolution → Orders → Aggregation → Messages → Delivery
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <BatchTimeline
                stages={batch.stages ?? []}
                deliveryStatus={batch.deliveryStatus ?? { delivered: 0, failed: 0, pending: 0 }}
                statusHistory={batch.statusHistory ?? []}
                batchId={batch.batchId}
              />
            </div>
          </div>

          {/* Errors Summary — inline with timeline */}
          {batch.errorCount > 0 && (
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-destructive/15 p-2.5">
                    <AlertTriangle className="h-4 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {batch.errorCount} Error{batch.errorCount !== 1 ? "s" : ""}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Some items encountered errors during processing.
                    </p>
                  </div>
                </div>
                <Link
                  href={`/batches/${batch.batchId}/errors`}
                  className="inline-flex items-center justify-center rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors shrink-0"
                >
                  View Errors
                </Link>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 rounded-lg bg-muted/40 p-1">
            {(["messages", "logs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "messages" ? "Message logs" : "Batch logs"}
              </button>
            ))}
          </div>

          {activeTab === "messages" && (
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Message logs</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">Per-teacher sends — auto-refreshes every 4s</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-muted/60 z-10">
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Teacher</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channel</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sent</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {messageLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                          No message logs yet
                        </td>
                      </tr>
                    ) : (
                      messageLogs.map((log, idx) => (
                        <tr
                          key={log.id}
                          className="cursor-pointer hover:bg-muted/30 transition-colors group"
                          onClick={() => setMessageModalIndex(idx)}
                        >
                          <td className="whitespace-nowrap px-4 py-2.5 text-sm font-medium text-foreground">
                            {log.teacherName || "—"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-foreground">
                            {log.channel === "whatsapp" ? log.teacherPhone || "—" : log.teacherEmail || "—"}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2.5">
                            <span
                              className={clsx(
                                "inline-flex rounded-lg px-2.5 py-1 text-xs font-medium",
                                log.channel === "whatsapp"
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  : "bg-primary/15 text-primary"
                              )}
                            >
                              {log.channel}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2.5">
                            <span
                              className={clsx(
                                "inline-flex rounded-lg px-2.5 py-1 text-xs font-medium",
                                log.status === "failed"
                                  ? "bg-destructive/15 text-destructive"
                                  : log.status === "delivered"
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                    : "bg-muted text-muted-foreground"
                              )}
                            >
                              {log.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted-foreground">
                            {formatDateTime(log.sentAt)}
                          </td>
                          <td className="px-4 py-2.5">
                            <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              View →
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-border/60">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wider">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Batch logs
                </h2>
              </div>
              <div className="max-h-[420px] overflow-y-auto p-4 space-y-2">
                {batchLogs.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">No logs yet</p>
                ) : (
                  batchLogs.map((log) => (
                    <div
                      key={log.id}
                      className={clsx(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
                        log.step === "message_failed" || log.step === "error"
                          ? "border border-destructive/20 bg-destructive/5"
                          : "bg-muted/30"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground">{log.message}</p>
                          {log.detail && <p className="mt-0.5 text-xs text-muted-foreground">{log.detail}</p>}
                          {log.teacherName && (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {log.teacherName}
                              {log.teacherPhone && ` · ${log.teacherPhone}`}
                              {log.teacherEmail && ` · ${log.teacherEmail}`}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-muted-foreground/70">{log.timestamp}</p>
                        </div>
                        <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          {log.step}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Teachers & Orders — right column, sticky */}
        <div className="lg:col-span-2 lg:sticky lg:top-8">
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm h-fit">
            <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                Teachers & Orders
              </h2>
              <span className="text-xs text-muted-foreground">{batchTeachers.length} teacher{batchTeachers.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="max-h-[480px] overflow-auto">
              {batchTeachers.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No teachers in this batch yet.
                </div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur-sm">
                    <tr className="border-b border-border">
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Teacher</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                      <th className="px-3 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Orders</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {batchTeachers.map((t) => (
                      <tr key={t.teacherRecordId} className="hover:bg-muted/20 transition-colors">
                        <td className="px-3 py-2 font-medium text-foreground text-xs">{t.teacherName}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">
                          <div className="space-y-0.5">
                            <div className="font-mono truncate max-w-[140px]" title={t.teacherPhone}>{t.teacherPhone}</div>
                            <div className="font-mono truncate max-w-[140px] text-muted-foreground/80" title={t.teacherEmail}>{t.teacherEmail}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex flex-wrap gap-1.5">
                            {t.orders.map((o) => (
                              <div key={o.productId} className="inline-flex items-center gap-1 rounded-md bg-muted/50 px-2 py-1">
                                <span className="text-xs font-medium text-foreground truncate max-w-[90px]" title={o.title}>{o.title}</span>
                                {o.link ? (
                                  <>
                                    <a href={o.link} target="_blank" rel="noopener noreferrer" className="text-primary shrink-0" title="Open"><ExternalLink className="h-3 w-3" /></a>
                                    <CopyLinkButton url={o.link} label="Copy" />
                                  </>
                                ) : (
                                  <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Pending</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message detail modal — always available */}
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
    </div>
  );
}
