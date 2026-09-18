"use client"

import type * as React from "react"
import { cn } from "cn"
import "./cupertino.css"

function List({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="list"
      className={cn(
        "cupertino overflow-hidden rounded-[26px] bg-card text-foreground shadow-[0_0_0_0.5px_rgb(0_0_0/4%)]",
        className,
      )}
      {...props}
    />
  )
}
function ListItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="list-item"
      className={cn(
        "relative flex min-h-11 items-center gap-3 px-4 py-2.5 text-[17px] leading-[22px] after:absolute after:right-0 after:bottom-0 after:left-4 after:h-px after:scale-y-50 after:bg-border last:after:hidden has-[[data-slot=list-icon]]:after:left-[60px]",
        className,
      )}
      {...props}
    />
  )
}
function ListIcon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="list-icon"
      className={cn(
        "flex size-[29px] shrink-0 items-center justify-center rounded-[7px] bg-primary text-white [&_svg]:size-[19px]",
        className,
      )}
      {...props}
    />
  )
}
function ListTitle({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="list-title" className={cn("min-w-0 flex-1", className)} {...props} />
}
function ListValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="list-value"
      className={cn(
        "flex shrink-0 items-center gap-1 text-muted-foreground [&_svg]:size-4 [&_svg]:text-[var(--ios-tertiary)]",
        className,
      )}
      {...props}
    />
  )
}
function ListHeader({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="list-header"
      className={cn(
        "cupertino px-4 pt-5 pb-2 text-[13px] leading-[18px] text-muted-foreground uppercase tracking-[0.02em]",
        className,
      )}
      {...props}
    />
  )
}
function ListFooter({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="list-footer"
      className={cn(
        "cupertino px-4 pt-2 text-[13px] leading-[18px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}
export { List, ListItem, ListIcon, ListTitle, ListValue, ListHeader, ListFooter }
