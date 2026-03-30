const DEFAULT_DEV_EMULATOR_URL =
  "http://127.0.0.1:5005/pradeep-publications/asia-south1/validateDigitalStockAccess";

/**
 * Server-only: validates `code` + `token` against your Firebase HTTP function.
 * Set ACCESS_VERIFICATION_URL and ACCESS_API_KEY in production.
 */
export async function verifyAccess({
  code,
  token,
}: {
  code: string | null;
  token: string | null;
}): Promise<boolean> {
  if (!code || !token) return false;
  console.log("code---", code);
  console.log("token----", token);

  const url =
    process.env.ACCESS_VERIFICATION_URL ??
    (process.env.NODE_ENV === "development" ? DEFAULT_DEV_EMULATOR_URL : "");
  console.log("url---", url);
  const apiKey = "digital-stock@techinject";
  console.log("apiKey---", apiKey);
  // "deny closed" for production if backend URL is not configured.
  if (!url) {
    return process.env.NODE_ENV === "development" ? true : false;
  }
  // In production, require API key.
  if (process.env.NODE_ENV !== "development" && !apiKey) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ code, token }),
      signal: controller.signal,
      cache: "no-store",
    });
    console.log("res---", res);
    clearTimeout(timeout);

    if (!res.ok) return false;

    const data = (await res.json()) as
      | { allowed?: boolean; success?: boolean }
      | Record<string, unknown>;

    // Your Firebase function (v2 onRequest) returns a DTO like:
    // { success: true, code: ..., message: ..., data: ... }
    if (typeof data.allowed === "boolean") return data.allowed === true;
    if (typeof data.success === "boolean") return data.success === true;

    return false;
  } catch (err) {
    console.error("Verification error:", err);

    if (process.env.NODE_ENV === "development") {
      return true;
    }

    return false;
  }
}
