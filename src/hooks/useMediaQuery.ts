import { useEffect, useState } from "react";

/**
 * A custom hook that returns whether a media query matches.
 * @param query - Media query to check
 * @returns Whether the media query matches
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 768px)"); // true if the viewport is 768px or smaller
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
