'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useRef } from "react";

import styles from "./UnderlineHeading.module.scss";

export default function UnderlineHeading({ text = '', className }: { text?: string, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, { 
            autoAlpha: 0, 
            scrollTrigger: {
                trigger: ref.current,
                toggleActions: "play none none reverse",
                start: "top 95%",
                end: "max",
                toggleClass: styles.active,
            },
            duration: 0.2,
            ease: 'power3.inOut',
        });
    }, []);

    return (
        <h1 ref={ref} className={`${styles.heading} ${className}`}>
            {text}
        </h1>
    );
}