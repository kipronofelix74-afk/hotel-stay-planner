import { Link, NavLink } from 'react-router-dom';
import { useStays } from '../context/StaysContext';

export default function Navbar() {
  const { bookings } = useStays();
  const active = bookings.filter((b) => b.status !== 'Cancelled').length;

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20V8l9-5 9 5v12" /><path d="M9 20v-6h6v6" /></svg>
          </span>
          StayPlan
        </Link>
        <nav className="nav-links" aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/hotels">Browse stays</NavLink>
          <NavLink to="/stays">
            My stays {active > 0 && <span className="count-badge">{active}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
