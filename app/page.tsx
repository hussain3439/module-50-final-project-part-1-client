import { CtaBanner } from "@/components/home/cta-banner"
import { Features } from "@/components/home/features"
import { Hero } from "@/components/home/hero"
import { JobDiscovery } from "@/components/home/job-discovery"
import { Pricing } from "@/components/home/pricing"
import { SiteFooter } from "@/components/shared/site-footer"
import { SiteNavbar } from "@/components/shared/site-navbar"

export default function Page() {
  return (
    <>
      <SiteNavbar />
      <Hero />
      <Features />
      <JobDiscovery />
      <Pricing />
      <CtaBanner />
      <SiteFooter />
    </>
  )
}
