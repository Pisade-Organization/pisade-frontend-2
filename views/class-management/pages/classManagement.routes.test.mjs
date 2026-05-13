import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

function readRoute(relativePath) {
  return readFileSync(new URL(`../../../${relativePath}`, import.meta.url), "utf8")
}

test("student class management route renders a page instead of forcing notFound", () => {
  const source = readRoute("app/[locale]/class-management/page.tsx")

  assert.doesNotMatch(source, /notFound\(\)/)
})

test("tutor class management route renders a page instead of forcing notFound", () => {
  const source = readRoute("app/[locale]/tutor/class-management/page.tsx")

  assert.doesNotMatch(source, /notFound\(\)/)
})
