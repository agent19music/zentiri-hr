-- =====================================================
-- ORGANIZATION REGISTRATION FUNCTIONS
-- =====================================================

-- Function to create organization after payment
CREATE OR REPLACE FUNCTION create_organization_after_payment(
  p_name TEXT,
  p_subdomain TEXT,
  p_industry TEXT,
  p_company_size TEXT,
  p_admin_email TEXT,
  p_admin_first_name TEXT,
  p_admin_last_name TEXT,
  p_subscription_plan_id UUID,
  p_payment_reference TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_org_id UUID;
  v_admin_user_id UUID;
  v_admin_role_id UUID;
  v_trial_end TIMESTAMP WITH TIME ZONE;
  result JSONB;
BEGIN
  -- Calculate trial end date
  SELECT trial_days INTO v_trial_end FROM subscription_plans WHERE id = p_subscription_plan_id;
  v_trial_end := NOW() + (v_trial_end || ' days')::INTERVAL;
  
  -- Create organization
  INSERT INTO organizations (
    name, subdomain, industry, company_size,
    subscription_plan_id, subscription_status, trial_ends_at,
    billing_email, onboarding_completed
  ) VALUES (
    p_name, p_subdomain, p_industry, p_company_size,
    p_subscription_plan_id, 'trial', v_trial_end,
    p_admin_email, false
  ) RETURNING id INTO v_org_id;
  
  -- Create subscription record
  INSERT INTO organization_subscriptions (
    organization_id, subscription_plan_id, status,
    starts_at, ends_at, payment_frequency
  ) VALUES (
    v_org_id, p_subscription_plan_id, 'active',
    NOW(), v_trial_end, 'monthly'
  );
  
  -- Get org_admin role
  SELECT id INTO v_admin_role_id FROM roles WHERE name = 'org_admin' AND is_system_role = true;
  
  -- Create admin user in auth.users (this would be handled by Supabase Auth in practice)
  -- For this example, we'll assume the user already exists and we get their ID
  
  -- Create user profile
  INSERT INTO user_profiles (
    id, organization_id, first_name, last_name,
    default_role_id, is_active, email_verified_at
  ) VALUES (
    v_admin_user_id, v_org_id, p_admin_first_name, p_admin_last_name,
    v_admin_role_id, true, NOW()
  );
  
  -- Assign admin role
  INSERT INTO user_roles (user_id, role_id, assigned_by)
  VALUES (v_admin_user_id, v_admin_role_id, v_admin_user_id);
  
  -- Create default departments
  INSERT INTO departments (organization_id, name, description, created_by)
  VALUES 
    (v_org_id, 'Administration', 'Administrative department', v_admin_user_id),
    (v_org_id, 'Human Resources', 'HR department', v_admin_user_id),
    (v_org_id, 'Finance', 'Finance department', v_admin_user_id);
  
  -- Create default task categories
  INSERT INTO task_categories (organization_id, name, description, created_by)
  VALUES
    (v_org_id, 'General', 'General tasks', v_admin_user_id),
    (v_org_id, 'Training', 'Training and development', v_admin_user_id),
    (v_org_id, 'Project', 'Project-related tasks', v_admin_user_id);
  
  -- Create default award types
  INSERT INTO award_types (organization_id, name, description, is_recurring, recurrence_period, created_by)
  VALUES
    (v_org_id, 'Employee of the Month', 'Monthly recognition award', true, 'monthly', v_admin_user_id),
    (v_org_id, 'Excellence Award', 'Outstanding performance recognition', false, null, v_admin_user_id),
    (v_org_id, 'Team Player', 'Great teamwork recognition', false, null, v_admin_user_id);
  
  -- Log the organization creation
  INSERT INTO audit_logs (organization_id, user_id, action, resource_type, resource_id, new_values)
  VALUES (
    v_org_id, v_admin_user_id, 'create', 'organization', v_org_id,
    jsonb_build_object('payment_reference', p_payment_reference)
  );
  
  result := jsonb_build_object(
    'organization_id', v_org_id,
    'admin_user_id', v_admin_user_id,
    'subdomain', p_subdomain,
    'trial_ends_at', v_trial_end,
    'success', true
  );
  
  RETURN result;
  
EXCEPTION WHEN OTHERS THEN
  -- Rollback will happen automatically
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to invite employee
CREATE OR REPLACE FUNCTION invite_employee(
  p_email TEXT,
  p_first_name TEXT,
  p_last_name TEXT,
  p_phone TEXT DEFAULT NULL,
  p_role_id UUID DEFAULT NULL,
  p_department_id UUID DEFAULT NULL,
  p_team_id UUID DEFAULT NULL,
  p_manager_id UUID DEFAULT NULL,
  p_personal_file_number TEXT DEFAULT NULL,
  p_job_title TEXT DEFAULT NULL,
  p_basic_pay DECIMAL DEFAULT NULL,
  p_start_date DATE DEFAULT NULL,
  p_employment_type TEXT DEFAULT 'full_time'
)
RETURNS JSONB AS $$
DECLARE
  v_org_id UUID;
  v_invitation_id UUID;
  v_token TEXT;
BEGIN
  -- Get current user's organization
  SELECT organization_id INTO v_org_id FROM user_profiles WHERE id = auth.uid();
  
  -- Generate invitation token
  v_token := encode(gen_random_bytes(32), 'hex');
  
  -- Create invitation
  INSERT INTO employee_invitations (
    organization_id, email, first_name, last_name, phone,
    role_id, department_id, team_id, manager_id,
    personal_file_number, job_title, basic_pay, start_date, employment_type,
    invitation_token, invited_by
  ) VALUES (
    v_org_id, p_email, p_first_name, p_last_name, p_phone,
    p_role_id, p_department_id, p_team_id, p_manager_id,
    p_personal_file_number, p_job_title, p_basic_pay, p_start_date, p_employment_type,
    v_token, auth.uid()
  ) RETURNING id INTO v_invitation_id;
  
  -- Update invitation status to sent (would trigger email in practice)
  UPDATE employee_invitations 
  SET status = 'sent' 
  WHERE id = v_invitation_id;
  
  -- Log the invitation
  INSERT INTO audit_logs (organization_id, user_id, action, resource_type, resource_id)
  VALUES (v_org_id, auth.uid(), 'invite', 'employee', v_invitation_id);
  
  RETURN jsonb_build_object(
    'success', true,
    'invitation_id', v_invitation_id,
    'invitation_token', v_token
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to accept invitation and create user profile
CREATE OR REPLACE FUNCTION accept_invitation(
  p_invitation_token TEXT,
  p_user_id UUID -- This would come from Supabase Auth after user signs up
)
RETURNS JSONB AS $$
DECLARE
  v_invitation employee_invitations%ROWTYPE;
  v_profile_id UUID;
BEGIN
  -- Get invitation details
  SELECT * INTO v_invitation 
  FROM employee_invitations 
  WHERE invitation_token = p_invitation_token 
  AND status = 'sent' 
  AND expires_at > NOW();
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Invalid or expired invitation'
    );
  END IF;
  
  -- Create user profile
  INSERT INTO user_profiles (
    id, organization_id, first_name, last_name, phone,
    employee_id, default_role_id, department_id, team_id, manager_id,
    invited_at, invited_by, is_active
  ) VALUES (
    p_user_id, v_invitation.organization_id, v_invitation.first_name, v_invitation.last_name, v_invitation.phone,
    v_invitation.personal_file_number, v_invitation.role_id, v_invitation.department_id, v_invitation.team_id, v_invitation.manager_id,
    v_invitation.invited_at, v_invitation.invited_by, true
  ) RETURNING id INTO v_profile_id;
  
  -- Assign role if specified
  IF v_invitation.role_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id, assigned_by)
    VALUES (p_user_id, v_invitation.role_id, v_invitation.invited_by);
  END IF;
  
  -- Add to team if specified
  IF v_invitation.team_id IS NOT NULL THEN
    INSERT INTO team_members (team_id, user_id, added_by)
    VALUES (v_invitation.team_id, p_user_id, v_invitation.invited_by);
  END IF;
  
  -- Update invitation status
  UPDATE employee_invitations 
  SET status = 'accepted', accepted_at = NOW() 
  WHERE id = v_invitation.id;
  
  -- Log the acceptance
  INSERT INTO audit_logs (organization_id, user_id, action, resource_type, resource_id)
  VALUES (v_invitation.organization_id, p_user_id, 'accept_invitation', 'employee', v_invitation.id);
  
  RETURN jsonb_build_object(
    'success', true,
    'user_profile_id', v_profile_id,
    'organization_id', v_invitation.organization_id
  );
  
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', false,
    'error', SQLERRM
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;