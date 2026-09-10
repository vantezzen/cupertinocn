"use client"

import type * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"
import { Check, ChevronRight } from "lucide-react"
import { LiquidGlass } from "./liquid-glass"
import "./cupertino.css"

/** Drop-in for shadcn/ui DropdownMenu, rendered as an iOS context menu on opaque glass. */
function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

const panelClass =
  "cn-ios cn-menu cn-panel max-h-[var(--available-height)] min-w-56 overflow-y-auto rounded-[26px] p-1.5 text-foreground outline-none"

type MenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset">

/** A positioned opaque glass panel, shared by the menu and its submenus. */
function MenuPopup({
  className,
  side,
  align,
  sideOffset,
  alignOffset,
  ...props
}: MenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-60 outline-none"
      >
        <MenuPrimitive.Popup
          render={<LiquidGlass variant="opaque" interactive={false} />}
          className={cn(panelClass, className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuContent(props: MenuContentProps) {
  return (
    <MenuPopup
      data-slot="dropdown-menu-content"
      side="bottom"
      align="start"
      sideOffset={8}
      alignOffset={0}
      {...props}
    />
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("px-3.5 py-2 text-[13px] text-muted-foreground data-inset:pl-11", className)}
      {...props}
    />
  )
}

const itemClass =
  "flex min-h-11 transition-colors duration-[120ms] cursor-default items-center gap-3 rounded-[20px] px-3.5 py-2 text-[17px] leading-[22px] outline-none select-none data-highlighted:bg-[var(--ios-fill-tertiary)] data-disabled:opacity-35 data-inset:pl-11 [&_svg]:ml-auto [&_svg]:size-5 [&_svg]:shrink-0"

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & { inset?: boolean; variant?: "default" | "destructive" }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(itemClass, variant === "destructive" && "text-destructive", className)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(itemClass, className)}
      {...props}
    >
      {children}
      <MenuPrimitive.CheckboxItemIndicator className="ml-auto">
        <Check />
      </MenuPrimitive.CheckboxItemIndicator>
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(itemClass, className)}
      {...props}
    >
      {children}
      <MenuPrimitive.RadioItemIndicator className="ml-auto">
        <Check />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("mx-3 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Trailing hint, for example a keyboard shortcut. */
function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ml-auto text-[15px] tracking-[0.02em] text-[var(--ios-tertiary)]", className)}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(itemClass, className)}
      {...props}
    >
      {children}
      <ChevronRight />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent(props: MenuContentProps) {
  return (
    <MenuPopup
      data-slot="dropdown-menu-sub-content"
      side="inline-end"
      align="start"
      sideOffset={4}
      alignOffset={-6}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
