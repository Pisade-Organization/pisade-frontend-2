import Typography from "@/components/base/Typography"

export default function HoursTaught({
    hoursTaught
}: {
    hoursTaught: number
}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Typography 
                variant={{ base: "body-3", lg: "body-4" }}
                color="neutral-600"
            >
                Hours taught
            </Typography>
            <Typography 
                variant={{ base: "title-1", lg: "headline-5" }}
                color="electric-violet-600"
            >
                { hoursTaught }
            </Typography>
        </div>
    )
}