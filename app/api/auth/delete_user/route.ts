import { NextRequest, NextResponse } from "next/server";

import { verifySession } from "@/app/lib/verify";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
    let token = req.cookies.get("token")?.value

    // Ensure the user has the proper credentials to delete their account
    let { verified, user } = verifySession(token)
    if (!verified) {
        return NextResponse.json({ status: 401 })
    }

    // Delete account from database
    const { data, error } = await supabase.rpc('delete_user', {
        p_id: user
    })

    // Check for databse error
    if (error) {
        console.log(error)
        return NextResponse.json({ status: 500 })
    }

    let response = NextResponse.json({ status: 200 })

    // Remove token cookie since now invalid
    response.cookies.delete("token")

    return response
}