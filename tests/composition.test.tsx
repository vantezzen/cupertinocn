import { afterEach, expect, test } from "bun:test"
import { act, cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "../src/registry/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../src/registry/ui/alert-dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../src/registry/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../src/registry/ui/dropdown-menu"
import { TabBar, TabBarList, TabBarTrigger, TabBarContent } from "../src/registry/ui/tab-bar"
import { AppShell, AppShellList, AppShellItem, AppShellContent } from "../src/registry/ui/app-shell"
import { List } from "../src/registry/ui/list"
import { Toaster, toast } from "../src/registry/ui/toast"

afterEach(cleanup)

test("alert traps focus, invokes an action once, and returns focus to its trigger", async () => {
  const user = userEvent.setup()
  let saved = 0
  render(
    <AlertDialog>
      <AlertDialogTrigger render={<Button />}>Open alert</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Save changes?</AlertDialogTitle>
          <AlertDialogDescription>Your changes will be saved.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => saved++}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>,
  )
  const trigger = screen.getByRole("button", { name: "Open alert" })
  await user.click(trigger)
  const dialog = screen.getByRole("alertdialog", { name: "Save changes?" })
  await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true))
  await user.click(screen.getByRole("button", { name: "Save", exact: true }))
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBe(null))
  expect(saved).toBe(1)
  await waitFor(() => expect(document.activeElement).toBe(trigger))
})

test("segmented control supports arrow keys and changes its associated panel", async () => {
  const user = userEvent.setup()
  render(
    <Tabs defaultValue="day">
      <TabsList aria-label="Period">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
      </TabsList>
      <TabsContent value="day">Today</TabsContent>
      <TabsContent value="week">This week</TabsContent>
    </Tabs>,
  )
  await user.click(screen.getByRole("tab", { name: "Day" }))
  await user.keyboard("{ArrowRight}")
  expect(screen.getByRole("tab", { name: "Week" }).getAttribute("aria-selected")).toBe("true")
  expect(screen.getByRole("tabpanel").textContent).toBe("This week")
})

test("menu supports keyboard selection and closes after an action", async () => {
  const user = userEvent.setup()
  let selected = false
  render(
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button />}>Options</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            selected = true
          }}
        >
          Copy
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  )
  await user.tab()
  await user.keyboard("{ArrowDown}")
  await waitFor(() =>
    expect(screen.getByRole("menuitem", { name: "Copy" })).toBe(document.activeElement),
  )
  await user.keyboard("{Enter}")
  expect(selected).toBe(true)
  await waitFor(() => expect(screen.queryByRole("menu")).toBe(null))
})

test("tab bar lenses render an inert copy that stays hidden from assistive technology", () => {
  render(
    <TabBar defaultValue="home">
      <TabBarList aria-label="Views">
        <TabBarTrigger value="home">Home</TabBarTrigger>
        <TabBarTrigger value="search">Search</TabBarTrigger>
      </TabBarList>
      <TabBarContent value="home">Home content</TabBarContent>
      <TabBarContent value="search">Search content</TabBarContent>
    </TabBar>,
  )
  expect(screen.getAllByRole("tab")).toHaveLength(2)
  expect(screen.getAllByRole("tab", { hidden: true })).toHaveLength(4)
  const copy = document.querySelector("[data-glass-copy]")!
  expect(copy.getAttribute("aria-hidden")).toBe("true")
  expect(copy.hasAttribute("inert")).toBe(true)
  expect(copy.textContent).toBe("HomeSearch")
})

test("the callable toast and the Toaster share one manager", async () => {
  render(<Toaster />)
  act(() => {
    toast("Saved", "Your changes are safe.")
  })
  await waitFor(() => expect(screen.getByText("Saved")).toBeTruthy())
  expect(screen.getByText("Your changes are safe.")).toBeTruthy()
  act(() => {
    toast.add({ title: "From the manager" })
  })
  await waitFor(() => expect(screen.getByText("From the manager")).toBeTruthy())
})

test("app shell shows the first page by default on wide viewports and switches on selection", async () => {
  const user = userEvent.setup()
  const changes: (string | null)[] = []
  render(
    <AppShell onValueChange={(value) => changes.push(value)}>
      <AppShellList aria-label="Sections">
        <List>
          <AppShellItem value="wifi">Wi-Fi</AppShellItem>
          <AppShellItem value="bluetooth">Bluetooth</AppShellItem>
        </List>
      </AppShellList>
      <AppShellContent value="wifi" title="Wi-Fi">
        Wi-Fi page
      </AppShellContent>
      <AppShellContent value="bluetooth" title="Bluetooth">
        Bluetooth page
      </AppShellContent>
    </AppShell>,
  )
  await waitFor(() => expect(screen.getByRole("region", { name: "Wi-Fi" })).toBeTruthy())
  expect(screen.getByRole("button", { name: "Wi-Fi" }).getAttribute("aria-current")).toBe("page")
  expect(screen.queryByText("Bluetooth page")).toBe(null)
  await user.click(screen.getByRole("button", { name: "Bluetooth" }))
  expect(screen.getByRole("region", { name: "Bluetooth" })).toBeTruthy()
  expect(screen.queryByText("Wi-Fi page")).toBe(null)
  expect(changes).toEqual(["bluetooth"])
  // Wide layouts have no back button.
  expect(screen.queryByRole("button", { name: "Back" })).toBe(null)
})
