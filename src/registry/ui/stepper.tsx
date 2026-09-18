"use client"

import { NumberField } from "@base-ui/react/number-field"
import { Minus, Plus } from "lucide-react"
import { cn } from "cn"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

const stepClass =
  "cupertino-stepper-button relative flex h-11 w-12 items-center justify-center text-foreground data-disabled:opacity-30 [&_svg]:size-5"

type StepperProps = NumberField.Root.Props & {
  /** Accessible name of the decrement button. Defaults to "Decrease". */
  decrementLabel?: string
  /** Accessible name of the increment button. Defaults to "Increase". */
  incrementLabel?: string
}

/**
 * A glass capsule with decrement and increment buttons. The whole capsule is pulled toward the
 * pressed side; buttons repeat while held.
 */
function Stepper({
  className,
  "aria-label": label,
  decrementLabel = "Decrease",
  incrementLabel = "Increase",
  ...props
}: StepperProps) {
  return (
    <NumberField.Root
      data-slot="stepper"
      className={cn("cupertino inline-flex items-center gap-3 text-foreground", className)}
      {...props}
    >
      <NumberField.Input
        aria-label={label ?? "Value"}
        className="w-12 bg-transparent text-center text-[17px] tabular-nums outline-none"
      />
      <NumberField.Group className="cupertino-material flex items-center rounded-full">
        <GlassSurface variant="regular" />
        <NumberField.Decrement
          aria-label={decrementLabel}
          className={cn(stepClass, "rounded-l-full")}
        >
          <Minus />
        </NumberField.Decrement>
        <span aria-hidden="true" className="h-5 w-px bg-border" />
        <NumberField.Increment
          aria-label={incrementLabel}
          className={cn(stepClass, "rounded-r-full")}
        >
          <Plus />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}

export { Stepper }
export type { StepperProps }
