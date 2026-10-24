import { useEffect, useRef, useState } from 'react'
import { CAT_MESSAGES, NAV_LINKS } from '../data/content.js'
import useActiveSection from '../hooks/useActiveSection.js'
import { X } from './Icons.jsx'

const linkIds = NAV_LINKS.map((l) => l.id)

/**
 * Mini-cat navigator — an illustrated companion that opens a compact
 * navigation panel. Mouse, touch and keyboard friendly; Escape and
 * outside-click close it; focus is never trapped.
 */
export default function MiniCat() {
  const active = useActiveSection(linkIds)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(CAT_MESSAGES.home)
  const [hop, setHop] = useState(false)
  const rootRef = useRef(null)
  const btnRef = useRef(null)
  const hopTimer = useRef(0)

  /* Outside click + Escape while open. Focus returns to the cat button on Escape. */
  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => () => clearTimeout(hopTimer.current), [])

  const toggle = () => {
    setOpen((v) => {
      if (!v) setMessage(CAT_MESSAGES[active] ?? CAT_MESSAGES.home)
      return !v
    })
  }

  const navigate = (id) => {
    setMessage(CAT_MESSAGES[id] ?? "Meow! On my way.")
    setOpen(false)
    clearTimeout(hopTimer.current)
    setHop(true)
    hopTimer.current = setTimeout(() => setHop(false), 750)
  }

  return (
    <div className={`cat-root ${open ? 'is-open' : ''}`} ref={rootRef}>
      <div
        id="cat-panel"
        className="cat-panel"
        role="dialog"
        aria-label="Mini-cat navigation"
        aria-hidden={!open}
      >
        <div className="cat-panel-head">
          <p className="cat-bubble" aria-live="polite">
            {message}
          </p>
          <button
            type="button"
            className="cat-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation panel"
            tabIndex={open ? 0 : -1}
          >
            <X width={14} height={14} />
          </button>
        </div>

        <nav aria-label="Section navigation">
          <ul className="cat-list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`cat-link ${active === link.id ? 'is-active' : ''}`}
                  tabIndex={open ? 0 : -1}
                  onClick={() => navigate(link.id)}
                >
                  {link.label}
                  {active === link.id && (
                    <span className="cat-link-here" aria-hidden="true">
                      ●
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <button
        ref={btnRef}
        type="button"
        className={`cat-btn ${hop ? 'is-hop' : ''}`}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="cat-panel"
        aria-label={open ? 'Close mini-cat navigation' : 'Open mini-cat navigation'}
      >
        <svg className="cat-svg" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="catGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#31405f" />
              <stop offset="100%" stopColor="#1b2536" />
            </linearGradient>
          </defs>

          {/* tail */}
          <path
            className="cat-tail"
            d="M80 96 Q100 102 102 76"
            fill="none"
            stroke="url(#catGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* body */}
          <ellipse cx="55" cy="93" rx="27" ry="21" fill="url(#catGrad)" />
          <ellipse className="cat-chest" cx="49" cy="99" rx="13" ry="11" fill="#e9edf5" opacity="0.14" />

          {/* paws */}
          <rect x="36" y="108" width="13" height="8" rx="4" fill="#31405f" />
          <rect x="56" y="108" width="13" height="8" rx="4" fill="#31405f" />

          {/* head */}
          <g className="cat-head">
            <path className="cat-ear cat-ear--l" d="M31 34 L35 12 L51 26 Z" fill="url(#catGrad)" />
            <path className="cat-ear cat-ear--r" d="M75 34 L71 12 L55 26 Z" fill="url(#catGrad)" />
            <path className="cat-ear-inner" d="M36 29 L38.5 18 L46 25.5 Z" fill="#e0486e" opacity="0.55" />
            <path className="cat-ear-inner" d="M70 29 L67.5 18 L60 25.5 Z" fill="#e0486e" opacity="0.55" />
            <ellipse cx="53" cy="50" rx="25" ry="22" fill="url(#catGrad)" />

            {/* forehead stripes */}
            <path d="M47 31 l2 5 M53 30 l0 5 M59 31 l-2 5" stroke="#e0486e" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" fill="none" />

            {/* eyes — open (blinking) */}
            <g className="cat-eyes-open">
              <g className="cat-eye">
                <circle cx="44" cy="49" r="3.6" fill="#edf1f9" />
                <circle cx="45" cy="49" r="1.5" fill="#0a0f18" />
              </g>
              <g className="cat-eye">
                <circle cx="62" cy="49" r="3.6" fill="#edf1f9" />
                <circle cx="63" cy="49" r="1.5" fill="#0a0f18" />
              </g>
            </g>
            {/* eyes — happy (panel open) */}
            <g className="cat-eyes-happy">
              <path d="M40 50 q4 -5 8 0" fill="none" stroke="#edf1f9" strokeWidth="2" strokeLinecap="round" />
              <path d="M58 50 q4 -5 8 0" fill="none" stroke="#edf1f9" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* nose + mouth */}
            <path d="M51 56 L55 56 L53 59 Z" fill="#e0486e" />
            <path d="M53 59 q-2.5 3.5 -6 2.5 M53 59 q2.5 3.5 6 2.5" fill="none" stroke="#8fa0bb" strokeWidth="1.3" strokeLinecap="round" />

            {/* whiskers */}
            <path d="M34 55 h-9 M34 59 l-8 3 M72 55 h9 M72 59 l8 3" stroke="#8fa0bb" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" fill="none" />
          </g>

          {/* collar */}
          <path d="M40 70 q13 7 26 0 l-1.5 5 q-11.5 5.5 -23 0 Z" fill="#e0486e" />
          <circle cx="53" cy="77" r="2.4" fill="#f6c6d3" />
        </svg>
      </button>
    </div>
  )
}
