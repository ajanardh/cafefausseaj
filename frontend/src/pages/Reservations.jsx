import { useState } from 'react';
import { checkAvailability, createReservation } from '../api/client';
import { contactInfo } from '../data/content';
import './Reservations.css';

const initialForm = {
  date: '',
  time: '',
  guest_count: '2',
  name: '',
  email: '',
  phone: '',
};

function Reservations() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setAvailability(null);
  }

  async function handleCheckAvailability(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.date || !form.time) {
      setStatus({ type: 'error', message: 'Please select both a date and time.' });
      return;
    }

    const timeSlot = `${form.date}T${form.time}:00`;

    try {
      const result = await checkAvailability(timeSlot);
      setAvailability(result);
      setStatus({
        type: result.available ? 'success' : 'error',
        message: result.available
          ? `${result.available_tables} table(s) available for this time slot.`
          : 'This time slot is fully booked. Please choose another time.',
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    if (!form.date || !form.time) {
      setStatus({ type: 'error', message: 'Please select both a date and time.' });
      setLoading(false);
      return;
    }

    const timeSlot = `${form.date}T${form.time}:00`;

    try {
      const result = await createReservation({
        time_slot: timeSlot,
        guest_count: Number(form.guest_count),
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
      });

      setStatus({
        type: 'success',
        message: `${result.message} Table ${result.reservation.table_number} is reserved for ${form.guest_count} guest(s).`,
      });
      setForm(initialForm);
      setAvailability(null);
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="section-label">Book Your Visit</span>
          <h1>Reservations</h1>
          <p>
            Reserve your table at Café Fausse. We look forward to welcoming you for an
            exceptional evening.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container reservations-layout">
          <form className="card reservation-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`alert alert-${status.type === 'success' ? 'success' : 'error'}`}>
                {status.message}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(event) => updateField('date', event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time</label>
                <select
                  id="time"
                  value={form.time}
                  onChange={(event) => updateField('time', event.target.value)}
                  required
                >
                  <option value="">Select a time</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="17:30">5:30 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                  <option value="22:00">10:00 PM</option>
                </select>
              </div>
            </div>

            <button type="button" className="btn" onClick={handleCheckAvailability}>
              Check Availability
            </button>

            {availability && (
              <p className="availability-note text-muted">
                {availability.available_tables} of {availability.total_tables} tables
                available.
              </p>
            )}

            <div className="form-group">
              <label htmlFor="guest_count">Number of Guests</label>
              <select
                id="guest_count"
                value={form.guest_count}
                onChange={(event) => updateField('guest_count', event.target.value)}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="name">Customer Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (optional)</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Booking…' : 'Confirm Reservation'}
            </button>
          </form>

          <aside className="card reservation-info">
            <h3>Reservation Details</h3>
            <p className="text-muted">
              Tables are assigned automatically from our 30-table dining room based on
              availability for your selected time slot.
            </p>
            <div className="reservation-hours">
              <h4>Hours</h4>
              <p>{contactInfo.hours.weekday}</p>
              <p>{contactInfo.hours.sunday}</p>
            </div>
            <div className="reservation-hours">
              <h4>Contact</h4>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.address}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default Reservations;
