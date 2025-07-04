-- =====================================================
-- SCHEDULED MAINTENANCE JOBS
-- =====================================================

-- Daily cleanup of expired invitations
SELECT cron.schedule(
  'cleanup-expired-invitations',
  '0 2 * * *', -- Run at 2 AM daily
  $$
  UPDATE employee_invitations 
  SET status = 'expired' 
  WHERE status = 'sent' 
  AND expires_at < NOW();
  
  -- Log cleanup
  INSERT INTO audit_logs (organization_id, action, resource_type, new_values)
  SELECT DISTINCT organization_id, 'cleanup', 'invitation', 
         jsonb_build_object('expired_count', COUNT(*))
  FROM employee_invitations 
  WHERE status = 'expired' 
  AND updated_at::date = CURRENT_DATE
  GROUP BY organization_id;
  $$
);

-- Weekly subscription status check
SELECT cron.schedule(
  'check-subscription-status',
  '0 3 * * 1', -- Run at 3 AM every Monday
  $$
  -- Mark organizations as suspended if subscription expired
  UPDATE organizations 
  SET subscription_status = 'suspended'
  WHERE subscription_status = 'active'
  AND subscription_ends_at < NOW() - INTERVAL '7 days';
  
  -- Send webhook for suspended organizations
  SELECT net.http_post(
    url := 'https://your-app.com/api/webhooks/subscription-expired',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'organization_ids', array_agg(id)
    )
  )
  FROM organizations 
  WHERE subscription_status = 'suspended'
  AND updated_at::date = CURRENT_DATE;
  $$
);

-- Monthly award cleanup and recurring awards
SELECT cron.schedule(
  'monthly-awards-process',
  '0 1 1 * *', -- Run at 1 AM on the 1st of every month
  $$
  -- Create new recurring award opportunities
  INSERT INTO award_types (organization_id, name, description, is_recurring, recurrence_period, created_by)
  SELECT DISTINCT 
    o.id,
    'Employee of the Month - ' || TO_CHAR(CURRENT_DATE, 'FMMonth YYYY'),
    'Monthly recognition for ' || TO_CHAR(CURRENT_DATE, 'FMMonth YYYY'),
    true,
    'monthly',
    (SELECT id FROM user_profiles WHERE organization_id = o.id AND default_role_id IN (
      SELECT id FROM roles WHERE name = 'org_admin'
    ) LIMIT 1)
  FROM organizations o
  WHERE o.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM award_types at 
    WHERE at.organization_id = o.id 
    AND at.name LIKE 'Employee of the Month - ' || TO_CHAR(CURRENT_DATE, 'FMMonth YYYY')
  );
  $$
);

-- Daily task status updates
SELECT cron.schedule(
  'daily-task-maintenance',
  '0 6 * * *', -- Run at 6 AM daily
  $$
  -- Mark overdue tasks
  UPDATE tasks 
  SET status = 'overdue'
  WHERE status IN ('todo', 'in_progress')
  AND due_date < CURRENT_DATE
  AND due_date IS NOT NULL;
  
  -- Send overdue task notifications
  SELECT net.http_post(
    url := 'https://your-app.com/api/webhooks/overdue-tasks',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object(
      'tasks', json_agg(
        json_build_object(
          'id', id,
          'title', title,
          'assigned_to', assigned_to,
          'organization_id', organization_id,
          'due_date', due_date
        )
      )
    )
  )
  FROM tasks 
  WHERE status = 'overdue'
  AND updated_at::date = CURRENT_DATE;
  $$
);