import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function ProtectedRoute({ children, requireRole }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: '2rem' }}>Carregando...</div>;
  if (!user)   return <Navigate to="/login" replace />;

  if (requireRole && user.role !== requireRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
