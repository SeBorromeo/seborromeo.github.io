export const dynamic = "force-dynamic";

import Tiptap from "@/components/editors/Tiptap";
import { JSONContent } from '@tiptap/react'
import { prisma } from "@/lib/prisma";
import { updateBio } from "@/app/actions/bio";
import FadeInDiv from "@/components/ui/animations/FadeInDiv/FadeInDiv";

import styles from '../../dashboard.module.scss';

export default async function BioEditor() {
    const bio = await prisma.bio.findFirst({
        select: { tiptapcontent: true },
    });

    const content: JSONContent = bio?.tiptapcontent as JSONContent || { type: 'doc', content: [] };

    return (
        <FadeInDiv>
            <Tiptap initialContent={content} onSave={updateBio} className={styles.bio_editor}/>
            <div className="bio-text"/>
        </FadeInDiv>
    );
}
