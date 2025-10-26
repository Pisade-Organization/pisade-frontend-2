import { Book2Icon, ClockIcon, Folder2Icon, People2Icon, Rocket2Icon, TaskIcon, UploadIcon, MoneyIcon } from "@/components/icons"


const data: any = {
  1: <TaskIcon width={50} height={50} className="mr-2" />,
  2: <People2Icon width={50} height={50} className="mr-3" />,
  3: <Folder2Icon width={50} height={50} className="mr-2" />,
  4: <Book2Icon width={50} height={50} className="mr-2" />,
  5: <Rocket2Icon width={50} height={50} className="mb-3" />,
  6: <UploadIcon width={50} height={50} className="mr-2" />,
  7: <ClockIcon width={50} height={50} className="mr-2" />,
  8: <MoneyIcon width={50} height={50} className="mr-1 w-24 h-24" />
}
export default function Icon({
  step
}: {
  step: number
}) {
  return (
    <div className="flex justify-center items-center w-[84px] h-[84px] rounded-full bg-white">
      {data[step]}
    </div>
  )
}