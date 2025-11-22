"use server";

import { CreateProjectSchema, CreateProjectState, UpdateProjectSchema, UpdateProjectState } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { requireAuth } from "@/lib/session";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { refresh, revalidatePath } from "next/cache";
import * as z from 'zod'

export async function createProject(prevState: CreateProjectState, formData: FormData) {
    const { error, shouldRedirect } = await requireAuth()
    if (error) return { error, shouldRedirect, message: "Unauthorized" }

    const raw = Object.fromEntries(formData.entries());
  
    const validatedFields = CreateProjectSchema.safeParse({
        ...raw,
        publishedAt: raw.publishedAt ? new Date(raw.publishedAt.toString()) : undefined,
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
    const key = `images/${Date.now()}.${fileExt}`;

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
                publishedAt: data.publishedAt || null, // TODO: Confirm this works
                tags: data.tags.split(",").map(tag => tag.trim()),
                imageUrl: `https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/${key}`,
                order: 7,
            },
        });

        revalidatePath("/");
        revalidatePath("/projects");
        refresh();

        return { success: true, message: "Project created successfully" };
    } catch (error) {
        console.error("Upload failed:", error);

        try {
            await s3.send(new DeleteObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME!,
                    Key: key,
                })
            );
            return { success: false, error: "Upload failed" };
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError);
            return { success: false, error: "Upload failed" };
        }
    }
}

export async function deleteProject(projectId: string) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };

    try {
        const project = await prisma.projects.findUnique({ where: { id: projectId } });
        if (!project) return { success: false, error: "Project not found" };

        if (project.imageUrl) {
            const key = project.imageUrl.split(`https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/`)[1];
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
            }));
        }

        await prisma.projects.delete({ where: { id: projectId } });

        revalidatePath("/");
        revalidatePath("/projects");
        refresh();

        return { success: true, message: "Project deleted successfully" };
    } catch (err) {
        console.error("Delete failed:", err);
        return { success: false, error: "Delete failed" };
    }
}

export async function updateProject(projectId: string, prevState: UpdateProjectState, formData: FormData) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };

    const raw = Object.fromEntries(formData.entries());

    const validatedFields = UpdateProjectSchema.safeParse({
        ...raw,
        publishedAt: raw.publishedAt ? new Date(raw.publishedAt.toString()) : undefined,
        tags: raw.tags?.toString(),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const project = await prisma.projects.findUnique({ where: { id: projectId } });
    const data = validatedFields.data;

    try {
        let imageUrl = project?.imageUrl || "";

        // Handle new image upload
        if (data.image) {
            const fileBuffer = Buffer.from(await data.image.arrayBuffer());
            const fileExt = data.image.name.split(".").pop();
            const key = `images/${Date.now()}.${fileExt}`;

            await s3.send(new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
                Body: fileBuffer,
                ContentType: data.image.type,
                ACL: "public-read",
            }));

            // Delete old image
            if (imageUrl) {
                const oldKey = imageUrl.split(`https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/`)[1];
                await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: oldKey }));
            }

            imageUrl = `https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/${key}`;
        }

        await prisma.projects.update({
            where: { id: projectId },
            data: {
                name: data.name,
                slug: data.slug,
                demoUrl: data.demoUrl || null,
                repoUrl: data.repoUrl,
                description: data.description,
                publishedAt: data.publishedAt || null,
                tags: data.tags?.split(",").map(tag => tag.trim()),
                imageUrl,
            },
        });

        revalidatePath("/");
        revalidatePath("/projects");
        refresh();

        return { success: true, message: "Project updated successfully" };
    } catch (err) {
        console.error("Update failed:", err);
        return { success: false, error: "Update failed" };
    }
}
