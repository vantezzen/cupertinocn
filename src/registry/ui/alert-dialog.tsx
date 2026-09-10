"use client"

import type * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "cn"
import { Button } from "./button"
import { LiquidGlass } from "./liquid-glass"
import "./cupertino.css"

/** Drop-in for shadcn/ui AlertDialog, rendered as an iOS alert on opaque glass. */
const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger
const AlertDialogPortal = AlertDialogPrimitive.Portal

function AlertDialogOverlay({ className, ...props }: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "cn-ios fixed inset-0 z-50 bg-black/24 transition-opacity duration-[240ms] data-starting-style:opacity-0 data-ending-style:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

/** An icon or image above the title. */
function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-[var(--ios-fill-tertiary)] text-primary [&_svg]:size-7",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({ className, ...props }: AlertDialogPrimitive.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        render={<LiquidGlass variant="opaque" interactive={false} />}
        data-slot="alert-dialog-content"
        className={cn(
          "cn-ios cn-panel cn-alert fixed top-1/2 left-1/2 z-51 max-h-[calc(100dvh-40px)] w-[300px] max-w-[calc(100vw-40px)] overflow-y-auto rounded-[36px] p-3.5 text-foreground outline-none",
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}
function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-header" className={cn("px-2 pt-1.5 pb-5", className)} {...props} />
  )
}
function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("text-[17px] leading-[22px] font-semibold", className)}
      {...props}
    />
  )
}
function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("mt-1 text-[17px] leading-[22px] text-muted-foreground", className)}
      {...props}
    />
  )
}
function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn("cn-alert-footer flex gap-2 [&>*]:min-w-0 [&>*]:flex-1", className)}
      {...props}
    />
  )
}
function AlertDialogCancel(props: AlertDialogPrimitive.Close.Props) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button variant="secondary" />}
      {...props}
    />
  )
}
function AlertDialogAction({
  variant = "default",
  ...props
}: AlertDialogPrimitive.Close.Props & { variant?: "default" | "destructive" }) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={<Button variant={variant} />}
      {...props}
    />
  )
}
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogMedia,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
