"use client"
import Typography from "@/components/base/Typography";
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
        <div className="w-full max-w-[311px] border border-neutral-50 rounded-[15px] p-5
            flex flex-col justify-center items-start gap-y-5
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

            <AnimatePresence mode="wait" custom={direction}>
                {hasReviews && current && (
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
                )}
            </AnimatePresence>

            <Controls
                currentReview={currentReview}
                setCurrentReview={(next) => {
                    if (!hasReviews) return;
                    // Determine direction: +1 moves left->right, -1 moves right->left
                    const nextIndex = typeof next === 'number' ? next : currentReview; // fallback
                    const delta = (nextIndex - currentReview + total) % total;
                    // If moving to previous, delta might be large; normalize to -1 when wrapping backwards
                    if (delta === 1) setDirection(1);
                    else if (delta === total - 1) setDirection(-1);
                    else setDirection(1);
                    setCurrentReview(next as number);
                }}
                setDirection={setDirection}
                total={total}
            />
        </div>
    )
}