import Typography from "@/components/base/Typography"
import { Check } from "lucide-react"

export default function Commission() {

  return (
    <div className="w-full
    bg-white rounded-b-[20px] 
    flex flex-col justify-center items-start 
    pt-4 pb-5 lg:py-5 px-4 lg:px-8 gap-5 lg:gap-4
    ">

      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Pisade commission
      </Typography>

      <div className="w-full border-t border-electric-violet-50"/>

      <div className="w-full flex flex-col lg:flex-row  gap-4 lg:gap-6">

        {/* LEFT */}
        <div className="w-full flex flex-col gap-4">
          <Typography variant="body-3" color="neutral-500">
            We use the funds for getting more students and forconstant improvements of our learning platform.
          </Typography>

          <div className="flex flex-col gap-1">

            <div className="inline-flex gap-2">
              <Check size={18} className="text-green-normal"/>
              <Typography variant="body-3" color="neutral-500">
                For every trial lesson with a new students <Typography variant="label-3" color="neutral-800" as="span">Pisade's commission is 100%</Typography>
              </Typography>
            </div>

            <div className="inline-flex gap-2">
              <Check size={18} className="text-green-normal"/>
              <Typography variant="body-3" color="neutral-500">
                For all the subsequent lessons, <Typography variant="label-3" color="neutral-800" as="span">Pisade charges percentages (18%-33%)</Typography> of the hourly rate
              </Typography>
            </div>

            <div className="inline-flex gap-2">
              <Check size={18} className="text-green-normal"/>
              <Typography variant="body-3" color="neutral-500">
                The more hours you teach, the lower your rate of commission will be
              </Typography>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full flex flex-col justify-between py-3 px-6 rounded-[8px] bg-electric-violet-25">
          <div className="flex justify-between items-center">
            <Typography variant="body-4" color="deep-royal-indigo-200">Completed hours</Typography>
            <Typography variant="body-4" color="deep-royal-indigo-200">Commission rate</Typography>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="deep-royal-indigo-500">0 - 20 hours</Typography>
              <Typography variant="title-2" color="deep-royal-indigo-500">33%</Typography>
            </div>

            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="deep-royal-indigo-500">21 - 50 hours</Typography>
              <Typography variant="title-2" color="deep-royal-indigo-500">28%</Typography>
            </div>
            
            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="deep-royal-indigo-500">51 - 200 hours</Typography>
              <Typography variant="title-2" color="deep-royal-indigo-500">25%</Typography>
            </div>

            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="deep-royal-indigo-500">201 - 400 hours</Typography>
              <Typography variant="title-2" color="deep-royal-indigo-500">22%</Typography>
            </div>

            <div className="flex justify-between items-center">
              <Typography variant="body-3" color="deep-royal-indigo-500">400+ hours</Typography>
              <Typography variant="title-2" color="deep-royal-indigo-500">18%</Typography>
            </div>

          </div>

        </div>

      </div>
      
    </div>
  )
}