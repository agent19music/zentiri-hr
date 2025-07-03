import { NextRequest, NextResponse } from 'next/server'

// Pesapal API configuration
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET
const PESAPAL_SANDBOX_URL = 'https://cybqa.pesapal.com/pesapalv3/api'
const PESAPAL_PRODUCTION_URL = 'https://pay.pesapal.com/v3/api'
const PESAPAL_BASE_URL = process.env.NODE_ENV === 'production' ? PESAPAL_PRODUCTION_URL : PESAPAL_SANDBOX_URL

interface PaymentRequest {
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

export async function POST(request: NextRequest) {
  try {
    const paymentData: PaymentRequest = await request.json()

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

    // Create payment request
    const pesapalRequest = {
      id: paymentData.notification_id,
      currency: paymentData.currency,
      amount: paymentData.amount,
      description: paymentData.description,
      callback_url: paymentData.callback_url,
      notification_id: paymentData.notification_id,
      billing_address: {
        email_address: paymentData.organization.adminEmail,
        phone_number: null,
        country_code: "US",
        first_name: paymentData.organization.adminName,
        middle_name: "",
        last_name: "",
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        postal_code: "",
        zip_code: ""
      }
    }

    const pesapalResponse = await fetch(`${PESAPAL_BASE_URL}/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(pesapalRequest)
    })

    const pesapalResult = await pesapalResponse.json()

    if (pesapalResult.status === '200' && pesapalResult.redirect_url) {
      // Store payment information in your database here
      // For now, we'll just return the payment URL
      
      return NextResponse.json({
        success: true,
        payment_url: pesapalResult.redirect_url,
        order_tracking_id: pesapalResult.order_tracking_id,
        merchant_reference: pesapalResult.merchant_reference
      })
    } else {
      throw new Error(pesapalResult.message || 'Failed to create payment')
    }

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create payment request' },
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