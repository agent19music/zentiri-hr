-- =====================================================
-- SEED DATA FOR ZENTIRI HR APPLICATION
-- =====================================================
-- This file contains realistic test data for the HR system
-- Run this after schema setup for testing purposes

-- =====================================================
-- 1. TEST ORGANIZATIONS
-- =====================================================

-- Insert test organizations
INSERT INTO organizations (
  id, name, subdomain, industry, company_size, country, timezone,
  subscription_plan_id, subscription_status, trial_ends_at,
  billing_email, onboarding_completed, is_active
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'TechCorp Kenya',
  'techcorp-ke',
  'Technology',
  '51-200',
  'KE',
  'Africa/Nairobi',
  (SELECT id FROM subscription_plans WHERE name = 'professional'),
  'active',
  NOW() + INTERVAL '30 days',
  'billing@techcorp.co.ke',
  true,
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  'StartupHub',
  'startuphub',
  'Consulting',
  '11-50',
  'KE',
  'Africa/Nairobi',
  (SELECT id FROM subscription_plans WHERE name = 'starter'),
  'trial',
  NOW() + INTERVAL '14 days',
  'admin@startuphub.co.ke',
  true,
  true
),
(
  '33333333-3333-3333-3333-333333333333',
  'MegaCorp Industries',
  'megacorp',
  'Manufacturing',
  '500+',
  'KE',
  'Africa/Nairobi',
  (SELECT id FROM subscription_plans WHERE name = 'enterprise'),
  'active',
  NOW() + INTERVAL '365 days',
  'finance@megacorp.co.ke',
  true,
  true
);

-- =====================================================
-- 2. DEPARTMENTS
-- =====================================================

INSERT INTO departments (
  id, organization_id, name, description, budget, is_active
) VALUES 
-- TechCorp departments
('d1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Engineering', 'Software development and technical operations', 500000.00, true),
('d1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Human Resources', 'People operations and talent management', 200000.00, true),
('d1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'Sales & Marketing', 'Business development and marketing', 300000.00, true),
('d1111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', 'Finance', 'Financial planning and accounting', 150000.00, true),

-- StartupHub departments
('d2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'Operations', 'General operations and administration', 100000.00, true),
('d2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Consulting', 'Client consulting services', 150000.00, true),

-- MegaCorp departments
('d3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'Production', 'Manufacturing and production', 1000000.00, true),
('d3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'Quality Assurance', 'Product quality control', 200000.00, true),
('d3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Human Resources', 'HR and employee relations', 300000.00, true);

-- =====================================================
-- 3. TEAMS
-- =====================================================

INSERT INTO teams (
  id, organization_id, department_id, name, description, max_members, is_active
) VALUES 
-- TechCorp teams
('t1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'Backend Development', 'API and server-side development', 8, true),
('t1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'Frontend Development', 'User interface development', 6, true),
('t1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111113', 'Digital Marketing', 'Online marketing and social media', 4, true),

-- StartupHub teams
('t2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'd2222222-2222-2222-2222-222222222222', 'Strategy Consulting', 'Business strategy consulting', 3, true),

-- MegaCorp teams
('t3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'd3333333-3333-3333-3333-333333333331', 'Assembly Line A', 'Primary production line', 15, true),
('t3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'd3333333-3333-3333-3333-333333333332', 'QA Testing', 'Product testing and validation', 5, true);

-- =====================================================
-- 4. USER PROFILES (Test Users)
-- =====================================================

-- Note: In production, users would be created through Supabase Auth
-- This is for testing with mock user IDs
INSERT INTO user_profiles (
  id, organization_id, first_name, last_name, display_name, phone,
  employee_id, department_id, team_id, is_active, email_verified_at, onboarding_completed
) VALUES 
-- TechCorp users
('u1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'John', 'Doe', 'John Doe', '+254701234567', 'EMP001', 'd1111111-1111-1111-1111-111111111111', 't1111111-1111-1111-1111-111111111111', true, NOW(), true),
('u1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'Jane', 'Smith', 'Jane Smith', '+254701234568', 'EMP002', 'd1111111-1111-1111-1111-111111111112', null, true, NOW(), true),
('u1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'Michael', 'Johnson', 'Mike Johnson', '+254701234569', 'EMP003', 'd1111111-1111-1111-1111-111111111111', 't1111111-1111-1111-1111-111111111112', true, NOW(), true),
('u1111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', 'Sarah', 'Wilson', 'Sarah Wilson', '+254701234570', 'EMP004', 'd1111111-1111-1111-1111-111111111113', 't1111111-1111-1111-1111-111111111113', true, NOW(), true),
('u1111111-1111-1111-1111-111111111115', '11111111-1111-1111-1111-111111111111', 'David', 'Brown', 'David Brown', '+254701234571', 'EMP005', 'd1111111-1111-1111-1111-111111111114', null, true, NOW(), true),

-- StartupHub users
('u2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'Alice', 'Johnson', 'Alice Johnson', '+254701234572', 'SH001', 'd2222222-2222-2222-2222-222222222221', null, true, NOW(), true),
('u2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Bob', 'Williams', 'Bob Williams', '+254701234573', 'SH002', 'd2222222-2222-2222-2222-222222222222', 't2222222-2222-2222-2222-222222222221', true, NOW(), true),

-- MegaCorp users
('u3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'Mary', 'Davis', 'Mary Davis', '+254701234574', 'MC001', 'd3333333-3333-3333-3333-333333333333', null, true, NOW(), true),
('u3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'James', 'Miller', 'James Miller', '+254701234575', 'MC002', 'd3333333-3333-3333-3333-333333333331', 't3333333-3333-3333-3333-333333333331', true, NOW(), true),
('u3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Lisa', 'Anderson', 'Lisa Anderson', '+254701234576', 'MC003', 'd3333333-3333-3333-3333-333333333332', 't3333333-3333-3333-3333-333333333332', true, NOW(), true);

-- =====================================================
-- 5. USER ROLE ASSIGNMENTS
-- =====================================================

INSERT INTO user_roles (user_id, role_id, assigned_at, is_active) VALUES 
-- Organization admins
('u1111111-1111-1111-1111-111111111112', (SELECT id FROM roles WHERE name = 'org_admin'), NOW(), true),
('u2222222-2222-2222-2222-222222222221', (SELECT id FROM roles WHERE name = 'org_admin'), NOW(), true),
('u3333333-3333-3333-3333-333333333331', (SELECT id FROM roles WHERE name = 'org_admin'), NOW(), true),

-- HR managers
('u1111111-1111-1111-1111-111111111112', (SELECT id FROM roles WHERE name = 'hr_manager'), NOW(), true),
('u3333333-3333-3333-3333-333333333331', (SELECT id FROM roles WHERE name = 'hr_manager'), NOW(), true),

-- Department managers
('u1111111-1111-1111-1111-111111111111', (SELECT id FROM roles WHERE name = 'department_manager'), NOW(), true),
('u2222222-2222-2222-2222-222222222222', (SELECT id FROM roles WHERE name = 'department_manager'), NOW(), true),
('u3333333-3333-3333-3333-333333333332', (SELECT id FROM roles WHERE name = 'department_manager'), NOW(), true),

-- Regular employees
('u1111111-1111-1111-1111-111111111113', (SELECT id FROM roles WHERE name = 'employee'), NOW(), true),
('u1111111-1111-1111-1111-111111111114', (SELECT id FROM roles WHERE name = 'employee'), NOW(), true),
('u1111111-1111-1111-1111-111111111115', (SELECT id FROM roles WHERE name = 'employee'), NOW(), true),
('u3333333-3333-3333-3333-333333333333', (SELECT id FROM roles WHERE name = 'employee'), NOW(), true);

-- =====================================================
-- 6. EMPLOYEES (for payroll)
-- =====================================================

INSERT INTO employees (
  id, organization_id, user_profile_id, employee_number, national_id, kra_pin,
  date_of_birth, gender, marital_status, nationality, personal_email,
  emergency_contact_name, emergency_contact_phone, employment_type,
  contract_start_date, basic_salary, housing_allowance, transport_allowance,
  medical_allowance, bank_name, account_number, account_name, employment_status
) VALUES 
-- TechCorp employees
('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111111', 'EMP001', '32145678', 'A001234567M', '1990-05-15', 'male', 'married', 'Kenyan', 'john.doe@personal.com', 'Jane Doe', '+254701234580', 'full_time', '2022-01-15', 120000.00, 25000.00, 15000.00, 10000.00, 'Equity Bank', '1234567890', 'John Doe', 'active'),

('e1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111112', 'EMP002', '28765432', 'A002345678N', '1988-08-22', 'female', 'single', 'Kenyan', 'jane.smith@personal.com', 'Robert Smith', '+254701234581', 'full_time', '2021-03-01', 150000.00, 30000.00, 20000.00, 15000.00, 'KCB Bank', '2345678901', 'Jane Smith', 'active'),

('e1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111113', 'EMP003', '30987654', 'A003456789P', '1992-11-10', 'male', 'single', 'Kenyan', 'mike.johnson@personal.com', 'Lisa Johnson', '+254701234582', 'full_time', '2022-06-01', 100000.00, 20000.00, 12000.00, 8000.00, 'Cooperative Bank', '3456789012', 'Michael Johnson', 'active'),

('e1111111-1111-1111-1111-111111111114', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111114', 'EMP004', '29876543', 'A004567890Q', '1991-04-18', 'female', 'married', 'Kenyan', 'sarah.wilson@personal.com', 'Tom Wilson', '+254701234583', 'full_time', '2021-09-15', 95000.00, 18000.00, 12000.00, 7000.00, 'Equity Bank', '4567890123', 'Sarah Wilson', 'active'),

('e1111111-1111-1111-1111-111111111115', '11111111-1111-1111-1111-111111111111', 'u1111111-1111-1111-1111-111111111115', 'EMP005', '31234567', 'A005678901R', '1987-12-03', 'male', 'married', 'Kenyan', 'david.brown@personal.com', 'Susan Brown', '+254701234584', 'full_time', '2020-11-01', 140000.00, 28000.00, 18000.00, 12000.00, 'Standard Chartered', '5678901234', 'David Brown', 'active'),

-- StartupHub employees
('e2222222-2222-2222-2222-222222222221', '22222222-2222-2222-2222-222222222222', 'u2222222-2222-2222-2222-222222222221', 'SH001', '27654321', 'A006789012S', '1985-07-25', 'female', 'divorced', 'Kenyan', 'alice.johnson@personal.com', 'Mark Johnson', '+254701234585', 'full_time', '2023-02-01', 110000.00, 22000.00, 15000.00, 10000.00, 'KCB Bank', '6789012345', 'Alice Johnson', 'active'),

('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'u2222222-2222-2222-2222-222222222222', 'SH002', '33445566', 'A007890123T', '1993-03-12', 'male', 'single', 'Kenyan', 'bob.williams@personal.com', 'Emma Williams', '+254701234586', 'full_time', '2023-04-15', 85000.00, 15000.00, 10000.00, 6000.00, 'Cooperative Bank', '7890123456', 'Bob Williams', 'active'),

-- MegaCorp employees
('e3333333-3333-3333-3333-333333333331', '33333333-3333-3333-3333-333333333333', 'u3333333-3333-3333-3333-333333333331', 'MC001', '26543210', 'A008901234U', '1982-09-08', 'female', 'married', 'Kenyan', 'mary.davis@personal.com', 'John Davis', '+254701234587', 'full_time', '2019-05-20', 180000.00, 35000.00, 25000.00, 20000.00, 'Equity Bank', '8901234567', 'Mary Davis', 'active'),

('e3333333-3333-3333-3333-333333333332', '33333333-3333-3333-3333-333333333333', 'u3333333-3333-3333-3333-333333333332', 'MC002', '34567890', 'A009012345V', '1989-01-30', 'male', 'married', 'Kenyan', 'james.miller@personal.com', 'Carol Miller', '+254701234588', 'full_time', '2020-08-10', 90000.00, 18000.00, 12000.00, 8000.00, 'KCB Bank', '9012345678', 'James Miller', 'active'),

('e3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'u3333333-3333-3333-3333-333333333333', 'MC003', '35678901', 'A010123456W', '1994-06-14', 'female', 'single', 'Kenyan', 'lisa.anderson@personal.com', 'Peter Anderson', '+254701234589', 'full_time', '2021-12-01', 75000.00, 15000.00, 10000.00, 5000.00, 'Standard Chartered', '0123456789', 'Lisa Anderson', 'active'); 