'use client'
import React, { useState, useActionState } from 'react';
import Link from 'next/link';

import { Habit, HabitData } from './page';
import { CreateHabitState, newHabit } from './actions';
import styles from './page.module.css';

const initialCreateHabitState: CreateHabitState = { hasState: false };

export default function ClientView({ data }: HabitData) {
  const [activeTab, setActiveTab] = useState<'habits' | 'calendar' | 'streak' | 'create' | 'friend'>('habits');
  const [habits, setHabits] = useState<Habit[]>(data);
  const [customHabits, setCustomHabits] = useState<Habit[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [coins, setCoins] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [createHabitState, createHabitAction, createHabitPending] =
   useActionState<CreateHabitState, FormData>(newHabit, initialCreateHabitState)

  // EVENT HANDLERS
  const handleAddHabit = (habit: Habit) => {
    if (!habits.find((h) => h.title === habit.title)) {
      setHabits([...habits, habit]);
    }
  };

  const handleMarkAsDone = (habit: Habit) => {
    const nextXp = xp + 10;
    const threshold = Math.pow(2, level - 1) * 100;
    if (nextXp >= threshold) {
      setXp(0);
      setLevel(level + 1);
      setShowPopup(true);
    } else {
      setXp(nextXp);
    }
    setCoins((prev) => prev + habit.coins);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'habits':
        return (
          <>
            <h2 className={styles.sectionTitle}>📋 List of Habits</h2>
            <div className={styles.xpBarContainer}>
              <div className={styles.xpLabel}>
                XP: {xp} / {Math.pow(2, level - 1) * 100} (Level {level})
              </div>
              <div className={styles.xpBarBg}>
                <div
                  className={styles.xpBarFill}
                  style={{ width: `${(xp / (Math.pow(2, level - 1) * 100)) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className={styles.cardGrid}>
              {habits.map((habit, i) => (
                <details key={i} className={styles.habitCard}>
                  <summary className={styles.habitTitle}>{habit.title}</summary>
                  <p className={styles.habitDesc}>{habit.description}</p>
                  <p className={styles.coinsText}>💰 +{habit.coins} Coins</p>
                  <button
                    className={styles.completeButton}
                    onClick={() => handleMarkAsDone(habit)}
                  >
                    Mark as Done
                  </button>
                </details>
              ))}
            </div>
            {showPopup && (
              <div className={styles.popupOverlay}>
                <div className={styles.popupBox}>
                  <h2>🎉 Level Up!</h2>
                  <p>Congratulations! You've reached Level {level}!</p>
                  <button className={styles.completeButton} onClick={() => setShowPopup(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
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
                Keep your streak alive by completing at least one habit today.
              </p>
            </div>
          </>
        );
      case 'create':
        return (
          <>
            <h2 className={styles.sectionTitle}>➕ Create New Habit</h2>
            <div className={styles.cardGrid}>
              {
               customHabits.map((habit, i) => (
                <div key={i} className={styles.createHabitCard}>
                  <h4 className={styles.habitTitle}>{habit.title}</h4>
                  <p className={styles.habitDesc}>{habit.description}</p>
                  <p className={styles.coinsText}>💰 {habit.coins} Coins</p>
                  <button className={styles.addButton} onClick={() => handleAddHabit(habit)}>
                    Add Habit
                  </button>
                </div>
              ))}
            </div>

            <form action={createHabitAction} style={{ marginTop: '2rem' }}>
              <input
                type="text"
                name="title"
                placeholder="Habit Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={styles.input}
              />
              <textarea
                name="description"
                placeholder="Habit Description"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className={styles.textarea}
              ></textarea>
              <button type="submit" className={styles.addButton}>
                ➕ Finish Custom Habit
              </button>
              


            </form>
          </>
        );
      case 'friend':
        return (
          <>
            <h2 className={styles.sectionTitle}>🧍 Habit Friend</h2>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div style={{ fontSize: '5rem' }}>🧍</div>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#666' }}>Level: {level}</p>
              <p style={{ fontSize: '0.95rem', color: '#999' }}>Accessories coming soon...</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.topRightCoins}>💰 {coins}</div>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>🔷 1MinHabit</h1>
        <nav className={styles.nav}>
          <button
            onClick={() => setActiveTab('habits')}
            className={`${styles.navItem} ${activeTab === 'habits' ? styles.activeNav : ''}`}
          >
            Habits
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`${styles.navItem} ${activeTab === 'calendar' ? styles.activeNav : ''}`}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('streak')}
            className={`${styles.navItem} ${activeTab === 'streak' ? styles.activeNav : ''}`}
          >
            Streak
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`${styles.navItem} ${activeTab === 'create' ? styles.activeNav : ''}`}
          >
            New Habit
          </button>
          <button
            onClick={() => setActiveTab('friend')}
            className={`${styles.navItem} ${activeTab === 'friend' ? styles.activeNav : ''}`}
          >
            Habit Friend
          </button>

          {/* ✅ Chatbot link goes to /user/chatbot */}
          <Link href="/user/chatbot" className={styles.navItem}>
            Chatbot
          </Link>
        </nav>
      </aside>
      <section className={styles.content}>{renderContent()}</section>
    </main>
  );
}
