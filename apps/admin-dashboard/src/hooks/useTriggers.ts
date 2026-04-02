import { useQuery } from "@tanstack/react-query";
import { listTriggers } from "@/services/api";

export function useTriggers(params: { page?: number; pageSize?: number } = {}) {
  return useQuery({
    queryKey: ["triggers", params],
    queryFn: () => listTriggers(params),
    refetchInterval: 10_000,
  });
}
