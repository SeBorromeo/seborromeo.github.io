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

                <MaskedTextReveal>
                    <BioParagraph />
                </MaskedTextReveal>

                <MaskedTextReveal >

                <p>
                    I am a fourth-year student at The University of Virginia pursuing a Bachelor of Science in Computer Science and Data Science. My passion lies in creating innovative software solutions that address real-world challenges. I have experience working with a variety of programming languages and frameworks, and I am always eager to learn new technologies.
                </p>
            
                </MaskedTextReveal>

                <MaskedTextReveal >
                <p>
                    Throughout my academic journey, I have had the opportunity to work on several projects that have honed my skills in software development, data analysis, and machine learning. I enjoy collaborating with others and believe that teamwork is essential for success in any project.
                </p>
                </MaskedTextReveal>

                <MaskedTextReveal>
                <p>
                    In addition to my technical skills, I am also a strong communicator and enjoy sharing my knowledge with others. I am excited to continue learning and growing as a developer, and I look forward to the opportunities that lie ahead.
                </p>
                </MaskedTextReveal>
            </div>
            <div className={styles.photo_column}>
                <ParallaxImage isVideo={true} src={`${AWS_BUCKET_URL}/videos/dayonthelawn.mp4`} alt='Photo of Sebastian'/>
            </div>
        </section>
    );
};

