import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./SearchNavbar.tsx", import.meta.url), "utf8")

test("search navbar keeps a higher z-index on the home page", () => {
  assert.match(source, /z-\[999\]/)
  assert.match(source, /isolate/)
})

test("search navbar shows the student dropdown for admin users", () => {
  assert.match(source, /role === Role\.STUDENT \|\| role === Role\.ADMIN/)
})
