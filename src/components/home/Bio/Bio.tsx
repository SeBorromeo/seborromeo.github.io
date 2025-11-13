import BioParagraph from './BioParagraph/BioParagraph';
import MaskedTextReveal from '@/components/ui/animations/MaskedTextReveal/MaskedTextReveal';
import ParallaxImage from '@/components/ui/animations/ParallaxImage/ParallaxImage';
import { AWS_BUCKET_URL } from '@/constants/constants';
import BioEditor from '@/app/admin/dashboard/_components/BioEditor/BioEditor';

import styles from './Bio.module.scss';

export default function Bio({ admin = false }: { admin?: boolean }) {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.text_column}>
                <div className={styles.heading_container}>
                <MaskedTextReveal startPercent={85}>
                    <div className="bio-text"/>
                    <h2>ABOUT ME</h2>
                </MaskedTextReveal>
                </div>
                { admin ?
                    <BioEditor />
                :
                    <BioParagraph />
                }
            </div>
            <div className={styles.photo_column}>
                <ParallaxImage className={styles.photo_frame} isVideo={true} src={`${AWS_BUCKET_URL}/videos/dayonthelawn.mp4`} alt='Photo of Sebastian'/>
            </div>
        </section>
    );
};

