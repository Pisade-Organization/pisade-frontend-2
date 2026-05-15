import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./SearchOverlay.tsx", import.meta.url), "utf8")

test("search overlay defines tutor-specific general links for the mobile home menu", () => {
  assert.match(source, /data\?\.user\?\.role === Role\.TUTOR/)
  assert.match(source, /label: t\("nav\.tutor\.students"\)/)
  assert.match(source, /href: `\$\{localePrefix\}\/tutor\/students\/active`/)
  assert.match(source, /label: t\("nav\.tutor\.schedule"\)/)
  assert.match(source, /href: `\$\{localePrefix\}\/tutor\/schedule`/)
  assert.match(source, /label: t\("nav\.tutor\.earnings"\)/)
  assert.match(source, /href: `\$\{localePrefix\}\/tutor\/earnings-and-withdrawals`/)
})

test("search overlay defines tutor-specific account links without saved tutor", () => {
  const tutorAccountBranch = source.match(/const accountItems:[\s\S]*?isTutor\s*\?\s*\[(.*?)\]\s*:\s*\[/s)?.[1] ?? ""

  assert.match(tutorAccountBranch, /label: t\("profile\.tutor\.earnings"\)/)
  assert.match(source, /label: t\("profile\.tutor\.myProfile"\)/)
  assert.match(source, /href: `\$\{localePrefix\}\/settings\/tutor\/general`/)
  assert.doesNotMatch(tutorAccountBranch, /label: "Saved Tutor"/)
})

test("search overlay routes tutor transactions to earnings and withdrawals", () => {
  const tutorAccountBranch = source.match(/const accountItems:[\s\S]*?isTutor\s*\?\s*\[(.*?)\]\s*:\s*\[/s)?.[1] ?? ""

  assert.match(tutorAccountBranch, /label: t\("profile\.student\.transactions"\)/)
  assert.match(
    tutorAccountBranch,
    /href: `\$\{localePrefix\}\/tutor\/earnings-and-withdrawals`/,
  )
  assert.doesNotMatch(
    tutorAccountBranch,
    /href: `\$\{localePrefix\}\/settings\/tutor\/payment-history`/,
  )
})

test("search overlay reuses tutor stats card instead of the student wallet card for tutors", () => {
  assert.match(source, /useMyTutorProfile\(/)
  assert.match(source, /import TutorProfileContainer from "\.\/TutorDashboardOverlay\/TutorProfileContainer"/)
  assert.match(source, /isTutor\s*\?\s*\(\s*<TutorProfileContainer/)
})

test("search overlay routes student top up wallet button to the student wallet page", () => {
  assert.match(
    source,
    /<BaseButton onClick=\{\(\) => router\.push\(`\$\{localePrefix\}\/student\/wallet`\)\}>\s*\{t\("profile\.student\.topUpWallet"\)\}\s*<\/BaseButton>/,
  )
})
