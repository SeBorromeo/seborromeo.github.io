import 'server-only'

import jwt from "jsonwebtoken";
import { SessionPayload } from '@/lib/definitions'
import { cookies } from 'next/headers';
import { cache } from 'react';
 
export async function encrypt(payload: SessionPayload) {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!, { expiresIn: "1d" }
    );
}
 
export async function decrypt(session: string | undefined = '') {
    try {
        return jwt.verify(session, process.env.JWT_SECRET!) as SessionPayload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
    const session = await encrypt({ userId })
    const cookieStore = await cookies()
    
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)
    
    if (!session || !payload) {
        return null
    }
    
    createSession(payload.userId);
}


export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    
    if (!session?.userId)
        return null
    
    return { isAuth: true, userId: session.userId }
})

export async function requireAuth() {
    const session = await verifySession()
    if (!session) {
        return { error: 'Session expired', shouldRedirect: '/admin/login' }
    }
    return { session }
}