'use client';

import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './AppearingParagraph.module.scss';

interface Props {
    text: string;
    stagger?: number;
    delay?: number;
    duration?: number;
    className?: string;
}

const AppearingParagraph: FC<Props> = ({ text, delay = 0 }) => {
    const linesRef = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        if (linesRef.current.length === 0) return;

        gsap.fromTo(
            linesRef.current,
            { y: 100 },
            {
                y: 0,
                duration: 2.8,
                ease: 'power3.out',
                stagger: 0.15,
                delay,
            }
        );
    }, [delay]);

    // Split text into lines manually (here: by sentence or by \n)
    const lines = text.split('\n');

    return (
        <p className={styles.paragraph}>
            {lines.map((line, i) => (
                <span
                    key={i}
                    className="block overflow-hidden"
                    ref={(el) => {
                        if (el) linesRef.current[i] = el;
                    }}
                >
                    <span className="block">{line}</span>
                </span>
            ))}
        </p>
    );
};

export default AppearingParagraph;
