import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./lib/selectOrder";

// import { isAuthenticated } from "./lib/utils";
export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();
    const session = await getSession(req);

    // if (session) {
    //     // user is present do not allow login page
    //     if (req.nextUrl.pathname.startsWith("/auth")) {
    //         return NextResponse.redirect(new URL("/", req.url), {
    //             statusText: "Unauthorized.",
    //         });
    //     }

        // comment to let user on all routes
        // if (!(session?.user as any).is_admin) {
        //     if (req.nextUrl.pathname.startsWith("/admin")) {
        //         return NextResponse.redirect(new URL("/", req.url), {
        //             statusText: "Unauthorized.",
        //         });
        //     }
        // }

        // comment to let admin on all routes
        // if ((session?.user as any).is_admin) {
        //     if (!req.nextUrl.pathname.startsWith("/admin")) {
        //         return NextResponse.redirect(new URL("/admin", req.url), {
        //             statusText: "Unauthorized.",
        //         });
        //     }
        // }
    // } else {
    //     return NextResponse.redirect(
    //         new URL("/auth/gate?please-log-in", req.url),
    //         {
    //             statusText: "Unauthorized.",
    //         }
    //     );
    // }

    // if (req.nextUrl.locale == "ar" && (session?.user as any).is_admin) {
    //     return NextResponse.redirect(
    //         new URL(`/en${req.nextUrl.pathname}`, req.url)
    //     );
    // }

    // if (
    //     !(session?.user as any).is_admin &&
    //     (req.nextUrl.locale == "en" ? "english" : "arabic") !=
    //         (session?.user as any).lang
    // ) {
    //     if ((session?.user as any).lang == "english") {
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
