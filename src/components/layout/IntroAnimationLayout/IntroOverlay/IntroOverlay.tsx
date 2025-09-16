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

    useGSAP(() => {
        let tl = gsap.timeline();

        tl.delay(3)

        tl.to(overlayRef.current, {
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
            <div className={styles.reveal_text_overlay}></div>
            <span className={styles.reveal_text}>Sebastian Borromeo</span>
        </div>
    );
}
