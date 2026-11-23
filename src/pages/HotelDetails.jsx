import { Link, useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import StatusMessage from '../components/StatusMessage';
import useFetch from '../hooks/useFetch';
import { useStays } from '../context/StaysContext';
import { getHotel } from '../api';
import { imageUrl } from '../utils';

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addBooking } = useStays();
  const { data: hotel, loading, error, retry } = useFetch(() => getHotel(id), [id]);

  const handleBook = async (booking) => {
    await addBooking(booking);
    navigate('/stays');
  };

  return (
    <>
      <Link to="/hotels" className="link back">← Back to results</Link>
      <StatusMessage loading={loading} error={error} onRetry={retry} />
      {hotel && (
        <>
          {hotel.image && (
            <img
              className="details-photo"
              src={imageUrl(hotel.image)}
              alt={`${hotel.name} in ${hotel.city}`}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          )}
          <h1>Book {hotel.name}</h1>
          <p className="muted lead-sm">{hotel.city} · ★ {hotel.rating} · {hotel.description}</p>
          <BookingForm hotel={hotel} onSubmit={handleBook} />
        </>
      )}
    </>
  );
}
