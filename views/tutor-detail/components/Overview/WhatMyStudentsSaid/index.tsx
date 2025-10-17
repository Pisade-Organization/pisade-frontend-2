"use client"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

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
    const hasReviews = reviews && reviews.length > 0;
    const current = hasReviews ? reviews[currentReview % reviews.length] : undefined;
    return (
        <div className="border border-neutral-50 rounded-[15px] p-5
            flex flex-col justify-center items-start gap-y-5
        ">

            {/* TITLE + SUMMARY */}
            <div className="flex flex-col justify-center items-start gap-y-3">
                <div className="text-title-1 text-neutral-900">
                    What my students said
                </div>

                <Summary 
                    avgRating={avgRating}
                    studentReviewsCount={studentReviewsCount}
                />
            </div>

            {/* DIVIDER */}
            <div className="w-full border border-neutral-50"></div>

            <AnimatePresence mode="wait">
                {hasReviews && current && (
                    <motion.div
                        key={currentReview}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-full"
                    >
                        <ReviewItem 
                            avatarUrl={current.avatarUrl}
                            fullName={current.fullName}
                            review={current.review}
                            avgRating={avgRating}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <Controls
                currentReview={currentReview}
                setCurrentReview={setCurrentReview}
            />
        </div>
    )
}