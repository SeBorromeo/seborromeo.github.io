export const dynamic = "force-dynamic";

import ProjectsEditor from "./_components/ProjectsEditor/ProjectsEditor";
import Bio from "@/components/home/Bio/Bio";
import Header from "@/components/home/Header/Header";
import IntroAnimationLayout from "@/components/layout/IntroAnimationLayout/IntroAnimationLayout";
import Navbar from "@/components/layout/Navbar/Navbar";
import SmoothScrollLayout from "@/components/layout/SmoothScrollLayout/SmoothScrollLayout";
import ModalProvider from "@/components/layout/ModalProvider/Modal";

import styles from './dashboard.module.scss';

export default async function DashboardPage() {

    return (
        <IntroAnimationLayout disable={true}>
            <Navbar />
            <SmoothScrollLayout>
                <ModalProvider>
                    <Header />
                    <main className={`${styles.main} dark`}>
                        <Bio admin={true} />
                        <ProjectsEditor />
                    </main>
                </ModalProvider>
            </SmoothScrollLayout>
        </IntroAnimationLayout>
    );
}
