/** Illustrative PRICI WEB previews — admin and member sides of the Flutter app. */
export default function PriciArt() {
  return (
    <div className="art art-prici" aria-hidden="true">
      <div className="prici-phone prici-phone--admin">
        <p className="prici-phone-tag">admin</p>
        <div className="prici-head">
          <span className="prici-avatar">A</span>
          <div>
            <p className="prici-hi">Group console</p>
            <p className="prici-sub">chit · cycle 07</p>
          </div>
        </div>
        <div className="prici-row">
          <span>Members</span>
          <span className="prici-strong">18</span>
        </div>
        <div className="prici-row">
          <span>Collected</span>
          <span className="prici-strong">₹ —</span>
        </div>
        <div className="prici-table">
          {[
            ['member_04', 'paid'],
            ['member_11', 'paid'],
            ['member_07', 'due'],
          ].map(([m, s]) => (
            <div className="prici-tr" key={m}>
              <span>{m}</span>
              <span className={`prici-badge ${s === 'paid' ? 'is-ok' : 'is-due'}`}>{s}</span>
            </div>
          ))}
        </div>
        <span className="prici-btn">Export CSV</span>
      </div>

      <div className="prici-phone prici-phone--member">
        <p className="prici-phone-tag">member</p>
        <div className="prici-head">
          <span className="prici-avatar prici-avatar--cyan">M</span>
          <div>
            <p className="prici-hi">My chit</p>
            <p className="prici-sub">next due · fri</p>
          </div>
        </div>
        <div className="prici-progress">
          <span className="prici-progress-fill" />
        </div>
        <div className="prici-row">
          <span>Instalment</span>
          <span className="prici-strong">on track</span>
        </div>
        <div className="prici-auth">
          <p className="prici-auth-title">sign-in methods</p>
          <div className="prici-auth-chips">
            <span>G · Google</span>
            <span>@ · Email</span>
            <span># · OTP</span>
          </div>
        </div>
      </div>

      <span className="prici-sprint">solo build · 2-day sprint</span>
    </div>
  )
}
