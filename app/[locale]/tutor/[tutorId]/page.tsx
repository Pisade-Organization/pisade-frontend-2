import TutorDetailPage from "@/views/tutor-detail/pages/page"

export default function TutorDetail({
    params,
  }: {
    params: Promise<{ tutorId: string }>
  }) {
    return <TutorDetailPage params={params} />
  }