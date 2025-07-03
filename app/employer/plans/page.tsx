"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Check, 
  ArrowRight, 
  Star,
  Crown,
  CheckCircle,
  Building2
} from "lucide-react"

const allPlans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    memberLimit: 20,
    icon: Users,
    iconColor: "text-green-500",
    badgeText: "Most Popular",
    badgeVariant: "secondary" as const,
    eligibleSizes: ["small"],
    features: [
      "Up to 20 employees",
      "Basic employee management",
      "Leave tracking",
      "Basic reporting",
      "Email support",
      "Standard integrations"
    ]
  },
  {
    id: "pro", 
    name: "Pro",
    price: "$15",
    period: "per employee/month",
    memberLimit: 200,
    icon: Star,
    iconColor: "text-blue-500",
    badgeText: "Best Value",
    badgeVariant: "default" as const,
    eligibleSizes: ["small", "medium"],
    features: [
      "Up to 200 employees",
      "Advanced analytics",
      "Performance management",
      "Training modules",
      "Priority support",
      "Advanced integrations",
      "Custom workflows",
      "Bulk employee import"
    ]
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "$25",
    period: "per employee/month", 
    memberLimit: 500,
    icon: Crown,
    iconColor: "text-purple-500",
    badgeText: "Enterprise",
    badgeVariant: "outline" as const,
    eligibleSizes: ["medium", "large", "enterprise"],
    features: [
      "500+ employees",
      "Enterprise analytics",
      "Advanced security",
      "Custom branding",
      "Dedicated account manager",
      "API access",
      "Custom integrations",
      "White-label solutions",
      "24/7 phone support"
    ]
  }
]

const sizeLabels = {
  small: "1-20 employees",
  medium: "21-200 employees", 
  large: "201-500 employees",
  enterprise: "500+ employees"
}

export default function EmployerPlansPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [organizationData, setOrganizationData] = useState<any>(null)
  const [filteredPlans, setFilteredPlans] = useState(allPlans)

  useEffect(() => {
    // Get organization size from URL params or localStorage
    const sizeFromUrl = searchParams.get('size')
    const storedOrgData = localStorage.getItem('organizationData')
    
    if (storedOrgData) {
      const orgData = JSON.parse(storedOrgData)
      setOrganizationData(orgData)
      
      const organizationSize = sizeFromUrl || orgData.organizationSize
      if (organizationSize) {
        const plans = allPlans.filter(plan => 
          plan.eligibleSizes.includes(organizationSize)
        )
        setFilteredPlans(plans)
      }
    } else if (!sizeFromUrl) {
      // Redirect back to organization setup if no data
      router.push("/employer/organization")
    }
  }, [searchParams, router])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select a plan to continue")
      return
    }
    
    // Store selected plan
    const planData = { selectedPlan }
    localStorage.setItem('planData', JSON.stringify(planData))
    
    // Redirect to employee details form
    router.push("/employer/employee-details")
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
          <Button variant="ghost" onClick={() => router.push("/employer/organization")}>
            Back
          </Button>
        </div>
      </header>

      <main className="container px-4 py-12 md:px-6">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            Choose Your Plan
          </h1>
          {organizationData && (
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-2">
              Plans recommended for <span className="font-medium text-foreground">{organizationData.organizationName}</span>
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Organization size: {sizeLabels[organizationData?.organizationSize as keyof typeof sizeLabels] || "Not specified"}
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-8 lg:grid-cols-3 mb-16 max-w-5xl mx-auto">
          {filteredPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedPlan === plan.id 
                  ? "ring-2 ring-primary shadow-md border-primary/20" 
                  : "border-border/50 hover:border-border"
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.badgeText && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant={plan.badgeVariant} className="px-3 py-1 text-xs font-medium">
                    {plan.badgeText}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className={`w-12 h-12 mx-auto mb-6 rounded-xl bg-background flex items-center justify-center border border-border/50`}>
                  <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
                </div>
                <CardTitle className="text-xl font-semibold mb-2">{plan.name}</CardTitle>
                <div className="space-y-1 mb-4">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">{plan.period}</div>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  Perfect for teams up to <span className="font-medium text-foreground">{plan.memberLimit}</span> employees
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full h-10 font-medium transition-all duration-200 ${
                    selectedPlan === plan.id 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  }`}
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                >
                  {selectedPlan === plan.id ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    "Select Plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedPlan && (
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              onClick={handleContinue}
              className="px-10 py-3 h-12 font-medium transition-all duration-200 hover:shadow-sm"
            >
              Continue to Employee Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* No Plans Available */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Plans Available</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any plans for your organization size.
            </p>
            <Button onClick={() => router.push("/employer/organization")}>
              Update Organization Details
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

