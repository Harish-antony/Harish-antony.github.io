import { useCallback, useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import { PROJECTS } from '../data/content.js'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'
import { ArrowUpRight, ChevronLeft, ChevronRight, Github } from './Icons.jsx'
import KnowledgeOSArt from './projectArt/KnowledgeOSArt.jsx'
import PriciArt from './projectArt/PriciArt.jsx'
import DataArt from './projectArt/DataArt.jsx'
import KeerthanaArt from './projectArt/KeerthanaArt.jsx'

const ART = {
  knowledgeos: KnowledgeOSArt,
  prici: PriciArt,
  data: DataArt,
  keerthana: KeerthanaArt,
}

const AUTOPLAY_MS = 7000

export default function Projects() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef(null)
  const regionRef = useRef(null)

  const count = PROJECTS.length
  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count])

  /* Autoplay — paused on hover/focus, disabled entirely for reduced motion. */
  useEffect(() => {
    if (paused || reduced) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, reduced, count])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index - 1)
    }
  }

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
    setPaused(true)
  }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 42) go(index + (dx < 0 ? 1 : -1))
    touchX.current = null
    setPaused(false)
  }

  return (
    <section id="projects" className="section section--projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          index="03"
          kicker="Selected Work"
          id="projects-title"
          title={
            <>
              Things I've <span className="h-accent">built &amp; shipped.</span>
            </>
          }
          lede="Four projects, each built end-to-end — backend systems, a Flutter app, analytics dashboards, and a live client site."
        />

        <div
          ref={regionRef}
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <p className="sr-only" aria-live="polite">
            Showing project {index + 1} of {count}: {PROJECTS[index].name}
          </p>

          <div className="carousel-stage">
            {PROJECTS.map((project, i) => {
              const Art = ART[project.art]
              const activeSlide = i === index
              return (
                <article
                  key={project.id}
                  className={`slide ${activeSlide ? 'is-active' : ''}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Project ${i + 1} of ${count}: ${project.name}`}
                  aria-hidden={!activeSlide}
                >
                  <div className="slide-media">
                    <Art />
                  </div>

                  <div className="slide-info">
                    <p className="slide-category">
                      <span className="slide-cat-dot" aria-hidden="true" />
                      {project.category}
                    </p>
                    <h3 className="slide-title">{project.name}</h3>
                    <p className="slide-blurb">{project.blurb}</p>
                    <ul className="slide-points">
                      {project.points.map((p) => (
                        <li key={p}>
                          <span aria-hidden="true">▹</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <ul className="slide-stack" aria-label="Built with">
                      {project.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>

                    {project.links.length > 0 && (
                      <div className="slide-links">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            className="slide-link"
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            tabIndex={activeSlide ? 0 : -1}
                          >
                            {link.href.includes('github.com') ? (
                              <Github width={14} height={14} />
                            ) : (
                              <ArrowUpRight width={14} height={14} />
                            )}
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    <p className="slide-note">
                      <span aria-hidden="true">i</span> {project.note}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="carousel-controls">
            <button
              type="button"
              className="carousel-btn"
              onClick={() => go(index - 1)}
              aria-label="Previous project"
            >
              <ChevronLeft width={17} height={17} />
            </button>

            <div className="carousel-dots" role="tablist" aria-label="Choose project">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show project ${i + 1}: ${p.name}`}
                  className={`carousel-dot ${i === index ? 'is-active' : ''}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>

            <p className="carousel-counter" aria-hidden="true">
              <span className="counter-current">{String(index + 1).padStart(2, '0')}</span>
              <span className="counter-sep">/</span>
              {String(count).padStart(2, '0')}
            </p>

            <button
              type="button"
              className="carousel-btn"
              onClick={() => go(index + 1)}
              aria-label="Next project"
            >
              <ChevronRight width={17} height={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
