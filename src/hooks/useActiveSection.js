import { useEffect, useState } from 'react'

/** Tracks which page section is currently in view (for nav + mini-cat). */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] ?? null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    if (!('IntersectionObserver' in window)) {
      const onScroll = () => {
        const y = window.scrollY + window.innerHeight * 0.4
        let current = sections[0].id
        sections.forEach((s) => {
          if (s.offsetTop <= y) current = s.id
        })
        setActive(current)
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      // A slim horizontal band around the upper-middle of the viewport.
      reduced
        ? { rootMargin: '-40% 0px -55% 0px' }
        : { rootMargin: '-38% 0px -56% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids])

  return active
}
