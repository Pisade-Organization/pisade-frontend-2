import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const searchPageSource = readFileSync(new URL("./Search.tsx", import.meta.url), "utf8")
const filterPanelSource = readFileSync(
  new URL("../components/filters/FilterPanel.tsx", import.meta.url),
  "utf8",
)

test("search page wires availability and education filters into search state", () => {
  assert.match(searchPageSource, /educationLevel/)
  assert.match(searchPageSource, /availability/)
})

test("filter panel passes availability and education state into their dropdowns", () => {
  assert.match(filterPanelSource, /<AvailabilityDropdown[\s\S]*value=/)
  assert.match(filterPanelSource, /<EducationLevelDropdown[\s\S]*value=/)
})
