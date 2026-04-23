import { NextResponse, type NextRequest } from "next/server";

const PASSWORD = "AOMdnd00";

export function proxy(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const pass = decoded.slice(decoded.indexOf(":") + 1);
    if (pass === PASSWORD) {
      return NextResponse.next();
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Cotizaciones"' },
  });
}

export const config = {
  matcher: "/",
};
