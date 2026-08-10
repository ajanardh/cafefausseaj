import { useState } from 'react';
import { subscribeNewsletter } from '../api/client';
import './Newsletter.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter({ compact = false }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);

    try {
      const result = await subscribeNewsletter({ email: email.trim() });
      setStatus({ type: 'success', message: result.message });
      setEmail('');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`newsletter ${compact ? 'newsletter-compact' : ''}`}>
      {!compact && <span className="section-label">Stay Connected</span>}
      <h4>{compact ? 'Newsletter' : 'Join Our Newsletter'}</h4>
      {!compact && (
        <p className="text-muted">
          Receive seasonal menus, special events, and exclusive offers.
        </p>
      )}

      {status.message && (
        <div className={`alert alert-${status.type === 'success' ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          aria-label="Email address"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
