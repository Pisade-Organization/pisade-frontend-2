import Typography from "@/components/base/Typography"

interface TransactionHistoryHeaderProps {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export default function TransactionHistoryHeader({ 
  title, 
  actionLabel, 
  onActionClick 
}: TransactionHistoryHeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <Typography variant={{ base: "title-1", lg: "headline-4"}} color="neutral-900">
        {title}
      </Typography>

      {actionLabel && (
        <button 
          onClick={onActionClick}
        >
          <Typography variant="label-2" color="electric-violet-600" underline>
            {actionLabel}
          </Typography>
        </button>
      )}
    </div>
  )
}