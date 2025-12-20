import { cookies } from "next/headers"
import { verifySession } from "@/app/lib/verify";
import { supabase } from "@/app/lib/supabase";
import { Habit } from "./page";



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

    // Parse data
    let habits = data as Habit[];
    habits = habits.map((h) => ({
        ...h,
        coins: Number(h.coins)
    }))
    
    return habits
}