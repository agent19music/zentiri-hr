import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { 
  DollarSign, 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Filter,
  Search,
  Eye,
  CreditCard,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const payrollStats = [
  {
    title: "Total Monthly Payroll",
    value: "$285,420",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: DollarSign,
    description: "Including benefits & taxes",
  },
  {
    title: "Employees Paid",
    value: "328/342",
    change: "14 pending",
    changeType: "neutral" as const,
    icon: Users,
    description: "This pay period",
  },
  {
    title: "Average Salary",
    value: "$4,650",
    change: "+3.1%",
    changeType: "increase" as const,
    icon: TrendingUp,
    description: "Per employee monthly",
  },
  {
    title: "Processing Time",
    value: "2.3 days",
    change: "-0.5 days",
    changeType: "decrease" as const,
    icon: Clock,
    description: "Average payment processing",
  },
]

const recentPayments = [
  {
    id: "PAY-001",
    employee: {
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      avatar: "/placeholder-user.jpg",
      department: "Engineering",
      position: "Senior Developer"
    },
    salary: "$6,500",
    bonus: "$1,200",
    deductions: "$487",
    netPay: "$7,213",
    payDate: "2024-01-15",
    status: "Paid",
    paymentMethod: "Direct Deposit"
  },
  {
    id: "PAY-002", 
    employee: {
      name: "Michael Chen",
      email: "michael.chen@company.com",
      avatar: "/placeholder-user.jpg",
      department: "Product",
      position: "Product Manager"
    },
    salary: "$7,200",
    bonus: "$0",
    deductions: "$540",
    netPay: "$6,660",
    payDate: "2024-01-15",
    status: "Paid",
    paymentMethod: "Direct Deposit"
  },
  {
    id: "PAY-003",
    employee: {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com", 
      avatar: "/placeholder-user.jpg",
      department: "Design",
      position: "UX Designer"
    },
    salary: "$5,800",
    bonus: "$500",
    deductions: "$435",
    netPay: "$5,865",
    payDate: "2024-01-15",
    status: "Processing",
    paymentMethod: "Direct Deposit"
  },
  {
    id: "PAY-004",
    employee: {
      name: "David Kim",
      email: "david.kim@company.com",
      avatar: "/placeholder-user.jpg", 
      department: "Marketing",
      position: "Marketing Manager"
    },
    salary: "$6,000",
    bonus: "$800",
    deductions: "$456",
    netPay: "$6,344",
    payDate: "2024-01-15",
    status: "Pending",
    paymentMethod: "Check"
  },
  {
    id: "PAY-005",
    employee: {
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      avatar: "/placeholder-user.jpg",
      department: "Sales", 
      position: "Sales Representative"
    },
    salary: "$4,200",
    bonus: "$2,100",
    deductions: "$315",
    netPay: "$5,985",
    payDate: "2024-01-15",
    status: "Failed",
    paymentMethod: "Direct Deposit"
  },
]

const upcomingPayments = [
  {
    employee: "Alex Thompson",
    department: "Engineering",
    amount: "$5,200",
    dueDate: "2024-01-30",
    type: "Regular Salary"
  },
  {
    employee: "Maria Garcia",
    department: "HR",
    amount: "$4,800",
    dueDate: "2024-01-30", 
    type: "Regular Salary"
  },
  {
    employee: "James Wilson",
    department: "Finance",
    amount: "$1,500",
    dueDate: "2024-02-01",
    type: "Bonus Payment"
  },
  {
    employee: "Jennifer Lee",
    department: "Operations",
    amount: "$4,600",
    dueDate: "2024-02-01",
    type: "Regular Salary"
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-500"
    case "Processing":
      return "bg-yellow-500"
    case "Pending":
      return "bg-blue-500"
    case "Failed":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Paid":
      return <CheckCircle className="h-4 w-4" />
    case "Processing":
      return <Clock className="h-4 w-4" />
    case "Pending":
      return <Calendar className="h-4 w-4" />
    case "Failed":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">
            Track and manage employee payments, salaries, and payroll processing.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <CreditCard className="mr-2 h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {payrollStats.map((stat) => (
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
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Payments</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>
                    Latest payroll transactions and their status
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
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
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
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Bonus</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payment.employee.avatar} />
                            <AvatarFallback>
                              {payment.employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{payment.employee.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {payment.employee.position}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.employee.department}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{payment.salary}</TableCell>
                      <TableCell className="text-green-600">{payment.bonus}</TableCell>
                      <TableCell className="text-red-600">{payment.deductions}</TableCell>
                      <TableCell className="font-bold">{payment.netPay}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(payment.status)} text-white`}
                        >
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(payment.status)}
                            <span>{payment.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                Scheduled payments for the next pay period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{payment.employee}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.department} &bull; {payment.type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{payment.amount}</div>
                      <div className="text-sm text-muted-foreground">Due {payment.dueDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Complete payroll history and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Payment history analytics will be displayed here.</p>
                <p className="text-sm">Historical data and trends across pay periods.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
