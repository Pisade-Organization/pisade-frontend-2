import TutorDetailPage from "@/views/tutor-detail/pages/page"
export default async function TutorDetail({
    params,
  }: {
    params: Promise<{ tutorId: string }>
  }) {
    const { tutorId } = await params
    return (
        <TutorDetailPage tutorId={tutorId} />
    )
  }