"use client"; 

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/SplitText";
import { useRef } from 'react';
import { useIntroTimeline } from '../../layout/IntroAnimationLayout/IntroAnimationLayout';
import Image from 'next/image';
import StickyDiv from '../../ui/StickyDiv/StickyDiv';
import Button from '../../ui/Button/Button';

import styles from './Header.module.scss';

gsap.registerPlugin(SplitText);

export default function Header() {
    const imageRef = useRef<HTMLDivElement>(null);
    const masterTl = useIntroTimeline();
    
    useGSAP(() => {
        let tl = gsap.timeline();

        tl.from(imageRef.current, { width: '78%', ease: 'power2.inOut', duration: 1 })

        let name = SplitText.create([`.${styles.name}`, '.name'], { 
            type: 'chars',
            mask: 'chars', 
        });

        tl.from(name.chars, {
            y: "200%",
            stagger: 0.03,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => name.revert()
        }, 0);

        let subtitle = SplitText.create(`.${styles.title}`, { 
            type: 'lines',
            mask: 'lines', 
        });

        tl.from(subtitle.lines, {
            y: "200%",
            stagger: 0.03,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => subtitle.revert()
        }, 0.1);

        let bio = SplitText.create(`.${styles.bio}`, { 
            type: 'lines',
            mask: 'lines', 
        });

        tl.from(bio.lines, {
            y: "200%",
            stagger: 0.03,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => bio.revert()
        }, 0.2);

        tl.from(`.${styles.resume_button}`, {
            y: "200%",
            duration: 1,
            ease: 'power2.out',
        }, 0.3)

   // masterTl.add(tl, "introEnd-=0.9");
   tl.play();
        // Scroll Trigger Background Change Animation Timeline
        const switchBgTl = gsap.timeline({
            scrollTrigger: {
                trigger: `.${styles.header}`,
                toggleActions: "play none none reverse",
                start: "bottom 80%",
            },
            defaults: { ease: 'none', duration: 0.5 },
        });

        switchBgTl.to(`.${styles.bg}`, {
            opacity: 0,
            duration: 0.5,
        });
        
        switchBgTl.to('.bio-text', {
            opacity: 1,
            duration: 0,
        }, ">");
    });

    const headshotStyle: React.CSSProperties = {
        objectFit: "cover",
        borderRadius: '5%',
        filter: "drop-shadow(0 0 6px rgba(0, 0, 0, 0.1))",
    };

    return (
        <header id="header" className={styles.header} data-speed="0.72">
            <div className={styles.bg}/>
            <div className={styles.intro_section}>
                <div className={styles.name_column}>
                    <h1 className={styles.name}>Hi, I&apos;m Sebastian!</h1>
                    <h2 className={styles.title}>COMPUTER SCIENCE GRADUATE FROM THE UNIVERSITY OF VIRGINIA</h2>
                    <h3 className={styles.bio}>
                        Aspiring Software Engineer familiar in HTML, CSS, SASS, JavaScript, TypeScript, Java, Python, PHP, React, Nextjs,
                         SQL, and RESTful APIs.
                    </h3>
                    <div className={styles.button_container}>
                        <Button href="/images/resume.pdf" className={styles.resume_button}>
                            VIEW MY RESUME
                        </Button>
                    </div>
                </div>
                <div className={styles.photo_column}>
                    <div ref={imageRef} className={styles.photo_container}>
                        <StickyDiv>
                            <Image
                                fill
                                src="/images/newheadshot.jpg"
                                alt="Photo of Sebastian"
                                style={headshotStyle}
                            />
                        </StickyDiv>
                    </div>
                </div>
            </div>

            {/* Scroll Line */}
            <div data-speed="clamp(0.99)" className={styles.scroll_text_container}>
                <span>SCROLL</span>
                <div className={styles.vertical_line}></div>
            </div>
        </header>
    );
}
