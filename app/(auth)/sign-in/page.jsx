'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const [supabase, setSupabase] = useState(null)
    const router = useRouter()
    const [origin, setOrigin] = useState('')

    useEffect(() => {
        // Create client only on the browser to avoid SSR localStorage errors
        const client = createClient()
        setSupabase(client)
        setOrigin(window.location.origin)

        const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                router.push('/')
                router.refresh()
            }
        })

        return () => subscription.unsubscribe()
    }, [router])

    if (!supabase) return null

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 space-y-4 border rounded-xl shadow-lg bg-card">
                <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
                <p className="text-muted-foreground text-center">Sign in to your Medimeet account</p>

                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={['google']}
                    redirectTo={`${origin}/auth/callback`}
                />
            </div>
        </div>
    )
}
