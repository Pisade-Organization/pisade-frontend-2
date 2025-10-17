
export default function Languages({
    languages
}: {
    languages: string[]
}) {
    return (
        <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <div className="text-title-1 text-neutral-900">Languages</div>
            <div className="text-body-3 lg:text-body-2 text-neutral-500">{languages.join(', ')}</div>
        </div>
    )
}