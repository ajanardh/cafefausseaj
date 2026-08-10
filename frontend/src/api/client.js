const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  } catch {
    throw new Error(
      'Unable to reach the reservation server. Start the backend with: cd backend && source venv/bin/activate && python app.py'
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong. Please try again.');
  }

  return data;
}

export function checkAvailability(timeSlot) {
  const params = new URLSearchParams({ time_slot: timeSlot });
  return request(`/reservations/availability?${params}`);
}

export function createReservation(payload) {
  return request('/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function subscribeNewsletter(payload) {
  return request('/newsletter', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
