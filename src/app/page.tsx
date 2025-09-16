import styles from './page.module.scss';
import AppearingParagraph from '@/components/ui/AppearingParagraph/AppearingParagraph';
import Header from './../components/home/Header';
import SmoothScrollOverlay from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
import IntroAnimationLayout from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';
import Navbar from '@/components/layout/Navbar/Navbar';

export default function Home() {
    return (
        <IntroAnimationLayout>
            <Navbar />
            <SmoothScrollOverlay>
                <Header />
                <main className={styles.main}>
                    <AppearingParagraph text={'Hello \n paragraph this that \n look at it me'} />

                    <div className={styles.section2}></div>
                </main>
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
