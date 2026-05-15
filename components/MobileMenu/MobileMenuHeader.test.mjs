import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./MobileMenuHeader.tsx", import.meta.url), "utf8")

test("mobile menu header uses the shared language switcher instead of a static language button", () => {
  assert.match(source, /import LanguageSwitcher from "\.\.\/Navbar\/LanguageSwitcher"/)
  assert.match(source, /<LanguageSwitcher studentStyle \/>/)
  assert.doesNotMatch(source, />\s*EN\s*</)
})
