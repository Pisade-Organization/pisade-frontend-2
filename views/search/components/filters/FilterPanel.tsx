"use client"

import FilterHeader from "./FilterHeader"
import FilterGrid from "./FilterGrid"
import ViewModeToggle from "./ViewModeToggle"
import { SubjectDropdown } from "./dropdowns/SubjectDropdown"
import { RankingDropdown } from "./dropdowns/RankingDropdown"
import { SpecialtyDropdown } from "./dropdowns/SpecialtyDropdown"
import { LanguageDropdown } from "./dropdowns/LanguageDropdown"
import { EducationLevelDropdown } from "./dropdowns/EducationLevelDropdown"
import { AvailabilityDropdown } from "./dropdowns/AvailabilityDropdown/AvailabilityDropdown"
import PriceRangeFilter from "./PriceRangeFilter"

type Mode = 'list' | 'grid';

interface FilterPanelProps {
    mode: Mode;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    minPrice: number;
    setMinPrice: React.Dispatch<React.SetStateAction<number>>;
    maxPrice: number;
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
    subject: string;
    onSubjectChange: (value: string) => void;
    language: string[];
    onLanguageChange: (value: string[]) => void;
    specialty: string[];
    onSpecialtyChange: (value: string[]) => void;
    ranking: string;
    onRankingChange: (value: string) => void;
    subjectOptions: string[];
    languageOptions: string[];
}

export default function FilterPanel({
    mode,
    setMode,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    subject,
    onSubjectChange,
    language,
    onLanguageChange,
    specialty,
    onSpecialtyChange,
    ranking,
    onRankingChange,
    subjectOptions,
    languageOptions,
}: FilterPanelProps) {
    return (
        <div className="w-full pt-8 pb-5 lg:pb-10 px-4 lg:px-20
            flex flex-col justify-center items-center gap-y-4
        ">
            <div className="hidden lg:flex w-full justify-between items-center">
                <FilterHeader />    
                <ViewModeToggle mode={mode} setMode={setMode} />
            </div>

            <FilterGrid>
                <SubjectDropdown options={subjectOptions} value={subject} onChange={onSubjectChange} />
                <AvailabilityDropdown />
                <RankingDropdown value={ranking} onChange={onRankingChange} />
                <SpecialtyDropdown value={specialty} onChange={onSpecialtyChange} />
                <LanguageDropdown options={languageOptions} value={language} onChange={onLanguageChange} />
                <EducationLevelDropdown />
                <PriceRangeFilter
                    minPrice={minPrice} setMinPrice={setMinPrice}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                />
            </FilterGrid>
        </div>
    );
}
