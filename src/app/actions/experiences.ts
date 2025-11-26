'use server';

import { ModifyExperienceState, UpdateExperienceSchema } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { s3 } from "@/lib/s3";
import { requireAuth } from "@/lib/session";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { refresh, revalidatePath } from "next/cache";
import z from "zod";

export async function createExperience(prevState: ModifyExperienceState, formData: FormData) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };

    
}

export async function deleteExperience(experienceId: string) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };
    
     try {
        const experience = await prisma.experience.findUnique({ where: { id: experienceId } });
        if (!experience) return { success: false, error: "Experience not found" };

        if (experience.logoUrl) {
            const key = experience.logoUrl.split(`https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/`)[1];
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: key,
            }));
        }

        await prisma.experience.delete({ where: { id: experienceId } });

        revalidatePath("/");
        refresh();

        return { success: true, message: "Experience deleted successfully" };
    } catch (err) {
        console.error("Delete failed:", err);
        return { success: false, error: "Delete failed" };
    }
}

export async function updateExperience(prevState: ModifyExperienceState, formData: FormData) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };
    
    const raw = Object.fromEntries(formData.entries());
    const description = formData.getAll("description");
    
    const validatedFields = UpdateExperienceSchema.safeParse({
        ...raw,
        description: description,
        startDate: raw.startDate ? new Date(raw.startDate.toString()) : undefined,
        endDate: raw.endDate ? new Date(raw.endDate.toString()) : undefined,
    });
    
    if (!validatedFields.success) {
        return {
            success: false,
            errors: z.flattenError(validatedFields.error).fieldErrors,
        };
    }

    const data = validatedFields.data;
    const experience = await prisma.experience.findUnique({ where: { id: data.experienceId } });

    if (!experience) {
        return { success: false, error: "Experience not found" };
    }
    
    try {
        let logoUrl = experience?.logoUrl;

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
            if (logoUrl) {
                const oldKey = logoUrl.split(`https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/`)[1];
                await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME!, Key: oldKey }));
            }

            logoUrl = `https://${process.env.AWS_BUCKET_NAME!}.s3.amazonaws.com/${key}`;
        }

        await prisma.experience.update({
            where: { id: data.experienceId },
            data: {
                company: data.company,
                companyUrl: data.companyUrl,
                role: data.role,
                startDate: data.startDate,
                description: data.description,
                skills: data.skills.split(",").map(skill => skill.trim()),
                endDate: data.endDate,
                logoUrl,
            },
        });

        revalidatePath("/");
        refresh();

        return { success: true, message: "Experience updated successfully" };
    } catch (err) {
        console.error("Update failed:", err);
        return { success: false, error: "Update failed" };
    }
}