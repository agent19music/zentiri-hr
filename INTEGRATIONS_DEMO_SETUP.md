# Free Integrations Setup for Demo

This guide provides free options for setting up integrations with Zentiri HR for demo purposes.

## 🎯 Quick Start - Essential Free Integrations

### 1. Slack Integration (Free)
**Purpose**: Communication and notifications
**Free Plan**: Up to 10,000 messages, unlimited apps

#### Setup:
1. Create a Slack workspace at https://slack.com/create
2. Go to https://api.slack.com/apps
3. Click "Create New App" → "From scratch"
4. App Name: "Zentiri HR", select your workspace
5. Go to "OAuth & Permissions" → Add scopes:
   - `chat:write`
   - `users:read`
   - `users:read.email`
6. Install app to workspace
7. Copy Bot User OAuth Token

#### Environment Variables:
```bash
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

### 2. Supabase (Database) - Already Configured ✅
**Purpose**: Core database for HR data
**Free Plan**: Up to 500MB database, 50,000 monthly active users

Your current setup:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://iimbpwjkjxdzkcntgqhh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiI... (Added)
```

---

### 3. Resend Email API (Free)
**Purpose**: Transactional emails (notifications, reports)
**Free Plan**: 3,000 emails/month

#### Setup:
1. Sign up at https://resend.com
2. Verify your domain or use their subdomain for testing
3. Create an API key in dashboard
4. Test with `onboarding@resend.dev` domain

#### Environment Variables:
```bash
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=onboarding@resend.dev
```

---

### 4. Stripe (Payment Processing) - Test Mode
**Purpose**: Subscription and payment processing
**Free Plan**: Unlimited test transactions

#### Setup:
1. Create account at https://stripe.com
2. Go to Dashboard → Developers → API Keys
3. Use test keys (start with `pk_test_` and `sk_test_`)
4. Create products in test mode

#### Environment Variables:
```bash
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

---

### 5. Google Calendar API (Free)
**Purpose**: Leave management and scheduling
**Free Plan**: 1 billion requests/day

#### Setup:
1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Enable Google Calendar API
4. Create credentials (Service Account)
5. Download JSON key file

#### Environment Variables:
```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id
```

---

### 6. GitHub API (Free)
**Purpose**: Development team integration
**Free Plan**: 5,000 requests/hour

#### Setup:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `user:read`, `user:email`

#### Environment Variables:
```bash
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_ORG=your-organization-name
```

---

## 📊 Demo-Only Integrations (Mock Data)

For features that require paid services, you can use mock data:

### 7. Mock Payroll Service
```typescript
// utils/mockPayroll.ts
export const mockPayrollData = {
  employees: [
    { id: 1, name: "John Doe", salary: 75000, status: "paid" },
    { id: 2, name: "Jane Smith", salary: 85000, status: "pending" }
  ]
}
```

### 8. Mock Performance Analytics
```typescript
// utils/mockAnalytics.ts
export const mockPerformanceData = {
  teamProductivity: 85,
  employeeSatisfaction: 4.2,
  retentionRate: 92
}
```

---

## 🔧 Environment Variables Summary

Create/update your `.env.local` file:

```bash
# Database (Already configured)
NEXT_PUBLIC_SUPABASE_URL=https://iimbpwjkjxdzkcntgqhh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiI...

# Email
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=onboarding@resend.dev

# Payments (Test Mode)
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Communication
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Calendar
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id

# Development
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_ORG=your-organization-name

# App Configuration
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚀 Implementation Priority

### Phase 1 (Essential - Start Here)
1. ✅ Supabase (Database) - Already done
2. Resend (Email) - 15 minutes setup
3. Stripe Test Mode (Payments) - 20 minutes setup

### Phase 2 (Enhanced Features)
4. Slack (Notifications) - 10 minutes setup
5. Google Calendar (Scheduling) - 30 minutes setup

### Phase 3 (Advanced Features)
6. GitHub (Team Integration) - 5 minutes setup
7. Mock services for remaining features

---

## 🔍 Testing Your Integrations

### Test Slack Integration:
```bash
curl -X POST -H 'Content-type: application/json' \
--data '{"text":"Hello from Zentiri HR!"}' \
YOUR_SLACK_WEBHOOK_URL
```

### Test Resend Email:
```bash
curl -X POST 'https://api.resend.com/emails' \
-H 'Authorization: Bearer YOUR_RESEND_API_KEY' \
-H 'Content-Type: application/json' \
-d '{"from": "onboarding@resend.dev", "to": ["your-email@example.com"], "subject": "Test", "html": "<p>Test email</p>"}'
```

### Test Stripe (Test Mode):
```bash
curl https://api.stripe.com/v1/customers \
-u sk_test_YOUR_SECRET_KEY: \
-d email="test@example.com"
```

---

## 📖 Next Steps

1. **Start with Resend**: Easy email setup for notifications
2. **Add Stripe Test Mode**: Enable payment flow testing  
3. **Set up Slack**: Real-time notifications
4. **Implement Calendar**: Leave management features
5. **Add GitHub**: Development team features

All these services have generous free tiers perfect for demo purposes!

---

## 🆘 Need Help?

- **Slack API Docs**: https://api.slack.com/
- **Resend Docs**: https://resend.com/docs
- **Stripe Test Mode**: https://stripe.com/docs/testing
- **Google Calendar API**: https://developers.google.com/calendar
- **Supabase Docs**: https://supabase.com/docs 