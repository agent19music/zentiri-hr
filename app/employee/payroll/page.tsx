﻿"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { 
  DollarSign,
  Download,
  Calendar,
  TrendingUp,
  PieChart,
  Eye,
  FileText,
  CreditCard,
  Banknote,
  Receipt,
  FileDown,
  Globe,
  Building2
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currentPayPeriod = {
  period: "December 16-31, 2024",
  payDate: "December 31, 2024",
  status: "Processed",
  grossPay: 4250.00,
  netPay: 3187.50,
  hoursWorked: 80,
  overtimeHours: 0
}

const payStubs = [
  {
    id: 1,
    period: "December 16-31, 2024",
    payDate: "Dec 31, 2024",
    gross: 4250.00,
    net: 3187.50,
    status: "Available",
    ytdGross: 102000.00,
    ytdNet: 76500.00
  },
  {
    id: 2,
    period: "December 1-15, 2024",
    payDate: "Dec 15, 2024",
    gross: 4250.00,
    net: 3187.50,
    status: "Downloaded",
    ytdGross: 97750.00,
    ytdNet: 73312.50
  },
  {
    id: 3,
    period: "November 16-30, 2024",
    payDate: "Nov 30, 2024",
    gross: 4250.00,
    net: 3187.50,
    status: "Downloaded",
    ytdGross: 93500.00,
    ytdNet: 70125.00
  },
  {
    id: 4,
    period: "November 1-15, 2024",
    payDate: "Nov 15, 2024",
    gross: 4250.00,
    net: 3187.50,
    status: "Downloaded",
    ytdGross: 89250.00,
    ytdNet: 66937.50
  },
]

const deductions = [
  {
    category: "Federal Tax",
    amount: 750.00,
    percentage: 17.6,
    color: "bg-red-500"
  },
  {
    category: "State Tax", 
    amount: 275.00,
    percentage: 6.5,
    color: "bg-orange-500"
  },
  {
    category: "Social Security",
    amount: 263.50,
    percentage: 6.2,
    color: "bg-blue-500"
  },
  {
    category: "Medicare",
    amount: 61.63,
    percentage: 1.5,
    color: "bg-green-500"
  },
  {
    category: "Health Insurance",
    amount: 175.00,
    percentage: 4.1,
    color: "bg-purple-500"
  },
  {
    category: "401k Contribution",
    amount: 255.00,
    percentage: 6.0,
    color: "bg-indigo-500"
  },
  {
    category: "Dental Insurance",
    amount: 25.00,
    percentage: 0.6,
    color: "bg-pink-500"
  },
]

const ytdSummary = {
  grossPay: 102000.00,
  netPay: 76500.00,
  totalDeductions: 25500.00,
  federalTax: 18000.00,
  stateTax: 6600.00,
  socialSecurity: 6324.00,
  medicare: 1479.00,
  healthInsurance: 4200.00,
  retirement401k: 6120.00
}

// Kenya Tax Breakdown Data
const kenyaTaxData = {
  paye: {
    monthlyGross: 4250.00,
    taxablePay: 3650.00, // After deductions
    bands: [
      { range: "KSH 0 - 24,000", rate: "10%", tax: 2400.00, annualLimit: 24000 },
      { range: "KSH 24,001 - 32,333", rate: "25%", tax: 2083.25, annualLimit: 32333 },
      { range: "KSH 32,334 - 500,000", rate: "30%", tax: 140300.20, annualLimit: 500000 },
      { range: "KSH 500,001 - 800,000", rate: "32.5%", tax: 97500.00, annualLimit: 800000 },
      { range: "Above KSH 800,000", rate: "35%", tax: 0, annualLimit: null }
    ],
    totalPayeTax: 242283.45,
    reliefs: {
      personalRelief: 28800.00, // KSH 2,400 per month
      insuranceRelief: 5000.00,
      pensionRelief: 20000.00,
      totalReliefs: 53800.00
    },
    netPayeAfterReliefs: 188483.45
  },
  nhif: {
    monthlyContribution: 1700.00, // Based on salary band
    annualContribution: 20400.00,
    salaryBand: "KSH 100,000 and above"
  },
  nssf: {
    monthlyContribution: 2160.00, // 6% of pensionable pay
    annualContribution: 25920.00,
    employeeRate: "6%",
    employerRate: "6%",
    pensionablePay: 36000.00
  },
  housingLevy: {
    monthlyContribution: 637.50, // 1.5% of gross pay
    annualContribution: 7650.00,
    rate: "1.5%"
  },
  summary: {
    grossAnnualPay: 102000.00,
    totalStatutoryDeductions: 242283.45,
    netAnnualPay: 59716.55,
    effectiveTaxRate: "38.7%"
  }
}

export default function EmployeePayroll() {
  const [showTaxDialog, setShowTaxDialog] = useState(false)
  const [showPayStubDialog, setShowPayStubDialog] = useState(false)

  const handleDownloadPayStub = (period: string) => {
    console.log(`Downloading pay stub for ${period}`)
    // Here you would typically trigger a download
    setShowPayStubDialog(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll & Compensation</h1>
          <p className="text-muted-foreground">
            View your pay information, download pay stubs, and track earnings
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setShowTaxDialog(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Tax Documents
          </Button>
          <Button size="sm" onClick={() => setShowPayStubDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            Latest Pay Stub
          </Button>
        </div>
      </div>

      {/* Current Pay Period */}
      <Card>
        <CardHeader>
          <CardTitle>Current Pay Period</CardTitle>
          <CardDescription>Your most recent payroll information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pay Period</p>
                    <p className="text-lg font-semibold">{currentPayPeriod.period}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pay Date</p>
                    <p className="text-lg font-semibold">{currentPayPeriod.payDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hours Worked</p>
                    <p className="text-lg font-semibold">{currentPayPeriod.hoursWorked} hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge variant="outline" className="text-green-600">
                      {currentPayPeriod.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-center p-4 border border-border rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Gross Pay</p>
                <p className="text-2xl font-bold text-green-600">
                  ${currentPayPeriod.grossPay.toLocaleString()}
                </p>
              </div>
            </div>
            <div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Banknote className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Net Pay</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${currentPayPeriod.netPay.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Pay Stubs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Pay Stubs</CardTitle>
            <CardDescription>Download your recent payroll statements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payStubs.map((stub) => (
                <div key={stub.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium">{stub.period}</p>
                      <Badge variant={stub.status === 'Available' ? 'default' : 'secondary'} className="text-xs">
                        {stub.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p>Pay Date: {stub.payDate}</p>
                        <p>Gross: <span className="font-medium">${stub.gross.toLocaleString()}</span></p>
                      </div>
                      <div>
                        <p>Net Pay: <span className="font-medium">${stub.net.toLocaleString()}</span></p>
                        <p>YTD Gross: <span className="font-medium">${stub.ytdGross.toLocaleString()}</span></p>
                      </div>
                      <div>
                        <p>YTD Net: <span className="font-medium">${stub.ytdNet.toLocaleString()}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              View All Pay Stubs
            </Button>
          </CardContent>
        </Card>

        {/* Deductions Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Deductions Breakdown</CardTitle>
            <CardDescription>Current pay period deductions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deductions.map((deduction, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{deduction.category}</span>
                    <span>${deduction.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={deduction.percentage} 
                      className="h-2 flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-12">
                      {deduction.percentage}%
                    </span>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Total Deductions</span>
                <span>${(currentPayPeriod.grossPay - currentPayPeriod.netPay).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Year-to-Date Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Year-to-Date Summary (2024)</CardTitle>
          <CardDescription>Your annual earnings and deductions summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Earnings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Gross Pay</span>
                  </div>
                  <span className="font-medium">${ytdSummary.grossPay.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Net Pay</span>
                  </div>
                  <span className="font-medium">${ytdSummary.netPay.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Receipt className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Total Deductions</span>
                  </div>
                  <span className="font-medium">${ytdSummary.totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Tax Withholdings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Federal Tax</span>
                  <span className="font-medium">${ytdSummary.federalTax.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">State Tax</span>
                  <span className="font-medium">${ytdSummary.stateTax.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Social Security</span>
                  <span className="font-medium">${ytdSummary.socialSecurity.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Medicare</span>
                  <span className="font-medium">${ytdSummary.medicare.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Benefits & Retirement</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Health Insurance</span>
                  <span className="font-medium">${ytdSummary.healthInsurance.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">401(k) Contribution</span>
                  <span className="font-medium">${ytdSummary.retirement401k.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Company Match</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    $3,060 matched this year (6% of salary)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Direct Deposit & Tax Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Direct Deposit Information</CardTitle>
            <CardDescription>Your current banking setup for payroll</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Primary Account</p>
                    <p className="text-xs text-muted-foreground">Chase Bank - ****1234</p>
                    <p className="text-xs text-muted-foreground">100% of net pay</p>
                  </div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <Button variant="outline" className="w-full">
                Update Banking Information
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
            <CardDescription>Your tax filing details and withholdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Filing Status</p>
                  <p className="font-medium">Married Filing Jointly</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Allowances</p>
                  <p className="font-medium">2 Federal, 2 State</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Additional Withholding</p>
                  <p className="font-medium">$0 per pay period</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="font-medium">Jan 15, 2024</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Update Tax Withholdings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Payslip Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Payslip Breakdown</CardTitle>
          <CardDescription>
            Detailed analysis of your salary breakdown with interactive components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Enhanced Deductions Breakdown */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Detailed Deductions Analysis</h3>
              <div className="grid gap-3">
                {deductions.map((deduction) => (
                  <Card key={deduction.category} className="hover:shadow-sm transition-shadow cursor-pointer border-l-4" style={{borderLeftColor: deduction.color.replace('bg-', '').replace('-500', '')}}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${deduction.color}`}></div>
                          <span className="font-medium">{deduction.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${deduction.amount.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">{deduction.percentage}%</div>
                        </div>
                      </div>
                      <Progress value={deduction.percentage} className="h-2 mb-2" />
                      <div className="text-xs text-muted-foreground">
                        {deduction.category === "Federal Tax" && "Progressive tax based on income brackets"}
                        {deduction.category === "State Tax" && "State-specific tax rate"}
                        {deduction.category === "Social Security" && "6.2% up to annual limit"}
                        {deduction.category === "Medicare" && "1.45% with additional 0.9% over $200k"}
                        {deduction.category === "Health Insurance" && "Monthly premium for your selected plan"}
                        {deduction.category === "401k Contribution" && "Your contribution: 6% of gross pay"}
                        {deduction.category === "Dental Insurance" && "Monthly dental coverage premium"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Visual Analysis */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Financial Breakdown</h3>
              
              {/* Take-home vs Deductions */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold">Your Take-Home Pay</h4>
                    <div className="text-3xl font-bold text-green-600">
                      ${currentPayPeriod.netPay.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {((currentPayPeriod.netPay / currentPayPeriod.grossPay) * 100).toFixed(1)}% of gross pay
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Biggest Deductions */}
              <Card>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-3">Largest Deductions</h4>
                  <div className="space-y-2">
                    {deductions
                      .sort((a, b) => b.amount - a.amount)
                      .slice(0, 3)
                      .map((deduction, idx) => (
                        <div key={deduction.category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}</span>
                            <span className="text-sm">{deduction.category}</span>
                          </div>
                          <span className="font-medium">${deduction.amount.toFixed(2)}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tax Summary */}
              <Card className="bg-red-50">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-3">Tax Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Taxes:</span>
                      <span className="font-medium">
                        ${(deductions.find(d => d.category === "Federal Tax")?.amount || 0) + 
                           (deductions.find(d => d.category === "State Tax")?.amount || 0) + 
                           (deductions.find(d => d.category === "Social Security")?.amount || 0) + 
                           (deductions.find(d => d.category === "Medicare")?.amount || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effective Tax Rate:</span>
                      <span className="font-medium">
                        {(((deductions.find(d => d.category === "Federal Tax")?.amount || 0) + 
                           (deductions.find(d => d.category === "State Tax")?.amount || 0) + 
                           (deductions.find(d => d.category === "Social Security")?.amount || 0) + 
                           (deductions.find(d => d.category === "Medicare")?.amount || 0)) / 
                           currentPayPeriod.grossPay * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Summary */}
              <Card className="bg-blue-50">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-3">Benefits Value</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Health Benefits:</span>
                      <span className="font-medium">
                        ${((deductions.find(d => d.category === "Health Insurance")?.amount || 0) + 
                           (deductions.find(d => d.category === "Dental Insurance")?.amount || 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retirement Contribution:</span>
                      <span className="font-medium">
                        ${deductions.find(d => d.category === "401k Contribution")?.amount || 0}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total Benefits:</span>
                      <span className="text-blue-600">
                        ${((deductions.find(d => d.category === "Health Insurance")?.amount || 0) + 
                           (deductions.find(d => d.category === "Dental Insurance")?.amount || 0) + 
                           (deductions.find(d => d.category === "401k Contribution")?.amount || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interactive Comparison Tool */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">What If Analysis</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-green-200">
                  <CardContent className="pt-4 text-center">
                    <h5 className="font-medium text-green-700">If you contributed 8% to 401k</h5>
                    <div className="mt-2">
                      <div className="text-lg font-bold text-green-600">
                        +${((currentPayPeriod.grossPay * 0.02) - (currentPayPeriod.grossPay * 0.02 * 0.22)).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">Additional monthly savings</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-200">
                  <CardContent className="pt-4 text-center">
                    <h5 className="font-medium text-blue-700">With High Deductible Plan</h5>
                    <div className="mt-2">
                      <div className="text-lg font-bold text-blue-600">
                        +${((deductions.find(d => d.category === "Health Insurance")?.amount || 0) * 0.4).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">Monthly savings</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardContent className="pt-4 text-center">
                    <h5 className="font-medium text-purple-700">Next Salary Increase</h5>
                    <div className="mt-2">
                      <div className="text-lg font-bold text-purple-600">
                        +${((currentPayPeriod.grossPay * 0.05) * 0.78).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">5% raise net impact</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Tax Documents Dialog - Kenya Tax Breakdown */}
      <Dialog open={showTaxDialog} onOpenChange={setShowTaxDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Kenya Tax Documents & Breakdown</span>
            </DialogTitle>
            <DialogDescription>
              Comprehensive tax breakdown according to Kenya Revenue Authority (KRA) regulations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* PAYE Tax Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pay As You Earn (PAYE) Tax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium mb-3">Tax Bands (Annual)</h4>
                    <div className="space-y-2">
                      {kenyaTaxData.paye.bands.map((band, index) => (
                        <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{band.range}</span>
                          <span className="text-sm font-medium">{band.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Tax Reliefs</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Personal Relief</span>
                        <span className="text-sm font-medium">KSH {kenyaTaxData.paye.reliefs.personalRelief.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Insurance Relief</span>
                        <span className="text-sm font-medium">KSH {kenyaTaxData.paye.reliefs.insuranceRelief.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pension Relief</span>
                        <span className="text-sm font-medium">KSH {kenyaTaxData.paye.reliefs.pensionRelief.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total Reliefs</span>
                        <span>KSH {kenyaTaxData.paye.reliefs.totalReliefs.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Net PAYE After Reliefs (Annual)</span>
                    <span className="text-lg font-bold text-blue-600">KSH {kenyaTaxData.paye.netPayeAfterReliefs.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statutory Deductions */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">NHIF Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">KSH {kenyaTaxData.nhif.monthlyContribution.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Monthly</div>
                    <div className="text-sm">Salary Band: {kenyaTaxData.nhif.salaryBand}</div>
                    <div className="text-sm">Annual: KSH {kenyaTaxData.nhif.annualContribution.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">NSSF Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-blue-600">KSH {kenyaTaxData.nssf.monthlyContribution.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Monthly (Employee: {kenyaTaxData.nssf.employeeRate})</div>
                    <div className="text-sm">Pensionable Pay: KSH {kenyaTaxData.nssf.pensionablePay.toLocaleString()}</div>
                    <div className="text-sm">Annual: KSH {kenyaTaxData.nssf.annualContribution.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Housing Levy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-purple-600">KSH {kenyaTaxData.housingLevy.monthlyContribution.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Monthly ({kenyaTaxData.housingLevy.rate})</div>
                    <div className="text-sm">Rate: {kenyaTaxData.housingLevy.rate} of gross pay</div>
                    <div className="text-sm">Annual: KSH {kenyaTaxData.housingLevy.annualContribution.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle>Annual Tax Summary (KRA Compliance)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Gross Annual Pay</span>
                      <span className="font-medium">KSH {kenyaTaxData.summary.grossAnnualPay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax & Statutory Deductions</span>
                      <span className="font-medium text-red-600">KSH {kenyaTaxData.summary.totalStatutoryDeductions.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Net Annual Pay</span>
                      <span className="text-green-600">KSH {kenyaTaxData.summary.netAnnualPay.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600">{kenyaTaxData.summary.effectiveTaxRate}</div>
                      <div className="text-sm text-muted-foreground">Effective Tax Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">KRA Compliance Notice</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                This breakdown is based on current KRA tax rates and regulations. For official tax documents and PIN certificates, visit KRA iTax portal.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTaxDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              console.log('Downloading Kenya tax report')
              setShowTaxDialog(false)
            }}>
              <FileDown className="mr-2 h-4 w-4" />
              Download Tax Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pay Stub Download Dialog */}
      <Dialog open={showPayStubDialog} onOpenChange={setShowPayStubDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-600" />
              <span>Download Pay Stub</span>
            </DialogTitle>
            <DialogDescription>
              Select the pay period for which you want to download your pay stub.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Select Pay Period</Label>
              <Select onValueChange={(value) => handleDownloadPayStub(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose pay period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Period (Dec 16-31, 2024)</SelectItem>
                  <SelectItem value="1month">1 Month Ago (Dec 1-15, 2024)</SelectItem>
                  <SelectItem value="6months">6 Months Ago (Jun 16-30, 2024)</SelectItem>
                  <SelectItem value="all">View All Available Periods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">💡 Quick Access Options:</p>
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-blue-700 hover:bg-blue-100"
                    onClick={() => handleDownloadPayStub('1month')}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    Last Month (Dec 1-15, 2024)
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-blue-700 hover:bg-blue-100"
                    onClick={() => handleDownloadPayStub('6months')}
                  >
                    <Download className="mr-2 h-3 w-3" />
                    6 Months Ago (Jun 16-30, 2024)
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayStubDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
