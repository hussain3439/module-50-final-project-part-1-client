"use client"

import { FormEvent, useState } from "react"
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signUp } from "@/lib/auth-client"

type SignUpFormData = {
  name: string
  email: string
  image: string
  password: string
}

const inputClasses =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white outline-none transition-colors placeholder:text-neutral-500 focus-visible:border-[#7a5af8]/60 focus-visible:ring-2 focus-visible:ring-[#7a5af8]/25"

const passwordInputClasses = inputClasses + " pl-9 pr-10"

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    // Convert FormData to Object
    const userData = Object.fromEntries(formData.entries()) as SignUpFormData

    try {
      const { data, error } = await signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image || undefined,
        callbackURL: "/",
      })

      if (error) {
        console.log(error.message)
        return
      }

      console.log("Signup successful:", data)

    
    } catch (error) {
      console.error("Signup Error:", error)
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl font-semibold tracking-tight text-white">
        Create your account
      </h1>
      <p className="mt-2 text-center text-sm text-neutral-400">
        Start your journey with HireLoop today
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="signup-name"
            className="block text-xs font-medium text-neutral-300"
          >
            Full name
          </label>
          <div className="relative">
            <UserIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              className={inputClasses + " pl-9"}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="signup-email"
            className="block text-xs font-medium text-neutral-300"
          >
            Email
          </label>
          <div className="relative">
            <MailIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              id="signup-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClasses + " pl-9"}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="signup-confirm-password"
            className="block text-xs font-medium text-neutral-300"
          >
            Image Url
          </label>
          <div className="relative">
            <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              id="url"
              name="image"
              type="url"
              required
              autoComplete="image-url"
              placeholder="Image Url"
              className={passwordInputClasses}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="signup-password"
            className="block text-xs font-medium text-neutral-300"
          >
            Password
          </label>
          <div className="relative">
            <LockIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className={passwordInputClasses}
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide passwords" : "Show passwords"}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-500 transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-[#7a5af8] text-white hover:bg-[#6d4ff0]"
        >
          Create Account
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-400">
        Already have an account?
        <Link
          href="/sign-in"
          className="font-medium text-[#9d8bff] transition-colors hover:text-[#b3a5ff]"
        >
          Sign in
        </Link>
      </p>
    </>
  )
}
