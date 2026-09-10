"use client"

import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { cn } from "cn"
import "./cupertino.css"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("cn-ios grid gap-4 text-foreground", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "cn-choice relative flex size-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--ios-tertiary)] after:absolute after:-inset-3 data-checked:border-primary data-disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="cn-choice-indicator size-3 rounded-full bg-primary" />
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
