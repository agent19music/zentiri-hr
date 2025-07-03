import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
  Receipt
} from "lucide-react"

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

export default function EmployeePayroll() {
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
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Tax Documents
          </Button>
          <Button size="sm">
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
    </div>
  )
} 
