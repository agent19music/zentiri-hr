"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  GraduationCap,
  Target,
  Download,
  Filter,
  RefreshCw,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const analyticsOverview = [
  {
    title: "Employee Satisfaction",
    value: "87%",
    change: "+5% from last quarter",
    changeType: "increase" as const,
    icon: Users,
    description: "Overall satisfaction score",
  },
  {
    title: "Productivity Index",
    value: "8.4/10",
    change: "+0.6 this month",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "Company productivity average",
  },
  {
    title: "Turnover Rate",
    value: "6%",
    change: "3% below industry avg",
    changeType: "increase" as const,
    icon: AlertTriangle,
    description: "Annual turnover rate",
  },
  {
    title: "Retention Rate",
    value: "94%",
    change: "2% above industry",
    changeType: "increase" as const,
    icon: Target,
    description: "12-month retention rate",
  },
]

// Sample data for charts - in a real app, this would come from APIs
const departmentPerformance = [
  { department: "Engineering", performance: 92, employees: 45, trend: "up" },
  { department: "Sales", performance: 89, employees: 32, trend: "up" },
  { department: "Marketing", performance: 85, employees: 24, trend: "stable" },
  { department: "Product", performance: 91, employees: 18, trend: "up" },
  { department: "HR", performance: 87, employees: 8, trend: "stable" },
  { department: "Finance", performance: 88, employees: 12, trend: "up" },
]

const payrollTrends = [
  { month: "Jan", amount: 245000, bonus: 18000, overtime: 12000 },
  { month: "Feb", amount: 252000, bonus: 22000, overtime: 8000 },
  { month: "Mar", amount: 248000, bonus: 15000, overtime: 15000 },
  { month: "Apr", amount: 255000, bonus: 28000, overtime: 10000 },
  { month: "May", amount: 262000, bonus: 25000, overtime: 18000 },
  { month: "Jun", amount: 268000, bonus: 30000, overtime: 14000 },
]

const leavePatterns = [
  { type: "Vacation", taken: 324, available: 156, percentage: 67 },
  { type: "Sick Leave", taken: 89, available: 211, percentage: 30 },
  { type: "Personal", taken: 156, available: 94, percentage: 62 },
  { type: "Maternity/Paternity", taken: 45, available: 355, percentage: 11 },
]

const trainingMetrics = [
  { category: "Communication", completed: 156, enrolled: 180, completion: 87 },
  { category: "Leadership", completed: 89, enrolled: 120, completion: 74 },
  { category: "Technical Skills", completed: 234, enrolled: 280, completion: 84 },
  { category: "Team Building", completed: 98, enrolled: 110, completion: 89 },
  { category: "Personal Development", completed: 167, enrolled: 200, completion: 84 },
]

// Heat map data for employee activity
const activityHeatmap = [
  { day: "Mon", hour: "9", value: 85 },
  { day: "Mon", hour: "10", value: 92 },
  { day: "Mon", hour: "11", value: 88 },
  { day: "Mon", hour: "14", value: 78 },
  { day: "Mon", hour: "15", value: 82 },
  { day: "Mon", hour: "16", value: 75 },
  { day: "Tue", hour: "9", value: 90 },
  { day: "Tue", hour: "10", value: 95 },
  { day: "Tue", hour: "11", value: 89 },
  { day: "Tue", hour: "14", value: 85 },
  { day: "Tue", hour: "15", value: 88 },
  { day: "Tue", hour: "16", value: 82 },
  { day: "Wed", hour: "9", value: 87 },
  { day: "Wed", hour: "10", value: 93 },
  { day: "Wed", hour: "11", value: 91 },
  { day: "Wed", hour: "14", value: 79 },
  { day: "Wed", hour: "15", value: 84 },
  { day: "Wed", hour: "16", value: 78 },
  { day: "Thu", hour: "9", value: 89 },
  { day: "Thu", hour: "10", value: 94 },
  { day: "Thu", hour: "11", value: 90 },
  { day: "Thu", hour: "14", value: 82 },
  { day: "Thu", hour: "15", value: 86 },
  { day: "Thu", hour: "16", value: 80 },
  { day: "Fri", hour: "9", value: 84 },
  { day: "Fri", hour: "10", value: 88 },
  { day: "Fri", hour: "11", value: 85 },
  { day: "Fri", hour: "14", value: 72 },
  { day: "Fri", hour: "15", value: 68 },
  { day: "Fri", hour: "16", value: 65 },
]

// Turnover analysis data
const turnoverData = [
  { 
    department: "Engineering", 
    turnoverRate: 4.2, 
    exitReasons: [
      { reason: "Career Growth", count: 2 },
      { reason: "Compensation", count: 1 },
      { reason: "Work-life Balance", count: 1 }
    ],
    averageTenure: "2.8 years",
    exitCost: 125000
  },
  { 
    department: "Sales", 
    turnoverRate: 8.1, 
    exitReasons: [
      { reason: "Better Opportunity", count: 3 },
      { reason: "Territory Changes", count: 2 },
      { reason: "Commission Structure", count: 1 }
    ],
    averageTenure: "1.9 years",
    exitCost: 87000
  },
  { 
    department: "Marketing", 
    turnoverRate: 5.7, 
    exitReasons: [
      { reason: "Career Growth", count: 2 },
      { reason: "Company Culture", count: 1 }
    ],
    averageTenure: "2.3 years",
    exitCost: 96000
  },
  { 
    department: "Product", 
    turnoverRate: 3.1, 
    exitReasons: [
      { reason: "Relocation", count: 1 }
    ],
    averageTenure: "3.2 years",
    exitCost: 145000
  }
]

// Strategic workforce planning data
const workforceScenarios = [
  {
    name: "Conservative Growth",
    headcountChange: "+15%",
    timeline: "12 months",
    budgetImpact: "+$2.8M",
    departments: [
      { name: "Engineering", current: 45, target: 52, priority: "high" },
      { name: "Sales", current: 32, target: 36, priority: "medium" },
      { name: "Marketing", current: 24, target: 26, priority: "low" },
      { name: "Product", current: 18, target: 21, priority: "high" }
    ],
    riskFactors: ["Skills shortage", "Competition for talent"],
    expectedROI: "145%"
  },
  {
    name: "Aggressive Expansion",
    headcountChange: "+35%",
    timeline: "18 months",
    budgetImpact: "+$6.2M",
    departments: [
      { name: "Engineering", current: 45, target: 65, priority: "high" },
      { name: "Sales", current: 32, target: 48, priority: "high" },
      { name: "Marketing", current: 24, target: 35, priority: "medium" },
      { name: "Product", current: 18, target: 28, priority: "high" }
    ],
    riskFactors: ["Market uncertainty", "Rapid scaling challenges", "Cultural dilution"],
    expectedROI: "180%"
  },
  {
    name: "Optimization Focus",
    headcountChange: "+5%",
    timeline: "6 months",
    budgetImpact: "+$1.1M",
    departments: [
      { name: "Engineering", current: 45, target: 47, priority: "medium" },
      { name: "Sales", current: 32, target: 34, priority: "low" },
      { name: "Marketing", current: 24, target: 24, priority: "low" },
      { name: "Product", current: 18, target: 19, priority: "high" }
    ],
    riskFactors: ["Limited growth potential"],
    expectedROI: "125%"
  }
]

// Audit trail data
const auditTrail = [
  {
    timestamp: "2024-01-15 09:23:15",
    user: "Sarah Chen",
    role: "HR Manager",
    action: "Viewed Employee Profile",
    resource: "James Mukiri (EMP-001)",
    ipAddress: "192.168.1.45",
    location: "Nairobi, Kenya",
    riskLevel: "low"
  },
  {
    timestamp: "2024-01-15 09:18:42",
    user: "David Wilson",
    role: "Department Manager",
    action: "Updated Salary Information",
    resource: "Grace Wanjiku (EMP-015)",
    ipAddress: "192.168.1.67",
    location: "Nairobi, Kenya",
    riskLevel: "medium"
  },
  {
    timestamp: "2024-01-15 08:45:33",
    user: "Michael Torres",
    role: "Team Lead",
    action: "Downloaded Payroll Report",
    resource: "Sales Department Payroll",
    ipAddress: "192.168.1.23",
    location: "Mombasa, Kenya",
    riskLevel: "high"
  },
  {
    timestamp: "2024-01-15 08:32:17",
    user: "Lisa Wang",
    role: "Manager",
    action: "Accessed Performance Reviews",
    resource: "Q4 2023 Reviews",
    ipAddress: "192.168.1.89",
    location: "Kisumu, Kenya",
    riskLevel: "medium"
  },
  {
    timestamp: "2024-01-15 08:15:28",
    user: "John Admin",
    role: "System Admin",
    action: "Modified User Permissions",
    resource: "Employee Access Rights",
    ipAddress: "192.168.1.1",
    location: "Nairobi, Kenya",
    riskLevel: "high"
  }
]

const getHeatmapColor = (value: number) => {
  if (value >= 90) return "bg-green-500"
  if (value >= 80) return "bg-green-400"
  if (value >= 70) return "bg-yellow-400"
  if (value >= 60) return "bg-orange-400"
  return "bg-red-400"
}

const getDepartmentTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <Activity className="h-4 w-4 text-gray-500" />
  }
}

const getTurnoverColor = (rate: number) => {
  if (rate <= 5) return "text-green-600"
  if (rate <= 10) return "text-yellow-600"
  return "text-red-600"
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into employee performance, payroll, training, and organizational health.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Select defaultValue="30days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 Days</SelectItem>
              <SelectItem value="30days">30 Days</SelectItem>
              <SelectItem value="90days">90 Days</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsOverview.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.changeType === "increase" && (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                )}
                <span className={
                  stat.changeType === "increase" ? "text-green-500" : ""
                }>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Insights</TabsTrigger>
          <TabsTrigger value="leave">Leave Patterns</TabsTrigger>
          <TabsTrigger value="training">Training Analytics</TabsTrigger>
          <TabsTrigger value="turnover">Turnover Analysis</TabsTrigger>
          <TabsTrigger value="workforce">Workforce Planning</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="heatmap">Activity Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance Overview</CardTitle>
                <CardDescription>Performance scores by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept) => (
                    <div key={dept.department} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="font-medium">{dept.department}</span>
                        <Badge variant="outline">{dept.employees} employees</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="font-bold">{dept.performance}%</div>
                        </div>
                        {getDepartmentTrendIcon(dept.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics Summary</CardTitle>
                <CardDescription>Critical organizational indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">High Performers</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">24</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Need Attention</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Pending Reviews</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Training Completion</span>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">84%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>Employee performance breakdown across all departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentPerformance.map((dept) => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{dept.department}</span>
                      <span>{dept.performance}%</span>
                    </div>
                    <Progress value={dept.performance} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {dept.employees} employees &bull; Trend: {dept.trend}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Payroll Trends</CardTitle>
                <CardDescription>6-month payroll analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payrollTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{month.month}</div>
                        <div className="text-sm text-muted-foreground">
                          Bonus: ${(month.bonus / 1000).toFixed(0)}k &bull; OT: ${(month.overtime / 1000).toFixed(0)}k
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">${(month.amount / 1000).toFixed(0)}k</div>
                        <div className="text-sm text-muted-foreground">Total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payroll Distribution</CardTitle>
                <CardDescription>Breakdown of payroll components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Salaries</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bonuses</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overtime</span>
                      <span>7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Other</span>
                      <span>3%</span>
                    </div>
                    <Progress value={3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Usage Patterns</CardTitle>
              <CardDescription>Analysis of leave types and utilization rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {leavePatterns.map((leave) => (
                  <div key={leave.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{leave.type}</span>
                      <div className="text-sm text-muted-foreground">
                        {leave.taken} taken &bull; {leave.available} remaining
                      </div>
                    </div>
                    <Progress value={leave.percentage} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                      {leave.percentage}% utilization rate
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Completion Analytics</CardTitle>
              <CardDescription>Progress across different training categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trainingMetrics.map((training) => (
                  <div key={training.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{training.category}</span>
                      <div className="text-sm text-muted-foreground">
                        {training.completed}/{training.enrolled} completed
                      </div>
                    </div>
                    <Progress value={training.completion} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                      {training.completion}% completion rate
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnover" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Turnover Rate by Department</CardTitle>
                <CardDescription>Annual turnover analysis and exit reasons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {turnoverData.map((dept) => (
                    <div key={dept.department} className="p-4 border rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{dept.department}</span>
                        <span className={`font-bold ${getTurnoverColor(dept.turnoverRate)}`}>
                          {dept.turnoverRate}%
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg Tenure: {dept.averageTenure} • Exit Cost: ${dept.exitCost.toLocaleString()}
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground">Top Exit Reasons:</div>
                        {dept.exitReasons.slice(0, 2).map((reason, idx) => (
                          <div key={idx} className="text-xs flex justify-between">
                            <span>{reason.reason}</span>
                            <span>{reason.count} employees</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Turnover Impact Analysis</CardTitle>
                <CardDescription>Cost and trend analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-sm font-medium text-red-800">Total Annual Cost</div>
                    <div className="text-2xl font-bold text-red-600">
                      ${turnoverData.reduce((sum, dept) => sum + dept.exitCost, 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-red-600">
                      Average cost per exit: ${Math.round(turnoverData.reduce((sum, dept) => sum + dept.exitCost, 0) / turnoverData.length).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-800">Company Average</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {(turnoverData.reduce((sum, dept) => sum + dept.turnoverRate, 0) / turnoverData.length).toFixed(1)}%
                    </div>
                    <div className="text-xs text-blue-600">Industry benchmark: 8.5%</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Retention Initiatives</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Career Development Programs</span>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Flexible Work Arrangements</span>
                        <Badge variant="outline" className="text-green-600">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Compensation Review</span>
                        <Badge variant="outline" className="text-yellow-600">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workforce" className="space-y-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Strategic Workforce Planning</CardTitle>
                <CardDescription>AI-powered headcount scenarios for different growth strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 lg:grid-cols-3">
                  {workforceScenarios.map((scenario) => (
                    <div key={scenario.name} className="border rounded-lg p-4 space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{scenario.name}</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Headcount:</span>
                            <span className="ml-1 font-medium">{scenario.headcountChange}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Timeline:</span>
                            <span className="ml-1 font-medium">{scenario.timeline}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Budget:</span>
                            <span className="ml-1 font-medium">{scenario.budgetImpact}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ROI:</span>
                            <span className="ml-1 font-medium text-green-600">{scenario.expectedROI}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-medium">Department Changes</div>
                        {scenario.departments.map((dept) => (
                          <div key={dept.name} className="flex justify-between items-center text-sm">
                            <span>{dept.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-muted-foreground">
                                {dept.current} → {dept.target}
                              </span>
                              <Badge className={getPriorityColor(dept.priority)}>
                                {dept.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Risk Factors</div>
                        <div className="space-y-1">
                          {scenario.riskFactors.map((risk, idx) => (
                            <div key={idx} className="text-xs text-red-600 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {risk}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Target className="mr-2 h-4 w-4" />
                        Select Scenario
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productivity Analysis</CardTitle>
                <CardDescription>AI insights for workforce optimization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg text-center">
                    <Zap className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold">127%</div>
                    <div className="text-sm text-muted-foreground">Productivity vs Industry</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <Target className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">8.4/10</div>
                    <div className="text-sm text-muted-foreground">Efficiency Score</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">+15%</div>
                    <div className="text-sm text-muted-foreground">YoY Growth Potential</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Trail</CardTitle>
              <CardDescription>Track database access and sensitive operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Risk
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Audit Log
                  </Button>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>High Risk</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Medium Risk</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Low Risk</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {auditTrail.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            entry.riskLevel === 'high' ? 'bg-red-500' : 
                            entry.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <Badge className={getRiskLevelColor(entry.riskLevel)}>
                            {entry.riskLevel}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{entry.action}</div>
                          <div className="text-xs text-muted-foreground">
                            {entry.user} ({entry.role}) • {entry.resource}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xs text-muted-foreground">{entry.timestamp}</div>
                        <div className="text-xs text-muted-foreground">
                          {entry.location} • {entry.ipAddress}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3 pt-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-sm font-medium text-red-800">High Risk Actions</div>
                    <div className="text-2xl font-bold text-red-600">
                      {auditTrail.filter(entry => entry.riskLevel === 'high').length}
                    </div>
                    <div className="text-xs text-red-600">Last 24 hours</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-sm font-medium text-yellow-800">Medium Risk Actions</div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {auditTrail.filter(entry => entry.riskLevel === 'medium').length}
                    </div>
                    <div className="text-xs text-yellow-600">Last 24 hours</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-green-800">Total Actions</div>
                    <div className="text-2xl font-bold text-green-600">{auditTrail.length}</div>
                    <div className="text-xs text-green-600">Last 24 hours</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Activity Heatmap</CardTitle>
              <CardDescription>
                Visual representation of employee productivity throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-2 text-xs text-center">
                  <div></div>
                  <div>9 AM</div>
                  <div>10 AM</div>
                  <div>11 AM</div>
                  <div>2 PM</div>
                  <div>3 PM</div>
                </div>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <div key={day} className="grid grid-cols-6 gap-2 items-center">
                    <div className="text-xs font-medium text-right">{day}</div>
                    {["9", "10", "11", "14", "15"].map((hour) => {
                      const dataPoint = activityHeatmap.find(
                        (item) => item.day === day && item.hour === hour
                      )
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className={`h-8 rounded flex items-center justify-center text-xs font-medium text-white ${
                            dataPoint ? getHeatmapColor(dataPoint.value) : "bg-gray-200"
                          }`}
                          title={`${day} ${hour}:00 - ${dataPoint?.value || 0}% activity`}
                        >
                          {dataPoint?.value || 0}
                        </div>
                      )
                    })}
                  </div>
                ))}
                <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span>Low (60-69%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span>Medium (70-79%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>High (80-89%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Very High (90%+)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
