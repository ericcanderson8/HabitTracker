import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" }, 
    { status: 200 }
  );

  // Expire the token cookie immediately by setting its maxAge to 0
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0, // This is the key part to delete the cookie
  });

  return response;
}