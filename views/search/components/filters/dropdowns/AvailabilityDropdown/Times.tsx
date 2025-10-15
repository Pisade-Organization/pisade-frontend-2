

export default function Times() {
    return (
        <div className="flex flex-col justify-center items-start p-4 gap-y-4 lg:border-b lg:border-neutral-50">
            
            {/* TITLE + DAYTIME */}
            <div className="flex flex-col justify-center items-start gap-y-1">
                
                {/* TITLE */}
                <div className="text-neutral-900 text-label-2">
                    Times
                </div>

                {/* DAYTIME */}
                <div className="flex flex-col justify-center items-start gap-y-2">
                    <div className="text-neutral-300 text-body-3">
                        Daytime
                    </div>

                    {/* SLOTS */}
                    <div className="grid grid-cols-3 grid-rows-2 gap-1">
                        <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">3:00 - 6:00</div>
                        <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">6:00 - 9:00</div>
                        <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">9:00 - 12:00</div>
                        <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">13:00 - 15:00</div>
                        <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">15:00 - 18:00</div>
                    </div>
                </div>
            </div>

            {/* EVENING & NIGHT */}
            <div className="flex-col justify-center items-start gap-y-2">

                <div className="text-neutral-300 text-body-3">
                    Evening & Night
                </div>

                <div className="flex justify-center items-center gap-x-1">
                    <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">18:00 - 21:00</div>
                    <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">21:00 - 24:00</div>
                    <div className="text-label-3 text-neutral-400 border border-neutral-50 p-3 rounded-[12px]">00:00 - 3:00</div>
                </div>

            </div>

        </div>
    )
}