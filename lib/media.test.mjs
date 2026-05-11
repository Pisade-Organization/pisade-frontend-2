import test from "node:test"
import assert from "node:assert/strict"

import { resolveMediaUrlOrFallback } from "./media.ts"

test("resolveMediaUrlOrFallback returns the fallback when the media path is empty", () => {
  assert.equal(
    resolveMediaUrlOrFallback("", "/images/avatars/default-avatar.svg"),
    "/images/avatars/default-avatar.svg",
  )
})
