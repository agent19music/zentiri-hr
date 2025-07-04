-- =====================================================
-- UTILITY FUNCTIONS
-- =====================================================

-- Function to get user's effective permissions
CREATE OR REPLACE FUNCTION get_user_permissions(p_user_id UUID)
RETURNS TEXT[] AS $$
DECLARE
  permissions TEXT[];
BEGIN
  SELECT ARRAY_AGG(DISTINCT permission) INTO permissions
  FROM (
    -- Permissions from roles
    SELECT unnest(r.permissions::text[]) as permission
    FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = p_user_id
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
    
    UNION
    
    -- Direct permissions (granted)
    SELECT up.permission_name as permission
    FROM user_permissions up
    WHERE up.user_id = p_user_id
    AND up.granted = true
    AND (up.expires_at IS NULL OR up.expires_at > NOW())
    
    EXCEPT
    
    -- Direct permissions (revoked)
    SELECT up.permission_name as permission
    FROM user_permissions up
    WHERE up.user_id = p_user_id
    AND up.granted = false
    AND (up.expires_at IS NULL OR up.expires_at > NOW())
  ) combined_permissions;
  
  RETURN permissions;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get organization hierarchy
CREATE OR REPLACE FUNCTION get_organization_hierarchy(p_org_id UUID)
RETURNS TABLE(
  department_id UUID,
  department_name TEXT,
  parent_department_id UUID,
  level INTEGER,
  path TEXT
) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE dept_hierarchy AS (
    -- Base case: top-level departments
    SELECT 
      d.id, d.name, d.parent_department_id, 1 as level,
      d.name as path
    FROM departments d
    WHERE d.organization_id = p_org_id 
    AND d.parent_department_id IS NULL
    AND d.is_active = true
    
    UNION ALL
    
    -- Recursive case: child departments
    SELECT 
      d.id, d.name, d.parent_department_id, dh.level + 1,
      dh.path || ' > ' || d.name
    FROM departments d
    JOIN dept_hierarchy dh ON d.parent_department_id = dh.department_id
    WHERE d.organization_id = p_org_id
    AND d.is_active = true
  )
  SELECT * FROM dept_hierarchy ORDER BY path;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's reporting chain
CREATE OR REPLACE FUNCTION get_reporting_chain(p_user_id UUID)
RETURNS TABLE(
  user_id UUID,
  full_name TEXT,
  role_name TEXT,
  level INTEGER
) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE reporting_chain AS (
    -- Base case: the user themselves
    SELECT 
      up.id, up.first_name || ' ' || up.last_name as full_name,
      r.display_name as role_name, 0 as level
    FROM user_profiles up
    LEFT JOIN roles r ON r.id = up.default_role_id
    WHERE up.id = p_user_id
    
    UNION ALL
    
    -- Recursive case: managers up the chain
    SELECT 
      up.id, up.first_name || ' ' || up.last_name as full_name,
      r.display_name as role_name, rc.level + 1
    FROM user_profiles up
    JOIN reporting_chain rc ON up.id = (
      SELECT manager_id FROM user_profiles WHERE id = rc.user_id
    )
    LEFT JOIN roles r ON r.id = up.default_role_id
    WHERE rc.level < 10 -- Prevent infinite loops
  )
  SELECT * FROM reporting_chain ORDER BY level;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check subscription limits
CREATE OR REPLACE FUNCTION check_subscription_limits(p_org_id UUID, p_limit_type TEXT)
RETURNS JSONB AS $$
DECLARE
  current_plan subscription_plans%ROWTYPE;
  current_count INTEGER;
  result JSONB;
BEGIN
  -- Get current subscription plan
  SELECT sp.* INTO current_plan
  FROM organizations o
  JOIN subscription_plans sp ON sp.id = o.subscription_plan_id
  WHERE o.id = p_org_id;
  
  -- Check specific limits
  CASE p_limit_type
    WHEN 'employees' THEN
      SELECT COUNT(*) INTO current_count
      FROM user_profiles 
      WHERE organization_id = p_org_id AND is_active = true;
      
      result := jsonb_build_object(
        'limit_type', 'employees',
        'current_count', current_count,
        'max_allowed', current_plan.max_employees,
        'can_add_more', (current_plan.max_employees = -1 OR current_count < current_plan.max_employees),
        'usage_percentage', 
          CASE 
            WHEN current_plan.max_employees = -1 THEN 0
            ELSE ROUND((current_count::numeric / current_plan.max_employees) * 100, 2)
          END
      );
    
    WHEN 'departments' THEN
      SELECT COUNT(*) INTO current_count
      FROM departments 
      WHERE organization_id = p_org_id AND is_active = true;
      
      result := jsonb_build_object(
        'limit_type', 'departments',
        'current_count', current_count,
        'max_allowed', current_plan.max_departments,
        'can_add_more', (current_plan.max_departments = -1 OR current_count < current_plan.max_departments),
        'usage_percentage',
          CASE 
            WHEN current_plan.max_departments = -1 THEN 0
            ELSE ROUND((current_count::numeric / current_plan.max_departments) * 100, 2)
          END
      );
    
    WHEN 'teams' THEN
      SELECT COUNT(*) INTO current_count
      FROM teams 
      WHERE organization_id = p_org_id AND is_active = true;
      
      result := jsonb_build_object(
        'limit_type', 'teams',
        'current_count', current_count,
        'max_allowed', current_plan.max_teams,
        'can_add_more', (current_plan.max_teams = -1 OR current_count < current_plan.max_teams),
        'usage_percentage',
          CASE 
            WHEN current_plan.max_teams = -1 THEN 0
            ELSE ROUND((current_count::numeric / current_plan.max_teams) * 100, 2)
          END
      );
    
    ELSE
      result := jsonb_build_object('error', 'Unknown limit type');
  END CASE;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;