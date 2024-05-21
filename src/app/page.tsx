'use client'

import AppearingText from "@/components/ui/AppearingText";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <AppearingText text="Hi, I'm Sebastian"/>
      <p>Computer Science Student at The University of Virginia</p>
    </main>
  );
}
