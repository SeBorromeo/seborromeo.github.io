'use client'

import styles from './IntroOverlay.module.scss';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

interface Props {
    timeline: gsap.core.Timeline
}

export default function IntroOverlay( { timeline }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        timeline.to(overlayRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: "power1.inOut",
            onComplete: () => {
                document.body.classList.remove('no-doc-scroll')
            }
        })
    })

    return (
        <div ref={overlayRef} className={styles.background}>
            <span>Sebastian Borromeo</span>
        </div>
    );
}
