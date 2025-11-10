'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { JSONContent } from '@tiptap/react';
import { triggerRebuild } from './build';

export async function updateBio(tiptapcontent: JSONContent) {
    const { session, error } = await requireAuth()
    if (error) return { error }

    await prisma.bio.updateMany({
        data: { tiptapcontent },
    });

    await triggerRebuild();
}
