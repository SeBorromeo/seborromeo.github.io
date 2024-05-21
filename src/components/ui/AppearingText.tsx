import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './AppearingText.module.scss'

export default function AppearingText({ text }: { text: string }) {
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.to(textRef.current!, {
            y: 0,
            stagger: 0.05,
            delay: 0.2,
            duration: 0.8,
            ease: 'power1.inOut'
        });
    }, {scope: textRef});

    return (
        <h1 ref={textRef} className={styles.text}>{text}</h1>
    );
}