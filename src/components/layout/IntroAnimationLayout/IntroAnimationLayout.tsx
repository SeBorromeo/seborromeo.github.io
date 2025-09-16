"use client";

import gsap from "gsap";
import { createContext, useRef, useContext } from "react";
import IntroOverlay from "./IntroOverlay/IntroOverlay";

export const TimelineContext = createContext<gsap.core.Timeline | null>(null);

export default function IntroAnimationLayout({ children }: { children: React.ReactNode }) {
    const masterTl = useRef(gsap.timeline());

    return (
        <TimelineContext.Provider value={masterTl.current}>
            <IntroOverlay masterTl={masterTl.current}/>
            {children}
        </TimelineContext.Provider>
    );
}

export function useIntroTimeline() {
    const ctx = useContext(TimelineContext);
    if (!ctx) throw new Error("useTimeline must be used inside TimelineProvider");
    return ctx;
}