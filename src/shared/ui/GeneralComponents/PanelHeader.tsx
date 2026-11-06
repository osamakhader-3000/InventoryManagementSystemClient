import { ReactNode } from 'react';
import { AppIcon } from './AppIcon';
import styles from './PanelHeader.module.css'

interface PanelHeaderProps {
    title: string,
    icon: string,
    count?: number,
    children?: ReactNode
}

// Header strip for a glass panel: icon + title on the left, optional actions on the right
export default function PanelHeader({ title, icon, count, children }: PanelHeaderProps) {
    return (
        <div className={styles.panelheader}>
            <span className={styles.panelicon}><AppIcon name={icon} /></span>
            <h5 className={styles.paneltitle}>{title}</h5>
            {count !== undefined && <span className={styles.panelcount}>{count}</span>}
            {children && <div className={styles.panelactions}>{children}</div>}
        </div>
    );
}
