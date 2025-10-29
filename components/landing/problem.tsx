"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  ChatsCircle,
  ClockCountdown,
  GraduationCap,
  ShieldCheck,
  UserList,
} from "@phosphor-icons/react"

const employerFocus = [
  {
    title: "Guided hiring pipelines",
    description: "Structured recruitment flows with automated compliance checks and collaborative reviews.",
    icon: Briefcase,
  },
  {
    title: "Workforce pulse analytics",
    description: "Executive dashboards that surface attrition risks, pay equity signals, and skill gaps in real time.",
    icon: UserList,
  },
  {
    title: "Policy-ready governance",
    description: "Region-aware guardrails and documentation workflows that keep every audit ready by default.",
    icon: ShieldCheck,
  },
]

const employeeFocus = [
  {
    title: "Personal growth playbooks",
    description: "Role-based learning paths, mentorship loops, and certification milestones in one workspace.",
    icon: GraduationCap,
  },
  {
    title: "Responsive support hub",
    description: "Unified leave, benefits, and payroll actions with proactive status nudges across devices.",
    icon: ClockCountdown,
  },
  {
    title: "Always-on conversations",
    description: "Guided check-ins and feedback prompts that make hybrid collaboration tangible and timely.",
    icon: ChatsCircle,
  },
]

export function ZentiriProblem() {
  return (
    <section className="w-full bg-background py-24" id="teams">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 sm:px-6 md:px-0 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-medium text-primary">Built for every side of the HR table</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
              Zentiri aligns employer vision with employee experience in a single rhythm
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Whether you lead talent strategy or manage your personal growth, Zentiri keeps the experience cohesive—so teams move faster without losing the human touch.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2" id="workflows">
            <Card className="bg-card shadow-sm border-0">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 p-2 text-primary">
                    <Briefcase size={20} weight="fill" />
                  </span>
                  <h3 className="text-lg font-semibold">Employer suite</h3>
                </div>
                <div className="space-y-4">
                  {employerFocus.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="rounded-lg bg-background p-2 text-primary">
                        <item.icon size={18}  />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-sm border-0">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[hsl(189,95%,43%)]/15 p-2 text-[hsl(189,95%,43%)]">
                    <ChatsCircle size={20} weight="fill" />
                  </span>
                  <h3 className="text-lg font-semibold">Employee hub</h3>
                </div>
                <div className="space-y-4">
                  {employeeFocus.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="rounded-lg bg-background p-2 text-[hsl(189,95%,43%)] ">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
