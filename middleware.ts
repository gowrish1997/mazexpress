// middleware.ts
// import { NextResponse } from 'next/server'

import withAuth from "next-auth/middleware";

// import type { NextRequest } from 'next/server'

export default withAuth({
  pages: {
    signIn: "/auth/gate",
  },
});
// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {

//   return NextResponse.redirect(new URL('/about-2', request.url))
// }

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }
