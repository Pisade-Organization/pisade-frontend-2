import AboutBody from "./AboutBody"
export default function About({
    about
}: {
    about: string
}) {
    return (
        <div className="flex flex-col justify-center items-start gap-y-3">
            <div className="text-title-1 lg:text-body-2 text-neutral-900">
                About me
            </div>

            <AboutBody about={about} />
        </div>
    )
}