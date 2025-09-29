import Header from './../components/home/Header';
import SmoothScrollOverlay from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
import IntroAnimationLayout from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';
import Navbar from '@/components/layout/Navbar/Navbar';
import Bio from '@/components/home/Bio/Bio';
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

                    {/* <Projects /> */}
                </main>
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
