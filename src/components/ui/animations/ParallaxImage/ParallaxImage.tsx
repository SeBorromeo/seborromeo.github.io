'use client'
import React, { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from './ParallaxImage.module.scss';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ParallaxImageProps = ImageProps & {
    src: string;
    parallaxPercent?: number; 
    className?: string;
    frameClassName?: string;
};

const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    parallaxPercent = -20,
    className,
    frameClassName,
    ...imageProps
}) => {
    const frameRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    // useGSAP(() => {
    //     if (!frameRef.current || !imgRef.current) return;
    //     gsap.to(imgRef.current, {
    //             scrollTrigger: {
    //                 id: `parallax-${src}`,
    //                 trigger: frameRef.current,
    //                 start: "top bottom",
    //                 end: "bottom top",
    //                 scrub: true,
    //                 // markers: true,
    //             },
    //             yPercent: parallaxPercent,
    //         }
    //     );
    // }, [parallaxPercent]);

    return (
        <div
            ref={frameRef}
            className={styles.frame}
        >
            <div ref={imgRef} className={styles.image_wrapper} data-speed='0.7'>
                <Image
                    {...imageProps}
                    className={className}
                    width={0} height={0}
                    objectFit="cover"
                    alt={imageProps.alt}
                    src={src}
                />
            </div>
        </div>
    );
};

export default ParallaxImage;