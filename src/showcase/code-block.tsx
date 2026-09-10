import { useEffect, useRef, useState } from "react"
import { Check, Copy } from "lucide-react"

export function CopyButton({ text, label = "Copy code" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <button
      className="copy-button"
      aria-label={state === "copied" ? "Copied" : label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setState("copied")
        } catch {
          setState("failed")
        }
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setState("idle"), 2200)
      }}
    >
      {state === "copied" ? <Check size={15} /> : <Copy size={15} />}
      {state === "failed" && <span>Select and copy the code below.</span>}
    </button>
  )
}

export function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  return (
    <div className="code-block">
      <div className="code-label">
        <span>{language}</span>
        <CopyButton text={code} />
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
