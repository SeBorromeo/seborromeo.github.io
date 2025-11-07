'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ReactNode, useRef } from "react";

const FadeInDiv = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        return gsap.from(ref.current, 
            { 
                autoAlpha: 0, 
                y: 50,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    toggleActions: "play none none reverse",
                    start: "top 95%",
                    markers: true,
                },
                duration: 1,
                ease: 'power3',
            });
    });

    return (        
        <div ref={triggerRef}>
            <div ref={ref} className={className}>
                {children}
            </div>
        </div>
    );
}

export default FadeInDiv;