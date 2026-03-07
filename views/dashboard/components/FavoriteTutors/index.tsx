"use client"
import { useState, useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Title from "./Title"
import ViewAllBtn from "./ViewAllBtn"
import Card from "./Card"
import Controls from "./Controls"
import { TUTOR_RANKING } from "@/types/tutorRanking.enum"
import { useFavoriteTutors } from "@/hooks/dashboard/queries"

export default function FavoriteTutors() {
  const { data: favoriteTutors = [] } = useFavoriteTutors()
  const [currentTutor, setCurrentTutor] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentTutor)
    }
  }, [currentTutor])

  const handleSlideChange = (swiper: any) => {
    const newIndex = swiper.activeIndex
    if (newIndex !== currentTutor) {
      setDirection(newIndex > currentTutor ? 1 : -1)
      setCurrentTutor(newIndex)
    }
  }

  const tutors = favoriteTutors.map((tutor) => ({
    fullName: tutor.user.profile?.fullName ?? "Tutor",
    subject: tutor.subjects.map((subject) => subject.subject.name).join(", ") || "Subject",
    flagUrl: "https://flagcdn.com/th.svg",
    avatarUrl: tutor.user.profile?.avatarUrl ?? "https://ui-avatars.com/api/?name=Tutor",
    baseRate: 0,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.STARTER,
  }))

  return (
    <div className="
    w-full 
    flex flex-col gap-4 lg:gap-7
    py-5 px-4 lg:py-[60px] lg:px-[80px]
    ">
      
      <div className="w-full flex justify-between">
        <Title />
        <ViewAllBtn />
      </div>

      <div className="w-full">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={handleSlideChange}
          className="!pb-12"
        >
          {tutors.map((tutor, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <Card
                fullName={tutor.fullName}
                subject={tutor.subject}
                flagUrl={tutor.flagUrl}
                avatarUrl={tutor.avatarUrl}
                baseRate={tutor.baseRate}
                isAvailable={tutor.isAvailable}
                tutorRanking={tutor.tutorRanking}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Controls
        currentTutor={currentTutor}
        setCurrentTutor={setCurrentTutor}
        setDirection={setDirection}
        total={tutors.length}
        swiperRef={swiperRef}
      />

    </div>
  )
}
