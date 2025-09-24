'use client'

import { gsap, ScrollTrigger, ScrollSmoother} from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollOverlay({ children }: Readonly<{ children: React.ReactNode }>) {
    useGSAP(() => {
        let smoother = ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
        });

        smoother.scrollTop(0);
    })

    return (
        <div id="smooth-content">
            {children}
        </div>
    );
}
