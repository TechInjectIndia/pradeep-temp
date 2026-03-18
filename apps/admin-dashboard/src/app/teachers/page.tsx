"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import DataTable, { type Column } from "@/components/DataTable";
import LoadingSpinner from "@/components/LoadingSpinner";
import type { Teacher } from "@/types";
import { useTeachers } from "@/hooks/useTeachers";
import { formatDate } from "@/utils/date";

const columns: Column<Teacher>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => <span className="font-medium text-foreground">{row.name}</span>,
  },
  {
    key: "phone",
    header: "Phone",
    render: (row) => (
      <span className="font-mono text-sm">{row.phone || "—"}</span>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (row) => <span className="text-sm">{row.email || "—"}</span>,
  },
  { key: "school", header: "School" },
  { key: "city", header: "City" },
  {
    key: "createdAt",
    header: "Added",
    render: (row) => formatDate(row.createdAt),
  },
];

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const { data: response, isLoading } = useTeachers({
    page,
    pageSize,
    search: debouncedSearch || undefined,
  });

  const teachers = response?.data || [];
  const total = response?.total || 0;
  const totalPages = response?.totalPages || Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Teachers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search and manage teacher records
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
          <input
            type="text"
            placeholder="Search by name, phone, email, school, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground/70 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {total.toLocaleString()} teacher{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <DataTable
          columns={columns}
          data={teachers}
          keyExtractor={(row) => row.id}
          pagination={{
            page,
            pageSize,
            total,
            totalPages,
            onPageChange: setPage,
          }}
        />
      )}
    </div>
  );
}
