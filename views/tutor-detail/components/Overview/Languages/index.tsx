import Typography from "@/components/base/Typography"
export default function Languages({
    languages
}: {
    languages: string[]
}) {
    return (
        <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <Typography variant="title-1" color="neutral-900">Languages</Typography>
            <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">{languages.join(', ')}</Typography>
        </div>
    )
}