//==========================
//     co-author: raunak
//     co-author: gowrish
//==========================


// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "lib/session";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  // console.log("from middleware", session);
  
  // console.log(session.users?.[0].lang)
  // add redirect to correct locale here...
  
  // console.log(session.users?.[0].lang)
  // add restrictions to users for admin routes


  // demo:
  if (!session.users) {
    return NextResponse.redirect(new URL("/auth/gate", req.url), {
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
    "/((?!api|_next/static|_next/image|favicon.ico|auth/gate|image|$).*)",

    // dev
    // match none
    // "/((?!.*).*)",
  ],
};

