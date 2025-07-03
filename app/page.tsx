"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, BarChart3, Shield, Clock, Award, CheckCircle, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { IntegrationsShowcase } from "@/components/integrations-showcase"
import { useRouter } from "next/navigation"

export default function ZentiriHRLanding() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/onboarding/organization")
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/zentiri-logo.png" 
                alt="Zentiri HR Logo" 
                className="h-8 w-8 rounded-lg object-contain"
              />
              <span className="text-xl font-bold">Zentiri HR</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#partners" className="text-sm font-medium hover:text-primary transition-colors">
                Partners
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                Sign In
              </Button>
              <Button size="sm" onClick={handleGetStarted}>Get Started</Button>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 -left-4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
              <div className="mx-auto max-w-5xl text-center">
                <div className="inline-flex items-center justify-center mb-8">
                  <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                    <Star className="mr-2 h-4 w-4 fill-current" />
                    Trusted by 10,000+ companies worldwide
                    <div className="ml-2 flex space-x-1">
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </Badge>
                </div>

                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl mb-8">
                  <span className="block">Transform Your</span>
                  <span className="block bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                    HR Operations
                  </span>
                  <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-4 text-muted-foreground font-normal">
                    Into Tomorrow
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-['Playfair_Display'] italic max-w-3xl mx-auto leading-relaxed">
                  Where human resources meets artificial intelligence, creating seamless experiences that scale with your ambitions
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                  <Button size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Start Free Trial
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-10 py-4 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 hover:border-primary/50 transition-all duration-300"
                  >
                    Watch Demo
                    <div className="ml-3 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </Button>
                </div>

                {/* Enhanced Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <div className="group">
                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-background/80 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3">
                        99.9%
                      </div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Uptime Guarantee</div>
                      <div className="text-xs text-muted-foreground">Enterprise-grade reliability</div>
                      <div className="mt-4 flex items-center justify-center">
                        <div className="w-full bg-muted rounded-full h-1">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full" style={{ width: "99.9%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-background/80 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent mb-3">
                        50%
                      </div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Faster Hiring Process</div>
                      <div className="text-xs text-muted-foreground">AI-powered candidate matching</div>
                      <div className="mt-4 flex items-center justify-center space-x-1">
                        <Clock className="h-3 w-3 text-blue-500" />
                        <div className="text-xs text-blue-500 font-medium">Average 7 days</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-background/80 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent mb-3">
                        24/7
                      </div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Expert Support</div>
                      <div className="text-xs text-muted-foreground">Always here when you need us</div>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="text-xs text-green-500 font-medium">Online now</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 pt-12 border-t border-border/30">
                  <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                    <Badge variant="outline" className="px-4 py-2 bg-background/50 backdrop-blur-sm">
                      <Shield className="mr-2 h-4 w-4" />
                      SOC 2 Type II
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 bg-background/50 backdrop-blur-sm">
                      <Award className="mr-2 h-4 w-4" />
                      GDPR Compliant
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2 bg-background/50 backdrop-blur-sm">
                      <Users className="mr-2 h-4 w-4" />
                      ISO 27001
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Value Propositions */}
          <section id="features" className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Why Choose Zentiri HR?</h2>
                <p className="text-xl text-muted-foreground font-['Playfair_Display'] italic max-w-2xl mx-auto">
                  Everything you need to build a world-class HR department
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border border-border/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-background/80 hover:bg-background/90">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Smart Recruitment</h3>
                    <p className="text-muted-foreground mb-4">
                      AI-powered candidate matching and automated screening to find the perfect fit faster.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Automated job posting
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        AI candidate scoring
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Interview scheduling
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-background/80 hover:bg-background/90">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Performance Analytics</h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive insights and reporting to drive data-driven HR decisions.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Real-time dashboards
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Custom reports
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Predictive analytics
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-background/80 hover:bg-background/90">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Employee Self-Service</h3>
                    <p className="text-muted-foreground mb-4">
                      Empower employees with intuitive self-service tools for time-off, benefits, and more.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Leave management
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Benefits enrollment
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Document access
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-background/80 hover:bg-background/90">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Compliance Management</h3>
                    <p className="text-muted-foreground mb-4">
                      Stay compliant with automated tracking and reporting for all HR regulations.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        GDPR compliance
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Audit trails
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Policy management
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-background/80 hover:bg-background/90">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Time & Attendance</h3>
                    <p className="text-muted-foreground mb-4">
                      Accurate time tracking with flexible scheduling and automated payroll integration.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Biometric integration
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Shift scheduling
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Overtime tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-border/20 shadow-lg hover:shadow-xl transition-all backdrop-blur-sm bg-background/80 hover:bg-background/90">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Learning & Development</h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive training programs and skill development tracking for your team.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Course management
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Skill assessments
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Certification tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section id="partners" className="py-20">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
                <p className="text-xl text-muted-foreground font-['Playfair_Display'] italic">
                  Join thousands of companies that trust Zentiri HR with their most valuable asset
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
                <div className="flex items-center justify-center p-4">
                  <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Microsoft
                  </div>
                </div>
                <div className="flex items-center justify-center p-4">
                  <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Google
                  </div>
                </div>
                <div className="flex items-center justify-center p-4">
                  <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Apple
                  </div>
                </div>
                <div className="flex items-center justify-center p-4">
                  <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Amazon
                  </div>
                </div>
                <div className="flex items-center justify-center p-4">
                  <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Meta
                  </div>
                </div>
                <div className="flex items-center justify-center p-4">
                  <div className="text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Netflix
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Integrations Section */}
          <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
                <p className="text-xl text-muted-foreground font-['Playfair_Display'] italic">
                  Connect your entire HR ecosystem in one unified platform
                </p>
              </div>
              <IntegrationsShowcase />
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">Connect with 100+ popular HR tools and platforms</p>
                <Button variant="outline">View All Integrations</Button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your HR?</h2>
                <p className="text-xl mb-8 font-['Playfair_Display'] italic opacity-90">
                  Join thousands of companies already using Zentiri HR to streamline their HR operations
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-base px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-muted/50 py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <img 
                    src="/zentiri-logo.png" 
                    alt="Zentiri HR Logo" 
                    className="h-8 w-8 rounded-lg object-contain"
                  />
                  <span className="text-xl font-bold">Zentiri HR</span>
                </div>
                <p className="text-muted-foreground max-w-xs">
                  The complete HR management platform for modern businesses. Streamline, automate, and grow.
                </p>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">
                    Twitter
                  </Button>
                  <Button variant="ghost" size="sm">
                    LinkedIn
                  </Button>
                  <Button variant="ghost" size="sm">
                    GitHub
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Integrations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Security
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Status
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-foreground transition-colors">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                              <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Zentiri HR. All rights reserved.</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Badge variant="secondary" className="text-xs">
                  SOC 2 Compliant
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  GDPR Ready
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ISO 27001
                </Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

