"use server";

import { CreateProjectSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from 'zod'

export async function createProject(formData: FormData) {
    const raw = Object.fromEntries(formData.entries());

    const validatedFields = CreateProjectSchema.safeParse({
        ...raw,
        tags: raw.tags?.toString(),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const data = validatedFields.data;

    await prisma.projects.create({
        data: {
            name: data.name,
            slug: data.slug,
            demoUrl: data.demoUrl || null,
            repoUrl: data.repoUrl,
            description: data.description,
            tags: data.tags.split(",").map(tag => tag.trim()),
            imageUrl: data.imageUrl,
            order: 0,
        },
    });

    revalidatePath("/");
    revalidatePath("/projects");

    return { success: true };
}
