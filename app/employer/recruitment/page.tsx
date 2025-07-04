"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  UserPlus, 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2,
  Eye,
  Edit,
  Download,
  Upload,
  CheckCircle,
  Clock,
  Star,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  Send,
  Target,
  Shield,
  Award,
  PlayCircle,
  PauseCircle,
  Trash2,
  Plus,
  MessageSquare,
  Briefcase
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAccessibleFeatures, getRoleInfo, getAccessScope, getActionPermissions, hasPermission, type UserRole } from "@/lib/rbac"

// Mock user role - in real app, this would come from auth context
const currentUserRole: UserRole = "hr_manager"

// Get role-based features
const features = getAccessibleFeatures(currentUserRole)
const roleInfo = getRoleInfo(currentUserRole)
const accessScope = getAccessScope(currentUserRole)
const actionPermissions = getActionPermissions(currentUserRole)

// Mock data
const jobPostings = [
  {
    id: "job-001",
    title: "Senior Software Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Nairobi, Kenya",
    status: "active",
    applications: 24,
    posted: "2024-01-15",
    deadline: "2024-02-15",
    priority: "high",
    hiringManager: "David Wilson",
    requirements: ["5+ years experience", "React", "Node.js", "TypeScript"],
    description: "We're looking for a senior software engineer to join our frontend team and help build the next generation of our platform.",
    salaryRange: "KES 150,000 - 200,000"
  },
  {
    id: "job-002", 
    title: "UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    status: "active",
    applications: 18,
    posted: "2024-01-20",
    deadline: "2024-02-20",
    priority: "medium",
    hiringManager: "Sarah Chen",
    requirements: ["3+ years experience", "Figma", "User Research", "Prototyping"],
    description: "Join our design team to create beautiful and intuitive user experiences for our products.",
    salaryRange: "KES 120,000 - 160,000"
  },
  {
    id: "job-003",
    title: "Marketing Manager",
    department: "Marketing", 
    type: "Full-time",
    location: "Mombasa, Kenya",
    status: "draft",
    applications: 0,
    posted: "2024-01-25",
    deadline: "2024-03-01",
    priority: "low",
    hiringManager: "Lisa Wang",
    requirements: ["4+ years experience", "Digital Marketing", "Analytics", "Content Strategy"],
    description: "Lead our marketing initiatives and grow our brand presence in the market.",
    salaryRange: "KES 140,000 - 180,000"
  },
  {
    id: "job-004",
    title: "Sales Representative",
    department: "Sales",
    type: "Full-time", 
    location: "Nairobi, Kenya",
    status: "active",
    applications: 31,
    posted: "2024-01-10",
    deadline: "2024-02-10",
    priority: "high",
    hiringManager: "Michael Torres",
    requirements: ["2+ years sales experience", "Customer Relations", "CRM Software"],
    description: "Drive revenue growth by building relationships with potential clients and closing deals.",
    salaryRange: "KES 80,000 - 120,000 + Commission"
  }
]

const applications = [
  {
    id: "app-001",
    jobId: "job-001",
    jobTitle: "Senior Software Engineer",
    candidate: {
      name: "James Mukiri",
      email: "james.mukiri@email.com",
      phone: "+254 700 123 456",
      avatar: "/placeholder-user.jpg",
      location: "Nairobi, Kenya"
    },
    appliedDate: "2024-01-20",
    status: "interview_scheduled",
    stage: "technical_interview",
    score: 4.2,
    experience: "6 years",
    lastActivity: "2 days ago",
    notes: "Strong technical background, excellent communication skills",
    resumeUrl: "/resumes/james-mukiri.pdf",
    interviewDate: "2024-01-25"
  },
  {
    id: "app-002",
    jobId: "job-001", 
    jobTitle: "Senior Software Engineer",
    candidate: {
      name: "Grace Wanjiku",
      email: "grace.wanjiku@email.com",
      phone: "+254 701 234 567",
      avatar: "/placeholder-user.jpg",
      location: "Nakuru, Kenya"
    },
    appliedDate: "2024-01-18",
    status: "under_review",
    stage: "resume_review",
    score: 3.8,
    experience: "5 years",
    lastActivity: "1 day ago",
    notes: "Good portfolio, needs technical assessment",
    resumeUrl: "/resumes/grace-wanjiku.pdf"
  },
  {
    id: "app-003",
    jobId: "job-002",
    jobTitle: "UX Designer",
    candidate: {
      name: "Peter Kamau",
      email: "peter.kamau@email.com", 
      phone: "+254 702 345 678",
      avatar: "/placeholder-user.jpg",
      location: "Kisumu, Kenya"
    },
    appliedDate: "2024-01-22",
    status: "offer_extended",
    stage: "offer_negotiation", 
    score: 4.7,
    experience: "4 years",
    lastActivity: "3 hours ago",
    notes: "Excellent design skills, great cultural fit",
    resumeUrl: "/resumes/peter-kamau.pdf",
    offerAmount: "KES 145,000"
  },
  {
    id: "app-004",
    jobId: "job-004",
    jobTitle: "Sales Representative",
    candidate: {
      name: "Mary Njeri",
      email: "mary.njeri@email.com",
      phone: "+254 703 567 890",
      avatar: "/placeholder-user.jpg",
      location: "Nairobi, Kenya"
    },
    appliedDate: "2024-01-15",
    status: "hired",
    stage: "onboarding",
    score: 4.5,
    experience: "3 years",
    lastActivity: "1 week ago",
    notes: "Exceeded sales expectations in interview presentation",
    resumeUrl: "/resumes/mary-njeri.pdf",
    startDate: "2024-02-01"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-500"
    case "draft": return "bg-yellow-500"
    case "closed": return "bg-red-500"
    case "paused": return "bg-gray-500"
    default: return "bg-gray-500"
  }
}

const getApplicationStatusColor = (status: string) => {
  switch (status) {
    case "under_review": return "bg-blue-500"
    case "interview_scheduled": return "bg-purple-500"
    case "offer_extended": return "bg-green-500"
    case "rejected": return "bg-red-500"
    case "hired": return "bg-emerald-500"
    default: return "bg-gray-500"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "text-red-600"
    case "medium": return "text-yellow-600"
    case "low": return "text-green-600"
    default: return "text-gray-600"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 4.5) return "text-green-600"
  if (score >= 4.0) return "text-blue-600"
  if (score >= 3.5) return "text-yellow-600"
  return "text-red-600"
}

// AI Skill Gap Analysis data
const skillGapAnalysis = [
  {
    jobId: "job-001",
    jobTitle: "Senior Software Engineer",
    requiredSkills: [
      { skill: "React", importance: "Critical", candidates: 18, qualified: 14 },
      { skill: "Node.js", importance: "Critical", candidates: 24, qualified: 16 },
      { skill: "TypeScript", importance: "High", candidates: 15, qualified: 12 },
      { skill: "AWS", importance: "Medium", candidates: 8, qualified: 4 },
      { skill: "GraphQL", importance: "Medium", candidates: 6, qualified: 3 }
    ],
    candidateMatch: 72,
    recommendations: [
      "Consider cross-training current Node.js developers in TypeScript",
      "Partner with coding bootcamps for AWS certification programs",
      "Offer GraphQL workshops to interested candidates"
    ]
  },
  {
    jobId: "job-002",
    jobTitle: "UX Designer",
    requiredSkills: [
      { skill: "Figma", importance: "Critical", candidates: 16, qualified: 14 },
      { skill: "User Research", importance: "Critical", candidates: 12, qualified: 8 },
      { skill: "Prototyping", importance: "High", candidates: 14, qualified: 10 },
      { skill: "Design Systems", importance: "Medium", candidates: 6, qualified: 4 },
      { skill: "Accessibility", importance: "Medium", candidates: 4, qualified: 2 }
    ],
    candidateMatch: 68,
    recommendations: [
      "Provide accessibility training for design candidates",
      "Partner with design schools for user research mentorship",
      "Create design system documentation for onboarding"
    ]
  }
]

// Social sharing data
const socialPlatforms = [
  {
    platform: "LinkedIn",
    icon: "💼",
    connected: true,
    followers: "12.5K",
    avgEngagement: "4.2%",
    jobsPosted: 15,
    applications: 187,
    lastPosted: "2 days ago"
  },
  {
    platform: "Twitter",
    icon: "🐦",
    connected: true,
    followers: "8.3K",
    avgEngagement: "2.8%",
    jobsPosted: 12,
    applications: 94,
    lastPosted: "1 week ago"
  },
  {
    platform: "Facebook",
    icon: "📘",
    connected: false,
    followers: "0",
    avgEngagement: "0%",
    jobsPosted: 0,
    applications: 0,
    lastPosted: "Never"
  },
  {
    platform: "Instagram",
    icon: "📷",
    connected: false,
    followers: "0",
    avgEngagement: "0%",
    jobsPosted: 0,
    applications: 0,
    lastPosted: "Never"
  },
  {
    platform: "AngelList",
    icon: "👼",
    connected: true,
    followers: "2.1K",
    avgEngagement: "8.7%",
    jobsPosted: 8,
    applications: 156,
    lastPosted: "3 days ago"
  }
]

const getSkillMatchColor = (percentage: number) => {
  if (percentage >= 80) return "text-green-600"
  if (percentage >= 60) return "text-yellow-600"
  return "text-red-600"
}

export default function RecruitmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [showNewJob, setShowNewJob] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [selectedJob, setSelectedJob] = useState<any>(null)

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter  
    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const filteredApplications = applications.filter(app => {
    return app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const stats = {
    activeJobs: jobPostings.filter(j => j.status === "active").length,
    totalApplications: applications.length,
    interviewsPending: applications.filter(a => a.status === "interview_scheduled").length,
    offersExtended: applications.filter(a => a.status === "offer_extended").length,
    hired: applications.filter(a => a.status === "hired").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recruitment Management</h1>
          <p className="text-muted-foreground">
            {accessScope}
          </p>
        </div>
        <div className="flex space-x-2">
          {features.canCreateJobs && (
            <Button size="sm" onClick={() => setShowNewJob(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          )}
          {features.canViewReports && (
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          )}
        </div>
      </div>

      {/* Role-based Access Info */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className={`p-2 rounded-lg ${roleInfo.color} text-white`}>
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{roleInfo.label} Access</h3>
              <p className="text-sm text-muted-foreground">{roleInfo.scope}</p>
            </div>
            <div className="text-right">
              <Badge variant="outline">{actionPermissions.recruitment.scope}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">Currently hiring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Pending</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsPending}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Extended</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offersExtended}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hired}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="pipeline">Hiring Pipeline</TabsTrigger>
          {hasPermission(currentUserRole, "reports.view") && (
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          )}
          <TabsTrigger value="skill-gap">AI Skill Analysis</TabsTrigger>
          <TabsTrigger value="social">Social Sharing</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Postings</CardTitle>
                  <CardDescription>
                    {actionPermissions.recruitment.canCreateJobs 
                      ? "Manage all job postings and recruitment campaigns"
                      : actionPermissions.recruitment.canInterview
                      ? "View job postings and participate in recruitment interviews"
                      : "View recruitment information based on your access level"
                    }
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Job Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedJob(job)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg leading-tight">{job.title}</h3>
                            <Badge className={`${getStatusColor(job.status)} text-white text-xs`}>
                              {job.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{job.department}</p>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <span className={getPriorityColor(job.priority)}>
                              {job.priority.toUpperCase()} PRIORITY
                            </span>
                          </div>
                        </div>
                        {features.canManageRecruitment && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {actionPermissions.recruitment.canCreateJobs && (
                                <>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Job
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    {job.status === "active" ? (
                                      <>
                                        <PauseCircle className="mr-2 h-4 w-4" />
                                        Pause Job
                                      </>
                                    ) : (
                                      <>
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Activate Job
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                View Applications ({job.applications})
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{job.type}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{job.applications} applications</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Due {job.deadline}</span>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <span>Hiring Manager: {job.hiringManager}</span>
                        </div>

                        <Progress 
                          value={Math.min((job.applications / 50) * 100, 100)} 
                          className="h-2" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No job postings found matching your criteria.</p>
                  <p className="text-sm">Try adjusting your search or filters.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Job Applications</CardTitle>
                  <CardDescription>
                    {actionPermissions.recruitment.canEvaluate
                      ? "Review and evaluate candidate applications"
                      : "View candidate applications and interview schedules"
                    }
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {features.canExportReports && (
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              {/* Applications Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id} className="cursor-pointer hover:bg-muted/50"
                                onClick={() => setSelectedApplication(application)}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={application.candidate.avatar} alt={application.candidate.name} />
                              <AvatarFallback className="text-xs">
                                {application.candidate.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.candidate.name}</p>
                              <p className="text-sm text-muted-foreground">{application.candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.jobTitle}</TableCell>
                        <TableCell>{application.appliedDate}</TableCell>
                        <TableCell>
                          <Badge className={`${getApplicationStatusColor(application.status)} text-white`}>
                            {application.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className={`h-4 w-4 ${getScoreColor(application.score)}`} />
                            <span className={getScoreColor(application.score)}>
                              {application.score}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Resume
                              </DropdownMenuItem>
                              {actionPermissions.recruitment.canInterview && (
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Schedule Interview
                                </DropdownMenuItem>
                              )}
                              {actionPermissions.recruitment.canEvaluate && (
                                <>
                                  <DropdownMenuItem>
                                    <Star className="mr-2 h-4 w-4" />
                                    Rate Candidate
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Add Notes
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredApplications.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No applications found matching your criteria.</p>
                  <p className="text-sm">Try adjusting your search criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Pipeline</CardTitle>
              <CardDescription>
                Track candidates through the recruitment process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Hiring pipeline visualization will be displayed here.</p>
                <p className="text-sm">Track candidate progress through interview stages and decision points.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {hasPermission(currentUserRole, "reports.view") && (
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Analytics</CardTitle>
                <CardDescription>
                  Insights into your recruitment performance and metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Recruitment analytics and reports will be displayed here.</p>
                  <p className="text-sm">Time-to-hire, source effectiveness, and conversion rates.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="skill-gap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Skill Gap Analysis</CardTitle>
              <CardDescription>
                AI-powered analysis of candidate skills vs organizational needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillGapAnalysis.map((analysis) => (
                  <div key={analysis.jobId} className="border rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{analysis.jobTitle}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Match Score:</span>
                        <span className={`font-bold text-lg ${getSkillMatchColor(analysis.candidateMatch)}`}>
                          {analysis.candidateMatch}%
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-medium">Skills Analysis</h4>
                        {analysis.requiredSkills.map((skill, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{skill.skill}</span>
                              <div className="flex items-center space-x-2">
                                <Badge className={skill.importance === 'Critical' ? 'bg-red-100 text-red-800' : 
                                               skill.importance === 'High' ? 'bg-yellow-100 text-yellow-800' : 
                                               'bg-green-100 text-green-800'}>
                                  {skill.importance}
                                </Badge>
                                <span className="text-muted-foreground">
                                  {skill.qualified}/{skill.candidates}
                                </span>
                              </div>
                            </div>
                            <Progress 
                              value={(skill.qualified / skill.candidates) * 100} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">AI Recommendations</h4>
                        <div className="space-y-2">
                          {analysis.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex items-start space-x-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{rec}</span>
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          <Target className="mr-2 h-4 w-4" />
                          Implement Recommendations
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">AI Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on current market trends and candidate pool analysis, consider prioritizing 
                        TypeScript and AWS skills development to improve candidate match rates by 15-20%.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Job Sharing</CardTitle>
              <CardDescription>
                Mass post job openings across multiple social platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {socialPlatforms.map((platform) => (
                    <Card key={platform.platform} className={`${platform.connected ? 'border-green-200' : 'border-gray-200'}`}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{platform.icon}</span>
                              <div>
                                <h3 className="font-semibold">{platform.platform}</h3>
                                <Badge className={platform.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                  {platform.connected ? 'Connected' : 'Not Connected'}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {platform.connected ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Followers:</span>
                                  <span className="ml-1 font-medium">{platform.followers}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Engagement:</span>
                                  <span className="ml-1 font-medium">{platform.avgEngagement}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Jobs Posted:</span>
                                  <span className="ml-1 font-medium">{platform.jobsPosted}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Applications:</span>
                                  <span className="ml-1 font-medium">{platform.applications}</span>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Last posted: {platform.lastPosted}
                              </div>
                              <Button variant="outline" className="w-full" size="sm">
                                <Send className="mr-2 h-4 w-4" />
                                Post Selected Jobs
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-sm text-muted-foreground">
                                Connect your {platform.platform} account to start sharing job postings
                              </p>
                              <Button className="w-full" size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Connect {platform.platform}
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Job Posting</CardTitle>
                    <CardDescription>Select jobs to post across multiple platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-3">
                        {jobPostings.filter(job => job.status === 'active').slice(0, 3).map((job) => (
                          <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <input type="checkbox" className="rounded" />
                              <div>
                                <h4 className="font-medium">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {job.applications} applications
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          3 jobs selected • 3 platforms connected
                        </div>
                        <Button>
                          <Send className="mr-2 h-4 w-4" />
                          Post to All Platforms
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Social Performance</h3>
                        <p className="text-sm text-muted-foreground">
                          LinkedIn posts generate 3x more applications than other platforms. 
                          Consider focusing your budget on LinkedIn premium job postings.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Job Details Modal */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                  <p className="text-muted-foreground">{selectedJob.department} • {selectedJob.location}</p>
                </div>
                <Badge className={`${getStatusColor(selectedJob.status)} text-white`}>
                  {selectedJob.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Job Details</Label>
                  <div className="space-y-1 text-sm">
                    <p><strong>Type:</strong> {selectedJob.type}</p>
                    <p><strong>Posted:</strong> {selectedJob.posted}</p>
                    <p><strong>Deadline:</strong> {selectedJob.deadline}</p>
                    <p><strong>Hiring Manager:</strong> {selectedJob.hiringManager}</p>
                    <p><strong>Salary Range:</strong> {selectedJob.salaryRange}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Application Stats</Label>
                  <div className="space-y-1 text-sm">
                    <p><strong>Applications:</strong> {selectedJob.applications}</p>
                    <p><strong>Priority:</strong> <span className={getPriorityColor(selectedJob.priority)}>{selectedJob.priority}</span></p>
                    <Progress value={Math.min((selectedJob.applications / 50) * 100, 100)} className="h-2 mt-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Requirements</Label>
                <div className="flex flex-wrap gap-1">
                  {selectedJob.requirements.map((req: string) => (
                    <Badge key={req} variant="secondary" className="text-xs">{req}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedJob(null)}>
                Close
              </Button>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                View Applications ({selectedJob.applications})
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedApplication.candidate.avatar} alt={selectedApplication.candidate.name} />
                  <AvatarFallback>
                    {selectedApplication.candidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedApplication.candidate.name}</h2>
                  <p className="text-muted-foreground">{selectedApplication.jobTitle}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contact Information</Label>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedApplication.candidate.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedApplication.candidate.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedApplication.candidate.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Application Details</Label>
                  <div className="space-y-1 text-sm">
                    <p><strong>Applied:</strong> {selectedApplication.appliedDate}</p>
                    <p><strong>Experience:</strong> {selectedApplication.experience}</p>
                    <p><strong>Current Stage:</strong> {selectedApplication.stage}</p>
                    <div className="flex items-center space-x-1">
                      <Star className={`h-4 w-4 ${getScoreColor(selectedApplication.score)}`} />
                      <span><strong>Score:</strong> {selectedApplication.score}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Badge className={`${getApplicationStatusColor(selectedApplication.status)} text-white`}>
                  {selectedApplication.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Notes</Label>
                <p className="text-sm text-muted-foreground">{selectedApplication.notes}</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                Close
              </Button>
              {actionPermissions.recruitment.canInterview && (
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Interview
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Job Modal */}
      {hasPermission("recruitment.create") && (
        <Dialog open={showNewJob} onOpenChange={setShowNewJob}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post New Job</DialogTitle>
              <DialogDescription>
                Create a new job posting to attract qualified candidates.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" placeholder="Enter job title" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Job location" />
                </div>
                <div>
                  <Label htmlFor="type">Employment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Enter job description and requirements" rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewJob(false)}>
                Cancel
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Post Job
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 