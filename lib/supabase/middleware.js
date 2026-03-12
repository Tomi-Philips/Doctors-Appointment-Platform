import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Polyfill localStorage for server-side environments to prevent "localStorage.getItem is not a function" errors
if (typeof window === 'undefined') {
    if (!globalThis.localStorage || typeof globalThis.localStorage.getItem !== 'function') {
        globalThis.localStorage = {
            getItem: () => null,
            setItem: () => null,
            removeItem: () => null,
            clear: () => null,
            key: () => null,
            length: 0
        };
    }
}

export async function updateSession(request) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
            auth: {
                persistSession: false,
            },
        }
    )

    // IMPORTANT: Do not remove getUser(). This is required for the session to persist.
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return { supabase, user, supabaseResponse }
}
