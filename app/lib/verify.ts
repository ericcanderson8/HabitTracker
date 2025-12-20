import "server-only"
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!; // only backend knows this


export async function verifySession() {
    let ck = await cookies()
    let token = ck.get("token")?.value

    if (!token) {
        return null
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
        return decoded
    } catch {
        return null
    }
}