"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Award, 
  AlertTriangle,
  Star,
  Eye,
  MessageSquare,
  Calendar,
  Filter,
  Search,
  FileText,
  UserCheck,
  Building2,
  Clock,
  CheckCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const performanceStats = [
  {
    title: "Top Performers",
    value: "24",
    change: "+3 this month",
    changeType: "increase" as const,
    icon: Award,
    description: "Exceeding expectations",
  },
  {
    title: "Average Score",
    value: "8.2/10",
    change: "+0.3 points",
    changeType: "increase" as const,
    icon: Target,
    description: "Company-wide average",
  },
  {
    title: "At Risk",
    value: "12",
    change: "-2 this month",
    changeType: "decrease" as const,
    icon: AlertTriangle,
    description: "Need improvement",
  },
  {
    title: "Reviews Due",
    value: "8",
    change: "This week",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "Scheduled evaluations",
  },
]

const employeePerformance = [
  {
    id: "EMP-001",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      department: "Engineering",
      position: "Senior Developer"
    },
    overallScore: 9.2,
    productivity: 95,
    quality: 92,
    goals: { completed: 8, total: 10 },
    trend: "up",
    status: "excellent",
    feedback: "Consistently delivers high-quality work"
  },
  {
    id: "EMP-002",
    employee: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      department: "Product",
      position: "Product Manager"
    },
    overallScore: 8.7,
    productivity: 89,
    quality: 91,
    goals: { completed: 7, total: 9 },
    trend: "up",
    status: "good",
    feedback: "Strong leadership skills"
  },
  {
    id: "EMP-003",
    employee: {
      name: "Emily Rodriguez",
      avatar: "/placeholder-user.jpg",
      department: "Design",
      position: "UX Designer"
    },
    overallScore: 8.1,
    productivity: 82,
    quality: 88,
    goals: { completed: 6, total: 8 },
    trend: "stable",
    status: "good",
    feedback: "Creative problem solver"
  },
  {
    id: "EMP-004",
    employee: {
      name: "David Kim",
      avatar: "/placeholder-user.jpg",
      department: "Marketing",
      position: "Marketing Manager"
    },
    overallScore: 6.8,
    productivity: 65,
    quality: 72,
    goals: { completed: 3, total: 8 },
    trend: "down",
    status: "needs_improvement",
    feedback: "Missing deadlines and needs improvement"
  },
  {
    id: "EMP-005",
    employee: {
      name: "Lisa Wang",
      avatar: "/placeholder-user.jpg",
      department: "Sales",
      position: "Sales Representative"
    },
    overallScore: 9.5,
    productivity: 98,
    quality: 94,
    goals: { completed: 10, total: 10 },
    trend: "up",
    status: "excellent",
    feedback: "Top performer exceeding targets"
  },
  {
    id: "EMP-006",
    employee: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      department: "Engineering",
      position: "Junior Developer"
    },
    overallScore: 5.9,
    productivity: 58,
    quality: 62,
    goals: { completed: 2, total: 6 },
    trend: "down",
    status: "at_risk",
    feedback: "Struggling with tasks, needs intervention"
  },
]

const topPerformers = employeePerformance
  .filter(emp => emp.status === "excellent")
  .sort((a, b) => b.overallScore - a.overallScore)

const atRiskEmployees = employeePerformance
  .filter(emp => emp.status === "needs_improvement" || emp.status === "at_risk")
  .sort((a, b) => a.overallScore - b.overallScore)

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "bg-green-500"
    case "good":
      return "bg-blue-500"
    case "needs_improvement":
      return "bg-yellow-500"
    case "at_risk":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "excellent":
      return "Excellent"
    case "good":
      return "Good"
    case "needs_improvement":
      return "Needs Improvement"
    case "at_risk":
      return "At Risk"
    default:
      return "Unknown"
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingDown className="h-4 w-4 text-red-500" />
    default:
      return <div className="h-4 w-4" />
  }
}

export default function PerformancePage() {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Management</h1>
          <p className="text-muted-foreground">
            Track employee performance, identify top performers, and manage improvement plans.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Performance Report
          </Button>
          <Button size="sm" onClick={() => setShowScheduleDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceStats.map((stat) => (
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
                {stat.changeType === "decrease" && (
                  <TrendingDown className="h-3 w-3 text-green-500" />
                )}
                <span className={
                  stat.changeType === "increase" ? "text-green-500" :
                  stat.changeType === "decrease" ? "text-green-500" : ""
                }>
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="at-risk">At Risk</TabsTrigger>
          <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Employee Performance Overview</CardTitle>
                  <CardDescription>
                    Complete performance metrics and rankings for all employees
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search employees..." className="pl-8 w-64" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                      <SelectItem value="at_risk">At Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Productivity</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Goals</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeePerformance
                    .sort((a, b) => b.overallScore - a.overallScore)
                    .map((employee, index) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                            {index + 1}
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.employee.avatar} />
                            <AvatarFallback>
                              {employee.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {employee.employee.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{employee.employee.department}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg">{employee.overallScore}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(employee.overallScore / 2)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{employee.productivity}%</div>
                          <Progress value={employee.productivity} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{employee.quality}%</div>
                          <Progress value={employee.quality} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="font-medium">{employee.goals.completed}</span>
                          <span className="text-muted-foreground">/{employee.goals.total}</span>
                        </div>
                        <Progress 
                          value={(employee.goals.completed / employee.goals.total) * 100} 
                          className="h-2 mt-1" 
                        />
                      </TableCell>
                      <TableCell>
                        {getTrendIcon(employee.trend)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(employee.status)} text-white`}
                        >
                          {getStatusLabel(employee.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-performers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Top Performers</span>
              </CardTitle>
              <CardDescription>
                Employees demonstrating exceptional performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((employee, index) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-full">
                        <span className="text-yellow-600 font-bold">#{index + 1}</span>
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.employee.avatar} />
                        <AvatarFallback>
                          {employee.employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-lg">{employee.employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.employee.position} &bull; {employee.employee.department}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {employee.feedback}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold mb-2">{employee.overallScore}</div>
                      <div className="text-sm text-muted-foreground">
                        Goals: {employee.goals.completed}/{employee.goals.total}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="at-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>At Risk Employees</span>
              </CardTitle>
              <CardDescription>
                Employees requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atRiskEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.employee.avatar} />
                        <AvatarFallback>
                          {employee.employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-lg">{employee.employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {employee.employee.position} &bull; {employee.employee.department}
                        </div>
                        <div className="text-sm text-red-600 mt-1 font-medium">
                          {employee.feedback}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-600 mb-2">
                        {employee.overallScore}
                      </div>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-600">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Schedule 1:1
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>
                Scheduled and completed performance review cycles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Performance review management will be displayed here.</p>
                <p className="text-sm">Schedule reviews, track progress, and manage evaluations.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule Performance Review Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <span>Schedule Performance Review</span>
            </DialogTitle>
            <DialogDescription>
              Schedule a performance review session with an employee to discuss their progress and goals.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewEmployee">Select Employee</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employeePerformance.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.employee.name} - {employee.employee.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reviewType">Review Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select review type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">Quarterly Review</SelectItem>
                    <SelectItem value="annual">Annual Review</SelectItem>
                    <SelectItem value="mid-year">Mid-Year Review</SelectItem>
                    <SelectItem value="probation">Probation Review</SelectItem>
                    <SelectItem value="promotion">Promotion Review</SelectItem>
                    <SelectItem value="improvement">Performance Improvement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewDate">Review Date</Label>
                <Input id="reviewDate" type="date" />
              </div>
              <div>
                <Label htmlFor="reviewTime">Review Time</Label>
                <Input id="reviewTime" type="time" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location/Meeting Link</Label>
                <Input id="location" placeholder="Conference Room A or Zoom link" />
              </div>
            </div>

            <div>
              <Label htmlFor="reviewAgenda">Review Agenda & Notes</Label>
              <Textarea 
                id="reviewAgenda" 
                placeholder="Outline key topics to discuss:&#10;• Performance goals review&#10;• Achievement highlights&#10;• Areas for improvement&#10;• Career development plans&#10;• Feedback and concerns"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reviewers">Additional Reviewers</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Include other managers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Just me</SelectItem>
                    <SelectItem value="hr">HR Representative</SelectItem>
                    <SelectItem value="peer">Peer Reviewer</SelectItem>
                    <SelectItem value="senior">Senior Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Review Preparation</span>
              </div>
              <div className="text-sm text-green-700 space-y-1">
                <p>• Employee will receive calendar invitation and preparation materials</p>
                <p>• Self-assessment form will be sent 1 week before the review</p>
                <p>• Performance data and goals will be automatically compiled</p>
                <p>• Reminder notifications will be sent to all participants</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Here you would typically handle review scheduling
              console.log('Scheduling performance review...')
              setShowScheduleDialog(false)
            }}>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

