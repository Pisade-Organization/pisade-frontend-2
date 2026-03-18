import type { TransactionRowDesktopProps } from "./types"
import Typography from "@/components/base/Typography"

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

export default function TransactionRowDesktop({ row }: TransactionRowDesktopProps) {
  return (
    <tr className="border-b border-neutral-25 last:border-b-0">
      <td className="px-5 py-4">
        <Typography variant="body-3" color="neutral-500">{row.id}</Typography>
      </td>
      <td className="px-5 py-4">
        <Typography variant="label-3" color="neutral-900">{row.transaction}</Typography>
      </td>
      <td className="px-5 py-4 text-left">
        <Typography variant="label-3" color="neutral-500">฿{row.amount}</Typography>
      </td>
      <td className="px-5 py-4">
        <Typography variant="label-3" color="neutral-500">{row.paymentMethod}</Typography>
      </td>
      <td className="px-5 py-4">
        <Typography variant="label-3" color="neutral-500">{formatDateLabel(row.dateLabel)}</Typography>
      </td>
      <td className="px-5 py-4">
        <Typography variant="label-3" color={getStatusColor(row.status)}>{row.status}</Typography>
      </td>
    </tr>
  )
}
