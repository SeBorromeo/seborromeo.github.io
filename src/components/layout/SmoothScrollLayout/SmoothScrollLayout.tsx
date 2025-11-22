'use client'

import { gsap, ScrollTrigger, ScrollSmoother} from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { createContext, useContext, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type ScrollContextType = {
    enableScroll: (enable: boolean) => void;
};

export const SmoothScrollContext = createContext<ScrollContextType | null>(null);

export default function SmoothScrollLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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

    const { contextSafe } = useGSAP(() => {
        let smoother = ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
        });

        smoother.scrollTop(0);
    });

    const enableScroll = contextSafe((enable: boolean) => {
        const smoother = ScrollSmoother.get();
        if (smoother) 
            smoother.paused(enable);
    });

    return (
        <SmoothScrollContext.Provider value={{ enableScroll }}>
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    {children}
                </div>
            </div>
        </SmoothScrollContext.Provider>
    );
}

export const useScrollControl = () => {
    const ctx = useContext(SmoothScrollContext);
    if (!ctx) throw new Error("useScrollControl must be used inside SmoothScrollLayout");
    return ctx;
};