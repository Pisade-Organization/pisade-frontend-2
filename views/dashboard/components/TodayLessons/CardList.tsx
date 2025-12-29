"use client"

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import BaseButton from "@/components/base/BaseButton"
import Card from "./Card"

export default function CardList({
    cards
}: {
    cards: {
        avatarUrl: string
        fromTime: string
        toTime: string
        subject: string
        tutorName: string
    }[]
}) {
    const swiperRef = useRef<any>(null)

    return (
        <div className="w-full">
            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView="auto"
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}
                pagination={{ 
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-pagination-bullet',
                    bulletActiveClass: 'custom-pagination-bullet-active'
                }}
                className="!pb-12"
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index} className="!w-[220px] lg:!w-[331px]">
                        <Card
                            avatarUrl={card.avatarUrl}
                            fromTime={card.fromTime}
                            toTime={card.toTime}
                            subject={card.subject}
                            tutorName={card.tutorName}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-between items-center gap-3 pt-4">
                <div className="custom-pagination flex justify-start items-center gap-3"></div>
                <div className="flex items-center gap-2">
                    <BaseButton
                        typeStyle="borderless"
                        className="!p-0 !w-10 !h-10 !min-w-10 !rounded-full !bg-white hover:!bg-neutral-50 !flex !items-center !justify-center"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <ArrowLeft size={20} strokeWidth={2} className="text-electric-violet-700" />
                    </BaseButton>
                    <BaseButton
                        typeStyle="borderless"
                        className="!p-0 !w-10 !h-10 !min-w-10 !rounded-full !bg-white hover:!bg-neutral-50 !flex !items-center !justify-center"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <ArrowRight size={20} strokeWidth={2} className="text-electric-violet-700" />
                    </BaseButton>
                </div>
            </div>
            <style jsx global>{`
                .custom-pagination-bullet {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: #d2b2f8;
                    opacity: 1;
                    margin: 0 !important;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .custom-pagination-bullet-active {
                    width: 24px;
                    height: 6px;
                    border-radius: 3px;
                    background-color: #6d08e8;
                }
            `}</style>
        </div>
    )
}