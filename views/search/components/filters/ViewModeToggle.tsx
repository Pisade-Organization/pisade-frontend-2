"use client";

import { Rows2, Grid2X2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewModeToggle({
  mode,
  setMode,
}: {
  mode: "list" | "grid";
  setMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;
}) {
  return (
    <div className="relative flex items-center justify-between p-1 rounded-[10px] bg-white shadow-sm border border-neutral-50">
        {/* Animated background */}
        <AnimatePresence>
            <motion.div
            layoutId="toggle-bg"
            className="absolute w-[40px] h-[40px] rounded-[8px] bg-electric-violet-500"
            initial={false}
            animate={{
                x: mode === "grid" ? 40 : 0, // distance between buttons
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            />
        </AnimatePresence>

        {/* LIST button */}
        <button
            onClick={() => setMode("list")}
            className="relative z-10 flex items-center justify-center w-[40px] h-[40px] rounded-md"
        >
            <Rows2
            width={20}
            height={20}
            className={`transition-colors ${
                mode === "list" ? "text-white" : "text-neutral-500"
            }`}
            />
        </button>

        {/* GRID button */}
        <button
            onClick={() => setMode("grid")}
            className="relative z-10 flex items-center justify-center w-[40px] h-[40px] rounded-md"
        >
            <Grid2X2
            width={20}
            height={20}
            className={`transition-colors ${
                mode === "grid" ? "text-white" : "text-neutral-500"
            }`}
            />
        </button>
    </div>
);
}
