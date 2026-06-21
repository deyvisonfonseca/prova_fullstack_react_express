import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ItemsManagement from './pages/ItemsManagement';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Protegidas envolvidas pelo Layout */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/usuarios" 
          element={
            <ProtectedRoute>
              <Layout>
                <Users /> {/* <-- CORRIGIDO: Tag atualizada para usar o componente correto */}
              </Layout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/itens" 
          element={
            <ProtectedRoute>
              <Layout>
                <ItemsManagement />
              </Layout>
            </ProtectedRoute>
          } 
        />

        {/* Fallback padrão */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
