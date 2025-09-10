import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If on a user page, make sure a user session is active
  if (pathname.startsWith("/user")) {
    let token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.redirect("/login")
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET!)
  }

  return NextResponse.next()
}


export const config = {
  runtime: "nodejs",
  matcher: [
    '/user/:path*'
  ],
}
