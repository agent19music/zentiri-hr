"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check, Crown, Star, Zap, Shield, Users, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"

interface OrganizationData {
  name: string
  industry: string
  size: string
  departments: string
  subdomain: string
  adminEmail: string
  adminName: string
  recommendedPlan: string
}

interface PlanFeature {
  name: string
  included: boolean
  limit?: string
}

interface Plan {
  id: string
  name: string
  description: string
  price: number
  period: string
  icon: React.ReactNode
  badge?: string
  popular?: boolean
  recommended?: boolean
  employeeLimit: string
  features: PlanFeature[]
  additionalFeatures?: string[]
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for small teams getting started",
    price: 0,
    period: "forever",
    icon: <Users className="h-6 w-6" />,
    employeeLimit: "Up to 50 employees",
    features: [
      { name: "Employee database", included: true },
      { name: "Basic leave management", included: true },
      { name: "Time tracking", included: true },
      { name: "Basic reporting", included: true },
      { name: "Email support", included: true },
      { name: "Mobile app access", included: true },
      { name: "Advanced analytics", included: false },
      { name: "Custom workflows", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
      { name: "Custom integrations", included: false },
      { name: "Advanced security", included: false }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ideal for growing companies",
    price: 5,
    period: "per employee/month",
    icon: <Zap className="h-6 w-6" />,
    badge: "Most Popular",
    popular: true,
    employeeLimit: "50-200 employees",
    features: [
      { name: "Everything in Free", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom workflows", included: true },
      { name: "Performance management", included: true },
      { name: "API access", included: true },
      { name: "Priority email support", included: true },
      { name: "Payroll integration", included: true },
      { name: "Custom branding", included: true },
      { name: "Advanced security", included: false },
      { name: "Dedicated support", included: false },
      { name: "Custom integrations", included: false },
      { name: "SLA guarantee", included: false }
    ],
    additionalFeatures: [
      "Advanced reporting & analytics",
      "Custom workflow automation",
      "Performance tracking",
      "Payroll integrations"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with complex needs",
    price: 8,
    period: "per employee/month",
    icon: <Crown className="h-6 w-6" />,
    badge: "Best Value",
    employeeLimit: "200+ employees",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Advanced security & compliance", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Custom integrations", included: true },
      { name: "99.9% SLA guarantee", included: true },
      { name: "24/7 phone support", included: true },
      { name: "Custom training", included: true },
      { name: "White-label options", included: true },
      { name: "Advanced audit logs", included: true },
      { name: "Single Sign-On (SSO)", included: true },
      { name: "Custom contracts", included: true },
      { name: "Multi-region deployment", included: true }
    ],
    additionalFeatures: [
      "Enterprise-grade security",
      "Dedicated account manager",
      "Custom integrations & training",
      "24/7 priority support"
    ]
  }
]

export default function PlansOnboarding() {
  const router = useRouter()
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Get organization data from localStorage
    const storedData = localStorage.getItem('organizationData')
    if (storedData) {
      const data = JSON.parse(storedData)
      setOrganizationData(data)
      setSelectedPlan(data.recommendedPlan)
    } else {
      // Redirect back to organization form if no data
      router.push('/onboarding/organization')
    }
  }, [router])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleContinue = async () => {
    if (!selectedPlan || !organizationData) return

    setIsProcessing(true)
    try {
      const selectedPlanData = plans.find(p => p.id === selectedPlan)
      
      if (selectedPlan === 'free') {
        // For free plan, skip payment and go directly to organization creation
        await createOrganization()
      } else {
        // For paid plans, initiate Pesapal payment
        await initiatePesapalPayment(selectedPlanData!)
      }
    } catch (error) {
      console.error('Error processing plan selection:', error)
      setIsProcessing(false)
    }
  }

  const initiatePesapalPayment = async (plan: Plan) => {
    try {
      // Calculate amount based on estimated employees
      const employeeCount = getEstimatedEmployeeCount(organizationData!.size)
      const monthlyAmount = plan.price * employeeCount
      const amount = monthlyAmount * 12 // Annual payment
      
      // Create payment request
      const paymentData = {
        amount: amount,
        currency: 'USD',
        description: `Zentiri HR ${plan.name} Plan - Annual Subscription`,
        organization: organizationData,
        plan: {
          id: plan.id,
          name: plan.name,
          employeeCount,
          monthlyPrice: plan.price,
          annualAmount: amount
        },
        callback_url: `${window.location.origin}/onboarding/success`,
        notification_id: `zentiri_${organizationData!.subdomain}_${Date.now()}`
      }

      // Call backend API to create Pesapal payment
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()
      
      if (result.success) {
        // Store payment data for later verification
        localStorage.setItem('paymentData', JSON.stringify(paymentData))
        
        // Redirect to Pesapal payment page
        window.location.href = result.payment_url
      } else {
        throw new Error(result.error || 'Failed to create payment')
      }
    } catch (error) {
      console.error('Payment initiation error:', error)
      alert('Failed to initiate payment. Please try again.')
      setIsProcessing(false)
    }
  }

  const createOrganization = async () => {
    try {
      const selectedPlanData = plans.find(p => p.id === selectedPlan)
      
      // Create organization and subdomain
      const response = await fetch('/api/organization/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organization: organizationData,
          plan: {
            id: selectedPlan,
            name: selectedPlanData!.name,
            price: selectedPlanData!.price
          }
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        // Clear stored data
        localStorage.removeItem('organizationData')
        
        // Redirect to success page
        router.push('/onboarding/success')
      } else {
        throw new Error(result.error || 'Failed to create organization')
      }
    } catch (error) {
      console.error('Organization creation error:', error)
      alert('Failed to create organization. Please try again.')
      setIsProcessing(false)
    }
  }

  const getEstimatedEmployeeCount = (sizeRange: string): number => {
    const sizeMap: { [key: string]: number } = {
      "1-10": 5,
      "11-50": 30,
      "51-200": 125,
      "201-500": 350,
      "501-1000": 750,
      "1000+": 1000
    }
    return sizeMap[sizeRange] || 30
  }

  const getRecommendedPlan = () => {
    return plans.find(p => p.id === organizationData?.recommendedPlan)
  }

  if (!organizationData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const recommendedPlan = getRecommendedPlan()

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
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="px-3 py-1">Step 2 of 2</Badge>
            <Button variant="ghost" onClick={() => router.push("/onboarding/organization")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose your plan</h1>
          <p className="text-lg text-muted-foreground mb-4">
            Select the perfect plan for {organizationData.name}
          </p>
          
          {recommendedPlan && (
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 mr-2" />
              We recommend the {recommendedPlan.name} plan for your {organizationData.size} team
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id
            const isRecommended = plan.id === organizationData.recommendedPlan
            
            return (
              <Card 
                key={plan.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? "ring-2 ring-primary shadow-xl scale-105" 
                    : "hover:shadow-lg hover:scale-102"
                } ${isRecommended ? "border-primary/50" : ""}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Badges */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {plan.badge && (
                    <Badge className={`px-3 py-1 text-xs font-medium ${
                      plan.popular ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>
                      {plan.badge}
                    </Badge>
                  )}
                  {isRecommended && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 text-xs font-medium">
                      <Star className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                </div>

                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-3 rounded-full w-fit mb-4 ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  
                  {/* Pricing */}
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground ml-2">
                        {plan.period === "forever" ? "forever" : "/employee/month"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{plan.employeeLimit}</p>
                    
                    {plan.price > 0 && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                        <p>Estimated cost for {organizationData.size}:</p>
                        <p className="font-semibold">
                          ${(plan.price * getEstimatedEmployeeCount(organizationData.size)).toLocaleString()}/month
                        </p>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Features */}
                  {plan.additionalFeatures && (
                    <div className="space-y-2 mb-4">
                      {plan.additionalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  {/* All Features */}
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 mt-0.5 flex-shrink-0 opacity-30">✗</div>
                        )}
                        <span className={`text-sm ${!feature.included ? "text-muted-foreground" : ""}`}>
                          {feature.name}
                          {feature.limit && (
                            <span className="text-xs text-muted-foreground ml-1">
                              ({feature.limit})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full mt-6 ${
                      isSelected 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background border border-border hover:bg-primary hover:text-primary-foreground"
                    }`}
                    variant={isSelected ? "default" : "outline"}
                  >
                    {isSelected ? "Selected" : "Select Plan"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Button */}
        {selectedPlan && (
          <div className="text-center">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={isProcessing}
              className="px-12 py-4 h-14 text-lg font-medium"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Processing...
                </>
              ) : selectedPlan === 'free' ? (
                <>
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            {selectedPlan !== 'free' && (
              <p className="text-sm text-muted-foreground mt-4">
                You'll be redirected to our secure payment processor (Pesapal)
              </p>
            )}
          </div>
        )}

        {/* Security & Trust */}
        <div className="text-center mt-12">
          <div className="flex justify-center items-center space-x-6 opacity-60 mb-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">256-bit SSL</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span className="text-sm">PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span className="text-sm">Money-back Guarantee</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            All plans include a 30-day money-back guarantee. No setup fees.
          </p>
        </div>
      </main>
    </div>
  )
} 