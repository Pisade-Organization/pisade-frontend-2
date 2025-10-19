import Card from "./Card"
export default function StatsOverview({
    stats
}: {
    stats: {
        label: "Completed Lessons" | "Scheduled Lessons" | "Skipped Lessons" | "Goal"
        value: number
    }[]
}) {
    return (
        <div className="flex justify-center items-center gap-5">
            {
                stats.map((value, index) => (
                    <Card 
                        key={index}
                        label={value.label}
                        value={value.value}
                    />
                ))
            }

        </div>
    )
}