import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listDLQ, retryDLQ } from "@/services/api";
import type { DLQListParams } from "@/types";

export function useDLQ(params: DLQListParams = {}) {
  return useQuery({
    queryKey: ["dlq", params],
    queryFn: () => listDLQ(params),
  });
}

export function useRetryDLQ() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { ids?: string[]; retryAll?: boolean }) => retryDLQ(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dlq"] });
    },
  });
}
