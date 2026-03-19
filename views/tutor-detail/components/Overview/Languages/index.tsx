import Typography from "@/components/base/Typography"
import { formatLanguageLabels } from "@/lib/language"
export default function Languages({
    languages
}: {
    languages: string[]
}) {
    const formattedLanguages = formatLanguageLabels(languages)

    return (
        <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <Typography variant="title-1" color="neutral-900">Languages</Typography>
            <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">{formattedLanguages.join(', ')}</Typography>
        </div>
    )
}
