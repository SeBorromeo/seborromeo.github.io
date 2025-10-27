'use server';

import { LoginFormSchema, FormState } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import * as z from 'zod'

export async function login(state: FormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    
    if (!validatedFields.success) {
        return {
            errors: z.flattenError(validatedFields.error).fieldErrors,
        }
    }

    const { email, password } = validatedFields.data;

    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
        return { errors: { email: ["User with this email could not be found"] } }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        return { errors: { password: ["User with this email could not be found"] }}
    }

    await createSession(user.id)
    redirect('/admin/dashboard')
}
