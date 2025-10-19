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
import { TutorDetailData } from "@/services/tutor/types"
import { fetchTutorDetailData } from "@/services/tutor"

export default function TutorDetailPage({
    params
}: {
    params: Promise<{ tutorId: string }>
}) {
    
    const [currentTab, setCurrentTab] = useState<"Overview" | "Availability calendar" | "Reviews & ratings" >('Overview')
    const [tutorData, setTutorData] = useState<TutorDetailData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-electric-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading tutor details...</p>
                </div>
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
        <>
            <Navbar />
            {/* MOBILE */}
            <div className="lg:hidden min-h-screen relative flex flex-col justify-start gap-y-4 px-4 py-20">

                <div className="absolute w-full h-[252px] top-0 left-0 z-10">
                    <HeroBanner/>
                </div>

                <div className="relative z-10">
                    <TutorProfileCard tutorData={tutorData}></TutorProfileCard>
                </div>

                <ProfileTabs 
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />

                {currentTab === 'Overview' && (
                    <Overview
                        videoThumbnailUrl={tutorData.videoThumbnailUrl}
                        videoUrl={tutorData.videoUrl}
                        fullName={tutorData.fullName}
                        tutorRanking={tutorData.tutorRanking}
                        hoursTaught={tutorData.lessonsCount}
                        about={tutorData.bio}
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

                {currentTab === "Reviews & ratings" && (
                    <Review 
                        reviews={tutorData.reviews}
                        summary={tutorData.summary}
                    />
                )}
            </div>
            
            {/* DESKTOP */}
            <div className="hidden relative lg:flex justify-center items-start gap-[29px] px-20">

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

                    {currentTab === 'Overview' && (
                        <Overview
                            videoThumbnailUrl={tutorData.videoThumbnailUrl}
                            videoUrl={tutorData.videoUrl}
                            fullName={tutorData.fullName}
                            tutorRanking={tutorData.tutorRanking}
                            hoursTaught={tutorData.lessonsCount}
                            about={tutorData.bio}
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

                    {currentTab === "Reviews & ratings" && (
                        <Review 
                            reviews={tutorData.reviews}
                            summary={tutorData.summary}
                    />
                )}

                </div>

            </div>
            <Footer />
        </>
    )
}