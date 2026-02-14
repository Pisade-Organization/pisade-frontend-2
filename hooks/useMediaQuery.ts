"use client"

import { useEffect, useState } from "react"

/**
 * Minimal `matchMedia` hook.
 * - `defaultValue` is used during SSR/initial render.
 * - Updates on media query changes.
 */
export default function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(query)

    const onChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Set initial value on mount
    setMatches(mql.matches)

    // Safari < 14 uses addListener/removeListener
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }

    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(onChange)
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(onChange)
  }, [query])

  return matches
}
