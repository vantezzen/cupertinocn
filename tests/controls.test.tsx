import { afterEach, expect, spyOn, test } from "bun:test"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useState } from "react"
import { Switch } from "../src/registry/ui/switch"
import { SearchField } from "../src/registry/ui/search-field"
import { Checkbox } from "../src/registry/ui/checkbox"
import { Slider } from "../src/registry/ui/slider"
import { Stepper } from "../src/registry/ui/stepper"
import { PageControl } from "../src/registry/ui/page-control"
import { Progress } from "../src/registry/ui/progress"
import { Button } from "../src/registry/ui/button"

// These tests exercise public behavior; Base UI owns its internal keyboard/focus tests.
afterEach(cleanup)

test("switch remains controlled and participates in native form submission", () => {
  function Form() {
    const [checked, setChecked] = useState(false)
    return (
      <form aria-label="Preferences">
        <Switch
          name="wifi"
          value="enabled"
          aria-label="Wi-Fi"
          checked={checked}
          onCheckedChange={setChecked}
        />
      </form>
    )
  }
  render(<Form />)
  const control = screen.getByRole("switch", { name: "Wi-Fi" })
  expect(control.getAttribute("aria-checked")).toBe("false")
  fireEvent.click(control)
  expect(control.getAttribute("aria-checked")).toBe("true")
  const input = document.querySelector<HTMLInputElement>('input[name="wifi"]')!
  expect(input.checked).toBe(true)
  expect(input.value).toBe("enabled")
  fireEvent.click(control)
  expect(input.checked).toBe(false)
})

test("disabled controls ignore activation", () => {
  let calls = 0
  render(
    <>
      <Switch disabled aria-label="Managed setting" onCheckedChange={() => calls++} />
      <Button disabled onClick={() => calls++}>
        Unavailable
      </Button>
    </>,
  )
  fireEvent.click(screen.getByRole("switch"))
  fireEvent.click(screen.getByRole("button"))
  expect(calls).toBe(0)
})

test("search updates controlled text and clears while restoring input focus", () => {
  function Search() {
    const [value, setValue] = useState("Library")
    return <SearchField value={value} onValueChange={setValue} />
  }
  render(<Search />)
  const input = screen.getByRole("searchbox") as HTMLInputElement
  fireEvent.change(input, { target: { value: "Photos" } })
  expect(input.value).toBe("Photos")
  fireEvent.click(screen.getByRole("button", { name: "Clear search" }))
  expect(input.value).toBe("")
  expect(document.activeElement).toBe(input)
  expect(screen.queryByRole("button", { name: "Clear search" })).toBe(null)
})

test("checkbox exposes its indeterminate state", () => {
  render(<Checkbox indeterminate aria-label="All photos" />)
  expect(screen.getByRole("checkbox").getAttribute("aria-checked")).toBe("mixed")
})

test("range sliders provide distinct accessible names for every thumb", async () => {
  const measure = spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
    function (this: HTMLElement) {
      const width = this.hasAttribute("data-base-ui-slider-control") ? 300 : 36
      return {
        width,
        height: 24,
        top: 0,
        left: 0,
        right: width,
        bottom: 24,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }
    },
  )
  render(
    <Slider
      defaultValue={[20, 80]}
      getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}
    />,
  )
  await waitFor(() => expect(screen.getAllByRole("slider")).toHaveLength(2))
  measure.mockRestore()
  const thumbs = screen.getAllByRole("slider") as HTMLInputElement[]
  expect(thumbs).toHaveLength(2)
  expect(screen.getByRole("slider", { name: "Minimum price" })).toBe(thumbs[0])
  expect(thumbs[0].value).toBe("20")
  expect(thumbs[1].value).toBe("80")
})

test("stepper honors bounds", () => {
  render(<Stepper min={1} max={3} defaultValue={2} aria-label="Guests" />)
  fireEvent.click(screen.getByRole("button", { name: "Increase" }))
  expect((screen.getByRole("textbox", { name: "Guests" }) as HTMLInputElement).value).toBe("3")
  expect((screen.getByRole("button", { name: "Increase" }) as HTMLButtonElement).disabled).toBe(
    true,
  )
  fireEvent.click(screen.getByRole("button", { name: "Decrease" }))
  fireEvent.click(screen.getByRole("button", { name: "Decrease" }))
  expect((screen.getByRole("textbox", { name: "Guests" }) as HTMLInputElement).value).toBe("1")
  expect((screen.getByRole("button", { name: "Decrease" }) as HTMLButtonElement).disabled).toBe(
    true,
  )
})

test("page selection reports the requested zero-based page", () => {
  let page = 0
  render(
    <PageControl
      count={4}
      value={1}
      onValueChange={(value) => {
        page = value
      }}
    />,
  )
  expect(screen.getByRole("button", { name: "Page 2" }).getAttribute("aria-current")).toBe("page")
  fireEvent.click(screen.getByRole("button", { name: "Page 4" }))
  expect(page).toBe(3)
})

test("progress reports a meaningful accessible value", () => {
  render(<Progress value={65} aria-label="Upload" />)
  expect(screen.getByRole("progressbar", { name: "Upload" }).getAttribute("aria-valuenow")).toBe(
    "65",
  )
})
