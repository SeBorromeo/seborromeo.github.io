import { FC } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './AppearingText.module.scss'

interface Props{
    text: string;
    stagger?: number;
    delay?: number;
    duration?: number;
}

const AppearingText:FC<Props> = ({text, stagger = 0.05, delay = 0.2, duration = 0.4}) => {
    useGSAP(() => {
        gsap.from(`.${styles.char}`, {
            y: 80,
            stagger: stagger,
            delay: delay,
            duration: duration,
            ease: 'power4.out'
        });
    });

    const charArray: string[] = text.split('');

    return (
        <h1 className={styles.text}>
            <div className={styles.line}>
                {charArray.map((char, index) => (
                    <div key={index} className={styles.char}>{char === ' ' ? '\u00A0' : char}</div>
                ))}
            </div>
        </h1>
    );
}

export default AppearingText;