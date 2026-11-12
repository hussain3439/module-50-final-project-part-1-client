

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-12">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[420px] w-[720px] max-w-full -translate-x-1/2 rounded-full bg-[#7a5af8]/15 blur-[120px]" />
      </div>


      <div className="relative z-10 w-full max-w-md">
      

        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6 shadow-[0_0_40px_rgba(122,90,248,0.08)] sm:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
