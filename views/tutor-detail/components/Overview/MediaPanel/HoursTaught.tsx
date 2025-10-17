

export default function HoursTaught({
    hoursTaught
}: {
    hoursTaught: number
}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="text-body-3 lg:text-body-4 text-neutral-600">
                Hours taught
            </div>

            <div className="text-title-1 lg:text-headline-5 text-electric-violet-600">
                { hoursTaught }
            </div>
        </div>
    )
}