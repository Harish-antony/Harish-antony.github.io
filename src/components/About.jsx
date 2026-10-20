import SectionHeader from './SectionHeader.jsx'
import { PROFILE } from '../data/content.js'

const FACTS = [
  { k: 'BASE', v: 'Puducherry, India' },
  { k: 'ROLE', v: 'Junior Software Developer' },
  { k: 'EDUCATION', v: 'MCA — 2026' },
  { k: 'CORE', v: 'Python · SQL · FastAPI' },
  { k: 'MODE', v: 'Independent, end-to-end' },
]

export default function About() {
  return (
    <section id="about" className="section section--about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          kicker="About"
          id="about-title"
          title={
            <>
              Developer first.
              <span className="h-accent"> Always shipping.</span>
            </>
          }
        />

        <div className="about-grid">
          <div className="about-copy" data-reveal>
            <p>
              I'm Harish — a junior software developer from Puducherry who
              enjoys the whole journey of an idea: designing the database,
              building the API behind it, and shipping the interface that ties
              everything together.
            </p>
            <p>
              I'm completing my <strong>MCA (2026)</strong> at Pope John Paul II
              College of Education, and I've built my portfolio the honest way —
              by making things. <strong>KnowledgeOS</strong>, an AI
              knowledge-management backend, and <strong>PRICI WEB</strong>, a
              chit fund management app, were both designed and built
              independently from schema to deployment.
            </p>
            <p>
              Alongside my studies I freelance — building landing pages for real
              clients, including a{' '}
              <a
                href="https://harish-antony.github.io/keerthana-associates"
                target="_blank"
                rel="noopener noreferrer"
              >
                live site for an EHS consultancy
              </a>{' '}
              — and editing videos. I'm now looking for a junior software
              development role or freelance projects where I can contribute
              through practical engineering and keep learning fast.
            </p>

            <div className="about-approach" aria-label="How I work">
              <div className="approach-step">
                <span className="approach-dot" aria-hidden="true" />
                <h3>Understand</h3>
                <p>Start from the actual problem, not the stack.</p>
              </div>
              <div className="approach-step">
                <span className="approach-dot" aria-hidden="true" />
                <h3>Build</h3>
                <p>Schema, API, interface — designed to work together.</p>
              </div>
              <div className="approach-step">
                <span className="approach-dot" aria-hidden="true" />
                <h3>Ship</h3>
                <p>Deploy it, hand it over, keep improving it.</p>
              </div>
            </div>
          </div>

          <aside className="about-aside" data-reveal>
            <div className="fact-panel" aria-label="Quick facts">
              <p className="fact-panel-title">
                <span aria-hidden="true">~/</span>harish — quick facts
              </p>
              <dl>
                {FACTS.map((f) => (
                  <div className="fact-row" key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="status-card">
              <span className="status-pulse" aria-hidden="true" />
              <div>
                <p className="status-card-title">Open to opportunities</p>
                <p className="status-card-text">
                  Junior software development roles &amp; suitable freelance
                  projects. Say hi —{' '}
                  <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
