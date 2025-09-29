'use client'

import { FC, ReactNode, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import styles from './StickyDiv.module.scss';

interface StickyDivProps {
    children: ReactNode;
    padding?: string;
    easeFactor?: number;
}

const StickyDiv: FC<StickyDivProps> = ({ children, padding = '10px', easeFactor = 0.8 }) => {
    const container = useRef<HTMLDivElement>(null);
    const setX = useRef<gsap.QuickToFunc | null>(null);
    const setY = useRef<gsap.QuickToFunc | null>(null);

    const { contextSafe } = useGSAP();

    const onMouseEnter = contextSafe(() => {
        setX.current = gsap.quickTo(container.current, "x", {duration: 0.6, ease: "power3"});
        setY.current = gsap.quickTo(container.current, "y", {duration: 0.6, ease: "power3"});
    });

    const easeInOut = (t: number) => easeFactor * Math.sin(t);

    const onMouseMove = contextSafe((e: React.MouseEvent) => {
        let parent = container.current?.parentElement?.getBoundingClientRect();
        
        if (parent) {
            const mx = e.clientX - parent.left;
            const my = e.clientY - parent.top;
            
            const w = parent.width;
            const h = parent.height;

            // normalized distance from center [-0.5,0.5]
            let px = mx / parent.width - 0.5; 
            let py = my / parent.height - 0.5; 

            px = easeInOut(px); 
            py = easeInOut(py); 
            
            const offsetX = -w * px; 
            const offsetY = -h * py; 

            setX.current?.(mx + offsetX - w / 2); 
            setY.current?.(my + offsetY - h / 2);
        }
    });     

    const onMouseLeave = contextSafe(() => {
        gsap.to(container.current, { y: 0, x: 0, duration: 0.6, ease: "power3" });
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