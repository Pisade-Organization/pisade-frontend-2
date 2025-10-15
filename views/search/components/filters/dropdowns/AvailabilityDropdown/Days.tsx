export default function Days() {
    return (
        <div className="flex flex-col justify-center items-start gap-y-2 p-4">

            <div className="text-neutral-900 text-label-2">
                Days 
            </div>

            <div className="grid grid-cols-7 grid-rows-1 gap-1">

                
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Mon</div>
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Tue</div>
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Wed</div>
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Thu</div>
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Fri</div>
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Sat</div>
                <div className="border border-neutral-50 rounded-[12px] p-3 text-label-3 text-neutral-400">Sun</div>

            </div>

        </div>
    )
}