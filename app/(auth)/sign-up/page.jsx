'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
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
                router.push('/onboarding')
                router.refresh()
            }
        })

        return () => subscription.unsubscribe()
    }, [router])

    if (!supabase) return null

    return (
        <div className="flex justify-center items-center min-h-screen bg-background">
            <div className="w-full max-w-md p-8 space-y-4 border rounded-xl shadow-lg bg-card">
                <h1 className="text-2xl font-bold text-center">Create Account</h1>
                <p className="text-muted-foreground text-center">Join Medimeet to connect with doctors</p>

                <Auth
                    supabaseClient={supabase}
                    view="sign_up"
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={['google']}
                    redirectTo={`${origin}/auth/callback`}
                />
            </div>
        </div>
    )
}
