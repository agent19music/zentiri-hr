"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  LayoutDashboard,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Heart,
  Clock,
  FileText,
  Settings,
  Bell,
  MessageSquare,
  Shield,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Download,
  Building2,
  BookOpen,
  Target
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/employee/dashboard",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "My Profile",
    href: "/employee/profile",
    icon: User,
    current: false,
  },
  {
    name: "Workspace",
    href: "/employee/workspace",
    icon: Building2,
    current: false,
    badge: "Book",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Leave Requests",
    href: "/employee/leave",
    icon: Calendar,
    current: false,
    badge: "2",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Overtime",
    href: "/employee/overtime",
    icon: Clock,
    current: false,
    badge: "New",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Payroll",
    href: "/employee/payroll",
    icon: DollarSign,
    current: false,
  },
  {
    name: "Performance",
    href: "/employee/performance",
    icon: TrendingUp,
    current: false,
    badge: "1",
    badgeVariant: "destructive" as const,
  },
  {
    name: "Career Path",
    href: "/employee/career",
    icon: Target,
    current: false,
    badge: "New",
    badgeVariant: "secondary" as const,
  },
  {
    name: "Training",
    href: "/employee/training",
    icon: GraduationCap,
    current: false,
    badge: "3",
  },
  {
    name: "Policy Library",
    href: "/employee/policies",
    icon: BookOpen,
    current: false,
  },
  {
    name: "Benefits",
    href: "/employee/benefits",
    icon: Heart,
    current: false,
  },
  {
    name: "Time Tracking",
    href: "/employee/time",
    icon: Clock,
    current: false,
  },
  {
    name: "Documents",
    href: "/employee/documents",
    icon: FileText,
    current: false,
  },
]

const quickActions = [
  {
    name: "Request Leave",
    href: "/employee/leave/request",
    icon: Calendar,
    color: "bg-blue-500",
  },
  {
    name: "Submit Timesheet",
    href: "/employee/time/submit",
    icon: Clock,
    color: "bg-green-500",
  },
  {
    name: "Download Pay Stub",
    href: "/employee/payroll/paystubs",
    icon: Download,
    color: "bg-yellow-500",
  },
  {
    name: "Update Profile",
    href: "/employee/profile/edit",
    icon: User,
    color: "bg-purple-500",
  },
]

export function EmployeeSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
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
            <Badge variant="outline" className="text-xs">Employee</Badge>
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
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
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
        
        {/* Settings */}
        <Link
          href="/employee/settings"
          className={cn(
            "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-muted/50",
            pathname.startsWith("/employee/settings")
              ? "bg-primary/10 text-primary border border-primary/20"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Settings className={cn("h-5 w-5 shrink-0", collapsed ? "mr-0" : "mr-3")} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </nav>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex flex-col items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
              >
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center mb-2", action.color)}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-medium text-center text-muted-foreground group-hover:text-foreground">
                  {action.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Notifications indicator for collapsed state */}
      {collapsed && (
        <div className="p-2 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full h-10 p-0">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
} 
