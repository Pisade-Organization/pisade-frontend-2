import { TUTOR_RANKING } from "@/types/tutorRanking.enum";
interface CardProps {
    tutorName: string;
    subject: string;
    flagUrl: string;
    baseRate: number;
    isAvailable: boolean;
    tutorRanking: TUTOR_RANKING
}

export default function Card({tutorName, subject, flagUrl, baseRate, isAvailable, tutorRanking}: CardProps) {
    return (
        <div className="border-[#CECECE66] flex flex-col justify-center items-center rounded-[12px]">
            
            


        </div>
    )
}