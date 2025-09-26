import styles from './page.module.scss';
import Header from './../components/home/Header';
import SmoothScrollOverlay from '@/components/layout/SmoothScrollLayout/SmoothScrollLayout';
import IntroAnimationLayout from '@/components/layout/IntroAnimationLayout/IntroAnimationLayout';
import Navbar from '@/components/layout/Navbar/Navbar';
import Button from '@/components/ui/Button/Button';

import styles from './page.module.scss';

export default function Home() {
    return (
        <IntroAnimationLayout disable={true}>
            <Navbar />
            <SmoothScrollOverlay>
                <Header />
                <main className={styles.main}>
                    <AppearingParagraph text={'Hello \n paragraph this that \n look at it me'} />

                    <div className={styles.section2}>
                        <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                            <Button href="/images/resume.pdf">
                                VIEW MY RESUME
                            </Button>
                        </div>
                    </div>
                </main>
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
