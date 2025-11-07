import FadeInDiv from "@/components/ui/animations/FadeInDiv/FadeInDiv";
import { JSONContent } from '@tiptap/react'
import { prisma } from "@/lib/prisma"
import { RichTextNode } from "@/types/richText";
import { jsonToHTML } from "@/lib/tiptap";

export type Paragraph = RichTextNode[];

export type Bio = {
    id: string;
    paragraphs: Paragraph[];
    createdAt: Date;
    updatedAt: Date;
};
 
export default async function BioParagraph() {
    const bio = await prisma.bio.findFirst({
        select: { tiptapcontent: true },
    });
    
    const content: JSONContent = bio?.tiptapcontent as JSONContent || { type: 'doc', content: [] };
    const html = jsonToHTML(content);
    
    return (
        <FadeInDiv>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <div className="bio-text"/>
        </FadeInDiv>
    );
}