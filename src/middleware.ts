import { NextResponse, type NextRequest } from "next/server";

import {
  validateHostAllowlist,
  validateRefererAllowlist,
} from "@/lib/access/header";

const HEADER_PATHNAME = "x-access-pathname";
const HEADER_SEARCH = "x-access-search";

function redirectNoAccess(request: NextRequest) {
  return NextResponse.redirect(new URL("/no-access", request.url));
}

/** Strip client spoofing; middleware sets trusted path + query for the Server layout. */
function nextWithForwardedUrl(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete(HEADER_PATHNAME);
  requestHeaders.delete(HEADER_SEARCH);
  requestHeaders.set(HEADER_PATHNAME, pathname);
  requestHeaders.set(HEADER_SEARCH, search);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export function middleware(request: NextRequest) {
  if (process.env.ACCESS_DEV_BYPASS === "1") {
    return nextWithForwardedUrl(request);
  }

  const host = request.headers.get("host");
  const referer = request.headers.get("referer");

  if (!host) {
    return redirectNoAccess(request);
  }
  if (!validateHostAllowlist(host)) {
    return redirectNoAccess(request);
  }
  if (!validateRefererAllowlist(referer)) {
    return redirectNoAccess(request);
  }

  return nextWithForwardedUrl(request);
}

export const config = {
  matcher: [
    // Real production URLs (e.g. `/content/bio-9-ch1`)
    "/content",
    "/content/:path*",
    "/flowchart",
    "/flowchart/:path*",

    // Backward compatibility (older path variants)
    "/flowchart.pradeeppublications/:path*",
    "/content.pradeeppublications/:path*",
  ],
};
