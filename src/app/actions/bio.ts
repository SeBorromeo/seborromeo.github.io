'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { RichTextNode } from '@/types/richText';

export async function updateBio(paragraphs: RichTextNode[][]) {
    const { session, error } = await requireAuth()
    if (error) return { error }

    await prisma.bio.updateMany({
        data: { paragraphs },
    });
}
