'use server'
import bcrypt from 'bcrypt';
import { supabase } from '../lib/supabase';
import { redirect } from 'next/navigation';

export type RegisterState =
    | { status: "idle" }
    | { status: "success" }
    | { status: "error", error: string };

export async function onRegisterClicked(prev: RegisterState, e: FormData): Promise<RegisterState> {
    let email = e.get("email") as string
    let password = e.get("password") as string
    let firstName = e.get("firstName") as string
    let lastName = e.get("lastName") as string

    if (!email || !password || !firstName || !lastName) {
        return { status: "error", error: "Missing fields" }
    }

    // Hash the password securely with a salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the PostgreSQL stored procedure to insert the user
    // Make sure to use the service role key for this action
    const { error } = await supabase.rpc('register_user', {
        p_email: email,
        p_first_name: firstName,
        p_last_name: lastName,
        p_password_hash: hashedPassword,
    });

    if (error) {
        // Handle Supabase errors (e.g., duplicate email/username)
        if (error.code === '23505') { // PostgreSQL unique violation code
            if (error.message.includes('email')) {
                return { status: "error", error: "Email already exists" }
            }
            if (error.message.includes('username')) {
                return { status: "error", error: "Username already exists" }
            }
        }
        console.error('Registration failed:', error);
        return { status: "error", error: "Internal server error"}
    }

    redirect("/login") // Register was successful
}