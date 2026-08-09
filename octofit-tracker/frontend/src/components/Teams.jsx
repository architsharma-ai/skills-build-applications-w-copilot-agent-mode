import { useEffect, useState } from 'react';
import { fetchList } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      setError('');

      try {
        const { items, pagination } = await fetchList('teams', page);
        setTeams(items);
        setPagination(pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <p>Teams are fetched using the environment-based API URL.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id ?? team.name}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                  <td>{Array.isArray(team.members) ? team.members.join(', ') : team.members}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default Teams;
