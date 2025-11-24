'use server';

import { requireAuth } from "@/lib/session";

export async function createExperience(prevState: CreateExperienceState, formData: FormData) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };
}

export async function deleteExperience(experienceId: string) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };
    
}

export async function updateExperience(prevState: UpdateExperienceState, formData: FormData) {
    const { error, shouldRedirect } = await requireAuth();
    if (error) return { error, shouldRedirect, message: "Unauthorized" };
    
}