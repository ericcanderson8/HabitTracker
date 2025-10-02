'use client';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      switch (res.status) {
        case 200: router.push("/user/dashboard"); break;
        case 400: break; // Handle missing field
        case 401: break; // Handle invalid credentials
        default: break;
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            marginBottom: '2rem',
          }}
        >
          Keep going — your next 1-minute habit is just a click away.
        </p>

        <form onSubmit={handleSubmit}>
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
            Sign In
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
