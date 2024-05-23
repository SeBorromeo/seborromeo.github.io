import { FC } from 'react'
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './Navbar.module.scss'

const Navbar:FC = () => {
    useGSAP(() => {
        
    });

    
    return (
        <nav className={styles.nav_container}>
            <div className={styles.home_container}>
                <Link href="/">
                    <h2>HOME</h2>
                </Link>
            </div>
            <div className={styles.contact_container}>
                <h3>AVAILABLE TO WORK</h3>
                <Link href="/">
                    <h2>CONTACT</h2>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;