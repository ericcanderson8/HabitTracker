'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#fffaf4',
    }}>
      <h1 style={{ fontSize: '2rem', color: '#cc5803', marginBottom: '1rem' }}>
        Welcome to 1MinHabit
      </h1>
      <button
        onClick={() => router.push('/login')}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#f97316',
          color: '#fff',
          fontWeight: 600,
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Go to Login Page
      </button>
    </main>
  );
}