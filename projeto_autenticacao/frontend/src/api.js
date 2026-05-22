// Wrapper base — garante credentials: 'include' em todas as chamadas
async function apiFetch(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erro ${res.status}`);
  }

  return res.json();
}

export function login(username, password) {
  return apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function logout() {
  return apiFetch('/api/logout', { method: 'POST' });
}

export function me() {
  return apiFetch('/api/me');
}

export function listProducts() {
  return apiFetch('/api/products');
}

export function createProduct(data) {
  return apiFetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateProduct(id, data) {
  return apiFetch(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteProduct(id) {
  return apiFetch(`/api/products/${id}`, { method: 'DELETE' });
}
