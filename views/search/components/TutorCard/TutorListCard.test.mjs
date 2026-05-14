import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./TutorListCard.tsx", import.meta.url), "utf8")

test("tutor list card ignores bubbled clicks from portaled dialog content", () => {
  assert.match(
    source,
    /const onCardClick = \(event: MouseEvent<HTMLDivElement>\) => \{\s*if \(!event\.currentTarget\.contains\(event\.target as Node\)\) \{\s*return\s*\}/,
  )
})
