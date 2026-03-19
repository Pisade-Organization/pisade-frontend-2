import AboutBody from "./AboutBody"
import Typography from "@/components/base/Typography"
export default function About({
    about,
    selfIntroduction,
}: {
    about: string
    selfIntroduction?: {
        introduceYourself: string
        teachingExperience: string
        motivatePotentialStudents: string
        catchyHeadline: string
    }
}) {
    const introText = selfIntroduction?.introduceYourself || about
    const teachingExperience = selfIntroduction?.teachingExperience || ""
    const motivatePotentialStudents = selfIntroduction?.motivatePotentialStudents || ""
    const catchyHeadline = selfIntroduction?.catchyHeadline || ""

    return (
        <div className="w-full text-left flex flex-col justify-center items-start gap-y-3">
            <Typography variant={{ base: "title-1", lg: "body-2" }} color="neutral-900">
                About me
            </Typography>

            {catchyHeadline && (
                <Typography variant={{ base: "body-2", lg: "title-3" }} color="neutral-900" className="italic">
                    {`"${catchyHeadline}"`}
                </Typography>
            )}

            {introText && <AboutBody text={introText} />}

            {teachingExperience && (
                <div className="w-full flex flex-col justify-center items-start gap-y-2">
                    <Typography variant={{ base: "body-2", lg: "title-3" }} color="neutral-900">
                        Teaching experience
                    </Typography>
                    <AboutBody text={teachingExperience} />
                </div>
            )}

            {motivatePotentialStudents && (
                <div className="w-full flex flex-col justify-center items-start gap-y-2">
                    <Typography variant={{ base: "body-2", lg: "title-3" }} color="neutral-900">
                        Why learn with me
                    </Typography>
                    <AboutBody text={motivatePotentialStudents} />
                </div>
            )}
        </div>
    )
}
