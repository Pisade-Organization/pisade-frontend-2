"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import CheckoutMobileHeader from "../components/CheckoutMobileHeader"
import BookingSummary from "@/components/shared/BookingSummary"
import PaymentMethodSelector, {
  PAYMENT_METHODS,
} from "../components/PaymentDetailsSection/PaymentMethodSelector"
import PaymentMethodSelectorHeader from "../components/PaymentDetailsSection/PaymentMethodSelectorHeader"
import Navbar from "@/components/Navbar"
import SaveThisMethodSelect from "../components/SaveThisMethodSelect"
import PaymentConfirmationNotice from "../components/PaymentConfirmationNotice"
import PayButton from "../components/PayButton"
import SavedPaymentMethods from "../components/SavedPaymentMethods"
import type { PaymentMethodSelectorI } from "../components/PaymentDetailsSection/PaymentMethodSelector/types"
import { useBookingDetail } from "@/hooks/bookings/queries"
import { useCheckoutBooking } from "@/hooks/bookings/mutations"
import {
  usePaymentMethods,
  useRemovePaymentMethod,
} from "@/hooks/payments"
import {
  DesktopOnly,
  MobileOnly,
  PageContainer,
  PageRoot,
  SummaryPanel,
  TwoColumnLayout,
} from "@/components/layout/PagePrimitives"
import {
  connectPaymentsSocket,
  disconnectPaymentsSocket,
  onPaymentConfirmed,
  onPaymentFailed,
} from "@/services/payments/socketClient"

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeInstance
  }
}

interface StripeCardElement {
  mount: (selector: string) => void
  destroy: () => void
}

interface StripeElements {
  create: (type: "card", options?: unknown) => StripeCardElement
}

interface StripeInstance {
  elements: () => StripeElements
  createPaymentMethod: (params: {
    type: "card"
    card: StripeCardElement
  }) => Promise<{
    error?: { message?: string; code?: string; type?: string }
    paymentMethod?: { id: string }
  }>
  confirmCardPayment: (clientSecret: string) => Promise<{
    error?: { message?: string; code?: string; type?: string }
    paymentIntent?: { status?: string }
  }>
}

type PaymentMethod = PaymentMethodSelectorI["method"]

interface CheckoutResult {
  status?: string
  payment?: {
    clientSecret?: string | null
    qrCodeUrl?: string | null
  }
}

const STRIPE_SCRIPT_ID = "stripe-js-sdk"
const STRIPE_CARD_ELEMENT_ID = "#stripe-card-element"

function getCardConfirmationErrorMessage(error?: {
  message?: string
  code?: string
  type?: string
}) {
  if (!error) {
    return "Card confirmation failed."
  }

  if (error.code === "card_declined") {
    return "Your card was declined. Please try another card."
  }

  if (error.code === "expired_card") {
    return "Your card has expired. Please use a different card."
  }

  if (error.code === "incorrect_cvc") {
    return "The security code is incorrect. Please try again."
  }

  if (error.code === "authentication_required") {
    return "This card needs additional authentication. Please complete the verification flow."
  }

  return error.message ?? "Card confirmation failed."
}

export default function Checkout() {
  const router = useRouter()
  const params = useParams()
  const { data: session } = useSession()
  const bookingId = params?.bookingId as string | undefined
  const locale = (params?.locale as string | undefined) ?? "en"
  const { data: booking } = useBookingDetail(bookingId)
  const { data: savedPaymentMethods = [] } = usePaymentMethods()
  const checkoutMutation = useCheckoutBooking(bookingId)
  const removePaymentMethodMutation = useRemovePaymentMethod()
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  const stripeRef = useRef<StripeInstance | null>(null)
  const cardElementRef = useRef<StripeCardElement | null>(null)

  const lessonStart = booking ? new Date(booking.schedule.startTime) : new Date()
  const lessonEnd = booking ? new Date(booking.schedule.endTime) : new Date()
  const startTime = lessonStart.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const endTime = lessonEnd.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const lessonPrice = booking?.pricing.amount ?? 0
  const processingFee = 0
  const totalAmount = lessonPrice + processingFee

  const [isStripeReady, setIsStripeReady] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("CARD")
  const [selectedSavedPaymentMethodId, setSelectedSavedPaymentMethodId] =
    useState<string | null>(null)
  const [savePaymentMethod, setSavePaymentMethod] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [promptPayQrUrl, setPromptPayQrUrl] = useState<string | null>(null)
  const [isWaitingForPayment, setIsWaitingForPayment] = useState(false)

  useEffect(() => {
    if (selectedPaymentMethod !== "CARD") {
      setSelectedSavedPaymentMethodId(null)
      setSavePaymentMethod(false)
      return
    }

    if (savedPaymentMethods.length === 0) {
      setSelectedSavedPaymentMethodId(null)
      return
    }

    const selectedStillExists = savedPaymentMethods.some(
      (method) => method.id === selectedSavedPaymentMethodId,
    )

    if (!selectedSavedPaymentMethodId || !selectedStillExists) {
      const defaultMethod =
        savedPaymentMethods.find((method) => method.isDefault) ??
        savedPaymentMethods[0]
      setSelectedSavedPaymentMethodId(defaultMethod?.id ?? null)
    }
  }, [savedPaymentMethods, selectedPaymentMethod, selectedSavedPaymentMethodId])

  // Connect to payments WebSocket when PromptPay QR is displayed
  useEffect(() => {
    if (!promptPayQrUrl || !session?.access_token || !bookingId) {
      return
    }

    setIsWaitingForPayment(true)
    const socket = connectPaymentsSocket(session.access_token)

    const unsubConfirmed = onPaymentConfirmed((payload) => {
      if (payload.bookingId === bookingId && payload.status === "CONFIRMED") {
        setIsWaitingForPayment(false)
        router.push(`/${locale}/class-management`)
      }
    })

    const unsubFailed = onPaymentFailed((payload) => {
      if (payload.bookingId === bookingId) {
        setIsWaitingForPayment(false)
        setPromptPayQrUrl(null)
        setLocalError(payload.reason ?? "Payment failed. Please try again.")
      }
    })

    return () => {
      unsubConfirmed()
      unsubFailed()
      disconnectPaymentsSocket()
      setIsWaitingForPayment(false)
    }
  }, [promptPayQrUrl, session?.access_token, bookingId, locale, router])

  useEffect(() => {
    if (!stripePublishableKey) return

    const initializeStripe = () => {
      if (!window.Stripe) {
        setLocalError("Stripe SDK failed to load.")
        return
      }

      stripeRef.current = window.Stripe(stripePublishableKey)
      setIsStripeReady(true)
    }

    if (window.Stripe) {
      initializeStripe()
      return
    }

    const existingScript = document.getElementById(STRIPE_SCRIPT_ID)
    if (existingScript) {
      existingScript.addEventListener("load", initializeStripe)
      return () => {
        existingScript.removeEventListener("load", initializeStripe)
      }
    }

    const script = document.createElement("script")
    script.id = STRIPE_SCRIPT_ID
    script.src = "https://js.stripe.com/v3"
    script.async = true
    script.addEventListener("load", initializeStripe)
    document.body.appendChild(script)

    return () => {
      script.removeEventListener("load", initializeStripe)
    }
  }, [stripePublishableKey])

  useEffect(() => {
    if (
      !isStripeReady ||
      selectedPaymentMethod !== "CARD" ||
      selectedSavedPaymentMethodId
    ) {
      if (cardElementRef.current) {
        cardElementRef.current.destroy()
        cardElementRef.current = null
      }
      return
    }

    if (!stripeRef.current || cardElementRef.current) {
      return
    }

    const cardContainer = document.querySelector(STRIPE_CARD_ELEMENT_ID)
    if (!cardContainer) {
      return
    }

    const elements = stripeRef.current.elements()
    const cardElement = elements.create("card", {
      hidePostalCode: true,
      style: {
        base: {
          fontSize: "16px",
          color: "#0a0a0a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          "::placeholder": {
            color: "#a3a3a3",
          },
        },
      },
    })

    cardElement.mount(STRIPE_CARD_ELEMENT_ID)
    cardElementRef.current = cardElement

    return () => {
      if (cardElementRef.current) {
        cardElementRef.current.destroy()
        cardElementRef.current = null
      }
    }
  }, [isStripeReady, selectedPaymentMethod, selectedSavedPaymentMethodId])

  const handlePay = async () => {
    if (!bookingId) return

    setLocalError(null)
    setPromptPayQrUrl(null)

    let paymentMethodId: string | undefined

    if (selectedPaymentMethod === "CARD") {
      if (!selectedSavedPaymentMethodId) {
        if (!isStripeReady || !stripeRef.current || !cardElementRef.current) {
          setLocalError("Stripe is still loading. Please try again.")
          return
        }

        const paymentMethodResult = await stripeRef.current.createPaymentMethod({
          type: "card",
          card: cardElementRef.current,
        })

        if (paymentMethodResult.error) {
          setLocalError(
            paymentMethodResult.error.message ?? "Unable to read card details.",
          )
          return
        }

        paymentMethodId = paymentMethodResult.paymentMethod?.id
        if (!paymentMethodId) {
          setLocalError("Stripe did not return a payment method id.")
          return
        }
      }
    }

    try {
      const result = (await checkoutMutation.mutateAsync({
        method: selectedPaymentMethod,
        paymentMethodId,
        savedPaymentMethodId: selectedSavedPaymentMethodId ?? undefined,
        savePaymentMethod:
          selectedPaymentMethod === "CARD" && !selectedSavedPaymentMethodId
            ? savePaymentMethod
            : undefined,
      })) as CheckoutResult

      if (result.status !== "PENDING_TOPUP") {
        router.push(`/${locale}/class-management`)
        return
      }

      if (selectedPaymentMethod === "PROMPTPAY") {
        setPromptPayQrUrl(result.payment?.qrCodeUrl ?? null)
        return
      }

      const clientSecret = result.payment?.clientSecret
      if (!clientSecret) {
        setLocalError("Missing Stripe client secret for card confirmation.")
        return
      }

      if (!stripeRef.current) {
        setLocalError("Stripe is not available right now. Please try again.")
        return
      }

      const confirmation = await stripeRef.current.confirmCardPayment(clientSecret)
      if (confirmation.error) {
        setLocalError(getCardConfirmationErrorMessage(confirmation.error))
        return
      }

      if (confirmation.paymentIntent?.status === "succeeded") {
        router.push(`/${locale}/class-management`)
        return
      }

      if (confirmation.paymentIntent?.status === "processing") {
        setLocalError("Payment is processing. Please wait a moment and refresh if needed.")
        return
      }

      if (confirmation.paymentIntent?.status === "requires_payment_method") {
        setLocalError("Your payment could not be completed. Please try another card.")
        return
      }

      if (confirmation.paymentIntent?.status === "requires_action") {
        setLocalError("Additional authentication is required to complete this payment.")
        return
      }

      setLocalError("Payment is still pending. Please wait for confirmation.")
    } catch {
      setLocalError("Payment failed. Please check your payment details and try again.")
    }
  }

  const handleRemoveSavedMethod = async (paymentMethodId: string) => {
    try {
      await removePaymentMethodMutation.mutateAsync(paymentMethodId)
      if (selectedSavedPaymentMethodId === paymentMethodId) {
        setSelectedSavedPaymentMethodId(null)
      }
    } catch {
      setLocalError("Unable to remove saved card right now. Please try again.")
    }
  }

  const isPayDisabled =
    !bookingId ||
    !booking?.allowedActions.pay ||
    (selectedPaymentMethod === "CARD" && !isStripeReady)

  if (!stripePublishableKey) {
    return (
      <PageRoot>
        <PageContainer>
          <p className="px-4 py-8 text-sm text-red-500">
            Stripe publishable key is missing. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
          </p>
        </PageContainer>
      </PageRoot>
    )
  }

  return (
    <PageRoot>
      <MobileOnly>
        <CheckoutMobileHeader />
      </MobileOnly>

      <DesktopOnly>
        <Navbar variant="student_dashboard" />
      </DesktopOnly>

      <PageContainer>
        <TwoColumnLayout className="gap-0 lg:gap-10">
          <SummaryPanel>
            <BookingSummary
              variant="checkout"
              tutorName={booking?.tutor?.name ?? "Tutor"}
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl={booking?.tutor?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor"}
              subject="Lesson"
              rating={booking?.tutor?.rating ?? 0}
              studentsCount={booking?.tutor?.studentCount ?? 0}
              lessonsCount={booking?.tutor?.lessonCount ?? 0}
              cancellationDeadline={lessonStart}
              lessonName="Booked lesson"
              date={lessonStart}
              startTime={startTime}
              endTime={endTime}
              timezone="Etc/GMT+11"
              lessonPrice={lessonPrice}
              processingFee={processingFee}
              total={totalAmount}
            />
          </SummaryPanel>

          <MobileOnly className="w-screen border-t border-neutral-100" />

          <div className="w-full lg:flex-1 flex flex-col gap-5 py-2 px-4 pb-24 lg:pb-6 lg:py-6 lg:px-[120px] lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
            <PaymentMethodSelectorHeader />
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
              showCardForm={!selectedSavedPaymentMethodId}
            />

            {selectedPaymentMethod === "CARD" && (
              <SavedPaymentMethods
                methods={savedPaymentMethods}
                selectedMethodId={selectedSavedPaymentMethodId}
                onSelectMethod={setSelectedSavedPaymentMethodId}
                onRemoveMethod={handleRemoveSavedMethod}
                isRemoving={removePaymentMethodMutation.isPending}
              />
            )}

            {selectedPaymentMethod === "CARD" && !selectedSavedPaymentMethodId && (
              <SaveThisMethodSelect
                checked={savePaymentMethod}
                onCheckedChange={setSavePaymentMethod}
              />
            )}
            <PaymentConfirmationNotice totalAmount={totalAmount} />

            {(checkoutMutation.isError || localError) && (
              <p className="text-sm text-red-500">
                {localError ?? "Payment failed. Please check your payment details and try again."}
              </p>
            )}

            {promptPayQrUrl && (
              <div className="rounded-xl border border-neutral-100 p-4 flex flex-col gap-3 items-center">
                <p className="text-sm text-neutral-700 text-center">
                  Scan this PromptPay QR code to complete your payment.
                </p>
                <img
                  src={promptPayQrUrl}
                  alt="PromptPay QR code"
                  className="w-48 h-48 object-contain"
                />
                {isWaitingForPayment && (
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Waiting for payment confirmation...</span>
                  </div>
                )}
              </div>
            )}

            <PayButton
              paymentMethod={PAYMENT_METHODS[selectedPaymentMethod]}
              onPay={handlePay}
              isLoading={checkoutMutation.isPending}
              disabled={isPayDisabled}
            />
          </div>
        </TwoColumnLayout>
      </PageContainer>
    </PageRoot>
  )
}
