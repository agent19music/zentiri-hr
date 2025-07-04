"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, AuthContextType, mockAuth, getDashboardRoute } from '@/lib/auth'
import { useRouter } from 'next/navigation'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = mockAuth.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true)
      const result = await mockAuth.login(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
        mockAuth.setCurrentUser(result.user)
        
        // Redirect to appropriate dashboard
        const dashboardRoute = getDashboardRoute(result.user)
        router.push(dashboardRoute)
        
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    mockAuth.logout()
    router.push('/auth/login')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext 