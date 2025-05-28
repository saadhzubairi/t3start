/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase'; // Adjust path if needed

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Use Supabase's signUp method
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // You can add options like `options: { emailRedirectTo: 'http://localhost:3000/auth/confirm' }`
      // if you want to redirect users after email verification.
      // For now, we'll keep it simple.
    });

    if (error) {
      console.error('Supabase signup error:', error.message);
      // Return a generic error for security, or specific ones if appropriate for your UI
      return NextResponse.json({ error: error.message || 'Failed to sign up.' }, { status: 400 });
    }

    // If data.user is null, it means email verification is required
    if (data.user && !data.user.email_confirmed_at) {
      return NextResponse.json({
        message: 'Sign up successful! Please check your email to verify your account.',
        requiresEmailVerification: true,
      }, { status: 200 });
    }

    // User signed up and email is confirmed (e.g., if email verification is off in Supabase settings)
    return NextResponse.json({ message: 'Sign up successful!', user: data.user }, { status: 200 });

  } catch (error) {
    console.error('Unexpected signup API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}