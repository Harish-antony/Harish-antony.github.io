import SectionHeader from './SectionHeader.jsx'
import { EXPERIENCE, INDEPENDENT_WORK } from '../data/content.js'
import { ArrowUpRight, Terminal } from './Icons.jsx'

export default function Experience() {
  return (
    <section id="experience" className="section section--experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          kicker="Experience"
          id="experience-title"
          title={
            <>
              Where I've <span className="h-accent">been working.</span>
            </>
          }
        />

        <div className="exp-grid">
          <article className="exp-card" data-reveal>
            <p className="exp-type">Freelance · Ongoing</p>
            <h3 className="exp-role">{EXPERIENCE.role}</h3>
            <p className="exp-org">{EXPERIENCE.org}</p>
            <ul className="exp-points">
              {EXPERIENCE.points.map((p) => (
                <li key={p}>
                  <span aria-hidden="true">▹</span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="exp-note">
              Independent freelance work — kept distinct from formal employment.
            </p>
          </article>

          <aside className="exp-log" data-reveal>
            <p className="exp-log-title">
              <Terminal width={14} height={14} />
              independent builds
            </p>
            {INDEPENDENT_WORK.map((w) => (
              <div className="exp-log-row" key={w.name}>
                <div>
                  <p className="exp-log-name">
                    {w.href ? (
                      <a href={w.href} target="_blank" rel="noopener noreferrer">
                        {w.name}
                        <ArrowUpRight width={12} height={12} />
                      </a>
                    ) : (
                      w.name
                    )}
                  </p>
                  <p className="exp-log-detail">{w.detail}</p>
                </div>
                <span className="exp-log-caret" aria-hidden="true">
                  &gt;
                </span>
              </div>
            ))}
            <p className="exp-log-foot">
              Every project on this page was designed, built and deployed by me —
              no team, no shortcuts.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}
