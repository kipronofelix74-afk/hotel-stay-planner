export const formatPrice = (n) => `KES ${Number(n).toLocaleString('en-KE')}`;

export function getRooms(hotel) {
  return [
    { id: 'standard', name: 'Standard room', desc: 'Queen bed, sleeps 2', price: hotel.price },
    { id: 'deluxe', name: 'Deluxe room', desc: 'King bed, balcony, sleeps 2', price: Math.round((hotel.price * 1.4) / 100) * 100 },
    { id: 'family', name: 'Family suite', desc: 'Two bedrooms, sleeps 4', price: Math.round((hotel.price * 1.9) / 100) * 100 },
  ];
}

export function countNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.round(ms / 86400000));
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const imageUrl = (file) => `${import.meta.env.BASE_URL}images/${encodeURIComponent(file)}`;
