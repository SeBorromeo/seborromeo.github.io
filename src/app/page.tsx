import Header from './../components/home/Header';
import SmoothScrollOverlay from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
import IntroAnimationLayout from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';
import Navbar from '@/components/layout/Navbar/Navbar';
import Bio from '@/components/home/Bio/Bio';

import styles from './page.module.scss';

export default function Home() {
    return (
        <IntroAnimationLayout disable={true}>
            <Navbar />
            <SmoothScrollOverlay>
                <Header />
                <main className={styles.main}>
                    {/* Scroll Line */}
                    <div data-speed="clamp(0.75)" className={styles.scroll_text_container}>
                        <span>SCROLL</span>
                        <div className={styles.vertical_line}></div>
                    </div>

                    <Bio />

                    <div className={styles.section2}>
                        
                    </div>
                </main>
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
