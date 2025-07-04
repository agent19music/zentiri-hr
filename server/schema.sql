-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";
CREATE EXTENSION IF NOT EXISTS "pg_net";

-- =====================================================
-- SUBSCRIPTION PLANS & BILLING
-- =====================================================

-- Subscription plans available
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  max_employees INTEGER NOT NULL,
  max_departments INTEGER,
  max_teams INTEGER,
  features JSONB DEFAULT '{}', -- Array of feature flags
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2),
  trial_days INTEGER DEFAULT 14,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default plans
INSERT INTO subscription_plans (name, display_name, description, max_employees, max_departments, max_teams, features, price_monthly, price_yearly) VALUES
('starter', 'Starter Plan', 'Perfect for small teams', 25, 5, 10, '["basic_payroll", "employee_management", "basic_reports"]', 49.99, 499.99),
('professional', 'Professional Plan', 'For growing businesses', 100, 20, 50, '["basic_payroll", "employee_management", "advanced_reports", "task_management", "performance_tracking"]', 149.99, 1499.99),
('enterprise', 'Enterprise Plan', 'For large organizations', -1, -1, -1, '["all_features", "api_access", "custom_integrations", "priority_support"]', 299.99, 2999.99);

-- =====================================================
-- ORGANIZATIONS
-- =====================================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  industry TEXT,
  company_size TEXT CHECK (company_size IN ('1-10', '11-50', '51-200', '201-500', '500+')),
  country TEXT DEFAULT 'KE',
  timezone TEXT DEFAULT 'Africa/Nairobi',
  settings JSONB DEFAULT '{}',
  logo_url TEXT,
  website TEXT,
  phone TEXT,
  address JSONB,
  
  -- Subscription info
  subscription_plan_id UUID REFERENCES subscription_plans(id),
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'suspended', 'cancelled', 'pending')),
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  subscription_starts_at TIMESTAMP WITH TIME ZONE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  
  -- Billing
  billing_email TEXT,
  billing_address JSONB,
  
  -- Metadata
  onboarding_completed BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_subdomain CHECK (subdomain ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$' AND length(subdomain) >= 3)
);

-- Organization subscriptions history
CREATE TABLE organization_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_plan_id UUID REFERENCES subscription_plans(id),
  status TEXT NOT NULL CHECK (status IN ('pending', 'active', 'cancelled', 'expired')),
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ends_at TIMESTAMP WITH TIME ZONE,
  price_paid DECIMAL(10,2),
  payment_frequency TEXT CHECK (payment_frequency IN ('monthly', 'yearly')),
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROLES & PERMISSIONS SYSTEM
-- =====================================================

-- System-wide roles
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  level INTEGER NOT NULL, -- 1=highest (super_admin), 10=lowest (employee)
  is_system_role BOOLEAN DEFAULT false, -- System roles vs custom org roles
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  permissions JSONB DEFAULT '[]', -- Array of permission strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(name, organization_id)
);

-- Insert system roles
INSERT INTO roles (name, display_name, description, level, is_system_role, permissions) VALUES
('super_admin', 'Super Admin', 'Platform administrator', 1, true, '["*"]'),
('org_admin', 'Organization Admin', 'Full organization control', 2, true, '["org.*", "users.*", "roles.*", "billing.*"]'),
('hr_manager', 'HR Manager', 'Human resources management', 3, true, '["employees.*", "payroll.*", "reports.view", "departments.*"]'),
('department_manager', 'Department Manager', 'Department management', 4, true, '["employees.view", "employees.update", "tasks.*", "teams.*", "reports.view"]'),
('team_lead', 'Team Lead', 'Team leadership', 5, true, '["employees.view", "tasks.*", "teams.manage_own"]'),
('manager', 'Manager', 'General manager', 6, true, '["employees.view", "tasks.create", "tasks.assign", "reports.view"]'),
('employee', 'Employee', 'Basic employee access', 10, true, '["profile.*", "tasks.view_own", "payroll.view_own"]');

-- Permissions catalog
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'users', 'payroll', 'reports', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert core permissions
INSERT INTO permissions (name, display_name, description, category) VALUES
-- User management
('users.create', 'Create Users', 'Create new user accounts', 'users'),
('users.view', 'View Users', 'View user information', 'users'),
('users.update', 'Update Users', 'Modify user information', 'users'),
('users.delete', 'Delete Users', 'Remove user accounts', 'users'),
('users.invite', 'Invite Users', 'Send user invitations', 'users'),

-- Employee management
('employees.create', 'Create Employees', 'Add new employees', 'employees'),
('employees.view', 'View Employees', 'View employee information', 'employees'),
('employees.update', 'Update Employees', 'Modify employee information', 'employees'),
('employees.delete', 'Delete Employees', 'Remove employees', 'employees'),
('employees.import', 'Import Employees', 'Bulk import employees', 'employees'),

-- Payroll
('payroll.create', 'Create Payroll', 'Process payroll', 'payroll'),
('payroll.view', 'View Payroll', 'View payroll information', 'payroll'),
('payroll.view_own', 'View Own Payroll', 'View own payroll only', 'payroll'),
('payroll.approve', 'Approve Payroll', 'Approve payroll runs', 'payroll'),

-- Departments & Teams
('departments.create', 'Create Departments', 'Create new departments', 'departments'),
('departments.view', 'View Departments', 'View department information', 'departments'),
('departments.update', 'Update Departments', 'Modify departments', 'departments'),
('departments.delete', 'Delete Departments', 'Remove departments', 'departments'),

('teams.create', 'Create Teams', 'Create new teams', 'teams'),
('teams.view', 'View Teams', 'View team information', 'teams'),
('teams.update', 'Update Teams', 'Modify teams', 'teams'),
('teams.delete', 'Delete Teams', 'Remove teams', 'teams'),
('teams.manage_own', 'Manage Own Team', 'Manage own team only', 'teams'),

-- Tasks
('tasks.create', 'Create Tasks', 'Create new tasks', 'tasks'),
('tasks.view', 'View Tasks', 'View all tasks', 'tasks'),
('tasks.view_own', 'View Own Tasks', 'View assigned tasks only', 'tasks'),
('tasks.update', 'Update Tasks', 'Modify tasks', 'tasks'),
('tasks.delete', 'Delete Tasks', 'Remove tasks', 'tasks'),
('tasks.assign', 'Assign Tasks', 'Assign tasks to employees', 'tasks'),

-- Reports
('reports.view', 'View Reports', 'View reports', 'reports'),
('reports.create', 'Create Reports', 'Generate reports', 'reports'),
('reports.export', 'Export Reports', 'Export report data', 'reports'),

-- Organization
('org.settings', 'Organization Settings', 'Modify organization settings', 'organization'),
('org.billing', 'Billing Management', 'Manage billing and subscriptions', 'organization'),

-- Awards & Recognition
('awards.create', 'Create Awards', 'Create employee awards', 'awards'),
('awards.view', 'View Awards', 'View award information', 'awards'),
('awards.nominate', 'Nominate for Awards', 'Nominate employees for awards', 'awards');

-- =====================================================
-- USER PROFILES & AUTHENTICATION
-- =====================================================

-- Extended user profiles (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Basic info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  
  -- Organization context
  employee_id TEXT, -- References employees.personal_file_number
  default_role_id UUID REFERENCES roles(id),
  department_id UUID,
  team_id UUID,
  manager_id UUID REFERENCES user_profiles(id),
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  email_verified_at TIMESTAMP WITH TIME ZONE,
  invited_at TIMESTAMP WITH TIME ZONE,
  invited_by UUID REFERENCES user_profiles(id),
  onboarding_completed BOOLEAN DEFAULT false,
  
  -- Preferences
  preferences JSONB DEFAULT '{}',
  notification_settings JSONB DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, employee_id)
);

-- User role assignments (many-to-many)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES user_profiles(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  
  UNIQUE(user_id, role_id)
);

-- Custom user permissions (exceptions to role permissions)
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  permission_name TEXT NOT NULL,
  granted BOOLEAN NOT NULL DEFAULT true, -- true=grant, false=revoke
  resource_id UUID, -- Optional: specific resource this permission applies to
  granted_by UUID REFERENCES user_profiles(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- ORGANIZATIONAL STRUCTURE
-- =====================================================

-- Departments
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  parent_department_id UUID REFERENCES departments(id),
  manager_id UUID REFERENCES user_profiles(id),
  budget DECIMAL(15,2),
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES user_profiles(id),
  
  UNIQUE(organization_id, name)
);

-- Teams within departments
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  department_id UUID REFERENCES departments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  team_lead_id UUID REFERENCES user_profiles(id),
  max_members INTEGER,
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES user_profiles(id),
  
  UNIQUE(organization_id, name)
);

-- Team members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  role_in_team TEXT DEFAULT 'member', -- 'lead', 'member', 'coordinator'
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  added_by UUID REFERENCES user_profiles(id),
  
  UNIQUE(team_id, user_id)
);

-- =====================================================
-- EMPLOYEE INVITATIONS & ONBOARDING
-- =====================================================

-- Employee invitations
CREATE TABLE employee_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  
  -- Assignment details
  role_id UUID REFERENCES roles(id),
  department_id UUID REFERENCES departments(id),
  team_id UUID REFERENCES teams(id),
  manager_id UUID REFERENCES user_profiles(id),
  
  -- Employee details
  personal_file_number TEXT,
  job_title TEXT,
  basic_pay DECIMAL(15,2),
  start_date DATE,
  employment_type TEXT CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern')),
  
  -- Invitation status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'accepted', 'expired', 'cancelled')),
  invitation_token TEXT UNIQUE,
  invited_by UUID REFERENCES user_profiles(id) NOT NULL,
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional data from CSV or form
  additional_data JSONB DEFAULT '{}',
  
  UNIQUE(organization_id, email),
  UNIQUE(organization_id, personal_file_number)
);

-- Bulk import sessions (for CSV uploads)
CREATE TABLE import_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  imported_by UUID REFERENCES user_profiles(id) NOT NULL,
  file_name TEXT,
  total_records INTEGER NOT NULL,
  successful_imports INTEGER DEFAULT 0,
  failed_imports INTEGER DEFAULT 0,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  error_log JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- TASK MANAGEMENT
-- =====================================================

-- Task categories
CREATE TABLE task_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, name)
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category_id UUID REFERENCES task_categories(id),
  
  -- Assignment
  assigned_to UUID REFERENCES user_profiles(id),
  assigned_by UUID REFERENCES user_profiles(id) NOT NULL,
  department_id UUID REFERENCES departments(id),
  team_id UUID REFERENCES teams(id),
  
  -- Status and priority
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  
  -- Dates
  due_date TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Additional data
  estimated_hours DECIMAL(5,2),
  actual_hours DECIMAL(5,2),
  attachments JSONB DEFAULT '[]',
  comments_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task comments
CREATE TABLE task_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AWARDS & RECOGNITION SYSTEM
-- =====================================================

-- Award types
CREATE TABLE award_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  points INTEGER DEFAULT 0,
  is_recurring BOOLEAN DEFAULT false, -- e.g., "Employee of the Month"
  recurrence_period TEXT, -- 'monthly', 'quarterly', 'yearly'
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, name)
);

-- Employee awards
CREATE TABLE employee_awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  award_type_id UUID REFERENCES award_types(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  
  -- Award details
  title TEXT NOT NULL,
  description TEXT,
  award_period DATE, -- For recurring awards like "Jan 2024 Employee of the Month"
  points_awarded INTEGER DEFAULT 0,
  
  -- Recognition
  nominated_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  
  -- Status
  status TEXT DEFAULT 'nominated' CHECK (status IN ('nominated', 'approved', 'rejected')),
  
  -- Metadata
  awarded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employee recommendations
CREATE TABLE employee_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  recommended_by UUID REFERENCES user_profiles(id) NOT NULL,
  
  -- Recommendation details
  type TEXT NOT NULL CHECK (type IN ('promotion', 'raise', 'award', 'training', 'recognition')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  justification TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES user_profiles(id),
  review_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES user_profiles(id),
  
  -- Action details
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'login', etc.
  resource_type TEXT NOT NULL, -- 'user', 'employee', 'task', etc.
  resource_id UUID,
  
  -- Change details
  old_values JSONB,
  new_values JSONB,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  request_id TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX idx_audit_logs_org_time ON audit_logs(organization_id, created_at DESC);
CREATE INDEX idx_audit_logs_user_time ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);