import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";
import routes from "./constants/routes";

export function middleware(request: NextRequest) {
  const session = getSession();

  if (
    !session &&
    request.nextUrl.pathname !== routes.signIn &&
    request.nextUrl.pathname !== routes.signUp && !request.nextUrl.pathname.startsWith(routes.interviews + '/')
  ) {
    return Response.redirect(new URL(routes.signIn, request.url));
  }

  if (
    (session &&
      (request.nextUrl.pathname.startsWith(routes.signIn) ||
        request.nextUrl.pathname.startsWith(routes.signIn))) ||
    request.nextUrl.pathname === "/"
  ) {
    return Response.redirect(new URL(routes.templates, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
