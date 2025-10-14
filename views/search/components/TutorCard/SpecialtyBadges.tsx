import SpecialtyBadge from "./SpecialtyBadge"

export default function SpecialtyBadges({
    specialties
}: {
    specialties: string[]
}) {
    return (
        <div className="w-full flex flex-wrap justify-start items-center gap-x-2 gap-y-2">
        {specialties.length <= 3 ? (
            specialties.map((specialty, idx) => (
                <SpecialtyBadge key={idx} specialty={specialty} />
            ))
        ) : (
            <>
                {specialties.slice(0, 3).map((specialty, idx) => (
                    <SpecialtyBadge key={idx} specialty={specialty} />
                ))}
                <SpecialtyBadge specialty={`+${specialties.length - 3}`} />
            </>
        )}
        </div>
    )
}