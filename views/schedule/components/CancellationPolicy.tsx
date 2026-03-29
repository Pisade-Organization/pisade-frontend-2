import Typography from "@/components/base/Typography"

export default function CancellationPolicy() {
  return (
    <div className="border border-neutral-50 bg-white p-4 flex flex-col gap-2 rounded-b-xl">
      <Typography variant="title-2" color="neutral-900">Booking Rules</Typography>
      <Typography variant="body-3" color="neutral-600">
        Lessons must be booked at least 2 hours before start time.
      </Typography>
      <Typography variant="body-3" color="neutral-600">
        PromptPay and card bookings stay reserved for 15 minutes while payment is pending.
      </Typography>
    </div>
  )
}
