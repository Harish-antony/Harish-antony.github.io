import { useEffect, useMemo, useRef, useState } from 'react'
import { NAV_LINKS, PROFILE } from '../data/content.js'
import useActiveSection from '../hooks/useActiveSection.js'
import { Download, Menu, X } from './Icons.jsx'

const linkIds = NAV_LINKS.map((l) => l.id)

export default function Nav() {
  const active = useActiveSection(linkIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const burgerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + Escape handling while the mobile menu is open.
  // `menu-open` also hides the mini-cat so it can never overlap the menu.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    document.body.classList.add('menu-open')
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        burgerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const desktopLinks = NAV_LINKS.filter((l) =>
    ['about', 'skills', 'projects', 'experience', 'contact'].includes(l.id),
  )

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Harish A — back to top"
          onClick={() => setOpen(false)}
        >
          <span className="wordmark-mark">HA</span>
          <span className="wordmark-dot" aria-hidden="true" />
          <span className="wordmark-sub">harish.dev</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {desktopLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${active === link.id ? 'is-active' : ''}`}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="btn btn--ghost btn--sm nav-resume" href={PROFILE.resume} download>
            <Download width={14} height={14} />
            Resume
          </a>
          <button
            ref={burgerRef}
            className="nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X width={20} height={20} /> : <Menu width={20} height={20} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open ? true : undefined}
      >
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-link ${active === link.id ? 'is-active' : ''}`}
              style={{ transitionDelay: open ? `${0.05 + i * 0.04}s` : '0s' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="btn btn--accent mobile-resume"
          href={PROFILE.resume}
          download
          onClick={() => setOpen(false)}
        >
          <Download width={15} height={15} />
          Download Résumé
        </a>
      </div>
    </header>
  )
}
