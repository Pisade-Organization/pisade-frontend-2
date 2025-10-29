import { motion } from "framer-motion";
import MobileMenuHeader from "./MobileMenuHeader";
import SearchOverlay from "./Overlays/SearchOverlay";

export default function MobileMenuOverlay({ 
  setOpen, 
  variant 
  }: 
  { 
    setOpen: (open: boolean) => void, 
    variant: "search" | "tutor_detail" | "student_dashboard" | "tutor_dashboard"
  }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col gap-y-1 px-4 py-3"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ type: "spring", stiffness: 260, damping: 25 }}
    >
      <MobileMenuHeader setOpen={setOpen} />
      { variant === "search" && <SearchOverlay />}
      
    </motion.div>
  );
}


