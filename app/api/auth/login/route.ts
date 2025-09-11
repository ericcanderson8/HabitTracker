import bcrypt from 'bcrypt';
import { supabase } from '../../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

import jwt from 'jsonwebtoken';


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call the PostgreSQL stored procedure to retrieve the user's password hash
    const { data, error } = await supabase.rpc('get_user_password_hash', {
      p_identifier: email,
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
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
      }
      const token = jwt.sign(
        {userId: user.id },
        process.env.JWT_SECRET!,
        {expiresIn: '2h'}
      )
      // Passwords match, user is authenticated
      // TODO: Send a cookie to the user storing the
      const response = NextResponse.json( { message: 'Login successful!'});
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 7 * 60 * 60 * 24, // 7 days
      })
      return response;
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