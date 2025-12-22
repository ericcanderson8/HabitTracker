'use client'
import React, { useState, } from 'react';
import Link from 'next/link';

import { UserData } from './page';
import styles from './page.module.css';
import Habits from './Habits';
import Calender from './Calender';
import CreateHabit from './CreateHabit';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export default function Dashboard({ user }: { user: UserData }) {
  const [userData, setUserData] = useState<UserData>(user)
  const [activeTab, setActiveTab] = useState<'habits' | 'calendar' | 'create' | 'friend'>('habits');

  const renderContent = () => {
    switch (activeTab) {
      case 'habits':
        return <Habits userData={userData} setUserData={setUserData} />
      case 'calendar':
        return <Calender />
      case 'create':
        return <CreateHabit userData={userData} setUserData={setUserData}/>
      case 'friend':
        return (
          <>
            <h2 className={styles.sectionTitle}>🧍 Habit Friend</h2>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div style={{ fontSize: '5rem' }}>🧍</div>
              <p style={{ fontSize: '1rem', marginTop: '0.5rem', color: '#666' }}>Level: {userData.level}</p>
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
      <div className={styles.topRightCoins}>💰 {userData.coins}</div>
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
