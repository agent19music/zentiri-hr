# Supabase Database Seeding Guide

This guide will help you populate your Supabase database with realistic test data for the Zentiri HR application.

## 📁 Files Overview

The seed data is split into files for better organization:

- `server/seed_data.sql` - Main seed data (organizations, users, employees, departments, teams)
- `server/seed_data_part2.sql` - Extended data (tasks, awards, leave types, attendance)

## 🚀 How to Seed Your Database

### Method 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project
   - Navigate to "SQL Editor" in the left sidebar

2. **Run Schema First**
   - Copy the contents of `server/schema.sql`
   - Paste into a new query in SQL Editor
   - Click "Run" to create all tables and structures

3. **Run Payment Tables**
   - Copy the contents of `server/payment_tables.sql`
   - Paste into a new query and run

4. **Run Other SQL Files** (in order)
   - `server/policies.sql`
   - `server/helperfunctions.sql`
   - `server/dbfunctionsforauthflow.sql`

5. **Run Seed Data**
   - Copy the contents of `server/seed_data.sql`
   - Paste into a new query and run
   - Copy the contents of `server/seed_data_part2.sql`
   - Paste into a new query and run

### Method 2: Using Supabase CLI

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (replace with your project reference)
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Run seed data
supabase db reset --db-url "your-database-url"
```

### Method 3: Using psql Command Line

```bash
# Connect to your Supabase database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Run the SQL files in order
\i server/schema.sql
\i server/payment_tables.sql
\i server/policies.sql
\i server/helperfunctions.sql
\i server/dbfunctionsforauthflow.sql
\i server/seed_data.sql
\i server/seed_data_part2.sql
```

## 📊 What Gets Created

### Organizations (3 Test Companies)

1. **TechCorp Kenya** (`techcorp-ke`)
   - Technology company with 5 employees
   - Professional plan subscription
   - Departments: Engineering, HR, Sales & Marketing, Finance

2. **StartupHub** (`startuphub`)
   - Consulting startup with 2 employees
   - Starter plan subscription
   - Departments: Operations, Consulting

3. **MegaCorp Industries** (`megacorp`)
   - Large manufacturing company with 3 employees
   - Enterprise plan subscription
   - Departments: Production, Quality Assurance, HR

### Sample Users with Different Roles

- **Organization Admins**: Full access to their organization
- **HR Managers**: Employee management and payroll
- **Department Managers**: Team and department oversight
- **Regular Employees**: Basic access to their own data

### Test Data Includes

- ✅ **10 Employees** with complete payroll information
- ✅ **9 Departments** across different organizations
- ✅ **6 Teams** with team leads and members
- ✅ **8 Tasks** in various states (todo, in_progress, completed)
- ✅ **12 Award Types** with sample awarded recognitions
- ✅ **16 Leave Types** with different policies per organization
- ✅ **Employee Leave Balances** and applications
- ✅ **Attendance Records** for recent dates
- ✅ **Role Assignments** for testing permissions

## 🔑 Test Login Credentials

**Important**: The seed data creates user profiles, but you'll need to create actual auth users in Supabase Auth to test login functionality.

### Sample User Profiles Created:

| Name | Employee ID | Organization | Role |
|------|-------------|--------------|------|
| Jane Smith | EMP002 | TechCorp | Org Admin & HR Manager |
| John Doe | EMP001 | TechCorp | Department Manager |
| Alice Johnson | SH001 | StartupHub | Org Admin |
| Mary Davis | MC001 | MegaCorp | Org Admin & HR Manager |

## 🧪 Testing Scenarios

### Authentication & Authorization
- Test different role permissions
- Verify organization isolation
- Check department/team access controls

### Employee Management
- View employee profiles and payroll data
- Test leave application workflows
- Check attendance tracking

### Task Management
- Assign tasks to employees
- Update task status and priorities
- View team task dashboards

### Awards & Recognition
- Award employees with different recognition types
- Track points and leaderboards
- Test recurring awards (Employee of the Month)

### Payroll & Leave
- View employee salary structures
- Check leave balances and applications
- Test attendance tracking

## 🛡️ Row Level Security (RLS)

The seed data works with the RLS policies defined in `server/policies.sql`. Users can only access data from their own organization unless they have special permissions.

## 🔄 Resetting Data

To reset and re-seed your database:

```sql
-- WARNING: This will delete all data!

-- Disable RLS temporarily
SET session_replication_role = replica;

-- Truncate all tables (in reverse dependency order)
TRUNCATE attendance_records CASCADE;
TRUNCATE leave_applications CASCADE;
TRUNCATE employee_leave_balances CASCADE;
TRUNCATE leave_types CASCADE;
TRUNCATE employee_awards CASCADE;
TRUNCATE award_types CASCADE;
TRUNCATE task_comments CASCADE;
TRUNCATE tasks CASCADE;
TRUNCATE task_categories CASCADE;
TRUNCATE team_members CASCADE;
TRUNCATE teams CASCADE;
TRUNCATE departments CASCADE;
TRUNCATE payslips CASCADE;
TRUNCATE payroll_runs CASCADE;
TRUNCATE employees CASCADE;
TRUNCATE user_permissions CASCADE;
TRUNCATE user_roles CASCADE;
TRUNCATE user_profiles CASCADE;
TRUNCATE employee_invitations CASCADE;
TRUNCATE import_sessions CASCADE;
TRUNCATE organization_subscriptions CASCADE;
TRUNCATE organizations CASCADE;

-- Re-enable RLS
SET session_replication_role = DEFAULT;

-- Then re-run your seed data files
```

## 📋 Verification Queries

After seeding, run these queries to verify everything worked:

```sql
-- Check organizations
SELECT name, subdomain, subscription_status FROM organizations;

-- Check employees per organization
SELECT o.name, COUNT(e.*) as employee_count 
FROM organizations o 
LEFT JOIN employees e ON o.id = e.organization_id 
GROUP BY o.id, o.name;

-- Check user roles
SELECT 
    up.display_name,
    o.name as organization,
    r.display_name as role
FROM user_profiles up
JOIN organizations o ON up.organization_id = o.id
JOIN user_roles ur ON up.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE ur.is_active = true;

-- Check recent tasks
SELECT 
    t.title,
    o.name as organization,
    up.display_name as assigned_to,
    t.status,
    t.priority
FROM tasks t
JOIN organizations o ON t.organization_id = o.id
LEFT JOIN user_profiles up ON t.assigned_to = up.id
ORDER BY t.created_at DESC;
```

## 🚨 Important Notes

1. **Authentication**: Remember to create corresponding users in Supabase Auth for testing login
2. **UUIDs**: All UUIDs in seed data are hardcoded for consistency - don't use in production
3. **Passwords**: No actual passwords are set - you'll need to handle auth separately
4. **Permissions**: Test the RBAC system thoroughly with different user roles
5. **Dates**: Some dates are relative to NOW() and will adjust based on when you run the seeds

## 🎯 Next Steps

After seeding:

1. Test your application with the sample data
2. Create auth users that match the user profiles
3. Verify all features work with the test organizations
4. Use the data to test edge cases and workflows
5. Consider creating additional seed data for specific testing scenarios

Happy testing! 🚀 