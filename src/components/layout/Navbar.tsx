'use client';

import { FC, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';

import styles from './Navbar.module.scss';
import { useTimeline } from './IntroAnimationLayout/IntroAnimationLayout';

const Navbar: FC = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const tl = useTimeline();

    useGSAP(() => {
        tl.to(navRef.current, {
            opacity: 1,
            duration: 1.5,
        })
    });

    return (
        <nav className={styles.nav_container} ref={navRef}>
            <div className={styles.home_container}>
                <Link href="/">
                    <h2>[HOME]</h2>
                </Link>
            </div>
            <div className={styles.contact_container}>
                <h3>AVAILABLE TO WORK</h3>
                <h2>
                    <a href="mailto:sebastiangborromeo@gmail.com">[CONTACT]</a>
                </h2>
            </div>
        </nav>
    );
};

export default Navbar;
