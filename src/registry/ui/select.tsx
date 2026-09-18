"use client"

import { Select as SelectPrimitive } from "@base-ui/react/select"
import { Check, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { cn } from "cn"
import { LiquidGlass, GlassSurface } from "./liquid-glass"
import "./cupertino.css"

/** Drop-in for shadcn/ui Select: a glass capsule trigger and an opaque glass list. */
const Select = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value
const SelectGroup = SelectPrimitive.Group
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & { size?: "sm" | "default" }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "cupertino cupertino-press cupertino-material flex min-h-11 min-w-36 items-center justify-between gap-3 rounded-full pr-3.5 pl-4 text-[17px] text-foreground data-disabled:opacity-40 data-[size=sm]:min-h-8 data-[size=sm]:min-w-28 data-[size=sm]:pl-3.5 data-[size=sm]:text-[15px]",
        className,
      )}
      {...props}
    >
      <GlassSurface variant="regular" />
      {children}
      <SelectPrimitive.Icon>
        <ChevronsUpDown className="size-4 text-muted-foreground" aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
function SelectContent({ className, children, ...props }: SelectPrimitive.Popup.Props) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner sideOffset={6} className="z-60">
        <SelectPrimitive.Popup
          render={<LiquidGlass variant="opaque" interactive={false} />}
          data-slot="select-content"
          className={cn(
            "cupertino cupertino-menu cupertino-panel max-h-[var(--available-height)] min-w-[var(--anchor-width)] overflow-y-auto rounded-[24px] p-1.5 text-foreground outline-none",
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}
function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex min-h-11 transition-colors duration-[120ms] items-center justify-between gap-5 rounded-full px-3 text-[17px] outline-none data-highlighted:bg-[var(--ios-fill-tertiary)] data-disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}
function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn("px-3 py-2 text-[13px] text-muted-foreground", className)}
      {...props}
    />
  )
}
function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("mx-3 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}
const scrollClass =
  "z-10 flex w-full items-center justify-center py-1 text-muted-foreground [&_svg]:size-4"
function SelectScrollUpButton({ className, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(scrollClass, "top-0", className)}
      {...props}
    >
      <ChevronUp />
    </SelectPrimitive.ScrollUpArrow>
  )
}
function SelectScrollDownButton({ className, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(scrollClass, "bottom-0", className)}
      {...props}
    >
      <ChevronDown />
    </SelectPrimitive.ScrollDownArrow>
  )
}
export {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
