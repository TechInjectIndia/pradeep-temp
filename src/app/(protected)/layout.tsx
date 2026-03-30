import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { verifyAccess } from "@/lib/access/verify";

const HEADER_SEARCH = "x-access-search";

/**
 * Runs on the server for every /flowchart/* and /content/* request.
 * Query must include `code` and `token` (forwarded from middleware via internal header).
 */
export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const raw = h.get(HEADER_SEARCH) ?? "";
  const qs = raw.startsWith("?") ? raw.slice(1) : raw;
  const params = new URLSearchParams(qs);

  const allowed = await verifyAccess({
    code: params.get("code"),
    token: params.get("token"),
  });
  console.log("allowed---", allowed);

  if (!allowed) {
    redirect("/no-access");
  }

  return children;
}
