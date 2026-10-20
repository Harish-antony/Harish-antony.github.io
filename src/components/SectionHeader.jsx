/** Shared section header: mono kicker + display title + optional lede. */
export default function SectionHeader({ kicker, title, lede, id }) {
  return (
    <header className="section-header" data-reveal>
      <p className="kicker" aria-hidden="true">
        <span className="kicker-line" />
        <span className="kicker-label">{kicker}</span>
      </p>
      <h2 id={id}>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </header>
  )
}
