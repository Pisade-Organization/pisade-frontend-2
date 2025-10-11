"use client"
import { useState } from "react"

import FilterHeader from "./FilterHeader"
import FilterGrid from "./FilterGrid"
import ViewModeToggle from "./ViewModeToggle"
import { SubjectDropdown } from "./dropdowns/SubjectDropdown"
import { RankingDropdown } from "./dropdowns/RankingDropdown"

export default function FilterPanel() {
    const [mode, setMode] = useState<'list' | 'grid'>('list')

    return (
        <div className="w-full pt-8 pb-10 px-20
            flex flex-col justify-center items-center gap-y-4
        ">
            <div className="w-full flex justify-between items-center">
                <FilterHeader />    
                <ViewModeToggle mode={mode} setMode={setMode} />
            </div>

            <FilterGrid>
                <SubjectDropdown />
                <RankingDropdown />
                {/* <SubjectDropdown />
                <SubjectDropdown />
                <SubjectDropdown />
                <SubjectDropdown />
                <SubjectDropdown /> */}
            </FilterGrid>
        </div>
    )
}