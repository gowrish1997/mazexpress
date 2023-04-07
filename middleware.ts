//==========================
//     written by: raunak
//==========================

// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "lib/session";
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, sessionOptions);
  const { is_admin } = session;
  const auth_cookie = req.cookies.get("mazAPI");
  console.log("mw - s: ", is_admin);
  console.log("mw - c: ", auth_cookie);
  if (auth_cookie !== undefined) {
    // user is present do not allow login page
    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url), {
        statusText: "Unauthorized.",
      });
    }

    // // comment to let user on all routes
    // if (!session.is_admin) {
    //   if (req.nextUrl.pathname.startsWith("/admin")) {
    //     return NextResponse.redirect(new URL("/", req.url), {
    //       statusText: "Unauthorized.",
    //     });
    //   }
    // }

    // // comment to let admin on all routes
    // if (session.is_admin) {
    //   if (!req.nextUrl.pathname.startsWith("/admin")) {
    //     return NextResponse.redirect(new URL("/admin", req.url), {
    //       statusText: "Unauthorized.",
    //     });
    //   }
    // }
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
    "/((?!api|_next/static|_next/image|favicon.ico|image|auth/gate|auth/back-gate/|admin/|$).*)",
    // dev
    // match none
    // "/((?!.*).*)",
  ],
};
