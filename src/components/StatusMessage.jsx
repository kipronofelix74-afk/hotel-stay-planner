// Shows a loading text, an error with a retry button, or an empty state.
export default function StatusMessage({ loading, error, onRetry, empty }) {
  if (loading) return <p className="status" role="status">Loading…</p>;
  if (error) {
    return (
      <div className="alert" role="alert">
        <div>
          <strong>Something went wrong</strong>
          <p>{error}</p>
        </div>
        {onRetry && <button type="button" className="btn btn-secondary" onClick={onRetry}>Try again</button>}
      </div>
    );
  }
  if (empty) return <p className="status">{empty}</p>;
  return null;
}
