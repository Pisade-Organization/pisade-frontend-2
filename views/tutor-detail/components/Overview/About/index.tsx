import AboutBody from "./AboutBody"
import Typography from "@/components/base/Typography"
export default function About({
    about
}: {
    about: string
}) {
    return (
        <div className="flex flex-col justify-center items-start gap-y-3">
            <Typography variant={{ base: "title-1", lg: "body-2" }} color="neutral-900">
                About me
            </Typography>

            <AboutBody about={about} />
        </div>
    )
}