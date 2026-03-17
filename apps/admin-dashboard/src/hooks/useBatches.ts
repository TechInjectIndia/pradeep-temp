import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listBatches,
  getBatch,
  getBatchErrors,
  pauseBatch,
  resumeBatch,
  cancelBatch,
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
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
}

export function useResumeBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (batchId: string) => resumeBatch(batchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
}

export function useCancelBatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, reason }: { batchId: string; reason: string }) =>
      cancelBatch(batchId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      queryClient.invalidateQueries({ queryKey: ["batch"] });
    },
  });
}

export function useRetryBatchErrors() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ batchId, stage }: { batchId: string; stage?: string }) =>
      retryBatchErrors(batchId, stage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["batchErrors"] });
    },
  });
}
