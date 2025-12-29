import Typography from "@/components/base/Typography"

interface TransactionIdCellProps {
  id: string;
}

export default function TransactionIdCell({ id }: TransactionIdCellProps) {
  return (
    <Typography variant="body-3" color="neutral-500">
      ID#{id}
    </Typography>
  )
}