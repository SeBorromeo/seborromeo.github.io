'use client';

import { useEffect, useRef } from "react";

export default function Cursor() {
    const cursor = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (cursor.current) {
                cursor.current.style.top = e.clientY + "px";
                cursor.current.style.left = e.clientX + "px";
            }
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return <div ref={cursor} className="cursor"/>;
}