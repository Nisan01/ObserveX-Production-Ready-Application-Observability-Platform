const API_BASE = '/api';

export async function createOrder(order) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.message || err.error || 'Order failed');
  }
  return res.json();
}

export async function getOrders() {
  const res = await fetch(`${API_BASE}/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
