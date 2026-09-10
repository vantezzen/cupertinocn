# cupertinocn

Cupertino-style React components with a Liquid Glass material, distributed through a shadcn GitHub registry. React 19, Tailwind CSS 4, and Base UI. The Vite app is the interactive documentation and material playground.

## Components

27 independently installable families: Liquid Glass, Button, Switch, Slider, Tabs, Checkbox, Radio Group, Stepper, Input, Textarea, Search Field, Select, List, Navigation Bar, App Shell, Tab Bar, Toolbar, Page Control, Alert Dialog, Action Sheet, Drawer, Dropdown Menu, Popover, Progress, Spinner, Badge, and Toast.

## shadcn/ui parity

Where shadcn/ui has a component, cupertinocn ships one with the same name, the same parts, and the same props, so an app built on shadcn/ui can switch to the iOS look by installing the cupertinocn versions over it. The docs mark each component as a **shadcn/ui drop-in** or **cupertinocn only**.

| shadcn/ui                                 | cupertinocn                                                                                                        | Rendered as                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Alert Dialog                              | Alert Dialog                                                                                                       | iOS alert on opaque glass                                       |
| Badge                                     | Badge                                                                                                              | iOS count badge; `destructive` is the red notification badge    |
| Button                                    | Button, plus `tinted` and `glass` variants                                                                         | Capsule buttons; `default` is prominent glass                   |
| Checkbox, Radio Group, Switch, Slider     | same                                                                                                               | iOS controls with springs and lenses                            |
| Drawer                                    | Drawer                                                                                                             | Bottom sheet with a grabber and snap points                     |
| Dropdown Menu                             | Dropdown Menu                                                                                                      | iOS context menu                                                |
| Input, Textarea                           | Input, Textarea                                                                                                    | Glass fields; `className` shapes the capsule around the control |
| Popover, Progress, Select, Spinner, Toast | same                                                                                                               | iOS renderings; `toast` is the shared manager and also callable |
| Tabs                                      | Tabs                                                                                                               | Segmented control; `variant="line"` gives underline tabs        |
| No counterpart                            | Liquid Glass, Action Sheet, App Shell, List, Navigation Bar, Page Control, Search Field, Stepper, Tab Bar, Toolbar | iOS patterns                                                    |

Not provided: Dialog, Sheet (side panel), Card, Tooltip, Table, and the other shadcn/ui components that have no iOS equivalent. Keep the shadcn/ui versions of those.

Theming works the shadcn/ui way too. The components read `--primary`, `--foreground`, `--muted-foreground`, `--border`, `--card`, `--muted`, and `--destructive`, so your existing theme applies to them. Installing `cupertino-style` writes the iOS system values for those variables into your CSS; keep them for the stock iOS palette or delete them to keep your brand colors. Only iOS-specific tokens (`--ios-fill-*`, `--ios-tertiary`, `--ios-green`, `--ios-orange`, the glass washes and springs) are cupertinocn's own.

Source lives in `src/registry/ui`. It does not import the showcase, assets, or the preinstalled stock shadcn components in `src/components/ui`.

## Installation

In a React 19 / Tailwind 4 project initialized with shadcn:

```sh
bunx shadcn@latest add vantezzen/cupertinocn/button
bunx shadcn@latest add vantezzen/cupertinocn/liquid-glass
# Or the entire collection:
bunx shadcn@latest add vantezzen/cupertinocn/all
```

**These commands become available after this repository is published at `vantezzen/cupertinocn`.** The current implementation adds the source registry; it does not create or push a GitHub repository. If the owner or repo changes, update `registry.json` (including dependency addresses) and `src/showcase/catalog.ts`.

GitHub registries read the root `registry.json` and source files directly. No separate registry hosting or generated public JSON is needed. See [shadcn GitHub registries](https://ui.shadcn.com/docs/registry/github).

The CLI installs `cupertino.css` alongside each component through the shared `cupertino-style` dependency. Components import it themselves. Keep the files together. For frameworks that restrict component-level global CSS imports, move the stylesheet import to your root layout.

Components use conventional filenames such as `button.tsx`. Review `--dry-run` or `--diff` before replacing existing components. To keep a separate collection, use shadcn's `--path src/components/cupertino` option. These components have their own APIs; they are not drop-in replacements for every stock shadcn export or variant.

```tsx
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export function Preferences() {
  return (
    <div>
      <label className="flex items-center gap-4">
        Wi-Fi
        <Switch name="wifi" defaultChecked />
      </label>
      <Button onClick={() => console.log("Saved")}>Save</Button>
    </div>
  )
}
```

## Liquid Glass

```tsx
import { LiquidGlass } from "@/components/ui/liquid-glass"

;<LiquidGlass className="rounded-[28px] p-5">
  <button type="button">Your controls here</button>
</LiquidGlass>
;<LiquidGlass variant="opaque">Frosted, for legibility</LiquidGlass>
;<LiquidGlass variant="clear" interactive>
  Bare glass that follows a press
</LiquidGlass>
```

- `variant`: `opaque` frosts the content behind the surface, for alerts, menus, popovers, and toasts. `regular` (default) keeps it visible through a light wash and bends it at the rim. `clear` is bare glass.
- `interactive`: presses pull and stretch the container toward the pointer and light it from the touch point. On by default; set `false` on surfaces that never take a press.
- `strength`: multiplies the refraction.

Shape and layout use ordinary `className` / `style`. Standard div props and refs are forwarded. The container is a surface, not a button: use semantic controls inside it. Tint a surface by overriding `--glass-wash` on it, as the prominent button does with the accent color.

`GlassSurface` is the shared material inside buttons, switches, sliders, steppers, selects, fields, tab bars, and overlays. It renders the same layers everywhere: blurred and saturated backdrop, wash, a generated rim light that follows the shape and faces the top left and bottom right, and a press light. Consumers tune a surface with `--glass-wash`, `--glass-blur`, and `--glass-saturate`.

Refraction:

- The lens is a spherical dome with an error-function edge window, sampled inward, following Aave's construction: the rim shows a stretched, folded copy of the content inside the glass with a faint prismatic fringe, and the same map carries the specular rim light. Maps are oversampled so small thumbs stay smooth on dense displays, cached by geometry, and regenerated only when a surface changes shape. Panels larger than 150,000 px² keep blur only.
- Chromium bends the live backdrop. Its backdrop filter cannot read an image map, so the same lens is rebuilt from filter primitives (flood, blur, threshold, Sobel gradients) with blur and saturation inside the filter.
- Controls that move over a known layer pass an aligned copy of that layer through `refract`. The switch refracts a copy of its track, the slider a copy of its fill, and the tab bar and segmented control a highlighted copy of their own items. The copy is bent with a CSS `filter`, which works in Chromium, Safari, and Firefox. This follows [Aave's technique](https://aave.com/design/building-glass-for-the-web).
- Safari and Firefox do not apply SVG filters to a live backdrop, so standalone containers keep blur, wash, and rim there.
- Blur stays at or below 20px. No frame renders through React state: map updates write SVG attributes, and press response writes custom properties.
- Reduced transparency, increased contrast, forced colors, and reduced motion have explicit fallbacks.

Apple's compositor is proprietary. Background-aware foreground inversion and inter-element light propagation remain outside this implementation. Non-Apple platforms render different font metrics, and the examples use Lucide in place of SF Symbols. See [implementation notes](docs/implementation.md).

## Interactions

- Every glass host follows a press: it grows, then follows the pointer on a rubber band, stretches along the pull, lights up from the touch point, and springs back on release. Buttons, steppers, select triggers, and containers get this from `GlassSurface` by default. A host that opens a popup hands the interaction to it.
- Switch thumbs widen on hover, widen further and turn into a lens on press, and follow a drag. The track color previews the resulting state past the midpoint. Release commits once.
- Slider thumbs grow into a lens while pressed, stretch with drag speed, and show the fill boundary bent underneath.
- Tab bars and segmented controls have one glass lens that springs between segments. Dragging moves it on a spring along the bar, stretches it with speed and squashes it across, and lifts it. The item under the lens appears highlighted, and bends at the rim while the lens moves. Release over an enabled tab selects it. Cancellation restores the existing selection.
- Plain text buttons dim. Steppers repeat while held; disabled buttons remain inactive at the value bounds.
- Keyboard focus remains visible. Reduced motion disables transitions and spring interpolation.

## Themes and accessibility

Set `.dark` on the document root for dark mode; otherwise light tokens apply. Override `--ios-*` semantic tokens to theme components. `data-ios-theme="light"` and `data-ios-theme="dark"` support scoped previews, but portals inherit their actual DOM parent's theme. Put your application theme on `<html>` when using overlays.

Every input needs a visible label or `aria-label`. Range sliders can use `getAriaLabel(index)` to name each thumb. Base UI provides form integration, focus management, keyboard behavior, dismissal, and controlled/uncontrolled state. Segments activate on arrow-key focus by default; use `activateOnFocus={false}` on the list for manual activation.

Wrap your application in `<Toaster>` before calling `toast(title, description?)`. `AlertDialogAction` closes by default; for asynchronous work prevent the click's default action and control the root `open` state until the operation succeeds. Use `Button` inside a controlled alert if you need explicit pending/error behavior.

## Working on the project

```sh
bun install
bun run typecheck
bun run lint
bun test
bun run registry:validate
bun run format:check
```

Start Vite yourself with `bun run dev` when you want to view the app. The implementation and verification session did not run a dev or production build command.

The registry validator checks shadcn's schemas, file existence, and the installation closure of every local import. The CLI's own `shadcn registry validate ./registry.json` can also validate it. Regression tests cover controls, form values, keyboard composition, overlay focus, and bounded lens generation.

## Design references

[Apple HIG alerts](https://developer.apple.com/design/human-interface-guidelines/alerts), [toggles](https://developer.apple.com/design/human-interface-guidelines/toggles), and [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) informed the material and geometry. See [reference and verification notes](docs/implementation.md) for the limits of this comparison.

Apple reference images and fonts are not redistributed. The showcase wallpaper is original CSS artwork. The player is an interaction demonstration and does not stream music. cupertinocn is an independent project, not affiliated with Apple or shadcn.
