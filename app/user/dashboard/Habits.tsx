'use client'
import { useState, useRef, useEffect } from 'react';

import { UserData, Habit } from './page';
import { SetState } from './Dashboard';
import styles from './page.module.css';

export default function Habits({ userData, setUserData }: { userData: UserData, setUserData: SetState<UserData> }) {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const prevLevelRef = useRef(userData.level);

    // Levelup popup
    useEffect(() => {
        if (userData.level > prevLevelRef.current) {
            setShowPopup(true);
        }
        prevLevelRef.current = userData.level;
    }, [userData.level]);

    // When Task Completed is clicked
    const handleMarkAsDone = (habit: Habit) => {
        setUserData(prev => {
            let xp = prev.xp + 10;
            let level = prev.level;
            const threshold = Math.pow(2, prev.level - 1) * 100;
            if (xp >= threshold) {
                xp = 0;
                level += 1;
            }

            return { ...prev, xp, level }
        })
    };

    return (
        <>
            <h2 className={styles.sectionTitle}>📋 List of Habits</h2>
            <div className={styles.xpBarContainer}>
                <div className={styles.xpLabel}>
                    XP: {userData.xp} / {Math.pow(2, userData.level - 1) * 100} (Level {userData.level})
                </div>
                <div className={styles.xpBarBg}>
                    <div
                        className={styles.xpBarFill}
                        style={{ width: `${(userData.xp / (Math.pow(2, userData.level - 1) * 100)) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className={styles.cardGrid}>
                {userData.habits.map((habit, i) => (
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
                        <p>Congratulations! You've reached Level {userData.level}!</p>
                        <button className={styles.completeButton} onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}