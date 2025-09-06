import Navbar from '@/components/layout/Navbar';
import AppearingText from '@/components/ui/AppearingText';

import styles from './page.module.scss';
import Image from 'next/image';
import AppearingParagraph from '@/components/ui/AppearingParagraph/AppearingParagraph';
import Header from './../components/home/Header';

export default function Home() {
    const headshotStyle = {
        borderRadius: '5%',
    };

    return (
        <>
            <Navbar />
            <Header />
            <main className={styles.main}>
                <AppearingParagraph text={'Hello \n paragraph this that \n look at it me'} />

                <div className={styles.section2}></div>
            </main>
        </>
    );
}