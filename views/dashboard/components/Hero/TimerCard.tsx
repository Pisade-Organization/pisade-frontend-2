// TODO: Fix the bg-color and border color
export default function TimerCard({
    value,
    label
}: {
    value: string
    label: "Hours" | "Minutes" | "Secs"
}) {
    return (
        <div className="flex flex-col justify-between items-center pt-[10px] pb-3 px-4 glass-card">

            <h1 className="text-headline-2 text-white">
                {value}
            </h1>

            <h2 className="text-body-4 text-white">
                {label}
            </h2>

        </div>
    )
}