"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2,
  Shield,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Award,
  TrendingUp,
  FileText,
  Send,
  Plus,
  Grid,
  List
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

import { getAccessibleFeatures, getRoleInfo, getAccessScope, getActionPermissions, type UserRole } from "@/lib/rbac"

// Mock user role - in real app, this would come from auth context
const currentUserRole: UserRole = "hr_manager"

// Get role-based features
const features = getAccessibleFeatures(currentUserRole)
const roleInfo = getRoleInfo(currentUserRole)
const accessScope = getAccessScope(currentUserRole)
const actionPermissions = getActionPermissions(currentUserRole)

// Mock data - in real app, this would come from APIs
const employees = [
  {
    id: "emp-001",
    personalFileNumber: "PFN-2024-001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@company.com",
    phone: "+254 700 123 456",
    avatar: "/placeholder-user.jpg",
    department: "Engineering",
    position: "Senior Software Engineer",
    team: "Frontend Team",
    manager: "David Wilson",
    startDate: "2023-01-15",
    status: "active",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    workArrangement: "Hybrid",
    salary: "KES 150,000",
    performanceScore: 4.8,
    lastActive: "2 hours ago",
    directReports: 0,
    skills: ["React", "TypeScript", "Node.js"],
    permissions: ["employees.view", "tasks.create"]
  },
  {
    id: "emp-002", 
    personalFileNumber: "PFN-2024-002",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@company.com",
    phone: "+254 701 234 567",
    avatar: "/placeholder-user.jpg",
    department: "Engineering",
    position: "Team Lead",
    team: "Backend Team",
    manager: "David Wilson",
    startDate: "2022-08-20",
    status: "active",
    location: "Mombasa, Kenya",
    employmentType: "Full-time", 
    workArrangement: "Remote",
    salary: "KES 180,000",
    performanceScore: 4.9,
    lastActive: "1 hour ago",
    directReports: 4,
    skills: ["Python", "Django", "PostgreSQL"],
    permissions: ["employees.view", "employees.update", "teams.manage_own"]
  },
  {
    id: "emp-003",
    personalFileNumber: "PFN-2024-003", 
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@company.com",
    phone: "+254 702 345 678",
    avatar: "/placeholder-user.jpg",
    department: "Design",
    position: "UX Designer",
    team: "Product Team",
    manager: "Lisa Wang",
    startDate: "2023-03-10",
    status: "active",
    location: "Nairobi, Kenya", 
    employmentType: "Full-time",
    workArrangement: "On-site",
    salary: "KES 120,000",
    performanceScore: 4.6,
    lastActive: "30 minutes ago",
    directReports: 0,
    skills: ["Figma", "Adobe Creative Suite", "User Research"],
    permissions: ["employees.view", "tasks.view_own"]
  },
  {
    id: "emp-004",
    personalFileNumber: "PFN-2024-004",
    firstName: "David",
    lastName: "Kim", 
    email: "david.kim@company.com",
    phone: "+254 703 456 789",
    avatar: "/placeholder-user.jpg",
    department: "Marketing",
    position: "Marketing Manager",
    team: "Growth Team",
    manager: "Lisa Wang",
    startDate: "2021-11-05",
    status: "on_leave",
    location: "Kisumu, Kenya",
    employmentType: "Full-time",
    workArrangement: "Hybrid", 
    salary: "KES 140,000",
    performanceScore: 3.8,
    lastActive: "3 days ago",
    directReports: 2,
    skills: ["Digital Marketing", "Analytics", "Content Strategy"],
    permissions: ["employees.view", "tasks.create", "reports.view"]
  },
  {
    id: "emp-005",
    personalFileNumber: "PFN-2024-005",
    firstName: "Lisa",
    lastName: "Wang",
    email: "lisa.wang@company.com", 
    phone: "+254 704 567 890",
    avatar: "/placeholder-user.jpg",
    department: "Sales",
    position: "Sales Director",
    team: "Enterprise Sales",
    manager: "Alex Thompson",
    startDate: "2020-05-15",
    status: "active",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    workArrangement: "Hybrid",
    salary: "KES 220,000",
    performanceScore: 4.9,
    lastActive: "15 minutes ago", 
    directReports: 8,
    skills: ["Sales Strategy", "Client Relations", "Team Leadership"],
    permissions: ["employees.view", "employees.update", "departments.view", "reports.view"]
  },
  {
    id: "emp-006",
    personalFileNumber: "PFN-2024-006",
    firstName: "Alex",
    lastName: "Thompson",
    email: "alex.thompson@company.com",
    phone: "+254 705 678 901", 
    avatar: "/placeholder-user.jpg",
    department: "Finance",
    position: "Finance Manager",
    team: "Accounting Team",
    manager: null,
    startDate: "2019-09-10",
    status: "active", 
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    workArrangement: "On-site",
    salary: "KES 200,000",
    performanceScore: 4.7,
    lastActive: "5 minutes ago",
    directReports: 5,
    skills: ["Financial Analysis", "Budgeting", "Compliance"],
    permissions: ["employees.view", "payroll.view", "reports.view", "departments.view"]
  }
]

const departments = [
  { id: "eng", name: "Engineering", count: 45, manager: "David Wilson" },
  { id: "design", name: "Design", count: 12, manager: "Sarah Chen" },
  { id: "marketing", name: "Marketing", count: 18, manager: "Lisa Wang" },
  { id: "sales", name: "Sales", count: 22, manager: "Michael Torres" },
  { id: "finance", name: "Finance", count: 8, manager: "Alex Thompson" },
  { id: "hr", name: "Human Resources", count: 6, manager: "Emma Davis" }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-500"
    case "on_leave": return "bg-yellow-500"
    case "inactive": return "bg-red-500"
    default: return "bg-gray-500"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "active": return "Active"
    case "on_leave": return "On Leave"
    case "inactive": return "Inactive"
    default: return "Unknown"
  }
}

const getPerformanceColor = (score: number) => {
  if (score >= 4.5) return "text-green-600"
  if (score >= 4.0) return "text-blue-600"
  if (score >= 3.5) return "text-yellow-600"
  return "text-red-600"
}

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.personalFileNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === "active").length,
    onLeave: employees.filter(e => e.status === "on_leave").length,
    departments: departments.length,
    avgPerformance: (employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
          <p className="text-muted-foreground">
            {accessScope}
          </p>
        </div>
        <div className="flex space-x-2">
          {features.canImportEmployees && (
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          )}
          {features.canCreateEmployees && (
            <Button size="sm" onClick={() => setShowAddEmployee(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          )}
          {features.canExportEmployees && (
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Role-based Access Info */}
      <Card className="border-l-4 border-l-purple-500">
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
              <Badge variant="outline">{actionPermissions.employees.scope}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">{Math.round((stats.active / stats.total) * 100)}% of workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onLeave}</div>
            <p className="text-xs text-muted-foreground">Returns this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments}</div>
            <p className="text-xs text-muted-foreground">Across organization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPerformance}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Directory */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employee Directory</CardTitle>
              <CardDescription>
                Manage {actionPermissions.employees.scope} with {currentUserRole === "hr_manager" 
                  ? "complete administrative access"
                  : currentUserRole === "department_manager"
                  ? "department management capabilities"
                  : "role-appropriate permissions"
                }
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Employee List */}
          {viewMode === "cards" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredEmployees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedEmployee(employee)}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                        <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm truncate">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <Badge className={`${getStatusColor(employee.status)} text-white text-xs`}>
                            {getStatusText(employee.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                        <p className="text-xs text-muted-foreground">{employee.department}</p>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t">
                          <div className="flex items-center space-x-1">
                            <Star className={`h-3 w-3 ${getPerformanceColor(employee.performanceScore)}`} />
                            <span className={`text-xs ${getPerformanceColor(employee.performanceScore)}`}>
                              {employee.performanceScore}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{employee.directReports}</span>
                          </div>
                          {features.canEditEmployees && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {actionPermissions.employees.canEdit && (
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {actionPermissions.employees.canDelete && (
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id} className="cursor-pointer hover:bg-muted/50"
                              onClick={() => setSelectedEmployee(employee)}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} />
                            <AvatarFallback className="text-xs">{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                            <p className="text-sm text-muted-foreground">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(employee.status)} text-white`}>
                          {getStatusText(employee.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className={`h-4 w-4 ${getPerformanceColor(employee.performanceScore)}`} />
                          <span className={getPerformanceColor(employee.performanceScore)}>
                            {employee.performanceScore}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{employee.directReports}</TableCell>
                      <TableCell className="text-right">
                        {features.canEditEmployees && (
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
                              {actionPermissions.employees.canEdit && (
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No employees found matching your criteria.</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedEmployee.avatar} alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} />
                  <AvatarFallback>{selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                  <p className="text-muted-foreground">{selectedEmployee.position}</p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contact</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEmployee.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Work Details</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEmployee.department}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEmployee.team}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Started {selectedEmployee.startDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance & Skills */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Performance & Skills</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Star className={`h-4 w-4 ${getPerformanceColor(selectedEmployee.performanceScore)}`} />
                    <span className="text-sm">Performance: {selectedEmployee.performanceScore}/5.0</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Manages: {selectedEmployee.directReports} people</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedEmployee.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedEmployee(null)}>
                Close
              </Button>
              {actionPermissions.employees.canEdit && (
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Employee
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 