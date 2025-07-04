"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Heart,
  Shield,
  Banknote,
  Calendar,
  Briefcase,
  Car,
  Home,
  Dumbbell,
  GraduationCap,
  Baby,
  Eye,
  Stethoscope,
  PiggyBank,
  Gift,
  Coffee,
  Plane,
  CheckCircle,
  Info,
  Clock,
  TrendingUp,
  Users
} from "lucide-react"

// Benefits data
const healthBenefits = [
  {
    id: "medical",
    name: "Medical Insurance",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    coverage: "100% company paid premiums",
    description: "Comprehensive medical coverage including preventive care, specialist visits, and emergency services",
    details: {
      provider: "Blue Cross Blue Shield",
      deductible: "$500 individual / $1,500 family",
      outOfPocketMax: "$2,000 individual / $6,000 family",
      coinsurance: "80/20 after deductible",
      features: [
        "No cost preventive care",
        "Prescription drug coverage", 
        "Telemedicine included",
        "Mental health coverage"
      ]
    },
    monthlyValue: "$650"
  },
  {
    id: "dental",
    name: "Dental Insurance",
    icon: Stethoscope,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    coverage: "100% company paid",
    description: "Full dental coverage including cleanings, fillings, and major procedures",
    details: {
      provider: "Delta Dental",
      preventive: "100% coverage",
      basic: "80% coverage",
      major: "50% coverage",
      features: [
        "2 cleanings per year",
        "X-rays included",
        "Orthodontics coverage",
        "No waiting periods"
      ]
    },
    monthlyValue: "$75"
  },
  {
    id: "vision",
    name: "Vision Insurance",
    icon: Eye,
    color: "text-green-600",
    bgColor: "bg-green-50",
    coverage: "100% company paid",
    description: "Complete vision care including eye exams, glasses, and contact lenses",
    details: {
      provider: "VSP Vision",
      examCoverage: "100% annual exam",
      frames: "$200 allowance every 2 years",
      lenses: "Standard lenses covered",
      features: [
        "Annual eye exam",
        "Designer frame options",
        "Contact lens allowance",
        "Laser surgery discounts"
      ]
    },
    monthlyValue: "$25"
  }
]

const retirementBenefits = [
  {
    id: "401k",
    name: "401(k) Retirement Plan",
    icon: PiggyBank,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    match: "6% company match",
    description: "Tax-advantaged retirement savings with generous company matching",
    details: {
      provider: "Fidelity Investments",
      match: "100% match up to 6% of salary",
      vesting: "Immediate vesting",
      maxContribution: "$23,000 (2024 limit)",
      features: [
        "Immediate enrollment",
        "Automatic enrollment at 6%",
        "Low-cost investment options",
        "Online planning tools"
      ]
    },
    currentContribution: "6%",
    projectedValue: "$2.4M by retirement"
  },
  {
    id: "pension",
    name: "Pension Plan",
    icon: Shield,
    color: "text-indigo-600", 
    bgColor: "bg-indigo-50",
    coverage: "Company funded",
    description: "Traditional pension providing guaranteed retirement income",
    details: {
      formula: "2% × years of service × final average salary",
      vesting: "5 years",
      eligibility: "All full-time employees",
      features: [
        "Guaranteed monthly income",
        "Survivor benefits",
        "Early retirement options",
        "COLA adjustments"
      ]
    },
    projectedMonthly: "$3,200/month at retirement"
  }
]

const timeOffBenefits = [
  {
    id: "pto",
    name: "Paid Time Off",
    icon: Calendar,
    accrual: "20 days annually",
    carryover: "5 days maximum",
    description: "Flexible PTO for vacation, personal days, and mental health",
    features: [
      "Immediate accrual for new hires",
      "No blackout periods",
      "Flexible scheduling",
      "Mental health days encouraged"
    ]
  },
  {
    id: "holidays",
    name: "Company Holidays", 
    icon: Gift,
    days: "12 paid holidays",
    floating: "2 floating holidays",
    description: "Comprehensive holiday schedule plus personal choice days",
    features: [
      "Major federal holidays",
      "Holiday week flexibility",
      "Cultural celebration days",
      "Year-end company closure"
    ]
  },
  {
    id: "sick",
    name: "Sick Leave",
    icon: Heart,
    accrual: "10 days annually",
    family: "Can be used for family care",
    description: "Paid sick time for personal and family health needs",
    features: [
      "No advance notice required",
      "Family care included",
      "Doctor visit coverage",
      "Mental health support"
    ]
  }
]

const wellnessBenefits = [
  {
    id: "gym",
    name: "Fitness Membership",
    icon: Dumbbell,
    color: "text-orange-600",
    value: "$100/month reimbursement",
    description: "Fitness membership reimbursement for gym, yoga, or fitness classes",
    features: [
      "Any fitness facility eligible",
      "Virtual fitness included",
      "Personal trainer discounts",
      "Wellness challenges"
    ]
  },
  {
    id: "wellness",
    name: "Wellness Program",
    icon: Heart,
    color: "text-pink-600", 
    value: "Up to $500 annually",
    description: "Comprehensive wellness support for physical and mental health",
    features: [
      "Annual health screening",
      "Wellness coaching",
      "Stress management courses",
      "Nutrition consultations"
    ]
  },
  {
    id: "eap",
    name: "Employee Assistance Program",
    icon: Users,
    color: "text-teal-600",
    value: "Free 24/7 support",
    description: "Confidential counseling and support services for employees and families",
    features: [
      "Mental health counseling",
      "Financial counseling",
      "Legal consultation", 
      "Work-life balance support"
    ]
  }
]

const additionalBenefits = [
  {
    id: "education",
    name: "Education Assistance",
    icon: GraduationCap,
    value: "$5,000 annually",
    description: "Tuition reimbursement for job-related education and professional development"
  },
  {
    id: "commuter",
    name: "Commuter Benefits",
    icon: Car,
    value: "$280/month",
    description: "Pre-tax deduction for parking, transit, and rideshare expenses"
  },
  {
    id: "life",
    name: "Life Insurance",
    icon: Shield,
    value: "2x annual salary",
    description: "Company-paid basic life insurance with option to purchase additional coverage"
  },
  {
    id: "disability",
    name: "Disability Insurance",
    icon: Heart,
    value: "60% of salary",
    description: "Short and long-term disability coverage for income protection"
  },
  {
    id: "flexible",
    name: "Flexible Work",
    icon: Home,
    value: "Hybrid/Remote options",
    description: "Flexible work arrangements including remote work and flexible hours"
  },
  {
    id: "coffee",
    name: "Daily Perks",
    icon: Coffee,
    value: "Free amenities",
    description: "Free coffee, snacks, catered lunches, and office amenities"
  }
]

export default function EmployeeBenefits() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const totalMonthlyValue = 
    healthBenefits.reduce((sum, benefit) => sum + parseInt(benefit.monthlyValue.replace('$', '')), 0) +
    280 + // commuter
    200 + // wellness
    150   // other perks

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Benefits</h1>
          <p className="text-muted-foreground">
            Comprehensive benefits package designed to support your health, financial security, and well-being
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">${totalMonthlyValue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total monthly value</div>
        </div>
      </div>

      {/* Benefits Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Coverage</CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">Company paid premiums</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">401(k) Match</CardTitle>
            <PiggyBank className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6%</div>
            <p className="text-xs text-muted-foreground">Company match</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PTO Days</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Total days annually</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wellness Budget</CardTitle>
            <Dumbbell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,700</div>
            <p className="text-xs text-muted-foreground">Annual wellness budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Benefits Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="time-off">Time Off</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Benefits Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Your Benefits Package</CardTitle>
              <CardDescription>A comprehensive overview of all benefits available to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-4">Health & Wellness</h3>
                  <div className="space-y-3">
                    {healthBenefits.map((benefit) => (
                      <div key={benefit.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${benefit.bgColor}`}>
                            <benefit.icon className={`h-4 w-4 ${benefit.color}`} />
                          </div>
                          <div>
                            <div className="font-medium">{benefit.name}</div>
                            <div className="text-sm text-muted-foreground">{benefit.coverage}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{benefit.monthlyValue}</div>
                          <div className="text-xs text-muted-foreground">monthly value</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Additional Benefits</h3>
                  <div className="space-y-3">
                    {additionalBenefits.slice(0, 3).map((benefit) => (
                      <div key={benefit.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <benefit.icon className="h-4 w-4 text-gray-600" />
                          <div>
                            <div className="font-medium">{benefit.name}</div>
                            <div className="text-sm text-muted-foreground">{benefit.description}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{benefit.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enrollment Status */}
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Status</CardTitle>
              <CardDescription>Your current benefit selections and enrollment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium">Benefits Enrollment Complete</div>
                      <div className="text-sm text-muted-foreground">Last updated: January 1, 2024</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Elections
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Open Enrollment</div>
                    <div className="text-lg font-semibold">November 1-30</div>
                    <div className="text-sm text-muted-foreground">Annual enrollment period</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Next Review</div>
                    <div className="text-lg font-semibold">March 15, 2024</div>
                    <div className="text-sm text-muted-foreground">Quarterly check-in</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">HSA Contribution</div>
                    <div className="text-lg font-semibold">$2,000</div>
                    <div className="text-sm text-muted-foreground">YTD contribution</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid gap-6">
            {healthBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <CardTitle>{benefit.name}</CardTitle>
                        <CardDescription>{benefit.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {benefit.coverage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-3">Plan Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Provider:</span>
                          <span className="font-medium">{benefit.details.provider}</span>
                        </div>
                        {benefit.details.deductible && (
                          <div className="flex justify-between">
                            <span>Deductible:</span>
                            <span className="font-medium">{benefit.details.deductible}</span>
                          </div>
                        )}
                        {benefit.details.outOfPocketMax && (
                          <div className="flex justify-between">
                            <span>Out-of-pocket max:</span>
                            <span className="font-medium">{benefit.details.outOfPocketMax}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Monthly value:</span>
                          <span className="font-medium text-green-600">{benefit.monthlyValue}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Key Features</h4>
                      <ul className="space-y-2 text-sm">
                        {benefit.details.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="retirement" className="space-y-6">
          <div className="grid gap-6">
            {retirementBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${benefit.bgColor}`}>
                        <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                      </div>
                      <div>
                        <CardTitle>{benefit.name}</CardTitle>
                        <CardDescription>{benefit.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {benefit.match || benefit.coverage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-3">Plan Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Provider:</span>
                          <span className="font-medium">{benefit.details.provider || "Company Plan"}</span>
                        </div>
                        {benefit.details.match && (
                          <div className="flex justify-between">
                            <span>Company Match:</span>
                            <span className="font-medium">{benefit.details.match}</span>
                          </div>
                        )}
                        {benefit.details.vesting && (
                          <div className="flex justify-between">
                            <span>Vesting:</span>
                            <span className="font-medium">{benefit.details.vesting}</span>
                          </div>
                        )}
                        {benefit.currentContribution && (
                          <div className="flex justify-between">
                            <span>Your contribution:</span>
                            <span className="font-medium text-blue-600">{benefit.currentContribution}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Benefits</h4>
                      <ul className="space-y-2 text-sm">
                        {benefit.details.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {benefit.projectedValue && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-800">Projected Value</div>
                          <div className="text-lg font-bold text-blue-900">{benefit.projectedValue}</div>
                        </div>
                      )}
                      
                      {benefit.projectedMonthly && (
                        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm font-medium text-purple-800">Estimated Benefit</div>
                          <div className="text-lg font-bold text-purple-900">{benefit.projectedMonthly}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="time-off" className="space-y-6">
          <div className="grid gap-6">
            {timeOffBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle>{benefit.name}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-3">Policy Details</h4>
                      <div className="space-y-2 text-sm">
                        {benefit.accrual && (
                          <div className="flex justify-between">
                            <span>Annual Accrual:</span>
                            <span className="font-medium">{benefit.accrual}</span>
                          </div>
                        )}
                        {benefit.days && (
                          <div className="flex justify-between">
                            <span>Total Days:</span>
                            <span className="font-medium">{benefit.days}</span>
                          </div>
                        )}
                        {benefit.floating && (
                          <div className="flex justify-between">
                            <span>Floating Holidays:</span>
                            <span className="font-medium">{benefit.floating}</span>
                          </div>
                        )}
                        {benefit.carryover && (
                          <div className="flex justify-between">
                            <span>Carryover:</span>
                            <span className="font-medium">{benefit.carryover}</span>
                          </div>
                        )}
                        {benefit.family && (
                          <div className="flex justify-between">
                            <span>Family Care:</span>
                            <span className="font-medium">{benefit.family}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Key Features</h4>
                      <ul className="space-y-2 text-sm">
                        {benefit.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wellnessBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                    <div>
                      <CardTitle className="text-lg">{benefit.name}</CardTitle>
                      <div className="text-sm font-medium text-green-600">{benefit.value}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{benefit.description}</p>
                  <ul className="space-y-2 text-sm">
                    {benefit.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Benefits Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Perks & Benefits</CardTitle>
              <CardDescription>Extra benefits that make working here great</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {additionalBenefits.slice(3).map((benefit) => (
                  <div key={benefit.id} className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <benefit.icon className="h-5 w-5 text-gray-600" />
                      <div className="font-medium">{benefit.name}</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{benefit.description}</div>
                    <div className="text-sm font-medium text-blue-600">{benefit.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 