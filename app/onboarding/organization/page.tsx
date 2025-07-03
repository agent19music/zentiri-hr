"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Mail, Users, Globe, CheckCircle } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const organizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select company size"),
  departments: z.string().min(1, "Please describe your departments"),
  subdomain: z.string()
    .min(3, "Subdomain must be at least 3 characters")
    .max(20, "Subdomain must be less than 20 characters")
    .regex(/^[a-z0-9-]+$/, "Subdomain can only contain lowercase letters, numbers, and hyphens"),
  adminEmail: z.string().email("Please enter a valid email address"),
  adminName: z.string().min(2, "Admin name must be at least 2 characters"),
})

type OrganizationForm = z.infer<typeof organizationSchema>

const industries = [
  "Technology & Software",
  "Healthcare & Medical",
  "Financial Services",
  "Manufacturing",
  "Education",
  "Retail & E-commerce",
  "Professional Services",
  "Construction & Real Estate",
  "Transportation & Logistics",
  "Media & Entertainment",
  "Non-profit",
  "Government",
  "Other"
]

const companySizes = [
  { value: "1-10", label: "1-10 employees", plan: "free" },
  { value: "11-50", label: "11-50 employees", plan: "free" },
  { value: "51-200", label: "51-200 employees", plan: "pro" },
  { value: "201-500", label: "201-500 employees", plan: "enterprise" },
  { value: "501-1000", label: "501-1000 employees", plan: "enterprise" },
  { value: "1000+", label: "1000+ employees", plan: "enterprise" }
]

export default function OrganizationOnboarding() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null)
  const [checkingSubdomain, setCheckingSubdomain] = useState(false)

  const form = useForm<OrganizationForm>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      industry: "",
      size: "",
      departments: "",
      subdomain: "",
      adminEmail: "",
      adminName: "",
    },
  })

  const watchedName = form.watch("name")
  const watchedSubdomain = form.watch("subdomain")

  // Auto-generate subdomain from organization name
  const generateSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .substring(0, 20)
  }

  // Update subdomain when organization name changes
  useState(() => {
    if (watchedName && !watchedSubdomain) {
      const generated = generateSubdomain(watchedName)
      form.setValue("subdomain", generated)
    }
  })

  const checkSubdomainAvailability = async (subdomain: string) => {
    if (!subdomain || subdomain.length < 3) return
    
    setCheckingSubdomain(true)
    try {
      const response = await fetch(`/api/subdomain/check?subdomain=${encodeURIComponent(subdomain)}`)
      const result = await response.json()
      
      if (result.success) {
        setSubdomainAvailable(result.available)
        if (!result.available && result.error) {
          form.setError("subdomain", { message: result.error })
        }
      } else {
        setSubdomainAvailable(false)
        form.setError("subdomain", { message: result.error || "Failed to check subdomain availability" })
      }
    } catch (error) {
      console.error("Error checking subdomain:", error)
      setSubdomainAvailable(false)
      form.setError("subdomain", { message: "Failed to check subdomain availability" })
    } finally {
      setCheckingSubdomain(false)
    }
  }

  // Check subdomain availability when it changes
  useState(() => {
    const timeoutId = setTimeout(() => {
      if (watchedSubdomain && watchedSubdomain.length >= 3) {
        checkSubdomainAvailability(watchedSubdomain)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  })

  const onSubmit = async (data: OrganizationForm) => {
    if (subdomainAvailable) {
      form.setError("subdomain", { message: "Please choose an available subdomain" })
      return
    }

    setIsSubmitting(true)
    try {
      // Store organization data in localStorage for the next step
      const organizationData = {
        ...data,
        recommendedPlan: companySizes.find(size => size.value === data.size)?.plan || "free"
      }
      localStorage.setItem('organizationData', JSON.stringify(organizationData))
      
      // Navigate to plans page
      router.push("/onboarding/plans")
    } catch (error) {
      console.error("Error saving organization data:", error)
    } finally {
      setIsSubmitting(false)
    }
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
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="px-3 py-1">Step 1 of 2</Badge>
            <Button variant="ghost" onClick={() => router.push("/")}>
              Exit
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Tell us about your organization</h1>
          <p className="text-lg text-muted-foreground">
            Help us customize Zentiri HR for your specific needs
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-2 text-primary">
              <Building2 className="h-5 w-5" />
              <CardTitle>Organization Details</CardTitle>
            </div>
            <CardDescription>
              Provide basic information about your company to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Organization Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corporation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Industry */}
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Size */}
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of employees" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              <div className="flex items-center justify-between w-full">
                                <span>{size.label}</span>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {size.plan}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        We'll recommend the best plan based on your company size
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Departments */}
                <FormField
                  control={form.control}
                  name="departments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Departments *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Engineering, Marketing, Sales, HR, Finance..."
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        List the main departments in your organization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subdomain */}
                <FormField
                  control={form.control}
                  name="subdomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Your Subdomain *</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input 
                            placeholder="yourcompany"
                            {...field}
                            className={`flex-1 ${
                              subdomainAvailable === true ? 'border-green-500' : 
                              subdomainAvailable === false ? 'border-red-500' : ''
                            }`}
                          />
                          <span className="text-muted-foreground bg-muted px-3 py-2 rounded-md border">
                            .zentiri.app
                          </span>
                          {checkingSubdomain && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          )}
                          {subdomainAvailable === true && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          {subdomainAvailable === false && (
                            <div className="text-red-500 text-sm">✗</div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        This will be your organization's unique URL: {watchedSubdomain || 'yourcompany'}.zentiri.app
                      </FormDescription>
                      {subdomainAvailable === false && (
                        <p className="text-sm text-red-500">This subdomain is already taken. Please choose another.</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Admin Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Administrator Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="adminName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="adminEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Email *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="admin@yourcompany.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Login credentials will be sent to this email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium"
                  disabled={isSubmitting || subdomainAvailable === false}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Continue to Plans
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">Trusted by 10,000+ companies worldwide</p>
          <div className="flex justify-center space-x-6 opacity-60">
            <Badge variant="outline">SOC 2 Compliant</Badge>
            <Badge variant="outline">GDPR Ready</Badge>
            <Badge variant="outline">Enterprise Security</Badge>
          </div>
        </div>
      </main>
    </div>
  )
} 