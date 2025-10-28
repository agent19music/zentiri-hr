import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ZentiriCTA() {
  return (
    <section className=" ">
      <div className="container px-4 py-20 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-tight sm:text-4xl">Ready to harmonise your people operations?</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Join Zentiri to give every employee and leader the clarity, confidence, and care they deserve.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="min-w-[200px] bg-[hsl(189,95%,43%)] text-white hover:bg-[hsl(189,95%,38%)]"
              asChild
            >
              <Link href="/onboarding/organization">Launch Zentiri</Link>
            </Button>
            <Button
              size="lg"
              className="min-w-[200px] bg-[hsl(25,95%,53%)] text-white hover:bg-[hsl(25,95%,48%)]"
              asChild
            >
              <Link href="/contact">Book a strategy call</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
