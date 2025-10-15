import SpecialtyBadge from "./SpecialtyBadge"

export default function Specialties({
    specialties
}: {
    specialties: string[]
}) {
    return (
        <div className="border border-neutral-50 rounded-[15px] p-6 gap-y-4 flex flex-col justify-center items-start">

            <div className="text-neutral-900 text-title-1">
                Specialties
            </div>

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

        </div>
    )
}