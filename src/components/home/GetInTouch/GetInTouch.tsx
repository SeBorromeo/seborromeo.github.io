import { CONTACT_EMAIL } from '@/constants/constants';
import Socials from '@/components/ui/Socials/Socials';

import styles from './GetInTouch.module.scss';

const GetInTouch = () => {
    return (
        <section id="contact" className={styles.get_in_touch}>
            <div className={styles.card}>
                <h3>Get in touch</h3>
                <p className={styles.get_in_touch_text}>
                    I&apos;m eager to join a collaborative team where I can contribute my skills and learn from others. If you have an exciting project, let&apos;s discuss how I can be a valuable asset. I&apos;m actively seeking a new opportunity to apply my skills and continue growing!
                </p>

                <Socials />

                <div className={styles.contact_info}>
                    <p className={styles.city}>Chantilly, VA</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>{CONTACT_EMAIL}</a>
                </div>
            </div>
        </section>
    );
};

export default GetInTouch;