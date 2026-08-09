import { useEffect, useState } from 'react';
import { fetchList } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError('');

      try {
        const { items, pagination } = await fetchList('users', page);
        setUsers(items);
        setPagination(pagination);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [page]);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <p>Users are loaded from the backend API using the Codespaces-aware base URL.</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id ?? `${user.name}-${user.email}`}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
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

export default Users;
