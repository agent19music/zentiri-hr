"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Clock,
  PlayCircle,
  PauseCircle,
  Calendar,
  MapPin,
  TrendingUp,
  Award,
  Coffee,
  Timer,
  BarChart3,
  CheckCircle,
  AlertCircle,
  History,
  Building2,
  User,
  Briefcase
} from "lucide-react"

// Mock data for time tracking
const currentStatus = {
  isClocked: true,
  clockInTime: "2024-12-19T09:15:00Z",
  location: "Main Office",
  totalHoursToday: 7.25,
  breaksTaken: 1,
  currentBreakStart: null
}

const todaySchedule = {
  expectedStart: "09:00",
  expectedEnd: "17:30",
  lunchBreak: "12:00 - 13:00",
  totalExpectedHours: 8.5
}

const recentTimeLogs = [
  {
    id: "1",
    date: "2024-12-19",
    clockIn: "09:15:23",
    clockOut: "17:45:12",
    lunchStart: "12:30:00",
    lunchEnd: "13:15:45",
    totalHours: 7.75,
    overtimeHours: 0.25,
    location: "Main Office",
    status: "completed"
  },
  {
    id: "2", 
    date: "2024-12-18",
    clockIn: "08:45:12",
    clockOut: "17:30:45",
    lunchStart: "12:00:30",
    lunchEnd: "13:00:15",
    totalHours: 8.0,
    overtimeHours: 0,
    location: "Main Office", 
    status: "completed"
  },
  {
    id: "3",
    date: "2024-12-17",
    clockIn: "09:00:45",
    clockOut: "18:15:20",
    lunchStart: "12:15:00",
    lunchEnd: "13:00:30",
    totalHours: 8.5,
    overtimeHours: 0.5,
    location: "Remote",
    status: "completed"
  },
  {
    id: "4",
    date: "2024-12-16",
    clockIn: "09:30:15",
    clockOut: "17:35:30",
    lunchStart: "12:45:00", 
    lunchEnd: "13:30:15",
    totalHours: 7.25,
    overtimeHours: 0,
    location: "Main Office",
    status: "completed"
  }
]

const weeklyStats = {
  totalHours: 39.5,
  expectedHours: 42.5,
  overtimeHours: 0.75,
  avgDailyHours: 7.9,
  onTimePercentage: 85,
  completedDays: 5
}

const monthlyStats = {
  totalHours: 168.25,
  expectedHours: 170,
  overtimeHours: 12.5,
  avgDailyHours: 8.1,
  perfectDays: 18,
  lateDays: 3,
  earlyDepartures: 1,
  remoteDays: 8
}

const companyHistory = {
  startDate: "2022-03-15",
  totalTenure: "2 years, 9 months, 4 days",
  totalWorkingDays: 694,
  totalHours: 5552,
  avgHoursPerDay: 8.0,
  milestones: [
    {
      id: "1",
      title: "Started at Zentiri HR",
      date: "2022-03-15",
      type: "start",
      description: "Joined as Senior Software Engineer"
    },
    {
      id: "2",
      title: "1 Year Anniversary",
      date: "2023-03-15", 
      type: "anniversary",
      description: "Completed first year with excellent performance"
    },
    {
      id: "3",
      title: "Promoted to Lead Engineer",
      date: "2023-08-01",
      type: "promotion",
      description: "Promoted to Lead Software Engineer"
    },
    {
      id: "4",
      title: "2 Year Anniversary",
      date: "2024-03-15",
      type: "anniversary", 
      description: "Celebrating 2 years of valuable contributions"
    },
    {
      id: "5",
      title: "Project Leadership Award",
      date: "2024-09-15",
      type: "award",
      description: "Recognized for outstanding leadership on Q3 migration project"
    }
  ]
}

export default function TimeTrackingPage() {
  const [selectedTab, setSelectedTab] = useState("today")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isClocked, setIsClocked] = useState(currentStatus.isClocked)
  const [clockInTime, setClockInTime] = useState(currentStatus.clockInTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDuration = (hours: number) => {
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    return `${wholeHours}h ${minutes}m`
  }

  const calculateWorkedToday = () => {
    if (!isClocked || !clockInTime) return "0h 0m"
    const start = new Date(clockInTime)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    const wholeHours = Math.floor(diffHours)
    const minutes = Math.round((diffHours - wholeHours) * 60)
    return `${wholeHours}h ${minutes}m`
  }

  const handleClockIn = () => {
    setIsClocked(true)
    setClockInTime(new Date().toISOString())
  }

  const handleClockOut = () => {
    setIsClocked(false)
    setClockInTime("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
          <p className="text-muted-foreground">
            Track your work hours, view time logs, and monitor your attendance
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
          <div className="text-sm text-muted-foreground">{currentTime.toLocaleDateString()}</div>
        </div>
      </div>

      {/* Clock In/Out Card */}
      <Card className={`${isClocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Current Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${isClocked ? 'text-green-600' : 'text-gray-500'}`}>
                  {isClocked ? 'CLOCKED IN' : 'CLOCKED OUT'}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {isClocked ? `Since ${new Date(clockInTime).toLocaleTimeString()}` : 'Ready to start'}
                </div>
              </div>
              
              <div className="flex space-x-2">
                {!isClocked ? (
                  <Button 
                    onClick={handleClockIn}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Clock In
                  </Button>
                ) : (
                  <Button 
                    onClick={handleClockOut}
                    variant="destructive"
                    className="flex-1"
                  >
                    <PauseCircle className="mr-2 h-4 w-4" />
                    Clock Out
                  </Button>
                )}
                <Button variant="outline">
                  <Coffee className="mr-2 h-4 w-4" />
                  Break
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Time Worked Today</div>
                <div className="text-2xl font-bold">{calculateWorkedToday()}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Location</div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{currentStatus.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Expected Hours</div>
                <div className="text-lg font-medium">{todaySchedule.totalExpectedHours}h</div>
                <Progress 
                  value={isClocked ? (parseFloat(calculateWorkedToday()) / todaySchedule.totalExpectedHours) * 100 : 0} 
                  className="h-2 mt-1" 
                />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Schedule</div>
                <div className="text-sm">{todaySchedule.expectedStart} - {todaySchedule.expectedEnd}</div>
                <div className="text-xs text-muted-foreground">Lunch: {todaySchedule.lunchBreak}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">Time Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tenure">Company History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Today's Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateWorkedToday()}</div>
                <p className="text-xs text-muted-foreground">
                  Target: {todaySchedule.totalExpectedHours}h
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breaks Taken</CardTitle>
                <Coffee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStatus.breaksTaken}</div>
                <p className="text-xs text-muted-foreground">
                  15min break available
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productivity</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-muted-foreground">
                  Above average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">On Track</div>
                <p className="text-xs text-muted-foreground">
                  Meeting expectations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Timeline</CardTitle>
              <CardDescription>Your work timeline for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium">Clocked In</div>
                    <div className="text-sm text-muted-foreground">Started work day</div>
                  </div>
                  <div className="text-sm font-medium">09:15 AM</div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Coffee className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-medium">Break Taken</div>
                    <div className="text-sm text-muted-foreground">15 minute coffee break</div>
                  </div>
                  <div className="text-sm font-medium">10:30 AM</div>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg opacity-60">
                  <Timer className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">Lunch Break</div>
                    <div className="text-sm text-muted-foreground">Planned for 12:00 PM</div>
                  </div>
                  <div className="text-sm font-medium">Upcoming</div>
                </div>

                <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg opacity-60">
                  <PauseCircle className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <div className="font-medium">Clock Out</div>
                    <div className="text-sm text-muted-foreground">End of work day</div>
                  </div>
                  <div className="text-sm font-medium">17:30 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Recent Time Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Time Logs</CardTitle>
              <CardDescription>Your work history for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTimeLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{new Date(log.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric'
                          })}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{log.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatDuration(log.totalHours)}</div>
                        {log.overtimeHours > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{formatDuration(log.overtimeHours)} OT
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Clock In</div>
                        <div className="font-medium">{log.clockIn}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Clock Out</div>
                        <div className="font-medium">{log.clockOut}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Lunch</div>
                        <div className="font-medium">{log.lunchStart} - {log.lunchEnd}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Status</div>
                        <Badge variant="outline" className="text-xs">
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Weekly Stats */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>This Week</CardTitle>
                <CardDescription>Your performance this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Hours</span>
                    <span className="font-medium">{formatDuration(weeklyStats.totalHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Hours</span>
                    <span className="font-medium">{formatDuration(weeklyStats.expectedHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overtime</span>
                    <span className="font-medium text-blue-600">{formatDuration(weeklyStats.overtimeHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Daily Hours</span>
                    <span className="font-medium">{formatDuration(weeklyStats.avgDailyHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>On-time Rate</span>
                    <span className="font-medium text-green-600">{weeklyStats.onTimePercentage}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
                <CardDescription>Monthly summary and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Hours</span>
                    <span className="font-medium">{formatDuration(monthlyStats.totalHours)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Perfect Days</span>
                    <span className="font-medium text-green-600">{monthlyStats.perfectDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Late Arrivals</span>
                    <span className="font-medium text-yellow-600">{monthlyStats.lateDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remote Days</span>
                    <span className="font-medium text-blue-600">{monthlyStats.remoteDays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Daily Hours</span>
                    <span className="font-medium">{formatDuration(monthlyStats.avgDailyHours)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Hours Trend</CardTitle>
              <CardDescription>Your working hours over the past 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Chart visualization would go here</p>
                  <p className="text-sm text-gray-400">Shows daily hours, overtime, and trends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tenure" className="space-y-6">
          {/* Company History Overview */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Company Tenure</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{companyHistory.totalTenure}</div>
                  <div className="text-sm text-muted-foreground">Total Tenure</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{companyHistory.totalWorkingDays.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Working Days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{companyHistory.totalHours.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Career Milestones</span>
              </CardTitle>
              <CardDescription>Your journey at Zentiri HR</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {companyHistory.milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative mb-8 last:mb-0">
                    {/* Connection Line */}
                    {index < companyHistory.milestones.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                    )}
                    
                    <div className="flex items-start space-x-4">
                      {/* Milestone Icon */}
                      <div className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        milestone.type === 'start' ? 'bg-green-500' :
                        milestone.type === 'anniversary' ? 'bg-blue-500' :
                        milestone.type === 'promotion' ? 'bg-purple-500' :
                        'bg-yellow-500'
                      }`}>
                        {milestone.type === 'start' ? (
                          <User className="h-6 w-6 text-white" />
                        ) : milestone.type === 'anniversary' ? (
                          <Calendar className="h-6 w-6 text-white" />
                        ) : milestone.type === 'promotion' ? (
                          <Briefcase className="h-6 w-6 text-white" />
                        ) : (
                          <Award className="h-6 w-6 text-white" />
                        )}
                      </div>

                      {/* Milestone Details */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{milestone.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {new Date(milestone.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tenure Statistics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tenure Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Years of Service</span>
                    <Badge className="bg-blue-500">2.8 years</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Promotions Received</span>
                    <Badge className="bg-purple-500">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Awards & Recognition</span>
                    <Badge className="bg-yellow-500">1</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Performance Reviews</span>
                    <Badge className="bg-green-500">3 Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Hours/Day</span>
                    <span className="font-medium">{companyHistory.avgHoursPerDay}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance Rate</span>
                    <span className="font-medium text-green-600">96.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remote Work Days</span>
                    <span className="font-medium">142 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overtime Hours</span>
                    <span className="font-medium">156 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 