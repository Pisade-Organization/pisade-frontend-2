import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./SearchHero.tsx", import.meta.url), "utf8")

test("search hero decorative layers do not intercept pointer events", () => {
  assert.match(source, /pointer-events-none/)
  assert.match(source, /relative z-10 pointer-events-auto/)
})
