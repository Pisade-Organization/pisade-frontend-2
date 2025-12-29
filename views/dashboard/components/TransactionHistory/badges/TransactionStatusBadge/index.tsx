import Typography from "@/components/base/Typography"
import { TransactionStatus } from "./types"
import { STATUS_MAP } from "./config"
import clsx from "clsx"

interface TransactionStatusBadgeProps {
  status: TransactionStatus
}

export default function TransactionStatusBadge({
  status
}: TransactionStatusBadgeProps) {
  const statusConfig = STATUS_MAP[status]
  
  return (
    <div>
      <Typography 
        variant="body-3" 
        color={statusConfig.color as any}
      >
        {statusConfig.label}
      </Typography>
    </div>
  )
}