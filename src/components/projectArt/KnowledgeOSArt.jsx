/** Illustrative KnowledgeOS interface — semantic search over an embedding-backed backend. */
export default function KnowledgeOSArt() {
  return (
    <div className="art art-kos" aria-hidden="true">
      <div className="art-window">
        <div className="art-window-bar">
          <i /> <i /> <i />
          <span>knowledgeos — api console</span>
        </div>

        <div className="kos-body">
          <aside className="kos-side">
            <p className="kos-side-title">Collections</p>
            {['Research notes', 'Course material', 'Snippets', 'Archive'].map((c, i) => (
              <p key={c} className={`kos-side-item ${i === 0 ? 'is-active' : ''}`}>
                {c}
              </p>
            ))}
            <p className="kos-side-foot">1,204 vectors · pg · 384-dim</p>
          </aside>

          <div className="kos-main">
            <div className="kos-search">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4-4" />
              </svg>
              <span className="kos-query">
                how do embeddings power search?
                <span className="caret" />
              </span>
              <kbd>⏎</kbd>
            </div>

            {[
              { t: 'Vector embeddings — concept note', s: '0.93' },
              { t: 'Designing the schema for similarity', s: '0.87' },
              { t: 'OpenAI embeddings → PostgreSQL', s: '0.81' },
            ].map((r, i) => (
              <div className="kos-result" key={r.t} style={{ opacity: 1 - i * 0.18 }}>
                <span className="kos-result-dot" />
                <p className="kos-result-title">{r.t}</p>
                <span className="kos-result-sim">sim {r.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="kos-pipeline">
        <span className="pipe-node">documents</span>
        <span className="pipe-arrow" />
        <span className="pipe-node pipe-node--accent">openai embeddings</span>
        <span className="pipe-arrow" />
        <span className="pipe-node">postgresql</span>
        <span className="pipe-arrow" />
        <span className="pipe-node pipe-node--cyan">/search api</span>
      </div>
    </div>
  )
}
