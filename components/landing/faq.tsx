import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take to implement Zentiri?",
    answer:
      "Our guided rollout launches core workflows within 30 days. We pair your team with a people scientist to configure policies, integrations, and employee journeys without disruption.",
  },
  {
    question: "Can Zentiri support both employers and employees?",
    answer:
      "Yes. Employers gain orchestration and analytics, while employees receive a personalised hub for leave, pay, growth, and support—all within the same platform.",
  },
  {
    question: "What integrations are available?",
    answer:
      "We integrate with leading HRIS, payroll, ATS, and collaboration tools. Our open API and integration marketplace ensure your existing stack stays in sync.",
  },
  {
    question: "How secure is Zentiri?",
    answer:
      "We maintain SOC 2 Type II controls, data residency options, and granular permissions. Zentiri includes continuous monitoring and encryption across every layer.",
  },
]

export function ZentiriFAQ() {
  return (
    <section className="w-full bg-background py-24" id="faq">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl px-4 text-center sm:px-6 md:px-0">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Answers for forward-thinking HR teams</h2>
        </div>

        <div className="mx-auto mt-12 w-full max-w-3xl px-4 sm:px-6 md:px-0">
          <div className="rounded-2xl border border-border/50 bg-background p-6 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={faq.question}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
