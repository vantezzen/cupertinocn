import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react"
import { Link } from "react-router"
import { repository } from "./catalog"
import { CodeBlock } from "./code-block"

export function Installation() {
  return (
    <div className="documentation">
      <h1>Installation</h1>
      <p className="page-intro">
        Use the shadcn CLI to add component source files to your project.
      </p>
      <section className="doc-section">
        <h2>
          <span className="step-number">1</span> Start with shadcn
        </h2>
        <p>
          You’ll need React 19, Tailwind CSS 4, and a project initialized with shadcn. These
          components use Base UI.
        </p>
        <CodeBlock language="terminal" code="bunx shadcn@latest init" />
      </section>
      <section className="doc-section">
        <h2>
          <span className="step-number">2</span> Install components
        </h2>
        <p>
          Choose a component. The CLI installs the component’s source, its dependencies, and the
          shared Cupertino styles.
        </p>
        <CodeBlock language="terminal" code={`bunx shadcn@latest add ${repository}/button`} />
        <p>To install all components:</p>
        <CodeBlock language="terminal" code={`bunx shadcn@latest add ${repository}/all`} />
        <div className="doc-note">
          <strong>Repository publication</strong>
          <p>
            These GitHub commands work once this project is committed and published at{" "}
            <code>{repository}</code>. This local workspace is the source registry; it has not been
            published by this app.
          </p>
        </div>
      </section>
      <section className="doc-section">
        <h2>
          <span className="step-number">3</span> Import a component
        </h2>
        <CodeBlock
          code={
            'import { Button } from "@/components/ui/button"\n\nexport function Welcome() {\n  return <Button onClick={() => console.log("Hello!")}>Continue</Button>\n}'
          }
        />
        <p>
          Every component imports <code>./cupertino.css</code>. Keep that shared file next to your
          installed components. No provider is required, except for toast notifications.
        </p>
      </section>
      <section className="doc-section">
        <h2>Themes</h2>
        <p>
          Add <code>className="dark"</code> to the document root for dark mode. Use{" "}
          <code>data-ios-theme="light"</code> or <code>data-ios-theme="dark"</code> for a scoped
          preview. Set themes on the document root when using portaled overlays.
        </p>
        <CodeBlock
          code={
            '// Use the system font for the closest match on Apple devices.\n// Components already use this stack internally.\nfont-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;'
          }
          language="css"
        />
      </section>
      <section className="doc-section">
        <h2>Accessibility and browser support</h2>
        <p>
          Keyboard navigation, focus management, and form behavior come from Base UI. Labels remain
          your responsibility: use visible labels or an accessible name for every control. Motion,
          transparency, and contrast respect browser-supported accessibility preferences.
        </p>
        <p>
          The components target the current iOS visual language. Fonts, symbols, and the glass
          compositor differ across platforms. These are web components. They do not run UIKit.
        </p>
        <a
          className="inline-link"
          href="https://ui.shadcn.com/docs/registry/github"
          target="_blank"
          rel="noreferrer"
        >
          How GitHub registries work <ExternalLink size={14} />
        </a>
      </section>
    </div>
  )
}

export function Foundations() {
  return (
    <div className="documentation">
      <h1>Foundations</h1>
      <p className="page-intro">Color tokens, typography, and material behavior.</p>
      <section className="doc-section">
        <h2>System colors</h2>
        <div className="color-grid">
          {[
            { name: "Blue", value: "#0088ff" },
            { name: "Green", value: "#34c759" },
            { name: "Red", value: "#ff383c" },
            { name: "Orange", value: "#ff9500" },
            { name: "Background", value: "#f2f2f7" },
            { name: "Label", value: "#000000" },
          ].map((color) => (
            <div key={color.name}>
              <span style={{ background: color.value }} />
              <strong>{color.name}</strong>
              <code>{color.value}</code>
            </div>
          ))}
        </div>
        <p>
          Semantic tokens include separate light and dark values. Override <code>--ios-blue</code>{" "}
          to carry your app’s accent through buttons, sliders, selections, and focus rings.
        </p>
      </section>
      <section className="doc-section">
        <h2>Typography</h2>
        <div className="type-specimen">
          <div>
            <span>Large title · 34 / 41</span>
            <strong className="type-large">Settings</strong>
          </div>
          <div>
            <span>Title · 22 / 28</span>
            <strong className="type-title">Notifications</strong>
          </div>
          <div>
            <span>Body · 17 / 22</span>
            <p>Choose which notifications to receive.</p>
          </div>
          <div>
            <span>Footnote · 13 / 18</span>
            <small>You can change this setting at any time.</small>
          </div>
        </div>
        <p>
          San Francisco is supplied by the operating system on Apple devices. Other platforms use
          their installed fallback fonts; glyph metrics and rasterization will differ.
        </p>
      </section>
      <section className="doc-section">
        <h2>Materials</h2>
        <p>
          Glass sits above content in navigation, toolbars, fields, and overlays. Grouped lists use
          an opaque surface so rows remain legible. Keep nested glass surfaces to controls that need
          a separate moving lens.
        </p>
        <Link className="inline-link" to="/liquid-glass">
          Liquid Glass documentation <ArrowRight size={14} />
        </Link>
      </section>
      <section className="doc-section">
        <h2>References</h2>
        <p>
          Design references are linked here rather than redistributed with the registry. This
          project is independent and is not affiliated with Apple.
        </p>
        <div className="reference-links">
          {[
            [
              "Apple Human Interface Guidelines",
              "https://developer.apple.com/design/human-interface-guidelines",
            ],
            [
              "Alerts · current iOS anatomy",
              "https://developer.apple.com/design/human-interface-guidelines/alerts",
            ],
            [
              "Toggles · shapes and states",
              "https://developer.apple.com/design/human-interface-guidelines/toggles",
            ],
            ["Meet Liquid Glass · WWDC25", "https://developer.apple.com/videos/play/wwdc2025/219/"],
            ["Building Glass for the Web", "https://aave.com/design/building-glass-for-the-web"],
            ["samasante/liquid-glass", "https://github.com/samasante/liquid-glass"],
            ["Base UI · accessible primitives", "https://base-ui.com/react/overview/accessibility"],
          ].map(([name, url]) => (
            <a key={url} href={url} target="_blank" rel="noreferrer">
              {name}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
