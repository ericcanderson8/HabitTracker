'use server'
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { verifySession } from "./lib/verify"

export async function onSignInClicked()  {
    const ck = await cookies()
    const token = ck.get("token")?.value

    const user = verifySession(token)

    if (!user) {
        redirect("/login")
    } else {
        redirect("/user/dashboard")
    }
}