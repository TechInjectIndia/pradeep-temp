import type {
  Batch,
  BatchDetail,
  BatchError,
  BatchErrorParams,
  BatchListParams,
  DLQEntry,
  DLQListParams,
  DashboardStats,
  DuplicateListParams,
  DuplicateRecord,
  PaginatedResponse,
  Teacher,
  TeacherListParams,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API Error ${res.status}: ${body}`);
  }

  return res.json();
}

function toQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  }
  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

// ---- Dashboard ----

export async function getDashboardStats(): Promise<DashboardStats> {
  return request<DashboardStats>("/dashboard/stats");
}

// ---- Upload / Specimen ----

export async function uploadSpecimen(file: File): Promise<{ batchId: string; teacherCount: number }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/upload/specimen`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Upload failed ${res.status}: ${body}`);
  }

  return res.json();
}

export async function createOrders(batchId: string): Promise<{ batchId: string }> {
  return request<{ batchId: string }>(`/batches/${batchId}/start`, {
    method: "POST",
  });
}

// ---- Batches ----

export async function listBatches(params: BatchListParams = {}): Promise<PaginatedResponse<Batch>> {
  return request<PaginatedResponse<Batch>>(`/batches${toQueryString(params)}`);
}

export async function getBatch(batchId: string): Promise<BatchDetail> {
  return request<BatchDetail>(`/batches/${batchId}`);
}

export async function pauseBatch(batchId: string): Promise<void> {
  await request(`/batches/${batchId}/pause`, { method: "POST" });
}

export async function resumeBatch(batchId: string): Promise<void> {
  await request(`/batches/${batchId}/resume`, { method: "POST" });
}

export async function cancelBatch(batchId: string, reason: string): Promise<void> {
  await request(`/batches/${batchId}/cancel`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}

// ---- Batch Errors ----

export async function getBatchErrors(
  batchId: string,
  params: BatchErrorParams = {}
): Promise<PaginatedResponse<BatchError>> {
  return request<PaginatedResponse<BatchError>>(`/batches/${batchId}/errors${toQueryString(params)}`);
}

export async function retryBatchErrors(batchId: string, stage?: string): Promise<{ retriedCount: number }> {
  return request<{ retriedCount: number }>(`/batches/${batchId}/errors/retry`, {
    method: "POST",
    body: JSON.stringify({ stage }),
  });
}

// ---- Duplicates ----

export async function listDuplicates(params: DuplicateListParams = {}): Promise<PaginatedResponse<DuplicateRecord>> {
  return request<PaginatedResponse<DuplicateRecord>>(`/duplicates${toQueryString(params)}`);
}

export async function resolveDuplicate(
  duplicateId: string,
  action: "merge" | "keep_separate"
): Promise<void> {
  await request(`/duplicates/${duplicateId}/resolve`, {
    method: "POST",
    body: JSON.stringify({ action }),
  });
}

// ---- Messages ----

export async function resendMessage(communicationId: string, channel: string): Promise<void> {
  await request(`/messages/${communicationId}/resend`, {
    method: "POST",
    body: JSON.stringify({ channel }),
  });
}

// ---- DLQ ----

export async function listDLQ(params: DLQListParams = {}): Promise<PaginatedResponse<DLQEntry>> {
  return request<PaginatedResponse<DLQEntry>>(`/dlq${toQueryString(params)}`);
}

export async function retryDLQ(data: { ids?: string[]; retryAll?: boolean }): Promise<{ retriedCount: number }> {
  return request<{ retriedCount: number }>("/dlq/retry", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ---- Teachers ----

export async function listTeachers(params: TeacherListParams = {}): Promise<PaginatedResponse<Teacher>> {
  return request<PaginatedResponse<Teacher>>(`/teachers${toQueryString(params)}`);
}
