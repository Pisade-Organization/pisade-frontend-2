"use client"

import { useTranslations } from "next-intl"

export default function AuthTermsNotice() {
    const t = useTranslations("auth.terms")
    return (
        <div className="text-neutral-400 text-center text-body-4">
            {t("notice")} <br />
            <span>
                <span className="underline hover:text-neutral-500 cursor-pointer">
                    {t("pisadeTerms")}
                </span>
                {" "}{t("and")}{" "}
                <span className="underline hover:text-neutral-500 cursor-pointer">
                    {t("privacyPolicy")}
                </span>
            </span>
        </div>
    );
}
