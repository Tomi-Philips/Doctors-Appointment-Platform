import { createBrowserClient } from '@supabase/ssr'

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

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}
