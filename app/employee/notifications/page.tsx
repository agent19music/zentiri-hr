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
  Info,
  Calendar,
  DollarSign,
  User,
  Building2,
  GraduationCap,
  Heart,
  Settings,
  Trash2,
  Archive,
  Star,
  Clock,
  MessageSquare,
  Shield,
  TrendingUp
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const allNotifications = [
  {
    id: "1",
    type: "leave",
    category: "Leave Management",
    title: "Leave Request Approved",
    message: "Your vacation request for Dec 20-22 has been approved by Sarah Johnson.",
    timestamp: "2 hours ago",
    date: "Dec 18, 2024",
    isRead: false,
    priority: "high",
    icon: Calendar,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    actionRequired: false
  },
  {
    id: "2", 
    type: "payroll",
    category: "Payroll",
    title: "Pay Stub Available",
    message: "Your December 2024 pay stub is now available for download.",
    timestamp: "5 hours ago",
    date: "Dec 18, 2024",
    isRead: false,
    priority: "medium",
    icon: DollarSign,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    actionRequired: true
  },
  {
    id: "3",
    type: "training",
    category: "Training & Development", 
    title: "Training Deadline Reminder",
    message: "Cybersecurity Awareness training is due in 3 days (Jan 15, 2025).",
    timestamp: "1 day ago",
    date: "Dec 17, 2024",
    isRead: true,
    priority: "high",
    icon: GraduationCap,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    actionRequired: true
  },
  {
    id: "4",
    type: "benefits",
    category: "Benefits",
    title: "Open Enrollment Ending Soon",
    message: "Benefits enrollment closes in 5 days. Review and update your selections.",
    timestamp: "2 days ago", 
    date: "Dec 16, 2024",
    isRead: false,
    priority: "high",
    icon: Heart,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    actionRequired: true
  },
  {
    id: "5",
    type: "company",
    category: "Company News",
    title: "Holiday Schedule Announced",
    message: "Company will be closed from Dec 24-26 and Jan 1. Plan your work accordingly.",
    timestamp: "3 days ago",
    date: "Dec 15, 2024", 
    isRead: true,
    priority: "medium",
    icon: Building2,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    actionRequired: false
  },
  {
    id: "6",
    type: "performance", 
    category: "Performance",
    title: "Quarterly Review Scheduled",
    message: "Your Q4 performance review is scheduled for Jan 10, 2025 at 2:00 PM.",
    timestamp: "4 days ago",
    date: "Dec 14, 2024",
    isRead: true,
    priority: "medium",
    icon: TrendingUp,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    actionRequired: false
  },
  {
    id: "7",
    type: "profile",
    category: "Profile",
    title: "Profile Update Required",
    message: "Please update your emergency contact information by Dec 31, 2024.",
    timestamp: "5 days ago",
    date: "Dec 13, 2024",
    isRead: false,
    priority: "medium",
    icon: User,
    iconColor: "text-gray-600",
    bgColor: "bg-gray-50",
    actionRequired: true
  },
  {
    id: "8",
    type: "security",
    category: "Security", 
    title: "Password Expiry Warning",
    message: "Your password will expire in 7 days. Please update it to maintain access.",
    timestamp: "6 days ago",
    date: "Dec 12, 2024",
    isRead: true,
    priority: "high",
    icon: Shield,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    actionRequired: true
  },
  {
    id: "9",
    type: "system",
    category: "System",
    title: "System Maintenance Notice",
    message: "Scheduled maintenance on Dec 21 from 12-2 AM. Limited access expected.",
    timestamp: "1 week ago",
    date: "Dec 11, 2024",
    isRead: true,
    priority: "low",
    icon: Settings,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-50",
    actionRequired: false
  },
  {
    id: "10",
    type: "feedback",
    category: "Feedback",
    title: "360° Feedback Request",
    message: "You've been asked to provide feedback for John Smith's performance review.",
    timestamp: "1 week ago", 
    date: "Dec 10, 2024",
    isRead: false,
    priority: "medium",
    icon: MessageSquare,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
    actionRequired: true
  }
]

export default function EmployeeNotifications() {
  const [notifications, setNotifications] = useState(allNotifications)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    "all",
    "Leave Management",
    "Payroll", 
    "Training & Development",
    "Benefits",
    "Company News",
    "Performance",
    "Profile",
    "Security",
    "System",
    "Feedback"
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
    } else if (activeTab === "important") {
      matchesTab = notification.priority === "high" || notification.actionRequired
    } else if (activeTab === "action-required") {
      matchesTab = notification.actionRequired
    }

    return matchesSearch && matchesCategory && matchesPriority && matchesReadStatus && matchesTab
  })

  const unreadCount = notifications.filter(n => !n.isRead).length
  const importantCount = notifications.filter(n => n.priority === "high" || n.actionRequired).length
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const handleBulkAction = (action: string) => {
    if (action === "markRead") {
      setNotifications(prev => 
        prev.map(n => selectedNotifications.includes(n.id) ? { ...n, isRead: true } : n)
      )
    } else if (action === "delete") {
      setNotifications(prev => 
        prev.filter(n => !selectedNotifications.includes(n.id))
      )
    }
    setSelectedNotifications([])
  }

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    )
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id))
    }
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important announcements and reminders.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
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

          {selectedNotifications.length > 0 && (
            <div className="flex items-center justify-between mt-4 p-3 bg-muted rounded-lg">
              <span className="text-sm">
                {selectedNotifications.length} notification(s) selected
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("markRead")}>
                  Mark as Read
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("delete")}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="important">
            Important ({importantCount})
          </TabsTrigger>
          <TabsTrigger value="action-required">
            Action Required ({actionRequiredCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Bulk Actions Bar */}
          {filteredNotifications.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedNotifications.length === filteredNotifications.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm">Select all</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {filteredNotifications.length} notification(s)
              </span>
            </div>
          )}

          {/* Notifications List */}
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
                      <Checkbox
                        checked={selectedNotifications.includes(notification.id)}
                        onCheckedChange={() => handleSelectNotification(notification.id)}
                      />
                      
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
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{notification.date}</span>
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead && (
                                <DropdownMenuItem onClick={() => handleMarkAsRead(notification.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as read
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                Star
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="h-4 w-4 mr-2" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleDeleteNotification(notification.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {notification.actionRequired && (
                          <div className="mt-3 pt-3 border-t">
                            <Button size="sm" className="mr-2">
                              Take Action
                            </Button>
                            <Button size="sm" variant="outline">
                              Remind Later
                            </Button>
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
