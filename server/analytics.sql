-- =====================================================
-- MATERIALIZED VIEWS FOR ANALYTICS
-- =====================================================

-- Organization overview statistics
CREATE MATERIALIZED VIEW mv_organization_stats AS
SELECT 
  o.id as organization_id,
  o.name as organization_name,
  o.subscription_status,
  sp.name as plan_name,
  
  -- User counts
  COUNT(DISTINCT up.id) as total_users,
  COUNT(DISTINCT up.id) FILTER (WHERE up.is_active = true) as active_users,
  COUNT(DISTINCT up.id) FILTER (WHERE up.last_login_at > NOW() - INTERVAL '30 days') as monthly_active_users,
  
  -- Department and team counts
  COUNT(DISTINCT d.id) as total_departments,
  COUNT(DISTINCT t.id) as total_teams,
  
  -- Task statistics
  COUNT(DISTINCT tk.id) as total_tasks,
  COUNT(DISTINCT tk.id) FILTER (WHERE tk.status = 'completed') as completed_tasks,
  COUNT(DISTINCT tk.id) FILTER (WHERE tk.status = 'overdue') as overdue_tasks,
  
  -- Award statistics
  COUNT(DISTINCT ea.id) as total_awards_given,
  COUNT(DISTINCT ea.id) FILTER (WHERE ea.awarded_at > NOW() - INTERVAL '30 days') as monthly_awards,
  
  -- Last updated
  NOW() as last_updated
  
FROM organizations o
LEFT JOIN subscription_plans sp ON sp.id = o.subscription_plan_id
LEFT JOIN user_profiles up ON up.organization_id = o.id
LEFT JOIN departments d ON d.organization_id = o.id AND d.is_active = true
LEFT JOIN teams t ON t.organization_id = o.id AND t.is_active = true
LEFT JOIN tasks tk ON tk.organization_id = o.id
LEFT JOIN employee_awards ea ON ea.organization_id = o.id
WHERE o.is_active = true
GROUP BY o.id, o.name, o.subscription_status, sp.name;

-- User activity summary
CREATE MATERIALIZED VIEW mv_user_activity AS
SELECT 
  up.id as user_id,
  up.organization_id,
  up.first_name || ' ' || up.last_name as full_name,
  up.last_login_at,
  
  -- Task activity
  COUNT(DISTINCT t_assigned.id) as tasks_assigned,
  COUNT(DISTINCT t_completed.id) as tasks_completed,
  COUNT(DISTINCT t_created.id) as tasks_created,
  
  -- Award activity
  COUNT(DISTINCT ea_received.id) as awards_received,
  COUNT(DISTINCT ea_nominated.id) as awards_nominated_by_user,
  
  -- Team participation
  COUNT(DISTINCT tm.team_id) as teams_member_of,
  COUNT(DISTINCT t_lead.id) as teams_leading,
  
  -- Last activity date
  GREATEST(
    up.last_login_at,
    MAX(t_assigned.updated_at),
    MAX(t_created.created_at),
    MAX(ea_received.awarded_at)
  ) as last_activity_at,
  
  NOW() as last_updated

FROM user_profiles up
LEFT JOIN tasks t_assigned ON t_assigned.assigned_to = up.id
LEFT JOIN tasks t_completed ON t_completed.assigned_to = up.id AND t_completed.status = 'completed'
LEFT JOIN tasks t_created ON t_created.assigned_by = up.id
LEFT JOIN employee_awards ea_received ON ea_received.employee_id = up.id
LEFT JOIN employee_awards ea_nominated ON ea_nominated.nominated_by = up.id
LEFT JOIN team_members tm ON tm.user_id = up.id
LEFT JOIN teams t_lead ON t_lead.team_lead_id = up.id
WHERE up.is_active = true
GROUP BY up.id, up.organization_id, up.first_name, up.last_name, up.last_login_at;

-- Department performance metrics
CREATE MATERIALIZED VIEW mv_department_metrics AS
SELECT 
  d.id as department_id,
  d.organization_id,
  d.name as department_name,
  
  -- Team and user counts
  COUNT(DISTINCT t.id) as teams_count,
  COUNT(DISTINCT up.id) as members_count,
  COUNT(DISTINCT up.id) FILTER (WHERE up.is_active = true) as active_members,
  
  -- Task metrics
  COUNT(DISTINCT tk.id) as total_tasks,
  COUNT(DISTINCT tk.id) FILTER (WHERE tk.status = 'completed') as completed_tasks,
  COUNT(DISTINCT tk.id) FILTER (WHERE tk.status = 'overdue') as overdue_tasks,
  ROUND(
    COUNT(DISTINCT tk.id) FILTER (WHERE tk.status = 'completed')::numeric / 
    NULLIF(COUNT(DISTINCT tk.id), 0) * 100, 2
  ) as completion_rate,
  
  -- Average task completion time
  AVG(
    EXTRACT(EPOCH FROM (tk.completed_at - tk.created_at)) / 3600
  ) FILTER (WHERE tk.status = 'completed') as avg_completion_hours,
  
  -- Award metrics
  COUNT(DISTINCT ea.id) as awards_received,
  
  NOW() as last_updated

FROM departments d
LEFT JOIN teams t ON t.department_id = d.id AND t.is_active = true
LEFT JOIN user_profiles up ON up.department_id = d.id
LEFT JOIN tasks tk ON tk.department_id = d.id
LEFT JOIN employee_awards ea ON ea.employee_id = up.id
WHERE d.is_active = true
GROUP BY d.id, d.organization_id, d.name;

-- Refresh materialized views daily
SELECT cron.schedule(
  'refresh-analytics-views',
  '0 5 * * *', -- Run at 5 AM daily
  $$
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_organization_stats;
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_user_activity;
  REFRESH MATERIALIZED VIEW CONCURRENTLY mv_department_metrics;
  $$
);