'use client'

import { useContext, useRef } from 'react';
import styles from './IntroOverlay.module.scss';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/all';
import { useTimeline } from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';

export default function IntroOverlay({ onComplete }: { onComplete?: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const tl = useTimeline();

    useGSAP(() => {
        tl.to(overlayRef.current, {
            y: '-100%',
            duration: 1.2,
            ease: "power1.inOut",
            onComplete: () => {
                document.body.classList.remove('no-doc-scroll')
                onComplete?.()
            }
        })
    })

    return (
        <div ref={overlayRef} className={styles.background}>
            <span>Sebastian Borromeo</span>
        </div>
    );
}
