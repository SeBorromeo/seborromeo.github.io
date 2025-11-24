export const dynamic = "force-dynamic";

import ProjectsEditor from "./_components/ProjectsEditor/ProjectsEditor";
import Bio from "@/components/home/Bio/Bio";
import Header from "@/components/home/Header/Header";
import IntroAnimationLayout from "@/components/layout/IntroAnimationLayout/IntroAnimationLayout";
import Navbar from "@/components/layout/Navbar/Navbar";
import SmoothScrollLayout from "@/components/layout/SmoothScrollLayout/SmoothScrollLayout";
import ModalProvider from "@/components/layout/ModalProvider/Modal";
import Projects from "@/components/home/Projects/Projects";
import Experience from '@/components/home/Experience/Experience';

import styles from './dashboard.module.scss';

export default async function DashboardPage() {

    return (
        <IntroAnimationLayout disable={true}>
            <div className={styles.admin_banner}>EDITABLE ADMIN DASHBOARD - ALL CHANGES WILL BE IMMEDIATELY REFLECTED ON THE MAIN PAGE</div>
            <Navbar />
            <SmoothScrollLayout>
                <ModalProvider>
                    <Header />
                    <main className={`${styles.main} dark`}>
                        <Bio admin={true} />
                        <Experience admin={true} />
                        <Projects admin={true} />
                    </main>
                </ModalProvider>
            </SmoothScrollLayout>
        </IntroAnimationLayout>
    );
}
