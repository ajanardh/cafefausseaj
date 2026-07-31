const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

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
