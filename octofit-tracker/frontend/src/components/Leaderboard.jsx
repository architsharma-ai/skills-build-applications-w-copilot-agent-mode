import { useEffect, useState } from 'react';
import { fetchList } from '../api.js';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    async function loadLeaderboard() {
      setLoading(true);
      setError('');

      try {
        const { items, pagination } = await fetchList('leaderboard', page);
        setLeaders(items);
        setPagination(pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <p>Leaderboard data is retrieved from the backend API using the Codespaces-aware URL.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : leaders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {Object.keys(leaders[0]).map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaders.map((leader, index) => (
                <tr key={leader.id ?? index}>
                  {Object.values(leader).map((value, idx) => (
                    <td key={`${idx}-${value}`}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No leaderboard data available.</p>
      )}
      <Pagination pagination={pagination} setPage={setPage} />
    </div>
  );
}

function Pagination({ pagination, setPage }) {
  const { page, totalPages } = pagination;
  if (totalPages <= 1) return null;

  return (
    <div className="btn-group mt-3" role="group">
      <button
        className="btn btn-outline-primary"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-outline-primary"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
      <span className="btn btn-outline-secondary disabled">
        Page {page} of {totalPages}
      </span>
    </div>
  );
}

export default Leaderboard;
