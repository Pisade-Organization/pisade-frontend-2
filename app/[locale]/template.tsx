"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState<string | null>(null);

  // Update previous pathname after mount
  useEffect(() => {
    setPrevPathname(pathname);
  }, [pathname]);

  // Determine if current route is booking or checkout
  const isCheckout = pathname.includes("/checkout/");
  const isBooking = pathname.includes("/book/");
  
  // Check if previous route was also booking or checkout
  const prevIsCheckout = prevPathname?.includes("/checkout/");
  const prevIsBooking = prevPathname?.includes("/book/");
  const prevWasBookingOrCheckout = prevIsCheckout || prevIsBooking;
  
  // Only apply transition if both previous and current routes are booking/checkout
  const shouldTransition = (isBooking || isCheckout) && prevWasBookingOrCheckout && prevPathname !== null;
  
  // Determine direction: forward (booking → checkout), backward (checkout → booking)
  const direction = isCheckout ? "forward" : "backward";

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

  // Only apply transitions when navigating between booking and checkout
  if (shouldTransition) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={currentVariants.initial}
          animate={currentVariants.animate}
          exit={currentVariants.exit}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 35,
            mass: 0.8,
          }}
          style={{
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
          }}
          className="w-full min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  // For other pages or initial load, render without transition
  return <>{children}</>;
}

