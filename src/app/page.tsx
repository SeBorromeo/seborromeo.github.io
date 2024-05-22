'use client'

import AppearingText from "@/components/ui/AppearingText";
import Image from 'next/image';
import section1Gradient from "../../public/images/section1-gradient.svg";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.section1}>
        <AppearingText text="Hi, I'm Sebastian!" className={styles.name}/>
        <h2 className={styles.title}>COMPUTER SCIENCE STUDENT AT THE UNIVERSITY OF VIRGINIA</h2>
        <Image
          priority
          src={section1Gradient}
          alt=""
          className={styles.section1_background}
        />
      </div>
    </main>
  );
}
