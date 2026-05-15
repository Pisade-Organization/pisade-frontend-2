"use client"

import { useTranslations } from "next-intl"

export default function FooterContact() {
    const t = useTranslations("footer")
    return (
        <div className="flex flex-col justify-center items-start gap-y-2">

            <div className="text-label-3 lg:text-label-2 text-deep-royal-indigo-100">
                {t("contact")}
            </div>

            <div className="text-body-3 lg:text-body-2 text-white">
                info@pisade.com
            </div>

            <div className="text-body-3 lg:text-body-2 text-white">
                {t("address")}
            </div>

        </div>
    )
}
