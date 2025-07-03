"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Upload, 
  FileSpreadsheet, 
  UserPlus,
  ArrowRight, 
  CheckCircle,
  Users,
  Download
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EmployeeDetailsPage() {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [organizationData, setOrganizationData] = useState<any>(null)
  const [planData, setPlanData] = useState<any>(null)

  useEffect(() => {
    // Check if user has completed previous steps
    const storedOrgData = localStorage.getItem('organizationData')
    const storedPlanData = localStorage.getItem('planData')
    
    if (!storedOrgData || !storedPlanData) {
      // Redirect back to organization setup if no data
      router.push("/employer/organization")
      return
    }
    
    setOrganizationData(JSON.parse(storedOrgData))
    setPlanData(JSON.parse(storedPlanData))
  }, [router])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && (
      file.type === "application/vnd.ms-excel" || 
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "text/csv"
    )) {
      setUploadedFile(file)
      simulateUpload()
    } else {
      alert("Please upload a valid Excel file (.xls, .xlsx) or CSV file (.csv)")
    }
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleContinueToDashboard = () => {
    // Store completion status
    localStorage.setItem('onboardingComplete', 'true')
    
    // Redirect to dashboard
    router.push("/employer/dashboard")
  }

  const handleSkipForNow = () => {
    // Allow users to skip employee setup and go directly to dashboard
    localStorage.setItem('onboardingComplete', 'true')
    router.push("/employer/dashboard")
  }

  const downloadTemplate = () => {
    // In a real app, this would download an actual Excel template
    const csvContent = "First Name,Last Name,Email Address,Department,Position,Start Date\nJohn,Doe,john.doe@company.com,Engineering,Software Engineer,2024-01-15\nJane,Smith,jane.smith@company.com,Marketing,Marketing Manager,2024-01-20"
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employee_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (!organizationData || !planData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-2">
            <img 
              src="/zentiri-logo.png" 
              alt="Zentiri HR Logo" 
              className="h-8 w-8 rounded-lg object-contain"
            />
            <span className="text-xl font-bold">Zentiri HR</span>
          </div>
          <Button variant="ghost" onClick={() => router.push("/employer/plans")}>
            Back
          </Button>
        </div>
      </header>

      <main className="container px-4 py-12 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight mb-3">
              Add Your Employees
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload your employee data or add them manually. We'll send login credentials to each employee via email.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  ✓
                </div>
                <span className="text-muted-foreground">Organization</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  ✓
                </div>
                <span className="text-muted-foreground">Plan</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  3
                </div>
                <span className="font-medium">Employees</span>
              </div>
            </div>
          </div>

          {/* Employee Setup Options */}
          <Tabs defaultValue="upload" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="upload">Upload File</TabsTrigger>
              <TabsTrigger value="manual">Add Manually</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5" />
                    <span>Upload Employee Data</span>
                  </CardTitle>
                  <CardDescription>
                    Upload an Excel or CSV file with your employee information. Each employee will receive login credentials via email.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {!uploadedFile ? (
                    <div>
                      <div className="border border-dashed border-border/60 rounded-xl p-12 text-center hover:border-border transition-colors duration-200">
                        <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <div className="space-y-2">
                          <Label htmlFor="file-upload" className="cursor-pointer">
                            <span className="text-lg font-medium">Upload Excel or CSV File</span>
                            <p className="text-sm text-muted-foreground mt-2">
                              Drag and drop or click to browse (.xls, .xlsx, .csv)
                            </p>
                          </Label>
                          <Input
                            id="file-upload"
                            type="file"
                            accept=".xls,.xlsx,.csv"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                      
                      <div className="text-center mt-4">
                        <Button variant="outline" onClick={downloadTemplate} className="text-sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                        <FileSpreadsheet className="h-8 w-8 text-green-600" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{uploadedFile.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                        {uploadComplete && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>

                      {isUploading && (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Processing file...</span>
                            <span className="font-medium">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      {uploadComplete && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            Employee data processed successfully! Login credentials will be sent to each employee via email.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}

                  {/* Sample Format Guide */}
                  <div className="bg-muted/20 rounded-xl p-6 border border-border/30">
                    <div className="text-sm font-medium mb-3 text-foreground">Expected File Format:</div>
                    <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                      <div>Column A: First Name</div>
                      <div>Column B: Last Name</div>
                      <div>Column C: Email Address</div>
                      <div>Column D: Department</div>
                      <div>Column E: Position</div>
                      <div>Column F: Start Date (YYYY-MM-DD)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Add Employees Manually</span>
                  </CardTitle>
                  <CardDescription>
                    Add employees one by one. You can always add more employees later from your dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16">
                    <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Manual Employee Entry</h3>
                    <p className="text-muted-foreground mb-6">
                      This feature will be available in your dashboard. For now, you can upload a file or skip to get started.
                    </p>
                    <Button onClick={handleSkipForNow} variant="outline">
                      Skip for Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-12">
            <Button variant="outline" onClick={handleSkipForNow}>
              Skip for Now
            </Button>
            <Button 
              onClick={handleContinueToDashboard}
              disabled={!uploadComplete}
              className="px-8"
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
