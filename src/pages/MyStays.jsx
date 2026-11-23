import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookingCard from '../components/BookingCard';
import FilterChips from '../components/FilterChips';
import StatusMessage from '../components/StatusMessage';
import { useStays } from '../context/StaysContext';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'Confirmed', label: 'Confirmed' },
  { id: 'Cancelled', label: 'Cancelled' },
];

export default function MyStays() {
  const { bookings, loading, error, loadBookings, cancelBooking, removeBooking } = useStays();
  const [tab, setTab] = useState('all');

  const shown = bookings.filter((b) => tab === 'all' || b.status === tab);

  return (
    <>
      <h1>My stays</h1>
      <FilterChips options={tabs} value={tab} onChange={setTab} />
      <StatusMessage
        loading={loading}
        error={error}
        onRetry={loadBookings}
        empty={!loading && !error && shown.length === 0 ? 'No stays here yet.' : null}
      />
      <div className="stack">
        {shown.map((b) => (
          <BookingCard key={b.id} booking={b} onCancel={cancelBooking} onDelete={removeBooking} />
        ))}
      </div>
      <p><Link to="/hotels" className="btn btn-soft">Plan another stay</Link></p>
    </>
  );
}
