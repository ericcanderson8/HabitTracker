import { cookies } from "next/headers"
import { verifySession } from "@/app/lib/verify";
import { supabase } from "@/app/lib/supabase";



export async function fetchHabits() {
    // Get user info
    let ck = await cookies();
    let token = ck.get("token")?.value
    let uuid = verifySession(token)
    if (!uuid) return

    // Get habit data
    const { data, error } = await supabase.rpc("get_user_habits", {
        p_userid: uuid.userId
    })

    // Handle Postgres error
    if (error) {
        return null
    }
    
    return data
}