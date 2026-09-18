"use client"

import type * as React from "react"
import { cn } from "cn"
import "./cupertino.css"

type PageControlProps = Omit<React.ComponentProps<"nav">, "onChange"> & {
  count: number
  value: number
  onValueChange: (page: number) => void
  getPageLabel?: (page: number) => string
}
function PageControl({
  count,
  value,
  onValueChange,
  getPageLabel = (page) => `Page ${page + 1}`,
  className,
  ...props
}: PageControlProps) {
  return (
    <nav
      aria-label="Pages"
      data-slot="page-control"
      className={cn(
        "cupertino inline-flex items-center justify-center rounded-full px-1",
        className,
      )}
      {...props}
    >
      {Array.from({ length: Math.max(0, count) }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={getPageLabel(index)}
          aria-current={index === value ? "page" : undefined}
          onClick={() => onValueChange(index)}
          className="flex h-11 w-6 items-center justify-center rounded-full"
        >
          <span
            className={cn(
              "cupertino-page-dot size-[7px] rounded-full",
              index === value ? "bg-foreground" : "bg-[var(--ios-tertiary)]",
            )}
          />
        </button>
      ))}
    </nav>
  )
}
export { PageControl }
export type { PageControlProps }
