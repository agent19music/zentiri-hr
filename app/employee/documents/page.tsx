"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText,
  Download,
  Eye,
  Upload,
  CreditCard,
  GraduationCap,
  Shield,
  Building2,
  User,
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Lock,
  Briefcase,
  Heart,
  FileCheck,
  Camera,
  Award,
  Clock
} from "lucide-react"

// Employee documents data
const personalDocuments = [
  {
    id: "national-id",
    name: "National ID Card",
    type: "Government ID",
    icon: CreditCard,
    status: "verified",
    uploadDate: "2022-03-10",
    expiryDate: "2032-03-15",
    fileSize: "2.4 MB",
    format: "PDF",
    description: "Official government-issued identification",
    details: {
      idNumber: "12345678",
      issuedBy: "Government of Kenya",
      placeOfBirth: "Nairobi, Kenya"
    }
  },
  {
    id: "passport",
    name: "Passport",
    type: "Travel Document",
    icon: FileText,
    status: "verified",
    uploadDate: "2023-01-15",
    expiryDate: "2033-01-15",
    fileSize: "3.1 MB",
    format: "PDF",
    description: "International travel document",
    details: {
      passportNumber: "A12345678",
      issuedBy: "Ministry of Foreign Affairs",
      nationality: "Kenyan"
    }
  },
  {
    id: "kra-pin",
    name: "KRA PIN Certificate",
    type: "Tax Document",
    icon: Shield,
    status: "verified",
    uploadDate: "2022-03-10",
    expiryDate: null,
    fileSize: "1.8 MB",
    format: "PDF",
    description: "Kenya Revenue Authority Personal Identification Number",
    details: {
      pinNumber: "A123456789B",
      issuedBy: "Kenya Revenue Authority",
      registrationDate: "2020-05-15"
    }
  },
  {
    id: "nhif-card",
    name: "NHIF Card",
    type: "Insurance",
    icon: Heart,
    status: "verified",
    uploadDate: "2022-03-12",
    expiryDate: "2025-03-12",
    fileSize: "1.2 MB",
    format: "PDF",
    description: "National Hospital Insurance Fund membership card",
    details: {
      memberNumber: "1234567890",
      issuedBy: "National Hospital Insurance Fund",
      memberSince: "2020-01-01"
    }
  }
]

const educationDocuments = [
  {
    id: "degree",
    name: "Bachelor's Degree Certificate",
    type: "Education",
    icon: GraduationCap,
    status: "verified",
    uploadDate: "2022-03-10",
    expiryDate: null,
    fileSize: "4.2 MB",
    format: "PDF",
    description: "University degree certificate",
    details: {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Nairobi",
      graduationYear: "2019",
      gpa: "3.8/4.0"
    }
  },
  {
    id: "transcript",
    name: "Academic Transcript",
    type: "Education",
    icon: FileText,
    status: "verified",
    uploadDate: "2022-03-10",
    expiryDate: null,
    fileSize: "3.5 MB",
    format: "PDF",
    description: "Official academic transcript",
    details: {
      institution: "University of Nairobi",
      program: "Bachelor of Science in Computer Science",
      creditHours: "120",
      honors: "Magna Cum Laude"
    }
  },
  {
    id: "certificates",
    name: "Professional Certificates",
    type: "Certification",
    icon: Award,
    status: "verified",
    uploadDate: "2023-06-15",
    expiryDate: "2026-06-15",
    fileSize: "2.8 MB",
    format: "PDF",
    description: "Professional development certificates",
    details: {
      certifications: ["AWS Solutions Architect", "Scrum Master", "Google Cloud Professional"],
      issuedBy: "Various Organizations",
      totalCertifications: "8"
    }
  }
]

const employmentDocuments = [
  {
    id: "employment-contract",
    name: "Employment Contract",
    type: "Contract",
    icon: Briefcase,
    status: "active",
    uploadDate: "2022-03-15",
    expiryDate: null,
    fileSize: "1.9 MB",
    format: "PDF",
    description: "Current employment agreement",
    details: {
      position: "Senior Software Engineer",
      startDate: "2022-03-15",
      contractType: "Permanent",
      department: "Engineering"
    }
  },
  {
    id: "job-description",
    name: "Job Description",
    type: "Role Document",
    icon: FileText,
    status: "current",
    uploadDate: "2023-08-01",
    expiryDate: null,
    fileSize: "1.1 MB",
    format: "PDF",
    description: "Current role responsibilities and requirements",
    details: {
      position: "Lead Software Engineer",
      reportingTo: "Engineering Manager",
      teamSize: "5 developers",
      lastUpdated: "2023-08-01"
    }
  },
  {
    id: "nda",
    name: "Non-Disclosure Agreement",
    type: "Legal",
    icon: Lock,
    status: "active",
    uploadDate: "2022-03-15",
    expiryDate: null,
    fileSize: "0.8 MB",
    format: "PDF",
    description: "Confidentiality and non-disclosure agreement",
    details: {
      effectiveDate: "2022-03-15",
      jurisdiction: "Kenya",
      type: "Mutual NDA"
    }
  },
  {
    id: "background-check",
    name: "Background Verification",
    type: "Verification",
    icon: CheckCircle,
    status: "completed",
    uploadDate: "2022-03-08",
    expiryDate: null,
    fileSize: "2.3 MB",
    format: "PDF",
    description: "Employment background verification report",
    details: {
      verifiedBy: "SecureCheck Kenya",
      verificationDate: "2022-03-08",
      status: "Cleared",
      checks: "Criminal, Credit, Employment, Education"
    }
  }
]

const bankingDocuments = [
  {
    id: "bank-statement",
    name: "Bank Statement",
    type: "Financial",
    icon: Building2,
    status: "current",
    uploadDate: "2024-12-01",
    expiryDate: "2025-01-31",
    fileSize: "1.6 MB",
    format: "PDF",
    description: "Monthly bank statement for payroll",
    details: {
      bank: "Equity Bank",
      accountNumber: "****1234",
      statementMonth: "November 2024"
    }
  },
  {
    id: "bank-letter",
    name: "Bank Confirmation Letter",
    type: "Verification",
    icon: FileCheck,
    status: "verified",
    uploadDate: "2022-03-10",
    expiryDate: null,
    fileSize: "0.9 MB",
    format: "PDF",
    description: "Bank account verification letter",
    details: {
      bank: "Equity Bank",
      accountType: "Savings Account",
      verifiedDate: "2022-03-10"
    }
  }
]

export default function EmployeeDocuments() {
  const [selectedTab, setSelectedTab] = useState("personal")
  const [viewDocument, setViewDocument] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
      case 'completed':
      case 'current':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'expired':
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'active':
      case 'completed':
      case 'current':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'expired':
      case 'rejected':
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const DocumentCard = ({ document }: { document: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <document.icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{document.name}</CardTitle>
              <CardDescription>{document.description}</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(document.status)}>
            {getStatusIcon(document.status)}
            <span className="ml-1 capitalize">{document.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <span className="ml-2 font-medium">{document.type}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Format:</span>
              <span className="ml-2 font-medium">{document.format}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Size:</span>
              <span className="ml-2 font-medium">{document.fileSize}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Uploaded:</span>
              <span className="ml-2 font-medium">{new Date(document.uploadDate).toLocaleDateString()}</span>
            </div>
          </div>

          {document.expiryDate && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Expires: {new Date(document.expiryDate).toLocaleDateString()}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Document Details</h4>
            <div className="text-sm space-y-1">
              {Object.entries(document.details).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="mr-2 h-3 w-3" />
              View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="mr-2 h-3 w-3" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
          <p className="text-muted-foreground">
            View and manage your personal, educational, and employment documents
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </div>

      {/* Document Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {personalDocuments.length + educationDocuments.length + employmentDocuments.length + bankingDocuments.length}
            </div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">11</div>
            <p className="text-xs text-muted-foreground">Documents verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-muted-foreground">NHIF Card (3 months)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8 MB</div>
            <p className="text-xs text-muted-foreground">Of 1 GB limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Document Categories */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {personalDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {educationDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {employmentDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="banking" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {bankingDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Document Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <Lock className="h-5 w-5" />
            <span>Document Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-blue-700 space-y-2">
            <p>• All documents are encrypted and stored securely in compliance with data protection regulations</p>
            <p>• Access to your documents is logged and monitored for security purposes</p>
            <p>• Documents are automatically backed up and can be recovered if needed</p>
            <p>• You can request document deletion by contacting HR (retention policies apply)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 