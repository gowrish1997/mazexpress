// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "MAZ_COOKIE",
    password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // do anything with session here:
  const {user} = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  // console.log("from middleware", user);

  // demo:
  // if (user?.admin !== "true") {
  //   // unauthorized to see pages inside admin/
  //   return NextResponse.redirect(new URL("/gate", req.url)); // redirect to /unauthorized page
  // }
  if (!user || user?.isLoggedIn===false) return NextResponse.redirect(new URL("/auth/gate", req.url));

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
    "/((?!api|_next/static|_next/image|favicon.ico|auth/gate).*)",

    //dev
    // "/((?!.*)",
  ],
};