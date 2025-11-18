'use server';

import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/session';
import { JSONContent } from '@tiptap/react';
import { revalidatePath } from 'next/cache';

export async function updateBio(tiptapcontent: JSONContent) {
    const { error, shouldRedirect } = await requireAuth()
    if (error) return { 
        error,
        shouldRedirect,
        message: "Unauthorized"
    }

    await prisma.bio.updateMany({
        data: { tiptapcontent },
    });

    revalidatePath("/");

    return { success: true };
}
