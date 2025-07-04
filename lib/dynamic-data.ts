import { User } from './auth'

export interface OrganizationStats {
  totalEmployees: number
  activeEmployees: number
  onLeave: number
  departments: number
  avgPerformance: string
  monthlyPayroll: string
  openPositions: number
  pendingApprovals: number
}

export interface UserSpecificStats {
  leaveBalance: number
  pendingLeaveRequests: number
  nextPaycheck: string
  paycheckDate: string
  performanceScore: string
  performanceText: string
  trainingProgress: { completed: number; total: number }
  trainingRemaining: number
}

export interface DepartmentData {
  name: string
  count: number
  percentage: number
  color: string
}

// Mock data service - in production this would fetch from API
export class DynamicDataService {
  
  static getOrganizationStats(user: User): OrganizationStats {
    // Different stats based on organization
    const orgData = {
      'TechCorp Kenya': {
        totalEmployees: 187,
        activeEmployees: 182,
        onLeave: 5,
        departments: 6,
        avgPerformance: '4.3',
        monthlyPayroll: '$178,500',
        openPositions: 8,
        pendingApprovals: 12
      },
      'StartupHub': {
        totalEmployees: 23,
        activeEmployees: 22,
        onLeave: 1,
        departments: 3,
        avgPerformance: '4.1',
        monthlyPayroll: '$34,200',
        openPositions: 3,
        pendingApprovals: 2
      },
      'MegaCorp Industries': {
        totalEmployees: 1247,
        activeEmployees: 1183,
        onLeave: 64,
        departments: 12,
        avgPerformance: '4.0',
        monthlyPayroll: '$892,300',
        openPositions: 45,
        pendingApprovals: 38
      }
    }

    return orgData[user.organizationName as keyof typeof orgData] || orgData['TechCorp Kenya']
  }

  static getUserSpecificStats(user: User): UserSpecificStats {
    // Different stats based on user role and organization
    const baseStats = {
      'TechCorp Kenya': {
        leaveBalance: 18,
        pendingLeaveRequests: 1,
        nextPaycheck: '$4,250',
        paycheckDate: 'December 31, 2024',
        performanceScore: '4.2/5.0',
        performanceText: 'Exceeds expectations',
        trainingProgress: { completed: 3, total: 5 },
        trainingRemaining: 2
      },
      'StartupHub': {
        leaveBalance: 22,
        pendingLeaveRequests: 0,
        nextPaycheck: '$3,800',
        paycheckDate: 'December 31, 2024',
        performanceScore: '4.5/5.0',
        performanceText: 'Outstanding performance',
        trainingProgress: { completed: 2, total: 3 },
        trainingRemaining: 1
      },
      'MegaCorp Industries': {
        leaveBalance: 15,
        pendingLeaveRequests: 2,
        nextPaycheck: '$5,100',
        paycheckDate: 'December 31, 2024',
        performanceScore: '3.9/5.0',
        performanceText: 'Meets expectations',
        trainingProgress: { completed: 4, total: 7 },
        trainingRemaining: 3
      }
    }

    const orgStats = baseStats[user.organizationName as keyof typeof baseStats] || baseStats['TechCorp Kenya']

    // Adjust based on role level
    if (user.roleLevel <= 4) {
      // Managers get higher salaries
      const salaryMultiplier = user.roleLevel === 2 ? 1.8 : user.roleLevel === 3 ? 1.5 : 1.3
      const baseSalary = parseInt(orgStats.nextPaycheck.replace('$', '').replace(',', ''))
      orgStats.nextPaycheck = `$${Math.round(baseSalary * salaryMultiplier).toLocaleString()}`
    }

    return orgStats
  }

  static getDepartmentData(user: User): DepartmentData[] {
    const departmentData = {
      'TechCorp Kenya': [
        { name: "Engineering", count: 85, percentage: 45, color: "bg-blue-500" },
        { name: "Sales & Marketing", count: 42, percentage: 22, color: "bg-green-500" },
        { name: "Human Resources", count: 15, percentage: 8, color: "bg-purple-500" },
        { name: "Finance", count: 18, percentage: 10, color: "bg-yellow-500" },
        { name: "Operations", count: 27, percentage: 15, color: "bg-pink-500" }
      ],
      'StartupHub': [
        { name: "Operations", count: 12, percentage: 52, color: "bg-blue-500" },
        { name: "Consulting", count: 8, percentage: 35, color: "bg-green-500" },
        { name: "Admin", count: 3, percentage: 13, color: "bg-purple-500" }
      ],
      'MegaCorp Industries': [
        { name: "Production", count: 487, percentage: 39, color: "bg-blue-500" },
        { name: "Quality Assurance", count: 156, percentage: 13, color: "bg-green-500" },
        { name: "Human Resources", count: 89, percentage: 7, color: "bg-purple-500" },
        { name: "Engineering", count: 234, percentage: 19, color: "bg-yellow-500" },
        { name: "Finance", count: 127, percentage: 10, color: "bg-pink-500" },
        { name: "Logistics", count: 154, percentage: 12, color: "bg-indigo-500" }
      ]
    }

    return departmentData[user.organizationName as keyof typeof departmentData] || departmentData['TechCorp Kenya']
  }

  static getGreetingMessage(user: User): string {
    const timeOfDay = new Date().getHours()
    let greeting = 'Good morning'
    
    if (timeOfDay >= 12 && timeOfDay < 17) {
      greeting = 'Good afternoon'
    } else if (timeOfDay >= 17) {
      greeting = 'Good evening'
    }

    const roleGreetings = {
      'org_admin': `${greeting}, ${user.firstName}! Your organization is running smoothly.`,
      'hr_manager': `${greeting}, ${user.firstName}! Ready to manage your team today?`,
      'department_manager': `${greeting}, ${user.firstName}! Let's check on your ${user.department} team.`,
      'employee': `${greeting}, ${user.firstName}! Hope you have a productive day ahead.`
    }

    return roleGreetings[user.role as keyof typeof roleGreetings] || `${greeting}, ${user.firstName}!`
  }

  static getRecentActivity(user: User) {
    const activities = {
      'TechCorp Kenya': [
        {
          type: 'employee_joined',
          message: 'Sarah Johnson joined Engineering team',
          time: '2 hours ago',
          icon: 'Users',
          color: 'bg-blue-100'
        },
        {
          type: 'leave_approved',
          message: 'Michael Chen\'s vacation request approved',
          time: '4 hours ago',
          icon: 'CheckCircle',
          color: 'bg-green-100'
        },
        {
          type: 'training_completed',
          message: '12 employees completed security training',
          time: '6 hours ago',
          icon: 'GraduationCap',
          color: 'bg-purple-100'
        }
      ],
      'StartupHub': [
        {
          type: 'meeting_scheduled',
          message: 'All-hands meeting scheduled for next week',
          time: '1 hour ago',
          icon: 'Calendar',
          color: 'bg-blue-100'
        },
        {
          type: 'project_milestone',
          message: 'Q4 goals achieved ahead of schedule',
          time: '3 hours ago',
          icon: 'Target',
          color: 'bg-green-100'
        }
      ],
      'MegaCorp Industries': [
        {
          type: 'safety_training',
          message: '89 employees completed safety certification',
          time: '1 hour ago',
          icon: 'Shield',
          color: 'bg-yellow-100'
        },
        {
          type: 'production_milestone',
          message: 'Production line efficiency increased by 8%',
          time: '3 hours ago',
          icon: 'TrendingUp',
          color: 'bg-green-100'
        },
        {
          type: 'quality_audit',
          message: 'Monthly quality audit completed',
          time: '5 hours ago',
          icon: 'CheckCircle',
          color: 'bg-blue-100'
        }
      ]
    }

    return activities[user.organizationName as keyof typeof activities] || activities['TechCorp Kenya']
  }

  static getQuickActionsForRole(user: User) {
    const managerActions = [
      {
        id: "add-employee",
        title: "Add Employee",
        description: "Onboard a new team member",
        icon: "Users",
        color: "bg-blue-500",
      },
      {
        id: "approve-leave",
        title: "Approve Requests",
        description: "Review pending leave requests",
        icon: "Calendar",
        color: "bg-green-500",
      },
      {
        id: "run-payroll",
        title: "Run Payroll",
        description: "Process monthly payroll",
        icon: "DollarSign",
        color: "bg-yellow-500",
      },
      {
        id: "generate-report",
        title: "Generate Report",
        description: "Create analytics report",
        icon: "FileText",
        color: "bg-purple-500",
      }
    ]

    const employeeActions = [
      {
        id: "clock-in-out",
        title: "Clock In/Out",
        description: "Track your working hours",
        icon: "Clock",
        color: "bg-blue-500",
        primary: true
      },
      {
        id: "request-leave",
        title: "Request Leave",
        description: "Submit time off request",
        icon: "Calendar",
        color: "bg-green-500",
        primary: true
      },
      {
        id: "apply-loan",
        title: "Apply for Loan",
        description: "Submit loan application",
        icon: "DollarSign",
        color: "bg-yellow-500",
        primary: true
      },
      {
        id: "view-payslip",
        title: "View Payslip",
        description: "Download pay statements",
        icon: "Download",
        color: "bg-purple-500",
        primary: true
      },
      {
        id: "update-profile",
        title: "Update Profile",
        description: "Edit personal information",
        icon: "User",
        color: "bg-pink-500"
      },
      {
        id: "view-benefits",
        title: "Benefits",
        description: "Manage health & benefits",
        icon: "Heart",
        color: "bg-indigo-500"
      }
    ]

    return user.roleLevel <= 6 ? managerActions : employeeActions
  }
} 