"use client"
import { useState, useEffect } from "react"
import SearchHero from "../components/SearchHero"
import FilterPanel from "../components/filters/FilterPanel"
import TutorListCard from "../components/TutorCard/TutorListCard"
import { TutorCardProps } from "../types"
import axios from "axios"
import TutorGridCard from "../components/TutorCard/TutorGridCard"

export default function SearchPage() {
    const [mode, setMode] = useState<'list' | 'grid'>('list')
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(3000);
    const [tutors, setTutors] = useState<TutorCardProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await axios.get('/mockup_data/tutors.json')
                setTutors(response.data.tutors)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching tutors:', error)
                setLoading(false)
            }
        }

        fetchTutors()
    }, [])

    if (loading) {
        return (
            <div className="">
                <SearchHero />
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
        <div className="">
            <SearchHero />
            <FilterPanel 
                mode={mode} setMode={setMode} 
                minPrice={minPrice} setMinPrice={setMinPrice}
                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            />
            
            {/* TUTOR CARDS */}
            <div className="lg:block px-4 lg:px-20 lg:py-11 pb-24 lg:pb-0">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Available Tutors</h2>
                    <p className="text-gray-600">{tutors.length} tutors found</p>
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
            </div>
        </div>
    )
}