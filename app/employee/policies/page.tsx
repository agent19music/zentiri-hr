"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BookOpen, 
  Search, 
  Download, 
  Clock,
  Calendar,
  FileText,
  Shield,
  Users,
  Heart,
  Car,
  Coffee,
  Briefcase,
  Globe,
  Eye,
  Star,
  ArrowRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

// Mock policy data
const policies = [
  {
    id: "1",
    title: "Remote Work Policy",
    category: "Work Arrangements",
    description: "Guidelines for remote work, hybrid schedules, and workspace requirements",
    lastUpdated: "2024-01-15",
    version: "2.1",
    status: "active",
    readTime: "5 min",
    popularity: 95,
    isRequired: false,
    tags: ["remote", "hybrid", "workspace"],
    summary: "Comprehensive guidelines for remote and hybrid work arrangements, including equipment, communication, and productivity expectations."
  },
  {
    id: "2",
    title: "Code of Conduct",
    category: "Ethics & Compliance",
    description: "Professional standards and ethical guidelines for all employees",
    lastUpdated: "2024-01-10",
    version: "3.0",
    status: "active",
    readTime: "8 min",
    popularity: 100,
    isRequired: true,
    tags: ["ethics", "conduct", "compliance"],
    summary: "Essential guidelines for professional behavior, ethical standards, and compliance requirements."
  },
  {
    id: "3",
    title: "Health & Safety Guidelines",
    category: "Safety & Security",
    description: "Workplace safety procedures and health protocols",
    lastUpdated: "2024-01-12",
    version: "1.8",
    status: "active",
    readTime: "6 min",
    popularity: 78,
    isRequired: true,
    tags: ["safety", "health", "emergency"],
    summary: "Important safety procedures, emergency protocols, and health guidelines for workplace safety."
  },
  {
    id: "4",
    title: "Vacation & Time Off Policy",
    category: "Benefits & Leave",
    description: "PTO accrual, vacation scheduling, and leave request procedures",
    lastUpdated: "2024-01-08",
    version: "2.3",
    status: "active",
    readTime: "4 min",
    popularity: 92,
    isRequired: false,
    tags: ["vacation", "pto", "leave"],
    summary: "Complete guide to time off policies, vacation accrual, and leave request procedures."
  },
  {
    id: "5",
    title: "Data Privacy & Security",
    category: "Security & Privacy",
    description: "Data handling, privacy protection, and cybersecurity best practices",
    lastUpdated: "2024-01-05",
    version: "1.5",
    status: "active",
    readTime: "10 min",
    popularity: 85,
    isRequired: true,
    tags: ["data", "privacy", "security", "gdpr"],
    summary: "Critical information about data protection, privacy laws, and cybersecurity practices."
  },
  {
    id: "6",
    title: "Professional Development",
    category: "Career & Growth",
    description: "Training opportunities, skill development, and career advancement",
    lastUpdated: "2024-01-03",
    version: "2.0",
    status: "active",
    readTime: "7 min",
    popularity: 88,
    isRequired: false,
    tags: ["training", "development", "career"],
    summary: "Opportunities for professional growth, training programs, and career development resources."
  },
  {
    id: "7",
    title: "Expense Reimbursement",
    category: "Finance & Expenses",
    description: "Business expense policies and reimbursement procedures",
    lastUpdated: "2023-12-20",
    version: "1.9",
    status: "active",
    readTime: "5 min",
    popularity: 72,
    isRequired: false,
    tags: ["expenses", "reimbursement", "finance"],
    summary: "Guidelines for business expenses, reimbursement procedures, and expense reporting."
  },
  {
    id: "8",
    title: "Anti-Harassment Policy",
    category: "Ethics & Compliance",
    description: "Zero-tolerance harassment policy and reporting procedures",
    lastUpdated: "2024-01-01",
    version: "2.2",
    status: "active",
    readTime: "6 min",
    popularity: 100,
    isRequired: true,
    tags: ["harassment", "reporting", "inclusion"],
    summary: "Important anti-harassment policies, reporting procedures, and support resources."
  }
]

const categories = [
  {
    name: "All Policies",
    value: "all",
    icon: BookOpen,
    count: policies.length
  },
  {
    name: "Ethics & Compliance", 
    value: "Ethics & Compliance",
    icon: Shield,
    count: policies.filter(p => p.category === "Ethics & Compliance").length
  },
  {
    name: "Work Arrangements",
    value: "Work Arrangements", 
    icon: Briefcase,
    count: policies.filter(p => p.category === "Work Arrangements").length
  },
  {
    name: "Benefits & Leave",
    value: "Benefits & Leave",
    icon: Heart,
    count: policies.filter(p => p.category === "Benefits & Leave").length
  },
  {
    name: "Safety & Security",
    value: "Safety & Security",
    icon: AlertCircle,
    count: policies.filter(p => p.category === "Safety & Security").length
  },
  {
    name: "Career & Growth",
    value: "Career & Growth",
    icon: Users,
    count: policies.filter(p => p.category === "Career & Growth").length
  }
]

export default function PoliciesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null)
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false)
  const [sortBy, setSortBy] = useState("popularity")

  const filteredPolicies = policies.filter(policy => {
    const matchesCategory = selectedCategory === "all" || policy.category === selectedCategory
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return b.popularity - a.popularity
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "name":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const requiredPolicies = policies.filter(p => p.isRequired)
  const popularPolicies = policies.filter(p => p.popularity >= 90)

  const handleViewPolicy = (policy: any) => {
    setSelectedPolicy(policy)
    setPolicyDialogOpen(true)
  }

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.value === categoryName)
    return category?.icon || FileText
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "draft": return "bg-yellow-100 text-yellow-800"
      case "archived": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Policy Library</h1>
          <p className="text-muted-foreground mt-1">
            Browse company policies, guidelines, and important information
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Policies</p>
                <p className="text-xs text-muted-foreground">{policies.length} available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Required Reading</p>
                <p className="text-xs text-muted-foreground">{requiredPolicies.length} policies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Recently Updated</p>
                <p className="text-xs text-muted-foreground">3 this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Most Popular</p>
                <p className="text-xs text-muted-foreground">{popularPolicies.length} trending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                        selectedCategory === category.value ? 'bg-primary/10 text-primary border-r-2 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Required Policies */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Required Reading
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requiredPolicies.slice(0, 3).map((policy) => (
                <div key={policy.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <h4 className="font-medium text-sm">{policy.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{policy.readTime} read</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPolicies.map((policy) => {
              const CategoryIcon = getCategoryIcon(policy.category)
              return (
                <Card key={policy.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{policy.title}</CardTitle>
                          <CardDescription className="text-sm mt-1">
                            {policy.category}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        {policy.isRequired && (
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        )}
                        <Badge className={getStatusColor(policy.status)} variant="outline">
                          v{policy.version}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {policy.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {policy.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{policy.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{policy.popularity}%</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleViewPolicy(policy)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Read Policy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredPolicies.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Policies Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or browse a different category
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Policy Detail Dialog */}
      <Dialog open={policyDialogOpen} onOpenChange={setPolicyDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedPolicy?.title}</span>
              <div className="flex items-center space-x-2">
                {selectedPolicy?.isRequired && (
                  <Badge variant="destructive">Required</Badge>
                )}
                <Badge variant="outline">v{selectedPolicy?.version}</Badge>
              </div>
            </DialogTitle>
            <DialogDescription>
              {selectedPolicy?.category} • {selectedPolicy?.readTime} • Updated {selectedPolicy?.lastUpdated && new Date(selectedPolicy.lastUpdated).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Policy Summary</h3>
              <p className="text-sm text-muted-foreground">{selectedPolicy?.summary}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {selectedPolicy?.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-4">Full Policy Content</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  [Policy content would be rendered here in a real application. This would include the full text, 
                  sections, sub-policies, and any embedded documents or forms.]
                </p>
                <p className="text-muted-foreground mt-4">
                  For demonstration purposes, this shows where the complete policy document would be displayed 
                  with proper formatting, sections, and interactive elements.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setPolicyDialogOpen(false)}>
              Close
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button>
              Mark as Read
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 