import bcrypt from 'bcrypt';
import { supabase } from '../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call the PostgreSQL stored procedure to retrieve the user's password hash
    const { data, error } = await supabase.rpc('get_user_password_hash', {
      p_identifier: identifier,
    });

    if (error || !data || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Since the RPC returns an array of objects, get the first one
    const user = data[0];
    const storedHashedPassword = user.password_hash;

    // Compare the provided password with the stored hash
    const passwordsMatch = await bcrypt.compare(password, storedHashedPassword);

    if (passwordsMatch) {
      // Passwords match, user is authenticated
      return NextResponse.json(
        { message: 'Login successful!', userId: user.id },
        { status: 200 }
      );
    } else {
      // Passwords do not match
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}