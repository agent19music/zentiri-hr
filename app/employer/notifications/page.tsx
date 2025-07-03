"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Search, 
  Filter,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  DollarSign,
  UserPlus,
  Building2,
  BarChart3,
  Settings,
  Clock,
  Briefcase,
  Shield,
  FileText,
  Target
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const employerNotifications = [
  {
    id: "1",
    type: "leave-request",
    category: "Leave Management",
    title: "Leave Request - Alice Smith",
    message: "Alice Smith has submitted a vacation leave request for Dec 20-22, 2024.",
    timestamp: "30 minutes ago",
    date: "Dec 18, 2024",
    isRead: false,
    priority: "high",
    icon: Calendar,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    actionRequired: true,
    employee: "Alice Smith"
  },
  {
    id: "2",
    type: "application",
    category: "Recruitment",
    title: "New Job Application",
    message: "John Doe applied for Software Engineer position. 5 years experience.",
    timestamp: "2 hours ago",
    date: "Dec 18, 2024",
    isRead: false,
    priority: "medium",
    icon: UserPlus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    actionRequired: true,
    position: "Software Engineer"
  },
  {
    id: "3",
    type: "payroll",
    category: "Payroll",
    title: "Payroll Processing Complete",
    message: "December 2024 payroll has been processed successfully for 45 employees.",
    timestamp: "4 hours ago",
    date: "Dec 18, 2024",
    isRead: true,
    priority: "medium",
    icon: DollarSign,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    actionRequired: false
  },
  {
    id: "4",
    type: "performance",
    category: "Performance",
    title: "Performance Review Overdue",
    message: "3 performance reviews are overdue. Employee reviews pending manager action.",
    timestamp: "1 day ago",
    date: "Dec 17, 2024",
    isRead: false,
    priority: "high",
    icon: Target,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    actionRequired: true,
    count: 3
  },
  {
    id: "5",
    type: "compliance",
    category: "Compliance",
    title: "Training Deadline Alert",
    message: "15 employees have not completed mandatory cybersecurity training due Jan 15.",
    timestamp: "2 days ago",
    date: "Dec 16, 2024",
    isRead: true,
    priority: "high",
    icon: Shield,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    actionRequired: true,
    count: 15
  },
  {
    id: "6",
    type: "system",
    category: "System",
    title: "System Backup Completed",
    message: "Weekly system backup completed successfully. All data secured.",
    timestamp: "3 days ago",
    date: "Dec 15, 2024",
    isRead: true,
    priority: "low",
    icon: Settings,
    iconColor: "text-gray-600",
    bgColor: "bg-gray-50",
    actionRequired: false
  },
  {
    id: "7",
    type: "analytics",
    category: "Analytics",
    title: "Monthly Report Available",
    message: "November 2024 HR analytics report is ready for review.",
    timestamp: "4 days ago",
    date: "Dec 14, 2024",
    isRead: false,
    priority: "medium",
    icon: BarChart3,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    actionRequired: false
  },
  {
    id: "8",
    type: "budget",
    category: "Budget",
    title: "Budget Variance Alert",
    message: "Training budget is 85% utilized. Consider adjusting allocation for Q1.",
    timestamp: "5 days ago",
    date: "Dec 13, 2024",
    isRead: true,
    priority: "medium",
    icon: DollarSign,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    actionRequired: false
  }
]

export default function EmployerNotifications() {
  const [notifications, setNotifications] = useState(employerNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    "all",
    "Leave Management",
    "Recruitment",
    "Payroll",
    "Performance",
    "Compliance",
    "System",
    "Analytics",
    "Budget"
  ]

  const priorities = ["all", "high", "medium", "low"]

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || notification.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || notification.priority === selectedPriority
    const matchesReadStatus = !showUnreadOnly || !notification.isRead
    
    let matchesTab = true
    if (activeTab === "unread") {
      matchesTab = !notification.isRead
    } else if (activeTab === "urgent") {
      matchesTab = notification.priority === "high" || notification.actionRequired
    } else if (activeTab === "action-required") {
      matchesTab = notification.actionRequired
    }

    return matchesSearch && matchesCategory && matchesPriority && matchesReadStatus && matchesTab
  })

  const unreadCount = notifications.filter(n => !n.isRead).length
  const urgentCount = notifications.filter(n => n.priority === "high" || n.actionRequired).length
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay informed about important HR activities and system updates.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unread-only"
                  checked={showUnreadOnly}
                  onCheckedChange={setShowUnreadOnly}
                />
                <label htmlFor="unread-only" className="text-sm font-medium">
                  Unread only
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="urgent">
            Urgent ({urgentCount})
          </TabsTrigger>
          <TabsTrigger value="action-required">
            Action Required ({actionRequiredCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                  <p className="text-muted-foreground text-center">
                    {searchQuery || selectedCategory !== "all" || selectedPriority !== "all" || showUnreadOnly
                      ? "Try adjusting your filters to see more notifications."
                      : "You're all caught up! Check back later for new updates."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`transition-all hover:shadow-md ${
                    !notification.isRead ? "border-l-4 border-l-primary bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${notification.bgColor}`}>
                        <notification.icon className={`h-5 w-5 ${notification.iconColor}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`text-sm font-medium ${!notification.isRead ? "font-semibold" : ""}`}>
                                {notification.title}
                              </h3>
                              <Badge variant={getPriorityBadgeVariant(notification.priority)} className="text-xs">
                                {notification.priority}
                              </Badge>
                              {notification.actionRequired && (
                                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                                  Action Required
                                </Badge>
                              )}
                              {!notification.isRead && (
                                <div className="h-2 w-2 bg-primary rounded-full" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{notification.timestamp}</span>
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                              {notification.employee && (
                                <span className="flex items-center space-x-1">
                                  <Users className="h-3 w-3" />
                                  <span>{notification.employee}</span>
                                </span>
                              )}
                              {notification.count && (
                                <span className="flex items-center space-x-1">
                                  <span>{notification.count} affected</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            {!notification.isRead ? "Mark Read" : "Read"}
                          </Button>
                        </div>

                        {notification.actionRequired && (
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex space-x-2">
                              {notification.type === "leave-request" && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Reject
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                </>
                              )}
                              {notification.type === "application" && (
                                <>
                                  <Button size="sm">
                                    Review Application
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Schedule Interview
                                  </Button>
                                </>
                              )}
                              {notification.type === "performance" && (
                                <>
                                  <Button size="sm">
                                    Review Performance
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Send Reminder
                                  </Button>
                                </>
                              )}
                              {notification.type === "compliance" && (
                                <>
                                  <Button size="sm">
                                    View Training
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Send Reminder
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
