"use client"
import Image from "next/image"

export default function FooterSocials() {
    return (
        <div className="flex flex-col justify-center items-start gap-y-3">
            <div className="text-label-3 lg:text-label-2 text-deep-royal-indigo-100">
                Follow us
            </div>

            <div className="flex justify-between items-center gap-x-5">

                <Image src="icons/common/linkedin.svg" width={20} height={20} alt="Linkedin icon" />
                <Image src="icons/common/x.svg" width={20} height={20} alt="X icon" />
                <Image src="icons/common/facebook.svg" width={20} height={20} alt="Facebook icon" />

            </div>
        </div>
    )
}