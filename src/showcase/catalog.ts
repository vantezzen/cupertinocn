export type PropDoc = {
  name: string
  type: string
  default?: string
  description: string
}

export type Example = {
  title: string
  description?: string
  code: string
}

export type CatalogEntry = {
  name: string
  slug: string
  group: string
  /**
   * `shadcn`: same component names, parts, and props as shadcn/ui, so existing app code keeps
   * working. `unique`: an iOS pattern that has no shadcn/ui counterpart.
   */
  parity: "shadcn" | "unique"
  description: string
  /** Exported parts, in composition order. */
  parts: string[]
  props: PropDoc[]
  examples: Example[]
}

const baseUi = (part: string, url: string): PropDoc => ({
  name: "…Base UI props",
  type: `${part}.Props`,
  description: `Every prop of Base UI ${part} passes through: controlled and uncontrolled state, form integration, keyboard behavior, and \`render\`. See ${url}.`,
})

export const catalog: CatalogEntry[] = [
  {
    name: "Liquid Glass",
    slug: "liquid-glass",
    group: "Materials",
    parity: "unique",
    description:
      "A translucent surface that blurs and bends the content behind it. Use it for floating controls and navigation.",
    parts: ["LiquidGlass", "GlassSurface"],
    props: [
      {
        name: "variant",
        type: '"opaque" | "regular" | "clear"',
        default: '"regular"',
        description:
          "Opaque frosts the content behind the surface (20px blur, 66% wash) for alerts, menus, and toasts. Regular keeps it visible through a light wash and bends it at the rim. Clear is bare glass.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "true",
        description:
          "Presses on the element pull and stretch it a few pixels toward the pointer, light it from the touch point, and spring back on release. Turn off for surfaces that never take a press.",
      },
      {
        name: "strength",
        type: "number",
        default: "1",
        description:
          "Multiplies how far the rim bends the content, in rim widths. 0.5 halves the bend; 2 doubles it. Use lower values over text.",
      },
      {
        name: "rim",
        type: "number",
        default: "1",
        description:
          "GlassSurface only. Multiplies the rim width. Lower values keep more of the center flat, which keeps text legible under a lens.",
      },
      {
        name: "chroma",
        type: "boolean",
        default: "true, false for opaque",
        description:
          "GlassSurface only. Splits the bend slightly per color channel for a light prismatic fringe. Disable over text.",
      },
      {
        name: "refract",
        type: "ReactNode",
        description:
          "GlassSurface only. An aligned copy of the layer under the surface. When set, the lens bends this copy with a CSS filter instead of the live backdrop, which works in every browser. The switch passes a copy of its track; the tab bar passes a highlighted copy of its items.",
      },
      {
        name: "className / style",
        type: "string / CSSProperties",
        description:
          "Shape and layout. Give the container a border-radius; the material follows it. Tune a surface with --glass-wash, --glass-blur, and --glass-saturate.",
      },
    ],
    examples: [
      {
        title: "Floating container",
        code: '<LiquidGlass className="rounded-[28px] p-5">\n  <p>Regular glass over the page</p>\n</LiquidGlass>',
      },
      {
        title: "Variants",
        description: "Opaque for panels that need legibility, clear for bare glass.",
        code: '<LiquidGlass variant="opaque" className="rounded-[24px] p-4">\n  Frosted\n</LiquidGlass>\n<LiquidGlass variant="clear" className="rounded-full px-5 py-3">\n  Bare glass\n</LiquidGlass>',
      },
      {
        title: "Tinted surface",
        description:
          "Override the wash to color a surface. This is how the prominent button works.",
        code: '<LiquidGlass\n  className="rounded-full px-5 py-3 text-white"\n  style={{ "--glass-wash": "color-mix(in srgb, var(--ios-blue) 90%, transparent)" }}\n>\n  Continue\n</LiquidGlass>',
      },
      {
        title: "Material inside your own control",
        description:
          "GlassSurface adds the layers to any positioned element with a border radius. The element becomes a glass host and gets the press response.",
        code: '<button className="cupertino-material relative rounded-full px-5 py-3">\n  <GlassSurface />\n  Save\n</button>',
      },
      {
        title: "Refracting a known layer",
        description:
          "Pass an aligned copy of what sits under the lens. The copy must counter-move with the host so it stays aligned.",
        code: '<span className="thumb">\n  <GlassSurface\n    variant="clear"\n    interactive={false}\n    refract={<span className="track-copy" />}\n  />\n</span>',
      },
    ],
  },
  {
    name: "Button",
    slug: "button",
    group: "Controls",
    parity: "shadcn",
    description: "Triggers an action. Prominent, gray, tinted, plain, and glass styles.",
    parts: ["Button", "buttonVariants"],
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "destructive" | "ghost" | "link" | "tinted" | "glass"',
        default: '"default"',
        description:
          "Default is prominent glass in the accent color. Secondary is the gray fill used in alerts. Outline is a hairline capsule. Destructive is prominent glass in red. Ghost is plain accent text; link adds an underline on hover. Tinted (cupertinocn only) is accent text on a light accent fill. Glass (cupertinocn only) is regular glass over the content behind it.",
      },
      {
        name: "size",
        type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"',
        default: '"default"',
        description: "44px, 28px, 32px, and 50px heights, or circles of the same sizes.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Dims the button to 40% and ignores presses.",
      },
      baseUi("Button", "base-ui.com/react/components/button"),
    ],
    examples: [
      {
        title: "Styles",
        code: '<Button>Continue</Button>\n<Button variant="secondary">Cancel</Button>\n<Button variant="tinted">Learn more</Button>\n<Button variant="ghost">Skip</Button>\n<Button variant="destructive">Delete</Button>\n<Button variant="glass">Share</Button>',
      },
      {
        title: "Icon buttons",
        description: "Icon-only buttons need an accessible name.",
        code: '<Button size="icon" variant="glass" aria-label="Add">\n  <Plus />\n</Button>\n<Button size="icon-sm" variant="secondary" aria-label="Close">\n  <X />\n</Button>',
      },
      {
        title: "As a link",
        description: "Base UI's render prop swaps the element.",
        code: '<Button render={<a href="/pricing" />}>See pricing</Button>',
      },
    ],
  },
  {
    name: "Switch",
    slug: "switch",
    group: "Controls",
    parity: "shadcn",
    description: "Toggles a setting. The thumb widens into a lens on press and follows a drag.",
    parts: ["Switch"],
    props: [
      { name: "checked", type: "boolean", description: "Controlled state." },
      { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state." },
      {
        name: "size",
        type: '"default" | "sm"',
        default: '"default"',
        description: "64×28 track, or a 48×22 track for dense rows.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean, event) => void",
        description: "Called once on release, for taps and drags alike.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Dims and ignores input.",
      },
      {
        name: "name / value",
        type: "string",
        description: "Rendered into a hidden input so the switch participates in form submission.",
      },
      baseUi("Switch.Root", "base-ui.com/react/components/switch"),
    ],
    examples: [
      {
        title: "Labelled",
        code: '<label className="flex items-center justify-between gap-4">\n  Airplane Mode\n  <Switch defaultChecked />\n</label>',
      },
      {
        title: "Controlled",
        code: 'const [wifi, setWifi] = useState(true)\n\n<Switch aria-label="Wi-Fi" checked={wifi} onCheckedChange={setWifi} />',
      },
      {
        title: "In a form",
        code: '<form action={save}>\n  <Switch name="notifications" value="on" aria-label="Notifications" />\n  <Button type="submit">Save</Button>\n</form>',
      },
    ],
  },
  {
    name: "Slider",
    slug: "slider",
    group: "Controls",
    parity: "shadcn",
    description:
      "Selects a value or range. The thumb grows into a lens that bends the track while dragging.",
    parts: ["Slider"],
    props: [
      {
        name: "value / defaultValue",
        type: "number | number[]",
        default: "[50]",
        description: "One thumb per number. Two numbers make a range slider.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        description: "Called on every change while dragging.",
      },
      {
        name: "onValueCommitted",
        type: "(value, details) => void",
        description: "Called once on release. Use it for expensive work.",
      },
      {
        name: "min / max / step",
        type: "number",
        default: "0 / 100 / 1",
        description: "Range and granularity.",
      },
      {
        name: "getAriaLabel",
        type: "(index: number) => string",
        description: "Accessible name per thumb of a range slider. Single sliders use aria-label.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        default: '"horizontal"',
        description: "Vertical sliders keep the lens but do not refract the track.",
      },
      baseUi("Slider.Root", "base-ui.com/react/components/slider"),
    ],
    examples: [
      {
        title: "Volume",
        code: '<div className="flex items-center gap-3">\n  <Volume1 />\n  <Slider aria-label="Volume" defaultValue={[65]} />\n  <Volume2 />\n</div>',
      },
      {
        title: "Range",
        code: '<Slider\n  defaultValue={[20, 80]}\n  getAriaLabel={(index) => (index === 0 ? "Minimum price" : "Maximum price")}\n/>',
      },
      {
        title: "Commit on release",
        code: '<Slider\n  aria-label="Brightness"\n  defaultValue={[40]}\n  onValueCommitted={(value) => save(value)}\n/>',
      },
    ],
  },
  {
    name: "Tabs",
    slug: "tabs",
    group: "Controls",
    parity: "shadcn",
    description: "Switches between related views in a single control.",
    parts: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    props: [
      {
        name: "TabsList variant",
        type: '"default" | "line"',
        default: '"default"',
        description:
          "default is the iOS segmented capsule with the glass pill. line renders text tabs with an underline, as shadcn/ui does.",
      },
      {
        name: "value / defaultValue",
        type: "string",
        description: "Selected segment. Set on the root.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        description: "Called on release of a drag, on click, and on arrow keys.",
      },
      {
        name: "activateOnFocus",
        type: "boolean",
        default: "true",
        description:
          "List prop. Arrow keys select immediately. Set false to require Enter or Space.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Trigger prop. A drag skips disabled segments.",
      },
      baseUi("Tabs", "base-ui.com/react/components/tabs"),
    ],
    examples: [
      {
        title: "With panels",
        code: '<Tabs defaultValue="day">\n  <TabsList aria-label="Period">\n    <TabsTrigger value="day">Day</TabsTrigger>\n    <TabsTrigger value="week">Week</TabsTrigger>\n  </TabsList>\n  <TabsContent value="day">Today</TabsContent>\n  <TabsContent value="week">This week</TabsContent>\n</Tabs>',
      },
      {
        title: "As a filter",
        description: "Panels are optional. Read the value instead.",
        code: 'const [sort, setSort] = useState("recent")\n\n<Tabs value={sort} onValueChange={setSort}>\n  <TabsList aria-label="Sort">\n    <TabsTrigger value="recent">Recent</TabsTrigger>\n    <TabsTrigger value="popular">Popular</TabsTrigger>\n  </TabsList>\n</Tabs>',
      },
    ],
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    group: "Controls",
    parity: "shadcn",
    description: "A circular selection control, as in list editing. Supports mixed state.",
    parts: ["Checkbox"],
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "State." },
      {
        name: "indeterminate",
        type: "boolean",
        default: "false",
        description: "Shows a dash and reports aria-checked=mixed.",
      },
      {
        name: "onCheckedChange",
        type: "(checked, event) => void",
        description: "Called on toggle.",
      },
      {
        name: "name / value / disabled",
        type: "string / string / boolean",
        description: "Form and availability.",
      },
      baseUi("Checkbox.Root", "base-ui.com/react/components/checkbox"),
    ],
    examples: [
      {
        title: "Labelled",
        code: '<label className="flex items-center gap-3">\n  <Checkbox defaultChecked />\n  Keep me updated\n</label>',
      },
      { title: "Mixed", code: '<Checkbox indeterminate aria-label="All photos" />' },
    ],
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    group: "Controls",
    parity: "shadcn",
    description: "Selects one option from a group.",
    parts: ["RadioGroup", "RadioGroupItem"],
    props: [
      {
        name: "value / defaultValue",
        type: "string",
        description: "Selected item. Set on the group.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        description: "Called on selection.",
      },
      { name: "value", type: "string", description: "Item prop. The value this item selects." },
      { name: "disabled", type: "boolean", description: "Group or item." },
      baseUi("RadioGroup", "base-ui.com/react/components/radio"),
    ],
    examples: [
      {
        title: "Options",
        code: '<RadioGroup defaultValue="all" aria-label="Notifications">\n  <label className="flex items-center gap-3">\n    <RadioGroupItem value="all" /> All notifications\n  </label>\n  <label className="flex items-center gap-3">\n    <RadioGroupItem value="important" /> Important only\n  </label>\n</RadioGroup>',
      },
    ],
  },
  {
    name: "Stepper",
    slug: "stepper",
    group: "Controls",
    parity: "unique",
    description:
      "Increases or decreases a number within a range. The capsule follows the press. Hold to repeat.",
    parts: ["Stepper"],
    props: [
      { name: "value / defaultValue", type: "number", description: "Current number." },
      {
        name: "onValueChange",
        type: "(value: number | null, details) => void",
        description: "Called on every step and on typed input.",
      },
      {
        name: "min / max / step",
        type: "number",
        description: "Bounds and increment. Buttons disable at the bounds.",
      },
      {
        name: "aria-label",
        type: "string",
        default: '"Value"',
        description: "Name of the number field.",
      },
      {
        name: "decrementLabel / incrementLabel",
        type: "string",
        default: '"Decrease" / "Increase"',
        description: "Accessible names of the two buttons, for localization.",
      },
      baseUi("NumberField.Root", "base-ui.com/react/components/number-field"),
    ],
    examples: [
      {
        title: "Guests",
        code: '<Stepper defaultValue={2} min={1} max={10} aria-label="Guests" />',
      },
      {
        title: "Controlled",
        code: 'const [count, setCount] = useState(1)\n\n<Stepper value={count} onValueChange={(value) => setCount(value ?? 1)} min={1} aria-label="Quantity" />',
      },
    ],
  },
  {
    name: "Input",
    slug: "input",
    group: "Input",
    parity: "shadcn",
    description: "Glass single-line and multiline text fields.",
    parts: ["Input"],
    props: [
      {
        name: "className",
        type: "string",
        description: "Applies to the glass wrapper. Use it for width and spacing.",
      },
      {
        name: "…input props",
        type: "ComponentProps<'input'> / ComponentProps<'textarea'>",
        description:
          "Everything else reaches the native control: type, value, onChange, placeholder, disabled, aria-invalid, ref.",
      },
    ],
    examples: [
      {
        title: "Fields",
        code: '<Input aria-label="Full name" placeholder="Full name" />\n<Input type="email" aria-label="Email" placeholder="Email address" />\n<Textarea aria-label="Notes" placeholder="Add a note…" />',
      },
      {
        title: "Invalid",
        code: '<Input aria-label="Email" aria-invalid defaultValue="not an email" />',
      },
    ],
  },
  {
    name: "Textarea",
    slug: "textarea",
    group: "Input",
    parity: "shadcn",
    description: "A multi-line glass text field that grows with its content.",
    parts: ["Textarea"],
    props: [
      {
        name: "…textarea props",
        type: "ComponentProps<'textarea'>",
        description: "Forwarded to the native textarea. className styles the glass wrapper.",
      },
    ],
    examples: [
      {
        title: "Note",
        code: '<Textarea placeholder="Add a note…" aria-label="Note" />',
      },
    ],
  },
  {
    name: "Search Field",
    slug: "search-field",
    group: "Input",
    parity: "unique",
    description: "A glass search capsule with a clear button.",
    parts: ["SearchField"],
    props: [
      {
        name: "value / defaultValue",
        type: "string",
        description: "Text. Controlled when value is set.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Called on typing and on clear.",
      },
      {
        name: "placeholder",
        type: "string",
        default: '"Search"',
        description: "Also the accessible name when no label is given.",
      },
      {
        name: "clearLabel",
        type: "string",
        default: '"Clear search"',
        description: "Accessible name of the clear button.",
      },
      {
        name: "…input props",
        type: "ComponentProps<'input'>",
        description: "Reach the native search input.",
      },
    ],
    examples: [
      {
        title: "Filtering a list",
        code: 'const [query, setQuery] = useState("")\n\n<SearchField value={query} onValueChange={setQuery} placeholder="Search your library" />',
      },
    ],
  },
  {
    name: "Select",
    slug: "select",
    group: "Input",
    parity: "shadcn",
    description: "Selects an option from a popup menu.",
    parts: [
      "Select",
      "SelectTrigger",
      "SelectValue",
      "SelectContent",
      "SelectItem",
      "SelectGroup",
      "SelectLabel",
      "SelectSeparator",
      "SelectScrollUpButton",
      "SelectScrollDownButton",
    ],
    props: [
      {
        name: "SelectTrigger size",
        type: '"default" | "sm"',
        default: '"default"',
        description: "A 44px or a 32px capsule.",
      },
      {
        name: "value / defaultValue",
        type: "string",
        description: "Selected value. Set on the root.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        description: "Called on selection.",
      },
      {
        name: "items",
        type: "Record<string, ReactNode>",
        description: "Labels by value, so SelectValue can render the label of the current value.",
      },
      { name: "value", type: "string", description: "Item prop." },
      baseUi("Select", "base-ui.com/react/components/select"),
    ],
    examples: [
      {
        title: "Appearance",
        code: '<Select defaultValue="auto" items={{ auto: "Automatic", light: "Light", dark: "Dark" }}>\n  <SelectTrigger aria-label="Appearance">\n    <SelectValue />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="auto">Automatic</SelectItem>\n    <SelectItem value="light">Light</SelectItem>\n    <SelectItem value="dark">Dark</SelectItem>\n  </SelectContent>\n</Select>',
      },
    ],
  },
  {
    name: "List",
    slug: "list",
    group: "Layout",
    parity: "unique",
    description: "Groups rows with inset separators and optional icons.",
    parts: ["List", "ListItem", "ListIcon", "ListTitle", "ListValue", "ListHeader", "ListFooter"],
    props: [
      {
        name: "…element props",
        type: "ComponentProps<'ul' | 'li' | 'span' | 'h3' | 'p'>",
        description: "Each part renders one native element and forwards its props.",
      },
      {
        name: "ListIcon className",
        type: "string",
        description:
          "Set the background color of the icon tile, for example bg-[var(--ios-green)].",
      },
    ],
    examples: [
      {
        title: "Settings rows",
        code: "<ListHeader>Connections</ListHeader>\n<List>\n  <ListItem>\n    <ListIcon><Wifi /></ListIcon>\n    <ListTitle>Wi-Fi</ListTitle>\n    <ListValue>Studio <ChevronRight /></ListValue>\n  </ListItem>\n  <ListItem>\n    <ListTitle>Bluetooth</ListTitle>\n    <ListValue>On</ListValue>\n  </ListItem>\n</List>\n<ListFooter>Changes are saved automatically.</ListFooter>",
      },
      {
        title: "Row with a switch",
        code: "<ListItem render={<label />}>\n  <ListTitle>Airplane Mode</ListTitle>\n  <Switch />\n</ListItem>",
      },
    ],
  },
  {
    name: "Navigation Bar",
    slug: "navigation-bar",
    group: "Navigation",
    parity: "unique",
    description: "A bar with glass back and action buttons, plus a large title.",
    parts: ["NavigationBar", "NavigationBarBack", "NavigationBarTitle", "LargeTitle"],
    props: [
      {
        name: "NavigationBarBack children",
        type: "ReactNode",
        description:
          "Optional label next to the chevron. Without children it is a 44px circle named Back.",
      },
      {
        name: "…element props",
        type: "ComponentProps<'nav' | 'h1' | 'h2'> / Button props",
        description: "Forwarded to the underlying element.",
      },
    ],
    examples: [
      {
        title: "Bar and large title",
        code: '<NavigationBar aria-label="Photo navigation">\n  <NavigationBarBack onClick={goBack} />\n  <NavigationBarTitle>All Photos</NavigationBarTitle>\n  <Button size="icon" variant="glass" aria-label="More"><Ellipsis /></Button>\n</NavigationBar>\n<LargeTitle>Library</LargeTitle>',
      },
      {
        title: "Back with label",
        code: "<NavigationBarBack onClick={goBack}>Albums</NavigationBarBack>",
      },
    ],
  },
  {
    name: "App Shell",
    slug: "app-shell",
    group: "Navigation",
    parity: "unique",
    description:
      "Master-detail navigation. A list of sections beside their pages on wide screens; a list that pushes pages in on phones.",
    parts: ["AppShell", "AppShellList", "AppShellItem", "AppShellContent"],
    props: [
      {
        name: "value / defaultValue / onValueChange",
        type: "string | null",
        description:
          "Selected page, like Tabs. On wide viewports an empty selection shows the first page; on narrow ones it shows the bare list, and the back button sets it to null.",
      },
      {
        name: "breakpoint",
        type: "number",
        default: "768",
        description: "Viewport width in pixels below which the list and the page stack.",
      },
      {
        name: "AppShellItem value / icon / detail",
        type: "string / ReactNode / ReactNode",
        description:
          "A row that selects a page. Render it inside a List next to plain ListItems. icon is usually a ListIcon; detail is trailing text such as the current setting.",
      },
      {
        name: "AppShellContent value / title / subtitle / backLabel / actions",
        type: "string / ReactNode / ReactNode / ReactNode / ReactNode",
        description:
          "A page. On phones it gets a navigation bar with a back button named by backLabel; on wider screens a left-aligned heading with the subtitle and a content column of readable width. actions render on the trailing side of either. Only the selected page mounts.",
      },
    ],
    examples: [
      {
        title: "List and pages",
        code: '<AppShell defaultValue="checkout" className="h-[560px]">\n  <AppShellList aria-label="Flags">\n    <LargeTitle>Flags</LargeTitle>\n    <List>\n      <AppShellItem value="checkout" icon={<ListIcon><CreditCard /></ListIcon>} detail="25%">\n        New checkout\n      </AppShellItem>\n      <AppShellItem value="invites" icon={<ListIcon><Users /></ListIcon>} detail="Off">\n        Workspace invites\n      </AppShellItem>\n    </List>\n  </AppShellList>\n  <AppShellContent value="checkout" title="New checkout" backLabel="Flags">\n    <List>…</List>\n  </AppShellContent>\n  <AppShellContent value="invites" title="Workspace invites" backLabel="Flags">\n    <List>…</List>\n  </AppShellContent>\n</AppShell>',
      },
      {
        title: "Controlled selection with bar actions",
        description: "Drive the selection yourself and put buttons in the navigation bar.",
        code: '<AppShell value={section} onValueChange={setSection}>\n  …\n  <AppShellContent\n    value="wifi"\n    title="Wi-Fi"\n    actions={<Button size="icon" variant="glass" aria-label="Options"><Ellipsis /></Button>}\n  >\n    …\n  </AppShellContent>\n</AppShell>',
      },
    ],
  },
  {
    name: "Tab Bar",
    slug: "tab-bar",
    group: "Navigation",
    parity: "unique",
    description:
      "A floating glass bar. The selection lens springs between tabs and follows a drag.",
    parts: ["TabBar", "TabBarList", "TabBarTrigger", "TabBarContent"],
    props: [
      {
        name: "value / defaultValue",
        type: "string",
        description: "Selected tab. Set on the root.",
      },
      {
        name: "className",
        type: "string",
        description: "On TabBarList, shapes and positions the glass bar itself.",
      },
      {
        name: "onValueChange",
        type: "(value, details) => void",
        description: "Called on release of a drag, on click, and on arrow keys.",
      },
      {
        name: "activateOnFocus",
        type: "boolean",
        default: "true",
        description: "List prop. Arrow keys select immediately.",
      },
      {
        name: "disabled",
        type: "boolean",
        description: "Trigger prop. A drag skips disabled tabs.",
      },
      baseUi("Tabs", "base-ui.com/react/components/tabs"),
    ],
    examples: [
      {
        title: "Icons and labels",
        code: '<TabBar defaultValue="home">\n  <TabBarContent value="home">Home content</TabBarContent>\n  <TabBarContent value="search">Search content</TabBarContent>\n  <TabBarList aria-label="Sections">\n    <TabBarTrigger value="home"><House />Home</TabBarTrigger>\n    <TabBarTrigger value="search"><Search />Search</TabBarTrigger>\n  </TabBarList>\n</TabBar>',
      },
      {
        title: "Fixed to the bottom",
        code: '<TabBarList\n  aria-label="Sections"\n  className="fixed inset-x-4 bottom-[max(16px,env(safe-area-inset-bottom))] mx-auto max-w-md"\n>\n  …\n</TabBarList>',
      },
    ],
  },
  {
    name: "Toolbar",
    slug: "toolbar",
    group: "Navigation",
    parity: "unique",
    description: "A floating glass capsule of actions.",
    parts: ["Toolbar", "ToolbarButton", "ToolbarSeparator"],
    props: [
      { name: "aria-label", type: "string", description: "Name of the toolbar." },
      {
        name: "className",
        type: "string",
        description: "Shapes and positions the glass capsule itself.",
      },
      { name: "aria-pressed", type: "boolean", description: "Button prop for toggles." },
      baseUi("Toolbar", "base-ui.com/react/components/toolbar"),
    ],
    examples: [
      {
        title: "Photo actions",
        code: '<Toolbar aria-label="Photo actions">\n  <ToolbarButton aria-label="Favorite"><Heart /></ToolbarButton>\n  <ToolbarButton aria-label="Save"><Bookmark /></ToolbarButton>\n  <ToolbarSeparator />\n  <ToolbarButton aria-label="Share"><Share /></ToolbarButton>\n</Toolbar>',
      },
    ],
  },
  {
    name: "Page Control",
    slug: "page-control",
    group: "Navigation",
    parity: "unique",
    description: "Displays the current page and controls page selection.",
    parts: ["PageControl"],
    props: [
      { name: "count", type: "number", description: "Number of pages." },
      { name: "value", type: "number", description: "Zero-based current page." },
      {
        name: "onValueChange",
        type: "(page: number) => void",
        description: "Called when a dot is pressed.",
      },
      {
        name: "getPageLabel",
        type: "(page: number) => string",
        default: "Page n",
        description: "Accessible name per dot.",
      },
    ],
    examples: [
      {
        title: "Pages",
        code: "const [page, setPage] = useState(0)\n\n<PageControl count={4} value={page} onValueChange={setPage} />",
      },
    ],
  },
  {
    name: "Alert Dialog",
    slug: "alert-dialog",
    group: "Presentation",
    parity: "shadcn",
    description: "Requests confirmation before continuing an action.",
    parts: [
      "AlertDialog",
      "AlertDialogTrigger",
      "AlertDialogContent",
      "AlertDialogHeader",
      "AlertDialogMedia",
      "AlertDialogTitle",
      "AlertDialogDescription",
      "AlertDialogFooter",
      "AlertDialogCancel",
      "AlertDialogAction",
      "AlertDialogOverlay",
      "AlertDialogPortal",
    ],
    props: [
      {
        name: "open / defaultOpen / onOpenChange",
        type: "boolean / boolean / (open, details) => void",
        description: "Root state.",
      },
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "AlertDialogAction prop.",
      },
      {
        name: "Footer layout",
        type: "",
        description: "Two actions sit side by side; three or more stack.",
      },
      baseUi("AlertDialog", "base-ui.com/react/components/alert-dialog"),
    ],
    examples: [
      {
        title: "Confirm",
        code: "<AlertDialog>\n  <AlertDialogTrigger render={<Button />}>Save changes</AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Save your changes?</AlertDialogTitle>\n      <AlertDialogDescription>Your edits will be saved to this device.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction onClick={save}>Save</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>",
      },
      {
        title: "Asynchronous action",
        description: "Keep the alert open until the work finishes.",
        code: 'const [open, setOpen] = useState(false)\n\n<AlertDialog open={open} onOpenChange={setOpen}>\n  …\n  <AlertDialogAction\n    onClick={async (event) => {\n      event.preventDefault()\n      await remove()\n      setOpen(false)\n    }}\n    variant="destructive"\n  >\n    Delete\n  </AlertDialogAction>\n</AlertDialog>',
      },
    ],
  },
  {
    name: "Action Sheet",
    slug: "action-sheet",
    group: "Presentation",
    parity: "unique",
    description: "Presents a group of actions at the bottom of the screen.",
    parts: [
      "ActionSheet",
      "ActionSheetTrigger",
      "ActionSheetContent",
      "ActionSheetGroup",
      "ActionSheetTitle",
      "ActionSheetDescription",
      "ActionSheetAction",
      "ActionSheetCancel",
    ],
    props: [
      {
        name: "open / onOpenChange",
        type: "boolean / (open, details) => void",
        description: "Root state.",
      },
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "ActionSheetAction prop.",
      },
      baseUi("Dialog", "base-ui.com/react/components/dialog"),
    ],
    examples: [
      {
        title: "Photo options",
        code: '<ActionSheet>\n  <ActionSheetTrigger render={<Button variant="secondary" />}>Options</ActionSheetTrigger>\n  <ActionSheetContent>\n    <ActionSheetGroup>\n      <ActionSheetTitle>Photo options</ActionSheetTitle>\n      <ActionSheetDescription>Choose what to do with this photo.</ActionSheetDescription>\n      <ActionSheetAction onClick={save}>Save Image</ActionSheetAction>\n      <ActionSheetAction variant="destructive" onClick={remove}>Delete Photo</ActionSheetAction>\n    </ActionSheetGroup>\n    <ActionSheetCancel>Cancel</ActionSheetCancel>\n  </ActionSheetContent>\n</ActionSheet>',
      },
    ],
  },
  {
    name: "Drawer",
    slug: "drawer",
    group: "Presentation",
    parity: "shadcn",
    description:
      "Presents content above the current screen. Supports snap points and swipe dismissal.",
    parts: [
      "Drawer",
      "DrawerTrigger",
      "DrawerClose",
      "DrawerContent",
      "DrawerHeader",
      "DrawerTitle",
      "DrawerDescription",
      "DrawerFooter",
      "DrawerOverlay",
      "DrawerPortal",
      "DrawerSwipeHandle",
    ],
    props: [
      {
        name: "showSwipeHandle",
        type: "boolean",
        default: "true",
        description:
          "The grabber at the top. On by default, unlike shadcn/ui, because iOS sheets always carry one.",
      },
      {
        name: "open / onOpenChange",
        type: "boolean / (open, details) => void",
        description: "Root state.",
      },
      {
        name: "snapPoints",
        type: "(number | string)[]",
        description: "Intermediate heights, for example [0.5, 1].",
      },
      {
        name: "modal",
        type: "boolean",
        default: "true",
        description: "Non-modal sheets have no backdrop and leave the page interactive.",
      },
      baseUi("Drawer", "base-ui.com/react/components/drawer"),
    ],
    examples: [
      {
        title: "Settings sheet",
        code: "<Drawer>\n  <DrawerTrigger render={<Button />}>Open sheet</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Settings</DrawerTitle>\n      <DrawerDescription>Drag down to dismiss.</DrawerDescription>\n    </DrawerHeader>\n    …\n    <DrawerFooter>\n      <DrawerClose render={<Button />}>Done</DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>",
      },
      { title: "Snap points", code: "<Drawer snapPoints={[0.4, 1]}>…</Drawer>" },
    ],
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    group: "Presentation",
    parity: "shadcn",
    description: "Presents contextual actions, checkbox items, and submenus.",
    parts: [
      "DropdownMenu",
      "DropdownMenuTrigger",
      "DropdownMenuContent",
      "DropdownMenuItem",
      "DropdownMenuCheckboxItem",
      "DropdownMenuRadioGroup",
      "DropdownMenuRadioItem",
      "DropdownMenuGroup",
      "DropdownMenuLabel",
      "DropdownMenuSeparator",
      "DropdownMenuShortcut",
      "DropdownMenuSub",
      "DropdownMenuSubTrigger",
      "DropdownMenuSubContent",
      "DropdownMenuPortal",
    ],
    props: [
      {
        name: "side / align / sideOffset",
        type: '"top" | "bottom" | … / "start" | "center" | "end" / number',
        default: '"bottom" / "start" / 8',
        description: "DropdownMenuContent placement.",
      },
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "DropdownMenuItem prop.",
      },
      {
        name: "checked / onCheckedChange",
        type: "boolean / (checked, details) => void",
        description: "DropdownMenuCheckboxItem state.",
      },
      baseUi("DropdownMenu", "base-ui.com/react/components/menu"),
    ],
    examples: [
      {
        title: "Actions",
        code: '<DropdownMenu>\n  <DropdownMenuTrigger render={<Button variant="secondary" />}>Options</DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem onClick={copy}>Copy <Copy /></DropdownMenuItem>\n    <DropdownMenuCheckboxItem checked={favorite} onCheckedChange={setFavorite}>Favorite <Heart /></DropdownMenuCheckboxItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem variant="destructive" onClick={remove}>Delete <Trash2 /></DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
      },
    ],
  },
  {
    name: "Popover",
    slug: "popover",
    group: "Presentation",
    parity: "shadcn",
    description: "Displays content anchored to a trigger.",
    parts: [
      "Popover",
      "PopoverTrigger",
      "PopoverContent",
      "PopoverHeader",
      "PopoverTitle",
      "PopoverDescription",
      "PopoverClose",
    ],
    props: [
      {
        name: "open / onOpenChange",
        type: "boolean / (open, details) => void",
        description: "Root state.",
      },
      {
        name: "side / align / sideOffset",
        type: "placement / alignment / number",
        default: '"bottom" / "center" / 10',
        description: "PopoverContent placement.",
      },
      baseUi("Popover", "base-ui.com/react/components/popover"),
    ],
    examples: [
      {
        title: "Details",
        code: "<Popover>\n  <PopoverTrigger render={<Button />}>Details</PopoverTrigger>\n  <PopoverContent>\n    <PopoverTitle>File details</PopoverTitle>\n    <PopoverDescription>Stored on this device.</PopoverDescription>\n  </PopoverContent>\n</Popover>",
      },
    ],
  },
  {
    name: "Progress",
    slug: "progress",
    group: "Feedback",
    parity: "shadcn",
    description: "Displays progress as a percentage of a range.",
    parts: ["Progress", "ProgressTrack", "ProgressIndicator", "ProgressLabel", "ProgressValue"],
    props: [
      {
        name: "value",
        type: "number | null",
        description: "Current value. null renders an indeterminate bar.",
      },
      { name: "min / max", type: "number", default: "0 / 100", description: "Range." },
      { name: "aria-label", type: "string", description: "Accessible name." },
      baseUi("Progress.Root", "base-ui.com/react/components/progress"),
    ],
    examples: [{ title: "Upload", code: '<Progress value={65} aria-label="Upload progress" />' }],
  },
  {
    name: "Spinner",
    slug: "spinner",
    group: "Feedback",
    parity: "shadcn",
    description: "Indicates that an operation is in progress.",
    parts: ["Spinner"],
    props: [
      { name: "aria-label", type: "string", default: '"Loading"', description: "Announced text." },
      {
        name: "className",
        type: "string",
        description: "Size and color. Defaults to 20px in the secondary label color.",
      },
    ],
    examples: [
      {
        title: "Sizes",
        code: '<Spinner />\n<Spinner className="size-7 text-[var(--ios-blue)]" aria-label="Saving" />',
      },
    ],
  },
  {
    name: "Badge",
    slug: "badge",
    group: "Feedback",
    parity: "shadcn",
    description: "Displays a count or status beside an item.",
    parts: ["Badge", "badgeVariants"],
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
        default: '"default"',
        description:
          "The shadcn/ui set in iOS colors. destructive is the red notification count; default is the accent pill.",
      },
      {
        name: "…span props",
        type: "ComponentProps<'span'>",
        description: "Children are the count. Give it an aria-label with the full meaning.",
      },
    ],
    examples: [{ title: "Unread count", code: '<Badge aria-label="3 unread messages">3</Badge>' }],
  },
  {
    name: "Toast",
    slug: "toast",
    group: "Feedback",
    parity: "shadcn",
    description: "Displays a notification with an optional description.",
    parts: ["Toaster", "toast", "createToastManager", "useToastManager"],
    props: [
      {
        name: "toast",
        type: "manager & (title, description?) => string",
        description:
          "The shared toast manager from shadcn/ui, so toast.add({ title, description }) works unchanged. It is also callable as toast(title, description).",
      },
      {
        name: "Toaster",
        type: "component",
        description: "Wrap your app once. Renders the viewport at the top.",
      },
      {
        name: "timeout",
        type: "number",
        default: "4000",
        description: "Toaster prop. Milliseconds before a toast closes.",
      },
      {
        name: "toast(title, description?)",
        type: "(ReactNode, ReactNode?) => string",
        description: "Adds a toast and returns its id.",
      },
    ],
    examples: [
      {
        title: "Setup and use",
        code: '// At the app root\n<Toaster>\n  <App />\n</Toaster>\n\n// From an event handler\ntoast("Saved to Photos", "The image was saved to your library.")',
      },
    ],
  },
]

export type ComponentSlug = (typeof catalog)[number]["slug"]
export const groups = [
  "Materials",
  "Controls",
  "Input",
  "Layout",
  "Navigation",
  "Presentation",
  "Feedback",
]
export const repository = "vantezzen/cupertinocn"
