// app/api/me/route.ts (Next.js App Router)

import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/lib/verify";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  const { verified, user } = verifySession(token)

  if (verified) {
    return NextResponse.json({ loggedIn: true, user });
  } else {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}