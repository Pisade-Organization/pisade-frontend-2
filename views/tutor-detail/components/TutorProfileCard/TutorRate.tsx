

export default function TutorRate({ baseRate }: { baseRate: number }) {
    return (
        <div className="flex justify-center items-center gap-x-2">

            <div className="text-neutral-900 text-title-1 lg:text-headline-4">
                ฿{baseRate}
            </div>

            <div className="text-neutral-600 text-body-3 lg:text-body-2">
                /50m
            </div>
        </div>
    )
}