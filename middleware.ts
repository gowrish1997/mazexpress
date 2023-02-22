// /middleware.ts
import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequestWithAuth) {

    // will run if authorized is true
    const res = NextResponse.next();
    // console.log(req.nextauth);
    const user = req.nextauth.token

    if (user && user !== null) {
      // user is in
      // check if user id is 0 null user
      // console.log(user);
      if (
        user.is_admin_users === true &&
        !req.nextUrl.pathname.startsWith("/admin")
      ) {
        // admin user check for restricted paths
        // console.log("illegal route");
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      if (
        user.is_admin_users === false &&
        req.nextUrl.pathname.startsWith("/admin")
      ) {
        // console.log("illegal route2");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return res;
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // If there is a token, the user is authenticated
        if (token) {
          // console.log(token);
          return true;
        }
        return false;
      },
    },
  }
);

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

    // dev
    // match none
    // "/((?!.*).*)",
  ],
};
