'use client';

import { FC, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { useIntroTimeline } from '../IntroAnimationLayout/IntroAnimationLayout';
import StickyDiv from '@/components/ui/StickyDiv/StickyDiv';
import SideNav from '../SideNav/SideNav';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
    const navRef = useRef<HTMLDivElement>(null);
    const tl = useIntroTimeline();

    const [sideBarOpen, setSidebarOpen] = useState(false);

    useGSAP(() => {
        tl.to(navRef.current, {
            opacity: 1,
            duration: 1.7,
        }, "introEnd-=0.2")
    });

    return (
        <>
            <SideNav isOpen={sideBarOpen} onClose={() => setSidebarOpen(false)}/>
            <nav className={styles.nav_container} ref={navRef}>
                <div className={styles.home_container}>
                    <StickyDiv padding='0px'>
                        <a onClick={() => setSidebarOpen(true)}>
                            <h2 className={styles.nav_link}>[HOME]</h2>
                        </a>
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
        </>
    );
};

export default Navbar;
