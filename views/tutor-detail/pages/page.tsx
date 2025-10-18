"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import HeroBanner from "../components/HeroBanner"
import TutorProfileCard from "../components/TutorProfileCard"
import ProfileTabs from "../components/ProfileTabs"
import Overview from "../components/Overview"
import Footer from "@/components/footer/Footer"
import BackBtn from "../components/BackBtn"
import Review from "../components/Reviews"

export default function TutorDetailPage({
    tutorId
}: {
    tutorId: string
}) {
    
    const [currentTab, setCurrentTab] = useState<"Overview" | "Availability calendar" | "Reviews & ratings" >('Overview')

    return (
        <>
            <Navbar />
            {/* MOBILE */}
            <div className="lg:hidden min-h-screen relative flex flex-col justify-start gap-y-4 px-4 py-20">

                <div className="absolute w-full h-[252px] top-0 left-0 z-10">
                    <HeroBanner/>
                </div>

                <div className="relative z-10">
                    <TutorProfileCard></TutorProfileCard>
                </div>

                <ProfileTabs 
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />

                {currentTab === 'Overview' && (
                    <Overview
                        videoThumbnailUrl="https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA="
                        videoUrl="youtube.com"
                        fullName="Alana Somchai Degrey"
                        tutorRanking="PRO"
                        hoursTaught={210}
                        about="Recent graduate from Chicago University's School of Dentistry. Specialized in academic English and test prep. My teaching style focuses on clarity and patience, supporting students of all levels. I have experience preparing learners for standardized exams and improving academic writing. Dedicated to creating engaging lessons that empower students to reach their goals."
                        languages={["English (Native)", "Thai (Intermediate)"]}
                        avgRating={4.8}
                        studentReviewsCount={26}
                        reviews={[
                            {
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Somsak T.",
                                review: "Great tutor! Helped me improve my speaking confidence a lot."
                            },
                            {
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Ananya P.",
                                review: "Very patient and clear explanations. Highly recommend."
                            },
                            {
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Peter P.",
                                review: "Alana is an amazing tutor. Her lessons are always interesting and fun."
                            },
                            {
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Phichayut S.",
                                review: "I always feel motivated after her classes! She explains everything so clearly."
                            }
                        ]}
                        specialties={[
                            "Certified Teacher",
                            "Native English Speaker",
                            "Test Prep Expert",
                            "IELTS Specialist",
                            "University Admissions Coach",
                            "Public Speaking Trainer",
                            "Academic Writing Advisor"
                        ]}
                    />
                )}

                {currentTab === "Reviews & ratings" && (
                    <Review 
                        reviews={[
                            {
                                id: "1",
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Somchai Degrey",
                                rating: 5,
                                date: "March 21, 2025",
                                review: "My son enjoys talking to her every time he has a lesson, and I'm also very happy with the way she leads the communication and helps improve his vocabulary and grammar."
                            },
                            {
                                id: "2",
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Ananya P.",
                                rating: 5,
                                date: "March 15, 2025",
                                review: "Very patient and clear explanations. Highly recommend."
                            },
                            {
                                id: "3",
                                avatarUrl: "/logos/pisade-mobile.svg",
                                fullName: "Peter P.",
                                rating: 4,
                                date: "March 10, 2025",
                                review: "Alana is an amazing tutor. Her lessons are always interesting and fun."
                            }
                        ]}
                        summary={{
                            avgRating: 4.5,
                            totalReviews: 30
                        }}
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

                    <TutorProfileCard></TutorProfileCard>

                </div>

                <div className="w-full flex flex-col justify-center items-start gap-7 pt-72">

                    <ProfileTabs 
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                    />

                    {currentTab === 'Overview' && (
                        <Overview
                            videoThumbnailUrl="https://media.istockphoto.com/id/1316134499/photo/a-concept-image-of-a-magnifying-glass-on-blue-background-with-a-word-example-zoom-inside-the.jpg?s=612x612&w=0&k=20&c=sZM5HlZvHFYnzjrhaStRpex43URlxg6wwJXff3BE9VA="
                            videoUrl="youtube.com"
                            fullName="Alana Somchai Degrey"
                            tutorRanking="PRO"
                            hoursTaught={210}
                            about="Recent graduate from Chicago University's School of Dentistry. Specialized in academic English and test prep. My teaching style focuses on clarity and patience, supporting students of all levels. I have experience preparing learners for standardized exams and improving academic writing. Dedicated to creating engaging lessons that empower students to reach their goals."
                            languages={["English (Native)", "Thai (Intermediate)"]}
                            avgRating={4.8}
                            studentReviewsCount={26}
                            reviews={[
                                {
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Somsak T.",
                                    review: "Great tutor! Helped me improve my speaking confidence a lot."
                                },
                                {
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Ananya P.",
                                    review: "Very patient and clear explanations. Highly recommend."
                                },
                                {
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Peter P.",
                                    review: "Alana is an amazing tutor. Her lessons are always interesting and fun."
                                },
                                {
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Phichayut S.",
                                    review: "I always feel motivated after her classes! She explains everything so clearly."
                                }
                            ]}
                            specialties={[
                                "Certified Teacher",
                                "Native English Speaker",
                                "Test Prep Expert",
                                "IELTS Specialist",
                                "University Admissions Coach",
                                "Public Speaking Trainer",
                                "Academic Writing Advisor"
                            ]}
                        />)}

                    {currentTab === "Reviews & ratings" && (
                        <Review 
                            reviews={[
                                {
                                    id: "1",
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Somchai Degrey",
                                    rating: 5,
                                    date: "March 21, 2025",
                                    review: "My son enjoys talking to her every time he has a lesson, and I'm also very happy with the way she leads the communication and helps improve his vocabulary and grammar."
                                },
                                {
                                    id: "2",
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Ananya P.",
                                    rating: 5,
                                    date: "March 15, 2025",
                                    review: "Very patient and clear explanations. Highly recommend."
                                },
                                {
                                    id: "3",
                                    avatarUrl: "/logos/pisade-mobile.svg",
                                    fullName: "Peter P.",
                                    rating: 4,
                                    date: "March 10, 2025",
                                    review: "Alana is an amazing tutor. Her lessons are always interesting and fun."
                                }
                            ]}
                            summary={{
                                avgRating: 4.5,
                                totalReviews: 30
                            }}
                    />
                )}

                </div>

            </div>
            <Footer />
        </>
    )
}