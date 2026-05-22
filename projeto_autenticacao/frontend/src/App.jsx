import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function LoginRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>;
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/user'} replace />;
  return <LoginPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginRedirect />} />

          <Route
            path="/user"
            element={
              <ProtectedRoute requireRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/unauthorized"
            element={
              <div style={{ padding: '2rem' }}>
                <h2>Acesso negado.</h2>
                <a href="/login">Voltar ao login</a>
              </div>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
