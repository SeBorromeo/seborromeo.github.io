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
    let key: string | null = null;
    if (data.image && data.image.size > 0) {
        // Convert file to buffer
        const fileBuffer = Buffer.from(await data.image.arrayBuffer());
        const fileExt = data.image.name.split(".").pop();
        key = `images/${Date.now()}.${fileExt}`;

        try {
            await s3.send(
                new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
                Body: fileBuffer,
                ContentType: data.image.type,
                ACL: "public-read",
                })
            );
        } catch (uploadErr) {
            console.error("S3 upload failed:", uploadErr);
            return { success: false, error: "Image upload failed." };
        }
    }

    try {
        await prisma.projects.create({
            data: {
                name: data.name,
                slug: data.slug,
                demoUrl: data.demoUrl || null,
                repoUrl: data.repoUrl,
                description: data.description,
                publishedAt: data.publishedAt || null,
                tags: data.tags.split(",").map(tag => tag.trim()),
                imageUrl: key
                    ? `https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/${key}`
                    : null,
                order: 7,
            },
        });

        revalidatePath("/");
        revalidatePath("/projects");
        refresh();
        return { success: true, message: "Project created successfully" };
    } catch (error: any) {
        console.error("Upload failed:", error);

        // SLUG DUPLICATE ERROR (Prisma P2002)
        if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
            if (key) {    
                try {
                    await s3.send(
                            new DeleteObjectCommand({
                            Bucket: process.env.AWS_BUCKET_NAME!,
                            Key: key,
                        })
                    );
                } catch (rollbackError) {
                    console.error("Rollback (delete S3 file) failed:", rollbackError);
                }
            }

            return {
                success: false,
                errors: { slug: "That slug is already taken." },
            };
        }

        // Every other error
        if (key) {
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

export async function updateProject(prevState: UpdateProjectState, formData: FormData) {
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

    const data = validatedFields.data;
    const project = await prisma.projects.findUnique({ where: { id: data.projectId } });

    if (!project) {
        return { success: false, error: "Project not found" };
    }

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
            where: { id: data.projectId },
            data: {
                name: data.name,
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
