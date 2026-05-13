import test from "node:test"
import assert from "node:assert/strict"

import { resolveMediaUrlOrFallback } from "./media.ts"

test("resolveMediaUrlOrFallback returns the fallback when the media path is empty", () => {
  assert.equal(
    resolveMediaUrlOrFallback("", "/images/avatars/default-avatar.svg"),
    "/images/avatars/default-avatar.svg",
  )
})

test("resolveMediaUrlOrFallback keeps local public assets on the frontend origin", () => {
  const previousBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  process.env.NEXT_PUBLIC_BACKEND_URL = "https://api.example.com"

  try {
    assert.equal(
      resolveMediaUrlOrFallback(
        "/images/avatars/default-avatar.svg",
        "/images/avatars/default-avatar.svg",
      ),
      "/images/avatars/default-avatar.svg",
    )
  } finally {
    if (previousBackendUrl === undefined) {
      delete process.env.NEXT_PUBLIC_BACKEND_URL
    } else {
      process.env.NEXT_PUBLIC_BACKEND_URL = previousBackendUrl
    }
  }
})

test("resolveMediaUrlOrFallback prefixes backend media paths", () => {
  const previousBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
  process.env.NEXT_PUBLIC_BACKEND_URL = "https://api.example.com"

  try {
    assert.equal(
      resolveMediaUrlOrFallback(
        "uploads/users/student-avatar.png",
        "/images/avatars/default-avatar.svg",
      ),
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
