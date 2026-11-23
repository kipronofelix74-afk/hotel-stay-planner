import { Link } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import StatusMessage from '../components/StatusMessage';
import useFetch from '../hooks/useFetch';
import { getHotels } from '../api';

const steps = [
  { title: 'Search', text: 'Look up a destination or hotel and compare nightly prices.' },
  { title: 'Book', text: 'Pick a room and dates, fill in your details and confirm.' },
  { title: 'Manage', text: 'See all your stays in one place and cancel any time.' },
];

export default function Landing() {
  const { data: hotels, loading, error, retry } = useFetch(getHotels);
  const featured = (hotels || []).slice().sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <>
      <section className="hero">
        <h1>Plan your next stay</h1>
        <p className="lead">Search hotels, compare prices per night and keep every booking in one place.</p>
        <div className="hero-actions">
          <Link to="/hotels" className="btn btn-primary btn-lg">Browse stays</Link>
          <Link to="/stays" className="btn btn-secondary btn-lg">My stays</Link>
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
        <div className="grid steps">
          {steps.map((s, i) => (
            <div key={s.title} className="card panel">
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="row-between wrap">
          <h2>Top rated stays</h2>
          <Link to="/hotels" className="link">See all</Link>
        </div>
        <StatusMessage loading={loading} error={error} onRetry={retry} />
        <div className="grid hotels">
          {featured.map((h) => <HotelCard key={h.id} hotel={h} />)}
        </div>
      </section>
    </>
  );
}
