"use client"; 

import Image from 'next/image';
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";

import styles from './header.module.scss';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);

export default function Header({children}: {children?: React.ReactNode}) {

    useGSAP(() => {
        let name = SplitText.create([`.${styles.name}`, '.name'], { // TODO: Figure out server-side rendering
            type: 'chars',
            mask: "chars", 
        });

        gsap.set([`.${styles.name}`, `.${styles.title}`, `.${styles.bio}`], {visibility: 'inherit'});

        gsap.from(name.chars, {
            y: "100px",
            stagger: 0.02,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => name.revert()
        });

        let subtitle = SplitText.create(`.${styles.title}`, { 
            type: 'lines',
            mask: "lines", 
        });

        gsap.from(subtitle.lines, {
            y: "100vh",
            autoAlpha: 0,
            stagger: 0.03,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out',
        });

        SplitText.create(`.${styles.bio}`, { 
            type: 'words, lines',
            autoSplit: true,   
            mask: "lines", 
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    y: "100vh",
                    stagger: 0.08,
                    duration: 1,
                    delay: 0.4,
                    ease: 'power2.out',
                    onComplete: () => self.revert()
                });
            },
        });
    });

    const headshotStyle = {
        borderRadius: '5%',
    };

    return (
        <header className={styles.section1}>
            {children}
            <div className={styles.name_column}>
                <h1 className={styles.name}>Hi, I&apos;m Sebastian!</h1>
                <h2 className={styles.title}>COMPUTER SCIENCE GRADUATE FROM THE UNIVERSITY OF VIRGINIA</h2>
                <h3 className={styles.bio}>
                    Aspiring Software Engineer familiar in HTML, CSS, SASS, JavaScript, TypeScript, React, Nextjs,
                    PHP, SQL, and RESTful APIs.
                </h3>
                <a href="/images/resume.pdf" className={styles.resume_button}>
                    VIEW MY RESUME
                </a>
            </div>
            <div className={styles.photo_column}>
                <div className={styles.photo_container}>
                    <Image
                        src="/images/blank-profile-pic.webp"
                        alt="Photo of Sebastian"
                        layout="fill"
                        style={headshotStyle}
                    />
                </div>
            </div>
        </header>
    );
}
