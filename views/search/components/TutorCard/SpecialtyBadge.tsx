

export default function SpecialtyBadge({ specialty }: { specialty: string }) {
    return (
        <div className="rounded-sm bg-[#F8F3FF] text-deep-royal-indigo-500 text-body-3 lg:text-body-2 text-center py-1 px-2 whitespace-nowrap shrink-0">
            {specialty}
        </div>
    )
}