
export default function SpecialtyBadge({
    specialty
}: {
    specialty: string
}) {
    return (
        <div className="py-1 px-2 bg-deep-royal-indigo-100 text-deep-royal-indigo-500 text-body-3 lg:text-body-2">
            {specialty}
        </div>
    )
}