"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { mergeProps } from "@base-ui/react/merge-props"
import { cn } from "cn"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

/**
 * Drag support for the Base UI switch. Pressing widens the thumb into a lens; dragging moves it
 * along the track and previews the resulting state; releasing commits once through `click()`.
 */
function useSwitchGestures() {
  const gesture = React.useRef<{
    pointer: number
    start: number
    offset: number
    travel: number
    scale: number
    rtl: boolean
    moved: boolean
  } | null>(null)
  const suppressClick = React.useRef(false)

  function finish(element: HTMLElement) {
    const current = gesture.current
    gesture.current = null
    element.removeAttribute("data-switch-dragging")
    element.removeAttribute("data-switch-preview")
    element.style.removeProperty("--switch-x")
    if (current && element.hasPointerCapture(current.pointer))
      element.releasePointerCapture(current.pointer)
  }

  return {
    onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
      if (!event.defaultPrevented && event.key === "Escape" && gesture.current) {
        event.preventDefault()
        finish(event.currentTarget)
        suppressClick.current = true
      }
    },
    onPointerDown(event: React.PointerEvent<HTMLElement>) {
      suppressClick.current = false
      const element = event.currentTarget
      if (
        gesture.current ||
        event.defaultPrevented ||
        event.button !== 0 ||
        element.hasAttribute("data-disabled") ||
        element.getAttribute("aria-readonly") === "true"
      )
        return
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element)
      // Travel of the pressed thumb: track minus pressed thumb width minus the 2px inset per side.
      const pressedWidth = parseFloat(style.getPropertyValue("--switch-w-pressed")) || 47
      const travel = element.clientWidth - pressedWidth - 4
      if (travel <= 0 || !rect.width) return
      gesture.current = {
        pointer: event.pointerId,
        start: event.clientX,
        offset: element.getAttribute("aria-checked") === "true" ? travel : 0,
        travel,
        scale: element.clientWidth / rect.width,
        rtl: style.direction === "rtl",
        moved: false,
      }
      element.setPointerCapture(event.pointerId)
    },
    onPointerMove(event: React.PointerEvent<HTMLElement>) {
      const g = gesture.current
      if (!g || event.pointerId !== g.pointer || event.defaultPrevented) return
      const delta = (event.clientX - g.start) * g.scale * (g.rtl ? -1 : 1)
      if (Math.abs(delta) < 3 && !g.moved) return
      g.moved = true
      const offset = Math.max(0, Math.min(g.travel, g.offset + delta))
      const element = event.currentTarget
      element.setAttribute("data-switch-dragging", "")
      element.setAttribute("data-switch-preview", offset > g.travel / 2 ? "on" : "off")
      element.style.setProperty("--switch-x", `${offset * (g.rtl ? -1 : 1)}px`)
    },
    onPointerUp(event: React.PointerEvent<HTMLElement>) {
      const g = gesture.current
      if (!g || event.pointerId !== g.pointer) return
      const element = event.currentTarget
      const delta = (event.clientX - g.start) * g.scale * (g.rtl ? -1 : 1)
      const next = g.offset + delta > g.travel / 2
      const rect = element.getBoundingClientRect()
      finish(element)
      if (!g.moved) return
      if (
        !event.defaultPrevented &&
        event.clientY >= rect.top - 20 &&
        event.clientY <= rect.bottom + 20 &&
        next !== (element.getAttribute("aria-checked") === "true")
      )
        element.click()
      suppressClick.current = true
    },
    onPointerCancel(event: React.PointerEvent<HTMLElement>) {
      if (event.pointerId === gesture.current?.pointer) {
        finish(event.currentTarget)
        suppressClick.current = true
      }
    },
    onLostPointerCapture(event: React.PointerEvent<HTMLElement>) {
      if (event.pointerId === gesture.current?.pointer) finish(event.currentTarget)
    },
    onClickCapture(event: React.MouseEvent<HTMLElement>) {
      if (suppressClick.current && event.detail !== 0) {
        event.preventDefault()
        event.stopPropagation()
        suppressClick.current = false
      }
    },
  }
}

/** Drop-in for shadcn/ui Switch. `sm` is the same capsule at three quarters. */
function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & { size?: "sm" | "default" }) {
  const gestures = useSwitchGestures()
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn("cupertino cupertino-switch", className)}
      {...mergeProps(gestures, props)}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className="cupertino-switch-thumb">
        <GlassSurface
          variant="clear"
          strength={0.6}
          interactive={false}
          refract={<span aria-hidden="true" className="cupertino-switch-copy" />}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
