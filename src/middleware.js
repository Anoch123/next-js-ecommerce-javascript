import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname
  
    const isPublic = path === '/login' || path === '/register'

    const token = request.cookies.get('token')?.value || '';
    
    if(isPublic && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if(!isPublic && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/admin',
    '/profile'
  ],
}