import { Link } from "react-router-dom";
import styles from "./BackButton.module.css";

export function BackButton({ to }: { to: string }) {
    return (
        <Link to={to} >
            <button type="button" className={styles.backbuttonclass}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
            </button>
        </Link>
    );
}