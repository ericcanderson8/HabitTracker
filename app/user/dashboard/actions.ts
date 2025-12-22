'use server'
import { verifySession } from "@/app/lib/verify";
import { supabase } from "@/app/lib/supabase";
import { Habit } from "./page";
import { success } from "zod/v4";

export type CreateHabitState =
    | { hasState: false }
    | { hasState: true, success: true }
    | { hasState: true, success: false; error: string}

// TODO: Handle token/supabse errors
export async function fetchHabits() {
   let uuid = await verifySession();
   if (!uuid) return null

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

export async function newHabit(_prev: CreateHabitState, e: FormData): Promise<CreateHabitState> {
    let uuid = await verifySession()
    if (!uuid) return { hasState: true, success: false, error: "User is not logged in"}

    const { data, error } = await supabase.rpc("create_new_habit", {
        p_id: uuid.userId,
        p_title: e.get("title"),
        p_description: e.get("description"),
        p_xp: 10,
        p_coins: 10
    })

    if (error) {
        return { hasState: true, success: false, error: error.cause as string }
    }

    return { hasState: true, success: true }
}