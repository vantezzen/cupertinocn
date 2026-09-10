import { useState } from "react"
import { Link } from "react-router"
import { ArrowRight, ChevronRight } from "lucide-react"
import { catalog, repository, type ComponentSlug } from "./catalog"
import { Demo, GlassPlayground } from "./demos"
import { CodeBlock } from "./code-block"

const sources = import.meta.glob("../registry/ui/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>

const interactionNotes: Partial<Record<ComponentSlug, string[]>> = {
  switch: [
    "Hover to widen the thumb. Press to turn it into a lens that bends the track. Click or drag to change state on release.",
    "Drag back to the initial position or cancel the gesture to keep the current value. Press Space to toggle with the keyboard.",
  ],
  slider: [
    "Press the track or drag a thumb to adjust the value. The thumb grows into a lens that shows the fill boundary bent underneath.",
    "Use arrow keys for one step, Page Up or Page Down for a larger step, and Home or End for the bounds. Use onValueCommitted to handle the end of an adjustment.",
  ],
  "tab-bar": [
    "Press and drag across the tabs. The lens follows your pointer on a spring, stretches with speed, and lifts while held. The current panel stays visible until you release.",
    "Release over an enabled tab to select it. Escape, pointer cancellation, or releasing outside the tabs preserves the selection.",
    "Arrow keys move focus. Tabs activate on focus by default. Set activateOnFocus={false} for activation with Enter or Space.",
  ],
  "segmented-control": [
    "Drag across segments to preview a selection. Release to display the selected panel.",
    "Use arrow keys to change the active segment. Escape cancels a pointer gesture.",
  ],
  stepper: [
    "Press + or − to change the value by one step. The capsule is pulled toward the pressed side. Hold a button to repeat.",
    "Type a value directly, or use arrow keys in the number field. The buttons disable at the minimum and maximum values.",
  ],
  "alert-dialog": [
    "Focus stays inside the alert while it is open. Closing returns focus to the trigger.",
    "The action and cancel buttons close the alert. Control open and onOpenChange when an action needs asynchronous validation.",
  ],
  sheet: [
    "Drag the handle or the content downward to dismiss. Scrolling content reaches its top before the dismissal gesture takes over.",
    "Use snapPoints on the root to allow intermediate sheet heights.",
  ],
}

export function ComponentPage({ slug }: { slug: ComponentSlug }) {
  const item = catalog.find((item) => item.slug === slug)!
  const [view, setView] = useState<"preview" | "source">("preview")
  const source = sources[`../registry/ui/${slug}.tsx`]
  const index = catalog.findIndex((component) => component.slug === slug)
  return (
    <div className="component-page">
      <Link to="/components" className="breadcrumb">
        Components <ChevronRight size={12} /> <span>{item.group}</span>
      </Link>
      <div className="component-heading">
        <div>
          <h1>{item.name}</h1>
          <p className="page-intro">{item.description}</p>
        </div>
        <div className="page-badges">
          {item.parity === "shadcn" ? (
            <span
              className="parity-badge parity-shadcn"
              title="Same component names, parts, and props as shadcn/ui"
            >
              shadcn/ui drop-in
            </span>
          ) : null}
        </div>
      </div>
      <div className="detail-tabs" role="tablist" aria-label="Component example">
        {(["preview", "source"] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            id={`view-${tab}`}
            aria-selected={view === tab}
            aria-controls="component-example"
            tabIndex={view === tab ? 0 : -1}
            onClick={() => setView(tab)}
            onKeyDown={(event) => {
              if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
                event.preventDefault()
                const next = view === "preview" ? "source" : "preview"
                setView(next)
                document.getElementById(`view-${next}`)?.focus()
              }
            }}
          >
            {tab === "preview" ? "Preview" : "Source"}
          </button>
        ))}
      </div>
      <div
        id="component-example"
        role="tabpanel"
        aria-labelledby={`view-${view}`}
        className={`detail-preview ${slug === "liquid-glass" ? "detail-glass" : ""} ${view !== "preview" ? "detail-code" : ""}`}
      >
        {view === "preview" ? (
          slug === "liquid-glass" ? (
            <GlassPlayground />
          ) : (
            <Demo slug={slug} />
          )
        ) : (
          <CodeBlock code={source} />
        )}
      </div>
      <section className="doc-section">
        <h2>Usage</h2>
        <div className="example-list">
          {item.examples.map((example) => (
            <div key={example.title} className="example">
              <h3>{example.title}</h3>
              {example.description && <p>{example.description}</p>}
              <CodeBlock code={example.code} />
            </div>
          ))}
        </div>
      </section>
      {interactionNotes[slug] && (
        <section className="doc-section">
          <h2>Interaction</h2>
          <ul className="interaction-list">
            {interactionNotes[slug].map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}
      <section className="doc-section">
        <h2>Installation</h2>
        <CodeBlock language="terminal" code={`bunx shadcn@latest add ${repository}/${slug}`} />
        <p className="small-note">
          Available after the source registry is published to GitHub. Installs the shared stylesheet
          automatically.
        </p>
      </section>
      <section className="doc-section">
        <h2>API</h2>
        <p className="parts-line">
          Exports:{" "}
          {item.parts.map((part, index) => (
            <span key={part}>
              <code>{part}</code>
              {index < item.parts.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <div className="props-table-wrap">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {item.props.map((prop) => (
                <tr key={prop.name}>
                  <td>
                    <code>{prop.name}</code>
                  </td>
                  <td>{prop.type && <code>{prop.type}</code>}</td>
                  <td>{prop.default && <code>{prop.default}</code>}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Standard refs, event handlers, and <code>className</code> pass through to the underlying
          element.
        </p>
      </section>
      {slug === "liquid-glass" && (
        <section className="doc-section">
          <h2>Rendering and browser support</h2>
          <p>
            Every surface has the same layers: a blurred and saturated backdrop, a wash, a rim lit
            from the top left and bottom right, and a light from the touch point. The lens map bends
            hardest at the very edge, like a convex rim, and eases to nothing toward the center.
            Chromium bends the live backdrop through this map; the map is regenerated only when the
            surface changes shape.
          </p>
          <p>
            Controls that move over a known layer pass a copy of that layer to{" "}
            <code>GlassSurface</code> through <code>refract</code>: the switch its track, the slider
            its fill, the tab bar and segmented control a highlighted copy of their items. The copy
            is bent with a plain CSS filter, so those lenses render in Chromium, Safari, and
            Firefox. Standalone containers over arbitrary page content keep blur, wash, and rim in
            Safari and Firefox, because those engines do not apply SVG filters to a live backdrop.
          </p>
          <p>
            Blur stays at or below 20px, large panels skip refraction, and no frame renders through
            React state. Reduced transparency and increased contrast replace glass with a solid
            surface where the browser exposes those preferences.
          </p>
        </section>
      )}
      <div className="next-component">
        <Link to={`/${catalog[(index + 1) % catalog.length].slug}`}>
          <span>Next component</span>
          <strong>
            {catalog[(index + 1) % catalog.length].name} <ArrowRight size={20} />
          </strong>
        </Link>
      </div>
    </div>
  )
}
