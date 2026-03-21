"use client";

import { useState, useEffect } from "react";
import { formatDateTime } from "@/utils/date";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Pause, Play, XCircle, RefreshCw, FileText,
  ChevronLeft, ChevronRight, X, Users, Package,
  MessageSquare, AlertTriangle, Link2,
} from "lucide-react";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import SkeletonTable from "@/components/SkeletonTable";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import type { BatchLogEntry, StatusHistoryEntry } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  useBatch, usePauseBatch, useResumeBatch, useCancelBatch,
  useRetryResolution, useRetryOrderCreation, useRetryDispatching,
} from "@/hooks/useBatches";
import { getBatchLogs, getBatchTeachers, listCommLogs, type CommLogEntry } from "@/services/api";

export default function BatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.batchId as string;

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [activeTab, setActiveTab] = useState<"logs" | "messages" | "teachers">("messages");
  const [teachersPage, setTeachersPage] = useState(1);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesChannel, setMessagesChannel] = useState<"" | "WHATSAPP" | "EMAIL">("");
  const TEACHERS_PAGE_SIZE = 100;
  const MESSAGES_PAGE_SIZE = 50;

  const { data: batch, isLoading, error } = useBatch(batchId);

  const { data: logsData } = useQuery({
    queryKey: ["batchLogs", batchId],
    queryFn: () => getBatchLogs(batchId, { pageSize: 200 }),
    enabled: !!batchId,
    refetchInterval: 5000,
  });

  const { data: teachersData } = useQuery({
    queryKey: ["batchTeachers", batchId, teachersPage],
    queryFn: () => getBatchTeachers(batchId, { page: teachersPage, pageSize: TEACHERS_PAGE_SIZE }),
    enabled: !!batchId,
  });

  const { data: messagesData } = useQuery({
    queryKey: ["batchMessages", batchId, messagesPage, messagesChannel],
    queryFn: () => listCommLogs({
      batchId,
      page: messagesPage,
      pageSize: MESSAGES_PAGE_SIZE,
      ...(messagesChannel ? { channel: messagesChannel } : {}),
    }),
    enabled: !!batchId,
    refetchInterval: 5000,
  });

  const batchLogs = logsData?.data ?? [];
  const batchTeachers = teachersData?.data ?? [];
  const batchMessages = messagesData?.data ?? [];

  const pauseMutation = usePauseBatch();
  const resumeMutation = useResumeBatch();
  const cancelMutation = useCancelBatch();
  const retryResolutionMutation = useRetryResolution();
  const retryOrderCreationMutation = useRetryOrderCreation();
  const retryDispatchingMutation = useRetryDispatching();

  if (isLoading) return <SkeletonTable rows={6} cols={4} />;

  if (error || !batch) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground">Error loading batch</h2>
        <p className="mt-2 text-muted-foreground">
          {(error as Error)?.message ?? "The batch could not be found."}
        </p>
        <button onClick={() => router.push("/batches")} className="mt-4 text-sm font-medium text-primary hover:underline">
          Return to Batches
        </button>
      </div>
    );
  }

  const canPause = ["RESOLVING", "ORDERING", "MESSAGING"].includes(batch.status);
  const canResume = batch.status === "PAUSED";
  const canCancel = !["COMPLETE", "CANCELLED", "FAILED"].includes(batch.status);
  const canRetryResolution = batch.status === "RESOLVING";
  const canRetryOrderCreation = batch.status === "ORDERING";
  const canRetryDispatching = batch.status === "MESSAGING";

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) return;
    cancelMutation.mutate({ batchId, reason: cancelReason.trim() });
    setShowCancelDialog(false);
    setCancelReason("");
  };

  const stats = batch.stats ?? {};

  return (
    <div className="space-y-4">
      {/* Cancel Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl border border-border">
            <h3 className="text-lg font-semibold text-foreground">Cancel Batch</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please provide a reason.</p>
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
      <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <button
              onClick={() => router.push("/batches")}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
            {batch.displayId && (
              <span className="text-sm font-semibold text-foreground">{batch.displayId}</span>
            )}
            <h1 className="text-lg font-bold text-foreground font-mono truncate">{batch.id}</h1>
            <BatchStateIndicator status={batch.status} size="sm" />
            {batch.fileName && (
              <span className="text-xs text-muted-foreground">· {batch.fileName}</span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {canRetryResolution && (
              <button onClick={() => retryResolutionMutation.mutate(batchId)} disabled={retryResolutionMutation.isPending}
                className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors">
                {retryResolutionMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                Retry resolution
              </button>
            )}
            {canRetryOrderCreation && (
              <button onClick={() => retryOrderCreationMutation.mutate(batchId)} disabled={retryOrderCreationMutation.isPending}
                className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors">
                {retryOrderCreationMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                Create orders
              </button>
            )}
            {canRetryDispatching && (
              <button onClick={() => retryDispatchingMutation.mutate(batchId)} disabled={retryDispatchingMutation.isPending}
                className="flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50 transition-colors">
                {retryDispatchingMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
                Dispatch messages
              </button>
            )}
            {canPause && (
              <button onClick={() => pauseMutation.mutate(batchId)} disabled={pauseMutation.isPending}
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 disabled:opacity-50 transition-colors">
                {pauseMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Pause className="h-3.5 w-3.5" />}
                Pause
              </button>
            )}
            {canResume && (
              <button onClick={() => resumeMutation.mutate(batchId)} disabled={resumeMutation.isPending}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50 transition-colors">
                {resumeMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                Resume
              </button>
            )}
            {canCancel && (
              <button onClick={() => setShowCancelDialog(true)} disabled={cancelMutation.isPending}
                className="flex items-center gap-1.5 rounded-lg border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50 transition-colors">
                {cancelMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-6 flex-wrap">
          {/* Stats */}
          {[
            { icon: <Users className="h-3.5 w-3.5" />, value: stats.totalTeachers ?? 0, label: "Teachers" },
            { icon: <Package className="h-3.5 w-3.5" />, value: stats.ordersCreated ?? 0, label: "Orders" },
            { icon: <MessageSquare className="h-3.5 w-3.5" />, value: stats.messagesProcessed ?? stats.messagesDelivered ?? 0, label: "Sent" },
            { icon: <AlertTriangle className="h-3.5 w-3.5" />, value: stats.dlqMessages ?? 0, label: "DLQ" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-muted-foreground">{s.icon}</span>
              <span className="text-sm font-bold text-foreground">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}

          {/* Pipeline — right side */}
          <div className="ml-auto flex items-center gap-0 shrink-0">
            {PIPELINE_STAGES.map((stage, i) => {
              const state = getStageState(stage, batch.status, batch.statusHistory);
              return (
                <div key={stage} className="flex items-center">
                  <div className={clsx(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold",
                    state === "completed" && "bg-emerald-500 text-white",
                    state === "active" && "bg-primary text-primary-foreground ring-2 ring-primary/20",
                    state === "pending" && "bg-muted text-muted-foreground"
                  )}>
                    {state === "completed" ? "✓" : i + 1}
                  </div>
                  {i < PIPELINE_STAGES.length - 1 && (
                    <div className={clsx("mx-0.5 h-px w-4", state === "completed" ? "bg-emerald-500" : "bg-border")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-muted/40 p-1">
        {(["messages", "logs", "teachers"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={clsx(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}>
            {tab === "messages" ? `Messages (${messagesData?.total ?? 0})`
              : tab === "logs" ? "Batch Logs"
              : `Teachers (${teachersData?.total ?? batchTeachers.length})`}
          </button>
        ))}
      </div>

      {/* Messages */}
      {activeTab === "messages" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-border/60 flex flex-wrap items-center gap-3">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Message Logs</h2>
            <div className="flex items-center gap-1.5 ml-auto">
              <select
                value={messagesChannel}
                onChange={(e) => { setMessagesChannel(e.target.value as "" | "WHATSAPP" | "EMAIL"); setMessagesPage(1); }}
                className="rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">All Channels</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="EMAIL">Email</option>
              </select>
              <span className="text-xs text-muted-foreground">{messagesData?.total ?? 0} total</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            {batchMessages.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No messages yet</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-muted/60 z-10">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Teacher</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channel</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Attempts</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {batchMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 text-xs font-medium text-foreground">{msg.teacherName ?? "—"}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                        {msg.channel === "WHATSAPP" ? msg.teacherPhone : msg.teacherEmail}
                      </td>
                      <td className="px-4 py-2">
                        <span className={clsx(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          msg.channel === "WHATSAPP"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        )}>
                          {msg.channel}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className={clsx(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          msg.status === "SENT" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                          msg.status === "DELIVERED" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                          msg.status === "QUEUED" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                          msg.status === "FAILED" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                          msg.status === "DLQ" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                          msg.status === "CANCELLED" && "bg-muted text-muted-foreground",
                        )}>
                          {msg.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-xs text-muted-foreground">{msg.attemptCount}</td>
                      <td className="px-4 py-2 text-xs text-red-500 max-w-[200px] truncate" title={msg.lastError}>
                        {msg.lastError || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Pagination */}
          {(messagesData?.total ?? 0) > MESSAGES_PAGE_SIZE && (
            <div className="flex items-center justify-between border-t border-border/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Page {messagesPage} of {Math.ceil((messagesData?.total ?? 0) / MESSAGES_PAGE_SIZE)}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessagesPage((p) => Math.max(1, p - 1))}
                  disabled={messagesPage <= 1}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >Prev</button>
                <button
                  onClick={() => setMessagesPage((p) => p + 1)}
                  disabled={messagesPage >= Math.ceil((messagesData?.total ?? 0) / MESSAGES_PAGE_SIZE)}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Batch Logs */}
      {activeTab === "logs" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Batch Logs</h2>
            <span className="ml-auto text-xs text-muted-foreground">{batchLogs.length} entries · refreshes every 5s</span>
          </div>
          <div className="max-h-[480px] overflow-y-auto p-4 space-y-2">
            {batchLogs.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No logs yet</p>
            ) : (
              batchLogs.map((log) => (
                <div key={log.id}
                  className={clsx(
                    "rounded-lg px-3 py-2 text-sm",
                    log.step === "message_failed" || log.step === "error"
                      ? "border border-destructive/20 bg-destructive/5"
                      : "bg-muted/30"
                  )}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{log.message}</p>
                      {log.detail && <p className="mt-0.5 text-xs text-muted-foreground">{log.detail}</p>}
                      {log.teacherName && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {log.teacherName}{log.teacherPhone && ` · ${log.teacherPhone}`}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground/70">{formatDateTime(log.loggedAt)}</p>
                    </div>
                    <span className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{log.step}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Teachers */}
      {activeTab === "teachers" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Teachers</h2>
            <span className="ml-auto text-xs text-muted-foreground">
              {teachersData?.total ?? 0} total
            </span>
          </div>
          <div className="overflow-x-auto max-h-[560px] overflow-y-auto">
            {batchTeachers.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">No teachers yet</p>
            ) : (
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-muted/60 z-10">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">School</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {batchTeachers.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 text-xs text-muted-foreground">{(teachersPage - 1) * TEACHERS_PAGE_SIZE + idx + 1}</td>
                      <td className="px-4 py-2 font-medium text-foreground text-xs">{t.name ?? "—"}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{t.phone || "—"}</td>
                      <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{t.email || "—"}</td>
                      <td className="px-4 py-2 text-xs text-muted-foreground">{t.school || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* Pagination */}
          {(teachersData?.totalPages ?? 1) > 1 && (
            <div className="flex items-center justify-between border-t border-border/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Page {teachersPage} of {teachersData?.totalPages ?? 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTeachersPage(1)}
                  disabled={teachersPage <= 1}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >«</button>
                <button
                  onClick={() => setTeachersPage((p) => p - 1)}
                  disabled={teachersPage <= 1}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >‹ Prev</button>
                <button
                  onClick={() => setTeachersPage((p) => p + 1)}
                  disabled={teachersPage >= (teachersData?.totalPages ?? 1)}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >Next ›</button>
                <button
                  onClick={() => setTeachersPage(teachersData?.totalPages ?? 1)}
                  disabled={teachersPage >= (teachersData?.totalPages ?? 1)}
                  className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >»</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Pipeline Stage Timeline ─────────────────────────────────────────────────

const PIPELINE_STAGES = ["UPLOAD", "ORDERING", "MESSAGING", "COMPLETE"] as const;

const STAGE_STATUS_MAP: Record<string, string> = {
  UPLOADED: "UPLOAD",
  VALIDATING: "UPLOAD",
  RESOLVING: "UPLOAD",
  ORDERING: "ORDERING",
  CREATING_ORDERS: "ORDERING",
  AGGREGATING: "ORDERING",
  MESSAGING: "MESSAGING",
  DISPATCHING: "MESSAGING",
  COMPLETE: "COMPLETE",
  PARTIAL_FAILURE: "COMPLETE",
};

function getStageState(
  stage: string,
  currentStatus: string,
  statusHistory?: StatusHistoryEntry[]
): "completed" | "active" | "pending" {
  const currentPipelineStage = STAGE_STATUS_MAP[currentStatus];
  const stageIndex = PIPELINE_STAGES.indexOf(stage as typeof PIPELINE_STAGES[number]);
  const currentIndex = PIPELINE_STAGES.indexOf(currentPipelineStage as typeof PIPELINE_STAGES[number]);

  if (currentIndex < 0) return "pending";
  if (stageIndex < currentIndex) return "completed";
  if (stageIndex === currentIndex) return "active";

  // Check statusHistory for past completions
  if (statusHistory) {
    const historyStatuses = statusHistory.map((h) => STAGE_STATUS_MAP[h.to]).filter(Boolean);
    if (historyStatuses.includes(stage)) return "completed";
  }

  return "pending";
}

function PipelineTimeline({
  status,
  statusHistory,
}: {
  status: string;
  statusHistory?: StatusHistoryEntry[];
}) {
  if (["CANCELLED", "FAILED", "PAUSED"].includes(status)) {
    // Still show timeline but mark appropriately
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground uppercase tracking-wider">Pipeline</h2>
      <div className="flex items-center gap-0">
        {PIPELINE_STAGES.map((stage, i) => {
          const state = getStageState(stage, status, statusHistory);
          return (
            <div key={stage} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    state === "completed" && "bg-emerald-500 text-white",
                    state === "active" && "bg-blue-500 text-white ring-4 ring-blue-500/20",
                    state === "pending" && "bg-muted text-muted-foreground"
                  )}
                >
                  {state === "completed" ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={clsx(
                    "mt-1.5 text-xs font-medium",
                    state === "completed" && "text-emerald-600 dark:text-emerald-400",
                    state === "active" && "text-blue-600 dark:text-blue-400",
                    state === "pending" && "text-muted-foreground"
                  )}
                >
                  {stage}
                </span>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <div
                  className={clsx(
                    "mx-1 h-0.5 w-8 sm:w-12 transition-colors",
                    state === "completed" ? "bg-emerald-500" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
