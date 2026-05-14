import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./MobileMenuOverlay.tsx", import.meta.url), "utf8")

test("mobile menu overlay reuses search overlay for the student dashboard variant", () => {
  assert.match(source, /variant === "student_dashboard"/)
  assert.match(source, /variant === "search" \|\| variant === "student_dashboard"/)
  assert.match(source, /<SearchOverlay \/>/)
})
