'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

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
            <h2 className={styles.sectionTitle}>📋 List of Habits</h2>
            <div className={styles.xpBarContainer}>
              <div className={styles.xpLabel}>XP: {xp} / 100</div>
              <div className={styles.xpBarBg}>
                <div className={styles.xpBarFill} style={{ width: `${xp}%` }}></div>
              </div>
            </div>
            <div className={styles.cardGrid}>
              {habits.map((habit, i) => (
                <div key={i} className={styles.habitCard}>
                  <h4 className={styles.habitTitle}>{habit}</h4>
                  <button className={styles.completeButton} onClick={handleMarkAsDone}>
                    Mark as Done
                  </button>
                </div>
              ))}
            </div>
          </>
        );
      case 'calendar':
        return (
          <>
            <h2 className={styles.sectionTitle}>📅 Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FLos_Angeles"
              className={styles.calendar}
              frameBorder="0"
              scrolling="no"
              title="Calendar"
            ></iframe>
          </>
        );
      case 'streak':
        return (
          <>
            <h2 className={styles.sectionTitle}>🔥 Current Streak</h2>
            <div className={styles.streakCard}>
              <p className={styles.streakBig}>🔥 4-Day Streak</p>
              <p className={styles.streakSub}>
                You are doing amazing! Keep your streak alive by completing at least one habit today.
              </p>
            </div>
          </>
        );
      case 'create':
        return (
          <>
            <h2 className={styles.sectionTitle}>➕ Create New Habit</h2>
            <div className={styles.cardGrid}>
              {['Read 10 pages', 'Walk for 5 min', 'Meditate', 'Journal', 'Declutter 1 item'].map((habit, i) => (
                <div key={i} className={styles.createHabitCard}>
                  <h4 className={styles.habitTitle}>{habit}</h4>
                  <button className={styles.addButton} onClick={() => handleAddHabit(habit)}>
                    Add Habit
                  </button>
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
    <main className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>🟧 1MinHabit</h1>
        <nav className={styles.nav}>
          {[
            { id: 'habits', label: 'Habits' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'streak', label: 'Streak' },
            { id: 'create', label: 'New Habit' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'habits' | 'calendar' | 'streak' | 'create')}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.activeNav : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className={styles.content}>{renderContent()}</section>
    </main>
  );
}
