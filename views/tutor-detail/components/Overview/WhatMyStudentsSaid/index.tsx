"use client"
import Typography from "@/components/base/Typography";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import { Star } from "lucide-react";

import ReviewItem from "./ReviewItem";
import Summary from "./Summary";
import Controls from "./Controls";

export default function WhatMyStudentsSaid({
    avgRating,
    studentReviewsCount,
    reviews
}: {
    avgRating: number
    studentReviewsCount: number
    reviews: {
        avatarUrl: string
        fullName: string
        review: string
    }[]
}) {

    const [currentReview, setCurrentReview] = useState<number>(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const hasReviews = reviews && reviews.length > 0;
    const current = hasReviews ? reviews[currentReview % reviews.length] : undefined;
    const total = reviews?.length ?? 0;

    const slideVariants = {
        enter: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? -40 : 40 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: 1 | -1) => ({ opacity: 0, x: dir === 1 ? 40 : -40 })
    };
    return (
        <div className="w-full p-0 lg:p-5 flex flex-col justify-center items-start gap-y-5
            lg:max-w-[311px] lg:border lg:border-neutral-50 lg:rounded-[15px]
        ">

            {/* TITLE + SUMMARY */}
            <div className="flex flex-col justify-center items-start gap-y-3">
                <Typography variant="title-1" color="neutral-900">
                    What my students said
                </Typography>
                <Summary 
                    avgRating={avgRating}
                    studentReviewsCount={studentReviewsCount}
                />
            </div>

            {/* DIVIDER */}
            <div className="w-full border border-neutral-50"></div>

            {hasReviews && current ? (
                <>
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentReview}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            custom={direction}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="w-full"
                        >
                            <ReviewItem 
                                avatarUrl={current.avatarUrl}
                                fullName={current.fullName}
                                review={current.review}
                                avgRating={avgRating}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <Controls
                        currentReview={currentReview}
                        setCurrentReview={(next) => {
                            const nextIndex = typeof next === 'number' ? next : currentReview;
                            const delta = (nextIndex - currentReview + total) % total;
                            if (delta === 1) setDirection(1);
                            else if (delta === total - 1) setDirection(-1);
                            else setDirection(1);
                            setCurrentReview(next as number);
                        }}
                        setDirection={setDirection}
                        total={total}
                    />
                </>
            ) : (
                <div className="w-full flex flex-col items-center justify-center gap-2 py-2 text-center">
                    <div className="w-10 h-10 rounded-full bg-neutral-25 flex items-center justify-center">
                        <Star size={18} className="text-neutral-400" />
                    </div>
                    <Typography variant="title-3" color="neutral-700">
                        No reviews yet
                    </Typography>
                    <Typography variant="body-3" color="neutral-500">
                        This tutor is new on Pisade. Be the first student to leave a review after your lesson.
                    </Typography>
                </div>
            )}
        </div>
    )
}
