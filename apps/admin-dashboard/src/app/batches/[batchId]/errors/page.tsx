"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ErrorTable from "@/components/ErrorTable";
import type { BatchError, BatchStage } from "@/types";
// import { useBatchErrors, useRetryBatchErrors } from "@/hooks/useBatches";

// TODO: Replace with useBatchErrors(batchId, params) hook
const mockErrors: BatchError[] = [
  {
    id: "err-001",
    batchId: "BATCH-2024-001",
    stage: "ORDERS",
    teacherName: "Priya Sharma",
    teacherPhone: "+919876543210",
    errorType: "VALIDATION_ERROR",
    message: "Invalid book ISBN: 978-0-000-00000-X",
    retryable: false,
    createdAt: "2024-01-15T10:35:22Z",
  },
  {
    id: "err-002",
    batchId: "BATCH-2024-001",
    stage: "ORDERS",
    teacherName: "Rajesh Kumar",
    teacherPhone: "+919876543211",
    errorType: "API_TIMEOUT",
    message: "Order service timed out after 30s",
    retryable: true,
    createdAt: "2024-01-15T10:36:05Z",
  },
  {
    id: "err-003",
    batchId: "BATCH-2024-001",
    stage: "AGGREGATION",
    teacherName: "Meena Patel",
    teacherPhone: "+919876543212",
    errorType: "DUPLICATE_ORDER",
    message: "Duplicate order detected for book: Mathematics Grade 10",
    retryable: false,
    createdAt: "2024-01-15T10:42:18Z",
  },
  {
    id: "err-004",
    batchId: "BATCH-2024-001",
    stage: "MESSAGES",
    teacherName: "Amit Singh",
    teacherPhone: "+919876543213",
    errorType: "CHANNEL_ERROR",
    message: "WhatsApp API rate limit exceeded",
    retryable: true,
    createdAt: "2024-01-15T10:50:33Z",
  },
  {
    id: "err-005",
    batchId: "BATCH-2024-001",
    stage: "RESOLUTION",
    teacherName: "Sunita Devi",
    teacherPhone: "+919876543214",
    errorType: "NOT_FOUND",
    message: "Teacher phone number not registered on WhatsApp",
    retryable: false,
    createdAt: "2024-01-15T10:31:45Z",
  },
];

export default function BatchErrorsPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.batchId as string;

  const [page, setPage] = useState(1);
  const [stageFilter, setStageFilter] = useState<BatchStage | undefined>();
  const [retryableFilter, setRetryableFilter] = useState<boolean | undefined>();

  let filtered = mockErrors;
  if (stageFilter) {
    filtered = filtered.filter((e) => e.stage === stageFilter);
  }
  if (retryableFilter !== undefined) {
    filtered = filtered.filter((e) => e.retryable === retryableFilter);
  }

  const handleRetryAll = () => {
    // TODO: retryBatchErrors.mutate({ batchId, stage: stageFilter })
    alert(`Retrying all retryable errors for batch ${batchId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => router.push(`/batches/${batchId}`)}
          className="mb-2 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Batch
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Errors - <span className="font-mono">{batchId}</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {filtered.length} error{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <ErrorTable
        errors={filtered}
        total={filtered.length}
        page={page}
        totalPages={Math.ceil(filtered.length / 20)}
        onPageChange={setPage}
        onFilterStage={setStageFilter}
        onFilterRetryable={setRetryableFilter}
        onRetryAll={handleRetryAll}
        selectedStage={stageFilter}
        selectedRetryable={retryableFilter}
      />
    </div>
  );
}
