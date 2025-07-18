﻿"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Calendar,
  Clock,
  PlusCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sun,
  Heart,
  User,
  FileText,
  Send
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const leaveBalance = [
  {
    type: "Vacation",
    used: 8,
    available: 12,
    total: 20,
    icon: Sun,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    type: "Sick Leave",
    used: 2,
    available: 8,
    total: 10,
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  {
    type: "Personal",
    used: 1,
    available: 4,
    total: 5,
    icon: User,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    type: "Comp Time",
    used: 0,
    available: 16,
    total: 16,
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
]

const leaveRequests = [
  {
    id: 1,
    type: "Vacation",
    startDate: "Jan 5, 2025",
    endDate: "Jan 5, 2025",
    days: 1,
    status: "Pending",
    statusColor: "bg-yellow-500",
    submittedDate: "Dec 15, 2024",
    reason: "Personal appointment",
    approver: "Sarah Johnson"
  },
  {
    id: 2,
    type: "Vacation",
    startDate: "Dec 20, 2024",
    endDate: "Dec 22, 2024",
    days: 3,
    status: "Approved",
    statusColor: "bg-green-500",
    submittedDate: "Dec 1, 2024",
    reason: "Winter holiday",
    approver: "Sarah Johnson"
  },
  {
    id: 3,
    type: "Sick Leave",
    startDate: "Nov 28, 2024",
    endDate: "Nov 28, 2024",
    days: 1,
    status: "Approved",
    statusColor: "bg-green-500",
    submittedDate: "Nov 28, 2024",
    reason: "Flu symptoms",
    approver: "Sarah Johnson"
  },
  {
    id: 4,
    type: "Personal",
    startDate: "Nov 15, 2024",
    endDate: "Nov 15, 2024",
    days: 1,
    status: "Denied",
    statusColor: "bg-red-500",
    submittedDate: "Nov 10, 2024",
    reason: "Moving day",
    approver: "Sarah Johnson",
    denialReason: "Insufficient notice provided"
  },
]

const upcomingHolidays = [
  {
    name: "New Year's Day",
    date: "Jan 1, 2025",
    type: "Federal Holiday"
  },
  {
    name: "Martin Luther King Jr. Day",
    date: "Jan 20, 2025",
    type: "Federal Holiday"
  },
  {
    name: "Presidents' Day",
    date: "Feb 17, 2025",
    type: "Federal Holiday"
  },
  {
    name: "Memorial Day",
    date: "May 26, 2025",
    type: "Federal Holiday"
  },
]

export default function EmployeeLeave() {
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [requests, setRequests] = useState(leaveRequests)

  const handleSubmitRequest = (requestData: any) => {
    const newRequest = {
      id: requests.length + 1,
      type: requestData.type,
      startDate: new Date(requestData.startDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      endDate: new Date(requestData.endDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      days: calculateDays(requestData.startDate, requestData.endDate),
      status: "Waiting Approval",
      statusColor: "bg-orange-500",
      submittedDate: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      reason: requestData.reason,
      approver: "Sarah Johnson"
    }
    setRequests([newRequest, ...requests])
    setShowRequestDialog(false)
  }

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Manage your time off requests and view your leave balance
          </p>
        </div>
        <Button onClick={() => setShowRequestDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Request Time Off
        </Button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {leaveBalance.map((leave) => (
          <Card key={leave.type} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{leave.type}</CardTitle>
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${leave.bgColor}`}>
                <leave.icon className={`h-4 w-4 ${leave.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leave.available} days</div>
              <div className="text-xs text-muted-foreground mb-2">
                Available out of {leave.total} total
              </div>
              <Progress 
                value={(leave.available / leave.total) * 100} 
                className="h-2" 
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>Used: {leave.used}</span>
                <span>Available: {leave.available}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Requests */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Leave Requests</CardTitle>
            <CardDescription>Your submitted time-off requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-sm font-medium">{request.type}</h3>
                        <Badge className={`${request.statusColor} text-white`}>
                          {request.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p><strong>Dates:</strong> {request.startDate} - {request.endDate}</p>
                          <p><strong>Duration:</strong> {request.days} day{request.days > 1 ? 's' : ''}</p>
                          <p><strong>Submitted:</strong> {request.submittedDate}</p>
                        </div>
                        <div>
                          <p><strong>Reason:</strong> {request.reason}</p>
                          <p><strong>Approver:</strong> {request.approver}</p>
                          {request.denialReason && (
                            <p className="text-red-600"><strong>Denial Reason:</strong> {request.denialReason}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {request.status === 'Approved' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {request.status === 'Pending' && (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      {request.status === 'Denied' && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Holidays */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Holidays</CardTitle>
            <CardDescription>Company holidays and observances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingHolidays.map((holiday, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{holiday.name}</p>
                    <p className="text-xs text-muted-foreground">{holiday.date}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {holiday.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Policies */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Policies & Guidelines</CardTitle>
          <CardDescription>Important information about time-off policies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Vacation Leave</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>&bull; 20 days annually (prorated for new hires)</li>
                <li>&bull; Accrues at 1.67 days per month</li>
                <li>&bull; Maximum carryover: 5 days to next year</li>
                <li>&bull; Minimum 2 weeks notice for requests over 3 days</li>
                <li>&bull; Manager approval required</li>
              </ul>

              <h3 className="text-sm font-medium mt-6">Sick Leave</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>&bull; 10 days annually</li>
                <li>&bull; Can be used for personal illness or family care</li>
                <li>&bull; No advance notice required for emergencies</li>
                <li>&bull; Medical documentation required for 3+ consecutive days</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Personal Leave</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>&bull; 5 days annually</li>
                <li>&bull; Can be used for personal matters</li>
                <li>&bull; 24-hour advance notice required</li>
                <li>&bull; Subject to manager approval</li>
              </ul>

              <h3 className="text-sm font-medium mt-6">Important Notes</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>&bull; All leave requests must be submitted through this system</li>
                <li>&bull; Blackout periods may apply during busy seasons</li>
                <li>&bull; Contact HR for questions about leave policies</li>
                <li>&bull; Unused sick leave does not carry over</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Need Help?</p>
                <p className="text-xs text-blue-700">
                  For detailed leave policies, visit the employee handbook or contact HR at hr@company.com
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Time Off Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Request Time Off</span>
            </DialogTitle>
            <DialogDescription>
              Submit a new leave request for approval by your manager.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target as HTMLFormElement)
            handleSubmitRequest({
              type: formData.get('leaveType'),
              startDate: formData.get('startDate'),
              endDate: formData.get('endDate'),
              reason: formData.get('reason')
            })
          }} className="space-y-4 py-4">
            <div>
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select name="leaveType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vacation">Vacation Leave</SelectItem>
                  <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                  <SelectItem value="Personal">Personal Leave</SelectItem>
                  <SelectItem value="Comp Time">Comp Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input 
                  id="startDate" 
                  name="startDate"
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input 
                  id="endDate" 
                  name="endDate"
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea 
                id="reason" 
                name="reason"
                placeholder="Briefly describe the reason for your time off request..."
                rows={3}
                required
              />
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">📋 Important Reminders:</p>
                <ul className="text-xs space-y-1">
                  <li>• Submit requests at least 2 weeks in advance for vacation</li>
                  <li>• Manager approval is required for all leave requests</li>
                  <li>• Check your leave balance before submitting</li>
                </ul>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowRequestDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
