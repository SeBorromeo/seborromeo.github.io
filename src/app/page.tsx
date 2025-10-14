import Header from '../components/home/Header/Header';
import SmoothScrollOverlay from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
import IntroAnimationLayout from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import Bio from '@/components/home/Bio/Bio';
import Experience from '@/components/home/Experience/Experience';
import Projects from '@/components/home/Projects/Projects';
import GetInTouch from '@/components/home/GetInTouch/GetInTouch';

import styles from './page.module.scss';

export default function Home() {
    return (
        <IntroAnimationLayout disable={false}>
            <Navbar />
            <SmoothScrollOverlay>
                <Header />
                <main className={styles.main}>
                    <Bio />
                    <Experience />
                    <Projects />
                    <GetInTouch />
                </main>
                <Footer />
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
