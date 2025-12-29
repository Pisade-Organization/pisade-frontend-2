import Typography from "@/components/base/Typography"

interface TransactionAmountCellProps {
  amount: string;
}

export default function TransactionAmountCell({ amount }: TransactionAmountCellProps) {
  return (
    <Typography variant="body-3" color="neutral-500">
      {amount}฿
    </Typography>
  )
}
