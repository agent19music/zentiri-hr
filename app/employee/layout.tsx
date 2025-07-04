import { EmployeeSidebar } from "@/components/dashboard/employee/sidebar"
import { EmployeeHeader } from "@/components/dashboard/employee/header"
import { RouteGuard } from "@/components/auth/route-guard"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard requireAuth>
      <div className="min-h-screen bg-background">
        <EmployeeSidebar />
        <div className="lg:pl-64">
          <EmployeeHeader />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  )
} 
