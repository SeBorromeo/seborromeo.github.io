import React, { CSSProperties, FC, ReactNode } from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

interface ButtonProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    href: string;
    theme?: ButtonTheme
}

export enum ButtonTheme {
	White = 'white_bg',
}

const Button: FC<ButtonProps> = ({ children, style, className = '', href = '#', theme }) => {
    return (
        <Link
            href={href}
            className={`${styles.utl_button} ${className} ${theme ? styles[theme] : ''}`}
            style={style}
        >
            <div className={styles.utl_button_text_container}>
                <span className={styles.utl_button_text_wrapper}>
                    {children}
                </span>
                <span className={styles.utl_button_text_wrapper} aria-hidden="true">
                    {children}
                </span>
            </div>
        </Link>
    );
};

export default Button;