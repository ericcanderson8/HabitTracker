'use client';
import React, { useState } from 'react';

export default function Page() {
  const [activeTab, setActiveTab] = useState<'habits' | 'calendar' | 'streak' | 'create'>('habits');
  const [habits, setHabits] = useState<string[]>(['Drink water', 'Stretch 1 min', 'Clean one thing']);
  const [xp, setXp] = useState<number>(0);

  const handleAddHabit = (habit: string) => {
    if (!habits.includes(habit)) setHabits([...habits, habit]);
  };

  const handleMarkAsDone = () => {
    setXp((prev) => Math.min(prev + 10, 100));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'habits':
        return (
          <>
            <h2 style={styles.sectionTitle}>📋 List of Habits</h2>
            <div style={styles.xpBarContainer}>
              <div style={styles.xpLabel}>XP: {xp} / 100</div>
              <div style={styles.xpBarBg}>
                <div style={{ ...styles.xpBarFill, width: `${xp}%` }}></div>
              </div>
            </div>
            <div style={styles.cardGrid}>
              {habits.map((habit, i) => (
                <div key={i} style={styles.habitCard}>
                  <h4 style={styles.habitTitle}>{habit}</h4>
                  <button style={styles.completeButton} onClick={handleMarkAsDone}>Mark as Done</button>
                </div>
              ))}
            </div>
          </>
        );
      case 'calendar':
        return (
          <>
            <h2 style={styles.sectionTitle}>📅 Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FLos_Angeles"
              style={{ border: 0, width: '100%', height: '600px', borderRadius: '12px' }}
              frameBorder="0"
              scrolling="no"
              title="Calendar"
            ></iframe>
          </>
        );
      case 'streak':
        return (
          <>
            <h2 style={styles.sectionTitle}>🔥 Current Streak</h2>
            <div style={styles.streakCard}>
              <p style={styles.streakBig}>🔥 4-Day Streak</p>
              <p style={styles.streakSub}>You're doing amazing! Keep your streak alive by completing at least one habit today.</p>
            </div>
          </>
        );
      case 'create':
        return (
          <>
            <h2 style={styles.sectionTitle}>➕ Create New Habit</h2>
            <div style={styles.cardGrid}>
              {['Read 10 pages', 'Walk for 5 min', 'Meditate', 'Journal', 'Declutter 1 item'].map((habit, i) => (
                <div key={i} style={styles.createHabitCard}>
                  <h4 style={styles.habitTitle}>{habit}</h4>
                  <button style={styles.addButton} onClick={() => handleAddHabit(habit)}>Add Habit</button>
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main style={styles.container}>
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>🟧 1MinHabit</h1>
        <nav style={styles.nav}>
          {[
            { id: 'habits', label: 'Habits' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'streak', label: 'Streak' },
            { id: 'create', label: 'New Habit' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                ...styles.navItem,
                backgroundColor: activeTab === tab.id ? '#fef3c7' : 'transparent',
                fontWeight: activeTab === tab.id ? 600 : 500,
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <section style={styles.content}>{renderContent()}</section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    backgroundColor: '#fffaf4',
  },
  sidebar: {
    width: '220px',
    backgroundColor: '#fff3e0',
    padding: '2rem 1rem',
    borderRight: '1px solid #fcd9b1',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#cc5803',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  navItem: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: 'none',
    textAlign: 'left',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#333',
    transition: 'background 0.2s ease-in-out',
  },
  content: {
    flex: 1,
    padding: '3rem 4rem',
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '2rem',
    color: '#cc5803',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '2rem',
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    border: '1px solid #f0e0d0',
    transition: 'transform 0.2s ease',
  },
  createHabitCard: {
    backgroundColor: '#fffdf7',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
    textAlign: 'center',
    border: '1px solid #f4dcb7',
    transition: 'transform 0.2s ease',
  },
  habitTitle: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color: '#444',
  },
  completeButton: {
    padding: '0.6rem 1.25rem',
    backgroundColor: '#22c55e',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background 0.2s ease',
  },
  addButton: {
    padding: '0.6rem 1.25rem',
    backgroundColor: '#f97316',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'background 0.2s ease',
  },
  input: {
    padding: '0.75rem',
    width: '100%',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  streakCard: {
    backgroundColor: '#fff4e8',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #fcd9b1',
    textAlign: 'center',
  },
  streakBig: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#f97316',
    marginBottom: '1rem',
  },
  streakSub: {
    fontSize: '1rem',
    color: '#7c6f5f',
  },
  placeholder: {
    fontSize: '1rem',
    color: '#777',
  },
  xpBarContainer: {
    marginBottom: '1.5rem',
  },
  xpLabel: {
    fontSize: '0.95rem',
    marginBottom: '0.25rem',
    color: '#555',
  },
  xpBarBg: {
    height: '12px',
    width: '100%',
    backgroundColor: '#fcd9b1',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#f97316',
    transition: 'width 0.3s ease-in-out',
  },
};
