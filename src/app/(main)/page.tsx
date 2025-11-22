export const revalidate = 86400; // 1 day in seconds

import Header from '../../components/home/Header/Header';
import SmoothScrollLayout from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
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
        <IntroAnimationLayout disable={true}>
            <Navbar />
            <SmoothScrollLayout>
                <Header />
                <main className={styles.main}>
                    <Bio />
                    <Experience />
                    <Projects />
                    <GetInTouch />
                </main>
                <Footer />
            </SmoothScrollLayout>
        </IntroAnimationLayout>
    );
}
