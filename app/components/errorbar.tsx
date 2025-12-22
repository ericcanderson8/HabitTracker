import styles from "./errorbar.module.css"

export default function ErrorBar({ message }: { message: string }) {
    return (<div className={styles.errorBox} role="alert">
        <strong className={styles.errorTitle}>❌</strong>
        <span className={styles.errorText}>{message}</span>
    </div>
    )
}