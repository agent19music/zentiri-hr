"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { hasEmployerAccess } from '@/lib/auth'

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireEmployerAccess?: boolean
}

export function RouteGuard({ 
  children, 
  requireAuth = false,
  requireEmployerAccess = false 
}: RouteGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't redirect during loading or if on auth pages
    if (isLoading || pathname.startsWith('/auth/')) {
      return
    }

    // If auth required but user not logged in
    if (requireAuth && !user) {
      router.push('/auth/login')
      return
    }

    // If user is logged in but on auth pages, redirect to dashboard
    if (user && pathname.startsWith('/auth/')) {
      const dashboardRoute = hasEmployerAccess(user) ? '/employer/dashboard' : '/employee/dashboard'
      router.push(dashboardRoute)
      return
    }

    // If employer access required but user doesn't have it
    if (requireEmployerAccess && user && !hasEmployerAccess(user)) {
      router.push('/employee/dashboard')
      return
    }

    // If user has employer access but trying to access employee routes
    if (user && hasEmployerAccess(user) && pathname.startsWith('/employee/')) {
      router.push('/employer/dashboard')
      return
    }

    // If user doesn't have employer access but trying to access employer routes
    if (user && !hasEmployerAccess(user) && pathname.startsWith('/employer/')) {
      router.push('/employee/dashboard')
      return
    }

  }, [user, isLoading, pathname, router, requireAuth, requireEmployerAccess])

  // Show loading during auth check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If auth required but user not logged in, show loading (will redirect)
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // If employer access required but user doesn't have it, show loading (will redirect)
  if (requireEmployerAccess && user && !hasEmployerAccess(user)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 