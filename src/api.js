const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_BASE_URL : '';
const STORAGE_KEY = 'stayplan_bookings';

const headers = { 'Content-Type': 'application/json' };

export async function getHotels() {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/hotels`);
    if (!res.ok) throw new Error(`Could not load hotels (${res.status})`);
    return res.json();
  }
  const res = await fetch(`${import.meta.env.BASE_URL}hotels.json`);
  if (!res.ok) throw new Error(`Could not load hotels (${res.status})`);
  return res.json();
}

export async function getHotel(id) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/hotels/${id}`);
    if (!res.ok) throw new Error(`Could not load hotel (${res.status})`);
    return res.json();
  }
  const hotels = await getHotels();
  const hotel = hotels.find((h) => String(h.id) === String(id));
  if (!hotel) throw new Error('Hotel not found');
  return hotel;
}

export async function getBookings() {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error(`Could not load bookings (${res.status})`);
    return res.json();
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

export async function createBooking(booking) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers,
      body: JSON.stringify(booking),
    });
    if (!res.ok) throw new Error(`Could not save booking (${res.status})`);
    return res.json();
  }
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const created = { ...booking, id: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, created]));
  return created;
}

export const addBooking = createBooking;

export async function updateBooking(id, updates) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`Could not update booking (${res.status})`);
    return res.json();
  }
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  let updatedItem = null;
  const next = current.map((b) => {
    if (String(b.id) === String(id)) {
      updatedItem = { ...b, ...updates };
      return updatedItem;
    }
    return b;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return updatedItem;
}

export async function deleteBooking(id) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Could not delete booking (${res.status})`);
    return res.json();
  }
  const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(current.filter((b) => String(b.id) !== String(id)))
  );
  return { id };
}