// Role-based access control utilities

export type UserRole = "hr_manager" | "department_manager" | "team_lead" | "manager" | "employee"

export interface Permission {
  resource: string
  action: string
}

// Role hierarchy (lower number = higher authority)
export const ROLE_LEVELS = {
  hr_manager: 3,
  department_manager: 4,
  team_lead: 5,
  manager: 6,
  employee: 10
} as const

// Permission mappings for each role
export const ROLE_PERMISSIONS = {
  hr_manager: [
    // Employee management - Full access
    "employees.*",
    "employees.view",
    "employees.create", 
    "employees.update",
    "employees.delete",
    "employees.import",
    "employees.export",
    "employees.invite",
    
    // Departments & Teams - Full access
    "departments.*",
    "teams.*",
    
    // Recruitment - Full access
    "recruitment.*",
    
    // Payroll & Reports - Full access
    "payroll.*",
    "reports.*",
    
    // Organization - Full access
    "organization.*"
  ],
  
  department_manager: [
    // Employee management - Department scoped
    "employees.view",
    "employees.update", 
    "employees.create", 
    "employees.invite", // Can invite to their department
    
    // Department management - Own department only
    "departments.view",
    "departments.update_own",
    
    // Team management - Department teams only
    "teams.view",
    "teams.update", 
    "teams.create", // Within their department
    
    // Recruitment - Department focused
    "recruitment.view",
    "recruitment.interview",
    "recruitment.evaluate",
    "recruitment.create", // For their department
    
    // Reports - Department scoped
    "reports.view",
    "reports.create", // Department reports only
    
    // Performance - Department scoped
    "performance.view",
    "performance.evaluate"
  ],
  
  team_lead: [
    // Employee view - Team scoped
    "employees.view", 
    "employees.update", // Limited to team members
    
    // Team management - Own team only
    "teams.view",
    "teams.manage_own",
    "teams.update_own",
    
    // Recruitment - Team positions only
    "recruitment.view",
    "recruitment.interview",
    "recruitment.evaluate",
    
    // Performance - Team only
    "performance.view",
    "performance.evaluate",
    
    // Tasks - Team management
    "tasks.*",
    
    // Reports - Team scoped
    "reports.view"
  ],
  
  manager: [
    // Employee view - Limited scope
    "employees.view",
    
    // Recruitment - Interview capabilities
    "recruitment.view",
    "recruitment.interview",
    
    // Performance - Limited evaluation
    "performance.view",
    "performance.evaluate",
    
    // Tasks - Management capabilities
    "tasks.create",
    "tasks.assign",
    "tasks.view",
    
    // Reports - View only
    "reports.view"
  ],
  
  employee: [
    // Personal access only
    "profile.*",
    "tasks.view_own",
    "tasks.update_own",
    "payroll.view_own",
    "leave.view_own",
    "leave.request",
    "performance.view_own"
  ]
} as const

/**
 * Check if a user role has a specific permission
 */
export function hasPermission(userRole: UserRole, permission: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  
  return rolePermissions.some(p => {
    // Exact match
    if (p === permission) return true
    
    // Wildcard match (e.g., "employees.*" matches "employees.view")
    if (p.endsWith("*")) {
      const prefix = p.slice(0, -1)
      return permission.startsWith(prefix)
    }
    
    return false
  })
}

/**
 * Check if user can manage another user (based on role hierarchy)
 */
export function canManageUser(currentUserRole: UserRole, targetUserRole: UserRole): boolean {
  return ROLE_LEVELS[currentUserRole] < ROLE_LEVELS[targetUserRole]
}

/**
 * Get filtered permissions for UI display
 */
export function getAccessibleFeatures(userRole: UserRole) {
  return {
    // Employee management
    canViewAllEmployees: hasPermission(userRole, "employees.view"),
    canCreateEmployees: hasPermission(userRole, "employees.create"),
    canEditEmployees: hasPermission(userRole, "employees.update"),
    canDeleteEmployees: hasPermission(userRole, "employees.delete"),
    canImportEmployees: hasPermission(userRole, "employees.import"),
    canExportEmployees: hasPermission(userRole, "employees.export"),
    canInviteEmployees: hasPermission(userRole, "employees.invite"),
    
    // Department management
    canViewDepartments: hasPermission(userRole, "departments.view"),
    canManageDepartments: hasPermission(userRole, "departments.update"),
    canCreateDepartments: hasPermission(userRole, "departments.create"),
    canManageOwnDepartment: hasPermission(userRole, "departments.update_own"),
    
    // Team management
    canViewTeams: hasPermission(userRole, "teams.view"),
    canManageTeams: hasPermission(userRole, "teams.update"),
    canCreateTeams: hasPermission(userRole, "teams.create"),
    canManageOwnTeam: hasPermission(userRole, "teams.manage_own"),
    
    // Recruitment
    canViewRecruitment: hasPermission(userRole, "recruitment.view"),
    canCreateJobs: hasPermission(userRole, "recruitment.create"),
    canManageRecruitment: hasPermission(userRole, "recruitment.update"),
    canInterview: hasPermission(userRole, "recruitment.interview"),
    canPublishJobs: hasPermission(userRole, "recruitment.publish"),
    canEvaluateCandidates: hasPermission(userRole, "recruitment.evaluate"),
    
    // Reports & Analytics
    canViewReports: hasPermission(userRole, "reports.view"),
    canCreateReports: hasPermission(userRole, "reports.create"),
    canExportReports: hasPermission(userRole, "reports.export"),
    
    // Payroll
    canViewPayroll: hasPermission(userRole, "payroll.view"),
    canProcessPayroll: hasPermission(userRole, "payroll.process"),
    canViewOwnPayroll: hasPermission(userRole, "payroll.view_own"),
    
    // Performance
    canViewPerformance: hasPermission(userRole, "performance.view"),
    canEvaluatePerformance: hasPermission(userRole, "performance.evaluate"),
    canViewOwnPerformance: hasPermission(userRole, "performance.view_own"),
    
    // Organization
    canAccessSettings: hasPermission(userRole, "organization.settings"),
    canAccessBilling: hasPermission(userRole, "organization.billing"),
    
    // Tasks
    canManageTasks: hasPermission(userRole, "tasks.create"),
    canAssignTasks: hasPermission(userRole, "tasks.assign"),
    canViewAllTasks: hasPermission(userRole, "tasks.view"),
    canViewOwnTasks: hasPermission(userRole, "tasks.view_own")
  }
}

/**
 * Get role display information
 */
export function getRoleInfo(role: UserRole) {
  const roleInfo = {
    hr_manager: {
      label: "HR Manager",
      description: "Full access to employee management, recruitment, and organizational settings",
      color: "bg-purple-500",
      level: "High Authority",
      scope: "Organization-wide access with full administrative privileges"
    },
    department_manager: {
      label: "Department Manager", 
      description: "Manage employees and operations within assigned department",
      color: "bg-blue-500",
      level: "Department Authority",
      scope: "Department-scoped access with management capabilities"
    },
    team_lead: {
      label: "Team Lead",
      description: "Lead and manage assigned team members",
      color: "bg-green-500", 
      level: "Team Authority",
      scope: "Team-focused management with limited broader access"
    },
    manager: {
      label: "Manager",
      description: "General management responsibilities with interview capabilities",
      color: "bg-orange-500",
      level: "Limited Authority",
      scope: "Cross-functional management with interview permissions"
    },
    employee: {
      label: "Employee",
      description: "Basic employee access to personal information and tasks",
      color: "bg-gray-500",
      level: "Standard Access",
      scope: "Personal data and assigned task access only"
    }
  }
  
  return roleInfo[role]
}

/**
 * Get role-specific access scope description
 */
export function getAccessScope(userRole: UserRole): string {
  switch (userRole) {
    case "hr_manager":
      return "You have full access to all employee data, recruitment processes, and organizational settings."
    case "department_manager":
      return "You can manage employees and recruitment within your department, with access to department-specific reports."
    case "team_lead":
      return "You can manage your team members, participate in recruitment interviews, and track team performance."
    case "manager":
      return "You can view employee information, participate in interviews, and access relevant reports."
    case "employee":
      return "You have access to your personal information, assigned tasks, and individual performance data."
    default:
      return "Access level not defined."
  }
}

/**
 * Get appropriate navigation items based on role
 */
export function getNavigationItems(userRole: UserRole) {
  const features = getAccessibleFeatures(userRole)
  
  const navItems = [
    {
      name: "Dashboard",
      href: "/employer/dashboard",
      icon: "LayoutDashboard",
      show: true
    }
  ]
  
  if (features.canViewAllEmployees) {
    navItems.push({
      name: "Employees", 
      href: "/employer/employees",
      icon: "Users",
      show: true,
      badge: userRole === "hr_manager" ? "342" : undefined
    })
  }
  
  if (features.canViewRecruitment) {
    navItems.push({
      name: "Recruitment",
      href: "/employer/recruitment", 
      icon: "UserPlus",
      show: true,
      badge: features.canCreateJobs ? "12" : undefined,
      badgeVariant: "destructive" as const
    })
  }
  
  // Add other navigation items based on permissions
  if (hasPermission(userRole, "payroll.view")) {
    navItems.push({
      name: "Payroll",
      href: "/employer/payroll",
      icon: "DollarSign", 
      show: true
    })
  }
  
  if (hasPermission(userRole, "performance.view")) {
    navItems.push({
      name: "Performance",
      href: "/employer/performance",
      icon: "TrendingUp",
      show: true,
      badge: userRole === "hr_manager" ? "3" : undefined
    })
  }
  
  if (hasPermission(userRole, "reports.view")) {
    navItems.push({
      name: "Analytics",
      href: "/employer/analytics",
      icon: "BarChart3",
      show: true
    })
  }
  
  return navItems.filter(item => item.show)
}

/**
 * Get permission-based action descriptions for UI
 */
export function getActionPermissions(userRole: UserRole) {
  const features = getAccessibleFeatures(userRole)
  
  return {
    employees: {
      canAdd: features.canCreateEmployees,
      canEdit: features.canEditEmployees,
      canDelete: features.canDeleteEmployees,
      canImport: features.canImportEmployees,
      canExport: features.canExportEmployees,
      scope: userRole === "hr_manager" ? "all employees" : 
             userRole === "department_manager" ? "department employees" :
             userRole === "team_lead" ? "team members" : "limited view"
    },
    recruitment: {
      canCreateJobs: features.canCreateJobs,
      canInterview: features.canInterview,
      canEvaluate: features.canEvaluateCandidates,
      canManage: features.canManageRecruitment,
      scope: userRole === "hr_manager" ? "all positions" :
             userRole === "department_manager" ? "department positions" :
             userRole === "team_lead" ? "team positions" : "interview only"
    },
    reports: {
      canView: features.canViewReports,
      canCreate: features.canCreateReports,
      canExport: features.canExportReports,
      scope: userRole === "hr_manager" ? "organization-wide" :
             userRole === "department_manager" ? "department-specific" :
             "limited scope"
    }
  }
} 