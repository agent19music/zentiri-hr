"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  LayoutDashboard,
  Users,
  UserPlus,
  DollarSign,
  TrendingUp,
  Calendar,
  GraduationCap,
  BarChart3,
  Settings,
  Bell,
  FileText,
  Target,
  Clock,
  Shield,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Building2
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/employer/dashboard",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "Employees",
    href: "/employer/employees",
    icon: Users,
    current: false,
    badge: "342",
  },
  {
    name: "Recruitment",
    href: "/employer/recruitment",
    icon: UserPlus,
    current: false,
    badge: "12",
    badgeVariant: "destructive" as const,
  },
  {
    name: "Workspace",
    href: "/employer/workspace",
    icon: Building2,
    current: false,
    badge: "New",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Payroll",
    href: "/employer/payroll",
    icon: DollarSign,
    current: false,
  },
  {
    name: "Performance",
    href: "/employer/performance",
    icon: TrendingUp,
    current: false,
    badge: "3",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Leave Management",
    href: "/employer/leave",
    icon: Calendar,
    current: false,
    badge: "8",
  },
  {
    name: "Overtime",
    href: "/employer/overtime",
    icon: Clock,
    current: false,
    badge: "5",
    badgeVariant: "destructive" as const,
  },
  {
    name: "Training",
    href: "/employer/training",
    icon: GraduationCap,
    current: false,
  },
  {
    name: "Analytics",
    href: "/employer/analytics",
    icon: BarChart3,
    current: false,
  },
]

const quickActions = [
  {
    id: "add-employee",
    title: "Add Employee",
    description: "Onboard a new team member",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    id: "post-job",
    title: "Post Job",
    description: "Create job listing",
    icon: UserPlus,
    color: "bg-green-500",
  },
  {
    id: "run-payroll",
    title: "Run Payroll",
    description: "Process payroll",
    icon: DollarSign,
    color: "bg-yellow-500",
  },
  {
    id: "generate-report",
    title: "Generate Report",
    description: "Create analytics report",
    icon: FileText,
    color: "bg-purple-500",
  },
]

export function EmployerSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>({})

  const handleQuickAction = (actionId: string) => {
    setOpenDialog(actionId)
    setFormData({})
  }

  const handleCloseDialog = () => {
    setOpenDialog(null)
    setFormData({})
  }

  const handleSubmit = (actionId: string) => {
    // Handle form submission based on action
    console.log(`Submitting ${actionId}:`, formData)
    handleCloseDialog()
    // Add success toast here
  }

  return (
    <>
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-background border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <img 
                src="/zentiri-logo.png" 
                alt="Zentiri HR Logo" 
                className="h-8 w-8 rounded-lg object-contain"
              />
              <span className="text-xl font-bold">Zentiri HR</span>
              <Badge variant="secondary" className="text-xs">Pro</Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/50",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    collapsed ? "mr-0" : "mr-3"
                  )}
                />
                {!collapsed && (
                  <>
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant={item.badgeVariant || "default"}
                        className="ml-auto text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            )
          })}
          
          <Separator className="my-4" />
          
          {/* Quick Actions Section */}
          {!collapsed && (
            <div className="space-y-2">
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Quick Actions
                </h3>
              </div>
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-muted/50"
                  onClick={() => handleQuickAction(action.id)}
                >
                  <div className={`h-6 w-6 rounded-md flex items-center justify-center mr-3 ${action.color}`}>
                    <action.icon className="h-3 w-3 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{action.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          <Separator className="my-4" />
          
          {/* Settings */}
          <Link
            href="/employer/settings"
            className={cn(
              "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/50",
              pathname.startsWith("/employer/settings")
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Settings className={cn("h-5 w-5 shrink-0", collapsed ? "mr-0" : "mr-3")} />
            {!collapsed && <span>Settings</span>}
          </Link>
        </nav>
      </div>

      {/* Quick Action Dialogs */}
      
      {/* Add Employee Dialog */}
      <Dialog open={openDialog === "add-employee"} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Enter the details for the new employee to start the onboarding process.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@company.com"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => setFormData({...formData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  placeholder="Software Engineer"
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit("add-employee")}>
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Post Job Dialog */}
      <Dialog open={openDialog === "post-job"} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Post Job Opening</DialogTitle>
            <DialogDescription>
              Create a new job listing to attract qualified candidates.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="Senior Software Engineer"
                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job-department">Department</Label>
                <Select onValueChange={(value) => setFormData({...formData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-type">Employment Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, jobType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Describe the role, responsibilities, and requirements..."
                className="min-h-[100px]"
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary-min">Min Salary</Label>
                <Input
                  id="salary-min"
                  type="number"
                  placeholder="80000"
                  onChange={(e) => setFormData({...formData, salaryMin: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-max">Max Salary</Label>
                <Input
                  id="salary-max"
                  type="number"
                  placeholder="120000"
                  onChange={(e) => setFormData({...formData, salaryMax: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit("post-job")}>
              Post Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Run Payroll Dialog */}
      <Dialog open={openDialog === "run-payroll"} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Run Payroll</DialogTitle>
            <DialogDescription>
              Process payroll for your employees for the selected period.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payroll-period">Payroll Period</Label>
              <Select onValueChange={(value) => setFormData({...formData, period: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payroll period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="december-2024">December 2024</SelectItem>
                  <SelectItem value="january-2025">January 2025</SelectItem>
                  <SelectItem value="february-2025">February 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payroll-type">Payroll Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payroll type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular Payroll</SelectItem>
                  <SelectItem value="bonus">Bonus Payroll</SelectItem>
                  <SelectItem value="off-cycle">Off-cycle Payroll</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payroll-notes">Notes (Optional)</Label>
              <Textarea
                id="payroll-notes"
                placeholder="Any additional notes for this payroll run..."
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit("run-payroll")}>
              Process Payroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={openDialog === "generate-report"} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Report</DialogTitle>
            <DialogDescription>
              Create a custom analytics report for your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, reportType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee-summary">Employee Summary</SelectItem>
                  <SelectItem value="payroll-report">Payroll Report</SelectItem>
                  <SelectItem value="attendance-report">Attendance Report</SelectItem>
                  <SelectItem value="performance-report">Performance Report</SelectItem>
                  <SelectItem value="recruitment-report">Recruitment Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-start-date">Start Date</Label>
                <Input
                  id="report-start-date"
                  type="date"
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-end-date">End Date</Label>
                <Input
                  id="report-end-date"
                  type="date"
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-format">Format</Label>
              <Select onValueChange={(value) => setFormData({...formData, format: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit("generate-report")}>
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
} 
