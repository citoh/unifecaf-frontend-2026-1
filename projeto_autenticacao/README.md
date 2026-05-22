# Projeto Autenticação — Catálogo de Produtos

Sistema fullstack mínimo com autenticação JWT e dois níveis de acesso (admin/user).

## Stack

- **Backend**: Node.js + Express + SQLite (better-sqlite3) + JWT (httpOnly cookie)
- **Frontend**: React + Vite + react-router-dom (CSS inline, sem libs de UI)

## Executar

### Backend

```bash
cd backend
npm install
echo "JWT_SECRET=trocar-em-producao-$(openssl rand -hex 16)" > .env
node server.js
# → http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

## Credenciais de teste

| Usuário | Senha    | Acesso         |
|---------|----------|----------------|
| admin   | admin123 | `/admin` — CRUD completo de produtos |
| user    | user123  | `/user`  — catálogo somente leitura  |

## Fluxo de autenticação

1. `POST /api/login` valida usuário/senha com bcrypt e gera JWT (1h).
2. O JWT é armazenado em cookie `httpOnly` (não acessível por JS).
3. Toda requisição subsequente envia o cookie automaticamente.
4. `GET /api/me` é chamado no boot do frontend para restaurar a sessão.
5. `POST /api/logout` limpa o cookie.

## Rotas da API

| Método | Rota                 | Acesso        |
|--------|----------------------|---------------|
| POST   | /api/login           | público       |
| POST   | /api/logout          | público       |
| GET    | /api/me              | autenticado   |
| GET    | /api/products        | autenticado   |
| POST   | /api/products        | admin         |
| PUT    | /api/products/:id    | admin         |
| DELETE | /api/products/:id    | admin         |
