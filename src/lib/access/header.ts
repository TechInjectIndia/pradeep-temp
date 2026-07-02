/**
 * Optional host / referer allowlists via env (comma-separated).
 * Empty list = check skipped.
 */

function parseList(raw: string | undefined): string[] {
  return raw?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
}

function hostMatchesList(host: string, allowed: string[]): boolean {
  const h = host.toLowerCase();
  return allowed.some((a) => {
    const x = a.toLowerCase();
    return h === x || h.endsWith(`.${x}`);
  });
}

export function validateHostAllowlist(host: string | null): boolean {
  const allowed = parseList(process.env.ACCESS_ALLOWED_HOSTS);
  if (allowed.length === 0) return true;
  if (!host) return false;
  return hostMatchesList(host, allowed);
}

export function validateRefererAllowlist(referer: string | null): boolean {
  const allowed = parseList(process.env.ACCESS_ALLOWED_REFERER_HOSTS);
  if (allowed.length === 0) return true;
  if (!referer) {
    return process.env.ACCESS_ALLOW_EMPTY_REFERER === "1";
  }
  try {
    return hostMatchesList(new URL(referer).hostname, allowed);
  } catch {
    return false;
  }
}
