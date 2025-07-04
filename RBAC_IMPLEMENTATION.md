# Role-Based Access Control (RBAC) Implementation

## Overview

This document outlines the comprehensive Role-Based Access Control (RBAC) system implemented in the Zentiri HR platform. The system provides secure, granular access control based on user roles and organizational hierarchy.

## System Architecture

### Database Layer
- **PostgreSQL with Row Level Security (RLS)** - Database-level security policies
- **Supabase Auth Integration** - User authentication and session management
- **Audit Logging** - Complete action tracking for compliance

### Application Layer
- **Frontend RBAC Utilities** (`lib/rbac.ts`) - Permission checking and UI control
- **Role-Based UI Components** - Dynamic interface based on user permissions
- **Server-side Validation** - Backend permission enforcement

## Role Hierarchy

The system implements a 5-tier role hierarchy with decreasing authority levels:

### 1. HR Manager (Level 3)
**Authority**: Organization-wide administrative access
**Scope**: All employees, departments, recruitment, payroll, and settings

```typescript
Permissions: [
  "employees.*",     // Full employee management
  "departments.*",   // All department operations
  "teams.*",         // All team operations
  "recruitment.*",   // Complete recruitment control
  "payroll.*",       // Full payroll access
  "reports.*",       // All reports and analytics
  "organization.*"   // Organizational settings
]
```

**Key Capabilities**:
- Complete employee lifecycle management
- Organization structure management
- Full recruitment pipeline control
- Payroll processing and management
- Advanced reporting and analytics
- System configuration and billing

### 2. Department Manager (Level 4)
**Authority**: Department-scoped management
**Scope**: Own department employees, department-specific recruitment and reports

```typescript
Permissions: [
  "employees.view", "employees.create", "employees.update", "employees.invite",
  "departments.view", "departments.update_own",
  "teams.view", "teams.update", "teams.create",
  "recruitment.view", "recruitment.interview", "recruitment.evaluate", "recruitment.create",
  "reports.view", "reports.create",
  "performance.view", "performance.evaluate"
]
```

**Key Capabilities**:
- Manage employees within their department
- Create and manage department teams
- Post jobs and interview for department positions
- Generate department-specific reports
- Evaluate department employee performance

### 3. Team Lead (Level 5)
**Authority**: Team-focused management
**Scope**: Own team members, team-specific tasks and performance

```typescript
Permissions: [
  "employees.view", "employees.update",
  "teams.view", "teams.manage_own", "teams.update_own",
  "recruitment.view", "recruitment.interview", "recruitment.evaluate",
  "performance.view", "performance.evaluate",
  "tasks.*",
  "reports.view"
]
```

**Key Capabilities**:
- Manage own team members
- Participate in recruitment interviews
- Evaluate team member performance
- Complete task management for team
- View team-related reports

### 4. Manager (Level 6)
**Authority**: Limited management capabilities
**Scope**: Cross-functional management with interview permissions

```typescript
Permissions: [
  "employees.view",
  "recruitment.view", "recruitment.interview",
  "performance.view", "performance.evaluate",
  "tasks.create", "tasks.assign", "tasks.view",
  "reports.view"
]
```

**Key Capabilities**:
- View employee information
- Participate in recruitment interviews
- Limited performance evaluation
- Task creation and assignment
- Basic report access

### 5. Employee (Level 10)
**Authority**: Personal data access only
**Scope**: Own profile, tasks, payroll, and leave information

```typescript
Permissions: [
  "profile.*",
  "tasks.view_own", "tasks.update_own",
  "payroll.view_own",
  "leave.view_own", "leave.request",
  "performance.view_own"
]
```

**Key Capabilities**:
- Manage personal profile
- View and update assigned tasks
- Access own payroll information
- Request leave and view leave history
- View personal performance data

## Permission Categories

### Employee Management
- `employees.view` - View employee information
- `employees.create` - Add new employees
- `employees.update` - Modify employee data
- `employees.delete` - Remove employees
- `employees.import` - Bulk employee import
- `employees.export` - Export employee data
- `employees.invite` - Send employee invitations

### Recruitment
- `recruitment.view` - View job postings and applications
- `recruitment.create` - Create job postings
- `recruitment.update` - Modify recruitment campaigns
- `recruitment.interview` - Conduct interviews
- `recruitment.evaluate` - Evaluate candidates
- `recruitment.publish` - Publish job postings

### Departments & Teams
- `departments.view` - View department information
- `departments.create` - Create new departments
- `departments.update` - Modify departments
- `departments.update_own` - Modify own department only
- `teams.view` - View team information
- `teams.create` - Create teams
- `teams.update` - Modify teams
- `teams.manage_own` - Manage own team only

### Reports & Analytics
- `reports.view` - View reports
- `reports.create` - Generate reports
- `reports.export` - Export report data

### Payroll
- `payroll.view` - View all payroll data
- `payroll.create` - Process payroll
- `payroll.view_own` - View own payroll only

### Performance
- `performance.view` - View performance data
- `performance.evaluate` - Evaluate performance
- `performance.view_own` - View own performance only

## Implementation Guide

### Using RBAC Utilities

```typescript
import { 
  getAccessibleFeatures, 
  getRoleInfo, 
  getAccessScope, 
  hasPermission, 
  canManageUser 
} from "@/lib/rbac"

// Get current user role (from auth context)
const currentUserRole: UserRole = "hr_manager"

// Check specific permission
const canCreateEmployees = hasPermission(currentUserRole, "employees.create")

// Get UI-friendly permission flags
const features = getAccessibleFeatures(currentUserRole)
if (features.canCreateEmployees) {
  // Show create employee button
}

// Check role hierarchy
const canManageTarget = canManageUser(currentUserRole, targetUserRole)

// Get role information for UI
const roleInfo = getRoleInfo(currentUserRole)
console.log(roleInfo.label) // "HR Manager"
console.log(roleInfo.scope) // "Organization-wide access..."
```

### Conditional UI Rendering

```typescript
// In React components
{features.canCreateEmployees && (
  <Button onClick={handleAddEmployee}>
    <UserPlus className="mr-2 h-4 w-4" />
    Add Employee
  </Button>
)}

{features.canImportEmployees && (
  <Button variant="outline">
    <Upload className="mr-2 h-4 w-4" />
    Import
  </Button>
)}

// Role-based descriptions
<CardDescription>
  {actionPermissions.employees.canAdd 
    ? "Manage all employees with complete administrative access"
    : actionPermissions.employees.canEdit
    ? "Manage employees within your scope with limited access"
    : "View employee information based on your access level"
  }
</CardDescription>
```

### Navigation Control

```typescript
const navItems = getNavigationItems(currentUserRole)

// This automatically filters navigation based on permissions
navItems.map(item => (
  <Link key={item.href} href={item.href}>
    {item.name}
    {item.badge && <Badge>{item.badge}</Badge>}
  </Link>
))
```

## Security Considerations

### Database Level Security

1. **Row Level Security (RLS)**: All tables have RLS enabled with policies that enforce role-based access
2. **Function-based Permission Checking**: Database functions validate permissions before data access
3. **Audit Logging**: All actions are logged with user context for compliance

### Application Level Security

1. **Server-side Validation**: All API endpoints validate permissions before processing
2. **Session Management**: Supabase Auth handles secure session management
3. **Role Verification**: User roles are verified on each request

### Data Scoping

- **HR Managers**: Access to all organizational data
- **Department Managers**: Data scoped to their department
- **Team Leads**: Data scoped to their team
- **Managers**: Limited cross-functional access
- **Employees**: Personal data only

## Usage Examples

### Employee Management Page

```typescript
// Role-based employee list filtering
const getEmployeeList = (userRole: UserRole) => {
  switch (userRole) {
    case "hr_manager":
      return getAllEmployees()
    case "department_manager":
      return getDepartmentEmployees(userDepartment)
    case "team_lead":
      return getTeamEmployees(userTeam)
    default:
      return []
  }
}

// Permission-based action availability
const getEmployeeActions = (userRole: UserRole) => {
  const features = getAccessibleFeatures(userRole)
  
  return {
    canEdit: features.canEditEmployees,
    canDelete: features.canDeleteEmployees,
    canInvite: features.canInviteEmployees,
    scope: getActionPermissions(userRole).employees.scope
  }
}
```

### Recruitment Management

```typescript
// Role-based recruitment capabilities
const getRecruitmentAccess = (userRole: UserRole) => {
  const permissions = getActionPermissions(userRole)
  
  return {
    canCreateJobs: permissions.recruitment.canCreateJobs,
    canInterview: permissions.recruitment.canInterview,
    canEvaluate: permissions.recruitment.canEvaluate,
    scope: permissions.recruitment.scope
  }
}

// Dynamic UI based on permissions
{actionPermissions.recruitment.canCreateJobs && (
  <Button onClick={() => setShowNewJob(true)}>
    <UserPlus className="mr-2 h-4 w-4" />
    Post New Job
  </Button>
)}
```

## Integration with Database

The frontend RBAC system integrates seamlessly with the database layer:

```sql
-- Database helper function
CREATE OR REPLACE FUNCTION user_has_permission(permission_name TEXT)
RETURNS BOOLEAN AS $$
-- Implementation that checks user permissions in database
$$;

-- RLS Policy example
CREATE POLICY "Employees access" ON employees
  FOR SELECT USING (
    organization_id = get_current_organization_id() 
    AND (
      user_has_permission('employees.view') 
      OR user_profile_id = auth.uid()
    )
  );
```

## Testing RBAC

### Unit Tests

```typescript
describe('RBAC System', () => {
  test('HR Manager has full access', () => {
    const features = getAccessibleFeatures('hr_manager')
    expect(features.canCreateEmployees).toBe(true)
    expect(features.canDeleteEmployees).toBe(true)
    expect(features.canViewReports).toBe(true)
  })
  
  test('Employee has limited access', () => {
    const features = getAccessibleFeatures('employee')
    expect(features.canCreateEmployees).toBe(false)
    expect(features.canViewOwnPayroll).toBe(true)
  })
  
  test('Role hierarchy works correctly', () => {
    expect(canManageUser('hr_manager', 'employee')).toBe(true)
    expect(canManageUser('employee', 'hr_manager')).toBe(false)
  })
})
```

### Integration Tests

```typescript
describe('Role-based UI Rendering', () => {
  test('HR Manager sees all navigation items', () => {
    const navItems = getNavigationItems('hr_manager')
    expect(navItems).toContainEqual(
      expect.objectContaining({ name: 'Employees' })
    )
    expect(navItems).toContainEqual(
      expect.objectContaining({ name: 'Recruitment' })
    )
  })
  
  test('Employee sees limited navigation', () => {
    const navItems = getNavigationItems('employee')
    expect(navItems).not.toContainEqual(
      expect.objectContaining({ name: 'Employees' })
    )
  })
})
```

## Future Enhancements

### Custom Roles
- Organization-specific custom roles
- Role templates for different industries
- Advanced permission combinations

### Time-based Access
- Temporary role assignments
- Scheduled permission changes
- Time-limited access grants

### Resource-level Permissions
- Specific resource access (individual employees)
- Project-based permissions
- Client-specific access control

### Advanced Analytics
- Permission usage analytics
- Role effectiveness metrics
- Security audit reports

## Best Practices

1. **Principle of Least Privilege**: Users should have minimum permissions necessary
2. **Regular Role Reviews**: Periodic audits of role assignments
3. **Clear Role Definitions**: Well-documented role responsibilities
4. **Secure Implementation**: Always validate permissions server-side
5. **User Training**: Ensure users understand their access levels
6. **Audit Compliance**: Maintain detailed logs for regulatory requirements

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**: Check role assignments and permission mappings
2. **UI Elements Not Showing**: Verify permission checks in components
3. **Database Access Issues**: Review RLS policies and user context
4. **Role Hierarchy Problems**: Validate role level assignments

### Debug Tools

```typescript
// Debug permission checking
const debugPermissions = (userRole: UserRole) => {
  const features = getAccessibleFeatures(userRole)
  const roleInfo = getRoleInfo(userRole)
  
  console.log('User Role:', userRole)
  console.log('Role Info:', roleInfo)
  console.log('Available Features:', features)
  console.log('Action Permissions:', getActionPermissions(userRole))
}
```

This RBAC implementation provides a robust, scalable foundation for secure access control in the Zentiri HR platform, ensuring that users have appropriate access based on their organizational role while maintaining security and compliance requirements. 