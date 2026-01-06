"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "forward" | "backward";
}

export default function PageTransition({ children, direction = "forward" }: PageTransitionProps) {
  // Animation variants
  const variants = {
    forward: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
    },
    backward: {
      initial: { x: "-100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "100%", opacity: 0 },
    },
  };

  const currentVariants = variants[direction];

  return (
    <motion.div
      initial={currentVariants.initial}
      animate={currentVariants.animate}
      exit={currentVariants.exit}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

