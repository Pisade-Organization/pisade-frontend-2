import Typography from "@/components/base/Typography";

interface DateOverlayI {
  date: Date;
}

export default function DateOverlay({ date }: DateOverlayI) {
  const monthOptions: Intl.DateTimeFormatOptions = { month: 'short' };
  const month = date.toLocaleDateString(undefined, monthOptions).toUpperCase();
  const day = date.getDate();

  return (
    <div 
      className="absolute bottom-2 left-2 lg:bottom-2 lg:right-2 w-[37px] h-[42px] lg:w-[57px] lg:h-[66px] flex flex-col items-center justify-center py-1 lg:py-2 px-2 lg:px-4 rounded-lg"
      style={{
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.64) 100%)',
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-400">
        {month}
      </Typography>
      <Typography variant={{ base: "title-4", lg: "headline-4" }} color="neutral-900">
        {day}
      </Typography>
    </div>
  )
}