'use client'

import styles from './IntroOverlay.module.scss';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface Props {
    masterTl: gsap.core.Timeline
}

export default function IntroOverlay( { masterTl }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const revealTextOverlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let tl = gsap.timeline();
        tl.fromTo(revealTextOverlayRef.current, {
            xPercent: 30,
        }, {
            xPercent: 70,
            duration: 2,
            ease: "power2.inOut",
        })
        .fromTo(revealTextOverlayRef.current, {
            xPercent: -100,
        }, {
            xPercent: -30,
            duration: 2.5,
            ease: "power2.inOut",
        })
        .to(overlayRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: "power1.inOut",
            onComplete: () => {
                document.body.classList.remove('no-doc-scroll')
            }
        })

        masterTl.add(tl)
        masterTl.addLabel("introEnd")
    })

    return (
        <div ref={overlayRef} className={styles.overlay_container}>
            <div ref={revealTextOverlayRef} className={styles.reveal_text_overlay}></div>
            <span className={styles.reveal_text}>Sebastian Borromeo</span>
        </div>
    );
}
