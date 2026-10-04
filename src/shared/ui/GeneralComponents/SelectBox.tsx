import React from 'react';
import styles from './SelectBox.module.css';

interface SelectBoxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, className, children, ...selectProps }) => {
    return (
        <div className={styles.selectBoxContainer}>
            <select
                className={`${styles.selectBox} ${className ?? ''}`.trim()}
                {...selectProps}
            >
                {children}
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectBox;
