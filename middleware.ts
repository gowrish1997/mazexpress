//==========================
//     written by: raunak
//==========================

// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getIronSession } from "iron-session/edge";
import cookie from "cookie";
import { sessionOptions } from "./lib/session";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, sessionOptions);
  const auth_cookie = req.cookies.get("mazAPI");
//   console.log("from middleware: ", session.is_admin);
  // const payload = jwt.verify(
  //   auth_cookie.value,
  //   process.env.SECRET_COOKIE_PASSWORD
  // );
  // console.log(payload);
  if (
    auth_cookie !== undefined &&
    auth_cookie.value !== undefined &&
    auth_cookie.value !== null &&
    session !== undefined
  ) {
    // user is present do not allow login page
    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url), {
        statusText: "Unauthorized.",
      });
    }

    // comment to let user on all routes
    if (!session.is_admin) {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url), {
          statusText: "Unauthorized.",
        });
      }
    }

    // comment to let admin on all routes
    if (session.is_admin) {
      if (!req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url), {
          statusText: "Unauthorized.",
        });
      }
    }
  } else {
    return NextResponse.redirect(new URL("/auth/gate?please-log-in", req.url), {
      statusText: "Unauthorized.",
    });
  }
  return res;
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // deploy
    // match all except these links
    "/((?!api|_next/static|_next/image|favicon.ico|image|auth|$).*)",
    // dev
    // match none
    // "/((?!.*).*)",
  ],
};
