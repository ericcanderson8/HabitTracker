'use server'
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { verifySession } from "./lib/verify"

export async function onSignInClicked()  {
    const ck = await cookies()
    const token = ck.get("token")?.value

    const { verified, user } = verifySession(token)

    if (!verified) {
        redirect("/login")
    } else {
        redirect("/user/dashboard")
    }
}