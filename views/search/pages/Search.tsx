"use client"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import SearchHero from "../components/SearchHero"
import FilterPanel from "../components/filters/FilterPanel"
import TutorListCard from "../components/TutorCard/TutorListCard"
import { TutorCardProps } from "../types"
import TutorGridCard from "../components/TutorCard/TutorGridCard"
import Navbar from "@/components/Navbar"
import { fetchLanguageOptions, fetchSubjectOptions, fetchTutorsPaginated } from "@/services/tutor"
import Footer from "@/components/footer/Footer"

function TutorListSkeleton() {
    return (
        <div className="w-full bg-white border border-neutral-50 p-4 rounded-[15px] animate-pulse">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-neutral-100 rounded" />
                    <div className="h-3 w-1/4 bg-neutral-100 rounded" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 w-full bg-neutral-100 rounded" />
                <div className="h-3 w-5/6 bg-neutral-100 rounded" />
                <div className="h-3 w-2/3 bg-neutral-100 rounded" />
            </div>
        </div>
    )
}

function TutorGridSkeleton() {
    return (
        <div className="border border-deep-royal-indigo-50 rounded-[24px] p-8 animate-pulse">
            <div className="flex justify-between items-start mb-5">
                <div className="w-16 h-16 rounded-full bg-neutral-100" />
                <div className="w-20 h-8 rounded bg-neutral-100" />
            </div>
            <div className="space-y-3">
                <div className="h-4 w-2/3 bg-neutral-100 rounded" />
                <div className="h-3 w-1/2 bg-neutral-100 rounded" />
                <div className="h-3 w-full bg-neutral-100 rounded" />
                <div className="h-3 w-4/5 bg-neutral-100 rounded" />
            </div>
        </div>
    )
}

export default function SearchPage() {
    const t = useTranslations("search")
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [mode, setMode] = useState<'list' | 'grid'>('list')
    const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get("minPrice") ?? 0))
    const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get("maxPrice") ?? 3000));
    const [subject, setSubject] = useState<string>(searchParams.get("subject") || "Show All")
    const [language, setLanguage] = useState<string[]>(
        searchParams.get("language")?.split(",").filter(Boolean) ?? ["Show all languages"],
    )
    const [ranking, setRanking] = useState<string>(searchParams.get("ranking") || "Show all in this ranking")
    const [subjectOptions, setSubjectOptions] = useState<string[]>([])
    const [languageOptions, setLanguageOptions] = useState<string[]>([])
    const [tutors, setTutors] = useState<TutorCardProps[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [totalTutors, setTotalTutors] = useState(0)
    const [loadError, setLoadError] = useState(false)
    const TUTORS_PER_PAGE = 6
    const sort = ranking === "Starter"
      ? "ranking"
      : ranking === "Pro"
        ? "ranking"
        : ranking === "Master"
          ? "ranking"
          : undefined

    const activeFilters = {
        minPrice,
        maxPrice,
        subject: subject === "Show All" ? undefined : subject,
        language:
            language.length === 1 && language[0] === "Show all languages"
                ? undefined
                : language[0],
        sort: sort as "rating" | "ranking" | "price_low" | "price_high" | undefined,
    }

    const syncUrl = () => {
        const params = new URLSearchParams()
        if (activeFilters.minPrice > 0) params.set("minPrice", String(activeFilters.minPrice))
        if (activeFilters.maxPrice < 3000) params.set("maxPrice", String(activeFilters.maxPrice))
        if (activeFilters.subject) params.set("subject", activeFilters.subject)
        if (activeFilters.language) params.set("language", activeFilters.language)
        if (ranking !== "Show all in this ranking") params.set("ranking", ranking)
        const query = params.toString()
        router.replace(query ? `${pathname}?${query}` : pathname)
    }

    useEffect(() => {
        void fetchSubjectOptions().then(setSubjectOptions)
        void fetchLanguageOptions().then(setLanguageOptions)
    }, [])

    useEffect(() => {
        syncUrl()
        setCurrentPage(1)
        setTutors([])
    }, [minPrice, maxPrice, subject, language, ranking])

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetchTutorsPaginated(1, TUTORS_PER_PAGE, activeFilters)
                setTutors(response.tutors as TutorCardProps[])
                setTotalTutors(response.total)
                setHasMore(response.hasMore)
                setLoadError(response.isError)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching tutors:', error)
                setLoadError(true)
                setLoading(false)
            }
        }

        fetchTutors()
    }, [minPrice, maxPrice, subject, language, ranking])

    const loadMoreTutors = async () => {
        if (loadingMore || !hasMore) return
        
        setLoadingMore(true)
        
        try {
            const nextPage = currentPage + 1
            const response = await fetchTutorsPaginated(nextPage, TUTORS_PER_PAGE, activeFilters)
            
            setTutors(prev => [...prev, ...response.tutors as TutorCardProps[]])
            setCurrentPage(nextPage)
            setHasMore(response.hasMore)
        } catch (error) {
            console.error('Error loading more tutors:', error)
        } finally {
            setLoadingMore(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar variant="search" />
            <SearchHero />
            <FilterPanel 
                mode={mode} setMode={setMode} 
                minPrice={minPrice} setMinPrice={setMinPrice}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                subject={subject}
                onSubjectChange={setSubject}
                language={language}
                onLanguageChange={setLanguage}
                ranking={ranking}
                onRankingChange={setRanking}
                subjectOptions={subjectOptions}
                languageOptions={languageOptions}
            />
            
            {/* TUTOR CARDS */}
            <div className="w-full lg:block px-4 lg:px-20 lg:py-11 pb-24 lg:pb-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">{t("availableTutors")}</h1>
                    <p className="text-gray-600">
                        {loading
                            ? t("loadingTutors")
                            : t("showingTutors", { count: tutors.length, total: totalTutors })}
                    </p>
                </div>
                {loadError && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                        {t("loadError")}
                    </div>
                )}
                <div className={`grid gap-6 ${mode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    {loading && Array.from({ length: TUTORS_PER_PAGE }).map((_, index) => (
                        mode === 'grid' ? (
                            <TutorGridSkeleton key={`skeleton-grid-${index}`} />
                        ) : (
                            <TutorListSkeleton key={`skeleton-list-${index}`} />
                        )
                    ))}

                    {tutors.map((tutor) =>
                        mode === 'grid' ? (
                            <TutorGridCard
                                key={tutor.id}
                                view={mode}
                                {...tutor}
                            />
                        ) : (
                            <TutorListCard
                                key={tutor.id}
                                view={mode}
                                {...tutor}
                            />
                        )
                    )}
                </div>
                
                {/* LOAD MORE BUTTON */}
                {hasMore && !loading && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={loadMoreTutors}
                            disabled={loadingMore || loading}
                            className="px-8 py-3 bg-electric-violet-500 text-white rounded-lg font-medium hover:bg-electric-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loadingMore ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {t("loadingMore")}
                                </div>
                            ) : (
                                t("loadMore", { remaining: totalTutors - tutors.length })
                            )}
                        </button>
                    </div>
                )}
                
            </div>
            <Footer />
        </div>
    )
}
