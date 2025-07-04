import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Pesapal API configuration
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET
const PESAPAL_SANDBOX_URL = 'https://cybqa.pesapal.com/pesapalv3/api'
const PESAPAL_PRODUCTION_URL = 'https://pay.pesapal.com/v3/api'
const PESAPAL_BASE_URL = process.env.NODE_ENV === 'production' ? PESAPAL_PRODUCTION_URL : PESAPAL_SANDBOX_URL

interface PaymentVerificationRequest {
  orderTrackingId: string
  merchantReference: string
}

export async function POST(request: NextRequest) {
  try {
    const { orderTrackingId, merchantReference }: PaymentVerificationRequest = await request.json()

    if (!orderTrackingId) {
      return NextResponse.json(
        { success: false, error: 'Order tracking ID is required' },
        { status: 400 }
      )
    }

    // Get Pesapal authentication token
    const authToken = await getPesapalAuthToken()
    if (!authToken) {
      return NextResponse.json(
        { success: false, error: 'Failed to authenticate with Pesapal' },
        { status: 500 }
      )
    }

    // Check payment status with Pesapal
    const pesapalResponse = await fetch(
      `${PESAPAL_BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )

    const pesapalResult = await pesapalResponse.json()

    if (pesapalResult.status !== '200') {
      return NextResponse.json(
        { success: false, error: 'Failed to verify payment status' },
        { status: 400 }
      )
    }

    const paymentStatus = pesapalResult.payment_status_description?.toLowerCase()
    const paymentCompleted = paymentStatus === 'completed' || paymentStatus === 'paid'

    if (!paymentCompleted) {
      return NextResponse.json({
        success: false,
        error: 'Payment not completed',
        status: paymentStatus,
        orderTrackingId
      })
    }

    // Payment is verified, update any pending organization creation
    // This would be used in conjunction with the organization creation flow
    return NextResponse.json({
      success: true,
      verified: true,
      orderTrackingId,
      merchantReference,
      paymentStatus,
      amount: pesapalResult.amount,
      currency: pesapalResult.currency,
      paymentMethod: pesapalResult.payment_method,
      message: 'Payment verified successfully'
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getPesapalAuthToken(): Promise<string | null> {
  try {
    if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
      throw new Error('Pesapal configuration missing')
    }

    const authRequest = {
      consumer_key: PESAPAL_CONSUMER_KEY,
      consumer_secret: PESAPAL_CONSUMER_SECRET
    }

    const response = await fetch(`${PESAPAL_BASE_URL}/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(authRequest)
    })

    const result = await response.json()
    
    if (result.status === '200' && result.token) {
      return result.token
    }
    
    throw new Error('Failed to get auth token')
  } catch (error) {
    console.error('Pesapal auth error:', error)
    return null
  }
} 