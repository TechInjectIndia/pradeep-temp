import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listDuplicates, resolveDuplicate } from "@/services/api";
import type { DuplicateListParams } from "@/types";

export function useDuplicates(params: DuplicateListParams = {}) {
  return useQuery({
    queryKey: ["duplicates", params],
    queryFn: () => listDuplicates(params),
  });
}

export function useResolveDuplicate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      duplicateId,
      action,
    }: {
      duplicateId: string;
      action: "merge" | "keep_separate";
    }) => resolveDuplicate(duplicateId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["duplicates"] });
    },
  });
}
