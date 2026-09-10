import { afterEach, expect, spyOn, test } from "bun:test"
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TabBar, TabBarList, TabBarTrigger, TabBarContent } from "../src/registry/ui/tab-bar"
import { Switch } from "../src/registry/ui/switch"

const restores: (() => void)[] = []
afterEach(() => {
  cleanup()
  restores.splice(0).forEach((restore) => restore())
})

function fixture(onValueChange?: Parameters<typeof TabBar>[0]["onValueChange"]) {
  render(
    <TabBar defaultValue="home" onValueChange={onValueChange}>
      <TabBarList aria-label="Views">
        <TabBarTrigger value="home">Home</TabBarTrigger>
        <TabBarTrigger value="disabled" disabled>
          Unavailable
        </TabBarTrigger>
        <TabBarTrigger value="search">Search</TabBarTrigger>
      </TabBarList>
      <TabBarContent value="home">Home content</TabBarContent>
      <TabBarContent value="search">Search content</TabBarContent>
    </TabBar>,
  )
  const list = screen.getByRole("tablist")
  const tabs = screen.getAllByRole("tab")
  const box = (left: number, width: number) => ({
    left,
    right: left + width,
    top: 0,
    bottom: 64,
    width,
    height: 64,
    x: left,
    y: 0,
    toJSON: () => ({}),
  })
  spyOn(list, "getBoundingClientRect").mockReturnValue(box(0, 300))
  const width = Object.getOwnPropertyDescriptor(list, "offsetWidth")
  Object.defineProperty(list, "offsetWidth", { configurable: true, value: 300 })
  restores.push(() => {
    if (width) Object.defineProperty(list, "offsetWidth", width)
  })
  tabs.forEach((tab, i) => spyOn(tab, "getBoundingClientRect").mockReturnValue(box(i * 100, 100)))
  return { list, home: tabs[0], disabled: tabs[1], search: tabs[2] }
}
const point = (x: number) => ({
  pointerId: 1,
  button: 0,
  clientX: x,
  clientY: 32,
  pointerType: "mouse",
})

test("tab scrubbing previews without changing content, then commits once on release", async () => {
  const changes: unknown[] = []
  const { list, home, search } = fixture((value) => changes.push(value))
  fireEvent.pointerDown(home, point(50))
  fireEvent.pointerMove(list, point(250))
  expect(screen.getByRole("tabpanel").textContent).toBe("Home content")
  expect(changes).toHaveLength(0)
  fireEvent.pointerUp(list, point(250))
  fireEvent.click(list, { detail: 1 })
  await waitFor(() => expect(screen.getByRole("tabpanel").textContent).toBe("Search content"))
  expect(changes).toEqual(["search"])
  await waitFor(() => expect(document.activeElement).toBe(search))
})

test("canceling a drag or releasing over a disabled tab preserves the selection", () => {
  const changes: unknown[] = []
  const { list, home } = fixture((value) => changes.push(value))
  fireEvent.pointerDown(home, point(50))
  fireEvent.pointerMove(list, point(250))
  fireEvent.pointerCancel(list, point(250))
  fireEvent.pointerDown(home, point(50))
  fireEvent.pointerUp(list, point(150))
  expect(changes).toHaveLength(0)
  expect(screen.getByRole("tabpanel").textContent).toBe("Home content")
})

test("consumers can cancel a scrub selection without focus committing it again", async () => {
  let changes = 0
  const { list, home } = fixture((_, details) => {
    changes++
    details.cancel()
  })
  fireEvent.pointerDown(home, point(50))
  fireEvent.pointerMove(list, point(250))
  fireEvent.pointerUp(list, point(250))
  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve))
  })
  expect(changes).toBe(1)
  expect(screen.getByRole("tabpanel").textContent).toBe("Home content")
})

test("tab arrow keys preserve disabled state after a canceled pointer gesture", async () => {
  const user = userEvent.setup()
  const { list, home, search } = fixture()
  fireEvent.pointerDown(home, point(50))
  fireEvent.pointerCancel(list, point(50))
  act(() => home.focus())
  await user.keyboard("{ArrowRight}")
  expect(home.getAttribute("aria-selected")).toBe("true")
  await user.keyboard("{ArrowRight}")
  expect(search.getAttribute("aria-selected")).toBe("true")
  expect(document.activeElement).toBe(search)
})

test("a switch changes only when the press is released", async () => {
  const user = userEvent.setup()
  let changes = 0
  render(<Switch aria-label="Wi-Fi" onCheckedChange={() => changes++} />)
  const control = screen.getByRole("switch")
  await user.pointer({ keys: "[MouseLeft>]", target: control })
  expect(control.getAttribute("aria-checked")).toBe("false")
  expect(changes).toBe(0)
  await user.pointer({ keys: "[/MouseLeft]", target: control })
  expect(control.getAttribute("aria-checked")).toBe("true")
  expect(changes).toBe(1)
})

function switchFixture(checked = false, rtl = false) {
  const changes: boolean[] = []
  render(
    <Switch
      aria-label="Setting"
      defaultChecked={checked}
      style={{ direction: rtl ? "rtl" : "ltr" }}
      onCheckedChange={(v) => changes.push(v)}
    />,
  )
  const control = screen.getByRole("switch")
  spyOn(control, "getBoundingClientRect").mockReturnValue({
    left: 0,
    right: 64,
    top: 0,
    bottom: 28,
    width: 64,
    height: 28,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  })
  Object.defineProperty(control, "clientWidth", { configurable: true, value: 64 })
  return { control, changes }
}

test("switch dragging commits on release and does not toggle again on the trailing click", () => {
  const { control, changes } = switchFixture()
  fireEvent.pointerDown(control, { ...point(10), clientY: 14 })
  fireEvent.pointerMove(control, { ...point(45), clientY: 14 })
  expect(control.getAttribute("aria-checked")).toBe("false")
  fireEvent.pointerUp(control, { ...point(45), clientY: 14 })
  fireEvent.click(control, { detail: 1 })
  expect(control.getAttribute("aria-checked")).toBe("true")
  expect(changes).toEqual([true])
})

test("switch dragging can return to its original value or be canceled", () => {
  const { control, changes } = switchFixture()
  fireEvent.pointerDown(control, point(10))
  fireEvent.pointerMove(control, point(45))
  fireEvent.pointerMove(control, point(10))
  fireEvent.pointerUp(control, point(10))
  fireEvent.click(control, { detail: 1 })
  fireEvent.pointerDown(control, point(10))
  fireEvent.pointerMove(control, point(45))
  fireEvent.pointerCancel(control, point(45))
  expect(control.getAttribute("aria-checked")).toBe("false")
  expect(changes).toEqual([])
})

test("a right-to-left switch follows the reversed drag direction", () => {
  const { control, changes } = switchFixture(false, true)
  fireEvent.pointerDown(control, point(50))
  fireEvent.pointerMove(control, point(10))
  fireEvent.pointerUp(control, point(10))
  expect(control.getAttribute("aria-checked")).toBe("true")
  expect(changes).toEqual([true])
})
