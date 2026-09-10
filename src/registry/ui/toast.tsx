"use client"

import type * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { X } from "lucide-react"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

/**
 * Drop-in for shadcn/ui Toast. `toast` is the shared manager, so `toast.add({ title })` works as
 * in shadcn; it is also callable as `toast(title, description)` for the common case.
 */
const manager = ToastPrimitive.createToastManager()

const toast = Object.assign(
  (title: React.ReactNode, description?: React.ReactNode) => manager.add({ title, description }),
  manager,
)

function Toaster({
  children,
  toastManager = manager,
  timeout = 4000,
  ...props
}: Partial<ToastPrimitive.Provider.Props>) {
  return (
    <ToastPrimitive.Provider toastManager={toastManager} timeout={timeout} {...props}>
      {children}
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport className="cn-ios fixed inset-x-4 top-[max(16px,env(safe-area-inset-top))] z-100 mx-auto flex max-w-sm flex-col gap-2 outline-none">
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()
  return toasts.map((item) => (
    <ToastPrimitive.Root
      key={item.id}
      toast={item}
      data-slot="toast"
      className="cn-toast cn-panel cn-material flex items-start gap-3 rounded-[26px] p-4 text-foreground"
    >
      <GlassSurface variant="opaque" interactive={false} />
      <ToastPrimitive.Content className="min-w-0 flex-1">
        <ToastPrimitive.Title className="text-[15px] leading-5 font-semibold" />
        <ToastPrimitive.Description className="mt-0.5 text-[13px] leading-[18px] text-muted-foreground" />
      </ToastPrimitive.Content>
      <ToastPrimitive.Close
        aria-label="Dismiss notification"
        className="cn-dim relative flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--ios-fill-secondary)] text-muted-foreground after:absolute after:-inset-2"
      >
        <X className="size-3.5" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  ))
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export { Toaster, toast, createToastManager, useToastManager }
