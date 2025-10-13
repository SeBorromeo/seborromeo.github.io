import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.name}>Sebastian Borromeo</p>
            <p className={styles.caption}>Designed in Figma, Built with Next.js, SASS, and deployed with Vercel</p>
        </footer>
    );
};

export default Footer;