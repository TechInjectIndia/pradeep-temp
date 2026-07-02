"use client";

export default function NoAccessActions() {
  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
      >
        Retry
      </button>
    </div>
  );
}

