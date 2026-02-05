import { useEffect, useState } from 'react'

/**
 * Media query hook.
 *
 * Used to keep the desktop experience intact while providing lighter
 * fallbacks and larger touch targets on mobile.
 */
export function useMediaQuery(query: string) {
  const getMatch = () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getMatch)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)

    // Set initial and subscribe
    onChange()
    if (mq.addEventListener) mq.addEventListener('change', onChange)
    else mq.addListener(onChange)

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange)
      else mq.removeListener(onChange)
    }
  }, [query])

  return matches
}
