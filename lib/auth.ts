// Mock authentication system for testing
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  displayName: string
  organizationId: string
  organizationName: string
  organizationSubdomain: string
  employeeId: string
  department: string
  team?: string
  role: string
  roleLevel: number
  avatar?: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

// Test credentials for different companies and roles
export const TEST_CREDENTIALS = {
  // TechCorp Kenya - Professional Plan
  'jane.smith@techcorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u1111111-1111-1111-1111-111111111112',
      email: 'jane.smith@techcorp.co.ke',
      firstName: 'Jane',
      lastName: 'Smith',
      displayName: 'Jane Smith',
      organizationId: '11111111-1111-1111-1111-111111111111',
      organizationName: 'TechCorp Kenya',
      organizationSubdomain: 'techcorp-ke',
      employeeId: 'EMP002',
      department: 'Human Resources',
      role: 'hr_manager',
      roleLevel: 3,
      avatar: '/placeholder-user.jpg'
    }
  },
  'john.doe@techcorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u1111111-1111-1111-1111-111111111111',
      email: 'john.doe@techcorp.co.ke',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
      organizationId: '11111111-1111-1111-1111-111111111111',
      organizationName: 'TechCorp Kenya',
      organizationSubdomain: 'techcorp-ke',
      employeeId: 'EMP001',
      department: 'Engineering',
      team: 'Backend Development',
      role: 'department_manager',
      roleLevel: 4,
      avatar: '/placeholder-user.jpg'
    }
  },
  'mike.johnson@techcorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u1111111-1111-1111-1111-111111111113',
      email: 'mike.johnson@techcorp.co.ke',
      firstName: 'Michael',
      lastName: 'Johnson',
      displayName: 'Mike Johnson',
      organizationId: '11111111-1111-1111-1111-111111111111',
      organizationName: 'TechCorp Kenya',
      organizationSubdomain: 'techcorp-ke',
      employeeId: 'EMP003',
      department: 'Engineering',
      team: 'Frontend Development',
      role: 'employee',
      roleLevel: 10,
      avatar: '/placeholder-user.jpg'
    }
  },
  'sarah.wilson@techcorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u1111111-1111-1111-1111-111111111114',
      email: 'sarah.wilson@techcorp.co.ke',
      firstName: 'Sarah',
      lastName: 'Wilson',
      displayName: 'Sarah Wilson',
      organizationId: '11111111-1111-1111-1111-111111111111',
      organizationName: 'TechCorp Kenya',
      organizationSubdomain: 'techcorp-ke',
      employeeId: 'EMP004',
      department: 'Sales & Marketing',
      team: 'Digital Marketing',
      role: 'employee',
      roleLevel: 10,
      avatar: '/placeholder-user.jpg'
    }
  },

  // StartupHub - Starter Plan
  'alice.johnson@startuphub.co.ke': {
    password: 'password123',
    user: {
      id: 'u2222222-2222-2222-2222-222222222221',
      email: 'alice.johnson@startuphub.co.ke',
      firstName: 'Alice',
      lastName: 'Johnson',
      displayName: 'Alice Johnson',
      organizationId: '22222222-2222-2222-2222-222222222222',
      organizationName: 'StartupHub',
      organizationSubdomain: 'startuphub',
      employeeId: 'SH001',
      department: 'Operations',
      role: 'org_admin',
      roleLevel: 2,
      avatar: '/placeholder-user.jpg'
    }
  },
  'bob.williams@startuphub.co.ke': {
    password: 'password123',
    user: {
      id: 'u2222222-2222-2222-2222-222222222222',
      email: 'bob.williams@startuphub.co.ke',
      firstName: 'Bob',
      lastName: 'Williams',
      displayName: 'Bob Williams',
      organizationId: '22222222-2222-2222-2222-222222222222',
      organizationName: 'StartupHub',
      organizationSubdomain: 'startuphub',
      employeeId: 'SH002',
      department: 'Consulting',
      team: 'Strategy Consulting',
      role: 'employee',
      roleLevel: 10,
      avatar: '/placeholder-user.jpg'
    }
  },

  // MegaCorp Industries - Enterprise Plan
  'mary.davis@megacorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u3333333-3333-3333-3333-333333333331',
      email: 'mary.davis@megacorp.co.ke',
      firstName: 'Mary',
      lastName: 'Davis',
      displayName: 'Mary Davis',
      organizationId: '33333333-3333-3333-3333-333333333333',
      organizationName: 'MegaCorp Industries',
      organizationSubdomain: 'megacorp',
      employeeId: 'MC001',
      department: 'Human Resources',
      role: 'hr_manager',
      roleLevel: 3,
      avatar: '/placeholder-user.jpg'
    }
  },
  'james.miller@megacorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u3333333-3333-3333-3333-333333333332',
      email: 'james.miller@megacorp.co.ke',
      firstName: 'James',
      lastName: 'Miller',
      displayName: 'James Miller',
      organizationId: '33333333-3333-3333-3333-333333333333',
      organizationName: 'MegaCorp Industries',
      organizationSubdomain: 'megacorp',
      employeeId: 'MC002',
      department: 'Production',
      team: 'Assembly Line A',
      role: 'department_manager',
      roleLevel: 4,
      avatar: '/placeholder-user.jpg'
    }
  },
  'lisa.anderson@megacorp.co.ke': {
    password: 'password123',
    user: {
      id: 'u3333333-3333-3333-3333-333333333333',
      email: 'lisa.anderson@megacorp.co.ke',
      firstName: 'Lisa',
      lastName: 'Anderson',
      displayName: 'Lisa Anderson',
      organizationId: '33333333-3333-3333-3333-333333333333',
      organizationName: 'MegaCorp Industries',
      organizationSubdomain: 'megacorp',
      employeeId: 'MC003',
      department: 'Quality Assurance',
      team: 'QA Testing',
      role: 'employee',
      roleLevel: 10,
      avatar: '/placeholder-user.jpg'
    }
  }
} as const

export type TestCredentialKey = keyof typeof TEST_CREDENTIALS

// Mock authentication functions
export const mockAuth = {
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const credential = TEST_CREDENTIALS[email as TestCredentialKey]
    
    if (!credential) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    if (credential.password !== password) {
      return { success: false, error: 'Invalid email or password' }
    }
    
    return { success: true, user: credential.user }
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user')
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const stored = localStorage.getItem('auth_user')
    if (!stored) return null
    
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  },

  setCurrentUser(user: User | null): void {
    if (typeof window === 'undefined') return
    
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('auth_user')
    }
  }
}

// Get dashboard route based on user role
export function getDashboardRoute(user: User): string {
  if (user.roleLevel <= 6) {
    // Managers, HR managers, and org admins go to employer dashboard
    return '/employer/dashboard'
  } else {
    // Regular employees go to employee dashboard
    return '/employee/dashboard'
  }
}

// Check if user has access to employer features
export function hasEmployerAccess(user: User): boolean {
  return user.roleLevel <= 6
}

// List all available test accounts for easy reference
export function getTestAccounts() {
  return Object.entries(TEST_CREDENTIALS).map(([email, data]) => ({
    email,
    password: data.password,
    name: data.user.displayName,
    organization: data.user.organizationName,
    role: data.user.role,
    department: data.user.department
  }))
} 