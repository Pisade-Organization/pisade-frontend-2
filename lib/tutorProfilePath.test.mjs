import test from "node:test"
import assert from "node:assert/strict"

import { buildTutorProfilePath } from "./tutorProfilePath.ts"

test("buildTutorProfilePath includes the locale prefix", () => {
  assert.equal(buildTutorProfilePath("th", "abc123"), "/th/tutor/abc123")
})

test("buildTutorProfilePath falls back to en when locale is missing", () => {
  assert.equal(buildTutorProfilePath("", "abc123"), "/en/tutor/abc123")
})

test("buildTutorProfilePath trims leading and trailing slashes from locale", () => {
  assert.equal(buildTutorProfilePath("/th/", "abc123"), "/th/tutor/abc123")
})
