"use client"
import { useState, useEffect } from "react"
import SearchHero from "../components/SearchHero"
import FilterPanel from "../components/filters/FilterPanel"
import TutorListCard from "../components/TutorCard/TutorListCard"
import { TutorCardProps } from "../types"
import TutorGridCard from "../components/TutorCard/TutorGridCard"
import Navbar from "@/components/Navbar"
import { fetchTutorsPaginated } from "@/services/tutor"
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
    const [mode, setMode] = useState<'list' | 'grid'>('list')
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(3000);
    const [tutors, setTutors] = useState<TutorCardProps[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [totalTutors, setTotalTutors] = useState(0)
    const [loadError, setLoadError] = useState(false)
    const TUTORS_PER_PAGE = 6

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetchTutorsPaginated(1, TUTORS_PER_PAGE)
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
    }, [])

    const loadMoreTutors = async () => {
        if (loadingMore || !hasMore) return
        
        setLoadingMore(true)
        
        try {
            const nextPage = currentPage + 1
            const response = await fetchTutorsPaginated(nextPage, TUTORS_PER_PAGE)
            
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
            />
            
            {/* TUTOR CARDS */}
            <div className="w-full lg:block px-4 lg:px-20 lg:py-11 pb-24 lg:pb-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Available Tutors</h1>
                    <p className="text-gray-600">
                        {loading
                            ? `Loading tutors...`
                            : `Showing ${tutors.length} of ${totalTutors} tutors`}
                    </p>
                </div>
                {loadError && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                        We could not load tutors right now. Please retry in a moment.
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
                                    Loading more tutors...
                                </div>
                            ) : (
                                `Load More Tutors (${totalTutors - tutors.length} remaining)`
                            )}
                        </button>
                    </div>
                )}
                
            </div>
            <Footer />
        </div>
    )
}
