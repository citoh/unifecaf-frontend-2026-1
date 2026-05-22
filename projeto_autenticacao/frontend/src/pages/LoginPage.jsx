import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const styles = {
  page: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', background: '#f0f2f5',
  },
  card: {
    background: '#fff', padding: '2rem', borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)', width: '100%', maxWidth: '360px',
  },
  title: { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  label: { display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: '#555' },
  input: {
    width: '100%', padding: '0.5rem 0.75rem', marginBottom: '1rem',
    border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%', padding: '0.6rem', background: '#4f46e5', color: '#fff',
    border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer',
  },
  error: { color: '#dc2626', marginBottom: '1rem', fontSize: '0.875rem' },
  hints: {
    marginTop: '1.25rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem',
  },
  hintsLabel: { fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.5rem' },
  hintBtn: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', padding: '0.45rem 0.75rem', marginBottom: '0.4rem',
    background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px',
    cursor: 'pointer', fontSize: '0.8rem', color: '#374151', textAlign: 'left',
  },
  hintRole: {
    fontSize: '0.7rem', fontWeight: 'bold', padding: '0.1rem 0.4rem',
    borderRadius: '3px', color: '#fff',
  },
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(username, password);
      navigate(user.role === 'admin' ? '/admin' : '/user', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Entrar</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Usuário</label>
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
            required
          />

          <label style={styles.label}>Senha</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.hints}>
          <p style={styles.hintsLabel}>Contas de teste — clique para preencher:</p>

          {[
            { username: 'admin', password: 'admin123', role: 'admin', color: '#7c3aed' },
            { username: 'user',  password: 'user123',  role: 'user',  color: '#0891b2' },
          ].map(({ username: u, password: p, role, color }) => (
            <button
              key={u}
              type="button"
              style={styles.hintBtn}
              onClick={() => { setUsername(u); setPassword(p); setError(''); }}
            >
              <span>
                <strong>{u}</strong> / {p}
              </span>
              <span style={{ ...styles.hintRole, background: color }}>{role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
