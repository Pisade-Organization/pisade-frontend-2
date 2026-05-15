import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./StudentProfileDropdown.tsx", import.meta.url), "utf8")

test("student profile dropdown routes top up wallet button to the student wallet page", () => {
  assert.match(
    source,
    /<BaseButton(?:\s|\n)+onClick=\{\(\)\s*=>\s*router\.push\(`\$\{localePrefix\}\/student\/wallet`\)\}(?:\s|\n)*>\s*Top Up Wallet\s*<\/BaseButton>/,
  )
})
