"use client"

import type * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"
import { LiquidGlass, GlassSurface } from "./liquid-glass"
import "./cupertino.css"

const ActionSheet = DialogPrimitive.Root
const ActionSheetTrigger = DialogPrimitive.Trigger
function ActionSheetContent({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="action-sheet-overlay"
        className="cupertino fixed inset-0 z-50 bg-black/24 transition-opacity duration-[240ms] data-starting-style:opacity-0 data-ending-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="action-sheet-content"
        className={cn(
          "cupertino cupertino-action-sheet fixed inset-x-1.5 bottom-[max(6px,calc(env(safe-area-inset-bottom)-6px))] z-51 mx-auto max-h-[calc(100dvh-28px)] max-w-[calc(var(--container-sm)+12px)] overflow-y-auto p-1.5 text-foreground outline-none",
          className,
        )}
        {...props}
      />
    </DialogPrimitive.Portal>
  )
}
function ActionSheetGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <LiquidGlass
      variant="opaque"
      interactive={false}
      data-slot="action-sheet-group"
      className={cn("cupertino-panel overflow-hidden rounded-[30px] p-2", className)}
      {...props}
    />
  )
}
function ActionSheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      className={cn("px-4 pt-4 pb-1 text-center text-[15px] leading-5 font-semibold", className)}
      {...props}
    />
  )
}
function ActionSheetDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      className={cn(
        "px-4 pb-4 text-center text-[13px] leading-[18px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}
function ActionSheetAction({
  className,
  variant = "default",
  ...props
}: DialogPrimitive.Close.Props & { variant?: "default" | "destructive" }) {
  return (
    <DialogPrimitive.Close
      data-slot="action-sheet-action"
      data-variant={variant}
      className={cn(
        "flex min-h-13 w-full items-center justify-center rounded-full px-4 text-[17px] font-medium active:bg-[var(--ios-fill-tertiary)]",
        variant === "destructive" ? "text-destructive" : "text-primary",
        className,
      )}
      {...props}
    />
  )
}
function ActionSheetCancel({ className, children, ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="action-sheet-cancel"
      className={cn(
        "cupertino-press cupertino-material mt-2 min-h-14 w-full rounded-full text-[17px] font-semibold text-foreground",
        className,
      )}
      {...props}
    >
      <GlassSurface variant="regular" />
      {children}
    </DialogPrimitive.Close>
  )
}
export {
  ActionSheet,
  ActionSheetTrigger,
  ActionSheetContent,
  ActionSheetGroup,
  ActionSheetTitle,
  ActionSheetDescription,
  ActionSheetAction,
  ActionSheetCancel,
}
