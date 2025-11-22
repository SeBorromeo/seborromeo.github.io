'use client';

import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { CSSProperties, FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
    href: string;
}

const PageTransitionLink: FC<Props> = ({children, style, className = '', href}) => {
    const router = useTransitionRouter();

    return (
        <Link
            href={href}
            className={className}
            style={style}
            onClick={(e) => {
                if (href != "#")  {
                    e.preventDefault();
                    router.push(href, {
                        onTransitionReady: pageAnimation
                    })
                }
            }}
        >
            {children}
        </Link>
    );
}

const pageAnimation = () => {
    document.documentElement.animate(
        [
            {
                opacity: 1,
                scale: 1,
                transform: "translateY(0)",
            },
            {
                opacity: 0.5,
                scale: 0.9,
                transform: "translateY(-100px)",
            },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
        }
    );
    
    document.documentElement.animate(
        [
            {
                transform: "translateY(100%)",
            },
            {
                transform: "translateY(0)",
            },
        ],
        {
            duration: 1000,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
        }
    );
};

export default PageTransitionLink;