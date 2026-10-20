import kaPreview from '../../assets/keerthana-preview.webp'

/**
 * Real screenshot of the live Keerthana Associates prototype
 * (harish-antony.github.io/keerthana-associates), shown in a browser frame.
 */
export default function KeerthanaArt() {
  return (
    <div className="art art-ka" aria-hidden="true">
      <div className="ka-browser">
        <div className="ka-bar">
          <i /> <i /> <i />
          <span className="ka-url">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="12" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            harish-antony.github.io/keerthana-associates
          </span>
        </div>
        <img
          className="ka-shot"
          src={kaPreview}
          width="1200"
          height="586"
          alt=""
          loading="lazy"
        />
      </div>
      <span className="ka-live">
        <span className="ka-live-dot" /> live site · real screenshot
      </span>
    </div>
  )
}
