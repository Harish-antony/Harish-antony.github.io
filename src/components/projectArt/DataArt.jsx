/** Illustrative analytics panels — charts show shape, not invented values. */

const LINE_POINTS = [0, 34, 22, 52, 44, 74, 62, 92, 78, 108, 96, 124]
const BARS = [62, 88, 45, 74, 92, 58, 80]

export default function DataArt() {
  const w = 260
  const h = 96
  const max = Math.max(...LINE_POINTS)
  const pts = LINE_POINTS.map(
    (v, i) => `${(i / (LINE_POINTS.length - 1)) * w},${h - (v / max) * (h - 10) - 4}`,
  )
  const path = pts.join(' ')
  const area = `0,${h} ${path} ${w},${h}`

  return (
    <div className="art art-data" aria-hidden="true">
      <div className="data-panel">
        <div className="data-panel-head">
          <span className="data-dot" />
          STOCK PRICE TREND <em>· streamlit</em>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="data-line" preserveAspectRatio="none">
          <defs>
            <linearGradient id="dataFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c6f135" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#c6f135" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={area} fill="url(#dataFill)" />
          <polyline
            points={path}
            fill="none"
            stroke="#c6f135"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div className="data-axis">
          <span>open</span>
          <span>cleaned · pandas</span>
          <span>close</span>
        </div>
      </div>

      <div className="data-panel data-panel--bar">
        <div className="data-panel-head">
          <span className="data-dot data-dot--cyan" />
          ATTENDANCE / PRODUCTIVITY <em>· tableau</em>
        </div>
        <div className="data-bars">
          {BARS.map((b, i) => (
            <span
              key={i}
              className="data-bar"
              style={{ height: `${b}%`, animationDelay: `${i * 90}ms` }}
            />
          ))}
        </div>
        <div className="data-axis">
          <span>mon</span>
          <span>wed</span>
          <span>fri</span>
        </div>
      </div>
    </div>
  )
}
