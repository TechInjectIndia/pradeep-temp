"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTriggers } from "@/hooks/useTriggers";
import { useCancelBatch, useCheckAdvanceBatch, useRetryBatchErrors } from "@/hooks/useBatches";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import SkeletonTable from "@/components/SkeletonTable";
import { formatDateTime } from "@/utils/date";
import { useQueryClient } from "@tanstack/react-query";
import type { Trigger, TriggerBatch } from "@/types";
import { clsx } from "clsx";

const TERMINAL = new Set(["COMPLETE", "FAILED", "CANCELLED", "PARTIAL_FAILURE"]);

function overallStatusColor(status: string) {
  if (status === 'COMPLETE') return 'bg-green-100 text-green-700';
  if (status === 'FAILED') return 'bg-red-100 text-red-700';
  if (status === 'PARTIAL_FAILURE') return 'bg-orange-100 text-orange-700';
  if (status === 'CANCELLED') return 'bg-muted text-muted-foreground';
  return 'bg-blue-100 text-blue-700';
}

function overallStatusLabel(status: string) {
  if (status === 'IN_PROGRESS') return 'In Progress';
  return status.replace(/_/g, ' ');
}

export default function BatchesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [cancelling, setCancelling] = useState<Set<string>>(new Set());
  const cancelBatch = useCancelBatch();
  const advanceBatch = useCheckAdvanceBatch();
  const retryErrors = useRetryBatchErrors();

  const { data: response, isLoading } = useTriggers({ page, pageSize });
  const triggers = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = response?.totalPages ?? 1;

  const toggleExpand = (triggerId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(triggerId)) next.delete(triggerId);
      else next.add(triggerId);
      return next;
    });
  };

  async function cancelAllBatches(trigger: Trigger) {
    const activeBatches = trigger.batches.filter((b) => !TERMINAL.has(b.status));
    if (activeBatches.length === 0) return;
    setCancelling((prev) => new Set(prev).add(trigger.triggerId));
    try {
      await Promise.all(
        activeBatches.map((b) =>
          cancelBatch.mutateAsync({ batchId: b.id, reason: "Cancelled from Triggers page" })
        )
      );
      queryClient.invalidateQueries({ queryKey: ["triggers"] });
    } finally {
      setCancelling((prev) => { const n = new Set(prev); n.delete(trigger.triggerId); return n; });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Triggers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Each trigger is one file upload — expand to see its batches
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{total} trigger{total !== 1 ? 's' : ''}</span>
      </div>

      {isLoading ? (
        <SkeletonTable rows={8} cols={5} />
      ) : (
        <div className="space-y-2">
          {triggers.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">No triggers yet.</p>
          )}
          {triggers.map((trigger, triggerIdx) => {
            const triggerSeqId = (page - 1) * pageSize + triggerIdx + 1;
            return (
            <div key={trigger.triggerId} className="rounded-xl border border-border bg-card overflow-hidden">
              {/* Trigger header row */}
              <div className="flex items-center">
                <button
                  onClick={() => toggleExpand(trigger.triggerId)}
                  className="flex-1 flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors min-w-0"
                >
                  <span className="text-muted-foreground text-sm w-4 shrink-0">
                    {expanded.has(trigger.triggerId) ? '▾' : '▸'}
                  </span>
                  <span className="font-mono text-xs bg-muted border border-border text-muted-foreground px-2 py-0.5 rounded-md shrink-0">
                    T-{triggerSeqId}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {trigger.fileName ?? trigger.triggerId}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDateTime(trigger.createdAt)}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground shrink-0">
                    <span>{trigger.batchCount} batch{trigger.batchCount !== 1 ? 'es' : ''}</span>
                    <span>{trigger.totalTeachers} teachers</span>
                    <span>{trigger.totalMessages} msgs</span>
                  </div>
                  <span className={clsx(
                    'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0',
                    overallStatusColor(trigger.overallStatus)
                  )}>
                    {overallStatusLabel(trigger.overallStatus)}
                  </span>
                </button>
                {/* Cancel all button — only shown if any batch is non-terminal */}
                {trigger.batches.some((b) => !TERMINAL.has(b.status)) && (
                  <button
                    onClick={(e) => { e.stopPropagation(); cancelAllBatches(trigger); }}
                    disabled={cancelling.has(trigger.triggerId)}
                    className="shrink-0 mr-3 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
                  >
                    {cancelling.has(trigger.triggerId) ? "Cancelling…" : "Cancel All"}
                  </button>
                )}
              </div>

              {/* Expanded batch list */}
              {expanded.has(trigger.triggerId) && (
                <div className="border-t border-border divide-y divide-border">
                  {trigger.batches.map((batch, idx) => (
                    <div
                      key={batch.id}
                      className="flex items-center gap-3 px-4 py-2.5 pl-10 hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-xs text-muted-foreground w-6 shrink-0">
                        {idx + 1}.
                      </span>
                      <span
                        className="font-mono text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-md cursor-pointer hover:bg-blue-100"
                        onClick={() => router.push(`/batches/${batch.seqId}`)}
                      >
                        #{batch.seqId}
                      </span>
                      <div
                        className="flex-1 text-xs text-muted-foreground cursor-pointer"
                        onClick={() => router.push(`/batches/${batch.seqId}`)}
                      >
                        {batch.stats?.totalTeachers ?? 0} teachers
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {batch.stats?.messagesQueued ?? 0} msgs
                      </div>
                      <BatchStateIndicator status={batch.status as any} />
                      {/* Retry / Advance button for non-terminal batches */}
                      {batch.status === 'PARTIAL_FAILURE' || batch.status === 'FAILED' ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); retryErrors.mutate({ batchId: batch.id }); }}
                          className="shrink-0 rounded border border-orange-300 px-2 py-0.5 text-[11px] font-medium text-orange-600 hover:bg-orange-50 transition-colors"
                        >
                          Retry Errors
                        </button>
                      ) : !TERMINAL.has(batch.status) ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); advanceBatch.mutate(batch.id); }}
                          className="shrink-0 rounded border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-muted transition-colors"
                        >
                          Advance
                        </button>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )})}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
