import { useState } from 'react';
import { countNights, formatPrice, getRooms, imageUrl } from '../utils';

const today = new Date().toISOString().slice(0, 10);

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address, like name@example.com.';
  if (!form.checkIn) errors.checkIn = 'Choose a check-in date.';
  else if (form.checkIn < today) errors.checkIn = 'Check-in cannot be in the past.';
  if (!form.checkOut) errors.checkOut = 'Choose a check-out date.';
  else if (form.checkIn && form.checkOut <= form.checkIn) errors.checkOut = 'Check-out must be after check-in.';
  return errors;
}

export default function BookingForm({ hotel, onSubmit }) {
  const rooms = getRooms(hotel);
  const [form, setForm] = useState({
    room: 'standard',
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [saving, setSaving] = useState(false);

  const room = rooms.find((r) => r.id === form.room);
  const nights = countNights(form.checkIn, form.checkOut);
  const total = nights * room.price;

  // One onChange handler for every field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    setSubmitError('');
    try {
      await onSubmit({
        hotelId: hotel.id,
        hotelName: hotel.name,
        city: hotel.city,
        roomName: room.name,
        guestName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        notes: form.notes.trim(),
        nights,
        total,
        status: 'Confirmed',
      });
    } catch (err) {
      setSubmitError(err.message);
      setSaving(false);
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: errors[name] ? 'input-error' : undefined,
  });
  const fieldError = (name) =>
    errors[name] ? <p id={`${name}-error`} className="field-error">{errors[name]}</p> : null;

  return (
    <form className="booking-layout" onSubmit={handleSubmit} noValidate>
      <div className="stack">
        {submitError && (
          <div className="alert" role="alert">
            <div>
              <strong>We couldn't send your booking</strong>
              <p>{submitError} Your details are still here.</p>
            </div>
          </div>
        )}

        <fieldset className="card panel">
          <legend>Choose a room</legend>
          {rooms.map((r) => (
            <label key={r.id} className={form.room === r.id ? 'room room-active' : 'room'}>
              <input type="radio" name="room" value={r.id} checked={form.room === r.id} onChange={handleChange} />
              <span className="grow"><strong>{r.name}</strong><span className="muted block">{r.desc}</span></span>
              <strong>{formatPrice(r.price)}</strong>
            </label>
          ))}
        </fieldset>

        <fieldset className="card panel">
          <legend>Your details</legend>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input type="text" {...fieldProps('name')} />
            {fieldError('name')}
          </div>
          <div className="form-row">
            <div className="field grow">
              <label htmlFor="email">Email</label>
              <input type="email" {...fieldProps('email')} />
              {fieldError('email')}
            </div>
            <div className="field grow">
              <label htmlFor="phone">Phone (optional)</label>
              <input type="tel" placeholder="+254 7XX XXX XXX" {...fieldProps('phone')} />
            </div>
          </div>
          <div className="form-row">
            <div className="field grow">
              <label htmlFor="checkIn">Check-in</label>
              <input type="date" min={today} {...fieldProps('checkIn')} />
              {fieldError('checkIn')}
            </div>
            <div className="field grow">
              <label htmlFor="checkOut">Check-out</label>
              <input type="date" min={form.checkIn || today} {...fieldProps('checkOut')} />
              {fieldError('checkOut')}
            </div>
            <div className="field">
              <label htmlFor="guests">Guests</label>
              <select {...fieldProps('guests')}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="notes">Special requests </label>
            <textarea rows="3" placeholder="Late arrival, quiet room, extra pillows…" {...fieldProps('notes')} />
          </div>
        </fieldset>

        <div>
          <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
            {saving ? 'Sending…' : 'Confirm booking'}
          </button>
        </div>
      </div>

      <aside className="card summary">
        <div className="hotel-photo short" style={{ background: hotel.tint }}>
          {hotel.image && (
            <img src={imageUrl(hotel.image)} alt={`${hotel.name} in ${hotel.city}`} onError={(e) => (e.currentTarget.style.display = 'none')} />
          )}
        </div>
        <div className="panel">
          <h2>{hotel.name}</h2>
          <p className="muted">{hotel.city}</p>
          <dl className="summary-list">
            <div><dt>{room.name}</dt><dd>{formatPrice(room.price)} / night</dd></div>
            <div><dt>Nights</dt><dd>{nights || '–'}</dd></div>
          </dl>
          <div className="row-between total">
            <span>Total</span>
            <strong>{nights ? formatPrice(total) : '–'}</strong>
          </div>
        </div>
      </aside>
    </form>
  );
}
