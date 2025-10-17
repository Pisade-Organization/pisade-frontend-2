"use client"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
export default function Controls({
    currentReview,
    setCurrentReview,
    setDirection,
    total
}: {
    currentReview: number,
    setCurrentReview: (currentReview: number) => void,
    setDirection: (dir: 1 | -1) => void,
    total: number
}) {

	const goPrev = () => {
		setDirection(-1)
		setCurrentReview((currentReview - 1 + total) % total)
	}

	const goNext = () => {
		setDirection(1)
		setCurrentReview((currentReview + 1) % total)
	}
    return (
		<div className="flex justify-between items-center w-full">
			<motion.button
				type="button"
				aria-label="Previous review"
				onClick={goPrev}
				className="p-1 text-deep-royal-indigo-700"
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.05 }}
			>
				<ArrowLeft size={24} />
			</motion.button>

			<div className="flex items-center gap-3">
				{Array.from({ length: total }).map((_, idx) => (
					<motion.button
						key={idx}
						type="button"
						aria-label={`Go to review ${idx + 1}`}
						onClick={() => setCurrentReview(idx)}
						className={
							idx === currentReview
								? "h-2 w-6 rounded-full bg-[#6C1BFF]"
								: "h-2 w-2.5 rounded-full bg-neutral-200"
						}
						whileTap={{ scale: 0.9 }}
						animate={{
							width: idx === currentReview ? 24 : 10,
							backgroundColor: idx === currentReview ? "#6C1BFF" : "#E5E7EB"
						}}
						transition={{ type: "spring", stiffness: 400, damping: 30 }}
					/>
				))}
			</div>

			<motion.button
				type="button"
				aria-label="Next review"
				onClick={goNext}
				className="p-1 text-deep-royal-indigo-700"
				whileTap={{ scale: 0.9 }}
				whileHover={{ scale: 1.05 }}
			>
				<ArrowRight size={24} />
			</motion.button>
		</div>
    )
}