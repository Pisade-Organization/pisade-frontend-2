import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./getPostAuthPath.ts", import.meta.url), "utf8")

test("post-auth routing sends admin users to the admin app", () => {
  assert.match(source, /role === Role\.ADMIN/)
  assert.match(source, /NEXT_PUBLIC_ADMIN_URL/)
})
