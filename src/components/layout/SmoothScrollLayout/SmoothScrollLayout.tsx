'use client'

import { gsap, ScrollTrigger, ScrollSmoother} from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollOverlay({ children }: Readonly<{ children: React.ReactNode }>) {

    function smootherFix() {
        let forcingRefresh: boolean;
        ScrollTrigger.addEventListener("refresh", () => {
            if (!forcingRefresh) {
                forcingRefresh = true;
                let recordedScroll = window.pageYOffset;
                window.scrollTo(0, 0);
                ScrollTrigger.refresh();
                window.scrollTo(0, recordedScroll);
                forcingRefresh = false;
            }
        });
    }
    smootherFix();

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
