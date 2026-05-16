// @ts-nocheck
import test from "node:test"
import assert from "node:assert/strict"

import { shouldShowBookLessonButton } from "./bookLessonVisibility.ts"

test("shows the book lesson button for students when a tutor id is available", () => {
  assert.equal(shouldShowBookLessonButton("STUDENT", "tutor-123"), true)
})

test("hides the book lesson button for tutors even when a tutor id is available", () => {
  assert.equal(shouldShowBookLessonButton("TUTOR", "tutor-123"), false)
})

test("hides the book lesson button when there is no tutor booking target", () => {
  assert.equal(shouldShowBookLessonButton("STUDENT", null), false)
})
