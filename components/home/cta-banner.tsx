import Image from "next/image"
import Link from "next/link"

import CtaBgImage from "@/app/assets/cta-bg.png"

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Purple glow that shines through the wireframe dome */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[880px] max-w-[120vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(122,90,248,0.55),rgba(122,90,248,0.2)_55%,transparent_100%)]"
      />

      {/* Wireframe dome artwork */}
      <Image
        src={CtaBgImage}
        alt=""
        aria-hidden
        sizes="(min-width: 640px) 100vw, 170vw"
        className="pointer-events-none absolute top-0 left-1/2 w-[170%] max-w-none -translate-x-1/2 select-none sm:w-full sm:max-w-[1400px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-40 pb-36 text-center sm:px-6 sm:pt-48 sm:pb-44 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          <span className="block">Your next role is</span>
          <span className="block">already looking for you</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm text-neutral-400 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#141414] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  )
}
