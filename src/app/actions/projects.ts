"use server";

import { CreateProjectSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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

    // Convert file to buffer
    const fileBuffer = Buffer.from(await data.image.arrayBuffer());
    const fileExt = data.image.name.split(".").pop();
    const key = `projects/${Date.now()}.${fileExt}`;

    try {
        await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
                Body: fileBuffer,
                ContentType: data.image.type,
                ACL: "public-read", // optional for public URL
            })
        );

        await prisma.projects.create({
            data: {
                name: data.name,
                slug: data.slug,
                demoUrl: data.demoUrl || null,
                repoUrl: data.repoUrl,
                description: data.description,
                tags: data.tags.split(",").map(tag => tag.trim()),
                imageUrl: `https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/${key}`,
                order: 0,
            },
        });

        revalidatePath("/");
        revalidatePath("/projects");

        return { success: true };
    } catch (rollbackError) {
      try {
        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
            })
        );
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError);
        }
    }

    return { success: false, error: "Upload or database save failed" };
}
