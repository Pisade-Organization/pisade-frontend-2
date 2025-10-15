

export default function TutorName({
    fullName
}: {
    fullName: string
}) {
    return (
        <h1 className="text-title-1 lg:text-headline-4 text-neutral-900">
            { fullName }
        </h1>
    )
}