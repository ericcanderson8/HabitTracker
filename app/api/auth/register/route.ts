import bcrypt from 'bcrypt';
import { supabase } from '../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json();

    if (!email || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password securely with a salt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the PostgreSQL stored procedure to insert the user
    // Make sure to use the service role key for this action
    const { error } = await supabase.rpc('register_user', {
      p_email: email,
      p_username: username,
      p_password_hash: hashedPassword,
    });

    if (error) {
      // Handle Supabase errors (e.g., duplicate email/username)
      if (error.code === '23505') { // PostgreSQL unique violation code
        if (error.message.includes('email')) {
          return NextResponse.json(
            { error: 'Email already exists' },
            { status: 409 }
          );
        }
        if (error.message.includes('username')) {
          return NextResponse.json(
            { error: 'Username already exists' },
            { status: 409 }
          );
        }
      }
      console.error('Registration failed:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { message: 'User registered successfully!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}