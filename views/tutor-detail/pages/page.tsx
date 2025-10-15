import TutorProfileCard from "../components/TutorProfileCard"

export default function TutorDetailPage({
    tutorId
}: {
    tutorId: string
}) {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <TutorProfileCard></TutorProfileCard>

        </div>
    )
}