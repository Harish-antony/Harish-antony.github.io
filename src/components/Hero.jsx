import { useRef } from 'react'
import { HERO_CHIPS, PROFILE } from '../data/content.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'
import portrait from '../assets/harish-portrait.webp'
import { ArrowRight, Download, Mail } from './Icons.jsx'

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const frameRef = useRef(null)
  const rafRef = useRef(0)

  /* Restrained perspective tilt — pointer-fine devices, motion allowed only. */
  const onPointerMove = (e) => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const el = frameRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1100px) rotateY(${px * 7}deg) rotateX(${py * -7}deg)`
    })
  }
  const onPointerLeave = () => {
    cancelAnimationFrame(rafRef.current)
    const el = frameRef.current
    if (el) el.style.transform = 'perspective(1100px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div className="hero-glow hero-glow--lime" />
        <div className="hero-glow hero-glow--cyan" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-status hero-fx" style={{ '--fx-delay': '0ms' }}>
            <span className="status-dot" aria-hidden="true" />
            Independent Developer · Puducherry, India
          </p>

          <h1 id="hero-title" className="hero-title hero-fx" style={{ '--fx-delay': '90ms' }}>
            Building <em>useful</em> software.
            <span className="hero-title-line">
              One problem <span className="title-outline">at a time.</span>
            </span>
          </h1>

          <p className="hero-sub hero-fx" style={{ '--fx-delay': '200ms' }}>
            I build backend applications, database-driven systems and practical
            digital experiences using Python, SQL, FastAPI and modern web
            technologies.
          </p>

          <div className="hero-ctas hero-fx" style={{ '--fx-delay': '300ms' }}>
            <a className="btn btn--accent" href="#projects">
              Explore My Work
              <ArrowRight width={15} height={15} />
            </a>
            <a className="btn btn--outline" href="#contact">
              <Mail width={15} height={15} />
              Contact Me
            </a>
            <a className="btn btn--ghost" href={PROFILE.resume} download>
              <Download width={15} height={15} />
              View Resume
            </a>
          </div>

          <ul className="hero-chips hero-fx" style={{ '--fx-delay': '400ms' }} aria-label="Core technologies">
            {HERO_CHIPS.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </div>

        <div
          className="hero-visual hero-fx"
          style={{ '--fx-delay': '160ms' }}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <div className="portrait-orbit" aria-hidden="true">
            <svg viewBox="0 0 480 480" className="orbit-ring">
              <circle cx="240" cy="240" r="228" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 9" />
            </svg>
            <span className="orbit-node orbit-node--a" />
            <span className="orbit-node orbit-node--b" />
          </div>

          <figure className="portrait-frame" ref={frameRef}>
            <div className="portrait-backplate" aria-hidden="true" />
            <img
              src={portrait}
              width="960"
              height="1200"
              alt="Portrait of Harish A, junior software developer"
              fetchpriority="high"
            />
            <span className="portrait-float chip-float chip-float--api">
              <span className="float-dot" aria-hidden="true" />
              FastAPI
            </span>
            <span className="portrait-float chip-float chip-float--db">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <ellipse cx="12" cy="5" rx="8" ry="3" />
                <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
              </svg>
              PostgreSQL
            </span>

            <div className="portrait-float code-panel" aria-hidden="true">
              <div className="code-panel-bar">
                <i /> <i /> <i />
                <span>harish@dev — api</span>
              </div>
              <pre>
                <code>
                  <span className="tk-dim">$</span> uvicorn main:app{'\n'}
                  <span className="tk-ok">INFO:</span> startup complete{'\n'}
                  <span className="tk-dim">GET</span> /search{' '}
                  <span className="tk-ok">200</span>{' '}
                  <span className="tk-dim">embeddings ✓</span>
                </code>
              </pre>
            </div>
          </figure>
        </div>
      </div>

      <a className="hero-scroll-cue" href="#about" aria-label="Scroll to About section">
        <span className="scroll-track" aria-hidden="true">
          <span className="scroll-thumb" />
        </span>
        scroll
      </a>
    </section>
  )
}
