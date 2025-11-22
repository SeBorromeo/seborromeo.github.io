'use client';

import { useRef } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import styles from "../Projects.module.scss";

gsap.registerPlugin(ScrollTrigger);

const ProjectsContainer = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = containerRef.current!.querySelectorAll<HTMLElement>(`.${styles.card}, .${styles.add_project_card}`);
        
        gsap.set(cards, {opacity: 0, y: 100});
        ScrollTrigger.batch(cards, {
            onEnter: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: 'auto'}, overwrite: true}),
            onLeaveBack: batch => gsap.to(batch, {opacity: 0, y: 100, stagger: {grid: 'auto'}, overwrite: true}),
        });
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        Array.from(containerRef.current!.querySelectorAll<HTMLElement>(`.${styles.card}`)).forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    };

	return (
		<div
            ref={containerRef}
            className={styles.projects_container}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>
	);
};

export default ProjectsContainer;