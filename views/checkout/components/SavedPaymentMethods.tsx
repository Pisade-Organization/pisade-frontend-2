import Typography from "@/components/base/Typography"
import type { SavedPaymentMethod } from "@/services/payments"
import { formatExpiryDate, getCardBrandDisplayName } from "@/services/payments"

interface SavedPaymentMethodsProps {
  methods: SavedPaymentMethod[]
  selectedMethodId: string | null
  onSelectMethod: (paymentMethodId: string | null) => void
  onRemoveMethod?: (paymentMethodId: string) => void
  isRemoving?: boolean
}

export default function SavedPaymentMethods({
  methods,
  selectedMethodId,
  onSelectMethod,
  onRemoveMethod,
  isRemoving,
}: SavedPaymentMethodsProps) {
  if (methods.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-neutral-25 p-4">
      <Typography variant="title-4" color="neutral-900">
        Saved cards
      </Typography>

      <div className="flex flex-col gap-2">
        {methods.map((method) => {
          const isSelected = selectedMethodId === method.id

          return (
            <div
              key={method.id}
              className={[
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
                isSelected
                  ? "border-electric-violet-500 bg-electric-violet-50"
                  : "border-neutral-100 bg-white hover:border-neutral-200",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => onSelectMethod(method.id)}
                className="flex flex-1 flex-col gap-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <Typography variant="body-3" color="neutral-900" className="font-medium">
                    {getCardBrandDisplayName(method.brand)} ending in {method.last4}
                  </Typography>
                  {method.isDefault && (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">
                      Default
                    </span>
                  )}
                </div>
                <Typography variant="body-4" color="neutral-500">
                  Expires {formatExpiryDate(method.expiryMonth, method.expiryYear)}
                </Typography>
              </button>

              {onRemoveMethod && (
                <button
                  type="button"
                  onClick={() => {
                    onRemoveMethod(method.id)
                  }}
                  disabled={isRemoving}
                  className={[
                    "text-sm disabled:cursor-not-allowed",
                    isRemoving ? "text-neutral-300" : "text-red-500",
                  ].join(" ")}
                >
                  Remove
                </button>
              )}
            </div>
          )
        })}

        <button
          type="button"
          onClick={() => onSelectMethod(null)}
          className={[
            "rounded-xl border px-4 py-3 text-left transition-colors",
            selectedMethodId === null
              ? "border-electric-violet-500 bg-electric-violet-50"
              : "border-dashed border-neutral-200 bg-white hover:border-neutral-300",
          ].join(" ")}
        >
          <Typography variant="body-3" color="neutral-900" className="font-medium">
            Use a new card
          </Typography>
          <Typography variant="body-4" color="neutral-500">
            Enter fresh card details for this payment.
          </Typography>
        </button>
      </div>
    </div>
  )
}
