"use client";

import { useState } from "react";
import DLQTable from "@/components/DLQTable";
import type { DLQEntry, MessageChannel } from "@/types";
// import { useDLQ, useRetryDLQ } from "@/hooks/useDLQ";

// TODO: Replace with useDLQ(params) hook
const mockDLQEntries: DLQEntry[] = [
  {
    id: "dlq-001",
    batchId: "BATCH-2024-001",
    teacherPhone: "+919876543210",
    teacherName: "Priya Sharma",
    channel: "WHATSAPP",
    attempts: 3,
    lastError: "WhatsApp API: User not found",
    retryable: false,
    status: "PENDING",
    createdAt: "2024-01-15T10:55:00Z",
    lastAttemptAt: "2024-01-15T11:05:00Z",
  },
  {
    id: "dlq-002",
    batchId: "BATCH-2024-001",
    teacherPhone: "+919876543211",
    teacherName: "Rajesh Kumar",
    channel: "WHATSAPP",
    attempts: 2,
    lastError: "Rate limit exceeded",
    retryable: true,
    status: "PENDING",
    createdAt: "2024-01-15T10:56:00Z",
    lastAttemptAt: "2024-01-15T11:02:00Z",
  },
  {
    id: "dlq-003",
    batchId: "BATCH-2024-002",
    teacherPhone: "+919876543215",
    teacherName: "Kavitha Rao",
    channel: "SMS",
    attempts: 5,
    lastError: "SMS gateway: Invalid number format",
    retryable: false,
    status: "ABANDONED",
    createdAt: "2024-01-14T09:30:00Z",
    lastAttemptAt: "2024-01-14T10:15:00Z",
  },
  {
    id: "dlq-004",
    batchId: "BATCH-2024-001",
    teacherPhone: "+919876543216",
    teacherName: "Deepak Verma",
    channel: "EMAIL",
    attempts: 1,
    lastError: "SMTP connection timeout",
    retryable: true,
    status: "PENDING",
    createdAt: "2024-01-15T11:00:00Z",
    lastAttemptAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "dlq-005",
    batchId: "BATCH-2024-003",
    teacherPhone: "+919876543217",
    teacherName: "Lakshmi Nair",
    channel: "WHATSAPP",
    attempts: 3,
    lastError: "Template message rejected",
    retryable: true,
    status: "RETRYING",
    createdAt: "2024-01-14T08:20:00Z",
    lastAttemptAt: "2024-01-14T08:45:00Z",
  },
];

const channels: MessageChannel[] = ["WHATSAPP", "SMS", "EMAIL"];

export default function DLQPage() {
  const [page, setPage] = useState(1);
  const [batchFilter, setBatchFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState<MessageChannel | "">("");
  const [retryableOnly, setRetryableOnly] = useState(false);

  let filtered = mockDLQEntries;
  if (batchFilter) {
    filtered = filtered.filter((e) => e.batchId === batchFilter);
  }
  if (channelFilter) {
    filtered = filtered.filter((e) => e.channel === channelFilter);
  }
  if (retryableOnly) {
    filtered = filtered.filter((e) => e.retryable);
  }

  const batches = [...new Set(mockDLQEntries.map((e) => e.batchId))];

  const handleRetrySelected = (ids: string[]) => {
    // TODO: retryDLQ.mutate({ ids })
    alert(`Retrying ${ids.length} selected entries`);
  };

  const handleRetryAll = () => {
    // TODO: retryDLQ.mutate({ retryAll: true })
    alert("Retrying all retryable entries");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dead Letter Queue</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage failed message deliveries
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={batchFilter}
          onChange={(e) => {
            setBatchFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          onChange={(e) => {
            setChannelFilter(e.target.value as MessageChannel | "");
            setPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Channels</option>
          {channels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={retryableOnly}
            onChange={(e) => {
              setRetryableOnly(e.target.checked);
              setPage(1);
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          Retryable only
        </label>

        <span className="text-sm text-gray-500">
          {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"}
        </span>
      </div>

      <DLQTable
        entries={filtered}
        total={filtered.length}
        page={page}
        totalPages={Math.ceil(filtered.length / 20)}
        onPageChange={setPage}
        onRetrySelected={handleRetrySelected}
        onRetryAll={handleRetryAll}
      />
    </div>
  );
}
