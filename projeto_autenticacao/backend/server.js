require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET;

// ─── Banco de dados ───────────────────────────────────────────────────────────

const db = new Database(path.join(__dirname, 'database.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin','user'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0
  );
`);

// Seed inicial quando a tabela de usuários estiver vazia
const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get();
if (userCount.c === 0) {
  const hashAdmin = bcrypt.hashSync('admin123', 10);
  const hashUser  = bcrypt.hashSync('user123',  10);

  db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run('admin', hashAdmin, 'admin');
  db.prepare('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)').run('user',  hashUser,  'user');

  const insertProduct = db.prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)');
  insertProduct.run('Notebook Pro', 'Processador i7, 16GB RAM, SSD 512GB', 4999.90, 10);
  insertProduct.run('Mouse Gamer',  'RGB, 12000 DPI, sensor óptico',        299.90,  50);
  insertProduct.run('Teclado Mecânico', 'Switch Brown, ABNT2, retroiluminado', 499.90, 30);
  insertProduct.run('Monitor 27"', '4K, 144Hz, IPS, HDR400',               2199.90,  8);
  insertProduct.run('Headset USB',  'Surround 7.1, microfone retrátil',      399.90, 20);

  console.log('Seed executado: usuários e produtos criados.');
}

// ─── Middlewares globais ──────────────────────────────────────────────────────

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ─── Middlewares de autenticação ──────────────────────────────────────────────

function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Não autenticado.' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
    }
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Acesso negado.' });
    }
    next();
  };
}

// ─── Rotas de autenticação ────────────────────────────────────────────────────

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha obrigatórios.' });
  }

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
  }

  const token = jwt.sign(
    { sub: user.id, role: user.role, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // true em produção com HTTPS
  });

  return res.json({ user: { id: user.id, username: user.username, role: user.role } });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ ok: true });
});

app.get('/api/me', authenticate, (req, res) => {
  return res.json({ id: req.user.sub, username: req.user.username, role: req.user.role });
});

// ─── Rotas de produtos ────────────────────────────────────────────────────────

app.get('/api/products', authenticate, (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  return res.json(products);
});

app.post('/api/products', authenticate, requireRole('admin'), (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || price == null || stock == null) {
    return res.status(400).json({ error: 'Campos name, price e stock são obrigatórios.' });
  }

  const result = db
    .prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)')
    .run(name, description || '', parseFloat(price), parseInt(stock, 10));

  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  return res.status(201).json(product);
});

app.put('/api/products/:id', authenticate, requireRole('admin'), (req, res) => {
  const { name, description, price, stock } = req.body;
  const { id } = req.params;

  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Produto não encontrado.' });

  db.prepare(`
    UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?
  `).run(
    name ?? existing.name,
    description ?? existing.description,
    price != null ? parseFloat(price) : existing.price,
    stock != null ? parseInt(stock, 10) : existing.stock,
    id
  );

  const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  return res.json(updated);
});

app.delete('/api/products/:id', authenticate, requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Produto não encontrado.' });

  db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return res.json({ ok: true });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
