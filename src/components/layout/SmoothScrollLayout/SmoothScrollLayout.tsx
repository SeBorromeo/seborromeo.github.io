'use client'

import { gsap, ScrollTrigger, ScrollSmoother} from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollOverlay({ children }: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        let forcingRefresh = false;

        const refreshHandler = () => {
            if (!forcingRefresh) {
                forcingRefresh = true;
                const recordedScroll = window.pageYOffset;
                window.scrollTo(0, 0);
                ScrollTrigger.refresh();
                window.scrollTo(0, recordedScroll);
                forcingRefresh = false;
            }
        };

        ScrollTrigger.addEventListener("refresh", refreshHandler);

        return () => {
            ScrollTrigger.removeEventListener("refresh", refreshHandler);
        };
    }, []);

    useGSAP(() => {
        let smoother = ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
        });

        smoother.scrollTop(0);
    });

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    );
}
