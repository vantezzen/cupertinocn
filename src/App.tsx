import { useEffect, useRef, useState } from "react"
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Command,
  Layers,
  Menu as MenuIcon,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react"
import { catalog, groups, repository } from "./showcase/catalog"
import { GlassPlayground, HeroStage } from "./showcase/demos"
import { Toaster } from "./registry/ui/toast"
import { CopyButton } from "./showcase/code-block"
import { ComponentCard } from "./showcase/component-card"
import { Installation, Foundations } from "./showcase/docs-pages"
import { ComponentPage } from "./showcase/component-page"
import { ExamplePage } from "./showcase/example-app"
import "./App.css"

function Github({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}

const pages = new Set(["components", "installation", "foundations", "example"])
/** Slugs from before the shadcn-parity renames. */
const renamed: Record<string, string> = {
  "segmented-control": "tabs",
  menu: "dropdown-menu",
  sheet: "drawer",
}
const pageTitles: Record<string, string> = {
  components: "Components",
  installation: "Installation",
  foundations: "Foundations",
  example: "Example app",
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const route = location.pathname.replace(/^\/+|\/+$/g, "") || "overview"
  const [query, setQuery] = useState("")
  const [mobileNav, setMobileNav] = useState(false)
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("cupertino-theme")
      return stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches
    } catch {
      return false
    }
  })
  const search = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (mobileNav) search.current?.focus()
  }, [mobileNav])
  // Links from before path routing used the hash: /#switch becomes /switch. Renamed components
  // redirect to their new slug.
  useEffect(() => {
    const legacy = location.hash.slice(1)
    if (legacy && (pages.has(legacy) || catalog.some((item) => item.slug === legacy)))
      navigate(`/${legacy}`, { replace: true })
    else if (legacy in renamed) navigate(`/${renamed[legacy]}`, { replace: true })
    else if (route in renamed) navigate(`/${renamed[route]}`, { replace: true })
  }, [location.hash, route, navigate])
  // A navigation closes the drawer and clears the search; state is adjusted during render.
  const [seenPath, setSeenPath] = useState(location.pathname)
  if (seenPath !== location.pathname) {
    setSeenPath(location.pathname)
    setMobileNav(false)
    setQuery("")
  }
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("cupertino-theme", dark ? "dark" : "light")
    } catch {
      /* Storage is optional in private browsing. */
    }
  }, [dark])
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setMobileNav(true)
        search.current?.focus()
      }
      if (event.key === "Escape") {
        setMobileNav(false)
        search.current?.blur()
      }
    }
    window.addEventListener("keydown", shortcut)
    return () => window.removeEventListener("keydown", shortcut)
  }, [])
  const item = catalog.find((item) => item.slug === route)
  useEffect(() => {
    const title = item?.name ?? pageTitles[route]
    document.title = title
      ? `${title} | cupertinocn`
      : "cupertinocn | Glass-clear components for shadcn"
  }, [route, item])
  const filtered = catalog.filter((item) =>
    `${item.name} ${item.group}`.toLowerCase().includes(query.toLowerCase()),
  )
  const isOverview = route === "overview"
  const isGallery = isOverview || route === "components"
  const command = `bunx shadcn@latest add ${repository}/button`
  const galleryProps = { query, setQuery, filtered, command }
  // The example app fills the viewport without the documentation chrome.
  if (route === "example")
    return (
      <Toaster>
        <ExamplePage />
      </Toaster>
    )
  return (
    <Toaster>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById("main-content")?.focus()
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="wordmark" aria-label="cupertinocn home">
          <span className="brand-mark">
            <Layers size={19} strokeWidth={1.65} />
          </span>
          cupertino<span className="wordmark-cn">cn</span>
          <span className="version-tag">0.1</span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <Link to="/components" className={isGallery ? "selected" : ""}>
            Components
          </Link>
          <NavLink to="/installation" className={({ isActive }) => (isActive ? "selected" : "")}>
            Documentation
          </NavLink>
          <NavLink to="/liquid-glass" className={({ isActive }) => (isActive ? "selected" : "")}>
            Liquid Glass
          </NavLink>
          <NavLink to="/example" className={({ isActive }) => (isActive ? "selected" : "")}>
            Example
          </NavLink>
        </nav>
        <div className="header-actions">
          <a
            href={`https://github.com/${repository}`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
          >
            <Github size={18} />
          </a>
          <span className="header-divider" />
          <button
            onClick={() => setDark(!dark)}
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="mobile-menu-button"
            onClick={() => setMobileNav(!mobileNav)}
            aria-label={mobileNav ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNav}
          >
            {mobileNav ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </header>
      {mobileNav && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="sidebar-search">
          <Search size={15} />
          <input
            ref={search}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a component…"
            aria-label="Find a component"
          />
          <kbd>
            <Command size={10} /> K
          </kbd>
        </div>
        <nav aria-label="Component library">
          <div className="sidebar-group">
            <span className="sidebar-label">Getting started</span>
            <NavLink end className={({ isActive }) => (isActive ? "active" : "")} to="/">
              Overview
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/installation">
              Installation
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/foundations">
              Foundations
            </NavLink>
          </div>
          {groups.map((group) => {
            const items = filtered.filter((item) => item.group === group)
            return (
              items.length > 0 && (
                <div key={group} className="sidebar-group">
                  <span className="sidebar-label">{group}</span>
                  {items.map((item) => (
                    <NavLink
                      to={`/${item.slug}`}
                      key={item.slug}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )
            )
          })}
          {!filtered.length && <p className="sidebar-empty">No matching components.</p>}
        </nav>
      </aside>
      <main id="main-content" tabIndex={-1} className="main-content">
        <Routes>
          <Route path="/" element={<Gallery overview {...galleryProps} />} />
          <Route path="/components" element={<Gallery {...galleryProps} />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/foundations" element={<Foundations />} />
          <Route path="/:slug" element={<ComponentRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="site-footer">
          <span>
            cupertinocn <span className="footer-dot">·</span> React component registry
          </span>
          <div>
            <a
              href="https://developer.apple.com/design/human-interface-guidelines"
              target="_blank"
              rel="noreferrer"
            >
              Apple HIG <ArrowUpRight size={12} />
            </a>
            <a href={`https://github.com/${repository}`} target="_blank" rel="noreferrer">
              Source <Github size={13} />
            </a>
          </div>
        </footer>
      </main>
    </Toaster>
  )
}

type GalleryProps = {
  overview?: boolean
  query: string
  setQuery: (query: string) => void
  filtered: typeof catalog
  command: string
}

function Gallery({ overview = false, query, setQuery, filtered, command }: GalleryProps) {
  return (
    <>
      {overview && (
        <section className="hero">
          <div className="hero-copy">
            <h1>
              Glass-clear components
              <br />
              for shadcn.
            </h1>
            <p>
              Cupertino-style React components with a Liquid Glass material, spring motion, and
              native gestures. Install the source with the shadcn CLI and edit it in your project.
            </p>
            <div className="hero-actions">
              <Link className="primary-link" to="/installation">
                Installation <ArrowRight size={16} />
              </Link>
              <Link className="text-link" to="/components">
                Components <ArrowDown size={15} />
              </Link>
            </div>
            <div className="install-command">
              <span className="terminal-prompt">$</span>
              <code>{command}</code>
              <CopyButton text={command} label="Copy install command" />
            </div>
          </div>
          <div className="hero-visual">
            <HeroStage />
          </div>
        </section>
      )}
      <section className="collection">
        <div className="section-heading">
          <div>
            <h2>{query ? "Search results" : "Components"}</h2>
            <p>Preview each component or open its documentation.</p>
          </div>
          <span className="component-count">
            {filtered.length} components <span>↗</span>
          </span>
        </div>
        <div className="collection-filters">
          <button className={!query ? "active" : ""} onClick={() => setQuery("")}>
            All components
          </button>
          <button
            className={query === "Controls" ? "active" : ""}
            onClick={() => setQuery("Controls")}
          >
            Controls
          </button>
          <button
            className={query === "Navigation" ? "active" : ""}
            onClick={() => setQuery("Navigation")}
          >
            Navigation
          </button>
          <button
            className={query === "Presentation" ? "active" : ""}
            onClick={() => setQuery("Presentation")}
          >
            Presentation
          </button>
        </div>
        <div className="component-grid">
          {filtered
            .filter((item) => item.slug !== "liquid-glass")
            .map((item) => (
              <ComponentCard key={item.slug} slug={item.slug} />
            ))}
          {!filtered.length && (
            <div className="empty-search">
              <Search size={24} />
              <h3>No components found</h3>
              <p>Search by component name or category.</p>
              <button onClick={() => setQuery("")}>Clear search</button>
            </div>
          )}
        </div>
      </section>
      {!query && (
        <section className="material-section">
          <div className="section-heading">
            <div>
              <h2>Liquid Glass</h2>
              <p>Compare opaque, regular, and clear glass over different backdrops.</p>
            </div>
            <Link className="text-link" to="/liquid-glass">
              Material documentation <ArrowUpRight size={15} />
            </Link>
          </div>
          <GlassPlayground />
        </section>
      )}
    </>
  )
}

function ComponentRoute() {
  const { slug } = useParams()
  const item = catalog.find((item) => item.slug === slug)
  if (!item) return <NotFound />
  return <ComponentPage key={item.slug} slug={item.slug} />
}

function NotFound() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link className="primary-link" to="/components">
        Browse components <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export default App
