"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Target,
  Award,
  BookOpen,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"

const statsCards = [
  {
    title: "Total Employees",
    value: "342",
    change: "+12",
    changeType: "increase" as const,
    icon: Users,
    description: "5 new hires this month",
  },
  {
    title: "Open Positions", 
    value: "12",
    change: "-3",
    changeType: "decrease" as const,
    icon: UserPlus,
    description: "3 positions filled recently",
  },
  {
    title: "Monthly Payroll",
    value: "$285,420",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: DollarSign,
    description: "Including benefits & taxes",
  },
  {
    title: "Pending Approvals",
    value: "8",
    change: "+2",
    changeType: "increase" as const,
    icon: Clock,
    description: "Leave requests & expense claims",
  },
]

const recentApplications = [
  {
    name: "Sarah Johnson",
    position: "Frontend Developer",
    avatar: "/placeholder-user.jpg",
    appliedAt: "2 hours ago",
    status: "Under Review",
    statusColor: "bg-yellow-500",
  },
  {
    name: "Michael Chen",
    position: "Product Manager", 
    avatar: "/placeholder-user.jpg",
    appliedAt: "4 hours ago",
    status: "Interview Scheduled",
    statusColor: "bg-blue-500",
  },
  {
    name: "Emily Rodriguez",
    position: "UX Designer",
    avatar: "/placeholder-user.jpg", 
    appliedAt: "1 day ago",
    status: "Offer Extended",
    statusColor: "bg-green-500",
  },
]

const leaveRequests = [
  {
    name: "David Kim",
    type: "Vacation",
    duration: "3 days",
    dates: "Dec 20-22",
    status: "Pending",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Lisa Wang",
    type: "Sick Leave",
    duration: "1 day", 
    dates: "Dec 18",
    status: "Approved",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "John Smith",
    type: "Personal",
    duration: "2 days",
    dates: "Dec 25-26", 
    status: "Pending",
    avatar: "/placeholder-user.jpg",
  },
]

const departmentStats = [
  { name: "Engineering", count: 45, percentage: 35, color: "bg-blue-500" },
  { name: "Sales", count: 32, percentage: 25, color: "bg-green-500" },
  { name: "Marketing", count: 24, percentage: 19, color: "bg-purple-500" },
  { name: "HR", count: 8, percentage: 6, color: "bg-yellow-500" },
  { name: "Finance", count: 12, percentage: 9, color: "bg-pink-500" },
  { name: "Operations", count: 7, percentage: 6, color: "bg-indigo-500" },
]

export default function EmployerDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your team today.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className={`flex items-center space-x-1 ${
                  card.changeType === "increase" 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {card.changeType === "increase" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  <span>{card.change}</span>
                </div>
                <span>from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{dept.name}</p>
                  <p className="text-xs text-muted-foreground">{dept.count} employees</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{dept.percentage}%</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">New employee Sarah Johnson joined Engineering</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Q4 performance reviews completed</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">8 leave requests pending approval</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <UserPlus className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Job posting for Senior Developer published</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest job applications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.name} className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={application.avatar} alt={application.name} />
                    <AvatarFallback>{application.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{application.name}</p>
                    <p className="text-sm text-muted-foreground">{application.position}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${application.statusColor} text-white`}>
                      {application.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {application.appliedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Applications
            </Button>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Pending leave requests for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.name} className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.avatar} alt={request.name} />
                    <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{request.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.type} • {request.duration}
                    </p>
                    <p className="text-xs text-muted-foreground">{request.dates}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={request.status === "Approved" ? "default" : "secondary"}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Requests
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recruitment Pipeline</CardTitle>
            <CardDescription>Current hiring progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Applications</span>
              <span className="text-sm font-medium">147</span>
            </div>
            <Progress value={90} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Interviews</span>
              <span className="text-sm font-medium">32</span>
            </div>
            <Progress value={60} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Offers</span>
              <span className="text-sm font-medium">8</span>
            </div>
            <Progress value={25} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Hired</span>
              <span className="text-sm font-medium">5</span>
            </div>
            <Progress value={15} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
            <CardDescription>Employee development metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Courses Completed</span>
              <span className="text-sm font-medium">89%</span>
            </div>
            <Progress value={89} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Certifications</span>
              <span className="text-sm font-medium">76%</span>
            </div>
            <Progress value={76} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Skills Assessment</span>
              <span className="text-sm font-medium">82%</span>
            </div>
            <Progress value={82} className="h-2" />
            
            <div className="flex items-center space-x-2 pt-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">23 employees in active training</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Regulatory compliance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">GDPR Compliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Payroll Tax Filing</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Safety Training (Due Soon)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Equal Opportunity</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
