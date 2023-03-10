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

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  console.log("from middleware", user);

  // demo:
  if (!user) {
    return NextResponse.redirect(new URL("/auth/gate", req.url), {
      statusText: "Unauthorized.",
    });

    // unauthorized to see pages inside admin/
    // return new NextResponse(null, { status: 403 });
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
    "/((?!api|_next/static|_next/image|favicon.ico|auth/gate|image|$).*)",

    // dev
    // match none
    // "/((?!.*).*)",
  ],
};
