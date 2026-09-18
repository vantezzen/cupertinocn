import type * as React from "react"
import { cn } from "cn"
import "./cupertino.css"

function Spinner({
  className,
  "aria-label": label = "Loading",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("cupertino cupertino-spinner text-muted-foreground", className)}
      {...props}
    >
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} style={{ "--spoke": i } as React.CSSProperties} />
      ))}
    </span>
  )
}
export { Spinner }
