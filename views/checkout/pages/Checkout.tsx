"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { AxiosError } from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import Navbar from "@/components/Navbar";
import BaseButton from "@/components/base/BaseButton";
import Typography from "@/components/base/Typography";
import BookingSummary from "@/components/shared/BookingSummary";
import TopToast from "@/components/shared/TopToast";
import {
  DesktopOnly,
  MobileOnly,
  PageContainer,
  PageRoot,
  PrimaryPanel,
  SummaryPanel,
  TwoColumnLayout,
} from "@/components/layout/PagePrimitives";
import { PageNavigationHeader } from "@/views/cancel-booking/components/PageNavigationHeader";
import { useBookingDetail } from "@/hooks/bookings/queries";
import { useCheckoutBooking } from "@/hooks/bookings/mutations";
import { usePaymentMethods } from "@/hooks/payments/usePaymentMethods";
import {
  connectPaymentsSocket,
  disconnectPaymentsSocket,
  onPaymentConfirmed,
  onPaymentFailed,
} from "@/services/payments/socketClient";
import SavedPaymentMethods from "../components/SavedPaymentMethods";
import PaymentConfirmationNotice from "../components/PaymentConfirmationNotice";
import PaymentMethodSelector, {
  PAYMENT_METHODS,
} from "../components/PaymentDetailsSection/PaymentMethodSelector";
import CardForm from "../components/PaymentDetailsSection/PaymentForms/CardForm";
import type { CardFormHandle } from "../components/PaymentDetailsSection/PaymentForms/CardForm";
import SaveThisMethodSelect from "../components/SaveThisMethodSelect";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

type PaymentMethod = "PROMPTPAY" | "CARD" | "WALLET";

type CheckoutUiState =
  | { kind: "idle" }
  | {
      kind: "pending";
      method: PaymentMethod;
      topupAmount: number;
      shortfall: number;
      qrCodeUrl?: string | null;
      expiresAt?: string | null;
    }
  | { kind: "confirmed"; paymentTransactionId?: string };

type CheckoutApiError = {
  code?: string;
  message?: string | string[];
  error?: {
    code?: string;
    message?: string | string[];
    details?: {
      code?: string;
      message?: string | string[];
    };
  };
};

function formatCurrency(value: number, currency = "THB") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function getErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<CheckoutApiError>;
  const payload = axiosError.response?.data;
  const apiError = payload?.error;
  const message = apiError?.message ?? apiError?.details?.message ?? payload?.message;

  if (typeof message === "string" && message.trim()) {
    return message;
  }

  if (Array.isArray(message) && message.length > 0) {
    return message[0];
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  );
}

function CheckoutContent() {
  const stripe = useStripe();
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const bookingId = params?.bookingId as string | undefined;
  const locale = (params?.locale as string | undefined) ?? "en";
  const {
    data: booking,
    isLoading,
    isError,
    refetch: refetchBooking,
  } = useBookingDetail(bookingId);
  const checkoutMutation = useCheckoutBooking(bookingId);
  const { data: savedMethods = [], isLoading: isLoadingPaymentMethods } = usePaymentMethods();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("PROMPTPAY");
  const [selectedSavedMethodId, setSelectedSavedMethodId] = useState<string | null>(null);
  const [uiState, setUiState] = useState<CheckoutUiState>({ kind: "idle" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [saveCard, setSaveCard] = useState(false);
  const [is3dsProcessing, setIs3dsProcessing] = useState(false);
  const cardFormRef = useRef<CardFormHandle>(null);

  useEffect(() => {
    const defaultMethod =
      savedMethods.find((method) => method.isDefault) ?? savedMethods[0] ?? null;

    setSelectedSavedMethodId((current) => current ?? defaultMethod?.id ?? null);
  }, [savedMethods]);

  useEffect(() => {
    if (selectedMethod === "CARD" && savedMethods.length === 0) {
      setSelectedSavedMethodId(null);
    }
  }, [savedMethods.length, selectedMethod]);

  useEffect(() => {
    if (uiState.kind !== "pending" || !session?.access_token) {
      return;
    }

    connectPaymentsSocket(session.access_token);

    const unsubscribeConfirmed = onPaymentConfirmed((payload) => {
      if (payload.bookingId !== bookingId) {
        return;
      }

      setUiState({
        kind: "confirmed",
        paymentTransactionId: payload.paymentTransactionId,
      });
      setErrorMessage(null);
    });

    const unsubscribeFailed = onPaymentFailed((payload) => {
      if (payload.bookingId !== bookingId) {
        return;
      }

      setErrorMessage(payload.reason ?? "Payment failed. Please try again.");
      setUiState({ kind: "idle" });
    });

    return () => {
      unsubscribeConfirmed();
      unsubscribeFailed();
      disconnectPaymentsSocket();
    };
  }, [bookingId, session?.access_token, uiState.kind]);

  useEffect(() => {
    if (!booking) {
      return;
    }

    if (booking.status === "CONFIRMED") {
      setUiState((current) =>
        current.kind === "confirmed"
          ? current
          : {
              kind: "confirmed",
            },
      );
      setErrorMessage(null);
      return;
    }

    if (
      uiState.kind === "pending" &&
      (booking.status === "EXPIRED" || booking.status === "CANCELLED")
    ) {
      setUiState({ kind: "idle" });
      setErrorMessage("Payment was not completed in time. Please try the checkout again.");
    }
  }, [booking, uiState.kind]);

  useEffect(() => {
    if (uiState.kind !== "pending") {
      return;
    }

    const intervalId = window.setInterval(() => {
      void refetchBooking();
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refetchBooking, uiState.kind]);

  useEffect(() => {
    if (uiState.kind !== "confirmed") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.push(`/${locale}/student/schedule`);
    }, 1500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [locale, router, uiState.kind]);

  const lessonDate = booking ? new Date(booking.schedule.startTime) : new Date();
  const lessonEnd = booking ? new Date(booking.schedule.endTime) : new Date();
  const cancellationDeadline = new Date(lessonDate);
  const startTime = lessonDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const endTime = lessonEnd.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const expiresAtText = useMemo(() => {
    if (uiState.kind !== "pending" || !uiState.expiresAt) {
      return null;
    }

    const expiryDate = new Date(uiState.expiresAt);
    if (Number.isNaN(expiryDate.getTime())) {
      return null;
    }

    return expiryDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [uiState]);

  const total = booking?.pricing.amount ?? 0;
  const bookingIsPayable = booking?.status === "PENDING_PAYMENT";
  const canSubmit =
    !checkoutMutation.isPending &&
    !is3dsProcessing &&
    bookingIsPayable;

  const handleBack = () => {
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  const handlePay = async () => {
    if (!bookingId) {
      return;
    }

    setErrorMessage(null);

    try {
      let paymentMethodId: string | undefined;

      if (selectedMethod === "CARD" && !selectedSavedMethodId) {
        if (!cardFormRef.current) {
          setErrorMessage("Card form is not ready. Please try again.");
          return;
        }
        paymentMethodId = await cardFormRef.current.createPaymentMethod();
      }

      const response = await checkoutMutation.mutateAsync({
        method: selectedMethod,
        savedPaymentMethodId:
          selectedMethod === "CARD" && selectedSavedMethodId
            ? selectedSavedMethodId
            : undefined,
        paymentMethodId,
        savePaymentMethod:
          selectedMethod === "CARD" && !selectedSavedMethodId && saveCard ? true : undefined,
      });

      if (response.status === "CONFIRMED") {
        setUiState({
          kind: "confirmed",
          paymentTransactionId: response.paymentTransactionId,
        });
        return;
      }

      // 3DS authentication required for card payments
      if (
        response.payment.method === "CARD" &&
        response.payment.nextAction &&
        response.payment.clientSecret &&
        stripe
      ) {
        setIs3dsProcessing(true);
        try {
          const { error } = await stripe.handleCardAction(response.payment.clientSecret);
          if (error) {
            throw new Error(error.message ?? "Card authentication failed. Please try again.");
          }
        } finally {
          setIs3dsProcessing(false);
        }
      }

      setUiState({
        kind: "pending",
        method: response.payment.method,
        topupAmount: response.topupAmount,
        shortfall: response.shortfall,
        qrCodeUrl: response.payment.qrCodeUrl,
        expiresAt: response.payment.expiresAt,
      });
    } catch (error) {
      setUiState({ kind: "idle" });
      setIs3dsProcessing(false);
      setErrorMessage(
        getErrorMessage(error, "Unable to process checkout right now. Please try again."),
      );
    }
  };

  const renderPrimaryContent = () => {
    if (isLoading) {
      return (
        <div className="flex min-h-[320px] items-center justify-center">
          <Typography variant="body-3" color="neutral-500">
            Loading checkout...
          </Typography>
        </div>
      );
    }

    if (isError || !booking) {
      return (
        <div className="flex min-h-[320px] flex-col justify-center gap-4">
          <Typography variant="headline-5" color="neutral-900">
            Booking not found
          </Typography>
          <Typography variant="body-3" color="neutral-500">
            This checkout link is unavailable. Go back and try booking the lesson again.
          </Typography>
          <div>
            <BaseButton onClick={() => router.push(`/${locale}/student/schedule`)}>
              Back to schedule
            </BaseButton>
          </div>
        </div>
      );
    }

    if (uiState.kind === "confirmed" || booking.status === "CONFIRMED") {
      return (
        <div className="flex flex-col gap-5 rounded-2xl border border-neutral-50 bg-white p-5">
          <Typography variant="headline-5" color="neutral-900">
            Payment confirmed
          </Typography>
          <Typography variant="body-3" color="neutral-500">
            Your lesson is booked and ready. You can find it in your schedule.
          </Typography>
          <BaseButton onClick={() => router.push(`/${locale}/student/schedule`)}>
            Go to schedule
          </BaseButton>
        </div>
      );
    }

    if (booking.status === "EXPIRED") {
      return (
        <div className="flex flex-col gap-5 rounded-2xl border border-neutral-50 bg-white p-5">
          <Typography variant="headline-5" color="neutral-900">
            Checkout expired
          </Typography>
          <Typography variant="body-3" color="neutral-500">
            This payment window has expired, so this booking can no longer be paid from this page.
          </Typography>
          <BaseButton onClick={() => router.push(`/${locale}/student/schedule`)}>
            Back to schedule
          </BaseButton>
        </div>
      );
    }

    if (booking.status === "CANCELLED") {
      return (
        <div className="flex flex-col gap-5 rounded-2xl border border-neutral-50 bg-white p-5">
          <Typography variant="headline-5" color="neutral-900">
            Booking cancelled
          </Typography>
          <Typography variant="body-3" color="neutral-500">
            This booking is no longer active, so payment is unavailable.
          </Typography>
          <BaseButton onClick={() => router.push(`/${locale}/student/schedule`)}>
            Back to schedule
          </BaseButton>
        </div>
      );
    }

    const showNewCardForm = selectedMethod === "CARD" && !selectedSavedMethodId;

    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Typography variant="headline-5" color="neutral-900">
            Complete your payment
          </Typography>
          <Typography variant="body-3" color="neutral-500">
            Choose a payment method to confirm this lesson.
          </Typography>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-50 bg-white p-4 lg:p-5">
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onMethodChange={(method) => {
              setSelectedMethod(method);
              setUiState({ kind: "idle" });
              setErrorMessage(null);
            }}
            showCardForm={false}
          />

          {selectedMethod === "CARD" ? (
            <div className="flex flex-col gap-3">
              {savedMethods.length > 0 ? (
                <SavedPaymentMethods
                  methods={savedMethods}
                  selectedMethodId={selectedSavedMethodId}
                  onSelectMethod={setSelectedSavedMethodId}
                />
              ) : null}
              {showNewCardForm ? (
                <div className="flex flex-col gap-2">
                  <CardForm ref={cardFormRef} />
                  <SaveThisMethodSelect
                    checked={saveCard}
                    onCheckedChange={setSaveCard}
                    disabled={isLoadingPaymentMethods}
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {uiState.kind === "pending" && uiState.method === "PROMPTPAY" ? (
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-100 bg-neutral-25 p-4">
              <Typography variant="title-4" color="neutral-900">
                Scan PromptPay QR
              </Typography>
              <Typography variant="body-3" color="neutral-500">
                Top up {formatCurrency(uiState.topupAmount)} to cover the remaining{" "}
                {formatCurrency(uiState.shortfall)} for this lesson.
              </Typography>
              {uiState.qrCodeUrl ? (
                <img
                  src={uiState.qrCodeUrl}
                  alt="PromptPay QR code"
                  className="h-56 w-56 rounded-xl bg-white object-contain p-2"
                />
              ) : (
                <Typography variant="body-3" color="neutral-500">
                  QR code is not available yet. Try the payment again.
                </Typography>
              )}
              {expiresAtText ? (
                <Typography variant="body-4" color="neutral-400">
                  QR expires at {expiresAtText}
                </Typography>
              ) : null}
              <Typography variant="body-4" color="neutral-400">
                This page will update automatically after the payment is confirmed.
              </Typography>
            </div>
          ) : null}

          {is3dsProcessing ? (
            <div className="rounded-2xl border border-neutral-100 bg-neutral-25 p-4">
              <Typography variant="body-3" color="neutral-500">
                Complete the authentication step in the popup to confirm your card payment.
              </Typography>
            </div>
          ) : null}

          {!is3dsProcessing && uiState.kind === "pending" && uiState.method === "CARD" ? (
            <div className="rounded-2xl border border-neutral-100 bg-neutral-25 p-4">
              <Typography variant="body-3" color="neutral-500">
                Card payment is being processed. This page will update automatically once it
                settles.
              </Typography>
            </div>
          ) : null}

          {!bookingIsPayable ? (
            <div className="rounded-2xl border border-neutral-100 bg-neutral-25 p-4">
              <Typography variant="body-3" color="neutral-500">
                This booking is no longer waiting for payment.
              </Typography>
            </div>
          ) : null}

          <PaymentConfirmationNotice totalAmount={total} />

          <BaseButton onClick={handlePay} disabled={!canSubmit}>
            {checkoutMutation.isPending || is3dsProcessing
              ? "Processing payment..."
              : `Pay with ${PAYMENT_METHODS[selectedMethod]}`}
          </BaseButton>
        </div>
      </div>
    );
  };

  return (
    <PageRoot className="bg-white">
      {errorMessage ? (
        <TopToast message={errorMessage} onClose={() => setErrorMessage(null)} />
      ) : null}

      <DesktopOnly>
        <Navbar variant="student_dashboard" />
      </DesktopOnly>

      <MobileOnly className="px-4">
        <PageNavigationHeader
          title="Checkout"
          variant="mobile"
          onClose={handleClose}
        />
      </MobileOnly>

      <DesktopOnly className="px-4 lg:px-20 lg:pt-8">
        <PageNavigationHeader
          title="Checkout"
          variant="desktop"
          onBack={handleBack}
        />
      </DesktopOnly>

      <PageContainer className="flex-1">
        <TwoColumnLayout>
          <PrimaryPanel className="px-0 lg:px-0 lg:py-6 lg:border-none">
            {renderPrimaryContent()}
          </PrimaryPanel>

          <SummaryPanel className="rounded-2xl border border-neutral-50 bg-white">
            <BookingSummary
              variant="checkout"
              tutorName={booking?.tutor?.name ?? "Tutor"}
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl={booking?.tutor?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor"}
              subject="Lesson"
              rating={booking?.tutor?.rating ?? 0}
              studentsCount={booking?.tutor?.studentCount ?? 0}
              lessonsCount={booking?.tutor?.lessonCount ?? 0}
              cancellationDeadline={cancellationDeadline}
              lessonName="Booked lesson"
              date={lessonDate}
              startTime={startTime}
              endTime={endTime}
              timezone="Asia/Bangkok"
              lessonPrice={total}
              processingFee={0}
              total={total}
            />
          </SummaryPanel>
        </TwoColumnLayout>
      </PageContainer>
    </PageRoot>
  );
}
