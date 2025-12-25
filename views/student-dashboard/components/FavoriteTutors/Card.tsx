import Typography from "@/components/base/Typography";
import Image from "next/image";
import { TUTOR_RANKING } from "@/types/tutorRanking.enum";
import { Zap, Heart, Calendar, MessageCircle } from "lucide-react";
import BaseButton from "@/components/base/BaseButton";

interface CardProps {
    fullName: string;
    subject: string;
    flagUrl: string;
    avatarUrl: string;
    baseRate: number;
    isAvailable: boolean;
    tutorRanking: TUTOR_RANKING
}

export default function Card({fullName, subject, flagUrl, avatarUrl, baseRate, isAvailable, tutorRanking}: CardProps) {
    return (
        <div className="border border-[#CECECE66] flex lg:flex-col justify-start items-center rounded-[12px] min-w-fit relative">
            
            <div className="min-w-[102px] h-full lg:w-[272px] lg:h-[255px] rounded-l-[12px] lg:rounded-t-[12px] lg:rounded-bl-none overflow-hidden relative ">
                <Image 
                    src={avatarUrl} 
                    alt={`${fullName} avatar`} 
                    className="w-full h-full object-cover"
                    width={0} 
                    height={0} 
                    sizes="30vw"
                />

                <div className="hidden lg:flex absolute top-2 right-2 w-9 h-9 justify-center items-center rounded-full bg-electric-violet-500 p-1.5 flex-shrink-0">
                    <Heart fill="white" color="white" size={18}/>
                </div>

            </div>

            <div className="hidden lg:flex justify-center items-center rounded-full bg-electric-violet-25 w-9 h-9 absolute right-2 top-[59%] -translate-y-1/2 z-30">
                <Image
                    src={`/icons/tutor-ranking/${tutorRanking}.svg`}
                    alt={`${tutorRanking} badge`}
                    width={28}
                    height={28}
                />
            </div>


            <div className="h-full flex flex-col py-3 px-4 lg:pt-4 lg:pb-5 lg:px-5 gap-2 lg:gap-3 flex-1">
                <div className="flex gap-1 items-start">
                    <div className="flex flex-col gap-1 flex-1">

                        <div className="flex flex-col gap-1">
                            <Typography variant={{ base: "title-3", lg: "title-2" }} color="neutral-900">
                                { fullName }
                            </Typography>

                            <div className="flex gap-2">
                                <Image src={flagUrl} alt={`${fullName} flag`} className="w-4 h-4 rounded-full object-cover" width={16} height={16} />
                                <Typography variant={{ base: "label-3" }} color="neutral-500">
                                    { subject }
                                </Typography>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">

                            <div className="inline-flex items-center gap-3">
                                <Typography variant={{ base: "title-3", lg: "headline-5" }} color="neutral-900">
                                    ฿{ baseRate }
                                </Typography>

                                <Typography variant={{ base: "body-3", lg: "body-2"}} color="neutral-600">
                                    /hr
                                </Typography>
                            </div>

                            {
                                isAvailable && (
                                    <div className="flex items-center py-[2px] px-2 gap-1 rounded-full border border-deep-royal-indigo-50 flex-shrink-0 whitespace-nowrap">
                                        <Zap className="w-3 h-3 lg:w-[14px] lg:h-[14px] text-green-normal" />

                                        <Typography variant={{ base: "body-4", lg: "body-3" }} color="green-normal">
                                            Available now
                                        </Typography>
                                    </div>
                                )
                            }
                        </div>
                    </div>


                    <div className="lg:hidden w-6 h-6 flex justify-center items-center rounded-full bg-electric-violet-500 p-1.5 flex-shrink-0">
                        <Heart fill="white" color="white" size={24}/>
                    </div>


                </div>

                <div className="flex items-center gap-2">
                    
                    <button className="w-10 h-10 flex-shrink-0">
                        <Calendar size={20} className="text-neutral-700" />
                    </button>

                    <button className="w-10 h-10 flex-shrink-0">
                        <MessageCircle size={20} className="text-neutral-700" />
                    </button>

                    <BaseButton typeStyle="outline" className="flex-1 whitespace-nowrap">
                        Book lesson
                    </BaseButton>
                </div>
            </div>


        </div>
    )
}