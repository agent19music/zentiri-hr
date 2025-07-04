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
  Activity,
  Download,
  GraduationCap
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { DynamicDataService } from "@/lib/dynamic-data"
import { PDFExportService } from "@/lib/pdf-export"
import { PerformanceSystem } from "@/lib/performance-system"

// Dynamic data is now loaded in the component

export default function EmployerDashboard() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  // Get dynamic data based on user and organization
  const orgStats = DynamicDataService.getOrganizationStats(user)
  const departmentData = DynamicDataService.getDepartmentData(user)
  const recentActivity = DynamicDataService.getRecentActivity(user)
  const greetingMessage = DynamicDataService.getGreetingMessage(user)
  const performanceStats = PerformanceSystem.getDepartmentPerformanceStats(user)

  // Dynamic stats cards based on organization data
  const dynamicStatsCards = [
    {
      title: "Total Employees",
      value: orgStats.totalEmployees.toString(),
      change: "+5",
      changeType: "increase" as const,
      icon: Users,
      description: "Active team members",
    },
    {
      title: "Open Positions", 
      value: orgStats.openPositions.toString(),
      change: "-2",
      changeType: "decrease" as const,
      icon: UserPlus,
      description: "Positions to fill",
    },
    {
      title: "Monthly Payroll",
      value: orgStats.monthlyPayroll,
      change: "+8.2%",
      changeType: "increase" as const,
      icon: DollarSign,
      description: "Including benefits & taxes",
    },
    {
      title: "Pending Approvals",
      value: orgStats.pendingApprovals.toString(),
      change: "+2",
      changeType: "increase" as const,
      icon: Clock,
      description: "Leave requests & expense claims",
    },
  ]

  const handleGenerateReport = async () => {
    try {
      await PDFExportService.generateOrganizationReport(user)
    } catch (error) {
      console.error('Failed to generate report:', error)
    }
  }

  const handleGeneratePayrollReport = async () => {
    try {
      await PDFExportService.generatePayrollReport(user)
    } catch (error) {
      console.error('Failed to generate payroll report:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {greetingMessage}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.location.href = '/employer/analytics'}>
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button variant="outline" size="sm" onClick={handleGeneratePayrollReport}>
            <DollarSign className="mr-2 h-4 w-4" />
            Payroll Report
          </Button>
          <Button size="sm" onClick={handleGenerateReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dynamicStatsCards.map((card) => (
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
            {departmentData.map((dept) => (
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
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest organization updates and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center`}>
                    {activity.icon === 'Users' && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.icon === 'CheckCircle' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {activity.icon === 'GraduationCap' && <GraduationCap className="h-4 w-4 text-purple-600" />}
                    {activity.icon === 'Calendar' && <Calendar className="h-4 w-4 text-blue-600" />}
                    {activity.icon === 'Target' && <Target className="h-4 w-4 text-green-600" />}
                    {activity.icon === 'Shield' && <Activity className="h-4 w-4 text-yellow-600" />}
                    {activity.icon === 'TrendingUp' && <TrendingUp className="h-4 w-4 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Department performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Team Members</span>
                <span className="text-sm font-medium">{performanceStats.totalEmployees}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Score</span>
                <span className="text-sm font-medium">{performanceStats.averageScore.toFixed(1)}/5.0</span>
              </div>
              <Progress value={performanceStats.averageScore * 20} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm">High Performers</span>
                <span className="text-sm font-medium">{performanceStats.highPerformers}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Overdue Reviews</span>
                <span className="text-sm font-medium">{performanceStats.overdueReviews}</span>
              </div>
              
              {performanceStats.topPerformer && (
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Top Performer:</p>
                  <p className="text-sm font-medium">{performanceStats.topPerformer.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {performanceStats.topPerformer.currentScore}/5.0
                  </Badge>
                </div>
              )}
            </div>
            <Button variant="ghost" className="w-full mt-4" onClick={() => window.location.href = '/employer/performance'}>
              Manage Performance
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
