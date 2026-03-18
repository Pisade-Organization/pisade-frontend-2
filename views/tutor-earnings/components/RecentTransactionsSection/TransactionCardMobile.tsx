import Typography from "@/components/base/Typography"
import type { EarningsTransaction } from "@/views/tutor-earnings/types"

function getStatusColor(status: string) {
  if (status === "In-Progress") return "blue-normal"
  if (status === "Cancel") return "neutral-300"
  if (status === "Completed") return "green-normal"
  if (status === "Processing") return "orange-normal"
  return "neutral-500"
}

function formatDateLabel(value: string) {
  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  })
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Typography variant="body-3" color="neutral-300">{label}</Typography>
      <Typography variant="label-3" color="neutral-500">{value}</Typography>
    </div>
  )
}

export default function TransactionCardMobile({ row }: { row: EarningsTransaction }) {
  return (
    <article className="rounded-[12px] border border-neutral-25 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <Typography variant="body-3" color="neutral-500">{row.id}</Typography>
        <Typography variant="label-3" color="neutral-500">{formatDateLabel(row.dateLabel)}</Typography>
      </div>

      <div className="my-3 border-b border-neutral-25" />

      <Typography variant="label-3" color="neutral-900">{row.transaction}</Typography>

      <div className="mt-3 flex flex-col gap-2">
        <InfoRow label="Amount" value={`฿${row.amount}`} />
        <InfoRow label="Payment method" value={row.paymentMethod} />
        <div className="flex items-center justify-between gap-3">
          <Typography variant="body-3" color="neutral-300">Status</Typography>
          <Typography variant="label-3" color={getStatusColor(row.status)}>{row.status}</Typography>
        </div>
      </div>
    </article>
  )
}
