'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ReactNode, useRef } from "react";

const FadeInDiv = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        return gsap.fromTo(ref.current, 
            { autoAlpha: 0, y: 25 },
            { 
                autoAlpha: 1, 
                y: 0,
                scrollTrigger: {
                    trigger: ref.current,
                    toggleActions: "play none none reverse",
                    start: "top 80%",
                },
                duration: 1,
                ease: 'power3',
            });
    });

    return (        
        <div ref={ref}>
            {children}
        </div>
    );
}

export default FadeInDiv;