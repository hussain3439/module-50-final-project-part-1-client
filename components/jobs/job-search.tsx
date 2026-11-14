"use client"

import { SearchIcon } from "lucide-react"
import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function JobSearch() {
  const router = useRouter();


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // console.log(data, 'search is')

    const search = data.searchField;
    const params = new URLSearchParams()
    params.set('search', search as string)
    router.push(`/brows-jobs?${params.toString()}`)
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-[#141414] p-1.5"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
        <SearchIcon className="size-4 shrink-0 text-neutral-500" />
        <input
          type="text"
          name="searchField"
          aria-label="Job title, skill, or company"
          placeholder="Job title, skill or company"
          className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="shrink-0 bg-[#7a5af8] px-4 text-white hover:bg-[#6d4ff0]"
      >
        <SearchIcon />
        Search
      </Button>
    </form>
  )
}
