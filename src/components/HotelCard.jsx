import { Link } from 'react-router-dom';
import { formatPrice, imageUrl } from '../utils';

export default function HotelCard({ hotel }) {
  const tag = hotel.freeCancellation ? 'Free cancellation' : hotel.breakfast ? 'Breakfast included' : null;
  return (
    <article className="card hotel-card">
      <div className="hotel-photo" style={{ background: hotel.tint }}>
        {hotel.image && (
          <img
            src={imageUrl(hotel.image)}
            alt={`${hotel.name} in ${hotel.city}`}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        )}
        {tag && <span className="tag">{tag}</span>}
      </div>
      <div className="hotel-body">
        <div className="row-between">
          <div>
            <h3>{hotel.name}</h3>
            <p className="muted">{hotel.city}</p>
          </div>
          <span className="rating" aria-label={`Rated ${hotel.rating} out of 5`}>★ {hotel.rating}</span>
        </div>
        <div className="row-between hotel-foot">
          <p>
            <strong className="price">{formatPrice(hotel.price)}</strong> <span className="muted">/ night</span>
          </p>
          <Link to={`/hotels/${hotel.id}`} className="btn btn-soft">View and book</Link>
        </div>
      </div>
    </article>
  );
}
