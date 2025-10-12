"use client"
import { useState } from "react"

import FilterHeader from "./FilterHeader"
import FilterGrid from "./FilterGrid"
import ViewModeToggle from "./ViewModeToggle"
import { SubjectDropdown } from "./dropdowns/SubjectDropdown"
import { RankingDropdown } from "./dropdowns/RankingDropdown"
import { SpecialtyDropdown } from "./dropdowns/SpecialtyDropdown"
import { LanguageDropdown } from "./dropdowns/LanguageDropdown"
import { EducationLevelDropdown } from "./dropdowns/EducationLevelDropdown"
// import { AvailabilityDropdown } from "./dropdowns/AvailabilityDropdown/AvailabilityDropdown"

type Mode = 'list' | 'grid';

interface FilterPanelProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

export default function FilterPanel({ mode, setMode }: FilterPanelProps) {
    return (
        <div className="w-full pt-8 pb-10 px-4 lg:px-20
            flex flex-col justify-center items-center gap-y-4
        ">
            <div className="hidden lg:flex w-full justify-between items-center">
                <FilterHeader />    
                <ViewModeToggle mode={mode} setMode={setMode} />
            </div>

            <FilterGrid>
                <SubjectDropdown />
                <RankingDropdown />
                <SpecialtyDropdown />
                <LanguageDropdown />
                {/* <AvailabilityDropdown /> */}
                <EducationLevelDropdown />
                
            </FilterGrid>
        </div>
    );
}