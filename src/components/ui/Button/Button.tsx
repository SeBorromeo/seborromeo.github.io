import { CSSProperties, FC, ReactNode } from 'react';
import PageTransitionLink from '@/components/layout/page-transition/PageTransitionLink';

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
        <PageTransitionLink
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
        </PageTransitionLink>
    );
};

const pageAnimation = () => {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: "translateY(0)",
      },
      {
        opacity: 0.5,
        scale: 0.9,
        transform: "translateY(-100px)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        transform: "translateY(100%)",
      },
      {
        transform: "translateY(0)",
      },
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.76, 0, 0.24, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export default Button;