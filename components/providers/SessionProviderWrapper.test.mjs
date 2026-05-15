import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./SessionProviderWrapper.tsx", import.meta.url), "utf8")

test("session provider watcher redirects unauthenticated users away from protected routes", () => {
  assert.match(source, /status !== "unauthenticated"/)
  assert.match(source, /router\.replace\(signInPath\)/)
})

test("session provider watcher signs out fatal auth errors using a localized sign-in callback", () => {
  assert.match(source, /void signOut\(\{ callbackUrl: signInPath \}\)/)
})
