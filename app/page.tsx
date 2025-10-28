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
    <div className="min-h-screen bg-background text-foreground">
      <ZentiriHeader />
      <main className="mb-32">
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

