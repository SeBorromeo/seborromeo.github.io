import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.name}>Sebastian Borromeo</p>
            <p className={styles.caption}>Designed in Figma. Built with Next.js, Prisma, MongoDB, SASS, and GSAP. Deployed with Vercel</p>
        </footer>
    );
};

export default Footer;