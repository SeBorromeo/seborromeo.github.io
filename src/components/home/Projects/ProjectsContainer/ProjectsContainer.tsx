'use client';

import { useRef } from "react";

import styles from "../Projects.module.scss";

const ProjectsContainer = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

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