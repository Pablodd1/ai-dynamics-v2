import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

interface Profile {
  id: string
  full_name: string | null
  email: string
  phone: string | null
  role: 'client' | 'admin'
  company_name: string | null
  preferred_contact: string
  newsletter_opt_in: boolean
  created_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  isAdmin: boolean
  isLoading: boolean
  signInWithOtp: (email: string, metadata?: Record<string, string>) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAdmin = profile?.role === 'admin' || 
    user?.email?.toLowerCase() === 'jasmelacosta@gmail.com' || 
    user?.email?.toLowerCase() === 'hello@aidynamic.pro'

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('aidynamic_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data as Profile
  }

  const refreshProfile = async () => {
    if (!user) return
    const data = await fetchProfile(user.id)
    if (data) setProfile(data)
  }

  const signInWithOtp = async (email: string, metadata?: Record<string, string>) => {
    const cleanEmail = (email || '').trim().toLowerCase()
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      return { error: new Error('Please enter a valid business or personal email address.') }
    }

    // Block disposable/bot/test domains that trigger Supabase spam complaints
    const blockedDomains = ['mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'example.com', 'test.com', 'localhost']
    const domain = cleanEmail.split('@')[1] || ''
    if (blockedDomains.includes(domain)) {
      return { error: new Error('Disposable or test email addresses are not permitted.') }
    }

    // Client-side rate limit: max 1 OTP request per 120 seconds per browser
    const lastSentRaw = localStorage.getItem('aidynamic_last_otp_ts')
    if (lastSentRaw) {
      const elapsedSec = Math.floor((Date.now() - Number(lastSentRaw)) / 1000)
      if (elapsedSec < 120) {
        return { error: new Error(`Please wait ${120 - elapsedSec} seconds before requesting another magic link.`) }
      }
    }

    // Only allow OTP emails for existing clients/admins unless explicitly signing up with metadata
    const isSignup = Boolean(metadata && Object.keys(metadata).length > 0)
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        shouldCreateUser: isSignup,
        ...(isSignup ? { data: metadata } : {}),
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (!error) {
      localStorage.setItem('aidynamic_last_otp_ts', String(Date.now()))
    }
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const data = await fetchProfile(session.user.id)
        setProfile(data)
      }
      setIsLoading(false)
    }).catch(err => {
      console.warn('Supabase session initialization notice:', err)
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const data = await fetchProfile(session.user.id)
          setProfile(data)
        } else {
          setProfile(null)
        }
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        isLoading,
        signInWithOtp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
