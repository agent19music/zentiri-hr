import { EmployerSidebar } from "@/components/dashboard/employer/sidebar"
import { EmployerHeader } from "@/components/dashboard/employer/header"

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <EmployerSidebar />
      <div className="lg:pl-64">
        <EmployerHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 
