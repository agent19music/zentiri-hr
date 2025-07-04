import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Email service configuration (you can use SendGrid, Resend, or any email service)
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@zentiri.app'
const EMAIL_API_KEY = process.env.EMAIL_API_KEY

interface OrganizationCreateRequest {
  organization: {
    name: string
    industry: string
    size: string
    departments: string
    subdomain: string
    adminEmail: string
    adminName: string
  }
  plan: {
    id: string
    name: string
    employeeCount: number
    monthlyPrice: number
    annualAmount: number
  }
  paymentVerified?: boolean
  paymentReference?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: OrganizationCreateRequest = await request.json()
    const { organization, plan, paymentVerified = false, paymentReference } = data

    // Validate required data
    if (!organization.name || !organization.subdomain || !organization.adminEmail || !organization.adminName) {
      return NextResponse.json(
        { success: false, error: 'Missing required organization data' },
        { status: 400 }
      )
    }

    // For paid plans, ensure payment is verified
    if (plan.id !== 'free' && !paymentVerified) {
      return NextResponse.json(
        { success: false, error: 'Payment verification required for paid plans' },
        { status: 400 }
      )
    }

    // Check if subdomain is available
    const { data: existingOrg } = await supabase
      .from('organizations')
      .select('id')
      .eq('subdomain', organization.subdomain)
      .single()

    if (existingOrg) {
      return NextResponse.json(
        { success: false, error: 'Subdomain already exists' },
        { status: 409 }
      )
    }

    // Get the subscription plan ID from the database
    const { data: subscriptionPlan, error: planError } = await supabase
      .from('subscription_plans')
      .select('id')
      .eq('name', plan.id)
      .single()

    if (planError || !subscriptionPlan) {
      return NextResponse.json(
        { success: false, error: 'Invalid subscription plan' },
        { status: 400 }
      )
    }

    // Split admin name into first and last name
    const nameParts = organization.adminName.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Use the database function to create organization after payment
    const { data: result, error: createError } = await supabase
      .rpc('create_organization_after_payment', {
        p_name: organization.name,
        p_subdomain: organization.subdomain,
        p_industry: organization.industry,
        p_company_size: organization.size,
        p_admin_email: organization.adminEmail,
        p_admin_first_name: firstName,
        p_admin_last_name: lastName,
        p_subscription_plan_id: subscriptionPlan.id,
        p_payment_reference: paymentReference || `free_trial_${Date.now()}`
      })

    if (createError) {
      console.error('Organization creation error:', createError)
      return NextResponse.json(
        { success: false, error: 'Failed to create organization' },
        { status: 500 }
      )
    }

    if (!result?.success) {
      return NextResponse.json(
        { success: false, error: result?.error || 'Failed to create organization' },
        { status: 500 }
      )
    }

    // Return success response
    const dashboardUrl = `https://${organization.subdomain}.zentiri.app/employer/dashboard`
    
    return NextResponse.json({
      success: true,
      organization: {
        id: result.organization_id,
        name: organization.name,
        subdomain: organization.subdomain,
        adminEmail: organization.adminEmail,
        plan: plan.name
      },
      admin_user_id: result.admin_user_id,
      trial_ends_at: result.trial_ends_at,
      dashboardUrl,
      message: plan.id === 'free' 
        ? 'Organization created successfully! You can start your free trial.' 
        : 'Organization created and payment confirmed!'
    })

  } catch (error) {
    console.error('Organization creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 