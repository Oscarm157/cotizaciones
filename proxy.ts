import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PASSWORD = "claude2026";

export function proxy(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.slice(6);
    const decoded = atob(encoded);
    const password = decoded.split(":").slice(1).join(":");
    if (password === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Bravo Publicidad"' },
  });
}

export const config = {
  matcher: "/",
};
