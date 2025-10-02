'use client'
import React, { ReactNode, useRef } from "react";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger);

const MaskedTextReveal = ({ children, stagger = 0.05 }: { children: ReactNode, stagger?: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        SplitText.create(ref.current, { 
            type: 'words, lines',
            autoSplit: true,   
            mask: "lines", 
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    scrollTrigger: {
                        trigger: ref.current,
                        toggleActions: "play none none reverse",
                        start: "top 90%",
                    },
                    y: "200%",
                    stagger: stagger,
                    duration: 1.1,
                    ease: 'power3',
                });
            },
        });
    });

    return (
        <>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;

                return React.cloneElement(child, {
                    ref: ref,
                });
            })}
        </>
    );
}

export default MaskedTextReveal;