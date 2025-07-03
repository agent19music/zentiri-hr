import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

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
    price: number
  }
  paymentVerified?: boolean
  paymentId?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: OrganizationCreateRequest = await request.json()
    const { organization, plan, paymentVerified = false, paymentId } = data

    // Validate required data
    if (!organization.name || !organization.subdomain || !organization.adminEmail) {
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

    // Generate temporary password
    const temporaryPassword = generateTemporaryPassword()

    // Create organization in database
    const { data: newOrg, error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: organization.name,
        subdomain: organization.subdomain,
        industry: organization.industry,
        size: organization.size,
        departments: organization.departments,
        plan_id: plan.id,
        plan_name: plan.name,
        plan_price: plan.price,
        admin_email: organization.adminEmail,
        admin_name: organization.adminName,
        status: 'active',
        payment_id: paymentId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (orgError) {
      console.error('Organization creation error:', orgError)
      return NextResponse.json(
        { success: false, error: 'Failed to create organization' },
        { status: 500 }
      )
    }

    // Create admin user
    const { data: adminUser, error: userError } = await supabase
      .from('users')
      .insert({
        organization_id: newOrg.id,
        email: organization.adminEmail,
        name: organization.adminName,
        role: 'admin',
        temporary_password: temporaryPassword,
        is_verified: false,
        must_change_password: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (userError) {
      console.error('Admin user creation error:', userError)
      // Cleanup: delete the organization if user creation fails
      await supabase.from('organizations').delete().eq('id', newOrg.id)
      return NextResponse.json(
        { success: false, error: 'Failed to create admin user' },
        { status: 500 }
      )
    }

    // Set up subdomain DNS (this would integrate with your domain provider's API)
    // For Porkbun, you'd use their API to create a CNAME record
    const subdomainSetup = await setupSubdomain(organization.subdomain)
    if (!subdomainSetup.success) {
      console.error('Subdomain setup failed:', subdomainSetup.error)
      // Note: You might want to queue this for retry rather than failing the whole process
    }

    // Send welcome email with credentials
    const emailSent = await sendWelcomeEmail({
      name: organization.adminName,
      email: organization.adminEmail,
      organizationName: organization.name,
      subdomain: organization.subdomain,
      temporaryPassword,
      planName: plan.name
    })

    if (!emailSent.success) {
      console.error('Email sending failed:', emailSent.error)
      // Don't fail the whole process for email errors, just log them
    }

    // Return success response
    const dashboardUrl = `https://${organization.subdomain}.zentiri.app/dashboard`
    
    return NextResponse.json({
      success: true,
      organization: {
        id: newOrg.id,
        name: organization.name,
        subdomain: organization.subdomain,
        adminEmail: organization.adminEmail,
        plan: plan.name
      },
      credentials: {
        email: organization.adminEmail,
        temporaryPassword
      },
      dashboardUrl,
      subdomainActive: subdomainSetup.success,
      emailSent: emailSent.success
    })

  } catch (error) {
    console.error('Organization creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateTemporaryPassword(): string {
  // Generate a secure temporary password
  const length = 12
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  
  return password
}

async function setupSubdomain(subdomain: string): Promise<{ success: boolean; error?: string }> {
  try {
    // This would integrate with Porkbun API or your DNS provider
    // For demo purposes, we'll simulate successful subdomain creation
    
    // Example Porkbun API integration:
    /*
    const porkbunApiKey = process.env.PORKBUN_API_KEY
    const porkbunSecret = process.env.PORKBUN_SECRET_KEY
    const domain = 'zentiri.app'
    
    const response = await fetch(`https://porkbun.com/api/json/v3/dns/create/${domain}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey: porkbunApiKey,
        secretapikey: porkbunSecret,
        name: subdomain,
        type: 'CNAME',
        content: 'your-vercel-app.vercel.app',
        ttl: '600'
      })
    })
    
    const result = await response.json()
    return { success: result.status === 'SUCCESS' }
    */
    
    // For now, simulate success
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    return { success: true }
    
  } catch (error) {
    console.error('Subdomain setup error:', error)
    return { success: false, error: 'Failed to setup subdomain' }
  }
}

async function sendWelcomeEmail(params: {
  name: string
  email: string
  organizationName: string
  subdomain: string
  temporaryPassword: string
  planName: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // This would integrate with your email service (SendGrid, Resend, etc.)
    // For demo purposes, we'll simulate successful email sending
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Zentiri HR</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Welcome to Zentiri HR!</h1>
          
          <p>Hi ${params.name},</p>
          
          <p>Congratulations! Your organization <strong>${params.organizationName}</strong> has been successfully set up on Zentiri HR.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Account Details:</h3>
            <p><strong>Organization:</strong> ${params.organizationName}</p>
            <p><strong>Plan:</strong> ${params.planName}</p>
            <p><strong>Dashboard URL:</strong> <a href="https://${params.subdomain}.zentiri.app">https://${params.subdomain}.zentiri.app</a></p>
            <p><strong>Email:</strong> ${params.email}</p>
            <p><strong>Temporary Password:</strong> <code style="background: #e5e7eb; padding: 2px 4px; border-radius: 3px;">${params.temporaryPassword}</code></p>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>⚠️ Important Security Notice:</strong></p>
            <p>Please log in and change your password immediately for security reasons.</p>
          </div>
          
          <h3>Next Steps:</h3>
          <ol>
            <li>Visit your dashboard at <a href="https://${params.subdomain}.zentiri.app">https://${params.subdomain}.zentiri.app</a></li>
            <li>Log in using the credentials above</li>
            <li>Change your password</li>
            <li>Complete your organization setup</li>
            <li>Start adding your team members</li>
          </ol>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Welcome aboard!</p>
          <p>The Zentiri HR Team</p>
        </div>
      </body>
      </html>
    `
    
    // Example SendGrid integration:
    /*
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${EMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: params.email, name: params.name }],
          subject: `Welcome to Zentiri HR - Your ${params.organizationName} Account is Ready!`
        }],
        from: { email: EMAIL_FROM, name: 'Zentiri HR' },
        content: [{
          type: 'text/html',
          value: emailContent
        }]
      })
    })
    
    return { success: response.ok }
    */
    
    // For now, simulate success
    console.log('Would send email to:', params.email)
    return { success: true }
    
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: 'Failed to send email' }
  }
} 