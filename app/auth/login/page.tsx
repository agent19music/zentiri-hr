"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Building2, 
  Users, 
  CheckCircle, 
  AlertCircle,
  ArrowRight
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getTestAccounts } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"

const testAccounts = getTestAccounts()

export default function LoginPage() {
  const router = useRouter()
  const { login, user, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTestAccount, setSelectedTestAccount] = useState("")

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push(user.roleLevel <= 6 ? '/employer/dashboard' : '/employee/dashboard')
    }
  }, [user, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const result = await login(formData.email, formData.password)
      if (!result.success) {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTestAccountSelect = (accountEmail: string) => {
    const account = testAccounts.find(acc => acc.email === accountEmail)
    if (account) {
      setFormData({
        email: account.email,
        password: account.password
      })
      setSelectedTestAccount(accountEmail)
    }
  }

  const handleQuickLogin = async (email: string, password: string) => {
    setError("")
    setIsSubmitting(true)
    
    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/zentiri-logo.png" 
            alt="Zentiri HR Logo" 
            className="h-8 w-8 rounded-lg object-contain"
          />
          <span className="text-xl font-bold">Zentiri HR</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Test Account Selector */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  Demo Mode
                </Badge>
                <span className="text-sm text-muted-foreground">Quick test login</span>
              </div>
              
              <Select onValueChange={handleTestAccountSelect} value={selectedTestAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a test account" />
                </SelectTrigger>
                <SelectContent>
                  {testAccounts.map((account) => (
                    <SelectItem key={account.email} value={account.email}>
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col">
                          <span className="font-medium">{account.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {account.role} at {account.organization}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedTestAccount && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    const account = testAccounts.find(acc => acc.email === selectedTestAccount)
                    if (account) {
                      handleQuickLogin(account.email, account.password)
                    }
                  }}
                  disabled={isSubmitting}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Quick Login as {testAccounts.find(acc => acc.email === selectedTestAccount)?.name}
                </Button>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Demo credentials - All passwords: <code className="bg-muted px-1 rounded">password123</code>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right side - Test Accounts Overview */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2">Test Organizations</h2>
            <p className="text-muted-foreground">
              Try different roles across multiple companies to explore the full HR platform
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                name: "TechCorp Kenya",
                plan: "Professional",
                users: testAccounts.filter(acc => acc.organization === "TechCorp Kenya"),
                color: "bg-blue-500"
              },
              {
                name: "StartupHub",
                plan: "Starter",
                users: testAccounts.filter(acc => acc.organization === "StartupHub"),
                color: "bg-green-500"
              },
              {
                name: "MegaCorp Industries",
                plan: "Enterprise",
                users: testAccounts.filter(acc => acc.organization === "MegaCorp Industries"),
                color: "bg-purple-500"
              }
            ].map((org) => (
              <Card key={org.name} className="border-l-4" style={{ borderLeftColor: org.color.replace('bg-', '#') }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {org.plan}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {org.users.map((user) => (
                      <div 
                        key={user.email} 
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
                        onClick={() => handleQuickLogin(user.email, user.password)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {user.role.replace('_', ' ')} • {user.department}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 