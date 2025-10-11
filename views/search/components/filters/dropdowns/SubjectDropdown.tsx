"use client";

import { BaseDropdown } from "./BaseDropdown";
import { useState } from "react";

const SUBJECTS = [
  "Show All",
  "Thai",
  "Maths",
  "English",
  "Biology",
  "Science",
  "Geology",
  "Medicine",
  "Chemistry",
  "Physics",
];

export function SubjectDropdown() {
  const [selected, setSelected] = useState("Show All");

  return (
    <BaseDropdown 
      label="Subject" 
      placeholder={selected} 
      dropdownHeight={350}
      isSelected={selected !== "Show All"}
    >
      <div className="max-h-[220px] overflow-y-auto flex flex-col">
        {SUBJECTS.map((subject, index) => {
          const isFirst = index === 0;
          const isLast = index === SUBJECTS.length - 1;
          
          return (
            <button
              key={subject}
              onClick={() => setSelected(subject)}
              className={`h-full flex items-center w-full border-b px-3 py-2 text-sm text-left transition ${
                isFirst ? 'rounded-t-[12px]' : ''
              } ${
                isLast ? 'rounded-b-[12px] border-b-0' : ''
              } ${
                !isFirst && !isLast ? 'rounded-none' : ''
              } ${
                selected === subject
                  ? "bg-electric-violet-50 text-electric-violet-600 font-medium"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {subject}
            </button>
          );
        })}
      </div>
    </BaseDropdown>
  );
}
