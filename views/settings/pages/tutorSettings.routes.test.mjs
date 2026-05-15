import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

function readSource(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8")
}

test("tutor settings root redirect keeps the locale segment", () => {
  const source = readSource("../../../app/[locale]/settings/tutor/page.tsx")

  assert.match(source, /params:\s*Promise<\{\s*locale:\s*string\s*\}>/)
  assert.match(source, /redirect\(`\/\$\{locale\}\/settings\/tutor\/general`\)/)
  assert.doesNotMatch(source, /redirect\("\/settings\/tutor\/general"\)/)
})

test("tutor payment history route redirects to earnings and withdrawals", () => {
  const source = readSource("../../../app/[locale]/settings/tutor/payment-history/page.tsx")

  assert.match(source, /redirect\(`\/\$\{locale\}\/tutor\/earnings-and-withdrawals`\)/)
})

test("tutor payment method route redirects to billing methods", () => {
  const source = readSource("../../../app/[locale]/settings/tutor/payment-method/page.tsx")

  assert.match(source, /redirect\(`\/\$\{locale\}\/settings\/tutor\/billing-methods`\)/)
})

test("tutor dashboard routes earnings actions with locale-aware paths", () => {
  const source = readSource("../../dashboard/pages/TutorDashboard.tsx")

  assert.match(source, /const locale = pathname\?\.split\("\/"\)\[1\]/)
  assert.match(source, /router\.push\(`\$\{localePrefix\}\/tutor\/earnings-and-withdrawals`\)/)
  assert.doesNotMatch(source, /router\.push\("\/tutor\/earnings-and-withdrawals"\)/)
})
