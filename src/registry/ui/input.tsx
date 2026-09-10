"use client"

import type * as React from "react"
import { cn } from "cn"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

/**
 * Drop-in for shadcn/ui Input: a glass text field. The capsule is a wrapper around the native
 * input, so `className` shapes the wrapper and every other prop, including `ref`, reaches the input.
 */
function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <span
      data-slot="input-wrapper"
      className={cn(
        "cn-ios cn-field relative flex min-h-11 w-full min-w-0 rounded-full text-[17px] leading-[22px] text-foreground",
        className,
      )}
    >
      <GlassSurface variant="regular" interactive={false} />
      <input
        type={type}
        data-slot="input"
        className="min-w-0 flex-1 bg-transparent px-[18px] py-2.5 text-foreground outline-none! placeholder:text-[var(--ios-tertiary)] disabled:cursor-not-allowed"
        {...props}
      />
    </span>
  )
}

export { Input }
