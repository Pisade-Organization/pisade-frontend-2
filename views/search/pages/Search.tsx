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
    const TUTORS_PER_PAGE = 6

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetchTutorsPaginated(1, TUTORS_PER_PAGE)
                setTutors(response.tutors)
                setTotalTutors(response.total)
                setHasMore(response.hasMore)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching tutors:', error)
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
            
            setTutors(prev => [...prev, ...response.tutors])
            setCurrentPage(nextPage)
            setHasMore(response.hasMore)
        } catch (error) {
            console.error('Error loading more tutors:', error)
        } finally {
            setLoadingMore(false)
        }
    }

    if (loading) {
        return (
            <div className="">
                <Navbar variant="search" />
                <FilterPanel 
                    mode={mode} setMode={setMode} 
                    minPrice={minPrice} setMinPrice={setMinPrice}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                />
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Loading tutors...</div>
                </div>
            </div>
        )
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
            <div className="lg:block px-4 lg:px-20 lg:py-11 pb-24 lg:pb-0">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-2">Available Tutors</h1>
                    <p className="text-gray-600">
                        Showing {tutors.length} of {totalTutors} tutors
                    </p>
                </div>
                <div className={`grid gap-6 ${mode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
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
                {hasMore && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={loadMoreTutors}
                            disabled={loadingMore}
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
                
                {/* NO MORE TUTORS MESSAGE */}
                {!hasMore && tutors.length > 0 && (
                    <div className="flex justify-center mt-8">
                        <p className="text-gray-500 text-center">
                            🎉 You've seen all {totalTutors} tutors! 
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}