"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { formatDateTime } from "@/utils/date";
import { listMessageLogs, listBatches } from "@/services/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import type {
  MessageSendLogEntry,
  ContactSummary,
} from "@/types";

export default function MessageLogsPage() {
  const [batchFilter, setBatchFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState<"whatsapp" | "email" | "">("");
  const [activeTab, setActiveTab] = useState<"summary" | "logs">("summary");

  const { data: response, isLoading } = useQuery({
    queryKey: ["messageLogs", batchFilter || undefined, channelFilter || undefined],
    queryFn: () =>
      listMessageLogs({
        batchId: batchFilter || undefined,
        channel: channelFilter || undefined,
        limit: 300,
      }),
  });

  const { data: batchesRes } = useQuery({
    queryKey: ["batches-list"],
    queryFn: () => listBatches({ pageSize: 100 }),
  });

  const logs = response?.data ?? [];
  const summary = response?.summary;
  const batches = batchesRes?.data.map((b) => b.batchId) || [];

  const byPhone = summary?.byPhone ?? [];
  const byEmail = summary?.byEmail ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Message Logs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Logs of every mail and WhatsApp sent — per number, per email, per batch
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={channelFilter}
          onChange={(e) =>
            setChannelFilter(e.target.value as "whatsapp" | "email" | "")
          }
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Channels</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
        </select>

        <div className="flex rounded-lg border border-border bg-muted/50 p-1">
          <button
            onClick={() => setActiveTab("summary")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              activeTab === "summary"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              activeTab === "logs"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Logs ({logs.length})
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {activeTab === "summary" && (
            <SummaryView byPhone={byPhone} byEmail={byEmail} />
          )}
          {activeTab === "logs" && <LogsTable logs={logs} />}
        </>
      )}
    </div>
  );
}

function SummaryView({
  byPhone,
  byEmail,
}: {
  byPhone: ContactSummary[];
  byEmail: ContactSummary[];
}) {
  return (
    <div className="space-y-6">
      {/* Per-number summary */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <h2 className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
          WhatsApp — Per Number
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Contact (phone)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Messages sent
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Batches
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Teacher(s)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Last sent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {byPhone.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No WhatsApp sends yet
                  </td>
                </tr>
              ) : (
                byPhone.map((row) => (
                  <tr key={row.contact}>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-sm text-foreground">
                      {row.contact}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-foreground">
                      {row.count}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {row.batches.map((b) => (
                          <Link
                            key={b}
                            href={`/batches/${b}`}
                            className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-100"
                          >
                            {b}
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-muted-foreground">
                      {row.teacherNames.join(", ") || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-muted-foreground">
                      {formatDateTime(row.lastSentAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-email summary */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <h2 className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground">
          Email — Per Address
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Contact (email)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Messages sent
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Batches
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Teacher(s)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground">
                  Last sent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {byEmail.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No email sends yet
                  </td>
                </tr>
              ) : (
                byEmail.map((row) => (
                  <tr key={row.contact}>
                    <td className="whitespace-nowrap px-4 py-2 font-mono text-sm text-foreground">
                      {row.contact}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-foreground">
                      {row.count}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {row.batches.map((b) => (
                          <Link
                            key={b}
                            href={`/batches/${b}`}
                            className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-100"
                          >
                            {b}
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm text-muted-foreground">
                      {row.teacherNames.join(", ") || "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-sm text-muted-foreground">
                      {formatDateTime(row.lastSentAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LogsTable({ logs }: { logs: MessageSendLogEntry[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Batch
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Teacher
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Contact (chosen)
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Channel
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Sent at
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-muted-foreground">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-sm text-muted-foreground"
                >
                  No message logs found
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-muted/50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <Link
                      href={`/batches/${log.batchId}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {log.batchId}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-foreground">
                    {log.teacherName || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-foreground">
                    {log.channel === "whatsapp"
                      ? log.teacherPhone || "—"
                      : log.teacherEmail || "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
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
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        log.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : log.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-muted text-foreground"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">
                    {formatDateTime(log.sentAt)}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm text-muted-foreground">
                    {log.messageBody || log.subject || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
