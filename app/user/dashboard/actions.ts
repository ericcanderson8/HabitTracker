'use server'
import { verifySession } from "@/app/lib/verify";
import { supabase } from "@/app/lib/supabase";
import { Habit } from "./page";

export type CreateHabitState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error", error: string }

// TODO: Handle token/supabse errors
export async function fetchUserData() {
   let uuid = await verifySession();
   if (!uuid) return null

   // Get user data
   let userDataList = (await supabase.rpc("get_user_data", {
    p_userid: uuid.userId
   }))
   let userData = userDataList.data[0]

    // Get habit data
    let userHabits = await supabase.rpc("get_user_habits", {
        p_userid: uuid.userId
    })
    if (userData.error || userHabits.error) {
        console.log(userDataList.error)
        console.log(userHabits.error)
        return 
    }

    // Parse data
    let habits = userHabits.data as Habit[];
    habits = habits.map((h) => ({
        ...h,
        coins: Number(h.coins)
    }))
    
    
    return {
        xp: userData.xp,
        level: userData.level,
        coins: userData.coins,
        habits,
    }
}

export async function newHabit(_prev: CreateHabitState, e: FormData): Promise<CreateHabitState> {
    let uuid = await verifySession()
    if (!uuid) return { status: "error", error: "User is not logged in"}

    const { data, error } = await supabase.rpc("create_new_habit", {
        p_id: uuid.userId,
        p_title: e.get("title"),
        p_description: e.get("description"),
        p_xp: 10,
        p_coins: 10
    })

    if (error) {
        return { status: "error", error: error.cause as string }
    }

    return { status: "success" }
}