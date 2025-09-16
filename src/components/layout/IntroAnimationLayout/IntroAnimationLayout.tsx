"use client";

import { createContext, useRef, useContext } from "react";
import gsap from "gsap";

export const TimelineContext = createContext<gsap.core.Timeline | null>(null);

export default function IntroAnimationLayout({ children }: { children: React.ReactNode }) {
    const masterTl = useRef(gsap.timeline());

    return (
        <TimelineContext.Provider value={masterTl.current}>
            {children}
        </TimelineContext.Provider>
    );
}

export function useTimeline() {
    const ctx = useContext(TimelineContext);
    if (!ctx) throw new Error("useTimeline must be used inside TimelineProvider");
    return ctx;
}