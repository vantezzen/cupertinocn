import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  Airplay,
  Bell,
  Bluetooth,
  Bookmark,
  Check,
  ChevronRight,
  Copy,
  Ellipsis,
  Heart,
  House,
  Image,
  Layers,
  Mail,
  Music2,
  Pause,
  Play,
  Plus,
  Search,
  Share,
  ShieldCheck,
  SkipForward,
  Smartphone,
  Sun,
  Trash2,
  Volume1,
  Volume2,
  Wifi,
} from "lucide-react"
import { Button } from "../registry/ui/button"
import { AppShell, AppShellList, AppShellItem, AppShellContent } from "../registry/ui/app-shell"
import { Switch } from "../registry/ui/switch"
import { Slider } from "../registry/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../registry/ui/tabs"
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
} from "../registry/ui/alert-dialog"
import {
  List,
  ListItem,
  ListIcon,
  ListTitle,
  ListValue,
  ListHeader,
  ListFooter,
} from "../registry/ui/list"
import { Input } from "../registry/ui/input"
import { Textarea } from "../registry/ui/textarea"
import { SearchField } from "../registry/ui/search-field"
import { LiquidGlass, type GlassVariant } from "../registry/ui/liquid-glass"
import { TabBar, TabBarList, TabBarTrigger, TabBarContent } from "../registry/ui/tab-bar"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "../registry/ui/toolbar"
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "../registry/ui/drawer"
import {
  ActionSheet,
  ActionSheetTrigger,
  ActionSheetContent,
  ActionSheetGroup,
  ActionSheetTitle,
  ActionSheetDescription,
  ActionSheetAction,
  ActionSheetCancel,
} from "../registry/ui/action-sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "../registry/ui/dropdown-menu"
import {
  NavigationBar,
  NavigationBarBack,
  NavigationBarTitle,
  LargeTitle,
} from "../registry/ui/navigation-bar"
import { Checkbox } from "../registry/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../registry/ui/radio-group"
import { Progress } from "../registry/ui/progress"
import { Spinner } from "../registry/ui/spinner"
import { Badge } from "../registry/ui/badge"
import { Stepper } from "../registry/ui/stepper"
import { PageControl } from "../registry/ui/page-control"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "../registry/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../registry/ui/select"
import { toast } from "../registry/ui/toast"
import type { ComponentSlug } from "./catalog"

export function Wallpaper({
  className = "",
  animated = false,
}: {
  className?: string
  animated?: boolean
}) {
  const reducedMotion = useReducedMotion()
  const movement = animated && !reducedMotion
  return (
    <div aria-hidden="true" className={`wallpaper ${className}`}>
      <motion.div
        className="wallpaper-orb orb-one"
        animate={
          movement
            ? { x: [0, 24, -8, 0], y: [0, 18, 32, 0], rotate: [-25, -18, -29, -25] }
            : undefined
        }
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="wallpaper-orb orb-two"
        animate={
          movement
            ? { x: [0, -30, 10, 0], y: [0, -22, -8, 0], rotate: [-30, -38, -24, -30] }
            : undefined
        }
        transition={{ duration: 28, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="wallpaper-orb orb-three"
        animate={
          movement ? { x: [0, -20, 8, 0], y: [0, 26, 12, 0], rotate: [35, 27, 40, 35] } : undefined
        }
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  )
}

export function MusicPlayer({ variant = "regular" }: { variant?: GlassVariant }) {
  const [playing, setPlaying] = useState(false)
  const [track, setTrack] = useState(0)
  const tracks = [
    { name: "Weightless", artist: "Marconi Union" },
    { name: "A Walk", artist: "Tycho" },
    { name: "First Breath", artist: "Ólafur Arnalds" },
  ]
  return (
    <LiquidGlass variant={variant} className="music-player rounded-[26px]">
      <div className="player-inner">
        <div className={`album-art art-${track}`}>
          <span />
        </div>
        <div className="track-info">
          <strong>{tracks[track].name}</strong>
          <span>{tracks[track].artist}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-current"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "Pause preview" : "Play preview"}
        >
          {playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-current"
          onClick={() => setTrack((track + 1) % tracks.length)}
          aria-label="Next track"
        >
          <SkipForward fill="currentColor" />
        </Button>
      </div>
    </LiquidGlass>
  )
}

/** Detailed content behind the glass, so the lens has edges and letters to bend. */
function SceneContent() {
  return (
    <div className="scene-content" aria-hidden="true">
      <div className="scene-grid" />
      <p className="scene-headline">
        Light bends
        <br />
        at the edge.
      </p>
    </div>
  )
}

export function GlassPlayground({ compact = false }: { compact?: boolean }) {
  const [variant, setVariant] = useState<GlassVariant>("regular")
  const [background, setBackground] = useState(0)
  return (
    <div className={`glass-playground ${compact ? "compact" : ""}`}>
      <div className={`glass-scene scene-${background}`}>
        <Wallpaper animated />
        <SceneContent />
        <div className="scene-player">
          <MusicPlayer variant={variant} />
          <div className="scene-toolbar">
            <Toolbar aria-label="Glass photo actions">
              <ToolbarButton
                aria-label="Favorite photo"
                onClick={() => toast("Added to Favorites")}
              >
                <Heart />
              </ToolbarButton>
              <ToolbarButton aria-label="Save photo" onClick={() => toast("Photo saved")}>
                <Bookmark />
              </ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton
                aria-label="Photo information"
                onClick={() =>
                  toast("Preview backdrop", "CSS gradients. No external image requests.")
                }
              >
                <Ellipsis />
              </ToolbarButton>
            </Toolbar>
          </div>
          <div className="scene-buttons">
            <Button variant="glass" size="icon" aria-label="Add">
              <Plus />
            </Button>
            <Button onClick={() => toast("Prominent glass", "The wash is the accent color.")}>
              Continue
            </Button>
            <LiquidGlass variant={variant} className="scene-chip">
              Drag me
            </LiquidGlass>
          </div>
        </div>
      </div>
      <div className="glass-settings">
        <div className="material-control">
          <span id="material-variant">Material</span>
          <Tabs value={variant} onValueChange={(value) => setVariant(value as GlassVariant)}>
            <TabsList aria-labelledby="material-variant">
              <TabsTrigger value="opaque">Opaque</TabsTrigger>
              <TabsTrigger value="regular">Regular</TabsTrigger>
              <TabsTrigger value="clear">Clear</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="background-picker">
          <span>Backdrop</span>
          {["Color", "Grid", "Dark"].map((name, index) => (
            <button
              key={name}
              className={`swatch swatch-${index}`}
              aria-label={`${name} backdrop`}
              aria-pressed={background === index}
              onClick={() => setBackground(index)}
            >
              {background === index && <Check size={12} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlertDemo() {
  return (
    <AlertDialog>
      <LiquidGlass className="alert-specimen cupertino-panel">
        <div className="alert-specimen-copy">
          <strong>Allow notifications?</strong>
          <p>
            Receive alerts when your
            <br />
            downloads finish.
          </p>
        </div>
        <div className="alert-specimen-actions">
          <Button
            variant="secondary"
            onClick={() => toast("Notifications off", "You can change this any time.")}
          >
            Not Now
          </Button>
          <AlertDialogTrigger render={<Button />}>Continue</AlertDialogTrigger>
        </div>
      </LiquidGlass>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Allow notifications?</AlertDialogTitle>
          <AlertDialogDescription>
            We’ll let you know when new components are available.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Not Now</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              toast("Preview enabled", "This demo does not request browser permissions.")
            }
          >
            Allow
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function SettingsDemo({ full = false }: { full?: boolean }) {
  return (
    <div className="settings-demo">
      <List>
        <ListItem>
          <ListIcon className="bg-[#0088ff]">
            <Wifi />
          </ListIcon>
          <ListTitle>Wi-Fi</ListTitle>
          <ListValue>
            Studio <ChevronRight />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListIcon className="bg-[#0088ff]">
            <Bluetooth />
          </ListIcon>
          <ListTitle>Bluetooth</ListTitle>
          <ListValue>
            On <ChevronRight />
          </ListValue>
        </ListItem>
        <ListItem>
          <ListIcon className="bg-[#30d158]">
            <Smartphone />
          </ListIcon>
          <ListTitle>Cellular</ListTitle>
          <ListValue>
            <ChevronRight />
          </ListValue>
        </ListItem>
        {full && (
          <ListItem>
            <ListIcon className="bg-[#ff9500]">
              <Bell />
            </ListIcon>
            <ListTitle>Notifications</ListTitle>
            <ListValue>
              <ChevronRight />
            </ListValue>
          </ListItem>
        )}
      </List>
      {full && <ListFooter>Changes are saved automatically.</ListFooter>}
    </div>
  )
}

export function Demo({ slug }: { slug: ComponentSlug }) {
  const [value, setValue] = useState(64)
  const [page, setPage] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [query, setQuery] = useState("")
  switch (slug) {
    case "liquid-glass":
      return <GlassPlayground compact />
    case "app-shell":
      return <AppShellDemo />
    case "button":
      return (
        <div className="button-demo">
          <Button onClick={() => toast("Added to Library", "The item was added to your library.")}>
            <Plus /> Add to Library
          </Button>
          <div className="demo-row">
            <Button variant="secondary" onClick={() => toast("Changes cancelled")}>
              Cancel
            </Button>
            <Button variant="tinted" onClick={() => toast("Changes saved")}>
              <Check /> Done
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => toast("Component source", "Install the component to edit its source.")}
          >
            Learn more <ChevronRight />
          </Button>
        </div>
      )
    case "switch":
      return (
        <div className="switch-demo">
          <label>
            <span>Airplane Mode</span>
            <Switch />
          </label>
          <label>
            <span>Wi-Fi</span>
            <Switch defaultChecked />
          </label>
          <label className="muted">
            <span>Personal Hotspot</span>
            <Switch disabled />
          </label>
        </div>
      )
    case "slider":
      return (
        <div className="slider-demo">
          <div className="demo-row">
            <Volume1 size={19} />
            <Slider
              aria-label="Volume"
              value={[value]}
              onValueChange={(v) => setValue(Array.isArray(v) ? v[0] : v)}
            />
            <Volume2 size={22} />
          </div>
          <div className="demo-row">
            <Sun size={18} />
            <Slider aria-label="Brightness" defaultValue={[38]} />
            <Sun size={25} />
          </div>
          <p className="demo-footnote">Volume · {value}%</p>
        </div>
      )
    case "tabs":
      return (
        <div className="full-demo">
          <Tabs defaultValue="day">
            <TabsList aria-label="Activity period">
              {["Day", "Week", "Month"].map((label) => (
                <TabsTrigger key={label} value={label.toLowerCase()}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {["day", "week", "month"].map((period, i) => (
              <TabsContent key={period} value={period}>
                <div className="activity-bars" aria-label={`Activity for this ${period}`}>
                  {[35, 58, 45, 72, 52, 88, 64, 48, 76, 58, 93, 68].map((height, j) => (
                    <span
                      key={j}
                      style={{ height: `${Math.max(15, height - i * (j % 3) * 8)}%` }}
                    />
                  ))}
                </div>
                <p className="demo-footnote">Activity for this {period}.</p>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )
    case "alert-dialog":
      return <AlertDemo />
    case "list":
      return <SettingsDemo />
    case "input":
      return (
        <div className="input-demo">
          <Input aria-label="Full name" placeholder="Full name" />
          <Input aria-label="Email address" type="email" placeholder="Email address" />
        </div>
      )
    case "textarea":
      return (
        <div className="input-demo">
          <Textarea aria-label="Note" placeholder="Add a note…" className="min-h-24" />
        </div>
      )
    case "search-field":
      return (
        <div className="full-demo">
          <SearchField value={query} onValueChange={setQuery} placeholder="Search your library" />
          <div className="search-results">
            {["Morning favorites", "Recently played", "Weekend discoveries"]
              .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
              .map((item) => (
                <div key={item}>
                  <Search size={15} />
                  {item}
                </div>
              ))}
            {query &&
              !["Morning favorites", "Recently played", "Weekend discoveries"].some((item) =>
                item.toLowerCase().includes(query.toLowerCase()),
              ) && <p>No results for “{query}”</p>}
          </div>
        </div>
      )
    case "checkbox":
      return (
        <div className="choice-demo">
          <label>
            <Checkbox defaultChecked /> Keep me updated
          </label>
          <label>
            <Checkbox /> Download over cellular
          </label>
          <label className="muted">
            <Checkbox disabled /> Managed by your organization
          </label>
        </div>
      )
    case "radio-group":
      return (
        <RadioGroup defaultValue="all" aria-label="Notification preference" className="choice-demo">
          <label>
            <RadioGroupItem value="all" /> All notifications
          </label>
          <label>
            <RadioGroupItem value="important" /> Important only
          </label>
          <label>
            <RadioGroupItem value="none" /> None
          </label>
        </RadioGroup>
      )
    case "stepper":
      return (
        <div className="stepper-demo">
          <span>Guests</span>
          <Stepper min={1} max={8} defaultValue={2} aria-label="Number of guests" />
          <p className="demo-footnote">Select 1 to 8 guests.</p>
        </div>
      )
    case "select":
      return (
        <div className="choice-demo">
          <span className="demo-footnote">Appearance</span>
          <Select defaultValue="auto" items={{ auto: "Automatic", light: "Light", dark: "Dark" }}>
            <SelectTrigger aria-label="Appearance">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Automatic</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
          <p className="demo-footnote">Use the system setting or select a theme.</p>
        </div>
      )
    case "tab-bar":
      return (
        <TabBar defaultValue="home" className="full-demo">
          <div className="tab-demo-content">
            {[
              { v: "home", label: "Home", Icon: House },
              { v: "favorites", label: "Favorites", Icon: Heart },
              { v: "library", label: "Library", Icon: Layers },
              { v: "search", label: "Search", Icon: Search },
            ].map(({ v, label, Icon }) => (
              <TabBarContent key={v} value={v}>
                <Icon size={32} strokeWidth={1.5} />
                <p>{label}</p>
              </TabBarContent>
            ))}
          </div>
          <TabBarList aria-label="App navigation">
            <TabBarTrigger value="home">
              <House />
              Home
            </TabBarTrigger>
            <TabBarTrigger value="favorites">
              <Heart />
              Favorites
            </TabBarTrigger>
            <TabBarTrigger value="library">
              <Layers />
              Library
            </TabBarTrigger>
            <TabBarTrigger value="search">
              <Search />
              Search
            </TabBarTrigger>
          </TabBarList>
        </TabBar>
      )
    case "toolbar":
      return (
        <div className="toolbar-demo">
          <div className="photo-mini">
            <Wallpaper />
          </div>
          <Toolbar aria-label="Photo actions">
            <ToolbarButton
              aria-label={favorite ? "Remove favorite" : "Favorite"}
              aria-pressed={favorite}
              onClick={() => setFavorite(!favorite)}
            >
              <Heart
                fill={favorite ? "currentColor" : "none"}
                className={favorite ? "text-[#ff383c]" : ""}
              />
            </ToolbarButton>
            <ToolbarButton aria-label="Save photo" onClick={() => toast("Saved to your library")}>
              <Bookmark />
            </ToolbarButton>
            <ToolbarSeparator />
            <ToolbarButton
              aria-label="Share photo"
              onClick={() => toast("Share preview", "Connect your own sharing action here.")}
            >
              <Share />
            </ToolbarButton>
          </Toolbar>
        </div>
      )
    case "navigation-bar":
      return (
        <div className="navigation-demo">
          <NavigationBar aria-label="Photo navigation">
            <NavigationBarBack onClick={() => toast("Back to your library")} />
            <NavigationBarTitle>All Photos</NavigationBarTitle>
            <Button
              size="icon"
              variant="glass"
              aria-label="More photo options"
              onClick={() => toast("Photo options", "Select, sort, or filter your library.")}
            >
              <Ellipsis />
            </Button>
          </NavigationBar>
          <LargeTitle>Library</LargeTitle>
          <div className="photo-grid">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className={`mini-photo mini-photo-${i}`} />
            ))}
          </div>
        </div>
      )
    case "page-control":
      return (
        <div className="page-demo">
          <div className={`page-art page-art-${page}`}>
            <span>{["Hello.", "Explore.", "Create.", "Enjoy."][page]}</span>
          </div>
          <PageControl count={4} value={page} onValueChange={setPage} />
        </div>
      )
    case "drawer":
      return (
        <Drawer>
          <div className="presentation-demo">
            <div className="presentation-icon">
              <Layers />
            </div>
            <p>View settings in a sheet.</p>
            <DrawerTrigger render={<Button variant="secondary" />}>Open Drawer</DrawerTrigger>
          </div>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Drag down to dismiss, or select Done.</DrawerDescription>
            </DrawerHeader>
            <div className="px-6">
              <SettingsDemo full />
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button />}>Done</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )
    case "action-sheet":
      return (
        <ActionSheet>
          <div className="presentation-demo">
            <div className="presentation-icon">
              <Share />
            </div>
            <p>Save, favorite, or delete a photo.</p>
            <ActionSheetTrigger render={<Button variant="secondary" />}>
              Photo Options
            </ActionSheetTrigger>
          </div>
          <ActionSheetContent>
            <ActionSheetGroup>
              <ActionSheetTitle>Photo options</ActionSheetTitle>
              <ActionSheetDescription>Choose what to do with this photo.</ActionSheetDescription>
              <ActionSheetAction onClick={() => toast("Saved to Photos")}>
                Save Image
              </ActionSheetAction>
              <ActionSheetAction onClick={() => toast("Added to Favorites")}>
                Add to Favorites
              </ActionSheetAction>
              <ActionSheetAction
                variant="destructive"
                onClick={() => toast("Photo removed from this preview")}
              >
                Delete Photo
              </ActionSheetAction>
            </ActionSheetGroup>
            <ActionSheetCancel>Cancel</ActionSheetCancel>
          </ActionSheetContent>
        </ActionSheet>
      )
    case "dropdown-menu":
      return (
        <DropdownMenu>
          <div className="presentation-demo">
            <div className="presentation-icon">
              <Ellipsis />
            </div>
            <p>Open the menu to view photo actions.</p>
            <DropdownMenuTrigger render={<Button variant="secondary" />}>
              Options <ChevronRight />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => toast("Copied to this preview")}>
              Copy <Copy />
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem checked={favorite} onCheckedChange={setFavorite}>
              Favorite <Heart />
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem onClick={() => toast("Saved to your library")}>
              Save Image <Image />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => toast("Removed from this preview")}
            >
              Delete <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    case "popover":
      return (
        <Popover>
          <div className="presentation-demo">
            <div className="presentation-icon">
              <ShieldCheck />
            </div>
            <p>View details in an anchored popup.</p>
            <PopoverTrigger render={<Button variant="secondary" />}>Show details</PopoverTrigger>
          </div>
          <PopoverContent>
            <PopoverTitle>File details</PopoverTitle>
            <PopoverDescription>
              This image is stored on your device. Open the file to view its metadata.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      )
    case "progress":
      return (
        <div className="full-demo">
          <div className="progress-label">
            <span>Uploading files</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} aria-label="Upload progress" />
          <div className="progress-actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setValue(value >= 100 ? 0 : Math.min(100, value + 12))}
            >
              {value >= 100 ? "Start again" : "Advance upload"}
            </Button>
          </div>
        </div>
      )
    case "spinner":
      return (
        <div className="spinner-demo">
          <Spinner />
          <Spinner className="h-7 w-7 text-[var(--ios-blue)]" />
          <div className="spinner-pill">
            <Spinner /> <span>Saving your changes</span>
          </div>
        </div>
      )
    case "badge":
      return (
        <div className="badge-demo">
          <div className="app-icon icon-messages">
            <Mail size={29} />
            <Badge variant="destructive">3</Badge>
          </div>
          <div className="app-icon icon-music">
            <Music2 size={29} />
            <Badge variant="destructive">12</Badge>
          </div>
          <div className="app-icon icon-airplay">
            <Airplay size={29} />
            <Badge variant="destructive">1</Badge>
          </div>
        </div>
      )
    case "toast":
      return (
        <div className="presentation-demo">
          <div className="presentation-icon">
            <Bell />
          </div>
          <p>Display a notification.</p>
          <Button
            variant="secondary"
            onClick={() => toast("Saved to Photos", "The image was saved to your library.")}
          >
            Show Notification
          </Button>
        </div>
      )
  }
}

/** Master-detail navigation: folders beside their notes, or a list that pushes notes in on phones. */
const folders = [
  { value: "inbox", name: "Inbox", icon: Mail, color: "#0a84ff", count: 4 },
  { value: "ideas", name: "Ideas", icon: Sun, color: "#ff9f0a", count: 7 },
  { value: "reading", name: "Reading list", icon: Bookmark, color: "#bf5af2", count: 12 },
]
const notes: Record<string, string[]> = {
  inbox: ["Call the dentist", "Return the library books", "Renew passport", "Plan the trip"],
  ideas: ["A slower to-do app", "Glass material for the web", "Weekend bread recipes"],
  reading: ["Designing Interfaces", "The Design of Everyday Things", "Refactoring UI"],
}
export function AppShellDemo() {
  return (
    <AppShell className="app-shell-demo">
      <AppShellList aria-label="Folders">
        <LargeTitle className="pt-5">Notes</LargeTitle>
        <ListHeader>Folders</ListHeader>
        <List>
          {folders.map((folder) => (
            <AppShellItem
              key={folder.value}
              value={folder.value}
              detail={folder.count}
              icon={
                <ListIcon style={{ background: folder.color }}>
                  <folder.icon />
                </ListIcon>
              }
            >
              {folder.name}
            </AppShellItem>
          ))}
        </List>
      </AppShellList>
      {folders.map((folder) => (
        <AppShellContent
          key={folder.value}
          value={folder.value}
          title={folder.name}
          subtitle={`${folder.count} notes`}
          backLabel="Notes"
          actions={
            <Button
              size="icon"
              variant="glass"
              aria-label="New note"
              onClick={() => toast("New note")}
            >
              <Plus />
            </Button>
          }
        >
          <List className="mt-4">
            {notes[folder.value].map((note) => (
              <ListItem key={note}>
                <ListTitle>{note}</ListTitle>
                <ListValue>
                  <ChevronRight />
                </ListValue>
              </ListItem>
            ))}
          </List>
        </AppShellContent>
      ))}
    </AppShell>
  )
}

/** The landing composition: the material and the interactive controls on one stage. */
export function HeroStage() {
  const [wifi, setWifi] = useState(true)
  const [favorite, setFavorite] = useState(false)
  return (
    <div className="hero-stage" data-ios-theme="light">
      <Wallpaper animated />
      <SceneContent />
      <div className="stage-row stage-row-top">
        <Tabs defaultValue="today">
          <TabsList aria-label="Period" className="stage-segments">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="glass" size="icon" aria-label="Search">
          <Search />
        </Button>
      </div>
      <div className="stage-row stage-row-middle">
        <LiquidGlass variant="opaque" interactive={false} className="stage-card">
          <label>
            <span>Wi-Fi</span>
            <Switch checked={wifi} onCheckedChange={setWifi} />
          </label>
          <label>
            <span>Bluetooth</span>
            <Switch defaultChecked />
          </label>
          <div className="stage-slider">
            <Volume1 size={18} aria-hidden="true" />
            <Slider defaultValue={[62]} aria-label="Volume" />
            <Volume2 size={20} aria-hidden="true" />
          </div>
        </LiquidGlass>
        <div className="stage-column">
          <MusicPlayer />
          <div className="stage-actions">
            <Toolbar aria-label="Actions">
              <ToolbarButton
                aria-label={favorite ? "Remove favorite" : "Favorite"}
                aria-pressed={favorite}
                onClick={() => setFavorite(!favorite)}
              >
                <Heart
                  fill={favorite ? "currentColor" : "none"}
                  className={favorite ? "text-[var(--ios-red)]" : undefined}
                />
              </ToolbarButton>
              <ToolbarButton aria-label="Save" onClick={() => toast("Saved")}>
                <Bookmark />
              </ToolbarButton>
              <ToolbarSeparator />
              <ToolbarButton aria-label="Share" onClick={() => toast("Share")}>
                <Share />
              </ToolbarButton>
            </Toolbar>
            <Button onClick={() => toast("Continue", "Prominent glass in the accent color.")}>
              Continue
            </Button>
          </div>
        </div>
      </div>
      <TabBar defaultValue="home" className="stage-row stage-row-bottom">
        <TabBarList aria-label="Sections">
          <TabBarTrigger value="home">
            <House />
            Home
          </TabBarTrigger>
          <TabBarTrigger value="favorites">
            <Heart />
            Favorites
          </TabBarTrigger>
          <TabBarTrigger value="library">
            <Layers />
            Library
          </TabBarTrigger>
          <TabBarTrigger value="search">
            <Search />
            Search
          </TabBarTrigger>
        </TabBarList>
      </TabBar>
    </div>
  )
}
