import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  listBatches,
  getBatch,
  getBatchErrors,
  pauseBatch,
  resumeBatch,
  cancelBatch,
  checkAdvanceBatch,
  retryBatchErrors,
} from "@/services/api";
import type { BatchListParams, BatchErrorParams } from "@/types";

export function useBatches(params: BatchListParams = {}) {
  return useQuery({
    queryKey: ["batches", params],
    queryFn: () => listBatches(params),
  });
}

export function useBatch(batchId: string) {
  return useQuery({
    queryKey: ["batch", batchId],
    queryFn: () => getBatch(batchId),
    enabled: !!batchId,
    refetchInterval: 5000, // poll every 5s for active batches
  });
}

export function useBatchErrors(batchId: string, params: BatchErrorParams = {}) {
  return useQuery({
    queryKey: ["batchErrors", batchId, params],
    queryFn: () => getBatchErrors(batchId, params),
    enabled: !!batchId,
  });
}

export function usePauseBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (batchId: string) => pauseBatch(batchId),
    onSuccess: () => {
      toast.success("Batch paused successfully");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to pause batch");
    },
  });
}

export function useResumeBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (batchId: string) => resumeBatch(batchId),
    onSuccess: () => {
      toast.success("Batch resumed successfully");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to resume batch");
    },
  });
}

export function useCancelBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, reason }: { batchId: string; reason: string }) =>
      cancelBatch(batchId, reason),
    onSuccess: () => {
      toast.success("Batch cancelled");
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to cancel batch");
    },
  });
}

export function useCheckAdvanceBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (batchId: string) => checkAdvanceBatch(batchId),
    onSuccess: (data) => {
      toast.success(`Status updated to ${data.status}`);
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to refresh status");
    },
  });
}

export function useRetryBatchErrors() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, stage }: { batchId: string; stage?: string }) =>
      retryBatchErrors(batchId, stage),
    onSuccess: (data) => {
      toast.success(`Retried ${data.retriedCount} error${data.retriedCount !== 1 ? "s" : ""}`);
      queryClient.invalidateQueries({ queryKey: ["batchErrors"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to retry errors");
    },
  });
}
