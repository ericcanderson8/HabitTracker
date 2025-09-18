import { NextRequest, NextResponse } from 'next/server'

import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // If on a user page, make sure a user session is active
  if (url.pathname.startsWith("/user")) {
    const token = req.cookies.get('token')?.value

    // Check if token exists
    if (!token) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    // Check validity of token
    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch (e) {
      url.pathname = "/login"
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}


export const config = {
  runtime: "nodejs",
  matcher: [
    '/user/:path*',
    '/api/:path*',
  ],
}
