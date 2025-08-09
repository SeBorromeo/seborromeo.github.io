import Navbar from "@/components/layout/Navbar";
import AppearingText from "@/components/ui/AppearingText";

import styles from "./page.module.scss";
import Image from "next/image";

export default function Home() {
  const headshotStyle = {
    borderRadius: '5%',
  }

  return (
    <>
      <Navbar/>
      <header className={styles.section1}>
        <div className={styles.name_column}>
          <AppearingText text="Hi, I'm Sebastian!" className={styles.name}/>
          <h2 className={styles.title}>COMPUTER SCIENCE STUDENT AT THE UNIVERSITY OF VIRGINIA</h2>
          <h3 className={styles.bio}>Aspiring Software Engineer familiar in HTML, CSS, SASS, JavaScript, TypeScript, React, Nextjs, PHP, SQL, and RESTful APIs.</h3>
          <a href="/images/resume.pdf" className={styles.resume_button}>VIEW MY RESUME</a>
        </div>
        <div className={styles.photo_column}>
          <div className={styles.photo_container}>
            <Image src="/images/blank-profile-pic.webp" alt="Photo of Sebastian" layout="fill" style={headshotStyle}/>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        
        <div className={styles.section2}>

        </div>
      </main>
    </>
  );
}
