import Header from '../components/home/Header/Header';
import SmoothScrollOverlay from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
import IntroAnimationLayout from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';
import Navbar from '@/components/layout/Navbar/Navbar';
import Bio from '@/components/home/Bio/Bio';
import Experience from '@/components/home/Experience/Experience';
import Projects from '@/components/home/Projects/Projects';

import styles from './page.module.scss';

export default function Home() {
    return (
        <IntroAnimationLayout disable={true}>
            <Navbar />
            <SmoothScrollOverlay>
                <Header />
                <main className={styles.main}>
                    <Bio />
                    <Experience />
                    {/* <Projects /> */}
                </main>
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
