import { NextRequest, NextResponse } from 'next/server'

// Pesapal API configuration
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET
const PESAPAL_SANDBOX_URL = 'https://cybqa.pesapal.com/pesapalv3/api'
const PESAPAL_PRODUCTION_URL = 'https://pay.pesapal.com/v3/api'
const PESAPAL_BASE_URL = process.env.NODE_ENV === 'production' ? PESAPAL_PRODUCTION_URL : PESAPAL_SANDBOX_URL

interface PaymentVerificationRequest {
  paymentId: string
  paymentData: {
    amount: number
    currency: string
    description: string
    organization: {
      name: string
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
    callback_url: string
    notification_id: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const { paymentId, paymentData }: PaymentVerificationRequest = await request.json()

    // Validate required environment variables
    if (!PESAPAL_CONSUMER_KEY || !PESAPAL_CONSUMER_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Pesapal configuration missing' },
        { status: 500 }
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

    // Verify payment status with Pesapal
    const statusResponse = await fetch(
      `${PESAPAL_BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${paymentId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )

    const statusResult = await statusResponse.json()

    if (statusResult.status_code === 1 && statusResult.payment_status_description === 'Completed') {
      // Payment is successful
      return NextResponse.json({
        success: true,
        verified: true,
        organization: paymentData.organization,
        plan: paymentData.plan,
        paymentDetails: {
          amount: statusResult.amount,
          currency: statusResult.currency,
          paymentMethod: statusResult.payment_method,
          transactionId: statusResult.confirmation_code
        }
      })
    } else if (statusResult.status_code === 0) {
      // Payment is pending
      return NextResponse.json({
        success: false,
        error: 'Payment is still pending. Please wait and try again.',
        pending: true
      })
    } else {
      // Payment failed
      return NextResponse.json({
        success: false,
        error: `Payment failed: ${statusResult.payment_status_description}`,
        failed: true
      })
    }

  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}

async function getPesapalAuthToken(): Promise<string | null> {
  try {
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