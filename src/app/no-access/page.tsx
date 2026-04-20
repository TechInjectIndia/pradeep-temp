import NoAccessActions from "./_components/NoAccessActions";

export default function NoAccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-12">
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-indigo-100 px-6 py-5 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 ring-1 ring-black/5 dark:bg-white/10 dark:ring-white/10">
                <span className="text-xl" aria-hidden>
                  📚
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold leading-6">
                  Access restricted
                </h1>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  This content is protected.
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <p className="text-base leading-7 text-zinc-800 dark:text-zinc-200">
              <span className="font-semibold">
                You don’t have access to this page.
              </span>{" "}
              Please login again and open the link from the authorised portal.
            </p>

            <NoAccessActions />

           
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
          If you think this is a mistake, contact support.
        </p>
      </div>
    </div>
  );
}
