import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../api.js';

const empty = { name: '', description: '', price: '', stock: '' };

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#4f46e5', color: '#fff', padding: '1rem 2rem',
  },
  headerTitle: { margin: 0, fontSize: '1.25rem' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #fff', color: '#fff',
    padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer',
  },
  content: { padding: '2rem' },
  newBtn: {
    background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px',
    padding: '0.5rem 1rem', cursor: 'pointer', marginBottom: '1rem',
  },
  formBox: {
    background: '#fff', padding: '1.5rem', borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)', marginBottom: '1.5rem',
    maxWidth: '500px',
  },
  formTitle: { margin: '0 0 1rem', color: '#333' },
  label: { display: 'block', marginBottom: '0.2rem', fontSize: '0.875rem', color: '#555' },
  input: {
    width: '100%', padding: '0.4rem 0.6rem', marginBottom: '0.75rem',
    border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box',
  },
  formActions: { display: 'flex', gap: '0.5rem' },
  saveBtn: {
    background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px',
    padding: '0.45rem 1rem', cursor: 'pointer',
  },
  cancelBtn: {
    background: '#6b7280', color: '#fff', border: 'none', borderRadius: '4px',
    padding: '0.45rem 1rem', cursor: 'pointer',
  },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  th: { background: '#4f46e5', color: '#fff', padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.875rem' },
  td: { padding: '0.75rem 1rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#374151' },
  editBtn: {
    background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px',
    padding: '0.3rem 0.6rem', cursor: 'pointer', marginRight: '0.4rem',
  },
  deleteBtn: {
    background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px',
    padding: '0.3rem 0.6rem', cursor: 'pointer',
  },
  error: { color: '#dc2626', marginBottom: '1rem' },
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const [products, setProducts]   = useState([]);
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]           = useState(empty);
  const [error, setError]         = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await listProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  function openNew() {
    setEditingId(null);
    setForm(empty);
    setShowForm(true);
    setError('');
  }

  function openEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      stock: String(product.stock),
    });
    setShowForm(true);
    setError('');
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(empty);
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
    };
    try {
      if (editingId) {
        const updated = await updateProduct(editingId, payload);
        setProducts(prev => prev.map(p => (p.id === editingId ? updated : p)));
      } else {
        const created = await createProduct(payload);
        setProducts(prev => [...prev, created]);
      }
      cancelForm();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Confirma exclusão do produto?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Gerência de Produtos</h1>
        <div>
          <span style={{ marginRight: '1rem' }}>Olá, {user.username}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Sair</button>
        </div>
      </header>

      <div style={styles.content}>
        {error && <p style={styles.error}>{error}</p>}

        {!showForm && (
          <button style={styles.newBtn} onClick={openNew}>+ Novo Produto</button>
        )}

        {showForm && (
          <div style={styles.formBox}>
            <h3 style={styles.formTitle}>{editingId ? 'Editar Produto' : 'Novo Produto'}</h3>
            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Nome *</label>
              <input
                style={styles.input}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />

              <label style={styles.label}>Descrição</label>
              <input
                style={styles.input}
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />

              <label style={styles.label}>Preço (R$) *</label>
              <input
                style={styles.input}
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                required
              />

              <label style={styles.label}>Estoque *</label>
              <input
                style={styles.input}
                type="number"
                min="0"
                value={form.stock}
                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                required
              />

              <div style={styles.formActions}>
                <button style={styles.saveBtn} type="submit">Salvar</button>
                <button style={styles.cancelBtn} type="button" onClick={cancelForm}>Cancelar</button>
              </div>
            </form>
          </div>
        )}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Descrição</th>
              <th style={styles.th}>Preço</th>
              <th style={styles.th}>Estoque</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={styles.td}>{p.id}</td>
                <td style={styles.td}>{p.name}</td>
                <td style={styles.td}>{p.description}</td>
                <td style={styles.td}>R$ {p.price.toFixed(2)}</td>
                <td style={styles.td}>{p.stock}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => openEdit(p)}>Editar</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
