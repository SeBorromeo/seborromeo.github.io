export const dynamic = "force-dynamic";

import { JSONContent } from '@tiptap/react'
import { prisma } from "@/lib/prisma";
import ProjectsEditor from "./_components/ProjectsEditor/ProjectsEditor";
import Bio from "@/components/home/Bio/Bio";
import Header from "@/components/home/Header/Header";
import IntroAnimationLayout from "@/components/layout/IntroAnimationLayout/IntroAnimationLayout";
import Navbar from "@/components/layout/Navbar/Navbar";
import SmoothScrollOverlay from "@/components/layout/SmoothScrollLayout/SmoothScrollLayout";

import styles from './dashboard.module.scss';

export default async function DashboardPage() {
    const bio = await prisma.bio.findFirst({
        select: { tiptapcontent: true },
    });

    const content: JSONContent = bio?.tiptapcontent as JSONContent || { type: 'doc', content: [] };

    return (
        <IntroAnimationLayout disable={true}>
            <Navbar />
            <SmoothScrollOverlay>
                <Header />
                <main className={`${styles.main} dark`}>
                    <Bio admin={true} />
                    <ProjectsEditor />
                </main>
            </SmoothScrollOverlay>
        </IntroAnimationLayout>
    );
}
