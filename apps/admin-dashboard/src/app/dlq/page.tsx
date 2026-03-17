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
    lastError: "WhatsApp API rate limit exceeded - retry after 60s",
    retryable: true,
    status: "PENDING",
    createdAt: "2024-01-15T10:50:00Z",
    lastAttemptAt: "2024-01-15T11:05:00Z",
  },
  {
    id: "dlq-002",
    batchId: "BATCH-2024-001",
    teacherPhone: "+919876543213",
    teacherName: "Amit Singh",
    channel: "WHATSAPP",
    attempts: 5,
    lastError: "Message delivery failed: recipient number not on WhatsApp",
    retryable: false,
    status: "ABANDONED",
    createdAt: "2024-01-15T10:52:00Z",
    lastAttemptAt: "2024-01-15T12:30:00Z",
  },
  {
    id: "dlq-003",
    batchId: "BATCH-2024-002",
    teacherPhone: "+919876543215",
    teacherName: "Kavita Reddy",
    channel: "SMS",
    attempts: 2,
    lastError: "SMS gateway timeout after 30s",
    retryable: true,
    status: "PENDING",
    createdAt: "2024-01-14T09:45:00Z",
    lastAttemptAt: "2024-01-14T10:15:00Z",
  },
  {
    id: "dlq-004",
    batchId: "BATCH-2024-003",
    teacherPhone: "+919876543216",
    teacherName: "Vikram Joshi",
    channel: "EMAIL",
    attempts: 1,
    lastError: "SMTP connection refused: mail server unreachable",
    retryable: true,
    status: "RETRYING",
    createdAt: "2024-01-14T08:20:00Z",
    lastAttemptAt: "2024-01-14T08:25:00Z",
  },
  {
    id: "dlq-005",
    batchId: "BATCH-2024-001",
    teacherPhone: "+919876543217",
    teacherName: "Anita Gupta",
    channel: "WHATSAPP",
    attempts: 3,
    lastError: "Template message rejected by WhatsApp Business API",
    retryable: false,
    status: "PENDING",
    createdAt: "2024-01-15T10:55:00Z",
    lastAttemptAt: "2024-01-15T11:20:00Z",
  },
  {
    id: "dlq-006",
    batchId: "BATCH-2024-002",
    teacherPhone: "+919876543218",
    teacherName: "Deepak Verma",
    channel: "SMS",
    attempts: 4,
    lastError: "DND (Do Not Disturb) enabled for this number",
    retryable: false,
    status: "ABANDONED",
    createdAt: "2024-01-14T09:50:00Z",
    lastAttemptAt: "2024-01-14T11:00:00Z",
  },
  {
    id: "dlq-007",
    batchId: "BATCH-2024-003",
    teacherPhone: "+919876543219",
    teacherName: "Sanjay Mehta",
    channel: "WHATSAPP",
    attempts: 2,
    lastError: "Media upload failed: image too large",
    retryable: true,
    status: "PENDING",
    createdAt: "2024-01-14T08:22:00Z",
    lastAttemptAt: "2024-01-14T08:45:00Z",
  },
  {
    id: "dlq-008",
    batchId: "BATCH-2024-001",
    teacherPhone: "+919876543220",
    teacherName: "Ritu Agarwal",
    channel: "EMAIL",
    attempts: 1,
    lastError: "Invalid email address: bounce notification received",
    retryable: false,
    status: "PENDING",
    createdAt: "2024-01-15T11:00:00Z",
    lastAttemptAt: "2024-01-15T11:02:00Z",
  },
];

const channels: MessageChannel[] = ["WHATSAPP", "SMS", "EMAIL"];

export default function DLQPage() {
  const [batchFilter, setBatchFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState<MessageChannel | "">("");
  const [retryableOnly, setRetryableOnly] = useState(false);
  const [page, setPage] = useState(1);

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
    alert("Retrying all retryable DLQ entries");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dead Letter Queue
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and retry failed message deliveries
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
          Retryable Only
        </label>

        <span className="text-sm text-gray-500">
          {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"}
        </span>
      </div>

      {/* DLQ Table */}
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
