'use client';
import { LoginState, loginClicked } from './actions';
import { useActionState } from 'react';
import ErrorBar from '../components/errorbar';

export default function Page() {
  let [loginState, loginAction, loginPending] = useActionState(loginClicked, { status: "idle" })

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0D1117',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#161B22',
          padding: '3rem 2.25rem',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
          border: '1px solid #30363D',
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: '#E6EDF3',
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            color: '#8B949E',
            fontSize: '0.95rem',
          }}
        >
          Keep going — your next 1-minute habit is just a click away.
        </p>

        {loginState.status === "error" && loginState.error && (
          <ErrorBar message={loginState.error} />
        )}

        <form action={loginAction}>
          {/* Email */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#E6EDF3',
                fontSize: '0.9rem',
              }}
            >
              Email address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid #30363D',
                fontSize: '1rem',
                backgroundColor: '#0D1117',
                color: '#E6EDF3',
                outlineColor: '#007BFF',
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 600,
                color: '#E6EDF3',
                fontSize: '0.9rem',
              }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid #30363D',
                fontSize: '1rem',
                backgroundColor: '#0D1117',
                color: '#E6EDF3',
                outlineColor: '#007BFF',
              }}
            />
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
            <a
              href="#"
              style={{
                fontSize: '0.85rem',
                color: '#007BFF',
                textDecoration: 'none',
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#007BFF',
              color: '#ffffff',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
          >
            {loginPending ? "Validating..." : "Submit"}
          </button>
        </form>

        {/* Signup Prompt */}
        <p
          style={{
            marginTop: '2rem',
            fontSize: '0.85rem',
            color: '#8B949E',
          }}
        >
          Don’t have an account?{' '}
          <a
            href="/register"
            style={{
              color: '#007BFF',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
