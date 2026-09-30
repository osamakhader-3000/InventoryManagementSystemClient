import styles from '../../GeneralStyles.module.css';

export function ForbiddenMessage() {
    return (
        <div className={styles.container}>
            <h2>Forbidden</h2>
            <p>You do not have permission to access this page.</p>
        </div>
    );
}