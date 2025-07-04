"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Clock, 
  Plus, 
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Eye,
  History
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

// Mock data for user's overtime requests
const myOvertimeRequests = [
  {
    id: "1",
    requestDate: "2024-01-15",
    overtimeDate: "2024-01-20",
    startTime: "18:00",
    endTime: "22:00",
    hours: 4,
    reason: "Critical bug fix for client deployment",
    status: "pending",
    priority: "high",
    submittedAt: "2024-01-15T09:30:00Z",
    managerNotes: "",
    reviewedBy: "",
    reviewedAt: ""
  },
  {
    id: "2",
    requestDate: "2024-01-10",
    overtimeDate: "2024-01-15",
    startTime: "17:00",
    endTime: "20:00",
    hours: 3,
    reason: "Project deadline preparation",
    status: "approved",
    priority: "medium",
    submittedAt: "2024-01-10T14:20:00Z",
    managerNotes: "Approved for project completion",
    reviewedBy: "Jane Manager",
    reviewedAt: "2024-01-11T10:15:00Z"
  },
  {
    id: "3",
    requestDate: "2024-01-05",
    overtimeDate: "2024-01-08",
    startTime: "19:00",
    endTime: "23:00",
    hours: 4,
    reason: "Client presentation materials",
    status: "rejected",
    priority: "low",
    submittedAt: "2024-01-05T16:45:00Z",
    managerNotes: "Request submitted too late, please plan ahead next time",
    reviewedBy: "Jane Manager",
    reviewedAt: "2024-01-06T09:30:00Z"
  }
]

const timeSlots = [
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"
]

export default function EmployeeOvertimePage() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [reason, setReason] = useState("")
  const [priority, setPriority] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

  const pendingRequests = myOvertimeRequests.filter(r => r.status === "pending").length
  const approvedRequests = myOvertimeRequests.filter(r => r.status === "approved").length
  const totalOvertimeHours = myOvertimeRequests
    .filter(r => r.status === "approved")
    .reduce((sum, r) => sum + r.hours, 0)

  const calculateHours = () => {
    if (!startTime || !endTime) return 0
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    const diffMs = end.getTime() - start.getTime()
    return Math.max(0, diffMs / (1000 * 60 * 60))
  }

  const handleSubmitRequest = () => {
    const hours = calculateHours()
    const newRequest = {
      overtimeDate: selectedDate,
      startTime,
      endTime,
      hours,
      reason,
      priority,
      submittedAt: new Date().toISOString()
    }
    console.log("Submitting overtime request:", newRequest)
    setRequestDialogOpen(false)
    // Reset form
    setSelectedDate(undefined)
    setStartTime("")
    setEndTime("")
    setReason("")
    setPriority("")
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle2 },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle }
    }
    const variant = variants[status as keyof typeof variants]
    if (!variant) return { color: "bg-gray-100 text-gray-800", icon: Clock }
    return variant
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
          <h1 className="text-3xl font-bold">Overtime Requests</h1>
          <p className="text-muted-foreground mt-1">
            Submit overtime requests and track their status
          </p>
        </div>
        <Button onClick={() => setRequestDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Request Overtime
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
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
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myOvertimeRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Pay</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalOvertimeHours * 45).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Estimated earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>My Overtime Requests</CardTitle>
          <CardDescription>Track the status of your overtime applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myOvertimeRequests.map((request) => {
              const statusInfo = getStatusBadge(request.status)
              const StatusIcon = statusInfo.icon
              
              return (
                <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {new Date(request.overtimeDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {request.startTime} - {request.endTime} ({request.hours}h)
                          </span>
                        </div>
                        <Badge className={getPriorityBadge(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                        {request.reason}
                      </p>
                      {request.managerNotes && (
                        <div className="mt-2 p-2 bg-muted rounded text-sm">
                          <strong>Manager Notes:</strong> {request.managerNotes}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className="h-4 w-4" />
                        <Badge className={statusInfo.color}>
                          {request.status}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request)
                          setDetailsDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Request Overtime Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request Overtime</DialogTitle>
            <DialogDescription>
              Submit a new overtime request for manager approval
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Overtime Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {startTime && endTime && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm">
                  <strong>Total Hours:</strong> {calculateHours()} hours
                </div>
                <div className="text-xs text-muted-foreground">
                  Estimated pay: ${(calculateHours() * 45).toFixed(2)}
                </div>
              </div>
            )}

            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Reason</Label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain why overtime is needed..."
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitRequest}
              disabled={!selectedDate || !startTime || !endTime || !reason || !priority}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              View detailed information about your overtime request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Input value={new Date(selectedRequest.overtimeDate).toLocaleDateString()} disabled />
                </div>
                <div>
                  <Label>Hours</Label>
                  <Input value={`${selectedRequest.hours} hours`} disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <Label>Priority</Label>
                <Badge className={getPriorityBadge(selectedRequest.priority)}>
                  {selectedRequest.priority}
                </Badge>
              </div>

              <div>
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusBadge(selectedRequest.status).color}>
                    {selectedRequest.status}
                  </Badge>
                  {selectedRequest.reviewedBy && (
                    <span className="text-sm text-muted-foreground">
                      by {selectedRequest.reviewedBy}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label>Reason</Label>
                <Textarea value={selectedRequest.reason} disabled rows={3} />
              </div>

              {selectedRequest.managerNotes && (
                <div>
                  <Label>Manager Notes</Label>
                  <Textarea value={selectedRequest.managerNotes} disabled rows={3} />
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <div>Submitted: {new Date(selectedRequest.submittedAt).toLocaleString()}</div>
                {selectedRequest.reviewedAt && (
                  <div>Reviewed: {new Date(selectedRequest.reviewedAt).toLocaleString()}</div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 