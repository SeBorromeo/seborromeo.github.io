'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ReactNode, useRef } from "react";

const FadeInDiv = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        return gsap.from(ref.current, 
            { 
                autoAlpha: 0, 
                y: 25,
                scrollTrigger: {
                    trigger: ref.current,
                    toggleActions: "play none none reverse",
                    start: "top 90%",
                },
                duration: 1,
                ease: 'power3',
            });
    });

    return (        
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export default FadeInDiv;