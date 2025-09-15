// app/api/me/route.ts (Next.js App Router)

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // only backend knows this

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ loggedIn: true, user: decoded });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}