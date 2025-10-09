import BioParagraph from './BioParagraph/BioParagraph';
import MaskedTextReveal from '@/components/ui/animations/MaskedTextReveal/MaskedTextReveal';
import ParallaxImage from '@/components/ui/animations/ParallaxImage/ParallaxImage';
import { AWS_BUCKET_URL } from '@/constants/constants';

import styles from './Bio.module.scss';

export default function Bio() {
    return (
        <section className={styles.section}>
            <div className={styles.text_column}>
                <div className={styles.heading_container}>
                <MaskedTextReveal startPercent={75}>
                    <div className="bio-text"/>
                    <h2>ABOUT ME</h2>
                </MaskedTextReveal>
                </div>

                <BioParagraph />
            </div>
            <div className={styles.photo_column}>
                <ParallaxImage isVideo={true} src={`${AWS_BUCKET_URL}/videos/dayonthelawn.mp4`} alt='Photo of Sebastian'/>
            </div>
        </section>
    );
};

