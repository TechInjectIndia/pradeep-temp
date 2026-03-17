"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import DataTable, { type Column } from "@/components/DataTable";
import type { Teacher } from "@/types";
// import { useTeachers } from "@/hooks/useTeachers";

// TODO: Replace with useTeachers(params) hook
const mockTeachers: Teacher[] = [
  { id: "t-001", name: "Priya Sharma", phone: "+919876543210", email: "priya@dps.edu", school: "Delhi Public School", city: "New Delhi", createdAt: "2023-08-15T10:00:00Z" },
  { id: "t-002", name: "Rajesh Kumar", phone: "+919876543211", email: "rajesh@kv.edu", school: "Kendriya Vidyalaya", city: "Chandigarh", createdAt: "2023-09-01T11:00:00Z" },
  { id: "t-003", name: "Meena Patel", phone: "+919876543212", email: "meena@stxaviers.edu", school: "St. Xavier's School", city: "Mumbai", createdAt: "2023-09-15T09:00:00Z" },
  { id: "t-004", name: "Amit Singh", phone: "+919876543213", email: "amit@aps.edu", school: "Army Public School", city: "Pune", createdAt: "2023-10-01T14:00:00Z" },
  { id: "t-005", name: "Sunita Devi", phone: "+919876543214", email: "sunita@gov.edu", school: "Government School", city: "Jaipur", createdAt: "2023-10-15T08:00:00Z" },
  { id: "t-006", name: "Kavitha Rao", phone: "+919876543215", email: "kavitha@dav.edu", school: "DAV Public School", city: "Bangalore", createdAt: "2023-11-01T10:00:00Z" },
  { id: "t-007", name: "Deepak Verma", phone: "+919876543216", email: "deepak@rps.edu", school: "Ryan International", city: "Hyderabad", createdAt: "2023-11-15T12:00:00Z" },
  { id: "t-008", name: "Lakshmi Nair", phone: "+919876543217", email: "lakshmi@kvs.edu", school: "Kendriya Vidyalaya", city: "Kochi", createdAt: "2023-12-01T09:00:00Z" },
  { id: "t-009", name: "Vikram Choudhary", phone: "+919876543218", email: "vikram@dps.edu", school: "Delhi Public School", city: "Gurgaon", createdAt: "2023-12-15T11:00:00Z" },
  { id: "t-010", name: "Anita Deshmukh", phone: "+919876543219", email: "anita@model.edu", school: "Model School", city: "Nagpur", createdAt: "2024-01-01T10:00:00Z" },
];

const columns: Column<Teacher>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => <span className="font-medium">{row.name}</span>,
  },
  {
    key: "phone",
    header: "Phone",
    render: (row) => <span className="font-mono text-sm">{row.phone}</span>,
  },
  { key: "email", header: "Email" },
  { key: "school", header: "School" },
  { key: "city", header: "City" },
  {
    key: "createdAt",
    header: "Created",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = search
    ? mockTeachers.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.phone.includes(search) ||
          t.email.toLowerCase().includes(search.toLowerCase())
      )
    : mockTeachers;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Search and manage teacher records
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name, phone, or email..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        keyExtractor={(row) => row.id}
        pagination={{
          page,
          pageSize: 20,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / 20),
          onPageChange: setPage,
        }}
        emptyMessage="No teachers found matching your search."
      />
    </div>
  );
}
