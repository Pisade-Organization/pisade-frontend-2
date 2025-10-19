"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { Menu } from "lucide-react";

import MobileMenuHeader from "./MobileMenuHeader";
import { Calendar } from "lucide-react";
import { Heart } from "lucide-react";

export default function MobileMenu({
  variant = "default"
}: {
  variant?: "search" | "default" | "student_dashboard" | "tutor_dashboard"
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MENU BUTTON */}
        {variant === "search" && 
          <button
          onClick={() => setOpen(true)}
          className="w-11 h-11 rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
          style={{
            background: "linear-gradient(110.21deg, rgba(255, 255, 255, 0.7) 2.78%, rgba(255, 250, 203, 0.534754) 58.48%, rgba(255, 57, 57, 0.07) 72.66%, rgba(255, 255, 255, 0.595) 100%)",
          }}
          >
              <div className="bg-black rounded-lg h-full w-full flex items-center justify-center bg-gradient-to-r from-white/5 to-white/25">
                  <Menu width={20} height={20} color={'white'} />
              </div>
          </button>
        }

        {variant === "default" && 
          <div className="flex justify-center items-center">
              <button className="w-11 h-11 flex justify-center items-center">
                <Calendar size={24} className="text-neutral-700"/>
              </button>

              <button className="w-11 h-11 flex justify-center items-center">
                <Heart size={24} className="text-neutral-700"/>
              </button>
          </div>
        }

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col gap-y-1 px-4 py-3"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            <MobileMenuHeader setOpen={setOpen}/>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
