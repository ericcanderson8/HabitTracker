import { Suspense } from "react";
import Dashboard from "./Dashboard";
import { fetchUserData } from "./actions";
import styles from './page.module.css';

export type Habit = {
  title: string;
  description: string;
  xp: number;
  coins: number;
}

export type UserData = {
  xp: number
  level: number
  coins: number
  habits: Habit[]
}

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      {(async () => {
        let data = await fetchUserData();
        if (!data) return <p>Error</p>
        return <Dashboard user={data} />
      })()}
    </Suspense>
  )
}

function Loading() {
  return (
    <div className={styles.loadingOverlay} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.loadingCard}>
        <div className={styles.headerRow}>
          <div className={styles.logoPulse} aria-hidden="true" />
          <div>
            <div className={styles.title}>Loading…</div>
            <div className={styles.subtitle}>Syncing your habits and progress</div>
          </div>
        </div>

        <div className={styles.barWrap} aria-hidden="true">
          <div className={styles.barFill} />
        </div>

        <div className={styles.skeletonGrid} aria-hidden="true">
          <div className={styles.skelCard}>
            <div className={styles.skelLineLg} />
            <div className={styles.skelLineSm} />
            <div className={styles.skelLineSm} />
            <div className={styles.skelButton} />
          </div>
          <div className={styles.skelCard}>
            <div className={styles.skelLineLg} />
            <div className={styles.skelLineSm} />
            <div className={styles.skelLineSm} />
            <div className={styles.skelButton} />
          </div>
          <div className={styles.skelCard}>
            <div className={styles.skelLineLg} />
            <div className={styles.skelLineSm} />
            <div className={styles.skelLineSm} />
            <div className={styles.skelButton} />
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.spinner} aria-hidden="true" />
          <span className={styles.metaText}>Please wait</span>
        </div>
      </div>
    </div>
  );
}