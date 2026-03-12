import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
            auth: {
                persistSession: false,
            },
        }
    )
}
