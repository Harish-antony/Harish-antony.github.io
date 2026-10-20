import SectionHeader from './SectionHeader.jsx'
import { PROFILE } from '../data/content.js'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from './Icons.jsx'

const CHANNELS = [
  {
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: PROFILE.phone,
    href: PROFILE.phoneHref,
    icon: Phone,
  },
  {
    label: 'GitHub',
    value: 'github.com/Harish-antony',
    href: PROFILE.github,
    icon: Github,
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/harish-antony',
    href: PROFILE.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: 'Location',
    value: PROFILE.location,
    href: null,
    icon: MapPin,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section section--contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          kicker="Contact"
          id="contact-title"
          title={
            <>
              Have an idea?
              <span className="h-accent"> Let's build something useful.</span>
            </>
          }
          lede="I'm interested in junior software development opportunities and freelance projects where I can contribute through practical engineering and continuous learning."
        />

        <div className="contact-grid">
          <a className="contact-primary" href={`mailto:${PROFILE.email}`} data-reveal>
            <p className="contact-primary-label">Start with an email</p>
            <p className="contact-primary-value">{PROFILE.email}</p>
            <span className="contact-primary-cta">
              Write to me
              <ArrowUpRight width={18} height={18} />
            </span>
          </a>

          <ul className="contact-channels" data-reveal>
            {CHANNELS.map((c) => {
              const Icon = c.icon
              const content = (
                <>
                  <span className="channel-icon">
                    <Icon width={15} height={15} />
                  </span>
                  <span className="channel-text">
                    <span className="channel-label">{c.label}</span>
                    <span className="channel-value">{c.value}</span>
                  </span>
                  {c.external && (
                    <ArrowUpRight
                      width={13}
                      height={13}
                      className="channel-ext"
                      aria-hidden="true"
                    />
                  )}
                </>
              )
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      className="channel"
                      href={c.href}
                      target={c.external ? '_blank' : undefined}
                      rel={c.external ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="channel channel--static">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <p className="contact-reach" data-reveal>
          <span className="status-dot" aria-hidden="true" />
          Fastest reply: email or LinkedIn. I read everything.
        </p>
      </div>
    </section>
  )
}
