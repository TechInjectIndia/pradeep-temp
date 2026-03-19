"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { clsx } from "clsx";
import Sidebar from "./Sidebar";
import ErrorBoundary from "./ErrorBoundary";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top bar with hamburger — shifts right when sidebar is open */}
      <header
        className={clsx(
          "fixed top-0 right-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card px-4 shadow-sm transition-all duration-200 ease-in-out",
          sidebarOpen ? "left-64" : "left-0"
        )}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            V
          </div>
          <span className="font-semibold text-foreground">VSDS Admin</span>
        </div>
      </header>

      {/* Main content — shifts right when sidebar is open */}
      <main
        className={clsx(
          "flex-1 pt-14 transition-all duration-200 ease-in-out",
          sidebarOpen && "ml-64"
        )}
      >
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
