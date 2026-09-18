"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { cn } from "cn"
import { LiquidGlass } from "./liquid-glass"
import "./cupertino.css"

/** A floating glass capsule of actions. `className` shapes and positions the capsule. */
function Toolbar({
  className,
  ...props
}: Omit<ToolbarPrimitive.Root.Props, "className"> & { className?: string }) {
  return (
    <LiquidGlass variant="regular" interactive={false} className={className}>
      <ToolbarPrimitive.Root
        data-slot="toolbar"
        className="cupertino flex min-h-14 items-center gap-0.5 rounded-full p-1.5 text-foreground"
        {...props}
      />
    </LiquidGlass>
  )
}

function ToolbarButton({ className, ...props }: ToolbarPrimitive.Button.Props) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cn(
        "cupertino-press cupertino-toolbar-button flex size-11 items-center justify-center rounded-full data-disabled:opacity-35 [&_svg]:size-[22px]",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarSeparator({ className, ...props }: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator className={cn("mx-1 h-6 w-px bg-border", className)} {...props} />
  )
}

export { Toolbar, ToolbarButton, ToolbarSeparator }
