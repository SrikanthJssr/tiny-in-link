export default function StatsCard({ link }) {
  if (!link) return null;

  return (
    <div className="stats-card">
      <h2 className="stats-title">Link Details</h2>

      <div className="stats-row">
        <span className="label">Short Code:</span>
        <span className="value code-value">{link.code}</span>
      </div>

      <div className="stats-row">
        <span className="label">Original URL:</span>
        <a className="value link-url" href={link.target_url} target="_blank">
          {link.target_url}
        </a>
      </div>

      <div className="stats-row">
        <span className="label">Total Clicks:</span>
        <span className="value">{link.click_count}</span>
      </div>

      <div className="stats-row">
        <span className="label">Created At:</span>
        <span className="value">
          {new Date(link.created_at).toLocaleString()}
        </span>
      </div>

      {link.last_clicked && (
        <div className="stats-row">
          <span className="label">Last Clicked:</span>
          <span className="value">
            {new Date(link.last_clicked).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
