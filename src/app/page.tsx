'use client'

import Navbar from "@/components/layout/Navbar";
import AppearingText from "@/components/ui/AppearingText";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Navbar/>
      <main className={styles.main}>
        <div className={styles.section1}>
          <div className={styles.name_container}>
            <AppearingText text="Hi, I'm Sebastian!" className={styles.name}/>
            <h2 className={styles.title}>COMPUTER SCIENCE STUDENT AT THE UNIVERSITY OF VIRGINIA</h2>
            <h3 className={styles.bio}>Aspiring Software Engineer familiar in HTML, CSS, SASS, JavaScript, TypeScript, React, Nextjs, PHP, SQL, and RESTful APIs.</h3>
            <a href="/images/resume.pdf" className={styles.resume_button}>VIEW MY RESUME</a>
          </div>
          <div className={styles.photo_container}>

          </div>
        </div>
        <div className={styles.section2}>

        </div>
      </main>
    </>
  );
}
