// @ts-nocheck
import test from "node:test"
import assert from "node:assert/strict"

import { canOpenBookingPage } from "./bookingAccess.ts"

test("allows students to open the booking page", () => {
  assert.equal(canOpenBookingPage("STUDENT"), true)
})

test("blocks tutors from opening the booking page", () => {
  assert.equal(canOpenBookingPage("TUTOR"), false)
})
