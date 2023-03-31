//==========================
//     written by: raunak
//==========================

// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/utils";
export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();
    // add redirect to correct locale here...

    // add restrictions to user for admin routes
    const truth_values = await isAuthenticated(req);
    const is_auth = truth_values[0];
    const is_admin = truth_values[1];

    // console.log(truth_values)

    if (is_auth) {
        // user is present do not allow login page
        if (req.nextUrl.pathname.startsWith("/auth")) {
            return NextResponse.redirect(new URL("/", req.url), {
                statusText: "Unauthorized.",
            });
        }

        // comment to let user on all routes
        if (!is_admin) {
            if (req.nextUrl.pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/", req.url), {
                    statusText: "Unauthorized.",
                });
            }
        }

        // comment to let admin on all routes
        if (is_admin) {
            if (!req.nextUrl.pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/admin", req.url), {
                    statusText: "Unauthorized.",
                });
            }
        }
    } else {
        return NextResponse.redirect(
            new URL("/auth/gate?please-log-in", req.url),
            {
                statusText: "Unauthorized.",
            }
        );
    }

    if (req.nextUrl.locale == "ar" && req.url.includes("admin")) {
        return NextResponse.redirect(
            new URL(`/en${req.nextUrl.pathname}`, req.url)
        );
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
