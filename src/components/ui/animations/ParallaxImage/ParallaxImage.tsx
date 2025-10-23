'use client'

import React, { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from './ParallaxImage.module.scss';

gsap.registerPlugin(ScrollTrigger);

type ParallaxImageProps = ImageProps & {
    src: string;
    className?: string;
    alt: string;
    isVideo?: boolean;
};

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, className, alt, isVideo = false}) => {
    const frameRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={frameRef}
            className={`${styles.frame} ${className}`}
        >
            <div ref={imgRef} className={styles.image_wrapper} data-speed='0.65'>
                {isVideo ?
                    <video
                        src={src}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    :
                    <Image
                        src={src}
                        alt={alt}
                        width={0} height={0}
                        objectFit="cover"
                    />
                }
            </div>
        </div>
    );
};

export default ParallaxImage;