"use client";

import gsap from "gsap";
import { createContext, useRef, useContext, useEffect } from "react";
import IntroOverlay from "./IntroOverlay/IntroOverlay";

export const TimelineContext = createContext<gsap.core.Timeline | null>(null);

export default function IntroAnimationLayout({ children, disable = false }: { children: React.ReactNode, disable?: boolean }) {
    const masterTl = useRef(gsap.timeline());

    useEffect(() => {
        if (disable)
            document.documentElement.classList.remove('no-doc-scroll');
    })
    
    return (
        <TimelineContext.Provider value={masterTl.current}>
            {!disable && <IntroOverlay masterTl={masterTl.current}/>}
            {children}
        </TimelineContext.Provider>
    );
}

export function useIntroTimeline() {
    const ctx = useContext(TimelineContext);
    if (!ctx) throw new Error("useTimeline must be used inside TimelineProvider");
    return ctx;
}