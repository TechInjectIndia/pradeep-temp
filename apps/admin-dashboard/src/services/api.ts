import type {
  Batch,
  BatchDetail,
  BatchError,
  BatchErrorParams,
  BatchListParams,
  BatchLogEntry,
  DLQEntry,
  DLQListParams,
  DashboardStats,
  DuplicateListParams,
  DuplicateRecord,
  PaginatedResponse,
  Teacher,
  TeacherListParams,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/vsds-platform/us-central1";
const REQUEST_TIMEOUT_MS = 30_000;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const body = await res.text();
      // Distinguish common error types for better UX
      if (res.status === 404) throw new Error(`Not found: ${body}`);
      if (res.status === 409) throw new Error(`Conflict: ${body}`);
      if (res.status === 400) throw new Error(`Bad request: ${body}`);
      throw new Error(`API Error ${res.status}: ${body}`);
    }

    return res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out — please try again");
    }
    throw err;
  }
}

function toQueryString(params: Record<string, any>): string {
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
  return request<DashboardStats>("/dashboardStats");
}

// ---- Upload / Specimen ----

export async function uploadSpecimenReviewed(
  rows: import("@/types").ReviewedRow[]
): Promise<{ batchId: string; teacherCount: number; teachers: import("@/types").UploadedTeacher[] }> {
  return request<{ batchId: string; teacherCount: number; teachers: import("@/types").UploadedTeacher[] }>(`/specimenUploadReviewed`, {
    method: "POST",
    body: JSON.stringify({ rows }),
  });
}

export async function uploadSpecimen(file: File): Promise<{ batchId: string; teacherCount: number }> {
  const formData = new FormData();
  formData.append("file", file);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000); // longer timeout for file upload

  try {
    const res = await fetch(`${API_BASE_URL}/specimenUpload`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Upload failed ${res.status}: ${body}`);
    }

    return res.json();
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Upload timed out — file may be too large");
    }
    throw err;
  }
}

export async function createOrders(batchId: string): Promise<{ batchId: string }> {
  return request<{ batchId: string }>(`/specimenCreateOrders`, {
    method: "POST",
    body: JSON.stringify({ batchId }),
  });
}

export async function generateLinks(
  payload: import("@/types").GenerateLinksRequest
): Promise<import("@/types").GenerateLinksResponse> {
  return request<import("@/types").GenerateLinksResponse>(`/specimenGenerateLinks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getBatchLinks(batchId: string): Promise<{
  id: string;
  batchId: string;
  links: Record<string, Record<string, string[]>>;
  expiresAt: string;
}> {
  return request(`/specimenBatchLinks${toQueryString({ batchId })}`);
}

// ---- Batches ----

export async function listBatches(params: BatchListParams = {}): Promise<PaginatedResponse<Batch>> {
  return request<PaginatedResponse<Batch>>(`/batchesList${toQueryString(params)}`);
}

export async function getBatch(batchId: string): Promise<BatchDetail> {
  return request<BatchDetail>(`/batchesGet?batchId=${batchId}`);
}

export async function pauseBatch(batchId: string): Promise<void> {
  await request(`/batchesPause`, {
    method: "POST",
    body: JSON.stringify({ batchId }),
  });
}

export async function resumeBatch(batchId: string): Promise<void> {
  await request(`/batchesResume`, {
    method: "POST",
    body: JSON.stringify({ batchId }),
  });
}

export async function cancelBatch(batchId: string, reason: string): Promise<void> {
  await request(`/batchesCancel`, {
    method: "POST",
    body: JSON.stringify({ batchId, reason }),
  });
}

export async function checkAdvanceBatch(batchId: string): Promise<{ batchId: string; status: string }> {
  return request<{ batchId: string; status: string }>(`/batchesCheckAdvance`, {
    method: "POST",
    body: JSON.stringify({ batchId }),
  });
}

export async function getBatchLogs(
  batchId: string,
  params?: { step?: string; limit?: number }
): Promise<{ data: BatchLogEntry[]; total: number }> {
  return request<{ data: BatchLogEntry[]; total: number }>(
    `/batchesLogs${toQueryString({ batchId, ...params })}`
  );
}

// ---- Batch Errors ----

export async function getBatchErrors(
  batchId: string,
  params: BatchErrorParams = {}
): Promise<PaginatedResponse<BatchError>> {
  return request<PaginatedResponse<BatchError>>(`/batchesErrors${toQueryString({ ...params, batchId })}`);
}

export async function retryBatchErrors(batchId: string, stage?: string): Promise<{ retriedCount: number }> {
  return request<{ retriedCount: number }>(`/batchesRetryErrors`, {
    method: "POST",
    body: JSON.stringify({ batchId, stage }),
  });
}

// ---- Duplicates ----

export async function listDuplicates(params: DuplicateListParams = {}): Promise<PaginatedResponse<DuplicateRecord>> {
  return request<PaginatedResponse<DuplicateRecord>>(`/duplicatesList${toQueryString(params)}`);
}

export async function resolveDuplicate(
  duplicateId: string,
  action: "merge" | "keep_separate"
): Promise<void> {
  await request(`/duplicatesResolve`, {
    method: "POST",
    body: JSON.stringify({ duplicateId, action }),
  });
}

// ---- Messages ----

export async function listMessageLogs(params?: {
  batchId?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  channel?: "whatsapp" | "email";
  limit?: number;
}): Promise<import("@/types").MessageLogsResponse> {
  return request<import("@/types").MessageLogsResponse>(
    `/messagesLogs${toQueryString(params ?? {})}`
  );
}

export async function resendMessage(communicationId: string, channel: string): Promise<void> {
  await request(`/messagesResend`, {
    method: "POST",
    body: JSON.stringify({ communicationId, channel }),
  });
}

// ---- DLQ ----

export async function listDLQ(params: DLQListParams = {}): Promise<PaginatedResponse<DLQEntry>> {
  return request<PaginatedResponse<DLQEntry>>(`/dlqList${toQueryString(params)}`);
}

export async function retryDLQ(data: { ids?: string[]; retryAll?: boolean }): Promise<{ retriedCount: number }> {
  return request<{ retriedCount: number }>("/dlqRetry", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ---- Teachers ----

export async function listTeachers(params: TeacherListParams = {}): Promise<PaginatedResponse<Teacher>> {
  return request<PaginatedResponse<Teacher>>(`/teachersList${toQueryString(params)}`);
}
