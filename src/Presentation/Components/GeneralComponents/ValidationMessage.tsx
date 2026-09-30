import React from "react";
import styles from './ValidationMessage.module.css';

export const ValidationMessage: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
ValidationMessage.displayName = "ValidationMessage";