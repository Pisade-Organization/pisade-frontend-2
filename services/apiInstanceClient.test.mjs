import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./apiInstanceClient.ts", import.meta.url), "utf8")

test("api instance clears cached session before retrying a 401", () => {
  assert.match(source, /function clearSessionCache\(\)/)
  assert.match(source, /async function refreshSession\(\)/)
  assert.match(source, /status !== 401/)
  assert.match(source, /originalConfig\._retry = true/)
  assert.match(source, /return apiInstanceClient\.request\(originalConfig\)/)
})
