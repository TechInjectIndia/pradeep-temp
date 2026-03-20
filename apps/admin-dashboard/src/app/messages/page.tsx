"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { formatDateTime } from "@/utils/date";
import { listCommLogs, type CommLogEntry, type BatchCommSummary } from "@/services/api";
import LoadingSpinner from "@/components/LoadingSpinner";

const STATUS_COLORS: Record<string, string> = {
  QUEUED:    "bg-yellow-100 text-yellow-800",
  SENT:      "bg-green-100 text-green-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  FAILED:    "bg-red-100 text-red-800",
  DLQ:       "bg-red-200 text-red-900",
  CANCELLED: "bg-gray-100 text-gray-600",
  SKIPPED:   "bg-gray-100 text-gray-500",
};

const CHANNEL_COLORS: Record<string, string> = {
  WHATSAPP: "bg-green-50 text-green-700 border border-green-200",
  EMAIL:    "bg-blue-50 text-blue-700 border border-blue-200",
};

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"batches" | "logs">("batches");
  const [batchFilter, setBatchFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState<"WHATSAPP" | "EMAIL" | "">("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const { data, isLoading, isError, error, dataUpdatedAt } = useQuery({
    queryKey: ["commLogs", batchFilter, channelFilter, statusFilter, page],
    queryFn: () =>
      listCommLogs({
        batchId: batchFilter || undefined,
        channel: channelFilter || undefined,
        status: statusFilter || undefined,
        page,
        pageSize,
      }),
    refetchInterval: 5000, // auto-refresh every 5s
    retry: 1,             // fail fast — don't spin for 30s on backend down
  });

  const logs = data?.data ?? [];
  const batchSummary = data?.batchSummary ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—";

  // Grand totals across all batches
  const grandTotal = batchSummary.reduce(
    (acc, b) => ({
      queued: acc.queued + b.queued,
      sent: acc.sent + b.sent,
      failed: acc.failed + b.failed,
      dlq: acc.dlq + b.dlq,
      total: acc.total + b.total,
    }),
    { queued: 0, sent: 0, failed: 0, dlq: 0, total: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live queue status — WhatsApp & Email sends tracked per batch
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Auto-refreshing · last at {lastUpdated}
        </div>
      </div>

      {/* Grand totals */}
      {batchSummary.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: "Total", value: grandTotal.total, color: "text-foreground" },
            { label: "Queued", value: grandTotal.queued, color: "text-yellow-600" },
            { label: "Sent", value: grandTotal.sent, color: "text-green-600" },
            { label: "Failed", value: grandTotal.failed, color: "text-red-600" },
            { label: "DLQ", value: grandTotal.dlq, color: "text-red-800" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-border">
        {(["batches", "logs"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "batches" ? "Batch Progress" : `All Logs (${total})`}
          </button>
        ))}
      </div>

      {isError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          <strong>Cannot connect to backend.</strong>{" "}
          {error instanceof Error ? error.message : "Unknown error"}<br />
          <span className="text-xs text-red-500 mt-1 block">
            Make sure the backend server is running: <code className="font-mono">bun run dev</code> in <code className="font-mono">apps/backend</code>
          </span>
        </div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {activeTab === "batches" && (
            <BatchProgressView batches={batchSummary} />
          )}

          {activeTab === "logs" && (
            <>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Filter by batch ID…"
                  value={batchFilter}
                  onChange={(e) => { setBatchFilter(e.target.value); setPage(1); }}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-52 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <select
                  value={channelFilter}
                  onChange={(e) => { setChannelFilter(e.target.value as "WHATSAPP" | "EMAIL" | ""); setPage(1); }}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Channels</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="EMAIL">Email</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  {["QUEUED", "SENT", "DELIVERED", "FAILED", "DLQ"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <LogsTable logs={logs} />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{total} total · page {page}/{totalPages}</span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="rounded border border-border px-3 py-1 disabled:opacity-40 hover:bg-muted"
                    >
                      Prev
                    </button>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                      className="rounded border border-border px-3 py-1 disabled:opacity-40 hover:bg-muted"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─── Batch Progress View ───────────────────────────────────────────────────────

function BatchProgressView({ batches }: { batches: BatchCommSummary[] }) {
  if (batches.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        No messages queued yet. Upload a batch and start the pipeline to see progress here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {batches.map((b) => {
        const sentPct = b.total > 0 ? Math.round(((b.sent + b.delivered) / b.total) * 100) : 0;
        const failPct = b.total > 0 ? Math.round(((b.failed + b.dlq) / b.total) * 100) : 0;
        const queuePct = b.total > 0 ? Math.round((b.queued / b.total) * 100) : 0;

        return (
          <div key={b.batchId} className="rounded-xl border border-border bg-card shadow-sm p-5 space-y-4">
            {/* Batch header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <Link
                  href={`/batches/${b.batchId}`}
                  className="font-mono text-sm font-semibold text-blue-600 hover:underline"
                >
                  {b.batchId}
                </Link>
                {b.fileName && b.fileName !== b.batchId && (
                  <div className="text-xs text-muted-foreground mt-0.5">{b.fileName}</div>
                )}
              </div>
              <div className="flex gap-2 text-xs font-medium shrink-0">
                <span className="rounded-full px-2 py-0.5 bg-yellow-100 text-yellow-800">{b.queued} queued</span>
                <span className="rounded-full px-2 py-0.5 bg-green-100 text-green-800">{b.sent + b.delivered} sent</span>
                {(b.failed + b.dlq) > 0 && (
                  <span className="rounded-full px-2 py-0.5 bg-red-100 text-red-800">{b.failed + b.dlq} failed</span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{sentPct}% delivered</span>
                <span>{b.total} total</span>
              </div>
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
                <div className="h-full bg-green-500 transition-all" style={{ width: `${sentPct}%` }} />
                <div className="h-full bg-red-400 transition-all" style={{ width: `${failPct}%` }} />
                <div className="h-full bg-yellow-300 transition-all" style={{ width: `${queuePct}%` }} />
              </div>
              <div className="flex gap-4 mt-1.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-green-500" />Sent</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-400" />Failed</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-yellow-300" />Queued</span>
              </div>
            </div>

            {/* Per-channel breakdown */}
            <div className="grid grid-cols-5 gap-2 text-center text-xs">
              {[
                { label: "Total",   value: b.total,              color: "text-foreground" },
                { label: "Queued",  value: b.queued,             color: "text-yellow-600" },
                { label: "Sent",    value: b.sent + b.delivered, color: "text-green-600" },
                { label: "Failed",  value: b.failed,             color: "text-red-600" },
                { label: "DLQ",     value: b.dlq,                color: "text-red-800" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border py-2">
                  <div className={`font-bold text-base ${s.color}`}>{s.value}</div>
                  <div className="text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Logs Table ───────────────────────────────────────────────────────────────

function LogsTable({ logs }: { logs: CommLogEntry[] }) {
  if (logs.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center text-sm text-muted-foreground">
        No message logs match the current filters.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Batch</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Teacher</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Contact</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Ch</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Attempts</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Last attempt</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">Error</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-muted/40">
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <Link
                    href={`/batches/${log.batchId}`}
                    className="font-mono text-xs font-medium text-blue-600 hover:underline"
                  >
                    {log.batchId.slice(0, 16)}…
                  </Link>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-foreground">
                  {log.teacherName ?? "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                  {log.channel === "WHATSAPP" ? log.teacherPhone : log.teacherEmail}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${CHANNEL_COLORS[log.channel] ?? ""}`}>
                    {log.channel === "WHATSAPP" ? "WA" : "✉"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[log.status] ?? "bg-muted text-foreground"}`}>
                    {log.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-center text-muted-foreground">
                  {log.attemptCount}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                  {log.lastAttemptAt ? formatDateTime(log.lastAttemptAt) : "—"}
                </td>
                <td className="max-w-xs px-4 py-3 text-xs text-red-600 truncate" title={log.lastError ?? ""}>
                  {log.lastError ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
