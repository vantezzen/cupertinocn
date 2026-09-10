import { expect, test } from "bun:test"
import {
  createLensMap,
  createSpecularImage,
  lensDepth,
  lensScale,
} from "../src/registry/ui/glass-optics"

function pixel(map: { width: number; pixels: Uint8ClampedArray }, x: number, y: number) {
  const i = (y * map.width + x) * 4
  return [...map.pixels.slice(i, i + 4)]
}

test("the lens is neutral in the center and samples inward at the rim", () => {
  const map = createLensMap({ width: 200, height: 80, radius: 40 }, { pad: 10, depth: 20 })
  expect(map.ratio).toBeCloseTo(512 / 220)
  expect([map.width, map.height]).toEqual([512, Math.round(100 * map.ratio)])
  const cx = Math.floor(map.width / 2)
  const cy = Math.floor(map.height / 2)
  expect(pixel(map, cx, cy).slice(0, 2)).toEqual([128, 128])
  // Top edge samples downward (green above 128), bottom edge samples upward.
  expect(pixel(map, cx, Math.round(11 * map.ratio))[1]).toBeGreaterThan(156)
  expect(pixel(map, cx, Math.round(88 * map.ratio))[1]).toBeLessThan(100)
  // Left edge samples rightward (red above 128), right edge samples leftward.
  expect(pixel(map, Math.round(11 * map.ratio), cy)[0]).toBeGreaterThan(156)
  expect(pixel(map, Math.round(208 * map.ratio), cy)[0]).toBeLessThan(100)
})

test("the bend has no step at the shape boundary", () => {
  const map = createLensMap({ width: 200, height: 80, radius: 40 }, { pad: 10, depth: 20 })
  const row = Math.floor(map.height / 2)
  const edge = Math.round(10 * map.ratio)
  for (let x = edge - 3; x <= edge + 3; x++) {
    const a = pixel(map, x, row)[0]
    const b = pixel(map, x + 1, row)[0]
    expect(Math.abs(a - b)).toBeLessThanOrEqual(2)
  }
})

test("the map is symmetric in both axes and the specular is point symmetric", () => {
  const map = createLensMap({ width: 64, height: 28, radius: 14 })
  for (const [x, y] of [
    [3, 3],
    [10, 5],
    [20, 2],
    [40, 30],
  ]) {
    const a = pixel(map, x, y)
    const b = pixel(map, map.width - 1 - x, y)
    const c = pixel(map, x, map.height - 1 - y)
    const d = pixel(map, map.width - 1 - x, map.height - 1 - y)
    expect(b[0]).toBe(256 - a[0])
    expect(b[1]).toBe(a[1])
    expect(c[0]).toBe(a[0])
    expect(c[1]).toBe(256 - a[1])
    expect(d[2]).toBe(a[2])
    expect(c[2]).toBe(b[2])
  }
})

test("the rim facing the light is brighter than the rim facing away", () => {
  const map = createLensMap({ width: 100, height: 100, radius: 50 }, { pad: 0 })
  // Half a CSS pixel inside the rim, on the diagonal.
  const corner = Math.round((50 - 49.5 / Math.SQRT2) * map.ratio)
  const lit = pixel(map, corner, corner)[2]
  const unlit = pixel(map, map.width - 1 - corner, corner)[2]
  expect(lit).toBeGreaterThan(unlit + 20)
  expect(pixel(map, Math.floor(map.width / 2), Math.floor(map.height / 2))[2]).toBe(128)
})

test("the specular image is white with the blue channel as alpha, cropped to the shape", () => {
  const map = createLensMap({ width: 40, height: 20, radius: 10 }, { pad: 5 })
  const image = createSpecularImage(map)
  expect([image.width, image.height]).toEqual([
    Math.round(40 * map.ratio),
    Math.round(20 * map.ratio),
  ])
  const center = pixel(image, Math.floor(image.width / 2), Math.floor(image.height / 2))
  expect(center.slice(0, 3)).toEqual([255, 255, 255])
  expect(center[3]).toBe(0)
  const edge = pixel(image, Math.round(0.5 * map.ratio), Math.floor(image.height / 2))
  expect(edge[3]).toBeGreaterThan(30)
})

test("large surfaces stay within the resolution cap and tiny surfaces still produce a map", () => {
  const large = createLensMap({ width: 4000, height: 2000, radius: 32 })
  expect(Math.max(large.width, large.height)).toBe(512)
  expect(large.pixels.length).toBe(large.width * large.height * 4)
  const tiny = createLensMap({ width: 0, height: 0, radius: 0 })
  expect(tiny.pixels.length).toBe(tiny.width * tiny.height * 4)
  expect(tiny.width).toBeGreaterThan(0)
  // Small controls are oversampled, never stretched from a coarse map.
  const thumb = createLensMap({ width: 24, height: 20, radius: 10 })
  expect(thumb.ratio).toBe(4)
})

test("scale, depth, and padding grow with the control and stay bounded", () => {
  expect(lensScale(24, 20)).toBeCloseTo(18)
  expect(lensScale(600, 400)).toBe(72)
  expect(lensDepth(24, 20)).toBeCloseTo(4.8)
  expect(lensDepth(600, 400)).toBe(16)
  // Default padding is half the displacement plus a margin.
  expect(createLensMap({ width: 24, height: 20, radius: 10 }).pad).toBe(11)
})

test("the bend is strongest at the edge and eases toward a flat center", () => {
  const map = createLensMap({ width: 200, height: 80, radius: 40 }, { pad: 0, depth: 20 })
  const row = Math.floor(map.height / 2)
  const at = (css: number) => pixel(map, Math.round(css * map.ratio), row)[0] - 128
  const edge = at(0.25)
  const inner = at(10)
  const deep = at(40)
  const center = at(100)
  expect(edge).toBeGreaterThan(inner)
  expect(inner).toBeGreaterThan(deep)
  expect(deep).toBeGreaterThanOrEqual(0)
  expect(Math.abs(center)).toBeLessThanOrEqual(1)
})
