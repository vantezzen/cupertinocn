"use client"

import type * as React from "react"
import { cn } from "cn"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

/**
 * Drop-in for shadcn/ui Textarea: a glass field. The capsule is a wrapper around the native
 * textarea, so `className` shapes the wrapper and every other prop reaches the textarea.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <span
      data-slot="textarea-wrapper"
      className={cn(
        "cn-ios cn-field relative flex min-h-28 w-full min-w-0 rounded-[22px] text-[17px] leading-[22px] text-foreground",
        className,
      )}
    >
      <GlassSurface variant="regular" interactive={false} />
      <textarea
        data-slot="textarea"
        className="min-w-0 flex-1 resize-y rounded-[22px] bg-transparent px-[18px] py-3 text-foreground outline-none! placeholder:text-[var(--ios-tertiary)] disabled:cursor-not-allowed"
        {...props}
      />
    </span>
  )
}

export { Textarea }
