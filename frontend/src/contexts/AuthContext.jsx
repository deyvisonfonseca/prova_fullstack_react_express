import { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const receivedToken = response.data.token;
    const decoded = decodeJwt(receivedToken);

    const loggedUser = {
      id: decoded?.id || decoded?.sub || response.data.user?.id,
      name: response.data.user?.name || decoded?.name || email,
      email,
      role: response.data.user?.role || decoded?.role || 'admin'
    };

    localStorage.setItem('token', receivedToken);
    localStorage.setItem('user', JSON.stringify(loggedUser));

    setToken(receivedToken);
    setUser(loggedUser);

    return loggedUser;
  }

  async function registerAdmin() {
    return api.post('/auth/register', {
      name: 'Administrador',
      email: 'admin@email.com',
      password: '123456',
      role: 'admin'
    });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    logout,
    registerAdmin
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
