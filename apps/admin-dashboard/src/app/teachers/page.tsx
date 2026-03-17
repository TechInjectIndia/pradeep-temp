"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import DataTable, { type Column } from "@/components/DataTable";
import type { Teacher } from "@/types";
// import { useTeachers } from "@/hooks/useTeachers";

// TODO: Replace with useTeachers(params) hook
const mockTeachers: Teacher[] = [
  {
    id: "t-001",
    name: "Priya Sharma",
    phone: "+919876543210",
    email: "priya@dps.edu",
    school: "Delhi Public School, Vasant Kunj",
    city: "New Delhi",
    createdAt: "2023-08-15T10:00:00Z",
  },
  {
    id: "t-002",
    name: "Rajesh Kumar",
    phone: "+919876543211",
    email: "rajesh@kv.edu",
    school: "Kendriya Vidyalaya, Sector 22",
    city: "Chandigarh",
    createdAt: "2023-09-01T09:30:00Z",
  },
  {
    id: "t-003",
    name: "Meena Patel",
    phone: "+919876543212",
    email: "meena@stxaviers.edu",
    school: "St. Xavier's School",
    city: "Mumbai",
    createdAt: "2023-07-20T14:00:00Z",
  },
  {
    id: "t-004",
    name: "Amit Singh",
    phone: "+919876543213",
    email: "amit@aps.edu",
    school: "Army Public School",
    city: "Pune",
    createdAt: "2023-10-10T11:15:00Z",
  },
  {
    id: "t-005",
    name: "Sunita Devi",
    phone: "+919876543214",
    email: "sunita@gov.edu",
    school: "Government Higher Secondary School",
    city: "Jaipur",
    createdAt: "2023-06-05T08:45:00Z",
  },
  {
    id: "t-006",
    name: "Kavita Reddy",
    phone: "+919876543215",
    email: "kavita@oakridge.edu",
    school: "Oakridge International School",
    city: "Hyderabad",
    createdAt: "2023-11-12T16:20:00Z",
  },
  {
    id: "t-007",
    name: "Vikram Joshi",
    phone: "+919876543216",
    email: "vikram@dav.edu",
    school: "DAV Public School",
    city: "Lucknow",
    createdAt: "2023-08-28T13:00:00Z",
  },
  {
    id: "t-008",
    name: "Anita Gupta",
    phone: "+919876543217",
    email: "anita@ryan.edu",
    school: "Ryan International School",
    city: "Bangalore",
    createdAt: "2023-09-15T10:30:00Z",
  },
  {
    id: "t-009",
    name: "Deepak Verma",
    phone: "+919876543218",
    email: "deepak@modern.edu",
    school: "Modern School, Barakhamba",
    city: "New Delhi",
    createdAt: "2023-07-01T09:00:00Z",
  },
  {
    id: "t-010",
    name: "Sanjay Mehta",
    phone: "+919876543219",
    email: "sanjay@heritage.edu",
    school: "The Heritage School",
    city: "Kolkata",
    createdAt: "2023-12-01T15:45:00Z",
  },
  {
    id: "t-011",
    name: "Ritu Agarwal",
    phone: "+919876543220",
    email: "ritu@bishop.edu",
    school: "Bishop Cotton School",
    city: "Shimla",
    createdAt: "2023-10-20T12:00:00Z",
  },
  {
    id: "t-012",
    name: "Manish Tiwari",
    phone: "+919876543221",
    email: "manish@springdale.edu",
    school: "Springdales School",
    city: "New Delhi",
    createdAt: "2023-11-05T14:30:00Z",
  },
];

const columns: Column<Teacher>[] = [
  {
    key: "name",
    header: "Name",
    render: (row) => <span className="font-medium text-gray-900">{row.name}</span>,
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
    header: "Added",
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const filtered = search
    ? mockTeachers.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.phone.includes(search) ||
          t.email.toLowerCase().includes(search.toLowerCase()) ||
          t.school.toLowerCase().includes(search.toLowerCase()) ||
          t.city.toLowerCase().includes(search.toLowerCase())
      )
    : mockTeachers;

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Search and manage teacher records
        </p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, email, school, or city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-gray-500">
          {filtered.length} teacher{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={paginatedData}
        keyExtractor={(row) => row.id}
        pagination={{
          page,
          pageSize,
          total: filtered.length,
          totalPages,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}
