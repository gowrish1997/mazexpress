//==========================
//     written by: raunak
//==========================

// /middleware.ts
const { parse } = require("url");
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "lib/session";

import i18n from "next-i18next";
import { controllers } from "chart.js";
import { constants } from "buffer";

export const middleware = async (req: NextRequest) => {
    const localeCookie = req.cookies.get("NEXT_LOCALE");
    console.log(localeCookie);

    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);

    // console.log("from middleware", session);
  // console.log("from middleware", session);

  // console.log(session.users?.[0].lang)
  // add redirect to correct locale here...

  // add restrictions to users for admin routes
  if (session.users && session.users.length > 0) {
    // user is present do not allow login page
    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url), {
        statusText: "Unauthorized.",
      });
    }

    // comment to let user on all routes
    if (!session.users[0].is_admin) {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/", req.url), {
          statusText: "Unauthorized.",
        });
      }
    }

    // comment to let admin on all routes
    if (session.users[0].is_admin) {
      if (!req.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin", req.url), {
          statusText: "Unauthorized.",
        });
      }
    }
  }

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

    // if (req.nextUrl.locale == "ar") {
    //     if (req.url.includes("admin")) {
    //         return NextResponse.redirect(
    //             new URL(`/en${req.nextUrl.pathname}`, req.url)
    //         );
    //     }

        // return NextResponse.rewrite(req.nextUrl);
        // return NextResponse.redirect(
        //     new URL(`/en${req.nextUrl.pathname}`, req.url)
        // );
    // }

    // const url=new URL(window.location.href)

    // return NextResponse.redirect(new URL("/warehouse",req.url), {
    //     statusText: "redirecting",
    // });

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
