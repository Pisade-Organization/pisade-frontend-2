
"use client"
import { motion, AnimatePresence } from "framer-motion"
import Card from "./Card"

export default function CardList({
    cards,
    currentLesson,
    direction
}: {
    cards: {
        avatarUrl: string
        fromTime: string
        toTime: string
        subject: string
        tutorName: string
    }[],
    currentLesson: number,
    direction: number
}) {
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    }

    const slideTransition = {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
    }

    return (
        <div className="relative w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentLesson}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition}
                    className="w-full"
                >
                    <Card
                        avatarUrl={cards[currentLesson]?.avatarUrl || ""}
                        fromTime={cards[currentLesson]?.fromTime || ""}
                        toTime={cards[currentLesson]?.toTime || ""}
                        subject={cards[currentLesson]?.subject || ""}
                        tutorName={cards[currentLesson]?.tutorName || ""}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}