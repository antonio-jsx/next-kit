import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { extractSubdomain } from "@/lib/tenant";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const subdomain = extractSubdomain(request);
  if (subdomain && !pathname.startsWith("/s/")) {
    const path = pathname === "/" ? "" : pathname;
    return NextResponse.rewrite(new URL(`/s/${subdomain}${path}`, request.url));
  }

  if (pathname.startsWith("/dashboard")) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
     */
    "/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};
