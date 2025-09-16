import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // only backend knows this


export function verifySession(token: string | undefined) {
    if (!token) {
        return { verified: false }
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return { verified: true, user: decoded}
    } catch {
        return { verified: false }
    }
}