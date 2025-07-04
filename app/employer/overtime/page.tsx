"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Plus, 
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  Filter,
  Search,
  Eye,
  Edit
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for overtime requests
const mockOvertimeRequests = [
  {
    id: "1",
    employeeId: "emp_001",
    employeeName: "John Smith",
    department: "Engineering",
    requestDate: "2024-01-15",
    overtimeDate: "2024-01-20",
    startTime: "18:00",
    endTime: "22:00",
    hours: 4,
    reason: "Critical bug fix for client deployment",
    status: "pending",
    priority: "high",
    submittedAt: "2024-01-15T09:30:00Z",
    managerNotes: ""
  },
  {
    id: "2",
    employeeId: "emp_002",
    employeeName: "Sarah Johnson",
    department: "Marketing",
    requestDate: "2024-01-14",
    overtimeDate: "2024-01-19",
    startTime: "17:00",
    endTime: "20:00",
    hours: 3,
    reason: "Campaign launch preparation",
    status: "approved",
    priority: "medium",
    submittedAt: "2024-01-14T14:20:00Z",
    managerNotes: "Approved for Q1 campaign launch"
  },
  {
    id: "3",
    employeeId: "emp_003",
    employeeName: "Mike Chen",
    department: "Design",
    requestDate: "2024-01-13",
    overtimeDate: "2024-01-18",
    startTime: "19:00",
    endTime: "23:00",
    hours: 4,
    reason: "Client presentation materials",
    status: "rejected",
    priority: "low",
    submittedAt: "2024-01-13T16:45:00Z",
    managerNotes: "Request submitted too late, please plan ahead"
  }
]

// Mock overtime slots/quotas
const departmentOvertimeQuotas = [
  {
    department: "Engineering",
    monthlyQuota: 40,
    usedHours: 28,
    remainingHours: 12,
    employees: 8,
    avgHoursPerEmployee: 3.5
  },
  {
    department: "Marketing", 
    monthlyQuota: 20,
    usedHours: 15,
    remainingHours: 5,
    employees: 5,
    avgHoursPerEmployee: 3.0
  },
  {
    department: "Design",
    monthlyQuota: 16,
    usedHours: 12,
    remainingHours: 4,
    employees: 4,
    avgHoursPerEmployee: 3.0
  }
]

export default function EmployerOvertimePage() {
  const [selectedTab, setSelectedTab] = useState("requests")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [managerNotes, setManagerNotes] = useState("")

  const filteredRequests = mockOvertimeRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesDepartment = filterDepartment === "all" || request.department === filterDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const totalRequests = mockOvertimeRequests.length
  const pendingRequests = mockOvertimeRequests.filter(r => r.status === "pending").length
  const approvedRequests = mockOvertimeRequests.filter(r => r.status === "approved").length
  const totalOvertimeHours = mockOvertimeRequests
    .filter(r => r.status === "approved")
    .reduce((sum, r) => sum + r.hours, 0)

  const handleApproveRequest = (requestId: string) => {
    console.log("Approving request:", requestId, "Notes:", managerNotes)
    setReviewDialogOpen(false)
    setSelectedRequest(null)
    setManagerNotes("")
  }

  const handleRejectRequest = (requestId: string) => {
    console.log("Rejecting request:", requestId, "Notes:", managerNotes)
    setReviewDialogOpen(false)
    setSelectedRequest(null)
    setManagerNotes("")
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800", 
      rejected: "bg-red-100 text-red-800"
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800"
    }
    return variants[priority as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Overtime Management</h1>
          <p className="text-muted-foreground mt-1">
            Review overtime requests and manage department quotas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Overtime Slot
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Hours</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalOvertimeHours}</div>
            <p className="text-xs text-muted-foreground">
              Hours this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalOvertimeHours * 45).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Estimated cost
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="quotas">Department Quotas</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by employee or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Overtime Requests</CardTitle>
              <CardDescription>Review and manage employee overtime requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employeeName}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(request.overtimeDate).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">{request.startTime} - {request.endTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>{request.hours}h</TableCell>
                      <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedRequest(request)
                                setReviewDialogOpen(true)
                              }}
                            >
                              Review Request
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Employee Profile</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quotas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Overtime Quotas</CardTitle>
              <CardDescription>Monitor overtime usage across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentOvertimeQuotas.map((quota) => (
                  <div key={quota.department} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{quota.department}</h3>
                      <Badge variant="outline">{quota.employees} employees</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{quota.usedHours}</div>
                        <div className="text-sm text-muted-foreground">Hours Used</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{quota.remainingHours}</div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{quota.avgHoursPerEmployee}</div>
                        <div className="text-sm text-muted-foreground">Avg/Employee</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quota Usage</span>
                        <span>{Math.round((quota.usedHours / quota.monthlyQuota) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (quota.usedHours / quota.monthlyQuota) > 0.8 ? "bg-red-500" :
                            (quota.usedHours / quota.monthlyQuota) > 0.6 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${(quota.usedHours / quota.monthlyQuota) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Overtime Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Overtime Trends Chart Placeholder
                  <BarChart3 className="h-8 w-8 ml-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Department Chart Placeholder
                  <Users className="h-8 w-8 ml-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Overtime Request</DialogTitle>
            <DialogDescription>
              Review the details and make a decision on this overtime request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Employee</Label>
                  <Input value={selectedRequest.employeeName} disabled />
                </div>
                <div>
                  <Label>Department</Label>
                  <Input value={selectedRequest.department} disabled />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input value={new Date(selectedRequest.overtimeDate).toLocaleDateString()} disabled />
                </div>
                <div>
                  <Label>Start Time</Label>
                  <Input value={selectedRequest.startTime} disabled />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input value={selectedRequest.endTime} disabled />
                </div>
              </div>

              <div>
                <Label>Total Hours</Label>
                <Input value={`${selectedRequest.hours} hours`} disabled />
              </div>

              <div>
                <Label>Reason</Label>
                <Textarea value={selectedRequest.reason} disabled rows={3} />
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <Label>Priority</Label>
                  <Badge className={getPriorityBadge(selectedRequest.priority)}>
                    {selectedRequest.priority}
                  </Badge>
                </div>
                <div>
                  <Label>Current Status</Label>
                  <Badge className={getStatusBadge(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                </div>
              </div>

              <div>
                <Label>Manager Notes</Label>
                <Textarea
                  value={managerNotes}
                  onChange={(e) => setManagerNotes(e.target.value)}
                  placeholder="Add notes about your decision..."
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter className="space-x-2">
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleRejectRequest(selectedRequest?.id)}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
            <Button 
              onClick={() => handleApproveRequest(selectedRequest?.id)}
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 