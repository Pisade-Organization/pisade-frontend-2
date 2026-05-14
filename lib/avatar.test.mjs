import test from "node:test"
import assert from "node:assert/strict"

import { resolveUserAvatarUrl } from "./avatar.js"

test("resolveUserAvatarUrl prefers the profile avatar when both sources exist", () => {
  const previousBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  process.env.NEXT_PUBLIC_BACKEND_URL = "https://api.example.com"

  try {
    assert.equal(
      resolveUserAvatarUrl("/uploads/profile-avatar.png", "uploads/session-avatar.png"),
      "https://api.example.com/uploads/profile-avatar.png",
    )
  } finally {
    if (previousBackendUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BACKEND_URL
    } else {
      process.env.NEXT_PUBLIC_BACKEND_URL = previousBackendUrl
    }
  }
})

test("resolveUserAvatarUrl falls back to the session avatar and resolves backend media paths", () => {
  const previousBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  process.env.NEXT_PUBLIC_BACKEND_URL = "https://api.example.com"

  try {
    assert.equal(
      resolveUserAvatarUrl(null, "uploads/users/student-avatar.png"),
      "https://api.example.com/uploads/users/student-avatar.png",
    )
  } finally {
    if (previousBackendUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BACKEND_URL
    } else {
      process.env.NEXT_PUBLIC_BACKEND_URL = previousBackendUrl
    }
  }
})

test("resolveUserAvatarUrl returns undefined when both avatar sources are empty", () => {
  assert.equal(resolveUserAvatarUrl(null, undefined), undefined)
})
