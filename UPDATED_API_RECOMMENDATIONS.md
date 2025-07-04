# Updated API Recommendations for Zentiri HR (Kenya-Focused)

Based on your server analysis, here are updated integrations aligned with your Kenyan market focus and existing database schema.

## 🎯 **Priority 1: Essential Kenyan Services**

### 1. **Pesapal Payment Gateway** (HIGHLY RECOMMENDED)
**Purpose**: Local payment processing for subscriptions
**Kenya Focus**: ✅ Supports M-Pesa, Airtel Money, local banks
**Free Plan**: Sandbox environment + competitive rates

#### Setup Process:
1. **Register**: https://www.pesapal.com/merchant/
2. **Get Credentials**: Merchant account → API credentials
3. **Sandbox Testing**: Full feature testing environment
4. **Go Live**: Simple process with documentation verification

#### Environment Variables:
```bash
# Pesapal Configuration
PESAPAL_CONSUMER_KEY=your_consumer_key
PESAPAL_CONSUMER_SECRET=your_consumer_secret
PESAPAL_MERCHANT_ID=your_merchant_id
PESAPAL_ENVIRONMENT=sandbox # or production
PESAPAL_CALLBACK_URL=https://your-domain.com/api/payment/pesapal/callback
PESAPAL_NOTIFICATION_URL=https://your-domain.com/api/payment/pesapal/ipn
```

---

### 2. **Safaricom Daraja API** (M-Pesa STK Push)
**Purpose**: Direct M-Pesa payments for small businesses
**Kenya Focus**: ✅ Most popular payment method
**Free Plan**: Sandbox + pay-per-transaction

#### Setup:
1. **Register**: https://developer.safaricom.co.ke/
2. **Create App**: M-Pesa sandbox app
3. **Get Credentials**: Consumer key/secret + passkey

#### Environment Variables:
```bash
# M-Pesa Daraja API
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379 # Sandbox shortcode
MPESA_PASSKEY=your_passkey
MPESA_ENVIRONMENT=sandbox
MPESA_CALLBACK_URL=https://your-domain.com/api/payment/mpesa/callback
```

---

### 3. **Africa's Talking SMS API**
**Purpose**: SMS notifications for employees without smartphones
**Kenya Focus**: ✅ Local provider with excellent coverage
**Free Plan**: $0.01 per SMS (very affordable)

#### Environment Variables:
```bash
# Africa's Talking
AT_API_KEY=your_api_key
AT_USERNAME=your_username
AT_SMS_FROM=your_sender_name
```

---

### 4. **Supabase** (Already Configured ✅)
**Purpose**: Core database and authentication
**Your Setup**: Multi-tenant with proper RLS
```bash
NEXT_PUBLIC_SUPABASE_URL=https://iimbpwjkjxdzkcntgqhh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiI... (Added)
```

---

## 🌍 **Priority 2: Global Services (Free Tiers)**

### 5. **Resend Email API**
**Purpose**: Transactional emails and notifications
**Free Plan**: 3,000 emails/month
**Setup Time**: 15 minutes

```bash
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=notifications@yourdomain.com
```

### 6. **Google Calendar API**
**Purpose**: Leave management and scheduling
**Free Plan**: 1 billion requests/day

```bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id
```

### 7. **Slack API**
**Purpose**: Team communication integration
**Free Plan**: 10,000 messages, unlimited apps

```bash
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## 📊 **Priority 3: Enhanced Features**

### 8. **Cloudinary** (Image Management)
**Purpose**: Employee photos, document storage
**Free Plan**: 25GB storage, 25GB bandwidth

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 9. **GitHub API** (For Tech Companies)
**Purpose**: Developer team integration
**Free Plan**: 5,000 requests/hour

```bash
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_ORG=your-organization-name
```

### 10. **OpenAI API** (AI Features)
**Purpose**: Smart HR insights and automation
**Pricing**: Pay-per-use (start with $5 credit)

```bash
OPENAI_API_KEY=sk-your-api-key
```

---

## 🔧 **Server Updates Needed**

### 1. **Payment Processing Tables**
You'll need additional tables for payment processing:

```sql
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
  pesapal_payment_method TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),
  
  -- Metadata
  payment_data JSONB DEFAULT '{}', -- Store provider-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Payment methods for organizations
CREATE TABLE organization_payment_methods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  type TEXT NOT NULL CHECK (type IN ('mpesa', 'card', 'bank_account')),
  provider TEXT NOT NULL, -- 'pesapal', 'safaricom', 'stripe'
  
  -- Encrypted payment details
  details JSONB NOT NULL, -- Store encrypted payment method details
  
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. **Enhanced Payroll System**
```sql
-- Employee records (separate from user_profiles for payroll)
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_profile_id UUID REFERENCES user_profiles(id),
  
  -- Employment details
  employee_number TEXT NOT NULL,
  national_id TEXT, -- Kenyan National ID
  kra_pin TEXT, -- Kenya Revenue Authority PIN
  nssf_number TEXT, -- National Social Security Fund
  nhif_number TEXT, -- National Hospital Insurance Fund
  
  -- Salary structure
  basic_salary DECIMAL(15,2) NOT NULL,
  housing_allowance DECIMAL(15,2) DEFAULT 0,
  transport_allowance DECIMAL(15,2) DEFAULT 0,
  other_allowances JSONB DEFAULT '{}',
  
  -- Deductions
  tax_rate DECIMAL(5,4) DEFAULT 0.30, -- 30% tax rate
  nssf_contribution DECIMAL(15,2) DEFAULT 0,
  nhif_contribution DECIMAL(15,2) DEFAULT 0,
  
  -- Bank details
  bank_name TEXT,
  account_number TEXT,
  branch_code TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(organization_id, employee_number),
  UNIQUE(organization_id, national_id)
);

-- Payroll runs
CREATE TABLE payroll_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  pay_date DATE NOT NULL,
  
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'calculated', 'approved', 'paid', 'cancelled')),
  
  total_gross DECIMAL(15,2) DEFAULT 0,
  total_deductions DECIMAL(15,2) DEFAULT 0,
  total_net DECIMAL(15,2) DEFAULT 0,
  
  created_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual payslips
CREATE TABLE payslips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  payroll_run_id UUID REFERENCES payroll_runs(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  
  -- Earnings
  basic_pay DECIMAL(15,2) NOT NULL,
  allowances JSONB DEFAULT '{}',
  overtime DECIMAL(15,2) DEFAULT 0,
  gross_pay DECIMAL(15,2) NOT NULL,
  
  -- Deductions
  tax DECIMAL(15,2) DEFAULT 0,
  nssf DECIMAL(15,2) DEFAULT 0,
  nhif DECIMAL(15,2) DEFAULT 0,
  other_deductions JSONB DEFAULT '{}',
  total_deductions DECIMAL(15,2) DEFAULT 0,
  
  -- Net pay
  net_pay DECIMAL(15,2) NOT NULL,
  
  -- Status
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  payment_reference TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. **Leave Management Tables**
```sql
-- Leave types
CREATE TABLE leave_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  description TEXT,
  days_per_year INTEGER NOT NULL,
  max_consecutive_days INTEGER,
  requires_approval BOOLEAN DEFAULT true,
  is_paid BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, name)
);

-- Leave applications
CREATE TABLE leave_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  leave_type_id UUID REFERENCES leave_types(id),
  
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  
  approved_by UUID REFERENCES user_profiles(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 💳 **Pesapal Integration Deep Dive**

### **Why Pesapal is Perfect for Your Use Case:**

1. **Local Market Leader**: Dominates Kenyan payment processing
2. **Multi-Payment Support**: M-Pesa, Airtel Money, Visa, Mastercard, bank transfers
3. **Subscription Billing**: Built-in recurring payment support
4. **Developer Friendly**: Excellent API documentation
5. **Compliance**: Fully compliant with Kenyan regulations

### **Implementation Strategy:**

#### **1. Registration & Setup (30 minutes)**
```bash
# Visit https://www.pesapal.com/merchant/
# Required Documents (Kenya):
- Certificate of Incorporation
- KRA Tax Compliance Certificate  
- Bank Statement (last 3 months)
- National ID of directors
```

#### **2. API Integration (2-3 hours)**
```typescript
// lib/pesapal.ts
export class PesapalService {
  private consumerKey: string
  private consumerSecret: string
  private merchantId: string
  private baseUrl: string

  constructor() {
    this.consumerKey = process.env.PESAPAL_CONSUMER_KEY!
    this.consumerSecret = process.env.PESAPAL_CONSUMER_SECRET!
    this.merchantId = process.env.PESAPAL_MERCHANT_ID!
    this.baseUrl = process.env.PESAPAL_ENVIRONMENT === 'production' 
      ? 'https://pay.pesapal.com/v3' 
      : 'https://cybqa.pesapal.com/pesapalv3'
  }

  async initiatePayment(params: {
    amount: number
    currency: string
    description: string
    callbackUrl: string
    organizationId: string
    subscriptionId: string
  }) {
    // Implementation details...
  }

  async verifyPayment(orderTrackingId: string) {
    // Implementation details...
  }
}
```

#### **3. Database Integration**
Your existing `organization_subscriptions` table works perfectly with Pesapal:

```sql
-- Add Pesapal-specific columns
ALTER TABLE organization_subscriptions ADD COLUMN pesapal_merchant_reference TEXT;
ALTER TABLE organization_subscriptions ADD COLUMN pesapal_order_tracking_id TEXT;
ALTER TABLE organization_subscriptions ADD COLUMN next_payment_date DATE;
```

#### **4. Webhook Handling**
```typescript
// app/api/payment/pesapal/ipn/route.ts
export async function POST(request: Request) {
  const { OrderTrackingId, OrderMerchantReference } = await request.json()
  
  // Verify payment with Pesapal
  const verification = await pesapal.verifyPayment(OrderTrackingId)
  
  if (verification.payment_status_description === 'Completed') {
    // Update subscription status
    await supabase
      .from('organization_subscriptions')
      .update({ 
        status: 'active',
        payment_status: 'paid',
        paid_at: new Date().toISOString()
      })
      .eq('pesapal_order_tracking_id', OrderTrackingId)
  }
  
  return Response.json({ status: 'success' })
}
```

### **Cost Analysis:**
- **Setup**: Free
- **Transaction Fees**: 
  - M-Pesa: 2.9% + KES 10
  - Cards: 3.8% + KES 10
  - Bank Transfer: 2.5% + KES 20
- **Monthly Fee**: KES 500 for premium features

### **Testing Strategy:**
1. **Sandbox Testing**: Use test M-Pesa numbers
2. **UAT Environment**: Test with real (small) transactions
3. **Load Testing**: Ensure webhook handling scales
4. **Failover Testing**: Handle payment failures gracefully

---

## 🚀 **Implementation Roadmap**

### **Week 1: Core Payment Setup**
1. ✅ Fix subdomain check (Done)
2. 📧 Setup Resend for emails (15 min)
3. 💳 Register with Pesapal (30 min)
4. 🔧 Add payment tables (1 hour)

### **Week 2: Payment Integration**
1. 🔗 Implement Pesapal API (4 hours)
2. 📱 Add M-Pesa option (2 hours)
3. 🧪 Test payment flows (2 hours)
4. 📨 Setup payment notifications (1 hour)

### **Week 3: Enhanced Features**
1. 📅 Add Google Calendar for leave (3 hours)
2. 💬 Setup Slack notifications (1 hour)
3. 📊 Add basic analytics (2 hours)
4. 🎨 Setup Cloudinary for images (1 hour)

### **Week 4: Launch Preparation**
1. 🧪 End-to-end testing
2. 📚 Documentation
3. 🚀 Production deployment
4. 📈 Monitor and iterate

---

## 🎯 **Immediate Next Steps**

1. **Register with Pesapal** (today)
2. **Setup Resend for emails** (15 minutes)
3. **Add payment tables to your schema** (30 minutes)
4. **Test the fixed subdomain check**

This setup will give you a robust, Kenya-focused HR system with local payment processing and global integrations where needed! 