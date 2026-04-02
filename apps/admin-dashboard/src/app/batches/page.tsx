"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTriggers } from "@/hooks/useTriggers";
import BatchStateIndicator from "@/components/BatchStateIndicator";
import SkeletonTable from "@/components/SkeletonTable";
import { formatDate } from "@/utils/date";
import type { Trigger, TriggerBatch } from "@/types";
import { clsx } from "clsx";

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
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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
              <button
                onClick={() => toggleExpand(trigger.triggerId)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
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
                  <p className="text-xs text-muted-foreground">{formatDate(trigger.createdAt)}</p>
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

              {/* Expanded batch list */}
              {expanded.has(trigger.triggerId) && (
                <div className="border-t border-border divide-y divide-border">
                  {trigger.batches.map((batch, idx) => (
                    <div
                      key={batch.id}
                      onClick={() => router.push(`/batches/${batch.seqId}`)}
                      className="flex items-center gap-3 px-4 py-2.5 pl-10 hover:bg-muted/30 cursor-pointer transition-colors"
                    >
                      <span className="text-xs text-muted-foreground w-6 shrink-0">
                        {idx + 1}.
                      </span>
                      <span className="font-mono text-xs bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-md">
                        #{batch.seqId}
                      </span>
                      <div className="flex-1 text-xs text-muted-foreground">
                        {batch.stats?.totalTeachers ?? 0} teachers
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {batch.stats?.messagesQueued ?? 0} msgs
                      </div>
                      <BatchStateIndicator status={batch.status as any} />
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
