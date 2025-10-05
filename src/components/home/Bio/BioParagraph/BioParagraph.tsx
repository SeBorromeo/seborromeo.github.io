import { prisma } from "@/lib/prisma"
import { RichTextNode } from "@/types/richText";

export type Paragraph = RichTextNode[];

export type Bio = {
    id: string;
    paragraphs: Paragraph[];
    createdAt: Date;
    updatedAt: Date;
};
 
export default async function BioParagraph() {
    const bio = await prisma.bio.findFirst({
        select: { paragraphs: true },
    })

    if (!bio || !Array.isArray(bio.paragraphs)) {
        return <p>No bio available.</p>
    }

    const paragraphs: Paragraph[] = bio.paragraphs as Paragraph[]

    return (
        <div>
            {paragraphs.map((para: any[], idx: number) => (
                <p key={idx}>
                {para.map((node, i) => {
                    switch (node.type) {
                        case 'bold':
                            return <strong key={i}>{node.text}</strong>
                        case 'italic':
                            return <em key={i}>{node.text}</em>
                        case 'link':
                            return (
                            <a key={i} href={node.url} target="_blank" rel="noopener noreferrer">
                                {node.text}
                            </a>
                            )
                        default:
                            return <span key={i}>{node.text}</span>
                    }
                })}
                </p>
            ))}
        </div>
    );
}