-- =====================================================
-- PAYMENT PROCESSING TABLES
-- =====================================================

-- Payment transactions table
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES organization_subscriptions(id),
  
  -- Payment details
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'KES',
  payment_method TEXT CHECK (payment_method IN ('mpesa', 'card', 'bank_transfer', 'pesapal')),
  
  -- External references
  external_transaction_id TEXT,
  pesapal_merchant_reference TEXT,
  pesapal_order_tracking_id TEXT,
  pesapal_payment_method TEXT,
  mpesa_receipt_number TEXT,
  mpesa_phone_number TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),
  failure_reason TEXT,
  
  -- Metadata
  payment_data JSONB DEFAULT '{}', -- Store provider-specific data
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX idx_payment_transactions_org_id (organization_id),
  INDEX idx_payment_transactions_status (status),
  INDEX idx_payment_transactions_external_id (external_transaction_id)
);

-- Payment methods for organizations
CREATE TABLE organization_payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN ('mpesa', 'card', 'bank_account', 'pesapal_wallet')),
  provider TEXT NOT NULL, -- 'pesapal', 'safaricom', 'stripe'
  
  -- Payment method details (encrypted)
  details JSONB NOT NULL, -- Store encrypted payment method details
  last_four TEXT, -- Last 4 digits for display
  
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure only one default per organization
  UNIQUE(organization_id, is_default) WHERE is_default = true
);

-- Add payment-related columns to existing tables
ALTER TABLE organization_subscriptions ADD COLUMN IF NOT EXISTS pesapal_merchant_reference TEXT;
ALTER TABLE organization_subscriptions ADD COLUMN IF NOT EXISTS pesapal_order_tracking_id TEXT;
ALTER TABLE organization_subscriptions ADD COLUMN IF NOT EXISTS next_payment_date DATE;
ALTER TABLE organization_subscriptions ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));
ALTER TABLE organization_subscriptions ADD COLUMN IF NOT EXISTS last_payment_attempt TIMESTAMP WITH TIME ZONE;
ALTER TABLE organization_subscriptions ADD COLUMN IF NOT EXISTS payment_failure_count INTEGER DEFAULT 0;

-- =====================================================
-- ENHANCED EMPLOYEE MANAGEMENT
-- =====================================================

-- Employee records (separate from user_profiles for payroll)
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_profile_id UUID REFERENCES user_profiles(id) UNIQUE,
  
  -- Employment details
  employee_number TEXT NOT NULL,
  national_id TEXT, -- Kenyan National ID
  kra_pin TEXT, -- Kenya Revenue Authority PIN
  nssf_number TEXT, -- National Social Security Fund
  nhif_number TEXT, -- National Hospital Insurance Fund
  passport_number TEXT,
  
  -- Personal details
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  marital_status TEXT CHECK (marital_status IN ('single', 'married', 'divorced', 'widowed')),
  nationality TEXT DEFAULT 'Kenyan',
  
  -- Contact details
  personal_email TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  
  -- Address
  address JSONB DEFAULT '{}', -- Full address details
  
  -- Employment terms
  employment_type TEXT CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern', 'consultant')),
  contract_start_date DATE,
  contract_end_date DATE,
  probation_end_date DATE,
  
  -- Salary structure (in KES)
  basic_salary DECIMAL(15,2) NOT NULL,
  housing_allowance DECIMAL(15,2) DEFAULT 0,
  transport_allowance DECIMAL(15,2) DEFAULT 0,
  medical_allowance DECIMAL(15,2) DEFAULT 0,
  other_allowances JSONB DEFAULT '{}',
  gross_salary DECIMAL(15,2) GENERATED ALWAYS AS (
    basic_salary + housing_allowance + transport_allowance + medical_allowance
  ) STORED,
  
  -- Deductions
  tax_rate DECIMAL(5,4) DEFAULT 0.30, -- 30% tax rate
  nssf_contribution DECIMAL(15,2) DEFAULT 0,
  nhif_contribution DECIMAL(15,2) DEFAULT 0,
  loan_deductions JSONB DEFAULT '{}',
  other_deductions JSONB DEFAULT '{}',
  
  -- Bank details
  bank_name TEXT,
  bank_branch TEXT,
  account_number TEXT,
  account_name TEXT,
  swift_code TEXT,
  
  -- Status
  employment_status TEXT DEFAULT 'active' CHECK (employment_status IN ('active', 'suspended', 'terminated', 'resigned', 'retired')),
  termination_date DATE,
  termination_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, employee_number),
  UNIQUE(organization_id, national_id) WHERE national_id IS NOT NULL
);

-- =====================================================
-- PAYROLL MANAGEMENT
-- =====================================================

-- Payroll runs
CREATE TABLE payroll_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Period details
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  pay_date DATE NOT NULL,
  description TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'calculated', 'approved', 'paid', 'cancelled')),
  
  -- Totals
  total_employees INTEGER DEFAULT 0,
  total_gross DECIMAL(15,2) DEFAULT 0,
  total_deductions DECIMAL(15,2) DEFAULT 0,
  total_net DECIMAL(15,2) DEFAULT 0,
  total_tax DECIMAL(15,2) DEFAULT 0,
  total_nssf DECIMAL(15,2) DEFAULT 0,
  total_nhif DECIMAL(15,2) DEFAULT 0,
  
  -- Approval workflow
  created_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Payment details
  payment_method TEXT CHECK (payment_method IN ('bank_transfer', 'mpesa', 'cash', 'cheque')),
  payment_reference TEXT,
  payment_completed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual payslips
CREATE TABLE payslips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  
  -- Employee details at time of payroll
  employee_number TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  department TEXT,
  job_title TEXT,
  
  -- Earnings
  basic_pay DECIMAL(15,2) NOT NULL,
  housing_allowance DECIMAL(15,2) DEFAULT 0,
  transport_allowance DECIMAL(15,2) DEFAULT 0,
  medical_allowance DECIMAL(15,2) DEFAULT 0,
  overtime_hours DECIMAL(5,2) DEFAULT 0,
  overtime_pay DECIMAL(15,2) DEFAULT 0,
  bonus DECIMAL(15,2) DEFAULT 0,
  commission DECIMAL(15,2) DEFAULT 0,
  other_earnings JSONB DEFAULT '{}',
  gross_pay DECIMAL(15,2) NOT NULL,
  
  -- Deductions
  paye_tax DECIMAL(15,2) DEFAULT 0,
  nssf_deduction DECIMAL(15,2) DEFAULT 0,
  nhif_deduction DECIMAL(15,2) DEFAULT 0,
  loan_deductions DECIMAL(15,2) DEFAULT 0,
  other_deductions JSONB DEFAULT '{}',
  total_deductions DECIMAL(15,2) DEFAULT 0,
  
  -- Net pay
  net_pay DECIMAL(15,2) NOT NULL,
  
  -- Payment details
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled')),
  payment_method TEXT,
  payment_reference TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  
  -- Bank details used for payment
  bank_name TEXT,
  account_number TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(payroll_run_id, employee_id)
);

-- =====================================================
-- LEAVE MANAGEMENT
-- =====================================================

-- Leave types
CREATE TABLE leave_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  code TEXT, -- e.g., 'AL' for Annual Leave
  
  -- Entitlement
  days_per_year INTEGER NOT NULL,
  max_consecutive_days INTEGER,
  min_notice_days INTEGER DEFAULT 0,
  max_advance_days INTEGER, -- How far in advance can be booked
  
  -- Rules
  requires_approval BOOLEAN DEFAULT true,
  is_paid BOOLEAN DEFAULT true,
  carry_forward_allowed BOOLEAN DEFAULT false,
  max_carry_forward_days INTEGER DEFAULT 0,
  accrual_method TEXT DEFAULT 'yearly' CHECK (accrual_method IN ('yearly', 'monthly', 'weekly')),
  
  -- Restrictions
  blackout_dates JSONB DEFAULT '[]', -- Array of date ranges when leave is not allowed
  applicable_to JSONB DEFAULT '{}', -- Rules for who can use this leave type
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  effective_from DATE DEFAULT CURRENT_DATE,
  effective_to DATE,
  
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, name),
  UNIQUE(organization_id, code) WHERE code IS NOT NULL
);

-- Employee leave balances
CREATE TABLE employee_leave_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  leave_type_id UUID REFERENCES leave_types(id) ON DELETE CASCADE,
  
  -- Balance details
  year INTEGER NOT NULL,
  entitled_days DECIMAL(5,2) NOT NULL DEFAULT 0,
  used_days DECIMAL(5,2) NOT NULL DEFAULT 0,
  carried_forward_days DECIMAL(5,2) NOT NULL DEFAULT 0,
  remaining_days DECIMAL(5,2) GENERATED ALWAYS AS (
    entitled_days + carried_forward_days - used_days
  ) STORED,
  
  -- Metadata
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(employee_id, leave_type_id, year)
);

-- Leave applications
CREATE TABLE leave_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  leave_type_id UUID REFERENCES leave_types(id),
  
  -- Application details
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested DECIMAL(5,2) NOT NULL,
  reason TEXT,
  contact_during_leave TEXT, -- Phone/email for emergencies
  
  -- Approval workflow
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled', 'withdrawn')),
  
  -- Approval chain (can have multiple approvers)
  current_approver UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  -- Delegation
  delegated_to UUID REFERENCES employees(id), -- Who will cover duties
  delegation_notes TEXT,
  
  -- Documents
  supporting_documents JSONB DEFAULT '[]', -- Array of document URLs
  
  -- Notifications
  employee_notified BOOLEAN DEFAULT false,
  manager_notified BOOLEAN DEFAULT false,
  hr_notified BOOLEAN DEFAULT false,
  
  -- Metadata
  applied_by UUID REFERENCES user_profiles(id), -- Could be different from employee (HR applying on behalf)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leave application approval workflow
CREATE TABLE leave_approval_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  leave_application_id UUID REFERENCES leave_applications(id) ON DELETE CASCADE,
  
  approver_id UUID REFERENCES user_profiles(id),
  step_order INTEGER NOT NULL,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'skipped')),
  comments TEXT,
  
  acted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(leave_application_id, step_order)
);

-- =====================================================
-- ATTENDANCE & TIME TRACKING
-- =====================================================

-- Attendance records
CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  
  -- Date and times
  attendance_date DATE NOT NULL,
  clock_in_time TIMESTAMP WITH TIME ZONE,
  clock_out_time TIMESTAMP WITH TIME ZONE,
  
  -- Location tracking
  clock_in_location JSONB, -- GPS coordinates, address
  clock_out_location JSONB,
  
  -- Calculated fields
  total_hours DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN clock_out_time IS NOT NULL AND clock_in_time IS NOT NULL 
      THEN EXTRACT(EPOCH FROM (clock_out_time - clock_in_time)) / 3600
      ELSE NULL 
    END
  ) STORED,
  
  -- Status
  status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half_day', 'on_leave')),
  
  -- Break times
  break_duration_minutes INTEGER DEFAULT 0,
  
  -- Overtime
  overtime_hours DECIMAL(5,2) DEFAULT 0,
  overtime_approved BOOLEAN DEFAULT false,
  
  -- Notes
  notes TEXT,
  late_reason TEXT,
  
  -- Approval
  approved_by UUID REFERENCES user_profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(employee_id, attendance_date)
);

-- =====================================================
-- ENABLE RLS ON NEW TABLES
-- =====================================================

ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE payslips ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_approval_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES FOR NEW TABLES
-- =====================================================

-- Payment transactions: Organization admins and billing managers only
CREATE POLICY "Payment transactions access" ON payment_transactions
  FOR ALL USING (
    organization_id = get_current_organization_id() 
    AND (user_has_permission('org.billing') OR user_has_permission('*'))
  );

-- Organization payment methods: Billing access only
CREATE POLICY "Payment methods access" ON organization_payment_methods
  FOR ALL USING (
    organization_id = get_current_organization_id() 
    AND (user_has_permission('org.billing') OR user_has_permission('*'))
  );

-- Employees: HR managers and above can see all, employees can see their own
CREATE POLICY "Employees access" ON employees
  FOR SELECT USING (
    organization_id = get_current_organization_id() 
    AND (
      user_has_permission('employees.view') 
      OR user_profile_id = auth.uid()
      OR user_has_permission('*')
    )
  );

CREATE POLICY "Employees modify" ON employees
  FOR INSERT WITH CHECK (
    organization_id = get_current_organization_id() 
    AND user_has_permission('employees.create')
  );

CREATE POLICY "Employees update" ON employees
  FOR UPDATE USING (
    organization_id = get_current_organization_id() 
    AND (
      user_has_permission('employees.update')
      OR (user_profile_id = auth.uid() AND user_has_permission('profile.update'))
    )
  );

-- Payroll: HR and payroll managers only
CREATE POLICY "Payroll runs access" ON payroll_runs
  FOR ALL USING (
    organization_id = get_current_organization_id() 
    AND (user_has_permission('payroll.view') OR user_has_permission('*'))
  );

-- Payslips: HR can see all, employees can see their own
CREATE POLICY "Payslips access" ON payslips
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM payroll_runs pr
      WHERE pr.id = payslips.payroll_run_id
      AND pr.organization_id = get_current_organization_id()
    ) AND (
      user_has_permission('payroll.view')
      OR EXISTS (
        SELECT 1 FROM employees e
        WHERE e.id = payslips.employee_id
        AND e.user_profile_id = auth.uid()
      )
    )
  );

-- Leave management: Organization-scoped with role-based access
CREATE POLICY "Leave types access" ON leave_types
  FOR ALL USING (organization_id = get_current_organization_id());

CREATE POLICY "Leave balances access" ON employee_leave_balances
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM employees e
      WHERE e.id = employee_leave_balances.employee_id
      AND e.organization_id = get_current_organization_id()
    ) AND (
      user_has_permission('employees.view')
      OR EXISTS (
        SELECT 1 FROM employees e
        WHERE e.id = employee_leave_balances.employee_id
        AND e.user_profile_id = auth.uid()
      )
    )
  );

CREATE POLICY "Leave applications access" ON leave_applications
  FOR ALL USING (
    organization_id = get_current_organization_id() AND (
      user_has_permission('employees.view')
      OR EXISTS (
        SELECT 1 FROM employees e
        WHERE e.id = leave_applications.employee_id
        AND e.user_profile_id = auth.uid()
      )
    )
  );

-- Attendance: Similar to leave management
CREATE POLICY "Attendance records access" ON attendance_records
  FOR ALL USING (
    organization_id = get_current_organization_id() AND (
      user_has_permission('employees.view')
      OR EXISTS (
        SELECT 1 FROM employees e
        WHERE e.id = attendance_records.employee_id
        AND e.user_profile_id = auth.uid()
      )
    )
  );

-- =====================================================
-- USEFUL INDEXES
-- =====================================================

-- Performance indexes
CREATE INDEX idx_employees_org_id ON employees(organization_id);
CREATE INDEX idx_employees_user_profile_id ON employees(user_profile_id);
CREATE INDEX idx_employees_employee_number ON employees(organization_id, employee_number);

CREATE INDEX idx_payroll_runs_org_status ON payroll_runs(organization_id, status);
CREATE INDEX idx_payroll_runs_period ON payroll_runs(period_start, period_end);

CREATE INDEX idx_payslips_payroll_run ON payslips(payroll_run_id);
CREATE INDEX idx_payslips_employee ON payslips(employee_id);

CREATE INDEX idx_leave_applications_employee ON leave_applications(employee_id);
CREATE INDEX idx_leave_applications_dates ON leave_applications(start_date, end_date);
CREATE INDEX idx_leave_applications_status ON leave_applications(organization_id, status);

CREATE INDEX idx_attendance_employee_date ON attendance_records(employee_id, attendance_date);
CREATE INDEX idx_attendance_org_date ON attendance_records(organization_id, attendance_date);

-- =====================================================
-- DEFAULT DATA
-- =====================================================

-- Insert default leave types (will be added per organization via function)
-- This is handled in the application logic when an organization is created 