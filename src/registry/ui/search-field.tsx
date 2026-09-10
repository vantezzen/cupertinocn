"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "cn"
import { GlassSurface } from "./liquid-glass"
import "./cupertino.css"

type SearchFieldProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  clearLabel?: string
}

/** A glass search capsule with a clear button. */
function SearchField({
  className,
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Search",
  clearLabel = "Clear search",
  disabled,
  ...props
}: SearchFieldProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const input = React.useRef<HTMLInputElement>(null)
  const current = value ?? internal
  function update(next: string) {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  return (
    <div
      data-slot="search-field"
      className={cn(
        "cn-ios cn-field relative flex min-h-11 items-center gap-2 rounded-full pr-3 pl-3.5 text-muted-foreground",
        className,
      )}
    >
      <GlassSurface variant="regular" interactive={false} />
      <Search className="size-5 shrink-0" aria-hidden="true" />
      <input
        ref={input}
        type="search"
        aria-label={props["aria-label"] ?? (props["aria-labelledby"] ? undefined : placeholder)}
        placeholder={placeholder}
        disabled={disabled}
        value={current}
        onChange={(event) => update(event.target.value)}
        className="min-w-0 flex-1 appearance-none bg-transparent py-2 text-[17px] leading-[22px] text-foreground outline-none! placeholder:text-[var(--ios-tertiary)] [&::-webkit-search-cancel-button]:appearance-none"
        {...props}
      />
      {current && !disabled && !props.readOnly && (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => {
            update("")
            input.current?.focus()
          }}
          className="cn-dim relative flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--ios-tertiary)] text-[var(--ios-surface)] after:absolute after:-inset-3"
        >
          <X className="size-3" strokeWidth={3} />
        </button>
      )}
    </div>
  )
}

export { SearchField }
export type { SearchFieldProps }
