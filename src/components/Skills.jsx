import SectionHeader from './SectionHeader.jsx'
import { SKILL_GROUPS } from '../data/content.js'

export default function Skills() {
  return (
    <section id="skills" className="section section--skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          kicker="Technical Skills"
          id="skills-title"
          title={
            <>
              The toolkit, <span className="h-accent">as used.</span>
            </>
          }
          lede="Grouped exactly as they appear on my résumé — no percentages, no theatrics. These are the tools I reach for when building real projects."
        />

        <div className="skills-grid">
          {SKILL_GROUPS.map((group) => (
            <article
              key={group.title}
              className={`skill-group ${group.wide ? 'skill-group--wide' : ''}`}
              data-reveal
            >
              <p className="skill-group-head">
                <span className="skill-group-bullet" aria-hidden="true" />
                {group.title}
              </p>
              <ul className="skill-list">
                {group.skills.map((s) => (
                  <li key={s} className="skill-chip">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="skills-footnote" data-reveal>
          <span aria-hidden="true">//</span> Fundamentals carried from my CS
          degree: OOP, data structures, DBMS and the software development life
          cycle.
        </p>
      </div>
    </section>
  )
}
