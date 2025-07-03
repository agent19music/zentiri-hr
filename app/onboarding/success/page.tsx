"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Mail, ExternalLink, ArrowRight, Copy, Users, Globe } from "lucide-react"
import { toast } from "sonner"

interface OrganizationResult {
  success: boolean
  organization: {
    name: string
    subdomain: string
    adminEmail: string
    plan: string
  }
  credentials: {
    email: string
    temporaryPassword: string
  }
  dashboardUrl: string
}

export default function OnboardingSuccess() {
  const router = useRouter()
  const [result, setResult] = useState<OrganizationResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get result from localStorage or URL params
    const storedResult = localStorage.getItem('onboardingResult')
    
    if (storedResult) {
      setResult(JSON.parse(storedResult))
      setIsLoading(false)
    } else {
      // Check URL params for payment callback
      const urlParams = new URLSearchParams(window.location.search)
      const paymentId = urlParams.get('payment_id')
      const status = urlParams.get('status')
      
      if (paymentId && status === 'success') {
        // Verify payment and create organization
        verifyPaymentAndCreateOrganization(paymentId)
      } else {
        // No valid data, redirect to start
        router.push('/onboarding/organization')
      }
    }
  }, [router])

  const verifyPaymentAndCreateOrganization = async (paymentId: string) => {
    try {
      const paymentData = localStorage.getItem('paymentData')
      if (!paymentData) {
        throw new Error('Payment data not found')
      }

      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId,
          paymentData: JSON.parse(paymentData)
        }),
      })

      const verificationResult = await response.json()
      
      if (verificationResult.success) {
        // Payment verified, create organization
        const orgResponse = await fetch('/api/organization/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organization: verificationResult.organization,
            plan: verificationResult.plan,
            paymentVerified: true,
            paymentId
          }),
        })

        const orgResult = await orgResponse.json()
        
        if (orgResult.success) {
          setResult(orgResult)
          localStorage.setItem('onboardingResult', JSON.stringify(orgResult))
          // Clean up temporary data
          localStorage.removeItem('paymentData')
          localStorage.removeItem('organizationData')
        } else {
          throw new Error(orgResult.error || 'Failed to create organization')
        }
      } else {
        throw new Error(verificationResult.error || 'Payment verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Failed to verify payment. Please contact support.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard!`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Setting up your organization...</p>
        </div>
      </div>
    )
  }

  if (!result || !result.success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <div className="text-red-500 mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                ✗
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Setup Failed</h2>
            <p className="text-muted-foreground mb-6">
              We encountered an issue setting up your organization. Please try again or contact support.
            </p>
            <Button onClick={() => router.push('/onboarding/organization')}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <img 
              src="/zentiri-logo.png" 
              alt="Zentiri HR Logo" 
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-xl font-bold">Zentiri HR</span>
          </div>
          <Badge variant="default" className="px-3 py-1 bg-green-600 text-white">
            <CheckCircle className="h-4 w-4 mr-2" />
            Setup Complete
          </Badge>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-12">
        {/* Success Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Zentiri HR!</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your organization <span className="font-semibold text-foreground">{result.organization.name}</span> has been successfully set up.
          </p>
          <p className="text-lg text-muted-foreground">
            You're now ready to transform your HR operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Organization Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Organization Details</CardTitle>
              </div>
              <CardDescription>
                Your organization is now live and accessible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Organization</p>
                    <p className="font-medium">{result.organization.name}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Your URL</p>
                    <p className="font-medium text-primary">{result.organization.subdomain}.zentiri.app</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(`${result.organization.subdomain}.zentiri.app`, 'URL')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-medium capitalize">{result.organization.plan}</p>
                  </div>
                  <Badge variant="secondary">{result.organization.plan}</Badge>
                </div>
              </div>

              <Button 
                className="w-full mt-6"
                onClick={() => window.open(result.dashboardUrl, '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Access Your Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Login Credentials */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Admin Access</CardTitle>
              </div>
              <CardDescription>
                Your administrator login credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{result.credentials.email}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(result.credentials.email, 'Email')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Temporary Password</p>
                    <p className="font-mono text-sm bg-background p-2 rounded border">
                      {result.credentials.temporaryPassword}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(result.credentials.temporaryPassword, 'Password')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Credentials Sent</p>
                    <p className="text-sm text-blue-700">
                      We've also sent these credentials to {result.organization.adminEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Please change your password after your first login for security.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Get started with these recommended actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Login & Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Access your dashboard and complete your profile setup
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Add Employees</h3>
                <p className="text-sm text-muted-foreground">
                  Import or manually add your team members to the system
                </p>
              </div>

              <div className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Configure Policies</h3>
                <p className="text-sm text-muted-foreground">
                  Set up leave policies, workflows, and organizational structure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <div className="text-center mt-12">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            Our team is here to help you get the most out of Zentiri HR
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 