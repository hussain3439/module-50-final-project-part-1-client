"use client"

import { RotateCcwIcon, SlidersHorizontalIcon } from "lucide-react"

import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants"

// Same visual language as the other inputs on the site (auth pages, dashboard forms).
const fieldClass =
  "h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none placeholder:text-neutral-500 focus-visible:border-[#7a5af8]/60 focus-visible:ring-2 focus-visible:ring-[#7a5af8]/25"
const labelClass = "text-xs font-medium text-neutral-400"
// Native radio, colored purple to match the theme. Radios that share the same
// "name" can only have ONE checked at a time.
const radioClass = "size-4 cursor-pointer accent-[#7a5af8]"
// Row that wraps one radio + its text, so clicking the text selects the radio too.
const optionClass =
  "flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-0.5 text-sm text-neutral-300 transition-colors hover:text-white"

export function JobFilters() {
  // Empty on purpose: changing a filter must not change the URL / search query.
  // TODO: add (event) here, then use event.target.name + event.target.value
  // to load the jobs matching this filter.
  const handleFilterChange = () => {}

  const handleReset = () => {
    // TODO: clear all the filter inputs.
  }

  return (
    <aside className="rounded-xl border border-white/10 bg-[#141414] p-5 lg:sticky lg:top-20">
      {/* Panel title */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <SlidersHorizontalIcon className="size-4 text-[#9d8bff]" />
        <h2 className="text-sm font-semibold">Filters</h2>
      </div>

      <div className="mt-5 space-y-5">
        {/* Category — radio list: only ONE category can be picked at a time */}
        <div className="space-y-2">
          <p className={labelClass}>Category</p>
          {JOB_CATEGORIES.map((category) => (
            <label key={category} className={optionClass}>
              <input
                type="radio"
                name="category"
                value={category}
                className={radioClass}
                onChange={handleFilterChange}
              />
              {category}
            </label>
          ))}
        </div>

        {/* Job Type — radio list: only ONE type can be picked at a time */}
        <div className="space-y-2">
          <p className={labelClass}>Job Type</p>
          {JOB_TYPES.map((type) => (
            <label key={type} className={optionClass}>
              <input
                type="radio"
                name="type"
                value={type}
                className={radioClass}
                onChange={handleFilterChange}
              />
              {type}
            </label>
          ))}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="filter-location" className={labelClass}>
            Location
          </label>
          <input
            id="filter-location"
            name="location"
            type="text"
            placeholder="City or country"
            className={fieldClass}
            onChange={handleFilterChange}
          />
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <p className={labelClass}>Salary Range</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              name="salaryMin"
              type="number"
              min={0}
              placeholder="Min"
              aria-label="Minimum salary"
              className={fieldClass}
              onChange={handleFilterChange}
            />
            <input
              name="salaryMax"
              type="number"
              min={0}
              placeholder="Max"
              aria-label="Maximum salary"
              className={fieldClass}
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Reset */}
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCcwIcon className="size-3.5" />
          Reset filters
        </button>
      </div>
    </aside>
  )
}
