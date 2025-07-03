import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Users,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Search,
  Eye,
  MessageSquare,
  Plane,
  Heart,
  Baby,
  GraduationCap,
  Home
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const leaveStats = [
  {
    title: "Pending Requests",
    value: "18",
    change: "+5 this week",
    changeType: "increase" as const,
    icon: Clock,
    description: "Awaiting approval",
  },
  {
    title: "Approved This Month",
    value: "142",
    change: "+12% vs last month",
    changeType: "increase" as const,
    icon: CheckCircle,
    description: "Total approved leaves",
  },
  {
    title: "Average Leave Days",
    value: "18.5",
    change: "Per employee/year",
    changeType: "neutral" as const,
    icon: Calendar,
    description: "Company average",
  },
  {
    title: "Currently Out",
    value: "24",
    change: "7% of workforce",
    changeType: "neutral" as const,
    icon: Users,
    description: "Employees on leave",
  },
]

const leaveRequests = [
  {
    id: "LR-001",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
      department: "Engineering",
      position: "Senior Developer",
      email: "sarah.johnson@company.com"
    },
    leaveType: "Vacation",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    days: 4,
    reason: "Family vacation to Europe",
    status: "Pending",
    appliedDate: "2024-01-20",
    remainingLeaves: {
      vacation: 18,
      sick: 10,
      personal: 5
    },
    manager: "John Smith"
  },
  {
    id: "LR-002",
    employee: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
      department: "Product",
      position: "Product Manager",
      email: "michael.chen@company.com"
    },
    leaveType: "Sick Leave",
    startDate: "2024-01-28",
    endDate: "2024-01-30",
    days: 3,
    reason: "Medical procedure and recovery",
    status: "Approved",
    appliedDate: "2024-01-25",
    remainingLeaves: {
      vacation: 22,
      sick: 7,
      personal: 8
    },
    manager: "Lisa Williams"
  },
  {
    id: "LR-003",
    employee: {
      name: "Emily Rodriguez",
      avatar: "/placeholder-user.jpg",
      department: "Design",
      position: "UX Designer",
      email: "emily.rodriguez@company.com"
    },
    leaveType: "Maternity Leave",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    days: 90,
    reason: "Childbirth and bonding",
    status: "Approved",
    appliedDate: "2024-01-15",
    remainingLeaves: {
      vacation: 15,
      sick: 12,
      personal: 3
    },
    manager: "David Brown"
  },
  {
    id: "LR-004",
    employee: {
      name: "David Kim",
      avatar: "/placeholder-user.jpg",
      department: "Marketing",
      position: "Marketing Manager",
      email: "david.kim@company.com"
    },
    leaveType: "Personal",
    startDate: "2024-02-05",
    endDate: "2024-02-07",
    days: 3,
    reason: "Moving to new apartment",
    status: "Rejected",
    appliedDate: "2024-01-30",
    remainingLeaves: {
      vacation: 20,
      sick: 8,
      personal: 2
    },
    manager: "Susan Green",
    rejectionReason: "Conflicting project deadline"
  },
  {
    id: "LR-005",
    employee: {
      name: "Lisa Wang",
      avatar: "/placeholder-user.jpg",
      department: "Sales",
      position: "Sales Representative",
      email: "lisa.wang@company.com"
    },
    leaveType: "Vacation",
    startDate: "2024-02-20",
    endDate: "2024-02-25",
    days: 4,
    reason: "Wedding anniversary celebration",
    status: "Pending",
    appliedDate: "2024-01-22",
    remainingLeaves: {
      vacation: 16,
      sick: 12,
      personal: 6
    },
    manager: "Mark Johnson"
  },
]

const currentlyOut = [
  {
    employee: {
      name: "Alex Thompson",
      avatar: "/placeholder-user.jpg",
      department: "Engineering",
      position: "Junior Developer"
    },
    leaveType: "Sick Leave",
    startDate: "2024-01-25",
    returnDate: "2024-01-30",
    daysOut: 3,
    reason: "Flu recovery"
  },
  {
    employee: {
      name: "Maria Garcia",
      avatar: "/placeholder-user.jpg",
      department: "HR",
      position: "HR Specialist"
    },
    leaveType: "Vacation",
    startDate: "2024-01-22",
    returnDate: "2024-02-02",
    daysOut: 8,
    reason: "Winter vacation"
  },
  {
    employee: {
      name: "James Wilson",
      avatar: "/placeholder-user.jpg",
      department: "Finance",
      position: "Financial Analyst"
    },
    leaveType: "Personal",
    startDate: "2024-01-28",
    returnDate: "2024-01-29",
    daysOut: 1,
    reason: "Personal appointment"
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-500"
    case "Pending":
      return "bg-yellow-500"
    case "Rejected":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="h-4 w-4" />
    case "Pending":
      return <Clock className="h-4 w-4" />
    case "Rejected":
      return <XCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getLeaveTypeIcon = (type: string) => {
  switch (type) {
    case "Vacation":
      return <Plane className="h-4 w-4" />
    case "Sick Leave":
      return <Heart className="h-4 w-4" />
    case "Maternity Leave":
    case "Paternity Leave":
      return <Baby className="h-4 w-4" />
    case "Personal":
      return <Home className="h-4 w-4" />
    case "Study Leave":
      return <GraduationCap className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

const getLeaveTypeColor = (type: string) => {
  switch (type) {
    case "Vacation":
      return "bg-blue-100 text-blue-700"
    case "Sick Leave":
      return "bg-red-100 text-red-700"
    case "Maternity Leave":
    case "Paternity Leave":
      return "bg-pink-100 text-pink-700"
    case "Personal":
      return "bg-purple-100 text-purple-700"
    case "Study Leave":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function LeaveManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Track employee leave requests, approvals, and manage time-off policies.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Leave Calendar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leaveStats.map((stat) => (
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

      {/* Main Content */}
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="currently-out">Currently Out</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
          <TabsTrigger value="balances">Leave Balances</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leave Requests</CardTitle>
                  <CardDescription>
                    All employee leave requests with status and approval details
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search requests..." className="pl-8 w-64" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
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
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Remaining Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={request.employee.avatar} />
                            <AvatarFallback>
                              {request.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.employee.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={getLeaveTypeColor(request.leaveType)}
                        >
                          <div className="flex items-center space-x-1">
                            {getLeaveTypeIcon(request.leaveType)}
                            <span>{request.leaveType}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{request.days} days</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{request.startDate}</div>
                          <div className="text-muted-foreground">to {request.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-40 truncate text-sm" title={request.reason}>
                          {request.reason}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>Vacation: {request.remainingLeaves.vacation}</div>
                          <div>Sick: {request.remainingLeaves.sick}</div>
                          <div>Personal: {request.remainingLeaves.personal}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(request.status)} text-white`}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(request.status)}
                            <span>{request.status}</span>
                          </div>
                        </Badge>
                        {request.status === "Rejected" && request.rejectionReason && (
                          <div className="text-xs text-red-600 mt-1">
                            {request.rejectionReason}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === "Pending" && (
                            <>
                              <Button variant="ghost" size="sm" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currently-out" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Currently Out of Office</CardTitle>
              <CardDescription>
                Employees who are currently on leave and their return dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentlyOut.map((leave, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                        {getLeaveTypeIcon(leave.leaveType)}
                      </div>
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={leave.employee.avatar} />
                        <AvatarFallback>
                          {leave.employee.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-lg">{leave.employee.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {leave.employee.position} &bull; {leave.employee.department}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`mt-1 ${getLeaveTypeColor(leave.leaveType)}`}
                        >
                          {leave.leaveType}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">Returns {leave.returnDate}</div>
                      <div className="text-sm text-muted-foreground">
                        Out for {leave.daysOut} days
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {leave.reason}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
              <CardDescription>
                Visual calendar view of all employee leaves and planned time off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Interactive leave calendar will be displayed here.</p>
                <p className="text-sm">Visual timeline of all employee leaves and coverage planning.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balances" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Balances</CardTitle>
              <CardDescription>
                Overview of remaining leave days for all employees by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Employee leave balance summary will be displayed here.</p>
                <p className="text-sm">Track remaining vacation, sick, and personal days for each employee.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
