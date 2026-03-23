"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 10s stale time — balances freshness vs. request frequency for live batch data
            staleTime: 10_000,
            // Retry failed requests up to 2 times with exponential backoff
            retry: 2,
            retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
            // Refetch when window regains focus so admins always see current state
            refetchOnWindowFocus: true,
            // Refetch on reconnect after network loss
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 0, // Don't retry mutations — avoid duplicate writes
          },
        },
      })
  );

  return (
    <SessionProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
    </SessionProvider>
  );
}
