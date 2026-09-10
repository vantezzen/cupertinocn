import { readFile, access } from "node:fs/promises"
import { basename, dirname, resolve } from "node:path"
import { registrySchema, registryItemSchema } from "shadcn/schema"

const root = resolve(import.meta.dirname, "..")
const registry = registrySchema.parse(
  JSON.parse(await readFile(resolve(root, "registry.json"), "utf8")),
)
const names = new Set(registry.items.map((item) => item.name))
if (names.size !== registry.items.length) throw new Error("Registry item names must be unique.")
const address = new URL(registry.homepage).pathname.slice(1)
const allFiles = new Set(
  registry.items.flatMap((item) => item.files?.map((file) => file.path) ?? []),
)

for (const item of registry.items) {
  registryItemSchema.parse(item)
  for (const dependency of item.registryDependencies ?? []) {
    if (!dependency.startsWith(`${address}/`) || !names.has(dependency.slice(address.length + 1)))
      throw new Error(`${item.name}: unresolved registry dependency ${dependency}`)
  }
  const installed = new Set<string>()
  const visited = new Set<string>()
  const visiting = new Set<string>()
  function include(name: string) {
    if (visiting.has(name)) throw new Error(`Registry dependency cycle at ${name}`)
    if (visited.has(name)) return
    visiting.add(name)
    const dependency = registry.items.find((item) => item.name === name)!
    for (const file of dependency.files ?? []) installed.add(basename(file.path))
    for (const child of dependency.registryDependencies ?? [])
      include(child.slice(address.length + 1))
    visiting.delete(name)
    visited.add(name)
  }
  include(item.name)
  for (const file of item.files ?? []) {
    await access(resolve(root, file.path))
    const source = await readFile(resolve(root, file.path), "utf8")
    for (const [, path] of source.matchAll(/(?:from\s+|import\s+)["'](\.[^"']+)["']/g)) {
      const candidates = [path, `${path}.tsx`, `${path}.ts`]
      if (!candidates.some((candidate) => installed.has(basename(candidate))))
        throw new Error(`${item.name}: ${path} is missing from the installation dependency closure`)
      if (
        !candidates.some((candidate) =>
          allFiles.has(resolve(dirname(file.path), candidate).slice(root.length + 1)),
        )
      )
        throw new Error(`${item.name}: source import ${path} does not exist in the registry`)
    }
  }
}
console.log(
  `Validated ${registry.items.length} registry entries and ${allFiles.size} source files with the shadcn schemas. All local imports install together.`,
)
