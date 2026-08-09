import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Modern multi-tier fitness tracker initialized with React 19 and Vite.</p>
      <p>Frontend on port 5173, backend on port 8000, MongoDB on port 27017.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
