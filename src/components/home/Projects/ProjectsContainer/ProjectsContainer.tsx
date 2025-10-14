'use client';

import { useRef } from "react";
import gsap, { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import styles from "../Projects.module.scss";

gsap.registerPlugin(ScrollTrigger);

const ProjectsContainer = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = containerRef.current!.querySelectorAll<HTMLElement>(`.${styles.card}`);

        gsap.from(cards, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
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