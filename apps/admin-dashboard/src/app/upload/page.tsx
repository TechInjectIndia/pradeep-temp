"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Download,
  MessageCircle,
  Mail,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react";
import { toast } from "sonner";
import FileUploadZone from "@/components/FileUploadZone";
import DataTable, { type Column } from "@/components/DataTable";
import type { UploadRow } from "@/types";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import { uploadSpecimen, checkDuplicatesAgainstDB, lookupBookCodes, searchAlgolia, createBookMapping, type DBDuplicateMatch, type AlgoliaHit } from "@/services/api";

// ---------------------------------------------------------------------------
// Template helpers
// ---------------------------------------------------------------------------

const TEMPLATE_HEADERS = [
  "Record Id", "Books Assigned", "Teacher Owner.id", "Teacher Owner",
  "First Name", "Last Name", "Teacher Name", "Institution Name.id", "Institution Name",
  "Email", "Phone", "Salutation",
];
const TEMPLATE_EXAMPLE: Record<string, string> = {
  "Record Id": "REC001",
  "Books Assigned": "Math 10, Science 10",
  "Teacher Owner.id": "owner-1",
  "Teacher Owner": "John Doe",
  "First Name": "Example",
  "Last Name": "Teacher",
  "Teacher Name": "Example Teacher",
  "Institution Name.id": "inst-1",
  "Institution Name": "School Name",
  "Email": "teacher@school.com",
  "Phone": "+919876543210",
  "Salutation": "Mr",
};

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

function toNumericString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "number") {
    if (Number.isInteger(value)) return String(value);
    return String(Math.floor(value));
  }
  const s = String(value ?? "").trim();
  if (!s) return "";
  if (/^\d*\.?\d+[eE][+-]?\d+$/.test(s)) {
    const num = parseFloat(s);
    if (!Number.isNaN(num)) return String(Math.floor(num));
  }
  return s;
}

function mapRowToUploadRow(row: Record<string, unknown>): UploadRow {
  const lower: Record<string, string> = {};
  for (const [k, v] of Object.entries(row)) {
    lower[k.trim().toLowerCase().replace(/\s+/g, " ")] = toNumericString(v ?? "").trim();
  }
  const get = (keys: string[]) => {
    for (const k of keys) {
      const v = lower[k];
      if (v) return v;
    }
    return "";
  };
  const firstName = get(["first name", "firstname"]);
  const lastName = get(["last name", "lastname"]);
  const name =
    get(["name", "teacher name", "teachername"]) ||
    [firstName, lastName].filter(Boolean).join(" ").trim();
  return {
    name: name || "",
    phone: get(["phone"]) || "",
    email: get(["email"]) || "",
    school: get(["school", "institution name", "institutionname"]) || "",
    books: get(["books", "books assigned", "booksassigned"]) || "",
    recordId: get(["record id", "recordid"]) || undefined,
    booksAssigned: get(["books assigned", "booksassigned"]) || undefined,
    teacherOwnerId: get(["teacher owner.id", "teacher owner id", "teacherownerid"]) || undefined,
    teacherOwner: get(["teacher owner", "teacherowner"]) || undefined,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    institutionId: get(["institution name.id", "institution name id", "institutionid"]) || undefined,
    institutionName: get(["institution name", "institutionname"]) || undefined,
    salutation: get(["salutation"]) || undefined,
  };
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ChannelOption = "whatsapp" | "email" | "both";
type Step = 1 | 2 | 3;

type MergeDecision =
  | { action: "merge"; nameChoice: "file" | "db" }
  | { action: "create_new" }
  | null; // null = not yet decided

type SheetDuplicateGroup = {
  key: string;          // "phone:XXXXXX" or "email:xxx@xxx"
  type: "phone" | "email";
  value: string;        // normalized phone or email
  rowIndices: number[]; // indices of rows sharing this phone/email
};

type SheetMergeConfig = {
  chosenName: string;
  chosenPhones: Set<string>;
  chosenEmails: Set<string>;
};

// Detect duplicates within the uploaded file itself
function findInSheetDuplicates(rows: UploadRow[]): SheetDuplicateGroup[] {
  const phoneGroups = new Map<string, number[]>();
  const emailGroups = new Map<string, number[]>();

  rows.forEach((row, idx) => {
    if (row.phone) {
      const n = row.phone.replace(/\D/g, "").replace(/^0+/, "");
      if (n) {
        if (!phoneGroups.has(n)) phoneGroups.set(n, []);
        phoneGroups.get(n)!.push(idx);
      }
    }
    if (row.email) {
      const n = row.email.toLowerCase().trim();
      if (n) {
        if (!emailGroups.has(n)) emailGroups.set(n, []);
        emailGroups.get(n)!.push(idx);
      }
    }
  });

  const groups: SheetDuplicateGroup[] = [];
  // Track which rows are already covered by a group
  const coveredRows = new Set<number>();

  for (const [phone, indices] of phoneGroups) {
    if (indices.length > 1) {
      groups.push({ key: `phone:${phone}`, type: "phone", value: phone, rowIndices: indices });
      indices.forEach((i) => coveredRows.add(i));
    }
  }
  for (const [email, indices] of emailGroups) {
    if (indices.length > 1) {
      // Skip if all rows in this email group are already covered by a phone group
      const uncovered = indices.filter((i) => !coveredRows.has(i));
      if (uncovered.length < indices.length && uncovered.length === 0) continue;
      groups.push({ key: `email:${email}`, type: "email", value: email, rowIndices: indices });
      indices.forEach((i) => coveredRows.add(i));
    }
  }
  // Sort by first row index so groups appear in file order
  groups.sort((a, b) => (a.rowIndices[0] ?? 0) - (b.rowIndices[0] ?? 0));
  return groups;
}

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

const STEPS = [
  { id: 1, label: "Preview" },
  { id: 2, label: "Channels" },
  { id: 3, label: "Duplicates" },
];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, idx) => {
        const isCompleted = current > step.id;
        const isCurrent = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={[
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                isCompleted ? "border-blue-600 bg-blue-600 text-white"
                  : isCurrent ? "border-blue-600 bg-card text-blue-600"
                  : "border-border bg-card text-muted-foreground",
              ].join(" ")}>
                {isCompleted ? <CheckCircle className="h-4 w-4" /> : step.id}
              </div>
              <span className={["mt-1 text-xs font-medium", isCurrent ? "text-blue-600" : "text-muted-foreground"].join(" ")}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={["mb-4 h-0.5 w-12 transition-colors", isCompleted ? "bg-blue-600" : "bg-border"].join(" ")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Channel pill toggle (per-teacher)
// ---------------------------------------------------------------------------

function ChannelPill({
  value,
  onChange,
  hasPhone,
  hasEmail,
}: {
  value: ChannelOption;
  onChange: (v: ChannelOption) => void;
  hasPhone: boolean;
  hasEmail: boolean;
}) {
  const opts: { key: ChannelOption; label: string; disabled: boolean }[] = [
    { key: "whatsapp", label: "W", disabled: !hasPhone },
    { key: "email",    label: "E", disabled: !hasEmail },
    { key: "both",     label: "B", disabled: !hasPhone || !hasEmail },
  ];
  return (
    <div className="inline-flex rounded-lg border border-border overflow-hidden text-xs font-semibold">
      {opts.map((opt) => (
        <button
          key={opt.key}
          type="button"
          disabled={opt.disabled}
          onClick={() => !opt.disabled && onChange(opt.key)}
          title={opt.disabled ? "Contact info missing" : opt.key}
          className={[
            "px-2.5 py-1 transition-colors",
            value === opt.key && !opt.disabled
              ? opt.key === "whatsapp" ? "bg-green-600 text-white"
                : opt.key === "email" ? "bg-blue-600 text-white"
                : "bg-purple-600 text-white"
              : opt.disabled
              ? "bg-muted/30 text-muted-foreground/40 cursor-not-allowed"
              : "bg-card text-muted-foreground hover:bg-muted",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Global channel card
// ---------------------------------------------------------------------------

function ChannelCard({
  value, selected, onSelect, icon, label, description, accentClass,
}: {
  value: ChannelOption; selected: boolean; onSelect: (v: ChannelOption) => void;
  icon: React.ReactNode; label: string; description: string; accentClass: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={[
        "flex flex-col items-center gap-3 rounded-xl border-2 p-5 text-center transition-all",
        selected ? `${accentClass} border-current` : "border-border bg-card hover:border-muted-foreground/50",
      ].join(" ")}
    >
      <div className={["rounded-full p-3", selected ? "bg-white/20" : "bg-muted"].join(" ")}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className={["h-4 w-4 rounded-full border-2", selected ? "border-white bg-white" : "border-muted-foreground"].join(" ")} />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const PAGE_SIZE = 50;

const previewColumns: Column<UploadRow>[] = [
  { key: "recordId", header: "Record Id", mobileHidden: true },
  { key: "name", header: "Teacher Name" },
  { key: "phone", header: "Phone" },
  { key: "email", header: "Email" },
  { key: "school", header: "Institution", mobileHidden: true },
  { key: "books", header: "Books", mobileHidden: true },
];

export default function UploadPage() {
  const router = useRouter();

  const [parsedRows, setParsedRows] = useState<UploadRow[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [step, setStep] = useState<Step>(1);

  // Step 2
  const [globalChannel, setGlobalChannel] = useState<ChannelOption>("both");
  const [perTeacherChannel, setPerTeacherChannel] = useState<Map<number, ChannelOption>>(new Map());
  const [channelTablePage, setChannelTablePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Step 3
  const [inSheetDuplicates, setInSheetDuplicates] = useState<SheetDuplicateGroup[]>([]);
  const [skippedRows, setSkippedRows] = useState<Set<number>>(new Set());
  // Set of group keys that have been merged (all extras skipped, first row kept)
  const [mergedSheetGroups, setMergedSheetGroups] = useState<Set<string>>(new Set());
  // Chosen name/phones/emails per merged group key
  const [sheetMergeConfigs, setSheetMergeConfigs] = useState<Map<string, SheetMergeConfig>>(new Map());
  // Dialog state: which group is currently being configured for merge
  const [mergeDialogGroup, setMergeDialogGroup] = useState<SheetDuplicateGroup | null>(null);
  const [pendingConfig, setPendingConfig] = useState<SheetMergeConfig | null>(null);
  const [isDuplicateChecking, setIsDuplicateChecking] = useState(false);
  const [duplicateMatches, setDuplicateMatches] = useState<DBDuplicateMatch[] | null>(null);
  // Map<rowIndex, MergeDecision>
  const [mergeDecisions, setMergeDecisions] = useState<Map<number, MergeDecision>>(new Map());
  // Unmapped book codes: codes in the file that have no entry in book_mappings
  const [unmappedBookCodes, setUnmappedBookCodes] = useState<string[] | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  // Quick-map modal (for unmapped book codes — supports multiple products per code)
  const [quickMapCode, setQuickMapCode] = useState<string | null>(null);
  const [quickMapQuery, setQuickMapQuery] = useState("");
  const [quickMapHits, setQuickMapHits] = useState<AlgoliaHit[]>([]);
  const [quickMapSearching, setQuickMapSearching] = useState(false);
  const [quickMapSaving, setQuickMapSaving] = useState(false);
  const [quickMapSelected, setQuickMapSelected] = useState<AlgoliaHit | null>(null);
  const [quickMapProducts, setQuickMapProducts] = useState<Array<{ productId: string; productTitle: string; authors: Array<{id: string; title: string}> }>>([]);

  // ---------------------------------------------------------------------------
  // File parsing
  // ---------------------------------------------------------------------------

  const handleFileSelect = useCallback((file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["xlsx", "csv"].includes(ext ?? "")) {
      toast.error("Please upload an Excel (.xlsx) or CSV (.csv) file");
      return;
    }
    setSelectedFile(file);
    setIsParsing(true);
    setParsedRows([]);
    setStep(1);
    setPerTeacherChannel(new Map());
    setDuplicateMatches(null);
    setMergeDecisions(new Map());
    setInSheetDuplicates([]);
    setSkippedRows(new Set());
    setMergedSheetGroups(new Set());
    setSheetMergeConfigs(new Map());
    setMergeDialogGroup(null);
    setPendingConfig(null);
    setUnmappedBookCodes(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (!result || !(result instanceof ArrayBuffer)) { toast.error("Could not read file"); setIsParsing(false); return; }
        const data = new Uint8Array(result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) { toast.error("File has no sheets"); setIsParsing(false); return; }
        const worksheet = workbook.Sheets[sheetName];
        const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, { defval: "", raw: true });
        const json: UploadRow[] = raw.map((row) => mapRowToUploadRow(row));
        if (json.length === 0) { toast.error("No data rows found in file"); setIsParsing(false); return; }
        setParsedRows(json);
        toast.success(`Parsed ${json.length} rows from ${file.name}`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to parse file");
      } finally {
        setIsParsing(false);
      }
    };
    reader.onerror = () => { setIsParsing(false); toast.error("Failed to read file"); };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleCancel = useCallback(() => {
    setParsedRows([]);
    setSelectedFile(null);
    setStep(1);
    setPerTeacherChannel(new Map());
    setDuplicateMatches(null);
    setMergeDecisions(new Map());
    setInSheetDuplicates([]);
    setSkippedRows(new Set());
    setMergedSheetGroups(new Set());
    setSheetMergeConfigs(new Map());
    setMergeDialogGroup(null);
    setPendingConfig(null);
    setUnmappedBookCodes(null);
  }, []);

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      TEMPLATE_HEADERS,
      TEMPLATE_HEADERS.map((h) => TEMPLATE_EXAMPLE[h] ?? ""),
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teachers");
    XLSX.writeFile(wb, "specimen_template.xlsx");
  };

  // ---------------------------------------------------------------------------
  // Channel helpers
  // ---------------------------------------------------------------------------

  // When global channel changes, reset all per-teacher overrides
  const handleGlobalChannelChange = (ch: ChannelOption) => {
    setGlobalChannel(ch);
    setPerTeacherChannel(new Map());
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setChannelTablePage(1);
  };

  const getEffectiveChannel = (idx: number): ChannelOption =>
    perTeacherChannel.get(idx) ?? globalChannel;

  const setTeacherChannel = (idx: number, ch: ChannelOption) => {
    setPerTeacherChannel((prev) => {
      const next = new Map(prev);
      // If matches global, remove override (clean)
      if (ch === globalChannel) {
        next.delete(idx);
      } else {
        next.set(idx, ch);
      }
      return next;
    });
  };

  const overrideCount = perTeacherChannel.size;

  // Filtered + paginated rows for channel table
  // Each item keeps its original index (globalIdx) so channel overrides still map correctly
  const filteredIndexedRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return parsedRows.map((row, idx) => ({ row, globalIdx: idx }));
    return parsedRows
      .map((row, idx) => ({ row, globalIdx: idx }))
      .filter(({ row }) =>
        (row.name ?? "").toLowerCase().includes(q) ||
        (row.phone ?? "").toLowerCase().includes(q) ||
        (row.email ?? "").toLowerCase().includes(q)
      );
  }, [parsedRows, searchQuery]);

  const channelTableTotalPages = Math.ceil(filteredIndexedRows.length / PAGE_SIZE);
  const channelTableRows = useMemo(
    () => filteredIndexedRows.slice((channelTablePage - 1) * PAGE_SIZE, channelTablePage * PAGE_SIZE),
    [filteredIndexedRows, channelTablePage]
  );

  // ---------------------------------------------------------------------------
  // Step navigation
  // ---------------------------------------------------------------------------

  const goToStep3 = async () => {
    setStep(3);
    setSkippedRows(new Set());
    setMergedSheetGroups(new Set());
    setSheetMergeConfigs(new Map());
    setMergeDialogGroup(null);
    setPendingConfig(null);
    setDuplicateMatches(null);
    setMergeDecisions(new Map());
    setUnmappedBookCodes(null);

    // 1. In-sheet duplicate check (instant, client-side)
    const sheetGroups = findInSheetDuplicates(parsedRows);
    setInSheetDuplicates(sheetGroups);

    // 2. DB duplicate check + book code lookup (parallel async)
    setIsDuplicateChecking(true);
    try {
      const rowsToCheck = parsedRows.map((r) => ({
        name: r.name ?? "",
        phone: r.phone ?? "",
        email: r.email ?? "",
        school: r.school ?? "",
      }));

      // Collect all unique book codes from the file
      const allCodes = new Set<string>();
      for (const row of parsedRows) {
        const books = (row.books ?? row.booksAssigned ?? "").trim();
        if (books) {
          for (const code of books.split(",")) {
            const c = code.trim();
            if (c) allCodes.add(c);
          }
        }
      }

      const [matches, bookLookupResult] = await Promise.all([
        checkDuplicatesAgainstDB(rowsToCheck),
        allCodes.size > 0
          ? lookupBookCodes([...allCodes])
              .then((res) => ({ ok: true as const, mappings: res.mappings }))
              .catch(() => ({ ok: false as const, mappings: [] }))
          : Promise.resolve({ ok: true as const, mappings: [] }),
      ]);

      setDuplicateMatches(matches);

      if (bookLookupResult.ok) {
        // Only mark as unmapped if the lookup actually succeeded
        const mappedCodes = new Set(bookLookupResult.mappings.map((m) => m.bookCode));
        setUnmappedBookCodes([...allCodes].filter((c) => !mappedCodes.has(c)));
      }
      // If lookup failed, leave unmappedBookCodes as null (UI shows nothing)

      // Default: auto-approve merges with no name conflict; leave name conflicts null (user must decide)
      const defaults = new Map<number, MergeDecision>();
      for (const m of matches) {
        if (!m.diff.nameConflict) {
          defaults.set(m.rowIndex, { action: "merge", nameChoice: "db" });
        }
        // nameConflict → leave null (undefined in map) so user must decide
      }
      setMergeDecisions(defaults);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to check duplicates");
      setDuplicateMatches([]);
      setMergeDecisions(new Map());
      setUnmappedBookCodes(null);
    } finally {
      setIsDuplicateChecking(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Final submit
  // ---------------------------------------------------------------------------

  const handleCreateBatch = async () => {
    if (!selectedFile || parsedRows.length === 0) return;

    // Validate: all matches with nameConflict must have a decision
    if (duplicateMatches) {
      const unresolved = duplicateMatches.filter((m) => {
        const d = mergeDecisions.get(m.rowIndex);
        // A null or missing decision on a nameConflict match is unresolved
        return d === null || (d === undefined && m.diff.nameConflict);
      });
      if (unresolved.length > 0) {
        toast.error(`Please resolve all ${unresolved.length} name conflict(s) before continuing`);
        return;
      }
    }

    setIsUploading(true);
    try {
      // Send all rows' channels (aligned to original indices — backend uses same indices)
      const teacherChannels = parsedRows.map((_, idx) => getEffectiveChannel(idx));

      // Skipped rows from in-sheet duplicate review
      const skippedRowIndices = skippedRows.size > 0 ? [...skippedRows] : undefined;

      // Serialize approved merge decisions (original rowIndex — no remapping needed)
      const serializedDecisions = duplicateMatches
        ? duplicateMatches
            .filter((match) => !skippedRows.has(match.rowIndex))
            .map((match) => {
              const decision = mergeDecisions.get(match.rowIndex);
              if (!decision) return null;
              if (decision.action === "create_new") {
                return { rowIndex: match.rowIndex, action: "create_new" as const };
              }
              return {
                rowIndex: match.rowIndex,
                action: "merge" as const,
                teacherId: match.existingTeacher.id,
                nameChoice: decision.nameChoice,
                noChanges: match.diff.noChanges,
                phonesToAdd: match.diff.phonesToAdd,
                emailsToAdd: match.diff.emailsToAdd,
                newName: decision.nameChoice === "file" ? match.row.name : undefined,
              };
            })
            .filter((d): d is NonNullable<typeof d> => d !== null)
        : [];

      const result = await uploadSpecimen(selectedFile, globalChannel, teacherChannels, serializedDecisions, skippedRowIndices);
      toast.success(`Batch created with ${result.rowCount} teachers`);
      router.push(`/batches/${result.batchId}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Derived counts
  // ---------------------------------------------------------------------------

  const channelCounts = useMemo(() => ({
    phoneOnly: parsedRows.filter((r) => r.phone && !r.email).length,
    emailOnly: parsedRows.filter((r) => !r.phone && r.email).length,
    both: parsedRows.filter((r) => r.phone && r.email).length,
    neither: parsedRows.filter((r) => !r.phone && !r.email).length,
  }), [parsedRows]);

  const estimatedOrders = parsedRows.reduce(
    (acc, row) => acc + (row.books ? row.books.split(",").length : 0),
    0
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Quick-map modal handlers
  // ---------------------------------------------------------------------------

  const openQuickMap = (code: string) => {
    setQuickMapCode(code);
    setQuickMapQuery("");
    setQuickMapHits([]);
    setQuickMapSelected(null);
    setQuickMapProducts([]);
  };

  const closeQuickMap = () => {
    setQuickMapCode(null);
    setQuickMapQuery("");
    setQuickMapHits([]);
    setQuickMapSelected(null);
    setQuickMapProducts([]);
  };

  const addQuickMapProduct = (hit: AlgoliaHit) => {
    if (quickMapProducts.some((p) => p.productId === hit.objectID)) return;
    setQuickMapProducts((prev) => [
      ...prev,
      {
        productId: hit.objectID,
        productTitle: hit.title ?? hit.objectID,
        authors: Array.isArray(hit.authors) ? hit.authors : [],
      },
    ]);
    setQuickMapQuery("");
    setQuickMapHits([]);
  };

  const removeQuickMapProduct = (productId: string) => {
    setQuickMapProducts((prev) => prev.filter((p) => p.productId !== productId));
  };

  const handleQuickMapSave = async () => {
    if (!quickMapCode || quickMapProducts.length === 0) return;
    setQuickMapSaving(true);
    try {
      await Promise.all(
        quickMapProducts.map((p) =>
          createBookMapping({
            bookCode: quickMapCode,
            productId: p.productId,
            productTitle: p.productTitle,
            authors: p.authors,
          })
        )
      );
      // Remove from unmapped list
      setUnmappedBookCodes((prev) => prev ? prev.filter((c) => c !== quickMapCode) : prev);
      toast.success(`Mapped "${quickMapCode}" → ${quickMapProducts.length} product(s)`);
      closeQuickMap();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save mapping");
    } finally {
      setQuickMapSaving(false);
    }
  };

  // Debounced Algolia search for quick-map modal
  useEffect(() => {
    if (!quickMapQuery.trim()) { setQuickMapHits([]); setQuickMapSearching(false); return; }
    setQuickMapSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await searchAlgolia(quickMapQuery);
        setQuickMapHits(res.hits);
      } catch {
        setQuickMapHits([]);
      } finally {
        setQuickMapSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [quickMapQuery]);

  // ---------------------------------------------------------------------------
  // Merge dialog handlers
  // ---------------------------------------------------------------------------

  const openMergeDialog = (group: SheetDuplicateGroup) => {
    const allGroupRows = group.rowIndices.map((i) => parsedRows[i]).filter(Boolean) as UploadRow[];
    const allPhones = [...new Set(allGroupRows.map((r) => r.phone).filter(Boolean) as string[])];
    const allEmails = [...new Set(allGroupRows.map((r) => r.email).filter(Boolean) as string[])];
    const allNames = [...new Set(allGroupRows.map((r) => r.name).filter(Boolean) as string[])];
    setPendingConfig({
      chosenName: allNames[0] ?? "",
      chosenPhones: new Set(allPhones),
      chosenEmails: new Set(allEmails),
    });
    setMergeDialogGroup(group);
  };

  const handleMergeConfirm = () => {
    if (!mergeDialogGroup || !pendingConfig) return;
    const group = mergeDialogGroup;
    const extraIndices = group.rowIndices.slice(1);
    setMergedSheetGroups((prev) => new Set([...prev, group.key]));
    setSkippedRows((prev) => {
      const next = new Set(prev);
      for (const idx of extraIndices) next.add(idx);
      return next;
    });
    setSheetMergeConfigs((prev) => {
      const next = new Map(prev);
      next.set(group.key, pendingConfig);
      return next;
    });
    setMergeDialogGroup(null);
    setPendingConfig(null);
  };

  return (
    <div className="space-y-8">
      {/* Merge Config Dialog */}
      {mergeDialogGroup && pendingConfig && (() => {
        const group = mergeDialogGroup;
        const allGroupRows = group.rowIndices.map((i) => parsedRows[i]).filter(Boolean) as UploadRow[];
        const allPhones = [...new Set(allGroupRows.map((r) => r.phone).filter(Boolean) as string[])];
        const allEmails = [...new Set(allGroupRows.map((r) => r.email).filter(Boolean) as string[])];
        const allNames = [...new Set(allGroupRows.map((r) => r.name).filter(Boolean) as string[])];
        const multipleNames = allNames.length > 1;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl border border-border space-y-5 max-h-[90vh] overflow-y-auto">
              <div>
                <h3 className="text-base font-semibold text-foreground">Configure Merge</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {group.rowIndices.length} rows share <span className="font-mono font-semibold">{group.value}</span>. Choose what to keep.
                </p>
              </div>

              {/* Name */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Name</p>
                {multipleNames ? (
                  <div className="space-y-1.5">
                    {allNames.map((name) => (
                      <label key={name} className="flex items-center gap-3 cursor-pointer rounded-lg border border-border px-3 py-2.5 hover:bg-muted/30 transition-colors">
                        <input
                          type="radio"
                          checked={pendingConfig.chosenName === name}
                          onChange={() => setPendingConfig((prev) => prev ? { ...prev, chosenName: name } : prev)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-medium text-foreground">{name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border px-3 py-2.5 text-sm text-foreground flex items-center justify-between">
                    <span className="font-medium">{allNames[0] || "—"}</span>
                    <span className="text-xs text-muted-foreground">same across all rows</span>
                  </div>
                )}
              </div>

              {/* Phones */}
              {allPhones.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Phones to include</p>
                  <div className="space-y-1.5">
                    {allPhones.map((phone) => (
                      <label key={phone} className="flex items-center gap-3 cursor-pointer rounded-lg border border-border px-3 py-2.5 hover:bg-muted/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={pendingConfig.chosenPhones.has(phone)}
                          onChange={() => setPendingConfig((prev) => {
                            if (!prev) return prev;
                            const next = new Set(prev.chosenPhones);
                            if (next.has(phone)) next.delete(phone); else next.add(phone);
                            return { ...prev, chosenPhones: next };
                          })}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-mono text-foreground">{phone}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Emails */}
              {allEmails.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Emails to include</p>
                  <div className="space-y-1.5">
                    {allEmails.map((email) => (
                      <label key={email} className="flex items-center gap-3 cursor-pointer rounded-lg border border-border px-3 py-2.5 hover:bg-muted/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={pendingConfig.chosenEmails.has(email)}
                          onChange={() => setPendingConfig((prev) => {
                            if (!prev) return prev;
                            const next = new Set(prev.chosenEmails);
                            if (next.has(email)) next.delete(email); else next.add(email);
                            return { ...prev, chosenEmails: next };
                          })}
                          className="accent-blue-600"
                        />
                        <span className="text-sm font-mono text-foreground">{email}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview */}
              <div className="rounded-lg border border-blue-400/40 bg-blue-500/5 p-3">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2">Merged Teacher Preview</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  <div>
                    <span className="text-muted-foreground block">Name</span>
                    <p className="font-medium text-foreground">{pendingConfig.chosenName || "—"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Phone{pendingConfig.chosenPhones.size !== 1 ? "s" : ""}</span>
                    <p className="font-mono text-foreground">{[...pendingConfig.chosenPhones].join(", ") || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground block">Email{pendingConfig.chosenEmails.size !== 1 ? "s" : ""}</span>
                    <p className="font-mono text-foreground">{[...pendingConfig.chosenEmails].join(", ") || "—"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button
                  onClick={() => { setMergeDialogGroup(null); setPendingConfig(null); }}
                  className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMergeConfirm}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Confirm Merge
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Quick-Map Modal */}
      {quickMapCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-visible">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h3 className="text-base font-semibold text-foreground">Map Book Code</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Code: <span className="font-mono font-semibold text-foreground">{quickMapCode}</span>
                  {" · "}One code can map to multiple products
                </p>
              </div>
              <button onClick={closeQuickMap} className="rounded-md p-1 text-muted-foreground hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Algolia search */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-1">Search &amp; Add Products</label>
                <input
                  value={quickMapQuery}
                  onChange={(e) => {
                    setQuickMapQuery(e.target.value);
                    if (e.target.value.trim()) setQuickMapSearching(true);
                    else { setQuickMapSearching(false); setQuickMapHits([]); }
                  }}
                  placeholder="Type product name or ISBN…"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {quickMapQuery.trim() && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-xl max-h-52 overflow-y-auto">
                    {quickMapSearching ? (
                      <div className="flex items-center gap-2 px-3 py-4 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" /> Searching…
                      </div>
                    ) : quickMapHits.length === 0 ? (
                      <div className="px-3 py-4 text-center text-sm text-muted-foreground">No products found</div>
                    ) : (
                      quickMapHits.map((hit) => {
                        const alreadyAdded = quickMapProducts.some((p) => p.productId === hit.objectID);
                        return (
                          <button
                            key={hit.objectID}
                            onClick={() => addQuickMapProduct(hit)}
                            disabled={alreadyAdded}
                            className="w-full text-left px-3 py-2.5 text-sm hover:bg-muted border-b border-border last:border-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <span className="font-medium text-foreground">{hit.title ?? hit.objectID}</span>
                            {hit.isbn && <span className="ml-2 text-xs text-muted-foreground">ISBN: {hit.isbn as string}</span>}
                            {hit.authors && hit.authors.length > 0 && (
                              <span className="ml-2 text-xs text-muted-foreground">by {hit.authors.map((a) => a.title).join(", ")}</span>
                            )}
                            {alreadyAdded && <span className="ml-2 text-xs text-blue-600 font-medium">Added</span>}
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* Selected products list */}
              {quickMapProducts.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mapped Products <span className="text-muted-foreground font-normal">({quickMapProducts.length})</span>
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {quickMapProducts.map((p) => (
                      <div key={p.productId} className="flex items-center gap-2 rounded-lg border border-blue-400/40 bg-blue-500/5 px-3 py-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{p.productTitle}</p>
                          <p className="text-xs font-mono text-muted-foreground">{p.productId}</p>
                          {p.authors.length > 0 && (
                            <p className="text-xs text-muted-foreground">by {p.authors.map((a) => a.title).join(", ")}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeQuickMapProduct(p.productId)}
                          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {quickMapProducts.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  Search above to add products. You can add multiple products per code.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-border px-5 py-4">
              <button onClick={closeQuickMap} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Cancel
              </button>
              <button
                onClick={handleQuickMapSave}
                disabled={quickMapProducts.length === 0 || quickMapSaving}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {quickMapSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                Save {quickMapProducts.length > 0 ? `${quickMapProducts.length} Mapping${quickMapProducts.length > 1 ? "s" : ""}` : "Mapping"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Specimen</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload an Excel or CSV file to start a new distribution batch
        </p>
      </div>

      {/* Download Template — only shown before a file is uploaded */}
      {step === 1 && parsedRows.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Specimen Template</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Download the template, fill in teacher data, then upload below.
              </p>
            </div>
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50"
            >
              <Download className="h-4 w-4" />
              Download Template
            </button>
          </div>
        </div>
      )}

      {parsedRows.length > 0 && (
        <div className="flex items-center justify-center">
          <StepIndicator current={step} />
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Step 1: Upload + Preview                                             */}
      {/* ------------------------------------------------------------------ */}
      {step === 1 && (
        <>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-foreground">Upload File</h2>
            {isParsing && (
              <p className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Parsing file…
              </p>
            )}
            <FileUploadZone onFileSelect={handleFileSelect} onClear={handleCancel} />
          </div>

          {parsedRows.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                  <p className="text-sm text-muted-foreground">Teachers</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{parsedRows.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                  <p className="text-sm text-muted-foreground">Estimated Orders</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">{estimatedOrders}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                  <p className="text-sm text-muted-foreground">File</p>
                  <p className="mt-1 text-sm font-medium text-foreground truncate">{selectedFile?.name}</p>
                </div>
              </div>

              <div className="min-w-0 w-full">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Preview</h2>
                <div className="w-full overflow-x-auto overflow-y-auto max-h-96">
                  <DataTable
                    columns={previewColumns}
                    data={parsedRows}
                    keyExtractor={(_, idx) => String(idx)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button onClick={handleCancel} className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50">
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Next: Select Channels <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Step 2: Channel Selection (global + per-teacher)                     */}
      {/* ------------------------------------------------------------------ */}
      {step === 2 && (
        <div className="space-y-6">

          {/* Global selector */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-foreground">Select Notification Channel</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Choose a default channel for all teachers, then override per-teacher below.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <ChannelCard
                value="whatsapp" selected={globalChannel === "whatsapp"} onSelect={handleGlobalChannelChange}
                icon={<MessageCircle className={`h-6 w-6 ${globalChannel === "whatsapp" ? "text-white" : "text-green-600"}`} />}
                label="WhatsApp Only" description="Send via WhatsApp to teachers with a phone number"
                accentClass="bg-green-600/10 border-green-600"
              />
              <ChannelCard
                value="email" selected={globalChannel === "email"} onSelect={handleGlobalChannelChange}
                icon={<Mail className={`h-6 w-6 ${globalChannel === "email" ? "text-white" : "text-blue-600"}`} />}
                label="Email Only" description="Send via email to teachers with an email address"
                accentClass="bg-blue-600/10 border-blue-600"
              />
              <ChannelCard
                value="both" selected={globalChannel === "both"} onSelect={handleGlobalChannelChange}
                icon={<Users className={`h-6 w-6 ${globalChannel === "both" ? "text-white" : "text-purple-600"}`} />}
                label="Both (WhatsApp + Email)" description="Use all available contact methods"
                accentClass="bg-purple-600/10 border-purple-600"
              />
            </div>
          </div>

          {/* Contact coverage */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contact Coverage</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                <p className="text-xl font-bold text-foreground">{channelCounts.both}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Phone + Email</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                <p className="text-xl font-bold text-foreground">{channelCounts.phoneOnly}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Phone Only</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                <p className="text-xl font-bold text-foreground">{channelCounts.emailOnly}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Email Only</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
                <p className="text-xl font-bold text-orange-500">{channelCounts.neither}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">No Contact Info</p>
              </div>
            </div>
          </div>

          {/* Per-teacher override table */}
          <div className="rounded-xl border border-border bg-card shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Per-Teacher Channel Override</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  <span className="font-medium text-foreground">[W]</span> WhatsApp &nbsp;
                  <span className="font-medium text-foreground">[E]</span> Email &nbsp;
                  <span className="font-medium text-foreground">[B]</span> Both
                  {overrideCount > 0 && (
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {overrideCount} override{overrideCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </p>
              </div>
              {overrideCount > 0 && (
                <button
                  onClick={() => setPerTeacherChannel(new Map())}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Search */}
            <div className="border-b border-border px-5 py-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, phone or email…"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {filteredIndexedRows.length} result{filteredIndexedRows.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>

            <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-card border-b border-border">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">#</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">Phone</th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase">Email</th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground uppercase">Channel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {channelTableRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                        No teachers match your search.
                      </td>
                    </tr>
                  ) : (
                    channelTableRows.map(({ row, globalIdx }) => {
                      const effective = getEffectiveChannel(globalIdx);
                      const hasOverride = perTeacherChannel.has(globalIdx);
                      return (
                        <tr key={globalIdx} className={hasOverride ? "bg-blue-500/5" : "hover:bg-muted/20"}>
                          <td className="px-4 py-2 text-xs text-muted-foreground">{globalIdx + 1}</td>
                          <td className="px-4 py-2 font-medium text-foreground text-xs">{row.name || "—"}</td>
                          <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{row.phone || "—"}</td>
                          <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{row.email || "—"}</td>
                          <td className="px-4 py-2 text-center">
                            <ChannelPill
                              value={effective}
                              onChange={(ch) => setTeacherChannel(globalIdx, ch)}
                              hasPhone={!!row.phone}
                              hasEmail={!!row.email}
                            />
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table pagination */}
            {channelTableTotalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border px-5 py-3">
                <span className="text-xs text-muted-foreground">
                  Page {channelTablePage} of {channelTableTotalPages} · {filteredIndexedRows.length}{searchQuery ? ` matched` : ` teachers`}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setChannelTablePage(1)} disabled={channelTablePage <= 1}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40">«</button>
                  <button onClick={() => setChannelTablePage((p) => p - 1)} disabled={channelTablePage <= 1}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40">‹ Prev</button>
                  <button onClick={() => setChannelTablePage((p) => p + 1)} disabled={channelTablePage >= channelTableTotalPages}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40">Next ›</button>
                  <button onClick={() => setChannelTablePage(channelTableTotalPages)} disabled={channelTablePage >= channelTableTotalPages}
                    className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40">»</button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => setStep(1)}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={goToStep3}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
              Next: Review Duplicates <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Step 3: Duplicate Review — git-diff style                           */}
      {/* ------------------------------------------------------------------ */}
      {step === 3 && (
        <div className="space-y-6">
          {/* ── Section 1: In-sheet duplicates ─────────────────────────── */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-foreground">Within-File Duplicates</h2>
                {inSheetDuplicates.length === 0 ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    None found
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">
                    {inSheetDuplicates.length} group{inSheetDuplicates.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {(skippedRows.size > 0 || mergedSheetGroups.size > 0) && (
                <div className="flex items-center gap-3">
                  {skippedRows.size > 0 && <span className="text-xs text-muted-foreground">{skippedRows.size} row{skippedRows.size !== 1 ? "s" : ""} skipped</span>}
                  {mergedSheetGroups.size > 0 && <span className="text-xs text-muted-foreground">{mergedSheetGroups.size} group{mergedSheetGroups.size !== 1 ? "s" : ""} merged</span>}
                  <button onClick={() => { setSkippedRows(new Set()); setMergedSheetGroups(new Set()); }} className="text-xs text-blue-600 hover:underline">Reset all</button>
                </div>
              )}
            </div>

            {inSheetDuplicates.length === 0 ? (
              <div className="flex items-center gap-2.5 px-5 py-4 text-sm text-green-700 dark:text-green-400">
                <CheckCircle className="h-4 w-4 shrink-0" />
                No duplicate phones or emails within the file — all {parsedRows.length.toLocaleString()} rows are unique.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {inSheetDuplicates.map((group) => {
                  const isMerged = mergedSheetGroups.has(group.key);
                  const keepIdx = group.rowIndices[0]!;
                  const extraIndices = group.rowIndices.slice(1);

                  // Build final merged teacher preview
                  const allGroupRows = group.rowIndices.map((i) => parsedRows[i]).filter(Boolean) as UploadRow[];
                  const finalName = allGroupRows[0]?.name || "—";
                  const allPhones = [...new Set(allGroupRows.map(r => r.phone).filter(Boolean) as string[])];
                  const allEmails = [...new Set(allGroupRows.map(r => r.email).filter(Boolean) as string[])];
                  const finalSchool = allGroupRows.find(r => r.school)?.school || "—";

                  const handleMerge = () => openMergeDialog(group);
                  const handleUndoMerge = () => {
                    setMergedSheetGroups(prev => { const n = new Set(prev); n.delete(group.key); return n; });
                    setSkippedRows(prev => {
                      const next = new Set(prev);
                      for (const idx of extraIndices) next.delete(idx);
                      return next;
                    });
                    setSheetMergeConfigs(prev => { const n = new Map(prev); n.delete(group.key); return n; });
                  };

                  return (
                    <div key={group.key} className={["px-5 py-4", isMerged ? "bg-blue-500/5" : ""].join(" ")}>
                      {/* Group header */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className={[
                            "rounded-full px-2 py-0.5 font-semibold",
                            group.type === "phone"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
                          ].join(" ")}>
                            {group.type === "phone" ? "Phone" : "Email"}
                          </span>
                          <span className="font-mono font-semibold text-foreground">{group.value}</span>
                          <span className="text-muted-foreground">· {group.rowIndices.length} rows share this {group.type}</span>
                          {isMerged && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                              ✓ Merged → 1 teacher
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isMerged ? (
                            <button onClick={handleUndoMerge}
                              className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted">
                              Undo Merge
                            </button>
                          ) : (
                            <button onClick={handleMerge}
                              className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700">
                              Merge into 1 Teacher
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Rows table */}
                      <div className="overflow-hidden rounded-lg border border-border">
                        <table className="min-w-full text-xs">
                          <thead className="bg-muted/40">
                            <tr>
                              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase">Row</th>
                              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase">Name</th>
                              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase">Phone</th>
                              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase">Email</th>
                              <th className="px-3 py-2 text-left font-semibold text-muted-foreground uppercase">School</th>
                              {!isMerged && <th className="px-3 py-2 text-center font-semibold text-muted-foreground uppercase">Action</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {group.rowIndices.map((rowIdx, pos) => {
                              const row = parsedRows[rowIdx];
                              if (!row) return null;
                              const isSkippedByMerge = isMerged && pos > 0;
                              const isSkippedManual = !isMerged && skippedRows.has(rowIdx);
                              const isSkipped = isSkippedByMerge || isSkippedManual;
                              return (
                                <tr key={rowIdx} className={[
                                  isSkipped ? "opacity-40 bg-muted/20" : isMerged && pos === 0 ? "bg-blue-500/5" : "hover:bg-muted/10",
                                ].join(" ")}>
                                  <td className="px-3 py-2 text-muted-foreground">
                                    #{rowIdx + 1}
                                    {isMerged && pos === 0 && (
                                      <span className="ml-1.5 rounded bg-blue-600 px-1 py-0.5 text-[10px] font-semibold text-white">kept</span>
                                    )}
                                    {isSkippedByMerge && (
                                      <span className="ml-1.5 rounded bg-muted px-1 py-0.5 text-[10px] text-muted-foreground">merged</span>
                                    )}
                                  </td>
                                  <td className={["px-3 py-2 font-medium", isSkipped ? "line-through text-muted-foreground" : "text-foreground"].join(" ")}>{row.name || "—"}</td>
                                  <td className="px-3 py-2 font-mono text-muted-foreground">{row.phone || "—"}</td>
                                  <td className="px-3 py-2 font-mono text-muted-foreground">{row.email || "—"}</td>
                                  <td className="px-3 py-2 text-muted-foreground">{row.school || "—"}</td>
                                  {!isMerged && (
                                    <td className="px-3 py-2 text-center">
                                      <button
                                        onClick={() => setSkippedRows((prev) => {
                                          const next = new Set(prev);
                                          if (isSkippedManual) next.delete(rowIdx); else next.add(rowIdx);
                                          return next;
                                        })}
                                        className={[
                                          "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                                          isSkippedManual
                                            ? "bg-muted text-muted-foreground hover:bg-muted/70"
                                            : "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
                                        ].join(" ")}
                                      >
                                        {isSkippedManual ? "Restore" : "Skip"}
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Final teacher preview (shown when merged) */}
                      {isMerged && (() => {
                        const cfg = sheetMergeConfigs.get(group.key);
                        const previewName = cfg?.chosenName || finalName;
                        const previewPhones = cfg ? [...cfg.chosenPhones] : allPhones;
                        const previewEmails = cfg ? [...cfg.chosenEmails] : allEmails;
                        return (
                          <div className="mt-3 rounded-lg border border-blue-400/40 bg-blue-500/5 p-3">
                            <p className="mb-2 text-xs font-semibold text-blue-700 dark:text-blue-400">Final Teacher Record</p>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:grid-cols-4">
                              <div>
                                <span className="text-muted-foreground">Name</span>
                                <p className="font-medium text-foreground">{previewName}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Phone{previewPhones.length !== 1 ? "s" : ""}</span>
                                <p className="font-mono text-foreground">{previewPhones.join(", ") || "—"}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Email{previewEmails.length !== 1 ? "s" : ""}</span>
                                <p className="font-mono text-foreground">{previewEmails.join(", ") || "—"}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">School</span>
                                <p className="text-foreground">{finalSchool}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Section 2: Unmapped book codes ─────────────────────────── */}
          {unmappedBookCodes !== null && (
            <div className={[
              "rounded-xl border shadow-sm overflow-hidden",
              unmappedBookCodes.length > 0
                ? "border-orange-400/60 bg-orange-50/30 dark:bg-orange-950/10"
                : "border-green-200 bg-green-50/30 dark:bg-green-950/10",
            ].join(" ")}>
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border">
                <h2 className="font-semibold text-foreground">Book Code Mappings</h2>
                {unmappedBookCodes.length === 0 ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    All mapped
                  </span>
                ) : (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">
                    {unmappedBookCodes.length} unmapped
                  </span>
                )}
              </div>
              <div className="px-5 py-4">
                {unmappedBookCodes.length === 0 ? (
                  <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    All book codes in this file have product mappings. Orders will generate correctly.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-orange-700 dark:text-orange-400">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>
                        The following book codes have no product mapping. Orders for these codes may not generate specimen links correctly.
                        You can still create the batch — add mappings in{" "}
                        <a href="/book-mappings" target="_blank" rel="noreferrer" className="underline font-medium hover:text-orange-800">
                          Book Mappings
                        </a>{" "}
                        before sending.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {unmappedBookCodes.map((code) => (
                        <button
                          key={code}
                          onClick={() => openQuickMap(code)}
                          className="rounded-md border border-orange-200 bg-orange-100 px-2 py-0.5 text-xs font-mono font-medium text-orange-800 hover:bg-orange-200 hover:border-orange-400 transition-colors cursor-pointer dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50"
                          title={`Click to map "${code}" to a product`}
                        >
                          {code} +
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Section 3: DB duplicates ────────────────────────────────── */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-foreground">Database Duplicates</h2>
            <p className="text-sm text-muted-foreground">
              Checking all {parsedRows.length.toLocaleString()} rows against existing teachers in the database. Nothing merges until you approve.
            </p>
          </div>

          {/* Loading */}
          {isDuplicateChecking && (
            <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card p-16 shadow-sm">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <div>
                <p className="font-medium text-foreground">Checking for duplicates…</p>
                <p className="text-sm text-muted-foreground mt-0.5">Matching phones, emails and names</p>
              </div>
            </div>
          )}

          {!isDuplicateChecking && duplicateMatches !== null && (() => {
            const noChangesCount = duplicateMatches.filter(m => m.diff.noChanges).length;
            const needsActionCount = duplicateMatches.filter(m => !m.diff.noChanges).length;

            return (
              <>
                {/* Summary bar */}
                {duplicateMatches.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-lg border border-border bg-card p-3 text-center">
                      <p className="text-xl font-bold text-foreground">{duplicateMatches.length}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Potential matches</p>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-center dark:border-green-800 dark:bg-green-950/20">
                      <p className="text-xl font-bold text-green-700 dark:text-green-400">{noChangesCount}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Exact duplicate (skip)</p>
                    </div>
                    <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-center dark:border-orange-800 dark:bg-orange-950/20">
                      <p className="text-xl font-bold text-orange-700 dark:text-orange-400">{needsActionCount}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Has changes to review</p>
                    </div>
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center dark:border-blue-800 dark:bg-blue-950/20">
                      <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                        {[...mergeDecisions.values()].filter(d => d?.action === "merge").length}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Approved merges</p>
                    </div>
                  </div>
                )}

                {duplicateMatches.length === 0 ? (
                  <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
                    <CheckCircle className="h-6 w-6 shrink-0 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-400">No duplicates found</p>
                      <p className="mt-0.5 text-sm text-green-600 dark:text-green-500">All {parsedRows.length.toLocaleString()} teachers are new records.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {duplicateMatches.map((match) => {
                      const decision = mergeDecisions.get(match.rowIndex) ?? null;
                      const isMerging = decision?.action === "merge";
                      const isCreatingNew = decision?.action === "create_new";
                      const { diff } = match;

                      return (
                        <div key={match.rowIndex} className={[
                          "rounded-xl border shadow-sm overflow-hidden",
                          isMerging ? "border-blue-400/60" : isCreatingNew ? "border-muted" : "border-orange-400/60",
                        ].join(" ")}>
                          {/* Card header */}
                          <div className={[
                            "flex items-center justify-between px-4 py-2.5 text-xs font-medium",
                            isMerging ? "bg-blue-50 dark:bg-blue-950/30" : isCreatingNew ? "bg-muted/30" : "bg-orange-50 dark:bg-orange-950/20",
                          ].join(" ")}>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Row #{match.rowIndex + 1}</span>
                              <span className="text-muted-foreground">·</span>
                              <span className={[
                                "rounded-full px-2 py-0.5 font-semibold",
                                match.confidence >= 90 ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                  : match.confidence >= 70 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
                              ].join(" ")}>
                                {match.confidence}% match
                              </span>
                              <span className="text-muted-foreground">{match.matchReasons.join(" · ")}</span>
                              {diff.noChanges && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                  Exact duplicate — no changes needed
                                </span>
                              )}
                              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground font-mono" title="Database teacher ID">
                                DB ID: {match.existingTeacher.id}
                              </span>
                            </div>
                            {/* Action buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setMergeDecisions(prev => { const n = new Map(prev); n.set(match.rowIndex, { action: "create_new" }); return n; })}
                                className={[
                                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                                  isCreatingNew
                                    ? "bg-muted text-foreground ring-1 ring-border"
                                    : "text-muted-foreground hover:bg-muted",
                                ].join(" ")}
                              >
                                Create New
                              </button>
                              <button
                                onClick={() => setMergeDecisions(prev => {
                                  const n = new Map(prev);
                                  if (isMerging) {
                                    n.delete(match.rowIndex); // undo merge → back to undecided
                                  } else {
                                    n.set(match.rowIndex, { action: "merge", nameChoice: "db" });
                                  }
                                  return n;
                                })}
                                className={[
                                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                                  isMerging
                                    ? "bg-blue-600 text-white"
                                    : "bg-muted text-muted-foreground hover:bg-blue-100 hover:text-blue-700",
                                ].join(" ")}
                              >
                                {isMerging ? "✓ Merging" : "Merge"}
                              </button>
                            </div>
                          </div>

                          {/* Git-diff body */}
                          <div className="font-mono text-xs">
                            {/* Name row */}
                            <div className="grid grid-cols-2 border-b border-border">
                              <div className={["px-4 py-2 border-r border-border", diff.nameConflict ? "bg-red-500/5" : ""].join(" ")}>
                                <span className="text-muted-foreground mr-2 select-none">{diff.nameConflict ? "−" : " "}</span>
                                <span className={diff.nameConflict ? "text-red-600 dark:text-red-400" : "text-foreground"}>
                                  name: {match.existingTeacher.name || "—"}
                                </span>
                                <span className="ml-2 text-muted-foreground/50 text-[10px]">[DB]</span>
                              </div>
                              <div className={["px-4 py-2", diff.nameConflict ? "bg-green-500/5" : ""].join(" ")}>
                                <span className="text-muted-foreground mr-2 select-none">{diff.nameConflict ? "+" : " "}</span>
                                <span className={diff.nameConflict ? "text-green-600 dark:text-green-400" : "text-foreground"}>
                                  name: {match.row.name || "—"}
                                </span>
                                <span className="ml-2 text-muted-foreground/50 text-[10px]">[File]</span>
                              </div>
                            </div>

                            {/* Name conflict resolution */}
                            {diff.nameConflict && isMerging && (
                              <div className="bg-blue-50/50 dark:bg-blue-950/20 px-4 py-2 border-b border-border flex items-center gap-4 text-xs">
                                <span className="font-sans font-medium text-blue-700 dark:text-blue-400">Which name to keep in DB?</span>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                  <input type="radio" name={`name-${match.rowIndex}`} checked={decision?.action === "merge" && decision.nameChoice === "db"}
                                    onChange={() => setMergeDecisions(prev => { const n = new Map(prev); n.set(match.rowIndex, { action: "merge", nameChoice: "db" }); return n; })}
                                    className="accent-blue-600" />
                                  <span className="font-sans text-foreground">Keep DB: <strong>{match.existingTeacher.name}</strong></span>
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer">
                                  <input type="radio" name={`name-${match.rowIndex}`} checked={decision?.action === "merge" && decision.nameChoice === "file"}
                                    onChange={() => setMergeDecisions(prev => { const n = new Map(prev); n.set(match.rowIndex, { action: "merge", nameChoice: "file" }); return n; })}
                                    className="accent-blue-600" />
                                  <span className="font-sans text-foreground">Use file: <strong>{match.row.name}</strong></span>
                                </label>
                              </div>
                            )}

                            {/* Phones */}
                            <div className="grid grid-cols-2 border-b border-border">
                              <div className="px-4 py-2 border-r border-border">
                                <span className="text-muted-foreground mr-2 select-none"> </span>
                                <span className="text-foreground">phones: [{match.existingTeacher.phones.join(", ") || "none"}]</span>
                                <span className="ml-2 text-muted-foreground/50 text-[10px]">[DB]</span>
                              </div>
                              <div className={["px-4 py-2", diff.phonesToAdd.length > 0 ? "bg-green-500/5" : ""].join(" ")}>
                                {diff.phonesToAdd.length > 0 ? (
                                  <>
                                    <span className="text-muted-foreground mr-2 select-none">+</span>
                                    <span className="text-green-600 dark:text-green-400">
                                      phones: [{[...match.existingTeacher.phones, ...diff.phonesToAdd].join(", ")}]
                                    </span>
                                    <span className="ml-2 text-green-500/70 text-[10px]">+{diff.phonesToAdd.join(", ")} added</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-muted-foreground mr-2 select-none"> </span>
                                    <span className="text-muted-foreground">phones: already in DB</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Emails */}
                            <div className="grid grid-cols-2 border-b border-border">
                              <div className="px-4 py-2 border-r border-border">
                                <span className="text-muted-foreground mr-2 select-none"> </span>
                                <span className="text-foreground">emails: [{match.existingTeacher.emails.join(", ") || "none"}]</span>
                                <span className="ml-2 text-muted-foreground/50 text-[10px]">[DB]</span>
                              </div>
                              <div className={["px-4 py-2", diff.emailsToAdd.length > 0 ? "bg-green-500/5" : ""].join(" ")}>
                                {diff.emailsToAdd.length > 0 ? (
                                  <>
                                    <span className="text-muted-foreground mr-2 select-none">+</span>
                                    <span className="text-green-600 dark:text-green-400">
                                      emails: [{[...match.existingTeacher.emails, ...diff.emailsToAdd].join(", ")}]
                                    </span>
                                    <span className="ml-2 text-green-500/70 text-[10px]">+{diff.emailsToAdd.join(", ")} added</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-muted-foreground mr-2 select-none"> </span>
                                    <span className="text-muted-foreground">emails: already in DB</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* School */}
                            <div className={["grid grid-cols-2", diff.schoolConflict ? "" : ""].join(" ")}>
                              <div className={["px-4 py-2 border-r border-border", diff.schoolConflict ? "bg-red-500/5" : ""].join(" ")}>
                                <span className="text-muted-foreground mr-2 select-none">{diff.schoolConflict ? "−" : " "}</span>
                                <span className={diff.schoolConflict ? "text-red-600 dark:text-red-400" : "text-foreground"}>
                                  school: {match.existingTeacher.school || "—"}
                                </span>
                                <span className="ml-2 text-muted-foreground/50 text-[10px]">[DB]</span>
                              </div>
                              <div className={["px-4 py-2", diff.schoolConflict ? "bg-green-500/5" : ""].join(" ")}>
                                <span className="text-muted-foreground mr-2 select-none">{diff.schoolConflict ? "+" : " "}</span>
                                <span className={diff.schoolConflict ? "text-green-600 dark:text-green-400" : "text-foreground"}>
                                  school: {match.row.school || "—"}
                                </span>
                                <span className="ml-2 text-muted-foreground/50 text-[10px]">[File]</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })()}

          <div className="flex items-center justify-between">
            <button onClick={() => setStep(2)} disabled={isUploading}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {(() => {
              const unresolvedNameConflicts = duplicateMatches
                ? duplicateMatches.filter((m) => {
                    if (!m.diff.nameConflict) return false;
                    const d = mergeDecisions.get(m.rowIndex);
                    return d === null || d === undefined;
                  }).length
                : 0;
              return (
                <button
                  onClick={handleCreateBatch}
                  disabled={isUploading || isDuplicateChecking || unresolvedNameConflicts > 0}
                  title={unresolvedNameConflicts > 0 ? `Resolve ${unresolvedNameConflicts} name conflict(s) first` : undefined}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Creating Batch…</>
                  ) : unresolvedNameConflicts > 0 ? (
                    <><AlertCircle className="h-4 w-4" /> Resolve {unresolvedNameConflicts} conflict{unresolvedNameConflicts !== 1 ? "s" : ""}</>
                  ) : (
                    <><CheckCircle className="h-4 w-4" /> Create Batch</>
                  )}
                </button>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
