// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/session";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  const { user } = session;

  // check if user exists and logged in
  if (user && user !== undefined && user.is_logged_in_users === 1) {
    // yes user and logged in

    // check if user id is 0 null user
    // console.log(user);
    if (user.id_users === 0) {
      // null user
      // return to gate
      return NextResponse.redirect(new URL("/auth/gate", req.url));
    } else {
      console.log(user, req.nextUrl.pathname);
      // true user
      // check if admin
      if (
        user.is_admin_users === 1 &&
        !req.nextUrl.pathname.startsWith("/admin")
      ) {
        // admin user check for restricted paths
        console.log("illegal route");
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (
        user.is_admin_users === 0 &&
        req.nextUrl.pathname.startsWith("/admin")
      ) {
        console.log("illegal route2");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  } else {
    return NextResponse.redirect(new URL("/auth/gate", req.url));
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
    "/((?!api|_next/static|_next/image|favicon.ico|auth/gate).*)",

    //dev
    // match none
    // "/((?!.*).*)",
  ],
};
