'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from "../lib/supabase";

export type LoginState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error", error: string }

export async function loginClicked(_prev: LoginState, e: FormData): Promise<LoginState> {
    try {
        let email = e.get("email") as string
        let password = e.get("password") as string
        let ck = await cookies();

        if (!email || !password) {
            return { status: "error", error: "Empty fields" }
        }

        // Call the PostgreSQL stored procedure to retrieve the user's password hash
        const { data, error } = await supabase.rpc('get_user_password_hash', {
            p_identifier: email,
        });

        if (error || !data || data.length === 0) {
            return { status: "error", error: 'Invalid credentials' }
        }

        // Since the RPC returns an array of objects, get the first one
        const user = data[0];
        const storedHashedPassword = user.password_hash;

        // Compare the provided password with the stored hash
        const passwordsMatch = await bcrypt.compare(password, storedHashedPassword);

        if (passwordsMatch) {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: '2h' }
            )

            // Passwords match, user is authenticated
            // TODO: Send a cookie to the user storing the
            ck.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 7 * 60 * 60 * 24, // 7 days
            })
            redirect("/user/dashboard")
        } else {
            // Passwords do not match
            return { status: "error", error: "Passwords do not match" }
        }
    } catch (error) {
        console.log(error)
        return { status: "error", error: "An unexpected server error has occured"}
    }

}