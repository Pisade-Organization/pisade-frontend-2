"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import BookingDialog from "./index";
import { fetchTutorDetailData } from "@/services/tutor";
import { TutorDetailData } from "@/services/tutor/types";
import { BookingDialogI } from "./types";

export default function BookLessonDialogWrapper() {
  const pathname = usePathname();
  const router = useRouter();
  const [tutorId, setTutorId] = useState<string | null>(null);
  const [tutorData, setTutorData] = useState<TutorDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if pathname matches /[locale]/book/[tutorId] or /book/[tutorId] pattern
  useEffect(() => {
    // Match both /en/book/tutorId and /book/tutorId patterns
    const bookPattern = /\/book\/([^/]+)/;
    const match = pathname.match(bookPattern);
    if (match) {
      setTutorId(match[1]);
    } else {
      setTutorId(null);
      setTutorData(null);
    }
  }, [pathname]);

  // Fetch tutor data when tutorId changes
  useEffect(() => {
    if (tutorId) {
      setLoading(true);
      fetchTutorDetailData(tutorId)
        .then((data) => {
          setTutorData(data);
        })
        .catch((error) => {
          console.error("Error fetching tutor data:", error);
          setTutorData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [tutorId]);


  const handleClose = () => {
    // Remove /book/[tutorId] from URL while staying on current page
    const currentPath = pathname;
    const cleanPath = currentPath.replace(/\/book\/[^/]+/, "");
    const locale = currentPath.split("/")[1] || "en";
    const finalPath = cleanPath || `/${locale}`;
    
    router.replace(finalPath);
  };

  const isOpen = !!tutorId;

  // Prepare booking dialog props
  const bookingProps: BookingDialogI | null = tutorData
    ? {
        tutor: {
          id: tutorData.id,
          fullName: tutorData.fullName,
          avatarUrl: tutorData.avatarUrl,
          rating: tutorData.avgRating,
          studentsCount: tutorData.studentsCount,
          lessonsCount: tutorData.lessonsCount,
        },
        lessonOptions: [
          { durationMinutes: 25, price: 10, currency: "USD" },
          { durationMinutes: 50, price: 20, currency: "USD" },
        ],
        selectedLessonDuration: 25,
        timezone: "Etc/GMT+11",
        utcOffset: "GMT -11:00",
        weekRange: {
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
        availability: [],
        isSubmitting: false,
      }
    : null;

  // Full-screen page for both mobile and desktop
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Fullscreen Sheet */}
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col h-screen"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-neutral-50">
              <h2 className="text-neutral-900 text-title-1">Book Lesson</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-neutral-600">Loading...</p>
                </div>
              ) : bookingProps ? (
                <BookingDialog {...bookingProps} />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <p className="text-neutral-600">Tutor not found</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

