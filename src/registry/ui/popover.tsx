"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import type * as React from "react"
import { cn } from "cn"
import { LiquidGlass } from "./liquid-glass"
import "./cupertino.css"

/** Drop-in for shadcn/ui Popover on opaque glass. */
const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverClose = PopoverPrimitive.Close
function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "side" | "align" | "sideOffset">) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-60"
      >
        <PopoverPrimitive.Popup
          render={<LiquidGlass variant="opaque" interactive={false} />}
          data-slot="popover-content"
          className={cn(
            "cupertino cupertino-menu cupertino-panel max-h-[var(--available-height)] w-72 max-w-[calc(100vw-24px)] overflow-y-auto rounded-[28px] p-5 text-foreground outline-none",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}
function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="popover-header" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}
function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      className={cn("text-[17px] leading-[22px] font-semibold", className)}
      {...props}
    />
  )
}
function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      className={cn("mt-2 text-[15px] leading-5 text-muted-foreground", className)}
      {...props}
    />
  )
}
export {
  Popover,
  PopoverTrigger,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
}
