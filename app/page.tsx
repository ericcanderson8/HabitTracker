'use client'
import React from 'react';
import { onSignInClicked } from './actions';

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#0D1117', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <header
        style={{
          width: '100%',
          backgroundColor: '#161B22',
          padding: '1rem 3rem',
          borderBottom: '1px solid #30363D',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#E6EDF3', letterSpacing: '0.5px' }}>
          🔷 1MinHabit
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <nav style={{ display: 'flex', gap: '1.5rem' }}>
            {['Home', 'About', 'Features', 'Contact'].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1rem',
                  color: '#E6EDF3',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={onSignInClicked}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007BFF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" style={{ ...sectionStyle, paddingTop: '5rem', backgroundColor: '#0D1117', color: '#E6EDF3' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#E6EDF3', marginBottom: '1rem' }}>Welcome to 1MinHabit</h2>
        <p style={paragraphStyle}>
          A focused habit-building platform that helps you grow <strong>1 minute at a time</strong>. Track your
          progress, earn rewards, and stay consistent without the overwhelm.
        </p>
        <button
          onClick={() => scrollTo('about')}
          style={{
            marginTop: '1.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007BFF',
            color: '#fff',
            fontWeight: 600,
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          Learn More
        </button>
      </section>

      {/* About Section */}
      <section id="about" style={{ ...sectionStyle, backgroundColor: '#161B22', textAlign: 'left', color: '#E6EDF3' }}>
        <h3 style={{ ...headingStyle, textAlign: 'left', color: '#E6EDF3' }}>📖 About</h3>
        <p style={paragraphStyle}>
          1MinHabit is designed to help users — especially those with busy schedules — start building habits
          with simplicity. By focusing on quick, achievable actions, we eliminate the resistance to starting.
        </p>
        <p style={paragraphStyle}>
          Track daily streaks, earn experience points, and stay engaged through fun challenges and
          achievements.
        </p>
        <p style={paragraphStyle}>
          Our philosophy is based on the idea that small wins lead to big changes. The app encourages consistency without guilt, using gentle nudges instead of pressure. Every prompt is designed to be actionable, uplifting, and tied to your personal goals. You’ll start recognizing progress in places you once overlooked, building confidence one minute at a time. Over time, these tiny actions create sustainable, long-lasting routines that reshape your lifestyle.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" style={{ ...sectionStyle, textAlign: 'left', backgroundColor: '#0D1117', color: '#E6EDF3' }}>
        <h3 style={{ ...headingStyle, textAlign: 'left', color: '#E6EDF3' }}>🚀 Features</h3>
        <ul style={{ ...paragraphStyle, paddingLeft: '1.5rem', listStyle: 'disc', maxWidth: '720px', margin: '0 auto' }}>
          <li>✔ Micro-habit prompts tailored to your focus areas</li>
          <li>✔ XP, level-ups, and badge rewards</li>
          <li>✔ Visual habit calendar with completion history</li>
          <li>✔ Clean dashboard with daily goals</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ ...sectionStyle, backgroundColor: '#161B22', paddingBottom: '6rem', color: '#E6EDF3' }}>
        <h3 style={headingStyle}>📬 Contact</h3>
        <p style={paragraphStyle}>Want to connect or share feedback?</p>
        <p style={paragraphStyle}>
          Reach out via{' '}
          <a href="https://www.linkedin.com/in/arvindmohanraj" target="_blank" rel="noreferrer" style={linkStyle}>
            LinkedIn
          </a>{' '}
          or check out the{' '}
          <a href="#" style={linkStyle}>
            GitHub project
          </a>
          .
        </p>
      </section>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: '4rem 2rem',
  maxWidth: '960px',
  margin: '0 auto',
};

const headingStyle: React.CSSProperties = {
  fontSize: '2rem',
  color: '#E6EDF3',
  marginBottom: '1.5rem',
  fontWeight: 700,
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  color: '#E6EDF3',
  lineHeight: 1.75,
  marginBottom: '1.5rem',
};

const linkStyle: React.CSSProperties = {
  color: '#007BFF',
  textDecoration: 'underline',
  fontWeight: 500,
};
