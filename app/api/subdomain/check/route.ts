import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration - use anon key for read operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase configuration')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subdomain = searchParams.get('subdomain')

    if (!subdomain) {
      return NextResponse.json(
        { success: false, error: 'Subdomain parameter is required' },
        { status: 400 }
      )
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/
    if (subdomain.length < 3 || subdomain.length > 20 || !subdomainRegex.test(subdomain)) {
      return NextResponse.json({
        success: true,
        available: false,
        error: 'Subdomain must be 3-20 characters long and contain only lowercase letters, numbers, and hyphens'
      })
    }

    // Check reserved subdomains
    const reservedSubdomains = [
      'www', 'api', 'app', 'admin', 'mail', 'ftp', 'blog', 'help', 'support',
      'docs', 'status', 'cdn', 'assets', 'static', 'staging', 'dev', 'test',
      'zentiri', 'hr', 'dashboard', 'login', 'signup', 'auth'
    ]

    if (reservedSubdomains.includes(subdomain.toLowerCase())) {
      return NextResponse.json({
        success: true,
        available: false,
        error: 'This subdomain is reserved and cannot be used'
      })
    }

    // Check if subdomain exists in database
    const { data: existingOrg, error } = await supabase
      .from('organizations')
      .select('id')
      .eq('subdomain', subdomain.toLowerCase())
      .maybeSingle()

    if (error) {
      console.error('Database error checking subdomain:', error)
      // For demo purposes, if table doesn't exist, assume subdomain is available
      if (error.code === '42P01') { // Table does not exist
        return NextResponse.json({
          success: true,
          available: true,
          subdomain: subdomain.toLowerCase(),
          note: 'Database not yet configured - subdomain appears available'
        })
      }
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
      ...(available ? {} : { error: 'This subdomain is already taken' })
    })

  } catch (error) {
    console.error('Subdomain check error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 