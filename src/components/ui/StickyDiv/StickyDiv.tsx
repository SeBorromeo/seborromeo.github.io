'use client'

import { FC, ReactNode, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import styles from './StickyDiv.module.scss';

interface StickyDivProps {
    children: ReactNode;
    padding?: string;
}

const StickyDiv: FC<StickyDivProps> = ({ children, padding = '10px'}) => {
    const container = useRef<HTMLDivElement>(null);
    const setX = useRef<gsap.QuickToFunc | null>(null);
    const setY = useRef<gsap.QuickToFunc | null>(null);

    const { contextSafe } = useGSAP();


    const onMouseEnter = contextSafe(() => {
        gsap.to(container.current, { yPercent: -50, xPercent: -50 });
        setX.current = gsap.quickTo(container.current, "x", {duration: 0.6, ease: "power3"});
        setY.current = gsap.quickTo(container.current, "y", {duration: 0.6, ease: "power3"});
    });

    const onMouseMove = contextSafe((e: React.MouseEvent) => {
        let rect = container.current?.getBoundingClientRect();
        
        setX.current?.(e.clientX - (rect ? rect.left: 0));
        setY.current?.(e.clientY - (rect ? rect.top: 0));
    });     

    const onMouseLeave = contextSafe(() => {
        gsap.to(container.current, { y: 0, x: 0, xPercent: 0, yPercent: 0, duration: 0.6, ease: "power3" });
    });


    return (
        <div 
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={styles.sticky_div} 
            style={{ padding }}
        >
            <div ref={container} className={styles.container}
            >
                {children}
            </div>
        </div>
    );
}

export default StickyDiv;