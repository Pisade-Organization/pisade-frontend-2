import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./UserAvatar.tsx", import.meta.url), "utf8")

test("user avatar only renders initials as an explicit fallback state", () => {
  assert.match(source, /useState/)
  assert.match(source, /showInitials/)
  assert.match(source, /onLoad=\{\(\) => setShowInitials\(false\)\}/)
  assert.match(source, /onError=\{\(\) => setShowInitials\(true\)\}/)
  assert.match(source, /\{showInitials \? <span/)
})
