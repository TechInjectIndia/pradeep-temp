"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Merge, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { UploadRow, ReviewedRow, ChannelChoice } from "@/types";
import { uploadSpecimenReviewed, createOrders } from "@/services/api";
import {
  detectMergeGroups,
  mergeRows,
  type MergeGroup,
} from "@/utils/mergeDetection";
import { clsx } from "clsx";

const STORAGE_KEY = "upload_review_rows";
const STORAGE_FILE_KEY = "upload_review_filename";
const STORAGE_LOGS_KEY = "upload_review_initial_logs";

type LogStep =
  | "file_selected"
  | "file_parsed"
  | "navigate_review"
  | "page_loaded"
  | "merge_groups_detected"
  | "merged"
  | "kept_separate"
  | "channel_applied"
  | "channel_per_teacher"
  | "contact_selected"
  | "distribution_clicked"
  | "validation_passed"
  | "upload_api_calling"
  | "upload_api_success"
  | "orders_api_calling"
  | "orders_api_success"
  | "session_cleared"
  | "redirect"
  | "error";

interface StepLog {
  id: string;
  step: LogStep;
  stepNumber: number;
  timestamp: Date;
  message: string;
  detail?: string;
}

interface ReviewRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  school: string;
  books: string;
  phones: string[];
  emails: string[];
  phoneSelected: string;
  emailSelected: string;
  channels: ChannelChoice;
  mergedFrom?: number[]; // original indices if this was a merge
}

function toReviewRow(row: UploadRow, id: string, idx?: number): ReviewRow {
  const phones = [row.phone].filter(Boolean);
  const emails = [row.email].filter(Boolean);
  return {
    id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    school: row.school,
    books: row.books,
    phones,
    emails,
    phoneSelected: phones[0] || "",
    emailSelected: emails[0] || "",
    channels: "both",
    mergedFrom: idx !== undefined ? [idx] : undefined,
  };
}

export default function UploadReviewPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [mergeGroups, setMergeGroups] = useState<MergeGroup[]>([]);
  const [mergedGroupIds, setMergedGroupIds] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [globalChannel, setGlobalChannel] = useState<ChannelChoice>("both");
  const [stepLogs, setStepLogs] = useState<StepLog[]>([]);
  const logIdRef = useRef(0);
  const stepNumberRef = useRef(0);

  const addLog = useCallback(
    (step: LogStep, message: string, detail?: string) => {
      const id = `log-${++logIdRef.current}`;
      const stepNumber = ++stepNumberRef.current;
      setStepLogs((prev) => [
        ...prev,
        { id, step, stepNumber, timestamp: new Date(), message, detail },
      ]);
    },
    []
  );

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const fname = sessionStorage.getItem(STORAGE_FILE_KEY);
    const initialLogs = sessionStorage.getItem(STORAGE_LOGS_KEY);

    if (raw && fname) {
      try {
        // Restore initial logs from upload page
        if (initialLogs) {
          try {
            const parsedLogs = JSON.parse(initialLogs) as Array<{ step: string; stepNumber: number; timestamp: string; message: string; detail?: string }>;
            if (Array.isArray(parsedLogs)) {
              const withStepNumbers: StepLog[] = parsedLogs.map((l, i) => ({
                id: `log-init-${i}`,
                step: l.step as LogStep,
                stepNumber: l.stepNumber,
                timestamp: new Date(l.timestamp),
                message: l.message,
                detail: l.detail,
              }));
              stepNumberRef.current = withStepNumbers.length;
              setStepLogs(withStepNumbers);
            }
            sessionStorage.removeItem(STORAGE_LOGS_KEY);
          } catch {
            /* ignore */
          }
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0) {
          throw new Error("Session data is empty or invalid format");
        }

        // Normalize rows (ensure expected shape)
        const normalized: UploadRow[] = parsed.map((r: Record<string, unknown>) => ({
          name: String(r?.name ?? "").trim(),
          phone: String(r?.phone ?? "").trim(),
          email: String(r?.email ?? "").trim(),
          school: String(r?.school ?? "").trim(),
          books: String(r?.books ?? "").trim(),
        }));

        setFileName(fname);
        const reviewRows = normalized.map((r, i) =>
          toReviewRow(r, `r-${i}`, i)
        );
        setRows(reviewRows);
        const groups = detectMergeGroups(normalized);
        setMergeGroups(groups);

        addLog(
          "page_loaded",
          `Review page loaded`,
          `Loaded ${normalized.length} teachers from "${fname}"`
        );
        addLog(
          "merge_groups_detected",
          `Duplicate detection complete`,
          groups.length > 0
            ? `${groups.length} merge suggestion(s) found`
            : "No duplicates detected"
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Invalid session data";
        toast.error(msg);
        router.push("/upload");
      }
    } else {
      toast.error("No upload data found. Please upload a file first.");
      router.push("/upload");
    }
  }, [router, addLog]);

  const handleMerge = useCallback(
    (group: MergeGroup) => {
      const merged = mergeRows(group.rows);
      addLog(
        "merged",
        `Merged ${group.rows.length} records (${group.reason})`,
        `Confidence: ${group.confidence}% • ${merged.name}`
      );
      const id = `merged-${group.indices.join("-")}`;
      const newRow: ReviewRow = {
        id,
        name: merged.name,
        phone: merged.phones[0] || "",
        email: merged.emails[0] || "",
        school: merged.school,
        books: merged.books,
        phones: merged.phones,
        emails: merged.emails,
        phoneSelected: merged.phones[0] || "",
        emailSelected: merged.emails[0] || "",
        channels: "both",
        mergedFrom: group.indices,
      };
      setRows((prev) => {
        const exclude = new Set(group.indices);
        const kept = prev.filter((r) => {
          if (!r.mergedFrom) return true;
          const overlap = r.mergedFrom.some((i) => exclude.has(i));
          return !overlap;
        });
        return [...kept, newRow];
      });
      // Hide all groups that overlap with merged indices
      setMergedGroupIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        mergeGroups.forEach((g) => {
          const overlap = g.indices.some((i) => group.indices.includes(i));
          if (overlap) next.add(`merged-${g.indices.join("-")}`);
        });
        return next;
      });
    },
    [mergeGroups, addLog]
  );

  const handleKeepSeparate = useCallback(
    (group: MergeGroup) => {
      addLog(
        "kept_separate",
        `Kept ${group.rows.length} records separate`,
        `${group.reason} match (${group.confidence}% confidence)`
      );
      setMergeGroups((prev) => prev.filter((g) => g !== group));
    },
    [addLog]
  );

  const setPhoneSelected = useCallback(
    (rowId: string, phone: string) => {
      const row = rows.find((r) => r.id === rowId);
      addLog(
        "contact_selected",
        `Selected phone for ${row?.name || "teacher"}`,
        phone
      );
      setRows((prev) =>
        prev.map((r) =>
          r.id === rowId ? { ...r, phoneSelected: phone } : r
        )
      );
    },
    [rows, addLog]
  );

  const setEmailSelected = useCallback(
    (rowId: string, email: string) => {
      const row = rows.find((r) => r.id === rowId);
      addLog(
        "contact_selected",
        `Selected email for ${row?.name || "teacher"}`,
        email
      );
      setRows((prev) =>
        prev.map((r) =>
          r.id === rowId ? { ...r, emailSelected: email } : r
        )
      );
    },
    [rows, addLog]
  );

  const setChannels = useCallback(
    (rowId: string, channels: ChannelChoice) => {
      const row = rows.find((r) => r.id === rowId);
      addLog(
        "channel_per_teacher",
        `Channel changed for ${row?.name || "teacher"}`,
        `Set to: ${channels}`
      );
      setRows((prev) =>
        prev.map((r) => (r.id === rowId ? { ...r, channels } : r))
      );
    },
    [rows, addLog]
  );

  const applyGlobalChannel = useCallback(() => {
    setRows((prev) =>
      prev.map((r) => ({ ...r, channels: globalChannel }))
    );
    addLog(
      "channel_applied",
      `Applied "${globalChannel}" to all teachers`,
      `${rows.length} teachers updated`
    );
    toast.success(`Applied "${globalChannel}" to all teachers`);
  }, [globalChannel, rows.length, addLog]);

  const toReviewedRows = useCallback((channel: ChannelChoice): ReviewedRow[] => {
    return rows.map((r) => ({
      name: r.name,
      phone: r.phoneSelected || r.phone,
      email: r.emailSelected || r.email,
      school: r.school,
      books: r.books,
      phoneSelected: r.phones.length > 1 ? r.phoneSelected : undefined,
      emailSelected: r.emails.length > 1 ? r.emailSelected : undefined,
      channels: channel,
    }));
  }, [rows]);

  const handleStartDistribution = async () => {
    const selectedChannel = (document.querySelector('input[name="globalChannel"]:checked') as HTMLInputElement | null)?.value as ChannelChoice | undefined;
    const effectiveChannel = selectedChannel || globalChannel;
    const reviewed = toReviewedRows(effectiveChannel);
    const withContact = reviewed.filter(
      (r) =>
        r.channels !== "none" &&
        (((r.channels === "whatsapp" || r.channels === "both") &&
          (r.phoneSelected || r.phone)) ||
          ((r.channels === "email" || r.channels === "both") &&
            (r.emailSelected || r.email)))
    );

    addLog(
      "distribution_clicked",
      "Start Distribution clicked",
      `Preparing ${reviewed.length} teachers`
    );

    if (withContact.length === 0) {
      addLog("error", "Validation failed", "No teachers with contact and channel selected");
      toast.error("At least one teacher must have a contact and channel selected");
      return;
    }

    addLog(
      "validation_passed",
      "Validation passed",
      `${withContact.length} teacher(s) will receive messages via ${effectiveChannel === "email" ? "email only" : effectiveChannel === "whatsapp" ? "WhatsApp only" : effectiveChannel === "both" ? "WhatsApp + email" : "none"}`
    );

    setIsUploading(true);
    try {
      addLog("upload_api_calling", "Calling upload API", "Sending reviewed data");
      const result = await uploadSpecimenReviewed(reviewed);
      addLog(
        "upload_api_success",
        "Upload API success",
        `Batch ${result.batchId} • ${result.teacherCount} teachers`
      );

      addLog("orders_api_calling", "Calling create orders API", `Batch ${result.batchId}`);
      await createOrders(result.batchId);
      addLog(
        "orders_api_success",
        "Create orders API success",
        "Orders queued for processing"
      );

      addLog("session_cleared", "Session cleared", "Removed temporary data");
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_FILE_KEY);

      addLog("redirect", "Redirecting to batch", result.batchId);
      toast.success("Distribution started");
      router.push(`/batches/${result.batchId}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      addLog("error", "Distribution failed", msg);
      toast.error(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const pendingMergeGroups = mergeGroups.filter(
    (g) => !mergedGroupIds.has(`merged-${g.indices.join("-")}`)
  );

  if (rows.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => router.push("/upload")}
          className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Upload
        </button>
        <h1 className="text-2xl font-bold text-foreground">Review & Send</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review data, merge duplicates, choose contacts and channels before sending
        </p>
      </div>

      {/* Merge suggestions */}
      {pendingMergeGroups.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-900">
            <Merge className="h-5 w-5" />
            Merge suggestions ({pendingMergeGroups.length})
          </h2>
          <p className="mb-4 text-sm text-amber-800">
            These records may be duplicates. Merge them to combine books and contacts.
          </p>
          <div className="space-y-4">
            {pendingMergeGroups.map((group) => (
              <div
                key={group.indices.join("-")}
                className="rounded-lg border border-amber-200 bg-card p-4"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      group.reason === "email" && "bg-blue-100 text-blue-700",
                      group.reason === "phone" && "bg-green-100 text-green-700",
                      group.reason === "name_school" &&
                        "bg-purple-100 text-purple-700"
                    )}
                  >
                    {group.reason === "email"
                      ? "Same email"
                      : group.reason === "phone"
                      ? "Same phone"
                      : "Same name & school"}
                  </span>
                  <span
                    className={clsx(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      group.confidence >= 95 && "bg-emerald-100 text-emerald-700",
                      group.confidence >= 85 &&
                        group.confidence < 95 &&
                        "bg-amber-100 text-amber-700",
                      group.confidence < 85 && "bg-orange-100 text-orange-700"
                    )}
                  >
                    {group.confidence}% confidence
                  </span>
                </div>
                <div className="mb-3 space-y-2 text-sm">
                  {group.rows.map((r, i) => (
                    <div
                      key={i}
                      className="flex gap-4 rounded bg-muted/50 px-3 py-2"
                    >
                      <span className="font-medium">{r.name}</span>
                      <span className="text-muted-foreground">{r.school}</span>
                      <span className="font-mono text-xs">{r.phone}</span>
                      <span className="text-xs">{r.email}</span>
                      <span className="text-muted-foreground">{r.books}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleKeepSeparate(group)}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:bg-muted/50"
                  >
                    Keep separate
                  </button>
                  <button
                    onClick={() => handleMerge(group)}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-amber-700"
                  >
                    <Merge className="h-4 w-4" />
                    Merge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global channel selection */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Channel selection
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm text-muted-foreground">Apply to all:</span>
          {(["both", "whatsapp", "email", "none"] as const).map((ch) => (
            <label key={ch} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="globalChannel"
                value={ch}
                checked={globalChannel === ch}
                onChange={() => {
                  setGlobalChannel(ch);
                  addLog("channel_applied", `Applied "${ch}" to all teachers`, `${rows.length} teachers`);
                  setRows((prev) => prev.map((r) => ({ ...r, channels: ch })));
                }}
                className="h-4 w-4 border-border text-blue-600"
              />
              <span className="text-sm capitalize">
                {ch === "both" && "Both (WhatsApp + Email)"}
                {ch === "whatsapp" && "WhatsApp only"}
                {ch === "email" && "Email only"}
                {ch === "none" && "None"}
              </span>
            </label>
          ))}
          <button
            onClick={applyGlobalChannel}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Final list */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Final list ({rows.length} teachers)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">School</th>
                <th className="pb-3 pr-4">Products</th>
                <th className="pb-3 pr-4">WhatsApp</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Channels</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-muted/50"
                >
                  <td className="py-3 pr-4 font-medium">{row.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.school}</td>
                  <td className="max-w-[200px] truncate py-3 pr-4 text-muted-foreground">
                    {row.books}
                  </td>
                  <td className="py-3 pr-4">
                    {row.phones.length > 1 ? (
                      <select
                        value={row.phoneSelected}
                        onChange={(e) =>
                          setPhoneSelected(row.id, e.target.value)
                        }
                        className="rounded border border-border bg-card px-2 py-1 text-xs"
                      >
                        {row.phones.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="font-mono text-xs">
                        {row.phone || "—"}
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    {row.emails.length > 1 ? (
                      <select
                        value={row.emailSelected}
                        onChange={(e) =>
                          setEmailSelected(row.id, e.target.value)
                        }
                        className="rounded border border-border bg-card px-2 py-1 text-xs"
                      >
                        {row.emails.map((e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs">{row.email || "—"}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      value={row.channels}
                      onChange={(e) =>
                        setChannels(row.id, e.target.value as ChannelChoice)
                      }
                      className="rounded border border-border bg-card px-2 py-1 text-xs"
                    >
                      <option value="both">Both</option>
                      <option value="whatsapp">WhatsApp only</option>
                      <option value="email">Email only</option>
                      <option value="none">None</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step logs */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
          <FileText className="h-5 w-5" />
          Activity log — every step
        </h2>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {stepLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet</p>
          ) : (
            stepLogs.map((log) => {
              const isError = log.step === "error";
              return (
                <div
                  key={log.id}
                  className={clsx(
                    "flex items-start gap-3 rounded-lg px-3 py-2 text-sm",
                    isError ? "bg-red-50" : "bg-muted/50"
                  )}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted-foreground/20 text-xs font-bold text-muted-foreground">
                    {log.stepNumber}
                  </span>
                  {isError ? (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  ) : (
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={clsx("font-medium", isError ? "text-red-900" : "text-foreground")}>
                      {log.message}
                    </p>
                    {log.detail && (
                      <p className={clsx("mt-0.5 text-xs", isError ? "text-red-700" : "text-muted-foreground")}>
                        {log.detail}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {log.timestamp.toLocaleTimeString()} • {log.step}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">
          File: {fileName} • {rows.length} teachers
        </p>
        <button
          onClick={handleStartDistribution}
          disabled={isUploading}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-blue-700 disabled:opacity-50"
        >
          {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
          Start Distribution
        </button>
      </div>
    </div>
  );
}
