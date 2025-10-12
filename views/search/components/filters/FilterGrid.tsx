
import { ReactNode } from "react";

interface FilterGridProps {
    children: ReactNode;
}

export default function FilterGrid({ children }: FilterGridProps) {
    return (
        <div className="w-full">
            {/* Mobile/Tablet: Horizontal scroll */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:hidden">
                {children}
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden lg:grid gap-3" style={{
                gridTemplateAreas: `
                    "item1 item2 item3 item4"
                    "item5 item6 item7 ."
                `,
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)"
            }}>
                {children}
            </div>
        </div>
    );
}