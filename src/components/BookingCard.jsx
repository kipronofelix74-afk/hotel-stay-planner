import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatPrice } from '../utils';

export default function BookingCard({ booking, onCancel, onDelete }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const cancelled = booking.status === 'Cancelled';

  const run = async (action) => {
    setBusy(true);
    setError('');
    try {
      await action(booking.id);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <article className="card booking-card">
      <div className="row-between wrap">
        <div>
          <div className="title-row">
            <h2>{booking.hotelName}</h2>
            <span className={cancelled ? 'pill pill-cancelled' : 'pill pill-ok'}>{booking.status}</span>
          </div>
          <p className="muted">
            {booking.city} · {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)} · {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
          </p>
          <p>{booking.roomName}, {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'} · <strong>{formatPrice(booking.total)}</strong></p>
        </div>
        <div className="actions">
          <Link to={`/hotels/${booking.hotelId}`} className="btn btn-soft">View hotel</Link>
          {!cancelled && (
            <button type="button" className="btn btn-secondary btn-danger" disabled={busy} onClick={() => run(onCancel)}>
              Cancel booking
            </button>
          )}
          <button type="button" className="btn btn-secondary" disabled={busy} onClick={() => run(onDelete)}>
            Remove
          </button>
        </div>
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </article>
  );
}
