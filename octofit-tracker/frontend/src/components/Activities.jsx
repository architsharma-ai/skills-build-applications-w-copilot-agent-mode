import { useEffect, useState } from 'react';
import { fetchList } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    async function loadActivities() {
      setLoading(true);
      setError('');

      try {
        const { items, pagination } = await fetchList('activities', page);
        setActivities(items);
        setPagination(pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p>Activities are fetched from the API and support both array and paginated responses.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id ?? `${activity.userId}-${activity.date}`}>
                  <td>{activity.id}</td>
                  <td>{activity.userId}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.date}</td>
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

export default Activities;
