import Typography from "@/components/base/Typography"

interface CancellationNoticeProps {
  deadline: Date;
}

function formatDeadline(date: Date): string {
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  };
  const dateOptions: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric' 
  };
  
  const time = date.toLocaleTimeString(undefined, timeOptions);
  const dateStr = date.toLocaleDateString(undefined, dateOptions);
  
  return `${time} on ${dateStr}`;
}

export default function CancellationNotice({ deadline }: CancellationNoticeProps) {
  return (
    <div className="w-screen lg:w-[calc(100%+3rem)] py-2 px-4 lg:px-6 bg-electric-violet-25 text-start lg:text-center -mx-4 lg:-mx-6">
      <Typography variant={{ base: "label-4" }} color="deep-royal-indigo-500" as="span">
        Cancel or reschedule for free until{" "}
      </Typography>
      <Typography variant={{ base: "body-4" }} color="deep-royal-indigo-500" as="span">
        {formatDeadline(deadline)}
      </Typography>
    </div>
  )
}
