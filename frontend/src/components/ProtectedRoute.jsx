import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('@ProvaFullstack:token');

  // Se não houver token, redireciona imediatamente para a tela de Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza a página solicitada
  return children;
};
