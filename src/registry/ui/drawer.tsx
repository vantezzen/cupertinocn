"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "cn"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

/**
 * Drop-in for shadcn/ui Drawer, rendered as an iOS sheet on opaque glass. Only the bottom edge is
 * styled; the swipe handle is shown by default because iOS sheets always carry a grabber.
 */

type DrawerContextValue = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
}

const DrawerContext = React.createContext<DrawerContextValue>({
  hasSnapPoints: false,
  modal: true,
  showSwipeHandle: true,
})

function Drawer({
  modal = true,
  showSwipeHandle = true,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerPrimitive.Root.Props & { showSwipeHandle?: boolean }) {
  const value = React.useMemo(
    () => ({ hasSnapPoints: !!snapPoints?.length, modal, showSwipeHandle }),
    [snapPoints, modal, showSwipeHandle],
  )
  return (
    <DrawerContext.Provider value={value}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "cupertino cupertino-sheet-backdrop fixed inset-0 z-50 bg-black/24 transition-opacity duration-[240ms] data-starting-style:opacity-0 data-ending-style:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

/** The grabber. */
function DrawerSwipeHandle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="drawer-swipe-handle"
      className={cn("flex h-6 shrink-0 touch-none items-center justify-center", className)}
      {...props}
    >
      <div className="h-[5px] w-9 rounded-full bg-[var(--ios-tertiary)]" />
    </div>
  )
}

function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
  const { hasSnapPoints, modal, showSwipeHandle } = React.useContext(DrawerContext)
  return (
    <DrawerPortal>
      {modal === true && <DrawerOverlay />}
      <DrawerPrimitive.Viewport className="pointer-events-none fixed inset-0 z-51 flex items-end justify-center">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-snap-points={hasSnapPoints ? "" : undefined}
          className={cn(
            "cupertino cupertino-sheet cupertino-material pointer-events-auto relative flex data-snap-points:h-[calc(100dvh-3rem)] max-h-[calc(100dvh-3rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-[36px] bg-transparent pb-[env(safe-area-inset-bottom)] text-foreground shadow-[0_-8px_40px_-12px_rgb(0_0_0/25%)] outline-none",
            className,
          )}
          {...props}
        >
          <GlassSurface variant="opaque" interactive={false} />
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content className="min-h-0 overflow-y-auto overscroll-contain">
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn("px-6 pt-2 pb-5", className)} {...props} />
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-[22px] leading-7 font-bold", className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("mt-2 text-[15px] leading-5 text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
