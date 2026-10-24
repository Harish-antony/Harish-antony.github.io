import SectionHeader from './SectionHeader.jsx'
import { ACHIEVEMENT, CERTIFICATIONS, EDUCATION } from '../data/content.js'
import { GraduationCap, Trophy } from './Icons.jsx'

export default function Education() {
  return (
    <section id="education" className="section section--education" aria-labelledby="education-title">
      <div className="container">
        <SectionHeader
          index="05"
          kicker="Education & Certifications"
          id="education-title"
          title={
            <>
              Grounded in <span className="h-accent">fundamentals.</span>
            </>
          }
        />

        <div className="edu-grid">
          <ol className="edu-timeline" data-reveal>
            {EDUCATION.map((e) => (
              <li className="edu-item" key={e.degree}>
                <span className="edu-node" aria-hidden="true" />
                <div className="edu-card">
                  <div className="edu-card-top">
                    <GraduationCap width={16} height={16} />
                    <span className="edu-year">{e.year}</span>
                  </div>
                  <h3 className="edu-degree">{e.degree}</h3>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-cgpa">
                    <span className="edu-cgpa-label">CGPA</span>
                    <strong>{e.cgpa}</strong>
                    <span className="edu-cgpa-max">/ 10</span>
                    <span className="edu-meter" aria-hidden="true">
                      <span style={{ width: `${parseFloat(e.cgpa) * 10}%` }} />
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="edu-side">
            <div className="cert-panel" data-reveal>
              <p className="cert-title">Certifications</p>
              <ul>
                {CERTIFICATIONS.map((c) => (
                  <li key={c.name}>
                    <span className="cert-check" aria-hidden="true">
                      ✓
                    </span>
                    <span className="cert-name">{c.name}</span>
                    <span className="cert-issuer">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="achievement-card" data-reveal>
              <Trophy width={20} height={20} />
              <div>
                <p className="achievement-title">Achievement</p>
                <p className="achievement-text">{ACHIEVEMENT}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
