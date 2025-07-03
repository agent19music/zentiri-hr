# Zentiri HR Onboarding System Setup Guide

This guide will help you set up the complete onboarding flow for Zentiri HR, including organization creation, payment processing, and subdomain generation.

## Overview

The onboarding system consists of:
1. **Organization Details Form** - Collects company information and subdomain
2. **Pricing Plans Page** - Shows plans and handles payment via Pesapal
3. **Success Page** - Displays credentials and next steps
4. **Backend APIs** - Handles payment, subdomain creation, and organization setup

## Required Services

### 1. Supabase (Database & Authentication)

Create a Supabase project and set up the following tables:

#### Organizations Table
```sql
CREATE TABLE organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  industry TEXT,
  size TEXT,
  departments TEXT,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_price DECIMAL(10,2) DEFAULT 0,
  admin_email TEXT NOT NULL,
  admin_name TEXT,
  status TEXT DEFAULT 'active',
  payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'employee',
  temporary_password TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  must_change_password BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Pesapal (Payment Processing)

1. Sign up at [Pesapal](https://www.pesapal.com/)
2. Get your Consumer Key and Consumer Secret
3. Set up your IPN (Instant Payment Notification) URL: `https://yourdomain.com/api/payment/webhook`

### 3. Porkbun (Domain Management)

1. Purchase your domain (e.g., zentiri.app) from [Porkbun](https://porkbun.com/)
2. Get your API credentials from the account dashboard
3. The system will automatically create CNAME records for new subdomains

### 4. Email Service (SendGrid, Resend, etc.)

Choose an email service for sending welcome emails:
- **SendGrid**: Sign up and get API key
- **Resend**: Modern email API with good deliverability
- **Amazon SES**: Cost-effective for high volume

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Pesapal Payment Configuration
PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key
PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret

# Domain Configuration (Porkbun)
PORKBUN_API_KEY=your_porkbun_api_key
PORKBUN_SECRET_KEY=your_porkbun_secret_key

# Email Configuration
EMAIL_FROM=noreply@zentiri.app
EMAIL_API_KEY=your_email_service_api_key

# Application Configuration
NODE_ENV=development
```

## Vercel Deployment Configuration

### 1. Environment Variables
Add all the above environment variables to your Vercel project settings.

### 2. Domain Configuration
1. Add your main domain (e.g., zentiri.app) to Vercel
2. Configure wildcard subdomain support by adding `*.zentiri.app` as a domain
3. Set up DNS records at Porkbun:
   - A record: `@` pointing to Vercel's IP
   - CNAME record: `*` pointing to your Vercel app URL

### 3. Vercel Configuration
Create/update `vercel.json`:

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/proxy?path=$1",
      "has": [
        {
          "type": "host",
          "value": "(?<subdomain>.*)\\.zentiri\\.app"
        }
      ]
    }
  ]
}
```

## Implementation Details

### Subdomain Routing
The system creates subdomains dynamically. You'll need to handle subdomain routing in your application. Consider:

1. **Middleware Approach**: Use Next.js middleware to detect subdomains
2. **API Proxy**: Route subdomain requests to organization-specific views
3. **Database Lookup**: Match subdomains to organizations in your database

### Payment Flow
1. User selects plan on pricing page
2. System calculates total based on estimated employees
3. Pesapal payment is initiated
4. User completes payment on Pesapal
5. Payment callback verifies transaction
6. Organization and admin user are created
7. Welcome email is sent with credentials

### Security Considerations
1. Always validate payment status with Pesapal before creating organizations
2. Use strong temporary passwords and require immediate password change
3. Implement rate limiting on subdomain checking
4. Validate all input data on both client and server side
5. Use HTTPS for all communication

## Testing

### Local Development
1. Use Pesapal sandbox environment
2. Set up ngrok for testing payment callbacks
3. Use test email addresses

### Production Checklist
- [ ] Supabase tables created with proper indexes
- [ ] Pesapal production credentials configured
- [ ] Domain DNS properly configured
- [ ] Email service configured and tested
- [ ] Environment variables set in Vercel
- [ ] Subdomain routing tested
- [ ] Payment flow end-to-end tested
- [ ] Error handling and logging implemented

## API Endpoints

The onboarding system includes these API endpoints:

- `GET /api/subdomain/check` - Check subdomain availability
- `POST /api/payment/create` - Create Pesapal payment
- `POST /api/payment/verify` - Verify payment status
- `POST /api/organization/create` - Create organization and admin user

## Customization

### Pricing Plans
Modify the plans array in `app/onboarding/plans/page.tsx` to adjust:
- Plan features
- Pricing tiers
- Employee limits
- Feature descriptions

### Email Templates
Customize the welcome email template in `app/api/organization/create/route.ts` in the `sendWelcomeEmail` function.

### Form Fields
Add or modify organization form fields in `app/onboarding/organization/page.tsx` and update the corresponding schema.

## Support

For issues with the onboarding system:
1. Check Vercel function logs
2. Monitor Supabase logs
3. Verify Pesapal webhook delivery
4. Test email delivery

## Next Steps

After completing the onboarding setup:
1. Implement subdomain-based authentication
2. Create organization dashboard
3. Build user invitation system
4. Add billing management
5. Implement organization settings 