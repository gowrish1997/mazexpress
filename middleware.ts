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

<<<<<<< HEAD
    // add restrictions to user for admin routes
    // const truth_values = await isAuthenticated(req);
    // const is_auth = truth_values[0];
    // const is_admin = truth_values[1];
    // const is_English = truth_values[2];

    // if (is_auth) {
    //     // user is present do not allow login page
    //     if (req.nextUrl.pathname.startsWith("/auth")) {
    //         return NextResponse.redirect(new URL("/", req.url), {
    //             statusText: "Unauthorized.",
    //         });
    //     }

    //     // comment to let user on all routes
    //     // if (!is_admin) {
    //     //     if (req.nextUrl.pathname.startsWith("/admin")) {
    //     //         return NextResponse.redirect(new URL("/", req.url), {
    //     //             statusText: "Unauthorized.",
    //     //         });
    //     //     }
    //     // }

    //     // comment to let admin on all routes
    //     // if (is_admin) {
    //     //     if (!req.nextUrl.pathname.startsWith("/admin")) {
    //     //         return NextResponse.redirect(new URL("/admin", req.url), {
    //     //             statusText: "Unauthorized.",
    //     //         });
    //     //     }
    //     // }
    // } else {
    //     return NextResponse.redirect(
    //         new URL("/auth/gate?please-log-in", req.url),
    //         {
    //             statusText: "Unauthorized.",
    //         }
    //     );
    // }

    // if (req.nextUrl.locale == "ar" && is_admin) {
    //     return NextResponse.redirect(
    //         new URL(`/en${req.nextUrl.pathname}`, req.url)
    //     );
    // }

    // console.log(
    //     req.nextUrl.locale == "en" ? "english" : "arabic",
    //     is_English ? "english" : "arabic"
    // );

    // if (
    //     !is_admin &&
    //     (req.nextUrl.locale == "en" ? "english" : "arabic") !=
    //         (is_English ? "english" : "arabic")
    // ) {
    //     if (is_English) {
    //         return NextResponse.redirect(
    //             new URL(`/en${req.nextUrl.pathname}`, req.url)
    //         );
    //     } else {
    //         return NextResponse.redirect(
    //             new URL(`/ar${req.nextUrl.pathname}`, req.url)
    //         );
    //     }
    // }

    return res;
=======
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
>>>>>>> 040cce7605c3925498756e018d9a4a339fa51e63
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
