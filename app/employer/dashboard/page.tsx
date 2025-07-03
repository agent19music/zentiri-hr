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

const quickActions = [
  {
    title: "Add New Employee",
    description: "Onboard a new team member",
    icon: Users,
    href: "/employer/employees/add",
    color: "bg-blue-500",
  },
  {
    title: "Post Job Opening",
    description: "Create and publish job listing",
    icon: UserPlus,
    href: "/employer/recruitment/jobs/create",
    color: "bg-green-500",
  },
  {
    title: "Run Payroll",
    description: "Process monthly payroll",
    icon: DollarSign,
    href: "/employer/payroll/runs",
    color: "bg-yellow-500",
  },
  {
    title: "Generate Report",
    description: "Create custom analytics report",
    icon: FileText,
    href: "/employer/analytics/reports",
    color: "bg-purple-500",
  },
  {
    title: "Performance Review",
    description: "Schedule performance evaluations",
    icon: Target,
    href: "/employer/performance/reviews",
    color: "bg-pink-500",
  },
  {
    title: "Training Program",
    description: "Assign learning modules",
    icon: BookOpen,
    href: "/employer/training/assignments",
    color: "bg-indigo-500",
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
        {statsCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className={`flex items-center ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  <span>{stat.change}</span>
                </div>
                <span>•</span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used tasks to manage your workforce
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-muted/50"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${action.color}`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="flex items-center space-x-3">
                <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{dept.name}</p>
                    <span className="text-sm text-muted-foreground">{dept.count}</span>
                  </div>
                  <Progress value={dept.percentage} className="h-2 mt-1" />
                </div>
              </div>
            ))}
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
            <CardDescription>Pending and recent leave requests</CardDescription>
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
                    <p className="text-sm font-medium">{request.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.type} • {request.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={request.status === 'Approved' ? 'default' : 'secondary'}>
                      {request.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {request.dates}
                    </p>
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
            <CardTitle>Employee Satisfaction</CardTitle>
            <CardDescription>Latest survey results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">4.2</div>
              <p className="text-sm text-muted-foreground">out of 5.0</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Work-life balance</span>
                <span>4.1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Career growth</span>
                <span>4.3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Management</span>
                <span>4.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Benefits</span>
                <span>4.4</span>
              </div>
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