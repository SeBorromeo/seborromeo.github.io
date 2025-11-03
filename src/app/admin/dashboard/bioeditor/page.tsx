import { prisma } from "@/lib/prisma";
import BioEditor from "../components/BioEditor";
import { Paragraph } from "@/components/home/Bio/BioParagraph/BioParagraph";

export default async function BioEditorPage() {
    const bio = await prisma.bio.findFirst({
        select: { paragraphs: true },
    });

    if (!bio || !Array.isArray(bio.paragraphs)) {
        return <p>No bio available. Make one in DB before editing.</p>
    }
    
    const paragraphs: Paragraph[] = bio.paragraphs as Paragraph[];

    return <BioEditor initialParagraphs={paragraphs} />;
}

