import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Reserved subdomains that cannot be used
const RESERVED_SUBDOMAINS = [
  'www', 'api', 'app', 'admin', 'dashboard', 'mail', 'email', 'ftp', 'test',
  'dev', 'staging', 'production', 'support', 'help', 'docs', 'blog', 'cdn',
  'assets', 'static', 'media', 'images', 'files', 'downloads', 'uploads',
  'secure', 'ssl', 'vpn', 'proxy', 'gateway', 'load-balancer', 'lb',
  'database', 'db', 'cache', 'redis', 'mongo', 'mysql', 'postgres',
  'zentiri', 'zentiri-hr', 'hr', 'human-resources', 'payroll', 'benefits'
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subdomain = searchParams.get('subdomain')

    if (!subdomain) {
      return NextResponse.json(
        { success: false, error: 'Subdomain parameter required' },
        { status: 400 }
      )
    }

    // Validate subdomain format
    if (!isValidSubdomain(subdomain)) {
      return NextResponse.json({
        success: false,
        available: false,
        error: 'Invalid subdomain format. Use only lowercase letters, numbers, and hyphens.'
      })
    }

    // Check if subdomain is reserved
    if (RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())) {
      return NextResponse.json({
        success: false,
        available: false,
        error: 'This subdomain is reserved and cannot be used.'
      })
    }

    // Check if subdomain exists in database
    const { data: existingOrg, error } = await supabase
      .from('organizations')
      .select('id')
      .eq('subdomain', subdomain.toLowerCase())
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" which is what we want
      console.error('Database error checking subdomain:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to check subdomain availability' },
        { status: 500 }
      )
    }

    const available = !existingOrg

    return NextResponse.json({
      success: true,
      available,
      subdomain: subdomain.toLowerCase(),
      message: available 
        ? 'Subdomain is available!' 
        : 'This subdomain is already taken. Please choose another.'
    })

  } catch (error) {
    console.error('Subdomain check error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function isValidSubdomain(subdomain: string): boolean {
  // Subdomain validation rules:
  // - 3-20 characters long
  // - Only lowercase letters, numbers, and hyphens
  // - Cannot start or end with hyphen
  // - Cannot contain consecutive hyphens
  
  const pattern = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/
  
  return (
    subdomain.length >= 3 &&
    subdomain.length <= 20 &&
    pattern.test(subdomain) &&
    !subdomain.includes('--') // No consecutive hyphens
  )
} 