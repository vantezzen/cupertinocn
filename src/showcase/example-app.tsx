import { useState, type CSSProperties, type ReactNode } from "react"
import { Link } from "react-router"
import { Wallpaper } from "./demos"
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Coffee,
  Copy,
  Droplets,
  Egg,
  Ellipsis,
  Fish,
  Flame,
  Heart,
  House,
  Plus,
  Salad,
  Sandwich,
  Share,
  Soup,
  Trash2,
  TrendingUp,
  User,
  Utensils,
} from "lucide-react"
import { Badge } from "../registry/ui/badge"
import { Button } from "../registry/ui/button"
import { Checkbox } from "../registry/ui/checkbox"
import { Input } from "../registry/ui/input"
import {
  List,
  ListItem,
  ListIcon,
  ListTitle,
  ListValue,
  ListHeader,
  ListFooter,
} from "../registry/ui/list"
import { LargeTitle } from "../registry/ui/navigation-bar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../registry/ui/dropdown-menu"
import { Progress } from "../registry/ui/progress"
import { RadioGroup, RadioGroupItem } from "../registry/ui/radio-group"
import { SearchField } from "../registry/ui/search-field"
import { Tabs, TabsList, TabsTrigger } from "../registry/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../registry/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../registry/ui/drawer"
import { Slider } from "../registry/ui/slider"
import { Stepper } from "../registry/ui/stepper"
import { Switch } from "../registry/ui/switch"
import { TabBar, TabBarContent, TabBarList, TabBarTrigger } from "../registry/ui/tab-bar"
import {
  ActionSheet,
  ActionSheetAction,
  ActionSheetCancel,
  ActionSheetContent,
  ActionSheetDescription,
  ActionSheetGroup,
  ActionSheetTitle,
  ActionSheetTrigger,
} from "../registry/ui/action-sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../registry/ui/alert-dialog"
import { toast } from "../registry/ui/toast"

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack"

type Meal = {
  id: number
  name: string
  type: MealType
  kcal: number
  protein: number
  carbs: number
  fat: number
  time: string
}

type Recipe = {
  name: string
  kcal: number
  protein: number
  carbs: number
  fat: number
  minutes: number
  icon: typeof Salad
  color: string
}

const mealTypes: MealType[] = ["Breakfast", "Lunch", "Dinner", "Snack"]
const mealIcons: Record<MealType, typeof Coffee> = {
  Breakfast: Coffee,
  Lunch: Sandwich,
  Dinner: Utensils,
  Snack: Egg,
}
const mealColors: Record<MealType, string> = {
  Breakfast: "#ff9f0a",
  Lunch: "#30d158",
  Dinner: "#5e5ce6",
  Snack: "#ff375f",
}

const initialMeals: Meal[] = [
  {
    id: 1,
    name: "Overnight oats",
    type: "Breakfast",
    kcal: 420,
    protein: 18,
    carbs: 62,
    fat: 11,
    time: "7:40",
  },
  {
    id: 2,
    name: "Chicken caesar salad",
    type: "Lunch",
    kcal: 560,
    protein: 42,
    carbs: 24,
    fat: 31,
    time: "12:30",
  },
  {
    id: 3,
    name: "Greek yogurt & berries",
    type: "Snack",
    kcal: 180,
    protein: 15,
    carbs: 19,
    fat: 5,
    time: "15:10",
  },
]

const recipes: Recipe[] = [
  {
    name: "Salmon poke bowl",
    kcal: 610,
    protein: 38,
    carbs: 58,
    fat: 22,
    minutes: 15,
    icon: Fish,
    color: "#ff9f0a",
  },
  {
    name: "Lentil soup",
    kcal: 340,
    protein: 18,
    carbs: 48,
    fat: 7,
    minutes: 35,
    icon: Soup,
    color: "#ff453a",
  },
  {
    name: "Caprese sandwich",
    kcal: 480,
    protein: 21,
    carbs: 52,
    fat: 19,
    minutes: 10,
    icon: Sandwich,
    color: "#30d158",
  },
  {
    name: "Shakshuka",
    kcal: 390,
    protein: 22,
    carbs: 26,
    fat: 21,
    minutes: 25,
    icon: Egg,
    color: "#ff375f",
  },
  {
    name: "Chicken burrito bowl",
    kcal: 720,
    protein: 46,
    carbs: 71,
    fat: 24,
    minutes: 20,
    icon: Utensils,
    color: "#5e5ce6",
  },
  {
    name: "Green smoothie",
    kcal: 210,
    protein: 6,
    carbs: 41,
    fat: 3,
    minutes: 5,
    icon: Coffee,
    color: "#34c759",
  },
  {
    name: "Quinoa salad",
    kcal: 430,
    protein: 14,
    carbs: 55,
    fat: 16,
    minutes: 15,
    icon: Salad,
    color: "#0a84ff",
  },
]

const week = [
  { day: "Mon", kcal: 1980 },
  { day: "Tue", kcal: 2240 },
  { day: "Wed", kcal: 2100 },
  { day: "Thu", kcal: 1750 },
  { day: "Fri", kcal: 2310 },
  { day: "Sat", kcal: 2050 },
]
const month = [
  { day: "Week 1", kcal: 2080 },
  { day: "Week 2", kcal: 2190 },
  { day: "Week 3", kcal: 1960 },
  { day: "This week", kcal: 2070 },
]

/** A list row whose whole width is one label, so tapping the text toggles the control. */
function Row({ children }: { children: ReactNode }) {
  return (
    <ListItem className="p-0">
      <label className="flex min-h-11 w-full min-w-0 items-center gap-3 px-4 py-2.5">
        {children}
      </label>
    </ListItem>
  )
}

function Macro({
  label,
  value,
  goal,
  color,
  unit = "g",
}: {
  label: string
  value: number
  goal: number
  color: string
  unit?: string
}) {
  return (
    <ListItem className="flex-col items-stretch gap-2 py-3">
      <div className="flex items-baseline justify-between text-[15px]">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ background: color }} />
          {label}
        </span>
        <span className="text-[var(--ios-secondary)]">
          {value} / {goal} {unit}
        </span>
      </div>
      <Progress
        value={Math.min(100, (value / goal) * 100)}
        aria-label={`${label} progress`}
        style={{ "--bar": color } as CSSProperties}
        className="[&_[data-slot=progress-indicator]]:bg-[var(--bar)]"
      />
    </ListItem>
  )
}

/**
 * A nutrition tracker built from the registry: a tab bar app with a day view, a recipe library,
 * weekly progress, and a profile. The bar floats at the bottom on phones and at the top on wider
 * screens, where the content sits in a centered column.
 */
export function NutritionApp({ className }: { className?: string }) {
  const [meals, setMeals] = useState<Meal[]>(initialMeals)
  const [water, setWater] = useState(5)
  const [goal, setGoal] = useState(2200)
  const [proteinGoal, setProteinGoal] = useState(140)
  const [favorites, setFavorites] = useState<string[]>(["Salmon poke bowl", "Shakshuka"])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [range, setRange] = useState("week")
  const [reminders, setReminders] = useState(true)
  const [nextId, setNextId] = useState(10)
  const [draft, setDraft] = useState({
    name: "",
    type: "Lunch" as MealType,
    kcal: 450,
    servings: 1,
  })

  const totals = meals.reduce(
    (sum, meal) => ({
      kcal: sum.kcal + meal.kcal,
      protein: sum.protein + meal.protein,
      carbs: sum.carbs + meal.carbs,
      fat: sum.fat + meal.fat,
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  )
  const remaining = Math.max(0, goal - totals.kcal)

  function addMeal(meal: Omit<Meal, "id" | "time">) {
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    setMeals((all) => [...all, { ...meal, id: nextId, time }])
    setNextId((id) => id + 1)
    toast("Logged", `${meal.name} · ${meal.kcal} kcal`)
  }

  const visibleRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (filter === "all" ||
        (filter === "favorites" && favorites.includes(recipe.name)) ||
        (filter === "quick" && recipe.minutes <= 15)),
  )
  const days = range === "week" ? [...week, { day: "Today", kcal: totals.kcal }] : month
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <TabBar defaultValue="today" className={`nutrition-app ${className ?? ""}`}>
      <Wallpaper animated className="nutrition-wallpaper" />
      <div className="nutrition-scroll">
        <TabBarContent value="today">
          <LargeTitle className="pt-2">Today</LargeTitle>
          <p className="nutrition-subtitle">{today}</p>
          <div className="nutrition-grid">
            <div>
              <div className="nutrition-hero">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-[13px] tracking-[0.02em] text-white/75 uppercase">
                      Remaining
                    </span>
                    <span className="text-[40px] leading-[46px] font-bold tracking-[-0.6px]">
                      {remaining.toLocaleString()}
                      <span className="ml-1.5 text-[17px] font-medium text-white/80">kcal</span>
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[15px] text-white/85">
                    <Flame size={16} /> {totals.kcal.toLocaleString()} of {goal.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (totals.kcal / goal) * 100)}
                  aria-label="Calories"
                  className="mt-4 [&_[data-slot=progress-indicator]]:bg-white [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-white/30"
                />
              </div>
              <List className="mt-3">
                <Macro label="Protein" value={totals.protein} goal={proteinGoal} color="#0a84ff" />
                <Macro label="Carbs" value={totals.carbs} goal={250} color="#ff9f0a" />
                <Macro label="Fat" value={totals.fat} goal={70} color="#bf5af2" />
              </List>
              <ListHeader>Water</ListHeader>
              <List>
                <ListItem>
                  <ListIcon className="bg-[#0a84ff]">
                    <Droplets />
                  </ListIcon>
                  <ListTitle>
                    {water} of 8 glasses
                    <span className="block text-[13px] text-[var(--ios-secondary)]">
                      {water * 250} ml
                    </span>
                  </ListTitle>
                  <Stepper
                    min={0}
                    max={12}
                    value={water}
                    onValueChange={(value) => setWater(value ?? 0)}
                    aria-label="Glasses of water"
                  />
                </ListItem>
                <ListItem className="py-3">
                  <Progress
                    value={(water / 8) * 100}
                    aria-label="Water progress"
                    className="[&_[data-slot=progress-indicator]]:bg-[#32ade6]"
                  />
                </ListItem>
              </List>
            </div>
            <div>
              <ListHeader className="flex items-end justify-between pt-5 md:pt-0">
                <span>Meals</span>
                <span className="tracking-normal normal-case">{meals.length} logged</span>
              </ListHeader>
              <List>
                {meals.map((meal) => {
                  const Icon = mealIcons[meal.type]
                  return (
                    <ListItem key={meal.id}>
                      <ListIcon style={{ background: mealColors[meal.type] }}>
                        <Icon />
                      </ListIcon>
                      <ListTitle>
                        {meal.name}
                        <span className="block text-[13px] text-[var(--ios-secondary)]">
                          {meal.type} · {meal.time}
                        </span>
                      </ListTitle>
                      <ListValue>{meal.kcal} kcal</ListValue>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              aria-label={`${meal.name} options`}
                            />
                          }
                        >
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => addMeal(meal)}>
                            Log again <Copy />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              setMeals((all) => all.filter((item) => item.id !== meal.id))
                              toast("Removed", meal.name)
                            }}
                          >
                            Remove <Trash2 />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ListItem>
                  )
                })}
                {!meals.length && (
                  <ListItem className="justify-center py-8 text-[var(--ios-secondary)]">
                    Nothing logged yet.
                  </ListItem>
                )}
              </List>
              <div className="mt-4 flex justify-center">
                <Drawer>
                  <DrawerTrigger render={<Button />}>
                    <Plus /> Log a meal
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Log a meal</DrawerTitle>
                      <DrawerDescription>Add what you ate to today.</DrawerDescription>
                    </DrawerHeader>
                    <div className="px-6">
                      <List className="p-2">
                        <Input
                          placeholder="What did you eat?"
                          aria-label="Meal name"
                          value={draft.name}
                          onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                        />
                      </List>
                      <List className="mt-3">
                        <ListItem>
                          <ListTitle>Meal</ListTitle>
                          <Select
                            value={draft.type}
                            onValueChange={(value) =>
                              setDraft({ ...draft, type: value as MealType })
                            }
                            items={Object.fromEntries(mealTypes.map((type) => [type, type]))}
                          >
                            <SelectTrigger aria-label="Meal type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {mealTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </ListItem>
                        <ListItem>
                          <ListTitle>Servings</ListTitle>
                          <Stepper
                            min={1}
                            max={5}
                            value={draft.servings}
                            onValueChange={(value) => setDraft({ ...draft, servings: value ?? 1 })}
                            aria-label="Servings"
                          />
                        </ListItem>
                        <ListItem className="flex-col items-stretch gap-2 py-3">
                          <div className="flex justify-between">
                            <span>Calories per serving</span>
                            <span className="text-[var(--ios-secondary)]">{draft.kcal} kcal</span>
                          </div>
                          <Slider
                            aria-label="Calories"
                            min={50}
                            max={1200}
                            step={10}
                            value={[draft.kcal]}
                            onValueChange={(value) =>
                              setDraft({ ...draft, kcal: Array.isArray(value) ? value[0] : value })
                            }
                          />
                        </ListItem>
                      </List>
                      <ListFooter>
                        {draft.kcal * draft.servings} kcal in total. Macros are estimated from the
                        calories.
                      </ListFooter>
                    </div>
                    <DrawerFooter>
                      <DrawerClose
                        render={<Button />}
                        disabled={!draft.name.trim()}
                        onClick={() => {
                          const kcal = draft.kcal * draft.servings
                          addMeal({
                            name: draft.name.trim(),
                            type: draft.type,
                            kcal,
                            protein: Math.round((kcal * 0.25) / 4),
                            carbs: Math.round((kcal * 0.45) / 4),
                            fat: Math.round((kcal * 0.3) / 9),
                          })
                          setDraft({ name: "", type: "Lunch", kcal: 450, servings: 1 })
                        }}
                      >
                        Add to today
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        </TabBarContent>

        <TabBarContent value="recipes">
          <LargeTitle className="pt-2">Recipes</LargeTitle>
          <p className="nutrition-subtitle">Saved meals you can log with one tap.</p>
          <div className="nutrition-column">
            <SearchField value={query} onValueChange={setQuery} placeholder="Search recipes" />
            <Tabs
              value={filter}
              onValueChange={(value) => setFilter(String(value))}
              className="mt-3"
            >
              <TabsList aria-label="Recipe filter">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="quick">Under 15 min</TabsTrigger>
              </TabsList>
            </Tabs>
            <List className="mt-4">
              {visibleRecipes.map((recipe) => {
                const favorite = favorites.includes(recipe.name)
                return (
                  <ListItem key={recipe.name}>
                    <ListIcon style={{ background: recipe.color }}>
                      <recipe.icon />
                    </ListIcon>
                    <ListTitle>
                      <span className="flex items-center gap-2">
                        {recipe.name}
                        {recipe.minutes <= 10 && (
                          <Badge className="bg-[var(--ios-green)]">Quick</Badge>
                        )}
                      </span>
                      <span className="block text-[13px] text-[var(--ios-secondary)]">
                        {recipe.kcal} kcal · {recipe.protein}g protein · {recipe.minutes} min
                      </span>
                    </ListTitle>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label={
                        favorite
                          ? `Remove ${recipe.name} from favorites`
                          : `Add ${recipe.name} to favorites`
                      }
                      aria-pressed={favorite}
                      onClick={() =>
                        setFavorites((all) =>
                          favorite
                            ? all.filter((name) => name !== recipe.name)
                            : [...all, recipe.name],
                        )
                      }
                    >
                      <Heart fill={favorite ? "currentColor" : "none"} />
                    </Button>
                    <Button
                      size="sm"
                      variant="tinted"
                      onClick={() =>
                        addMeal({
                          name: recipe.name,
                          type: "Dinner",
                          kcal: recipe.kcal,
                          protein: recipe.protein,
                          carbs: recipe.carbs,
                          fat: recipe.fat,
                        })
                      }
                    >
                      Log
                    </Button>
                  </ListItem>
                )
              })}
              {!visibleRecipes.length && (
                <ListItem className="justify-center py-8 text-[var(--ios-secondary)]">
                  No recipes match.
                </ListItem>
              )}
            </List>
          </div>
        </TabBarContent>

        <TabBarContent value="progress">
          <LargeTitle className="pt-2">Progress</LargeTitle>
          <p className="nutrition-subtitle">
            <Badge className="mr-2 inline-flex bg-[var(--ios-orange)]">6 day streak</Badge>
            You stayed under your goal on 5 of the last 7 days.
          </p>
          <div className="nutrition-grid">
            <div>
              <Tabs value={range} onValueChange={(value) => setRange(String(value))}>
                <TabsList aria-label="Range">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
              <List className="mt-4">
                {days.map((entry) => (
                  <ListItem key={entry.day} className="flex-col items-stretch gap-2 py-3">
                    <div className="flex justify-between text-[15px]">
                      <span className={entry.day === "Today" ? "font-semibold" : undefined}>
                        {entry.day}
                      </span>
                      <span
                        className={
                          entry.kcal > goal
                            ? "text-[var(--ios-red)]"
                            : "text-[var(--ios-secondary)]"
                        }
                      >
                        {entry.kcal.toLocaleString()} kcal
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, (entry.kcal / goal) * 100)}
                      aria-label={`${entry.day} calories`}
                    />
                  </ListItem>
                ))}
              </List>
              <ListFooter>
                Bars fill toward your daily goal of {goal.toLocaleString()} kcal.
              </ListFooter>
            </div>
            <div>
              <ListHeader className="pt-5 md:pt-0">Goals</ListHeader>
              <List>
                <ListItem>
                  <ListTitle>
                    Daily calories
                    <span className="block text-[13px] text-[var(--ios-secondary)]">
                      {goal.toLocaleString()} kcal
                    </span>
                  </ListTitle>
                  <Stepper
                    min={1200}
                    max={4000}
                    step={50}
                    value={goal}
                    onValueChange={(value) => setGoal(value ?? 2200)}
                    aria-label="Daily calorie goal"
                  />
                </ListItem>
                <ListItem className="flex-col items-stretch gap-2 py-3">
                  <div className="flex justify-between">
                    <span>Protein</span>
                    <span className="text-[var(--ios-secondary)]">{proteinGoal} g</span>
                  </div>
                  <Slider
                    aria-label="Protein goal"
                    min={60}
                    max={220}
                    step={5}
                    value={[proteinGoal]}
                    onValueChange={(value) =>
                      setProteinGoal(Array.isArray(value) ? value[0] : value)
                    }
                  />
                </ListItem>
              </List>
              <ListFooter>
                Protein at 1.6 to 2.2 g per kilogram of body weight suits most training plans.
              </ListFooter>
            </div>
          </div>
        </TabBarContent>

        <TabBarContent value="profile">
          <LargeTitle className="pt-2">Profile</LargeTitle>
          <div className="nutrition-column">
            <List className="mt-4">
              <ListItem>
                <span className="flex size-11 items-center justify-center rounded-full bg-[var(--ios-blue)] text-white">
                  <User size={22} />
                </span>
                <ListTitle>
                  Bennett
                  <span className="block text-[13px] text-[var(--ios-secondary)]">
                    Member since March
                  </span>
                </ListTitle>
              </ListItem>
            </List>
            <ListHeader>Reminders</ListHeader>
            <List>
              <Row>
                <ListIcon className="bg-[#ff3b30]">
                  <Bell />
                </ListIcon>
                <ListTitle>Meal reminders</ListTitle>
                <Switch
                  checked={reminders}
                  onCheckedChange={setReminders}
                  aria-label="Meal reminders"
                />
              </Row>
              <Row>
                <ListIcon className="bg-[#0a84ff]">
                  <TrendingUp />
                </ListIcon>
                <ListTitle>Weekly report</ListTitle>
                <Switch defaultChecked aria-label="Weekly report" />
              </Row>
            </List>
            {reminders && <ListFooter>You will be reminded at 8:00, 12:30, and 19:00.</ListFooter>}
            <ListHeader>Preferences</ListHeader>
            <List>
              <ListItem>
                <ListTitle>Units</ListTitle>
                <Select defaultValue="metric" items={{ metric: "Metric", imperial: "Imperial" }}>
                  <SelectTrigger aria-label="Units">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                  </SelectContent>
                </Select>
              </ListItem>
              <Row>
                <Checkbox defaultChecked />
                <ListTitle>Include water in daily summary</ListTitle>
              </Row>
            </List>
            <ListHeader>Diet</ListHeader>
            <RadioGroup defaultValue="none">
              <List>
                {(
                  [
                    ["none", "No preference"],
                    ["vegetarian", "Vegetarian"],
                    ["vegan", "Vegan"],
                  ] as const
                ).map(([value, label]) => (
                  <Row key={value}>
                    <RadioGroupItem value={value} />
                    <ListTitle>{label}</ListTitle>
                  </Row>
                ))}
              </List>
            </RadioGroup>
            <ListHeader>Data</ListHeader>
            <div className="flex flex-col gap-2">
              <ActionSheet>
                <ActionSheetTrigger render={<Button variant="secondary" className="w-full" />}>
                  <Share /> Export
                </ActionSheetTrigger>
                <ActionSheetContent>
                  <ActionSheetGroup>
                    <ActionSheetTitle>Export your data</ActionSheetTitle>
                    <ActionSheetDescription>
                      Meals, water, and goals for the last 90 days.
                    </ActionSheetDescription>
                    <ActionSheetAction onClick={() => toast("Exported", "nutrition.csv is ready.")}>
                      CSV
                    </ActionSheetAction>
                    <ActionSheetAction onClick={() => toast("Exported", "nutrition.pdf is ready.")}>
                      PDF report
                    </ActionSheetAction>
                  </ActionSheetGroup>
                  <ActionSheetCancel>Cancel</ActionSheetCancel>
                </ActionSheetContent>
              </ActionSheet>
              <AlertDialog>
                <AlertDialogTrigger render={<Button variant="destructive" className="w-full" />}>
                  Clear today
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear today’s log?</AlertDialogTitle>
                    <AlertDialogDescription>
                      All {meals.length} meals and your water count are removed. Goals stay as they
                      are.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setMeals([])
                        setWater(0)
                        toast("Cleared", "Today starts fresh.")
                      }}
                    >
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </TabBarContent>
      </div>

      <div className="nutrition-tabs">
        <TabBarList aria-label="App sections">
          <TabBarTrigger value="today">
            <House />
            Today
          </TabBarTrigger>
          <TabBarTrigger value="recipes">
            <BookOpen />
            Recipes
          </TabBarTrigger>
          <TabBarTrigger value="progress">
            <TrendingUp />
            Progress
          </TabBarTrigger>
          <TabBarTrigger value="profile">
            <User />
            Profile
          </TabBarTrigger>
        </TabBarList>
      </div>
    </TabBar>
  )
}

/** The `/example` route: the app fills the viewport, with a way back to the docs. */
export function ExamplePage() {
  return (
    <div className="example-page">
      <NutritionApp />
      <Link to="/" className="example-back">
        <ArrowLeft size={14} /> Docs
      </Link>
    </div>
  )
}
