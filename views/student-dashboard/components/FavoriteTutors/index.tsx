"use client"
import { useState, useRef, useEffect } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Title from "./Title"
import ViewAllBtn from "./ViewAllBtn"
import Card from "./Card"
import Controls from "./Controls"
import { TUTOR_RANKING } from "@/types/tutorRanking.enum"

const mockTutors = [
  {
    fullName: "Sophia Lee",
    subject: "Mathematics",
    flagUrl: "https://flagcdn.com/us.svg",
    avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    baseRate: 500,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.MASTER
  },
  {
    fullName: "Alana Somchai Degrey",
    subject: "Physics, English",
    flagUrl: "https://flagcdn.com/th.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    baseRate: 350,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.PRO
  },
  {
    fullName: "John Smith",
    subject: "Chemistry",
    flagUrl: "https://flagcdn.com/gb.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    baseRate: 400,
    isAvailable: false,
    tutorRanking: TUTOR_RANKING.STARTER
  },
  {
    fullName: "Maria Garcia",
    subject: "Spanish, Literature",
    flagUrl: "https://flagcdn.com/es.svg",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    baseRate: 450,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.MASTER
  },
  {
    fullName: "David Chen",
    subject: "Computer Science",
    flagUrl: "https://flagcdn.com/cn.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    baseRate: 600,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.MASTER
  },
  {
    fullName: "Emma Wilson",
    subject: "Biology",
    flagUrl: "https://flagcdn.com/ca.svg",
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    baseRate: 380,
    isAvailable: false,
    tutorRanking: TUTOR_RANKING.PRO
  },
  {
    fullName: "James Brown",
    subject: "History",
    flagUrl: "https://flagcdn.com/au.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/56.jpg",
    baseRate: 320,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.PRO
  },
  {
    fullName: "Lisa Anderson",
    subject: "Art, Design",
    flagUrl: "https://flagcdn.com/fr.svg",
    avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
    baseRate: 420,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.MASTER
  },
  {
    fullName: "Michael Johnson",
    subject: "Economics",
    flagUrl: "https://flagcdn.com/us.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    baseRate: 480,
    isAvailable: false,
    tutorRanking: TUTOR_RANKING.PRO
  },
  {
    fullName: "Sarah Kim",
    subject: "Korean, English",
    flagUrl: "https://flagcdn.com/kr.svg",
    avatarUrl: "https://randomuser.me/api/portraits/women/51.jpg",
    baseRate: 550,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.MASTER
  },
  {
    fullName: "Robert Taylor",
    subject: "Physics",
    flagUrl: "https://flagcdn.com/gb.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    baseRate: 370,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.STARTER
  },
  {
    fullName: "Anna Martinez",
    subject: "French, Spanish",
    flagUrl: "https://flagcdn.com/fr.svg",
    avatarUrl: "https://randomuser.me/api/portraits/women/72.jpg",
    baseRate: 410,
    isAvailable: true,
    tutorRanking: TUTOR_RANKING.PRO
  },
  {
    fullName: "Thomas White",
    subject: "Geography",
    flagUrl: "https://flagcdn.com/nz.svg",
    avatarUrl: "https://randomuser.me/api/portraits/men/38.jpg",
    baseRate: 290,
    isAvailable: false,
    tutorRanking: TUTOR_RANKING.STARTER
  }
]

export default function FavoriteTutors() {
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
          {mockTutors.map((tutor, index) => (
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
        total={mockTutors.length}
        swiperRef={swiperRef}
      />

    </div>
  )
}