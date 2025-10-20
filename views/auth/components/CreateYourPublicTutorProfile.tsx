"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import BaseButton from "@/components/base/BaseButton"
export default function CreateYourPublicTutorProfile() {
    const router = useRouter()

    const onCreateYourProfileBtnClicked = () => {
        router.push('/tutor/onboarding')
    }
    return (
        <div className="flex flex-col justify-center items-center gap-10">

            <div className="flex flex-col justify-center items-center">
                <Image 
                    src="/icons/common/people.svg"
                    alt="People Icon"
                    width={200}
                    height={169}
                    className="w-[200px] h-[169px] "
                />

                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-headline-3 text-deep-royal-indigo-900">Create your public tutor profile!</h1>
                    <h3 className="text-body-2 text-neutral-400">Over 40,000+ tutors already teach more than 1 million students</h3>
                </div>
            </div>

            <BaseButton variant="secondary" onClick={onCreateYourProfileBtnClicked}>
                Create your profile
            </BaseButton>
        </div>
    )
}