'use client'

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollToPlugin } from "gsap/all";
import { CONTACT_EMAIL } from "@/constants/constants";
import Socials from "@/components/ui/Socials/Socials";

import styles from "./SideNav.module.scss";

gsap.registerPlugin(ScrollToPlugin) 

export default function SideNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const overlayRef = useRef(null);

    const { contextSafe } = useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(`.${styles.sidebar}`, 
                { x: '-100%' }, 
                { x: '0%', duration: 0.5, ease: 'power3' }
            );
            
            gsap.from(overlayRef.current,
                { opacity: 0, duration: 0.5, ease: 'power3' },
            );
        }
    }, [isOpen]);

    const closeNav = contextSafe((section?: string | number) => {
        document.documentElement.classList.remove('no-doc-scroll');
        gsap.to(`.${styles.sidebar}`, 
            { x: '-100%', duration: 0.5, ease: 'power3.out', onComplete: onClose },
        );

        gsap.to(overlayRef.current,
            { opacity: 0, duration: 0.5, ease: 'power3' },
        );

        if (section != undefined) {
         	gsap.to(window, { duration: 1, scrollTo: { y: section } });}
    });

	useEffect(() => {
		if (isOpen)
			document.documentElement.classList.add('no-doc-scroll');
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className={styles.sidebarOverlay}>
			<div ref={overlayRef} className={styles.overlayBg} onClick={() => closeNav()}></div>

			<aside className={styles.sidebar}>
				<nav className={styles.nav}>
					<a className={styles.link} onClick={() => closeNav('#about')}>ABOUT</a>
					<a className={styles.link} onClick={() => closeNav('#experience')}>EXPERIENCE</a>
					<a className={styles.link} onClick={() => closeNav(0)}>HOME</a>
					<a className={styles.link} onClick={() => closeNav('#projects')}>PROJECTS</a>
					<a className={styles.link} onClick={() => closeNav('#contact')}>CONTACT</a>
				</nav>

				<div className={styles.footer}>
					<div className={styles.email}>
						<p className={styles.label}>EMAIL</p>
						<a href={`mailto:${CONTACT_EMAIL}`} className={styles.address}>{CONTACT_EMAIL}</a>
					</div>

					<div className={styles.icons}>
						<Socials />
					</div>
				</div>
			</aside>
		</div>
  	);
}

export function MobileSideNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const overlayRef = useRef(null);

	const { contextSafe } = useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(`.${styles.mobileNavContainer}`, 
                { y: '-100%' }, 
                { y: '0%', duration: 0.5, ease: 'power3' }
            );
            
            gsap.from(overlayRef.current,
                { opacity: 0, duration: 0.5, ease: 'power3' },
            );
        }
    }, [isOpen]);

    const closeNav = contextSafe((section?: string | number) => {
        document.documentElement.classList.remove('no-doc-scroll');
        gsap.to(`.${styles.mobileNavContainer}`, 
            { y: '-100%', duration: 0.5, ease: 'power3.out', onComplete: onClose },
        );

        gsap.to(`.${styles.overlayBg}`,
            { opacity: 0, duration: 0.5, ease: 'power3' },
        );

        if (section != undefined) {
         	gsap.to(window, { duration: 1, scrollTo: { y: section } });}
    });

	useEffect(() => {
		if (isOpen)
			document.documentElement.classList.add('no-doc-scroll');
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className={styles.mobileNavOverlay}>
			<div ref={overlayRef} className={styles.overlayBg} onClick={() => closeNav()}></div>

			<aside className={styles.mobileNavContainer}>
				<nav className={styles.mobileNav}>
					<div className={styles.mobileLinkContainer}><a className={styles.link} onClick={() => closeNav(0)}>HOME</a></div>
					<div className={styles.mobileLinkContainer}><a className={styles.link} onClick={() => closeNav('#about')}>ABOUT</a></div>
					<div className={styles.mobileLinkContainer}><a className={styles.link} onClick={() => closeNav('#experience')}>EXPERIENCE</a></div>
					<div className={styles.mobileLinkContainer}><a className={styles.link} onClick={() => closeNav('#projects')}>PROJECTS</a></div>
					<div className={styles.mobileLinkContainer}><a className={styles.link} onClick={() => closeNav('#contact')}>CONTACT</a></div>
				</nav>
			</aside>
		</div>
	);
}