"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import HeroBanner from "../components/HeroBanner"
import TutorProfileCard from "../components/TutorProfileCard"
import ProfileTabs from "../components/ProfileTabs"
import Overview from "../components/Overview"
import Footer from "@/components/footer/Footer"
import BackBtn from "../components/BackBtn"
import Review from "../components/Reviews"
import AvailabilityCalendar from "../components/AvailabilityCalendar"
import { TutorDetailData } from "@/services/tutor/types"
import { fetchTutorDetailData } from "@/services/tutor"
import Loading from "@/components/Loading"
import BaseButton from "@/components/base/BaseButton"
import { MessageCircle } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function TutorDetailPage({
    params
}: {
    params: Promise<{ tutorId: string }>
}) {
    
    const [currentTab, setCurrentTab] = useState<"Overview" | "Availability calendar" | "Reviews & ratings" >('Overview')
    const [tutorData, setTutorData] = useState<TutorDetailData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const locale = pathname.split("/")[1] || "en"

    const handleBookLessonClick = () => {
        if (!tutorData) {
            return
        }

        router.push(`/${locale}/bookings/${tutorData.id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { tutorId } = await params
                const data = await fetchTutorDetailData(tutorId)
                
                if (!data) {
                    setError('Tutor not found')
                } else {
                    setTutorData(data)
                }
            } catch (err) {
                setError('Failed to load tutor data')
                console.error('Error fetching tutor data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [params])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#EFEFEF]">
                <Loading />
            </div>
        )
    }

    if (error || !tutorData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Tutor Not Found</h1>
                    <p className="text-gray-600">The tutor you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center">
            <Navbar variant="tutor_detail" />
            {/* MOBILE */}
            <div className="w-full lg:hidden min-h-screen relative flex flex-col justify-start gap-5 lg:gap-4 pt-20 pb-28">

                <div className="absolute w-full h-[252px] top-0 left-0 z-10">
                    <HeroBanner/>
                </div>

                <div className="relative z-10 px-4">
                    <TutorProfileCard tutorData={tutorData}></TutorProfileCard>
                </div>

                <ProfileTabs 
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />

                <div className="w-full px-4">
                    {currentTab === 'Overview' && (
                        <Overview
                            videoThumbnailUrl={tutorData.videoThumbnailUrl}
                            videoUrl={tutorData.videoUrl}
                            fullName={tutorData.fullName}
                            tutorRanking={tutorData.tutorRanking}
                            hoursTaught={tutorData.lessonsCount}
                            about={tutorData.bio}
                            selfIntroduction={tutorData.selfIntroduction}
                            onSeeAvailabilityCalendar={() => setCurrentTab("Availability calendar")}
                            languages={tutorData.languages}
                            avgRating={tutorData.avgRating}
                            studentReviewsCount={tutorData.studentsCount}
                            reviews={tutorData.reviews.map(review => ({
                                avatarUrl: review.avatarUrl,
                                fullName: review.fullName,
                                review: review.review
                            }))}
                            specialties={tutorData.specialties}
                        />
                    )}

                    {currentTab === "Availability calendar" && (
                        <AvailabilityCalendar availability={tutorData.availability} />
                    )}

                    {currentTab === "Reviews & ratings" && (
                        <Review 
                            reviews={tutorData.reviews}
                            summary={tutorData.summary}
                        />
                    )}
                </div>

                <div className="sticky bottom-0 z-40 w-full bg-white px-4 py-3 shadow-[0px_1px_4px_0px_#0000001A] lg:hidden">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            aria-label="Chat with tutor"
                            className="flex items-center justify-center rounded-[8px] border border-deep-royal-indigo-100 p-[10px]"
                        >
                            <MessageCircle className="h-6 w-6 text-deep-royal-indigo-500" />
                        </button>

                        <BaseButton className="flex-1" onClick={handleBookLessonClick}>
                            Book lesson
                        </BaseButton>
                    </div>
                </div>
            </div>
            
            {/* DESKTOP */}
            <div className="w-full max-w-[1440px] hidden relative lg:flex justify-center items-start gap-[29px] px-20">

                <div className="absolute w-full h-[252px] top-0 left-0 z-10">
                    <HeroBanner/>
                </div>

                <div className="pt-6 relative z-20 flex flex-col justify-center items-start gap-2">

                    <BackBtn />

                    <TutorProfileCard tutorData={tutorData}></TutorProfileCard>

                </div>

                <div className="w-full flex flex-col justify-center items-start gap-7 pt-72">

                    <ProfileTabs 
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />

                    <div className="w-full">
                        {currentTab === 'Overview' && (
                            <Overview
                                videoThumbnailUrl={tutorData.videoThumbnailUrl}
                                videoUrl={tutorData.videoUrl}
                                fullName={tutorData.fullName}
                                tutorRanking={tutorData.tutorRanking}
                                hoursTaught={tutorData.lessonsCount}
                                about={tutorData.bio}
                                selfIntroduction={tutorData.selfIntroduction}
                                onSeeAvailabilityCalendar={() => setCurrentTab("Availability calendar")}
                                languages={tutorData.languages}
                                avgRating={tutorData.avgRating}
                                studentReviewsCount={tutorData.studentsCount}
                                reviews={tutorData.reviews.map(review => ({
                                    avatarUrl: review.avatarUrl,
                                    fullName: review.fullName,
                                    review: review.review
                                }))}
                                specialties={tutorData.specialties}
                            />)}

                        {currentTab === "Availability calendar" && (
                            <AvailabilityCalendar availability={tutorData.availability} />
                        )}

                        {currentTab === "Reviews & ratings" && (
                            <Review 
                                reviews={tutorData.reviews}
                                summary={tutorData.summary}
                        />
                    )}
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    )
}
