import { Book2Icon, ClockIcon, Folder2Icon, People2Icon, Rocket2Icon, TaskIcon, UploadIcon, MoneyIcon, SecureIcon } from "@/components/icons"

const data: any = {
  1: <TaskIcon width={50} height={50} className="mr-2" />,
  2: <People2Icon width={50} height={50} className="mr-3" />,
  3: <Folder2Icon width={50} height={50} className="mr-2" />,
  4: <Book2Icon width={50} height={50} className="mr-2" />,
  5: <Rocket2Icon width={50} height={50} className="mb-3" />,
  6: <UploadIcon width={50} height={50} className="mr-2" />,
  7: <ClockIcon width={50} height={50} className="mr-2" />,
  8: <MoneyIcon width={50} height={50} className="mr-1 w-24 h-24" />,
  9: <SecureIcon width={50} height={50} className="mr-1" />,
}
export default function Icon({
  step
}: {
  step: number
}) {
  return (
    <div className="flex justify-center items-center w-[68px] h-[68px] lg:w-[84px] lg:h-[84px] min-w-[68px] min-h-[68px] lg:min-w-[84px] lg:min-h-[84px] flex-shrink-0 aspect-square rounded-full bg-white">
      {data[step]}
    </div>
  )
}