"use client"
import FooterLogo from "./FooterLogo"
import FooterSocials from "./FooterSocials"
import FooterContact from "./FooterContact"
import FooterNewsletter from "./FooterNewsletter"


export default function Footer() {
    return (
        <div
            className="
                border-t border-neutral-50 flex flex-col lg:flex-row 
                justify-center items-start lg:items-center
                gap-y-8 pt-9 lg:pt-16 pb-5 lg:pb-10 px-4 lg:px-[100px]"
            
            style={{ background: 'linear-gradient(180deg, #25008D 0%, #0E0037 100%)' }}
        >

            <div className="w-full flex flex-col lg:flex-row lg:justify-center gap-y-6 gap-x-10">
                <div className="flex flex-col gap-y-6 ">
                    <FooterLogo />

                    <FooterSocials />

                    <FooterContact />
                </div>

                <FooterNewsletter />
            </div>





        </div>
    )
}