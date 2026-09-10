import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import "./cupertino.css"

/** Drop-in for shadcn/ui Badge. `destructive` is the red iOS notification count. */
const badgeVariants = cva(
  "cn-ios inline-flex h-5 min-w-5 shrink-0 items-center justify-center gap-1 rounded-full px-1.5 text-[13px] leading-none font-semibold tabular-nums [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        secondary: "bg-[var(--ios-fill-secondary)] text-foreground",
        destructive: "bg-destructive text-white",
        outline: "shadow-[inset_0_0_0_1px_var(--ios-separator)] text-foreground",
        ghost: "text-muted-foreground",
        link: "text-primary underline-offset-2 hover:underline",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
