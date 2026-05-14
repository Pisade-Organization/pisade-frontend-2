import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const checkoutSource = readFileSync(new URL("./Checkout.tsx", import.meta.url), "utf8")
const selectorSource = readFileSync(
  new URL("../components/PaymentDetailsSection/PaymentMethodSelector/index.tsx", import.meta.url),
  "utf8",
)

test("checkout primary panel removes desktop side padding so payment section can span full width", () => {
  assert.match(
    checkoutSource,
    /<PrimaryPanel className="px-0 lg:px-0 lg:py-6 lg:border-none">/,
  )
})

test("credit and debit card option uses the larger icon size to match promptpay visually", () => {
  assert.match(
    selectorSource,
    /method: "CARD"[\s\S]*?<CreditCard className="w-7 h-7 text-neutral-500"/,
  )
})
