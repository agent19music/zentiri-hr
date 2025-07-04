"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare, 
  Users, 
  FileText, 
  DollarSign, 
  Database, 
  Shield, 
  Award, 
  Clock, 
  Mail,
  Calendar,
  BarChart3,
  Briefcase,
  GraduationCap,
  CreditCard,
  Settings,
  Zap,
  Search,
  Building,
  Phone,
  Globe,
  Lock,
  Cloud,
  Target,
  TrendingUp,
  UserCheck,
  CheckCircle
} from "lucide-react"

interface IntegrationsDialogProps {
  children: React.ReactNode
}

const integrations = {
  communication: [
    { name: "Slack", icon: MessageSquare, description: "Team communication and HR notifications", color: "#4A154B" },
    { name: "Microsoft Teams", icon: MessageSquare, description: "Collaborate and communicate seamlessly", color: "#6264A7" },
    { name: "Zoom", icon: Phone, description: "Video conferencing for interviews and meetings", color: "#2D8CFF" },
    { name: "Gmail", icon: Mail, description: "Email integration for HR communications", color: "#EA4335" },
    { name: "Outlook", icon: Mail, description: "Microsoft email and calendar integration", color: "#0078D4" },
  ],
  payroll: [
    { name: "ADP", icon: DollarSign, description: "Comprehensive payroll and benefits administration", color: "#D50000" },
    { name: "Paychex", icon: DollarSign, description: "Payroll processing and HR services", color: "#00A651" },
    { name: "Gusto", icon: DollarSign, description: "Modern payroll and benefits platform", color: "#FF6B35" },
    { name: "QuickBooks", icon: CreditCard, description: "Accounting and financial management", color: "#0077C5" },
    { name: "Sage", icon: CreditCard, description: "Business management and accounting", color: "#00B04F" },
  ],
  hris: [
    { name: "Workday", icon: Users, description: "Enterprise HR management system", color: "#F7931E" },
    { name: "BambooHR", icon: FileText, description: "All-in-one HR software", color: "#7CB342" },
    { name: "SuccessFactors", icon: Users, description: "SAP's cloud HR suite", color: "#0FAAFF" },
    { name: "UltiPro", icon: Users, description: "Comprehensive HR and payroll solution", color: "#FF6B35" },
    { name: "Kronos", icon: Clock, description: "Workforce management and time tracking", color: "#E31837" },
  ],
  recruiting: [
    { name: "Greenhouse", icon: Users, description: "Applicant tracking and recruiting", color: "#1F7A8C" },
    { name: "Lever", icon: Users, description: "Modern recruiting platform", color: "#7B68EE" },
    { name: "JazzHR", icon: Users, description: "Recruiting software for small businesses", color: "#FF6B35" },
    { name: "LinkedIn Talent", icon: Users, description: "Professional networking and recruiting", color: "#0077B5" },
    { name: "Indeed", icon: Search, description: "Job posting and candidate sourcing", color: "#003A9B" },
  ],
  performance: [
    { name: "Lattice", icon: Award, description: "Performance management and employee engagement", color: "#6B46C1" },
    { name: "15Five", icon: TrendingUp, description: "Weekly check-ins and performance tracking", color: "#00B8D4" },
    { name: "Culture Amp", icon: Target, description: "Employee feedback and analytics", color: "#FF6B35" },
    { name: "Bonusly", icon: Award, description: "Employee recognition and rewards", color: "#7B68EE" },
    { name: "TINYpulse", icon: BarChart3, description: "Employee satisfaction surveys", color: "#00A651" },
  ],
  learning: [
    { name: "Cornerstone OnDemand", icon: GraduationCap, description: "Learning management system", color: "#FF6B35" },
    { name: "Udemy Business", icon: GraduationCap, description: "Online learning platform", color: "#A435F0" },
    { name: "LinkedIn Learning", icon: GraduationCap, description: "Professional development courses", color: "#0077B5" },
    { name: "Coursera", icon: GraduationCap, description: "Online education platform", color: "#0056D3" },
    { name: "Pluralsight", icon: GraduationCap, description: "Technology skills platform", color: "#F15B2A" },
  ],
  security: [
    { name: "Okta", icon: Shield, description: "Identity and access management", color: "#007DC1" },
    { name: "Azure AD", icon: Shield, description: "Microsoft identity platform", color: "#0078D4" },
    { name: "OneLogin", icon: Lock, description: "Single sign-on and identity management", color: "#00B04F" },
    { name: "Duo Security", icon: Shield, description: "Two-factor authentication", color: "#00B04F" },
    { name: "CyberArk", icon: Lock, description: "Privileged access management", color: "#0066CC" },
  ],
  analytics: [
    { name: "Tableau", icon: BarChart3, description: "Business intelligence and analytics", color: "#E97627" },
    { name: "Power BI", icon: BarChart3, description: "Microsoft business analytics", color: "#F2C811" },
    { name: "Looker", icon: BarChart3, description: "Business intelligence platform", color: "#4285F4" },
    { name: "Qlik", icon: BarChart3, description: "Data analytics and visualization", color: "#009845" },
    { name: "Sisense", icon: TrendingUp, description: "AI-driven analytics platform", color: "#FF6B35" },
  ],
}

export function IntegrationsDialog({ children }: IntegrationsDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredIntegrations = Object.entries(integrations).reduce((acc, [category, items]) => {
    if (searchTerm) {
      const filtered = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      if (filtered.length > 0) {
        (acc as any)[category] = filtered
      }
    } else {
      (acc as any)[category] = items
    }
    return acc
  }, {} as typeof integrations)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            All Integrations
          </DialogTitle>
          <DialogDescription>
            Connect Zentiri HR with your existing tools and workflows. Over 100+ integrations available.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="communication" className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
              <TabsTrigger value="communication" className="text-xs">
                <MessageSquare className="w-3 h-3 mr-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="payroll" className="text-xs">
                <DollarSign className="w-3 h-3 mr-1" />
                Payroll
              </TabsTrigger>
              <TabsTrigger value="hris" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                HRIS
              </TabsTrigger>
              <TabsTrigger value="recruiting" className="text-xs">
                <UserCheck className="w-3 h-3 mr-1" />
                Recruiting
              </TabsTrigger>
              <TabsTrigger value="performance" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="learning" className="text-xs">
                <GraduationCap className="w-3 h-3 mr-1" />
                Learning
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Security
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {Object.entries(filteredIntegrations).map(([category, items]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((integration) => (
                    <div
                      key={integration.name}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: `${integration.color}20` }}
                        >
                          <integration.icon 
                            className="w-4 h-4" 
                            style={{ color: integration.color }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{integration.name}</h4>
                            <CheckCircle className="w-3 h-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              <span>Can't find what you need? We support custom integrations.</span>
            </div>
            <Button variant="outline" size="sm">
              Request Integration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
