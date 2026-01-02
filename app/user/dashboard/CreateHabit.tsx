'use client'
import { useActionState, useState } from 'react';

import { SetState } from './Dashboard';
import { UserData, Habit } from './page';
import { newHabit, CreateHabitState } from './actions';
import styles from './page.module.css';

export default function CreateHabit({ userData, setUserData }: { userData: UserData, setUserData: SetState<UserData> }) {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newHabitState, newHabitAction, newHabitPending] = useActionState(newHabit, { status: "idle" });

    const handleAddHabit = (habit: Habit) => {
        setUserData(prev => {
            if (!prev.habits.find((h) => h.title === habit.title)) {
                let habits = [...prev.habits, habit];
                return { ...prev, habits }
            }
            return prev
        })
    };

    return (
        <>
            <h2 className={styles.sectionTitle}>➕ Create New Habit</h2>
            <div className={styles.cardGrid}>
                {
                    userData.habits.map((habit, i) => (
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

            <form style={{ marginTop: '2rem' }} action={newHabitAction}>
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
}