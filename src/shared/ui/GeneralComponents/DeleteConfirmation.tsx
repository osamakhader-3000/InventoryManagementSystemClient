import styles from './DeleteConfirmation.module.css';

export function DeleteConfirmation({ title, message, onConfirm, onCancel }: { title: string, message: string, onConfirm: () => void, onCancel: () => void }) {
    return (
        <div className={styles.confirmationcontainer} onClick={onCancel}>
            <div className={styles.confirmationbox} onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className={styles.confirmationbuttons}>
                    <button className={styles.confirmationbutton} onClick={onConfirm}>Yes</button>
                    <button className={styles.confirmationbutton} onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
}