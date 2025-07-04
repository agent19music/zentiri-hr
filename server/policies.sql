-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE award_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTIONS FOR RLS
-- =====================================================

-- Function to get current user's organization
CREATE OR REPLACE FUNCTION get_current_organization_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT organization_id 
    FROM user_profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has specific permission
CREATE OR REPLACE FUNCTION user_has_permission(permission_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  has_permission BOOLEAN := FALSE;
BEGIN
  -- Check if user has permission through roles or direct assignment
  SELECT EXISTS (
    -- Check through roles
    SELECT 1 FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid()
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
    AND (
      r.permissions ? permission_name 
      OR r.permissions ? '*'
    )
    
    UNION
    
    -- Check direct permissions
    SELECT 1 FROM user_permissions up
    WHERE up.user_id = auth.uid()
    AND up.permission_name = permission_name
    AND up.granted = true
    AND (up.expires_at IS NULL OR up.expires_at > NOW())
  ) INTO has_permission;
  
  RETURN has_permission;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can manage another user
CREATE OR REPLACE FUNCTION can_manage_user(target_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_user_level INTEGER;
  target_user_level INTEGER;
BEGIN
  -- Get current user's highest role level
  SELECT MIN(r.level) INTO current_user_level
  FROM user_roles ur
  JOIN roles r ON r.id = ur.role_id
  WHERE ur.user_id = auth.uid()
  AND ur.is_active = true;
  
  -- Get target user's highest role level
  SELECT MIN(r.level) INTO target_user_level
  FROM user_roles ur
  JOIN roles r ON r.id = ur.role_id
  WHERE ur.user_id = target_user_id
  AND ur.is_active = true;
  
  -- Can manage if current user has lower level number (higher authority)
  RETURN current_user_level < target_user_level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Organizations: Users can only access their own organization
CREATE POLICY "Users can access own organization" ON organizations
  FOR ALL USING (id = get_current_organization_id());

-- Subscription plans: All authenticated users can view (for selection)
CREATE POLICY "All users can view subscription plans" ON subscription_plans
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only super admins can modify plans" ON subscription_plans
  FOR ALL USING (user_has_permission('*'));

-- Organization subscriptions: Organization members only
CREATE POLICY "Organization subscription access" ON organization_subscriptions
  FOR ALL USING (organization_id = get_current_organization_id());

-- Roles: Organization-scoped with system roles visible to all
CREATE POLICY "Role access policy" ON roles
  FOR ALL USING (
    is_system_role = true 
    OR organization_id = get_current_organization_id()
  );

-- Permissions: All authenticated users can view (for UI)
CREATE POLICY "All users can view permissions" ON permissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- User profiles: Organization-scoped
CREATE POLICY "User profiles access" ON user_profiles
  FOR ALL USING (organization_id = get_current_organization_id());

-- User roles: Can view all in org, can modify based on permissions
CREATE POLICY "User roles view" ON user_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles up 
      WHERE up.id = user_roles.user_id 
      AND up.organization_id = get_current_organization_id()
    )
  );

CREATE POLICY "User roles insert" ON user_roles
  FOR INSERT WITH CHECK (
    user_has_permission('users.update')
    AND can_manage_user(user_id)
  );

CREATE POLICY "User roles update" ON user_roles
  FOR UPDATE USING (
    user_has_permission('users.update')
    AND can_manage_user(user_id)
  );

CREATE POLICY "User roles delete" ON user_roles
  FOR DELETE USING (
    user_has_permission('users.update')
    AND can_manage_user(user_id)
  );


-- User permissions: Similar to user roles
CREATE POLICY "User permissions view" ON user_permissions
  FOR SELECT USING (
    user_id = auth.uid() 
    OR (
      user_has_permission('users.view')
      AND EXISTS (
        SELECT 1 FROM user_profiles up 
        WHERE up.id = user_permissions.user_id 
        AND up.organization_id = get_current_organization_id()
      )
    )
  );

-- Policy for inserting into user_permissions
CREATE POLICY "User permissions insert" ON user_permissions
  FOR INSERT WITH CHECK (
    user_has_permission('users.update')
    AND can_manage_user(user_id)
  );

-- Policy for updating user_permissions
CREATE POLICY "User permissions update" ON user_permissions
  FOR UPDATE USING (
    user_has_permission('users.update')
    AND can_manage_user(user_id)
  );

-- Policy for deleting from user_permissions
CREATE POLICY "User permissions delete" ON user_permissions
  FOR DELETE USING (
    user_has_permission('users.update')
    AND can_manage_user(user_id)
  );


-- Departments: Organization-scoped
CREATE POLICY "Departments access" ON departments
  FOR ALL USING (organization_id = get_current_organization_id());

-- Teams: Organization-scoped
CREATE POLICY "Teams access" ON teams
  FOR ALL USING (organization_id = get_current_organization_id());

-- Team members: Can view if in same org, modify based on permissions
CREATE POLICY "Team members view" ON team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM teams t 
      WHERE t.id = team_members.team_id 
      AND t.organization_id = get_current_organization_id()
    )
  );

-- Policy for inserting into team_members
CREATE POLICY "Team members insert" ON team_members
  FOR INSERT WITH CHECK (
    user_has_permission('teams.update')
    OR (
      user_has_permission('teams.manage_own')
      AND EXISTS (
        SELECT 1 FROM teams t
        WHERE t.id = team_members.team_id
        AND t.team_lead_id = auth.uid()
      )
    )
  );

-- Policy for updating team_members
CREATE POLICY "Team members update" ON team_members
  FOR UPDATE USING (
    user_has_permission('teams.update')
    OR (
      user_has_permission('teams.manage_own')
      AND EXISTS (
        SELECT 1 FROM teams t
        WHERE t.id = team_members.team_id
        AND t.team_lead_id = auth.uid()
      )
    )
  );

-- Policy for deleting from team_members
CREATE POLICY "Team members delete" ON team_members
  FOR DELETE USING (
    user_has_permission('teams.update')
    OR (
      user_has_permission('teams.manage_own')
      AND EXISTS (
        SELECT 1 FROM teams t
        WHERE t.id = team_members.team_id
        AND t.team_lead_id = auth.uid()
      )
    )
  );


-- Employee invitations: Organization-scoped
CREATE POLICY "Invitations access" ON employee_invitations
  FOR ALL USING (organization_id = get_current_organization_id());

-- Import sessions: Organization-scoped
CREATE POLICY "Import sessions access" ON import_sessions
  FOR ALL USING (organization_id = get_current_organization_id());

-- Tasks: Organization-scoped with additional view restrictions
CREATE POLICY "Tasks view" ON tasks
  FOR SELECT USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('tasks.view')
      OR assigned_to = auth.uid()
      OR assigned_by = auth.uid()
    )
  );

-- Policy for inserting into tasks
CREATE POLICY "Tasks insert" ON tasks
  FOR INSERT WITH CHECK (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('tasks.create')
      OR assigned_by = auth.uid()
    )
  );

-- Policy for updating tasks
CREATE POLICY "Tasks update" ON tasks
  FOR UPDATE USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('tasks.create')
      OR assigned_by = auth.uid()
    )
  );

-- Policy for deleting from tasks
CREATE POLICY "Tasks modify" ON tasks
  FOR DELETE USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('tasks.create')
      OR assigned_by = auth.uid()
    )
  );


-- Task categories: Organization-scoped
CREATE POLICY "Task categories access" ON task_categories
  FOR ALL USING (organization_id = get_current_organization_id());

-- Task comments: Can view if can view task, can add if assigned or creator
CREATE POLICY "Task comments view" ON task_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tasks t 
      WHERE t.id = task_comments.task_id 
      AND t.organization_id = get_current_organization_id()
      AND (
        user_has_permission('tasks.view')
        OR t.assigned_to = auth.uid()
        OR t.assigned_by = auth.uid()
      )
    )
  );

-- Policy for inserting into task_comments
CREATE POLICY "Task comments insert" ON task_comments
  FOR INSERT WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM tasks t
      WHERE t.id = task_comments.task_id
      AND t.organization_id = get_current_organization_id()
    )
  );

-- Policy for updating task_comments
CREATE POLICY "Task comments update" ON task_comments
  FOR UPDATE USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM tasks t
      WHERE t.id = task_comments.task_id
      AND t.organization_id = get_current_organization_id()
    )
  );

-- Policy for deleting from task_comments
CREATE POLICY "Task comments delete" ON task_comments
  FOR DELETE USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM tasks t
      WHERE t.id = task_comments.task_id
      AND t.organization_id = get_current_organization_id()
    )
  );


-- Awards: Organization-scoped
CREATE POLICY "Award types access" ON award_types
  FOR ALL USING (organization_id = get_current_organization_id());

CREATE POLICY "Employee awards view" ON employee_awards
  FOR SELECT USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('awards.view')
      OR employee_id = auth.uid()
    )
  );

-- Policy for inserting into employee_awards
CREATE POLICY "Employee awards insert" ON employee_awards
  FOR INSERT WITH CHECK (
    organization_id = get_current_organization_id()
    AND user_has_permission('awards.create')
  );

-- Policy for updating employee_awards
CREATE POLICY "Employee awards update" ON employee_awards
  FOR UPDATE USING (
    organization_id = get_current_organization_id()
    AND user_has_permission('awards.create')
  );

-- Policy for deleting from employee_awards
CREATE POLICY "Employee awards delete" ON employee_awards
  FOR DELETE USING (
    organization_id = get_current_organization_id()
    AND user_has_permission('awards.create')
  );


-- Recommendations: Organization-scoped
CREATE POLICY "Recommendations view" ON employee_recommendations
  FOR SELECT USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('awards.view')
      OR employee_id = auth.uid()
      OR recommended_by = auth.uid()
    )
  );

-- Policy for inserting into employee_recommendations
CREATE POLICY "Recommendations insert" ON employee_recommendations
  FOR INSERT WITH CHECK (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('awards.nominate')
      OR recommended_by = auth.uid()
    )
  );

-- Policy for updating employee_recommendations
CREATE POLICY "Recommendations update" ON employee_recommendations
  FOR UPDATE USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('awards.nominate')
      OR recommended_by = auth.uid()
    )
  );

-- Policy for deleting from employee_recommendations
CREATE POLICY "Recommendations delete" ON employee_recommendations
  FOR DELETE USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('awards.nominate')
      OR recommended_by = auth.uid()
    )
  );


-- Audit logs: Organization-scoped, view only for most users
CREATE POLICY "Audit logs view" ON audit_logs
  FOR SELECT USING (
    organization_id = get_current_organization_id()
    AND (
      user_has_permission('org.settings')
      OR user_id = auth.uid()
    )
  );

CREATE POLICY "Audit logs insert" ON audit_logs
  FOR INSERT WITH CHECK (true); -- Allow system to insert audit logs