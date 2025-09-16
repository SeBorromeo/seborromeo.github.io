"use client"; 

import styles from './Header.module.scss';

import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/SplitText";

import { useIntroTimeline } from '../layout/IntroAnimationLayout/IntroAnimationLayout';
import { useRef } from 'react';

gsap.registerPlugin(SplitText);

export default function Header() {
    const imageRef = useRef<HTMLDivElement>(null);
    const masterTl = useIntroTimeline();
    
    useGSAP(() => {
        let tl = gsap.timeline();

        tl.from(imageRef.current, { width: '78%', ease: 'power2.inOut', duration: 1 })

        let name = SplitText.create([`.${styles.name}`, '.name'], { // TODO: Figure out server-side rendering
            type: 'chars',
            mask: "chars", 
        });

        tl.from(name.chars, {
            y: "200%",
            stagger: 0.02,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => name.revert()
        }, 0);

        let subtitle = SplitText.create(`.${styles.title}`, { 
            type: 'lines',
            mask: "lines", 
        });

        tl.from(subtitle.lines, {
            y: "200%",
            stagger: 0.03,
            duration: 1,
            ease: 'power2.out',
        }, 0.1);

        SplitText.create(`.${styles.bio}`, { 
            type: 'words, lines',
            autoSplit: true,   
            mask: "lines", 
            onSplit: (self) => {
                return tl.from(self.lines, {
                    y: "200%",
                    stagger: 0.08,
                    duration: 1,
                    ease: 'power2.out',
                    onComplete: () => self.revert()
                }, 0.2);
            },
        });

        tl.from(`.${styles.resume_button}`, {
            transformY: "200px",
            scaleY: 0,
            duration: 0.5,
            ease: 'power2.out',
        }, 0.2)

        masterTl.add(tl, "introEnd-=0.6")
    });

    const headshotStyle = {
        borderRadius: '5%',
    };

    return (
        <header className={styles.section1}>
            <div className={styles.name_column}>
                <h1 data-speed="clamp(0.84)" className={styles.name}>Hi, I&apos;m Sebastian!</h1>
                <h2 data-speed="clamp(0.83)" className={styles.title}>COMPUTER SCIENCE GRADUATE FROM THE UNIVERSITY OF VIRGINIA</h2>
                <h3 data-speed="clamp(0.82)" className={styles.bio}>
                    Aspiring Software Engineer familiar in HTML, CSS, SASS, JavaScript, TypeScript, React, Nextjs,
                    PHP, SQL, and RESTful APIs.
                </h3>
                <a data-speed="clamp(0.81)" href="/images/resume.pdf" className={styles.resume_button}>
                    VIEW MY RESUME
                </a>
            </div>
            <div data-speed="clamp(0.7)" className={styles.photo_column}>
                <div ref={imageRef} className={styles.photo_container}>
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
