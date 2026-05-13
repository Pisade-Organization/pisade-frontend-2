import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./index.tsx", import.meta.url), "utf8")

test("tutor mobile overlay loads ranking and stats from the tutor profile query", () => {
  assert.match(source, /useMyTutorProfile\(/)
  assert.match(source, /tutorRanking=\{normalizeTutorRanking\(tutorProfileData\?\.tutorRanking\) \?\? undefined\}/)
  assert.match(source, /rating=\{tutorProfileData\?\.avgRating\}/)
  assert.match(source, /studentsCount=\{tutorProfileData\?\.studentsCount\}/)
  assert.match(source, /lessonsCount=\{tutorProfileData\?\.lessonsCount\}/)
})
