'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("Account created successfully!");
      router.push("/login");
    } else {
      const error = await res.json();
      alert(error.message ||"Error creating account. Please try again.");
    }
    // Here you can handle form submission logic (e.g., API call)
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#fffaf4',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          width: '100%',
          maxWidth: '420px',
        }}
      >
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#cc5803',
            textAlign: 'center',
          }}
        >
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>First Name</label>
          <input name="firstName" type="text" required style={styles.input} />

          <label style={styles.label}>Last Name</label>
          <input name="lastName" type="text" required style={styles.input} />

          <label style={styles.label}>Email</label>
          <input name="email" type="email" required style={styles.input} />

          <label style={styles.label}>Password</label>
          <input name="password"type="password" required style={styles.input} />

          <button type="submit" style={styles.submitButton}>Sign Up</button>

          <p style={{ fontSize: '0.85rem', color: '#7c6f5f', marginTop: '1.5rem', textAlign: 'center' }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#ea580c', textDecoration: 'none' }}>Log in</a>
          </p>
        </form>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#6b4f3f',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '10px',
    border: '1px solid #e0c3a7',
    fontSize: '1rem',
    marginBottom: '1.5rem',
    outlineColor: '#f97316',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#f97316',
    color: '#ffffff',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
};
