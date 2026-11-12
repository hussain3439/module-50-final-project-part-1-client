import { CtaBanner } from "@/components/home/cta-banner"
import { Features } from "@/components/home/features"
import { Hero } from "@/components/home/hero"
import { JobDiscovery } from "@/components/home/job-discovery"
import { Pricing } from "@/components/home/pricing"
import { SiteFooter } from "@/components/shared/site-footer"

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <JobDiscovery />
      <Pricing />
      <CtaBanner />
      <SiteFooter />
    </>
  )
}
