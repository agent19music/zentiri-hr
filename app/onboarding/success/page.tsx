"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Sparkles, ArrowRight, ExternalLink, Copy, Check } from "lucide-react"
import { toast } from "sonner"

interface OnboardingSuccessData {
  organization: {
    id: string
    name: string
    subdomain: string
    adminEmail: string
    plan: string
  }
  adminUserId: string
  trialEndsAt?: string
  dashboardUrl: string
}

export default function OnboardingSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [successData, setSuccessData] = useState<OnboardingSuccessData | null>(null)
  const [paymentVerified, setPaymentVerified] = useState<boolean | null>(null)
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)

  useEffect(() => {
    const initializeSuccess = async () => {
      // Check if this is a payment callback
      const orderTrackingId = searchParams?.get('OrderTrackingId')
      const merchantReference = searchParams?.get('MerchantReference')
      
      if (orderTrackingId) {
        // This is a payment callback, verify payment and create organization
        await handlePaymentCallback(orderTrackingId, merchantReference)
      } else {
        // This is a direct success page (free plan), load success data
        const storedData = localStorage.getItem('onboardingSuccess')
        if (storedData) {
          setSuccessData(JSON.parse(storedData))
        } else {
          // No success data, redirect to onboarding
          router.push('/onboarding/organization')
        }
      }
    }

    initializeSuccess()
  }, [searchParams, router])

  const handlePaymentCallback = async (orderTrackingId: string, merchantReference: string | null) => {
    setIsVerifyingPayment(true)
    try {
      // Verify payment with backend
      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderTrackingId,
          merchantReference
        })
      })

      const verifyResult = await verifyResponse.json()

      if (verifyResult.success && verifyResult.verified) {
        setPaymentVerified(true)
        
        // Get stored payment info
        const paymentInfo = localStorage.getItem('paymentInfo')
        if (paymentInfo) {
          const { plan, organization } = JSON.parse(paymentInfo)
          
          // Create organization with verified payment
          const createResponse = await fetch('/api/organization/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              organization,
              plan,
              paymentVerified: true,
              paymentReference: orderTrackingId
            })
          })

          const createResult = await createResponse.json()

          if (createResult.success) {
            // Clear stored data
            localStorage.removeItem('organizationData')
            localStorage.removeItem('paymentInfo')
            
            // Set success data
            const successInfo: OnboardingSuccessData = {
              organization: createResult.organization,
              adminUserId: createResult.admin_user_id,
              trialEndsAt: createResult.trial_ends_at,
              dashboardUrl: createResult.dashboardUrl
            }
            
            setSuccessData(successInfo)
            localStorage.setItem('onboardingSuccess', JSON.stringify(successInfo))
          } else {
            throw new Error(createResult.error || 'Failed to create organization')
          }
        }
      } else {
        setPaymentVerified(false)
        throw new Error('Payment verification failed')
      }
    } catch (error) {
      console.error('Payment callback error:', error)
      setPaymentVerified(false)
      // Could show error message or redirect to plans page
    } finally {
      setIsVerifyingPayment(false)
    }
  }

  const copyDashboardUrl = async () => {
    if (successData?.dashboardUrl) {
      await navigator.clipboard.writeText(successData.dashboardUrl)
      setCopiedUrl(true)
      setTimeout(() => setCopiedUrl(false), 2000)
    }
  }

  const handleContinueToDashboard = () => {
    if (successData?.dashboardUrl) {
      window.open(successData.dashboardUrl, '_blank')
    }
  }

  // Loading state for payment verification
  if (isVerifyingPayment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Verifying Payment</h3>
            <p className="text-muted-foreground">Please wait while we verify your payment and set up your organization...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Payment failed state
  if (paymentVerified === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-xl">✗</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Payment Verification Failed</h3>
            <p className="text-muted-foreground mb-6">We couldn't verify your payment. Please try again or contact support.</p>
            <div className="space-y-2">
              <Button onClick={() => router.push('/onboarding/plans')} className="w-full">
                Try Again
              </Button>
              <Button variant="ghost" onClick={() => router.push('/')} className="w-full">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!successData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
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

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Zentiri HR!</h1>
          <p className="text-lg text-muted-foreground">
            Your organization has been successfully set up
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Organization Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Organization Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Organization Name</label>
                <p className="text-lg font-semibold">{successData.organization.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Plan</label>
                <p className="text-lg font-semibold capitalize">{successData.organization.plan}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Admin Email</label>
                <p className="text-lg">{successData.organization.adminEmail}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Dashboard URL</label>
                <div className="flex items-center space-x-2">
                  <p className="text-sm bg-muted p-2 rounded flex-1 font-mono">
                    {successData.dashboardUrl}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyDashboardUrl}
                    className="shrink-0"
                  >
                    {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {successData.trialEndsAt && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Trial Ends</label>
                  <p className="text-lg">{new Date(successData.trialEndsAt).toLocaleDateString()}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Get started with your HR management platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                  <div>
                    <p className="font-medium">Access Your Dashboard</p>
                    <p className="text-sm text-muted-foreground">Log in to start setting up your organization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                  <div>
                    <p className="font-medium">Complete Your Profile</p>
                    <p className="text-sm text-muted-foreground">Add your company information and preferences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                  <div>
                    <p className="font-medium">Invite Your Team</p>
                    <p className="text-sm text-muted-foreground">Start adding employees and set up departments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">4</div>
                  <div>
                    <p className="font-medium">Configure HR Workflows</p>
                    <p className="text-sm text-muted-foreground">Set up leave policies, payroll, and other HR processes</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button onClick={handleContinueToDashboard} className="w-full" size="lg">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Dashboard
                </Button>
                <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        <div className="text-center mt-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 Congratulations!</h3>
            <p className="text-green-700">
              Your Zentiri HR organization is ready to use. We're excited to help you transform your HR operations!
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 