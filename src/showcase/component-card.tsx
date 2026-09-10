import { useState } from "react"
import { Link } from "react-router"
import { ArrowUpRight, ArrowRight, Code2 } from "lucide-react"
import { catalog, type ComponentSlug } from "./catalog"
import { Demo } from "./demos"
import { CodeBlock } from "./code-block"

export function ComponentCard({ slug }: { slug: ComponentSlug }) {
  const item = catalog.find((item) => item.slug === slug)!
  const [code, setCode] = useState(false)
  return (
    <article className={`component-card card-${slug}`}>
      <div className="card-top">
        <Link to={`/${slug}`}>
          {item.name}
          <ArrowUpRight size={13} />
        </Link>
        <button
          className={code ? "code-toggle active" : "code-toggle"}
          onClick={() => setCode(!code)}
          aria-label={`${code ? "Preview" : "Show code for"} ${item.name}`}
          aria-pressed={code}
        >
          <Code2 size={15} />
        </button>
      </div>
      <div className={`card-stage ${code ? "stage-code" : ""}`}>
        {code ? <CodeBlock code={item.examples[0].code} /> : <Demo slug={slug} />}
      </div>
      <div className="card-bottom">
        <span>
          {item.group}
          {item.parity === "unique" && <em className="card-unique"> · cupertinocn only</em>}
        </span>
        <Link to={`/${slug}`} aria-label={`View ${item.name} documentation`}>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}
