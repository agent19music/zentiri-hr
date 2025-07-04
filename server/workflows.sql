-- =====================================================
-- TRIGGERS FOR AUTOMATED ACTIONS
-- =====================================================

-- Function to send welcome email after organization creation
CREATE OR REPLACE FUNCTION notify_organization_created()
RETURNS TRIGGER AS $$
BEGIN
  -- Send webhook to trigger welcome email
  PERFORM net.http_post(
    url := 'https://your-app.com/api/webhooks/organization-created',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'organization_id', NEW.id,
      'subdomain', NEW.subdomain,
      'admin_email', NEW.billing_email,
      'name', NEW.name
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER organization_created_trigger
  AFTER INSERT ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION notify_organization_created();

-- Function to send invitation email
CREATE OR REPLACE FUNCTION send_invitation_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Only send if status changed to 'sent'
  IF NEW.status = 'sent' AND (OLD IS NULL OR OLD.status != 'sent') THEN
    PERFORM net.http_post(
      url := 'https://your-app.com/api/webhooks/send-invitation',
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := jsonb_build_object(
        'invitation_id', NEW.id,
        'email', NEW.email,
        'first_name', NEW.first_name,
        'organization_id', NEW.organization_id,
        'invitation_token', NEW.invitation_token
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invitation_email_trigger
  AFTER INSERT OR UPDATE ON employee_invitations
  FOR EACH ROW
  EXECUTE FUNCTION send_invitation_email();

-- Function to log user actions
CREATE OR REPLACE FUNCTION log_user_action()
RETURNS TRIGGER AS $$
DECLARE
  action_type TEXT;
  org_id UUID;
BEGIN
  -- Determine action type
  IF TG_OP = 'INSERT' THEN
    action_type := 'create';
  ELSIF TG_OP = 'UPDATE' THEN
    action_type := 'update';
  ELSIF TG_OP = 'DELETE' THEN
    action_type := 'delete';
  END IF;
  
  -- Get organization ID from the record
  IF TG_OP = 'DELETE' THEN
    org_id := OLD.organization_id;
  ELSE
    org_id := NEW.organization_id;
  END IF;
  
  -- Insert audit log
  INSERT INTO audit_logs (
    organization_id, user_id, action, resource_type, resource_id,
    old_values, new_values, ip_address
  ) VALUES (
    org_id,
    auth.uid(),
    action_type,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE row_to_json(NEW) END,
    inet_client_addr()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit logging to key tables
CREATE TRIGGER audit_user_profiles
  AFTER INSERT OR UPDATE OR DELETE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION log_user_action();

CREATE TRIGGER audit_departments
  AFTER INSERT OR UPDATE OR DELETE ON departments
  FOR EACH ROW EXECUTE FUNCTION log_user_action();

CREATE TRIGGER audit_teams
  AFTER INSERT OR UPDATE OR DELETE ON teams
  FOR EACH ROW EXECUTE FUNCTION log_user_action();

CREATE TRIGGER audit_user_roles
  AFTER INSERT OR UPDATE OR DELETE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION log_user_action();

-- Function to automatically assign employee role to new users
CREATE OR REPLACE FUNCTION assign_default_employee_role()
RETURNS TRIGGER AS $$
DECLARE
  employee_role_id UUID;
BEGIN
  -- Get the default employee role
  SELECT id INTO employee_role_id 
  FROM roles 
  WHERE name = 'employee' AND is_system_role = true;
  
  -- Assign employee role if no default role is set and user is not admin
  IF NEW.default_role_id IS NULL THEN
    NEW.default_role_id := employee_role_id;
    
    -- Also create the role assignment
    INSERT INTO user_roles (user_id, role_id, assigned_by)
    VALUES (NEW.id, employee_role_id, NEW.invited_by);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_default_role_trigger
  BEFORE INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION assign_default_employee_role();

-- Function to update team member count
CREATE OR REPLACE FUNCTION update_team_member_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the team's settings with current member count
  UPDATE teams 
  SET settings = settings || jsonb_build_object(
    'member_count', (
      SELECT COUNT(*) 
      FROM team_members 
      WHERE team_id = COALESCE(NEW.team_id, OLD.team_id)
    )
  )
  WHERE id = COALESCE(NEW.team_id, OLD.team_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_count_trigger
  AFTER INSERT OR DELETE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_team_member_count();