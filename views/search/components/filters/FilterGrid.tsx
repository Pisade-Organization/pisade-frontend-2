import { ReactNode } from "react";

interface FilterGridProps {
  children: ReactNode;
}

export default function FilterGrid({ children }: FilterGridProps) {
  return (
    <div className="w-full">
      {/* 📱 Mobile/Tablet — horizontal scroll */}
      <div
        className="w-full flex items-center gap-2 overflow-x-auto lg:hidden scroll-smooth no-scrollbar"
      >
        {children}
      </div>

      {/* 💻 Desktop — grid layout */}
      <div
        className="hidden lg:grid gap-3 px-2"
        style={{
          gridTemplateAreas: `
            "item1 item2 item3 item4"
            "item5 item6 item7 item7"
          `,
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
        }}
      >
        {children}
      </div>

      {/* ✅ Hide scrollbar on mobile */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
