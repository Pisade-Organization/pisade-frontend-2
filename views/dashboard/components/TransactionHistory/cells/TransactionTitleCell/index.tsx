import Typography from "@/components/base/Typography"

interface TransactionTitleCellProps {
  title: string;
}

export default function TransactionTitleCell({ title }: TransactionTitleCellProps) {
  return (
    <Typography variant="body-3" color="neutral-900">
      {title}
    </Typography>
  )
}