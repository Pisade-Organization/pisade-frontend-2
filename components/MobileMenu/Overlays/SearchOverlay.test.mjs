import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./SearchOverlay.tsx", import.meta.url), "utf8")

test("search overlay defines tutor-specific general links for the mobile home menu", () => {
  assert.match(source, /data\?\.user\?\.role === Role\.TUTOR/)
  assert.match(source, /label: "Students"/)
  assert.match(source, /href: `\$\{localePrefix\}\/tutor\/students\/active`/)
  assert.match(source, /label: "Schedule"/)
  assert.match(source, /href: `\$\{localePrefix\}\/tutor\/schedule`/)
  assert.match(source, /label: "Earnings & Withdrawals"/)
  assert.match(source, /href: `\$\{localePrefix\}\/tutor\/earnings-and-withdrawals`/)
})

test("search overlay defines tutor-specific account links without saved tutor", () => {
  const tutorAccountBranch = source.match(/const accountItems:[\s\S]*?isTutor\s*\?\s*\[(.*?)\]\s*:\s*\[/s)?.[1] ?? ""

  assert.match(tutorAccountBranch, /label: "My Wallet"/)
  assert.match(source, /label: "My Profile"/)
  assert.match(source, /href: `\$\{localePrefix\}\/settings\/tutor\/general`/)
  assert.doesNotMatch(tutorAccountBranch, /label: "Saved Tutor"/)
})

test("search overlay reuses tutor stats card instead of the student wallet card for tutors", () => {
  assert.match(source, /useMyTutorProfile\(/)
  assert.match(source, /import TutorProfileContainer from "\.\/TutorDashboardOverlay\/TutorProfileContainer"/)
  assert.match(source, /isTutor\s*\?\s*\(\s*<TutorProfileContainer/)
})
