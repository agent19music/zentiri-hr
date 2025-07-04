import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { User } from './auth'
import { OrganizationStats, DynamicDataService } from './dynamic-data'

export interface ReportData {
  title: string
  subtitle: string
  data: any
  charts?: string[] // base64 encoded chart images
}

export class PDFExportService {
  
  static async generateOrganizationReport(user: User): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    // Header with organization branding
    this.addHeader(pdf, user, 'Organization Report')
    
    // Current date and time
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    pdf.setFontSize(10)
    pdf.setTextColor(100)
    pdf.text(`Generated on ${currentDate}`, 20, 35)
    
    // Organization stats
    const stats = DynamicDataService.getOrganizationStats(user)
    this.addOrganizationStats(pdf, stats, 50)
    
    // Department breakdown
    const departments = DynamicDataService.getDepartmentData(user)
    this.addDepartmentBreakdown(pdf, departments, 120)
    
    // Recent activity summary
    const activities = DynamicDataService.getRecentActivity(user)
    this.addRecentActivity(pdf, activities, 180)
    
    // Footer
    this.addFooter(pdf, user)
    
    // Download the PDF
    pdf.save(`${user.organizationName.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  static async generatePayrollReport(user: User): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    this.addHeader(pdf, user, 'Payroll Report')
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    })
    pdf.setFontSize(10)
    pdf.setTextColor(100)
    pdf.text(`Payroll Period: ${currentDate}`, 20, 35)
    
    // Payroll summary
    const stats = DynamicDataService.getOrganizationStats(user)
    this.addPayrollSummary(pdf, stats, user, 50)
    
    // Department payroll breakdown
    const departments = DynamicDataService.getDepartmentData(user)
    this.addPayrollBreakdown(pdf, departments, 120)
    
    this.addFooter(pdf, user)
    
    pdf.save(`${user.organizationName.replace(/\s+/g, '_')}_Payroll_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  static async generateEmployeeReport(user: User, targetEmployee?: any): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    this.addHeader(pdf, user, `Employee Report: ${targetEmployee?.name || user.displayName}`)
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    pdf.setFontSize(10)
    pdf.setTextColor(100)
    pdf.text(`Generated on ${currentDate}`, 20, 35)
    
    // Employee details
    this.addEmployeeDetails(pdf, targetEmployee || user, 50)
    
    // Performance metrics
    const userStats = DynamicDataService.getUserSpecificStats(user)
    this.addPerformanceMetrics(pdf, userStats, 120)
    
    this.addFooter(pdf, user)
    
    const fileName = targetEmployee 
      ? `${targetEmployee.name.replace(/\s+/g, '_')}_Report_${new Date().toISOString().split('T')[0]}.pdf`
      : `My_Employee_Report_${new Date().toISOString().split('T')[0]}.pdf`
    
    pdf.save(fileName)
  }

  static async exportElementToPDF(elementId: string, fileName: string): Promise<void> {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`)
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    const imgWidth = 190
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 10

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save(fileName)
  }

  private static addHeader(pdf: jsPDF, user: User, title: string): void {
    // Organization name
    pdf.setFontSize(16)
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('helvetica', 'bold')
    pdf.text(user.organizationName, 20, 20)
    
    // Report title
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    pdf.text(title, 20, 28)
    
    // Line separator
    pdf.setLineWidth(0.5)
    pdf.setDrawColor(200, 200, 200)
    pdf.line(20, 32, 190, 32)
  }

  private static addOrganizationStats(pdf: jsPDF, stats: OrganizationStats, startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Organization Overview', 20, startY)
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    const statsData = [
      [`Total Employees`, stats.totalEmployees.toString()],
      [`Active Employees`, stats.activeEmployees.toString()],
      [`On Leave`, stats.onLeave.toString()],
      [`Departments`, stats.departments.toString()],
      [`Average Performance`, stats.avgPerformance],
      [`Monthly Payroll`, stats.monthlyPayroll],
      [`Open Positions`, stats.openPositions.toString()],
      [`Pending Approvals`, stats.pendingApprovals.toString()]
    ]

    let y = startY + 10
    statsData.forEach(([label, value]) => {
      pdf.text(`${label}:`, 25, y)
      pdf.text(value, 80, y)
      y += 8
    })
  }

  private static addDepartmentBreakdown(pdf: jsPDF, departments: any[], startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Department Breakdown', 20, startY)
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    let y = startY + 10
    departments.forEach(dept => {
      pdf.text(`${dept.name}:`, 25, y)
      pdf.text(`${dept.count} employees (${dept.percentage}%)`, 80, y)
      y += 8
    })
  }

  private static addRecentActivity(pdf: jsPDF, activities: any[], startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Recent Activity', 20, startY)
    
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    
    let y = startY + 10
    activities.slice(0, 5).forEach(activity => {
      pdf.text(`• ${activity.message}`, 25, y)
      pdf.setTextColor(100)
      pdf.text(activity.time, 25, y + 4)
      pdf.setTextColor(0)
      y += 12
    })
  }

  private static addPayrollSummary(pdf: jsPDF, stats: OrganizationStats, user: User, startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Payroll Summary', 20, startY)
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    const payrollData = [
      [`Total Monthly Payroll`, stats.monthlyPayroll],
      [`Active Employees`, stats.activeEmployees.toString()],
      [`Average per Employee`, `$${Math.round(parseInt(stats.monthlyPayroll.replace('$', '').replace(',', '')) / stats.activeEmployees).toLocaleString()}`],
      [`Processing Status`, 'Completed']
    ]

    let y = startY + 10
    payrollData.forEach(([label, value]) => {
      pdf.text(`${label}:`, 25, y)
      pdf.text(value, 80, y)
      y += 8
    })
  }

  private static addPayrollBreakdown(pdf: jsPDF, departments: any[], startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Department Payroll Distribution', 20, startY)
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    let y = startY + 10
    departments.forEach(dept => {
      const estimatedPayroll = dept.count * 4200 // Rough estimate
      pdf.text(`${dept.name}:`, 25, y)
      pdf.text(`$${estimatedPayroll.toLocaleString()} (${dept.count} employees)`, 80, y)
      y += 8
    })
  }

  private static addEmployeeDetails(pdf: jsPDF, employee: any, startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Employee Information', 20, startY)
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    const employeeData = [
      [`Name`, employee.displayName || employee.name],
      [`Employee ID`, employee.employeeId || 'N/A'],
      [`Department`, employee.department],
      [`Role`, employee.role?.replace('_', ' ')],
      [`Email`, employee.email]
    ]

    let y = startY + 10
    employeeData.forEach(([label, value]) => {
      pdf.text(`${label}:`, 25, y)
      pdf.text(value || 'N/A', 80, y)
      y += 8
    })
  }

  private static addPerformanceMetrics(pdf: jsPDF, userStats: any, startY: number): void {
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Performance Metrics', 20, startY)
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    
    const performanceData = [
      [`Performance Score`, userStats.performanceScore],
      [`Performance Level`, userStats.performanceText],
      [`Leave Balance`, `${userStats.leaveBalance} days`],
      [`Training Progress`, `${userStats.trainingProgress.completed}/${userStats.trainingProgress.total} completed`]
    ]

    let y = startY + 10
    performanceData.forEach(([label, value]) => {
      pdf.text(`${label}:`, 25, y)
      pdf.text(value, 80, y)
      y += 8
    })
  }

  private static addFooter(pdf: jsPDF, user: User): void {
    const pageHeight = pdf.internal.pageSize.getHeight()
    
    pdf.setFontSize(8)
    pdf.setTextColor(100)
    pdf.text('Generated by Zentiri HR', 20, pageHeight - 15)
    pdf.text(`© ${new Date().getFullYear()} ${user.organizationName}`, 20, pageHeight - 10)
    
    const currentTime = new Date().toLocaleString()
    pdf.text(`Generated at: ${currentTime}`, 120, pageHeight - 10)
  }
} 