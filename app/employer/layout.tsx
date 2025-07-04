import { EmployerSidebar } from "@/components/dashboard/employer/sidebar"
import { EmployerHeader } from "@/components/dashboard/employer/header"
import { RouteGuard } from "@/components/auth/route-guard"

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard requireAuth requireEmployerAccess>
      <div className="min-h-screen bg-background">
        <EmployerSidebar />
        <div className="lg:pl-64">
          <EmployerHeader />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  )
} 
