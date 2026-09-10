"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "cn"
import { NavigationBar, NavigationBarBack, NavigationBarTitle } from "./navigation-bar"
import "./cupertino.css"

/**
 * Master-detail navigation, the pattern behind iOS Settings and Mail. Compose it like Tabs: `AppShellItem`s
 * inside `AppShellList` select an `AppShellContent` by value. On narrow viewports the list fills the
 * shell and a selected page pushes in from the right with a back button and an edge-swipe to
 * return. On wider viewports the list stays on the left and the page on the right, defaulting to
 * the first item.
 */

type ShellContext = {
  /** Selected value, or null for the bare list on mobile. */
  value: string | null
  /** Page kept mounted while it slides out. */
  shown: string | null
  mobile: boolean
  select(value: string | null): void
  /** Items announce their values so wide layouts can default to the first one. Returns the unregister. */
  register(value: string): () => void
  titleId: string
}

const Context = React.createContext<ShellContext | null>(null)

function useShell(part: string) {
  const context = React.useContext(Context)
  if (!context) throw new Error(`${part} must be rendered inside AppShell.`)
  return context
}

function useMediaQuery(query: string) {
  return React.useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Width in CSS pixels below which the shell stacks the list and the page. */
const MOBILE_BREAKPOINT = 768
/** Width of the strip along the left edge that starts a swipe back. */
const SWIPE_EDGE = 32
/** Duration of the push and pop transition, matched by the CSS. */
const TRANSITION_MS = 460

type AppShellProps = Omit<React.ComponentProps<"div">, "defaultValue"> & {
  /** Selected page. `null` shows the bare list on mobile. */
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /** Viewport width below which the shell stacks. Defaults to 768. */
  breakpoint?: number
}

function AppShell({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  breakpoint = MOBILE_BREAKPOINT,
  className,
  children,
  ...props
}: AppShellProps) {
  const mobile = useMediaQuery(`(max-width: ${breakpoint - 0.02}px)`)
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(defaultValue)
  const value = valueProp === undefined ? uncontrolled : valueProp
  const [registered, setRegistered] = React.useState<string[]>([])
  const register = React.useCallback((item: string) => {
    setRegistered((values) => [...values, item])
    return () => setRegistered((values) => values.filter((value) => value !== item))
  }, [])
  // Wide layouts always show a page, so an empty selection falls back to the first item.
  const effective = value ?? (mobile ? null : (registered[0] ?? null))
  const [shown, setShown] = React.useState<string | null>(effective)
  const [seen, setSeen] = React.useState(effective)
  if (seen !== effective) {
    setSeen(effective)
    if (effective !== null) setShown(effective)
  }
  // On mobile the page slides out before it unmounts.
  React.useEffect(() => {
    if (effective !== null || shown === null) return
    const timer = setTimeout(() => setShown(null), TRANSITION_MS)
    return () => clearTimeout(timer)
  }, [effective, shown])
  const select = React.useCallback(
    (next: string | null) => {
      if (valueProp === undefined) setUncontrolled(next)
      onValueChange?.(next)
    },
    [valueProp, onValueChange],
  )
  const titleId = React.useId()
  const context = React.useMemo<ShellContext>(
    () => ({ value: effective, shown, mobile, select, register, titleId }),
    [effective, shown, mobile, select, register, titleId],
  )
  return (
    <Context.Provider value={context}>
      <div
        data-slot="app-shell"
        data-mobile={mobile || undefined}
        data-detail={mobile && effective !== null ? "" : undefined}
        className={cn(
          "cn-ios cn-app-shell relative grid h-full min-h-0 overflow-hidden bg-muted text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </Context.Provider>
  )
}

/** The list column. Give it an `aria-label`; put a `LargeTitle` and `List`s inside. */
function AppShellList({ className, children, ...props }: React.ComponentProps<"nav">) {
  const { mobile, value } = useShell("AppShellList")
  return (
    <nav
      data-slot="app-shell-list"
      className={cn(
        "cn-app-shell-list min-h-0 overflow-y-auto bg-muted px-4 pb-6 [scrollbar-width:thin]",
        !mobile && "border-r-[0.5px] border-border",
        className,
      )}
      // The list stays mounted under a pushed page so it can slide back in; keep it out of the
      // accessibility tree and tab order meanwhile.
      inert={mobile && value !== null ? true : undefined}
      {...props}
    >
      {children}
    </nav>
  )
}

type AppShellItemProps = Omit<React.ComponentProps<"li">, "value"> & {
  value: string
  /** Icon tile, usually a `ListIcon`. */
  icon?: React.ReactNode
  /** Trailing text, for example the current setting. */
  detail?: React.ReactNode
}

/** A row that selects a page. Render it inside a `List`. */
function AppShellItem({ value, icon, detail, className, children, ...props }: AppShellItemProps) {
  const shell = useShell("AppShellItem")
  const { register } = shell
  React.useEffect(() => register(value), [register, value])
  const active = shell.value === value
  // On wide screens the selected row is filled with the accent, as in iPadOS Settings.
  const filled = active && !shell.mobile
  return (
    <li
      data-slot="app-shell-item"
      data-active={active || undefined}
      className={cn(
        // Same geometry and inset separator as ListItem, so rows mix with plain ListItems.
        "relative list-none after:absolute after:right-0 after:bottom-0 after:left-4 after:h-px after:scale-y-50 after:bg-border last:after:hidden has-[[data-slot=list-icon]]:after:left-[60px]",
        filled && "after:hidden",
        !shell.mobile && "has-[+[data-active]]:after:hidden",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={() => shell.select(value)}
        className={cn(
          "relative flex min-h-11 w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[17px] leading-[22px] transition-colors duration-[120ms] active:bg-[var(--ios-fill-tertiary)] active:duration-[40ms]",
          filled && "bg-primary text-white active:bg-primary",
        )}
      >
        {icon}
        <span className="min-w-0 flex-1">{children}</span>
        {detail !== undefined && (
          <span className={cn("shrink-0", filled ? "text-white/80" : "text-muted-foreground")}>
            {detail}
          </span>
        )}
        {shell.mobile && (
          <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-[var(--ios-tertiary)]" />
        )}
      </button>
    </li>
  )
}

type AppShellContentProps = Omit<React.ComponentProps<"section">, "title"> & {
  value: string
  /** Page title: centered in the navigation bar on phones, a page heading on wider screens. */
  title: React.ReactNode
  /** One line under the title. */
  subtitle?: React.ReactNode
  /** Label of the back button on mobile. Defaults to a plain chevron. */
  backLabel?: React.ReactNode
  /** Controls on the trailing side of the bar or heading. */
  actions?: React.ReactNode
}

const subtitleClass = "text-[15px] leading-5 text-muted-foreground"
const actionsClass = "flex min-w-11 shrink-0 items-center justify-end gap-2"

/**
 * A page. Only the selected page renders; on mobile the leaving page stays until it slid out.
 * Phones get a navigation bar with a back button; wider screens get a left-aligned page heading and
 * a content column of readable width.
 */
function AppShellContent({
  value,
  title,
  subtitle,
  backLabel,
  actions,
  className,
  children,
  ...props
}: AppShellContentProps) {
  const shell = useShell("AppShellContent")
  if (shell.shown !== value) return null
  const headingId = `${shell.titleId}-${value}`
  return (
    <AppShellPage headingId={headingId} className={className} {...props}>
      {shell.mobile ? (
        <>
          <NavigationBar aria-label={typeof title === "string" ? `${title} navigation` : undefined}>
            <NavigationBarBack onClick={() => shell.select(null)}>{backLabel}</NavigationBarBack>
            <NavigationBarTitle id={headingId}>{title}</NavigationBarTitle>
            <span className={actionsClass}>{actions}</span>
          </NavigationBar>
          {subtitle && <p className={cn(subtitleClass, "px-4 pt-1 pb-3")}>{subtitle}</p>}
        </>
      ) : (
        // Wide: a page heading and a content column of readable width instead of a phone bar.
        <header className="mx-auto flex w-full max-w-[1040px] items-start justify-between gap-4 px-9 pt-8 pb-2">
          <div>
            <h1 id={headingId} className="text-[28px] leading-[34px] font-bold tracking-[-0.4px]">
              {title}
            </h1>
            {subtitle && <p className={cn(subtitleClass, "pt-1.5")}>{subtitle}</p>}
          </div>
          {actions && <div className={actionsClass}>{actions}</div>}
        </header>
      )}
      <div
        className={cn(
          "min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]",
          shell.mobile ? "px-4 pb-6" : "mx-auto w-full max-w-[1040px] px-9 pt-2 pb-10",
        )}
      >
        {children}
      </div>
    </AppShellPage>
  )
}

/** The page pane: hosts the push transition and the edge swipe. */
function AppShellPage({
  headingId,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { headingId: string }) {
  const shell = useShell("AppShellContent")
  const pane = React.useRef<HTMLElement>(null)
  const swipe = React.useRef<{ pointer: number; startX: number; startTime: number } | null>(null)

  function finish(element: HTMLElement) {
    swipe.current = null
    element.removeAttribute("data-swiping")
    element.parentElement?.style.removeProperty("--shell-drag")
  }

  return (
    <section
      ref={pane}
      data-slot="app-shell-page"
      role="region"
      aria-labelledby={headingId}
      className={cn("cn-app-shell-page flex min-h-0 flex-col overflow-hidden bg-muted", className)}
      onPointerDown={(event) => {
        if (!shell.mobile || swipe.current || event.button !== 0) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX - rect.left > SWIPE_EDGE) return
        swipe.current = {
          pointer: event.pointerId,
          startX: event.clientX,
          startTime: event.timeStamp,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        const current = swipe.current
        if (!current || event.pointerId !== current.pointer) return
        const dx = Math.max(0, event.clientX - current.startX)
        event.currentTarget.setAttribute("data-swiping", "")
        event.currentTarget.parentElement?.style.setProperty("--shell-drag", `${dx}px`)
      }}
      onPointerUp={(event) => {
        const current = swipe.current
        if (!current || event.pointerId !== current.pointer) return
        const dx = event.clientX - current.startX
        const velocity = dx / Math.max(1, event.timeStamp - current.startTime)
        const width = event.currentTarget.getBoundingClientRect().width
        finish(event.currentTarget)
        if (dx > width / 3 || velocity > 0.6) shell.select(null)
      }}
      onPointerCancel={(event) => finish(event.currentTarget)}
      {...props}
    >
      {children}
    </section>
  )
}

export { AppShell, AppShellList, AppShellItem, AppShellContent }
export type { AppShellProps, AppShellItemProps, AppShellContentProps }
