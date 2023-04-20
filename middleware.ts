import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./lib/selectOrder";
import { i18n } from "next-i18next";

// import { isAuthenticated } from "./lib/utils";
export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();
    const session = await getSession(req);
    // const currentLocale = i18n
    console.log("middleware",i18n);

    if (session) {
        console.log("Iam inside session");
        // user is present do not allow login page
        if (req.nextUrl.pathname.startsWith("/auth")) {
            return NextResponse.redirect(new URL("/", req.url), {
                statusText: "Unauthorized.",
            });
        }

        // comment to let user on all routes
        // if (!(session?.user as any).is_admin) {
        //     if (req.nextUrl.pathname.startsWith("/admin")) {
        //         return NextResponse.redirect(new URL("/", req.url), {
        //             statusText: "Unauthorized.",
        //         });
        //     }
        // }

        // comment to let admin on all routes
        if ((session?.user as any).is_admin) {
            if (!req.nextUrl.pathname.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/admin", req.url), {
                    statusText: "Unauthorized.",
                });
            }
        }

        if (req.nextUrl.locale == "ar" && (session?.user as any).is_admin) {
            return NextResponse.redirect(
                new URL(`/en${req.nextUrl.pathname}`, req.url)
            );
        }

        // if (
        //     !(session?.user as any).is_admin &&
        //     (req.nextUrl.locale == "en" ? "english" : "arabic") !=
        //         (session?.user as any).lang
        // ) {
        //     const currentLocale = i18n.language;
        //     console.log(currentLocale);
        // if ((session?.user as any).lang == "arabic") {
        //     return NextResponse.redirect(
        //         new URL(`/ar${req.nextUrl.pathname}`, req.url)
        //     );
        // } else {
        //     console.log(req.nextUrl.locale,(session?.user as any).lang);
        //     console.log(req.nextUrl.pathname);
        //     return NextResponse.redirect(
        //         new URL(`${req.nextUrl.pathname}`, req.url)
        //     );
        // }
        // }
    } else {
        return NextResponse.redirect(
            new URL("/auth/gate?please-log-in", req.url),
            {
                statusText: "Unauthorized.",
            }
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
