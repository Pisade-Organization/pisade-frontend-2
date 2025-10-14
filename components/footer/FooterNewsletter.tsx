
export default function FooterNewsletter() {
    return (
        <div
            className="search-input-outline relative flex flex-col max-w-[628px] w-full h-[333px] justify-center items-start px-10 py-9 gap-y-5 rounded-[12px]"
            style={{
            background:
                "linear-gradient(90.6deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.24) 100%)",
            backdropFilter: "blur(16px)",
            }}
        >
            <div className="flex flex-col justify-center items-start gap-y-2">

                <div className="text-headline-5 lg:text-headline-4 text-white">
                    Don't Miss Out! get the Latest on Pisade
                </div>

                <div className="text-body-3 lg:text-body-2 text-white">
                    Sign up for our email list and get exclusive tips, news, and special offers
                    delivered straight to your inbox.
                </div>

            </div>

            <div className="w-full flex flex-col justify-center items-start gap-y-2">
                <label htmlFor="footer-newsletter-email" className="text-label-3 lg:text-label-2 text-white">Email <span className="text-[#ED4245]">*</span></label>
                <input 
                    placeholder="Email address"
                    type="text" 
                    className="
                        w-full border border-white border-opacity-20 text-deep-royal-indigo-50 text-body-2
                        bg-gradient-to-r from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.24)]
                        py-3 px-4 rounded-[12px] bg-transparent outline-none 
                    " 
                    />
            </div>

            <button className="py-3 px-4 rounded-[8px] bg-electric-violet-500 text-white text-label-3 lg:text-label-2">
                Let's talk
            </button>
        </div>

    )
}