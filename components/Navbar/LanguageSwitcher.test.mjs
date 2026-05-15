import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync(new URL("./LanguageSwitcher.tsx", import.meta.url), "utf8")

test("language switcher derives the student-style label from the locale", () => {
  assert.match(source, /const currentLocale = pathname\?\.split\("\/"\)\[1\] === "th" \? "th" : "en"/)
  assert.match(source, /const language = currentLocale\.toUpperCase\(\) as "EN" \| "TH"/)
})

test("language switcher opens the student-style menu below the trigger", () => {
  assert.match(source, /<DropdownMenuContent align="end" side="bottom" className="w-\[88px\] rounded-\[12px\] border border-neutral-50 p-1">/)
})
