import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="hero">
      <h1>Page not found</h1>
      <p className="lead">That page doesn't exist.</p>
      <Link to="/" className="btn btn-primary btn-lg">Go home</Link>
    </div>
  );
}
