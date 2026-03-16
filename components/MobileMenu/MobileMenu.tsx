"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SearchMenuButton from "./SearchMenuButton";
import TutorDetailMenuButton from "./TutorDetailMenuButton";
import DashboardMenuButton from "./DashboardMenuButton";
import MobileMenuOverlay from "./MobileMenuOverlay";

// ------------------ Main ------------------ //
export default function MobileMenu({
  variant = "search",
}: {
  variant?: "search" | "tutor_detail" | "student_dashboard" | "tutor_dashboard";
}) {
  const [open, setOpen] = useState(false);

  const renderMenuButton = () => {
    switch (variant) {
      case "search":
        return <SearchMenuButton onClick={() => setOpen(true)} />;
      case "tutor_detail":
        return <TutorDetailMenuButton />;
      case "student_dashboard":
      case "tutor_dashboard":
        return <DashboardMenuButton onClick={() => setOpen(true)} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderMenuButton()}

      <AnimatePresence>
        {open && <MobileMenuOverlay setOpen={setOpen} variant={variant} />}
      </AnimatePresence>
    </>
  );
}
