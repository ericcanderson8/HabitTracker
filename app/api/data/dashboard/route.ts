import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "@/app/lib/verify";
import { supabase } from "@/app/lib/supabase";

export async function GET(request: NextRequest) {
    
}

export async function POST(request: NextRequest) {
    return NextResponse.error()
}