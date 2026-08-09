import { useEffect, useState } from 'react';
import { fetchList } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    async function loadWorkouts() {
      setLoading(true);
      setError('');

      try {
        const { items, pagination } = await fetchList('workouts', page);
        setWorkouts(items);
        setPagination(pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <p>Workout plans are loaded through the backend API with Codespaces-safe URL handling.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading workouts...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id ?? workout.name}>
                  <td>{workout.id}</td>
                  <td>{workout.name}</td>
                  <td>{workout.duration}</td>
                  <td>{workout.difficulty}</td>
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

export default Workouts;
