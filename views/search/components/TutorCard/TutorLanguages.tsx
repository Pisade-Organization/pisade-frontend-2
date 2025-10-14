import { Languages } from "lucide-react"
export default function TutorLanguages({
    languages
}: {
    languages: string[]
}) {
    return (
        <div className="flex justify-start items-center gap-x-2">

            <div className="hidden lg:block text-body-2 text-neutral-300">
                Languages: 
            </div>

            <div className="block lg:hidden">
                <Languages size={16} className="text-neutral-300" />
            </div>

            <div className="text-body-2 text-neutral-900">
            {languages.join(", ")}
            </div>

        </div>
    )
}