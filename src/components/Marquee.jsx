import { MARQUEE_ITEMS } from '../data/content.js'

/** Seamless CSS marquee — decorative duplicate is hidden from screen readers. */
export default function Marquee() {
  const track = (hidden) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {MARQUEE_ITEMS.map((item) => (
        <li key={item} className="marquee-item">
          <span className="marquee-star" aria-hidden="true">
            ✦
          </span>
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="marquee" role="marquee" aria-label="Core technologies: Python, FastAPI, SQL, PostgreSQL, REST APIs, software development">
      <div className="marquee-inner">
        {track(false)}
        {track(true)}
      </div>
    </div>
  )
}
