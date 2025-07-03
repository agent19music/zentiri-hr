import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Heart,
  FileText,
  User,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  Download,
  Target,
  Award,
  MessageSquare,
  Briefcase,
  PlusCircle,
  Shield
} from "lucide-react"

const personalStats = [
  {
    title: "Leave Balance",
    value: "18 days",
    subtext: "5 days pending approval",
    icon: Calendar,
    description: "Available vacation days",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Next Paycheck", 
    value: "$4,250",
    subtext: "December 31, 2024",
    icon: DollarSign,
    description: "Gross salary amount",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Performance Score",
    value: "4.2/5.0",
    subtext: "Exceeds expectations",
    icon: TrendingUp,
    description: "Latest review rating",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Training Progress",
    value: "3/5",
    subtext: "2 courses remaining",
    icon: GraduationCap,
    description: "Mandatory training completion",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
]

const quickActions = [
  {
    title: "Request Time Off",
    description: "Submit a new leave request",
    icon: Calendar,
    href: "/employee/leave/request",
    color: "bg-blue-500",
  },
  {
    title: "View Pay Stubs",
    description: "Download recent pay statements",
    icon: Download,
    href: "/employee/payroll/paystubs",
    color: "bg-green-500",
  },
  {
    title: "Update Profile",
    description: "Edit personal information",
    icon: User,
    href: "/employee/profile/edit",
    color: "bg-purple-500",
  },
  {
    title: "Submit Timesheet",
    description: "Log your working hours",
    icon: Clock,
    href: "/employee/time/submit",
    color: "bg-yellow-500",
  },
  {
    title: "View Benefits",
    description: "Manage health & benefits",
    icon: Heart,
    href: "/employee/benefits",
    color: "bg-pink-500",
  },
  {
    title: "Book Training",
    description: "Enroll in courses",
    icon: GraduationCap,
    href: "/employee/training",
    color: "bg-indigo-500",
  },
]

const recentPayStubs = [
  {
    period: "December 2024",
    gross: "$4,250.00",
    net: "$3,187.50",
    date: "Dec 31, 2024",
    status: "Available",
  },
  {
    period: "November 2024", 
    gross: "$4,250.00",
    net: "$3,187.50",
    date: "Nov 30, 2024",
    status: "Downloaded",
  },
  {
    period: "October 2024",
    gross: "$4,250.00", 
    net: "$3,187.50",
    date: "Oct 31, 2024",
    status: "Downloaded",
  },
]

const upcomingTraining = [
  {
    title: "Cybersecurity Awareness",
    description: "Annual security training",
    dueDate: "Jan 15, 2025",
    duration: "2 hours",
    status: "Required",
    statusColor: "bg-red-500",
  },
  {
    title: "Leadership Skills",
    description: "Advanced management techniques",
    dueDate: "Jan 30, 2025", 
    duration: "4 hours",
    status: "Recommended",
    statusColor: "bg-blue-500",
  },
  {
    title: "Communication Skills",
    description: "Effective workplace communication",
    dueDate: "Feb 15, 2025",
    duration: "3 hours", 
    status: "Optional",
    statusColor: "bg-gray-500",
  },
]

const leaveRequests = [
  {
    type: "Vacation",
    dates: "Dec 20-22, 2024",
    days: "3 days",
    status: "Approved",
    statusColor: "bg-green-500",
    submittedDate: "Dec 1, 2024",
  },
  {
    type: "Personal Leave",
    dates: "Jan 5, 2025", 
    days: "1 day",
    status: "Pending",
    statusColor: "bg-yellow-500",
    submittedDate: "Dec 15, 2024",
  },
  {
    type: "Sick Leave",
    dates: "Nov 28, 2024",
    days: "1 day", 
    status: "Approved",
    statusColor: "bg-green-500",
    submittedDate: "Nov 28, 2024",
  },
]

const announcements = [
  {
    title: "Holiday Schedule",
    content: "Company will be closed from Dec 24-26 and Jan 1",
    date: "Dec 10, 2024",
    type: "Important",
    icon: Calendar,
  },
  {
    title: "New Benefits Enrollment",
    content: "Open enrollment period is now active until Dec 31",
    date: "Dec 5, 2024", 
    type: "Action Required",
    icon: Heart,
  },
  {
    title: "Performance Reviews",
    content: "Q4 performance reviews will begin next week",
    date: "Dec 3, 2024",
    type: "FYI",
    icon: Target,
  },
]

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alice!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your work today.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact HR
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Request Leave
          </Button>
        </div>
      </div>

      {/* Personal Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {personalStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{stat.subtext}</span>
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
              Common tasks and self-service options
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

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Company Updates</CardTitle>
            <CardDescription>Latest announcements and news</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <announcement.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{announcement.title}</p>
                    <Badge variant={announcement.type === 'Important' ? 'destructive' : announcement.type === 'Action Required' ? 'default' : 'secondary'} className="text-xs">
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {announcement.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {announcement.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Pay Stubs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Pay Stubs</CardTitle>
            <CardDescription>Your latest salary information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayStubs.map((payStub, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{payStub.period}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Gross: {payStub.gross}</span>
                      <span>Net: {payStub.net}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{payStub.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={payStub.status === 'Available' ? 'default' : 'secondary'}>
                      {payStub.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Pay Stubs
            </Button>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>My Leave Requests</CardTitle>
            <CardDescription>Recent and pending time-off requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{request.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.dates} • {request.days}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {request.submittedDate}
                    </p>
                  </div>
                  <Badge className={`${request.statusColor} text-white`}>
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Requests
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Training & Benefits */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Training */}
        <Card>
          <CardHeader>
            <CardTitle>Training & Development</CardTitle>
            <CardDescription>Courses and learning opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTraining.map((training, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{training.title}</p>
                      <Badge className={`${training.statusColor} text-white text-xs`}>
                        {training.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{training.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                      <span>Due: {training.dueDate}</span>
                      <span>Duration: {training.duration}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Browse All Courses
            </Button>
          </CardContent>
        </Card>

        {/* Benefits Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits Overview</CardTitle>
            <CardDescription>Your current benefits and coverage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <Heart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Health Insurance</p>
                    <p className="text-xs text-muted-foreground">Premium Plan</p>
                  </div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">401(k) Plan</p>
                    <p className="text-xs text-muted-foreground">6% contribution</p>
                  </div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Life Insurance</p>
                    <p className="text-xs text-muted-foreground">2x annual salary</p>
                  </div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>

              <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-800">Enrollment Reminder</p>
                </div>
                <p className="text-xs text-yellow-700 mt-1">
                  Open enrollment ends Dec 31. Review your benefits and make changes.
                </p>
              </div>
            </div>
            <Button variant="ghost" className="w-full">
              Manage Benefits
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance & Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Performance & Goals</CardTitle>
          <CardDescription>Your progress and upcoming objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Current Goals</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Complete React Certification</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lead 2 Projects</span>
                    <span>50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mentor Junior Developer</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Employee of the Month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Project Deadline Met</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Q3 Goals Exceeded</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Upcoming Reviews</h3>
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <p className="text-sm font-medium">Quarterly Review</p>
                  <p className="text-xs text-muted-foreground">Scheduled: Jan 10, 2025</p>
                  <p className="text-xs text-muted-foreground">With: Sarah Johnson</p>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <p className="text-sm font-medium">360° Feedback</p>
                  <p className="text-xs text-muted-foreground">Due: Jan 20, 2025</p>
                  <p className="text-xs text-muted-foreground">Peer reviews</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 