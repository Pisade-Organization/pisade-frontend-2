import Typography from "@/components/base/Typography"

interface TransactionDateCellProps {
  date: string;
}

function formatDate(dateString: string): string {
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return dateString; // fallback if invalid
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return dateObj.toLocaleDateString(undefined, options);
}

export default function TransactionDateCell({ date }: TransactionDateCellProps) {
  return (
    <Typography variant="body-3" color="neutral-500">
      {formatDate(date)}
    </Typography>
  );
}

