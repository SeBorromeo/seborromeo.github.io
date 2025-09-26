'use client';

import { FC, useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';

import styles from './Navbar.module.scss';
import { useIntroTimeline } from '../IntroAnimationLayout/IntroAnimationLayout';
import StickyDiv from '@/components/ui/StickyDiv/StickyDiv';

const Navbar: FC = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const tl = useIntroTimeline();

    useGSAP(() => {
        tl.to(navRef.current, {
            opacity: 1,
            duration: 1.7,
        }, "introEnd-=0.2")
    });

    return (
        <nav className={styles.nav_container} ref={navRef}>
            <div className={styles.home_container}>
                <StickyDiv padding='0px'>
                    <Link href="/">
                        <h2 className={styles.nav_link}>[HOME]</h2>
                    </Link>
                </StickyDiv>
            </div>
            <div className={styles.contact_container}>
                <h3>AVAILABLE TO WORK</h3>
                <StickyDiv padding='0px'>
                    <h2 className={styles.nav_link}>
                        <a href="mailto:sebastiangborromeo@gmail.com">[CONTACT]</a>
                    </h2>
                </StickyDiv>
            </div>
        </nav>
    );
};

export default Navbar;
