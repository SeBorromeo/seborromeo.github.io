'use client'

import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { CONTACT_EMAIL } from "@/constants/constants";

import styles from "./SideNav.module.scss";

type SidebarOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideNav({ isOpen, onClose }: SidebarOverlayProps) {
    const { contextSafe } = useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(`.${styles.sidebar}`, 
                { x: '-100%' }, 
                { x: '0%', duration: 0.5, ease: 'power3' }
            );
            
            gsap.from(`.${styles.overlayBg}`,
                { opacity: 0, duration: 0.5, ease: 'power3' },
            );
        }
    }, [isOpen]);

    const closeNav = contextSafe(() => {
        document.documentElement.classList.remove('no-doc-scroll');
        gsap.to(`.${styles.sidebar}`, 
            { x: '-100%', duration: 0.5, ease: 'power3.out', onComplete: onClose },
        );

        gsap.to(`.${styles.overlayBg}`,
            { opacity: 0, duration: 0.5, ease: 'power3' },
        );
    });

  useEffect(() => {
        if (isOpen)
            document.documentElement.classList.add('no-doc-scroll');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.overlayBg} onClick={closeNav}></div>

      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <a href="#home" onClick={closeNav}>HOME</a>
          <a href="#about" onClick={closeNav}>ABOUT</a>
          <a href="#experience" onClick={closeNav}>EXPERIENCE</a>
          <a href="#projects" onClick={closeNav}>PROJECTS</a>
          <a href="#contact" onClick={closeNav}>CONTACT</a>
        </nav>

        <div className={styles.footer}>
          <div className={styles.email}>
            <p className={styles.label}>EMAIL</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.address}>{CONTACT_EMAIL}</a>
          </div>

          <div className={styles.icons}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <img src="/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img src="/github.svg" alt="GitHub" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src="/instagram.svg" alt="Instagram" />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}