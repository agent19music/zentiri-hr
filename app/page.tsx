import { ZentiriHeader } from "@/components/landing/header"
import { ZentiriHero } from "@/components/landing/hero"
import { ZentiriLogos } from "@/components/landing/logos"
import { ZentiriProblem } from "@/components/landing/problem"
import { ZentiriFeatures } from "@/components/landing/features"
import { ZentiriHowItWorks } from "@/components/landing/how-it-works"
import { ZentiriTestimonials } from "@/components/landing/testimonials"
import { ZentiriPricing } from "@/components/landing/pricing"
import { ZentiriFAQ } from "@/components/landing/faq"
import { ZentiriCTA } from "@/components/landing/cta"
import { ZentiriFooter } from "@/components/landing/footer"

export default function ZentiriHRLanding() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <ZentiriHeader />
      <main className="mx-auto mb-32 w-full">
        <ZentiriHero />
        <ZentiriLogos />
        <ZentiriProblem />
        <ZentiriFeatures />
        <ZentiriHowItWorks />
        <ZentiriTestimonials />
        <ZentiriPricing />
        <ZentiriFAQ />
        <ZentiriCTA />
      </main>
      <ZentiriFooter />
    </div>
  )
}

