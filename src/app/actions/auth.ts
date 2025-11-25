'use server';

import { LoginFormSchema, LoginState } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession, verifySession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import * as z from 'zod'

export async function login(state: LoginState, formData: FormData) {
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
        return { errors: { password: ["Incorrect password"] }}
    }

    await createSession(user.id)
    redirect('/admin/dashboard')
}

export async function logout() {
    await deleteSession()
    redirect('/admin/login')
}

export async function validate() {
    const { isAuth } = await verifySession()
    return isAuth
}