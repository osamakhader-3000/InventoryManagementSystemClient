import { ReactNode } from "react";
import styles from "./TruncatedText.module.css";

// Keeps name/link columns wider than the rest and cuts long values with "..." and a tooltip
export function TruncatedText({ text, children }: { text?: string | null, children?: ReactNode }) {
    if (!text)
        return <>-</>;

    return (
        <span className={styles.truncatedtext} title={text}>
            {children ?? text}
        </span>
    );
}
