"use client";

import { BaseDropdown } from "./BaseDropdown";
import { useState } from "react";
import Image from "next/image";

const RANKINGS = [
  {
    id: "starter",
    name: "Starter",
    description: "Building hours and getting initial ratings.",
    icon: "images/search/tutor-ranking/starter" // You can replace this with your actual icon component
  },
  {
    id: "pro", 
    name: "Pro",
    description: "High ratings, reliable. Lower commission and better visibility.",
    icon: "images/search/tutor-ranking/pro" // You can replace this with your actual icon component
  },
  {
    id: "master",
    name: "Master", 
    description: "Top ratings, high volume. Lowest commission and maximum search boost.",
    icon: "images/search/tutor-ranking/master" // You can replace this with your actual icon component
  }
];

export function RankingDropdown() {
  const [selected, setSelected] = useState("Show all in this ranking");

  return (
    <BaseDropdown 
      label="Tutor Ranking" 
      placeholder={selected} 
      dropdownHeight={252}
      isSelected={selected !== "Show all in this ranking"}
      enableScrolling={false}
    >
      <div className="flex flex-col">
        {RANKINGS.map((ranking, index) => {
          const isFirst = index === 0;
          const isLast = index === RANKINGS.length - 1;
          
          return (
            <button
              key={ranking.id}
              onClick={() => setSelected(ranking.name)}
              className={`h-full flex items-start w-full border-b px-4 py-3 text-left transition ${
                isFirst ? 'rounded-t-[12px]' : ''
              } ${
                isLast ? 'rounded-b-[12px] border-b-0' : ''
              } ${
                !isFirst && !isLast ? 'rounded-none' : ''
              } ${
                selected === ranking.name
                  ? "bg-electric-violet-50 text-electric-violet-600"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex-shrink-0 mt-1">
                  <Image
                    src={`/${ranking.icon}.svg`}
                    alt={`${ranking.name} ranking icon`}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className={`font-semibold text-sm ${
                    selected === ranking.name ? "text-electric-violet-600" : "text-neutral-900"
                  }`}>
                    {ranking.name}
                  </span>
                  <span className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    {ranking.description}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </BaseDropdown>
  );
}
