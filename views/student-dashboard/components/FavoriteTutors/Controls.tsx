"use client"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Controls({
    currentTutor,
    setCurrentTutor,
    setDirection,
    total,
    swiperRef
}: {
    currentTutor: number,
    setCurrentTutor: (currentTutor: number) => void,
    setDirection: (dir: 1 | -1) => void,
    total: number,
    swiperRef?: React.MutableRefObject<any>
}) {

    const goPrev = () => {
        if (swiperRef?.current) {
            swiperRef.current.slidePrev()
        } else {
            setDirection(-1)
            setCurrentTutor((currentTutor - 1 + total) % total)
        }
    }

    const goNext = () => {
        if (swiperRef?.current) {
            swiperRef.current.slideNext()
        } else {
            setDirection(1)
            setCurrentTutor((currentTutor + 1) % total)
        }
    }

    const goToSlide = (index: number) => {
        if (swiperRef?.current) {
            swiperRef.current.slideTo(index)
        } else {
            setDirection(index > currentTutor ? 1 : -1)
            setCurrentTutor(index)
        }
    }

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-3">
                {Array.from({ length: total }).map((_, idx) => (
                    <motion.button
                        key={idx}
                        type="button"
                        aria-label={`Go to tutor ${idx + 1}`}
                        onClick={() => goToSlide(idx)}
                        className={
                            idx === currentTutor
                                ? "h-2 w-6 rounded-full bg-[#6C1BFF]"
                                : "h-2 w-2.5 rounded-full bg-neutral-200"
                        }
                        whileTap={{ scale: 0.9 }}
                        animate={{
                            width: idx === currentTutor ? 24 : 10,
                            backgroundColor: idx === currentTutor ? "#6C1BFF" : "#E5E7EB"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                ))}
            </div>

            <div className="flex items-center gap-2">
                <motion.button
                    type="button"
                    aria-label="Previous tutor"
                    onClick={goPrev}
                    className="p-1 text-deep-royal-indigo-700"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <ArrowLeft size={20} />
                </motion.button>

                <motion.button
                    type="button"
                    aria-label="Next tutor"
                    onClick={goNext}
                    className="p-1 text-deep-royal-indigo-700"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <ArrowRight size={20} />
                </motion.button>
            </div>
        </div>
    )
}

