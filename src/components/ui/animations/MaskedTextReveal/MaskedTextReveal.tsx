'use client'
import React, { forwardRef, ReactNode, useRef } from "react";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(SplitText, ScrollTrigger);

const MaskedTextReveal = ({ children, stagger = 0.05 }: { children: ReactNode, stagger?: number }) => {
    const ref = useRef<HTMLDivElement>(null);

    // const Child = forwardRef<HTMLDivElement, { text: string }>((props, ref) => {
    //     return <div ref={ref}>{props.text}</div>;
    // });

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

                return React.cloneElement(child as React.ReactElement<any>, {
                    ref: ref as React.Ref<HTMLElement>,
                });
            })}
        </>
    );
}

export default MaskedTextReveal;