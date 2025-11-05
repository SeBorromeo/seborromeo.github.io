import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'
import { cookies } from 'next/headers'

export const config = {
    matcher: ['/admin/:path*'],
}

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname
    
    // 3. Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    const isAuthenticated = !!session?.userId

    // 4. Redirect to /login if the user is not authenticated
    if ((path === '/admin/login' || path === '/admin') && isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl))
    }
    
    // If NOT on login page and NOT authenticated → go to login
    if (path !== '/admin/login' && !isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
    }
 
    return NextResponse.next()
}
 