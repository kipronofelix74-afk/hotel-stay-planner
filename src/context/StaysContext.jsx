import { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../api';

const StaysContext = createContext(null);

export function StaysProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBookings = () => {
    setLoading(true);
    setError('');
    api
      .getBookings()
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadBookings, []);

  // POST
  const addBooking = async (booking) => {
    const saved = await api.createBooking(booking);
    setBookings((prev) => [...prev, saved]);
    return saved;
  };

  
  const cancelBooking = async (id) => {
    const current = bookings.find((b) => b.id === id);
    const updated = await api.updateBooking(id, { ...current, status: 'Cancelled' });
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };

  // DELETE
  const removeBooking = async (id) => {
    await api.deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const value = { bookings, loading, error, loadBookings, addBooking, cancelBooking, removeBooking };
  return <StaysContext.Provider value={value}>{children}</StaysContext.Provider>;
}

export function useStays() {
  const ctx = useContext(StaysContext);
  if (!ctx) throw new Error('useStays must be used inside StaysProvider');
  return ctx;
}
