import { NAV_LINKS, PROFILE } from '../data/content.js'
import { Github, Linkedin, Mail } from './Icons.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="wordmark">
            <span className="wordmark-mark">HA</span>
            <span className="wordmark-dot" aria-hidden="true" />
          </p>
          <p className="footer-role">
            {PROFILE.title} — {PROFILE.location}
          </p>
          <p className="footer-note">
            Designed &amp; built by Harish. No templates harmed.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {NAV_LINKS.filter((l) => l.id !== 'home').map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer-social">
          <a href={`mailto:${PROFILE.email}`} aria-label="Email Harish">
            <Mail width={16} height={16} />
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="Harish on GitHub">
            <Github width={16} height={16} />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Harish on LinkedIn">
            <Linkedin width={16} height={16} />
          </a>
        </div>
      </div>

      <div className="container footer-base">
        <p>© {year} Harish A. All rights reserved.</p>
        <a className="footer-top" href="#home">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
